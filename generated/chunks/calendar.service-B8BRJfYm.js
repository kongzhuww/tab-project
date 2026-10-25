import { t as C, w as K } from "./module-state-EdOqm0KR.js";
import { t as W } from "./todoist.service-BD2Y0hDV.js";
import { r as k } from "./vendor-vue-CjOHdfe5.js";
import { w as A } from "./read-session-C1M3QoXl.js";
import { todoistCalendarSidebarController as v } from "./calendar-sidebar-store-BfJCHI6Q.js";
import { openTodoistTask as Y } from "./task-navigation-atveikjZ.js";
const T = k({
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
let g = {}, F = !1;
function U(a) {
  Object.assign(T, a, {
    cells: a.cells ? [...a.cells] : T.cells,
    detailTasks: a.detailTasks ? [...a.detailTasks] : T.detailTasks,
    detailEvents: a.detailEvents ? [...a.detailEvents] : T.detailEvents
  });
}
function q(a) {
  g = Object.freeze({ ...a });
}
function B(a) {
  const t = Object.freeze({ ...a });
  return g = t, () => {
    g === t && (g = {});
  };
}
function H(a) {
  F = a;
}
function I(a) {
  T.dropDate = String(a || "");
}
function Z(a) {
  g.selectDate?.(a);
}
function J() {
  g.previousMonth?.();
}
function Q() {
  g.nextMonth?.();
}
function X() {
  g.goToday?.();
}
function tt() {
  g.closeDetail?.();
}
async function et(a, t) {
  await g.dropTask?.(a, t);
}
function st(a, t = !1) {
  g.openTask?.(a, t);
}
function at(a) {
  I(a), g.highlightDrop?.(a);
}
const x = Object.freeze({
  update: U,
  setActions: q,
  attachActions: B,
  setMounted: H,
  setDropDate: I,
  selectDate: Z,
  previousMonth: J,
  nextMonth: Q,
  goToday: X,
  closeDetail: tt,
  dropTask: et,
  openTask: st,
  highlightDrop: at,
  get snapshot() {
    return T;
  },
  get active() {
    return F;
  }
}), ot = k({ labels: [] });
let V = {}, z = !1, _ = 0, S;
function it() {
  _++, S?.abort(), S = void 0;
}
function N(a) {
  ot.labels = a.map((t) => ({ ...t }));
}
async function nt() {
  if (!C.active) return;
  it();
  const a = new AbortController();
  S = a;
  const t = _, e = C.session;
  try {
    const s = await W.getLabels(a.signal);
    !a.signal.aborted && t === _ && e === C.session && C.active && Array.isArray(s) && N(s.map((o) => ({ id: o.id, name: o.name })));
  } catch {
    a.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    S === a && (S = void 0);
  }
}
function rt(a) {
  V = Object.freeze({ ...a });
}
function lt(a) {
  z = a;
}
function dt(a, t) {
  V.startDrag?.(a, t);
}
const yt = Object.freeze({
  update: N,
  refresh: nt,
  setActions: rt,
  setMounted: lt,
  startDrag: dt,
  get active() {
    return z;
  }
}), P = k({ visible: !1, active: !1 }), L = k({
  get isOpen() {
    return P.visible;
  },
  title: "任务日历",
  summary: "Todoist 截止日期",
  statusText: "",
  isLoading: !1
});
let y;
const h = {
  get state() {
    return L;
  },
  get ready() {
    return !!y && P.active;
  },
  attach(a) {
    return y = a, () => {
      y === a && (y = void 0);
    };
  },
  updateState(a) {
    Object.assign(L, a);
  },
  open() {
    A.open("calendar");
  },
  close() {
    A.close("calendar");
  },
  refresh() {
    return this.ready ? y.refresh() : (this.setStatusText("请先打开日历并等待窗口就绪。"), Promise.resolve(!1));
  },
  goToday() {
    if (!this.ready) {
      this.setStatusText("请先打开日历并等待窗口就绪。");
      return;
    }
    y.goToday();
  },
  openTodoist() {
    A.open("todoist");
  },
  setStatusText(a) {
    L.statusText = a;
  }
}, $ = "todoistCalendarCacheV1", M = "googleCalendarDayLineCacheV1", b = "googleCalendarSessionTokenV1", R = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", ct = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
function O(a) {
  return typeof window.storageGet == "function" ? window.storageGet(a) : new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(a, t) : t({});
  });
}
async function G(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  await chrome.storage.local.set(a);
}
class ht {
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
      const e = (await O([M]))?.[M];
      e && Array.isArray(e.events) && (this.googleCalendars = e.calendars || [], this.googleEvents = e.events || [], this.googleSavedAt = Number(e.savedAt || 0), this.googleRangeStart = String(e.rangeStart || ""), this.googleRangeEnd = String(e.rangeEnd || ""), this.googleEvents.length > 0 && (this.isGoogleConnected = !0));
    } catch (t) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", t);
    }
    this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  initControllers() {
    v.onAction(async (t, e) => {
      if (t === "init")
        try {
          this.syncSidebarToVue();
        } catch {
          h.setStatusText("日历初始化未完成，请稍后重新打开。");
        }
      else if (t === "toggle-collapsed") {
        const s = v.state.collapsed;
        v.setCollapsed(s);
        try {
          localStorage.setItem("lw_todoist_cal_collapsed", s ? "1" : "0");
        } catch {
        }
      } else if (t === "today")
        this.goToday();
      else if (t === "prev-month")
        this.changeMonth(-1, !1);
      else if (t === "next-month")
        this.changeMonth(1, !1);
      else if (t === "prev-year")
        this.currentMonth = new Date(this.currentMonth.getFullYear() - 1, this.currentMonth.getMonth(), 1), this.publishCalendarViews();
      else if (t === "next-year")
        this.currentMonth = new Date(this.currentMonth.getFullYear() + 1, this.currentMonth.getMonth(), 1), this.publishCalendarViews();
      else if (t === "select-date")
        this.selectedDate = e, this.publishCalendarViews();
      else if (t === "drop-task") {
        const { taskId: s, date: o } = e;
        this.highlightDrop(""), await this.assignTaskToDate(s, o);
      }
    });
  }
  dateKey(t) {
    const e = t.getFullYear(), s = String(t.getMonth() + 1).padStart(2, "0"), o = String(t.getDate()).padStart(2, "0");
    return `${e}-${s}-${o}`;
  }
  friendlyDate(t) {
    const e = /* @__PURE__ */ new Date(`${t}T00:00:00`);
    return Number.isFinite(e.getTime()) ? e.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" }) : t;
  }
  async loadGoogleCalendarClientId() {
    const t = await O(["gmailOAuthClientId"]);
    let e = String(t.gmailOAuthClientId || "").trim();
    if (!e && typeof chrome < "u" && chrome.runtime?.getURL)
      try {
        const s = await fetch(chrome.runtime.getURL("gmail-oauth-client.local.json"), { cache: "no-store" });
        if (s.ok) {
          const o = await s.json();
          e = String(o.clientId || "").trim();
        }
      } catch {
      }
    return e;
  }
  async googleCalendarToken(t = !1) {
    if (typeof chrome > "u" || !chrome.storage?.local) return "";
    const s = (await chrome.storage.local.get(b))[b];
    if (s?.token && s.scope === R && Number(s.expiresAt || 0) > Date.now() + 3e4)
      return s.token;
    const o = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(o))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const i = new URL("https://accounts.google.com/o/oauth2/v2/auth"), r = crypto.randomUUID();
    i.searchParams.set("client_id", o), i.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), i.searchParams.set("response_type", "token"), i.searchParams.set("scope", R), i.searchParams.set("include_granted_scopes", "true"), i.searchParams.set("prompt", t ? "consent" : "none"), i.searchParams.set("state", r);
    const c = await chrome.identity.launchWebAuthFlow({ url: i.href, interactive: t });
    if (!c) throw new Error(t ? "Google 授权已取消" : "Google 日历尚未连接");
    const l = new URLSearchParams(new URL(c).hash.replace(/^#/, ""));
    if (l.get("state") !== r) throw new Error("Google 授权状态校验失败");
    if (l.get("error")) throw new Error(l.get("error_description") || l.get("error") || "");
    const d = l.get("access_token");
    if (!d) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [b]: {
        token: d,
        scope: R,
        expiresAt: Date.now() + Math.max(300, Number(l.get("expires_in") || 3600)) * 1e3
      }
    }), d;
  }
  async googleCalendarApi(t, e = {}, s = !1) {
    const o = await this.googleCalendarToken(s);
    if (!o) return null;
    const i = await fetch(`https://www.googleapis.com/calendar/v3${t}`, {
      ...e,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${o}`,
        Accept: "application/json",
        ...e.body ? { "Content-Type": "application/json" } : {},
        ...e.headers || {}
      }
    });
    if (i.status === 401 && typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(b), !i.ok) {
      const r = await i.json().catch(() => ({}));
      throw new Error(r?.error?.message || `Google Calendar API ${i.status}`);
    }
    return i.status === 204 ? null : i.json();
  }
  visibleMonthRange() {
    const t = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1), e = (t.getDay() + 6) % 7, s = new Date(t);
    s.setDate(t.getDate() - e), s.setHours(0, 0, 0, 0);
    const o = new Date(s);
    return o.setDate(s.getDate() + 42), { start: s, end: o, startKey: this.dateKey(s), endKey: this.dateKey(o) };
  }
  async loadGoogleCalendarRange(t = !1, e = !1) {
    if (this.isGoogleLoading)
      return await new Promise((i) => this.googleWaiters.push(i)), e && !this.isGoogleConnected ? this.loadGoogleCalendarRange(t, !0) : this.isGoogleConnected;
    const s = this.visibleMonthRange();
    if (!t && this.isGoogleConnected && Date.now() - this.googleSavedAt < 15 * 6e4)
      return !0;
    this.isGoogleLoading = !0, this.googleLastError = null;
    let o = !1;
    try {
      if (!await this.googleCalendarToken(e)) throw new Error("Google 日历未授权");
      const c = ((await this.googleCalendarApi(
        "/users/me/calendarList?showDeleted=false&showHidden=false&maxResults=250"
      ))?.items || []).filter(
        (d) => d.selected !== !1 && d.accessRole !== "freeBusyReader"
      ), l = [];
      for (const d of c)
        try {
          const f = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: s.start.toISOString(),
            timeMax: s.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(d.id)}/events?${f}`))?.items || []).forEach((p) => {
            l.push({
              ...p,
              _calendarId: d.id,
              _calendarName: d.summary || "Google 日历",
              _calendarColor: d.backgroundColor || "#2563eb",
              _calendarAccessRole: d.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = c, this.googleEvents = l, this.googleSavedAt = Date.now(), this.googleRangeStart = s.startKey, this.googleRangeEnd = s.endKey, this.isGoogleConnected = !0, await G({
        [M]: {
          calendars: this.googleCalendars,
          events: this.googleEvents,
          savedAt: this.googleSavedAt,
          rangeStart: this.googleRangeStart,
          rangeEnd: this.googleRangeEnd
        }
      }), this.publishCalendarViews(), o = !0;
    } catch (i) {
      this.googleLastError = i, this.googleEvents.length || (this.isGoogleConnected = !1), this.publishCalendarViews();
    } finally {
      this.isGoogleLoading = !1, this.googleWaiters.splice(0).forEach((i) => i());
    }
    return o;
  }
  googleEventsForDate(t) {
    return this.googleEvents.filter((e) => {
      if (!e || e.status === "cancelled") return !1;
      if (e.start?.date)
        return t >= e.start.date && t < String(e.end?.date || e.start.date);
      const s = new Date(e.start?.dateTime || ""), o = new Date(e.end?.dateTime || e.start?.dateTime || "");
      if (!Number.isFinite(s.getTime())) return !1;
      const i = /* @__PURE__ */ new Date(`${t}T00:00:00`), r = new Date(i);
      return r.setDate(i.getDate() + 1), s < r && (Number.isFinite(o.getTime()) ? o : s) > i;
    }).sort((e, s) => {
      const o = e.start?.dateTime ? new Date(e.start.dateTime).getTime() : 0, i = s.start?.dateTime ? new Date(s.start.dateTime).getTime() : 0;
      return o - i;
    });
  }
  tasksForDate(t) {
    return this.todoistTasks.filter((e) => !e || e.is_completed || !!(e.due?.is_recurring || e.due?.recurring || /every|daily|weekly|monthly|yearly|weekday|weekends|每|工作日|周期/i.test(String(e.due?.string || ""))) ? !1 : String(e.due?.date || e.due?.datetime || "").slice(0, 10) === t);
  }
  loadTodoistCalendar(t = !1, e) {
    return e?.aborted ? Promise.resolve(!1) : this.taskWrites.size ? (h.setStatusText("截止日期正在提交，未开始刷新。"), Promise.resolve(!1)) : !e && this.todoistLoad ? this.todoistLoad : !t && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 6e4 ? (this.publishCalendarViews(), Promise.resolve(!0)) : e ? this.readTodoistCalendar(e) : (this.todoistLoad = this.readTodoistCalendar().finally(() => {
      this.todoistLoad = null;
    }), this.todoistLoad);
  }
  async readTodoistCalendar(t) {
    const e = this.taskRevision, s = ++this.taskReadSequence, o = () => !t?.aborted && s === this.taskReadSequence && e === this.taskRevision;
    this.isTodoistLoading = !0, h.updateState({ isLoading: !0, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService: i } = await import("./todoist.service-BD2Y0hDV.js").then((c) => c.b);
      if (!o()) return !1;
      const r = await i.listCalendarTasks(t);
      if (!o()) return !1;
      if (!Array.isArray(r)) throw new Error("任务返回格式无效");
      this.todoistTasks = r, this.todoistSavedAt = Date.now();
      try {
        await G({
          [$]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
        });
      } catch {
        return o() && h.setStatusText("任务已读取，但本地缓存保存失败。"), !1;
      }
      return o() && h.setStatusText("任务已刷新。"), o();
    } catch {
      return o() && h.setStatusText("任务读取失败，请检查 Todoist 连接；原列表已保留。"), !1;
    } finally {
      s === this.taskReadSequence && (this.isTodoistLoading = !1, h.updateState({ isLoading: !1 })), o() && this.publishCalendarViews();
    }
  }
  async assignTaskToDate(t, e) {
    const s = String(t || "").trim(), o = /* @__PURE__ */ new Date(e + "T00:00:00Z");
    return !s || !/^\d{4}-\d{2}-\d{2}$/.test(e) || !Number.isFinite(o.getTime()) || o.toISOString().slice(0, 10) !== e ? (h.setStatusText("任务或截止日期无效，未提交。"), null) : this.taskWrites.has(s) ? (h.setStatusText("此任务正在提交，请等待结果；未重复发送。"), null) : (this.taskWrites.add(s), ++this.taskRevision, K(async () => {
      try {
        const { todoistService: i } = await import("./todoist.service-BD2Y0hDV.js").then((l) => l.b), r = await i.setTaskDueDate(s, e);
        if (!r || String(r.id) !== s) throw new Error("任务更新结果未确认");
        const c = this.todoistTasks.findIndex((l) => String(l.id) === s);
        c >= 0 ? this.todoistTasks[c] = r : this.todoistTasks.push(r), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await G({
            [$]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), h.setStatusText("Todoist 截止日期已更新。");
        } catch {
          h.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return r;
      } catch {
        return h.setStatusText("截止日期更新未确认；请核对 Todoist，未自动重试。"), null;
      } finally {
        ++this.taskRevision, this.taskWrites.delete(s);
      }
    }));
  }
  selectDate(t) {
    this.selectedDate === t ? this.selectedDate = "" : this.selectedDate = t, this.publishCalendarViews();
  }
  changeMonth(t, e = !0) {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + t, 1), this.selectedDate = "", this.publishCalendarViews(), e && this.loadGoogleCalendarRange(!1, !1).catch(() => {
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
    this.dropDate = String(t || ""), x.setDropDate(this.dropDate);
  }
  openTask(t, e = !1) {
    const s = this.todoistTasks.find((o) => String(o.id) === String(t));
    s && (e ? window.open(s.url || `https://app.todoist.com/app/task/${s.id}`, "_blank", "noopener,noreferrer") : Y(String(s.id)));
  }
  publishCalendarViews() {
    const t = this.currentMonth.getFullYear(), e = this.currentMonth.getMonth(), o = (new Date(t, e, 1).getDay() + 6) % 7, i = new Date(t, e, 1 - o), r = this.dateKey(/* @__PURE__ */ new Date()), c = [];
    for (let n = 0; n < 42; n++) {
      const D = new Date(i);
      D.setDate(i.getDate() + n);
      const u = this.dateKey(D), m = this.tasksForDate(u), E = (this.isGoogleConnected ? this.googleEventsForDate(u) : []).length, j = m.length > 0 || E > 0;
      c.push({
        date: u,
        day: D.getDate(),
        taskCount: m.length,
        outside: D.getMonth() !== e,
        today: u === r,
        selected: u === this.selectedDate,
        hasDot: j,
        title: E || m.length ? `${this.friendlyDate(u)} · ${E} 项日程${m.length ? ` · ${m.length} 个任务` : ""}` : `${this.friendlyDate(u)} · 拖入任务设置截止日期`
      });
    }
    const l = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], d = `${this.todoistTasks.filter((n) => n.due?.date && !n.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, f = this.selectedDate || r, p = (this.isGoogleConnected ? this.googleEventsForDate(f) : []).map((n) => ({
      id: n.id || String(Math.random()),
      time: n.start?.date ? "全天" : new Date(n.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: n.summary || "（无标题）",
      subtitle: n.location || n._calendarName || "Google 日历",
      htmlLink: n.htmlLink || "",
      color: n._calendarColor || "var(--accent)"
    }));
    p.sort((n, D) => {
      const u = (n.time || "").replace(/[^\d:]/g, ""), m = (D.time || "").replace(/[^\d:]/g, "");
      return u.localeCompare(m);
    }), x.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: d,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${p.length ? `${p.length} 项日程 · ` : ""}${l.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: c,
      detailTasks: l.map((n) => ({
        id: String(n.id),
        content: String(n.content || "未命名任务"),
        description: String(n.description || ""),
        labels: Array.isArray(n.labels) ? n.labels.map(String) : [],
        priority: Number(n.priority || 1),
        url: String(n.url || `https://app.todoist.com/app/task/${n.id}`)
      })),
      detailEvents: p
    }), h.updateState({ summary: d }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const t = this.currentMonth.getFullYear(), e = this.currentMonth.getMonth(), o = (new Date(t, e, 1).getDay() + 6) % 7, i = this.dateKey(/* @__PURE__ */ new Date()), r = this.selectedDate || i, c = Array.from({ length: 42 }, (l, d) => {
      const f = new Date(t, e, 1 - o + d), w = this.dateKey(f);
      return {
        date: w,
        dayNumber: f.getDate(),
        isOutside: f.getMonth() !== e,
        isToday: w === i,
        isSelected: w === r,
        itemCount: 0,
        title: w,
        hasDot: !1
      };
    });
    v.updateState({
      badgeText: "Todoist",
      monthLabel: ct[e],
      yearLabel: String(t),
      cells: c,
      selectedDate: r
    });
  }
}
const Tt = new ht();
export {
  x as a,
  h as b,
  Tt as c,
  it as d,
  yt as t
};
