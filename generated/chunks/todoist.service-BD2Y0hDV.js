import { a as x, w as P } from "./module-state-EdOqm0KR.js";
import { s as D } from "./storage-cache.service-BYF2zxXX.js";
const M = "todoist_task_start_dates";
function A() {
  if (typeof window > "u" || !window.localStorage) return {};
  try {
    const d = localStorage.getItem(M);
    return d ? JSON.parse(d) : {};
  } catch {
    return {};
  }
}
function W(d) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      localStorage.setItem(M, JSON.stringify(d));
    } catch {
    }
}
function U(d) {
  if (!d) return { date: "", time: "" };
  const e = String(d).trim().match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/);
  return e ? {
    date: e[1] || "",
    time: e[2] || ""
  } : { date: "", time: "" };
}
function B(d, t) {
  const e = String(d || "").trim(), i = String(t || "").trim();
  return e ? i ? `${e} ${i}` : e : "";
}
function K() {
  const d = A();
  return (t, e) => z(t, e, d);
}
function z(d, t, e = A()) {
  if (!d) return "";
  if (e[d]) return e[d];
  if (t) {
    const i = t.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (i && i[1])
      return i[1].replace("T", " ");
  }
  return "";
}
function X(d, t) {
  if (!d) return;
  const e = A(), i = String(t || "").trim();
  i && /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2})?$/.test(i) ? e[d] = i : delete e[d], W(e);
}
function Y(d, t) {
  if (!d && !t) return "";
  const { date: e, time: i } = U(d), s = t || i;
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
function L(d) {
  const t = String(d || "").trim() || "默认板块";
  try {
    localStorage.setItem($, t);
  } catch {
  }
}
const T = "todoistToken", j = "todoistWorkspaceCacheV3", S = "todoistTimedTasksV1", _ = "todoistTimerDurationV1", b = "todoistActiveProjectIdV1", E = {
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
function O(d) {
  if (!d?.date) return d?.string || "";
  const t = String(d.date).slice(0, 10), e = /* @__PURE__ */ new Date(), i = e.toLocaleDateString("en-CA"), s = new Date(e);
  s.setDate(s.getDate() + 1);
  const o = s.toLocaleDateString("en-CA");
  return t === i ? "今天" : t === o ? "明天" : t;
}
function g(d) {
  return Array.isArray(d) ? d : Array.isArray(d?.results) ? d.results : [];
}
class k {
  constructor() {
    this.token = "", this.timerDuration = 30, this.timedTasks = [], this.timerLoaded = !1, this.timerListeners = /* @__PURE__ */ new Set(), this.taskListeners = /* @__PURE__ */ new Set(), this.cachedProjects = [], this.activeProjectId = "", this.activeProjectName = "", this.workspaceMemoryCache = /* @__PURE__ */ new Map(), this.workspaceMutationVersion = 0, this.workspaceCacheInvalidated = !1, this.initToken(), this.initTimers();
  }
  static getInstance() {
    return k.instance || (k.instance = new k()), k.instance;
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
      const t = await chrome.storage.local.get([T, b]);
      this.token = t[T] || "", t[b] && (this.activeProjectId = String(t[b]));
    }
    return this.token;
  }
  setActiveProjectId(t) {
    if (this.activeProjectId = String(t || ""), typeof chrome < "u" && chrome.storage?.local && this.activeProjectId) {
      const e = this.activeProjectId;
      P(async () => {
        await chrome.storage.local.set({ [b]: e });
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
        await chrome.storage.local.set({ [T]: e });
      }).catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }
  /** Module settings await persistence before switching the active credential. */
  async saveAccountToken(t) {
    const e = t.trim();
    if (!e) throw new Error("请填写 Todoist Token");
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = await chrome.storage.local.get(T);
      if (await chrome.storage.local.set({ [T]: e }), i[T] !== e) {
        const s = Object.keys(await chrome.storage.local.get(null)).filter((o) => o.startsWith("todoistSnapshot:"));
        await chrome.storage.local.remove([j, ...s]), this.invalidateWorkspaceSnapshots();
      }
    } else
      localStorage.setItem(T, e), e !== this.token && this.workspaceMemoryCache.clear();
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
      const r = t.startsWith("http") ? t : `https://api.todoist.com/api/v1${t}`, m = new URL(r);
      if (m.origin !== "https://api.todoist.com" || m.username || m.password)
        throw new Error("Todoist 请求目标无效");
      const c = { ...e, headers: n, signal: i.signal, credentials: "omit", redirect: "error" };
      let h = await fetch(r, c);
      if (h.status === 404 && !t.startsWith("http") && ["GET", "HEAD"].includes(String(e.method || "GET").toUpperCase())) {
        const p = await fetch(`https://api.todoist.com/rest/v2${t}`, c);
        p.ok && (h = p);
      }
      if (!h.ok) throw new Error(`Todoist API 请求失败 (${h.status})`);
      return h.status === 204 ? null : await h.json();
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
      let a = n.data.columns.find((r) => s !== void 0 ? r.sectionId === s : t.section_id ? r.sectionId === t.section_id : !1);
      if (a || (a = n.data.columns.find((r) => !r.sectionId) || n.data.columns[0]), a) {
        const r = this.mapTasks([t], (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))[0];
        r && !a.tasks.some((m) => m.id === String(t.id)) && a.tasks.push(r);
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
        const n = `todoistSnapshot:${i}`, a = await chrome.storage.local.get(n);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const r = a[n];
        if (r?.data?.columns && Array.isArray(r.data.columns) && Date.now() - r.timestamp < 30 * 864e5)
          return this.workspaceMemoryCache.set(i, r), r.data;
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const n = await chrome.storage.local.get([j]);
        if (this.workspaceCacheInvalidated || o !== this.workspaceMutationVersion) return null;
        const a = n[j] || {}, r = a[i] || (t !== "projects" ? a[t] : null);
        if (r?.columns && Array.isArray(r.columns)) {
          const m = {
            columns: r.columns,
            projects: (a.projectsMeta?.projects || []).map((c) => ({
              id: String(c.id),
              name: c.name,
              color: c.color,
              colorHex: E[c.color || ""] || "#0ea5e9"
            })),
            activeProjectId: a.projectsMeta?.activeProjectId || e || this.activeProjectId || "",
            activeProjectName: a.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(r.columns.flatMap((c) => c.tasks.flatMap((h) => h.labels || [])))
            ).filter(Boolean)
          };
          return this.workspaceMemoryCache.set(i, { data: m, timestamp: r.savedAt || Date.now() }), m;
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
      const a = await this.getProjects(i);
      o();
      const r = a.filter(
        (l) => !l.inbox_project && !l.is_inbox_project && !/^(Inbox|收件箱)$/i.test(l.name) && !l.is_archived && !l.is_deleted
      );
      this.cachedProjects = r;
      const m = r.map((l) => ({
        id: String(l.id),
        name: l.name,
        color: l.color,
        colorHex: E[l.color || ""] || "#0ea5e9"
      }));
      if (e) {
        this.setActiveProjectId(String(e));
        const l = r.find((u) => String(u.id) === String(e));
        this.activeProjectName = l?.name || "";
      } else if (this.activeProjectId && r.some((l) => String(l.id) === String(this.activeProjectId))) {
        const l = r.find((u) => String(u.id) === String(this.activeProjectId));
        this.activeProjectName = l?.name || this.activeProjectName || "";
      } else r.length > 0 ? (this.setActiveProjectId(String(r[0].id)), this.activeProjectName = r[0].name) : (this.setActiveProjectId(""), this.activeProjectName = "");
      let c = [];
      const h = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
      if (t === "projects" && this.activeProjectId) {
        const [l, u] = await Promise.all([
          this.getSections(this.activeProjectId, i),
          this.getTasksByProject(this.activeProjectId, i)
        ]), y = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(u.filter((f) => !f.section_id), h)
        };
        c.push(y);
        for (const f of l)
          c.push({
            projectId: this.activeProjectId,
            sectionId: String(f.id),
            title: f.name,
            tasks: this.mapTasks(u.filter((w) => String(w.section_id) === String(f.id)), h)
          });
      } else if (t === "today") {
        const l = await this.getTasks("today | overdue", i), u = l.filter((f) => {
          const w = f.due?.date ? String(f.due.date).slice(0, 10) : "";
          return w && w < h;
        }), y = l.filter((f) => {
          const w = f.due?.date ? String(f.due.date).slice(0, 10) : "";
          return w === h || !w && f.due?.string;
        });
        c = [
          { sectionId: "overdue", title: "已逾期", tasks: this.mapTasks(u, h, "day_order") },
          { sectionId: "today", title: "今天", tasks: this.mapTasks(y, h, "day_order") }
        ];
      } else {
        const l = a.find((u) => u.inbox_project || u.is_inbox_project) || a.find((u) => /^(Inbox|收件箱)$/i.test(u.name));
        if (l) {
          const [u, y] = await Promise.all([
            this.getSections(l.id, i),
            this.getTasksByProject(l.id, i)
          ]), f = {
            projectId: String(l.id),
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(y.filter((w) => !w.section_id), h)
          };
          c.push(f);
          for (const w of u)
            c.push({
              projectId: String(l.id),
              sectionId: String(w.id),
              title: w.name,
              tasks: this.mapTasks(y.filter((R) => String(R.section_id) === String(w.id)), h)
            });
        } else {
          const y = (await this.getTasks(void 0, i)).filter((f) => !f.section_id);
          c = [
            { sectionId: "", title: "收件箱", tasks: this.mapTasks(y, h) }
          ];
        }
      }
      o();
      const p = Array.from(
        new Set(c.flatMap((l) => l.tasks.flatMap((u) => u.labels || [])))
      ).filter(Boolean), C = {
        columns: c,
        projects: m,
        activeProjectId: this.activeProjectId,
        activeProjectName: this.activeProjectName,
        availableLabels: p
      }, v = this.getWorkspaceCacheKey(t, this.activeProjectId), I = { data: C, timestamp: Date.now() };
      if (this.workspaceMemoryCache.set(v, I), n !== v && this.workspaceMemoryCache.set(n, I), this.workspaceCacheInvalidated = !1, typeof chrome < "u" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({
            [`todoistSnapshot:${v}`]: I,
            [`todoistSnapshot:${n}`]: I
          });
        } catch (l) {
          console.warn("[Todoist] Snapshot persistence failed", l);
        }
        o();
      }
      return C;
    } catch (a) {
      if (o(), console.warn("[TodoistService] Online fetch failed, fallback to local cache:", a), this.workspaceCacheInvalidated) throw a;
      const r = await this.getCachedWorkspaceData(t, e);
      if (r) return r;
      throw a;
    }
  }
  mapTasks(t, e, i = "child_order") {
    const s = K();
    return [...t].sort((o, n) => {
      const a = Number(o[i]), r = Number(n[i]);
      return Number.isFinite(a) && Number.isFinite(r) ? a - r : 0;
    }).map((o) => {
      const n = o.due?.date ? String(o.due.date).slice(0, 10) : "", a = n === e, r = !!(n && n < e), m = !!o.due?.recurring, c = this.timedTasks.find((h) => String(h.taskId) === String(o.id));
      return {
        id: String(o.id),
        content: o.content || "未命名任务",
        description: o.description || "",
        completed: !!o.is_completed,
        dueDate: o.due?.date || "",
        startDate: s(String(o.id), o.description || ""),
        dueText: O(o.due),
        dueString: o.due?.string || O(o.due),
        isOverdue: r,
        isDueToday: a,
        isRecurring: m,
        priority: o.priority ? Number(o.priority) : 1,
        labels: Array.isArray(o.labels) ? o.labels : [],
        timedDeadlineText: c ? this.formatTimerDeadline(c) : "",
        timedDurationMinutes: c?.durationMinutes,
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
    let s = "";
    for (let o = 0; o < 100; o++) {
      t?.throwIfAborted();
      const n = new URLSearchParams({ limit: "200" });
      s && n.set("cursor", s);
      const a = await this.api(`/tasks?${n}`, { signal: t }), r = g(a);
      for (const c of r) c?.id && !c.is_completed && e.set(String(c.id), c);
      const m = String(a?.next_cursor || "");
      if (!m) return [...e.values()];
      if (i.has(m)) throw new Error("日历任务分页游标重复");
      i.add(m), s = m;
    }
    throw new Error("日历任务分页超出上限，未应用不完整列表");
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
        const t = await chrome.storage.local.get([S, _]);
        Array.isArray(t[S]) && (this.timedTasks = t[S]), t[_] && (this.timerDuration = Number(t[_]) || 30), this.timerLoaded = !0, this.emitTimerState();
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
    return this.timerDuration = Math.max(5, Math.min(480, Math.round(t / 5) * 5)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [_]: this.timerDuration }), this.emitTimerState(), this.timerDuration;
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
    typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [S]: this.timedTasks }), this.emitTimerState();
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
    const i = e.match(/\.[a-zA-Z0-9]+$/), s = i ? i[0] : ".png", o = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${s}`, n = new FormData();
    n.append("file", t, o);
    const a = new Headers();
    a.set("Authorization", `Bearer ${this.token}`);
    const r = new AbortController(), m = setTimeout(() => r.abort(), 15e3);
    try {
      let c = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers: a,
        body: n,
        signal: r.signal
      });
      if (c.status === 404 && (c = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
        method: "POST",
        headers: a,
        body: n,
        signal: r.signal
      })), c.ok)
        return await c.json();
      const h = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: h,
        upload_state: "completed"
      };
    } catch {
      const c = await this.fileToOptimizedDataUrl(t);
      return {
        file_name: e,
        file_size: t.size,
        file_type: t.type || "image/png",
        file_url: c,
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
            let a = o.width, r = o.height;
            (a > 800 || r > 800) && (a > r ? (r = Math.round(r * 800 / a), a = 800) : (a = Math.round(a * 800 / r), r = 800));
            const m = document.createElement("canvas");
            m.width = a, m.height = r;
            const c = m.getContext("2d");
            if (c) {
              c.drawImage(o, 0, 0, a, r);
              const h = m.toDataURL("image/webp", 0.72);
              e(h.length < s.length ? h : s);
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
        await D.remove(this.getWorkspaceCacheKey("inbox")), await D.remove(this.getWorkspaceCacheKey("today")), await D.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId)), await D.remove("v3:projects:default");
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
    if (e?.throwIfAborted(), await this.initToken(), e?.throwIfAborted(), !this.token) throw new Error("请先配置 Todoist 账户");
    const i = t.until || (/* @__PURE__ */ new Date()).toISOString(), s = t.since || new Date(Date.parse(i) - 30 * 864e5).toISOString();
    if (!Number.isFinite(Date.parse(s)) || !Number.isFinite(Date.parse(i)) || Date.parse(s) >= Date.parse(i))
      throw new Error("完成历史日期范围无效");
    const o = [], n = /* @__PURE__ */ new Set();
    let a = "";
    for (let r = 0; r < 100; r++) {
      const m = new URLSearchParams({
        since: s,
        until: i,
        limit: String(Math.max(1, Math.min(200, t.limit || 200)))
      });
      t.project_id && m.set("project_id", t.project_id), a && m.set("cursor", a);
      const c = await this.api(`https://api.todoist.com/api/v1/tasks/completed/by_completion_date?${m}`, { signal: e });
      if (e?.throwIfAborted(), !Array.isArray(c?.items)) throw new Error("完成历史返回格式无效");
      for (const p of c.items) {
        if (!p || typeof p.id != "string" || typeof p.content != "string" || typeof p.completed_at != "string" || !Number.isFinite(Date.parse(p.completed_at)))
          throw new Error("完成历史任务格式无效");
        o.push({ ...p, task_id: p.id, completed_at: p.completed_at });
      }
      const h = c.next_cursor;
      if (h == null || h === "") return { items: o };
      if (typeof h != "string" || n.has(h)) throw new Error("完成历史分页无效");
      n.add(h), a = h;
    }
    throw new Error("完成历史分页超出上限，未应用不完整列表");
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
const V = x(k.getInstance(), [
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
  TODOIST_ACTIVE_PROJECT_ID_KEY: b,
  TODOIST_TIMED_TASKS_KEY: S,
  TODOIST_TIMER_DURATION_KEY: _,
  TODOIST_TOKEN_KEY: T,
  TODOIST_WORKSPACE_CACHE_KEY: j,
  TodoistService: k,
  getDefaultSectionName: N,
  setDefaultSectionName: L,
  todoistService: V
}, Symbol.toStringTag, { value: "Module" }));
export {
  T,
  B as a,
  H as b,
  K as c,
  Y as f,
  z as g,
  U as p,
  X as s,
  V as t
};
