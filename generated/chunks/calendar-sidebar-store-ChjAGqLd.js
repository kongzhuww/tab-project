import { t as f } from "./module-state-BVJNDzfS.js";
import { t as g } from "./todoist.service-DeCQ21Vr.js";
import { b as L, a as F } from "./main-workspace-store-DWC4Dn9l.js";
import { r as U } from "./vendor-vue-BUkfvXUI.js";
function m() {
  const t = /* @__PURE__ */ new Date(), o = t.getFullYear(), a = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getDate()).padStart(2, "0");
  return `${o}-${a}-${i}`;
}
const _ = "todoist_local_completed_tasks_v1";
function x() {
  try {
    const t = localStorage.getItem(_);
    return t ? JSON.parse(t) : {};
  } catch {
    return {};
  }
}
function k(t) {
  try {
    localStorage.setItem(_, JSON.stringify(t));
  } catch {
  }
}
function v(t) {
  if (!t) return;
  const o = t.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/);
  return o ? o[1] : void 0;
}
const w = {}, e = U({
  collapsed: !1,
  tabMode: "agenda",
  selectedDate: m(),
  badgeText: "在线",
  monthLabel: "",
  yearLabel: "",
  cells: [],
  agendaTitle: "今日日程",
  agendaCount: "",
  agendaItems: [],
  todoItems: [],
  todoLoading: !1,
  emptyText: ""
}), y = /* @__PURE__ */ new Set();
let I = 0, u;
function A() {
  I++, u?.abort(), u = void 0, e.todoLoading = !1;
}
const H = {
  state: e,
  setCollapsed(t) {
    e.collapsed = t;
  },
  toggleCollapsed() {
    e.collapsed = !e.collapsed, this.dispatch("toggle-collapsed", e.collapsed);
  },
  setTabMode(t) {
    A(), e.tabMode = t, t === "todo" && this.loadTodosForDate(e.selectedDate || m());
  },
  /**
   * 记录本地任务完成/撤销，就地更新响应式列表，0 延迟秒开且杜绝刷新白屏
   */
  recordTaskCompletion(t, o) {
    const a = String(t.id || t.task_id), i = x();
    if (o) {
      const l = m(), c = t.description || t._taskRaw?.description || "", h = {
        id: a,
        content: t.content || "已完成任务",
        completed: !0,
        priority: t.priority || 1,
        completedAt: (/* @__PURE__ */ new Date()).toISOString(),
        dueText: l,
        labels: t.labels || [],
        thumbUrl: v(c),
        raw: t
      };
      i[a] = h, k(i);
      const b = e.todoItems.findIndex((S) => S.id === a);
      b >= 0 ? e.todoItems[b].completed = !0 : e.todoItems.push(h);
    } else {
      delete i[a], k(i);
      const l = e.todoItems.findIndex((c) => c.id === a);
      l >= 0 && (e.todoItems[l].completed = !1);
    }
    const r = e.selectedDate || m();
    w[r] = {
      items: [...e.todoItems],
      timestamp: Date.now()
    };
  },
  /**
   * 严格缓存优先 (SWR) 读取待办列表，绝不反复清空或闪烁
   */
  async loadTodosForDate(t) {
    if (!f.active) return;
    A();
    const o = new AbortController();
    u = o;
    const a = I, i = f.session, r = () => !o.signal.aborted && a === I && i === f.session && f.active && e.tabMode === "todo";
    t || (t = m()), e.selectedDate = t;
    const l = t === m(), c = w[t];
    if (c && c.items && c.items.length > 0) {
      if (e.todoItems = c.items, Date.now() - c.timestamp < 3e4)
        return;
    } else e.todoItems.length === 0 && (e.todoLoading = !0);
    try {
      const h = await g.getTasks(void 0, o.signal);
      if (!r()) return;
      const S = h.filter((s) => (s.due?.date || "").startsWith(t)).map((s) => {
        const n = s.description || "";
        return {
          id: String(s.id),
          content: s.content,
          completed: !1,
          priority: s.priority || 1,
          dueText: s.due?.string || s.due?.date || "",
          labels: s.labels || [],
          thumbUrl: v(n),
          raw: s
        };
      }), D = [], p = /* @__PURE__ */ new Set();
      for (const s of L.columns || [])
        for (const n of s.tasks || [])
          if (n.completed) {
            const d = String(n.id);
            if (!p.has(d)) {
              p.add(d);
              const T = n.description || n._taskRaw?.description || "";
              D.push({
                id: d,
                content: n.content,
                completed: !0,
                priority: n.priority || 1,
                completedAt: (/* @__PURE__ */ new Date()).toISOString(),
                labels: n.labels || [],
                thumbUrl: v(T),
                raw: n
              });
            }
          }
      const M = x();
      for (const [s, n] of Object.entries(M))
        if (!p.has(s)) {
          const d = n.completedAt ? new Date(n.completedAt).toLocaleDateString("en-CA") : "";
          (d === t || l && !d) && (p.add(s), D.push(n));
        }
      const O = await g.getCompletedTasks({ limit: 50 }, o.signal);
      if (!r()) return;
      for (const s of O.items || []) {
        const n = String(s.task_id || s.id);
        if (!p.has(n)) {
          const d = s.completed_at || s.completed_date || "", T = d ? new Date(d).toLocaleDateString("en-CA") : "";
          (T === t || l && !T) && (p.add(n), D.push({
            id: n,
            content: s.content,
            completed: !0,
            priority: 1,
            completedAt: d,
            labels: [],
            thumbUrl: void 0,
            raw: s
          }));
        }
      }
      const C = [...S.filter((s) => !p.has(s.id)), ...D];
      w[t] = { items: C, timestamp: Date.now() }, e.todoItems = C;
    } catch {
      r() && (e.emptyText = "任务历史读取失败，保留已有数据。");
    } finally {
      r() && (e.todoLoading = !1), u === o && (u = void 0);
    }
  },
  async toggleTodoItem(t) {
    const o = !t.completed;
    t.completed = o, this.recordTaskCompletion(t, o);
    try {
      if (o) {
        await g.toggleTaskCompletion(t.id, !0);
        for (const a of L.columns || []) {
          const i = a.tasks.findIndex((r) => String(r.id) === String(t.id));
          i >= 0 && a.tasks.splice(i, 1);
        }
      } else
        await g.reopenTask(t.id), g.invalidateWorkspaceSnapshots(), f.active && await F.loadWorkspace(void 0, void 0, !0);
    } catch (a) {
      t.completed = !o, this.recordTaskCompletion(t, !o), console.error("[Todoist Calendar] Toggle todo completion failed:", a);
    }
  },
  updateTaskTitle(t, o) {
    const a = e.todoItems.find((i) => String(i.id) === String(t));
    a && (a.content = o);
  },
  updateState(t) {
    const o = e.selectedDate;
    Object.assign(e, t), t.selectedDate && t.selectedDate !== o && e.tabMode === "todo" && this.loadTodosForDate(t.selectedDate);
  },
  onAction(t) {
    return y.add(t), () => {
      y.delete(t);
    };
  },
  dispatch(t, o) {
    for (const a of y)
      try {
        a(t, o);
      } catch (i) {
        console.error(`[TodoistCalendarSidebar] Handler error for action ${t}:`, i);
      }
  }
};
export {
  A as cancelTodoistDateReads,
  m as getLocalTodayDateStr,
  H as todoistCalendarSidebarController,
  e as todoistCalendarSidebarState
};
