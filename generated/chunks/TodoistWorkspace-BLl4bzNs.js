import { d as Bt, o as l, f as d, F as nt, g as t, u as p, C as Q, r as Qt, z as Ut, y as rt, D as te, n as Wt, t as x, i as dt, j as F, h as I, b as P, O as qe, J as ze, B as gt, x as st, H as It, m as Lt, p as Vt, E as Jt, w as ae, l as $t, e as Pt, A as Ie, G as bo } from "./vendor-vue-wIH4jcna.js";
import { a as ko, t as q, w as yo, o as wo, p as ho } from "./module-state-BmW4SrQd.js";
import { b as Be, h as He, i as Zt, j as yt, e as J, d as vt, c as To, k as Do, t as Ne, g as Ce, l as xo, m as Co, n as $o } from "./calendar.service-_YumC_hP.js";
import { u as Qe } from "./useWindowDraggable-CUOTL3np.js";
import { w as ce, b as So } from "./window-manager.store-DgNn9Rtk.js";
import { A as Io } from "./AccountSetupGuide-TNciZwtl.js";
import { i as Le } from "./image-viewer-store-D6f8prkA.js";
import { n as Ro } from "./view-styles-BeDavYk-.js";
import { t as ot, d as _o, s as Lo, b as pe, g as Ve, f as $e, p as Po } from "./todoist.service-BwvB2mGP.js";
import { u as Je, g as Ze, I as Re, T as _e, a as Mo } from "./TodoistDatePickerPopover-Bc07IbMy.js";
import { _ as ee } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { A as to } from "./search.service-B8FaDQLd.js";
import { m as Oo } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Ke } from "./task-navigation-CFuqS02f.js";
const Ao = /* @__PURE__ */ Bt({
  __name: "TodoistWorkspaceTabs",
  setup(i) {
    return (n, u) => (l(), d(nt, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: Q({ on: p(He).view === "inbox" }),
        title: "收件箱",
        onClick: u[0] || (u[0] = (m) => p(Be).switchView("inbox"))
      }, [...u[2] || (u[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: Q({ on: p(He).view === "projects" }),
        title: "项目",
        onClick: u[1] || (u[1] = (m) => p(Be).switchView("projects"))
      }, [...u[3] || (u[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), eo = "todoist_reminder_v2:", Eo = "todoist_remind_";
async function jo(i) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const n = eo + i, u = await chrome.storage.local.get([n, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(u, n) ? u[n] || void 0 : u.todoist_reminders_map_v1?.[i];
}
async function Wo(i, n, u) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const m = new Date(n).getTime();
  if (n && (!Number.isFinite(m) || m <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (n && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const C = eo + i, r = Eo + i;
  await chrome.alarms.clear(r), await chrome.storage.local.set({ [C]: n ? { time: n, title: u } : null }), n && await chrome.alarms.create(r, { when: m });
}
const _t = Qt(/* @__PURE__ */ new Map());
let Uo = 0;
function Fe(i, n, u, m = "editing") {
  const C = ++Uo;
  return _t.set(i, { revision: C, title: n, description: u, status: m, error: "" }), C;
}
const b = Qt({
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
let Se = Promise.resolve(), me = 0, Ye = Promise.resolve();
const fe = /* @__PURE__ */ new Map();
let le = 0;
const Kt = /* @__PURE__ */ new Map();
function ie(i = !0) {
  i && le++;
  for (const n of Kt.values()) n.abort();
  Kt.clear(), b.loading = !1;
}
function Ge(i) {
  Kt.get(i)?.abort();
  const n = new AbortController();
  Kt.set(i, n);
  const u = le, m = b.taskId;
  return {
    signal: n.signal,
    current: () => !n.signal.aborted && u === le && b.isOpen && m === b.taskId && Kt.get(i) === n,
    finish: () => {
      Kt.get(i) === n && Kt.delete(i);
    }
  };
}
function jt() {
  ie(!1);
  const i = b.taskId, n = le;
  return { taskId: i, current: () => b.isOpen && n === le && i === b.taskId };
}
function zo(i) {
  return new Promise((n) => {
    const u = new FileReader();
    u.onload = () => n(u.result || ""), u.onerror = () => n(""), u.readAsDataURL(i);
  });
}
function Xe(i, n, u) {
  for (const m of yt.columns)
    for (const C of m.tasks)
      String(C.id) === i && (C.content = n, u !== void 0 && (C.description = u), C._taskRaw && (C._taskRaw.content = n, u !== void 0 && (C._taskRaw.description = u)));
  vt.updateTaskTitle(i, n);
}
const Bo = {
  state: b,
  cancelReads: ie,
  stageTitleDraft(i, n, u) {
    i && (Fe(i, n, u), ie(!1), b.taskId === i && (b.title = n), Xe(i, n, u));
  },
  async openTask(i, n) {
    if (!i) return;
    if (ie(), b.taskId = i, b.isOpen = !0, b.error = "", Object.assign(b, {
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
      const r = pe(n.due?.datetime || n.due?.date || n.dueDate || "");
      b.dueDate = r.date, b.dueTime = r.time;
      const O = n.startDate || Ve(i, b.description), S = pe(O);
      b.startDate = S.date, b.startTime = S.time, b.labels = [...n.labels || []], b.url = n.url || "";
    }
    const u = _t.get(i);
    u && (b.title = u.title, b.description = u.description);
    const m = Ge("reminder");
    jo(i).then((r) => {
      m.current() && (b.reminderTime = r?.time || "");
    }).catch(() => {
      m.current() && (b.error = "本机提醒读取失败。");
    }).finally(m.finish);
    const C = Ge("detail");
    b.loading = !0;
    try {
      const r = await ot.api(`/tasks/${encodeURIComponent(i)}`, { signal: C.signal });
      if (r && C.current()) {
        const O = _t.get(i);
        b.title = O?.title ?? r.content ?? "", b.description = O?.description ?? r.description ?? "", b.priority = r.priority || 1;
        const S = pe(r.due?.datetime || r.due?.date || "");
        b.dueDate = S.date, b.dueTime = S.time;
        const E = Ve(i, r.description || b.description), K = pe(E);
        b.startDate = K.date, b.startTime = K.time, b.labels = [...r.labels || []], b.url = r.url || "";
        try {
          const B = await ot.getComments(i, C.signal);
          if (B && C.current()) {
            const z = [], N = [];
            for (const j of B) {
              let h;
              if (j?.attachment?.file_url) {
                const L = j.attachment.file_name || "附件图片";
                z.push({ name: L, url: j.attachment.file_url }), h = { name: L, url: j.attachment.file_url };
              }
              N.push({
                id: j.id,
                content: j.content || "",
                postedAt: j.posted_at || "",
                attachment: h
              });
            }
            if (b.commentAttachments = z, b.comments = N, z.length > 0 && b.description) {
              let j = b.description, h = !1;
              for (const L of z) {
                const y = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                y.test(j) && (j = j.replace(y, `$1${L.url}$2`), h = !0);
              }
              if (h && !_t.has(i)) {
                b.description = j;
                for (const L of yt.columns) {
                  const y = L.tasks.find((k) => String(k.id) === i);
                  if (y) {
                    y.description = j, y._taskRaw && (y._taskRaw.description = j);
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
    ie(), b.isOpen = !1, b.taskId = "";
  },
  async setStartDateAndTime(i, n) {
    if (!b.taskId) return;
    const u = jt(), m = i.trim(), C = m ? n.trim() : "";
    b.startDate = m, b.startTime = C, Zt();
    const r = _o(m, C);
    Lo(u.taskId, r), ot.invalidateWorkspaceSnapshots();
    for (const O of yt.columns) {
      const S = O.tasks.find((E) => E.id === u.taskId);
      S && (S.startDate = r);
    }
  },
  async setDueDateAndTime(i, n) {
    if (!b.taskId) return;
    const u = jt(), m = i.trim(), C = m ? n.trim() : "";
    b.dueDate = m, b.dueTime = C, Zt(), ot.invalidateWorkspaceSnapshots();
    const r = (fe.get(u.taskId) || 0) + 1;
    fe.set(u.taskId, r);
    const O = Ye.then(async () => {
      try {
        const S = await ot.updateTask(u.taskId, {
          due_string: m ? C ? `${m} ${C}` : m : "no date"
        });
        if (fe.get(u.taskId) !== r) return;
        const E = ot.mapTasks([S], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const K of yt.columns) {
          const B = K.tasks.findIndex((N) => N.id === u.taskId);
          if (B < 0) continue;
          const z = K.tasks[B];
          if (Object.assign(z, {
            dueDate: E.dueDate,
            dueText: E.dueText,
            dueString: E.dueString,
            isDueToday: E.isDueToday,
            isOverdue: E.isOverdue,
            isRecurring: E.isRecurring
          }), z._taskRaw && (z._taskRaw.due = S.due), yt.view === "today") {
            const N = E.isOverdue ? "overdue" : E.isDueToday ? "today" : "";
            N !== K.sectionId && (K.tasks.splice(B, 1), yt.columns.find((j) => j.sectionId === N)?.tasks.push(z));
          }
        }
        u.current() && (b.error = "");
      } catch {
        u.current() && fe.get(u.taskId) === r && (b.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Ye = O.catch(() => {
    }), await O;
  },
  async saveTitleAndDesc(i, n, u = b.taskId) {
    const m = u === b.taskId ? jt() : { taskId: u, current: () => !1 };
    if (!m.taskId || !i.trim()) return;
    const C = i.trim(), r = n.trim(), O = Fe(u, C, r, "saving");
    m.current() && (b.title = C, b.description = r), Xe(m.taskId, C, r), me++, b.saving = !0;
    const S = Se.then(async () => {
      try {
        await ot.updateTask(m.taskId, {
          content: C,
          description: r
        }), _t.get(u)?.revision === O && _t.delete(u), me === 1 && _t.size === 0 && J.dispatch("refresh");
      } catch (E) {
        const K = _t.get(u);
        K?.revision === O && (K.status = "failed", K.error = E instanceof Error ? E.message : "保存未确认");
      } finally {
        me--, b.saving = me > 0;
      }
    });
    Se = S.catch(() => {
    }), await S;
  },
  async attachImageToTask(i) {
    const n = jt();
    if (await Se, !n.current()) return;
    if (_t.has(n.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const u = b.description || "";
    if (!n.taskId || b.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    b.saving = !0;
    try {
      const m = i.name || `截图_${Date.now()}.png`;
      let C = "";
      try {
        const r = await ot.uploadFile(i, m);
        r && r.file_url && (C = r.file_url);
      } catch (r) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", r), i.size <= 2.5 * 1024 * 1024)
          C = await zo(i);
        else
          throw new Error(r?.message || "云端上传失败且文件超过2.5MB");
      }
      if (C) {
        const r = u ? `${u}

![${m}](${C})` : `![${m}](${C})`;
        await ot.updateTask(n.taskId, {
          description: r
        }), n.current() && (b.description = r);
        for (const O of yt.columns) {
          const S = O.tasks.find((E) => String(E.id) === n.taskId);
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
    const n = jt();
    if (![1, 2, 3, 4].includes(i)) return;
    const u = b.priority;
    b.priority = i, Zt(), ot.invalidateWorkspaceSnapshots();
    try {
      await ot.updateTask(n.taskId, { priority: i });
      for (const m of yt.columns) {
        const C = m.tasks.find((r) => r.id === n.taskId);
        C && (C.priority = i, C._taskRaw && (C._taskRaw.priority = i));
      }
    } catch {
      n.current() && (b.priority = u, b.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(i) {
    if (!b.taskId) return;
    const n = jt(), u = [...b.labels], C = u.includes(i) ? u.filter((r) => r !== i) : [...u, i];
    b.labels = C, Zt(), ot.invalidateWorkspaceSnapshots();
    try {
      await ot.updateTask(n.taskId, { labels: C });
      for (const r of yt.columns) {
        const O = r.tasks.find((S) => S.id === n.taskId);
        O && (O.labels = C, O._taskRaw && (O._taskRaw.labels = C));
      }
    } catch {
      n.current() && (b.labels = u, b.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(i) {
    const n = jt();
    if (i = i.trim(), !(!n.taskId || !i))
      try {
        const u = await ot.getLabels();
        if (!n.current()) return;
        u.some((m) => m.name === i) || await ot.createLabel(i), n.current() && !b.labels.includes(i) && await this.toggleLabel(i);
      } catch {
        n.current() && (b.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(i) {
    if (!b.taskId || !i.trim()) return;
    const n = jt();
    try {
      const u = await ot.addComment({
        task_id: n.taskId,
        content: i.trim()
      });
      u && n.current() && b.comments.push({
        id: u.id || `c_${Date.now()}`,
        content: u.content || i.trim(),
        postedAt: u.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (u) {
      n.current() && (b.error = "发送评论失败：" + (u?.message || ""));
    }
  },
  async setReminder(i) {
    const n = jt();
    if (n.taskId)
      try {
        await Wo(n.taskId, i, b.title), n.current() && (b.reminderTime = i, b.error = "");
      } catch (u) {
        n.current() && (b.error = u instanceof Error ? u.message : "提醒未保存，请重试。");
      }
  }
}, lt = ko(Bo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), Ho = { class: "todoist-cal-head" }, No = { class: "todoist-cal-title-row" }, Vo = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, Ko = { class: "todoist-cal-nav" }, Fo = { class: "todoist-cal-nav-group" }, Yo = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, Go = { class: "todoist-cal-nav-group" }, Xo = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, qo = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Qo = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Jo = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Zo = { class: "todoist-cal-agenda" }, tn = { class: "todoist-cal-agenda-head" }, en = { class: "todoist-cal-agenda-title" }, on = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, nn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, sn = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, an = ["disabled"], ln = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, rn = {
  key: 0,
  class: "todoist-cal-empty"
}, dn = {
  key: 1,
  class: "todoist-cal-empty"
}, un = ["onClick"], cn = { class: "todoist-cal-todo-main" }, pn = ["disabled", "title", "onClick"], mn = {
  key: 0,
  class: "check-icon"
}, fn = {
  key: 0,
  class: "todoist-cal-task-time"
}, vn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, gn = ["onClick"], bn = ["src"], kn = /* @__PURE__ */ Bt({
  __name: "TodoistCalendarSidebar",
  setup(i) {
    const n = Do;
    Je(
      () => q.active,
      () => vt.invalidateReads(),
      () => vt.loadTodosForDate(n.selectedDate, !0)
    ), Ut(() => vt.cancelReads()), rt(() => [q.active, q.pendingWrites], ([h, L], y) => {
      if (!h || L) {
        vt.cancelReads();
        return;
      }
      vt.loadTodosForDate(n.selectedDate, !!y?.[1]);
    }, { immediate: !0, flush: "sync" });
    function u(h) {
      vt.toggleTodoItem(h);
    }
    function m(h) {
      lt.openTask(h.id, h);
    }
    te(() => {
      To.syncSidebarToVue();
    });
    function C() {
      vt.dispatch("today");
    }
    function r() {
      vt.dispatch("prev-month");
    }
    function O() {
      vt.dispatch("next-month");
    }
    function S() {
      vt.dispatch("prev-year");
    }
    function E() {
      vt.dispatch("next-year");
    }
    function K(h) {
      vt.dispatch("select-date", h);
    }
    function B(h, L) {
      vt.dispatch("context-date", {
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
    function j(h, L) {
      const y = L.dataTransfer?.getData("application/x-todoist-task-id") || L.dataTransfer?.getData("text/plain");
      y && (L.preventDefault(), L.stopPropagation(), vt.dispatch("drop-task", { taskId: y, date: h }));
    }
    return (h, L) => (l(), d("aside", {
      id: "todoist-calendar-sidebar",
      class: Q(["todoist-calendar-sidebar", { collapsed: p(n).collapsed }]),
      "aria-label": "Todoist 任务日历"
    }, [
      t("div", Ho, [
        t("div", No, [
          L[1] || (L[1] = t("span", { class: "todoist-cal-logo" }, [
            Wt("📅 "),
            t("strong", null, "任务日历")
          ], -1)),
          t("span", Vo, x(p(n).badgeText), 1)
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
      t("div", Ko, [
        t("div", Fo, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: r
          }, "‹"),
          t("span", Yo, x(p(n).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: "下个月",
            onClick: O
          }, "›")
        ]),
        t("div", Go, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: "上一年",
            onClick: S
          }, "‹"),
          t("span", Xo, x(p(n).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: "下一年",
            onClick: E
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
      t("div", qo, [
        (l(!0), d(nt, null, dt(p(n).cells, (y) => (l(), d("button", {
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
          onDrop: (k) => j(y.date, k)
        }, [
          t("span", null, x(y.dayNumber), 1),
          y.hasDot ? (l(), d("span", Jo)) : I("", !0)
        ], 42, Qo))), 128))
      ]),
      t("div", Zo, [
        t("div", tn, [
          t("strong", en, x(p(n).agendaTitle), 1),
          t("span", on, x(p(n).todoItems.length) + " 项", 1)
        ]),
        p(n).writeError ? (l(), d("p", nn, x(p(n).writeError), 1)) : I("", !0),
        p(n).emptyText ? (l(), d("div", sn, [
          Wt(x(p(n).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: p(n).todoLoading || p(q).pendingWrites > 0,
            onClick: L[0] || (L[0] = (y) => p(vt).loadTodosForDate(p(n).selectedDate, !0))
          }, "重试读取", 8, an)
        ])) : I("", !0),
        t("div", ln, [
          p(n).todoLoading && !p(n).todoItems.length ? (l(), d("div", rn, " 正在读取待办与完成历史… ")) : p(n).todoItems.length === 0 && !p(n).emptyText ? (l(), d("div", dn, " 当天没有待办或完成任务 ☕ ")) : (l(!0), d(nt, { key: 2 }, dt(p(n).todoItems, (y) => (l(), d("div", {
            key: y.id,
            class: Q(["todoist-cal-todo-card", { completed: y.completed }]),
            onClick: (k) => m(y)
          }, [
            t("div", cn, [
              t("button", {
                type: "button",
                class: Q(["todoist-cal-check", { checked: y.completed }]),
                disabled: p(q).pendingWrites > 0,
                title: y.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: F((k) => u(y), ["stop"])
              }, [
                y.completed ? (l(), d("span", mn, "✓")) : I("", !0)
              ], 10, pn),
              t("span", {
                class: Q(["todoist-cal-todo-title", { strike: y.completed }])
              }, x(y.content), 3),
              y.time ? (l(), d("small", fn, x(y.time), 1)) : I("", !0),
              y.completed ? (l(), d("span", vn, "已完成")) : I("", !0)
            ]),
            y.thumbUrl ? (l(), d("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: F((k) => p(Le).open(y.thumbUrl, y.content), ["stop"])
            }, [
              t("img", {
                src: y.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, bn),
              L[2] || (L[2] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, gn)) : I("", !0)
          ], 10, un))), 128))
        ])
      ])
    ], 2));
  }
}), yn = /* @__PURE__ */ ee(kn, [["__scopeId", "data-v-6d6d531e"]]);
function wn(i) {
  const n = i.state, u = P(null), m = P(null), C = P(null), r = P(!1), O = qe(null), S = P(), E = /* @__PURE__ */ new Map();
  function K($) {
    E.clear();
    const A = $.closest(".todoist-board");
    if (A)
      for (const R of A.querySelectorAll(".todoist-board-list")) {
        const W = n.columns[Number(R.dataset.groupIndex)];
        if (!W) continue;
        const H = R.__todoistSlots;
        if (!H) continue;
        const et = H(), bt = et.filter((ut) => ut.id !== k?.id);
        E.set(W, { list: R, rows: bt, read: H, snapshot: et });
      }
  }
  let B = 0, z;
  function N($, A) {
    z = { clientY: $.clientY, col: A }, !B && (B = requestAnimationFrame(() => {
      B = 0;
      const R = z;
      z = void 0, R && j(R, R.col);
    }));
  }
  function j($, A) {
    if (!k || n.movingTaskId) return;
    const R = E.get(A);
    if (!R) return;
    const W = R.read();
    W !== R.snapshot && (R.snapshot = W, R.rows = W.filter((Z) => Z.id !== k?.id));
    const H = $.clientY - R.list.getBoundingClientRect().top + R.list.scrollTop;
    let et = 0, bt = R.rows.length;
    for (; et < bt; ) {
      const Z = et + bt >>> 1;
      H < R.rows[Z].middle ? bt = Z : et = Z + 1;
    }
    let ut = et;
    if (m.value === n.columns.indexOf(A)) {
      const Z = S.value ? R.rows.findIndex((ct) => ct.id === S.value) : R.rows.length;
      Z >= 0 && ut > Z && H < R.rows[Z].middle + 10 && (ut = Z), Z > 0 && ut < Z && H > R.rows[Z - 1].middle - 10 && (ut = Z);
    }
    const at = R.rows[ut]?.id;
    y(A, at), m.value === n.columns.indexOf(A) && (C.value = at || R.rows[R.rows.length - 1]?.id || null, r.value = !at);
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
    if ($.stopPropagation(), i.closePopovers(), u.value = A.id, k = A, w = R, O.value = { ...A }, K($.currentTarget), $.dataTransfer) {
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
    cancelAnimationFrame(B), B = 0, z = void 0, u.value = null, m.value = null, C.value = null, r.value = !1, k = null, w = null, O.value = null, S.value = void 0, E.clear();
  }
  function D($, A) {
    !k || n.movingTaskId || ($.preventDefault(), $.stopPropagation(), $.dataTransfer && ($.dataTransfer.dropEffect = "move"), N($, n.columns[A]));
  }
  function it($, A) {
    $.currentTarget?.contains($.relatedTarget);
  }
  function v($, A, R, W) {
    $.dataTransfer && ($.dataTransfer.dropEffect = "move"), N($, R);
  }
  async function ht($, A) {
    z && z.col === $ && (j(z, z.col), A = S.value);
    const R = k, W = w;
    G(), !(!R || !W || !i.isActive() || n.movingTaskId) && (n.view === "today" ? $.sectionId === "today" && W.sectionId !== "today" ? await i.moveTask(R.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, A) : await i.moveTask(R.id, { sectionId: $.sectionId }, A) : await i.moveTask(R.id, {
      projectId: $.projectId,
      sectionId: $.sectionId
    }, A));
  }
  async function Tt($, A, R, W) {
    $.preventDefault();
    const H = $.dataTransfer?.getData("application/x-todoist-label") || ($.dataTransfer?.getData("text/plain")?.startsWith("label:") ? $.dataTransfer.getData("text/plain").slice(6) : "");
    if (H) {
      i.dropLabel(A, H);
      return;
    }
    if (m.value === n.columns.indexOf(R)) {
      await ht(R, S.value);
      return;
    }
    const et = $.currentTarget.getBoundingClientRect(), bt = $.clientY >= et.top + et.height / 2, ut = R.tasks.filter((ct) => ct.id !== k?.id), at = ut.findIndex((ct) => ct.id === A.id), Z = A.id === k?.id ? A.id : bt ? ut[at + 1]?.id : A.id;
    await ht(R, Z);
  }
  async function mt($, A) {
    $.preventDefault(), $.stopPropagation(), await ht(A, m.value === n.columns.indexOf(A) ? S.value : void 0);
  }
  return rt(() => [n.view, n.activeProjectId], () => G()), rt(() => n.columns, ($) => {
    w && !$.includes(w) && G();
  }), rt(i.isActive, ($) => {
    $ || G();
  }, { immediate: !0, flush: "sync" }), Ut(G), {
    draggingTaskId: u,
    dragOverColIndex: m,
    dragOverTaskId: C,
    dragAfterTask: r,
    isDragPreview: h,
    previewTasks: L,
    onTaskDragStart: V,
    onTaskDragEnd: G,
    onColDragOver: D,
    onColDragLeave: it,
    onTaskDragOver: v,
    onTaskDrop: Tt,
    onColDrop: mt
  };
}
const hn = ["data-row-key"], Tn = /* @__PURE__ */ Bt({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(i) {
    const n = i, u = P(null), m = /* @__PURE__ */ new Map(), C = P(0), r = qe({ top: 0, height: 600 }), O = (y) => n.isPreview(y) ? `preview:${y.id}` : y.id, S = st(() => {
      C.value;
      const y = [0];
      for (const k of n.tasks) {
        const w = k.id === n.hiddenId && !n.isPreview(k) ? 0 : m.get(O(k)) || m.get(k.id) || 110;
        y.push(y[y.length - 1] + w);
      }
      return y;
    }), E = st(() => {
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
    const B = st(() => {
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
        z = 0, u.value && (r.value = { top: u.value.scrollTop, height: u.value.clientHeight });
      }));
    }
    let j;
    const h = /* @__PURE__ */ new Map();
    function L(y, k) {
      const w = h.get(k);
      w !== y && (w && j?.unobserve(w), y instanceof HTMLElement ? (h.set(k, y), j?.observe(y)) : h.delete(k));
    }
    return rt(() => n.tasks, () => {
      const y = new Set(n.tasks.map(O));
      for (const k of m.keys()) y.has(k) || m.delete(k);
      It(N);
    }), te(() => {
      j = new ResizeObserver((y) => {
        let k = !1;
        const w = K(u.value?.scrollTop || 0), V = S.value[w] || 0;
        for (const G of y) {
          const D = G.target;
          if (D === u.value) {
            N();
            continue;
          }
          const it = D.dataset.rowKey, v = G.borderBoxSize?.[0]?.blockSize || G.contentRect.height;
          it && v > 0 && Math.abs((m.get(it) || 0) - v) > 0.5 && (m.set(it, v), k = !0);
        }
        if (k) {
          C.value++;
          const G = (S.value[w] || 0) - V;
          u.value && G && !n.pinnedId && (u.value.scrollTop += G), N();
        }
      }), u.value && (j.observe(u.value), u.value.__todoistSlots = () => E.value);
      for (const y of h.values()) j.observe(y);
      N();
    }), Ut(() => {
      j?.disconnect(), cancelAnimationFrame(z), u.value && delete u.value.__todoistSlots, h.clear(), m.clear();
    }), (y, k) => (l(), d("div", {
      ref_key: "root",
      ref: u,
      onScrollPassive: N
    }, [
      i.tasks.length ? (l(), d("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: gt({ height: `${S.value[S.value.length - 1]}px` })
      }, [
        (l(!0), d(nt, null, dt(B.value, (w) => (l(), d("div", {
          key: O(w.task),
          ref_for: !0,
          ref: (V) => L(V, O(w.task)),
          "data-row-key": O(w.task),
          class: "virtual-task-row",
          style: gt({ transform: `translateY(${w.top}px)` })
        }, [
          ze(y.$slots, "default", {
            task: w.task,
            index: w.index
          }, void 0, !0)
        ], 12, hn))), 128))
      ], 4)) : ze(y.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), Dn = /* @__PURE__ */ ee(Tn, [["__scopeId", "data-v-e0ed77d8"]]), xn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Cn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, $n = {
  key: 2,
  class: "todoist-empty"
}, Sn = {
  key: 3,
  class: "todoist-empty"
}, In = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Rn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, _n = { class: "todoist-projects-toolbar-inner" }, Ln = { class: "todoist-project-tabs-scroll" }, Pn = ["onClick"], Mn = { class: "todoist-project-tab-name" }, On = {
  key: 0,
  class: "todoist-project-actions-group"
}, An = { class: "todoist-board" }, En = ["data-section-id", "data-title", "data-column-index"], jn = { class: "todoist-board-column-head" }, Wn = ["title", "onClick"], Un = ["onClick"], zn = ["onSubmit"], Bn = ["onKeydown"], Hn = { class: "date-hint-left" }, Nn = { class: "date-hint-badge" }, Vn = { class: "date-hint-sub" }, Kn = {
  key: 0,
  class: "date-hint-preview"
}, Fn = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, Yn = {
  key: 1,
  class: "todoist-composer-images"
}, Gn = ["src"], Xn = { class: "todoist-composer-img-name" }, qn = {
  key: 0,
  class: "todoist-composer-img-status"
}, Qn = ["onClick"], Jn = { class: "todoist-inline-actions" }, Zn = ["disabled"], ts = ["disabled"], es = {
  key: 0,
  class: "todoist-column-empty"
}, os = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], ns = ["disabled", "title", "aria-label", "onClick"], ss = { class: "todoist-board-task-main" }, is = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, as = {
  key: 1,
  class: "todoist-card-repo-strip"
}, ls = ["title", "onClick"], rs = { class: "repo-badge-name" }, ds = ["onKeydown", "onBlur"], us = {
  key: 3,
  class: "todoist-board-task-title todoist-task-content"
}, cs = {
  key: 4,
  class: "todoist-board-task-description"
}, ps = {
  key: 5,
  class: "todoist-board-task-meta"
}, ms = ["title"], fs = ["title"], vs = ["title"], gs = ["title"], bs = {
  key: 4,
  class: "todoist-board-extra"
}, ks = ["onClick"], ys = ["src"], ws = {
  key: 0,
  class: "todoist-board-add-column"
}, hs = {
  key: 1,
  class: "todoist-add-section-form"
}, Ts = ["onKeydown"], Ds = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, xs = ["disabled"], Cs = ["disabled"], $s = {
  key: 1,
  class: "todoist-section-menu-divider"
}, Ss = { class: "todoist-task-menu-header" }, Is = { class: "todoist-task-menu-title" }, Rs = { class: "todoist-menu-badge" }, _s = {
  key: 0,
  class: "todoist-labels-panel"
}, Ls = { class: "todoist-labels-quick-input" }, Ps = ["onKeydown"], Ms = { class: "todoist-labels-chip-grid" }, Os = ["onClick"], As = {
  key: 0,
  class: "chip-check"
}, Es = {
  key: 1,
  class: "todoist-recur-panel"
}, js = { class: "todoist-recur-grid" }, Ws = ["onClick"], Us = { class: "todoist-recur-custom-row" }, zs = ["onKeydown"], Bs = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Hs = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Ns = {
  key: 2,
  class: "todoist-color-panel"
}, Vs = { class: "todoist-color-grid" }, Ks = ["title", "onClick"], Fs = { class: "todoist-color-name" }, Ys = ["disabled", "onClick"], Gs = { class: "todoist-project-flyout-name" }, Xs = {
  key: 0,
  class: "todoist-menu-badge"
}, qs = { class: "todoist-menu-text" }, Qs = { class: "todoist-dialog-title" }, Js = { class: "todoist-dialog-body" }, Zs = {
  key: 0,
  class: "todoist-dialog-desc"
}, ti = ["placeholder", "onKeydown"], ei = { class: "todoist-dialog-foot" }, oi = { class: "todoist-dialog-icon" }, ni = { class: "todoist-dialog-title" }, si = { class: "todoist-dialog-body" }, ii = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, ai = { class: "todoist-dialog-danger-text" }, li = { class: "todoist-dialog-msg" }, ri = { class: "todoist-dialog-foot" }, di = /* @__PURE__ */ Bt({
  __name: "TodoistTaskList",
  setup(i) {
    const n = P(0);
    function u() {
      n.value++;
    }
    te(() => {
      window.addEventListener("storage", u), window.addEventListener("todoist-repository-links-changed", u);
    }), Ut(() => {
      window.removeEventListener("storage", u), window.removeEventListener("todoist-repository-links-changed", u);
    });
    function m(o, e) {
      return n.value, Ze(o, e);
    }
    function C(o) {
      to.open(o);
    }
    const r = yt, O = P(""), S = P(null), E = P(""), K = P(!1), B = st(() => E.value ? Po(E.value) : null), z = P([]);
    function N(o) {
      const e = o.clipboardData?.items;
      if (e)
        for (let s = 0; s < e.length; s++) {
          const M = e[s];
          if (M.type.indexOf("image") !== -1) {
            o.preventDefault();
            const c = M.getAsFile();
            if (!c) continue;
            const tt = URL.createObjectURL(c), Y = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), xt = {
              file: c,
              previewUrl: tt,
              name: `截图_${Y}.png`,
              uploading: !1
            };
            z.value.push(xt);
          }
        }
    }
    function j(o) {
      const e = z.value.splice(o, 1)[0];
      if (e && e.previewUrl)
        try {
          URL.revokeObjectURL(e.previewUrl);
        } catch {
        }
    }
    const h = P(null), L = P(""), y = P(null), k = Qt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), w = Qt({
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
    }), V = P(null), G = P(null), D = Qt({
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
    }), it = P(null), v = Qt({
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
    }), ht = P(null), Tt = P(null), mt = [
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
    ], A = st(() => String(v.task?._taskRaw?.project_id || v.col?.projectId || "")), R = st(() => r.view !== "projects" ? null : r.projects.find((o) => String(o.id) === String(r.activeProjectId)) || r.projects[0] || null), W = st(() => {
      const o = new Set(r.availableLabels || []);
      return v.task?.labels && v.task.labels.forEach((e) => o.add(e)), Array.from(o);
    }), H = st(() => {
      const o = v.task?.customColorHex;
      return o && mt.find((s) => s.hex.toLowerCase() === o.toLowerCase()) || mt[0];
    });
    function et(o, e) {
      return o.sectionId || o.title || String(e);
    }
    function bt() {
      return `${r.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function ut(o) {
      return o.startDate || o.dueText || o.labels && o.labels.length > 0 || o.timedDeadlineText || o.extraCountText;
    }
    function at() {
      k.isOpen = !1, v.isOpen = !1, v.activeSubpanel = null;
    }
    const {
      draggingTaskId: Z,
      dragOverColIndex: ct,
      dragOverTaskId: Mt,
      dragAfterTask: Ht,
      isDragPreview: kt,
      previewTasks: Ft,
      onTaskDragStart: oe,
      onTaskDragEnd: Yt,
      onColDragOver: U,
      onColDragLeave: a,
      onTaskDragOver: f,
      onTaskDrop: X,
      onColDrop: St
    } = wn({
      state: r,
      isActive: () => q.active,
      editingTaskId: () => h.value,
      closePopovers: at,
      moveTask: (o, e, s) => J.moveTask(o, e, s),
      dropLabel: (o, e) => {
        o.labels || (o.labels = []), o.labels.includes(e) || (o.labels.push(e), ot.getToken() && ot.updateTask(o.id, { labels: o.labels }));
      }
    });
    function Ot(o, e) {
      J.dispatch("toggle-task", { task: o, group: e });
    }
    function ve(o, e) {
      if (o.completed) return;
      const s = e.target;
      s && s.closest("button,input,textarea,select,a") || ge(o);
    }
    function ge(o) {
      r.movingTaskId !== o.id && (h.value = o.id, L.value = o.content, It(() => {
        y.value && (y.value.focus(), y.value.select());
      }));
    }
    function ne(o, e) {
      if (h.value !== o.id) return;
      const s = L.value.trim();
      h.value = null, e && s && s !== o.content && (o.content = s, J.dispatch("update-task-title", {
        taskId: o.id,
        content: s,
        task: o,
        newContent: s
      }));
    }
    function be(o, e) {
      o.key === "Enter" ? o.shiftKey || (o.preventDefault(), ne(e, !0)) : o.key === "Escape" && (o.preventDefault(), o.stopPropagation(), ne(e, !1));
    }
    function ke(o, e) {
      e.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || lt.openTask(o.id, o);
    }
    function ye(o, e, s) {
      const M = s.currentTarget;
      S.value = et(o, e), E.value = "", K.value = !1, It(() => {
        M.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function Gt() {
      Et.value || At();
    }
    function At() {
      S.value = null, E.value = "", K.value = !1;
      for (const o of z.value)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
      z.value = [];
    }
    const Et = P(!1), Xt = /* @__PURE__ */ new WeakMap();
    function re(o) {
      const e = o.description || o._taskRaw?.description || "", s = Xt.get(o);
      if (s && s.source === e) return s;
      const M = e.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: e,
        thumb: M,
        text: e.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return Xt.set(o, c), c;
    }
    function T(o) {
      return re(o).text;
    }
    function g(o) {
      return re(o).thumb;
    }
    function _(o, e) {
      o && Le.open(o, e?.content || "任务照片");
    }
    async function pt(o) {
      if (!q.active || Et.value) return;
      const e = [...z.value];
      let M = E.value.trim() || e[0]?.name || "";
      if (!M) return;
      let c, tt, Y;
      if (B.value && !K.value) {
        const Rt = B.value;
        M = Rt.cleanTitle || M, c = Rt.date, tt = Rt.label + (Rt.time ? ` ${Rt.time}` : ""), Y = Rt.time ? `${Rt.date} ${Rt.time}` : Rt.date;
      }
      const xt = S.value, Nt = E.value, Ct = r.view, Te = o.projectId || Ct === "projects" && r.activeProjectId || void 0, De = o.sectionId !== void 0 ? o.sectionId : void 0;
      Et.value = !0;
      try {
        await yo(async () => {
          for (const wt of e)
            if (!wt.uploadedUrl) {
              wt.uploading = !0;
              try {
                const xe = await ot.uploadFile(wt.file, wt.name);
                wt.uploadedUrl = xe.file_url;
              } catch {
                wt.uploadedUrl = wt.previewUrl;
              } finally {
                wt.uploading = !1;
              }
            }
          await J.dispatch("add-task-submit", {
            content: M,
            view: Ct,
            group: o,
            projectId: Te,
            sectionId: De,
            dueDate: c,
            dueText: tt,
            dueString: Y,
            attachments: e.map((wt) => ({ file_url: wt.uploadedUrl, file_name: wt.name, file_type: wt.file.type || "image/png" }))
          }) && xt === S.value && Nt === E.value && e.length === z.value.length && e.every((wt, xe) => wt === z.value[xe]) && At();
        });
      } catch {
        r.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        Et.value = !1;
      }
    }
    function Dt(o, e) {
      o.key === "Enter" && !o.shiftKey ? (o.preventDefault(), pt(e)) : o.key === "Escape" && (o.preventDefault(), Gt());
    }
    function ft() {
      const o = O.value.trim();
      if (!o) return;
      const s = r.columns.find((M) => M.projectId)?.projectId || r.activeProjectId || void 0;
      J.dispatch("add-section-submit", { name: o, projectId: s }), zt();
    }
    function zt() {
      r.addingSection = !1, O.value = "";
    }
    function oo(o, e, s) {
      if (k.isOpen && k.col === o) {
        k.isOpen = !1;
        return;
      }
      v.isOpen = !1;
      const c = s.currentTarget.getBoundingClientRect(), Y = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), xt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      k.col = o, k.x = Y, k.y = xt, k.canMoveLeft = e > 0 && !!r.columns[e - 1]?.sectionId, k.canMoveRight = e < r.columns.length - 1 && !!r.columns[e + 1]?.sectionId, k.isOpen = !0;
    }
    function Pe(o, e) {
      k.isOpen = !1, J.dispatch("move-section", { sectionId: o.sectionId, direction: e });
    }
    function Me(o, e, s) {
      if (r.movingTaskId === o.id || o.completed) return;
      k.isOpen = !1;
      const M = 236, c = 340, tt = Math.max(8, Math.min(window.innerWidth - M - 8, s.clientX)), Y = Math.max(8, Math.min(window.innerHeight - c - 8, s.clientY));
      if (v.task = o, v.col = e, v.x = tt, v.y = Y, v.activeSubpanel = null, v.descText = o.description || "", v.isSavingDesc = !1, v.newLabelText = "", v.customRecurText = "", o.dueDate) {
        const Ct = /* @__PURE__ */ new Date(`${o.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(Ct.getTime()) && (v.calYear = Ct.getFullYear(), v.calMonth = Ct.getMonth());
      } else {
        const Ct = /* @__PURE__ */ new Date();
        v.calYear = Ct.getFullYear(), v.calMonth = Ct.getMonth();
      }
      const xt = 252, Nt = tt + M + xt > window.innerWidth - 8;
      v.flyoutOpenLeft = Nt, v.flyoutStyle = {
        left: Nt ? `${-xt - 6}px` : `${M + 6}px`,
        top: "0px"
      }, v.isOpen = !0;
    }
    function de(o) {
      v.activeSubpanel === o ? v.activeSubpanel = null : (v.activeSubpanel = o, o === "desc" ? It(() => {
        ht.value?.focus(), ht.value?.select();
      }) : o === "labels" && It(() => {
        Tt.value?.focus();
      }));
    }
    function Oe(o) {
      return !!v.task?.labels?.includes(o);
    }
    function no(o) {
      if (!v.task) return;
      const e = v.task.id, s = [...v.task.labels || []], M = s.includes(o) ? s.filter((c) => c !== o) : [...s, o];
      v.task.labels = M, J.dispatch("update-task-labels", { taskId: e, labels: M });
    }
    function Ae() {
      if (!v.task) return;
      const o = v.newLabelText.trim();
      if (!o) return;
      v.newLabelText = "";
      const e = v.task.id, s = [...v.task.labels || []];
      s.includes(o) || (s.push(o), v.task.labels = s, J.dispatch("update-task-labels", { taskId: e, labels: s })), at();
    }
    function so(o) {
      return String(v.task?.dueString || "").toLowerCase().includes(o.toLowerCase());
    }
    function io(o, e) {
      if (!v.task) return;
      const s = v.task.id;
      J.dispatch("update-task-recurring", { taskId: s, rule: o, label: e }), at();
    }
    function Ee() {
      if (!v.task) return;
      const o = v.customRecurText.trim();
      if (!o) return;
      const e = v.task.id;
      J.dispatch("update-task-recurring", { taskId: e, rule: o, label: o }), at();
    }
    function ao() {
      if (!v.task) return;
      const o = v.task.id;
      J.dispatch("clear-task-recurring", { taskId: o }), at();
    }
    function lo(o) {
      if (!v.task) return;
      const e = v.task.id, s = mt.find((M) => M.id === o);
      v.task.customColorHex = s?.hex || "", J.dispatch("update-task-color", { taskId: e, colorId: o }), at();
    }
    function ro(o) {
      if (!v.task) return;
      const e = v.task.id;
      J.dispatch("move-task-to-project", {
        taskId: e,
        targetProjectId: o.id,
        targetProjectName: o.name
      }), at();
    }
    function uo() {
      if (!v.task) return;
      const o = v.task, e = { x: v.x, y: v.y };
      at();
      const s = qt(e, 380, 220);
      D.x = s.x, D.y = s.y, o.isRecurring ? (D.title = "删除重复任务确认", D.icon = "⚠️", D.danger = !0, D.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", D.message = `任务内容：${o.content}
循环规则：${o.dueString || "循环任务"}`, D.confirmText = "删除重复任务", D.actionType = "delete-task", D.payload = { taskId: o.id, isRecurring: !0 }, D.isOpen = !0) : (D.title = "删除任务确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要删除任务「${o.content}」吗？`, D.message = "此操作不可撤销。", D.confirmText = "确认删除", D.actionType = "delete-task", D.payload = { taskId: o.id, isRecurring: !1 }, D.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(o, e, s) {
      Me(o, e, s);
    });
    function qt(o, e = 380, s = 220) {
      let M = null;
      if (o instanceof HTMLElement)
        M = o.getBoundingClientRect();
      else if (o && "currentTarget" in o && o.currentTarget instanceof HTMLElement)
        M = o.currentTarget.getBoundingClientRect();
      else if (o && "target" in o && o.target instanceof HTMLElement)
        M = (o.target.closest("button") || o.target).getBoundingClientRect();
      else if (o && "x" in o && "y" in o && typeof o.x == "number" && typeof o.y == "number") {
        const c = Math.max(16, Math.min(window.innerWidth - e - 16, o.x)), tt = Math.max(16, Math.min(window.innerHeight - s - 16, o.y + 10));
        return { x: c, y: tt };
      }
      if (M) {
        let c = M.right - e;
        c < 16 && (c = Math.max(16, M.left)), c = Math.max(16, Math.min(window.innerWidth - e - 16, c));
        let tt = M.bottom + 8;
        return tt + s > window.innerHeight - 16 && M.top > s + 16 && (tt = M.top - s - 8), tt = Math.max(16, Math.min(window.innerHeight - s - 16, tt)), { x: c, y: tt };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - e) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - s) / 3))
      };
    }
    function je(o, e) {
      if (e.button !== 0 || e.target?.closest("button, input, textarea")) return;
      e.preventDefault();
      const s = e.clientX, M = e.clientY, c = o === "prompt" ? w : D, tt = c.x, Y = c.y, xt = (Ct) => {
        const Te = Ct.clientX - s, De = Ct.clientY - M;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, tt + Te)), c.y = Math.max(10, Math.min(window.innerHeight - 120, Y + De));
      }, Nt = () => {
        window.removeEventListener("pointermove", xt), window.removeEventListener("pointerup", Nt);
      };
      window.addEventListener("pointermove", xt), window.addEventListener("pointerup", Nt);
    }
    function We(o) {
      const e = qt(o, 380, 220);
      w.x = e.x, w.y = e.y, w.title = "新建项目", w.message = "请输入新项目名称：", w.value = "", w.placeholder = "项目名称…", w.confirmText = "创建", w.actionType = "create-project", w.payload = null, w.isOpen = !0, It(() => V.value?.focus());
    }
    function co(o, e) {
      const s = qt(e, 380, 220);
      w.x = s.x, w.y = s.y, w.title = "重命名项目", w.message = `正在重命名项目「${o.name}」：`, w.value = o.name, w.placeholder = "新项目名称…", w.confirmText = "保存", w.actionType = "rename-project", w.payload = { projectId: o.id }, w.isOpen = !0, It(() => {
        V.value?.focus(), V.value?.select();
      });
    }
    function po(o, e) {
      const s = e || { x: k.x, y: k.y };
      k.isOpen = !1;
      const M = qt(s, 380, 220);
      w.x = M.x, w.y = M.y, w.title = "重命名板块", w.message = `正在重命名板块「${o.title}」：`, w.value = o.title, w.placeholder = "新板块名称…", w.confirmText = "保存", w.actionType = "rename-section", w.payload = { sectionId: o.sectionId }, w.isOpen = !0, It(() => {
        V.value?.focus(), V.value?.select();
      });
    }
    function se() {
      w.isOpen = !1;
    }
    function Ue() {
      const o = w.value.trim();
      if (!o) return;
      const { actionType: e, payload: s } = w;
      se(), e === "create-project" ? J.dispatch("create-project-submit", o) : e === "rename-project" && s && "projectId" in s ? J.dispatch("rename-project-submit", { projectId: s.projectId, newName: o }) : e === "rename-section" && s && "sectionId" in s && J.dispatch("rename-section", { sectionId: s.sectionId, newName: o });
    }
    function mo(o, e) {
      const s = qt(e, 380, 240);
      D.x = s.x, D.y = s.y, D.title = "删除项目确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要彻底删除项目「${o.name}」吗？`, D.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！", D.confirmText = "彻底删除", D.actionType = "delete-project", D.payload = { projectId: o.id }, D.isOpen = !0;
    }
    function fo(o, e) {
      const s = e || { x: k.x, y: k.y };
      k.isOpen = !1;
      const M = qt(s, 380, 240);
      D.x = M.x, D.y = M.y, D.title = "删除板块确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要删除板块「${o.title}」吗？`, D.message = "板块内的任务将自动保留并移至默认收件箱。", D.confirmText = "删除板块", D.actionType = "delete-section", D.payload = { sectionId: o.sectionId }, D.isOpen = !0;
    }
    function ue() {
      D.isOpen = !1;
    }
    function vo() {
      const { actionType: o, payload: e } = D;
      ue(), o === "delete-project" && e && "projectId" in e ? J.dispatch("delete-project-submit", e.projectId) : o === "delete-section" && e && "sectionId" in e ? J.dispatch("delete-section", { sectionId: e.sectionId }) : o === "delete-task" && e && "taskId" in e && J.dispatch("delete-task-submit", e);
    }
    function go(o) {
      J.dispatch("switch-project", o);
    }
    function we(o) {
      o.key === "Escape" && (w.isOpen && se(), D.isOpen && ue(), v.isOpen && (v.isOpen = !1, v.activeSubpanel = null), k.isOpen && (k.isOpen = !1));
    }
    function he(o) {
      const e = o.target;
      e && (w.isOpen && G.value && !G.value.contains(e) && !e.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && se(), D.isOpen && it.value && !it.value.contains(e) && !e.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ue());
    }
    return rt(() => q.active, (o) => {
      document.removeEventListener("keydown", we), window.removeEventListener("pointerdown", he), o && (document.addEventListener("keydown", we), window.addEventListener("pointerdown", he));
    }, { immediate: !0, flush: "sync" }), Ut(() => {
      document.removeEventListener("keydown", we), window.removeEventListener("pointerdown", he), At();
    }), (o, e) => (l(), d("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: at
    }, [
      p(r).moveError && p(r).moveMessage ? (l(), d("p", xn, x(p(r).moveMessage), 1)) : I("", !0),
      p(r).emptyText && p(r).columns.length > 0 && !p(r).loading ? (l(), d("p", Cn, x(p(r).emptyText) + " 已显示的任务保留。", 1)) : I("", !0),
      p(r).loading && p(r).columns.length === 0 ? (l(), d("p", $n, "加载中…")) : p(r).emptyText && p(r).columns.length === 0 ? (l(), d("p", Sn, x(p(r).emptyText), 1)) : p(r).view === "projects" && p(r).projects.length === 0 ? (l(), d("div", In, [
        e[29] || (e[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        e[30] || (e[30] = t("h3", null, "暂无自定义项目", -1)),
        e[31] || (e[31] = t("p", null, "你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！", -1)),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: e[0] || (e[0] = (s) => We(s))
        }, "＋ 新建第一个项目")
      ])) : (l(), d(nt, { key: 5 }, [
        p(r).view === "projects" && p(r).projects.length ? (l(), d("div", Rn, [
          t("div", _n, [
            t("div", Ln, [
              (l(!0), d(nt, null, dt(p(r).projects, (s) => (l(), d("button", {
                key: s.id,
                type: "button",
                class: Q(["todoist-project-tab", { active: String(s.id) === String(p(r).activeProjectId) }]),
                onClick: (M) => go(s.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: gt({ background: s.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", Mn, x(s.name), 1)
              ], 10, Pn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: e[1] || (e[1] = (s) => We(s))
              }, "＋ 新建项目")
            ]),
            R.value ? (l(), d("div", On, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: "重命名项目",
                onClick: e[2] || (e[2] = (s) => co(R.value, s))
              }, [...e[32] || (e[32] = [
                t("span", { class: "action-icon" }, "✏️", -1),
                t("span", { class: "action-text" }, "重命名", -1)
              ])]),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: "删除项目",
                onClick: e[3] || (e[3] = (s) => mo(R.value, s))
              }, [...e[33] || (e[33] = [
                t("span", { class: "action-icon" }, "🗑️", -1),
                t("span", { class: "action-text" }, "删除项目", -1)
              ])])
            ])) : I("", !0)
          ])
        ])) : I("", !0),
        t("div", An, [
          (l(!0), d(nt, null, dt(p(r).columns, (s, M) => (l(), d("section", {
            key: s.sectionId || s.title || M,
            class: "todoist-board-column",
            "data-section-id": s.sectionId,
            "data-title": s.title,
            "data-column-index": M
          }, [
            t("header", jn, [
              t("h3", null, [
                Wt(x(s.title) + " ", 1),
                t("span", null, x(s.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: s.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: F((c) => oo(s, M, c), ["stop"])
              }, "•••", 8, Wn)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => ye(s, M, c)
            }, "＋ 添加任务", 8, Un),
            S.value === et(s, M) ? (l(), d("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: F((c) => pt(s), ["prevent"])
            }, [
              Lt(t("textarea", {
                "onUpdate:modelValue": e[4] || (e[4] = (c) => E.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (c) => Dt(c, s),
                onPaste: e[5] || (e[5] = (c) => N(c))
              }, null, 40, Bn), [
                [Vt, E.value]
              ]),
              B.value ? (l(), d("div", {
                key: 0,
                class: Q(["todoist-composer-date-hint", { "is-ignored": K.value }])
              }, [
                t("div", Hn, [
                  e[35] || (e[35] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", Nn, [
                    Wt(x(B.value.label) + x(B.value.time ? " " + B.value.time : "") + " ", 1),
                    t("span", Vn, "(" + x(B.value.formattedDate) + ")", 1)
                  ]),
                  K.value ? (l(), d("span", Fn, " (已忽略日期，按纯文本创建) ")) : (l(), d("span", Kn, [
                    e[34] || (e[34] = Wt(" 精简任务名: ", -1)),
                    t("strong", null, x(B.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: e[6] || (e[6] = (c) => K.value = !K.value)
                }, x(K.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : I("", !0),
              z.value.length > 0 ? (l(), d("div", Yn, [
                (l(!0), d(nt, null, dt(z.value, (c, tt) => (l(), d("div", {
                  key: tt,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Gn),
                  t("span", Xn, x(c.name), 1),
                  c.uploading ? (l(), d("span", qn, "上传中…")) : I("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (Y) => j(tt)
                  }, "×", 8, Qn)
                ]))), 128))
              ])) : I("", !0),
              t("div", Jn, [
                t("button", {
                  type: "button",
                  disabled: Et.value,
                  onClick: Gt
                }, "取消", 8, Zn),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: Et.value
                }, x(Et.value ? z.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, ts)
              ])
            ], 40, zn)) : I("", !0),
            Jt(Dn, {
              tasks: p(Ft)(s, M),
              "pinned-id": p(Z) || h.value,
              "hidden-id": p(ct) !== null ? p(Z) : null,
              "is-preview": p(kt),
              class: Q(["todoist-board-list", { "drag-over": p(ct) === M }]),
              "data-group-index": M,
              onDragover: F((c) => p(U)(c, M), ["prevent"]),
              onDragleave: (c) => p(a)(c, M),
              onDrop: F((c) => p(St)(c, s), ["prevent"])
            }, {
              empty: ae(() => [
                s.tasks.length === 0 && p(ct) !== M ? (l(), d("p", es, " 暂无任务 · 可拖到这里 ")) : I("", !0)
              ]),
              default: ae(({ task: c, index: tt }) => [
                t("article", {
                  class: Q(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: h.value === c.id,
                      "dragging-task": !p(kt)(c) && p(Z) === c.id,
                      "drop-before": p(Mt) === c.id && !p(Ht),
                      "drop-after": p(Mt) === c.id && p(Ht),
                      "saving-position": p(r).movingTaskId === c.id,
                      "todoist-task-preview": p(kt)(c),
                      "drag-origin-hidden": p(Z) === c.id && !p(kt)(c) && p(ct) !== null
                    }
                  ]]),
                  style: gt(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": p(kt)(c) ? void 0 : c.id,
                  "aria-hidden": p(kt)(c) || void 0,
                  tabindex: p(kt)(c) ? -1 : 0,
                  title: bt(),
                  draggable: !p(kt)(c) && !c.completed && !p(r).loading && !p(r).movingTaskId && !p(r).moveNeedsRefresh && h.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (Y) => p(oe)(Y, c, s, tt),
                  onDragend: e[9] || (e[9] = //@ts-ignore
                  (...Y) => p(Yt) && p(Yt)(...Y)),
                  onDragover: F((Y) => p(f)(Y, c, s, tt), ["stop", "prevent"]),
                  onDrop: F((Y) => p(X)(Y, c, s, tt), ["stop", "prevent"]),
                  onDblclick: (Y) => ve(c, Y),
                  onClick: (Y) => ke(c, Y),
                  onContextmenu: F((Y) => Me(c, s, Y), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: Q(["todoist-board-check", { checked: c.completed }]),
                    disabled: p(kt)(c) || p(r).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: F((Y) => Ot(c, s), ["stop"])
                  }, null, 10, ns),
                  t("div", ss, [
                    p(r).movingTaskId === c.id ? (l(), d("span", is, "保存中")) : I("", !0),
                    m(c.id, c.description).length ? (l(), d("div", as, [
                      (l(!0), d(nt, null, dt(m(c.id, c.description), (Y) => (l(), d("button", {
                        key: Y.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + Y.fullName + " · 点击在插件内查看详情",
                        onClick: F((xt) => C(Y.fullName), ["stop"])
                      }, [
                        e[36] || (e[36] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", rs, x(Y.fullName), 1)
                      ], 8, ls))), 128))
                    ])) : I("", !0),
                    h.value === c.id ? Lt((l(), d("textarea", {
                      key: 2,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: y,
                      "onUpdate:modelValue": e[7] || (e[7] = (Y) => L.value = Y),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (Y) => be(Y, c),
                      onBlur: (Y) => ne(c, !0),
                      onClick: e[8] || (e[8] = F(() => {
                      }, ["stop"]))
                    }, null, 40, ds)), [
                      [Vt, L.value]
                    ]) : (l(), d("p", us, x(c.content || "未命名任务"), 1)),
                    T(c) ? (l(), d("p", cs, x(T(c)), 1)) : I("", !0),
                    ut(c) ? (l(), d("div", ps, [
                      c.startDate && !c.dueDate ? (l(), d("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + x(p($e)(c.startDate)) + " 起 ", 9, ms)) : c.startDate && c.dueDate ? (l(), d("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + x(p($e)(c.startDate)) + " ~ " + x(p($e)(c.dueDate)), 9, fs)) : c.dueText ? (l(), d("span", {
                        key: 2,
                        class: Q(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, x(c.isRecurring ? "↻ " : "▣ ") + x(c.dueText), 11, vs)) : I("", !0),
                      (l(!0), d(nt, null, dt((c.labels || []).slice(0, 3), (Y) => (l(), d("span", {
                        key: Y,
                        class: "todoist-board-label"
                      }, "◇ " + x(Y), 1))), 128)),
                      c.timedDeadlineText ? (l(), d("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + x(c.timedDeadlineText), 9, gs)) : I("", !0),
                      c.extraCountText ? (l(), d("span", bs, x(c.extraCountText), 1)) : I("", !0)
                    ])) : I("", !0),
                    g(c) ? (l(), d("div", {
                      key: 6,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: F((Y) => _(g(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: g(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, ys),
                      e[37] || (e[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, ks)) : I("", !0)
                  ])
                ], 46, os)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, En))), 128)),
          p(r).view === "inbox" || p(r).view === "projects" ? (l(), d("div", ws, [
            p(r).addingSection ? (l(), d("div", hs, [
              Lt(t("input", {
                "onUpdate:modelValue": e[11] || (e[11] = (s) => O.value = s),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  $t(F(ft, ["prevent"]), ["enter"]),
                  $t(zt, ["esc"])
                ]
              }, null, 40, Ts), [
                [Vt, O.value]
              ]),
              t("div", { class: "todoist-add-section-actions" }, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: ft
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: zt
                }, "取消")
              ])
            ])) : (l(), d("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: e[10] || (e[10] = (s) => p(r).addingSection = !0)
            }, [...e[38] || (e[38] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : I("", !0)
        ])
      ], 64)),
      k.isOpen && k.col ? (l(), d("div", {
        key: 6,
        class: "todoist-section-menu",
        style: gt({ left: k.x + "px", top: k.y + "px" }),
        onClick: e[16] || (e[16] = F(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: e[12] || (e[12] = (s) => po(k.col, s))
        }, [...e[39] || (e[39] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        k.col.sectionId ? (l(), d("div", Ds, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !k.canMoveLeft,
            title: "向左移动板块",
            onClick: e[13] || (e[13] = (s) => Pe(k.col, -1))
          }, "◀ 左移", 8, xs),
          e[40] || (e[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !k.canMoveRight,
            title: "向右移动板块",
            onClick: e[14] || (e[14] = (s) => Pe(k.col, 1))
          }, "右移 ▶", 8, Cs)
        ])) : I("", !0),
        k.col.sectionId ? (l(), d("div", $s)) : I("", !0),
        k.col.sectionId ? (l(), d("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: e[15] || (e[15] = (s) => fo(k.col, s))
        }, [...e[41] || (e[41] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : I("", !0)
      ], 4)) : I("", !0),
      v.isOpen && v.task ? (l(), d("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: gt({ left: v.x + "px", top: v.y + "px" }),
        role: "menu",
        onClick: e[23] || (e[23] = F(() => {
        }, ["stop"]))
      }, [
        t("div", Ss, [
          t("span", Is, x(v.task.content || "任务操作"), 1)
        ]),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "labels" }]),
          onClick: e[17] || (e[17] = (s) => de("labels"))
        }, [
          e[42] || (e[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          e[43] || (e[43] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", Rs, x(v.task.labels && v.task.labels.length ? `已选 ${v.task.labels.length}` : "无"), 1)
        ], 2),
        v.activeSubpanel === "labels" ? (l(), d("div", _s, [
          t("div", Ls, [
            Lt(t("input", {
              "onUpdate:modelValue": e[18] || (e[18] = (s) => v.newLabelText = s),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: $t(F(Ae, ["prevent"]), ["enter"])
            }, null, 40, Ps), [
              [Vt, v.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Ae
            }, "＋")
          ]),
          t("div", Ms, [
            (l(!0), d(nt, null, dt(W.value, (s) => (l(), d("button", {
              key: s,
              type: "button",
              class: Q(["todoist-label-chip", { selected: Oe(s) }]),
              onClick: (M) => no(s)
            }, [
              t("span", null, "◇ " + x(s), 1),
              Oe(s) ? (l(), d("span", As, "✓")) : I("", !0)
            ], 10, Os))), 128))
          ])
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "recur" }]),
          onClick: e[19] || (e[19] = (s) => de("recur"))
        }, [
          e[44] || (e[44] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          e[45] || (e[45] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: gt(v.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, x(v.task.isRecurring ? v.task.dueString || "循环" : "无"), 5)
        ], 2),
        v.activeSubpanel === "recur" ? (l(), d("div", Es, [
          t("div", js, [
            (l(), d(nt, null, dt($, (s) => t("button", {
              key: s.rule,
              type: "button",
              class: Q(["todoist-recur-chip", { selected: so(s.rule) }]),
              onClick: (M) => io(s.rule, s.label)
            }, [
              t("span", null, x(s.icon), 1),
              t("span", null, x(s.label), 1)
            ], 10, Ws)), 64))
          ]),
          t("div", Us, [
            Lt(t("input", {
              "onUpdate:modelValue": e[20] || (e[20] = (s) => v.customRecurText = s),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: $t(F(Ee, ["prevent"]), ["enter"])
            }, null, 40, zs), [
              [Vt, v.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Ee
            }, "确定")
          ]),
          v.task.isRecurring ? (l(), d("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: ao
          }, "❌ 清除循环（转为单次任务）")) : I("", !0)
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "color" }]),
          onClick: e[21] || (e[21] = (s) => de("color"))
        }, [
          e[46] || (e[46] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          e[47] || (e[47] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", Bs, [
            H.value.id === "none" ? (l(), d("span", Hs, "⊘")) : (l(), d("span", {
              key: 1,
              class: "todoist-color-dot",
              style: gt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: H.value.hex
              })
            }, null, 4)),
            Wt(" " + x(H.value.name), 1)
          ])
        ], 2),
        v.activeSubpanel === "color" ? (l(), d("div", Ns, [
          t("div", Vs, [
            (l(), d(nt, null, dt(mt, (s) => t("button", {
              key: s.id,
              type: "button",
              class: Q(["todoist-color-swatch", { selected: H.value.id === s.id }]),
              title: s.name,
              onClick: (M) => lo(s.id)
            }, [
              t("span", {
                class: Q(["todoist-color-dot", { none: s.id === "none" }]),
                style: gt(s.id !== "none" ? { background: s.hex } : {})
              }, x(s.id === "none" ? H.value.id === "none" ? "✓" : "⊘" : H.value.id === s.id ? "✓" : ""), 7),
              t("span", Fs, x(s.name), 1)
            ], 10, Ks)), 64))
          ])
        ])) : I("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: v.activeSubpanel === "project" }]),
          onClick: e[22] || (e[22] = (s) => de("project"))
        }, [...e[48] || (e[48] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        v.activeSubpanel === "project" ? (l(), d("div", {
          key: 3,
          class: Q(["todoist-project-flyout", { "open-left": v.flyoutOpenLeft }]),
          style: gt(v.flyoutStyle)
        }, [
          (l(!0), d(nt, null, dt(p(r).projects, (s) => (l(), d("button", {
            key: s.id,
            type: "button",
            class: Q(["todoist-project-flyout-item", { active: String(s.id) === A.value }]),
            disabled: !!p(r).movingTaskId || String(s.id) === A.value,
            onClick: (M) => ro(s)
          }, [
            e[49] || (e[49] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Gs, x(s.name), 1),
            String(s.id) === A.value ? (l(), d("span", Xs, "当前")) : I("", !0)
          ], 10, Ys))), 128))
        ], 6)) : I("", !0),
        e[51] || (e[51] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: uo
        }, [
          e[50] || (e[50] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", qs, x(v.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : I("", !0),
      w.isOpen && p(q).active ? (l(), d("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: G,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: gt({
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
          onPointerdown: e[24] || (e[24] = (s) => je("prompt", s))
        }, [
          e[52] || (e[52] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", Qs, x(w.title), 1),
          e[53] || (e[53] = t("span", {
            class: "todoist-dialog-drag-hint",
            title: "按住可拖动位置"
          }, "⋮⋮", -1))
        ], 32),
        t("div", Js, [
          w.message ? (l(), d("p", Zs, x(w.message), 1)) : I("", !0),
          Lt(t("input", {
            ref_key: "promptInputRef",
            ref: V,
            "onUpdate:modelValue": e[25] || (e[25] = (s) => w.value = s),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: w.placeholder,
            onKeydown: [
              $t(F(Ue, ["prevent"]), ["enter"]),
              $t(F(se, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, ti), [
            [Vt, w.value]
          ])
        ]),
        t("div", ei, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: se
          }, "取消"),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: Ue
          }, x(w.confirmText || "确定"), 1)
        ])
      ], 4)) : I("", !0),
      D.isOpen && p(q).active ? (l(), d("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: it,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: gt({
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
          onPointerdown: e[27] || (e[27] = (s) => je("confirm", s))
        }, [
          t("span", oi, x(D.icon || "⚠️"), 1),
          t("h3", ni, x(D.title), 1),
          e[54] || (e[54] = t("span", {
            class: "todoist-dialog-drag-hint",
            title: "按住可拖动位置"
          }, "⋮⋮", -1))
        ], 32),
        t("div", si, [
          D.danger ? (l(), d("div", ii, [
            t("div", ai, x(D.alertText), 1)
          ])) : I("", !0),
          t("p", li, x(D.message), 1)
        ]),
        t("div", ri, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ue
          }, "取消"),
          t("button", {
            type: "button",
            class: Q(["todoist-dialog-btn", D.danger ? "danger" : "primary"]),
            onClick: vo
          }, x(D.confirmText || "确定"), 3)
        ])
      ], 4)) : I("", !0)
    ]));
  }
}), ui = /* @__PURE__ */ ee(di, [["__scopeId", "data-v-f0aa6ba8"]]), ci = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, pi = { class: "reminder-shortcuts" }, mi = ["disabled"], fi = { class: "reminder-preview" }, vi = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, gi = ["disabled"], bi = ["disabled"], ki = ["disabled"], yi = /* @__PURE__ */ Bt({
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
    const u = i, m = n, C = u.value || (u.taskDate ? u.taskDate + "T" + (u.taskTime || "09:00") : ""), r = P(C.slice(0, 10)), O = P(C.slice(11, 16)), S = P(!1), E = P(""), K = P(!0), B = st(() => r.value && O.value ? (/* @__PURE__ */ new Date(r.value + "T" + O.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function z(j) {
      if (S.value) return;
      const h = /* @__PURE__ */ new Date();
      j === "tomorrow" ? (h.setDate(h.getDate() + 1), h.setHours(9, 0, 0, 0)) : h.setTime(h.getTime() + j * 6e4), r.value = `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`, O.value = `${String(h.getHours()).padStart(2, "0")}:${String(h.getMinutes()).padStart(2, "0")}`, E.value = "", K.value = !0;
    }
    async function N(j) {
      if (!(S.value || q.pendingWrites)) {
        if (j && (!Number.isFinite(Date.parse(j)) || Date.parse(j) <= Date.now())) {
          E.value = "请选择未来的提醒时间。";
          return;
        }
        if (b.taskId === u.taskId) {
          S.value = !0, E.value = "";
          try {
            if (await lt.setReminder(j), b.taskId !== u.taskId) return;
            b.error ? E.value = b.error : b.reminderTime === j && m("close");
          } finally {
            S.value = !1;
          }
        }
      }
    }
    return (j, h) => (l(), Pt(Re, {
      anchor: i.anchor,
      onClose: h[9] || (h[9] = (L) => m("close"))
    }, {
      default: ae(() => [
        t("section", ci, [
          h[11] || (h[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", pi, [
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
            Jt(_e, {
              modelValue: r.value,
              "onUpdate:modelValue": h[3] || (h[3] = (L) => r.value = L),
              "time-value": O.value,
              "onUpdate:timeValue": h[4] || (h[4] = (L) => O.value = L),
              embedded: "",
              onTimeValidity: h[5] || (h[5] = (L) => K.value = L)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, mi),
          t("div", fi, x(B.value || "选择提醒的日期和时间"), 1),
          h[12] || (h[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          E.value ? (l(), d("p", vi, x(E.value), 1)) : I("", !0),
          t("footer", null, [
            i.value ? (l(), d("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: S.value || !!p(q).pendingWrites,
              onClick: h[6] || (h[6] = (L) => N(""))
            }, "移除提醒", 8, gi)) : I("", !0),
            t("button", {
              type: "button",
              disabled: S.value,
              onClick: h[7] || (h[7] = (L) => m("close"))
            }, "取消", 8, bi),
            t("button", {
              type: "button",
              class: "save",
              disabled: S.value || !!p(q).pendingWrites || !r.value || !O.value || !K.value,
              onClick: h[8] || (h[8] = (L) => N(r.value + "T" + O.value))
            }, x(S.value ? "保存中…" : "设置提醒"), 9, ki)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), wi = /* @__PURE__ */ ee(yi, [["__scopeId", "data-v-da9e3ddd"]]), hi = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, Ti = { class: "inspector-main-col" }, Di = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, xi = {
  key: 1,
  class: "inspector-repo-badges"
}, Ci = ["title", "onClick"], $i = { class: "repo-badge-name" }, Si = { class: "inspector-section inspector-title-section" }, Ii = { class: "task-title-row" }, Ri = {
  key: 0,
  class: "check-mark"
}, _i = ["value", "disabled"], Li = ["value", "disabled"], Pi = ["onKeydown"], Mi = {
  key: 0,
  class: "desc-placeholder-btn"
}, Oi = ["innerHTML"], Ai = {
  key: 2,
  role: "status"
}, Ei = {
  key: 3,
  class: "attached-img-grid"
}, ji = ["onClick"], Wi = ["src", "alt"], Ui = { class: "attached-img-info" }, zi = ["onClick"], Bi = { class: "inspector-section inspector-subtasks-section" }, Hi = {
  key: 0,
  class: "subtasks-list"
}, Ni = ["onClick"], Vi = {
  key: 0,
  class: "check-tick"
}, Ki = { class: "subtask-content-text" }, Fi = ["onClick"], Yi = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Gi = ["value"], Xi = { class: "subtask-actions" }, qi = { class: "inspector-section inspector-comments-section" }, Qi = { class: "comment-input-bar" }, Ji = { class: "comment-input-wrap" }, Zi = ["value", "disabled"], ta = ["disabled"], ea = {
  key: 0,
  class: "comments-list"
}, oa = { class: "comment-item-content" }, na = { class: "comment-item-header" }, sa = { class: "comment-time" }, ia = { class: "comment-text" }, aa = {
  key: 0,
  class: "comment-attached-thumb"
}, la = ["src", "onClick"], ra = { class: "inspector-side-col" }, da = { class: "side-prop-group date-picker-anchor" }, ua = { class: "row-text" }, ca = { class: "side-prop-group date-picker-anchor" }, pa = { class: "row-text" }, ma = { class: "side-prop-group" }, fa = { class: "row-text" }, va = { class: "inspector-menu" }, ga = ["disabled", "onClick"], ba = { key: 0 }, ka = { class: "side-prop-group" }, ya = { class: "row-text" }, wa = { class: "inspector-menu" }, ha = ["onKeydown"], Ta = { key: 0 }, Da = {
  key: 1,
  role: "alert"
}, xa = { class: "label-options-list" }, Ca = ["checked", "disabled", "onChange"], $a = ["disabled"], Sa = { key: 3 }, Ia = { class: "side-prop-group" }, Ra = { class: "row-text" }, _a = /* @__PURE__ */ Bt({
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
    const u = i, m = n, C = P(!1), r = P(null), O = P(null);
    let S;
    te(() => {
      let U = -1;
      S = new ResizeObserver((a) => {
        const f = a[0]?.contentRect.width;
        f !== U && (U = f, B(O.value), B(r.value));
      }), O.value?.parentElement && S.observe(O.value.parentElement);
    }), Ut(() => S?.disconnect());
    const E = st(() => {
      if (!u.editDescription) return "";
      const U = u.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), a = document.createElement("template");
      a.innerHTML = Oo.renderMarkdown(U);
      const f = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const X of Array.from(a.content.querySelectorAll("*"))) {
        if (!f.has(X.tagName)) {
          X.replaceWith(document.createTextNode(X.textContent || ""));
          continue;
        }
        const St = X.tagName === "A" ? X.getAttribute("href") : null;
        for (const Ot of Array.from(X.attributes)) X.removeAttribute(Ot.name);
        St && /^(https?:\/\/|mailto:)/i.test(St) && (X.setAttribute("href", St), X.setAttribute("target", "_blank"), X.setAttribute("rel", "noopener noreferrer"));
      }
      return a.innerHTML;
    });
    function K() {
      C.value = !0, It(() => {
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
    function j() {
      m("saveTitleAndDesc"), C.value = !1;
    }
    const h = P(!1), L = P(!1), y = P(null), k = P(null), w = P(!1), V = P(!1), G = P(!1), D = P(""), it = P(null), v = P(null), ht = P(null), Tt = P([]), mt = P(!1), $ = P("");
    let A;
    rt(() => [u.state.taskId, V.value], async (U, a, f) => {
      if (A?.abort(), !V.value) return;
      const X = new AbortController();
      A = X, f(() => X.abort()), Tt.value = [], mt.value = !0, $.value = "";
      try {
        const St = await ot.getLabels(X.signal);
        X.signal.aborted || (Tt.value = St.map((Ot) => Ot.name));
      } catch {
        X.signal.aborted || ($.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        X.signal.aborted || (mt.value = !1);
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
    const bt = st(() => {
      const U = /* @__PURE__ */ new Set([...Tt.value, ...u.availableLabels || []]);
      for (const a of u.state.labels || []) U.add(a);
      return Array.from(U);
    }), ut = st(() => {
      const U = D.value.trim().toLowerCase();
      return U ? bt.value.filter((a) => a.toLowerCase().includes(U)) : bt.value;
    });
    function at() {
      const U = D.value.trim();
      U && (m("createLabel", U), D.value = "");
    }
    function Z(U, a) {
      Le.open(U, a);
    }
    const ct = P(0);
    function Mt() {
      ct.value++;
    }
    te(() => {
      window.addEventListener("storage", Mt), window.addEventListener("todoist-repository-links-changed", Mt);
    }), Ut(() => {
      window.removeEventListener("storage", Mt), window.removeEventListener("todoist-repository-links-changed", Mt);
    });
    const Ht = st(() => (ct.value, Ze(u.state.taskId, u.editDescription)));
    function kt(U) {
      to.open(U);
    }
    function Ft(U, a) {
      if (!U) return "";
      try {
        const f = U.split("-"), X = parseInt(f[1], 10), St = parseInt(f[2], 10), Ot = a ? ` ${a}` : "";
        return `${X}月${St}日${Ot}`;
      } catch {
        return U;
      }
    }
    function oe(U) {
      if (!U) return "";
      try {
        const a = new Date(U);
        return `${a.getMonth() + 1}月${a.getDate()}日 ${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    function Yt(U) {
      if (!U) return "刚刚";
      try {
        const a = new Date(U);
        return `${a.getMonth() + 1}月${a.getDate()}日 ${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    return (U, a) => i.state.isOpen ? (l(), d("div", hi, [
      t("main", Ti, [
        i.state.error ? (l(), d("p", Di, x(i.state.error), 1)) : I("", !0),
        Ht.value.length ? (l(), d("div", xi, [
          (l(!0), d(nt, null, dt(Ht.value, (f) => (l(), d("button", {
            key: f.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: "关联 GitHub 仓库：" + f.fullName + " · 点击在插件内查看详情",
            onClick: (X) => kt(f.fullName)
          }, [
            a[38] || (a[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", $i, x(f.fullName), 1),
            a[39] || (a[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, Ci))), 128))
        ])) : I("", !0),
        t("section", Si, [
          t("div", Ii, [
            t("button", {
              type: "button",
              class: Q(["task-complete-circle-btn", { completed: i.isTaskCompleted }]),
              title: "标记完成/撤销",
              onClick: a[0] || (a[0] = (f) => m("toggleComplete"))
            }, [
              i.isTaskCompleted ? (l(), d("span", Ri, "✓")) : I("", !0)
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
              onKeydown: a[4] || (a[4] = $t(F((f) => m("saveTitleAndDesc", f), ["prevent"]), ["enter"]))
            }, null, 42, _i)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: a[7] || (a[7] = F((f) => m("dragover"), ["prevent"])),
          onDragleave: a[8] || (a[8] = F((f) => m("dragleave"), ["prevent"])),
          onDrop: a[9] || (a[9] = F((f) => m("dropImage", f), ["prevent"]))
        }, [
          C.value ? (l(), d("textarea", {
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
            onBlur: j,
            onPaste: a[6] || (a[6] = (f) => m("descPaste", f))
          }, null, 40, Li)) : (l(), d("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: K,
            onKeydown: $t(F(K, ["prevent"]), ["enter"])
          }, [
            i.editDescription ? (l(), d("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: E.value
            }, null, 8, Oi)) : (l(), d("span", Mi, "≡ 描述"))
          ], 40, Pi)),
          i.isUploadingImg ? (l(), d("small", Ai, "图片上传中…")) : I("", !0),
          i.attachedImages.length ? (l(), d("div", Ei, [
            (l(!0), d(nt, null, dt(i.attachedImages, (f) => (l(), d("div", {
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
                }, null, 8, Wi)
              ], 8, ji),
              t("div", Ui, [
                t("span", null, x(f.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (X) => m("removeAttachedImage", f.url)
                }, "×", 8, zi)
              ])
            ]))), 128))
          ])) : I("", !0)
        ], 32),
        t("section", Bi, [
          i.subtasks.length > 0 ? (l(), d("div", Hi, [
            (l(!0), d(nt, null, dt(i.subtasks, (f) => (l(), d("div", {
              key: f.id,
              class: Q(["subtask-row-item", { done: f.completed }])
            }, [
              t("button", {
                type: "button",
                class: Q(["subtask-check-circle", { checked: f.completed }]),
                onClick: (X) => m("toggleSubtask", f.id)
              }, [
                f.completed ? (l(), d("span", Vi, "✓")) : I("", !0)
              ], 10, Ni),
              t("span", Ki, x(f.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: "删除子任务",
                onClick: (X) => m("removeSubtask", f.id)
              }, "×", 8, Fi)
            ], 2))), 128))
          ])) : I("", !0),
          i.isAddingSubtask ? (l(), d("div", Yi, [
            t("input", {
              value: i.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: "输入子任务并回车…",
              onInput: a[10] || (a[10] = (f) => m("update:newSubtaskText", f.target.value)),
              onKeydown: [
                a[11] || (a[11] = $t(F((f) => m("confirmAddSubtask"), ["prevent"]), ["enter"])),
                a[12] || (a[12] = $t((f) => m("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Gi),
            t("div", Xi, [
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
          ])) : (l(), d("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: a[15] || (a[15] = (f) => m("update:isAddingSubtask", !0))
          }, [...a[40] || (a[40] = [
            t("span", { class: "subtask-plus-icon" }, "＋", -1),
            Wt(" 添加子任务 ", -1)
          ])]))
        ]),
        (l(), Pt(Mo, {
          key: i.state.taskId,
          "task-id": i.state.taskId
        }, null, 8, ["task-id"])),
        t("section", qi, [
          t("div", Qi, [
            a[41] || (a[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Ji, [
              t("input", {
                value: i.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: "评论…",
                disabled: i.isSubmittingComment,
                onInput: a[16] || (a[16] = (f) => m("update:newCommentText", f.target.value)),
                onKeydown: a[17] || (a[17] = $t(F((f) => m("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Zi),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: "上传照片附件",
                onClick: a[18] || (a[18] = F((f) => m("triggerFileInput"), ["stop"]))
              }, "📎")
            ]),
            i.newCommentText.trim() ? (l(), d("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: i.isSubmittingComment,
              onClick: a[19] || (a[19] = (f) => m("submitComment"))
            }, "发送", 8, ta)) : I("", !0)
          ]),
          i.state.comments.length > 0 ? (l(), d("div", ea, [
            (l(!0), d(nt, null, dt(i.state.comments, (f) => (l(), d("div", {
              key: f.id,
              class: "comment-item"
            }, [
              a[43] || (a[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", oa, [
                t("div", na, [
                  a[42] || (a[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", sa, x(Yt(f.postedAt)), 1)
                ]),
                t("div", ia, x(f.content), 1),
                f.attachment?.url ? (l(), d("div", aa, [
                  t("img", {
                    src: f.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (X) => Z(f.attachment.url, f.attachment.name)
                  }, null, 8, la)
                ])) : I("", !0)
              ])
            ]))), 128))
          ])) : I("", !0)
        ])
      ]),
      t("aside", ra, [
        t("div", da, [
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
            t("span", ua, x(Ft(i.editStartDate, i.editStartTime) || "安排日期"), 1),
            i.editStartDate ? (l(), d("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: a[20] || (a[20] = F((f) => m("clearStartDate"), ["stop"]))
            }, "×")) : I("", !0)
          ], 2),
          h.value ? (l(), Pt(_e, {
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
        t("div", ca, [
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
            t("span", pa, x(Ft(i.editDueDate, i.editDueTime) || "设定截止"), 1),
            i.editDueDate ? (l(), d("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除截止时间",
              onClick: a[26] || (a[26] = F((f) => m("clearDueDate"), ["stop"]))
            }, "×")) : I("", !0)
          ], 2),
          L.value ? (l(), Pt(_e, {
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
        t("div", ma, [
          a[49] || (a[49] = t("span", { class: "side-prop-label" }, "优先级", -1)),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: ht,
            type: "button",
            class: "side-item-row",
            onClick: a[32] || (a[32] = (f) => w.value = !0)
          }, [
            t("span", {
              style: gt({ color: H(i.state.priority) })
            }, "⚑", 4),
            t("span", fa, "P" + x(5 - i.state.priority), 1),
            a[48] || (a[48] = t("span", null, "⌄", -1))
          ], 512),
          w.value ? (l(), Pt(Re, {
            key: 0,
            anchor: ht.value,
            onClose: a[33] || (a[33] = (f) => w.value = !1)
          }, {
            default: ae(() => [
              t("div", va, [
                (l(), d(nt, null, dt(W, (f) => t("button", {
                  key: f.level,
                  type: "button",
                  disabled: !!p(q).pendingWrites,
                  onClick: (X) => et(f.level)
                }, [
                  t("span", {
                    style: gt({ color: f.color })
                  }, "⚑", 4),
                  Wt(" " + x(f.name) + " ", 1),
                  i.state.priority === f.level ? (l(), d("span", ba, "✓")) : I("", !0)
                ], 8, ga)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : I("", !0)
        ]),
        t("div", ka, [
          a[51] || (a[51] = t("span", { class: "side-prop-label" }, "标签", -1)),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: it,
            type: "button",
            class: "side-item-row",
            onClick: a[34] || (a[34] = (f) => V.value = !0)
          }, [
            t("span", ya, x(i.state.labels.join("、") || "添加标签"), 1),
            a[50] || (a[50] = t("span", null, "＋", -1))
          ], 512),
          V.value ? (l(), Pt(Re, {
            key: 0,
            anchor: it.value,
            onClose: a[36] || (a[36] = (f) => V.value = !1)
          }, {
            default: ae(() => [
              t("div", wa, [
                Lt(t("input", {
                  "onUpdate:modelValue": a[35] || (a[35] = (f) => D.value = f),
                  placeholder: "搜索或新建标签",
                  "aria-label": "搜索标签",
                  onKeydown: $t(F(at, ["prevent"]), ["enter"])
                }, null, 40, ha), [
                  [Vt, D.value]
                ]),
                mt.value ? (l(), d("small", Ta, "读取标签中…")) : I("", !0),
                $.value ? (l(), d("p", Da, x($.value), 1)) : I("", !0),
                t("div", xa, [
                  (l(!0), d(nt, null, dt(ut.value, (f) => (l(), d("label", {
                    key: f,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + x(f), 1),
                    t("input", {
                      type: "checkbox",
                      checked: i.state.labels.includes(f),
                      disabled: !!p(q).pendingWrites,
                      onChange: (X) => m("toggleLabelSelect", f)
                    }, null, 40, Ca)
                  ]))), 128))
                ]),
                D.value.trim() && !bt.value.includes(D.value.trim()) ? (l(), d("button", {
                  key: 2,
                  type: "button",
                  disabled: !!p(q).pendingWrites,
                  onClick: at
                }, "＋ 创建“" + x(D.value.trim()) + "”", 9, $a)) : I("", !0),
                !mt.value && !ut.value.length && !D.value ? (l(), d("small", Sa, "暂无标签")) : I("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : I("", !0)
        ]),
        t("div", Ia, [
          a[53] || (a[53] = t("span", { class: "side-prop-label" }, [
            Wt("提醒 "),
            t("small", null, "本机")
          ], -1)),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: v,
            type: "button",
            class: "side-item-row",
            onClick: R
          }, [
            t("span", Ra, x(oe(i.state.reminderTime) || "添加提醒"), 1),
            a[52] || (a[52] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (l(), Pt(wi, {
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
}), La = /* @__PURE__ */ ee(_a, [["__scopeId", "data-v-3b157130"]]), Pa = { class: "inspector-title-row" }, Ma = ["title", "aria-label"], Oa = ["disabled"], Aa = ["href"], Ea = "todoistInspectorPositionV2", ja = /* @__PURE__ */ Bt({
  __name: "TodoistInspectorDrawer",
  setup(i) {
    const n = b, u = st(() => _t.get(n.taskId)), m = st(() => u.value?.status === "failed" ? "保存未确认" : u.value?.status === "saving" ? "正在保存…" : B.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), C = st(() => [
      m.value,
      u.value?.status === "failed" ? u.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: r,
      headerRef: O,
      initialStyle: S,
      onHeaderPointerDown: E,
      onResizePointerDown: K
    } = Qe({
      windowId: "todoist-inspector",
      storageKey: Ea,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => n.isOpen && q.active
    }), B = P(""), z = P(""), N = P(""), j = P(""), h = P(""), L = P(""), y = P(!1), k = P(!1), w = P(null), V = P(!1), G = P(""), D = P(""), it = P(!1), v = st(() => {
      const T = n.description || "", g = [], _ = T.split(`
`);
      let pt = 0;
      for (const Dt of _) {
        const ft = Dt.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        ft && g.push({
          id: `st_${pt++}`,
          completed: ft[1].toLowerCase() === "x",
          text: ft[2].trim()
        });
      }
      return g;
    }), ht = st(() => v.value.filter((T) => T.completed).length);
    function Tt(T) {
      const pt = (n.description || "").split(`
`).filter((zt) => !zt.match(/^\s*-\s*\[([ xX])\]/)), Dt = T.map((zt) => `- [${zt.completed ? "x" : " "}] ${zt.text}`), ft = [...pt, ...Dt].join(`
`).trim();
      z.value = ft.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), lt.saveTitleAndDesc(B.value, ft);
    }
    function mt() {
      if (!G.value.trim()) return;
      const T = [...v.value, {
        id: `st_${Date.now()}`,
        text: G.value.trim(),
        completed: !1
      }];
      G.value = "", V.value = !1, Tt(T);
    }
    function $(T) {
      const g = v.value.map((_) => _.id === T ? { ..._, completed: !_.completed } : _);
      Tt(g);
    }
    function A(T) {
      const g = v.value.filter((_) => _.id !== T);
      Tt(g);
    }
    const R = st(() => {
      for (const T of yt.columns || []) {
        const g = T.tasks.find((_) => _.id === n.taskId);
        if (g) return !!g.completed;
      }
      return !1;
    });
    async function W() {
      for (const T of yt.columns || []) {
        const g = T.tasks.find((_) => _.id === n.taskId);
        if (g) {
          const _ = !g.completed;
          g.completed = _, g._taskRaw && (g._taskRaw.checked = _);
          try {
            await ot.toggleTaskCompletion(g.id, _);
          } catch {
            g.completed = !_, g._taskRaw && (g._taskRaw.checked = !_), n.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function H(T) {
      lt.setPriority(T);
    }
    function et(T) {
      lt.toggleLabel(T);
    }
    function bt(T) {
      lt.toggleLabel(T);
    }
    async function ut(T) {
      T.trim() && (n.labels.includes(T.trim()) || await lt.createAndAttachLabel(T.trim()));
    }
    async function at() {
      if (!D.value.trim() || it.value) return;
      const T = D.value.trim();
      it.value = !0;
      try {
        await lt.addComment(T), D.value = "";
      } finally {
        it.value = !1;
      }
    }
    rt(() => n.title, (T) => {
      B.value = T || "";
    }, { immediate: !0 }), rt(() => n.description, (T) => {
      z.value = (T || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), rt(() => n.startDate, (T) => {
      N.value = T || "";
    }, { immediate: !0 }), rt(() => n.startTime, (T) => {
      j.value = T || "";
    }, { immediate: !0 }), rt(() => n.dueDate, (T) => {
      h.value = T || "";
    }, { immediate: !0 }), rt(() => n.dueTime, (T) => {
      L.value = T || "";
    }, { immediate: !0 });
    function Z() {
      const T = /* @__PURE__ */ new Date();
      return `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`;
    }
    function ct() {
      j.value && !N.value && (N.value = Z()), lt.setStartDateAndTime(N.value, j.value);
    }
    function Mt() {
      j.value = "", ct();
    }
    function Ht() {
      N.value = "", j.value = "", ct();
    }
    function kt() {
      L.value && !h.value && (h.value = Z()), lt.setDueDateAndTime(h.value, L.value);
    }
    function Ft() {
      L.value = "", kt();
    }
    function oe() {
      h.value = "", L.value = "", kt();
    }
    const Yt = st(() => {
      const T = [], g = /* @__PURE__ */ new Set(), _ = n.description || "", pt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Dt;
      for (; (Dt = pt.exec(_)) !== null; ) {
        const ft = Dt[2];
        g.add(ft), T.push({
          name: Dt[1] || "任务照片",
          url: ft
        });
      }
      for (const ft of n.commentAttachments || [])
        g.has(ft.url) || (g.add(ft.url), T.push(ft));
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
        return lt.saveTitleAndDesc(T.title, T.description, T.taskId);
    }
    function St(T) {
      T && "isComposing" in T && T.isComposing || (a = f(), lt.stageTitleDraft(a.taskId, a.title, a.description), clearTimeout(U), U = setTimeout(X, 800));
    }
    rt(() => n.taskId, () => X(), { flush: "sync" });
    function Ot() {
      X(), lt.close();
    }
    function ve(T) {
      T && "isComposing" in T && T.isComposing || X();
    }
    function ge() {
      a = f(), X();
    }
    function ne(T) {
      const g = Gt(T);
      g && (T.preventDefault(), T.stopPropagation(), At(g));
    }
    function be() {
      q.active && w.value?.click();
    }
    async function ke(T) {
      const g = T.target;
      if (!q.active) {
        g.value = "";
        return;
      }
      const _ = g.files?.[0];
      _ && await At(_), g.value = "";
    }
    async function ye(T) {
      k.value = !1;
      const g = T.dataTransfer?.files?.[0];
      g && (g.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(g.name)) && await At(g);
    }
    function Gt(T) {
      const g = T.clipboardData;
      if (!g) return null;
      if (g.files && g.files.length > 0)
        for (let _ = 0; _ < g.files.length; _++) {
          const pt = g.files[_];
          if (pt.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(pt.name))
            return pt;
        }
      if (g.items && g.items.length > 0)
        for (let _ = 0; _ < g.items.length; _++) {
          const pt = g.items[_];
          if (pt.type.includes("image")) {
            const Dt = pt.getAsFile();
            if (Dt) return Dt;
          }
        }
      return null;
    }
    async function At(T) {
      if (y.value || !q.active || !n.taskId) return;
      const g = n.taskId;
      y.value = !0;
      try {
        if (await X(), n.taskId !== g || !n.isOpen || !q.active) return;
        await lt.attachImageToTask(T);
      } catch (_) {
        n.taskId === g && (n.error = _ instanceof Error ? _.message : "上传失败");
      } finally {
        y.value = !1;
      }
    }
    function Et(T) {
      const g = Gt(T);
      g && (T.preventDefault(), At(g));
    }
    function Xt(T) {
      if (!n.isOpen || !q.active) return;
      const g = Gt(T);
      g && (T.preventDefault(), T.stopPropagation(), At(g));
    }
    rt(() => q.active, (T) => {
      window.removeEventListener("paste", Xt, { capture: !0 }), T && window.addEventListener("paste", Xt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Ut(() => {
      X(), window.removeEventListener("paste", Xt, { capture: !0 });
    });
    async function re(T) {
      const g = n.description || "", _ = T.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), pt = g.replace(new RegExp(`!\\[[^\\]]*\\]\\(${_}\\)`, "g"), "").trim();
      await lt.saveTitleAndDesc(n.title, pt);
    }
    return (T, g) => Lt((l(), d("aside", {
      ref_key: "panelRef",
      ref: r,
      class: "todoist-inspector-window",
      style: gt(p(S)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: Et
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: O,
        class: "inspector-header",
        onPointerdown: g[2] || (g[2] = (_) => p(E)(_))
      }, [
        t("div", Pa, [
          g[18] || (g[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          u.value ? (l(), d("div", {
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
            }, x(m.value), 9, Ma),
            u.value.status !== "saving" ? (l(), d("button", {
              key: 0,
              type: "button",
              disabled: p(n).saving || !B.value.trim(),
              onClick: F(ge, ["stop"])
            }, x(u.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Oa)) : I("", !0)
          ], 32)) : I("", !0),
          p(n).url ? (l(), d("a", {
            key: 1,
            href: p(n).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Aa)) : I("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: g[1] || (g[1] = F(() => {
          }, ["stop"])),
          onClick: F(Ot, ["stop"])
        }, "×", 32)
      ], 544),
      p(n).isOpen ? (l(), Pt(La, {
        key: p(n).taskId,
        state: p(n),
        "edit-title": B.value,
        "onUpdate:editTitle": g[3] || (g[3] = (_) => B.value = _),
        "edit-description": z.value,
        "onUpdate:editDescription": g[4] || (g[4] = (_) => z.value = _),
        "edit-start-date": N.value,
        "onUpdate:editStartDate": g[5] || (g[5] = (_) => N.value = _),
        "edit-start-time": j.value,
        "onUpdate:editStartTime": g[6] || (g[6] = (_) => j.value = _),
        "edit-due-date": h.value,
        "onUpdate:editDueDate": g[7] || (g[7] = (_) => h.value = _),
        "edit-due-time": L.value,
        "onUpdate:editDueTime": g[8] || (g[8] = (_) => L.value = _),
        "is-uploading-img": y.value,
        "is-drag-over": k.value,
        "is-task-completed": R.value,
        subtasks: v.value,
        "completed-subtasks-count": ht.value,
        "is-adding-subtask": V.value,
        "onUpdate:isAddingSubtask": g[9] || (g[9] = (_) => V.value = _),
        "new-subtask-text": G.value,
        "onUpdate:newSubtaskText": g[10] || (g[10] = (_) => G.value = _),
        "new-comment-text": D.value,
        "onUpdate:newCommentText": g[11] || (g[11] = (_) => D.value = _),
        "is-submitting-comment": it.value,
        "attached-images": Yt.value,
        "available-labels": p(yt).availableLabels || [],
        onScheduleDraftSave: St,
        onSaveTitleAndDesc: ve,
        onToggleComplete: W,
        onTriggerFileInput: be,
        onDragover: g[12] || (g[12] = (_) => k.value = !0),
        onDragleave: g[13] || (g[13] = (_) => k.value = !1),
        onDropImage: ye,
        onDescPaste: ne,
        onRemoveAttachedImage: re,
        onToggleSubtask: $,
        onRemoveSubtask: A,
        onConfirmAddSubtask: mt,
        onSubmitComment: at,
        onStartChange: ct,
        onClearStartDate: Ht,
        onClearStartTime: Mt,
        onDueChange: kt,
        onClearDueDate: oe,
        onClearDueTime: Ft,
        onSelectPriority: H,
        onToggleLabelSelect: et,
        onRemoveLabel: bt,
        onCreateLabel: ut
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : I("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: w,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ke
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: g[14] || (g[14] = (_) => p(K)(_, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: g[15] || (g[15] = (_) => p(K)(_, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: g[16] || (g[16] = (_) => p(K)(_, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: g[17] || (g[17] = (_) => p(K)(_, "w"))
      }, null, 32)
    ], 36)), [
      [Ie, p(n).isOpen]
    ]);
  }
}), Wa = /* @__PURE__ */ ee(ja, [["__scopeId", "data-v-35222deb"]]), Ua = { class: "vue-todoist-workspace-wrapper" }, za = { class: "todoist-head-title-wrap" }, Ba = { id: "todoist-workspace-title" }, Ha = {
  id: "todoist-view-tabs",
  class: "todoist-view-tabs",
  "aria-label": "Todoist 视图"
}, Na = {
  class: "muted small",
  role: "status"
}, Va = ["aria-expanded"], Ka = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Fa = { class: "todoist-workspace-cal-area" }, Ya = { class: "todoist-workspace-task-area" }, Ga = "todoistWorkspacePosition", dl = /* @__PURE__ */ Bt({
  __name: "TodoistWorkspace",
  setup(i) {
    const n = P(!1), u = bo(() => import("./TodoistAccountSettings-Duun8Ppa.js")), m = P(!1), C = P(!1), r = P(!document.hidden), O = P(!1), S = st(() => q.visible && r.value);
    q.session++, q.active = S.value, Je(
      () => S.value && !yt.movingTaskId,
      Zt,
      () => J.loadWorkspace(void 0, void 0, !0)
    );
    let E = !1;
    const K = P(null), B = $o;
    function z() {
      N.value && (N.value.style.removeProperty("width"), N.value.style.removeProperty("height"), N.value.style.removeProperty("left"), N.value.style.removeProperty("top"), N.value.style.removeProperty("right"), N.value.style.removeProperty("bottom"), N.value.style.removeProperty("margin"), N.value.style.removeProperty("transform"));
    }
    rt(() => q.visible, (R) => {
      R && (B.isOpen = !0, q.active = r.value, J.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: N,
      headerRef: j,
      initialStyle: h,
      stopInteractions: L,
      onHeaderPointerDown: y,
      onResizePointerDown: k,
      bringToFront: w
    } = Qe({
      windowId: "todoist",
      storageKey: Ga,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => S.value
    }), V = () => N.value;
    function G() {
      Zt(), xo(), Co(), lt.cancelReads(), L(), window.removeEventListener("keydown", v);
    }
    const D = wo(G);
    function it() {
      r.value = !document.hidden;
    }
    function v(R) {
      R.key === "Escape" && b.isOpen && (R.preventDefault(), R.stopPropagation(), lt.close());
    }
    rt(S, (R) => {
      q.active = R, R ? (window.addEventListener("keydown", v), E || (E = !0, J.loadWorkspace()), It(() => {
        S.value && w();
      })) : G();
    }, { flush: "sync" }), rt(m, (R) => {
      R && (C.value = !0);
    }), rt([S, n, Ke], ([R, W, H]) => {
      if (!(!R || !W || !H) && (Ke.value = null, So("todoist") === H.transition)) {
        if (q.pendingWrites || b.isOpen && b.taskId !== H.id) {
          Ro.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        b.isOpen && b.taskId === H.id || lt.openTask(H.id);
      }
    }, { flush: "post" }), te(() => {
      n.value = !0, O.value && It(z), ce.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: V }), document.addEventListener("visibilitychange", it), S.value && (window.addEventListener("keydown", v), E || (E = !0, J.loadWorkspace()), Ne.refresh());
    }), Ut(() => {
      ho(), D(), document.removeEventListener("visibilitychange", it), ce.unregister("todoist", V), lt.close(), Object.assign(b, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), J.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Ce.updateState({ title: "收件箱", isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ne.update([]);
    });
    function ht() {
      Ce.toggleCalendar();
    }
    function Tt() {
      Ce.refresh();
    }
    function mt() {
      J.updateState({ accountConfigured: !0 }), S.value && J.loadWorkspace(void 0, void 0, !0);
    }
    function $() {
      ce.minimize("todoist");
    }
    function A() {
      q.visible = !1, B.isOpen = !1, ce.close("todoist");
    }
    return (R, W) => (l(), d("div", Ua, [
      Lt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: N,
        class: "card wide todoist-workspace",
        style: gt(p(h)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: j,
          class: "todoist-workspace-head",
          onPointerdown: W[4] || (W[4] = (H) => p(y)(H))
        }, [
          t("div", za, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Ba, x(p(B).title), 1)
          ]),
          t("nav", Ha, [
            Jt(Ao)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: Q(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: p(B).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: ht
          }, " 📅 日历 ", 2),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Na, x(p(q).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: K,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": m.value,
            onClick: W[0] || (W[0] = F((H) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Va),
          C.value ? (l(), Pt(p(u), {
            key: 0,
            visible: S.value && m.value,
            anchor: K.value,
            onClose: W[1] || (W[1] = (H) => m.value = !1),
            onAccountSaved: mt
          }, null, 8, ["visible", "anchor"])) : I("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: "刷新",
            onClick: Tt
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
        p(yt).accountConfigured === !1 ? (l(), Pt(Io, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: W[5] || (W[5] = (H) => m.value = !0)
        })) : (l(), d("div", Ka, [
          Lt(t("div", Fa, [
            Jt(yn)
          ], 512), [
            [Ie, p(B).isCalendarOpen]
          ]),
          t("div", Ya, [
            Jt(ui)
          ])
        ])),
        Jt(Wa),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        O.value ? I("", !0) : (l(), d(nt, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: W[6] || (W[6] = (H) => p(k)(H, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: W[7] || (W[7] = (H) => p(k)(H, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: W[8] || (W[8] = (H) => p(k)(H, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: W[9] || (W[9] = (H) => p(k)(H, "w"))
          }, null, 32)
        ], 64))
      ], 4), [
        [Ie, p(q).visible]
      ])
    ]));
  }
});
export {
  dl as default
};
