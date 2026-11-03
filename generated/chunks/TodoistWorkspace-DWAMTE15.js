import { d as Ht, o as r, g as c, F as nt, h as t, u as e, C as J, t as v, r as Jt, z as zt, w as dt, D as ee, p as Ut, j as ct, k as Y, i as I, b as M, O as Qe, J as Be, B as bt, y as it, H as It, n as Pt, q as Kt, E as Zt, f as le, m as St, e as Mt, A as Ie, G as ko } from "./vendor-vue-dDCd4-uG.js";
import { a as yo, t as Q, w as ho, o as wo, p as To } from "./module-state-9dj2qWDB.js";
import { b as He, h as Ne, i as te, j as ht, e as Z, d as gt, c as Do, k as xo, t as Ve, g as $e, l as Co, m as $o, n as So } from "./calendar.service-DdfVd2EX.js";
import { u as Je } from "./useWindowDraggable-DZJOljY8.js";
import { w as pe, b as _o } from "./window-manager.store-BaRzBtVM.js";
import { t as m, _ as oe } from "./_plugin-vue_export-helper-CRVO6deU.js";
import { A as Io } from "./AccountSetupGuide-BYSUQS4o.js";
import { i as Pe } from "./image-viewer-store-DHinKyiX.js";
import { n as Ro } from "./view-styles-HjAT5OZi.js";
import { t as st, d as Lo, s as Po, b as me, g as Ke, f as Se, p as Mo } from "./todoist.service-Dv_P8OyB.js";
import { u as Ze, g as to, T as Oo } from "./TaskRepositoryLinks-BdZKJZim.js";
import { A as eo } from "./search.service-Ch5HygjH.js";
import { I as Re, T as Le } from "./TodoistDatePickerPopover-JsxrTqEB.js";
import { m as Ao } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Fe } from "./task-navigation-CAQ3LPno.js";
const jo = ["title"], Eo = { class: "todoist-tab-text" }, Wo = ["title"], Uo = { class: "todoist-tab-text" }, zo = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspaceTabs",
  setup(a) {
    return (n, u) => (r(), c(nt, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: J({ on: e(Ne).view === "inbox" }),
        title: e(m)("todoist.inbox"),
        onClick: u[0] || (u[0] = (f) => e(He).switchView("inbox"))
      }, [
        u[2] || (u[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", Eo, v(e(m)("todoist.inbox")), 1)
      ], 10, jo),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: J({ on: e(Ne).view === "projects" }),
        title: e(m)("todoist.projects"),
        onClick: u[1] || (u[1] = (f) => e(He).switchView("projects"))
      }, [
        u[3] || (u[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", Uo, v(e(m)("todoist.projects")), 1)
      ], 10, Wo)
    ], 64));
  }
}), oo = "todoist_reminder_v2:", Bo = "todoist_remind_";
async function Ho(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const n = oo + a, u = await chrome.storage.local.get([n, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(u, n) ? u[n] || void 0 : u.todoist_reminders_map_v1?.[a];
}
async function No(a, n, u) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const f = new Date(n).getTime();
  if (n && (!Number.isFinite(f) || f <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (n && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const $ = oo + a, d = Bo + a;
  await chrome.alarms.clear(d), await chrome.storage.local.set({ [$]: n ? { time: n, title: u } : null }), n && await chrome.alarms.create(d, { when: f });
}
const Lt = Jt(/* @__PURE__ */ new Map());
let Vo = 0;
function Ye(a, n, u, f = "editing") {
  const $ = ++Vo;
  return Lt.set(a, { revision: $, title: n, description: u, status: f, error: "" }), $;
}
const y = Jt({
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
let _e = Promise.resolve(), fe = 0, Xe = Promise.resolve();
const ve = /* @__PURE__ */ new Map();
let re = 0;
const Ft = /* @__PURE__ */ new Map();
function ae(a = !0) {
  a && re++;
  for (const n of Ft.values()) n.abort();
  Ft.clear(), y.loading = !1;
}
function Ge(a) {
  Ft.get(a)?.abort();
  const n = new AbortController();
  Ft.set(a, n);
  const u = re, f = y.taskId;
  return {
    signal: n.signal,
    current: () => !n.signal.aborted && u === re && y.isOpen && f === y.taskId && Ft.get(a) === n,
    finish: () => {
      Ft.get(a) === n && Ft.delete(a);
    }
  };
}
function Wt() {
  ae(!1);
  const a = y.taskId, n = re;
  return { taskId: a, current: () => y.isOpen && n === re && a === y.taskId };
}
function Ko(a) {
  return new Promise((n) => {
    const u = new FileReader();
    u.onload = () => n(u.result || ""), u.onerror = () => n(""), u.readAsDataURL(a);
  });
}
function qe(a, n, u) {
  for (const f of ht.columns)
    for (const $ of f.tasks)
      String($.id) === a && ($.content = n, u !== void 0 && ($.description = u), $._taskRaw && ($._taskRaw.content = n, u !== void 0 && ($._taskRaw.description = u)));
  gt.updateTaskTitle(a, n);
}
const Fo = {
  state: y,
  cancelReads: ae,
  stageTitleDraft(a, n, u) {
    a && (Ye(a, n, u), ae(!1), y.taskId === a && (y.title = n), qe(a, n, u));
  },
  async openTask(a, n) {
    if (!a) return;
    if (ae(), y.taskId = a, y.isOpen = !0, y.error = "", Object.assign(y, {
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
      y.title = n.content || n.title || "", y.description = n.description || n.raw?.description || "", y.priority = n.priority || 1;
      const d = me(n.due?.datetime || n.due?.date || n.dueDate || "");
      y.dueDate = d.date, y.dueTime = d.time;
      const A = n.startDate || Ke(a, y.description), _ = me(A);
      y.startDate = _.date, y.startTime = _.time, y.labels = [...n.labels || []], y.url = n.url || "";
    }
    const u = Lt.get(a);
    u && (y.title = u.title, y.description = u.description);
    const f = Ge("reminder");
    Ho(a).then((d) => {
      f.current() && (y.reminderTime = d?.time || "");
    }).catch(() => {
      f.current() && (y.error = "本机提醒读取失败。");
    }).finally(f.finish);
    const $ = Ge("detail");
    y.loading = !0;
    try {
      const d = await st.api(`/tasks/${encodeURIComponent(a)}`, { signal: $.signal });
      if (d && $.current()) {
        const A = Lt.get(a);
        y.title = A?.title ?? d.content ?? "", y.description = A?.description ?? d.description ?? "", y.priority = d.priority || 1;
        const _ = me(d.due?.datetime || d.due?.date || "");
        y.dueDate = _.date, y.dueTime = _.time;
        const E = Ke(a, d.description || y.description), F = me(E);
        y.startDate = F.date, y.startTime = F.time, y.labels = [...d.labels || []], y.url = d.url || "";
        try {
          const H = await st.getComments(a, $.signal);
          if (H && $.current()) {
            const B = [], V = [];
            for (const W of H) {
              let D;
              if (W?.attachment?.file_url) {
                const P = W.attachment.file_name || "附件图片";
                B.push({ name: P, url: W.attachment.file_url }), D = { name: P, url: W.attachment.file_url };
              }
              V.push({
                id: W.id,
                content: W.content || "",
                postedAt: W.posted_at || "",
                attachment: D
              });
            }
            if (y.commentAttachments = B, y.comments = V, B.length > 0 && y.description) {
              let W = y.description, D = !1;
              for (const P of B) {
                const w = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                w.test(W) && (W = W.replace(w, `$1${P.url}$2`), D = !0);
              }
              if (D && !Lt.has(a)) {
                y.description = W;
                for (const P of ht.columns) {
                  const w = P.tasks.find((h) => String(h.id) === a);
                  if (w) {
                    w.description = W, w._taskRaw && (w._taskRaw.description = W);
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
      $.current() && (y.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      $.current() && (y.loading = !1), $.finish();
    }
  },
  close() {
    ae(), y.isOpen = !1, y.taskId = "";
  },
  async setStartDateAndTime(a, n) {
    if (!y.taskId) return;
    const u = Wt(), f = a.trim(), $ = f ? n.trim() : "";
    y.startDate = f, y.startTime = $, te();
    const d = Lo(f, $);
    Po(u.taskId, d), st.invalidateWorkspaceSnapshots();
    for (const A of ht.columns) {
      const _ = A.tasks.find((E) => E.id === u.taskId);
      _ && (_.startDate = d);
    }
  },
  async setDueDateAndTime(a, n) {
    if (!y.taskId) return;
    const u = Wt(), f = a.trim(), $ = f ? n.trim() : "";
    y.dueDate = f, y.dueTime = $, te(), st.invalidateWorkspaceSnapshots();
    const d = (ve.get(u.taskId) || 0) + 1;
    ve.set(u.taskId, d);
    const A = Xe.then(async () => {
      try {
        const _ = await st.updateTask(u.taskId, {
          due_string: f ? $ ? `${f} ${$}` : f : "no date"
        });
        if (ve.get(u.taskId) !== d) return;
        const E = st.mapTasks([_], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const F of ht.columns) {
          const H = F.tasks.findIndex((V) => V.id === u.taskId);
          if (H < 0) continue;
          const B = F.tasks[H];
          if (Object.assign(B, {
            dueDate: E.dueDate,
            dueText: E.dueText,
            dueString: E.dueString,
            isDueToday: E.isDueToday,
            isOverdue: E.isOverdue,
            isRecurring: E.isRecurring
          }), B._taskRaw && (B._taskRaw.due = _.due), ht.view === "today") {
            const V = E.isOverdue ? "overdue" : E.isDueToday ? "today" : "";
            V !== F.sectionId && (F.tasks.splice(H, 1), ht.columns.find((W) => W.sectionId === V)?.tasks.push(B));
          }
        }
        u.current() && (y.error = "");
      } catch {
        u.current() && ve.get(u.taskId) === d && (y.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Xe = A.catch(() => {
    }), await A;
  },
  async saveTitleAndDesc(a, n, u = y.taskId) {
    const f = u === y.taskId ? Wt() : { taskId: u, current: () => !1 };
    if (!f.taskId || !a.trim()) return;
    const $ = a.trim(), d = n.trim(), A = Ye(u, $, d, "saving");
    f.current() && (y.title = $, y.description = d), qe(f.taskId, $, d), fe++, y.saving = !0;
    const _ = _e.then(async () => {
      try {
        await st.updateTask(f.taskId, {
          content: $,
          description: d
        }), Lt.get(u)?.revision === A && Lt.delete(u), fe === 1 && Lt.size === 0 && Z.dispatch("refresh");
      } catch (E) {
        const F = Lt.get(u);
        F?.revision === A && (F.status = "failed", F.error = E instanceof Error ? E.message : "保存未确认");
      } finally {
        fe--, y.saving = fe > 0;
      }
    });
    _e = _.catch(() => {
    }), await _;
  },
  async attachImageToTask(a) {
    const n = Wt();
    if (await _e, !n.current()) return;
    if (Lt.has(n.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const u = y.description || "";
    if (!n.taskId || y.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    y.saving = !0;
    try {
      const f = a.name || `截图_${Date.now()}.png`;
      let $ = "";
      try {
        const d = await st.uploadFile(a, f);
        d && d.file_url && ($ = d.file_url);
      } catch (d) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", d), a.size <= 2.5 * 1024 * 1024)
          $ = await Ko(a);
        else
          throw new Error(d?.message || "云端上传失败且文件超过2.5MB");
      }
      if ($) {
        const d = u ? `${u}

![${f}](${$})` : `![${f}](${$})`;
        await st.updateTask(n.taskId, {
          description: d
        }), n.current() && (y.description = d);
        for (const A of ht.columns) {
          const _ = A.tasks.find((E) => String(E.id) === n.taskId);
          if (_) {
            _.description = d, _._taskRaw && (_._taskRaw.description = d);
            break;
          }
        }
        Z.dispatch("refresh");
      }
    } catch (f) {
      n.current() && (y.error = f.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${f.message}`);
    } finally {
      y.saving = !1;
    }
  },
  async setPriority(a) {
    if (!y.taskId) return;
    const n = Wt();
    if (![1, 2, 3, 4].includes(a)) return;
    const u = y.priority;
    y.priority = a, te(), st.invalidateWorkspaceSnapshots();
    try {
      await st.updateTask(n.taskId, { priority: a });
      for (const f of ht.columns) {
        const $ = f.tasks.find((d) => d.id === n.taskId);
        $ && ($.priority = a, $._taskRaw && ($._taskRaw.priority = a));
      }
    } catch {
      n.current() && (y.priority = u, y.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!y.taskId) return;
    const n = Wt(), u = [...y.labels], $ = u.includes(a) ? u.filter((d) => d !== a) : [...u, a];
    y.labels = $, te(), st.invalidateWorkspaceSnapshots();
    try {
      await st.updateTask(n.taskId, { labels: $ });
      for (const d of ht.columns) {
        const A = d.tasks.find((_) => _.id === n.taskId);
        A && (A.labels = $, A._taskRaw && (A._taskRaw.labels = $));
      }
    } catch {
      n.current() && (y.labels = u, y.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const n = Wt();
    if (a = a.trim(), !(!n.taskId || !a))
      try {
        const u = await st.getLabels();
        if (!n.current()) return;
        u.some((f) => f.name === a) || await st.createLabel(a), n.current() && !y.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        n.current() && (y.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!y.taskId || !a.trim()) return;
    const n = Wt();
    try {
      const u = await st.addComment({
        task_id: n.taskId,
        content: a.trim()
      });
      u && n.current() && y.comments.push({
        id: u.id || `c_${Date.now()}`,
        content: u.content || a.trim(),
        postedAt: u.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (u) {
      n.current() && (y.error = "发送评论失败：" + (u?.message || ""));
    }
  },
  async setReminder(a) {
    const n = Wt();
    if (n.taskId)
      try {
        await No(n.taskId, a, y.title), n.current() && (y.reminderTime = a, y.error = "");
      } catch (u) {
        n.current() && (y.error = u instanceof Error ? u.message : "提醒未保存，请重试。");
      }
  }
}, rt = yo(Fo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), Yo = ["aria-label"], Xo = { class: "todoist-cal-head" }, Go = { class: "todoist-cal-title-row" }, qo = { class: "todoist-cal-logo" }, Qo = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, Jo = { class: "todoist-cal-head-actions" }, Zo = { class: "todoist-cal-nav" }, ts = { class: "todoist-cal-nav-group" }, es = ["title"], os = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, ss = ["title"], ns = { class: "todoist-cal-nav-group" }, is = ["title"], as = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, ls = ["title"], rs = { class: "todoist-cal-weekdays" }, ds = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, cs = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], us = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, ps = { class: "todoist-cal-agenda" }, ms = { class: "todoist-cal-agenda-head" }, fs = { class: "todoist-cal-agenda-title" }, vs = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, gs = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, bs = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, ks = ["disabled"], ys = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, hs = {
  key: 0,
  class: "todoist-cal-empty"
}, ws = {
  key: 1,
  class: "todoist-cal-empty"
}, Ts = ["onClick"], Ds = { class: "todoist-cal-todo-main" }, xs = ["disabled", "title", "onClick"], Cs = {
  key: 0,
  class: "check-icon"
}, $s = {
  key: 0,
  class: "todoist-cal-task-time"
}, Ss = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, _s = ["title", "onClick"], Is = ["src", "alt"], Rs = { class: "todoist-cal-thumb-tag" }, Ls = /* @__PURE__ */ Ht({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const n = xo;
    Ze(
      () => Q.active,
      () => gt.invalidateReads(),
      () => gt.loadTodosForDate(n.selectedDate, !0)
    ), zt(() => gt.cancelReads()), dt(() => [Q.active, Q.pendingWrites], ([D, P], w) => {
      if (!D || P) {
        gt.cancelReads();
        return;
      }
      gt.loadTodosForDate(n.selectedDate, !!w?.[1]);
    }, { immediate: !0, flush: "sync" });
    function u(D) {
      gt.toggleTodoItem(D);
    }
    function f(D) {
      rt.openTask(D.id, D);
    }
    ee(() => {
      Do.syncSidebarToVue();
    });
    function $() {
      gt.dispatch("today");
    }
    function d() {
      gt.dispatch("prev-month");
    }
    function A() {
      gt.dispatch("next-month");
    }
    function _() {
      gt.dispatch("prev-year");
    }
    function E() {
      gt.dispatch("next-year");
    }
    function F(D) {
      gt.dispatch("select-date", D);
    }
    function H(D, P) {
      gt.dispatch("context-date", {
        date: D,
        clientX: P.clientX,
        clientY: P.clientY
      });
    }
    function B(D, P) {
      const w = Array.from(P.dataTransfer?.types || []);
      (w.includes("application/x-todoist-task-id") || w.includes("text/plain")) && (P.preventDefault(), P.dataTransfer && (P.dataTransfer.dropEffect = "copy"));
    }
    function V(D) {
    }
    function W(D, P) {
      const w = P.dataTransfer?.getData("application/x-todoist-task-id") || P.dataTransfer?.getData("text/plain");
      w && (P.preventDefault(), P.stopPropagation(), gt.dispatch("drop-task", { taskId: w, date: D }));
    }
    return (D, P) => (r(), c("aside", {
      id: "todoist-calendar-sidebar",
      class: J(["todoist-calendar-sidebar", { collapsed: e(n).collapsed }]),
      "aria-label": e(m)("todoist.calendar.sidebarLabel")
    }, [
      t("div", Xo, [
        t("div", Go, [
          t("span", qo, [
            P[1] || (P[1] = Ut("📅 ", -1)),
            t("strong", null, v(e(m)("todoist.calendar.title")), 1)
          ]),
          t("span", Qo, v(e(n).badgeText), 1)
        ]),
        t("div", Jo, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: $
          }, v(e(m)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", Zo, [
        t("div", ts, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.prevMonth"),
            onClick: d
          }, "‹", 8, es),
          t("span", os, v(e(n).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.nextMonth"),
            onClick: A
          }, "›", 8, ss)
        ]),
        t("div", ns, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.prevYear"),
            onClick: _
          }, "‹", 8, is),
          t("span", as, v(e(n).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.nextYear"),
            onClick: E
          }, "›", 8, ls)
        ])
      ]),
      t("div", rs, [
        t("span", null, v(e(m)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, v(e(m)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, v(e(m)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, v(e(m)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, v(e(m)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, v(e(m)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, v(e(m)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", ds, [
        (r(!0), c(nt, null, ct(e(n).cells, (w) => (r(), c("button", {
          key: w.date,
          type: "button",
          class: J(["todoist-cal-cell", {
            outside: w.isOutside,
            today: w.isToday,
            selected: w.isSelected
          }]),
          "data-date": w.date,
          role: "gridcell",
          title: w.title,
          onClick: (h) => F(w.date),
          onContextmenu: Y((h) => H(w.date, h), ["prevent"]),
          onDragover: (h) => B(w.date, h),
          onDragleave: (h) => (w.date, void 0),
          onDrop: (h) => W(w.date, h)
        }, [
          t("span", null, v(w.dayNumber), 1),
          w.hasDot ? (r(), c("span", us)) : I("", !0)
        ], 42, cs))), 128))
      ]),
      t("div", ps, [
        t("div", ms, [
          t("strong", fs, v(e(n).agendaTitle), 1),
          t("span", vs, v(e(m)("todoist.calendar.itemCount", { count: e(n).todoItems.length })), 1)
        ]),
        e(n).writeError ? (r(), c("p", gs, v(e(n).writeError), 1)) : I("", !0),
        e(n).emptyText ? (r(), c("div", bs, [
          Ut(v(e(n).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(n).todoLoading || e(Q).pendingWrites > 0,
            onClick: P[0] || (P[0] = (w) => e(gt).loadTodosForDate(e(n).selectedDate, !0))
          }, v(e(m)("todoist.calendar.retryLoad")), 9, ks)
        ])) : I("", !0),
        t("div", ys, [
          e(n).todoLoading && !e(n).todoItems.length ? (r(), c("div", hs, v(e(m)("todoist.calendar.loading")), 1)) : e(n).todoItems.length === 0 && !e(n).emptyText ? (r(), c("div", ws, v(e(m)("todoist.calendar.emptyDay")), 1)) : (r(!0), c(nt, { key: 2 }, ct(e(n).todoItems, (w) => (r(), c("div", {
            key: w.id,
            class: J(["todoist-cal-todo-card", { completed: w.completed }]),
            onClick: (h) => f(w)
          }, [
            t("div", Ds, [
              t("button", {
                type: "button",
                class: J(["todoist-cal-check", { checked: w.completed }]),
                disabled: e(Q).pendingWrites > 0,
                title: w.completed ? e(m)("todoist.calendar.clickToReopen") : e(m)("todoist.calendar.clickToComplete"),
                onClick: Y((h) => u(w), ["stop"])
              }, [
                w.completed ? (r(), c("span", Cs, "✓")) : I("", !0)
              ], 10, xs),
              t("span", {
                class: J(["todoist-cal-todo-title", { strike: w.completed }])
              }, v(w.content), 3),
              w.time ? (r(), c("small", $s, v(w.time), 1)) : I("", !0),
              w.completed ? (r(), c("span", Ss, v(e(m)("todoist.calendar.completedTag")), 1)) : I("", !0)
            ]),
            w.thumbUrl ? (r(), c("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(m)("todoist.calendar.viewPhoto"),
              onClick: Y((h) => e(Pe).open(w.thumbUrl, w.content), ["stop"])
            }, [
              t("img", {
                src: w.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(m)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, Is),
              t("span", Rs, v(e(m)("todoist.calendar.photoTag")), 1)
            ], 8, _s)) : I("", !0)
          ], 10, Ts))), 128))
        ])
      ])
    ], 10, Yo));
  }
}), Ps = /* @__PURE__ */ oe(Ls, [["__scopeId", "data-v-6114d4da"]]);
function Ms(a) {
  const n = a.state, u = M(null), f = M(null), $ = M(null), d = M(!1), A = Qe(null), _ = M(), E = /* @__PURE__ */ new Map();
  function F(S) {
    E.clear();
    const j = S.closest(".todoist-board");
    if (j)
      for (const R of j.querySelectorAll(".todoist-board-list")) {
        const U = n.columns[Number(R.dataset.groupIndex)];
        if (!U) continue;
        const N = R.__todoistSlots;
        if (!N) continue;
        const ot = N(), kt = ot.filter((ut) => ut.id !== h?.id);
        E.set(U, { list: R, rows: kt, read: N, snapshot: ot });
      }
  }
  let H = 0, B;
  function V(S, j) {
    B = { clientY: S.clientY, col: j }, !H && (H = requestAnimationFrame(() => {
      H = 0;
      const R = B;
      B = void 0, R && W(R, R.col);
    }));
  }
  function W(S, j) {
    if (!h || n.movingTaskId) return;
    const R = E.get(j);
    if (!R) return;
    const U = R.read();
    U !== R.snapshot && (R.snapshot = U, R.rows = U.filter((tt) => tt.id !== h?.id));
    const N = S.clientY - R.list.getBoundingClientRect().top + R.list.scrollTop;
    let ot = 0, kt = R.rows.length;
    for (; ot < kt; ) {
      const tt = ot + kt >>> 1;
      N < R.rows[tt].middle ? kt = tt : ot = tt + 1;
    }
    let ut = ot;
    if (f.value === n.columns.indexOf(j)) {
      const tt = _.value ? R.rows.findIndex((pt) => pt.id === _.value) : R.rows.length;
      tt >= 0 && ut > tt && N < R.rows[tt].middle + 10 && (ut = tt), tt > 0 && ut < tt && N > R.rows[tt - 1].middle - 10 && (ut = tt);
    }
    const lt = R.rows[ut]?.id;
    w(j, lt), f.value === n.columns.indexOf(j) && ($.value = lt || R.rows[R.rows.length - 1]?.id || null, d.value = !lt);
  }
  function D(S) {
    return S === A.value;
  }
  function P(S, j) {
    if (j !== f.value || !A.value) return S.tasks;
    const R = [...S.tasks], U = _.value ? R.findIndex((N) => N.id === _.value) : -1;
    return R.splice(U < 0 ? R.length : U, 0, A.value), R;
  }
  function w(S, j) {
    if (!h || !T) return;
    if (n.view === "today" && S.sectionId === "overdue" && T.sectionId !== "overdue") {
      f.value = null;
      return;
    }
    const R = j ? S.tasks.find((ot) => ot.id === j) : void 0, U = S === T ? String(h._taskRaw?.parent_id || "") : "";
    if (R && n.view !== "today" && String(R._taskRaw?.parent_id || "") !== U) {
      f.value = null;
      return;
    }
    const N = n.columns.indexOf(S);
    N < 0 || (_.value = j, f.value = N);
  }
  let h = null, T = null;
  function K(S, j, R, U) {
    if (!a.isActive() || n.loading || n.movingTaskId || n.moveNeedsRefresh || j.completed || j.id.startsWith("optimistic-") || a.editingTaskId() === j.id) {
      S.preventDefault();
      return;
    }
    if (S.stopPropagation(), a.closePopovers(), u.value = j.id, h = j, T = R, A.value = { ...j }, F(S.currentTarget), S.dataTransfer) {
      S.dataTransfer.effectAllowed = "move";
      const N = S.currentTarget, ot = N.getBoundingClientRect();
      S.dataTransfer.setDragImage(
        N,
        Math.max(0, Math.min(ot.width, S.clientX - ot.left)),
        Math.max(0, Math.min(ot.height, S.clientY - ot.top))
      ), S.dataTransfer.clearData(), S.dataTransfer.setData("application/x-todoist-task-id", j.id), S.dataTransfer.setData("application/x-logicweaver-todoist-task", j.id), S.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: j.id, sectionId: R.sectionId }));
    }
  }
  function G() {
    cancelAnimationFrame(H), H = 0, B = void 0, u.value = null, f.value = null, $.value = null, d.value = !1, h = null, T = null, A.value = null, _.value = void 0, E.clear();
  }
  function C(S, j) {
    !h || n.movingTaskId || (S.preventDefault(), S.stopPropagation(), S.dataTransfer && (S.dataTransfer.dropEffect = "move"), V(S, n.columns[j]));
  }
  function at(S, j) {
    S.currentTarget?.contains(S.relatedTarget);
  }
  function b(S, j, R, U) {
    S.dataTransfer && (S.dataTransfer.dropEffect = "move"), V(S, R);
  }
  async function Tt(S, j) {
    B && B.col === S && (W(B, B.col), j = _.value);
    const R = h, U = T;
    G(), !(!R || !U || !a.isActive() || n.movingTaskId) && (n.view === "today" ? S.sectionId === "today" && U.sectionId !== "today" ? await a.moveTask(R.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, j) : await a.moveTask(R.id, { sectionId: S.sectionId }, j) : await a.moveTask(R.id, {
      projectId: S.projectId,
      sectionId: S.sectionId
    }, j));
  }
  async function Dt(S, j, R, U) {
    S.preventDefault();
    const N = S.dataTransfer?.getData("application/x-todoist-label") || (S.dataTransfer?.getData("text/plain")?.startsWith("label:") ? S.dataTransfer.getData("text/plain").slice(6) : "");
    if (N) {
      a.dropLabel(j, N);
      return;
    }
    if (f.value === n.columns.indexOf(R)) {
      await Tt(R, _.value);
      return;
    }
    const ot = S.currentTarget.getBoundingClientRect(), kt = S.clientY >= ot.top + ot.height / 2, ut = R.tasks.filter((pt) => pt.id !== h?.id), lt = ut.findIndex((pt) => pt.id === j.id), tt = j.id === h?.id ? j.id : kt ? ut[lt + 1]?.id : j.id;
    await Tt(R, tt);
  }
  async function ft(S, j) {
    S.preventDefault(), S.stopPropagation(), await Tt(j, f.value === n.columns.indexOf(j) ? _.value : void 0);
  }
  return dt(() => [n.view, n.activeProjectId], () => G()), dt(() => n.columns, (S) => {
    T && !S.includes(T) && G();
  }), dt(a.isActive, (S) => {
    S || G();
  }, { immediate: !0, flush: "sync" }), zt(G), {
    draggingTaskId: u,
    dragOverColIndex: f,
    dragOverTaskId: $,
    dragAfterTask: d,
    isDragPreview: D,
    previewTasks: P,
    onTaskDragStart: K,
    onTaskDragEnd: G,
    onColDragOver: C,
    onColDragLeave: at,
    onTaskDragOver: b,
    onTaskDrop: Dt,
    onColDrop: ft
  };
}
const Os = ["data-row-key"], As = /* @__PURE__ */ Ht({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const n = a, u = M(null), f = /* @__PURE__ */ new Map(), $ = M(0), d = Qe({ top: 0, height: 600 }), A = (w) => n.isPreview(w) ? `preview:${w.id}` : w.id, _ = it(() => {
      $.value;
      const w = [0];
      for (const h of n.tasks) {
        const T = h.id === n.hiddenId && !n.isPreview(h) ? 0 : f.get(A(h)) || f.get(h.id) || 110;
        w.push(w[w.length - 1] + T);
      }
      return w;
    }), E = it(() => {
      $.value;
      let w = 0;
      return n.tasks.filter((h) => !n.isPreview(h)).map((h) => {
        const T = f.get(h.id) || 110, K = { id: h.id, middle: w + T / 2 };
        return w += T, K;
      });
    });
    function F(w) {
      const h = _.value;
      let T = 0, K = n.tasks.length;
      for (; T < K; ) {
        const G = T + K >>> 1;
        h[G + 1] < w ? T = G + 1 : K = G;
      }
      return T;
    }
    const H = it(() => {
      const w = Math.max(0, F(d.value.top) - 5), h = Math.min(n.tasks.length, F(d.value.top + d.value.height) + 6), T = /* @__PURE__ */ new Set();
      for (let K = w; K < h; K++) T.add(K);
      if (n.pinnedId) {
        const K = n.tasks.findIndex((G) => G.id === n.pinnedId && !n.isPreview(G));
        K >= 0 && T.add(K);
      }
      return [...T].sort((K, G) => K - G).map((K) => ({ task: n.tasks[K], index: K, top: _.value[K] }));
    });
    let B = 0;
    function V() {
      B || (B = requestAnimationFrame(() => {
        B = 0, u.value && (d.value = { top: u.value.scrollTop, height: u.value.clientHeight });
      }));
    }
    let W;
    const D = /* @__PURE__ */ new Map();
    function P(w, h) {
      const T = D.get(h);
      T !== w && (T && W?.unobserve(T), w instanceof HTMLElement ? (D.set(h, w), W?.observe(w)) : D.delete(h));
    }
    return dt(() => n.tasks, () => {
      const w = new Set(n.tasks.map(A));
      for (const h of f.keys()) w.has(h) || f.delete(h);
      It(V);
    }), ee(() => {
      W = new ResizeObserver((w) => {
        let h = !1;
        const T = F(u.value?.scrollTop || 0), K = _.value[T] || 0;
        for (const G of w) {
          const C = G.target;
          if (C === u.value) {
            V();
            continue;
          }
          const at = C.dataset.rowKey, b = G.borderBoxSize?.[0]?.blockSize || G.contentRect.height;
          at && b > 0 && Math.abs((f.get(at) || 0) - b) > 0.5 && (f.set(at, b), h = !0);
        }
        if (h) {
          $.value++;
          const G = (_.value[T] || 0) - K;
          u.value && G && !n.pinnedId && (u.value.scrollTop += G), V();
        }
      }), u.value && (W.observe(u.value), u.value.__todoistSlots = () => E.value);
      for (const w of D.values()) W.observe(w);
      V();
    }), zt(() => {
      W?.disconnect(), cancelAnimationFrame(B), u.value && delete u.value.__todoistSlots, D.clear(), f.clear();
    }), (w, h) => (r(), c("div", {
      ref_key: "root",
      ref: u,
      onScrollPassive: V
    }, [
      a.tasks.length ? (r(), c("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${_.value[_.value.length - 1]}px` })
      }, [
        (r(!0), c(nt, null, ct(H.value, (T) => (r(), c("div", {
          key: A(T.task),
          ref_for: !0,
          ref: (K) => P(K, A(T.task)),
          "data-row-key": A(T.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${T.top}px)` })
        }, [
          Be(w.$slots, "default", {
            task: T.task,
            index: T.index
          }, void 0, !0)
        ], 12, Os))), 128))
      ], 4)) : Be(w.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), js = /* @__PURE__ */ oe(As, [["__scopeId", "data-v-e0ed77d8"]]), Es = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Ws = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Us = {
  key: 2,
  class: "todoist-empty"
}, zs = {
  key: 3,
  class: "todoist-empty"
}, Bs = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Hs = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Ns = { class: "todoist-projects-toolbar-inner" }, Vs = { class: "todoist-project-tabs-scroll" }, Ks = ["onClick"], Fs = { class: "todoist-project-tab-name" }, Ys = {
  key: 0,
  class: "todoist-project-actions-group"
}, Xs = ["title"], Gs = { class: "action-text" }, qs = ["title"], Qs = { class: "action-text" }, Js = { class: "todoist-board" }, Zs = ["data-section-id", "data-title", "data-column-index"], tn = { class: "todoist-board-column-head" }, en = ["title", "onClick"], on = ["onClick"], sn = ["onSubmit"], nn = ["onKeydown"], an = { class: "date-hint-left" }, ln = { class: "date-hint-badge" }, rn = { class: "date-hint-sub" }, dn = {
  key: 0,
  class: "date-hint-preview"
}, cn = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, un = {
  key: 1,
  class: "todoist-composer-images"
}, pn = ["src"], mn = { class: "todoist-composer-img-name" }, fn = {
  key: 0,
  class: "todoist-composer-img-status"
}, vn = ["onClick"], gn = { class: "todoist-inline-actions" }, bn = ["disabled"], kn = ["disabled"], yn = {
  key: 0,
  class: "todoist-column-empty"
}, hn = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], wn = ["disabled", "title", "aria-label", "onClick"], Tn = { class: "todoist-board-task-main" }, Dn = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, xn = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Cn = ["title", "onClick"], $n = { class: "repo-badge-name" }, Sn = ["onKeydown", "onBlur"], _n = {
  key: 3,
  class: "todoist-board-task-title todoist-task-content"
}, In = {
  key: 4,
  class: "todoist-board-task-description"
}, Rn = {
  key: 5,
  class: "todoist-board-task-meta"
}, Ln = ["title"], Pn = ["title"], Mn = ["title"], On = ["title"], An = {
  key: 4,
  class: "todoist-board-extra"
}, jn = ["onClick"], En = ["src"], Wn = {
  key: 0,
  class: "todoist-board-add-column"
}, Un = {
  key: 1,
  class: "todoist-add-section-form"
}, zn = ["onKeydown"], Bn = { class: "todoist-add-section-actions" }, Hn = { class: "section-menu-text" }, Nn = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, Vn = ["disabled"], Kn = ["disabled"], Fn = {
  key: 1,
  class: "todoist-section-menu-divider"
}, Yn = { class: "section-menu-text" }, Xn = { class: "todoist-task-menu-header" }, Gn = { class: "todoist-task-menu-title" }, qn = { class: "todoist-menu-text" }, Qn = { class: "todoist-menu-badge" }, Jn = {
  key: 0,
  class: "todoist-labels-panel"
}, Zn = { class: "todoist-labels-quick-input" }, ti = ["placeholder", "onKeydown"], ei = { class: "todoist-labels-chip-grid" }, oi = ["onClick"], si = {
  key: 0,
  class: "chip-check"
}, ni = { class: "todoist-menu-text" }, ii = {
  key: 1,
  class: "todoist-recur-panel"
}, ai = { class: "todoist-recur-grid" }, li = ["onClick"], ri = { class: "todoist-recur-custom-row" }, di = ["onKeydown"], ci = { class: "todoist-menu-text" }, ui = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, pi = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, mi = {
  key: 2,
  class: "todoist-color-panel"
}, fi = { class: "todoist-color-grid" }, vi = ["title", "onClick"], gi = { class: "todoist-color-name" }, bi = { class: "todoist-menu-text" }, ki = ["disabled", "onClick"], yi = { class: "todoist-project-flyout-name" }, hi = {
  key: 0,
  class: "todoist-menu-badge"
}, wi = { class: "todoist-menu-text" }, Ti = { class: "todoist-dialog-title" }, Di = ["title"], xi = { class: "todoist-dialog-body" }, Ci = {
  key: 0,
  class: "todoist-dialog-desc"
}, $i = ["placeholder", "onKeydown"], Si = { class: "todoist-dialog-foot" }, _i = { class: "todoist-dialog-icon" }, Ii = { class: "todoist-dialog-title" }, Ri = ["title"], Li = { class: "todoist-dialog-body" }, Pi = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, Mi = { class: "todoist-dialog-danger-text" }, Oi = { class: "todoist-dialog-msg" }, Ai = { class: "todoist-dialog-foot" }, ji = /* @__PURE__ */ Ht({
  __name: "TodoistTaskList",
  setup(a) {
    const n = M(0);
    function u() {
      n.value++;
    }
    ee(() => {
      window.addEventListener("storage", u), window.addEventListener("todoist-repository-links-changed", u);
    }), zt(() => {
      window.removeEventListener("storage", u), window.removeEventListener("todoist-repository-links-changed", u);
    });
    function f(s, o) {
      return n.value, to(s, o);
    }
    function $(s) {
      eo.open(s);
    }
    const d = ht, A = M(""), _ = M(null), E = M(""), F = M(!1), H = it(() => E.value ? Mo(E.value) : null), B = M([]);
    function V(s) {
      const o = s.clipboardData?.items;
      if (o)
        for (let i = 0; i < o.length; i++) {
          const O = o[i];
          if (O.type.indexOf("image") !== -1) {
            s.preventDefault();
            const p = O.getAsFile();
            if (!p) continue;
            const et = URL.createObjectURL(p), X = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Ct = {
              file: p,
              previewUrl: et,
              name: `截图_${X}.png`,
              uploading: !1
            };
            B.value.push(Ct);
          }
        }
    }
    function W(s) {
      const o = B.value.splice(s, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const D = M(null), P = M(""), w = M(null), h = Jt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), T = Jt({
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
    }), K = M(null), G = M(null), C = Jt({
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
    }), at = M(null), b = Jt({
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
    }), Tt = M(null), Dt = M(null), ft = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], S = [
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
    ], j = it(() => String(b.task?._taskRaw?.project_id || b.col?.projectId || "")), R = it(() => d.view !== "projects" ? null : d.projects.find((s) => String(s.id) === String(d.activeProjectId)) || d.projects[0] || null), U = it(() => {
      const s = new Set(d.availableLabels || []);
      return b.task?.labels && b.task.labels.forEach((o) => s.add(o)), Array.from(s);
    }), N = it(() => {
      const s = b.task?.customColorHex;
      return s && ft.find((i) => i.hex.toLowerCase() === s.toLowerCase()) || ft[0];
    });
    function ot(s, o) {
      return s.sectionId || s.title || String(o);
    }
    function kt() {
      return `${d.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function ut(s) {
      return s.startDate || s.dueText || s.labels && s.labels.length > 0 || s.timedDeadlineText || s.extraCountText;
    }
    function lt() {
      h.isOpen = !1, b.isOpen = !1, b.activeSubpanel = null;
    }
    const {
      draggingTaskId: tt,
      dragOverColIndex: pt,
      dragOverTaskId: Ot,
      dragAfterTask: Nt,
      isDragPreview: yt,
      previewTasks: Yt,
      onTaskDragStart: se,
      onTaskDragEnd: Xt,
      onColDragOver: z,
      onColDragLeave: l,
      onTaskDragOver: g,
      onTaskDrop: q,
      onColDrop: _t
    } = Ms({
      state: d,
      isActive: () => Q.active,
      editingTaskId: () => D.value,
      closePopovers: lt,
      moveTask: (s, o, i) => Z.moveTask(s, o, i),
      dropLabel: (s, o) => {
        s.labels || (s.labels = []), s.labels.includes(o) || (s.labels.push(o), st.getToken() && st.updateTask(s.id, { labels: s.labels }));
      }
    });
    function At(s, o) {
      Z.dispatch("toggle-task", { task: s, group: o });
    }
    function ge(s, o) {
      if (s.completed) return;
      const i = o.target;
      i && i.closest("button,input,textarea,select,a") || be(s);
    }
    function be(s) {
      d.movingTaskId !== s.id && (D.value = s.id, P.value = s.content, It(() => {
        w.value && (w.value.focus(), w.value.select());
      }));
    }
    function ne(s, o) {
      if (D.value !== s.id) return;
      const i = P.value.trim();
      D.value = null, o && i && i !== s.content && (s.content = i, Z.dispatch("update-task-title", {
        taskId: s.id,
        content: i,
        task: s,
        newContent: i
      }));
    }
    function ke(s, o) {
      s.key === "Enter" ? s.shiftKey || (s.preventDefault(), ne(o, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), ne(o, !1));
    }
    function ye(s, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(s.id, s);
    }
    function he(s, o, i) {
      const O = i.currentTarget;
      _.value = ot(s, o), E.value = "", F.value = !1, It(() => {
        O.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function Gt() {
      Et.value || jt();
    }
    function jt() {
      _.value = null, E.value = "", F.value = !1;
      for (const s of B.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      B.value = [];
    }
    const Et = M(!1), qt = /* @__PURE__ */ new WeakMap();
    function de(s) {
      const o = s.description || s._taskRaw?.description || "", i = qt.get(s);
      if (i && i.source === o) return i;
      const O = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, p = {
        source: o,
        thumb: O,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return qt.set(s, p), p;
    }
    function x(s) {
      return de(s).text;
    }
    function k(s) {
      return de(s).thumb;
    }
    function L(s, o) {
      s && Pe.open(s, o?.content || "任务照片");
    }
    async function mt(s) {
      if (!Q.active || Et.value) return;
      const o = [...B.value];
      let O = E.value.trim() || o[0]?.name || "";
      if (!O) return;
      let p, et, X;
      if (H.value && !F.value) {
        const Rt = H.value;
        O = Rt.cleanTitle || O, p = Rt.date, et = Rt.label + (Rt.time ? ` ${Rt.time}` : ""), X = Rt.time ? `${Rt.date} ${Rt.time}` : Rt.date;
      }
      const Ct = _.value, Vt = E.value, $t = d.view, De = s.projectId || $t === "projects" && d.activeProjectId || void 0, xe = s.sectionId !== void 0 ? s.sectionId : void 0;
      Et.value = !0;
      try {
        await ho(async () => {
          for (const wt of o)
            if (!wt.uploadedUrl) {
              wt.uploading = !0;
              try {
                const Ce = await st.uploadFile(wt.file, wt.name);
                wt.uploadedUrl = Ce.file_url;
              } catch {
                wt.uploadedUrl = wt.previewUrl;
              } finally {
                wt.uploading = !1;
              }
            }
          await Z.dispatch("add-task-submit", {
            content: O,
            view: $t,
            group: s,
            projectId: De,
            sectionId: xe,
            dueDate: p,
            dueText: et,
            dueString: X,
            attachments: o.map((wt) => ({ file_url: wt.uploadedUrl, file_name: wt.name, file_type: wt.file.type || "image/png" }))
          }) && Ct === _.value && Vt === E.value && o.length === B.value.length && o.every((wt, Ce) => wt === B.value[Ce]) && jt();
        });
      } catch {
        d.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        Et.value = !1;
      }
    }
    function xt(s, o) {
      s.key === "Enter" && !s.shiftKey ? (s.preventDefault(), mt(o)) : s.key === "Escape" && (s.preventDefault(), Gt());
    }
    function vt() {
      const s = A.value.trim();
      if (!s) return;
      const i = d.columns.find((O) => O.projectId)?.projectId || d.activeProjectId || void 0;
      Z.dispatch("add-section-submit", { name: s, projectId: i }), Bt();
    }
    function Bt() {
      d.addingSection = !1, A.value = "";
    }
    function so(s, o, i) {
      if (h.isOpen && h.col === s) {
        h.isOpen = !1;
        return;
      }
      b.isOpen = !1;
      const p = i.currentTarget.getBoundingClientRect(), X = Math.max(8, Math.min(window.innerWidth - 175 - 8, p.left)), Ct = Math.max(8, Math.min(window.innerHeight - 220, p.bottom + 4));
      h.col = s, h.x = X, h.y = Ct, h.canMoveLeft = o > 0 && !!d.columns[o - 1]?.sectionId, h.canMoveRight = o < d.columns.length - 1 && !!d.columns[o + 1]?.sectionId, h.isOpen = !0;
    }
    function Me(s, o) {
      h.isOpen = !1, Z.dispatch("move-section", { sectionId: s.sectionId, direction: o });
    }
    function Oe(s, o, i) {
      if (d.movingTaskId === s.id || s.completed) return;
      h.isOpen = !1;
      const O = 236, p = 340, et = Math.max(8, Math.min(window.innerWidth - O - 8, i.clientX)), X = Math.max(8, Math.min(window.innerHeight - p - 8, i.clientY));
      if (b.task = s, b.col = o, b.x = et, b.y = X, b.activeSubpanel = null, b.descText = s.description || "", b.isSavingDesc = !1, b.newLabelText = "", b.customRecurText = "", s.dueDate) {
        const $t = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite($t.getTime()) && (b.calYear = $t.getFullYear(), b.calMonth = $t.getMonth());
      } else {
        const $t = /* @__PURE__ */ new Date();
        b.calYear = $t.getFullYear(), b.calMonth = $t.getMonth();
      }
      const Ct = 252, Vt = et + O + Ct > window.innerWidth - 8;
      b.flyoutOpenLeft = Vt, b.flyoutStyle = {
        left: Vt ? `${-Ct - 6}px` : `${O + 6}px`,
        top: "0px"
      }, b.isOpen = !0;
    }
    function ce(s) {
      b.activeSubpanel === s ? b.activeSubpanel = null : (b.activeSubpanel = s, s === "desc" ? It(() => {
        Tt.value?.focus(), Tt.value?.select();
      }) : s === "labels" && It(() => {
        Dt.value?.focus();
      }));
    }
    function Ae(s) {
      return !!b.task?.labels?.includes(s);
    }
    function no(s) {
      if (!b.task) return;
      const o = b.task.id, i = [...b.task.labels || []], O = i.includes(s) ? i.filter((p) => p !== s) : [...i, s];
      b.task.labels = O, Z.dispatch("update-task-labels", { taskId: o, labels: O });
    }
    function je() {
      if (!b.task) return;
      const s = b.newLabelText.trim();
      if (!s) return;
      b.newLabelText = "";
      const o = b.task.id, i = [...b.task.labels || []];
      i.includes(s) || (i.push(s), b.task.labels = i, Z.dispatch("update-task-labels", { taskId: o, labels: i })), lt();
    }
    function io(s) {
      return String(b.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function ao(s, o) {
      if (!b.task) return;
      const i = b.task.id;
      Z.dispatch("update-task-recurring", { taskId: i, rule: s, label: o }), lt();
    }
    function Ee() {
      if (!b.task) return;
      const s = b.customRecurText.trim();
      if (!s) return;
      const o = b.task.id;
      Z.dispatch("update-task-recurring", { taskId: o, rule: s, label: s }), lt();
    }
    function lo() {
      if (!b.task) return;
      const s = b.task.id;
      Z.dispatch("clear-task-recurring", { taskId: s }), lt();
    }
    function ro(s) {
      if (!b.task) return;
      const o = b.task.id, i = ft.find((O) => O.id === s);
      b.task.customColorHex = i?.hex || "", Z.dispatch("update-task-color", { taskId: o, colorId: s }), lt();
    }
    function co(s) {
      if (!b.task) return;
      const o = b.task.id;
      Z.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), lt();
    }
    function uo() {
      if (!b.task) return;
      const s = b.task, o = { x: b.x, y: b.y };
      lt();
      const i = Qt(o, 380, 220);
      C.x = i.x, C.y = i.y, s.isRecurring ? (C.title = "删除重复任务确认", C.icon = "⚠️", C.danger = !0, C.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", C.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, C.confirmText = "删除重复任务", C.actionType = "delete-task", C.payload = { taskId: s.id, isRecurring: !0 }, C.isOpen = !0) : (C.title = "删除任务确认", C.icon = "🗑️", C.danger = !0, C.alertText = `确定要删除任务「${s.content}」吗？`, C.message = "此操作不可撤销。", C.confirmText = "确认删除", C.actionType = "delete-task", C.payload = { taskId: s.id, isRecurring: !1 }, C.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, o, i) {
      Oe(s, o, i);
    });
    function Qt(s, o = 380, i = 220) {
      let O = null;
      if (s instanceof HTMLElement)
        O = s.getBoundingClientRect();
      else if (s && "currentTarget" in s && s.currentTarget instanceof HTMLElement)
        O = s.currentTarget.getBoundingClientRect();
      else if (s && "target" in s && s.target instanceof HTMLElement)
        O = (s.target.closest("button") || s.target).getBoundingClientRect();
      else if (s && "x" in s && "y" in s && typeof s.x == "number" && typeof s.y == "number") {
        const p = Math.max(16, Math.min(window.innerWidth - o - 16, s.x)), et = Math.max(16, Math.min(window.innerHeight - i - 16, s.y + 10));
        return { x: p, y: et };
      }
      if (O) {
        let p = O.right - o;
        p < 16 && (p = Math.max(16, O.left)), p = Math.max(16, Math.min(window.innerWidth - o - 16, p));
        let et = O.bottom + 8;
        return et + i > window.innerHeight - 16 && O.top > i + 16 && (et = O.top - i - 8), et = Math.max(16, Math.min(window.innerHeight - i - 16, et)), { x: p, y: et };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - i) / 3))
      };
    }
    function We(s, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const i = o.clientX, O = o.clientY, p = s === "prompt" ? T : C, et = p.x, X = p.y, Ct = ($t) => {
        const De = $t.clientX - i, xe = $t.clientY - O;
        p.x = Math.max(10, Math.min(window.innerWidth - 320, et + De)), p.y = Math.max(10, Math.min(window.innerHeight - 120, X + xe));
      }, Vt = () => {
        window.removeEventListener("pointermove", Ct), window.removeEventListener("pointerup", Vt);
      };
      window.addEventListener("pointermove", Ct), window.addEventListener("pointerup", Vt);
    }
    function Ue(s) {
      const o = Qt(s, 380, 220);
      T.x = o.x, T.y = o.y, T.title = m("todoist.newProject"), T.message = m("todoist.inputProjectPlaceholder"), T.value = "", T.placeholder = m("todoist.inputProjectPlaceholder"), T.confirmText = m("common.confirm"), T.actionType = "create-project", T.payload = null, T.isOpen = !0, It(() => K.value?.focus());
    }
    function po(s, o) {
      const i = Qt(o, 380, 220);
      T.x = i.x, T.y = i.y, T.title = m("todoist.renameProject"), T.message = s.name, T.value = s.name, T.placeholder = m("todoist.inputProjectPlaceholder"), T.confirmText = m("common.save"), T.actionType = "rename-project", T.payload = { projectId: s.id }, T.isOpen = !0, It(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function mo(s, o) {
      const i = o || { x: h.x, y: h.y };
      h.isOpen = !1;
      const O = Qt(i, 380, 220);
      T.x = O.x, T.y = O.y, T.title = m("todoist.renameSection"), T.message = s.title, T.value = s.title, T.placeholder = m("todoist.inputSectionPlaceholder"), T.confirmText = m("common.save"), T.actionType = "rename-section", T.payload = { sectionId: s.sectionId }, T.isOpen = !0, It(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function ie() {
      T.isOpen = !1;
    }
    function ze() {
      const s = T.value.trim();
      if (!s) return;
      const { actionType: o, payload: i } = T;
      ie(), o === "create-project" ? Z.dispatch("create-project-submit", s) : o === "rename-project" && i && "projectId" in i ? Z.dispatch("rename-project-submit", { projectId: i.projectId, newName: s }) : o === "rename-section" && i && "sectionId" in i && Z.dispatch("rename-section", { sectionId: i.sectionId, newName: s });
    }
    function fo(s, o) {
      const i = Qt(o, 380, 240);
      C.x = i.x, C.y = i.y, C.title = m("todoist.deleteProjectConfirm"), C.icon = "🗑️", C.danger = !0, C.alertText = m("todoist.deleteProjectAlert", { name: s.name }), C.message = m("todoist.deleteProjectWarning"), C.confirmText = m("common.deletePermanently"), C.actionType = "delete-project", C.payload = { projectId: s.id }, C.isOpen = !0;
    }
    function vo(s, o) {
      const i = o || { x: h.x, y: h.y };
      h.isOpen = !1;
      const O = Qt(i, 380, 240);
      C.x = O.x, C.y = O.y, C.title = m("todoist.deleteSectionConfirm"), C.icon = "🗑️", C.danger = !0, C.alertText = m("todoist.deleteSectionAlert", { name: s.title }), C.message = m("todoist.deleteSectionWarning"), C.confirmText = m("todoist.deleteSection"), C.actionType = "delete-section", C.payload = { sectionId: s.sectionId }, C.isOpen = !0;
    }
    function ue() {
      C.isOpen = !1;
    }
    function go() {
      const { actionType: s, payload: o } = C;
      ue(), s === "delete-project" && o && "projectId" in o ? Z.dispatch("delete-project-submit", o.projectId) : s === "delete-section" && o && "sectionId" in o ? Z.dispatch("delete-section", { sectionId: o.sectionId }) : s === "delete-task" && o && "taskId" in o && Z.dispatch("delete-task-submit", o);
    }
    function bo(s) {
      Z.dispatch("switch-project", s);
    }
    function we(s) {
      s.key === "Escape" && (T.isOpen && ie(), C.isOpen && ue(), b.isOpen && (b.isOpen = !1, b.activeSubpanel = null), h.isOpen && (h.isOpen = !1));
    }
    function Te(s) {
      const o = s.target;
      o && (T.isOpen && G.value && !G.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && ie(), C.isOpen && at.value && !at.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ue());
    }
    return dt(() => Q.active, (s) => {
      document.removeEventListener("keydown", we), window.removeEventListener("pointerdown", Te), s && (document.addEventListener("keydown", we), window.addEventListener("pointerdown", Te));
    }, { immediate: !0, flush: "sync" }), zt(() => {
      document.removeEventListener("keydown", we), window.removeEventListener("pointerdown", Te), jt();
    }), (s, o) => (r(), c("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: lt
    }, [
      e(d).moveError && e(d).moveMessage ? (r(), c("p", Es, v(e(d).moveMessage), 1)) : I("", !0),
      e(d).emptyText && e(d).columns.length > 0 && !e(d).loading ? (r(), c("p", Ws, v(e(m)("todoist.tasksRetained", { text: e(d).emptyText })), 1)) : I("", !0),
      e(d).loading && e(d).columns.length === 0 ? (r(), c("p", Us, v(e(m)("common.loading")), 1)) : e(d).emptyText && e(d).columns.length === 0 ? (r(), c("p", zs, v(e(d).emptyText), 1)) : e(d).view === "projects" && e(d).projects.length === 0 ? (r(), c("div", Bs, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, v(e(m)("todoist.emptyProjects")), 1),
        t("p", null, v(e(m)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (i) => Ue(i))
        }, v(e(m)("todoist.createFirstProject")), 1)
      ])) : (r(), c(nt, { key: 5 }, [
        e(d).view === "projects" && e(d).projects.length ? (r(), c("div", Hs, [
          t("div", Ns, [
            t("div", Vs, [
              (r(!0), c(nt, null, ct(e(d).projects, (i) => (r(), c("button", {
                key: i.id,
                type: "button",
                class: J(["todoist-project-tab", { active: String(i.id) === String(e(d).activeProjectId) }]),
                onClick: (O) => bo(i.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: bt({ background: i.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", Fs, v(i.name), 1)
              ], 10, Ks))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => Ue(i))
              }, "＋ 新建项目")
            ]),
            R.value ? (r(), c("div", Ys, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(m)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => po(R.value, i))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", Gs, v(e(m)("common.rename")), 1)
              ], 8, Xs),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(m)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => fo(R.value, i))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", Qs, v(e(m)("todoist.deleteProject")), 1)
              ], 8, qs)
            ])) : I("", !0)
          ])
        ])) : I("", !0),
        t("div", Js, [
          (r(!0), c(nt, null, ct(e(d).columns, (i, O) => (r(), c("section", {
            key: i.sectionId || i.title || O,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": O
          }, [
            t("header", tn, [
              t("h3", null, [
                Ut(v(i.title) + " ", 1),
                t("span", null, v(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: Y((p) => so(i, O, p), ["stop"])
              }, "•••", 8, en)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (p) => he(i, O, p)
            }, "＋ 添加任务", 8, on),
            _.value === ot(i, O) ? (r(), c("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: Y((p) => mt(i), ["prevent"])
            }, [
              Pt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (p) => E.value = p),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (p) => xt(p, i),
                onPaste: o[5] || (o[5] = (p) => V(p))
              }, null, 40, nn), [
                [Kt, E.value]
              ]),
              H.value ? (r(), c("div", {
                key: 0,
                class: J(["todoist-composer-date-hint", { "is-ignored": F.value }])
              }, [
                t("div", an, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", ln, [
                    Ut(v(H.value.label) + v(H.value.time ? " " + H.value.time : "") + " ", 1),
                    t("span", rn, "(" + v(H.value.formattedDate) + ")", 1)
                  ]),
                  F.value ? (r(), c("span", cn, " (已忽略日期，按纯文本创建) ")) : (r(), c("span", dn, [
                    o[32] || (o[32] = Ut(" 精简任务名: ", -1)),
                    t("strong", null, v(H.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (p) => F.value = !F.value)
                }, v(F.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : I("", !0),
              B.value.length > 0 ? (r(), c("div", un, [
                (r(!0), c(nt, null, ct(B.value, (p, et) => (r(), c("div", {
                  key: et,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: p.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, pn),
                  t("span", mn, v(p.name), 1),
                  p.uploading ? (r(), c("span", fn, "上传中…")) : I("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (X) => W(et)
                  }, "×", 8, vn)
                ]))), 128))
              ])) : I("", !0),
              t("div", gn, [
                t("button", {
                  type: "button",
                  disabled: Et.value,
                  onClick: Gt
                }, v(e(m)("common.cancel")), 9, bn),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: Et.value
                }, v(Et.value ? B.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, kn)
              ])
            ], 40, sn)) : I("", !0),
            Zt(js, {
              tasks: e(Yt)(i, O),
              "pinned-id": e(tt) || D.value,
              "hidden-id": e(pt) !== null ? e(tt) : null,
              "is-preview": e(yt),
              class: J(["todoist-board-list", { "drag-over": e(pt) === O }]),
              "data-group-index": O,
              onDragover: Y((p) => e(z)(p, O), ["prevent"]),
              onDragleave: (p) => e(l)(p, O),
              onDrop: Y((p) => e(_t)(p, i), ["prevent"])
            }, {
              empty: le(() => [
                i.tasks.length === 0 && e(pt) !== O ? (r(), c("p", yn, " 暂无任务 · 可拖到这里 ")) : I("", !0)
              ]),
              default: le(({ task: p, index: et }) => [
                t("article", {
                  class: J(["todoist-board-task", [
                    {
                      completed: p.completed,
                      "has-custom-color": !!p.customColorHex,
                      editing: D.value === p.id,
                      "dragging-task": !e(yt)(p) && e(tt) === p.id,
                      "drop-before": e(Ot) === p.id && !e(Nt),
                      "drop-after": e(Ot) === p.id && e(Nt),
                      "saving-position": e(d).movingTaskId === p.id,
                      "todoist-task-preview": e(yt)(p),
                      "drag-origin-hidden": e(tt) === p.id && !e(yt)(p) && e(pt) !== null
                    }
                  ]]),
                  style: bt(p.customColorHex ? { "--task-custom-color": p.customColorHex } : {}),
                  "data-task-id": e(yt)(p) ? void 0 : p.id,
                  "aria-hidden": e(yt)(p) || void 0,
                  tabindex: e(yt)(p) ? -1 : 0,
                  title: kt(),
                  draggable: !e(yt)(p) && !p.completed && !e(d).loading && !e(d).movingTaskId && !e(d).moveNeedsRefresh && D.value !== p.id && !p.id.startsWith("optimistic-"),
                  onDragstart: (X) => e(se)(X, p, i, et),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...X) => e(Xt) && e(Xt)(...X)),
                  onDragover: Y((X) => e(g)(X, p, i, et), ["stop", "prevent"]),
                  onDrop: Y((X) => e(q)(X, p, i, et), ["stop", "prevent"]),
                  onDblclick: (X) => ge(p, X),
                  onClick: (X) => ye(p, X),
                  onContextmenu: Y((X) => Oe(p, i, X), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: J(["todoist-board-check", { checked: p.completed }]),
                    disabled: e(yt)(p) || e(d).movingTaskId === p.id,
                    title: p.completed ? "撤销完成" : "完成任务",
                    "aria-label": (p.completed ? "撤销完成：" : "完成：") + p.content,
                    onClick: Y((X) => At(p, i), ["stop"])
                  }, null, 10, wn),
                  t("div", Tn, [
                    e(d).movingTaskId === p.id ? (r(), c("span", Dn, "保存中")) : I("", !0),
                    f(p.id, p.description).length ? (r(), c("div", xn, [
                      (r(!0), c(nt, null, ct(f(p.id, p.description), (X) => (r(), c("button", {
                        key: X.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + X.fullName + " · 点击在插件内查看详情",
                        onClick: Y((Ct) => $(X.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", $n, v(X.fullName), 1)
                      ], 8, Cn))), 128))
                    ])) : I("", !0),
                    D.value === p.id ? Pt((r(), c("textarea", {
                      key: 2,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: w,
                      "onUpdate:modelValue": o[7] || (o[7] = (X) => P.value = X),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (X) => ke(X, p),
                      onBlur: (X) => ne(p, !0),
                      onClick: o[8] || (o[8] = Y(() => {
                      }, ["stop"]))
                    }, null, 40, Sn)), [
                      [Kt, P.value]
                    ]) : (r(), c("p", _n, v(p.content || "未命名任务"), 1)),
                    x(p) ? (r(), c("p", In, v(x(p)), 1)) : I("", !0),
                    ut(p) ? (r(), c("div", Rn, [
                      p.startDate && !p.dueDate ? (r(), c("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${p.startDate}`
                      }, " 🛫 自 " + v(e(Se)(p.startDate)) + " 起 ", 9, Ln)) : p.startDate && p.dueDate ? (r(), c("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${p.startDate} 至 ${p.dueDate}`
                      }, " ⏱ " + v(e(Se)(p.startDate)) + " ~ " + v(e(Se)(p.dueDate)), 9, Pn)) : p.dueText ? (r(), c("span", {
                        key: 2,
                        class: J(["todoist-board-due", { recurring: p.isRecurring }]),
                        title: p.isRecurring ? `循环任务：${p.dueString || p.dueText}` : void 0
                      }, v(p.isRecurring ? "↻ " : "▣ ") + v(p.dueText), 11, Mn)) : I("", !0),
                      (r(!0), c(nt, null, ct((p.labels || []).slice(0, 3), (X) => (r(), c("span", {
                        key: X,
                        class: "todoist-board-label"
                      }, "◇ " + v(X), 1))), 128)),
                      p.timedDeadlineText ? (r(), c("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (p.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + v(p.timedDeadlineText), 9, On)) : I("", !0),
                      p.extraCountText ? (r(), c("span", An, v(p.extraCountText), 1)) : I("", !0)
                    ])) : I("", !0),
                    k(p) ? (r(), c("div", {
                      key: 6,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: Y((X) => L(k(p), p), ["stop"])
                    }, [
                      t("img", {
                        src: k(p),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, En),
                      o[35] || (o[35] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, jn)) : I("", !0)
                  ])
                ], 46, hn)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, Zs))), 128)),
          e(d).view === "inbox" || e(d).view === "projects" ? (r(), c("div", Wn, [
            e(d).addingSection ? (r(), c("div", Un, [
              Pt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (i) => A.value = i),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  St(Y(vt, ["prevent"]), ["enter"]),
                  St(Bt, ["esc"])
                ]
              }, null, 40, zn), [
                [Kt, A.value]
              ]),
              t("div", Bn, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: vt
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: Bt
                }, v(e(m)("common.cancel")), 1)
              ])
            ])) : (r(), c("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[10] || (o[10] = (i) => e(d).addingSection = !0)
            }, [...o[36] || (o[36] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : I("", !0)
        ])
      ], 64)),
      h.isOpen && h.col ? (r(), c("div", {
        key: 6,
        class: "todoist-section-menu",
        style: bt({ left: h.x + "px", top: h.y + "px" }),
        onClick: o[16] || (o[16] = Y(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (i) => mo(h.col, i))
        }, [
          o[37] || (o[37] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", Hn, v(e(m)("todoist.menu.renameSection")), 1)
        ]),
        h.col.sectionId ? (r(), c("div", Nn, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !h.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (i) => Me(h.col, -1))
          }, v(e(m)("todoist.menu.moveLeft")), 9, Vn),
          o[38] || (o[38] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !h.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (i) => Me(h.col, 1))
          }, v(e(m)("todoist.menu.moveRight")), 9, Kn)
        ])) : I("", !0),
        h.col.sectionId ? (r(), c("div", Fn)) : I("", !0),
        h.col.sectionId ? (r(), c("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (i) => vo(h.col, i))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", Yn, v(e(m)("todoist.menu.deleteSection")), 1)
        ])) : I("", !0)
      ], 4)) : I("", !0),
      b.isOpen && b.task ? (r(), c("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: b.x + "px", top: b.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = Y(() => {
        }, ["stop"]))
      }, [
        t("div", Xn, [
          t("span", Gn, v(b.task.content || e(m)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: b.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (i) => ce("labels"))
        }, [
          o[40] || (o[40] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", qn, v(e(m)("todoist.menu.cloudLabels")), 1),
          t("span", Qn, v(b.task.labels && b.task.labels.length ? e(m)("todoist.menu.labelsSelected", { count: b.task.labels.length }) : e(m)("todoist.menu.labelsNone")), 1)
        ], 2),
        b.activeSubpanel === "labels" ? (r(), c("div", Jn, [
          t("div", Zn, [
            Pt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (i) => b.newLabelText = i),
              type: "text",
              placeholder: e(m)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: St(Y(je, ["prevent"]), ["enter"])
            }, null, 40, ti), [
              [Kt, b.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: je
            }, "＋")
          ]),
          t("div", ei, [
            (r(!0), c(nt, null, ct(U.value, (i) => (r(), c("button", {
              key: i,
              type: "button",
              class: J(["todoist-label-chip", { selected: Ae(i) }]),
              onClick: (O) => no(i)
            }, [
              t("span", null, "◇ " + v(i), 1),
              Ae(i) ? (r(), c("span", si, "✓")) : I("", !0)
            ], 10, oi))), 128))
          ])
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: b.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (i) => ce("recur"))
        }, [
          o[41] || (o[41] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", ni, v(e(m)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(b.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, v(b.task.isRecurring ? b.task.dueString || e(m)("todoist.recur.recurring") : e(m)("todoist.menu.labelsNone")), 5)
        ], 2),
        b.activeSubpanel === "recur" ? (r(), c("div", ii, [
          t("div", ai, [
            (r(), c(nt, null, ct(S, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: J(["todoist-recur-chip", { selected: io(i.rule) }]),
              onClick: (O) => ao(i.rule, i.label)
            }, [
              t("span", null, v(i.icon), 1),
              t("span", null, v(i.label), 1)
            ], 10, li)), 64))
          ]),
          t("div", ri, [
            Pt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (i) => b.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: St(Y(Ee, ["prevent"]), ["enter"])
            }, null, 40, di), [
              [Kt, b.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Ee
            }, "确定")
          ]),
          b.task.isRecurring ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: lo
          }, v(e(m)("todoist.menu.clearRecur")), 1)) : I("", !0)
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: b.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (i) => ce("color"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", ci, v(e(m)("todoist.menu.pickColor")), 1),
          t("span", ui, [
            N.value.id === "none" ? (r(), c("span", pi, "⊘")) : (r(), c("span", {
              key: 1,
              class: "todoist-color-dot",
              style: bt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: N.value.hex
              })
            }, null, 4)),
            Ut(" " + v(N.value.name), 1)
          ])
        ], 2),
        b.activeSubpanel === "color" ? (r(), c("div", mi, [
          t("div", fi, [
            (r(), c(nt, null, ct(ft, (i) => t("button", {
              key: i.id,
              type: "button",
              class: J(["todoist-color-swatch", { selected: N.value.id === i.id }]),
              title: i.name,
              onClick: (O) => ro(i.id)
            }, [
              t("span", {
                class: J(["todoist-color-dot", { none: i.id === "none" }]),
                style: bt(i.id !== "none" ? { background: i.hex } : {})
              }, v(i.id === "none" ? N.value.id === "none" ? "✓" : "⊘" : N.value.id === i.id ? "✓" : ""), 7),
              t("span", gi, v(i.name), 1)
            ], 10, vi)), 64))
          ])
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: b.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (i) => ce("project"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", bi, v(e(m)("todoist.menu.moveToProject")), 1),
          o[44] || (o[44] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        b.activeSubpanel === "project" ? (r(), c("div", {
          key: 3,
          class: J(["todoist-project-flyout", { "open-left": b.flyoutOpenLeft }]),
          style: bt(b.flyoutStyle)
        }, [
          (r(!0), c(nt, null, ct(e(d).projects, (i) => (r(), c("button", {
            key: i.id,
            type: "button",
            class: J(["todoist-project-flyout-item", { active: String(i.id) === j.value }]),
            disabled: !!e(d).movingTaskId || String(i.id) === j.value,
            onClick: (O) => co(i)
          }, [
            o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", yi, v(i.name), 1),
            String(i.id) === j.value ? (r(), c("span", hi, v(e(m)("todoist.menu.currentBadge")), 1)) : I("", !0)
          ], 10, ki))), 128))
        ], 6)) : I("", !0),
        o[47] || (o[47] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: uo
        }, [
          o[46] || (o[46] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", wi, v(b.task.isRecurring ? e(m)("todoist.menu.deleteRecurringTask") : e(m)("todoist.menu.deleteTask")), 1)
        ])
      ], 4)) : I("", !0),
      T.isOpen && e(Q).active ? (r(), c("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: G,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${T.x}px`,
          top: `${T.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[26] || (o[26] = Y(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (i) => We("prompt", i))
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", Ti, v(T.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(m)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Di)
        ], 32),
        t("div", xi, [
          T.message ? (r(), c("p", Ci, v(T.message), 1)) : I("", !0),
          Pt(t("input", {
            ref_key: "promptInputRef",
            ref: K,
            "onUpdate:modelValue": o[25] || (o[25] = (i) => T.value = i),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: T.placeholder,
            onKeydown: [
              St(Y(ze, ["prevent"]), ["enter"]),
              St(Y(ie, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, $i), [
            [Kt, T.value]
          ])
        ]),
        t("div", Si, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ie
          }, v(e(m)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: ze
          }, v(T.confirmText || e(m)("common.confirm")), 1)
        ])
      ], 4)) : I("", !0),
      C.isOpen && e(Q).active ? (r(), c("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: at,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${C.x}px`,
          top: `${C.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[28] || (o[28] = Y(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (i) => We("confirm", i))
        }, [
          t("span", _i, v(C.icon || "⚠️"), 1),
          t("h3", Ii, v(C.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(m)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ri)
        ], 32),
        t("div", Li, [
          C.danger ? (r(), c("div", Pi, [
            t("div", Mi, v(C.alertText), 1)
          ])) : I("", !0),
          t("p", Oi, v(C.message), 1)
        ]),
        t("div", Ai, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ue
          }, v(e(m)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: J(["todoist-dialog-btn", C.danger ? "danger" : "primary"]),
            onClick: go
          }, v(C.confirmText || e(m)("common.confirm")), 3)
        ])
      ], 4)) : I("", !0)
    ]));
  }
}), Ei = /* @__PURE__ */ oe(ji, [["__scopeId", "data-v-df29be40"]]), Wi = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, Ui = { class: "reminder-shortcuts" }, zi = ["disabled"], Bi = { class: "reminder-preview" }, Hi = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, Ni = ["disabled"], Vi = ["disabled"], Ki = ["disabled"], Fi = /* @__PURE__ */ Ht({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(a, { emit: n }) {
    const u = a, f = n, $ = u.value || (u.taskDate ? u.taskDate + "T" + (u.taskTime || "09:00") : ""), d = M($.slice(0, 10)), A = M($.slice(11, 16)), _ = M(!1), E = M(""), F = M(!0), H = it(() => d.value && A.value ? (/* @__PURE__ */ new Date(d.value + "T" + A.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function B(W) {
      if (_.value) return;
      const D = /* @__PURE__ */ new Date();
      W === "tomorrow" ? (D.setDate(D.getDate() + 1), D.setHours(9, 0, 0, 0)) : D.setTime(D.getTime() + W * 6e4), d.value = `${D.getFullYear()}-${String(D.getMonth() + 1).padStart(2, "0")}-${String(D.getDate()).padStart(2, "0")}`, A.value = `${String(D.getHours()).padStart(2, "0")}:${String(D.getMinutes()).padStart(2, "0")}`, E.value = "", F.value = !0;
    }
    async function V(W) {
      if (!(_.value || Q.pendingWrites)) {
        if (W && (!Number.isFinite(Date.parse(W)) || Date.parse(W) <= Date.now())) {
          E.value = "请选择未来的提醒时间。";
          return;
        }
        if (y.taskId === u.taskId) {
          _.value = !0, E.value = "";
          try {
            if (await rt.setReminder(W), y.taskId !== u.taskId) return;
            y.error ? E.value = y.error : y.reminderTime === W && f("close");
          } finally {
            _.value = !1;
          }
        }
      }
    }
    return (W, D) => (r(), Mt(Re, {
      anchor: a.anchor,
      onClose: D[9] || (D[9] = (P) => f("close"))
    }, {
      default: le(() => [
        t("section", Wi, [
          D[11] || (D[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", Ui, [
            t("button", {
              type: "button",
              onClick: D[0] || (D[0] = (P) => B(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: D[1] || (D[1] = (P) => B(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: D[2] || (D[2] = (P) => B("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: _.value }, [
            D[10] || (D[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Zt(Le, {
              modelValue: d.value,
              "onUpdate:modelValue": D[3] || (D[3] = (P) => d.value = P),
              "time-value": A.value,
              "onUpdate:timeValue": D[4] || (D[4] = (P) => A.value = P),
              embedded: "",
              onTimeValidity: D[5] || (D[5] = (P) => F.value = P)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, zi),
          t("div", Bi, v(H.value || "选择提醒的日期和时间"), 1),
          D[12] || (D[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          E.value ? (r(), c("p", Hi, v(E.value), 1)) : I("", !0),
          t("footer", null, [
            a.value ? (r(), c("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: _.value || !!e(Q).pendingWrites,
              onClick: D[6] || (D[6] = (P) => V(""))
            }, "移除提醒", 8, Ni)) : I("", !0),
            t("button", {
              type: "button",
              disabled: _.value,
              onClick: D[7] || (D[7] = (P) => f("close"))
            }, "取消", 8, Vi),
            t("button", {
              type: "button",
              class: "save",
              disabled: _.value || !!e(Q).pendingWrites || !d.value || !A.value || !F.value,
              onClick: D[8] || (D[8] = (P) => V(d.value + "T" + A.value))
            }, v(_.value ? "保存中…" : "设置提醒"), 9, Ki)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), Yi = /* @__PURE__ */ oe(Fi, [["__scopeId", "data-v-da9e3ddd"]]), Xi = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, Gi = { class: "inspector-main-col" }, qi = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Qi = {
  key: 1,
  class: "inspector-repo-badges"
}, Ji = ["title", "onClick"], Zi = { class: "repo-badge-name" }, ta = { class: "inspector-section inspector-title-section" }, ea = { class: "task-title-row" }, oa = ["title"], sa = {
  key: 0,
  class: "check-mark"
}, na = ["value", "aria-label", "disabled", "placeholder"], ia = ["value", "placeholder", "disabled"], aa = ["onKeydown"], la = {
  key: 0,
  class: "desc-placeholder-btn"
}, ra = ["innerHTML"], da = {
  key: 2,
  role: "status"
}, ca = {
  key: 3,
  class: "attached-img-grid"
}, ua = ["onClick"], pa = ["src", "alt"], ma = { class: "attached-img-info" }, fa = ["onClick"], va = { class: "inspector-section inspector-subtasks-section" }, ga = {
  key: 0,
  class: "subtasks-list"
}, ba = ["onClick"], ka = {
  key: 0,
  class: "check-tick"
}, ya = { class: "subtask-content-text" }, ha = ["title", "onClick"], wa = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Ta = ["value", "placeholder"], Da = { class: "subtask-actions" }, xa = { class: "inspector-section inspector-comments-section" }, Ca = { class: "comment-input-bar" }, $a = { class: "comment-input-wrap" }, Sa = ["value", "placeholder", "disabled"], _a = ["title"], Ia = ["disabled"], Ra = {
  key: 0,
  class: "comments-list"
}, La = { class: "comment-item-content" }, Pa = { class: "comment-item-header" }, Ma = { class: "comment-time" }, Oa = { class: "comment-text" }, Aa = {
  key: 0,
  class: "comment-attached-thumb"
}, ja = ["src", "onClick"], Ea = { class: "inspector-side-col" }, Wa = { class: "side-prop-group date-picker-anchor" }, Ua = { class: "row-text" }, za = { class: "side-prop-group date-picker-anchor" }, Ba = { class: "row-text" }, Ha = ["title"], Na = { class: "side-prop-group" }, Va = { class: "side-prop-label" }, Ka = { class: "row-text" }, Fa = { class: "inspector-menu" }, Ya = ["disabled", "onClick"], Xa = { key: 0 }, Ga = { class: "side-prop-group" }, qa = { class: "side-prop-label" }, Qa = { class: "row-text" }, Ja = { class: "inspector-menu" }, Za = ["placeholder", "aria-label", "onKeydown"], tl = { key: 0 }, el = {
  key: 1,
  role: "alert"
}, ol = { class: "label-options-list" }, sl = ["checked", "disabled", "onChange"], nl = ["disabled"], il = { key: 3 }, al = { class: "side-prop-group" }, ll = { class: "side-prop-label" }, rl = { class: "row-text" }, dl = /* @__PURE__ */ Ht({
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
  setup(a, { emit: n }) {
    const u = a, f = n, $ = M(!1), d = M(null), A = M(null);
    let _;
    ee(() => {
      let z = -1;
      _ = new ResizeObserver((l) => {
        const g = l[0]?.contentRect.width;
        g !== z && (z = g, H(A.value), H(d.value));
      }), A.value?.parentElement && _.observe(A.value.parentElement);
    }), zt(() => _?.disconnect());
    const E = it(() => {
      if (!u.editDescription) return "";
      const z = u.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), l = document.createElement("template");
      l.innerHTML = Ao.renderMarkdown(z);
      const g = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const q of Array.from(l.content.querySelectorAll("*"))) {
        if (!g.has(q.tagName)) {
          q.replaceWith(document.createTextNode(q.textContent || ""));
          continue;
        }
        const _t = q.tagName === "A" ? q.getAttribute("href") : null;
        for (const At of Array.from(q.attributes)) q.removeAttribute(At.name);
        _t && /^(https?:\/\/|mailto:)/i.test(_t) && (q.setAttribute("href", _t), q.setAttribute("target", "_blank"), q.setAttribute("rel", "noopener noreferrer"));
      }
      return l.innerHTML;
    });
    function F() {
      $.value = !0, It(() => {
        H(d.value), d.value?.focus();
      });
    }
    function H(z) {
      z && (z.style.height = "auto", z.style.height = z.scrollHeight + "px");
    }
    function B(z) {
      H(z.el);
    }
    function V(z) {
      const l = z.target;
      H(l), f("update:editDescription", l.value), f("scheduleDraftSave", z);
    }
    function W() {
      f("saveTitleAndDesc"), $.value = !1;
    }
    const D = M(!1), P = M(!1), w = M(null), h = M(null), T = M(!1), K = M(!1), G = M(!1), C = M(""), at = M(null), b = M(null), Tt = M(null), Dt = M([]), ft = M(!1), S = M("");
    let j;
    dt(() => [u.state.taskId, K.value], async (z, l, g) => {
      if (j?.abort(), !K.value) return;
      const q = new AbortController();
      j = q, g(() => q.abort()), Dt.value = [], ft.value = !0, S.value = "";
      try {
        const _t = await st.getLabels(q.signal);
        q.signal.aborted || (Dt.value = _t.map((At) => At.name));
      } catch {
        q.signal.aborted || (S.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        q.signal.aborted || (ft.value = !1);
      }
    });
    function R() {
      G.value = !0;
    }
    const U = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function N(z) {
      switch (z) {
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
    function ot(z) {
      T.value = !1, f("selectPriority", z);
    }
    const kt = it(() => {
      const z = /* @__PURE__ */ new Set([...Dt.value, ...u.availableLabels || []]);
      for (const l of u.state.labels || []) z.add(l);
      return Array.from(z);
    }), ut = it(() => {
      const z = C.value.trim().toLowerCase();
      return z ? kt.value.filter((l) => l.toLowerCase().includes(z)) : kt.value;
    });
    function lt() {
      const z = C.value.trim();
      z && (f("createLabel", z), C.value = "");
    }
    function tt(z, l) {
      Pe.open(z, l);
    }
    const pt = M(0);
    function Ot() {
      pt.value++;
    }
    ee(() => {
      window.addEventListener("storage", Ot), window.addEventListener("todoist-repository-links-changed", Ot);
    }), zt(() => {
      window.removeEventListener("storage", Ot), window.removeEventListener("todoist-repository-links-changed", Ot);
    });
    const Nt = it(() => (pt.value, to(u.state.taskId, u.editDescription)));
    function yt(z) {
      eo.open(z);
    }
    function Yt(z, l) {
      if (!z) return "";
      try {
        const g = z.split("-"), q = parseInt(g[1], 10), _t = parseInt(g[2], 10), At = l ? ` ${l}` : "";
        return `${q}月${_t}日${At}`;
      } catch {
        return z;
      }
    }
    function se(z) {
      if (!z) return "";
      try {
        const l = new Date(z);
        return `${l.getMonth() + 1}月${l.getDate()}日 ${String(l.getHours()).padStart(2, "0")}:${String(l.getMinutes()).padStart(2, "0")}`;
      } catch {
        return z;
      }
    }
    function Xt(z) {
      if (!z) return "刚刚";
      try {
        const l = new Date(z);
        return `${l.getMonth() + 1}月${l.getDate()}日 ${String(l.getHours()).padStart(2, "0")}:${String(l.getMinutes()).padStart(2, "0")}`;
      } catch {
        return z;
      }
    }
    return (z, l) => a.state.isOpen ? (r(), c("div", Xi, [
      t("main", Gi, [
        a.state.error ? (r(), c("p", qi, v(a.state.error), 1)) : I("", !0),
        Nt.value.length ? (r(), c("div", Qi, [
          (r(!0), c(nt, null, ct(Nt.value, (g) => (r(), c("button", {
            key: g.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(m)("todoist.linkRepoTitle", { name: g.fullName }),
            onClick: (q) => yt(g.fullName)
          }, [
            l[38] || (l[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", Zi, v(g.fullName), 1),
            l[39] || (l[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, Ji))), 128))
        ])) : I("", !0),
        t("section", ta, [
          t("div", ea, [
            t("button", {
              type: "button",
              class: J(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: e(m)("todoist.toggleComplete"),
              onClick: l[0] || (l[0] = (g) => f("toggleComplete"))
            }, [
              a.isTaskCompleted ? (r(), c("span", sa, "✓")) : I("", !0)
            ], 10, oa),
            t("textarea", {
              value: a.editTitle,
              rows: "1",
              "aria-label": e(m)("todoist.taskTitle"),
              onVnodeMounted: B,
              onVnodeUpdated: B,
              disabled: a.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: A,
              class: J(["inspector-input-title", { "title-done": a.isTaskCompleted }]),
              placeholder: e(m)("todoist.taskTitle"),
              onInput: l[1] || (l[1] = (g) => {
                H(g.target), f("update:editTitle", g.target.value), f("scheduleDraftSave", g);
              }),
              onCompositionend: l[2] || (l[2] = (g) => f("scheduleDraftSave", g)),
              onBlur: l[3] || (l[3] = (g) => f("saveTitleAndDesc", g)),
              onKeydown: l[4] || (l[4] = St(Y((g) => f("saveTitleAndDesc", g), ["prevent"]), ["enter"]))
            }, null, 42, na)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: l[7] || (l[7] = Y((g) => f("dragover"), ["prevent"])),
          onDragleave: l[8] || (l[8] = Y((g) => f("dragleave"), ["prevent"])),
          onDrop: l[9] || (l[9] = Y((g) => f("dropImage", g), ["prevent"]))
        }, [
          $.value ? (r(), c("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: d,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(m)("todoist.taskDesc"),
            disabled: a.isUploadingImg,
            onInput: V,
            onCompositionend: l[5] || (l[5] = (g) => f("scheduleDraftSave", g)),
            onBlur: W,
            onPaste: l[6] || (l[6] = (g) => f("descPaste", g))
          }, null, 40, ia)) : (r(), c("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: F,
            onKeydown: St(Y(F, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (r(), c("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: E.value
            }, null, 8, ra)) : (r(), c("span", la, "≡ 描述"))
          ], 40, aa)),
          a.isUploadingImg ? (r(), c("small", da, "图片上传中…")) : I("", !0),
          a.attachedImages.length ? (r(), c("div", ca, [
            (r(!0), c(nt, null, ct(a.attachedImages, (g) => (r(), c("div", {
              key: g.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (q) => tt(g.url, g.name)
              }, [
                t("img", {
                  src: g.url,
                  alt: g.name,
                  loading: "lazy"
                }, null, 8, pa)
              ], 8, ua),
              t("div", ma, [
                t("span", null, v(g.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (q) => f("removeAttachedImage", g.url)
                }, "×", 8, fa)
              ])
            ]))), 128))
          ])) : I("", !0)
        ], 32),
        t("section", va, [
          a.subtasks.length > 0 ? (r(), c("div", ga, [
            (r(!0), c(nt, null, ct(a.subtasks, (g) => (r(), c("div", {
              key: g.id,
              class: J(["subtask-row-item", { done: g.completed }])
            }, [
              t("button", {
                type: "button",
                class: J(["subtask-check-circle", { checked: g.completed }]),
                onClick: (q) => f("toggleSubtask", g.id)
              }, [
                g.completed ? (r(), c("span", ka, "✓")) : I("", !0)
              ], 10, ba),
              t("span", ya, v(g.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(m)("todoist.subtask.delete"),
                onClick: (q) => f("removeSubtask", g.id)
              }, "×", 8, ha)
            ], 2))), 128))
          ])) : I("", !0),
          a.isAddingSubtask ? (r(), c("div", wa, [
            t("input", {
              value: a.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(m)("todoist.subtask.inputPlaceholder"),
              onInput: l[10] || (l[10] = (g) => f("update:newSubtaskText", g.target.value)),
              onKeydown: [
                l[11] || (l[11] = St(Y((g) => f("confirmAddSubtask"), ["prevent"]), ["enter"])),
                l[12] || (l[12] = St((g) => f("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Ta),
            t("div", Da, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: l[13] || (l[13] = (g) => f("confirmAddSubtask"))
              }, v(e(m)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: l[14] || (l[14] = (g) => f("update:isAddingSubtask", !1))
              }, v(e(m)("common.cancel")), 1)
            ])
          ])) : (r(), c("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: l[15] || (l[15] = (g) => f("update:isAddingSubtask", !0))
          }, [
            l[40] || (l[40] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Ut(" " + v(e(m)("todoist.subtask.add")), 1)
          ]))
        ]),
        (r(), Mt(Oo, {
          key: a.state.taskId,
          "task-id": a.state.taskId
        }, null, 8, ["task-id"])),
        t("section", xa, [
          t("div", Ca, [
            l[41] || (l[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", $a, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(m)("todoist.comment.placeholder"),
                disabled: a.isSubmittingComment,
                onInput: l[16] || (l[16] = (g) => f("update:newCommentText", g.target.value)),
                onKeydown: l[17] || (l[17] = St(Y((g) => f("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Sa),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(m)("todoist.comment.attachPhoto"),
                onClick: l[18] || (l[18] = Y((g) => f("triggerFileInput"), ["stop"]))
              }, "📎", 8, _a)
            ]),
            a.newCommentText.trim() ? (r(), c("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: l[19] || (l[19] = (g) => f("submitComment"))
            }, v(e(m)("todoist.comment.send")), 9, Ia)) : I("", !0)
          ]),
          a.state.comments.length > 0 ? (r(), c("div", Ra, [
            (r(!0), c(nt, null, ct(a.state.comments, (g) => (r(), c("div", {
              key: g.id,
              class: "comment-item"
            }, [
              l[43] || (l[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", La, [
                t("div", Pa, [
                  l[42] || (l[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", Ma, v(Xt(g.postedAt)), 1)
                ]),
                t("div", Oa, v(g.content), 1),
                g.attachment?.url ? (r(), c("div", Aa, [
                  t("img", {
                    src: g.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (q) => tt(g.attachment.url, g.attachment.name)
                  }, null, 8, ja)
                ])) : I("", !0)
              ])
            ]))), 128))
          ])) : I("", !0)
        ])
      ]),
      t("aside", Ea, [
        t("div", Wa, [
          l[45] || (l[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: w,
            type: "button",
            class: J(["side-item-row click-row", { active: D.value, filled: !!a.editStartDate }]),
            onClick: l[21] || (l[21] = (g) => D.value = !D.value)
          }, [
            l[44] || (l[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", Ua, v(Yt(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (r(), c("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: l[20] || (l[20] = Y((g) => f("clearStartDate"), ["stop"]))
            }, "×")) : I("", !0)
          ], 2),
          D.value ? (r(), Mt(Le, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": w.value,
            "onUpdate:modelValue": l[22] || (l[22] = (g) => f("update:editStartDate", g)),
            "onUpdate:timeValue": l[23] || (l[23] = (g) => f("update:editStartTime", g)),
            onChange: l[24] || (l[24] = (g) => f("startChange")),
            onClose: l[25] || (l[25] = (g) => D.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : I("", !0)
        ]),
        t("div", za, [
          l[47] || (l[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: h,
            type: "button",
            class: J(["side-item-row click-row", { active: P.value, filled: !!a.editDueDate }]),
            onClick: l[27] || (l[27] = (g) => P.value = !P.value)
          }, [
            l[46] || (l[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", Ba, v(Yt(a.editDueDate, a.editDueTime) || e(m)("todoist.prop.setDueDate")), 1),
            a.editDueDate ? (r(), c("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(m)("todoist.prop.clearDueDate"),
              onClick: l[26] || (l[26] = Y((g) => f("clearDueDate"), ["stop"]))
            }, "×", 8, Ha)) : I("", !0)
          ], 2),
          P.value ? (r(), Mt(Le, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": h.value,
            "onUpdate:modelValue": l[28] || (l[28] = (g) => f("update:editDueDate", g)),
            "onUpdate:timeValue": l[29] || (l[29] = (g) => f("update:editDueTime", g)),
            onChange: l[30] || (l[30] = (g) => f("dueChange")),
            onClose: l[31] || (l[31] = (g) => P.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : I("", !0)
        ]),
        t("div", Na, [
          t("span", Va, v(e(m)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: Tt,
            type: "button",
            class: "side-item-row",
            onClick: l[32] || (l[32] = (g) => T.value = !0)
          }, [
            t("span", {
              style: bt({ color: N(a.state.priority) })
            }, "⚑", 4),
            t("span", Ka, "P" + v(5 - a.state.priority), 1),
            l[48] || (l[48] = t("span", null, "⌄", -1))
          ], 512),
          T.value ? (r(), Mt(Re, {
            key: 0,
            anchor: Tt.value,
            onClose: l[33] || (l[33] = (g) => T.value = !1)
          }, {
            default: le(() => [
              t("div", Fa, [
                (r(), c(nt, null, ct(U, (g) => t("button", {
                  key: g.level,
                  type: "button",
                  disabled: !!e(Q).pendingWrites,
                  onClick: (q) => ot(g.level)
                }, [
                  t("span", {
                    style: bt({ color: g.color })
                  }, "⚑", 4),
                  Ut(" " + v(g.name) + " ", 1),
                  a.state.priority === g.level ? (r(), c("span", Xa, "✓")) : I("", !0)
                ], 8, Ya)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : I("", !0)
        ]),
        t("div", Ga, [
          t("span", qa, v(e(m)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: at,
            type: "button",
            class: "side-item-row",
            onClick: l[34] || (l[34] = (g) => K.value = !0)
          }, [
            t("span", Qa, v(a.state.labels.join("、") || e(m)("todoist.prop.addLabels")), 1),
            l[49] || (l[49] = t("span", null, "＋", -1))
          ], 512),
          K.value ? (r(), Mt(Re, {
            key: 0,
            anchor: at.value,
            onClose: l[36] || (l[36] = (g) => K.value = !1)
          }, {
            default: le(() => [
              t("div", Ja, [
                Pt(t("input", {
                  "onUpdate:modelValue": l[35] || (l[35] = (g) => C.value = g),
                  placeholder: e(m)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(m)("todoist.prop.searchLabelAria"),
                  onKeydown: St(Y(lt, ["prevent"]), ["enter"])
                }, null, 40, Za), [
                  [Kt, C.value]
                ]),
                ft.value ? (r(), c("small", tl, v(e(m)("todoist.prop.readingLabels")), 1)) : I("", !0),
                S.value ? (r(), c("p", el, v(S.value), 1)) : I("", !0),
                t("div", ol, [
                  (r(!0), c(nt, null, ct(ut.value, (g) => (r(), c("label", {
                    key: g,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + v(g), 1),
                    t("input", {
                      type: "checkbox",
                      checked: a.state.labels.includes(g),
                      disabled: !!e(Q).pendingWrites,
                      onChange: (q) => f("toggleLabelSelect", g)
                    }, null, 40, sl)
                  ]))), 128))
                ]),
                C.value.trim() && !kt.value.includes(C.value.trim()) ? (r(), c("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(Q).pendingWrites,
                  onClick: lt
                }, v(e(m)("todoist.prop.createLabelBtn", { name: C.value.trim() })), 9, nl)) : I("", !0),
                !ft.value && !ut.value.length && !C.value ? (r(), c("small", il, v(e(m)("todoist.prop.noLabels")), 1)) : I("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : I("", !0)
        ]),
        t("div", al, [
          t("span", ll, [
            Ut(v(e(m)("todoist.prop.reminder")) + " ", 1),
            t("small", null, v(e(m)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: b,
            type: "button",
            class: "side-item-row",
            onClick: R
          }, [
            t("span", rl, v(se(a.state.reminderTime) || e(m)("todoist.prop.addReminder")), 1),
            l[50] || (l[50] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (r(), Mt(Yi, {
            key: 0,
            anchor: b.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: l[37] || (l[37] = (g) => G.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : I("", !0)
        ])
      ])
    ])) : I("", !0);
  }
}), cl = /* @__PURE__ */ oe(dl, [["__scopeId", "data-v-38808612"]]), ul = { class: "inspector-title-row" }, pl = ["title", "aria-label"], ml = ["disabled"], fl = ["href"], vl = "todoistInspectorPositionV2", gl = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const n = y, u = it(() => Lt.get(n.taskId)), f = it(() => u.value?.status === "failed" ? "保存未确认" : u.value?.status === "saving" ? "正在保存…" : H.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), $ = it(() => [
      f.value,
      u.value?.status === "failed" ? u.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: d,
      headerRef: A,
      initialStyle: _,
      onHeaderPointerDown: E,
      onResizePointerDown: F
    } = Je({
      windowId: "todoist-inspector",
      storageKey: vl,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => n.isOpen && Q.active
    }), H = M(""), B = M(""), V = M(""), W = M(""), D = M(""), P = M(""), w = M(!1), h = M(!1), T = M(null), K = M(!1), G = M(""), C = M(""), at = M(!1), b = it(() => {
      const x = n.description || "", k = [], L = x.split(`
`);
      let mt = 0;
      for (const xt of L) {
        const vt = xt.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        vt && k.push({
          id: `st_${mt++}`,
          completed: vt[1].toLowerCase() === "x",
          text: vt[2].trim()
        });
      }
      return k;
    }), Tt = it(() => b.value.filter((x) => x.completed).length);
    function Dt(x) {
      const mt = (n.description || "").split(`
`).filter((Bt) => !Bt.match(/^\s*-\s*\[([ xX])\]/)), xt = x.map((Bt) => `- [${Bt.completed ? "x" : " "}] ${Bt.text}`), vt = [...mt, ...xt].join(`
`).trim();
      B.value = vt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(H.value, vt);
    }
    function ft() {
      if (!G.value.trim()) return;
      const x = [...b.value, {
        id: `st_${Date.now()}`,
        text: G.value.trim(),
        completed: !1
      }];
      G.value = "", K.value = !1, Dt(x);
    }
    function S(x) {
      const k = b.value.map((L) => L.id === x ? { ...L, completed: !L.completed } : L);
      Dt(k);
    }
    function j(x) {
      const k = b.value.filter((L) => L.id !== x);
      Dt(k);
    }
    const R = it(() => {
      for (const x of ht.columns || []) {
        const k = x.tasks.find((L) => L.id === n.taskId);
        if (k) return !!k.completed;
      }
      return !1;
    });
    async function U() {
      for (const x of ht.columns || []) {
        const k = x.tasks.find((L) => L.id === n.taskId);
        if (k) {
          const L = !k.completed;
          k.completed = L, k._taskRaw && (k._taskRaw.checked = L);
          try {
            await st.toggleTaskCompletion(k.id, L);
          } catch {
            k.completed = !L, k._taskRaw && (k._taskRaw.checked = !L), n.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function N(x) {
      rt.setPriority(x);
    }
    function ot(x) {
      rt.toggleLabel(x);
    }
    function kt(x) {
      rt.toggleLabel(x);
    }
    async function ut(x) {
      x.trim() && (n.labels.includes(x.trim()) || await rt.createAndAttachLabel(x.trim()));
    }
    async function lt() {
      if (!C.value.trim() || at.value) return;
      const x = C.value.trim();
      at.value = !0;
      try {
        await rt.addComment(x), C.value = "";
      } finally {
        at.value = !1;
      }
    }
    dt(() => n.title, (x) => {
      H.value = x || "";
    }, { immediate: !0 }), dt(() => n.description, (x) => {
      B.value = (x || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), dt(() => n.startDate, (x) => {
      V.value = x || "";
    }, { immediate: !0 }), dt(() => n.startTime, (x) => {
      W.value = x || "";
    }, { immediate: !0 }), dt(() => n.dueDate, (x) => {
      D.value = x || "";
    }, { immediate: !0 }), dt(() => n.dueTime, (x) => {
      P.value = x || "";
    }, { immediate: !0 });
    function tt() {
      const x = /* @__PURE__ */ new Date();
      return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
    }
    function pt() {
      W.value && !V.value && (V.value = tt()), rt.setStartDateAndTime(V.value, W.value);
    }
    function Ot() {
      W.value = "", pt();
    }
    function Nt() {
      V.value = "", W.value = "", pt();
    }
    function yt() {
      P.value && !D.value && (D.value = tt()), rt.setDueDateAndTime(D.value, P.value);
    }
    function Yt() {
      P.value = "", yt();
    }
    function se() {
      D.value = "", P.value = "", yt();
    }
    const Xt = it(() => {
      const x = [], k = /* @__PURE__ */ new Set(), L = n.description || "", mt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let xt;
      for (; (xt = mt.exec(L)) !== null; ) {
        const vt = xt[2];
        k.add(vt), x.push({
          name: xt[1] || "任务照片",
          url: vt
        });
      }
      for (const vt of n.commentAttachments || [])
        k.has(vt.url) || (k.add(vt.url), x.push(vt));
      return x;
    });
    let z, l;
    function g() {
      const x = (n.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), k = [B.value.trim(), x].filter(Boolean);
      return {
        taskId: n.taskId,
        title: H.value,
        description: k.join(`

`)
      };
    }
    function q() {
      clearTimeout(z), z = void 0;
      const x = l;
      if (l = void 0, x?.taskId && x.title.trim())
        return rt.saveTitleAndDesc(x.title, x.description, x.taskId);
    }
    function _t(x) {
      x && "isComposing" in x && x.isComposing || (l = g(), rt.stageTitleDraft(l.taskId, l.title, l.description), clearTimeout(z), z = setTimeout(q, 800));
    }
    dt(() => n.taskId, () => q(), { flush: "sync" });
    function At() {
      q(), rt.close();
    }
    function ge(x) {
      x && "isComposing" in x && x.isComposing || q();
    }
    function be() {
      l = g(), q();
    }
    function ne(x) {
      const k = Gt(x);
      k && (x.preventDefault(), x.stopPropagation(), jt(k));
    }
    function ke() {
      Q.active && T.value?.click();
    }
    async function ye(x) {
      const k = x.target;
      if (!Q.active) {
        k.value = "";
        return;
      }
      const L = k.files?.[0];
      L && await jt(L), k.value = "";
    }
    async function he(x) {
      h.value = !1;
      const k = x.dataTransfer?.files?.[0];
      k && (k.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(k.name)) && await jt(k);
    }
    function Gt(x) {
      const k = x.clipboardData;
      if (!k) return null;
      if (k.files && k.files.length > 0)
        for (let L = 0; L < k.files.length; L++) {
          const mt = k.files[L];
          if (mt.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(mt.name))
            return mt;
        }
      if (k.items && k.items.length > 0)
        for (let L = 0; L < k.items.length; L++) {
          const mt = k.items[L];
          if (mt.type.includes("image")) {
            const xt = mt.getAsFile();
            if (xt) return xt;
          }
        }
      return null;
    }
    async function jt(x) {
      if (w.value || !Q.active || !n.taskId) return;
      const k = n.taskId;
      w.value = !0;
      try {
        if (await q(), n.taskId !== k || !n.isOpen || !Q.active) return;
        await rt.attachImageToTask(x);
      } catch (L) {
        n.taskId === k && (n.error = L instanceof Error ? L.message : "上传失败");
      } finally {
        w.value = !1;
      }
    }
    function Et(x) {
      const k = Gt(x);
      k && (x.preventDefault(), jt(k));
    }
    function qt(x) {
      if (!n.isOpen || !Q.active) return;
      const k = Gt(x);
      k && (x.preventDefault(), x.stopPropagation(), jt(k));
    }
    dt(() => Q.active, (x) => {
      window.removeEventListener("paste", qt, { capture: !0 }), x && window.addEventListener("paste", qt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), zt(() => {
      q(), window.removeEventListener("paste", qt, { capture: !0 });
    });
    async function de(x) {
      const k = n.description || "", L = x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), mt = k.replace(new RegExp(`!\\[[^\\]]*\\]\\(${L}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(n.title, mt);
    }
    return (x, k) => Pt((r(), c("aside", {
      ref_key: "panelRef",
      ref: d,
      class: "todoist-inspector-window",
      style: bt(e(_)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: Et
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: A,
        class: "inspector-header",
        onPointerdown: k[2] || (k[2] = (L) => e(E)(L))
      }, [
        t("div", ul, [
          k[18] || (k[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          u.value ? (r(), c("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: k[0] || (k[0] = Y(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: $.value,
              "aria-label": $.value
            }, v(f.value), 9, pl),
            u.value.status !== "saving" ? (r(), c("button", {
              key: 0,
              type: "button",
              disabled: e(n).saving || !H.value.trim(),
              onClick: Y(be, ["stop"])
            }, v(u.value.status === "failed" ? "重试保存" : "保存草稿"), 9, ml)) : I("", !0)
          ], 32)) : I("", !0),
          e(n).url ? (r(), c("a", {
            key: 1,
            href: e(n).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, fl)) : I("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: k[1] || (k[1] = Y(() => {
          }, ["stop"])),
          onClick: Y(At, ["stop"])
        }, "×", 32)
      ], 544),
      e(n).isOpen ? (r(), Mt(cl, {
        key: e(n).taskId,
        state: e(n),
        "edit-title": H.value,
        "onUpdate:editTitle": k[3] || (k[3] = (L) => H.value = L),
        "edit-description": B.value,
        "onUpdate:editDescription": k[4] || (k[4] = (L) => B.value = L),
        "edit-start-date": V.value,
        "onUpdate:editStartDate": k[5] || (k[5] = (L) => V.value = L),
        "edit-start-time": W.value,
        "onUpdate:editStartTime": k[6] || (k[6] = (L) => W.value = L),
        "edit-due-date": D.value,
        "onUpdate:editDueDate": k[7] || (k[7] = (L) => D.value = L),
        "edit-due-time": P.value,
        "onUpdate:editDueTime": k[8] || (k[8] = (L) => P.value = L),
        "is-uploading-img": w.value,
        "is-drag-over": h.value,
        "is-task-completed": R.value,
        subtasks: b.value,
        "completed-subtasks-count": Tt.value,
        "is-adding-subtask": K.value,
        "onUpdate:isAddingSubtask": k[9] || (k[9] = (L) => K.value = L),
        "new-subtask-text": G.value,
        "onUpdate:newSubtaskText": k[10] || (k[10] = (L) => G.value = L),
        "new-comment-text": C.value,
        "onUpdate:newCommentText": k[11] || (k[11] = (L) => C.value = L),
        "is-submitting-comment": at.value,
        "attached-images": Xt.value,
        "available-labels": e(ht).availableLabels || [],
        onScheduleDraftSave: _t,
        onSaveTitleAndDesc: ge,
        onToggleComplete: U,
        onTriggerFileInput: ke,
        onDragover: k[12] || (k[12] = (L) => h.value = !0),
        onDragleave: k[13] || (k[13] = (L) => h.value = !1),
        onDropImage: he,
        onDescPaste: ne,
        onRemoveAttachedImage: de,
        onToggleSubtask: S,
        onRemoveSubtask: j,
        onConfirmAddSubtask: ft,
        onSubmitComment: lt,
        onStartChange: pt,
        onClearStartDate: Nt,
        onClearStartTime: Ot,
        onDueChange: yt,
        onClearDueDate: se,
        onClearDueTime: Yt,
        onSelectPriority: N,
        onToggleLabelSelect: ot,
        onRemoveLabel: kt,
        onCreateLabel: ut
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : I("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: T,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ye
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: k[14] || (k[14] = (L) => e(F)(L, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: k[15] || (k[15] = (L) => e(F)(L, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: k[16] || (k[16] = (L) => e(F)(L, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: k[17] || (k[17] = (L) => e(F)(L, "w"))
      }, null, 32)
    ], 36)), [
      [Ie, e(n).isOpen]
    ]);
  }
}), bl = /* @__PURE__ */ oe(gl, [["__scopeId", "data-v-35222deb"]]), kl = { class: "vue-todoist-workspace-wrapper" }, yl = ["aria-label"], hl = { class: "todoist-head-title-wrap" }, wl = { id: "todoist-workspace-title" }, Tl = ["aria-label"], Dl = ["title"], xl = {
  class: "muted small",
  role: "status"
}, Cl = ["title", "aria-expanded"], $l = ["title"], Sl = ["title"], _l = ["title"], Il = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Rl = { class: "todoist-workspace-cal-area" }, Ll = { class: "todoist-workspace-task-area" }, Pl = "todoistWorkspacePosition", Xl = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspace",
  setup(a) {
    const n = M(!1), u = ko(() => import("./TodoistAccountSettings-DPC0pkeA.js")), f = M(!1), $ = M(!1), d = M(!document.hidden), A = M(!1), _ = it(() => Q.visible && d.value);
    Q.session++, Q.active = _.value, Ze(
      () => _.value && !ht.movingTaskId,
      te,
      () => Z.loadWorkspace(void 0, void 0, !0)
    );
    let E = !1;
    const F = M(null), H = So;
    function B() {
      V.value && (V.value.style.removeProperty("width"), V.value.style.removeProperty("height"), V.value.style.removeProperty("left"), V.value.style.removeProperty("top"), V.value.style.removeProperty("right"), V.value.style.removeProperty("bottom"), V.value.style.removeProperty("margin"), V.value.style.removeProperty("transform"));
    }
    dt(() => Q.visible, (R) => {
      R && (H.isOpen = !0, Q.active = d.value, Z.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: V,
      headerRef: W,
      initialStyle: D,
      stopInteractions: P,
      onHeaderPointerDown: w,
      onResizePointerDown: h,
      bringToFront: T
    } = Je({
      windowId: "todoist",
      storageKey: Pl,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => _.value
    }), K = () => V.value;
    function G() {
      te(), Co(), $o(), rt.cancelReads(), P(), window.removeEventListener("keydown", b);
    }
    const C = wo(G);
    function at() {
      d.value = !document.hidden;
    }
    function b(R) {
      R.key === "Escape" && y.isOpen && (R.preventDefault(), R.stopPropagation(), rt.close());
    }
    dt(_, (R) => {
      Q.active = R, R ? (window.addEventListener("keydown", b), E || (E = !0, Z.loadWorkspace()), It(() => {
        _.value && T();
      })) : G();
    }, { flush: "sync" }), dt(f, (R) => {
      R && ($.value = !0);
    }), dt([_, n, Fe], ([R, U, N]) => {
      if (!(!R || !U || !N) && (Fe.value = null, _o("todoist") === N.transition)) {
        if (Q.pendingWrites || y.isOpen && y.taskId !== N.id) {
          Ro.show({ appName: "Todoist", title: m("todoist.retainDetailTitle"), message: m("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        y.isOpen && y.taskId === N.id || rt.openTask(N.id);
      }
    }, { flush: "post" }), ee(() => {
      n.value = !0, A.value && It(B), pe.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: K }), document.addEventListener("visibilitychange", at), _.value && (window.addEventListener("keydown", b), E || (E = !0, Z.loadWorkspace()), Ve.refresh());
    }), zt(() => {
      To(), C(), document.removeEventListener("visibilitychange", at), pe.unregister("todoist", K), rt.close(), Object.assign(y, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), Z.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), $e.updateState({ title: m("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ve.update([]);
    });
    function Tt() {
      $e.toggleCalendar();
    }
    function Dt() {
      $e.refresh();
    }
    function ft() {
      Z.updateState({ accountConfigured: !0 }), _.value && Z.loadWorkspace(void 0, void 0, !0);
    }
    function S() {
      pe.minimize("todoist");
    }
    function j() {
      Q.visible = !1, H.isOpen = !1, pe.close("todoist");
    }
    return (R, U) => (r(), c("div", kl, [
      Pt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: V,
        class: "card wide todoist-workspace",
        style: bt(e(D)),
        "aria-label": e(m)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: W,
          class: "todoist-workspace-head",
          onPointerdown: U[4] || (U[4] = (N) => e(w)(N))
        }, [
          t("div", hl, [
            U[10] || (U[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", wl, v(e(H).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(m)("todoist.viewAria")
          }, [
            Zt(zo)
          ], 8, Tl),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: J(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(H).isCalendarOpen }]),
            type: "button",
            title: e(m)("todoist.calendarToggleTitle"),
            onClick: Tt
          }, " 📅 " + v(e(m)("todoist.calendar")), 11, Dl),
          U[11] || (U[11] = t("span", { class: "grow" }, null, -1)),
          t("span", xl, v(e(Q).pendingWrites ? e(m)("todoist.pendingWrites") : e(m)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: F,
            type: "button",
            class: "no-drag",
            title: e(m)("todoist.settingsTitle"),
            "aria-expanded": f.value,
            onClick: U[0] || (U[0] = Y((N) => f.value = !f.value, ["stop"]))
          }, " ⚙️ ", 8, Cl),
          $.value ? (r(), Mt(e(u), {
            key: 0,
            visible: _.value && f.value,
            anchor: F.value,
            onClose: U[1] || (U[1] = (N) => f.value = !1),
            onAccountSaved: ft
          }, null, 8, ["visible", "anchor"])) : I("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: e(m)("common.refresh"),
            onClick: Dt
          }, " ↻ ", 8, $l),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(m)("todoist.minimizeHint"),
            onPointerdown: U[2] || (U[2] = Y(() => {
            }, ["stop"])),
            onClick: Y(S, ["stop"])
          }, " − ", 40, Sl),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(m)("todoist.closeHint"),
            onPointerdown: U[3] || (U[3] = Y(() => {
            }, ["stop"])),
            onClick: Y(j, ["stop"])
          }, " ✕ ", 40, _l)
        ], 544),
        e(ht).accountConfigured === !1 ? (r(), Mt(Io, {
          key: 0,
          icon: "✅",
          title: e(m)("todoist.tokenMissingTitle"),
          description: e(m)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(m)("todoist.getToken"),
          onConfigure: U[5] || (U[5] = (N) => f.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), c("div", Il, [
          Pt(t("div", Rl, [
            Zt(Ps)
          ], 512), [
            [Ie, e(H).isCalendarOpen]
          ]),
          t("div", Ll, [
            Zt(Ei)
          ])
        ])),
        Zt(bl),
        U[12] || (U[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        A.value ? I("", !0) : (r(), c(nt, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: U[6] || (U[6] = (N) => e(h)(N, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: U[7] || (U[7] = (N) => e(h)(N, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: U[8] || (U[8] = (N) => e(h)(N, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: U[9] || (U[9] = (N) => e(h)(N, "w"))
          }, null, 32)
        ], 64))
      ], 12, yl), [
        [Ie, e(Q).visible]
      ])
    ]));
  }
});
export {
  Xl as default
};
