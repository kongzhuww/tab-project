import { r as H, e as te } from "./vendor-vue-BUkfvXUI.js";
import { w as J, t as _ } from "./module-state-BVJNDzfS.js";
import { t as a, c as se } from "./todoist.service-DeCQ21Vr.js";
import { w as E } from "./read-session-BWENvNUM.js";
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
    if (!_.active) return;
    if (o.movingTaskId) {
      o.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    K();
    const t = new AbortController();
    P = t;
    const i = _.session, n = z, r = () => !t.signal.aborted && _.active && i === _.session && n === z, u = s || o.view || "inbox", h = e || (u === "projects" ? o.activeProjectId || a.getActiveProjectId() : void 0), x = u !== o.view || u === "projects" && h !== o.activeProjectId;
    o.view = u, x && this.updateState({ columns: [], emptyText: "", activeProjectId: h || "" });
    const k = (p) => {
      if (!r()) return;
      const w = se(), D = {
        ...p,
        projects: p.projects.map((d) => ({ ...d })),
        availableLabels: [...p.availableLabels || []],
        columns: p.columns.map((d) => ({
          ...d,
          _groupRaw: d._groupRaw ? { ...d._groupRaw } : void 0,
          tasks: d.tasks.map((l) => ({
            ...l,
            startDate: w(l.id, l.description),
            labels: l.labels ? [...l.labels] : void 0,
            _taskRaw: l._taskRaw ? {
              ...l._taskRaw,
              labels: [...l._taskRaw.labels || []],
              due: l._taskRaw.due ? { ...l._taskRaw.due } : null
            } : void 0
          }))
        }))
      };
      o.moveNeedsRefresh = !1, !o.movingTaskId && o.moveError && (o.moveMessage = "", o.moveError = !1), this.updateState({
        ...D,
        view: u,
        loading: !1,
        emptyText: D.columns.length ? "" : "暂无待办任务"
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: u === "projects" ? "项目" : u === "today" ? "今天" : "收件箱"
      });
    };
    this.setLoading(o.columns.length === 0);
    try {
      if (await a.initToken(), !r()) return;
      if (o.accountConfigured = !!a.getToken().trim(), !o.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      if (!v) {
        const w = await a.getCachedWorkspaceData(u, h);
        if (!r()) return;
        w && k(w);
      }
      const p = await a.loadWorkspaceData(u, h, v, t.signal);
      k(p);
    } catch {
      r() && this.updateState({
        loading: !1,
        emptyText: o.columns.length ? "刷新未完成，保留已有数据。" : "待办读取失败，请手动刷新。"
      });
    } finally {
      P === t && (P = void 0);
    }
  },
  async moveTask(s, e, v) {
    const t = o, i = (c) => (t.moveMessage = c, t.moveError = !0, !1);
    if (!_.active || t.movingTaskId) return !1;
    if (t.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const n = t.columns.find((c) => c.tasks.some((m) => m.id === s)), r = n?.tasks.find((c) => c.id === s);
    if (!n || !r || r.completed || s.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (v === s) return !0;
    const u = t.view, h = t.activeProjectId, x = t.columns, k = n.tasks.indexOf(r), p = n.tasks[k + 1]?.id, w = n.tasks[k - 1]?.id, D = {
      dueDate: r.dueDate,
      dueText: r.dueText,
      dueString: r.dueString,
      isDueToday: r.isDueToday,
      isOverdue: r.isOverdue
    }, d = u === "today", l = d && !e.projectId;
    if (e.dueDate && (!d || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !l) return i("目标项目未就绪，未提交移动。");
    const T = e.dueDate ? t.columns.find((c) => c.sectionId === "today") : l ? t.columns.find((c) => c.sectionId === e.sectionId) : t.columns.find((c) => c.projectId === e.projectId && c.sectionId === e.sectionId), W = e.dueDate ? n.sectionId !== "today" : !l && (String(r._taskRaw?.project_id || n.projectId || "") !== e.projectId || String(r._taskRaw?.section_id || n.sectionId || "") !== e.sectionId);
    if (!W && n === T && v === void 0 && n.tasks[n.tasks.length - 1]?.id === s) return !0;
    if (l && e.sectionId === "overdue" && n.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const C = v ? T?.tasks.find((c) => c.id === v) : void 0;
    if (l && !T || v && !C)
      return i("目标板块或任务已改变，请重新拖动。");
    const M = W && !l ? "" : String(r._taskRaw?.parent_id || ""), B = e.projectId || String(r._taskRaw?.project_id || n.projectId || ""), Z = e.projectId ? e.sectionId : String(r._taskRaw?.section_id || "");
    if (C && !d && String(C._taskRaw?.parent_id || "") !== M)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const F = (T?.tasks || []).filter((c) => c.id !== s && (d || String(c._taskRaw?.parent_id || "") === M)), y = C ? F.findIndex((c) => c.id === C.id) + 1 : F.length + 1;
    if (T && y < 1) return i("目标任务位置已改变，请重试拖动。");
    t.movingTaskId = s, t.moveMessage = "位置已在本页移动，正在后台保存…", t.moveError = !1, K(), a.invalidateWorkspaceSnapshots();
    let A = !1, j, R = !1, O = !1;
    const G = () => x === t.columns && u === t.view && h === t.activeProjectId, N = (c) => {
      if (!G()) return !1;
      const m = t.columns.find((f) => f.tasks.some((S) => S.id === s)), g = m?.tasks.find((f) => f.id === s) || (R && O ? r : void 0);
      if (!g) return !1;
      let I = e.dueDate ? t.columns.find((f) => f.sectionId === "today") : l ? t.columns.find((f) => f.sectionId === e.sectionId) : t.columns.find((f) => f.projectId === e.projectId && f.sectionId === e.sectionId);
      const L = !I && d && !l;
      if (L && (I = n), !I && l) return !1;
      if (m && m.tasks.splice(m.tasks.indexOf(g), 1), j) {
        const f = { ...g._taskRaw };
        for (const S of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(j, S) && (f[S] = j[S]);
        g._taskRaw = f;
      }
      if (e.dueDate && (g.dueDate = j?.due?.date || e.dueDate, g.dueText = "今天", g.dueString = j?.due?.string || e.dueDate, g.isDueToday = !0, g.isOverdue = !1), I) {
        const f = L ? Math.min(k, I.tasks.length) : c && v ? I.tasks.findIndex((S) => S.id === v) : -1;
        I.tasks.splice(f < 0 ? I.tasks.length : f, 0, g);
      }
      return O = !I, !0;
    }, ee = () => {
      if (!R || !G() || !t.columns.includes(n)) return !1;
      const c = t.columns.find((f) => f.tasks.some((S) => S.id === s)), m = c?.tasks.find((f) => f.id === s) || (O ? r : void 0);
      if (!m) return !1;
      c && c.tasks.splice(c.tasks.indexOf(m), 1);
      const g = p ? n.tasks.findIndex((f) => f.id === p) : -1, I = w ? n.tasks.findIndex((f) => f.id === w) : -1, L = g >= 0 ? g : I >= 0 ? I + 1 : Math.min(k, n.tasks.length);
      return n.tasks.splice(L, 0, m), e.dueDate && m.dueDate === e.dueDate && m.dueText === "今天" && m.dueString === e.dueDate && m.isDueToday && !m.isOverdue && Object.assign(m, D), O = !1, !0;
    };
    try {
      return await J(async () => {
        try {
          if (R = N(!0), !R) throw new Error("看板已改变");
          if (W) {
            if (j = e.dueDate ? await a.setTaskDueDate(s, e.dueDate) : await a.moveTask(s, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(j?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            A = !0;
          }
          if (T && (!W || v)) {
            const m = await a.reorderTask(s, y, d);
            if (B && String(m.project_id) !== B || String(m.section_id || "") !== Z || String(m.parent_id || "") !== M)
              throw A = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            j = { ...j, ...m };
          }
          const c = N(!0);
          return t.moveMessage = c ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (t.moveNeedsRefresh = !0, A)
            return N(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const c = ee();
          return i(c ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。" : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
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
      let n = e?.projectId || e?.group?.projectId || void 0, r = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, u;
      i === "projects" ? n || (n = o.activeProjectId || void 0) : i === "today" && (u = "today");
      const h = r || void 0;
      if (t) {
        const x = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, k = {
          id: x,
          content: t,
          completed: !1,
          priority: 1,
          labels: [],
          dueText: u ? "今天" : "",
          isOverdue: !1
        };
        let p = o.columns.find((d) => !!(e?.group && d === e.group || r !== void 0 && d.sectionId === r));
        !p && o.columns.length > 0 && (p = o.columns[0]), p && p.tasks.push(k);
        const w = Array.isArray(e?.attachments) ? e.attachments : [];
        return w.length > 0 && (k.description = w.map((d) => `![${d.file_name}](${d.file_url})`).join(`

`)), (w.length > 0 ? a.createTaskWithAttachments({
          content: t,
          project_id: n,
          section_id: h,
          due_string: u,
          attachments: w
        }) : a.createTask({
          content: t,
          project_id: n,
          section_id: h,
          due_string: u
        })).then((d) => {
          if (d && d.id) {
            k.id = String(d.id), k._taskRaw = d, d.url && (k.url = d.url);
            try {
              a.updateLocalCacheOnTaskCreated(d, i, n, p?.sectionId);
            } catch {
            }
          }
          return !0;
        }).catch((d) => {
          if (console.error("[Todoist] Create task error:", d), p) {
            const l = p.tasks.findIndex((T) => T.id === x);
            l >= 0 && p.tasks.splice(l, 1);
          }
          return typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。"), !1;
        });
      }
    } else if (s === "toggle-task") {
      const t = String(e?.taskId || e?.task?.id || e?.id || e || "");
      for (const i of o.columns) {
        const n = i.tasks.findIndex((r) => String(r.id) === t);
        if (n >= 0) {
          const r = i.tasks[n], u = !r.completed;
          r.completed = u, a.getToken() && a.toggleTaskCompletion(t, u), J(async () => {
            const { todoistCalendarSidebarController: h } = await import("./calendar-sidebar-store-PcAZpNPl.js");
            h.recordTaskCompletion(r, u);
          }).catch(() => {
            o.emptyText = "本地完成记录未确认，请核对；没有自动重试。";
          }), u && i.tasks.splice(n, 1);
          break;
        }
      }
    } else if (s === "update-task-title") {
      const t = String(e?.taskId || e?.task?.id || e?.id || ""), i = String(e?.content !== void 0 ? e.content : e?.newContent || "");
      for (const n of o.columns) {
        const r = n.tasks.find((u) => String(u.id) === t);
        if (r && i) {
          r.content = i, a.getToken() && a.updateTask(t, { content: i });
          break;
        }
      }
    } else if (s === "update-task-desc") {
      const t = String(e?.taskId || ""), i = String(e?.description || "");
      for (const n of o.columns) {
        const r = n.tasks.find((u) => String(u.id) === t);
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
const ue = te(U), le = Object.freeze({
  update: Y,
  setActions: ie,
  setMounted: oe,
  switchView: ne,
  get active() {
    return X;
  }
}), b = H({
  get isOpen() {
    return _.visible;
  },
  set isOpen(s) {
    _.visible = s;
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
  o as b,
  b as c,
  fe as d,
  ue as e,
  K as f,
  le as t
};
