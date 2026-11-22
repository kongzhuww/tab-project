import { t as C, w as se } from "./module-state-CL24MXdf.js";
import { t as f, p as Ue, a as fe, c as ye, i as Oe, b as Be } from "./todoist.service-Ct-3lsf4.js";
import { r as R, a as Je } from "./vendor-vue-C-_ocEUS.js";
import { w as K } from "./window-manager.store-BoJtJrk7.js";
import { t as te } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { openTodoistTask as Ze } from "./task-navigation-DLUs0sEg.js";
const V = R({
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
let A = {}, $e = !1;
function Qe(t) {
  Object.assign(V, t, {
    cells: t.cells ? [...t.cells] : V.cells,
    detailTasks: t.detailTasks ? [...t.detailTasks] : V.detailTasks,
    detailEvents: t.detailEvents ? [...t.detailEvents] : V.detailEvents
  });
}
function Xe(t) {
  A = Object.freeze({ ...t });
}
function et(t) {
  const e = Object.freeze({ ...t });
  return A = e, () => {
    A === e && (A = {});
  };
}
function tt(t) {
  $e = t;
}
function Pe(t) {
  V.dropDate = String(t || "");
}
function st(t) {
  A.selectDate?.(t);
}
function ot() {
  A.previousMonth?.();
}
function it() {
  A.nextMonth?.();
}
function at() {
  A.goToday?.();
}
function nt() {
  A.closeDetail?.();
}
async function rt(t, e) {
  await A.dropTask?.(t, e);
}
function ct(t, e = !1) {
  A.openTask?.(t, e);
}
function dt(t) {
  Pe(t), A.highlightDrop?.(t);
}
const je = Object.freeze({
  update: Qe,
  setActions: Xe,
  attachActions: et,
  setMounted: tt,
  setDropDate: Pe,
  selectDate: st,
  previousMonth: ot,
  nextMonth: it,
  goToday: at,
  closeDetail: nt,
  dropTask: rt,
  openTask: ct,
  highlightDrop: dt,
  get snapshot() {
    return V;
  },
  get active() {
    return $e;
  }
}), lt = R({ labels: [] });
let We = {}, Ne = !1, ge = 0, U;
function ut() {
  ge++, U?.abort(), U = void 0;
}
const Ae = "todoist_labels_cache_v1";
function me(t) {
  lt.labels = t.map((e) => ({ ...e }));
}
async function ht(t = !1) {
  if (!C.active) return;
  if (!t && typeof localStorage < "u")
    try {
      const i = localStorage.getItem(Ae);
      if (i) {
        const a = JSON.parse(i);
        if (Array.isArray(a) && a.length > 0) {
          me(a);
          return;
        }
      }
    } catch {
    }
  ut();
  const e = new AbortController();
  U = e;
  const o = ge, s = C.session;
  try {
    const i = await f.getLabels(e.signal);
    if (!e.signal.aborted && o === ge && s === C.session && C.active && Array.isArray(i)) {
      const a = i.map((n) => ({ id: n.id, name: n.name }));
      if (me(a), typeof localStorage < "u")
        try {
          localStorage.setItem(Ae, JSON.stringify(a));
        } catch {
        }
    }
  } catch {
    e.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    U === e && (U = void 0);
  }
}
function ft(t) {
  We = Object.freeze({ ...t });
}
function gt(t) {
  Ne = t;
}
function mt(t, e) {
  We.startDrag?.(t, e);
}
const xt = Object.freeze({
  update: me,
  refresh: ht,
  setActions: ft,
  setMounted: gt,
  startDrag: mt,
  get active() {
    return Ne;
  }
}), d = R({
  accountConfigured: null,
  loading: !1,
  movingTaskId: null,
  moveMessage: "",
  moveError: !1,
  moveNeedsRefresh: !1,
  emptyText: "",
  view: typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox",
  activeProjectId: "",
  activeProjectName: "",
  projects: [],
  columns: [],
  addingSection: !1,
  activeComposerSectionId: null,
  availableLabels: []
}), ae = /* @__PURE__ */ new Set();
let pe = 0, B;
function ne() {
  pe++, B?.abort(), B = void 0, d.loading = !1;
}
const Te = {
  updateState(t) {
    Object.assign(d, t);
  },
  setLoading(t) {
    d.loading = t, t && (d.emptyText = "");
  },
  setColumns(t) {
    d.columns = [...t], t.length > 0 && (d.emptyText = "");
  },
  onAction(t) {
    return ae.add(t), () => {
      ae.delete(t);
    };
  },
  async loadWorkspace(t, e, o = !1) {
    if (!C.active) return;
    if (d.movingTaskId) {
      d.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    ne();
    const s = new AbortController();
    B = s;
    const i = C.session, a = pe, n = () => !s.signal.aborted && C.active && i === C.session && a === pe, c = t || d.view || typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox", r = e || (c === "projects" ? d.activeProjectId || f.getActiveProjectId() : void 0), u = c !== d.view || c === "projects" && r !== d.activeProjectId;
    if (d.view = c, typeof localStorage < "u")
      try {
        localStorage.setItem("todoist_last_active_view", c);
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        chrome.storage.local.set({ todoist_last_active_view: c });
      } catch {
      }
    const m = (v) => {
      if (!n()) return;
      const l = ye(), w = {
        ...v,
        projects: v.projects.map((g) => ({ ...g })),
        availableLabels: [...v.availableLabels || []],
        columns: v.columns.map((g) => ({
          ...g,
          _groupRaw: g._groupRaw ? { ...g._groupRaw } : void 0,
          tasks: g.tasks.map((S) => ({
            ...S,
            startDate: l(S.id, S.description),
            labels: S.labels ? [...S.labels] : void 0,
            _taskRaw: S._taskRaw ? {
              ...S._taskRaw,
              labels: [...S._taskRaw.labels || []],
              due: S._taskRaw.due ? { ...S._taskRaw.due } : null
            } : void 0
          }))
        }))
      };
      d.moveNeedsRefresh = !1, !d.movingTaskId && d.moveError && (d.moveMessage = "", d.moveError = !1), this.updateState({
        ...w,
        view: c,
        loading: !1,
        emptyText: w.readWarning || (w.columns.length ? "" : "暂无待办任务")
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: c === "projects" ? "项目" : c === "today" ? "今天" : "收件箱"
      });
    }, h = o ? null : f.getFastSnapshot(c, r);
    h && h.columns && h.columns.length > 0 ? m(h) : u && !d.columns.length ? (this.updateState({ columns: [], emptyText: "", activeProjectId: r || "" }), this.setLoading(!0)) : d.columns.length || this.setLoading(!0);
    try {
      if (await f.initToken(), !n()) return;
      if (d.accountConfigured = !!f.getToken().trim(), !d.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      let v = null;
      if (!h && !o) {
        const w = await f.getCachedWorkspaceData(c, r);
        if (!n()) return;
        w && Array.isArray(w.columns) && w.columns.length > 0 && (v = w, m(w), this.setLoading(!1));
      }
      const l = await f.loadWorkspaceData(c, r, o, s.signal);
      l !== h && l !== v && m(l);
    } catch (v) {
      n() && (this.setLoading(!1), this.updateState({ emptyText: fe(v) }));
    } finally {
      B === s && (B = void 0);
    }
  },
  async moveTask(t, e, o) {
    const s = d, i = (p) => (s.moveMessage = p, s.moveError = !0, !1);
    if (!C.active || s.movingTaskId) return !1;
    if (s.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const a = s.columns.find((p) => p.tasks.some((k) => k.id === t)), n = a?.tasks.find((p) => p.id === t);
    if (!a || !n || n.completed || t.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (o === t) return !0;
    const c = s.view, r = s.activeProjectId, u = s.columns, m = a.tasks.indexOf(n), h = a.tasks[m + 1]?.id, v = a.tasks[m - 1]?.id, l = {
      dueDate: n.dueDate,
      dueText: n.dueText,
      dueString: n.dueString,
      isDueToday: n.isDueToday,
      isOverdue: n.isOverdue
    }, w = c === "today", g = w && !e.projectId;
    if (e.dueDate && (!w || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !g) return i("目标项目未就绪，未提交移动。");
    const S = e.dueDate ? s.columns.find((p) => p.sectionId === "today") : g ? s.columns.find((p) => p.sectionId === e.sectionId) : s.columns.find((p) => p.projectId === e.projectId && p.sectionId === e.sectionId), T = e.dueDate ? a.sectionId !== "today" : !g && (String(n._taskRaw?.project_id || a.projectId || "") !== e.projectId || String(n._taskRaw?.section_id || a.sectionId || "") !== e.sectionId);
    if (!T && a === S && o === void 0 && a.tasks[a.tasks.length - 1]?.id === t) return !0;
    if (g && e.sectionId === "overdue" && a.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const b = o ? S?.tasks.find((p) => p.id === o) : void 0;
    if (g && !S || o && !b)
      return i("目标板块或任务已改变，请重新拖动。");
    const O = T && !g ? "" : String(n._taskRaw?.parent_id || ""), Ce = e.projectId || String(n._taskRaw?.project_id || a.projectId || ""), He = e.projectId ? e.sectionId : String(n._taskRaw?.section_id || "");
    if (b && !w && String(b._taskRaw?.parent_id || "") !== O)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const be = (S?.tasks || []).filter((p) => p.id !== t && (w || String(p._taskRaw?.parent_id || "") === O)), Ie = b ? be.findIndex((p) => p.id === b.id) + 1 : be.length + 1;
    if (S && Ie < 1) return i("目标任务位置已改变，请重试拖动。");
    s.movingTaskId = t, s.moveMessage = "位置已在本页移动，正在后台保存…", s.moveError = !1, ne(), f.invalidateWorkspaceSnapshots();
    let oe = !1, x, Z = !1, Q = !1;
    const _e = () => u === s.columns && c === s.view && r === s.activeProjectId, ie = (p) => {
      if (!_e()) return !1;
      const k = s.columns.find((D) => D.tasks.some((E) => E.id === t)), I = k?.tasks.find((D) => D.id === t) || (Z && Q ? n : void 0);
      if (!I) return !1;
      let j = e.dueDate ? s.columns.find((D) => D.sectionId === "today") : g ? s.columns.find((D) => D.sectionId === e.sectionId) : s.columns.find((D) => D.projectId === e.projectId && D.sectionId === e.sectionId);
      const X = !j && w && !g;
      if (X && (j = a), !j && g) return !1;
      if (k && k.tasks.splice(k.tasks.indexOf(I), 1), x) {
        const D = { ...I._taskRaw };
        for (const E of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(x, E) && (D[E] = x[E]);
        I._taskRaw = D;
      }
      if (e.dueDate && (I.dueDate = x?.due?.date || e.dueDate, I.dueText = "今天", I.dueString = x?.due?.string || e.dueDate, I.isDueToday = !0, I.isOverdue = !1), j) {
        const D = X ? Math.min(m, j.tasks.length) : p && o ? j.tasks.findIndex((E) => E.id === o) : -1;
        j.tasks.splice(D < 0 ? j.tasks.length : D, 0, I);
      }
      return Q = !j, !0;
    }, qe = () => {
      if (!Z || !_e() || !s.columns.includes(a)) return !1;
      const p = s.columns.find((D) => D.tasks.some((E) => E.id === t)), k = p?.tasks.find((D) => D.id === t) || (Q ? n : void 0);
      if (!k) return !1;
      p && p.tasks.splice(p.tasks.indexOf(k), 1);
      const I = h ? a.tasks.findIndex((D) => D.id === h) : -1, j = v ? a.tasks.findIndex((D) => D.id === v) : -1, X = I >= 0 ? I : j >= 0 ? j + 1 : Math.min(m, a.tasks.length);
      return a.tasks.splice(X, 0, k), e.dueDate && k.dueDate === e.dueDate && k.dueText === "今天" && k.dueString === e.dueDate && k.isDueToday && !k.isOverdue && Object.assign(k, l), Q = !1, !0;
    };
    try {
      return await se(async () => {
        try {
          if (Z = ie(!0), !Z) throw new Error("看板已改变");
          if (T) {
            if (x = e.dueDate ? await f.setTaskDueDate(t, e.dueDate) : await f.moveTask(t, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(x?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            oe = !0;
          }
          if (S && (!T || o)) {
            const k = await f.reorderTask(t, Ie, w);
            if (Ce && String(k.project_id) !== Ce || String(k.section_id || "") !== He || String(k.parent_id || "") !== O)
              throw oe = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            x = { ...x, ...k };
          }
          const p = ie(!0);
          return s.moveMessage = p ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (s.moveNeedsRefresh = !0, oe)
            return ie(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const p = qe();
          return i(p ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。" : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
        }
      });
    } finally {
      f.invalidateWorkspaceSnapshots(), s.movingTaskId = null;
    }
  },
  dispatch(t, e) {
    const o = String(e?.taskId || e?.task?.id || e?.id || (typeof e == "string" ? e : ""));
    if (d.movingTaskId === o && (t.startsWith("update-task-") || t === "toggle-task" || t === "delete-task-submit"))
      return !1;
    if (t === "move-task-to-project")
      return this.moveTask(String(e?.taskId || ""), {
        projectId: String(e?.targetProjectId || ""),
        sectionId: ""
      });
    if (t === "create-task")
      d.activeComposerSectionId = d.columns[0]?.sectionId ?? "";
    else if (t === "refresh")
      this.loadWorkspace(d.view, d.activeProjectId, !0);
    else if (t === "switch-project") {
      const s = String(e?.id || e || "");
      this.loadWorkspace("projects", s);
    } else if (t === "create-project-submit") {
      const s = String(e || "").trim();
      s && f.createProject(s).then((i) => {
        this.loadWorkspace("projects", i?.id ? String(i.id) : void 0);
      }).catch((i) => console.error("[Todoist] Create project error:", i));
    } else if (t === "rename-project-submit") {
      const s = String(e?.projectId || ""), i = String(e?.newName || "").trim();
      s && i && f.renameProject(s, i).then(() => {
        this.loadWorkspace("projects", s);
      }).catch((a) => console.error("[Todoist] Rename project error:", a));
    } else if (t === "delete-project-submit") {
      const s = String(e?.projectId || e || "");
      s && f.deleteProject(s).then(() => {
        this.loadWorkspace("projects");
      }).catch((i) => console.error("[Todoist] Delete project error:", i));
    } else if (t === "add-section-submit") {
      const s = String(typeof e == "string" ? e : e?.name || "").trim(), i = String(
        (typeof e == "object" && e?.projectId ? e.projectId : "") || d.activeProjectId || d.columns.find((a) => a.projectId)?.projectId || f.getActiveProjectId() || ""
      );
      s && i && f.createSection(s, i).then(() => {
        this.loadWorkspace(d.view, i, !0);
      }).catch((a) => console.error("[Todoist] Create section error:", a));
    } else if (t === "rename-section") {
      const s = String(e?.sectionId || ""), i = String(e?.newName || "").trim();
      if (i)
        if (s)
          f.renameSection(s, i).then(() => {
            this.loadWorkspace(d.view, d.activeProjectId, !0);
          }).catch((a) => console.error("[Todoist] Rename section error:", a));
        else {
          f.setDefaultSectionName(i);
          const a = d.columns.find((n) => !n.sectionId);
          a && (a.title = i), this.loadWorkspace(d.view, d.activeProjectId, !0);
        }
    } else if (t === "delete-section") {
      const s = String(e?.sectionId || e || "");
      if (s) {
        const i = d.columns.findIndex((n) => String(n.sectionId) === s);
        let a;
        i !== -1 && (a = d.columns[i], d.columns.splice(i, 1)), f.deleteSection(s).then(() => {
          this.loadWorkspace(d.view, d.activeProjectId, !0);
        }).catch((n) => {
          console.error("[Todoist] Delete section error:", n), a && i !== -1 && d.columns.splice(i, 0, a), d.moveError = !0, d.moveMessage = `删除板块失败: ${n?.message || "网络请求异常"}`, typeof window < "u" && window.LogicWeaverNotifications?.error?.("Todoist", `删除板块失败: ${n?.message || "网络或权限错误"}`);
        });
      }
    } else if (t === "add-task-submit") {
      let s = String(e?.content || "").trim();
      const i = e?.view || d.view || "inbox";
      let a = e?.projectId || e?.group?.projectId || void 0, n = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, c = e?.dueDate, r = e?.dueText, u = e?.dueString;
      if (!c && !u && s) {
        const h = Ue(s);
        h && (c = h.date, r = h.label + (h.time ? ` ${h.time}` : ""), u = h.time ? `${h.date} ${h.time}` : h.date, s = h.cleanTitle || s);
      }
      i === "projects" ? a || (a = d.activeProjectId || void 0) : i === "today" && !c && !u && (u = "today", c = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), r = "今天");
      const m = n || void 0;
      if (s) {
        const h = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, v = {
          id: h,
          content: s,
          completed: !1,
          priority: 1,
          labels: [],
          dueDate: c || "",
          dueText: r || (c ? c.slice(5) : u === "today" ? "今天" : ""),
          dueString: u || c || "",
          isOverdue: !1
        };
        let l = d.columns.find((T) => !!(e?.group && T === e.group || n !== void 0 && T.sectionId === n));
        !l && d.columns.length > 0 && (l = d.columns[0]), l && l.tasks.push(v);
        const w = Array.isArray(e?.attachments) ? e.attachments : [];
        w.length > 0 && (v.description = w.map((T) => `![${T.file_name}](${T.file_url})`).join(`

`));
        const g = {
          content: s,
          project_id: a,
          section_id: m
        };
        return c ? g.due_date = c : u && (g.due_string = u), (w.length > 0 ? f.createTaskWithAttachments({
          ...g,
          attachments: w
        }) : f.createTask(g)).then((T) => {
          if (T && T.id) {
            v.id = String(T.id), v._taskRaw = T, T.url && (v.url = T.url);
            try {
              f.updateLocalCacheOnTaskCreated(T, i, a, l?.sectionId);
            } catch {
            }
          }
          return !0;
        }).catch((T) => {
          if (console.error("[Todoist] Create task error:", T), l) {
            const b = l.tasks.findIndex((O) => O.id === h);
            b >= 0 && l.tasks.splice(b, 1);
          }
          return typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。"), !1;
        });
      }
    } else if (t === "toggle-task") {
      const s = String(e?.taskId || e?.task?.id || e?.id || e || "");
      for (const i of d.columns) {
        const a = i.tasks.findIndex((n) => String(n.id) === s);
        if (a >= 0) {
          const n = i.tasks[a], c = !n.completed;
          ne(), f.invalidateWorkspaceSnapshots(), n.completed = c, c && i.tasks.splice(a, 1), se(async () => {
            const { todoistCalendarSidebarController: r } = await Promise.resolve().then(() => Ee);
            r.recordTaskCompletion(n, c), f.getToken() && await f.toggleTaskCompletion(s, c);
          }).catch(async () => {
            n.completed = !c, c && d.columns.includes(i) && !i.tasks.some((u) => u.id === s) && i.tasks.splice(Math.min(a, i.tasks.length), 0, n);
            const { todoistCalendarSidebarController: r } = await Promise.resolve().then(() => Ee);
            r.recordTaskCompletion(n, !c), d.emptyText = "任务完成状态保存失败，请重试。";
          });
          break;
        }
      }
    } else if (t === "update-task-title") {
      const s = String(e?.taskId || e?.task?.id || e?.id || ""), i = String(e?.content !== void 0 ? e.content : e?.newContent || "");
      for (const a of d.columns) {
        const n = a.tasks.find((c) => String(c.id) === s);
        if (n && i) {
          n.content = i, f.getToken() && f.updateTask(s, { content: i });
          break;
        }
      }
    } else if (t === "update-task-desc") {
      const s = String(e?.taskId || ""), i = String(e?.description || "");
      for (const a of d.columns) {
        const n = a.tasks.find((c) => String(c.id) === s);
        if (n) {
          n.description = i, f.getToken() && f.updateTask(s, { description: i });
          break;
        }
      }
    } else if (t === "delete-task-submit") {
      const s = String(e?.taskId || e || "");
      for (const i of d.columns) {
        const a = i.tasks.findIndex((n) => String(n.id) === s);
        if (a !== -1) {
          i.tasks.splice(a, 1), f.getToken() && f.deleteTask(s);
          break;
        }
      }
    }
    for (const s of ae)
      try {
        s(t, e);
      } catch (i) {
        console.error(`[TodoistTaskList] Handler error for action ${t}:`, i);
      }
  }
}, pt = typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox", Ge = R({ view: pt });
let we = {}, Fe = !1;
function Ve(t) {
  if (Ge.view = t, typeof localStorage < "u")
    try {
      localStorage.setItem("todoist_last_active_view", t);
    } catch {
    }
}
function wt(t) {
  we = Object.freeze({ ...t });
}
function vt(t) {
  Fe = t;
}
async function St(t) {
  Ve(t), await Te.loadWorkspace(t), we.switchView && await we.switchView(t);
}
const Et = Je(Ge), Mt = Object.freeze({
  update: Ve,
  setActions: wt,
  setMounted: vt,
  switchView: St,
  get active() {
    return Fe;
  }
});
function N(t = /* @__PURE__ */ new Date()) {
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const ze = "todoist_local_completed_tasks_v1";
function Ke() {
  try {
    const t = JSON.parse(localStorage.getItem(ze) || "{}");
    return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).filter(([, e]) => e && typeof e == "object" && typeof e.id == "string" && typeof e.content == "string"));
  } catch {
    return {};
  }
}
function Dt(t) {
  localStorage.setItem(ze, JSON.stringify(t));
}
function ve(t) {
  const e = t.completedAt || t.completed_at || t.completed_date, o = new Date(e || "");
  return Number.isFinite(o.getTime()) ? N(o) : "";
}
function Se(t, e = ye()) {
  const o = t._taskRaw || t.raw || t, s = String(t.task_id || t.id), i = t.description || o.description || "", a = t.startDate || e(s, i), n = o.due?.datetime || o.due?.date || t.dueDate || "";
  let c = Be(a || n);
  if (!a && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(n)) {
    const r = new Date(n);
    Number.isFinite(r.getTime()) && (c = {
      date: N(r),
      time: `${String(r.getHours()).padStart(2, "0")}:${String(r.getMinutes()).padStart(2, "0")}`
    });
  }
  return {
    id: s,
    content: t.content || "未命名任务",
    completed: typeof t.completed == "boolean" ? t.completed : Oe(t),
    priority: t.priority || 1,
    labels: t.labels || [],
    raw: o,
    scheduledDate: c.date,
    time: c.time,
    dueText: o.due?.string || o.due?.date || "",
    thumbUrl: i.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let M = [], z = 0, P = "", Le = !1, Y = !1;
const L = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Set(), ke = "todoist_calendar_cache_v1";
function yt() {
  if (!Le && (Le = !0, !(typeof localStorage > "u")))
    try {
      const t = localStorage.getItem(ke);
      if (!t) return;
      const e = JSON.parse(t);
      if (!e || typeof e != "object") return;
      if (Array.isArray(e.activeTasks) && Number.isFinite(e.savedAt) && e.savedAt > 0 && (M = e.activeTasks, z = e.savedAt, P = typeof e.savedDay == "string" ? e.savedDay : ""), Array.isArray(e.history))
        for (const o of e.history)
          Array.isArray(o) && typeof o[0] == "string" && o[1] && Array.isArray(o[1].items) && L.set(o[0], o[1]);
    } catch {
    }
}
function xe() {
  if (!(typeof localStorage > "u"))
    try {
      const t = [...L.entries()].slice(-14);
      localStorage.setItem(ke, JSON.stringify({
        savedAt: z,
        savedDay: P,
        activeTasks: M,
        history: t
      }));
    } catch {
    }
}
const y = R({
  collapsed: !1,
  selectedDate: N(),
  badgeText: "Todoist",
  monthLabel: "",
  yearLabel: "",
  cells: [],
  agendaTitle: "",
  todoItems: [],
  todoLoading: !1,
  emptyText: "",
  writeError: ""
}), re = /* @__PURE__ */ new Set();
let De = 0, W;
function F() {
  De++, W?.abort(), W = void 0, y.todoLoading = !1;
}
function H() {
  const t = y, e = ye(), o = M.filter((r) => !Oe(r)).map((r) => Se(r, e)), s = t.selectedDate, i = new Map(t.todoItems.map((r, u) => [r.id, u])), a = Object.values(Ke()).filter((r) => !J.has(r.id)), n = /* @__PURE__ */ new Map();
  for (const r of [...L.get(s)?.items || [], ...a])
    !J.has(r.id) && (r.scheduledDate || ve(r)) === s && n.set(r.id, r);
  for (const r of o) r.scheduledDate === s && n.set(r.id, r);
  t.todoItems = [...n.values()].sort((r, u) => {
    const m = i.get(r.id), h = i.get(u.id);
    return m !== void 0 && h !== void 0 ? m - h : m !== void 0 ? -1 : h !== void 0 ? 1 : (r.time || "").localeCompare(u.time || "");
  }), t.agendaTitle = s === N() ? te("todoist.calendar.todayTasks") : te("todoist.calendar.dateTasks", { date: s });
  const c = /* @__PURE__ */ new Map();
  for (const r of [...Array.from(L.values()).flatMap((u) => u.items), ...a, ...o]) {
    const u = r.scheduledDate || ve(r);
    u && (c.has(u) || c.set(u, /* @__PURE__ */ new Set()), c.get(u).add(r.id));
  }
  for (const r of t.cells)
    r.itemCount = c.get(r.date)?.size || 0, r.hasDot = r.itemCount > 0, r.title = r.itemCount ? te("todoist.calendar.cellTaskCount", { date: r.date, count: r.itemCount }) : r.date;
}
const q = {
  state: y,
  cancelReads: F,
  invalidateReads() {
    if (F(), Y = !0, z = 0, P = "", L.clear(), J.clear(), typeof localStorage < "u")
      try {
        localStorage.removeItem(ke);
      } catch {
      }
  },
  setCollapsed(t) {
    y.collapsed = t;
  },
  toggleCollapsed() {
    this.setCollapsed(!y.collapsed), this.dispatch("toggle-collapsed", y.collapsed);
  },
  recordTaskCompletion(t, e) {
    F(), z = 0;
    const o = String(t.task_id || t.id), s = Ke();
    if (e) {
      J.delete(o);
      const i = Se(t);
      s[o] = { ...i, scheduledDate: t.scheduledDate || i.scheduledDate, completed: !0, completedAt: (/* @__PURE__ */ new Date()).toISOString() }, M = M.filter((a) => String(a.id) !== o);
    } else
      J.add(o), delete s[o], M.some((i) => String(i.id) === o) || M.push({ ...t.raw || t._taskRaw || t, id: o, checked: !1, is_completed: !1, completed: !1 });
    try {
      Dt(s);
    } catch {
      y.writeError = "完成状态的本机记录未保存，请核对。";
    }
    L.clear(), H();
  },
  async loadTodosForDate(t, e = !1) {
    if (!C.active || C.pendingWrites) return;
    yt(), F();
    const o = new AbortController();
    W = o;
    const s = De, i = C.session;
    t ||= N();
    const a = N(), n = () => !o.signal.aborted && s === De && i === C.session && C.active && y.selectedDate === t && !C.pendingWrites;
    y.selectedDate = t, y.emptyText = "", H();
    const c = e || Y || !z || P !== a, r = L.get(t), u = e || Y || !r || P !== a;
    if (!c && !u) {
      y.todoLoading = !1, W === o && (W = void 0);
      return;
    }
    y.todoLoading = !0;
    try {
      if (c) {
        const m = await f.listCalendarTasks(o.signal);
        if (!n()) return;
        M = m, z = Date.now(), P = a, Y = !1, xe(), H();
      }
      if (u) {
        const m = /* @__PURE__ */ new Date(`${t}T00:00:00`);
        m.setDate(m.getDate() + 1);
        try {
          const h = await f.getCompletedTasks({ since: (/* @__PURE__ */ new Date(`${t}T00:00:00`)).toISOString(), until: m.toISOString(), limit: 200 }, o.signal);
          if (!n()) return;
          const v = h.items.filter((l) => ve(l) === t).map((l) => ({
            ...Se(l),
            completed: !0,
            completedAt: l.completed_at
          }));
          L.set(t, { items: v, savedAt: Date.now() }), L.size > 42 && L.delete(L.keys().next().value), P = a, Y = !1, xe();
        } catch (h) {
          n() && (y.emptyText = "完成历史：" + fe(h) + " 现有任务保留。");
        }
      }
      n() && H();
    } catch (m) {
      n() && (y.emptyText = fe(m) + " 当前日期的已有数据保留。");
    } finally {
      n() && (y.todoLoading = !1), W === o && (W = void 0);
    }
  },
  async toggleTodoItem(t) {
    if (C.pendingWrites) return;
    const e = !t.completed;
    y.writeError = "", await se(async () => {
      F();
      try {
        if (await f.toggleTaskCompletion(t.id, e), this.recordTaskCompletion(t, e), f.invalidateWorkspaceSnapshots(), e)
          for (const o of d.columns) o.tasks = o.tasks.filter((s) => String(s.id) !== t.id);
        else C.active && await Te.loadWorkspace(void 0, void 0, !0);
      } catch {
        y.writeError = "完成状态保存未确认，请刷新核对；未自动重试。";
      }
    });
  },
  updateTaskTitle(t, e) {
    const o = M.find((i) => String(i.id) === String(t));
    o && (o.content = e);
    const s = y.todoItems.find((i) => i.id === String(t));
    s && (s.content = e);
  },
  updateState(t) {
    const e = y.selectedDate;
    Object.assign(y, t), H(), t.selectedDate && t.selectedDate !== e && this.loadTodosForDate(t.selectedDate);
  },
  onAction(t) {
    return re.add(t), () => {
      re.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of re)
      try {
        o(t, e);
      } catch {
        y.emptyText = "日历操作未完成，请重新打开。";
      }
  }
}, Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTodoistDateReads: F,
  getLocalTodayDateStr: N,
  todoistCalendarSidebarController: q,
  todoistCalendarSidebarState: y
}, Symbol.toStringTag, { value: "Module" })), $ = R({
  get isOpen() {
    return C.visible;
  },
  set isOpen(t) {
    C.visible = t;
  },
  title: "收件箱",
  isSaving: !1,
  timerMinutes: 30,
  labelCount: 0,
  isCalendarOpen: !0,
  isLabelPopoverOpen: !1
}), ce = /* @__PURE__ */ new Set(), Rt = {
  get state() {
    return $;
  },
  updateState(t) {
    Object.assign($, t);
  },
  open() {
    K.open("todoist");
  },
  close() {
    return K.close("todoist");
  },
  minimize() {
    K.minimize("todoist");
  },
  refresh() {
    Te.loadWorkspace(void 0, void 0, !0);
  },
  // Compatibility bridge only; there is no remote order-save implementation.
  save() {
    this.dispatch("save");
  },
  toggleCalendar() {
    $.isCalendarOpen = !$.isCalendarOpen, this.dispatch("toggle-calendar", { isOpen: $.isCalendarOpen });
  },
  toggleLabelPopover() {
    $.isLabelPopoverOpen = !$.isLabelPopoverOpen;
  },
  onAction(t) {
    return ce.add(t), () => {
      ce.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of ce) o(t, e);
  }
}, Ye = R({ visible: !1, active: !1 }), de = R({
  get isOpen() {
    return Ye.visible;
  },
  title: "任务日历",
  summary: "Todoist 截止日期",
  statusText: "",
  isLoading: !1
});
let G;
const _ = {
  get state() {
    return de;
  },
  get ready() {
    return !!G && Ye.active;
  },
  attach(t) {
    return G = t, () => {
      G === t && (G = void 0);
    };
  },
  updateState(t) {
    Object.assign(de, t);
  },
  open() {
    K.open("calendar");
  },
  close() {
    K.close("calendar");
  },
  refresh() {
    return this.ready ? G.refresh() : (this.setStatusText("请先打开日历并等待窗口就绪。"), Promise.resolve(!1));
  },
  goToday() {
    if (!this.ready) {
      this.setStatusText("请先打开日历并等待窗口就绪。");
      return;
    }
    G.goToday();
  },
  openTodoist() {
    K.open("todoist");
  },
  setStatusText(t) {
    de.statusText = t;
  }
}, Me = "todoistCalendarCacheV1", le = "googleCalendarDayLineCacheV1", ee = "googleCalendarSessionTokenV1", ue = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", Tt = [
  "calendar.month.1",
  "calendar.month.2",
  "calendar.month.3",
  "calendar.month.4",
  "calendar.month.5",
  "calendar.month.6",
  "calendar.month.7",
  "calendar.month.8",
  "calendar.month.9",
  "calendar.month.10",
  "calendar.month.11",
  "calendar.month.12"
];
function kt(t) {
  const e = Tt[t];
  return e ? te(e) : "";
}
function Re(t) {
  return typeof window.storageGet == "function" ? window.storageGet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(t, e) : e({});
  });
}
async function he(t) {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  await chrome.storage.local.set(t);
}
class Ct {
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
      const o = (await Re([le]))?.[le];
      o && Array.isArray(o.events) && (this.googleCalendars = o.calendars || [], this.googleEvents = o.events || [], this.googleSavedAt = Number(o.savedAt || 0), this.googleRangeStart = String(o.rangeStart || ""), this.googleRangeEnd = String(o.rangeEnd || ""), this.googleEvents.length > 0 && (this.isGoogleConnected = !0));
    } catch (e) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", e);
    }
    this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  initControllers() {
    q.onAction(async (e, o) => {
      if (e === "init")
        try {
          this.syncSidebarToVue();
        } catch {
          _.setStatusText("日历初始化未完成，请稍后重新打开。");
        }
      else if (e === "toggle-collapsed") {
        const s = q.state.collapsed;
        q.setCollapsed(s);
        try {
          localStorage.setItem("lw_todoist_cal_collapsed", s ? "1" : "0");
        } catch {
        }
      } else if (e === "today")
        this.goToday();
      else if (e === "prev-month")
        this.changeMonth(-1, !1);
      else if (e === "next-month")
        this.changeMonth(1, !1);
      else if (e === "prev-year")
        this.currentMonth = new Date(this.currentMonth.getFullYear() - 1, this.currentMonth.getMonth(), 1), this.publishCalendarViews();
      else if (e === "next-year")
        this.currentMonth = new Date(this.currentMonth.getFullYear() + 1, this.currentMonth.getMonth(), 1), this.publishCalendarViews();
      else if (e === "select-date")
        this.selectedDate = o, this.publishCalendarViews();
      else if (e === "drop-task") {
        const { taskId: s, date: i } = o;
        this.highlightDrop(""), await this.assignTaskToDate(s, i);
      }
    });
  }
  dateKey(e) {
    const o = e.getFullYear(), s = String(e.getMonth() + 1).padStart(2, "0"), i = String(e.getDate()).padStart(2, "0");
    return `${o}-${s}-${i}`;
  }
  friendlyDate(e) {
    const o = /* @__PURE__ */ new Date(`${e}T00:00:00`);
    return Number.isFinite(o.getTime()) ? o.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" }) : e;
  }
  async loadGoogleCalendarClientId() {
    const e = await Re(["gmailOAuthClientId"]);
    let o = String(e.gmailOAuthClientId || "").trim();
    if (!o && typeof chrome < "u" && chrome.runtime?.getURL)
      try {
        const s = await fetch(chrome.runtime.getURL("gmail-oauth-client.local.json"), { cache: "no-store" });
        if (s.ok) {
          const i = await s.json();
          o = String(i.clientId || "").trim();
        }
      } catch {
      }
    return o;
  }
  async googleCalendarToken(e = !1) {
    if (typeof chrome > "u" || !chrome.storage?.local) return "";
    const s = (await chrome.storage.local.get(ee))[ee];
    if (s?.token && s.scope === ue && Number(s.expiresAt || 0) > Date.now() + 3e4)
      return s.token;
    const i = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(i))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const a = new URL("https://accounts.google.com/o/oauth2/v2/auth"), n = crypto.randomUUID();
    a.searchParams.set("client_id", i), a.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), a.searchParams.set("response_type", "token"), a.searchParams.set("scope", ue), a.searchParams.set("include_granted_scopes", "true"), a.searchParams.set("prompt", e ? "consent" : "none"), a.searchParams.set("state", n);
    const c = await chrome.identity.launchWebAuthFlow({ url: a.href, interactive: e });
    if (!c) throw new Error(e ? "Google 授权已取消" : "Google 日历尚未连接");
    const r = new URLSearchParams(new URL(c).hash.replace(/^#/, ""));
    if (r.get("state") !== n) throw new Error("Google 授权状态校验失败");
    if (r.get("error")) throw new Error(r.get("error_description") || r.get("error") || "");
    const u = r.get("access_token");
    if (!u) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [ee]: {
        token: u,
        scope: ue,
        expiresAt: Date.now() + Math.max(300, Number(r.get("expires_in") || 3600)) * 1e3
      }
    }), u;
  }
  async googleCalendarApi(e, o = {}, s = !1) {
    const i = await this.googleCalendarToken(s);
    if (!i) return null;
    const a = await fetch(`https://www.googleapis.com/calendar/v3${e}`, {
      ...o,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${i}`,
        Accept: "application/json",
        ...o.body ? { "Content-Type": "application/json" } : {},
        ...o.headers || {}
      }
    });
    if (a.status === 401 && typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(ee), !a.ok) {
      const n = await a.json().catch(() => ({}));
      throw new Error(n?.error?.message || `Google Calendar API ${a.status}`);
    }
    return a.status === 204 ? null : a.json();
  }
  visibleMonthRange() {
    const e = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1), o = (e.getDay() + 6) % 7, s = new Date(e);
    s.setDate(e.getDate() - o), s.setHours(0, 0, 0, 0);
    const i = new Date(s);
    return i.setDate(s.getDate() + 42), { start: s, end: i, startKey: this.dateKey(s), endKey: this.dateKey(i) };
  }
  async loadGoogleCalendarRange(e = !1, o = !1) {
    if (this.isGoogleLoading)
      return await new Promise((a) => this.googleWaiters.push(a)), o && !this.isGoogleConnected ? this.loadGoogleCalendarRange(e, !0) : this.isGoogleConnected;
    const s = this.visibleMonthRange();
    if (!e && this.isGoogleConnected && Date.now() - this.googleSavedAt < 15 * 6e4)
      return !0;
    this.isGoogleLoading = !0, this.googleLastError = null;
    let i = !1;
    try {
      if (!await this.googleCalendarToken(o)) throw new Error("Google 日历未授权");
      const c = ((await this.googleCalendarApi(
        "/users/me/calendarList?showDeleted=false&showHidden=false&maxResults=250"
      ))?.items || []).filter(
        (u) => u.selected !== !1 && u.accessRole !== "freeBusyReader"
      ), r = [];
      for (const u of c)
        try {
          const m = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: s.start.toISOString(),
            timeMax: s.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(u.id)}/events?${m}`))?.items || []).forEach((v) => {
            r.push({
              ...v,
              _calendarId: u.id,
              _calendarName: u.summary || "Google 日历",
              _calendarColor: u.backgroundColor || "#2563eb",
              _calendarAccessRole: u.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = c, this.googleEvents = r, this.googleSavedAt = Date.now(), this.googleRangeStart = s.startKey, this.googleRangeEnd = s.endKey, this.isGoogleConnected = !0, await he({
        [le]: {
          calendars: this.googleCalendars,
          events: this.googleEvents,
          savedAt: this.googleSavedAt,
          rangeStart: this.googleRangeStart,
          rangeEnd: this.googleRangeEnd
        }
      }), this.publishCalendarViews(), i = !0;
    } catch (a) {
      this.googleLastError = a, this.googleEvents.length || (this.isGoogleConnected = !1), this.publishCalendarViews();
    } finally {
      this.isGoogleLoading = !1, this.googleWaiters.splice(0).forEach((a) => a());
    }
    return i;
  }
  googleEventsForDate(e) {
    return this.googleEvents.filter((o) => {
      if (!o || o.status === "cancelled") return !1;
      if (o.start?.date)
        return e >= o.start.date && e < String(o.end?.date || o.start.date);
      const s = new Date(o.start?.dateTime || ""), i = new Date(o.end?.dateTime || o.start?.dateTime || "");
      if (!Number.isFinite(s.getTime())) return !1;
      const a = /* @__PURE__ */ new Date(`${e}T00:00:00`), n = new Date(a);
      return n.setDate(a.getDate() + 1), s < n && (Number.isFinite(i.getTime()) ? i : s) > a;
    }).sort((o, s) => {
      const i = o.start?.dateTime ? new Date(o.start.dateTime).getTime() : 0, a = s.start?.dateTime ? new Date(s.start.dateTime).getTime() : 0;
      return i - a;
    });
  }
  tasksForDate(e) {
    return this.todoistTasks.filter((o) => !o || o.is_completed || !!(o.due?.is_recurring || o.due?.recurring || /every|daily|weekly|monthly|yearly|weekday|weekends|每|工作日|周期/i.test(String(o.due?.string || ""))) ? !1 : String(o.due?.date || o.due?.datetime || "").slice(0, 10) === e);
  }
  loadTodoistCalendar(e = !1, o) {
    return o?.aborted ? Promise.resolve(!1) : this.taskWrites.size ? (_.setStatusText("截止日期正在提交，未开始刷新。"), Promise.resolve(!1)) : !o && this.todoistLoad ? this.todoistLoad : !e && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 6e4 ? (this.publishCalendarViews(), Promise.resolve(!0)) : o ? this.readTodoistCalendar(o) : (this.todoistLoad = this.readTodoistCalendar().finally(() => {
      this.todoistLoad = null;
    }), this.todoistLoad);
  }
  async readTodoistCalendar(e) {
    const o = this.taskRevision, s = ++this.taskReadSequence, i = () => !e?.aborted && s === this.taskReadSequence && o === this.taskRevision;
    this.isTodoistLoading = !0, _.updateState({ isLoading: !0, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService: a } = await import("./todoist.service-Ct-3lsf4.js").then((c) => c.e);
      if (!i()) return !1;
      const n = await a.listCalendarTasks(e);
      if (!i()) return !1;
      if (!Array.isArray(n)) throw new Error("任务返回格式无效");
      this.todoistTasks = n, this.todoistSavedAt = Date.now();
      try {
        await he({
          [Me]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
        });
      } catch {
        return i() && _.setStatusText("任务已读取，但本地缓存保存失败。"), !1;
      }
      return i() && _.setStatusText("任务已刷新。"), i();
    } catch {
      return i() && _.setStatusText("任务读取失败，请检查 Todoist 连接；原列表已保留。"), !1;
    } finally {
      s === this.taskReadSequence && (this.isTodoistLoading = !1, _.updateState({ isLoading: !1 })), i() && this.publishCalendarViews();
    }
  }
  async assignTaskToDate(e, o) {
    const s = String(e || "").trim(), i = /* @__PURE__ */ new Date(o + "T00:00:00Z");
    return !s || !/^\d{4}-\d{2}-\d{2}$/.test(o) || !Number.isFinite(i.getTime()) || i.toISOString().slice(0, 10) !== o ? (_.setStatusText("任务或截止日期无效，未提交。"), null) : this.taskWrites.has(s) ? (_.setStatusText("此任务正在提交，请等待结果；未重复发送。"), null) : (this.taskWrites.add(s), ++this.taskRevision, se(async () => {
      try {
        const { todoistService: a } = await import("./todoist.service-Ct-3lsf4.js").then((r) => r.e), n = await a.setTaskDueDate(s, o);
        if (!n || String(n.id) !== s) throw new Error("任务更新结果未确认");
        const c = this.todoistTasks.findIndex((r) => String(r.id) === s);
        c >= 0 ? this.todoistTasks[c] = n : this.todoistTasks.push(n), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await he({
            [Me]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), _.setStatusText("Todoist 截止日期已更新。");
        } catch {
          _.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return n;
      } catch {
        return _.setStatusText("截止日期更新未确认；请核对 Todoist，未自动重试。"), null;
      } finally {
        ++this.taskRevision, this.taskWrites.delete(s);
      }
    }));
  }
  selectDate(e) {
    this.selectedDate === e ? this.selectedDate = "" : this.selectedDate = e, this.publishCalendarViews();
  }
  changeMonth(e, o = !0) {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + e, 1), this.selectedDate = "", this.publishCalendarViews(), o && this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  goToday() {
    const e = /* @__PURE__ */ new Date();
    this.currentMonth = new Date(e.getFullYear(), e.getMonth(), 1), this.selectedDate = this.dateKey(e), this.publishCalendarViews();
  }
  closeDetail() {
    this.selectedDate = "", this.publishCalendarViews();
  }
  highlightDrop(e) {
    this.dropDate = String(e || ""), je.setDropDate(this.dropDate);
  }
  openTask(e, o = !1) {
    const s = this.todoistTasks.find((i) => String(i.id) === String(e));
    s && (o ? window.open(s.url || `https://app.todoist.com/app/task/${s.id}`, "_blank", "noopener,noreferrer") : Ze(String(s.id)));
  }
  publishCalendarViews() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, a = new Date(e, o, 1 - i), n = this.dateKey(/* @__PURE__ */ new Date()), c = [];
    for (let l = 0; l < 42; l++) {
      const w = new Date(a);
      w.setDate(a.getDate() + l);
      const g = this.dateKey(w), S = this.tasksForDate(g), b = (this.isGoogleConnected ? this.googleEventsForDate(g) : []).length, O = S.length > 0 || b > 0;
      c.push({
        date: g,
        day: w.getDate(),
        taskCount: S.length,
        outside: w.getMonth() !== o,
        today: g === n,
        selected: g === this.selectedDate,
        hasDot: O,
        title: b || S.length ? `${this.friendlyDate(g)} · ${b} 项日程${S.length ? ` · ${S.length} 个任务` : ""}` : `${this.friendlyDate(g)} · 拖入任务设置截止日期`
      });
    }
    const r = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], u = `${this.todoistTasks.filter((l) => l.due?.date && !l.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, m = this.selectedDate || n, v = (this.isGoogleConnected ? this.googleEventsForDate(m) : []).map((l) => ({
      id: l.id || String(Math.random()),
      time: l.start?.date ? "全天" : new Date(l.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: l.summary || "（无标题）",
      subtitle: l.location || l._calendarName || "Google 日历",
      htmlLink: l.htmlLink || "",
      color: l._calendarColor || "var(--accent)"
    }));
    v.sort((l, w) => {
      const g = (l.time || "").replace(/[^\d:]/g, ""), S = (w.time || "").replace(/[^\d:]/g, "");
      return g.localeCompare(S);
    }), je.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: u,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${v.length ? `${v.length} 项日程 · ` : ""}${r.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: c,
      detailTasks: r.map((l) => ({
        id: String(l.id),
        content: String(l.content || "未命名任务"),
        description: String(l.description || ""),
        labels: Array.isArray(l.labels) ? l.labels.map(String) : [],
        priority: Number(l.priority || 1),
        url: String(l.url || `https://app.todoist.com/app/task/${l.id}`)
      })),
      detailEvents: v
    }), _.updateState({ summary: u }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, a = this.dateKey(/* @__PURE__ */ new Date()), n = this.selectedDate || a, c = Array.from({ length: 42 }, (r, u) => {
      const m = new Date(e, o, 1 - i + u), h = this.dateKey(m);
      return {
        date: h,
        dayNumber: m.getDate(),
        isOutside: m.getMonth() !== o,
        isToday: h === a,
        isSelected: h === n,
        itemCount: 0,
        title: h,
        hasDot: !1
      };
    });
    q.updateState({
      badgeText: "Todoist",
      monthLabel: kt(o),
      yearLabel: String(e),
      cells: c,
      selectedDate: n
    });
  }
}
const Ot = new Ct();
export {
  je as a,
  Mt as b,
  Ot as c,
  q as d,
  Te as e,
  _ as f,
  Rt as g,
  $ as h,
  Et as i,
  ne as j,
  d as k,
  y as l,
  F as m,
  ut as n,
  xt as t
};
