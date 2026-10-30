import { S as _i, i as ws } from "./SearchBox-BSJsqF6k.js";
/* empty css                */
import { r as xe, a as Pt, b as F, d as le, o as a, c as ce, w as Zt, u as s, e as c, f as n, g as D, T as ks, t as v, F as U, h as fe, i as R, j as ht, k as Et, l as Be, v as _s, m as Oe, n as eo, p as xi, q as xs, s as ae, x as Ke, y as Wt, z as to, A as me, B as se, C as Ue, D as Q, E as K, G as ft, H as mo, I as Ci, J as Vo, K as We, L as no, M as $i, N as Cs, O as Li } from "./vendor-vue-DokqDua_.js";
import { W as Go, t as zt, p as rn, n as Ee, a as To, b as xt, h as ze, m as ct, c as Gn, d as Yn, s as an, e as qn, f as $s, g as Ls, i as Ts, j as Ss, k as Y, l as Ti, o as ro, q as Si, r as _t, u as Ms, v as io, w as Kt, x as So, y as Is, z as Ds, A as Mo, B as As } from "./view-styles-D_56CpcO.js";
import { l as Es, r as Ps, G as Ws, a as oe, b as en, f as Yo, c as Wn, s as Bs, d as Os, e as Bn, g as qo, h as On, i as St, j as wo, k as at, m as ko, n as Ut, o as Me, p as Rs, q as Qe, t as nt, u as wt, v as vo, R as Fs, w as Ns, x as yt, y as Tt, z as ke, A as Hs, B as Rt } from "./search.service-DGqXHLyU.js";
import { f as qe, l as kt, a as $e, p as js, b as _o, c as Qt, y as Mi, d as re, e as Ft } from "./youtube-store-mBIgOOaT.js";
import { c as zs, a as Ks, t as Us, b as Vs, d as Gs, e as Ys, f as Vt, g as qs } from "./calendar.service-C1u6nhyH.js";
import { w as Se, s as Rn, P as Xs, i as Xo, D as ln, a as Xn, g as Xe, p as Js, L as Qs, b as Ct, c as Zs, d as cn, t as Jn, e as er, f as tr, h as $o, l as Ii } from "./window-manager.store-D_Nuf9-p.js";
import { s as tn, a as or, b as nr, u as Di } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { b as xo, a as ir, c as sr } from "./up-group-manager-store-DS9G5UqS.js";
import { biliMessagePanelController as Mt, biliMessagePanelState as rr } from "./message-panel-store-C9xzBGj9.js";
import { b as Ai, r as ar, a as ao } from "./bili-favorites-store-GY85-m7c.js";
import { a as Fn, b as Ei, c as lr } from "./aihot-feed-store-CCxG97IT.js";
import { p as Pi } from "./pricing-store-BqXWmthf.js";
import { R as cr } from "./read-session-e15k1OwA.js";
import { f as It } from "./fullscreen-cards.store-BOnziRaz.js";
import { k as dr, m as ur } from "./core-utils-Ccz-tarm.js";
import { _ as Te } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as ot } from "./together-listen.store-ukKafXgz.js";
import { C as pr } from "./ChatShareMenu-Bx23xRUS.js";
const fr = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function gr() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(u) {
    if (!u || !fr.test(u.id)) throw new TypeError(`Invalid command id: ${u?.id || ""}`);
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
  async function r(u, x, m = "api") {
    const M = e.get(u);
    if (!M) throw new Error(`Unknown command: ${u}`);
    if (M.enabled && !M.enabled()) return;
    const f = M.concurrency || "replace";
    if (t.has(u)) {
      if (f === "drop") return;
      f === "replace" && i(u);
    }
    const p = new AbortController();
    f !== "parallel" && t.set(u, p);
    try {
      return await M.run(x, { signal: p.signal, source: m });
    } finally {
      t.get(u) === p && t.delete(u);
    }
  }
  function l(u) {
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
    return Object.freeze([...e.values()].map(l).sort((u, x) => u.category.localeCompare(x.category, "zh") || u.title.localeCompare(x.title, "zh")));
  }
  function g(u, x = 20) {
    const m = String(u || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!m.length) return h().slice(0, x);
    const M = [...e.values()].map((f) => {
      const p = l(f), d = p.title.toLocaleLowerCase(), k = `${p.id} ${d} ${p.category} ${p.description} ${p.keywords.join(" ")}`.toLocaleLowerCase();
      if (!m.every((b) => k.includes(b))) return null;
      let $ = 0;
      for (const b of m)
        p.id === b ? $ += 200 : p.id.startsWith(b) && ($ += 120), d === b ? $ += 160 : d.startsWith(b) ? $ += 100 : d.includes(b) && ($ += 60), p.keywords.some((C) => C.toLocaleLowerCase().startsWith(b)) && ($ += 40);
      return { item: p, score: $ };
    }).filter((f) => !!f);
    return M.sort((f, p) => p.score - f.score || f.item.title.localeCompare(p.item.title, "zh")), Object.freeze(M.slice(0, Math.max(1, x)).map((f) => f.item));
  }
  return Object.freeze({ register: o, execute: r, cancel: i, has: (u) => e.has(u), list: h, search: g });
}
const on = gr(), hr = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function mr(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function l(f) {
    if (!f || !hr.test(f.id)) throw new TypeError(`Invalid feature id: ${f?.id || ""}`);
    if (!f.title?.trim() || typeof f.mount != "function") throw new TypeError(`Feature ${f.id} requires title and mount()`);
    if (t.has(f.id)) throw new Error(`Feature already registered: ${f.id}`);
    return t.set(f.id, Object.freeze({
      ...f,
      order: Number(f.order) || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []])
    })), () => {
      u(f.id), r.delete(f.id), t.delete(f.id);
    };
  }
  function h(f) {
    return typeof f == "function" ? f : f && typeof f.unmount == "function" ? () => f.unmount() : () => {
    };
  }
  function g(f) {
    if (o.has(f)) return Promise.resolve(o.get(f)?.cleanup);
    if (i.has(f)) return i.get(f);
    const p = t.get(f);
    if (!p) return Promise.reject(new Error(`Unknown feature: ${f}`));
    r.delete(f);
    const d = new AbortController(), k = Object.freeze({
      signal: d.signal,
      commands: e,
      getRoot: (b) => document.getElementById(b)
    }), $ = Promise.resolve().then(() => p.mount(k)).then((b) => (i.delete(f), o.set(f, { cleanup: b, controller: d }), b), (b) => {
      throw i.delete(f), r.set(f, b), d.abort(), b;
    });
    return i.set(f, $), $;
  }
  async function u(f) {
    const p = i.get(f);
    if (p)
      try {
        await p;
      } catch {
        return;
      }
    const d = o.get(f);
    d && (o.delete(f), d.controller.abort(), await h(d.cleanup)());
  }
  async function x() {
    const f = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), p = [...t.values()].filter(($) => !(!$.eager || !f && $.roots && $.roots.length > 0 && !$.roots.some((C) => !!document.getElementById(C)))).sort(($, b) => ($.order || 100) - (b.order || 100)), k = (await Promise.allSettled(p.map(($) => g($.id)))).flatMap(($, b) => $.status === "rejected" ? [{ id: p[b].id, reason: $.reason }] : []);
    k.length && console.warn("LogicWeaver Vue features failed to mount", k);
  }
  async function m() {
    const f = [...o.keys()].reverse();
    await Promise.allSettled(f.map(u));
  }
  function M() {
    return Object.freeze([...t.values()].map((f) => Object.freeze({
      id: f.id,
      title: f.title,
      order: f.order || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []]),
      status: i.has(f.id) ? "mounting" : o.has(f.id) ? "mounted" : r.has(f.id) ? "failed" : "registered",
      error: r.has(f.id) ? String(r.get(f.id)?.message || r.get(f.id) || "Feature mount failed") : ""
    })).sort((f, p) => f.order - p.order));
  }
  return Object.freeze({ register: l, start: g, startEager: x, stop: u, stopAll: m, has: (f) => t.has(f), list: M });
}
const vr = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", Qn = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader");
    return e === "0" || e === "false" || t === "0" || t === "false" || document.documentElement.classList.contains("skip-endfield-loader");
  } catch {
    return !1;
  }
})(), Le = xe({
  enabled: !Qn,
  style: vr === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: Qn,
  exiting: !1,
  forced: !1
});
let oo = 0, Jo = 4, Wi = performance.now(), Mn = 0, No = null;
function Bi(e) {
  const t = e - Wi, o = Mn ? Math.min(1, t / Mn) : 1, i = o * o * (3 - 2 * o);
  Le.renderedProgress = Jo + (Le.targetProgress - Jo) * i, o < 1 && !Le.finished ? oo = requestAnimationFrame(Bi) : oo = 0;
}
function yr(e, t) {
  if (!Le.enabled || Le.finished) return;
  const o = Math.max(Le.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (Le.status = t), Jo = Le.renderedProgress, Le.targetProgress = o, Wi = performance.now(), Mn = Math.max(280, Math.min(920, 220 + Math.abs(o - Jo) * 7.5)), cancelAnimationFrame(oo), oo = requestAnimationFrame(Bi);
}
function Oi(e = "Ready", t = !1) {
  Le.finished || (Le.finished = !0, Le.forced = t, Le.status = e, Le.targetProgress = 100, cancelAnimationFrame(oo), oo = 0, Le.renderedProgress = 100, No?.(t));
}
function br(e = "KEYBOARD SKIP") {
  Oi(e, !0);
}
const Ge = Pt(Le), gt = Object.freeze({
  update: yr,
  finish: Oi,
  skip: br,
  get enabled() {
    return Le.enabled;
  },
  get finished() {
    return Le.finished;
  }
});
function wr(e) {
  return No = e, Le.finished && e(Le.forced), () => {
    No === e && (No = null);
  };
}
const Ri = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Fi = "lw_weather_snapshot_v1";
function kr() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Fi);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Ri,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Io(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Fi,
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
const _r = () => {
  const e = kr();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Ri,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, H = xe(_r());
let dn = null, un = null;
const et = {
  get snapshot() {
    return Pt(H);
  },
  update(e) {
    Object.assign(H, e), Io(H);
  },
  unconfigured() {
    Object.assign(H, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (H.data) {
      e && (H.city = e);
      return;
    }
    Object.assign(H, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(H, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), Io(H);
  },
  notFound(e = "") {
    Object.assign(H, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    H.data || Object.assign(H, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (H.city = e), H.forecastModalOpen = !0;
  },
  closeForecastModal() {
    H.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    H.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], Io(H);
  },
  setDetailInfo(e) {
    H.detailInfo = { ...e }, Io(H);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    dn ? dn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    un ? un(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    dn = e;
  },
  setChangeLocationAction(e) {
    un = e;
  }
}, xr = () => ({
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
}), he = xe(xr());
let pn = null;
const Gt = {
  get snapshot() {
    return Pt(he);
  },
  update(e) {
    Object.assign(he, e);
  },
  updateTime(e, t, o, i) {
    he.timeText = e, he.secsText = t, he.greetingText = o, he.dateText = i, he.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (he.fontFamily = e.fontFamily), e.colorHex !== void 0 && (he.colorHex = e.colorHex), e.greetColor !== void 0 && (he.greetColor = e.greetColor), e.dateColor !== void 0 && (he.dateColor = e.dateColor), e.isBlack !== void 0 && (he.isBlack = e.isBlack), e.isCustomColor !== void 0 && (he.isCustomColor = e.isCustomColor), he.updatedAt = Date.now();
  },
  openSettings(e) {
    pn ? pn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    pn = e;
  }
}, Cr = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], $r = () => ({
  mounted: !1,
  visible: !1,
  items: [...Cr]
}), fn = xe($r());
let Do = {};
const Nn = {
  getSnapshot() {
    return Pt(fn);
  },
  update(e) {
    Object.assign(fn, e);
  },
  setMounted(e) {
    fn.mounted = e;
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
}, gn = xe({ visible: !1, pendingWrites: 0 });
async function Lr(e) {
  if (gn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  gn.pendingWrites++;
  try {
    return await e();
  } finally {
    gn.pendingWrites--;
  }
}
const Zn = {
  openDialog() {
    Se.open("wallpaper");
  },
  closeDialog() {
    Se.close("wallpaper");
  },
  resetDefault() {
    return Lr(() => Go.clearWallpaper());
  }
}, ei = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], ti = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], sh = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], _e = xe({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let hn = null;
const Dt = {
  state: _e,
  setMounted(e) {
    _e.mounted = e;
  },
  onAction(e) {
    hn = e;
  },
  dispatch(e, t) {
    if (hn)
      return hn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, r = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, h = e?.clientY ?? e?.y ?? r / 2, g = Math.max(12, Math.min(l - 40, i - 290 - 12)), u = Math.max(12, Math.min(h + 10, r - 420 - 12));
    _e.x = g, _e.y = u, _e.isOpen = !0, this.dispatch("open", { x: g, y: u });
  },
  close() {
    _e.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    _e.font = e;
    const t = ei.find((o) => o.id === e);
    if (t) {
      Gt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: _e.color, timezone: _e.timezone });
  },
  setColor(e) {
    _e.color = e;
    const t = ti.find((o) => o.id === e);
    if (t) {
      Gt.applyConfig({
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
        const i = ei.find((r) => r.id === e);
        i && Gt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        _e.color = t;
        const i = ti.find((r) => r.id === t);
        i && Gt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (_e.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (_e.font = e.font), e.color && (_e.color = e.color), e.timezone && (_e.timezone = e.timezone);
  }
}, de = xe({
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
let mn = null, Ho = !1;
async function jo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: de.model };
  if (e === "connect") return { state: "ready", model: de.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Ni(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), de.statusText = o, de.authHidden = !e.loginUrl, de.authCode = e.loginCode || "", de.authLink = e.loginUrl || "https://auth.openai.com/codex/device", de.isStreaming = Ho || e.busy || e.state === "running";
}
async function Tr() {
  try {
    const e = await jo("poll");
    Ni(e);
  } catch {
  }
}
async function Sr(e, t) {
  if (e === "open" || e === "connect")
    try {
      de.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await jo("connect");
      Ni(o);
    } catch (o) {
      de.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    de.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), de.inputText = "", de.isStreaming = !0, Ho = !0;
    try {
      await jo("send", { text: o }), await Tr();
    } catch (i) {
      de.statusText = i?.message || "发送失败";
    } finally {
      Ho = !1, de.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await jo("stop");
    } catch {
    }
    de.isStreaming = !1, Ho = !1;
  }
}
const Hn = {
  state: de,
  setMounted(e) {
    de.mounted = e;
  },
  onAction(e) {
    mn = e;
  },
  dispatch(e, t) {
    if (mn)
      return mn(e, t);
    Sr(e, t);
  },
  open() {
    de.isOpen = !0, this.dispatch("open");
  },
  close() {
    de.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    de.messages = [], de.inputText = "", de.kwShelfHidden = !0, de.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = de.inputText.trim();
    !e || de.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    de.isStreaming = !1, this.dispatch("stop");
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
    de.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    de.keywords[e] && (de.keywords[e].selected = !de.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: de.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = de.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, vn = xe({
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
}), Ao = /* @__PURE__ */ new Set(), Mr = {
  state: vn,
  open(e) {
    Object.assign(vn, e, { open: !0 });
  },
  update(e) {
    Object.assign(vn, e);
  },
  close() {
    Ao.forEach((e) => e("close"));
  },
  save(e) {
    Ao.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Ao.add(e), () => Ao.delete(e);
  }
}, zo = xe({ isOpen: !1 }), Hi = {
  state: zo,
  open() {
    zo.isOpen = !0;
  },
  close() {
    zo.isOpen = !1;
  }
}, yn = "biliProfileCacheV1", rt = "biliLocallyKnownMessageIdsV1", Eo = "biliMessageUserCacheV1", lo = "githubKnownReleaseVersionsV1", Po = "customNewtabAvatar", oi = "biliToastKnownCountsV1";
class Ir {
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
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [rt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let r = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), r = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), r = !0), r && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [rt]: this.locallyKnownIds }).catch(() => {
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
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [rt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const r = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), l = this.getVisibleUnread();
    if (zt.avatarUrl = r, zt.userName = t?.uname || "哔哩哔哩用户", zt.buttonTitle = "通知中心", rn.avatarUrl = r, rn.userName = t?.uname || "用户", rn.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = r);
      const g = document.getElementById("bili-profile-button");
      g && (g.title = zt.buttonTitle);
    }
    Mt.updateState({
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
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((p) => p.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((p) => p.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((p) => p.json())
        ]), g = r.status === "fulfilled" ? r.value?.data || {} : {}, u = l.status === "fulfilled" ? l.value?.data || {} : {}, x = h.status === "fulfilled" ? h.value?.data || {} : {}, m = Number(u.at || 0), M = u.reply != null ? Number(u.reply || 0) : Math.max(0, Number(u.recv_reply || 0) - m), f = {
          reply: Math.max(Number(g.reply || 0), M),
          at: Math.max(Number(g.at || 0), m),
          like: Math.max(
            Number(g.like || g.praise || 0),
            Number(u.like || u.recv_like || 0)
          ),
          system: Math.max(Number(g.sys_msg || g.system || 0), Number(u.sys_msg || 0)),
          private: Number(
            g.chat || u.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, f), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [yn]: { profile: i, unread: f, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(f);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [oi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const r = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [oi]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && Ee.show({
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
        Mt.openPanel();
      }
    }), r > 0 && Ee.show({
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
        Mt.openPanel();
      }
    }), l > 0 && Ee.show({
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
        Mt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, To.setActions({
      onAction: async (t) => {
        if (t === "messages")
          xt.open();
        else if (t === "tabs")
          Hi.open();
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
      yn,
      rt,
      Eo,
      lo,
      Po
    ]).then((t) => {
      this.customAvatar = t[Po] || "", this.locallyKnownIds = t[rt] && typeof t[rt] == "object" ? t[rt] : {}, this.userCache = t[Eo] && typeof t[Eo] == "object" ? t[Eo] : {}, this.githubKnownVersions = t[lo] && typeof t[lo] == "object" ? t[lo] : {};
      const o = t[yn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Po] && (this.customAvatar = t[Po].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[rt] && (this.locallyKnownIds = t[rt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Mt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const ni = new Ir(), pe = xe({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Wo = null;
const Ko = {
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
}, ye = xe({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), bn = /* @__PURE__ */ new Set();
let bt;
const co = new cr();
let ii = !1;
async function Dr(e, t) {
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
    let u = 0, x = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const m = await h.read();
        if (m.done) break;
        if (u += m.value.byteLength, u > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
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
function si(e, t) {
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
async function Ar(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const h = await Es(t), { data: g } = await Ps(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: h, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(g?.items)) throw new Error("Invalid search response");
    return {
      repos: g.items.slice(0, 30).map((u) => si(u, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${g.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (h) {
    t.throwIfAborted(), i = h instanceof Ws ? h.message : "主源响应格式无效。";
  }
  const r = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", l = await Dr(`https://ghapi.h11.dev/repositories?since=${r}`, t);
  if (t.throwIfAborted(), !Array.isArray(l)) throw new Error("Invalid fallback response");
  return {
    repos: l.slice(0, 30).map((h) => si(h, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${r} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const ji = {
  get state() {
    return ye;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    co.cancel(), ye.isLoading = !1, bt = e;
    const t = () => {
      bt === e && co.pending && (co.cancel(), ye.isLoading = !1, ye.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !ii && this.refresh(), () => {
      e.removeEventListener("abort", t), bt === e && (t(), bt = void 0);
    };
  },
  switchTab(e) {
    ye.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !bt || bt.aborted || ![1, 7, 30].includes(e) || e === ye.sinceDays || (co.cancel(), Object.assign(ye, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: ye.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = bt;
    if (!e || e.aborted || ye.isLoading) return;
    const t = ye.sinceDays, o = co.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => bt === e && ye.sinceDays === t,
      onStop: (r) => {
        ye.isLoading = !1, r === "timeout" && (ye.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      ii = !0, ye.isLoading = !0, ye.errorMessage = "";
      try {
        const r = await o.wait(() => Ar(t, o.signal));
        if (!i()) return;
        ye.repos = r.repos, ye.sourceText = r.sourceText, ye.fetchedAt = Date.now(), ye.hasLoaded = !0;
      } catch {
        i() && (ye.errorMessage = ye.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (ye.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return bn.add(e), () => {
      bn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of bn)
      try {
        o(e, t);
      } catch {
      }
  }
}, In = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), jn = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), X = xe({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: In(),
  activeSectorId: null,
  sectors: [],
  beam: jn()
});
let ri = null;
function Er(e, t) {
  if (typeof e != "number" || !t)
    return jn();
  const o = 160, i = 160, r = 26, l = 154, h = 360 / t, g = e - h / 2, u = e + h / 2, x = g * Math.PI / 180, m = u * Math.PI / 180, M = o + r * Math.cos(x), f = i + r * Math.sin(x), p = o + l * Math.cos(x), d = i + l * Math.sin(x), k = o + r * Math.cos(m), $ = i + r * Math.sin(m), b = o + l * Math.cos(m), C = i + l * Math.sin(m), P = h > 180 ? 1 : 0, ee = `M ${M.toFixed(1)} ${f.toFixed(1)} L ${p.toFixed(1)} ${d.toFixed(1)} A ${l} ${l} 0 ${P} 1 ${b.toFixed(1)} ${C.toFixed(1)} L ${k.toFixed(1)} ${$.toFixed(1)} A ${r} ${r} 0 ${P} 0 ${M.toFixed(1)} ${f.toFixed(1)} Z`, T = `M ${p.toFixed(1)} ${d.toFixed(1)} A ${l} ${l} 0 ${P} 1 ${b.toFixed(1)} ${C.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: ee,
    arcPath: T,
    line1: {
      x1: parseFloat(M.toFixed(1)),
      y1: parseFloat(f.toFixed(1)),
      x2: parseFloat(p.toFixed(1)),
      y2: parseFloat(d.toFixed(1))
    },
    line2: {
      x1: parseFloat(k.toFixed(1)),
      y1: parseFloat($.toFixed(1)),
      x2: parseFloat(b.toFixed(1)),
      y2: parseFloat(C.toFixed(1))
    }
  };
}
const be = {
  get state() {
    return X;
  },
  getSnapshot() {
    return Pt(X);
  },
  setMounted(e) {
    X.mounted = e;
  },
  setBallPosition(e, t) {
    X.ballPosition.x = e, X.ballPosition.y = t;
  },
  setVisibility(e) {
    X.isOpen = e;
  },
  setHub(e) {
    e ? X.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : X.hub = In();
  },
  setBeam(e, t) {
    X.beam = Er(e, t);
  },
  setActiveSector(e) {
    X.activeSectorId = e;
  },
  setSectors(e) {
    X.sectors = [...e];
  },
  expand(e, t, o = "main") {
    X.isOpen = !0, X.isExpanded = !0, X.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    X.isExpanded = !1, X.mode = "main", X.activeSectorId = null, X.beam = jn(), X.hub = In();
  },
  setWheelMode(e) {
    X.mode = e;
  },
  setActionHandler(e) {
    ri = e;
  },
  dispatch(e, t) {
    ri?.(e, t);
  }
}, zi = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Pr() {
  return zi.filter((e) => e.mode || e.id === "launcher" || Xo(e.id));
}
function Wr() {
  return Xs.filter((e) => e.kind === "module" && Xo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function ai() {
  X.isExpanded && Lo();
}
let Dn = [], Co = zi, lt = { x: 400, y: 300 }, yo = !1, uo = !1, po = null;
function Bo() {
  return globalThis.chrome?.storage;
}
function zn(e, t) {
  const o = X.isExpanded ? 160 : 24;
  be.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function Lo() {
  const e = X.mode;
  Co = e === "tools" ? Wr() : e === "shortcuts" ? [
    ...Dn.length ? Dn : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }],
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : Pr();
  const t = Co.length, o = t > 12 ? 118 : t > 9 ? 114 : 110, i = t > 12 ? 46 : t > 9 ? 50 : 56;
  be.setSectors(Co.map((r, l) => {
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
  })), be.setWheelMode(e), be.setActiveSector(null), be.setBeam(null, 0), be.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function Qo(e) {
  X.mode = e, Lo();
}
function At() {
  be.collapse(), zn(X.ballPosition.x, X.ballPosition.y), be.setVisibility(yo);
}
function jt(e = X.ballPosition.x, t = X.ballPosition.y, o = "main") {
  be.expand(void 0, void 0, o), zn(e, t), Lo(), be.setVisibility(!0);
}
function Br(e) {
  if (!(e.tool && !Xo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Xo(e.id))) {
    if (e.mode) {
      Qo(e.mode);
      return;
    }
    if (At(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), It.exit(), document.body && (document.body.dataset.page = "home")) : It.enter(e.id);
  }
}
function li(e) {
  lt = { x: e.clientX, y: e.clientY };
}
function ci(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), lt = { x: e.clientX, y: e.clientY }, X.isExpanded ? At() : jt(e.clientX, e.clientY));
}
function di(e) {
  e.button === 1 && e.preventDefault();
}
function ui(e) {
  !X.isExpanded || Rn.active || e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), X.mode === "shortcuts" ? Qo("main") : At());
}
function Or(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Rr(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = oe.getCachedIcon(e.url);
    if (o) return o;
    const i = Or(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const dt = {
  async start() {
    if (!uo) {
      uo = !0, lt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, be.setActionHandler((e, t) => {
        if (e === "hub:click")
          X.isExpanded ? X.mode === "shortcuts" ? Qo("main") : At() : jt();
        else if (e === "sector:click" || e === "container:click") {
          const o = Co.find((i) => i.id === t?.id || e === "container:click" && i.id === X.activeSectorId);
          o && Br(o);
        } else if (e === "sector:hover") {
          const o = X.sectors.find((i) => i.id === t?.id);
          o && (be.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), be.setActiveSector(o.id), be.setBeam(o.angleDeg, Co.length));
        } else e === "sector:leave" && (be.setActiveSector(null), be.setBeam(null, 0), be.setHub(X.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : X.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", ai), window.addEventListener("pointermove", li, { passive: !0 }), window.addEventListener("mousedown", ci, !0), window.addEventListener("auxclick", di, !0), window.addEventListener("keydown", ui, !0), po = (e, t) => {
        t === "local" && (e.showNavBall && (yo = !!e.showNavBall.newValue, be.setVisibility(yo || X.isExpanded)), (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts());
      }, Bo()?.onChanged?.addListener(po);
      try {
        const e = await Bo()?.local?.get(["showNavBall", "navBallPosition"]);
        if (!uo) return;
        yo = !!e?.showNavBall;
        const t = e?.navBallPosition;
        zn(
          typeof t?.x == "number" ? t.x : 28,
          typeof t?.y == "number" ? t.y : Math.min(window.innerHeight - 60, 180)
        ), be.setVisibility(yo);
      } catch {
      }
      await this.loadShortcuts(), Lo();
    }
  },
  stop() {
    uo = !1, be.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", ai), window.removeEventListener("pointermove", li), window.removeEventListener("mousedown", ci, !0), window.removeEventListener("auxclick", di, !0), window.removeEventListener("keydown", ui, !0), po && Bo()?.onChanged?.removeListener(po), po = null;
  },
  async loadShortcuts() {
    try {
      const e = await Bo()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!uo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Dn = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Rr(o)
      })), X.mode === "shortcuts" && Lo();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    jt(e ?? lt.x, t ?? lt.y);
  },
  close: At,
  toggle(e = !1) {
    X.isExpanded ? At() : e ? jt(lt.x, lt.y) : jt();
  },
  toggleTools(e = !0) {
    X.isExpanded && X.mode === "tools" ? At() : jt(
      e ? lt.x : X.ballPosition.x,
      e ? lt.y : X.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Qo(e);
  }
};
class Yt {
  constructor() {
    this.activeShortcuts = { ...ln }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: i, SHORTCUT_STORAGE_KEY: r } = await import("./options.service-Dgtcqrsg.js").then((m) => m.g), h = (await chrome.storage.local.get(r))[r], g = { ...h || {}, [t]: o }, u = this.shortcutReadVersion, x = await i.saveSettings(
      { [r]: g },
      { [r]: h }
    );
    u === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[r]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(ln, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...ln, ...Object.fromEntries(o) };
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
    if (!t || !Xn(t)) return !1;
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
        return It.enter("daily-pricing"), !0;
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
        if (Rn.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = Js(t);
        if (!i) return;
        const r = i.toLowerCase();
        for (const [l, h] of Object.entries(this.activeShortcuts))
          if (!(!h || !Xn(l)) && h.toLowerCase().replace(/^cmd\+/, "meta+") === r) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const An = Yt.getInstance();
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
    return Pt(this._isVisible);
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
const Fr = qt.getInstance(), wn = () => window;
let $t = !1, fo, kn, go;
function pi(e) {
  return oe.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: oe.getPageLabel(t) }));
}
function fi() {
  if (!qe.isOpen || !qe.activeFolder) return;
  const e = oe.getState(), t = qe.activeFolder;
  kt.setLinks(e.links.filter((l) => (l.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const l of e.links) {
    const h = l.group || "常用网站";
    o.has(h) || o.set(h, []), o.get(h).push(l);
  }
  const i = new Map(Object.keys(e.folders).map((l) => [l, Yo(e.folders, l)])), r = /* @__PURE__ */ new Map();
  for (const l of i.values()) l && r.set(l, (r.get(l) || 0) + 1);
  kt.setFolders([...i].filter(([, l]) => l === t).map(([l]) => ({
    groupName: l,
    links: o.get(l) || [],
    count: (o.get(l)?.length || 0) + (r.get(l) || 0)
  })), Yo(e.folders, t));
}
const En = {
  openEditor(e) {
    _o.openEditDialog(e || {});
  },
  openFolder(e = qe.activeFolder) {
    if (!e) return;
    const o = oe.getState().links.filter((i) => (i.group || "常用网站") === e);
    kt.openFolder(e, o), fi();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), Qt.openLinkMenu(e, pi(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = oe.getState(), r = o || i.activePage;
    Qt.openFolderMenu(
      e,
      oe.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      pi(r),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), Qt.openPageMenu(
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
    }), fi();
  },
  start() {
    $t || ($t = !0, $e.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: js,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), kt.setActionHandler((e, t) => {
      e === "close" ? kt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), kn = oe.subscribe(() => {
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
    }, wn().chrome?.storage?.onChanged?.addListener(go));
  },
  init() {
    return this.start(), fo || (fo = (async () => {
      await oe.ready;
      const e = wn().chrome;
      if (!$t) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if ($t) {
        if (!oe.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((r) => i(r || [])));
          if (!$t) return;
          oe.getState().links.length || (oe.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || oe.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await oe.save());
        }
        $t && this.render();
      }
    })().catch((e) => {
      throw fo = void 0, e;
    }), fo);
  },
  stop() {
    $t = !1, kn?.(), kn = void 0, go && wn().chrome?.storage?.onChanged?.removeListener(go), go = void 0, kt.setActionHandler(null), $e.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, gi = [
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
    if (!i) return gi.slice(0, o);
    const r = [];
    for (const l of gi) {
      const h = l.name.toLowerCase(), g = l.pinyin.toLowerCase(), u = l.admin.toLowerCase();
      if ((h.startsWith(i) || g.startsWith(i) || h.includes(i) || g.includes(i) || u.includes(i)) && r.push(l), r.length >= o) break;
    }
    return r;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      et.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    et.loading(o);
    try {
      const r = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, l = await fetch(r);
      if (i !== this.activeRequestId || H.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const g = (await l.json()).results?.[0];
      if (!g) {
        i === this.activeRequestId && H.state !== "unconfigured" && et.notFound(o), this.isRefreshing = !1;
        return;
      }
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(u);
      if (i !== this.activeRequestId || H.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const m = await x.json(), M = Oo(m.current?.weather_code ?? 0), f = Math.round(m.current?.temperature_2m ?? 0), p = m.hourly?.time || [], d = Date.now();
      let k = p.findIndex((w) => new Date(w).getTime() >= d);
      k < 0 && (k = 0);
      const $ = [];
      for (let w = k; w < Math.min(k + 5, p.length); w++) {
        const I = w === k ? "现在" : new Date(p[w]).getHours() + "时", V = Oo(m.hourly.weather_code[w]), G = Math.round(m.hourly.temperature_2m[w]);
        $.push({ time: I, emoji: V.emoji, temp: G });
      }
      let b = "未来 12 小时暂无降水 ☂️";
      for (let w = k; w < Math.min(k + 12, p.length); w++) {
        const I = m.hourly.weather_code[w], V = m.hourly.precipitation_probability?.[w] || 0;
        if (I >= 51 || V >= 60) {
          const G = new Date(p[w]).getHours(), E = I >= 71 && I <= 77 || I === 85 || I === 86;
          b = `预计 ${G}:00 ${E ? "有雪" : "有雨"}${V ? `（${V}%）` : ""} 🌧️`;
          break;
        }
      }
      const C = ["今天", "明天", "后天"], P = [], ee = m.daily?.time?.length || 0;
      for (let w = 1; w < Math.min(3, ee); w++) {
        const I = C[w] || `+${w}天`, V = Oo(m.daily.weather_code[w]), G = `${Math.round(m.daily.temperature_2m_max[w])}°/${Math.round(m.daily.temperature_2m_min[w])}°`;
        P.push({ label: I, emoji: V.emoji, tempRange: G });
      }
      const T = `${M.label} · 最高 ${Math.round(m.daily?.temperature_2m_max?.[0] ?? f)}° / 最低 ${Math.round(m.daily?.temperature_2m_min?.[0] ?? f)}°`, S = {
        cityName: g.name || o,
        currentEmoji: M.emoji,
        currentTemp: f,
        subText: T,
        rainText: b,
        hours: $,
        days: P
      };
      if (i === this.activeRequestId && H.state !== "unconfigured") {
        if (et.ready(S, o), m.daily?.time) {
          const I = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], V = [];
          for (let G = 0; G < m.daily.time.length; G++) {
            const E = new Date(m.daily.time[G]), j = G === 0 ? "今天" : G === 1 ? "明天" : G === 2 ? "后天" : I[E.getDay()], O = Oo(m.daily.weather_code[G]);
            V.push({
              date: `${E.getMonth() + 1}/${E.getDate()}`,
              dayName: j,
              emoji: O.emoji,
              condition: O.label,
              highTemp: Math.round(m.daily.temperature_2m_max[G]),
              lowTemp: Math.round(m.daily.temperature_2m_min[G]),
              rainProb: m.daily.precipitation_probability_max?.[G] || 0
            });
          }
          et.setForecastDays(V);
        }
        const w = {
          humidity: m.current?.relative_humidity_2m ? `${m.current.relative_humidity_2m}%` : "60%",
          wind: m.current?.wind_speed_10m ? `${Math.round(m.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        et.setDetailInfo(w);
      }
    } catch (r) {
      i === this.activeRequestId && H.state !== "unconfigured" && et.error(r?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const bo = Xt.getInstance();
function Nr(e, t) {
  window.LogicWeaverIntro = gt, window.LogicWeaverNotifications = Ee, window.LogicWeaverWindowManager = Se, window.LogicWeaverWindowTabs = Se, window.LogicWeaverDomFreezer = Qs, window.LogicWeaverWallpaperService = Go, window.LogicWeaverLauncherService = oe, window.LogicWeaverLauncherRuntime = En, window.LogicWeaverProfileService = ni;
  try {
    ni.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = Wn, window.LogicWeaverCalendarService = zs, window.LogicWeaverWeather = et, window.LogicWeaverWeatherService = bo, window.LogicWeaverClock = Gt, window.LogicWeaverSearch = Bs, window.LogicWeaverSearchService = Os, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-B_v2GyIl.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = ze, window.LogicWeaverLauncherGroups = $e, window.LogicWeaverProfileMenu = To, window.LogicWeaverWorkspaceLaunchers = Nn, window.LogicWeaverMacDock = ct, window.LogicWeaverFullscreen = It, window.enterFullscreenCard = (o) => It.enter(o), window.exitFullscreenCard = () => It.exit(), window.cycleFullscreenCard = () => It.cycle(), window.LogicWeaverPageVisibility = Fr, window.LogicWeaverBackgroundLibrary = Zn, window.LogicWeaverNotificationCenter = xt, window.LogicWeaverBookmarkMenu = Bn, window.LogicWeaverBookmarkPanel = en, window.LogicWeaverBookmarkFolderStrip = qo, window.LogicWeaverLauncherDialogs = _o, window.LogicWeaverLauncherFolder = kt, window.LogicWeaverLauncherMenus = Qt, window.LogicWeaverSettings = tn, window.LogicWeaverClockSettings = Dt, window.LogicWeaverBiliTheater = xo, window.LogicWeaverBilibiliService = Gn, window.getBiliJct = () => Gn.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Yn, window.openBiliMiniPlayer = (o) => Yn.openVideo(o), window.LogicWeaverAiDialog = Hn, window.LogicWeaverAihotViewer = Fn, window.LogicWeaverNavWheel = be, window.openNavWheel = (o, i) => dt.open(o, i), window.closeNavWheel = () => dt.close(), window.toggleNavWheel = (o) => dt.toggle(o), window.toggleToolWheel = (o) => dt.toggleTools(o), window.setNavWheelMode = (o) => dt.setMode(o), window.LogicWeaverShortcuts = An, window.triggerToolShortcut = (o) => An.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Ks, window.LogicWeaverGitHubStatus = On, window.LogicWeaverGitHubFolders = St, window.LogicWeaverGitHubHero = wo, window.LogicWeaverGitHubRepositories = at, window.LogicWeaverGitHubBatchBar = ko, window.LogicWeaverTodoistLabels = Us, window.LogicWeaverTodoistWorkspace = Vs, window.LogicWeaverTodoistCalendarSidebar = Gs, window.LogicWeaverTodoistTaskList = Ys, window.LogicWeaverBiliMessagePanel = Mt, window.LogicWeaverStickerBoard = or, window.LogicWeaverStickersService = nr, window.LogicWeaverPricing = Pi, window.LogicWeaverBiliFavorites = Ai, window.LogicWeaverBiliRadioTape = ar, window.LogicWeaverBiliOrganizerDialogs = ir, window.LogicWeaverBiliUpGroupManager = sr, window.LogicWeaverBiliUpPreview = Ko, window.LogicWeaverYouTube = Mi, window.LogicWeaverAihotFeed = Ei, window.LogicWeaverGitHubTrending = ji, window.LogicWeaverCalendarWorkspace = Vt, window.LogicWeaverCalendar = Vt, window.LogicWeaverTodoistMainWorkspace = qs, window.LogicWeaverTodoistTaskDetail = Mr, window.openBiliTheater = (o) => xo.openVideo(o), window.closeBiliTheater = () => xo.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = an(o.target) || qn(o.url) || (o.appType === "bili" ? $s([o.title, o.subtitle, o.message].filter((r) => typeof r == "string").join(" ")) : void 0);
    return Ee.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return xt.openTarget(i);
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
    const l = typeof i == "object" && i ? i : r, h = typeof i == "number" ? i : 3200, g = l.isError || /失败|错误|异常|未获取|未找到/i.test(o), u = l.title || (g ? "B站操作未完成" : "哔哩哔哩"), x = l.subtitle || (o.length > 36 ? "" : o), m = l.message || (l.subtitle || o.length > 36 ? o : ""), M = {
      id: l.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: u,
      subtitle: x || o,
      message: m && m !== x ? m : "",
      showActions: !!(l.showActions || l.actionLabel),
      actionLabel: l.actionLabel || "",
      onClick: l.onClick || null,
      target: an(l.target) || qn(l.url) || an({ type: "bili-video", bvid: l.bvid, aid: l.aid ? String(l.aid) : void 0 }),
      url: l.url,
      duration: Math.max(3e3, h)
    };
    return window.showWindowsToast(M);
  }, window.showFetchToast = (o, i, r = "", l = "assets/logo.png", h = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: r,
    icon: l || "assets/logo.png",
    duration: h,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = dr, window.LogicWeaverMarkdownAst = ur, window.setLauncherBackground = (o) => Go.setWallpaper(o), window.backgroundDbClear = (o) => Ls(o), window.openBackgroundHistory = () => Zn.openDialog();
}
const Ae = xe({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Ro = null;
const Ki = {
  get state() {
    return Ae;
  },
  open() {
    Ae.isOpen || (Ae.isOpen = !0, Ae.query = "", Ae.selectedIndex = 0, Ro = Se.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Ae.isOpen && (Ae.isOpen = !1, Ae.query = "", Ae.selectedIndex = 0, Ro && (Ro(), Ro = null));
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
  if (Rn.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Ki.toggle());
}, !0);
function Hr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Ki.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => gt.enabled && !gt.finished,
    run: () => gt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => Ee.size > 0,
    run: () => Ee.clear()
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
const jr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, zr = /* @__PURE__ */ le({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Ss.exit();
    }
    return (o, i) => (a(), ce(ks, { name: "guest-banner-slide" }, {
      default: Zt(() => [
        s(Ts) ? (a(), c("aside", jr, [
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
        ])) : D("", !0)
      ]),
      _: 1
    }));
  }
}), Kr = /* @__PURE__ */ Te(zr, [["__scopeId", "data-v-a2f2ca5f"]]), Ur = ["hidden"], Vr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, Gr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], Yr = /* @__PURE__ */ le({
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
    return (l, h) => (a(), c("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Ut).enabled,
      onWheel: o
    }, [
      s(Ut).folders.length ? D("", !0) : (a(), c("span", Vr, v(s(Ut).emptyMessage || "书签栏没有文件夹"), 1)),
      (a(!0), c(U, null, fe(s(Ut).folders, (g) => (a(), c("button", {
        key: g.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${g.title || "未命名"}`,
        "data-bookmark-folder-id": g.id,
        onClick: (u) => i(g),
        onContextmenu: R((u) => r(u, g), ["prevent"])
      }, [
        h[0] || (h[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, v(g.title || "未命名"), 1)
      ], 40, Gr))), 128))
    ], 40, Ur));
  }
}), qr = /* @__PURE__ */ Te(Yr, [["__scopeId", "data-v-5e71cc7c"]]), Xr = { class: "cube-manager-body" }, Jr = ["disabled", "onClick"], Qr = ["disabled", "onClick"], Zr = ["onClick"], ea = ["onClick"], ta = ["onClick"], oa = ["type", "placeholder"], na = {
  key: 0,
  role: "alert"
}, ia = /* @__PURE__ */ le({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Me.state, o = ae(() => Me.getActiveFaces()), i = ae(() => t.registeredFaces.filter((f) => !t.activeFaceIds.includes(f.id))), r = F(""), l = F("memo"), h = F(""), g = F(!1), u = F(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = F("");
    function m(f) {
      x.value = "";
      try {
        f();
      } catch (p) {
        x.value = p instanceof Error ? p.message : "操作失败";
      }
    }
    function M() {
      m(() => {
        const f = g.value ? JSON.parse(u.value) : {
          title: r.value,
          customType: l.value,
          customData: { text: h.value, targetDate: h.value, url: h.value }
        };
        Me.addCustomFace(f), r.value = "", h.value = "";
      });
    }
    return (f, p) => (a(), ce(ht, { to: "body" }, [
      s(t).isConfigDialogOpen ? (a(), c("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: p[7] || (p[7] = Et(R((d) => s(Me).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          p[8] || (p[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: p[0] || (p[0] = (d) => s(Me).closeConfigDialog())
          }, "×")
        ]),
        n("div", Xr, [
          p[16] || (p[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (a(!0), c(U, null, fe(o.value, (d, k) => (a(), c("div", {
            key: d.id,
            class: "cube-row"
          }, [
            n("span", null, v(d.icon) + " " + v(d.title), 1),
            n("button", {
              type: "button",
              disabled: k === 0,
              onClick: ($) => m(() => s(Me).moveUp(d.id)),
              title: "上移"
            }, "↑", 8, Jr),
            n("button", {
              type: "button",
              disabled: k === o.value.length - 1,
              onClick: ($) => m(() => s(Me).moveDown(d.id)),
              title: "下移"
            }, "↓", 8, Qr),
            n("button", {
              type: "button",
              onClick: ($) => m(() => s(Me).removeCustomFace(d.id))
            }, "删除面", 8, Zr)
          ]))), 128)),
          (a(!0), c(U, null, fe(i.value, (d) => (a(), c("div", {
            key: d.id,
            class: "cube-row"
          }, [
            n("span", null, v(d.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (k) => m(() => s(Me).toggleActive(d.id, !0))
            }, "添加", 8, ea),
            d.builtIn ? D("", !0) : (a(), c("button", {
              key: 0,
              type: "button",
              onClick: (k) => m(() => s(Me).removeCustomFace(d.id))
            }, "删除", 8, ta))
          ]))), 128)),
          p[17] || (p[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            Be(n("input", {
              "onUpdate:modelValue": p[1] || (p[1] = (d) => g.value = d),
              type: "checkbox"
            }, null, 512), [
              [_s, g.value]
            ]),
            p[9] || (p[9] = Oe(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: R(M, ["prevent"])
          }, [
            g.value ? (a(), c(U, { key: 1 }, [
              p[14] || (p[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Be(n("textarea", {
                "onUpdate:modelValue": p[5] || (p[5] = (d) => u.value = d),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [eo, u.value]
              ])
            ], 64)) : (a(), c(U, { key: 0 }, [
              n("label", null, [
                p[10] || (p[10] = Oe("标题", -1)),
                Be(n("input", {
                  "onUpdate:modelValue": p[2] || (p[2] = (d) => r.value = d),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [eo, r.value]
                ])
              ]),
              n("label", null, [
                p[12] || (p[12] = Oe("类型", -1)),
                Be(n("select", {
                  "onUpdate:modelValue": p[3] || (p[3] = (d) => l.value = d)
                }, [...p[11] || (p[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [xi, l.value]
                ])
              ]),
              n("label", null, [
                p[13] || (p[13] = Oe("内容", -1)),
                Be(n("input", {
                  "onUpdate:modelValue": p[4] || (p[4] = (d) => h.value = d),
                  type: l.value === "countdown" ? "date" : "text",
                  placeholder: l.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, oa), [
                  [xs, h.value]
                ])
              ])
            ], 64)),
            p[15] || (p[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          x.value ? (a(), c("p", na, v(x.value), 1)) : D("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: p[6] || (p[6] = (d) => m(() => s(Me).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          p[18] || (p[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : D("", !0)
    ]));
  }
}), sa = /* @__PURE__ */ Te(ia, [["__scopeId", "data-v-15dd5487"]]), ra = ["data-face"], aa = { class: "ms-top-side" }, la = {
  key: 0,
  class: "ms-top-meta"
}, ca = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, da = { class: "ms-top-artist" }, ua = { class: "ms-top-meta" }, pa = ["title"], fa = ["title"], ga = {
  key: 0,
  class: "ms-top-divider"
}, ha = ["title"], ma = { class: "ms-top-mini-progress" }, va = { class: "ms-top-side" }, ya = ["aria-label"], ba = ["title"], wa = { class: "ms-cube-custom-icon" }, ka = { class: "ms-cube-custom-title" }, _a = ["title"], xa = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Ca = ["href"], $a = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, La = ["title", "onClick"], Ta = { class: "ms-cube-cm-header" }, Sa = { class: "ms-cube-cm-list" }, Ma = ["onClick"], Ia = { class: "ms-cube-cm-icon" }, Da = { class: "ms-cube-cm-title" }, Aa = {
  key: 0,
  class: "ms-cube-cm-check"
}, Ea = /* @__PURE__ */ le({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => Ti.visible || ot.djModalOpen || ot.isActive && ot.isJoined), i = ae(() => ot.isActive && ot.isJoined), r = ae(() => Me.getActiveFaces()), l = F("music"), h = F(0);
    let g = !1, u;
    Ke(
      () => r.value,
      (B) => {
        B.some((W) => W.id === l.value) || (l.value = B[0]?.id || "");
      },
      { immediate: !0 }
    );
    const x = ae(() => r.value.filter((B) => !B.builtIn)), m = F(!1), M = F({ x: 0, y: 0 });
    Ke(() => t.active, (B) => {
      B || (m.value = !1, Me.closeConfigDialog(), clearTimeout(u), g = !1);
    }, { immediate: !0 });
    const { menuRef: f, style: p } = Di({
      visible: () => m.value,
      anchor: () => M.value,
      dismiss: () => {
        m.value = !1;
      }
    });
    function d(B) {
      B.preventDefault(), B.stopPropagation(), M.value = { x: B.clientX, y: B.clientY }, m.value = !0;
    }
    function k(B) {
      V(B), m.value = !1;
    }
    function $() {
      m.value = !1, Me.openConfigDialog();
    }
    function b() {
      m.value = !1, C(() => Me.resetDefaults()), V("music");
    }
    function C(B) {
      m.value = !1;
      try {
        B();
      } catch (W) {
        Ee.show({ appName: "滚动立方体", title: "保存失败", message: W instanceof Error ? W.message : "请检查浏览器存储" });
      }
    }
    function P(B) {
      if (!B) return "未设置目标日";
      const N = new Date(B).getTime() - w.value, ue = Math.ceil(N / (1e3 * 60 * 60 * 24));
      return ue > 0 ? `还剩 ${ue} 天` : ue === 0 ? "就是今天！" : `已过去 ${Math.abs(ue)} 天`;
    }
    const ee = ae(() => Y.isBiliRadio ? "B站电台" : Y.isNetease ? "网易云" : Y.playing ? "塞壬" : "待机"), T = ae(() => Y.currentLyric ? Y.currentLyric : Y.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function S() {
      Se.handleToolClick("music");
    }
    const w = F(Date.now());
    let I;
    Ke(() => t.active && r.value.some((B) => B.id === l.value && B.customType === "countdown"), (B) => {
      B && (w.value = Date.now()), clearInterval(I), I = B ? window.setInterval(() => {
        document.hidden || (w.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function V(B, W = null) {
      const N = r.value, ue = N.find((Ce) => Ce.id === B) || N[0];
      if (ue) {
        if (Number.isFinite(W))
          h.value = W;
        else if (ue.id !== l.value) {
          const Ce = N.findIndex((Ne) => Ne.id === l.value);
          let we = (N.findIndex((Ne) => Ne.id === ue.id) - Ce + N.length) % N.length;
          we > N.length / 2 && (we -= N.length), h.value += we * 90;
        }
        l.value = ue.id;
      }
    }
    function G(B) {
      const W = r.value;
      if (W.length <= 1) return;
      const N = W.findIndex((we) => we.id === l.value), Ce = ((N >= 0 ? N : 0) + B + W.length) % W.length, Fe = W[Ce];
      Fe && V(Fe.id, h.value + B * 90);
    }
    function E(B) {
      r.value.length <= 1 || B.altKey || Math.abs(B.deltaY) < 2 || (B.preventDefault(), !g && (g = !0, G(B.deltaY > 0 ? 1 : -1), u = setTimeout(() => {
        g = !1;
      }, 420)));
    }
    function j(B) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(B.key) || B.target?.closest?.("input") || (B.preventDefault(), G(["ArrowDown", "PageDown"].includes(B.key) ? 1 : -1));
    }
    function O(B, W) {
      return l.value === B ? {
        transform: `rotateX(${-h.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${W}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function q(B) {
      const W = B.target;
      W && (W.tagName === "INPUT" || W.tagName === "TEXTAREA" || W.isContentEditable) || (B.preventDefault(), B.stopPropagation());
    }
    function ve(B) {
      const W = B.target;
      W && (W.tagName === "INPUT" || W.tagName === "TEXTAREA" || W.isContentEditable) || B.preventDefault();
    }
    return Wt(() => {
      clearInterval(I), clearTimeout(u);
    }), (B, W) => Be((a(), c("div", {
      class: "ms-top-player",
      "data-face": l.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: E,
      onKeydown: j,
      onContextmenu: d,
      onCopy: q,
      onSelectstart: ve
    }, [
      r.value.length ? D("", !0) : (a(), c("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: $
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: me({ transform: `translateZ(-22px) rotateX(${h.value}deg)` })
      }, [
        s(Me).isActive("music") && l.value === "music" ? (a(), c("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: me(O("music", 0))
        }, [
          n("div", aa, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: W[0] || (W[0] = R((N) => s(ze).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: W[1] || (W[1] = R((N) => s(ze).togglePlay(), ["stop"]))
            }, v(s(Y).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: R(S, ["stop"])
          }, [
            o.value ? (a(), c("div", la, [
              n("span", ca, " 🎧 " + v(i.value ? "正在一起听" : "正在收听") + "：" + v(s(Y).title || "待机中"), 1),
              n("span", da, v(s(Y).artist), 1)
            ])) : (a(), c(U, { key: 1 }, [
              n("div", ua, [
                n("span", {
                  class: "ms-top-title",
                  title: s(Y).title || "音乐播放器"
                }, v(s(Y).title || "音乐播放器"), 9, pa),
                n("span", {
                  class: "ms-top-artist",
                  title: s(Y).artist || "待机中"
                }, v(s(Y).artist || "待机中"), 9, fa),
                n("span", {
                  class: se(["ms-top-source", { idle: !s(Y).playing }])
                }, v(ee.value), 3),
                T.value ? (a(), c("span", ga)) : D("", !0)
              ]),
              T.value ? (a(), c("span", {
                key: 0,
                class: "ms-top-lyric",
                title: T.value
              }, v(T.value), 9, ha)) : D("", !0)
            ], 64)),
            n("div", ma, [
              n("div", {
                class: "ms-top-mini-fill",
                style: me({ width: s(Y).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", va, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: W[2] || (W[2] = R((N) => s(ze).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: R(S, ["stop"])
            }, "🎵")
          ])
        ], 4)) : D("", !0),
        (a(!0), c(U, null, fe(x.value, (N, ue) => (a(), c("section", {
          key: N.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": N.title,
          style: me(O(N.id, (ue + 1) * 90))
        }, [
          l.value === N.id ? (a(), c("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: N.desc
          }, [
            n("span", wa, v(N.icon), 1),
            n("strong", ka, v(N.title), 1),
            W[10] || (W[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            N.customType === "memo" ? (a(), c("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: N.customData?.text
            }, v(N.customData?.text || "（点击右键配置便签内容）"), 9, _a)) : N.customType === "countdown" ? (a(), c("span", xa, v(P(N.customData?.targetDate)), 1)) : N.customType === "link" ? (a(), c("a", {
              key: 2,
              href: N.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: W[3] || (W[3] = R(() => {
              }, ["stop"]))
            }, v(N.customData?.url) + " ↗ ", 9, Ca)) : D("", !0)
          ], 8, ba)) : D("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: W[4] || (W[4] = R((Ce) => s(Me).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, ya))), 128))
      ], 4),
      n("div", $a, [
        (a(!0), c(U, null, fe(r.value, (N) => (a(), c("i", {
          key: N.id,
          class: se({ on: l.value === N.id }),
          title: N.title,
          onClick: R((ue) => V(N.id), ["stop"])
        }, null, 10, La))), 128))
      ]),
      (a(), ce(ht, { to: "body" }, [
        t.active && m.value ? (a(), c("div", {
          key: 0,
          ref_key: "menuRef",
          ref: f,
          class: "ms-cube-context-menu",
          style: me(s(p)),
          onClick: W[9] || (W[9] = R(() => {
          }, ["stop"]))
        }, [
          n("div", Ta, [
            W[11] || (W[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: W[5] || (W[5] = (N) => m.value = !1)
            }, "×")
          ]),
          n("div", Sa, [
            (a(!0), c(U, null, fe(r.value, (N) => (a(), c("button", {
              key: N.id,
              type: "button",
              class: se(["ms-cube-cm-item", { active: l.value === N.id }]),
              onClick: (ue) => k(N.id)
            }, [
              n("span", Ia, v(N.icon), 1),
              n("span", Da, v(N.title), 1),
              l.value === N.id ? (a(), c("span", Aa, "✓")) : D("", !0)
            ], 10, Ma))), 128))
          ]),
          W[16] || (W[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: $
          }, [...W[12] || (W[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[6] || (W[6] = (N) => {
              G(-1), m.value = !1;
            })
          }, [...W[13] || (W[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[7] || (W[7] = (N) => {
              G(1), m.value = !1;
            })
          }, [...W[14] || (W[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          l.value ? (a(), c("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: W[8] || (W[8] = (N) => C(() => s(Me).removeCustomFace(l.value)))
          }, "删除当前面")) : D("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: b
          }, [...W[15] || (W[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : D("", !0)
      ])),
      t.active ? (a(), ce(sa, { key: 1 })) : D("", !0)
    ], 40, ra)), [
      [to, t.active]
    ]);
  }
}), Pa = /* @__PURE__ */ Te(Ea, [["__scopeId", "data-v-c3454bdf"]]), Wa = { class: "tb-brand" }, Ba = ["aria-expanded", "aria-label"], Oa = ["src", "alt"], Ra = ["hidden"], Fa = ["hidden"], Na = { id: "vue-bookmark-folder-strip-root" }, Ha = { class: "tb-actions" }, ja = {
  id: "workspace-launchers",
  hidden: ""
}, za = /* @__PURE__ */ le({
  __name: "AppTopBar",
  setup(e) {
    const t = K(() => import("./WorkspaceLaunchers-_pPR5z2-.js"));
    function o(p) {
      p.preventDefault(), p.stopPropagation();
      const d = typeof window < "u" ? window : null;
      d?.LogicWeaverWindowManager?.open ? d.LogicWeaverWindowManager.open("settings") : d?.LogicWeaverWindowTabs?.open ? d.LogicWeaverWindowTabs.open("settings") : tn.open();
    }
    function i(p) {
      p.preventDefault();
      const d = typeof window < "u" ? window : null;
      typeof d?.toggleBookmarkPanel == "function" ? d.toggleBookmarkPanel() : d?.LogicWeaverBookmarkPanel?.toggle ? d.LogicWeaverBookmarkPanel.toggle() : Wn.toggleBookmarkPanel();
    }
    function r(p) {
      p.preventDefault(), xt.toggle();
    }
    function l(p) {
      p.preventDefault(), To.open(p.clientX, p.clientY);
    }
    const h = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], g = F("☀️"), u = F("切换主题");
    function x() {
      if (typeof document > "u") return;
      const p = document.documentElement.dataset.theme || "light", d = h.find((k) => k.id === p) || h.find((k) => k.id === "light") || h[0];
      g.value = d.icon, u.value = `主题：${d.label}（点击更换）`;
    }
    function m(p) {
      if (p.preventDefault(), typeof document > "u") return;
      const d = document.documentElement.dataset.theme || "light", k = h.findIndex((b) => b.id === d), $ = h[(k + 1) % h.length];
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
    function M(p) {
      const d = p.target;
      d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable) || (p.preventDefault(), p.stopPropagation());
    }
    function f(p) {
      const d = p.target;
      d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable) || p.preventDefault();
    }
    return Ue(() => {
      xt.start();
      const p = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = p, document.documentElement.setAttribute("data-theme", p), x();
    }), (p, d) => (a(), c("header", {
      class: se(["topbar", { "bookmark-folders-mode": s(Ut).enabled }]),
      onCopy: M,
      onSelectstart: f
    }, [
      n("div", Wa, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": s(Si).isOpen,
          "aria-label": s(ro) ? `通知中心，${s(ro)} 条未读` : "通知中心",
          onClick: r,
          onContextmenu: d[0] || (d[0] = R((k) => l(k), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(zt).avatarUrl || "assets/bilibili.svg",
            alt: s(zt).userName || "通知中心头像"
          }, null, 8, Oa),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(ro) <= 0
          }, v(s(ro) > 99 ? "99+" : s(ro)), 9, Ra)
        ], 40, Ba),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: s(Ut).enabled,
          onClick: i
        }, [...d[1] || (d[1] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, Fa),
        n("div", Na, [
          Q(qr)
        ])
      ]),
      Q(Pa, {
        active: !s(_t).activeId
      }, null, 8, ["active"]),
      n("div", Ha, [
        d[2] || (d[2] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", ja, [
          Q(s(t))
        ]),
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
        }, v(g.value), 1)
      ])
    ], 34));
  }
}), Ka = {
  key: 0,
  class: "notice"
}, Ua = {
  key: 1,
  class: "muted small"
}, Va = {
  key: 2,
  class: "notice"
}, Ga = {
  key: 3,
  class: "notice"
}, Ya = { class: "wx-cur" }, qa = { class: "wx-emoji" }, Xa = { class: "wx-temp" }, Ja = { class: "wx-sub" }, Qa = { class: "wx-rain" }, Za = { class: "wx-hours" }, el = { class: "hh" }, tl = { class: "he" }, ol = { class: "ht" }, nl = { class: "wx-days" }, il = ["open"], sl = { class: "weather-forecast-head" }, rl = { class: "weather-forecast-city-info" }, al = { class: "weather-forecast-icon" }, ll = { id: "weather-forecast-city-title" }, cl = { class: "small muted" }, dl = { class: "weather-forecast-actions" }, ul = {
  key: 0,
  class: "weather-metrics-grid"
}, pl = { class: "weather-metric-item" }, fl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, gl = { class: "weather-metric-item" }, hl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, ml = { class: "weather-metric-item" }, vl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, yl = { class: "weather-metric-item" }, bl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, wl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, kl = { class: "day-date-col" }, _l = { class: "day-name" }, xl = { class: "day-date small muted" }, Cl = { class: "day-weather-col" }, $l = { class: "day-emoji" }, Ll = { class: "day-cond" }, Tl = { class: "day-rain-col" }, Sl = {
  key: 0,
  class: "rain-tag"
}, Ml = {
  key: 1,
  class: "rain-tag empty"
}, Il = { class: "day-temp-bar-col" }, Dl = { class: "low-temp" }, Al = { class: "temp-track" }, El = { class: "high-temp" }, Pl = { class: "weather-location-head" }, Wl = { class: "weather-location-title-row" }, Bl = ["title"], Ol = { class: "weather-input-wrapper" }, Rl = ["onKeydown"], Fl = { key: 0 }, Nl = {
  key: 0,
  class: "weather-location-suggestions"
}, Hl = ["onClick"], jl = { class: "weather-suggestion-name" }, zl = { class: "weather-suggestion-sub" }, Kl = {
  key: 1,
  class: "weather-suggestion-empty"
}, Ul = { key: 1 }, Vl = { class: "weather-quick-chips-grid" }, Gl = ["onClick"], Yl = /* @__PURE__ */ le({
  __name: "WeatherWidget",
  setup(e) {
    const t = F(!1), o = F({ x: 0, y: 0 }), i = F(""), r = F(null), l = F(null), h = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], g = ae(() => {
      const b = i.value.trim();
      return b ? bo.filterCities(b, 6) : [];
    });
    function u(b) {
      const T = b?.clientX ?? window.innerWidth / 2 - 140, S = b?.clientY ?? window.innerHeight / 2 - 320 / 2, w = Math.max(12, Math.min(window.innerWidth - 280 - 12, T)), I = Math.max(12, Math.min(window.innerHeight - 320 - 12, S));
      o.value = { x: w, y: I }, t.value = !0, i.value = "", ft(() => {
        l.value?.focus();
      });
    }
    function x() {
      t.value = !1, i.value = "";
    }
    async function m(b) {
      const C = b.trim();
      C && (x(), await bo.changeCity(C));
    }
    function M() {
      const b = i.value.trim();
      b && m(b);
    }
    function f(b) {
      if (!t.value) return;
      const C = b.target;
      r.value && !r.value.contains(C) && x();
    }
    function p(b) {
      t.value && b.key === "Escape" && (b.preventDefault(), x());
    }
    Ue(() => {
      et.setRefreshAction(() => {
        bo.loadWeather();
      }), et.setChangeLocationAction((b) => {
        u(b);
      }), bo.loadWeather(), window.addEventListener("pointerdown", f, !0), window.addEventListener("keydown", p, !0);
    }), Wt(() => {
      window.removeEventListener("pointerdown", f, !0), window.removeEventListener("keydown", p, !0);
    });
    function d(b) {
      b.preventDefault(), u(b);
    }
    function k() {
      et.closeForecastModal();
    }
    function $(b) {
      b.target?.id === "weather-forecast-dialog" && k();
    }
    return (b, C) => (a(), c("div", {
      class: "weather-widget-container",
      onContextmenu: d
    }, [
      s(H).state === "unconfigured" ? (a(), c("p", Ka, [...C[6] || (C[6] = [
        Oe(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Oe(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : s(H).state === "loading" ? (a(), c("p", Ua, "加载中…")) : s(H).state === "not_found" ? (a(), c("p", Va, "找不到城市「" + v(s(H).city) + "」，右键可重新选择地点。", 1)) : s(H).state === "error" ? (a(), c("p", Ga, v(s(H).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : s(H).state === "ready" && s(H).data ? (a(), c(U, { key: 4 }, [
        n("div", Ya, [
          n("span", qa, v(s(H).data.currentEmoji), 1),
          n("span", Xa, v(s(H).data.currentTemp) + "°", 1)
        ]),
        n("p", Ja, v(s(H).data.subText), 1),
        n("p", Qa, v(s(H).data.rainText), 1),
        n("div", Za, [
          (a(!0), c(U, null, fe(s(H).data.hours, (P, ee) => (a(), c("div", {
            key: ee,
            class: "wx-h"
          }, [
            n("span", el, v(P.time), 1),
            n("span", tl, v(P.emoji), 1),
            n("span", ol, v(P.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", nl, [
          (a(!0), c(U, null, fe(s(H).data.days, (P, ee) => (a(), c("span", { key: ee }, v(P.label) + " " + v(P.emoji) + " " + v(P.tempRange), 1))), 128))
        ])
      ], 64)) : D("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(H).forecastModalOpen,
        onClick: $
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: C[1] || (C[1] = R(() => {
          }, ["stop"]))
        }, [
          n("header", sl, [
            n("div", rl, [
              n("span", al, v(s(H).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", ll, v(s(H).city || s(H).data?.cityName || "天气预报"), 1),
                n("p", cl, v(s(H).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", dl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: C[0] || (C[0] = (P) => s(et).refresh())
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
          s(H).detailInfo ? (a(), c("div", ul, [
            n("div", pl, [
              C[7] || (C[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", fl, v(s(H).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", gl, [
              C[8] || (C[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", hl, v(s(H).detailInfo.wind || "微风"), 1)
            ]),
            n("div", ml, [
              C[9] || (C[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", vl, v(s(H).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", yl, [
              C[10] || (C[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", bl, v(s(H).detailInfo.airQuality || "良"), 1)
            ])
          ])) : D("", !0),
          n("div", wl, [
            (a(!0), c(U, null, fe(s(H).forecastDays, (P, ee) => (a(), c("div", {
              key: ee,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", kl, [
                n("span", _l, v(P.dayName), 1),
                n("span", xl, v(P.date), 1)
              ]),
              n("div", Cl, [
                n("span", $l, v(P.emoji), 1),
                n("span", Ll, v(P.condition), 1)
              ]),
              n("div", Tl, [
                P.rainProb > 0 ? (a(), c("span", Sl, "☂️ " + v(P.rainProb) + "%", 1)) : (a(), c("span", Ml, "无降水"))
              ]),
              n("div", Il, [
                n("span", Dl, v(P.lowTemp) + "°", 1),
                n("div", Al, [
                  n("div", {
                    class: "temp-range-fill",
                    style: me({
                      left: `${Math.max(0, Math.min(100, (P.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (P.highTemp - P.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", El, v(P.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, il),
      (a(), ce(ht, { to: "body" }, [
        t.value ? (a(), c("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: r,
          class: "weather-location-context-menu",
          style: me({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: C[4] || (C[4] = R(() => {
          }, ["stop"])),
          onContextmenu: C[5] || (C[5] = R(() => {
          }, ["prevent"]))
        }, [
          n("div", Pl, [
            n("div", Wl, [
              C[12] || (C[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(H).city
              }, [
                C[11] || (C[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Oe(" " + v(s(H).city || "未设置"), 1)
              ], 8, Bl)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: R(M, ["prevent"])
          }, [
            n("div", Ol, [
              C[13] || (C[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Be(n("input", {
                ref_key: "inputRef",
                ref: l,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": C[2] || (C[2] = (P) => i.value = P),
                onKeydown: Et(R(M, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Rl), [
                [eo, i.value]
              ]),
              i.value ? (a(), c("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: C[3] || (C[3] = (P) => i.value = ""),
                title: "清除输入"
              }, "✕")) : D("", !0)
            ]),
            C[14] || (C[14] = n("button", {
              type: "submit",
              class: "weather-location-submit"
            }, "确定", -1))
          ], 32),
          i.value.trim() ? (a(), c("div", Fl, [
            C[15] || (C[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            g.value.length ? (a(), c("div", Nl, [
              (a(!0), c(U, null, fe(g.value, (P) => (a(), c("button", {
                key: P.name + P.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (ee) => m(P.name)
              }, [
                n("span", jl, v(P.name), 1),
                n("span", zl, v(P.admin), 1)
              ], 8, Hl))), 128))
            ])) : (a(), c("div", Kl, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (a(), c("div", Ul, [
            C[16] || (C[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", Vl, [
              (a(), c(U, null, fe(h, (P) => n("button", {
                key: P,
                type: "button",
                class: se(["weather-quick-chip", { active: s(H).city === P }]),
                onClick: (ee) => m(P)
              }, v(P), 11, Gl)), 64))
            ])
          ]))
        ], 36)) : D("", !0)
      ]))
    ], 32));
  }
}), Ui = /* @__PURE__ */ Te(Yl, [["__scopeId", "data-v-51b21266"]]), Pn = "heroCustomMottoV1";
function ql() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Pn);
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
const Nt = ql(), z = xe({
  loaded: !1,
  customText: Nt.customText,
  history: Nt.history,
  currentIndex: Nt.customText && Nt.history.length ? Nt.history.findIndex((e) => e.text === Nt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Xl(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Jl(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Ql(e) {
  const t = (r) => String(r).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const Ze = {
  async init() {
    try {
      const e = await Xl(Pn);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= z.history.length && (z.history = t, e.customText !== void 0 && (z.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      z.loaded = !0, z.customText && z.history.length && (z.currentIndex = z.history.findIndex(
        (e) => e.text === z.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: z.customText,
      history: z.history
    };
    await Jl(Pn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = Ql(/* @__PURE__ */ new Date());
    z.customText = t;
    const r = z.history.findIndex((l) => l.text === t);
    if (r !== -1) {
      const l = z.history.splice(r, 1)[0];
      l.date = o, l.time = i, z.history.unshift(l);
    } else
      z.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    z.history.length > 50 && (z.history = z.history.slice(0, 50)), z.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    z.customText = e.text, z.currentIndex = z.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    z.customText = null, z.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = z.history.findIndex((o) => o.id === e);
    t !== -1 && (z.history.splice(t, 1), z.currentIndex === t && (z.history.length > 0 ? this.selectHistory(z.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    z.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!z.history.length) return;
    let t = z.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= z.history.length && (t = 0), this.selectHistory(z.history[t]);
  },
  openMenu(e, t) {
    z.menuPos = { x: e, y: t }, z.menuOpen = !0;
  },
  closeMenu() {
    z.menuOpen = !1;
  }
}, Zl = { class: "motto-content" }, ec = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, tc = { class: "motto-menu-header" }, oc = { class: "dim" }, nc = { class: "motto-history-list" }, ic = {
  key: 0,
  class: "motto-history-empty dim"
}, sc = ["onClick"], rc = { class: "motto-item-date" }, ac = ["title"], lc = ["onClick"], cc = /* @__PURE__ */ le({
  __name: "HeroMotto",
  setup(e) {
    const t = F(!1), o = F(""), i = F(null), r = ae(() => z.customText || he.greetingText);
    function l() {
      Ze.closeMenu(), o.value = z.customText || he.greetingText, t.value = !0, ft(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function h() {
      if (!t.value) return;
      t.value = !1;
      const f = o.value.trim();
      Ze.setCustomMotto(f), f && Ee.fetch("标语", `已更新标语: ${f}`);
    }
    function g() {
      t.value = !1;
    }
    function u(f) {
      f.key === "Enter" ? (f.preventDefault(), h()) : f.key === "Escape" && (f.preventDefault(), g());
    }
    function x(f) {
      t.value || (f.preventDefault(), f.stopPropagation(), Ze.stepHistory(f.deltaY > 0 ? 1 : -1));
    }
    function m(f) {
      f.preventDefault(), f.stopPropagation(), Ze.openMenu(f.clientX, f.clientY);
    }
    function M(f) {
      z.menuOpen && (f.target.closest(".motto-context-menu") || Ze.closeMenu());
    }
    return Ue(() => {
      Ze.init(), window.addEventListener("click", M);
    }), Wt(() => {
      window.removeEventListener("click", M);
    }), (f, p) => (a(), c(U, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: x,
        onContextmenu: m
      }, [
        t.value ? Be((a(), c("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": p[0] || (p[0] = (d) => o.value = d),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: h,
          onKeydown: u
        }, null, 544)), [
          [eo, o.value]
        ]) : (a(), c("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: me({ color: s(he).greetColor }),
          onClick: l
        }, [
          n("span", Zl, v(r.value), 1),
          s(z).history.length > 1 ? (a(), c("span", ec, "⇕")) : D("", !0)
        ], 4))
      ], 32),
      (a(), ce(ht, { to: "body" }, [
        s(z).menuOpen ? (a(), c("div", {
          key: 0,
          class: "motto-context-menu",
          style: me({ left: `${s(z).menuPos.x}px`, top: `${s(z).menuPos.y}px` }),
          onClick: p[3] || (p[3] = R(() => {
          }, ["stop"])),
          onContextmenu: p[4] || (p[4] = R(() => {
          }, ["prevent"]))
        }, [
          n("div", tc, [
            p[5] || (p[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", oc, v(s(z).history.length) + " 条记录", 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: l
          }, [...p[6] || (p[6] = [
            n("i", null, "✎", -1),
            n("span", null, "编辑当前标语", -1)
          ])]),
          p[9] || (p[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          p[10] || (p[10] = n("div", { class: "motto-history-label" }, "历史标语记录（点击切换）：", -1)),
          n("div", nc, [
            s(z).history.length ? (a(!0), c(U, { key: 1 }, fe(s(z).history, (d) => (a(), c("div", {
              key: d.id,
              class: se(["motto-history-item", { active: s(z).customText === d.text }]),
              onClick: (k) => s(Ze).selectHistory(d)
            }, [
              n("span", rc, v(d.date), 1),
              n("span", {
                class: "motto-item-text",
                title: d.text
              }, v(d.text), 9, ac),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: R((k) => s(Ze).deleteEntry(d.id), ["stop"])
              }, "×", 8, lc)
            ], 10, sc))), 128)) : (a(), c("div", ic, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          p[11] || (p[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: p[1] || (p[1] = //@ts-ignore
            (...d) => s(Ze).resetToSystem && s(Ze).resetToSystem(...d))
          }, [...p[7] || (p[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          s(z).history.length ? (a(), c("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: p[2] || (p[2] = //@ts-ignore
            (...d) => s(Ze).clearHistory && s(Ze).clearHistory(...d))
          }, [...p[8] || (p[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : D("", !0)
        ], 36)) : D("", !0)
      ]))
    ], 64));
  }
}), dc = /* @__PURE__ */ Te(cc, [["__scopeId", "data-v-0514f22a"]]), uc = /* @__PURE__ */ le({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(u) {
      return u < 5 ? "夜深了" : u < 9 ? "早上好" : u < 12 ? "上午好" : u < 14 ? "中午好" : u < 18 ? "下午好" : u < 23 ? "晚上好" : "夜深了";
    }
    function i() {
      const u = Dt.state.timezone;
      if (!u || u === "local") return /* @__PURE__ */ new Date();
      try {
        const x = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: u });
        return new Date(x);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function r() {
      const u = (T) => String(T).padStart(2, "0"), x = i(), m = x.getHours(), M = x.getMinutes(), f = x.getSeconds(), p = x.getFullYear(), d = x.getMonth() + 1, k = x.getDate(), $ = x.getDay(), b = `${u(m)}:${u(M)}`, C = `:${u(f)}`, P = o(m), ee = `${p}年${d}月${k}日 · ${t[$]}`;
      Gt.updateTime(b, C, P, ee);
    }
    function l(u) {
      u.preventDefault(), Dt.open({ clientX: u.clientX, clientY: u.clientY });
    }
    function h() {
      document.hidden ? g && (clearInterval(g), g = null) : (r(), g || (g = setInterval(r, 1e3)));
    }
    let g = null;
    return Dt.initPreferences(), r(), Ue(() => {
      Dt.initPreferences(), _t.activeId || (r(), g = setInterval(r, 1e3)), document.addEventListener("visibilitychange", h);
    }), Ke(
      () => _t.activeId,
      (u) => {
        u ? g && (clearInterval(g), g = null) : document.hidden || (r(), g || (g = setInterval(r, 1e3)));
      }
    ), Wt(() => {
      g && (clearInterval(g), g = null), document.removeEventListener("visibilitychange", h);
    }), (u, x) => (a(), c("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: me({ fontFamily: s(he).fontFamily, color: s(he).colorHex })
      }, [
        Oe(v(s(he).timeText), 1),
        n("span", {
          id: "secs",
          style: me({ color: s(he).colorHex })
        }, v(s(he).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: me({ color: s(he).dateColor })
      }, v(s(he).dateText), 5)
    ], 32));
  }
}), Vi = /* @__PURE__ */ Te(uc, [["__scopeId", "data-v-38840808"]]), pc = {
  key: 0,
  class: "home-music-degraded-box"
}, fc = { class: "degraded-badge-row" }, gc = { class: "degraded-status" }, hc = {
  key: 0,
  class: "degraded-host-tag"
}, mc = {
  key: 1,
  class: "degraded-host-tag"
}, vc = { class: "degraded-title-row" }, yc = ["title"], bc = { class: "degraded-track-artist" }, wc = { class: "degraded-progress-bar-wrap" }, kc = { class: "degraded-actions" }, _c = { class: "degraded-time" }, xc = { class: "home-vinyl-box" }, Cc = ["src"], $c = { class: "home-music-right" }, Lc = ["title"], Tc = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Sc = { class: "home-music-seek-row" }, Mc = {
  id: "home-music-cur",
  class: "home-music-time"
}, Ic = ["value"], Dc = {
  id: "home-music-dur",
  class: "home-music-time"
}, Ac = { class: "home-music-actions" }, Ec = /* @__PURE__ */ le({
  __name: "HomeMusicCard",
  setup(e) {
    Ue(() => {
      setTimeout(() => {
        Ms();
      }, 200);
    });
    const t = ae(() => Ti.visible || ot.djModalOpen || ot.isActive && ot.isJoined), o = ae(() => ot.isActive && ot.isJoined), i = ae(() => Y.mode === "shuffle" ? "🔀" : Y.mode === "one" ? "🔂" : "🔁");
    function r(h) {
      const g = h.target, u = Number(g.value);
      ze.seek(u);
    }
    function l() {
      ze.update({ coverUrl: "" });
    }
    return (h, g) => (a(), c("div", {
      id: "home-music-player-view",
      class: se(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (a(), c("div", pc, [
        n("div", fc, [
          g[7] || (g[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", gc, v(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (a(), c("span", hc, " DJ: " + v(s(ot).hostName), 1)) : (a(), c("span", mc, " 工作区就绪 "))
        ]),
        n("div", vc, [
          n("h3", {
            class: "degraded-track-title",
            title: s(Y).title
          }, v(s(Y).title || "待机中"), 9, yc),
          n("p", bc, v(s(Y).artist), 1)
        ]),
        n("div", wc, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: me({ width: s(Y).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", kc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: g[0] || (g[0] = (u) => s(ze).togglePlay())
          }, v(s(Y).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", _c, v(s(Y).formattedCurrent) + " / " + v(s(Y).formattedDuration), 1)
        ])
      ])) : (a(), c(U, { key: 1 }, [
        n("div", xc, [
          n("div", {
            id: "home-vinyl-needle",
            class: se(["home-vinyl-needle", { playing: s(Y).playing }])
          }, [...g[8] || (g[8] = [
            mo('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: se(["home-vinyl-disc", { playing: s(Y).playing }]),
            title: "点击播放 / 暂停",
            onClick: g[1] || (g[1] = (u) => s(ze).togglePlay())
          }, [
            s(Y).coverUrl ? (a(), c("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(Y).coverUrl,
              alt: "音乐封面",
              onError: l
            }, null, 40, Cc)) : D("", !0),
            g[9] || (g[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", $c, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s(Y).title
          }, v(s(Y).title), 9, Lc),
          n("p", Tc, v(s(Y).artist), 1),
          n("div", Sc, [
            n("span", Mc, v(s(Y).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(Y).progressPercent,
              onInput: r
            }, null, 40, Ic),
            n("span", Dc, v(s(Y).formattedDuration), 1)
          ]),
          n("div", Ac, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: g[2] || (g[2] = (u) => s(ze).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: g[3] || (g[3] = (u) => s(ze).togglePlay())
            }, v(s(Y).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: g[4] || (g[4] = (u) => s(ze).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: se(["home-music-btn like-btn", { liked: s(Y).liked }]),
              type: "button",
              title: "收藏",
              onClick: g[5] || (g[5] = (u) => s(ze).toggleLike())
            }, v(s(Y).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: g[6] || (g[6] = (u) => s(ze).cycleMode())
            }, v(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Gi = /* @__PURE__ */ Te(Ec, [["__scopeId", "data-v-25a69816"]]), ut = /* @__PURE__ */ new Map(), pt = /* @__PURE__ */ new Set();
function Pc(e, t) {
  for (ut.delete(e), ut.set(e, t), pt.delete(t), pt.add(t); ut.size > 512; )
    ut.delete(ut.keys().next().value);
  for (; pt.size > 512; )
    pt.delete(pt.values().next().value);
}
const Wc = {
  key: 0,
  class: "launcher-fallback"
}, Bc = ["src"], _n = "lw_resolved_icon:", Oc = /* @__PURE__ */ le({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(b) {
      try {
        return localStorage.getItem(_n + b) || "";
      } catch {
        return "";
      }
    }
    function o(b, C) {
      try {
        localStorage.setItem(_n + b, C);
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
    function l(b) {
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
    function g(b) {
      try {
        const C = window, P = typeof C.chrome < "u" ? C.chrome : globalThis.chrome;
        if (typeof P?.runtime?.getURL == "function")
          return P.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(b) + "&size=64");
      } catch {
      }
      return "";
    }
    const u = ae(() => {
      const b = r.link, C = (b.title || l(b.url)).trim();
      return C ? C.slice(0, 1).toUpperCase() : "🔗";
    }), x = F([]), m = F(0), M = F(!1), f = F(!1), p = ae(() => f.value || m.value >= x.value.length ? "" : x.value[m.value] || "");
    function d() {
      const b = r.link;
      if (!b?.url) {
        x.value = [], f.value = !0, M.value = !1;
        return;
      }
      const C = [], P = i(b.url);
      P && C.push(P);
      const ee = ut.get(b.url) || t(b.url);
      ee && !C.includes(ee) && C.push(ee);
      const T = (E) => E ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(E) : !1;
      b.customIcon && !T(b.customIcon) && C.push(b.customIcon), b.icon && !T(b.icon) && C.push(b.icon);
      const S = g(b.url);
      S && !C.includes(S) && C.push(S);
      const w = oe.getCachedIcon(b.url);
      w && !C.includes(w) && C.push(w);
      const I = h(b.url);
      I && !I.startsWith("http://1.") && !I.startsWith("http://192.") && !I.startsWith("http://127.") && C.push(`${I}/favicon.ico`), b.customIcon && !T(b.customIcon) && C.unshift(b.customIcon);
      const V = [...new Set(C.filter(Boolean))];
      x.value = V, m.value = 0, f.value = V.length === 0;
      const G = V[0];
      G && (G.startsWith("data:") || pt.has(G)) && (M.value = !0);
    }
    Ke(
      () => [r.link?.url, r.link?.icon, r.link?.customIcon],
      (b, C) => {
        C && b[0] === C[0] && b[1] === C[1] && b[2] === C[2] || d();
      },
      { immediate: !0 }
    ), Ue(() => {
      x.value.length === 0 && d();
    });
    function k(b) {
      M.value = !0, f.value = !1;
      const C = p.value;
      if (C) {
        const P = pt.has(C), ee = ut.get(r.link.url);
        Pc(r.link.url, C), ee !== C && t(r.link.url) !== C && o(r.link.url, C);
        const T = b.target;
        if (!P && !C.startsWith("data:")) {
          const S = r.link.url;
          setTimeout(() => {
            oe.cacheIcon(S, C, T?.getAttribute("src") === C ? T : null);
          }, 0);
        }
      }
    }
    function $() {
      const b = p.value;
      if (b) {
        pt.delete(b), ut.get(r.link.url) === b && ut.delete(r.link.url);
        try {
          localStorage.removeItem(_n + r.link.url), localStorage.removeItem("lw_sync_dataurl:" + r.link.url);
        } catch {
        }
      }
      if (b && oe.getCachedIcon(r.link.url) === b && oe.evictCachedIcon(r.link.url), m.value + 1 < x.value.length) {
        m.value += 1;
        const C = x.value[m.value];
        C && (C.startsWith("data:") || pt.has(C)) && (M.value = !0);
      } else
        f.value = !0, M.value = !1;
    }
    return (b, C) => (a(), c("span", {
      class: se(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      f.value || !p.value ? (a(), c("span", Wc, v(u.value), 1)) : (a(), c("img", {
        key: 1,
        src: p.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: k,
        onError: $
      }, null, 40, Bc))
    ], 2));
  }
}), Zo = /* @__PURE__ */ Te(Oc, [["__scopeId", "data-v-bc41d0d8"]]), Rc = { class: "launcher-label launcher-title" }, Fc = ["title"], Nc = {
  key: 0,
  class: "launcher-folder-more"
}, Hc = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, jc = { class: "launcher-folder-label launcher-title" }, zc = /* @__PURE__ */ le({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = ae(() => t.size === "large" ? 9 : 4), i = ae(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (r, l) => e.link ? (a(), c(U, { key: 0 }, [
      Q(Zo, { link: e.link }, null, 8, ["link"]),
      n("span", Rc, v(e.link.title), 1)
    ], 64)) : e.folder ? (a(), c(U, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (a(!0), c(U, null, fe(i.value, (h) => (a(), ce(Zo, {
          key: h.id,
          link: h,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (a(), c("span", Nc, "+" + v(e.folder.count - (o.value - 1)), 1)) : D("", !0),
        i.value.length ? D("", !0) : (a(), c("span", Hc, "📁")),
        Ci(r.$slots, "default", {}, void 0, !0)
      ], 8, Fc),
      n("span", jc, v(e.folder.title), 1)
    ], 64)) : D("", !0);
  }
}), hi = /* @__PURE__ */ Te(zc, [["__scopeId", "data-v-7f513029"]]), Kc = 5, Uc = 180;
function Vc(e, t, o) {
  const i = t - e.left, r = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && r > e.height * 0.25 && r < e.height * 0.75;
}
function Gc(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Yc = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, qc = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Xc = {
  key: 0,
  class: "muted small"
}, Jc = {
  key: 1,
  class: "notice small"
}, Qc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Zc = {
  key: 3,
  class: "aihot-home-rich-list"
}, ed = ["href", "title", "onClick"], td = { class: "aihot-home-rich-main" }, od = { class: "aihot-home-rich-title" }, nd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, id = { class: "aihot-home-rich-meta" }, sd = { class: "aihot-home-rich-meta-left" }, rd = {
  key: 0,
  class: "aihot-home-rich-tag"
}, ad = { class: "aihot-home-rich-source" }, ld = { class: "aihot-home-rich-time" }, mi = 6, cd = /* @__PURE__ */ le({
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
    function h(d) {
      return d.category ? t[d.category] || d.category : "";
    }
    function g(d) {
      const k = d.publishedAt || d.published || "";
      if (!k) return "最新";
      const $ = Number(k), b = Number.isFinite($) && $ > 0 ? new Date($ > 1e12 ? $ : $ * 1e3) : new Date(k);
      if (isNaN(b.getTime())) return String(k).slice(0, 16) || "最新";
      const C = (I) => String(I).padStart(2, "0"), P = b.getFullYear(), ee = C(b.getMonth() + 1), T = C(b.getDate()), S = C(b.getHours()), w = C(b.getMinutes());
      return `${P}-${ee}-${T} ${S}:${w}`;
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
      const k = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(k) && k.length)
        return k;
      const $ = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const b of $)
        try {
          const C = localStorage.getItem(b);
          if (C) {
            const P = JSON.parse(C);
            if (Array.isArray(P) && P.length) return P;
            if (P && Array.isArray(P.items) && P.items.length) return P.items;
          }
        } catch {
        }
      return [];
    }
    async function m(d = !1) {
      if (!d && o.value.length > 0) return;
      const k = x();
      k.length ? (o.value = k, r.value = !1) : o.value.length || (o.value = [...u], r.value = !1);
      try {
        const b = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), C = Array.isArray(b) ? b : b.items || b.data || b.results || [];
        if (C.length) {
          o.value = C, i.value = 0, l.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(C.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...u]);
      } finally {
        r.value = !1;
      }
    }
    function M() {
      if (!o.value.length) {
        r.value = !0, m(!0);
        return;
      }
      i.value += mi, i.value >= o.value.length && (i.value = 0);
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
    function p(d, k) {
      if (k.ctrlKey || k.metaKey || k.shiftKey || k.button === 1) return;
      k.preventDefault();
      const $ = d.links?.original || d.links?.aihot || d.url || "#";
      Fn.openArticle(
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
    return Ue(() => {
      m();
    }), (d, k) => (a(), c("section", Yc, [
      n("header", { class: "card-head aihot-home-head" }, [
        k[0] || (k[0] = n("span", { class: "bar cyan" }, null, -1)),
        k[1] || (k[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        k[2] || (k[2] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: M
        }, " 换一批 ↻ "),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: f
        }, " 热榜 ↗ ")
      ]),
      n("div", qc, [
        r.value && !o.value.length ? (a(), c("p", Xc, "正在加载精选资讯…")) : l.value && !o.value.length ? (a(), c("p", Jc, v(l.value), 1)) : o.value.length ? (a(), c("div", Zc, [
          (a(!0), c(U, null, fe(o.value.slice(i.value, i.value + mi), ($, b) => (a(), c("a", {
            key: $.id || $.title,
            class: "aihot-home-rich-card",
            href: $.links?.original || $.links?.aihot || $.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${$.title}
${$.summary || ""}
点击在阅读器中查看`,
            onClick: (C) => p($, C)
          }, [
            n("span", {
              class: se(["aihot-home-rich-rank", { top: i.value + b < 3 }])
            }, v(i.value + b + 1), 3),
            n("div", td, [
              n("h3", od, v($.title), 1),
              $.summary ? (a(), c("p", nd, v($.summary), 1)) : D("", !0),
              n("div", id, [
                n("div", sd, [
                  h($) ? (a(), c("span", rd, v(h($)), 1)) : D("", !0),
                  n("span", ad, v($.source?.name || $.sourceName || "AI HOT"), 1)
                ]),
                n("time", ld, v(g($)), 1)
              ])
            ])
          ], 8, ed))), 128))
        ])) : (a(), c("p", Qc, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), dd = /* @__PURE__ */ Te(cd, [["__scopeId", "data-v-cc4398a8"]]), ud = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, pd = ["disabled", "aria-pressed"], fd = ["disabled", "aria-pressed"], gd = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, hd = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], md = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, vd = ["data-page"], yd = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], bd = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], wd = ["title", "onClick"], kd = {
  class: "launcher-folder-count",
  hidden: ""
}, _d = {
  class: "launcher-empty",
  key: "empty-msg"
}, xd = {
  key: 1,
  class: "launcher-media-stack"
}, Cd = {
  key: 1,
  id: "launcher-bili"
}, $d = { class: "launcher-folder-preview" }, Ld = { class: "launcher-folder-label launcher-title" }, Td = { class: "launcher-label launcher-title" }, Sd = /* @__PURE__ */ le({
  __name: "FavoriteSites",
  setup(e) {
    const t = K(() => import("./BookmarkBoard-j3fpbgCZ.js")), o = F("sites"), i = F(!1);
    function r() {
      Ce(), M = !1, E = !1;
    }
    Ue(() => {
      $e.setExternalDragHandler(P), $e.setExternalDropHandler(ee), window.addEventListener("blur", r), window.addEventListener("pagehide", r), document.addEventListener("visibilitychange", r);
      const y = window;
      re.hasBili && typeof y.ensureLauncherMediaCards == "function" && y.ensureLauncherMediaCards();
    });
    const l = F(!1), h = F(""), g = F(null), u = F(null), x = F(null), m = F(null);
    let M = !1, f = 0, p = 0, d = 0, k = "", $ = 0, b = "", C = 0;
    function P(y) {
      if (o.value !== "sites") return;
      if (!y || qe.isOpen) {
        m.value && (m.value = null), b = "";
        return;
      }
      const _ = document.elementsFromPoint(y.clientX, y.clientY);
      if (!_.some(
        (Pe) => Pe.classList.contains("launcher-site-items") || !!Pe.closest?.(".launcher-site-items")
      )) {
        m.value && (m.value = null), b = "";
        return;
      }
      const A = _.find((Pe) => Pe.classList.contains("launcher-link") && Pe.getAttribute("data-launcher-id") !== String(y.link.id) || Pe.classList.contains("launcher-folder"));
      if (!A) return;
      const J = A.classList.contains("launcher-link"), ge = J ? A.getAttribute("data-launcher-id") : null, De = J ? null : A.getAttribute("data-launcher-folder"), te = J ? `link-${ge}` : `folder-${De}`, ie = A.getBoundingClientRect(), Re = ie.left + ie.width / 2, sn = ie.top + ie.height / 2, so = Math.hypot(y.clientX - Re, y.clientY - sn), Bt = Date.now();
      if (so > Math.max(ie.width, ie.height) * 0.55 || te === b && Bt - C < 180) return;
      const Ot = tt.value.filter(
        (Pe) => Pe.type !== "link" || String(Pe.link.id) !== String(y.link.id)
      ), it = [...m.value || Ot], mt = it.findIndex(
        (Pe) => Pe.type === "link" && String(Pe.link.id) === String(y.link.id)
      ), vt = it.findIndex((Pe) => Pe.key === te);
      if (vt < 0) return;
      const Je = {
        key: `link-${y.link.id}`,
        type: "link",
        link: y.link
      };
      mt >= 0 ? mt !== vt && (it.splice(mt, 1), it.splice(vt, 0, Je), m.value = it, b = te, C = Bt) : (it.splice(vt, 0, Je), m.value = it, b = te, C = Bt);
    }
    async function ee(y) {
      if (o.value !== "sites" || qe.isOpen) return !1;
      if (m.value) {
        const _ = m.value.map((L) => ({
          type: L.type,
          id: L.type === "link" ? String(L.link.id) : void 0,
          groupName: L.type === "folder" ? L.folder.groupName : void 0
        }));
        return await oe.moveLinkTo(String(y.id), re.activePage, "常用网站"), await oe.reorderPageItems(re.activePage, _), m.value = null, b = "", !0;
      }
      return !1;
    }
    const T = xe({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let S = null, w = 0, I = 0, V = null, G = null, E = !1;
    function j(y, _) {
      if (_.button !== 0) return;
      S = _.pointerId, w = _.clientX, I = _.clientY, p = _.clientX, d = _.clientY, V = String(y.id), G = null, E = !1;
      const L = _.currentTarget.getBoundingClientRect();
      T.offsetX = _.clientX - L.left, T.offsetY = _.clientY - L.top, T.type = "link", T.link = y, T.folder = null, window.addEventListener("pointermove", W, { passive: !1 }), window.addEventListener("pointerup", ue), window.addEventListener("pointercancel", ue);
    }
    function O(y, _, L) {
      if (L.button !== 0 || L.target.closest(".launcher-folder-del-btn")) return;
      S = L.pointerId, w = L.clientX, I = L.clientY, p = L.clientX, d = L.clientY, V = null, G = y, E = !1;
      const A = L.currentTarget.getBoundingClientRect();
      T.offsetX = L.clientX - A.left, T.offsetY = L.clientY - A.top, T.type = "folder", T.folder = {
        groupName: y,
        size: Ne(y),
        links: _?.links || []
      }, T.link = null, window.addEventListener("pointermove", W, { passive: !1 }), window.addEventListener("pointerup", ue), window.addEventListener("pointercancel", ue);
    }
    let q = 0, ve = null;
    function B() {
      cancelAnimationFrame(q), q = 0, ve = null;
    }
    function W(y) {
      y.pointerId === S && (E && y.cancelable && y.preventDefault(), ve = y, !q && (q = requestAnimationFrame(() => {
        q = 0;
        const _ = ve;
        ve = null, _ && N(_);
      })));
    }
    function N(y) {
      if (y.pointerId !== S || !V && !G) return;
      const _ = Math.hypot(y.clientX - w, y.clientY - I);
      if (!E && _ > Kc && (E = !0, M = !0, V ? u.value = V : G && (x.value = G)), !E) return;
      (T.link || T.folder) && (T.visible = !0, T.x = y.clientX - T.offsetX, T.y = y.clientY - T.offsetY);
      const L = document.elementsFromPoint(y.clientX, y.clientY);
      if (Vn()) {
        const te = L.some(
          (Re) => Re.id === "launcher-folder-dialog" || !!Re.closest?.("#launcher-folder-dialog")
        ), ie = document.querySelector("#launcher-folder-dialog");
        if (te && ie) {
          ie.classList.add("drop-hover-valid"), qe.dropHoverValid = !0;
          return;
        } else
          ie?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1;
        m.value = null;
        return;
      }
      const J = m.value || tt.value, ge = V ? `link-${V}` : `folder-${G}`;
      if (J.length) {
        const te = L.find((ie) => {
          if (ie.classList.contains("launcher-link")) {
            const Re = ie.getAttribute("data-launcher-id");
            return Re && `link-${Re}` !== ge;
          }
          if (ie.classList.contains("launcher-folder")) {
            const Re = ie.getAttribute("data-launcher-folder");
            return Re && `folder-${Re}` !== ge;
          }
          return !1;
        });
        if (te) {
          const ie = te.classList.contains("launcher-link"), Re = ie ? te.getAttribute("data-launcher-id") : null, sn = ie ? null : te.getAttribute("data-launcher-folder"), so = ie ? `link-${Re}` : `folder-${sn}`, Bt = te.getBoundingClientRect();
          let Ot = !0;
          V && !ie && (Vc(Bt, y.clientX, y.clientY) ? (Ot = !1, te.classList.add("drop-target")) : te.classList.remove("drop-target"));
          const it = Date.now();
          if (Gc(Bt, y.clientX, y.clientY) || (Ot = !1), so === k && it - $ < Uc && (Ot = !1), Ot) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Je) => Je.classList.remove("drop-target"));
            const mt = J.findIndex((Je) => Je.key === ge), vt = J.findIndex((Je) => Je.key === so);
            if (mt >= 0 && vt >= 0 && mt !== vt) {
              const Je = J.slice(), Pe = Je.splice(mt, 1)[0];
              Je.splice(vt, 0, Pe), m.value = Je, k = so, $ = it;
            }
          }
        }
      }
      const De = L.find((te) => te.classList.contains("launcher-page-tab"));
      if (De) {
        const te = De.getAttribute("data-page");
        te && te !== re.activePage && De.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((te) => te.classList.remove("drop-target"));
    }
    async function ue(y) {
      if (y.pointerId === S) {
        B(), y.type === "pointercancel" ? Ce() : N(y), window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", ue);
        try {
          if (E) {
            f = Date.now(), M = !1;
            const _ = document.elementsFromPoint(y.clientX, y.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((A) => A.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((A) => A.classList.remove("drop-target")), Vn() && qe.activeFolder) {
              if (_.some(
                (J) => J.id === "launcher-folder-dialog" || !!J.closest?.("#launcher-folder-dialog")
              )) {
                const ge = _.find((De) => De.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || qe.activeFolder;
                V ? await oe.moveLinkTo(V, void 0, ge) : G && await oe.moveFolderInto(G, ge);
              }
              return;
            }
            const L = _.find((A) => A.classList.contains("launcher-page-tab"));
            if (L) {
              const A = L.getAttribute("data-page");
              if (A) {
                V ? (await oe.moveLinkTo(V, A, "常用网站"), await oe.setPage(A)) : G && await oe.moveFolderToPage(G, A), Ce();
                return;
              }
            }
            if (V) {
              const A = _.find((J) => J.classList.contains("launcher-folder"));
              if (A) {
                const J = A.getAttribute("data-launcher-folder");
                if (J) {
                  await oe.moveLinkTo(V, re.activePage, J), Ce();
                  return;
                }
              }
            }
            if (m.value) {
              const A = m.value.map((J) => ({
                type: J.type,
                id: J.type === "link" ? String(J.link.id) : void 0,
                groupName: J.type === "folder" ? J.folder.groupName : void 0
              }));
              await oe.reorderPageItems(re.activePage, A);
            }
          }
        } catch (_) {
          Ee.show({ appName: "常用网站", title: "移动未完成", message: _ instanceof Error ? _.message : "请刷新核对，未自动重试。" });
        } finally {
          Ce();
        }
      }
    }
    function Ce() {
      B(), S = null, V = null, G = null, E = !1, M = !1, u.value = null, x.value = null, m.value = null, T.visible = !1, T.link = null, T.folder = null, k = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1, window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", ue);
    }
    Wt(() => {
      $e.setExternalDragHandler(null), $e.setExternalDropHandler(null), Ce(), window.removeEventListener("blur", r), window.removeEventListener("pagehide", r), document.removeEventListener("visibilitychange", r), window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", ue);
    });
    function Fe(y) {
      const _ = re.pageLabels;
      return _ && _[y] ? _[y] : y || "常用网站";
    }
    function we(y, _) {
      const L = String(y.page || "").trim(), A = String(_).trim(), J = re.pageLabels || {}, ge = !L || L === "常用网站" || L === "默认";
      if (!A || A === "常用网站" || A === "默认") return ge;
      if (ge) return !1;
      if (L === A) return !0;
      const te = J[L] || L, ie = J[A] || A;
      return te === ie || L === ie || te === A;
    }
    function Ne(y) {
      const _ = re.groupSizes;
      return _ && _[y] === "large" ? "large" : "small";
    }
    function Ve(y) {
      return y === "large" ? 9 : 4;
    }
    function st(y, _) {
      const L = Ve(_), A = y.length > L ? L - 1 : L;
      return y.slice(0, A);
    }
    const tt = ae(() => {
      const y = re.activePage || "常用网站", L = re.links.filter(
        (te) => we(te, y)
      ), A = /* @__PURE__ */ new Map();
      L.forEach((te) => {
        const ie = te.group || "常用网站";
        ie !== "常用网站" && (A.has(ie) || A.set(ie, []), A.get(ie).push(te));
      });
      const J = /* @__PURE__ */ new Set(), ge = [];
      L.forEach((te) => {
        const ie = te.group || "常用网站";
        Yo(re.folders, ie) || (ie === "常用网站" ? ge.push({ key: `link-${te.id}`, type: "link", link: te }) : J.has(ie) || (J.add(ie), ge.push({
          key: `folder-${ie}`,
          type: "folder",
          folder: {
            groupName: ie,
            pageName: y,
            links: A.get(ie) || []
          }
        })));
      });
      const De = re.folders;
      return De && Object.entries(De).forEach(([te, ie]) => {
        if (Yo(re.folders, te)) return;
        const Re = ie?.page || "常用网站";
        (Re === y || y === "常用网站" && Re === "默认") && !J.has(te) && (J.add(te), ge.push({
          key: `folder-${te}`,
          type: "folder",
          folder: {
            groupName: te,
            pageName: y,
            links: A.get(te) || []
          }
        }));
      }), ge;
    }), He = ae(() => m.value && m.value.length ? m.value : tt.value), Ji = ae(() => {
      const y = re.activePage || "常用网站", _ = Fe(y);
      return _ === "默认" || y === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${_}”还是空的，把网站拖到这里。`;
    });
    function Kn(y) {
      m.value = null, u.value = null, x.value = null, $e.switchPage(y);
    }
    function Qi() {
      l.value = !0, h.value = "", ft(() => {
        g.value?.focus();
      });
    }
    function Un() {
      if (!l.value) return;
      const y = h.value.trim();
      l.value = !1, y && $e.addPage(y);
    }
    function Zi(y) {
      y.key === "Enter" ? (y.preventDefault(), Un()) : y.key === "Escape" && (l.value = !1);
    }
    function es(y, _) {
      $e.openPageMenu(y, _);
    }
    function ts(y) {
      const _ = y.target;
      if (!_ || _.closest(".launcher-link") || _.closest(".launcher-folder") || _.closest(".launcher-page-tab") || _.closest("button") || _.closest("input"))
        return;
      y.preventDefault();
      const L = re.activePage || "常用网站";
      Qt.openBlankMenu(L, y.clientX, y.clientY);
    }
    function os(y) {
      o.value === "sites" && (!y.shiftKey || re.pages.length < 2 || (y.preventDefault(), y.deltaY > 0 || y.deltaX > 0 ? $e.nextPage() : $e.prevPage()));
    }
    function ns(y) {
      y.target.closest(".launcher-page-tab") || y.stopPropagation();
    }
    function is(y) {
      y.button === 0 && (p = y.clientX, d = y.clientY);
    }
    function ss(y, _) {
      _.preventDefault(), _.stopPropagation(), S || (M = !1), !(Math.hypot(_.clientX - p, _.clientY - d) >= 6 || M || Date.now() - f < 600) && $e.openLink(y, _);
    }
    function rs(y, _) {
      $e.openLinkMenu(y, _);
    }
    function as(y, _) {
      if (S || (M = !1), M || Date.now() - f < 450) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      $e.openFolder(y, _);
    }
    function ls(y, _, L) {
      $e.openFolderMenu(y, _, L);
    }
    function cs(y) {
      $e.deleteFolder(y);
    }
    function ds(y, _) {
      const L = Array.from(_.dataTransfer?.types || []);
      if (!L.includes("application/x-newtab-launcher") && !L.includes("application/x-newtab-bookmark") && !L.includes("text/uri-list") && !L.includes("text/plain")) return;
      _.preventDefault(), _.dataTransfer && (_.dataTransfer.dropEffect = "move"), re.activePage !== y && Kn(y), _.currentTarget?.classList.add("drop-target");
    }
    function us(y) {
      y.currentTarget?.classList.remove("drop-target");
    }
    async function ps(y, _) {
      _.currentTarget?.classList.remove("drop-target");
      let A = "";
      const J = _.dataTransfer?.getData("application/x-newtab-launcher");
      if (J)
        try {
          A = String(JSON.parse(J)?.id || "");
        } catch {
        }
      if (!A && (u.value || window.__activeLauncherLink) && (A = String(window.__activeLauncherLink?.id || u.value || "")), A) {
        _.preventDefault(), _.stopPropagation(), await oe.moveLinkTo(A, y, "常用网站"), await oe.setPage(y);
        return;
      }
      const ge = window;
      typeof ge.importDroppedLauncherItem == "function" && (_.preventDefault(), _.stopPropagation(), await ge.importDroppedLauncherItem(_, "常用网站", y));
    }
    function fs(y) {
      const _ = Array.from(y.dataTransfer?.types || []);
      if (!_.includes("application/x-newtab-launcher") && !_.includes("application/x-newtab-bookmark") && !_.includes("text/uri-list") && !_.includes("text/plain")) return;
      y.preventDefault(), y.dataTransfer && (y.dataTransfer.dropEffect = _.includes("application/x-newtab-launcher") ? "move" : "copy"), y.currentTarget?.classList.add("drop-target");
    }
    function gs(y) {
      const _ = y.currentTarget;
      _?.contains(y.relatedTarget) || _?.classList.remove("drop-target");
    }
    async function hs(y) {
      y.currentTarget?.classList.remove("drop-target");
      let L = "";
      const A = y.dataTransfer?.getData("application/x-newtab-launcher");
      if (A)
        try {
          L = String(JSON.parse(A)?.id || "");
        } catch {
        }
      if (!L && (u.value || window.__activeLauncherLink) && (L = String(window.__activeLauncherLink?.id || u.value || "")), L) {
        y.preventDefault(), y.stopPropagation(), await oe.moveLinkTo(L, re.activePage, "常用网站");
        return;
      }
      const J = window;
      if (typeof J.importDroppedLauncherItem == "function") {
        y.preventDefault(), y.stopPropagation(), await J.importDroppedLauncherItem(y, "常用网站", re.activePage);
        return;
      }
      const ge = y.dataTransfer?.getData("text/plain");
      ge && /^https?:\/\//i.test(ge.trim()) && (y.preventDefault(), y.stopPropagation(), await oe.addLink({
        title: "",
        url: ge.trim(),
        page: re.activePage
      }));
    }
    function Vn() {
      if (!qe.isOpen) return !1;
      if (typeof document < "u") {
        const y = document.querySelector("#launcher-folder-dialog");
        return !!(y && y.open);
      }
      return !1;
    }
    function ms(y, _) {
      _.preventDefault();
    }
    function vs(y) {
      y.preventDefault(), y.dataTransfer && (y.dataTransfer.dropEffect = "move"), y.currentTarget?.classList.add("drop-target");
    }
    function ys(y) {
      y.currentTarget?.classList.remove("drop-target");
    }
    async function bs(y, _) {
      _.currentTarget?.classList.remove("drop-target"), _.preventDefault(), _.stopPropagation();
      const A = _.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (A && A !== y) {
        try {
          await oe.moveFolderInto(A, y);
        } catch (De) {
          Ee.show({ appName: "常用网站", title: "移动未完成", message: De instanceof Error ? De.message : "请刷新后核对。" });
        }
        return;
      }
      let J = "";
      const ge = _.dataTransfer?.getData("application/x-newtab-launcher");
      if (ge)
        try {
          J = String(JSON.parse(ge)?.id || "");
        } catch {
        }
      !J && (u.value || window.__activeLauncherLink) && (J = String(window.__activeLauncherLink?.id || u.value || "")), J && await oe.moveLinkTo(J, re.activePage, y);
    }
    return (y, _) => (a(), c(U, null, [
      s(re).showSites ? (a(), c("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: os
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: _[5] || (_[5] = R(() => {
          }, ["stop"])),
          onContextmenu: ns
        }, [
          n("div", ud, [
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "sites",
              onClick: _[0] || (_[0] = (L) => o.value = "sites")
            }, "常用网站", 8, pd),
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "bookmarks",
              onClick: _[1] || (_[1] = (L) => o.value = "bookmarks")
            }, "书签", 8, fd)
          ]),
          Be(n("div", gd, [
            (a(!0), c(U, null, fe(s(re).pages, (L) => (a(), c("button", {
              key: L,
              type: "button",
              class: se(["launcher-page-tab", { active: L === s(re).activePage }]),
              "data-page": L,
              role: "tab",
              title: `切换到${Fe(L)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: _[2] || (_[2] = R(() => {
              }, ["stop"])),
              onClick: R((A) => Kn(L), ["prevent", "stop"]),
              onContextmenu: R((A) => es(L, A), ["prevent", "stop"]),
              onDragover: (A) => ds(L, A),
              onDragleave: _[3] || (_[3] = (A) => us(A)),
              onDrop: (A) => ps(L, A)
            }, v(Fe(L)), 43, hd))), 128)),
            l.value ? Be((a(), c("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: g,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": _[4] || (_[4] = (L) => h.value = L),
              onKeydown: Zi,
              onBlur: Un
            }, null, 544)), [
              [eo, h.value]
            ]) : (a(), c("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Qi
            }, " + "))
          ], 512), [
            [to, o.value === "sites"]
          ]),
          o.value === "bookmarks" ? (a(), c("div", md)) : D("", !0)
        ], 32),
        o.value === "bookmarks" ? (a(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: _[6] || (_[6] = (L) => i.value = L)
        })) : D("", !0),
        Be(n("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: ts,
          onDragover: _[12] || (_[12] = (L) => fs(L)),
          onDragleave: _[13] || (_[13] = (L) => gs(L)),
          onDrop: _[14] || (_[14] = (L) => hs(L))
        }, [
          (a(), ce(Vo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: u.value || x.value ? "launcher-grid" : ""
          }, {
            default: Zt(() => [
              (a(!0), c(U, null, fe(He.value, (L) => (a(), c(U, {
                key: L.key
              }, [
                L.type === "link" ? (a(), c("a", {
                  key: L.key,
                  class: se(["launcher-link", {
                    "is-dragging": u.value === String(L.link.id)
                  }]),
                  href: L.link.url,
                  title: L.link.title + (L.link.note ? `
📝 ` + L.link.note : "") + `
🔗 ` + L.link.url,
                  "data-launcher-id": String(L.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: _[7] || (_[7] = R(() => {
                  }, ["prevent"])),
                  onPointerdown: (A) => j(L.link, A),
                  onMousedown: _[8] || (_[8] = (A) => is(A)),
                  onClick: R((A) => ss(L.link, A), ["prevent"]),
                  onContextmenu: R((A) => rs(L.link, A), ["prevent"])
                }, [
                  Q(hi, {
                    link: L.link
                  }, null, 8, ["link"])
                ], 42, yd)) : L.type === "folder" ? (a(), c("div", {
                  key: L.key,
                  class: se(["launcher-folder", [
                    `size-${Ne(L.folder.groupName)}`,
                    { "is-dragging": x.value === L.folder.groupName }
                  ]]),
                  title: `${L.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(L.folder.groupName),
                  draggable: "true",
                  onPointerdown: (A) => O(L.folder.groupName, L.folder, A),
                  onDragstart: (A) => ms(L.folder.groupName, A),
                  onDragover: _[10] || (_[10] = (A) => vs(A)),
                  onDragleave: _[11] || (_[11] = (A) => ys(A)),
                  onDrop: (A) => bs(L.folder.groupName, A),
                  onClick: (A) => as(L.folder.groupName, A),
                  onContextmenu: R((A) => ls(L.folder.groupName, L.folder.pageName, A), ["prevent"])
                }, [
                  Q(hi, {
                    folder: { title: L.folder.groupName, preview: L.folder.links, count: L.folder.links.length },
                    size: Ne(L.folder.groupName)
                  }, {
                    default: Zt(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${L.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: _[9] || (_[9] = R(() => {
                        }, ["stop"])),
                        onClick: R((A) => cs(L.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, wd)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", kd, v(L.folder.links.length), 1)
                ], 42, bd)) : D("", !0)
              ], 64))), 128)),
              He.value.length ? D("", !0) : (a(), c("p", _d, v(Ji.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, vd), [
          [to, o.value === "sites"]
        ])
      ], 32)) : D("", !0),
      s(re).hasTodo || s(re).hasBili ? (a(), c("div", xd, [
        s(re).hasTodo ? (a(), ce(dd, { key: 0 })) : s(re).hasBili ? (a(), c("div", Cd)) : D("", !0)
      ])) : D("", !0),
      (a(), ce(ht, { to: "body" }, [
        T.visible ? (a(), c("div", {
          key: 0,
          class: se(["launcher-drag-ghost", [
            T.type === "folder" ? `folder-ghost size-${T.folder?.size}` : "link-ghost"
          ]]),
          style: me({
            left: `${T.x}px`,
            top: `${T.y}px`
          })
        }, [
          T.type === "folder" && T.folder ? (a(), c(U, { key: 0 }, [
            n("div", $d, [
              (a(!0), c(U, null, fe(st(T.folder.links, T.folder.size), (L, A) => (a(), ce(Zo, {
                key: L.id || A,
                link: L,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Ld, v(T.folder.groupName), 1)
          ], 64)) : T.link ? (a(), c(U, { key: 1 }, [
            Q(Zo, {
              link: T.link
            }, null, 8, ["link"]),
            n("span", Td, v(T.link.title), 1)
          ], 64)) : D("", !0)
        ], 6)) : D("", !0)
      ]))
    ], 64));
  }
}), Yi = /* @__PURE__ */ Te(Sd, [["__scopeId", "data-v-d859c57a"]]), Uo = Object.keys(io);
let Fo = !1, xn = 0, ho, Cn;
function vi(e) {
  for (const t of Uo)
    Object.prototype.hasOwnProperty.call(e, t) && (io[t] = e[t] !== !1);
}
function Md() {
  const e = io;
  $e.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || en.close();
}
const yi = {
  start() {
    if (Fo) return;
    Fo = !0;
    const e = ++xn;
    Cn = Ke(() => Uo.map((o) => io[o]), Md, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    ho = (o, i) => {
      if (i !== "local") return;
      const r = {};
      for (const l of Uo) o[l] && (r[l] = o[l].newValue);
      vi(r);
    }, t?.storage?.onChanged?.addListener(ho), t?.storage?.local && t.storage.local.get(Uo).then((o) => {
      Fo && xn === e && vi(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Fo = !1, xn++, Cn?.(), Cn = void 0, ho && globalThis.chrome?.storage?.onChanged?.removeListener(ho), ho = void 0;
  }
}, Id = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Dd = { class: "launcher-inner" }, Ad = { class: "launcher-overview" }, Ed = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, Pd = { id: "weather-body" }, Wd = { class: "launcher-center" }, Bd = {
  class: "hero-clock",
  id: "hero-clock"
}, Od = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Rd = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Fd = /* @__PURE__ */ le({
  __name: "AppLauncher",
  setup(e) {
    Ue(() => {
      Go.initWallpaper();
    });
    function t() {
      Se.handleToolClick("music");
    }
    return (o, i) => (a(), c("section", Id, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Dd, [
        n("div", Ad, [
          Be(n("section", Ed, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", Pd, [
              Q(Ui)
            ])
          ], 512), [
            [to, s(io).showWeather]
          ]),
          n("div", Wd, [
            n("div", Bd, [
              Q(dc),
              Q(Vi)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = R(() => {
              }, ["prevent"]))
            }, [
              Q(_i)
            ], 32)
          ]),
          n("section", Od, [
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
            n("div", Rd, [
              Q(Gi)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: se(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          Q(Yi)
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
}), Jt = xe(/* @__PURE__ */ new Set()), Lt = xe({}), Ye = xe({});
function $n(e) {
  const t = Xe(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Ee.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Ie = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Xe(e);
    return t ? t.lifecycle.isVisible() : cn(e) ? !!er[e] : tr(e);
  },
  // 标记应用启动
  markRunning(e) {
    Jt.add(e), (e in Ye || Xe(e)) && (Ye[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Lt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Xe(e);
    if (t) {
      Se.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), cn(e)) {
      Jn.open(e);
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
    if (cn(e)) {
      Jn.close(e);
      return;
    }
    Se.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Xe(e)) {
      const r = $n(e);
      if (!r.ok) return r;
      const l = Xe(e)?.lifecycle.beforeQuit;
      if (l) {
        const u = Ct(e);
        try {
          await l();
        } catch {
          const m = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Ee.show({ appName: Xe(e).title, title: "未退出", message: m, showActions: !1 }), { ok: !1, error: m };
        }
        if (Ct(e) !== u) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const x = $n(e);
        if (!x.ok) return x;
      }
      const h = Se.close(e), g = Ct(e);
      return Jt.delete(e), Ye[e] = !1, ct.removeActiveTool(e), await h, await ft(), Ct(e) === g ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), Jt.delete(e), ct.removeActiveTool(e), e in Ye && (Ye[e] = !1);
    const t = Zs;
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
      const o = $n(e);
      if (!o.ok) return o;
      const i = Se.close(e), r = Ct(e);
      return await i, Ct(e) !== r ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Ye[e] = !1, await ft(), Ct(e) !== r ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Lt[e] = (Lt[e] || 0) + 1, Se.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in Ye ? (Ye[e] = !1, await ft(), Lt[e] = (Lt[e] || 0) + 1, Ye[e] = !0) : Lt[e] = (Lt[e] || 0) + 1, await ft(), this.openApp(e);
  }
}, Ht = /* @__PURE__ */ le({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Xe(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Ie.markRunning(i.id), Ke(i.lifecycle.isVisible, (x) => {
      x && Ie.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const r = ae(() => !!Ye[i.id]);
    function l() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (_t.activeId === i.id || _t.activeId === i.rootId) && (_t.activeId = null), Ie.hideApp(i.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function h() {
      Ie.reloadApp(i.id);
    }
    function g() {
      typeof window < "u" && window.location.reload();
    }
    const u = K({
      loader: i.loadView,
      onError(x, m, M, f) {
        f <= 2 ? m() : M();
      },
      errorComponent: le({
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
    }), (x, m) => r.value ? (a(), ce($i(s(u)), {
      key: s(Ie).getRenderKey(s(i).id)
    })) : D("", !0);
  }
}), Nd = { class: "logicweaver-workspaces-layer" }, Hd = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, jd = { id: "vue-todoist-root" }, zd = { id: "vue-bili-favorites-root" }, Kd = { id: "vue-youtube-root" }, Ud = { id: "vue-pricing-root" }, Vd = { id: "vue-aihot-root" }, Gd = /* @__PURE__ */ le({
  __name: "AppWorkspaces",
  setup(e) {
    const t = F(!!_t.activeId);
    return Ue(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (a(), c("div", Nd, [
      t.value ? (a(), c("main", Hd, [
        n("div", jd, [
          Q(Ht, { id: "todoist" })
        ]),
        n("div", zd, [
          Q(Ht, { id: "daily-bilibili" })
        ]),
        Be(n("div", Kd, [
          Q(Ht, { id: "daily-youtube" })
        ], 512), [
          [to, s(io).showYouTube]
        ]),
        n("div", Ud, [
          Q(Ht, { id: "daily-pricing" })
        ]),
        n("div", Vd, [
          Q(Ht, { id: "daily-aihot" })
        ]),
        Q(Ht, { id: "card-github" })
      ])) : D("", !0)
    ]));
  }
}), Yd = ["aria-label"], qd = { class: "dock-menu-head" }, Xd = { class: "dock-menu-title" }, Jd = ["src", "alt"], Qd = {
  key: 1,
  class: "dock-menu-emoji"
}, Zd = /* @__PURE__ */ le({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, r = ae(() => !o.target || o.target.type !== "tool" ? !1 : Ie.isRunning(o.target.id)), l = ae(() => !o.target || o.target.type !== "tool" ? !1 : Ie.isVisible(o.target.id)), { menuRef: h, style: g } = Di({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Kt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function u() {
      o.target && (Ie.openApp(o.target.id), i("close"));
    }
    function x() {
      o.target && (Ie.hideApp(o.target.id), i("close"));
    }
    async function m() {
      o.target && (await Ie.reloadApp(o.target.id), i("close"));
    }
    async function M() {
      if (!o.target) return;
      const d = o.target;
      if ((await Ie.quitApp(d.id))?.ok === !1) {
        i("close");
        return;
      }
      Ee.show({
        appName: d.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: d.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function f() {
      if (!o.target) return;
      const d = o.target, k = $o.uninstall(d.id);
      i("close"), await k || Ee.show({
        appName: d.title,
        title: "入口停用未确认",
        subtitle: $o.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: d.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function p() {
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
    return (d, k) => (a(), ce(ht, { to: "body" }, [
      e.target ? (a(), c("div", {
        key: 0,
        ref_key: "menuRef",
        ref: h,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: me(s(g)),
        onClick: k[1] || (k[1] = R(() => {
        }, ["stop"])),
        onContextmenu: k[2] || (k[2] = R(() => {
        }, ["prevent"]))
      }, [
        n("div", qd, [
          n("div", Xd, [
            e.target.icon ? (a(), c("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Jd)) : e.target.emoji ? (a(), c("span", Qd, v(e.target.emoji), 1)) : D("", !0),
            n("strong", null, v(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (a(), c("span", {
            key: 0,
            class: se(["dock-status-tag", { "is-running": r.value }])
          }, [
            k[3] || (k[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Oe(" " + v(r.value ? "运行中" : "未启动"), 1)
          ], 2)) : D("", !0)
        ]),
        k[12] || (k[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (a(), c(U, { key: 0 }, [
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
            onClick: u
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
            onClick: M
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
          onClick: p
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
      ], 44, Yd)) : D("", !0)
    ]));
  }
}), eu = /* @__PURE__ */ Te(Zd, [["__scopeId", "data-v-3aa85877"]]), tu = { class: "mac-dock-shelf" }, ou = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], nu = ["src", "alt"], iu = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, su = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], ru = ["src", "alt"], au = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, lu = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, cu = {
  key: 3,
  class: "mac-dock-badge"
}, du = ["src"], uu = {
  key: 1,
  class: "mac-dock-emoji"
}, pu = /* @__PURE__ */ le({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Kt), o = F(null), i = ae(() => Object.fromEntries(Kt.tools.map((E) => {
      const j = Xe(E.id)?.badgeCount?.() || 0;
      return [E.id, Number.isFinite(j) ? Math.max(0, Math.floor(j)) : 0];
    })));
    function r(E) {
      E.stopPropagation(), o.value = null, M(E.currentTarget), $o.open();
    }
    function l(E, j) {
      j.stopPropagation(), o.value = null, M(j.currentTarget), ct.triggerItem("target", E);
    }
    function h(E, j) {
      const q = j.currentTarget.getBoundingClientRect(), ve = Kt.position, B = ve === "left" || ve === "right";
      o.value = {
        type: "card",
        id: E.id,
        title: E.title,
        icon: E.icon,
        x: B ? ve === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: B ? q.top + q.height / 2 : ve === "top" ? q.bottom + 8 : q.top
      };
    }
    function g(E) {
      E.stopPropagation(), o.value = null, M(E.currentTarget), ct.triggerItem("home", "home-launcher");
    }
    function u(E, j) {
      j.stopPropagation(), o.value = null, M(j.currentTarget), Xe(E) || Ie.markRunning(E), ct.triggerItem("tool", E);
    }
    function x(E, j) {
      const q = j.currentTarget.getBoundingClientRect(), ve = Kt.position, B = ve === "left" || ve === "right";
      o.value = {
        type: "tool",
        id: E.id,
        title: E.title,
        icon: E.icon,
        emoji: E.emoji,
        x: B ? ve === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: B ? q.top + q.height / 2 : ve === "top" ? q.bottom + 8 : q.top
      };
    }
    const m = /* @__PURE__ */ new Map();
    function M(E) {
      if (!E || (m.get(E)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const j = E.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      m.set(E, j);
      const O = () => {
        m.get(E) === j && m.delete(E);
      };
      j.onfinish = O, j.oncancel = O;
    }
    const f = F(null), p = xe({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), d = F(null), k = F(null), $ = ae(() => d.value || t.value.cards), b = ae(() => k.value || t.value.tools);
    let C = "", P = 0, ee = !1, T = 0;
    function S(E, j, O) {
      if (O.button !== 0 || O.target.closest(".mac-dock-market-btn")) return;
      const B = O.currentTarget.getBoundingClientRect();
      ee = !1, f.value = {
        type: E,
        id: j.id,
        item: j,
        startX: O.clientX,
        startY: O.clientY,
        initialLeft: B.left,
        initialTop: B.top,
        width: B.width,
        height: B.height
      }, window.addEventListener("pointermove", w), window.addEventListener("pointerup", I), window.addEventListener("pointercancel", I);
    }
    function w(E) {
      if (!f.value) return;
      const j = E.clientX - f.value.startX, O = E.clientY - f.value.startY, q = Math.hypot(j, O);
      if (!ee && q > 5 && (ee = !0, p.visible = !0, p.item = f.value.item, p.type = f.value.type, p.width = f.value.width, p.height = f.value.height, f.value.type === "card" ? d.value = [...t.value.cards] : k.value = [...t.value.tools]), !ee) return;
      p.x = E.clientX - p.width / 2, p.y = E.clientY - p.height / 2;
      const B = document.elementsFromPoint(E.clientX, E.clientY).find(
        (we) => we.classList.contains("mac-dock-item") && !we.classList.contains("mac-dock-market-btn")
      );
      if (!B) return;
      const W = B.getAttribute("data-dock-target"), N = B.getAttribute("data-dock-tool"), ue = f.value.type, Ce = f.value.id, Fe = Date.now();
      if (ue === "card" && W && W !== Ce && W !== "home-launcher") {
        const we = B.getBoundingClientRect(), Ne = we.left + we.width / 2;
        if (Math.abs(E.clientX - Ne) > we.width * 0.55 || W === C && Fe - P < 180) return;
        const Ve = [...d.value || t.value.cards], st = Ve.findIndex((He) => He.id === Ce), tt = Ve.findIndex((He) => He.id === W);
        if (st >= 0 && tt >= 0 && st !== tt) {
          const He = Ve.splice(st, 1)[0];
          Ve.splice(tt, 0, He), d.value = Ve, C = W, P = Fe;
        }
      } else if (ue === "tool" && N && N !== Ce) {
        const we = B.getBoundingClientRect(), Ne = we.left + we.width / 2;
        if (Math.abs(E.clientX - Ne) > we.width * 0.55 || N === C && Fe - P < 180) return;
        const Ve = [...k.value || t.value.tools], st = Ve.findIndex((He) => He.id === Ce), tt = Ve.findIndex((He) => He.id === N);
        if (st >= 0 && tt >= 0 && st !== tt) {
          const He = Ve.splice(st, 1)[0];
          Ve.splice(tt, 0, He), k.value = Ve, C = N, P = Fe;
        }
      }
    }
    function I() {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", I), window.removeEventListener("pointercancel", I), ee && f.value && (T = Date.now() + 250, f.value.type === "card" && d.value ? ct.reorderCards(d.value.map((E) => E.id)) : f.value.type === "tool" && k.value && ct.reorderTools(k.value.map((E) => E.id))), p.visible = !1, p.item = null, d.value = null, k.value = null, f.value = null, ee = !1, C = "";
    }
    function V(E, j) {
      Date.now() < T || l(E, j);
    }
    function G(E, j) {
      Date.now() < T || u(E, j);
    }
    return no(() => {
      for (const E of m.values()) E.cancel();
      m.clear(), window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", I), window.removeEventListener("pointercancel", I);
    }), (E, j) => (a(), c(U, null, [
      n("div", tu, [
        Q(Vo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Zt(() => [
            (a(!0), c(U, null, fe($.value, (O) => (a(), c("button", {
              key: O.id,
              class: se(["mac-dock-item", {
                "is-active": t.value.activeTargetId === O.id,
                "is-drag-origin": f.value && f.value.id === O.id
              }]),
              type: "button",
              "data-dock-target": O.id,
              title: O.title,
              onPointerdown: (q) => S("card", O, q),
              onClick: R((q) => V(O.id, q), ["stop"]),
              onContextmenu: R((q) => h(O, q), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: O.icon,
                alt: O.title
              }, null, 8, nu),
              t.value.activeTargetId === O.id ? (a(), c("span", iu)) : D("", !0)
            ], 42, ou))), 128))
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
          onClick: j[0] || (j[0] = R((O) => g(O), ["stop"]))
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
          default: Zt(() => [
            (a(!0), c(U, null, fe(b.value, (O) => (a(), c("button", {
              key: O.id,
              class: se(["mac-dock-item", {
                "is-active": s(Ie).isRunning(O.id),
                "is-drag-origin": f.value && f.value.id === O.id
              }]),
              type: "button",
              "data-dock-tool": O.id,
              title: O.title,
              onPointerdown: (q) => S("tool", O, q),
              onClick: R((q) => G(O.id, q), ["stop"]),
              onContextmenu: R((q) => x(O, q), ["prevent"])
            }, [
              O.icon ? (a(), c("img", {
                key: 0,
                class: "mac-dock-icon",
                src: O.icon,
                alt: O.title
              }, null, 8, ru)) : O.emoji ? (a(), c("span", au, v(O.emoji), 1)) : D("", !0),
              s(Ie).isRunning(O.id) ? (a(), c("span", lu)) : D("", !0),
              i.value[O.id] > 0 ? (a(), c("span", cu, v(i.value[O.id] > 99 ? "99+" : i.value[O.id]), 1)) : D("", !0)
            ], 42, su))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: se(["mac-dock-item mac-dock-market-btn", { "is-active": s($o).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: j[1] || (j[1] = R((O) => r(O), ["stop"]))
        }, [...j[4] || (j[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (a(), ce(ht, { to: "body" }, [
        p.visible && p.item ? (a(), c("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: me({
            width: p.width + "px",
            height: p.height + "px",
            transform: "translate3d(" + p.x + "px," + p.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          p.item.icon ? (a(), c("img", {
            key: 0,
            class: "mac-dock-icon",
            src: p.item.icon,
            alt: ""
          }, null, 8, du)) : p.item.emoji ? (a(), c("span", uu, v(p.item.emoji), 1)) : D("", !0)
        ], 4)) : D("", !0)
      ])),
      Q(eu, {
        target: o.value,
        onClose: j[2] || (j[2] = (O) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), qi = /* @__PURE__ */ Te(pu, [["__scopeId", "data-v-4528a5df"]]), fu = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, gu = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], hu = { class: "win-toast-head" }, mu = ["src"], vu = { class: "win-toast-app" }, yu = ["onClick"], bu = ["onClick"], wu = { class: "win-toast-title" }, ku = {
  key: 0,
  class: "win-toast-subtitle"
}, _u = {
  key: 1,
  class: "win-toast-snippet"
}, xu = {
  key: 0,
  class: "win-toast-actions"
}, Cu = ["onClick"], $u = ["onClick"], Lu = /* @__PURE__ */ le({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = F({}), l = F({});
    let h = null;
    function g(d) {
      const k = t.get(d);
      k !== void 0 && clearTimeout(k), t.delete(d);
    }
    function u(d, k = d.duration) {
      g(d.id), i.set(d.id, k), o.set(d.id, Date.now()), l.value[d.id] = !1, r.value[d.id] = Math.max(0, Math.min(100, k / d.duration * 100)), ft(() => requestAnimationFrame(() => {
        r.value[d.id] = 0;
      })), t.set(d.id, window.setTimeout(() => {
        t.delete(d.id), Ee.close(d.id);
      }, k));
    }
    function x(d) {
      g(d.id);
      const k = Date.now() - (o.get(d.id) || Date.now()), $ = Math.max(0, (i.get(d.id) ?? d.duration) - k);
      i.set(d.id, $), l.value[d.id] = !0, r.value[d.id] = Math.max(0, Math.min(100, $ / d.duration * 100));
    }
    function m(d) {
      u(d, Math.max(1500, i.get(d.id) ?? d.duration));
    }
    function M(d) {
      g(d.id), Ee.close(d.id);
    }
    function f(d) {
      if (xt.markRead(d.id), M(d), !d.onClick) {
        d.target && xt.openTarget(d.target);
        return;
      }
      try {
        Promise.resolve(d.onClick()).catch((k) => console.warn("Notification action failed", k));
      } catch (k) {
        console.warn("Notification action failed", k);
      }
    }
    function p(d) {
      const k = Math.max(500, i.get(d.id) ?? d.duration);
      return {
        width: `${r.value[d.id] ?? 100}%`,
        transition: l.value[d.id] ? "none" : `width ${k}ms linear`
      };
    }
    return Ue(() => {
      h = new MutationObserver(() => {
        const k = new Set(So.map(($) => $.id));
        for (const $ of So)
          !$.closing && !t.has($.id) && !i.has($.id) && u($);
        for (const $ of i.keys())
          k.has($) || (g($), i.delete($), o.delete($), delete r.value[$], delete l.value[$]);
      });
      const d = document.getElementById("win-toast-container");
      d && h.observe(d, { childList: !0 });
      for (const k of So) u(k);
    }), no(() => {
      h?.disconnect(), h = null;
      for (const d of t.values()) clearTimeout(d);
      t.clear();
    }), (d, k) => (a(), ce(ht, { to: "body" }, [
      n("div", fu, [
        Q(Vo, { name: "win-toast" }, {
          default: Zt(() => [
            (a(!0), c(U, null, fe(s(So), ($) => (a(), c("article", {
              key: $.id,
              class: se(["win-toast-card", [$.appType, { closing: $.closing }]]),
              "data-toast-fingerprint": $.fingerprint,
              onMouseenter: (b) => x($),
              onMouseleave: (b) => m($)
            }, [
              n("header", hu, [
                n("img", {
                  src: $.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, mu),
                n("span", vu, v($.appName), 1),
                k[0] || (k[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (b) => M($)
                }, "✕", 8, yu)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (b) => f($)
              }, [
                n("span", wu, v($.title), 1),
                $.subtitle ? (a(), c("span", ku, v($.subtitle), 1)) : D("", !0),
                $.message ? (a(), c("span", _u, v($.message), 1)) : D("", !0)
              ], 8, bu),
              $.showActions && $.actionLabel ? (a(), c("footer", xu, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (b) => f($)
                }, v($.actionLabel), 9, Cu),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (b) => M($)
                }, "关闭", 8, $u)
              ])) : D("", !0),
              n("div", {
                class: "win-toast-progress",
                style: me(p($))
              }, null, 4)
            ], 42, gu))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Xi = /* @__PURE__ */ Te(Lu, [["__scopeId", "data-v-8ecd30bd"]]), Tu = ["id"], Su = /* @__PURE__ */ le({
  __name: "DockModuleHost",
  setup(e) {
    const t = Ii().filter((o) => o.presentation !== "card").map((o) => {
      Ke(o.lifecycle.isVisible, (r) => {
        r && Ie.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = le({
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
                Ie.reloadApp(o.id);
              }
            }, "↻ 重试"),
            We("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ie.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: ae(() => !!Ye[o.id]),
        view: K({
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
    }), (o, i) => (a(!0), c(U, null, fe(s(t), (r) => Be((a(), c("div", {
      id: r.definition.rootId,
      key: r.definition.id
    }, [
      r.mounted.value ? (a(), ce($i(r.view), {
        key: s(Ie).getRenderKey(r.definition.id)
      })) : D("", !0)
    ], 8, Tu)), [
      [to, r.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Mu = /* @__PURE__ */ Te(Su, [["__scopeId", "data-v-3f131313"]]);
function je(e, t) {
  const o = F(!1);
  return Ke(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Pt(o);
}
const Iu = ["onKeydown"], Du = { class: "fo-up-preview-head" }, Au = ["src"], Eu = { class: "fo-up-preview-meta" }, Pu = { class: "fo-up-preview-name-row" }, Wu = ["href"], Bu = ["disabled"], Ou = { class: "fo-up-preview-sign" }, Ru = { class: "fo-up-preview-videos" }, Fu = {
  key: 0,
  class: "fo-up-preview-loading"
}, Nu = {
  key: 1,
  class: "fo-up-preview-empty"
}, Hu = {
  key: 2,
  class: "fo-up-preview-empty"
}, ju = ["href"], zu = ["src"], Ku = {
  key: 0,
  class: "fo-bili-duration"
}, Uu = { class: "fo-up-preview-video-info" }, Vu = ["href"], Gu = { class: "fo-up-preview-video-meta" }, Yu = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", qu = /* @__PURE__ */ le({
  __name: "BiliUpPreview",
  setup(e) {
    const t = F(!1);
    function o() {
      if (!pe.submitting) {
        if (!pe.followed) {
          t.value = !1, Ko.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, Ko.toggleFollow();
      }
    }
    function i() {
      t.value = !1, Ko.close();
    }
    return (r, l) => s(pe).open ? (a(), c("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: R(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: me({ left: `${s(pe).left}px`, top: `${s(pe).top}px` }),
        onKeydown: Et(R(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Du, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(pe).face || Yu,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Au),
          n("div", Eu, [
            n("div", Pu, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(pe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, v(s(pe).name), 9, Wu),
              n("button", {
                type: "button",
                class: se([
                  s(pe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(pe).submitting,
                onClick: o
              }, v(s(pe).submitting ? "处理中…" : t.value ? "确定取消？" : s(pe).followed ? "取消关注" : "＋ 关注"), 11, Bu)
            ]),
            n("p", Ou, v(s(pe).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        l[1] || (l[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Ru, [
          s(pe).loading ? (a(), c("div", Fu, [...l[0] || (l[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(pe).error ? (a(), c("p", Nu, v(s(pe).error), 1)) : s(pe).videos.length ? (a(!0), c(U, { key: 3 }, fe(s(pe).videos, (h) => (a(), c("article", {
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
              }, null, 8, zu),
              h.duration ? (a(), c("span", Ku, v(h.duration), 1)) : D("", !0)
            ], 8, ju),
            n("div", Uu, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: h.url,
                target: "_blank",
                rel: "noreferrer"
              }, v(h.title), 9, Vu),
              n("div", Gu, [
                n("span", null, "▣ " + v(h.playCount), 1),
                n("span", null, v(h.published), 1)
              ])
            ])
          ]))), 128)) : (a(), c("p", Hu, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Iu)
    ], 32)) : D("", !0);
  }
}), Xu = /* @__PURE__ */ Te(qu, [["__scopeId", "data-v-83b4a8d5"]]), Ju = { class: "logicweaver-overlays-layer" }, Qu = { id: "vue-notification-root" }, Zu = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, ep = { id: "vue-bili-message-panel-root" }, tp = { id: "vue-notification-center-root" }, op = { id: "vue-tab-manager-root" }, np = { id: "vue-bookmark-menu-root" }, ip = { id: "vue-bookmark-panel-root" }, sp = { id: "vue-launcher-dialogs-root" }, rp = { id: "vue-launcher-folder-root" }, ap = { id: "vue-launcher-menus-root" }, lp = { id: "vue-settings-dialog-root" }, cp = { id: "vue-clock-settings-root" }, dp = { id: "vue-bili-theater-root" }, up = { id: "vue-bili-mini-player-root" }, pp = { id: "vue-ai-dialog-root" }, fp = { id: "vue-aihot-viewer-root" }, gp = { id: "vue-nav-wheel-root" }, hp = { id: "vue-github-detail-root" }, mp = { id: "vue-bili-subtitle-modal-root" }, vp = { id: "vue-firecrawl-modal-root" }, yp = { id: "vue-floating-image-viewer-root" }, bp = { id: "vue-command-palette-root" }, wp = /* @__PURE__ */ le({
  __name: "AppOverlays",
  setup(e) {
    const t = je(() => $o.state.isOpen), o = je(() => Si.isOpen), i = je(() => zo.isOpen), r = je(() => Dt.state.isOpen), l = je(() => lr.open), h = je(() => xo.state.isOpen), g = je(() => Ds.isOpen), u = je(() => rr.isOpen), x = je(() => Hn.state.isOpen), m = je(() => Rs.isOpen), M = je(() => Ae.isOpen), f = je(() => Bn.state.isOpen), p = je(() => qe.isOpen), d = je(() => Ft.editDialog.isOpen || Ft.iconPicker.isOpen || Ft.linkMove.isOpen || Ft.folderMove.isOpen || Ft.groupMerge.isOpen || Ft.folderDelete.isOpen), k = K(() => import("./ProfileMenu-k26C_r9s.js")), $ = K(() => import("./BookmarkNoteMenu-DrxK4_Bo.js")), b = K(() => import("./BookmarkPanel-Okk9LjsH.js")), C = K(() => import("./ClockSettingsMenu-BKg5Y_Lq.js")), P = K(() => import("./NotificationCenter-S7v2m0Wm.js")), ee = K(() => import("./TabManagerPanel-BJoqMWvq.js")), T = K(() => import("./LauncherDialogs-IsD7jfI3.js")), S = K(() => import("./LauncherFolderDialog-FeQ33l2T.js")), w = K(() => import("./LauncherMenus-BRffjFyr.js")), I = K(() => import("./SettingsDialog-Dc_P3cix.js")), V = K(() => import("./BiliMiniPlayer-tvX60rNB.js")), G = K(() => import("./BiliTheaterDialog-Bzs_uGV6.js")), E = K(() => import("./BiliMessagePanel-Caj85Fz1.js")), j = K(() => import("./AiDialog-MypSB-Me.js")), O = K(() => import("./AihotViewer-BVN-_XYA.js")), q = K(() => import("./NavWheelOverlay-C6XA6QQN.js")), ve = K(() => import("./GitHubRepoDetailDrawer-fcqNdJqk.js")), B = K(() => import("./BiliSubtitleModal-Cn1SLtSH.js")), W = K(() => import("./FirecrawlModal-D36W4pd0.js")), N = K(() => import("./FloatingImageViewer-Cqa9MQNc.js")), ue = K(() => import("./CommandPalette-DOSTLbIG.js")), Ce = K(() => import("./AppPromptModal-BeukD1Gs.js")), Fe = K(async () => {
      const [we, Ne] = await Promise.all([
        import("./PluginMarketDialog-B4qUg9IV.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Is("logicweaver-market-styles", Ne.default), we.default;
    });
    return (we, Ne) => (a(), c("div", Ju, [
      n("div", Qu, [
        Q(Xi)
      ]),
      n("div", Zu, [
        Q(s(k))
      ]),
      n("div", ep, [
        s(u) ? (a(), ce(s(E), { key: 0 })) : D("", !0)
      ]),
      n("div", tp, [
        s(o) ? (a(), ce(s(P), { key: 0 })) : D("", !0)
      ]),
      n("div", op, [
        s(i) ? (a(), ce(s(ee), { key: 0 })) : D("", !0)
      ]),
      n("div", np, [
        s(f) ? (a(), ce(s($), { key: 0 })) : D("", !0)
      ]),
      n("div", ip, [
        Q(s(b))
      ]),
      n("div", sp, [
        s(d) ? (a(), ce(s(T), { key: 0 })) : D("", !0)
      ]),
      n("div", rp, [
        s(p) ? (a(), ce(s(S), { key: 0 })) : D("", !0)
      ]),
      n("div", ap, [
        Q(s(w))
      ]),
      n("div", lp, [
        Q(s(I))
      ]),
      n("div", cp, [
        s(r) ? (a(), ce(s(C), { key: 0 })) : D("", !0)
      ]),
      n("div", dp, [
        s(h) ? (a(), ce(s(G), { key: 0 })) : D("", !0)
      ]),
      n("div", up, [
        s(g) ? (a(), ce(s(V), { key: 0 })) : D("", !0)
      ]),
      n("div", pp, [
        s(x) ? (a(), ce(s(j), { key: 0 })) : D("", !0)
      ]),
      n("div", fp, [
        s(l) ? (a(), ce(s(O), { key: 0 })) : D("", !0)
      ]),
      n("div", gp, [
        Q(s(q))
      ]),
      Q(Mu),
      n("div", hp, [
        s(m) ? (a(), ce(s(ve), { key: 0 })) : D("", !0)
      ]),
      n("div", mp, [
        Q(s(B))
      ]),
      n("div", vp, [
        Q(s(W))
      ]),
      n("div", yp, [
        Q(s(N))
      ]),
      n("div", bp, [
        s(M) ? (a(), ce(s(ue), { key: 0 })) : D("", !0)
      ]),
      Q(Xu),
      Q(s(Ce)),
      s(t) ? (a(), ce(s(Fe), { key: 0 })) : D("", !0)
    ]));
  }
});
let Ln = !1;
function kp(e = 1800) {
  if (Ln || typeof window > "u") return;
  const t = () => {
    if (Ln) return;
    Ln = !0;
    const o = Ii();
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
const _p = ["data-active-workspace"], xp = /* @__PURE__ */ le({
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
    function l(u, x = "image/svg+xml") {
      if (typeof document > "u") return;
      const m = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(u) : u;
      if (r === m) return;
      r = m;
      const M = document.querySelectorAll("link[rel*='icon']");
      if (M.length > 0)
        M.forEach((f) => {
          f.type = x, f.href = m;
        });
      else {
        const f = document.createElement("link");
        f.rel = "icon", f.type = x, f.href = m, document.head.appendChild(f);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const u = i[Mo.value] || i.home;
      if (l(u.icon, u.iconType), Y.playing && Y.title) {
        const x = Y.artist ? ` - ${Y.artist}` : "";
        document.title = `▶ ${Y.title}${x}`;
        return;
      }
      if (ao.playing && ao.title) {
        document.title = `▶ ${ao.title} · 电台`;
        return;
      }
      document.title = u.title;
    }
    Ke(
      [
        () => Mo.value,
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
    const g = ae(() => Mo.value === "home" ? "" : Mo.value);
    return Ke(() => _t.activeId, (u) => {
      document.body.classList.toggle("has-card-fullscreen", !!u);
    }, { immediate: !0, flush: "sync" }), Ue(() => {
      if (typeof document < "u") {
        document.body.dataset.spa = "1", document.body.classList.remove("is-starting");
        const u = document.getElementById("endfield-loader");
        u && u.remove();
      }
      try {
        An.bindGlobalListener(), dt.start(), yi.start(), En.init().catch((u) => console.warn("[Launcher] 初始化失败", u)), kp(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), Wt(() => {
      dt.stop(), En.stop(), yi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: g,
      windowManagerController: Se
    }), (u, x) => (a(), c("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": g.value || ""
    }, [
      Q(Kr),
      Q(za),
      Q(Fd),
      Q(Gd),
      n("nav", {
        id: "mac-dock",
        class: se(["mac-dock", "dock-" + s(Kt).position]),
        "aria-label": "快捷应用栏"
      }, [
        Q(qi)
      ], 2),
      Q(wp)
    ], 8, _p));
  }
}), Cp = /* @__PURE__ */ Te(xp, [["__scopeId", "data-v-bac6794a"]]), $p = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Lp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Tp = { class: "rhine-scaler" }, Sp = { class: "rhine-center-group" }, Mp = { class: "rhine-auth-status" }, Ip = { class: "rhine-auth-text" }, Dp = ["hidden"], Ap = { class: "rhine-cinema-caption" }, Ep = /* @__PURE__ */ le({
  __name: "IntroAnimation",
  setup(e) {
    const t = F(window.innerHeight), o = F(window.innerWidth), i = F(!1), r = F(!1), l = F(10), h = F(1), g = F(0), u = /* @__PURE__ */ new Set();
    let x = 0, m = () => {
    };
    const M = ae(() => `${String(Math.round(Ge.renderedProgress)).padStart(2, "0")}%`), f = ae(() => {
      const w = Ge.renderedProgress / 100 * t.value + 10;
      return `${Math.min(w, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), p = ae(() => Ge.renderedProgress >= 75 ? "START PROCESSING..." : Ge.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), d = ae(() => Ge.finished ? "身份验证通过 · 欢迎进入终端" : Ge.status ? `身份信息确认 · ${Ge.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), k = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function $(w, I) {
      const V = window.setTimeout(() => {
        u.delete(V), w();
      }, I);
      u.add(V);
    }
    function b() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function C(w) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        b();
        return;
      }
      const I = w ? 180 : 260, V = w ? 200 : 280, G = performance.now(), E = (j) => {
        const O = j - G, q = Math.min(1, O / I), ve = 1 - Math.pow(1 - q, 3);
        if (l.value = 10 + ve * Math.max(0, o.value - 10), O > I && (h.value = Math.max(0, 1 - (O - I) / V)), O >= I + V) {
          b();
          return;
        }
        x = requestAnimationFrame(E);
      };
      $(() => {
        x = requestAnimationFrame(E);
      }, w ? 60 : 120);
    }
    function P(w) {
      w || (i.value = !0), $(() => {
        r.value = !0, g.value = 6, h.value = 0, $(b, 380);
      }, w ? 40 : 420);
    }
    function ee(w) {
      Ge.style === "rhinelab" ? P(w) : C(w);
    }
    function T() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function S(w) {
      Ge.finished || (w.key === "Enter" || w.key === " " || w.key === "Escape") && (w.preventDefault(), gt.skip("KEYBOARD SKIP"));
    }
    return Ue(() => {
      document.documentElement.style.setProperty("--rhine-scale", k.value), window.addEventListener("resize", T, { passive: !0 }), window.addEventListener("keydown", S, !0), m = wr(ee), Ge.finished && ee(Ge.forced);
    }), no(() => {
      m(), window.removeEventListener("resize", T), window.removeEventListener("keydown", S, !0), cancelAnimationFrame(x);
      for (const w of u) clearTimeout(w);
      u.clear();
    }), (w, I) => (a(), c("div", {
      class: "intro-vue-content",
      style: me({ "--rhine-scale": k.value, opacity: h.value, filter: `blur(${g.value}px)` })
    }, [
      n("div", $p, [
        I[2] || (I[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        I[3] || (I[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: me({ height: `${s(Ge).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: me({ top: f.value })
        }, [
          I[1] || (I[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, v(M.value), 1),
          n("small", null, v(s(Ge).status), 1)
        ], 4),
        I[4] || (I[4] = mo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: me({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Lp, [
        I[12] || (I[12] = mo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Tp, [
          I[10] || (I[10] = mo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: I[0] || (I[0] = (V) => s(gt).skip("ENTER SYSTEM"))
          }, [...I[5] || (I[5] = [
            Oe("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Sp, [
            I[8] || (I[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", Mp, [
              I[6] || (I[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Ip, v(p.value), 1),
              I[7] || (I[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: se(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...I[9] || (I[9] = [
            mo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Dp),
          n("div", Ap, v(d.value), 1),
          I[11] || (I[11] = n("div", { class: "rhine-powered" }, [
            Oe("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: se(["rhine-white", { flash: r.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Pp = /* @__PURE__ */ le({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      To.trigger(o);
    }
    return (o, i) => (a(), c(U, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = R((r) => t("messages"), ["stop"]))
      }, " 通知中心 "),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = R((r) => t("tabs"), ["stop"]))
      }, "标签页管理"),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = R((r) => t("refresh"), ["stop"]))
      }, " 刷新 B站账号信息 "),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = R((r) => t("switch"), ["stop"]))
      }, " 切换用户（打开 B站） "),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = R((r) => t("web"), ["stop"]))
      }, " 打开 B站个人中心 ")
    ], 64));
  }
}), Wp = /* @__PURE__ */ le({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Nn.openWorkspace(o, !0);
    }
    return (o, i) => (a(), c(U, null, [
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
      Ci(o.$slots, "default")
    ], 64));
  }
}), Bp = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Op = { role: "status" }, Rp = ["disabled"], Fp = ["disabled"], Np = /* @__PURE__ */ le({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(Qe).message || s(Qe).busy ? (a(), c("section", Bp, [
      n("p", Op, v(s(Qe).repo ? `原任务仓库：${s(Qe).repo}。 ` : "") + v(s(Qe).message), 1),
      s(Qe).busy ? (a(), c("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(nt).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : D("", !0),
      s(Qe).uncertain ? (a(), c(U, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(Qe).unlockConfirmation ? (a(), c(U, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(Qe).busy,
            onClick: o[2] || (o[2] = (i) => s(nt).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, Fp),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(Qe).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (a(), c("button", {
          key: 0,
          type: "button",
          disabled: s(Qe).busy,
          onClick: o[1] || (o[1] = (i) => s(Qe).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Rp))
      ], 64)) : D("", !0)
    ])) : D("", !0);
  }
}), Hp = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, jp = {
  key: 0,
  class: "gh-sidebar-divider"
}, zp = {
  key: 1,
  class: "gh-sidebar-caption"
}, Kp = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], Up = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, Vp = { key: 0 }, Gp = { key: 1 }, Yp = { key: 2 }, qp = {
  key: 3,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, Xp = ["title"], Jp = { class: "gh-folder-count" }, Qp = ["data-del", "onClick", "onKeydown"], Zp = /* @__PURE__ */ le({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = F(""), i = () => {
      o.value = "";
    };
    function r(x) {
      return t.active && !wt.busy && vo.folders.some((m) => m.title === x && (m.kind === "custom" || m.kind === "uncategorized"));
    }
    Ke(() => t.active, (x) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), x && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), no(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function l(x, m) {
      x.stopPropagation(), St.delete(m);
    }
    function h(x, m) {
      if (!r(m) || !Array.from(x.dataTransfer?.types || []).includes(Fs)) {
        i();
        return;
      }
      x.preventDefault(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), o.value = m;
    }
    function g(x, m) {
      const M = x.currentTarget;
      M instanceof Node && x.relatedTarget instanceof Node && M.contains(x.relatedTarget) || o.value === m && (o.value = "");
    }
    function u(x, m) {
      if (i(), !r(m)) return;
      const M = Ns(x.dataTransfer);
      M && (x.preventDefault(), x.stopPropagation(), St.dropRepository(M, m));
    }
    return (x, m) => (a(), c(U, null, [
      s(wt).message ? (a(), c("p", Hp, v(s(wt).message), 1)) : D("", !0),
      (a(!0), c(U, null, fe(s(vo).folders, (M, f) => (a(), c(U, {
        key: M.title
      }, [
        M.kind === "custom" && s(vo).folders[f - 1]?.kind !== "custom" ? (a(), c("div", jp)) : D("", !0),
        M.kind === "custom" && s(vo).folders[f - 1]?.kind !== "custom" ? (a(), c("div", zp, "我的文件夹")) : D("", !0),
        n("button", {
          type: "button",
          class: se(["gh-bili-folder", { on: M.active, "drag-into": o.value === M.title }]),
          "data-folder": M.title,
          onClick: (p) => s(St).select(M.title),
          onDragover: (p) => h(p, M.title),
          onDragleave: (p) => g(p, M.title),
          onDrop: (p) => u(p, M.title)
        }, [
          n("span", Up, [
            M.kind === "all" ? (a(), c("span", Vp, "⭐")) : M.kind === "used" ? (a(), c("span", Gp, "⚡")) : M.kind === "uncategorized" ? (a(), c("span", Yp, "📄")) : (a(), c("i", qp))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: M.title
          }, v(M.title), 9, Xp),
          n("small", Jp, v(M.count), 1),
          M.kind === "custom" ? (a(), c("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除文件夹",
            "data-del": M.title,
            role: "button",
            tabindex: "0",
            onClick: (p) => l(p, M.title),
            onKeydown: [
              Et(R((p) => s(St).delete(M.title), ["prevent", "stop"]), ["enter"]),
              Et(R((p) => s(St).delete(M.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, Qp)) : D("", !0)
        ], 42, Kp)
      ], 64))), 128))
    ], 64));
  }
}), ef = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, tf = { key: 0 }, of = { key: 1 }, nf = { key: 2 }, sf = {
  key: 3,
  class: "fo-folder-icon"
}, rf = { class: "gh-bili-heading" }, af = { class: "gh-hero-title-row" }, lf = ["title"], cf = ["role", "aria-live"], df = ["title"], uf = { id: "gh-hero-desc" }, pf = { class: "gh-bili-actions" }, ff = { class: "gh-batch-btn-text" }, gf = /* @__PURE__ */ le({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (a(), c(U, null, [
      n("div", ef, [
        s(yt).kind === "all" ? (a(), c("span", tf, "⭐")) : s(yt).kind === "used" ? (a(), c("span", of, "⚡")) : s(yt).kind === "uncategorized" ? (a(), c("span", nf, "📄")) : (a(), c("i", sf))
      ]),
      n("div", rf, [
        n("div", af, [
          n("h3", {
            id: "gh-hero-title",
            title: s(yt).title
          }, v(s(yt).title), 9, lf),
          s(Tt).actionText ? (a(), c("div", {
            key: 0,
            class: se(["gh-hero-inline-status", { "is-error": s(Tt).actionError }]),
            role: s(Tt).actionError ? "alert" : "status",
            "aria-live": s(Tt).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(Tt).actionText
            }, v(s(Tt).actionText), 9, df),
            n("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭状态提示",
              onClick: i[0] || (i[0] = (r) => s(On).update({ actionText: "", actionError: !1 }))
            }, "×")
          ], 10, cf)) : D("", !0)
        ]),
        n("p", uf, v(s(yt).description), 1)
      ]),
      n("div", pf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: se(["gh-hero-btn gh-batch-toggle-btn", { active: s(yt).batchMode }]),
          title: "批量多选操作",
          onClick: i[1] || (i[1] = (r) => s(wo).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", ff, v(s(yt).batchMode ? "返回" : "批量操作"), 1)
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
          onClick: i[3] || (i[3] = (r) => s(wo).createFolder())
        }, "＋ 新建文件夹")
      ])
    ], 64));
  }
}), hf = /* @__PURE__ */ Te(gf, [["__scopeId", "data-v-54b70cde"]]), Z = xe({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function bi(e, t = !1) {
  if (!e || Z.busy) return;
  if (Z.repo && Z.text !== Z.baseline) {
    Z.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = nt.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(Z, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Tn() {
  Z.busy || Object.assign(Z, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Sn() {
  if (Z.busy || !Z.repo) return;
  const { repo: e, text: t, baseline: o } = Z;
  Z.busy = !0;
  try {
    await nt.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(Z, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    Z.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    Z.busy = !1;
  }
}
async function wi() {
  if (Z.busy || !Z.repo) return;
  const e = Z.repo;
  Z.busy = !0;
  try {
    const o = (await nt.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    Z.storedValue = o ?? "", Z.baseline = o ?? "", Z.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    Z.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    Z.busy = !1;
  }
}
const mf = ["disabled"], vf = ["disabled"], yf = ["disabled"], bf = ["disabled"], wf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, ki = /* @__PURE__ */ le({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = F(null);
    return Ue(() => {
      ft(() => {
        t.active && !Z.busy && o.value?.focus();
      });
    }), (i, r) => (a(), c("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[6] || (r[6] = R(() => {
      }, ["stop"]))
    }, [
      Be(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => s(Z).text = l),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(Z).busy || !e.active,
        onKeydown: [
          r[1] || (r[1] = Et(R((l) => !l.isComposing && e.active && s(Sn)(), ["prevent"]), ["enter"])),
          r[2] || (r[2] = Et(R((l) => !l.isComposing && e.active && s(Tn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, mf), [
        [eo, s(Z).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(Z).busy || !e.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...l) => s(Sn) && s(Sn)(...l))
      }, "✓", 8, vf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(Z).busy || !e.active,
        onClick: r[4] || (r[4] = //@ts-ignore
        (...l) => s(Tn) && s(Tn)(...l))
      }, "✕", 8, yf),
      n("button", {
        type: "button",
        disabled: s(Z).busy || !e.active,
        onClick: r[5] || (r[5] = //@ts-ignore
        (...l) => s(wi) && s(wi)(...l))
      }, "读取已保存值", 8, bf),
      s(Z).storedValue !== null ? (a(), c("p", wf, "已保存值：" + v(s(Z).storedValue || "（空）"), 1)) : D("", !0)
    ]));
  }
}), kf = {
  key: 0,
  role: "status"
}, _f = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, xf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Cf = { style: { "font-size": "12px", color: "var(--dim)" } }, $f = {
  key: 3,
  class: "gh-repos-loading"
}, Lf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Tf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Sf = ["onClick"], Mf = { class: "gh-card-head" }, If = ["checked", "onChange"], Df = ["src"], Af = ["href", "title"], Ef = { class: "owner" }, Pf = { class: "gh-card-body" }, Wf = { class: "gh-card-badges" }, Bf = ["title", "onClick"], Of = ["title", "onClick"], Rf = { class: "gh-badge-remark-text" }, Ff = ["onClick"], Nf = ["href"], Hf = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, jf = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, zf = ["title"], Kf = {
  key: 3,
  class: "desc dim"
}, Uf = { class: "meta" }, Vf = { class: "gh-stars" }, Gf = {
  key: 0,
  class: "gh-lang"
}, Yf = {
  key: 1,
  class: "gh-updated"
}, qf = {
  key: 6,
  class: "gh-pager"
}, Xf = ["disabled"], Jf = { class: "gh-page-info" }, Qf = ["disabled"], Zf = ["onClick"], eg = /* @__PURE__ */ le({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => !!Z.repo && !ke.cards.some((T) => T.fullName === Z.repo)), i = xe({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folder: "",
      used: !1,
      hasRemark: !1,
      url: ""
    }), r = F(null), l = F(!1);
    function h(T, S) {
      const w = T.target;
      if (w instanceof Element) {
        if (ke.batchMode) {
          if (w.closest(".fo-card-more,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.gh-inline-remark-box")) return;
          T.preventDefault(), T.stopPropagation(), at.toggleSelection(S.fullName);
          return;
        }
        w.closest("a,button,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (T.preventDefault(), T.stopPropagation(), Hs.open(S.fullName, void 0, S));
      }
    }
    function g(T, S) {
      if (!t.active) return;
      T.preventDefault(), T.stopPropagation();
      const w = 12, I = 160, V = 280, G = Math.min(window.innerWidth - I - w, Math.max(w, T.clientX)), E = Math.min(window.innerHeight - V - w, Math.max(w, T.clientY));
      i.x = G, i.y = E, i.fullName = S.fullName, i.folder = S.folder || "", i.used = !!S.used, i.hasRemark = !!S.customRemark, i.url = S.url, i.visible = !0, r.value = null, l.value = G > window.innerWidth - 380;
    }
    function u(T, S) {
      g(S, T), r.value = "folder";
    }
    function x() {
      i.visible = !1, r.value = null;
    }
    function m(T) {
      nt.setRepoFolder(i.fullName, T), x();
    }
    function M(T) {
      if (!t.active) return;
      const S = typeof T == "string" ? T : T?.fullName || i.fullName;
      x(), bi(S);
    }
    function f() {
      if (!t.active) return;
      const T = i.fullName;
      x(), bi(T, !0);
    }
    async function p() {
      const T = i.url;
      if (x(), T && t.active)
        try {
          await navigator.clipboard.writeText(T);
        } catch {
        }
    }
    function d(T) {
      const S = nt.findRepository(i.fullName);
      x(), S && As.sendGitHubShare({
        fullName: S.full_name,
        name: S.name,
        owner: S.owner?.login,
        ownerAvatar: S.owner?.avatar_url,
        desc: S.description || void 0,
        language: S.language || void 0,
        stars: S.stargazers_count,
        category: i.folder || "未分类",
        url: S.html_url || `https://github.com/${S.full_name}`,
        updatedAt: S.updated_at ? S.updated_at.split("T")[0] : void 0
      }, T);
    }
    function k() {
      i.url && window.open(i.url, "_blank", "noreferrer"), x();
    }
    async function $() {
      const T = nt.findRepository(i.fullName);
      if (!T) {
        x();
        return;
      }
      x(), await nt.confirmUnstarRepository(T);
    }
    function b(T) {
      const S = T.target;
      S?.closest(".gh-repo-context-menu") || S?.closest(".gh-inline-remark-box") || x();
    }
    function C(T) {
      T.key === "Escape" && i.visible && x();
    }
    Ke(() => t.active, (T) => {
      window.removeEventListener("pointerdown", b), window.removeEventListener("keydown", C), x(), T && (window.addEventListener("pointerdown", b), window.addEventListener("keydown", C));
    }, { immediate: !0 }), Wt(() => {
      window.removeEventListener("pointerdown", b), window.removeEventListener("keydown", C);
    });
    function P(T, S) {
      const w = T.target;
      if (w instanceof Element && w.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        T.preventDefault();
        return;
      }
      at.startDrag(S, T);
    }
    const ee = ae(() => {
      if (ke.cards.length > 0) return !1;
      const T = Tt.actionText || "";
      return !!(T.includes("正在读取") || T.includes("正在加载") || T.includes("正在统计") || T.includes("正在同步"));
    });
    return (T, S) => (a(), c(U, null, [
      s(Z).message ? (a(), c("p", kf, v(s(Z).repo ? `${s(Z).repo}：` : "") + v(s(Z).message), 1)) : D("", !0),
      o.value ? (a(), c("section", _f, [
        n("p", null, "备注草稿：" + v(s(Z).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Q(ki, {
          active: t.active
        }, null, 8, ["active"])
      ])) : D("", !0),
      s(ke).searchMessage ? (a(), c("div", xf, [
        n("span", Cf, v(s(ke).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: S[0] || (S[0] = (w) => s(at).resetSearch())
        }, "清空搜索")
      ])) : D("", !0),
      ee.value ? (a(), c("div", $f, [...S[17] || (S[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(ke).emptyMessage ? (a(), c("p", Lf, v(s(ke).emptyMessage), 1)) : D("", !0),
      s(ke).cards.length ? (a(), c("div", {
        key: 5,
        class: se(["repos gh-grid", { "gh-batch-active": s(ke).batchMode }])
      }, [
        (a(!0), c(U, null, fe(s(ke).cards, (w) => (a(), c("article", {
          key: w.fullName,
          class: se(["repo gh-card", { selected: w.selected }]),
          "data-repo-name": w.fullName,
          draggable: "true",
          onClick: (I) => h(I, w),
          onContextmenu: (I) => g(I, w),
          onDragstart: (I) => P(I, w.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: R((I) => g(I, w), ["stop"])
          }, "⋮", 8, Sf),
          n("div", Mf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: S[1] || (S[1] = R(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: w.selected,
                onChange: (I) => s(at).setSelection(w.fullName, I.target.checked)
              }, null, 40, If),
              S[18] || (S[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: w.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: S[2] || (S[2] = (I) => I.target.src = "assets/github-star.svg")
            }, null, 40, Df),
            n("a", {
              href: w.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: w.fullName
            }, [
              n("span", Ef, v(w.owner) + "/", 1),
              Oe(v(w.name), 1)
            ], 8, Af)
          ]),
          n("div", Pf, [
            n("div", Wf, [
              n("span", {
                class: se(["gh-badge-folder", { uncat: !w.folder }]),
                title: w.folder ? `文件夹：${w.folder}（点击更换）` : "未分类（点击归类）",
                onClick: R((I) => u(w, I), ["stop"])
              }, v(w.folder ? `📁 ${w.folder}` : "＋ 未分类"), 11, Bf),
              s(Z).repo === w.fullName ? (a(), ce(ki, {
                key: 0,
                active: t.active
              }, null, 8, ["active"])) : w.customRemark ? (a(), c("span", {
                key: 1,
                class: "gh-badge-remark",
                title: `备注：${w.customRemark}（点击就地修改）`,
                onClick: R((I) => M(w), ["stop"])
              }, [
                S[19] || (S[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Rf, v(w.customRemark), 1)
              ], 8, Of)) : D("", !0),
              w.showUsedStatus && w.used ? (a(), c("span", {
                key: 2,
                class: "gh-badge-used",
                title: "已标记为正在使用（点击移除）",
                onClick: R((I) => s(at).removeUsed(w.fullName), ["stop"])
              }, "⚡ 正在使用", 8, Ff)) : D("", !0),
              w.showUsedStatus && w.releaseKind !== "none" && w.releaseUrl ? (a(), c("a", {
                key: 3,
                class: se(["gh-update-badge", { latest: w.releaseKind === "latest" }]),
                href: w.releaseUrl,
                target: "_blank",
                rel: "noreferrer"
              }, v(w.releaseText), 11, Nf)) : w.showUsedStatus && w.releaseKind !== "none" ? (a(), c("span", {
                key: 4,
                class: se(["gh-update-badge", { latest: w.releaseKind === "latest" }])
              }, v(w.releaseText), 3)) : D("", !0)
            ]),
            w.descriptionKind === "analyzing" ? (a(), c("p", Hf, [...S[20] || (S[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Oe(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : w.descriptionKind === "ai" ? (a(), c("p", jf, [
              S[21] || (S[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Oe(v(w.description), 1)
            ])) : w.descriptionKind === "plain" ? (a(), c("p", {
              key: 2,
              class: "desc",
              title: w.description
            }, v(w.description), 9, zf)) : (a(), c("p", Kf, "暂无描述"))
          ]),
          n("div", Uf, [
            n("span", Vf, "★ " + v(w.stars), 1),
            w.language ? (a(), c("span", Gf, v(w.language), 1)) : D("", !0),
            w.updated ? (a(), c("span", Yf, "更新 " + v(w.updated), 1)) : D("", !0)
          ])
        ], 42, Tf))), 128))
      ], 2)) : D("", !0),
      s(ke).totalPages > 1 ? (a(), c("div", qf, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ke).page <= 1,
          onClick: S[3] || (S[3] = (w) => s(at).changePage(s(ke).page - 1))
        }, "‹ 上一页", 8, Xf),
        n("span", Jf, v(s(ke).page) + " / " + v(s(ke).totalPages) + " · 共 " + v(s(ke).totalItems) + " 个" + v(s(ke).serverPaged ? ` · 已加载 ${s(ke).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ke).page >= s(ke).totalPages,
          onClick: S[4] || (S[4] = (w) => s(at).changePage(s(ke).page + 1))
        }, "下一页 ›", 8, Qf)
      ])) : D("", !0),
      (a(), ce(ht, { to: "body" }, [
        t.active && i.visible ? (a(), c("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: me({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: S[15] || (S[15] = R(() => {
          }, ["stop"])),
          onContextmenu: S[16] || (S[16] = R(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: se(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: S[7] || (S[7] = (w) => r.value = "folder")
          }, [
            S[22] || (S[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 移动到文件夹"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: se(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: S[6] || (S[6] = R(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: se(["fo-cover-menu-item", { primary: !i.folder }]),
                type: "button",
                onClick: S[5] || (S[5] = (w) => m(""))
              }, v(i.folder ? "  " : "✓ ") + "＋ 设为未分类（清旧使用标记） ", 3),
              (a(!0), c(U, null, fe(s(nt).cats, (w) => (a(), c("button", {
                key: w,
                class: se(["fo-cover-menu-item", { primary: i.folder === w }]),
                type: "button",
                onClick: (I) => m(w)
              }, v(i.folder === w ? "✓ " : "  ") + "📁 " + v(w), 11, Zf))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: S[8] || (S[8] = (w) => r.value = null),
            onClick: S[9] || (S[9] = (w) => M())
          }, " ✏️ 编辑备注… ", 32),
          Q(pr, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: S[10] || (S[10] = (w) => r.value = null),
            onSelect: d
          }, null, 8, ["visible"]),
          i.hasRemark ? (a(), c("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: S[11] || (S[11] = (w) => r.value = null),
            onClick: f
          }, " 🗑️ 清除备注 ", 32)) : D("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: S[12] || (S[12] = (w) => r.value = null),
            onClick: p
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: S[13] || (S[13] = (w) => r.value = null),
            onClick: k
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: S[14] || (S[14] = (w) => r.value = null),
            onClick: $
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : D("", !0)
      ]))
    ], 64));
  }
}), tg = /* @__PURE__ */ Te(eg, [["__scopeId", "data-v-39777041"]]), og = { class: "gh-batch-bar-left" }, ng = { class: "gh-batch-count-tip" }, ig = { id: "gh-batch-selected-count" }, sg = {
  key: 0,
  "aria-label": "批量移动确认"
}, rg = ["disabled"], ag = ["value"], lg = ["disabled"], cg = ["disabled"], dg = { class: "gh-batch-bar-right" }, ug = ["disabled"], pg = ["disabled"], fg = ["disabled"], gg = /* @__PURE__ */ le({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Cs(), i = F(null);
    function r() {
      t.active && (o.value = nt.prepareBatchMove(), i.value = null);
    }
    async function l() {
      const h = o.value, g = i.value;
      if (!t.active || !h || g === null || wt.busy) return;
      await h.submit(g) && o.value === h && (o.value = void 0);
    }
    return Ke(() => t.active && Rt.active, (h) => {
      h || (o.value = void 0);
    }), (h, g) => (a(), c(U, null, [
      n("div", og, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: g[0] || (g[0] = (u) => s(ko).toggleSelectAll())
        }, v(s(Rt).allSelected ? "取消全选" : "全选"), 1),
        n("span", ng, [
          g[5] || (g[5] = Oe("已选择 ", -1)),
          n("b", ig, v(s(Rt).selectedCount), 1),
          g[6] || (g[6] = Oe(" 项", -1))
        ])
      ]),
      o.value ? (a(), c("section", sg, [
        n("p", null, "仅移动打开选择器时的 " + v(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          g[7] || (g[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (a(!0), c(U, null, fe(o.value.names, (u) => (a(), c("li", { key: u }, v(u), 1))), 128))
          ])
        ]),
        Be(n("select", {
          "onUpdate:modelValue": g[1] || (g[1] = (u) => i.value = u),
          "aria-label": "目标分类",
          disabled: s(wt).busy
        }, [
          g[8] || (g[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标分类", -1)),
          g[9] || (g[9] = n("option", { value: "" }, "未分类（同时清除这些仓库的旧使用标记）", -1)),
          (a(!0), c(U, null, fe(s(vo).folders.filter((u) => u.kind === "custom"), (u) => (a(), c("option", {
            key: u.title,
            value: u.title
          }, v(u.title), 9, ag))), 128))
        ], 8, rg), [
          [xi, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(wt).busy || i.value === null,
          onClick: l
        }, "确认移动", 8, lg),
        n("button", {
          type: "button",
          disabled: s(wt).busy,
          onClick: g[2] || (g[2] = (u) => o.value = void 0)
        }, "取消", 8, cg)
      ])) : D("", !0),
      n("div", dg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(wt).busy || s(Rt).selectedCount === 0,
          title: "固定当前选择，确认后批量移动",
          onClick: r
        }, " 📁 移动到文件夹 ", 8, ug),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Rt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: g[3] || (g[3] = (u) => s(ko).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, pg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Rt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: g[4] || (g[4] = (u) => s(ko).unstar())
        }, " 🗑 取消收藏 ", 8, fg)
      ])
    ], 64));
  }
}), hg = K(() => import("./GitHubWorkspaceCard-CmJpTShF.js")), mg = K(() => import("./NotificationCenter-S7v2m0Wm.js")), vg = K(() => import("./TabManagerPanel-BJoqMWvq.js")), yg = K(() => import("./BookmarkNoteMenu-DrxK4_Bo.js")), bg = K(() => import("./BookmarkPanel-Okk9LjsH.js")), wg = K(() => import("./LauncherDialogs-IsD7jfI3.js")), kg = K(() => import("./SettingsDialog-Dc_P3cix.js")), _g = K(() => import("./SettingsView-Bpaii8cE.js")), xg = K(() => import("./ClockSettingsMenu-BKg5Y_Lq.js")), Cg = K(() => import("./BiliTheaterDialog-Bzs_uGV6.js")), $g = K(() => import("./BiliMiniPlayer-tvX60rNB.js")), Lg = K(() => import("./BiliMessagePanel-Caj85Fz1.js")), Tg = K(() => import("./ModelPricingCard-CBQlK0ij.js")), Sg = K(() => import("./BilibiliWorkspace-BP6tb3ha.js")), Mg = K(() => import("./YouTubeCard-BF-2UoMR.js").then((e) => e.Y)), Ig = K(() => import("./AihotFeed-DAILLW96.js")), Dg = K(() => import("./GitHubTrending-C3HByV15.js")), Ag = K(() => import("./AiDialog-MypSB-Me.js")), Eg = K(() => import("./AihotViewer-BVN-_XYA.js")), Pg = K(() => import("./NavWheelOverlay-C6XA6QQN.js")), Wg = K(() => import("./StandaloneHost-QNMIJWIt.js")), Bg = K(() => import("./LauncherFolderDialog-FeQ33l2T.js")), Og = K(() => import("./LauncherMenus-BRffjFyr.js"));
function ne(e, t, o, i) {
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
      const h = l.innerHTML, g = Li(o);
      g.config.errorHandler = (u, x, m) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${m})`, u), l.dataset.vueError = "1";
      };
      try {
        g.mount(l), i?.setMounted?.(!0);
      } catch (u) {
        throw i?.setMounted?.(!1), l.innerHTML = h, u;
      }
      return () => {
        i?.setMounted?.(!1), g.unmount();
      };
    }
  });
}
function Rg(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!gt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Li(Ep);
      let i = !1;
      const r = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), o.mount(t);
      const l = window.setTimeout(() => {
        gt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (r(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(l), window.removeEventListener("logicweaver:intro-complete", r), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ne(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Cp), document.getElementById("vue-spa-root") || ne(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Wg), ne(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Xi), ne(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Pp, To), ne(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Wp, Nn), ne(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, qi, ct), ne(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, Vi), ne(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, _i), ne(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Gi, ze), ne(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Yi, $e), ne(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Ui), ne(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, hg), ne(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Np, On), ne(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, Zp, St), ne(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, hf, wo), ne(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, tg, at), ne(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, gg, ko), ne(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, mg, xt), ne(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, vg, Hi), ne(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, yg, Bn), ne(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, wg, _o), ne(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Bg, kt), ne(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Og, Qt), ne(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, bg, en), ne(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, qo), ne(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, _g), ne(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, kg, tn), ne(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, xg, Dt), ne(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Cg, xo), ne(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, $g), ne(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Ag, Hn), ne(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Eg, Fn), ne(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Pg, be), ne(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Lg, Mt), ne(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Tg, Pi), ne(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Sg, Ai), ne(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Mg, Mi), ne(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Ig, Ei), ne(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Dg, ji);
}
ws();
const nn = mr(on);
Nr(on, nn);
Hr(on);
Rg(nn);
Wn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-DHlNFi_a.js"), await nn.startEager(), gt.finish("BOOT COMPLETE / 首页加载完成");
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  nn.stopAll();
}, { once: !0 });
export {
  ei as C,
  Mu as D,
  tg as G,
  hi as L,
  Kc as T,
  Zp as _,
  gg as a,
  hf as b,
  Np as c,
  Hi as d,
  Dt as e,
  ti as f,
  ji as g,
  sh as h,
  ye as i,
  Hn as j,
  be as k,
  Zo as l,
  Vc as m,
  X as n,
  Gc as o,
  Uc as p,
  Wp as q,
  Pp as r,
  Ae as s,
  zo as t,
  Ki as u,
  on as v
};
