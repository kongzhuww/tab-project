import { l as $i, S as Cn, i as Ss } from "./SearchBox-BgMcHHOF.js";
/* empty css                */
import { c as Wi, r as ke, a as Tt, w as Be, b as j, d as ce, o as r, e as le, f as to, u as s, g as p, h as i, i as E, T as Is, t as u, F as Y, j as fe, k as H, l as yt, m as Ot, n as je, v as Ms, p as Ye, q as oo, s as xn, x as Ds, y as oe, z as St, A as io, B as be, C as re, D as Ve, E as J, G as K, H as vt, I as vo, J as Ln, K as Go, L as He, M as so, N as $n, O as As } from "./vendor-vue-dDCd4-uG.js";
import { W as Ko, t as Vt, p as ni, n as ye, a as Lo, b as $t, h as Ue, m as ft, c as qi, d as Ti, s as si, e as Xi, f as Es, g as Ps, i as Ws, j as Ns, k as X, l as Tn, o as lo, q as Sn, r as xt, u as Rs, v as ao, w as Ut, x as $o, y as Os, z as Bs, A as To, B as Fs } from "./view-styles-_33m77d-.js";
import { l as Hs, r as js, G as zs, a as Te, b as Jo, c as Ni, s as Gs, d as Ks, e as Ri, f as Vo, g as Oi, h as Et, i as bo, j as _t, k as ko, m as Yt, n as Ee, o as Ji, p as Vs, q as et, t as nt, u as Ct, v as yo, R as Us, w as Ys, x as It, y as At, z as Le, A as qs, B as Ht } from "./search.service-Ch5HygjH.js";
import { l as Oe, a as In, b as Mn, c as Bi, d as ae, f as pt, e as co } from "./store-Bjr1Y2_X.js";
import { c as Xs, a as Js, t as Zs, b as Qs, d as ea, e as ta, f as qt, g as oa } from "./calendar.service-DdfVd2EX.js";
import { w as De, s as Fi, P as ia, i as Uo, D as ai, a as Zi, g as Xe, p as na, L as sa, b as Mt, c as aa, d as ri, t as Qi, e as ra, f as la, h as xo, l as Dn } from "./window-manager.store-BaRzBtVM.js";
import { s as Zo, a as ca, b as da } from "./stickers.service-Qf4pDC-d.js";
import { b as _o, a as ua, c as pa } from "./up-group-manager-store-CFYKThHu.js";
import { biliMessagePanelController as Pt, biliMessagePanelState as ha } from "./message-panel-store-cyYqDLG_.js";
import { b as An, r as fa, a as uo } from "./bili-favorites-store-B9qSvH3w.js";
import { a as Hi, b as En, c as ga } from "./aihot-feed-store-CMoIIxm_.js";
import { p as Pn } from "./pricing-store-D3L5FER9.js";
import { y as Wn } from "./youtube-store-DdUlH3XI.js";
import { R as ma, u as Nn } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-C7V50PeG.js";
import { t as l, c as lt, _ as Me } from "./_plugin-vue_export-helper-CRVO6deU.js";
import { f as Wt } from "./fullscreen-cards.store-BJ9xBL1c.js";
import { k as va, m as ya } from "./core-utils-Ccz-tarm.js";
import { t as rt } from "./together-listen.store-De5J4XKt.js";
import { C as wa } from "./ChatShareMenu-D3QHVWUR.js";
const ba = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function ka() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(c) {
    if (!c || !ba.test(c.id)) throw new TypeError(`Invalid command id: ${c?.id || ""}`);
    if (!c.title?.trim() || !c.category?.trim() || typeof c.run != "function")
      throw new TypeError(`Command ${c.id} requires title, category and run()`);
    if (e.has(c.id)) throw new Error(`Command already registered: ${c.id}`);
    return e.set(c.id, Object.freeze({
      ...c,
      description: c.description || "",
      keywords: Object.freeze([...c.keywords || []]),
      concurrency: c.concurrency || "replace"
    })), () => {
      n(c.id), e.delete(c.id);
    };
  }
  function n(c) {
    const h = t.get(c);
    return h ? (h.abort(), t.delete(c), !0) : !1;
  }
  async function a(c, h, b = "api") {
    const M = e.get(c);
    if (!M) throw new Error(`Unknown command: ${c}`);
    if (M.enabled && !M.enabled()) return;
    const m = M.concurrency || "replace";
    if (t.has(c)) {
      if (m === "drop") return;
      m === "replace" && n(c);
    }
    const x = new AbortController();
    m !== "parallel" && t.set(c, x);
    try {
      return await M.run(h, { signal: x.signal, source: b });
    } finally {
      t.get(c) === x && t.delete(c);
    }
  }
  function d(c) {
    return Object.freeze({
      id: c.id,
      title: c.title,
      category: c.category,
      description: c.description || "",
      keywords: Object.freeze([...c.keywords || []]),
      concurrency: c.concurrency || "replace",
      enabled: c.enabled ? !!c.enabled() : !0,
      running: t.has(c.id)
    });
  }
  function v() {
    return Object.freeze([...e.values()].map(d).sort((c, h) => c.category.localeCompare(h.category, "zh") || c.title.localeCompare(h.title, "zh")));
  }
  function f(c, h = 20) {
    const b = String(c || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!b.length) return v().slice(0, h);
    const M = [...e.values()].map((m) => {
      const x = d(m), g = x.title.toLocaleLowerCase(), C = `${x.id} ${g} ${x.category} ${x.description} ${x.keywords.join(" ")}`.toLocaleLowerCase();
      if (!b.every((y) => C.includes(y))) return null;
      let I = 0;
      for (const y of b)
        x.id === y ? I += 200 : x.id.startsWith(y) && (I += 120), g === y ? I += 160 : g.startsWith(y) ? I += 100 : g.includes(y) && (I += 60), x.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (I += 40);
      return { item: x, score: I };
    }).filter((m) => !!m);
    return M.sort((m, x) => x.score - m.score || m.item.title.localeCompare(x.item.title, "zh")), Object.freeze(M.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: n, has: (c) => e.has(c), list: v, search: f });
}
const Qo = ka(), _a = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Ca(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function d(m) {
    if (!m || !_a.test(m.id)) throw new TypeError(`Invalid feature id: ${m?.id || ""}`);
    if (!m.title?.trim() || typeof m.mount != "function") throw new TypeError(`Feature ${m.id} requires title and mount()`);
    if (t.has(m.id)) throw new Error(`Feature already registered: ${m.id}`);
    return t.set(m.id, Object.freeze({
      ...m,
      order: Number(m.order) || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []])
    })), () => {
      c(m.id), a.delete(m.id), t.delete(m.id);
    };
  }
  function v(m) {
    return typeof m == "function" ? m : m && typeof m.unmount == "function" ? () => m.unmount() : () => {
    };
  }
  function f(m) {
    if (o.has(m)) return Promise.resolve(o.get(m)?.cleanup);
    if (n.has(m)) return n.get(m);
    const x = t.get(m);
    if (!x) return Promise.reject(new Error(`Unknown feature: ${m}`));
    a.delete(m);
    const g = new AbortController(), C = Object.freeze({
      signal: g.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), I = Promise.resolve().then(() => x.mount(C)).then((y) => (n.delete(m), o.set(m, { cleanup: y, controller: g }), y), (y) => {
      throw n.delete(m), a.set(m, y), g.abort(), y;
    });
    return n.set(m, I), I;
  }
  async function c(m) {
    const x = n.get(m);
    if (x)
      try {
        await x;
      } catch {
        return;
      }
    const g = o.get(m);
    g && (o.delete(m), g.controller.abort(), await v(g.cleanup)());
  }
  async function h() {
    const m = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), x = [...t.values()].filter((I) => !(!I.eager || !m && I.roots && I.roots.length > 0 && !I.roots.some((_) => !!document.getElementById(_)))).sort((I, y) => (I.order || 100) - (y.order || 100)), C = (await Promise.allSettled(x.map((I) => f(I.id)))).flatMap((I, y) => I.status === "rejected" ? [{ id: x[y].id, reason: I.reason }] : []);
    C.length && console.warn("LogicWeaver Vue features failed to mount", C);
  }
  async function b() {
    const m = [...o.keys()].reverse();
    await Promise.allSettled(m.map(c));
  }
  function M() {
    return Object.freeze([...t.values()].map((m) => Object.freeze({
      id: m.id,
      title: m.title,
      order: m.order || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []]),
      status: n.has(m.id) ? "mounting" : o.has(m.id) ? "mounted" : a.has(m.id) ? "failed" : "registered",
      error: a.has(m.id) ? String(a.get(m.id)?.message || a.get(m.id) || "Feature mount failed") : ""
    })).sort((m, x) => m.order - x.order));
  }
  return Object.freeze({ register: d, start: f, startEager: h, stop: c, stopAll: b, has: (m) => t.has(m), list: M });
}
const xa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", en = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), Q = ke({
  enabled: en,
  style: xa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !en,
  exiting: !1,
  forced: !1
});
let no = 0, Yo = 4, Rn = performance.now(), Si = 0, Ro = null, Ii = !1;
function On(e) {
  const t = e - Rn, o = Si ? Math.min(1, t / Si) : 1, n = o * o * (3 - 2 * o);
  Q.renderedProgress = Yo + (Q.targetProgress - Yo) * n, o < 1 && !Q.finished ? no = requestAnimationFrame(On) : no = 0;
}
function Oo(e, t) {
  if (!Q.enabled || Q.finished) return;
  const o = Math.max(Q.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (Q.status = t), Yo = Q.renderedProgress, Q.targetProgress = o, Rn = performance.now(), Si = Math.max(280, Math.min(920, 220 + Math.abs(o - Yo) * 7.5)), cancelAnimationFrame(no), no = requestAnimationFrame(On);
}
function ei(e = "Ready", t = !1) {
  Q.finished || (Q.finished = !0, Q.forced = t, Q.status = e, Q.targetProgress = 100, cancelAnimationFrame(no), no = 0, Q.renderedProgress = 100, Ro?.(t));
}
function La(e = "KEYBOARD SKIP") {
  ei(e, !0);
}
function $a() {
  Q.enabled || ei("BOOT COMPLETE", !0);
}
function Bn() {
  !Q.enabled || Q.finished || Ii || (Ii = !0, Oo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    Q.finished || Oo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    Q.finished || Oo(100, Q.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    Q.finished || ei("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Ta() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (Q.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", Q.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", Q.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (Q.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", Q.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    Q.finished = !Q.enabled, document.documentElement.dataset.startupStyle = Q.style, document.documentElement.classList.toggle("skip-endfield-loader", !Q.enabled), document.body.classList.toggle("is-starting", Q.enabled);
  }
}
const tt = Tt(Q), dt = Object.freeze({
  update: Oo,
  finish: ei,
  skip: La,
  notifyBootReady: $a,
  async playIntro(e) {
    if (e?.style && (Q.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = Q.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), Q.enabled = !0, Q.finished = !1, Q.forced = !!e?.force, Q.renderedProgress = 4, Q.targetProgress = 4, Ii = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-Dhx37iM-.js"), n = Wi(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), n.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), n.mount(t);
      }
    }
    Bn();
  },
  get enabled() {
    return Q.enabled;
  },
  get finished() {
    return Q.finished;
  }
});
function Sa(e) {
  return Ro = e, Q.finished && e(Q.forced), () => {
    Ro === e && (Ro = null);
  };
}
const Fn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Hn = "lw_weather_snapshot_v1";
function Ia() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Hn);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Fn,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function So(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Hn,
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
const Ma = () => {
  const e = Ia();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Fn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, V = ke(Ma());
let li = null, ci = null;
const it = {
  get snapshot() {
    return Tt(V);
  },
  update(e) {
    Object.assign(V, e), So(V);
  },
  unconfigured() {
    Object.assign(V, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (V.data) {
      e && (V.city = e);
      return;
    }
    Object.assign(V, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(V, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), So(V);
  },
  notFound(e = "") {
    Object.assign(V, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    V.data || Object.assign(V, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (V.city = e), V.forecastModalOpen = !0;
  },
  closeForecastModal() {
    V.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    V.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], So(V);
  },
  setDetailInfo(e) {
    V.detailInfo = { ...e }, So(V);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    li ? li() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    ci ? ci(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    li = e;
  },
  setChangeLocationAction(e) {
    ci = e;
  }
}, Da = () => ({
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
}), we = ke(Da());
let di = null;
const Xt = {
  get snapshot() {
    return Tt(we);
  },
  update(e) {
    Object.assign(we, e);
  },
  updateTime(e, t, o, n) {
    we.timeText = e, we.secsText = t, we.greetingText = o, we.dateText = n, we.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (we.fontFamily = e.fontFamily), e.colorHex !== void 0 && (we.colorHex = e.colorHex), e.greetColor !== void 0 && (we.greetColor = e.greetColor), e.dateColor !== void 0 && (we.dateColor = e.dateColor), e.isBlack !== void 0 && (we.isBlack = e.isBlack), e.isCustomColor !== void 0 && (we.isCustomColor = e.isCustomColor), we.updatedAt = Date.now();
  },
  openSettings(e) {
    di ? di(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    di = e;
  }
}, Aa = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Ea = () => ({
  mounted: !1,
  visible: !1,
  items: [...Aa]
}), ui = ke(Ea());
let Io = {};
const ji = {
  getSnapshot() {
    return Tt(ui);
  },
  update(e) {
    Object.assign(ui, e);
  },
  setMounted(e) {
    ui.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Io.open) {
      Io.open(e);
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
    const n = o.LogicWeaverWindowTabs;
    if (n?.open) {
      n.open(e);
      return;
    }
    const a = document.getElementById(`${e}-top-open`);
    a && !t ? a.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Io = { ...Io, ...e };
  }
}, pi = ke({ visible: !1, pendingWrites: 0 });
async function Pa(e) {
  if (pi.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  pi.pendingWrites++;
  try {
    return await e();
  } finally {
    pi.pendingWrites--;
  }
}
const tn = {
  openDialog() {
    De.open("wallpaper");
  },
  closeDialog() {
    De.close("wallpaper");
  },
  resetDefault() {
    return Pa(() => Ko.clearWallpaper());
  }
}, on = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], nn = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], gm = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], $e = ke({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let hi = null;
const Nt = {
  state: $e,
  setMounted(e) {
    $e.mounted = e;
  },
  onAction(e) {
    hi = e;
  },
  dispatch(e, t) {
    if (hi)
      return hi(e, t);
  },
  open(e) {
    const n = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, d = e?.clientX ?? e?.x ?? n / 2, v = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(d - 40, n - 290 - 12)), c = Math.max(12, Math.min(v + 10, a - 420 - 12));
    $e.x = f, $e.y = c, $e.isOpen = !0, this.dispatch("open", { x: f, y: c });
  },
  close() {
    $e.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    $e.font = e;
    const t = on.find((o) => o.id === e);
    if (t) {
      Xt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: $e.color, timezone: $e.timezone });
  },
  setColor(e) {
    $e.color = e;
    const t = nn.find((o) => o.id === e);
    if (t) {
      Xt.applyConfig({
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
    this.dispatch("change", { font: $e.font, color: e, timezone: $e.timezone });
  },
  setTimezone(e) {
    $e.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: $e.font, color: $e.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        $e.font = e;
        const n = on.find((a) => a.id === e);
        n && Xt.applyConfig({ fontFamily: n.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        $e.color = t;
        const n = nn.find((a) => a.id === t);
        n && Xt.applyConfig({ colorHex: n.hex, greetColor: n.hex, dateColor: n.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && ($e.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && ($e.font = e.font), e.color && ($e.color = e.color), e.timezone && ($e.timezone = e.timezone);
  }
}, de = ke({
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
let fi = null, Bo = !1;
async function Fo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: de.model };
  if (e === "connect") return { state: "ready", model: de.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function jn(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), de.statusText = o, de.authHidden = !e.loginUrl, de.authCode = e.loginCode || "", de.authLink = e.loginUrl || "https://auth.openai.com/codex/device", de.isStreaming = Bo || e.busy || e.state === "running";
}
async function Wa() {
  try {
    const e = await Fo("poll");
    jn(e);
  } catch {
  }
}
async function Na(e, t) {
  if (e === "open" || e === "connect")
    try {
      de.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Fo("connect");
      jn(o);
    } catch (o) {
      de.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    de.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), de.inputText = "", de.isStreaming = !0, Bo = !0;
    try {
      await Fo("send", { text: o }), await Wa();
    } catch (n) {
      de.statusText = n?.message || "发送失败";
    } finally {
      Bo = !1, de.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Fo("stop");
    } catch {
    }
    de.isStreaming = !1, Bo = !1;
  }
}
const zi = {
  state: de,
  setMounted(e) {
    de.mounted = e;
  },
  onAction(e) {
    fi = e;
  },
  dispatch(e, t) {
    if (fi)
      return fi(e, t);
    Na(e, t);
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
}, gi = ke({
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
}), Mo = /* @__PURE__ */ new Set(), Ra = {
  state: gi,
  open(e) {
    Object.assign(gi, e, { open: !0 });
  },
  update(e) {
    Object.assign(gi, e);
  },
  close() {
    Mo.forEach((e) => e("close"));
  },
  save(e) {
    Mo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Mo.add(e), () => Mo.delete(e);
  }
}, Ho = ke({ isOpen: !1 }), zn = {
  state: Ho,
  open() {
    Ho.isOpen = !0;
  },
  close() {
    Ho.isOpen = !1;
  }
}, mi = "biliProfileCacheV1", ut = "biliLocallyKnownMessageIdsV1", Do = "biliMessageUserCacheV1", po = "githubKnownReleaseVersionsV1", Ao = "customNewtabAvatar", sn = "biliToastKnownCountsV1";
class Oa {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [po]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      const d = Math.max(0, Number(this.unread?.[a] || 0));
      let v = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      d < v.length && (v = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, d - v.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ut]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, n) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), n && !this.locallyKnownIds[t].includes(n) && (this.locallyKnownIds[t].push(n), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ut]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const n = new Set(this.locallyKnownIds[t]);
    for (const d of o) d && n.add(d);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (n.size < a) {
      const d = a - n.size;
      for (let v = 0; v < d; v++) n.add(`__pad_${Date.now()}_${v}`);
    }
    this.locallyKnownIds[t] = Array.from(n), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ut]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), d = this.getVisibleUnread();
    if (Vt.avatarUrl = a, Vt.userName = t?.uname || "哔哩哔哩用户", Vt.buttonTitle = "通知中心", ni.avatarUrl = a, ni.userName = t?.uname || "用户", ni.mid = t?.mid, typeof document < "u") {
      const v = document.getElementById("bili-profile-avatar");
      v && (v.src = a);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = Vt.buttonTitle);
    }
    Pt.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: a,
      unreadCounts: {
        reply: Number(d.reply || 0),
        at: Number(d.at || 0),
        like: Number(d.like || 0),
        system: Number(d.system || 0),
        private: Number(d.private || 0)
      }
    });
  }
  async refreshBiliProfile() {
    if (!this.isBiliRefreshing) {
      this.isBiliRefreshing = !0;
      try {
        const o = await (await fetch("https://api.bilibili.com/x/web-interface/nav", { credentials: "include" })).json();
        if (!o?.data?.isLogin) throw new Error("未登录");
        const n = {
          mid: o.data.mid,
          uname: o.data.uname,
          face: o.data.face
        }, [a, d, v] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((x) => x.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((x) => x.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((x) => x.json())
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, c = d.status === "fulfilled" ? d.value?.data || {} : {}, h = v.status === "fulfilled" ? v.value?.data || {} : {}, b = Number(c.at || 0), M = c.reply != null ? Number(c.reply || 0) : Math.max(0, Number(c.recv_reply || 0) - b), m = {
          reply: Math.max(Number(f.reply || 0), M),
          at: Math.max(Number(f.at || 0), b),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(c.like || c.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(c.sys_msg || 0)),
          private: Number(
            f.chat || c.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(n, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [mi]: { profile: n, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [sn]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const n = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), d = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [sn]: this.biliToastKnownCounts }).catch(() => {
    }), n > 0 && ye.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: n > 1 ? `收到 ${n} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      target: { type: "bili-messages" },
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        Pt.openPanel();
      }
    }), a > 0 && ye.show({
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
        Pt.openPanel();
      }
    }), d > 0 && ye.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: d > 1 ? `收到 ${d} 次新提及` : "有人 @了你",
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
    this.initialized || (this.initialized = !0, Lo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          $t.open();
        else if (t === "tabs")
          zn.open();
        else if (t === "refresh")
          await this.refreshBiliProfile();
        else if (t === "switch")
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", active: !0 }) : window.open("https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", "_blank");
        else if (t === "web") {
          const o = this.profile?.mid, n = o ? `https://space.bilibili.com/${o}` : "https://www.bilibili.com/";
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: n, active: !0 }) : window.open(n, "_blank");
        }
      }
    }), typeof chrome < "u" && chrome?.storage?.local && (chrome.storage.local.get([
      mi,
      ut,
      Do,
      po,
      Ao
    ]).then((t) => {
      this.customAvatar = t[Ao] || "", this.locallyKnownIds = t[ut] && typeof t[ut] == "object" ? t[ut] : {}, this.userCache = t[Do] && typeof t[Do] == "object" ? t[Do] : {}, this.githubKnownVersions = t[po] && typeof t[po] == "object" ? t[po] : {};
      const o = t[mi];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Ao] && (this.customAvatar = t[Ao].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[ut] && (this.locallyKnownIds = t[ut].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Pt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const an = new Oa(), ue = ke({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Eo = null;
const jo = {
  state: ue,
  open(e, t) {
    Eo = t, Object.assign(ue, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ue, e);
  },
  close() {
    ue.submitting || (ue.open = !1, Eo = null);
  },
  async toggleFollow() {
    if (!(!Eo || ue.submitting)) {
      ue.submitting = !0;
      try {
        const e = !ue.followed;
        await Eo(e) && (ue.followed = e);
      } finally {
        ue.submitting = !1;
      }
    }
  }
}, xe = ke({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), vi = /* @__PURE__ */ new Set();
let kt;
const ho = new ma();
let rn = !1;
async function Ba(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), n = () => o.abort();
  t.addEventListener("abort", n, { once: !0 });
  const a = setTimeout(n, 15e3);
  try {
    const d = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!d.ok)
      throw d.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!d.body) throw new Error("Empty public source");
    const v = d.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let c = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const b = await v.read();
        if (b.done) break;
        if (c += b.value.byteLength, c > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode(b.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + f.decode());
    } finally {
      v.cancel().catch(() => {
      }), v.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", n);
  }
}
function ln(e, t) {
  const o = e?.name || e?.repository, n = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof n != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(n) || n.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [a, d] = n.split("/"), v = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: d,
    full_name: n,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: v(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: v(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(d)}`
  };
}
async function Fa(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let n = "";
  try {
    const v = await Hs(t), { data: f } = await js(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: v, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((c) => ln(c, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (v) {
    t.throwIfAborted(), n = v instanceof zs ? v.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", d = await Ba(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(d)) throw new Error("Invalid fallback response");
  return {
    repos: d.slice(0, 30).map((v) => ln(v, !0)),
    sourceText: `GitHub Search 不可用：${n} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Gn = {
  get state() {
    return xe;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    ho.cancel(), xe.isLoading = !1, kt = e;
    const t = () => {
      kt === e && ho.pending && (ho.cancel(), xe.isLoading = !1, xe.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !rn && this.refresh(), () => {
      e.removeEventListener("abort", t), kt === e && (t(), kt = void 0);
    };
  },
  switchTab(e) {
    xe.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !kt || kt.aborted || ![1, 7, 30].includes(e) || e === xe.sinceDays || (ho.cancel(), Object.assign(xe, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: xe.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = kt;
    if (!e || e.aborted || xe.isLoading) return;
    const t = xe.sinceDays, o = ho.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => kt === e && xe.sinceDays === t,
      onStop: (a) => {
        xe.isLoading = !1, a === "timeout" && (xe.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), n = o.current;
    if (n()) {
      rn = !0, xe.isLoading = !0, xe.errorMessage = "";
      try {
        const a = await o.wait(() => Fa(t, o.signal));
        if (!n()) return;
        xe.repos = a.repos, xe.sourceText = a.sourceText, xe.fetchedAt = Date.now(), xe.hasLoaded = !0;
      } catch {
        n() && (xe.errorMessage = xe.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (xe.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return vi.add(e), () => {
      vi.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of vi)
      try {
        o(e, t);
      } catch {
      }
  }
}, Mi = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Gi = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), Z = ke({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Mi(),
  activeSectorId: null,
  sectors: [],
  beam: Gi()
});
let cn = null;
function Ha(e, t) {
  if (typeof e != "number" || !t)
    return Gi();
  const o = 160, n = 160, a = 26, d = 154, v = 360 / t, f = e - v / 2, c = e + v / 2, h = f * Math.PI / 180, b = c * Math.PI / 180, M = o + a * Math.cos(h), m = n + a * Math.sin(h), x = o + d * Math.cos(h), g = n + d * Math.sin(h), C = o + a * Math.cos(b), I = n + a * Math.sin(b), y = o + d * Math.cos(b), _ = n + d * Math.sin(b), T = v > 180 ? 1 : 0, N = `M ${M.toFixed(1)} ${m.toFixed(1)} L ${x.toFixed(1)} ${g.toFixed(1)} A ${d} ${d} 0 ${T} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${C.toFixed(1)} ${I.toFixed(1)} A ${a} ${a} 0 ${T} 0 ${M.toFixed(1)} ${m.toFixed(1)} Z`, B = `M ${x.toFixed(1)} ${g.toFixed(1)} A ${d} ${d} 0 ${T} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: N,
    arcPath: B,
    line1: {
      x1: parseFloat(M.toFixed(1)),
      y1: parseFloat(m.toFixed(1)),
      x2: parseFloat(x.toFixed(1)),
      y2: parseFloat(g.toFixed(1))
    },
    line2: {
      x1: parseFloat(C.toFixed(1)),
      y1: parseFloat(I.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(_.toFixed(1))
    }
  };
}
const Se = {
  get state() {
    return Z;
  },
  getSnapshot() {
    return Tt(Z);
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
    } : Z.hub = Mi();
  },
  setBeam(e, t) {
    Z.beam = Ha(e, t);
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
    Z.isExpanded = !1, Z.mode = "main", Z.activeSectorId = null, Z.beam = Gi(), Z.hub = Mi();
  },
  setWheelMode(e) {
    Z.mode = e;
  },
  setActionHandler(e) {
    cn = e;
  },
  dispatch(e, t) {
    cn?.(e, t);
  }
}, Kn = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function ja() {
  return Kn.filter((e) => e.mode || e.id === "launcher" || Uo(e.id));
}
function za() {
  return ia.filter((e) => e.kind === "module" && Uo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function dn() {
  Z.isExpanded && at();
}
let Di = [], Co = Kn, ht = { x: 400, y: 300 }, Vn = !1, fo = !1, yi = null, go = null, st = !1;
const Ga = ke(/* @__PURE__ */ new Set()), Ka = /* @__PURE__ */ new Map();
function Lt() {
  return globalThis.chrome?.storage;
}
function Un(e, t) {
  const o = Z.isExpanded ? 160 : 24;
  Se.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function at() {
  const e = Z.mode;
  let t = [];
  e === "shortcuts" && (t = [...Di], t.push({
    id: "toggle-edit-shortcuts",
    title: st ? l("navwheel.finishEdit") : l("navwheel.editSites"),
    desc: st ? l("navwheel.finishEditDesc") : l("navwheel.editSitesDesc"),
    icon: st ? "✅" : "✏️"
  })), Co = e === "tools" ? za() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: l("navwheel.back"), desc: l("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : ja();
  const o = Co.length, n = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Se.setSectors(Co.map((d, v) => {
    const f = -90 + 360 / o * v, c = f * Math.PI / 180;
    return {
      id: d.id,
      title: d.title,
      desc: d.desc,
      icon: d.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(c) * n),
      y: Math.round(160 + Math.sin(c) * n),
      size: a,
      isShortcut: !!d.url
    };
  })), Se.setWheelMode(e), Se.setActiveSector(null), Se.setBeam(null, 0), Se.setHub(e === "shortcuts" ? st ? { icon: "✏️", title: l("navwheel.editing") } : { icon: "🔙", title: l("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: l("navwheel.tools") } : null);
}
function qo(e) {
  Z.mode = e, at();
}
function Rt() {
  Se.collapse(), Un(Z.ballPosition.x, Z.ballPosition.y), Se.setVisibility(Vn);
}
function Gt(e = Z.ballPosition.x, t = Z.ballPosition.y, o = "main") {
  Se.expand(void 0, void 0, o), Un(e, t), at(), Se.setVisibility(!0);
}
function Va(e) {
  if (e.id === "toggle-edit-shortcuts") {
    Yn();
    return;
  }
  if (st && e.url) {
    ye.show({
      appName: l("navwheel.appName"),
      title: l("navwheel.editingNotice"),
      message: l("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !Uo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Uo(e.id))) {
    if (e.mode) {
      qo(e.mode);
      return;
    }
    if (Rt(), e.url) {
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
function Yn() {
  st = !st, st ? (ye.show({
    appName: l("navwheel.appName"),
    title: l("navwheel.enterEditMode"),
    message: l("navwheel.editModeDesc"),
    duration: 5e3
  }), at()) : (ye.show({
    appName: l("navwheel.appName"),
    title: l("navwheel.editDone"),
    message: l("navwheel.editSaved"),
    duration: 2e3
  }), at());
}
async function Ua(e) {
  if (!st || !e || !e.url) return !1;
  try {
    const t = await Lt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], n = o.findIndex((v) => v.url === e.url);
    if (n >= 0) {
      const v = o.filter((f, c) => c !== n);
      return await Lt()?.local?.set({ siteShelfLinks: v, logicweaverNavWheelShortcutsV1: v }), await ze.loadShortcuts(), at(), ye.show({
        appName: l("navwheel.appName"),
        title: l("navwheel.removedNotice"),
        message: l("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return ye.show({
        appName: l("navwheel.appName"),
        title: l("navwheel.limitTitle"),
        message: l("navwheel.maxLimitNotice"),
        duration: 2500
      }), !0;
    const a = {
      id: String(e.id || `wheel-${Date.now()}`),
      title: e.title || l("navwheel.site"),
      url: e.url,
      icon: e.icon || "",
      customIcon: e.customIcon || ""
    }, d = [...o, a];
    return await Lt()?.local?.set({ siteShelfLinks: d, logicweaverNavWheelShortcutsV1: d }), await ze.loadShortcuts(), at(), ye.show({
      appName: l("navwheel.appName"),
      title: l("navwheel.addedTitle"),
      message: l("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function Ya(e) {
  try {
    const t = await Lt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], n = o.find((d) => String(d.id) === String(e)), a = o.filter((d) => String(d.id) !== String(e));
    await Lt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await ze.loadShortcuts(), at(), n && ye.show({
      appName: l("navwheel.appName"),
      title: l("navwheel.removedNotice"),
      message: l("navwheel.removedSite", { name: n.title || l("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function un(e) {
  ht = { x: e.clientX, y: e.clientY };
}
function pn(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ht = { x: e.clientX, y: e.clientY }, Z.isExpanded ? Rt() : Gt(e.clientX, e.clientY));
}
function hn(e) {
  e.button === 1 && e.preventDefault();
}
function fn(e) {
  if (e.key === "Escape") {
    if (st) {
      e.preventDefault(), e.stopPropagation(), st = !1, Ga.clear(), Ka.clear(), at(), ye.show({
        appName: l("navwheel.appName"),
        title: l("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!Z.isExpanded || Fi.active) return;
    e.preventDefault(), e.stopPropagation(), Z.mode === "shortcuts" ? qo("main") : Rt();
  }
}
function qa(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Xa(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Te.getCachedIcon(e.url);
    if (o) return o;
    const n = qa(e.url);
    if (n) return n;
  }
  return e.icon || "🔗";
}
const ze = {
  async start() {
    if (!fo) {
      fo = !0, yi = Be(lt, () => {
        Z.isExpanded && at();
      }), ht = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Se.setActionHandler((e, t) => {
        if (e === "hub:click")
          Z.isExpanded ? Z.mode === "shortcuts" ? qo("main") : Rt() : Gt();
        else if (e === "sector:click" || e === "container:click") {
          const o = Co.find((n) => n.id === t?.id || e === "container:click" && n.id === Z.activeSectorId);
          o && Va(o);
        } else if (e === "sector:hover") {
          const o = Z.sectors.find((n) => n.id === t?.id);
          o && (Se.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Se.setActiveSector(o.id), Se.setBeam(o.angleDeg, Co.length));
        } else e === "sector:leave" && (Se.setActiveSector(null), Se.setBeam(null, 0), Se.setHub(Z.mode === "shortcuts" ? { icon: "🔙", title: l("navwheel.shortcuts") } : Z.mode === "tools" ? { icon: "🧰", title: l("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", dn), window.addEventListener("pointermove", un, { passive: !0 }), window.addEventListener("mousedown", pn, !0), window.addEventListener("auxclick", hn, !0), window.addEventListener("keydown", fn, !0), go = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Lt()?.onChanged?.addListener(go);
      try {
        if (!fo) return;
        Vn = !1, Se.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), at();
    }
  },
  stop() {
    fo = !1, yi?.(), yi = null, Se.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", dn), window.removeEventListener("pointermove", un), window.removeEventListener("mousedown", pn, !0), window.removeEventListener("auxclick", hn, !0), window.removeEventListener("keydown", fn, !0), go && Lt()?.onChanged?.removeListener(go), go = null;
  },
  async loadShortcuts() {
    try {
      const e = await Lt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!fo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Di = (Array.isArray(t) ? t : []).map((o, n) => ({
        id: String(o.id || `wheel-${n}`),
        title: String(o.title || o.url || l("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Xa(o)
      })), Z.mode === "shortcuts" && at();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Gt(e ?? ht.x, t ?? ht.y);
  },
  close: Rt,
  get isEditingShortcuts() {
    return st;
  },
  isLinkInWheel(e) {
    return e ? Di.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: Yn,
  handleLinkSelection: Ua,
  removeShortcut: Ya,
  toggle(e = !1) {
    Z.isExpanded ? Rt() : e ? Gt(ht.x, ht.y) : Gt();
  },
  toggleTools(e = !0) {
    Z.isExpanded && Z.mode === "tools" ? Rt() : Gt(
      e ? ht.x : Z.ballPosition.x,
      e ? ht.y : Z.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    qo(e);
  }
};
class Jt {
  constructor() {
    this.activeShortcuts = { ...ai }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Jt.instance || (Jt.instance = new Jt()), Jt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: n, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-Czjh708v.js").then((b) => b.g), v = (await chrome.storage.local.get(a))[a], f = { ...v || {}, [t]: o }, c = this.shortcutReadVersion, h = await n.saveSettings(
      { [a]: f },
      { [a]: v }
    );
    c === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((n) => Object.prototype.hasOwnProperty.call(ai, n[0]) && typeof n[1] == "string") : [];
    this.activeShortcuts = { ...ai, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((n, a) => {
          a === "local" && Object.prototype.hasOwnProperty.call(n, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(n.customShortcuts.newValue));
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
    if (!t || !Zi(t)) return !1;
    if (Xe(t))
      return De.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return Jo.toggle(), !0;
      case "settings":
        return Zo.open(), !0;
      case "nav-wheel":
        return ze.toggle(!0), !0;
      case "toolbox":
        return ze.toggleTools(!0), !0;
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
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : De.handleToolClick("todoist"), !0;
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
        if (Fi.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const n = na(t);
        if (!n) return;
        const a = n.toLowerCase();
        for (const [d, v] of Object.entries(this.activeShortcuts))
          if (!(!v || !Zi(d)) && v.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(d);
            break;
          }
      },
      !0
    ));
  }
}
const Ai = Jt.getInstance();
class Zt {
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
        } catch (n) {
          console.warn("[PageVisibility] callback error:", n);
        }
    });
  }
  static getInstance() {
    return Zt.instance || (Zt.instance = new Zt()), Zt.instance;
  }
  get isVisible() {
    return Tt(this._isVisible);
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
    const n = {
      handler: t,
      intervalMs: o,
      timerId: null
    };
    return { start: () => {
      this.activeIntervals.add(n), this.isVisibleNow() && !n.timerId && (n.timerId = setInterval(n.handler, n.intervalMs));
    }, stop: () => {
      this.activeIntervals.delete(n), n.timerId && (clearInterval(n.timerId), n.timerId = null);
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
const Ja = Zt.getInstance(), gn = [
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
function Po(e) {
  return e === 0 ? { emoji: "☀️", label: l("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: l("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: l("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: l("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: l("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: l("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: l("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: l("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: l("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: l("weather.condition.thunderstorm") } : { emoji: "🌡️", label: l("weather.condition.unknown") };
}
class Qt {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return Qt.instance || (Qt.instance = new Qt()), Qt.instance;
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
    const { city: t, loc: o, d: n } = this.lastRawForecastData;
    this.applyForecastPayload(t, o, n);
  }
  applyForecastPayload(t, o, n) {
    const a = Po(n.current?.weather_code ?? 0), d = Math.round(n.current?.temperature_2m ?? 0), v = n.hourly?.time || [], f = Date.now();
    let c = v.findIndex((T) => new Date(T).getTime() >= f);
    c < 0 && (c = 0);
    const h = [];
    for (let T = c; T < Math.min(c + 5, v.length); T++) {
      const N = T === c ? l("weather.now") : l("weather.hourSuffix", { hour: new Date(v[T]).getHours() }), B = Po(n.hourly.weather_code[T]), D = Math.round(n.hourly.temperature_2m[T]);
      h.push({ time: N, emoji: B.emoji, temp: D });
    }
    let b = l("weather.noRain12h");
    for (let T = c; T < Math.min(c + 12, v.length); T++) {
      const N = n.hourly.weather_code[T], B = n.hourly.precipitation_probability?.[T] || 0;
      if (N >= 51 || B >= 60) {
        const D = new Date(v[T]).getHours(), L = N >= 71 && N <= 77 || N === 85 || N === 86 ? l("weather.snow") : l("weather.rain"), P = B ? ` (${B}%)` : "";
        b = l("weather.expectPrecip", { time: `${D}:00`, type: L, prob: P });
        break;
      }
    }
    const M = [l("weather.today"), l("weather.tomorrow"), l("weather.afterTomorrow")], m = [], x = n.daily?.time?.length || 0;
    for (let T = 1; T < Math.min(3, x); T++) {
      const N = M[T] || l("weather.plusDays", { count: T }), B = Po(n.daily.weather_code[T]), D = `${Math.round(n.daily.temperature_2m_max[T])}°/${Math.round(n.daily.temperature_2m_min[T])}°`;
      m.push({ label: N, emoji: B.emoji, tempRange: D });
    }
    const g = Math.round(n.daily?.temperature_2m_max?.[0] ?? d), C = Math.round(n.daily?.temperature_2m_min?.[0] ?? d), I = l("weather.tempRange", { cond: a.label, max: g, min: C }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: d,
      subText: I,
      rainText: b,
      hours: h,
      days: m
    };
    if (it.ready(y, t), n.daily?.time) {
      const T = [
        l("weather.weekday.sun"),
        l("weather.weekday.mon"),
        l("weather.weekday.tue"),
        l("weather.weekday.wed"),
        l("weather.weekday.thu"),
        l("weather.weekday.fri"),
        l("weather.weekday.sat")
      ], N = [];
      for (let B = 0; B < n.daily.time.length; B++) {
        const D = new Date(n.daily.time[B]), $ = B === 0 ? l("weather.today") : B === 1 ? l("weather.tomorrow") : B === 2 ? l("weather.afterTomorrow") : T[D.getDay()], L = Po(n.daily.weather_code[B]);
        N.push({
          date: `${D.getMonth() + 1}/${D.getDate()}`,
          dayName: $,
          emoji: L.emoji,
          condition: L.label,
          highTemp: Math.round(n.daily.temperature_2m_max[B]),
          lowTemp: Math.round(n.daily.temperature_2m_min[B]),
          rainProb: n.daily.precipitation_probability_max?.[B] || 0
        });
      }
      it.setForecastDays(N);
    }
    const _ = {
      humidity: n.current?.relative_humidity_2m ? `${n.current.relative_humidity_2m}%` : "60%",
      wind: n.current?.wind_speed_10m ? `${Math.round(n.current.wind_speed_10m)} km/h` : l("weather.detail.windLight"),
      uvIndex: l("weather.detail.uvNormal"),
      airQuality: l("weather.detail.airGood")
    };
    it.setDetailInfo(_);
  }
  filterCities(t, o = 8) {
    const n = t.trim().toLowerCase();
    if (!n) return gn.slice(0, o);
    const a = [];
    for (const d of gn) {
      const v = d.name.toLowerCase(), f = d.pinyin.toLowerCase(), c = d.admin.toLowerCase();
      if ((v.startsWith(n) || f.startsWith(n) || v.includes(n) || f.includes(n) || c.includes(n)) && a.push(d), a.length >= o) break;
    }
    return a;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      it.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const n = ++this.activeRequestId;
    it.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, d = await fetch(a);
      if (n !== this.activeRequestId || V.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await d.json()).results?.[0];
      if (!f) {
        n === this.activeRequestId && V.state !== "unconfigured" && it.notFound(o), this.isRefreshing = !1;
        return;
      }
      const c = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(c);
      if (n !== this.activeRequestId || V.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const b = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: b }, n === this.activeRequestId && V.state !== "unconfigured" && this.applyForecastPayload(o, f, b);
    } catch (a) {
      n === this.activeRequestId && V.state !== "unconfigured" && it.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      n === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Kt = Qt.getInstance();
function Za(e, t) {
  window.LogicWeaverIntro = dt, window.LogicWeaverStartupIntro = dt, window.LogicWeaverNotifications = ye, window.LogicWeaverWindowManager = De, window.LogicWeaverWindowTabs = De, window.LogicWeaverDomFreezer = sa, window.LogicWeaverWallpaperService = Ko, window.LogicWeaverLauncherService = Te, window.LogicWeaverLauncherRuntime = $i, window.LogicWeaverProfileService = an;
  try {
    an.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = Ni, window.LogicWeaverCalendarService = Xs, window.LogicWeaverWeather = it, window.LogicWeaverWeatherService = Kt, window.LogicWeaverClock = Xt, window.LogicWeaverSearch = Gs, window.LogicWeaverSearchService = Ks, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-C35UdaAI.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ue, window.LogicWeaverLauncherGroups = Oe, window.LogicWeaverProfileMenu = Lo, window.LogicWeaverWorkspaceLaunchers = ji, window.LogicWeaverMacDock = ft, window.LogicWeaverFullscreen = Wt, window.enterFullscreenCard = (o) => Wt.enter(o), window.exitFullscreenCard = () => Wt.exit(), window.cycleFullscreenCard = () => Wt.cycle(), window.LogicWeaverPageVisibility = Ja, window.LogicWeaverBackgroundLibrary = tn, window.LogicWeaverNotificationCenter = $t, window.LogicWeaverBookmarkMenu = Ri, window.LogicWeaverBookmarkPanel = Jo, window.LogicWeaverBookmarkFolderStrip = Vo, window.LogicWeaverLauncherDialogs = In, window.LogicWeaverLauncherFolder = Mn, window.LogicWeaverLauncherMenus = Bi, window.LogicWeaverSettings = Zo, window.LogicWeaverClockSettings = Nt, window.LogicWeaverBiliTheater = _o, window.LogicWeaverBilibiliService = qi, window.getBiliJct = () => qi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Ti, window.openBiliMiniPlayer = (o) => Ti.openVideo(o), window.LogicWeaverAiDialog = zi, window.LogicWeaverAihotViewer = Hi, window.LogicWeaverNavWheel = Se, window.openNavWheel = (o, n) => ze.open(o, n), window.closeNavWheel = () => ze.close(), window.toggleNavWheel = (o) => ze.toggle(o), window.toggleToolWheel = (o) => ze.toggleTools(o), window.setNavWheelMode = (o) => ze.setMode(o), window.LogicWeaverShortcuts = Ai, window.triggerToolShortcut = (o) => Ai.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Js, window.LogicWeaverGitHubStatus = Oi, window.LogicWeaverGitHubFolders = Et, window.LogicWeaverGitHubHero = bo, window.LogicWeaverGitHubRepositories = _t, window.LogicWeaverGitHubBatchBar = ko, window.LogicWeaverTodoistLabels = Zs, window.LogicWeaverTodoistWorkspace = Qs, window.LogicWeaverTodoistCalendarSidebar = ea, window.LogicWeaverTodoistTaskList = ta, window.LogicWeaverBiliMessagePanel = Pt, window.LogicWeaverStickerBoard = ca, window.LogicWeaverStickersService = da, window.LogicWeaverPricing = Pn, window.LogicWeaverBiliFavorites = An, window.LogicWeaverBiliRadioTape = fa, window.LogicWeaverBiliOrganizerDialogs = ua, window.LogicWeaverBiliUpGroupManager = pa, window.LogicWeaverBiliUpPreview = jo, window.LogicWeaverYouTube = Wn, window.LogicWeaverAihotFeed = En, window.LogicWeaverGitHubTrending = Gn, window.LogicWeaverCalendarWorkspace = qt, window.LogicWeaverCalendar = qt, window.LogicWeaverTodoistMainWorkspace = oa, window.LogicWeaverTodoistTaskDetail = Ra, window.openBiliTheater = (o) => _o.openVideo(o), window.closeBiliTheater = () => _o.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const n = si(o.target) || Xi(o.url) || (o.appType === "bili" ? Es([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return ye.show({
      ...o,
      target: n,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (n) return $t.openTarget(n);
        if (o?.url) {
          window.open(o.url, "_blank");
          return;
        }
      }
    });
  }, window.showToast = (o, n = !1, a = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: n ? "assets/error.svg" : "assets/logo.png",
    title: n ? "操作提醒" : "系统提醒",
    subtitle: o,
    duration: a
  }), window.showBiliToast = (o, n = 3200, a = {}) => {
    const d = typeof n == "object" && n ? n : a, v = typeof n == "number" ? n : 3200, f = d.isError || /失败|错误|异常|未获取|未找到/i.test(o), c = d.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = d.subtitle || (o.length > 36 ? "" : o), b = d.message || (d.subtitle || o.length > 36 ? o : ""), M = {
      id: d.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: c,
      subtitle: h || o,
      message: b && b !== h ? b : "",
      showActions: !!(d.showActions || d.actionLabel),
      actionLabel: d.actionLabel || "",
      onClick: d.onClick || null,
      target: si(d.target) || Xi(d.url) || si({ type: "bili-video", bvid: d.bvid, aid: d.aid ? String(d.aid) : void 0 }),
      url: d.url,
      duration: Math.max(3e3, v)
    };
    return window.showWindowsToast(M);
  }, window.showFetchToast = (o, n, a = "", d = "assets/logo.png", v = 3200) => window.showWindowsToast({
    appName: o,
    title: n,
    subtitle: a,
    icon: d || "assets/logo.png",
    duration: v,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = va, window.LogicWeaverMarkdownAst = ya, window.setLauncherBackground = (o) => Ko.setWallpaper(o), window.backgroundDbClear = (o) => Ps(o), window.openBackgroundHistory = () => tn.openDialog();
}
const Re = ke({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Wo = null;
const qn = {
  get state() {
    return Re;
  },
  open() {
    Re.isOpen || (Re.isOpen = !0, Re.query = "", Re.selectedIndex = 0, Wo = De.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Re.isOpen && (Re.isOpen = !1, Re.query = "", Re.selectedIndex = 0, Wo && (Wo(), Wo = null));
  },
  toggle() {
    Re.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Re.query = e, Re.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Re.selectedIndex = (Re.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Re.selectedIndex = (Re.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await Qo.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (Fi.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", n = e.altKey && (e.code === "Space" || t === " ");
  (o || n) && (e.preventDefault(), e.stopPropagation(), qn.toggle());
}, !0);
function Qa(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => qn.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => dt.enabled && !dt.finished,
    run: () => dt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => ye.size > 0,
    run: () => ye.clear()
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
    enabled: () => qt.ready,
    run: () => qt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => qt.ready,
    run: () => qt.goToday()
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
const er = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, tr = /* @__PURE__ */ ce({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Ns.exit();
    }
    return (o, n) => (r(), le(Is, { name: "guest-banner-slide" }, {
      default: to(() => [
        s(Ws) ? (r(), p("aside", er, [
          n[1] || (n[1] = i("div", { class: "banner-content" }, [
            i("span", {
              class: "preview-pulse-dot",
              "aria-hidden": "true"
            }),
            i("div", { class: "banner-texts" }, [
              i("strong", null, "👀 新用户开箱视角预览中"),
              i("small", null, "当前正在模拟新用户刚安装时的纯净首屏体验 · 你的真实数据已安全封存")
            ])
          ], -1)),
          i("button", {
            type: "button",
            class: "btn-exit-guest",
            title: "退出沙箱，原样恢复我的真实网站与数据",
            onClick: t
          }, [...n[0] || (n[0] = [
            i("span", null, "✕ 退出预览，恢复我的数据", -1)
          ])])
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), or = /* @__PURE__ */ Me(tr, [["__scopeId", "data-v-a2f2ca5f"]]), ir = ["hidden"], nr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, sr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], ar = /* @__PURE__ */ ce({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = j(null);
    function o(d) {
      const v = t.value;
      !v || v.scrollWidth <= v.clientWidth || !d.deltaY || (d.preventDefault(), v.scrollLeft += d.deltaY);
    }
    function n(d) {
      Vo.openFolder(d.id);
    }
    function a(d, v) {
      Vo.openContextMenu(v, d.clientX, d.clientY);
    }
    return (d, v) => (r(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Yt).enabled,
      onWheel: o
    }, [
      s(Yt).folders.length ? E("", !0) : (r(), p("span", nr, u(s(Yt).emptyMessage || "书签栏没有文件夹"), 1)),
      (r(!0), p(Y, null, fe(s(Yt).folders, (f) => (r(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (c) => n(f),
        onContextmenu: H((c) => a(c, f), ["prevent"])
      }, [
        v[0] || (v[0] = i("span", { "aria-hidden": "true" }, "📁", -1)),
        i("span", null, u(f.title || "未命名"), 1)
      ], 40, sr))), 128))
    ], 40, ir));
  }
}), rr = /* @__PURE__ */ Me(ar, [["__scopeId", "data-v-5e71cc7c"]]), lr = ["aria-label"], cr = { class: "cube-manager-body" }, dr = ["disabled", "onClick", "title"], ur = ["disabled", "onClick", "title"], pr = ["onClick"], hr = ["onClick"], fr = ["onClick"], gr = { value: "memo" }, mr = { value: "countdown" }, vr = { value: "link" }, yr = ["type", "placeholder"], wr = { type: "submit" }, br = {
  key: 0,
  role: "alert"
}, kr = /* @__PURE__ */ ce({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Ee.state, o = oe(() => Ee.getActiveFaces()), n = oe(() => t.registeredFaces.filter((m) => !t.activeFaceIds.includes(m.id))), a = j(""), d = j("memo"), v = j(""), f = j(!1), c = j(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), h = j("");
    function b(m) {
      h.value = "";
      try {
        m();
      } catch (x) {
        h.value = x instanceof Error ? x.message : "操作失败";
      }
    }
    function M() {
      b(() => {
        const m = f.value ? JSON.parse(c.value) : {
          title: a.value,
          customType: d.value,
          customData: { text: v.value, targetDate: v.value, url: v.value }
        };
        Ee.addCustomFace(m), a.value = "", v.value = "";
      });
    }
    return (m, x) => (r(), le(yt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (r(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": s(l)("cube.manager.title"),
        onKeydown: x[7] || (x[7] = Ot(H((g) => s(Ee).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        i("header", null, [
          i("strong", null, u(s(l)("cube.manager.title")), 1),
          i("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: x[0] || (x[0] = (g) => s(Ee).closeConfigDialog())
          }, "×")
        ]),
        i("div", cr, [
          i("p", null, u(s(l)("cube.manager.desc")), 1),
          (r(!0), p(Y, null, fe(o.value, (g, C) => (r(), p("div", {
            key: g.id,
            class: "cube-row"
          }, [
            i("span", null, u(g.icon) + " " + u(g.title), 1),
            i("button", {
              type: "button",
              disabled: C === 0,
              onClick: (I) => b(() => s(Ee).moveUp(g.id)),
              title: s(l)("cube.manager.moveUp")
            }, "↑", 8, dr),
            i("button", {
              type: "button",
              disabled: C === o.value.length - 1,
              onClick: (I) => b(() => s(Ee).moveDown(g.id)),
              title: s(l)("cube.manager.moveDown")
            }, "↓", 8, ur),
            i("button", {
              type: "button",
              onClick: (I) => b(() => s(Ee).removeCustomFace(g.id))
            }, u(s(l)("cube.manager.removeFace")), 9, pr)
          ]))), 128)),
          (r(!0), p(Y, null, fe(n.value, (g) => (r(), p("div", {
            key: g.id,
            class: "cube-row"
          }, [
            i("span", null, u(g.title) + u(s(l)("cube.manager.inactiveSuffix")), 1),
            i("button", {
              type: "button",
              onClick: (C) => b(() => s(Ee).toggleActive(g.id, !0))
            }, u(s(l)("cube.manager.add")), 9, hr),
            g.builtIn ? E("", !0) : (r(), p("button", {
              key: 0,
              type: "button",
              onClick: (C) => b(() => s(Ee).removeCustomFace(g.id))
            }, u(s(l)("cube.manager.delete")), 9, fr))
          ]))), 128)),
          i("h3", null, u(s(l)("cube.manager.addFace")), 1),
          i("label", null, [
            je(i("input", {
              "onUpdate:modelValue": x[1] || (x[1] = (g) => f.value = g),
              type: "checkbox"
            }, null, 512), [
              [Ms, f.value]
            ]),
            Ye(" " + u(s(l)("cube.manager.pasteJson")), 1)
          ]),
          i("form", {
            onSubmit: H(M, ["prevent"])
          }, [
            f.value ? (r(), p(Y, { key: 1 }, [
              i("p", null, u(s(l)("cube.manager.securityNotice")), 1),
              je(i("textarea", {
                "onUpdate:modelValue": x[5] || (x[5] = (g) => c.value = g),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [oo, c.value]
              ])
            ], 64)) : (r(), p(Y, { key: 0 }, [
              i("label", null, [
                Ye(u(s(l)("cube.manager.fieldTitle")), 1),
                je(i("input", {
                  "onUpdate:modelValue": x[2] || (x[2] = (g) => a.value = g),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [oo, a.value]
                ])
              ]),
              i("label", null, [
                Ye(u(s(l)("cube.manager.fieldType")), 1),
                je(i("select", {
                  "onUpdate:modelValue": x[3] || (x[3] = (g) => d.value = g)
                }, [
                  i("option", gr, u(s(l)("cube.manager.typeMemo")), 1),
                  i("option", mr, u(s(l)("cube.manager.typeCountdown")), 1),
                  i("option", vr, u(s(l)("cube.manager.typeLink")), 1)
                ], 512), [
                  [xn, d.value]
                ])
              ]),
              i("label", null, [
                Ye(u(s(l)("cube.manager.fieldContent")), 1),
                je(i("input", {
                  "onUpdate:modelValue": x[4] || (x[4] = (g) => v.value = g),
                  type: d.value === "countdown" ? "date" : "text",
                  placeholder: d.value === "link" ? "https://…" : s(l)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, yr), [
                  [Ds, v.value]
                ])
              ])
            ], 64)),
            i("button", wr, u(s(l)("cube.manager.submitAdd")), 1)
          ], 32),
          h.value ? (r(), p("p", br, u(h.value), 1)) : E("", !0)
        ]),
        i("footer", null, [
          i("button", {
            type: "button",
            onClick: x[6] || (x[6] = (g) => b(() => s(Ee).resetDefaults()))
          }, u(s(l)("cube.manager.resetDefault")), 1),
          i("small", null, u(s(l)("cube.manager.resetNotice")), 1)
        ])
      ], 40, lr)) : E("", !0)
    ]));
  }
}), _r = /* @__PURE__ */ Me(kr, [["__scopeId", "data-v-490de280"]]), Cr = ["data-face"], xr = ["aria-label"], Lr = { class: "ms-top-side" }, $r = ["title"], Tr = ["title"], Sr = ["title"], Ir = {
  key: 0,
  class: "ms-top-meta"
}, Mr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Dr = { class: "ms-top-artist" }, Ar = { class: "ms-top-meta" }, Er = ["title"], Pr = ["title"], Wr = {
  key: 0,
  class: "ms-top-divider"
}, Nr = ["title"], Rr = { class: "ms-top-mini-progress" }, Or = { class: "ms-top-side" }, Br = ["title"], Fr = ["title"], Hr = ["aria-label"], jr = ["title"], zr = { class: "ms-cube-custom-icon" }, Gr = { class: "ms-cube-custom-title" }, Kr = ["title"], Vr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Ur = ["href"], Yr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, qr = ["title", "onClick"], Xr = { class: "ms-cube-cm-header" }, Jr = { class: "ms-cube-cm-list" }, Zr = ["onClick"], Qr = { class: "ms-cube-cm-icon" }, el = { class: "ms-cube-cm-title" }, tl = {
  key: 0,
  class: "ms-cube-cm-check"
}, ol = /* @__PURE__ */ ce({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = oe(() => Tn.visible || rt.djModalOpen || rt.isActive && rt.isJoined), n = oe(() => rt.isActive && rt.isJoined), a = oe(() => Ee.getActiveFaces()), d = j("music"), v = j(0);
    let f = !1, c;
    Be(
      () => a.value,
      (F) => {
        F.some((O) => O.id === d.value) || (d.value = F[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = oe(() => a.value.filter((F) => !F.builtIn)), b = j(!1), M = j({ x: 0, y: 0 });
    Be(() => t.active, (F) => {
      F || (b.value = !1, Ee.closeConfigDialog(), clearTimeout(c), f = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: x } = Nn({
      visible: () => b.value,
      anchor: () => M.value,
      dismiss: () => {
        b.value = !1;
      }
    });
    function g(F) {
      F.preventDefault(), F.stopPropagation(), M.value = { x: F.clientX, y: F.clientY }, b.value = !0;
    }
    function C(F) {
      W(F), b.value = !1;
    }
    function I() {
      b.value = !1, Ee.openConfigDialog();
    }
    function y() {
      b.value = !1, _(() => Ee.resetDefaults()), W("music");
    }
    function _(F) {
      b.value = !1;
      try {
        F();
      } catch (O) {
        ye.show({ appName: "滚动立方体", title: "保存失败", message: O instanceof Error ? O.message : "请检查浏览器存储" });
      }
    }
    function T(F) {
      if (!F) return l("cube.countdown.noTarget");
      const z = new Date(F).getTime() - P.value, ge = Math.ceil(z / (1e3 * 60 * 60 * 24));
      return ge > 0 ? l("cube.countdown.remaining", { days: ge }) : ge === 0 ? l("cube.countdown.today") : l("cube.countdown.passed", { days: Math.abs(ge) });
    }
    const N = oe(() => !X.title || X.title === "点击播放" ? l("home.music.defaultTitle") : X.title), B = oe(() => !X.artist || X.artist === "作者" ? l("home.music.defaultArtist") : X.artist), D = oe(() => X.isBiliRadio ? l("cube.source.biliRadio") : X.isNetease ? l("cube.source.netease") : X.playing ? l("cube.source.siren") : l("cube.source.idle")), $ = oe(() => X.currentLyric ? X.currentLyric : X.playing ? l("cube.defaultPlayingLyric") : l("cube.defaultIdleLyric"));
    function L() {
      De.handleToolClick("music");
    }
    const P = j(Date.now());
    let pe;
    Be(() => t.active && a.value.some((F) => F.id === d.value && F.customType === "countdown"), (F) => {
      F && (P.value = Date.now()), clearInterval(pe), pe = F ? window.setInterval(() => {
        document.hidden || (P.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function W(F, O = null) {
      const z = a.value, ge = z.find((Ce) => Ce.id === F) || z[0];
      if (ge) {
        if (Number.isFinite(O))
          v.value = O;
        else if (ge.id !== d.value) {
          const Ce = z.findIndex((We) => We.id === d.value);
          let me = (z.findIndex((We) => We.id === ge.id) - Ce + z.length) % z.length;
          me > z.length / 2 && (me -= z.length), v.value += me * 90;
        }
        d.value = ge.id;
      }
    }
    function G(F) {
      const O = a.value;
      if (O.length <= 1) return;
      const z = O.findIndex((me) => me.id === d.value), Ce = ((z >= 0 ? z : 0) + F + O.length) % O.length, Ie = O[Ce];
      Ie && W(Ie.id, v.value + F * 90);
    }
    function R(F) {
      a.value.length <= 1 || F.altKey || Math.abs(F.deltaY) < 2 || (F.preventDefault(), !f && (f = !0, G(F.deltaY > 0 ? 1 : -1), c = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function q(F) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(F.key) || F.target?.closest?.("input") || (F.preventDefault(), G(["ArrowDown", "PageDown"].includes(F.key) ? 1 : -1));
    }
    function he(F, O) {
      return d.value === F ? {
        transform: `rotateX(${-v.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${O}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function _e(F) {
      const O = F.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || (F.preventDefault(), F.stopPropagation());
    }
    function Je(F) {
      const O = F.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || F.preventDefault();
    }
    return St(() => {
      clearInterval(pe), clearTimeout(c);
    }), (F, O) => je((r(), p("div", {
      class: "ms-top-player",
      "data-face": d.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: R,
      onKeydown: q,
      onContextmenu: g,
      onCopy: _e,
      onSelectstart: Je
    }, [
      a.value.length ? E("", !0) : (r(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: I
      }, "＋ 添加面（右键管理）")),
      i("div", {
        class: "ms-top-cube",
        style: be({ transform: `translateZ(-22px) rotateX(${v.value}deg)` })
      }, [
        s(Ee).isActive("music") && d.value === "music" ? (r(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": s(l)("cube.musicFaceAria"),
          style: be(he("music", 0))
        }, [
          i("div", Lr, [
            i("button", {
              class: "ms-top-prev",
              title: s(l)("cube.prevTrack"),
              type: "button",
              onClick: O[0] || (O[0] = H((z) => s(Ue).prev(), ["stop"]))
            }, "⏮", 8, $r),
            i("button", {
              class: "ms-top-play",
              title: s(l)("cube.playPause"),
              type: "button",
              onClick: O[1] || (O[1] = H((z) => s(Ue).togglePlay(), ["stop"]))
            }, u(s(X).playing ? "⏸" : "▶"), 9, Tr)
          ]),
          i("button", {
            class: "ms-top-main",
            title: s(l)("cube.openMusicPicker"),
            type: "button",
            onClick: H(L, ["stop"])
          }, [
            o.value ? (r(), p("div", Ir, [
              i("span", Mr, " 🎧 " + u(n.value ? s(l)("cube.listeningTogether") : s(l)("cube.listening")) + "：" + u(N.value), 1),
              i("span", Dr, u(B.value), 1)
            ])) : (r(), p(Y, { key: 1 }, [
              i("div", Ar, [
                i("span", {
                  class: "ms-top-title",
                  title: N.value
                }, u(N.value), 9, Er),
                i("span", {
                  class: "ms-top-artist",
                  title: B.value
                }, u(B.value), 9, Pr),
                i("span", {
                  class: re(["ms-top-source", { idle: !s(X).playing }])
                }, u(D.value), 3),
                $.value ? (r(), p("span", Wr)) : E("", !0)
              ]),
              $.value ? (r(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: $.value
              }, u($.value), 9, Nr)) : E("", !0)
            ], 64)),
            i("div", Rr, [
              i("div", {
                class: "ms-top-mini-fill",
                style: be({ width: s(X).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Sr),
          i("div", Or, [
            i("button", {
              class: "ms-top-next",
              title: s(l)("cube.nextTrack"),
              type: "button",
              onClick: O[2] || (O[2] = H((z) => s(Ue).next(), ["stop"]))
            }, "⏭", 8, Br),
            i("button", {
              class: "ms-top-open",
              title: s(l)("cube.openPlaylist"),
              type: "button",
              onClick: H(L, ["stop"])
            }, "🎵", 8, Fr)
          ])
        ], 12, xr)) : E("", !0),
        (r(!0), p(Y, null, fe(h.value, (z, ge) => (r(), p("section", {
          key: z.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": z.title,
          style: be(he(z.id, (ge + 1) * 90))
        }, [
          d.value === z.id ? (r(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: z.desc
          }, [
            i("span", zr, u(z.icon), 1),
            i("strong", Gr, u(z.title), 1),
            O[10] || (O[10] = i("span", { class: "ms-cube-divider" }, null, -1)),
            z.customType === "memo" ? (r(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: z.customData?.text
            }, u(z.customData?.text || s(l)("cube.memo.clickToConfig")), 9, Kr)) : z.customType === "countdown" ? (r(), p("span", Vr, u(T(z.customData?.targetDate)), 1)) : z.customType === "link" ? (r(), p("a", {
              key: 2,
              href: z.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: O[3] || (O[3] = H(() => {
              }, ["stop"]))
            }, u(z.customData?.url) + " ↗ ", 9, Ur)) : E("", !0)
          ], 8, jr)) : E("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: O[4] || (O[4] = H((Ce) => s(Ee).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Hr))), 128))
      ], 4),
      i("div", Yr, [
        (r(!0), p(Y, null, fe(a.value, (z) => (r(), p("i", {
          key: z.id,
          class: re({ on: d.value === z.id }),
          title: z.title,
          onClick: H((ge) => W(z.id), ["stop"])
        }, null, 10, qr))), 128))
      ]),
      (r(), le(yt, { to: "body" }, [
        t.active && b.value ? (r(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: be(s(x)),
          onClick: O[9] || (O[9] = H(() => {
          }, ["stop"]))
        }, [
          i("div", Xr, [
            O[11] || (O[11] = i("span", null, "🎲 滚动立方体面", -1)),
            i("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: O[5] || (O[5] = (z) => b.value = !1)
            }, "×")
          ]),
          i("div", Jr, [
            (r(!0), p(Y, null, fe(a.value, (z) => (r(), p("button", {
              key: z.id,
              type: "button",
              class: re(["ms-cube-cm-item", { active: d.value === z.id }]),
              onClick: (ge) => C(z.id)
            }, [
              i("span", Qr, u(z.icon), 1),
              i("span", el, u(z.title), 1),
              d.value === z.id ? (r(), p("span", tl, "✓")) : E("", !0)
            ], 10, Zr))), 128))
          ]),
          O[16] || (O[16] = i("div", { class: "ms-cube-cm-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: I
          }, [...O[12] || (O[12] = [
            i("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[6] || (O[6] = (z) => {
              G(-1), b.value = !1;
            })
          }, [...O[13] || (O[13] = [
            i("span", null, "⏮ 上一个面板", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[7] || (O[7] = (z) => {
              G(1), b.value = !1;
            })
          }, [...O[14] || (O[14] = [
            i("span", null, "⏭ 下一个面板", -1)
          ])]),
          d.value ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: O[8] || (O[8] = (z) => _(() => s(Ee).removeCustomFace(d.value)))
          }, "删除当前面")) : E("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: y
          }, [...O[15] || (O[15] = [
            i("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (r(), le(_r, { key: 1 })) : E("", !0)
    ], 40, Cr)), [
      [io, t.active]
    ]);
  }
}), il = /* @__PURE__ */ Me(ol, [["__scopeId", "data-v-591e9de8"]]), wo = ke({
  isOpen: !1
}), Xn = {
  open() {
    wo.isOpen = !0;
  },
  close() {
    wo.isOpen = !1;
  },
  toggle() {
    wo.isOpen = !wo.isOpen;
  }
}, Ei = Tt(wo);
function nl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (n, a, d) => {
    a.id !== chrome.runtime.id || n?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || n.targetTabId !== t || (Xn.toggle(), d({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((n) => {
    e || (t = n?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const sl = { class: "tb-brand" }, al = ["title", "aria-expanded", "aria-label"], rl = ["src", "alt"], ll = ["hidden"], cl = ["title", "hidden"], dl = { id: "vue-bookmark-folder-strip-root" }, ul = { class: "tb-actions" }, pl = {
  id: "workspace-launchers",
  hidden: ""
}, hl = ["title", "aria-expanded"], fl = ["title"], gl = /* @__PURE__ */ ce({
  __name: "AppTopBar",
  setup(e) {
    const t = K(() => import("./WorkspaceLaunchers-DcSJHloP.js"));
    function o(c) {
      c.preventDefault(), c.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : Zo.open();
    }
    function n(c) {
      c.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : Ni.toggleBookmarkPanel();
    }
    function a(c) {
      c.preventDefault(), $t.toggle();
    }
    function d(c) {
      c.preventDefault(), Lo.open(c.clientX, c.clientY);
    }
    function v(c) {
      const h = c.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (c.preventDefault(), c.stopPropagation());
    }
    function f(c) {
      const h = c.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || c.preventDefault();
    }
    return Ve(() => {
      $t.start();
      const c = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = c, document.documentElement.setAttribute("data-theme", c);
    }), (c, h) => (r(), p("header", {
      class: re(["topbar", { "bookmark-folders-mode": s(Yt).enabled }]),
      onCopy: v,
      onSelectstart: f
    }, [
      i("div", sl, [
        i("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: s(l)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": s(Sn).isOpen,
          "aria-label": s(lo) ? s(l)("topbar.notificationsUnread", { count: s(lo) }) : s(l)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = H((b) => d(b), ["prevent"]))
        }, [
          i("img", {
            id: "bili-profile-avatar",
            src: s(Vt).avatarUrl || "assets/bilibili.svg",
            alt: s(Vt).userName || s(l)("topbar.notifications")
          }, null, 8, rl),
          i("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(lo) <= 0
          }, u(s(lo) > 99 ? "99+" : s(lo)), 9, ll)
        ], 40, al),
        i("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: s(l)("topbar.bookmarks"),
          hidden: s(Yt).enabled,
          onClick: n
        }, [
          h[2] || (h[2] = i("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          i("span", null, u(s(l)("topbar.bookmarks")), 1)
        ], 8, cl),
        i("div", dl, [
          J(rr)
        ])
      ]),
      J(il, {
        active: !s(xt).activeId
      }, null, 8, ["active"]),
      i("div", ul, [
        h[3] || (h[3] = i("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        i("span", pl, [
          J(s(t))
        ]),
        i("button", {
          id: "side-drawer-toggle",
          class: re(["tb-btn", { active: s(Ei).isOpen }]),
          type: "button",
          title: s(l)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Ei).isOpen,
          onClick: h[1] || (h[1] = (b) => s(Xn).toggle())
        }, " 📑 ", 10, hl),
        i("button", {
          id: "settings-open",
          class: "tb-btn",
          title: s(l)("topbar.settings"),
          onClick: o
        }, "⚙", 8, fl)
      ])
    ], 34));
  }
}), ml = {
  key: 0,
  class: "notice"
}, vl = {
  key: 1,
  class: "muted small"
}, yl = {
  key: 2,
  class: "notice"
}, wl = {
  key: 3,
  class: "notice"
}, bl = { class: "wx-cur" }, kl = { class: "wx-emoji" }, _l = { class: "wx-temp" }, Cl = { class: "wx-sub" }, xl = { class: "wx-rain" }, Ll = { class: "wx-hours" }, $l = { class: "hh" }, Tl = { class: "he" }, Sl = { class: "ht" }, Il = { class: "wx-days" }, Ml = ["open"], Dl = { class: "weather-forecast-head" }, Al = { class: "weather-forecast-city-info" }, El = { class: "weather-forecast-icon" }, Pl = { id: "weather-forecast-city-title" }, Wl = { class: "small muted" }, Nl = { class: "weather-forecast-actions" }, Rl = ["title"], Ol = ["title"], Bl = {
  key: 0,
  class: "weather-metrics-grid"
}, Fl = { class: "weather-metric-item" }, Hl = { class: "metric-label" }, jl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, zl = { class: "weather-metric-item" }, Gl = { class: "metric-label" }, Kl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Vl = { class: "weather-metric-item" }, Ul = { class: "metric-label" }, Yl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, ql = { class: "weather-metric-item" }, Xl = { class: "metric-label" }, Jl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Zl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Ql = { class: "day-date-col" }, ec = { class: "day-name" }, tc = { class: "day-date small muted" }, oc = { class: "day-weather-col" }, ic = { class: "day-emoji" }, nc = { class: "day-cond" }, sc = { class: "day-rain-col" }, ac = {
  key: 0,
  class: "rain-tag"
}, rc = {
  key: 1,
  class: "rain-tag empty"
}, lc = { class: "day-temp-bar-col" }, cc = { class: "low-temp" }, dc = { class: "temp-track" }, uc = { class: "high-temp" }, pc = { class: "weather-location-head" }, hc = { class: "weather-location-title-row" }, fc = { class: "weather-location-title" }, gc = ["title"], mc = { class: "weather-input-wrapper" }, vc = ["placeholder", "onKeydown"], yc = ["title"], wc = {
  type: "submit",
  class: "weather-location-submit"
}, bc = { key: 0 }, kc = { class: "weather-section-subtitle" }, _c = {
  key: 0,
  class: "weather-location-suggestions"
}, Cc = ["onClick"], xc = { class: "weather-suggestion-name" }, Lc = { class: "weather-suggestion-sub" }, $c = {
  key: 1,
  class: "weather-suggestion-empty"
}, Tc = { key: 1 }, Sc = { class: "weather-section-subtitle" }, Ic = { class: "weather-quick-chips-grid" }, Mc = ["onClick"], Dc = /* @__PURE__ */ ce({
  __name: "WeatherWidget",
  setup(e) {
    const t = j(!1), o = j({ x: 0, y: 0 }), n = j(""), a = j(null), d = j(null), v = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = oe(() => {
      const y = n.value.trim();
      return y ? Kt.filterCities(y, 6) : [];
    });
    function c(y) {
      const B = y?.clientX ?? window.innerWidth / 2 - 140, D = y?.clientY ?? window.innerHeight / 2 - 320 / 2, $ = Math.max(12, Math.min(window.innerWidth - 280 - 12, B)), L = Math.max(12, Math.min(window.innerHeight - 320 - 12, D));
      o.value = { x: $, y: L }, t.value = !0, n.value = "", vt(() => {
        d.value?.focus();
      });
    }
    function h() {
      t.value = !1, n.value = "";
    }
    async function b(y) {
      const _ = y.trim();
      _ && (h(), await Kt.changeCity(_));
    }
    function M() {
      const y = n.value.trim();
      y && b(y);
    }
    function m(y) {
      if (!t.value) return;
      const _ = y.target;
      a.value && !a.value.contains(_) && h();
    }
    function x(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), h());
    }
    Ve(() => {
      it.setRefreshAction(() => {
        Kt.loadWeather();
      }), it.setChangeLocationAction((y) => {
        c(y);
      }), Kt.loadWeather(), Be(lt, () => {
        Kt.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", x, !0);
    }), St(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", x, !0);
    });
    function g(y) {
      y.preventDefault(), c(y);
    }
    function C() {
      it.closeForecastModal();
    }
    function I(y) {
      y.target?.id === "weather-forecast-dialog" && C();
    }
    return (y, _) => (r(), p("div", {
      class: "weather-widget-container",
      onContextmenu: g
    }, [
      s(V).state === "unconfigured" ? (r(), p("p", ml, u(s(l)("weather.noCitySet")), 1)) : s(V).state === "loading" ? (r(), p("p", vl, u(s(l)("common.loading")), 1)) : s(V).state === "not_found" ? (r(), p("p", yl, u(s(l)("weather.cityNotFound", { city: s(V).city })), 1)) : s(V).state === "error" ? (r(), p("p", wl, u(s(V).errorMessage || s(l)("weather.loadFailed")), 1)) : s(V).state === "ready" && s(V).data ? (r(), p(Y, { key: 4 }, [
        i("div", bl, [
          i("span", kl, u(s(V).data.currentEmoji), 1),
          i("span", _l, u(s(V).data.currentTemp) + "°", 1)
        ]),
        i("p", Cl, u(s(V).data.subText), 1),
        i("p", xl, u(s(V).data.rainText), 1),
        i("div", Ll, [
          (r(!0), p(Y, null, fe(s(V).data.hours, (T, N) => (r(), p("div", {
            key: N,
            class: "wx-h"
          }, [
            i("span", $l, u(T.time), 1),
            i("span", Tl, u(T.emoji), 1),
            i("span", Sl, u(T.temp) + "°", 1)
          ]))), 128))
        ]),
        i("div", Il, [
          (r(!0), p(Y, null, fe(s(V).data.days, (T, N) => (r(), p("span", { key: N }, u(T.label) + " " + u(T.emoji) + " " + u(T.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      i("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(V).forecastModalOpen,
        onClick: I
      }, [
        i("div", {
          class: "weather-forecast-shell",
          onClick: _[1] || (_[1] = H(() => {
          }, ["stop"]))
        }, [
          i("header", Dl, [
            i("div", Al, [
              i("span", El, u(s(V).data?.currentEmoji || "🌤️"), 1),
              i("div", null, [
                i("h3", Pl, u(s(V).city || s(V).data?.cityName || s(l)("weather.forecastTitle")), 1),
                i("p", Wl, u(s(V).data?.subText || s(l)("weather.forecastSub")), 1)
              ])
            ]),
            i("div", Nl, [
              i("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(l)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (T) => s(it).refresh())
              }, u(s(l)("weather.refresh")), 9, Rl),
              i("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(l)("common.close"),
                onClick: C
              }, " ✕ ", 8, Ol)
            ])
          ]),
          s(V).detailInfo ? (r(), p("div", Bl, [
            i("div", Fl, [
              i("span", Hl, u(s(l)("weather.metric.humidity")), 1),
              i("span", jl, u(s(V).detailInfo.humidity || "50%"), 1)
            ]),
            i("div", zl, [
              i("span", Gl, u(s(l)("weather.metric.wind")), 1),
              i("span", Kl, u(s(V).detailInfo.wind || (s(lt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            i("div", Vl, [
              i("span", Ul, u(s(l)("weather.metric.uv")), 1),
              i("span", Yl, u(s(V).detailInfo.uvIndex || (s(lt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            i("div", ql, [
              i("span", Xl, u(s(l)("weather.metric.aqi")), 1),
              i("span", Jl, u(s(V).detailInfo.airQuality || (s(lt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          i("div", Zl, [
            (r(!0), p(Y, null, fe(s(V).forecastDays, (T, N) => (r(), p("div", {
              key: N,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              i("div", Ql, [
                i("span", ec, u(T.dayName), 1),
                i("span", tc, u(T.date), 1)
              ]),
              i("div", oc, [
                i("span", ic, u(T.emoji), 1),
                i("span", nc, u(T.condition), 1)
              ]),
              i("div", sc, [
                T.rainProb > 0 ? (r(), p("span", ac, "☂️ " + u(T.rainProb) + "%", 1)) : (r(), p("span", rc, u(s(l)("weather.metric.noRain")), 1))
              ]),
              i("div", lc, [
                i("span", cc, u(T.lowTemp) + "°", 1),
                i("div", dc, [
                  i("div", {
                    class: "temp-range-fill",
                    style: be({
                      left: `${Math.max(0, Math.min(100, (T.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (T.highTemp - T.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                i("span", uc, u(T.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Ml),
      (r(), le(yt, { to: "body" }, [
        t.value ? (r(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: be({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: _[4] || (_[4] = H(() => {
          }, ["stop"])),
          onContextmenu: _[5] || (_[5] = H(() => {
          }, ["prevent"]))
        }, [
          i("div", pc, [
            i("div", hc, [
              i("span", fc, u(s(l)("weather.menu.changeLocation")), 1),
              i("span", {
                class: "weather-location-curr-badge",
                title: s(V).city
              }, [
                _[6] || (_[6] = i("span", { class: "weather-curr-dot" }, null, -1)),
                Ye(" " + u(s(V).city || s(l)("weather.menu.unset")), 1)
              ], 8, gc)
            ])
          ]),
          i("form", {
            class: "weather-location-form",
            onSubmit: H(M, ["prevent"])
          }, [
            i("div", mc, [
              _[7] || (_[7] = i("span", { class: "weather-input-icon" }, "🔍", -1)),
              je(i("input", {
                ref_key: "inputRef",
                ref: d,
                class: "weather-location-input",
                placeholder: s(l)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (T) => n.value = T),
                onKeydown: Ot(H(M, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, vc), [
                [oo, n.value]
              ]),
              n.value ? (r(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (T) => n.value = ""),
                title: s(l)("weather.menu.clearInput")
              }, "✕", 8, yc)) : E("", !0)
            ]),
            i("button", wc, u(s(l)("weather.menu.submit")), 1)
          ], 32),
          n.value.trim() ? (r(), p("div", bc, [
            i("div", kc, u(s(l)("weather.menu.suggestions")), 1),
            f.value.length ? (r(), p("div", _c, [
              (r(!0), p(Y, null, fe(f.value, (T) => (r(), p("button", {
                key: T.name + T.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (N) => b(T.name)
              }, [
                i("span", xc, u(T.name), 1),
                i("span", Lc, u(T.admin), 1)
              ], 8, Cc))), 128))
            ])) : (r(), p("div", $c, u(s(l)("weather.menu.emptySuggestion")), 1))
          ])) : (r(), p("div", Tc, [
            i("div", Sc, u(s(l)("weather.menu.commonCities")), 1),
            i("div", Ic, [
              (r(), p(Y, null, fe(v, (T) => i("button", {
                key: T,
                type: "button",
                class: re(["weather-quick-chip", { active: s(V).city === T }]),
                onClick: (N) => b(T)
              }, u(T), 11, Mc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), Jn = /* @__PURE__ */ Me(Dc, [["__scopeId", "data-v-5aae12b5"]]), Pi = "heroCustomMottoV1";
function Ac() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Pi);
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
const jt = Ac(), U = ke({
  loaded: !1,
  customText: jt.customText,
  history: jt.history,
  currentIndex: jt.customText && jt.history.length ? jt.history.findIndex((e) => e.text === jt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Ec(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Pc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Wc(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, n = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: n };
}
const ot = {
  async init() {
    try {
      const e = await Ec(Pi);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= U.history.length && (U.history = t, e.customText !== void 0 && (U.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      U.loaded = !0, U.customText && U.history.length && (U.currentIndex = U.history.findIndex(
        (e) => e.text === U.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: U.customText,
      history: U.history
    };
    await Pc(Pi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: n } = Wc(/* @__PURE__ */ new Date());
    U.customText = t;
    const a = U.history.findIndex((d) => d.text === t);
    if (a !== -1) {
      const d = U.history.splice(a, 1)[0];
      d.date = o, d.time = n, U.history.unshift(d);
    } else
      U.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: n,
        text: t,
        createdAt: Date.now()
      });
    U.history.length > 50 && (U.history = U.history.slice(0, 50)), U.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    U.customText = e.text, U.currentIndex = U.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    U.customText = null, U.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = U.history.findIndex((o) => o.id === e);
    t !== -1 && (U.history.splice(t, 1), U.currentIndex === t && (U.history.length > 0 ? this.selectHistory(U.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    U.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!U.history.length) return;
    let t = U.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= U.history.length && (t = 0), this.selectHistory(U.history[t]);
  },
  openMenu(e, t) {
    U.menuPos = { x: e, y: t }, U.menuOpen = !0;
  },
  closeMenu() {
    U.menuOpen = !1;
  }
}, Nc = ["title"], Rc = ["placeholder"], Oc = { class: "motto-content" }, Bc = ["title"], Fc = { class: "motto-menu-header" }, Hc = { class: "dim" }, jc = { class: "motto-history-label" }, zc = { class: "motto-history-list" }, Gc = {
  key: 0,
  class: "motto-history-empty dim"
}, Kc = ["onClick"], Vc = { class: "motto-item-date" }, Uc = ["title"], Yc = ["title", "onClick"], qc = /* @__PURE__ */ ce({
  __name: "HeroMotto",
  setup(e) {
    const t = j(!1), o = j(""), n = j(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function d(g) {
      const C = a[g];
      return C ? l(C) : g;
    }
    const v = oe(() => U.customText ? d(U.customText) : we.greetingText);
    function f() {
      ot.closeMenu(), o.value = U.customText || we.greetingText, t.value = !0, vt(() => {
        n.value?.focus(), n.value?.select();
      });
    }
    function c() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      ot.setCustomMotto(g), g && ye.fetch(l("motto.appName"), l("motto.updated", { text: g }));
    }
    function h() {
      t.value = !1;
    }
    function b(g) {
      g.key === "Enter" ? (g.preventDefault(), c()) : g.key === "Escape" && (g.preventDefault(), h());
    }
    function M(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), ot.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function m(g) {
      g.preventDefault(), g.stopPropagation(), ot.openMenu(g.clientX, g.clientY);
    }
    function x(g) {
      U.menuOpen && (g.target.closest(".motto-context-menu") || ot.closeMenu());
    }
    return Ve(() => {
      ot.init(), window.addEventListener("click", x);
    }), St(() => {
      window.removeEventListener("click", x);
    }), (g, C) => (r(), p(Y, null, [
      i("div", {
        class: "hero-motto-wrapper",
        title: s(l)("motto.hint"),
        onWheel: M,
        onContextmenu: m
      }, [
        t.value ? je((r(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: n,
          "onUpdate:modelValue": C[0] || (C[0] = (I) => o.value = I),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(l)("motto.placeholder"),
          maxlength: "60",
          onBlur: c,
          onKeydown: b
        }, null, 40, Rc)), [
          [oo, o.value]
        ]) : (r(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: be({ color: s(we).greetColor }),
          onClick: f
        }, [
          i("span", Oc, u(v.value), 1),
          s(U).history.length > 1 ? (r(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(l)("motto.scrollHint")
          }, "⇕", 8, Bc)) : E("", !0)
        ], 4))
      ], 40, Nc),
      (r(), le(yt, { to: "body" }, [
        s(U).menuOpen ? (r(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: be({ left: `${s(U).menuPos.x}px`, top: `${s(U).menuPos.y}px` }),
          onClick: C[3] || (C[3] = H(() => {
          }, ["stop"])),
          onContextmenu: C[4] || (C[4] = H(() => {
          }, ["prevent"]))
        }, [
          i("div", Fc, [
            i("span", null, u(s(l)("motto.customTitle")), 1),
            i("small", Hc, u(s(l)("motto.recordsCount", { count: s(U).history.length })), 1)
          ]),
          i("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            C[5] || (C[5] = i("i", null, "✎", -1)),
            i("span", null, u(s(l)("motto.editCurrent")), 1)
          ]),
          C[8] || (C[8] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("div", jc, u(s(l)("motto.historyLabel")), 1),
          i("div", zc, [
            s(U).history.length ? (r(!0), p(Y, { key: 1 }, fe(s(U).history, (I) => (r(), p("div", {
              key: I.id,
              class: re(["motto-history-item", { active: s(U).customText === I.text }]),
              onClick: (y) => s(ot).selectHistory(I)
            }, [
              i("span", Vc, u(I.date), 1),
              i("span", {
                class: "motto-item-text",
                title: d(I.text)
              }, u(d(I.text)), 9, Uc),
              i("button", {
                type: "button",
                class: "motto-item-del",
                title: s(l)("motto.deleteEntry"),
                onClick: H((y) => s(ot).deleteEntry(I.id), ["stop"])
              }, "×", 8, Yc)
            ], 10, Kc))), 128)) : (r(), p("div", Gc, u(s(l)("motto.historyEmpty")), 1))
          ]),
          C[9] || (C[9] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: C[1] || (C[1] = //@ts-ignore
            (...I) => s(ot).resetToSystem && s(ot).resetToSystem(...I))
          }, [
            C[6] || (C[6] = i("i", null, "↻", -1)),
            i("span", null, u(s(l)("motto.resetGreeting")), 1)
          ]),
          s(U).history.length ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: C[2] || (C[2] = //@ts-ignore
            (...I) => s(ot).clearHistory && s(ot).clearHistory(...I))
          }, [
            C[7] || (C[7] = i("i", null, "🗑", -1)),
            i("span", null, u(s(l)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), Xc = /* @__PURE__ */ Me(qc, [["__scopeId", "data-v-a65048d3"]]), Jc = /* @__PURE__ */ ce({
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
    function o(c) {
      return c < 5 ? l("clock.greeting.lateNight") : c < 9 ? l("clock.greeting.morning") : c < 12 ? l("clock.greeting.forenoon") : c < 14 ? l("clock.greeting.noon") : c < 18 ? l("clock.greeting.afternoon") : c < 23 ? l("clock.greeting.evening") : l("clock.greeting.lateNight");
    }
    function n() {
      const c = Nt.state.timezone;
      if (!c || c === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: c });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const c = (D) => String(D).padStart(2, "0"), h = n(), b = h.getHours(), M = h.getMinutes(), m = h.getSeconds(), x = h.getFullYear(), g = h.getMonth() + 1, C = h.getDate(), I = h.getDay(), y = `${c(b)}:${c(M)}`, _ = `:${c(m)}`, T = o(b), N = l(t[I]), B = l("clock.datePattern", {
        year: x,
        month: g,
        day: C,
        week: N
      });
      Xt.updateTime(y, _, T, B);
    }
    function d(c) {
      c.preventDefault(), Nt.open({ clientX: c.clientX, clientY: c.clientY });
    }
    function v() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Nt.initPreferences(), a(), Ve(() => {
      Nt.initPreferences(), Be(lt, () => {
        a();
      }), xt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", v);
    }), Be(
      () => xt.activeId,
      (c) => {
        c ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), St(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", v);
    }), (c, h) => (r(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: d
    }, [
      i("p", {
        id: "clock",
        class: "clock",
        style: be({ fontFamily: s(we).fontFamily, color: s(we).colorHex })
      }, [
        Ye(u(s(we).timeText), 1),
        i("span", {
          id: "secs",
          style: be({ color: s(we).colorHex })
        }, u(s(we).secsText), 5)
      ], 4),
      i("p", {
        id: "date",
        class: "date",
        style: be({ color: s(we).dateColor })
      }, u(s(we).dateText), 5)
    ], 32));
  }
}), Zn = /* @__PURE__ */ Me(Jc, [["__scopeId", "data-v-f946341c"]]), Zc = {
  key: 0,
  class: "home-music-degraded-box"
}, Qc = { class: "degraded-badge-row" }, ed = { class: "degraded-status" }, td = {
  key: 0,
  class: "degraded-host-tag"
}, od = {
  key: 1,
  class: "degraded-host-tag"
}, id = { class: "degraded-title-row" }, nd = ["title"], sd = { class: "degraded-track-artist" }, ad = { class: "degraded-progress-bar-wrap" }, rd = { class: "degraded-actions" }, ld = { class: "degraded-time" }, cd = { class: "home-vinyl-box" }, dd = ["title"], ud = ["src", "alt"], pd = { class: "home-music-right" }, hd = ["title"], fd = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, gd = { class: "home-music-seek-row" }, md = {
  id: "home-music-cur",
  class: "home-music-time"
}, vd = ["value"], yd = {
  id: "home-music-dur",
  class: "home-music-time"
}, wd = { class: "home-music-actions" }, bd = ["title"], kd = ["title"], _d = ["title"], Cd = ["title"], xd = ["title"], Ld = /* @__PURE__ */ ce({
  __name: "HomeMusicCard",
  setup(e) {
    Ve(() => {
      setTimeout(() => {
        Rs();
      }, 200);
    });
    const t = oe(() => Tn.visible || rt.djModalOpen || rt.isActive && rt.isJoined), o = oe(() => rt.isActive && rt.isJoined), n = oe(() => !X.title || X.title === "点击播放" ? l("home.music.defaultTitle") : X.title), a = oe(() => !X.artist || X.artist === "作者" ? l("home.music.defaultArtist") : X.artist), d = oe(() => X.mode === "shuffle" ? "🔀" : X.mode === "one" ? "🔂" : "🔁");
    function v(c) {
      const h = c.target, b = Number(h.value);
      Ue.seek(b);
    }
    function f() {
      Ue.update({ coverUrl: "" });
    }
    return (c, h) => (r(), p("div", {
      id: "home-music-player-view",
      class: re(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (r(), p("div", Zc, [
        i("div", Qc, [
          h[7] || (h[7] = i("span", { class: "degraded-icon" }, "🎧", -1)),
          i("strong", ed, u(o.value ? s(l)("home.music.togetherListening") : s(l)("home.music.backgroundListening")), 1),
          o.value ? (r(), p("span", td, " DJ: " + u(s(rt).hostName), 1)) : (r(), p("span", od, u(s(l)("home.music.workspaceReady")), 1))
        ]),
        i("div", id, [
          i("h3", {
            class: "degraded-track-title",
            title: n.value
          }, u(n.value || s(l)("home.music.standby")), 9, nd),
          i("p", sd, u(a.value), 1)
        ]),
        i("div", ad, [
          i("div", {
            class: "degraded-progress-bar-fill",
            style: be({ width: s(X).progressPercent + "%" })
          }, null, 4)
        ]),
        i("div", rd, [
          i("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (b) => s(Ue).togglePlay())
          }, u(s(X).playing ? s(l)("home.music.pause") : s(l)("home.music.play")), 1),
          i("span", ld, u(s(X).formattedCurrent) + " / " + u(s(X).formattedDuration), 1)
        ])
      ])) : (r(), p(Y, { key: 1 }, [
        i("div", cd, [
          i("div", {
            id: "home-vinyl-needle",
            class: re(["home-vinyl-needle", { playing: s(X).playing }])
          }, [...h[8] || (h[8] = [
            vo('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
          ])], 2),
          i("div", {
            id: "home-vinyl-disc",
            class: re(["home-vinyl-disc", { playing: s(X).playing }]),
            title: s(l)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (b) => s(Ue).togglePlay())
          }, [
            s(X).coverUrl ? (r(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(X).coverUrl,
              alt: s(l)("home.music.coverAlt"),
              onError: f
            }, null, 40, ud)) : E("", !0),
            h[9] || (h[9] = i("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, dd)
        ]),
        i("div", pd, [
          i("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: n.value
          }, u(n.value), 9, hd),
          i("p", fd, u(a.value), 1),
          i("div", gd, [
            i("span", md, u(s(X).formattedCurrent), 1),
            i("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(X).progressPercent,
              onInput: v
            }, null, 40, vd),
            i("span", yd, u(s(X).formattedDuration), 1)
          ]),
          i("div", wd, [
            i("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(l)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (b) => s(Ue).prev())
            }, " ⏮ ", 8, bd),
            i("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(l)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (b) => s(Ue).togglePlay())
            }, u(s(X).playing ? "⏸" : "▶"), 9, kd),
            i("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(l)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (b) => s(Ue).next())
            }, " ⏭ ", 8, _d),
            i("button", {
              id: "home-music-like",
              class: re(["home-music-btn like-btn", { liked: s(X).liked }]),
              type: "button",
              title: s(l)("home.music.favorite"),
              onClick: h[5] || (h[5] = (b) => s(Ue).toggleLike())
            }, u(s(X).liked ? "♥" : "♡"), 11, Cd),
            i("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(l)("home.music.playMode"),
              onClick: h[6] || (h[6] = (b) => s(Ue).cycleMode())
            }, u(d.value), 9, xd)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Qn = /* @__PURE__ */ Me(Ld, [["__scopeId", "data-v-b7cbb119"]]), gt = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Set();
function $d(e, t) {
  for (gt.delete(e), gt.set(e, t), mt.delete(t), mt.add(t); gt.size > 512; )
    gt.delete(gt.keys().next().value);
  for (; mt.size > 512; )
    mt.delete(mt.values().next().value);
}
const Td = {
  key: 0,
  class: "launcher-fallback"
}, Sd = ["src"], wi = "lw_resolved_icon:", Id = /* @__PURE__ */ ce({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(wi + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, _) {
      try {
        localStorage.setItem(wi + y, _);
      } catch {
      }
    }
    function n(y) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + y) || "";
      } catch {
        return "";
      }
    }
    const a = e;
    function d(y) {
      try {
        return new URL(y).hostname.replace(/^www\./, "");
      } catch {
        return y || "";
      }
    }
    function v(y) {
      try {
        return new URL(y).origin;
      } catch {
        return "";
      }
    }
    function f(y) {
      try {
        const _ = window, T = typeof _.chrome < "u" ? _.chrome : globalThis.chrome;
        if (typeof T?.runtime?.getURL == "function")
          return T.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(y) + "&size=64");
      } catch {
      }
      return "";
    }
    const c = oe(() => {
      const y = a.link, _ = (y.title || d(y.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = j([]), b = j(0), M = j(!1), m = j(!1), x = oe(() => m.value || b.value >= h.value.length ? "" : h.value[b.value] || "");
    function g() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], m.value = !0, M.value = !1;
        return;
      }
      const _ = [], T = n(y.url);
      T && _.push(T);
      const N = gt.get(y.url) || t(y.url);
      N && !_.includes(N) && _.push(N);
      const B = (W) => W ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(W) : !1;
      y.customIcon && !B(y.customIcon) && _.push(y.customIcon), y.icon && !B(y.icon) && _.push(y.icon);
      const D = f(y.url);
      D && !_.includes(D) && _.push(D);
      const $ = Te.getCachedIcon(y.url);
      $ && !_.includes($) && _.push($);
      const L = v(y.url);
      L && !L.startsWith("http://1.") && !L.startsWith("http://192.") && !L.startsWith("http://127.") && _.push(`${L}/favicon.ico`), y.customIcon && !B(y.customIcon) && _.unshift(y.customIcon);
      const P = [...new Set(_.filter(Boolean))];
      h.value = P, b.value = 0, m.value = P.length === 0;
      const pe = P[0];
      pe && (pe.startsWith("data:") || mt.has(pe)) && (M.value = !0);
    }
    Be(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, _) => {
        _ && y[0] === _[0] && y[1] === _[1] && y[2] === _[2] || g();
      },
      { immediate: !0 }
    ), Ve(() => {
      h.value.length === 0 && g();
    });
    function C(y) {
      M.value = !0, m.value = !1;
      const _ = x.value;
      if (_) {
        const T = mt.has(_), N = gt.get(a.link.url);
        $d(a.link.url, _), N !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const B = y.target;
        if (!T && !_.startsWith("data:")) {
          const D = a.link.url;
          setTimeout(() => {
            Te.cacheIcon(D, _, B?.getAttribute("src") === _ ? B : null);
          }, 0);
        }
      }
    }
    function I() {
      const y = x.value;
      if (y) {
        mt.delete(y), gt.get(a.link.url) === y && gt.delete(a.link.url);
        try {
          localStorage.removeItem(wi + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && Te.getCachedIcon(a.link.url) === y && Te.evictCachedIcon(a.link.url), b.value + 1 < h.value.length) {
        b.value += 1;
        const _ = h.value[b.value];
        _ && (_.startsWith("data:") || mt.has(_)) && (M.value = !0);
      } else
        m.value = !0, M.value = !1;
    }
    return (y, _) => (r(), p("span", {
      class: re(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !x.value ? (r(), p("span", Td, u(c.value), 1)) : (r(), p("img", {
        key: 1,
        src: x.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: C,
        onError: I
      }, null, 40, Sd))
    ], 2));
  }
}), Xo = /* @__PURE__ */ Me(Id, [["__scopeId", "data-v-bc41d0d8"]]), Md = { class: "launcher-label launcher-title" }, Dd = ["title"], Ad = {
  key: 0,
  class: "launcher-folder-more"
}, Ed = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Pd = { class: "launcher-folder-label launcher-title" }, Wd = /* @__PURE__ */ ce({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = oe(() => t.size === "large" ? 9 : 4), n = oe(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, d) => e.link ? (r(), p(Y, { key: 0 }, [
      J(Xo, { link: e.link }, null, 8, ["link"]),
      i("span", Md, u(e.link.title), 1)
    ], 64)) : e.folder ? (r(), p(Y, { key: 1 }, [
      i("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (r(!0), p(Y, null, fe(n.value, (v) => (r(), le(Xo, {
          key: v.id,
          link: v,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (r(), p("span", Ad, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        n.value.length ? E("", !0) : (r(), p("span", Ed, "📁")),
        Ln(a.$slots, "default", {}, void 0, !0)
      ], 8, Dd),
      i("span", Pd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), mn = /* @__PURE__ */ Me(Wd, [["__scopeId", "data-v-7f513029"]]), Nd = 5, Rd = 180;
function Od(e, t, o) {
  const n = t - e.left, a = o - e.top;
  return n > e.width * 0.25 && n < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function Bd(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Fd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Hd = { class: "card-head aihot-home-head" }, jd = { class: "title" }, zd = ["title"], Gd = ["title"], Kd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Vd = {
  key: 0,
  class: "muted small"
}, Ud = {
  key: 1,
  class: "notice small"
}, Yd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, qd = {
  key: 3,
  class: "aihot-home-rich-list"
}, Xd = ["href", "title", "onClick"], Jd = { class: "aihot-home-rich-main" }, Zd = { class: "aihot-home-rich-title" }, Qd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, eu = { class: "aihot-home-rich-meta" }, tu = { class: "aihot-home-rich-meta-left" }, ou = {
  key: 0,
  class: "aihot-home-rich-tag"
}, iu = { class: "aihot-home-rich-source" }, nu = { class: "aihot-home-rich-time" }, vn = 6, su = /* @__PURE__ */ ce({
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
    }, o = j([]), n = j(0), a = j(!0), d = j("");
    function v(y) {
      return lt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return lt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
    }
    function c(y) {
      if (!y.category) return "";
      const _ = t[y.category];
      if (_)
        try {
          return l(_);
        } catch {
        }
      return y.category;
    }
    const h = oe(() => lt.value !== "en" ? o.value : [...o.value].sort((y, _) => {
      const T = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), N = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return T && !N ? -1 : !T && N ? 1 : 0;
    }));
    function b(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return lt.value === "en" ? "Latest" : "最新";
      const T = Number(_), N = Number.isFinite(T) && T > 0 ? new Date(T > 1e12 ? T : T * 1e3) : new Date(_);
      if (isNaN(N.getTime())) return String(_).slice(0, 16) || (lt.value === "en" ? "Latest" : "最新");
      const B = (W) => String(W).padStart(2, "0"), D = N.getFullYear(), $ = B(N.getMonth() + 1), L = B(N.getDate()), P = B(N.getHours()), pe = B(N.getMinutes());
      return `${D}-${$}-${L} ${P}:${pe}`;
    }
    const M = [
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
      const T = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const N of T)
        try {
          const B = localStorage.getItem(N);
          if (B) {
            const D = JSON.parse(B);
            if (Array.isArray(D) && D.length) return D;
            if (D && Array.isArray(D.items) && D.items.length) return D.items;
          }
        } catch {
        }
      return [];
    }
    async function x(y = !1) {
      if (!y && o.value.length > 0) return;
      const _ = m();
      _.length ? (o.value = _, a.value = !1) : o.value.length || (o.value = [...M], a.value = !1);
      try {
        const N = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), B = Array.isArray(N) ? N : N.items || N.data || N.results || [];
        if (B.length) {
          o.value = B, n.value = 0, d.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(B.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...M]);
      } finally {
        a.value = !1;
      }
    }
    function g() {
      if (!h.value.length) {
        a.value = !0, x(!0);
        return;
      }
      n.value += vn, n.value >= h.value.length && (n.value = 0);
    }
    function C() {
      const y = window;
      if (typeof y.enterFullscreenCard == "function") {
        y.enterFullscreenCard("daily-aihot");
        return;
      }
      const _ = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      _ ? _.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function I(y, _) {
      if (_.ctrlKey || _.metaKey || _.shiftKey || _.button === 1) return;
      _.preventDefault();
      const T = y.links?.original || y.links?.aihot || y.url || "#";
      Hi.openArticle(
        {
          id: y.id,
          title: v(y),
          summary: y.summary,
          sourceName: f(y),
          published: b(y),
          url: T
        },
        ""
      );
    }
    return Ve(() => {
      x();
    }), (y, _) => (r(), p("section", Fd, [
      i("header", Hd, [
        _[0] || (_[0] = i("span", { class: "bar cyan" }, null, -1)),
        i("strong", jd, u(s(l)("aihot.card.title")), 1),
        _[1] || (_[1] = i("span", { class: "grow" }, null, -1)),
        i("button", {
          class: "aihot-home-btn",
          type: "button",
          title: s(l)("aihot.card.refreshBtnTip"),
          onClick: g
        }, u(s(l)("aihot.card.refreshBtn")), 9, zd),
        i("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: s(l)("aihot.card.hotlistBtnTip"),
          onClick: C
        }, u(s(l)("aihot.card.hotlistBtn")), 9, Gd)
      ]),
      i("div", Kd, [
        a.value && !h.value.length ? (r(), p("p", Vd, u(s(l)("aihot.card.loading")), 1)) : d.value && !h.value.length ? (r(), p("p", Ud, u(d.value), 1)) : h.value.length ? (r(), p("div", qd, [
          (r(!0), p(Y, null, fe(h.value.slice(n.value, n.value + vn), (T, N) => (r(), p("a", {
            key: T.id || T.title,
            class: "aihot-home-rich-card",
            href: T.links?.original || T.links?.aihot || T.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${v(T)}
${T.summary || ""}
${s(l)("aihot.card.viewInReader")}`,
            onClick: (B) => I(T, B)
          }, [
            i("span", {
              class: re(["aihot-home-rich-rank", { top: n.value + N < 3 }])
            }, u(n.value + N + 1), 3),
            i("div", Jd, [
              i("h3", Zd, u(v(T)), 1),
              T.summary ? (r(), p("p", Qd, u(T.summary), 1)) : E("", !0),
              i("div", eu, [
                i("div", tu, [
                  c(T) ? (r(), p("span", ou, u(c(T)), 1)) : E("", !0),
                  i("span", iu, u(f(T)), 1)
                ]),
                i("time", nu, u(b(T)), 1)
              ])
            ])
          ], 8, Xd))), 128))
        ])) : (r(), p("p", Yd, u(s(l)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), au = /* @__PURE__ */ Me(su, [["__scopeId", "data-v-5b229fc1"]]), ru = ["aria-label"], lu = ["disabled", "aria-pressed"], cu = ["disabled", "aria-pressed"], du = ["aria-label"], uu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], pu = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, hu = ["data-page"], fu = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], gu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], mu = ["title", "onClick"], vu = {
  class: "launcher-folder-count",
  hidden: ""
}, yu = {
  class: "launcher-empty",
  key: "empty-msg"
}, wu = {
  key: 1,
  class: "launcher-media-stack"
}, bu = {
  key: 1,
  id: "launcher-bili"
}, ku = { class: "launcher-folder-preview" }, _u = { class: "launcher-folder-label launcher-title" }, Cu = { class: "launcher-label launcher-title" }, xu = /* @__PURE__ */ ce({
  __name: "FavoriteSites",
  setup(e) {
    const t = K(() => import("./BookmarkBoard-YYegfGH2.js")), o = K(() => import("./LauncherBookGuideDialog-BrL-_2r4.js")), n = j("sites"), a = j(!1), d = j(!1);
    function v() {
      d.value = !0;
    }
    function f() {
      d.value = !1;
    }
    function c() {
      me(), C = !1, he = !1;
    }
    Ve(() => {
      Oe.setExternalDragHandler($), Oe.setExternalDropHandler(L), window.addEventListener("blur", c), window.addEventListener("pagehide", c), document.addEventListener("visibilitychange", c);
      const w = window;
      ae.hasBili && typeof w.ensureLauncherMediaCards == "function" && w.ensureLauncherMediaCards();
    });
    const h = j(!1), b = j(""), M = j(null), m = j(null), x = j(null), g = j(null);
    let C = !1, I = 0, y = 0, _ = 0, T = "", N = 0, B = "", D = 0;
    function $(w) {
      if (n.value !== "sites") return;
      if (!w || pt.isOpen) {
        g.value && (g.value = null), B = "";
        return;
      }
      const k = document.elementsFromPoint(w.clientX, w.clientY);
      if (!k.some(
        (Fe) => Fe.classList.contains("launcher-site-items") || !!Fe.closest?.(".launcher-site-items")
      )) {
        g.value && (g.value = null), B = "";
        return;
      }
      const A = k.find((Fe) => Fe.classList.contains("launcher-link") && Fe.getAttribute("data-launcher-id") !== String(w.link.id) || Fe.classList.contains("launcher-folder"));
      if (!A) return;
      const ee = A.classList.contains("launcher-link"), ve = ee ? A.getAttribute("data-launcher-id") : null, Ne = ee ? null : A.getAttribute("data-launcher-folder"), ie = ee ? `link-${ve}` : `folder-${Ne}`, se = A.getBoundingClientRect(), Ge = se.left + se.width / 2, ii = se.top + se.height / 2, ro = Math.hypot(w.clientX - Ge, w.clientY - ii), Bt = Date.now();
      if (ro > Math.max(se.width, se.height) * 0.55 || ie === B && Bt - D < 180) return;
      const Ft = oi.value.filter(
        (Fe) => Fe.type !== "link" || String(Fe.link.id) !== String(w.link.id)
      ), ct = [...g.value || Ft], wt = ct.findIndex(
        (Fe) => Fe.type === "link" && String(Fe.link.id) === String(w.link.id)
      ), bt = ct.findIndex((Fe) => Fe.key === ie);
      if (bt < 0) return;
      const Qe = {
        key: `link-${w.link.id}`,
        type: "link",
        link: w.link
      };
      wt >= 0 ? wt !== bt && (ct.splice(wt, 1), ct.splice(bt, 0, Qe), g.value = ct, B = ie, D = Bt) : (ct.splice(bt, 0, Qe), g.value = ct, B = ie, D = Bt);
    }
    async function L(w) {
      if (n.value !== "sites" || pt.isOpen) return !1;
      if (g.value) {
        const k = g.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await Te.moveLinkTo(String(w.id), ae.activePage, "常用网站"), await Te.reorderPageItems(ae.activePage, k), g.value = null, B = "", !0;
      }
      return !1;
    }
    const P = ke({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let pe = null, W = 0, G = 0, R = null, q = null, he = !1;
    function _e(w, k) {
      if (k.button !== 0) return;
      pe = k.pointerId, W = k.clientX, G = k.clientY, y = k.clientX, _ = k.clientY, R = String(w.id), q = null, he = !1;
      const S = k.currentTarget.getBoundingClientRect();
      P.offsetX = k.clientX - S.left, P.offsetY = k.clientY - S.top, P.type = "link", P.link = w, P.folder = null, window.addEventListener("pointermove", ge, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    function Je(w, k, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      pe = S.pointerId, W = S.clientX, G = S.clientY, y = S.clientX, _ = S.clientY, R = null, q = w, he = !1;
      const A = S.currentTarget.getBoundingClientRect();
      P.offsetX = S.clientX - A.left, P.offsetY = S.clientY - A.top, P.type = "folder", P.folder = {
        groupName: w,
        size: Ae(w),
        links: k?.links || []
      }, P.link = null, window.addEventListener("pointermove", ge, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    let F = 0, O = null;
    function z() {
      cancelAnimationFrame(F), F = 0, O = null;
    }
    function ge(w) {
      w.pointerId === pe && (he && w.cancelable && w.preventDefault(), O = w, !F && (F = requestAnimationFrame(() => {
        F = 0;
        const k = O;
        O = null, k && Ce(k);
      })));
    }
    function Ce(w) {
      if (w.pointerId !== pe || !R && !q) return;
      const k = Math.hypot(w.clientX - W, w.clientY - G);
      if (!he && k > Nd && (he = !0, C = !0, R ? m.value = R : q && (x.value = q)), !he) return;
      (P.link || P.folder) && (P.visible = !0, P.x = w.clientX - P.offsetX, P.y = w.clientY - P.offsetY);
      const S = document.elementsFromPoint(w.clientX, w.clientY);
      if (Yi()) {
        const ie = S.some(
          (Ge) => Ge.id === "launcher-folder-dialog" || !!Ge.closest?.("#launcher-folder-dialog")
        ), se = document.querySelector("#launcher-folder-dialog");
        if (ie && se) {
          se.classList.add("drop-hover-valid"), pt.dropHoverValid = !0;
          return;
        } else
          se?.classList.remove("drop-hover-valid"), pt.dropHoverValid = !1;
        g.value = null;
        return;
      }
      const ee = g.value || oi.value, ve = R ? `link-${R}` : `folder-${q}`;
      if (ee.length) {
        const ie = S.find((se) => {
          if (se.classList.contains("launcher-link")) {
            const Ge = se.getAttribute("data-launcher-id");
            return Ge && `link-${Ge}` !== ve;
          }
          if (se.classList.contains("launcher-folder")) {
            const Ge = se.getAttribute("data-launcher-folder");
            return Ge && `folder-${Ge}` !== ve;
          }
          return !1;
        });
        if (ie) {
          const se = ie.classList.contains("launcher-link"), Ge = se ? ie.getAttribute("data-launcher-id") : null, ii = se ? null : ie.getAttribute("data-launcher-folder"), ro = se ? `link-${Ge}` : `folder-${ii}`, Bt = ie.getBoundingClientRect();
          let Ft = !0;
          R && !se && (Od(Bt, w.clientX, w.clientY) ? (Ft = !1, ie.classList.add("drop-target")) : ie.classList.remove("drop-target"));
          const ct = Date.now();
          if (Bd(Bt, w.clientX, w.clientY) || (Ft = !1), ro === T && ct - N < Rd && (Ft = !1), Ft) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Qe) => Qe.classList.remove("drop-target"));
            const wt = ee.findIndex((Qe) => Qe.key === ve), bt = ee.findIndex((Qe) => Qe.key === ro);
            if (wt >= 0 && bt >= 0 && wt !== bt) {
              const Qe = ee.slice(), Fe = Qe.splice(wt, 1)[0];
              Qe.splice(bt, 0, Fe), g.value = Qe, T = ro, N = ct;
            }
          }
        }
      }
      const Ne = S.find((ie) => ie.classList.contains("launcher-page-tab"));
      if (Ne) {
        const ie = Ne.getAttribute("data-page");
        ie && ie !== ae.activePage && Ne.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((ie) => ie.classList.remove("drop-target"));
    }
    async function Ie(w) {
      if (w.pointerId === pe) {
        z(), w.type === "pointercancel" ? me() : Ce(w), window.removeEventListener("pointermove", ge), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
        try {
          if (he) {
            I = Date.now(), C = !1;
            const k = document.elementsFromPoint(w.clientX, w.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((A) => A.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((A) => A.classList.remove("drop-target")), Yi() && pt.activeFolder) {
              if (k.some(
                (ee) => ee.id === "launcher-folder-dialog" || !!ee.closest?.("#launcher-folder-dialog")
              )) {
                const ve = k.find((Ne) => Ne.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || pt.activeFolder;
                R ? await Te.moveLinkTo(R, void 0, ve) : q && await Te.moveFolderInto(q, ve);
              }
              return;
            }
            const S = k.find((A) => A.classList.contains("launcher-page-tab"));
            if (S) {
              const A = S.getAttribute("data-page");
              if (A) {
                R ? (await Te.moveLinkTo(R, A, "常用网站"), await Te.setPage(A)) : q && await Te.moveFolderToPage(q, A), me();
                return;
              }
            }
            if (R) {
              const A = k.find((ee) => ee.classList.contains("launcher-folder"));
              if (A) {
                const ee = A.getAttribute("data-launcher-folder");
                if (ee) {
                  await Te.moveLinkTo(R, ae.activePage, ee), me();
                  return;
                }
              }
            }
            if (g.value) {
              const A = g.value.map((ee) => ({
                type: ee.type,
                id: ee.type === "link" ? String(ee.link.id) : void 0,
                groupName: ee.type === "folder" ? ee.folder.groupName : void 0
              }));
              await Te.reorderPageItems(ae.activePage, A);
            }
          }
        } catch (k) {
          ye.show({ appName: "常用网站", title: "移动未完成", message: k instanceof Error ? k.message : "请刷新核对，未自动重试。" });
        } finally {
          me();
        }
      }
    }
    function me() {
      z(), pe = null, R = null, q = null, he = !1, C = !1, m.value = null, x.value = null, g.value = null, P.visible = !1, P.link = null, P.folder = null, T = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), pt.dropHoverValid = !1, window.removeEventListener("pointermove", ge), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    }
    St(() => {
      Oe.setExternalDragHandler(null), Oe.setExternalDropHandler(null), me(), window.removeEventListener("blur", c), window.removeEventListener("pagehide", c), document.removeEventListener("visibilitychange", c), window.removeEventListener("pointermove", ge), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    });
    function We(w) {
      const k = ae.pageLabels;
      return k && k[w] ? k[w] : w || "常用网站";
    }
    function Ze(w, k) {
      const S = String(w.page || "").trim(), A = String(k).trim(), ee = ae.pageLabels || {}, ve = !S || S === "常用网站" || S === "默认";
      if (!A || A === "常用网站" || A === "默认") return ve;
      if (ve) return !1;
      if (S === A) return !0;
      const ie = ee[S] || S, se = ee[A] || A;
      return ie === se || S === se || ie === A;
    }
    function Ae(w) {
      const k = ae.groupSizes;
      return k && k[w] === "large" ? "large" : "small";
    }
    function is(w) {
      return w === "large" ? 9 : 4;
    }
    function ns(w, k) {
      const S = is(k), A = w.length > S ? S - 1 : S;
      return w.slice(0, A);
    }
    const oi = oe(() => {
      const w = ae.activePage || "常用网站", S = ae.links.filter(
        (ie) => Ze(ie, w)
      ), A = /* @__PURE__ */ new Map();
      S.forEach((ie) => {
        const se = ie.group || "常用网站";
        se !== "常用网站" && (A.has(se) || A.set(se, []), A.get(se).push(ie));
      });
      const ee = /* @__PURE__ */ new Set(), ve = [];
      S.forEach((ie) => {
        const se = ie.group || "常用网站";
        Ji(ae.folders, se) || (se === "常用网站" ? ve.push({ key: `link-${ie.id}`, type: "link", link: ie }) : ee.has(se) || (ee.add(se), ve.push({
          key: `folder-${se}`,
          type: "folder",
          folder: {
            groupName: se,
            pageName: w,
            links: A.get(se) || []
          }
        })));
      });
      const Ne = ae.folders;
      return Ne && Object.entries(Ne).forEach(([ie, se]) => {
        if (Ji(ae.folders, ie)) return;
        const Ge = se?.page || "常用网站";
        (Ge === w || w === "常用网站" && Ge === "默认") && !ee.has(ie) && (ee.add(ie), ve.push({
          key: `folder-${ie}`,
          type: "folder",
          folder: {
            groupName: ie,
            pageName: w,
            links: A.get(ie) || []
          }
        }));
      }), ve;
    }), Ki = oe(() => g.value && g.value.length ? g.value : oi.value), ss = oe(() => {
      const w = ae.activePage || "常用网站", k = We(w);
      return k === "默认" || w === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${k}”还是空的，把网站拖到这里。`;
    });
    function Vi(w) {
      g.value = null, m.value = null, x.value = null, Oe.switchPage(w);
    }
    function as() {
      h.value = !0, b.value = "", vt(() => {
        M.value?.focus();
      });
    }
    function Ui() {
      if (!h.value) return;
      const w = b.value.trim();
      h.value = !1, w && Oe.addPage(w);
    }
    function rs(w) {
      w.key === "Enter" ? (w.preventDefault(), Ui()) : w.key === "Escape" && (h.value = !1);
    }
    function ls(w, k) {
      Oe.openPageMenu(w, k);
    }
    function cs(w) {
      const k = w.target;
      if (!k || k.closest(".launcher-link") || k.closest(".launcher-folder") || k.closest(".launcher-page-tab") || k.closest("button") || k.closest("input"))
        return;
      w.preventDefault();
      const S = ae.activePage || "常用网站";
      Bi.openBlankMenu(S, w.clientX, w.clientY);
    }
    function ds(w) {
      n.value === "sites" && (!w.shiftKey || ae.pages.length < 2 || (w.preventDefault(), w.deltaY > 0 || w.deltaX > 0 ? Oe.nextPage() : Oe.prevPage()));
    }
    function us(w) {
      w.target.closest(".launcher-page-tab") || w.stopPropagation();
    }
    function ps(w) {
      w.button === 0 && (y = w.clientX, _ = w.clientY);
    }
    function hs(w, k) {
      if (k.preventDefault(), k.stopPropagation(), ze.isEditingShortcuts) {
        ze.handleLinkSelection(w);
        return;
      }
      pe || (C = !1), !(Math.hypot(k.clientX - y, k.clientY - _) >= 6 || C || Date.now() - I < 600) && Oe.openLink(w, k);
    }
    function fs(w, k) {
      Oe.openLinkMenu(w, k);
    }
    function gs(w, k) {
      if (pe || (C = !1), C || Date.now() - I < 450) {
        k.preventDefault(), k.stopPropagation();
        return;
      }
      Oe.openFolder(w, k);
    }
    function ms(w, k, S) {
      Oe.openFolderMenu(w, k, S);
    }
    function vs(w) {
      Oe.deleteFolder(w);
    }
    function ys(w, k) {
      const S = Array.from(k.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      k.preventDefault(), k.dataTransfer && (k.dataTransfer.dropEffect = "move"), ae.activePage !== w && Vi(w), k.currentTarget?.classList.add("drop-target");
    }
    function ws(w) {
      w.currentTarget?.classList.remove("drop-target");
    }
    async function bs(w, k) {
      k.currentTarget?.classList.remove("drop-target");
      let A = "";
      const ee = k.dataTransfer?.getData("application/x-newtab-launcher");
      if (ee)
        try {
          A = String(JSON.parse(ee)?.id || "");
        } catch {
        }
      if (!A && (m.value || window.__activeLauncherLink) && (A = String(window.__activeLauncherLink?.id || m.value || "")), A) {
        k.preventDefault(), k.stopPropagation(), await Te.moveLinkTo(A, w, "常用网站"), await Te.setPage(w);
        return;
      }
      const ve = window;
      typeof ve.importDroppedLauncherItem == "function" && (k.preventDefault(), k.stopPropagation(), await ve.importDroppedLauncherItem(k, "常用网站", w));
    }
    function ks(w) {
      const k = Array.from(w.dataTransfer?.types || []);
      if (!k.includes("application/x-newtab-launcher") && !k.includes("application/x-newtab-bookmark") && !k.includes("text/uri-list") && !k.includes("text/plain")) return;
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = k.includes("application/x-newtab-launcher") ? "move" : "copy"), w.currentTarget?.classList.add("drop-target");
    }
    function _s(w) {
      const k = w.currentTarget;
      k?.contains(w.relatedTarget) || k?.classList.remove("drop-target");
    }
    async function Cs(w) {
      w.currentTarget?.classList.remove("drop-target");
      let S = "";
      const A = w.dataTransfer?.getData("application/x-newtab-launcher");
      if (A)
        try {
          S = String(JSON.parse(A)?.id || "");
        } catch {
        }
      if (!S && (m.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || m.value || "")), S) {
        w.preventDefault(), w.stopPropagation(), await Te.moveLinkTo(S, ae.activePage, "常用网站");
        return;
      }
      const ee = window;
      if (typeof ee.importDroppedLauncherItem == "function") {
        w.preventDefault(), w.stopPropagation(), await ee.importDroppedLauncherItem(w, "常用网站", ae.activePage);
        return;
      }
      const ve = w.dataTransfer?.getData("text/plain");
      ve && /^https?:\/\//i.test(ve.trim()) && (w.preventDefault(), w.stopPropagation(), await Te.addLink({
        title: "",
        url: ve.trim(),
        page: ae.activePage
      }));
    }
    function Yi() {
      if (!pt.isOpen) return !1;
      if (typeof document < "u") {
        const w = document.querySelector("#launcher-folder-dialog");
        return !!(w && w.open);
      }
      return !1;
    }
    function xs(w, k) {
      k.preventDefault();
    }
    function Ls(w) {
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), w.currentTarget?.classList.add("drop-target");
    }
    function $s(w) {
      w.currentTarget?.classList.remove("drop-target");
    }
    async function Ts(w, k) {
      k.currentTarget?.classList.remove("drop-target"), k.preventDefault(), k.stopPropagation();
      const A = k.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (A && A !== w) {
        try {
          await Te.moveFolderInto(A, w);
        } catch (Ne) {
          ye.show({ appName: "常用网站", title: "移动未完成", message: Ne instanceof Error ? Ne.message : "请刷新后核对。" });
        }
        return;
      }
      let ee = "";
      const ve = k.dataTransfer?.getData("application/x-newtab-launcher");
      if (ve)
        try {
          ee = String(JSON.parse(ve)?.id || "");
        } catch {
        }
      !ee && (m.value || window.__activeLauncherLink) && (ee = String(window.__activeLauncherLink?.id || m.value || "")), ee && await Te.moveLinkTo(ee, ae.activePage, w);
    }
    return (w, k) => (r(), p(Y, null, [
      s(ae).showSites ? (r(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: ds
      }, [
        i("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: k[5] || (k[5] = H(() => {
          }, ["stop"])),
          onContextmenu: us
        }, [
          i("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": s(l)("home.sites.switchAria")
          }, [
            i("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": n.value === "sites",
              onClick: k[0] || (k[0] = (S) => n.value = "sites")
            }, u(s(l)("home.sites.favoriteSites")), 9, lu),
            i("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": n.value === "bookmarks",
              onClick: k[1] || (k[1] = (S) => n.value = "bookmarks")
            }, u(s(l)("home.sites.bookmarks")), 9, cu)
          ], 8, ru),
          je(i("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(l)("home.sites.pagesAria")
          }, [
            (r(!0), p(Y, null, fe(s(ae).pages, (S) => (r(), p("button", {
              key: S,
              type: "button",
              class: re(["launcher-page-tab", { active: S === s(ae).activePage }]),
              "data-page": S,
              role: "tab",
              title: s(l)("home.sites.pageTabTitle", { label: We(S) }),
              onPointerdown: k[2] || (k[2] = H(() => {
              }, ["stop"])),
              onClick: H((A) => Vi(S), ["prevent", "stop"]),
              onContextmenu: H((A) => ls(S, A), ["prevent", "stop"]),
              onDragover: (A) => ys(S, A),
              onDragleave: k[3] || (k[3] = (A) => ws(A)),
              onDrop: (A) => bs(S, A)
            }, u(We(S)), 43, uu))), 128)),
            h.value ? je((r(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: M,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": k[4] || (k[4] = (S) => b.value = S),
              onKeydown: rs,
              onBlur: Ui
            }, null, 544)), [
              [oo, b.value]
            ]) : (r(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: as
            }, " + "))
          ], 8, du), [
            [io, n.value === "sites"]
          ]),
          n.value === "bookmarks" ? (r(), p("div", pu)) : E("", !0),
          i("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: v
          }, " ? ")
        ], 32),
        n.value === "bookmarks" ? (r(), le(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: k[6] || (k[6] = (S) => a.value = S)
        })) : E("", !0),
        je(i("div", {
          class: "launcher-page-panel",
          "data-page": s(ae).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: cs,
          onDragover: k[12] || (k[12] = (S) => ks(S)),
          onDragleave: k[13] || (k[13] = (S) => _s(S)),
          onDrop: k[14] || (k[14] = (S) => Cs(S))
        }, [
          (r(), le(Go, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(ae).activePage,
            name: m.value || x.value ? "launcher-grid" : ""
          }, {
            default: to(() => [
              (r(!0), p(Y, null, fe(Ki.value, (S) => (r(), p(Y, {
                key: S.key
              }, [
                S.type === "link" ? (r(), p("a", {
                  key: S.key,
                  class: re(["launcher-link", {
                    "is-dragging": m.value === String(S.link.id),
                    "is-wheel-picked": s(ze).isEditingShortcuts && s(ze).isLinkInWheel(S.link.url)
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: k[7] || (k[7] = H(() => {
                  }, ["prevent"])),
                  onPointerdown: (A) => _e(S.link, A),
                  onMousedown: k[8] || (k[8] = (A) => ps(A)),
                  onClick: H((A) => hs(S.link, A), ["prevent"]),
                  onContextmenu: H((A) => fs(S.link, A), ["prevent"])
                }, [
                  J(mn, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, fu)) : S.type === "folder" ? (r(), p("div", {
                  key: S.key,
                  class: re(["launcher-folder", [
                    `size-${Ae(S.folder.groupName)}`,
                    { "is-dragging": x.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (A) => Je(S.folder.groupName, S.folder, A),
                  onDragstart: (A) => xs(S.folder.groupName, A),
                  onDragover: k[10] || (k[10] = (A) => Ls(A)),
                  onDragleave: k[11] || (k[11] = (A) => $s(A)),
                  onDrop: (A) => Ts(S.folder.groupName, A),
                  onClick: (A) => gs(S.folder.groupName, A),
                  onContextmenu: H((A) => ms(S.folder.groupName, S.folder.pageName, A), ["prevent"])
                }, [
                  J(mn, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: Ae(S.folder.groupName)
                  }, {
                    default: to(() => [
                      i("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: k[9] || (k[9] = H(() => {
                        }, ["stop"])),
                        onClick: H((A) => vs(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, mu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  i("span", vu, u(S.folder.links.length), 1)
                ], 42, gu)) : E("", !0)
              ], 64))), 128)),
              Ki.value.length ? E("", !0) : (r(), p("p", yu, u(ss.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, hu), [
          [io, n.value === "sites"]
        ])
      ], 32)) : E("", !0),
      s(ae).hasTodo || s(ae).hasBili ? (r(), p("div", wu, [
        s(ae).hasTodo ? (r(), le(au, { key: 0 })) : s(ae).hasBili ? (r(), p("div", bu)) : E("", !0)
      ])) : E("", !0),
      (r(), le(yt, { to: "body" }, [
        P.visible ? (r(), p("div", {
          key: 0,
          class: re(["launcher-drag-ghost", [
            P.type === "folder" ? `folder-ghost size-${P.folder?.size}` : "link-ghost"
          ]]),
          style: be({
            left: `${P.x}px`,
            top: `${P.y}px`
          })
        }, [
          P.type === "folder" && P.folder ? (r(), p(Y, { key: 0 }, [
            i("div", ku, [
              (r(!0), p(Y, null, fe(ns(P.folder.links, P.folder.size), (S, A) => (r(), le(Xo, {
                key: S.id || A,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            i("span", _u, u(P.folder.groupName), 1)
          ], 64)) : P.link ? (r(), p(Y, { key: 1 }, [
            J(Xo, {
              link: P.link
            }, null, 8, ["link"]),
            i("span", Cu, u(P.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      J(s(o), {
        open: d.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), es = /* @__PURE__ */ Me(xu, [["__scopeId", "data-v-63287e7b"]]), zo = Object.keys(ao);
let No = !1, bi = 0, mo, ki;
function yn(e) {
  for (const t of zo)
    Object.prototype.hasOwnProperty.call(e, t) && (ao[t] = e[t] !== !1);
}
function Lu() {
  const e = ao;
  Oe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || Jo.close();
}
const wn = {
  start() {
    if (No) return;
    No = !0;
    const e = ++bi;
    ki = Be(() => zo.map((o) => ao[o]), Lu, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    mo = (o, n) => {
      if (n !== "local") return;
      const a = {};
      for (const d of zo) o[d] && (a[d] = o[d].newValue);
      yn(a);
    }, t?.storage?.onChanged?.addListener(mo), t?.storage?.local && t.storage.local.get(zo).then((o) => {
      No && bi === e && yn(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    No = !1, bi++, ki?.(), ki = void 0, mo && globalThis.chrome?.storage?.onChanged?.removeListener(mo), mo = void 0;
  }
}, $u = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Tu = { class: "launcher-inner" }, Su = { class: "launcher-overview" }, Iu = ["title"], Mu = { class: "card-head" }, Du = { id: "wx-title" }, Au = { id: "weather-body" }, Eu = { class: "launcher-center" }, Pu = {
  class: "hero-clock",
  id: "hero-clock"
}, Wu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Nu = { class: "card-head" }, Ru = ["title"], Ou = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Bu = /* @__PURE__ */ ce({
  __name: "AppLauncher",
  setup(e) {
    Ve(() => {
      Ko.initWallpaper();
    });
    function t() {
      De.handleToolClick("music");
    }
    return (o, n) => (r(), p("section", $u, [
      n[4] || (n[4] = i("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      i("div", Tu, [
        i("div", Su, [
          je(i("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: s(l)("weather.widgetSwitchTip")
          }, [
            i("header", Mu, [
              n[1] || (n[1] = i("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              i("h2", Du, u(s(l)("weather.widgetTitle")), 1)
            ]),
            i("div", Au, [
              J(Jn)
            ])
          ], 8, Iu), [
            [io, s(ao).showWeather]
          ]),
          i("div", Eu, [
            i("div", Pu, [
              J(Xc),
              J(Zn)
            ]),
            i("form", {
              id: "search",
              class: "search",
              onSubmit: n[0] || (n[0] = H(() => {
              }, ["prevent"]))
            }, [
              J(Cn)
            ], 32)
          ]),
          i("section", Wu, [
            i("header", Nu, [
              n[2] || (n[2] = i("span", { class: "bar music-purple" }, null, -1)),
              i("h2", null, u(s(l)("home.music.player")), 1),
              n[3] || (n[3] = i("span", { class: "grow" }, null, -1)),
              i("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: s(l)("home.music.openNeteaseTip"),
                onClick: t
              }, u(s(l)("home.music.openNetease")), 9, Ru)
            ]),
            i("div", Ou, [
              J(Qn)
            ])
          ])
        ]),
        i("div", {
          id: "launcher-groups",
          class: re(["launcher-groups", { "has-sites": s(ae).showSites, "has-todoist": s(ae).hasTodo, "has-bili": s(ae).hasBili, "has-media": s(ae).hasTodo || s(ae).hasBili }])
        }, [
          J(es)
        ], 2)
      ]),
      n[5] || (n[5] = i("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ]));
  }
}), eo = ke(/* @__PURE__ */ new Set()), Dt = ke({}), qe = ke({});
function _i(e) {
  const t = Xe(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return ye.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Pe = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Xe(e);
    return t ? t.lifecycle.isVisible() : ri(e) ? !!ra[e] : la(e);
  },
  // 标记应用启动
  markRunning(e) {
    eo.add(e), (e in qe || Xe(e)) && (qe[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Dt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Xe(e);
    if (t) {
      De.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), ri(e)) {
      Qi.open(e);
      return;
    }
    De.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (eo.delete(e), Xe(e)) {
      De.close(e);
      return;
    }
    if (ri(e)) {
      Qi.close(e);
      return;
    }
    De.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Xe(e)) {
      const a = _i(e);
      if (!a.ok) return a;
      const d = Xe(e)?.lifecycle.beforeQuit;
      if (d) {
        const c = Mt(e);
        try {
          await d();
        } catch {
          const b = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return ye.show({ appName: Xe(e).title, title: "未退出", message: b, showActions: !1 }), { ok: !1, error: b };
        }
        if (Mt(e) !== c) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = _i(e);
        if (!h.ok) return h;
      }
      const v = De.close(e), f = Mt(e);
      return eo.delete(e), qe[e] = !1, ft.removeActiveTool(e), await v, await vt(), Mt(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), eo.delete(e), ft.removeActiveTool(e), e in qe && (qe[e] = !1);
    const t = aa;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const n = t.activeTools.indexOf(e);
    n >= 0 && t.activeTools.splice(n, 1), De.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Xe(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = _i(e);
      if (!o.ok) return o;
      const n = De.close(e), a = Mt(e);
      return await n, Mt(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (qe[e] = !1, await vt(), Mt(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Dt[e] = (Dt[e] || 0) + 1, De.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in qe ? (qe[e] = !1, await vt(), Dt[e] = (Dt[e] || 0) + 1, qe[e] = !0) : Dt[e] = (Dt[e] || 0) + 1, await vt(), this.openApp(e);
  }
}, zt = /* @__PURE__ */ ce({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Xe(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const n = o;
    n.mountPolicy === "workspace-ready" && Pe.markRunning(n.id), Be(n.lifecycle.isVisible, (h) => {
      h && Pe.markRunning(n.id);
    }, { immediate: !0, flush: "sync" });
    const a = oe(() => !!qe[n.id]);
    function d() {
      try {
        n.lifecycle.hide();
      } catch {
      }
      (xt.activeId === n.id || xt.activeId === n.rootId) && (xt.activeId = null), Pe.hideApp(n.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function v() {
      Pe.reloadApp(n.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const c = K({
      loader: n.loadView,
      onError(h, b, M, m) {
        m <= 2 ? b() : M();
      },
      errorComponent: ce({
        setup: () => () => n.lifecycle.isVisible() ? He("section", { class: "card wide card-fullscreen", role: "alert" }, [
          He("h2", n.title),
          He("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          He("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            He("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: f
            }, "⟳ 刷新标签页 (加载最新版)"),
            He("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: v
            }, "↻ 重新加载模块"),
            He("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: d
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return so(() => {
      d(), eo.delete(n.id), delete qe[n.id];
    }), (h, b) => a.value ? (r(), le($n(s(c)), {
      key: s(Pe).getRenderKey(s(n).id)
    })) : E("", !0);
  }
}), Fu = { class: "logicweaver-workspaces-layer" }, Hu = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, ju = { id: "vue-todoist-root" }, zu = { id: "vue-bili-favorites-root" }, Gu = { id: "vue-youtube-root" }, Ku = { id: "vue-pricing-root" }, Vu = { id: "vue-aihot-root" }, Uu = /* @__PURE__ */ ce({
  __name: "AppWorkspaces",
  setup(e) {
    const t = j(!!xt.activeId);
    return Ve(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, n) => (r(), p("div", Fu, [
      t.value ? (r(), p("main", Hu, [
        i("div", ju, [
          J(zt, { id: "todoist" })
        ]),
        i("div", zu, [
          J(zt, { id: "daily-bilibili" })
        ]),
        je(i("div", Gu, [
          J(zt, { id: "daily-youtube" })
        ], 512), [
          [io, s(ao).showYouTube]
        ]),
        i("div", Ku, [
          J(zt, { id: "daily-pricing" })
        ]),
        i("div", Vu, [
          J(zt, { id: "daily-aihot" })
        ]),
        J(zt, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), Yu = ["aria-label"], qu = { class: "dock-menu-head" }, Xu = { class: "dock-menu-title" }, Ju = ["src", "alt"], Zu = {
  key: 1,
  class: "dock-menu-emoji"
}, Qu = { class: "dock-menu-text" }, ep = { class: "dock-menu-text" }, tp = { class: "dock-menu-text" }, op = /* @__PURE__ */ ce({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, n = t, a = oe(() => !o.target || o.target.type !== "tool" ? !1 : Pe.isRunning(o.target.id)), d = oe(() => !o.target || o.target.type !== "tool" ? !1 : Pe.isVisible(o.target.id)), { menuRef: v, style: f } = Nn({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Ut.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => n("close")
    });
    function c() {
      o.target && (Pe.openApp(o.target.id), n("close"));
    }
    function h() {
      o.target && (Pe.hideApp(o.target.id), n("close"));
    }
    async function b() {
      o.target && (await Pe.reloadApp(o.target.id), n("close"));
    }
    async function M() {
      if (!o.target) return;
      const g = o.target;
      if ((await Pe.quitApp(g.id))?.ok === !1) {
        n("close");
        return;
      }
      ye.show({
        appName: g.title,
        title: l("dock.quitDone"),
        subtitle: l("dock.quitSubtitle"),
        icon: g.icon || "assets/logo.png",
        duration: 2800
      }), n("close");
    }
    async function m() {
      if (!o.target) return;
      const g = o.target, C = xo.uninstall(g.id);
      n("close"), await C || ye.show({
        appName: g.title,
        title: "入口停用未确认",
        subtitle: xo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: g.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function x() {
      if (!o.target) return;
      const C = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(C, "_blank"), n("close");
    }
    return (g, C) => (r(), le(yt, { to: "body" }, [
      e.target ? (r(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: v,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: be(s(f)),
        onClick: C[1] || (C[1] = H(() => {
        }, ["stop"])),
        onContextmenu: C[2] || (C[2] = H(() => {
        }, ["prevent"]))
      }, [
        i("div", qu, [
          i("div", Xu, [
            e.target.icon ? (r(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Ju)) : e.target.emoji ? (r(), p("span", Zu, u(e.target.emoji), 1)) : E("", !0),
            i("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (r(), p("span", {
            key: 0,
            class: re(["dock-status-tag", { "is-running": a.value }])
          }, [
            C[3] || (C[3] = i("span", { class: "dock-status-dot" }, null, -1)),
            Ye(" " + u(a.value ? s(l)("dock.menu.running") : s(l)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        C[12] || (C[12] = i("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (r(), p(Y, { key: 0 }, [
          d.value ? (r(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            C[5] || (C[5] = i("span", { class: "dock-menu-symbol" }, "−", -1)),
            i("span", null, u(s(l)("dock.menu.hideWindow")), 1)
          ])) : (r(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: c
          }, [
            C[4] || (C[4] = i("span", { class: "dock-menu-symbol" }, "↗", -1)),
            i("span", null, u(s(l)("dock.menu.openWindow")), 1)
          ])),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: b
          }, [
            C[6] || (C[6] = i("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            i("div", Qu, [
              i("span", null, u(s(l)("dock.menu.reloadApp")), 1),
              i("small", null, u(s(l)("dock.menu.reloadSub")), 1)
            ])
          ]),
          C[9] || (C[9] = i("div", { class: "dock-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [
            C[7] || (C[7] = i("span", { class: "dock-menu-symbol" }, "📌", -1)),
            i("div", ep, [
              i("span", null, u(s(l)("dock.menu.removeFromDock")), 1),
              i("small", null, u(s(l)("dock.menu.removeSub")), 1)
            ])
          ]),
          i("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: M
          }, [
            C[8] || (C[8] = i("span", { class: "dock-menu-symbol" }, "✕", -1)),
            i("div", tp, [
              i("span", null, u(s(l)("dock.menu.quitApp")), 1),
              i("small", null, u(s(l)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (r(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: x
        }, [
          C[10] || (C[10] = i("span", { class: "dock-menu-symbol" }, "↗", -1)),
          i("span", null, u(s(l)("dock.menu.openOfficial")), 1)
        ])) : (r(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: C[0] || (C[0] = (I) => n("close"))
        }, [...C[11] || (C[11] = [
          i("span", { class: "dock-menu-symbol" }, "🏠", -1),
          i("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Yu)) : E("", !0)
    ]));
  }
}), ip = /* @__PURE__ */ Me(op, [["__scopeId", "data-v-3973d271"]]), np = { class: "mac-dock-shelf" }, sp = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], ap = ["src", "alt"], rp = {
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
}, yp = /* @__PURE__ */ ce({
  __name: "MacDock",
  setup(e) {
    const t = oe(() => Ut), o = j(null), n = oe(() => Object.fromEntries(Ut.tools.map((W) => {
      const G = Xe(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(G) ? Math.max(0, Math.floor(G)) : 0];
    })));
    function a(W) {
      W.stopPropagation(), o.value = null, M(W.currentTarget), xo.open();
    }
    function d(W, G) {
      G.stopPropagation(), o.value = null, M(G.currentTarget), ft.triggerItem("target", W);
    }
    function v(W, G) {
      const q = G.currentTarget.getBoundingClientRect(), he = Ut.position, _e = he === "left" || he === "right";
      o.value = {
        type: "card",
        id: W.id,
        title: W.title,
        icon: W.icon,
        x: _e ? he === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: _e ? q.top + q.height / 2 : he === "top" ? q.bottom + 8 : q.top
      };
    }
    function f(W) {
      W.stopPropagation(), o.value = null, M(W.currentTarget), ft.triggerItem("home", "home-launcher");
    }
    function c(W, G) {
      G.stopPropagation(), o.value = null, M(G.currentTarget), Xe(W) || Pe.markRunning(W), ft.triggerItem("tool", W);
    }
    function h(W, G) {
      const q = G.currentTarget.getBoundingClientRect(), he = Ut.position, _e = he === "left" || he === "right";
      o.value = {
        type: "tool",
        id: W.id,
        title: W.title,
        icon: W.icon,
        emoji: W.emoji,
        x: _e ? he === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: _e ? q.top + q.height / 2 : he === "top" ? q.bottom + 8 : q.top
      };
    }
    const b = /* @__PURE__ */ new Map();
    function M(W) {
      if (!W || (b.get(W)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const G = W.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      b.set(W, G);
      const R = () => {
        b.get(W) === G && b.delete(W);
      };
      G.onfinish = R, G.oncancel = R;
    }
    const m = j(null), x = ke({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), g = j(null), C = j(null), I = oe(() => g.value || t.value.cards), y = oe(() => C.value || t.value.tools);
    let _ = "", T = 0, N = !1, B = 0;
    function D(W, G, R) {
      if (R.button !== 0 || R.target.closest(".mac-dock-market-btn")) return;
      const _e = R.currentTarget.getBoundingClientRect();
      N = !1, m.value = {
        type: W,
        id: G.id,
        item: G,
        startX: R.clientX,
        startY: R.clientY,
        initialLeft: _e.left,
        initialTop: _e.top,
        width: _e.width,
        height: _e.height
      }, window.addEventListener("pointermove", $), window.addEventListener("pointerup", L), window.addEventListener("pointercancel", L);
    }
    function $(W) {
      if (!m.value) return;
      const G = W.clientX - m.value.startX, R = W.clientY - m.value.startY, q = Math.hypot(G, R);
      if (!N && q > 5 && (N = !0, x.visible = !0, x.item = m.value.item, x.type = m.value.type, x.width = m.value.width, x.height = m.value.height, m.value.type === "card" ? g.value = [...t.value.cards] : C.value = [...t.value.tools]), !N) return;
      x.x = W.clientX - x.width / 2, x.y = W.clientY - x.height / 2;
      const _e = document.elementsFromPoint(W.clientX, W.clientY).find(
        (Ce) => Ce.classList.contains("mac-dock-item") && !Ce.classList.contains("mac-dock-market-btn")
      );
      if (!_e) return;
      const Je = _e.getAttribute("data-dock-target"), F = _e.getAttribute("data-dock-tool"), O = m.value.type, z = m.value.id, ge = Date.now();
      if (O === "card" && Je && Je !== z && Je !== "home-launcher") {
        const Ce = _e.getBoundingClientRect(), Ie = Ce.left + Ce.width / 2;
        if (Math.abs(W.clientX - Ie) > Ce.width * 0.55 || Je === _ && ge - T < 180) return;
        const me = [...g.value || t.value.cards], We = me.findIndex((Ae) => Ae.id === z), Ze = me.findIndex((Ae) => Ae.id === Je);
        if (We >= 0 && Ze >= 0 && We !== Ze) {
          const Ae = me.splice(We, 1)[0];
          me.splice(Ze, 0, Ae), g.value = me, _ = Je, T = ge;
        }
      } else if (O === "tool" && F && F !== z) {
        const Ce = _e.getBoundingClientRect(), Ie = Ce.left + Ce.width / 2;
        if (Math.abs(W.clientX - Ie) > Ce.width * 0.55 || F === _ && ge - T < 180) return;
        const me = [...C.value || t.value.tools], We = me.findIndex((Ae) => Ae.id === z), Ze = me.findIndex((Ae) => Ae.id === F);
        if (We >= 0 && Ze >= 0 && We !== Ze) {
          const Ae = me.splice(We, 1)[0];
          me.splice(Ze, 0, Ae), C.value = me, _ = F, T = ge;
        }
      }
    }
    function L() {
      window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", L), window.removeEventListener("pointercancel", L), N && m.value && (B = Date.now() + 250, m.value.type === "card" && g.value ? ft.reorderCards(g.value.map((W) => W.id)) : m.value.type === "tool" && C.value && ft.reorderTools(C.value.map((W) => W.id))), x.visible = !1, x.item = null, g.value = null, C.value = null, m.value = null, N = !1, _ = "";
    }
    function P(W, G) {
      Date.now() < B || d(W, G);
    }
    function pe(W, G) {
      Date.now() < B || c(W, G);
    }
    return so(() => {
      for (const W of b.values()) W.cancel();
      b.clear(), window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", L), window.removeEventListener("pointercancel", L);
    }), (W, G) => (r(), p(Y, null, [
      i("div", np, [
        J(Go, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: to(() => [
            (r(!0), p(Y, null, fe(I.value, (R) => (r(), p("button", {
              key: R.id,
              class: re(["mac-dock-item", {
                "is-active": t.value.activeTargetId === R.id,
                "is-drag-origin": m.value && m.value.id === R.id
              }]),
              type: "button",
              "data-dock-target": R.id,
              title: R.title,
              onPointerdown: (q) => D("card", R, q),
              onClick: H((q) => P(R.id, q), ["stop"]),
              onContextmenu: H((q) => v(R, q), ["prevent"])
            }, [
              i("img", {
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, ap),
              t.value.activeTargetId === R.id ? (r(), p("span", rp)) : E("", !0)
            ], 42, sp))), 128))
          ]),
          _: 1
        }),
        G[4] || (G[4] = i("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        i("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: s(l)("dock.home"),
          onClick: G[0] || (G[0] = H((R) => f(R), ["stop"]))
        }, [
          i("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(l)("dock.home")
          }, null, 8, cp)
        ], 8, lp),
        G[5] || (G[5] = i("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        J(Go, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: to(() => [
            (r(!0), p(Y, null, fe(y.value, (R) => (r(), p("button", {
              key: R.id,
              class: re(["mac-dock-item", {
                "is-active": s(Pe).isRunning(R.id),
                "is-drag-origin": m.value && m.value.id === R.id
              }]),
              type: "button",
              "data-dock-tool": R.id,
              title: R.title,
              onPointerdown: (q) => D("tool", R, q),
              onClick: H((q) => pe(R.id, q), ["stop"]),
              onContextmenu: H((q) => h(R, q), ["prevent"])
            }, [
              R.icon ? (r(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, up)) : R.emoji ? (r(), p("span", pp, u(R.emoji), 1)) : E("", !0),
              s(Pe).isRunning(R.id) ? (r(), p("span", hp)) : E("", !0),
              n.value[R.id] > 0 ? (r(), p("span", fp, u(n.value[R.id] > 99 ? "99+" : n.value[R.id]), 1)) : E("", !0)
            ], 42, dp))), 128))
          ]),
          _: 1
        }),
        i("button", {
          class: re(["mac-dock-item mac-dock-market-btn", { "is-active": s(xo).state.isOpen }]),
          type: "button",
          title: s(l)("dock.market"),
          onClick: G[1] || (G[1] = H((R) => a(R), ["stop"]))
        }, [...G[3] || (G[3] = [
          i("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, gp)
      ]),
      (r(), le(yt, { to: "body" }, [
        x.visible && x.item ? (r(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: be({
            width: x.width + "px",
            height: x.height + "px",
            transform: "translate3d(" + x.x + "px," + x.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          x.item.icon ? (r(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: x.item.icon,
            alt: ""
          }, null, 8, mp)) : x.item.emoji ? (r(), p("span", vp, u(x.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      J(ip, {
        target: o.value,
        onClose: G[2] || (G[2] = (R) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), ts = /* @__PURE__ */ Me(yp, [["__scopeId", "data-v-b7c583e6"]]), wp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, bp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], kp = { class: "win-toast-head" }, _p = ["src"], Cp = { class: "win-toast-app" }, xp = { class: "win-toast-time" }, Lp = ["title", "aria-label", "onClick"], $p = ["onClick"], Tp = { class: "win-toast-title" }, Sp = {
  key: 0,
  class: "win-toast-subtitle"
}, Ip = {
  key: 1,
  class: "win-toast-snippet"
}, Mp = {
  key: 0,
  class: "win-toast-actions"
}, Dp = ["onClick"], Ap = ["onClick"], Ep = /* @__PURE__ */ ce({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = j({}), d = j({});
    let v = null;
    function f(g) {
      const C = t.get(g);
      C !== void 0 && clearTimeout(C), t.delete(g);
    }
    function c(g, C = g.duration) {
      f(g.id), n.set(g.id, C), o.set(g.id, Date.now()), d.value[g.id] = !1, a.value[g.id] = Math.max(0, Math.min(100, C / g.duration * 100)), vt(() => requestAnimationFrame(() => {
        a.value[g.id] = 0;
      })), t.set(g.id, window.setTimeout(() => {
        t.delete(g.id), ye.close(g.id);
      }, C));
    }
    function h(g) {
      f(g.id);
      const C = Date.now() - (o.get(g.id) || Date.now()), I = Math.max(0, (n.get(g.id) ?? g.duration) - C);
      n.set(g.id, I), d.value[g.id] = !0, a.value[g.id] = Math.max(0, Math.min(100, I / g.duration * 100));
    }
    function b(g) {
      c(g, Math.max(1500, n.get(g.id) ?? g.duration));
    }
    function M(g) {
      f(g.id), ye.close(g.id);
    }
    function m(g) {
      if ($t.markRead(g.id), M(g), !g.onClick) {
        g.target && $t.openTarget(g.target);
        return;
      }
      try {
        Promise.resolve(g.onClick()).catch((C) => console.warn("Notification action failed", C));
      } catch (C) {
        console.warn("Notification action failed", C);
      }
    }
    function x(g) {
      const C = Math.max(500, n.get(g.id) ?? g.duration);
      return {
        width: `${a.value[g.id] ?? 100}%`,
        transition: d.value[g.id] ? "none" : `width ${C}ms linear`
      };
    }
    return Ve(() => {
      v = new MutationObserver(() => {
        const C = new Set($o.map((I) => I.id));
        for (const I of $o)
          !I.closing && !t.has(I.id) && !n.has(I.id) && c(I);
        for (const I of n.keys())
          C.has(I) || (f(I), n.delete(I), o.delete(I), delete a.value[I], delete d.value[I]);
      });
      const g = document.getElementById("win-toast-container");
      g && v.observe(g, { childList: !0 });
      for (const C of $o) c(C);
    }), so(() => {
      v?.disconnect(), v = null;
      for (const g of t.values()) clearTimeout(g);
      t.clear();
    }), (g, C) => (r(), le(yt, { to: "body" }, [
      i("div", wp, [
        J(Go, { name: "win-toast" }, {
          default: to(() => [
            (r(!0), p(Y, null, fe(s($o), (I) => (r(), p("article", {
              key: I.id,
              class: re(["win-toast-card", [I.appType, { closing: I.closing }]]),
              "data-toast-fingerprint": I.fingerprint,
              onMouseenter: (y) => h(I),
              onMouseleave: (y) => b(I)
            }, [
              i("header", kp, [
                i("img", {
                  src: I.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, _p),
                i("span", Cp, u(I.appName), 1),
                i("span", xp, u(s(l)("notifications.justNow")), 1),
                i("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(l)("common.close"),
                  "aria-label": s(l)("common.close"),
                  onClick: (y) => M(I)
                }, "✕", 8, Lp)
              ]),
              i("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => m(I)
              }, [
                i("span", Tp, u(I.title), 1),
                I.subtitle ? (r(), p("span", Sp, u(I.subtitle), 1)) : E("", !0),
                I.message ? (r(), p("span", Ip, u(I.message), 1)) : E("", !0)
              ], 8, $p),
              I.showActions && I.actionLabel ? (r(), p("footer", Mp, [
                i("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => m(I)
                }, u(I.actionLabel), 9, Dp),
                i("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => M(I)
                }, u(s(l)("common.close")), 9, Ap)
              ])) : E("", !0),
              i("div", {
                class: "win-toast-progress",
                style: be(x(I))
              }, null, 4)
            ], 42, bp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), os = /* @__PURE__ */ Me(Ep, [["__scopeId", "data-v-71b51a1a"]]), Pp = ["id"], Wp = /* @__PURE__ */ ce({
  __name: "DockModuleHost",
  setup(e) {
    const t = Dn().filter((o) => o.presentation !== "card").map((o) => {
      Be(o.lifecycle.isVisible, (a) => {
        a && Pe.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const n = ce({
        setup: () => () => He("section", { class: "dock-module-load-error", role: "alert" }, [
          He("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            He("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            He("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          He("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          He("div", { style: "display: flex; gap: 8px;" }, [
            He("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            He("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Pe.reloadApp(o.id);
              }
            }, "↻ 重试"),
            He("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Pe.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: oe(() => !!qe[o.id]),
        view: K({
          loader: o.loadView,
          onError(a, d, v, f) {
            f <= 2 ? d() : v();
          },
          errorComponent: n
        })
      };
    });
    return so(() => {
      for (const { definition: o } of t)
        De.close(o.id), eo.delete(o.id), qe[o.id] = !1;
    }), (o, n) => (r(!0), p(Y, null, fe(s(t), (a) => je((r(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (r(), le($n(a.view), {
        key: s(Pe).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Pp)), [
      [io, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Np = /* @__PURE__ */ Me(Wp, [["__scopeId", "data-v-3f131313"]]);
function Ke(e, t) {
  const o = j(!1);
  return Be(
    e,
    (n) => {
      n && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Tt(o);
}
const Rp = ["onKeydown"], Op = { class: "fo-up-preview-head" }, Bp = ["src"], Fp = { class: "fo-up-preview-meta" }, Hp = { class: "fo-up-preview-name-row" }, jp = ["href"], zp = ["disabled"], Gp = { class: "fo-up-preview-sign" }, Kp = { class: "fo-up-preview-videos" }, Vp = {
  key: 0,
  class: "fo-up-preview-loading"
}, Up = {
  key: 1,
  class: "fo-up-preview-empty"
}, Yp = {
  key: 2,
  class: "fo-up-preview-empty"
}, qp = ["href", "title", "onClick"], Xp = ["src"], Jp = {
  key: 0,
  class: "fo-bili-duration"
}, Zp = { class: "fo-up-preview-video-info" }, Qp = ["href", "title", "onClick"], eh = { class: "fo-up-preview-video-meta" }, th = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", oh = /* @__PURE__ */ ce({
  __name: "BiliUpPreview",
  setup(e) {
    const t = j(!1);
    function o() {
      if (!ue.submitting) {
        if (!ue.followed) {
          t.value = !1, jo.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, jo.toggleFollow();
      }
    }
    function n() {
      t.value = !1, jo.close();
    }
    function a(d, v) {
      d.ctrlKey || d.metaKey || (d.preventDefault(), d.stopPropagation(), v.bvid ? (Ti.openVideo({
        bvid: v.bvid,
        title: v.title,
        cover: v.cover,
        author: ue.name,
        authorFace: ue.face,
        mid: ue.mid,
        url: v.url
      }), n()) : v.url && v.url !== "#" && window.open(v.url, "_blank"));
    }
    return (d, v) => s(ue).open ? (r(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: H(n, ["self"])
    }, [
      i("aside", {
        class: "fo-up-preview-popover",
        style: be({ left: `${s(ue).left}px`, top: `${s(ue).top}px` }),
        onKeydown: Ot(H(n, ["stop", "prevent"]), ["esc"])
      }, [
        i("div", Op, [
          i("img", {
            class: "fo-up-preview-avatar",
            src: s(ue).face || th,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Bp),
          i("div", Fp, [
            i("div", Hp, [
              i("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ue).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(ue).name), 9, jp),
              i("button", {
                type: "button",
                class: re([
                  s(ue).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ue).submitting,
                onClick: o
              }, u(s(ue).submitting ? "处理中…" : t.value ? "确定取消？" : s(ue).followed ? "取消关注" : "＋ 关注"), 11, zp)
            ]),
            i("p", Gp, u(s(ue).sign || "暂无个人简介"), 1)
          ]),
          i("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: n
          }, "✕")
        ]),
        v[1] || (v[1] = i("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        i("div", Kp, [
          s(ue).loading ? (r(), p("div", Vp, [...v[0] || (v[0] = [
            i("i", null, null, -1),
            i("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ue).error ? (r(), p("p", Up, u(s(ue).error), 1)) : s(ue).videos.length ? (r(!0), p(Y, { key: 3 }, fe(s(ue).videos, (f) => (r(), p("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            i("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (c) => a(c, f)
            }, [
              i("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Xp),
              f.duration ? (r(), p("span", Jp, u(f.duration), 1)) : E("", !0)
            ], 8, qp),
            i("div", Zp, [
              i("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (c) => a(c, f)
              }, u(f.title), 9, Qp),
              i("div", eh, [
                i("span", null, "▣ " + u(f.playCount), 1),
                i("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (r(), p("p", Yp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Rp)
    ], 32)) : E("", !0);
  }
}), ih = /* @__PURE__ */ Me(oh, [["__scopeId", "data-v-3fedd7f1"]]), nh = { class: "logicweaver-overlays-layer" }, sh = { id: "vue-notification-root" }, ah = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, rh = { id: "vue-bili-message-panel-root" }, lh = { id: "vue-notification-center-root" }, ch = { id: "vue-tab-manager-root" }, dh = { id: "vue-bookmark-menu-root" }, uh = { id: "vue-bookmark-panel-root" }, ph = { id: "vue-launcher-dialogs-root" }, hh = { id: "vue-launcher-folder-root" }, fh = { id: "vue-launcher-menus-root" }, gh = { id: "vue-settings-dialog-root" }, mh = { id: "vue-clock-settings-root" }, vh = { id: "vue-bili-theater-root" }, yh = { id: "vue-bili-mini-player-root" }, wh = { id: "vue-ai-dialog-root" }, bh = { id: "vue-aihot-viewer-root" }, kh = { id: "vue-nav-wheel-root" }, _h = { id: "vue-github-detail-root" }, Ch = { id: "vue-bili-subtitle-modal-root" }, xh = { id: "vue-bili-video-task-modal-root" }, Lh = { id: "vue-firecrawl-modal-root" }, $h = { id: "vue-floating-image-viewer-root" }, Th = { id: "vue-command-palette-root" }, Sh = /* @__PURE__ */ ce({
  __name: "AppOverlays",
  setup(e) {
    const t = Ke(() => xo.state.isOpen), o = Ke(() => Sn.isOpen), n = Ke(() => Ho.isOpen), a = Ke(() => Nt.state.isOpen), d = Ke(() => ga.open), v = Ke(() => _o.state.isOpen), f = Ke(() => Bs.isOpen), c = Ke(() => ha.isOpen), h = Ke(() => zi.state.isOpen), b = Ke(() => Vs.isOpen), M = Ke(() => Re.isOpen), m = Ke(() => Ei.isOpen);
    let x;
    Ve(() => {
      x = nl();
    }), St(() => {
      x?.();
    });
    const g = Ke(() => Ri.state.isOpen), C = Ke(() => pt.isOpen), I = Ke(() => co.editDialog.isOpen || co.linkMove.isOpen || co.folderMove.isOpen || co.groupMerge.isOpen || co.folderDelete.isOpen), y = K(() => import("./ProfileMenu-1dR_fVLY.js")), _ = K(() => import("./BookmarkNoteMenu-NTFgrzgz.js")), T = K(() => import("./BookmarkPanel-w4fS7-e9.js")), N = K(() => import("./ClockSettingsMenu-3B5JyMrQ.js")), B = K(() => import("./NotificationCenter-_pX5i1Pk.js")), D = K(() => import("./TabManagerPanel-CnYShpEO.js")), $ = K(() => import("./LauncherDialogs-CnDTj_-q.js")), L = K(() => import("./LauncherFolderDialog-WqTdmQt5.js")), P = K(() => import("./LauncherMenus-Dzrw_r7l.js")), pe = K(() => import("./SettingsDialog-D-xEp-V7.js")), W = K(() => import("./BiliMiniPlayer-Dl-2T5gU.js")), G = K(() => import("./BiliTheaterDialog-D2eMmKVU.js")), R = K(() => import("./BiliMessagePanel-YAWwG75I.js")), q = K(() => import("./AiDialog-CNm-j_ED.js")), he = K(() => import("./AihotViewer-BiYmrtjG.js")), _e = K(() => import("./NavWheelOverlay-DUNooc_u.js")), Je = K(() => import("./GitHubRepoDetailDrawer-B4hjR_CO.js")), F = K(() => import("./InPageSideDrawer-BXcyRaup.js")), O = K(() => import("./BiliSubtitleModal-CLwSb06l.js")), z = K(() => import("./BiliVideoTaskModal-D2MjxIB8.js")), ge = K(() => import("./FirecrawlModal-BQ0idVFr.js")), Ce = K(() => import("./FloatingImageViewer-BznfhLdQ.js")), Ie = K(() => import("./CommandPalette-RrYuGBzv.js")), me = K(() => import("./AppPromptModal-BMf1x_4w.js")), We = K(async () => {
      const [Ze, Ae] = await Promise.all([
        import("./PluginMarketDialog-DNL8uX5F.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Os("logicweaver-market-styles", Ae.default), Ze.default;
    });
    return (Ze, Ae) => (r(), p("div", nh, [
      i("div", sh, [
        J(os)
      ]),
      i("div", ah, [
        J(s(y))
      ]),
      i("div", rh, [
        s(c) ? (r(), le(s(R), { key: 0 })) : E("", !0)
      ]),
      i("div", lh, [
        s(o) ? (r(), le(s(B), { key: 0 })) : E("", !0)
      ]),
      i("div", ch, [
        s(n) ? (r(), le(s(D), { key: 0 })) : E("", !0)
      ]),
      i("div", dh, [
        s(g) ? (r(), le(s(_), { key: 0 })) : E("", !0)
      ]),
      i("div", uh, [
        J(s(T))
      ]),
      i("div", ph, [
        s(I) ? (r(), le(s($), { key: 0 })) : E("", !0)
      ]),
      i("div", hh, [
        s(C) ? (r(), le(s(L), { key: 0 })) : E("", !0)
      ]),
      i("div", fh, [
        J(s(P))
      ]),
      i("div", gh, [
        J(s(pe))
      ]),
      i("div", mh, [
        s(a) ? (r(), le(s(N), { key: 0 })) : E("", !0)
      ]),
      i("div", vh, [
        s(v) ? (r(), le(s(G), { key: 0 })) : E("", !0)
      ]),
      i("div", yh, [
        s(f) ? (r(), le(s(W), { key: 0 })) : E("", !0)
      ]),
      i("div", wh, [
        s(h) ? (r(), le(s(q), { key: 0 })) : E("", !0)
      ]),
      i("div", bh, [
        s(d) ? (r(), le(s(he), { key: 0 })) : E("", !0)
      ]),
      i("div", kh, [
        J(s(_e))
      ]),
      J(Np),
      i("div", _h, [
        s(b) ? (r(), le(s(Je), { key: 0 })) : E("", !0)
      ]),
      i("div", Ch, [
        J(s(O))
      ]),
      i("div", xh, [
        J(s(z))
      ]),
      i("div", Lh, [
        J(s(ge))
      ]),
      i("div", $h, [
        J(s(Ce))
      ]),
      i("div", Th, [
        s(M) ? (r(), le(s(Ie), { key: 0 })) : E("", !0)
      ]),
      s(m) ? (r(), le(s(F), { key: 0 })) : E("", !0),
      J(ih),
      J(s(me)),
      s(t) ? (r(), le(s(We), { key: 1 })) : E("", !0)
    ]));
  }
});
let Ci = !1;
function Ih(e = 1800) {
  if (Ci || typeof window > "u") return;
  const t = () => {
    if (Ci) return;
    Ci = !0;
    const o = Dn();
    for (const n of o)
      if (typeof n.loadView == "function")
        try {
          n.loadView().catch(() => {
          });
        } catch {
        }
  };
  "requestIdleCallback" in window ? setTimeout(() => {
    window.requestIdleCallback(t, { timeout: 4e3 });
  }, e) : setTimeout(t, e);
}
const Mh = ["data-active-workspace"], Dh = /* @__PURE__ */ ce({
  __name: "App",
  setup(e, { expose: t }) {
    const o = typeof document > "u" ? "" : document.title, n = {
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
    function d(c, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const b = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(c) : c;
      if (a === b) return;
      a = b;
      const M = document.querySelectorAll("link[rel*='icon']");
      if (M.length > 0)
        M.forEach((m) => {
          m.type = h, m.href = b;
        });
      else {
        const m = document.createElement("link");
        m.rel = "icon", m.type = h, m.href = b, document.head.appendChild(m);
      }
    }
    function v() {
      if (typeof document > "u") return;
      const c = n[To.value] || n.home;
      if (d(c.icon, c.iconType), X.playing && X.title) {
        const h = X.artist ? ` - ${X.artist}` : "";
        document.title = `▶ ${X.title}${h}`;
        return;
      }
      if (uo.playing && uo.title) {
        document.title = `▶ ${uo.title} · 电台`;
        return;
      }
      document.title = c.title;
    }
    Be(
      [
        () => To.value,
        () => X.playing,
        () => X.title,
        () => X.artist,
        () => uo.playing,
        () => uo.title
      ],
      () => {
        v();
      },
      { immediate: !0 }
    );
    const f = oe(() => To.value === "home" ? "" : To.value);
    return Be(() => xt.activeId, (c) => {
      document.body.classList.toggle("has-card-fullscreen", !!c);
    }, { immediate: !0, flush: "sync" }), Ve(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Ai.bindGlobalListener(), ze.start(), wn.start(), $i.init().catch((c) => console.warn("[Launcher] 初始化失败", c)), Ih(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (c) {
        console.warn("[App] Runtime start error:", c);
      }
    }), St(() => {
      ze.stop(), $i.stop(), wn.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: De
    }), (c, h) => (r(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      J(or),
      J(gl),
      J(Bu),
      J(Uu),
      i("nav", {
        id: "mac-dock",
        class: re(["mac-dock", "dock-" + s(Ut).position]),
        "aria-label": "快捷应用栏"
      }, [
        J(ts)
      ], 2),
      J(Sh)
    ], 8, Mh));
  }
}), Ah = /* @__PURE__ */ Me(Dh, [["__scopeId", "data-v-5d2f948f"]]), Eh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Ph = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Wh = { class: "rhine-scaler" }, Nh = { class: "rhine-center-group" }, Rh = { class: "rhine-auth-status" }, Oh = { class: "rhine-auth-text" }, Bh = ["hidden"], Fh = { class: "rhine-cinema-caption" }, Hh = /* @__PURE__ */ ce({
  __name: "IntroAnimation",
  setup(e) {
    const t = j(window.innerHeight), o = j(window.innerWidth), n = j(!1), a = j(!1), d = j(10), v = j(1), f = j(0), c = /* @__PURE__ */ new Set();
    let h = 0, b = () => {
    };
    const M = oe(() => `${String(Math.round(tt.renderedProgress)).padStart(2, "0")}%`), m = oe(() => {
      const $ = tt.renderedProgress / 100 * t.value + 10;
      return `${Math.min($, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), x = oe(() => tt.renderedProgress >= 75 ? "START PROCESSING..." : tt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), g = oe(() => tt.finished ? "身份验证通过 · 欢迎进入终端" : tt.status ? `身份信息确认 · ${tt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), C = oe(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function I($, L) {
      const P = window.setTimeout(() => {
        c.delete(P), $();
      }, L);
      c.add(P);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _($) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const L = $ ? 180 : 260, P = $ ? 200 : 280, pe = performance.now(), W = (G) => {
        const R = G - pe, q = Math.min(1, R / L), he = 1 - Math.pow(1 - q, 3);
        if (d.value = 10 + he * Math.max(0, o.value - 10), R > L && (v.value = Math.max(0, 1 - (R - L) / P)), R >= L + P) {
          y();
          return;
        }
        h = requestAnimationFrame(W);
      };
      I(() => {
        h = requestAnimationFrame(W);
      }, $ ? 60 : 120);
    }
    function T($) {
      $ || (n.value = !0), I(() => {
        a.value = !0, f.value = 6, v.value = 0, I(y, 380);
      }, $ ? 40 : 420);
    }
    function N($) {
      tt.style === "rhinelab" ? T($) : _($);
    }
    function B() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function D($) {
      tt.finished || ($.key === "Enter" || $.key === " " || $.key === "Escape") && ($.preventDefault(), dt.skip("KEYBOARD SKIP"));
    }
    return Ve(() => {
      document.documentElement.dataset.startupStyle = tt.style, document.documentElement.style.setProperty("--rhine-scale", C.value), window.addEventListener("resize", B, { passive: !0 }), window.addEventListener("keydown", D, !0), b = Sa(N), Bn();
    }), so(() => {
      b(), window.removeEventListener("resize", B), window.removeEventListener("keydown", D, !0), cancelAnimationFrame(h);
      for (const $ of c) clearTimeout($);
      c.clear();
    }), ($, L) => (r(), p("div", {
      class: "intro-vue-content",
      style: be({ "--rhine-scale": C.value, opacity: v.value, filter: `blur(${f.value}px)` })
    }, [
      i("div", Eh, [
        L[2] || (L[2] = i("div", { class: "endfield-loader-texture" }, null, -1)),
        L[3] || (L[3] = i("div", { class: "endfield-loader-rail" }, null, -1)),
        i("div", {
          class: "endfield-loader-fill",
          style: be({ height: `${s(tt).renderedProgress}%` })
        }, null, 4),
        i("div", {
          class: "endfield-loader-meter",
          style: be({ top: m.value })
        }, [
          L[1] || (L[1] = i("span", { class: "endfield-loader-tick" }, null, -1)),
          i("b", null, u(M.value), 1),
          i("small", null, u(s(tt).status), 1)
        ], 4),
        L[4] || (L[4] = vo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        i("div", {
          class: "endfield-loader-wipe",
          style: be({ width: `${d.value}px`, opacity: d.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      i("div", Ph, [
        L[12] || (L[12] = vo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        i("div", Wh, [
          L[10] || (L[10] = vo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          i("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: L[0] || (L[0] = (P) => s(dt).skip("ENTER SYSTEM"))
          }, [...L[5] || (L[5] = [
            Ye("ENTER SYSTEM ", -1),
            i("span", null, "↗", -1)
          ])]),
          i("div", Nh, [
            L[8] || (L[8] = i("div", { class: "rhine-logo-box" }, [
              i("svg", {
                class: "rhine-logo-svg",
                viewBox: "0 0 310 185",
                "aria-label": "Rhine Lab",
                role: "img"
              }, [
                i("path", {
                  class: "rhine-logo-contour",
                  d: "M295 73C295 41 273 15 240 15C221 15 207 23 192 38C186 43 181 47 176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75C182 99 208 128 240 128C273 128 295 105 295 73Z",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "26",
                  pathLength: "1"
                }),
                i("path", {
                  class: "rhine-logo-plus",
                  d: "M44 70h50M69 45v50",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "15"
                }),
                i("path", {
                  class: "rhine-logo-minus",
                  d: "M219 70h44",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "15"
                }),
                i("text", {
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
            i("div", Rh, [
              L[6] || (L[6] = i("span", { class: "rhine-auth-dot" }, "·", -1)),
              i("span", Oh, u(x.value), 1),
              L[7] || (L[7] = i("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          i("div", {
            class: re(["rhine-scan", { active: n.value }]),
            hidden: !n.value
          }, [...L[9] || (L[9] = [
            vo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Bh),
          i("div", Fh, u(g.value), 1),
          L[11] || (L[11] = i("div", { class: "rhine-powered" }, [
            Ye("POWERED BY "),
            i("b", null, "RHINE LAB"),
            i("i")
          ], -1))
        ]),
        i("div", {
          class: re(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), jh = /* @__PURE__ */ ce({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Lo.trigger(o);
    }
    return (o, n) => (r(), p(Y, null, [
      i("button", {
        type: "button",
        "data-action": "messages",
        onClick: n[0] || (n[0] = H((a) => t("messages"), ["stop"]))
      }, u(s(l)("profile.menu.notifications")), 1),
      i("button", {
        type: "button",
        "data-action": "tabs",
        onClick: n[1] || (n[1] = H((a) => t("tabs"), ["stop"]))
      }, u(s(l)("profile.menu.tabs")), 1),
      i("button", {
        type: "button",
        "data-action": "refresh",
        onClick: n[2] || (n[2] = H((a) => t("refresh"), ["stop"]))
      }, u(s(l)("profile.menu.refreshBili")), 1),
      i("button", {
        type: "button",
        "data-action": "switch",
        onClick: n[3] || (n[3] = H((a) => t("switch"), ["stop"]))
      }, u(s(l)("profile.menu.switchUser")), 1),
      i("button", {
        type: "button",
        "data-action": "web",
        onClick: n[4] || (n[4] = H((a) => t("web"), ["stop"]))
      }, u(s(l)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), zh = /* @__PURE__ */ ce({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      ji.openWorkspace(o, !0);
    }
    return (o, n) => (r(), p(Y, null, [
      i("button", {
        id: "ai-top-open",
        type: "button",
        onClick: n[0] || (n[0] = (a) => t("ai"))
      }, "AI 助手"),
      i("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: n[1] || (n[1] = (a) => t("todoist"))
      }, "Todoist"),
      i("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: n[2] || (n[2] = (a) => t("stickers"))
      }, "表情包"),
      i("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: n[3] || (n[3] = (a) => t("calcom"))
      }, "预约"),
      i("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: n[4] || (n[4] = (a) => t("wallpaper"))
      }, "壁纸库"),
      Ln(o.$slots, "default")
    ], 64));
  }
}), Gh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Kh = { role: "status" }, Vh = ["disabled"], Uh = ["disabled"], Yh = /* @__PURE__ */ ce({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(et).message || s(et).busy ? (r(), p("section", Gh, [
      i("p", Kh, u(s(et).repo ? `原任务仓库：${s(et).repo}。 ` : "") + u(s(et).message), 1),
      s(et).busy ? (r(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (n) => s(nt).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      s(et).uncertain ? (r(), p(Y, { key: 1 }, [
        o[5] || (o[5] = i("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(et).unlockConfirmation ? (r(), p(Y, { key: 1 }, [
          o[4] || (o[4] = i("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          i("button", {
            type: "button",
            disabled: s(et).busy,
            onClick: o[2] || (o[2] = (n) => s(nt).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, Uh),
          i("button", {
            type: "button",
            onClick: o[3] || (o[3] = (n) => s(et).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (r(), p("button", {
          key: 0,
          type: "button",
          disabled: s(et).busy,
          onClick: o[1] || (o[1] = (n) => s(et).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Vh))
      ], 64)) : E("", !0)
    ])) : E("", !0);
  }
}), qh = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, Xh = {
  key: 0,
  class: "gh-sidebar-divider"
}, Jh = {
  key: 1,
  class: "gh-sidebar-caption"
}, Zh = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], Qh = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, ef = { key: 0 }, tf = { key: 1 }, of = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, nf = ["title"], sf = { class: "gh-folder-count" }, af = ["data-del", "onClick", "onKeydown"], rf = /* @__PURE__ */ ce({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = j(""), n = () => {
      o.value = "";
    };
    function a(h) {
      return t.active && !Ct.busy && yo.folders.some((b) => b.title === h && (b.kind === "custom" || b.kind === "uncategorized"));
    }
    Be(() => t.active, (h) => {
      n(), window.removeEventListener("dragend", n), window.removeEventListener("drop", n), h && (window.addEventListener("dragend", n), window.addEventListener("drop", n));
    }, { immediate: !0 }), so(() => {
      window.removeEventListener("dragend", n), window.removeEventListener("drop", n);
    });
    function d(h, b) {
      h.stopPropagation(), Et.delete(b);
    }
    function v(h, b) {
      if (!a(b) || !Array.from(h.dataTransfer?.types || []).includes(Us)) {
        n();
        return;
      }
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), o.value = b;
    }
    function f(h, b) {
      const M = h.currentTarget;
      M instanceof Node && h.relatedTarget instanceof Node && M.contains(h.relatedTarget) || o.value === b && (o.value = "");
    }
    function c(h, b) {
      if (n(), !a(b)) return;
      const M = Ys(h.dataTransfer);
      M && (h.preventDefault(), h.stopPropagation(), Et.dropRepository(M, b));
    }
    return (h, b) => (r(), p(Y, null, [
      s(Ct).message ? (r(), p("p", qh, u(s(Ct).message), 1)) : E("", !0),
      (r(!0), p(Y, null, fe(s(yo).folders, (M, m) => (r(), p(Y, {
        key: M.title
      }, [
        M.kind === "custom" && s(yo).folders[m - 1]?.kind !== "custom" ? (r(), p("div", Xh)) : E("", !0),
        M.kind === "custom" && s(yo).folders[m - 1]?.kind !== "custom" ? (r(), p("div", Jh, "GitHub 列表 (Lists)")) : E("", !0),
        i("button", {
          type: "button",
          class: re(["gh-bili-folder", { on: M.active, "drag-into": o.value === M.title }]),
          "data-folder": M.title,
          onClick: (x) => s(Et).select(M.title),
          onDragover: (x) => v(x, M.title),
          onDragleave: (x) => f(x, M.title),
          onDrop: (x) => c(x, M.title)
        }, [
          i("span", Qh, [
            M.kind === "all" ? (r(), p("span", ef, "⭐")) : M.kind === "uncategorized" ? (r(), p("span", tf, "📄")) : (r(), p("i", of))
          ]),
          i("span", {
            class: "gh-folder-name",
            title: M.title
          }, u(M.title), 9, nf),
          i("small", sf, u(M.count), 1),
          M.kind === "custom" ? (r(), p("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": M.title,
            role: "button",
            tabindex: "0",
            onClick: (x) => d(x, M.title),
            onKeydown: [
              Ot(H((x) => s(Et).delete(M.title), ["prevent", "stop"]), ["enter"]),
              Ot(H((x) => s(Et).delete(M.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, af)) : E("", !0)
        ], 42, Zh)
      ], 64))), 128))
    ], 64));
  }
}), lf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, cf = { key: 0 }, df = { key: 1 }, uf = {
  key: 2,
  class: "fo-folder-icon"
}, pf = { class: "gh-bili-heading" }, hf = { class: "gh-hero-title-row" }, ff = ["title"], gf = ["role", "aria-live"], mf = ["title"], vf = ["title", "aria-label"], yf = { id: "gh-hero-desc" }, wf = { class: "gh-bili-actions" }, bf = ["title"], kf = { class: "gh-batch-btn-text" }, _f = ["title"], Cf = ["title"], xf = /* @__PURE__ */ ce({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, n) => (r(), p(Y, null, [
      i("div", lf, [
        s(It).kind === "all" ? (r(), p("span", cf, "⭐")) : s(It).kind === "uncategorized" ? (r(), p("span", df, "📄")) : (r(), p("i", uf))
      ]),
      i("div", pf, [
        i("div", hf, [
          i("h3", {
            id: "gh-hero-title",
            title: s(It).title
          }, u(s(It).title), 9, ff),
          s(At).actionText ? (r(), p("div", {
            key: 0,
            class: re(["gh-hero-inline-status", { "is-error": s(At).actionError }]),
            role: s(At).actionError ? "alert" : "status",
            "aria-live": s(At).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            i("span", {
              class: "gh-hero-status-text",
              title: s(At).actionText
            }, u(s(At).actionText), 9, mf),
            i("button", {
              type: "button",
              title: s(l)("github.hero.closeTip"),
              "aria-label": s(l)("github.hero.closeTip"),
              onClick: n[0] || (n[0] = (a) => s(Oi).update({ actionText: "", actionError: !1 }))
            }, "×", 8, vf)
          ], 10, gf)) : E("", !0)
        ]),
        i("p", yf, u(s(It).description), 1)
      ]),
      i("div", wf, [
        i("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: re(["gh-hero-btn gh-batch-toggle-btn", { active: s(It).batchMode }]),
          title: s(l)("github.hero.batchToggle"),
          onClick: n[1] || (n[1] = (a) => s(bo).toggleBatch())
        }, [
          n[4] || (n[4] = i("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          i("span", kf, u(s(It).batchMode ? s(l)("github.hero.batchBack") : s(l)("github.hero.batch")), 1)
        ], 10, bf),
        i("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: s(l)("github.hero.refreshTitle"),
          onClick: n[2] || (n[2] = (a) => s(bo).refresh())
        }, u(s(l)("github.hero.refresh")), 9, _f),
        i("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: s(l)("github.hero.addFolderTitle"),
          onClick: n[3] || (n[3] = (a) => s(bo).createFolder())
        }, u(s(l)("github.hero.addFolder")), 9, Cf)
      ])
    ], 64));
  }
}), Lf = /* @__PURE__ */ Me(xf, [["__scopeId", "data-v-1c3e37db"]]), te = ke({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function bn(e, t = !1) {
  if (!e || te.busy) return;
  if (te.repo && te.text !== te.baseline) {
    te.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = nt.remarks[e]?.userRemark, n = typeof o == "string" ? o : "";
  Object.assign(te, {
    repo: e,
    baseline: n,
    text: t ? "" : n,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function xi() {
  te.busy || Object.assign(te, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Li() {
  if (te.busy || !te.repo) return;
  const { repo: e, text: t, baseline: o } = te;
  te.busy = !0;
  try {
    await nt.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(te, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (n) {
    te.message = n instanceof Error ? n.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    te.busy = !1;
  }
}
async function kn() {
  if (te.busy || !te.repo) return;
  const e = te.repo;
  te.busy = !0;
  try {
    const o = (await nt.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    te.storedValue = o ?? "", te.baseline = o ?? "", te.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    te.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    te.busy = !1;
  }
}
const $f = ["disabled"], Tf = ["disabled"], Sf = ["disabled"], If = ["disabled"], Mf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, _n = /* @__PURE__ */ ce({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = j(null);
    return Ve(() => {
      vt(() => {
        t.active && !te.busy && o.value?.focus();
      });
    }), (n, a) => (r(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = H(() => {
      }, ["stop"]))
    }, [
      je(i("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (d) => s(te).text = d),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(te).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = Ot(H((d) => !d.isComposing && e.active && s(Li)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Ot(H((d) => !d.isComposing && e.active && s(xi)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, $f), [
        [oo, s(te).text]
      ]),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(te).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...d) => s(Li) && s(Li)(...d))
      }, "✓", 8, Tf),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(te).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...d) => s(xi) && s(xi)(...d))
      }, "✕", 8, Sf),
      i("button", {
        type: "button",
        disabled: s(te).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...d) => s(kn) && s(kn)(...d))
      }, "读取已保存值", 8, If),
      s(te).storedValue !== null ? (r(), p("p", Mf, "已保存值：" + u(s(te).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Df = {
  key: 0,
  role: "status"
}, Af = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Ef = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Pf = { style: { "font-size": "12px", color: "var(--dim)" } }, Wf = {
  key: 3,
  class: "gh-repos-loading"
}, Nf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Rf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Of = ["onClick"], Bf = { class: "gh-card-head" }, Ff = ["checked", "onChange"], Hf = ["src"], jf = ["href", "title"], zf = { class: "owner" }, Gf = { class: "gh-card-body" }, Kf = { class: "gh-card-badges" }, Vf = ["title", "onClick"], Uf = ["onClick"], Yf = ["title", "onClick"], qf = { class: "gh-badge-remark-text" }, Xf = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, Jf = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Zf = ["title"], Qf = {
  key: 3,
  class: "desc dim"
}, eg = { class: "meta" }, tg = { class: "gh-stars" }, og = {
  key: 0,
  class: "gh-lang"
}, ig = {
  key: 1,
  class: "gh-updated"
}, ng = {
  key: 6,
  class: "gh-pager"
}, sg = ["disabled"], ag = { class: "gh-page-info" }, rg = ["disabled"], lg = ["onClick"], cg = /* @__PURE__ */ ce({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = oe(() => !!te.repo && !Le.cards.some((D) => D.fullName === te.repo)), n = ke({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = j(null), d = j(!1);
    function v(D, $) {
      const L = D.target;
      if (L instanceof Element) {
        if (Le.batchMode) {
          if (L.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          D.preventDefault(), D.stopPropagation(), _t.toggleSelection($.fullName);
          return;
        }
        L.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (D.preventDefault(), D.stopPropagation(), qs.open($.fullName, void 0, $));
      }
    }
    function f(D, $) {
      if (!t.active) return;
      D.preventDefault(), D.stopPropagation();
      const L = 12, P = 160, pe = 280, W = Math.min(window.innerWidth - P - L, Math.max(L, D.clientX)), G = Math.min(window.innerHeight - pe - L, Math.max(L, D.clientY));
      n.x = W, n.y = G, n.fullName = $.fullName, n.folders = [...$.folders || ($.folder ? [$.folder] : [])], n.hasRemark = !!$.customRemark, n.url = $.url, n.visible = !0, a.value = null, d.value = W > window.innerWidth - 380;
    }
    function c(D, $) {
      f($, D), a.value = "folder";
    }
    function h() {
      n.visible = !1, a.value = null;
    }
    function b(D) {
      n.folders.includes(D) ? n.folders = n.folders.filter(($) => $ !== D) : n.folders.push(D), nt.toggleRepoList(n.fullName, D);
    }
    function M() {
      n.folders = [], nt.clearRepoLists(n.fullName), h();
    }
    function m(D) {
      if (!t.active) return;
      const $ = typeof D == "string" ? D : D?.fullName || n.fullName;
      h(), bn($);
    }
    function x() {
      if (!t.active) return;
      const D = n.fullName;
      h(), bn(D, !0);
    }
    async function g() {
      const D = n.url;
      if (h(), D && t.active)
        try {
          await navigator.clipboard.writeText(D);
        } catch {
        }
    }
    function C(D) {
      const $ = nt.findRepository(n.fullName);
      h(), $ && Fs.sendGitHubShare({
        fullName: $.full_name,
        name: $.name,
        owner: $.owner?.login,
        ownerAvatar: $.owner?.avatar_url,
        desc: $.description || void 0,
        language: $.language || void 0,
        stars: $.stargazers_count,
        category: n.folders && n.folders.length ? n.folders.join(", ") : "未分类",
        url: $.html_url || `https://github.com/${$.full_name}`,
        updatedAt: $.updated_at ? $.updated_at.split("T")[0] : void 0
      }, D);
    }
    function I() {
      n.url && window.open(n.url, "_blank", "noreferrer"), h();
    }
    async function y() {
      const D = nt.findRepository(n.fullName);
      if (!D) {
        h();
        return;
      }
      h(), await nt.confirmUnstarRepository(D);
    }
    function _(D) {
      const $ = D.target;
      $?.closest(".gh-repo-context-menu") || $?.closest(".gh-inline-remark-box") || h();
    }
    function T(D) {
      D.key === "Escape" && n.visible && h();
    }
    Be(() => t.active, (D) => {
      window.removeEventListener("pointerdown", _), window.removeEventListener("keydown", T), h(), D && (window.addEventListener("pointerdown", _), window.addEventListener("keydown", T));
    }, { immediate: !0 }), St(() => {
      window.removeEventListener("pointerdown", _), window.removeEventListener("keydown", T);
    });
    function N(D, $) {
      const L = D.target;
      if (L instanceof Element && L.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        D.preventDefault();
        return;
      }
      _t.startDrag($, D);
    }
    const B = oe(() => {
      if (Le.cards.length > 0) return !1;
      const D = At.actionText || "";
      return !!(D.includes("正在读取") || D.includes("正在加载") || D.includes("正在统计") || D.includes("正在同步"));
    });
    return (D, $) => (r(), p(Y, null, [
      s(te).message ? (r(), p("p", Df, u(s(te).repo ? `${s(te).repo}：` : "") + u(s(te).message), 1)) : E("", !0),
      o.value ? (r(), p("section", Af, [
        i("p", null, "备注草稿：" + u(s(te).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        J(_n, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      s(Le).searchMessage ? (r(), p("div", Ef, [
        i("span", Pf, u(s(Le).searchMessage), 1),
        i("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: $[0] || ($[0] = (L) => s(_t).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      B.value ? (r(), p("div", Wf, [...$[16] || ($[16] = [
        i("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        i("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Le).emptyMessage ? (r(), p("p", Nf, u(s(Le).emptyMessage), 1)) : E("", !0),
      s(Le).cards.length ? (r(), p("div", {
        key: 5,
        class: re(["repos gh-grid", { "gh-batch-active": s(Le).batchMode }])
      }, [
        (r(!0), p(Y, null, fe(s(Le).cards, (L) => (r(), p("article", {
          key: L.fullName,
          class: re(["repo gh-card", { selected: L.selected }]),
          "data-repo-name": L.fullName,
          draggable: "true",
          onClick: (P) => v(P, L),
          onContextmenu: (P) => f(P, L),
          onDragstart: (P) => N(P, L.fullName)
        }, [
          i("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: H((P) => f(P, L), ["stop"])
          }, "⋮", 8, Of),
          i("div", Bf, [
            i("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: $[1] || ($[1] = H(() => {
              }, ["stop"]))
            }, [
              i("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: L.selected,
                onChange: (P) => s(_t).setSelection(L.fullName, P.target.checked)
              }, null, 40, Ff),
              $[17] || ($[17] = i("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            i("img", {
              class: "gh-owner-avatar",
              src: L.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: $[2] || ($[2] = (P) => P.target.src = "assets/github-star.svg")
            }, null, 40, Hf),
            i("a", {
              href: L.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: L.fullName
            }, [
              i("span", zf, u(L.owner) + "/", 1),
              Ye(u(L.name), 1)
            ], 8, jf)
          ]),
          i("div", Gf, [
            i("div", Kf, [
              L.folders && L.folders.length ? (r(!0), p(Y, { key: 0 }, fe(L.folders, (P) => (r(), p("span", {
                key: P,
                class: "gh-badge-folder",
                title: `GitHub 列表：${P}（点击管理所属列表）`,
                onClick: H((pe) => c(L, pe), ["stop"])
              }, " 📁 " + u(P), 9, Vf))), 128)) : (r(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: H((P) => c(L, P), ["stop"])
              }, " ＋ 未分类 ", 8, Uf)),
              s(te).repo === L.fullName ? (r(), le(_n, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : L.customRemark ? (r(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${L.customRemark}（点击就地修改）`,
                onClick: H((P) => m(L), ["stop"])
              }, [
                $[18] || ($[18] = i("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                i("span", qf, u(L.customRemark), 1)
              ], 8, Yf)) : E("", !0)
            ]),
            L.descriptionKind === "analyzing" ? (r(), p("p", Xf, [...$[19] || ($[19] = [
              i("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Ye(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : L.descriptionKind === "ai" ? (r(), p("p", Jf, [
              $[20] || ($[20] = i("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Ye(u(L.description), 1)
            ])) : L.descriptionKind === "plain" ? (r(), p("p", {
              key: 2,
              class: "desc",
              title: L.description
            }, u(L.description), 9, Zf)) : (r(), p("p", Qf, "暂无描述"))
          ]),
          i("div", eg, [
            i("span", tg, "★ " + u(L.stars), 1),
            L.language ? (r(), p("span", og, u(L.language), 1)) : E("", !0),
            L.updated ? (r(), p("span", ig, "更新 " + u(L.updated), 1)) : E("", !0)
          ])
        ], 42, Rf))), 128))
      ], 2)) : E("", !0),
      s(Le).totalPages > 1 ? (r(), p("div", ng, [
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Le).page <= 1,
          onClick: $[3] || ($[3] = (L) => s(_t).changePage(s(Le).page - 1))
        }, "‹ 上一页", 8, sg),
        i("span", ag, u(s(Le).page) + " / " + u(s(Le).totalPages) + " · 共 " + u(s(Le).totalItems) + " 个" + u(s(Le).serverPaged ? ` · 已加载 ${s(Le).loadedItems}` : ""), 1),
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Le).page >= s(Le).totalPages,
          onClick: $[4] || ($[4] = (L) => s(_t).changePage(s(Le).page + 1))
        }, "下一页 ›", 8, rg)
      ])) : E("", !0),
      (r(), le(yt, { to: "body" }, [
        t.active && n.visible ? (r(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: be({ left: `${n.x}px`, top: `${n.y}px` }),
          onClick: $[14] || ($[14] = H(() => {
          }, ["stop"])),
          onContextmenu: $[15] || ($[15] = H(() => {
          }, ["prevent"]))
        }, [
          i("div", {
            class: re(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: $[6] || ($[6] = (L) => a.value = "folder")
          }, [
            $[21] || ($[21] = i("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              i("span", null, "📁 所属 GitHub 列表"),
              i("span", { class: "sub-arrow" }, "›")
            ], -1)),
            i("div", {
              class: re(["gh-sub-flyout", { "flyout-left": d.value }]),
              onClick: $[5] || ($[5] = H(() => {
              }, ["stop"]))
            }, [
              i("button", {
                class: re(["fo-cover-menu-item", { primary: n.folders.length === 0 }]),
                type: "button",
                onClick: M
              }, u(n.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (r(!0), p(Y, null, fe(s(nt).cats, (L) => (r(), p("button", {
                key: L,
                class: re(["fo-cover-menu-item", { primary: n.folders.includes(L) }]),
                type: "button",
                onClick: (P) => b(L)
              }, u(n.folders.includes(L) ? "✓ " : "  ") + "📁 " + u(L), 11, lg))), 128))
            ], 2)
          ], 34),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[7] || ($[7] = (L) => a.value = null),
            onClick: $[8] || ($[8] = (L) => m())
          }, " ✏️ 编辑备注… ", 32),
          J(wa, {
            label: "💬 发送到聊天室",
            visible: n.visible,
            onOpen: $[9] || ($[9] = (L) => a.value = null),
            onSelect: C
          }, null, 8, ["visible"]),
          n.hasRemark ? (r(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[10] || ($[10] = (L) => a.value = null),
            onClick: x
          }, " 🗑️ 清除备注 ", 32)) : E("", !0),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[11] || ($[11] = (L) => a.value = null),
            onClick: g
          }, " 📋 复制仓库链接 ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[12] || ($[12] = (L) => a.value = null),
            onClick: I
          }, " ↗ 在 GitHub 打开 ", 32),
          i("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: $[13] || ($[13] = (L) => a.value = null),
            onClick: y
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), dg = /* @__PURE__ */ Me(cg, [["__scopeId", "data-v-048d3839"]]), ug = { class: "gh-batch-bar-left" }, pg = { class: "gh-batch-count-tip" }, hg = { id: "gh-batch-selected-count" }, fg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, gg = ["disabled"], mg = ["value"], vg = ["disabled"], yg = ["disabled"], wg = { class: "gh-batch-bar-right" }, bg = ["disabled"], kg = ["disabled"], _g = ["disabled"], Cg = /* @__PURE__ */ ce({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = As(), n = j(null);
    function a() {
      t.active && (o.value = nt.prepareBatchMove(), n.value = null);
    }
    async function d() {
      const v = o.value, f = n.value;
      if (!t.active || !v || f === null || Ct.busy) return;
      await v.submit(f) && o.value === v && (o.value = void 0);
    }
    return Be(() => t.active && Ht.active, (v) => {
      v || (o.value = void 0);
    }), (v, f) => (r(), p(Y, null, [
      i("div", ug, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: f[0] || (f[0] = (c) => s(ko).toggleSelectAll())
        }, u(s(Ht).allSelected ? "取消全选" : "全选"), 1),
        i("span", pg, [
          f[5] || (f[5] = Ye("已选择 ", -1)),
          i("b", hg, u(s(Ht).selectedCount), 1),
          f[6] || (f[6] = Ye(" 项", -1))
        ])
      ]),
      o.value ? (r(), p("section", fg, [
        i("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        i("details", null, [
          f[7] || (f[7] = i("summary", null, "查看本次仓库清单", -1)),
          i("ul", null, [
            (r(!0), p(Y, null, fe(o.value.names, (c) => (r(), p("li", { key: c }, u(c), 1))), 128))
          ])
        ]),
        je(i("select", {
          "onUpdate:modelValue": f[1] || (f[1] = (c) => n.value = c),
          "aria-label": "目标列表",
          disabled: s(Ct).busy
        }, [
          f[8] || (f[8] = i("option", {
            value: null,
            disabled: ""
          }, "请选择目标列表", -1)),
          f[9] || (f[9] = i("option", { value: "" }, "未分类（清空所选仓库的所有列表所属）", -1)),
          (r(!0), p(Y, null, fe(s(yo).folders.filter((c) => c.kind === "custom"), (c) => (r(), p("option", {
            key: c.title,
            value: c.title
          }, u(c.title), 9, mg))), 128))
        ], 8, gg), [
          [xn, n.value]
        ]),
        i("button", {
          type: "button",
          disabled: !t.active || s(Ct).busy || n.value === null,
          onClick: d
        }, "确认加入列表", 8, vg),
        i("button", {
          type: "button",
          disabled: s(Ct).busy,
          onClick: f[2] || (f[2] = (c) => o.value = void 0)
        }, "取消", 8, yg)
      ])) : E("", !0),
      i("div", wg, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(Ct).busy || s(Ht).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: a
        }, " 📁 归入 GitHub 列表 ", 8, bg),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Ht).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: f[3] || (f[3] = (c) => s(ko).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, kg),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Ht).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: f[4] || (f[4] = (c) => s(ko).unstar())
        }, " 🗑 取消收藏 ", 8, _g)
      ])
    ], 64));
  }
}), xg = K(() => import("./GitHubWorkspaceCard-940vHQur.js")), Lg = K(() => import("./NotificationCenter-_pX5i1Pk.js")), $g = K(() => import("./TabManagerPanel-CnYShpEO.js")), Tg = K(() => import("./BookmarkNoteMenu-NTFgrzgz.js")), Sg = K(() => import("./BookmarkPanel-w4fS7-e9.js")), Ig = K(() => import("./LauncherDialogs-CnDTj_-q.js")), Mg = K(() => import("./SettingsDialog-D-xEp-V7.js")), Dg = K(() => import("./SettingsView-DpcybL3p.js")), Ag = K(() => import("./ClockSettingsMenu-3B5JyMrQ.js")), Eg = K(() => import("./BiliTheaterDialog-D2eMmKVU.js")), Pg = K(() => import("./BiliMiniPlayer-Dl-2T5gU.js")), Wg = K(() => import("./BiliMessagePanel-YAWwG75I.js")), Ng = K(() => import("./ModelPricingCard-LYVElFkU.js")), Rg = K(() => import("./BilibiliWorkspace-C5koWQyN.js")), Og = K(() => import("./YouTubeCard-BINue6sW.js").then((e) => e.Y)), Bg = K(() => import("./AihotFeed-BTuS66W2.js")), Fg = K(() => import("./GitHubTrending-B0WxjyTU.js")), Hg = K(() => import("./AiDialog-CNm-j_ED.js")), jg = K(() => import("./AihotViewer-BiYmrtjG.js")), zg = K(() => import("./NavWheelOverlay-DUNooc_u.js")), Gg = K(() => import("./StandaloneHost-S0GyPRKZ.js")), Kg = K(() => import("./LauncherFolderDialog-WqTdmQt5.js")), Vg = K(() => import("./LauncherMenus-Dzrw_r7l.js"));
function ne(e, t, o, n) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: a }) => {
      const d = a(t.root);
      if (!d) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return n?.setMounted?.(!0), () => {
          n?.setMounted?.(!1);
        };
      const v = d.innerHTML, f = Wi(o);
      f.config.errorHandler = (c, h, b) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${b})`, c), d.dataset.vueError = "1";
      };
      try {
        f.mount(d), n?.setMounted?.(!0);
      } catch (c) {
        throw n?.setMounted?.(!1), d.innerHTML = v, c;
      }
      return () => {
        n?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function Ug(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!dt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Wi(Hh);
      let n = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const d = window.setTimeout(() => {
        dt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          n || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        n || (n = !0, clearTimeout(d), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ne(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Ah), document.getElementById("vue-spa-root") || ne(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Gg), ne(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, os), ne(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, jh, Lo), ne(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, zh, ji), ne(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, ts, ft), ne(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, Zn), ne(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Cn), ne(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Qn, Ue), ne(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, es, Oe), ne(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Jn), ne(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, xg), ne(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Yh, Oi), ne(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, rf, Et), ne(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Lf, bo), ne(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, dg, _t), ne(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Cg, ko), ne(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Lg, $t), ne(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, $g, zn), ne(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Tg, Ri), ne(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Ig, In), ne(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Kg, Mn), ne(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Vg, Bi), ne(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Sg, Jo), ne(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Vo), ne(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Dg), ne(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Mg, Zo), ne(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Ag, Nt), ne(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Eg, _o), ne(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Pg), ne(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Hg, zi), ne(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, jg, Hi), ne(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, zg, Se), ne(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Wg, Pt), ne(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Ng, Pn), ne(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Rg, An), ne(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Og, Wn), ne(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Bg, En), ne(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Fg, Gn);
}
Ss();
const ti = Ca(Qo);
Za(Qo, ti);
Qa(Qo);
Ug(ti);
Ni.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-BUuP71Tl.js"), await Ta(), await ti.startEager(), dt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  ti.stopAll();
}, { once: !0 });
export {
  on as C,
  Np as D,
  dg as G,
  mn as L,
  Nd as T,
  rf as _,
  Cg as a,
  Lf as b,
  Yh as c,
  zn as d,
  Nt as e,
  nn as f,
  Gn as g,
  gm as h,
  xe as i,
  zi as j,
  ze as k,
  Se as l,
  Xo as m,
  Z as n,
  Hh as o,
  Od as p,
  Bd as q,
  Rd as r,
  zh as s,
  Ho as t,
  jh as u,
  Xn as v,
  Ei as w,
  Re as x,
  qn as y,
  Qo as z
};
