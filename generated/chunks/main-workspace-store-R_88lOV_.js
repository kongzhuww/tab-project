import { r as H, a as te } from "./vendor-vue-CjOHdfe5.js";
import { w as J, t as x } from "./module-state-EdOqm0KR.js";
import { t as a, c as se } from "./todoist.service-BD2Y0hDV.js";
import { w as E } from "./read-session-C1M3QoXl.js";
const o = H({
  accountConfigured: null,
  loading: !1,
  movingTaskId: null,
  moveMessage: "",
  moveError: !1,
  moveNeedsRefresh: !1,
  emptyText: "",
  view: "inbox",
  activeProjectId: "",
  activeProjectName: "",
  projects: [],
  columns: [],
  addingSection: !1,
  activeComposerSectionId: null,
  availableLabels: []
}), $ = /* @__PURE__ */ new Set();
let z = 0, P;
function K() {
  z++, P?.abort(), P = void 0, o.loading = !1;
}
const Q = {
  updateState(s) {
    Object.assign(o, s);
  },
  setLoading(s) {
    o.loading = s, s && (o.emptyText = "");
  },
  setColumns(s) {
    o.columns = [...s], s.length > 0 && (o.emptyText = "");
  },
  onAction(s) {
    return $.add(s), () => {
      $.delete(s);
    };
  },
  async loadWorkspace(s, e, v = !1) {
    if (!x.active) return;
    if (o.movingTaskId) {
      o.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    K();
    const t = new AbortController();
    P = t;
    const i = x.session, n = z, r = () => !t.signal.aborted && x.active && i === x.session && n === z, l = s || o.view || "inbox", j = e || (l === "projects" ? o.activeProjectId || a.getActiveProjectId() : void 0), _ = l !== o.view || l === "projects" && j !== o.activeProjectId;
    o.view = l, _ && this.updateState({ columns: [], emptyText: "", activeProjectId: j || "" });
    const g = (k) => {
      if (!r()) return;
      const D = se(), c = {
        ...k,
        projects: k.projects.map((m) => ({ ...m })),
        availableLabels: [...k.availableLabels || []],
        columns: k.columns.map((m) => ({
          ...m,
          _groupRaw: m._groupRaw ? { ...m._groupRaw } : void 0,
          tasks: m.tasks.map((p) => ({
            ...p,
            startDate: D(p.id, p.description),
            labels: p.labels ? [...p.labels] : void 0,
            _taskRaw: p._taskRaw ? {
              ...p._taskRaw,
              labels: [...p._taskRaw.labels || []],
              due: p._taskRaw.due ? { ...p._taskRaw.due } : null
            } : void 0
          }))
        }))
      };
      o.moveNeedsRefresh = !1, !o.movingTaskId && o.moveError && (o.moveMessage = "", o.moveError = !1), this.updateState({
        ...c,
        view: l,
        loading: !1,
        emptyText: c.columns.length ? "" : "暂无待办任务"
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: l === "projects" ? "项目" : l === "today" ? "今天" : "收件箱"
      });
    }, w = o.columns.length > 0;
    this.setLoading(!w);
    try {
      if (await a.initToken(), !r()) return;
      if (o.accountConfigured = !!a.getToken().trim(), !o.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      let k = !1;
      if (!v) {
        const c = await a.getCachedWorkspaceData(l, j);
        if (!r()) return;
        c && Array.isArray(c.columns) && c.columns.length > 0 && (g(c), k = !0, this.setLoading(!1));
      }
      const D = await a.loadWorkspaceData(l, j, v, t.signal);
      g(D);
    } catch {
      r() && (this.setLoading(!1), o.columns.length || this.updateState({ emptyText: "待办读取失败，请手动刷新。" }));
    } finally {
      P === t && (P = void 0);
    }
  },
  async moveTask(s, e, v) {
    const t = o, i = (d) => (t.moveMessage = d, t.moveError = !0, !1);
    if (!x.active || t.movingTaskId) return !1;
    if (t.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const n = t.columns.find((d) => d.tasks.some((f) => f.id === s)), r = n?.tasks.find((d) => d.id === s);
    if (!n || !r || r.completed || s.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (v === s) return !0;
    const l = t.view, j = t.activeProjectId, _ = t.columns, g = n.tasks.indexOf(r), w = n.tasks[g + 1]?.id, k = n.tasks[g - 1]?.id, D = {
      dueDate: r.dueDate,
      dueText: r.dueText,
      dueString: r.dueString,
      isDueToday: r.isDueToday,
      isOverdue: r.isOverdue
    }, c = l === "today", m = c && !e.projectId;
    if (e.dueDate && (!c || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !m) return i("目标项目未就绪，未提交移动。");
    const p = e.dueDate ? t.columns.find((d) => d.sectionId === "today") : m ? t.columns.find((d) => d.sectionId === e.sectionId) : t.columns.find((d) => d.projectId === e.projectId && d.sectionId === e.sectionId), W = e.dueDate ? n.sectionId !== "today" : !m && (String(r._taskRaw?.project_id || n.projectId || "") !== e.projectId || String(r._taskRaw?.section_id || n.sectionId || "") !== e.sectionId);
    if (!W && n === p && v === void 0 && n.tasks[n.tasks.length - 1]?.id === s) return !0;
    if (m && e.sectionId === "overdue" && n.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const C = v ? p?.tasks.find((d) => d.id === v) : void 0;
    if (m && !p || v && !C)
      return i("目标板块或任务已改变，请重新拖动。");
    const M = W && !m ? "" : String(r._taskRaw?.parent_id || ""), y = e.projectId || String(r._taskRaw?.project_id || n.projectId || ""), Z = e.projectId ? e.sectionId : String(r._taskRaw?.section_id || "");
    if (C && !c && String(C._taskRaw?.parent_id || "") !== M)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const B = (p?.tasks || []).filter((d) => d.id !== s && (c || String(d._taskRaw?.parent_id || "") === M)), F = C ? B.findIndex((d) => d.id === C.id) + 1 : B.length + 1;
    if (p && F < 1) return i("目标任务位置已改变，请重试拖动。");
    t.movingTaskId = s, t.moveMessage = "位置已在本页移动，正在后台保存…", t.moveError = !1, K(), a.invalidateWorkspaceSnapshots();
    let A = !1, S, R = !1, O = !1;
    const G = () => _ === t.columns && l === t.view && j === t.activeProjectId, N = (d) => {
      if (!G()) return !1;
      const f = t.columns.find((u) => u.tasks.some((T) => T.id === s)), h = f?.tasks.find((u) => u.id === s) || (R && O ? r : void 0);
      if (!h) return !1;
      let I = e.dueDate ? t.columns.find((u) => u.sectionId === "today") : m ? t.columns.find((u) => u.sectionId === e.sectionId) : t.columns.find((u) => u.projectId === e.projectId && u.sectionId === e.sectionId);
      const L = !I && c && !m;
      if (L && (I = n), !I && m) return !1;
      if (f && f.tasks.splice(f.tasks.indexOf(h), 1), S) {
        const u = { ...h._taskRaw };
        for (const T of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(S, T) && (u[T] = S[T]);
        h._taskRaw = u;
      }
      if (e.dueDate && (h.dueDate = S?.due?.date || e.dueDate, h.dueText = "今天", h.dueString = S?.due?.string || e.dueDate, h.isDueToday = !0, h.isOverdue = !1), I) {
        const u = L ? Math.min(g, I.tasks.length) : d && v ? I.tasks.findIndex((T) => T.id === v) : -1;
        I.tasks.splice(u < 0 ? I.tasks.length : u, 0, h);
      }
      return O = !I, !0;
    }, ee = () => {
      if (!R || !G() || !t.columns.includes(n)) return !1;
      const d = t.columns.find((u) => u.tasks.some((T) => T.id === s)), f = d?.tasks.find((u) => u.id === s) || (O ? r : void 0);
      if (!f) return !1;
      d && d.tasks.splice(d.tasks.indexOf(f), 1);
      const h = w ? n.tasks.findIndex((u) => u.id === w) : -1, I = k ? n.tasks.findIndex((u) => u.id === k) : -1, L = h >= 0 ? h : I >= 0 ? I + 1 : Math.min(g, n.tasks.length);
      return n.tasks.splice(L, 0, f), e.dueDate && f.dueDate === e.dueDate && f.dueText === "今天" && f.dueString === e.dueDate && f.isDueToday && !f.isOverdue && Object.assign(f, D), O = !1, !0;
    };
    try {
      return await J(async () => {
        try {
          if (R = N(!0), !R) throw new Error("看板已改变");
          if (W) {
            if (S = e.dueDate ? await a.setTaskDueDate(s, e.dueDate) : await a.moveTask(s, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(S?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            A = !0;
          }
          if (p && (!W || v)) {
            const f = await a.reorderTask(s, F, c);
            if (y && String(f.project_id) !== y || String(f.section_id || "") !== Z || String(f.parent_id || "") !== M)
              throw A = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            S = { ...S, ...f };
          }
          const d = N(!0);
          return t.moveMessage = d ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (t.moveNeedsRefresh = !0, A)
            return N(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const d = ee();
          return i(d ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。" : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
        }
      });
    } finally {
      a.invalidateWorkspaceSnapshots(), t.movingTaskId = null;
    }
  },
  dispatch(s, e) {
    const v = String(e?.taskId || e?.task?.id || e?.id || (typeof e == "string" ? e : ""));
    if (o.movingTaskId === v && (s.startsWith("update-task-") || s === "toggle-task" || s === "delete-task-submit"))
      return !1;
    if (s === "move-task-to-project")
      return this.moveTask(String(e?.taskId || ""), {
        projectId: String(e?.targetProjectId || ""),
        sectionId: ""
      });
    if (s === "create-task")
      o.activeComposerSectionId = o.columns[0]?.sectionId ?? "";
    else if (s === "refresh")
      this.loadWorkspace(o.view, o.activeProjectId, !0);
    else if (s === "switch-project") {
      const t = String(e?.id || e || "");
      this.loadWorkspace("projects", t);
    } else if (s === "create-project-submit") {
      const t = String(e || "").trim();
      t && a.createProject(t).then((i) => {
        this.loadWorkspace("projects", i?.id ? String(i.id) : void 0);
      }).catch((i) => console.error("[Todoist] Create project error:", i));
    } else if (s === "rename-project-submit") {
      const t = String(e?.projectId || ""), i = String(e?.newName || "").trim();
      t && i && a.renameProject(t, i).then(() => {
        this.loadWorkspace("projects", t);
      }).catch((n) => console.error("[Todoist] Rename project error:", n));
    } else if (s === "delete-project-submit") {
      const t = String(e?.projectId || e || "");
      t && a.deleteProject(t).then(() => {
        this.loadWorkspace("projects");
      }).catch((i) => console.error("[Todoist] Delete project error:", i));
    } else if (s === "add-section-submit") {
      const t = String(typeof e == "string" ? e : e?.name || "").trim(), i = String(
        (typeof e == "object" && e?.projectId ? e.projectId : "") || o.activeProjectId || o.columns.find((n) => n.projectId)?.projectId || a.getActiveProjectId() || ""
      );
      t && i && a.createSection(t, i).then(() => {
        this.loadWorkspace(o.view, i, !0);
      }).catch((n) => console.error("[Todoist] Create section error:", n));
    } else if (s === "rename-section") {
      const t = String(e?.sectionId || ""), i = String(e?.newName || "").trim();
      if (i)
        if (t)
          a.renameSection(t, i).then(() => {
            this.loadWorkspace(o.view, o.activeProjectId, !0);
          }).catch((n) => console.error("[Todoist] Rename section error:", n));
        else {
          a.setDefaultSectionName(i);
          const n = o.columns.find((r) => !r.sectionId);
          n && (n.title = i), this.loadWorkspace(o.view, o.activeProjectId, !0);
        }
    } else if (s === "delete-section") {
      const t = String(e?.sectionId || e || "");
      if (t) {
        const i = o.columns.findIndex((r) => String(r.sectionId) === t);
        let n;
        i !== -1 && (n = o.columns[i], o.columns.splice(i, 1)), a.deleteSection(t).then(() => {
          this.loadWorkspace(o.view, o.activeProjectId, !0);
        }).catch((r) => {
          console.error("[Todoist] Delete section error:", r), n && i !== -1 && o.columns.splice(i, 0, n), o.moveError = !0, o.moveMessage = `删除板块失败: ${r?.message || "网络请求异常"}`, typeof window < "u" && window.LogicWeaverNotifications?.error?.("Todoist", `删除板块失败: ${r?.message || "网络或权限错误"}`);
        });
      }
    } else if (s === "add-task-submit") {
      const t = String(e?.content || "").trim(), i = e?.view || o.view || "inbox";
      let n = e?.projectId || e?.group?.projectId || void 0, r = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, l;
      i === "projects" ? n || (n = o.activeProjectId || void 0) : i === "today" && (l = "today");
      const j = r || void 0;
      if (t) {
        const _ = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, g = {
          id: _,
          content: t,
          completed: !1,
          priority: 1,
          labels: [],
          dueText: l ? "今天" : "",
          isOverdue: !1
        };
        let w = o.columns.find((c) => !!(e?.group && c === e.group || r !== void 0 && c.sectionId === r));
        !w && o.columns.length > 0 && (w = o.columns[0]), w && w.tasks.push(g);
        const k = Array.isArray(e?.attachments) ? e.attachments : [];
        return k.length > 0 && (g.description = k.map((c) => `![${c.file_name}](${c.file_url})`).join(`

`)), (k.length > 0 ? a.createTaskWithAttachments({
          content: t,
          project_id: n,
          section_id: j,
          due_string: l,
          attachments: k
        }) : a.createTask({
          content: t,
          project_id: n,
          section_id: j,
          due_string: l
        })).then((c) => {
          if (c && c.id) {
            g.id = String(c.id), g._taskRaw = c, c.url && (g.url = c.url);
            try {
              a.updateLocalCacheOnTaskCreated(c, i, n, w?.sectionId);
            } catch {
            }
          }
          return !0;
        }).catch((c) => {
          if (console.error("[Todoist] Create task error:", c), w) {
            const m = w.tasks.findIndex((p) => p.id === _);
            m >= 0 && w.tasks.splice(m, 1);
          }
          return typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。"), !1;
        });
      }
    } else if (s === "toggle-task") {
      const t = String(e?.taskId || e?.task?.id || e?.id || e || "");
      for (const i of o.columns) {
        const n = i.tasks.findIndex((r) => String(r.id) === t);
        if (n >= 0) {
          const r = i.tasks[n], l = !r.completed;
          r.completed = l, a.getToken() && a.toggleTaskCompletion(t, l), J(async () => {
            const { todoistCalendarSidebarController: j } = await import("./calendar-sidebar-store-BfJCHI6Q.js");
            j.recordTaskCompletion(r, l);
          }).catch(() => {
            o.emptyText = "本地完成记录未确认，请核对；没有自动重试。";
          }), l && i.tasks.splice(n, 1);
          break;
        }
      }
    } else if (s === "update-task-title") {
      const t = String(e?.taskId || e?.task?.id || e?.id || ""), i = String(e?.content !== void 0 ? e.content : e?.newContent || "");
      for (const n of o.columns) {
        const r = n.tasks.find((l) => String(l.id) === t);
        if (r && i) {
          r.content = i, a.getToken() && a.updateTask(t, { content: i });
          break;
        }
      }
    } else if (s === "update-task-desc") {
      const t = String(e?.taskId || ""), i = String(e?.description || "");
      for (const n of o.columns) {
        const r = n.tasks.find((l) => String(l.id) === t);
        if (r) {
          r.description = i, a.getToken() && a.updateTask(t, { description: i });
          break;
        }
      }
    } else if (s === "delete-task-submit") {
      const t = String(e?.taskId || e || "");
      for (const i of o.columns) {
        const n = i.tasks.findIndex((r) => String(r.id) === t);
        if (n !== -1) {
          i.tasks.splice(n, 1), a.getToken() && a.deleteTask(t);
          break;
        }
      }
    }
    for (const t of $)
      try {
        t(s, e);
      } catch (i) {
        console.error(`[TodoistTaskList] Handler error for action ${s}:`, i);
      }
  }
}, U = H({ view: "inbox" });
let q = {}, X = !1;
function Y(s) {
  U.view = s;
}
function ie(s) {
  q = Object.freeze({ ...s });
}
function oe(s) {
  X = s;
}
async function ne(s) {
  Y(s), await Q.loadWorkspace(s), q.switchView && await q.switchView(s);
}
const le = te(U), ue = Object.freeze({
  update: Y,
  setActions: ie,
  setMounted: oe,
  switchView: ne,
  get active() {
    return X;
  }
}), b = H({
  get isOpen() {
    return x.visible;
  },
  set isOpen(s) {
    x.visible = s;
  },
  title: "收件箱",
  isSaving: !1,
  timerMinutes: 30,
  labelCount: 0,
  isCalendarOpen: !0,
  isLabelPopoverOpen: !1
}), V = /* @__PURE__ */ new Set(), fe = {
  get state() {
    return b;
  },
  updateState(s) {
    Object.assign(b, s);
  },
  open() {
    E.open("todoist");
  },
  close() {
    return E.close("todoist");
  },
  minimize() {
    E.minimize("todoist");
  },
  refresh() {
    Q.loadWorkspace(void 0, void 0, !0);
  },
  // Compatibility bridge only; there is no remote order-save implementation.
  save() {
    this.dispatch("save");
  },
  toggleCalendar() {
    b.isCalendarOpen = !b.isCalendarOpen, this.dispatch("toggle-calendar", { isOpen: b.isCalendarOpen });
  },
  toggleLabelPopover() {
    b.isLabelPopoverOpen = !b.isLabelPopoverOpen;
  },
  onAction(s) {
    return V.add(s), () => {
      V.delete(s);
    };
  },
  dispatch(s, e) {
    for (const v of V) v(s, e);
  }
};
export {
  Q as a,
  fe as b,
  o as c,
  b as d,
  le as e,
  K as f,
  ue as t
};
