/**
 * TodoistService — 现代化待办与日程纯数据服务 (Pure TypeScript, Zero DOM)
 * 物理抽离并彻底除名 newtab-todoist.js
 * 封装 Todoist API v1、离线缓存、多视图数据聚合、日历联动与番茄钟限时管理
 */

import type {
  TodoistTaskItem,
  TodoistColumnItem,
  TodoistProjectOption
} from "../todoist/task-list-store";
import { trackTodoistWrites, withTodoistWrite, todoistModuleState } from "../todoist/module-state";
import { createTodoistChangeChannel } from "../todoist/change-channel";
import { TodoistApiError, todoistHttpError, todoistErrorText } from "../todoist/api-error";
import { storageCache } from "./storage-cache.service";
import { createTaskStartDateReader } from "../todoist/task-date-helper";

const DEFAULT_SECTION_NAME_KEY = "todoistDefaultSectionName";

export function getDefaultSectionName(): string {
  try {
    return localStorage.getItem(DEFAULT_SECTION_NAME_KEY) || "默认板块";
  } catch {
    return "默认板块";
  }
}

export function setDefaultSectionName(name: string): void {
  const clean = String(name || "").trim() || "默认板块";
  try {
    localStorage.setItem(DEFAULT_SECTION_NAME_KEY, clean);
  } catch {}
}

export interface TodoistWorkspaceData {
  /** Transient stale-cache warning, never persisted as a successful snapshot. */
  readWarning?: string;
  columns: TodoistColumnItem[];
  projects: TodoistProjectOption[];
  activeProjectId: string;
  activeProjectName: string;
  availableLabels: string[];
}

declare const chrome: any;

export interface TodoistRawTask {
  id: string;
  content: string;
  description?: string;
  is_completed?: boolean;
  checked?: boolean;
  due?: {
    date?: string;
    string?: string;
    recurring?: boolean;
  };
  priority?: number;
  labels?: string[];
  project_id?: string;
  section_id?: string;
  url?: string;
  [key: string]: any;
}

/** Unified API v1 uses checked; legacy REST responses used is_completed. */
export function isTodoistTaskCompleted(task: { checked?: unknown; is_completed?: unknown }): boolean {
  return typeof task.checked === "boolean" ? task.checked : task.is_completed === true;
}

export interface TodoistRawProject {
  id: string;
  name: string;
  color?: string;
  order?: number;
  inbox_project?: boolean;
  is_inbox_project?: boolean;
  is_archived?: boolean;
  is_deleted?: boolean;
}

export interface TodoistRawSection {
  id: string;
  name: string;
  project_id: string;
  order?: number;
}

export interface TodoistTimedTask {
  id: string;
  taskId: string;
  title: string;
  durationMinutes: number;
  createdAt: number;
  deadlineAt: number;
  alertedAt: number;
  url?: string;
}

export interface TodoistTimerSnapshot {
  items: TodoistTimedTask[];
  duration: number;
  loaded: boolean;
}

export const TODOIST_TOKEN_KEY = "todoistToken";
export const TODOIST_WORKSPACE_CACHE_KEY = "todoistWorkspaceCacheV3";
export const TODOIST_TIMED_TASKS_KEY = "todoistTimedTasksV1";
export const TODOIST_TIMER_DURATION_KEY = "todoistTimerDurationV1";
export const TODOIST_ACTIVE_PROJECT_ID_KEY = "todoistActiveProjectIdV1";

