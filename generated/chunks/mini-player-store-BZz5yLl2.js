import { r as G, s as le, a as ue } from "./vendor-vue-C09jaOfK.js";
const U = "notificationHistoryV1", Z = 200, de = 30 * 864e5;
function z(r) {
  if (r?.type === "todoist-task" && typeof r.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(r.taskId)) return { type: r.type, taskId: r.taskId };
  if (r?.type === "module" && typeof r.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(r.moduleId)) return { type: r.type, moduleId: r.moduleId };
  if (r?.type === "bili-messages") return { type: r.type };
  if (r?.type === "bili-video") {
    if (typeof r.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(r.bvid)) return { type: r.type, bvid: r.bvid };
    if (typeof r.aid == "string" && /^[1-9][0-9]{0,19}$/.test(r.aid)) return { type: r.type, aid: r.aid };
  }
  if (r?.type === "github-repository" && typeof r.fullName == "string" && r.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(r.fullName) && !r.fullName.split("/").some((e) => e === "." || e === "..")) return { type: r.type, fullName: r.fullName };
}
function pe(r) {
  if (typeof r == "string")
    try {
      const e = new URL(r);
      if (e.protocol !== "https:" || e.username || e.password || e.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(e.hostname)) return;
      const t = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(e.pathname);
      if (t) return t[1].startsWith("BV") ? { type: "bili-video", bvid: t[1] } : { type: "bili-video", aid: t[1].slice(2) };
    } catch {
    }
}
function X(r) {
  const e = /* @__PURE__ */ new Map();
  for (const t of r.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const i = pe(t[0].replace(/[)）。，,;；]+$/, ""));
    i && e.set(JSON.stringify(i), i);
  }
  return e.size === 1 ? e.values().next().value : void 0;
}
function x(r, e) {
  return typeof r != "string" ? "" : r.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (t) => {
    try {
      const i = new URL(t);
      return i.username = "", i.password = "", i.search = "", i.hash = "", i.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, e);
}
function ee(r) {
  if (!r || typeof r.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(r.id) || typeof r.title != "string" || !Number.isFinite(r.createdAt) || !["info", "success", "warning", "error"].includes(r.level)) throw new Error("Invalid notification record");
  let e = z(r.target);
  return r.appType === "bili" && (!e || e.type === "bili-messages") && (e = X([r.title, r.subtitle, r.message].filter((t) => typeof t == "string").join(" ")) || e), { id: r.id, appType: x(r.appType, 40), appName: x(r.appName, 60), title: x(r.title, 160), subtitle: x(r.subtitle, 240), message: x(r.message, 2e3), level: r.level, createdAt: r.createdAt, read: r.read === !0, target: e };
}
function te(r) {
  if (r == null) return { version: 0, items: [] };
  if (!r || !Number.isSafeInteger(r.version) || r.version < 0 || !Array.isArray(r.items) || r.items.length > Z) throw new Error("Invalid notification history");
  const e = Date.now();
  return { version: r.version, items: r.items.map(ee).filter((t) => t.createdAt >= e - de && t.createdAt <= e + 6e4).sort((t, i) => i.createdAt - t.createdAt) };
}
let H = Promise.resolve();
function N(r, e) {
  const t = async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const s = await chrome.storage.local.get(U), o = te(s[U]);
    if (r === "list")
      return o;
    if (r === "append") {
      const a = ee(e);
      a.createdAt = Date.now(), a.read = !1, o.items.some((d) => d.id === a.id) || o.items.unshift(a), o.items = o.items.slice(0, Z);
    } else if (r === "read-all")
      o.items = o.items.map((a) => ({ ...a, read: !0 }));
    else if (r === "clear")
      o.items = [];
    else if (r === "read" || r === "remove") {
      if (typeof e != "string" || e.length > 200)
        throw new Error("Invalid notification id");
      r === "remove" ? o.items = o.items.filter((a) => a.id !== e) : o.items = o.items.map((a) => a.id === e ? { ...a, read: !0 } : a);
    } else
      throw new Error("Invalid history operation");
    return o.version++, await chrome.storage.local.set({ [U]: o }), o;
  }, i = H.then(async () => typeof navigator < "u" && navigator.locks ? await navigator.locks.request("tab-project:notification-history", async () => await t()) : await t());
  return H = i.catch(() => {
  }), i;
}
const S = G({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), Ie = le(() => S.items.filter((r) => !r.read).length);
let K = !1;
function $(r) {
  r.version < S.version || (S.version = r.version, S.items = r.items);
}
const fe = {
  state: S,
  start() {
    K || (K = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((r, e) => {
      if (!(e !== "local" || !r[U]))
        try {
          $(te(r[U].newValue));
        } catch {
          S.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    S.loading = !0;
    try {
      const r = await N("list");
      $(r), S.error = "";
    } catch {
      S.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      S.loading = !1;
    }
  },
  open() {
    this.start(), S.isOpen = !0, this.refresh();
  },
  close() {
    S.isOpen = !1;
  },
  toggle() {
    S.isOpen ? this.close() : this.open();
  },
  async markRead(r) {
    if (!S.saving) {
      S.saving = !0;
      try {
        const e = await N("read", r);
        $(e), S.error = "";
      } catch {
        S.error = "标记已读未确认，请重试。";
      } finally {
        S.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!S.saving) {
      S.saving = !0;
      try {
        const r = await N("read-all");
        $(r), S.error = "";
      } catch {
        S.error = "全部标记已读未确认，请重试。";
      } finally {
        S.saving = !1;
      }
    }
  },
  async remove(r) {
    if (!S.saving) {
      S.saving = !0;
      try {
        const e = await N("remove", r);
        $(e), S.error = "";
      } catch {
        S.error = "删除通知未确认，请重试。";
      } finally {
        S.saving = !1;
      }
    }
  },
  async clear() {
    if (!S.saving) {
      S.saving = !0;
      try {
        const r = await N("clear");
        $(r), S.error = "";
      } catch {
        S.error = "清空通知未确认，请重试。";
      } finally {
        S.saving = !1;
      }
    }
  },
  async activate(r) {
    await this.markRead(r.id), r.target && await this.openTarget(r.target);
  },
  async openTarget(r) {
    const e = z(r);
    if (e)
      try {
        if (e.type === "todoist-task") {
          const { openTodoistTask: t } = await import("./task-navigation-BWyan3Yx.js");
          t(e.taskId);
        } else if (e.type === "github-repository") {
          const { githubRepoDetailController: t } = await import("./github.service-CnwzFWAn.js").then((i) => i.H);
          t.open(e.fullName);
        } else if (e.type === "bili-video") {
          const { biliMiniPlayerController: t } = await Promise.resolve().then(() => Me);
          await t.openVideo({ bvid: e.bvid, aid: e.aid });
        } else if (e.type === "bili-messages") {
          const { biliMessagePanelController: t } = await import("./message-panel-store-C2cF0vMo.js");
          t.openPanel();
        } else {
          const { getDockModule: t } = await import("./window-manager.store-CzUcQOW-.js").then((s) => s.m);
          if (!t(e.moduleId)) throw new Error();
          const { windowManagerController: i } = await import("./window-manager.store-CzUcQOW-.js").then((s) => s.n);
          i.open(e.moduleId);
        }
        this.close();
      } catch {
        S.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function he(r) {
  fe.start(), N("append", r).then((e) => $(e)).catch(() => {
    S.error = "有一条通知未获持久保存确认。";
  });
}
const E = G([]), j = /* @__PURE__ */ new Map();
function me(r, e) {
  return r.history !== void 0 ? r.history : r.level === "warning" || r.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(e) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(e) || /^(正在|开始读取|加载中|同步中)/.test(e) ? !1 : r.appType === "chat" || r.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(e);
}
const J = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function q(r) {
  const e = E.find((t) => t.id === r);
  !e || e.closing || (e.closing = !0, window.setTimeout(() => {
    const t = E.findIndex((i) => i.id === r);
    t >= 0 && E.splice(t, 1);
  }, 260));
}
function ge() {
  for (const r of E) q(r.id);
}
function re(r) {
  if (!r) return null;
  const e = r.appType || "fetch", t = J[e] || J.fetch, i = String(r.title || "新消息通知"), s = String(r.subtitle || ""), o = String(r.message || ""), a = z(r.target) || (e === "bili" ? X(`${i} ${s} ${o}`) : void 0), d = Math.max(500, Number(r.duration) || 7e3), c = String(r.id || `${e}_${i}_${s}_${o}`).trim(), u = Date.now();
  for (const [b, y] of j)
    u - y > 3e4 && j.delete(b);
  const l = r.id ? 200 : d <= 4e3 ? 1200 : 3e3, g = j.get(c);
  if (g && u - g < l || E.some((b) => b.fingerprint === c && !b.closing)) return null;
  j.set(c, u);
  const p = `toast_${crypto.randomUUID()}`, f = {
    id: p,
    fingerprint: c,
    appType: e,
    appName: String(r.appName || t.name),
    icon: String(r.icon || t.icon),
    title: i,
    subtitle: s,
    message: o,
    actionLabel: r.actionLabel === void 0 ? t.action : String(r.actionLabel || ""),
    showActions: r.showActions !== !1,
    duration: d,
    onClick: typeof r.onClick == "function" ? r.onClick : null,
    closing: !1,
    historyId: r.historyId,
    target: a
  };
  E.push(f);
  const h = i + " " + s + " " + o;
  if (me(r, h)) {
    const b = r.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(h) ? "error" : "info"), y = a || (e === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    he({ id: p, appType: e, appName: f.appName, title: i, subtitle: s, message: o, level: b, createdAt: u, read: !1, target: y });
  }
  const m = E.filter((b) => !b.closing);
  return m.length > 5 && q(m[0].id), Object.freeze({ id: p, close: () => q(p) });
}
function ye(r, e, t = "", i = "assets/logo.png", s = 3200) {
  return re({ appType: "fetch", appName: r, title: e, subtitle: t, icon: i, duration: s, showActions: !1, actionLabel: "" });
}
const Pe = ue(E), Ee = Object.freeze({
  show: re,
  fetch: ye,
  close: q,
  clear: ge,
  get size() {
    return E.filter((r) => !r.closing).length;
  }
});
function C(r, e) {
  const t = new AbortController(), i = () => t.abort(r?.reason);
  r?.aborted ? i() : r?.addEventListener("abort", i, { once: !0 });
  const s = setTimeout(() => t.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), e);
  return { signal: t.signal, dispose() {
    clearTimeout(s), r?.removeEventListener("abort", i), t.abort();
  } };
}
class be {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function W(r) {
  return Array.isArray(r) ? r.flatMap((e) => {
    const t = typeof e == "string" ? e : e?.img_src;
    if (typeof t != "string" || !t.trim()) return [];
    try {
      const i = new URL(t.trim().replace(/^http:/i, "https:").replace(/^\/\//, "https://"));
      return i.protocol === "https:" && !i.username && !i.password ? [i.href] : [];
    } catch {
      return [];
    }
  }) : [];
}
function ie(r) {
  function e(f, h) {
    return f << h | f >>> 32 - h;
  }
  const t = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], i = new Array(64).fill(0).map((f, h) => Math.floor(Math.abs(Math.sin(h + 1)) * 2 ** 32)), s = new TextEncoder().encode(r), o = s.length * 8, a = new Uint8Array((Math.floor((s.length + 8) / 64) + 1) * 64);
  a.set(s), a[s.length] = 128;
  const d = new DataView(a.buffer);
  d.setUint32(a.length - 8, o >>> 0, !0), d.setUint32(a.length - 4, Math.floor(o / 4294967296), !0);
  let c = 1732584193, u = 4023233417, l = 2562383102, g = 271733878;
  for (let f = 0; f < a.length; f += 64) {
    const h = new Array(16);
    for (let w = 0; w < 16; w++) h[w] = d.getUint32(f + w * 4, !0);
    let m = c, b = u, y = l, v = g;
    for (let w = 0; w < 64; w++) {
      let I, k;
      w < 16 ? (I = b & y | ~b & v, k = w) : w < 32 ? (I = v & b | ~v & y, k = (5 * w + 1) % 16) : w < 48 ? (I = b ^ y ^ v, k = (3 * w + 5) % 16) : (I = y ^ (b | ~v), k = 7 * w % 16);
      const M = I + m + i[w] + h[k] >>> 0;
      m = v, v = y, y = b, b = b + e(M, t[w]) >>> 0;
    }
    c = c + m >>> 0, u = u + b >>> 0, l = l + y >>> 0, g = g + v >>> 0;
  }
  function p(f) {
    let h = "";
    for (let m = 0; m < 4; m++) h += (f >>> m * 8 & 255).toString(16).padStart(2, "0");
    return h;
  }
  return p(c) + p(u) + p(l) + p(g);
}
const se = [
  46,
  47,
  18,
  2,
  53,
  8,
  23,
  32,
  15,
  50,
  10,
  31,
  58,
  3,
  45,
  35,
  27,
  43,
  5,
  49,
  33,
  9,
  42,
  19,
  29,
  28,
  14,
  39,
  12,
  38,
  41,
  13,
  37,
  48,
  7,
  16,
  24,
  55,
  40,
  61,
  26,
  17,
  0,
  1,
  60,
  51,
  30,
  4,
  22,
  25,
  54,
  21,
  56,
  59,
  6,
  63,
  57,
  62,
  11,
  36,
  20,
  34,
  44,
  52
];
function V(r, e, t) {
  const i = se.map((u) => (e + t)[u]).join("").slice(0, 32), s = Math.round(Date.now() / 1e3), o = { ...r, wts: s }, d = Object.keys(o).sort().map((u) => encodeURIComponent(u) + "=" + encodeURIComponent(String(o[u]).replace(/[!'()*]/g, ""))).join("&"), c = ie(d + i);
  return {
    signedQuery: `${d}&w_rid=${c}`,
    w_rid: c,
    wts: s
  };
}
function ne(r) {
  const e = r.replace(/^\uFEFF/, "").split(/\r?\n/), t = [];
  let i = [];
  const s = () => {
    const o = i.filter((a) => !/^\d+$/.test(a) && !a.includes("-->") && !/^(WEBVTT|Kind:|Language:)/i.test(a)).join(`\r
`).trim();
    o && t.push(o), i = [];
  };
  for (const o of e) {
    const a = o.trim();
    a === "" ? s() : i.push(a);
  }
  return s(), t.join(`\r
`);
}
function we(r, e = "") {
  if ((e || "").split(".").pop()?.toLowerCase() === "json" || /^\s*[\[{]/.test(r))
    try {
      const i = JSON.parse(r), s = i?.body || i?.data?.body || (Array.isArray(i) ? i : null);
      if (Array.isArray(s) && s.length) {
        const o = s.map((a) => a && typeof a == "object" ? a.content : String(a)).filter((a) => a && String(a).trim());
        if (o.length) return o.join(`\r
`);
      }
    } catch {
    }
  if (r.includes("[Events]")) {
    const i = r.split(/\r?\n/).filter((s) => /^Dialogue:/i.test(s));
    if (i.length) {
      const s = i.map((o) => o.split(",").slice(9).join(",").replace(/\{[^}]*\}/g, "").replace(/\\N/g, `\r
`).trim()).filter(Boolean);
      if (s.length) return s.join(`\r
`);
    }
  }
  return ne(r);
}
function Q(r) {
  const e = Number(r);
  return e >= 120 ? "4K" : e === 116 ? "1080P60" : e === 112 ? "1080P+" : e === 80 ? "1080P" : e === 74 ? "720P60" : e === 64 ? "720P" : e === 32 ? "480P" : e === 16 ? "360P" : e > 0 ? `${e}P` : "清晰度";
}
function Se(r, e = "") {
  if (e && typeof e == "string" && e.trim()) return e.trim();
  const t = Number(r);
  return t >= 120 ? "超清 4K" : t === 116 ? "高清 1080P 60帧" : t === 112 ? "高清 1080P+ 高码率" : t === 80 ? "高清 1080P" : t === 74 ? "高码率 720P 60帧" : t === 64 ? "高清 720P" : t === 32 ? "清晰 480P" : t === 16 ? "流畅 360P" : `${t}P`;
}
class L {
  constructor() {
  }
  static getInstance() {
    return L.instance || (L.instance = new L()), L.instance;
  }
  async loadTree() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const e = await chrome.storage.local.get("foTree");
        if (e?.foTree?.children) return e.foTree;
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        const e = localStorage.getItem("foTree");
        if (e) {
          const t = JSON.parse(e);
          if (t?.children) return t;
        }
      } catch {
      }
    return { id: "root", type: "folder", children: [] };
  }
  async saveTree(e) {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.set({ foTree: e });
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.setItem("foTree", JSON.stringify(e));
      } catch {
      }
  }
  async loadCollapsedGroups() {
    let e = [];
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const t = await chrome.storage.local.get("foCollapsedGroupsV1");
        Array.isArray(t?.foCollapsedGroupsV1) && (e = t.foCollapsedGroupsV1.map(String));
      } catch {
      }
    if (!e.length && typeof localStorage < "u")
      try {
        const t = localStorage.getItem("foCollapsedGroupsV1");
        if (t) {
          const i = JSON.parse(t);
          Array.isArray(i) && (e = i.map(String));
        }
      } catch {
      }
    return new Set(e);
  }
  async saveCollapsedGroups(e) {
    const t = Array.from(e);
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.set({ foCollapsedGroupsV1: t });
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.setItem("foCollapsedGroupsV1", JSON.stringify(t));
      } catch {
      }
  }
  findNode(e, t) {
    if (!e) return null;
    if (String(e.id) === String(t)) return e;
    for (const i of e.children || []) {
      const s = this.findNode(i, t);
      if (s) return s;
    }
    return null;
  }
  findParent(e, t) {
    if (!e) return null;
    for (const i of e.children || []) {
      if (String(i.id) === String(t)) return e;
      const s = this.findParent(i, t);
      if (s) return s;
    }
    return null;
  }
  removeNodeById(e, t) {
    if (!e?.children) return !1;
    const i = e.children.findIndex((s) => String(s.id) === String(t));
    if (i >= 0)
      return e.children.splice(i, 1), !0;
    for (const s of e.children)
      if (this.removeNodeById(s, t)) return !0;
    return !1;
  }
  isDescendant(e, t) {
    if (!e) return !1;
    if (String(e.id) === String(t)) return !0;
    for (const i of e.children || [])
      if (this.isDescendant(i, t)) return !0;
    return !1;
  }
  createGroupNode(e) {
    return {
      id: "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: "folder",
      name: e,
      children: []
    };
  }
  unwrapGroup(e, t) {
    const i = this.findParent(e, t) || e, s = (i.children || []).findIndex((a) => String(a.id) === String(t));
    if (s < 0) return !1;
    const o = i.children[s];
    return i.children.splice(s, 1, ...o.children || []), !0;
  }
  moveNode(e, t, i, s, o) {
    let a = this.findNode(e, t);
    a || (a = { id: String(t), type: "fav", name: o || "收藏夹", children: [] });
    const d = String(i) === "root" ? e : this.findNode(e, i);
    if (!a || !d || a === d || a.type === "folder" && this.isDescendant(a, d.id))
      return !1;
    if (this.removeNodeById(e, a.id), d === e || s === "into" && d.type === "folder")
      Array.isArray(d.children) || (d.children = []), d.children.push(a);
    else {
      const c = this.findParent(e, d.id) || e;
      Array.isArray(c.children) || (c.children = []);
      const u = Math.max(0, c.children.findIndex((l) => String(l.id) === String(d.id)));
      c.children.splice(u + (s === "after" ? 1 : 0), 0, a);
    }
    return !0;
  }
  syncTreeWithFolders(e, t) {
    let i = !1;
    const s = /* @__PURE__ */ new Map();
    for (const c of t)
      s.set(String(c.id || c.fid), c);
    const o = (c) => {
      if (c.children)
        for (let u = c.children.length - 1; u >= 0; u--) {
          const l = c.children[u];
          if (l.type === "fav")
            if (!s.has(String(l.id)))
              c.children.splice(u, 1), i = !0;
            else {
              const g = s.get(String(l.id));
              g?.title && l.name !== g.title && (l.name = g.title, i = !0);
            }
          else
            o(l);
        }
    };
    o(e);
    const a = /* @__PURE__ */ new Set(), d = (c) => {
      for (const u of c.children || [])
        u.type === "fav" ? a.add(String(u.id)) : d(u);
    };
    d(e), e.children || (e.children = []);
    for (const c of t) {
      const u = String(c.id || c.fid);
      a.has(u) || (e.children.push({
        id: u,
        type: "fav",
        name: c.title || "未命名收藏夹",
        children: []
      }), i = !0);
    }
    return i;
  }
  flattenTree(e, t, i, s) {
    const o = new Map((t || []).map((l) => [String(l.id || l.fid), l])), a = [], d = /* @__PURE__ */ new Set(), c = (l) => (l.children || []).reduce(
      (g, p) => g + (p.type === "fav" ? 1 : c(p)),
      0
    ), u = (l, g = 0) => {
      for (const p of l.children || []) {
        const f = String(p.id), h = o.get(f), m = p.type === "folder";
        m || d.add(f);
        const b = m && i.has(f), y = !m && f === String(s);
        a.push({
          id: f,
          title: String(p.name || h?.title || "未命名收藏夹"),
          count: Number(m ? c(p) : h?.media_count || 0),
          kind: h?.isCollected ? "collected" : h?.isOther ? "other" : "created",
          depth: g,
          group: m,
          collapsed: b,
          selected: y,
          writable: !m && !h?.isCollected && !h?.isOther
        }), m && !b && u(p, g + 1);
      }
    };
    u(e, 0);
    for (const l of t || []) {
      const g = String(l.id || l.fid);
      a.some((p) => !p.group && p.id === g) || !l.isCollected && !l.isOther && d.has(g) || a.push({
        id: g,
        title: l.title || "未命名收藏",
        count: Number(l.media_count || 0),
        kind: l.isCollected ? "collected" : l.isOther ? "other" : "created",
        depth: 0,
        group: !1,
        collapsed: !1,
        selected: g === String(s),
        writable: !l.isCollected && !l.isOther
      });
    }
    return a;
  }
}
class R {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = L.getInstance();
  }
  static getInstance() {
    return R.instance || (R.instance = new R()), R.instance;
  }
  /**
   * 底层 B站 API 请求器 (携带凭据与跨域支持)
   */
  async api(e, t = {}) {
    const i = await fetch(e, {
      ...t,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...t.headers || {}
      }
    });
    if (!i.ok)
      throw Object.assign(new Error(`Bilibili API 请求失败 [${i.status}]: ${i.statusText}`), { status: i.status });
    const s = await i.json();
    if (s.code !== 0 && s.code !== void 0)
      throw Object.assign(new Error(s.message || s.msg || `Bilibili 接口返回错误码 ${s.code}`), { code: s.code });
    return s.data !== void 0 ? s.data : s;
  }
  /**
   * 从 Chrome Cookies 或 document.cookie 中提取 bili_jct (CSRF)
   */
  async getBiliJct() {
    if (typeof chrome < "u" && chrome.cookies?.get)
      try {
        for (const e of ["https://bilibili.com", "https://www.bilibili.com", "https://api.bilibili.com"]) {
          const t = await chrome.cookies.get({ url: e, name: "bili_jct" });
          if (t?.value) return t.value;
        }
      } catch {
      }
    if (typeof document < "u") {
      const e = document.cookie.match(/(?:^|;\s*)bili_jct=([^;]+)/);
      if (e) return decodeURIComponent(e[1]);
    }
    return "";
  }
  /**
   * 写入限频队列 (默认 650ms 保护间隔)
   */
  async enqueueWrite(e, t = 650) {
    const i = async () => {
      const o = Date.now() - this.lastWriteTime;
      o < t && await new Promise((a) => setTimeout(a, t - o));
      try {
        const a = await e();
        return this.lastWriteTime = Date.now(), a;
      } catch (a) {
        throw this.lastWriteTime = Date.now(), a;
      }
    }, s = this.writeQueue.then(i, i);
    return this.writeQueue = s.catch(() => {
    }), s;
  }
  formatBiliApiError(e, t) {
    return e === 11007 || e === -412 ? "操作过于频繁，请稍候再试" : e === -101 ? "账号未登录或登录态已失效" : e === 11002 ? "视频已存在于目标收藏夹" : e === 11003 ? "收藏夹不存在或已被删除" : t || `B站接口返回错误码 ${e}`;
  }
  /**
   * 获取当前登录用户信息
   */
  async getUserNav() {
    const e = await this.api("https://api.bilibili.com/x/web-interface/nav");
    return this.currentUser = {
      isLogin: !!e?.isLogin,
      mid: Number(e?.mid || 0),
      uname: String(e?.uname || ""),
      face: String(e?.face || ""),
      level: Number(e?.level_info?.current_level || 0)
    }, this.currentUser;
  }
  getCachedUser() {
    return this.currentUser;
  }
  /**
   * 获取用户创建的所有收藏夹
   */
  async getCreatedFolders(e) {
    let t = e;
    if (t || (this.currentUser || await this.getUserNav(), t = this.currentUser?.mid), !t) throw new Error("无法获取 B 站用户 MID，请先登录");
    return (await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${t}&type=0`
    ))?.list || [];
  }
  /**
   * 获取用户订阅/收藏的公开收藏夹及合集
   */
  async getCollectedFolders(e = 1, t = 50, i) {
    let s = i;
    s || (this.currentUser || await this.getUserNav(), s = this.currentUser?.mid);
    const o = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${e}&ps=${t}&up_mid=${s || ""}&platform=web`
    ), d = (o?.list || []).map((c) => ({
      id: c.id,
      fid: c.fid || c.id,
      title: c.title,
      media_count: Number(c.media_count || 0),
      cover: (c.cover || "").replace(/^http:/, "https:"),
      upper: c.upper || { name: c.owner?.name || "UP主", mid: c.mid },
      isCollected: !0,
      isSeason: c.type === 21 || !!c.season,
      type: c.type
    }));
    return {
      count: Number(o?.count || d.length),
      list: d
    };
  }
  /**
   * 获取系统虚拟收藏夹 (稍后再看、我的追番、播放历史)
   */
  getOtherFolders() {
    return [
      {
        id: "__history__",
        fid: "__history__",
        title: "播放历史",
        media_count: 0,
        icon: "📜",
        isOther: !0,
        otherType: "history"
      },
      {
        id: "__toview__",
        fid: "__toview__",
        title: "稍后再看",
        media_count: 0,
        icon: "⏱️",
        isOther: !0,
        otherType: "toview"
      },
      {
        id: "__bangumi__",
        fid: "__bangumi__",
        title: "我的追番",
        media_count: 0,
        icon: "🎬",
        isOther: !0,
        otherType: "bangumi"
      }
    ];
  }
  /**
   * 读取用户最近观看的历史记录
   */
  async getWatchHistory(e = 1, t = 24) {
    const i = await this.api(`https://api.bilibili.com/x/v2/history?pn=${e}&ps=${t}`), o = (Array.isArray(i) ? i : i?.list || []).map((a) => ({
      id: a.aid || a.history?.oid || a.id,
      type: 2,
      title: a.title || a.tag_name || "视频记录",
      cover: (a.pic || "").replace(/^http:/, "https:"),
      duration: a.duration || 0,
      upper: a.owner ? { mid: a.owner.mid, name: a.owner.name, face: a.owner.face } : a.author ? { mid: a.mid || 0, name: a.author, face: "" } : void 0,
      cnt_info: {
        play: a.stat?.view || 0,
        danmaku: a.stat?.danmaku || 0,
        collect: a.stat?.favorite || 0
      },
      bvid: a.bvid || a.history?.bvid || "",
      fav_time: a.view_at || a.progress
    }));
    return { medias: o, total: Number(i?.total || o.length) };
  }
  /**
   * 读取稍后再看列表
   */
  async getToViewVideos() {
    const e = await this.api("https://api.bilibili.com/x/v2/history/toview"), i = (e?.list || []).map((s) => ({
      id: s.aid || s.id,
      type: 2,
      title: s.title,
      cover: (s.pic || "").replace(/^http:/, "https:"),
      duration: s.duration || 0,
      upper: s.owner ? { mid: s.owner.mid, name: s.owner.name, face: s.owner.face } : void 0,
      cnt_info: {
        play: s.stat?.view || 0,
        danmaku: s.stat?.danmaku || 0,
        collect: s.stat?.favorite || 0
      },
      bvid: s.bvid,
      fav_time: s.add_at || s.progress
    }));
    return { medias: i, total: Number(e?.count || i.length) };
  }
  /**
   * 读取我的追番列表
   */
  async getBangumiFollows(e = 1, t = 24, i) {
    let s = i;
    s || (this.currentUser || await this.getUserNav(), s = this.currentUser?.mid);
    const o = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${e}&ps=${t}&vmid=${s || ""}`
    ), d = (o?.list || []).map((c) => ({
      id: c.season_id,
      type: 21,
      title: c.title,
      cover: (c.cover || "").replace(/^http:/, "https:"),
      duration: 0,
      upper: { mid: 0, name: c.season_type_name || "番剧", face: "" },
      cnt_info: {
        play: c.stat?.view || 0,
        danmaku: c.stat?.danmaku || 0,
        collect: c.stat?.follow || 0
      },
      link: c.url,
      bvid: c.new_ep?.bvid || "",
      intro: c.evaluate
    }));
    return { medias: d, total: Number(o?.total || d.length) };
  }
  /**
   * 读取合集/系列视频
   */
  async getSeasonVideos(e, t = 1, i = 24) {
    const s = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${e}&pn=${t}&ps=${i}&platform=web`
    ), o = s?.medias || [];
    return {
      medias: o,
      total: Number(s?.info?.media_count || o.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(e, t = 1, i = 20, s = "mtime", o = "") {
    const a = String(e);
    if (a === "__history__") {
      const p = await this.getWatchHistory(t, i);
      let f = p.medias;
      if (o.trim()) {
        const h = o.toLowerCase();
        f = f.filter((m) => m.title.toLowerCase().includes(h) || m.upper?.name && m.upper.name.toLowerCase().includes(h));
      }
      return {
        info: { title: "播放历史", media_count: p.total },
        medias: f,
        hasMore: t * i < p.total,
        total: p.total
      };
    }
    if (a === "__toview__") {
      const p = await this.getToViewVideos();
      let f = p.medias;
      if (o.trim()) {
        const h = o.toLowerCase();
        f = f.filter((m) => m.title.toLowerCase().includes(h) || m.upper?.name && m.upper.name.toLowerCase().includes(h));
      }
      return {
        info: { title: "稍后再看", media_count: p.total },
        medias: f.slice((t - 1) * i, t * i),
        hasMore: t * i < f.length,
        total: f.length
      };
    }
    if (a === "__bangumi__") {
      const p = await this.getBangumiFollows(t, i);
      return {
        info: { title: "我的追番", media_count: p.total },
        medias: p.medias,
        hasMore: t * i < p.total,
        total: p.total
      };
    }
    if (a.startsWith("season:")) {
      const p = a.replace("season:", ""), f = await this.getSeasonVideos(p, t, i);
      return {
        info: { title: "合集内容", media_count: f.total },
        medias: f.medias,
        hasMore: t * i < f.total,
        total: f.total
      };
    }
    let d = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${e}&pn=${t}&ps=${i}&order=${s}&platform=web`;
    o.trim() && (d += `&keyword=${encodeURIComponent(o.trim())}`);
    const c = await this.api(d), u = c?.medias || [], l = !!c?.has_more, g = Number(c?.info?.media_count || u.length);
    return {
      info: c?.info,
      medias: u,
      hasMore: l,
      total: g
    };
  }
  /**
   * 在 B站 创建新的收藏夹
   */
  async createRemoteFolder(e, t = 0) {
    const i = await this.getBiliJct();
    if (!i) return { ok: !1, reason: "没有取得 B站 CSRF 登录凭据，请先重新登录 B站" };
    try {
      const s = new URLSearchParams({ title: e, intro: "", privacy: String(t === 0 ? 0 : 1), csrf: i }), o = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: s.toString()
      }), a = await o.json().catch(() => ({}));
      return a?.code === 0 && a.data ? { ok: !0, folder: a.data } : { ok: !1, reason: a?.message || `B站接口 ${a?.code ?? o.status}` };
    } catch (s) {
      return { ok: !1, reason: s?.message || "创建 B站收藏夹失败" };
    }
  }
  /**
   * 移动视频至其他收藏夹 (单项或批量)
   */
  async moveVideo(e, t, i, s) {
    return this.enqueueWrite(async () => {
      const o = await this.getBiliJct();
      if (!o) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const a = Array.isArray(i) ? i.map((l) => String(l).includes(":") ? String(l) : `${l}:2`).join(",") : String(i).includes(":") ? String(i) : `${i}:2`, d = new URLSearchParams({
          src_media_id: String(e),
          tar_media_id: String(t),
          mid: String(s || this.currentUser?.mid || ""),
          resources: a,
          platform: "web",
          csrf: o
        }), u = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/move", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: d.toString()
        })).json();
        return u.code === 0 ? { ok: !0 } : { ok: !1, code: u.code, reason: this.formatBiliApiError(u.code, u.message) };
      } catch (a) {
        return { ok: !1, reason: a.message || "移动视频失败" };
      }
    });
  }
  /**
   * 从收藏夹删除视频 (取消收藏)
   */
  async deleteVideo(e, t, i = 2) {
    return this.enqueueWrite(async () => {
      let s = 0;
      for (; ; ) {
        s++;
        const o = await this.getBiliJct();
        if (!o) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
        try {
          const a = new URLSearchParams({
            csrf: o,
            rid: String(t),
            type: "2",
            add_media_ids: "",
            del_media_ids: String(e),
            platform: "web"
          }), c = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            },
            body: a.toString()
          })).json();
          if (c.code === 0) return { ok: !0 };
          if ((c.code === 11007 || c.code === -412 || /频繁|稍后|频率/.test(c.message || "")) && s <= i) {
            await new Promise((l) => setTimeout(l, 850 * s));
            continue;
          }
          return { ok: !1, code: c.code, reason: this.formatBiliApiError(c.code, c.message) };
        } catch (a) {
          if (s <= i) {
            await new Promise((d) => setTimeout(d, 600));
            continue;
          }
          return { ok: !1, reason: a.message };
        }
      }
    });
  }
  /**
   * 添加视频到收藏夹
   */
  async addVideoToFavorite(e, t) {
    return this.enqueueWrite(async () => {
      const i = await this.getBiliJct();
      if (!i) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const s = new URLSearchParams({
          rid: String(t),
          type: "2",
          add_media_ids: String(e),
          del_media_ids: "",
          platform: "web",
          csrf: i
        }), a = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: s.toString()
        })).json();
        return a.code === 0 ? { ok: !0 } : { ok: !1, code: a.code, reason: this.formatBiliApiError(a.code, a.message) };
      } catch (s) {
        return { ok: !1, reason: s.message };
      }
    });
  }
  /**
   * 获取视频详情与分P信息
   */
  async getVideoView(e, t) {
    return this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(e)}`, { signal: t });
  }
  /**
   * 获取视频播放流与音频流地址
   */
  async getPlayUrl(e, t) {
    return this.api(
      `https://api.bilibili.com/x/player/wbi/playurl?bvid=${encodeURIComponent(e)}&cid=${t}&qn=64&fnval=1`
    );
  }
  /**
   * 获取视频外挂字幕或 AI 智能字幕列表
   */
  async getVideoSubtitles(e, t) {
    return (await this.api(
      `https://api.bilibili.com/x/player/v2?bvid=${encodeURIComponent(e)}&cid=${t}`
    ))?.subtitle?.subtitles || [];
  }
  /**
   * 获取并缓存 Wbi 签名密钥
   */
  async getWbiKeys(e) {
    e?.throwIfAborted();
    const t = Date.now();
    if (this.wbiKeysCache && this.wbiKeysCache.expire > t)
      return { ik: this.wbiKeysCache.ik, sk: this.wbiKeysCache.sk };
    const i = await this.api("https://api.bilibili.com/x/web-interface/nav", { signal: e });
    e?.throwIfAborted();
    const s = i?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "", o = i?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!s || !o)
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    return this.wbiKeysCache = { ik: s, sk: o, expire: t + 3600 * 1e3 }, { ik: s, sk: o };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(e, t, i = 64, s) {
    const o = C(s, 18e3), a = o.signal, d = async (u) => {
      a.throwIfAborted();
      const l = C(a, 5e3);
      try {
        return await this.api(u, { signal: l.signal });
      } finally {
        l.dispose();
      }
    }, c = (u) => {
      if (a.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    };
    try {
      a.throwIfAborted();
      const u = Array.from(/* @__PURE__ */ new Set([i, 64, 32, 16]));
      let l = null, g = [], p = i;
      const f = (h) => {
        if (!h) return [];
        const m = Array.isArray(h.durl) ? h.durl : Array.isArray(h.result?.durl) ? h.result.durl : [], b = [];
        for (const y of m.slice(0, 1))
          if (y?.url && b.push(String(y.url)), Array.isArray(y?.backup_url))
            for (const v of y.backup_url)
              v && b.push(String(v));
        return Array.from(new Set(b.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
          try {
            const v = new URL(y);
            return v.protocol === "https:" && !v.username && !v.password;
          } catch {
            return !1;
          }
        });
      };
      for (const h of u)
        try {
          const m = e ? `bvid=${encodeURIComponent(e)}` : "", b = await d(
            `https://api.bilibili.com/x/player/playurl?${m}&cid=${t}&qn=${h}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), y = f(b);
          if (y.length > 0) {
            l = b, g = y, p = Number(b?.quality || h);
            break;
          }
        } catch (m) {
          c(m);
        }
      if (!g.length)
        for (const h of Array.from(/* @__PURE__ */ new Set([i, 64, 32])))
          try {
            const m = C(a, 5e3);
            let b;
            try {
              b = await this.getWbiKeys(m.signal);
            } finally {
              m.dispose();
            }
            const { ik: y, sk: v } = b, w = { cid: t, qn: h, fnval: 1, fourk: 0 };
            e && (w.bvid = e);
            const { signedQuery: I } = V(w, y, v), k = await d(
              `https://api.bilibili.com/x/player/wbi/playurl?${I}`
            ), M = f(k);
            if (M.length > 0) {
              l = k, g = M, p = Number(k?.quality || h);
              break;
            }
          } catch (m) {
            c(m);
          }
      if (!g.length)
        throw new Error("未能获取到有效视频直链播放流");
      return {
        sources: g,
        quality: p,
        acceptQuality: l?.accept_quality || [80, 64, 32, 16],
        acceptDescription: l?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
      };
    } finally {
      o.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(e, t, i) {
    const s = C(i, 18e3), o = s.signal, a = async (u) => {
      o.throwIfAborted();
      const l = C(o, 5e3);
      try {
        return await this.api(u, { signal: l.signal });
      } finally {
        l.dispose();
      }
    }, d = (u) => {
      if (o.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    }, c = (u) => {
      const l = u?.dash || u?.result?.dash, g = Array.isArray(l?.audio) ? l.audio : [];
      if (!g.length) return [];
      const p = [...g].sort((h, m) => Number(m?.id || 0) - Number(h?.id || 0)), f = [];
      for (const h of p) {
        if (h?.baseUrl && f.push(String(h.baseUrl)), h?.base_url && f.push(String(h.base_url)), Array.isArray(h?.backupUrl))
          for (const m of h.backupUrl) m && f.push(String(m));
        if (Array.isArray(h?.backup_url))
          for (const m of h.backup_url) m && f.push(String(m));
      }
      return Array.from(new Set(f.filter(Boolean).map((h) => h.replace(/^http:/, "https:")))).filter((h) => {
        try {
          const m = new URL(h);
          return m.protocol === "https:" && !m.username && !m.password;
        } catch {
          return !1;
        }
      });
    };
    try {
      o.throwIfAborted();
      try {
        const l = e ? `bvid=${encodeURIComponent(e)}` : "", g = await a(
          `https://api.bilibili.com/x/player/playurl?${l}&cid=${t}&qn=16&fnval=16&fourk=0&platform=html5`
        ), p = c(g);
        if (p.length > 0)
          return { sources: p, isPureAudio: !0 };
      } catch (l) {
        d(l);
      }
      try {
        const l = C(o, 5e3);
        let g;
        try {
          g = await this.getWbiKeys(l.signal);
        } finally {
          l.dispose();
        }
        const { ik: p, sk: f } = g, h = { cid: t, qn: 16, fnval: 16, fourk: 0 };
        e && (h.bvid = e);
        const { signedQuery: m } = V(h, p, f), b = await a(`https://api.bilibili.com/x/player/wbi/playurl?${m}`), y = c(b);
        if (y.length > 0)
          return { sources: y, isPureAudio: !0 };
      } catch (l) {
        d(l);
      }
      return { sources: (await this.fetchPlayStream(e, t, 16, o)).sources, isPureAudio: !1 };
    } finally {
      s.dispose();
    }
  }
  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  async resolvePlayStream(e, t = 1, i) {
    if (e.cachedSourceUrl)
      return {
        title: e.title || e.bvid || "本地缓存视频",
        poster: e.cover || "",
        sources: [e.cachedSourceUrl],
        aid: e.aid || null,
        bvid: e.bvid || "",
        cid: null,
        cached: !0,
        owner: e.owner || e.author || "UP主",
        ownerFace: e.ownerFace || e.face || "",
        ownerMid: null,
        pubdate: 0,
        desc: e.desc || "本地缓存视频",
        views: e.views || 0,
        danmaku: e.danmaku || 0,
        likes: e.likes || 0,
        currentQuality: 0,
        acceptQuality: [],
        acceptDescription: [],
        pages: [],
        currentPage: 1,
        partTitle: ""
      };
    const s = String(e.bvid || "").trim(), o = String(e.aid || "").trim(), a = s.startsWith("BV") ? s : "", d = o.replace(/^av/i, "") || (s.startsWith("BV") ? "" : s.replace(/^av/i, "")), c = a ? `bvid=${encodeURIComponent(a)}` : `aid=${encodeURIComponent(d)}`, u = C(i, 2e4), l = u.signal;
    try {
      l.throwIfAborted();
      const g = e.cid && a && t === 1 ? this.fetchPlayStream(a, e.cid, Number(e.preferredQuality || 64), l).then((A) => ({ value: A, error: null }), (A) => ({ value: null, error: A })) : null;
      let p = null;
      try {
        const A = C(l, 6e3);
        try {
          p = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`, { signal: A.signal });
        } finally {
          A.dispose();
        }
      } catch {
        l.throwIfAborted();
      }
      const f = p?.bvid || "", h = f.startsWith("BV") ? f : a || "", b = (Array.isArray(p?.pages) ? p.pages : []).map((A) => ({
        cid: A.cid,
        page: A.page,
        part: A.part || `第${A.page}集`,
        duration: A.duration || 0
      })), y = b.findIndex((A) => A.page === t), v = y >= 0 ? b[y] : b[0] || null, w = v?.cid || p?.cid || e.cid;
      if (!w)
        throw new Error("无法获取视频 CID 标识");
      const I = Number(e.preferredQuality || 64), k = g && String(w) === String(e.cid) ? await g : null;
      l.throwIfAborted();
      const M = k && String(w) === String(e.cid) ? k.value || (() => {
        throw k.error;
      })() : await this.fetchPlayStream(h, w, I, l);
      return {
        title: p?.title || e.title || h,
        poster: String(p?.pic || e.cover || "").replace(/^http:/, "https:"),
        sources: M.sources,
        aid: p?.aid || e.aid || null,
        bvid: h,
        cid: w || null,
        owner: p?.owner?.name || e.owner || e.author || "UP主",
        ownerFace: p?.owner?.face ? String(p.owner.face).replace(/^http:/, "https:") : e.ownerFace || e.face || "",
        ownerMid: p?.owner?.mid || null,
        pubdate: p?.pubdate || 0,
        desc: p?.desc || e.desc || "暂无简介",
        views: p?.stat?.view || e.views || 0,
        danmaku: p?.stat?.danmaku || e.danmaku || 0,
        likes: p?.stat?.like || e.likes || 0,
        currentQuality: M.quality,
        acceptQuality: M.acceptQuality,
        acceptDescription: M.acceptDescription,
        pages: b,
        currentPage: v?.page || 1,
        partTitle: v?.part || ""
      };
    } finally {
      u.dispose();
    }
  }
  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  async fetchVideoSubtitleDetails(e, t, i) {
    i?.throwIfAborted();
    const s = await this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(e)}`, { signal: i });
    if (i?.throwIfAborted(), i && !s?.cid) throw new Error("无法读取视频详情，请重试");
    if (!s?.cid) return { ok: !1, reason: "视频不存在或未登录", cues: [] };
    const o = Array.isArray(s?.pages) ? s.pages : [], a = t ? o.find((T) => T.cid === t) : null, d = t || s.cid, c = a?.part ? ` · P${a.page} ${a.part}` : "", { ik: u, sk: l } = await this.getWbiKeys(i);
    i?.throwIfAborted();
    const { signedQuery: g } = V({ bvid: e, cid: d }, u, l), p = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${g}`, { signal: i });
    if (i?.throwIfAborted(), i && !Array.isArray(p?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const f = p?.subtitle?.subtitles || [];
    if (!f.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const h = f.find((T) => /zh|中文|汉语|漢語/i.test((T.lan || "") + " " + (T.lan_doc || ""))) || f[0], m = h.subtitle_url || "", b = m.startsWith("//") ? `https:${m}` : m.startsWith("http") ? m : `https://${m}`, y = await fetch(b, { signal: i, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const v = await y.arrayBuffer();
    i?.throwIfAborted();
    let w;
    try {
      w = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(v));
    } catch {
      try {
        w = JSON.parse(new TextDecoder("gb18030").decode(v));
      } catch {
        w = JSON.parse(new TextDecoder("big5").decode(v));
      }
    }
    if (i && !Array.isArray(w?.body)) throw new Error("字幕正文格式异常");
    const k = (w?.body || []).map((T, ce) => ({
      id: `${T.from || 0}_${ce}`,
      from: Number(T.from || 0),
      to: Number(T.to || T.from || 0),
      content: String(T.content || "").trim()
    })).filter((T) => T.content), M = (s.title || e) + c, A = [];
    if (A.push("标题：" + M), A.push("字幕轨道：" + f.map((T) => T.lan_doc || T.lan || "未知").join(" / ") + "（已选：" + (h.lan_doc || h.lan || "默认") + "）"), s.owner?.name && A.push("UP主：" + s.owner.name), s.pubdate) {
      const T = new Date(s.pubdate * 1e3);
      A.push(`发布时间：${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`);
    }
    A.push("链接：https://www.bilibili.com/video/" + e + (a?.page ? `?p=${a.page}` : ""));
    const F = k.map((T) => T.content).join(`\r
`), oe = A.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: M,
      bodyText: F,
      headText: oe,
      lineCount: k.length,
      cues: k,
      aid: s.aid,
      desc: s.desc || "",
      viewPoints: Array.isArray(p?.view_points) ? p.view_points : []
    };
  }
  /**
   * 拉取并解析 B站 JSON 格式字幕流为标准化 Cue 列表
   */
  async fetchSubtitleCues(e) {
    if (!e) return [];
    const t = e.startsWith("//") ? `https:${e}` : e, i = await fetch(t);
    if (!i.ok) throw new Error(`字幕获取失败: ${i.statusText}`);
    return ((await i.json()).body || []).map((a) => ({
      from: Number(a.from || 0),
      to: Number(a.to || 0),
      content: String(a.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(e, t = 1, i = 20, s = 2) {
    const o = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${e}&pn=${t}&ps=${i}&sort=${s}`
    ), a = o?.replies || [], d = o?.top || o?.upper?.top || null, c = o?.page || {}, u = Number(c.count || 0), l = (f, h = !1) => {
      const m = {};
      if (f.content?.emote && typeof f.content.emote == "object")
        for (const [y, v] of Object.entries(f.content.emote)) {
          const w = v?.url;
          typeof w == "string" && w && (m[y] = w.replace(/^http:/, "https:"));
        }
      const b = Array.isArray(f.replies) ? f.replies.map((y) => ({
        rpid: y.rpid,
        mid: Number(y.mid || 0),
        uname: String(y.member?.uname || "B站用户"),
        avatar: String(y.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(y.content?.message || ""),
        timeText: new Date(Number(y.ctime || 0) * 1e3).toLocaleString(),
        like: Number(y.like || 0),
        pictures: W(y.content?.pictures)
      })) : [];
      return {
        rpid: f.rpid,
        mid: Number(f.mid || 0),
        uname: String(f.member?.uname || "匿名用户"),
        avatar: String(f.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(f.content?.message || ""),
        timeText: new Date(Number(f.ctime || 0) * 1e3).toLocaleString(),
        like: Number(f.like || 0),
        rcount: Number(f.rcount || 0),
        isTop: h,
        pictures: W(f.content?.pictures),
        emotes: m,
        replies: b
      };
    }, g = [];
    t === 1 && d && typeof d == "object" && d.rpid && g.push(l(d, !0));
    const p = d?.rpid ? String(d.rpid) : "";
    for (const f of a)
      p && String(f.rpid) === p || g.push(l(f, !1));
    return {
      comments: g,
      total: u,
      hasMore: t * i < u
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(e, t, i = 1, s = 10) {
    const o = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${e}&root=${t}&pn=${i}&ps=${s}`
    ), a = o?.replies || [], d = o?.page || {}, c = Number(d.count || 0);
    return {
      replies: a.map((l) => {
        const g = {};
        if (l.content?.emote && typeof l.content.emote == "object")
          for (const [p, f] of Object.entries(l.content.emote)) {
            const h = f?.url;
            typeof h == "string" && h && (g[p] = h.replace(/^http:/, "https:"));
          }
        return {
          rpid: l.rpid,
          mid: Number(l.mid || 0),
          uname: String(l.member?.uname || "B站用户"),
          avatar: String(l.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(l.content?.message || ""),
          timeText: new Date(Number(l.ctime || 0) * 1e3).toLocaleString(),
          like: Number(l.like || 0),
          pictures: W(l.content?.pictures),
          emotes: g
        };
      }),
      total: c,
      hasMore: i * s < c
    };
  }
  /**
   * 获取视频全量弹幕 XML 并解析为结构化列表
   */
  async getVideoDanmaku(e) {
    if (!e) return [];
    try {
      const t = [
        `https://comment.bilibili.com/${e}.xml`,
        `https://api.bilibili.com/x/v1/dm/list.so?oid=${e}`
      ];
      let i = "";
      for (const c of t)
        try {
          const u = await fetch(c);
          if (u.ok && (i = await u.text(), i && i.includes("<d p=")))
            break;
        } catch {
        }
      if (!i) return [];
      const a = new DOMParser().parseFromString(i, "text/xml").querySelectorAll("d"), d = [];
      return a.forEach((c, u) => {
        const g = (c.getAttribute("p") || "").split(","), p = parseFloat(g[0]) || 0, f = parseInt(g[1], 10) || 1, h = parseInt(g[2], 10) || 25, b = `#${(parseInt(g[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(g[4], 10) || 0, v = parseInt(g[5], 10) || 0, w = g[6] || "", I = g[7] || String(u), k = c.textContent?.trim() || "";
        if (k) {
          const M = Math.floor(p / 60), A = Math.floor(p % 60), F = `${String(M).padStart(2, "0")}:${String(A).padStart(2, "0")}`;
          d.push({
            id: I,
            time: p,
            timeStr: F,
            mode: f,
            size: h,
            color: b,
            timestamp: y,
            pool: v,
            userHash: w,
            text: k
          });
        }
      }), d.sort((c, u) => c.time - u.time), d;
    } catch (t) {
      return console.warn("[BiliService] 弹幕解析失败:", t), [];
    }
  }
  /**
   * 格式化毫秒或秒为 mm:ss
   */
  formatDuration(e) {
    if (!Number.isFinite(e) || e <= 0) return "0:00";
    const t = Math.floor(e / 60), i = Math.floor(e % 60);
    return `${t}:${String(i).padStart(2, "0")}`;
  }
}
const P = R.getInstance(), ve = L.getInstance(), Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliFavoritesTreeManager: L,
  BilibiliService: R,
  WBI_MIXIN_TAB: se,
  biliMd5: ie,
  bilibiliFavoritesManager: ve,
  bilibiliService: P,
  calculateWbiSign: V,
  extractSubtitlesFromText: we,
  getBiliQualityFullLabel: Se,
  getBiliQualityShortLabel: Q,
  parseSrtToPlainText: ne
}, Symbol.toStringTag, { value: "Module" })), _e = {
  phase: "closed",
  isCollapsed: !1,
  openDrawers: /* @__PURE__ */ new Set(),
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  error: ""
};
class ae {
  constructor() {
    this._state = { ..._e }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliMiniPlayer = this);
  }
  get state() {
    return this._state;
  }
  get phase() {
    return this._state.phase;
  }
  get isOpen() {
    return this._state.phase !== "closed";
  }
  get isLoading() {
    return this._state.phase === "loading";
  }
  get isPlaying() {
    return this._state.phase === "playing";
  }
  get isCollapsed() {
    return this._state.isCollapsed;
  }
  get error() {
    return this._state.error;
  }
  get qualityMenuOpen() {
    return this._state.qualityMenuOpen;
  }
  get speedMenuOpen() {
    return this._state.speedMenuOpen;
  }
  isDrawerOpen(e) {
    return this._state.openDrawers.has(e);
  }
  subscribe(e) {
    return this._listeners.add(e), () => {
      this._listeners.delete(e);
    };
  }
  _setState(e) {
    this._state = e;
    for (const t of this._listeners)
      t(e);
  }
  send(e) {
    const t = this._state;
    switch (e.type) {
      case "OPEN_START":
        return this._setState({
          phase: "loading",
          isCollapsed: !1,
          openDrawers: /* @__PURE__ */ new Set(),
          qualityMenuOpen: !1,
          speedMenuOpen: !1,
          error: ""
        }), !0;
      case "STREAM_RESOLVED": {
        if (t.phase === "closed") return !1;
        const i = e.isPlaying !== !1;
        return this._setState({
          ...t,
          phase: i ? "playing" : "ready",
          error: ""
        }), !0;
      }
      case "PLAY":
        return t.phase === "closed" || t.phase === "loading" ? !1 : (this._setState({
          ...t,
          phase: "playing"
        }), !0);
      case "PAUSE":
        return t.phase === "playing" ? (this._setState({
          ...t,
          phase: "paused"
        }), !0) : !1;
      case "RELOAD_START":
        return t.phase === "closed" ? !1 : (this._setState({
          ...t,
          phase: "loading",
          error: ""
        }), !0);
      case "ERROR":
        return t.phase === "closed" ? !1 : (this._setState({
          ...t,
          phase: "error",
          error: e.message
        }), !0);
      case "TOGGLE_COLLAPSE": {
        if (t.phase === "closed") return !1;
        const i = e.collapsed !== void 0 ? e.collapsed : !t.isCollapsed;
        return this._setState({
          ...t,
          isCollapsed: i,
          openDrawers: i ? /* @__PURE__ */ new Set() : t.openDrawers,
          qualityMenuOpen: i ? !1 : t.qualityMenuOpen,
          speedMenuOpen: i ? !1 : t.speedMenuOpen
        }), !0;
      }
      case "TOGGLE_DRAWER": {
        if (t.phase === "closed" || t.isCollapsed) return !1;
        const i = new Set(t.openDrawers), s = i.has(e.drawer);
        return (e.open !== void 0 ? e.open : !s) ? i.add(e.drawer) : i.delete(e.drawer), this._setState({
          ...t,
          openDrawers: i
        }), !0;
      }
      case "SET_QUALITY_MENU":
        return t.phase === "closed" || t.isCollapsed ? !1 : (this._setState({
          ...t,
          qualityMenuOpen: e.open,
          speedMenuOpen: e.open ? !1 : t.speedMenuOpen
        }), !0);
      case "SET_SPEED_MENU":
        return t.phase === "closed" || t.isCollapsed ? !1 : (this._setState({
          ...t,
          speedMenuOpen: e.open,
          qualityMenuOpen: e.open ? !1 : t.qualityMenuOpen
        }), !0);
      case "CLOSE":
        return this._setState({
          phase: "closed",
          isCollapsed: !1,
          openDrawers: /* @__PURE__ */ new Set(),
          qualityMenuOpen: !1,
          speedMenuOpen: !1,
          error: ""
        }), !0;
      default:
        return !1;
    }
  }
}
const B = new be(), Ae = {
  isOpen: !1,
  collapsed: !1,
  isLoading: !1,
  errorMsg: "",
  bvid: "",
  aid: "",
  cid: "",
  title: "",
  cover: "",
  author: "",
  authorMid: "",
  authorFace: "",
  pubdate: "",
  description: "",
  videoSrc: "",
  sourceUrls: [],
  iframeSrc: "",
  useIframe: !1,
  isPlaying: !1,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  currentQuality: 64,
  qualities: [
    { qn: 80, desc: "1080P 高清" },
    { qn: 64, desc: "720P 高清" },
    { qn: 32, desc: "480P 清晰" },
    { qn: 16, desc: "360P 流畅" }
  ],
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  pages: [],
  currentPageIndex: 0,
  episodesOpen: !1,
  descOpen: !1,
  commentsOpen: !1,
  commentsSort: 2,
  commentsPage: 1,
  comments: [],
  totalComments: 0,
  commentsLoading: !1,
  hasMoreComments: !1,
  danmakuEnabled: !0,
  danmakuList: [],
  danmakuLoading: !1,
  x: typeof window < "u" ? Math.max(16, window.innerWidth - 420) : 100,
  y: typeof window < "u" ? Math.max(76, window.innerHeight - 300) : 100,
  baseWidth: 0,
  height: 0,
  zIndex: 1e4
}, n = G({ ...Ae }), _ = new ae();
_.subscribe((r) => {
  n.isOpen = r.phase !== "closed", n.isLoading = r.phase === "loading", n.isPlaying = r.phase === "playing", n.errorMsg = r.error, n.collapsed = r.isCollapsed, n.episodesOpen = r.openDrawers.has("episodes"), n.descOpen = r.openDrawers.has("desc"), n.commentsOpen = r.openDrawers.has("comments"), n.qualityMenuOpen = r.qualityMenuOpen, n.speedMenuOpen = r.speedMenuOpen;
});
let Te = 1e4;
function O(r, e = !1) {
  const t = globalThis;
  typeof t.showBiliToast == "function" ? t.showBiliToast(r, 3200, { isError: e, target: { type: "bili-video", bvid: n.bvid, aid: n.aid } }) : typeof t.showWindowsToast == "function" && t.showWindowsToast({
    id: `bili_mini_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "B站迷你播放器",
    appType: "bili",
    target: { type: "bili-video", bvid: n.bvid, aid: n.aid },
    message: r,
    duration: 3200
  });
}
let D = "";
function Y() {
  D && URL.revokeObjectURL(D), D = "";
}
const ke = {
  get state() {
    return n;
  },
  get machine() {
    return _;
  },
  play() {
    _.send({ type: "PLAY" });
  },
  pause() {
    _.send({ type: "PAUSE" });
  },
  bringToFront() {
    n.zIndex = ++Te;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(r) {
    const e = r.bvid || "", t = r.aid ? String(r.aid) : "";
    if (!e && !t) {
      O("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const i = !!e && n.bvid === e || !!t && n.aid === t;
    if (n.isOpen && i && !r.cachedSourceUrl && (n.videoSrc || n.iframeSrc) && !n.errorMsg) {
      _.send({ type: "TOGGLE_COLLAPSE", collapsed: !1 });
      return;
    }
    const s = B.start();
    if (Y(), _.send({ type: "OPEN_START" }), n.bvid = e, n.aid = t, n.cid = r.cid || "", n.title = r.title || e || "加载中…", n.cover = r.cover || "", n.author = r.author || "", n.authorMid = r.mid ? String(r.mid) : "", n.authorFace = r.authorFace || "", n.videoSrc = "", n.sourceUrls = [], n.iframeSrc = "", n.useIframe = !1, n.currentTime = 0, n.pages = [], n.currentPageIndex = 0, n.comments = [], n.commentsPage = 1, n.hasMoreComments = !1, n.totalComments = 0, n.danmakuList = [], n.danmakuLoading = !1, typeof window < "u" && (n.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), n.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), r.cachedSourceUrl) {
      D = r.cachedSourceUrl, n.videoSrc = D, _.send({ type: "STREAM_RESOLVED", isPlaying: !0 });
      return;
    }
    try {
      const o = await P.resolvePlayStream({
        bvid: e,
        aid: t,
        cid: r.cid,
        title: r.title,
        cover: r.cover,
        preferredQuality: n.currentQuality
      }, 1, s);
      if (s.throwIfAborted(), n.title = o.title || r.title || e, n.cover = o.poster || r.cover || "", n.author = o.owner || r.author || "UP主", n.authorFace = o.ownerFace || r.authorFace || "", o.ownerMid && (n.authorMid = String(o.ownerMid)), n.aid = o.aid ? String(o.aid) : t, n.bvid = o.bvid || e, n.cid = o.cid || "", n.description = o.desc || "", n.pubdate = o.pubdate ? new Date(o.pubdate * 1e3).toLocaleString() : "", n.pages = o.pages || [], n.currentPageIndex = Math.max(0, o.currentPage - 1), o.acceptQuality?.length && (n.qualities = o.acceptQuality.map((a, d) => ({
        qn: a,
        desc: o.acceptDescription?.[d] || Q(a)
      }))), n.currentQuality = o.currentQuality || 64, o.sources && o.sources.length)
        n.sourceUrls = o.sources, n.videoSrc = o.sources[0], _.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), n.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (o) {
      if (s.aborted) return;
      const a = o?.message || "未能获取到视频播放流";
      _.send({ type: "ERROR", message: a }), O(`视频加载未完成：${a}`, !0);
    } finally {
      !s.aborted && _.isLoading && _.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 重新拉取当前视频
   */
  async retryCurrentVideo() {
    (n.bvid || n.aid) && await this.openVideo({
      bvid: n.bvid,
      aid: n.aid,
      cid: n.cid,
      title: n.title,
      cover: n.cover,
      author: n.author,
      authorFace: n.authorFace
    });
  },
  /**
   * 切换原生 HTML5 与官方 iframe 模式
   */
  togglePlayerMode() {
    if (!n.videoSrc && !n.useIframe) {
      O("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    n.useIframe = !n.useIframe, n.useIframe && !n.iframeSrc && (n.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(n.bvid)}&autoplay=1&danmaku=0&high_quality=1`), O(n.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(r) {
    if (r < 0 || r >= n.pages.length) return;
    const e = n.pages[r];
    if (!e) return;
    n.currentPageIndex = r, n.cid = e.cid, n.videoSrc = "", n.sourceUrls = [], _.send({ type: "RELOAD_START" }), n.danmakuList = [], n.danmakuLoading = !1;
    const t = B.start();
    try {
      const i = await P.fetchPlayStream(
        n.bvid,
        e.cid,
        n.currentQuality,
        t
      );
      if (t.throwIfAborted(), i.sources?.length)
        n.sourceUrls = i.sources, n.videoSrc = i.sources[0], n.currentTime = 0, _.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), n.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("获取分P视频流失败");
    } catch (i) {
      if (t.aborted) return;
      const s = i?.message || "切换选集失败";
      _.send({ type: "ERROR", message: s }), O(`分P切换失败：${s}`, !0);
    } finally {
      !t.aborted && _.isLoading && _.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 切换清晰度
   */
  async switchQuality(r) {
    if (_.send({ type: "SET_QUALITY_MENU", open: !1 }), r === n.currentQuality) return;
    _.send({ type: "RELOAD_START" });
    const e = n.currentTime, t = B.start();
    try {
      const i = await P.fetchPlayStream(
        n.bvid,
        n.cid,
        r,
        t
      );
      t.throwIfAborted(), i.sources?.length && (n.sourceUrls = i.sources, n.videoSrc = i.sources[0], n.currentQuality = i.quality, n.currentTime = e, _.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), O(`已切换清晰度为 ${Q(r)}`));
    } catch (i) {
      if (t.aborted) return;
      O(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
    } finally {
      !t.aborted && _.isLoading && _.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 切换倍速
   */
  setPlaybackRate(r) {
    n.playbackRate = r, _.send({ type: "SET_SPEED_MENU", open: !1 });
  },
  /**
   * 折叠 / 展开
   */
  toggleCollapse(r) {
    _.send({ type: "TOGGLE_COLLAPSE", collapsed: r });
  },
  /**
   * 关闭播放器
   */
  close() {
    B.cancel(), Y(), n.sourceUrls = [], n.videoSrc = "", _.send({ type: "CLOSE" });
  },
  /**
   * 切换选集抽屉
   */
  toggleEpisodes(r) {
    _.send({ type: "TOGGLE_DRAWER", drawer: "episodes", open: r });
  },
  /**
   * 切换简介抽屉
   */
  toggleDesc(r) {
    _.send({ type: "TOGGLE_DRAWER", drawer: "desc", open: r });
  },
  /**
   * 切换评论抽屉
   */
  toggleComments(r) {
    const e = r !== void 0 ? r : !_.isDrawerOpen("comments");
    _.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: e }), e && (!n.comments.length || n.commentsLoading) && this.loadComments(!0);
  },
  /**
   * 切换弹幕飞屏开关（B站原版体验：点击就开，再点击就关）
   */
  toggleDanmakuEnabled(r) {
    const e = r !== void 0 ? r : !n.danmakuEnabled;
    n.danmakuEnabled = e, O(e ? "已开启弹幕" : "已关闭弹幕"), e && (!n.danmakuList.length || n.danmakuLoading) && this.loadDanmaku();
  },
  /**
   * 加载视频弹幕
   */
  async loadDanmaku(r = !1) {
    if (!(n.danmakuList.length > 0 && !r)) {
      n.danmakuLoading = !0;
      try {
        let e = n.cid;
        if (!e && n.bvid) {
          const i = await P.getVideoView(n.bvid);
          i?.cid && (e = i.cid, n.cid = e);
        }
        if (!e) {
          n.danmakuLoading = !1, O("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const t = await P.getVideoDanmaku(e);
        n.danmakuList = t;
      } catch (e) {
        console.warn("[MiniPlayer] 获取弹幕失败:", e);
      } finally {
        n.danmakuLoading = !1;
      }
    }
  },
  /**
   * 复制简介
   */
  async copyDescription() {
    const r = [
      `标题：${n.title}`,
      n.author ? `UP主：${n.author}` : "",
      n.pubdate ? `发布时间：${n.pubdate}` : "",
      n.bvid ? `链接：https://www.bilibili.com/video/${n.bvid}` : "",
      "",
      n.description || "暂无简介"
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(r.join(`
`)), O("已复制视频简介到剪贴板");
    } catch {
      O("复制简介失败", !0);
    }
  },
  /**
   * 加载视频评论
   */
  async loadComments(r = !1) {
    r && (n.commentsPage = 1, n.comments = []), n.commentsLoading = !0;
    try {
      let e = n.aid;
      if (!e && n.bvid) {
        const s = await P.getVideoView(n.bvid);
        s?.aid && (e = String(s.aid), n.aid = e);
      }
      if (!e) {
        n.commentsLoading = !1;
        return;
      }
      const t = await P.getVideoComments(
        e,
        n.commentsPage,
        20,
        n.commentsSort
      ), i = (t.comments || []).map((s) => {
        const o = s.mid ? String(s.mid) : "", a = String(s.uname || "").trim(), d = n.authorMid ? String(n.authorMid) : "", c = String(n.author || "").trim(), u = !!(d && o && d === o || c && a && c === a);
        return {
          id: String(s.rpid),
          mid: o,
          uname: s.uname,
          avatar: s.avatar,
          message: s.message,
          timeStr: s.timeText,
          likeCount: s.like || 0,
          replyCount: s.rcount || 0,
          emotes: s.emotes,
          pictures: s.pictures || [],
          isUp: u,
          isTop: !!s.isTop,
          replies: (s.replies || []).map((l) => ({
            id: String(l.rpid),
            userName: l.uname,
            message: l.message,
            pictures: l.pictures || [],
            emotes: l.emotes
          }))
        };
      });
      r ? n.comments = i : n.comments = [...n.comments, ...i], n.totalComments = t.total || n.comments.length, n.hasMoreComments = t.hasMore;
    } catch (e) {
      O(`评论加载失败：${e?.message || "网络异常"}`, !0);
    } finally {
      n.commentsLoading = !1;
    }
  },
  /**
   * 切换评论排序
   */
  setCommentsSort(r) {
    n.commentsSort !== r && (n.commentsSort = r, this.loadComments(!0));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(r) {
    const e = n.comments.find((t) => String(t.id) === String(r));
    if (!(!e || e.subRepliesLoading)) {
      e.subRepliesPage ? e.subRepliesPage++ : e.subRepliesPage = 1, e.subRepliesLoading = !0, e.subRepliesExpanded = !0;
      try {
        let t = n.aid;
        if (!t && n.bvid) {
          const d = await P.getVideoView(n.bvid);
          d?.aid && (t = String(d.aid), n.aid = t);
        }
        if (!t) {
          e.subRepliesLoading = !1;
          return;
        }
        const i = await P.getSubReplies(t, r, e.subRepliesPage, 10), s = (i.replies || []).map((d) => ({
          id: String(d.rpid),
          userName: d.uname,
          message: d.message,
          pictures: d.pictures || [],
          emotes: d.emotes
        })), o = new Set((e.replies || []).map((d) => String(d.id))), a = s.filter((d) => !o.has(String(d.id)));
        e.replies = [...e.replies || [], ...a], e.subRepliesHasMore = i.hasMore;
      } catch (t) {
        O(`子回复加载失败：${t?.message || "网络异常"}`, !0);
      } finally {
        e.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(r) {
    const e = n.comments.find((t) => String(t.id) === String(r));
    e && (e.subRepliesExpanded = !1);
  },
  /**
   * 加载更多评论
   */
  loadMoreComments() {
    n.commentsLoading || !n.hasMoreComments || (n.commentsPage++, this.loadComments(!1));
  }
}, Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MiniPlayerMachine: ae,
  biliMiniPlayerController: ke,
  biliMiniPlayerState: n,
  miniPlayerMachine: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  U as N,
  be as P,
  fe as a,
  P as b,
  ke as c,
  pe as d,
  X as e,
  Ie as f,
  S as g,
  Pe as h,
  n as i,
  te as j,
  Se as k,
  V as l,
  N as m,
  Ee as n,
  Ce as o,
  z as s
};
