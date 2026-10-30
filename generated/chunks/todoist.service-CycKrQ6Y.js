import { a as Q, w as F, t as z } from "./module-state-Dt_XKbbf.js";
import { s as L } from "./storage-cache.service-BYF2zxXX.js";
const U = "todoist_change_revision_v1";
async function V(c) {
  const t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("todoist-invalidation-v1:" + c));
  return Array.from(new Uint8Array(t), (e) => e.toString(16).padStart(2, "0")).join("");
}
function tt(c, t) {
  let e = "";
  async function i(o) {
    try {
      if (!o || o.length > 512) return;
      const a = JSON.parse(o);
      if (a.version !== 1 || !/^[a-f0-9]{64}$/.test(a.scope) || typeof a.revision != "string" || !/^[a-f0-9-]{36}$/.test(a.revision)) return;
      const n = await c();
      if (!n || a.scope !== await V(n) || n !== await c() || e === a.revision) return;
      e = a.revision, t();
    } catch {
    }
  }
  function r() {
    if (!document.hidden)
      try {
        i(localStorage.getItem(U));
      } catch {
      }
  }
  return window.addEventListener("storage", (o) => {
    o.key === U && i(o.newValue);
  }), document.addEventListener("visibilitychange", r), window.addEventListener("pageshow", r), {
    async publish(o) {
      try {
        if (!o) return;
        const a = { version: 1, scope: await V(o), revision: crypto.randomUUID() };
        localStorage.setItem(U, JSON.stringify(a)), o === await c() && (e = a.revision);
      } catch {
        console.warn("[Todoist] Cross-page invalidation unavailable; refresh other pages manually.");
      }
    }
  };
}
class _ extends Error {
  constructor(t, e, i, r = !1) {
    super(H({ kind: t, status: e, retryAfterMs: i })), this.kind = t, this.status = e, this.retryAfterMs = i, this.submitted = r, this.name = t === "cancelled" ? "AbortError" : "TodoistApiError";
  }
}
function et(c, t = Date.now()) {
  if (!c) return 6e4;
  const e = Number(c), i = Number.isFinite(e) ? e * 1e3 : Date.parse(c) - t;
  return Number.isFinite(i) ? Math.max(1e3, i) : 6e4;
}
function it(c, t = !1) {
  const e = c.status;
  return new _(
    e === 401 || e === 403 ? "auth" : e === 429 ? "rate-limit" : e === 404 || e === 410 ? "not-found" : "http",
    e,
    e === 429 ? et(c.headers.get("retry-after")) : void 0,
    t
  );
}
function H(c) {
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
const X = "todoist_task_start_dates";
function J() {
  if (typeof window > "u" || !window.localStorage) return {};
  try {
    const c = localStorage.getItem(X);
    return c ? JSON.parse(c) : {};
  } catch {
    return {};
  }
}
function ot(c) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      localStorage.setItem(X, JSON.stringify(c));
    } catch {
    }
}
function rt(c) {
  if (!c) return { date: "", time: "" };
  const e = String(c).trim().match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/);
  return e ? {
    date: e[1] || "",
    time: e[2] || ""
  } : { date: "", time: "" };
}
function lt(c, t) {
  const e = String(c || "").trim(), i = String(t || "").trim();
  return e ? i ? `${e} ${i}` : e : "";
}
function at() {
  const c = J();
  return (t, e) => st(t, e, c);
}
function st(c, t, e = J()) {
  if (!c) return "";
  if (e[c]) return e[c];
  if (t) {
    const i = t.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (i && i[1])
      return i[1].replace("T", " ");
  }
  return "";
}
function ht(c, t) {
  if (!c) return;
  const e = J(), i = String(t || "").trim();
  i && /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2})?$/.test(i) ? e[c] = i : delete e[c], ot(e);
}
function mt(c, t) {
  if (!c && !t) return "";
  const { date: e, time: i } = rt(c), r = t || i;
  if (!e) return r ? `${r}` : "";
  const o = e.slice(5);
  return r ? `${o} ${r}` : o;
}
function E(c) {
  return c < 10 ? `0${c}` : String(c);
}
function $(c) {
  return `${c.getFullYear()}-${E(c.getMonth() + 1)}-${E(c.getDate())}`;
}
function ut(c, t = /* @__PURE__ */ new Date()) {
  if (!c || typeof c != "string") return null;
  const e = c.trim();
  if (!e) return null;
  let i = e, r = "", o = "";
  const a = /(?:(上午|下午|晚上|中午|早晨|清晨|凌晨))?\s*(\d{1,2})(?:点|:|：)(\d{1,2}|半)?(?:分)?/, n = i.match(a);
  if (n && (n[1] || n[0].includes("点") || n[0].includes(":") || n[0].includes("："))) {
    const w = n[1] || "";
    let f = parseInt(n[2], 10), m = 0;
    n[3] === "半" ? m = 30 : n[3] && (m = parseInt(n[3], 10)), w === "下午" || w === "晚上" ? f < 12 && (f += 12) : w === "中午" ? f < 11 && (f += 12) : w === "凌晨" && f === 12 && (f = 0), f >= 0 && f <= 23 && m >= 0 && m <= 59 && (r = `${E(f)}:${E(m)}`, o = n[0]);
  }
  const s = [
    { regex: /(大后天)/i, offset: 3, label: "大后天" },
    { regex: /(后天)/i, offset: 2, label: "后天" },
    { regex: /(明天|明日|次日|明早|明晚|\btomorrow\b)/i, offset: 1, label: "明天" },
    { regex: /(今天|今日|今晚|今早|今夜|\btoday\b)/i, offset: 0, label: "今天" },
    { regex: /(昨天|昨日|\byesterday\b)/i, offset: -1, label: "昨天" }
  ];
  for (const w of s) {
    const f = i.match(w.regex);
    if (f) {
      const m = new Date(t.getFullYear(), t.getMonth(), t.getDate() + w.offset), T = f[1];
      let p = i.replace(T, " ");
      return o && (p = p.replace(o, " ")), p = p.replace(/\s+/g, " ").trim() || e, {
        date: $(m),
        formattedDate: $(m).slice(5),
        label: w.label,
        matchedText: (T + (o ? " " + o.trim() : "")).trim(),
        cleanTitle: p,
        time: r || void 0
      };
    }
  }
  const h = /((下|本|这)?(?:个)?(?:周|星期|礼拜)([一二三四五六日天1-7]|末))/i, d = i.match(h);
  if (d) {
    const w = d[1], f = d[2] || "", m = d[3], p = {
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
    }[m];
    if (p !== void 0) {
      const D = t.getDay();
      let v = p - D;
      f === "下" ? v = (v <= 0 ? v + 7 : v) + 7 : v <= 0 && (v += 7);
      const j = new Date(t.getFullYear(), t.getMonth(), t.getDate() + v);
      let S = i.replace(w, " ");
      o && (S = S.replace(o, " ")), S = S.replace(/\s+/g, " ").trim() || e;
      const l = (f === "下" ? "下" : "") + "周" + (p === 0 ? "日" : m === "末" ? "六" : m);
      return {
        date: $(j),
        formattedDate: $(j).slice(5),
        label: l,
        matchedText: (w + (o ? " " + o.trim() : "")).trim(),
        cleanTitle: S,
        time: r || void 0
      };
    }
  }
  const u = /(?:(\d{4})[-/年])?(\d{1,2})[-/月](\d{1,2})[日号]?/, y = i.match(u);
  if (y) {
    const w = y[0], f = y[1] ? parseInt(y[1], 10) : t.getFullYear(), m = parseInt(y[2], 10), T = parseInt(y[3], 10);
    if (m >= 1 && m <= 12 && T >= 1 && T <= 31) {
      const p = new Date(f, m - 1, T);
      let D = i.replace(w, " ");
      return o && (D = D.replace(o, " ")), D = D.replace(/\s+/g, " ").trim() || e, {
        date: $(p),
        formattedDate: `${E(m)}-${E(T)}`,
        label: `${m}月${T}日`,
        matchedText: (w + (o ? " " + o.trim() : "")).trim(),
        cleanTitle: D,
        time: r || void 0
      };
    }
  }
  return null;
}
const q = "todoistDefaultSectionName";
function G() {
  try {
    return localStorage.getItem(q) || "默认板块";
  } catch {
    return "默认板块";
  }
}
function Z(c) {
  const t = String(c || "").trim() || "默认板块";
  try {
    localStorage.setItem(q, t);
  } catch {
  }
}
function K(c) {
  return typeof c.checked == "boolean" ? c.checked : c.is_completed === !0;
}
const C = "todoistToken", R = "todoistWorkspaceCacheV3", O = "todoistTimedTasksV1", x = "todoistTimerDurationV1", N = "todoistActiveProjectIdV1", Y = {
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
function B(c) {
  if (!c?.date) return c?.string || "";
  const t = String(c.date).slice(0, 10), e = /* @__PURE__ */ new Date(), i = e.toLocaleDateString("en-CA"), r = new Date(e);
  r.setDate(r.getDate() + 1);
  const o = r.toLocaleDateString("en-CA");
  return t === i ? "今天" : t === o ? "明天" : t;
}
function I(c) {
  return Array.isArray(c) ? c : Array.isArray(c?.results) ? c.results : [];
}
class M {
  constructor() {
    this.token = "", this.timerDuration = 30, this.timedTasks = [], this.timerLoaded = !1, this.timerListeners = /* @__PURE__ */ new Set(), this.taskListeners = /* @__PURE__ */ new Set(), this.cachedProjects = [], this.activeProjectId = typeof localStorage < "u" && localStorage.getItem("todoist_active_project_id") || "", this.inboxProjectId = typeof localStorage < "u" && localStorage.getItem("todoist_inbox_project_id") || "", this.activeProjectName = "", this.changeChannel = tt(() => this.initToken(), () => {
      this.invalidateWorkspaceSnapshots(), z.dataRevision++;
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
      const t = await chrome.storage.local.get([C, N]);
      this.token = t[C] || "", t[N] && (this.activeProjectId = String(t[N]));
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
      F(async () => {
        await chrome.storage.local.set({ [N]: e });
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
      F(async () => {
        await chrome.storage.local.set({ [C]: e });
      }).catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }
  /** Module settings await persistence before switching the active credential. */
  async saveAccountToken(t) {
    const e = t.trim();
    if (!e) throw new Error("请填写 Todoist Token");
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = await chrome.storage.local.get(C);
      if (await chrome.storage.local.set({ [C]: e }), i[C] !== e) {
        const r = Object.keys(await chrome.storage.local.get(null)).filter((o) => o.startsWith("todoistSnapshot:"));
        await chrome.storage.local.remove([R, ...r]), this.invalidateWorkspaceSnapshots();
      }
    } else
      localStorage.setItem(C, e), e !== this.token && this.workspaceMemoryCache.clear();
    this.token = e;
  }
  getToken() {
    return this.token;
  }
  async api(t, e = {}) {
    const i = new AbortController(), r = () => i.abort(e.signal?.reason);
    e.signal?.aborted ? r() : e.signal?.addEventListener("abort", r, { once: !0 });
    let o = !1, a = !1;
    const n = setTimeout(() => {
      o = !0, i.abort();
    }, 15e3);
    try {
      if (i.signal.throwIfAborted(), !this.token) {
        try {
          await this.initToken();
        } catch {
          throw new _("configuration");
        }
        if (i.signal.throwIfAborted(), !this.token) throw new _("configuration");
      }
      const s = this.token;
      if (this.rateLimit?.token === s && this.rateLimit.until > Date.now())
        throw new _("rate-limit", 429, this.rateLimit.until - Date.now());
      const h = new Headers(e.headers || {});
      h.set("Authorization", `Bearer ${s}`), e.body && typeof e.body == "string" && !h.has("Content-Type") && h.set("Content-Type", "application/json");
      const u = t.startsWith("http") ? t : `https://api.todoist.com/api/v1${t}`, y = new URL(u);
      if (y.origin !== "https://api.todoist.com" || y.username || y.password)
        throw new _("configuration");
      const w = String(e.method || "GET").toUpperCase(), f = !["GET", "HEAD"].includes(w), m = { ...e, headers: h, signal: i.signal, credentials: "omit", redirect: "error" };
      a = !0;
      let T = await fetch(u, m);
      if (T.status === 404 && !t.startsWith("http") && !f && (await T.body?.cancel(), T = await fetch(`https://api.todoist.com/rest/v2${t}`, m)), !T.ok) {
        const p = it(T, a);
        throw p.kind === "rate-limit" && (this.rateLimit = { token: s, until: Date.now() + (p.retryAfterMs || 6e4) }), await T.body?.cancel(), p;
      }
      if (f && (s === this.token && (this.invalidateWorkspaceSnapshots(), z.dataRevision++), this.changeChannel.publish(s)), T.status === 204) return null;
      try {
        return await T.json();
      } catch (p) {
        throw i.signal.aborted ? p : new _("invalid-response", T.status, void 0, a);
      }
    } catch (s) {
      throw s instanceof _ ? s : i.signal.aborted ? new _(
        e.signal?.aborted ? "cancelled" : o ? "timeout" : "cancelled",
        void 0,
        void 0,
        a
      ) : new _("network", void 0, void 0, a);
    } finally {
      clearTimeout(n), e.signal?.removeEventListener("abort", r);
    }
  }
  invalidateWorkspaceSnapshots() {
    ++this.workspaceMutationVersion, this.workspaceCacheInvalidated = !0, this.workspaceMemoryCache.clear();
  }
  updateLocalCacheOnTaskCreated(t, e, i, r) {
    const o = this.getWorkspaceCacheKey(e, i), a = this.workspaceMemoryCache.get(o);
    if (a && a.data && Array.isArray(a.data.columns) && a.data.columns.length > 0) {
      let n = a.data.columns.find((s) => r !== void 0 ? s.sectionId === r : t.section_id ? s.sectionId === t.section_id : !1);
      if (n || (n = a.data.columns.find((s) => !s.sectionId) || a.data.columns[0]), n) {
        const s = this.mapTasks([t], (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))[0];
        s && !n.tasks.some((h) => h.id === String(t.id)) && n.tasks.push(s);
      }
    }
  }
  getFastSnapshot(t = "inbox", e) {
    const i = this.getWorkspaceCacheKey(t, e), r = this.workspaceMemoryCache.get(i);
    if (r?.data?.columns && Array.isArray(r.data.columns) && r.data.columns.length > 0)
      return r.data;
    if (typeof localStorage < "u")
      try {
        const o = localStorage.getItem(`todoist_fast_snapshot:${i}`);
        if (o) {
          const a = JSON.parse(o);
          if (a?.data?.columns && Array.isArray(a.data.columns) && a.data.columns.length > 0)
            return this.workspaceMemoryCache.set(i, a), a.data;
        }
      } catch {
      }
    return null;
  }
  getWorkspaceCacheKey(t, e) {
    return t === "projects" ? `v3:projects:${e || this.activeProjectId || "default"}` : `v3:${t}`;
  }
  async getCachedWorkspaceData(t = "inbox", e) {
    const i = this.getWorkspaceCacheKey(t, e), r = this.workspaceMemoryCache.get(i);
    if (r && r.data)
      return r.data;
    if (this.workspaceCacheInvalidated) return null;
    const o = this.workspaceMutationVersion;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const a = `todoistSnapshot:${i}`, n = await chrome.storage.local.get(a);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const s = n[a];
        if (s?.data?.columns && Array.isArray(s.data.columns) && Date.now() - s.timestamp < 30 * 864e5) {
          if (this.workspaceMemoryCache.set(i, s), typeof localStorage < "u")
            try {
              localStorage.setItem(`todoist_fast_snapshot:${i}`, JSON.stringify(s));
            } catch {
            }
          return s.data;
        }
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const a = await chrome.storage.local.get([R]);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const n = a[R] || {}, s = n[i] || (t !== "projects" ? n[t] : null);
        if (s?.columns && Array.isArray(s.columns)) {
          const h = {
            columns: s.columns,
            projects: (n.projectsMeta?.projects || []).map((d) => ({
              id: String(d.id),
              name: d.name,
              color: d.color,
              colorHex: Y[d.color || ""] || "#0ea5e9"
            })),
            activeProjectId: n.projectsMeta?.activeProjectId || e || this.activeProjectId || "",
            activeProjectName: n.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(s.columns.flatMap((d) => d.tasks.flatMap((u) => u.labels || [])))
            ).filter(Boolean)
          };
          return this.workspaceMemoryCache.set(i, { data: h, timestamp: s.savedAt || Date.now() }), h;
        }
      } catch {
      }
    return null;
  }
  async loadWorkspaceData(t = "inbox", e, i = !1, r) {
    if (await this.initToken(), r?.throwIfAborted(), !this.token) {
      const o = await this.getCachedWorkspaceData(t, e);
      return r?.throwIfAborted(), o || { columns: [], projects: [], activeProjectId: "", activeProjectName: "", availableLabels: [] };
    }
    return this.fetchWorkspaceDataOnline(t, e, r);
  }
  async fetchWorkspaceDataOnline(t = "inbox", e, i) {
    const r = this.workspaceMutationVersion, o = () => {
      if (i?.throwIfAborted(), r !== this.workspaceMutationVersion) throw new Error("任务位置已变化，旧看板读取失效");
    };
    o();
    const a = this.getWorkspaceCacheKey(t, e);
    try {
      const n = e || this.activeProjectId, s = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"), h = this.getProjects(i);
      let d, u;
      if (t === "projects" && n)
        d = this.getSections(n, i), u = this.getTasksByProject(n, i);
      else if (t === "today")
        d = Promise.resolve([]), u = this.getTasks("today | overdue", i);
      else {
        const l = this.inboxProjectId;
        l ? (d = this.getSections(l, i), u = this.getTasksByProject(l, i)) : (d = Promise.resolve([]), u = Promise.resolve([]));
      }
      const [y, w, f] = await Promise.all([
        h,
        d,
        u
      ]);
      o();
      const m = y.filter(
        (l) => !l.inbox_project && !l.is_inbox_project && !/^(Inbox|收件箱)$/i.test(l.name) && !l.is_archived && !l.is_deleted
      );
      this.cachedProjects = m;
      const T = m.map((l) => ({
        id: String(l.id),
        name: l.name,
        color: l.color,
        colorHex: Y[l.color || ""] || "#0ea5e9"
      }));
      if (e) {
        this.setActiveProjectId(String(e));
        const l = m.find((g) => String(g.id) === String(e));
        this.activeProjectName = l?.name || "";
      } else if (this.activeProjectId && m.some((l) => String(l.id) === String(this.activeProjectId))) {
        const l = m.find((g) => String(g.id) === String(this.activeProjectId));
        this.activeProjectName = l?.name || this.activeProjectName || "";
      } else m.length > 0 ? (this.setActiveProjectId(String(m[0].id)), this.activeProjectName = m[0].name) : (this.setActiveProjectId(""), this.activeProjectName = "");
      let p = [];
      if (t === "projects" && this.activeProjectId) {
        let l = w, g = f;
        if (n !== this.activeProjectId || w.length === 0 && f.length === 0) {
          const [k, b] = await Promise.all([
            this.getSections(this.activeProjectId, i),
            this.getTasksByProject(this.activeProjectId, i)
          ]);
          l = k, g = b;
        }
        const A = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(g.filter((k) => !k.section_id), s)
        };
        p.push(A);
        for (const k of l)
          p.push({
            projectId: this.activeProjectId,
            sectionId: String(k.id),
            title: k.name,
            tasks: this.mapTasks(g.filter((b) => String(b.section_id) === String(k.id)), s)
          });
      } else if (t === "today") {
        const l = f, g = l.filter((k) => {
          const b = k.due?.date ? String(k.due.date).slice(0, 10) : "";
          return b && b < s;
        }), A = l.filter((k) => {
          const b = k.due?.date ? String(k.due.date).slice(0, 10) : "";
          return b === s || !b && k.due?.string;
        });
        p = [
          { sectionId: "overdue", title: "已逾期", tasks: this.mapTasks(g, s, "day_order") },
          { sectionId: "today", title: "今天", tasks: this.mapTasks(A, s, "day_order") }
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
          let A = w, k = f;
          if (!this.inboxProjectId || w.length === 0 && f.length === 0) {
            const [P, W] = await Promise.all([
              this.getSections(g, i),
              this.getTasksByProject(g, i)
            ]);
            A = P, k = W;
          }
          const b = {
            projectId: g,
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(k.filter((P) => !P.section_id), s)
          };
          p.push(b);
          for (const P of A)
            p.push({
              projectId: g,
              sectionId: String(P.id),
              title: P.name,
              tasks: this.mapTasks(k.filter((W) => String(W.section_id) === String(P.id)), s)
            });
        } else {
          const A = (await this.getTasks(void 0, i)).filter((k) => !k.section_id);
          p = [
            { sectionId: "", title: "收件箱", tasks: this.mapTasks(A, s) }
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
      }, j = this.getWorkspaceCacheKey(t, this.activeProjectId), S = { data: v, timestamp: Date.now() };
      if (this.workspaceMemoryCache.set(j, S), a !== j && this.workspaceMemoryCache.set(a, S), this.workspaceCacheInvalidated = !1, typeof localStorage < "u")
        try {
          const l = JSON.stringify(S);
          localStorage.setItem(`todoist_fast_snapshot:${j}`, l), a !== j && localStorage.setItem(`todoist_fast_snapshot:${a}`, l);
        } catch {
        }
      if (typeof chrome < "u" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({
            [`todoistSnapshot:${j}`]: S,
            [`todoistSnapshot:${a}`]: S
          });
        } catch (l) {
          console.warn("[Todoist] Snapshot persistence failed", l);
        }
        o();
      }
      return v;
    } catch (n) {
      if (o(), console.warn("[TodoistService] Online fetch failed, fallback to local cache:", n), this.workspaceCacheInvalidated) throw n;
      const s = await this.getCachedWorkspaceData(t, e);
      if (s) return { ...s, readWarning: H(n) };
      throw n;
    }
  }
  mapTasks(t, e, i = "child_order") {
    const r = at();
    return [...t].sort((o, a) => {
      const n = Number(o[i]), s = Number(a[i]);
      return Number.isFinite(n) && Number.isFinite(s) ? n - s : 0;
    }).map((o) => {
      const a = o.due?.date ? String(o.due.date).slice(0, 10) : "", n = a === e, s = !!(a && a < e), h = !!o.due?.recurring, d = this.timedTasks.find((u) => String(u.taskId) === String(o.id));
      return {
        id: String(o.id),
        content: o.content || "未命名任务",
        description: o.description || "",
        completed: K(o),
        dueDate: o.due?.date || "",
        startDate: r(String(o.id), o.description || ""),
        dueText: B(o.due),
        dueString: o.due?.string || B(o.due),
        isOverdue: s,
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
    let r = "";
    for (let o = 0; o < 100; o++) {
      t?.throwIfAborted();
      const a = new URLSearchParams({ limit: "200" });
      r && a.set("cursor", r);
      const n = await this.api(`/tasks?${a}`, { signal: t }), s = I(n);
      for (const d of s) d?.id && !K(d) && e.set(String(d.id), d);
      const h = String(n?.next_cursor || "");
      if (!h) return [...e.values()];
      if (i.has(h)) throw new Error("日历任务分页游标重复");
      i.add(h), r = h;
    }
    throw new Error("日历任务分页超出上限，未应用不完整列表");
  }
  async setTaskDueDate(t, e) {
    const i = String(e || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(i)) throw new Error("截止日期格式无效");
    const r = await this.updateTask(t, { due_string: i });
    return this.broadcastTaskChange({ type: "due", task: r, date: i }), r;
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
        const t = await chrome.storage.local.get([O, x]);
        Array.isArray(t[O]) && (this.timedTasks = t[O]), t[x] && (this.timerDuration = Number(t[x]) || 30), this.timerLoaded = !0, this.emitTimerState();
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
    return this.timerDuration = Math.max(5, Math.min(480, Math.round(t / 5) * 5)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [x]: this.timerDuration }), this.emitTimerState(), this.timerDuration;
  }
  async createTimer(t, e = this.timerDuration) {
    const i = t.trim();
    if (!i) throw new Error("请输入任务名称");
    const r = await this.createTask({ content: i }), o = Date.now(), a = {
      id: `timer-${r.id}`,
      taskId: String(r.id),
      title: i,
      durationMinutes: e,
      createdAt: o,
      deadlineAt: o + e * 6e4,
      alertedAt: 0,
      url: r.url
    };
    return this.timedTasks.push(a), await this.persistTimers(), a;
  }
  async completeTimer(t) {
    const e = this.timedTasks.find((i) => i.id === t);
    e && (await this.toggleTaskCompletion(e.taskId, !0), this.timedTasks = this.timedTasks.filter((i) => i.id !== t), await this.persistTimers(), this.broadcastTaskChange({ type: "removed", task: { id: e.taskId } }));
  }
  async snoozeTimer(t, e = 5) {
    const i = this.timedTasks.find((r) => r.id === t);
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
    typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [O]: this.timedTasks }), this.emitTimerState();
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
    const i = /* @__PURE__ */ new Date(), r = e.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 });
    return e.toDateString() === i.toDateString() ? `截止 ${r}` : `截止 ${e.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} ${r}`;
  }
  // ==========================================================================
  // 标准 REST API 原生 CRUD
  // ==========================================================================
  getDefaultSectionName() {
    return G();
  }
  setDefaultSectionName(t) {
    Z(t);
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
        const r = await this.api(`/tasks/filter?query=${encodeURIComponent(t)}`, { signal: e });
        return I(r);
      } catch (r) {
        if (e?.throwIfAborted(), !(r instanceof _) || r.kind !== "not-found") throw r;
        try {
          const o = await this.api(`/tasks?filter=${encodeURIComponent(t)}`, { signal: e });
          return I(o);
        } catch (o) {
          if (e?.throwIfAborted(), !(o instanceof _) || o.kind !== "not-found") throw o;
          const a = await this.api("/tasks?limit=200", { signal: e });
          return I(a);
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
    const i = e.match(/\.[a-zA-Z0-9]+$/), r = i ? i[0] : ".png", o = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${r}`, a = new FormData();
    a.append("file", t, o);
    const n = new Headers();
    n.set("Authorization", `Bearer ${this.token}`);
    const s = new AbortController(), h = setTimeout(() => s.abort(), 15e3);
    try {
      let d = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers: n,
        body: a,
        signal: s.signal
      });
      if (d.status === 404 && (d = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
        method: "POST",
        headers: n,
        body: a,
        signal: s.signal
      })), d.ok)
        return await d.json();
      const u = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: u,
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
        const r = String(i.result || "");
        if (t.size <= 64 * 1024) {
          e(r);
          return;
        }
        const o = new Image();
        o.onload = () => {
          try {
            let n = o.width, s = o.height;
            (n > 800 || s > 800) && (n > s ? (s = Math.round(s * 800 / n), n = 800) : (n = Math.round(n * 800 / s), s = 800));
            const h = document.createElement("canvas");
            h.width = n, h.height = s;
            const d = h.getContext("2d");
            if (d) {
              d.drawImage(o, 0, 0, n, s);
              const u = h.toDataURL("image/webp", 0.72);
              e(u.length < r.length ? u : r);
              return;
            }
          } catch {
          }
          e(r);
        }, o.onerror = () => e(r), o.src = r;
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
    const r = await this.createTask({
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
    if (r && r.id && i.length > 0)
      for (const o of i)
        try {
          await this.addComment({
            task_id: String(r.id),
            content: `📎 附件图片: ${o.file_name}`,
            attachment: {
              resource_type: "file",
              file_url: o.file_url,
              file_name: o.file_name,
              file_type: o.file_type
            }
          });
        } catch (a) {
          console.warn("[Todoist] Add comment attachment failed:", a);
        }
    return r;
  }
  async deleteTask(t) {
    await this.api(`/tasks/${encodeURIComponent(t)}`, { method: "DELETE" });
  }
  async moveTask(t, e) {
    if (!t || t.startsWith("optimistic-") || !e.projectId) throw new Error("任务或目标项目尚未就绪");
    const i = e.sectionId ? { section_id: e.sectionId } : { project_id: e.projectId };
    try {
      const r = await this.api(`/tasks/${encodeURIComponent(t)}/move`, {
        method: "POST",
        body: JSON.stringify(i)
      });
      if (!r || String(r.id) !== t || String(r.project_id) !== e.projectId || String(r.section_id || "") !== e.sectionId) throw new Error("任务移动回复未确认目标，请刷新核对");
      return r;
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
      const r = await this.updateTask(t, i ? { day_order: e } : { child_order: e });
      if (!r || String(r.id) !== t || Number(r[i ? "day_order" : "child_order"]) !== e)
        throw new Error("任务排序回复未确认，请刷新核对");
      return r;
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
        await L.remove(this.getWorkspaceCacheKey("inbox")), await L.remove(this.getWorkspaceCacheKey("today")), await L.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId)), await L.remove("v3:projects:default");
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
    const i = t.until || (/* @__PURE__ */ new Date()).toISOString(), r = t.since || new Date(Date.parse(i) - 30 * 864e5).toISOString();
    if (!Number.isFinite(Date.parse(r)) || !Number.isFinite(Date.parse(i)) || Date.parse(r) >= Date.parse(i))
      throw new Error("完成历史日期范围无效");
    const o = [], a = /* @__PURE__ */ new Set();
    let n = "";
    for (let s = 0; s < 100; s++) {
      const h = new URLSearchParams({
        since: r,
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
      const u = d.next_cursor;
      if (u == null || u === "") return { items: o };
      if (typeof u != "string" || a.has(u)) throw new Error("完成历史分页无效");
      a.add(u), n = u;
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
const nt = Q(M.getInstance(), [
  "saveAccountToken",
  "setTaskDueDate",
  "setTimerDuration",
  "createTimer",
  "completeTimer",
  "snoozeTimer",
  "claimExpiredTimer",
  "uploadFile",
  "createTaskWithAttachments"
], !0), ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TODOIST_ACTIVE_PROJECT_ID_KEY: N,
  TODOIST_TIMED_TASKS_KEY: O,
  TODOIST_TIMER_DURATION_KEY: x,
  TODOIST_TOKEN_KEY: C,
  TODOIST_WORKSPACE_CACHE_KEY: R,
  TodoistService: M,
  getDefaultSectionName: G,
  isTodoistTaskCompleted: K,
  setDefaultSectionName: Z,
  todoistService: nt
}, Symbol.toStringTag, { value: "Module" }));
export {
  _ as T,
  H as a,
  rt as b,
  at as c,
  lt as d,
  C as e,
  mt as f,
  st as g,
  ft as h,
  K as i,
  ut as p,
  ht as s,
  nt as t
};
