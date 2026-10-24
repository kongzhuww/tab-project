import { _ as an, d as $e, r as rn, a as Mo, i as ps } from "./dock-lifecycle.store-Bdu4epCV.js";
/* empty css                */
import { r as Te, e as vt, b as H, f as de, g as p, I as re, K as Wt, x as d, h as w, i as n, u as B, L as hs, t as _, F as ne, z as ve, k as V, T as ut, A as vi, q as Oe, Q as gs, j as Xe, v as io, y as fs, O as ms, c as ae, w as Ze, d as Ft, D as Ot, B as we, s as he, o as Ue, l as q, J as j, n as Ro, m as Yt, N as $o, S as it, a as lo, U as ln, H as ws, p as cn } from "./vendor-vue-BUkfvXUI.js";
import { bj as nt, bk as zo, w as Ie, bl as co, l as ie, o as Ho, bm as Eo, k as bi, q as ys, s as vs, h as We, r as gt, y as ki, bn as Po, j as Pi, x as Ii, aw as dn, g as un, aB as pn, aD as hn, aF as gn, n as St, bo as xe, b as K, a4 as fn, u as no, bp as bs, M as Nt, t as Dt, bq as uo, I as ks, i as Cs, br as po } from "./search.service-BE0VV64-.js";
import { f as Ge, b as dt, a as ke, p as _s, l as Zt, c as At, d as oe, e as Ct } from "./store-CU3UDMr2.js";
import { o as xs, t as Ts } from "./task-navigation-DGbsSQqt.js";
import { t as Ls, a as Ss, d as Ds } from "./main-workspace-store-MJn0Q4qx.js";
import { todoistCalendarSidebarController as qt } from "./calendar-sidebar-store-PcAZpNPl.js";
import { W as Io, b as Ms, i as $s, g as Es, e as Ps } from "./view-styles-Ph_4ONPd.js";
import { w as Ae, m as Ci, P as Is, E as Ao, F as Uo, o as Ai, g as Wo, q as As, L as Ws, p as so, D as Os } from "./read-session-BWENvNUM.js";
import { s as Go } from "./store-9q9o9-jB.js";
import { c as ft, b as eo, d as Bs, g as Fs, a as Ns } from "./up-group-manager-store-BTqUKATb.js";
import { b as mn, r as Rs, e as Ht } from "./bili-favorites-store-8E9J27X0.js";
import { a as Hs, s as Gs } from "./stickers.service-CA_k686q.js";
import { c as _i, a as wn, b as js } from "./aihot-feed-store-DsgeWww_.js";
import { w as Ks } from "./module-state-BVJNDzfS.js";
import { a as yn } from "./pricing-store-G1eKq-ME.js";
import { a as vn } from "./youtube-store-CosxBVAL.js";
import { g as bn, f as Vs, _ as zs, d as Us, h as Ys, e as qs } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-DBsDDGNp.js";
import { f as at } from "./fullscreen-cards.store-9LfnT9xe.js";
import { k as Xs, m as Js } from "./core-utils-CKNM9kLY.js";
import { _ as Ee } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { u as kn } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DNUqqaI7.js";
import { t as qe } from "./together-listen.store-CFrDNCp-.js";
import { L as Wi, a as Oi } from "./LauncherTileContent-BomyFM4D.js";
const Qs = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Zs() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !Qs.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
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
    const v = t.get(l);
    return v ? (v.abort(), t.delete(l), !0) : !1;
  }
  async function s(l, v, k = "api") {
    const $ = e.get(l);
    if (!$) throw new Error(`Unknown command: ${l}`);
    if ($.enabled && !$.enabled()) return;
    const u = $.concurrency || "replace";
    if (t.has(l)) {
      if (u === "drop") return;
      u === "replace" && i(l);
    }
    const a = new AbortController();
    u !== "parallel" && t.set(l, a);
    try {
      return await $.run(v, { signal: a.signal, source: k });
    } finally {
      t.get(l) === a && t.delete(l);
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
    return Object.freeze([...e.values()].map(r).sort((l, v) => l.category.localeCompare(v.category, "zh") || l.title.localeCompare(v.title, "zh")));
  }
  function h(l, v = 20) {
    const k = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!k.length) return g().slice(0, v);
    const $ = [...e.values()].map((u) => {
      const a = r(u), c = a.title.toLocaleLowerCase(), f = `${a.id} ${c} ${a.category} ${a.description} ${a.keywords.join(" ")}`.toLocaleLowerCase();
      if (!k.every((T) => f.includes(T))) return null;
      let y = 0;
      for (const T of k)
        a.id === T ? y += 200 : a.id.startsWith(T) && (y += 120), c === T ? y += 160 : c.startsWith(T) ? y += 100 : c.includes(T) && (y += 60), a.keywords.some((x) => x.toLocaleLowerCase().startsWith(T)) && (y += 40);
      return { item: a, score: y };
    }).filter((u) => !!u);
    return $.sort((u, a) => a.score - u.score || u.item.title.localeCompare(a.item.title, "zh")), Object.freeze($.slice(0, Math.max(1, v)).map((u) => u.item));
  }
  return Object.freeze({ register: o, execute: s, cancel: i, has: (l) => e.has(l), list: g, search: h });
}
const yt = Zs(), ea = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function ta(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  function r(u) {
    if (!u || !ea.test(u.id)) throw new TypeError(`Invalid feature id: ${u?.id || ""}`);
    if (!u.title?.trim() || typeof u.mount != "function") throw new TypeError(`Feature ${u.id} requires title and mount()`);
    if (t.has(u.id)) throw new Error(`Feature already registered: ${u.id}`);
    return t.set(u.id, Object.freeze({
      ...u,
      order: Number(u.order) || 100,
      eager: u.eager === !0,
      roots: Object.freeze([...u.roots || []]),
      capabilities: Object.freeze([...u.capabilities || []])
    })), () => {
      l(u.id), s.delete(u.id), t.delete(u.id);
    };
  }
  function g(u) {
    return typeof u == "function" ? u : u && typeof u.unmount == "function" ? () => u.unmount() : () => {
    };
  }
  function h(u) {
    if (o.has(u)) return Promise.resolve(o.get(u)?.cleanup);
    if (i.has(u)) return i.get(u);
    const a = t.get(u);
    if (!a) return Promise.reject(new Error(`Unknown feature: ${u}`));
    s.delete(u);
    const c = new AbortController(), f = Object.freeze({
      signal: c.signal,
      commands: e,
      getRoot: (T) => document.getElementById(T)
    }), y = Promise.resolve().then(() => a.mount(f)).then((T) => (i.delete(u), o.set(u, { cleanup: T, controller: c }), T), (T) => {
      throw i.delete(u), s.set(u, T), c.abort(), T;
    });
    return i.set(u, y), y;
  }
  async function l(u) {
    const a = i.get(u);
    if (a)
      try {
        await a;
      } catch {
        return;
      }
    const c = o.get(u);
    c && (o.delete(u), c.controller.abort(), await g(c.cleanup)());
  }
  async function v() {
    const u = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), a = [...t.values()].filter((y) => !(!y.eager || !u && y.roots && y.roots.length > 0 && !y.roots.some((x) => !!document.getElementById(x)))).sort((y, T) => (y.order || 100) - (T.order || 100)), f = (await Promise.allSettled(a.map((y) => h(y.id)))).flatMap((y, T) => y.status === "rejected" ? [{ id: a[T].id, reason: y.reason }] : []);
    f.length && console.warn("LogicWeaver Vue features failed to mount", f);
  }
  async function k() {
    const u = [...o.keys()].reverse();
    await Promise.allSettled(u.map(l));
  }
  function $() {
    return Object.freeze([...t.values()].map((u) => Object.freeze({
      id: u.id,
      title: u.title,
      order: u.order || 100,
      eager: u.eager === !0,
      roots: Object.freeze([...u.roots || []]),
      capabilities: Object.freeze([...u.capabilities || []]),
      status: i.has(u.id) ? "mounting" : o.has(u.id) ? "mounted" : s.has(u.id) ? "failed" : "registered",
      error: s.has(u.id) ? String(s.get(u.id)?.message || s.get(u.id) || "Feature mount failed") : ""
    })).sort((u, a) => u.order - a.order));
  }
  return Object.freeze({ register: r, start: h, startEager: v, stop: l, stopAll: k, has: (u) => t.has(u), list: $ });
}
const oa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", Bi = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader");
    return e === "0" || e === "false" || t === "0" || t === "false" || document.documentElement.classList.contains("skip-endfield-loader");
  } catch {
    return !1;
  }
})(), Ce = Te({
  enabled: !Bi,
  style: oa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: Bi,
  exiting: !1,
  forced: !1
});
let Bt = 0, Oo = 4, Cn = performance.now(), pi = 0, xo = null;
function _n(e) {
  const t = e - Cn, o = pi ? Math.min(1, t / pi) : 1, i = o * o * (3 - 2 * o);
  Ce.renderedProgress = Oo + (Ce.targetProgress - Oo) * i, o < 1 && !Ce.finished ? Bt = requestAnimationFrame(_n) : Bt = 0;
}
function ia(e, t) {
  if (!Ce.enabled || Ce.finished) return;
  const o = Math.max(Ce.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (Ce.status = t), Oo = Ce.renderedProgress, Ce.targetProgress = o, Cn = performance.now(), pi = Math.max(280, Math.min(920, 220 + Math.abs(o - Oo) * 7.5)), cancelAnimationFrame(Bt), Bt = requestAnimationFrame(_n);
}
function xn(e = "Ready", t = !1) {
  Ce.finished || (Ce.finished = !0, Ce.forced = t, Ce.status = e, Ce.targetProgress = 100, cancelAnimationFrame(Bt), Bt = 0, Ce.renderedProgress = 100, xo?.(t));
}
function na(e = "KEYBOARD SKIP") {
  xn(e, !0);
}
const Re = vt(Ce), rt = Object.freeze({
  update: ia,
  finish: xn,
  skip: na,
  get enabled() {
    return Ce.enabled;
  },
  get finished() {
    return Ce.finished;
  }
});
function sa(e) {
  return xo = e, Ce.finished && e(Ce.forced), () => {
    xo === e && (xo = null);
  };
}
const Tn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Ln = "lw_weather_snapshot_v1";
function aa() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Ln);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Tn,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function ho(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Ln,
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
const ra = () => {
  const e = aa();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Tn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, N = Te(ra());
let Yo = null, qo = null;
const Ve = {
  get snapshot() {
    return vt(N);
  },
  update(e) {
    Object.assign(N, e), ho(N);
  },
  unconfigured() {
    Object.assign(N, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (N.data) {
      e && (N.city = e);
      return;
    }
    Object.assign(N, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(N, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), ho(N);
  },
  notFound(e = "") {
    Object.assign(N, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    N.data || Object.assign(N, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (N.city = e), N.forecastModalOpen = !0;
  },
  closeForecastModal() {
    N.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    N.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], ho(N);
  },
  setDetailInfo(e) {
    N.detailInfo = { ...e }, ho(N);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    Yo ? Yo() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    qo ? qo(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Yo = e;
  },
  setChangeLocationAction(e) {
    qo = e;
  }
}, la = () => ({
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
}), ge = Te(la());
let Xo = null;
const Mt = {
  get snapshot() {
    return vt(ge);
  },
  update(e) {
    Object.assign(ge, e);
  },
  updateTime(e, t, o, i) {
    ge.timeText = e, ge.secsText = t, ge.greetingText = o, ge.dateText = i, ge.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (ge.fontFamily = e.fontFamily), e.colorHex !== void 0 && (ge.colorHex = e.colorHex), e.greetColor !== void 0 && (ge.greetColor = e.greetColor), e.dateColor !== void 0 && (ge.dateColor = e.dateColor), e.isBlack !== void 0 && (ge.isBlack = e.isBlack), e.isCustomColor !== void 0 && (ge.isCustomColor = e.isCustomColor), ge.updatedAt = Date.now();
  },
  openSettings(e) {
    Xo ? Xo(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Xo = e;
  }
}, ca = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], da = () => ({
  mounted: !1,
  visible: !1,
  items: [...ca]
}), Jo = Te(da());
let go = {};
const xi = {
  getSnapshot() {
    return vt(Jo);
  },
  update(e) {
    Object.assign(Jo, e);
  },
  setMounted(e) {
    Jo.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (go.open) {
      go.open(e);
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
    const s = document.getElementById(`${e}-top-open`);
    s && !t ? s.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    go = { ...go, ...e };
  }
}, $t = Te({
  monthTitle: "",
  summary: "Todoist 截止日期",
  selectedDate: "",
  detailDate: "",
  detailCount: "",
  cells: [],
  detailTasks: [],
  detailEvents: [],
  dropDate: ""
});
let ze = {}, Sn = !1;
function ua(e) {
  Object.assign($t, e, {
    cells: e.cells ? [...e.cells] : $t.cells,
    detailTasks: e.detailTasks ? [...e.detailTasks] : $t.detailTasks,
    detailEvents: e.detailEvents ? [...e.detailEvents] : $t.detailEvents
  });
}
function pa(e) {
  ze = Object.freeze({ ...e });
}
function ha(e) {
  const t = Object.freeze({ ...e });
  return ze = t, () => {
    ze === t && (ze = {});
  };
}
function ga(e) {
  Sn = e;
}
function Dn(e) {
  $t.dropDate = String(e || "");
}
function fa(e) {
  ze.selectDate?.(e);
}
function ma() {
  ze.previousMonth?.();
}
function wa() {
  ze.nextMonth?.();
}
function ya() {
  ze.goToday?.();
}
function va() {
  ze.closeDetail?.();
}
async function ba(e, t) {
  await ze.dropTask?.(e, t);
}
function ka(e, t = !1) {
  ze.openTask?.(e, t);
}
function Ca(e) {
  Dn(e), ze.highlightDrop?.(e);
}
const hi = Object.freeze({
  update: ua,
  setActions: pa,
  attachActions: ha,
  setMounted: ga,
  setDropDate: Dn,
  selectDate: fa,
  previousMonth: ma,
  nextMonth: wa,
  goToday: ya,
  closeDetail: va,
  dropTask: ba,
  openTask: ka,
  highlightDrop: Ca,
  get snapshot() {
    return $t;
  },
  get active() {
    return Sn;
  }
}), Qo = Te({ visible: !1, pendingWrites: 0 });
async function _a(e) {
  if (Qo.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  Qo.pendingWrites++;
  try {
    return await e();
  } finally {
    Qo.pendingWrites--;
  }
}
const Fi = {
  openDialog() {
    Ae.open("wallpaper");
  },
  closeDialog() {
    Ae.close("wallpaper");
  },
  resetDefault() {
    return _a(() => Io.clearWallpaper());
  }
};
function xa() {
  return {
    hasMemory: !1,
    usedMB: "--",
    totalMB: "--",
    limitMB: "--",
    pct: 0,
    color: "#34d399",
    cores: "多核心",
    ram: "标准内存",
    domCount: 0,
    styleCount: 0,
    netDownlink: "高速通道",
    netRtt: "--",
    netType: "局域网/光纤",
    gpuRenderer: "检测中…",
    gpuVendor: "未知",
    canvasHash: "#UNKNOWN",
    dpr: "1x",
    screenRes: "1920 × 1080",
    colorGamut: "sRGB 标准色域",
    fps: 60,
    frameMs: "16.6",
    fpsStatus: "极佳",
    fpsColor: "#34d399",
    storageUsage: "--",
    storageQuota: "--",
    storageStatus: "OPFS / 本地存储就绪",
    platformStr: "Windows",
    timeZone: "Asia/Shanghai (UTC+8)",
    localeStr: "zh-CN",
    privacyStr: "标准网络请求",
    touchPoints: "无触控 (键鼠环境)"
  };
}
const F = Te({
  mounted: !1,
  isOpen: !1,
  isTechDrawerOpen: !1,
  userAvatar: "assets/bilibili.svg",
  userName: "浏览器指纹与环境",
  metrics: xa()
});
let Zo = null, _t = null;
const ao = {
  state: F,
  setMounted(e) {
    F.mounted = e;
  },
  onAction(e) {
    Zo = e;
  },
  dispatch(e, t) {
    if (Zo)
      return Zo(e, t);
  },
  setUserInfo(e, t) {
    e && (F.userAvatar = e), t && (F.userName = t);
  },
  setMetrics(e) {
    Object.assign(F.metrics, e);
  },
  sampleMetrics() {
    try {
      const e = window.performance;
      if (e?.memory) {
        const h = (e.memory.usedJSHeapSize / 1048576).toFixed(1), l = (e.memory.totalJSHeapSize / (1024 * 1024)).toFixed(1), v = (e.memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(0), k = e.memory.jsHeapSizeLimit || 4096 * 1024 * 1024, $ = Math.max(1, Math.round(e.memory.usedJSHeapSize / k * 100));
        F.metrics.hasMemory = !0, F.metrics.usedMB = h, F.metrics.totalMB = l, F.metrics.limitMB = v, F.metrics.pct = $, F.metrics.color = "#34d399";
      }
      F.metrics.cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} 逻辑核心` : "多核心", F.metrics.ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB+ 内存` : "标准内存", F.metrics.domCount = document.getElementsByTagName("*").length, F.metrics.styleCount = document.styleSheets.length;
      const t = navigator.connection;
      F.metrics.netDownlink = t?.downlink ? `${t.downlink} Mbps` : "高速通道", F.metrics.netRtt = t?.rtt ? `${t.rtt} ms` : "--", F.metrics.netType = t?.effectiveType ? t.effectiveType.toUpperCase() : "局域网/光纤";
      try {
        const h = document.createElement("canvas"), l = h.getContext("webgl") || h.getContext("experimental-webgl");
        if (l) {
          const v = l.getExtension("WEBGL_debug_renderer_info");
          if (v) {
            const k = l.getParameter(v.UNMASKED_RENDERER_WEBGL) || "", $ = l.getParameter(v.UNMASKED_VENDOR_WEBGL) || "";
            F.metrics.gpuRenderer = k.replace(/^ANGLE \((.+)\)$/, "$1").replace(/Direct3D\d+.*$/, "").trim() || k, F.metrics.gpuVendor = $;
          } else
            F.metrics.gpuRenderer = "标准 WebGL 管线", F.metrics.gpuVendor = l.getParameter(l.VENDOR) || "未知";
        }
      } catch {
        F.metrics.gpuRenderer = "未知显卡", F.metrics.gpuVendor = "未知";
      }
      try {
        const h = document.createElement("canvas");
        h.width = 120, h.height = 30;
        const l = h.getContext("2d");
        if (l) {
          l.textBaseline = "top", l.font = "14px -apple-system, sans-serif", l.fillStyle = "#f60", l.fillRect(10, 5, 40, 15), l.fillStyle = "#069", l.fillText("LogicWeaver", 2, 8);
          const v = h.toDataURL();
          let k = 2166136261;
          for (let $ = 0; $ < v.length; $++)
            k ^= v.charCodeAt($), k = Math.imul(k, 16777619);
          F.metrics.canvasHash = `#${(k >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
        }
      } catch {
        F.metrics.canvasHash = "#UNKNOWN";
      }
      F.metrics.dpr = window.devicePixelRatio ? `${window.devicePixelRatio}x` : "1x", F.metrics.screenRes = `${window.screen.width} × ${window.screen.height}`;
      const o = window.matchMedia("(color-gamut: p3)").matches;
      F.metrics.colorGamut = o ? "Display P3 广色域" : "sRGB 标准色域";
      const i = navigator;
      F.metrics.platformStr = i.userAgentData?.platform || navigator.platform || "Windows";
      const s = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai", r = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 60;
      F.metrics.timeZone = `${s} (UTC${r >= 0 ? "+" : ""}${r})`, F.metrics.localeStr = navigator.languages ? navigator.languages.slice(0, 3).join(", ") : navigator.language || "zh-CN", F.metrics.touchPoints = navigator.maxTouchPoints > 0 ? `${navigator.maxTouchPoints} 点电容触控` : "无触控 (键鼠环境)";
      const g = navigator.doNotTrack === "1" || navigator.globalPrivacyControl;
      F.metrics.privacyStr = g ? "DNT/GPC 已开启" : "标准网络请求", this.startFpsSampling(), this.sampleStorage();
    } catch {
    }
  },
  startFpsSampling() {
    this.stopFpsSampling();
    let e = 0;
    const t = performance.now(), o = (i) => {
      if (e++, e < 10)
        _t = requestAnimationFrame(o);
      else {
        const s = i - t, r = Math.min(240, Math.round(e / (s / 1e3) * 10) / 10), g = (s / e).toFixed(1);
        F.metrics.fps = r, F.metrics.frameMs = g, r >= 55 ? (F.metrics.fpsStatus = "极佳", F.metrics.fpsColor = "#34d399") : r >= 30 ? (F.metrics.fpsStatus = "良好", F.metrics.fpsColor = "#fbbf24") : (F.metrics.fpsStatus = "轻微波动", F.metrics.fpsColor = "#f87171"), _t = null;
      }
    };
    _t = requestAnimationFrame(o);
  },
  stopFpsSampling() {
    _t && (cancelAnimationFrame(_t), _t = null);
  },
  sampleStorage() {
    navigator.storage?.estimate ? navigator.storage.estimate().then((e) => {
      const t = e.usage ? `${Math.max(1, Math.round(e.usage / 1048576))} MB` : "微量", o = e.quota ? `${Math.round(e.quota / (1024 * 1024 * 1024))} GB` : "--";
      F.metrics.storageUsage = t, F.metrics.storageQuota = o, F.metrics.storageStatus = `已用 ${t} / 配额 ${o} (OPFS 就绪)`;
    }).catch(() => {
      F.metrics.storageStatus = "OPFS / IndexedDB 就绪";
    }) : F.metrics.storageStatus = "OPFS / 本地存储就绪";
  },
  runGarbageCollectionHint() {
    try {
      const e = window;
      typeof e.gc == "function" && e.gc();
    } catch {
    }
    this.sampleMetrics(), this.dispatch("gc-triggered");
  },
  openPanel() {
    F.isOpen = !0, this.sampleMetrics(), this.dispatch("open");
  },
  closePanel() {
    F.isOpen = !1, F.isTechDrawerOpen = !1, this.stopFpsSampling(), this.dispatch("close");
  },
  open() {
    this.openPanel();
  },
  close() {
    this.closePanel();
  },
  toggle(e) {
    e === !0 || e === void 0 && !F.isOpen ? this.open() : this.close();
  },
  toggleTechDrawer(e) {
    F.isTechDrawerOpen = e !== void 0 ? e : !F.isTechDrawerOpen, this.dispatch("toggle-tech-drawer", F.isTechDrawerOpen);
  },
  refresh() {
    this.sampleMetrics(), this.dispatch("refresh");
  }
}, Ni = [
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
], Ch = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], ye = Te({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let ei = null;
const mt = {
  state: ye,
  setMounted(e) {
    ye.mounted = e;
  },
  onAction(e) {
    ei = e;
  },
  dispatch(e, t) {
    if (ei)
      return ei(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, s = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? i / 2, g = e?.clientY ?? e?.y ?? s / 2, h = Math.max(12, Math.min(r - 40, i - 290 - 12)), l = Math.max(12, Math.min(g + 10, s - 420 - 12));
    ye.x = h, ye.y = l, ye.isOpen = !0, this.dispatch("open", { x: h, y: l });
  },
  close() {
    ye.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    ye.font = e;
    const t = Ni.find((o) => o.id === e);
    if (t) {
      Mt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: ye.color, timezone: ye.timezone });
  },
  setColor(e) {
    ye.color = e;
    const t = Ri.find((o) => o.id === e);
    if (t) {
      Mt.applyConfig({
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
    this.dispatch("change", { font: ye.font, color: e, timezone: ye.timezone });
  },
  setTimezone(e) {
    ye.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: ye.font, color: ye.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        ye.font = e;
        const i = Ni.find((s) => s.id === e);
        i && Mt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        ye.color = t;
        const i = Ri.find((s) => s.id === t);
        i && Mt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (ye.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (ye.font = e.font), e.color && (ye.color = e.color), e.timezone && (ye.timezone = e.timezone);
  }
}, se = Te({
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
let ti = null, To = !1;
async function Lo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: se.model };
  if (e === "connect") return { state: "ready", model: se.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Mn(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), se.statusText = o, se.authHidden = !e.loginUrl, se.authCode = e.loginCode || "", se.authLink = e.loginUrl || "https://auth.openai.com/codex/device", se.isStreaming = To || e.busy || e.state === "running";
}
async function Ta() {
  try {
    const e = await Lo("poll");
    Mn(e);
  } catch {
  }
}
async function La(e, t) {
  if (e === "open" || e === "connect")
    try {
      se.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Lo("connect");
      Mn(o);
    } catch (o) {
      se.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    se.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), se.inputText = "", se.isStreaming = !0, To = !0;
    try {
      await Lo("send", { text: o }), await Ta();
    } catch (i) {
      se.statusText = i?.message || "发送失败";
    } finally {
      To = !1, se.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Lo("stop");
    } catch {
    }
    se.isStreaming = !1, To = !1;
  }
}
const Ti = {
  state: se,
  setMounted(e) {
    se.mounted = e;
  },
  onAction(e) {
    ti = e;
  },
  dispatch(e, t) {
    if (ti)
      return ti(e, t);
    La(e, t);
  },
  open() {
    se.isOpen = !0, this.dispatch("open");
  },
  close() {
    se.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    se.messages = [], se.inputText = "", se.kwShelfHidden = !0, se.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = se.inputText.trim();
    !e || se.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    se.isStreaming = !1, this.dispatch("stop");
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
    se.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    se.keywords[e] && (se.keywords[e].selected = !se.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: se.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = se.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, oi = Te({
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
}), fo = /* @__PURE__ */ new Set(), Sa = {
  state: oi,
  open(e) {
    Object.assign(oi, e, { open: !0 });
  },
  update(e) {
    Object.assign(oi, e);
  },
  close() {
    fo.forEach((e) => e("close"));
  },
  save(e) {
    fo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return fo.add(e), () => fo.delete(e);
  }
}, ii = "biliProfileCacheV1", tt = "biliLocallyKnownMessageIdsV1", mo = "biliMessageUserCacheV1", Gt = "githubKnownReleaseVersionsV1", wo = "customNewtabAvatar", Hi = "biliToastKnownCountsV1";
class Da {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Gt]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
    return ["reply", "at", "like", "system", "private"].forEach((s) => {
      const r = Math.max(0, Number(this.unread?.[s] || 0));
      let g = Array.isArray(this.locallyKnownIds?.[s]) ? this.locallyKnownIds[s] : [];
      r < g.length && (g = [], this.locallyKnownIds[s] = [], o = !0), t[s] = Math.max(0, r - g.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [tt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let s = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), s = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), s = !0), s && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [tt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const r of o) r && i.add(r);
    const s = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < s) {
      const r = s - i.size;
      for (let g = 0; g < r; g++) i.add(`__pad_${Date.now()}_${g}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [tt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const s = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread(), g = Object.values(r).reduce((h, l) => h + (l || 0), 0);
    if (nt.avatarUrl = s, nt.userName = t?.uname || "哔哩哔哩用户", nt.buttonTitle = this.customAvatar ? "打开信息中心" : t ? `${t.uname} · B站消息` : "未登录 B站", nt.unreadCount = g, zo.avatarUrl = s, zo.userName = t?.uname || "浏览器指纹与环境", zo.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = s);
      const l = document.getElementById("bili-profile-button");
      l && (l.title = nt.buttonTitle);
    }
    ao.setUserInfo(s, t?.uname || "浏览器指纹与环境"), ft.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: s,
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
        }, [s, r, g] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((a) => a.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((a) => a.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((a) => a.json())
        ]), h = s.status === "fulfilled" ? s.value?.data || {} : {}, l = r.status === "fulfilled" ? r.value?.data || {} : {}, v = g.status === "fulfilled" ? g.value?.data || {} : {}, k = Number(l.at || 0), $ = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - k), u = {
          reply: Math.max(Number(h.reply || 0), $),
          at: Math.max(Number(h.at || 0), k),
          like: Math.max(
            Number(h.like || h.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(h.sys_msg || h.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            h.chat || l.chat || Number(v.follow_unread || 0) + Number(v.unfollow_unread || 0) + Number(v.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, u), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [ii]: { profile: i, unread: u, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(u);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Hi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const s = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Hi]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && Ie.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: i > 1 ? `收到 ${i} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        ft.openPanel();
      }
    }), s > 0 && Ie.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: s > 1 ? `收到 ${s} 条新回复` : "收到新的评论回复",
      subtitle: "评论回复通知",
      message: "有人在评论区回复了你",
      actionLabel: "查看回复",
      showActions: !0,
      onClick: () => {
        ft.openPanel();
      }
    }), r > 0 && Ie.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: r > 1 ? `收到 ${r} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        ft.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, co.setActions({
      onAction: async (t) => {
        if (t === "messages")
          ao.open();
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
      ii,
      tt,
      mo,
      Gt,
      wo
    ]).then((t) => {
      this.customAvatar = t[wo] || "", this.locallyKnownIds = t[tt] && typeof t[tt] == "object" ? t[tt] : {}, this.userCache = t[mo] && typeof t[mo] == "object" ? t[mo] : {}, this.githubKnownVersions = t[Gt] && typeof t[Gt] == "object" ? t[Gt] : {};
      const o = t[ii];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[wo] && (this.customAvatar = t[wo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[tt] && (this.locallyKnownIds = t[tt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), ft.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const Gi = new Da(), $n = Te({ visible: !1, active: !1 }), ni = Te({
  get isOpen() {
    return $n.visible;
  },
  title: "任务日历",
  summary: "Todoist 截止日期",
  statusText: "",
  isLoading: !1
});
let xt;
const _e = {
  get state() {
    return ni;
  },
  get ready() {
    return !!xt && $n.active;
  },
  attach(e) {
    return xt = e, () => {
      xt === e && (xt = void 0);
    };
  },
  updateState(e) {
    Object.assign(ni, e);
  },
  open() {
    Ae.open("calendar");
  },
  close() {
    Ae.close("calendar");
  },
  refresh() {
    return this.ready ? xt.refresh() : (this.setStatusText("请先打开日历并等待窗口就绪。"), Promise.resolve(!1));
  },
  goToday() {
    if (!this.ready) {
      this.setStatusText("请先打开日历并等待窗口就绪。");
      return;
    }
    xt.goToday();
  },
  openTodoist() {
    Ae.open("todoist");
  },
  setStatusText(e) {
    ni.statusText = e;
  }
}, ji = "todoistCalendarCacheV1", si = "googleCalendarDayLineCacheV1", yo = "googleCalendarSessionTokenV1", ai = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", Ma = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
function Ki(e) {
  return typeof window.storageGet == "function" ? window.storageGet(e) : new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(e, t) : t({});
  });
}
async function ri(e) {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  await chrome.storage.local.set(e);
}
class $a {
  constructor() {
    this.todoistTasks = [], this.currentMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1), this.selectedDate = "", this.dropDate = "", this.todoistSavedAt = 0, this.isTodoistLoading = !1, this.googleCalendars = [], this.googleEvents = [], this.googleLinks = {}, this.googleSavedAt = 0, this.googleRangeStart = "", this.googleRangeEnd = "", this.isGoogleConnected = !1, this.isGoogleLoading = !1, this.isGoogleSyncing = !1, this.googleLastError = null, this.googleWaiters = [], this.initialized = !1, this.initialization = null, this.todoistLoad = null, this.taskRevision = 0, this.taskReadSequence = 0, this.taskWrites = /* @__PURE__ */ new Set(), this.initControllers();
  }
  init() {
    return this.initialization ? this.initialization : this.initialized ? Promise.resolve() : (this.initialization = this.initializeData().then(() => {
      this.initialized = !0;
    }).finally(() => {
      this.initialization = null;
    }), this.initialization);
  }
  async initializeData() {
    try {
      const o = (await Ki([si]))?.[si];
      o && Array.isArray(o.events) && (this.googleCalendars = o.calendars || [], this.googleEvents = o.events || [], this.googleSavedAt = Number(o.savedAt || 0), this.googleRangeStart = String(o.rangeStart || ""), this.googleRangeEnd = String(o.rangeEnd || ""), this.googleEvents.length > 0 && (this.isGoogleConnected = !0));
    } catch (t) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", t);
    }
    this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  initControllers() {
    qt.onAction(async (t, o) => {
      if (t === "init")
        try {
          await this.init(), this.syncSidebarToVue();
        } catch {
          _e.setStatusText("日历初始化未完成，请稍后重新打开。");
        }
      else if (t === "toggle-collapsed") {
        const i = !qt.state.collapsed;
        qt.setCollapsed(i);
        try {
          localStorage.setItem("lw_todoist_cal_collapsed", i ? "1" : "0");
        } catch {
        }
      } else if (t === "today")
        this.goToday();
      else if (t === "prev-month")
        this.changeMonth(-1);
      else if (t === "next-month")
        this.changeMonth(1);
      else if (t === "prev-year")
        this.currentMonth = new Date(this.currentMonth.getFullYear() - 1, this.currentMonth.getMonth(), 1), this.publishCalendarViews();
      else if (t === "next-year")
        this.currentMonth = new Date(this.currentMonth.getFullYear() + 1, this.currentMonth.getMonth(), 1), this.publishCalendarViews();
      else if (t === "select-date")
        this.selectDate(o);
      else if (t === "drop-task") {
        const { taskId: i, date: s } = o;
        this.highlightDrop(""), await this.assignTaskToDate(i, s);
      }
    });
  }
  dateKey(t) {
    const o = t.getFullYear(), i = String(t.getMonth() + 1).padStart(2, "0"), s = String(t.getDate()).padStart(2, "0");
    return `${o}-${i}-${s}`;
  }
  friendlyDate(t) {
    const o = /* @__PURE__ */ new Date(`${t}T00:00:00`);
    return Number.isFinite(o.getTime()) ? o.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" }) : t;
  }
  async loadGoogleCalendarClientId() {
    const t = await Ki(["gmailOAuthClientId"]);
    let o = String(t.gmailOAuthClientId || "").trim();
    if (!o && typeof chrome < "u" && chrome.runtime?.getURL)
      try {
        const i = await fetch(chrome.runtime.getURL("gmail-oauth-client.local.json"), { cache: "no-store" });
        if (i.ok) {
          const s = await i.json();
          o = String(s.clientId || "").trim();
        }
      } catch {
      }
    return o;
  }
  async googleCalendarToken(t = !1) {
    if (typeof chrome > "u" || !chrome.storage?.local) return "";
    const i = (await chrome.storage.local.get(yo))[yo];
    if (i?.token && i.scope === ai && Number(i.expiresAt || 0) > Date.now() + 3e4)
      return i.token;
    const s = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(s))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const r = new URL("https://accounts.google.com/o/oauth2/v2/auth"), g = crypto.randomUUID();
    r.searchParams.set("client_id", s), r.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), r.searchParams.set("response_type", "token"), r.searchParams.set("scope", ai), r.searchParams.set("include_granted_scopes", "true"), r.searchParams.set("prompt", t ? "consent" : "none"), r.searchParams.set("state", g);
    const h = await chrome.identity.launchWebAuthFlow({ url: r.href, interactive: t });
    if (!h) throw new Error(t ? "Google 授权已取消" : "Google 日历尚未连接");
    const l = new URLSearchParams(new URL(h).hash.replace(/^#/, ""));
    if (l.get("state") !== g) throw new Error("Google 授权状态校验失败");
    if (l.get("error")) throw new Error(l.get("error_description") || l.get("error") || "");
    const v = l.get("access_token");
    if (!v) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [yo]: {
        token: v,
        scope: ai,
        expiresAt: Date.now() + Math.max(300, Number(l.get("expires_in") || 3600)) * 1e3
      }
    }), v;
  }
  async googleCalendarApi(t, o = {}, i = !1) {
    const s = await this.googleCalendarToken(i);
    if (!s) return null;
    const r = await fetch(`https://www.googleapis.com/calendar/v3${t}`, {
      ...o,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${s}`,
        Accept: "application/json",
        ...o.body ? { "Content-Type": "application/json" } : {},
        ...o.headers || {}
      }
    });
    if (r.status === 401 && typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(yo), !r.ok) {
      const g = await r.json().catch(() => ({}));
      throw new Error(g?.error?.message || `Google Calendar API ${r.status}`);
    }
    return r.status === 204 ? null : r.json();
  }
  visibleMonthRange() {
    const t = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1), o = (t.getDay() + 6) % 7, i = new Date(t);
    i.setDate(t.getDate() - o), i.setHours(0, 0, 0, 0);
    const s = new Date(i);
    return s.setDate(i.getDate() + 42), { start: i, end: s, startKey: this.dateKey(i), endKey: this.dateKey(s) };
  }
  async loadGoogleCalendarRange(t = !1, o = !1) {
    if (this.isGoogleLoading)
      return await new Promise((r) => this.googleWaiters.push(r)), o && !this.isGoogleConnected ? this.loadGoogleCalendarRange(t, !0) : this.isGoogleConnected;
    const i = this.visibleMonthRange();
    if (!t && this.isGoogleConnected && Date.now() - this.googleSavedAt < 15 * 6e4)
      return !0;
    this.isGoogleLoading = !0, this.googleLastError = null;
    let s = !1;
    try {
      if (!await this.googleCalendarToken(o)) throw new Error("Google 日历未授权");
      const h = ((await this.googleCalendarApi(
        "/users/me/calendarList?showDeleted=false&showHidden=false&maxResults=250"
      ))?.items || []).filter(
        (v) => v.selected !== !1 && v.accessRole !== "freeBusyReader"
      ), l = [];
      for (const v of h)
        try {
          const k = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: i.start.toISOString(),
            timeMax: i.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(v.id)}/events?${k}`))?.items || []).forEach((u) => {
            l.push({
              ...u,
              _calendarId: v.id,
              _calendarName: v.summary || "Google 日历",
              _calendarColor: v.backgroundColor || "#2563eb",
              _calendarAccessRole: v.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = h, this.googleEvents = l, this.googleSavedAt = Date.now(), this.googleRangeStart = i.startKey, this.googleRangeEnd = i.endKey, this.isGoogleConnected = !0, await ri({
        [si]: {
          calendars: this.googleCalendars,
          events: this.googleEvents,
          savedAt: this.googleSavedAt,
          rangeStart: this.googleRangeStart,
          rangeEnd: this.googleRangeEnd
        }
      }), this.publishCalendarViews(), s = !0;
    } catch (r) {
      this.googleLastError = r, this.googleEvents.length || (this.isGoogleConnected = !1), this.publishCalendarViews();
    } finally {
      this.isGoogleLoading = !1, this.googleWaiters.splice(0).forEach((r) => r());
    }
    return s;
  }
  googleEventsForDate(t) {
    return this.googleEvents.filter((o) => {
      if (!o || o.status === "cancelled") return !1;
      if (o.start?.date)
        return t >= o.start.date && t < String(o.end?.date || o.start.date);
      const i = new Date(o.start?.dateTime || ""), s = new Date(o.end?.dateTime || o.start?.dateTime || "");
      if (!Number.isFinite(i.getTime())) return !1;
      const r = /* @__PURE__ */ new Date(`${t}T00:00:00`), g = new Date(r);
      return g.setDate(r.getDate() + 1), i < g && (Number.isFinite(s.getTime()) ? s : i) > r;
    }).sort((o, i) => {
      const s = o.start?.dateTime ? new Date(o.start.dateTime).getTime() : 0, r = i.start?.dateTime ? new Date(i.start.dateTime).getTime() : 0;
      return s - r;
    });
  }
  tasksForDate(t) {
    return this.todoistTasks.filter((o) => !o || o.is_completed || !!(o.due?.is_recurring || o.due?.recurring || /every|daily|weekly|monthly|yearly|weekday|weekends|每|工作日|周期/i.test(String(o.due?.string || ""))) ? !1 : String(o.due?.date || o.due?.datetime || "").slice(0, 10) === t);
  }
  loadTodoistCalendar(t = !1, o) {
    return o?.aborted ? Promise.resolve(!1) : this.taskWrites.size ? (_e.setStatusText("截止日期正在提交，未开始刷新。"), Promise.resolve(!1)) : !o && this.todoistLoad ? this.todoistLoad : !t && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 6e4 ? (this.publishCalendarViews(), Promise.resolve(!0)) : o ? this.readTodoistCalendar(o) : (this.todoistLoad = this.readTodoistCalendar().finally(() => {
      this.todoistLoad = null;
    }), this.todoistLoad);
  }
  async readTodoistCalendar(t) {
    const o = this.taskRevision, i = ++this.taskReadSequence, s = () => !t?.aborted && i === this.taskReadSequence && o === this.taskRevision;
    this.isTodoistLoading = !0, _e.updateState({ isLoading: !0, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService: r } = await import("./todoist.service-DeCQ21Vr.js").then((h) => h.b);
      if (!s()) return !1;
      const g = await r.listCalendarTasks(t);
      if (!s()) return !1;
      if (!Array.isArray(g)) throw new Error("任务返回格式无效");
      this.todoistTasks = g, this.todoistSavedAt = Date.now();
      try {
        await ri({
          [ji]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
        });
      } catch {
        return s() && _e.setStatusText("任务已读取，但本地缓存保存失败。"), !1;
      }
      return s() && _e.setStatusText("任务已刷新。"), s();
    } catch {
      return s() && _e.setStatusText("任务读取失败，请检查 Todoist 连接；原列表已保留。"), !1;
    } finally {
      i === this.taskReadSequence && (this.isTodoistLoading = !1, _e.updateState({ isLoading: !1 })), s() && this.publishCalendarViews();
    }
  }
  async assignTaskToDate(t, o) {
    const i = String(t || "").trim(), s = /* @__PURE__ */ new Date(o + "T00:00:00Z");
    return !i || !/^\d{4}-\d{2}-\d{2}$/.test(o) || !Number.isFinite(s.getTime()) || s.toISOString().slice(0, 10) !== o ? (_e.setStatusText("任务或截止日期无效，未提交。"), null) : this.taskWrites.has(i) ? (_e.setStatusText("此任务正在提交，请等待结果；未重复发送。"), null) : (this.taskWrites.add(i), ++this.taskRevision, Ks(async () => {
      try {
        const { todoistService: r } = await import("./todoist.service-DeCQ21Vr.js").then((l) => l.b), g = await r.setTaskDueDate(i, o);
        if (!g || String(g.id) !== i) throw new Error("任务更新结果未确认");
        const h = this.todoistTasks.findIndex((l) => String(l.id) === i);
        h >= 0 ? this.todoistTasks[h] = g : this.todoistTasks.push(g), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await ri({
            [ji]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), _e.setStatusText("Todoist 截止日期已更新。");
        } catch {
          _e.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return g;
      } catch {
        return _e.setStatusText("截止日期更新未确认；请核对 Todoist，未自动重试。"), null;
      } finally {
        ++this.taskRevision, this.taskWrites.delete(i);
      }
    }));
  }
  selectDate(t) {
    this.selectedDate === t ? this.selectedDate = "" : this.selectedDate = t, this.publishCalendarViews();
  }
  changeMonth(t) {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + t, 1), this.selectedDate = "", this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  goToday() {
    const t = /* @__PURE__ */ new Date();
    this.currentMonth = new Date(t.getFullYear(), t.getMonth(), 1), this.selectedDate = this.dateKey(t), this.publishCalendarViews();
  }
  closeDetail() {
    this.selectedDate = "", this.publishCalendarViews();
  }
  highlightDrop(t) {
    this.dropDate = String(t || ""), hi.setDropDate(this.dropDate);
  }
  openTask(t, o = !1) {
    const i = this.todoistTasks.find((s) => String(s.id) === String(t));
    i && (o ? window.open(i.url || `https://app.todoist.com/app/task/${i.id}`, "_blank", "noopener,noreferrer") : xs(String(i.id)));
  }
  publishCalendarViews() {
    const t = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), s = (new Date(t, o, 1).getDay() + 6) % 7, r = new Date(t, o, 1 - s), g = this.dateKey(/* @__PURE__ */ new Date()), h = [];
    for (let a = 0; a < 42; a++) {
      const c = new Date(r);
      c.setDate(r.getDate() + a);
      const f = this.dateKey(c), y = this.tasksForDate(f), x = (this.isGoogleConnected ? this.googleEventsForDate(f) : []).length, S = y.length > 0 || x > 0;
      h.push({
        date: f,
        day: c.getDate(),
        taskCount: y.length,
        outside: c.getMonth() !== o,
        today: f === g,
        selected: f === this.selectedDate,
        hasDot: S,
        title: x || y.length ? `${this.friendlyDate(f)} · ${x} 项日程${y.length ? ` · ${y.length} 个任务` : ""}` : `${this.friendlyDate(f)} · 拖入任务设置截止日期`
      });
    }
    const l = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], v = `${this.todoistTasks.filter((a) => a.due?.date && !a.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, k = this.selectedDate || g, u = (this.isGoogleConnected ? this.googleEventsForDate(k) : []).map((a) => ({
      id: a.id || String(Math.random()),
      time: a.start?.date ? "全天" : new Date(a.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: a.summary || "（无标题）",
      subtitle: a.location || a._calendarName || "Google 日历",
      htmlLink: a.htmlLink || "",
      color: a._calendarColor || "var(--accent)"
    }));
    u.sort((a, c) => {
      const f = (a.time || "").replace(/[^\d:]/g, ""), y = (c.time || "").replace(/[^\d:]/g, "");
      return f.localeCompare(y);
    }), hi.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: v,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${u.length ? `${u.length} 项日程 · ` : ""}${l.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: h,
      detailTasks: l.map((a) => ({
        id: String(a.id),
        content: String(a.content || "未命名任务"),
        description: String(a.description || ""),
        labels: Array.isArray(a.labels) ? a.labels.map(String) : [],
        priority: Number(a.priority || 1),
        url: String(a.url || `https://app.todoist.com/app/task/${a.id}`)
      })),
      detailEvents: u
    }), _e.updateState({ summary: v }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const t = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = Ma[o] || `${o + 1}月`, s = String(t), g = (new Date(t, o, 1).getDay() + 6) % 7, h = new Date(t, o, 1 - g), l = this.dateKey(/* @__PURE__ */ new Date()), v = [];
    for (let x = 0; x < 42; x++) {
      const S = new Date(h);
      S.setDate(h.getDate() + x);
      const M = this.dateKey(S), ue = (this.isGoogleConnected ? this.googleEventsForDate(M) : []).length;
      v.push({
        date: M,
        dayNumber: S.getDate(),
        isOutside: S.getMonth() !== o,
        isToday: M === l,
        isSelected: M === (this.selectedDate || l),
        itemCount: ue,
        title: ue ? `${this.friendlyDate(M)} · ${ue} 项日程` : `${this.friendlyDate(M)}`,
        hasDot: ue > 0
      });
    }
    const k = this.selectedDate || l, $ = k === l, u = this.isGoogleConnected ? this.googleEventsForDate(k) : [], a = u.length, c = this.isGoogleConnected ? "Google 在线" : "未连接", f = $ ? "今日日程" : `${k.slice(5)} 日程`, y = a ? `${a} 项` : "无安排", T = u.map((x) => ({
      id: x.id || String(Math.random()),
      time: x.start?.date ? "全天" : new Date(x.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: x.summary || "（无标题）",
      subtitle: x.location || x._calendarName || "Google 日历",
      htmlLink: x.htmlLink || "",
      color: x._calendarColor || "var(--accent)",
      raw: x
    }));
    T.sort((x, S) => {
      const M = (x.time || "").replace(/[^\d:]/g, ""), X = (S.time || "").replace(/[^\d:]/g, "");
      return M.localeCompare(X);
    }), qt.updateState({
      badgeText: c,
      monthLabel: i,
      yearLabel: s,
      cells: v,
      agendaTitle: f,
      agendaCount: y,
      agendaItems: T,
      emptyText: a === 0 ? this.isGoogleConnected ? "当天没有日程 ☕" : "连接 Google 日历后查看日程" : "",
      selectedDate: k
    });
  }
}
const Ea = new $a(), le = Te({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let vo = null;
const So = {
  state: le,
  open(e, t) {
    vo = t, Object.assign(le, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(le, e);
  },
  close() {
    le.submitting || (le.open = !1, vo = null);
  },
  async toggleFollow() {
    if (!(!vo || le.submitting)) {
      le.submitting = !0;
      try {
        const e = !le.followed;
        await vo(e) && (le.followed = e);
      } finally {
        le.submitting = !1;
      }
    }
  }
}, gi = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Li = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), z = Te({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: gi(),
  activeSectorId: null,
  sectors: [],
  beam: Li()
});
let Vi = null;
function Pa(e, t) {
  if (typeof e != "number" || !t)
    return Li();
  const o = 160, i = 160, s = 26, r = 154, g = 360 / t, h = e - g / 2, l = e + g / 2, v = h * Math.PI / 180, k = l * Math.PI / 180, $ = o + s * Math.cos(v), u = i + s * Math.sin(v), a = o + r * Math.cos(v), c = i + r * Math.sin(v), f = o + s * Math.cos(k), y = i + s * Math.sin(k), T = o + r * Math.cos(k), x = i + r * Math.sin(k), S = g > 180 ? 1 : 0, M = `M ${$.toFixed(1)} ${u.toFixed(1)} L ${a.toFixed(1)} ${c.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${T.toFixed(1)} ${x.toFixed(1)} L ${f.toFixed(1)} ${y.toFixed(1)} A ${s} ${s} 0 ${S} 0 ${$.toFixed(1)} ${u.toFixed(1)} Z`, X = `M ${a.toFixed(1)} ${c.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${T.toFixed(1)} ${x.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: M,
    arcPath: X,
    line1: {
      x1: parseFloat($.toFixed(1)),
      y1: parseFloat(u.toFixed(1)),
      x2: parseFloat(a.toFixed(1)),
      y2: parseFloat(c.toFixed(1))
    },
    line2: {
      x1: parseFloat(f.toFixed(1)),
      y1: parseFloat(y.toFixed(1)),
      x2: parseFloat(T.toFixed(1)),
      y2: parseFloat(x.toFixed(1))
    }
  };
}
const me = {
  get state() {
    return z;
  },
  getSnapshot() {
    return vt(z);
  },
  setMounted(e) {
    z.mounted = e;
  },
  setBallPosition(e, t) {
    z.ballPosition.x = e, z.ballPosition.y = t;
  },
  setVisibility(e) {
    z.isOpen = e;
  },
  setHub(e) {
    e ? z.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : z.hub = gi();
  },
  setBeam(e, t) {
    z.beam = Pa(e, t);
  },
  setActiveSector(e) {
    z.activeSectorId = e;
  },
  setSectors(e) {
    z.sectors = [...e];
  },
  expand(e, t, o = "main") {
    z.isOpen = !0, z.isExpanded = !0, z.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    z.isExpanded = !1, z.mode = "main", z.activeSectorId = null, z.beam = Li(), z.hub = gi();
  },
  setWheelMode(e) {
    z.mode = e;
  },
  setActionHandler(e) {
    Vi = e;
  },
  dispatch(e, t) {
    Vi?.(e, t);
  }
}, En = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Ia() {
  return En.filter((e) => e.mode || e.id === "launcher" || Ao(e.id));
}
function Aa() {
  return Is.filter((e) => e.kind === "module" && Ao(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function zi() {
  z.isExpanded && ro();
}
let fi = [], to = En, ot = { x: 400, y: 300 }, Xt = !1, jt = !1, Kt = null;
function bo() {
  return globalThis.chrome?.storage;
}
function Si(e, t) {
  const o = z.isExpanded ? 160 : 24;
  me.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ro() {
  const e = z.mode;
  to = e === "tools" ? Aa() : e === "shortcuts" ? [
    ...fi.length ? fi : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }],
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : Ia();
  const t = to.length, o = t > 12 ? 118 : t > 9 ? 114 : 110, i = t > 12 ? 46 : t > 9 ? 50 : 56;
  me.setSectors(to.map((s, r) => {
    const g = -90 + 360 / t * r, h = g * Math.PI / 180;
    return {
      id: s.id,
      title: s.title,
      desc: s.desc,
      icon: s.icon,
      angleDeg: g,
      x: Math.round(160 + Math.cos(h) * o),
      y: Math.round(160 + Math.sin(h) * o),
      size: i,
      isShortcut: !!s.url
    };
  })), me.setWheelMode(e), me.setActiveSector(null), me.setBeam(null, 0), me.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function Bo(e) {
  z.mode = e, ro();
}
function wt() {
  me.collapse(), Si(z.ballPosition.x, z.ballPosition.y), me.setVisibility(Xt);
}
function Lt(e = z.ballPosition.x, t = z.ballPosition.y, o = "main") {
  me.expand(void 0, void 0, o), Si(e, t), ro(), me.setVisibility(!0);
}
function Wa(e) {
  if (!(e.tool && !Ao(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Ao(e.id))) {
    if (e.mode) {
      Bo(e.mode);
      return;
    }
    if (wt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), at.exit(), document.body && (document.body.dataset.page = "home")) : at.enter(e.id);
  }
}
function Ui(e) {
  ot = { x: e.clientX, y: e.clientY };
}
function Yi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ot = { x: e.clientX, y: e.clientY }, z.isExpanded ? wt() : Lt(e.clientX, e.clientY));
}
function qi(e) {
  e.button === 1 && e.preventDefault();
}
function Xi(e) {
  !z.isExpanded || Ci.active || (e.key === "Escape" || e.altKey && e.key.toLowerCase() === "w") && (e.preventDefault(), e.stopPropagation(), z.mode === "shortcuts" ? Bo("main") : wt());
}
function Oa(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Ba(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = ie.getCachedIcon(e.url);
    if (o) return o;
    const i = Oa(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const st = {
  async start() {
    if (!jt) {
      jt = !0, ot = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, me.setActionHandler((e, t) => {
        if (e === "hub:click")
          z.isExpanded ? z.mode === "shortcuts" ? Bo("main") : wt() : Lt();
        else if (e === "sector:click" || e === "container:click") {
          const o = to.find((i) => i.id === t?.id || e === "container:click" && i.id === z.activeSectorId);
          o && Wa(o);
        } else if (e === "sector:hover") {
          const o = z.sectors.find((i) => i.id === t?.id);
          o && (me.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), me.setActiveSector(o.id), me.setBeam(o.angleDeg, to.length));
        } else e === "sector:leave" && (me.setActiveSector(null), me.setBeam(null, 0), me.setHub(z.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : z.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", zi), window.addEventListener("pointermove", Ui, { passive: !0 }), window.addEventListener("mousedown", Yi, !0), window.addEventListener("auxclick", qi, !0), window.addEventListener("keydown", Xi, !0), Kt = (e, t) => {
        t === "local" && (e.showNavBall && (Xt = !!e.showNavBall.newValue, me.setVisibility(Xt || z.isExpanded)), (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts());
      }, bo()?.onChanged?.addListener(Kt);
      try {
        const e = await bo()?.local?.get(["showNavBall", "navBallPosition"]);
        if (!jt) return;
        Xt = !!e?.showNavBall;
        const t = e?.navBallPosition;
        Si(
          typeof t?.x == "number" ? t.x : 28,
          typeof t?.y == "number" ? t.y : Math.min(window.innerHeight - 60, 180)
        ), me.setVisibility(Xt);
      } catch {
      }
      await this.loadShortcuts(), ro();
    }
  },
  stop() {
    jt = !1, me.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", zi), window.removeEventListener("pointermove", Ui), window.removeEventListener("mousedown", Yi, !0), window.removeEventListener("auxclick", qi, !0), window.removeEventListener("keydown", Xi, !0), Kt && bo()?.onChanged?.removeListener(Kt), Kt = null;
  },
  async loadShortcuts() {
    try {
      const e = await bo()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!jt) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      fi = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Ba(o)
      })), z.mode === "shortcuts" && ro();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Lt(e ?? ot.x, t ?? ot.y);
  },
  close: wt,
  toggle(e = !1) {
    z.isExpanded ? wt() : e ? Lt(ot.x, ot.y) : Lt();
  },
  toggleTools(e = !0) {
    z.isExpanded && z.mode === "tools" ? wt() : Lt(
      e ? ot.x : z.ballPosition.x,
      e ? ot.y : z.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Bo(e);
  }
};
class Et {
  constructor() {
    this.activeShortcuts = { ...Uo }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Et.instance || (Et.instance = new Et()), Et.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: s } = await import("./options.service-DeE5FeLW.js").then((k) => k.c), g = (await chrome.storage.local.get(s))[s], h = { ...g || {}, [t]: o }, l = this.shortcutReadVersion, v = await i.saveSettings(
      { [s]: h },
      { [s]: g }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(v[s]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(Uo, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...Uo, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((i, s) => {
          s === "local" && Object.prototype.hasOwnProperty.call(i, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(i.customShortcuts.newValue));
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
    if (Wo(t))
      return Ae.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return Ho.toggle(), !0;
      case "settings":
        return Go.open(), !0;
      case "nav-wheel":
        return st.toggle(!0), !0;
      case "toolbox":
        return st.toggleTools(!0), !0;
      case "pricing":
        return at.enter("daily-pricing"), !0;
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
        if (Ci.active || t.defaultPrevented || t.isComposing || t.repeat) return;
        if (at.activeId && t.altKey && t.key.toLowerCase() === "w") {
          t.preventDefault(), t.stopPropagation(), at.exit();
          return;
        }
        if (t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = As(t);
        if (!i) return;
        const s = i.toLowerCase();
        for (const [r, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !Ai(r)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === s) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const mi = Et.getInstance();
class Pt {
  constructor() {
    this._isVisible = H(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
    return Pt.instance || (Pt.instance = new Pt()), Pt.instance;
  }
  get isVisible() {
    return vt(this._isVisible);
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
const Fa = Pt.getInstance(), li = () => window;
let pt = !1, Vt, ci, zt;
function Ji(e) {
  return ie.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: ie.getPageLabel(t) }));
}
function Qi() {
  if (!Ge.isOpen || !Ge.activeFolder) return;
  const e = ie.getState(), t = Ge.activeFolder;
  dt.setLinks(e.links.filter((r) => (r.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const r of e.links) {
    const g = r.group || "常用网站";
    o.has(g) || o.set(g, []), o.get(g).push(r);
  }
  const i = new Map(Object.keys(e.folders).map((r) => [r, Eo(e.folders, r)])), s = /* @__PURE__ */ new Map();
  for (const r of i.values()) r && s.set(r, (s.get(r) || 0) + 1);
  dt.setFolders([...i].filter(([, r]) => r === t).map(([r]) => ({
    groupName: r,
    links: o.get(r) || [],
    count: (o.get(r)?.length || 0) + (s.get(r) || 0)
  })), Eo(e.folders, t));
}
const wi = {
  openEditor(e) {
    Zt.openEditDialog(e || {});
  },
  openFolder(e = Ge.activeFolder) {
    if (!e) return;
    const o = ie.getState().links.filter((i) => (i.group || "常用网站") === e);
    dt.openFolder(e, o), Qi();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), At.openLinkMenu(e, Ji(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = ie.getState(), s = o || i.activePage;
    At.openFolderMenu(
      e,
      ie.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      Ji(s),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), At.openPageMenu(
      e,
      ie.getPageLabel(e),
      ie.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openIconPicker(e) {
    if (!e) return;
    const t = e.title || ie.hostOf(e.url);
    Zt.openIconPicker(e.title || "网站", t, e.url, String(e.id)), Zt.searchIcons(t);
  },
  render() {
    const e = ie.getState(), t = ie.getPageNames();
    ke.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), Qi();
  },
  start() {
    pt || (pt = !0, ke.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: _s,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), dt.setActionHandler((e, t) => {
      e === "close" ? dt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), ci = ie.subscribe(() => {
      this.render();
    }), zt = (e, t) => {
      if (t !== "local") return;
      const o = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, i = {};
      for (const [s, r] of Object.entries(o)) {
        if (!(s in e)) continue;
        const g = e[s].newValue;
        i[r] = r === "links" ? Array.isArray(g) ? g : [] : r === "pages" ? Array.isArray(g) && g.length ? g : ["常用网站"] : r === "activePage" ? g || "常用网站" : g || {};
      }
      Object.keys(i).length && (ie.updateState(i), this.render());
    }, li().chrome?.storage?.onChanged?.addListener(zt));
  },
  init() {
    return this.start(), Vt || (Vt = (async () => {
      await ie.ready;
      const e = li().chrome;
      if (!pt) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (pt) {
        if (!ie.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((s) => i(s || [])));
          if (!pt) return;
          ie.getState().links.length || (ie.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || ie.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await ie.save());
        }
        pt && this.render();
      }
    })().catch((e) => {
      throw Vt = void 0, e;
    }), Vt);
  },
  stop() {
    pt = !1, ci?.(), ci = void 0, zt && li().chrome?.storage?.onChanged?.removeListener(zt), zt = void 0, dt.setActionHandler(null), ke.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, Zi = [
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
function ko(e) {
  return e === 0 ? { emoji: "☀️", label: "晴" } : e <= 2 ? { emoji: "🌤️", label: "少云" } : e === 3 ? { emoji: "☁️", label: "多云" } : e === 45 || e === 48 ? { emoji: "🌫️", label: "雾" } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: "毛毛雨" } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: "雨" } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: "雪" } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: "阵雨" } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: "阵雪" } : e >= 95 ? { emoji: "⛈️", label: "雷雨" } : { emoji: "🌡️", label: "—" };
}
class It {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.initStorage();
  }
  static getInstance() {
    return It.instance || (It.instance = new It()), It.instance;
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
    if (!i) return Zi.slice(0, o);
    const s = [];
    for (const r of Zi) {
      const g = r.name.toLowerCase(), h = r.pinyin.toLowerCase(), l = r.admin.toLowerCase();
      if ((g.startsWith(i) || h.startsWith(i) || g.includes(i) || h.includes(i) || l.includes(i)) && s.push(r), s.length >= o) break;
    }
    return s;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      Ve.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    Ve.loading(o);
    try {
      const s = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, r = await fetch(s);
      if (i !== this.activeRequestId || N.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const h = (await r.json()).results?.[0];
      if (!h) {
        i === this.activeRequestId && N.state !== "unconfigured" && Ve.notFound(o), this.isRefreshing = !1;
        return;
      }
      const l = `https://api.open-meteo.com/v1/forecast?latitude=${h.latitude}&longitude=${h.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, v = await fetch(l);
      if (i !== this.activeRequestId || N.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const k = await v.json(), $ = ko(k.current?.weather_code ?? 0), u = Math.round(k.current?.temperature_2m ?? 0), a = k.hourly?.time || [], c = Date.now();
      let f = a.findIndex((O) => new Date(O).getTime() >= c);
      f < 0 && (f = 0);
      const y = [];
      for (let O = f; O < Math.min(f + 5, a.length); O++) {
        const D = O === f ? "现在" : new Date(a[O]).getHours() + "时", Q = ko(k.hourly.weather_code[O]), te = Math.round(k.hourly.temperature_2m[O]);
        y.push({ time: D, emoji: Q.emoji, temp: te });
      }
      let T = "未来 12 小时暂无降水 ☂️";
      for (let O = f; O < Math.min(f + 12, a.length); O++) {
        const D = k.hourly.weather_code[O], Q = k.hourly.precipitation_probability?.[O] || 0;
        if (D >= 51 || Q >= 60) {
          const te = new Date(a[O]).getHours(), I = D >= 71 && D <= 77 || D === 85 || D === 86;
          T = `预计 ${te}:00 ${I ? "有雪" : "有雨"}${Q ? `（${Q}%）` : ""} 🌧️`;
          break;
        }
      }
      const x = ["今天", "明天", "后天"], S = [], M = k.daily?.time?.length || 0;
      for (let O = 1; O < Math.min(3, M); O++) {
        const D = x[O] || `+${O}天`, Q = ko(k.daily.weather_code[O]), te = `${Math.round(k.daily.temperature_2m_max[O])}°/${Math.round(k.daily.temperature_2m_min[O])}°`;
        S.push({ label: D, emoji: Q.emoji, tempRange: te });
      }
      const X = `${$.label} · 最高 ${Math.round(k.daily?.temperature_2m_max?.[0] ?? u)}° / 最低 ${Math.round(k.daily?.temperature_2m_min?.[0] ?? u)}°`, ue = {
        cityName: h.name || o,
        currentEmoji: $.emoji,
        currentTemp: u,
        subText: X,
        rainText: T,
        hours: y,
        days: S
      };
      if (i === this.activeRequestId && N.state !== "unconfigured") {
        if (Ve.ready(ue, o), k.daily?.time) {
          const D = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], Q = [];
          for (let te = 0; te < k.daily.time.length; te++) {
            const I = new Date(k.daily.time[te]), R = te === 0 ? "今天" : te === 1 ? "明天" : te === 2 ? "后天" : D[I.getDay()], A = ko(k.daily.weather_code[te]);
            Q.push({
              date: `${I.getMonth() + 1}/${I.getDate()}`,
              dayName: R,
              emoji: A.emoji,
              condition: A.label,
              highTemp: Math.round(k.daily.temperature_2m_max[te]),
              lowTemp: Math.round(k.daily.temperature_2m_min[te]),
              rainProb: k.daily.precipitation_probability_max?.[te] || 0
            });
          }
          Ve.setForecastDays(Q);
        }
        const O = {
          humidity: k.current?.relative_humidity_2m ? `${k.current.relative_humidity_2m}%` : "60%",
          wind: k.current?.wind_speed_10m ? `${Math.round(k.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        Ve.setDetailInfo(O);
      }
    } catch (s) {
      i === this.activeRequestId && N.state !== "unconfigured" && Ve.error(s?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Jt = It.getInstance();
function Na(e, t) {
  window.LogicWeaverIntro = rt, window.LogicWeaverNotifications = Ie, window.LogicWeaverWindowManager = Ae, window.LogicWeaverWindowTabs = Ae, window.LogicWeaverDomFreezer = Ws, window.LogicWeaverWallpaperService = Io, window.LogicWeaverLauncherService = ie, window.LogicWeaverLauncherRuntime = wi, window.LogicWeaverProfileService = Gi;
  try {
    Gi.init();
  } catch (i) {
    console.error("[ProfileService] init failed:", i);
  }
  window.LogicWeaverBookmarksService = bi, window.LogicWeaverCalendarService = Ea, window.LogicWeaverWeather = Ve, window.LogicWeaverWeatherService = Jt, window.LogicWeaverClock = Mt, window.LogicWeaverSearch = ys, window.LogicWeaverSearchService = vs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-Br6-jVT7.js").then(({ aiHotService: i }) => {
        window.LogicWeaverAiHotService = i;
      });
    }
  }), window.LogicWeaverHomeMusic = We, window.LogicWeaverLauncherGroups = ke, window.LogicWeaverProfileMenu = co, window.LogicWeaverWorkspaceLaunchers = xi, window.LogicWeaverMacDock = gt, window.LogicWeaverFullscreen = at, window.enterFullscreenCard = (i) => at.enter(i), window.exitFullscreenCard = () => at.exit(), window.cycleFullscreenCard = () => at.cycle(), window.LogicWeaverPageVisibility = Fa, window.LogicWeaverBackgroundLibrary = Fi, window.LogicWeaverProfilePanel = ao, window.LogicWeaverBookmarkMenu = ki, window.LogicWeaverBookmarkPanel = Ho, window.LogicWeaverBookmarkFolderStrip = Po, window.LogicWeaverLauncherDialogs = Zt, window.LogicWeaverLauncherFolder = dt, window.LogicWeaverLauncherMenus = At, window.LogicWeaverSettings = Go, window.LogicWeaverClockSettings = mt, window.LogicWeaverBiliTheater = eo, window.LogicWeaverBilibiliService = Pi, window.getBiliJct = () => Pi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Ii, window.openBiliMiniPlayer = (i) => Ii.openVideo(i), window.LogicWeaverAiDialog = Ti, window.LogicWeaverAihotViewer = _i, window.LogicWeaverNavWheel = me, window.openNavWheel = (i, s) => st.open(i, s), window.closeNavWheel = () => st.close(), window.toggleNavWheel = (i) => st.toggle(i), window.toggleToolWheel = (i) => st.toggleTools(i), window.setNavWheelMode = (i) => st.setMode(i), window.LogicWeaverShortcuts = mi, window.triggerToolShortcut = (i) => mi.triggerToolShortcut(i), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = hi, window.LogicWeaverGitHubStatus = dn, window.LogicWeaverGitHubFolders = un, window.LogicWeaverGitHubHero = pn, window.LogicWeaverGitHubRepositories = hn, window.LogicWeaverGitHubBatchBar = gn, window.LogicWeaverTodoistLabels = Ts, window.LogicWeaverTodoistWorkspace = Ls, window.LogicWeaverTodoistCalendarSidebar = qt, window.LogicWeaverTodoistTaskList = Ss, window.LogicWeaverBiliMessagePanel = ft, window.LogicWeaverStickerBoard = Hs, window.LogicWeaverStickersService = Gs, window.LogicWeaverPricing = yn, window.LogicWeaverBiliFavorites = mn, window.LogicWeaverBiliRadioTape = Rs, window.LogicWeaverBiliOrganizerDialogs = Bs, window.LogicWeaverBiliUpGroupManager = Fs, window.LogicWeaverBiliUpPreview = So, window.LogicWeaverYouTube = vn, window.LogicWeaverAihotFeed = wn, window.LogicWeaverGitHubTrending = bn, window.LogicWeaverCalendarWorkspace = _e, window.LogicWeaverCalendar = _e, window.LogicWeaverTodoistMainWorkspace = Ds, window.LogicWeaverTodoistTaskDetail = Sa, window.openBiliTheater = (i) => eo.openVideo(i), window.closeBiliTheater = () => eo.close(), window.showWindowsToast = (i) => i ? Ie.show({
    ...i,
    onClick: () => {
      if (typeof i?.onClick == "function") return i.onClick();
      if (i?.url) {
        window.open(i.url, "_blank");
        return;
      }
      i?.appType === "bili" && (window.LogicWeaverBiliMessagePanel ? window.LogicWeaverBiliMessagePanel.openPanel() : window.open("https://message.bilibili.com/", "_blank"));
    }
  }) : null, window.showToast = (i, s = !1, r = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: s ? "assets/error.svg" : "assets/logo.png",
    title: s ? "操作提醒" : "系统提醒",
    subtitle: i,
    duration: r
  }), window.showBiliToast = (i, s = 3200, r = {}) => {
    const g = r.isError || /失败|错误|异常|未获取|未找到/i.test(i), h = r.title || (g ? "B站操作未完成" : "哔哩哔哩"), l = r.subtitle || (i.length > 36 ? "" : i), v = r.message || (r.subtitle || i.length > 36 ? i : ""), k = {
      id: r.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: h,
      subtitle: l || i,
      message: v && v !== l ? v : "",
      showActions: !!(r.showActions || r.actionLabel),
      actionLabel: r.actionLabel || "",
      onClick: r.onClick || null,
      duration: Math.max(3e3, s)
    };
    return window.showWindowsToast(k);
  }, window.showFetchToast = (i, s, r = "", g = "assets/logo.png", h = 3200) => window.showWindowsToast({
    appName: i,
    title: s,
    subtitle: r,
    icon: g || "assets/logo.png",
    duration: h,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = Xs, window.LogicWeaverMarkdownAst = Js, window.setLauncherBackground = (i) => Io.setWallpaper(i), window.backgroundDbClear = (i) => Ms(i), window.openBackgroundHistory = () => Fi.openDialog();
  const o = () => {
    import("./cli-bridge-g6HSA3-E.js").then(({ cliBridgeRuntime: i }) => i.start());
  };
  document.readyState === "complete" || document.readyState === "interactive" ? setTimeout(o, 400) : (window.addEventListener("load", () => setTimeout(o, 400), { once: !0 }), setTimeout(o, 1200));
}
const De = Te({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Co = null;
const Pn = {
  get state() {
    return De;
  },
  open() {
    De.isOpen || (De.isOpen = !0, De.query = "", De.selectedIndex = 0, Co = Ae.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    De.isOpen && (De.isOpen = !1, De.query = "", De.selectedIndex = 0, Co && (Co(), Co = null));
  },
  toggle() {
    De.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    De.query = e, De.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (De.selectedIndex = (De.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (De.selectedIndex = (De.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await yt.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (Ci.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Pn.toggle());
}, !0);
function Ra(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Pn.toggle()
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
    title: "清除全部通知",
    category: "通知",
    keywords: ["toast", "关闭", "清空"],
    concurrency: "drop",
    enabled: () => Ie.size > 0,
    run: () => Ie.clear()
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
    enabled: () => _e.ready,
    run: () => _e.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => _e.ready,
    run: () => _e.goToday()
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
    id: "profile.show-info",
    title: "查看本地信息与性能",
    category: "账号",
    description: "打开浏览器指纹、环境与硬件性能网格",
    keywords: ["性能", "指纹", "探针", "profile", "fps"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfileMenu?.trigger == "function",
    run: () => window.LogicWeaverProfileMenu?.trigger("messages")
  }), e.register({
    id: "profile.refresh",
    title: "刷新账号与性能探针",
    category: "账号",
    description: "清空账号缓存并重新探测性能",
    keywords: ["刷新", "账号", "探针", "bilibili"],
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
    id: "profile.open-panel",
    title: "打开个人信息与性能面板",
    category: "个人中心",
    description: "查看浏览器指纹、环境与性能指标",
    keywords: ["个人信息", "性能", "浏览器指纹", "profile"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfilePanel?.openPanel == "function",
    run: () => window.LogicWeaverProfilePanel?.openPanel()
  }), e.register({
    id: "profile.close-panel",
    title: "关闭个人信息面板",
    category: "个人中心",
    description: "关闭个人信息与性能采样面板",
    keywords: ["关闭信息", "close profile"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfilePanel?.closePanel == "function",
    run: () => window.LogicWeaverProfilePanel?.closePanel()
  }), e.register({
    id: "profile.toggle-tech-drawer",
    title: "展开/收起微架构抽屉",
    category: "个人中心",
    description: "切换多核心 Dedicated Workers 与微架构创新抽屉",
    keywords: ["微架构", "多核心", "tech drawer"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfilePanel?.toggleTechDrawer == "function",
    run: () => window.LogicWeaverProfilePanel?.toggleTechDrawer()
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
const Ha = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, Ga = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Es.exit();
    }
    return (o, i) => (p(), re(hs, { name: "guest-banner-slide" }, {
      default: Wt(() => [
        d($s) ? (p(), w("aside", Ha, [
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
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), ja = /* @__PURE__ */ Ee(Ga, [["__scopeId", "data-v-a2f2ca5f"]]), Ka = ["hidden"], Va = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, za = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], Ua = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = H(null);
    function o(r) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !r.deltaY || (r.preventDefault(), g.scrollLeft += r.deltaY);
    }
    function i(r) {
      Po.openFolder(r.id);
    }
    function s(r, g) {
      Po.openContextMenu(g, r.clientX, r.clientY);
    }
    return (r, g) => (p(), w("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !d(St).enabled,
      onWheel: o
    }, [
      d(St).folders.length ? B("", !0) : (p(), w("span", Va, _(d(St).emptyMessage || "书签栏没有文件夹"), 1)),
      (p(!0), w(ne, null, ve(d(St).folders, (h) => (p(), w("button", {
        key: h.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${h.title || "未命名"}`,
        "data-bookmark-folder-id": h.id,
        onClick: (l) => i(h),
        onContextmenu: V((l) => s(l, h), ["prevent"])
      }, [
        g[0] || (g[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, _(h.title || "未命名"), 1)
      ], 40, za))), 128))
    ], 40, Ka));
  }
}), Ya = /* @__PURE__ */ Ee(Ua, [["__scopeId", "data-v-5e71cc7c"]]), qa = { class: "cube-manager-body" }, Xa = ["disabled", "onClick"], Ja = ["disabled", "onClick"], Qa = ["onClick"], Za = ["onClick"], er = ["onClick"], tr = ["type", "placeholder"], or = {
  key: 0,
  role: "alert"
}, ir = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = xe.state, o = ae(() => xe.getActiveFaces()), i = ae(() => t.registeredFaces.filter((u) => !t.activeFaceIds.includes(u.id))), s = H(""), r = H("memo"), g = H(""), h = H(!1), l = H(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), v = H("");
    function k(u) {
      v.value = "";
      try {
        u();
      } catch (a) {
        v.value = a instanceof Error ? a.message : "操作失败";
      }
    }
    function $() {
      k(() => {
        const u = h.value ? JSON.parse(l.value) : {
          title: s.value,
          customType: r.value,
          customData: { text: g.value, targetDate: g.value, url: g.value }
        };
        xe.addCustomFace(u), s.value = "", g.value = "";
      });
    }
    return (u, a) => (p(), re(ut, { to: "body" }, [
      d(t).isConfigDialogOpen ? (p(), w("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: a[7] || (a[7] = vi(V((c) => d(xe).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          a[8] || (a[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: a[0] || (a[0] = (c) => d(xe).closeConfigDialog())
          }, "×")
        ]),
        n("div", qa, [
          a[16] || (a[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (p(!0), w(ne, null, ve(o.value, (c, f) => (p(), w("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, _(c.icon) + " " + _(c.title), 1),
            n("button", {
              type: "button",
              disabled: f === 0,
              onClick: (y) => k(() => d(xe).moveUp(c.id)),
              title: "上移"
            }, "↑", 8, Xa),
            n("button", {
              type: "button",
              disabled: f === o.value.length - 1,
              onClick: (y) => k(() => d(xe).moveDown(c.id)),
              title: "下移"
            }, "↓", 8, Ja),
            n("button", {
              type: "button",
              onClick: (y) => k(() => d(xe).removeCustomFace(c.id))
            }, "删除面", 8, Qa)
          ]))), 128)),
          (p(!0), w(ne, null, ve(i.value, (c) => (p(), w("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, _(c.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (f) => k(() => d(xe).toggleActive(c.id, !0))
            }, "添加", 8, Za),
            c.builtIn ? B("", !0) : (p(), w("button", {
              key: 0,
              type: "button",
              onClick: (f) => k(() => d(xe).removeCustomFace(c.id))
            }, "删除", 8, er))
          ]))), 128)),
          a[17] || (a[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            Oe(n("input", {
              "onUpdate:modelValue": a[1] || (a[1] = (c) => h.value = c),
              type: "checkbox"
            }, null, 512), [
              [gs, h.value]
            ]),
            a[9] || (a[9] = Xe(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: V($, ["prevent"])
          }, [
            h.value ? (p(), w(ne, { key: 1 }, [
              a[14] || (a[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Oe(n("textarea", {
                "onUpdate:modelValue": a[5] || (a[5] = (c) => l.value = c),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [io, l.value]
              ])
            ], 64)) : (p(), w(ne, { key: 0 }, [
              n("label", null, [
                a[10] || (a[10] = Xe("标题", -1)),
                Oe(n("input", {
                  "onUpdate:modelValue": a[2] || (a[2] = (c) => s.value = c),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [io, s.value]
                ])
              ]),
              n("label", null, [
                a[12] || (a[12] = Xe("类型", -1)),
                Oe(n("select", {
                  "onUpdate:modelValue": a[3] || (a[3] = (c) => r.value = c)
                }, [...a[11] || (a[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [fs, r.value]
                ])
              ]),
              n("label", null, [
                a[13] || (a[13] = Xe("内容", -1)),
                Oe(n("input", {
                  "onUpdate:modelValue": a[4] || (a[4] = (c) => g.value = c),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, tr), [
                  [ms, g.value]
                ])
              ])
            ], 64)),
            a[15] || (a[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          v.value ? (p(), w("p", or, _(v.value), 1)) : B("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: a[6] || (a[6] = (c) => k(() => d(xe).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          a[18] || (a[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : B("", !0)
    ]));
  }
}), nr = /* @__PURE__ */ Ee(ir, [["__scopeId", "data-v-15dd5487"]]), sr = ["data-face"], ar = { class: "ms-top-side" }, rr = {
  key: 0,
  class: "ms-top-meta"
}, lr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, cr = { class: "ms-top-artist" }, dr = { class: "ms-top-meta" }, ur = ["title"], pr = ["title"], hr = {
  key: 0,
  class: "ms-top-divider"
}, gr = ["title"], fr = { class: "ms-top-mini-progress" }, mr = { class: "ms-top-side" }, wr = ["aria-label"], yr = ["title"], vr = { class: "ms-cube-custom-icon" }, br = { class: "ms-cube-custom-title" }, kr = ["title"], Cr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, _r = ["href"], xr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Tr = ["title", "onClick"], Lr = { class: "ms-cube-cm-header" }, Sr = { class: "ms-cube-cm-list" }, Dr = ["onClick"], Mr = { class: "ms-cube-cm-icon" }, $r = { class: "ms-cube-cm-title" }, Er = {
  key: 0,
  class: "ms-cube-cm-check"
}, Pr = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => fn.visible || qe.djModalOpen || qe.isActive && qe.isJoined), i = ae(() => qe.isActive && qe.isJoined), s = ae(() => xe.getActiveFaces()), r = H("music"), g = H(0);
    let h = !1, l;
    Ze(
      () => s.value,
      (E) => {
        E.some((P) => P.id === r.value) || (r.value = E[0]?.id || "");
      },
      { immediate: !0 }
    );
    const v = ae(() => s.value.filter((E) => !E.builtIn)), k = H(!1), $ = H({ x: 0, y: 0 });
    Ze(() => t.active, (E) => {
      E || (k.value = !1, xe.closeConfigDialog(), clearTimeout(l), h = !1);
    }, { immediate: !0 });
    const { menuRef: u, style: a } = kn({
      visible: () => k.value,
      anchor: () => $.value,
      dismiss: () => {
        k.value = !1;
      }
    });
    function c(E) {
      E.preventDefault(), E.stopPropagation(), $.value = { x: E.clientX, y: E.clientY }, k.value = !0;
    }
    function f(E) {
      Q(E), k.value = !1;
    }
    function y() {
      k.value = !1, xe.openConfigDialog();
    }
    function T() {
      k.value = !1, x(() => xe.resetDefaults()), Q("music");
    }
    function x(E) {
      k.value = !1;
      try {
        E();
      } catch (P) {
        Ie.show({ appName: "滚动立方体", title: "保存失败", message: P instanceof Error ? P.message : "请检查浏览器存储" });
      }
    }
    function S(E) {
      if (!E) return "未设置目标日";
      const W = new Date(E).getTime() - O.value, pe = Math.ceil(W / (1e3 * 60 * 60 * 24));
      return pe > 0 ? `还剩 ${pe} 天` : pe === 0 ? "就是今天！" : `已过去 ${Math.abs(pe)} 天`;
    }
    const M = ae(() => K.isBiliRadio ? "B站电台" : K.isNetease ? "网易云" : K.playing ? "塞壬" : "待机"), X = ae(() => K.currentLyric ? K.currentLyric : K.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function ue() {
      K.isNetease ? Ae.handleToolClick("music") : Ae.handleToolClick("siren");
    }
    const O = H(Date.now());
    let D;
    Ze(() => t.active && s.value.some((E) => E.id === r.value && E.customType === "countdown"), (E) => {
      E && (O.value = Date.now()), clearInterval(D), D = E ? window.setInterval(() => {
        document.hidden || (O.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function Q(E, P = null) {
      const W = s.value, pe = W.find((Le) => Le.id === E) || W[0];
      if (pe) {
        if (Number.isFinite(P))
          g.value = P;
        else if (pe.id !== r.value) {
          const Le = W.findIndex((et) => et.id === r.value);
          let fe = (W.findIndex((et) => et.id === pe.id) - Le + W.length) % W.length;
          fe > W.length / 2 && (fe -= W.length), g.value += fe * 90;
        }
        r.value = pe.id;
      }
    }
    function te(E) {
      const P = s.value;
      if (P.length <= 1) return;
      const W = P.findIndex((fe) => fe.id === r.value), Le = ((W >= 0 ? W : 0) + E + P.length) % P.length, Be = P[Le];
      Be && Q(Be.id, g.value + E * 90);
    }
    function I(E) {
      s.value.length <= 1 || E.altKey || Math.abs(E.deltaY) < 2 || (E.preventDefault(), !h && (h = !0, te(E.deltaY > 0 ? 1 : -1), l = setTimeout(() => {
        h = !1;
      }, 420)));
    }
    function R(E) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(E.key) || E.target?.closest?.("input") || (E.preventDefault(), te(["ArrowDown", "PageDown"].includes(E.key) ? 1 : -1));
    }
    function A(E, P) {
      return r.value === E ? {
        transform: `rotateX(${-g.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${P}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function U(E) {
      const P = E.target;
      P && (P.tagName === "INPUT" || P.tagName === "TEXTAREA" || P.isContentEditable) || (E.preventDefault(), E.stopPropagation());
    }
    function be(E) {
      const P = E.target;
      P && (P.tagName === "INPUT" || P.tagName === "TEXTAREA" || P.isContentEditable) || E.preventDefault();
    }
    return Ft(() => {
      clearInterval(D), clearTimeout(l);
    }), (E, P) => Oe((p(), w("div", {
      class: "ms-top-player",
      "data-face": r.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: I,
      onKeydown: R,
      onContextmenu: c,
      onCopy: U,
      onSelectstart: be
    }, [
      s.value.length ? B("", !0) : (p(), w("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: y
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: we({ transform: `translateZ(-22px) rotateX(${g.value}deg)` })
      }, [
        d(xe).isActive("music") && r.value === "music" ? (p(), w("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: we(A("music", 0))
        }, [
          n("div", ar, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: P[0] || (P[0] = V((W) => d(We).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: P[1] || (P[1] = V((W) => d(We).togglePlay(), ["stop"]))
            }, _(d(K).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: V(ue, ["stop"])
          }, [
            o.value ? (p(), w("div", rr, [
              n("span", lr, " 🎧 " + _(i.value ? "正在一起听" : "正在收听") + "：" + _(d(K).title || "待机中"), 1),
              n("span", cr, _(d(K).artist), 1)
            ])) : (p(), w(ne, { key: 1 }, [
              n("div", dr, [
                n("span", {
                  class: "ms-top-title",
                  title: d(K).title || "音乐播放器"
                }, _(d(K).title || "音乐播放器"), 9, ur),
                n("span", {
                  class: "ms-top-artist",
                  title: d(K).artist || "待机中"
                }, _(d(K).artist || "待机中"), 9, pr),
                n("span", {
                  class: he(["ms-top-source", { idle: !d(K).playing }])
                }, _(M.value), 3),
                X.value ? (p(), w("span", hr)) : B("", !0)
              ]),
              X.value ? (p(), w("span", {
                key: 0,
                class: "ms-top-lyric",
                title: X.value
              }, _(X.value), 9, gr)) : B("", !0)
            ], 64)),
            n("div", fr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: we({ width: d(K).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", mr, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: P[2] || (P[2] = V((W) => d(We).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: V(ue, ["stop"])
            }, "🎵")
          ])
        ], 4)) : B("", !0),
        (p(!0), w(ne, null, ve(v.value, (W, pe) => (p(), w("section", {
          key: W.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": W.title,
          style: we(A(W.id, (pe + 1) * 90))
        }, [
          r.value === W.id ? (p(), w("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: W.desc
          }, [
            n("span", vr, _(W.icon), 1),
            n("strong", br, _(W.title), 1),
            P[10] || (P[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            W.customType === "memo" ? (p(), w("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: W.customData?.text
            }, _(W.customData?.text || "（点击右键配置便签内容）"), 9, kr)) : W.customType === "countdown" ? (p(), w("span", Cr, _(S(W.customData?.targetDate)), 1)) : W.customType === "link" ? (p(), w("a", {
              key: 2,
              href: W.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: P[3] || (P[3] = V(() => {
              }, ["stop"]))
            }, _(W.customData?.url) + " ↗ ", 9, _r)) : B("", !0)
          ], 8, yr)) : B("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: P[4] || (P[4] = V((Le) => d(xe).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, wr))), 128))
      ], 4),
      n("div", xr, [
        (p(!0), w(ne, null, ve(s.value, (W) => (p(), w("i", {
          key: W.id,
          class: he({ on: r.value === W.id }),
          title: W.title,
          onClick: V((pe) => Q(W.id), ["stop"])
        }, null, 10, Tr))), 128))
      ]),
      (p(), re(ut, { to: "body" }, [
        t.active && k.value ? (p(), w("div", {
          key: 0,
          ref_key: "menuRef",
          ref: u,
          class: "ms-cube-context-menu",
          style: we(d(a)),
          onClick: P[9] || (P[9] = V(() => {
          }, ["stop"]))
        }, [
          n("div", Lr, [
            P[11] || (P[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: P[5] || (P[5] = (W) => k.value = !1)
            }, "×")
          ]),
          n("div", Sr, [
            (p(!0), w(ne, null, ve(s.value, (W) => (p(), w("button", {
              key: W.id,
              type: "button",
              class: he(["ms-cube-cm-item", { active: r.value === W.id }]),
              onClick: (pe) => f(W.id)
            }, [
              n("span", Mr, _(W.icon), 1),
              n("span", $r, _(W.title), 1),
              r.value === W.id ? (p(), w("span", Er, "✓")) : B("", !0)
            ], 10, Dr))), 128))
          ]),
          P[16] || (P[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: y
          }, [...P[12] || (P[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: P[6] || (P[6] = (W) => {
              te(-1), k.value = !1;
            })
          }, [...P[13] || (P[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: P[7] || (P[7] = (W) => {
              te(1), k.value = !1;
            })
          }, [...P[14] || (P[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          r.value ? (p(), w("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: P[8] || (P[8] = (W) => x(() => d(xe).removeCustomFace(r.value)))
          }, "删除当前面")) : B("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: T
          }, [...P[15] || (P[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : B("", !0)
      ])),
      t.active ? (p(), re(nr, { key: 1 })) : B("", !0)
    ], 40, sr)), [
      [Ot, t.active]
    ]);
  }
}), Ir = /* @__PURE__ */ Ee(Pr, [["__scopeId", "data-v-5602a785"]]), Ar = { class: "tb-brand" }, Wr = ["src", "alt"], Or = ["hidden"], Br = ["hidden"], Fr = { id: "vue-bookmark-folder-strip-root" }, Nr = { class: "tb-actions" }, Rr = {
  id: "workspace-launchers",
  hidden: ""
}, Hr = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = j(() => import("./WorkspaceLaunchers-D2l7INOF.js"));
    function o(a) {
      a.preventDefault(), a.stopPropagation();
      const c = typeof window < "u" ? window : null;
      c?.LogicWeaverWindowManager?.open ? c.LogicWeaverWindowManager.open("settings") : c?.LogicWeaverWindowTabs?.open ? c.LogicWeaverWindowTabs.open("settings") : Go.open();
    }
    function i(a) {
      a.preventDefault();
      const c = typeof window < "u" ? window : null;
      typeof c?.toggleBookmarkPanel == "function" ? c.toggleBookmarkPanel() : c?.LogicWeaverBookmarkPanel?.toggle ? c.LogicWeaverBookmarkPanel.toggle() : bi.toggleBookmarkPanel();
    }
    function s(a) {
      a.preventDefault();
      const c = typeof window < "u" ? window : null;
      c?.LogicWeaverProfilePanel?.open && c.LogicWeaverProfilePanel.open();
    }
    function r(a) {
      a.preventDefault(), co.open(a.clientX, a.clientY);
    }
    const g = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], h = H("☀️"), l = H("切换主题");
    function v() {
      if (typeof document > "u") return;
      const a = document.documentElement.dataset.theme || "light", c = g.find((f) => f.id === a) || g.find((f) => f.id === "light") || g[0];
      h.value = c.icon, l.value = `主题：${c.label}（点击更换）`;
    }
    function k(a) {
      if (a.preventDefault(), typeof document > "u") return;
      const c = document.documentElement.dataset.theme || "light", f = g.findIndex((T) => T.id === c), y = g[(f + 1) % g.length];
      document.documentElement.dataset.theme = y.id;
      try {
        localStorage.setItem("theme", y.id);
      } catch {
      }
      typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: y.id }), v(), document.querySelectorAll("iframe").forEach((T) => {
        try {
          T.contentWindow?.postMessage({ type: "theme-change", theme: y.id }, "*");
        } catch {
        }
      });
    }
    function $(a) {
      const c = a.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || (a.preventDefault(), a.stopPropagation());
    }
    function u(a) {
      const c = a.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || a.preventDefault();
    }
    return Ue(() => {
      const a = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = a, document.documentElement.setAttribute("data-theme", a), v();
    }), (a, c) => (p(), w("header", {
      class: he(["topbar", { "bookmark-folders-mode": d(St).enabled }]),
      onCopy: $,
      onSelectstart: u
    }, [
      n("div", Ar, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "头像 · 个人与浏览器信息",
          onClick: s,
          onContextmenu: c[0] || (c[0] = V((f) => r(f), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: d(nt).avatarUrl || "assets/bilibili.svg",
            alt: d(nt).userName || "信息中心头像"
          }, null, 8, Wr),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: d(nt).unreadCount <= 0
          }, _(d(nt).unreadCount), 9, Or)
        ], 32),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: d(St).enabled,
          onClick: i
        }, [...c[1] || (c[1] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, Br),
        n("div", Fr, [
          q(Ya)
        ])
      ]),
      q(Ir, {
        active: !d(no).activeId
      }, null, 8, ["active"]),
      n("div", Nr, [
        c[2] || (c[2] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", Rr, [
          q(d(t))
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
          onClick: k
        }, _(h.value), 1)
      ])
    ], 34));
  }
}), Gr = {
  key: 0,
  class: "notice"
}, jr = {
  key: 1,
  class: "muted small"
}, Kr = {
  key: 2,
  class: "notice"
}, Vr = {
  key: 3,
  class: "notice"
}, zr = { class: "wx-cur" }, Ur = { class: "wx-emoji" }, Yr = { class: "wx-temp" }, qr = { class: "wx-sub" }, Xr = { class: "wx-rain" }, Jr = { class: "wx-hours" }, Qr = { class: "hh" }, Zr = { class: "he" }, el = { class: "ht" }, tl = { class: "wx-days" }, ol = ["open"], il = { class: "weather-forecast-head" }, nl = { class: "weather-forecast-city-info" }, sl = { class: "weather-forecast-icon" }, al = { id: "weather-forecast-city-title" }, rl = { class: "small muted" }, ll = { class: "weather-forecast-actions" }, cl = {
  key: 0,
  class: "weather-metrics-grid"
}, dl = { class: "weather-metric-item" }, ul = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, pl = { class: "weather-metric-item" }, hl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, gl = { class: "weather-metric-item" }, fl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, ml = { class: "weather-metric-item" }, wl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, yl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, vl = { class: "day-date-col" }, bl = { class: "day-name" }, kl = { class: "day-date small muted" }, Cl = { class: "day-weather-col" }, _l = { class: "day-emoji" }, xl = { class: "day-cond" }, Tl = { class: "day-rain-col" }, Ll = {
  key: 0,
  class: "rain-tag"
}, Sl = {
  key: 1,
  class: "rain-tag empty"
}, Dl = { class: "day-temp-bar-col" }, Ml = { class: "low-temp" }, $l = { class: "temp-track" }, El = { class: "high-temp" }, Pl = { class: "weather-location-head" }, Il = { class: "weather-location-title-row" }, Al = ["title"], Wl = { class: "weather-input-wrapper" }, Ol = ["onKeydown"], Bl = { key: 0 }, Fl = {
  key: 0,
  class: "weather-location-suggestions"
}, Nl = ["onClick"], Rl = { class: "weather-suggestion-name" }, Hl = { class: "weather-suggestion-sub" }, Gl = {
  key: 1,
  class: "weather-suggestion-empty"
}, jl = { key: 1 }, Kl = { class: "weather-quick-chips-grid" }, Vl = ["onClick"], zl = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = H(!1), o = H({ x: 0, y: 0 }), i = H(""), s = H(null), r = H(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], h = ae(() => {
      const T = i.value.trim();
      return T ? Jt.filterCities(T, 6) : [];
    });
    function l(T) {
      const X = T?.clientX ?? window.innerWidth / 2 - 140, ue = T?.clientY ?? window.innerHeight / 2 - 320 / 2, O = Math.max(12, Math.min(window.innerWidth - 280 - 12, X)), D = Math.max(12, Math.min(window.innerHeight - 320 - 12, ue));
      o.value = { x: O, y: D }, t.value = !0, i.value = "", Ro(() => {
        r.value?.focus();
      });
    }
    function v() {
      t.value = !1, i.value = "";
    }
    async function k(T) {
      const x = T.trim();
      x && (v(), await Jt.changeCity(x));
    }
    function $() {
      const T = i.value.trim();
      T && k(T);
    }
    function u(T) {
      if (!t.value) return;
      const x = T.target;
      s.value && !s.value.contains(x) && v();
    }
    function a(T) {
      t.value && T.key === "Escape" && (T.preventDefault(), v());
    }
    Ue(() => {
      Ve.setRefreshAction(() => {
        Jt.loadWeather();
      }), Ve.setChangeLocationAction((T) => {
        l(T);
      }), Jt.loadWeather(), window.addEventListener("pointerdown", u, !0), window.addEventListener("keydown", a, !0);
    }), Ft(() => {
      window.removeEventListener("pointerdown", u, !0), window.removeEventListener("keydown", a, !0);
    });
    function c(T) {
      T.preventDefault(), l(T);
    }
    function f() {
      Ve.closeForecastModal();
    }
    function y(T) {
      T.target?.id === "weather-forecast-dialog" && f();
    }
    return (T, x) => (p(), w("div", {
      class: "weather-widget-container",
      onContextmenu: c
    }, [
      d(N).state === "unconfigured" ? (p(), w("p", Gr, [...x[6] || (x[6] = [
        Xe(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Xe(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : d(N).state === "loading" ? (p(), w("p", jr, "加载中…")) : d(N).state === "not_found" ? (p(), w("p", Kr, "找不到城市「" + _(d(N).city) + "」，右键可重新选择地点。", 1)) : d(N).state === "error" ? (p(), w("p", Vr, _(d(N).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : d(N).state === "ready" && d(N).data ? (p(), w(ne, { key: 4 }, [
        n("div", zr, [
          n("span", Ur, _(d(N).data.currentEmoji), 1),
          n("span", Yr, _(d(N).data.currentTemp) + "°", 1)
        ]),
        n("p", qr, _(d(N).data.subText), 1),
        n("p", Xr, _(d(N).data.rainText), 1),
        n("div", Jr, [
          (p(!0), w(ne, null, ve(d(N).data.hours, (S, M) => (p(), w("div", {
            key: M,
            class: "wx-h"
          }, [
            n("span", Qr, _(S.time), 1),
            n("span", Zr, _(S.emoji), 1),
            n("span", el, _(S.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", tl, [
          (p(!0), w(ne, null, ve(d(N).data.days, (S, M) => (p(), w("span", { key: M }, _(S.label) + " " + _(S.emoji) + " " + _(S.tempRange), 1))), 128))
        ])
      ], 64)) : B("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: d(N).forecastModalOpen,
        onClick: y
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: x[1] || (x[1] = V(() => {
          }, ["stop"]))
        }, [
          n("header", il, [
            n("div", nl, [
              n("span", sl, _(d(N).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", al, _(d(N).city || d(N).data?.cityName || "天气预报"), 1),
                n("p", rl, _(d(N).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", ll, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: x[0] || (x[0] = (S) => d(Ve).refresh())
              }, " ↻ 刷新 "),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: "关闭",
                onClick: f
              }, " ✕ ")
            ])
          ]),
          d(N).detailInfo ? (p(), w("div", cl, [
            n("div", dl, [
              x[7] || (x[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", ul, _(d(N).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", pl, [
              x[8] || (x[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", hl, _(d(N).detailInfo.wind || "微风"), 1)
            ]),
            n("div", gl, [
              x[9] || (x[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", fl, _(d(N).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", ml, [
              x[10] || (x[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", wl, _(d(N).detailInfo.airQuality || "良"), 1)
            ])
          ])) : B("", !0),
          n("div", yl, [
            (p(!0), w(ne, null, ve(d(N).forecastDays, (S, M) => (p(), w("div", {
              key: M,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", vl, [
                n("span", bl, _(S.dayName), 1),
                n("span", kl, _(S.date), 1)
              ]),
              n("div", Cl, [
                n("span", _l, _(S.emoji), 1),
                n("span", xl, _(S.condition), 1)
              ]),
              n("div", Tl, [
                S.rainProb > 0 ? (p(), w("span", Ll, "☂️ " + _(S.rainProb) + "%", 1)) : (p(), w("span", Sl, "无降水"))
              ]),
              n("div", Dl, [
                n("span", Ml, _(S.lowTemp) + "°", 1),
                n("div", $l, [
                  n("div", {
                    class: "temp-range-fill",
                    style: we({
                      left: `${Math.max(0, Math.min(100, (S.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (S.highTemp - S.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", El, _(S.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, ol),
      (p(), re(ut, { to: "body" }, [
        t.value ? (p(), w("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: s,
          class: "weather-location-context-menu",
          style: we({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: x[4] || (x[4] = V(() => {
          }, ["stop"])),
          onContextmenu: x[5] || (x[5] = V(() => {
          }, ["prevent"]))
        }, [
          n("div", Pl, [
            n("div", Il, [
              x[12] || (x[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: d(N).city
              }, [
                x[11] || (x[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Xe(" " + _(d(N).city || "未设置"), 1)
              ], 8, Al)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: V($, ["prevent"])
          }, [
            n("div", Wl, [
              x[13] || (x[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Oe(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": x[2] || (x[2] = (S) => i.value = S),
                onKeydown: vi(V($, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Ol), [
                [io, i.value]
              ]),
              i.value ? (p(), w("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: x[3] || (x[3] = (S) => i.value = ""),
                title: "清除输入"
              }, "✕")) : B("", !0)
            ]),
            x[14] || (x[14] = n("button", {
              type: "submit",
              class: "weather-location-submit"
            }, "确定", -1))
          ], 32),
          i.value.trim() ? (p(), w("div", Bl, [
            x[15] || (x[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            h.value.length ? (p(), w("div", Fl, [
              (p(!0), w(ne, null, ve(h.value, (S) => (p(), w("button", {
                key: S.name + S.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (M) => k(S.name)
              }, [
                n("span", Rl, _(S.name), 1),
                n("span", Hl, _(S.admin), 1)
              ], 8, Nl))), 128))
            ])) : (p(), w("div", Gl, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (p(), w("div", jl, [
            x[16] || (x[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", Kl, [
              (p(), w(ne, null, ve(g, (S) => n("button", {
                key: S,
                type: "button",
                class: he(["weather-quick-chip", { active: d(N).city === S }]),
                onClick: (M) => k(S)
              }, _(S), 11, Vl)), 64))
            ])
          ]))
        ], 36)) : B("", !0)
      ]))
    ], 32));
  }
}), In = /* @__PURE__ */ Ee(zl, [["__scopeId", "data-v-51b21266"]]), yi = "heroCustomMottoV1";
function Ul() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(yi);
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
const Tt = Ul(), G = Te({
  loaded: !1,
  customText: Tt.customText,
  history: Tt.history,
  currentIndex: Tt.customText && Tt.history.length ? Tt.history.findIndex((e) => e.text === Tt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Yl(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function ql(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Xl(e) {
  const t = (s) => String(s).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const Ke = {
  async init() {
    try {
      const e = await Yl(yi);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= G.history.length && (G.history = t, e.customText !== void 0 && (G.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      G.loaded = !0, G.customText && G.history.length && (G.currentIndex = G.history.findIndex(
        (e) => e.text === G.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: G.customText,
      history: G.history
    };
    await ql(yi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = Xl(/* @__PURE__ */ new Date());
    G.customText = t;
    const s = G.history.findIndex((r) => r.text === t);
    if (s !== -1) {
      const r = G.history.splice(s, 1)[0];
      r.date = o, r.time = i, G.history.unshift(r);
    } else
      G.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    G.history.length > 50 && (G.history = G.history.slice(0, 50)), G.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    G.customText = e.text, G.currentIndex = G.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    G.customText = null, G.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = G.history.findIndex((o) => o.id === e);
    t !== -1 && (G.history.splice(t, 1), G.currentIndex === t && (G.history.length > 0 ? this.selectHistory(G.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    G.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!G.history.length) return;
    let t = G.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= G.history.length && (t = 0), this.selectHistory(G.history[t]);
  },
  openMenu(e, t) {
    G.menuPos = { x: e, y: t }, G.menuOpen = !0;
  },
  closeMenu() {
    G.menuOpen = !1;
  }
}, Jl = { class: "motto-content" }, Ql = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, Zl = { class: "motto-menu-header" }, ec = { class: "dim" }, tc = { class: "motto-history-list" }, oc = {
  key: 0,
  class: "motto-history-empty dim"
}, ic = ["onClick"], nc = { class: "motto-item-date" }, sc = ["title"], ac = ["onClick"], rc = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = H(!1), o = H(""), i = H(null), s = ae(() => G.customText || ge.greetingText);
    function r() {
      Ke.closeMenu(), o.value = G.customText || ge.greetingText, t.value = !0, Ro(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function g() {
      if (!t.value) return;
      t.value = !1;
      const u = o.value.trim();
      Ke.setCustomMotto(u), u && Ie.fetch("标语", `已更新标语: ${u}`);
    }
    function h() {
      t.value = !1;
    }
    function l(u) {
      u.key === "Enter" ? (u.preventDefault(), g()) : u.key === "Escape" && (u.preventDefault(), h());
    }
    function v(u) {
      t.value || (u.preventDefault(), u.stopPropagation(), Ke.stepHistory(u.deltaY > 0 ? 1 : -1));
    }
    function k(u) {
      u.preventDefault(), u.stopPropagation(), Ke.openMenu(u.clientX, u.clientY);
    }
    function $(u) {
      G.menuOpen && (u.target.closest(".motto-context-menu") || Ke.closeMenu());
    }
    return Ue(() => {
      Ke.init(), window.addEventListener("click", $);
    }), Ft(() => {
      window.removeEventListener("click", $);
    }), (u, a) => (p(), w(ne, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: v,
        onContextmenu: k
      }, [
        t.value ? Oe((p(), w("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": a[0] || (a[0] = (c) => o.value = c),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: g,
          onKeydown: l
        }, null, 544)), [
          [io, o.value]
        ]) : (p(), w("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: we({ color: d(ge).greetColor }),
          onClick: r
        }, [
          n("span", Jl, _(s.value), 1),
          d(G).history.length > 1 ? (p(), w("span", Ql, "⇕")) : B("", !0)
        ], 4))
      ], 32),
      (p(), re(ut, { to: "body" }, [
        d(G).menuOpen ? (p(), w("div", {
          key: 0,
          class: "motto-context-menu",
          style: we({ left: `${d(G).menuPos.x}px`, top: `${d(G).menuPos.y}px` }),
          onClick: a[3] || (a[3] = V(() => {
          }, ["stop"])),
          onContextmenu: a[4] || (a[4] = V(() => {
          }, ["prevent"]))
        }, [
          n("div", Zl, [
            a[5] || (a[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", ec, _(d(G).history.length) + " 条记录", 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: r
          }, [...a[6] || (a[6] = [
            n("i", null, "✎", -1),
            n("span", null, "编辑当前标语", -1)
          ])]),
          a[9] || (a[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          a[10] || (a[10] = n("div", { class: "motto-history-label" }, "历史标语记录（点击切换）：", -1)),
          n("div", tc, [
            d(G).history.length ? (p(!0), w(ne, { key: 1 }, ve(d(G).history, (c) => (p(), w("div", {
              key: c.id,
              class: he(["motto-history-item", { active: d(G).customText === c.text }]),
              onClick: (f) => d(Ke).selectHistory(c)
            }, [
              n("span", nc, _(c.date), 1),
              n("span", {
                class: "motto-item-text",
                title: c.text
              }, _(c.text), 9, sc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: V((f) => d(Ke).deleteEntry(c.id), ["stop"])
              }, "×", 8, ac)
            ], 10, ic))), 128)) : (p(), w("div", oc, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          a[11] || (a[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: a[1] || (a[1] = //@ts-ignore
            (...c) => d(Ke).resetToSystem && d(Ke).resetToSystem(...c))
          }, [...a[7] || (a[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          d(G).history.length ? (p(), w("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: a[2] || (a[2] = //@ts-ignore
            (...c) => d(Ke).clearHistory && d(Ke).clearHistory(...c))
          }, [...a[8] || (a[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : B("", !0)
        ], 36)) : B("", !0)
      ]))
    ], 64));
  }
}), lc = /* @__PURE__ */ Ee(rc, [["__scopeId", "data-v-0514f22a"]]), cc = /* @__PURE__ */ de({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(l) {
      return l < 5 ? "夜深了" : l < 9 ? "早上好" : l < 12 ? "上午好" : l < 14 ? "中午好" : l < 18 ? "下午好" : l < 23 ? "晚上好" : "夜深了";
    }
    function i() {
      const l = mt.state.timezone;
      if (!l || l === "local") return /* @__PURE__ */ new Date();
      try {
        const v = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: l });
        return new Date(v);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function s() {
      const l = (X) => String(X).padStart(2, "0"), v = i(), k = v.getHours(), $ = v.getMinutes(), u = v.getSeconds(), a = v.getFullYear(), c = v.getMonth() + 1, f = v.getDate(), y = v.getDay(), T = `${l(k)}:${l($)}`, x = `:${l(u)}`, S = o(k), M = `${a}年${c}月${f}日 · ${t[y]}`;
      Mt.updateTime(T, x, S, M);
    }
    function r(l) {
      l.preventDefault(), mt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function g() {
      document.hidden ? h && (clearInterval(h), h = null) : (s(), h || (h = setInterval(s, 1e3)));
    }
    let h = null;
    return mt.initPreferences(), s(), Ue(() => {
      mt.initPreferences(), no.activeId || (s(), h = setInterval(s, 1e3)), document.addEventListener("visibilitychange", g);
    }), Ze(
      () => no.activeId,
      (l) => {
        l ? h && (clearInterval(h), h = null) : document.hidden || (s(), h || (h = setInterval(s, 1e3)));
      }
    ), Ft(() => {
      h && (clearInterval(h), h = null), document.removeEventListener("visibilitychange", g);
    }), (l, v) => (p(), w("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: we({ fontFamily: d(ge).fontFamily, color: d(ge).colorHex })
      }, [
        Xe(_(d(ge).timeText), 1),
        n("span", {
          id: "secs",
          style: we({ color: d(ge).colorHex })
        }, _(d(ge).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: we({ color: d(ge).dateColor })
      }, _(d(ge).dateText), 5)
    ], 32));
  }
}), An = /* @__PURE__ */ Ee(cc, [["__scopeId", "data-v-38840808"]]), dc = {
  key: 0,
  class: "home-music-degraded-box"
}, uc = { class: "degraded-badge-row" }, pc = { class: "degraded-status" }, hc = {
  key: 0,
  class: "degraded-host-tag"
}, gc = {
  key: 1,
  class: "degraded-host-tag"
}, fc = { class: "degraded-title-row" }, mc = ["title"], wc = { class: "degraded-track-artist" }, yc = { class: "degraded-progress-bar-wrap" }, vc = { class: "degraded-actions" }, bc = { class: "degraded-time" }, kc = { class: "home-vinyl-box" }, Cc = ["src"], _c = { class: "home-music-right" }, xc = ["title"], Tc = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Lc = { class: "home-music-seek-row" }, Sc = {
  id: "home-music-cur",
  class: "home-music-time"
}, Dc = ["value"], Mc = {
  id: "home-music-dur",
  class: "home-music-time"
}, $c = { class: "home-music-actions" }, Ec = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    Ue(() => {
      setTimeout(() => {
        bs();
      }, 200);
    });
    const t = ae(() => fn.visible || qe.djModalOpen || qe.isActive && qe.isJoined), o = ae(() => qe.isActive && qe.isJoined), i = ae(() => K.mode === "shuffle" ? "🔀" : K.mode === "one" ? "🔂" : "🔁");
    function s(g) {
      const h = g.target, l = Number(h.value);
      We.seek(l);
    }
    function r() {
      We.update({ coverUrl: "" });
    }
    return (g, h) => (p(), w("div", {
      id: "home-music-player-view",
      class: he(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (p(), w("div", dc, [
        n("div", uc, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", pc, _(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (p(), w("span", hc, " DJ: " + _(d(qe).hostName), 1)) : (p(), w("span", gc, " 工作区就绪 "))
        ]),
        n("div", fc, [
          n("h3", {
            class: "degraded-track-title",
            title: d(K).title
          }, _(d(K).title || "待机中"), 9, mc),
          n("p", wc, _(d(K).artist), 1)
        ]),
        n("div", yc, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: we({ width: d(K).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", vc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (l) => d(We).togglePlay())
          }, _(d(K).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", bc, _(d(K).formattedCurrent) + " / " + _(d(K).formattedDuration), 1)
        ])
      ])) : (p(), w(ne, { key: 1 }, [
        n("div", kc, [
          n("div", {
            id: "home-vinyl-needle",
            class: he(["home-vinyl-needle", { playing: d(K).playing }])
          }, [...h[8] || (h[8] = [
            Yt('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: he(["home-vinyl-disc", { playing: d(K).playing }]),
            title: "点击播放 / 暂停",
            onClick: h[1] || (h[1] = (l) => d(We).togglePlay())
          }, [
            d(K).coverUrl ? (p(), w("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: d(K).coverUrl,
              alt: "音乐封面",
              onError: r
            }, null, 40, Cc)) : B("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", _c, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: d(K).title
          }, _(d(K).title), 9, xc),
          n("p", Tc, _(d(K).artist), 1),
          n("div", Lc, [
            n("span", Sc, _(d(K).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: d(K).progressPercent,
              onInput: s
            }, null, 40, Dc),
            n("span", Mc, _(d(K).formattedDuration), 1)
          ]),
          n("div", $c, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: h[2] || (h[2] = (l) => d(We).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: h[3] || (h[3] = (l) => d(We).togglePlay())
            }, _(d(K).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: h[4] || (h[4] = (l) => d(We).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: he(["home-music-btn like-btn", { liked: d(K).liked }]),
              type: "button",
              title: "收藏",
              onClick: h[5] || (h[5] = (l) => d(We).toggleLike())
            }, _(d(K).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: h[6] || (h[6] = (l) => d(We).cycleMode())
            }, _(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Wn = /* @__PURE__ */ Ee(Ec, [["__scopeId", "data-v-25a69816"]]), Pc = 5, Ic = 180;
function Ac(e, t, o) {
  const i = t - e.left, s = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && s > e.height * 0.25 && s < e.height * 0.75;
}
function Wc(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Oc = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Bc = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Fc = {
  key: 0,
  class: "muted small"
}, Nc = {
  key: 1,
  class: "notice small"
}, Rc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Hc = {
  key: 3,
  class: "aihot-home-rich-list"
}, Gc = ["href", "title", "onClick"], jc = { class: "aihot-home-rich-main" }, Kc = { class: "aihot-home-rich-title" }, Vc = {
  key: 0,
  class: "aihot-home-rich-summary"
}, zc = { class: "aihot-home-rich-meta" }, Uc = { class: "aihot-home-rich-meta-left" }, Yc = {
  key: 0,
  class: "aihot-home-rich-tag"
}, qc = { class: "aihot-home-rich-source" }, Xc = { class: "aihot-home-rich-time" }, en = 6, Jc = /* @__PURE__ */ de({
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
    }, o = H([]), i = H(0), s = H(!0), r = H("");
    function g(c) {
      return c.category ? t[c.category] || c.category : "";
    }
    function h(c) {
      const f = c.publishedAt || c.published || "";
      if (!f) return "最新";
      const y = Number(f), T = Number.isFinite(y) && y > 0 ? new Date(y > 1e12 ? y : y * 1e3) : new Date(f);
      if (isNaN(T.getTime())) return String(f).slice(0, 16) || "最新";
      const x = (D) => String(D).padStart(2, "0"), S = T.getFullYear(), M = x(T.getMonth() + 1), X = x(T.getDate()), ue = x(T.getHours()), O = x(T.getMinutes());
      return `${S}-${M}-${X} ${ue}:${O}`;
    }
    const l = [
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
    function v() {
      const f = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(f) && f.length)
        return f;
      const y = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const T of y)
        try {
          const x = localStorage.getItem(T);
          if (x) {
            const S = JSON.parse(x);
            if (Array.isArray(S) && S.length) return S;
            if (S && Array.isArray(S.items) && S.items.length) return S.items;
          }
        } catch {
        }
      return [];
    }
    async function k(c = !1) {
      if (!c && o.value.length > 0) return;
      const f = v();
      f.length ? (o.value = f, s.value = !1) : o.value.length || (o.value = [...l], s.value = !1);
      try {
        const T = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), x = Array.isArray(T) ? T : T.items || T.data || T.results || [];
        if (x.length) {
          o.value = x, i.value = 0, r.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(x.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...l]);
      } finally {
        s.value = !1;
      }
    }
    function $() {
      if (!o.value.length) {
        s.value = !0, k(!0);
        return;
      }
      i.value += en, i.value >= o.value.length && (i.value = 0);
    }
    function u() {
      const c = window;
      if (typeof c.enterFullscreenCard == "function") {
        c.enterFullscreenCard("daily-aihot");
        return;
      }
      const f = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      f ? f.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function a(c, f) {
      if (f.ctrlKey || f.metaKey || f.shiftKey || f.button === 1) return;
      f.preventDefault();
      const y = c.links?.original || c.links?.aihot || c.url || "#";
      _i.openArticle(
        {
          id: c.id,
          title: c.title,
          summary: c.summary,
          sourceName: c.source?.name || c.sourceName || "AI HOT",
          published: h(c),
          url: y
        },
        ""
      );
    }
    return Ue(() => {
      k();
    }), (c, f) => (p(), w("section", Oc, [
      n("header", { class: "card-head aihot-home-head" }, [
        f[0] || (f[0] = n("span", { class: "bar cyan" }, null, -1)),
        f[1] || (f[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        f[2] || (f[2] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: $
        }, " 换一批 ↻ "),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: u
        }, " 热榜 ↗ ")
      ]),
      n("div", Bc, [
        s.value && !o.value.length ? (p(), w("p", Fc, "正在加载精选资讯…")) : r.value && !o.value.length ? (p(), w("p", Nc, _(r.value), 1)) : o.value.length ? (p(), w("div", Hc, [
          (p(!0), w(ne, null, ve(o.value.slice(i.value, i.value + en), (y, T) => (p(), w("a", {
            key: y.id || y.title,
            class: "aihot-home-rich-card",
            href: y.links?.original || y.links?.aihot || y.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${y.title}
${y.summary || ""}
点击在阅读器中查看`,
            onClick: (x) => a(y, x)
          }, [
            n("span", {
              class: he(["aihot-home-rich-rank", { top: i.value + T < 3 }])
            }, _(i.value + T + 1), 3),
            n("div", jc, [
              n("h3", Kc, _(y.title), 1),
              y.summary ? (p(), w("p", Vc, _(y.summary), 1)) : B("", !0),
              n("div", zc, [
                n("div", Uc, [
                  g(y) ? (p(), w("span", Yc, _(g(y)), 1)) : B("", !0),
                  n("span", qc, _(y.source?.name || y.sourceName || "AI HOT"), 1)
                ]),
                n("time", Xc, _(h(y)), 1)
              ])
            ])
          ], 8, Gc))), 128))
        ])) : (p(), w("p", Rc, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), Qc = /* @__PURE__ */ Ee(Jc, [["__scopeId", "data-v-cc4398a8"]]), Zc = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, ed = ["disabled", "aria-pressed"], td = ["disabled", "aria-pressed"], od = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, id = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], nd = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, sd = ["data-page"], ad = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], rd = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], ld = ["title", "onClick"], cd = {
  class: "launcher-folder-count",
  hidden: ""
}, dd = {
  class: "launcher-empty",
  key: "empty-msg"
}, ud = {
  key: 1,
  class: "launcher-media-stack"
}, pd = {
  key: 1,
  id: "launcher-bili"
}, hd = { class: "launcher-folder-preview" }, gd = { class: "launcher-folder-label launcher-title" }, fd = { class: "launcher-label launcher-title" }, md = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = j(() => import("./BookmarkBoard-CnhwbEe7.js")), o = H("sites"), i = H(!1);
    Ue(() => {
      ke.setExternalDragHandler(x), ke.setExternalDropHandler(S);
      const m = window;
      oe.hasBili && typeof m.ensureLauncherMediaCards == "function" && m.ensureLauncherMediaCards();
    });
    const s = H(!1), r = H(""), g = H(null), h = H(null), l = H(null), v = H(null);
    let k = !1, $ = 0, u = 0, a = 0, c = "", f = 0, y = "", T = 0;
    function x(m) {
      if (o.value !== "sites") return;
      if (!m || Ge.isOpen) {
        v.value && (v.value = null), y = "";
        return;
      }
      const b = document.elementsFromPoint(m.clientX, m.clientY);
      if (!b.some(
        (Me) => Me.classList.contains("launcher-site-items") || !!Me.closest?.(".launcher-site-items")
      )) {
        v.value && (v.value = null), y = "";
        return;
      }
      const L = b.find((Me) => Me.classList.contains("launcher-link") && Me.getAttribute("data-launcher-id") !== String(m.link.id) || Me.classList.contains("launcher-folder"));
      if (!L) return;
      const Y = L.classList.contains("launcher-link"), ce = Y ? L.getAttribute("data-launcher-id") : null, Se = Y ? null : L.getAttribute("data-launcher-folder"), J = Y ? `link-${ce}` : `folder-${Se}`, Z = L.getBoundingClientRect(), Pe = Z.left + Z.width / 2, Vo = Z.top + Z.height / 2, Rt = Math.hypot(m.clientX - Pe, m.clientY - Vo), bt = Date.now();
      if (Rt > Math.max(Z.width, Z.height) * 0.55 || J === y && bt - T < 180) return;
      const kt = Ye.value.filter(
        (Me) => Me.type !== "link" || String(Me.link.id) !== String(m.link.id)
      ), Qe = [...v.value || kt], lt = Qe.findIndex(
        (Me) => Me.type === "link" && String(Me.link.id) === String(m.link.id)
      ), ct = Qe.findIndex((Me) => Me.key === J);
      if (ct < 0) return;
      const je = {
        key: `link-${m.link.id}`,
        type: "link",
        link: m.link
      };
      lt >= 0 ? lt !== ct && (Qe.splice(lt, 1), Qe.splice(ct, 0, je), v.value = Qe, y = J, T = bt) : (Qe.splice(ct, 0, je), v.value = Qe, y = J, T = bt);
    }
    async function S(m) {
      if (o.value !== "sites" || Ge.isOpen) return !1;
      if (v.value) {
        const b = v.value.map((C) => ({
          type: C.type,
          id: C.type === "link" ? String(C.link.id) : void 0,
          groupName: C.type === "folder" ? C.folder.groupName : void 0
        }));
        return await ie.moveLinkTo(String(m.id), oe.activePage, "常用网站"), await ie.reorderPageItems(oe.activePage, b), v.value = null, y = "", !0;
      }
      return !1;
    }
    const M = Te({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let X = null, ue = 0, O = 0, D = null, Q = null, te = !1;
    function I(m, b) {
      if (b.button !== 0) return;
      X = b.pointerId, ue = b.clientX, O = b.clientY, u = b.clientX, a = b.clientY, D = String(m.id), Q = null, te = !1;
      const C = b.currentTarget.getBoundingClientRect();
      M.offsetX = b.clientX - C.left, M.offsetY = b.clientY - C.top, M.type = "link", M.link = m, M.folder = null, window.addEventListener("pointermove", E, { passive: !1 }), window.addEventListener("pointerup", W), window.addEventListener("pointercancel", W);
    }
    function R(m, b, C) {
      if (C.button !== 0 || C.target.closest(".launcher-folder-del-btn")) return;
      X = C.pointerId, ue = C.clientX, O = C.clientY, u = C.clientX, a = C.clientY, D = null, Q = m, te = !1;
      const L = C.currentTarget.getBoundingClientRect();
      M.offsetX = C.clientX - L.left, M.offsetY = C.clientY - L.top, M.type = "folder", M.folder = {
        groupName: m,
        size: fe(m),
        links: b?.links || []
      }, M.link = null, window.addEventListener("pointermove", E, { passive: !1 }), window.addEventListener("pointerup", W), window.addEventListener("pointercancel", W);
    }
    let A = 0, U = null;
    function be() {
      cancelAnimationFrame(A), A = 0, U = null;
    }
    function E(m) {
      m.pointerId === X && (te && m.cancelable && m.preventDefault(), U = m, !A && (A = requestAnimationFrame(() => {
        A = 0;
        const b = U;
        U = null, b && P(b);
      })));
    }
    function P(m) {
      if (m.pointerId !== X || !D && !Q) return;
      const b = Math.hypot(m.clientX - ue, m.clientY - O);
      if (!te && b > Pc && (te = !0, k = !0, D ? h.value = D : Q && (l.value = Q)), !te) return;
      (M.link || M.folder) && (M.visible = !0, M.x = m.clientX - M.offsetX, M.y = m.clientY - M.offsetY);
      const C = document.elementsFromPoint(m.clientX, m.clientY);
      if (Ei()) {
        const J = C.some(
          (Pe) => Pe.id === "launcher-folder-dialog" || !!Pe.closest?.("#launcher-folder-dialog")
        ), Z = document.querySelector("#launcher-folder-dialog");
        if (J && Z) {
          Z.classList.add("drop-hover-valid"), Ge.dropHoverValid = !0;
          return;
        } else
          Z?.classList.remove("drop-hover-valid"), Ge.dropHoverValid = !1;
        v.value = null;
        return;
      }
      const Y = v.value || Ye.value, ce = D ? `link-${D}` : `folder-${Q}`;
      if (Y.length) {
        const J = C.find((Z) => {
          if (Z.classList.contains("launcher-link")) {
            const Pe = Z.getAttribute("data-launcher-id");
            return Pe && `link-${Pe}` !== ce;
          }
          if (Z.classList.contains("launcher-folder")) {
            const Pe = Z.getAttribute("data-launcher-folder");
            return Pe && `folder-${Pe}` !== ce;
          }
          return !1;
        });
        if (J) {
          const Z = J.classList.contains("launcher-link"), Pe = Z ? J.getAttribute("data-launcher-id") : null, Vo = Z ? null : J.getAttribute("data-launcher-folder"), Rt = Z ? `link-${Pe}` : `folder-${Vo}`, bt = J.getBoundingClientRect();
          let kt = !0;
          D && !Z && (Ac(bt, m.clientX, m.clientY) ? (kt = !1, J.classList.add("drop-target")) : J.classList.remove("drop-target"));
          const Qe = Date.now();
          if (Wc(bt, m.clientX, m.clientY) || (kt = !1), Rt === c && Qe - f < Ic && (kt = !1), kt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((je) => je.classList.remove("drop-target"));
            const lt = Y.findIndex((je) => je.key === ce), ct = Y.findIndex((je) => je.key === Rt);
            if (lt >= 0 && ct >= 0 && lt !== ct) {
              const je = Y.slice(), Me = je.splice(lt, 1)[0];
              je.splice(ct, 0, Me), v.value = je, c = Rt, f = Qe;
            }
          }
        }
      }
      const Se = C.find((J) => J.classList.contains("launcher-page-tab"));
      if (Se) {
        const J = Se.getAttribute("data-page");
        J && J !== oe.activePage && Se.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((J) => J.classList.remove("drop-target"));
    }
    async function W(m) {
      if (m.pointerId === X) {
        be(), m.type === "pointercancel" ? pe() : P(m), window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", W), window.removeEventListener("pointercancel", W);
        try {
          if (te) {
            $ = Date.now(), k = !1;
            const b = document.elementsFromPoint(m.clientX, m.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((L) => L.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((L) => L.classList.remove("drop-target")), Ei() && Ge.activeFolder) {
              if (b.some(
                (Y) => Y.id === "launcher-folder-dialog" || !!Y.closest?.("#launcher-folder-dialog")
              )) {
                const ce = b.find((Se) => Se.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Ge.activeFolder;
                D ? await ie.moveLinkTo(D, void 0, ce) : Q && await ie.moveFolderInto(Q, ce);
              }
              return;
            }
            const C = b.find((L) => L.classList.contains("launcher-page-tab"));
            if (C) {
              const L = C.getAttribute("data-page");
              if (L) {
                D ? (await ie.moveLinkTo(D, L, "常用网站"), await ie.setPage(L)) : Q && await ie.moveFolderToPage(Q, L), pe();
                return;
              }
            }
            if (D) {
              const L = b.find((Y) => Y.classList.contains("launcher-folder"));
              if (L) {
                const Y = L.getAttribute("data-launcher-folder");
                if (Y) {
                  await ie.moveLinkTo(D, oe.activePage, Y), pe();
                  return;
                }
              }
            }
            if (v.value) {
              const L = v.value.map((Y) => ({
                type: Y.type,
                id: Y.type === "link" ? String(Y.link.id) : void 0,
                groupName: Y.type === "folder" ? Y.folder.groupName : void 0
              }));
              await ie.reorderPageItems(oe.activePage, L);
            }
          }
        } catch (b) {
          Ie.show({ appName: "常用网站", title: "移动未完成", message: b instanceof Error ? b.message : "请刷新核对，未自动重试。" });
        } finally {
          pe();
        }
      }
    }
    function pe() {
      be(), X = null, D = null, Q = null, te = !1, h.value = null, l.value = null, v.value = null, M.visible = !1, M.link = null, M.folder = null, c = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Ge.dropHoverValid = !1;
    }
    Ft(() => {
      ke.setExternalDragHandler(null), ke.setExternalDropHandler(null), pe(), window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", W), window.removeEventListener("pointercancel", W);
    });
    function Le(m) {
      const b = oe.pageLabels;
      return b && b[m] ? b[m] : m || "常用网站";
    }
    function Be(m, b) {
      const C = String(m.page || "").trim(), L = String(b).trim(), Y = oe.pageLabels || {}, ce = !C || C === "常用网站" || C === "默认";
      if (!L || L === "常用网站" || L === "默认") return ce;
      if (ce) return !1;
      if (C === L) return !0;
      const J = Y[C] || C, Z = Y[L] || L;
      return J === Z || C === Z || J === L;
    }
    function fe(m) {
      const b = oe.groupSizes;
      return b && b[m] === "large" ? "large" : "small";
    }
    function et(m) {
      return m === "large" ? 9 : 4;
    }
    function Fe(m, b) {
      const C = et(b), L = m.length > C ? C - 1 : C;
      return m.slice(0, L);
    }
    const Ye = ae(() => {
      const m = oe.activePage || "常用网站", C = oe.links.filter(
        (J) => Be(J, m)
      ), L = /* @__PURE__ */ new Map();
      C.forEach((J) => {
        const Z = J.group || "常用网站";
        Z !== "常用网站" && (L.has(Z) || L.set(Z, []), L.get(Z).push(J));
      });
      const Y = /* @__PURE__ */ new Set(), ce = [];
      C.forEach((J) => {
        const Z = J.group || "常用网站";
        Eo(oe.folders, Z) || (Z === "常用网站" ? ce.push({ key: `link-${J.id}`, type: "link", link: J }) : Y.has(Z) || (Y.add(Z), ce.push({
          key: `folder-${Z}`,
          type: "folder",
          folder: {
            groupName: Z,
            pageName: m,
            links: L.get(Z) || []
          }
        })));
      });
      const Se = oe.folders;
      return Se && Object.entries(Se).forEach(([J, Z]) => {
        if (Eo(oe.folders, J)) return;
        const Pe = Z?.page || "常用网站";
        (Pe === m || m === "常用网站" && Pe === "默认") && !Y.has(J) && (Y.add(J), ce.push({
          key: `folder-${J}`,
          type: "folder",
          folder: {
            groupName: J,
            pageName: m,
            links: L.get(J) || []
          }
        }));
      }), ce;
    }), Je = ae(() => v.value && v.value.length ? v.value : Ye.value), Ne = ae(() => {
      const m = oe.activePage || "常用网站", b = Le(m);
      return b === "默认" || m === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${b}”还是空的，把网站拖到这里。`;
    });
    function Mi(m) {
      v.value = null, h.value = null, l.value = null, ke.switchPage(m);
    }
    function Kn() {
      s.value = !0, r.value = "", Ro(() => {
        g.value?.focus();
      });
    }
    function $i() {
      if (!s.value) return;
      const m = r.value.trim();
      s.value = !1, m && ke.addPage(m);
    }
    function Vn(m) {
      m.key === "Enter" ? (m.preventDefault(), $i()) : m.key === "Escape" && (s.value = !1);
    }
    function zn(m, b) {
      ke.openPageMenu(m, b);
    }
    function Un(m) {
      const b = m.target;
      if (!b || b.closest(".launcher-link") || b.closest(".launcher-folder") || b.closest(".launcher-page-tab") || b.closest("button") || b.closest("input"))
        return;
      m.preventDefault();
      const C = oe.activePage || "常用网站";
      At.openBlankMenu(C, m.clientX, m.clientY);
    }
    function Yn(m) {
      o.value === "sites" && (!m.shiftKey || oe.pages.length < 2 || (m.preventDefault(), m.deltaY > 0 || m.deltaX > 0 ? ke.nextPage() : ke.prevPage()));
    }
    function qn(m) {
      m.target.closest(".launcher-page-tab") || m.stopPropagation();
    }
    function Xn(m) {
      m.button === 0 && (u = m.clientX, a = m.clientY);
    }
    function Jn(m, b) {
      b.preventDefault(), b.stopPropagation(), !(Math.hypot(b.clientX - u, b.clientY - a) >= 6 || k || Date.now() - $ < 600) && ke.openLink(m, b);
    }
    function Qn(m, b) {
      ke.openLinkMenu(m, b);
    }
    function Zn(m, b) {
      if (k || Date.now() - $ < 450) {
        b.preventDefault(), b.stopPropagation();
        return;
      }
      ke.openFolder(m, b);
    }
    function es(m, b, C) {
      ke.openFolderMenu(m, b, C);
    }
    function ts(m) {
      ke.deleteFolder(m);
    }
    function os(m, b) {
      const C = Array.from(b.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), oe.activePage !== m && Mi(m), b.currentTarget?.classList.add("drop-target");
    }
    function is(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function ns(m, b) {
      b.currentTarget?.classList.remove("drop-target");
      let L = "";
      const Y = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (Y)
        try {
          L = String(JSON.parse(Y)?.id || "");
        } catch {
        }
      if (!L && (h.value || window.__activeLauncherLink) && (L = String(window.__activeLauncherLink?.id || h.value || "")), L) {
        b.preventDefault(), b.stopPropagation(), await ie.moveLinkTo(L, m, "常用网站"), await ie.setPage(m);
        return;
      }
      const ce = window;
      typeof ce.importDroppedLauncherItem == "function" && (b.preventDefault(), b.stopPropagation(), await ce.importDroppedLauncherItem(b, "常用网站", m));
    }
    function ss(m) {
      const b = Array.from(m.dataTransfer?.types || []);
      if (!b.includes("application/x-newtab-launcher") && !b.includes("application/x-newtab-bookmark") && !b.includes("text/uri-list") && !b.includes("text/plain")) return;
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = b.includes("application/x-newtab-launcher") ? "move" : "copy"), m.currentTarget?.classList.add("drop-target");
    }
    function as(m) {
      const b = m.currentTarget;
      b?.contains(m.relatedTarget) || b?.classList.remove("drop-target");
    }
    async function rs(m) {
      m.currentTarget?.classList.remove("drop-target");
      let C = "";
      const L = m.dataTransfer?.getData("application/x-newtab-launcher");
      if (L)
        try {
          C = String(JSON.parse(L)?.id || "");
        } catch {
        }
      if (!C && (h.value || window.__activeLauncherLink) && (C = String(window.__activeLauncherLink?.id || h.value || "")), C) {
        m.preventDefault(), m.stopPropagation(), await ie.moveLinkTo(C, oe.activePage, "常用网站");
        return;
      }
      const Y = window;
      if (typeof Y.importDroppedLauncherItem == "function") {
        m.preventDefault(), m.stopPropagation(), await Y.importDroppedLauncherItem(m, "常用网站", oe.activePage);
        return;
      }
      const ce = m.dataTransfer?.getData("text/plain");
      ce && /^https?:\/\//i.test(ce.trim()) && (m.preventDefault(), m.stopPropagation(), await ie.addLink({
        title: "",
        url: ce.trim(),
        page: oe.activePage
      }));
    }
    function Ei() {
      if (!Ge.isOpen) return !1;
      if (typeof document < "u") {
        const m = document.querySelector("#launcher-folder-dialog");
        return !!(m && m.open);
      }
      return !1;
    }
    function ls(m, b) {
      b.preventDefault();
    }
    function cs(m) {
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), m.currentTarget?.classList.add("drop-target");
    }
    function ds(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function us(m, b) {
      b.currentTarget?.classList.remove("drop-target"), b.preventDefault(), b.stopPropagation();
      const L = b.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (L && L !== m) {
        try {
          await ie.moveFolderInto(L, m);
        } catch (Se) {
          Ie.show({ appName: "常用网站", title: "移动未完成", message: Se instanceof Error ? Se.message : "请刷新后核对。" });
        }
        return;
      }
      let Y = "";
      const ce = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (ce)
        try {
          Y = String(JSON.parse(ce)?.id || "");
        } catch {
        }
      !Y && (h.value || window.__activeLauncherLink) && (Y = String(window.__activeLauncherLink?.id || h.value || "")), Y && await ie.moveLinkTo(Y, oe.activePage, m);
    }
    return (m, b) => (p(), w(ne, null, [
      d(oe).showSites ? (p(), w("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: Yn
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: b[5] || (b[5] = V(() => {
          }, ["stop"])),
          onContextmenu: qn
        }, [
          n("div", Zc, [
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "sites",
              onClick: b[0] || (b[0] = (C) => o.value = "sites")
            }, "常用网站", 8, ed),
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "bookmarks",
              onClick: b[1] || (b[1] = (C) => o.value = "bookmarks")
            }, "书签", 8, td)
          ]),
          Oe(n("div", od, [
            (p(!0), w(ne, null, ve(d(oe).pages, (C) => (p(), w("button", {
              key: C,
              type: "button",
              class: he(["launcher-page-tab", { active: C === d(oe).activePage }]),
              "data-page": C,
              role: "tab",
              title: `切换到${Le(C)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: b[2] || (b[2] = V(() => {
              }, ["stop"])),
              onClick: V((L) => Mi(C), ["prevent", "stop"]),
              onContextmenu: V((L) => zn(C, L), ["prevent", "stop"]),
              onDragover: (L) => os(C, L),
              onDragleave: b[3] || (b[3] = (L) => is(L)),
              onDrop: (L) => ns(C, L)
            }, _(Le(C)), 43, id))), 128)),
            s.value ? Oe((p(), w("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: g,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": b[4] || (b[4] = (C) => r.value = C),
              onKeydown: Vn,
              onBlur: $i
            }, null, 544)), [
              [io, r.value]
            ]) : (p(), w("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Kn
            }, " + "))
          ], 512), [
            [Ot, o.value === "sites"]
          ]),
          o.value === "bookmarks" ? (p(), w("div", nd)) : B("", !0)
        ], 32),
        o.value === "bookmarks" ? (p(), re(d(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: b[6] || (b[6] = (C) => i.value = C)
        })) : B("", !0),
        Oe(n("div", {
          class: "launcher-page-panel",
          "data-page": d(oe).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Un,
          onDragover: b[12] || (b[12] = (C) => ss(C)),
          onDragleave: b[13] || (b[13] = (C) => as(C)),
          onDrop: b[14] || (b[14] = (C) => rs(C))
        }, [
          (p(), re($o, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: d(oe).activePage,
            name: h.value || l.value ? "launcher-grid" : ""
          }, {
            default: Wt(() => [
              (p(!0), w(ne, null, ve(Je.value, (C) => (p(), w(ne, {
                key: C.key
              }, [
                C.type === "link" ? (p(), w("a", {
                  key: C.key,
                  class: he(["launcher-link", {
                    "is-dragging": h.value === String(C.link.id)
                  }]),
                  href: C.link.url,
                  title: C.link.title + (C.link.note ? `
📝 ` + C.link.note : "") + `
🔗 ` + C.link.url,
                  "data-launcher-id": String(C.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: b[7] || (b[7] = V(() => {
                  }, ["prevent"])),
                  onPointerdown: (L) => I(C.link, L),
                  onMousedown: b[8] || (b[8] = (L) => Xn(L)),
                  onClick: V((L) => Jn(C.link, L), ["prevent"]),
                  onContextmenu: V((L) => Qn(C.link, L), ["prevent"])
                }, [
                  q(Wi, {
                    link: C.link
                  }, null, 8, ["link"])
                ], 42, ad)) : C.type === "folder" ? (p(), w("div", {
                  key: C.key,
                  class: he(["launcher-folder", [
                    `size-${fe(C.folder.groupName)}`,
                    { "is-dragging": l.value === C.folder.groupName }
                  ]]),
                  title: `${C.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(C.folder.groupName),
                  draggable: "true",
                  onPointerdown: (L) => R(C.folder.groupName, C.folder, L),
                  onDragstart: (L) => ls(C.folder.groupName, L),
                  onDragover: b[10] || (b[10] = (L) => cs(L)),
                  onDragleave: b[11] || (b[11] = (L) => ds(L)),
                  onDrop: (L) => us(C.folder.groupName, L),
                  onClick: (L) => Zn(C.folder.groupName, L),
                  onContextmenu: V((L) => es(C.folder.groupName, C.folder.pageName, L), ["prevent"])
                }, [
                  q(Wi, {
                    folder: { title: C.folder.groupName, preview: C.folder.links, count: C.folder.links.length },
                    size: fe(C.folder.groupName)
                  }, {
                    default: Wt(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${C.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: b[9] || (b[9] = V(() => {
                        }, ["stop"])),
                        onClick: V((L) => ts(C.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, ld)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", cd, _(C.folder.links.length), 1)
                ], 42, rd)) : B("", !0)
              ], 64))), 128)),
              Je.value.length ? B("", !0) : (p(), w("p", dd, _(Ne.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, sd), [
          [Ot, o.value === "sites"]
        ])
      ], 32)) : B("", !0),
      d(oe).hasTodo || d(oe).hasBili ? (p(), w("div", ud, [
        d(oe).hasTodo ? (p(), re(Qc, { key: 0 })) : d(oe).hasBili ? (p(), w("div", pd)) : B("", !0)
      ])) : B("", !0),
      (p(), re(ut, { to: "body" }, [
        M.visible ? (p(), w("div", {
          key: 0,
          class: he(["launcher-drag-ghost", [
            M.type === "folder" ? `folder-ghost size-${M.folder?.size}` : "link-ghost"
          ]]),
          style: we({
            left: `${M.x}px`,
            top: `${M.y}px`
          })
        }, [
          M.type === "folder" && M.folder ? (p(), w(ne, { key: 0 }, [
            n("div", hd, [
              (p(!0), w(ne, null, ve(Fe(M.folder.links, M.folder.size), (C, L) => (p(), re(Oi, {
                key: C.id || L,
                link: C,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", gd, _(M.folder.groupName), 1)
          ], 64)) : M.link ? (p(), w(ne, { key: 1 }, [
            q(Oi, {
              link: M.link
            }, null, 8, ["link"]),
            n("span", fd, _(M.link.title), 1)
          ], 64)) : B("", !0)
        ], 6)) : B("", !0)
      ]))
    ], 64));
  }
}), On = /* @__PURE__ */ Ee(md, [["__scopeId", "data-v-e2bb88a0"]]), Do = Object.keys(Nt);
let _o = !1, di = 0, Ut, ui;
function tn(e) {
  for (const t of Do)
    Object.prototype.hasOwnProperty.call(e, t) && (Nt[t] = e[t] !== !1);
}
function wd() {
  const e = Nt;
  ke.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || Ho.close();
}
const on = {
  start() {
    if (_o) return;
    _o = !0;
    const e = ++di;
    ui = Ze(() => Do.map((o) => Nt[o]), wd, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    Ut = (o, i) => {
      if (i !== "local") return;
      const s = {};
      for (const r of Do) o[r] && (s[r] = o[r].newValue);
      tn(s);
    }, t?.storage?.onChanged?.addListener(Ut), t?.storage?.local && t.storage.local.get(Do).then((o) => {
      _o && di === e && tn(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    _o = !1, di++, ui?.(), ui = void 0, Ut && globalThis.chrome?.storage?.onChanged?.removeListener(Ut), Ut = void 0;
  }
}, yd = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, vd = { class: "launcher-inner" }, bd = { class: "launcher-overview" }, kd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, Cd = { id: "weather-body" }, _d = { class: "launcher-center" }, xd = {
  class: "hero-clock",
  id: "hero-clock"
}, Td = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Ld = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Sd = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    Ue(() => {
      Io.initWallpaper();
    });
    function t() {
      Ae.handleToolClick("music");
    }
    return (o, i) => (p(), w("section", yd, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", vd, [
        n("div", bd, [
          Oe(n("section", kd, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", Cd, [
              q(In)
            ])
          ], 512), [
            [Ot, d(Nt).showWeather]
          ]),
          n("div", _d, [
            n("div", xd, [
              q(lc),
              q(An)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = V(() => {
              }, ["prevent"]))
            }, [
              q(an)
            ], 32)
          ]),
          n("section", Td, [
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
            n("div", Ld, [
              q(Wn)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: he(["launcher-groups", { "has-sites": d(oe).showSites, "has-todoist": d(oe).hasTodo, "has-bili": d(oe).hasBili, "has-media": d(oe).hasTodo || d(oe).hasBili }])
        }, [
          q(On)
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
}), ht = /* @__PURE__ */ de({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Wo(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && $e.markRunning(i.id), Ze(i.lifecycle.isVisible, (g) => {
      g && $e.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const s = ae(() => !!Mo[i.id]), r = j({
      loader: i.loadView,
      errorComponent: de({
        setup: () => () => i.lifecycle.isVisible() ? it("section", { class: "card wide card-fullscreen", role: "alert" }, [
          it("h2", i.title),
          it("p", "工作区代码加载失败。请先保存其它窗口的草稿，再手动刷新页面；不会自动刷新或重发任务。"),
          it("button", { type: "button", onClick: i.lifecycle.hide }, "返回首页")
        ]) : null
      })
    });
    return lo(() => {
      i.lifecycle.hide(), rn.delete(i.id), delete Mo[i.id];
    }), (g, h) => s.value ? (p(), re(ln(d(r)), {
      key: d($e).getRenderKey(d(i).id)
    })) : B("", !0);
  }
}), Dd = { class: "logicweaver-workspaces-layer" }, Md = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, $d = { id: "vue-workbench-root" }, Ed = { id: "vue-todoist-root" }, Pd = { id: "vue-bili-favorites-root" }, Id = { id: "vue-youtube-root" }, Ad = { id: "vue-pricing-root" }, Wd = { id: "vue-aihot-root" }, Od = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = H(!!no.activeId);
    return Ue(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (p(), w("div", Dd, [
      t.value ? (p(), w("main", Md, [
        n("div", $d, [
          q(ht, { id: "workbench" })
        ]),
        n("div", Ed, [
          q(ht, { id: "todoist" })
        ]),
        n("div", Pd, [
          q(ht, { id: "daily-bilibili" })
        ]),
        Oe(n("div", Id, [
          q(ht, { id: "daily-youtube" })
        ], 512), [
          [Ot, d(Nt).showYouTube]
        ]),
        n("div", Ad, [
          q(ht, { id: "daily-pricing" })
        ]),
        n("div", Wd, [
          q(ht, { id: "daily-aihot" })
        ]),
        q(ht, { id: "card-github" })
      ])) : B("", !0)
    ]));
  }
}), Bd = ["aria-label"], Fd = { class: "dock-menu-head" }, Nd = { class: "dock-menu-title" }, Rd = ["src", "alt"], Hd = {
  key: 1,
  class: "dock-menu-emoji"
}, Gd = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, s = ae(() => !o.target || o.target.type !== "tool" ? !1 : $e.isRunning(o.target.id)), r = ae(() => !o.target || o.target.type !== "tool" ? !1 : $e.isVisible(o.target.id)), { menuRef: g, style: h } = kn({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Dt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function l() {
      o.target && ($e.openApp(o.target.id), i("close"));
    }
    function v() {
      o.target && ($e.hideApp(o.target.id), i("close"));
    }
    async function k() {
      o.target && (await $e.reloadApp(o.target.id), i("close"));
    }
    async function $() {
      if (!o.target) return;
      const c = o.target;
      if ((await $e.quitApp(c.id))?.ok === !1) {
        i("close");
        return;
      }
      Ie.show({
        appName: c.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: c.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function u() {
      if (!o.target) return;
      const c = o.target, f = so.uninstall(c.id);
      i("close"), await f || Ie.show({
        appName: c.title,
        title: "入口停用未确认",
        subtitle: so.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: c.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function a() {
      if (!o.target) return;
      const f = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(f, "_blank"), i("close");
    }
    return (c, f) => (p(), re(ut, { to: "body" }, [
      e.target ? (p(), w("div", {
        key: 0,
        ref_key: "menuRef",
        ref: g,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: we(d(h)),
        onClick: f[1] || (f[1] = V(() => {
        }, ["stop"])),
        onContextmenu: f[2] || (f[2] = V(() => {
        }, ["prevent"]))
      }, [
        n("div", Fd, [
          n("div", Nd, [
            e.target.icon ? (p(), w("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Rd)) : e.target.emoji ? (p(), w("span", Hd, _(e.target.emoji), 1)) : B("", !0),
            n("strong", null, _(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (p(), w("span", {
            key: 0,
            class: he(["dock-status-tag", { "is-running": s.value }])
          }, [
            f[3] || (f[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Xe(" " + _(s.value ? "运行中" : "未启动"), 1)
          ], 2)) : B("", !0)
        ]),
        f[12] || (f[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (p(), w(ne, { key: 0 }, [
          r.value ? (p(), w("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: v
          }, [...f[5] || (f[5] = [
            n("span", { class: "dock-menu-symbol" }, "−", -1),
            n("span", null, "隐藏窗口", -1)
          ])])) : (p(), w("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
          }, [...f[4] || (f[4] = [
            n("span", { class: "dock-menu-symbol" }, "↗", -1),
            n("span", null, "打开窗口", -1)
          ])])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: k
          }, [...f[6] || (f[6] = [
            n("span", { class: "dock-menu-symbol" }, "⟲", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "重新加载"),
              n("small", null, "单应用热重启")
            ], -1)
          ])]),
          f[9] || (f[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: u
          }, [...f[7] || (f[7] = [
            n("span", { class: "dock-menu-symbol" }, "📌", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "从 Dock 栏移出"),
              n("small", null, "可在模块管理中重新添加")
            ], -1)
          ])]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: $
          }, [...f[8] || (f[8] = [
            n("span", { class: "dock-menu-symbol" }, "✕", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "真正的关闭"),
              n("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (p(), w("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: a
        }, [...f[10] || (f[10] = [
          n("span", { class: "dock-menu-symbol" }, "↗", -1),
          n("span", null, "在新标签页打开官网", -1)
        ])])) : (p(), w("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: f[0] || (f[0] = (y) => i("close"))
        }, [...f[11] || (f[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Bd)) : B("", !0)
    ]));
  }
}), jd = /* @__PURE__ */ Ee(Gd, [["__scopeId", "data-v-3aa85877"]]), Kd = { class: "mac-dock-shelf" }, Vd = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], zd = ["src", "alt"], Ud = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Yd = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], qd = ["src", "alt"], Xd = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, Jd = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Qd = {
  key: 3,
  class: "mac-dock-badge"
}, Zd = ["src"], eu = {
  key: 1,
  class: "mac-dock-emoji"
}, tu = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Dt), o = H(null), i = ae(() => Object.fromEntries(Dt.tools.map((I) => {
      const R = Wo(I.id)?.badgeCount?.() || 0;
      return [I.id, Number.isFinite(R) ? Math.max(0, Math.floor(R)) : 0];
    })));
    function s(I) {
      I.stopPropagation(), o.value = null, $(I.currentTarget), so.open();
    }
    function r(I, R) {
      R.stopPropagation(), o.value = null, $(R.currentTarget), gt.triggerItem("target", I);
    }
    function g(I, R) {
      const U = R.currentTarget.getBoundingClientRect(), be = Dt.position, E = be === "left" || be === "right";
      o.value = {
        type: "card",
        id: I.id,
        title: I.title,
        icon: I.icon,
        x: E ? be === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: E ? U.top + U.height / 2 : be === "top" ? U.bottom + 8 : U.top
      };
    }
    function h(I) {
      I.stopPropagation(), o.value = null, $(I.currentTarget), gt.triggerItem("home", "home-launcher");
    }
    function l(I, R) {
      R.stopPropagation(), o.value = null, $(R.currentTarget), Wo(I) || $e.markRunning(I), gt.triggerItem("tool", I);
    }
    function v(I, R) {
      const U = R.currentTarget.getBoundingClientRect(), be = Dt.position, E = be === "left" || be === "right";
      o.value = {
        type: "tool",
        id: I.id,
        title: I.title,
        icon: I.icon,
        emoji: I.emoji,
        x: E ? be === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: E ? U.top + U.height / 2 : be === "top" ? U.bottom + 8 : U.top
      };
    }
    const k = /* @__PURE__ */ new Map();
    function $(I) {
      if (!I || (k.get(I)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const R = I.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      k.set(I, R);
      const A = () => {
        k.get(I) === R && k.delete(I);
      };
      R.onfinish = A, R.oncancel = A;
    }
    const u = H(null), a = Te({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), c = H(null), f = H(null), y = ae(() => c.value || t.value.cards), T = ae(() => f.value || t.value.tools);
    let x = "", S = 0, M = !1, X = 0;
    function ue(I, R, A) {
      if (A.button !== 0 || A.target.closest(".mac-dock-market-btn")) return;
      const E = A.currentTarget.getBoundingClientRect();
      M = !1, u.value = {
        type: I,
        id: R.id,
        item: R,
        startX: A.clientX,
        startY: A.clientY,
        initialLeft: E.left,
        initialTop: E.top,
        width: E.width,
        height: E.height
      }, window.addEventListener("pointermove", O), window.addEventListener("pointerup", D), window.addEventListener("pointercancel", D);
    }
    function O(I) {
      if (!u.value) return;
      const R = I.clientX - u.value.startX, A = I.clientY - u.value.startY, U = Math.hypot(R, A);
      if (!M && U > 5 && (M = !0, a.visible = !0, a.item = u.value.item, a.type = u.value.type, a.width = u.value.width, a.height = u.value.height, u.value.type === "card" ? c.value = [...t.value.cards] : f.value = [...t.value.tools]), !M) return;
      a.x = I.clientX - a.width / 2, a.y = I.clientY - a.height / 2;
      const E = document.elementsFromPoint(I.clientX, I.clientY).find(
        (fe) => fe.classList.contains("mac-dock-item") && !fe.classList.contains("mac-dock-market-btn")
      );
      if (!E) return;
      const P = E.getAttribute("data-dock-target"), W = E.getAttribute("data-dock-tool"), pe = u.value.type, Le = u.value.id, Be = Date.now();
      if (pe === "card" && P && P !== Le && P !== "home-launcher") {
        const fe = E.getBoundingClientRect(), et = fe.left + fe.width / 2;
        if (Math.abs(I.clientX - et) > fe.width * 0.55 || P === x && Be - S < 180) return;
        const Fe = [...c.value || t.value.cards], Ye = Fe.findIndex((Ne) => Ne.id === Le), Je = Fe.findIndex((Ne) => Ne.id === P);
        if (Ye >= 0 && Je >= 0 && Ye !== Je) {
          const Ne = Fe.splice(Ye, 1)[0];
          Fe.splice(Je, 0, Ne), c.value = Fe, x = P, S = Be;
        }
      } else if (pe === "tool" && W && W !== Le) {
        const fe = E.getBoundingClientRect(), et = fe.left + fe.width / 2;
        if (Math.abs(I.clientX - et) > fe.width * 0.55 || W === x && Be - S < 180) return;
        const Fe = [...f.value || t.value.tools], Ye = Fe.findIndex((Ne) => Ne.id === Le), Je = Fe.findIndex((Ne) => Ne.id === W);
        if (Ye >= 0 && Je >= 0 && Ye !== Je) {
          const Ne = Fe.splice(Ye, 1)[0];
          Fe.splice(Je, 0, Ne), f.value = Fe, x = W, S = Be;
        }
      }
    }
    function D() {
      window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", D), window.removeEventListener("pointercancel", D), M && u.value && (X = Date.now() + 250, u.value.type === "card" && c.value ? gt.reorderCards(c.value.map((I) => I.id)) : u.value.type === "tool" && f.value && gt.reorderTools(f.value.map((I) => I.id))), a.visible = !1, a.item = null, c.value = null, f.value = null, u.value = null, M = !1, x = "";
    }
    function Q(I, R) {
      Date.now() < X || r(I, R);
    }
    function te(I, R) {
      Date.now() < X || l(I, R);
    }
    return lo(() => {
      for (const I of k.values()) I.cancel();
      k.clear(), window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", D), window.removeEventListener("pointercancel", D);
    }), (I, R) => (p(), w(ne, null, [
      n("div", Kd, [
        q($o, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Wt(() => [
            (p(!0), w(ne, null, ve(y.value, (A) => (p(), w("button", {
              key: A.id,
              class: he(["mac-dock-item", {
                "is-active": t.value.activeTargetId === A.id,
                "is-drag-origin": u.value && u.value.id === A.id
              }]),
              type: "button",
              "data-dock-target": A.id,
              title: A.title,
              onPointerdown: (U) => ue("card", A, U),
              onClick: V((U) => Q(A.id, U), ["stop"]),
              onContextmenu: V((U) => g(A, U), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: A.icon,
                alt: A.title
              }, null, 8, zd),
              t.value.activeTargetId === A.id ? (p(), w("span", Ud)) : B("", !0)
            ], 42, Vd))), 128))
          ]),
          _: 1
        }),
        R[5] || (R[5] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: "常用主页",
          onClick: R[0] || (R[0] = V((A) => h(A), ["stop"]))
        }, [...R[3] || (R[3] = [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: "主页"
          }, null, -1)
        ])]),
        R[6] || (R[6] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        q($o, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Wt(() => [
            (p(!0), w(ne, null, ve(T.value, (A) => (p(), w("button", {
              key: A.id,
              class: he(["mac-dock-item", {
                "is-active": d($e).isRunning(A.id),
                "is-drag-origin": u.value && u.value.id === A.id
              }]),
              type: "button",
              "data-dock-tool": A.id,
              title: A.title,
              onPointerdown: (U) => ue("tool", A, U),
              onClick: V((U) => te(A.id, U), ["stop"]),
              onContextmenu: V((U) => v(A, U), ["prevent"])
            }, [
              A.icon ? (p(), w("img", {
                key: 0,
                class: "mac-dock-icon",
                src: A.icon,
                alt: A.title
              }, null, 8, qd)) : A.emoji ? (p(), w("span", Xd, _(A.emoji), 1)) : B("", !0),
              d($e).isRunning(A.id) ? (p(), w("span", Jd)) : B("", !0),
              i.value[A.id] > 0 ? (p(), w("span", Qd, _(i.value[A.id] > 99 ? "99+" : i.value[A.id]), 1)) : B("", !0)
            ], 42, Yd))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: he(["mac-dock-item mac-dock-market-btn", { "is-active": d(so).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: R[1] || (R[1] = V((A) => s(A), ["stop"]))
        }, [...R[4] || (R[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (p(), re(ut, { to: "body" }, [
        a.visible && a.item ? (p(), w("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: we({
            width: a.width + "px",
            height: a.height + "px",
            transform: "translate3d(" + a.x + "px," + a.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          a.item.icon ? (p(), w("img", {
            key: 0,
            class: "mac-dock-icon",
            src: a.item.icon,
            alt: ""
          }, null, 8, Zd)) : a.item.emoji ? (p(), w("span", eu, _(a.item.emoji), 1)) : B("", !0)
        ], 4)) : B("", !0)
      ])),
      q(jd, {
        target: o.value,
        onClose: R[2] || (R[2] = (A) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Bn = /* @__PURE__ */ Ee(tu, [["__scopeId", "data-v-4528a5df"]]), ou = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, iu = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], nu = { class: "win-toast-head" }, su = ["src"], au = { class: "win-toast-app" }, ru = ["onClick"], lu = ["onClick"], cu = { class: "win-toast-title" }, du = {
  key: 0,
  class: "win-toast-subtitle"
}, uu = {
  key: 1,
  class: "win-toast-snippet"
}, pu = {
  key: 0,
  class: "win-toast-actions"
}, hu = ["onClick"], gu = ["onClick"], fu = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = H({}), r = H({});
    let g = null;
    function h(c) {
      const f = t.get(c);
      f !== void 0 && clearTimeout(f), t.delete(c);
    }
    function l(c, f = c.duration) {
      h(c.id), i.set(c.id, f), o.set(c.id, Date.now()), r.value[c.id] = !1, s.value[c.id] = Math.max(0, Math.min(100, f / c.duration * 100)), Ro(() => requestAnimationFrame(() => {
        s.value[c.id] = 0;
      })), t.set(c.id, window.setTimeout(() => {
        t.delete(c.id), Ie.close(c.id);
      }, f));
    }
    function v(c) {
      h(c.id);
      const f = Date.now() - (o.get(c.id) || Date.now()), y = Math.max(0, (i.get(c.id) ?? c.duration) - f);
      i.set(c.id, y), r.value[c.id] = !0, s.value[c.id] = Math.max(0, Math.min(100, y / c.duration * 100));
    }
    function k(c) {
      l(c, Math.max(1500, i.get(c.id) ?? c.duration));
    }
    function $(c) {
      h(c.id), Ie.close(c.id);
    }
    function u(c) {
      if ($(c), !!c.onClick)
        try {
          Promise.resolve(c.onClick()).catch((f) => console.warn("Notification action failed", f));
        } catch (f) {
          console.warn("Notification action failed", f);
        }
    }
    function a(c) {
      const f = Math.max(500, i.get(c.id) ?? c.duration);
      return {
        width: `${s.value[c.id] ?? 100}%`,
        transition: r.value[c.id] ? "none" : `width ${f}ms linear`
      };
    }
    return Ue(() => {
      g = new MutationObserver(() => {
        const f = new Set(uo.map((y) => y.id));
        for (const y of uo)
          !y.closing && !t.has(y.id) && !i.has(y.id) && l(y);
        for (const y of i.keys())
          f.has(y) || (h(y), i.delete(y), o.delete(y), delete s.value[y], delete r.value[y]);
      });
      const c = document.getElementById("win-toast-container");
      c && g.observe(c, { childList: !0 });
      for (const f of uo) l(f);
    }), lo(() => {
      g?.disconnect(), g = null;
      for (const c of t.values()) clearTimeout(c);
      t.clear();
    }), (c, f) => (p(), re(ut, { to: "body" }, [
      n("div", ou, [
        q($o, { name: "win-toast" }, {
          default: Wt(() => [
            (p(!0), w(ne, null, ve(d(uo), (y) => (p(), w("article", {
              key: y.id,
              class: he(["win-toast-card", [y.appType, { closing: y.closing }]]),
              "data-toast-fingerprint": y.fingerprint,
              onMouseenter: (T) => v(y),
              onMouseleave: (T) => k(y)
            }, [
              n("header", nu, [
                n("img", {
                  src: y.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, su),
                n("span", au, _(y.appName), 1),
                f[0] || (f[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (T) => $(y)
                }, "✕", 8, ru)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (T) => u(y)
              }, [
                n("span", cu, _(y.title), 1),
                y.subtitle ? (p(), w("span", du, _(y.subtitle), 1)) : B("", !0),
                y.message ? (p(), w("span", uu, _(y.message), 1)) : B("", !0)
              ], 8, lu),
              y.showActions && y.actionLabel ? (p(), w("footer", pu, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (T) => u(y)
                }, _(y.actionLabel), 9, hu),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (T) => $(y)
                }, "关闭", 8, gu)
              ])) : B("", !0),
              n("div", {
                class: "win-toast-progress",
                style: we(a(y))
              }, null, 4)
            ], 42, iu))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Fn = /* @__PURE__ */ Ee(fu, [["__scopeId", "data-v-6f35d74e"]]), mu = ["id"], wu = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = Os().filter((o) => o.presentation !== "card").map((o) => {
      Ze(o.lifecycle.isVisible, (s) => {
        s && $e.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = de({
        setup: () => () => it("section", { class: "dock-module-load-error", role: "alert" }, [
          it("p", `${o.title} 的界面代码未能加载，并非只能打开一个窗口。`),
          it("p", "若刚更新过扩展代码，请先保存草稿，再手动刷新整个页面；旧页面引用的分块文件可能已经被移除。不会自动刷新或关闭其它窗口。"),
          it("button", { type: "button", onClick: () => {
            $e.reloadApp(o.id);
          } }, "重试此窗口"),
          it("button", { type: "button", onClick: () => {
            $e.hideApp(o.id);
          } }, "隐藏窗口")
        ])
      });
      return {
        definition: o,
        mounted: ae(() => !!Mo[o.id]),
        view: j({
          loader: o.loadView,
          errorComponent: i
        })
      };
    });
    return lo(() => {
      for (const { definition: o } of t)
        Ae.close(o.id), rn.delete(o.id), Mo[o.id] = !1;
    }), (o, i) => (p(!0), w(ne, null, ve(d(t), (s) => Oe((p(), w("div", {
      id: s.definition.rootId,
      key: s.definition.id
    }, [
      s.mounted.value ? (p(), re(ln(s.view), {
        key: d($e).getRenderKey(s.definition.id)
      })) : B("", !0)
    ], 8, mu)), [
      [Ot, s.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), yu = /* @__PURE__ */ Ee(wu, [["__scopeId", "data-v-8164c563"]]);
function He(e, t) {
  const o = H(!1);
  return Ze(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), vt(o);
}
const vu = ["onKeydown"], bu = { class: "fo-up-preview-head" }, ku = ["src"], Cu = { class: "fo-up-preview-meta" }, _u = { class: "fo-up-preview-name-row" }, xu = ["href"], Tu = ["disabled"], Lu = { class: "fo-up-preview-sign" }, Su = { class: "fo-up-preview-videos" }, Du = {
  key: 0,
  class: "fo-up-preview-loading"
}, Mu = {
  key: 1,
  class: "fo-up-preview-empty"
}, $u = {
  key: 2,
  class: "fo-up-preview-empty"
}, Eu = ["href"], Pu = ["src"], Iu = {
  key: 0,
  class: "fo-bili-duration"
}, Au = { class: "fo-up-preview-video-info" }, Wu = ["href"], Ou = { class: "fo-up-preview-video-meta" }, Bu = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", Fu = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = H(!1);
    function o() {
      if (!le.submitting) {
        if (!le.followed) {
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
    return (s, r) => d(le).open ? (p(), w("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: V(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: we({ left: `${d(le).left}px`, top: `${d(le).top}px` }),
        onKeydown: vi(V(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", bu, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: d(le).face || Bu,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, ku),
          n("div", Cu, [
            n("div", _u, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${d(le).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, _(d(le).name), 9, xu),
              n("button", {
                type: "button",
                class: he([
                  d(le).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: d(le).submitting,
                onClick: o
              }, _(d(le).submitting ? "处理中…" : t.value ? "确定取消？" : d(le).followed ? "取消关注" : "＋ 关注"), 11, Tu)
            ]),
            n("p", Lu, _(d(le).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        r[1] || (r[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Su, [
          d(le).loading ? (p(), w("div", Du, [...r[0] || (r[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : d(le).error ? (p(), w("p", Mu, _(d(le).error), 1)) : d(le).videos.length ? (p(!0), w(ne, { key: 3 }, ve(d(le).videos, (g) => (p(), w("article", {
            key: g.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: g.url,
              target: "_blank",
              rel: "noreferrer"
            }, [
              n("img", {
                src: g.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Pu),
              g.duration ? (p(), w("span", Iu, _(g.duration), 1)) : B("", !0)
            ], 8, Eu),
            n("div", Au, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: g.url,
                target: "_blank",
                rel: "noreferrer"
              }, _(g.title), 9, Wu),
              n("div", Ou, [
                n("span", null, "▣ " + _(g.playCount), 1),
                n("span", null, _(g.published), 1)
              ])
            ])
          ]))), 128)) : (p(), w("p", $u, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, vu)
    ], 32)) : B("", !0);
  }
}), Nu = /* @__PURE__ */ Ee(Fu, [["__scopeId", "data-v-83b4a8d5"]]), Ru = { class: "logicweaver-overlays-layer" }, Hu = { id: "vue-notification-root" }, Gu = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, ju = { id: "vue-bili-message-panel-root" }, Ku = { id: "vue-profile-panel-root" }, Vu = { id: "vue-bookmark-menu-root" }, zu = { id: "vue-bookmark-panel-root" }, Uu = { id: "vue-launcher-dialogs-root" }, Yu = { id: "vue-launcher-folder-root" }, qu = { id: "vue-launcher-menus-root" }, Xu = { id: "vue-settings-dialog-root" }, Ju = { id: "vue-clock-settings-root" }, Qu = { id: "vue-bili-theater-root" }, Zu = { id: "vue-bili-mini-player-root" }, ep = { id: "vue-ai-dialog-root" }, tp = { id: "vue-aihot-viewer-root" }, op = { id: "vue-nav-wheel-root" }, ip = { id: "vue-github-detail-root" }, np = { id: "vue-bili-subtitle-modal-root" }, sp = { id: "vue-firecrawl-modal-root" }, ap = { id: "vue-floating-image-viewer-root" }, rp = { id: "vue-github-analysis-modal-root" }, lp = { id: "vue-command-palette-root" }, cp = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = He(() => so.state.isOpen), o = He(() => ao.state.isOpen), i = He(() => mt.state.isOpen), s = He(() => js.open), r = He(() => eo.state.isOpen), g = He(() => ks.isOpen), h = He(() => Ns.isOpen), l = He(() => Ti.state.isOpen), v = He(() => Cs.isOpen), k = He(() => De.isOpen), $ = He(() => ki.state.isOpen), u = He(() => Ge.isOpen), a = He(() => Ct.editDialog.isOpen || Ct.iconPicker.isOpen || Ct.linkMove.isOpen || Ct.folderMove.isOpen || Ct.groupMerge.isOpen || Ct.folderDelete.isOpen), c = j(() => import("./ProfileMenu-CZTx0e1K.js")), f = j(() => import("./BookmarkNoteMenu-BLDFC1LG.js")), y = j(() => import("./BookmarkPanel-5GiW0efJ.js")), T = j(() => import("./ClockSettingsMenu-tNsZTjN1.js")), x = j(() => import("./ProfilePanel-BQr_G4hA.js")), S = j(() => import("./LauncherDialogs-FC4PexBl.js")), M = j(() => import("./LauncherFolderDialog-Cds8uz-Z.js")), X = j(() => import("./LauncherMenus-DDILMB5g.js")), ue = j(() => import("./SettingsDialog-D6vea66f.js")), O = j(() => import("./BiliMiniPlayer-BFlhNCBU.js")), D = j(() => import("./BiliTheaterDialog-CWGfsybZ.js")), Q = j(() => import("./BiliMessagePanel-CXTI1L3Z.js")), te = j(() => import("./AiDialog-bTb4ALN9.js")), I = j(() => import("./AihotViewer-M_AglXqN.js")), R = j(() => import("./NavWheelOverlay-BJKnQqCk.js")), A = j(() => import("./GitHubRepoDetailDrawer-gio5H2_w.js")), U = j(() => import("./BiliSubtitleModal-CPeIb0t2.js")), be = j(() => import("./FirecrawlModal-DYBhIB8N.js")), E = j(() => import("./FloatingImageViewer-CQVC7ikM.js")), P = j(() => import("./GitHubAnalysisModal-Dwiw-nbt.js")), W = j(() => import("./CommandPalette-DjqPz9eO.js")), pe = j(() => import("./AppPromptModal-CTueLEA4.js")), Le = j(async () => {
      const [Be, fe] = await Promise.all([
        import("./PluginMarketDialog-BVsP_D7M.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Ps("logicweaver-market-styles", fe.default), Be.default;
    });
    return (Be, fe) => (p(), w("div", Ru, [
      n("div", Hu, [
        q(Fn)
      ]),
      n("div", Gu, [
        q(d(c))
      ]),
      n("div", ju, [
        d(h) ? (p(), re(d(Q), { key: 0 })) : B("", !0)
      ]),
      n("div", Ku, [
        d(o) ? (p(), re(d(x), { key: 0 })) : B("", !0)
      ]),
      n("div", Vu, [
        d($) ? (p(), re(d(f), { key: 0 })) : B("", !0)
      ]),
      n("div", zu, [
        q(d(y))
      ]),
      n("div", Uu, [
        d(a) ? (p(), re(d(S), { key: 0 })) : B("", !0)
      ]),
      n("div", Yu, [
        d(u) ? (p(), re(d(M), { key: 0 })) : B("", !0)
      ]),
      n("div", qu, [
        q(d(X))
      ]),
      n("div", Xu, [
        q(d(ue))
      ]),
      n("div", Ju, [
        d(i) ? (p(), re(d(T), { key: 0 })) : B("", !0)
      ]),
      n("div", Qu, [
        d(r) ? (p(), re(d(D), { key: 0 })) : B("", !0)
      ]),
      n("div", Zu, [
        d(g) ? (p(), re(d(O), { key: 0 })) : B("", !0)
      ]),
      n("div", ep, [
        d(l) ? (p(), re(d(te), { key: 0 })) : B("", !0)
      ]),
      n("div", tp, [
        d(s) ? (p(), re(d(I), { key: 0 })) : B("", !0)
      ]),
      n("div", op, [
        q(d(R))
      ]),
      q(yu),
      n("div", ip, [
        d(v) ? (p(), re(d(A), { key: 0 })) : B("", !0)
      ]),
      n("div", np, [
        q(d(U))
      ]),
      n("div", sp, [
        q(d(be))
      ]),
      n("div", ap, [
        q(d(E))
      ]),
      n("div", rp, [
        q(d(P))
      ]),
      n("div", lp, [
        d(k) ? (p(), re(d(W), { key: 0 })) : B("", !0)
      ]),
      q(Nu),
      q(d(pe)),
      d(t) ? (p(), re(d(Le), { key: 0 })) : B("", !0)
    ]));
  }
}), dp = ["data-active-workspace"], up = /* @__PURE__ */ de({
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
    let s = "";
    function r(l, v = "image/svg+xml") {
      if (typeof document > "u") return;
      const k = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(l) : l;
      if (s === k) return;
      s = k;
      const $ = document.querySelectorAll("link[rel*='icon']");
      if ($.length > 0)
        $.forEach((u) => {
          u.type = v, u.href = k;
        });
      else {
        const u = document.createElement("link");
        u.rel = "icon", u.type = v, u.href = k, document.head.appendChild(u);
      }
    }
    function g() {
      if (typeof document > "u") return;
      const l = i[po.value] || i.home;
      if (r(l.icon, l.iconType), K.playing && K.title) {
        const v = K.artist ? ` - ${K.artist}` : "";
        document.title = `▶ ${K.title}${v}`;
        return;
      }
      if (Ht.playing && Ht.title) {
        document.title = `▶ ${Ht.title} · 电台`;
        return;
      }
      document.title = l.title;
    }
    Ze(
      [
        () => po.value,
        () => K.playing,
        () => K.title,
        () => K.artist,
        () => Ht.playing,
        () => Ht.title
      ],
      () => {
        g();
      },
      { immediate: !0 }
    );
    const h = ae(() => po.value === "home" ? "" : po.value);
    return Ze(() => no.activeId, (l) => {
      document.body.classList.toggle("has-card-fullscreen", !!l);
    }, { immediate: !0, flush: "sync" }), Ue(() => {
      if (typeof document < "u") {
        document.body.dataset.spa = "1", document.body.classList.remove("is-starting");
        const l = document.getElementById("endfield-loader");
        l && l.remove();
      }
      try {
        mi.bindGlobalListener(), st.start(), on.start(), wi.init().catch((l) => console.warn("[Launcher] 初始化失败", l)), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), Ft(() => {
      st.stop(), wi.stop(), on.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: h,
      windowManagerController: Ae
    }), (l, v) => (p(), w("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": h.value || ""
    }, [
      q(ja),
      q(Hr),
      q(Sd),
      q(Od),
      n("nav", {
        id: "mac-dock",
        class: he(["mac-dock", "dock-" + d(Dt).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(Bn)
      ], 2),
      q(cp)
    ], 8, dp));
  }
}), pp = /* @__PURE__ */ Ee(up, [["__scopeId", "data-v-b35946c1"]]), hp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, gp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, fp = { class: "rhine-scaler" }, mp = { class: "rhine-center-group" }, wp = { class: "rhine-auth-status" }, yp = { class: "rhine-auth-text" }, vp = ["hidden"], bp = { class: "rhine-cinema-caption" }, kp = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = H(window.innerHeight), o = H(window.innerWidth), i = H(!1), s = H(!1), r = H(10), g = H(1), h = H(0), l = /* @__PURE__ */ new Set();
    let v = 0, k = () => {
    };
    const $ = ae(() => `${String(Math.round(Re.renderedProgress)).padStart(2, "0")}%`), u = ae(() => {
      const O = Re.renderedProgress / 100 * t.value + 10;
      return `${Math.min(O, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), a = ae(() => Re.renderedProgress >= 75 ? "START PROCESSING..." : Re.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), c = ae(() => Re.finished ? "身份验证通过 · 欢迎进入终端" : Re.status ? `身份信息确认 · ${Re.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), f = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function y(O, D) {
      const Q = window.setTimeout(() => {
        l.delete(Q), O();
      }, D);
      l.add(Q);
    }
    function T() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function x(O) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        T();
        return;
      }
      const D = O ? 180 : 260, Q = O ? 200 : 280, te = performance.now(), I = (R) => {
        const A = R - te, U = Math.min(1, A / D), be = 1 - Math.pow(1 - U, 3);
        if (r.value = 10 + be * Math.max(0, o.value - 10), A > D && (g.value = Math.max(0, 1 - (A - D) / Q)), A >= D + Q) {
          T();
          return;
        }
        v = requestAnimationFrame(I);
      };
      y(() => {
        v = requestAnimationFrame(I);
      }, O ? 60 : 120);
    }
    function S(O) {
      O || (i.value = !0), y(() => {
        s.value = !0, h.value = 6, g.value = 0, y(T, 380);
      }, O ? 40 : 420);
    }
    function M(O) {
      Re.style === "rhinelab" ? S(O) : x(O);
    }
    function X() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function ue(O) {
      Re.finished || (O.key === "Enter" || O.key === " " || O.key === "Escape") && (O.preventDefault(), rt.skip("KEYBOARD SKIP"));
    }
    return Ue(() => {
      document.documentElement.style.setProperty("--rhine-scale", f.value), window.addEventListener("resize", X, { passive: !0 }), window.addEventListener("keydown", ue, !0), k = sa(M), Re.finished && M(Re.forced);
    }), lo(() => {
      k(), window.removeEventListener("resize", X), window.removeEventListener("keydown", ue, !0), cancelAnimationFrame(v);
      for (const O of l) clearTimeout(O);
      l.clear();
    }), (O, D) => (p(), w("div", {
      class: "intro-vue-content",
      style: we({ "--rhine-scale": f.value, opacity: g.value, filter: `blur(${h.value}px)` })
    }, [
      n("div", hp, [
        D[2] || (D[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        D[3] || (D[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: we({ height: `${d(Re).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: we({ top: u.value })
        }, [
          D[1] || (D[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, _($.value), 1),
          n("small", null, _(d(Re).status), 1)
        ], 4),
        D[4] || (D[4] = Yt('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: we({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", gp, [
        D[12] || (D[12] = Yt('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", fp, [
          D[10] || (D[10] = Yt('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: D[0] || (D[0] = (Q) => d(rt).skip("ENTER SYSTEM"))
          }, [...D[5] || (D[5] = [
            Xe("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", mp, [
            D[8] || (D[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", wp, [
              D[6] || (D[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", yp, _(a.value), 1),
              D[7] || (D[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: he(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...D[9] || (D[9] = [
            Yt('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, vp),
          n("div", bp, _(c.value), 1),
          D[11] || (D[11] = n("div", { class: "rhine-powered" }, [
            Xe("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: he(["rhine-white", { flash: s.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Cp = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      co.trigger(o);
    }
    return (o, i) => (p(), w(ne, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = V((s) => t("messages"), ["stop"]))
      }, " 在本地查看我的信息与性能 "),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[1] || (i[1] = V((s) => t("refresh"), ["stop"]))
      }, " 刷新账号与性能探针 "),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[2] || (i[2] = V((s) => t("switch"), ["stop"]))
      }, " 切换用户（打开 B站） "),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[3] || (i[3] = V((s) => t("web"), ["stop"]))
      }, " 打开 B站个人中心 ")
    ], 64));
  }
}), _p = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      xi.openWorkspace(o, !0);
    }
    return (o, i) => (p(), w(ne, null, [
      n("button", {
        id: "ai-top-open",
        type: "button",
        onClick: i[0] || (i[0] = (s) => t("ai"))
      }, "AI 助手"),
      n("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: i[1] || (i[1] = (s) => t("todoist"))
      }, "Todoist"),
      n("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: i[2] || (i[2] = (s) => t("stickers"))
      }, "表情包"),
      n("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: i[3] || (i[3] = (s) => t("calcom"))
      }, "预约"),
      n("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: i[4] || (i[4] = (s) => t("wallpaper"))
      }, "壁纸库"),
      ws(o.$slots, "default")
    ], 64));
  }
}), xp = j(() => import("./GitHubWorkspaceCard-DoCxdnLW.js")), Tp = j(() => import("./ProfilePanel-BQr_G4hA.js")), Lp = j(() => import("./BookmarkNoteMenu-BLDFC1LG.js")), Sp = j(() => import("./BookmarkPanel-5GiW0efJ.js")), Dp = j(() => import("./LauncherDialogs-FC4PexBl.js")), Mp = j(() => import("./SettingsDialog-D6vea66f.js")), $p = j(() => import("./SettingsView-Cxh1lN_1.js")), Ep = j(() => import("./ClockSettingsMenu-tNsZTjN1.js")), Pp = j(() => import("./BiliTheaterDialog-CWGfsybZ.js")), Ip = j(() => import("./BiliMiniPlayer-BFlhNCBU.js")), Ap = j(() => import("./BiliMessagePanel-CXTI1L3Z.js")), Wp = j(() => import("./ModelPricingCard-C6lX2exW.js")), Op = j(() => import("./BilibiliWorkspace-B9x7Uy9A.js")), Bp = j(() => import("./YouTubeCard-DREftPBu.js")), Fp = j(() => import("./AihotFeed-XHexvRwR.js")), Np = j(() => import("./GitHubTrending-Dby4nS6E.js")), Rp = j(() => import("./AiDialog-bTb4ALN9.js")), Hp = j(() => import("./AihotViewer-M_AglXqN.js")), Gp = j(() => import("./NavWheelOverlay-BJKnQqCk.js")), jp = j(() => import("./StandaloneHost-DdxqgbTb.js")), Kp = j(() => import("./LauncherFolderDialog-Cds8uz-Z.js")), Vp = j(() => import("./LauncherMenus-DDILMB5g.js"));
function ee(e, t, o, i) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: s }) => {
      const r = s(t.root);
      if (!r) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return i?.setMounted?.(!0), () => {
          i?.setMounted?.(!1);
        };
      const g = r.innerHTML, h = cn(o);
      h.config.errorHandler = (l, v, k) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${k})`, l), r.dataset.vueError = "1";
      };
      try {
        h.mount(r), i?.setMounted?.(!0);
      } catch (l) {
        throw i?.setMounted?.(!1), r.innerHTML = g, l;
      }
      return () => {
        i?.setMounted?.(!1), h.unmount();
      };
    }
  });
}
function zp(e) {
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
      const o = cn(kp);
      let i = !1;
      const s = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", s, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        rt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (s(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", s), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ee(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, pp), document.getElementById("vue-spa-root") || ee(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, jp), ee(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Fn), ee(e, { id: "profile-menu", title: "账号与性能右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Cp, co), ee(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, _p, xi), ee(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Bn, gt), ee(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, An), ee(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, an), ee(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Wn, We), ee(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, On, ke), ee(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, In), ee(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, xp), ee(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Vs, dn), ee(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, zs, un), ee(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Us, pn), ee(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, Ys, hn), ee(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, qs, gn), ee(e, { id: "profile-panel", spaOwned: !0, title: "个人信息中心与微架构抽屉", order: 71, root: "vue-profile-panel-root", capabilities: ["ui:profile-panel", "profile:sampling"] }, Tp, ao), ee(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Lp, ki), ee(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Dp, Zt), ee(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Kp, dt), ee(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Vp, At), ee(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Sp, Ho), ee(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Po), ee(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, $p), ee(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Mp, Go), ee(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Ep, mt), ee(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Pp, eo), ee(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Ip), ee(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Rp, Ti), ee(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Hp, _i), ee(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Gp, me), ee(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Ap, ft), ee(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Wp, yn), ee(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Op, mn), ee(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Bp, vn), ee(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Fp, wn), ee(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Np, bn);
}
const nn = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new Map();
let Up = 1, Qt = null;
const sn = /\b(?:buy|purchase|pay|checkout|order|delete|remove|erase|send|post|publish|submit|transfer|withdraw|reset password)\b|购买|支付|下单|删除|移除|发送|发布|提交|转账|提现|修改密码/i;
function Di(e) {
  let t = nn.get(e);
  return t || (t = Up++, nn.set(e, t)), oo.set(t, e), t;
}
function Nn() {
  return window.location.protocol === "chrome-extension:" && ["/newtab.html", "/bilibili.html"].includes(window.location.pathname);
}
function Fo(e) {
  return e.isConnected && !e.closest('[aria-hidden="true"],[inert]') && e.checkVisibility({ checkOpacity: !0, checkVisibilityCSS: !0 });
}
function jo(e) {
  const t = e;
  return !["password", "file", "hidden"].includes(t.type || "") && !e.matches(":disabled") && !e.closest('[aria-disabled="true"]');
}
function Rn(e) {
  const t = e, o = t.getAttribute("aria-labelledby")?.split(/\s+/).map((s) => document.getElementById(s)?.textContent?.trim() || "").filter(Boolean).join(" ") || "", i = "labels" in t ? [...t.labels || []].map((s) => s.textContent?.trim() || "").filter(Boolean).join(" ") : "";
  return (o || t.getAttribute("aria-label") || i || t.getAttribute("title") || t.getAttribute("placeholder") || t.innerText || t.textContent || "").trim().slice(0, 160);
}
function Hn(e) {
  const t = e;
  return e.getAttribute("role") || { A: "link", BUTTON: "button", SELECT: "combobox", TEXTAREA: "textbox" }[e.tagName] || (e.tagName === "INPUT" ? ["checkbox", "radio"].includes(t.type) ? t.type : ["submit", "button", "reset"].includes(t.type) ? "button" : "textbox" : "button");
}
function No(e) {
  const t = e;
  return "value" in t ? String(t.value || "").slice(0, 200) : "";
}
function Gn() {
  return [
    performance.timeOrigin,
    location.href,
    scrollX,
    scrollY,
    innerWidth,
    innerHeight,
    [...document.querySelectorAll("input,textarea,select")].filter(jo).map((e) => [Di(e), No(e), e.checked, e.selectedIndex])
  ];
}
function jn(e) {
  if (!e || !Fo(e) || !jo(e)) return "";
  const t = e.closest("form,dialog,[role=dialog],article,li,tr") || e.parentElement;
  return JSON.stringify([
    Di(e),
    Hn(e),
    Rn(e),
    No(e),
    e.checked,
    e.getAttribute("href"),
    e.getAttribute("aria-expanded"),
    t?.textContent?.trim().slice(0, 250) || ""
  ]);
}
function Yp() {
  if (!Nn() || !document.body) throw new Error("Unsupported workspace page");
  for (const [a, c] of oo) c.isConnected || oo.delete(a);
  const e = [], t = 'a[href],button,input,textarea,select,summary,[contenteditable="true"],[role="button"],[role="link"],[role="checkbox"],[role="tab"],[role="menuitem"],[role="textbox"]';
  for (const a of document.querySelectorAll(t)) {
    if (!jo(a) || !Fo(a)) continue;
    const c = a.getBoundingClientRect(), f = c.x + c.width / 2, y = c.y + c.height / 2;
    if (!c.width || !c.height || f < 0 || y < 0 || f >= innerWidth || y >= innerHeight) continue;
    const T = Di(a), x = Hn(a), S = Rn(a) || x;
    if (a.tagName === "SELECT") {
      const M = a;
      for (const X of M.options) !X.disabled && !X.selected && e.push({
        id: "e" + (e.length + 1),
        kind: "select",
        node: T,
        role: x,
        label: S + " -> " + X.label.slice(0, 100),
        value: X.value,
        current_value: M.selectedOptions[0]?.label || ""
      });
    } else {
      const X = !a.readOnly && (a.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]),textarea,[contenteditable="true"]') || ["textbox", "searchbox"].includes(a.getAttribute("role") || ""));
      e.push({
        id: "e" + (e.length + 1),
        kind: X ? "fill" : "click",
        node: T,
        role: x,
        label: S,
        value: No(a)
      }), X && e.push({
        id: "e" + (e.length + 1),
        kind: "click",
        node: T,
        role: x,
        label: "Open " + S,
        value: No(a)
      });
    }
    if (e.length >= 120) break;
  }
  const o = document.documentElement.scrollHeight, i = e.slice(0, 120);
  scrollY + innerHeight < o - 2 && i.push({ id: "scroll_down", kind: "scroll", label: "Scroll down", delta: 560 }), scrollY > 0 && i.push({ id: "scroll_up", kind: "scroll", label: "Scroll up", delta: -560 }), i.push({ id: "wait", kind: "wait", label: "Wait for page" });
  const s = [], r = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), g = document.createRange();
  let h = 0, l;
  for (; (l = r.nextNode()) && h < 4e3; ) {
    const a = l.parentElement, c = l.textContent?.trim() || "";
    if (!a || !c || !Fo(a) || a.closest("script,style,noscript,template")) continue;
    g.selectNodeContents(l);
    const f = g.getBoundingClientRect();
    !f.width || !f.height || f.bottom <= 0 || f.top >= innerHeight || f.right <= 0 || f.left >= innerWidth || (s.push(c), h += c.length);
  }
  const v = s.join(`
`).slice(0, 4e3), k = Gn(), $ = {};
  for (const a of i) a.node && ($[String(a.node)] = jn(oo.get(a.node)));
  const u = {
    url: location.href,
    title: document.title.slice(0, 160),
    text: v,
    actions: i,
    scroll: { y: scrollY, height: o },
    page_key: k,
    guards: $,
    marker: JSON.stringify([k, v, i.map((a) => [a.kind, a.label, a.value])])
  };
  return Qt = u, u;
}
function qp(e) {
  if (!Nn() || !Qt || !e || typeof e != "object") throw new Error("No observed page");
  const t = e, o = Qt.actions.find((i) => i.id === t.action?.id && i.kind === t.action?.kind && i.node === t.action?.node && i.label === t.action?.label && i.value === t.action?.value);
  if (!o || t.url !== location.href || JSON.stringify(t.pageKey) !== JSON.stringify(Gn()))
    throw new Error("STALE_PAGE");
  if (o.node) {
    const i = oo.get(o.node);
    if (!i || !Fo(i) || !jo(i) || jn(i) !== t.expectedGuard || Qt.guards[String(o.node)] !== t.expectedGuard) throw new Error("STALE_PAGE");
    const s = i.getBoundingClientRect(), r = s.x + s.width / 2, g = s.y + s.height / 2;
    if (r < 0 || g < 0 || r >= innerWidth || g >= innerHeight || !i.contains(document.elementFromPoint(r, g)))
      throw new Error("STALE_PAGE");
    const h = i.getAttribute("href") || "";
    if (o.kind === "click" && (sn.test(o.label + " " + h) || h && new URL(h, location.href).origin !== location.origin)) throw new Error("NEEDS_CONFIRMATION");
    if (o.kind === "select") {
      if (sn.test(o.label) || i.tagName !== "SELECT") throw new Error("NEEDS_CONFIRMATION");
      const l = i;
      if (![...l.options].some((v) => v.value === o.value && !v.disabled)) throw new Error("STALE_PAGE");
      l.value = o.value || "", l.dispatchEvent(new Event("input", { bubbles: !0 })), l.dispatchEvent(new Event("change", { bubbles: !0 }));
    } else if (o.kind === "fill") {
      if (typeof t.text != "string" || !t.text.trim() || t.text.length > 2e3) throw new Error("Invalid text");
      if (i.readOnly) throw new Error("STALE_PAGE");
      if (i instanceof HTMLTextAreaElement || i instanceof HTMLInputElement) {
        const v = i instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(v, "value")?.set?.call(i, t.text);
      } else if (i.isContentEditable) i.textContent = t.text;
      else throw new Error("STALE_PAGE");
      i.dispatchEvent(new Event("input", { bubbles: !0 })), i.dispatchEvent(new Event("change", { bubbles: !0 }));
    } else o.kind === "click" && i.click();
  } else o.kind === "scroll" && window.scrollBy({ top: o.delta, behavior: "instant" });
  return Qt = null, { executed: !0 };
}
function Xp() {
  if (window.location.protocol !== "chrome-extension:" || typeof chrome > "u" || !chrome.runtime?.connect || !["/newtab.html", "/bilibili.html"].includes(window.location.pathname)) return;
  const e = chrome.runtime.connect({ name: "jev-cooperative-dock" });
  e.onMessage.addListener((t) => {
    if (!t || typeof t != "object") return;
    const o = t;
    if (o.operation === "observePage" && typeof o.id == "string") {
      try {
        e.postMessage({ id: o.id, state: Yp() });
      } catch {
        e.postMessage({ id: o.id, error: "Page unavailable" });
      }
      return;
    }
    if (o.operation === "actPage" && typeof o.id == "string") {
      try {
        e.postMessage({ id: o.id, ...qp(o.request) });
      } catch {
        e.postMessage({ id: o.id, error: "Page action rejected" });
      }
      return;
    }
    if (!(typeof o.id != "string" || o.id.length > 100)) {
      if (o.operation === "observe") {
        const i = yt.list().find((s) => s.id === "dock.open-bilibili");
        e.postMessage({ id: o.id, ready: i?.enabled === !0 });
        return;
      }
      if (o.operation === "activate") {
        if (yt.list().find((s) => s.id === "dock.open-bilibili")?.enabled !== !0) {
          e.postMessage({ id: o.id, executed: !1 });
          return;
        }
        yt.execute("dock.open-bilibili", void 0, "jev-cooperative").then(
          () => e.postMessage({ id: o.id, executed: !0 }),
          () => e.postMessage({ id: o.id, executed: !1 })
        );
      }
    }
  });
}
ps();
const Ko = ta(yt);
Na(yt, Ko);
Ra(yt);
zp(Ko);
Xp();
bi.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-RgphvB2-.js"), await Ko.startEager(), rt.finish("BOOT COMPLETE / 首页加载完成");
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  Ko.stopAll();
}, { once: !0 });
export {
  Ni as C,
  yu as D,
  Pc as T,
  _p as _,
  Cp as a,
  Ri as b,
  mt as c,
  Ch as d,
  Ti as e,
  me as f,
  De as g,
  Pn as h,
  yt as i,
  Ac as j,
  Wc as k,
  Ic as l,
  z as n,
  ao as p
};