const TODOIST_PROJECT_COLORS: Record<string, string> = {
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

function formatDueText(due?: { date?: string; string?: string; recurring?: boolean }): string {
  if (!due?.date) return due?.string || "";
  const dateStr = String(due.date).slice(0, 10);
  const now = new Date();
  const todayStr = now.toLocaleDateString("en-CA");
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("en-CA");

  if (dateStr === todayStr) return "今天";
  if (dateStr === tomorrowStr) return "明天";
  return dateStr;
}

function todoistResults<T>(payload: any): T[] {
  return Array.isArray(payload) ? payload : Array.isArray(payload?.results) ? payload.results : [];
}

export class TodoistService {
  private static instance: TodoistService;
  private token: string = "";
  // 定时器番茄钟状态
  private timerDuration: number = 30;
  private timedTasks: TodoistTimedTask[] = [];
  private timerLoaded: boolean = false;
  private timerListeners: Set<(snapshot: TodoistTimerSnapshot) => void> = new Set();

  // 任务变更监听器 (日历等协同)
  private taskListeners: Set<(change: { type: string; task?: any; date?: string }) => void> = new Set();

  // 项目与活动上下文缓存
  private cachedProjects: TodoistRawProject[] = [];
  private activeProjectId: string = (typeof localStorage !== "undefined" && localStorage.getItem("todoist_active_project_id")) || "";
  private inboxProjectId: string = (typeof localStorage !== "undefined" && localStorage.getItem("todoist_inbox_project_id")) || "";
  private activeProjectName: string = "";

  private readonly changeChannel = createTodoistChangeChannel(() => this.initToken(), () => {
    this.invalidateWorkspaceSnapshots();
    todoistModuleState.dataRevision++;
  });

  private constructor() {
    this.initToken();
    this.initTimers();
  }

  public static getInstance(): TodoistService {
    if (!TodoistService.instance) {
      TodoistService.instance = new TodoistService();
    }
    return TodoistService.instance;
  }

  public async initToken(): Promise<string> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      // 迁移并清除可能残留错误任务计数的历史脏缓存
      chrome.storage.local.remove([
        "todoistWorkspaceCacheV1",
        "todoistWorkspaceCacheV2",
        "lw_cache_inbox",
        "lw_cache_today",
        "lw_cache_projects:default"
      ]).catch?.(() => {});
      const res = await chrome.storage.local.get([TODOIST_TOKEN_KEY, TODOIST_ACTIVE_PROJECT_ID_KEY]);
      this.token = res[TODOIST_TOKEN_KEY] || "";
      if (res[TODOIST_ACTIVE_PROJECT_ID_KEY]) {
        this.activeProjectId = String(res[TODOIST_ACTIVE_PROJECT_ID_KEY]);
      }
    }
    return this.token;
  }

  public setActiveProjectId(projectId: string): void {
    this.activeProjectId = String(projectId || "");
    if (typeof localStorage !== "undefined") {
      try { localStorage.setItem("todoist_active_project_id", this.activeProjectId); } catch {}
    }
    if (typeof chrome !== "undefined" && chrome.storage?.local && this.activeProjectId) {
      const value = this.activeProjectId;
      void withTodoistWrite(async () => { await chrome.storage.local.set({ [TODOIST_ACTIVE_PROJECT_ID_KEY]: value }); })
        .catch(() => console.warn("[Todoist] Project preference persistence failed."));
    }
  }

  public getActiveProjectId(): string {
    return this.activeProjectId;
  }

  public getActiveProjectName(): string {
    return this.activeProjectName;
  }

  public setToken(token: string): void {
    this.token = token.trim();
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const value = this.token;
      void withTodoistWrite(async () => { await chrome.storage.local.set({ [TODOIST_TOKEN_KEY]: value }); })
        .catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }

  /** Module settings await persistence before switching the active credential. */
  public async saveAccountToken(token: string): Promise<void> {
    const value = token.trim();
    if (!value) throw new Error("请填写 Todoist Token");
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const previous = await chrome.storage.local.get(TODOIST_TOKEN_KEY);
      await chrome.storage.local.set({ [TODOIST_TOKEN_KEY]: value });
      if (previous[TODOIST_TOKEN_KEY] !== value) {
        const keys = Object.keys(await chrome.storage.local.get(null))
          .filter(key => key.startsWith("todoistSnapshot:"));
        await chrome.storage.local.remove([TODOIST_WORKSPACE_CACHE_KEY, ...keys]);
        this.invalidateWorkspaceSnapshots();
      }
    } else {
      localStorage.setItem(TODOIST_TOKEN_KEY, value);
      if (value !== this.token) this.workspaceMemoryCache.clear();
    }
    this.token = value;
  }

  public getToken(): string {
    return this.token;
  }

  /**
   * API v1 请求器（仅只读 404 可回退 rest/v2，写操作不重发）
   */
  private rateLimit: { token: string; until: number } | undefined;
  public async api<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const abort = () => controller.abort(options.signal?.reason);
    if (options.signal?.aborted) abort();
    else options.signal?.addEventListener("abort", abort, { once: true });
    let timedOut = false, submitted = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 15000);
    try {
      controller.signal.throwIfAborted();
      if (!this.token) {
        try { await this.initToken(); } catch { throw new TodoistApiError("configuration"); }
        controller.signal.throwIfAborted();
        if (!this.token) throw new TodoistApiError("configuration");
      }
      const requestToken = this.token;
      if (this.rateLimit?.token === requestToken && this.rateLimit.until > Date.now())
        throw new TodoistApiError("rate-limit", 429, this.rateLimit.until - Date.now());
      const headers = new Headers(options.headers || {});
      headers.set("Authorization", `Bearer ${requestToken}`);
      if (options.body && typeof options.body === "string" && !headers.has("Content-Type"))
        headers.set("Content-Type", "application/json");
      const base = "https://api.todoist.com/api/v1";
      const url = endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`;
      const target = new URL(url);
      if (target.origin !== "https://api.todoist.com" || target.username || target.password)
        throw new TodoistApiError("configuration");
      const method = String(options.method || "GET").toUpperCase();
      const writing = !["GET", "HEAD"].includes(method);
      const init = { ...options, headers, signal: controller.signal, credentials: "omit" as const, redirect: "error" as const };
      submitted = true;
      let resp = await fetch(url, init);
      if (resp.status === 404 && !endpoint.startsWith("http") && !writing) {
        // Only an unsupported read endpoint may fall back; auth/rate limits never do.
        await resp.body?.cancel();
        resp = await fetch(`https://api.todoist.com/rest/v2${endpoint}`, init);
      }
      if (!resp.ok) {
        const error = todoistHttpError(resp, submitted);
        if (error.kind === "rate-limit")
          this.rateLimit = { token: requestToken, until: Date.now() + (error.retryAfterMs || 60000) };
        await resp.body?.cancel();
        throw error;
      }
      if (writing) {
        if (requestToken === this.token) {
          this.invalidateWorkspaceSnapshots();
          todoistModuleState.dataRevision++;
        }
        void this.changeChannel.publish(requestToken);
      }
      if (resp.status === 204) return null as T;
      try { return await resp.json(); } catch (error) {
        if (controller.signal.aborted) throw error;
        throw new TodoistApiError("invalid-response", resp.status, undefined, submitted);
      }
    } catch (error) {
      if (error instanceof TodoistApiError) throw error;
      if (controller.signal.aborted) throw new TodoistApiError(
        options.signal?.aborted ? "cancelled" : timedOut ? "timeout" : "cancelled", undefined, undefined, submitted);
      throw new TodoistApiError("network", undefined, undefined, submitted);
    } finally {
      clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
    }
  }

  // ==========================================================================
  // 工作区加载与数据驱动 (取代 3600 行老 JS 的 loadTodoistWorkspace)
  // SWR 内存+持久化离线双层极速缓存架构，0ms 瞬开开箱即用
  // ==========================================================================

  private workspaceMemoryCache = new Map<string, { data: TodoistWorkspaceData; timestamp: number }>();
  private workspaceMutationVersion = 0;
  private workspaceCacheInvalidated = false;

  public invalidateWorkspaceSnapshots(): void {
    ++this.workspaceMutationVersion;
    this.workspaceCacheInvalidated = true;
    this.workspaceMemoryCache.clear();
  }

  public updateLocalCacheOnTaskCreated(task: TodoistRawTask, view: string, projectId?: string, targetSectionId?: string) {
    const key = this.getWorkspaceCacheKey(view, projectId);
    const mem = this.workspaceMemoryCache.get(key);
    if (mem && mem.data && Array.isArray(mem.data.columns) && mem.data.columns.length > 0) {
      let col = mem.data.columns.find((c) => {
        if (targetSectionId !== undefined) return c.sectionId === targetSectionId;
        if (task.section_id) return c.sectionId === task.section_id;
        return false;
      });
      if (!col) {
        col = mem.data.columns.find((c) => !c.sectionId) || mem.data.columns[0];
      }
      if (col) {
        const mapped = this.mapTasks([task], new Date().toISOString().slice(0, 10))[0];
        if (mapped && !col.tasks.some((t) => t.id === String(task.id))) {
          col.tasks.push(mapped);
        }
      }
    }
  }

  public getFastSnapshot(
    view: "inbox" | "today" | "projects" = "inbox",
    targetProjectId?: string
  ): TodoistWorkspaceData | null {
    const key = this.getWorkspaceCacheKey(view, targetProjectId);
    const mem = this.workspaceMemoryCache.get(key);
    if (mem?.data?.columns && Array.isArray(mem.data.columns) && mem.data.columns.length > 0) {
      return mem.data;
    }
    if (typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(`todoist_fast_snapshot:${key}`);
        if (raw) {
          const entry = JSON.parse(raw);
          if (entry?.data?.columns && Array.isArray(entry.data.columns) && entry.data.columns.length > 0) {
            this.workspaceMemoryCache.set(key, entry);
            return entry.data;
          }
        }
      } catch {}
    }
    return null;
  }

  public getWorkspaceCacheKey(view: string, projectId?: string): string {
    if (view === "projects") {
      return `v3:projects:${projectId || this.activeProjectId || "default"}`;
    }
    return `v3:${view}`;
  }

  public async getCachedWorkspaceData(
    view: "inbox" | "today" | "projects" = "inbox",
    targetProjectId?: string
  ): Promise<TodoistWorkspaceData | null> {
    const key = this.getWorkspaceCacheKey(view, targetProjectId);

    // 1. 优先读取内存缓存 (0ms 极速呈现)
    const mem = this.workspaceMemoryCache.get(key);
    if (mem && mem.data) {
      return mem.data;
    }

    if (this.workspaceCacheInvalidated) return null;
    const version = this.workspaceMutationVersion;
    // One canonical Chrome snapshot per view; old cache is read-only compatibility.
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const storageKey = `todoistSnapshot:${key}`;
        const stored = await chrome.storage.local.get(storageKey);
        if (this.workspaceCacheInvalidated || version !== this.workspaceMutationVersion) return null;
        const entry = stored[storageKey];
        // 允许 30 天内的本地离线缓存作为底包直出，绝不在超过 15 分钟后强行清空/阻断离线呈现
        if (entry?.data?.columns && Array.isArray(entry.data.columns) && Date.now() - entry.timestamp < 30 * 86400000) {
          this.workspaceMemoryCache.set(key, entry);
          if (typeof localStorage !== "undefined") {
            try { localStorage.setItem(`todoist_fast_snapshot:${key}`, JSON.stringify(entry)); } catch {}
          }
          return entry.data;
        }
      } catch {}
    }
    // 2. 读取持久化 storage 本地缓存
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get([TODOIST_WORKSPACE_CACHE_KEY]);
        if (this.workspaceCacheInvalidated || version !== this.workspaceMutationVersion) return null;
        const cache = stored[TODOIST_WORKSPACE_CACHE_KEY] || {};
        const entry = cache[key] || (view !== "projects" ? cache[view] : null);
        if (entry?.columns && Array.isArray(entry.columns)) {
          const result: TodoistWorkspaceData = {
            columns: entry.columns,
            projects: (cache.projectsMeta?.projects || []).map((p: any) => ({
              id: String(p.id),
              name: p.name,
              color: p.color,
              colorHex: TODOIST_PROJECT_COLORS[p.color || ""] || "#0ea5e9"
            })),
            activeProjectId: cache.projectsMeta?.activeProjectId || targetProjectId || this.activeProjectId || "",
            activeProjectName: cache.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(entry.columns.flatMap((c: any) => c.tasks.flatMap((t: any) => t.labels || [])))
            ).filter(Boolean) as string[]
          };
          this.workspaceMemoryCache.set(key, { data: result, timestamp: entry.savedAt || Date.now() });
          return result;
        }
      } catch {}
    }
    return null;
  }

  public async loadWorkspaceData(
    view: "inbox" | "today" | "projects" = "inbox",
    targetProjectId?: string,
    _force = false,
    signal?: AbortSignal
  ): Promise<TodoistWorkspaceData> {
    await this.initToken();
    signal?.throwIfAborted();
    if (!this.token) {
      const cached = await this.getCachedWorkspaceData(view, targetProjectId);
      signal?.throwIfAborted();
      return cached || { columns: [], projects: [], activeProjectId: "", activeProjectName: "", availableLabels: [] };
    }
    // The window already paints its cloned cache. No detached SWR callback may write its store.
    return this.fetchWorkspaceDataOnline(view, targetProjectId, signal);
  }

  public async fetchWorkspaceDataOnline(
    view: "inbox" | "today" | "projects" = "inbox",
    targetProjectId?: string,
    signal?: AbortSignal
  ): Promise<TodoistWorkspaceData> {
    const version = this.workspaceMutationVersion;
    const ensureCurrent = () => {
      signal?.throwIfAborted();
      if (version !== this.workspaceMutationVersion) throw new Error("任务位置已变化，旧看板读取失效");
    };
    ensureCurrent();
    const cacheKey = this.getWorkspaceCacheKey(view, targetProjectId);

    try {
      const effectiveProjId = targetProjectId || this.activeProjectId;
      const nowStr = new Date().toLocaleDateString("en-CA");

      // 并行化拉取：不再串行等待 projects 结束后才拉取任务和板块
      const projectsPromise = this.getProjects(signal);

      let sectionsPromise: Promise<TodoistRawSection[]>;
      let tasksPromise: Promise<TodoistRawTask[]>;

      if (view === "projects" && effectiveProjId) {
        sectionsPromise = this.getSections(effectiveProjId, signal);
        tasksPromise = this.getTasksByProject(effectiveProjId, signal);
      } else if (view === "today") {
        sectionsPromise = Promise.resolve([]);
        tasksPromise = this.getTasks("today | overdue", signal);
      } else {
        // Inbox 视图：若已知 Inbox ID 则直接并行拉取
        const inboxId = this.inboxProjectId;
        if (inboxId) {
          sectionsPromise = this.getSections(inboxId, signal);
          tasksPromise = this.getTasksByProject(inboxId, signal);
        } else {
          sectionsPromise = Promise.resolve([]);
          tasksPromise = Promise.resolve([]);
        }
      }

      // 等待第一波并行网络请求
      const [rawProjects, initialSections, initialTasks] = await Promise.all([
        projectsPromise,
        sectionsPromise,
        tasksPromise
      ]);
      ensureCurrent();

      const userProjects = rawProjects.filter(
        (p) => !p.inbox_project && !p.is_inbox_project && !/^(Inbox|收件箱)$/i.test(p.name) && !p.is_archived && !p.is_deleted
      );
      this.cachedProjects = userProjects;

      const projectOptions: TodoistProjectOption[] = userProjects.map((p) => ({
        id: String(p.id),
        name: p.name,
        color: p.color,
        colorHex: TODOIST_PROJECT_COLORS[p.color || ""] || "#0ea5e9"
      }));

      if (targetProjectId) {
        this.setActiveProjectId(String(targetProjectId));
        const found = userProjects.find((p) => String(p.id) === String(targetProjectId));
        this.activeProjectName = found?.name || "";
      } else if (this.activeProjectId && userProjects.some((p) => String(p.id) === String(this.activeProjectId))) {
        const found = userProjects.find((p) => String(p.id) === String(this.activeProjectId));
        this.activeProjectName = found?.name || this.activeProjectName || "";
      } else if (userProjects.length > 0) {
        this.setActiveProjectId(String(userProjects[0].id));
        this.activeProjectName = userProjects[0].name;
      } else {
        this.setActiveProjectId("");
        this.activeProjectName = "";
      }

      let columns: TodoistColumnItem[] = [];

      // 2. 根据不同视图装配任务
      if (view === "projects" && this.activeProjectId) {
        let sections = initialSections;
        let tasks = initialTasks;
        // 如果预取的 effectiveProjId 与最终确定的 activeProjectId 不一致，重新拉取
        if (effectiveProjId !== this.activeProjectId || (initialSections.length === 0 && initialTasks.length === 0)) {
          const [sec, tsk] = await Promise.all([
            this.getSections(this.activeProjectId, signal),
            this.getTasksByProject(this.activeProjectId, signal)
          ]);
          sections = sec;
          tasks = tsk;
        }

        const defaultCol: TodoistColumnItem = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(tasks.filter((t) => !t.section_id), nowStr)
        };
        columns.push(defaultCol);

        for (const sec of sections) {
          columns.push({
            projectId: this.activeProjectId,
            sectionId: String(sec.id),
            title: sec.name,
            tasks: this.mapTasks(tasks.filter((t) => String(t.section_id) === String(sec.id)), nowStr)
          });
        }
      } else if (view === "today") {
        const tasks = initialTasks;
        const overdueTasks = tasks.filter((t) => {
          const d = t.due?.date ? String(t.due.date).slice(0, 10) : "";
          return d && d < nowStr;
        });
        const todayTasks = tasks.filter((t) => {
          const d = t.due?.date ? String(t.due.date).slice(0, 10) : "";
          return d === nowStr || (!d && t.due?.string);
        });

        columns = [
          { sectionId: "overdue", title: "已逾期", tasks: this.mapTasks(overdueTasks, nowStr, "day_order") },
          { sectionId: "today", title: "今天", tasks: this.mapTasks(todayTasks, nowStr, "day_order") }
        ];
      } else {
        // 默认 Inbox
        const inbox = rawProjects.find((p) => p.inbox_project || p.is_inbox_project) || rawProjects.find((p) => /^(Inbox|收件箱)$/i.test(p.name));
        if (inbox) {
          const actualInboxId = String(inbox.id);
          this.inboxProjectId = actualInboxId;
          if (typeof localStorage !== "undefined") {
            try { localStorage.setItem("todoist_inbox_project_id", actualInboxId); } catch {}
          }

          let sections = initialSections;
          let tasks = initialTasks;
          if (!this.inboxProjectId || (initialSections.length === 0 && initialTasks.length === 0)) {
            const [sec, tsk] = await Promise.all([
              this.getSections(actualInboxId, signal),
              this.getTasksByProject(actualInboxId, signal)
            ]);
            sections = sec;
            tasks = tsk;
          }

          const defaultCol: TodoistColumnItem = {
            projectId: actualInboxId,
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(tasks.filter((t) => !t.section_id), nowStr)
          };
          columns.push(defaultCol);
          for (const sec of sections) {
            columns.push({
              projectId: actualInboxId,
              sectionId: String(sec.id),
              title: sec.name,
              tasks: this.mapTasks(tasks.filter((t) => String(t.section_id) === String(sec.id)), nowStr)
            });
          }
        } else {
          const tasks = await this.getTasks(undefined, signal);
          const inboxTasks = tasks.filter((t) => !t.section_id);
          columns = [
            { sectionId: "", title: "收件箱", tasks: this.mapTasks(inboxTasks, nowStr) }
          ];
        }
      }

      ensureCurrent();
      const availableLabels = Array.from(
        new Set(columns.flatMap((c) => c.tasks.flatMap((t) => t.labels || [])))
      ).filter(Boolean);

      const result: TodoistWorkspaceData = {
        columns,
        projects: projectOptions,
        activeProjectId: this.activeProjectId,
        activeProjectName: this.activeProjectName,
        availableLabels
      };

      const specificCacheKey = this.getWorkspaceCacheKey(view, this.activeProjectId);
      const entry = { data: result, timestamp: Date.now() };
      this.workspaceMemoryCache.set(specificCacheKey, entry);
      if (cacheKey !== specificCacheKey) this.workspaceMemoryCache.set(cacheKey, entry);
      this.workspaceCacheInvalidated = false;

      if (typeof localStorage !== "undefined") {
        try {
          const entryJson = JSON.stringify(entry);
          localStorage.setItem(`todoist_fast_snapshot:${specificCacheKey}`, entryJson);
          if (cacheKey !== specificCacheKey) {
            localStorage.setItem(`todoist_fast_snapshot:${cacheKey}`, entryJson);
          }
        } catch {}
      }

      // Persist once, with fallback to legacy cache key for backward compatibility.
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({
            [`todoistSnapshot:${specificCacheKey}`]: entry,
            [`todoistSnapshot:${cacheKey}`]: entry
          });
        } catch (error) { console.warn("[Todoist] Snapshot persistence failed", error); }
        ensureCurrent();
      }

      return result;
    } catch (netErr: any) {
      ensureCurrent();
      console.warn("[TodoistService] Online fetch failed, fallback to local cache:", netErr);
      if (this.workspaceCacheInvalidated) throw netErr;
      const cached = await this.getCachedWorkspaceData(view, targetProjectId);
      if (cached) return { ...cached, readWarning: todoistErrorText(netErr) };
      throw netErr;
    }
  }

  public mapTasks(rawTasks: TodoistRawTask[], nowStr: string, orderField: "child_order" | "day_order" = "child_order"): TodoistTaskItem[] {
    const readStartDate = createTaskStartDateReader();
    return [...rawTasks].sort((a, b) => {
      const left = Number(a[orderField]), right = Number(b[orderField]);
      return Number.isFinite(left) && Number.isFinite(right) ? left - right : 0;
    }).map((task) => {
      const dueDateStr = task.due?.date ? String(task.due.date).slice(0, 10) : "";
      const isDueToday = dueDateStr === nowStr;
      const isOverdue = !!(dueDateStr && dueDateStr < nowStr);
      const isRecurring = !!task.due?.recurring;

      const timed = this.timedTasks.find((item) => String(item.taskId) === String(task.id));

      return {
        id: String(task.id),
        content: task.content || "未命名任务",
        description: task.description || "",
        completed: isTodoistTaskCompleted(task),
        dueDate: task.due?.date || "",
        startDate: readStartDate(String(task.id), task.description || ""),
        dueText: formatDueText(task.due),
        dueString: task.due?.string || formatDueText(task.due),
        isOverdue,
        isDueToday,
        isRecurring,
        priority: task.priority ? Number(task.priority) : 1,
        labels: Array.isArray(task.labels) ? task.labels : [],
        timedDeadlineText: timed ? this.formatTimerDeadline(timed) : "",
        timedDurationMinutes: timed?.durationMinutes,
        url: task.url || `https://app.todoist.com/app/task/${task.id}`,
        _taskRaw: task
      };
    });
  }

  // ==========================================================================
  // 日历模块协同与事件广播 (`window.LogicWeaverTodoistTasks`)
  // ==========================================================================

  public async listCalendarTasks(signal?: AbortSignal): Promise<TodoistRawTask[]> {
    signal?.throwIfAborted();
    await this.initToken();
    signal?.throwIfAborted();
    if (!this.token) throw new Error("Todoist 尚未配置，未读取日历任务");
    const tasks = new Map<string, TodoistRawTask>();
    const cursors = new Set<string>();
    let cursor = "";
    for (let page = 0; page < 100; page++) {
      signal?.throwIfAborted();
      const query = new URLSearchParams({ limit: "200" });
      if (cursor) query.set("cursor", cursor);
      const response = await this.api<any>(`/tasks?${query}`, { signal });
      const results = todoistResults<TodoistRawTask>(response);
      for (const task of results) if (task?.id && !isTodoistTaskCompleted(task)) tasks.set(String(task.id), task);
      const next = String(response?.next_cursor || "");
      if (!next) return [...tasks.values()];
      if (cursors.has(next)) throw new Error("日历任务分页游标重复");
      cursors.add(next); cursor = next;
    }
    throw new Error("日历任务分页超出上限，未应用不完整列表");
  }

  public async setTaskDueDate(taskId: string, date: string): Promise<TodoistRawTask> {
    const dueDate = String(date || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) throw new Error("截止日期格式无效");
    const updated = await this.updateTask(taskId, { due_string: dueDate });
    this.broadcastTaskChange({ type: "due", task: updated, date: dueDate });
    return updated;
  }

  public subscribeTasks(listener: (change: { type: string; task?: any; date?: string }) => void): () => void {
    this.taskListeners.add(listener);
    return () => this.taskListeners.delete(listener);
  }

  private broadcastTaskChange(change: { type: string; task?: any; date?: string }): void {
    this.taskListeners.forEach((l) => {
      try { l(change); } catch {}
    });
  }

  // ==========================================================================
  // 番茄钟与限时任务管理 (`window.LogicWeaverTodoistTimer`)
  // ==========================================================================

  private async initTimers(): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get([TODOIST_TIMED_TASKS_KEY, TODOIST_TIMER_DURATION_KEY]);
        if (Array.isArray(stored[TODOIST_TIMED_TASKS_KEY])) {
          this.timedTasks = stored[TODOIST_TIMED_TASKS_KEY];
        }
        if (stored[TODOIST_TIMER_DURATION_KEY]) {
          this.timerDuration = Number(stored[TODOIST_TIMER_DURATION_KEY]) || 30;
        }
        this.timerLoaded = true;
        this.emitTimerState();
      } catch {}
    }
  }

  public getTimerSnapshot(): TodoistTimerSnapshot {
    return {
      items: [...this.timedTasks].sort((a, b) => a.deadlineAt - b.deadlineAt),
      duration: this.timerDuration,
      loaded: this.timerLoaded
    };
  }

  public async setTimerDuration(minutes: number): Promise<number> {
    this.timerDuration = Math.max(5, Math.min(480, Math.round(minutes / 5) * 5));
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ [TODOIST_TIMER_DURATION_KEY]: this.timerDuration });
    }
    this.emitTimerState();
    return this.timerDuration;
  }

  public async createTimer(title: string, duration = this.timerDuration): Promise<TodoistTimedTask> {
    const content = title.trim();
    if (!content) throw new Error("请输入任务名称");
    const rawTask = await this.createTask({ content });
    const now = Date.now();
    const item: TodoistTimedTask = {
      id: `timer-${rawTask.id}`,
      taskId: String(rawTask.id),
      title: content,
      durationMinutes: duration,
      createdAt: now,
      deadlineAt: now + duration * 60000,
      alertedAt: 0,
      url: rawTask.url
    };
    this.timedTasks.push(item);
    await this.persistTimers();
    return item;
  }

  public async completeTimer(timerId: string): Promise<void> {
    const item = this.timedTasks.find((t) => t.id === timerId);
    if (!item) return;
    await this.toggleTaskCompletion(item.taskId, true);
    this.timedTasks = this.timedTasks.filter((t) => t.id !== timerId);
    await this.persistTimers();
    this.broadcastTaskChange({ type: "removed", task: { id: item.taskId } });
  }

  public async snoozeTimer(timerId: string, minutes = 5): Promise<TodoistTimedTask> {
    const item = this.timedTasks.find((t) => t.id === timerId);
    if (!item) throw new Error("限时任务不存在");
    item.deadlineAt = Date.now() + Math.max(1, minutes) * 60000;
    item.alertedAt = 0;
    await this.persistTimers();
    return item;
  }

  public async claimExpiredTimer(timerId: string): Promise<TodoistTimedTask | null> {
    const item = this.timedTasks.find((t) => t.id === timerId);
    if (!item || item.deadlineAt > Date.now() || item.alertedAt > 0) return null;
    item.alertedAt = Date.now();
    await this.persistTimers();
    return { ...item };
  }

  public subscribeTimer(listener: (snapshot: TodoistTimerSnapshot) => void): () => void {
    this.timerListeners.add(listener);
    listener(this.getTimerSnapshot());
    return () => this.timerListeners.delete(listener);
  }

  private async persistTimers(): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ [TODOIST_TIMED_TASKS_KEY]: this.timedTasks });
    }
    this.emitTimerState();
  }

  private emitTimerState(): void {
    const snap = this.getTimerSnapshot();
    this.timerListeners.forEach((l) => {
      try { l(snap); } catch {}
    });
  }

  private formatTimerDeadline(item: TodoistTimedTask): string {
    const date = new Date(item.deadlineAt);
    if (!Number.isFinite(date.getTime())) return "";
    const now = new Date();
    const clock = date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
    if (date.toDateString() === now.toDateString()) return `截止 ${clock}`;
    return `截止 ${date.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} ${clock}`;
  }

  // ==========================================================================
  // 标准 REST API 原生 CRUD
  // ==========================================================================

  public getDefaultSectionName(): string {
    return getDefaultSectionName();
  }

  public setDefaultSectionName(name: string): void {
    setDefaultSectionName(name);
  }

  public async getProjects(signal?: AbortSignal): Promise<TodoistRawProject[]> {
    const res = await this.api<any>("/projects?limit=200", { signal });
    return todoistResults<TodoistRawProject>(res);
  }

  public async getSections(projectId: string, signal?: AbortSignal): Promise<TodoistRawSection[]> {
    const res = await this.api<any>(`/sections?project_id=${encodeURIComponent(projectId)}&limit=200`, { signal });
    return todoistResults<TodoistRawSection>(res);
  }

  public async getTasks(filter?: string, signal?: AbortSignal): Promise<TodoistRawTask[]> {
    if (filter) {
      try {
        const res = await this.api<any>(`/tasks/filter?query=${encodeURIComponent(filter)}`, { signal });
        return todoistResults<TodoistRawTask>(res);
      } catch (error) {
        signal?.throwIfAborted();
        if (!(error instanceof TodoistApiError) || error.kind !== "not-found") throw error;
        try {
          const res = await this.api<any>(`/tasks?filter=${encodeURIComponent(filter)}`, { signal });
          return todoistResults<TodoistRawTask>(res);
        } catch (error) {
          signal?.throwIfAborted();
          if (!(error instanceof TodoistApiError) || error.kind !== "not-found") throw error;
          const fallback = await this.api<any>("/tasks?limit=200", { signal });
          return todoistResults<TodoistRawTask>(fallback);
        }
      }
    }
    const res = await this.api<any>("/tasks?limit=200", { signal });
    return todoistResults<TodoistRawTask>(res);
  }

  public async getTasksByProject(projectId: string, signal?: AbortSignal): Promise<TodoistRawTask[]> {
    const res = await this.api<any>(`/tasks?project_id=${encodeURIComponent(projectId)}&limit=200`, { signal });
    return todoistResults<TodoistRawTask>(res);
  }

  public async toggleTaskCompletion(taskId: string, completed: boolean): Promise<void> {
    const endpoint = completed
      ? `/tasks/${encodeURIComponent(taskId)}/close`
      : `/tasks/${encodeURIComponent(taskId)}/reopen`;
    await this.api(endpoint, { method: "POST" });
  }

  public async reopenTask(taskId: string): Promise<void> {
    await this.api(`/tasks/${encodeURIComponent(taskId)}/reopen`, { method: "POST" });
    this.broadcastTaskChange({ type: "updated", task: { id: taskId, checked: false, is_completed: false } });
  }

  public async updateTask(
    taskId: string,
    updates: {
      content?: string;
      description?: string;
      priority?: number;
      due_string?: string;
      due_date?: string;
      labels?: string[];
      child_order?: number;
      day_order?: number;
    }
  ): Promise<TodoistRawTask> {
    return this.api<TodoistRawTask>(`/tasks/${encodeURIComponent(taskId)}`, {
      method: "POST",
      body: JSON.stringify(updates)
    });
  }

  public async createTask(payload: {
    content: string;
    description?: string;
    project_id?: string;
    section_id?: string;
    due_string?: string;
    due_date?: string;
    due_datetime?: string;
    priority?: number;
    labels?: string[];
  }, requestId?: string): Promise<TodoistRawTask> {
    return this.api<TodoistRawTask>("/tasks", {
      method: "POST",
      headers: requestId ? { "X-Request-Id": requestId } : undefined,
      body: JSON.stringify(payload)
    });
  }

  /**
   * 上传二进制文件/图片至 Todoist 官方云端存储 (Sync API v9 uploads)
   */
  public async uploadFile(file: File | Blob, fileName = "image.png"): Promise<{
    file_name: string;
    file_size: number;
    file_type: string;
    file_url: string;
    upload_state: string;
  }> {
    if (!this.token) {
      await this.initToken();
      if (!this.token) throw new Error("请先在设置中配置 Todoist Token");
    }

    // 确保文件名是纯 ASCII 字符，避免某些后端对中文 UTF-8 文件名解析异常
    const extMatch = fileName.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : ".png";
    const safeName = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${ext}`;

    const formData = new FormData();
    formData.append("file", file, safeName);

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.token}`);

    // 设置 15 秒超时控制器，防止网络不佳时永久挂起
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      // 1. 优先尝试 Todoist REST API v1 官方标准上传接口
      let resp = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers,
        body: formData,
        signal: controller.signal
      });

      // 2. 若 v1 404，回退至 Sync API v9
      if (resp.status === 404) {
        resp = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
          method: "POST",
          headers,
          body: formData,
          signal: controller.signal
        });
      }

      if (resp.ok) {
        return await resp.json();
      }

      // 若云端上传未成功（例如免费版账号无云端附件权限），优雅降级为本地内嵌图
      const dataUrl = await this.fileToOptimizedDataUrl(file);
      return {
        file_name: fileName,
        file_size: file.size,
        file_type: file.type || "image/png",
        file_url: dataUrl,
        upload_state: "completed"
      };
    } catch {
      // 网络/超时故障时同样优雅降级
      const dataUrl = await this.fileToOptimizedDataUrl(file);
      return {
        file_name: fileName,
        file_size: file.size,
        file_type: file.type || "image/png",
        file_url: dataUrl,
        upload_state: "completed"
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async fileToOptimizedDataUrl(file: File | Blob): Promise<string> {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || typeof document === "undefined" || !(file instanceof Blob)) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const rawData = String(reader.result || "");
        if (file.size <= 64 * 1024) {
          resolve(rawData);
          return;
        }
        const img = new Image();
        img.onload = () => {
          try {
            const MAX_DIM = 800;
            let w = img.width, h = img.height;
            if (w > MAX_DIM || h > MAX_DIM) {
              if (w > h) { h = Math.round((h * MAX_DIM) / w); w = MAX_DIM; }
              else { w = Math.round((w * MAX_DIM) / h); h = MAX_DIM; }
            }
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h);
              const compressed = canvas.toDataURL("image/webp", 0.72);
              resolve(compressed.length < rawData.length ? compressed : rawData);
              return;
            }
          } catch {}
          resolve(rawData);
        };
        img.onerror = () => resolve(rawData);
        img.src = rawData;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  }

  /**
   * 为任务添加评论与附件
   */
  public async addComment(payload: {
    task_id: string;
    content?: string;
    attachment?: {
      resource_type: "file";
      file_url: string;
      file_name: string;
      file_type: string;
    };
  }): Promise<any> {
    return this.api("/comments", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  /**
   * 创建任务并附带上传好的图片附件（同时在 description 注入 Markdown 预览并在评论区关联附件）
   */
  public async createTaskWithAttachments(payload: {
    content: string;
    description?: string;
    project_id?: string;
    section_id?: string;
    due_string?: string;
    due_date?: string;
    due_datetime?: string;
    priority?: number;
    labels?: string[];
    attachments?: Array<{
      file_url: string;
      file_name: string;
      file_type: string;
    }>;
  }): Promise<TodoistRawTask> {
    let description = payload.description || "";
    const attachments = payload.attachments || [];

    // 在描述中追加图片预览
    if (attachments.length > 0) {
      for (const att of attachments) {
        description += `\n\n![${att.file_name}](${att.file_url})`;
      }
    }

    const createdTask = await this.createTask({
      content: payload.content,
      description: description.trim() || undefined,
      project_id: payload.project_id,
      section_id: payload.section_id,
      due_string: payload.due_string,
      due_date: payload.due_date,
      due_datetime: payload.due_datetime,
      priority: payload.priority,
      labels: payload.labels
    });

    // 关联官方 Comment 附件
    if (createdTask && createdTask.id && attachments.length > 0) {
      for (const att of attachments) {
        try {
          await this.addComment({
            task_id: String(createdTask.id),
            content: `📎 附件图片: ${att.file_name}`,
            attachment: {
              resource_type: "file",
              file_url: att.file_url,
              file_name: att.file_name,
              file_type: att.file_type
            }
          });
        } catch (err) {
          console.warn("[Todoist] Add comment attachment failed:", err);
        }
      }
    }

    return createdTask;
  }

  public async deleteTask(taskId: string): Promise<void> {
    await this.api(`/tasks/${encodeURIComponent(taskId)}`, { method: "DELETE" });
  }

  public async moveTask(taskId: string, target: { projectId: string; sectionId: string }): Promise<TodoistRawTask> {
    if (!taskId || taskId.startsWith("optimistic-") || !target.projectId) throw new Error("任务或目标项目尚未就绪");
    // Exactly one destination; project destination moves to its root (no section).
    const destination = target.sectionId ? { section_id: target.sectionId } : { project_id: target.projectId };
    try {
      const task = await this.api<TodoistRawTask>(`/tasks/${encodeURIComponent(taskId)}/move`, {
        method: "POST", body: JSON.stringify(destination)
      });
      if (!task || String(task.id) !== taskId || String(task.project_id) !== target.projectId ||
          String(task.section_id || "") !== target.sectionId) throw new Error("任务移动回复未确认目标，请刷新核对");
      return task;
    } finally { this.invalidateWorkspaceSnapshots(); }
  }

  public async moveTaskToProject(taskId: string, projectId: string): Promise<TodoistRawTask> {
    return this.moveTask(taskId, { projectId, sectionId: "" });
  }

  public async reorderTask(taskId: string, order: number, today = false): Promise<TodoistRawTask> {
    if (!taskId || taskId.startsWith("optimistic-") || !Number.isInteger(order) || order < 1) {
      throw new Error("任务排序参数无效");
    }
    try {
      const task = await this.updateTask(taskId, today ? { day_order: order } : { child_order: order });
      if (!task || String(task.id) !== taskId || Number(task[today ? "day_order" : "child_order"]) !== order) {
        throw new Error("任务排序回复未确认，请刷新核对");
      }
      return task;
    } finally { this.invalidateWorkspaceSnapshots(); }
  }

  public async createSection(name: string, projectId: string): Promise<TodoistRawSection> {
    return this.api<TodoistRawSection>("/sections", {
      method: "POST",
      body: JSON.stringify({ name: name.trim(), project_id: projectId })
    });
  }

  public async renameSection(sectionId: string, newName: string): Promise<TodoistRawSection> {
    return this.api<TodoistRawSection>(`/sections/${encodeURIComponent(sectionId)}`, {
      method: "POST",
      body: JSON.stringify({ name: newName.trim() })
    });
  }

  public async deleteSection(sectionId: string): Promise<void> {
    const cleanId = String(sectionId || "").trim();
    if (!cleanId) return;

    // Do not fall back to a pre-deletion in-memory or persistent snapshot.
    this.invalidateWorkspaceSnapshots();

    // 1. 调用 Todoist 官方删除 Section 接口
    await this.api(`/sections/${encodeURIComponent(cleanId)}`, { method: "DELETE" });

    // 2. 清理工作区各视图的本地持久化缓存，确保下次强制拉取最新云端数据
    try {
      await storageCache.remove(this.getWorkspaceCacheKey("inbox"));
      await storageCache.remove(this.getWorkspaceCacheKey("today"));
      await storageCache.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId));
      await storageCache.remove("v3:projects:default");
    } catch (_) {}
  }

  public async createProject(name: string): Promise<TodoistRawProject> {
    return this.api<TodoistRawProject>("/projects", {
      method: "POST",
      body: JSON.stringify({ name: name.trim() })
    });
  }

  public async renameProject(projectId: string, newName: string): Promise<TodoistRawProject> {
    return this.api<TodoistRawProject>(`/projects/${encodeURIComponent(projectId)}`, {
      method: "POST",
      body: JSON.stringify({ name: newName.trim() })
    });
  }

  public async deleteProject(projectId: string): Promise<void> {
    await this.api(`/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" });
  }

  /**
   * 获取指定任务的全部评论与文件附件列表
   */
  public async getComments(taskId: string, signal?: AbortSignal): Promise<Array<{
    id: string;
    task_id: string;
    content: string;
    posted_at: string;
    attachment?: {
      file_name: string;
      file_size: number;
      file_type: string;
      file_url: string;
      upload_state: string;
    };
  }>> {
    const res = await this.api<any>(`/comments?task_id=${encodeURIComponent(taskId)}`, { signal });
    return todoistResults(res);
  }

  /**
   * 查询历史已完成任务列表 (Sync API v9 /completed/get_all)
   */
  public async getCompletedTasks(params: {
    since?: string; until?: string; project_id?: string; limit?: number;
  } = {}, signal?: AbortSignal): Promise<{
    items: Array<TodoistRawTask & { task_id: string; completed_at: string }>;
  }> {
    signal?.throwIfAborted();
    await this.initToken();
    signal?.throwIfAborted();
    if (!this.token) throw new Error("请先配置 Todoist 账户");
    const until = params.until || new Date().toISOString();
    const since = params.since || new Date(Date.parse(until) - 30 * 86400000).toISOString();
    if (!Number.isFinite(Date.parse(since)) || !Number.isFinite(Date.parse(until)) || Date.parse(since) >= Date.parse(until))
      throw new Error("完成历史日期范围无效");
    const items: Array<TodoistRawTask & { task_id: string; completed_at: string }> = [];
    const cursors = new Set<string>();
    let cursor = "";
    for (let page = 0; page < 100; page++) {
      const query = new URLSearchParams({
        since, until, limit: String(Math.max(1, Math.min(200, params.limit || 200)))
      });
      if (params.project_id) query.set("project_id", params.project_id);
      if (cursor) query.set("cursor", cursor);
      // Official v1 endpoint and snake_case wire format; never retry the retired Sync v9 route.
      const response = await this.api<any>(`https://api.todoist.com/api/v1/tasks/completed/by_completion_date?${query}`, { signal });
      signal?.throwIfAborted();
      if (!Array.isArray(response?.items)) throw new Error("完成历史返回格式无效");
      for (const task of response.items) {
        if (!task || typeof task.id !== "string" || typeof task.content !== "string" ||
            typeof task.completed_at !== "string" || !Number.isFinite(Date.parse(task.completed_at)))
          throw new Error("完成历史任务格式无效");
        items.push({ ...task, task_id: task.id, completed_at: task.completed_at });
      }
      const next = response.next_cursor;
      if (next == null || next === "") return { items };
      if (typeof next !== "string" || cursors.has(next)) throw new Error("完成历史分页无效");
      cursors.add(next); cursor = next;
    }
    throw new Error("完成历史分页超出上限，未应用不完整列表");
  }
  /**
   * 获取 Todoist 云端个人标签库 (REST API v2 /labels)
   */
  public async getLabels(signal?: AbortSignal): Promise<Array<{
    id: string;
    name: string;
    color: string;
    order: number;
    is_favorite: boolean;
  }>> {
    const res = await this.api<any>("/labels", { signal });
    return todoistResults(res);
  }

  /**
   * 在云端创建新标签
   */
  public async createLabel(name: string, color?: string): Promise<{
    id: string;
    name: string;
    color: string;
    order: number;
    is_favorite: boolean;
  }> {
    return this.api("/labels", {
      method: "POST",
      body: JSON.stringify({ name: name.trim(), color })
    });
  }

  /**
   * 在云端删除标签
   */
  public async deleteLabel(labelId: string): Promise<void> {
    await this.api(`/labels/${encodeURIComponent(labelId)}`, { method: "DELETE" });
  }
}

export const todoistService = trackTodoistWrites(TodoistService.getInstance(), [
  "saveAccountToken", "setTaskDueDate", "setTimerDuration",
  "createTimer", "completeTimer", "snoozeTimer", "claimExpiredTimer", "uploadFile",
  "createTaskWithAttachments"
], true);
