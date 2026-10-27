import { t as y, w as X } from "./module-state-Dt_XKbbf.js";
import { t as u, a as de, c as pe, i as Ie, p as Ne } from "./todoist.service-CJhh6PtZ.js";
import { r as E, a as Ve } from "./vendor-vue-DokqDua_.js";
import { w as W } from "./window-manager.store-D_Nuf9-p.js";
import { openTodoistTask as Fe } from "./task-navigation-CtkR4LCq.js";
const P = E({
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
let j = {}, je = !1;
function ze(t) {
  Object.assign(P, t, {
    cells: t.cells ? [...t.cells] : P.cells,
    detailTasks: t.detailTasks ? [...t.detailTasks] : P.detailTasks,
    detailEvents: t.detailEvents ? [...t.detailEvents] : P.detailEvents
  });
}
function Ye(t) {
  j = Object.freeze({ ...t });
}
function Ke(t) {
  const e = Object.freeze({ ...t });
  return j = e, () => {
    j === e && (j = {});
  };
}
function qe(t) {
  je = t;
}
function _e(t) {
  P.dropDate = String(t || "");
}
function He(t) {
  j.selectDate?.(t);
}
function Ue() {
  j.previousMonth?.();
}
function Be() {
  j.nextMonth?.();
}
function Je() {
  j.goToday?.();
}
function Ze() {
  j.closeDetail?.();
}
async function Qe(t, e) {
  await j.dropTask?.(t, e);
}
function Xe(t, e = !1) {
  j.openTask?.(t, e);
}
function et(t) {
  _e(t), j.highlightDrop?.(t);
}
const ke = Object.freeze({
  update: ze,
  setActions: Ye,
  attachActions: Ke,
  setMounted: qe,
  setDropDate: _e,
  selectDate: He,
  previousMonth: Ue,
  nextMonth: Be,
  goToday: Je,
  closeDetail: Ze,
  dropTask: Qe,
  openTask: Xe,
  highlightDrop: et,
  get snapshot() {
    return P;
  },
  get active() {
    return je;
  }
}), tt = E({ labels: [] });
let Ae = {}, xe = !1, le = 0, K;
function st() {
  le++, K?.abort(), K = void 0;
}
function Le(t) {
  tt.labels = t.map((e) => ({ ...e }));
}
async function ot() {
  if (!y.active) return;
  st();
  const t = new AbortController();
  K = t;
  const e = le, o = y.session;
  try {
    const s = await u.getLabels(t.signal);
    !t.signal.aborted && e === le && o === y.session && y.active && Array.isArray(s) && Le(s.map((i) => ({ id: i.id, name: i.name })));
  } catch {
    t.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    K === t && (K = void 0);
  }
}
function it(t) {
  Ae = Object.freeze({ ...t });
}
function nt(t) {
  xe = t;
}
function at(t, e) {
  Ae.startDrag?.(t, e);
}
const St = Object.freeze({
  update: Le,
  refresh: ot,
  setActions: it,
  setMounted: nt,
  startDrag: at,
  get active() {
    return xe;
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
let ue = 0, q;
function ye() {
  ue++, q?.abort(), q = void 0, c.loading = !1;
}
const we = {
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
    ye();
    const s = new AbortController();
    q = s;
    const i = y.session, n = ue, a = () => !s.signal.aborted && y.active && i === y.session && n === ue, r = t || c.view || "inbox", d = e || (r === "projects" ? c.activeProjectId || u.getActiveProjectId() : void 0), p = r !== c.view || r === "projects" && d !== c.activeProjectId;
    c.view = r, p && this.updateState({ columns: [], emptyText: "", activeProjectId: d || "" });
    const w = (S) => {
      if (!a()) return;
      const h = pe(), l = {
        ...S,
        projects: S.projects.map((g) => ({ ...g })),
        availableLabels: [...S.availableLabels || []],
        columns: S.columns.map((g) => ({
          ...g,
          _groupRaw: g._groupRaw ? { ...g._groupRaw } : void 0,
          tasks: g.tasks.map((m) => ({
            ...m,
            startDate: h(m.id, m.description),
            labels: m.labels ? [...m.labels] : void 0,
            _taskRaw: m._taskRaw ? {
              ...m._taskRaw,
              labels: [...m._taskRaw.labels || []],
              due: m._taskRaw.due ? { ...m._taskRaw.due } : null
            } : void 0
          }))
        }))
      };
      c.moveNeedsRefresh = !1, !c.movingTaskId && c.moveError && (c.moveMessage = "", c.moveError = !1), this.updateState({
        ...l,
        view: r,
        loading: !1,
        emptyText: l.readWarning || (l.columns.length ? "" : "暂无待办任务")
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: r === "projects" ? "项目" : r === "today" ? "今天" : "收件箱"
      });
    }, k = c.columns.length > 0;
    this.setLoading(!k);
    try {
      if (await u.initToken(), !a()) return;
      if (c.accountConfigured = !!u.getToken().trim(), !c.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      let S = !1;
      if (!o) {
        const l = await u.getCachedWorkspaceData(r, d);
        if (!a()) return;
        l && Array.isArray(l.columns) && l.columns.length > 0 && (w(l), S = !0, this.setLoading(!1));
      }
      const h = await u.loadWorkspaceData(r, d, o, s.signal);
      w(h);
    } catch (S) {
      a() && (this.setLoading(!1), this.updateState({ emptyText: de(S) }));
    } finally {
      q === s && (q = void 0);
    }
  },
  async moveTask(t, e, o) {
    const s = c, i = (f) => (s.moveMessage = f, s.moveError = !0, !1);
    if (!y.active || s.movingTaskId) return !1;
    if (s.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const n = s.columns.find((f) => f.tasks.some((D) => D.id === t)), a = n?.tasks.find((f) => f.id === t);
    if (!n || !a || a.completed || t.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (o === t) return !0;
    const r = s.view, d = s.activeProjectId, p = s.columns, w = n.tasks.indexOf(a), k = n.tasks[w + 1]?.id, S = n.tasks[w - 1]?.id, h = {
      dueDate: a.dueDate,
      dueText: a.dueText,
      dueString: a.dueString,
      isDueToday: a.isDueToday,
      isOverdue: a.isOverdue
    }, l = r === "today", g = l && !e.projectId;
    if (e.dueDate && (!l || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !g) return i("目标项目未就绪，未提交移动。");
    const m = e.dueDate ? s.columns.find((f) => f.sectionId === "today") : g ? s.columns.find((f) => f.sectionId === e.sectionId) : s.columns.find((f) => f.projectId === e.projectId && f.sectionId === e.sectionId), N = e.dueDate ? n.sectionId !== "today" : !g && (String(a._taskRaw?.project_id || n.projectId || "") !== e.projectId || String(a._taskRaw?.section_id || n.sectionId || "") !== e.sectionId);
    if (!N && n === m && o === void 0 && n.tasks[n.tasks.length - 1]?.id === t) return !0;
    if (g && e.sectionId === "overdue" && n.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const _ = o ? m?.tasks.find((f) => f.id === o) : void 0;
    if (g && !m || o && !_)
      return i("目标板块或任务已改变，请重新拖动。");
    const V = N && !g ? "" : String(a._taskRaw?.parent_id || ""), ve = e.projectId || String(a._taskRaw?.project_id || n.projectId || ""), We = e.projectId ? e.sectionId : String(a._taskRaw?.section_id || "");
    if (_ && !l && String(_._taskRaw?.parent_id || "") !== V)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const Se = (m?.tasks || []).filter((f) => f.id !== t && (l || String(f._taskRaw?.parent_id || "") === V)), De = _ ? Se.findIndex((f) => f.id === _.id) + 1 : Se.length + 1;
    if (m && De < 1) return i("目标任务位置已改变，请重试拖动。");
    s.movingTaskId = t, s.moveMessage = "位置已在本页移动，正在后台保存…", s.moveError = !1, ye(), u.invalidateWorkspaceSnapshots();
    let ee = !1, A, B = !1, J = !1;
    const Te = () => p === s.columns && r === s.view && d === s.activeProjectId, te = (f) => {
      if (!Te()) return !1;
      const D = s.columns.find((v) => v.tasks.some((x) => x.id === t)), C = D?.tasks.find((v) => v.id === t) || (B && J ? a : void 0);
      if (!C) return !1;
      let I = e.dueDate ? s.columns.find((v) => v.sectionId === "today") : g ? s.columns.find((v) => v.sectionId === e.sectionId) : s.columns.find((v) => v.projectId === e.projectId && v.sectionId === e.sectionId);
      const Z = !I && l && !g;
      if (Z && (I = n), !I && g) return !1;
      if (D && D.tasks.splice(D.tasks.indexOf(C), 1), A) {
        const v = { ...C._taskRaw };
        for (const x of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(A, x) && (v[x] = A[x]);
        C._taskRaw = v;
      }
      if (e.dueDate && (C.dueDate = A?.due?.date || e.dueDate, C.dueText = "今天", C.dueString = A?.due?.string || e.dueDate, C.isDueToday = !0, C.isOverdue = !1), I) {
        const v = Z ? Math.min(w, I.tasks.length) : f && o ? I.tasks.findIndex((x) => x.id === o) : -1;
        I.tasks.splice(v < 0 ? I.tasks.length : v, 0, C);
      }
      return J = !I, !0;
    }, Ge = () => {
      if (!B || !Te() || !s.columns.includes(n)) return !1;
      const f = s.columns.find((v) => v.tasks.some((x) => x.id === t)), D = f?.tasks.find((v) => v.id === t) || (J ? a : void 0);
      if (!D) return !1;
      f && f.tasks.splice(f.tasks.indexOf(D), 1);
      const C = k ? n.tasks.findIndex((v) => v.id === k) : -1, I = S ? n.tasks.findIndex((v) => v.id === S) : -1, Z = C >= 0 ? C : I >= 0 ? I + 1 : Math.min(w, n.tasks.length);
      return n.tasks.splice(Z, 0, D), e.dueDate && D.dueDate === e.dueDate && D.dueText === "今天" && D.dueString === e.dueDate && D.isDueToday && !D.isOverdue && Object.assign(D, h), J = !1, !0;
    };
    try {
      return await X(async () => {
        try {
          if (B = te(!0), !B) throw new Error("看板已改变");
          if (N) {
            if (A = e.dueDate ? await u.setTaskDueDate(t, e.dueDate) : await u.moveTask(t, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(A?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            ee = !0;
          }
          if (m && (!N || o)) {
            const D = await u.reorderTask(t, De, l);
            if (ve && String(D.project_id) !== ve || String(D.section_id || "") !== We || String(D.parent_id || "") !== V)
              throw ee = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            A = { ...A, ...D };
          }
          const f = te(!0);
          return s.moveMessage = f ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (s.moveNeedsRefresh = !0, ee)
            return te(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const f = Ge();
          return i(f ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。" : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
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
          const n = c.columns.find((a) => !a.sectionId);
          n && (n.title = i), this.loadWorkspace(c.view, c.activeProjectId, !0);
        }
    } else if (t === "delete-section") {
      const s = String(e?.sectionId || e || "");
      if (s) {
        const i = c.columns.findIndex((a) => String(a.sectionId) === s);
        let n;
        i !== -1 && (n = c.columns[i], c.columns.splice(i, 1)), u.deleteSection(s).then(() => {
          this.loadWorkspace(c.view, c.activeProjectId, !0);
        }).catch((a) => {
          console.error("[Todoist] Delete section error:", a), n && i !== -1 && c.columns.splice(i, 0, n), c.moveError = !0, c.moveMessage = `删除板块失败: ${a?.message || "网络请求异常"}`, typeof window < "u" && window.LogicWeaverNotifications?.error?.("Todoist", `删除板块失败: ${a?.message || "网络或权限错误"}`);
        });
      }
    } else if (t === "add-task-submit") {
      const s = String(e?.content || "").trim(), i = e?.view || c.view || "inbox";
      let n = e?.projectId || e?.group?.projectId || void 0, a = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, r;
      i === "projects" ? n || (n = c.activeProjectId || void 0) : i === "today" && (r = "today");
      const d = a || void 0;
      if (s) {
        const p = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, w = {
          id: p,
          content: s,
          completed: !1,
          priority: 1,
          labels: [],
          dueText: r ? "今天" : "",
          isOverdue: !1
        };
        let k = c.columns.find((l) => !!(e?.group && l === e.group || a !== void 0 && l.sectionId === a));
        !k && c.columns.length > 0 && (k = c.columns[0]), k && k.tasks.push(w);
        const S = Array.isArray(e?.attachments) ? e.attachments : [];
        return S.length > 0 && (w.description = S.map((l) => `![${l.file_name}](${l.file_url})`).join(`

`)), (S.length > 0 ? u.createTaskWithAttachments({
          content: s,
          project_id: n,
          section_id: d,
          due_string: r,
          attachments: S
        }) : u.createTask({
          content: s,
          project_id: n,
          section_id: d,
          due_string: r
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
            const g = k.tasks.findIndex((m) => m.id === p);
            g >= 0 && k.tasks.splice(g, 1);
          }
          return typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。"), !1;
        });
      }
    } else if (t === "toggle-task") {
      const s = String(e?.taskId || e?.task?.id || e?.id || e || "");
      for (const i of c.columns) {
        const n = i.tasks.findIndex((a) => String(a.id) === s);
        if (n >= 0) {
          const a = i.tasks[n], r = !a.completed;
          a.completed = r, u.getToken() && u.toggleTaskCompletion(s, r), X(async () => {
            const { todoistCalendarSidebarController: d } = await Promise.resolve().then(() => ut);
            d.recordTaskCompletion(a, r);
          }).catch(() => {
            c.emptyText = "本地完成记录未确认，请核对；没有自动重试。";
          }), r && i.tasks.splice(n, 1);
          break;
        }
      }
    } else if (t === "update-task-title") {
      const s = String(e?.taskId || e?.task?.id || e?.id || ""), i = String(e?.content !== void 0 ? e.content : e?.newContent || "");
      for (const n of c.columns) {
        const a = n.tasks.find((r) => String(r.id) === s);
        if (a && i) {
          a.content = i, u.getToken() && u.updateTask(s, { content: i });
          break;
        }
      }
    } else if (t === "update-task-desc") {
      const s = String(e?.taskId || ""), i = String(e?.description || "");
      for (const n of c.columns) {
        const a = n.tasks.find((r) => String(r.id) === s);
        if (a) {
          a.description = i, u.getToken() && u.updateTask(s, { description: i });
          break;
        }
      }
    } else if (t === "delete-task-submit") {
      const s = String(e?.taskId || e || "");
      for (const i of c.columns) {
        const n = i.tasks.findIndex((a) => String(a.id) === s);
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
}, Ee = E({ view: "inbox" });
let he = {}, Re = !1;
function Me(t) {
  Ee.view = t;
}
function rt(t) {
  he = Object.freeze({ ...t });
}
function ct(t) {
  Re = t;
}
async function dt(t) {
  Me(t), await we.loadWorkspace(t), he.switchView && await he.switchView(t);
}
const Dt = Ve(Ee), Tt = Object.freeze({
  update: Me,
  setActions: rt,
  setMounted: ct,
  switchView: dt,
  get active() {
    return Re;
  }
});
function G(t = /* @__PURE__ */ new Date()) {
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const Oe = "todoist_local_completed_tasks_v1";
function $e() {
  try {
    const t = JSON.parse(localStorage.getItem(Oe) || "{}");
    return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).filter(([, e]) => e && typeof e == "object" && typeof e.id == "string" && typeof e.content == "string"));
  } catch {
    return {};
  }
}
function lt(t) {
  localStorage.setItem(Oe, JSON.stringify(t));
}
function ge(t) {
  const e = t.completedAt || t.completed_at || t.completed_date, o = new Date(e || "");
  return Number.isFinite(o.getTime()) ? G(o) : "";
}
function fe(t, e = pe()) {
  const o = t._taskRaw || t.raw || t, s = String(t.task_id || t.id), i = t.description || o.description || "", n = t.startDate || e(s, i), a = o.due?.datetime || o.due?.date || t.dueDate || "";
  let r = Ne(n || a);
  if (!n && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(a)) {
    const d = new Date(a);
    Number.isFinite(d.getTime()) && (r = {
      date: G(d),
      time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
    });
  }
  return {
    id: s,
    content: t.content || "未命名任务",
    completed: typeof t.completed == "boolean" ? t.completed : Ie(t),
    priority: t.priority || 1,
    labels: t.labels || [],
    raw: o,
    scheduledDate: r.date,
    time: r.time,
    dueText: o.due?.string || o.due?.date || "",
    thumbUrl: i.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let M = [], F = 0;
const L = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Set(), T = E({
  collapsed: !1,
  selectedDate: G(),
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
let me = 0, U;
function $() {
  me++, U?.abort(), U = void 0, T.todoLoading = !1;
}
function z() {
  const t = T, e = pe(), o = M.filter((r) => !Ie(r)).map((r) => fe(r, e)), s = t.selectedDate, i = Object.values($e()).filter((r) => !H.has(r.id)), n = /* @__PURE__ */ new Map();
  for (const r of [...L.get(s)?.items || [], ...i])
    !H.has(r.id) && (r.scheduledDate || ge(r)) === s && n.set(r.id, r);
  for (const r of o) r.scheduledDate === s && n.set(r.id, r);
  t.todoItems = [...n.values()].sort((r, d) => Number(r.completed) - Number(d.completed) || (r.time || "").localeCompare(d.time || "")), t.agendaTitle = s === G() ? "今日任务" : `${s.slice(5).replace("-", "月")}日任务`;
  const a = /* @__PURE__ */ new Map();
  for (const r of [...Array.from(L.values()).flatMap((d) => d.items), ...i, ...o]) {
    const d = r.scheduledDate || ge(r);
    d && (a.has(d) || a.set(d, /* @__PURE__ */ new Set()), a.get(d).add(r.id));
  }
  for (const r of t.cells)
    r.itemCount = a.get(r.date)?.size || 0, r.hasDot = r.itemCount > 0, r.title = `${r.date}${r.itemCount ? ` · ${r.itemCount} 个任务` : ""}`;
}
const Y = {
  state: T,
  cancelReads: $,
  invalidateReads() {
    $(), F = 0, L.clear(), H.clear();
  },
  setCollapsed(t) {
    T.collapsed = t;
  },
  toggleCollapsed() {
    this.setCollapsed(!T.collapsed), this.dispatch("toggle-collapsed", T.collapsed);
  },
  recordTaskCompletion(t, e) {
    $(), F = 0;
    const o = String(t.task_id || t.id), s = $e();
    if (e) {
      H.delete(o);
      const i = fe(t);
      s[o] = { ...i, scheduledDate: t.scheduledDate || i.scheduledDate, completed: !0, completedAt: (/* @__PURE__ */ new Date()).toISOString() }, M = M.filter((n) => String(n.id) !== o);
    } else
      H.add(o), delete s[o], M.some((i) => String(i.id) === o) || M.push({ ...t.raw || t._taskRaw || t, id: o, checked: !1, is_completed: !1, completed: !1 });
    try {
      lt(s);
    } catch {
      T.writeError = "完成状态的本机记录未保存，请核对。";
    }
    L.clear(), z();
  },
  async loadTodosForDate(t, e = !1) {
    if (!y.active || y.pendingWrites) return;
    $();
    const o = new AbortController();
    U = o;
    const s = me, i = y.session;
    t ||= G();
    const n = () => !o.signal.aborted && s === me && i === y.session && y.active && T.selectedDate === t && !y.pendingWrites;
    T.selectedDate = t, T.emptyText = "", z(), T.todoLoading = !0;
    try {
      if (e || !F || Date.now() - F > 3e4) {
        const r = await u.listCalendarTasks(o.signal);
        if (!n()) return;
        M = r, F = Date.now(), z();
      }
      const a = L.get(t);
      if (e || !a || Date.now() - a.savedAt > 3e4) {
        const r = /* @__PURE__ */ new Date(`${t}T00:00:00`);
        r.setDate(r.getDate() + 1);
        try {
          const d = await u.getCompletedTasks({ since: (/* @__PURE__ */ new Date(`${t}T00:00:00`)).toISOString(), until: r.toISOString(), limit: 200 }, o.signal);
          if (!n()) return;
          const p = d.items.filter((w) => ge(w) === t).map((w) => ({
            ...fe(w),
            completed: !0,
            completedAt: w.completed_at
          }));
          L.set(t, { items: p, savedAt: Date.now() }), L.size > 42 && L.delete(L.keys().next().value);
        } catch (d) {
          n() && (T.emptyText = "完成历史：" + de(d) + " 现有任务保留。");
        }
      }
      n() && z();
    } catch (a) {
      n() && (T.emptyText = de(a) + " 当前日期的已有数据保留。");
    } finally {
      n() && (T.todoLoading = !1), U === o && (U = void 0);
    }
  },
  async toggleTodoItem(t) {
    if (y.pendingWrites) return;
    const e = !t.completed;
    T.writeError = "", await X(async () => {
      $();
      try {
        if (await u.toggleTaskCompletion(t.id, e), this.recordTaskCompletion(t, e), u.invalidateWorkspaceSnapshots(), e)
          for (const o of c.columns) o.tasks = o.tasks.filter((s) => String(s.id) !== t.id);
        else y.active && await we.loadWorkspace(void 0, void 0, !0);
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
    Object.assign(T, t), z(), t.selectedDate && t.selectedDate !== e && this.loadTodosForDate(t.selectedDate);
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
}, ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTodoistDateReads: $,
  getLocalTodayDateStr: G,
  todoistCalendarSidebarController: Y,
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
}), ie = /* @__PURE__ */ new Set(), kt = {
  get state() {
    return R;
  },
  updateState(t) {
    Object.assign(R, t);
  },
  open() {
    W.open("todoist");
  },
  close() {
    return W.close("todoist");
  },
  minimize() {
    W.minimize("todoist");
  },
  refresh() {
    we.loadWorkspace(void 0, void 0, !0);
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
}, Pe = E({ visible: !1, active: !1 }), ne = E({
  get isOpen() {
    return Pe.visible;
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
    return !!O && Pe.active;
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
    W.open("calendar");
  },
  close() {
    W.close("calendar");
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
    W.open("todoist");
  },
  setStatusText(t) {
    ne.statusText = t;
  }
}, Ce = "todoistCalendarCacheV1", ae = "googleCalendarDayLineCacheV1", Q = "googleCalendarSessionTokenV1", re = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", ht = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
function be(t) {
  return typeof window.storageGet == "function" ? window.storageGet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(t, e) : e({});
  });
}
async function ce(t) {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("日历缓存存储不可用");
  await chrome.storage.local.set(t);
}
class gt {
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
      const o = (await be([ae]))?.[ae];
      o && Array.isArray(o.events) && (this.googleCalendars = o.calendars || [], this.googleEvents = o.events || [], this.googleSavedAt = Number(o.savedAt || 0), this.googleRangeStart = String(o.rangeStart || ""), this.googleRangeEnd = String(o.rangeEnd || ""), this.googleEvents.length > 0 && (this.isGoogleConnected = !0));
    } catch (e) {
      console.warn("[CalendarService] Failed to load Google Calendar cache", e);
    }
    this.publishCalendarViews(), this.loadGoogleCalendarRange(!1, !1).catch(() => {
    });
  }
  initControllers() {
    Y.onAction(async (e, o) => {
      if (e === "init")
        try {
          this.syncSidebarToVue();
        } catch {
          b.setStatusText("日历初始化未完成，请稍后重新打开。");
        }
      else if (e === "toggle-collapsed") {
        const s = Y.state.collapsed;
        Y.setCollapsed(s);
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
    const e = await be(["gmailOAuthClientId"]);
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
    if (s?.token && s.scope === re && Number(s.expiresAt || 0) > Date.now() + 3e4)
      return s.token;
    const i = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(i))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const n = new URL("https://accounts.google.com/o/oauth2/v2/auth"), a = crypto.randomUUID();
    n.searchParams.set("client_id", i), n.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), n.searchParams.set("response_type", "token"), n.searchParams.set("scope", re), n.searchParams.set("include_granted_scopes", "true"), n.searchParams.set("prompt", e ? "consent" : "none"), n.searchParams.set("state", a);
    const r = await chrome.identity.launchWebAuthFlow({ url: n.href, interactive: e });
    if (!r) throw new Error(e ? "Google 授权已取消" : "Google 日历尚未连接");
    const d = new URLSearchParams(new URL(r).hash.replace(/^#/, ""));
    if (d.get("state") !== a) throw new Error("Google 授权状态校验失败");
    if (d.get("error")) throw new Error(d.get("error_description") || d.get("error") || "");
    const p = d.get("access_token");
    if (!p) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [Q]: {
        token: p,
        scope: re,
        expiresAt: Date.now() + Math.max(300, Number(d.get("expires_in") || 3600)) * 1e3
      }
    }), p;
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
      const r = ((await this.googleCalendarApi(
        "/users/me/calendarList?showDeleted=false&showHidden=false&maxResults=250"
      ))?.items || []).filter(
        (p) => p.selected !== !1 && p.accessRole !== "freeBusyReader"
      ), d = [];
      for (const p of r)
        try {
          const w = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: s.start.toISOString(),
            timeMax: s.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(p.id)}/events?${w}`))?.items || []).forEach((S) => {
            d.push({
              ...S,
              _calendarId: p.id,
              _calendarName: p.summary || "Google 日历",
              _calendarColor: p.backgroundColor || "#2563eb",
              _calendarAccessRole: p.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = r, this.googleEvents = d, this.googleSavedAt = Date.now(), this.googleRangeStart = s.startKey, this.googleRangeEnd = s.endKey, this.isGoogleConnected = !0, await ce({
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
    return o?.aborted ? Promise.resolve(!1) : this.taskWrites.size ? (b.setStatusText("截止日期正在提交，未开始刷新。"), Promise.resolve(!1)) : !o && this.todoistLoad ? this.todoistLoad : !e && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 6e4 ? (this.publishCalendarViews(), Promise.resolve(!0)) : o ? this.readTodoistCalendar(o) : (this.todoistLoad = this.readTodoistCalendar().finally(() => {
      this.todoistLoad = null;
    }), this.todoistLoad);
  }
  async readTodoistCalendar(e) {
    const o = this.taskRevision, s = ++this.taskReadSequence, i = () => !e?.aborted && s === this.taskReadSequence && o === this.taskRevision;
    this.isTodoistLoading = !0, b.updateState({ isLoading: !0, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService: n } = await import("./todoist.service-CJhh6PtZ.js").then((r) => r.e);
      if (!i()) return !1;
      const a = await n.listCalendarTasks(e);
      if (!i()) return !1;
      if (!Array.isArray(a)) throw new Error("任务返回格式无效");
      this.todoistTasks = a, this.todoistSavedAt = Date.now();
      try {
        await ce({
          [Ce]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
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
    return !s || !/^\d{4}-\d{2}-\d{2}$/.test(o) || !Number.isFinite(i.getTime()) || i.toISOString().slice(0, 10) !== o ? (b.setStatusText("任务或截止日期无效，未提交。"), null) : this.taskWrites.has(s) ? (b.setStatusText("此任务正在提交，请等待结果；未重复发送。"), null) : (this.taskWrites.add(s), ++this.taskRevision, X(async () => {
      try {
        const { todoistService: n } = await import("./todoist.service-CJhh6PtZ.js").then((d) => d.e), a = await n.setTaskDueDate(s, o);
        if (!a || String(a.id) !== s) throw new Error("任务更新结果未确认");
        const r = this.todoistTasks.findIndex((d) => String(d.id) === s);
        r >= 0 ? this.todoistTasks[r] = a : this.todoistTasks.push(a), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await ce({
            [Ce]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), b.setStatusText("Todoist 截止日期已更新。");
        } catch {
          b.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return a;
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
    this.dropDate = String(e || ""), ke.setDropDate(this.dropDate);
  }
  openTask(e, o = !1) {
    const s = this.todoistTasks.find((i) => String(i.id) === String(e));
    s && (o ? window.open(s.url || `https://app.todoist.com/app/task/${s.id}`, "_blank", "noopener,noreferrer") : Fe(String(s.id)));
  }
  publishCalendarViews() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = new Date(e, o, 1 - i), a = this.dateKey(/* @__PURE__ */ new Date()), r = [];
    for (let h = 0; h < 42; h++) {
      const l = new Date(n);
      l.setDate(n.getDate() + h);
      const g = this.dateKey(l), m = this.tasksForDate(g), _ = (this.isGoogleConnected ? this.googleEventsForDate(g) : []).length, V = m.length > 0 || _ > 0;
      r.push({
        date: g,
        day: l.getDate(),
        taskCount: m.length,
        outside: l.getMonth() !== o,
        today: g === a,
        selected: g === this.selectedDate,
        hasDot: V,
        title: _ || m.length ? `${this.friendlyDate(g)} · ${_} 项日程${m.length ? ` · ${m.length} 个任务` : ""}` : `${this.friendlyDate(g)} · 拖入任务设置截止日期`
      });
    }
    const d = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], p = `${this.todoistTasks.filter((h) => h.due?.date && !h.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, w = this.selectedDate || a, S = (this.isGoogleConnected ? this.googleEventsForDate(w) : []).map((h) => ({
      id: h.id || String(Math.random()),
      time: h.start?.date ? "全天" : new Date(h.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: h.summary || "（无标题）",
      subtitle: h.location || h._calendarName || "Google 日历",
      htmlLink: h.htmlLink || "",
      color: h._calendarColor || "var(--accent)"
    }));
    S.sort((h, l) => {
      const g = (h.time || "").replace(/[^\d:]/g, ""), m = (l.time || "").replace(/[^\d:]/g, "");
      return g.localeCompare(m);
    }), ke.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: p,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${S.length ? `${S.length} 项日程 · ` : ""}${d.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: r,
      detailTasks: d.map((h) => ({
        id: String(h.id),
        content: String(h.content || "未命名任务"),
        description: String(h.description || ""),
        labels: Array.isArray(h.labels) ? h.labels.map(String) : [],
        priority: Number(h.priority || 1),
        url: String(h.url || `https://app.todoist.com/app/task/${h.id}`)
      })),
      detailEvents: S
    }), b.updateState({ summary: p }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = this.dateKey(/* @__PURE__ */ new Date()), a = this.selectedDate || n, r = Array.from({ length: 42 }, (d, p) => {
      const w = new Date(e, o, 1 - i + p), k = this.dateKey(w);
      return {
        date: k,
        dayNumber: w.getDate(),
        isOutside: w.getMonth() !== o,
        isToday: k === n,
        isSelected: k === a,
        itemCount: 0,
        title: k,
        hasDot: !1
      };
    });
    Y.updateState({
      badgeText: "Todoist",
      monthLabel: ht[o],
      yearLabel: String(e),
      cells: r,
      selectedDate: a
    });
  }
}
const yt = new gt();
export {
  ke as a,
  Tt as b,
  yt as c,
  Y as d,
  we as e,
  b as f,
  kt as g,
  Dt as h,
  ye as i,
  c as j,
  T as k,
  $ as l,
  st as m,
  R as n,
  ut as o,
  St as t
};
