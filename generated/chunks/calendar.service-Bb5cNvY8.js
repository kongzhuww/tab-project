import { t as C, w as ee } from "./system-theme-V_tLotZp.js";
import { t as u, p as Fe, a as le, c as we, i as _e, b as Ve } from "./todoist.service-ygsqjft3.js";
import { r as R, a as ze } from "./vendor-vue-BkY5-p5y.js";
import { w as N } from "./window-manager.store-fHSi_Uh8.js";
import { t as X } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
import { openTodoistTask as Ke } from "./task-navigation-B0GzLoZR.js";
const G = R({
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
let x = {}, je = !1;
function Ye(t) {
  Object.assign(G, t, {
    cells: t.cells ? [...t.cells] : G.cells,
    detailTasks: t.detailTasks ? [...t.detailTasks] : G.detailTasks,
    detailEvents: t.detailEvents ? [...t.detailEvents] : G.detailEvents
  });
}
function qe(t) {
  x = Object.freeze({ ...t });
}
function Ue(t) {
  const e = Object.freeze({ ...t });
  return x = e, () => {
    x === e && (x = {});
  };
}
function He(t) {
  je = t;
}
function xe(t) {
  G.dropDate = String(t || "");
}
function Be(t) {
  x.selectDate?.(t);
}
function Je() {
  x.previousMonth?.();
}
function Ze() {
  x.nextMonth?.();
}
function Qe() {
  x.goToday?.();
}
function Xe() {
  x.closeDetail?.();
}
async function et(t, e) {
  await x.dropTask?.(t, e);
}
function tt(t, e = !1) {
  x.openTask?.(t, e);
}
function st(t) {
  xe(t), x.highlightDrop?.(t);
}
const ye = Object.freeze({
  update: Ye,
  setActions: qe,
  attachActions: Ue,
  setMounted: He,
  setDropDate: xe,
  selectDate: Be,
  previousMonth: Je,
  nextMonth: Ze,
  goToday: Qe,
  closeDetail: Xe,
  dropTask: et,
  openTask: tt,
  highlightDrop: st,
  get snapshot() {
    return G;
  },
  get active() {
    return je;
  }
}), ot = R({ labels: [] });
let Ae = {}, Le = !1, ue = 0, Y;
function it() {
  ue++, Y?.abort(), Y = void 0;
}
function Ee(t) {
  ot.labels = t.map((e) => ({ ...e }));
}
async function nt() {
  if (!C.active) return;
  it();
  const t = new AbortController();
  Y = t;
  const e = ue, o = C.session;
  try {
    const s = await u.getLabels(t.signal);
    !t.signal.aborted && e === ue && o === C.session && C.active && Array.isArray(s) && Ee(s.map((i) => ({ id: i.id, name: i.name })));
  } catch {
    t.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    Y === t && (Y = void 0);
  }
}
function at(t) {
  Ae = Object.freeze({ ...t });
}
function rt(t) {
  Le = t;
}
function ct(t, e) {
  Ae.startDrag?.(t, e);
}
const Ct = Object.freeze({
  update: Ee,
  refresh: nt,
  setActions: at,
  setMounted: rt,
  startDrag: ct,
  get active() {
    return Le;
  }
}), c = R({
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
let he = 0, q;
function Ce() {
  he++, q?.abort(), q = void 0, c.loading = !1;
}
const ve = {
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
    return oe.add(t), () => {
      oe.delete(t);
    };
  },
  async loadWorkspace(t, e, o = !1) {
    if (!C.active) return;
    if (c.movingTaskId) {
      c.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    Ce();
    const s = new AbortController();
    q = s;
    const i = C.session, n = he, r = () => !s.signal.aborted && C.active && i === C.session && n === he, a = t || c.view || typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox", d = e || (a === "projects" ? c.activeProjectId || u.getActiveProjectId() : void 0), h = a !== c.view || a === "projects" && d !== c.activeProjectId;
    if (c.view = a, typeof localStorage < "u")
      try {
        localStorage.setItem("todoist_last_active_view", a);
      } catch {
      }
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        chrome.storage.local.set({ todoist_last_active_view: a });
      } catch {
      }
    const S = (w) => {
      if (!r()) return;
      const l = we(), D = {
        ...w,
        projects: w.projects.map((g) => ({ ...g })),
        availableLabels: [...w.availableLabels || []],
        columns: w.columns.map((g) => ({
          ...g,
          _groupRaw: g._groupRaw ? { ...g._groupRaw } : void 0,
          tasks: g.tasks.map((p) => ({
            ...p,
            startDate: l(p.id, p.description),
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
        ...D,
        view: a,
        loading: !1,
        emptyText: D.readWarning || (D.columns.length ? "" : "暂无待办任务")
      }), window.LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: a === "projects" ? "项目" : a === "today" ? "今天" : "收件箱"
      });
    }, m = o ? null : u.getFastSnapshot(a, d);
    m && m.columns && m.columns.length > 0 ? S(m) : h && !c.columns.length ? (this.updateState({ columns: [], emptyText: "", activeProjectId: d || "" }), this.setLoading(!0)) : c.columns.length || this.setLoading(!0);
    try {
      if (await u.initToken(), !r()) return;
      if (c.accountConfigured = !!u.getToken().trim(), !c.accountConfigured) {
        this.updateState({ loading: !1, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      if (!m && !o) {
        const l = await u.getCachedWorkspaceData(a, d);
        if (!r()) return;
        l && Array.isArray(l.columns) && l.columns.length > 0 && (S(l), this.setLoading(!1));
      }
      const w = await u.loadWorkspaceData(a, d, o, s.signal);
      S(w);
    } catch (w) {
      r() && (this.setLoading(!1), this.updateState({ emptyText: le(w) }));
    } finally {
      q === s && (q = void 0);
    }
  },
  async moveTask(t, e, o) {
    const s = c, i = (f) => (s.moveMessage = f, s.moveError = !0, !1);
    if (!C.active || s.movingTaskId) return !1;
    if (s.moveNeedsRefresh) return i("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const n = s.columns.find((f) => f.tasks.some((k) => k.id === t)), r = n?.tasks.find((f) => f.id === t);
    if (!n || !r || r.completed || t.startsWith("optimistic-")) return i("任务尚未保存或已完成，不能移动。");
    if (o === t) return !0;
    const a = s.view, d = s.activeProjectId, h = s.columns, S = n.tasks.indexOf(r), m = n.tasks[S + 1]?.id, w = n.tasks[S - 1]?.id, l = {
      dueDate: r.dueDate,
      dueText: r.dueText,
      dueString: r.dueString,
      isDueToday: r.isDueToday,
      isOverdue: r.isOverdue
    }, D = a === "today", g = D && !e.projectId;
    if (e.dueDate && (!D || e.dueDate !== (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")))
      return i("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    if (!e.dueDate && e.sectionId === void 0) return i("目标板块未就绪，未提交移动。");
    if (!e.dueDate && !e.projectId && !g) return i("目标项目未就绪，未提交移动。");
    const p = e.dueDate ? s.columns.find((f) => f.sectionId === "today") : g ? s.columns.find((f) => f.sectionId === e.sectionId) : s.columns.find((f) => f.projectId === e.projectId && f.sectionId === e.sectionId), T = e.dueDate ? n.sectionId !== "today" : !g && (String(r._taskRaw?.project_id || n.projectId || "") !== e.projectId || String(r._taskRaw?.section_id || n.sectionId || "") !== e.sectionId);
    if (!T && n === p && o === void 0 && n.tasks[n.tasks.length - 1]?.id === t) return !0;
    if (g && e.sectionId === "overdue" && n.sectionId !== "overdue")
      return i("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    const b = o ? p?.tasks.find((f) => f.id === o) : void 0;
    if (g && !p || o && !b)
      return i("目标板块或任务已改变，请重新拖动。");
    const M = T && !g ? "" : String(r._taskRaw?.parent_id || ""), Se = e.projectId || String(r._taskRaw?.project_id || n.projectId || ""), Ge = e.projectId ? e.sectionId : String(r._taskRaw?.section_id || "");
    if (b && !D && String(b._taskRaw?.parent_id || "") !== M)
      return i("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    const De = (p?.tasks || []).filter((f) => f.id !== t && (D || String(f._taskRaw?.parent_id || "") === M)), Te = b ? De.findIndex((f) => f.id === b.id) + 1 : De.length + 1;
    if (p && Te < 1) return i("目标任务位置已改变，请重试拖动。");
    s.movingTaskId = t, s.moveMessage = "位置已在本页移动，正在后台保存…", s.moveError = !1, Ce(), u.invalidateWorkspaceSnapshots();
    let te = !1, A, B = !1, J = !1;
    const ke = () => h === s.columns && a === s.view && d === s.activeProjectId, se = (f) => {
      if (!ke()) return !1;
      const k = s.columns.find((v) => v.tasks.some((L) => L.id === t)), I = k?.tasks.find((v) => v.id === t) || (B && J ? r : void 0);
      if (!I) return !1;
      let j = e.dueDate ? s.columns.find((v) => v.sectionId === "today") : g ? s.columns.find((v) => v.sectionId === e.sectionId) : s.columns.find((v) => v.projectId === e.projectId && v.sectionId === e.sectionId);
      const Z = !j && D && !g;
      if (Z && (j = n), !j && g) return !1;
      if (k && k.tasks.splice(k.tasks.indexOf(I), 1), A) {
        const v = { ...I._taskRaw };
        for (const L of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"])
          Object.prototype.hasOwnProperty.call(A, L) && (v[L] = A[L]);
        I._taskRaw = v;
      }
      if (e.dueDate && (I.dueDate = A?.due?.date || e.dueDate, I.dueText = "今天", I.dueString = A?.due?.string || e.dueDate, I.isDueToday = !0, I.isOverdue = !1), j) {
        const v = Z ? Math.min(S, j.tasks.length) : f && o ? j.tasks.findIndex((L) => L.id === o) : -1;
        j.tasks.splice(v < 0 ? j.tasks.length : v, 0, I);
      }
      return J = !j, !0;
    }, Ne = () => {
      if (!B || !ke() || !s.columns.includes(n)) return !1;
      const f = s.columns.find((v) => v.tasks.some((L) => L.id === t)), k = f?.tasks.find((v) => v.id === t) || (J ? r : void 0);
      if (!k) return !1;
      f && f.tasks.splice(f.tasks.indexOf(k), 1);
      const I = m ? n.tasks.findIndex((v) => v.id === m) : -1, j = w ? n.tasks.findIndex((v) => v.id === w) : -1, Z = I >= 0 ? I : j >= 0 ? j + 1 : Math.min(S, n.tasks.length);
      return n.tasks.splice(Z, 0, k), e.dueDate && k.dueDate === e.dueDate && k.dueText === "今天" && k.dueString === e.dueDate && k.isDueToday && !k.isOverdue && Object.assign(k, l), J = !1, !0;
    };
    try {
      return await ee(async () => {
        try {
          if (B = se(!0), !B) throw new Error("看板已改变");
          if (T) {
            if (A = e.dueDate ? await u.setTaskDueDate(t, e.dueDate) : await u.moveTask(t, { projectId: e.projectId, sectionId: e.sectionId }), e.dueDate && String(A?.due?.date || "").slice(0, 10) !== e.dueDate)
              throw new Error("截止日期回复未确认");
            te = !0;
          }
          if (p && (!T || o)) {
            const k = await u.reorderTask(t, Te, D);
            if (Se && String(k.project_id) !== Se || String(k.section_id || "") !== Ge || String(k.parent_id || "") !== M)
              throw te = !1, new Error("任务位置在保存期间发生变化，请刷新核对");
            A = { ...A, ...k };
          }
          const f = se(!0);
          return s.moveMessage = f ? "" : "任务位置已保存；看板已切换，请手动刷新核对。", !0;
        } catch {
          if (s.moveNeedsRefresh = !0, te)
            return se(!1), i("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          const f = Ne();
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
      let s = String(e?.content || "").trim();
      const i = e?.view || c.view || "inbox";
      let n = e?.projectId || e?.group?.projectId || void 0, r = e?.sectionId !== void 0 ? e.sectionId : e?.group?.sectionId, a = e?.dueDate, d = e?.dueText, h = e?.dueString;
      if (!a && !h && s) {
        const m = Fe(s);
        m && (a = m.date, d = m.label + (m.time ? ` ${m.time}` : ""), h = m.time ? `${m.date} ${m.time}` : m.date, s = m.cleanTitle || s);
      }
      i === "projects" ? n || (n = c.activeProjectId || void 0) : i === "today" && !a && !h && (h = "today", a = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), d = "今天");
      const S = r || void 0;
      if (s) {
        const m = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, w = {
          id: m,
          content: s,
          completed: !1,
          priority: 1,
          labels: [],
          dueDate: a || "",
          dueText: d || (a ? a.slice(5) : h === "today" ? "今天" : ""),
          dueString: h || a || "",
          isOverdue: !1
        };
        let l = c.columns.find((T) => !!(e?.group && T === e.group || r !== void 0 && T.sectionId === r));
        !l && c.columns.length > 0 && (l = c.columns[0]), l && l.tasks.push(w);
        const D = Array.isArray(e?.attachments) ? e.attachments : [];
        D.length > 0 && (w.description = D.map((T) => `![${T.file_name}](${T.file_url})`).join(`

`));
        const g = {
          content: s,
          project_id: n,
          section_id: S
        };
        return a ? g.due_date = a : h && (g.due_string = h), (D.length > 0 ? u.createTaskWithAttachments({
          ...g,
          attachments: D
        }) : u.createTask(g)).then((T) => {
          if (T && T.id) {
            w.id = String(T.id), w._taskRaw = T, T.url && (w.url = T.url);
            try {
              u.updateLocalCacheOnTaskCreated(T, i, n, l?.sectionId);
            } catch {
            }
          }
          return !0;
        }).catch((T) => {
          if (console.error("[Todoist] Create task error:", T), l) {
            const b = l.tasks.findIndex((M) => M.id === m);
            b >= 0 && l.tasks.splice(b, 1);
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
          r.completed = a, u.getToken() && u.toggleTaskCompletion(s, a), ee(async () => {
            const { todoistCalendarSidebarController: d } = await Promise.resolve().then(() => ft);
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
    for (const s of oe)
      try {
        s(t, e);
      } catch (i) {
        console.error(`[TodoistTaskList] Handler error for action ${t}:`, i);
      }
  }
}, dt = typeof localStorage < "u" && localStorage.getItem("todoist_last_active_view") || "inbox", Re = R({ view: dt });
let ge = {}, Me = !1;
function Oe(t) {
  if (Re.view = t, typeof localStorage < "u")
    try {
      localStorage.setItem("todoist_last_active_view", t);
    } catch {
    }
}
function lt(t) {
  ge = Object.freeze({ ...t });
}
function ut(t) {
  Me = t;
}
async function ht(t) {
  Oe(t), await ve.loadWorkspace(t), ge.switchView && await ge.switchView(t);
}
const bt = ze(Re), It = Object.freeze({
  update: Oe,
  setActions: lt,
  setMounted: ut,
  switchView: ht,
  get active() {
    return Me;
  }
});
function F(t = /* @__PURE__ */ new Date()) {
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const $e = "todoist_local_completed_tasks_v1";
function Pe() {
  try {
    const t = JSON.parse(localStorage.getItem($e) || "{}");
    return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).filter(([, e]) => e && typeof e == "object" && typeof e.id == "string" && typeof e.content == "string"));
  } catch {
    return {};
  }
}
function gt(t) {
  localStorage.setItem($e, JSON.stringify(t));
}
function fe(t) {
  const e = t.completedAt || t.completed_at || t.completed_date, o = new Date(e || "");
  return Number.isFinite(o.getTime()) ? F(o) : "";
}
function me(t, e = we()) {
  const o = t._taskRaw || t.raw || t, s = String(t.task_id || t.id), i = t.description || o.description || "", n = t.startDate || e(s, i), r = o.due?.datetime || o.due?.date || t.dueDate || "";
  let a = Ve(n || r);
  if (!n && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(r)) {
    const d = new Date(r);
    Number.isFinite(d.getTime()) && (a = {
      date: F(d),
      time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
    });
  }
  return {
    id: s,
    content: t.content || "未命名任务",
    completed: typeof t.completed == "boolean" ? t.completed : _e(t),
    priority: t.priority || 1,
    labels: t.labels || [],
    raw: o,
    scheduledDate: a.date,
    time: a.time,
    dueText: o.due?.string || o.due?.date || "",
    thumbUrl: i.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let $ = [], V = 0;
const E = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Set(), y = R({
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
}), ie = /* @__PURE__ */ new Set();
let pe = 0, H;
function W() {
  pe++, H?.abort(), H = void 0, y.todoLoading = !1;
}
function z() {
  const t = y, e = we(), o = $.filter((a) => !_e(a)).map((a) => me(a, e)), s = t.selectedDate, i = Object.values(Pe()).filter((a) => !U.has(a.id)), n = /* @__PURE__ */ new Map();
  for (const a of [...E.get(s)?.items || [], ...i])
    !U.has(a.id) && (a.scheduledDate || fe(a)) === s && n.set(a.id, a);
  for (const a of o) a.scheduledDate === s && n.set(a.id, a);
  t.todoItems = [...n.values()].sort((a, d) => Number(a.completed) - Number(d.completed) || (a.time || "").localeCompare(d.time || "")), t.agendaTitle = s === F() ? X("todoist.calendar.todayTasks") : X("todoist.calendar.dateTasks", { date: s });
  const r = /* @__PURE__ */ new Map();
  for (const a of [...Array.from(E.values()).flatMap((d) => d.items), ...i, ...o]) {
    const d = a.scheduledDate || fe(a);
    d && (r.has(d) || r.set(d, /* @__PURE__ */ new Set()), r.get(d).add(a.id));
  }
  for (const a of t.cells)
    a.itemCount = r.get(a.date)?.size || 0, a.hasDot = a.itemCount > 0, a.title = a.itemCount ? X("todoist.calendar.cellTaskCount", { date: a.date, count: a.itemCount }) : a.date;
}
const K = {
  state: y,
  cancelReads: W,
  invalidateReads() {
    W(), V = 0, E.clear(), U.clear();
  },
  setCollapsed(t) {
    y.collapsed = t;
  },
  toggleCollapsed() {
    this.setCollapsed(!y.collapsed), this.dispatch("toggle-collapsed", y.collapsed);
  },
  recordTaskCompletion(t, e) {
    W(), V = 0;
    const o = String(t.task_id || t.id), s = Pe();
    if (e) {
      U.delete(o);
      const i = me(t);
      s[o] = { ...i, scheduledDate: t.scheduledDate || i.scheduledDate, completed: !0, completedAt: (/* @__PURE__ */ new Date()).toISOString() }, $ = $.filter((n) => String(n.id) !== o);
    } else
      U.add(o), delete s[o], $.some((i) => String(i.id) === o) || $.push({ ...t.raw || t._taskRaw || t, id: o, checked: !1, is_completed: !1, completed: !1 });
    try {
      gt(s);
    } catch {
      y.writeError = "完成状态的本机记录未保存，请核对。";
    }
    E.clear(), z();
  },
  async loadTodosForDate(t, e = !1) {
    if (!C.active || C.pendingWrites) return;
    W();
    const o = new AbortController();
    H = o;
    const s = pe, i = C.session;
    t ||= F();
    const n = () => !o.signal.aborted && s === pe && i === C.session && C.active && y.selectedDate === t && !C.pendingWrites;
    y.selectedDate = t, y.emptyText = "", z(), y.todoLoading = !0;
    try {
      if (e || !V || Date.now() - V > 3e4) {
        const a = await u.listCalendarTasks(o.signal);
        if (!n()) return;
        $ = a, V = Date.now(), z();
      }
      const r = E.get(t);
      if (e || !r || Date.now() - r.savedAt > 3e4) {
        const a = /* @__PURE__ */ new Date(`${t}T00:00:00`);
        a.setDate(a.getDate() + 1);
        try {
          const d = await u.getCompletedTasks({ since: (/* @__PURE__ */ new Date(`${t}T00:00:00`)).toISOString(), until: a.toISOString(), limit: 200 }, o.signal);
          if (!n()) return;
          const h = d.items.filter((S) => fe(S) === t).map((S) => ({
            ...me(S),
            completed: !0,
            completedAt: S.completed_at
          }));
          E.set(t, { items: h, savedAt: Date.now() }), E.size > 42 && E.delete(E.keys().next().value);
        } catch (d) {
          n() && (y.emptyText = "完成历史：" + le(d) + " 现有任务保留。");
        }
      }
      n() && z();
    } catch (r) {
      n() && (y.emptyText = le(r) + " 当前日期的已有数据保留。");
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
        if (await u.toggleTaskCompletion(t.id, e), this.recordTaskCompletion(t, e), u.invalidateWorkspaceSnapshots(), e)
          for (const o of c.columns) o.tasks = o.tasks.filter((s) => String(s.id) !== t.id);
        else C.active && await ve.loadWorkspace(void 0, void 0, !0);
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
    return ie.add(t), () => {
      ie.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of ie)
      try {
        o(t, e);
      } catch {
        y.emptyText = "日历操作未完成，请重新打开。";
      }
  }
}, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTodoistDateReads: W,
  getLocalTodayDateStr: F,
  todoistCalendarSidebarController: K,
  todoistCalendarSidebarState: y
}, Symbol.toStringTag, { value: "Module" })), O = R({
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
}), ne = /* @__PURE__ */ new Set(), _t = {
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
    ve.loadWorkspace(void 0, void 0, !0);
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
    return ne.add(t), () => {
      ne.delete(t);
    };
  },
  dispatch(t, e) {
    for (const o of ne) o(t, e);
  }
}, We = R({ visible: !1, active: !1 }), ae = R({
  get isOpen() {
    return We.visible;
  },
  title: "任务日历",
  summary: "Todoist 截止日期",
  statusText: "",
  isLoading: !1
});
let P;
const _ = {
  get state() {
    return ae;
  },
  get ready() {
    return !!P && We.active;
  },
  attach(t) {
    return P = t, () => {
      P === t && (P = void 0);
    };
  },
  updateState(t) {
    Object.assign(ae, t);
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
    ae.statusText = t;
  }
}, be = "todoistCalendarCacheV1", re = "googleCalendarDayLineCacheV1", Q = "googleCalendarSessionTokenV1", ce = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly", mt = [
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
function Ie(t) {
  return typeof window.storageGet == "function" ? window.storageGet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(t, e) : e({});
  });
}
async function de(t) {
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
      const o = (await Ie([re]))?.[re];
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
    const e = await Ie(["gmailOAuthClientId"]);
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
    if (s?.token && s.scope === ce && Number(s.expiresAt || 0) > Date.now() + 3e4)
      return s.token;
    const i = await this.loadGoogleCalendarClientId();
    if (!/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(i))
      throw new Error("请先在设置中填写 Google OAuth Client ID");
    const n = new URL("https://accounts.google.com/o/oauth2/v2/auth"), r = crypto.randomUUID();
    n.searchParams.set("client_id", i), n.searchParams.set("redirect_uri", chrome.identity.getRedirectURL("google")), n.searchParams.set("response_type", "token"), n.searchParams.set("scope", ce), n.searchParams.set("include_granted_scopes", "true"), n.searchParams.set("prompt", e ? "consent" : "none"), n.searchParams.set("state", r);
    const a = await chrome.identity.launchWebAuthFlow({ url: n.href, interactive: e });
    if (!a) throw new Error(e ? "Google 授权已取消" : "Google 日历尚未连接");
    const d = new URLSearchParams(new URL(a).hash.replace(/^#/, ""));
    if (d.get("state") !== r) throw new Error("Google 授权状态校验失败");
    if (d.get("error")) throw new Error(d.get("error_description") || d.get("error") || "");
    const h = d.get("access_token");
    if (!h) throw new Error("Google 没有返回日历访问令牌");
    return await chrome.storage.local.set({
      [Q]: {
        token: h,
        scope: ce,
        expiresAt: Date.now() + Math.max(300, Number(d.get("expires_in") || 3600)) * 1e3
      }
    }), h;
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
        (h) => h.selected !== !1 && h.accessRole !== "freeBusyReader"
      ), d = [];
      for (const h of a)
        try {
          const S = new URLSearchParams({
            singleEvents: "true",
            orderBy: "startTime",
            showDeleted: "false",
            maxResults: "250",
            timeMin: s.start.toISOString(),
            timeMax: s.end.toISOString()
          });
          ((await this.googleCalendarApi(`/calendars/${encodeURIComponent(h.id)}/events?${S}`))?.items || []).forEach((w) => {
            d.push({
              ...w,
              _calendarId: h.id,
              _calendarName: h.summary || "Google 日历",
              _calendarColor: h.backgroundColor || "#2563eb",
              _calendarAccessRole: h.accessRole || "reader"
            });
          });
        } catch {
        }
      this.googleCalendars = a, this.googleEvents = d, this.googleSavedAt = Date.now(), this.googleRangeStart = s.startKey, this.googleRangeEnd = s.endKey, this.isGoogleConnected = !0, await de({
        [re]: {
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
    return o?.aborted ? Promise.resolve(!1) : this.taskWrites.size ? (_.setStatusText("截止日期正在提交，未开始刷新。"), Promise.resolve(!1)) : !o && this.todoistLoad ? this.todoistLoad : !e && this.todoistTasks.length && Date.now() - this.todoistSavedAt < 2 * 6e4 ? (this.publishCalendarViews(), Promise.resolve(!0)) : o ? this.readTodoistCalendar(o) : (this.todoistLoad = this.readTodoistCalendar().finally(() => {
      this.todoistLoad = null;
    }), this.todoistLoad);
  }
  async readTodoistCalendar(e) {
    const o = this.taskRevision, s = ++this.taskReadSequence, i = () => !e?.aborted && s === this.taskReadSequence && o === this.taskRevision;
    this.isTodoistLoading = !0, _.updateState({ isLoading: !0, statusText: "正在读取 Todoist 任务…" });
    try {
      const { todoistService: n } = await import("./todoist.service-ygsqjft3.js").then((a) => a.e);
      if (!i()) return !1;
      const r = await n.listCalendarTasks(e);
      if (!i()) return !1;
      if (!Array.isArray(r)) throw new Error("任务返回格式无效");
      this.todoistTasks = r, this.todoistSavedAt = Date.now();
      try {
        await de({
          [be]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
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
        const { todoistService: n } = await import("./todoist.service-ygsqjft3.js").then((d) => d.e), r = await n.setTaskDueDate(s, o);
        if (!r || String(r.id) !== s) throw new Error("任务更新结果未确认");
        const a = this.todoistTasks.findIndex((d) => String(d.id) === s);
        a >= 0 ? this.todoistTasks[a] = r : this.todoistTasks.push(r), this.todoistSavedAt = Date.now(), this.publishCalendarViews();
        try {
          await de({
            [be]: { tasks: this.todoistTasks, savedAt: this.todoistSavedAt }
          }), _.setStatusText("Todoist 截止日期已更新。");
        } catch {
          _.setStatusText("Todoist 已更新，但本地缓存保存失败；不要重复提交。");
        }
        return r;
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
    this.dropDate = String(e || ""), ye.setDropDate(this.dropDate);
  }
  openTask(e, o = !1) {
    const s = this.todoistTasks.find((i) => String(i.id) === String(e));
    s && (o ? window.open(s.url || `https://app.todoist.com/app/task/${s.id}`, "_blank", "noopener,noreferrer") : Ke(String(s.id)));
  }
  publishCalendarViews() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = new Date(e, o, 1 - i), r = this.dateKey(/* @__PURE__ */ new Date()), a = [];
    for (let l = 0; l < 42; l++) {
      const D = new Date(n);
      D.setDate(n.getDate() + l);
      const g = this.dateKey(D), p = this.tasksForDate(g), b = (this.isGoogleConnected ? this.googleEventsForDate(g) : []).length, M = p.length > 0 || b > 0;
      a.push({
        date: g,
        day: D.getDate(),
        taskCount: p.length,
        outside: D.getMonth() !== o,
        today: g === r,
        selected: g === this.selectedDate,
        hasDot: M,
        title: b || p.length ? `${this.friendlyDate(g)} · ${b} 项日程${p.length ? ` · ${p.length} 个任务` : ""}` : `${this.friendlyDate(g)} · 拖入任务设置截止日期`
      });
    }
    const d = this.selectedDate ? this.tasksForDate(this.selectedDate) : [], h = `${this.todoistTasks.filter((l) => l.due?.date && !l.due?.is_recurring).length} 个特定截止日任务 · 拖放可同步 Todoist`, S = this.selectedDate || r, w = (this.isGoogleConnected ? this.googleEventsForDate(S) : []).map((l) => ({
      id: l.id || String(Math.random()),
      time: l.start?.date ? "全天" : new Date(l.start?.dateTime || "").toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 }),
      summary: l.summary || "（无标题）",
      subtitle: l.location || l._calendarName || "Google 日历",
      htmlLink: l.htmlLink || "",
      color: l._calendarColor || "var(--accent)"
    }));
    w.sort((l, D) => {
      const g = (l.time || "").replace(/[^\d:]/g, ""), p = (D.time || "").replace(/[^\d:]/g, "");
      return g.localeCompare(p);
    }), ye.update({
      monthTitle: this.currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" }),
      summary: h,
      selectedDate: this.selectedDate,
      detailDate: this.selectedDate ? this.friendlyDate(this.selectedDate) : "",
      detailCount: this.selectedDate ? `${w.length ? `${w.length} 项日程 · ` : ""}${d.length} 个任务` : "",
      dropDate: this.dropDate,
      cells: a,
      detailTasks: d.map((l) => ({
        id: String(l.id),
        content: String(l.content || "未命名任务"),
        description: String(l.description || ""),
        labels: Array.isArray(l.labels) ? l.labels.map(String) : [],
        priority: Number(l.priority || 1),
        url: String(l.url || `https://app.todoist.com/app/task/${l.id}`)
      })),
      detailEvents: w
    }), _.updateState({ summary: h }), this.syncSidebarToVue();
  }
  syncSidebarToVue() {
    const e = this.currentMonth.getFullYear(), o = this.currentMonth.getMonth(), i = (new Date(e, o, 1).getDay() + 6) % 7, n = this.dateKey(/* @__PURE__ */ new Date()), r = this.selectedDate || n, a = Array.from({ length: 42 }, (d, h) => {
      const S = new Date(e, o, 1 - i + h), m = this.dateKey(S);
      return {
        date: m,
        dayNumber: S.getDate(),
        isOutside: S.getMonth() !== o,
        isToday: m === n,
        isSelected: m === r,
        itemCount: 0,
        title: m,
        hasDot: !1
      };
    });
    K.updateState({
      badgeText: "Todoist",
      monthLabel: pt(o),
      yearLabel: String(e),
      cells: a,
      selectedDate: r
    });
  }
}
const jt = new wt();
export {
  ye as a,
  It as b,
  jt as c,
  K as d,
  ve as e,
  _ as f,
  _t as g,
  bt as h,
  Ce as i,
  c as j,
  y as k,
  W as l,
  it as m,
  O as n,
  Ct as t
};
