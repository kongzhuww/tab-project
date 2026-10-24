import { a as W, w as P } from "./module-state-BVJNDzfS.js";
import { s as I } from "./storage-cache.service-BYF2zxXX.js";
const M = "todoist_task_start_dates";
function C() {
  if (typeof window > "u" || !window.localStorage) return {};
  try {
    const c = localStorage.getItem(M);
    return c ? JSON.parse(c) : {};
  } catch {
    return {};
  }
}
function U(c) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      localStorage.setItem(M, JSON.stringify(c));
    } catch {
    }
}
function x(c) {
  if (!c) return { date: "", time: "" };
  const e = String(c).trim().match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/);
  return e ? {
    date: e[1] || "",
    time: e[2] || ""
  } : { date: "", time: "" };
}
function F(c, t) {
  const e = String(c || "").trim(), i = String(t || "").trim();
  return e ? i ? `${e} ${i}` : e : "";
}
function K() {
  const c = C();
  return (t, e) => z(t, e, c);
}
function z(c, t, e = C()) {
  if (!c) return "";
  if (e[c]) return e[c];
  if (t) {
    const i = t.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (i && i[1])
      return i[1].replace("T", " ");
  }
  return "";
}
function X(c, t) {
  if (!c) return;
  const e = C(), i = String(t || "").trim();
  i && /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2})?$/.test(i) ? e[c] = i : delete e[c], U(e);
}
function Y(c, t) {
  if (!c && !t) return "";
  const { date: e, time: i } = x(c), s = t || i;
  if (!e) return s ? `${s}` : "";
  const o = e.slice(5);
  return s ? `${o} ${s}` : o;
}
const $ = "todoistDefaultSectionName";
function N() {
  try {
    return localStorage.getItem($) || "默认板块";
  } catch {
    return "默认板块";
  }
}
function L(c) {
  const t = String(c || "").trim() || "默认板块";
  try {
    localStorage.setItem($, t);
  } catch {
  }
}
const w = "todoistToken", j = "todoistWorkspaceCacheV3", k = "todoistTimedTasksV1", S = "todoistTimerDurationV1", _ = "todoistActiveProjectIdV1", E = {
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
function O(c) {
  if (!c?.date) return c?.string || "";
  const t = String(c.date).slice(0, 10), e = /* @__PURE__ */ new Date(), i = e.toLocaleDateString("en-CA"), s = new Date(e);
  s.setDate(s.getDate() + 1);
  const o = s.toLocaleDateString("en-CA");
  return t === i ? "今天" : t === o ? "明天" : t;
}
function g(c) {
  return Array.isArray(c) ? c : Array.isArray(c?.results) ? c.results : [];
}
class y {
  constructor() {
    this.token = "", this.timerDuration = 30, this.timedTasks = [], this.timerLoaded = !1, this.timerListeners = /* @__PURE__ */ new Set(), this.taskListeners = /* @__PURE__ */ new Set(), this.cachedProjects = [], this.activeProjectId = "", this.activeProjectName = "", this.workspaceMemoryCache = /* @__PURE__ */ new Map(), this.workspaceMutationVersion = 0, this.workspaceCacheInvalidated = !1, this.initToken(), this.initTimers();
  }
  static getInstance() {
    return y.instance || (y.instance = new y()), y.instance;
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
      const t = await chrome.storage.local.get([w, _]);
      this.token = t[w] || "", t[_] && (this.activeProjectId = String(t[_]));
    }
    return this.token;
  }
  setActiveProjectId(t) {
    if (this.activeProjectId = String(t || ""), typeof chrome < "u" && chrome.storage?.local && this.activeProjectId) {
      const e = this.activeProjectId;
      P(async () => {
        await chrome.storage.local.set({ [_]: e });
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
      P(async () => {
        await chrome.storage.local.set({ [w]: e });
      }).catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }
  /** Module settings await persistence before switching the active credential. */
  async saveAccountToken(t) {
    const e = t.trim();
    if (!e) throw new Error("请填写 Todoist Token");
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = await chrome.storage.local.get(w);
      if (await chrome.storage.local.set({ [w]: e }), i[w] !== e) {
        const s = Object.keys(await chrome.storage.local.get(null)).filter((o) => o.startsWith("todoistSnapshot:"));
        await chrome.storage.local.remove([j, ...s]), this.invalidateWorkspaceSnapshots();
      }
    } else
      localStorage.setItem(w, e), e !== this.token && this.workspaceMemoryCache.clear();
    this.token = e;
  }
  getToken() {
    return this.token;
  }
  /**
   * API v1 请求器（仅只读 404 可回退 rest/v2，写操作不重发）
   */
  async api(t, e = {}) {
    const i = new AbortController(), s = () => i.abort(e.signal?.reason);
    e.signal?.aborted ? s() : e.signal?.addEventListener("abort", s, { once: !0 });
    const o = setTimeout(() => i.abort(), 15e3);
    try {
      if (i.signal.throwIfAborted(), !this.token && (await this.initToken(), i.signal.throwIfAborted(), !this.token))
        throw new Error("请先在设置中配置 Todoist Token");
      const n = new Headers(e.headers || {});
      n.set("Authorization", `Bearer ${this.token}`), e.body && typeof e.body == "string" && !n.has("Content-Type") && n.set("Content-Type", "application/json");
      const a = t.startsWith("http") ? t : `https://api.todoist.com/api/v1${t}`, m = new URL(a);
      if (m.origin !== "https://api.todoist.com" || m.username || m.password)
        throw new Error("Todoist 请求目标无效");
      const d = { ...e, headers: n, signal: i.signal, credentials: "omit", redirect: "error" };
      let l = await fetch(a, d);
      if (l.status === 404 && !t.startsWith("http") && ["GET", "HEAD"].includes(String(e.method || "GET").toUpperCase())) {
        const b = await fetch(`https://api.todoist.com/rest/v2${t}`, d);
        b.ok && (l = b);
      }
      if (!l.ok) throw new Error(`Todoist API 请求失败 (${l.status})`);
      return l.status === 204 ? null : await l.json();
    } finally {
      clearTimeout(o), e.signal?.removeEventListener("abort", s);
    }
  }
  invalidateWorkspaceSnapshots() {
    ++this.workspaceMutationVersion, this.workspaceCacheInvalidated = !0, this.workspaceMemoryCache.clear();
  }
  updateLocalCacheOnTaskCreated(t, e, i, s) {
    const o = this.getWorkspaceCacheKey(e, i), n = this.workspaceMemoryCache.get(o);
    if (n && n.data && Array.isArray(n.data.columns) && n.data.columns.length > 0) {
      let r = n.data.columns.find((a) => s !== void 0 ? a.sectionId === s : t.section_id ? a.sectionId === t.section_id : !1);
      if (r || (r = n.data.columns.find((a) => !a.sectionId) || n.data.columns[0]), r) {
        const a = this.mapTasks([t], (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))[0];
        a && !r.tasks.some((m) => m.id === String(t.id)) && r.tasks.push(a);
      }
    }
  }
  getWorkspaceCacheKey(t, e) {
    return t === "projects" ? `v3:projects:${e || this.activeProjectId || "default"}` : `v3:${t}`;
  }
  async getCachedWorkspaceData(t = "inbox", e) {
    const i = this.getWorkspaceCacheKey(t, e), s = this.workspaceMemoryCache.get(i);
    if (s && s.data)
      return s.data;
    if (this.workspaceCacheInvalidated) return null;
    const o = this.workspaceMutationVersion;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const n = `todoistSnapshot:${i}`, r = await chrome.storage.local.get(n);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const a = r[n];
        if (a?.data?.columns && Date.now() - a.timestamp < 900 * 1e3)
          return this.workspaceMemoryCache.set(i, a), a.data;
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const n = await chrome.storage.local.get([j]);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const r = n[j] || {}, a = r[i] || (t !== "projects" ? r[t] : null);
        if (a?.columns && Array.isArray(a.columns)) {
          const m = {
            columns: a.columns,
            projects: (r.projectsMeta?.projects || []).map((d) => ({
              id: String(d.id),
              name: d.name,
              color: d.color,
              colorHex: E[d.color || ""] || "#0ea5e9"
            })),
            activeProjectId: r.projectsMeta?.activeProjectId || e || this.activeProjectId || "",
            activeProjectName: r.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(a.columns.flatMap((d) => d.tasks.flatMap((l) => l.labels || [])))
            ).filter(Boolean)
          };
          return this.workspaceMemoryCache.set(i, { data: m, timestamp: a.savedAt || Date.now() }), m;
        }
      } catch {
      }
    return null;
  }
  async loadWorkspaceData(t = "inbox", e, i = !1, s) {
    if (await this.initToken(), s?.throwIfAborted(), !this.token) {
      const o = await this.getCachedWorkspaceData(t, e);
      return s?.throwIfAborted(), o || { columns: [], projects: [], activeProjectId: "", activeProjectName: "", availableLabels: [] };
    }
    return this.fetchWorkspaceDataOnline(t, e, s);
  }
  async fetchWorkspaceDataOnline(t = "inbox", e, i) {
    const s = this.workspaceMutationVersion, o = () => {
      if (i?.throwIfAborted(), s !== this.workspaceMutationVersion) throw new Error("任务位置已变化，旧看板读取失效");
    };
    o();
    const n = this.getWorkspaceCacheKey(t, e);
    try {
      const r = await this.getProjects(i);
      o();
      const a = r.filter(
        (h) => !h.inbox_project && !h.is_inbox_project && !/^(Inbox|收件箱)$/i.test(h.name) && !h.is_archived && !h.is_deleted
      );
      this.cachedProjects = a;
      const m = a.map((h) => ({
        id: String(h.id),
        name: h.name,
        color: h.color,
        colorHex: E[h.color || ""] || "#0ea5e9"
      }));
      if (e) {
        this.setActiveProjectId(String(e));
        const h = a.find((u) => String(u.id) === String(e));
        this.activeProjectName = h?.name || "";
      } else if (this.activeProjectId && a.some((h) => String(h.id) === String(this.activeProjectId))) {
        const h = a.find((u) => String(u.id) === String(this.activeProjectId));
        this.activeProjectName = h?.name || this.activeProjectName || "";
      } else a.length > 0 ? (this.setActiveProjectId(String(a[0].id)), this.activeProjectName = a[0].name) : (this.setActiveProjectId(""), this.activeProjectName = "");
      let d = [];
      const l = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
      if (t === "projects" && this.activeProjectId) {
        const [h, u] = await Promise.all([
          this.getSections(this.activeProjectId, i),
          this.getTasksByProject(this.activeProjectId, i)
        ]), T = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(u.filter((f) => !f.section_id), l)
        };
        d.push(T);
        for (const f of h)
          d.push({
            projectId: this.activeProjectId,
            sectionId: String(f.id),
            title: f.name,
            tasks: this.mapTasks(u.filter((p) => String(p.section_id) === String(f.id)), l)
          });
      } else if (t === "today") {
        const h = await this.getTasks("today | overdue", i), u = h.filter((f) => {
          const p = f.due?.date ? String(f.due.date).slice(0, 10) : "";
          return p && p < l;
        }), T = h.filter((f) => {
          const p = f.due?.date ? String(f.due.date).slice(0, 10) : "";
          return p === l || !p && f.due?.string;
        });
        d = [
          { sectionId: "overdue", title: "已逾期", tasks: this.mapTasks(u, l, "day_order") },
          { sectionId: "today", title: "今天", tasks: this.mapTasks(T, l, "day_order") }
        ];
      } else {
        const h = r.find((u) => u.inbox_project || u.is_inbox_project) || r.find((u) => /^(Inbox|收件箱)$/i.test(u.name));
        if (h) {
          const [u, T] = await Promise.all([
            this.getSections(h.id, i),
            this.getTasksByProject(h.id, i)
          ]), f = {
            projectId: String(h.id),
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(T.filter((p) => !p.section_id), l)
          };
          d.push(f);
          for (const p of u)
            d.push({
              projectId: String(h.id),
              sectionId: String(p.id),
              title: p.name,
              tasks: this.mapTasks(T.filter((R) => String(R.section_id) === String(p.id)), l)
            });
        } else {
          const T = (await this.getTasks(void 0, i)).filter((f) => !f.section_id);
          d = [
            { sectionId: "", title: "收件箱", tasks: this.mapTasks(T, l) }
          ];
        }
      }
      o();
      const b = Array.from(
        new Set(d.flatMap((h) => h.tasks.flatMap((u) => u.labels || [])))
      ).filter(Boolean), A = {
        columns: d,
        projects: m,
        activeProjectId: this.activeProjectId,
        activeProjectName: this.activeProjectName,
        availableLabels: b
      }, D = this.getWorkspaceCacheKey(t, this.activeProjectId), v = { data: A, timestamp: Date.now() };
      if (this.workspaceMemoryCache.set(D, v), n !== D && this.workspaceMemoryCache.set(n, v), this.workspaceCacheInvalidated = !1, typeof chrome < "u" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({ [`todoistSnapshot:${D}`]: v });
        } catch (h) {
          console.warn("[Todoist] Snapshot persistence failed", h);
        }
        o();
      }
      return A;
    } catch (r) {
      if (o(), console.warn("[TodoistService] Online fetch failed, fallback to local cache:", r), this.workspaceCacheInvalidated) throw r;
      const a = await this.getCachedWorkspaceData(t, e);
      if (a) return a;
      throw r;
    }
  }
  mapTasks(t, e, i = "child_order") {
    const s = K();
    return [...t].sort((o, n) => {
      const r = Number(o[i]), a = Number(n[i]);
      return Number.isFinite(r) && Number.isFinite(a) ? r - a : 0;
    }).map((o) => {
      const n = o.due?.date ? String(o.due.date).slice(0, 10) : "", r = n === e, a = !!(n && n < e), m = !!o.due?.recurring, d = this.timedTasks.find((l) => String(l.taskId) === String(o.id));
      return {
        id: String(o.id),
        content: o.content || "未命名任务",
        description: o.description || "",
        completed: !!o.is_completed,
        dueDate: o.due?.date || "",
        startDate: s(String(o.id), o.description || ""),
        dueText: O(o.due),
        dueString: o.due?.string || O(o.due),
        isOverdue: a,
        isDueToday: r,
        isRecurring: m,
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
    return (await this.getTasks(void 0, t)).filter((i) => i?.id && !i.is_completed);
  }
  async setTaskDueDate(t, e) {
    const i = String(e || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(i)) throw new Error("截止日期格式无效");
    const s = await this.updateTask(t, { due_string: i });
    return this.broadcastTaskChange({ type: "due", task: s, date: i }), s;
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
        const t = await chrome.storage.local.get([k, S]);
        Array.isArray(t[k]) && (this.timedTasks = t[k]), t[S] && (this.timerDuration = Number(t[S]) || 30), this.timerLoaded = !0, this.emitTimerState();
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
    return this.timerDuration = Math.max(5, Math.min(480, Math.round(t / 5) * 5)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [S]: this.timerDuration }), this.emitTimerState(), this.timerDuration;
  }
  async createTimer(t, e = this.timerDuration) {
    const i = t.trim();
    if (!i) throw new Error("请输入任务名称");
    const s = await this.createTask({ content: i }), o = Date.now(), n = {
      id: `timer-${s.id}`,
      taskId: String(s.id),
      title: i,
      durationMinutes: e,
      createdAt: o,
      deadlineAt: o + e * 6e4,
      alertedAt: 0,
      url: s.url
    };
    return this.timedTasks.push(n), await this.persistTimers(), n;
  }
  async completeTimer(t) {
    const e = this.timedTasks.find((i) => i.id === t);
    e && (await this.toggleTaskCompletion(e.taskId, !0), this.timedTasks = this.timedTasks.filter((i) => i.id !== t), await this.persistTimers(), this.broadcastTaskChange({ type: "removed", task: { id: e.taskId } }));
  }
  async snoozeTimer(t, e = 5) {
    const i = this.timedTasks.find((s) => s.id === t);
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
    typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [k]: this.timedTasks }), this.emitTimerState();
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
    const i = /* @__PURE__ */ new Date(), s = e.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 });
    return e.toDateString() === i.toDateString() ? `截止 ${s}` : `截止 ${e.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} ${s}`;
  }
  // ==========================================================================
  // 标准 REST API 原生 CRUD
  // ==========================================================================
  getDefaultSectionName() {
    return N();
  }
  setDefaultSectionName(t) {
    L(t);
  }
  async getProjects(t) {
    const e = await this.api("/projects?limit=200", { signal: t });
    return g(e);
  }
  async getSections(t, e) {
    const i = await this.api(`/sections?project_id=${encodeURIComponent(t)}&limit=200`, { signal: e });
    return g(i);
  }
  async getTasks(t, e) {
    if (t)
      try {
        const s = await this.api(`/tasks/filter?query=${encodeURIComponent(t)}`, { signal: e });
        return g(s);
      } catch {
        e?.throwIfAborted();
        try {
          const s = await this.api(`/tasks?filter=${encodeURIComponent(t)}`, { signal: e });
          return g(s);
        } catch {
          e?.throwIfAborted();
          const s = await this.api("/tasks?limit=200", { signal: e });
          return g(s);
        }
      }
    const i = await this.api("/tasks?limit=200", { signal: e });
    return g(i);
  }
  async getTasksByProject(t, e) {
    const i = await this.api(`/tasks?project_id=${encodeURIComponent(t)}&limit=200`, { signal: e });
    return g(i);
  }
  async toggleTaskCompletion(t, e) {
    const i = e ? `/tasks/${encodeURIComponent(t)}/close` : `/tasks/${encodeURIComponent(t)}/reopen`;
    await this.api(i, { method: "POST" });
  }
  async reopenTask(t) {
    await this.api(`/tasks/${encodeURIComponent(t)}/reopen`, { method: "POST" }), this.broadcastTaskChange({ type: "updated", task: { id: t, is_completed: !1 } });
  }
  async updateTask(t, e) {
    return this.api(`/tasks/${encodeURIComponent(t)}`, {
      method: "POST",
      body: JSON.stringify(e)
    });
  }
  async createTask(t) {
    return this.api("/tasks", {
      method: "POST",
      body: JSON.stringify(t)
    });
  }
  /**
   * 上传二进制文件/图片至 Todoist 官方云端存储 (Sync API v9 uploads)
   */
  async uploadFile(t, e = "image.png") {
    if (!this.token && (await this.initToken(), !this.token))
      throw new Error("请先在设置中配置 Todoist Token");
    const i = e.match(/\.[a-zA-Z0-9]+$/), s = i ? i[0] : ".png", o = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${s}`, n = new FormData();
    n.append("file", t, o);
    const r = new Headers();
    r.set("Authorization", `Bearer ${this.token}`);
    const a = new AbortController(), m = setTimeout(() => a.abort(), 15e3);
    try {
      let d = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers: r,
        body: n,
        signal: a.signal
      });
      if (d.status === 404 && (d = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
        method: "POST",
        headers: r,
        body: n,
        signal: a.signal
      })), d.ok)
        return await d.json();
      const l = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: l,
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
      clearTimeout(m);
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
        const s = String(i.result || "");
        if (t.size <= 64 * 1024) {
          e(s);
          return;
        }
        const o = new Image();
        o.onload = () => {
          try {
            let r = o.width, a = o.height;
            (r > 800 || a > 800) && (r > a ? (a = Math.round(a * 800 / r), r = 800) : (r = Math.round(r * 800 / a), a = 800));
            const m = document.createElement("canvas");
            m.width = r, m.height = a;
            const d = m.getContext("2d");
            if (d) {
              d.drawImage(o, 0, 0, r, a);
              const l = m.toDataURL("image/webp", 0.72);
              e(l.length < s.length ? l : s);
              return;
            }
          } catch {
          }
          e(s);
        }, o.onerror = () => e(s), o.src = s;
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
    const s = await this.createTask({
      content: t.content,
      description: e.trim() || void 0,
      project_id: t.project_id,
      section_id: t.section_id,
      due_string: t.due_string,
      priority: t.priority,
      labels: t.labels
    });
    if (s && s.id && i.length > 0)
      for (const o of i)
        try {
          await this.addComment({
            task_id: String(s.id),
            content: `📎 附件图片: ${o.file_name}`,
            attachment: {
              resource_type: "file",
              file_url: o.file_url,
              file_name: o.file_name,
              file_type: o.file_type
            }
          });
        } catch (n) {
          console.warn("[Todoist] Add comment attachment failed:", n);
        }
    return s;
  }
  async deleteTask(t) {
    await this.api(`/tasks/${encodeURIComponent(t)}`, { method: "DELETE" });
  }
  async moveTask(t, e) {
    if (!t || t.startsWith("optimistic-") || !e.projectId) throw new Error("任务或目标项目尚未就绪");
    const i = e.sectionId ? { section_id: e.sectionId } : { project_id: e.projectId };
    try {
      const s = await this.api(`/tasks/${encodeURIComponent(t)}/move`, {
        method: "POST",
        body: JSON.stringify(i)
      });
      if (!s || String(s.id) !== t || String(s.project_id) !== e.projectId || String(s.section_id || "") !== e.sectionId) throw new Error("任务移动回复未确认目标，请刷新核对");
      return s;
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
      const s = await this.updateTask(t, i ? { day_order: e } : { child_order: e });
      if (!s || String(s.id) !== t || Number(s[i ? "day_order" : "child_order"]) !== e)
        throw new Error("任务排序回复未确认，请刷新核对");
      return s;
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
        await I.remove(this.getWorkspaceCacheKey("inbox")), await I.remove(this.getWorkspaceCacheKey("today")), await I.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId)), await I.remove("v3:projects:default");
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
    return g(i);
  }
  /**
   * 查询历史已完成任务列表 (Sync API v9 /completed/get_all)
   */
  async getCompletedTasks(t = {}, e) {
    if (!this.token && (await this.initToken(), !this.token))
      throw new Error("请先在设置中配置 Todoist Token");
    const i = new URLSearchParams();
    return t.since && i.set("since", t.since), t.until && i.set("until", t.until), t.project_id && i.set("project_id", t.project_id), i.set("limit", String(t.limit || 50)), t.offset && i.set("offset", String(t.offset)), i.set("annotate_notes", "true"), this.api(`https://api.todoist.com/sync/v9/completed/get_all?${i.toString()}`, { signal: e });
  }
  /**
   * 获取 Todoist 云端个人标签库 (REST API v2 /labels)
   */
  async getLabels(t) {
    const e = await this.api("/labels", { signal: t });
    return g(e);
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
const V = W(y.getInstance(), [
  "saveAccountToken",
  "setTaskDueDate",
  "setTimerDuration",
  "createTimer",
  "completeTimer",
  "snoozeTimer",
  "claimExpiredTimer",
  "uploadFile",
  "createTaskWithAttachments"
], !0), H = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TODOIST_ACTIVE_PROJECT_ID_KEY: _,
  TODOIST_TIMED_TASKS_KEY: k,
  TODOIST_TIMER_DURATION_KEY: S,
  TODOIST_TOKEN_KEY: w,
  TODOIST_WORKSPACE_CACHE_KEY: j,
  TodoistService: y,
  getDefaultSectionName: N,
  setDefaultSectionName: L,
  todoistService: V
}, Symbol.toStringTag, { value: "Module" }));
export {
  w as T,
  F as a,
  H as b,
  K as c,
  Y as f,
  z as g,
  x as p,
  X as s,
  V as t
};
