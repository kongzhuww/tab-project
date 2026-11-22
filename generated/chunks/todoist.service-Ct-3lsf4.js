import { a as et, w as Y, t as B } from "./module-state-CL24MXdf.js";
import { s as W } from "./storage-cache.service-BYF2zxXX.js";
const O = "todoist_change_revision_v1", K = "todoist_synced_revision_v1";
function J(c) {
  if (!c || c.length > 512) return null;
  try {
    const t = JSON.parse(c);
    return t.version !== 1 || !/^[a-f0-9]{64}$/.test(t.scope) || typeof t.revision != "string" || !/^[a-f0-9-]{36}$/.test(t.revision) ? null : t;
  } catch {
    return null;
  }
}
async function F(c) {
  const t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("todoist-invalidation-v1:" + c));
  return Array.from(new Uint8Array(t), (e) => e.toString(16).padStart(2, "0")).join("");
}
function it(c, t) {
  let e = "", i = !1;
  async function a(s, n = !1) {
    try {
      const r = J(s);
      if (!r) return;
      const h = await c();
      if (!h) return;
      const d = await F(h);
      if (r.scope !== d || h !== await c() || e === r.revision) return;
      if (n && !i) {
        i = !0;
        const m = J(localStorage.getItem(K));
        if (m && m.scope === d && m.revision === r.revision) {
          e = r.revision;
          return;
        }
      }
      i = !0, e = r.revision, t();
    } catch {
    }
  }
  function o() {
    if (!document.hidden)
      try {
        a(localStorage.getItem(O), !i);
      } catch {
      }
  }
  return typeof window < "u" && typeof document < "u" && (window.addEventListener("storage", (s) => {
    s.key === O && a(s.newValue, !1);
  }), document.addEventListener("visibilitychange", o), window.addEventListener("pageshow", o)), {
    async publish(s) {
      try {
        if (!s) return;
        const n = { version: 1, scope: await F(s), revision: crypto.randomUUID() };
        localStorage.setItem(O, JSON.stringify(n)), i = !0, s === await c() && (e = n.revision);
      } catch {
        console.warn("[Todoist] Cross-page invalidation unavailable; refresh other pages manually.");
      }
    },
    async markSynced(s) {
      try {
        if (!s || typeof localStorage > "u") return;
        const n = await F(s), r = J(localStorage.getItem(O));
        r && r.scope === n && (localStorage.setItem(K, JSON.stringify(r)), e = r.revision), i = !0;
      } catch {
      }
    },
    clear() {
      e = "", i = !1;
      try {
        typeof localStorage < "u" && (localStorage.removeItem(O), localStorage.removeItem(K));
      } catch {
      }
    }
  };
}
class b extends Error {
  constructor(t, e, i, a = !1) {
    super(q({ kind: t, status: e, retryAfterMs: i })), this.kind = t, this.status = e, this.retryAfterMs = i, this.submitted = a, this.name = t === "cancelled" ? "AbortError" : "TodoistApiError";
  }
}
function ot(c, t = Date.now()) {
  if (!c) return 6e4;
  const e = Number(c), i = Number.isFinite(e) ? e * 1e3 : Date.parse(c) - t;
  return Number.isFinite(i) ? Math.max(1e3, i) : 6e4;
}
function at(c, t = !1) {
  const e = c.status;
  return new b(
    e === 401 || e === 403 ? "auth" : e === 429 ? "rate-limit" : e === 404 || e === 410 ? "not-found" : "http",
    e,
    e === 429 ? ot(c.headers.get("retry-after")) : void 0,
    t
  );
}
function q(c) {
  const t = c;
  switch (t?.kind) {
    case "configuration":
      return "Todoist 配置不可用，请检查账号设置。";
    case "auth":
      return "Todoist 账号或权限不可用，请检查账号设置。";
    case "rate-limit":
      return `Todoist 请求受限，请约 ${Math.ceil((t.retryAfterMs || 6e4) / 1e3)} 秒后手动刷新；未自动重试。`;
    case "not-found":
      return "Todoist 资源不存在或接口不可用，请在 Todoist 中核对；未删除本机关联。";
    case "timeout":
      return "Todoist 请求超时，请检查网络后手动核对。";
    case "cancelled":
      return "Todoist 读取已取消。";
    case "invalid-response":
      return "Todoist 返回的数据格式异常，请稍后刷新。";
    case "network":
      return "Todoist 网络连接失败，请检查网络后重试读取。";
    case "http":
      return `Todoist 请求失败${t.status ? `（HTTP ${t.status}）` : ""}，请稍后核对。`;
    default:
      return "Todoist 读取失败，请手动刷新核对。";
  }
}
const G = "todoist_task_start_dates";
function V() {
  if (typeof window > "u" || !window.localStorage) return {};
  try {
    const c = localStorage.getItem(G);
    return c ? JSON.parse(c) : {};
  } catch {
    return {};
  }
}
function rt(c) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      localStorage.setItem(G, JSON.stringify(c));
    } catch {
    }
}
function st(c) {
  if (!c) return { date: "", time: "" };
  const e = String(c).trim().match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/);
  return e ? {
    date: e[1] || "",
    time: e[2] || ""
  } : { date: "", time: "" };
}
function mt(c, t) {
  const e = String(c || "").trim(), i = String(t || "").trim();
  return e ? i ? `${e} ${i}` : e : "";
}
function nt() {
  const c = V();
  return (t, e) => ct(t, e, c);
}
function ct(c, t, e = V()) {
  if (!c) return "";
  if (e[c]) return e[c];
  if (t) {
    const i = t.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (i && i[1])
      return i[1].replace("T", " ");
  }
  return "";
}
function ft(c, t) {
  if (!c) return;
  const e = V(), i = String(t || "").trim();
  i && /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2})?$/.test(i) ? e[c] = i : delete e[c], rt(e);
}
function ut(c, t) {
  if (!c && !t) return "";
  const { date: e, time: i } = st(c), a = t || i;
  if (!e) return a ? `${a}` : "";
  const o = e.slice(5);
  return a ? `${o} ${a}` : o;
}
function E(c) {
  return c < 10 ? `0${c}` : String(c);
}
function $(c) {
  return `${c.getFullYear()}-${E(c.getMonth() + 1)}-${E(c.getDate())}`;
}
function pt(c, t = /* @__PURE__ */ new Date()) {
  if (!c || typeof c != "string") return null;
  const e = c.trim();
  if (!e) return null;
  let i = e, a = "", o = "";
  const s = /(?:(上午|下午|晚上|中午|早晨|清晨|凌晨))?\s*(\d{1,2})(?:点|:|：)(\d{1,2}|半)?(?:分)?/, n = i.match(s);
  if (n && (n[1] || n[0].includes("点") || n[0].includes(":") || n[0].includes("："))) {
    const w = n[1] || "";
    let u = parseInt(n[2], 10), f = 0;
    n[3] === "半" ? f = 30 : n[3] && (f = parseInt(n[3], 10)), w === "下午" || w === "晚上" ? u < 12 && (u += 12) : w === "中午" ? u < 11 && (u += 12) : w === "凌晨" && u === 12 && (u = 0), u >= 0 && u <= 23 && f >= 0 && f <= 59 && (a = `${E(u)}:${E(f)}`, o = n[0]);
  }
  const r = [
    { regex: /(大后天)/i, offset: 3, label: "大后天" },
    { regex: /(后天)/i, offset: 2, label: "后天" },
    { regex: /(明天|明日|次日|明早|明晚|\btomorrow\b)/i, offset: 1, label: "明天" },
    { regex: /(今天|今日|今晚|今早|今夜|\btoday\b)/i, offset: 0, label: "今天" },
    { regex: /(昨天|昨日|\byesterday\b)/i, offset: -1, label: "昨天" }
  ];
  for (const w of r) {
    const u = i.match(w.regex);
    if (u) {
      const f = new Date(t.getFullYear(), t.getMonth(), t.getDate() + w.offset), T = u[1];
      let p = i.replace(T, " ");
      return o && (p = p.replace(o, " ")), p = p.replace(/\s+/g, " ").trim() || e, {
        date: $(f),
        formattedDate: $(f).slice(5),
        label: w.label,
        matchedText: (T + (o ? " " + o.trim() : "")).trim(),
        cleanTitle: p,
        time: a || void 0
      };
    }
  }
  const h = /((下|本|这)?(?:个)?(?:周|星期|礼拜)([一二三四五六日天1-7]|末))/i, d = i.match(h);
  if (d) {
    const w = d[1], u = d[2] || "", f = d[3], p = {
      一: 1,
      1: 1,
      二: 2,
      2: 2,
      三: 3,
      3: 3,
      四: 4,
      4: 4,
      五: 5,
      5: 5,
      六: 6,
      6: 6,
      末: 6,
      日: 0,
      天: 0,
      7: 0
    }[f];
    if (p !== void 0) {
      const D = t.getDay();
      let v = p - D;
      u === "下" ? v = (v <= 0 ? v + 7 : v) + 7 : v <= 0 && (v += 7);
      const j = new Date(t.getFullYear(), t.getMonth(), t.getDate() + v);
      let k = i.replace(w, " ");
      o && (k = k.replace(o, " ")), k = k.replace(/\s+/g, " ").trim() || e;
      const l = (u === "下" ? "下" : "") + "周" + (p === 0 ? "日" : f === "末" ? "六" : f);
      return {
        date: $(j),
        formattedDate: $(j).slice(5),
        label: l,
        matchedText: (w + (o ? " " + o.trim() : "")).trim(),
        cleanTitle: k,
        time: a || void 0
      };
    }
  }
  const m = /(?:(\d{4})[-/年])?(\d{1,2})[-/月](\d{1,2})[日号]?/, y = i.match(m);
  if (y) {
    const w = y[0], u = y[1] ? parseInt(y[1], 10) : t.getFullYear(), f = parseInt(y[2], 10), T = parseInt(y[3], 10);
    if (f >= 1 && f <= 12 && T >= 1 && T <= 31) {
      const p = new Date(u, f - 1, T);
      let D = i.replace(w, " ");
      return o && (D = D.replace(o, " ")), D = D.replace(/\s+/g, " ").trim() || e, {
        date: $(p),
        formattedDate: `${E(f)}-${E(T)}`,
        label: `${f}月${T}日`,
        matchedText: (w + (o ? " " + o.trim() : "")).trim(),
        cleanTitle: D,
        time: a || void 0
      };
    }
  }
  return null;
}
const Z = "todoistDefaultSectionName";
function Q() {
  try {
    return localStorage.getItem(Z) || "默认板块";
  } catch {
    return "默认板块";
  }
}
function tt(c) {
  const t = String(c || "").trim() || "默认板块";
  try {
    localStorage.setItem(Z, t);
  } catch {
  }
}
function z(c) {
  return typeof c.checked == "boolean" ? c.checked : c.is_completed === !0;
}
const A = "todoistToken", R = "todoistWorkspaceCacheV3", x = "todoistTimedTasksV1", N = "todoistTimerDurationV1", L = "todoistActiveProjectIdV1", H = {
  berry_red: "#b8256f",
  red: "#db4035",
  orange: "#ff9933",
  yellow: "#fad000",
  olive_green: "#afb83b",
  lime_green: "#7ecc49",
  green: "#299438",
  mint_green: "#6accbc",
  teal: "#158fad",
  sky_blue: "#14aaf5",
  light_blue: "#96c3eb",
  blue: "#4073ff",
  grape: "#884dff",
  violet: "#af38eb",
  lavender: "#eb96eb",
  magenta: "#e05194",
  salmon: "#ff8d85",
  charcoal: "#808080",
  grey: "#b8b8b8",
  taupe: "#ccac93"
};
function X(c) {
  if (!c?.date) return c?.string || "";
  const t = String(c.date).slice(0, 10), e = /* @__PURE__ */ new Date(), i = e.toLocaleDateString("en-CA"), a = new Date(e);
  a.setDate(a.getDate() + 1);
  const o = a.toLocaleDateString("en-CA");
  return t === i ? "今天" : t === o ? "明天" : t;
}
function I(c) {
  return Array.isArray(c) ? c : Array.isArray(c?.results) ? c.results : [];
}
class M {
  constructor() {
    this.token = "", this.timerDuration = 30, this.timedTasks = [], this.timerLoaded = !1, this.timerListeners = /* @__PURE__ */ new Set(), this.taskListeners = /* @__PURE__ */ new Set(), this.cachedProjects = [], this.activeProjectId = typeof localStorage < "u" && localStorage.getItem("todoist_active_project_id") || "", this.inboxProjectId = typeof localStorage < "u" && localStorage.getItem("todoist_inbox_project_id") || "", this.activeProjectName = "", this.changeChannel = it(() => this.initToken(), () => {
      this.invalidateWorkspaceSnapshots(), B.dataRevision++;
    }), this.workspaceMemoryCache = /* @__PURE__ */ new Map(), this.workspaceMutationVersion = 0, this.workspaceCacheInvalidated = !1, this.initToken(), this.initTimers();
  }
  static getInstance() {
    return M.instance || (M.instance = new M()), M.instance;
  }
  async initToken() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      chrome.storage.local.remove([
        "todoistWorkspaceCacheV1",
        "todoistWorkspaceCacheV2",
        "lw_cache_inbox",
        "lw_cache_today",
        "lw_cache_projects:default"
      ]).catch?.(() => {
      });
      const t = await chrome.storage.local.get([A, L]);
      this.token = t[A] || "", t[L] && (this.activeProjectId = String(t[L]));
    }
    return this.token;
  }
  setActiveProjectId(t) {
    if (this.activeProjectId = String(t || ""), typeof localStorage < "u")
      try {
        localStorage.setItem("todoist_active_project_id", this.activeProjectId);
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local && this.activeProjectId) {
      const e = this.activeProjectId;
      Y(async () => {
        await chrome.storage.local.set({ [L]: e });
      }).catch(() => console.warn("[Todoist] Project preference persistence failed."));
    }
  }
  getActiveProjectId() {
    return this.activeProjectId;
  }
  getActiveProjectName() {
    return this.activeProjectName;
  }
  setToken(t) {
    if (this.token = t.trim(), typeof chrome < "u" && chrome.storage?.local) {
      const e = this.token;
      Y(async () => {
        await chrome.storage.local.set({ [A]: e });
      }).catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }
  /** Module settings await persistence before switching the active credential. */
  async saveAccountToken(t) {
    const e = t.trim();
    if (!e) throw new Error("请填写 Todoist Token");
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = await chrome.storage.local.get(A);
      if (await chrome.storage.local.set({ [A]: e }), i[A] !== e) {
        const a = Object.keys(await chrome.storage.local.get(null)).filter((o) => o.startsWith("todoistSnapshot:"));
        if (await chrome.storage.local.remove([R, ...a]), typeof localStorage < "u")
          try {
            Object.keys(localStorage).filter((o) => o.startsWith("todoist_fast_snapshot:") || o === "todoist_calendar_cache_v1" || o === "todoist_labels_cache_v1").forEach((o) => localStorage.removeItem(o));
          } catch {
          }
        this.changeChannel.clear?.(), this.invalidateWorkspaceSnapshots();
      }
    } else
      localStorage.setItem(A, e), e !== this.token && this.workspaceMemoryCache.clear();
    this.token = e;
  }
  getToken() {
    return this.token;
  }
  async api(t, e = {}) {
    const i = new AbortController(), a = () => i.abort(e.signal?.reason);
    e.signal?.aborted ? a() : e.signal?.addEventListener("abort", a, { once: !0 });
    let o = !1, s = !1;
    const n = setTimeout(() => {
      o = !0, i.abort();
    }, 15e3);
    try {
      if (i.signal.throwIfAborted(), !this.token) {
        try {
          await this.initToken();
        } catch {
          throw new b("configuration");
        }
        if (i.signal.throwIfAborted(), !this.token) throw new b("configuration");
      }
      const r = this.token;
      if (this.rateLimit?.token === r && this.rateLimit.until > Date.now())
        throw new b("rate-limit", 429, this.rateLimit.until - Date.now());
      const h = new Headers(e.headers || {});
      h.set("Authorization", `Bearer ${r}`), e.body && typeof e.body == "string" && !h.has("Content-Type") && h.set("Content-Type", "application/json");
      const m = t.startsWith("http") ? t : `https://api.todoist.com/api/v1${t}`, y = new URL(m);
      if (y.origin !== "https://api.todoist.com" || y.username || y.password)
        throw new b("configuration");
      const w = String(e.method || "GET").toUpperCase(), u = !["GET", "HEAD"].includes(w), f = { ...e, headers: h, signal: i.signal, credentials: "omit", redirect: "error" };
      s = !0;
      let T = await fetch(m, f);
      if (T.status === 404 && !t.startsWith("http") && !u && (await T.body?.cancel(), T = await fetch(`https://api.todoist.com/rest/v2${t}`, f)), !T.ok) {
        const p = at(T, s);
        throw p.kind === "rate-limit" && (this.rateLimit = { token: r, until: Date.now() + (p.retryAfterMs || 6e4) }), await T.body?.cancel(), p;
      }
      if (u && (r === this.token && (this.invalidateWorkspaceSnapshots(), B.dataRevision++), this.changeChannel.publish(r)), T.status === 204) return null;
      try {
        return await T.json();
      } catch (p) {
        throw i.signal.aborted ? p : new b("invalid-response", T.status, void 0, s);
      }
    } catch (r) {
      throw r instanceof b ? r : i.signal.aborted ? new b(
        e.signal?.aborted ? "cancelled" : o ? "timeout" : "cancelled",
        void 0,
        void 0,
        s
      ) : new b("network", void 0, void 0, s);
    } finally {
      clearTimeout(n), e.signal?.removeEventListener("abort", a);
    }
  }
  isWorkspaceCacheInvalidated() {
    return this.workspaceCacheInvalidated;
  }
  invalidateWorkspaceSnapshots() {
    ++this.workspaceMutationVersion, this.workspaceCacheInvalidated = !0, this.workspaceMemoryCache.clear();
  }
  updateLocalCacheOnTaskCreated(t, e, i, a) {
    const o = this.getWorkspaceCacheKey(e, i), s = this.workspaceMemoryCache.get(o);
    if (s && s.data && Array.isArray(s.data.columns) && s.data.columns.length > 0) {
      let n = s.data.columns.find((r) => a !== void 0 ? r.sectionId === a : t.section_id ? r.sectionId === t.section_id : !1);
      if (n || (n = s.data.columns.find((r) => !r.sectionId) || s.data.columns[0]), n) {
        const r = this.mapTasks([t], (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))[0];
        r && !n.tasks.some((h) => h.id === String(t.id)) && n.tasks.push(r);
      }
    }
  }
  getFastSnapshot(t = "inbox", e) {
    if (this.workspaceCacheInvalidated) return null;
    const i = this.getWorkspaceCacheKey(t, e), a = this.workspaceMemoryCache.get(i);
    if (a?.data?.columns && Array.isArray(a.data.columns) && a.data.columns.length > 0)
      return a.data;
    if (typeof localStorage < "u")
      try {
        const o = localStorage.getItem(`todoist_fast_snapshot:${i}`);
        if (o) {
          const s = JSON.parse(o);
          if (s?.data?.columns && Array.isArray(s.data.columns) && s.data.columns.length > 0)
            return this.workspaceMemoryCache.set(i, s), s.data;
        }
      } catch {
      }
    return null;
  }
  getWorkspaceCacheKey(t, e) {
    return t === "projects" ? `v3:projects:${e || this.activeProjectId || "default"}` : `v3:${t}`;
  }
  async getCachedWorkspaceData(t = "inbox", e) {
    const i = this.getWorkspaceCacheKey(t, e), a = this.workspaceMemoryCache.get(i);
    if (a && a.data)
      return a.data;
    if (this.workspaceCacheInvalidated) return null;
    const o = this.workspaceMutationVersion;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const s = `todoistSnapshot:${i}`, n = await chrome.storage.local.get(s);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const r = n[s];
        if (r?.data?.columns && Array.isArray(r.data.columns) && Date.now() - r.timestamp < 30 * 864e5) {
          if (this.workspaceMemoryCache.set(i, r), typeof localStorage < "u")
            try {
              localStorage.setItem(`todoist_fast_snapshot:${i}`, JSON.stringify(r));
            } catch {
            }
          return r.data;
        }
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const s = await chrome.storage.local.get([R]);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const n = s[R] || {}, r = n[i] || (t !== "projects" ? n[t] : null);
        if (r?.columns && Array.isArray(r.columns)) {
          const h = {
            columns: r.columns,
            projects: (n.projectsMeta?.projects || []).map((d) => ({
              id: String(d.id),
              name: d.name,
              color: d.color,
              colorHex: H[d.color || ""] || "#0ea5e9"
            })),
            activeProjectId: n.projectsMeta?.activeProjectId || e || this.activeProjectId || "",
            activeProjectName: n.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(r.columns.flatMap((d) => d.tasks.flatMap((m) => m.labels || [])))
            ).filter(Boolean)
          };
          return this.workspaceMemoryCache.set(i, { data: h, timestamp: r.savedAt || Date.now() }), h;
        }
      } catch {
      }
    return null;
  }
  async loadWorkspaceData(t = "inbox", e, i = !1, a) {
    if (await this.initToken(), a?.throwIfAborted(), !this.token) {
      const o = await this.getCachedWorkspaceData(t, e);
      return a?.throwIfAborted(), o || { columns: [], projects: [], activeProjectId: "", activeProjectName: "", availableLabels: [] };
    }
    if (!i && !this.workspaceCacheInvalidated) {
      const o = this.getWorkspaceCacheKey(t, e), s = await this.getCachedWorkspaceData(t, e), n = this.workspaceMemoryCache.get(o), r = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"), h = t === "today" && n?.timestamp ? new Date(n.timestamp).toLocaleDateString("en-CA") !== r : !1;
      if (s && s.columns?.length && !h)
        return s;
    }
    return this.fetchWorkspaceDataOnline(t, e, a);
  }
  async fetchWorkspaceDataOnline(t = "inbox", e, i) {
    const a = this.workspaceMutationVersion, o = () => {
      if (i?.throwIfAborted(), a !== this.workspaceMutationVersion) throw new Error("任务位置已变化，旧看板读取失效");
    };
    o();
    const s = this.getWorkspaceCacheKey(t, e);
    try {
      const n = e || this.activeProjectId, r = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"), h = this.getProjects(i);
      let d, m;
      if (t === "projects" && n)
        d = this.getSections(n, i), m = this.getTasksByProject(n, i);
      else if (t === "today")
        d = Promise.resolve([]), m = this.getTasks("today | overdue", i);
      else {
        const l = this.inboxProjectId;
        l ? (d = this.getSections(l, i), m = this.getTasksByProject(l, i)) : (d = Promise.resolve([]), m = Promise.resolve([]));
      }
      const [y, w, u] = await Promise.all([
        h,
        d,
        m
      ]);
      o();
      const f = y.filter(
        (l) => !l.inbox_project && !l.is_inbox_project && !/^(Inbox|收件箱)$/i.test(l.name) && !l.is_archived && !l.is_deleted
      );
      this.cachedProjects = f;
      const T = f.map((l) => ({
        id: String(l.id),
        name: l.name,
        color: l.color,
        colorHex: H[l.color || ""] || "#0ea5e9"
      }));
      if (e) {
        this.setActiveProjectId(String(e));
        const l = f.find((g) => String(g.id) === String(e));
        this.activeProjectName = l?.name || "";
      } else if (this.activeProjectId && f.some((l) => String(l.id) === String(this.activeProjectId))) {
        const l = f.find((g) => String(g.id) === String(this.activeProjectId));
        this.activeProjectName = l?.name || this.activeProjectName || "";
      } else f.length > 0 ? (this.setActiveProjectId(String(f[0].id)), this.activeProjectName = f[0].name) : (this.setActiveProjectId(""), this.activeProjectName = "");
      let p = [];
      if (t === "projects" && this.activeProjectId) {
        let l = w, g = u;
        if (n !== this.activeProjectId || w.length === 0 && u.length === 0) {
          const [S, _] = await Promise.all([
            this.getSections(this.activeProjectId, i),
            this.getTasksByProject(this.activeProjectId, i)
          ]);
          l = S, g = _;
        }
        const C = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(g.filter((S) => !S.section_id), r)
        };
        p.push(C);
        for (const S of l)
          p.push({
            projectId: this.activeProjectId,
            sectionId: String(S.id),
            title: S.name,
            tasks: this.mapTasks(g.filter((_) => String(_.section_id) === String(S.id)), r)
          });
      } else if (t === "today") {
        const l = u, g = l.filter((S) => {
          const _ = S.due?.date ? String(S.due.date).slice(0, 10) : "";
          return _ && _ < r;
        }), C = l.filter((S) => {
          const _ = S.due?.date ? String(S.due.date).slice(0, 10) : "";
          return _ === r || !_ && S.due?.string;
        });
        p = [
          { sectionId: "overdue", title: "已逾期", tasks: this.mapTasks(g, r, "day_order") },
          { sectionId: "today", title: "今天", tasks: this.mapTasks(C, r, "day_order") }
        ];
      } else {
        const l = y.find((g) => g.inbox_project || g.is_inbox_project) || y.find((g) => /^(Inbox|收件箱)$/i.test(g.name));
        if (l) {
          const g = String(l.id);
          if (this.inboxProjectId = g, typeof localStorage < "u")
            try {
              localStorage.setItem("todoist_inbox_project_id", g);
            } catch {
            }
          let C = w, S = u;
          if (!this.inboxProjectId || w.length === 0 && u.length === 0) {
            const [P, U] = await Promise.all([
              this.getSections(g, i),
              this.getTasksByProject(g, i)
            ]);
            C = P, S = U;
          }
          const _ = {
            projectId: g,
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(S.filter((P) => !P.section_id), r)
          };
          p.push(_);
          for (const P of C)
            p.push({
              projectId: g,
              sectionId: String(P.id),
              title: P.name,
              tasks: this.mapTasks(S.filter((U) => String(U.section_id) === String(P.id)), r)
            });
        } else {
          const C = (await this.getTasks(void 0, i)).filter((S) => !S.section_id);
          p = [
            { sectionId: "", title: "收件箱", tasks: this.mapTasks(C, r) }
          ];
        }
      }
      o();
      const D = Array.from(
        new Set(p.flatMap((l) => l.tasks.flatMap((g) => g.labels || [])))
      ).filter(Boolean), v = {
        columns: p,
        projects: T,
        activeProjectId: this.activeProjectId,
        activeProjectName: this.activeProjectName,
        availableLabels: D
      }, j = this.getWorkspaceCacheKey(t, this.activeProjectId), k = { data: v, timestamp: Date.now() };
      if (this.workspaceMemoryCache.set(j, k), s !== j && this.workspaceMemoryCache.set(s, k), this.workspaceCacheInvalidated = !1, typeof localStorage < "u")
        try {
          const l = JSON.stringify(k);
          localStorage.setItem(`todoist_fast_snapshot:${j}`, l), s !== j && localStorage.setItem(`todoist_fast_snapshot:${s}`, l);
        } catch {
        }
      if (typeof chrome < "u" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({
            [`todoistSnapshot:${j}`]: k,
            [`todoistSnapshot:${s}`]: k
          });
        } catch (l) {
          console.warn("[Todoist] Snapshot persistence failed", l);
        }
        o();
      }
      return this.changeChannel.markSynced?.(this.token), v;
    } catch (n) {
      if (o(), console.warn("[TodoistService] Online fetch failed, fallback to local cache:", n), this.workspaceCacheInvalidated) throw n;
      const r = await this.getCachedWorkspaceData(t, e);
      if (r) return { ...r, readWarning: q(n) };
      throw n;
    }
  }
  mapTasks(t, e, i = "child_order") {
    const a = nt();
    return [...t].sort((o, s) => {
      const n = Number(o[i]), r = Number(s[i]);
      return Number.isFinite(n) && Number.isFinite(r) ? n - r : 0;
    }).map((o) => {
      const s = o.due?.date ? String(o.due.date).slice(0, 10) : "", n = s === e, r = !!(s && s < e), h = !!o.due?.recurring, d = this.timedTasks.find((m) => String(m.taskId) === String(o.id));
      return {
        id: String(o.id),
        content: o.content || "未命名任务",
        description: o.description || "",
        completed: z(o),
        dueDate: o.due?.date || "",
        startDate: a(String(o.id), o.description || ""),
        dueText: X(o.due),
        dueString: o.due?.string || X(o.due),
        isOverdue: r,
        isDueToday: n,
        isRecurring: h,
        priority: o.priority ? Number(o.priority) : 1,
        labels: Array.isArray(o.labels) ? o.labels : [],
        timedDeadlineText: d ? this.formatTimerDeadline(d) : "",
        timedDurationMinutes: d?.durationMinutes,
        url: o.url || `https://app.todoist.com/app/task/${o.id}`,
        _taskRaw: o
      };
    });
  }
  // ==========================================================================
  // 日历模块协同与事件广播 (`window.LogicWeaverTodoistTasks`)
  // ==========================================================================
  async listCalendarTasks(t) {
    if (t?.throwIfAborted(), await this.initToken(), t?.throwIfAborted(), !this.token) throw new Error("Todoist 尚未配置，未读取日历任务");
    const e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
    let a = "";
    for (let o = 0; o < 100; o++) {
      t?.throwIfAborted();
      const s = new URLSearchParams({ limit: "200" });
      a && s.set("cursor", a);
      const n = await this.api(`/tasks?${s}`, { signal: t }), r = I(n);
      for (const d of r) d?.id && !z(d) && e.set(String(d.id), d);
      const h = String(n?.next_cursor || "");
      if (!h) return [...e.values()];
      if (i.has(h)) throw new Error("日历任务分页游标重复");
      i.add(h), a = h;
    }
    throw new Error("日历任务分页超出上限，未应用不完整列表");
  }
  async setTaskDueDate(t, e) {
    const i = String(e || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(i)) throw new Error("截止日期格式无效");
    const a = await this.updateTask(t, { due_string: i });
    return this.broadcastTaskChange({ type: "due", task: a, date: i }), a;
  }
  subscribeTasks(t) {
    return this.taskListeners.add(t), () => this.taskListeners.delete(t);
  }
  broadcastTaskChange(t) {
    this.taskListeners.forEach((e) => {
      try {
        e(t);
      } catch {
      }
    });
  }
  // ==========================================================================
  // 番茄钟与限时任务管理 (`window.LogicWeaverTodoistTimer`)
  // ==========================================================================
  async initTimers() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const t = await chrome.storage.local.get([x, N]);
        Array.isArray(t[x]) && (this.timedTasks = t[x]), t[N] && (this.timerDuration = Number(t[N]) || 30), this.timerLoaded = !0, this.emitTimerState();
      } catch {
      }
  }
  getTimerSnapshot() {
    return {
      items: [...this.timedTasks].sort((t, e) => t.deadlineAt - e.deadlineAt),
      duration: this.timerDuration,
      loaded: this.timerLoaded
    };
  }
  async setTimerDuration(t) {
    return this.timerDuration = Math.max(5, Math.min(480, Math.round(t / 5) * 5)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [N]: this.timerDuration }), this.emitTimerState(), this.timerDuration;
  }
  async createTimer(t, e = this.timerDuration) {
    const i = t.trim();
    if (!i) throw new Error("请输入任务名称");
    const a = await this.createTask({ content: i }), o = Date.now(), s = {
      id: `timer-${a.id}`,
      taskId: String(a.id),
      title: i,
      durationMinutes: e,
      createdAt: o,
      deadlineAt: o + e * 6e4,
      alertedAt: 0,
      url: a.url
    };
    return this.timedTasks.push(s), await this.persistTimers(), s;
  }
  async completeTimer(t) {
    const e = this.timedTasks.find((i) => i.id === t);
    e && (await this.toggleTaskCompletion(e.taskId, !0), this.timedTasks = this.timedTasks.filter((i) => i.id !== t), await this.persistTimers(), this.broadcastTaskChange({ type: "removed", task: { id: e.taskId } }));
  }
  async snoozeTimer(t, e = 5) {
    const i = this.timedTasks.find((a) => a.id === t);
    if (!i) throw new Error("限时任务不存在");
    return i.deadlineAt = Date.now() + Math.max(1, e) * 6e4, i.alertedAt = 0, await this.persistTimers(), i;
  }
  async claimExpiredTimer(t) {
    const e = this.timedTasks.find((i) => i.id === t);
    return !e || e.deadlineAt > Date.now() || e.alertedAt > 0 ? null : (e.alertedAt = Date.now(), await this.persistTimers(), { ...e });
  }
  subscribeTimer(t) {
    return this.timerListeners.add(t), t(this.getTimerSnapshot()), () => this.timerListeners.delete(t);
  }
  async persistTimers() {
    typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [x]: this.timedTasks }), this.emitTimerState();
  }
  emitTimerState() {
    const t = this.getTimerSnapshot();
    this.timerListeners.forEach((e) => {
      try {
        e(t);
      } catch {
      }
    });
  }
  formatTimerDeadline(t) {
    const e = new Date(t.deadlineAt);
    if (!Number.isFinite(e.getTime())) return "";
    const i = /* @__PURE__ */ new Date(), a = e.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 });
    return e.toDateString() === i.toDateString() ? `截止 ${a}` : `截止 ${e.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} ${a}`;
  }
  // ==========================================================================
  // 标准 REST API 原生 CRUD
  // ==========================================================================
  getDefaultSectionName() {
    return Q();
  }
  setDefaultSectionName(t) {
    tt(t);
  }
  async getProjects(t) {
    const e = await this.api("/projects?limit=200", { signal: t });
    return I(e);
  }
  async getSections(t, e) {
    const i = await this.api(`/sections?project_id=${encodeURIComponent(t)}&limit=200`, { signal: e });
    return I(i);
  }
  async getTasks(t, e) {
    if (t)
      try {
        const a = await this.api(`/tasks/filter?query=${encodeURIComponent(t)}`, { signal: e });
        return I(a);
      } catch (a) {
        if (e?.throwIfAborted(), !(a instanceof b) || a.kind !== "not-found") throw a;
        try {
          const o = await this.api(`/tasks?filter=${encodeURIComponent(t)}`, { signal: e });
          return I(o);
        } catch (o) {
          if (e?.throwIfAborted(), !(o instanceof b) || o.kind !== "not-found") throw o;
          const s = await this.api("/tasks?limit=200", { signal: e });
          return I(s);
        }
      }
    const i = await this.api("/tasks?limit=200", { signal: e });
    return I(i);
  }
  async getTasksByProject(t, e) {
    const i = await this.api(`/tasks?project_id=${encodeURIComponent(t)}&limit=200`, { signal: e });
    return I(i);
  }
  async toggleTaskCompletion(t, e) {
    const i = e ? `/tasks/${encodeURIComponent(t)}/close` : `/tasks/${encodeURIComponent(t)}/reopen`;
    await this.api(i, { method: "POST" });
  }
  async reopenTask(t) {
    await this.api(`/tasks/${encodeURIComponent(t)}/reopen`, { method: "POST" }), this.broadcastTaskChange({ type: "updated", task: { id: t, checked: !1, is_completed: !1 } });
  }
  async updateTask(t, e) {
    return this.api(`/tasks/${encodeURIComponent(t)}`, {
      method: "POST",
      body: JSON.stringify(e)
    });
  }
  async createTask(t, e) {
    return this.api("/tasks", {
      method: "POST",
      headers: e ? { "X-Request-Id": e } : void 0,
      body: JSON.stringify(t)
    });
  }
  /**
   * 上传二进制文件/图片至 Todoist 官方云端存储 (Sync API v9 uploads)
   */
  async uploadFile(t, e = "image.png") {
    if (!this.token && (await this.initToken(), !this.token))
      throw new Error("请先在设置中配置 Todoist Token");
    const i = e.match(/\.[a-zA-Z0-9]+$/), a = i ? i[0] : ".png", o = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${a}`, s = new FormData();
    s.append("file", t, o);
    const n = new Headers();
    n.set("Authorization", `Bearer ${this.token}`);
    const r = new AbortController(), h = setTimeout(() => r.abort(), 15e3);
    try {
      let d = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers: n,
        body: s,
        signal: r.signal
      });
      if (d.status === 404 && (d = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
        method: "POST",
        headers: n,
        body: s,
        signal: r.signal
      })), d.ok)
        return await d.json();
      const m = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: m,
        upload_state: "completed"
      };
    } catch {
      const d = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: d,
        upload_state: "completed"
      };
    } finally {
      clearTimeout(h);
    }
  }
  async fileToOptimizedDataUrl(t) {
    return new Promise((e) => {
      if (typeof window > "u" || typeof document > "u" || !(t instanceof Blob)) {
        e("");
        return;
      }
      const i = new FileReader();
      i.onload = () => {
        const a = String(i.result || "");
        if (t.size <= 64 * 1024) {
          e(a);
          return;
        }
        const o = new Image();
        o.onload = () => {
          try {
            let n = o.width, r = o.height;
            (n > 800 || r > 800) && (n > r ? (r = Math.round(r * 800 / n), n = 800) : (n = Math.round(n * 800 / r), r = 800));
            const h = document.createElement("canvas");
            h.width = n, h.height = r;
            const d = h.getContext("2d");
            if (d) {
              d.drawImage(o, 0, 0, n, r);
              const m = h.toDataURL("image/webp", 0.72);
              e(m.length < a.length ? m : a);
              return;
            }
          } catch {
          }
          e(a);
        }, o.onerror = () => e(a), o.src = a;
      }, i.onerror = () => e(""), i.readAsDataURL(t);
    });
  }
  /**
   * 为任务添加评论与附件
   */
  async addComment(t) {
    return this.api("/comments", {
      method: "POST",
      body: JSON.stringify(t)
    });
  }
  /**
   * 创建任务并附带上传好的图片附件（同时在 description 注入 Markdown 预览并在评论区关联附件）
   */
  async createTaskWithAttachments(t) {
    let e = t.description || "";
    const i = t.attachments || [];
    if (i.length > 0)
      for (const o of i)
        e += `

![${o.file_name}](${o.file_url})`;
    const a = await this.createTask({
      content: t.content,
      description: e.trim() || void 0,
      project_id: t.project_id,
      section_id: t.section_id,
      due_string: t.due_string,
      due_date: t.due_date,
      due_datetime: t.due_datetime,
      priority: t.priority,
      labels: t.labels
    });
    if (a && a.id && i.length > 0)
      for (const o of i)
        try {
          await this.addComment({
            task_id: String(a.id),
            content: `📎 附件图片: ${o.file_name}`,
            attachment: {
              resource_type: "file",
              file_url: o.file_url,
              file_name: o.file_name,
              file_type: o.file_type
            }
          });
        } catch (s) {
          console.warn("[Todoist] Add comment attachment failed:", s);
        }
    return a;
  }
  async deleteTask(t) {
    await this.api(`/tasks/${encodeURIComponent(t)}`, { method: "DELETE" });
  }
  async moveTask(t, e) {
    if (!t || t.startsWith("optimistic-") || !e.projectId) throw new Error("任务或目标项目尚未就绪");
    const i = e.sectionId ? { section_id: e.sectionId } : { project_id: e.projectId };
    try {
      const a = await this.api(`/tasks/${encodeURIComponent(t)}/move`, {
        method: "POST",
        body: JSON.stringify(i)
      });
      if (!a || String(a.id) !== t || String(a.project_id) !== e.projectId || String(a.section_id || "") !== e.sectionId) throw new Error("任务移动回复未确认目标，请刷新核对");
      return a;
    } finally {
      this.invalidateWorkspaceSnapshots();
    }
  }
  async moveTaskToProject(t, e) {
    return this.moveTask(t, { projectId: e, sectionId: "" });
  }
  async reorderTask(t, e, i = !1) {
    if (!t || t.startsWith("optimistic-") || !Number.isInteger(e) || e < 1)
      throw new Error("任务排序参数无效");
    try {
      const a = await this.updateTask(t, i ? { day_order: e } : { child_order: e });
      if (!a || String(a.id) !== t || Number(a[i ? "day_order" : "child_order"]) !== e)
        throw new Error("任务排序回复未确认，请刷新核对");
      return a;
    } finally {
      this.invalidateWorkspaceSnapshots();
    }
  }
  async createSection(t, e) {
    return this.api("/sections", {
      method: "POST",
      body: JSON.stringify({ name: t.trim(), project_id: e })
    });
  }
  async renameSection(t, e) {
    return this.api(`/sections/${encodeURIComponent(t)}`, {
      method: "POST",
      body: JSON.stringify({ name: e.trim() })
    });
  }
  async deleteSection(t) {
    const e = String(t || "").trim();
    if (e) {
      this.invalidateWorkspaceSnapshots(), await this.api(`/sections/${encodeURIComponent(e)}`, { method: "DELETE" });
      try {
        await W.remove(this.getWorkspaceCacheKey("inbox")), await W.remove(this.getWorkspaceCacheKey("today")), await W.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId)), await W.remove("v3:projects:default");
      } catch {
      }
    }
  }
  async createProject(t) {
    return this.api("/projects", {
      method: "POST",
      body: JSON.stringify({ name: t.trim() })
    });
  }
  async renameProject(t, e) {
    return this.api(`/projects/${encodeURIComponent(t)}`, {
      method: "POST",
      body: JSON.stringify({ name: e.trim() })
    });
  }
  async deleteProject(t) {
    await this.api(`/projects/${encodeURIComponent(t)}`, { method: "DELETE" });
  }
  /**
   * 获取指定任务的全部评论与文件附件列表
   */
  async getComments(t, e) {
    const i = await this.api(`/comments?task_id=${encodeURIComponent(t)}`, { signal: e });
    return I(i);
  }
  /**
   * 查询历史已完成任务列表 (Sync API v9 /completed/get_all)
   */
  async getCompletedTasks(t = {}, e) {
    if (e?.throwIfAborted(), await this.initToken(), e?.throwIfAborted(), !this.token) throw new Error("请先配置 Todoist 账户");
    const i = t.until || (/* @__PURE__ */ new Date()).toISOString(), a = t.since || new Date(Date.parse(i) - 30 * 864e5).toISOString();
    if (!Number.isFinite(Date.parse(a)) || !Number.isFinite(Date.parse(i)) || Date.parse(a) >= Date.parse(i))
      throw new Error("完成历史日期范围无效");
    const o = [], s = /* @__PURE__ */ new Set();
    let n = "";
    for (let r = 0; r < 100; r++) {
      const h = new URLSearchParams({
        since: a,
        until: i,
        limit: String(Math.max(1, Math.min(200, t.limit || 200)))
      });
      t.project_id && h.set("project_id", t.project_id), n && h.set("cursor", n);
      const d = await this.api(`https://api.todoist.com/api/v1/tasks/completed/by_completion_date?${h}`, { signal: e });
      if (e?.throwIfAborted(), !Array.isArray(d?.items)) throw new Error("完成历史返回格式无效");
      for (const y of d.items) {
        if (!y || typeof y.id != "string" || typeof y.content != "string" || typeof y.completed_at != "string" || !Number.isFinite(Date.parse(y.completed_at)))
          throw new Error("完成历史任务格式无效");
        o.push({ ...y, task_id: y.id, completed_at: y.completed_at });
      }
      const m = d.next_cursor;
      if (m == null || m === "") return { items: o };
      if (typeof m != "string" || s.has(m)) throw new Error("完成历史分页无效");
      s.add(m), n = m;
    }
    throw new Error("完成历史分页超出上限，未应用不完整列表");
  }
  /**
   * 获取 Todoist 云端个人标签库 (REST API v2 /labels)
   */
  async getLabels(t) {
    const e = await this.api("/labels", { signal: t });
    return I(e);
  }
  /**
   * 在云端创建新标签
   */
  async createLabel(t, e) {
    return this.api("/labels", {
      method: "POST",
      body: JSON.stringify({ name: t.trim(), color: e })
    });
  }
  /**
   * 在云端删除标签
   */
  async deleteLabel(t) {
    await this.api(`/labels/${encodeURIComponent(t)}`, { method: "DELETE" });
  }
}
const dt = et(M.getInstance(), [
  "saveAccountToken",
  "setTaskDueDate",
  "setTimerDuration",
  "createTimer",
  "completeTimer",
  "snoozeTimer",
  "claimExpiredTimer",
  "uploadFile",
  "createTaskWithAttachments"
], !0), gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TODOIST_ACTIVE_PROJECT_ID_KEY: L,
  TODOIST_TIMED_TASKS_KEY: x,
  TODOIST_TIMER_DURATION_KEY: N,
  TODOIST_TOKEN_KEY: A,
  TODOIST_WORKSPACE_CACHE_KEY: R,
  TodoistService: M,
  getDefaultSectionName: Q,
  isTodoistTaskCompleted: z,
  setDefaultSectionName: tt,
  todoistService: dt
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as T,
  q as a,
  st as b,
  nt as c,
  mt as d,
  gt as e,
  ut as f,
  ct as g,
  z as i,
  pt as p,
  ft as s,
  dt as t
};
