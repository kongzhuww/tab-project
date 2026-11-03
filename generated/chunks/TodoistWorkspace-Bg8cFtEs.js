import { d as Ht, o as l, f as u, F as st, g as t, u as d, C as Q, r as Jt, z as zt, y as dt, D as ee, n as Ut, t as x, i as ut, j as F, h as I, b as P, O as Qe, J as Be, B as bt, x as it, H as Rt, m as Pt, p as Kt, E as Zt, w as le, l as St, e as Mt, A as Re, G as ko } from "./vendor-vue-wIH4jcna.js";
import { a as yo, t as q, w as wo, o as ho, p as To } from "./module-state-BmW4SrQd.js";
import { b as He, h as Ne, i as te, j as wt, e as J, d as gt, c as Do, k as xo, t as Ve, g as $e, l as Co, m as $o, n as So } from "./calendar.service-_YumC_hP.js";
import { u as Je } from "./useWindowDraggable-CUOTL3np.js";
import { w as pe, b as Io } from "./window-manager.store-DgNn9Rtk.js";
import { A as Ro } from "./AccountSetupGuide-TNciZwtl.js";
import { i as Pe } from "./image-viewer-store-DoWktCFt.js";
import { q as ot, n as _o } from "./view-styles-D0JCpx33.js";
import { t as nt, d as Lo, s as Po, b as me, g as Ke, f as Se, p as Mo } from "./todoist.service-BwvB2mGP.js";
import { u as Ze, g as to, I as _e, T as Le, a as Oo } from "./TodoistDatePickerPopover-Bc07IbMy.js";
import { _ as oe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { A as eo } from "./search.service-B8FaDQLd.js";
import { m as Ao } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Fe } from "./task-navigation-CFuqS02f.js";
const jo = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspaceTabs",
  setup(i) {
    return (n, c) => (l(), u(st, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: Q({ on: d(Ne).view === "inbox" }),
        title: "收件箱",
        onClick: c[0] || (c[0] = (m) => d(He).switchView("inbox"))
      }, [...c[2] || (c[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: Q({ on: d(Ne).view === "projects" }),
        title: "项目",
        onClick: c[1] || (c[1] = (m) => d(He).switchView("projects"))
      }, [...c[3] || (c[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), oo = "todoist_reminder_v2:", Eo = "todoist_remind_";
async function Wo(i) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const n = oo + i, c = await chrome.storage.local.get([n, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(c, n) ? c[n] || void 0 : c.todoist_reminders_map_v1?.[i];
}
async function Uo(i, n, c) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const m = new Date(n).getTime();
  if (n && (!Number.isFinite(m) || m <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (n && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const C = oo + i, r = Eo + i;
  await chrome.alarms.clear(r), await chrome.storage.local.set({ [C]: n ? { time: n, title: c } : null }), n && await chrome.alarms.create(r, { when: m });
}
const Lt = Jt(/* @__PURE__ */ new Map());
let zo = 0;
function Ye(i, n, c, m = "editing") {
  const C = ++zo;
  return Lt.set(i, { revision: C, title: n, description: c, status: m, error: "" }), C;
}
const b = Jt({
  isOpen: !1,
  taskId: "",
  title: "",
  description: "",
  priority: 1,
  startDate: "",
  startTime: "",
  dueDate: "",
  dueTime: "",
  labels: [],
  reminderTime: "",
  comments: [],
  commentAttachments: [],
  loading: !1,
  saving: !1,
  error: "",
  url: ""
});
let Ie = Promise.resolve(), fe = 0, Ge = Promise.resolve();
const ve = /* @__PURE__ */ new Map();
let re = 0;
const Ft = /* @__PURE__ */ new Map();
function ae(i = !0) {
  i && re++;
  for (const n of Ft.values()) n.abort();
  Ft.clear(), b.loading = !1;
}
function Xe(i) {
  Ft.get(i)?.abort();
  const n = new AbortController();
  Ft.set(i, n);
  const c = re, m = b.taskId;
  return {
    signal: n.signal,
    current: () => !n.signal.aborted && c === re && b.isOpen && m === b.taskId && Ft.get(i) === n,
    finish: () => {
      Ft.get(i) === n && Ft.delete(i);
    }
  };
}
function Wt() {
  ae(!1);
  const i = b.taskId, n = re;
  return { taskId: i, current: () => b.isOpen && n === re && i === b.taskId };
}
function Bo(i) {
  return new Promise((n) => {
    const c = new FileReader();
    c.onload = () => n(c.result || ""), c.onerror = () => n(""), c.readAsDataURL(i);
  });
}
function qe(i, n, c) {
  for (const m of wt.columns)
    for (const C of m.tasks)
      String(C.id) === i && (C.content = n, c !== void 0 && (C.description = c), C._taskRaw && (C._taskRaw.content = n, c !== void 0 && (C._taskRaw.description = c)));
  gt.updateTaskTitle(i, n);
}
const Ho = {
  state: b,
  cancelReads: ae,
  stageTitleDraft(i, n, c) {
    i && (Ye(i, n, c), ae(!1), b.taskId === i && (b.title = n), qe(i, n, c));
  },
  async openTask(i, n) {
    if (!i) return;
    if (ae(), b.taskId = i, b.isOpen = !0, b.error = "", Object.assign(b, {
      title: "",
      description: "",
      priority: 1,
      startDate: "",
      startTime: "",
      dueDate: "",
      dueTime: "",
      labels: [],
      reminderTime: "",
      comments: [],
      commentAttachments: [],
      url: ""
    }), n) {
      b.title = n.content || n.title || "", b.description = n.description || n.raw?.description || "", b.priority = n.priority || 1;
      const r = me(n.due?.datetime || n.due?.date || n.dueDate || "");
      b.dueDate = r.date, b.dueTime = r.time;
      const O = n.startDate || Ke(i, b.description), S = me(O);
      b.startDate = S.date, b.startTime = S.time, b.labels = [...n.labels || []], b.url = n.url || "";
    }
    const c = Lt.get(i);
    c && (b.title = c.title, b.description = c.description);
    const m = Xe("reminder");
    Wo(i).then((r) => {
      m.current() && (b.reminderTime = r?.time || "");
    }).catch(() => {
      m.current() && (b.error = "本机提醒读取失败。");
    }).finally(m.finish);
    const C = Xe("detail");
    b.loading = !0;
    try {
      const r = await nt.api(`/tasks/${encodeURIComponent(i)}`, { signal: C.signal });
      if (r && C.current()) {
        const O = Lt.get(i);
        b.title = O?.title ?? r.content ?? "", b.description = O?.description ?? r.description ?? "", b.priority = r.priority || 1;
        const S = me(r.due?.datetime || r.due?.date || "");
        b.dueDate = S.date, b.dueTime = S.time;
        const j = Ke(i, r.description || b.description), K = me(j);
        b.startDate = K.date, b.startTime = K.time, b.labels = [...r.labels || []], b.url = r.url || "";
        try {
          const B = await nt.getComments(i, C.signal);
          if (B && C.current()) {
            const z = [], N = [];
            for (const E of B) {
              let h;
              if (E?.attachment?.file_url) {
                const L = E.attachment.file_name || "附件图片";
                z.push({ name: L, url: E.attachment.file_url }), h = { name: L, url: E.attachment.file_url };
              }
              N.push({
                id: E.id,
                content: E.content || "",
                postedAt: E.posted_at || "",
                attachment: h
              });
            }
            if (b.commentAttachments = z, b.comments = N, z.length > 0 && b.description) {
              let E = b.description, h = !1;
              for (const L of z) {
                const y = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                y.test(E) && (E = E.replace(y, `$1${L.url}$2`), h = !0);
              }
              if (h && !Lt.has(i)) {
                b.description = E;
                for (const L of wt.columns) {
                  const y = L.tasks.find((k) => String(k.id) === i);
                  if (y) {
                    y.description = E, y._taskRaw && (y._taskRaw.description = E);
                    break;
                  }
                }
              }
            }
          }
        } catch {
        }
      }
    } catch {
      C.current() && (b.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      C.current() && (b.loading = !1), C.finish();
    }
  },
  close() {
    ae(), b.isOpen = !1, b.taskId = "";
  },
  async setStartDateAndTime(i, n) {
    if (!b.taskId) return;
    const c = Wt(), m = i.trim(), C = m ? n.trim() : "";
    b.startDate = m, b.startTime = C, te();
    const r = Lo(m, C);
    Po(c.taskId, r), nt.invalidateWorkspaceSnapshots();
    for (const O of wt.columns) {
      const S = O.tasks.find((j) => j.id === c.taskId);
      S && (S.startDate = r);
    }
  },
  async setDueDateAndTime(i, n) {
    if (!b.taskId) return;
    const c = Wt(), m = i.trim(), C = m ? n.trim() : "";
    b.dueDate = m, b.dueTime = C, te(), nt.invalidateWorkspaceSnapshots();
    const r = (ve.get(c.taskId) || 0) + 1;
    ve.set(c.taskId, r);
    const O = Ge.then(async () => {
      try {
        const S = await nt.updateTask(c.taskId, {
          due_string: m ? C ? `${m} ${C}` : m : "no date"
        });
        if (ve.get(c.taskId) !== r) return;
        const j = nt.mapTasks([S], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const K of wt.columns) {
          const B = K.tasks.findIndex((N) => N.id === c.taskId);
          if (B < 0) continue;
          const z = K.tasks[B];
          if (Object.assign(z, {
            dueDate: j.dueDate,
            dueText: j.dueText,
            dueString: j.dueString,
            isDueToday: j.isDueToday,
            isOverdue: j.isOverdue,
            isRecurring: j.isRecurring
          }), z._taskRaw && (z._taskRaw.due = S.due), wt.view === "today") {
            const N = j.isOverdue ? "overdue" : j.isDueToday ? "today" : "";
            N !== K.sectionId && (K.tasks.splice(B, 1), wt.columns.find((E) => E.sectionId === N)?.tasks.push(z));
          }
        }
        c.current() && (b.error = "");
      } catch {
        c.current() && ve.get(c.taskId) === r && (b.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Ge = O.catch(() => {
    }), await O;
  },
  async saveTitleAndDesc(i, n, c = b.taskId) {
    const m = c === b.taskId ? Wt() : { taskId: c, current: () => !1 };
    if (!m.taskId || !i.trim()) return;
    const C = i.trim(), r = n.trim(), O = Ye(c, C, r, "saving");
    m.current() && (b.title = C, b.description = r), qe(m.taskId, C, r), fe++, b.saving = !0;
    const S = Ie.then(async () => {
      try {
        await nt.updateTask(m.taskId, {
          content: C,
          description: r
        }), Lt.get(c)?.revision === O && Lt.delete(c), fe === 1 && Lt.size === 0 && J.dispatch("refresh");
      } catch (j) {
        const K = Lt.get(c);
        K?.revision === O && (K.status = "failed", K.error = j instanceof Error ? j.message : "保存未确认");
      } finally {
        fe--, b.saving = fe > 0;
      }
    });
    Ie = S.catch(() => {
    }), await S;
  },
  async attachImageToTask(i) {
    const n = Wt();
    if (await Ie, !n.current()) return;
    if (Lt.has(n.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const c = b.description || "";
    if (!n.taskId || b.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    b.saving = !0;
    try {
      const m = i.name || `截图_${Date.now()}.png`;
      let C = "";
      try {
        const r = await nt.uploadFile(i, m);
        r && r.file_url && (C = r.file_url);
      } catch (r) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", r), i.size <= 2.5 * 1024 * 1024)
          C = await Bo(i);
        else
          throw new Error(r?.message || "云端上传失败且文件超过2.5MB");
      }
      if (C) {
        const r = c ? `${c}

![${m}](${C})` : `![${m}](${C})`;
        await nt.updateTask(n.taskId, {
          description: r
        }), n.current() && (b.description = r);
        for (const O of wt.columns) {
          const S = O.tasks.find((j) => String(j.id) === n.taskId);
          if (S) {
            S.description = r, S._taskRaw && (S._taskRaw.description = r);
            break;
          }
        }
        J.dispatch("refresh");
      }
    } catch (m) {
      n.current() && (b.error = m.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${m.message}`);
    } finally {
      b.saving = !1;
    }
  },
  async setPriority(i) {
    if (!b.taskId) return;
    const n = Wt();
    if (![1, 2, 3, 4].includes(i)) return;
    const c = b.priority;
    b.priority = i, te(), nt.invalidateWorkspaceSnapshots();
    try {
      await nt.updateTask(n.taskId, { priority: i });
      for (const m of wt.columns) {
        const C = m.tasks.find((r) => r.id === n.taskId);
        C && (C.priority = i, C._taskRaw && (C._taskRaw.priority = i));
      }
    } catch {
      n.current() && (b.priority = c, b.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(i) {
    if (!b.taskId) return;
    const n = Wt(), c = [...b.labels], C = c.includes(i) ? c.filter((r) => r !== i) : [...c, i];
    b.labels = C, te(), nt.invalidateWorkspaceSnapshots();
    try {
      await nt.updateTask(n.taskId, { labels: C });
      for (const r of wt.columns) {
        const O = r.tasks.find((S) => S.id === n.taskId);
        O && (O.labels = C, O._taskRaw && (O._taskRaw.labels = C));
      }
    } catch {
      n.current() && (b.labels = c, b.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(i) {
    const n = Wt();
    if (i = i.trim(), !(!n.taskId || !i))
      try {
        const c = await nt.getLabels();
        if (!n.current()) return;
        c.some((m) => m.name === i) || await nt.createLabel(i), n.current() && !b.labels.includes(i) && await this.toggleLabel(i);
      } catch {
        n.current() && (b.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(i) {
    if (!b.taskId || !i.trim()) return;
    const n = Wt();
    try {
      const c = await nt.addComment({
        task_id: n.taskId,
        content: i.trim()
      });
      c && n.current() && b.comments.push({
        id: c.id || `c_${Date.now()}`,
        content: c.content || i.trim(),
        postedAt: c.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (c) {
      n.current() && (b.error = "发送评论失败：" + (c?.message || ""));
    }
  },
  async setReminder(i) {
    const n = Wt();
    if (n.taskId)
      try {
        await Uo(n.taskId, i, b.title), n.current() && (b.reminderTime = i, b.error = "");
      } catch (c) {
        n.current() && (b.error = c instanceof Error ? c.message : "提醒未保存，请重试。");
      }
  }
}, rt = yo(Ho, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), No = { class: "todoist-cal-head" }, Vo = { class: "todoist-cal-title-row" }, Ko = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, Fo = { class: "todoist-cal-nav" }, Yo = { class: "todoist-cal-nav-group" }, Go = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, Xo = { class: "todoist-cal-nav-group" }, qo = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, Qo = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Jo = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Zo = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, tn = { class: "todoist-cal-agenda" }, en = { class: "todoist-cal-agenda-head" }, on = { class: "todoist-cal-agenda-title" }, nn = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, sn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, an = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, ln = ["disabled"], rn = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, dn = {
  key: 0,
  class: "todoist-cal-empty"
}, un = {
  key: 1,
  class: "todoist-cal-empty"
}, cn = ["onClick"], pn = { class: "todoist-cal-todo-main" }, mn = ["disabled", "title", "onClick"], fn = {
  key: 0,
  class: "check-icon"
}, vn = {
  key: 0,
  class: "todoist-cal-task-time"
}, gn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, bn = ["onClick"], kn = ["src"], yn = /* @__PURE__ */ Ht({
  __name: "TodoistCalendarSidebar",
  setup(i) {
    const n = xo;
    Ze(
      () => q.active,
      () => gt.invalidateReads(),
      () => gt.loadTodosForDate(n.selectedDate, !0)
    ), zt(() => gt.cancelReads()), dt(() => [q.active, q.pendingWrites], ([h, L], y) => {
      if (!h || L) {
        gt.cancelReads();
        return;
      }
      gt.loadTodosForDate(n.selectedDate, !!y?.[1]);
    }, { immediate: !0, flush: "sync" });
    function c(h) {
      gt.toggleTodoItem(h);
    }
    function m(h) {
      rt.openTask(h.id, h);
    }
    ee(() => {
      Do.syncSidebarToVue();
    });
    function C() {
      gt.dispatch("today");
    }
    function r() {
      gt.dispatch("prev-month");
    }
    function O() {
      gt.dispatch("next-month");
    }
    function S() {
      gt.dispatch("prev-year");
    }
    function j() {
      gt.dispatch("next-year");
    }
    function K(h) {
      gt.dispatch("select-date", h);
    }
    function B(h, L) {
      gt.dispatch("context-date", {
        date: h,
        clientX: L.clientX,
        clientY: L.clientY
      });
    }
    function z(h, L) {
      const y = Array.from(L.dataTransfer?.types || []);
      (y.includes("application/x-todoist-task-id") || y.includes("text/plain")) && (L.preventDefault(), L.dataTransfer && (L.dataTransfer.dropEffect = "copy"));
    }
    function N(h) {
    }
    function E(h, L) {
      const y = L.dataTransfer?.getData("application/x-todoist-task-id") || L.dataTransfer?.getData("text/plain");
      y && (L.preventDefault(), L.stopPropagation(), gt.dispatch("drop-task", { taskId: y, date: h }));
    }
    return (h, L) => (l(), u("aside", {
      id: "todoist-calendar-sidebar",
      class: Q(["todoist-calendar-sidebar", { collapsed: d(n).collapsed }]),
      "aria-label": "Todoist 任务日历"
    }, [
      t("div", No, [
        t("div", Vo, [
          L[1] || (L[1] = t("span", { class: "todoist-cal-logo" }, [
            Ut("📅 "),
            t("strong", null, "任务日历")
          ], -1)),
          t("span", Ko, x(d(n).badgeText), 1)
        ]),
        t("div", { class: "todoist-cal-head-actions" }, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: C
          }, "返回今天")
        ])
      ]),
      t("div", Fo, [
        t("div", Yo, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: r
          }, "‹"),
          t("span", Go, x(d(n).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: "下个月",
            onClick: O
          }, "›")
        ]),
        t("div", Xo, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: "上一年",
            onClick: S
          }, "‹"),
          t("span", qo, x(d(n).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: "下一年",
            onClick: j
          }, "›")
        ])
      ]),
      L[3] || (L[3] = t("div", { class: "todoist-cal-weekdays" }, [
        t("span", null, "一"),
        t("span", null, "二"),
        t("span", null, "三"),
        t("span", null, "四"),
        t("span", null, "五"),
        t("span", null, "六"),
        t("span", null, "日")
      ], -1)),
      t("div", Qo, [
        (l(!0), u(st, null, ut(d(n).cells, (y) => (l(), u("button", {
          key: y.date,
          type: "button",
          class: Q(["todoist-cal-cell", {
            outside: y.isOutside,
            today: y.isToday,
            selected: y.isSelected
          }]),
          "data-date": y.date,
          role: "gridcell",
          title: y.title,
          onClick: (k) => K(y.date),
          onContextmenu: F((k) => B(y.date, k), ["prevent"]),
          onDragover: (k) => z(y.date, k),
          onDragleave: (k) => (y.date, void 0),
          onDrop: (k) => E(y.date, k)
        }, [
          t("span", null, x(y.dayNumber), 1),
          y.hasDot ? (l(), u("span", Zo)) : I("", !0)
        ], 42, Jo))), 128))
      ]),
      t("div", tn, [
        t("div", en, [
          t("strong", on, x(d(n).agendaTitle), 1),
          t("span", nn, x(d(n).todoItems.length) + " 项", 1)
        ]),
        d(n).writeError ? (l(), u("p", sn, x(d(n).writeError), 1)) : I("", !0),
        d(n).emptyText ? (l(), u("div", an, [
          Ut(x(d(n).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: d(n).todoLoading || d(q).pendingWrites > 0,
            onClick: L[0] || (L[0] = (y) => d(gt).loadTodosForDate(d(n).selectedDate, !0))
          }, "重试读取", 8, ln)
        ])) : I("", !0),
        t("div", rn, [
          d(n).todoLoading && !d(n).todoItems.length ? (l(), u("div", dn, " 正在读取待办与完成历史… ")) : d(n).todoItems.length === 0 && !d(n).emptyText ? (l(), u("div", un, " 当天没有待办或完成任务 ☕ ")) : (l(!0), u(st, { key: 2 }, ut(d(n).todoItems, (y) => (l(), u("div", {
            key: y.id,
            class: Q(["todoist-cal-todo-card", { completed: y.completed }]),
            onClick: (k) => m(y)
          }, [
            t("div", pn, [
              t("button", {
                type: "button",
                class: Q(["todoist-cal-check", { checked: y.completed }]),
                disabled: d(q).pendingWrites > 0,
                title: y.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: F((k) => c(y), ["stop"])
              }, [
                y.completed ? (l(), u("span", fn, "✓")) : I("", !0)
              ], 10, mn),
              t("span", {
                class: Q(["todoist-cal-todo-title", { strike: y.completed }])
              }, x(y.content), 3),
              y.time ? (l(), u("small", vn, x(y.time), 1)) : I("", !0),
              y.completed ? (l(), u("span", gn, "已完成")) : I("", !0)
            ]),
            y.thumbUrl ? (l(), u("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: F((k) => d(Pe).open(y.thumbUrl, y.content), ["stop"])
            }, [
              t("img", {
                src: y.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, kn),
              L[2] || (L[2] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, bn)) : I("", !0)
          ], 10, cn))), 128))
        ])
      ])
    ], 2));
  }
}), wn = /* @__PURE__ */ oe(yn, [["__scopeId", "data-v-6d6d531e"]]);
function hn(i) {
  const n = i.state, c = P(null), m = P(null), C = P(null), r = P(!1), O = Qe(null), S = P(), j = /* @__PURE__ */ new Map();
  function K($) {
    j.clear();
    const A = $.closest(".todoist-board");
    if (A)
      for (const R of A.querySelectorAll(".todoist-board-list")) {
        const W = n.columns[Number(R.dataset.groupIndex)];
        if (!W) continue;
        const H = R.__todoistSlots;
        if (!H) continue;
        const et = H(), kt = et.filter((ct) => ct.id !== k?.id);
        j.set(W, { list: R, rows: kt, read: H, snapshot: et });
      }
  }
  let B = 0, z;
  function N($, A) {
    z = { clientY: $.clientY, col: A }, !B && (B = requestAnimationFrame(() => {
      B = 0;
      const R = z;
      z = void 0, R && E(R, R.col);
    }));
  }
  function E($, A) {
    if (!k || n.movingTaskId) return;
    const R = j.get(A);
    if (!R) return;
    const W = R.read();
    W !== R.snapshot && (R.snapshot = W, R.rows = W.filter((Z) => Z.id !== k?.id));
    const H = $.clientY - R.list.getBoundingClientRect().top + R.list.scrollTop;
    let et = 0, kt = R.rows.length;
    for (; et < kt; ) {
      const Z = et + kt >>> 1;
      H < R.rows[Z].middle ? kt = Z : et = Z + 1;
    }
    let ct = et;
    if (m.value === n.columns.indexOf(A)) {
      const Z = S.value ? R.rows.findIndex((pt) => pt.id === S.value) : R.rows.length;
      Z >= 0 && ct > Z && H < R.rows[Z].middle + 10 && (ct = Z), Z > 0 && ct < Z && H > R.rows[Z - 1].middle - 10 && (ct = Z);
    }
    const lt = R.rows[ct]?.id;
    y(A, lt), m.value === n.columns.indexOf(A) && (C.value = lt || R.rows[R.rows.length - 1]?.id || null, r.value = !lt);
  }
  function h($) {
    return $ === O.value;
  }
  function L($, A) {
    if (A !== m.value || !O.value) return $.tasks;
    const R = [...$.tasks], W = S.value ? R.findIndex((H) => H.id === S.value) : -1;
    return R.splice(W < 0 ? R.length : W, 0, O.value), R;
  }
  function y($, A) {
    if (!k || !w) return;
    if (n.view === "today" && $.sectionId === "overdue" && w.sectionId !== "overdue") {
      m.value = null;
      return;
    }
    const R = A ? $.tasks.find((et) => et.id === A) : void 0, W = $ === w ? String(k._taskRaw?.parent_id || "") : "";
    if (R && n.view !== "today" && String(R._taskRaw?.parent_id || "") !== W) {
      m.value = null;
      return;
    }
    const H = n.columns.indexOf($);
    H < 0 || (S.value = A, m.value = H);
  }
  let k = null, w = null;
  function V($, A, R, W) {
    if (!i.isActive() || n.loading || n.movingTaskId || n.moveNeedsRefresh || A.completed || A.id.startsWith("optimistic-") || i.editingTaskId() === A.id) {
      $.preventDefault();
      return;
    }
    if ($.stopPropagation(), i.closePopovers(), c.value = A.id, k = A, w = R, O.value = { ...A }, K($.currentTarget), $.dataTransfer) {
      $.dataTransfer.effectAllowed = "move";
      const H = $.currentTarget, et = H.getBoundingClientRect();
      $.dataTransfer.setDragImage(
        H,
        Math.max(0, Math.min(et.width, $.clientX - et.left)),
        Math.max(0, Math.min(et.height, $.clientY - et.top))
      ), $.dataTransfer.clearData(), $.dataTransfer.setData("application/x-todoist-task-id", A.id), $.dataTransfer.setData("application/x-logicweaver-todoist-task", A.id), $.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: A.id, sectionId: R.sectionId }));
    }
  }
  function G() {
    cancelAnimationFrame(B), B = 0, z = void 0, c.value = null, m.value = null, C.value = null, r.value = !1, k = null, w = null, O.value = null, S.value = void 0, j.clear();
  }
  function D($, A) {
    !k || n.movingTaskId || ($.preventDefault(), $.stopPropagation(), $.dataTransfer && ($.dataTransfer.dropEffect = "move"), N($, n.columns[A]));
  }
  function at($, A) {
    $.currentTarget?.contains($.relatedTarget);
  }
  function v($, A, R, W) {
    $.dataTransfer && ($.dataTransfer.dropEffect = "move"), N($, R);
  }
  async function Tt($, A) {
    z && z.col === $ && (E(z, z.col), A = S.value);
    const R = k, W = w;
    G(), !(!R || !W || !i.isActive() || n.movingTaskId) && (n.view === "today" ? $.sectionId === "today" && W.sectionId !== "today" ? await i.moveTask(R.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, A) : await i.moveTask(R.id, { sectionId: $.sectionId }, A) : await i.moveTask(R.id, {
      projectId: $.projectId,
      sectionId: $.sectionId
    }, A));
  }
  async function Dt($, A, R, W) {
    $.preventDefault();
    const H = $.dataTransfer?.getData("application/x-todoist-label") || ($.dataTransfer?.getData("text/plain")?.startsWith("label:") ? $.dataTransfer.getData("text/plain").slice(6) : "");
    if (H) {
      i.dropLabel(A, H);
      return;
    }
    if (m.value === n.columns.indexOf(R)) {
      await Tt(R, S.value);
      return;
    }
    const et = $.currentTarget.getBoundingClientRect(), kt = $.clientY >= et.top + et.height / 2, ct = R.tasks.filter((pt) => pt.id !== k?.id), lt = ct.findIndex((pt) => pt.id === A.id), Z = A.id === k?.id ? A.id : kt ? ct[lt + 1]?.id : A.id;
    await Tt(R, Z);
  }
  async function ft($, A) {
    $.preventDefault(), $.stopPropagation(), await Tt(A, m.value === n.columns.indexOf(A) ? S.value : void 0);
  }
  return dt(() => [n.view, n.activeProjectId], () => G()), dt(() => n.columns, ($) => {
    w && !$.includes(w) && G();
  }), dt(i.isActive, ($) => {
    $ || G();
  }, { immediate: !0, flush: "sync" }), zt(G), {
    draggingTaskId: c,
    dragOverColIndex: m,
    dragOverTaskId: C,
    dragAfterTask: r,
    isDragPreview: h,
    previewTasks: L,
    onTaskDragStart: V,
    onTaskDragEnd: G,
    onColDragOver: D,
    onColDragLeave: at,
    onTaskDragOver: v,
    onTaskDrop: Dt,
    onColDrop: ft
  };
}
const Tn = ["data-row-key"], Dn = /* @__PURE__ */ Ht({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(i) {
    const n = i, c = P(null), m = /* @__PURE__ */ new Map(), C = P(0), r = Qe({ top: 0, height: 600 }), O = (y) => n.isPreview(y) ? `preview:${y.id}` : y.id, S = it(() => {
      C.value;
      const y = [0];
      for (const k of n.tasks) {
        const w = k.id === n.hiddenId && !n.isPreview(k) ? 0 : m.get(O(k)) || m.get(k.id) || 110;
        y.push(y[y.length - 1] + w);
      }
      return y;
    }), j = it(() => {
      C.value;
      let y = 0;
      return n.tasks.filter((k) => !n.isPreview(k)).map((k) => {
        const w = m.get(k.id) || 110, V = { id: k.id, middle: y + w / 2 };
        return y += w, V;
      });
    });
    function K(y) {
      const k = S.value;
      let w = 0, V = n.tasks.length;
      for (; w < V; ) {
        const G = w + V >>> 1;
        k[G + 1] < y ? w = G + 1 : V = G;
      }
      return w;
    }
    const B = it(() => {
      const y = Math.max(0, K(r.value.top) - 5), k = Math.min(n.tasks.length, K(r.value.top + r.value.height) + 6), w = /* @__PURE__ */ new Set();
      for (let V = y; V < k; V++) w.add(V);
      if (n.pinnedId) {
        const V = n.tasks.findIndex((G) => G.id === n.pinnedId && !n.isPreview(G));
        V >= 0 && w.add(V);
      }
      return [...w].sort((V, G) => V - G).map((V) => ({ task: n.tasks[V], index: V, top: S.value[V] }));
    });
    let z = 0;
    function N() {
      z || (z = requestAnimationFrame(() => {
        z = 0, c.value && (r.value = { top: c.value.scrollTop, height: c.value.clientHeight });
      }));
    }
    let E;
    const h = /* @__PURE__ */ new Map();
    function L(y, k) {
      const w = h.get(k);
      w !== y && (w && E?.unobserve(w), y instanceof HTMLElement ? (h.set(k, y), E?.observe(y)) : h.delete(k));
    }
    return dt(() => n.tasks, () => {
      const y = new Set(n.tasks.map(O));
      for (const k of m.keys()) y.has(k) || m.delete(k);
      Rt(N);
    }), ee(() => {
      E = new ResizeObserver((y) => {
        let k = !1;
        const w = K(c.value?.scrollTop || 0), V = S.value[w] || 0;
        for (const G of y) {
          const D = G.target;
          if (D === c.value) {
            N();
            continue;
          }
          const at = D.dataset.rowKey, v = G.borderBoxSize?.[0]?.blockSize || G.contentRect.height;
          at && v > 0 && Math.abs((m.get(at) || 0) - v) > 0.5 && (m.set(at, v), k = !0);
        }
        if (k) {
          C.value++;
          const G = (S.value[w] || 0) - V;
          c.value && G && !n.pinnedId && (c.value.scrollTop += G), N();
        }
      }), c.value && (E.observe(c.value), c.value.__todoistSlots = () => j.value);
      for (const y of h.values()) E.observe(y);
      N();
    }), zt(() => {
      E?.disconnect(), cancelAnimationFrame(z), c.value && delete c.value.__todoistSlots, h.clear(), m.clear();
    }), (y, k) => (l(), u("div", {
      ref_key: "root",
      ref: c,
      onScrollPassive: N
    }, [
      i.tasks.length ? (l(), u("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${S.value[S.value.length - 1]}px` })
      }, [
        (l(!0), u(st, null, ut(B.value, (w) => (l(), u("div", {
          key: O(w.task),
          ref_for: !0,
          ref: (V) => L(V, O(w.task)),
          "data-row-key": O(w.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${w.top}px)` })
        }, [
          Be(y.$slots, "default", {
            task: w.task,
            index: w.index
          }, void 0, !0)
        ], 12, Tn))), 128))
      ], 4)) : Be(y.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), xn = /* @__PURE__ */ oe(Dn, [["__scopeId", "data-v-e0ed77d8"]]), Cn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, $n = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Sn = {
  key: 2,
  class: "todoist-empty"
}, In = {
  key: 3,
  class: "todoist-empty"
}, Rn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, _n = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Ln = { class: "todoist-projects-toolbar-inner" }, Pn = { class: "todoist-project-tabs-scroll" }, Mn = ["onClick"], On = { class: "todoist-project-tab-name" }, An = {
  key: 0,
  class: "todoist-project-actions-group"
}, jn = ["title"], En = { class: "action-text" }, Wn = ["title"], Un = { class: "action-text" }, zn = { class: "todoist-board" }, Bn = ["data-section-id", "data-title", "data-column-index"], Hn = { class: "todoist-board-column-head" }, Nn = ["title", "onClick"], Vn = ["onClick"], Kn = ["onSubmit"], Fn = ["onKeydown"], Yn = { class: "date-hint-left" }, Gn = { class: "date-hint-badge" }, Xn = { class: "date-hint-sub" }, qn = {
  key: 0,
  class: "date-hint-preview"
}, Qn = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, Jn = {
  key: 1,
  class: "todoist-composer-images"
}, Zn = ["src"], ts = { class: "todoist-composer-img-name" }, es = {
  key: 0,
  class: "todoist-composer-img-status"
}, os = ["onClick"], ns = { class: "todoist-inline-actions" }, ss = ["disabled"], is = ["disabled"], as = {
  key: 0,
  class: "todoist-column-empty"
}, ls = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], rs = ["disabled", "title", "aria-label", "onClick"], ds = { class: "todoist-board-task-main" }, us = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, cs = {
  key: 1,
  class: "todoist-card-repo-strip"
}, ps = ["title", "onClick"], ms = { class: "repo-badge-name" }, fs = ["onKeydown", "onBlur"], vs = {
  key: 3,
  class: "todoist-board-task-title todoist-task-content"
}, gs = {
  key: 4,
  class: "todoist-board-task-description"
}, bs = {
  key: 5,
  class: "todoist-board-task-meta"
}, ks = ["title"], ys = ["title"], ws = ["title"], hs = ["title"], Ts = {
  key: 4,
  class: "todoist-board-extra"
}, Ds = ["onClick"], xs = ["src"], Cs = {
  key: 0,
  class: "todoist-board-add-column"
}, $s = {
  key: 1,
  class: "todoist-add-section-form"
}, Ss = ["onKeydown"], Is = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, Rs = ["disabled"], _s = ["disabled"], Ls = {
  key: 1,
  class: "todoist-section-menu-divider"
}, Ps = { class: "todoist-task-menu-header" }, Ms = { class: "todoist-task-menu-title" }, Os = { class: "todoist-menu-badge" }, As = {
  key: 0,
  class: "todoist-labels-panel"
}, js = { class: "todoist-labels-quick-input" }, Es = ["onKeydown"], Ws = { class: "todoist-labels-chip-grid" }, Us = ["onClick"], zs = {
  key: 0,
  class: "chip-check"
}, Bs = {
  key: 1,
  class: "todoist-recur-panel"
}, Hs = { class: "todoist-recur-grid" }, Ns = ["onClick"], Vs = { class: "todoist-recur-custom-row" }, Ks = ["onKeydown"], Fs = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Ys = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Gs = {
  key: 2,
  class: "todoist-color-panel"
}, Xs = { class: "todoist-color-grid" }, qs = ["title", "onClick"], Qs = { class: "todoist-color-name" }, Js = ["disabled", "onClick"], Zs = { class: "todoist-project-flyout-name" }, ti = {
  key: 0,
  class: "todoist-menu-badge"
}, ei = { class: "todoist-menu-text" }, oi = { class: "todoist-dialog-title" }, ni = { class: "todoist-dialog-body" }, si = {
  key: 0,
  class: "todoist-dialog-desc"
}, ii = ["placeholder", "onKeydown"], ai = { class: "todoist-dialog-foot" }, li = { class: "todoist-dialog-icon" }, ri = { class: "todoist-dialog-title" }, di = { class: "todoist-dialog-body" }, ui = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, ci = { class: "todoist-dialog-danger-text" }, pi = { class: "todoist-dialog-msg" }, mi = { class: "todoist-dialog-foot" }, fi = /* @__PURE__ */ Ht({
  __name: "TodoistTaskList",
  setup(i) {
    const n = P(0);
    function c() {
      n.value++;
    }
    ee(() => {
      window.addEventListener("storage", c), window.addEventListener("todoist-repository-links-changed", c);
    }), zt(() => {
      window.removeEventListener("storage", c), window.removeEventListener("todoist-repository-links-changed", c);
    });
    function m(o, e) {
      return n.value, to(o, e);
    }
    function C(o) {
      eo.open(o);
    }
    const r = wt, O = P(""), S = P(null), j = P(""), K = P(!1), B = it(() => j.value ? Mo(j.value) : null), z = P([]);
    function N(o) {
      const e = o.clipboardData?.items;
      if (e)
        for (let s = 0; s < e.length; s++) {
          const M = e[s];
          if (M.type.indexOf("image") !== -1) {
            o.preventDefault();
            const p = M.getAsFile();
            if (!p) continue;
            const tt = URL.createObjectURL(p), Y = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Ct = {
              file: p,
              previewUrl: tt,
              name: `截图_${Y}.png`,
              uploading: !1
            };
            z.value.push(Ct);
          }
        }
    }
    function E(o) {
      const e = z.value.splice(o, 1)[0];
      if (e && e.previewUrl)
        try {
          URL.revokeObjectURL(e.previewUrl);
        } catch {
        }
    }
    const h = P(null), L = P(""), y = P(null), k = Jt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), w = Jt({
      isOpen: !1,
      x: 0,
      y: 0,
      title: "",
      message: "",
      value: "",
      placeholder: "",
      confirmText: "确定",
      actionType: "",
      payload: null
    }), V = P(null), G = P(null), D = Jt({
      isOpen: !1,
      x: 0,
      y: 0,
      title: "确认操作",
      icon: "⚠️",
      alertText: "",
      message: "",
      confirmText: "确定",
      danger: !1,
      actionType: "",
      payload: null
    }), at = P(null), v = Jt({
      isOpen: !1,
      x: 0,
      y: 0,
      task: null,
      col: null,
      activeSubpanel: null,
      descText: "",
      isSavingDesc: !1,
      calYear: (/* @__PURE__ */ new Date()).getFullYear(),
      calMonth: (/* @__PURE__ */ new Date()).getMonth(),
      newLabelText: "",
      customRecurText: "",
      flyoutOpenLeft: !1,
      flyoutStyle: {}
    }), Tt = P(null), Dt = P(null), ft = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], $ = [
      { label: "每天", rule: "every day", icon: "☀️" },
      { label: "每个工作日", rule: "every weekday", icon: "💼" },
      { label: "每周", rule: "every week", icon: "📅" },
      { label: "每周一", rule: "every mon", icon: "1️⃣" },
      { label: "每周二", rule: "every tue", icon: "2️⃣" },
      { label: "每周三", rule: "every wed", icon: "3️⃣" },
      { label: "每周四", rule: "every thu", icon: "4️⃣" },
      { label: "每周五", rule: "every fri", icon: "5️⃣" },
      { label: "周末 (六与日)", rule: "every weekend", icon: "🏖️" },
      { label: "每月", rule: "every month", icon: "📆" }
    ], A = it(() => String(v.task?._taskRaw?.project_id || v.col?.projectId || "")), R = it(() => r.view !== "projects" ? null : r.projects.find((o) => String(o.id) === String(r.activeProjectId)) || r.projects[0] || null), W = it(() => {
      const o = new Set(r.availableLabels || []);
      return v.task?.labels && v.task.labels.forEach((e) => o.add(e)), Array.from(o);
    }), H = it(() => {
      const o = v.task?.customColorHex;
      return o && ft.find((s) => s.hex.toLowerCase() === o.toLowerCase()) || ft[0];
    });
    function et(o, e) {
      return o.sectionId || o.title || String(e);
    }
    function kt() {
      return `${r.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function ct(o) {
      return o.startDate || o.dueText || o.labels && o.labels.length > 0 || o.timedDeadlineText || o.extraCountText;
    }
    function lt() {
      k.isOpen = !1, v.isOpen = !1, v.activeSubpanel = null;
    }
    const {
      draggingTaskId: Z,
      dragOverColIndex: pt,
      dragOverTaskId: Ot,
      dragAfterTask: Nt,
      isDragPreview: yt,
      previewTasks: Yt,
      onTaskDragStart: ne,
      onTaskDragEnd: Gt,
      onColDragOver: U,
      onColDragLeave: a,
      onTaskDragOver: f,
      onTaskDrop: X,
      onColDrop: It
    } = hn({
      state: r,
      isActive: () => q.active,
      editingTaskId: () => h.value,
      closePopovers: lt,
      moveTask: (o, e, s) => J.moveTask(o, e, s),
      dropLabel: (o, e) => {
        o.labels || (o.labels = []), o.labels.includes(e) || (o.labels.push(e), nt.getToken() && nt.updateTask(o.id, { labels: o.labels }));
      }
    });
    function At(o, e) {
      J.dispatch("toggle-task", { task: o, group: e });
    }
    function ge(o, e) {
      if (o.completed) return;
      const s = e.target;
      s && s.closest("button,input,textarea,select,a") || be(o);
    }
    function be(o) {
      r.movingTaskId !== o.id && (h.value = o.id, L.value = o.content, Rt(() => {
        y.value && (y.value.focus(), y.value.select());
      }));
    }
    function se(o, e) {
      if (h.value !== o.id) return;
      const s = L.value.trim();
      h.value = null, e && s && s !== o.content && (o.content = s, J.dispatch("update-task-title", {
        taskId: o.id,
        content: s,
        task: o,
        newContent: s
      }));
    }
    function ke(o, e) {
      o.key === "Enter" ? o.shiftKey || (o.preventDefault(), se(e, !0)) : o.key === "Escape" && (o.preventDefault(), o.stopPropagation(), se(e, !1));
    }
    function ye(o, e) {
      e.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(o.id, o);
    }
    function we(o, e, s) {
      const M = s.currentTarget;
      S.value = et(o, e), j.value = "", K.value = !1, Rt(() => {
        M.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function Xt() {
      Et.value || jt();
    }
    function jt() {
      S.value = null, j.value = "", K.value = !1;
      for (const o of z.value)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
      z.value = [];
    }
    const Et = P(!1), qt = /* @__PURE__ */ new WeakMap();
    function de(o) {
      const e = o.description || o._taskRaw?.description || "", s = qt.get(o);
      if (s && s.source === e) return s;
      const M = e.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, p = {
        source: e,
        thumb: M,
        text: e.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return qt.set(o, p), p;
    }
    function T(o) {
      return de(o).text;
    }
    function g(o) {
      return de(o).thumb;
    }
    function _(o, e) {
      o && Pe.open(o, e?.content || "任务照片");
    }
    async function mt(o) {
      if (!q.active || Et.value) return;
      const e = [...z.value];
      let M = j.value.trim() || e[0]?.name || "";
      if (!M) return;
      let p, tt, Y;
      if (B.value && !K.value) {
        const _t = B.value;
        M = _t.cleanTitle || M, p = _t.date, tt = _t.label + (_t.time ? ` ${_t.time}` : ""), Y = _t.time ? `${_t.date} ${_t.time}` : _t.date;
      }
      const Ct = S.value, Vt = j.value, $t = r.view, De = o.projectId || $t === "projects" && r.activeProjectId || void 0, xe = o.sectionId !== void 0 ? o.sectionId : void 0;
      Et.value = !0;
      try {
        await wo(async () => {
          for (const ht of e)
            if (!ht.uploadedUrl) {
              ht.uploading = !0;
              try {
                const Ce = await nt.uploadFile(ht.file, ht.name);
                ht.uploadedUrl = Ce.file_url;
              } catch {
                ht.uploadedUrl = ht.previewUrl;
              } finally {
                ht.uploading = !1;
              }
            }
          await J.dispatch("add-task-submit", {
            content: M,
            view: $t,
            group: o,
            projectId: De,
            sectionId: xe,
            dueDate: p,
            dueText: tt,
            dueString: Y,
            attachments: e.map((ht) => ({ file_url: ht.uploadedUrl, file_name: ht.name, file_type: ht.file.type || "image/png" }))
          }) && Ct === S.value && Vt === j.value && e.length === z.value.length && e.every((ht, Ce) => ht === z.value[Ce]) && jt();
        });
      } catch {
        r.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        Et.value = !1;
      }
    }
    function xt(o, e) {
      o.key === "Enter" && !o.shiftKey ? (o.preventDefault(), mt(e)) : o.key === "Escape" && (o.preventDefault(), Xt());
    }
    function vt() {
      const o = O.value.trim();
      if (!o) return;
      const s = r.columns.find((M) => M.projectId)?.projectId || r.activeProjectId || void 0;
      J.dispatch("add-section-submit", { name: o, projectId: s }), Bt();
    }
    function Bt() {
      r.addingSection = !1, O.value = "";
    }
    function no(o, e, s) {
      if (k.isOpen && k.col === o) {
        k.isOpen = !1;
        return;
      }
      v.isOpen = !1;
      const p = s.currentTarget.getBoundingClientRect(), Y = Math.max(8, Math.min(window.innerWidth - 175 - 8, p.left)), Ct = Math.max(8, Math.min(window.innerHeight - 220, p.bottom + 4));
      k.col = o, k.x = Y, k.y = Ct, k.canMoveLeft = e > 0 && !!r.columns[e - 1]?.sectionId, k.canMoveRight = e < r.columns.length - 1 && !!r.columns[e + 1]?.sectionId, k.isOpen = !0;
    }
    function Me(o, e) {
      k.isOpen = !1, J.dispatch("move-section", { sectionId: o.sectionId, direction: e });
    }
    function Oe(o, e, s) {
      if (r.movingTaskId === o.id || o.completed) return;
      k.isOpen = !1;
      const M = 236, p = 340, tt = Math.max(8, Math.min(window.innerWidth - M - 8, s.clientX)), Y = Math.max(8, Math.min(window.innerHeight - p - 8, s.clientY));
      if (v.task = o, v.col = e, v.x = tt, v.y = Y, v.activeSubpanel = null, v.descText = o.description || "", v.isSavingDesc = !1, v.newLabelText = "", v.customRecurText = "", o.dueDate) {
        const $t = /* @__PURE__ */ new Date(`${o.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite($t.getTime()) && (v.calYear = $t.getFullYear(), v.calMonth = $t.getMonth());
      } else {
        const $t = /* @__PURE__ */ new Date();
        v.calYear = $t.getFullYear(), v.calMonth = $t.getMonth();
      }
      const Ct = 252, Vt = tt + M + Ct > window.innerWidth - 8;
      v.flyoutOpenLeft = Vt, v.flyoutStyle = {
        left: Vt ? `${-Ct - 6}px` : `${M + 6}px`,
        top: "0px"
      }, v.isOpen = !0;
    }
    function ue(o) {
      v.activeSubpanel === o ? v.activeSubpanel = null : (v.activeSubpanel = o, o === "desc" ? Rt(() => {
        Tt.value?.focus(), Tt.value?.select();
      }) : o === "labels" && Rt(() => {
        Dt.value?.focus();
      }));
    }
    function Ae(o) {
      return !!v.task?.labels?.includes(o);
    }
    function so(o) {
      if (!v.task) return;
      const e = v.task.id, s = [...v.task.labels || []], M = s.includes(o) ? s.filter((p) => p !== o) : [...s, o];
      v.task.labels = M, J.dispatch("update-task-labels", { taskId: e, labels: M });
    }
    function je() {
      if (!v.task) return;
      const o = v.newLabelText.trim();
      if (!o) return;
      v.newLabelText = "";
      const e = v.task.id, s = [...v.task.labels || []];
      s.includes(o) || (s.push(o), v.task.labels = s, J.dispatch("update-task-labels", { taskId: e, labels: s })), lt();
    }
    function io(o) {
      return String(v.task?.dueString || "").toLowerCase().includes(o.toLowerCase());
    }
    function ao(o, e) {
      if (!v.task) return;
      const s = v.task.id;
      J.dispatch("update-task-recurring", { taskId: s, rule: o, label: e }), lt();
    }
    function Ee() {
      if (!v.task) return;
      const o = v.customRecurText.trim();
      if (!o) return;
      const e = v.task.id;
      J.dispatch("update-task-recurring", { taskId: e, rule: o, label: o }), lt();
    }
    function lo() {
      if (!v.task) return;
      const o = v.task.id;
      J.dispatch("clear-task-recurring", { taskId: o }), lt();
    }
    function ro(o) {
      if (!v.task) return;
      const e = v.task.id, s = ft.find((M) => M.id === o);
      v.task.customColorHex = s?.hex || "", J.dispatch("update-task-color", { taskId: e, colorId: o }), lt();
    }
    function uo(o) {
      if (!v.task) return;
      const e = v.task.id;
      J.dispatch("move-task-to-project", {
        taskId: e,
        targetProjectId: o.id,
        targetProjectName: o.name
      }), lt();
    }
    function co() {
      if (!v.task) return;
      const o = v.task, e = { x: v.x, y: v.y };
      lt();
      const s = Qt(e, 380, 220);
      D.x = s.x, D.y = s.y, o.isRecurring ? (D.title = "删除重复任务确认", D.icon = "⚠️", D.danger = !0, D.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", D.message = `任务内容：${o.content}
循环规则：${o.dueString || "循环任务"}`, D.confirmText = "删除重复任务", D.actionType = "delete-task", D.payload = { taskId: o.id, isRecurring: !0 }, D.isOpen = !0) : (D.title = "删除任务确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要删除任务「${o.content}」吗？`, D.message = "此操作不可撤销。", D.confirmText = "确认删除", D.actionType = "delete-task", D.payload = { taskId: o.id, isRecurring: !1 }, D.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(o, e, s) {
      Oe(o, e, s);
    });
    function Qt(o, e = 380, s = 220) {
      let M = null;
      if (o instanceof HTMLElement)
        M = o.getBoundingClientRect();
      else if (o && "currentTarget" in o && o.currentTarget instanceof HTMLElement)
        M = o.currentTarget.getBoundingClientRect();
      else if (o && "target" in o && o.target instanceof HTMLElement)
        M = (o.target.closest("button") || o.target).getBoundingClientRect();
      else if (o && "x" in o && "y" in o && typeof o.x == "number" && typeof o.y == "number") {
        const p = Math.max(16, Math.min(window.innerWidth - e - 16, o.x)), tt = Math.max(16, Math.min(window.innerHeight - s - 16, o.y + 10));
        return { x: p, y: tt };
      }
      if (M) {
        let p = M.right - e;
        p < 16 && (p = Math.max(16, M.left)), p = Math.max(16, Math.min(window.innerWidth - e - 16, p));
        let tt = M.bottom + 8;
        return tt + s > window.innerHeight - 16 && M.top > s + 16 && (tt = M.top - s - 8), tt = Math.max(16, Math.min(window.innerHeight - s - 16, tt)), { x: p, y: tt };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - e) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - s) / 3))
      };
    }
    function We(o, e) {
      if (e.button !== 0 || e.target?.closest("button, input, textarea")) return;
      e.preventDefault();
      const s = e.clientX, M = e.clientY, p = o === "prompt" ? w : D, tt = p.x, Y = p.y, Ct = ($t) => {
        const De = $t.clientX - s, xe = $t.clientY - M;
        p.x = Math.max(10, Math.min(window.innerWidth - 320, tt + De)), p.y = Math.max(10, Math.min(window.innerHeight - 120, Y + xe));
      }, Vt = () => {
        window.removeEventListener("pointermove", Ct), window.removeEventListener("pointerup", Vt);
      };
      window.addEventListener("pointermove", Ct), window.addEventListener("pointerup", Vt);
    }
    function Ue(o) {
      const e = Qt(o, 380, 220);
      w.x = e.x, w.y = e.y, w.title = ot("todoist.newProject"), w.message = ot("todoist.inputProjectPlaceholder"), w.value = "", w.placeholder = ot("todoist.inputProjectPlaceholder"), w.confirmText = ot("common.confirm"), w.actionType = "create-project", w.payload = null, w.isOpen = !0, Rt(() => V.value?.focus());
    }
    function po(o, e) {
      const s = Qt(e, 380, 220);
      w.x = s.x, w.y = s.y, w.title = ot("todoist.renameProject"), w.message = o.name, w.value = o.name, w.placeholder = ot("todoist.inputProjectPlaceholder"), w.confirmText = ot("common.save"), w.actionType = "rename-project", w.payload = { projectId: o.id }, w.isOpen = !0, Rt(() => {
        V.value?.focus(), V.value?.select();
      });
    }
    function mo(o, e) {
      const s = e || { x: k.x, y: k.y };
      k.isOpen = !1;
      const M = Qt(s, 380, 220);
      w.x = M.x, w.y = M.y, w.title = ot("todoist.renameSection"), w.message = o.title, w.value = o.title, w.placeholder = ot("todoist.inputSectionPlaceholder"), w.confirmText = ot("common.save"), w.actionType = "rename-section", w.payload = { sectionId: o.sectionId }, w.isOpen = !0, Rt(() => {
        V.value?.focus(), V.value?.select();
      });
    }
    function ie() {
      w.isOpen = !1;
    }
    function ze() {
      const o = w.value.trim();
      if (!o) return;
      const { actionType: e, payload: s } = w;
      ie(), e === "create-project" ? J.dispatch("create-project-submit", o) : e === "rename-project" && s && "projectId" in s ? J.dispatch("rename-project-submit", { projectId: s.projectId, newName: o }) : e === "rename-section" && s && "sectionId" in s && J.dispatch("rename-section", { sectionId: s.sectionId, newName: o });
    }
    function fo(o, e) {
      const s = Qt(e, 380, 240);
      D.x = s.x, D.y = s.y, D.title = ot("todoist.deleteProjectConfirm"), D.icon = "🗑️", D.danger = !0, D.alertText = ot("todoist.deleteProjectAlert", { name: o.name }), D.message = ot("todoist.deleteProjectWarning"), D.confirmText = ot("common.deletePermanently"), D.actionType = "delete-project", D.payload = { projectId: o.id }, D.isOpen = !0;
    }
    function vo(o, e) {
      const s = e || { x: k.x, y: k.y };
      k.isOpen = !1;
      const M = Qt(s, 380, 240);
      D.x = M.x, D.y = M.y, D.title = ot("todoist.deleteSectionConfirm"), D.icon = "🗑️", D.danger = !0, D.alertText = ot("todoist.deleteSectionAlert", { name: o.title }), D.message = ot("todoist.deleteSectionWarning"), D.confirmText = ot("todoist.deleteSection"), D.actionType = "delete-section", D.payload = { sectionId: o.sectionId }, D.isOpen = !0;
    }
    function ce() {
      D.isOpen = !1;
    }
    function go() {
      const { actionType: o, payload: e } = D;
      ce(), o === "delete-project" && e && "projectId" in e ? J.dispatch("delete-project-submit", e.projectId) : o === "delete-section" && e && "sectionId" in e ? J.dispatch("delete-section", { sectionId: e.sectionId }) : o === "delete-task" && e && "taskId" in e && J.dispatch("delete-task-submit", e);
    }
    function bo(o) {
      J.dispatch("switch-project", o);
    }
    function he(o) {
      o.key === "Escape" && (w.isOpen && ie(), D.isOpen && ce(), v.isOpen && (v.isOpen = !1, v.activeSubpanel = null), k.isOpen && (k.isOpen = !1));
    }
    function Te(o) {
      const e = o.target;
      e && (w.isOpen && G.value && !G.value.contains(e) && !e.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && ie(), D.isOpen && at.value && !at.value.contains(e) && !e.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ce());
    }
    return dt(() => q.active, (o) => {
      document.removeEventListener("keydown", he), window.removeEventListener("pointerdown", Te), o && (document.addEventListener("keydown", he), window.addEventListener("pointerdown", Te));
    }, { immediate: !0, flush: "sync" }), zt(() => {
      document.removeEventListener("keydown", he), window.removeEventListener("pointerdown", Te), jt();
    }), (o, e) => (l(), u("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: lt
    }, [
      d(r).moveError && d(r).moveMessage ? (l(), u("p", Cn, x(d(r).moveMessage), 1)) : I("", !0),
      d(r).emptyText && d(r).columns.length > 0 && !d(r).loading ? (l(), u("p", $n, x(d(r).emptyText) + " 已显示的任务保留。", 1)) : I("", !0),
      d(r).loading && d(r).columns.length === 0 ? (l(), u("p", Sn, "加载中…")) : d(r).emptyText && d(r).columns.length === 0 ? (l(), u("p", In, x(d(r).emptyText), 1)) : d(r).view === "projects" && d(r).projects.length === 0 ? (l(), u("div", Rn, [
        e[29] || (e[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        e[30] || (e[30] = t("h3", null, "暂无自定义项目", -1)),
        e[31] || (e[31] = t("p", null, "你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！", -1)),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: e[0] || (e[0] = (s) => Ue(s))
        }, "＋ 新建第一个项目")
      ])) : (l(), u(st, { key: 5 }, [
        d(r).view === "projects" && d(r).projects.length ? (l(), u("div", _n, [
          t("div", Ln, [
            t("div", Pn, [
              (l(!0), u(st, null, ut(d(r).projects, (s) => (l(), u("button", {
                key: s.id,
                type: "button",
                class: Q(["todoist-project-tab", { active: String(s.id) === String(d(r).activeProjectId) }]),
                onClick: (M) => bo(s.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: bt({ background: s.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", On, x(s.name), 1)
              ], 10, Mn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: e[1] || (e[1] = (s) => Ue(s))
              }, "＋ 新建项目")
            ]),
            R.value ? (l(), u("div", An, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: d(ot)("todoist.renameProject"),
                onClick: e[2] || (e[2] = (s) => po(R.value, s))
              }, [
                e[32] || (e[32] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", En, x(d(ot)("common.rename")), 1)
              ], 8, jn),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: d(ot)("todoist.deleteProject"),
                onClick: e[3] || (e[3] = (s) => fo(R.value, s))
              }, [
                e[33] || (e[33] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", Un, x(d(ot)("todoist.deleteProject")), 1)
              ], 8, Wn)
            ])) : I("", !0)
          ])
        ])) : I("", !0),
        t("div", zn, [
          (l(!0), u(st, null, ut(d(r).columns, (s, M) => (l(), u("section", {
            key: s.sectionId || s.title || M,
            class: "todoist-board-column",
            "data-section-id": s.sectionId,
            "data-title": s.title,
            "data-column-index": M
          }, [
            t("header", Hn, [
              t("h3", null, [
                Ut(x(s.title) + " ", 1),
                t("span", null, x(s.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: s.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: F((p) => no(s, M, p), ["stop"])
              }, "•••", 8, Nn)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (p) => we(s, M, p)
            }, "＋ 添加任务", 8, Vn),
            S.value === et(s, M) ? (l(), u("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: F((p) => mt(s), ["prevent"])
            }, [
              Pt(t("textarea", {
                "onUpdate:modelValue": e[4] || (e[4] = (p) => j.value = p),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (p) => xt(p, s),
                onPaste: e[5] || (e[5] = (p) => N(p))
              }, null, 40, Fn), [
                [Kt, j.value]
              ]),
              B.value ? (l(), u("div", {
                key: 0,
                class: Q(["todoist-composer-date-hint", { "is-ignored": K.value }])
              }, [
                t("div", Yn, [
                  e[35] || (e[35] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", Gn, [
                    Ut(x(B.value.label) + x(B.value.time ? " " + B.value.time : "") + " ", 1),
                    t("span", Xn, "(" + x(B.value.formattedDate) + ")", 1)
                  ]),
                  K.value ? (l(), u("span", Qn, " (已忽略日期，按纯文本创建) ")) : (l(), u("span", qn, [
                    e[34] || (e[34] = Ut(" 精简任务名: ", -1)),
                    t("strong", null, x(B.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: e[6] || (e[6] = (p) => K.value = !K.value)
                }, x(K.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : I("", !0),
              z.value.length > 0 ? (l(), u("div", Jn, [
                (l(!0), u(st, null, ut(z.value, (p, tt) => (l(), u("div", {
                  key: tt,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: p.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Zn),
                  t("span", ts, x(p.name), 1),
                  p.uploading ? (l(), u("span", es, "上传中…")) : I("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (Y) => E(tt)
                  }, "×", 8, os)
                ]))), 128))
              ])) : I("", !0),
              t("div", ns, [
                t("button", {
                  type: "button",
                  disabled: Et.value,
                  onClick: Xt
                }, "取消", 8, ss),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: Et.value
                }, x(Et.value ? z.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, is)
              ])
            ], 40, Kn)) : I("", !0),
            Zt(xn, {
              tasks: d(Yt)(s, M),
              "pinned-id": d(Z) || h.value,
              "hidden-id": d(pt) !== null ? d(Z) : null,
              "is-preview": d(yt),
              class: Q(["todoist-board-list", { "drag-over": d(pt) === M }]),
              "data-group-index": M,
              onDragover: F((p) => d(U)(p, M), ["prevent"]),
              onDragleave: (p) => d(a)(p, M),
              onDrop: F((p) => d(It)(p, s), ["prevent"])
            }, {
              empty: le(() => [
                s.tasks.length === 0 && d(pt) !== M ? (l(), u("p", as, " 暂无任务 · 可拖到这里 ")) : I("", !0)
              ]),
              default: le(({ task: p, index: tt }) => [
                t("article", {
                  class: Q(["todoist-board-task", [
                    {
                      completed: p.completed,
                      "has-custom-color": !!p.customColorHex,
                      editing: h.value === p.id,
                      "dragging-task": !d(yt)(p) && d(Z) === p.id,
                      "drop-before": d(Ot) === p.id && !d(Nt),
                      "drop-after": d(Ot) === p.id && d(Nt),
                      "saving-position": d(r).movingTaskId === p.id,
                      "todoist-task-preview": d(yt)(p),
                      "drag-origin-hidden": d(Z) === p.id && !d(yt)(p) && d(pt) !== null
                    }
                  ]]),
                  style: bt(p.customColorHex ? { "--task-custom-color": p.customColorHex } : {}),
                  "data-task-id": d(yt)(p) ? void 0 : p.id,
                  "aria-hidden": d(yt)(p) || void 0,
                  tabindex: d(yt)(p) ? -1 : 0,
                  title: kt(),
                  draggable: !d(yt)(p) && !p.completed && !d(r).loading && !d(r).movingTaskId && !d(r).moveNeedsRefresh && h.value !== p.id && !p.id.startsWith("optimistic-"),
                  onDragstart: (Y) => d(ne)(Y, p, s, tt),
                  onDragend: e[9] || (e[9] = //@ts-ignore
                  (...Y) => d(Gt) && d(Gt)(...Y)),
                  onDragover: F((Y) => d(f)(Y, p, s, tt), ["stop", "prevent"]),
                  onDrop: F((Y) => d(X)(Y, p, s, tt), ["stop", "prevent"]),
                  onDblclick: (Y) => ge(p, Y),
                  onClick: (Y) => ye(p, Y),
                  onContextmenu: F((Y) => Oe(p, s, Y), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: Q(["todoist-board-check", { checked: p.completed }]),
                    disabled: d(yt)(p) || d(r).movingTaskId === p.id,
                    title: p.completed ? "撤销完成" : "完成任务",
                    "aria-label": (p.completed ? "撤销完成：" : "完成：") + p.content,
                    onClick: F((Y) => At(p, s), ["stop"])
                  }, null, 10, rs),
                  t("div", ds, [
                    d(r).movingTaskId === p.id ? (l(), u("span", us, "保存中")) : I("", !0),
                    m(p.id, p.description).length ? (l(), u("div", cs, [
                      (l(!0), u(st, null, ut(m(p.id, p.description), (Y) => (l(), u("button", {
                        key: Y.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + Y.fullName + " · 点击在插件内查看详情",
                        onClick: F((Ct) => C(Y.fullName), ["stop"])
                      }, [
                        e[36] || (e[36] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", ms, x(Y.fullName), 1)
                      ], 8, ps))), 128))
                    ])) : I("", !0),
                    h.value === p.id ? Pt((l(), u("textarea", {
                      key: 2,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: y,
                      "onUpdate:modelValue": e[7] || (e[7] = (Y) => L.value = Y),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (Y) => ke(Y, p),
                      onBlur: (Y) => se(p, !0),
                      onClick: e[8] || (e[8] = F(() => {
                      }, ["stop"]))
                    }, null, 40, fs)), [
                      [Kt, L.value]
                    ]) : (l(), u("p", vs, x(p.content || "未命名任务"), 1)),
                    T(p) ? (l(), u("p", gs, x(T(p)), 1)) : I("", !0),
                    ct(p) ? (l(), u("div", bs, [
                      p.startDate && !p.dueDate ? (l(), u("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${p.startDate}`
                      }, " 🛫 自 " + x(d(Se)(p.startDate)) + " 起 ", 9, ks)) : p.startDate && p.dueDate ? (l(), u("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${p.startDate} 至 ${p.dueDate}`
                      }, " ⏱ " + x(d(Se)(p.startDate)) + " ~ " + x(d(Se)(p.dueDate)), 9, ys)) : p.dueText ? (l(), u("span", {
                        key: 2,
                        class: Q(["todoist-board-due", { recurring: p.isRecurring }]),
                        title: p.isRecurring ? `循环任务：${p.dueString || p.dueText}` : void 0
                      }, x(p.isRecurring ? "↻ " : "▣ ") + x(p.dueText), 11, ws)) : I("", !0),
                      (l(!0), u(st, null, ut((p.labels || []).slice(0, 3), (Y) => (l(), u("span", {
                        key: Y,
                        class: "todoist-board-label"
                      }, "◇ " + x(Y), 1))), 128)),
                      p.timedDeadlineText ? (l(), u("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (p.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + x(p.timedDeadlineText), 9, hs)) : I("", !0),
                      p.extraCountText ? (l(), u("span", Ts, x(p.extraCountText), 1)) : I("", !0)
                    ])) : I("", !0),
                    g(p) ? (l(), u("div", {
                      key: 6,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: F((Y) => _(g(p), p), ["stop"])
                    }, [
                      t("img", {
                        src: g(p),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, xs),
                      e[37] || (e[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, Ds)) : I("", !0)
                  ])
                ], 46, ls)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, Bn))), 128)),
          d(r).view === "inbox" || d(r).view === "projects" ? (l(), u("div", Cs, [
            d(r).addingSection ? (l(), u("div", $s, [
              Pt(t("input", {
                "onUpdate:modelValue": e[11] || (e[11] = (s) => O.value = s),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  St(F(vt, ["prevent"]), ["enter"]),
                  St(Bt, ["esc"])
                ]
              }, null, 40, Ss), [
                [Kt, O.value]
              ]),
              t("div", { class: "todoist-add-section-actions" }, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: vt
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: Bt
                }, "取消")
              ])
            ])) : (l(), u("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: e[10] || (e[10] = (s) => d(r).addingSection = !0)
            }, [...e[38] || (e[38] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : I("", !0)
        ])
      ], 64)),
      k.isOpen && k.col ? (l(), u("div", {
        key: 6,
        class: "todoist-section-menu",
        style: bt({ left: k.x + "px", top: k.y + "px" }),
        onClick: e[16] || (e[16] = F(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: e[12] || (e[12] = (s) => mo(k.col, s))
        }, [...e[39] || (e[39] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        k.col.sectionId ? (l(), u("div", Is, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !k.canMoveLeft,
            title: "向左移动板块",
            onClick: e[13] || (e[13] = (s) => Me(k.col, -1))
          }, "◀ 左移", 8, Rs),
          e[40] || (e[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !k.canMoveRight,
            title: "向右移动板块",
            onClick: e[14] || (e[14] = (s) => Me(k.col, 1))
          }, "右移 ▶", 8, _s)
        ])) : I("", !0),
        k.col.sectionId ? (l(), u("div", Ls)) : I("", !0),
        k.col.sectionId ? (l(), u("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: e[15] || (e[15] = (s) => vo(k.col, s))
        }, [...e[41] || (e[41] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : I("", !0)
      ], 4)) : I("", !0),
      v.isOpen && v.task ? (l(), u("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: v.x + "px", top: v.y + "px" }),
        role: "menu",
        onClick: e[23] || (e[23] = F(() => {
        }, ["stop"]))
      }, [
        t("div", Ps, [
          t("span", Ms, x(v.task.content || "任务操作"), 1)
        ]),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "labels" }]),
          onClick: e[17] || (e[17] = (s) => ue("labels"))
        }, [
          e[42] || (e[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          e[43] || (e[43] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", Os, x(v.task.labels && v.task.labels.length ? `已选 ${v.task.labels.length}` : "无"), 1)
        ], 2),
        v.activeSubpanel === "labels" ? (l(), u("div", As, [
          t("div", js, [
            Pt(t("input", {
              "onUpdate:modelValue": e[18] || (e[18] = (s) => v.newLabelText = s),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: St(F(je, ["prevent"]), ["enter"])
            }, null, 40, Es), [
              [Kt, v.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: je
            }, "＋")
          ]),
          t("div", Ws, [
            (l(!0), u(st, null, ut(W.value, (s) => (l(), u("button", {
              key: s,
              type: "button",
              class: Q(["todoist-label-chip", { selected: Ae(s) }]),
              onClick: (M) => so(s)
            }, [
              t("span", null, "◇ " + x(s), 1),
              Ae(s) ? (l(), u("span", zs, "✓")) : I("", !0)
            ], 10, Us))), 128))
          ])
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "recur" }]),
          onClick: e[19] || (e[19] = (s) => ue("recur"))
        }, [
          e[44] || (e[44] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          e[45] || (e[45] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(v.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, x(v.task.isRecurring ? v.task.dueString || "循环" : "无"), 5)
        ], 2),
        v.activeSubpanel === "recur" ? (l(), u("div", Bs, [
          t("div", Hs, [
            (l(), u(st, null, ut($, (s) => t("button", {
              key: s.rule,
              type: "button",
              class: Q(["todoist-recur-chip", { selected: io(s.rule) }]),
              onClick: (M) => ao(s.rule, s.label)
            }, [
              t("span", null, x(s.icon), 1),
              t("span", null, x(s.label), 1)
            ], 10, Ns)), 64))
          ]),
          t("div", Vs, [
            Pt(t("input", {
              "onUpdate:modelValue": e[20] || (e[20] = (s) => v.customRecurText = s),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: St(F(Ee, ["prevent"]), ["enter"])
            }, null, 40, Ks), [
              [Kt, v.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Ee
            }, "确定")
          ]),
          v.task.isRecurring ? (l(), u("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: lo
          }, "❌ 清除循环（转为单次任务）")) : I("", !0)
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "color" }]),
          onClick: e[21] || (e[21] = (s) => ue("color"))
        }, [
          e[46] || (e[46] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          e[47] || (e[47] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", Fs, [
            H.value.id === "none" ? (l(), u("span", Ys, "⊘")) : (l(), u("span", {
              key: 1,
              class: "todoist-color-dot",
              style: bt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: H.value.hex
              })
            }, null, 4)),
            Ut(" " + x(H.value.name), 1)
          ])
        ], 2),
        v.activeSubpanel === "color" ? (l(), u("div", Gs, [
          t("div", Xs, [
            (l(), u(st, null, ut(ft, (s) => t("button", {
              key: s.id,
              type: "button",
              class: Q(["todoist-color-swatch", { selected: H.value.id === s.id }]),
              title: s.name,
              onClick: (M) => ro(s.id)
            }, [
              t("span", {
                class: Q(["todoist-color-dot", { none: s.id === "none" }]),
                style: bt(s.id !== "none" ? { background: s.hex } : {})
              }, x(s.id === "none" ? H.value.id === "none" ? "✓" : "⊘" : H.value.id === s.id ? "✓" : ""), 7),
              t("span", Qs, x(s.name), 1)
            ], 10, qs)), 64))
          ])
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "project" }]),
          onClick: e[22] || (e[22] = (s) => ue("project"))
        }, [...e[48] || (e[48] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        v.activeSubpanel === "project" ? (l(), u("div", {
          key: 3,
          class: Q(["todoist-project-flyout", { "open-left": v.flyoutOpenLeft }]),
          style: bt(v.flyoutStyle)
        }, [
          (l(!0), u(st, null, ut(d(r).projects, (s) => (l(), u("button", {
            key: s.id,
            type: "button",
            class: Q(["todoist-project-flyout-item", { active: String(s.id) === A.value }]),
            disabled: !!d(r).movingTaskId || String(s.id) === A.value,
            onClick: (M) => uo(s)
          }, [
            e[49] || (e[49] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Zs, x(s.name), 1),
            String(s.id) === A.value ? (l(), u("span", ti, "当前")) : I("", !0)
          ], 10, Js))), 128))
        ], 6)) : I("", !0),
        e[51] || (e[51] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: co
        }, [
          e[50] || (e[50] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", ei, x(v.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : I("", !0),
      w.isOpen && d(q).active ? (l(), u("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: G,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${w.x}px`,
          top: `${w.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: e[26] || (e[26] = F(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: e[24] || (e[24] = (s) => We("prompt", s))
        }, [
          e[52] || (e[52] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", oi, x(w.title), 1),
          e[53] || (e[53] = t("span", {
            class: "todoist-dialog-drag-hint",
            title: "按住可拖动位置"
          }, "⋮⋮", -1))
        ], 32),
        t("div", ni, [
          w.message ? (l(), u("p", si, x(w.message), 1)) : I("", !0),
          Pt(t("input", {
            ref_key: "promptInputRef",
            ref: V,
            "onUpdate:modelValue": e[25] || (e[25] = (s) => w.value = s),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: w.placeholder,
            onKeydown: [
              St(F(ze, ["prevent"]), ["enter"]),
              St(F(ie, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, ii), [
            [Kt, w.value]
          ])
        ]),
        t("div", ai, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ie
          }, "取消"),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: ze
          }, x(w.confirmText || "确定"), 1)
        ])
      ], 4)) : I("", !0),
      D.isOpen && d(q).active ? (l(), u("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: at,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${D.x}px`,
          top: `${D.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: e[28] || (e[28] = F(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: e[27] || (e[27] = (s) => We("confirm", s))
        }, [
          t("span", li, x(D.icon || "⚠️"), 1),
          t("h3", ri, x(D.title), 1),
          e[54] || (e[54] = t("span", {
            class: "todoist-dialog-drag-hint",
            title: "按住可拖动位置"
          }, "⋮⋮", -1))
        ], 32),
        t("div", di, [
          D.danger ? (l(), u("div", ui, [
            t("div", ci, x(D.alertText), 1)
          ])) : I("", !0),
          t("p", pi, x(D.message), 1)
        ]),
        t("div", mi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ce
          }, "取消"),
          t("button", {
            type: "button",
            class: Q(["todoist-dialog-btn", D.danger ? "danger" : "primary"]),
            onClick: go
          }, x(D.confirmText || "确定"), 3)
        ])
      ], 4)) : I("", !0)
    ]));
  }
}), vi = /* @__PURE__ */ oe(fi, [["__scopeId", "data-v-885d33bd"]]), gi = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, bi = { class: "reminder-shortcuts" }, ki = ["disabled"], yi = { class: "reminder-preview" }, wi = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, hi = ["disabled"], Ti = ["disabled"], Di = ["disabled"], xi = /* @__PURE__ */ Ht({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(i, { emit: n }) {
    const c = i, m = n, C = c.value || (c.taskDate ? c.taskDate + "T" + (c.taskTime || "09:00") : ""), r = P(C.slice(0, 10)), O = P(C.slice(11, 16)), S = P(!1), j = P(""), K = P(!0), B = it(() => r.value && O.value ? (/* @__PURE__ */ new Date(r.value + "T" + O.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function z(E) {
      if (S.value) return;
      const h = /* @__PURE__ */ new Date();
      E === "tomorrow" ? (h.setDate(h.getDate() + 1), h.setHours(9, 0, 0, 0)) : h.setTime(h.getTime() + E * 6e4), r.value = `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`, O.value = `${String(h.getHours()).padStart(2, "0")}:${String(h.getMinutes()).padStart(2, "0")}`, j.value = "", K.value = !0;
    }
    async function N(E) {
      if (!(S.value || q.pendingWrites)) {
        if (E && (!Number.isFinite(Date.parse(E)) || Date.parse(E) <= Date.now())) {
          j.value = "请选择未来的提醒时间。";
          return;
        }
        if (b.taskId === c.taskId) {
          S.value = !0, j.value = "";
          try {
            if (await rt.setReminder(E), b.taskId !== c.taskId) return;
            b.error ? j.value = b.error : b.reminderTime === E && m("close");
          } finally {
            S.value = !1;
          }
        }
      }
    }
    return (E, h) => (l(), Mt(_e, {
      anchor: i.anchor,
      onClose: h[9] || (h[9] = (L) => m("close"))
    }, {
      default: le(() => [
        t("section", gi, [
          h[11] || (h[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", bi, [
            t("button", {
              type: "button",
              onClick: h[0] || (h[0] = (L) => z(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: h[1] || (h[1] = (L) => z(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: h[2] || (h[2] = (L) => z("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: S.value }, [
            h[10] || (h[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Zt(Le, {
              modelValue: r.value,
              "onUpdate:modelValue": h[3] || (h[3] = (L) => r.value = L),
              "time-value": O.value,
              "onUpdate:timeValue": h[4] || (h[4] = (L) => O.value = L),
              embedded: "",
              onTimeValidity: h[5] || (h[5] = (L) => K.value = L)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, ki),
          t("div", yi, x(B.value || "选择提醒的日期和时间"), 1),
          h[12] || (h[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          j.value ? (l(), u("p", wi, x(j.value), 1)) : I("", !0),
          t("footer", null, [
            i.value ? (l(), u("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: S.value || !!d(q).pendingWrites,
              onClick: h[6] || (h[6] = (L) => N(""))
            }, "移除提醒", 8, hi)) : I("", !0),
            t("button", {
              type: "button",
              disabled: S.value,
              onClick: h[7] || (h[7] = (L) => m("close"))
            }, "取消", 8, Ti),
            t("button", {
              type: "button",
              class: "save",
              disabled: S.value || !!d(q).pendingWrites || !r.value || !O.value || !K.value,
              onClick: h[8] || (h[8] = (L) => N(r.value + "T" + O.value))
            }, x(S.value ? "保存中…" : "设置提醒"), 9, Di)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), Ci = /* @__PURE__ */ oe(xi, [["__scopeId", "data-v-da9e3ddd"]]), $i = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, Si = { class: "inspector-main-col" }, Ii = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Ri = {
  key: 1,
  class: "inspector-repo-badges"
}, _i = ["title", "onClick"], Li = { class: "repo-badge-name" }, Pi = { class: "inspector-section inspector-title-section" }, Mi = { class: "task-title-row" }, Oi = {
  key: 0,
  class: "check-mark"
}, Ai = ["value", "disabled"], ji = ["value", "disabled"], Ei = ["onKeydown"], Wi = {
  key: 0,
  class: "desc-placeholder-btn"
}, Ui = ["innerHTML"], zi = {
  key: 2,
  role: "status"
}, Bi = {
  key: 3,
  class: "attached-img-grid"
}, Hi = ["onClick"], Ni = ["src", "alt"], Vi = { class: "attached-img-info" }, Ki = ["onClick"], Fi = { class: "inspector-section inspector-subtasks-section" }, Yi = {
  key: 0,
  class: "subtasks-list"
}, Gi = ["onClick"], Xi = {
  key: 0,
  class: "check-tick"
}, qi = { class: "subtask-content-text" }, Qi = ["onClick"], Ji = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Zi = ["value"], ta = { class: "subtask-actions" }, ea = { class: "inspector-section inspector-comments-section" }, oa = { class: "comment-input-bar" }, na = { class: "comment-input-wrap" }, sa = ["value", "disabled"], ia = ["disabled"], aa = {
  key: 0,
  class: "comments-list"
}, la = { class: "comment-item-content" }, ra = { class: "comment-item-header" }, da = { class: "comment-time" }, ua = { class: "comment-text" }, ca = {
  key: 0,
  class: "comment-attached-thumb"
}, pa = ["src", "onClick"], ma = { class: "inspector-side-col" }, fa = { class: "side-prop-group date-picker-anchor" }, va = { class: "row-text" }, ga = { class: "side-prop-group date-picker-anchor" }, ba = { class: "row-text" }, ka = { class: "side-prop-group" }, ya = { class: "row-text" }, wa = { class: "inspector-menu" }, ha = ["disabled", "onClick"], Ta = { key: 0 }, Da = { class: "side-prop-group" }, xa = { class: "row-text" }, Ca = { class: "inspector-menu" }, $a = ["onKeydown"], Sa = { key: 0 }, Ia = {
  key: 1,
  role: "alert"
}, Ra = { class: "label-options-list" }, _a = ["checked", "disabled", "onChange"], La = ["disabled"], Pa = { key: 3 }, Ma = { class: "side-prop-group" }, Oa = { class: "row-text" }, Aa = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorBody",
  props: {
    state: {},
    editTitle: {},
    editDescription: {},
    editStartDate: {},
    editStartTime: {},
    editDueDate: {},
    editDueTime: {},
    isUploadingImg: { type: Boolean },
    isDragOver: { type: Boolean },
    isTaskCompleted: { type: Boolean },
    subtasks: {},
    completedSubtasksCount: {},
    isAddingSubtask: { type: Boolean },
    newSubtaskText: {},
    newCommentText: {},
    isSubmittingComment: { type: Boolean },
    attachedImages: {},
    availableLabels: {}
  },
  emits: ["update:editTitle", "update:editDescription", "update:editStartDate", "update:editStartTime", "update:editDueDate", "update:editDueTime", "update:isAddingSubtask", "update:newSubtaskText", "update:newCommentText", "scheduleDraftSave", "saveTitleAndDesc", "toggleComplete", "triggerFileInput", "dragover", "dragleave", "dropImage", "descPaste", "removeAttachedImage", "toggleSubtask", "removeSubtask", "confirmAddSubtask", "submitComment", "startChange", "clearStartDate", "clearStartTime", "dueChange", "clearDueDate", "clearDueTime", "selectPriority", "toggleLabelSelect", "removeLabel", "createLabel"],
  setup(i, { emit: n }) {
    const c = i, m = n, C = P(!1), r = P(null), O = P(null);
    let S;
    ee(() => {
      let U = -1;
      S = new ResizeObserver((a) => {
        const f = a[0]?.contentRect.width;
        f !== U && (U = f, B(O.value), B(r.value));
      }), O.value?.parentElement && S.observe(O.value.parentElement);
    }), zt(() => S?.disconnect());
    const j = it(() => {
      if (!c.editDescription) return "";
      const U = c.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), a = document.createElement("template");
      a.innerHTML = Ao.renderMarkdown(U);
      const f = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const X of Array.from(a.content.querySelectorAll("*"))) {
        if (!f.has(X.tagName)) {
          X.replaceWith(document.createTextNode(X.textContent || ""));
          continue;
        }
        const It = X.tagName === "A" ? X.getAttribute("href") : null;
        for (const At of Array.from(X.attributes)) X.removeAttribute(At.name);
        It && /^(https?:\/\/|mailto:)/i.test(It) && (X.setAttribute("href", It), X.setAttribute("target", "_blank"), X.setAttribute("rel", "noopener noreferrer"));
      }
      return a.innerHTML;
    });
    function K() {
      C.value = !0, Rt(() => {
        B(r.value), r.value?.focus();
      });
    }
    function B(U) {
      U && (U.style.height = "auto", U.style.height = U.scrollHeight + "px");
    }
    function z(U) {
      B(U.el);
    }
    function N(U) {
      const a = U.target;
      B(a), m("update:editDescription", a.value), m("scheduleDraftSave", U);
    }
    function E() {
      m("saveTitleAndDesc"), C.value = !1;
    }
    const h = P(!1), L = P(!1), y = P(null), k = P(null), w = P(!1), V = P(!1), G = P(!1), D = P(""), at = P(null), v = P(null), Tt = P(null), Dt = P([]), ft = P(!1), $ = P("");
    let A;
    dt(() => [c.state.taskId, V.value], async (U, a, f) => {
      if (A?.abort(), !V.value) return;
      const X = new AbortController();
      A = X, f(() => X.abort()), Dt.value = [], ft.value = !0, $.value = "";
      try {
        const It = await nt.getLabels(X.signal);
        X.signal.aborted || (Dt.value = It.map((At) => At.name));
      } catch {
        X.signal.aborted || ($.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        X.signal.aborted || (ft.value = !1);
      }
    });
    function R() {
      G.value = !0;
    }
    const W = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function H(U) {
      switch (U) {
        case 4:
          return "#d1453b";
        case 3:
          return "#eb8909";
        case 2:
          return "#246fe0";
        default:
          return "#808080";
      }
    }
    function et(U) {
      w.value = !1, m("selectPriority", U);
    }
    const kt = it(() => {
      const U = /* @__PURE__ */ new Set([...Dt.value, ...c.availableLabels || []]);
      for (const a of c.state.labels || []) U.add(a);
      return Array.from(U);
    }), ct = it(() => {
      const U = D.value.trim().toLowerCase();
      return U ? kt.value.filter((a) => a.toLowerCase().includes(U)) : kt.value;
    });
    function lt() {
      const U = D.value.trim();
      U && (m("createLabel", U), D.value = "");
    }
    function Z(U, a) {
      Pe.open(U, a);
    }
    const pt = P(0);
    function Ot() {
      pt.value++;
    }
    ee(() => {
      window.addEventListener("storage", Ot), window.addEventListener("todoist-repository-links-changed", Ot);
    }), zt(() => {
      window.removeEventListener("storage", Ot), window.removeEventListener("todoist-repository-links-changed", Ot);
    });
    const Nt = it(() => (pt.value, to(c.state.taskId, c.editDescription)));
    function yt(U) {
      eo.open(U);
    }
    function Yt(U, a) {
      if (!U) return "";
      try {
        const f = U.split("-"), X = parseInt(f[1], 10), It = parseInt(f[2], 10), At = a ? ` ${a}` : "";
        return `${X}月${It}日${At}`;
      } catch {
        return U;
      }
    }
    function ne(U) {
      if (!U) return "";
      try {
        const a = new Date(U);
        return `${a.getMonth() + 1}月${a.getDate()}日 ${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    function Gt(U) {
      if (!U) return "刚刚";
      try {
        const a = new Date(U);
        return `${a.getMonth() + 1}月${a.getDate()}日 ${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    return (U, a) => i.state.isOpen ? (l(), u("div", $i, [
      t("main", Si, [
        i.state.error ? (l(), u("p", Ii, x(i.state.error), 1)) : I("", !0),
        Nt.value.length ? (l(), u("div", Ri, [
          (l(!0), u(st, null, ut(Nt.value, (f) => (l(), u("button", {
            key: f.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: "关联 GitHub 仓库：" + f.fullName + " · 点击在插件内查看详情",
            onClick: (X) => yt(f.fullName)
          }, [
            a[38] || (a[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", Li, x(f.fullName), 1),
            a[39] || (a[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, _i))), 128))
        ])) : I("", !0),
        t("section", Pi, [
          t("div", Mi, [
            t("button", {
              type: "button",
              class: Q(["task-complete-circle-btn", { completed: i.isTaskCompleted }]),
              title: "标记完成/撤销",
              onClick: a[0] || (a[0] = (f) => m("toggleComplete"))
            }, [
              i.isTaskCompleted ? (l(), u("span", Oi, "✓")) : I("", !0)
            ], 2),
            t("textarea", {
              value: i.editTitle,
              rows: "1",
              "aria-label": "任务标题",
              onVnodeMounted: z,
              onVnodeUpdated: z,
              disabled: i.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: O,
              class: Q(["inspector-input-title", { "title-done": i.isTaskCompleted }]),
              placeholder: "任务标题",
              onInput: a[1] || (a[1] = (f) => {
                B(f.target), m("update:editTitle", f.target.value), m("scheduleDraftSave", f);
              }),
              onCompositionend: a[2] || (a[2] = (f) => m("scheduleDraftSave", f)),
              onBlur: a[3] || (a[3] = (f) => m("saveTitleAndDesc", f)),
              onKeydown: a[4] || (a[4] = St(F((f) => m("saveTitleAndDesc", f), ["prevent"]), ["enter"]))
            }, null, 42, Ai)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: a[7] || (a[7] = F((f) => m("dragover"), ["prevent"])),
          onDragleave: a[8] || (a[8] = F((f) => m("dragleave"), ["prevent"])),
          onDrop: a[9] || (a[9] = F((f) => m("dropImage", f), ["prevent"]))
        }, [
          C.value ? (l(), u("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: r,
            value: i.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: "描述",
            disabled: i.isUploadingImg,
            onInput: N,
            onCompositionend: a[5] || (a[5] = (f) => m("scheduleDraftSave", f)),
            onBlur: E,
            onPaste: a[6] || (a[6] = (f) => m("descPaste", f))
          }, null, 40, ji)) : (l(), u("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: K,
            onKeydown: St(F(K, ["prevent"]), ["enter"])
          }, [
            i.editDescription ? (l(), u("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: j.value
            }, null, 8, Ui)) : (l(), u("span", Wi, "≡ 描述"))
          ], 40, Ei)),
          i.isUploadingImg ? (l(), u("small", zi, "图片上传中…")) : I("", !0),
          i.attachedImages.length ? (l(), u("div", Bi, [
            (l(!0), u(st, null, ut(i.attachedImages, (f) => (l(), u("div", {
              key: f.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (X) => Z(f.url, f.name)
              }, [
                t("img", {
                  src: f.url,
                  alt: f.name,
                  loading: "lazy"
                }, null, 8, Ni)
              ], 8, Hi),
              t("div", Vi, [
                t("span", null, x(f.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (X) => m("removeAttachedImage", f.url)
                }, "×", 8, Ki)
              ])
            ]))), 128))
          ])) : I("", !0)
        ], 32),
        t("section", Fi, [
          i.subtasks.length > 0 ? (l(), u("div", Yi, [
            (l(!0), u(st, null, ut(i.subtasks, (f) => (l(), u("div", {
              key: f.id,
              class: Q(["subtask-row-item", { done: f.completed }])
            }, [
              t("button", {
                type: "button",
                class: Q(["subtask-check-circle", { checked: f.completed }]),
                onClick: (X) => m("toggleSubtask", f.id)
              }, [
                f.completed ? (l(), u("span", Xi, "✓")) : I("", !0)
              ], 10, Gi),
              t("span", qi, x(f.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: "删除子任务",
                onClick: (X) => m("removeSubtask", f.id)
              }, "×", 8, Qi)
            ], 2))), 128))
          ])) : I("", !0),
          i.isAddingSubtask ? (l(), u("div", Ji, [
            t("input", {
              value: i.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: "输入子任务并回车…",
              onInput: a[10] || (a[10] = (f) => m("update:newSubtaskText", f.target.value)),
              onKeydown: [
                a[11] || (a[11] = St(F((f) => m("confirmAddSubtask"), ["prevent"]), ["enter"])),
                a[12] || (a[12] = St((f) => m("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Zi),
            t("div", ta, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: a[13] || (a[13] = (f) => m("confirmAddSubtask"))
              }, "添加"),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: a[14] || (a[14] = (f) => m("update:isAddingSubtask", !1))
              }, "取消")
            ])
          ])) : (l(), u("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: a[15] || (a[15] = (f) => m("update:isAddingSubtask", !0))
          }, [...a[40] || (a[40] = [
            t("span", { class: "subtask-plus-icon" }, "＋", -1),
            Ut(" 添加子任务 ", -1)
          ])]))
        ]),
        (l(), Mt(Oo, {
          key: i.state.taskId,
          "task-id": i.state.taskId
        }, null, 8, ["task-id"])),
        t("section", ea, [
          t("div", oa, [
            a[41] || (a[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", na, [
              t("input", {
                value: i.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: "评论…",
                disabled: i.isSubmittingComment,
                onInput: a[16] || (a[16] = (f) => m("update:newCommentText", f.target.value)),
                onKeydown: a[17] || (a[17] = St(F((f) => m("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, sa),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: "上传照片附件",
                onClick: a[18] || (a[18] = F((f) => m("triggerFileInput"), ["stop"]))
              }, "📎")
            ]),
            i.newCommentText.trim() ? (l(), u("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: i.isSubmittingComment,
              onClick: a[19] || (a[19] = (f) => m("submitComment"))
            }, "发送", 8, ia)) : I("", !0)
          ]),
          i.state.comments.length > 0 ? (l(), u("div", aa, [
            (l(!0), u(st, null, ut(i.state.comments, (f) => (l(), u("div", {
              key: f.id,
              class: "comment-item"
            }, [
              a[43] || (a[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", la, [
                t("div", ra, [
                  a[42] || (a[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", da, x(Gt(f.postedAt)), 1)
                ]),
                t("div", ua, x(f.content), 1),
                f.attachment?.url ? (l(), u("div", ca, [
                  t("img", {
                    src: f.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (X) => Z(f.attachment.url, f.attachment.name)
                  }, null, 8, pa)
                ])) : I("", !0)
              ])
            ]))), 128))
          ])) : I("", !0)
        ])
      ]),
      t("aside", ma, [
        t("div", fa, [
          a[45] || (a[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: y,
            type: "button",
            class: Q(["side-item-row click-row", { active: h.value, filled: !!i.editStartDate }]),
            onClick: a[21] || (a[21] = (f) => h.value = !h.value)
          }, [
            a[44] || (a[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", va, x(Yt(i.editStartDate, i.editStartTime) || "安排日期"), 1),
            i.editStartDate ? (l(), u("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: a[20] || (a[20] = F((f) => m("clearStartDate"), ["stop"]))
            }, "×")) : I("", !0)
          ], 2),
          h.value ? (l(), Mt(Le, {
            key: 0,
            "model-value": i.editStartDate,
            "time-value": i.editStartTime,
            "anchor-el": y.value,
            "onUpdate:modelValue": a[22] || (a[22] = (f) => m("update:editStartDate", f)),
            "onUpdate:timeValue": a[23] || (a[23] = (f) => m("update:editStartTime", f)),
            onChange: a[24] || (a[24] = (f) => m("startChange")),
            onClose: a[25] || (a[25] = (f) => h.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : I("", !0)
        ]),
        t("div", ga, [
          a[47] || (a[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: k,
            type: "button",
            class: Q(["side-item-row click-row", { active: L.value, filled: !!i.editDueDate }]),
            onClick: a[27] || (a[27] = (f) => L.value = !L.value)
          }, [
            a[46] || (a[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", ba, x(Yt(i.editDueDate, i.editDueTime) || "设定截止"), 1),
            i.editDueDate ? (l(), u("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除截止时间",
              onClick: a[26] || (a[26] = F((f) => m("clearDueDate"), ["stop"]))
            }, "×")) : I("", !0)
          ], 2),
          L.value ? (l(), Mt(Le, {
            key: 0,
            "model-value": i.editDueDate,
            "time-value": i.editDueTime,
            "anchor-el": k.value,
            "onUpdate:modelValue": a[28] || (a[28] = (f) => m("update:editDueDate", f)),
            "onUpdate:timeValue": a[29] || (a[29] = (f) => m("update:editDueTime", f)),
            onChange: a[30] || (a[30] = (f) => m("dueChange")),
            onClose: a[31] || (a[31] = (f) => L.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : I("", !0)
        ]),
        t("div", ka, [
          a[49] || (a[49] = t("span", { class: "side-prop-label" }, "优先级", -1)),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: Tt,
            type: "button",
            class: "side-item-row",
            onClick: a[32] || (a[32] = (f) => w.value = !0)
          }, [
            t("span", {
              style: bt({ color: H(i.state.priority) })
            }, "⚑", 4),
            t("span", ya, "P" + x(5 - i.state.priority), 1),
            a[48] || (a[48] = t("span", null, "⌄", -1))
          ], 512),
          w.value ? (l(), Mt(_e, {
            key: 0,
            anchor: Tt.value,
            onClose: a[33] || (a[33] = (f) => w.value = !1)
          }, {
            default: le(() => [
              t("div", wa, [
                (l(), u(st, null, ut(W, (f) => t("button", {
                  key: f.level,
                  type: "button",
                  disabled: !!d(q).pendingWrites,
                  onClick: (X) => et(f.level)
                }, [
                  t("span", {
                    style: bt({ color: f.color })
                  }, "⚑", 4),
                  Ut(" " + x(f.name) + " ", 1),
                  i.state.priority === f.level ? (l(), u("span", Ta, "✓")) : I("", !0)
                ], 8, ha)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : I("", !0)
        ]),
        t("div", Da, [
          a[51] || (a[51] = t("span", { class: "side-prop-label" }, "标签", -1)),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: at,
            type: "button",
            class: "side-item-row",
            onClick: a[34] || (a[34] = (f) => V.value = !0)
          }, [
            t("span", xa, x(i.state.labels.join("、") || "添加标签"), 1),
            a[50] || (a[50] = t("span", null, "＋", -1))
          ], 512),
          V.value ? (l(), Mt(_e, {
            key: 0,
            anchor: at.value,
            onClose: a[36] || (a[36] = (f) => V.value = !1)
          }, {
            default: le(() => [
              t("div", Ca, [
                Pt(t("input", {
                  "onUpdate:modelValue": a[35] || (a[35] = (f) => D.value = f),
                  placeholder: "搜索或新建标签",
                  "aria-label": "搜索标签",
                  onKeydown: St(F(lt, ["prevent"]), ["enter"])
                }, null, 40, $a), [
                  [Kt, D.value]
                ]),
                ft.value ? (l(), u("small", Sa, "读取标签中…")) : I("", !0),
                $.value ? (l(), u("p", Ia, x($.value), 1)) : I("", !0),
                t("div", Ra, [
                  (l(!0), u(st, null, ut(ct.value, (f) => (l(), u("label", {
                    key: f,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + x(f), 1),
                    t("input", {
                      type: "checkbox",
                      checked: i.state.labels.includes(f),
                      disabled: !!d(q).pendingWrites,
                      onChange: (X) => m("toggleLabelSelect", f)
                    }, null, 40, _a)
                  ]))), 128))
                ]),
                D.value.trim() && !kt.value.includes(D.value.trim()) ? (l(), u("button", {
                  key: 2,
                  type: "button",
                  disabled: !!d(q).pendingWrites,
                  onClick: lt
                }, "＋ 创建“" + x(D.value.trim()) + "”", 9, La)) : I("", !0),
                !ft.value && !ct.value.length && !D.value ? (l(), u("small", Pa, "暂无标签")) : I("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : I("", !0)
        ]),
        t("div", Ma, [
          a[53] || (a[53] = t("span", { class: "side-prop-label" }, [
            Ut("提醒 "),
            t("small", null, "本机")
          ], -1)),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: v,
            type: "button",
            class: "side-item-row",
            onClick: R
          }, [
            t("span", Oa, x(ne(i.state.reminderTime) || "添加提醒"), 1),
            a[52] || (a[52] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (l(), Mt(Ci, {
            key: 0,
            anchor: v.value,
            "task-id": i.state.taskId,
            value: i.state.reminderTime,
            "task-date": i.editStartDate || i.editDueDate,
            "task-time": i.editStartTime || i.editDueTime,
            onClose: a[37] || (a[37] = (f) => G.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : I("", !0)
        ])
      ])
    ])) : I("", !0);
  }
}), ja = /* @__PURE__ */ oe(Aa, [["__scopeId", "data-v-3b157130"]]), Ea = { class: "inspector-title-row" }, Wa = ["title", "aria-label"], Ua = ["disabled"], za = ["href"], Ba = "todoistInspectorPositionV2", Ha = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorDrawer",
  setup(i) {
    const n = b, c = it(() => Lt.get(n.taskId)), m = it(() => c.value?.status === "failed" ? "保存未确认" : c.value?.status === "saving" ? "正在保存…" : B.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), C = it(() => [
      m.value,
      c.value?.status === "failed" ? c.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: r,
      headerRef: O,
      initialStyle: S,
      onHeaderPointerDown: j,
      onResizePointerDown: K
    } = Je({
      windowId: "todoist-inspector",
      storageKey: Ba,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => n.isOpen && q.active
    }), B = P(""), z = P(""), N = P(""), E = P(""), h = P(""), L = P(""), y = P(!1), k = P(!1), w = P(null), V = P(!1), G = P(""), D = P(""), at = P(!1), v = it(() => {
      const T = n.description || "", g = [], _ = T.split(`
`);
      let mt = 0;
      for (const xt of _) {
        const vt = xt.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        vt && g.push({
          id: `st_${mt++}`,
          completed: vt[1].toLowerCase() === "x",
          text: vt[2].trim()
        });
      }
      return g;
    }), Tt = it(() => v.value.filter((T) => T.completed).length);
    function Dt(T) {
      const mt = (n.description || "").split(`
`).filter((Bt) => !Bt.match(/^\s*-\s*\[([ xX])\]/)), xt = T.map((Bt) => `- [${Bt.completed ? "x" : " "}] ${Bt.text}`), vt = [...mt, ...xt].join(`
`).trim();
      z.value = vt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(B.value, vt);
    }
    function ft() {
      if (!G.value.trim()) return;
      const T = [...v.value, {
        id: `st_${Date.now()}`,
        text: G.value.trim(),
        completed: !1
      }];
      G.value = "", V.value = !1, Dt(T);
    }
    function $(T) {
      const g = v.value.map((_) => _.id === T ? { ..._, completed: !_.completed } : _);
      Dt(g);
    }
    function A(T) {
      const g = v.value.filter((_) => _.id !== T);
      Dt(g);
    }
    const R = it(() => {
      for (const T of wt.columns || []) {
        const g = T.tasks.find((_) => _.id === n.taskId);
        if (g) return !!g.completed;
      }
      return !1;
    });
    async function W() {
      for (const T of wt.columns || []) {
        const g = T.tasks.find((_) => _.id === n.taskId);
        if (g) {
          const _ = !g.completed;
          g.completed = _, g._taskRaw && (g._taskRaw.checked = _);
          try {
            await nt.toggleTaskCompletion(g.id, _);
          } catch {
            g.completed = !_, g._taskRaw && (g._taskRaw.checked = !_), n.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function H(T) {
      rt.setPriority(T);
    }
    function et(T) {
      rt.toggleLabel(T);
    }
    function kt(T) {
      rt.toggleLabel(T);
    }
    async function ct(T) {
      T.trim() && (n.labels.includes(T.trim()) || await rt.createAndAttachLabel(T.trim()));
    }
    async function lt() {
      if (!D.value.trim() || at.value) return;
      const T = D.value.trim();
      at.value = !0;
      try {
        await rt.addComment(T), D.value = "";
      } finally {
        at.value = !1;
      }
    }
    dt(() => n.title, (T) => {
      B.value = T || "";
    }, { immediate: !0 }), dt(() => n.description, (T) => {
      z.value = (T || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), dt(() => n.startDate, (T) => {
      N.value = T || "";
    }, { immediate: !0 }), dt(() => n.startTime, (T) => {
      E.value = T || "";
    }, { immediate: !0 }), dt(() => n.dueDate, (T) => {
      h.value = T || "";
    }, { immediate: !0 }), dt(() => n.dueTime, (T) => {
      L.value = T || "";
    }, { immediate: !0 });
    function Z() {
      const T = /* @__PURE__ */ new Date();
      return `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`;
    }
    function pt() {
      E.value && !N.value && (N.value = Z()), rt.setStartDateAndTime(N.value, E.value);
    }
    function Ot() {
      E.value = "", pt();
    }
    function Nt() {
      N.value = "", E.value = "", pt();
    }
    function yt() {
      L.value && !h.value && (h.value = Z()), rt.setDueDateAndTime(h.value, L.value);
    }
    function Yt() {
      L.value = "", yt();
    }
    function ne() {
      h.value = "", L.value = "", yt();
    }
    const Gt = it(() => {
      const T = [], g = /* @__PURE__ */ new Set(), _ = n.description || "", mt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let xt;
      for (; (xt = mt.exec(_)) !== null; ) {
        const vt = xt[2];
        g.add(vt), T.push({
          name: xt[1] || "任务照片",
          url: vt
        });
      }
      for (const vt of n.commentAttachments || [])
        g.has(vt.url) || (g.add(vt.url), T.push(vt));
      return T;
    });
    let U, a;
    function f() {
      const T = (n.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), g = [z.value.trim(), T].filter(Boolean);
      return {
        taskId: n.taskId,
        title: B.value,
        description: g.join(`

`)
      };
    }
    function X() {
      clearTimeout(U), U = void 0;
      const T = a;
      if (a = void 0, T?.taskId && T.title.trim())
        return rt.saveTitleAndDesc(T.title, T.description, T.taskId);
    }
    function It(T) {
      T && "isComposing" in T && T.isComposing || (a = f(), rt.stageTitleDraft(a.taskId, a.title, a.description), clearTimeout(U), U = setTimeout(X, 800));
    }
    dt(() => n.taskId, () => X(), { flush: "sync" });
    function At() {
      X(), rt.close();
    }
    function ge(T) {
      T && "isComposing" in T && T.isComposing || X();
    }
    function be() {
      a = f(), X();
    }
    function se(T) {
      const g = Xt(T);
      g && (T.preventDefault(), T.stopPropagation(), jt(g));
    }
    function ke() {
      q.active && w.value?.click();
    }
    async function ye(T) {
      const g = T.target;
      if (!q.active) {
        g.value = "";
        return;
      }
      const _ = g.files?.[0];
      _ && await jt(_), g.value = "";
    }
    async function we(T) {
      k.value = !1;
      const g = T.dataTransfer?.files?.[0];
      g && (g.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(g.name)) && await jt(g);
    }
    function Xt(T) {
      const g = T.clipboardData;
      if (!g) return null;
      if (g.files && g.files.length > 0)
        for (let _ = 0; _ < g.files.length; _++) {
          const mt = g.files[_];
          if (mt.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(mt.name))
            return mt;
        }
      if (g.items && g.items.length > 0)
        for (let _ = 0; _ < g.items.length; _++) {
          const mt = g.items[_];
          if (mt.type.includes("image")) {
            const xt = mt.getAsFile();
            if (xt) return xt;
          }
        }
      return null;
    }
    async function jt(T) {
      if (y.value || !q.active || !n.taskId) return;
      const g = n.taskId;
      y.value = !0;
      try {
        if (await X(), n.taskId !== g || !n.isOpen || !q.active) return;
        await rt.attachImageToTask(T);
      } catch (_) {
        n.taskId === g && (n.error = _ instanceof Error ? _.message : "上传失败");
      } finally {
        y.value = !1;
      }
    }
    function Et(T) {
      const g = Xt(T);
      g && (T.preventDefault(), jt(g));
    }
    function qt(T) {
      if (!n.isOpen || !q.active) return;
      const g = Xt(T);
      g && (T.preventDefault(), T.stopPropagation(), jt(g));
    }
    dt(() => q.active, (T) => {
      window.removeEventListener("paste", qt, { capture: !0 }), T && window.addEventListener("paste", qt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), zt(() => {
      X(), window.removeEventListener("paste", qt, { capture: !0 });
    });
    async function de(T) {
      const g = n.description || "", _ = T.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), mt = g.replace(new RegExp(`!\\[[^\\]]*\\]\\(${_}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(n.title, mt);
    }
    return (T, g) => Pt((l(), u("aside", {
      ref_key: "panelRef",
      ref: r,
      class: "todoist-inspector-window",
      style: bt(d(S)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: Et
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: O,
        class: "inspector-header",
        onPointerdown: g[2] || (g[2] = (_) => d(j)(_))
      }, [
        t("div", Ea, [
          g[18] || (g[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          c.value ? (l(), u("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: g[0] || (g[0] = F(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: C.value,
              "aria-label": C.value
            }, x(m.value), 9, Wa),
            c.value.status !== "saving" ? (l(), u("button", {
              key: 0,
              type: "button",
              disabled: d(n).saving || !B.value.trim(),
              onClick: F(be, ["stop"])
            }, x(c.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Ua)) : I("", !0)
          ], 32)) : I("", !0),
          d(n).url ? (l(), u("a", {
            key: 1,
            href: d(n).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, za)) : I("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: g[1] || (g[1] = F(() => {
          }, ["stop"])),
          onClick: F(At, ["stop"])
        }, "×", 32)
      ], 544),
      d(n).isOpen ? (l(), Mt(ja, {
        key: d(n).taskId,
        state: d(n),
        "edit-title": B.value,
        "onUpdate:editTitle": g[3] || (g[3] = (_) => B.value = _),
        "edit-description": z.value,
        "onUpdate:editDescription": g[4] || (g[4] = (_) => z.value = _),
        "edit-start-date": N.value,
        "onUpdate:editStartDate": g[5] || (g[5] = (_) => N.value = _),
        "edit-start-time": E.value,
        "onUpdate:editStartTime": g[6] || (g[6] = (_) => E.value = _),
        "edit-due-date": h.value,
        "onUpdate:editDueDate": g[7] || (g[7] = (_) => h.value = _),
        "edit-due-time": L.value,
        "onUpdate:editDueTime": g[8] || (g[8] = (_) => L.value = _),
        "is-uploading-img": y.value,
        "is-drag-over": k.value,
        "is-task-completed": R.value,
        subtasks: v.value,
        "completed-subtasks-count": Tt.value,
        "is-adding-subtask": V.value,
        "onUpdate:isAddingSubtask": g[9] || (g[9] = (_) => V.value = _),
        "new-subtask-text": G.value,
        "onUpdate:newSubtaskText": g[10] || (g[10] = (_) => G.value = _),
        "new-comment-text": D.value,
        "onUpdate:newCommentText": g[11] || (g[11] = (_) => D.value = _),
        "is-submitting-comment": at.value,
        "attached-images": Gt.value,
        "available-labels": d(wt).availableLabels || [],
        onScheduleDraftSave: It,
        onSaveTitleAndDesc: ge,
        onToggleComplete: W,
        onTriggerFileInput: ke,
        onDragover: g[12] || (g[12] = (_) => k.value = !0),
        onDragleave: g[13] || (g[13] = (_) => k.value = !1),
        onDropImage: we,
        onDescPaste: se,
        onRemoveAttachedImage: de,
        onToggleSubtask: $,
        onRemoveSubtask: A,
        onConfirmAddSubtask: ft,
        onSubmitComment: lt,
        onStartChange: pt,
        onClearStartDate: Nt,
        onClearStartTime: Ot,
        onDueChange: yt,
        onClearDueDate: ne,
        onClearDueTime: Yt,
        onSelectPriority: H,
        onToggleLabelSelect: et,
        onRemoveLabel: kt,
        onCreateLabel: ct
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : I("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: w,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ye
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: g[14] || (g[14] = (_) => d(K)(_, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: g[15] || (g[15] = (_) => d(K)(_, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: g[16] || (g[16] = (_) => d(K)(_, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: g[17] || (g[17] = (_) => d(K)(_, "w"))
      }, null, 32)
    ], 36)), [
      [Re, d(n).isOpen]
    ]);
  }
}), Na = /* @__PURE__ */ oe(Ha, [["__scopeId", "data-v-35222deb"]]), Va = { class: "vue-todoist-workspace-wrapper" }, Ka = { class: "todoist-head-title-wrap" }, Fa = { id: "todoist-workspace-title" }, Ya = {
  id: "todoist-view-tabs",
  class: "todoist-view-tabs",
  "aria-label": "Todoist 视图"
}, Ga = {
  class: "muted small",
  role: "status"
}, Xa = ["aria-expanded"], qa = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Qa = { class: "todoist-workspace-cal-area" }, Ja = { class: "todoist-workspace-task-area" }, Za = "todoistWorkspacePosition", fl = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspace",
  setup(i) {
    const n = P(!1), c = ko(() => import("./TodoistAccountSettings-Duun8Ppa.js")), m = P(!1), C = P(!1), r = P(!document.hidden), O = P(!1), S = it(() => q.visible && r.value);
    q.session++, q.active = S.value, Ze(
      () => S.value && !wt.movingTaskId,
      te,
      () => J.loadWorkspace(void 0, void 0, !0)
    );
    let j = !1;
    const K = P(null), B = So;
    function z() {
      N.value && (N.value.style.removeProperty("width"), N.value.style.removeProperty("height"), N.value.style.removeProperty("left"), N.value.style.removeProperty("top"), N.value.style.removeProperty("right"), N.value.style.removeProperty("bottom"), N.value.style.removeProperty("margin"), N.value.style.removeProperty("transform"));
    }
    dt(() => q.visible, (R) => {
      R && (B.isOpen = !0, q.active = r.value, J.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: N,
      headerRef: E,
      initialStyle: h,
      stopInteractions: L,
      onHeaderPointerDown: y,
      onResizePointerDown: k,
      bringToFront: w
    } = Je({
      windowId: "todoist",
      storageKey: Za,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => S.value
    }), V = () => N.value;
    function G() {
      te(), Co(), $o(), rt.cancelReads(), L(), window.removeEventListener("keydown", v);
    }
    const D = ho(G);
    function at() {
      r.value = !document.hidden;
    }
    function v(R) {
      R.key === "Escape" && b.isOpen && (R.preventDefault(), R.stopPropagation(), rt.close());
    }
    dt(S, (R) => {
      q.active = R, R ? (window.addEventListener("keydown", v), j || (j = !0, J.loadWorkspace()), Rt(() => {
        S.value && w();
      })) : G();
    }, { flush: "sync" }), dt(m, (R) => {
      R && (C.value = !0);
    }), dt([S, n, Fe], ([R, W, H]) => {
      if (!(!R || !W || !H) && (Fe.value = null, Io("todoist") === H.transition)) {
        if (q.pendingWrites || b.isOpen && b.taskId !== H.id) {
          _o.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        b.isOpen && b.taskId === H.id || rt.openTask(H.id);
      }
    }, { flush: "post" }), ee(() => {
      n.value = !0, O.value && Rt(z), pe.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: V }), document.addEventListener("visibilitychange", at), S.value && (window.addEventListener("keydown", v), j || (j = !0, J.loadWorkspace()), Ve.refresh());
    }), zt(() => {
      To(), D(), document.removeEventListener("visibilitychange", at), pe.unregister("todoist", V), rt.close(), Object.assign(b, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), J.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), $e.updateState({ title: "收件箱", isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ve.update([]);
    });
    function Tt() {
      $e.toggleCalendar();
    }
    function Dt() {
      $e.refresh();
    }
    function ft() {
      J.updateState({ accountConfigured: !0 }), S.value && J.loadWorkspace(void 0, void 0, !0);
    }
    function $() {
      pe.minimize("todoist");
    }
    function A() {
      q.visible = !1, B.isOpen = !1, pe.close("todoist");
    }
    return (R, W) => (l(), u("div", Va, [
      Pt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: N,
        class: "card wide todoist-workspace",
        style: bt(d(h)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: E,
          class: "todoist-workspace-head",
          onPointerdown: W[4] || (W[4] = (H) => d(y)(H))
        }, [
          t("div", Ka, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Fa, x(d(B).title), 1)
          ]),
          t("nav", Ya, [
            Zt(jo)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: Q(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: d(B).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: Tt
          }, " 📅 日历 ", 2),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Ga, x(d(q).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: K,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": m.value,
            onClick: W[0] || (W[0] = F((H) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Xa),
          C.value ? (l(), Mt(d(c), {
            key: 0,
            visible: S.value && m.value,
            anchor: K.value,
            onClose: W[1] || (W[1] = (H) => m.value = !1),
            onAccountSaved: ft
          }, null, 8, ["visible", "anchor"])) : I("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: "刷新",
            onClick: Dt
          }, " ↻ "),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: "最小化（标签保留）",
            onPointerdown: W[2] || (W[2] = F(() => {
            }, ["stop"])),
            onClick: F($, ["stop"])
          }, " − ", 32),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: "隐藏窗口 (Esc)；Dock 退出释放窗口资源",
            onPointerdown: W[3] || (W[3] = F(() => {
            }, ["stop"])),
            onClick: F(A, ["stop"])
          }, " ✕ ", 32)
        ], 544),
        d(wt).accountConfigured === !1 ? (l(), Mt(Ro, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: W[5] || (W[5] = (H) => m.value = !0)
        })) : (l(), u("div", qa, [
          Pt(t("div", Qa, [
            Zt(wn)
          ], 512), [
            [Re, d(B).isCalendarOpen]
          ]),
          t("div", Ja, [
            Zt(vi)
          ])
        ])),
        Zt(Na),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        O.value ? I("", !0) : (l(), u(st, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: W[6] || (W[6] = (H) => d(k)(H, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: W[7] || (W[7] = (H) => d(k)(H, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: W[8] || (W[8] = (H) => d(k)(H, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: W[9] || (W[9] = (H) => d(k)(H, "w"))
          }, null, 32)
        ], 64))
      ], 4), [
        [Re, d(q).visible]
      ])
    ]));
  }
});
export {
  fl as default
};
