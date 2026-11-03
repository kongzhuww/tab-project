import { d as Ht, o as r, g as c, F as it, h as t, u as e, C as J, t as p, r as Qt, z as Bt, w as pt, D as te, p as Ut, j as ut, k as X, i as _, b as M, N as Ze, I as Ne, B as bt, y as lt, G as Rt, n as Mt, q as Yt, s as Jt, f as le, m as St, e as Ot, A as Re, E as ho } from "./vendor-vue-FFI3kJnP.js";
import { a as wo, t as Q, w as To, o as Do, p as xo } from "./module-state-GmAjQSzX.js";
import { b as Ve, h as Ke, i as Zt, j as kt, e as tt, d as gt, c as Co, k as $o, t as Fe, g as Se, l as So, m as _o, n as Io } from "./calendar.service-DE6FKh8O.js";
import { u as to } from "./useWindowDraggable-CiS0PRk-.js";
import { w as pe, b as Ro } from "./window-manager.store-BD4IokhA.js";
import { t as m, _ as ee } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { A as Lo } from "./AccountSetupGuide-ZDGhjuNx.js";
import { i as Me } from "./image-viewer-store-CoGiUywc.js";
import { d as Po, n as Mo } from "./view-styles-D7nGbd1d.js";
import { t as at, d as Oo, s as Ao, b as me, g as Ye, f as _e, p as jo } from "./todoist.service-CDSsgWpW.js";
import { u as eo, g as oo, T as Eo } from "./TaskRepositoryLinks-BbtqkiUw.js";
import { g as Wo } from "./bili-video-links-DXpyplJq.js";
import { A as no } from "./search.service-DacqWPJU.js";
import { I as Le, T as Pe } from "./TodoistDatePickerPopover-DjMS5BKL.js";
import { m as Uo } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Xe } from "./task-navigation-C1h9ClKd.js";
const Bo = ["title"], zo = { class: "todoist-tab-text" }, Ho = ["title"], No = { class: "todoist-tab-text" }, Vo = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspaceTabs",
  setup(a) {
    return (s, u) => (r(), c(it, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: J({ on: e(Ke).view === "inbox" }),
        title: e(m)("todoist.inbox"),
        onClick: u[0] || (u[0] = (f) => e(Ve).switchView("inbox"))
      }, [
        u[2] || (u[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", zo, p(e(m)("todoist.inbox")), 1)
      ], 10, Bo),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: J({ on: e(Ke).view === "projects" }),
        title: e(m)("todoist.projects"),
        onClick: u[1] || (u[1] = (f) => e(Ve).switchView("projects"))
      }, [
        u[3] || (u[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", No, p(e(m)("todoist.projects")), 1)
      ], 10, Ho)
    ], 64));
  }
}), so = "todoist_reminder_v2:", Ko = "todoist_remind_";
async function Fo(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const s = so + a, u = await chrome.storage.local.get([s, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(u, s) ? u[s] || void 0 : u.todoist_reminders_map_v1?.[a];
}
async function Yo(a, s, u) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const f = new Date(s).getTime();
  if (s && (!Number.isFinite(f) || f <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (s && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const $ = so + a, x = Ko + a;
  await chrome.alarms.clear(x), await chrome.storage.local.set({ [$]: s ? { time: s, title: u } : null }), s && await chrome.alarms.create(x, { when: f });
}
const Pt = Qt(/* @__PURE__ */ new Map());
let Xo = 0;
function Ge(a, s, u, f = "editing") {
  const $ = ++Xo;
  return Pt.set(a, { revision: $, title: s, description: u, status: f, error: "" }), $;
}
const k = Qt({
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
let Ie = Promise.resolve(), fe = 0, qe = Promise.resolve();
const ve = /* @__PURE__ */ new Map();
let re = 0;
const Xt = /* @__PURE__ */ new Map();
function ae(a = !0) {
  a && re++;
  for (const s of Xt.values()) s.abort();
  Xt.clear(), k.loading = !1;
}
function Qe(a) {
  Xt.get(a)?.abort();
  const s = new AbortController();
  Xt.set(a, s);
  const u = re, f = k.taskId;
  return {
    signal: s.signal,
    current: () => !s.signal.aborted && u === re && k.isOpen && f === k.taskId && Xt.get(a) === s,
    finish: () => {
      Xt.get(a) === s && Xt.delete(a);
    }
  };
}
function Wt() {
  ae(!1);
  const a = k.taskId, s = re;
  return { taskId: a, current: () => k.isOpen && s === re && a === k.taskId };
}
function Go(a) {
  return new Promise((s) => {
    const u = new FileReader();
    u.onload = () => s(u.result || ""), u.onerror = () => s(""), u.readAsDataURL(a);
  });
}
function Je(a, s, u) {
  for (const f of kt.columns)
    for (const $ of f.tasks)
      String($.id) === a && ($.content = s, u !== void 0 && ($.description = u), $._taskRaw && ($._taskRaw.content = s, u !== void 0 && ($._taskRaw.description = u)));
  gt.updateTaskTitle(a, s);
}
const qo = {
  state: k,
  cancelReads: ae,
  stageTitleDraft(a, s, u) {
    a && (Ge(a, s, u), ae(!1), k.taskId === a && (k.title = s), Je(a, s, u));
  },
  async openTask(a, s) {
    if (!a) return;
    if (ae(), k.taskId = a, k.isOpen = !0, k.error = "", Object.assign(k, {
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
    }), s) {
      k.title = s.content || s.title || "", k.description = s.description || s.raw?.description || "", k.priority = s.priority || 1;
      const x = me(s.due?.datetime || s.due?.date || s.dueDate || "");
      k.dueDate = x.date, k.dueTime = x.time;
      const U = s.startDate || Ye(a, k.description), v = me(U);
      k.startDate = v.date, k.startTime = v.time, k.labels = [...s.labels || []], k.url = s.url || "";
    }
    const u = Pt.get(a);
    u && (k.title = u.title, k.description = u.description);
    const f = Qe("reminder");
    Fo(a).then((x) => {
      f.current() && (k.reminderTime = x?.time || "");
    }).catch(() => {
      f.current() && (k.error = "本机提醒读取失败。");
    }).finally(f.finish);
    const $ = Qe("detail");
    k.loading = !0;
    try {
      const x = await at.api(`/tasks/${encodeURIComponent(a)}`, { signal: $.signal });
      if (x && $.current()) {
        const U = Pt.get(a);
        k.title = U?.title ?? x.content ?? "", k.description = U?.description ?? x.description ?? "", k.priority = x.priority || 1;
        const v = me(x.due?.datetime || x.due?.date || "");
        k.dueDate = v.date, k.dueTime = v.time;
        const K = Ye(a, x.description || k.description), G = me(K);
        k.startDate = G.date, k.startTime = G.time, k.labels = [...x.labels || []], k.url = x.url || "";
        try {
          const N = await at.getComments(a, $.signal);
          if (N && $.current()) {
            const V = [], z = [];
            for (const O of N) {
              let T;
              if (O?.attachment?.file_url) {
                const A = O.attachment.file_name || "附件图片";
                V.push({ name: A, url: O.attachment.file_url }), T = { name: A, url: O.attachment.file_url };
              }
              z.push({
                id: O.id,
                content: O.content || "",
                postedAt: O.posted_at || "",
                attachment: T
              });
            }
            if (k.commentAttachments = V, k.comments = z, V.length > 0 && k.description) {
              let O = k.description, T = !1;
              for (const A of V) {
                const y = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                y.test(O) && (O = O.replace(y, `$1${A.url}$2`), T = !0);
              }
              if (T && !Pt.has(a)) {
                k.description = O;
                for (const A of kt.columns) {
                  const y = A.tasks.find((L) => String(L.id) === a);
                  if (y) {
                    y.description = O, y._taskRaw && (y._taskRaw.description = O);
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
      $.current() && (k.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      $.current() && (k.loading = !1), $.finish();
    }
  },
  close() {
    ae(), k.isOpen = !1, k.taskId = "";
  },
  async setStartDateAndTime(a, s) {
    if (!k.taskId) return;
    const u = Wt(), f = a.trim(), $ = f ? s.trim() : "";
    k.startDate = f, k.startTime = $, Zt();
    const x = Oo(f, $);
    Ao(u.taskId, x), at.invalidateWorkspaceSnapshots();
    for (const U of kt.columns) {
      const v = U.tasks.find((K) => K.id === u.taskId);
      v && (v.startDate = x);
    }
  },
  async setDueDateAndTime(a, s) {
    if (!k.taskId) return;
    const u = Wt(), f = a.trim(), $ = f ? s.trim() : "";
    k.dueDate = f, k.dueTime = $, Zt(), at.invalidateWorkspaceSnapshots();
    const x = (ve.get(u.taskId) || 0) + 1;
    ve.set(u.taskId, x);
    const U = qe.then(async () => {
      try {
        const v = await at.updateTask(u.taskId, {
          due_string: f ? $ ? `${f} ${$}` : f : "no date"
        });
        if (ve.get(u.taskId) !== x) return;
        const K = at.mapTasks([v], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const G of kt.columns) {
          const N = G.tasks.findIndex((z) => z.id === u.taskId);
          if (N < 0) continue;
          const V = G.tasks[N];
          if (Object.assign(V, {
            dueDate: K.dueDate,
            dueText: K.dueText,
            dueString: K.dueString,
            isDueToday: K.isDueToday,
            isOverdue: K.isOverdue,
            isRecurring: K.isRecurring
          }), V._taskRaw && (V._taskRaw.due = v.due), kt.view === "today") {
            const z = K.isOverdue ? "overdue" : K.isDueToday ? "today" : "";
            z !== G.sectionId && (G.tasks.splice(N, 1), kt.columns.find((O) => O.sectionId === z)?.tasks.push(V));
          }
        }
        u.current() && (k.error = "");
      } catch {
        u.current() && ve.get(u.taskId) === x && (k.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    qe = U.catch(() => {
    }), await U;
  },
  async saveTitleAndDesc(a, s, u = k.taskId) {
    const f = u === k.taskId ? Wt() : { taskId: u, current: () => !1 };
    if (!f.taskId || !a.trim()) return;
    const $ = a.trim(), x = s.trim(), U = Ge(u, $, x, "saving");
    f.current() && (k.title = $, k.description = x), Je(f.taskId, $, x), fe++, k.saving = !0;
    const v = Ie.then(async () => {
      try {
        await at.updateTask(f.taskId, {
          content: $,
          description: x
        }), Pt.get(u)?.revision === U && Pt.delete(u), fe === 1 && Pt.size === 0 && tt.dispatch("refresh");
      } catch (K) {
        const G = Pt.get(u);
        G?.revision === U && (G.status = "failed", G.error = K instanceof Error ? K.message : "保存未确认");
      } finally {
        fe--, k.saving = fe > 0;
      }
    });
    Ie = v.catch(() => {
    }), await v;
  },
  async attachImageToTask(a) {
    const s = Wt();
    if (await Ie, !s.current()) return;
    if (Pt.has(s.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const u = k.description || "";
    if (!s.taskId || k.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    k.saving = !0;
    try {
      const f = a.name || `截图_${Date.now()}.png`;
      let $ = "";
      try {
        const x = await at.uploadFile(a, f);
        x && x.file_url && ($ = x.file_url);
      } catch (x) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", x), a.size <= 2.5 * 1024 * 1024)
          $ = await Go(a);
        else
          throw new Error(x?.message || "云端上传失败且文件超过2.5MB");
      }
      if ($) {
        const x = u ? `${u}

![${f}](${$})` : `![${f}](${$})`;
        await at.updateTask(s.taskId, {
          description: x
        }), s.current() && (k.description = x);
        for (const U of kt.columns) {
          const v = U.tasks.find((K) => String(K.id) === s.taskId);
          if (v) {
            v.description = x, v._taskRaw && (v._taskRaw.description = x);
            break;
          }
        }
        tt.dispatch("refresh");
      }
    } catch (f) {
      s.current() && (k.error = f.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${f.message}`);
    } finally {
      k.saving = !1;
    }
  },
  async setPriority(a) {
    if (!k.taskId) return;
    const s = Wt();
    if (![1, 2, 3, 4].includes(a)) return;
    const u = k.priority;
    k.priority = a, Zt(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { priority: a });
      for (const f of kt.columns) {
        const $ = f.tasks.find((x) => x.id === s.taskId);
        $ && ($.priority = a, $._taskRaw && ($._taskRaw.priority = a));
      }
    } catch {
      s.current() && (k.priority = u, k.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!k.taskId) return;
    const s = Wt(), u = [...k.labels], $ = u.includes(a) ? u.filter((x) => x !== a) : [...u, a];
    k.labels = $, Zt(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { labels: $ });
      for (const x of kt.columns) {
        const U = x.tasks.find((v) => v.id === s.taskId);
        U && (U.labels = $, U._taskRaw && (U._taskRaw.labels = $));
      }
    } catch {
      s.current() && (k.labels = u, k.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const s = Wt();
    if (a = a.trim(), !(!s.taskId || !a))
      try {
        const u = await at.getLabels();
        if (!s.current()) return;
        u.some((f) => f.name === a) || await at.createLabel(a), s.current() && !k.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        s.current() && (k.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!k.taskId || !a.trim()) return;
    const s = Wt();
    try {
      const u = await at.addComment({
        task_id: s.taskId,
        content: a.trim()
      });
      u && s.current() && k.comments.push({
        id: u.id || `c_${Date.now()}`,
        content: u.content || a.trim(),
        postedAt: u.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (u) {
      s.current() && (k.error = "发送评论失败：" + (u?.message || ""));
    }
  },
  async setReminder(a) {
    const s = Wt();
    if (s.taskId)
      try {
        await Yo(s.taskId, a, k.title), s.current() && (k.reminderTime = a, k.error = "");
      } catch (u) {
        s.current() && (k.error = u instanceof Error ? u.message : "提醒未保存，请重试。");
      }
  }
}, ct = wo(qo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), Qo = ["aria-label"], Jo = { class: "todoist-cal-head" }, Zo = { class: "todoist-cal-title-row" }, tn = { class: "todoist-cal-logo" }, en = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, on = { class: "todoist-cal-head-actions" }, nn = { class: "todoist-cal-nav" }, sn = { class: "todoist-cal-nav-group" }, an = ["title"], ln = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, rn = ["title"], dn = { class: "todoist-cal-nav-group" }, cn = ["title"], un = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, pn = ["title"], mn = { class: "todoist-cal-weekdays" }, fn = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, vn = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], gn = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, bn = { class: "todoist-cal-agenda" }, kn = { class: "todoist-cal-agenda-head" }, yn = { class: "todoist-cal-agenda-title" }, hn = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, wn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, Tn = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, Dn = ["disabled"], xn = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, Cn = {
  key: 0,
  class: "todoist-cal-empty"
}, $n = {
  key: 1,
  class: "todoist-cal-empty"
}, Sn = ["onClick"], _n = { class: "todoist-cal-todo-main" }, In = ["disabled", "title", "onClick"], Rn = {
  key: 0,
  class: "check-icon"
}, Ln = {
  key: 0,
  class: "todoist-cal-task-time"
}, Pn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, Mn = ["title", "onClick"], On = ["src", "alt"], An = { class: "todoist-cal-thumb-tag" }, jn = /* @__PURE__ */ Ht({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const s = $o;
    eo(
      () => Q.active,
      () => gt.invalidateReads(),
      () => gt.loadTodosForDate(s.selectedDate, !0)
    ), Bt(() => gt.cancelReads()), pt(() => [Q.active, Q.pendingWrites], ([T, A], y) => {
      if (!T || A) {
        gt.cancelReads();
        return;
      }
      gt.loadTodosForDate(s.selectedDate, !!y?.[1]);
    }, { immediate: !0, flush: "sync" });
    function u(T) {
      gt.toggleTodoItem(T);
    }
    function f(T) {
      ct.openTask(T.id, T);
    }
    te(() => {
      Co.syncSidebarToVue();
    });
    function $() {
      gt.dispatch("today");
    }
    function x() {
      gt.dispatch("prev-month");
    }
    function U() {
      gt.dispatch("next-month");
    }
    function v() {
      gt.dispatch("prev-year");
    }
    function K() {
      gt.dispatch("next-year");
    }
    function G(T) {
      gt.dispatch("select-date", T);
    }
    function N(T, A) {
      gt.dispatch("context-date", {
        date: T,
        clientX: A.clientX,
        clientY: A.clientY
      });
    }
    function V(T, A) {
      const y = Array.from(A.dataTransfer?.types || []);
      (y.includes("application/x-todoist-task-id") || y.includes("text/plain")) && (A.preventDefault(), A.dataTransfer && (A.dataTransfer.dropEffect = "copy"));
    }
    function z(T) {
    }
    function O(T, A) {
      const y = A.dataTransfer?.getData("application/x-todoist-task-id") || A.dataTransfer?.getData("text/plain");
      y && (A.preventDefault(), A.stopPropagation(), gt.dispatch("drop-task", { taskId: y, date: T }));
    }
    return (T, A) => (r(), c("aside", {
      id: "todoist-calendar-sidebar",
      class: J(["todoist-calendar-sidebar", { collapsed: e(s).collapsed }]),
      "aria-label": e(m)("todoist.calendar.sidebarLabel")
    }, [
      t("div", Jo, [
        t("div", Zo, [
          t("span", tn, [
            A[1] || (A[1] = Ut("📅 ", -1)),
            t("strong", null, p(e(m)("todoist.calendar.title")), 1)
          ]),
          t("span", en, p(e(s).badgeText), 1)
        ]),
        t("div", on, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: $
          }, p(e(m)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", nn, [
        t("div", sn, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.prevMonth"),
            onClick: x
          }, "‹", 8, an),
          t("span", ln, p(e(s).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.nextMonth"),
            onClick: U
          }, "›", 8, rn)
        ]),
        t("div", dn, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.prevYear"),
            onClick: v
          }, "‹", 8, cn),
          t("span", un, p(e(s).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(m)("todoist.calendar.nextYear"),
            onClick: K
          }, "›", 8, pn)
        ])
      ]),
      t("div", mn, [
        t("span", null, p(e(m)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, p(e(m)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, p(e(m)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, p(e(m)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, p(e(m)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, p(e(m)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, p(e(m)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", fn, [
        (r(!0), c(it, null, ut(e(s).cells, (y) => (r(), c("button", {
          key: y.date,
          type: "button",
          class: J(["todoist-cal-cell", {
            outside: y.isOutside,
            today: y.isToday,
            selected: y.isSelected
          }]),
          "data-date": y.date,
          role: "gridcell",
          title: y.title,
          onClick: (L) => G(y.date),
          onContextmenu: X((L) => N(y.date, L), ["prevent"]),
          onDragover: (L) => V(y.date, L),
          onDragleave: (L) => (y.date, void 0),
          onDrop: (L) => O(y.date, L)
        }, [
          t("span", null, p(y.dayNumber), 1),
          y.hasDot ? (r(), c("span", gn)) : _("", !0)
        ], 42, vn))), 128))
      ]),
      t("div", bn, [
        t("div", kn, [
          t("strong", yn, p(e(s).agendaTitle), 1),
          t("span", hn, p(e(m)("todoist.calendar.itemCount", { count: e(s).todoItems.length })), 1)
        ]),
        e(s).writeError ? (r(), c("p", wn, p(e(s).writeError), 1)) : _("", !0),
        e(s).emptyText ? (r(), c("div", Tn, [
          Ut(p(e(s).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(s).todoLoading || e(Q).pendingWrites > 0,
            onClick: A[0] || (A[0] = (y) => e(gt).loadTodosForDate(e(s).selectedDate, !0))
          }, p(e(m)("todoist.calendar.retryLoad")), 9, Dn)
        ])) : _("", !0),
        t("div", xn, [
          e(s).todoLoading && !e(s).todoItems.length ? (r(), c("div", Cn, p(e(m)("todoist.calendar.loading")), 1)) : e(s).todoItems.length === 0 && !e(s).emptyText ? (r(), c("div", $n, p(e(m)("todoist.calendar.emptyDay")), 1)) : (r(!0), c(it, { key: 2 }, ut(e(s).todoItems, (y) => (r(), c("div", {
            key: y.id,
            class: J(["todoist-cal-todo-card", { completed: y.completed }]),
            onClick: (L) => f(y)
          }, [
            t("div", _n, [
              t("button", {
                type: "button",
                class: J(["todoist-cal-check", { checked: y.completed }]),
                disabled: e(Q).pendingWrites > 0,
                title: y.completed ? e(m)("todoist.calendar.clickToReopen") : e(m)("todoist.calendar.clickToComplete"),
                onClick: X((L) => u(y), ["stop"])
              }, [
                y.completed ? (r(), c("span", Rn, "✓")) : _("", !0)
              ], 10, In),
              t("span", {
                class: J(["todoist-cal-todo-title", { strike: y.completed }])
              }, p(y.content), 3),
              y.time ? (r(), c("small", Ln, p(y.time), 1)) : _("", !0),
              y.completed ? (r(), c("span", Pn, p(e(m)("todoist.calendar.completedTag")), 1)) : _("", !0)
            ]),
            y.thumbUrl ? (r(), c("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(m)("todoist.calendar.viewPhoto"),
              onClick: X((L) => e(Me).open(y.thumbUrl, y.content), ["stop"])
            }, [
              t("img", {
                src: y.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(m)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, On),
              t("span", An, p(e(m)("todoist.calendar.photoTag")), 1)
            ], 8, Mn)) : _("", !0)
          ], 10, Sn))), 128))
        ])
      ])
    ], 10, Qo));
  }
}), En = /* @__PURE__ */ ee(jn, [["__scopeId", "data-v-6114d4da"]]);
function Wn(a) {
  const s = a.state, u = M(null), f = M(null), $ = M(null), x = M(!1), U = Ze(null), v = M(), K = /* @__PURE__ */ new Map();
  function G(S) {
    K.clear();
    const E = S.closest(".todoist-board");
    if (E)
      for (const P of E.querySelectorAll(".todoist-board-list")) {
        const W = s.columns[Number(P.dataset.groupIndex)];
        if (!W) continue;
        const F = P.__todoistSlots;
        if (!F) continue;
        const nt = F(), dt = nt.filter((mt) => mt.id !== L?.id);
        K.set(W, { list: P, rows: dt, read: F, snapshot: nt });
      }
  }
  let N = 0, V;
  function z(S, E) {
    V = { clientY: S.clientY, col: E }, !N && (N = requestAnimationFrame(() => {
      N = 0;
      const P = V;
      V = void 0, P && O(P, P.col);
    }));
  }
  function O(S, E) {
    if (!L || s.movingTaskId) return;
    const P = K.get(E);
    if (!P) return;
    const W = P.read();
    W !== P.snapshot && (P.snapshot = W, P.rows = W.filter((ot) => ot.id !== L?.id));
    const F = S.clientY - P.list.getBoundingClientRect().top + P.list.scrollTop;
    let nt = 0, dt = P.rows.length;
    for (; nt < dt; ) {
      const ot = nt + dt >>> 1;
      F < P.rows[ot].middle ? dt = ot : nt = ot + 1;
    }
    let mt = nt;
    if (f.value === s.columns.indexOf(E)) {
      const ot = v.value ? P.rows.findIndex((st) => st.id === v.value) : P.rows.length;
      ot >= 0 && mt > ot && F < P.rows[ot].middle + 10 && (mt = ot), ot > 0 && mt < ot && F > P.rows[ot - 1].middle - 10 && (mt = ot);
    }
    const xt = P.rows[mt]?.id;
    y(E, xt), f.value === s.columns.indexOf(E) && ($.value = xt || P.rows[P.rows.length - 1]?.id || null, x.value = !xt);
  }
  function T(S) {
    return S === U.value;
  }
  function A(S, E) {
    if (E !== f.value || !U.value) return S.tasks;
    const P = [...S.tasks], W = v.value ? P.findIndex((F) => F.id === v.value) : -1;
    return P.splice(W < 0 ? P.length : W, 0, U.value), P;
  }
  function y(S, E) {
    if (!L || !H) return;
    if (s.view === "today" && S.sectionId === "overdue" && H.sectionId !== "overdue") {
      f.value = null;
      return;
    }
    const P = E ? S.tasks.find((nt) => nt.id === E) : void 0, W = S === H ? String(L._taskRaw?.parent_id || "") : "";
    if (P && s.view !== "today" && String(P._taskRaw?.parent_id || "") !== W) {
      f.value = null;
      return;
    }
    const F = s.columns.indexOf(S);
    F < 0 || (v.value = E, f.value = F);
  }
  let L = null, H = null;
  function I(S, E, P, W) {
    if (!a.isActive() || s.loading || s.movingTaskId || s.moveNeedsRefresh || E.completed || E.id.startsWith("optimistic-") || a.editingTaskId() === E.id) {
      S.preventDefault();
      return;
    }
    if (S.stopPropagation(), a.closePopovers(), u.value = E.id, L = E, H = P, U.value = { ...E }, G(S.currentTarget), S.dataTransfer) {
      S.dataTransfer.effectAllowed = "move";
      const F = S.currentTarget, nt = F.getBoundingClientRect();
      S.dataTransfer.setDragImage(
        F,
        Math.max(0, Math.min(nt.width, S.clientX - nt.left)),
        Math.max(0, Math.min(nt.height, S.clientY - nt.top))
      ), S.dataTransfer.clearData(), S.dataTransfer.setData("application/x-todoist-task-id", E.id), S.dataTransfer.setData("application/x-logicweaver-todoist-task", E.id), S.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: E.id, sectionId: P.sectionId }));
    }
  }
  function D() {
    cancelAnimationFrame(N), N = 0, V = void 0, u.value = null, f.value = null, $.value = null, x.value = !1, L = null, H = null, U.value = null, v.value = void 0, K.clear();
  }
  function Z(S, E) {
    !L || s.movingTaskId || (S.preventDefault(), S.stopPropagation(), S.dataTransfer && (S.dataTransfer.dropEffect = "move"), z(S, s.columns[E]));
  }
  function rt(S, E) {
    S.currentTarget?.contains(S.relatedTarget);
  }
  function C(S, E, P, W) {
    S.dataTransfer && (S.dataTransfer.dropEffect = "move"), z(S, P);
  }
  async function yt(S, E) {
    V && V.col === S && (O(V, V.col), E = v.value);
    const P = L, W = H;
    D(), !(!P || !W || !a.isActive() || s.movingTaskId) && (s.view === "today" ? S.sectionId === "today" && W.sectionId !== "today" ? await a.moveTask(P.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, E) : await a.moveTask(P.id, { sectionId: S.sectionId }, E) : await a.moveTask(P.id, {
      projectId: S.projectId,
      sectionId: S.sectionId
    }, E));
  }
  async function h(S, E, P, W) {
    S.preventDefault();
    const F = S.dataTransfer?.getData("application/x-todoist-label") || (S.dataTransfer?.getData("text/plain")?.startsWith("label:") ? S.dataTransfer.getData("text/plain").slice(6) : "");
    if (F) {
      a.dropLabel(E, F);
      return;
    }
    if (f.value === s.columns.indexOf(P)) {
      await yt(P, v.value);
      return;
    }
    const nt = S.currentTarget.getBoundingClientRect(), dt = S.clientY >= nt.top + nt.height / 2, mt = P.tasks.filter((st) => st.id !== L?.id), xt = mt.findIndex((st) => st.id === E.id), ot = E.id === L?.id ? E.id : dt ? mt[xt + 1]?.id : E.id;
    await yt(P, ot);
  }
  async function wt(S, E) {
    S.preventDefault(), S.stopPropagation(), await yt(E, f.value === s.columns.indexOf(E) ? v.value : void 0);
  }
  return pt(() => [s.view, s.activeProjectId], () => D()), pt(() => s.columns, (S) => {
    H && !S.includes(H) && D();
  }), pt(a.isActive, (S) => {
    S || D();
  }, { immediate: !0, flush: "sync" }), Bt(D), {
    draggingTaskId: u,
    dragOverColIndex: f,
    dragOverTaskId: $,
    dragAfterTask: x,
    isDragPreview: T,
    previewTasks: A,
    onTaskDragStart: I,
    onTaskDragEnd: D,
    onColDragOver: Z,
    onColDragLeave: rt,
    onTaskDragOver: C,
    onTaskDrop: h,
    onColDrop: wt
  };
}
const Un = ["data-row-key"], Bn = /* @__PURE__ */ Ht({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const s = a, u = M(null), f = /* @__PURE__ */ new Map(), $ = M(0), x = Ze({ top: 0, height: 600 }), U = (y) => s.isPreview(y) ? `preview:${y.id}` : y.id, v = lt(() => {
      $.value;
      const y = [0];
      for (const L of s.tasks) {
        const H = L.id === s.hiddenId && !s.isPreview(L) ? 0 : f.get(U(L)) || f.get(L.id) || 110;
        y.push(y[y.length - 1] + H);
      }
      return y;
    }), K = lt(() => {
      $.value;
      let y = 0;
      return s.tasks.filter((L) => !s.isPreview(L)).map((L) => {
        const H = f.get(L.id) || 110, I = { id: L.id, middle: y + H / 2 };
        return y += H, I;
      });
    });
    function G(y) {
      const L = v.value;
      let H = 0, I = s.tasks.length;
      for (; H < I; ) {
        const D = H + I >>> 1;
        L[D + 1] < y ? H = D + 1 : I = D;
      }
      return H;
    }
    const N = lt(() => {
      const y = Math.max(0, G(x.value.top) - 5), L = Math.min(s.tasks.length, G(x.value.top + x.value.height) + 6), H = /* @__PURE__ */ new Set();
      for (let I = y; I < L; I++) H.add(I);
      if (s.pinnedId) {
        const I = s.tasks.findIndex((D) => D.id === s.pinnedId && !s.isPreview(D));
        I >= 0 && H.add(I);
      }
      return [...H].sort((I, D) => I - D).map((I) => ({ task: s.tasks[I], index: I, top: v.value[I] }));
    });
    let V = 0;
    function z() {
      V || (V = requestAnimationFrame(() => {
        V = 0, u.value && (x.value = { top: u.value.scrollTop, height: u.value.clientHeight });
      }));
    }
    let O;
    const T = /* @__PURE__ */ new Map();
    function A(y, L) {
      const H = T.get(L);
      H !== y && (H && O?.unobserve(H), y instanceof HTMLElement ? (T.set(L, y), O?.observe(y)) : T.delete(L));
    }
    return pt(() => s.tasks, () => {
      const y = new Set(s.tasks.map(U));
      for (const L of f.keys()) y.has(L) || f.delete(L);
      Rt(z);
    }), te(() => {
      O = new ResizeObserver((y) => {
        let L = !1;
        const H = G(u.value?.scrollTop || 0), I = v.value[H] || 0;
        for (const D of y) {
          const Z = D.target;
          if (Z === u.value) {
            z();
            continue;
          }
          const rt = Z.dataset.rowKey, C = D.borderBoxSize?.[0]?.blockSize || D.contentRect.height;
          rt && C > 0 && Math.abs((f.get(rt) || 0) - C) > 0.5 && (f.set(rt, C), L = !0);
        }
        if (L) {
          $.value++;
          const D = (v.value[H] || 0) - I;
          u.value && D && !s.pinnedId && (u.value.scrollTop += D), z();
        }
      }), u.value && (O.observe(u.value), u.value.__todoistSlots = () => K.value);
      for (const y of T.values()) O.observe(y);
      z();
    }), Bt(() => {
      O?.disconnect(), cancelAnimationFrame(V), u.value && delete u.value.__todoistSlots, T.clear(), f.clear();
    }), (y, L) => (r(), c("div", {
      ref_key: "root",
      ref: u,
      onScrollPassive: z
    }, [
      a.tasks.length ? (r(), c("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${v.value[v.value.length - 1]}px` })
      }, [
        (r(!0), c(it, null, ut(N.value, (H) => (r(), c("div", {
          key: U(H.task),
          ref_for: !0,
          ref: (I) => A(I, U(H.task)),
          "data-row-key": U(H.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${H.top}px)` })
        }, [
          Ne(y.$slots, "default", {
            task: H.task,
            index: H.index
          }, void 0, !0)
        ], 12, Un))), 128))
      ], 4)) : Ne(y.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), zn = /* @__PURE__ */ ee(Bn, [["__scopeId", "data-v-e0ed77d8"]]), Hn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Nn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Vn = {
  key: 2,
  class: "todoist-empty"
}, Kn = {
  key: 3,
  class: "todoist-empty"
}, Fn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Yn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Xn = { class: "todoist-projects-toolbar-inner" }, Gn = { class: "todoist-project-tabs-scroll" }, qn = ["onClick"], Qn = { class: "todoist-project-tab-name" }, Jn = {
  key: 0,
  class: "todoist-project-actions-group"
}, Zn = ["title"], ts = { class: "action-text" }, es = ["title"], os = { class: "action-text" }, ns = { class: "todoist-board" }, ss = ["data-section-id", "data-title", "data-column-index"], is = { class: "todoist-board-column-head" }, as = ["title", "onClick"], ls = ["onClick"], rs = ["onSubmit"], ds = ["onKeydown"], cs = { class: "date-hint-left" }, us = { class: "date-hint-badge" }, ps = { class: "date-hint-sub" }, ms = {
  key: 0,
  class: "date-hint-preview"
}, fs = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, vs = {
  key: 1,
  class: "todoist-composer-images"
}, gs = ["src"], bs = { class: "todoist-composer-img-name" }, ks = {
  key: 0,
  class: "todoist-composer-img-status"
}, ys = ["onClick"], hs = { class: "todoist-inline-actions" }, ws = ["disabled"], Ts = ["disabled"], Ds = {
  key: 0,
  class: "todoist-column-empty"
}, xs = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Cs = ["disabled", "title", "aria-label", "onClick"], $s = { class: "todoist-board-task-main" }, Ss = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, _s = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Is = ["title", "onClick"], Rs = { class: "repo-badge-name" }, Ls = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, Ps = ["title", "onClick"], Ms = { class: "repo-badge-name" }, Os = ["onKeydown", "onBlur"], As = {
  key: 4,
  class: "todoist-board-task-title todoist-task-content"
}, js = {
  key: 5,
  class: "todoist-board-task-description"
}, Es = {
  key: 6,
  class: "todoist-board-task-meta"
}, Ws = ["title"], Us = ["title"], Bs = ["title"], zs = ["title"], Hs = {
  key: 4,
  class: "todoist-board-extra"
}, Ns = ["onClick"], Vs = ["src"], Ks = {
  key: 0,
  class: "todoist-board-add-column"
}, Fs = {
  key: 1,
  class: "todoist-add-section-form"
}, Ys = ["onKeydown"], Xs = { class: "todoist-add-section-actions" }, Gs = { class: "section-menu-text" }, qs = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, Qs = ["disabled"], Js = ["disabled"], Zs = {
  key: 1,
  class: "todoist-section-menu-divider"
}, ti = { class: "section-menu-text" }, ei = { class: "todoist-task-menu-header" }, oi = { class: "todoist-task-menu-title" }, ni = { class: "todoist-menu-text" }, si = { class: "todoist-menu-badge" }, ii = {
  key: 0,
  class: "todoist-labels-panel"
}, ai = { class: "todoist-labels-quick-input" }, li = ["placeholder", "onKeydown"], ri = { class: "todoist-labels-chip-grid" }, di = ["onClick"], ci = {
  key: 0,
  class: "chip-check"
}, ui = { class: "todoist-menu-text" }, pi = {
  key: 1,
  class: "todoist-recur-panel"
}, mi = { class: "todoist-recur-grid" }, fi = ["onClick"], vi = { class: "todoist-recur-custom-row" }, gi = ["onKeydown"], bi = { class: "todoist-menu-text" }, ki = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, yi = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, hi = {
  key: 2,
  class: "todoist-color-panel"
}, wi = { class: "todoist-color-grid" }, Ti = ["title", "onClick"], Di = { class: "todoist-color-name" }, xi = { class: "todoist-menu-text" }, Ci = ["disabled", "onClick"], $i = { class: "todoist-project-flyout-name" }, Si = {
  key: 0,
  class: "todoist-menu-badge"
}, _i = { class: "todoist-menu-text" }, Ii = { class: "todoist-dialog-title" }, Ri = ["title"], Li = { class: "todoist-dialog-body" }, Pi = {
  key: 0,
  class: "todoist-dialog-desc"
}, Mi = ["placeholder", "onKeydown"], Oi = { class: "todoist-dialog-foot" }, Ai = { class: "todoist-dialog-icon" }, ji = { class: "todoist-dialog-title" }, Ei = ["title"], Wi = { class: "todoist-dialog-body" }, Ui = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, Bi = { class: "todoist-dialog-danger-text" }, zi = { class: "todoist-dialog-msg" }, Hi = { class: "todoist-dialog-foot" }, Ni = /* @__PURE__ */ Ht({
  __name: "TodoistTaskList",
  setup(a) {
    const s = M(0);
    function u() {
      s.value++;
    }
    te(() => {
      window.addEventListener("storage", u), window.addEventListener("todoist-repository-links-changed", u), window.addEventListener("todoist-bili-links-changed", u);
    }), Bt(() => {
      window.removeEventListener("storage", u), window.removeEventListener("todoist-repository-links-changed", u), window.removeEventListener("todoist-bili-links-changed", u);
    });
    function f(n, o) {
      return s.value, oo(n, o);
    }
    function $(n, o, i) {
      return s.value, Wo(n, o, i);
    }
    function x(n) {
      Po.openVideo({
        bvid: n.bvid,
        aid: n.aid ? String(n.aid) : void 0,
        title: n.title,
        author: n.author,
        cover: n.cover,
        url: n.url
      });
    }
    function U(n) {
      no.open(n);
    }
    const v = kt, K = M(""), G = M(null), N = M(""), V = M(!1), z = lt(() => N.value ? jo(N.value) : null), O = M([]);
    function T(n) {
      const o = n.clipboardData?.items;
      if (o)
        for (let i = 0; i < o.length; i++) {
          const j = o[i];
          if (j.type.indexOf("image") !== -1) {
            n.preventDefault();
            const d = j.getAsFile();
            if (!d) continue;
            const et = URL.createObjectURL(d), Y = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: d,
              previewUrl: et,
              name: `截图_${Y}.png`,
              uploading: !1
            };
            O.value.push(Dt);
          }
        }
    }
    function A(n) {
      const o = O.value.splice(n, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const y = M(null), L = M(""), H = M(null), I = Qt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), D = Qt({
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
    }), Z = M(null), rt = M(null), C = Qt({
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
    }), yt = M(null), h = Qt({
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
    }), wt = M(null), S = M(null), E = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], P = [
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
    ], W = lt(() => String(h.task?._taskRaw?.project_id || h.col?.projectId || "")), F = lt(() => v.view !== "projects" ? null : v.projects.find((n) => String(n.id) === String(v.activeProjectId)) || v.projects[0] || null), nt = lt(() => {
      const n = new Set(v.availableLabels || []);
      return h.task?.labels && h.task.labels.forEach((o) => n.add(o)), Array.from(n);
    }), dt = lt(() => {
      const n = h.task?.customColorHex;
      return n && E.find((i) => i.hex.toLowerCase() === n.toLowerCase()) || E[0];
    });
    function mt(n, o) {
      return n.sectionId || n.title || String(o);
    }
    function xt() {
      return `${v.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function ot(n) {
      return n.startDate || n.dueText || n.labels && n.labels.length > 0 || n.timedDeadlineText || n.extraCountText;
    }
    function st() {
      I.isOpen = !1, h.isOpen = !1, h.activeSubpanel = null;
    }
    const {
      draggingTaskId: _t,
      dragOverColIndex: At,
      dragOverTaskId: zt,
      dragAfterTask: Nt,
      isDragPreview: Tt,
      previewTasks: oe,
      onTaskDragStart: B,
      onTaskDragEnd: l,
      onColDragOver: g,
      onColDragLeave: q,
      onTaskDragOver: It,
      onTaskDrop: jt,
      onColDrop: ge
    } = Wn({
      state: v,
      isActive: () => Q.active,
      editingTaskId: () => y.value,
      closePopovers: st,
      moveTask: (n, o, i) => tt.moveTask(n, o, i),
      dropLabel: (n, o) => {
        n.labels || (n.labels = []), n.labels.includes(o) || (n.labels.push(o), at.getToken() && at.updateTask(n.id, { labels: n.labels }));
      }
    });
    function be(n, o) {
      tt.dispatch("toggle-task", { task: n, group: o });
    }
    function ke(n, o) {
      if (n.completed) return;
      const i = o.target;
      i && i.closest("button,input,textarea,select,a") || ye(n);
    }
    function ye(n) {
      v.movingTaskId !== n.id && (y.value = n.id, L.value = n.content, Rt(() => {
        H.value && (H.value.focus(), H.value.select());
      }));
    }
    function ne(n, o) {
      if (y.value !== n.id) return;
      const i = L.value.trim();
      y.value = null, o && i && i !== n.content && (n.content = i, tt.dispatch("update-task-title", {
        taskId: n.id,
        content: i,
        task: n,
        newContent: i
      }));
    }
    function he(n, o) {
      n.key === "Enter" ? n.shiftKey || (n.preventDefault(), ne(o, !0)) : n.key === "Escape" && (n.preventDefault(), n.stopPropagation(), ne(o, !1));
    }
    function se(n, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || ct.openTask(n.id, n);
    }
    function Vt(n, o, i) {
      const j = i.currentTarget;
      G.value = mt(n, o), N.value = "", V.value = !1, Rt(() => {
        j.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function de() {
      Et.value || Kt();
    }
    function Kt() {
      G.value = null, N.value = "", V.value = !1;
      for (const n of O.value)
        try {
          URL.revokeObjectURL(n.previewUrl);
        } catch {
        }
      O.value = [];
    }
    const Et = M(!1), w = /* @__PURE__ */ new WeakMap();
    function b(n) {
      const o = n.description || n._taskRaw?.description || "", i = w.get(n);
      if (i && i.source === o) return i;
      const j = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, d = {
        source: o,
        thumb: j,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return w.set(n, d), d;
    }
    function R(n) {
      return b(n).text;
    }
    function ft(n) {
      return b(n).thumb;
    }
    function Ct(n, o) {
      n && Me.open(n, o?.content || "任务照片");
    }
    async function vt(n) {
      if (!Q.active || Et.value) return;
      const o = [...O.value];
      let j = N.value.trim() || o[0]?.name || "";
      if (!j) return;
      let d, et, Y;
      if (z.value && !V.value) {
        const Lt = z.value;
        j = Lt.cleanTitle || j, d = Lt.date, et = Lt.label + (Lt.time ? ` ${Lt.time}` : ""), Y = Lt.time ? `${Lt.date} ${Lt.time}` : Lt.date;
      }
      const Dt = G.value, Ft = N.value, $t = v.view, xe = n.projectId || $t === "projects" && v.activeProjectId || void 0, Ce = n.sectionId !== void 0 ? n.sectionId : void 0;
      Et.value = !0;
      try {
        await To(async () => {
          for (const ht of o)
            if (!ht.uploadedUrl) {
              ht.uploading = !0;
              try {
                const $e = await at.uploadFile(ht.file, ht.name);
                ht.uploadedUrl = $e.file_url;
              } catch {
                ht.uploadedUrl = ht.previewUrl;
              } finally {
                ht.uploading = !1;
              }
            }
          await tt.dispatch("add-task-submit", {
            content: j,
            view: $t,
            group: n,
            projectId: xe,
            sectionId: Ce,
            dueDate: d,
            dueText: et,
            dueString: Y,
            attachments: o.map((ht) => ({ file_url: ht.uploadedUrl, file_name: ht.name, file_type: ht.file.type || "image/png" }))
          }) && Dt === G.value && Ft === N.value && o.length === O.value.length && o.every((ht, $e) => ht === O.value[$e]) && Kt();
        });
      } catch {
        v.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        Et.value = !1;
      }
    }
    function Gt(n, o) {
      n.key === "Enter" && !n.shiftKey ? (n.preventDefault(), vt(o)) : n.key === "Escape" && (n.preventDefault(), de());
    }
    function Oe() {
      const n = K.value.trim();
      if (!n) return;
      const i = v.columns.find((j) => j.projectId)?.projectId || v.activeProjectId || void 0;
      tt.dispatch("add-section-submit", { name: n, projectId: i }), we();
    }
    function we() {
      v.addingSection = !1, K.value = "";
    }
    function io(n, o, i) {
      if (I.isOpen && I.col === n) {
        I.isOpen = !1;
        return;
      }
      h.isOpen = !1;
      const d = i.currentTarget.getBoundingClientRect(), Y = Math.max(8, Math.min(window.innerWidth - 175 - 8, d.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, d.bottom + 4));
      I.col = n, I.x = Y, I.y = Dt, I.canMoveLeft = o > 0 && !!v.columns[o - 1]?.sectionId, I.canMoveRight = o < v.columns.length - 1 && !!v.columns[o + 1]?.sectionId, I.isOpen = !0;
    }
    function Ae(n, o) {
      I.isOpen = !1, tt.dispatch("move-section", { sectionId: n.sectionId, direction: o });
    }
    function je(n, o, i) {
      if (v.movingTaskId === n.id || n.completed) return;
      I.isOpen = !1;
      const j = 236, d = 340, et = Math.max(8, Math.min(window.innerWidth - j - 8, i.clientX)), Y = Math.max(8, Math.min(window.innerHeight - d - 8, i.clientY));
      if (h.task = n, h.col = o, h.x = et, h.y = Y, h.activeSubpanel = null, h.descText = n.description || "", h.isSavingDesc = !1, h.newLabelText = "", h.customRecurText = "", n.dueDate) {
        const $t = /* @__PURE__ */ new Date(`${n.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite($t.getTime()) && (h.calYear = $t.getFullYear(), h.calMonth = $t.getMonth());
      } else {
        const $t = /* @__PURE__ */ new Date();
        h.calYear = $t.getFullYear(), h.calMonth = $t.getMonth();
      }
      const Dt = 252, Ft = et + j + Dt > window.innerWidth - 8;
      h.flyoutOpenLeft = Ft, h.flyoutStyle = {
        left: Ft ? `${-Dt - 6}px` : `${j + 6}px`,
        top: "0px"
      }, h.isOpen = !0;
    }
    function ce(n) {
      h.activeSubpanel === n ? h.activeSubpanel = null : (h.activeSubpanel = n, n === "desc" ? Rt(() => {
        wt.value?.focus(), wt.value?.select();
      }) : n === "labels" && Rt(() => {
        S.value?.focus();
      }));
    }
    function Ee(n) {
      return !!h.task?.labels?.includes(n);
    }
    function ao(n) {
      if (!h.task) return;
      const o = h.task.id, i = [...h.task.labels || []], j = i.includes(n) ? i.filter((d) => d !== n) : [...i, n];
      h.task.labels = j, tt.dispatch("update-task-labels", { taskId: o, labels: j });
    }
    function We() {
      if (!h.task) return;
      const n = h.newLabelText.trim();
      if (!n) return;
      h.newLabelText = "";
      const o = h.task.id, i = [...h.task.labels || []];
      i.includes(n) || (i.push(n), h.task.labels = i, tt.dispatch("update-task-labels", { taskId: o, labels: i })), st();
    }
    function lo(n) {
      return String(h.task?.dueString || "").toLowerCase().includes(n.toLowerCase());
    }
    function ro(n, o) {
      if (!h.task) return;
      const i = h.task.id;
      tt.dispatch("update-task-recurring", { taskId: i, rule: n, label: o }), st();
    }
    function Ue() {
      if (!h.task) return;
      const n = h.customRecurText.trim();
      if (!n) return;
      const o = h.task.id;
      tt.dispatch("update-task-recurring", { taskId: o, rule: n, label: n }), st();
    }
    function co() {
      if (!h.task) return;
      const n = h.task.id;
      tt.dispatch("clear-task-recurring", { taskId: n }), st();
    }
    function uo(n) {
      if (!h.task) return;
      const o = h.task.id, i = E.find((j) => j.id === n);
      h.task.customColorHex = i?.hex || "", tt.dispatch("update-task-color", { taskId: o, colorId: n }), st();
    }
    function po(n) {
      if (!h.task) return;
      const o = h.task.id;
      tt.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: n.id,
        targetProjectName: n.name
      }), st();
    }
    function mo() {
      if (!h.task) return;
      const n = h.task, o = { x: h.x, y: h.y };
      st();
      const i = qt(o, 380, 220);
      C.x = i.x, C.y = i.y, n.isRecurring ? (C.title = "删除重复任务确认", C.icon = "⚠️", C.danger = !0, C.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", C.message = `任务内容：${n.content}
循环规则：${n.dueString || "循环任务"}`, C.confirmText = "删除重复任务", C.actionType = "delete-task", C.payload = { taskId: n.id, isRecurring: !0 }, C.isOpen = !0) : (C.title = "删除任务确认", C.icon = "🗑️", C.danger = !0, C.alertText = `确定要删除任务「${n.content}」吗？`, C.message = "此操作不可撤销。", C.confirmText = "确认删除", C.actionType = "delete-task", C.payload = { taskId: n.id, isRecurring: !1 }, C.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(n, o, i) {
      je(n, o, i);
    });
    function qt(n, o = 380, i = 220) {
      let j = null;
      if (n instanceof HTMLElement)
        j = n.getBoundingClientRect();
      else if (n && "currentTarget" in n && n.currentTarget instanceof HTMLElement)
        j = n.currentTarget.getBoundingClientRect();
      else if (n && "target" in n && n.target instanceof HTMLElement)
        j = (n.target.closest("button") || n.target).getBoundingClientRect();
      else if (n && "x" in n && "y" in n && typeof n.x == "number" && typeof n.y == "number") {
        const d = Math.max(16, Math.min(window.innerWidth - o - 16, n.x)), et = Math.max(16, Math.min(window.innerHeight - i - 16, n.y + 10));
        return { x: d, y: et };
      }
      if (j) {
        let d = j.right - o;
        d < 16 && (d = Math.max(16, j.left)), d = Math.max(16, Math.min(window.innerWidth - o - 16, d));
        let et = j.bottom + 8;
        return et + i > window.innerHeight - 16 && j.top > i + 16 && (et = j.top - i - 8), et = Math.max(16, Math.min(window.innerHeight - i - 16, et)), { x: d, y: et };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - i) / 3))
      };
    }
    function Be(n, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const i = o.clientX, j = o.clientY, d = n === "prompt" ? D : C, et = d.x, Y = d.y, Dt = ($t) => {
        const xe = $t.clientX - i, Ce = $t.clientY - j;
        d.x = Math.max(10, Math.min(window.innerWidth - 320, et + xe)), d.y = Math.max(10, Math.min(window.innerHeight - 120, Y + Ce));
      }, Ft = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Ft);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Ft);
    }
    function ze(n) {
      const o = qt(n, 380, 220);
      D.x = o.x, D.y = o.y, D.title = m("todoist.newProject"), D.message = m("todoist.inputProjectPlaceholder"), D.value = "", D.placeholder = m("todoist.inputProjectPlaceholder"), D.confirmText = m("common.confirm"), D.actionType = "create-project", D.payload = null, D.isOpen = !0, Rt(() => Z.value?.focus());
    }
    function fo(n, o) {
      const i = qt(o, 380, 220);
      D.x = i.x, D.y = i.y, D.title = m("todoist.renameProject"), D.message = n.name, D.value = n.name, D.placeholder = m("todoist.inputProjectPlaceholder"), D.confirmText = m("common.save"), D.actionType = "rename-project", D.payload = { projectId: n.id }, D.isOpen = !0, Rt(() => {
        Z.value?.focus(), Z.value?.select();
      });
    }
    function vo(n, o) {
      const i = o || { x: I.x, y: I.y };
      I.isOpen = !1;
      const j = qt(i, 380, 220);
      D.x = j.x, D.y = j.y, D.title = m("todoist.renameSection"), D.message = n.title, D.value = n.title, D.placeholder = m("todoist.inputSectionPlaceholder"), D.confirmText = m("common.save"), D.actionType = "rename-section", D.payload = { sectionId: n.sectionId }, D.isOpen = !0, Rt(() => {
        Z.value?.focus(), Z.value?.select();
      });
    }
    function ie() {
      D.isOpen = !1;
    }
    function He() {
      const n = D.value.trim();
      if (!n) return;
      const { actionType: o, payload: i } = D;
      ie(), o === "create-project" ? tt.dispatch("create-project-submit", n) : o === "rename-project" && i && "projectId" in i ? tt.dispatch("rename-project-submit", { projectId: i.projectId, newName: n }) : o === "rename-section" && i && "sectionId" in i && tt.dispatch("rename-section", { sectionId: i.sectionId, newName: n });
    }
    function go(n, o) {
      const i = qt(o, 380, 240);
      C.x = i.x, C.y = i.y, C.title = m("todoist.deleteProjectConfirm"), C.icon = "🗑️", C.danger = !0, C.alertText = m("todoist.deleteProjectAlert", { name: n.name }), C.message = m("todoist.deleteProjectWarning"), C.confirmText = m("common.deletePermanently"), C.actionType = "delete-project", C.payload = { projectId: n.id }, C.isOpen = !0;
    }
    function bo(n, o) {
      const i = o || { x: I.x, y: I.y };
      I.isOpen = !1;
      const j = qt(i, 380, 240);
      C.x = j.x, C.y = j.y, C.title = m("todoist.deleteSectionConfirm"), C.icon = "🗑️", C.danger = !0, C.alertText = m("todoist.deleteSectionAlert", { name: n.title }), C.message = m("todoist.deleteSectionWarning"), C.confirmText = m("todoist.deleteSection"), C.actionType = "delete-section", C.payload = { sectionId: n.sectionId }, C.isOpen = !0;
    }
    function ue() {
      C.isOpen = !1;
    }
    function ko() {
      const { actionType: n, payload: o } = C;
      ue(), n === "delete-project" && o && "projectId" in o ? tt.dispatch("delete-project-submit", o.projectId) : n === "delete-section" && o && "sectionId" in o ? tt.dispatch("delete-section", { sectionId: o.sectionId }) : n === "delete-task" && o && "taskId" in o && tt.dispatch("delete-task-submit", o);
    }
    function yo(n) {
      tt.dispatch("switch-project", n);
    }
    function Te(n) {
      n.key === "Escape" && (D.isOpen && ie(), C.isOpen && ue(), h.isOpen && (h.isOpen = !1, h.activeSubpanel = null), I.isOpen && (I.isOpen = !1));
    }
    function De(n) {
      const o = n.target;
      o && (D.isOpen && rt.value && !rt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && ie(), C.isOpen && yt.value && !yt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ue());
    }
    return pt(() => Q.active, (n) => {
      document.removeEventListener("keydown", Te), window.removeEventListener("pointerdown", De), n && (document.addEventListener("keydown", Te), window.addEventListener("pointerdown", De));
    }, { immediate: !0, flush: "sync" }), Bt(() => {
      document.removeEventListener("keydown", Te), window.removeEventListener("pointerdown", De), Kt();
    }), (n, o) => (r(), c("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: st
    }, [
      e(v).moveError && e(v).moveMessage ? (r(), c("p", Hn, p(e(v).moveMessage), 1)) : _("", !0),
      e(v).emptyText && e(v).columns.length > 0 && !e(v).loading ? (r(), c("p", Nn, p(e(m)("todoist.tasksRetained", { text: e(v).emptyText })), 1)) : _("", !0),
      e(v).loading && e(v).columns.length === 0 ? (r(), c("p", Vn, p(e(m)("common.loading")), 1)) : e(v).emptyText && e(v).columns.length === 0 ? (r(), c("p", Kn, p(e(v).emptyText), 1)) : e(v).view === "projects" && e(v).projects.length === 0 ? (r(), c("div", Fn, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, p(e(m)("todoist.emptyProjects")), 1),
        t("p", null, p(e(m)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (i) => ze(i))
        }, p(e(m)("todoist.createFirstProject")), 1)
      ])) : (r(), c(it, { key: 5 }, [
        e(v).view === "projects" && e(v).projects.length ? (r(), c("div", Yn, [
          t("div", Xn, [
            t("div", Gn, [
              (r(!0), c(it, null, ut(e(v).projects, (i) => (r(), c("button", {
                key: i.id,
                type: "button",
                class: J(["todoist-project-tab", { active: String(i.id) === String(e(v).activeProjectId) }]),
                onClick: (j) => yo(i.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: bt({ background: i.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", Qn, p(i.name), 1)
              ], 10, qn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => ze(i))
              }, "＋ 新建项目")
            ]),
            F.value ? (r(), c("div", Jn, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(m)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => fo(F.value, i))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", ts, p(e(m)("common.rename")), 1)
              ], 8, Zn),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(m)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => go(F.value, i))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", os, p(e(m)("todoist.deleteProject")), 1)
              ], 8, es)
            ])) : _("", !0)
          ])
        ])) : _("", !0),
        t("div", ns, [
          (r(!0), c(it, null, ut(e(v).columns, (i, j) => (r(), c("section", {
            key: i.sectionId || i.title || j,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": j
          }, [
            t("header", is, [
              t("h3", null, [
                Ut(p(i.title) + " ", 1),
                t("span", null, p(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: X((d) => io(i, j, d), ["stop"])
              }, "•••", 8, as)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (d) => Vt(i, j, d)
            }, "＋ 添加任务", 8, ls),
            G.value === mt(i, j) ? (r(), c("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: X((d) => vt(i), ["prevent"])
            }, [
              Mt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (d) => N.value = d),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (d) => Gt(d, i),
                onPaste: o[5] || (o[5] = (d) => T(d))
              }, null, 40, ds), [
                [Yt, N.value]
              ]),
              z.value ? (r(), c("div", {
                key: 0,
                class: J(["todoist-composer-date-hint", { "is-ignored": V.value }])
              }, [
                t("div", cs, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", us, [
                    Ut(p(z.value.label) + p(z.value.time ? " " + z.value.time : "") + " ", 1),
                    t("span", ps, "(" + p(z.value.formattedDate) + ")", 1)
                  ]),
                  V.value ? (r(), c("span", fs, " (已忽略日期，按纯文本创建) ")) : (r(), c("span", ms, [
                    o[32] || (o[32] = Ut(" 精简任务名: ", -1)),
                    t("strong", null, p(z.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (d) => V.value = !V.value)
                }, p(V.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : _("", !0),
              O.value.length > 0 ? (r(), c("div", vs, [
                (r(!0), c(it, null, ut(O.value, (d, et) => (r(), c("div", {
                  key: et,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: d.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, gs),
                  t("span", bs, p(d.name), 1),
                  d.uploading ? (r(), c("span", ks, "上传中…")) : _("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (Y) => A(et)
                  }, "×", 8, ys)
                ]))), 128))
              ])) : _("", !0),
              t("div", hs, [
                t("button", {
                  type: "button",
                  disabled: Et.value,
                  onClick: de
                }, p(e(m)("common.cancel")), 9, ws),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: Et.value
                }, p(Et.value ? O.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Ts)
              ])
            ], 40, rs)) : _("", !0),
            Jt(zn, {
              tasks: e(oe)(i, j),
              "pinned-id": e(_t) || y.value,
              "hidden-id": e(At) !== null ? e(_t) : null,
              "is-preview": e(Tt),
              class: J(["todoist-board-list", { "drag-over": e(At) === j }]),
              "data-group-index": j,
              onDragover: X((d) => e(g)(d, j), ["prevent"]),
              onDragleave: (d) => e(q)(d, j),
              onDrop: X((d) => e(ge)(d, i), ["prevent"])
            }, {
              empty: le(() => [
                i.tasks.length === 0 && e(At) !== j ? (r(), c("p", Ds, " 暂无任务 · 可拖到这里 ")) : _("", !0)
              ]),
              default: le(({ task: d, index: et }) => [
                t("article", {
                  class: J(["todoist-board-task", [
                    {
                      completed: d.completed,
                      "has-custom-color": !!d.customColorHex,
                      editing: y.value === d.id,
                      "dragging-task": !e(Tt)(d) && e(_t) === d.id,
                      "drop-before": e(zt) === d.id && !e(Nt),
                      "drop-after": e(zt) === d.id && e(Nt),
                      "saving-position": e(v).movingTaskId === d.id,
                      "todoist-task-preview": e(Tt)(d),
                      "drag-origin-hidden": e(_t) === d.id && !e(Tt)(d) && e(At) !== null
                    }
                  ]]),
                  style: bt(d.customColorHex ? { "--task-custom-color": d.customColorHex } : {}),
                  "data-task-id": e(Tt)(d) ? void 0 : d.id,
                  "aria-hidden": e(Tt)(d) || void 0,
                  tabindex: e(Tt)(d) ? -1 : 0,
                  title: xt(),
                  draggable: !e(Tt)(d) && !d.completed && !e(v).loading && !e(v).movingTaskId && !e(v).moveNeedsRefresh && y.value !== d.id && !d.id.startsWith("optimistic-"),
                  onDragstart: (Y) => e(B)(Y, d, i, et),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...Y) => e(l) && e(l)(...Y)),
                  onDragover: X((Y) => e(It)(Y, d, i, et), ["stop", "prevent"]),
                  onDrop: X((Y) => e(jt)(Y, d, i, et), ["stop", "prevent"]),
                  onDblclick: (Y) => ke(d, Y),
                  onClick: (Y) => se(d, Y),
                  onContextmenu: X((Y) => je(d, i, Y), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: J(["todoist-board-check", { checked: d.completed }]),
                    disabled: e(Tt)(d) || e(v).movingTaskId === d.id,
                    title: d.completed ? "撤销完成" : "完成任务",
                    "aria-label": (d.completed ? "撤销完成：" : "完成：") + d.content,
                    onClick: X((Y) => be(d, i), ["stop"])
                  }, null, 10, Cs),
                  t("div", $s, [
                    e(v).movingTaskId === d.id ? (r(), c("span", Ss, "保存中")) : _("", !0),
                    f(d.id, d.description).length ? (r(), c("div", _s, [
                      (r(!0), c(it, null, ut(f(d.id, d.description), (Y) => (r(), c("button", {
                        key: Y.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + Y.fullName + " · 点击在插件内查看详情",
                        onClick: X((Dt) => U(Y.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", Rs, p(Y.fullName), 1)
                      ], 8, Is))), 128))
                    ])) : _("", !0),
                    $(d.id, d.description, d.content).length ? (r(), c("div", Ls, [
                      (r(!0), c(it, null, ut($(d.id, d.description, d.content), (Y) => (r(), c("button", {
                        key: Y.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + Y.title + " · 点击立即播放",
                        onClick: X((Dt) => x(Y), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", Ms, p(Y.title), 1)
                      ], 8, Ps))), 128))
                    ])) : _("", !0),
                    y.value === d.id ? Mt((r(), c("textarea", {
                      key: 3,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: H,
                      "onUpdate:modelValue": o[7] || (o[7] = (Y) => L.value = Y),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (Y) => he(Y, d),
                      onBlur: (Y) => ne(d, !0),
                      onClick: o[8] || (o[8] = X(() => {
                      }, ["stop"]))
                    }, null, 40, Os)), [
                      [Yt, L.value]
                    ]) : (r(), c("p", As, p(d.content || "未命名任务"), 1)),
                    R(d) ? (r(), c("p", js, p(R(d)), 1)) : _("", !0),
                    ot(d) ? (r(), c("div", Es, [
                      d.startDate && !d.dueDate ? (r(), c("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${d.startDate}`
                      }, " 🛫 自 " + p(e(_e)(d.startDate)) + " 起 ", 9, Ws)) : d.startDate && d.dueDate ? (r(), c("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${d.startDate} 至 ${d.dueDate}`
                      }, " ⏱ " + p(e(_e)(d.startDate)) + " ~ " + p(e(_e)(d.dueDate)), 9, Us)) : d.dueText ? (r(), c("span", {
                        key: 2,
                        class: J(["todoist-board-due", { recurring: d.isRecurring }]),
                        title: d.isRecurring ? `循环任务：${d.dueString || d.dueText}` : void 0
                      }, p(d.isRecurring ? "↻ " : "▣ ") + p(d.dueText), 11, Bs)) : _("", !0),
                      (r(!0), c(it, null, ut((d.labels || []).slice(0, 3), (Y) => (r(), c("span", {
                        key: Y,
                        class: "todoist-board-label"
                      }, "◇ " + p(Y), 1))), 128)),
                      d.timedDeadlineText ? (r(), c("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (d.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + p(d.timedDeadlineText), 9, zs)) : _("", !0),
                      d.extraCountText ? (r(), c("span", Hs, p(d.extraCountText), 1)) : _("", !0)
                    ])) : _("", !0),
                    ft(d) ? (r(), c("div", {
                      key: 7,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: X((Y) => Ct(ft(d), d), ["stop"])
                    }, [
                      t("img", {
                        src: ft(d),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, Vs),
                      o[36] || (o[36] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, Ns)) : _("", !0)
                  ])
                ], 46, xs)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, ss))), 128)),
          e(v).view === "inbox" || e(v).view === "projects" ? (r(), c("div", Ks, [
            e(v).addingSection ? (r(), c("div", Fs, [
              Mt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (i) => K.value = i),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  St(X(Oe, ["prevent"]), ["enter"]),
                  St(we, ["esc"])
                ]
              }, null, 40, Ys), [
                [Yt, K.value]
              ]),
              t("div", Xs, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: Oe
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: we
                }, p(e(m)("common.cancel")), 1)
              ])
            ])) : (r(), c("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[10] || (o[10] = (i) => e(v).addingSection = !0)
            }, [...o[37] || (o[37] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : _("", !0)
        ])
      ], 64)),
      I.isOpen && I.col ? (r(), c("div", {
        key: 6,
        class: "todoist-section-menu",
        style: bt({ left: I.x + "px", top: I.y + "px" }),
        onClick: o[16] || (o[16] = X(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (i) => vo(I.col, i))
        }, [
          o[38] || (o[38] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", Gs, p(e(m)("todoist.menu.renameSection")), 1)
        ]),
        I.col.sectionId ? (r(), c("div", qs, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !I.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (i) => Ae(I.col, -1))
          }, p(e(m)("todoist.menu.moveLeft")), 9, Qs),
          o[39] || (o[39] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !I.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (i) => Ae(I.col, 1))
          }, p(e(m)("todoist.menu.moveRight")), 9, Js)
        ])) : _("", !0),
        I.col.sectionId ? (r(), c("div", Zs)) : _("", !0),
        I.col.sectionId ? (r(), c("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (i) => bo(I.col, i))
        }, [
          o[40] || (o[40] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", ti, p(e(m)("todoist.menu.deleteSection")), 1)
        ])) : _("", !0)
      ], 4)) : _("", !0),
      h.isOpen && h.task ? (r(), c("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: h.x + "px", top: h.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = X(() => {
        }, ["stop"]))
      }, [
        t("div", ei, [
          t("span", oi, p(h.task.content || e(m)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: h.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (i) => ce("labels"))
        }, [
          o[41] || (o[41] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", ni, p(e(m)("todoist.menu.cloudLabels")), 1),
          t("span", si, p(h.task.labels && h.task.labels.length ? e(m)("todoist.menu.labelsSelected", { count: h.task.labels.length }) : e(m)("todoist.menu.labelsNone")), 1)
        ], 2),
        h.activeSubpanel === "labels" ? (r(), c("div", ii, [
          t("div", ai, [
            Mt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (i) => h.newLabelText = i),
              type: "text",
              placeholder: e(m)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: St(X(We, ["prevent"]), ["enter"])
            }, null, 40, li), [
              [Yt, h.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: We
            }, "＋")
          ]),
          t("div", ri, [
            (r(!0), c(it, null, ut(nt.value, (i) => (r(), c("button", {
              key: i,
              type: "button",
              class: J(["todoist-label-chip", { selected: Ee(i) }]),
              onClick: (j) => ao(i)
            }, [
              t("span", null, "◇ " + p(i), 1),
              Ee(i) ? (r(), c("span", ci, "✓")) : _("", !0)
            ], 10, di))), 128))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: h.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (i) => ce("recur"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", ui, p(e(m)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(h.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, p(h.task.isRecurring ? h.task.dueString || e(m)("todoist.recur.recurring") : e(m)("todoist.menu.labelsNone")), 5)
        ], 2),
        h.activeSubpanel === "recur" ? (r(), c("div", pi, [
          t("div", mi, [
            (r(), c(it, null, ut(P, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: J(["todoist-recur-chip", { selected: lo(i.rule) }]),
              onClick: (j) => ro(i.rule, i.label)
            }, [
              t("span", null, p(i.icon), 1),
              t("span", null, p(i.label), 1)
            ], 10, fi)), 64))
          ]),
          t("div", vi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (i) => h.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: St(X(Ue, ["prevent"]), ["enter"])
            }, null, 40, gi), [
              [Yt, h.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Ue
            }, "确定")
          ]),
          h.task.isRecurring ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: co
          }, p(e(m)("todoist.menu.clearRecur")), 1)) : _("", !0)
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: h.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (i) => ce("color"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", bi, p(e(m)("todoist.menu.pickColor")), 1),
          t("span", ki, [
            dt.value.id === "none" ? (r(), c("span", yi, "⊘")) : (r(), c("span", {
              key: 1,
              class: "todoist-color-dot",
              style: bt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: dt.value.hex
              })
            }, null, 4)),
            Ut(" " + p(dt.value.name), 1)
          ])
        ], 2),
        h.activeSubpanel === "color" ? (r(), c("div", hi, [
          t("div", wi, [
            (r(), c(it, null, ut(E, (i) => t("button", {
              key: i.id,
              type: "button",
              class: J(["todoist-color-swatch", { selected: dt.value.id === i.id }]),
              title: i.name,
              onClick: (j) => uo(i.id)
            }, [
              t("span", {
                class: J(["todoist-color-dot", { none: i.id === "none" }]),
                style: bt(i.id !== "none" ? { background: i.hex } : {})
              }, p(i.id === "none" ? dt.value.id === "none" ? "✓" : "⊘" : dt.value.id === i.id ? "✓" : ""), 7),
              t("span", Di, p(i.name), 1)
            ], 10, Ti)), 64))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: h.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (i) => ce("project"))
        }, [
          o[44] || (o[44] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", xi, p(e(m)("todoist.menu.moveToProject")), 1),
          o[45] || (o[45] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        h.activeSubpanel === "project" ? (r(), c("div", {
          key: 3,
          class: J(["todoist-project-flyout", { "open-left": h.flyoutOpenLeft }]),
          style: bt(h.flyoutStyle)
        }, [
          (r(!0), c(it, null, ut(e(v).projects, (i) => (r(), c("button", {
            key: i.id,
            type: "button",
            class: J(["todoist-project-flyout-item", { active: String(i.id) === W.value }]),
            disabled: !!e(v).movingTaskId || String(i.id) === W.value,
            onClick: (j) => po(i)
          }, [
            o[46] || (o[46] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", $i, p(i.name), 1),
            String(i.id) === W.value ? (r(), c("span", Si, p(e(m)("todoist.menu.currentBadge")), 1)) : _("", !0)
          ], 10, Ci))), 128))
        ], 6)) : _("", !0),
        o[48] || (o[48] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: mo
        }, [
          o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", _i, p(h.task.isRecurring ? e(m)("todoist.menu.deleteRecurringTask") : e(m)("todoist.menu.deleteTask")), 1)
        ])
      ], 4)) : _("", !0),
      D.isOpen && e(Q).active ? (r(), c("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: rt,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${D.x}px`,
          top: `${D.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[26] || (o[26] = X(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (i) => Be("prompt", i))
        }, [
          o[49] || (o[49] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", Ii, p(D.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(m)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ri)
        ], 32),
        t("div", Li, [
          D.message ? (r(), c("p", Pi, p(D.message), 1)) : _("", !0),
          Mt(t("input", {
            ref_key: "promptInputRef",
            ref: Z,
            "onUpdate:modelValue": o[25] || (o[25] = (i) => D.value = i),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: D.placeholder,
            onKeydown: [
              St(X(He, ["prevent"]), ["enter"]),
              St(X(ie, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, Mi), [
            [Yt, D.value]
          ])
        ]),
        t("div", Oi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ie
          }, p(e(m)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: He
          }, p(D.confirmText || e(m)("common.confirm")), 1)
        ])
      ], 4)) : _("", !0),
      C.isOpen && e(Q).active ? (r(), c("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: yt,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${C.x}px`,
          top: `${C.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[28] || (o[28] = X(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (i) => Be("confirm", i))
        }, [
          t("span", Ai, p(C.icon || "⚠️"), 1),
          t("h3", ji, p(C.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(m)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ei)
        ], 32),
        t("div", Wi, [
          C.danger ? (r(), c("div", Ui, [
            t("div", Bi, p(C.alertText), 1)
          ])) : _("", !0),
          t("p", zi, p(C.message), 1)
        ]),
        t("div", Hi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ue
          }, p(e(m)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: J(["todoist-dialog-btn", C.danger ? "danger" : "primary"]),
            onClick: ko
          }, p(C.confirmText || e(m)("common.confirm")), 3)
        ])
      ], 4)) : _("", !0)
    ]));
  }
}), Vi = /* @__PURE__ */ ee(Ni, [["__scopeId", "data-v-d47ec0a1"]]), Ki = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, Fi = { class: "reminder-shortcuts" }, Yi = ["disabled"], Xi = { class: "reminder-preview" }, Gi = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, qi = ["disabled"], Qi = ["disabled"], Ji = ["disabled"], Zi = /* @__PURE__ */ Ht({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(a, { emit: s }) {
    const u = a, f = s, $ = u.value || (u.taskDate ? u.taskDate + "T" + (u.taskTime || "09:00") : ""), x = M($.slice(0, 10)), U = M($.slice(11, 16)), v = M(!1), K = M(""), G = M(!0), N = lt(() => x.value && U.value ? (/* @__PURE__ */ new Date(x.value + "T" + U.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function V(O) {
      if (v.value) return;
      const T = /* @__PURE__ */ new Date();
      O === "tomorrow" ? (T.setDate(T.getDate() + 1), T.setHours(9, 0, 0, 0)) : T.setTime(T.getTime() + O * 6e4), x.value = `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`, U.value = `${String(T.getHours()).padStart(2, "0")}:${String(T.getMinutes()).padStart(2, "0")}`, K.value = "", G.value = !0;
    }
    async function z(O) {
      if (!(v.value || Q.pendingWrites)) {
        if (O && (!Number.isFinite(Date.parse(O)) || Date.parse(O) <= Date.now())) {
          K.value = "请选择未来的提醒时间。";
          return;
        }
        if (k.taskId === u.taskId) {
          v.value = !0, K.value = "";
          try {
            if (await ct.setReminder(O), k.taskId !== u.taskId) return;
            k.error ? K.value = k.error : k.reminderTime === O && f("close");
          } finally {
            v.value = !1;
          }
        }
      }
    }
    return (O, T) => (r(), Ot(Le, {
      anchor: a.anchor,
      onClose: T[9] || (T[9] = (A) => f("close"))
    }, {
      default: le(() => [
        t("section", Ki, [
          T[11] || (T[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", Fi, [
            t("button", {
              type: "button",
              onClick: T[0] || (T[0] = (A) => V(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: T[1] || (T[1] = (A) => V(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: T[2] || (T[2] = (A) => V("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: v.value }, [
            T[10] || (T[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Jt(Pe, {
              modelValue: x.value,
              "onUpdate:modelValue": T[3] || (T[3] = (A) => x.value = A),
              "time-value": U.value,
              "onUpdate:timeValue": T[4] || (T[4] = (A) => U.value = A),
              embedded: "",
              onTimeValidity: T[5] || (T[5] = (A) => G.value = A)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, Yi),
          t("div", Xi, p(N.value || "选择提醒的日期和时间"), 1),
          T[12] || (T[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          K.value ? (r(), c("p", Gi, p(K.value), 1)) : _("", !0),
          t("footer", null, [
            a.value ? (r(), c("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: v.value || !!e(Q).pendingWrites,
              onClick: T[6] || (T[6] = (A) => z(""))
            }, "移除提醒", 8, qi)) : _("", !0),
            t("button", {
              type: "button",
              disabled: v.value,
              onClick: T[7] || (T[7] = (A) => f("close"))
            }, "取消", 8, Qi),
            t("button", {
              type: "button",
              class: "save",
              disabled: v.value || !!e(Q).pendingWrites || !x.value || !U.value || !G.value,
              onClick: T[8] || (T[8] = (A) => z(x.value + "T" + U.value))
            }, p(v.value ? "保存中…" : "设置提醒"), 9, Ji)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), ta = /* @__PURE__ */ ee(Zi, [["__scopeId", "data-v-da9e3ddd"]]), ea = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, oa = { class: "inspector-main-col" }, na = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, sa = {
  key: 1,
  class: "inspector-repo-badges"
}, ia = ["title", "onClick"], aa = { class: "repo-badge-name" }, la = { class: "inspector-section inspector-title-section" }, ra = { class: "task-title-row" }, da = ["title"], ca = {
  key: 0,
  class: "check-mark"
}, ua = ["value", "aria-label", "disabled", "placeholder"], pa = ["value", "placeholder", "disabled"], ma = ["onKeydown"], fa = {
  key: 0,
  class: "desc-placeholder-btn"
}, va = ["innerHTML"], ga = {
  key: 2,
  role: "status"
}, ba = {
  key: 3,
  class: "attached-img-grid"
}, ka = ["onClick"], ya = ["src", "alt"], ha = { class: "attached-img-info" }, wa = ["onClick"], Ta = { class: "inspector-section inspector-subtasks-section" }, Da = {
  key: 0,
  class: "subtasks-list"
}, xa = ["onClick"], Ca = {
  key: 0,
  class: "check-tick"
}, $a = { class: "subtask-content-text" }, Sa = ["title", "onClick"], _a = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Ia = ["value", "placeholder"], Ra = { class: "subtask-actions" }, La = { class: "inspector-section inspector-comments-section" }, Pa = { class: "comment-input-bar" }, Ma = { class: "comment-input-wrap" }, Oa = ["value", "placeholder", "disabled"], Aa = ["title"], ja = ["disabled"], Ea = {
  key: 0,
  class: "comments-list"
}, Wa = { class: "comment-item-content" }, Ua = { class: "comment-item-header" }, Ba = { class: "comment-time" }, za = { class: "comment-text" }, Ha = {
  key: 0,
  class: "comment-attached-thumb"
}, Na = ["src", "onClick"], Va = { class: "inspector-side-col" }, Ka = { class: "side-prop-group date-picker-anchor" }, Fa = { class: "row-text" }, Ya = { class: "side-prop-group date-picker-anchor" }, Xa = { class: "row-text" }, Ga = ["title"], qa = { class: "side-prop-group" }, Qa = { class: "side-prop-label" }, Ja = { class: "row-text" }, Za = { class: "inspector-menu" }, tl = ["disabled", "onClick"], el = { key: 0 }, ol = { class: "side-prop-group" }, nl = { class: "side-prop-label" }, sl = { class: "row-text" }, il = { class: "inspector-menu" }, al = ["placeholder", "aria-label", "onKeydown"], ll = { key: 0 }, rl = {
  key: 1,
  role: "alert"
}, dl = { class: "label-options-list" }, cl = ["checked", "disabled", "onChange"], ul = ["disabled"], pl = { key: 3 }, ml = { class: "side-prop-group" }, fl = { class: "side-prop-label" }, vl = { class: "row-text" }, gl = /* @__PURE__ */ Ht({
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
  setup(a, { emit: s }) {
    const u = a, f = s, $ = M(!1), x = M(null), U = M(null);
    let v;
    te(() => {
      let B = -1;
      v = new ResizeObserver((l) => {
        const g = l[0]?.contentRect.width;
        g !== B && (B = g, N(U.value), N(x.value));
      }), U.value?.parentElement && v.observe(U.value.parentElement);
    }), Bt(() => v?.disconnect());
    const K = lt(() => {
      if (!u.editDescription) return "";
      const B = u.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), l = document.createElement("template");
      l.innerHTML = Uo.renderMarkdown(B);
      const g = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const q of Array.from(l.content.querySelectorAll("*"))) {
        if (!g.has(q.tagName)) {
          q.replaceWith(document.createTextNode(q.textContent || ""));
          continue;
        }
        const It = q.tagName === "A" ? q.getAttribute("href") : null;
        for (const jt of Array.from(q.attributes)) q.removeAttribute(jt.name);
        It && /^(https?:\/\/|mailto:)/i.test(It) && (q.setAttribute("href", It), q.setAttribute("target", "_blank"), q.setAttribute("rel", "noopener noreferrer"));
      }
      return l.innerHTML;
    });
    function G() {
      $.value = !0, Rt(() => {
        N(x.value), x.value?.focus();
      });
    }
    function N(B) {
      B && (B.style.height = "auto", B.style.height = B.scrollHeight + "px");
    }
    function V(B) {
      N(B.el);
    }
    function z(B) {
      const l = B.target;
      N(l), f("update:editDescription", l.value), f("scheduleDraftSave", B);
    }
    function O() {
      f("saveTitleAndDesc"), $.value = !1;
    }
    const T = M(!1), A = M(!1), y = M(null), L = M(null), H = M(!1), I = M(!1), D = M(!1), Z = M(""), rt = M(null), C = M(null), yt = M(null), h = M([]), wt = M(!1), S = M("");
    let E;
    pt(() => [u.state.taskId, I.value], async (B, l, g) => {
      if (E?.abort(), !I.value) return;
      const q = new AbortController();
      E = q, g(() => q.abort()), h.value = [], wt.value = !0, S.value = "";
      try {
        const It = await at.getLabels(q.signal);
        q.signal.aborted || (h.value = It.map((jt) => jt.name));
      } catch {
        q.signal.aborted || (S.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        q.signal.aborted || (wt.value = !1);
      }
    });
    function P() {
      D.value = !0;
    }
    const W = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function F(B) {
      switch (B) {
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
    function nt(B) {
      H.value = !1, f("selectPriority", B);
    }
    const dt = lt(() => {
      const B = /* @__PURE__ */ new Set([...h.value, ...u.availableLabels || []]);
      for (const l of u.state.labels || []) B.add(l);
      return Array.from(B);
    }), mt = lt(() => {
      const B = Z.value.trim().toLowerCase();
      return B ? dt.value.filter((l) => l.toLowerCase().includes(B)) : dt.value;
    });
    function xt() {
      const B = Z.value.trim();
      B && (f("createLabel", B), Z.value = "");
    }
    function ot(B, l) {
      Me.open(B, l);
    }
    const st = M(0);
    function _t() {
      st.value++;
    }
    te(() => {
      window.addEventListener("storage", _t), window.addEventListener("todoist-repository-links-changed", _t);
    }), Bt(() => {
      window.removeEventListener("storage", _t), window.removeEventListener("todoist-repository-links-changed", _t);
    });
    const At = lt(() => (st.value, oo(u.state.taskId, u.editDescription)));
    function zt(B) {
      no.open(B);
    }
    function Nt(B, l) {
      if (!B) return "";
      try {
        const g = B.split("-"), q = parseInt(g[1], 10), It = parseInt(g[2], 10), jt = l ? ` ${l}` : "";
        return `${q}月${It}日${jt}`;
      } catch {
        return B;
      }
    }
    function Tt(B) {
      if (!B) return "";
      try {
        const l = new Date(B);
        return `${l.getMonth() + 1}月${l.getDate()}日 ${String(l.getHours()).padStart(2, "0")}:${String(l.getMinutes()).padStart(2, "0")}`;
      } catch {
        return B;
      }
    }
    function oe(B) {
      if (!B) return "刚刚";
      try {
        const l = new Date(B);
        return `${l.getMonth() + 1}月${l.getDate()}日 ${String(l.getHours()).padStart(2, "0")}:${String(l.getMinutes()).padStart(2, "0")}`;
      } catch {
        return B;
      }
    }
    return (B, l) => a.state.isOpen ? (r(), c("div", ea, [
      t("main", oa, [
        a.state.error ? (r(), c("p", na, p(a.state.error), 1)) : _("", !0),
        At.value.length ? (r(), c("div", sa, [
          (r(!0), c(it, null, ut(At.value, (g) => (r(), c("button", {
            key: g.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(m)("todoist.linkRepoTitle", { name: g.fullName }),
            onClick: (q) => zt(g.fullName)
          }, [
            l[38] || (l[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", aa, p(g.fullName), 1),
            l[39] || (l[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, ia))), 128))
        ])) : _("", !0),
        t("section", la, [
          t("div", ra, [
            t("button", {
              type: "button",
              class: J(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: e(m)("todoist.toggleComplete"),
              onClick: l[0] || (l[0] = (g) => f("toggleComplete"))
            }, [
              a.isTaskCompleted ? (r(), c("span", ca, "✓")) : _("", !0)
            ], 10, da),
            t("textarea", {
              value: a.editTitle,
              rows: "1",
              "aria-label": e(m)("todoist.taskTitle"),
              onVnodeMounted: V,
              onVnodeUpdated: V,
              disabled: a.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: U,
              class: J(["inspector-input-title", { "title-done": a.isTaskCompleted }]),
              placeholder: e(m)("todoist.taskTitle"),
              onInput: l[1] || (l[1] = (g) => {
                N(g.target), f("update:editTitle", g.target.value), f("scheduleDraftSave", g);
              }),
              onCompositionend: l[2] || (l[2] = (g) => f("scheduleDraftSave", g)),
              onBlur: l[3] || (l[3] = (g) => f("saveTitleAndDesc", g)),
              onKeydown: l[4] || (l[4] = St(X((g) => f("saveTitleAndDesc", g), ["prevent"]), ["enter"]))
            }, null, 42, ua)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: l[7] || (l[7] = X((g) => f("dragover"), ["prevent"])),
          onDragleave: l[8] || (l[8] = X((g) => f("dragleave"), ["prevent"])),
          onDrop: l[9] || (l[9] = X((g) => f("dropImage", g), ["prevent"]))
        }, [
          $.value ? (r(), c("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: x,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(m)("todoist.taskDesc"),
            disabled: a.isUploadingImg,
            onInput: z,
            onCompositionend: l[5] || (l[5] = (g) => f("scheduleDraftSave", g)),
            onBlur: O,
            onPaste: l[6] || (l[6] = (g) => f("descPaste", g))
          }, null, 40, pa)) : (r(), c("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: G,
            onKeydown: St(X(G, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (r(), c("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: K.value
            }, null, 8, va)) : (r(), c("span", fa, "≡ 描述"))
          ], 40, ma)),
          a.isUploadingImg ? (r(), c("small", ga, "图片上传中…")) : _("", !0),
          a.attachedImages.length ? (r(), c("div", ba, [
            (r(!0), c(it, null, ut(a.attachedImages, (g) => (r(), c("div", {
              key: g.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (q) => ot(g.url, g.name)
              }, [
                t("img", {
                  src: g.url,
                  alt: g.name,
                  loading: "lazy"
                }, null, 8, ya)
              ], 8, ka),
              t("div", ha, [
                t("span", null, p(g.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (q) => f("removeAttachedImage", g.url)
                }, "×", 8, wa)
              ])
            ]))), 128))
          ])) : _("", !0)
        ], 32),
        t("section", Ta, [
          a.subtasks.length > 0 ? (r(), c("div", Da, [
            (r(!0), c(it, null, ut(a.subtasks, (g) => (r(), c("div", {
              key: g.id,
              class: J(["subtask-row-item", { done: g.completed }])
            }, [
              t("button", {
                type: "button",
                class: J(["subtask-check-circle", { checked: g.completed }]),
                onClick: (q) => f("toggleSubtask", g.id)
              }, [
                g.completed ? (r(), c("span", Ca, "✓")) : _("", !0)
              ], 10, xa),
              t("span", $a, p(g.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(m)("todoist.subtask.delete"),
                onClick: (q) => f("removeSubtask", g.id)
              }, "×", 8, Sa)
            ], 2))), 128))
          ])) : _("", !0),
          a.isAddingSubtask ? (r(), c("div", _a, [
            t("input", {
              value: a.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(m)("todoist.subtask.inputPlaceholder"),
              onInput: l[10] || (l[10] = (g) => f("update:newSubtaskText", g.target.value)),
              onKeydown: [
                l[11] || (l[11] = St(X((g) => f("confirmAddSubtask"), ["prevent"]), ["enter"])),
                l[12] || (l[12] = St((g) => f("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Ia),
            t("div", Ra, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: l[13] || (l[13] = (g) => f("confirmAddSubtask"))
              }, p(e(m)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: l[14] || (l[14] = (g) => f("update:isAddingSubtask", !1))
              }, p(e(m)("common.cancel")), 1)
            ])
          ])) : (r(), c("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: l[15] || (l[15] = (g) => f("update:isAddingSubtask", !0))
          }, [
            l[40] || (l[40] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Ut(" " + p(e(m)("todoist.subtask.add")), 1)
          ]))
        ]),
        (r(), Ot(Eo, {
          key: a.state.taskId,
          "task-id": a.state.taskId,
          description: a.editDescription,
          title: a.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", La, [
          t("div", Pa, [
            l[41] || (l[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Ma, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(m)("todoist.comment.placeholder"),
                disabled: a.isSubmittingComment,
                onInput: l[16] || (l[16] = (g) => f("update:newCommentText", g.target.value)),
                onKeydown: l[17] || (l[17] = St(X((g) => f("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Oa),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(m)("todoist.comment.attachPhoto"),
                onClick: l[18] || (l[18] = X((g) => f("triggerFileInput"), ["stop"]))
              }, "📎", 8, Aa)
            ]),
            a.newCommentText.trim() ? (r(), c("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: l[19] || (l[19] = (g) => f("submitComment"))
            }, p(e(m)("todoist.comment.send")), 9, ja)) : _("", !0)
          ]),
          a.state.comments.length > 0 ? (r(), c("div", Ea, [
            (r(!0), c(it, null, ut(a.state.comments, (g) => (r(), c("div", {
              key: g.id,
              class: "comment-item"
            }, [
              l[43] || (l[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", Wa, [
                t("div", Ua, [
                  l[42] || (l[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", Ba, p(oe(g.postedAt)), 1)
                ]),
                t("div", za, p(g.content), 1),
                g.attachment?.url ? (r(), c("div", Ha, [
                  t("img", {
                    src: g.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (q) => ot(g.attachment.url, g.attachment.name)
                  }, null, 8, Na)
                ])) : _("", !0)
              ])
            ]))), 128))
          ])) : _("", !0)
        ])
      ]),
      t("aside", Va, [
        t("div", Ka, [
          l[45] || (l[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: y,
            type: "button",
            class: J(["side-item-row click-row", { active: T.value, filled: !!a.editStartDate }]),
            onClick: l[21] || (l[21] = (g) => T.value = !T.value)
          }, [
            l[44] || (l[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", Fa, p(Nt(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (r(), c("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: l[20] || (l[20] = X((g) => f("clearStartDate"), ["stop"]))
            }, "×")) : _("", !0)
          ], 2),
          T.value ? (r(), Ot(Pe, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": y.value,
            "onUpdate:modelValue": l[22] || (l[22] = (g) => f("update:editStartDate", g)),
            "onUpdate:timeValue": l[23] || (l[23] = (g) => f("update:editStartTime", g)),
            onChange: l[24] || (l[24] = (g) => f("startChange")),
            onClose: l[25] || (l[25] = (g) => T.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", Ya, [
          l[47] || (l[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: L,
            type: "button",
            class: J(["side-item-row click-row", { active: A.value, filled: !!a.editDueDate }]),
            onClick: l[27] || (l[27] = (g) => A.value = !A.value)
          }, [
            l[46] || (l[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", Xa, p(Nt(a.editDueDate, a.editDueTime) || e(m)("todoist.prop.setDueDate")), 1),
            a.editDueDate ? (r(), c("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(m)("todoist.prop.clearDueDate"),
              onClick: l[26] || (l[26] = X((g) => f("clearDueDate"), ["stop"]))
            }, "×", 8, Ga)) : _("", !0)
          ], 2),
          A.value ? (r(), Ot(Pe, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": L.value,
            "onUpdate:modelValue": l[28] || (l[28] = (g) => f("update:editDueDate", g)),
            "onUpdate:timeValue": l[29] || (l[29] = (g) => f("update:editDueTime", g)),
            onChange: l[30] || (l[30] = (g) => f("dueChange")),
            onClose: l[31] || (l[31] = (g) => A.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", qa, [
          t("span", Qa, p(e(m)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: yt,
            type: "button",
            class: "side-item-row",
            onClick: l[32] || (l[32] = (g) => H.value = !0)
          }, [
            t("span", {
              style: bt({ color: F(a.state.priority) })
            }, "⚑", 4),
            t("span", Ja, "P" + p(5 - a.state.priority), 1),
            l[48] || (l[48] = t("span", null, "⌄", -1))
          ], 512),
          H.value ? (r(), Ot(Le, {
            key: 0,
            anchor: yt.value,
            onClose: l[33] || (l[33] = (g) => H.value = !1)
          }, {
            default: le(() => [
              t("div", Za, [
                (r(), c(it, null, ut(W, (g) => t("button", {
                  key: g.level,
                  type: "button",
                  disabled: !!e(Q).pendingWrites,
                  onClick: (q) => nt(g.level)
                }, [
                  t("span", {
                    style: bt({ color: g.color })
                  }, "⚑", 4),
                  Ut(" " + p(g.name) + " ", 1),
                  a.state.priority === g.level ? (r(), c("span", el, "✓")) : _("", !0)
                ], 8, tl)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", ol, [
          t("span", nl, p(e(m)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: rt,
            type: "button",
            class: "side-item-row",
            onClick: l[34] || (l[34] = (g) => I.value = !0)
          }, [
            t("span", sl, p(a.state.labels.join("、") || e(m)("todoist.prop.addLabels")), 1),
            l[49] || (l[49] = t("span", null, "＋", -1))
          ], 512),
          I.value ? (r(), Ot(Le, {
            key: 0,
            anchor: rt.value,
            onClose: l[36] || (l[36] = (g) => I.value = !1)
          }, {
            default: le(() => [
              t("div", il, [
                Mt(t("input", {
                  "onUpdate:modelValue": l[35] || (l[35] = (g) => Z.value = g),
                  placeholder: e(m)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(m)("todoist.prop.searchLabelAria"),
                  onKeydown: St(X(xt, ["prevent"]), ["enter"])
                }, null, 40, al), [
                  [Yt, Z.value]
                ]),
                wt.value ? (r(), c("small", ll, p(e(m)("todoist.prop.readingLabels")), 1)) : _("", !0),
                S.value ? (r(), c("p", rl, p(S.value), 1)) : _("", !0),
                t("div", dl, [
                  (r(!0), c(it, null, ut(mt.value, (g) => (r(), c("label", {
                    key: g,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + p(g), 1),
                    t("input", {
                      type: "checkbox",
                      checked: a.state.labels.includes(g),
                      disabled: !!e(Q).pendingWrites,
                      onChange: (q) => f("toggleLabelSelect", g)
                    }, null, 40, cl)
                  ]))), 128))
                ]),
                Z.value.trim() && !dt.value.includes(Z.value.trim()) ? (r(), c("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(Q).pendingWrites,
                  onClick: xt
                }, p(e(m)("todoist.prop.createLabelBtn", { name: Z.value.trim() })), 9, ul)) : _("", !0),
                !wt.value && !mt.value.length && !Z.value ? (r(), c("small", pl, p(e(m)("todoist.prop.noLabels")), 1)) : _("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", ml, [
          t("span", fl, [
            Ut(p(e(m)("todoist.prop.reminder")) + " ", 1),
            t("small", null, p(e(m)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: C,
            type: "button",
            class: "side-item-row",
            onClick: P
          }, [
            t("span", vl, p(Tt(a.state.reminderTime) || e(m)("todoist.prop.addReminder")), 1),
            l[50] || (l[50] = t("span", null, "＋", -1))
          ], 512),
          D.value ? (r(), Ot(ta, {
            key: 0,
            anchor: C.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: l[37] || (l[37] = (g) => D.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : _("", !0)
        ])
      ])
    ])) : _("", !0);
  }
}), bl = /* @__PURE__ */ ee(gl, [["__scopeId", "data-v-817d9116"]]), kl = { class: "inspector-title-row" }, yl = ["title", "aria-label"], hl = ["disabled"], wl = ["href"], Tl = "todoistInspectorPositionV2", Dl = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const s = k, u = lt(() => Pt.get(s.taskId)), f = lt(() => u.value?.status === "failed" ? "保存未确认" : u.value?.status === "saving" ? "正在保存…" : N.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), $ = lt(() => [
      f.value,
      u.value?.status === "failed" ? u.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: x,
      headerRef: U,
      initialStyle: v,
      onHeaderPointerDown: K,
      onResizePointerDown: G
    } = to({
      windowId: "todoist-inspector",
      storageKey: Tl,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => s.isOpen && Q.active
    }), N = M(""), V = M(""), z = M(""), O = M(""), T = M(""), A = M(""), y = M(!1), L = M(!1), H = M(null), I = M(!1), D = M(""), Z = M(""), rt = M(!1), C = lt(() => {
      const w = s.description || "", b = [], R = w.split(`
`);
      let ft = 0;
      for (const Ct of R) {
        const vt = Ct.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        vt && b.push({
          id: `st_${ft++}`,
          completed: vt[1].toLowerCase() === "x",
          text: vt[2].trim()
        });
      }
      return b;
    }), yt = lt(() => C.value.filter((w) => w.completed).length);
    function h(w) {
      const ft = (s.description || "").split(`
`).filter((Gt) => !Gt.match(/^\s*-\s*\[([ xX])\]/)), Ct = w.map((Gt) => `- [${Gt.completed ? "x" : " "}] ${Gt.text}`), vt = [...ft, ...Ct].join(`
`).trim();
      V.value = vt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), ct.saveTitleAndDesc(N.value, vt);
    }
    function wt() {
      if (!D.value.trim()) return;
      const w = [...C.value, {
        id: `st_${Date.now()}`,
        text: D.value.trim(),
        completed: !1
      }];
      D.value = "", I.value = !1, h(w);
    }
    function S(w) {
      const b = C.value.map((R) => R.id === w ? { ...R, completed: !R.completed } : R);
      h(b);
    }
    function E(w) {
      const b = C.value.filter((R) => R.id !== w);
      h(b);
    }
    const P = lt(() => {
      for (const w of kt.columns || []) {
        const b = w.tasks.find((R) => R.id === s.taskId);
        if (b) return !!b.completed;
      }
      return !1;
    });
    async function W() {
      for (const w of kt.columns || []) {
        const b = w.tasks.find((R) => R.id === s.taskId);
        if (b) {
          const R = !b.completed;
          b.completed = R, b._taskRaw && (b._taskRaw.checked = R);
          try {
            await at.toggleTaskCompletion(b.id, R);
          } catch {
            b.completed = !R, b._taskRaw && (b._taskRaw.checked = !R), s.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function F(w) {
      ct.setPriority(w);
    }
    function nt(w) {
      ct.toggleLabel(w);
    }
    function dt(w) {
      ct.toggleLabel(w);
    }
    async function mt(w) {
      w.trim() && (s.labels.includes(w.trim()) || await ct.createAndAttachLabel(w.trim()));
    }
    async function xt() {
      if (!Z.value.trim() || rt.value) return;
      const w = Z.value.trim();
      rt.value = !0;
      try {
        await ct.addComment(w), Z.value = "";
      } finally {
        rt.value = !1;
      }
    }
    pt(() => s.title, (w) => {
      N.value = w || "";
    }, { immediate: !0 }), pt(() => s.description, (w) => {
      V.value = (w || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), pt(() => s.startDate, (w) => {
      z.value = w || "";
    }, { immediate: !0 }), pt(() => s.startTime, (w) => {
      O.value = w || "";
    }, { immediate: !0 }), pt(() => s.dueDate, (w) => {
      T.value = w || "";
    }, { immediate: !0 }), pt(() => s.dueTime, (w) => {
      A.value = w || "";
    }, { immediate: !0 });
    function ot() {
      const w = /* @__PURE__ */ new Date();
      return `${w.getFullYear()}-${String(w.getMonth() + 1).padStart(2, "0")}-${String(w.getDate()).padStart(2, "0")}`;
    }
    function st() {
      O.value && !z.value && (z.value = ot()), ct.setStartDateAndTime(z.value, O.value);
    }
    function _t() {
      O.value = "", st();
    }
    function At() {
      z.value = "", O.value = "", st();
    }
    function zt() {
      A.value && !T.value && (T.value = ot()), ct.setDueDateAndTime(T.value, A.value);
    }
    function Nt() {
      A.value = "", zt();
    }
    function Tt() {
      T.value = "", A.value = "", zt();
    }
    const oe = lt(() => {
      const w = [], b = /* @__PURE__ */ new Set(), R = s.description || "", ft = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Ct;
      for (; (Ct = ft.exec(R)) !== null; ) {
        const vt = Ct[2];
        b.add(vt), w.push({
          name: Ct[1] || "任务照片",
          url: vt
        });
      }
      for (const vt of s.commentAttachments || [])
        b.has(vt.url) || (b.add(vt.url), w.push(vt));
      return w;
    });
    let B, l;
    function g() {
      const w = (s.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), b = [V.value.trim(), w].filter(Boolean);
      return {
        taskId: s.taskId,
        title: N.value,
        description: b.join(`

`)
      };
    }
    function q() {
      clearTimeout(B), B = void 0;
      const w = l;
      if (l = void 0, w?.taskId && w.title.trim())
        return ct.saveTitleAndDesc(w.title, w.description, w.taskId);
    }
    function It(w) {
      w && "isComposing" in w && w.isComposing || (l = g(), ct.stageTitleDraft(l.taskId, l.title, l.description), clearTimeout(B), B = setTimeout(q, 800));
    }
    pt(() => s.taskId, () => q(), { flush: "sync" });
    function jt() {
      q(), ct.close();
    }
    function ge(w) {
      w && "isComposing" in w && w.isComposing || q();
    }
    function be() {
      l = g(), q();
    }
    function ke(w) {
      const b = se(w);
      b && (w.preventDefault(), w.stopPropagation(), Vt(b));
    }
    function ye() {
      Q.active && H.value?.click();
    }
    async function ne(w) {
      const b = w.target;
      if (!Q.active) {
        b.value = "";
        return;
      }
      const R = b.files?.[0];
      R && await Vt(R), b.value = "";
    }
    async function he(w) {
      L.value = !1;
      const b = w.dataTransfer?.files?.[0];
      b && (b.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(b.name)) && await Vt(b);
    }
    function se(w) {
      const b = w.clipboardData;
      if (!b) return null;
      if (b.files && b.files.length > 0)
        for (let R = 0; R < b.files.length; R++) {
          const ft = b.files[R];
          if (ft.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(ft.name))
            return ft;
        }
      if (b.items && b.items.length > 0)
        for (let R = 0; R < b.items.length; R++) {
          const ft = b.items[R];
          if (ft.type.includes("image")) {
            const Ct = ft.getAsFile();
            if (Ct) return Ct;
          }
        }
      return null;
    }
    async function Vt(w) {
      if (y.value || !Q.active || !s.taskId) return;
      const b = s.taskId;
      y.value = !0;
      try {
        if (await q(), s.taskId !== b || !s.isOpen || !Q.active) return;
        await ct.attachImageToTask(w);
      } catch (R) {
        s.taskId === b && (s.error = R instanceof Error ? R.message : "上传失败");
      } finally {
        y.value = !1;
      }
    }
    function de(w) {
      const b = se(w);
      b && (w.preventDefault(), Vt(b));
    }
    function Kt(w) {
      if (!s.isOpen || !Q.active) return;
      const b = se(w);
      b && (w.preventDefault(), w.stopPropagation(), Vt(b));
    }
    pt(() => Q.active, (w) => {
      window.removeEventListener("paste", Kt, { capture: !0 }), w && window.addEventListener("paste", Kt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Bt(() => {
      q(), window.removeEventListener("paste", Kt, { capture: !0 });
    });
    async function Et(w) {
      const b = s.description || "", R = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ft = b.replace(new RegExp(`!\\[[^\\]]*\\]\\(${R}\\)`, "g"), "").trim();
      await ct.saveTitleAndDesc(s.title, ft);
    }
    return (w, b) => Mt((r(), c("aside", {
      ref_key: "panelRef",
      ref: x,
      class: "todoist-inspector-window",
      style: bt(e(v)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: de
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: U,
        class: "inspector-header",
        onPointerdown: b[2] || (b[2] = (R) => e(K)(R))
      }, [
        t("div", kl, [
          b[18] || (b[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          u.value ? (r(), c("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: b[0] || (b[0] = X(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: $.value,
              "aria-label": $.value
            }, p(f.value), 9, yl),
            u.value.status !== "saving" ? (r(), c("button", {
              key: 0,
              type: "button",
              disabled: e(s).saving || !N.value.trim(),
              onClick: X(be, ["stop"])
            }, p(u.value.status === "failed" ? "重试保存" : "保存草稿"), 9, hl)) : _("", !0)
          ], 32)) : _("", !0),
          e(s).url ? (r(), c("a", {
            key: 1,
            href: e(s).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, wl)) : _("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: b[1] || (b[1] = X(() => {
          }, ["stop"])),
          onClick: X(jt, ["stop"])
        }, "×", 32)
      ], 544),
      e(s).isOpen ? (r(), Ot(bl, {
        key: e(s).taskId,
        state: e(s),
        "edit-title": N.value,
        "onUpdate:editTitle": b[3] || (b[3] = (R) => N.value = R),
        "edit-description": V.value,
        "onUpdate:editDescription": b[4] || (b[4] = (R) => V.value = R),
        "edit-start-date": z.value,
        "onUpdate:editStartDate": b[5] || (b[5] = (R) => z.value = R),
        "edit-start-time": O.value,
        "onUpdate:editStartTime": b[6] || (b[6] = (R) => O.value = R),
        "edit-due-date": T.value,
        "onUpdate:editDueDate": b[7] || (b[7] = (R) => T.value = R),
        "edit-due-time": A.value,
        "onUpdate:editDueTime": b[8] || (b[8] = (R) => A.value = R),
        "is-uploading-img": y.value,
        "is-drag-over": L.value,
        "is-task-completed": P.value,
        subtasks: C.value,
        "completed-subtasks-count": yt.value,
        "is-adding-subtask": I.value,
        "onUpdate:isAddingSubtask": b[9] || (b[9] = (R) => I.value = R),
        "new-subtask-text": D.value,
        "onUpdate:newSubtaskText": b[10] || (b[10] = (R) => D.value = R),
        "new-comment-text": Z.value,
        "onUpdate:newCommentText": b[11] || (b[11] = (R) => Z.value = R),
        "is-submitting-comment": rt.value,
        "attached-images": oe.value,
        "available-labels": e(kt).availableLabels || [],
        onScheduleDraftSave: It,
        onSaveTitleAndDesc: ge,
        onToggleComplete: W,
        onTriggerFileInput: ye,
        onDragover: b[12] || (b[12] = (R) => L.value = !0),
        onDragleave: b[13] || (b[13] = (R) => L.value = !1),
        onDropImage: he,
        onDescPaste: ke,
        onRemoveAttachedImage: Et,
        onToggleSubtask: S,
        onRemoveSubtask: E,
        onConfirmAddSubtask: wt,
        onSubmitComment: xt,
        onStartChange: st,
        onClearStartDate: At,
        onClearStartTime: _t,
        onDueChange: zt,
        onClearDueDate: Tt,
        onClearDueTime: Nt,
        onSelectPriority: F,
        onToggleLabelSelect: nt,
        onRemoveLabel: dt,
        onCreateLabel: mt
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : _("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: H,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ne
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: b[14] || (b[14] = (R) => e(G)(R, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: b[15] || (b[15] = (R) => e(G)(R, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: b[16] || (b[16] = (R) => e(G)(R, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: b[17] || (b[17] = (R) => e(G)(R, "w"))
      }, null, 32)
    ], 36)), [
      [Re, e(s).isOpen]
    ]);
  }
}), xl = /* @__PURE__ */ ee(Dl, [["__scopeId", "data-v-35222deb"]]), Cl = { class: "vue-todoist-workspace-wrapper" }, $l = ["aria-label"], Sl = { class: "todoist-head-title-wrap" }, _l = { id: "todoist-workspace-title" }, Il = ["aria-label"], Rl = ["title"], Ll = {
  class: "muted small",
  role: "status"
}, Pl = ["title", "aria-expanded"], Ml = ["title"], Ol = ["title"], Al = ["title"], jl = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, El = { class: "todoist-workspace-cal-area" }, Wl = { class: "todoist-workspace-task-area" }, Ul = "todoistWorkspacePosition", or = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspace",
  setup(a) {
    const s = M(!1), u = ho(() => import("./TodoistAccountSettings-BhDjpcuQ.js")), f = M(!1), $ = M(!1), x = M(!document.hidden), U = M(!1), v = lt(() => Q.visible && x.value);
    Q.session++, Q.active = v.value, eo(
      () => v.value && !kt.movingTaskId,
      Zt,
      () => tt.loadWorkspace(void 0, void 0, !0)
    );
    let K = !1;
    const G = M(null), N = Io;
    function V() {
      z.value && (z.value.style.removeProperty("width"), z.value.style.removeProperty("height"), z.value.style.removeProperty("left"), z.value.style.removeProperty("top"), z.value.style.removeProperty("right"), z.value.style.removeProperty("bottom"), z.value.style.removeProperty("margin"), z.value.style.removeProperty("transform"));
    }
    pt(() => Q.visible, (P) => {
      P && (N.isOpen = !0, Q.active = x.value, tt.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: z,
      headerRef: O,
      initialStyle: T,
      stopInteractions: A,
      onHeaderPointerDown: y,
      onResizePointerDown: L,
      bringToFront: H
    } = to({
      windowId: "todoist",
      storageKey: Ul,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => v.value
    }), I = () => z.value;
    function D() {
      Zt(), So(), _o(), ct.cancelReads(), A(), window.removeEventListener("keydown", C);
    }
    const Z = Do(D);
    function rt() {
      x.value = !document.hidden;
    }
    function C(P) {
      P.key === "Escape" && k.isOpen && (P.preventDefault(), P.stopPropagation(), ct.close());
    }
    pt(v, (P) => {
      Q.active = P, P ? (window.addEventListener("keydown", C), K || (K = !0, tt.loadWorkspace()), Rt(() => {
        v.value && H();
      })) : D();
    }, { flush: "sync" }), pt(f, (P) => {
      P && ($.value = !0);
    }), pt([v, s, Xe], ([P, W, F]) => {
      if (!(!P || !W || !F) && (Xe.value = null, Ro("todoist") === F.transition)) {
        if (Q.pendingWrites || k.isOpen && k.taskId !== F.id) {
          Mo.show({ appName: "Todoist", title: m("todoist.retainDetailTitle"), message: m("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        k.isOpen && k.taskId === F.id || ct.openTask(F.id);
      }
    }, { flush: "post" }), te(() => {
      s.value = !0, U.value && Rt(V), pe.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: I }), document.addEventListener("visibilitychange", rt), v.value && (window.addEventListener("keydown", C), K || (K = !0, tt.loadWorkspace()), Fe.refresh());
    }), Bt(() => {
      xo(), Z(), document.removeEventListener("visibilitychange", rt), pe.unregister("todoist", I), ct.close(), Object.assign(k, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), tt.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Se.updateState({ title: m("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Fe.update([]);
    });
    function yt() {
      Se.toggleCalendar();
    }
    function h() {
      Se.refresh();
    }
    function wt() {
      tt.updateState({ accountConfigured: !0 }), v.value && tt.loadWorkspace(void 0, void 0, !0);
    }
    function S() {
      pe.minimize("todoist");
    }
    function E() {
      Q.visible = !1, N.isOpen = !1, pe.close("todoist");
    }
    return (P, W) => (r(), c("div", Cl, [
      Mt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: z,
        class: "card wide todoist-workspace",
        style: bt(e(T)),
        "aria-label": e(m)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: O,
          class: "todoist-workspace-head",
          onPointerdown: W[4] || (W[4] = (F) => e(y)(F))
        }, [
          t("div", Sl, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", _l, p(e(N).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(m)("todoist.viewAria")
          }, [
            Jt(Vo)
          ], 8, Il),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: J(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(N).isCalendarOpen }]),
            type: "button",
            title: e(m)("todoist.calendarToggleTitle"),
            onClick: yt
          }, " 📅 " + p(e(m)("todoist.calendar")), 11, Rl),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Ll, p(e(Q).pendingWrites ? e(m)("todoist.pendingWrites") : e(m)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: G,
            type: "button",
            class: "no-drag",
            title: e(m)("todoist.settingsTitle"),
            "aria-expanded": f.value,
            onClick: W[0] || (W[0] = X((F) => f.value = !f.value, ["stop"]))
          }, " ⚙️ ", 8, Pl),
          $.value ? (r(), Ot(e(u), {
            key: 0,
            visible: v.value && f.value,
            anchor: G.value,
            onClose: W[1] || (W[1] = (F) => f.value = !1),
            onAccountSaved: wt
          }, null, 8, ["visible", "anchor"])) : _("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: e(m)("common.refresh"),
            onClick: h
          }, " ↻ ", 8, Ml),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(m)("todoist.minimizeHint"),
            onPointerdown: W[2] || (W[2] = X(() => {
            }, ["stop"])),
            onClick: X(S, ["stop"])
          }, " − ", 40, Ol),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(m)("todoist.closeHint"),
            onPointerdown: W[3] || (W[3] = X(() => {
            }, ["stop"])),
            onClick: X(E, ["stop"])
          }, " ✕ ", 40, Al)
        ], 544),
        e(kt).accountConfigured === !1 ? (r(), Ot(Lo, {
          key: 0,
          icon: "✅",
          title: e(m)("todoist.tokenMissingTitle"),
          description: e(m)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(m)("todoist.getToken"),
          onConfigure: W[5] || (W[5] = (F) => f.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), c("div", jl, [
          Mt(t("div", El, [
            Jt(En)
          ], 512), [
            [Re, e(N).isCalendarOpen]
          ]),
          t("div", Wl, [
            Jt(Vi)
          ])
        ])),
        Jt(xl),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        U.value ? _("", !0) : (r(), c(it, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: W[6] || (W[6] = (F) => e(L)(F, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: W[7] || (W[7] = (F) => e(L)(F, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: W[8] || (W[8] = (F) => e(L)(F, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: W[9] || (W[9] = (F) => e(L)(F, "w"))
          }, null, 32)
        ], 64))
      ], 12, $l), [
        [Re, e(Q).visible]
      ])
    ]));
  }
});
export {
  or as default
};
