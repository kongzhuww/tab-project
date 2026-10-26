import { t as y, w as Q } from "./module-state-BT0PQSND.js";
import { t as u, c as me, i as be, p as Ge } from "./todoist.service-7bvn-_sx.js";
import { r as E, a as Ne } from "./vendor-vue-DokqDua_.js";
import { w as P } from "./window-manager.store-Dfe7fisV.js";
import { openTodoistTask as Ve } from "./task-navigation-DnsZubWl.js";
const $ = E({
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
let j = {}, Ie = !1;
function Fe(t) {
  Object.assign($, t, {
    cells: t.cells ? [...t.cells] : $.cells,
    detailTasks: t.detailTasks ? [...t.detailTasks] : $.detailTasks,
    detailEvents: t.detailEvents ? [...t.detailEvents] : $.detailEvents
  });
}
function ze(t) {
  j = Object.freeze({ ...t });
}
function Ye(t) {
  const e = Object.freeze({ ...t });
  return j = e, () => {
    j === e && (j = {});
  };
}
function He(t) {
  Ie = t;
}
function je(t) {
  $.dropDate = String(t || "");
}
function Ke(t) {
  j.selectDate?.(t);
}
function qe() {
  j.previousMonth?.();
}
function Ue() {
  j.nextMonth?.();
}
function Be() {
  j.goToday?.();
}
function Je() {
  j.closeDetail?.();
}
async function Ze(t, e) {
  await j.dropTask?.(t, e);
}
function Qe(t, e = !1) {
  j.openTask?.(t, e);
}
function Xe(t) {
  je(t), j.highlightDrop?.(t);
}
const Te = Object.freeze({
  update: Fe,
  setActions: ze,
  attachActions: Ye,
  setMounted: He,
  setDropDate: je,
  selectDate: Ke,
  previousMonth: qe,
  nextMonth: Ue,
  goToday: Be,
  closeDetail: Je,
  dropTask: Ze,
  openTask: Qe,
  highlightDrop: Xe,
  get snapshot() {
    return $;
  },
  get active() {
    return Ie;
  }
}), et = E({ labels: [] });
let _e = {}, Ae = !1, de = 0, Y;
function tt() {
  de++, Y?.abort(), Y = void 0;
}
function xe(t) {
  et.labels = t.map((e) => ({ ...e }));
}
async function st() {
  if (!y.active) return;
  tt();
  const t = new AbortController();
  Y = t;
  const e = de, o = y.session;
  try {
    const s = await u.getLabels(t.signal);
    !t.signal.aborted && e === de && o === y.session && y.active && Array.isArray(s) && xe(s.map((i) => ({ id: i.id, name: i.name })));
  } catch {
    t.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    Y === t && (Y = void 0);
  }
}
function ot(t) {
  _e = Object.freeze({ ...t });
}
function it(t) {
  Ae = t;
}
function nt(t, e) {
  _e.startDrag?.(t, e);
}
const vt = Object.freeze({
  update: xe,
  refresh: st,
  setActions: ot,
  setMounted: it,
  startDrag: nt,
  get active() {
    return Ae;
  }
}), c = E({
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
}), se = /* @__PURE__ */ new Set();
let le = 0, H;
function ke() {
  le++, H?.abort(), H = void 0, c.loading = !1;
}
const pe = {
  updateState(t) {
    Object.assign(c, t);
  },
  setLoading(t) {
    c.loading = t, t && (c.emptyText = "");
  },
  setColumns(t) {
    c.columns = [...t], t.length > 0 && (c.emptyText = "");
  },
  onAction(t) {
    return se.add(t), () => {
      se.delete(t);
    };
  },
  async loadWorkspace(t, e, o = !1) {
    if (!y.active) return;
    if (c.movingTaskId) {
      c.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    ke();
    const s = new AbortController();
    H = s;
    const i = y.session, n = le, r = () => !s.signal.aborted && y.active && i === y.session && n === le, a = t || c.view || "inbox", d = e || (a === "projects" ? c.activeProjectId || u.getActiveProjectId() : void 0), g = a !== c.view || a === "projects" && d !== c.activeProjectId;
    c.view = a, g && this.updateState({ columns: [], emptyText: "", activeProjectId: d || "" });
    const w = (S) => {
      if (!r()) return;
      const h = me(), l = {
        ...S,
        projects: S.projects.map((f) => ({ ...f })),
        availableLabels: [...S.availableLabels || []],
        columns: S.columns.map((f) => ({
          ...f,
          _groupRaw: f._groupRaw ? { ...f._groupRaw } : void 0,
          tasks: f.tasks.map((p) => ({
            ...p,
            startDate: h(p.id, p.description),
            labels: p.labels ? [...p.labels] : void 0,
            _taskRaw: p._taskRaw ? {
              ...p._taskRaw,
              labels: [...p._taskRaw.labels || []],
              due: p._taskRaw.due ? { ...p._taskRaw.due } : null
            } : void 0
          }))
        }))
      };
      c.moveNeedsRefresh = !1, !c.movingTaskId && c.moveError && (c.moveMessage = "", c.moveError = !1), this.updateState({
        ...l,
        view: a,
        loading: !1,
        emptyText: l.columns.length ? "" : "暂无待办任务"
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: a === "projects" ? "项目" : a === "today" ? "今天" : "收件箱"
      });
    }, k = c.columns.length > 0;
    this.setLoading(!k);
    try {
      if (await u.initToken(), !r()) return;
      if (c.accountConfigured = !!u.getToken().trim(), !c.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      let S = !1;
      if (!o) {
        const l = await u.getCachedWorkspaceData(a, d);
        if (!r()) return;
        l && Array.isArray(l.columns) && l.columns.length > 0 && (w(l), S = !0, this.setLoading(!1));
      }
      const h = await u.loadWorkspaceData(a, d, o, s.signal);
      w(h);
    } catch {
      r() && (this.setLoading(!1), c.columns.length || this.updateState({ emptyText: "待办读取失败，请手动刷新。" }));
    } finally {
      H === s && (H = void 0);
    }
  },
  async moveTask(t, e, o) {
    const s = c, i = (m) => (s.moveMessage = m, s.moveError = !0, !1);
    if (!y.active || s.movingTaskId) return !1;
    if (s.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const n = s.columns.find((m) => m.tasks.some((D) => D.id === t)), r = n?.tasks.find((m) => m.id === t);
    if (!n || !r || r.completed || t.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (o === t) return !0;
    const a = s.view, d = s.activeProjectId, g = s.columns, w = n.tasks.indexOf(r), k = n.tasks[w + 1]?.id, S = n.tasks[w - 1]?.id, h = {
      dueDate: r.dueDate,
      dueText: r.dueText,
      dueString: r.dueString,
      isDueToday: r.isDueToday,
      isOverdue: r.isOverdue
    }, l = a === "today", f = l && !e.projectId;
    if (e.dueDate && (!l || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !f) return i("目标项目未就绪，未提交移动。");
    const p = e.dueDate ? s.columns.find((m) => m.sectionId === "today") : f ? s.columns.find((m) => m.sectionId === e.sectionId) : s.columns.find((m) => m.projectId === e.projectId && m.sectionId === e.sectionId), G = e.dueDate ? n.sectionId !== "today" : !f && (String(r._taskRaw?.project_id || n.projectId || "") !== e.projectId || String(r._taskRaw?.section_id || n.sectionId || "") !== e.sectionId);
    if (!G && n === p && o === void 0 && n.tasks[n.tasks.length - 1]?.id === t) return !0;
    if (f && e.sectionId === "overdue" && n.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const _ = o ? p?.tasks.find((m) => m.id === o) : void 0;
    if (f && !p || o && !_)
      return i("目标板块或任务已改变，请重新拖动。");
    const N = G && !f ? "" : String(r._taskRaw?.parent_id || ""), we = e.projectId || String(r._taskRaw?.project_id || n.projectId || ""), Pe = e.projectId ? e.sectionId : String(r._taskRaw?.section_id || "");
    if (_ && !l && String(_._taskRaw?.parent_id || "") !== N)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const ve = (p?.tasks || []).filter((m) => m.id !== t && (l || String(m._taskRaw?.parent_id || "") === N)), Se = _ ? ve.findIndex((m) => m.id === _.id) + 1 : ve.length + 1;
    if (p && Se < 1) return i("目标任务位置已改变，请重试拖动。");
    s.movingTaskId = t, s.moveMessage = "位置已在本页移动，正在后台保存…", s.moveError = !1, ke(), u.invalidateWorkspaceSnapshots();
    let ee = !1, A, q = !1, U = !1;
    const De = () => g === s.columns && a === s.view && d === s.activeProjectId, te = (m) => {
      if (!De()) return !1;
      const D = s.columns.find((v) => v.tasks.some((x) => x.id === t)), C = D?.tasks.find((v) => v.id === t) || (q && U ? r : void 0);
      if (!C) return !1;
      let I = e.dueDate ? s.columns.find((v) => v.sectionId === "today") : f ? s.columns.find((v) => v.sectionId === e.sectionId) : s.columns.find((v) => v.projectId === e.projectId && v.sectionId === e.sectionId);
      const B = !I && l && !f;
      if (B && (I = n), !I && f) return !1;
      if (D && D.tasks.splice(D.tasks.indexOf(C), 1), A) {
        const v = { ...C._taskRaw };
        for (const x of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(A, x) && (v[x] = A[x]);
        C._taskRaw = v;
      }
      if (e.dueDate && (C.dueDate = A?.due?.date || e.dueDate, C.dueText = "今天", C.dueString = A?.due?.string || e.dueDate, C.isDueToday = !0, C.isOverdue = !1), I) {
        const v = B ? Math.min(w, I.tasks.length) : m && o ? I.tasks.findIndex((x) => x.id === o) : -1;
        I.tasks.splice(v < 0 ? I.tasks.length : v, 0, C);
      }
      return U = !I, !0;
    }, We = () => {
      if (!q || !De() || !s.columns.includes(n)) return !1;
      const m = s.columns.find((v) => v.tasks.some((x) => x.id === t)), D = m?.tasks.find((v) => v.id === t) || (U ? r : void 0);
      if (!D) return !1;
      m && m.tasks.splice(m.tasks.indexOf(D), 1);
      const C = k ? n.tasks.findIndex((v) => v.id === k) : -1, I = S ? n.tasks.findIndex((v) => v.id === S) : -1, B = C >= 0 ? C : I >= 0 ? I + 1 : Math.min(w, n.tasks.length);
      return n.tasks.splice(B, 0, D), e.dueDate && D.dueDate === e.dueDate && D.dueText === "今天" && D.dueString === e.dueDate && D.isDueToday && !D.isOverdue && Object.assign(D, h), U = !1, !0;
    };
    try {
      return await Q(async () => {
        try {
          if (q = te(!0), !q) throw new Error("看板已改变");
          if (G) {
            if (A = e.dueDate ? await u.setTaskDueDate(t, e.dueDate) : await u.moveTask(t, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(A?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            ee = !0;
          }
          if (p && (!G || o)) {
            const D = await u.reorderTask(t, Se, l);
            if (we && String(D.project_id) !== we || String(D.section_id || "") !== Pe || String(D.parent_id || "") !== N)
              throw ee = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            A = { ...A, ...D };
          }
          const m = te(!0);
          return s.moveMessage = m ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (s.moveNeedsRefresh = !0, ee)
            return te(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const m = We();
          return i(m ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。" : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
        }
      });
    } finally {
      u.invalidateWorkspaceSnapshots(), s.movingTaskId = null;
    }
  },
  dispatch(t, e) {
    const o = String(e?.taskId || e?.task?.id || e?.id || (typeof e == "string" ? e : ""));
    if (c.movingTaskId === o && (t.startsWith("update-task-") || t === "toggle-task" || t === "delete-task-submit"))
      return !1;
    if (t === "move-task-to-project")
      return this.moveTask(String(e?.taskId || ""), {
        projectId: String(e?.targetProjectId || ""),
        sectionId: ""
      });
    if (t === "create-task")
      c.activeComposerSectionId = c.columns[0]?.sectionId ?? "";
    else if (t === "refresh")
      this.loadWorkspace(c.view, c.activeProjectId, !0);
    else if (t === "switch-project") {
      const s = String(e?.id || e || "");
      this.loadWorkspace("projects", s);
    } else if (t === "create-project-submit") {
      const s = String(e || "").trim();
      s && u.createProject(s).then((i) => {
        this.loadWorkspace("projects", i?.id ? String(i.id) : void 0);
      }).catch((i) => console.error("[Todoist] Create project error:", i));
    } else if (t === "rename-project-submit") {
      const s = String(e?.projectId || ""), i = String(e?.newName || "").trim();
      s && i && u.renameProject(s, i).then(() => {
        this.loadWorkspace("projects", s);
      }).catch((n) => console.error("[Todoist] Rename project error:", n));
    } else if (t === "delete-project-submit") {
      const s = String(e?.projectId || e || "");
      s && u.deleteProject(s).then(() => {
        this.loadWorkspace("projects");
      }).catch((i) => console.error("[Todoist] Delete project error:", i));
    } else if (t === "add-section-submit") {
      const s = String(typeof e == "string" ? e : e?.name || "").trim(), i = String(
        (typeof e == "object" && e?.projectId ? e.projectId : "") || c.activeProjectId || c.columns.find((n) => n.projectId)?.projectId || u.getActiveProjectId() || ""
      );
      s && i && u.createSection(s, i).then(() => {
        this.loadWorkspace(c.view, i, !0);
      }).catch((n) => console.error("[Todoist] Create section error:", n));
    } else if (t === "rename-section") {
      const s = String(e?.sectionId || ""), i = String(e?.newName || "").trim();
      if (i)
        if (s)
          u.renameSection(s, i).then(() => {
            this.loadWorkspace(c.view, c.activeProjectId, !0);
          }).catch((n) => console.error("[Todoist] Rename section error:", n));
        else {
          u.setDefaultSectionName(i);
          const n = c.columns.find((r) => !r.sectionId);
          n && (n.title = i), this.loadWorkspace(c.view, c.activeProjectId, !0);
        }
    } else if (t === "delete-section") {
      const s = String(e?.sectionId || e || "");
      if (s) {
        const i = c.columns.findIndex((r) => String(r.sectionId) === s);
        let n;
        i !== -1 && (n = c.columns[i], c.columns.splice(i, 1)), u.deleteSection(s).then(() => {
          this.loadWorkspace(c.view, c.activeProjectId, !0);
        }).catch((r) => {
          console.error("[Todoist] Delete section error:", r), n && i !== -1 && c.columns.splice(i, 0, n), c.moveError = !0, c.moveMessage = `删除板块失败: ${r?.message || "网络请求异常"}`, typeof window < "u" && window.LogicWeaverNotifications?.error?.("Todoist", `删除板块失败: ${r?.message || "网络或权限错误"}`);
        });
      }
    } else if (t === "add-task-submit") {
      const s = String(e?.content || "").trim(), i = e?.view || c.view || "inbox";
      let n = e?.projectId || e?.group?.projectId || void 0, r = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, a;
      i === "projects" ? n || (n = c.activeProjectId || void 0) : i === "today" && (a = "today");
      const d = r || void 0;
      if (s) {
        const g = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, w = {
          id: g,
          content: s,
          completed: !1,
          priority: 1,
          labels: [],
          dueText: a ? "今天" : "",
          isOverdue: !1
        };
        let k = c.columns.find((l) => !!(e?.group && l === e.group || r !== void 0 && l.sectionId === r));
        !k && c.columns.length > 0 && (k = c.columns[0]), k && k.tasks.push(w);
        const S = Array.isArray(e?.attachments) ? e.attachments : [];
        return S.length > 0 && (w.description = S.map((l) => `![${l.file_name}](${l.file_url})`).join(`

`)), (S.length > 0 ? u.createTaskWithAttachments({
          content: s,
          project_id: n,
          section_id: d,
          due_string: a,
          attachments: S
        }) : u.createTask({
          content: s,
          project_id: n,
          section_id: d,
          due_string: a
        })).then((l) => {
          if (l && l.id) {
            w.id = String(l.id), w._taskRaw = l, l.url && (w.url = l.url);
            try {
              u.updateLocalCacheOnTaskCreated(l, i, n, k?.sectionId);
            } catch {
            }
          }
          return !0;
        }).catch((l) => {
          if (console.error("[Todoist] Create task error:", l), k) {
            const f = k.tasks.findIndex((p) => p.id === g);
            f >= 0 && k.tasks.splice(f, 1);
          }
          return typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。"), !1;
        });
      }
    } else if (t === "toggle-task") {
      const s = String(e?.taskId || e?.task?.id || e?.id || e || "");
      for (const i of c.columns) {
        const n = i.tasks.findIndex((r) => String(r.id) === s);
        if (n >= 0) {
          const r = i.tasks[n], a = !r.completed;
          r.completed = a, u.getToken() && u.toggleTaskCompletion(s, a), Q(async () => {
            const { todoistCalendarSidebarController: d } = await Promise.resolve().then(() => lt);
            d.recordTaskCompletion(r, a);
          }).catch(() => {
            c.emptyText = "本地完成记录未确认，请核对；没有自动重试。";
          }), a && i.tasks.splice(n, 1);
          break;
        }
      }
    } else if (t === "update-task-title") {
      const s = String(e?.taskId || e?.task?.id || e?.id || ""), i = String(e?.content !== void 0 ? e.content : e?.newContent || "");
      for (const n of c.columns) {
        const r = n.tasks.find((a) => String(a.id) === s);
        if (r && i) {
          r.content = i, u.getToken() && u.updateTask(s, { content: i });
          break;
        }
      }
    } else if (t === "update-task-desc") {
      const s = String(e?.taskId || ""), i = String(e?.description || "");
      for (const n of c.columns) {
        const r = n.tasks.find((a) => String(a.id) === s);
        if (r) {
          r.description = i, u.getToken() && u.updateTask(s, { description: i });
          break;
        }
      }
    } else if (t === "delete-task-submit") {
      const s = String(e?.taskId || e || "");
      for (const i of c.columns) {
        const n = i.tasks.findIndex((r) => String(r.id) === s);
        if (n !== -1) {
          i.tasks.splice(n, 1), u.getToken() && u.deleteTask(s);
          break;
        }
      }
    }
    for (const s of se)
      try {
        s(t, e);
      } catch (i) {
        console.error(`[TodoistTaskList] Handler error for action ${t}:`, i);
      }
  }
}, Le = E({ view: "inbox" });
let ue = {}, Ee = !1;
function Re(t) {
  Le.view = t;
}
function at(t) {
  ue = Object.freeze({ ...t });
}
function rt(t) {
  Ee = t;
}
async function ct(t) {
  Re(t), await pe.loadWorkspace(t), ue.switchView && await ue.switchView(t);
}
const St = Ne(Le), Dt = Object.freeze({
  update: Re,
  setActions: at,
  setMounted: rt,
  switchView: ct,
  get active() {
    return Ee;
  }
});
function W(t = /* @__PURE__ */ new Date()) {
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const Me = "todoist_local_completed_tasks_v1";
function Oe() {
  try {
    const t = JSON.parse(localStorage.getItem(Me) || "{}");
    return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).filter(([, e]) => e && typeof e == "object" && typeof e.id == "string" && typeof e.content == "string"));
  } catch {
    return {};
  }
}
function dt(t) {
  localStorage.setItem(Me, JSON.stringify(t));
}
function he(t) {
  const e = t.completedAt || t.completed_at || t.completed_date, o = new Date(e || "");
  return Number.isFinite(o.getTime()) ? W(o) : "";
}
function ge(t, e = me()) {
  const o = t._taskRaw || t.raw || t, s = String(t.task_id || t.id), i = t.description || o.description || "", n = t.startDate || e(s, i), r = o.due?.datetime || o.due?.date || t.dueDate || "";
  let a = Ge(n || r);
  if (!n && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(r)) {
    const d = new Date(r);
    Number.isFinite(d.getTime()) && (a = {
      date: W(d),
      time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
    });
  }
  return {
    id: s,
    content: t.content || "未命名任务",
    completed: typeof t.completed == "boolean" ? t.completed : be(t),
    priority: t.priority || 1,
    labels: t.labels || [],
    raw: o,
    scheduledDate: a.date,
    time: a.time,
    dueText: o.due?.string || o.due?.date || "",
    thumbUrl: i.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let M = [], J = 0;
const L = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set(), T = E({
  collapsed: !1,
  selectedDate: W(),
  badgeText: "Todoist",
  monthLabel: "",
  yearLabel: "",
  cells: [],
  agendaTitle: "今日任务",
  todoItems: [],
  todoLoading: !1,
  emptyText: "",
  writeError: ""
}), oe = /* @__PURE__ */ new Set();
let fe = 0, K;
function F() {
  fe++, K?.abort(), K = void 0, T.todoLoading = !1;
}
function V() {
  const t = T, e = me(), o = M.filter((a) => !be(a)).map((a) => ge(a, e)), s = t.selectedDate, i = Object.values(Oe()).filter((a) => !X.has(a.id)), n = /* @__PURE__ */ new Map();
  for (const a of [...L.get(s)?.items || [], ...i])
    !X.has(a.id) && (a.scheduledDate || he(a)) === s && n.set(a.id, a);
  for (const a of o) a.scheduledDate === s && n.set(a.id, a);
  t.todoItems = [...n.values()].sort((a, d) => Number(a.completed) - Number(d.completed) || (a.time || "").localeCompare(d.time || "")), t.agendaTitle = s === W() ? "今日任务" : `${s.slice(5).replace("-", "月")}日任务`;
  const r = /* @__PURE__ */ new Map();
  for (const a of [...Array.from(L.values()).flatMap((d) => d.items), ...i, ...o]) {
    const d = a.scheduledDate || he(a);
    d && (r.has(d) || r.set(d, /* @__PURE__ */ new Set()), r.get(d).add(a.id));
  }
  for (const a of t.cells)
    a.itemCount = r.get(a.date)?.size || 0, a.hasDot = a.itemCount > 0, a.title = `${a.date}${a.itemCount ? ` · ${a.itemCount} 个任务` : ""}`;
}
const z = {
  state: T,
  cancelReads: F,
  setCollapsed(t) {
    T.collapsed = t;
  },
  toggleCollapsed() {
    this.setCollapsed(!T.collapsed), this.dispatch("toggle-collapsed", T.collapsed);
  },
  recordTaskCompletion(t, e) {
    F(), J = 0;
    const o = String(t.task_id || t.id), s = Oe();
    if (e) {
      X.delete(o);
      const i = ge(t);
      s[o] = { ...i, scheduledDate: t.scheduledDate || i.scheduledDate, completed: !0, completedAt: (/* @__PURE__ */ new Date()).toISOString() }, M = M.filter((n) => String(n.id) !== o);
    } else
      X.add(o), delete s[o], M.some((i) => String(i.id) === o) || M.push({ ...t.raw || t._taskRaw || t, id: o, checked: !1, is_completed: !1, completed: !1 });
    try {
      dt(s);
    } catch {
      T.writeError = "完成状态的本机记录未保存，请核对。";
    }
    L.clear(), V();
  },
  async loadTodosForDate(t, e = !1) {
    if (!y.active || y.pendingWrites) return;
    F();
    const o = new AbortController();
    K = o;
    const s = fe, i = y.session;
    t ||= W();
    const n = () => !o.signal.aborted && s === fe && i === y.session && y.active && T.selectedDate === t && !y.pendingWrites;
    T.selectedDate = t, T.emptyText = "", V(), T.todoLoading = !0;
    try {
      if (e || !J || Date.now() - J > 3e4) {
        const a = await u.listCalendarTasks(o.signal);
        if (!n()) return;
        M = a, J = Date.now(), V();
      }
      const r = L.get(t);
      if (e || !r || Date.now() - r.savedAt > 3e4) {
        const a = /* @__PURE__ */ new Date(`${t}T00:00:00`);
        a.setDate(a.getDate() + 1);
        try {
          const d = await u.getCompletedTasks({ since: (/* @__PURE__ */ new Date(`${t}T00:00:00`)).toISOString(), until: a.toISOString(), limit: 200 }, o.signal);
          if (!n()) return;
          const g = d.items.filter((w) => he(w) === t).map((w) => ({
            ...ge(w),
            completed: !0,
            completedAt: w.completed_at
          }));
          L.set(t, { items: g, savedAt: Date.now() }), L.size > 42 && L.delete(L.keys().next().value);
        } catch (d) {
          if (n()) {
            const g = d instanceof Error ? d.message.match(/^Todoist API 请求失败 \((\d{3})\)$/)?.[1] : void 0;
            T.emptyText = g === "401" || g === "403" ? `完成历史读取失败（HTTP ${g}），请检查 Todoist 账户或接口访问权限；现有任务保留。` : `完成历史读取失败${g ? `（HTTP ${g}）` : ""}；现有任务保留，可重试读取。`;
          }
        }
      }
      n() && V();
    } catch {
      n() && (T.emptyText = "任务读取失败，请检查 Todoist 连接后刷新；当前日期的已有数据保留。");
    } finally {
      n() && (T.todoLoading = !1), K === o && (K = void 0);
    }
  },
  async toggleTodoItem(t) {
    if (y.pendingWrites) return;
    const e = !t.completed;
    T.writeError = "", await Q(async () => {
      F();
      try {
        if (await u.toggleTaskCompletion(t.id, e), this.recordTaskCompletion(t, e), u.invalidateWorkspaceSnapshots(), e)
          for (const o of c.columns) o.tasks = o.tasks.filter((s) => String(s.id) !== t.id);
        else y.active && await pe.loadWorkspace(void 0, void 0, !0);
      } catch {
        T.writeError = "完成状态保存未确认，请刷新核对；未自动重试。";
      }
    });
  },
  updateTaskTitle(t, e) {
    const o = M.find((i) => String(i.id) === String(t));
    o && (o.content = e);
    const s = T.todoItems.find((i) => i.id === String(t));
    s && (s.content = e);
  },
  updateState(t) {
    const e = T.selectedDate;
    Object.assign(T, t), V(), t.selectedDate && t.selectedDate !== e && this.loadTodosForDate(t.selectedDate);
  },
  onAction(t) {
    return oe.add(t), () => {
      oe.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of oe)
      try {
        o(t, e);
      } catch {
        T.emptyText = "日历操作未完成，请重新打开。";
      }
  }
}, lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTodoistDateReads: F,
  getLocalTodayDateStr: W,
  todoistCalendarSidebarController: z,
  todoistCalendarSidebarState: T
}, Symbol.toStringTag, { value: "Module" })), R = E({
  get isOpen() {
    return y.visible;
  },
  set isOpen(t) {
    y.visible = t;
  },
  title: "收件箱",
  isSaving: !1,
  timerMinutes: 30,
  labelCount: 0,
  isCalendarOpen: !0,
  isLabelPopoverOpen: !1
}), ie = /* @__PURE__ */ new Set(), Tt = {
  get state() {
    return R;
  },
  updateState(t) {
    Object.assign(R, t);
  },
  open() {
    P.open("todoist");
  },
  close() {
    return P.close("todoist");
  },
  minimize() {
    P.minimize("todoist");
  },
  refresh() {
    pe.loadWorkspace(void 0, void 0, !0);
  },
  // Compatibility bridge only; there is no remote order-save implementation.
  save() {
    this.dispatch("save");
  },
  toggleCalendar() {
    R.isCalendarOpen = !R.isCalendarOpen, this.dispatch("toggle-calendar", { isOpen: R.isCalendarOpen });
  },
  toggleLabelPopover() {
    R.isLabelPopoverOpen = !R.isLabelPopoverOpen;
  },
  onAction(t) {
    return ie.add(t), () => {
      ie.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of ie) o(t, e);
  }
}, $e = E({ visible: !1, active: !1 }), ne = E({
  get isOpen() {
    return $e.visible;
  },
  title: "任务日历",
  summary: "Todoist 截止日期",
  statusText: "",
  isLoading: !1
});
let O;
const b = {
  get state() {
    return ne;
  },
  get ready() {
    return !!O && $e.active;
  },
  attach(t) {
    return O = t, () => {
      O === t && (O = void 0);
    };
  },
  updateState(t) {
    Object.assign(ne, t);
  },
  open() {
    P.open("calendar");
  },
  close() {
    P.close("calendar");
  },
  refresh() {
    return this.ready ? O.refresh() : (this.setStatusText("请先打开日历并等待窗口就绪。"), Promise.resolve(!1));
  },
  goToday() {
    if (!this.ready) {
      this.setStatusText("请先打开日历并等待窗口就绪。");
      return;
    }
    O.goToday();
  },
  openTodoist() {
    P.open("todoist");
  },
  setStatusText(t) {
    ne.statusText = t;
  }
}, ye = "todoistCalendarCacheV1", ae = "googleCalendarDayLineCacheV1", Z = "googleCalendarSessionTokenV1", re = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", ut = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
function Ce(t) {
  return typeof window.storageGet == "function" ? window.storageGet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(t, e) : e({});
  });
}
async function ce(t) {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  await chrome.storage.local.set(t);
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
      const o = (await Ce([ae]))?.[ae];
      o && Array.isArray(o.events) && (this.googleCalendars = o.calendars || [], this.googleEvents = o.events || [], this.googleSavedAt = Number(o.savedAt || 0), this.googleRangeStart = String(o.rangeStart || ""), this.googleRangeEnd = String(o.rangeEnd || ""), this.googleEvents.length > 0 && (this.isGoogleConnected = !0));
    } catch (e) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", e);
    }
    this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  initControllers() {
    z.onAction(async (e, o) => {
      if (e === "init")
        try {
          this.syncSidebarToVue();
        } catch {
          b.setStatusText("日历初始化未完成，请稍后重新打开。");
        }
      else if (e === "toggle-collapsed") {
        const s = z.state.collapsed;
        z.setCollapsed(s);
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
    const e = await Ce(["gmailOAuthClientId"]);
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
    const s = (await chrome.storage.local.get(Z))[Z];
    if (s?.token && s.scope === re && Number(s.expiresAt || 0) > Date.now() + 3e4)
      return s.token;
    const i = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(i))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const n = new URL("https://accounts.google.com/o/oauth2/v2/auth"), r = crypto.randomUUID();
    n.searchParams.set("client_id", i), n.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), n.searchParams.set("response_type", "token"), n.searchParams.set("scope", re), n.searchParams.set("include_granted_scopes", "true"), n.searchParams.set("prompt", e ? "consent" : "none"), n.searchParams.set("state", r);
    const a = await chrome.identity.launchWebAuthFlow({ url: n.href, interactive: e });
    if (!a) throw new Error(e ? "Google 授权已取消" : "Google 日历尚未连接");
    const d = new URLSearchParams(new URL(a).hash.replace(/^#/, ""));
    if (d.get("state") !== r) throw new Error("Google 授权状态校验失败");
    if (d.get("error")) throw new Error(d.get("error_description") || d.get("error") || "");
    const g = d.get("access_token");
    if (!g) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [Z]: {
        token: g,
        scope: re,
        expiresAt: Date.now() + Math.max(300, Number(d.get("expires_in") || 3600)) * 1e3
      }
    }), g;
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
    if (n.status === 401 && typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(Z), !n.ok) {
      const r = await n.json().catch(() => ({}));
      throw new Error(r?.error?.message || `Google Calendar API ${n.status}`);
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
      const a = ((await this.googleCalendarApi(
        "/users/me/calendarList?showDeleted=false&showHidden=false&maxResults=250"
      ))?.items || []).filter(
        (g) => g.selected !== !1 && g.accessRole !== "freeBusyReader"
      ), d = [];
      for (const g of a)
        try {
          const w = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: s.start.toISOString(),
            timeMax: s.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(g.id)}/events?${w}`))?.items || []).forEach((S) => {
            d.push({
              ...S,
              _calendarId: g.id,
              _calendarName: g.summary || "Google 日历",
              _calendarColor: g.backgroundColor || "#2563eb",
              _calendarAccessRole: g.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = a, this.googleEvents = d, this.googleSavedAt = Date.now(), this.googleRangeStart = s.startKey, this.googleRangeEnd = s.endKey, this.isGoogleConnected = !0, await ce({
        [ae]: {
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
      const n = /* @__PURE__ */ new Date(`${e}T00:00:00`), r = new Date(n);
      return r.setDate(n.getDate() + 1), s < r && (Number.isFinite(i.getTime()) ? i : s) > n;
    }).sort((o, s) => {
      const i = o.start?.dateTime ? new Date(o.start.dateTime).getTime() : 0, n = s.start?.dateTime ? new Date(s.start.dateTime).getTime() : 0;
      return i - n;
    });
  }
  tasksForDate(e) {
    return this.todoistTasks.filter((o) => !o || o.is_completed || !!(o.due?.is_recurring || o.due?.recurring || /every|daily|weekly|monthly|yearly|weekday|weekends|每|工作日|周期/i.test(String(o.due?.string || ""))) ? !1 : String(o.due?.date || o.due?.datetime || "").slice(0, 10) === e);
  }
  loadTodoistCalendar(e = !1, o) {
    return o?.aborted ? Promise.resolve(!1) : this.taskWrites.size ? (b.setStatusText("截止日期正在提交，未开始刷新。"), Promise.resolve(!1)) : !o && this.todoistLoad ? this.todoistLoad : !e && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 6e4 ? (this.publishCalendarViews(), Promise.resolve(!0)) : o ? this.readTodoistCalendar(o) : (this.todoistLoad = this.readTodoistCalendar().finally(() => {
      this.todoistLoad = null;
    }), this.todoistLoad);
  }
  async readTodoistCalendar(e) {
    const o = this.taskRevision, s = ++this.taskReadSequence, i = () => !e?.aborted && s === this.taskReadSequence && o === this.taskRevision;
    this.isTodoistLoading = !0, b.updateState({ isLoading: !0, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService: n } = await import("./todoist.service-7bvn-_sx.js").then((a) => a.b);
      if (!i()) return !1;
      const r = await n.listCalendarTasks(e);
      if (!i()) return !1;
      if (!Array.isArray(r)) throw new Error("任务返回格式无效");
      this.todoistTasks = r, this.todoistSavedAt = Date.now();
      try {
        await ce({
          [ye]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
        });
      } catch {
        return i() && b.setStatusText("任务已读取，但本地缓存保存失败。"), !1;
      }
      return i() && b.setStatusText("任务已刷新。"), i();
    } catch {
      return i() && b.setStatusText("任务读取失败，请检查 Todoist 连接；原列表已保留。"), !1;
    } finally {
      s === this.taskReadSequence && (this.isTodoistLoading = !1, b.updateState({ isLoading: !1 })), i() && this.publishCalendarViews();
    }
  }
  async assignTaskToDate(e, o) {
    const s = String(e || "").trim(), i = /* @__PURE__ */ new Date(o + "T00:00:00Z");
    return !s || !/^\d{4}-\d{2}-\d{2}$/.test(o) || !Number.isFinite(i.getTime()) || i.toISOString().slice(0, 10) !== o ? (b.setStatusText("任务或截止日期无效，未提交。"), null) : this.taskWrites.has(s) ? (b.setStatusText("此任务正在提交，请等待结果；未重复发送。"), null) : (this.taskWrites.add(s), ++this.taskRevision, Q(async () => {
      try {
        const { todoistService: n } = await import("./todoist.service-7bvn-_sx.js").then((d) => d.b), r = await n.setTaskDueDate(s, o);
        if (!r || String(r.id) !== s) throw new Error("任务更新结果未确认");
        const a = this.todoistTasks.findIndex((d) => String(d.id) === s);
        a >= 0 ? this.todoistTasks[a] = r : this.todoistTasks.push(r), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await ce({
            [ye]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), b.setStatusText("Todoist 截止日期已更新。");
        } catch {
          b.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return r;
      } catch {
        return b.setStatusText("截止日期更新未确认；请核对 Todoist，未自动重试。"), null;
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
    this.dropDate = String(e || ""), Te.setDropDate(this.dropDate);
  }
  openTask(e, o = !1) {
    const s = this.todoistTasks.find((i) => String(i.id) === String(e));
    s && (o ? window.open(s.url || `https://app.todoist.com/app/task/${s.id}`, "_blank", "noopener,noreferrer") : Ve(String(s.id)));
  }
  publishCalendarViews() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = new Date(e, o, 1 - i), r = this.dateKey(/* @__PURE__ */ new Date()), a = [];
    for (let h = 0; h < 42; h++) {
      const l = new Date(n);
      l.setDate(n.getDate() + h);
      const f = this.dateKey(l), p = this.tasksForDate(f), _ = (this.isGoogleConnected ? this.googleEventsForDate(f) : []).length, N = p.length > 0 || _ > 0;
      a.push({
        date: f,
        day: l.getDate(),
        taskCount: p.length,
        outside: l.getMonth() !== o,
        today: f === r,
        selected: f === this.selectedDate,
        hasDot: N,
        title: _ || p.length ? `${this.friendlyDate(f)} · ${_} 项日程${p.length ? ` · ${p.length} 个任务` : ""}` : `${this.friendlyDate(f)} · 拖入任务设置截止日期`
      });
    }
    const d = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], g = `${this.todoistTasks.filter((h) => h.due?.date && !h.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, w = this.selectedDate || r, S = (this.isGoogleConnected ? this.googleEventsForDate(w) : []).map((h) => ({
      id: h.id || String(Math.random()),
      time: h.start?.date ? "全天" : new Date(h.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: h.summary || "（无标题）",
      subtitle: h.location || h._calendarName || "Google 日历",
      htmlLink: h.htmlLink || "",
      color: h._calendarColor || "var(--accent)"
    }));
    S.sort((h, l) => {
      const f = (h.time || "").replace(/[^\d:]/g, ""), p = (l.time || "").replace(/[^\d:]/g, "");
      return f.localeCompare(p);
    }), Te.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: g,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${S.length ? `${S.length} 项日程 · ` : ""}${d.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: a,
      detailTasks: d.map((h) => ({
        id: String(h.id),
        content: String(h.content || "未命名任务"),
        description: String(h.description || ""),
        labels: Array.isArray(h.labels) ? h.labels.map(String) : [],
        priority: Number(h.priority || 1),
        url: String(h.url || `https://app.todoist.com/app/task/${h.id}`)
      })),
      detailEvents: S
    }), b.updateState({ summary: g }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = this.dateKey(/* @__PURE__ */ new Date()), r = this.selectedDate || n, a = Array.from({ length: 42 }, (d, g) => {
      const w = new Date(e, o, 1 - i + g), k = this.dateKey(w);
      return {
        date: k,
        dayNumber: w.getDate(),
        isOutside: w.getMonth() !== o,
        isToday: k === n,
        isSelected: k === r,
        itemCount: 0,
        title: k,
        hasDot: !1
      };
    });
    z.updateState({
      badgeText: "Todoist",
      monthLabel: ut[o],
      yearLabel: String(e),
      cells: a,
      selectedDate: r
    });
  }
}
const kt = new ht();
export {
  Te as a,
  Dt as b,
  kt as c,
  z as d,
  pe as e,
  b as f,
  Tt as g,
  St as h,
  ke as i,
  c as j,
  T as k,
  F as l,
  tt as m,
  R as n,
  lt as o,
  vt as t
};
