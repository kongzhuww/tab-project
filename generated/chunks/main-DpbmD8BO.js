import { l as Xn, S as zi, i as Hs } from "./SearchBox-ZzGxlpyJ.js";
/* empty css                */
import { c as ni, r as Se, a as Rt, w as We, b as V, d as fe, o as c, e as p, u as i, t as u, f as E, F as Q, g as we, h as z, i as n, j as pe, T as wt, k as Oo, l as tt, v as Ks, m as ot, n as ho, p as Z, q as js, s as te, x as Ot, y as fo, z as Le, A as de, B as qe, C as X, D as St, E as Io, G as pn, H as Et, I as No, J as Ye, K as mo, L as Vi, M as zs } from "./vendor-vue-9b0eS4bW.js";
import { W as hn, t as oo, p as Ln, n as $e, a as Fo, b as Wt, h as Qe, m as xt, c as gi, d as nn, r as Vs, s as $n, e as mi, f as Gs, g as Us, C as Gi, i as oe, j as Ui, k as ko, l as Yi, o as Tt, q as Ys, u as vo, v as Xi, w as no, x as Vo, y as Xs, z as qs, A as Go, B as _o, D as Js } from "./view-styles-BJv4828I.js";
import { l as Zs, r as Qs, G as ea, a as Ee, b as wn, c as ii, s as ta, d as oa, e as si, f as fn, g as ai, h as Do, i as Ao, j as At, k as Eo, m as io, n as ze, o as vi, p as na, q as rt, t as Ve, u as dt, v as qi, w as Te, x as Ji, R as ia, y as sa, z as Ft, A as jt, B as De, C as Jt } from "./search.service-wriY3nvN.js";
import { l as Fe, a as Zi, b as Qi, c as ri, d as ue, f as _t, e as Co } from "./store-NeT4WGv0.js";
import { c as aa, a as ra, t as la, b as ca, d as da, e as ua, f as so, g as pa } from "./calendar.service-DnkbEAru.js";
import { w as Be, s as li, P as ha, i as gn, D as Sn, a as yi, g as st, p as fa, L as ga, b as Ht, c as ma, d as Tn, t as wi, e as va, f as ya, h as Bo, l as es } from "./window-manager.store-BdI_8a-H.js";
import { s as bn } from "./store-DBO9PHsb.js";
import { b as Po, a as wa, c as ba } from "./up-group-manager-store-cXXB-F2p.js";
import { biliMessagePanelController as zt, biliMessagePanelState as ka } from "./message-panel-store-DCJuUdyJ.js";
import { s as _a, a as Ca } from "./stickers.service-Bdd21-le.js";
import { a as ci, b as ts, c as xa } from "./aihot-feed-store-DuV-koWZ.js";
import { b as os } from "./bili-favorites-store--UkmKLmJ.js";
import { y as ns } from "./youtube-store-DNBjW6Yp.js";
import { R as La, u as di, a as bi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { t as d, c as mt, _ as Oe } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { f as ao, C as $a } from "./ChatShareMenu-DCiYB8N_.js";
import { k as Sa, m as Ta } from "./core-utils-B2N4WtKx.js";
import { t as gt } from "./together-listen.store-CdR8RYuz.js";
import { A as Ia } from "./AppWindowFrame-BH4F7oPG.js";
/* empty css                                                                             */
const Ma = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Da() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !Ma.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
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
  async function a(l, h, L = "api") {
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
      return await F.run(h, { signal: D.signal, source: L });
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
    const L = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!L.length) return g().slice(0, h);
    const F = [...e.values()].map((m) => {
      const D = r(m), v = D.title.toLocaleLowerCase(), w = `${D.id} ${v} ${D.category} ${D.description} ${D.keywords.join(" ")}`.toLocaleLowerCase();
      if (!L.every((y) => w.includes(y))) return null;
      let T = 0;
      for (const y of L)
        D.id === y ? T += 200 : D.id.startsWith(y) && (T += 120), v === y ? T += 160 : v.startsWith(y) ? T += 100 : v.includes(y) && (T += 60), D.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (T += 40);
      return { item: D, score: T };
    }).filter((m) => !!m);
    return F.sort((m, D) => D.score - m.score || m.item.title.localeCompare(D.item.title, "zh")), Object.freeze(F.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: s, has: (l) => e.has(l), list: g, search: f });
}
const kn = Da(), Aa = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Ea(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(m) {
    if (!m || !Aa.test(m.id)) throw new TypeError(`Invalid feature id: ${m?.id || ""}`);
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
    const v = new AbortController(), w = Object.freeze({
      signal: v.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), T = Promise.resolve().then(() => D.mount(w)).then((y) => (s.delete(m), o.set(m, { cleanup: y, controller: v }), y), (y) => {
      throw s.delete(m), a.set(m, y), v.abort(), y;
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
    const m = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), D = [...t.values()].filter((T) => !(!T.eager || !m && T.roots && T.roots.length > 0 && !T.roots.some((_) => !!document.getElementById(_)))).sort((T, y) => (T.order || 100) - (y.order || 100)), w = (await Promise.allSettled(D.map((T) => f(T.id)))).flatMap((T, y) => T.status === "rejected" ? [{ id: D[y].id, reason: T.reason }] : []);
    w.length && console.warn("LogicWeaver Vue features failed to mount", w);
  }
  async function L() {
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
  return Object.freeze({ register: r, start: f, startEager: h, stop: l, stopAll: L, has: (m) => t.has(m), list: F });
}
const Pa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", ki = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ie = Se({
  enabled: ki,
  style: Pa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !ki,
  exiting: !1,
  forced: !1
});
let go = 0, mn = 4, is = performance.now(), qn = 0, sn = null, Jn = !1;
function ss(e) {
  const t = e - is, o = qn ? Math.min(1, t / qn) : 1, s = o * o * (3 - 2 * o);
  ie.renderedProgress = mn + (ie.targetProgress - mn) * s, o < 1 && !ie.finished ? go = requestAnimationFrame(ss) : go = 0;
}
function an(e, t) {
  if (!ie.enabled || ie.finished) return;
  const o = Math.max(ie.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ie.status = t), mn = ie.renderedProgress, ie.targetProgress = o, is = performance.now(), qn = Math.max(280, Math.min(920, 220 + Math.abs(o - mn) * 7.5)), cancelAnimationFrame(go), go = requestAnimationFrame(ss);
}
function _n(e = "Ready", t = !1) {
  ie.finished || (ie.finished = !0, ie.forced = t, ie.status = e, ie.targetProgress = 100, cancelAnimationFrame(go), go = 0, ie.renderedProgress = 100, sn?.(t));
}
function Wa(e = "KEYBOARD SKIP") {
  _n(e, !0);
}
function Ra() {
  ie.enabled || _n("BOOT COMPLETE", !0);
}
function as() {
  !ie.enabled || ie.finished || Jn || (Jn = !0, an(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ie.finished || an(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ie.finished || an(100, ie.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ie.finished || _n("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Oa() {
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
const lt = Rt(ie), yt = Object.freeze({
  update: an,
  finish: _n,
  skip: Wa,
  notifyBootReady: Ra,
  async playIntro(e) {
    if (e?.style && (ie.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ie.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ie.enabled = !0, ie.finished = !1, ie.forced = !!e?.force, ie.renderedProgress = 4, ie.targetProgress = 4, Jn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-DlmGdx77.js"), s = ni(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), s.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), s.mount(t);
      }
    }
    as();
  },
  get enabled() {
    return ie.enabled;
  },
  get finished() {
    return ie.finished;
  }
});
function Na(e) {
  return sn = e, ie.finished && e(ie.forced), () => {
    sn === e && (sn = null);
  };
}
const rs = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], ls = "lw_weather_snapshot_v1";
function Ba() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(ls);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : rs,
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
        ls,
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
const Fa = () => {
  const e = Ba();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || rs,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, q = Se(Fa());
let In = null, Mn = null;
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
}, Ha = () => ({
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
}), ke = Se(Ha());
let Dn = null;
const ro = {
  get snapshot() {
    return Rt(ke);
  },
  update(e) {
    Object.assign(ke, e);
  },
  updateTime(e, t, o, s) {
    ke.timeText = e, ke.secsText = t, ke.greetingText = o, ke.dateText = s, ke.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (ke.fontFamily = e.fontFamily), e.colorHex !== void 0 && (ke.colorHex = e.colorHex), e.greetColor !== void 0 && (ke.greetColor = e.greetColor), e.dateColor !== void 0 && (ke.dateColor = e.dateColor), e.isBlack !== void 0 && (ke.isBlack = e.isBlack), e.isCustomColor !== void 0 && (ke.isCustomColor = e.isCustomColor), ke.updatedAt = Date.now();
  },
  openSettings(e) {
    Dn ? Dn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Dn = e;
  }
}, Ka = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], ja = () => ({
  mounted: !1,
  visible: !1,
  items: [...Ka]
}), An = Se(ja());
let Yo = {};
const ui = {
  getSnapshot() {
    return Rt(An);
  },
  update(e) {
    Object.assign(An, e);
  },
  setMounted(e) {
    An.mounted = e;
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
}, En = Se({ visible: !1, pendingWrites: 0 });
async function za(e) {
  if (En.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  En.pendingWrites++;
  try {
    return await e();
  } finally {
    En.pendingWrites--;
  }
}
const _i = {
  openDialog() {
    Be.open("wallpaper");
  },
  closeDialog() {
    Be.close("wallpaper");
  },
  resetDefault() {
    return za(() => hn.clearWallpaper());
  }
}, Ci = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], xi = [
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
], Ae = Se({
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
  state: Ae,
  setMounted(e) {
    Ae.mounted = e;
  },
  onAction(e) {
    Pn = e;
  },
  dispatch(e, t) {
    if (Pn)
      return Pn(e, t);
  },
  open(e) {
    const s = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? s / 2, g = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(r - 40, s - 290 - 12)), l = Math.max(12, Math.min(g + 10, a - 420 - 12));
    Ae.x = f, Ae.y = l, Ae.isOpen = !0, this.dispatch("open", { x: f, y: l });
  },
  close() {
    Ae.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    Ae.font = e;
    const t = Ci.find((o) => o.id === e);
    if (t) {
      ro.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: Ae.color, timezone: Ae.timezone });
  },
  setColor(e) {
    Ae.color = e;
    const t = xi.find((o) => o.id === e);
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
    this.dispatch("change", { font: Ae.font, color: e, timezone: Ae.timezone });
  },
  setTimezone(e) {
    Ae.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: Ae.font, color: Ae.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        Ae.font = e;
        const s = Ci.find((a) => a.id === e);
        s && ro.applyConfig({ fontFamily: s.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        Ae.color = t;
        const s = xi.find((a) => a.id === t);
        s && ro.applyConfig({ colorHex: s.hex, greetColor: s.hex, dateColor: s.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (Ae.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (Ae.font = e.font), e.color && (Ae.color = e.color), e.timezone && (Ae.timezone = e.timezone);
  }
}, ge = Se({
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
let Wn = null, rn = !1;
async function ln(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ge.model };
  if (e === "connect") return { state: "ready", model: ge.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function cs(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ge.statusText = o, ge.authHidden = !e.loginUrl, ge.authCode = e.loginCode || "", ge.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ge.isStreaming = rn || e.busy || e.state === "running";
}
async function Va() {
  try {
    const e = await ln("poll");
    cs(e);
  } catch {
  }
}
async function Ga(e, t) {
  if (e === "open" || e === "connect")
    try {
      ge.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await ln("connect");
      cs(o);
    } catch (o) {
      ge.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ge.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ge.inputText = "", ge.isStreaming = !0, rn = !0;
    try {
      await ln("send", { text: o }), await Va();
    } catch (s) {
      ge.statusText = s?.message || "发送失败";
    } finally {
      rn = !1, ge.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await ln("stop");
    } catch {
    }
    ge.isStreaming = !1, rn = !1;
  }
}
const pi = {
  state: ge,
  setMounted(e) {
    ge.mounted = e;
  },
  onAction(e) {
    Wn = e;
  },
  dispatch(e, t) {
    if (Wn)
      return Wn(e, t);
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
}, Rn = Se({
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
}), Xo = /* @__PURE__ */ new Set(), Ua = {
  state: Rn,
  open(e) {
    Object.assign(Rn, e, { open: !0 });
  },
  update(e) {
    Object.assign(Rn, e);
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
}, cn = Se({ isOpen: !1 }), ds = {
  state: cn,
  open() {
    cn.isOpen = !0;
  },
  close() {
    cn.isOpen = !1;
  }
}, On = "biliProfileCacheV1", kt = "biliLocallyKnownMessageIdsV1", qo = "biliMessageUserCacheV1", xo = "githubKnownReleaseVersionsV1", Jo = "customNewtabAvatar", Li = "biliToastKnownCountsV1";
class Ya {
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
    if (oo.avatarUrl = a, oo.userName = t?.uname || "哔哩哔哩用户", oo.buttonTitle = "通知中心", Ln.avatarUrl = a, Ln.userName = t?.uname || "用户", Ln.mid = t?.mid, typeof document < "u") {
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
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, l = r.status === "fulfilled" ? r.value?.data || {} : {}, h = g.status === "fulfilled" ? g.value?.data || {} : {}, L = Number(l.at || 0), F = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - L), m = {
          reply: Math.max(Number(f.reply || 0), F),
          at: Math.max(Number(f.at || 0), L),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            f.chat || l.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(s, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [On]: { profile: s, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Li]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const s = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Li]: this.biliToastKnownCounts }).catch(() => {
    }), s > 0 && $e.show({
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
    }), a > 0 && $e.show({
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
    }), r > 0 && $e.show({
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
          ds.open();
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
      On,
      kt,
      qo,
      xo,
      Jo
    ]).then((t) => {
      this.customAvatar = t[Jo] || "", this.locallyKnownIds = t[kt] && typeof t[kt] == "object" ? t[kt] : {}, this.userCache = t[qo] && typeof t[qo] == "object" ? t[qo] : {}, this.githubKnownVersions = t[xo] && typeof t[xo] == "object" ? t[xo] : {};
      const o = t[On];
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
const $i = new Ya(), me = Se({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Zo = null;
const dn = {
  state: me,
  open(e, t) {
    Zo = t, Object.assign(me, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(me, e);
  },
  close() {
    me.submitting || (me.open = !1, Zo = null);
  },
  async toggleFollow() {
    if (!(!Zo || me.submitting)) {
      me.submitting = !0;
      try {
        const e = !me.followed;
        await Zo(e) && (me.followed = e);
      } finally {
        me.submitting = !1;
      }
    }
  }
}, us = {}, Si = /* @__PURE__ */ new Set();
function ps() {
  return new Proxy(us, {
    get(e, t) {
      return t === "get" ? (o) => e[o] : t === "list" ? () => {
        const o = {};
        for (const [s, a] of Object.entries(e))
          o[s] = a?.state ?? a;
        return o;
      } : t === "snapshot" ? () => {
        const o = {};
        for (const [s, a] of Object.entries(e)) {
          const r = a?.history || [];
          o[s] = {
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
        for (const [s, a] of Object.entries(e)) {
          const r = a?.history || [];
          o.machines[s] = {
            state: a?.state ?? a,
            historyCount: r.length,
            history: [...r]
          };
        }
        return o;
      } : t === "subscribeAll" ? (o) => (Si.add(o), () => {
        Si.delete(o);
      }) : e[t];
    }
  });
}
function Ti(e, t) {
  us[e] = t, typeof window < "u" && (window.__TAB_MACHINES__ = ps());
}
function Xa() {
  return ps();
}
const Re = Se({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), Nn = /* @__PURE__ */ new Set();
let Zt;
const Bn = new La();
async function qa(e, t) {
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
        const L = await g.read();
        if (L.done) break;
        if (l += L.value.byteLength, l > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode(L.value, { stream: !0 });
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
function Ii(e, t) {
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
async function Ja(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let s = "";
  try {
    const g = await Zs(t), { data: f } = await Qs(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: g, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((l) => Ii(l, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (g) {
    t.throwIfAborted(), s = g instanceof ea ? g.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", r = await qa(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(r)) throw new Error("Invalid fallback response");
  return {
    repos: r.slice(0, 30).map((g) => Ii(g, !0)),
    sourceText: `GitHub Search 不可用：${s} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const hs = {
  get state() {
    return Re;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return Zt = e, !e.aborted && !Re.hasLoaded && !Bn.pending && this.refresh(), () => {
      Zt === e && (Zt = void 0);
    };
  },
  switchTab(e) {
    Re.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !Zt || Zt.aborted || ![1, 7, 30].includes(e) || e === Re.sinceDays || (Bn.cancel(), Object.assign(Re, {
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
    const e = Zt;
    if (!e || e.aborted || Re.isLoading) return;
    const t = Re.sinceDays, o = Bn.begin({
      timeoutMs: 45e3,
      isCurrent: () => Re.sinceDays === t,
      onStop: (a) => {
        Re.isLoading = !1, a === "timeout" && (Re.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), s = o.current;
    if (s()) {
      Re.isLoading = !0, Re.errorMessage = "";
      try {
        const a = await o.wait(() => Ja(t, o.signal));
        if (!s()) return;
        Re.repos = a.repos, Re.sourceText = a.sourceText, Re.fetchedAt = Date.now(), Re.hasLoaded = !0;
      } catch {
        s() && (Re.errorMessage = Re.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Re.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return Nn.add(e), () => {
      Nn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of Nn)
      try {
        o(e, t);
      } catch {
      }
  }
}, Zn = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), hi = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), ne = Se({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Zn(),
  activeSectorId: null,
  sectors: [],
  beam: hi()
});
let Mi = null;
function Za(e, t) {
  if (typeof e != "number" || !t)
    return hi();
  const o = 160, s = 160, a = 26, r = 154, g = 360 / t, f = e - g / 2, l = e + g / 2, h = f * Math.PI / 180, L = l * Math.PI / 180, F = o + a * Math.cos(h), m = s + a * Math.sin(h), D = o + r * Math.cos(h), v = s + r * Math.sin(h), w = o + a * Math.cos(L), T = s + a * Math.sin(L), y = o + r * Math.cos(L), _ = s + r * Math.sin(L), x = g > 180 ? 1 : 0, N = `M ${F.toFixed(1)} ${m.toFixed(1)} L ${D.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${w.toFixed(1)} ${T.toFixed(1)} A ${a} ${a} 0 ${x} 0 ${F.toFixed(1)} ${m.toFixed(1)} Z`, H = `M ${D.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: N,
    arcPath: H,
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
const Pe = {
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
    } : ne.hub = Zn();
  },
  setBeam(e, t) {
    ne.beam = Za(e, t);
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
    ne.isExpanded = !1, ne.mode = "main", ne.activeSectorId = null, ne.beam = hi(), ne.hub = Zn();
  },
  setWheelMode(e) {
    ne.mode = e;
  },
  setActionHandler(e) {
    Mi = e;
  },
  dispatch(e, t) {
    Mi?.(e, t);
  }
}, fs = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Qa() {
  return fs.filter((e) => e.mode || e.id === "launcher" || gn(e.id));
}
function er() {
  return ha.filter((e) => e.kind === "module" && gn(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Di() {
  ne.isExpanded && ht();
}
let Qn = [], Wo = fs, Ct = { x: 400, y: 300 }, gs = !1, Lo = !1, Fn = null, $o = null, pt = !1;
const tr = Se(/* @__PURE__ */ new Set()), or = /* @__PURE__ */ new Map();
function Pt() {
  return globalThis.chrome?.storage;
}
function ms(e, t) {
  const o = ne.isExpanded ? 160 : 24;
  Pe.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ht() {
  const e = ne.mode;
  let t = [];
  e === "shortcuts" && (t = [...Qn], t.push({
    id: "toggle-edit-shortcuts",
    title: pt ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: pt ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: pt ? "✅" : "✏️"
  })), Wo = e === "tools" ? er() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Qa();
  const o = Wo.length, s = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Pe.setSectors(Wo.map((r, g) => {
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
  })), Pe.setWheelMode(e), Pe.setActiveSector(null), Pe.setBeam(null, 0), Pe.setHub(e === "shortcuts" ? pt ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function vn(e) {
  ne.mode = e, ht();
}
function Gt() {
  Pe.collapse(), ms(ne.ballPosition.x, ne.ballPosition.y), Pe.setVisibility(gs);
}
function eo(e = ne.ballPosition.x, t = ne.ballPosition.y, o = "main") {
  Pe.expand(void 0, void 0, o), ms(e, t), ht(), Pe.setVisibility(!0);
}
function nr(e) {
  if (e.id === "toggle-edit-shortcuts") {
    vs();
    return;
  }
  if (pt && e.url) {
    $e.show({
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
    if (Gt(), e.url) {
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
function vs() {
  pt = !pt, pt ? ($e.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.enterEditMode"),
    message: d("navwheel.editModeDesc"),
    duration: 5e3
  }), ht()) : ($e.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.editDone"),
    message: d("navwheel.editSaved"),
    duration: 2e3
  }), ht());
}
async function ir(e) {
  if (!pt || !e || !e.url) return !1;
  try {
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], s = o.findIndex((g) => g.url === e.url);
    if (s >= 0) {
      const g = o.filter((f, l) => l !== s);
      return await Pt()?.local?.set({ siteShelfLinks: g, logicweaverNavWheelShortcutsV1: g }), await Xe.loadShortcuts(), ht(), $e.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.removedNotice"),
        message: d("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return $e.show({
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
    return await Pt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Xe.loadShortcuts(), ht(), $e.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.addedTitle"),
      message: d("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function sr(e) {
  try {
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], s = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await Pt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Xe.loadShortcuts(), ht(), s && $e.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: s.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function Ai(e) {
  Ct = { x: e.clientX, y: e.clientY };
}
function Ei(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), Ct = { x: e.clientX, y: e.clientY }, ne.isExpanded ? Gt() : eo(e.clientX, e.clientY));
}
function Pi(e) {
  e.button === 1 && e.preventDefault();
}
function Wi(e) {
  if (e.key === "Escape") {
    if (pt) {
      e.preventDefault(), e.stopPropagation(), pt = !1, tr.clear(), or.clear(), ht(), $e.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ne.isExpanded || li.active) return;
    e.preventDefault(), e.stopPropagation(), ne.mode === "shortcuts" ? vn("main") : Gt();
  }
}
function ar(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function rr(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Ee.getCachedIcon(e.url);
    if (o) return o;
    const s = ar(e.url);
    if (s) return s;
  }
  return e.icon || "🔗";
}
const Xe = {
  async start() {
    if (!Lo) {
      Lo = !0, Fn = We(mt, () => {
        ne.isExpanded && ht();
      }), Ct = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Pe.setActionHandler((e, t) => {
        if (e === "hub:click")
          ne.isExpanded ? ne.mode === "shortcuts" ? vn("main") : Gt() : eo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Wo.find((s) => s.id === t?.id || e === "container:click" && s.id === ne.activeSectorId);
          o && nr(o);
        } else if (e === "sector:hover") {
          const o = ne.sectors.find((s) => s.id === t?.id);
          o && (Pe.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Pe.setActiveSector(o.id), Pe.setBeam(o.angleDeg, Wo.length));
        } else e === "sector:leave" && (Pe.setActiveSector(null), Pe.setBeam(null, 0), Pe.setHub(ne.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : ne.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Di), window.addEventListener("pointermove", Ai, { passive: !0 }), window.addEventListener("mousedown", Ei, !0), window.addEventListener("auxclick", Pi, !0), window.addEventListener("keydown", Wi, !0), $o = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Pt()?.onChanged?.addListener($o);
      try {
        if (!Lo) return;
        gs = !1, Pe.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ht();
    }
  },
  stop() {
    Lo = !1, Fn?.(), Fn = null, Pe.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Di), window.removeEventListener("pointermove", Ai), window.removeEventListener("mousedown", Ei, !0), window.removeEventListener("auxclick", Pi, !0), window.removeEventListener("keydown", Wi, !0), $o && Pt()?.onChanged?.removeListener($o), $o = null;
  },
  async loadShortcuts() {
    try {
      const e = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!Lo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Qn = (Array.isArray(t) ? t : []).map((o, s) => ({
        id: String(o.id || `wheel-${s}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: rr(o)
      })), ne.mode === "shortcuts" && ht();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    eo(e ?? Ct.x, t ?? Ct.y);
  },
  close: Gt,
  get isEditingShortcuts() {
    return pt;
  },
  isLinkInWheel(e) {
    return e ? Qn.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: vs,
  handleLinkSelection: ir,
  removeShortcut: sr,
  toggle(e = !1) {
    ne.isExpanded ? Gt() : e ? eo(Ct.x, Ct.y) : eo();
  },
  toggleTools(e = !0) {
    ne.isExpanded && ne.mode === "tools" ? Gt() : eo(
      e ? Ct.x : ne.ballPosition.x,
      e ? Ct.y : ne.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    vn(e);
  }
};
class lo {
  constructor() {
    this.activeShortcuts = { ...Sn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: s, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-CPNmi8kF.js").then((L) => L.g), g = (await chrome.storage.local.get(a))[a], f = { ...g || {}, [t]: o }, l = this.shortcutReadVersion, h = await s.saveSettings(
      { [a]: f },
      { [a]: g }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((s) => Object.prototype.hasOwnProperty.call(Sn, s[0]) && typeof s[1] == "string") : [];
    this.activeShortcuts = { ...Sn, ...Object.fromEntries(o) };
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
    if (!t || !yi(t)) return !1;
    if (st(t))
      return Be.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return wn.toggle(), !0;
      case "settings":
        return bn.open(), !0;
      case "nav-wheel":
        return Xe.toggle(!0), !0;
      case "toolbox":
        return Xe.toggleTools(!0), !0;
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
        if (li.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const s = fa(t);
        if (!s) return;
        const a = s.toLowerCase();
        for (const [r, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !yi(r)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const ei = lo.getInstance();
class co {
  constructor() {
    this._isVisible = V(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
const lr = co.getInstance(), Ri = [
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
    let l = g.findIndex((x) => new Date(x).getTime() >= f);
    l < 0 && (l = 0);
    const h = [];
    for (let x = l; x < Math.min(l + 5, g.length); x++) {
      const N = x === l ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(g[x]).getHours() }), H = Qo(s.hourly.weather_code[x]), G = Math.round(s.hourly.temperature_2m[x]);
      h.push({ time: N, emoji: H.emoji, temp: G });
    }
    let L = d("weather.noRain12h");
    for (let x = l; x < Math.min(l + 12, g.length); x++) {
      const N = s.hourly.weather_code[x], H = s.hourly.precipitation_probability?.[x] || 0;
      if (N >= 51 || H >= 60) {
        const G = new Date(g[x]).getHours(), k = N >= 71 && N <= 77 || N === 85 || N === 86 ? d("weather.snow") : d("weather.rain"), $ = H ? ` (${H}%)` : "";
        L = d("weather.expectPrecip", { time: `${G}:00`, type: k, prob: $ });
        break;
      }
    }
    const F = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], m = [], D = s.daily?.time?.length || 0;
    for (let x = 1; x < Math.min(3, D); x++) {
      const N = F[x] || d("weather.plusDays", { count: x }), H = Qo(s.daily.weather_code[x]), G = `${Math.round(s.daily.temperature_2m_max[x])}°/${Math.round(s.daily.temperature_2m_min[x])}°`;
      m.push({ label: N, emoji: H.emoji, tempRange: G });
    }
    const v = Math.round(s.daily?.temperature_2m_max?.[0] ?? r), w = Math.round(s.daily?.temperature_2m_min?.[0] ?? r), T = d("weather.tempRange", { cond: a.label, max: v, min: w }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: T,
      rainText: L,
      hours: h,
      days: m
    };
    if (ut.ready(y, t), s.daily?.time) {
      const x = [
        d("weather.weekday.sun"),
        d("weather.weekday.mon"),
        d("weather.weekday.tue"),
        d("weather.weekday.wed"),
        d("weather.weekday.thu"),
        d("weather.weekday.fri"),
        d("weather.weekday.sat")
      ], N = [];
      for (let H = 0; H < s.daily.time.length; H++) {
        const G = new Date(s.daily.time[H]), A = H === 0 ? d("weather.today") : H === 1 ? d("weather.tomorrow") : H === 2 ? d("weather.afterTomorrow") : x[G.getDay()], k = Qo(s.daily.weather_code[H]);
        N.push({
          date: `${G.getMonth() + 1}/${G.getDate()}`,
          dayName: A,
          emoji: k.emoji,
          condition: k.label,
          highTemp: Math.round(s.daily.temperature_2m_max[H]),
          lowTemp: Math.round(s.daily.temperature_2m_min[H]),
          rainProb: s.daily.precipitation_probability_max?.[H] || 0
        });
      }
      ut.setForecastDays(N);
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
    if (!s) return Ri.slice(0, o);
    const a = [];
    for (const r of Ri) {
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
      const L = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: L }, s === this.activeRequestId && q.state !== "unconfigured" && this.applyForecastPayload(o, f, L);
    } catch (a) {
      s === this.activeRequestId && q.state !== "unconfigured" && ut.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      s === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const to = uo.getInstance();
function cr(e, t) {
  window.LogicWeaverIntro = yt, window.LogicWeaverStartupIntro = yt, window.LogicWeaverNotifications = $e, window.LogicWeaverWindowManager = Be, window.LogicWeaverWindowTabs = Be, window.LogicWeaverDomFreezer = ga, window.LogicWeaverWallpaperService = hn, window.LogicWeaverLauncherService = Ee, window.LogicWeaverLauncherRuntime = Xn, window.LogicWeaverProfileService = $i;
  try {
    $i.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = ii, window.LogicWeaverCalendarService = aa, window.LogicWeaverWeather = ut, window.LogicWeaverWeatherService = to, window.LogicWeaverClock = ro, window.LogicWeaverSearch = ta, window.LogicWeaverSearchService = oa, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-CXXKpxSC.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Qe, window.LogicWeaverLauncherGroups = Fe, window.LogicWeaverProfileMenu = Fo, window.LogicWeaverWorkspaceLaunchers = ui, window.LogicWeaverMacDock = xt, window.LogicWeaverFullscreen = ao, window.enterFullscreenCard = (o) => ao.enter(o), window.exitFullscreenCard = () => ao.exit(), window.cycleFullscreenCard = () => ao.cycle(), window.LogicWeaverPageVisibility = lr, window.LogicWeaverBackgroundLibrary = _i, window.LogicWeaverNotificationCenter = Wt, window.LogicWeaverBookmarkMenu = si, window.LogicWeaverBookmarkPanel = wn, window.LogicWeaverBookmarkFolderStrip = fn, window.LogicWeaverLauncherDialogs = Zi, window.LogicWeaverLauncherFolder = Qi, window.LogicWeaverLauncherMenus = ri, window.LogicWeaverSettings = bn, window.LogicWeaverClockSettings = Vt, window.LogicWeaverBiliTheater = Po, window.LogicWeaverBilibiliService = gi, window.getBiliJct = () => gi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = nn, window.openBiliMiniPlayer = (o) => nn.openVideo(o), window.LogicWeaverAiDialog = pi, window.LogicWeaverAihotViewer = ci, window.LogicWeaverNavWheel = Pe, window.openNavWheel = (o, s) => Xe.open(o, s), window.closeNavWheel = () => Xe.close(), window.toggleNavWheel = (o) => Xe.toggle(o), window.toggleToolWheel = (o) => Xe.toggleTools(o), window.setNavWheelMode = (o) => Xe.setMode(o), window.LogicWeaverShortcuts = ei, window.triggerToolShortcut = (o) => ei.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = ra, window.LogicWeaverGitHubStatus = ai, window.LogicWeaverGitHubFolders = Do, window.LogicWeaverGitHubHero = Ao, window.LogicWeaverGitHubRepositories = At, window.LogicWeaverGitHubBatchBar = Eo, window.LogicWeaverTodoistLabels = la, window.LogicWeaverTodoistWorkspace = ca, window.LogicWeaverTodoistCalendarSidebar = da, window.LogicWeaverTodoistTaskList = ua, window.LogicWeaverBiliMessagePanel = zt, window.LogicWeaverStickerBoard = _a, window.LogicWeaverStickersService = Ca, window.LogicWeaverBiliFavorites = os, window.LogicWeaverBiliRadioTape = Vs, window.LogicWeaverBiliOrganizerDialogs = wa, window.LogicWeaverBiliUpGroupManager = ba, window.LogicWeaverBiliUpPreview = dn, window.LogicWeaverYouTube = ns, window.LogicWeaverAihotFeed = ts, window.LogicWeaverGitHubTrending = hs, window.LogicWeaverCalendarWorkspace = so, window.LogicWeaverCalendar = so, window.LogicWeaverTodoistMainWorkspace = pa, window.LogicWeaverTodoistTaskDetail = Ua, window.openBiliTheater = (o) => Po.openVideo(o), window.closeBiliTheater = () => Po.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const s = $n(o.target) || mi(o.url) || (o.appType === "bili" ? Gs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return $e.show({
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
    const r = typeof s == "object" && s ? s : a, g = typeof s == "number" ? s : 3200, f = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), l = r.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = r.subtitle || (o.length > 36 ? "" : o), L = r.message || (r.subtitle || o.length > 36 ? o : ""), F = {
      id: r.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l,
      subtitle: h || o,
      message: L && L !== h ? L : "",
      showActions: !!(r.showActions || r.actionLabel),
      actionLabel: r.actionLabel || "",
      onClick: r.onClick || null,
      target: $n(r.target) || mi(r.url) || $n({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
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
  }), window.LogicWeaverKineticDrag = Sa, window.LogicWeaverMarkdownAst = Ta, window.setLauncherBackground = (o) => hn.setWallpaper(o), window.backgroundDbClear = (o) => Us(o), window.openBackgroundHistory = () => _i.openDialog(), Ti("biliMiniPlayer", nn.machine), Ti("neteaseAuth", Qe.authMachine), window.__TAB_MACHINES__ = Xa();
}
const je = Se({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let en = null;
const ys = {
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
      await kn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (li.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", s = e.altKey && (e.code === "Space" || t === " ");
  (o || s) && (e.preventDefault(), e.stopPropagation(), ys.toggle());
}, !0);
function dr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => ys.toggle()
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
    enabled: () => $e.size > 0,
    run: () => $e.clear()
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
const ur = ["hidden"], pr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, hr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], fr = /* @__PURE__ */ fe({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = V(null);
    function o(r) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !r.deltaY || (r.preventDefault(), g.scrollLeft += r.deltaY);
    }
    function s(r) {
      fn.openFolder(r.id);
    }
    function a(r, g) {
      fn.openContextMenu(g, r.clientX, r.clientY);
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
      i(io).folders.length ? E("", !0) : (c(), p("span", pr, u(i(io).emptyMessage || "书签栏没有文件夹"), 1)),
      (c(!0), p(Q, null, we(i(io).folders, (f) => (c(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (l) => s(f),
        onContextmenu: z((l) => a(l, f), ["prevent"])
      }, [
        g[0] || (g[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(f.title || "未命名"), 1)
      ], 40, hr))), 128))
    ], 40, ur));
  }
}), gr = /* @__PURE__ */ Oe(fr, [["__scopeId", "data-v-df99d10f"]]), mr = ["aria-label"], vr = { class: "cube-manager-body" }, yr = ["disabled", "onClick", "title"], wr = ["disabled", "onClick", "title"], br = ["onClick"], kr = ["onClick"], _r = ["onClick"], Cr = ["type", "placeholder"], xr = { type: "submit" }, Lr = {
  key: 0,
  role: "alert"
}, $r = /* @__PURE__ */ fe({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = ze.state, o = te(() => ze.getActiveFaces()), s = te(() => t.registeredFaces.filter((D) => !t.activeFaceIds.includes(D.id))), a = V(""), r = V("memo"), g = te(() => [
      { value: "memo", label: d("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: d("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: d("cube.manager.typeLink"), icon: "🔗" }
    ]), f = V(""), l = V(!1), h = V(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), L = V("");
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
        const D = l.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: r.value,
          customData: { text: f.value, targetDate: f.value, url: f.value }
        };
        ze.addCustomFace(D), a.value = "", f.value = "";
      });
    }
    return (D, v) => (c(), pe(wt, { to: "body" }, [
      i(t).isConfigDialogOpen ? (c(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": i(d)("cube.manager.title"),
        onKeydown: v[8] || (v[8] = Oo(z((w) => i(ze).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          n("strong", null, u(i(d)("cube.manager.title")), 1),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: v[0] || (v[0] = (w) => i(ze).closeConfigDialog())
          }, "×")
        ]),
        n("div", vr, [
          n("p", null, u(i(d)("cube.manager.desc")), 1),
          (c(!0), p(Q, null, we(o.value, (w, T) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.icon) + " " + u(w.title), 1),
            n("button", {
              type: "button",
              disabled: T === 0,
              onClick: (y) => F(() => i(ze).moveUp(w.id)),
              title: i(d)("cube.manager.moveUp")
            }, "↑", 8, yr),
            n("button", {
              type: "button",
              disabled: T === o.value.length - 1,
              onClick: (y) => F(() => i(ze).moveDown(w.id)),
              title: i(d)("cube.manager.moveDown")
            }, "↓", 8, wr),
            n("button", {
              type: "button",
              onClick: (y) => F(() => i(ze).removeCustomFace(w.id))
            }, u(i(d)("cube.manager.removeFace")), 9, br)
          ]))), 128)),
          (c(!0), p(Q, null, we(s.value, (w) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.title) + u(i(d)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (T) => F(() => i(ze).toggleActive(w.id, !0))
            }, u(i(d)("cube.manager.add")), 9, kr),
            w.builtIn ? E("", !0) : (c(), p("button", {
              key: 0,
              type: "button",
              onClick: (T) => F(() => i(ze).removeCustomFace(w.id))
            }, u(i(d)("cube.manager.delete")), 9, _r))
          ]))), 128)),
          n("h3", null, u(i(d)("cube.manager.addFace")), 1),
          n("label", null, [
            tt(n("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (w) => l.value = w),
              type: "checkbox"
            }, null, 512), [
              [Ks, l.value]
            ]),
            ot(" " + u(i(d)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: z(m, ["prevent"])
          }, [
            l.value ? (c(), p(Q, { key: 1 }, [
              n("p", null, u(i(d)("cube.manager.securityNotice")), 1),
              tt(n("textarea", {
                "onUpdate:modelValue": v[6] || (v[6] = (w) => h.value = w),
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
                  "onUpdate:modelValue": v[2] || (v[2] = (w) => a.value = w),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [ho, a.value]
                ])
              ]),
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldType")) + " ", 1),
                Z(Gi, {
                  modelValue: r.value,
                  "onUpdate:modelValue": v[3] || (v[3] = (w) => r.value = w),
                  options: g.value,
                  size: "sm",
                  onChange: v[4] || (v[4] = (w) => r.value = w)
                }, null, 8, ["modelValue", "options"])
              ]),
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldContent")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[5] || (v[5] = (w) => f.value = w),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : i(d)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, Cr), [
                  [js, f.value]
                ])
              ])
            ], 64)),
            n("button", xr, u(i(d)("cube.manager.submitAdd")), 1)
          ], 32),
          L.value ? (c(), p("p", Lr, u(L.value), 1)) : E("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: v[7] || (v[7] = (w) => F(() => i(ze).resetDefaults()))
          }, u(i(d)("cube.manager.resetDefault")), 1),
          n("small", null, u(i(d)("cube.manager.resetNotice")), 1)
        ])
      ], 40, mr)) : E("", !0)
    ]));
  }
}), Sr = /* @__PURE__ */ Oe($r, [["__scopeId", "data-v-4cfc2436"]]), Tr = ["data-face"], Ir = ["aria-label"], Mr = { class: "ms-top-side" }, Dr = ["title"], Ar = ["title"], Er = ["title"], Pr = {
  key: 0,
  class: "ms-top-meta"
}, Wr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Rr = { class: "ms-top-artist" }, Or = { class: "ms-top-meta" }, Nr = ["title"], Br = ["title"], Fr = {
  key: 0,
  class: "ms-top-divider"
}, Hr = ["title"], Kr = { class: "ms-top-mini-progress" }, jr = { class: "ms-top-side" }, zr = ["title"], Vr = ["title"], Gr = ["aria-label"], Ur = ["title"], Yr = { class: "ms-cube-custom-icon" }, Xr = { class: "ms-cube-custom-title" }, qr = ["title"], Jr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Zr = ["href"], Qr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, el = ["title", "onClick"], tl = { class: "ms-cube-cm-header" }, ol = { class: "ms-cube-cm-list" }, nl = ["onClick"], il = { class: "ms-cube-cm-icon" }, sl = { class: "ms-cube-cm-title" }, al = {
  key: 0,
  class: "ms-cube-cm-check"
}, rl = /* @__PURE__ */ fe({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => Ui.visible || gt.djModalOpen || gt.isActive && gt.isJoined), s = te(() => gt.isActive && gt.isJoined), a = te(() => ze.getActiveFaces()), r = V("music"), g = V(0);
    let f = !1, l;
    We(
      () => a.value,
      (j) => {
        j.some((I) => I.id === r.value) || (r.value = j[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((j) => !j.builtIn)), L = V(!1), F = V({ x: 0, y: 0 });
    We(() => t.active, (j) => {
      j || (L.value = !1, ze.closeConfigDialog(), clearTimeout(l), f = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: D } = di({
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
      ee(j), L.value = !1;
    }
    function T() {
      L.value = !1, y(() => ze.resetDefaults()), ee("music");
    }
    function y(j) {
      L.value = !1;
      try {
        j();
      } catch (I) {
        $e.show({ appName: "滚动立方体", title: "保存失败", message: I instanceof Error ? I.message : "请检查浏览器存储" });
      }
    }
    function _(j) {
      if (!j) return d("cube.countdown.noTarget");
      const B = new Date(j).getTime() - k.value, ye = Math.ceil(B / (1e3 * 60 * 60 * 24));
      return ye > 0 ? d("cube.countdown.remaining", { days: ye }) : ye === 0 ? d("cube.countdown.today") : d("cube.countdown.passed", { days: Math.abs(ye) });
    }
    const x = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), N = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), H = te(() => oe.isBiliRadio ? d("cube.source.biliRadio") : oe.isNetease ? d("cube.source.netease") : oe.playing ? d("cube.source.siren") : d("cube.source.idle")), G = te(() => oe.currentLyric ? oe.currentLyric : oe.playing ? d("cube.defaultPlayingLyric") : d("cube.defaultIdleLyric"));
    function A() {
      Be.handleToolClick("music");
    }
    const k = V(Date.now());
    let $;
    We(() => t.active && a.value.some((j) => j.id === r.value && j.customType === "countdown"), (j) => {
      j && (k.value = Date.now()), clearInterval($), $ = j ? window.setInterval(() => {
        document.hidden || (k.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function ee(j, I = null) {
      const B = a.value, ye = B.find((Ie) => Ie.id === j) || B[0];
      if (ye) {
        if (Number.isFinite(I))
          g.value = I;
        else if (ye.id !== r.value) {
          const Ie = B.findIndex((be) => be.id === r.value);
          let _e = (B.findIndex((be) => be.id === ye.id) - Ie + B.length) % B.length;
          _e > B.length / 2 && (_e -= B.length), g.value += _e * 90;
        }
        r.value = ye.id;
      }
    }
    function W(j) {
      const I = a.value;
      if (I.length <= 1) return;
      const B = I.findIndex((_e) => _e.id === r.value), Ie = ((B >= 0 ? B : 0) + j + I.length) % I.length, Me = I[Ie];
      Me && ee(Me.id, g.value + j * 90);
    }
    function Y(j) {
      a.value.length <= 1 || j.altKey || Math.abs(j.deltaY) < 2 || (j.preventDefault(), !f && (f = !0, W(j.deltaY > 0 ? 1 : -1), l = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function R(j) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(j.key) || j.target?.closest?.("input") || (j.preventDefault(), W(["ArrowDown", "PageDown"].includes(j.key) ? 1 : -1));
    }
    function U(j, I) {
      return r.value === j ? {
        transform: `rotateX(${-g.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${I}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function ve(j) {
      const I = j.target;
      I && (I.tagName === "INPUT" || I.tagName === "TEXTAREA" || I.isContentEditable) || (j.preventDefault(), j.stopPropagation());
    }
    function xe(j) {
      const I = j.target;
      I && (I.tagName === "INPUT" || I.tagName === "TEXTAREA" || I.isContentEditable) || j.preventDefault();
    }
    return Ot(() => {
      clearInterval($), clearTimeout(l);
    }), (j, I) => tt((c(), p("div", {
      class: "ms-top-player",
      "data-face": r.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: Y,
      onKeydown: R,
      onContextmenu: v,
      onCopy: ve,
      onSelectstart: xe
    }, [
      a.value.length ? E("", !0) : (c(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: T
      }, "↺ 恢复默认音乐播放条")),
      n("div", {
        class: "ms-top-cube",
        style: Le({ transform: `translateZ(-22px) rotateX(${g.value}deg)` })
      }, [
        i(ze).isActive("music") && r.value === "music" ? (c(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": i(d)("cube.musicFaceAria"),
          style: Le(U("music", 0))
        }, [
          n("div", Mr, [
            n("button", {
              class: "ms-top-prev",
              title: i(d)("cube.prevTrack"),
              type: "button",
              onClick: I[0] || (I[0] = z((B) => i(Qe).prev(), ["stop"]))
            }, "⏮", 8, Dr),
            n("button", {
              class: "ms-top-play",
              title: i(d)("cube.playPause"),
              type: "button",
              onClick: I[1] || (I[1] = z((B) => i(Qe).togglePlay(), ["stop"]))
            }, u(i(oe).playing ? "⏸" : "▶"), 9, Ar)
          ]),
          n("button", {
            class: "ms-top-main",
            title: i(d)("cube.openMusicPicker"),
            type: "button",
            onClick: z(A, ["stop"])
          }, [
            o.value ? (c(), p("div", Pr, [
              n("span", Wr, " 🎧 " + u(s.value ? i(d)("cube.listeningTogether") : i(d)("cube.listening")) + "：" + u(x.value), 1),
              n("span", Rr, u(N.value), 1)
            ])) : (c(), p(Q, { key: 1 }, [
              n("div", Or, [
                n("span", {
                  class: "ms-top-title",
                  title: x.value
                }, u(x.value), 9, Nr),
                n("span", {
                  class: "ms-top-artist",
                  title: N.value
                }, u(N.value), 9, Br),
                n("span", {
                  class: de(["ms-top-source", { idle: !i(oe).playing }])
                }, u(H.value), 3),
                G.value ? (c(), p("span", Fr)) : E("", !0)
              ]),
              G.value ? (c(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: G.value
              }, u(G.value), 9, Hr)) : E("", !0)
            ], 64)),
            n("div", Kr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: Le({ width: i(oe).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Er),
          n("div", jr, [
            n("button", {
              class: "ms-top-next",
              title: i(d)("cube.nextTrack"),
              type: "button",
              onClick: I[2] || (I[2] = z((B) => i(Qe).next(), ["stop"]))
            }, "⏭", 8, zr),
            n("button", {
              class: "ms-top-open",
              title: i(d)("cube.openPlaylist"),
              type: "button",
              onClick: z(A, ["stop"])
            }, "🎵", 8, Vr)
          ])
        ], 12, Ir)) : E("", !0),
        (c(!0), p(Q, null, we(h.value, (B, ye) => (c(), p("section", {
          key: B.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": B.title,
          style: Le(U(B.id, (ye + 1) * 90))
        }, [
          r.value === B.id ? (c(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: B.desc
          }, [
            n("span", Yr, u(B.icon), 1),
            n("strong", Xr, u(B.title), 1),
            I[10] || (I[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            B.customType === "memo" ? (c(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: B.customData?.text
            }, u(B.customData?.text || i(d)("cube.memo.clickToConfig")), 9, qr)) : B.customType === "countdown" ? (c(), p("span", Jr, u(_(B.customData?.targetDate)), 1)) : B.customType === "link" ? (c(), p("a", {
              key: 2,
              href: B.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: I[3] || (I[3] = z(() => {
              }, ["stop"]))
            }, u(B.customData?.url) + " ↗ ", 9, Zr)) : E("", !0)
          ], 8, Ur)) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: I[4] || (I[4] = z((Ie) => i(ze).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Gr))), 128))
      ], 4),
      n("div", Qr, [
        (c(!0), p(Q, null, we(a.value, (B) => (c(), p("i", {
          key: B.id,
          class: de({ on: r.value === B.id }),
          title: B.title,
          onClick: z((ye) => ee(B.id), ["stop"])
        }, null, 10, el))), 128))
      ]),
      (c(), pe(wt, { to: "body" }, [
        t.active && L.value ? (c(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: Le(i(D)),
          onClick: I[9] || (I[9] = z(() => {
          }, ["stop"]))
        }, [
          n("div", tl, [
            I[11] || (I[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: I[5] || (I[5] = (B) => L.value = !1)
            }, "×")
          ]),
          n("div", ol, [
            (c(!0), p(Q, null, we(a.value, (B) => (c(), p("button", {
              key: B.id,
              type: "button",
              class: de(["ms-cube-cm-item", { active: r.value === B.id }]),
              onClick: (ye) => w(B.id)
            }, [
              n("span", il, u(B.icon), 1),
              n("span", sl, u(B.title), 1),
              r.value === B.id ? (c(), p("span", al, "✓")) : E("", !0)
            ], 10, nl))), 128))
          ]),
          a.value.length > 1 ? (c(), p(Q, { key: 0 }, [
            I[15] || (I[15] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-action",
              onClick: I[6] || (I[6] = (B) => {
                W(-1), L.value = !1;
              })
            }, [...I[12] || (I[12] = [
              n("span", null, "⏮ 上一个面板", -1)
            ])]),
            n("button", {
              type: "button",
              class: "ms-cube-cm-action",
              onClick: I[7] || (I[7] = (B) => {
                W(1), L.value = !1;
              })
            }, [...I[13] || (I[13] = [
              n("span", null, "⏭ 下一个面板", -1)
            ])]),
            r.value && r.value !== "music" ? (c(), p("button", {
              key: 0,
              type: "button",
              class: "ms-cube-cm-action danger",
              onClick: I[8] || (I[8] = (B) => y(() => i(ze).removeCustomFace(r.value)))
            }, " 删除当前面 ")) : E("", !0),
            n("button", {
              type: "button",
              class: "ms-cube-cm-action danger",
              onClick: T
            }, [...I[14] || (I[14] = [
              n("span", null, "↺ 恢复默认（仅音乐）", -1)
            ])])
          ], 64)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      t.active ? (c(), pe(Sr, { key: 1 })) : E("", !0)
    ], 40, Tr)), [
      [fo, t.active]
    ]);
  }
}), ll = /* @__PURE__ */ Oe(rl, [["__scopeId", "data-v-995b252f"]]), Mo = Se({
  isOpen: !1
}), ws = {
  open() {
    Mo.isOpen = !0;
  },
  close() {
    Mo.isOpen = !1;
  },
  toggle() {
    Mo.isOpen = !Mo.isOpen;
  }
}, ti = Rt(Mo);
function cl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (s, a, r) => {
    a.id !== chrome.runtime.id || s?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || s.targetTabId !== t || (ws.toggle(), r({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((s) => {
    e || (t = s?.id, chrome.runtime.onMessage.addListener(o));
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
    const t = X(() => import("./WorkspaceLaunchers-CSADUl0X.js"));
    function o(l) {
      l.preventDefault(), l.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : bn.open();
    }
    function s(l) {
      l.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : ii.toggleBookmarkPanel();
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
    return qe(() => {
      Wt.start();
      const l = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = l, document.documentElement.setAttribute("data-theme", l);
    }), (l, h) => (c(), p("header", {
      class: de(["topbar", { "bookmark-folders-mode": i(io).enabled }]),
      onCopy: g,
      onSelectstart: f
    }, [
      n("div", dl, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: i(d)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": i(Yi).isOpen,
          "aria-label": i(ko) ? i(d)("topbar.notificationsUnread", { count: i(ko) }) : i(d)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = z((L) => r(L), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: i(oo).avatarUrl || "assets/bilibili.svg",
            alt: i(oo).userName || i(d)("topbar.notifications")
          }, null, 8, pl),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: i(ko) <= 0
          }, u(i(ko) > 99 ? "99+" : i(ko)), 9, hl)
        ], 40, ul),
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
        ], 8, fl),
        n("div", gl, [
          Z(gr)
        ])
      ]),
      Z(ll, {
        active: !i(Tt).activeId
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
          Z(i(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: de(["tb-btn", { active: i(ti).isOpen }]),
          type: "button",
          title: i(d)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": i(ti).isOpen,
          onClick: h[1] || (h[1] = (L) => i(ws).toggle())
        }, " 📑 ", 10, yl),
        n("button", {
          id: "settings-open",
          class: "tb-btn",
          title: i(d)("topbar.settings"),
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
}, Ll = { class: "wx-cur" }, $l = { class: "wx-emoji" }, Sl = { class: "wx-temp" }, Tl = { class: "wx-sub" }, Il = { class: "wx-rain" }, Ml = { class: "wx-hours" }, Dl = { class: "hh" }, Al = { class: "he" }, El = { class: "ht" }, Pl = { class: "wx-days" }, Wl = ["open"], Rl = { class: "weather-forecast-head" }, Ol = { class: "weather-forecast-city-info" }, Nl = { class: "weather-forecast-icon" }, Bl = { id: "weather-forecast-city-title" }, Fl = { class: "small muted" }, Hl = { class: "weather-forecast-actions" }, Kl = ["title"], jl = ["title"], zl = {
  key: 0,
  class: "weather-metrics-grid"
}, Vl = { class: "weather-metric-item" }, Gl = { class: "metric-label" }, Ul = {
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
}, Ac = { key: 1 }, Ec = { class: "weather-section-subtitle" }, Pc = { class: "weather-quick-chips-grid" }, Wc = ["onClick"], Rc = /* @__PURE__ */ fe({
  __name: "WeatherWidget",
  setup(e) {
    const t = V(!1), o = V({ x: 0, y: 0 }), s = V(""), a = V(null), r = V(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const y = s.value.trim();
      return y ? to.filterCities(y, 6) : [];
    });
    function l(y) {
      const H = y?.clientX ?? window.innerWidth / 2 - 140, G = y?.clientY ?? window.innerHeight / 2 - 320 / 2, A = Math.max(12, Math.min(window.innerWidth - 280 - 12, H)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, G));
      o.value = { x: A, y: k }, t.value = !0, s.value = "", St(() => {
        r.value?.focus();
      });
    }
    function h() {
      t.value = !1, s.value = "";
    }
    async function L(y) {
      const _ = y.trim();
      _ && (h(), await to.changeCity(_));
    }
    function F() {
      const y = s.value.trim();
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
    qe(() => {
      ut.setRefreshAction(() => {
        to.loadWeather();
      }), ut.setChangeLocationAction((y) => {
        l(y);
      }), to.loadWeather(), We(mt, () => {
        to.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", D, !0);
    }), Ot(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", D, !0);
    });
    function v(y) {
      y.preventDefault(), l(y);
    }
    function w() {
      ut.closeForecastModal();
    }
    function T(y) {
      y.target?.id === "weather-forecast-dialog" && w();
    }
    return (y, _) => (c(), p("div", {
      class: "weather-widget-container",
      onContextmenu: v
    }, [
      i(q).state === "unconfigured" ? (c(), p("p", kl, u(i(d)("weather.noCitySet")), 1)) : i(q).state === "loading" ? (c(), p("p", _l, u(i(d)("common.loading")), 1)) : i(q).state === "not_found" ? (c(), p("p", Cl, u(i(d)("weather.cityNotFound", { city: i(q).city })), 1)) : i(q).state === "error" ? (c(), p("p", xl, u(i(q).errorMessage || i(d)("weather.loadFailed")), 1)) : i(q).state === "ready" && i(q).data ? (c(), p(Q, { key: 4 }, [
        n("div", Ll, [
          n("span", $l, u(i(q).data.currentEmoji), 1),
          n("span", Sl, u(i(q).data.currentTemp) + "°", 1)
        ]),
        n("p", Tl, u(i(q).data.subText), 1),
        n("p", Il, u(i(q).data.rainText), 1),
        n("div", Ml, [
          (c(!0), p(Q, null, we(i(q).data.hours, (x, N) => (c(), p("div", {
            key: N,
            class: "wx-h"
          }, [
            n("span", Dl, u(x.time), 1),
            n("span", Al, u(x.emoji), 1),
            n("span", El, u(x.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Pl, [
          (c(!0), p(Q, null, we(i(q).data.days, (x, N) => (c(), p("span", { key: N }, u(x.label) + " " + u(x.emoji) + " " + u(x.tempRange), 1))), 128))
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
          onClick: _[1] || (_[1] = z(() => {
          }, ["stop"]))
        }, [
          n("header", Rl, [
            n("div", Ol, [
              n("span", Nl, u(i(q).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", Bl, u(i(q).city || i(q).data?.cityName || i(d)("weather.forecastTitle")), 1),
                n("p", Fl, u(i(q).data?.subText || i(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", Hl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: i(d)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (x) => i(ut).refresh())
              }, u(i(d)("weather.refresh")), 9, Kl),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: i(d)("common.close"),
                onClick: w
              }, " ✕ ", 8, jl)
            ])
          ]),
          i(q).detailInfo ? (c(), p("div", zl, [
            n("div", Vl, [
              n("span", Gl, u(i(d)("weather.metric.humidity")), 1),
              n("span", Ul, u(i(q).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Yl, [
              n("span", Xl, u(i(d)("weather.metric.wind")), 1),
              n("span", ql, u(i(q).detailInfo.wind || (i(mt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", Jl, [
              n("span", Zl, u(i(d)("weather.metric.uv")), 1),
              n("span", Ql, u(i(q).detailInfo.uvIndex || (i(mt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", ec, [
              n("span", tc, u(i(d)("weather.metric.aqi")), 1),
              n("span", oc, u(i(q).detailInfo.airQuality || (i(mt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          n("div", nc, [
            (c(!0), p(Q, null, we(i(q).forecastDays, (x, N) => (c(), p("div", {
              key: N,
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
                x.rainProb > 0 ? (c(), p("span", uc, "☂️ " + u(x.rainProb) + "%", 1)) : (c(), p("span", pc, u(i(d)("weather.metric.noRain")), 1))
              ]),
              n("div", hc, [
                n("span", fc, u(x.lowTemp) + "°", 1),
                n("div", gc, [
                  n("div", {
                    class: "temp-range-fill",
                    style: Le({
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
      (c(), pe(wt, { to: "body" }, [
        t.value ? (c(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: Le({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: _[4] || (_[4] = z(() => {
          }, ["stop"])),
          onContextmenu: _[5] || (_[5] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", vc, [
            n("div", yc, [
              n("span", wc, u(i(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: i(q).city
              }, [
                _[6] || (_[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                ot(" " + u(i(q).city || i(d)("weather.menu.unset")), 1)
              ], 8, bc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: z(F, ["prevent"])
          }, [
            n("div", kc, [
              _[7] || (_[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              tt(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: i(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (x) => s.value = x),
                onKeydown: Oo(z(F, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, _c), [
                [ho, s.value]
              ]),
              s.value ? (c(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (x) => s.value = ""),
                title: i(d)("weather.menu.clearInput")
              }, "✕", 8, Cc)) : E("", !0)
            ]),
            n("button", xc, u(i(d)("weather.menu.submit")), 1)
          ], 32),
          s.value.trim() ? (c(), p("div", Lc, [
            n("div", $c, u(i(d)("weather.menu.suggestions")), 1),
            f.value.length ? (c(), p("div", Sc, [
              (c(!0), p(Q, null, we(f.value, (x) => (c(), p("button", {
                key: x.name + x.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (N) => L(x.name)
              }, [
                n("span", Ic, u(x.name), 1),
                n("span", Mc, u(x.admin), 1)
              ], 8, Tc))), 128))
            ])) : (c(), p("div", Dc, u(i(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), p("div", Ac, [
            n("div", Ec, u(i(d)("weather.menu.commonCities")), 1),
            n("div", Pc, [
              (c(), p(Q, null, we(g, (x) => n("button", {
                key: x,
                type: "button",
                class: de(["weather-quick-chip", { active: i(q).city === x }]),
                onClick: (N) => L(x)
              }, u(x), 11, Wc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), bs = /* @__PURE__ */ Oe(Rc, [["__scopeId", "data-v-bf1a1ba5"]]), oi = "heroCustomMottoV1";
function Oc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(oi);
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
const Qt = Oc(), J = Se({
  loaded: !1,
  customText: Qt.customText,
  history: Qt.history,
  currentIndex: Qt.customText && Qt.history.length ? Qt.history.findIndex((e) => e.text === Qt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Nc(e) {
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
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, s = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: s };
}
const ct = {
  async init() {
    try {
      const e = await Nc(oi);
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
    await Bc(oi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: s } = Fc(/* @__PURE__ */ new Date());
    J.customText = t;
    const a = J.history.findIndex((r) => r.text === t);
    if (a !== -1) {
      const r = J.history.splice(a, 1)[0];
      r.date = o, r.time = s, J.history.unshift(r);
    } else
      J.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: s,
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
}, Hc = ["title"], Kc = ["placeholder"], jc = { class: "motto-content" }, zc = ["title"], Vc = { class: "motto-menu-header" }, Gc = { class: "dim" }, Uc = { class: "motto-history-label" }, Yc = { class: "motto-history-list" }, Xc = {
  key: 0,
  class: "motto-history-empty dim"
}, qc = ["onClick"], Jc = { class: "motto-item-date" }, Zc = ["title"], Qc = ["title", "onClick"], ed = /* @__PURE__ */ fe({
  __name: "HeroMotto",
  setup(e) {
    const t = V(!1), o = V(""), s = V(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function r(v) {
      const w = a[v];
      return w ? d(w) : v;
    }
    const g = te(() => J.customText ? r(J.customText) : ke.greetingText);
    function f() {
      ct.closeMenu(), o.value = J.customText || ke.greetingText, t.value = !0, St(() => {
        s.value?.focus(), s.value?.select();
      });
    }
    function l() {
      if (!t.value) return;
      t.value = !1;
      const v = o.value.trim();
      ct.setCustomMotto(v), v && $e.fetch(d("motto.appName"), d("motto.updated", { text: v }));
    }
    function h() {
      t.value = !1;
    }
    function L(v) {
      v.key === "Enter" ? (v.preventDefault(), l()) : v.key === "Escape" && (v.preventDefault(), h());
    }
    function F(v) {
      t.value || (v.preventDefault(), v.stopPropagation(), ct.stepHistory(v.deltaY > 0 ? 1 : -1));
    }
    function m(v) {
      v.preventDefault(), v.stopPropagation(), ct.openMenu(v.clientX, v.clientY);
    }
    function D(v) {
      J.menuOpen && (v.target.closest(".motto-context-menu") || ct.closeMenu());
    }
    return qe(() => {
      ct.init(), window.addEventListener("click", D);
    }), Ot(() => {
      window.removeEventListener("click", D);
    }), (v, w) => (c(), p(Q, null, [
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
          "onUpdate:modelValue": w[0] || (w[0] = (T) => o.value = T),
          class: "hero-motto-input",
          type: "text",
          placeholder: i(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: L
        }, null, 40, Kc)), [
          [ho, o.value]
        ]) : (c(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: Le({
            color: i(ke).greetColor,
            textShadow: i(ke).greetColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
          }),
          onClick: f
        }, [
          n("span", jc, u(g.value), 1),
          i(J).history.length > 1 ? (c(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: i(d)("motto.scrollHint")
          }, "⇕", 8, zc)) : E("", !0)
        ], 4))
      ], 40, Hc),
      (c(), pe(wt, { to: "body" }, [
        i(J).menuOpen ? (c(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: Le({ left: `${i(J).menuPos.x}px`, top: `${i(J).menuPos.y}px` }),
          onClick: w[3] || (w[3] = z(() => {
          }, ["stop"])),
          onContextmenu: w[4] || (w[4] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", Vc, [
            n("span", null, u(i(d)("motto.customTitle")), 1),
            n("small", Gc, u(i(d)("motto.recordsCount", { count: i(J).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            w[5] || (w[5] = n("i", null, "✎", -1)),
            n("span", null, u(i(d)("motto.editCurrent")), 1)
          ]),
          w[8] || (w[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Uc, u(i(d)("motto.historyLabel")), 1),
          n("div", Yc, [
            i(J).history.length ? (c(!0), p(Q, { key: 1 }, we(i(J).history, (T) => (c(), p("div", {
              key: T.id,
              class: de(["motto-history-item", { active: i(J).customText === T.text }]),
              onClick: (y) => i(ct).selectHistory(T)
            }, [
              n("span", Jc, u(T.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(T.text)
              }, u(r(T.text)), 9, Zc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: i(d)("motto.deleteEntry"),
                onClick: z((y) => i(ct).deleteEntry(T.id), ["stop"])
              }, "×", 8, Qc)
            ], 10, qc))), 128)) : (c(), p("div", Xc, u(i(d)("motto.historyEmpty")), 1))
          ]),
          w[9] || (w[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: w[1] || (w[1] = //@ts-ignore
            (...T) => i(ct).resetToSystem && i(ct).resetToSystem(...T))
          }, [
            w[6] || (w[6] = n("i", null, "↻", -1)),
            n("span", null, u(i(d)("motto.resetGreeting")), 1)
          ]),
          i(J).history.length ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: w[2] || (w[2] = //@ts-ignore
            (...T) => i(ct).clearHistory && i(ct).clearHistory(...T))
          }, [
            w[7] || (w[7] = n("i", null, "🗑", -1)),
            n("span", null, u(i(d)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), td = /* @__PURE__ */ Oe(ed, [["__scopeId", "data-v-afc4beae"]]), od = /* @__PURE__ */ fe({
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
      const l = (G) => String(G).padStart(2, "0"), h = s(), L = h.getHours(), F = h.getMinutes(), m = h.getSeconds(), D = h.getFullYear(), v = h.getMonth() + 1, w = h.getDate(), T = h.getDay(), y = `${l(L)}:${l(F)}`, _ = `:${l(m)}`, x = o(L), N = d(t[T]), H = d("clock.datePattern", {
        year: D,
        month: v,
        day: w,
        week: N
      });
      ro.updateTime(y, _, x, H);
    }
    function r(l) {
      l.preventDefault(), Vt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function g() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Vt.initPreferences(), a(), qe(() => {
      Vt.initPreferences(), We(mt, () => {
        a();
      }), Tt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", g);
    }), We(
      () => Tt.activeId,
      (l) => {
        l ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Ot(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", g);
    }), (l, h) => (c(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: Le({
          fontFamily: i(ke).fontFamily,
          color: i(ke).colorHex,
          textShadow: i(ke).colorHex === "#0f172a" ? "none" : "0 2px 14px rgba(0, 0, 0, 0.45)"
        })
      }, [
        ot(u(i(ke).timeText), 1),
        n("span", {
          id: "secs",
          style: Le({ color: i(ke).colorHex })
        }, u(i(ke).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: Le({
          color: i(ke).dateColor,
          textShadow: i(ke).dateColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
        })
      }, u(i(ke).dateText), 5)
    ], 32));
  }
}), ks = /* @__PURE__ */ Oe(od, [["__scopeId", "data-v-16c004bb"]]), nd = {
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
}, xd = { class: "home-music-actions" }, Ld = ["title"], $d = ["title"], Sd = ["title"], Td = ["title"], Id = ["title"], Md = /* @__PURE__ */ fe({
  __name: "HomeMusicCard",
  setup(e) {
    qe(() => {
      setTimeout(() => {
        Ys();
      }, 200);
    });
    const t = te(() => Ui.visible || gt.djModalOpen || gt.isActive && gt.isJoined), o = te(() => gt.isActive && gt.isJoined), s = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), a = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), r = te(() => oe.mode === "shuffle" ? "🔀" : oe.mode === "one" ? "🔂" : "🔁");
    function g(l) {
      const h = l.target, L = Number(h.value);
      Qe.seek(L);
    }
    function f() {
      Qe.update({ coverUrl: "" });
    }
    return (l, h) => (c(), p("div", {
      id: "home-music-player-view",
      class: de(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), p("div", nd, [
        n("div", id, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", sd, u(o.value ? i(d)("home.music.togetherListening") : i(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), p("span", ad, " DJ: " + u(i(gt).hostName), 1)) : (c(), p("span", rd, u(i(d)("home.music.workspaceReady")), 1))
        ]),
        n("div", ld, [
          n("h3", {
            class: "degraded-track-title",
            title: s.value
          }, u(s.value || i(d)("home.music.standby")), 9, cd),
          n("p", dd, u(a.value), 1)
        ]),
        n("div", ud, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: Le({ width: i(oe).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", pd, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (L) => i(Qe).togglePlay())
          }, u(i(oe).playing ? i(d)("home.music.pause") : i(d)("home.music.play")), 1),
          n("span", hd, u(i(oe).formattedCurrent) + " / " + u(i(oe).formattedDuration), 1)
        ])
      ])) : (c(), p(Q, { key: 1 }, [
        n("div", fd, [
          n("div", {
            id: "home-vinyl-needle",
            class: de(["home-vinyl-needle", { playing: i(oe).playing }])
          }, [...h[8] || (h[8] = [
            Io('<svg viewBox="0 0 32 52" fill="none" data-v-6f1e9a8e><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-6f1e9a8e></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-6f1e9a8e></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6f1e9a8e></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-6f1e9a8e></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: de(["home-vinyl-disc", { playing: i(oe).playing }]),
            title: i(d)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (L) => i(Qe).togglePlay())
          }, [
            i(oe).coverUrl ? (c(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: i(oe).coverUrl,
              alt: i(d)("home.music.coverAlt"),
              onError: f
            }, null, 40, md)) : E("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, gd)
        ]),
        n("div", vd, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s.value
          }, u(s.value), 9, yd),
          n("p", wd, u(a.value), 1),
          n("div", bd, [
            n("span", kd, u(i(oe).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: i(oe).progressPercent,
              onInput: g
            }, null, 40, _d),
            n("span", Cd, u(i(oe).formattedDuration), 1)
          ]),
          n("div", xd, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (L) => i(Qe).prev())
            }, " ⏮ ", 8, Ld),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: i(d)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (L) => i(Qe).togglePlay())
            }, u(i(oe).playing ? "⏸" : "▶"), 9, $d),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (L) => i(Qe).next())
            }, " ⏭ ", 8, Sd),
            n("button", {
              id: "home-music-like",
              class: de(["home-music-btn like-btn", { liked: i(oe).liked }]),
              type: "button",
              title: i(d)("home.music.favorite"),
              onClick: h[5] || (h[5] = (L) => i(Qe).toggleLike())
            }, u(i(oe).liked ? "♥" : "♡"), 11, Td),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.playMode"),
              onClick: h[6] || (h[6] = (L) => i(Qe).cycleMode())
            }, u(r.value), 9, Id)
          ])
        ])
      ], 64))
    ], 2));
  }
}), _s = /* @__PURE__ */ Oe(Md, [["__scopeId", "data-v-6f1e9a8e"]]), Lt = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Set();
function Dd(e, t) {
  for (Lt.delete(e), Lt.set(e, t), $t.delete(t), $t.add(t); Lt.size > 512; )
    Lt.delete(Lt.keys().next().value);
  for (; $t.size > 512; )
    $t.delete($t.values().next().value);
}
const Ad = {
  key: 0,
  class: "launcher-fallback"
}, Ed = ["src"], Hn = "lw_resolved_icon:", Pd = /* @__PURE__ */ fe({
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
    function s(y) {
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
    }), h = V([]), L = V(0), F = V(!1), m = V(!1), D = te(() => m.value || L.value >= h.value.length ? "" : h.value[L.value] || "");
    function v() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], m.value = !0, F.value = !1;
        return;
      }
      const _ = [], x = s(y.url);
      x && _.push(x);
      const N = Lt.get(y.url) || t(y.url);
      N && !_.includes(N) && _.push(N);
      const H = (W) => W ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(W) : !1;
      y.customIcon && !H(y.customIcon) && _.push(y.customIcon), y.icon && !H(y.icon) && _.push(y.icon);
      const G = f(y.url);
      G && !_.includes(G) && _.push(G);
      const A = Ee.getCachedIcon(y.url);
      A && !_.includes(A) && _.push(A);
      const k = g(y.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && _.push(`${k}/favicon.ico`), y.customIcon && !H(y.customIcon) && _.unshift(y.customIcon);
      const $ = [...new Set(_.filter(Boolean))];
      h.value = $, L.value = 0, m.value = $.length === 0;
      const ee = $[0];
      ee && (ee.startsWith("data:") || $t.has(ee)) && (F.value = !0);
    }
    We(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, _) => {
        _ && y[0] === _[0] && y[1] === _[1] && y[2] === _[2] || v();
      },
      { immediate: !0 }
    ), qe(() => {
      h.value.length === 0 && v();
    });
    function w(y) {
      F.value = !0, m.value = !1;
      const _ = D.value;
      if (_) {
        const x = $t.has(_), N = Lt.get(a.link.url);
        Dd(a.link.url, _), N !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const H = y.target;
        if (!x && !_.startsWith("data:")) {
          const G = a.link.url;
          setTimeout(() => {
            Ee.cacheIcon(G, _, H?.getAttribute("src") === _ ? H : null);
          }, 0);
        }
      }
    }
    function T() {
      const y = D.value;
      if (y) {
        $t.delete(y), Lt.get(a.link.url) === y && Lt.delete(a.link.url);
        try {
          localStorage.removeItem(Hn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && Ee.getCachedIcon(a.link.url) === y && Ee.evictCachedIcon(a.link.url), L.value + 1 < h.value.length) {
        L.value += 1;
        const _ = h.value[L.value];
        _ && (_.startsWith("data:") || $t.has(_)) && (F.value = !0);
      } else
        m.value = !0, F.value = !1;
    }
    return (y, _) => (c(), p("span", {
      class: de(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !D.value ? (c(), p("span", Ad, u(l.value), 1)) : (c(), p("img", {
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
}), yn = /* @__PURE__ */ Oe(Pd, [["__scopeId", "data-v-49e611bb"]]), Wd = { class: "launcher-label launcher-title" }, Rd = ["title"], Od = {
  key: 0,
  class: "launcher-folder-more"
}, Nd = {
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
    const t = e, o = te(() => t.size === "large" ? 9 : 4), s = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, r) => e.link ? (c(), p(Q, { key: 0 }, [
      Z(yn, { link: e.link }, null, 8, ["link"]),
      n("span", Wd, u(e.link.title), 1)
    ], 64)) : e.folder ? (c(), p(Q, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (c(!0), p(Q, null, we(s.value, (g) => (c(), pe(yn, {
          key: g.id,
          link: g,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (c(), p("span", Od, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        s.value.length ? E("", !0) : (c(), p("span", Nd, "📁")),
        pn(a.$slots, "default", {}, void 0, !0)
      ], 8, Rd),
      n("span", Bd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Ro = /* @__PURE__ */ Oe(Fd, [["__scopeId", "data-v-289b8350"]]), Cs = 5, xs = 180;
function Ls(e, t, o) {
  const s = t - e.left, a = o - e.top;
  return s > e.width * 0.25 && s < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function $s(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Hd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Kd = { class: "card-head aihot-home-head" }, jd = { class: "title" }, zd = ["title"], Vd = ["title"], Gd = {
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
}, iu = { class: "aihot-home-rich-source" }, su = { class: "aihot-home-rich-time" }, Oi = 6, au = /* @__PURE__ */ fe({
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
    }, o = V([]), s = V(0), a = V(!0), r = V("");
    function g(y) {
      return mt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return mt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
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
    const h = te(() => mt.value !== "en" ? o.value : [...o.value].sort((y, _) => {
      const x = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), N = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return x && !N ? -1 : !x && N ? 1 : 0;
    }));
    function L(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return mt.value === "en" ? "Latest" : "最新";
      const x = Number(_), N = Number.isFinite(x) && x > 0 ? new Date(x > 1e12 ? x : x * 1e3) : new Date(_);
      if (isNaN(N.getTime())) return String(_).slice(0, 16) || (mt.value === "en" ? "Latest" : "最新");
      const H = (W) => String(W).padStart(2, "0"), G = N.getFullYear(), A = H(N.getMonth() + 1), k = H(N.getDate()), $ = H(N.getHours()), ee = H(N.getMinutes());
      return `${G}-${A}-${k} ${$}:${ee}`;
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
      for (const N of x)
        try {
          const H = localStorage.getItem(N);
          if (H) {
            const G = JSON.parse(H);
            if (Array.isArray(G) && G.length) return G;
            if (G && Array.isArray(G.items) && G.items.length) return G.items;
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
        const N = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), H = Array.isArray(N) ? N : N.items || N.data || N.results || [];
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
      s.value += Oi, s.value >= h.value.length && (s.value = 0);
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
      ci.openArticle(
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
    return qe(() => {
      D();
    }), (y, _) => (c(), p("section", Hd, [
      n("header", Kd, [
        _[0] || (_[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", jd, u(i(d)("aihot.card.title")), 1),
        _[1] || (_[1] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: i(d)("aihot.card.refreshBtnTip"),
          onClick: v
        }, u(i(d)("aihot.card.refreshBtn")), 9, zd),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: i(d)("aihot.card.hotlistBtnTip"),
          onClick: w
        }, u(i(d)("aihot.card.hotlistBtn")), 9, Vd)
      ]),
      n("div", Gd, [
        a.value && !h.value.length ? (c(), p("p", Ud, u(i(d)("aihot.card.loading")), 1)) : r.value && !h.value.length ? (c(), p("p", Yd, u(r.value), 1)) : h.value.length ? (c(), p("div", qd, [
          (c(!0), p(Q, null, we(h.value.slice(s.value, s.value + Oi), (x, N) => (c(), p("a", {
            key: x.id || x.title,
            class: "aihot-home-rich-card",
            href: x.links?.original || x.links?.aihot || x.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${g(x)}
${x.summary || ""}
${i(d)("aihot.card.viewInReader")}`,
            onClick: (H) => T(x, H)
          }, [
            n("span", {
              class: de(["aihot-home-rich-rank", { top: s.value + N < 3 }])
            }, u(s.value + N + 1), 3),
            n("div", Zd, [
              n("h3", Qd, u(g(x)), 1),
              x.summary ? (c(), p("p", eu, u(x.summary), 1)) : E("", !0),
              n("div", tu, [
                n("div", ou, [
                  l(x) ? (c(), p("span", nu, u(l(x)), 1)) : E("", !0),
                  n("span", iu, u(f(x)), 1)
                ]),
                n("time", su, u(L(x)), 1)
              ])
            ])
          ], 8, Jd))), 128))
        ])) : (c(), p("p", Xd, u(i(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), ru = /* @__PURE__ */ Oe(au, [["__scopeId", "data-v-01e71b65"]]), lu = ["aria-label"], cu = ["disabled", "aria-pressed"], du = ["disabled", "aria-pressed"], uu = ["aria-label"], pu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], hu = {
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
    const t = X(() => import("./BookmarkBoard-C5UYtJ7e.js")), o = X(() => import("./LauncherBookGuideDialog-C1G_ik3R.js")), s = te({
      get: () => ue.sitesView || "sites",
      set: (b) => Fe.setSitesView(b)
    }), a = V(!1), r = V(!1);
    function g() {
      r.value = !0;
    }
    function f() {
      r.value = !1;
    }
    function l() {
      be(), w = !1, ve = !1;
    }
    qe(() => {
      Fe.setExternalDragHandler(A), Fe.setExternalDropHandler(k), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const b = window;
      ue.hasBili && typeof b.ensureLauncherMediaCards == "function" && b.ensureLauncherMediaCards();
    });
    const h = V(!1), L = V(""), F = V(null), m = V(null), D = V(null), v = V(null);
    let w = !1, T = 0, y = 0, _ = 0, x = "", N = 0, H = "", G = 0;
    function A(b) {
      if (s.value !== "sites") return;
      if (!b || _t.isOpen) {
        v.value && (v.value = null), H = "";
        return;
      }
      const C = document.elementsFromPoint(b.clientX, b.clientY);
      if (!C.some(
        (Ue) => Ue.classList.contains("launcher-site-items") || !!Ue.closest?.(".launcher-site-items")
      )) {
        v.value && (v.value = null), H = "";
        return;
      }
      const P = C.find((Ue) => Ue.classList.contains("launcher-link") && Ue.getAttribute("data-launcher-id") !== String(b.link.id) || Ue.classList.contains("launcher-folder"));
      if (!P) return;
      const se = P.classList.contains("launcher-link"), Ce = se ? P.getAttribute("data-launcher-id") : null, Ke = se ? null : P.getAttribute("data-launcher-folder"), re = se ? `link-${Ce}` : `folder-${Ke}`, le = P.getBoundingClientRect(), Je = le.left + le.width / 2, xn = le.top + le.height / 2, bo = Math.hypot(b.clientX - Je, b.clientY - xn), Xt = Date.now();
      if (bo > Math.max(le.width, le.height) * 0.55 || re === H && Xt - G < 180) return;
      const qt = Ut.value.filter(
        (Ue) => Ue.type !== "link" || String(Ue.link.id) !== String(b.link.id)
      ), vt = [...v.value || qt], Mt = vt.findIndex(
        (Ue) => Ue.type === "link" && String(Ue.link.id) === String(b.link.id)
      ), Dt = vt.findIndex((Ue) => Ue.key === re);
      if (Dt < 0) return;
      const at = {
        key: `link-${b.link.id}`,
        type: "link",
        link: b.link
      };
      Mt >= 0 ? Mt !== Dt && (vt.splice(Mt, 1), vt.splice(Dt, 0, at), v.value = vt, H = re, G = Xt) : (vt.splice(Dt, 0, at), v.value = vt, H = re, G = Xt);
    }
    async function k(b) {
      if (s.value !== "sites" || _t.isOpen) return !1;
      if (v.value) {
        const C = v.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await Ee.moveLinkTo(String(b.id), ue.activePage, "常用网站"), await Ee.reorderPageItems(ue.activePage, C), v.value = null, H = "", !0;
      }
      return !1;
    }
    const $ = Se({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let ee = null, W = 0, Y = 0, R = null, U = null, ve = !1;
    function xe(b, C) {
      if (C.button !== 0) return;
      ee = C.pointerId, W = C.clientX, Y = C.clientY, y = C.clientX, _ = C.clientY, R = String(b.id), U = null, ve = !1;
      const S = C.currentTarget.getBoundingClientRect();
      $.offsetX = C.clientX - S.left, $.offsetY = C.clientY - S.top, $.type = "link", $.link = b, $.folder = null, window.addEventListener("pointermove", Ie, { passive: !1 }), window.addEventListener("pointerup", _e), window.addEventListener("pointercancel", _e);
    }
    function j(b, C, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      ee = S.pointerId, W = S.clientX, Y = S.clientY, y = S.clientX, _ = S.clientY, R = null, U = b, ve = !1;
      const P = S.currentTarget.getBoundingClientRect();
      $.offsetX = S.clientX - P.left, $.offsetY = S.clientY - P.top, $.type = "folder", $.folder = {
        groupName: b,
        size: Ne(b),
        links: C?.links || []
      }, $.link = null, window.addEventListener("pointermove", Ie, { passive: !1 }), window.addEventListener("pointerup", _e), window.addEventListener("pointercancel", _e);
    }
    let I = 0, B = null;
    function ye() {
      cancelAnimationFrame(I), I = 0, B = null;
    }
    function Ie(b) {
      b.pointerId === ee && (ve && b.cancelable && b.preventDefault(), B = b, !I && (I = requestAnimationFrame(() => {
        I = 0;
        const C = B;
        B = null, C && Me(C);
      })));
    }
    function Me(b) {
      if (b.pointerId !== ee || !R && !U) return;
      const C = Math.hypot(b.clientX - W, b.clientY - Y);
      if (!ve && C > Cs && (ve = !0, w = !0, R ? m.value = R : U && (D.value = U)), !ve) return;
      ($.link || $.folder) && ($.visible = !0, $.x = b.clientX - $.offsetX, $.y = b.clientY - $.offsetY);
      const S = document.elementsFromPoint(b.clientX, b.clientY);
      if (fi()) {
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
      const se = v.value || Ut.value, Ce = R ? `link-${R}` : `folder-${U}`;
      if (se.length) {
        const re = S.find((le) => {
          if (le.classList.contains("launcher-link")) {
            const Je = le.getAttribute("data-launcher-id");
            return Je && `link-${Je}` !== Ce;
          }
          if (le.classList.contains("launcher-folder")) {
            const Je = le.getAttribute("data-launcher-folder");
            return Je && `folder-${Je}` !== Ce;
          }
          return !1;
        });
        if (re) {
          const le = re.classList.contains("launcher-link"), Je = le ? re.getAttribute("data-launcher-id") : null, xn = le ? null : re.getAttribute("data-launcher-folder"), bo = le ? `link-${Je}` : `folder-${xn}`, Xt = re.getBoundingClientRect();
          let qt = !0;
          R && !le && (Ls(Xt, b.clientX, b.clientY) ? (qt = !1, re.classList.add("drop-target")) : re.classList.remove("drop-target"));
          const vt = Date.now();
          if ($s(Xt, b.clientX, b.clientY) || (qt = !1), bo === x && vt - N < xs && (qt = !1), qt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((at) => at.classList.remove("drop-target"));
            const Mt = se.findIndex((at) => at.key === Ce), Dt = se.findIndex((at) => at.key === bo);
            if (Mt >= 0 && Dt >= 0 && Mt !== Dt) {
              const at = se.slice(), Ue = at.splice(Mt, 1)[0];
              at.splice(Dt, 0, Ue), v.value = at, x = bo, N = vt;
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
    async function _e(b) {
      if (b.pointerId === ee) {
        ye(), b.type === "pointercancel" ? be() : Me(b), window.removeEventListener("pointermove", Ie), window.removeEventListener("pointerup", _e), window.removeEventListener("pointercancel", _e);
        try {
          if (ve) {
            T = Date.now(), w = !1;
            const C = document.elementsFromPoint(b.clientX, b.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((P) => P.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((P) => P.classList.remove("drop-target")), fi() && _t.activeFolder) {
              if (C.some(
                (se) => se.id === "launcher-folder-dialog" || !!se.closest?.("#launcher-folder-dialog")
              )) {
                const Ce = C.find((Ke) => Ke.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || _t.activeFolder;
                R ? await Ee.moveLinkTo(R, void 0, Ce) : U && await Ee.moveFolderInto(U, Ce);
              }
              return;
            }
            const S = C.find((P) => P.classList.contains("launcher-page-tab"));
            if (S) {
              const P = S.getAttribute("data-page");
              if (P) {
                R ? (await Ee.moveLinkTo(R, P, "常用网站"), await Ee.setPage(P)) : U && await Ee.moveFolderToPage(U, P), be();
                return;
              }
            }
            if (R) {
              const P = C.find((se) => se.classList.contains("launcher-folder"));
              if (P) {
                const se = P.getAttribute("data-launcher-folder");
                if (se) {
                  await Ee.moveLinkTo(R, ue.activePage, se), be();
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
              await Ee.reorderPageItems(ue.activePage, P);
            }
          }
        } catch (C) {
          $e.show({ appName: "常用网站", title: "移动未完成", message: C instanceof Error ? C.message : "请刷新核对，未自动重试。" });
        } finally {
          be();
        }
      }
    }
    function be() {
      ye(), ee = null, R = null, U = null, ve = !1, w = !1, m.value = null, D.value = null, v.value = null, $.visible = !1, $.link = null, $.folder = null, x = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), _t.dropHoverValid = !1, window.removeEventListener("pointermove", Ie), window.removeEventListener("pointerup", _e), window.removeEventListener("pointercancel", _e);
    }
    Ot(() => {
      Fe.setExternalDragHandler(null), Fe.setExternalDropHandler(null), be(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", Ie), window.removeEventListener("pointerup", _e), window.removeEventListener("pointercancel", _e);
    });
    function Ge(b) {
      const C = ue.pageLabels;
      return C && C[b] ? C[b] : b || "常用网站";
    }
    function et(b, C) {
      const S = String(b.page || "").trim(), P = String(C).trim(), se = ue.pageLabels || {}, Ce = !S || S === "常用网站" || S === "默认";
      if (!P || P === "常用网站" || P === "默认") return Ce;
      if (Ce) return !1;
      if (S === P) return !0;
      const re = se[S] || S, le = se[P] || P;
      return re === le || S === le || re === P;
    }
    function Ne(b) {
      const C = ue.groupSizes;
      return C && C[b] === "large" ? "large" : "small";
    }
    function It(b) {
      return b === "large" ? 9 : 4;
    }
    function Nt(b, C) {
      const S = It(C), P = b.length > S ? S - 1 : S;
      return b.slice(0, P);
    }
    const Ut = te(() => {
      const b = ue.activePage || "常用网站", S = ue.links.filter(
        (re) => et(re, b)
      ), P = /* @__PURE__ */ new Map();
      S.forEach((re) => {
        const le = re.group || "常用网站";
        le !== "常用网站" && (P.has(le) || P.set(le, []), P.get(le).push(re));
      });
      const se = /* @__PURE__ */ new Set(), Ce = [];
      S.forEach((re) => {
        const le = re.group || "常用网站";
        vi(ue.folders, le) || (le === "常用网站" ? Ce.push({ key: `link-${re.id}`, type: "link", link: re }) : se.has(le) || (se.add(le), Ce.push({
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
        if (vi(ue.folders, re)) return;
        const Je = le?.page || "常用网站";
        (Je === b || b === "常用网站" && Je === "默认") && !se.has(re) && (se.add(re), Ce.push({
          key: `folder-${re}`,
          type: "folder",
          folder: {
            groupName: re,
            pageName: b,
            links: P.get(re) || []
          }
        }));
      }), Ce;
    }), yo = te(() => v.value && v.value.length ? v.value : Ut.value), nt = te(() => {
      const b = ue.activePage || "常用网站", C = Ge(b);
      return C === "默认" || b === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Ho(b) {
      v.value = null, m.value = null, D.value = null, Fe.switchPage(b);
    }
    function Ko() {
      h.value = !0, L.value = "", St(() => {
        F.value?.focus();
      });
    }
    function wo() {
      if (!h.value) return;
      const b = L.value.trim();
      h.value = !1, b && Fe.addPage(b);
    }
    function jo(b) {
      b.key === "Enter" ? (b.preventDefault(), wo()) : b.key === "Escape" && (h.value = !1);
    }
    function Yt(b, C) {
      Fe.openPageMenu(b, C);
    }
    function zo(b) {
      const C = b.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      b.preventDefault();
      const S = ue.activePage || "常用网站";
      ri.openBlankMenu(S, b.clientX, b.clientY);
    }
    function M(b) {
      s.value === "sites" && (!b.shiftKey || ue.pages.length < 2 || (b.preventDefault(), b.deltaY > 0 || b.deltaX > 0 ? Fe.nextPage() : Fe.prevPage()));
    }
    function O(b) {
      b.target.closest(".launcher-page-tab") || b.stopPropagation();
    }
    function K(b) {
      b.button === 0 && (y = b.clientX, _ = b.clientY);
    }
    function he(b, C) {
      if (C.preventDefault(), C.stopPropagation(), Xe.isEditingShortcuts) {
        Xe.handleLinkSelection(b);
        return;
      }
      ee || (w = !1), !(Math.hypot(C.clientX - y, C.clientY - _) >= 6 || w || Date.now() - T < 600) && Fe.openLink(b, C);
    }
    function ft(b, C) {
      Fe.openLinkMenu(b, C);
    }
    function bt(b, C) {
      if (ee || (w = !1), w || Date.now() - T < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      Fe.openFolder(b, C);
    }
    function Bt(b, C, S) {
      Fe.openFolderMenu(b, C, S);
    }
    function Ms(b) {
      Fe.deleteFolder(b);
    }
    function Ds(b, C) {
      const S = Array.from(C.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), ue.activePage !== b && Ho(b), C.currentTarget?.classList.add("drop-target");
    }
    function As(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Es(b, C) {
      C.currentTarget?.classList.remove("drop-target");
      let P = "";
      const se = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (se)
        try {
          P = String(JSON.parse(se)?.id || "");
        } catch {
        }
      if (!P && (m.value || window.__activeLauncherLink) && (P = String(window.__activeLauncherLink?.id || m.value || "")), P) {
        C.preventDefault(), C.stopPropagation(), await Ee.moveLinkTo(P, b, "常用网站"), await Ee.setPage(b);
        return;
      }
      const Ce = window;
      typeof Ce.importDroppedLauncherItem == "function" && (C.preventDefault(), C.stopPropagation(), await Ce.importDroppedLauncherItem(C, "常用网站", b));
    }
    function Ps(b) {
      const C = Array.from(b.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), b.currentTarget?.classList.add("drop-target");
    }
    function Ws(b) {
      const C = b.currentTarget;
      C?.contains(b.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function Rs(b) {
      b.currentTarget?.classList.remove("drop-target");
      let S = "";
      const P = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (P)
        try {
          S = String(JSON.parse(P)?.id || "");
        } catch {
        }
      if (!S && (m.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || m.value || "")), S) {
        b.preventDefault(), b.stopPropagation(), await Ee.moveLinkTo(S, ue.activePage, "常用网站");
        return;
      }
      const se = window;
      if (typeof se.importDroppedLauncherItem == "function") {
        b.preventDefault(), b.stopPropagation(), await se.importDroppedLauncherItem(b, "常用网站", ue.activePage);
        return;
      }
      const Ce = b.dataTransfer?.getData("text/plain");
      Ce && /^https?:\/\//i.test(Ce.trim()) && (b.preventDefault(), b.stopPropagation(), await Ee.addLink({
        title: "",
        url: Ce.trim(),
        page: ue.activePage
      }));
    }
    function fi() {
      if (!_t.isOpen) return !1;
      if (typeof document < "u") {
        const b = document.querySelector("#launcher-folder-dialog");
        return !!(b && b.open);
      }
      return !1;
    }
    function Os(b, C) {
      C.preventDefault();
    }
    function Ns(b) {
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), b.currentTarget?.classList.add("drop-target");
    }
    function Bs(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Fs(b, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const P = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (P && P !== b) {
        try {
          await Ee.moveFolderInto(P, b);
        } catch (Ke) {
          $e.show({ appName: "常用网站", title: "移动未完成", message: Ke instanceof Error ? Ke.message : "请刷新后核对。" });
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
      !se && (m.value || window.__activeLauncherLink) && (se = String(window.__activeLauncherLink?.id || m.value || "")), se && await Ee.moveLinkTo(se, ue.activePage, b);
    }
    return (b, C) => (c(), p(Q, null, [
      i(ue).showSites ? (c(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: M
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = z(() => {
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
            }, u(i(d)("home.sites.favoriteSites")), 9, cu),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": s.value === "bookmarks",
              onClick: C[1] || (C[1] = (S) => s.value = "bookmarks")
            }, u(i(d)("home.sites.bookmarks")), 9, du)
          ], 8, lu),
          tt(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": i(d)("home.sites.pagesAria")
          }, [
            (c(!0), p(Q, null, we(i(ue).pages, (S) => (c(), p("button", {
              key: S,
              type: "button",
              class: de(["launcher-page-tab", { active: S === i(ue).activePage }]),
              "data-page": S,
              role: "tab",
              title: i(d)("home.sites.pageTabTitle", { label: Ge(S) }),
              onPointerdown: C[2] || (C[2] = z(() => {
              }, ["stop"])),
              onClick: z((P) => Ho(S), ["prevent", "stop"]),
              onContextmenu: z((P) => Yt(S, P), ["prevent", "stop"]),
              onDragover: (P) => Ds(S, P),
              onDragleave: C[3] || (C[3] = (P) => As(P)),
              onDrop: (P) => Es(S, P)
            }, u(Ge(S)), 43, pu))), 128)),
            h.value ? tt((c(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: F,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (S) => L.value = S),
              onKeydown: jo,
              onBlur: wo
            }, null, 544)), [
              [ho, L.value]
            ]) : (c(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Ko
            }, " + "))
          ], 8, uu), [
            [fo, s.value === "sites"]
          ]),
          s.value === "bookmarks" ? (c(), p("div", hu)) : E("", !0),
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
          onDragover: C[12] || (C[12] = (S) => Ps(S)),
          onDragleave: C[13] || (C[13] = (S) => Ws(S)),
          onDrop: C[14] || (C[14] = (S) => Rs(S))
        }, [
          (c(), pe(No, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: i(ue).activePage,
            name: m.value || D.value ? "launcher-grid" : ""
          }, {
            default: Et(() => [
              (c(!0), p(Q, null, we(yo.value, (S) => (c(), p(Q, {
                key: S.key
              }, [
                S.type === "link" ? (c(), p("a", {
                  key: S.key,
                  class: de(["launcher-link", {
                    "is-dragging": m.value === String(S.link.id),
                    "is-wheel-picked": i(Xe).isEditingShortcuts && i(Xe).isLinkInWheel(S.link.url)
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = z(() => {
                  }, ["prevent"])),
                  onPointerdown: (P) => xe(S.link, P),
                  onMousedown: C[8] || (C[8] = (P) => K(P)),
                  onClick: z((P) => he(S.link, P), ["prevent"]),
                  onContextmenu: z((P) => ft(S.link, P), ["prevent"])
                }, [
                  Z(Ro, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, gu)) : S.type === "folder" ? (c(), p("div", {
                  key: S.key,
                  class: de(["launcher-folder", [
                    `size-${Ne(S.folder.groupName)}`,
                    { "is-dragging": D.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (P) => j(S.folder.groupName, S.folder, P),
                  onDragstart: (P) => Os(S.folder.groupName, P),
                  onDragover: C[10] || (C[10] = (P) => Ns(P)),
                  onDragleave: C[11] || (C[11] = (P) => Bs(P)),
                  onDrop: (P) => Fs(S.folder.groupName, P),
                  onClick: (P) => bt(S.folder.groupName, P),
                  onContextmenu: z((P) => Bt(S.folder.groupName, S.folder.pageName, P), ["prevent"])
                }, [
                  Z(Ro, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: Ne(S.folder.groupName)
                  }, {
                    default: Et(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = z(() => {
                        }, ["stop"])),
                        onClick: z((P) => Ms(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, vu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", yu, u(S.folder.links.length), 1)
                ], 42, mu)) : E("", !0)
              ], 64))), 128)),
              yo.value.length ? E("", !0) : (c(), p("p", wu, u(nt.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, fu), [
          [fo, s.value === "sites"]
        ])
      ], 32)) : E("", !0),
      i(ue).hasTodo || i(ue).hasBili ? (c(), p("div", bu, [
        i(ue).hasTodo ? (c(), pe(ru, { key: 0 })) : i(ue).hasBili ? (c(), p("div", ku)) : E("", !0)
      ])) : E("", !0),
      (c(), pe(wt, { to: "body" }, [
        $.visible ? (c(), p("div", {
          key: 0,
          class: de(["launcher-drag-ghost", [
            $.type === "folder" ? `folder-ghost size-${$.folder?.size}` : "link-ghost"
          ]]),
          style: Le({
            left: `${$.x}px`,
            top: `${$.y}px`
          })
        }, [
          $.type === "folder" && $.folder ? (c(), p(Q, { key: 0 }, [
            n("div", _u, [
              (c(!0), p(Q, null, we(Nt($.folder.links, $.folder.size), (S, P) => (c(), pe(yn, {
                key: S.id || P,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Cu, u($.folder.groupName), 1)
          ], 64)) : $.link ? (c(), p(Q, { key: 1 }, [
            Z(yn, {
              link: $.link
            }, null, 8, ["link"]),
            n("span", xu, u($.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      Z(i(o), {
        open: r.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), Ss = /* @__PURE__ */ Oe(Lu, [["__scopeId", "data-v-142d9c79"]]), un = Object.keys(vo);
let tn = !1, Kn = 0, So, jn;
function Ni(e) {
  for (const t of un)
    Object.prototype.hasOwnProperty.call(e, t) && (vo[t] = e[t] !== !1);
}
function $u() {
  const e = vo;
  Fe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || wn.close();
}
const Bi = {
  start() {
    if (tn) return;
    tn = !0;
    const e = ++Kn;
    jn = We(() => un.map((o) => vo[o]), $u, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    So = (o, s) => {
      if (s !== "local") return;
      const a = {};
      for (const r of un) o[r] && (a[r] = o[r].newValue);
      Ni(a);
    }, t?.storage?.onChanged?.addListener(So), t?.storage?.local && t.storage.local.get(un).then((o) => {
      tn && Kn === e && Ni(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    tn = !1, Kn++, jn?.(), jn = void 0, So && globalThis.chrome?.storage?.onChanged?.removeListener(So), So = void 0;
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
}, Ou = { class: "card-head" }, Nu = ["title"], Bu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Fu = /* @__PURE__ */ fe({
  __name: "AppLauncher",
  setup(e) {
    qe(() => {
      hn.initWallpaper();
    });
    function t() {
      Be.handleToolClick("music");
    }
    return (o, s) => (c(), p("section", Su, [
      s[4] || (s[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Tu, [
        n("div", Iu, [
          tt(n("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: i(d)("weather.widgetSwitchTip")
          }, [
            n("header", Du, [
              s[1] || (s[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Au, u(i(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Eu, [
              Z(bs)
            ])
          ], 8, Mu), [
            [fo, i(vo).showWeather]
          ]),
          n("div", Pu, [
            n("div", Wu, [
              Z(td),
              Z(ks)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: s[0] || (s[0] = z(() => {
              }, ["prevent"]))
            }, [
              Z(zi)
            ], 32)
          ]),
          n("section", Ru, [
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
              }, u(i(d)("home.music.openNetease")), 9, Nu)
            ]),
            n("div", Bu, [
              Z(_s)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: de(["launcher-groups", { "has-sites": i(ue).showSites, "has-todoist": i(ue).hasTodo, "has-bili": i(ue).hasBili, "has-media": i(ue).hasTodo || i(ue).hasBili }])
        }, [
          Z(Ss)
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
}), po = Se(/* @__PURE__ */ new Set()), Kt = Se({}), it = Se({});
function zn(e) {
  const t = st(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return $e.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const He = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = st(e);
    return t ? t.lifecycle.isVisible() : Tn(e) ? !!va[e] : ya(e);
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
    if (this.markRunning(e), Tn(e)) {
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
    if (Tn(e)) {
      wi.close(e);
      return;
    }
    Be.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (st(e)) {
      const a = zn(e);
      if (!a.ok) return a;
      const r = st(e)?.lifecycle.beforeQuit;
      if (r) {
        const l = Ht(e);
        try {
          await r();
        } catch {
          const L = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return $e.show({ appName: st(e).title, title: "未退出", message: L, showActions: !1 }), { ok: !1, error: L };
        }
        if (Ht(e) !== l) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = zn(e);
        if (!h.ok) return h;
      }
      const g = Be.close(e), f = Ht(e);
      return po.delete(e), it[e] = !1, xt.removeActiveTool(e), await g, await St(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), po.delete(e), xt.removeActiveTool(e), e in it && (it[e] = !1);
    const t = ma;
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
      const o = zn(e);
      if (!o.ok) return o;
      const s = Be.close(e), a = Ht(e);
      return await s, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (it[e] = !1, await St(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Kt[e] = (Kt[e] || 0) + 1, Be.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in it ? (it[e] = !1, await St(), Kt[e] = (Kt[e] || 0) + 1, it[e] = !0) : Kt[e] = (Kt[e] || 0) + 1, await St(), this.openApp(e);
  }
}, To = /* @__PURE__ */ fe({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = st(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const s = o;
    s.mountPolicy === "workspace-ready" && He.markRunning(s.id), We(s.lifecycle.isVisible, (h) => {
      h && He.markRunning(s.id);
    }, { immediate: !0, flush: "sync" });
    const a = te(() => !!it[s.id]);
    function r() {
      try {
        s.lifecycle.hide();
      } catch {
      }
      (Tt.activeId === s.id || Tt.activeId === s.rootId) && (Tt.activeId = null), He.hideApp(s.id), Xi(Tt.activeId);
    }
    function g() {
      He.reloadApp(s.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const l = X({
      loader: s.loadView,
      onError(h, L, F, m) {
        m <= 2 ? L() : F();
      },
      errorComponent: fe({
        setup: () => () => s.lifecycle.isVisible() ? Ye("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ye("h2", s.title),
          Ye("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ye("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ye("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: f
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ye("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: g
            }, "↻ 重新加载模块"),
            Ye("button", {
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
    }), (h, L) => a.value ? (c(), pe(Vi(i(l)), {
      key: i(He).getRenderKey(i(s).id)
    })) : E("", !0);
  }
}), Hu = { class: "logicweaver-workspaces-layer" }, Ku = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, ju = { id: "vue-todoist-root" }, zu = { id: "vue-bili-favorites-root" }, Vu = { id: "vue-youtube-root" }, Gu = { id: "vue-aihot-root" }, Uu = /* @__PURE__ */ fe({
  __name: "AppWorkspaces",
  setup(e) {
    const t = V(!!Tt.activeId);
    return qe(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, s) => (c(), p("div", Hu, [
      t.value ? (c(), p("main", Ku, [
        n("div", ju, [
          Z(To, { id: "todoist" })
        ]),
        n("div", zu, [
          Z(To, { id: "daily-bilibili" })
        ]),
        tt(n("div", Vu, [
          Z(To, { id: "daily-youtube" })
        ], 512), [
          [fo, i(vo).showYouTube]
        ]),
        n("div", Gu, [
          Z(To, { id: "daily-aihot" })
        ]),
        Z(To, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), Yu = ["aria-label"], Xu = { class: "dock-menu-head" }, qu = { class: "dock-menu-title" }, Ju = ["src", "alt"], Zu = {
  key: 1,
  class: "dock-menu-emoji"
}, Qu = { class: "dock-menu-text" }, ep = { class: "dock-menu-text" }, tp = { class: "dock-menu-text" }, op = /* @__PURE__ */ fe({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isRunning(o.target.id)), r = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isVisible(o.target.id)), { menuRef: g, style: f } = di({
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
    async function L() {
      o.target && (await He.reloadApp(o.target.id), s("close"));
    }
    async function F() {
      if (!o.target) return;
      const v = o.target;
      if ((await He.quitApp(v.id))?.ok === !1) {
        s("close");
        return;
      }
      $e.show({
        appName: v.title,
        title: d("dock.quitDone"),
        subtitle: d("dock.quitSubtitle"),
        icon: v.icon || "assets/logo.png",
        duration: 2800
      }), s("close");
    }
    async function m() {
      if (!o.target) return;
      const v = o.target, w = Bo.uninstall(v.id);
      s("close"), await w || $e.show({
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
        "daily-youtube": "https://www.youtube.com"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(w, "_blank"), s("close");
    }
    return (v, w) => (c(), pe(wt, { to: "body" }, [
      e.target ? (c(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: g,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: Le(i(f)),
        onClick: w[1] || (w[1] = z(() => {
        }, ["stop"])),
        onContextmenu: w[2] || (w[2] = z(() => {
        }, ["prevent"]))
      }, [
        n("div", Xu, [
          n("div", qu, [
            e.target.icon ? (c(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Ju)) : e.target.emoji ? (c(), p("span", Zu, u(e.target.emoji), 1)) : E("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), p("span", {
            key: 0,
            class: de(["dock-status-tag", { "is-running": a.value }])
          }, [
            w[3] || (w[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            ot(" " + u(a.value ? i(d)("dock.menu.running") : i(d)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        w[12] || (w[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), p(Q, { key: 0 }, [
          r.value ? (c(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            w[5] || (w[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(i(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
          }, [
            w[4] || (w[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(i(d)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: L
          }, [
            w[6] || (w[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", Qu, [
              n("span", null, u(i(d)("dock.menu.reloadApp")), 1),
              n("small", null, u(i(d)("dock.menu.reloadSub")), 1)
            ])
          ]),
          w[9] || (w[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [
            w[7] || (w[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", ep, [
              n("span", null, u(i(d)("dock.menu.removeFromDock")), 1),
              n("small", null, u(i(d)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: F
          }, [
            w[8] || (w[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", tp, [
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
          w[10] || (w[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(i(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: w[0] || (w[0] = (T) => s("close"))
        }, [...w[11] || (w[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Yu)) : E("", !0)
    ]));
  }
}), np = /* @__PURE__ */ Oe(op, [["__scopeId", "data-v-513ee784"]]), ip = { class: "mac-dock-shelf" }, sp = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], ap = ["src", "alt"], rp = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, lp = ["title"], cp = ["alt"], dp = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], up = ["src", "alt"], pp = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, hp = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, fp = {
  key: 3,
  class: "mac-dock-badge"
}, gp = ["title"], mp = ["src"], vp = {
  key: 1,
  class: "mac-dock-emoji"
}, yp = /* @__PURE__ */ fe({
  __name: "MacDock",
  setup(e) {
    const t = te(() => no), o = V(null), s = te(() => Object.fromEntries(no.tools.map((W) => {
      const Y = st(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(Y) ? Math.max(0, Math.floor(Y)) : 0];
    })));
    function a(W) {
      W.stopPropagation(), o.value = null, F(W.currentTarget), Bo.open();
    }
    function r(W, Y) {
      Y.stopPropagation(), o.value = null, F(Y.currentTarget), xt.triggerItem("target", W);
    }
    function g(W, Y) {
      const U = Y.currentTarget.getBoundingClientRect(), ve = no.position, xe = ve === "left" || ve === "right";
      o.value = {
        type: "card",
        id: W.id,
        title: W.title,
        icon: W.icon,
        x: xe ? ve === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: xe ? U.top + U.height / 2 : ve === "top" ? U.bottom + 8 : U.top
      };
    }
    function f(W) {
      W.stopPropagation(), o.value = null, F(W.currentTarget), xt.triggerItem("home", "home-launcher");
    }
    function l(W, Y) {
      Y.stopPropagation(), o.value = null, F(Y.currentTarget), st(W) || He.markRunning(W), xt.triggerItem("tool", W);
    }
    function h(W, Y) {
      const U = Y.currentTarget.getBoundingClientRect(), ve = no.position, xe = ve === "left" || ve === "right";
      o.value = {
        type: "tool",
        id: W.id,
        title: W.title,
        icon: W.icon,
        emoji: W.emoji,
        x: xe ? ve === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: xe ? U.top + U.height / 2 : ve === "top" ? U.bottom + 8 : U.top
      };
    }
    const L = /* @__PURE__ */ new Map();
    function F(W) {
      if (!W || (L.get(W)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const Y = W.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      L.set(W, Y);
      const R = () => {
        L.get(W) === Y && L.delete(W);
      };
      Y.onfinish = R, Y.oncancel = R;
    }
    const m = V(null), D = Se({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), v = V(null), w = V(null), T = te(() => v.value || t.value.cards), y = te(() => w.value || t.value.tools);
    let _ = "", x = 0, N = !1, H = 0;
    function G(W, Y, R) {
      if (R.button !== 0 || R.target.closest(".mac-dock-market-btn")) return;
      const xe = R.currentTarget.getBoundingClientRect();
      N = !1, m.value = {
        type: W,
        id: Y.id,
        item: Y,
        startX: R.clientX,
        startY: R.clientY,
        initialLeft: xe.left,
        initialTop: xe.top,
        width: xe.width,
        height: xe.height
      }, window.addEventListener("pointermove", A), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k);
    }
    function A(W) {
      if (!m.value) return;
      const Y = W.clientX - m.value.startX, R = W.clientY - m.value.startY, U = Math.hypot(Y, R);
      if (!N && U > 5 && (N = !0, D.visible = !0, D.item = m.value.item, D.type = m.value.type, D.width = m.value.width, D.height = m.value.height, m.value.type === "card" ? v.value = [...t.value.cards] : w.value = [...t.value.tools]), !N) return;
      D.x = W.clientX - D.width / 2, D.y = W.clientY - D.height / 2;
      const xe = document.elementsFromPoint(W.clientX, W.clientY).find(
        (Me) => Me.classList.contains("mac-dock-item") && !Me.classList.contains("mac-dock-market-btn")
      );
      if (!xe) return;
      const j = xe.getAttribute("data-dock-target"), I = xe.getAttribute("data-dock-tool"), B = m.value.type, ye = m.value.id, Ie = Date.now();
      if (B === "card" && j && j !== ye && j !== "home-launcher") {
        const Me = xe.getBoundingClientRect(), _e = Me.left + Me.width / 2;
        if (Math.abs(W.clientX - _e) > Me.width * 0.55 || j === _ && Ie - x < 180) return;
        const be = [...v.value || t.value.cards], Ge = be.findIndex((Ne) => Ne.id === ye), et = be.findIndex((Ne) => Ne.id === j);
        if (Ge >= 0 && et >= 0 && Ge !== et) {
          const Ne = be.splice(Ge, 1)[0];
          be.splice(et, 0, Ne), v.value = be, _ = j, x = Ie;
        }
      } else if (B === "tool" && I && I !== ye) {
        const Me = xe.getBoundingClientRect(), _e = Me.left + Me.width / 2;
        if (Math.abs(W.clientX - _e) > Me.width * 0.55 || I === _ && Ie - x < 180) return;
        const be = [...w.value || t.value.tools], Ge = be.findIndex((Ne) => Ne.id === ye), et = be.findIndex((Ne) => Ne.id === I);
        if (Ge >= 0 && et >= 0 && Ge !== et) {
          const Ne = be.splice(Ge, 1)[0];
          be.splice(et, 0, Ne), w.value = be, _ = I, x = Ie;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), N && m.value && (H = Date.now() + 250, m.value.type === "card" && v.value ? xt.reorderCards(v.value.map((W) => W.id)) : m.value.type === "tool" && w.value && xt.reorderTools(w.value.map((W) => W.id))), D.visible = !1, D.item = null, v.value = null, w.value = null, m.value = null, N = !1, _ = "";
    }
    function $(W, Y) {
      Date.now() < H || r(W, Y);
    }
    function ee(W, Y) {
      Date.now() < H || l(W, Y);
    }
    return mo(() => {
      for (const W of L.values()) W.cancel();
      L.clear(), window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (W, Y) => (c(), p(Q, null, [
      n("div", ip, [
        Z(No, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Et(() => [
            (c(!0), p(Q, null, we(T.value, (R) => (c(), p("button", {
              key: R.id,
              class: de(["mac-dock-item", {
                "is-active": t.value.activeTargetId === R.id,
                "is-drag-origin": m.value && m.value.id === R.id
              }]),
              type: "button",
              "data-dock-target": R.id,
              title: R.title,
              onPointerdown: (U) => G("card", R, U),
              onClick: z((U) => $(R.id, U), ["stop"]),
              onContextmenu: z((U) => g(R, U), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, ap),
              t.value.activeTargetId === R.id ? (c(), p("span", rp)) : E("", !0)
            ], 42, sp))), 128))
          ]),
          _: 1
        }),
        Y[4] || (Y[4] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: i(d)("dock.home"),
          onClick: Y[0] || (Y[0] = z((R) => f(R), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: i(d)("dock.home")
          }, null, 8, cp)
        ], 8, lp),
        Y[5] || (Y[5] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Z(No, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Et(() => [
            (c(!0), p(Q, null, we(y.value, (R) => (c(), p("button", {
              key: R.id,
              class: de(["mac-dock-item", {
                "is-active": i(He).isRunning(R.id),
                "is-drag-origin": m.value && m.value.id === R.id
              }]),
              type: "button",
              "data-dock-tool": R.id,
              title: R.title,
              onPointerdown: (U) => G("tool", R, U),
              onClick: z((U) => ee(R.id, U), ["stop"]),
              onContextmenu: z((U) => h(R, U), ["prevent"])
            }, [
              R.icon ? (c(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, up)) : R.emoji ? (c(), p("span", pp, u(R.emoji), 1)) : E("", !0),
              i(He).isRunning(R.id) ? (c(), p("span", hp)) : E("", !0),
              s.value[R.id] > 0 ? (c(), p("span", fp, u(s.value[R.id] > 99 ? "99+" : s.value[R.id]), 1)) : E("", !0)
            ], 42, dp))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: de(["mac-dock-item mac-dock-market-btn", { "is-active": i(Bo).state.isOpen }]),
          type: "button",
          title: i(d)("dock.market"),
          onClick: Y[1] || (Y[1] = z((R) => a(R), ["stop"]))
        }, [...Y[3] || (Y[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, gp)
      ]),
      (c(), pe(wt, { to: "body" }, [
        D.visible && D.item ? (c(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: Le({
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
          }, null, 8, mp)) : D.item.emoji ? (c(), p("span", vp, u(D.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      Z(np, {
        target: o.value,
        onClose: Y[2] || (Y[2] = (R) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Ts = /* @__PURE__ */ Oe(yp, [["__scopeId", "data-v-ede6cdc8"]]), wp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, bp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], kp = { class: "win-toast-head" }, _p = ["src"], Cp = { class: "win-toast-app" }, xp = { class: "win-toast-time" }, Lp = ["title", "aria-label", "onClick"], $p = ["onClick"], Sp = { class: "win-toast-title" }, Tp = {
  key: 0,
  class: "win-toast-subtitle"
}, Ip = {
  key: 1,
  class: "win-toast-snippet"
}, Mp = {
  key: 0,
  class: "win-toast-actions"
}, Dp = ["onClick"], Ap = ["onClick"], Ep = /* @__PURE__ */ fe({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = V({}), r = V({});
    let g = null;
    function f(v) {
      const w = t.get(v);
      w !== void 0 && clearTimeout(w), t.delete(v);
    }
    function l(v, w = v.duration) {
      f(v.id), s.set(v.id, w), o.set(v.id, Date.now()), r.value[v.id] = !1, a.value[v.id] = Math.max(0, Math.min(100, w / v.duration * 100)), St(() => requestAnimationFrame(() => {
        a.value[v.id] = 0;
      })), t.set(v.id, window.setTimeout(() => {
        t.delete(v.id), $e.close(v.id);
      }, w));
    }
    function h(v) {
      f(v.id);
      const w = Date.now() - (o.get(v.id) || Date.now()), T = Math.max(0, (s.get(v.id) ?? v.duration) - w);
      s.set(v.id, T), r.value[v.id] = !0, a.value[v.id] = Math.max(0, Math.min(100, T / v.duration * 100));
    }
    function L(v) {
      l(v, Math.max(1500, s.get(v.id) ?? v.duration));
    }
    function F(v) {
      f(v.id), $e.close(v.id);
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
      const w = Math.max(500, s.get(v.id) ?? v.duration);
      return {
        width: `${a.value[v.id] ?? 100}%`,
        transition: r.value[v.id] ? "none" : `width ${w}ms linear`
      };
    }
    return qe(() => {
      g = new MutationObserver(() => {
        const w = new Set(Vo.map((T) => T.id));
        for (const T of Vo)
          !T.closing && !t.has(T.id) && !s.has(T.id) && l(T);
        for (const T of s.keys())
          w.has(T) || (f(T), s.delete(T), o.delete(T), delete a.value[T], delete r.value[T]);
      });
      const v = document.getElementById("win-toast-container");
      v && g.observe(v, { childList: !0 });
      for (const w of Vo) l(w);
    }), mo(() => {
      g?.disconnect(), g = null;
      for (const v of t.values()) clearTimeout(v);
      t.clear();
    }), (v, w) => (c(), pe(wt, { to: "body" }, [
      n("div", wp, [
        Z(No, { name: "win-toast" }, {
          default: Et(() => [
            (c(!0), p(Q, null, we(i(Vo), (T) => (c(), p("article", {
              key: T.id,
              class: de(["win-toast-card", [T.appType, { closing: T.closing }]]),
              "data-toast-fingerprint": T.fingerprint,
              onMouseenter: (y) => h(T),
              onMouseleave: (y) => L(T)
            }, [
              n("header", kp, [
                n("img", {
                  src: T.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, _p),
                n("span", Cp, u(T.appName), 1),
                n("span", xp, u(i(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: i(d)("common.close"),
                  "aria-label": i(d)("common.close"),
                  onClick: (y) => F(T)
                }, "✕", 8, Lp)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => m(T)
              }, [
                n("span", Sp, u(T.title), 1),
                T.subtitle ? (c(), p("span", Tp, u(T.subtitle), 1)) : E("", !0),
                T.message ? (c(), p("span", Ip, u(T.message), 1)) : E("", !0)
              ], 8, $p),
              T.showActions && T.actionLabel ? (c(), p("footer", Mp, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => m(T)
                }, u(T.actionLabel), 9, Dp),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => F(T)
                }, u(i(d)("common.close")), 9, Ap)
              ])) : E("", !0),
              n("div", {
                class: "win-toast-progress",
                style: Le(D(T))
              }, null, 4)
            ], 42, bp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Is = /* @__PURE__ */ Oe(Ep, [["__scopeId", "data-v-55714354"]]), Pp = ["id"], Wp = /* @__PURE__ */ fe({
  __name: "DockModuleHost",
  setup(e) {
    const t = es().filter((o) => o.presentation !== "card").map((o) => {
      We(o.lifecycle.isVisible, (a) => {
        a && He.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const s = fe({
        setup: () => () => Ye("section", { class: "dock-module-load-error", role: "alert" }, [
          Ye("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ye("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ye("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ye("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ye("div", { style: "display: flex; gap: 8px;" }, [
            Ye("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ye("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                He.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ye("button", {
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
    }), (o, s) => (c(!0), p(Q, null, we(i(t), (a) => tt((c(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (c(), pe(Vi(a.view), {
        key: i(He).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Pp)), [
      [fo, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Rp = /* @__PURE__ */ Oe(Wp, [["__scopeId", "data-v-fc77be0a"]]);
function Ze(e, t) {
  const o = V(!1);
  return We(
    e,
    (s) => {
      s && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Rt(o);
}
const Op = ["onKeydown"], Np = { class: "fo-up-preview-head" }, Bp = ["src"], Fp = { class: "fo-up-preview-meta" }, Hp = { class: "fo-up-preview-name-row" }, Kp = ["href"], jp = ["disabled"], zp = { class: "fo-up-preview-sign" }, Vp = { class: "fo-up-preview-videos" }, Gp = {
  key: 0,
  class: "fo-up-preview-loading"
}, Up = {
  key: 1,
  class: "fo-up-preview-empty"
}, Yp = {
  key: 2,
  class: "fo-up-preview-empty"
}, Xp = ["href", "title", "onClick"], qp = ["src"], Jp = {
  key: 0,
  class: "fo-bili-duration"
}, Zp = { class: "fo-up-preview-video-info" }, Qp = ["href", "title", "onClick"], eh = { class: "fo-up-preview-video-meta" }, th = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", oh = /* @__PURE__ */ fe({
  __name: "BiliUpPreview",
  setup(e) {
    const t = V(!1);
    function o() {
      if (!me.submitting) {
        if (!me.followed) {
          t.value = !1, dn.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, dn.toggleFollow();
      }
    }
    function s() {
      t.value = !1, dn.close();
    }
    function a(r, g) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), g.bvid ? (nn.openVideo({
        bvid: g.bvid,
        title: g.title,
        cover: g.cover,
        author: me.name,
        authorFace: me.face,
        mid: me.mid,
        url: g.url
      }), s()) : g.url && g.url !== "#" && window.open(g.url, "_blank"));
    }
    return (r, g) => i(me).open ? (c(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: z(s, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: Le({ left: `${i(me).left}px`, top: `${i(me).top}px` }),
        onKeydown: Oo(z(s, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Np, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: i(me).face || th,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Bp),
          n("div", Fp, [
            n("div", Hp, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${i(me).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(i(me).name), 9, Kp),
              n("button", {
                type: "button",
                class: de([
                  i(me).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: i(me).submitting,
                onClick: o
              }, u(i(me).submitting ? "处理中…" : t.value ? "确定取消？" : i(me).followed ? "取消关注" : "＋ 关注"), 11, jp)
            ]),
            n("p", zp, u(i(me).sign || "暂无个人简介"), 1)
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
          i(me).loading ? (c(), p("div", Gp, [...g[0] || (g[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : i(me).error ? (c(), p("p", Up, u(i(me).error), 1)) : i(me).videos.length ? (c(!0), p(Q, { key: 3 }, we(i(me).videos, (f) => (c(), p("article", {
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
              }, null, 8, qp),
              f.duration ? (c(), p("span", Jp, u(f.duration), 1)) : E("", !0)
            ], 8, Xp),
            n("div", Zp, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, f)
              }, u(f.title), 9, Qp),
              n("div", eh, [
                n("span", null, "▣ " + u(f.playCount), 1),
                n("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (c(), p("p", Yp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Op)
    ], 32)) : E("", !0);
  }
}), nh = /* @__PURE__ */ Oe(oh, [["__scopeId", "data-v-c36c969f"]]), ih = { class: "logicweaver-overlays-layer" }, sh = { id: "vue-notification-root" }, ah = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, rh = { id: "vue-bili-message-panel-root" }, lh = { id: "vue-notification-center-root" }, ch = { id: "vue-tab-manager-root" }, dh = { id: "vue-bookmark-menu-root" }, uh = { id: "vue-bookmark-panel-root" }, ph = { id: "vue-launcher-dialogs-root" }, hh = { id: "vue-launcher-folder-root" }, fh = { id: "vue-launcher-menus-root" }, gh = { id: "vue-settings-dialog-root" }, mh = { id: "vue-clock-settings-root" }, vh = { id: "vue-bili-theater-root" }, yh = { id: "vue-bili-mini-player-root" }, wh = { id: "vue-ai-dialog-root" }, bh = { id: "vue-aihot-viewer-root" }, kh = { id: "vue-nav-wheel-root" }, _h = { id: "vue-github-detail-root" }, Ch = { id: "vue-bili-subtitle-modal-root" }, xh = { id: "vue-bili-video-task-modal-root" }, Lh = { id: "vue-github-task-modal-root" }, $h = { id: "vue-web-task-modal-root" }, Sh = { id: "vue-firecrawl-modal-root" }, Th = { id: "vue-floating-image-viewer-root" }, Ih = { id: "vue-command-palette-root" }, Mh = /* @__PURE__ */ fe({
  __name: "AppOverlays",
  setup(e) {
    const t = Ze(() => Bo.state.isOpen), o = Ze(() => Yi.isOpen), s = Ze(() => cn.isOpen), a = Ze(() => Vt.state.isOpen), r = Ze(() => xa.open), g = Ze(() => Po.state.isOpen), f = Ze(() => qs.isOpen), l = Ze(() => ka.isOpen), h = Ze(() => pi.state.isOpen), L = Ze(() => na.isOpen), F = Ze(() => je.isOpen), m = Ze(() => ti.isOpen);
    let D;
    qe(() => {
      D = cl();
    }), Ot(() => {
      D?.();
    });
    const v = Ze(() => si.state.isOpen), w = Ze(() => _t.isOpen), T = Ze(() => Co.editDialog.isOpen || Co.linkMove.isOpen || Co.folderMove.isOpen || Co.groupMerge.isOpen || Co.folderDelete.isOpen), y = X(() => import("./ProfileMenu-3HJ4i7Ct.js")), _ = X(() => import("./BookmarkNoteMenu-bdnomoc6.js")), x = X(() => import("./BookmarkPanel-TBDPNoAt.js")), N = X(() => import("./ClockSettingsMenu-ChaYjWZ1.js")), H = X(() => import("./NotificationCenter-DroKcjTN.js")), G = X(() => import("./TabManagerPanel-B_E7pq0R.js")), A = X(() => import("./LauncherDialogs-m3BmZbhh.js")), k = X(() => import("./LauncherFolderDialog-Bt_35zlt.js")), $ = X(() => import("./LauncherMenus-DeRLOUeB.js")), ee = X(() => import("./SettingsDialog-DAeC0bVn.js")), W = X(() => import("./BiliMiniPlayer-_XjsjB1W.js")), Y = X(() => import("./BiliTheaterDialog-Blz9t3sa.js")), R = X(() => import("./BiliMessagePanel-Db1ap5GL.js")), U = X(() => import("./AiDialog-BWlQ6cqp.js")), ve = X(() => import("./AihotViewer-Bv7sBwox.js")), xe = X(() => import("./NavWheelOverlay-3jSTHW-6.js")), j = X(() => import("./GitHubRepoDetailDrawer-DjlhfLru.js")), I = X(() => import("./InPageSideDrawer-BLCyPVTT.js")), B = X(() => import("./BiliSubtitleModal-BfEsGT8d.js")), ye = X(() => import("./BiliVideoTaskModal-C0rKLkNE.js")), Ie = X(() => import("./GitHubTaskModal-g0iVkMOb.js")), Me = X(() => import("./WebSiteTaskModal-BFKpqEIZ.js")), _e = X(() => import("./FirecrawlModal-BVXUKRb4.js")), be = X(() => import("./FloatingImageViewer-DkPk1pIn.js")), Ge = X(() => import("./CommandPalette-TzqzYUed.js")), et = X(() => import("./AppPromptModal-B4AzoAKC.js")), Ne = X(async () => {
      const [It, Nt] = await Promise.all([
        import("./PluginMarketDialog-DRyp2Gng.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Xs("logicweaver-market-styles", Nt.default), It.default;
    });
    return (It, Nt) => (c(), p("div", ih, [
      n("div", sh, [
        Z(Is)
      ]),
      n("div", ah, [
        Z(i(y))
      ]),
      n("div", rh, [
        i(l) ? (c(), pe(i(R), { key: 0 })) : E("", !0)
      ]),
      n("div", lh, [
        i(o) ? (c(), pe(i(H), { key: 0 })) : E("", !0)
      ]),
      n("div", ch, [
        i(s) ? (c(), pe(i(G), { key: 0 })) : E("", !0)
      ]),
      n("div", dh, [
        i(v) ? (c(), pe(i(_), { key: 0 })) : E("", !0)
      ]),
      n("div", uh, [
        Z(i(x))
      ]),
      n("div", ph, [
        i(T) ? (c(), pe(i(A), { key: 0 })) : E("", !0)
      ]),
      n("div", hh, [
        i(w) ? (c(), pe(i(k), { key: 0 })) : E("", !0)
      ]),
      n("div", fh, [
        Z(i($))
      ]),
      n("div", gh, [
        Z(i(ee))
      ]),
      n("div", mh, [
        i(a) ? (c(), pe(i(N), { key: 0 })) : E("", !0)
      ]),
      n("div", vh, [
        i(g) ? (c(), pe(i(Y), { key: 0 })) : E("", !0)
      ]),
      n("div", yh, [
        i(f) ? (c(), pe(i(W), { key: 0 })) : E("", !0)
      ]),
      n("div", wh, [
        i(h) ? (c(), pe(i(U), { key: 0 })) : E("", !0)
      ]),
      n("div", bh, [
        i(r) ? (c(), pe(i(ve), { key: 0 })) : E("", !0)
      ]),
      n("div", kh, [
        Z(i(xe))
      ]),
      Z(Rp),
      n("div", _h, [
        i(L) ? (c(), pe(i(j), { key: 0 })) : E("", !0)
      ]),
      n("div", Ch, [
        Z(i(B))
      ]),
      n("div", xh, [
        Z(i(ye))
      ]),
      n("div", Lh, [
        Z(i(Ie))
      ]),
      n("div", $h, [
        Z(i(Me))
      ]),
      n("div", Sh, [
        Z(i(_e))
      ]),
      n("div", Th, [
        Z(i(be))
      ]),
      n("div", Ih, [
        i(F) ? (c(), pe(i(Ge), { key: 0 })) : E("", !0)
      ]),
      i(m) ? (c(), pe(i(I), { key: 0 })) : E("", !0),
      Z(nh),
      Z(i(et)),
      i(t) ? (c(), pe(i(Ne), { key: 1 })) : E("", !0)
    ]));
  }
});
let Vn = !1;
function Dh(e = 1800) {
  if (Vn || typeof window > "u") return;
  const t = () => {
    if (Vn) return;
    Vn = !0;
    const o = es();
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
const Ah = ["data-active-workspace"], Eh = /* @__PURE__ */ fe({
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
      const L = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(l) : l;
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
      const l = s[Go.value] || s.home;
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
    We(
      [
        () => Go.value,
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
    const f = te(() => Go.value === "home" ? "" : Go.value);
    return We(() => Tt.activeId, Xi, { immediate: !0, flush: "sync" }), qe(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        ei.bindGlobalListener(), Xe.start(), Bi.start(), Xn.init().catch((l) => console.warn("[Launcher] 初始化失败", l)), Dh(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), Ot(() => {
      Xe.stop(), Xn.stop(), Bi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Be
    }), (l, h) => (c(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      Z(bl),
      Z(Fu),
      Z(Uu),
      n("nav", {
        id: "mac-dock",
        class: de(["mac-dock", "dock-" + i(no).position]),
        "aria-label": "快捷应用栏"
      }, [
        Z(Ts)
      ], 2),
      Z(Mh)
    ], 8, Ah));
  }
}), Ph = /* @__PURE__ */ Oe(Eh, [["__scopeId", "data-v-7c00288c"]]), Wh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Rh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Oh = { class: "rhine-scaler" }, Nh = { class: "rhine-center-group" }, Bh = { class: "rhine-auth-status" }, Fh = { class: "rhine-auth-text" }, Hh = ["hidden"], Kh = { class: "rhine-cinema-caption" }, jh = /* @__PURE__ */ fe({
  __name: "IntroAnimation",
  setup(e) {
    const t = V(window.innerHeight), o = V(window.innerWidth), s = V(!1), a = V(!1), r = V(10), g = V(1), f = V(0), l = /* @__PURE__ */ new Set();
    let h = 0, L = () => {
    };
    const F = te(() => `${String(Math.round(lt.renderedProgress)).padStart(2, "0")}%`), m = te(() => {
      const A = lt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(A, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), D = te(() => lt.renderedProgress >= 75 ? "START PROCESSING..." : lt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), v = te(() => lt.finished ? "身份验证通过 · 欢迎进入终端" : lt.status ? `身份信息确认 · ${lt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), w = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function T(A, k) {
      const $ = window.setTimeout(() => {
        l.delete($), A();
      }, k);
      l.add($);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _(A) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const k = A ? 180 : 260, $ = A ? 200 : 280, ee = performance.now(), W = (Y) => {
        const R = Y - ee, U = Math.min(1, R / k), ve = 1 - Math.pow(1 - U, 3);
        if (r.value = 10 + ve * Math.max(0, o.value - 10), R > k && (g.value = Math.max(0, 1 - (R - k) / $)), R >= k + $) {
          y();
          return;
        }
        h = requestAnimationFrame(W);
      };
      T(() => {
        h = requestAnimationFrame(W);
      }, A ? 60 : 120);
    }
    function x(A) {
      A || (s.value = !0), T(() => {
        a.value = !0, f.value = 6, g.value = 0, T(y, 380);
      }, A ? 40 : 420);
    }
    function N(A) {
      lt.style === "rhinelab" ? x(A) : _(A);
    }
    function H() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function G(A) {
      lt.finished || (A.key === "Enter" || A.key === " " || A.key === "Escape") && (A.preventDefault(), yt.skip("KEYBOARD SKIP"));
    }
    return qe(() => {
      document.documentElement.dataset.startupStyle = lt.style, document.documentElement.style.setProperty("--rhine-scale", w.value), window.addEventListener("resize", H, { passive: !0 }), window.addEventListener("keydown", G, !0), L = Na(N), as();
    }), mo(() => {
      L(), window.removeEventListener("resize", H), window.removeEventListener("keydown", G, !0), cancelAnimationFrame(h);
      for (const A of l) clearTimeout(A);
      l.clear();
    }), (A, k) => (c(), p("div", {
      class: "intro-vue-content",
      style: Le({ "--rhine-scale": w.value, opacity: g.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Wh, [
        k[2] || (k[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        k[3] || (k[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: Le({ height: `${i(lt).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: Le({ top: m.value })
        }, [
          k[1] || (k[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(F.value), 1),
          n("small", null, u(i(lt).status), 1)
        ], 4),
        k[4] || (k[4] = Io('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: Le({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Rh, [
        k[12] || (k[12] = Io('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Oh, [
          k[10] || (k[10] = Io('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = ($) => i(yt).skip("ENTER SYSTEM"))
          }, [...k[5] || (k[5] = [
            ot("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Nh, [
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
            n("div", Bh, [
              k[6] || (k[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Fh, u(D.value), 1),
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
          ])], 10, Hh),
          n("div", Kh, u(v.value), 1),
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
}), zh = /* @__PURE__ */ fe({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Fo.trigger(o);
    }
    return (o, s) => (c(), p(Q, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: s[0] || (s[0] = z((a) => t("messages"), ["stop"]))
      }, u(i(d)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: s[1] || (s[1] = z((a) => t("tabs"), ["stop"]))
      }, u(i(d)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: s[2] || (s[2] = z((a) => t("refresh"), ["stop"]))
      }, u(i(d)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: s[3] || (s[3] = z((a) => t("switch"), ["stop"]))
      }, u(i(d)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: s[4] || (s[4] = z((a) => t("web"), ["stop"]))
      }, u(i(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Vh = /* @__PURE__ */ fe({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      ui.openWorkspace(o, !0);
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
      pn(o.$slots, "default")
    ], 64));
  }
}), Gh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Uh = { role: "status" }, Yh = ["disabled"], Xh = ["disabled"], qh = /* @__PURE__ */ fe({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => i(rt).message || i(rt).busy ? (c(), p("section", Gh, [
      n("p", Uh, u(i(rt).repo ? `原任务仓库：${i(rt).repo}。 ` : "") + u(i(rt).message), 1),
      i(rt).busy ? (c(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (s) => i(Ve).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      i(rt).uncertain ? (c(), p(Q, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        i(rt).unlockConfirmation ? (c(), p(Q, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: i(rt).busy,
            onClick: o[2] || (o[2] = (s) => i(Ve).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, Xh),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (s) => i(rt).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), p("button", {
          key: 0,
          type: "button",
          disabled: i(rt).busy,
          onClick: o[1] || (o[1] = (s) => i(rt).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Yh))
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
function Jh(e, t, o, s, a) {
  const r = a || "默认", f = t.filter((h) => (h.section || "默认") === r).map((h) => ({
    key: `list:${h.id}`,
    kind: "folder",
    title: h.name,
    list: h,
    repos: e.filter((L) => o.get(L.full_name.toLowerCase())?.includes(h.name))
  }));
  for (const h of e)
    o.get(h.full_name.toLowerCase())?.length || f.push({ key: `repo:${h.full_name.toLowerCase()}`, kind: "repo", title: h.name, repo: h });
  const l = new Map(s.map((h, L) => [h, L]));
  return f.sort((h, L) => (l.get(h.key) ?? s.length) - (l.get(L.key) ?? s.length));
}
function Fi(e, t, o) {
  const s = e.indexOf(t), a = e.indexOf(o);
  if (s < 0 || a < 0 || s === a) return [...e];
  const r = [...e];
  return r.splice(s, 1), r.splice(a, 0, t), r;
}
function Zh(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => typeof t == "string" && t.length <= 300 && /^(list|repo):.+/.test(t)))].slice(0, 2e3) : [];
}
const Qh = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, ef = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], tf = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], of = {
  key: 1,
  class: "gh-shortcut-help"
}, nf = ["disabled"], sf = ["data-gh-list-drop"], af = { class: "gh-shortcut-help" }, rf = { class: "gh-folder-repo-grid" }, lf = ["title", "onContextmenu", "onClick", "onPointerdown"], cf = {
  key: 0,
  class: "gh-shortcut-help"
}, df = ["aria-label"], uf = { class: "gh-shortcut-menu-title" }, pf = ["disabled"], hf = /* @__PURE__ */ fe({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = V(null), r = V(""), g = V(""), f = V([]), l = V(""), h = V(null), L = te(() => h.value?.ownerKey === Te.ownerKey ? Te.repos.find((M) => M.full_name === h.value?.fullName) : void 0), F = te(() => !!(L.value && Te.repoListNames.get(L.value.full_name.toLowerCase())?.length));
    function m() {
      h.value = null;
    }
    const { menuRef: D, style: v } = di({
      visible: () => o.active && !!L.value,
      anchor: () => h.value || { x: 0, y: 0 },
      dismiss: m
    });
    function w(M, O) {
      M.preventDefault(), M.stopPropagation(), o.active && (nt(), h.value = { fullName: O.full_name, ownerKey: Te.ownerKey, x: M.clientX, y: M.clientY });
    }
    function T() {
      const M = L.value;
      !M || !F.value || dt.busy || !o.active || (m(), U(M.full_name, "未分类"));
    }
    function y() {
      const M = L.value;
      m(), M && W(M);
    }
    let _ = 0, x = 0, N = Promise.resolve();
    const H = te(() => Jh(Te.repos, Te.lists, Te.repoListNames, f.value, Te.activeSection)), G = te(() => H.value.find((M) => M.kind === "folder" && M.list.id === r.value)), A = te(() => G.value?.kind === "folder" ? G.value.repos : []);
    function k(M) {
      return M.kind === "folder" ? { title: M.title, preview: M.repos.slice(0, 4).map(on), count: Math.max(M.repos.length, M.list.totalCount) } : void 0;
    }
    const $ = () => Te.ownerKey ? `ghSidebarTileOrderV1:${Te.ownerKey}:${Te.activeSection || "default"}` : "";
    function ee() {
      ++_;
      const M = $(), O = [...f.value];
      M && (N = N.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [M]: O }) : localStorage.setItem(M, JSON.stringify(O)), M === $() && (l.value = "");
        } catch {
          M === $() && (l.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function W(M) {
      !o.active || Date.now() < ye || (m(), r.value = "", s("select"), qi.open(M.full_name, void 0, M));
    }
    function Y(M) {
      if (!(!o.active || Date.now() < ye)) {
        if (M.kind === "repo") {
          W(M.repo);
          return;
        }
        m(), r.value = r.value === M.list.id ? "" : M.list.id, Do.select(M.title), s("select");
      }
    }
    function R(M) {
      return o.active && !dt.busy && Ji.folders.some((O) => O.title === M && (O.kind === "custom" || O.kind === "uncategorized"));
    }
    function U(M, O) {
      R(O) && Te.repos.some((K) => K.full_name.toLowerCase() === M.toLowerCase()) && Do.dropRepository(M, O);
    }
    function ve(M, O) {
      !R(O) || !Array.from(M.dataTransfer?.types || []).includes(ia) || (M.preventDefault(), M.stopPropagation(), M.dataTransfer && (M.dataTransfer.dropEffect = "move"), g.value = O);
    }
    function xe(M, O) {
      g.value = "";
      const K = sa(M.dataTransfer);
      !K || !R(O) || (M.preventDefault(), M.stopPropagation(), U(K, O));
    }
    function j(M) {
      const O = M.currentTarget;
      O instanceof Node && M.relatedTarget instanceof Node && O.contains(M.relatedTarget) || (g.value = "");
    }
    const I = Se({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let B = null, ye = 0, Ie = 0, Me = "", _e, be = null;
    function Ge() {
      be?.classList.remove("gh-sidebar-pointer-drop"), be = null;
    }
    function et(M, O) {
      if (M.button !== 0 || !o.active || dt.busy) return;
      nt(), m();
      const K = M.currentTarget.getBoundingClientRect();
      B = { pointer: M.pointerId, x: M.clientX, y: M.clientY, owner: Te.ownerKey, tile: O, original: [...f.value] }, I.x = M.clientX, I.y = M.clientY, I.offsetX = M.clientX - K.left, I.offsetY = M.clientY - K.top, I.tile = O, window.addEventListener("pointermove", Nt, { passive: !1 }), window.addEventListener("pointerup", Ut), window.addEventListener("pointercancel", nt);
    }
    function Ne(M, O) {
      et(M, { key: `repo:${O.full_name.toLowerCase()}`, kind: "repo", title: O.name, repo: O });
    }
    function It() {
      if (Ge(), g.value = "", !B || !I.visible) return;
      const M = document.elementFromPoint(I.x, I.y), O = M?.closest("[data-gh-list-drop]"), K = O?.dataset.ghListDrop;
      if (B.tile.kind === "repo" && K && R(K) && O && (!O.hasAttribute("data-gh-tile") || Ls(O.getBoundingClientRect(), I.x, I.y))) {
        g.value = K, be = O, O.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const he = M?.closest("[data-gh-tile]"), ft = he?.dataset.ghTile;
      if (!ft || !he || ft === B.tile.key || !$s(he.getBoundingClientRect(), I.x, I.y) || ft === Me || Date.now() - Ie < xs) return;
      const bt = H.value.map((Bt) => Bt.key);
      bt.includes(B.tile.key) && (f.value = Fi(bt, B.tile.key, ft), Me = ft, Ie = Date.now());
    }
    function Nt(M) {
      !B || M.pointerId !== B.pointer || (I.x = M.clientX, I.y = M.clientY, !(!I.visible && Math.hypot(M.clientX - B.x, M.clientY - B.y) < Cs) && (M.preventDefault(), I.visible || (++_, I.visible = !0, _e = setInterval(() => {
        const K = document.elementFromPoint(I.x, I.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (K) {
          const he = K.getBoundingClientRect();
          I.y < he.top + 36 ? K.scrollTop -= 12 : I.y > he.bottom - 36 && (K.scrollTop += 12);
        }
        It();
      }, 32)), It()));
    }
    function Ut(M) {
      if (!B || M.pointerId !== B.pointer) return;
      I.visible && (I.x = M.clientX, I.y = M.clientY, It());
      const O = B, K = I.visible, he = g.value;
      if (K) {
        M.preventDefault(), ye = Date.now() + 300, O.owner === Te.ownerKey && he && O.tile.kind === "repo" && U(O.tile.repo.full_name, he);
        const ft = O.original.length !== f.value.length || O.original.some((bt, Bt) => f.value[Bt] !== bt);
        O.owner === Te.ownerKey && !he && ft && ee();
      }
      he && (f.value = O.original), yo();
    }
    function yo() {
      Ge(), clearInterval(_e), _e = void 0, window.removeEventListener("pointermove", Nt), window.removeEventListener("pointerup", Ut), window.removeEventListener("pointercancel", nt), I.visible = !1, I.tile = null, B = null, g.value = "", Me = "", Ie = 0;
    }
    function nt() {
      B && (f.value = B.original, I.visible && (ye = Date.now() + 300)), yo();
    }
    function Ho(M, O) {
      if (!M.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(M.key)) return;
      M.preventDefault();
      const K = H.value.map((Bt) => Bt.key), he = K.indexOf(O.key), ft = M.key === "ArrowLeft" ? -1 : M.key === "ArrowRight" ? 1 : M.key === "ArrowUp" ? -2 : 2, bt = K[he + ft];
      bt && (f.value = Fi(K, O.key, bt), ee());
    }
    function Ko(M) {
      const O = M.target;
      !B && !a.value?.contains(O) && !O?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (r.value = "");
    }
    function wo(M) {
      M.key === "Escape" && (nt(), m(), r.value = "");
    }
    function jo() {
      document.hidden && (nt(), m(), r.value = "");
    }
    function Yt() {
      g.value = "";
    }
    We(() => [Te.ownerKey, Te.activeSection], async () => {
      const M = ++x;
      nt(), m(), r.value = "", f.value = [], l.value = "";
      const O = $(), K = ++_;
      if (O)
        try {
          const he = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(O))[O] : JSON.parse(localStorage.getItem(O) || "[]");
          M === x && K === _ && (f.value = Zh(he));
        } catch {
          M === x && (l.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const zo = /* @__PURE__ */ new Set();
    return We(() => [o.active, Te.ownerKey, Te.loading], ([M, O, K]) => {
      !M || !O || K || zo.has(O) || (zo.add(O), Ve.ensureAllStarsLoaded());
    }, { immediate: !0 }), We(() => o.active, (M) => {
      M || (nt(), m(), r.value = "");
    }), We(() => G.value, (M) => {
      M || (r.value = "");
    }), We(L, (M) => {
      M || m();
    }), qe(() => {
      window.addEventListener("pointerdown", Ko), window.addEventListener("keydown", wo), window.addEventListener("blur", nt), window.addEventListener("dragend", Yt), window.addEventListener("drop", Yt), document.addEventListener("visibilitychange", jo);
    }), mo(() => {
      ++x, nt(), window.removeEventListener("pointerdown", Ko), window.removeEventListener("keydown", wo), window.removeEventListener("blur", nt), window.removeEventListener("dragend", Yt), window.removeEventListener("drop", Yt), document.removeEventListener("visibilitychange", jo);
    }), (M, O) => (c(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      i(dt).message || l.value ? (c(), p("p", Qh, u(i(dt).message || l.value), 1)) : E("", !0),
      Z(No, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: Et(() => [
          (c(!0), p(Q, null, we(H.value, (K) => (c(), p("div", {
            key: K.key,
            class: de(["gh-shortcut-cell", { "is-dragging": I.visible && I.tile?.key === K.key, "drop-into": K.kind === "folder" && g.value === K.title }]),
            "data-gh-tile": K.key,
            "data-gh-list-drop": K.kind === "folder" ? K.title : void 0,
            onDragover: (he) => K.kind === "folder" && ve(he, K.title),
            onDragleave: j,
            onDrop: (he) => K.kind === "folder" && xe(he, K.title)
          }, [
            n("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": K.kind === "folder" ? `打开本地分组 ${K.title}` : `查看仓库 ${K.repo.full_name}`,
              title: K.kind === "folder" ? `${K.title}（拖入将加入本地分组，保留其他归属）` : K.repo.full_name,
              onContextmenu: (he) => K.kind === "repo" && w(he, K.repo),
              onClick: (he) => Y(K),
              onPointerdown: (he) => et(he, K),
              onDragstart: O[0] || (O[0] = z(() => {
              }, ["prevent"])),
              onKeydown: (he) => Ho(he, K)
            }, [
              Z(Ro, {
                link: K.kind === "repo" ? i(on)(K.repo) : void 0,
                folder: k(K)
              }, null, 8, ["link", "folder"])
            ], 40, tf)
          ], 42, ef))), 128))
        ]),
        _: 1
      }),
      H.value.length ? E("", !0) : (c(), p("p", of, u(i(Te).loading ? "正在读取仓库与列表…" : "暂无本地分组或未分类仓库"), 1)),
      (c(), pe(wt, { to: "body" }, [
        G.value && e.active ? (c(), pe(i(Ia), {
          key: 0,
          id: "gh-list-shortcut-window",
          "window-id": "gh-list-shortcut",
          title: G.value.title,
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
          "header-actions": Et(() => [
            n("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: i(dt).busy,
              title: "删除本地分组（不会取消 Star）",
              onClick: O[1] || (O[1] = (K) => i(Do).delete(G.value.title))
            }, "删除分组", 8, nf)
          ]),
          default: Et(() => [
            n("div", {
              class: de(["gh-shortcut-window-content", { "drop-into": g.value === G.value.title }]),
              "data-gh-list-drop": G.value.title,
              onDragover: O[3] || (O[3] = (K) => ve(K, G.value.title)),
              onDragleave: j,
              onDrop: O[4] || (O[4] = (K) => xe(K, G.value.title))
            }, [
              n("p", af, u(A.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入本地分组", 1),
              n("div", rf, [
                (c(!0), p(Q, null, we(A.value, (K) => (c(), p("div", {
                  key: K.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  n("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: K.full_name,
                    onContextmenu: (he) => w(he, K),
                    onClick: (he) => W(K),
                    onPointerdown: (he) => Ne(he, K),
                    onDragstart: O[2] || (O[2] = z(() => {
                    }, ["prevent"]))
                  }, [
                    Z(Ro, {
                      link: i(on)(K)
                    }, null, 8, ["link"])
                  ], 40, lf)
                ]))), 128))
              ]),
              A.value.length ? E("", !0) : (c(), p("p", cf, u(i(Te).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, sf)
          ]),
          _: 1
        }, 8, ["title"])) : E("", !0),
        L.value && e.active ? (c(), p("div", {
          key: 1,
          ref_key: "menuRef",
          ref: D,
          class: "gh-shortcut-context-menu",
          style: Le(i(v)),
          role: "menu",
          "aria-label": L.value.full_name + " 操作",
          onPointerdown: O[6] || (O[6] = z(() => {
          }, ["stop"])),
          onClick: O[7] || (O[7] = z(() => {
          }, ["stop"])),
          onContextmenu: O[8] || (O[8] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", uf, u(L.value.full_name), 1),
          n("button", {
            type: "button",
            role: "menuitem",
            onClick: y
          }, "查看仓库详情"),
          n("button", {
            type: "button",
            role: "menuitem",
            disabled: i(dt).busy || !F.value,
            title: "从所有本地分组移出，保留 GitHub 收藏",
            onClick: T
          }, "移到未分组", 8, pf)
        ], 44, df)) : E("", !0),
        I.visible && I.tile ? (c(), p("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: Le({ left: `${I.x - I.offsetX}px`, top: `${I.y - I.offsetY}px` })
        }, [
          Z(Ro, {
            link: I.tile.kind === "repo" ? i(on)(I.tile.repo) : void 0,
            folder: k(I.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : E("", !0)
      ]))
    ], 512));
  }
}), ff = /* @__PURE__ */ Oe(hf, [["__scopeId", "data-v-5b72c353"]]), gf = { class: "gh-hero-left" }, mf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, vf = { key: 0 }, yf = { key: 1 }, wf = {
  key: 2,
  class: "fo-folder-icon"
}, bf = { class: "gh-bili-heading" }, kf = { class: "gh-hero-title-row" }, _f = ["title"], Cf = {
  class: "gh-hero-sections-tabs",
  role: "tablist",
  "aria-label": "收藏大分组标签"
}, xf = ["title", "onClick", "onContextmenu"], Lf = ["role", "aria-live"], $f = ["title"], Sf = ["title", "aria-label"], Tf = { id: "gh-hero-desc" }, If = { class: "gh-hero-search-area" }, Mf = { class: "gh-bili-actions" }, Df = ["title"], Af = { class: "gh-batch-btn-text" }, Ef = ["title"], Pf = ["title"], Wf = /* @__PURE__ */ fe({
  __name: "GitHubHero",
  emits: ["open-ai-settings", "open-guide"],
  setup(e, { emit: t }) {
    const o = t;
    async function s() {
      let r;
      try {
        r = await bi.prompt({
          title: "新建分组标签",
          message: "创建一个新的顶层分组标签（类似常用网站的分区）：",
          placeholder: "分组名称（如：工作区、AI、工具）…"
        });
      } catch {
        return;
      }
      const g = r?.trim();
      g && await Ve.createSection(g);
    }
    async function a(r, g) {
      if (r.preventDefault(), r.stopPropagation(), g === "默认" && Te.sections.length === 1) return;
      await bi.confirm({
        title: "删除分组标签",
        message: `确定删除分组标签「${g}」吗？里面的文件夹会自动合并至默认分组，仓库不会丢失。`,
        danger: !0
      }) && await Ve.deleteSection(g);
    }
    return (r, g) => (c(), p(Q, null, [
      n("div", gf, [
        n("div", mf, [
          i(Ft).kind === "all" ? (c(), p("span", vf, "⭐")) : i(Ft).kind === "uncategorized" ? (c(), p("span", yf, "📄")) : (c(), p("i", wf))
        ]),
        n("div", bf, [
          n("div", kf, [
            n("h3", {
              id: "gh-hero-title",
              title: i(Ft).title
            }, u(i(Ft).title), 9, _f),
            n("div", Cf, [
              (c(!0), p(Q, null, we(i(Te).sections, (f) => (c(), p("button", {
                key: f,
                type: "button",
                class: de(["gh-section-tab", { active: f === i(Te).activeSection }]),
                title: `切换到分组「${f}」；右键可删除此标签`,
                onClick: (l) => i(Ve).switchSection(f),
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
                onClick: g[0] || (g[0] = (f) => i(ai).update({ actionText: "", actionError: !1 }))
              }, "×", 8, Sf)
            ], 10, Lf)) : E("", !0)
          ]),
          n("p", Tf, u(i(Ft).description), 1)
        ])
      ]),
      n("div", If, [
        pn(r.$slots, "search", {}, void 0, !0)
      ]),
      n("div", Mf, [
        pn(r.$slots, "actions-prefix", {}, void 0, !0),
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
          n("span", Af, u(i(Ft).batchMode ? i(d)("github.hero.batchBack") : i(d)("github.hero.batch")), 1)
        ], 10, Df),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: i(d)("github.hero.refreshTitle"),
          onClick: g[3] || (g[3] = (f) => i(Ao).refresh())
        }, u(i(d)("github.hero.refresh")), 9, Ef),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: i(d)("github.hero.addFolderTitle"),
          onClick: g[4] || (g[4] = (f) => i(Ao).createFolder())
        }, u(i(d)("github.hero.addFolder")), 9, Pf)
      ])
    ], 64));
  }
}), Rf = /* @__PURE__ */ Oe(Wf, [["__scopeId", "data-v-2869cb71"]]), ae = Se({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Hi(e, t = !1) {
  if (!e || ae.busy) return;
  if (ae.repo && ae.text !== ae.baseline) {
    ae.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Ve.remarks[e]?.userRemark, s = typeof o == "string" ? o : "";
  Object.assign(ae, {
    repo: e,
    baseline: s,
    text: t ? "" : s,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Gn() {
  ae.busy || Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Un() {
  if (ae.busy || !ae.repo) return;
  const { repo: e, text: t, baseline: o } = ae;
  ae.busy = !0;
  try {
    await Ve.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (s) {
    ae.message = s instanceof Error ? s.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ae.busy = !1;
  }
}
async function Ki() {
  if (ae.busy || !ae.repo) return;
  const e = ae.repo;
  ae.busy = !0;
  try {
    const o = (await Ve.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ae.storedValue = o ?? "", ae.baseline = o ?? "", ae.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ae.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ae.busy = !1;
  }
}
const Of = ["disabled"], Nf = ["disabled"], Bf = ["disabled"], Ff = ["disabled"], Hf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, ji = /* @__PURE__ */ fe({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = V(null);
    return qe(() => {
      St(() => {
        t.active && !ae.busy && o.value?.focus();
      });
    }), (s, a) => (c(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = z(() => {
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
          a[1] || (a[1] = Oo(z((r) => !r.isComposing && e.active && i(Un)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Oo(z((r) => !r.isComposing && e.active && i(Gn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Of), [
        [ho, i(ae).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: i(ae).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => i(Un) && i(Un)(...r))
      }, "✓", 8, Nf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: i(ae).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => i(Gn) && i(Gn)(...r))
      }, "✕", 8, Bf),
      n("button", {
        type: "button",
        disabled: i(ae).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => i(Ki) && i(Ki)(...r))
      }, "读取已保存值", 8, Ff),
      i(ae).storedValue !== null ? (c(), p("p", Hf, "已保存值：" + u(i(ae).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Yn = Se({
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
}, Vf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Gf = { style: { "font-size": "12px", color: "var(--dim)" } }, Uf = {
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
}, vg = ["disabled"], yg = { class: "gh-page-info" }, wg = ["disabled"], bg = ["onClick"], kg = /* @__PURE__ */ fe({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => !!ae.repo && !De.cards.some((A) => A.fullName === ae.repo)), s = Se({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = V(null), r = V(!1);
    function g(A, k) {
      const $ = A.target;
      if ($ instanceof Element) {
        if (De.batchMode) {
          if ($.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          A.preventDefault(), A.stopPropagation(), At.toggleSelection(k.fullName);
          return;
        }
        $.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (A.preventDefault(), A.stopPropagation(), qi.open(k.fullName, void 0, k));
      }
    }
    function f(A, k) {
      if (!t.active) return;
      A.preventDefault(), A.stopPropagation();
      const $ = 12, ee = 160, W = 280, Y = Math.min(window.innerWidth - ee - $, Math.max($, A.clientX)), R = Math.min(window.innerHeight - W - $, Math.max($, A.clientY));
      s.x = Y, s.y = R, s.fullName = k.fullName, s.folders = [...k.folders || (k.folder ? [k.folder] : [])], s.hasRemark = !!k.customRemark, s.url = k.url, s.visible = !0, a.value = null, r.value = Y > window.innerWidth - 380;
    }
    function l(A, k) {
      f(k, A), a.value = "folder";
    }
    function h() {
      s.visible = !1, a.value = null;
    }
    function L(A) {
      s.folders.includes(A) ? s.folders = s.folders.filter((k) => k !== A) : s.folders.push(A), Ve.toggleRepoList(s.fullName, A);
    }
    function F() {
      s.folders = [], Ve.clearRepoLists(s.fullName), h();
    }
    function m(A) {
      if (!t.active) return;
      const k = typeof A == "string" ? A : A?.fullName || s.fullName;
      h(), Hi(k);
    }
    function D() {
      if (!t.active) return;
      const A = s.fullName;
      h(), Hi(A, !0);
    }
    async function v() {
      const A = s.url;
      if (h(), A && t.active)
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
    }
    function w(A) {
      const k = Ve.findRepository(s.fullName);
      h(), k && Js.sendGitHubShare({
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
      }, A);
    }
    function T() {
      const A = Ve.findRepository(s.fullName);
      h(), A && Kf.open({
        fullName: A.full_name,
        description: A.description || "",
        stars: A.stargazers_count,
        language: A.language || void 0,
        updated: A.updated_at
      });
    }
    function y() {
      s.url && window.open(s.url, "_blank", "noreferrer"), h();
    }
    async function _() {
      const A = Ve.findRepository(s.fullName);
      if (!A) {
        h();
        return;
      }
      h(), await Ve.confirmUnstarRepository(A);
    }
    function x(A) {
      const k = A.target;
      k?.closest(".gh-repo-context-menu") || k?.closest(".gh-inline-remark-box") || h();
    }
    function N(A) {
      A.key === "Escape" && s.visible && h();
    }
    We(() => t.active, (A) => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", N), h(), A && (window.addEventListener("pointerdown", x), window.addEventListener("keydown", N));
    }, { immediate: !0 }), Ot(() => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", N);
    });
    function H(A, k) {
      const $ = A.target;
      if ($ instanceof Element && $.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        A.preventDefault();
        return;
      }
      At.startDrag(k, A);
    }
    const G = te(() => {
      if (De.cards.length > 0) return !1;
      const A = jt.actionText || "";
      return !!(A.includes("正在读取") || A.includes("正在加载") || A.includes("正在统计") || A.includes("正在同步"));
    });
    return (A, k) => (c(), p(Q, null, [
      i(ae).message ? (c(), p("p", jf, u(i(ae).repo ? `${i(ae).repo}：` : "") + u(i(ae).message), 1)) : E("", !0),
      o.value ? (c(), p("section", zf, [
        n("p", null, "备注草稿：" + u(i(ae).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Z(ji, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      i(De).searchMessage ? (c(), p("div", Vf, [
        n("span", Gf, u(i(De).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = ($) => i(At).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      G.value ? (c(), p("div", Uf, [...k[17] || (k[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : i(De).emptyMessage ? (c(), p("p", Yf, u(i(De).emptyMessage), 1)) : E("", !0),
      i(De).cards.length ? (c(), p("div", {
        key: 5,
        class: de(["repos gh-grid", { "gh-batch-active": i(De).batchMode }])
      }, [
        (c(!0), p(Q, null, we(i(De).cards, ($) => (c(), p("article", {
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
            onClick: z((ee) => f(ee, $), ["stop"])
          }, "⋮", 8, qf),
          n("div", Jf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: k[1] || (k[1] = z(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: $.selected,
                onChange: (ee) => i(At).setSelection($.fullName, ee.target.checked)
              }, null, 40, Zf),
              k[18] || (k[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: $.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (ee) => ee.target.src = "assets/github-star.svg")
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
              $.folders && $.folders.length ? (c(!0), p(Q, { key: 0 }, we($.folders, (ee) => (c(), p("span", {
                key: ee,
                class: "gh-badge-folder",
                title: `本地分组：${ee}（点击管理所属列表）`,
                onClick: z((W) => l($, W), ["stop"])
              }, " 📁 " + u(ee), 9, ig))), 128)) : (c(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: z((ee) => l($, ee), ["stop"])
              }, " ＋ 未分类 ", 8, sg)),
              i(ae).repo === $.fullName ? (c(), pe(ji, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : $.customRemark ? (c(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${$.customRemark}（点击就地修改）`,
                onClick: z((ee) => m($), ["stop"])
              }, [
                k[19] || (k[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", rg, u($.customRemark), 1)
              ], 8, ag)) : E("", !0)
            ]),
            $.descriptionKind === "analyzing" ? (c(), p("p", lg, [...k[20] || (k[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              ot(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : $.descriptionKind === "ai" ? (c(), p("p", cg, [
              k[21] || (k[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              ot(u($.description), 1)
            ])) : $.descriptionKind === "plain" ? (c(), p("p", {
              key: 2,
              class: "desc",
              title: $.description
            }, u($.description), 9, dg)) : (c(), p("p", ug, "暂无描述"))
          ]),
          n("div", pg, [
            n("span", hg, "★ " + u($.stars), 1),
            $.language ? (c(), p("span", fg, u($.language), 1)) : E("", !0),
            $.updated ? (c(), p("span", gg, "更新 " + u($.updated), 1)) : E("", !0)
          ])
        ], 42, Xf))), 128))
      ], 2)) : E("", !0),
      i(De).totalPages > 1 ? (c(), p("div", mg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(De).page <= 1,
          onClick: k[3] || (k[3] = ($) => i(At).changePage(i(De).page - 1))
        }, "‹ 上一页", 8, vg),
        n("span", yg, u(i(De).page) + " / " + u(i(De).totalPages) + " · 共 " + u(i(De).totalItems) + " 个" + u(i(De).serverPaged ? ` · 已加载 ${i(De).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(De).page >= i(De).totalPages,
          onClick: k[4] || (k[4] = ($) => i(At).changePage(i(De).page + 1))
        }, "下一页 ›", 8, wg)
      ])) : E("", !0),
      (c(), pe(wt, { to: "body" }, [
        t.active && s.visible ? (c(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Le({ left: `${s.x}px`, top: `${s.y}px` }),
          onClick: k[15] || (k[15] = z(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = z(() => {
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
              onClick: k[5] || (k[5] = z(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: de(["fo-cover-menu-item", { primary: s.folders.length === 0 }]),
                type: "button",
                onClick: F
              }, u(s.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), p(Q, null, we(i(Ve).cats, ($) => (c(), p("button", {
                key: $,
                class: de(["fo-cover-menu-item", { primary: s.folders.includes($) }]),
                type: "button",
                onClick: (ee) => L($)
              }, u(s.folders.includes($) ? "✓ " : "  ") + "📁 " + u($), 11, bg))), 128))
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
          Z($a, {
            label: "💬 发送到聊天室",
            visible: s.visible,
            onOpen: k[10] || (k[10] = ($) => a.value = null),
            onSelect: w
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
}), _g = /* @__PURE__ */ Oe(kg, [["__scopeId", "data-v-93d09653"]]), Cg = { class: "gh-batch-bar-left" }, xg = { class: "gh-batch-count-tip" }, Lg = { id: "gh-batch-selected-count" }, $g = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Sg = ["disabled"], Tg = ["disabled"], Ig = { class: "gh-batch-bar-right" }, Mg = ["disabled"], Dg = ["disabled"], Ag = ["disabled"], Eg = /* @__PURE__ */ fe({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = zs(), s = V(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Ji.folders.filter((l) => l.kind === "custom").forEach((l) => {
        f.push({ value: l.title, label: l.title, icon: "📁" });
      }), f;
    });
    function r() {
      t.active && (o.value = Ve.prepareBatchMove(), s.value = null);
    }
    async function g() {
      const f = o.value, l = s.value;
      if (!t.active || !f || l === null || dt.busy) return;
      await f.submit(l) && o.value === f && (o.value = void 0);
    }
    return We(() => t.active && Jt.active, (f) => {
      f || (o.value = void 0);
    }), (f, l) => (c(), p(Q, null, [
      n("div", Cg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (h) => i(Eo).toggleSelectAll())
        }, u(i(Jt).allSelected ? "取消全选" : "全选"), 1),
        n("span", xg, [
          l[5] || (l[5] = ot("已选择 ", -1)),
          n("b", Lg, u(i(Jt).selectedCount), 1),
          l[6] || (l[6] = ot(" 项", -1))
        ])
      ]),
      o.value ? (c(), p("section", $g, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          l[7] || (l[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), p(Q, null, we(o.value.names, (h) => (c(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        Z(Gi, {
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
        }, "确认加入列表", 8, Sg),
        n("button", {
          type: "button",
          disabled: i(dt).busy,
          onClick: l[2] || (l[2] = (h) => o.value = void 0)
        }, "取消", 8, Tg)
      ])) : E("", !0),
      n("div", Ig, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || i(dt).busy || i(Jt).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: r
        }, " 📁 归入本地分组 ", 8, Mg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: i(Jt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (h) => i(Eo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Dg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: i(Jt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (h) => i(Eo).unstar())
        }, " 🗑 取消收藏 ", 8, Ag)
      ])
    ], 64));
  }
}), Pg = X(() => import("./GitHubWorkspaceCard-NVFgwitw.js")), Wg = X(() => import("./NotificationCenter-DroKcjTN.js")), Rg = X(() => import("./TabManagerPanel-B_E7pq0R.js")), Og = X(() => import("./BookmarkNoteMenu-bdnomoc6.js")), Ng = X(() => import("./BookmarkPanel-TBDPNoAt.js")), Bg = X(() => import("./LauncherDialogs-m3BmZbhh.js")), Fg = X(() => import("./SettingsDialog-DAeC0bVn.js")), Hg = X(() => import("./SettingsView-0bqf0Rt9.js")), Kg = X(() => import("./ClockSettingsMenu-ChaYjWZ1.js")), jg = X(() => import("./BiliTheaterDialog-Blz9t3sa.js")), zg = X(() => import("./BiliMiniPlayer-_XjsjB1W.js")), Vg = X(() => import("./BiliMessagePanel-Db1ap5GL.js")), Gg = X(() => import("./BilibiliWorkspace-B_giV28C.js")), Ug = X(() => import("./YouTubeCard-D7Cq5B65.js").then((e) => e.Y)), Yg = X(() => import("./AihotFeed-CfoE6dHk.js")), Xg = X(() => import("./GitHubTrending-DZnecOEQ.js")), qg = X(() => import("./AiDialog-BWlQ6cqp.js")), Jg = X(() => import("./AihotViewer-Bv7sBwox.js")), Zg = X(() => import("./NavWheelOverlay-3jSTHW-6.js")), Qg = X(() => import("./StandaloneHost-CJdmaHEm.js")), em = X(() => import("./LauncherFolderDialog-Bt_35zlt.js")), tm = X(() => import("./LauncherMenus-DeRLOUeB.js"));
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
      const g = r.innerHTML, f = ni(o);
      f.config.errorHandler = (l, h, L) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${L})`, l), r.dataset.vueError = "1";
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
function om(e) {
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
      const o = ni(jh);
      let s = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        yt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          s || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        s || (s = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ce(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Ph), document.getElementById("vue-spa-root") || ce(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Qg), ce(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Is), ce(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, zh, Fo), ce(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Vh, ui), ce(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Ts, xt), ce(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ks), ce(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, zi), ce(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, _s, Qe), ce(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Ss, Fe), ce(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, bs), ce(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Pg), ce(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, qh, ai), ce(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, ff, Do), ce(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Rf, Ao), ce(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, _g, At), ce(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Eg, Eo), ce(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Wg, Wt), ce(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Rg, ds), ce(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Og, si), ce(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Bg, Zi), ce(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, em, Qi), ce(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, tm, ri), ce(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Ng, wn), ce(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, fn), ce(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Hg), ce(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Fg, bn), ce(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Kg, Vt), ce(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, jg, Po), ce(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, zg), ce(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, qg, pi), ce(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Jg, ci), ce(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Zg, Pe), ce(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Vg, zt), ce(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Gg, os), ce(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Ug, ns), ce(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Yg, ts), ce(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Xg, hs);
}
Hs();
const Cn = Ea(kn);
cr(kn, Cn);
dr(kn);
om(Cn);
ii.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-CU4f4TB3.js"), await Oa(), await Cn.startEager(), yt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  Cn.stopAll();
}, { once: !0 });
export {
  Ci as C,
  Rp as D,
  ff as G,
  Ro as L,
  Cs as T,
  jh as _,
  Rf as a,
  hs as b,
  ds as c,
  Vt as d,
  xi as e,
  Lm as f,
  Kf as g,
  Re as h,
  pi as i,
  Xe as j,
  Pe as k,
  yn as l,
  Ls as m,
  ne as n,
  $s as o,
  xs as p,
  Vh as q,
  zh as r,
  ws as s,
  cn as t,
  ti as u,
  Yn as v,
  je as w,
  ys as x,
  kn as y
};
