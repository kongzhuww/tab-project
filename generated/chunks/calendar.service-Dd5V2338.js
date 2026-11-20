import { t as C, w as ee } from "./module-state-C_zTFjJe.js";
import { t as h, p as Ve, a as ue, c as ve, i as je, b as ze } from "./todoist.service-CkwQK9QD.js";
import { r as E, a as Ke } from "./vendor-vue-BbmU9NUg.js";
import { w as N } from "./window-manager.store-D9RSYghK.js";
import { t as X } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
import { openTodoistTask as Ye } from "./task-navigation-CdFHuF0W.js";
const G = E({
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
let x = {}, xe = !1;
function qe(t) {
  Object.assign(G, t, {
    cells: t.cells ? [...t.cells] : G.cells,
    detailTasks: t.detailTasks ? [...t.detailTasks] : G.detailTasks,
    detailEvents: t.detailEvents ? [...t.detailEvents] : G.detailEvents
  });
}
function Ue(t) {
  x = Object.freeze({ ...t });
}
function He(t) {
  const e = Object.freeze({ ...t });
  return x = e, () => {
    x === e && (x = {});
  };
}
function Be(t) {
  xe = t;
}
function Ae(t) {
  G.dropDate = String(t || "");
}
function Je(t) {
  x.selectDate?.(t);
}
function Ze() {
  x.previousMonth?.();
}
function Qe() {
  x.nextMonth?.();
}
function Xe() {
  x.goToday?.();
}
function et() {
  x.closeDetail?.();
}
async function tt(t, e) {
  await x.dropTask?.(t, e);
}
function st(t, e = !1) {
  x.openTask?.(t, e);
}
function ot(t) {
  Ae(t), x.highlightDrop?.(t);
}
const Ce = Object.freeze({
  update: qe,
  setActions: Ue,
  attachActions: He,
  setMounted: Be,
  setDropDate: Ae,
  selectDate: Je,
  previousMonth: Ze,
  nextMonth: Qe,
  goToday: Xe,
  closeDetail: et,
  dropTask: tt,
  openTask: st,
  highlightDrop: ot,
  get snapshot() {
    return G;
  },
  get active() {
    return xe;
  }
}), it = E({ labels: [] });
let Le = {}, Me = !1, he = 0, Y;
function nt() {
  he++, Y?.abort(), Y = void 0;
}
function Ee(t) {
  it.labels = t.map((e) => ({ ...e }));
}
async function at() {
  if (!C.active) return;
  nt();
  const t = new AbortController();
  Y = t;
  const e = he, o = C.session;
  try {
    const s = await h.getLabels(t.signal);
    !t.signal.aborted && e === he && o === C.session && C.active && Array.isArray(s) && Ee(s.map((i) => ({ id: i.id, name: i.name })));
  } catch {
    t.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    Y === t && (Y = void 0);
  }
}
function rt(t) {
  Le = Object.freeze({ ...t });
}
function ct(t) {
  Me = t;
}
function dt(t, e) {
  Le.startDrag?.(t, e);
}
const Ct = Object.freeze({
  update: Ee,
  refresh: at,
  setActions: rt,
  setMounted: ct,
  startDrag: dt,
  get active() {
    return Me;
  }
}), d = E({
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
}), oe = /* @__PURE__ */ new Set();
let ge = 0, q;
function ie() {
  ge++, q?.abort(), q = void 0, d.loading = !1;
}
const Se = {
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
    return oe.add(t), () => {
      oe.delete(t);
    };
  },
  async loadWorkspace(t, e, o = !1) {
    if (!C.active) return;
    if (d.movingTaskId) {
      d.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    ie();
    const s = new AbortController();
    q = s;
    const i = C.session, n = ge, a = () => !s.signal.aborted && C.active && i === C.session && n === ge, c = t || d.view || typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox", r = e || (c === "projects" ? d.activeProjectId || h.getActiveProjectId() : void 0), l = c !== d.view || c === "projects" && r !== d.activeProjectId;
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
    const p = (v) => {
      if (!a()) return;
      const u = ve(), D = {
        ...v,
        projects: v.projects.map((f) => ({ ...f })),
        availableLabels: [...v.availableLabels || []],
        columns: v.columns.map((f) => ({
          ...f,
          _groupRaw: f._groupRaw ? { ...f._groupRaw } : void 0,
          tasks: f.tasks.map((w) => ({
            ...w,
            startDate: u(w.id, w.description),
            labels: w.labels ? [...w.labels] : void 0,
            _taskRaw: w._taskRaw ? {
              ...w._taskRaw,
              labels: [...w._taskRaw.labels || []],
              due: w._taskRaw.due ? { ...w._taskRaw.due } : null
            } : void 0
          }))
        }))
      };
      d.moveNeedsRefresh = !1, !d.movingTaskId && d.moveError && (d.moveMessage = "", d.moveError = !1), this.updateState({
        ...D,
        view: c,
        loading: !1,
        emptyText: D.readWarning || (D.columns.length ? "" : "暂无待办任务")
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: c === "projects" ? "项目" : c === "today" ? "今天" : "收件箱"
      });
    }, g = o ? null : h.getFastSnapshot(c, r);
    g && g.columns && g.columns.length > 0 ? p(g) : l && !d.columns.length ? (this.updateState({ columns: [], emptyText: "", activeProjectId: r || "" }), this.setLoading(!0)) : d.columns.length || this.setLoading(!0);
    try {
      if (await h.initToken(), !a()) return;
      if (d.accountConfigured = !!h.getToken().trim(), !d.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      if (!g && !o) {
        const u = await h.getCachedWorkspaceData(c, r);
        if (!a()) return;
        u && Array.isArray(u.columns) && u.columns.length > 0 && (p(u), this.setLoading(!1));
      }
      const v = await h.loadWorkspaceData(c, r, o, s.signal);
      p(v);
    } catch (v) {
      a() && (this.setLoading(!1), this.updateState({ emptyText: ue(v) }));
    } finally {
      q === s && (q = void 0);
    }
  },
  async moveTask(t, e, o) {
    const s = d, i = (m) => (s.moveMessage = m, s.moveError = !0, !1);
    if (!C.active || s.movingTaskId) return !1;
    if (s.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const n = s.columns.find((m) => m.tasks.some((k) => k.id === t)), a = n?.tasks.find((m) => m.id === t);
    if (!n || !a || a.completed || t.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (o === t) return !0;
    const c = s.view, r = s.activeProjectId, l = s.columns, p = n.tasks.indexOf(a), g = n.tasks[p + 1]?.id, v = n.tasks[p - 1]?.id, u = {
      dueDate: a.dueDate,
      dueText: a.dueText,
      dueString: a.dueString,
      isDueToday: a.isDueToday,
      isOverdue: a.isOverdue
    }, D = c === "today", f = D && !e.projectId;
    if (e.dueDate && (!D || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !f) return i("目标项目未就绪，未提交移动。");
    const w = e.dueDate ? s.columns.find((m) => m.sectionId === "today") : f ? s.columns.find((m) => m.sectionId === e.sectionId) : s.columns.find((m) => m.projectId === e.projectId && m.sectionId === e.sectionId), T = e.dueDate ? n.sectionId !== "today" : !f && (String(a._taskRaw?.project_id || n.projectId || "") !== e.projectId || String(a._taskRaw?.section_id || n.sectionId || "") !== e.sectionId);
    if (!T && n === w && o === void 0 && n.tasks[n.tasks.length - 1]?.id === t) return !0;
    if (f && e.sectionId === "overdue" && n.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const b = o ? w?.tasks.find((m) => m.id === o) : void 0;
    if (f && !w || o && !b)
      return i("目标板块或任务已改变，请重新拖动。");
    const R = T && !f ? "" : String(a._taskRaw?.parent_id || ""), De = e.projectId || String(a._taskRaw?.project_id || n.projectId || ""), Ne = e.projectId ? e.sectionId : String(a._taskRaw?.section_id || "");
    if (b && !D && String(b._taskRaw?.parent_id || "") !== R)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const Te = (w?.tasks || []).filter((m) => m.id !== t && (D || String(m._taskRaw?.parent_id || "") === R)), ke = b ? Te.findIndex((m) => m.id === b.id) + 1 : Te.length + 1;
    if (w && ke < 1) return i("目标任务位置已改变，请重试拖动。");
    s.movingTaskId = t, s.moveMessage = "位置已在本页移动，正在后台保存…", s.moveError = !1, ie(), h.invalidateWorkspaceSnapshots();
    let te = !1, A, B = !1, J = !1;
    const ye = () => l === s.columns && c === s.view && r === s.activeProjectId, se = (m) => {
      if (!ye()) return !1;
      const k = s.columns.find((S) => S.tasks.some((L) => L.id === t)), I = k?.tasks.find((S) => S.id === t) || (B && J ? a : void 0);
      if (!I) return !1;
      let j = e.dueDate ? s.columns.find((S) => S.sectionId === "today") : f ? s.columns.find((S) => S.sectionId === e.sectionId) : s.columns.find((S) => S.projectId === e.projectId && S.sectionId === e.sectionId);
      const Z = !j && D && !f;
      if (Z && (j = n), !j && f) return !1;
      if (k && k.tasks.splice(k.tasks.indexOf(I), 1), A) {
        const S = { ...I._taskRaw };
        for (const L of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(A, L) && (S[L] = A[L]);
        I._taskRaw = S;
      }
      if (e.dueDate && (I.dueDate = A?.due?.date || e.dueDate, I.dueText = "今天", I.dueString = A?.due?.string || e.dueDate, I.isDueToday = !0, I.isOverdue = !1), j) {
        const S = Z ? Math.min(p, j.tasks.length) : m && o ? j.tasks.findIndex((L) => L.id === o) : -1;
        j.tasks.splice(S < 0 ? j.tasks.length : S, 0, I);
      }
      return J = !j, !0;
    }, Fe = () => {
      if (!B || !ye() || !s.columns.includes(n)) return !1;
      const m = s.columns.find((S) => S.tasks.some((L) => L.id === t)), k = m?.tasks.find((S) => S.id === t) || (J ? a : void 0);
      if (!k) return !1;
      m && m.tasks.splice(m.tasks.indexOf(k), 1);
      const I = g ? n.tasks.findIndex((S) => S.id === g) : -1, j = v ? n.tasks.findIndex((S) => S.id === v) : -1, Z = I >= 0 ? I : j >= 0 ? j + 1 : Math.min(p, n.tasks.length);
      return n.tasks.splice(Z, 0, k), e.dueDate && k.dueDate === e.dueDate && k.dueText === "今天" && k.dueString === e.dueDate && k.isDueToday && !k.isOverdue && Object.assign(k, u), J = !1, !0;
    };
    try {
      return await ee(async () => {
        try {
          if (B = se(!0), !B) throw new Error("看板已改变");
          if (T) {
            if (A = e.dueDate ? await h.setTaskDueDate(t, e.dueDate) : await h.moveTask(t, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(A?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            te = !0;
          }
          if (w && (!T || o)) {
            const k = await h.reorderTask(t, ke, D);
            if (De && String(k.project_id) !== De || String(k.section_id || "") !== Ne || String(k.parent_id || "") !== R)
              throw te = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            A = { ...A, ...k };
          }
          const m = se(!0);
          return s.moveMessage = m ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (s.moveNeedsRefresh = !0, te)
            return se(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const m = Fe();
          return i(m ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。" : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
        }
      });
    } finally {
      h.invalidateWorkspaceSnapshots(), s.movingTaskId = null;
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
      s && h.createProject(s).then((i) => {
        this.loadWorkspace("projects", i?.id ? String(i.id) : void 0);
      }).catch((i) => console.error("[Todoist] Create project error:", i));
    } else if (t === "rename-project-submit") {
      const s = String(e?.projectId || ""), i = String(e?.newName || "").trim();
      s && i && h.renameProject(s, i).then(() => {
        this.loadWorkspace("projects", s);
      }).catch((n) => console.error("[Todoist] Rename project error:", n));
    } else if (t === "delete-project-submit") {
      const s = String(e?.projectId || e || "");
      s && h.deleteProject(s).then(() => {
        this.loadWorkspace("projects");
      }).catch((i) => console.error("[Todoist] Delete project error:", i));
    } else if (t === "add-section-submit") {
      const s = String(typeof e == "string" ? e : e?.name || "").trim(), i = String(
        (typeof e == "object" && e?.projectId ? e.projectId : "") || d.activeProjectId || d.columns.find((n) => n.projectId)?.projectId || h.getActiveProjectId() || ""
      );
      s && i && h.createSection(s, i).then(() => {
        this.loadWorkspace(d.view, i, !0);
      }).catch((n) => console.error("[Todoist] Create section error:", n));
    } else if (t === "rename-section") {
      const s = String(e?.sectionId || ""), i = String(e?.newName || "").trim();
      if (i)
        if (s)
          h.renameSection(s, i).then(() => {
            this.loadWorkspace(d.view, d.activeProjectId, !0);
          }).catch((n) => console.error("[Todoist] Rename section error:", n));
        else {
          h.setDefaultSectionName(i);
          const n = d.columns.find((a) => !a.sectionId);
          n && (n.title = i), this.loadWorkspace(d.view, d.activeProjectId, !0);
        }
    } else if (t === "delete-section") {
      const s = String(e?.sectionId || e || "");
      if (s) {
        const i = d.columns.findIndex((a) => String(a.sectionId) === s);
        let n;
        i !== -1 && (n = d.columns[i], d.columns.splice(i, 1)), h.deleteSection(s).then(() => {
          this.loadWorkspace(d.view, d.activeProjectId, !0);
        }).catch((a) => {
          console.error("[Todoist] Delete section error:", a), n && i !== -1 && d.columns.splice(i, 0, n), d.moveError = !0, d.moveMessage = `删除板块失败: ${a?.message || "网络请求异常"}`, typeof window < "u" && window.LogicWeaverNotifications?.error?.("Todoist", `删除板块失败: ${a?.message || "网络或权限错误"}`);
        });
      }
    } else if (t === "add-task-submit") {
      let s = String(e?.content || "").trim();
      const i = e?.view || d.view || "inbox";
      let n = e?.projectId || e?.group?.projectId || void 0, a = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, c = e?.dueDate, r = e?.dueText, l = e?.dueString;
      if (!c && !l && s) {
        const g = Ve(s);
        g && (c = g.date, r = g.label + (g.time ? ` ${g.time}` : ""), l = g.time ? `${g.date} ${g.time}` : g.date, s = g.cleanTitle || s);
      }
      i === "projects" ? n || (n = d.activeProjectId || void 0) : i === "today" && !c && !l && (l = "today", c = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), r = "今天");
      const p = a || void 0;
      if (s) {
        const g = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, v = {
          id: g,
          content: s,
          completed: !1,
          priority: 1,
          labels: [],
          dueDate: c || "",
          dueText: r || (c ? c.slice(5) : l === "today" ? "今天" : ""),
          dueString: l || c || "",
          isOverdue: !1
        };
        let u = d.columns.find((T) => !!(e?.group && T === e.group || a !== void 0 && T.sectionId === a));
        !u && d.columns.length > 0 && (u = d.columns[0]), u && u.tasks.push(v);
        const D = Array.isArray(e?.attachments) ? e.attachments : [];
        D.length > 0 && (v.description = D.map((T) => `![${T.file_name}](${T.file_url})`).join(`

`));
        const f = {
          content: s,
          project_id: n,
          section_id: p
        };
        return c ? f.due_date = c : l && (f.due_string = l), (D.length > 0 ? h.createTaskWithAttachments({
          ...f,
          attachments: D
        }) : h.createTask(f)).then((T) => {
          if (T && T.id) {
            v.id = String(T.id), v._taskRaw = T, T.url && (v.url = T.url);
            try {
              h.updateLocalCacheOnTaskCreated(T, i, n, u?.sectionId);
            } catch {
            }
          }
          return !0;
        }).catch((T) => {
          if (console.error("[Todoist] Create task error:", T), u) {
            const b = u.tasks.findIndex((R) => R.id === g);
            b >= 0 && u.tasks.splice(b, 1);
          }
          return typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。"), !1;
        });
      }
    } else if (t === "toggle-task") {
      const s = String(e?.taskId || e?.task?.id || e?.id || e || "");
      for (const i of d.columns) {
        const n = i.tasks.findIndex((a) => String(a.id) === s);
        if (n >= 0) {
          const a = i.tasks[n], c = !a.completed;
          ie(), h.invalidateWorkspaceSnapshots(), a.completed = c, c && i.tasks.splice(n, 1), ee(async () => {
            const { todoistCalendarSidebarController: r } = await Promise.resolve().then(() => be);
            r.recordTaskCompletion(a, c), h.getToken() && await h.toggleTaskCompletion(s, c);
          }).catch(async () => {
            a.completed = !c, c && d.columns.includes(i) && !i.tasks.some((l) => l.id === s) && i.tasks.splice(Math.min(n, i.tasks.length), 0, a);
            const { todoistCalendarSidebarController: r } = await Promise.resolve().then(() => be);
            r.recordTaskCompletion(a, !c), d.emptyText = "任务完成状态保存失败，请重试。";
          });
          break;
        }
      }
    } else if (t === "update-task-title") {
      const s = String(e?.taskId || e?.task?.id || e?.id || ""), i = String(e?.content !== void 0 ? e.content : e?.newContent || "");
      for (const n of d.columns) {
        const a = n.tasks.find((c) => String(c.id) === s);
        if (a && i) {
          a.content = i, h.getToken() && h.updateTask(s, { content: i });
          break;
        }
      }
    } else if (t === "update-task-desc") {
      const s = String(e?.taskId || ""), i = String(e?.description || "");
      for (const n of d.columns) {
        const a = n.tasks.find((c) => String(c.id) === s);
        if (a) {
          a.description = i, h.getToken() && h.updateTask(s, { description: i });
          break;
        }
      }
    } else if (t === "delete-task-submit") {
      const s = String(e?.taskId || e || "");
      for (const i of d.columns) {
        const n = i.tasks.findIndex((a) => String(a.id) === s);
        if (n !== -1) {
          i.tasks.splice(n, 1), h.getToken() && h.deleteTask(s);
          break;
        }
      }
    }
    for (const s of oe)
      try {
        s(t, e);
      } catch (i) {
        console.error(`[TodoistTaskList] Handler error for action ${t}:`, i);
      }
  }
}, lt = typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox", Re = E({ view: lt });
let fe = {}, Oe = !1;
function $e(t) {
  if (Re.view = t, typeof localStorage < "u")
    try {
      localStorage.setItem("todoist_last_active_view", t);
    } catch {
    }
}
function ut(t) {
  fe = Object.freeze({ ...t });
}
function ht(t) {
  Oe = t;
}
async function gt(t) {
  $e(t), await Se.loadWorkspace(t), fe.switchView && await fe.switchView(t);
}
const bt = Ke(Re), It = Object.freeze({
  update: $e,
  setActions: ut,
  setMounted: ht,
  switchView: gt,
  get active() {
    return Oe;
  }
});
function F(t = /* @__PURE__ */ new Date()) {
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const Pe = "todoist_local_completed_tasks_v1";
function We() {
  try {
    const t = JSON.parse(localStorage.getItem(Pe) || "{}");
    return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).filter(([, e]) => e && typeof e == "object" && typeof e.id == "string" && typeof e.content == "string"));
  } catch {
    return {};
  }
}
function ft(t) {
  localStorage.setItem(Pe, JSON.stringify(t));
}
function me(t) {
  const e = t.completedAt || t.completed_at || t.completed_date, o = new Date(e || "");
  return Number.isFinite(o.getTime()) ? F(o) : "";
}
function pe(t, e = ve()) {
  const o = t._taskRaw || t.raw || t, s = String(t.task_id || t.id), i = t.description || o.description || "", n = t.startDate || e(s, i), a = o.due?.datetime || o.due?.date || t.dueDate || "";
  let c = ze(n || a);
  if (!n && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(a)) {
    const r = new Date(a);
    Number.isFinite(r.getTime()) && (c = {
      date: F(r),
      time: `${String(r.getHours()).padStart(2, "0")}:${String(r.getMinutes()).padStart(2, "0")}`
    });
  }
  return {
    id: s,
    content: t.content || "未命名任务",
    completed: typeof t.completed == "boolean" ? t.completed : je(t),
    priority: t.priority || 1,
    labels: t.labels || [],
    raw: o,
    scheduledDate: c.date,
    time: c.time,
    dueText: o.due?.string || o.due?.date || "",
    thumbUrl: i.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let $ = [], V = 0;
const M = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Set(), y = E({
  collapsed: !1,
  selectedDate: F(),
  badgeText: "Todoist",
  monthLabel: "",
  yearLabel: "",
  cells: [],
  agendaTitle: "",
  todoItems: [],
  todoLoading: !1,
  emptyText: "",
  writeError: ""
}), ne = /* @__PURE__ */ new Set();
let we = 0, H;
function W() {
  we++, H?.abort(), H = void 0, y.todoLoading = !1;
}
function z() {
  const t = y, e = ve(), o = $.filter((r) => !je(r)).map((r) => pe(r, e)), s = t.selectedDate, i = new Map(t.todoItems.map((r, l) => [r.id, l])), n = Object.values(We()).filter((r) => !U.has(r.id)), a = /* @__PURE__ */ new Map();
  for (const r of [...M.get(s)?.items || [], ...n])
    !U.has(r.id) && (r.scheduledDate || me(r)) === s && a.set(r.id, r);
  for (const r of o) r.scheduledDate === s && a.set(r.id, r);
  t.todoItems = [...a.values()].sort((r, l) => {
    const p = i.get(r.id), g = i.get(l.id);
    return p !== void 0 && g !== void 0 ? p - g : p !== void 0 ? -1 : g !== void 0 ? 1 : (r.time || "").localeCompare(l.time || "");
  }), t.agendaTitle = s === F() ? X("todoist.calendar.todayTasks") : X("todoist.calendar.dateTasks", { date: s });
  const c = /* @__PURE__ */ new Map();
  for (const r of [...Array.from(M.values()).flatMap((l) => l.items), ...n, ...o]) {
    const l = r.scheduledDate || me(r);
    l && (c.has(l) || c.set(l, /* @__PURE__ */ new Set()), c.get(l).add(r.id));
  }
  for (const r of t.cells)
    r.itemCount = c.get(r.date)?.size || 0, r.hasDot = r.itemCount > 0, r.title = r.itemCount ? X("todoist.calendar.cellTaskCount", { date: r.date, count: r.itemCount }) : r.date;
}
const K = {
  state: y,
  cancelReads: W,
  invalidateReads() {
    W(), V = 0, M.clear(), U.clear();
  },
  setCollapsed(t) {
    y.collapsed = t;
  },
  toggleCollapsed() {
    this.setCollapsed(!y.collapsed), this.dispatch("toggle-collapsed", y.collapsed);
  },
  recordTaskCompletion(t, e) {
    W(), V = 0;
    const o = String(t.task_id || t.id), s = We();
    if (e) {
      U.delete(o);
      const i = pe(t);
      s[o] = { ...i, scheduledDate: t.scheduledDate || i.scheduledDate, completed: !0, completedAt: (/* @__PURE__ */ new Date()).toISOString() }, $ = $.filter((n) => String(n.id) !== o);
    } else
      U.add(o), delete s[o], $.some((i) => String(i.id) === o) || $.push({ ...t.raw || t._taskRaw || t, id: o, checked: !1, is_completed: !1, completed: !1 });
    try {
      ft(s);
    } catch {
      y.writeError = "完成状态的本机记录未保存，请核对。";
    }
    M.clear(), z();
  },
  async loadTodosForDate(t, e = !1) {
    if (!C.active || C.pendingWrites) return;
    W();
    const o = new AbortController();
    H = o;
    const s = we, i = C.session;
    t ||= F();
    const n = () => !o.signal.aborted && s === we && i === C.session && C.active && y.selectedDate === t && !C.pendingWrites;
    y.selectedDate = t, y.emptyText = "", z(), y.todoLoading = !0;
    try {
      if (e || !V || Date.now() - V > 3e4) {
        const c = await h.listCalendarTasks(o.signal);
        if (!n()) return;
        $ = c, V = Date.now(), z();
      }
      const a = M.get(t);
      if (e || !a || Date.now() - a.savedAt > 3e4) {
        const c = /* @__PURE__ */ new Date(`${t}T00:00:00`);
        c.setDate(c.getDate() + 1);
        try {
          const r = await h.getCompletedTasks({ since: (/* @__PURE__ */ new Date(`${t}T00:00:00`)).toISOString(), until: c.toISOString(), limit: 200 }, o.signal);
          if (!n()) return;
          const l = r.items.filter((p) => me(p) === t).map((p) => ({
            ...pe(p),
            completed: !0,
            completedAt: p.completed_at
          }));
          M.set(t, { items: l, savedAt: Date.now() }), M.size > 42 && M.delete(M.keys().next().value);
        } catch (r) {
          n() && (y.emptyText = "完成历史：" + ue(r) + " 现有任务保留。");
        }
      }
      n() && z();
    } catch (a) {
      n() && (y.emptyText = ue(a) + " 当前日期的已有数据保留。");
    } finally {
      n() && (y.todoLoading = !1), H === o && (H = void 0);
    }
  },
  async toggleTodoItem(t) {
    if (C.pendingWrites) return;
    const e = !t.completed;
    y.writeError = "", await ee(async () => {
      W();
      try {
        if (await h.toggleTaskCompletion(t.id, e), this.recordTaskCompletion(t, e), h.invalidateWorkspaceSnapshots(), e)
          for (const o of d.columns) o.tasks = o.tasks.filter((s) => String(s.id) !== t.id);
        else C.active && await Se.loadWorkspace(void 0, void 0, !0);
      } catch {
        y.writeError = "完成状态保存未确认，请刷新核对；未自动重试。";
      }
    });
  },
  updateTaskTitle(t, e) {
    const o = $.find((i) => String(i.id) === String(t));
    o && (o.content = e);
    const s = y.todoItems.find((i) => i.id === String(t));
    s && (s.content = e);
  },
  updateState(t) {
    const e = y.selectedDate;
    Object.assign(y, t), z(), t.selectedDate && t.selectedDate !== e && this.loadTodosForDate(t.selectedDate);
  },
  onAction(t) {
    return ne.add(t), () => {
      ne.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of ne)
      try {
        o(t, e);
      } catch {
        y.emptyText = "日历操作未完成，请重新打开。";
      }
  }
}, be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTodoistDateReads: W,
  getLocalTodayDateStr: F,
  todoistCalendarSidebarController: K,
  todoistCalendarSidebarState: y
}, Symbol.toStringTag, { value: "Module" })), O = E({
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
}), ae = /* @__PURE__ */ new Set(), _t = {
  get state() {
    return O;
  },
  updateState(t) {
    Object.assign(O, t);
  },
  open() {
    N.open("todoist");
  },
  close() {
    return N.close("todoist");
  },
  minimize() {
    N.minimize("todoist");
  },
  refresh() {
    Se.loadWorkspace(void 0, void 0, !0);
  },
  // Compatibility bridge only; there is no remote order-save implementation.
  save() {
    this.dispatch("save");
  },
  toggleCalendar() {
    O.isCalendarOpen = !O.isCalendarOpen, this.dispatch("toggle-calendar", { isOpen: O.isCalendarOpen });
  },
  toggleLabelPopover() {
    O.isLabelPopoverOpen = !O.isLabelPopoverOpen;
  },
  onAction(t) {
    return ae.add(t), () => {
      ae.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of ae) o(t, e);
  }
}, Ge = E({ visible: !1, active: !1 }), re = E({
  get isOpen() {
    return Ge.visible;
  },
  title: "任务日历",
  summary: "Todoist 截止日期",
  statusText: "",
  isLoading: !1
});
let P;
const _ = {
  get state() {
    return re;
  },
  get ready() {
    return !!P && Ge.active;
  },
  attach(t) {
    return P = t, () => {
      P === t && (P = void 0);
    };
  },
  updateState(t) {
    Object.assign(re, t);
  },
  open() {
    N.open("calendar");
  },
  close() {
    N.close("calendar");
  },
  refresh() {
    return this.ready ? P.refresh() : (this.setStatusText("请先打开日历并等待窗口就绪。"), Promise.resolve(!1));
  },
  goToday() {
    if (!this.ready) {
      this.setStatusText("请先打开日历并等待窗口就绪。");
      return;
    }
    P.goToday();
  },
  openTodoist() {
    N.open("todoist");
  },
  setStatusText(t) {
    re.statusText = t;
  }
}, Ie = "todoistCalendarCacheV1", ce = "googleCalendarDayLineCacheV1", Q = "googleCalendarSessionTokenV1", de = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", mt = [
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
function pt(t) {
  const e = mt[t];
  return e ? X(e) : "";
}
function _e(t) {
  return typeof window.storageGet == "function" ? window.storageGet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(t, e) : e({});
  });
}
async function le(t) {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  await chrome.storage.local.set(t);
}
class wt {
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
      const o = (await _e([ce]))?.[ce];
      o && Array.isArray(o.events) && (this.googleCalendars = o.calendars || [], this.googleEvents = o.events || [], this.googleSavedAt = Number(o.savedAt || 0), this.googleRangeStart = String(o.rangeStart || ""), this.googleRangeEnd = String(o.rangeEnd || ""), this.googleEvents.length > 0 && (this.isGoogleConnected = !0));
    } catch (e) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", e);
    }
    this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  initControllers() {
    K.onAction(async (e, o) => {
      if (e === "init")
        try {
          this.syncSidebarToVue();
        } catch {
          _.setStatusText("日历初始化未完成，请稍后重新打开。");
        }
      else if (e === "toggle-collapsed") {
        const s = K.state.collapsed;
        K.setCollapsed(s);
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
    const e = await _e(["gmailOAuthClientId"]);
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
    const s = (await chrome.storage.local.get(Q))[Q];
    if (s?.token && s.scope === de && Number(s.expiresAt || 0) > Date.now() + 3e4)
      return s.token;
    const i = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(i))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const n = new URL("https://accounts.google.com/o/oauth2/v2/auth"), a = crypto.randomUUID();
    n.searchParams.set("client_id", i), n.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), n.searchParams.set("response_type", "token"), n.searchParams.set("scope", de), n.searchParams.set("include_granted_scopes", "true"), n.searchParams.set("prompt", e ? "consent" : "none"), n.searchParams.set("state", a);
    const c = await chrome.identity.launchWebAuthFlow({ url: n.href, interactive: e });
    if (!c) throw new Error(e ? "Google 授权已取消" : "Google 日历尚未连接");
    const r = new URLSearchParams(new URL(c).hash.replace(/^#/, ""));
    if (r.get("state") !== a) throw new Error("Google 授权状态校验失败");
    if (r.get("error")) throw new Error(r.get("error_description") || r.get("error") || "");
    const l = r.get("access_token");
    if (!l) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [Q]: {
        token: l,
        scope: de,
        expiresAt: Date.now() + Math.max(300, Number(r.get("expires_in") || 3600)) * 1e3
      }
    }), l;
  }
  async googleCalendarApi(e, o = {}, s = !1) {
    const i = await this.googleCalendarToken(s);
    if (!i) return null;
    const n = await fetch(`https://www.googleapis.com/calendar/v3${e}`, {
      ...o,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${i}`,
        Accept: "application/json",
        ...o.body ? { "Content-Type": "application/json" } : {},
        ...o.headers || {}
      }
    });
    if (n.status === 401 && typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(Q), !n.ok) {
      const a = await n.json().catch(() => ({}));
      throw new Error(a?.error?.message || `Google Calendar API ${n.status}`);
    }
    return n.status === 204 ? null : n.json();
  }
  visibleMonthRange() {
    const e = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1), o = (e.getDay() + 6) % 7, s = new Date(e);
    s.setDate(e.getDate() - o), s.setHours(0, 0, 0, 0);
    const i = new Date(s);
    return i.setDate(s.getDate() + 42), { start: s, end: i, startKey: this.dateKey(s), endKey: this.dateKey(i) };
  }
  async loadGoogleCalendarRange(e = !1, o = !1) {
    if (this.isGoogleLoading)
      return await new Promise((n) => this.googleWaiters.push(n)), o && !this.isGoogleConnected ? this.loadGoogleCalendarRange(e, !0) : this.isGoogleConnected;
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
        (l) => l.selected !== !1 && l.accessRole !== "freeBusyReader"
      ), r = [];
      for (const l of c)
        try {
          const p = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: s.start.toISOString(),
            timeMax: s.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(l.id)}/events?${p}`))?.items || []).forEach((v) => {
            r.push({
              ...v,
              _calendarId: l.id,
              _calendarName: l.summary || "Google 日历",
              _calendarColor: l.backgroundColor || "#2563eb",
              _calendarAccessRole: l.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = c, this.googleEvents = r, this.googleSavedAt = Date.now(), this.googleRangeStart = s.startKey, this.googleRangeEnd = s.endKey, this.isGoogleConnected = !0, await le({
        [ce]: {
          calendars: this.googleCalendars,
          events: this.googleEvents,
          savedAt: this.googleSavedAt,
          rangeStart: this.googleRangeStart,
          rangeEnd: this.googleRangeEnd
        }
      }), this.publishCalendarViews(), i = !0;
    } catch (n) {
      this.googleLastError = n, this.googleEvents.length || (this.isGoogleConnected = !1), this.publishCalendarViews();
    } finally {
      this.isGoogleLoading = !1, this.googleWaiters.splice(0).forEach((n) => n());
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
      const n = /* @__PURE__ */ new Date(`${e}T00:00:00`), a = new Date(n);
      return a.setDate(n.getDate() + 1), s < a && (Number.isFinite(i.getTime()) ? i : s) > n;
    }).sort((o, s) => {
      const i = o.start?.dateTime ? new Date(o.start.dateTime).getTime() : 0, n = s.start?.dateTime ? new Date(s.start.dateTime).getTime() : 0;
      return i - n;
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
      const { todoistService: n } = await import("./todoist.service-CkwQK9QD.js").then((c) => c.e);
      if (!i()) return !1;
      const a = await n.listCalendarTasks(e);
      if (!i()) return !1;
      if (!Array.isArray(a)) throw new Error("任务返回格式无效");
      this.todoistTasks = a, this.todoistSavedAt = Date.now();
      try {
        await le({
          [Ie]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
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
    return !s || !/^\d{4}-\d{2}-\d{2}$/.test(o) || !Number.isFinite(i.getTime()) || i.toISOString().slice(0, 10) !== o ? (_.setStatusText("任务或截止日期无效，未提交。"), null) : this.taskWrites.has(s) ? (_.setStatusText("此任务正在提交，请等待结果；未重复发送。"), null) : (this.taskWrites.add(s), ++this.taskRevision, ee(async () => {
      try {
        const { todoistService: n } = await import("./todoist.service-CkwQK9QD.js").then((r) => r.e), a = await n.setTaskDueDate(s, o);
        if (!a || String(a.id) !== s) throw new Error("任务更新结果未确认");
        const c = this.todoistTasks.findIndex((r) => String(r.id) === s);
        c >= 0 ? this.todoistTasks[c] = a : this.todoistTasks.push(a), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await le({
            [Ie]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), _.setStatusText("Todoist 截止日期已更新。");
        } catch {
          _.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return a;
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
    this.dropDate = String(e || ""), Ce.setDropDate(this.dropDate);
  }
  openTask(e, o = !1) {
    const s = this.todoistTasks.find((i) => String(i.id) === String(e));
    s && (o ? window.open(s.url || `https://app.todoist.com/app/task/${s.id}`, "_blank", "noopener,noreferrer") : Ye(String(s.id)));
  }
  publishCalendarViews() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = new Date(e, o, 1 - i), a = this.dateKey(/* @__PURE__ */ new Date()), c = [];
    for (let u = 0; u < 42; u++) {
      const D = new Date(n);
      D.setDate(n.getDate() + u);
      const f = this.dateKey(D), w = this.tasksForDate(f), b = (this.isGoogleConnected ? this.googleEventsForDate(f) : []).length, R = w.length > 0 || b > 0;
      c.push({
        date: f,
        day: D.getDate(),
        taskCount: w.length,
        outside: D.getMonth() !== o,
        today: f === a,
        selected: f === this.selectedDate,
        hasDot: R,
        title: b || w.length ? `${this.friendlyDate(f)} · ${b} 项日程${w.length ? ` · ${w.length} 个任务` : ""}` : `${this.friendlyDate(f)} · 拖入任务设置截止日期`
      });
    }
    const r = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], l = `${this.todoistTasks.filter((u) => u.due?.date && !u.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, p = this.selectedDate || a, v = (this.isGoogleConnected ? this.googleEventsForDate(p) : []).map((u) => ({
      id: u.id || String(Math.random()),
      time: u.start?.date ? "全天" : new Date(u.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: u.summary || "（无标题）",
      subtitle: u.location || u._calendarName || "Google 日历",
      htmlLink: u.htmlLink || "",
      color: u._calendarColor || "var(--accent)"
    }));
    v.sort((u, D) => {
      const f = (u.time || "").replace(/[^\d:]/g, ""), w = (D.time || "").replace(/[^\d:]/g, "");
      return f.localeCompare(w);
    }), Ce.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: l,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${v.length ? `${v.length} 项日程 · ` : ""}${r.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: c,
      detailTasks: r.map((u) => ({
        id: String(u.id),
        content: String(u.content || "未命名任务"),
        description: String(u.description || ""),
        labels: Array.isArray(u.labels) ? u.labels.map(String) : [],
        priority: Number(u.priority || 1),
        url: String(u.url || `https://app.todoist.com/app/task/${u.id}`)
      })),
      detailEvents: v
    }), _.updateState({ summary: l }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = this.dateKey(/* @__PURE__ */ new Date()), a = this.selectedDate || n, c = Array.from({ length: 42 }, (r, l) => {
      const p = new Date(e, o, 1 - i + l), g = this.dateKey(p);
      return {
        date: g,
        dayNumber: p.getDate(),
        isOutside: p.getMonth() !== o,
        isToday: g === n,
        isSelected: g === a,
        itemCount: 0,
        title: g,
        hasDot: !1
      };
    });
    K.updateState({
      badgeText: "Todoist",
      monthLabel: pt(o),
      yearLabel: String(e),
      cells: c,
      selectedDate: a
    });
  }
}
const jt = new wt();
export {
  Ce as a,
  It as b,
  jt as c,
  K as d,
  Se as e,
  _ as f,
  _t as g,
  O as h,
  bt as i,
  ie as j,
  d as k,
  y as l,
  W as m,
  nt as n,
  Ct as t
};
