import { d as Kt, f as r, g as p, F as st, h as t, u as e, s as J, t as v, r as Zt, w as dt, e as Mt, o as oe, m as Nt, i as rt, k as K, j as _, b as E, K as no, J as Ke, n as yt, x as Z, y as It, p as Lt, v as Gt, C as te, B as re, q as Ot, l as Et, A as Pe, E as So } from "./vendor-vue-BbmU9NUg.js";
import { a as $o, t as X, w as Io, o as Po, p as Ro } from "./module-state-C_zTFjJe.js";
import { b as Fe, i as Ye, j as ee, k as wt, e as tt, d as kt, c as Lo, l as Oo, t as Ge, g as Xe, h as Eo, m as Mo, n as Ao } from "./calendar.service-mpptDPpa.js";
import { u as so } from "./useWindowDraggable-BiFiOeBe.js";
import { w as pe, b as jo } from "./window-manager.store-D9RSYghK.js";
import { t as g, _ as ne } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { A as Wo } from "./AccountSetupGuide-BZKjVdlS.js";
import { i as Ee } from "./image-viewer-store-DRlIIbqo.js";
import { t as at, d as Uo, s as Bo, b as me, g as qe, f as $e, p as Vo } from "./todoist.service-Cfh1DEdI.js";
import { m as No, T as Ho } from "./task-resource-Cs4kzJPJ.js";
import { g as io, T as zo } from "./TaskRepositoryLinks-BDaoTVS7.js";
import { g as Ko } from "./bili-video-links-DXpyplJq.js";
import { g as Fo } from "./web-site-links-BSIympLj.js";
import { a as Yo, q as ao, w as Go, n as Xo } from "./github.service-DdJVB3Fj.js";
import { u as qo } from "./useMachine-DhSfBarp.js";
import { I as Re, T as Le } from "./TodoistDatePickerPopover-DREDvoQv.js";
import { m as Qo } from "./core-utils-KTt-RZby.js";
import { pendingTodoistTask as Qe } from "./task-navigation-CdFHuF0W.js";
const Jo = ["title"], Zo = { class: "todoist-tab-text" }, tn = ["title"], en = { class: "todoist-tab-text" }, on = /* @__PURE__ */ Kt({
  __name: "TodoistWorkspaceTabs",
  setup(i) {
    return (s, d) => (r(), p(st, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: J({ on: e(Ye).view === "inbox" }),
        title: e(g)("todoist.inbox"),
        onClick: d[0] || (d[0] = (f) => e(Fe).switchView("inbox"))
      }, [
        d[2] || (d[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", Zo, v(e(g)("todoist.inbox")), 1)
      ], 10, Jo),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: J({ on: e(Ye).view === "projects" }),
        title: e(g)("todoist.projects"),
        onClick: d[1] || (d[1] = (f) => e(Fe).switchView("projects"))
      }, [
        d[3] || (d[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", en, v(e(g)("todoist.projects")), 1)
      ], 10, tn)
    ], 64));
  }
}), lo = "todoist_reminder_v2:", nn = "todoist_remind_";
async function sn(i) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const s = lo + i, d = await chrome.storage.local.get([s, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(d, s) ? d[s] || void 0 : d.todoist_reminders_map_v1?.[i];
}
async function an(i, s, d) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const f = new Date(s).getTime();
  if (s && (!Number.isFinite(f) || f <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (s && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const h = lo + i, C = nn + i;
  await chrome.alarms.clear(C), await chrome.storage.local.set({ [h]: s ? { time: s, title: d } : null }), s && await chrome.alarms.create(C, { when: f });
}
const Rt = Zt(/* @__PURE__ */ new Map());
let ln = 0;
function Je(i, s, d, f = "editing") {
  const h = ++ln;
  return Rt.set(i, { revision: h, title: s, description: d, status: f, error: "" }), h;
}
const y = Zt({
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
let Ie = Promise.resolve(), ve = 0, Ze = Promise.resolve();
const fe = /* @__PURE__ */ new Map();
let de = 0;
const Xt = /* @__PURE__ */ new Map();
function le(i = !0) {
  i && de++;
  for (const s of Xt.values()) s.abort();
  Xt.clear(), y.loading = !1;
}
function to(i) {
  Xt.get(i)?.abort();
  const s = new AbortController();
  Xt.set(i, s);
  const d = de, f = y.taskId;
  return {
    signal: s.signal,
    current: () => !s.signal.aborted && d === de && y.isOpen && f === y.taskId && Xt.get(i) === s,
    finish: () => {
      Xt.get(i) === s && Xt.delete(i);
    }
  };
}
function Vt() {
  le(!1);
  const i = y.taskId, s = de;
  return { taskId: i, current: () => y.isOpen && s === de && i === y.taskId };
}
function rn(i) {
  return new Promise((s) => {
    const d = new FileReader();
    d.onload = () => s(d.result || ""), d.onerror = () => s(""), d.readAsDataURL(i);
  });
}
function eo(i, s, d) {
  for (const f of wt.columns)
    for (const h of f.tasks)
      String(h.id) === i && (h.content = s, d !== void 0 && (h.description = d), h._taskRaw && (h._taskRaw.content = s, d !== void 0 && (h._taskRaw.description = d)));
  kt.updateTaskTitle(i, s);
}
const dn = {
  state: y,
  cancelReads: le,
  stageTitleDraft(i, s, d) {
    i && (Je(i, s, d), le(!1), y.taskId === i && (y.title = s), eo(i, s, d));
  },
  async openTask(i, s) {
    if (!i) return;
    if (le(), y.taskId = i, y.isOpen = !0, y.error = "", Object.assign(y, {
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
      y.title = s.content || s.title || "", y.description = s.description || s.raw?.description || "", y.priority = s.priority || 1;
      const C = me(s.due?.datetime || s.due?.date || s.dueDate || "");
      y.dueDate = C.date, y.dueTime = C.time;
      const W = s.startDate || qe(i, y.description), L = me(W);
      y.startDate = L.date, y.startTime = L.time, y.labels = [...s.labels || []], y.url = s.url || "";
    }
    const d = Rt.get(i);
    d && (y.title = d.title, y.description = d.description);
    const f = to("reminder");
    sn(i).then((C) => {
      f.current() && (y.reminderTime = C?.time || "");
    }).catch(() => {
      f.current() && (y.error = "本机提醒读取失败。");
    }).finally(f.finish);
    const h = to("detail");
    y.loading = !0;
    try {
      const C = await at.api(`/tasks/${encodeURIComponent(i)}`, { signal: h.signal });
      if (C && h.current()) {
        const W = Rt.get(i);
        y.title = W?.title ?? C.content ?? "", y.description = W?.description ?? C.description ?? "", y.priority = C.priority || 1;
        const L = me(C.due?.datetime || C.due?.date || "");
        y.dueDate = L.date, y.dueTime = L.time;
        const U = qe(i, C.description || y.description), Y = me(U);
        y.startDate = Y.date, y.startTime = Y.time, y.labels = [...C.labels || []], y.url = C.url || "";
        try {
          const x = await at.getComments(i, h.signal);
          if (x && h.current()) {
            const N = [], F = [];
            for (const $ of x) {
              let T;
              if ($?.attachment?.file_url) {
                const R = $.attachment.file_name || "附件图片";
                N.push({ name: R, url: $.attachment.file_url }), T = { name: R, url: $.attachment.file_url };
              }
              F.push({
                id: $.id,
                content: $.content || "",
                postedAt: $.posted_at || "",
                attachment: T
              });
            }
            if (y.commentAttachments = N, y.comments = F, N.length > 0 && y.description) {
              let $ = y.description, T = !1;
              for (const R of N) {
                const w = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                w.test($) && ($ = $.replace(w, `$1${R.url}$2`), T = !0);
              }
              if (T && !Rt.has(i)) {
                y.description = $;
                for (const R of wt.columns) {
                  const w = R.tasks.find((I) => String(I.id) === i);
                  if (w) {
                    w.description = $, w._taskRaw && (w._taskRaw.description = $);
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
      h.current() && (y.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      h.current() && (y.loading = !1), h.finish();
    }
  },
  close() {
    le(), y.isOpen = !1, y.taskId = "";
  },
  async setStartDateAndTime(i, s) {
    if (!y.taskId) return;
    const d = Vt(), f = i.trim(), h = f ? s.trim() : "";
    y.startDate = f, y.startTime = h, ee();
    const C = Uo(f, h);
    Bo(d.taskId, C), at.invalidateWorkspaceSnapshots();
    for (const W of wt.columns) {
      const L = W.tasks.find((U) => U.id === d.taskId);
      L && (L.startDate = C);
    }
  },
  async setDueDateAndTime(i, s) {
    if (!y.taskId) return;
    const d = Vt(), f = i.trim(), h = f ? s.trim() : "";
    y.dueDate = f, y.dueTime = h, ee(), at.invalidateWorkspaceSnapshots();
    const C = (fe.get(d.taskId) || 0) + 1;
    fe.set(d.taskId, C);
    const W = Ze.then(async () => {
      try {
        const L = await at.updateTask(d.taskId, {
          due_string: f ? h ? `${f} ${h}` : f : "no date"
        });
        if (fe.get(d.taskId) !== C) return;
        const U = at.mapTasks([L], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const Y of wt.columns) {
          const x = Y.tasks.findIndex((F) => F.id === d.taskId);
          if (x < 0) continue;
          const N = Y.tasks[x];
          if (Object.assign(N, {
            dueDate: U.dueDate,
            dueText: U.dueText,
            dueString: U.dueString,
            isDueToday: U.isDueToday,
            isOverdue: U.isOverdue,
            isRecurring: U.isRecurring
          }), N._taskRaw && (N._taskRaw.due = L.due), wt.view === "today") {
            const F = U.isOverdue ? "overdue" : U.isDueToday ? "today" : "";
            F !== Y.sectionId && (Y.tasks.splice(x, 1), wt.columns.find(($) => $.sectionId === F)?.tasks.push(N));
          }
        }
        d.current() && (y.error = "");
      } catch {
        d.current() && fe.get(d.taskId) === C && (y.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Ze = W.catch(() => {
    }), await W;
  },
  async saveTitleAndDesc(i, s, d = y.taskId) {
    const f = d === y.taskId ? Vt() : { taskId: d, current: () => !1 };
    if (!f.taskId || !i.trim()) return;
    const h = i.trim(), C = s.trim(), W = Je(d, h, C, "saving");
    f.current() && (y.title = h, y.description = C), eo(f.taskId, h, C), ve++, y.saving = !0;
    const L = Ie.then(async () => {
      try {
        await at.updateTask(f.taskId, {
          content: h,
          description: C
        }), Rt.get(d)?.revision === W && Rt.delete(d), ve === 1 && Rt.size === 0 && tt.dispatch("refresh");
      } catch (U) {
        const Y = Rt.get(d);
        Y?.revision === W && (Y.status = "failed", Y.error = U instanceof Error ? U.message : "保存未确认");
      } finally {
        ve--, y.saving = ve > 0;
      }
    });
    Ie = L.catch(() => {
    }), await L;
  },
  async attachImageToTask(i) {
    const s = Vt();
    if (await Ie, !s.current()) return;
    if (Rt.has(s.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const d = y.description || "";
    if (!s.taskId || y.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    y.saving = !0;
    try {
      const f = i.name || `截图_${Date.now()}.png`;
      let h = "";
      try {
        const C = await at.uploadFile(i, f);
        C && C.file_url && (h = C.file_url);
      } catch (C) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", C), i.size <= 2.5 * 1024 * 1024)
          h = await rn(i);
        else
          throw new Error(C?.message || "云端上传失败且文件超过2.5MB");
      }
      if (h) {
        const C = d ? `${d}

![${f}](${h})` : `![${f}](${h})`;
        await at.updateTask(s.taskId, {
          description: C
        }), s.current() && (y.description = C);
        for (const W of wt.columns) {
          const L = W.tasks.find((U) => String(U.id) === s.taskId);
          if (L) {
            L.description = C, L._taskRaw && (L._taskRaw.description = C);
            break;
          }
        }
        tt.dispatch("refresh");
      }
    } catch (f) {
      s.current() && (y.error = f.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${f.message}`);
    } finally {
      y.saving = !1;
    }
  },
  async setPriority(i) {
    if (!y.taskId) return;
    const s = Vt();
    if (![1, 2, 3, 4].includes(i)) return;
    const d = y.priority;
    y.priority = i, ee(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { priority: i });
      for (const f of wt.columns) {
        const h = f.tasks.find((C) => C.id === s.taskId);
        h && (h.priority = i, h._taskRaw && (h._taskRaw.priority = i));
      }
    } catch {
      s.current() && (y.priority = d, y.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(i) {
    if (!y.taskId) return;
    const s = Vt(), d = [...y.labels], h = d.includes(i) ? d.filter((C) => C !== i) : [...d, i];
    y.labels = h, ee(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { labels: h });
      for (const C of wt.columns) {
        const W = C.tasks.find((L) => L.id === s.taskId);
        W && (W.labels = h, W._taskRaw && (W._taskRaw.labels = h));
      }
    } catch {
      s.current() && (y.labels = d, y.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(i) {
    const s = Vt();
    if (i = i.trim(), !(!s.taskId || !i))
      try {
        const d = await at.getLabels();
        if (!s.current()) return;
        d.some((f) => f.name === i) || await at.createLabel(i), s.current() && !y.labels.includes(i) && await this.toggleLabel(i);
      } catch {
        s.current() && (y.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(i) {
    if (!y.taskId || !i.trim()) return;
    const s = Vt();
    try {
      const d = await at.addComment({
        task_id: s.taskId,
        content: i.trim()
      });
      d && s.current() && y.comments.push({
        id: d.id || `c_${Date.now()}`,
        content: d.content || i.trim(),
        postedAt: d.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (d) {
      s.current() && (y.error = "发送评论失败：" + (d?.message || ""));
    }
  },
  async setReminder(i) {
    const s = Vt();
    if (s.taskId)
      try {
        await an(s.taskId, i, y.title), s.current() && (y.reminderTime = i, y.error = "");
      } catch (d) {
        s.current() && (y.error = d instanceof Error ? d.message : "提醒未保存，请重试。");
      }
  }
}, lt = $o(dn, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]);
function ro(i, s, d) {
  let f = !1, h;
  const C = dt(
    () => [X.dataRevision, i(), X.pendingWrites],
    ([W, L, U], Y) => {
      Y && W !== Y[0] && (f = !0, s()), h && clearTimeout(h), !(!f || !L || U) && (h = setTimeout(() => {
        h = void 0, !(!i() || X.pendingWrites) && (f = !1, d());
      }, 150));
    }
  );
  Mt(() => {
    C(), h && clearTimeout(h);
  });
}
const cn = ["aria-label"], un = { class: "todoist-cal-head" }, pn = { class: "todoist-cal-title-row" }, mn = { class: "todoist-cal-logo" }, vn = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, fn = { class: "todoist-cal-head-actions" }, gn = { class: "todoist-cal-nav" }, bn = { class: "todoist-cal-nav-group" }, kn = ["title"], yn = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, hn = ["title"], wn = { class: "todoist-cal-nav-group" }, Tn = ["title"], Dn = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, Cn = ["title"], xn = { class: "todoist-cal-weekdays" }, _n = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Sn = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], $n = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, In = { class: "todoist-cal-agenda" }, Pn = { class: "todoist-cal-agenda-head" }, Rn = { class: "todoist-cal-agenda-title" }, Ln = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, On = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, En = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, Mn = ["disabled"], An = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, jn = {
  key: 0,
  class: "todoist-cal-empty"
}, Wn = {
  key: 1,
  class: "todoist-cal-empty"
}, Un = ["onClick"], Bn = { class: "todoist-cal-todo-main" }, Vn = ["disabled", "title", "onClick"], Nn = {
  key: 0,
  class: "check-icon"
}, Hn = {
  key: 0,
  class: "todoist-cal-task-time"
}, zn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, Kn = ["title", "onClick"], Fn = ["src", "alt"], Yn = { class: "todoist-cal-thumb-tag" }, Gn = /* @__PURE__ */ Kt({
  __name: "TodoistCalendarSidebar",
  setup(i) {
    const s = Oo;
    ro(
      () => X.active,
      () => kt.invalidateReads(),
      () => kt.loadTodosForDate(s.selectedDate, !0)
    ), Mt(() => kt.cancelReads()), dt(() => [X.active, X.pendingWrites], ([T, R], w) => {
      if (!T || R) {
        kt.cancelReads();
        return;
      }
      kt.loadTodosForDate(s.selectedDate, !!w?.[1]);
    }, { immediate: !0, flush: "sync" });
    function d(T) {
      kt.toggleTodoItem(T);
    }
    function f(T) {
      lt.openTask(T.id, T);
    }
    oe(() => {
      Lo.syncSidebarToVue();
    });
    function h() {
      kt.dispatch("today");
    }
    function C() {
      kt.dispatch("prev-month");
    }
    function W() {
      kt.dispatch("next-month");
    }
    function L() {
      kt.dispatch("prev-year");
    }
    function U() {
      kt.dispatch("next-year");
    }
    function Y(T) {
      kt.dispatch("select-date", T);
    }
    function x(T, R) {
      kt.dispatch("context-date", {
        date: T,
        clientX: R.clientX,
        clientY: R.clientY
      });
    }
    function N(T, R) {
      const w = Array.from(R.dataTransfer?.types || []);
      (w.includes("application/x-todoist-task-id") || w.includes("text/plain")) && (R.preventDefault(), R.dataTransfer && (R.dataTransfer.dropEffect = "copy"));
    }
    function F(T) {
    }
    function $(T, R) {
      const w = R.dataTransfer?.getData("application/x-todoist-task-id") || R.dataTransfer?.getData("text/plain");
      w && (R.preventDefault(), R.stopPropagation(), kt.dispatch("drop-task", { taskId: w, date: T }));
    }
    return (T, R) => (r(), p("aside", {
      id: "todoist-calendar-sidebar",
      class: J(["todoist-calendar-sidebar", { collapsed: e(s).collapsed }]),
      "aria-label": e(g)("todoist.calendar.sidebarLabel")
    }, [
      t("div", un, [
        t("div", pn, [
          t("span", mn, [
            R[1] || (R[1] = Nt("📅 ", -1)),
            t("strong", null, v(e(g)("todoist.calendar.title")), 1)
          ]),
          t("span", vn, v(e(s).badgeText), 1)
        ]),
        t("div", fn, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: h
          }, v(e(g)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", gn, [
        t("div", bn, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.prevMonth"),
            onClick: C
          }, "‹", 8, kn),
          t("span", yn, v(e(s).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.nextMonth"),
            onClick: W
          }, "›", 8, hn)
        ]),
        t("div", wn, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.prevYear"),
            onClick: L
          }, "‹", 8, Tn),
          t("span", Dn, v(e(s).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.nextYear"),
            onClick: U
          }, "›", 8, Cn)
        ])
      ]),
      t("div", xn, [
        t("span", null, v(e(g)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, v(e(g)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, v(e(g)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, v(e(g)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, v(e(g)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, v(e(g)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, v(e(g)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", _n, [
        (r(!0), p(st, null, rt(e(s).cells, (w) => (r(), p("button", {
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
          onClick: (I) => Y(w.date),
          onContextmenu: K((I) => x(w.date, I), ["prevent"]),
          onDragover: (I) => N(w.date, I),
          onDragleave: (I) => (w.date, void 0),
          onDrop: (I) => $(w.date, I)
        }, [
          t("span", null, v(w.dayNumber), 1),
          w.hasDot ? (r(), p("span", $n)) : _("", !0)
        ], 42, Sn))), 128))
      ]),
      t("div", In, [
        t("div", Pn, [
          t("strong", Rn, v(e(s).agendaTitle), 1),
          t("span", Ln, v(e(g)("todoist.calendar.itemCount", { count: e(s).todoItems.length })), 1)
        ]),
        e(s).writeError ? (r(), p("p", On, v(e(s).writeError), 1)) : _("", !0),
        e(s).emptyText ? (r(), p("div", En, [
          Nt(v(e(s).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(s).todoLoading || e(X).pendingWrites > 0,
            onClick: R[0] || (R[0] = (w) => e(kt).loadTodosForDate(e(s).selectedDate, !0))
          }, v(e(g)("todoist.calendar.retryLoad")), 9, Mn)
        ])) : _("", !0),
        t("div", An, [
          e(s).todoLoading && !e(s).todoItems.length ? (r(), p("div", jn, v(e(g)("todoist.calendar.loading")), 1)) : e(s).todoItems.length === 0 && !e(s).emptyText ? (r(), p("div", Wn, v(e(g)("todoist.calendar.emptyDay")), 1)) : (r(!0), p(st, { key: 2 }, rt(e(s).todoItems, (w) => (r(), p("div", {
            key: w.id,
            class: J(["todoist-cal-todo-card", { completed: w.completed }]),
            onClick: (I) => f(w)
          }, [
            t("div", Bn, [
              t("button", {
                type: "button",
                class: J(["todoist-cal-check", { checked: w.completed }]),
                disabled: e(X).pendingWrites > 0,
                title: w.completed ? e(g)("todoist.calendar.clickToReopen") : e(g)("todoist.calendar.clickToComplete"),
                onClick: K((I) => d(w), ["stop"])
              }, [
                w.completed ? (r(), p("span", Nn, "✓")) : _("", !0)
              ], 10, Vn),
              t("span", {
                class: J(["todoist-cal-todo-title", { strike: w.completed }])
              }, v(w.content), 3),
              w.time ? (r(), p("small", Hn, v(w.time), 1)) : _("", !0),
              w.completed ? (r(), p("span", zn, v(e(g)("todoist.calendar.completedTag")), 1)) : _("", !0)
            ]),
            w.thumbUrl ? (r(), p("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(g)("todoist.calendar.viewPhoto"),
              onClick: K((I) => e(Ee).open(w.thumbUrl, w.content), ["stop"])
            }, [
              t("img", {
                src: w.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(g)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, Fn),
              t("span", Yn, v(e(g)("todoist.calendar.photoTag")), 1)
            ], 8, Kn)) : _("", !0)
          ], 10, Un))), 128))
        ])
      ])
    ], 10, cn));
  }
}), Xn = /* @__PURE__ */ ne(Gn, [["__scopeId", "data-v-6c1a5887"]]);
function qn(i) {
  const s = i.state, d = E(null), f = E(null), h = E(null), C = E(!1), W = no(null), L = E(), U = /* @__PURE__ */ new Map();
  function Y(m) {
    U.clear();
    const M = m.closest(".todoist-board");
    if (M)
      for (const l of M.querySelectorAll(".todoist-board-list")) {
        const A = s.columns[Number(l.dataset.groupIndex)];
        if (!A) continue;
        const z = l.__todoistSlots;
        if (!z) continue;
        const et = z(), pt = et.filter((mt) => mt.id !== I?.id);
        U.set(A, { list: l, rows: pt, read: z, snapshot: et });
      }
  }
  let x = 0, N;
  function F(m, M) {
    N = { clientY: m.clientY, col: M }, !x && (x = requestAnimationFrame(() => {
      x = 0;
      const l = N;
      N = void 0, l && $(l, l.col);
    }));
  }
  function $(m, M) {
    if (!I || s.movingTaskId) return;
    const l = U.get(M);
    if (!l) return;
    const A = l.read();
    A !== l.snapshot && (l.snapshot = A, l.rows = A.filter((nt) => nt.id !== I?.id));
    const z = m.clientY - l.list.getBoundingClientRect().top + l.list.scrollTop;
    let et = 0, pt = l.rows.length;
    for (; et < pt; ) {
      const nt = et + pt >>> 1;
      z < l.rows[nt].middle ? pt = nt : et = nt + 1;
    }
    let mt = et;
    if (f.value === s.columns.indexOf(M)) {
      const nt = L.value ? l.rows.findIndex((vt) => vt.id === L.value) : l.rows.length;
      nt >= 0 && mt > nt && z < l.rows[nt].middle + 10 && (mt = nt), nt > 0 && mt < nt && z > l.rows[nt - 1].middle - 10 && (mt = nt);
    }
    const xt = l.rows[mt]?.id;
    w(M, xt), f.value === s.columns.indexOf(M) && (h.value = xt || l.rows[l.rows.length - 1]?.id || null, C.value = !xt);
  }
  function T(m) {
    return m === W.value;
  }
  function R(m, M) {
    if (M !== f.value || !W.value) return m.tasks;
    const l = [...m.tasks], A = L.value ? l.findIndex((z) => z.id === L.value) : -1;
    return l.splice(A < 0 ? l.length : A, 0, W.value), l;
  }
  function w(m, M) {
    if (!I || !H) return;
    if (s.view === "today" && m.sectionId === "overdue" && H.sectionId !== "overdue") {
      f.value = null;
      return;
    }
    const l = M ? m.tasks.find((et) => et.id === M) : void 0, A = m === H ? String(I._taskRaw?.parent_id || "") : "";
    if (l && s.view !== "today" && String(l._taskRaw?.parent_id || "") !== A) {
      f.value = null;
      return;
    }
    const z = s.columns.indexOf(m);
    z < 0 || (L.value = M, f.value = z);
  }
  let I = null, H = null;
  function q(m, M, l, A) {
    if (!i.isActive() || s.loading || s.movingTaskId || s.moveNeedsRefresh || M.completed || M.id.startsWith("optimistic-") || i.editingTaskId() === M.id) {
      m.preventDefault();
      return;
    }
    if (m.stopPropagation(), i.closePopovers(), d.value = M.id, I = M, H = l, W.value = { ...M }, Y(m.currentTarget), m.dataTransfer) {
      const z = i.allowResourceDrag?.() ? No(M) : null;
      m.dataTransfer.effectAllowed = z ? "copyMove" : "move";
      const et = m.currentTarget, pt = et.getBoundingClientRect();
      m.dataTransfer.setDragImage(
        et,
        Math.max(0, Math.min(pt.width, m.clientX - pt.left)),
        Math.max(0, Math.min(pt.height, m.clientY - pt.top))
      ), m.dataTransfer.clearData(), m.dataTransfer.setData("application/x-todoist-task-id", M.id), m.dataTransfer.setData("application/x-logicweaver-todoist-task", M.id), m.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: M.id, sectionId: l.sectionId })), z && m.dataTransfer.setData(Ho, JSON.stringify(z));
    }
  }
  function G() {
    cancelAnimationFrame(x), x = 0, N = void 0, d.value = null, f.value = null, h.value = null, C.value = !1, I = null, H = null, W.value = null, L.value = void 0, U.clear();
  }
  function ut(m, M) {
    !I || s.movingTaskId || (m.preventDefault(), m.stopPropagation(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), F(m, s.columns[M]));
  }
  function it(m, M) {
    m.currentTarget?.contains(m.relatedTarget);
  }
  function V(m, M, l, A) {
    m.dataTransfer && (m.dataTransfer.dropEffect = "move"), F(m, l);
  }
  async function P(m, M) {
    N && N.col === m && ($(N, N.col), M = L.value);
    const l = I, A = H;
    G(), !(!l || !A || !i.isActive() || s.movingTaskId) && (s.view === "today" ? m.sectionId === "today" && A.sectionId !== "today" ? await i.moveTask(l.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, M) : await i.moveTask(l.id, { sectionId: m.sectionId }, M) : await i.moveTask(l.id, {
      projectId: m.projectId,
      sectionId: m.sectionId
    }, M));
  }
  async function ht(m, M, l, A) {
    m.preventDefault();
    const z = m.dataTransfer?.getData("application/x-todoist-label") || (m.dataTransfer?.getData("text/plain")?.startsWith("label:") ? m.dataTransfer.getData("text/plain").slice(6) : "");
    if (z) {
      i.dropLabel(M, z);
      return;
    }
    if (f.value === s.columns.indexOf(l)) {
      await P(l, L.value);
      return;
    }
    const et = m.currentTarget.getBoundingClientRect(), pt = m.clientY >= et.top + et.height / 2, mt = l.tasks.filter((vt) => vt.id !== I?.id), xt = mt.findIndex((vt) => vt.id === M.id), nt = M.id === I?.id ? M.id : pt ? mt[xt + 1]?.id : M.id;
    await P(l, nt);
  }
  async function Tt(m, M) {
    m.preventDefault(), m.stopPropagation(), await P(M, f.value === s.columns.indexOf(M) ? L.value : void 0);
  }
  return dt(() => [s.view, s.activeProjectId], () => G()), dt(() => s.columns, (m) => {
    H && !m.includes(H) && G();
  }), dt(i.isActive, (m) => {
    m || G();
  }, { immediate: !0, flush: "sync" }), Mt(G), {
    draggingTaskId: d,
    dragOverColIndex: f,
    dragOverTaskId: h,
    dragAfterTask: C,
    isDragPreview: T,
    previewTasks: R,
    onTaskDragStart: q,
    onTaskDragEnd: G,
    onColDragOver: ut,
    onColDragLeave: it,
    onTaskDragOver: V,
    onTaskDrop: ht,
    onColDrop: Tt
  };
}
function co(i) {
  return i.key === "Enter" && !i.isComposing && i.keyCode !== 229 && (i.ctrlKey || i.metaKey) && !i.altKey && !i.shiftKey && !i.repeat;
}
function Oe(i) {
  return i.isComposing || i.keyCode === 229;
}
const Qn = ["data-row-key"], Jn = /* @__PURE__ */ Kt({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(i) {
    const s = i, d = E(null), f = /* @__PURE__ */ new Map(), h = E(0), C = no({ top: 0, height: 600 }), W = (w) => s.isPreview(w) ? `preview:${w.id}` : w.id, L = Z(() => {
      h.value;
      const w = [0];
      for (const I of s.tasks) {
        const H = I.id === s.hiddenId && !s.isPreview(I) ? 0 : f.get(W(I)) || f.get(I.id) || 110;
        w.push(w[w.length - 1] + H);
      }
      return w;
    }), U = Z(() => {
      h.value;
      let w = 0;
      return s.tasks.filter((I) => !s.isPreview(I)).map((I) => {
        const H = f.get(I.id) || 110, q = { id: I.id, middle: w + H / 2 };
        return w += H, q;
      });
    });
    function Y(w) {
      const I = L.value;
      let H = 0, q = s.tasks.length;
      for (; H < q; ) {
        const G = H + q >>> 1;
        I[G + 1] < w ? H = G + 1 : q = G;
      }
      return H;
    }
    const x = Z(() => {
      const w = Math.max(0, Y(C.value.top) - 5), I = Math.min(s.tasks.length, Y(C.value.top + C.value.height) + 6), H = /* @__PURE__ */ new Set();
      for (let q = w; q < I; q++) H.add(q);
      if (s.pinnedId) {
        const q = s.tasks.findIndex((G) => G.id === s.pinnedId && !s.isPreview(G));
        q >= 0 && H.add(q);
      }
      return [...H].sort((q, G) => q - G).map((q) => ({ task: s.tasks[q], index: q, top: L.value[q] }));
    });
    let N = 0;
    function F() {
      N || (N = requestAnimationFrame(() => {
        N = 0, d.value && (C.value = { top: d.value.scrollTop, height: d.value.clientHeight });
      }));
    }
    let $;
    const T = /* @__PURE__ */ new Map();
    function R(w, I) {
      const H = T.get(I);
      H !== w && (H && $?.unobserve(H), w instanceof HTMLElement ? (T.set(I, w), $?.observe(w)) : T.delete(I));
    }
    return dt(() => s.tasks, () => {
      const w = new Set(s.tasks.map(W));
      for (const I of f.keys()) w.has(I) || f.delete(I);
      It(F);
    }), oe(() => {
      $ = new ResizeObserver((w) => {
        let I = !1;
        const H = Y(d.value?.scrollTop || 0), q = L.value[H] || 0;
        for (const G of w) {
          const ut = G.target;
          if (ut === d.value) {
            F();
            continue;
          }
          const it = ut.dataset.rowKey, V = G.borderBoxSize?.[0]?.blockSize || G.contentRect.height;
          it && V > 0 && Math.abs((f.get(it) || 0) - V) > 0.5 && (f.set(it, V), I = !0);
        }
        if (I) {
          h.value++;
          const G = (L.value[H] || 0) - q;
          d.value && G && !s.pinnedId && (d.value.scrollTop += G), F();
        }
      }), d.value && ($.observe(d.value), d.value.__todoistSlots = () => U.value);
      for (const w of T.values()) $.observe(w);
      F();
    }), Mt(() => {
      $?.disconnect(), cancelAnimationFrame(N), d.value && delete d.value.__todoistSlots, T.clear(), f.clear();
    }), (w, I) => (r(), p("div", {
      ref_key: "root",
      ref: d,
      onScrollPassive: F
    }, [
      i.tasks.length ? (r(), p("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: yt({ height: `${L.value[L.value.length - 1]}px` })
      }, [
        (r(!0), p(st, null, rt(x.value, (H) => (r(), p("div", {
          key: W(H.task),
          ref_for: !0,
          ref: (q) => R(q, W(H.task)),
          "data-row-key": W(H.task),
          class: "virtual-task-row",
          style: yt({ transform: `translateY(${H.top}px)` })
        }, [
          Ke(w.$slots, "default", {
            task: H.task,
            index: H.index
          }, void 0, !0)
        ], 12, Qn))), 128))
      ], 4)) : Ke(w.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), Zn = /* @__PURE__ */ ne(Jn, [["__scopeId", "data-v-b7076778"]]), ts = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, es = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, os = {
  key: 2,
  class: "todoist-empty"
}, ns = {
  key: 3,
  class: "todoist-empty"
}, ss = {
  key: 4,
  class: "todoist-projects-empty-state"
}, is = {
  key: 0,
  class: "todoist-projects-toolbar"
}, as = { class: "todoist-projects-toolbar-inner" }, ls = { class: "todoist-project-tabs-scroll" }, rs = ["onClick"], ds = { class: "todoist-project-tab-name" }, cs = {
  key: 0,
  class: "todoist-project-actions-group"
}, us = ["title"], ps = { class: "action-text" }, ms = ["title"], vs = { class: "action-text" }, fs = { class: "todoist-board" }, gs = ["data-section-id", "data-title", "data-column-index"], bs = { class: "todoist-board-column-head" }, ks = ["title", "onClick"], ys = ["onClick"], hs = ["onSubmit"], ws = ["onKeydown"], Ts = { class: "date-hint-left" }, Ds = { class: "date-hint-badge" }, Cs = { class: "date-hint-sub" }, xs = {
  key: 0,
  class: "date-hint-preview"
}, _s = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, Ss = {
  key: 1,
  class: "todoist-composer-images"
}, $s = ["src"], Is = { class: "todoist-composer-img-name" }, Ps = {
  key: 0,
  class: "todoist-composer-img-status"
}, Rs = ["onClick"], Ls = { class: "todoist-inline-actions" }, Os = ["disabled"], Es = ["disabled"], Ms = {
  key: 0,
  class: "todoist-column-empty"
}, As = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], js = ["disabled", "title", "aria-label", "onClick"], Ws = { class: "todoist-board-task-main" }, Us = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Bs = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Vs = ["title", "onClick"], Ns = { class: "repo-badge-name" }, Hs = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, zs = ["title", "onClick"], Ks = { class: "repo-badge-name" }, Fs = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Ys = ["title", "onClick"], Gs = { class: "repo-badge-name" }, Xs = ["onKeydown", "onBlur"], qs = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, Qs = {
  key: 6,
  class: "todoist-board-task-description"
}, Js = {
  key: 7,
  class: "todoist-board-task-meta"
}, Zs = ["title"], ti = ["title"], ei = ["title"], oi = ["title"], ni = {
  key: 4,
  class: "todoist-board-extra"
}, si = ["onClick"], ii = ["src"], ai = {
  key: 0,
  class: "todoist-board-add-column"
}, li = {
  key: 1,
  class: "todoist-add-section-form"
}, ri = ["onKeydown"], di = { class: "todoist-add-section-actions" }, ci = { class: "section-menu-text" }, ui = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, pi = ["disabled"], mi = ["disabled"], vi = {
  key: 1,
  class: "todoist-section-menu-divider"
}, fi = { class: "section-menu-text" }, gi = { class: "todoist-task-menu-header" }, bi = { class: "todoist-task-menu-title" }, ki = { class: "todoist-menu-text" }, yi = { class: "todoist-menu-badge" }, hi = {
  key: 0,
  class: "todoist-labels-panel"
}, wi = { class: "todoist-labels-quick-input" }, Ti = ["placeholder", "onKeydown"], Di = { class: "todoist-labels-chip-grid" }, Ci = ["onClick"], xi = {
  key: 0,
  class: "chip-check"
}, _i = { class: "todoist-menu-text" }, Si = {
  key: 1,
  class: "todoist-recur-panel"
}, $i = { class: "todoist-recur-grid" }, Ii = ["onClick"], Pi = { class: "todoist-recur-custom-row" }, Ri = ["onKeydown"], Li = { class: "todoist-menu-text" }, Oi = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Ei = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Mi = {
  key: 2,
  class: "todoist-color-panel"
}, Ai = { class: "todoist-color-grid" }, ji = ["title", "onClick"], Wi = { class: "todoist-color-name" }, Ui = { class: "todoist-menu-text" }, Bi = ["disabled", "onClick"], Vi = { class: "todoist-project-flyout-name" }, Ni = {
  key: 0,
  class: "todoist-menu-badge"
}, Hi = { class: "todoist-menu-text" }, zi = { class: "todoist-dialog-title" }, Ki = ["title"], Fi = { class: "todoist-dialog-body" }, Yi = {
  key: 0,
  class: "todoist-dialog-desc"
}, Gi = ["placeholder", "onKeydown"], Xi = { class: "todoist-dialog-foot" }, qi = { class: "todoist-dialog-icon" }, Qi = { class: "todoist-dialog-title" }, Ji = ["title"], Zi = { class: "todoist-dialog-body" }, ta = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, ea = { class: "todoist-dialog-danger-text" }, oa = { class: "todoist-dialog-msg" }, na = { class: "todoist-dialog-foot" }, sa = /* @__PURE__ */ Kt({
  __name: "TodoistTaskList",
  props: {
    embedded: { type: Boolean, default: !1 }
  },
  setup(i) {
    const s = E(0);
    function d() {
      s.value++;
    }
    oe(() => {
      window.addEventListener("storage", d), window.addEventListener("todoist-repository-links-changed", d), window.addEventListener("todoist-bili-links-changed", d), window.addEventListener("todoist-web-links-changed", d);
    }), Mt(() => {
      window.removeEventListener("storage", d), window.removeEventListener("todoist-repository-links-changed", d), window.removeEventListener("todoist-bili-links-changed", d), window.removeEventListener("todoist-web-links-changed", d);
    });
    function f(n, o) {
      return s.value, io(n, o);
    }
    function h(n, o, a) {
      return s.value, Ko(n, o, a);
    }
    function C(n, o, a) {
      return s.value, Fo(n, o, a);
    }
    function W(n) {
      n && window.open(n, "_blank", "noopener,noreferrer");
    }
    function L(n) {
      Yo.openVideo({
        bvid: n.bvid,
        aid: n.aid ? String(n.aid) : void 0,
        title: n.title,
        author: n.author,
        cover: n.cover,
        url: n.url
      });
    }
    function U(n) {
      ao.open(n);
    }
    const Y = i, x = wt, N = E(""), F = E(null), $ = E(""), T = E(!1), R = Z(() => $.value ? Vo($.value) : null), w = Z(() => {
      const n = Array.from((R.value?.cleanTitle || "").replace(/\s+/g, " ").trim());
      return n.length > 40 ? `${n.slice(0, 40).join("")}…` : n.join("");
    }), I = E([]);
    function H(n) {
      const o = n.clipboardData?.items;
      if (o)
        for (let a = 0; a < o.length; a++) {
          const O = o[a];
          if (O.type.indexOf("image") !== -1) {
            n.preventDefault();
            const c = O.getAsFile();
            if (!c) continue;
            const ot = URL.createObjectURL(c), B = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: c,
              previewUrl: ot,
              name: `截图_${B}.png`,
              uploading: !1
            };
            I.value.push(Dt);
          }
        }
    }
    function q(n) {
      const o = I.value.splice(n, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const G = E(null), ut = E(""), it = E(null), V = Zt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), P = Zt({
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
    }), ht = E(null), Tt = E(null), m = Zt({
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
    }), M = E(null), l = Zt({
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
    }), A = E(null), z = E(null), et = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], pt = [
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
    ], mt = Z(() => String(l.task?._taskRaw?.project_id || l.col?.projectId || "")), xt = Z(() => x.view !== "projects" ? null : x.projects.find((n) => String(n.id) === String(x.activeProjectId)) || x.projects[0] || null), nt = Z(() => {
      const n = new Set(x.availableLabels || []);
      return l.task?.labels && l.task.labels.forEach((o) => n.add(o)), Array.from(n);
    }), vt = Z(() => {
      const n = l.task?.customColorHex;
      return n && et.find((a) => a.hex.toLowerCase() === n.toLowerCase()) || et[0];
    });
    function At(n, o) {
      return n.sectionId || n.title || String(o);
    }
    function qt() {
      return `${x.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function Qt(n) {
      return n.startDate || n.dueText || n.labels && n.labels.length > 0 || n.timedDeadlineText || n.extraCountText;
    }
    function ft() {
      V.isOpen = !1, l.isOpen = !1, l.activeSubpanel = null;
    }
    const {
      draggingTaskId: jt,
      dragOverColIndex: Ht,
      dragOverTaskId: Ft,
      dragAfterTask: Wt,
      isDragPreview: ct,
      previewTasks: j,
      onTaskDragStart: u,
      onTaskDragEnd: b,
      onColDragOver: Q,
      onColDragLeave: $t,
      onTaskDragOver: Ut,
      onTaskDrop: ge,
      onColDrop: be
    } = qn({
      state: x,
      allowResourceDrag: () => Y.embedded,
      isActive: () => X.active,
      editingTaskId: () => G.value,
      closePopovers: ft,
      moveTask: (n, o, a) => tt.moveTask(n, o, a),
      dropLabel: (n, o) => {
        n.labels || (n.labels = []), n.labels.includes(o) || (n.labels.push(o), at.getToken() && at.updateTask(n.id, { labels: n.labels }));
      }
    });
    function ke(n, o) {
      tt.dispatch("toggle-task", { task: n, group: o });
    }
    function ye(n, o) {
      if (n.completed) return;
      const a = o.target;
      a && a.closest("button,input,textarea,select,a") || se(n);
    }
    function se(n) {
      x.movingTaskId !== n.id && (G.value = n.id, ut.value = n.content, It(() => {
        it.value && (it.value.focus(), it.value.select());
      }));
    }
    function Bt(n, o) {
      if (G.value !== n.id) return;
      const a = ut.value.trim();
      G.value = null, o && a && a !== n.content && (n.content = a, tt.dispatch("update-task-title", {
        taskId: n.id,
        content: a,
        task: n,
        newContent: a
      }));
    }
    function he(n, o) {
      Oe(n) || (n.key === "Enter" ? n.shiftKey || (n.preventDefault(), Bt(o, !0)) : n.key === "Escape" && (n.preventDefault(), n.stopPropagation(), Bt(o, !1)));
    }
    function ie(n, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || lt.openTask(n.id, n);
    }
    function we(n, o, a) {
      const O = a.currentTarget;
      F.value = At(n, o), $.value = "", T.value = !1, It(() => {
        O.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function D() {
      S.value || k();
    }
    function k() {
      F.value = null, $.value = "", T.value = !1;
      for (const n of I.value)
        try {
          URL.revokeObjectURL(n.previewUrl);
        } catch {
        }
      I.value = [];
    }
    const S = E(!1), gt = /* @__PURE__ */ new WeakMap();
    function _t(n) {
      const o = n.description || n._taskRaw?.description || "", a = gt.get(n);
      if (a && a.source === o) return a;
      const O = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: o,
        thumb: O,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return gt.set(n, c), c;
    }
    function bt(n) {
      return _t(n).text;
    }
    function zt(n) {
      return _t(n).thumb;
    }
    function uo(n, o) {
      n && Ee.open(n, o?.content || "任务照片");
    }
    async function Me(n) {
      if (!X.active || S.value) return;
      const o = [...I.value];
      let O = $.value.trim() || o[0]?.name || "";
      if (!O) return;
      let c, ot, B;
      if (R.value && !T.value) {
        const Pt = R.value;
        O = Pt.cleanTitle || O, c = Pt.date, ot = Pt.label + (Pt.time ? ` ${Pt.time}` : ""), B = Pt.time ? `${Pt.date} ${Pt.time}` : Pt.date;
      }
      const Dt = F.value, Yt = $.value, St = x.view, xe = n.projectId || St === "projects" && x.activeProjectId || void 0, _e = n.sectionId !== void 0 ? n.sectionId : void 0;
      S.value = !0;
      try {
        await Io(async () => {
          for (const Ct of o)
            if (!Ct.uploadedUrl) {
              Ct.uploading = !0;
              try {
                const Se = await at.uploadFile(Ct.file, Ct.name);
                Ct.uploadedUrl = Se.file_url;
              } catch {
                Ct.uploadedUrl = Ct.previewUrl;
              } finally {
                Ct.uploading = !1;
              }
            }
          await tt.dispatch("add-task-submit", {
            content: O,
            view: St,
            group: n,
            projectId: xe,
            sectionId: _e,
            dueDate: c,
            dueText: ot,
            dueString: B,
            attachments: o.map((Ct) => ({ file_url: Ct.uploadedUrl, file_name: Ct.name, file_type: Ct.file.type || "image/png" }))
          }) && Dt === F.value && Yt === $.value && o.length === I.value.length && o.every((Ct, Se) => Ct === I.value[Se]) && k();
        });
      } catch {
        x.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        S.value = !1;
      }
    }
    function po(n, o) {
      Oe(n) || (co(n) ? (n.preventDefault(), Me(o)) : n.key === "Escape" && (n.preventDefault(), D()));
    }
    function Ae() {
      const n = N.value.trim();
      if (!n) return;
      const a = x.columns.find((O) => O.projectId)?.projectId || x.activeProjectId || void 0;
      tt.dispatch("add-section-submit", { name: n, projectId: a }), Te();
    }
    function Te() {
      x.addingSection = !1, N.value = "";
    }
    function mo(n, o, a) {
      if (V.isOpen && V.col === n) {
        V.isOpen = !1;
        return;
      }
      l.isOpen = !1;
      const c = a.currentTarget.getBoundingClientRect(), B = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      V.col = n, V.x = B, V.y = Dt, V.canMoveLeft = o > 0 && !!x.columns[o - 1]?.sectionId, V.canMoveRight = o < x.columns.length - 1 && !!x.columns[o + 1]?.sectionId, V.isOpen = !0;
    }
    function je(n, o) {
      V.isOpen = !1, tt.dispatch("move-section", { sectionId: n.sectionId, direction: o });
    }
    function We(n, o, a) {
      if (x.movingTaskId === n.id || n.completed) return;
      V.isOpen = !1;
      const O = 236, c = 340, ot = Math.max(8, Math.min(window.innerWidth - O - 8, a.clientX)), B = Math.max(8, Math.min(window.innerHeight - c - 8, a.clientY));
      if (l.task = n, l.col = o, l.x = ot, l.y = B, l.activeSubpanel = null, l.descText = n.description || "", l.isSavingDesc = !1, l.newLabelText = "", l.customRecurText = "", n.dueDate) {
        const St = /* @__PURE__ */ new Date(`${n.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(St.getTime()) && (l.calYear = St.getFullYear(), l.calMonth = St.getMonth());
      } else {
        const St = /* @__PURE__ */ new Date();
        l.calYear = St.getFullYear(), l.calMonth = St.getMonth();
      }
      const Dt = 252, Yt = ot + O + Dt > window.innerWidth - 8;
      l.flyoutOpenLeft = Yt, l.flyoutStyle = {
        left: Yt ? `${-Dt - 6}px` : `${O + 6}px`,
        top: "0px"
      }, l.isOpen = !0;
    }
    function ce(n) {
      l.activeSubpanel === n ? l.activeSubpanel = null : (l.activeSubpanel = n, n === "desc" ? It(() => {
        A.value?.focus(), A.value?.select();
      }) : n === "labels" && It(() => {
        z.value?.focus();
      }));
    }
    function Ue(n) {
      return !!l.task?.labels?.includes(n);
    }
    function vo(n) {
      if (!l.task) return;
      const o = l.task.id, a = [...l.task.labels || []], O = a.includes(n) ? a.filter((c) => c !== n) : [...a, n];
      l.task.labels = O, tt.dispatch("update-task-labels", { taskId: o, labels: O });
    }
    function Be() {
      if (!l.task) return;
      const n = l.newLabelText.trim();
      if (!n) return;
      l.newLabelText = "";
      const o = l.task.id, a = [...l.task.labels || []];
      a.includes(n) || (a.push(n), l.task.labels = a, tt.dispatch("update-task-labels", { taskId: o, labels: a })), ft();
    }
    function fo(n) {
      return String(l.task?.dueString || "").toLowerCase().includes(n.toLowerCase());
    }
    function go(n, o) {
      if (!l.task) return;
      const a = l.task.id;
      tt.dispatch("update-task-recurring", { taskId: a, rule: n, label: o }), ft();
    }
    function Ve() {
      if (!l.task) return;
      const n = l.customRecurText.trim();
      if (!n) return;
      const o = l.task.id;
      tt.dispatch("update-task-recurring", { taskId: o, rule: n, label: n }), ft();
    }
    function bo() {
      if (!l.task) return;
      const n = l.task.id;
      tt.dispatch("clear-task-recurring", { taskId: n }), ft();
    }
    function ko(n) {
      if (!l.task) return;
      const o = l.task.id, a = et.find((O) => O.id === n);
      l.task.customColorHex = a?.hex || "", tt.dispatch("update-task-color", { taskId: o, colorId: n }), ft();
    }
    function yo(n) {
      if (!l.task) return;
      const o = l.task.id;
      tt.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: n.id,
        targetProjectName: n.name
      }), ft();
    }
    function ho() {
      if (!l.task) return;
      const n = l.task, o = { x: l.x, y: l.y };
      ft();
      const a = Jt(o, 380, 220);
      m.x = a.x, m.y = a.y, n.isRecurring ? (m.title = "删除重复任务确认", m.icon = "⚠️", m.danger = !0, m.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", m.message = `任务内容：${n.content}
循环规则：${n.dueString || "循环任务"}`, m.confirmText = "删除重复任务", m.actionType = "delete-task", m.payload = { taskId: n.id, isRecurring: !0 }, m.isOpen = !0) : (m.title = "删除任务确认", m.icon = "🗑️", m.danger = !0, m.alertText = `确定要删除任务「${n.content}」吗？`, m.message = "此操作不可撤销。", m.confirmText = "确认删除", m.actionType = "delete-task", m.payload = { taskId: n.id, isRecurring: !1 }, m.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(n, o, a) {
      We(n, o, a);
    });
    function Jt(n, o = 380, a = 220) {
      let O = null;
      if (n instanceof HTMLElement)
        O = n.getBoundingClientRect();
      else if (n && "currentTarget" in n && n.currentTarget instanceof HTMLElement)
        O = n.currentTarget.getBoundingClientRect();
      else if (n && "target" in n && n.target instanceof HTMLElement)
        O = (n.target.closest("button") || n.target).getBoundingClientRect();
      else if (n && "x" in n && "y" in n && typeof n.x == "number" && typeof n.y == "number") {
        const c = Math.max(16, Math.min(window.innerWidth - o - 16, n.x)), ot = Math.max(16, Math.min(window.innerHeight - a - 16, n.y + 10));
        return { x: c, y: ot };
      }
      if (O) {
        let c = O.right - o;
        c < 16 && (c = Math.max(16, O.left)), c = Math.max(16, Math.min(window.innerWidth - o - 16, c));
        let ot = O.bottom + 8;
        return ot + a > window.innerHeight - 16 && O.top > a + 16 && (ot = O.top - a - 8), ot = Math.max(16, Math.min(window.innerHeight - a - 16, ot)), { x: c, y: ot };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - a) / 3))
      };
    }
    function Ne(n, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const a = o.clientX, O = o.clientY, c = n === "prompt" ? P : m, ot = c.x, B = c.y, Dt = (St) => {
        const xe = St.clientX - a, _e = St.clientY - O;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, ot + xe)), c.y = Math.max(10, Math.min(window.innerHeight - 120, B + _e));
      }, Yt = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Yt);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Yt);
    }
    function He(n) {
      const o = Jt(n, 380, 220);
      P.x = o.x, P.y = o.y, P.title = g("todoist.newProject"), P.message = g("todoist.inputProjectPlaceholder"), P.value = "", P.placeholder = g("todoist.inputProjectPlaceholder"), P.confirmText = g("common.confirm"), P.actionType = "create-project", P.payload = null, P.isOpen = !0, It(() => ht.value?.focus());
    }
    function wo(n, o) {
      const a = Jt(o, 380, 220);
      P.x = a.x, P.y = a.y, P.title = g("todoist.renameProject"), P.message = n.name, P.value = n.name, P.placeholder = g("todoist.inputProjectPlaceholder"), P.confirmText = g("common.save"), P.actionType = "rename-project", P.payload = { projectId: n.id }, P.isOpen = !0, It(() => {
        ht.value?.focus(), ht.value?.select();
      });
    }
    function To(n, o) {
      const a = o || { x: V.x, y: V.y };
      V.isOpen = !1;
      const O = Jt(a, 380, 220);
      P.x = O.x, P.y = O.y, P.title = g("todoist.renameSection"), P.message = n.title, P.value = n.title, P.placeholder = g("todoist.inputSectionPlaceholder"), P.confirmText = g("common.save"), P.actionType = "rename-section", P.payload = { sectionId: n.sectionId }, P.isOpen = !0, It(() => {
        ht.value?.focus(), ht.value?.select();
      });
    }
    function ae() {
      P.isOpen = !1;
    }
    function ze() {
      const n = P.value.trim();
      if (!n) return;
      const { actionType: o, payload: a } = P;
      ae(), o === "create-project" ? tt.dispatch("create-project-submit", n) : o === "rename-project" && a && "projectId" in a ? tt.dispatch("rename-project-submit", { projectId: a.projectId, newName: n }) : o === "rename-section" && a && "sectionId" in a && tt.dispatch("rename-section", { sectionId: a.sectionId, newName: n });
    }
    function Do(n, o) {
      const a = Jt(o, 380, 240);
      m.x = a.x, m.y = a.y, m.title = g("todoist.deleteProjectConfirm"), m.icon = "🗑️", m.danger = !0, m.alertText = g("todoist.deleteProjectAlert", { name: n.name }), m.message = g("todoist.deleteProjectWarning"), m.confirmText = g("common.deletePermanently"), m.actionType = "delete-project", m.payload = { projectId: n.id }, m.isOpen = !0;
    }
    function Co(n, o) {
      const a = o || { x: V.x, y: V.y };
      V.isOpen = !1;
      const O = Jt(a, 380, 240);
      m.x = O.x, m.y = O.y, m.title = g("todoist.deleteSectionConfirm"), m.icon = "🗑️", m.danger = !0, m.alertText = g("todoist.deleteSectionAlert", { name: n.title }), m.message = g("todoist.deleteSectionWarning"), m.confirmText = g("todoist.deleteSection"), m.actionType = "delete-section", m.payload = { sectionId: n.sectionId }, m.isOpen = !0;
    }
    function ue() {
      m.isOpen = !1;
    }
    function xo() {
      const { actionType: n, payload: o } = m;
      ue(), n === "delete-project" && o && "projectId" in o ? tt.dispatch("delete-project-submit", o.projectId) : n === "delete-section" && o && "sectionId" in o ? tt.dispatch("delete-section", { sectionId: o.sectionId }) : n === "delete-task" && o && "taskId" in o && tt.dispatch("delete-task-submit", o);
    }
    function _o(n) {
      tt.dispatch("switch-project", n);
    }
    function De(n) {
      n.key === "Escape" && (P.isOpen && ae(), m.isOpen && ue(), l.isOpen && (l.isOpen = !1, l.activeSubpanel = null), V.isOpen && (V.isOpen = !1));
    }
    function Ce(n) {
      const o = n.target;
      o && (P.isOpen && Tt.value && !Tt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && ae(), m.isOpen && M.value && !M.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ue());
    }
    return dt(() => X.active, (n) => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", Ce), n && (document.addEventListener("keydown", De), window.addEventListener("pointerdown", Ce));
    }, { immediate: !0, flush: "sync" }), Mt(() => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", Ce), k();
    }), (n, o) => (r(), p("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: ft
    }, [
      e(x).moveError && e(x).moveMessage ? (r(), p("p", ts, v(e(x).moveMessage), 1)) : _("", !0),
      e(x).emptyText && e(x).columns.length > 0 && !e(x).loading ? (r(), p("p", es, v(e(g)("todoist.tasksRetained", { text: e(x).emptyText })), 1)) : _("", !0),
      e(x).loading && e(x).columns.length === 0 ? (r(), p("p", os, v(e(g)("common.loading")), 1)) : e(x).emptyText && e(x).columns.length === 0 ? (r(), p("p", ns, v(e(x).emptyText), 1)) : e(x).view === "projects" && e(x).projects.length === 0 ? (r(), p("div", ss, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, v(e(g)("todoist.emptyProjects")), 1),
        t("p", null, v(e(g)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (a) => He(a))
        }, v(e(g)("todoist.createFirstProject")), 1)
      ])) : (r(), p(st, { key: 5 }, [
        e(x).view === "projects" && e(x).projects.length ? (r(), p("div", is, [
          t("div", as, [
            t("div", ls, [
              (r(!0), p(st, null, rt(e(x).projects, (a) => (r(), p("button", {
                key: a.id,
                type: "button",
                class: J(["todoist-project-tab", { active: String(a.id) === String(e(x).activeProjectId) }]),
                onClick: (O) => _o(a.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: yt({ background: a.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", ds, v(a.name), 1)
              ], 10, rs))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (a) => He(a))
              }, "＋ 新建项目")
            ]),
            xt.value ? (r(), p("div", cs, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(g)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (a) => wo(xt.value, a))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", ps, v(e(g)("common.rename")), 1)
              ], 8, us),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(g)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (a) => Do(xt.value, a))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", vs, v(e(g)("todoist.deleteProject")), 1)
              ], 8, ms)
            ])) : _("", !0)
          ])
        ])) : _("", !0),
        t("div", fs, [
          (r(!0), p(st, null, rt(e(x).columns, (a, O) => (r(), p("section", {
            key: a.sectionId || a.title || O,
            class: "todoist-board-column",
            "data-section-id": a.sectionId,
            "data-title": a.title,
            "data-column-index": O
          }, [
            t("header", bs, [
              t("h3", null, [
                Nt(v(a.title) + " ", 1),
                t("span", null, v(a.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: a.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: K((c) => mo(a, O, c), ["stop"])
              }, "•••", 8, ks)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => we(a, O, c)
            }, "＋ 添加任务", 8, ys),
            F.value === At(a, O) ? (r(), p("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: K((c) => Me(a), ["prevent"])
            }, [
              Lt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (c) => $.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 换行，⌘/Ctrl+Enter 创建，支持粘贴图片）",
                onKeydown: (c) => po(c, a),
                onPaste: o[5] || (o[5] = (c) => H(c))
              }, null, 40, ws), [
                [Gt, $.value]
              ]),
              R.value ? (r(), p("div", {
                key: 0,
                class: J(["todoist-composer-date-hint", { "is-ignored": T.value }])
              }, [
                t("div", Ts, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", Ds, [
                    Nt(v(R.value.label) + v(R.value.time ? " " + R.value.time : "") + " ", 1),
                    t("span", Cs, "(" + v(R.value.formattedDate) + ")", 1)
                  ]),
                  T.value ? (r(), p("span", _s, " (已忽略日期，按纯文本创建) ")) : (r(), p("span", xs, [
                    o[32] || (o[32] = Nt(" 精简任务名: ", -1)),
                    t("strong", null, v(w.value), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (c) => T.value = !T.value)
                }, v(T.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : _("", !0),
              I.value.length > 0 ? (r(), p("div", Ss, [
                (r(!0), p(st, null, rt(I.value, (c, ot) => (r(), p("div", {
                  key: ot,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, $s),
                  t("span", Is, v(c.name), 1),
                  c.uploading ? (r(), p("span", Ps, "上传中…")) : _("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (B) => q(ot)
                  }, "×", 8, Rs)
                ]))), 128))
              ])) : _("", !0),
              t("div", Ls, [
                t("button", {
                  type: "button",
                  disabled: S.value,
                  onClick: D
                }, v(e(g)("common.cancel")), 9, Os),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: S.value
                }, v(S.value ? I.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Es)
              ])
            ], 40, hs)) : _("", !0),
            te(Zn, {
              tasks: e(j)(a, O),
              "pinned-id": e(jt) || G.value,
              "hidden-id": e(Ht) !== null ? e(jt) : null,
              "is-preview": e(ct),
              class: J(["todoist-board-list", { "drag-over": e(Ht) === O }]),
              "data-group-index": O,
              onDragover: K((c) => e(Q)(c, O), ["prevent"]),
              onDragleave: (c) => e($t)(c, O),
              onDrop: K((c) => e(be)(c, a), ["prevent"])
            }, {
              empty: re(() => [
                a.tasks.length === 0 && e(Ht) !== O ? (r(), p("p", Ms, " 暂无任务 · 可拖到这里 ")) : _("", !0)
              ]),
              default: re(({ task: c, index: ot }) => [
                t("article", {
                  class: J(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: G.value === c.id,
                      "dragging-task": !e(ct)(c) && e(jt) === c.id,
                      "drop-before": e(Ft) === c.id && !e(Wt),
                      "drop-after": e(Ft) === c.id && e(Wt),
                      "saving-position": e(x).movingTaskId === c.id,
                      "todoist-task-preview": e(ct)(c),
                      "drag-origin-hidden": e(jt) === c.id && !e(ct)(c) && e(Ht) !== null
                    }
                  ]]),
                  style: yt(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": e(ct)(c) ? void 0 : c.id,
                  "aria-hidden": e(ct)(c) || void 0,
                  tabindex: e(ct)(c) ? -1 : 0,
                  title: qt(),
                  draggable: !e(ct)(c) && !c.completed && !e(x).loading && !e(x).movingTaskId && !e(x).moveNeedsRefresh && G.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (B) => e(u)(B, c, a, ot),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...B) => e(b) && e(b)(...B)),
                  onDragover: K((B) => e(Ut)(B, c, a, ot), ["stop", "prevent"]),
                  onDrop: K((B) => e(ge)(B, c, a, ot), ["stop", "prevent"]),
                  onDblclick: (B) => ye(c, B),
                  onClick: (B) => ie(c, B),
                  onContextmenu: K((B) => We(c, a, B), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: J(["todoist-board-check", { checked: c.completed }]),
                    disabled: e(ct)(c) || e(x).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: K((B) => ke(c, a), ["stop"])
                  }, null, 10, js),
                  t("div", Ws, [
                    e(x).movingTaskId === c.id ? (r(), p("span", Us, "保存中")) : _("", !0),
                    f(c.id, c.description).length ? (r(), p("div", Bs, [
                      (r(!0), p(st, null, rt(f(c.id, c.description), (B) => (r(), p("button", {
                        key: B.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + B.fullName + " · 点击在插件内查看详情",
                        onClick: K((Dt) => U(B.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", Ns, v(B.fullName), 1)
                      ], 8, Vs))), 128))
                    ])) : _("", !0),
                    h(c.id, c.description, c.content).length ? (r(), p("div", Hs, [
                      (r(!0), p(st, null, rt(h(c.id, c.description, c.content), (B) => (r(), p("button", {
                        key: B.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + B.title + " · 点击立即播放",
                        onClick: K((Dt) => L(B), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", Ks, v(B.title), 1)
                      ], 8, zs))), 128))
                    ])) : _("", !0),
                    C(c.id, c.description, c.content).length ? (r(), p("div", Fs, [
                      (r(!0), p(st, null, rt(C(c.id, c.description, c.content), (B) => (r(), p("button", {
                        key: B.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (B.title || B.url) + " · 点击直接打开",
                        onClick: K((Dt) => W(B.url), ["stop"])
                      }, [
                        o[36] || (o[36] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", Gs, v(B.title || B.url), 1)
                      ], 8, Ys))), 128))
                    ])) : _("", !0),
                    G.value === c.id ? Lt((r(), p("textarea", {
                      key: 4,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: it,
                      "onUpdate:modelValue": o[7] || (o[7] = (B) => ut.value = B),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (B) => he(B, c),
                      onBlur: (B) => Bt(c, !0),
                      onClick: o[8] || (o[8] = K(() => {
                      }, ["stop"]))
                    }, null, 40, Xs)), [
                      [Gt, ut.value]
                    ]) : (r(), p("p", qs, v(c.content || "未命名任务"), 1)),
                    bt(c) ? (r(), p("p", Qs, v(bt(c)), 1)) : _("", !0),
                    Qt(c) ? (r(), p("div", Js, [
                      c.startDate && !c.dueDate ? (r(), p("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + v(e($e)(c.startDate)) + " 起 ", 9, Zs)) : c.startDate && c.dueDate ? (r(), p("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + v(e($e)(c.startDate)) + " ~ " + v(e($e)(c.dueDate)), 9, ti)) : c.dueText ? (r(), p("span", {
                        key: 2,
                        class: J(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, v(c.isRecurring ? "↻ " : "▣ ") + v(c.dueText), 11, ei)) : _("", !0),
                      (r(!0), p(st, null, rt((c.labels || []).slice(0, 3), (B) => (r(), p("span", {
                        key: B,
                        class: "todoist-board-label"
                      }, "◇ " + v(B), 1))), 128)),
                      c.timedDeadlineText ? (r(), p("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + v(c.timedDeadlineText), 9, oi)) : _("", !0),
                      c.extraCountText ? (r(), p("span", ni, v(c.extraCountText), 1)) : _("", !0)
                    ])) : _("", !0),
                    zt(c) ? (r(), p("div", {
                      key: 8,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: K((B) => uo(zt(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: zt(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, ii),
                      o[37] || (o[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, si)) : _("", !0)
                  ])
                ], 46, As)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, gs))), 128)),
          e(x).view === "inbox" || e(x).view === "projects" ? (r(), p("div", ai, [
            e(x).addingSection ? (r(), p("div", li, [
              Lt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (a) => N.value = a),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  Ot(K(Ae, ["prevent"]), ["enter"]),
                  Ot(Te, ["esc"])
                ]
              }, null, 40, ri), [
                [Gt, N.value]
              ]),
              t("div", di, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: Ae
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: Te
                }, v(e(g)("common.cancel")), 1)
              ])
            ])) : (r(), p("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[10] || (o[10] = (a) => e(x).addingSection = !0)
            }, [...o[38] || (o[38] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : _("", !0)
        ])
      ], 64)),
      V.isOpen && V.col ? (r(), p("div", {
        key: 6,
        class: "todoist-section-menu",
        style: yt({ left: V.x + "px", top: V.y + "px" }),
        onClick: o[16] || (o[16] = K(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (a) => To(V.col, a))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", ci, v(e(g)("todoist.menu.renameSection")), 1)
        ]),
        V.col.sectionId ? (r(), p("div", ui, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !V.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (a) => je(V.col, -1))
          }, v(e(g)("todoist.menu.moveLeft")), 9, pi),
          o[40] || (o[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !V.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (a) => je(V.col, 1))
          }, v(e(g)("todoist.menu.moveRight")), 9, mi)
        ])) : _("", !0),
        V.col.sectionId ? (r(), p("div", vi)) : _("", !0),
        V.col.sectionId ? (r(), p("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (a) => Co(V.col, a))
        }, [
          o[41] || (o[41] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", fi, v(e(g)("todoist.menu.deleteSection")), 1)
        ])) : _("", !0)
      ], 4)) : _("", !0),
      l.isOpen && l.task ? (r(), p("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: yt({ left: l.x + "px", top: l.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = K(() => {
        }, ["stop"]))
      }, [
        t("div", gi, [
          t("span", bi, v(l.task.content || e(g)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: l.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (a) => ce("labels"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", ki, v(e(g)("todoist.menu.cloudLabels")), 1),
          t("span", yi, v(l.task.labels && l.task.labels.length ? e(g)("todoist.menu.labelsSelected", { count: l.task.labels.length }) : e(g)("todoist.menu.labelsNone")), 1)
        ], 2),
        l.activeSubpanel === "labels" ? (r(), p("div", hi, [
          t("div", wi, [
            Lt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (a) => l.newLabelText = a),
              type: "text",
              placeholder: e(g)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: Ot(K(Be, ["prevent"]), ["enter"])
            }, null, 40, Ti), [
              [Gt, l.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Be
            }, "＋")
          ]),
          t("div", Di, [
            (r(!0), p(st, null, rt(nt.value, (a) => (r(), p("button", {
              key: a,
              type: "button",
              class: J(["todoist-label-chip", { selected: Ue(a) }]),
              onClick: (O) => vo(a)
            }, [
              t("span", null, "◇ " + v(a), 1),
              Ue(a) ? (r(), p("span", xi, "✓")) : _("", !0)
            ], 10, Ci))), 128))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: l.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (a) => ce("recur"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", _i, v(e(g)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: yt(l.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, v(l.task.isRecurring ? l.task.dueString || e(g)("todoist.recur.recurring") : e(g)("todoist.menu.labelsNone")), 5)
        ], 2),
        l.activeSubpanel === "recur" ? (r(), p("div", Si, [
          t("div", $i, [
            (r(), p(st, null, rt(pt, (a) => t("button", {
              key: a.rule,
              type: "button",
              class: J(["todoist-recur-chip", { selected: fo(a.rule) }]),
              onClick: (O) => go(a.rule, a.label)
            }, [
              t("span", null, v(a.icon), 1),
              t("span", null, v(a.label), 1)
            ], 10, Ii)), 64))
          ]),
          t("div", Pi, [
            Lt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (a) => l.customRecurText = a),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: Ot(K(Ve, ["prevent"]), ["enter"])
            }, null, 40, Ri), [
              [Gt, l.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Ve
            }, "确定")
          ]),
          l.task.isRecurring ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: bo
          }, v(e(g)("todoist.menu.clearRecur")), 1)) : _("", !0)
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: l.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (a) => ce("color"))
        }, [
          o[44] || (o[44] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", Li, v(e(g)("todoist.menu.pickColor")), 1),
          t("span", Oi, [
            vt.value.id === "none" ? (r(), p("span", Ei, "⊘")) : (r(), p("span", {
              key: 1,
              class: "todoist-color-dot",
              style: yt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: vt.value.hex
              })
            }, null, 4)),
            Nt(" " + v(vt.value.name), 1)
          ])
        ], 2),
        l.activeSubpanel === "color" ? (r(), p("div", Mi, [
          t("div", Ai, [
            (r(), p(st, null, rt(et, (a) => t("button", {
              key: a.id,
              type: "button",
              class: J(["todoist-color-swatch", { selected: vt.value.id === a.id }]),
              title: a.name,
              onClick: (O) => ko(a.id)
            }, [
              t("span", {
                class: J(["todoist-color-dot", { none: a.id === "none" }]),
                style: yt(a.id !== "none" ? { background: a.hex } : {})
              }, v(a.id === "none" ? vt.value.id === "none" ? "✓" : "⊘" : vt.value.id === a.id ? "✓" : ""), 7),
              t("span", Wi, v(a.name), 1)
            ], 10, ji)), 64))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: l.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (a) => ce("project"))
        }, [
          o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Ui, v(e(g)("todoist.menu.moveToProject")), 1),
          o[46] || (o[46] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        l.activeSubpanel === "project" ? (r(), p("div", {
          key: 3,
          class: J(["todoist-project-flyout", { "open-left": l.flyoutOpenLeft }]),
          style: yt(l.flyoutStyle)
        }, [
          (r(!0), p(st, null, rt(e(x).projects, (a) => (r(), p("button", {
            key: a.id,
            type: "button",
            class: J(["todoist-project-flyout-item", { active: String(a.id) === mt.value }]),
            disabled: !!e(x).movingTaskId || String(a.id) === mt.value,
            onClick: (O) => yo(a)
          }, [
            o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Vi, v(a.name), 1),
            String(a.id) === mt.value ? (r(), p("span", Ni, v(e(g)("todoist.menu.currentBadge")), 1)) : _("", !0)
          ], 10, Bi))), 128))
        ], 6)) : _("", !0),
        o[49] || (o[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: ho
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Hi, v(l.task.isRecurring ? e(g)("todoist.menu.deleteRecurringTask") : e(g)("todoist.menu.deleteTask")), 1)
        ])
      ], 4)) : _("", !0),
      P.isOpen && e(X).active ? (r(), p("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: Tt,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: yt({
          position: "fixed",
          left: `${P.x}px`,
          top: `${P.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[26] || (o[26] = K(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (a) => Ne("prompt", a))
        }, [
          o[50] || (o[50] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", zi, v(P.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(g)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ki)
        ], 32),
        t("div", Fi, [
          P.message ? (r(), p("p", Yi, v(P.message), 1)) : _("", !0),
          Lt(t("input", {
            ref_key: "promptInputRef",
            ref: ht,
            "onUpdate:modelValue": o[25] || (o[25] = (a) => P.value = a),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: P.placeholder,
            onKeydown: [
              Ot(K(ze, ["prevent"]), ["enter"]),
              Ot(K(ae, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, Gi), [
            [Gt, P.value]
          ])
        ]),
        t("div", Xi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ae
          }, v(e(g)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: ze
          }, v(P.confirmText || e(g)("common.confirm")), 1)
        ])
      ], 4)) : _("", !0),
      m.isOpen && e(X).active ? (r(), p("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: M,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: yt({
          position: "fixed",
          left: `${m.x}px`,
          top: `${m.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[28] || (o[28] = K(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (a) => Ne("confirm", a))
        }, [
          t("span", qi, v(m.icon || "⚠️"), 1),
          t("h3", Qi, v(m.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(g)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ji)
        ], 32),
        t("div", Zi, [
          m.danger ? (r(), p("div", ta, [
            t("div", ea, v(m.alertText), 1)
          ])) : _("", !0),
          t("p", oa, v(m.message), 1)
        ]),
        t("div", na, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ue
          }, v(e(g)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: J(["todoist-dialog-btn", m.danger ? "danger" : "primary"]),
            onClick: xo
          }, v(m.confirmText || e(g)("common.confirm")), 3)
        ])
      ], 4)) : _("", !0)
    ]));
  }
}), ia = /* @__PURE__ */ ne(sa, [["__scopeId", "data-v-7ab8dcaf"]]), oo = {
  activePopover: "none",
  isDescEditing: !1
};
class aa {
  constructor() {
    this._state = { ...oo }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.todoistInspector = this);
  }
  get state() {
    return this._state;
  }
  get activePopover() {
    return this._state.activePopover;
  }
  get isDescEditing() {
    return this._state.isDescEditing;
  }
  isPopoverOpen(s) {
    return this._state.activePopover === s;
  }
  subscribe(s) {
    return this._listeners.add(s), () => {
      this._listeners.delete(s);
    };
  }
  _setState(s) {
    this._state = s;
    for (const d of this._listeners)
      d(s);
  }
  send(s) {
    const d = this._state;
    switch (s.type) {
      case "OPEN_POPOVER":
        return this._setState({
          ...d,
          activePopover: s.popover
        }), !0;
      case "TOGGLE_POPOVER": {
        const f = d.activePopover === s.popover ? "none" : s.popover;
        return this._setState({
          ...d,
          activePopover: f
        }), !0;
      }
      case "CLOSE_POPOVER":
        return d.activePopover !== "none" ? (this._setState({
          ...d,
          activePopover: "none"
        }), !0) : !1;
      case "START_DESC_EDIT":
        return this._setState({
          ...d,
          isDescEditing: !0,
          activePopover: "none"
        }), !0;
      case "FINISH_DESC_EDIT":
        return d.isDescEditing ? (this._setState({
          ...d,
          isDescEditing: !1
        }), !0) : !1;
      case "RESET_ALL":
        return this._setState({ ...oo }), !0;
      default:
        return !1;
    }
  }
}
const la = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, ra = { class: "reminder-shortcuts" }, da = ["disabled"], ca = { class: "reminder-preview" }, ua = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, pa = ["disabled"], ma = ["disabled"], va = ["disabled"], fa = /* @__PURE__ */ Kt({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(i, { emit: s }) {
    const d = i, f = s, h = d.value || (d.taskDate ? d.taskDate + "T" + (d.taskTime || "09:00") : ""), C = E(h.slice(0, 10)), W = E(h.slice(11, 16)), L = E(!1), U = E(""), Y = E(!0), x = Z(() => C.value && W.value ? (/* @__PURE__ */ new Date(C.value + "T" + W.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function N($) {
      if (L.value) return;
      const T = /* @__PURE__ */ new Date();
      $ === "tomorrow" ? (T.setDate(T.getDate() + 1), T.setHours(9, 0, 0, 0)) : T.setTime(T.getTime() + $ * 6e4), C.value = `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`, W.value = `${String(T.getHours()).padStart(2, "0")}:${String(T.getMinutes()).padStart(2, "0")}`, U.value = "", Y.value = !0;
    }
    async function F($) {
      if (!(L.value || X.pendingWrites)) {
        if ($ && (!Number.isFinite(Date.parse($)) || Date.parse($) <= Date.now())) {
          U.value = "请选择未来的提醒时间。";
          return;
        }
        if (y.taskId === d.taskId) {
          L.value = !0, U.value = "";
          try {
            if (await lt.setReminder($), y.taskId !== d.taskId) return;
            y.error ? U.value = y.error : y.reminderTime === $ && f("close");
          } finally {
            L.value = !1;
          }
        }
      }
    }
    return ($, T) => (r(), Et(Re, {
      anchor: i.anchor,
      onClose: T[9] || (T[9] = (R) => f("close"))
    }, {
      default: re(() => [
        t("section", la, [
          T[11] || (T[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", ra, [
            t("button", {
              type: "button",
              onClick: T[0] || (T[0] = (R) => N(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: T[1] || (T[1] = (R) => N(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: T[2] || (T[2] = (R) => N("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: L.value }, [
            T[10] || (T[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            te(Le, {
              modelValue: C.value,
              "onUpdate:modelValue": T[3] || (T[3] = (R) => C.value = R),
              "time-value": W.value,
              "onUpdate:timeValue": T[4] || (T[4] = (R) => W.value = R),
              embedded: "",
              onTimeValidity: T[5] || (T[5] = (R) => Y.value = R)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, da),
          t("div", ca, v(x.value || "选择提醒的日期和时间"), 1),
          T[12] || (T[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          U.value ? (r(), p("p", ua, v(U.value), 1)) : _("", !0),
          t("footer", null, [
            i.value ? (r(), p("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: L.value || !!e(X).pendingWrites,
              onClick: T[6] || (T[6] = (R) => F(""))
            }, "移除提醒", 8, pa)) : _("", !0),
            t("button", {
              type: "button",
              disabled: L.value,
              onClick: T[7] || (T[7] = (R) => f("close"))
            }, "取消", 8, ma),
            t("button", {
              type: "button",
              class: "save",
              disabled: L.value || !!e(X).pendingWrites || !C.value || !W.value || !Y.value,
              onClick: T[8] || (T[8] = (R) => F(C.value + "T" + W.value))
            }, v(L.value ? "保存中…" : "设置提醒"), 9, va)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), ga = /* @__PURE__ */ ne(fa, [["__scopeId", "data-v-da9e3ddd"]]), ba = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, ka = { class: "inspector-main-col" }, ya = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, ha = {
  key: 1,
  class: "inspector-repo-badges"
}, wa = ["title", "onClick"], Ta = { class: "repo-badge-name" }, Da = { class: "inspector-section inspector-title-section" }, Ca = { class: "task-title-row" }, xa = ["title"], _a = {
  key: 0,
  class: "check-mark"
}, Sa = ["value", "aria-label", "disabled", "placeholder"], $a = ["value", "placeholder", "disabled"], Ia = ["onKeydown"], Pa = {
  key: 0,
  class: "desc-placeholder-btn"
}, Ra = ["innerHTML"], La = {
  key: 2,
  role: "status"
}, Oa = {
  key: 3,
  class: "attached-img-grid"
}, Ea = ["onClick"], Ma = ["src", "alt"], Aa = { class: "attached-img-info" }, ja = ["onClick"], Wa = { class: "inspector-section inspector-subtasks-section" }, Ua = {
  key: 0,
  class: "subtasks-list"
}, Ba = ["onClick"], Va = {
  key: 0,
  class: "check-tick"
}, Na = { class: "subtask-content-text" }, Ha = ["title", "onClick"], za = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Ka = ["value", "placeholder"], Fa = { class: "subtask-actions" }, Ya = { class: "inspector-section inspector-comments-section" }, Ga = { class: "comment-input-bar" }, Xa = { class: "comment-input-wrap" }, qa = ["value", "placeholder", "disabled"], Qa = ["title"], Ja = ["disabled"], Za = {
  key: 0,
  class: "comments-list"
}, tl = { class: "comment-item-content" }, el = { class: "comment-item-header" }, ol = { class: "comment-time" }, nl = { class: "comment-text" }, sl = {
  key: 0,
  class: "comment-attached-thumb"
}, il = ["src", "onClick"], al = { class: "inspector-side-col" }, ll = { class: "side-prop-group date-picker-anchor" }, rl = { class: "row-text" }, dl = { class: "side-prop-group date-picker-anchor" }, cl = { class: "row-text" }, ul = ["title"], pl = { class: "side-prop-group" }, ml = { class: "side-prop-label" }, vl = { class: "row-text" }, fl = { class: "inspector-menu" }, gl = ["disabled", "onClick"], bl = { key: 0 }, kl = { class: "side-prop-group" }, yl = { class: "side-prop-label" }, hl = { class: "row-text" }, wl = { class: "inspector-menu" }, Tl = ["placeholder", "aria-label", "onKeydown"], Dl = { key: 0 }, Cl = {
  key: 1,
  role: "alert"
}, xl = { class: "label-options-list" }, _l = ["checked", "disabled", "onChange"], Sl = ["disabled"], $l = { key: 3 }, Il = { class: "side-prop-group" }, Pl = { class: "side-prop-label" }, Rl = { class: "row-text" }, Ll = /* @__PURE__ */ Kt({
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
  setup(i, { emit: s }) {
    const d = i, f = s, h = new aa(), C = qo(h), W = Z(() => C.value.isDescEditing), L = Z(() => C.value.activePopover === "start_date"), U = Z(() => C.value.activePopover === "due_date"), Y = Z(() => C.value.activePopover === "priority"), x = Z(() => C.value.activePopover === "labels"), N = Z(() => C.value.activePopover === "reminder"), F = E(null), $ = E(null);
    let T;
    oe(() => {
      Go();
      let j = -1;
      T = new ResizeObserver((u) => {
        const b = u[0]?.contentRect.width;
        b !== j && (j = b, I($.value), I(F.value));
      }), $.value?.parentElement && T.observe($.value.parentElement);
    }), Mt(() => {
      T?.disconnect(), h.send({ type: "RESET_ALL" });
    });
    const R = Z(() => {
      if (!d.editDescription) return "";
      const j = d.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), u = document.createElement("template");
      u.innerHTML = Qo.renderMarkdown(j);
      const b = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const Q of Array.from(u.content.querySelectorAll("*"))) {
        if (!b.has(Q.tagName)) {
          Q.replaceWith(document.createTextNode(Q.textContent || ""));
          continue;
        }
        const $t = Q.tagName === "A" ? Q.getAttribute("href") : null;
        for (const Ut of Array.from(Q.attributes)) Q.removeAttribute(Ut.name);
        $t && /^(https?:\/\/|mailto:)/i.test($t) && (Q.setAttribute("href", $t), Q.setAttribute("target", "_blank"), Q.setAttribute("rel", "noopener noreferrer"));
      }
      return u.innerHTML;
    });
    function w() {
      h.send({ type: "START_DESC_EDIT" }), It(() => {
        I(F.value), F.value?.focus();
      });
    }
    function I(j) {
      j && (j.style.height = "auto", j.style.height = j.scrollHeight + "px");
    }
    function H(j) {
      I(j.el);
    }
    function q(j) {
      const u = j.target;
      I(u), f("update:editDescription", u.value), f("scheduleDraftSave", j);
    }
    function G(j) {
      Oe(j) || (co(j) ? (j.preventDefault(), f("confirmAddSubtask")) : j.key === "Escape" && (j.preventDefault(), f("update:isAddingSubtask", !1)));
    }
    function ut() {
      f("saveTitleAndDesc"), h.send({ type: "FINISH_DESC_EDIT" });
    }
    const it = E(null), V = E(null), P = E(""), ht = E(null), Tt = E(null), m = E(null), M = E([]), l = E(!1), A = E("");
    let z;
    dt(() => [d.state.taskId, x.value], async (j, u, b) => {
      if (z?.abort(), !x.value) return;
      const Q = new AbortController();
      z = Q, b(() => Q.abort()), M.value = [], l.value = !0, A.value = "";
      try {
        const $t = await at.getLabels(Q.signal);
        Q.signal.aborted || (M.value = $t.map((Ut) => Ut.name));
      } catch {
        Q.signal.aborted || (A.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        Q.signal.aborted || (l.value = !1);
      }
    });
    function et() {
      h.send({ type: "OPEN_POPOVER", popover: "reminder" });
    }
    const pt = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function mt(j) {
      switch (j) {
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
    function xt(j) {
      h.send({ type: "CLOSE_POPOVER" }), f("selectPriority", j);
    }
    const nt = Z(() => {
      const j = /* @__PURE__ */ new Set([...M.value, ...d.availableLabels || []]);
      for (const u of d.state.labels || []) j.add(u);
      return Array.from(j);
    }), vt = Z(() => {
      const j = P.value.trim().toLowerCase();
      return j ? nt.value.filter((u) => u.toLowerCase().includes(j)) : nt.value;
    });
    function At() {
      const j = P.value.trim();
      j && (f("createLabel", j), P.value = "");
    }
    function qt(j, u) {
      Ee.open(j, u);
    }
    const Qt = E(0);
    function ft() {
      Qt.value++;
    }
    oe(() => {
      window.addEventListener("storage", ft), window.addEventListener("todoist-repository-links-changed", ft);
    }), Mt(() => {
      window.removeEventListener("storage", ft), window.removeEventListener("todoist-repository-links-changed", ft);
    });
    const jt = Z(() => (Qt.value, io(d.state.taskId, d.editDescription)));
    function Ht(j) {
      ao.open(j);
    }
    function Ft(j, u) {
      if (!j) return "";
      try {
        const b = j.split("-"), Q = parseInt(b[1], 10), $t = parseInt(b[2], 10), Ut = u ? ` ${u}` : "";
        return `${Q}月${$t}日${Ut}`;
      } catch {
        return j;
      }
    }
    function Wt(j) {
      if (!j) return "";
      try {
        const u = new Date(j);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    function ct(j) {
      if (!j) return "刚刚";
      try {
        const u = new Date(j);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    return (j, u) => i.state.isOpen ? (r(), p("div", ba, [
      t("main", ka, [
        i.state.error ? (r(), p("p", ya, v(i.state.error), 1)) : _("", !0),
        jt.value.length ? (r(), p("div", ha, [
          (r(!0), p(st, null, rt(jt.value, (b) => (r(), p("button", {
            key: b.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(g)("todoist.linkRepoTitle", { name: b.fullName }),
            onClick: (Q) => Ht(b.fullName)
          }, [
            u[36] || (u[36] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", Ta, v(b.fullName), 1),
            u[37] || (u[37] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, wa))), 128))
        ])) : _("", !0),
        t("section", Da, [
          t("div", Ca, [
            t("button", {
              type: "button",
              class: J(["task-complete-circle-btn", { completed: i.isTaskCompleted }]),
              title: e(g)("todoist.toggleComplete"),
              onClick: u[0] || (u[0] = (b) => f("toggleComplete"))
            }, [
              i.isTaskCompleted ? (r(), p("span", _a, "✓")) : _("", !0)
            ], 10, xa),
            t("textarea", {
              value: i.editTitle,
              rows: "1",
              "aria-label": e(g)("todoist.taskTitle"),
              onVnodeMounted: H,
              onVnodeUpdated: H,
              disabled: i.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: $,
              class: J(["inspector-input-title", { "title-done": i.isTaskCompleted }]),
              placeholder: e(g)("todoist.taskTitle"),
              onInput: u[1] || (u[1] = (b) => {
                I(b.target), f("update:editTitle", b.target.value), f("scheduleDraftSave", b);
              }),
              onCompositionend: u[2] || (u[2] = (b) => f("scheduleDraftSave", b)),
              onBlur: u[3] || (u[3] = (b) => f("saveTitleAndDesc", b)),
              onKeydown: u[4] || (u[4] = Ot(K((b) => f("saveTitleAndDesc", b), ["prevent"]), ["enter"]))
            }, null, 42, Sa)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: u[7] || (u[7] = K((b) => f("dragover"), ["prevent"])),
          onDragleave: u[8] || (u[8] = K((b) => f("dragleave"), ["prevent"])),
          onDrop: u[9] || (u[9] = K((b) => f("dropImage", b), ["prevent"]))
        }, [
          W.value ? (r(), p("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: F,
            value: i.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(g)("todoist.taskDesc"),
            disabled: i.isUploadingImg,
            onInput: q,
            onCompositionend: u[5] || (u[5] = (b) => f("scheduleDraftSave", b)),
            onBlur: ut,
            onPaste: u[6] || (u[6] = (b) => f("descPaste", b))
          }, null, 40, $a)) : (r(), p("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: w,
            onKeydown: Ot(K(w, ["prevent"]), ["enter"])
          }, [
            i.editDescription ? (r(), p("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: R.value
            }, null, 8, Ra)) : (r(), p("span", Pa, "≡ 描述"))
          ], 40, Ia)),
          i.isUploadingImg ? (r(), p("small", La, "图片上传中…")) : _("", !0),
          i.attachedImages.length ? (r(), p("div", Oa, [
            (r(!0), p(st, null, rt(i.attachedImages, (b) => (r(), p("div", {
              key: b.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (Q) => qt(b.url, b.name)
              }, [
                t("img", {
                  src: b.url,
                  alt: b.name,
                  loading: "lazy"
                }, null, 8, Ma)
              ], 8, Ea),
              t("div", Aa, [
                t("span", null, v(b.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Q) => f("removeAttachedImage", b.url)
                }, "×", 8, ja)
              ])
            ]))), 128))
          ])) : _("", !0)
        ], 32),
        t("section", Wa, [
          i.subtasks.length > 0 ? (r(), p("div", Ua, [
            (r(!0), p(st, null, rt(i.subtasks, (b) => (r(), p("div", {
              key: b.id,
              class: J(["subtask-row-item", { done: b.completed }])
            }, [
              t("button", {
                type: "button",
                class: J(["subtask-check-circle", { checked: b.completed }]),
                onClick: (Q) => f("toggleSubtask", b.id)
              }, [
                b.completed ? (r(), p("span", Va, "✓")) : _("", !0)
              ], 10, Ba),
              t("span", Na, v(b.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(g)("todoist.subtask.delete"),
                onClick: (Q) => f("removeSubtask", b.id)
              }, "×", 8, Ha)
            ], 2))), 128))
          ])) : _("", !0),
          i.isAddingSubtask ? (r(), p("div", za, [
            t("input", {
              value: i.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(g)("todoist.subtask.inputPlaceholder"),
              onInput: u[10] || (u[10] = (b) => f("update:newSubtaskText", b.target.value)),
              onKeydown: G
            }, null, 40, Ka),
            t("div", Fa, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: u[11] || (u[11] = (b) => f("confirmAddSubtask"))
              }, v(e(g)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: u[12] || (u[12] = (b) => f("update:isAddingSubtask", !1))
              }, v(e(g)("common.cancel")), 1)
            ])
          ])) : (r(), p("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: u[13] || (u[13] = (b) => f("update:isAddingSubtask", !0))
          }, [
            u[38] || (u[38] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Nt(" " + v(e(g)("todoist.subtask.add")), 1)
          ]))
        ]),
        (r(), Et(zo, {
          key: i.state.taskId,
          "task-id": i.state.taskId,
          description: i.editDescription,
          title: i.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", Ya, [
          t("div", Ga, [
            u[39] || (u[39] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Xa, [
              t("input", {
                value: i.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(g)("todoist.comment.placeholder"),
                disabled: i.isSubmittingComment,
                onInput: u[14] || (u[14] = (b) => f("update:newCommentText", b.target.value)),
                onKeydown: u[15] || (u[15] = Ot(K((b) => f("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, qa),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(g)("todoist.comment.attachPhoto"),
                onClick: u[16] || (u[16] = K((b) => f("triggerFileInput"), ["stop"]))
              }, "📎", 8, Qa)
            ]),
            i.newCommentText.trim() ? (r(), p("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: i.isSubmittingComment,
              onClick: u[17] || (u[17] = (b) => f("submitComment"))
            }, v(e(g)("todoist.comment.send")), 9, Ja)) : _("", !0)
          ]),
          i.state.comments.length > 0 ? (r(), p("div", Za, [
            (r(!0), p(st, null, rt(i.state.comments, (b) => (r(), p("div", {
              key: b.id,
              class: "comment-item"
            }, [
              u[41] || (u[41] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", tl, [
                t("div", el, [
                  u[40] || (u[40] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", ol, v(ct(b.postedAt)), 1)
                ]),
                t("div", nl, v(b.content), 1),
                b.attachment?.url ? (r(), p("div", sl, [
                  t("img", {
                    src: b.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Q) => qt(b.attachment.url, b.attachment.name)
                  }, null, 8, il)
                ])) : _("", !0)
              ])
            ]))), 128))
          ])) : _("", !0)
        ])
      ]),
      t("aside", al, [
        t("div", ll, [
          u[43] || (u[43] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: it,
            type: "button",
            class: J(["side-item-row click-row", { active: L.value, filled: !!i.editStartDate }]),
            onClick: u[19] || (u[19] = (b) => e(h).send({ type: "TOGGLE_POPOVER", popover: "start_date" }))
          }, [
            u[42] || (u[42] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", rl, v(Ft(i.editStartDate, i.editStartTime) || "安排日期"), 1),
            i.editStartDate ? (r(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: u[18] || (u[18] = K((b) => f("clearStartDate"), ["stop"]))
            }, "×")) : _("", !0)
          ], 2),
          L.value ? (r(), Et(Le, {
            key: 0,
            "model-value": i.editStartDate,
            "time-value": i.editStartTime,
            "anchor-el": it.value,
            "onUpdate:modelValue": u[20] || (u[20] = (b) => f("update:editStartDate", b)),
            "onUpdate:timeValue": u[21] || (u[21] = (b) => f("update:editStartTime", b)),
            onChange: u[22] || (u[22] = (b) => f("startChange")),
            onClose: u[23] || (u[23] = (b) => e(h).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", dl, [
          u[45] || (u[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: V,
            type: "button",
            class: J(["side-item-row click-row", { active: U.value, filled: !!i.editDueDate }]),
            onClick: u[25] || (u[25] = (b) => e(h).send({ type: "TOGGLE_POPOVER", popover: "due_date" }))
          }, [
            u[44] || (u[44] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", cl, v(Ft(i.editDueDate, i.editDueTime) || e(g)("todoist.prop.setDueDate")), 1),
            i.editDueDate ? (r(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(g)("todoist.prop.clearDueDate"),
              onClick: u[24] || (u[24] = K((b) => f("clearDueDate"), ["stop"]))
            }, "×", 8, ul)) : _("", !0)
          ], 2),
          U.value ? (r(), Et(Le, {
            key: 0,
            "model-value": i.editDueDate,
            "time-value": i.editDueTime,
            "anchor-el": V.value,
            "onUpdate:modelValue": u[26] || (u[26] = (b) => f("update:editDueDate", b)),
            "onUpdate:timeValue": u[27] || (u[27] = (b) => f("update:editDueTime", b)),
            onChange: u[28] || (u[28] = (b) => f("dueChange")),
            onClose: u[29] || (u[29] = (b) => e(h).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", pl, [
          t("span", ml, v(e(g)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: m,
            type: "button",
            class: "side-item-row",
            onClick: u[30] || (u[30] = (b) => e(h).send({ type: "TOGGLE_POPOVER", popover: "priority" }))
          }, [
            t("span", {
              style: yt({ color: mt(i.state.priority) })
            }, "⚑", 4),
            t("span", vl, "P" + v(5 - i.state.priority), 1),
            u[46] || (u[46] = t("span", null, "⌄", -1))
          ], 512),
          Y.value ? (r(), Et(Re, {
            key: 0,
            anchor: m.value,
            onClose: u[31] || (u[31] = (b) => e(h).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: re(() => [
              t("div", fl, [
                (r(), p(st, null, rt(pt, (b) => t("button", {
                  key: b.level,
                  type: "button",
                  disabled: !!e(X).pendingWrites,
                  onClick: (Q) => xt(b.level)
                }, [
                  t("span", {
                    style: yt({ color: b.color })
                  }, "⚑", 4),
                  Nt(" " + v(b.name) + " ", 1),
                  i.state.priority === b.level ? (r(), p("span", bl, "✓")) : _("", !0)
                ], 8, gl)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", kl, [
          t("span", yl, v(e(g)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: ht,
            type: "button",
            class: "side-item-row",
            onClick: u[32] || (u[32] = (b) => e(h).send({ type: "TOGGLE_POPOVER", popover: "labels" }))
          }, [
            t("span", hl, v(i.state.labels.join("、") || e(g)("todoist.prop.addLabels")), 1),
            u[47] || (u[47] = t("span", null, "＋", -1))
          ], 512),
          x.value ? (r(), Et(Re, {
            key: 0,
            anchor: ht.value,
            onClose: u[34] || (u[34] = (b) => e(h).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: re(() => [
              t("div", wl, [
                Lt(t("input", {
                  "onUpdate:modelValue": u[33] || (u[33] = (b) => P.value = b),
                  placeholder: e(g)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(g)("todoist.prop.searchLabelAria"),
                  onKeydown: Ot(K(At, ["prevent"]), ["enter"])
                }, null, 40, Tl), [
                  [Gt, P.value]
                ]),
                l.value ? (r(), p("small", Dl, v(e(g)("todoist.prop.readingLabels")), 1)) : _("", !0),
                A.value ? (r(), p("p", Cl, v(A.value), 1)) : _("", !0),
                t("div", xl, [
                  (r(!0), p(st, null, rt(vt.value, (b) => (r(), p("label", {
                    key: b,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + v(b), 1),
                    t("input", {
                      type: "checkbox",
                      checked: i.state.labels.includes(b),
                      disabled: !!e(X).pendingWrites,
                      onChange: (Q) => f("toggleLabelSelect", b)
                    }, null, 40, _l)
                  ]))), 128))
                ]),
                P.value.trim() && !nt.value.includes(P.value.trim()) ? (r(), p("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(X).pendingWrites,
                  onClick: At
                }, v(e(g)("todoist.prop.createLabelBtn", { name: P.value.trim() })), 9, Sl)) : _("", !0),
                !l.value && !vt.value.length && !P.value ? (r(), p("small", $l, v(e(g)("todoist.prop.noLabels")), 1)) : _("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", Il, [
          t("span", Pl, [
            Nt(v(e(g)("todoist.prop.reminder")) + " ", 1),
            t("small", null, v(e(g)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: Tt,
            type: "button",
            class: "side-item-row",
            onClick: et
          }, [
            t("span", Rl, v(Wt(i.state.reminderTime) || e(g)("todoist.prop.addReminder")), 1),
            u[48] || (u[48] = t("span", null, "＋", -1))
          ], 512),
          N.value ? (r(), Et(ga, {
            key: 0,
            anchor: Tt.value,
            "task-id": i.state.taskId,
            value: i.state.reminderTime,
            "task-date": i.editStartDate || i.editDueDate,
            "task-time": i.editStartTime || i.editDueTime,
            onClose: u[35] || (u[35] = (b) => e(h).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : _("", !0)
        ])
      ])
    ])) : _("", !0);
  }
}), Ol = /* @__PURE__ */ ne(Ll, [["__scopeId", "data-v-cad8ec6c"]]), El = { class: "inspector-title-row" }, Ml = ["title", "aria-label"], Al = ["disabled"], jl = ["href"], Wl = "todoistInspectorPositionV2", Ul = /* @__PURE__ */ Kt({
  __name: "TodoistInspectorDrawer",
  setup(i) {
    const s = y, d = Z(() => Rt.get(s.taskId)), f = Z(() => d.value?.status === "failed" ? "保存未确认" : d.value?.status === "saving" ? "正在保存…" : x.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), h = Z(() => [
      f.value,
      d.value?.status === "failed" ? d.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: C,
      headerRef: W,
      initialStyle: L,
      onHeaderPointerDown: U,
      onResizePointerDown: Y
    } = so({
      windowId: "todoist-inspector",
      storageKey: Wl,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => s.isOpen && X.active
    }), x = E(""), N = E(""), F = E(""), $ = E(""), T = E(""), R = E(""), w = E("idle"), I = Z(() => w.value === "uploading_img"), H = Z(() => w.value === "submitting_comment"), q = E(!1), G = E(null), ut = E(!1), it = E(""), V = E(""), P = Z(() => {
      const D = s.description || "", k = [], S = D.split(`
`);
      let gt = 0;
      for (const _t of S) {
        const bt = _t.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        bt && k.push({
          id: `st_${gt++}`,
          completed: bt[1].toLowerCase() === "x",
          text: bt[2].trim()
        });
      }
      return k;
    }), ht = Z(() => P.value.filter((D) => D.completed).length);
    function Tt(D) {
      const gt = (s.description || "").split(`
`).filter((zt) => !zt.match(/^\s*-\s*\[([ xX])\]/)), _t = D.map((zt) => `- [${zt.completed ? "x" : " "}] ${zt.text}`), bt = [...gt, ..._t].join(`
`).trim();
      N.value = bt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), lt.saveTitleAndDesc(x.value, bt);
    }
    function m() {
      if (!it.value.trim()) return;
      const D = [...P.value, {
        id: `st_${Date.now()}`,
        text: it.value.trim(),
        completed: !1
      }];
      it.value = "", ut.value = !1, Tt(D);
    }
    function M(D) {
      const k = P.value.map((S) => S.id === D ? { ...S, completed: !S.completed } : S);
      Tt(k);
    }
    function l(D) {
      const k = P.value.filter((S) => S.id !== D);
      Tt(k);
    }
    const A = Z(() => {
      for (const D of wt.columns || []) {
        const k = D.tasks.find((S) => S.id === s.taskId);
        if (k) return !!k.completed;
      }
      return !1;
    });
    async function z() {
      for (const D of wt.columns || []) {
        const k = D.tasks.find((S) => S.id === s.taskId);
        if (k) {
          const S = !k.completed;
          k.completed = S, k._taskRaw && (k._taskRaw.checked = S);
          try {
            await at.toggleTaskCompletion(k.id, S);
          } catch {
            k.completed = !S, k._taskRaw && (k._taskRaw.checked = !S), s.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function et(D) {
      lt.setPriority(D);
    }
    function pt(D) {
      lt.toggleLabel(D);
    }
    function mt(D) {
      lt.toggleLabel(D);
    }
    async function xt(D) {
      D.trim() && (s.labels.includes(D.trim()) || await lt.createAndAttachLabel(D.trim()));
    }
    async function nt() {
      if (!V.value.trim() || w.value !== "idle") return;
      const D = V.value.trim();
      w.value = "submitting_comment";
      try {
        await lt.addComment(D), V.value = "";
      } finally {
        w.value = "idle";
      }
    }
    dt(() => s.title, (D) => {
      x.value = D || "";
    }, { immediate: !0 }), dt(() => s.description, (D) => {
      N.value = (D || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), dt(() => s.startDate, (D) => {
      F.value = D || "";
    }, { immediate: !0 }), dt(() => s.startTime, (D) => {
      $.value = D || "";
    }, { immediate: !0 }), dt(() => s.dueDate, (D) => {
      T.value = D || "";
    }, { immediate: !0 }), dt(() => s.dueTime, (D) => {
      R.value = D || "";
    }, { immediate: !0 });
    function vt() {
      const D = /* @__PURE__ */ new Date();
      return `${D.getFullYear()}-${String(D.getMonth() + 1).padStart(2, "0")}-${String(D.getDate()).padStart(2, "0")}`;
    }
    function At() {
      $.value && !F.value && (F.value = vt()), lt.setStartDateAndTime(F.value, $.value);
    }
    function qt() {
      $.value = "", At();
    }
    function Qt() {
      F.value = "", $.value = "", At();
    }
    function ft() {
      R.value && !T.value && (T.value = vt()), lt.setDueDateAndTime(T.value, R.value);
    }
    function jt() {
      R.value = "", ft();
    }
    function Ht() {
      T.value = "", R.value = "", ft();
    }
    const Ft = Z(() => {
      const D = [], k = /* @__PURE__ */ new Set(), S = s.description || "", gt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let _t;
      for (; (_t = gt.exec(S)) !== null; ) {
        const bt = _t[2];
        k.add(bt), D.push({
          name: _t[1] || "任务照片",
          url: bt
        });
      }
      for (const bt of s.commentAttachments || [])
        k.has(bt.url) || (k.add(bt.url), D.push(bt));
      return D;
    });
    let Wt, ct;
    function j() {
      const D = (s.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), k = [N.value.trim(), D].filter(Boolean);
      return {
        taskId: s.taskId,
        title: x.value,
        description: k.join(`

`)
      };
    }
    function u() {
      clearTimeout(Wt), Wt = void 0;
      const D = ct;
      if (ct = void 0, D?.taskId && D.title.trim())
        return lt.saveTitleAndDesc(D.title, D.description, D.taskId);
    }
    function b(D) {
      D && "isComposing" in D && D.isComposing || (ct = j(), lt.stageTitleDraft(ct.taskId, ct.title, ct.description), clearTimeout(Wt), Wt = setTimeout(u, 800));
    }
    dt(() => s.taskId, () => u(), { flush: "sync" });
    function Q() {
      u(), lt.close();
    }
    function $t(D) {
      D && "isComposing" in D && D.isComposing || u();
    }
    function Ut() {
      ct = j(), u();
    }
    function ge(D) {
      const k = se(D);
      k && (D.preventDefault(), D.stopPropagation(), Bt(k));
    }
    function be() {
      X.active && G.value?.click();
    }
    async function ke(D) {
      const k = D.target;
      if (!X.active) {
        k.value = "";
        return;
      }
      const S = k.files?.[0];
      S && await Bt(S), k.value = "";
    }
    async function ye(D) {
      q.value = !1;
      const k = D.dataTransfer?.files?.[0];
      k && (k.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(k.name)) && await Bt(k);
    }
    function se(D) {
      const k = D.clipboardData;
      if (!k) return null;
      if (k.files && k.files.length > 0)
        for (let S = 0; S < k.files.length; S++) {
          const gt = k.files[S];
          if (gt.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(gt.name))
            return gt;
        }
      if (k.items && k.items.length > 0)
        for (let S = 0; S < k.items.length; S++) {
          const gt = k.items[S];
          if (gt.type.includes("image")) {
            const _t = gt.getAsFile();
            if (_t) return _t;
          }
        }
      return null;
    }
    async function Bt(D) {
      if (w.value !== "idle" || !X.active || !s.taskId) return;
      const k = s.taskId;
      w.value = "uploading_img";
      try {
        if (await u(), s.taskId !== k || !s.isOpen || !X.active) return;
        await lt.attachImageToTask(D);
      } catch (S) {
        s.taskId === k && (s.error = S instanceof Error ? S.message : "上传失败");
      } finally {
        w.value = "idle";
      }
    }
    function he(D) {
      const k = se(D);
      k && (D.preventDefault(), Bt(k));
    }
    function ie(D) {
      if (!s.isOpen || !X.active) return;
      const k = se(D);
      k && (D.preventDefault(), D.stopPropagation(), Bt(k));
    }
    dt(() => X.active, (D) => {
      window.removeEventListener("paste", ie, { capture: !0 }), D && window.addEventListener("paste", ie, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Mt(() => {
      u(), window.removeEventListener("paste", ie, { capture: !0 });
    });
    async function we(D) {
      const k = s.description || "", S = D.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), gt = k.replace(new RegExp(`!\\[[^\\]]*\\]\\(${S}\\)`, "g"), "").trim();
      await lt.saveTitleAndDesc(s.title, gt);
    }
    return (D, k) => Lt((r(), p("aside", {
      ref_key: "panelRef",
      ref: C,
      class: "todoist-inspector-window",
      style: yt(e(L)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: he
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: W,
        class: "inspector-header",
        onPointerdown: k[2] || (k[2] = (S) => e(U)(S))
      }, [
        t("div", El, [
          k[18] || (k[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          d.value ? (r(), p("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: k[0] || (k[0] = K(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: h.value,
              "aria-label": h.value
            }, v(f.value), 9, Ml),
            d.value.status !== "saving" ? (r(), p("button", {
              key: 0,
              type: "button",
              disabled: e(s).saving || !x.value.trim(),
              onClick: K(Ut, ["stop"])
            }, v(d.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Al)) : _("", !0)
          ], 32)) : _("", !0),
          e(s).url ? (r(), p("a", {
            key: 1,
            href: e(s).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, jl)) : _("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: k[1] || (k[1] = K(() => {
          }, ["stop"])),
          onClick: K(Q, ["stop"])
        }, "×", 32)
      ], 544),
      e(s).isOpen ? (r(), Et(Ol, {
        key: e(s).taskId,
        state: e(s),
        "edit-title": x.value,
        "onUpdate:editTitle": k[3] || (k[3] = (S) => x.value = S),
        "edit-description": N.value,
        "onUpdate:editDescription": k[4] || (k[4] = (S) => N.value = S),
        "edit-start-date": F.value,
        "onUpdate:editStartDate": k[5] || (k[5] = (S) => F.value = S),
        "edit-start-time": $.value,
        "onUpdate:editStartTime": k[6] || (k[6] = (S) => $.value = S),
        "edit-due-date": T.value,
        "onUpdate:editDueDate": k[7] || (k[7] = (S) => T.value = S),
        "edit-due-time": R.value,
        "onUpdate:editDueTime": k[8] || (k[8] = (S) => R.value = S),
        "is-uploading-img": I.value,
        "is-drag-over": q.value,
        "is-task-completed": A.value,
        subtasks: P.value,
        "completed-subtasks-count": ht.value,
        "is-adding-subtask": ut.value,
        "onUpdate:isAddingSubtask": k[9] || (k[9] = (S) => ut.value = S),
        "new-subtask-text": it.value,
        "onUpdate:newSubtaskText": k[10] || (k[10] = (S) => it.value = S),
        "new-comment-text": V.value,
        "onUpdate:newCommentText": k[11] || (k[11] = (S) => V.value = S),
        "is-submitting-comment": H.value,
        "attached-images": Ft.value,
        "available-labels": e(wt).availableLabels || [],
        onScheduleDraftSave: b,
        onSaveTitleAndDesc: $t,
        onToggleComplete: z,
        onTriggerFileInput: be,
        onDragover: k[12] || (k[12] = (S) => q.value = !0),
        onDragleave: k[13] || (k[13] = (S) => q.value = !1),
        onDropImage: ye,
        onDescPaste: ge,
        onRemoveAttachedImage: we,
        onToggleSubtask: M,
        onRemoveSubtask: l,
        onConfirmAddSubtask: m,
        onSubmitComment: nt,
        onStartChange: At,
        onClearStartDate: Qt,
        onClearStartTime: qt,
        onDueChange: ft,
        onClearDueDate: Ht,
        onClearDueTime: jt,
        onSelectPriority: et,
        onToggleLabelSelect: pt,
        onRemoveLabel: mt,
        onCreateLabel: xt
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : _("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: G,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ke
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: k[14] || (k[14] = (S) => e(Y)(S, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: k[15] || (k[15] = (S) => e(Y)(S, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: k[16] || (k[16] = (S) => e(Y)(S, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: k[17] || (k[17] = (S) => e(Y)(S, "w"))
      }, null, 32)
    ], 36)), [
      [Pe, e(s).isOpen]
    ]);
  }
}), Bl = /* @__PURE__ */ ne(Ul, [["__scopeId", "data-v-23532e72"]]), Vl = { class: "vue-todoist-workspace-wrapper" }, Nl = ["aria-label"], Hl = { class: "todoist-head-title-wrap" }, zl = { id: "todoist-workspace-title" }, Kl = ["aria-label"], Fl = ["title"], Yl = {
  class: "muted small",
  role: "status"
}, Gl = ["title", "aria-expanded"], Xl = ["title"], ql = ["title"], Ql = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Jl = { class: "todoist-workspace-cal-area" }, Zl = { class: "todoist-workspace-task-area" }, tr = "todoistWorkspacePosition", yr = /* @__PURE__ */ Kt({
  __name: "TodoistWorkspace",
  props: {
    embedded: { type: Boolean, default: !1 }
  },
  setup(i) {
    const s = i, d = E(!1), f = So(() => import("./TodoistAccountSettings-BisJJKQf.js")), h = E(!1), C = E(!1), W = E(!document.hidden), L = E(!1), U = Z(() => X.visible && W.value);
    X.session++, X.active = U.value, ro(
      () => U.value && !wt.movingTaskId,
      ee,
      () => tt.loadWorkspace(void 0, void 0, !0)
    );
    let Y = !1;
    const x = E(null), N = Eo;
    function F() {
      $.value && ($.value.style.removeProperty("width"), $.value.style.removeProperty("height"), $.value.style.removeProperty("left"), $.value.style.removeProperty("top"), $.value.style.removeProperty("right"), $.value.style.removeProperty("bottom"), $.value.style.removeProperty("margin"), $.value.style.removeProperty("transform"));
    }
    dt(() => X.visible, (l) => {
      l && (N.isOpen = !0, X.active = W.value, tt.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: $,
      headerRef: T,
      initialStyle: R,
      stopInteractions: w,
      onHeaderPointerDown: I,
      onResizePointerDown: H,
      bringToFront: q
    } = so({
      windowId: "todoist",
      storageKey: tr,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => U.value
    }), G = () => $.value;
    function ut() {
      ee(), Mo(), Ao(), lt.cancelReads(), w(), window.removeEventListener("keydown", P);
    }
    const it = Po(ut);
    function V() {
      W.value = !document.hidden;
    }
    function P(l) {
      l.key === "Escape" && y.isOpen && (l.preventDefault(), l.stopPropagation(), lt.close());
    }
    dt(U, (l) => {
      X.active = l, l ? (window.addEventListener("keydown", P), Y || (Y = !0, tt.loadWorkspace()), It(() => {
        U.value && q();
      })) : ut();
    }, { flush: "sync" }), dt(h, (l) => {
      l && (C.value = !0);
    }), dt([U, d, Qe], ([l, A, z]) => {
      if (!(!l || !A || !z) && (Qe.value = null, jo("todoist") === z.transition)) {
        if (X.pendingWrites || y.isOpen && y.taskId !== z.id) {
          Xo.show({ appName: "Todoist", title: g("todoist.retainDetailTitle"), message: g("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        y.isOpen && y.taskId === z.id || lt.openTask(z.id);
      }
    }, { flush: "post" }), oe(() => {
      d.value = !0, L.value && It(F), pe.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: G }), document.addEventListener("visibilitychange", V), U.value && (window.addEventListener("keydown", P), Y || (Y = !0, tt.loadWorkspace()), Ge.refresh());
    }), Mt(() => {
      Ro(), it(), document.removeEventListener("visibilitychange", V), pe.unregister("todoist", G), lt.close(), Object.assign(y, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), tt.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Xe.updateState({ title: g("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ge.update([]);
    });
    function ht() {
      Xe.toggleCalendar();
    }
    function Tt() {
      tt.updateState({ accountConfigured: !0 }), U.value && tt.loadWorkspace(void 0, void 0, !0);
    }
    function m() {
      pe.minimize("todoist");
    }
    function M() {
      X.visible = !1, N.isOpen = !1, pe.close("todoist");
    }
    return (l, A) => (r(), p("div", Vl, [
      Lt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: $,
        class: "card wide todoist-workspace",
        style: yt(s.embedded ? void 0 : e(R)),
        "aria-label": e(g)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: T,
          class: "todoist-workspace-head",
          onPointerdown: A[4] || (A[4] = (z) => !s.embedded && e(I)(z))
        }, [
          t("div", Hl, [
            A[10] || (A[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", zl, v(e(N).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(g)("todoist.viewAria")
          }, [
            te(on)
          ], 8, Kl),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: J(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(N).isCalendarOpen }]),
            type: "button",
            title: e(g)("todoist.calendarToggleTitle"),
            onClick: ht
          }, " 📅 " + v(e(g)("todoist.calendar")), 11, Fl),
          A[11] || (A[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Yl, v(e(X).pendingWrites ? e(g)("todoist.pendingWrites") : e(g)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: x,
            type: "button",
            class: "no-drag",
            title: e(g)("todoist.settingsTitle"),
            "aria-expanded": h.value,
            onClick: A[0] || (A[0] = K((z) => h.value = !h.value, ["stop"]))
          }, " ⚙️ ", 8, Gl),
          C.value ? (r(), Et(e(f), {
            key: 0,
            visible: U.value && h.value,
            anchor: x.value,
            onClose: A[1] || (A[1] = (z) => h.value = !1),
            onAccountSaved: Tt
          }, null, 8, ["visible", "anchor"])) : _("", !0),
          s.embedded ? _("", !0) : (r(), p("button", {
            key: 1,
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(g)("todoist.minimizeHint"),
            onPointerdown: A[2] || (A[2] = K(() => {
            }, ["stop"])),
            onClick: K(m, ["stop"])
          }, " − ", 40, Xl)),
          s.embedded ? _("", !0) : (r(), p("button", {
            key: 2,
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(g)("todoist.closeHint"),
            onPointerdown: A[3] || (A[3] = K(() => {
            }, ["stop"])),
            onClick: K(M, ["stop"])
          }, " ✕ ", 40, ql))
        ], 544),
        e(wt).accountConfigured === !1 ? (r(), Et(Wo, {
          key: 0,
          icon: "✅",
          title: e(g)("todoist.tokenMissingTitle"),
          description: e(g)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(g)("todoist.getToken"),
          onConfigure: A[5] || (A[5] = (z) => h.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), p("div", Ql, [
          Lt(t("div", Jl, [
            te(Xn)
          ], 512), [
            [Pe, e(N).isCalendarOpen]
          ]),
          t("div", Zl, [
            te(ia, {
              embedded: s.embedded
            }, null, 8, ["embedded"])
          ])
        ])),
        te(Bl),
        A[12] || (A[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        !L.value && !s.embedded ? (r(), p(st, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: A[6] || (A[6] = (z) => e(H)(z, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: A[7] || (A[7] = (z) => e(H)(z, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: A[8] || (A[8] = (z) => e(H)(z, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: A[9] || (A[9] = (z) => e(H)(z, "w"))
          }, null, 32)
        ], 64)) : _("", !0)
      ], 12, Nl), [
        [Pe, e(X).visible]
      ])
    ]));
  }
});
export {
  yr as _
};
