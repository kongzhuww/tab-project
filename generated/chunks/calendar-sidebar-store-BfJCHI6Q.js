import { t as l, w as x } from "./module-state-EdOqm0KR.js";
import { t as h, c as $, p as O } from "./todoist.service-BD2Y0hDV.js";
import { c as I, a as M } from "./main-workspace-store-R_88lOV_.js";
import { r as E } from "./vendor-vue-CjOHdfe5.js";
function T(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
const A = "todoist_local_completed_tasks_v1";
function L() {
  try {
    const e = JSON.parse(localStorage.getItem(A) || "{}");
    return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter(([, s]) => s && typeof s == "object" && typeof s.id == "string" && typeof s.content == "string"));
  } catch {
    return {};
  }
}
function j(e) {
  localStorage.setItem(A, JSON.stringify(e));
}
function b(e) {
  const s = e.completedAt || e.completed_at || e.completed_date, o = new Date(s || "");
  return Number.isFinite(o.getTime()) ? T(o) : "";
}
function v(e, s = $()) {
  const o = e._taskRaw || e.raw || e, i = String(e.task_id || e.id), d = e.description || o.description || "", r = e.startDate || s(i, d), c = o.due?.datetime || o.due?.date || e.dueDate || "";
  let t = O(r || c);
  if (!r && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(c)) {
    const n = new Date(c);
    Number.isFinite(n.getTime()) && (t = {
      date: T(n),
      time: `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`
    });
  }
  return {
    id: i,
    content: e.content || "未命名任务",
    completed: !!(e.completed || e.is_completed),
    priority: e.priority || 1,
    labels: e.labels || [],
    raw: o,
    scheduledDate: t.date,
    time: t.time,
    dueText: o.due?.string || o.due?.date || "",
    thumbUrl: d.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let f = [], w = 0;
const p = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), a = E({
  collapsed: !1,
  selectedDate: T(),
  badgeText: "Todoist",
  monthLabel: "",
  yearLabel: "",
  cells: [],
  agendaTitle: "今日任务",
  todoItems: [],
  todoLoading: !1,
  emptyText: "",
  writeError: ""
}), C = /* @__PURE__ */ new Set();
let _ = 0, u;
function S() {
  _++, u?.abort(), u = void 0, a.todoLoading = !1;
}
function g() {
  const e = a, s = $(), o = f.filter((t) => !t.is_completed).map((t) => v(t, s)), i = e.selectedDate, d = Object.values(L()).filter((t) => !y.has(t.id)), r = /* @__PURE__ */ new Map();
  for (const t of [...p.get(i)?.items || [], ...d])
    !y.has(t.id) && (t.scheduledDate || b(t)) === i && r.set(t.id, t);
  for (const t of o) t.scheduledDate === i && r.set(t.id, t);
  e.todoItems = [...r.values()].sort((t, n) => Number(t.completed) - Number(n.completed) || (t.time || "").localeCompare(n.time || "")), e.agendaTitle = i === T() ? "今日任务" : `${i.slice(5).replace("-", "月")}日任务`;
  const c = /* @__PURE__ */ new Map();
  for (const t of [...Array.from(p.values()).flatMap((n) => n.items), ...d, ...o]) {
    const n = t.scheduledDate || b(t);
    n && (c.has(n) || c.set(n, /* @__PURE__ */ new Set()), c.get(n).add(t.id));
  }
  for (const t of e.cells)
    t.itemCount = c.get(t.date)?.size || 0, t.hasDot = t.itemCount > 0, t.title = `${t.date}${t.itemCount ? ` · ${t.itemCount} 个任务` : ""}`;
}
const R = {
  state: a,
  cancelReads: S,
  setCollapsed(e) {
    a.collapsed = e;
  },
  toggleCollapsed() {
    this.setCollapsed(!a.collapsed), this.dispatch("toggle-collapsed", a.collapsed);
  },
  recordTaskCompletion(e, s) {
    S(), w = 0;
    const o = String(e.task_id || e.id), i = L();
    if (s) {
      y.delete(o);
      const d = v(e);
      i[o] = { ...d, scheduledDate: e.scheduledDate || d.scheduledDate, completed: !0, completedAt: (/* @__PURE__ */ new Date()).toISOString() }, f = f.filter((r) => String(r.id) !== o);
    } else
      y.add(o), delete i[o], f.some((d) => String(d.id) === o) || f.push({ ...e.raw || e._taskRaw || e, id: o, is_completed: !1, completed: !1 });
    try {
      j(i);
    } catch {
      a.writeError = "完成状态的本机记录未保存，请核对。";
    }
    p.clear(), g();
  },
  async loadTodosForDate(e, s = !1) {
    if (!l.active || l.pendingWrites) return;
    S();
    const o = new AbortController();
    u = o;
    const i = _, d = l.session;
    e ||= T();
    const r = () => !o.signal.aborted && i === _ && d === l.session && l.active && a.selectedDate === e && !l.pendingWrites;
    a.selectedDate = e, a.emptyText = "", g(), a.todoLoading = !0;
    try {
      if (s || !w || Date.now() - w > 3e4) {
        const t = await h.listCalendarTasks(o.signal);
        if (!r()) return;
        f = t, w = Date.now(), g();
      }
      const c = p.get(e);
      if (s || !c || Date.now() - c.savedAt > 3e4) {
        const t = /* @__PURE__ */ new Date(`${e}T00:00:00`);
        t.setDate(t.getDate() + 1);
        try {
          const n = await h.getCompletedTasks({ since: (/* @__PURE__ */ new Date(`${e}T00:00:00`)).toISOString(), until: t.toISOString(), limit: 200 }, o.signal);
          if (!r()) return;
          const m = n.items.filter((D) => b(D) === e).map((D) => ({
            ...v(D),
            completed: !0,
            completedAt: D.completed_at
          }));
          p.set(e, { items: m, savedAt: Date.now() }), p.size > 42 && p.delete(p.keys().next().value);
        } catch (n) {
          if (r()) {
            const m = n instanceof Error ? n.message.match(/^Todoist API 请求失败 \((\d{3})\)$/)?.[1] : void 0;
            a.emptyText = m === "401" || m === "403" ? `完成历史读取失败（HTTP ${m}），请检查 Todoist 账户或接口访问权限；现有任务保留。` : `完成历史读取失败${m ? `（HTTP ${m}）` : ""}；现有任务保留，可重试读取。`;
          }
        }
      }
      r() && g();
    } catch {
      r() && (a.emptyText = "任务读取失败，请检查 Todoist 连接后刷新；当前日期的已有数据保留。");
    } finally {
      r() && (a.todoLoading = !1), u === o && (u = void 0);
    }
  },
  async toggleTodoItem(e) {
    if (l.pendingWrites) return;
    const s = !e.completed;
    a.writeError = "", await x(async () => {
      S();
      try {
        if (await h.toggleTaskCompletion(e.id, s), this.recordTaskCompletion(e, s), h.invalidateWorkspaceSnapshots(), s)
          for (const o of I.columns) o.tasks = o.tasks.filter((i) => String(i.id) !== e.id);
        else l.active && await M.loadWorkspace(void 0, void 0, !0);
      } catch {
        a.writeError = "完成状态保存未确认，请刷新核对；未自动重试。";
      }
    });
  },
  updateTaskTitle(e, s) {
    const o = f.find((d) => String(d.id) === String(e));
    o && (o.content = s);
    const i = a.todoItems.find((d) => d.id === String(e));
    i && (i.content = s);
  },
  updateState(e) {
    const s = a.selectedDate;
    Object.assign(a, e), g(), e.selectedDate && e.selectedDate !== s && this.loadTodosForDate(e.selectedDate);
  },
  onAction(e) {
    return C.add(e), () => {
      C.delete(e);
    };
  },
  dispatch(e, s) {
    for (const o of C)
      try {
        o(e, s);
      } catch {
        a.emptyText = "日历操作未完成，请重新打开。";
      }
  }
};
export {
  S as cancelTodoistDateReads,
  T as getLocalTodayDateStr,
  R as todoistCalendarSidebarController,
  a as todoistCalendarSidebarState
};
