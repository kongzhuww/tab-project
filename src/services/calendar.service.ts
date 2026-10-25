/**
 * CalendarService — 现代化日历与日程管理服务
 * 封装 Todoist 任务截止日同步、Google Calendar OAuth 与 API 双向联动
 * 并驱动 CalendarView、CalendarWorkspace 及 TodoistCalendarSidebar 响应式岛屿
 */

declare const chrome: any;

import { calendarViewController, CalendarCellView, CalendarTaskView, CalendarEventView } from "../calendar/store";
import { calendarWorkspaceController } from "../calendar/workspace-store";
import { todoistCalendarSidebarController } from "../todoist/calendar-sidebar-store";
import { withTodoistWrite } from "../todoist/module-state";
import { openTodoistTask } from "../todoist/task-navigation";

export const TODOIST_CALENDAR_CACHE_KEY = "todoistCalendarCacheV1";
export const GOOGLE_CALENDAR_CACHE_KEY = "googleCalendarDayLineCacheV1";
export const GOOGLE_TODOIST_LINKS_KEY = "googleTodoistCalendarLinksV1";
export const GOOGLE_CALENDAR_TOKEN_KEY = "googleCalendarSessionTokenV1";
export const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly";

export interface GoogleCalendarItem {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  status?: string;
  start?: { date?: string; dateTime?: string; timeZone?: string };
  end?: { date?: string; dateTime?: string; timeZone?: string };
  _calendarId?: string;
  _calendarName?: string;
  _calendarColor?: string;
  _calendarAccessRole?: string;
  extendedProperties?: { private?: Record<string, string> };
  [key: string]: any;
}

export interface TodoistTaskItem {
  id: string | number;
  content?: string;
  description?: string;
  labels?: string[];
  priority?: number;
  url?: string;
  is_completed?: boolean;
  due?: {
    date?: string;
    datetime?: string;
    is_recurring?: boolean;
    recurring?: boolean;
    string?: string;
  };
  [key: string]: any;
}

const CHINESE_MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

function storageGetLocal(keys: string[]): Promise<Record<string, any>> {
  if (typeof (window as any).storageGet === "function") {
    return (window as any).storageGet(keys);
  }
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local?.get) {
      chrome.storage.local.get(keys, resolve);
    } else {
      resolve({});
    }
  });
}

