import { a as V, w as O, t as N } from "./module-state-Dt_XKbbf.js";
import { s as A } from "./storage-cache.service-BYF2zxXX.js";
const P = "todoist_change_revision_v1";
async function $(n) {
  const t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("todoist-invalidation-v1:" + n));
  return Array.from(new Uint8Array(t), (e) => e.toString(16).padStart(2, "0")).join("");
}
function F(n, t) {
  let e = "";
  async function i(r) {
    try {
      if (!r || r.length > 512) return;
      const a = JSON.parse(r);
      if (a.version !== 1 || !/^[a-f0-9]{64}$/.test(a.scope) || typeof a.revision != "string" || !/^[a-f0-9-]{36}$/.test(a.revision)) return;
      const c = await n();
      if (!c || a.scope !== await $(c) || c !== await n() || e === a.revision) return;
      e = a.revision, t();
    } catch {
    }
  }
  function o() {
    if (!document.hidden)
      try {
        i(localStorage.getItem(P));
      } catch {
      }
  }
  return window.addEventListener("storage", (r) => {
    r.key === P && i(r.newValue);
  }), document.addEventListener("visibilitychange", o), window.addEventListener("pageshow", o), {
    async publish(r) {
      try {
        if (!r) return;
        const a = { version: 1, scope: await $(r), revision: crypto.randomUUID() };
        localStorage.setItem(P, JSON.stringify(a)), r === await n() && (e = a.revision);
      } catch {
        console.warn("[Todoist] Cross-page invalidation unavailable; refresh other pages manually.");
      }
    }
  };
}
class g extends Error {
  constructor(t, e, i, o = !1) {
    super(x({ kind: t, status: e, retryAfterMs: i })), this.kind = t, this.status = e, this.retryAfterMs = i, this.submitted = o, this.name = t === "cancelled" ? "AbortError" : "TodoistApiError";
  }
}
function H(n, t = Date.now()) {
  if (!n) return 6e4;
  const e = Number(n), i = Number.isFinite(e) ? e * 1e3 : Date.parse(n) - t;
  return Number.isFinite(i) ? Math.max(1e3, i) : 6e4;
}
function B(n, t = !1) {
  const e = n.status;
  return new g(
    e === 401 || e === 403 ? "auth" : e === 429 ? "rate-limit" : e === 404 || e === 410 ? "not-found" : "http",
    e,
    e === 429 ? H(n.headers.get("retry-after")) : void 0,
    t
  );
}
function x(n) {
  const t = n;
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
const W = "todoist_task_start_dates";
function M() {
  if (typeof window > "u" || !window.localStorage) return {};
  try {
    const n = localStorage.getItem(W);
    return n ? JSON.parse(n) : {};
  } catch {
    return {};
  }
}
function X(n) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      localStorage.setItem(W, JSON.stringify(n));
    } catch {
    }
}
function Y(n) {
  if (!n) return { date: "", time: "" };
  const e = String(n).trim().match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/);
  return e ? {
    date: e[1] || "",
    time: e[2] || ""
  } : { date: "", time: "" };
}
function et(n, t) {
  const e = String(n || "").trim(), i = String(t || "").trim();
  return e ? i ? `${e} ${i}` : e : "";
}
function q() {
  const n = M();
  return (t, e) => G(t, e, n);
}
function G(n, t, e = M()) {
  if (!n) return "";
  if (e[n]) return e[n];
  if (t) {
    const i = t.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (i && i[1])
      return i[1].replace("T", " ");
  }
  return "";
}
function it(n, t) {
  if (!n) return;
  const e = M(), i = String(t || "").trim();
  i && /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2})?$/.test(i) ? e[n] = i : delete e[n], X(e);
}
function rt(n, t) {
  if (!n && !t) return "";
  const { date: e, time: i } = Y(n), o = t || i;
  if (!e) return o ? `${o}` : "";
  const r = e.slice(5);
  return o ? `${r} ${o}` : r;
}
const U = "todoistDefaultSectionName";
function K() {
  try {
    return localStorage.getItem(U) || "默认板块";
  } catch {
    return "默认板块";
  }
}
function z(n) {
  const t = String(n || "").trim() || "默认板块";
  try {
    localStorage.setItem(U, t);
  } catch {
  }
}
function E(n) {
  return typeof n.checked == "boolean" ? n.checked : n.is_completed === !0;
}
const k = "todoistToken", C = "todoistWorkspaceCacheV3", _ = "todoistTimedTasksV1", D = "todoistTimerDurationV1", I = "todoistActiveProjectIdV1", L = {
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
function R(n) {
  if (!n?.date) return n?.string || "";
  const t = String(n.date).slice(0, 10), e = /* @__PURE__ */ new Date(), i = e.toLocaleDateString("en-CA"), o = new Date(e);
  o.setDate(o.getDate() + 1);
  const r = o.toLocaleDateString("en-CA");
  return t === i ? "今天" : t === r ? "明天" : t;
}
function y(n) {
  return Array.isArray(n) ? n : Array.isArray(n?.results) ? n.results : [];
}
class b {
  constructor() {
    this.token = "", this.timerDuration = 30, this.timedTasks = [], this.timerLoaded = !1, this.timerListeners = /* @__PURE__ */ new Set(), this.taskListeners = /* @__PURE__ */ new Set(), this.cachedProjects = [], this.activeProjectId = "", this.activeProjectName = "", this.changeChannel = F(() => this.initToken(), () => {
      this.invalidateWorkspaceSnapshots(), N.dataRevision++;
    }), this.workspaceMemoryCache = /* @__PURE__ */ new Map(), this.workspaceMutationVersion = 0, this.workspaceCacheInvalidated = !1, this.initToken(), this.initTimers();
  }
  static getInstance() {
    return b.instance || (b.instance = new b()), b.instance;
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
      const t = await chrome.storage.local.get([k, I]);
      this.token = t[k] || "", t[I] && (this.activeProjectId = String(t[I]));
    }
    return this.token;
  }
  setActiveProjectId(t) {
    if (this.activeProjectId = String(t || ""), typeof chrome < "u" && chrome.storage?.local && this.activeProjectId) {
      const e = this.activeProjectId;
      O(async () => {
        await chrome.storage.local.set({ [I]: e });
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
      O(async () => {
        await chrome.storage.local.set({ [k]: e });
      }).catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }
  /** Module settings await persistence before switching the active credential. */
  async saveAccountToken(t) {
    const e = t.trim();
    if (!e) throw new Error("请填写 Todoist Token");
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = await chrome.storage.local.get(k);
      if (await chrome.storage.local.set({ [k]: e }), i[k] !== e) {
        const o = Object.keys(await chrome.storage.local.get(null)).filter((r) => r.startsWith("todoistSnapshot:"));
        await chrome.storage.local.remove([C, ...o]), this.invalidateWorkspaceSnapshots();
      }
    } else
      localStorage.setItem(k, e), e !== this.token && this.workspaceMemoryCache.clear();
    this.token = e;
  }
  getToken() {
    return this.token;
  }
  async api(t, e = {}) {
    const i = new AbortController(), o = () => i.abort(e.signal?.reason);
    e.signal?.aborted ? o() : e.signal?.addEventListener("abort", o, { once: !0 });
    let r = !1, a = !1;
    const c = setTimeout(() => {
      r = !0, i.abort();
    }, 15e3);
    try {
      if (i.signal.throwIfAborted(), !this.token) {
        try {
          await this.initToken();
        } catch {
          throw new g("configuration");
        }
        if (i.signal.throwIfAborted(), !this.token) throw new g("configuration");
      }
      const s = this.token;
      if (this.rateLimit?.token === s && this.rateLimit.until > Date.now())
        throw new g("rate-limit", 429, this.rateLimit.until - Date.now());
      const l = new Headers(e.headers || {});
      l.set("Authorization", `Bearer ${s}`), e.body && typeof e.body == "string" && !l.has("Content-Type") && l.set("Content-Type", "application/json");
      const m = t.startsWith("http") ? t : `https://api.todoist.com/api/v1${t}`, p = new URL(m);
      if (p.origin !== "https://api.todoist.com" || p.username || p.password)
        throw new g("configuration");
      const j = String(e.method || "GET").toUpperCase(), v = !["GET", "HEAD"].includes(j), S = { ...e, headers: l, signal: i.signal, credentials: "omit", redirect: "error" };
      a = !0;
      let d = await fetch(m, S);
      if (d.status === 404 && !t.startsWith("http") && !v && (await d.body?.cancel(), d = await fetch(`https://api.todoist.com/rest/v2${t}`, S)), !d.ok) {
        const u = B(d, a);
        throw u.kind === "rate-limit" && (this.rateLimit = { token: s, until: Date.now() + (u.retryAfterMs || 6e4) }), await d.body?.cancel(), u;
      }
      if (v && (s === this.token && (this.invalidateWorkspaceSnapshots(), N.dataRevision++), this.changeChannel.publish(s)), d.status === 204) return null;
      try {
        return await d.json();
      } catch (u) {
        throw i.signal.aborted ? u : new g("invalid-response", d.status, void 0, a);
      }
    } catch (s) {
      throw s instanceof g ? s : i.signal.aborted ? new g(
        e.signal?.aborted ? "cancelled" : r ? "timeout" : "cancelled",
        void 0,
        void 0,
        a
      ) : new g("network", void 0, void 0, a);
    } finally {
      clearTimeout(c), e.signal?.removeEventListener("abort", o);
    }
  }
  invalidateWorkspaceSnapshots() {
    ++this.workspaceMutationVersion, this.workspaceCacheInvalidated = !0, this.workspaceMemoryCache.clear();
  }
  updateLocalCacheOnTaskCreated(t, e, i, o) {
    const r = this.getWorkspaceCacheKey(e, i), a = this.workspaceMemoryCache.get(r);
    if (a && a.data && Array.isArray(a.data.columns) && a.data.columns.length > 0) {
      let c = a.data.columns.find((s) => o !== void 0 ? s.sectionId === o : t.section_id ? s.sectionId === t.section_id : !1);
      if (c || (c = a.data.columns.find((s) => !s.sectionId) || a.data.columns[0]), c) {
        const s = this.mapTasks([t], (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))[0];
        s && !c.tasks.some((l) => l.id === String(t.id)) && c.tasks.push(s);
      }
    }
  }
  getWorkspaceCacheKey(t, e) {
    return t === "projects" ? `v3:projects:${e || this.activeProjectId || "default"}` : `v3:${t}`;
  }
  async getCachedWorkspaceData(t = "inbox", e) {
    const i = this.getWorkspaceCacheKey(t, e), o = this.workspaceMemoryCache.get(i);
    if (o && o.data)
      return o.data;
    if (this.workspaceCacheInvalidated) return null;
    const r = this.workspaceMutationVersion;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const a = `todoistSnapshot:${i}`, c = await chrome.storage.local.get(a);
        if (this.workspaceCacheInvalidated || r !== this.workspaceMutationVersion) return null;
        const s = c[a];
        if (s?.data?.columns && Array.isArray(s.data.columns) && Date.now() - s.timestamp < 30 * 864e5)
          return this.workspaceMemoryCache.set(i, s), s.data;
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const a = await chrome.storage.local.get([C]);
        if (this.workspaceCacheInvalidated || r !== this.workspaceMutationVersion) return null;
        const c = a[C] || {}, s = c[i] || (t !== "projects" ? c[t] : null);
        if (s?.columns && Array.isArray(s.columns)) {
          const l = {
            columns: s.columns,
            projects: (c.projectsMeta?.projects || []).map((h) => ({
              id: String(h.id),
              name: h.name,
              color: h.color,
              colorHex: L[h.color || ""] || "#0ea5e9"
            })),
            activeProjectId: c.projectsMeta?.activeProjectId || e || this.activeProjectId || "",
            activeProjectName: c.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(s.columns.flatMap((h) => h.tasks.flatMap((m) => m.labels || [])))
            ).filter(Boolean)
          };
          return this.workspaceMemoryCache.set(i, { data: l, timestamp: s.savedAt || Date.now() }), l;
        }
      } catch {
      }
    return null;
  }
  async loadWorkspaceData(t = "inbox", e, i = !1, o) {
    if (await this.initToken(), o?.throwIfAborted(), !this.token) {
      const r = await this.getCachedWorkspaceData(t, e);
      return o?.throwIfAborted(), r || { columns: [], projects: [], activeProjectId: "", activeProjectName: "", availableLabels: [] };
    }
    return this.fetchWorkspaceDataOnline(t, e, o);
  }
  async fetchWorkspaceDataOnline(t = "inbox", e, i) {
    const o = this.workspaceMutationVersion, r = () => {
      if (i?.throwIfAborted(), o !== this.workspaceMutationVersion) throw new Error("任务位置已变化，旧看板读取失效");
    };
    r();
    const a = this.getWorkspaceCacheKey(t, e);
    try {
      const c = await this.getProjects(i);
      r();
      const s = c.filter(
        (d) => !d.inbox_project && !d.is_inbox_project && !/^(Inbox|收件箱)$/i.test(d.name) && !d.is_archived && !d.is_deleted
      );
      this.cachedProjects = s;
      const l = s.map((d) => ({
        id: String(d.id),
        name: d.name,
        color: d.color,
        colorHex: L[d.color || ""] || "#0ea5e9"
      }));
      if (e) {
        this.setActiveProjectId(String(e));
        const d = s.find((u) => String(u.id) === String(e));
        this.activeProjectName = d?.name || "";
      } else if (this.activeProjectId && s.some((d) => String(d.id) === String(this.activeProjectId))) {
        const d = s.find((u) => String(u.id) === String(this.activeProjectId));
        this.activeProjectName = d?.name || this.activeProjectName || "";
      } else s.length > 0 ? (this.setActiveProjectId(String(s[0].id)), this.activeProjectName = s[0].name) : (this.setActiveProjectId(""), this.activeProjectName = "");
      let h = [];
      const m = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
      if (t === "projects" && this.activeProjectId) {
        const [d, u] = await Promise.all([
          this.getSections(this.activeProjectId, i),
          this.getTasksByProject(this.activeProjectId, i)
        ]), T = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(u.filter((f) => !f.section_id), m)
        };
        h.push(T);
        for (const f of d)
          h.push({
            projectId: this.activeProjectId,
            sectionId: String(f.id),
            title: f.name,
            tasks: this.mapTasks(u.filter((w) => String(w.section_id) === String(f.id)), m)
          });
      } else if (t === "today") {
        const d = await this.getTasks("today | overdue", i), u = d.filter((f) => {
          const w = f.due?.date ? String(f.due.date).slice(0, 10) : "";
          return w && w < m;
        }), T = d.filter((f) => {
          const w = f.due?.date ? String(f.due.date).slice(0, 10) : "";
          return w === m || !w && f.due?.string;
        });
        h = [
          { sectionId: "overdue", title: "已逾期", tasks: this.mapTasks(u, m, "day_order") },
          { sectionId: "today", title: "今天", tasks: this.mapTasks(T, m, "day_order") }
        ];
      } else {
        const d = c.find((u) => u.inbox_project || u.is_inbox_project) || c.find((u) => /^(Inbox|收件箱)$/i.test(u.name));
        if (d) {
          const [u, T] = await Promise.all([
            this.getSections(d.id, i),
            this.getTasksByProject(d.id, i)
          ]), f = {
            projectId: String(d.id),
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(T.filter((w) => !w.section_id), m)
          };
          h.push(f);
          for (const w of u)
            h.push({
              projectId: String(d.id),
              sectionId: String(w.id),
              title: w.name,
              tasks: this.mapTasks(T.filter((J) => String(J.section_id) === String(w.id)), m)
            });
        } else {
          const T = (await this.getTasks(void 0, i)).filter((f) => !f.section_id);
          h = [
            { sectionId: "", title: "收件箱", tasks: this.mapTasks(T, m) }
          ];
        }
      }
      r();
      const p = Array.from(
        new Set(h.flatMap((d) => d.tasks.flatMap((u) => u.labels || [])))
      ).filter(Boolean), j = {
        columns: h,
        projects: l,
        activeProjectId: this.activeProjectId,
        activeProjectName: this.activeProjectName,
        availableLabels: p
      }, v = this.getWorkspaceCacheKey(t, this.activeProjectId), S = { data: j, timestamp: Date.now() };
      if (this.workspaceMemoryCache.set(v, S), a !== v && this.workspaceMemoryCache.set(a, S), this.workspaceCacheInvalidated = !1, typeof chrome < "u" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({
            [`todoistSnapshot:${v}`]: S,
            [`todoistSnapshot:${a}`]: S
          });
        } catch (d) {
          console.warn("[Todoist] Snapshot persistence failed", d);
        }
        r();
      }
      return j;
    } catch (c) {
      if (r(), console.warn("[TodoistService] Online fetch failed, fallback to local cache:", c), this.workspaceCacheInvalidated) throw c;
      const s = await this.getCachedWorkspaceData(t, e);
      if (s) return { ...s, readWarning: x(c) };
      throw c;
    }
  }
  mapTasks(t, e, i = "child_order") {
    const o = q();
    return [...t].sort((r, a) => {
      const c = Number(r[i]), s = Number(a[i]);
      return Number.isFinite(c) && Number.isFinite(s) ? c - s : 0;
    }).map((r) => {
      const a = r.due?.date ? String(r.due.date).slice(0, 10) : "", c = a === e, s = !!(a && a < e), l = !!r.due?.recurring, h = this.timedTasks.find((m) => String(m.taskId) === String(r.id));
      return {
        id: String(r.id),
        content: r.content || "未命名任务",
        description: r.description || "",
        completed: E(r),
        dueDate: r.due?.date || "",
        startDate: o(String(r.id), r.description || ""),
        dueText: R(r.due),
        dueString: r.due?.string || R(r.due),
        isOverdue: s,
        isDueToday: c,
        isRecurring: l,
        priority: r.priority ? Number(r.priority) : 1,
        labels: Array.isArray(r.labels) ? r.labels : [],
        timedDeadlineText: h ? this.formatTimerDeadline(h) : "",
        timedDurationMinutes: h?.durationMinutes,
        url: r.url || `https://app.todoist.com/app/task/${r.id}`,
        _taskRaw: r
      };
    });
  }
  // ==========================================================================
  // 日历模块协同与事件广播 (`window.LogicWeaverTodoistTasks`)
  // ==========================================================================
  async listCalendarTasks(t) {
    if (t?.throwIfAborted(), await this.initToken(), t?.throwIfAborted(), !this.token) throw new Error("Todoist 尚未配置，未读取日历任务");
    const e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
    let o = "";
    for (let r = 0; r < 100; r++) {
      t?.throwIfAborted();
      const a = new URLSearchParams({ limit: "200" });
      o && a.set("cursor", o);
      const c = await this.api(`/tasks?${a}`, { signal: t }), s = y(c);
      for (const h of s) h?.id && !E(h) && e.set(String(h.id), h);
      const l = String(c?.next_cursor || "");
      if (!l) return [...e.values()];
      if (i.has(l)) throw new Error("日历任务分页游标重复");
      i.add(l), o = l;
    }
    throw new Error("日历任务分页超出上限，未应用不完整列表");
  }
  async setTaskDueDate(t, e) {
    const i = String(e || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(i)) throw new Error("截止日期格式无效");
    const o = await this.updateTask(t, { due_string: i });
    return this.broadcastTaskChange({ type: "due", task: o, date: i }), o;
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
        const t = await chrome.storage.local.get([_, D]);
        Array.isArray(t[_]) && (this.timedTasks = t[_]), t[D] && (this.timerDuration = Number(t[D]) || 30), this.timerLoaded = !0, this.emitTimerState();
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
    return this.timerDuration = Math.max(5, Math.min(480, Math.round(t / 5) * 5)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [D]: this.timerDuration }), this.emitTimerState(), this.timerDuration;
  }
  async createTimer(t, e = this.timerDuration) {
    const i = t.trim();
    if (!i) throw new Error("请输入任务名称");
    const o = await this.createTask({ content: i }), r = Date.now(), a = {
      id: `timer-${o.id}`,
      taskId: String(o.id),
      title: i,
      durationMinutes: e,
      createdAt: r,
      deadlineAt: r + e * 6e4,
      alertedAt: 0,
      url: o.url
    };
    return this.timedTasks.push(a), await this.persistTimers(), a;
  }
  async completeTimer(t) {
    const e = this.timedTasks.find((i) => i.id === t);
    e && (await this.toggleTaskCompletion(e.taskId, !0), this.timedTasks = this.timedTasks.filter((i) => i.id !== t), await this.persistTimers(), this.broadcastTaskChange({ type: "removed", task: { id: e.taskId } }));
  }
  async snoozeTimer(t, e = 5) {
    const i = this.timedTasks.find((o) => o.id === t);
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
    typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [_]: this.timedTasks }), this.emitTimerState();
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
    const i = /* @__PURE__ */ new Date(), o = e.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 });
    return e.toDateString() === i.toDateString() ? `截止 ${o}` : `截止 ${e.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} ${o}`;
  }
  // ==========================================================================
  // 标准 REST API 原生 CRUD
  // ==========================================================================
  getDefaultSectionName() {
    return K();
  }
  setDefaultSectionName(t) {
    z(t);
  }
  async getProjects(t) {
    const e = await this.api("/projects?limit=200", { signal: t });
    return y(e);
  }
  async getSections(t, e) {
    const i = await this.api(`/sections?project_id=${encodeURIComponent(t)}&limit=200`, { signal: e });
    return y(i);
  }
  async getTasks(t, e) {
    if (t)
      try {
        const o = await this.api(`/tasks/filter?query=${encodeURIComponent(t)}`, { signal: e });
        return y(o);
      } catch (o) {
        if (e?.throwIfAborted(), !(o instanceof g) || o.kind !== "not-found") throw o;
        try {
          const r = await this.api(`/tasks?filter=${encodeURIComponent(t)}`, { signal: e });
          return y(r);
        } catch (r) {
          if (e?.throwIfAborted(), !(r instanceof g) || r.kind !== "not-found") throw r;
          const a = await this.api("/tasks?limit=200", { signal: e });
          return y(a);
        }
      }
    const i = await this.api("/tasks?limit=200", { signal: e });
    return y(i);
  }
  async getTasksByProject(t, e) {
    const i = await this.api(`/tasks?project_id=${encodeURIComponent(t)}&limit=200`, { signal: e });
    return y(i);
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
    const i = e.match(/\.[a-zA-Z0-9]+$/), o = i ? i[0] : ".png", r = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${o}`, a = new FormData();
    a.append("file", t, r);
    const c = new Headers();
    c.set("Authorization", `Bearer ${this.token}`);
    const s = new AbortController(), l = setTimeout(() => s.abort(), 15e3);
    try {
      let h = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers: c,
        body: a,
        signal: s.signal
      });
      if (h.status === 404 && (h = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
        method: "POST",
        headers: c,
        body: a,
        signal: s.signal
      })), h.ok)
        return await h.json();
      const m = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: m,
        upload_state: "completed"
      };
    } catch {
      const h = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: h,
        upload_state: "completed"
      };
    } finally {
      clearTimeout(l);
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
        const o = String(i.result || "");
        if (t.size <= 64 * 1024) {
          e(o);
          return;
        }
        const r = new Image();
        r.onload = () => {
          try {
            let c = r.width, s = r.height;
            (c > 800 || s > 800) && (c > s ? (s = Math.round(s * 800 / c), c = 800) : (c = Math.round(c * 800 / s), s = 800));
            const l = document.createElement("canvas");
            l.width = c, l.height = s;
            const h = l.getContext("2d");
            if (h) {
              h.drawImage(r, 0, 0, c, s);
              const m = l.toDataURL("image/webp", 0.72);
              e(m.length < o.length ? m : o);
              return;
            }
          } catch {
          }
          e(o);
        }, r.onerror = () => e(o), r.src = o;
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
      for (const r of i)
        e += `

![${r.file_name}](${r.file_url})`;
    const o = await this.createTask({
      content: t.content,
      description: e.trim() || void 0,
      project_id: t.project_id,
      section_id: t.section_id,
      due_string: t.due_string,
      priority: t.priority,
      labels: t.labels
    });
    if (o && o.id && i.length > 0)
      for (const r of i)
        try {
          await this.addComment({
            task_id: String(o.id),
            content: `📎 附件图片: ${r.file_name}`,
            attachment: {
              resource_type: "file",
              file_url: r.file_url,
              file_name: r.file_name,
              file_type: r.file_type
            }
          });
        } catch (a) {
          console.warn("[Todoist] Add comment attachment failed:", a);
        }
    return o;
  }
  async deleteTask(t) {
    await this.api(`/tasks/${encodeURIComponent(t)}`, { method: "DELETE" });
  }
  async moveTask(t, e) {
    if (!t || t.startsWith("optimistic-") || !e.projectId) throw new Error("任务或目标项目尚未就绪");
    const i = e.sectionId ? { section_id: e.sectionId } : { project_id: e.projectId };
    try {
      const o = await this.api(`/tasks/${encodeURIComponent(t)}/move`, {
        method: "POST",
        body: JSON.stringify(i)
      });
      if (!o || String(o.id) !== t || String(o.project_id) !== e.projectId || String(o.section_id || "") !== e.sectionId) throw new Error("任务移动回复未确认目标，请刷新核对");
      return o;
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
      const o = await this.updateTask(t, i ? { day_order: e } : { child_order: e });
      if (!o || String(o.id) !== t || Number(o[i ? "day_order" : "child_order"]) !== e)
        throw new Error("任务排序回复未确认，请刷新核对");
      return o;
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
        await A.remove(this.getWorkspaceCacheKey("inbox")), await A.remove(this.getWorkspaceCacheKey("today")), await A.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId)), await A.remove("v3:projects:default");
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
    return y(i);
  }
  /**
   * 查询历史已完成任务列表 (Sync API v9 /completed/get_all)
   */
  async getCompletedTasks(t = {}, e) {
    if (e?.throwIfAborted(), await this.initToken(), e?.throwIfAborted(), !this.token) throw new Error("请先配置 Todoist 账户");
    const i = t.until || (/* @__PURE__ */ new Date()).toISOString(), o = t.since || new Date(Date.parse(i) - 30 * 864e5).toISOString();
    if (!Number.isFinite(Date.parse(o)) || !Number.isFinite(Date.parse(i)) || Date.parse(o) >= Date.parse(i))
      throw new Error("完成历史日期范围无效");
    const r = [], a = /* @__PURE__ */ new Set();
    let c = "";
    for (let s = 0; s < 100; s++) {
      const l = new URLSearchParams({
        since: o,
        until: i,
        limit: String(Math.max(1, Math.min(200, t.limit || 200)))
      });
      t.project_id && l.set("project_id", t.project_id), c && l.set("cursor", c);
      const h = await this.api(`https://api.todoist.com/api/v1/tasks/completed/by_completion_date?${l}`, { signal: e });
      if (e?.throwIfAborted(), !Array.isArray(h?.items)) throw new Error("完成历史返回格式无效");
      for (const p of h.items) {
        if (!p || typeof p.id != "string" || typeof p.content != "string" || typeof p.completed_at != "string" || !Number.isFinite(Date.parse(p.completed_at)))
          throw new Error("完成历史任务格式无效");
        r.push({ ...p, task_id: p.id, completed_at: p.completed_at });
      }
      const m = h.next_cursor;
      if (m == null || m === "") return { items: r };
      if (typeof m != "string" || a.has(m)) throw new Error("完成历史分页无效");
      a.add(m), c = m;
    }
    throw new Error("完成历史分页超出上限，未应用不完整列表");
  }
  /**
   * 获取 Todoist 云端个人标签库 (REST API v2 /labels)
   */
  async getLabels(t) {
    const e = await this.api("/labels", { signal: t });
    return y(e);
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
const Z = V(b.getInstance(), [
  "saveAccountToken",
  "setTaskDueDate",
  "setTimerDuration",
  "createTimer",
  "completeTimer",
  "snoozeTimer",
  "claimExpiredTimer",
  "uploadFile",
  "createTaskWithAttachments"
], !0), ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TODOIST_ACTIVE_PROJECT_ID_KEY: I,
  TODOIST_TIMED_TASKS_KEY: _,
  TODOIST_TIMER_DURATION_KEY: D,
  TODOIST_TOKEN_KEY: k,
  TODOIST_WORKSPACE_CACHE_KEY: C,
  TodoistService: b,
  getDefaultSectionName: K,
  isTodoistTaskCompleted: E,
  setDefaultSectionName: z,
  todoistService: Z
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as T,
  x as a,
  et as b,
  q as c,
  k as d,
  ot as e,
  rt as f,
  G as g,
  E as i,
  Y as p,
  it as s,
  Z as t
};