async function storageSetLocal(items: Record<string, any>): Promise<void> {
  if (typeof chrome === "undefined" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  // MV3 promise rejects on persistence failure; do not report a failed cache write as saved.
  await chrome.storage.local.set(items);
}

export class CalendarService {
  public todoistTasks: TodoistTaskItem[] = [];
  public currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  public selectedDate: string = "";
  public dropDate: string = "";
  public todoistSavedAt: number = 0;
  public isTodoistLoading: boolean = false;

  public googleCalendars: any[] = [];
  public googleEvents: GoogleCalendarItem[] = [];
  public googleLinks: Record<string, any> = {};
  public googleSavedAt: number = 0;
  public googleRangeStart: string = "";
  public googleRangeEnd: string = "";
  public isGoogleConnected: boolean = false;
  public isGoogleLoading: boolean = false;
  public isGoogleSyncing: boolean = false;
  public googleLastError: Error | null = null;
  private googleWaiters: Array<(val?: any) => void> = [];

  private initialized = false;
  private initialization: Promise<void> | null = null;
  private todoistLoad: Promise<boolean> | null = null;
  private taskRevision = 0;
  private taskReadSequence = 0;
  private readonly taskWrites = new Set<string>();

  constructor() {
    // Install lightweight action routing only; consumers explicitly request data initialization.
    this.initControllers();
  }

  public init(): Promise<void> {
    if (this.initialization) return this.initialization;
    if (this.initialized) return Promise.resolve();
    this.initialization = this.initializeData().then(() => { this.initialized = true; })
      .finally(() => { this.initialization = null; });
    return this.initialization;
  }

  private async initializeData(): Promise<void> {

    try {
      const stored = await storageGetLocal([GOOGLE_CALENDAR_CACHE_KEY]);
      const cache = stored?.[GOOGLE_CALENDAR_CACHE_KEY];
      if (cache && Array.isArray(cache.events)) {
        this.googleCalendars = cache.calendars || [];
        this.googleEvents = cache.events || [];
        this.googleSavedAt = Number(cache.savedAt || 0);
        this.googleRangeStart = String(cache.rangeStart || "");
        this.googleRangeEnd = String(cache.rangeEnd || "");
        if (this.googleEvents.length > 0) {
          this.isGoogleConnected = true;
        }
      }
    } catch (err) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", err);
    }

    this.publishCalendarViews();
    this.loadGoogleCalendarRange(false, false).catch(() => {});
  }

  private initControllers(): void {
    todoistCalendarSidebarController.onAction(async (action, payload) => {
      if (action === "init") {
        try { this.syncSidebarToVue(); }
        catch { calendarWorkspaceController.setStatusText("日历初始化未完成，请稍后重新打开。"); }
      } else if (action === "toggle-collapsed") {
        const next = todoistCalendarSidebarController.state.collapsed;
        todoistCalendarSidebarController.setCollapsed(next);
        try { localStorage.setItem("lw_todoist_cal_collapsed", next ? "1" : "0"); } catch {}
      } else if (action === "today") {
        this.goToday();
      } else if (action === "prev-month") {
        this.changeMonth(-1, false);
      } else if (action === "next-month") {
        this.changeMonth(1, false);
      } else if (action === "prev-year") {
        this.currentMonth = new Date(this.currentMonth.getFullYear() - 1, this.currentMonth.getMonth(), 1);
        this.publishCalendarViews();
      } else if (action === "next-year") {
        this.currentMonth = new Date(this.currentMonth.getFullYear() + 1, this.currentMonth.getMonth(), 1);
        this.publishCalendarViews();
      } else if (action === "select-date") {
        this.selectedDate = payload;
        this.publishCalendarViews();
      } else if (action === "drop-task") {
        const { taskId, date } = payload;
        this.highlightDrop("");
        await this.assignTaskToDate(taskId, date);
      }
    });
  }

  public dateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  public friendlyDate(dateKey: string): string {
    const date = new Date(`${dateKey}T00:00:00`);
    return Number.isFinite(date.getTime())
      ? date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" })
      : dateKey;
  }

  public async loadGoogleCalendarClientId(): Promise<string> {
    const stored = await storageGetLocal(["gmailOAuthClientId"]);
    let clientId = String(stored.gmailOAuthClientId || "").trim();
    if (!clientId && typeof chrome !== "undefined" && chrome.runtime?.getURL) {
      try {
        const res = await fetch(chrome.runtime.getURL("gmail-oauth-client.local.json"), { cache: "no-store" });
        if (res.ok) {
          const j = await res.json();
          clientId = String(j.clientId || "").trim();
        }
      } catch {}
    }
    return clientId;
  }

  public async googleCalendarToken(interactive = false): Promise<string> {
    if (typeof chrome === "undefined" || !chrome.storage?.local) return "";
    const stored = await chrome.storage.local.get(GOOGLE_CALENDAR_TOKEN_KEY);
    const current = stored[GOOGLE_CALENDAR_TOKEN_KEY];
    if (current?.token && current.scope === GOOGLE_CALENDAR_SCOPE && Number(current.expiresAt || 0) > Date.now() + 30000) {
      return current.token;
    }
    const clientId = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(clientId)) {
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    }
    const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    const expectedState = crypto.randomUUID();
    auth.searchParams.set("client_id", clientId);
    auth.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google"));
    auth.searchParams.set("response_type", "token");
    auth.searchParams.set("scope", GOOGLE_CALENDAR_SCOPE);
    auth.searchParams.set("include_granted_scopes", "true");
    auth.searchParams.set("prompt", interactive ? "consent" : "none");
    auth.searchParams.set("state", expectedState);

    const redirected = await chrome.identity.launchWebAuthFlow({ url: auth.href, interactive });
    if (!redirected) throw new Error(interactive ? "Google 授权已取消" : "Google 日历尚未连接");
    const params = new URLSearchParams(new URL(redirected).hash.replace(/^#/, ""));
    if (params.get("state") !== expectedState) throw new Error("Google 授权状态校验失败");
    if (params.get("error")) throw new Error(params.get("error_description") || params.get("error") || "");
    const token = params.get("access_token");
    if (!token) throw new Error("Google 没有返回日历访问令牌");
    await chrome.storage.local.set({
      [GOOGLE_CALENDAR_TOKEN_KEY]: {
        token,
        scope: GOOGLE_CALENDAR_SCOPE,
        expiresAt: Date.now() + Math.max(300, Number(params.get("expires_in") || 3600)) * 1000
      }
    });
    return token;
  }

  public async googleCalendarApi(path: string, options: RequestInit = {}, interactive = false): Promise<any> {
    const token = await this.googleCalendarToken(interactive);
    if (!token) return null;
    const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
      ...options,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {})
      }
    });
    if (response.status === 401 && typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.remove(GOOGLE_CALENDAR_TOKEN_KEY);
    }
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload?.error?.message || `Google Calendar API ${response.status}`);
    }
    return response.status === 204 ? null : response.json();
  }

  public visibleMonthRange(): { start: Date; end: Date; startKey: string; endKey: string } {
    const first = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 42);
    return { start, end, startKey: this.dateKey(start), endKey: this.dateKey(end) };
  }

  public async loadGoogleCalendarRange(force = false, interactive = false): Promise<boolean> {
    if (this.isGoogleLoading) {
      await new Promise((resolve) => this.googleWaiters.push(resolve));
      if (interactive && !this.isGoogleConnected) return this.loadGoogleCalendarRange(force, true);
      return this.isGoogleConnected;
    }
    const range = this.visibleMonthRange();
    if (!force && this.isGoogleConnected && Date.now() - this.googleSavedAt < 15 * 60000) {
      return true;
    }
    this.isGoogleLoading = true;
    this.googleLastError = null;
    let succeeded = false;
    try {
      const token = await this.googleCalendarToken(interactive);
      if (!token) throw new Error("Google 日历未授权");
      const calendarPayload = await this.googleCalendarApi(
        "/users/me/calendarList?showDeleted=false&showHidden=false&maxResults=250"
      );
      const calendars = (calendarPayload?.items || []).filter(
        (c: any) => c.selected !== false && c.accessRole !== "freeBusyReader"
      );
      const events: GoogleCalendarItem[] = [];
      for (const calendar of calendars) {
        try {
          const query = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: range.start.toISOString(),
            timeMax: range.end.toISOString()
          });
          const payload = await this.googleCalendarApi(`/calendars/${encodeURIComponent(calendar.id)}/events?${query}`);
          (payload?.items || []).forEach((ev: any) => {
            events.push({
              ...ev,
              _calendarId: calendar.id,
              _calendarName: calendar.summary || "Google 日历",
              _calendarColor: calendar.backgroundColor || "#2563eb",
              _calendarAccessRole: calendar.accessRole || "reader"
            });
          });
        } catch {}
      }
      this.googleCalendars = calendars;
      this.googleEvents = events;
      this.googleSavedAt = Date.now();
      this.googleRangeStart = range.startKey;
      this.googleRangeEnd = range.endKey;
      this.isGoogleConnected = true;
      await storageSetLocal({
        [GOOGLE_CALENDAR_CACHE_KEY]: {
          calendars: this.googleCalendars,
          events: this.googleEvents,
          savedAt: this.googleSavedAt,
          rangeStart: this.googleRangeStart,
          rangeEnd: this.googleRangeEnd
        }
      });
      this.publishCalendarViews();
      succeeded = true;
    } catch (e: any) {
      this.googleLastError = e;
      if (!this.googleEvents.length) this.isGoogleConnected = false;
      this.publishCalendarViews();
    } finally {
      this.isGoogleLoading = false;
      this.googleWaiters.splice(0).forEach((res) => res());
    }
    return succeeded;
  }

  public googleEventsForDate(dateKey: string): GoogleCalendarItem[] {
    return this.googleEvents.filter((event) => {
      if (!event || event.status === "cancelled") return false;
      if (event.start?.date) {
        return dateKey >= event.start.date && dateKey < String(event.end?.date || event.start.date);
      }
      const start = new Date(event.start?.dateTime || "");
      const end = new Date(event.end?.dateTime || event.start?.dateTime || "");
      if (!Number.isFinite(start.getTime())) return false;
      const dayStart = new Date(`${dateKey}T00:00:00`);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);
      return start < dayEnd && (Number.isFinite(end.getTime()) ? end : start) > dayStart;
    }).sort((a, b) => {
      const tA = a.start?.dateTime ? new Date(a.start.dateTime).getTime() : 0;
      const tB = b.start?.dateTime ? new Date(b.start.dateTime).getTime() : 0;
      return tA - tB;
    });
  }

  public tasksForDate(dateKey: string): TodoistTaskItem[] {
    return this.todoistTasks.filter((task) => {
      if (!task || task.is_completed) return false;
      const isRecurring = Boolean(
        task.due?.is_recurring ||
        task.due?.recurring ||
        /every|daily|weekly|monthly|yearly|weekday|weekends|每|工作日|周期/i.test(String(task.due?.string || ""))
      );
      if (isRecurring) return false;
      const directDate = String(task.due?.date || task.due?.datetime || "").slice(0, 10);
      return directDate === dateKey;
    });
  }

  public loadTodoistCalendar(force = false, signal?: AbortSignal): Promise<boolean> {
    if (signal?.aborted) return Promise.resolve(false);
    if (this.taskWrites.size) {
      calendarWorkspaceController.setStatusText("截止日期正在提交，未开始刷新。");
      return Promise.resolve(false);
    }
    if (!signal && this.todoistLoad) return this.todoistLoad;
    if (!force && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 60000) {
      this.publishCalendarViews();
      return Promise.resolve(true);
    }
    // A window owns its own cancellation; never cancels a shared consumer's request.
    if (signal) return this.readTodoistCalendar(signal);
    this.todoistLoad = this.readTodoistCalendar().finally(() => { this.todoistLoad = null; });
    return this.todoistLoad;
  }

  private async readTodoistCalendar(signal?: AbortSignal): Promise<boolean> {
    const revision = this.taskRevision, sequence = ++this.taskReadSequence;
    const current = () => !signal?.aborted && sequence === this.taskReadSequence && revision === this.taskRevision;
    this.isTodoistLoading = true;
    calendarWorkspaceController.updateState({ isLoading: true, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService } = await import("./todoist.service");
      if (!current()) return false;
      const tasks = await todoistService.listCalendarTasks(signal);
      if (!current()) return false;
      if (!Array.isArray(tasks)) throw new Error("任务返回格式无效");
      this.todoistTasks = tasks;
      this.todoistSavedAt = Date.now();
      try {
        await storageSetLocal({
          [TODOIST_CALENDAR_CACHE_KEY]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
        });
      } catch {
        if (current()) calendarWorkspaceController.setStatusText("任务已读取，但本地缓存保存失败。");
        return false;
      }
      if (current()) calendarWorkspaceController.setStatusText("任务已刷新。");
      return current();
    } catch {
      if (current()) calendarWorkspaceController.setStatusText("任务读取失败，请检查 Todoist 连接；原列表已保留。");
      return false;
    } finally {
      if (sequence === this.taskReadSequence) {
        this.isTodoistLoading = false;
        calendarWorkspaceController.updateState({ isLoading: false });
      }
      if (current()) this.publishCalendarViews();
    }
  }

  public async assignTaskToDate(taskId: string | number, date: string): Promise<TodoistTaskItem | null> {
    const id = String(taskId || "").trim();
    const parsed = new Date(date + "T00:00:00Z");
    if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
      calendarWorkspaceController.setStatusText("任务或截止日期无效，未提交。");
      return null;
    }
    if (this.taskWrites.has(id)) {
      calendarWorkspaceController.setStatusText("此任务正在提交，请等待结果；未重复发送。");
      return null;
    }
    this.taskWrites.add(id);
    ++this.taskRevision; // A prior list response must not overwrite this mutation.
    return withTodoistWrite(async () => {
      try {
        const { todoistService } = await import("./todoist.service");
        const updated = await todoistService.setTaskDueDate(id, date);
        if (!updated || String(updated.id) !== id) throw new Error("任务更新结果未确认");
        const index = this.todoistTasks.findIndex(task => String(task.id) === id);
        if (index >= 0) this.todoistTasks[index] = updated;
        else this.todoistTasks.push(updated);
        // Do not force the user's current month/date selection after an async submission.
        this.todoistSavedAt = Date.now();
        this.publishCalendarViews();
        try {
          await storageSetLocal({
            [TODOIST_CALENDAR_CACHE_KEY]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          });
          calendarWorkspaceController.setStatusText("Todoist 截止日期已更新。");
        } catch {
          calendarWorkspaceController.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return updated;
      } catch {
        calendarWorkspaceController.setStatusText("截止日期更新未确认；请核对 Todoist，未自动重试。");
        return null;
      } finally {
        ++this.taskRevision;
        this.taskWrites.delete(id);
      }
    });
  }

  public selectDate(dateKey: string): void {
    if (this.selectedDate === dateKey) {
      this.selectedDate = "";
    } else {
      this.selectedDate = dateKey;
    }
    this.publishCalendarViews();
  }

  public changeMonth(offset: number, loadGoogle = true): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + offset, 1);
    this.selectedDate = "";
    this.publishCalendarViews();
    if (loadGoogle) this.loadGoogleCalendarRange(false, false).catch(() => {});
  }

  public goToday(): void {
    const now = new Date();
    this.currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    this.selectedDate = this.dateKey(now);
    this.publishCalendarViews();
  }

  public closeDetail(): void {
    this.selectedDate = "";
    this.publishCalendarViews();
  }

  public highlightDrop(date: string): void {
    this.dropDate = String(date || "");
    calendarViewController.setDropDate(this.dropDate);
  }

  public openTask(taskId: string, openExternal = false): void {
    const task = this.todoistTasks.find((t) => String(t.id) === String(taskId));
    if (!task) return;
    if (openExternal) {
      window.open(task.url || `https://app.todoist.com/app/task/${task.id}`, "_blank", "noopener,noreferrer");
    } else {
      openTodoistTask(String(task.id));
    }
  }

  public publishCalendarViews(): void {
    const year = this.currentMonth.getFullYear();
    const monthIndex = this.currentMonth.getMonth();
    const first = new Date(year, monthIndex, 1);
    const mondayOffset = (first.getDay() + 6) % 7;
    const cursor = new Date(year, monthIndex, 1 - mondayOffset);
    const today = this.dateKey(new Date());

    // 1. 更新主 CalendarView
    const cells: CalendarCellView[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(cursor);
      d.setDate(cursor.getDate() + i);
      const k = this.dateKey(d);
      const t = this.tasksForDate(k);
      const gEvents = this.isGoogleConnected ? this.googleEventsForDate(k) : [];
      const totalEventsCount = gEvents.length;
      const hasAnyItem = t.length > 0 || totalEventsCount > 0;

      cells.push({
        date: k,
        day: d.getDate(),
        taskCount: t.length,
        outside: d.getMonth() !== monthIndex,
        today: k === today,
        selected: k === this.selectedDate,
        hasDot: hasAnyItem,
        title: totalEventsCount || t.length
          ? `${this.friendlyDate(k)} · ${totalEventsCount} 项日程${t.length ? ` · ${t.length} 个任务` : ""}`
          : `${this.friendlyDate(k)} · 拖入任务设置截止日期`
      });
    }

    const detailTasks = this.selectedDate ? this.tasksForDate(this.selectedDate) : [];
    const summary = `${this.todoistTasks.filter((t) => t.due?.date && !t.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`;

    // Google events remain ordinary events; no local schedule fallback.
    const targetDate = this.selectedDate || today;
    const gEventsForSelected = this.isGoogleConnected ? this.googleEventsForDate(targetDate) : [];
    const detailEvents: CalendarEventView[] = gEventsForSelected.map(ev => ({
      id: ev.id || String(Math.random()),
      time: ev.start?.date ? "全天"
        : new Date(ev.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }),
      summary: ev.summary || "（无标题）",
      subtitle: ev.location || ev._calendarName || "Google 日历",
      htmlLink: ev.htmlLink || "",
      color: ev._calendarColor || "var(--accent)"
    }));

    detailEvents.sort((a, b) => {
      const tA = (a.time || "").replace(/[^\d:]/g, "");
      const tB = (b.time || "").replace(/[^\d:]/g, "");
      return tA.localeCompare(tB);
    });

    calendarViewController.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate
        ? `${detailEvents.length ? `${detailEvents.length} 项日程 · ` : ""}${detailTasks.length} 个任务`
        : "",
      dropDate: this.dropDate,
      cells,
      detailTasks: detailTasks.map((task) => ({
        id: String(task.id),
        content: String(task.content || "未命名任务"),
        description: String(task.description || ""),
        labels: Array.isArray(task.labels) ? task.labels.map(String) : [],
        priority: Number(task.priority || 1),
        url: String(task.url || `https://app.todoist.com/app/task/${task.id}`)
      })),
      detailEvents
    });

    calendarWorkspaceController.updateState({ summary });

    // 2. 更新 TodoistCalendarSidebar
    this.syncSidebarToVue();
  }

  public syncSidebarToVue(): void {
    // Todoist owns task projections; this shared service only supplies month navigation.
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const today = this.dateKey(new Date());
    const selected = this.selectedDate || today;
    const cells = Array.from({ length: 42 }, (_, index) => {
      const date = new Date(year, month, 1 - offset + index);
      const key = this.dateKey(date);
      return {
        date: key, dayNumber: date.getDate(), isOutside: date.getMonth() !== month,
        isToday: key === today, isSelected: key === selected,
        itemCount: 0, title: key, hasDot: false
      };
    });
    todoistCalendarSidebarController.updateState({
      badgeText: "Todoist", monthLabel: CHINESE_MONTHS[month], yearLabel: String(year),
      cells, selectedDate: selected
    });
  }
}

export const calendarService = new CalendarService();
