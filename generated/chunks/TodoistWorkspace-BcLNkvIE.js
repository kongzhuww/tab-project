import { d as Et, o as i, e as r, F as nt, f as t, u as n, B as Q, r as Ut, y as Bt, x as ct, C as fe, m as Ht, t as T, h as ut, i as z, g as x, b as A, N as Ve, I as Me, A as Tt, s as pt, G as Rt, l as _t, n as jt, c as Lt, w as Zt, z as me, k as $t, D as Qt, E as ro } from "./vendor-vue-DokqDua_.js";
import { a as uo, t as J, w as co, o as po, p as mo } from "./module-state-Dt_XKbbf.js";
import { b as je, h as Ee, i as Yt, j as Dt, e as et, d as ht, c as fo, k as vo, t as We, g as De, l as go, m as bo, n as ko } from "./calendar.service-DB6_5Mkx.js";
import { u as Fe } from "./useWindowDraggable-DzZ5uK6K.js";
import { w as re, b as yo } from "./window-manager.store-D_Nuf9-p.js";
import { A as ho } from "./AccountSetupGuide-b0Xd0kWd.js";
import { i as Ie } from "./image-viewer-store-Ncy8wjec.js";
import { n as xe } from "./view-styles-SpWNtsrK.js";
import { t as rt, b as wo, s as To, p as de, g as Ue, f as Gt } from "./todoist.service-CJhh6PtZ.js";
import { u as Ge, r as Do, I as $e, T as Se, a as Co } from "./TodoistDatePickerPopover-U4dLj63z.js";
import { _ as qt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { Z as xo, _ as ue, $ as $o, A as So, a0 as Io } from "./search.service-CxgDk0dD.js";
import { m as _o } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as ze } from "./task-navigation-CtkR4LCq.js";
const Ro = /* @__PURE__ */ Et({
  __name: "TodoistWorkspaceTabs",
  setup(a) {
    return (o, m) => (i(), r(nt, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: Q({ on: n(Ee).view === "inbox" }),
        title: "收件箱",
        onClick: m[0] || (m[0] = (c) => n(je).switchView("inbox"))
      }, [...m[2] || (m[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: Q({ on: n(Ee).view === "projects" }),
        title: "项目",
        onClick: m[1] || (m[1] = (c) => n(je).switchView("projects"))
      }, [...m[3] || (m[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), Ye = "todoist_reminder_v2:", Lo = "todoist_remind_";
async function Po(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const o = Ye + a, m = await chrome.storage.local.get([o, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(m, o) ? m[o] || void 0 : m.todoist_reminders_map_v1?.[a];
}
async function Oo(a, o, m) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const c = new Date(o).getTime();
  if (o && (!Number.isFinite(c) || c <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (o && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const I = Ye + a, C = Lo + a;
  await chrome.alarms.clear(C), await chrome.storage.local.set({ [I]: o ? { time: o, title: m } : null }), o && await chrome.alarms.create(C, { when: c });
}
const Ot = Ut(/* @__PURE__ */ new Map());
let Ao = 0;
function He(a, o, m, c = "editing") {
  const I = ++Ao;
  return Ot.set(a, { revision: I, title: o, description: m, status: c, error: "" }), I;
}
const b = Ut({
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
let Ce = Promise.resolve(), ce = 0, Be = Promise.resolve();
const pe = /* @__PURE__ */ new Map();
let te = 0;
const zt = /* @__PURE__ */ new Map();
function Jt(a = !0) {
  a && te++;
  for (const o of zt.values()) o.abort();
  zt.clear(), b.loading = !1;
}
function Ne(a) {
  zt.get(a)?.abort();
  const o = new AbortController();
  zt.set(a, o);
  const m = te, c = b.taskId;
  return {
    signal: o.signal,
    current: () => !o.signal.aborted && m === te && b.isOpen && c === b.taskId && zt.get(a) === o,
    finish: () => {
      zt.get(a) === o && zt.delete(a);
    }
  };
}
function At() {
  Jt(!1);
  const a = b.taskId, o = te;
  return { taskId: a, current: () => b.isOpen && o === te && a === b.taskId };
}
function Mo(a) {
  return new Promise((o) => {
    const m = new FileReader();
    m.onload = () => o(m.result || ""), m.onerror = () => o(""), m.readAsDataURL(a);
  });
}
function Ke(a, o, m) {
  for (const c of Dt.columns)
    for (const I of c.tasks)
      String(I.id) === a && (I.content = o, m !== void 0 && (I.description = m), I._taskRaw && (I._taskRaw.content = o, m !== void 0 && (I._taskRaw.description = m)));
  ht.updateTaskTitle(a, o);
}
const jo = {
  state: b,
  cancelReads: Jt,
  stageTitleDraft(a, o, m) {
    a && (He(a, o, m), Jt(!1), b.taskId === a && (b.title = o), Ke(a, o, m));
  },
  async openTask(a, o) {
    if (!a) return;
    if (Jt(), b.taskId = a, b.isOpen = !0, b.error = "", Object.assign(b, {
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
    }), o) {
      b.title = o.content || o.title || "", b.description = o.description || o.raw?.description || "", b.priority = o.priority || 1;
      const C = de(o.due?.datetime || o.due?.date || o.dueDate || "");
      b.dueDate = C.date, b.dueTime = C.time;
      const E = o.startDate || Ue(a, b.description), p = de(E);
      b.startDate = p.date, b.startTime = p.time, b.labels = [...o.labels || []], b.url = o.url || "";
    }
    const m = Ot.get(a);
    m && (b.title = m.title, b.description = m.description);
    const c = Ne("reminder");
    Po(a).then((C) => {
      c.current() && (b.reminderTime = C?.time || "");
    }).catch(() => {
      c.current() && (b.error = "本机提醒读取失败。");
    }).finally(c.finish);
    const I = Ne("detail");
    b.loading = !0;
    try {
      const C = await rt.api(`/tasks/${encodeURIComponent(a)}`, { signal: I.signal });
      if (C && I.current()) {
        const E = Ot.get(a);
        b.title = E?.title ?? C.content ?? "", b.description = E?.description ?? C.description ?? "", b.priority = C.priority || 1;
        const p = de(C.due?.datetime || C.due?.date || "");
        b.dueDate = p.date, b.dueTime = p.time;
        const V = Ue(a, C.description || b.description), q = de(V);
        b.startDate = q.date, b.startTime = q.time, b.labels = [...C.labels || []], b.url = C.url || "";
        try {
          const K = await rt.getComments(a, I.signal);
          if (K && I.current()) {
            const B = [], W = [];
            for (const U of K) {
              let w;
              if (U?.attachment?.file_url) {
                const $ = U.attachment.file_name || "附件图片";
                B.push({ name: $, url: U.attachment.file_url }), w = { name: $, url: U.attachment.file_url };
              }
              W.push({
                id: U.id,
                content: U.content || "",
                postedAt: U.posted_at || "",
                attachment: w
              });
            }
            if (b.commentAttachments = B, b.comments = W, B.length > 0 && b.description) {
              let U = b.description, w = !1;
              for (const $ of B) {
                const y = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                y.test(U) && (U = U.replace(y, `$1${$.url}$2`), w = !0);
              }
              if (w && !Ot.has(a)) {
                b.description = U;
                for (const $ of Dt.columns) {
                  const y = $.tasks.find((P) => String(P.id) === a);
                  if (y) {
                    y.description = U, y._taskRaw && (y._taskRaw.description = U);
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
      I.current() && (b.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      I.current() && (b.loading = !1), I.finish();
    }
  },
  close() {
    Jt(), b.isOpen = !1, b.taskId = "";
  },
  async setStartDateAndTime(a, o) {
    if (!b.taskId) return;
    const m = At(), c = a.trim(), I = c ? o.trim() : "";
    b.startDate = c, b.startTime = I, Yt();
    const C = wo(c, I);
    To(m.taskId, C), rt.invalidateWorkspaceSnapshots();
    for (const E of Dt.columns) {
      const p = E.tasks.find((V) => V.id === m.taskId);
      p && (p.startDate = C);
    }
  },
  async setDueDateAndTime(a, o) {
    if (!b.taskId) return;
    const m = At(), c = a.trim(), I = c ? o.trim() : "";
    b.dueDate = c, b.dueTime = I, Yt(), rt.invalidateWorkspaceSnapshots();
    const C = (pe.get(m.taskId) || 0) + 1;
    pe.set(m.taskId, C);
    const E = Be.then(async () => {
      try {
        const p = await rt.updateTask(m.taskId, {
          due_string: c ? I ? `${c} ${I}` : c : "no date"
        });
        if (pe.get(m.taskId) !== C) return;
        const V = rt.mapTasks([p], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const q of Dt.columns) {
          const K = q.tasks.findIndex((W) => W.id === m.taskId);
          if (K < 0) continue;
          const B = q.tasks[K];
          if (Object.assign(B, {
            dueDate: V.dueDate,
            dueText: V.dueText,
            dueString: V.dueString,
            isDueToday: V.isDueToday,
            isOverdue: V.isOverdue,
            isRecurring: V.isRecurring
          }), B._taskRaw && (B._taskRaw.due = p.due), Dt.view === "today") {
            const W = V.isOverdue ? "overdue" : V.isDueToday ? "today" : "";
            W !== q.sectionId && (q.tasks.splice(K, 1), Dt.columns.find((U) => U.sectionId === W)?.tasks.push(B));
          }
        }
        m.current() && (b.error = "");
      } catch {
        m.current() && pe.get(m.taskId) === C && (b.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Be = E.catch(() => {
    }), await E;
  },
  async saveTitleAndDesc(a, o, m = b.taskId) {
    const c = m === b.taskId ? At() : { taskId: m, current: () => !1 };
    if (!c.taskId || !a.trim()) return;
    const I = a.trim(), C = o.trim(), E = He(m, I, C, "saving");
    c.current() && (b.title = I, b.description = C), Ke(c.taskId, I, C), ce++, b.saving = !0;
    const p = Ce.then(async () => {
      try {
        await rt.updateTask(c.taskId, {
          content: I,
          description: C
        }), Ot.get(m)?.revision === E && Ot.delete(m), ce === 1 && Ot.size === 0 && et.dispatch("refresh");
      } catch (V) {
        const q = Ot.get(m);
        q?.revision === E && (q.status = "failed", q.error = V instanceof Error ? V.message : "保存未确认");
      } finally {
        ce--, b.saving = ce > 0;
      }
    });
    Ce = p.catch(() => {
    }), await p;
  },
  async attachImageToTask(a) {
    const o = At();
    if (await Ce, !o.current()) return;
    if (Ot.has(o.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const m = b.description || "";
    if (!o.taskId || b.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    b.saving = !0;
    try {
      const c = a.name || `截图_${Date.now()}.png`;
      let I = "";
      try {
        const C = await rt.uploadFile(a, c);
        C && C.file_url && (I = C.file_url);
      } catch (C) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", C), a.size <= 2.5 * 1024 * 1024)
          I = await Mo(a);
        else
          throw new Error(C?.message || "云端上传失败且文件超过2.5MB");
      }
      if (I) {
        const C = m ? `${m}

![${c}](${I})` : `![${c}](${I})`;
        await rt.updateTask(o.taskId, {
          description: C
        }), o.current() && (b.description = C);
        for (const E of Dt.columns) {
          const p = E.tasks.find((V) => String(V.id) === o.taskId);
          if (p) {
            p.description = C, p._taskRaw && (p._taskRaw.description = C);
            break;
          }
        }
        et.dispatch("refresh");
      }
    } catch (c) {
      o.current() && (b.error = c.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${c.message}`);
    } finally {
      b.saving = !1;
    }
  },
  async setPriority(a) {
    if (!b.taskId) return;
    const o = At();
    if (![1, 2, 3, 4].includes(a)) return;
    const m = b.priority;
    b.priority = a, Yt(), rt.invalidateWorkspaceSnapshots();
    try {
      await rt.updateTask(o.taskId, { priority: a });
      for (const c of Dt.columns) {
        const I = c.tasks.find((C) => C.id === o.taskId);
        I && (I.priority = a, I._taskRaw && (I._taskRaw.priority = a));
      }
    } catch {
      o.current() && (b.priority = m, b.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!b.taskId) return;
    const o = At(), m = [...b.labels], I = m.includes(a) ? m.filter((C) => C !== a) : [...m, a];
    b.labels = I, Yt(), rt.invalidateWorkspaceSnapshots();
    try {
      await rt.updateTask(o.taskId, { labels: I });
      for (const C of Dt.columns) {
        const E = C.tasks.find((p) => p.id === o.taskId);
        E && (E.labels = I, E._taskRaw && (E._taskRaw.labels = I));
      }
    } catch {
      o.current() && (b.labels = m, b.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const o = At();
    if (a = a.trim(), !(!o.taskId || !a))
      try {
        const m = await rt.getLabels();
        if (!o.current()) return;
        m.some((c) => c.name === a) || await rt.createLabel(a), o.current() && !b.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        o.current() && (b.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!b.taskId || !a.trim()) return;
    const o = At();
    try {
      const m = await rt.addComment({
        task_id: o.taskId,
        content: a.trim()
      });
      m && o.current() && b.comments.push({
        id: m.id || `c_${Date.now()}`,
        content: m.content || a.trim(),
        postedAt: m.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (m) {
      o.current() && (b.error = "发送评论失败：" + (m?.message || ""));
    }
  },
  async setReminder(a) {
    const o = At();
    if (o.taskId)
      try {
        await Oo(o.taskId, a, b.title), o.current() && (b.reminderTime = a, b.error = "");
      } catch (m) {
        o.current() && (b.error = m instanceof Error ? m.message : "提醒未保存，请重试。");
      }
  }
}, dt = uo(jo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), Eo = { class: "todoist-cal-head" }, Wo = { class: "todoist-cal-title-row" }, Uo = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, zo = { class: "todoist-cal-nav" }, Ho = { class: "todoist-cal-nav-group" }, Bo = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, No = { class: "todoist-cal-nav-group" }, Ko = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, Vo = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Fo = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Go = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Yo = { class: "todoist-cal-agenda" }, qo = { class: "todoist-cal-agenda-head" }, Xo = { class: "todoist-cal-agenda-title" }, Qo = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, Jo = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, Zo = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, ts = ["disabled"], es = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, os = {
  key: 0,
  class: "todoist-cal-empty"
}, ss = {
  key: 1,
  class: "todoist-cal-empty"
}, ns = ["onClick"], is = { class: "todoist-cal-todo-main" }, as = ["disabled", "title", "onClick"], ls = {
  key: 0,
  class: "check-icon"
}, rs = {
  key: 0,
  class: "todoist-cal-task-time"
}, ds = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, us = ["onClick"], cs = ["src"], ps = /* @__PURE__ */ Et({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const o = vo;
    Ge(
      () => J.active,
      () => ht.invalidateReads(),
      () => ht.loadTodosForDate(o.selectedDate, !0)
    ), Bt(() => ht.cancelReads()), ct(() => [J.active, J.pendingWrites], ([w, $], y) => {
      if (!w || $) {
        ht.cancelReads();
        return;
      }
      ht.loadTodosForDate(o.selectedDate, !!y?.[1]);
    }, { immediate: !0, flush: "sync" });
    function m(w) {
      ht.toggleTodoItem(w);
    }
    function c(w) {
      dt.openTask(w.id, w);
    }
    fe(() => {
      fo.syncSidebarToVue();
    });
    function I() {
      ht.dispatch("today");
    }
    function C() {
      ht.dispatch("prev-month");
    }
    function E() {
      ht.dispatch("next-month");
    }
    function p() {
      ht.dispatch("prev-year");
    }
    function V() {
      ht.dispatch("next-year");
    }
    function q(w) {
      ht.dispatch("select-date", w);
    }
    function K(w, $) {
      ht.dispatch("context-date", {
        date: w,
        clientX: $.clientX,
        clientY: $.clientY
      });
    }
    function B(w, $) {
      const y = Array.from($.dataTransfer?.types || []);
      (y.includes("application/x-todoist-task-id") || y.includes("text/plain")) && ($.preventDefault(), $.dataTransfer && ($.dataTransfer.dropEffect = "copy"));
    }
    function W(w) {
    }
    function U(w, $) {
      const y = $.dataTransfer?.getData("application/x-todoist-task-id") || $.dataTransfer?.getData("text/plain");
      y && ($.preventDefault(), $.stopPropagation(), ht.dispatch("drop-task", { taskId: y, date: w }));
    }
    return (w, $) => (i(), r("aside", {
      id: "todoist-calendar-sidebar",
      class: Q(["todoist-calendar-sidebar", { collapsed: n(o).collapsed }]),
      "aria-label": "Todoist 任务日历"
    }, [
      t("div", Eo, [
        t("div", Wo, [
          $[1] || ($[1] = t("span", { class: "todoist-cal-logo" }, [
            Ht("📅 "),
            t("strong", null, "任务日历")
          ], -1)),
          t("span", Uo, T(n(o).badgeText), 1)
        ]),
        t("div", { class: "todoist-cal-head-actions" }, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: I
          }, "返回今天")
        ])
      ]),
      t("div", zo, [
        t("div", Ho, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: C
          }, "‹"),
          t("span", Bo, T(n(o).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: "下个月",
            onClick: E
          }, "›")
        ]),
        t("div", No, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: "上一年",
            onClick: p
          }, "‹"),
          t("span", Ko, T(n(o).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: "下一年",
            onClick: V
          }, "›")
        ])
      ]),
      $[3] || ($[3] = t("div", { class: "todoist-cal-weekdays" }, [
        t("span", null, "一"),
        t("span", null, "二"),
        t("span", null, "三"),
        t("span", null, "四"),
        t("span", null, "五"),
        t("span", null, "六"),
        t("span", null, "日")
      ], -1)),
      t("div", Vo, [
        (i(!0), r(nt, null, ut(n(o).cells, (y) => (i(), r("button", {
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
          onClick: (P) => q(y.date),
          onContextmenu: z((P) => K(y.date, P), ["prevent"]),
          onDragover: (P) => B(y.date, P),
          onDragleave: (P) => (y.date, void 0),
          onDrop: (P) => U(y.date, P)
        }, [
          t("span", null, T(y.dayNumber), 1),
          y.hasDot ? (i(), r("span", Go)) : x("", !0)
        ], 42, Fo))), 128))
      ]),
      t("div", Yo, [
        t("div", qo, [
          t("strong", Xo, T(n(o).agendaTitle), 1),
          t("span", Qo, T(n(o).todoItems.length) + " 项", 1)
        ]),
        n(o).writeError ? (i(), r("p", Jo, T(n(o).writeError), 1)) : x("", !0),
        n(o).emptyText ? (i(), r("div", Zo, [
          Ht(T(n(o).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: n(o).todoLoading || n(J).pendingWrites > 0,
            onClick: $[0] || ($[0] = (y) => n(ht).loadTodosForDate(n(o).selectedDate, !0))
          }, "重试读取", 8, ts)
        ])) : x("", !0),
        t("div", es, [
          n(o).todoLoading && !n(o).todoItems.length ? (i(), r("div", os, " 正在读取待办与完成历史… ")) : n(o).todoItems.length === 0 && !n(o).emptyText ? (i(), r("div", ss, " 当天没有待办或完成任务 ☕ ")) : (i(!0), r(nt, { key: 2 }, ut(n(o).todoItems, (y) => (i(), r("div", {
            key: y.id,
            class: Q(["todoist-cal-todo-card", { completed: y.completed }]),
            onClick: (P) => c(y)
          }, [
            t("div", is, [
              t("button", {
                type: "button",
                class: Q(["todoist-cal-check", { checked: y.completed }]),
                disabled: n(J).pendingWrites > 0,
                title: y.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: z((P) => m(y), ["stop"])
              }, [
                y.completed ? (i(), r("span", ls, "✓")) : x("", !0)
              ], 10, as),
              t("span", {
                class: Q(["todoist-cal-todo-title", { strike: y.completed }])
              }, T(y.content), 3),
              y.time ? (i(), r("small", rs, T(y.time), 1)) : x("", !0),
              y.completed ? (i(), r("span", ds, "已完成")) : x("", !0)
            ]),
            y.thumbUrl ? (i(), r("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: z((P) => n(Ie).open(y.thumbUrl, y.content), ["stop"])
            }, [
              t("img", {
                src: y.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, cs),
              $[2] || ($[2] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, us)) : x("", !0)
          ], 10, ns))), 128))
        ])
      ])
    ], 2));
  }
}), ms = /* @__PURE__ */ qt(ps, [["__scopeId", "data-v-6d6d531e"]]);
function fs(a) {
  const o = a.state, m = A(null), c = A(null), I = A(null), C = A(!1), E = Ve(null), p = A(), V = /* @__PURE__ */ new Map();
  function q(S) {
    V.clear();
    const j = S.closest(".todoist-board");
    if (j)
      for (const O of j.querySelectorAll(".todoist-board-list")) {
        const M = o.columns[Number(O.dataset.groupIndex)];
        if (!M) continue;
        const F = O.__todoistSlots;
        if (!F) continue;
        const st = F(), bt = st.filter((ot) => ot.id !== P?.id);
        V.set(M, { list: O, rows: bt, read: F, snapshot: st });
      }
  }
  let K = 0, B;
  function W(S, j) {
    B = { clientY: S.clientY, col: j }, !K && (K = requestAnimationFrame(() => {
      K = 0;
      const O = B;
      B = void 0, O && U(O, O.col);
    }));
  }
  function U(S, j) {
    if (!P || o.movingTaskId) return;
    const O = V.get(j);
    if (!O) return;
    const M = O.read();
    M !== O.snapshot && (O.snapshot = M, O.rows = M.filter((tt) => tt.id !== P?.id));
    const F = S.clientY - O.list.getBoundingClientRect().top + O.list.scrollTop;
    let st = 0, bt = O.rows.length;
    for (; st < bt; ) {
      const tt = st + bt >>> 1;
      F < O.rows[tt].middle ? bt = tt : st = tt + 1;
    }
    let ot = st;
    if (c.value === o.columns.indexOf(j)) {
      const tt = p.value ? O.rows.findIndex((vt) => vt.id === p.value) : O.rows.length;
      tt >= 0 && ot > tt && F < O.rows[tt].middle + 10 && (ot = tt), tt > 0 && ot < tt && F > O.rows[tt - 1].middle - 10 && (ot = tt);
    }
    const ft = O.rows[ot]?.id;
    y(j, ft), c.value === o.columns.indexOf(j) && (I.value = ft || O.rows[O.rows.length - 1]?.id || null, C.value = !ft);
  }
  function w(S) {
    return S === E.value;
  }
  function $(S, j) {
    if (j !== c.value || !E.value) return S.tasks;
    const O = [...S.tasks], M = p.value ? O.findIndex((F) => F.id === p.value) : -1;
    return O.splice(M < 0 ? O.length : M, 0, E.value), O;
  }
  function y(S, j) {
    if (!P || !D) return;
    if (o.view === "today" && S.sectionId === "overdue" && D.sectionId !== "overdue") {
      c.value = null;
      return;
    }
    const O = j ? S.tasks.find((st) => st.id === j) : void 0, M = S === D ? String(P._taskRaw?.parent_id || "") : "";
    if (O && o.view !== "today" && String(O._taskRaw?.parent_id || "") !== M) {
      c.value = null;
      return;
    }
    const F = o.columns.indexOf(S);
    F < 0 || (p.value = j, c.value = F);
  }
  let P = null, D = null;
  function _(S, j, O, M) {
    if (!a.isActive() || o.loading || o.movingTaskId || o.moveNeedsRefresh || j.completed || j.id.startsWith("optimistic-") || a.editingTaskId() === j.id) {
      S.preventDefault();
      return;
    }
    if (S.stopPropagation(), a.closePopovers(), m.value = j.id, P = j, D = O, E.value = { ...j }, q(S.currentTarget), S.dataTransfer) {
      S.dataTransfer.effectAllowed = "move";
      const F = S.currentTarget, st = F.getBoundingClientRect();
      S.dataTransfer.setDragImage(
        F,
        Math.max(0, Math.min(st.width, S.clientX - st.left)),
        Math.max(0, Math.min(st.height, S.clientY - st.top))
      ), S.dataTransfer.clearData(), S.dataTransfer.setData("application/x-todoist-task-id", j.id), S.dataTransfer.setData("application/x-logicweaver-todoist-task", j.id), S.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: j.id, sectionId: O.sectionId }));
    }
  }
  function Y() {
    cancelAnimationFrame(K), K = 0, B = void 0, m.value = null, c.value = null, I.value = null, C.value = !1, P = null, D = null, E.value = null, p.value = void 0, V.clear();
  }
  function L(S, j) {
    !P || o.movingTaskId || (S.preventDefault(), S.stopPropagation(), S.dataTransfer && (S.dataTransfer.dropEffect = "move"), W(S, o.columns[j]));
  }
  function g(S, j) {
    S.currentTarget?.contains(S.relatedTarget);
  }
  function it(S, j, O, M) {
    S.dataTransfer && (S.dataTransfer.dropEffect = "move"), W(S, O);
  }
  async function St(S, j) {
    B && B.col === S && (U(B, B.col), j = p.value);
    const O = P, M = D;
    Y(), !(!O || !M || !a.isActive() || o.movingTaskId) && (o.view === "today" ? S.sectionId === "today" && M.sectionId !== "today" ? await a.moveTask(O.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, j) : await a.moveTask(O.id, { sectionId: S.sectionId }, j) : await a.moveTask(O.id, {
      projectId: S.projectId,
      sectionId: S.sectionId
    }, j));
  }
  async function mt(S, j, O, M) {
    S.preventDefault();
    const F = S.dataTransfer?.getData("application/x-todoist-label") || (S.dataTransfer?.getData("text/plain")?.startsWith("label:") ? S.dataTransfer.getData("text/plain").slice(6) : "");
    if (F) {
      a.dropLabel(j, F);
      return;
    }
    if (c.value === o.columns.indexOf(O)) {
      await St(O, p.value);
      return;
    }
    const st = S.currentTarget.getBoundingClientRect(), bt = S.clientY >= st.top + st.height / 2, ot = O.tasks.filter((vt) => vt.id !== P?.id), ft = ot.findIndex((vt) => vt.id === j.id), tt = j.id === P?.id ? j.id : bt ? ot[ft + 1]?.id : j.id;
    await St(O, tt);
  }
  async function It(S, j) {
    S.preventDefault(), S.stopPropagation(), await St(j, c.value === o.columns.indexOf(j) ? p.value : void 0);
  }
  return ct(() => [o.view, o.activeProjectId], () => Y()), ct(() => o.columns, (S) => {
    D && !S.includes(D) && Y();
  }), ct(a.isActive, (S) => {
    S || Y();
  }, { immediate: !0, flush: "sync" }), Bt(Y), {
    draggingTaskId: m,
    dragOverColIndex: c,
    dragOverTaskId: I,
    dragAfterTask: C,
    isDragPreview: w,
    previewTasks: $,
    onTaskDragStart: _,
    onTaskDragEnd: Y,
    onColDragOver: L,
    onColDragLeave: g,
    onTaskDragOver: it,
    onTaskDrop: mt,
    onColDrop: It
  };
}
const vs = ["data-row-key"], gs = /* @__PURE__ */ Et({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const o = a, m = A(null), c = /* @__PURE__ */ new Map(), I = A(0), C = Ve({ top: 0, height: 600 }), E = (y) => o.isPreview(y) ? `preview:${y.id}` : y.id, p = pt(() => {
      I.value;
      const y = [0];
      for (const P of o.tasks) {
        const D = P.id === o.hiddenId && !o.isPreview(P) ? 0 : c.get(E(P)) || c.get(P.id) || 110;
        y.push(y[y.length - 1] + D);
      }
      return y;
    }), V = pt(() => {
      I.value;
      let y = 0;
      return o.tasks.filter((P) => !o.isPreview(P)).map((P) => {
        const D = c.get(P.id) || 110, _ = { id: P.id, middle: y + D / 2 };
        return y += D, _;
      });
    });
    function q(y) {
      const P = p.value;
      let D = 0, _ = o.tasks.length;
      for (; D < _; ) {
        const Y = D + _ >>> 1;
        P[Y + 1] < y ? D = Y + 1 : _ = Y;
      }
      return D;
    }
    const K = pt(() => {
      const y = Math.max(0, q(C.value.top) - 5), P = Math.min(o.tasks.length, q(C.value.top + C.value.height) + 6), D = /* @__PURE__ */ new Set();
      for (let _ = y; _ < P; _++) D.add(_);
      if (o.pinnedId) {
        const _ = o.tasks.findIndex((Y) => Y.id === o.pinnedId && !o.isPreview(Y));
        _ >= 0 && D.add(_);
      }
      return [...D].sort((_, Y) => _ - Y).map((_) => ({ task: o.tasks[_], index: _, top: p.value[_] }));
    });
    let B = 0;
    function W() {
      B || (B = requestAnimationFrame(() => {
        B = 0, m.value && (C.value = { top: m.value.scrollTop, height: m.value.clientHeight });
      }));
    }
    let U;
    const w = /* @__PURE__ */ new Map();
    function $(y, P) {
      const D = w.get(P);
      D !== y && (D && U?.unobserve(D), y instanceof HTMLElement ? (w.set(P, y), U?.observe(y)) : w.delete(P));
    }
    return ct(() => o.tasks, () => {
      const y = new Set(o.tasks.map(E));
      for (const P of c.keys()) y.has(P) || c.delete(P);
      Rt(W);
    }), fe(() => {
      U = new ResizeObserver((y) => {
        let P = !1;
        const D = q(m.value?.scrollTop || 0), _ = p.value[D] || 0;
        for (const Y of y) {
          const L = Y.target;
          if (L === m.value) {
            W();
            continue;
          }
          const g = L.dataset.rowKey, it = Y.borderBoxSize?.[0]?.blockSize || Y.contentRect.height;
          g && it > 0 && Math.abs((c.get(g) || 0) - it) > 0.5 && (c.set(g, it), P = !0);
        }
        if (P) {
          I.value++;
          const Y = (p.value[D] || 0) - _;
          m.value && Y && !o.pinnedId && (m.value.scrollTop += Y), W();
        }
      }), m.value && (U.observe(m.value), m.value.__todoistSlots = () => V.value);
      for (const y of w.values()) U.observe(y);
      W();
    }), Bt(() => {
      U?.disconnect(), cancelAnimationFrame(B), m.value && delete m.value.__todoistSlots, w.clear(), c.clear();
    }), (y, P) => (i(), r("div", {
      ref_key: "root",
      ref: m,
      onScrollPassive: W
    }, [
      a.tasks.length ? (i(), r("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: Tt({ height: `${p.value[p.value.length - 1]}px` })
      }, [
        (i(!0), r(nt, null, ut(K.value, (D) => (i(), r("div", {
          key: E(D.task),
          ref_for: !0,
          ref: (_) => $(_, E(D.task)),
          "data-row-key": E(D.task),
          class: "virtual-task-row",
          style: Tt({ transform: `translateY(${D.top}px)` })
        }, [
          Me(y.$slots, "default", {
            task: D.task,
            index: D.index
          }, void 0, !0)
        ], 12, vs))), 128))
      ], 4)) : Me(y.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), bs = /* @__PURE__ */ qt(gs, [["__scopeId", "data-v-e0ed77d8"]]), ks = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, ys = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, hs = {
  key: 2,
  class: "todoist-empty"
}, ws = {
  key: 3,
  class: "todoist-empty"
}, Ts = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Ds = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Cs = { class: "todoist-projects-toolbar-inner" }, xs = { class: "todoist-project-tabs-scroll" }, $s = ["onClick"], Ss = { class: "todoist-project-tab-name" }, Is = {
  key: 0,
  class: "todoist-project-actions-group"
}, _s = { class: "todoist-board" }, Rs = ["data-section-id", "data-title", "data-column-index"], Ls = { class: "todoist-board-column-head" }, Ps = {
  key: 0,
  class: "github-task-section-badge"
}, Os = ["title", "onClick"], As = ["onClick"], Ms = ["onSubmit"], js = ["onKeydown"], Es = {
  key: 0,
  class: "todoist-composer-images"
}, Ws = ["src"], Us = { class: "todoist-composer-img-name" }, zs = {
  key: 0,
  class: "todoist-composer-img-status"
}, Hs = ["onClick"], Bs = { class: "todoist-inline-actions" }, Ns = ["disabled"], Ks = ["disabled"], Vs = {
  key: 0,
  class: "todoist-column-empty"
}, Fs = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Gs = ["disabled", "title", "aria-label", "onClick"], Ys = { class: "todoist-board-task-main" }, qs = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Xs = ["onKeydown", "onBlur"], Qs = {
  key: 2,
  class: "todoist-board-task-title todoist-task-content"
}, Js = {
  key: 3,
  class: "todoist-board-task-description"
}, Zs = {
  key: 4,
  class: "todoist-board-task-meta"
}, tn = ["title"], en = ["title"], on = ["title"], sn = ["title"], nn = {
  key: 4,
  class: "todoist-board-extra"
}, an = ["onClick"], ln = ["src"], rn = ["data-group-index", "onDragover", "onDragleave", "onDrop"], dn = {
  key: 0,
  class: "todoist-column-empty"
}, un = ["onClick"], cn = { class: "github-group-icon" }, pn = ["title", "onClick"], mn = {
  key: 1,
  class: "github-group-title-text"
}, fn = { class: "github-group-badge" }, vn = { class: "todoist-github-group-cards" }, gn = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], bn = ["disabled", "title", "aria-label", "onClick"], kn = { class: "todoist-board-task-main" }, yn = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, hn = ["onKeydown", "onBlur"], wn = {
  key: 2,
  class: "todoist-board-task-title todoist-task-content"
}, Tn = {
  key: 3,
  class: "todoist-board-task-description"
}, Dn = {
  key: 4,
  class: "todoist-board-task-meta"
}, Cn = ["title"], xn = ["title"], $n = ["title"], Sn = ["title"], In = {
  key: 4,
  class: "todoist-board-extra"
}, _n = ["onClick"], Rn = ["src"], Ln = {
  key: 0,
  class: "todoist-board-add-column"
}, Pn = {
  key: 1,
  class: "todoist-add-section-form"
}, On = ["onKeydown"], An = ["disabled"], Mn = { class: "section-menu-text" }, jn = {
  key: 1,
  class: "todoist-section-menu-move-row"
}, En = ["disabled"], Wn = ["disabled"], Un = {
  key: 2,
  class: "todoist-section-menu-divider"
}, zn = { class: "todoist-task-menu-header" }, Hn = { class: "todoist-task-menu-title" }, Bn = { class: "todoist-menu-badge" }, Nn = {
  key: 0,
  class: "todoist-labels-panel"
}, Kn = { class: "todoist-labels-quick-input" }, Vn = ["onKeydown"], Fn = { class: "todoist-labels-chip-grid" }, Gn = ["onClick"], Yn = {
  key: 0,
  class: "chip-check"
}, qn = {
  key: 1,
  class: "todoist-recur-panel"
}, Xn = { class: "todoist-recur-grid" }, Qn = ["onClick"], Jn = { class: "todoist-recur-custom-row" }, Zn = ["onKeydown"], ti = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, ei = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, oi = {
  key: 2,
  class: "todoist-color-panel"
}, si = { class: "todoist-color-grid" }, ni = ["title", "onClick"], ii = { class: "todoist-color-name" }, ai = ["disabled", "onClick"], li = { class: "todoist-project-flyout-name" }, ri = {
  key: 0,
  class: "todoist-menu-badge"
}, di = { class: "todoist-menu-text" }, ui = ["onKeydown"], ci = { class: "todoist-dialog-head" }, pi = { class: "todoist-dialog-title" }, mi = { class: "todoist-dialog-body" }, fi = {
  key: 0,
  class: "todoist-dialog-desc"
}, vi = ["placeholder", "onKeydown"], gi = { class: "todoist-dialog-foot" }, bi = ["onKeydown"], ki = { class: "todoist-dialog-head" }, yi = { class: "todoist-dialog-icon" }, hi = { class: "todoist-dialog-title" }, wi = { class: "todoist-dialog-body" }, Ti = {
  key: 0,
  style: { background: "#fef2f2", padding: "10px 12px", "border-radius": "8px", border: "1px solid #fee2e2", "margin-bottom": "10px" }
}, Di = { style: { "font-weight": "700", color: "#dc2626", "font-size": "13.5px" } }, Ci = { style: { margin: "0", color: "#64748b", "font-size": "12.5px", "line-height": "1.5" } }, xi = { class: "todoist-dialog-foot" }, $i = /* @__PURE__ */ Et({
  __name: "TodoistTaskList",
  setup(a) {
    const o = Ut({});
    function m(s) {
      o[s] = !o[s];
    }
    function c(s) {
      return !!o[s];
    }
    function I(s) {
      if (!s) return "";
      const e = s.split("/");
      return e[e.length - 1] || s;
    }
    function C(s) {
      So.open(s);
    }
    function E(s) {
      const e = /* @__PURE__ */ new Map(), l = [];
      for (const k of s.tasks) {
        let G = "";
        try {
          const X = Do(k.id);
          X && X.length > 0 && X[0]?.fullName && (G = X[0].fullName);
        } catch {
        }
        G ? (e.has(G) || e.set(G, []), e.get(G).push(k)) : l.push(k);
      }
      const N = [], u = [...e.keys()].sort((k, G) => k.localeCompare(G));
      for (const k of u)
        N.push({
          key: "repo:" + k,
          fullName: k,
          isRepo: !0,
          tasks: e.get(k)
        });
      return l.length > 0 && N.push({
        key: "unlinked",
        fullName: "未关联仓库",
        isRepo: !1,
        tasks: l
      }), N;
    }
    const p = Dt;
    xo();
    function V(s) {
      D.isOpen = !1;
      try {
        Io(s), xe.show({ appName: "Todoist", title: ue(s) ? "已设为 GitHub 任务区" : "已取消 GitHub 任务区", message: s.title, showActions: !1 });
      } catch (e) {
        xe.show({ appName: "Todoist", title: "任务区未更新", message: e instanceof Error ? e.message : "本机配置保存失败。", showActions: !1 });
      }
    }
    const q = A(""), K = A(null), B = A(""), W = A([]);
    function U(s) {
      const e = s.clipboardData?.items;
      if (e)
        for (let l = 0; l < e.length; l++) {
          const N = e[l];
          if (N.type.indexOf("image") !== -1) {
            s.preventDefault();
            const u = N.getAsFile();
            if (!u) continue;
            const k = URL.createObjectURL(u), G = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), X = {
              file: u,
              previewUrl: k,
              name: `截图_${G}.png`,
              uploading: !1
            };
            W.value.push(X);
          }
        }
    }
    function w(s) {
      const e = W.value.splice(s, 1)[0];
      if (e && e.previewUrl)
        try {
          URL.revokeObjectURL(e.previewUrl);
        } catch {
        }
    }
    const $ = A(null), y = A(""), P = A(null), D = Ut({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), _ = Ut({
      isOpen: !1,
      title: "",
      message: "",
      value: "",
      placeholder: "",
      confirmText: "确定",
      actionType: "",
      payload: null
    }), Y = A(null), L = Ut({
      isOpen: !1,
      title: "确认操作",
      icon: "⚠️",
      alertText: "",
      message: "",
      confirmText: "确定",
      danger: !1,
      actionType: "",
      payload: null
    }), g = Ut({
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
    }), it = A(null), St = A(null), mt = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], It = [
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
    ], S = pt(() => String(g.task?._taskRaw?.project_id || g.col?.projectId || "")), j = pt(() => p.view !== "projects" ? null : p.projects.find((s) => String(s.id) === String(p.activeProjectId)) || p.projects[0] || null), O = pt(() => {
      const s = new Set(p.availableLabels || []);
      return g.task?.labels && g.task.labels.forEach((e) => s.add(e)), Array.from(s);
    }), M = pt(() => {
      const s = g.task?.customColorHex;
      return s && mt.find((l) => l.hex.toLowerCase() === s.toLowerCase()) || mt[0];
    });
    function F(s, e) {
      return s.sectionId || s.title || String(e);
    }
    function st() {
      return `${p.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function bt(s) {
      return s.startDate || s.dueText || s.labels && s.labels.length > 0 || s.timedDeadlineText || s.extraCountText;
    }
    function ot() {
      D.isOpen = !1, g.isOpen = !1, g.activeSubpanel = null;
    }
    const {
      draggingTaskId: ft,
      dragOverColIndex: tt,
      dragOverTaskId: vt,
      dragAfterTask: Mt,
      isDragPreview: at,
      previewTasks: H,
      onTaskDragStart: d,
      onTaskDragEnd: f,
      onColDragOver: Z,
      onColDragLeave: wt,
      onTaskDragOver: kt,
      onTaskDrop: Xt,
      onColDrop: Pt
    } = fs({
      state: p,
      isActive: () => J.active,
      editingTaskId: () => $.value,
      closePopovers: ot,
      moveTask: (s, e, l) => et.moveTask(s, e, l),
      dropLabel: (s, e) => {
        s.labels || (s.labels = []), s.labels.includes(e) || (s.labels.push(e), rt.getToken() && rt.updateTask(s.id, { labels: s.labels }));
      }
    });
    function ee(s, e) {
      et.dispatch("toggle-task", { task: s, group: e });
    }
    function oe(s, e) {
      if (s.completed) return;
      const l = e.target;
      l && l.closest("button,input,textarea,select,a") || ve(s);
    }
    function ve(s) {
      p.movingTaskId !== s.id && ($.value = s.id, y.value = s.content, Rt(() => {
        P.value && (P.value.focus(), P.value.select());
      }));
    }
    function Nt(s, e) {
      if ($.value !== s.id) return;
      const l = y.value.trim();
      $.value = null, e && l && l !== s.content && (s.content = l, et.dispatch("update-task-title", {
        taskId: s.id,
        content: l,
        task: s,
        newContent: l
      }));
    }
    function se(s, e) {
      s.key === "Enter" ? s.shiftKey || (s.preventDefault(), Nt(e, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), Nt(e, !1));
    }
    function ne(s, e) {
      e.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || dt.openTask(s.id, s);
    }
    function ge(s, e, l) {
      const N = l.currentTarget;
      K.value = F(s, e), B.value = "", Rt(() => {
        N.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function ie() {
      Ct.value || Wt();
    }
    function Wt() {
      K.value = null, B.value = "";
      for (const s of W.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      W.value = [];
    }
    const Ct = A(!1), ae = /* @__PURE__ */ new WeakMap();
    function Kt(s) {
      const e = s.description || s._taskRaw?.description || "", l = ae.get(s);
      if (l && l.source === e) return l;
      const N = e.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, u = {
        source: e,
        thumb: N,
        text: e.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return ae.set(s, u), u;
    }
    function Vt(s) {
      return Kt(s).text;
    }
    function h(s) {
      return Kt(s).thumb;
    }
    function v(s, e) {
      s && Ie.open(s, e?.content || "任务照片");
    }
    async function R(s) {
      if (!J.active || Ct.value) return;
      const e = [...W.value], l = B.value.trim() || e[0]?.name || "";
      if (!l) return;
      const N = K.value, u = B.value, k = p.view, G = s.projectId || k === "projects" && p.activeProjectId || void 0, X = s.sectionId !== void 0 ? s.sectionId : void 0;
      Ct.value = !0;
      try {
        await co(async () => {
          for (const lt of e)
            if (!lt.uploadedUrl) {
              lt.uploading = !0;
              try {
                const Te = await rt.uploadFile(lt.file, lt.name);
                lt.uploadedUrl = Te.file_url;
              } catch {
                lt.uploadedUrl = lt.previewUrl;
              } finally {
                lt.uploading = !1;
              }
            }
          await et.dispatch("add-task-submit", {
            content: l,
            view: k,
            group: s,
            projectId: G,
            sectionId: X,
            attachments: e.map((lt) => ({ file_url: lt.uploadedUrl, file_name: lt.name, file_type: lt.file.type || "image/png" }))
          }) && N === K.value && u === B.value && e.length === W.value.length && e.every((lt, Te) => lt === W.value[Te]) && Wt();
        });
      } catch {
        p.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        Ct.value = !1;
      }
    }
    function yt(s, e) {
      s.key === "Enter" && !s.shiftKey ? (s.preventDefault(), R(e)) : s.key === "Escape" && (s.preventDefault(), ie());
    }
    function xt() {
      const s = q.value.trim();
      if (!s) return;
      const l = p.columns.find((N) => N.projectId)?.projectId || p.activeProjectId || void 0;
      et.dispatch("add-section-submit", { name: s, projectId: l }), gt();
    }
    function gt() {
      p.addingSection = !1, q.value = "";
    }
    function Ft(s, e, l) {
      if (D.isOpen && D.col === s) {
        D.isOpen = !1;
        return;
      }
      g.isOpen = !1;
      const u = l.currentTarget.getBoundingClientRect(), G = Math.max(8, Math.min(window.innerWidth - 175 - 8, u.left)), X = Math.max(8, Math.min(window.innerHeight - 220, u.bottom + 4));
      D.col = s, D.x = G, D.y = X, D.canMoveLeft = e > 0 && !!p.columns[e - 1]?.sectionId, D.canMoveRight = e < p.columns.length - 1 && !!p.columns[e + 1]?.sectionId, D.isOpen = !0;
    }
    function _e(s, e) {
      D.isOpen = !1, et.dispatch("move-section", { sectionId: s.sectionId, direction: e });
    }
    function be(s, e, l) {
      if (p.movingTaskId === s.id || s.completed) return;
      D.isOpen = !1;
      const N = 236, u = 340, k = Math.max(8, Math.min(window.innerWidth - N - 8, l.clientX)), G = Math.max(8, Math.min(window.innerHeight - u - 8, l.clientY));
      if (g.task = s, g.col = e, g.x = k, g.y = G, g.activeSubpanel = null, g.descText = s.description || "", g.isSavingDesc = !1, g.newLabelText = "", g.customRecurText = "", s.dueDate) {
        const lt = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(lt.getTime()) && (g.calYear = lt.getFullYear(), g.calMonth = lt.getMonth());
      } else {
        const lt = /* @__PURE__ */ new Date();
        g.calYear = lt.getFullYear(), g.calMonth = lt.getMonth();
      }
      const X = 252, we = k + N + X > window.innerWidth - 8;
      g.flyoutOpenLeft = we, g.flyoutStyle = {
        left: we ? `${-X - 6}px` : `${N + 6}px`,
        top: "0px"
      }, g.isOpen = !0;
    }
    function le(s) {
      g.activeSubpanel === s ? g.activeSubpanel = null : (g.activeSubpanel = s, s === "desc" ? Rt(() => {
        it.value?.focus(), it.value?.select();
      }) : s === "labels" && Rt(() => {
        St.value?.focus();
      }));
    }
    function Re(s) {
      return !!g.task?.labels?.includes(s);
    }
    function qe(s) {
      if (!g.task) return;
      const e = g.task.id, l = [...g.task.labels || []], N = l.includes(s) ? l.filter((u) => u !== s) : [...l, s];
      g.task.labels = N, et.dispatch("update-task-labels", { taskId: e, labels: N });
    }
    function Le() {
      if (!g.task) return;
      const s = g.newLabelText.trim();
      if (!s) return;
      g.newLabelText = "";
      const e = g.task.id, l = [...g.task.labels || []];
      l.includes(s) || (l.push(s), g.task.labels = l, et.dispatch("update-task-labels", { taskId: e, labels: l })), ot();
    }
    function Xe(s) {
      return String(g.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function Qe(s, e) {
      if (!g.task) return;
      const l = g.task.id;
      et.dispatch("update-task-recurring", { taskId: l, rule: s, label: e }), ot();
    }
    function Pe() {
      if (!g.task) return;
      const s = g.customRecurText.trim();
      if (!s) return;
      const e = g.task.id;
      et.dispatch("update-task-recurring", { taskId: e, rule: s, label: s }), ot();
    }
    function Je() {
      if (!g.task) return;
      const s = g.task.id;
      et.dispatch("clear-task-recurring", { taskId: s }), ot();
    }
    function Ze(s) {
      if (!g.task) return;
      const e = g.task.id, l = mt.find((N) => N.id === s);
      g.task.customColorHex = l?.hex || "", et.dispatch("update-task-color", { taskId: e, colorId: s }), ot();
    }
    function to(s) {
      if (!g.task) return;
      const e = g.task.id;
      et.dispatch("move-task-to-project", {
        taskId: e,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), ot();
    }
    function eo() {
      if (!g.task) return;
      const s = g.task;
      ot(), s.isRecurring ? (L.title = "删除重复任务确认", L.icon = "⚠️", L.danger = !0, L.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", L.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, L.confirmText = "删除重复任务", L.actionType = "delete-task", L.payload = { taskId: s.id, isRecurring: !0 }, L.isOpen = !0) : (L.title = "删除任务确认", L.icon = "🗑️", L.danger = !0, L.alertText = `确定要删除任务「${s.content}」吗？`, L.message = "此操作不可撤销。", L.confirmText = "确认删除", L.actionType = "delete-task", L.payload = { taskId: s.id, isRecurring: !1 }, L.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, e, l) {
      be(s, e, l);
    });
    function Oe() {
      _.title = "新建项目", _.message = "请输入新项目名称：", _.value = "", _.placeholder = "项目名称…", _.confirmText = "创建", _.actionType = "create-project", _.payload = null, _.isOpen = !0, Rt(() => Y.value?.focus());
    }
    function oo(s) {
      _.title = "重命名项目", _.message = `正在重命名项目「${s.name}」：`, _.value = s.name, _.placeholder = "新项目名称…", _.confirmText = "保存", _.actionType = "rename-project", _.payload = { projectId: s.id }, _.isOpen = !0, Rt(() => {
        Y.value?.focus(), Y.value?.select();
      });
    }
    function so(s) {
      D.isOpen = !1, _.title = "重命名板块", _.message = `正在重命名板块「${s.title}」：`, _.value = s.title, _.placeholder = "新板块名称…", _.confirmText = "保存", _.actionType = "rename-section", _.payload = { sectionId: s.sectionId }, _.isOpen = !0, Rt(() => {
        Y.value?.focus(), Y.value?.select();
      });
    }
    function ke() {
      _.isOpen = !1;
    }
    function Ae() {
      const s = _.value.trim();
      if (!s) return;
      const { actionType: e, payload: l } = _;
      ke(), e === "create-project" ? et.dispatch("create-project-submit", s) : e === "rename-project" && l && "projectId" in l ? et.dispatch("rename-project-submit", { projectId: l.projectId, newName: s }) : e === "rename-section" && l && "sectionId" in l && et.dispatch("rename-section", { sectionId: l.sectionId, newName: s });
    }
    function no(s) {
      L.title = "删除项目确认", L.icon = "🗑️", L.danger = !0, L.alertText = `确定要彻底删除项目「${s.name}」吗？`, L.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！", L.confirmText = "彻底删除", L.actionType = "delete-project", L.payload = { projectId: s.id }, L.isOpen = !0;
    }
    function io(s) {
      D.isOpen = !1, L.title = "删除板块确认", L.icon = "🗑️", L.danger = !0, L.alertText = `确定要删除板块「${s.title}」吗？`, L.message = "板块内的任务将自动保留并移至默认收件箱。", L.confirmText = "删除板块", L.actionType = "delete-section", L.payload = { sectionId: s.sectionId }, L.isOpen = !0;
    }
    function ye() {
      L.isOpen = !1;
    }
    function ao() {
      const { actionType: s, payload: e } = L;
      ye(), s === "delete-project" && e && "projectId" in e ? et.dispatch("delete-project-submit", e.projectId) : s === "delete-section" && e && "sectionId" in e ? et.dispatch("delete-section", { sectionId: e.sectionId }) : s === "delete-task" && e && "taskId" in e && et.dispatch("delete-task-submit", e);
    }
    function lo(s) {
      et.dispatch("switch-project", s);
    }
    function he(s) {
      s.key === "Escape" && (g.isOpen && (g.isOpen = !1, g.activeSubpanel = null), D.isOpen && (D.isOpen = !1));
    }
    return ct(() => J.active, (s) => {
      document.removeEventListener("keydown", he), s && document.addEventListener("keydown", he);
    }, { immediate: !0, flush: "sync" }), Bt(() => {
      document.removeEventListener("keydown", he), Wt();
    }), (s, e) => (i(), r("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: ot
    }, [
      n(p).moveError && n(p).moveMessage ? (i(), r("p", ks, T(n(p).moveMessage), 1)) : x("", !0),
      n(p).emptyText && n(p).columns.length > 0 && !n(p).loading ? (i(), r("p", ys, T(n(p).emptyText) + " 已显示的任务保留。", 1)) : x("", !0),
      n(p).loading && n(p).columns.length === 0 ? (i(), r("p", hs, "加载中…")) : n(p).emptyText && n(p).columns.length === 0 ? (i(), r("p", ws, T(n(p).emptyText), 1)) : n(p).view === "projects" && n(p).projects.length === 0 ? (i(), r("div", Ts, [
        e[28] || (e[28] = t("div", { class: "empty-icon" }, "📁", -1)),
        e[29] || (e[29] = t("h3", null, "暂无自定义项目", -1)),
        e[30] || (e[30] = t("p", null, "你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！", -1)),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: Oe
        }, "＋ 新建第一个项目")
      ])) : (i(), r(nt, { key: 5 }, [
        n(p).view === "projects" && n(p).projects.length ? (i(), r("div", Ds, [
          t("div", Cs, [
            t("div", xs, [
              (i(!0), r(nt, null, ut(n(p).projects, (l) => (i(), r("button", {
                key: l.id,
                type: "button",
                class: Q(["todoist-project-tab", { active: String(l.id) === String(n(p).activeProjectId) }]),
                onClick: (N) => lo(l.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: Tt({ background: l.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", Ss, T(l.name), 1)
              ], 10, $s))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: Oe
              }, "＋ 新建项目")
            ]),
            j.value ? (i(), r("div", Is, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: "重命名项目",
                onClick: e[0] || (e[0] = (l) => oo(j.value))
              }, [...e[31] || (e[31] = [
                t("span", { class: "action-icon" }, "✏️", -1),
                t("span", { class: "action-text" }, "重命名", -1)
              ])]),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: "删除项目",
                onClick: e[1] || (e[1] = (l) => no(j.value))
              }, [...e[32] || (e[32] = [
                t("span", { class: "action-icon" }, "🗑️", -1),
                t("span", { class: "action-text" }, "删除项目", -1)
              ])])
            ])) : x("", !0)
          ])
        ])) : x("", !0),
        t("div", _s, [
          (i(!0), r(nt, null, ut(n(p).columns, (l, N) => (i(), r("section", {
            key: l.sectionId || l.title || N,
            class: "todoist-board-column",
            "data-section-id": l.sectionId,
            "data-title": l.title,
            "data-column-index": N
          }, [
            t("header", Ls, [
              t("h3", null, [
                Ht(T(l.title) + " ", 1),
                n(ue)(l) ? (i(), r("small", Ps, "GitHub任务区")) : x("", !0),
                t("span", null, T(l.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: l.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: z((u) => Ft(l, N, u), ["stop"])
              }, "•••", 8, Os)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (u) => ge(l, N, u)
            }, "＋ 添加任务", 8, As),
            K.value === F(l, N) ? (i(), r("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: z((u) => R(l), ["prevent"])
            }, [
              _t(t("textarea", {
                "onUpdate:modelValue": e[2] || (e[2] = (u) => B.value = u),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (u) => yt(u, l),
                onPaste: e[3] || (e[3] = (u) => U(u))
              }, null, 40, js), [
                [jt, B.value]
              ]),
              W.value.length > 0 ? (i(), r("div", Es, [
                (i(!0), r(nt, null, ut(W.value, (u, k) => (i(), r("div", {
                  key: k,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: u.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Ws),
                  t("span", Us, T(u.name), 1),
                  u.uploading ? (i(), r("span", zs, "上传中…")) : x("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (G) => w(k)
                  }, "×", 8, Hs)
                ]))), 128))
              ])) : x("", !0),
              t("div", Bs, [
                t("button", {
                  type: "button",
                  disabled: Ct.value,
                  onClick: ie
                }, "取消", 8, Ns),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: Ct.value
                }, T(Ct.value ? W.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Ks)
              ])
            ], 40, Ms)) : x("", !0),
            n(ue)(l) ? (i(), r("div", {
              key: 2,
              class: Q(["todoist-board-list todoist-github-grouped-list", { "drag-over": n(tt) === N }]),
              "data-group-index": N,
              onDragover: z((u) => n(Z)(u, N), ["prevent"]),
              onDragleave: (u) => n(wt)(u, N),
              onDrop: z((u) => n(Pt)(u, l), ["prevent"])
            }, [
              l.tasks.length === 0 && n(tt) !== N ? (i(), r("p", dn, " 暂无 GitHub 关联任务 · 可以在 GitHub 仓库详情右侧创建 ")) : x("", !0),
              (i(!0), r(nt, null, ut(E(l), (u) => (i(), r("div", {
                key: u.key,
                class: "todoist-github-group-block"
              }, [
                t("div", {
                  class: "todoist-github-group-header",
                  onClick: (k) => m(u.key)
                }, [
                  t("span", cn, T(u.isRepo ? "🐙" : "📁"), 1),
                  u.isRepo ? (i(), r("button", {
                    key: 0,
                    type: "button",
                    class: "github-group-title-btn",
                    title: "在插件内查看 GitHub 仓库详情: " + u.fullName,
                    onClick: z((k) => C(u.fullName), ["stop"])
                  }, T(I(u.fullName)), 9, pn)) : (i(), r("span", mn, T(u.fullName), 1)),
                  t("span", fn, T(u.tasks.length), 1),
                  t("span", {
                    class: Q(["github-group-collapse-arrow", { collapsed: c(u.key) }])
                  }, "▾", 2)
                ], 8, un),
                _t(t("div", vn, [
                  (i(!0), r(nt, null, ut(u.tasks, (k, G) => (i(), r("article", {
                    key: k.id,
                    class: Q(["todoist-board-task", [
                      {
                        completed: k.completed,
                        "has-custom-color": !!k.customColorHex,
                        editing: $.value === k.id,
                        "dragging-task": !n(at)(k) && n(ft) === k.id,
                        "drop-before": n(vt) === k.id && !n(Mt),
                        "drop-after": n(vt) === k.id && n(Mt),
                        "saving-position": n(p).movingTaskId === k.id,
                        "todoist-task-preview": n(at)(k),
                        "drag-origin-hidden": n(ft) === k.id && !n(at)(k) && n(tt) !== null
                      }
                    ]]),
                    style: Tt(k.customColorHex ? { "--task-custom-color": k.customColorHex } : {}),
                    "data-task-id": n(at)(k) ? void 0 : k.id,
                    "aria-hidden": n(at)(k) || void 0,
                    tabindex: n(at)(k) ? -1 : 0,
                    title: st(),
                    draggable: !n(at)(k) && !k.completed && !n(p).loading && !n(p).movingTaskId && !n(p).moveNeedsRefresh && $.value !== k.id && !k.id.startsWith("optimistic-"),
                    onDragstart: (X) => n(d)(X, k, l, G),
                    onDragend: e[9] || (e[9] = //@ts-ignore
                    (...X) => n(f) && n(f)(...X)),
                    onDragover: z((X) => n(kt)(X, k, l, G), ["stop", "prevent"]),
                    onDrop: z((X) => n(Xt)(X, k, l, G), ["stop", "prevent"]),
                    onDblclick: (X) => oe(k, X),
                    onClick: (X) => ne(k, X),
                    onContextmenu: z((X) => be(k, l, X), ["prevent", "stop"])
                  }, [
                    t("button", {
                      type: "button",
                      class: Q(["todoist-board-check", { checked: k.completed }]),
                      disabled: n(at)(k) || n(p).movingTaskId === k.id,
                      title: k.completed ? "撤销完成" : "完成任务",
                      "aria-label": (k.completed ? "撤销完成：" : "完成：") + k.content,
                      onClick: z((X) => ee(k, l), ["stop"])
                    }, null, 10, bn),
                    t("div", kn, [
                      n(p).movingTaskId === k.id ? (i(), r("span", yn, "保存中")) : x("", !0),
                      $.value === k.id ? _t((i(), r("textarea", {
                        key: 1,
                        ref_for: !0,
                        ref_key: "editingInputRef",
                        ref: P,
                        "onUpdate:modelValue": e[7] || (e[7] = (X) => y.value = X),
                        class: "todoist-task-editor",
                        rows: "2",
                        "aria-label": "编辑任务名称",
                        onKeydown: (X) => se(X, k),
                        onBlur: (X) => Nt(k, !0),
                        onClick: e[8] || (e[8] = z(() => {
                        }, ["stop"]))
                      }, null, 40, hn)), [
                        [jt, y.value]
                      ]) : (i(), r("p", wn, T(k.content || "未命名任务"), 1)),
                      Vt(k) ? (i(), r("p", Tn, T(Vt(k)), 1)) : x("", !0),
                      bt(k) ? (i(), r("div", Dn, [
                        k.startDate && !k.dueDate ? (i(), r("span", {
                          key: 0,
                          class: "todoist-board-due start-only",
                          title: `开始时间：${k.startDate}`
                        }, " 🛫 自 " + T(n(Gt)(k.startDate)) + " 起 ", 9, Cn)) : k.startDate && k.dueDate ? (i(), r("span", {
                          key: 1,
                          class: "todoist-board-due date-range",
                          title: `时间区间：${k.startDate} 至 ${k.dueDate}`
                        }, " ⏱ " + T(n(Gt)(k.startDate)) + " ~ " + T(n(Gt)(k.dueDate)), 9, xn)) : k.dueText ? (i(), r("span", {
                          key: 2,
                          class: Q(["todoist-board-due", { recurring: k.isRecurring }]),
                          title: k.isRecurring ? `循环任务：${k.dueString || k.dueText}` : void 0
                        }, T(k.isRecurring ? "↻ " : "▣ ") + T(k.dueText), 11, $n)) : x("", !0),
                        (i(!0), r(nt, null, ut((k.labels || []).slice(0, 3), (X) => (i(), r("span", {
                          key: X,
                          class: "todoist-board-label"
                        }, "◇ " + T(X), 1))), 128)),
                        k.timedDeadlineText ? (i(), r("span", {
                          key: 3,
                          class: "todoist-board-timer",
                          title: (k.timedDurationMinutes || 0) + "分钟时间限制"
                        }, "⏱ " + T(k.timedDeadlineText), 9, Sn)) : x("", !0),
                        k.extraCountText ? (i(), r("span", In, T(k.extraCountText), 1)) : x("", !0)
                      ])) : x("", !0),
                      h(k) ? (i(), r("div", {
                        key: 5,
                        class: "todoist-card-thumb-wrap",
                        title: "点击在小窗查看大图",
                        onClick: z((X) => v(h(k), k), ["stop"])
                      }, [
                        t("img", {
                          src: h(k),
                          class: "todoist-card-thumb",
                          alt: "任务照片",
                          loading: "lazy"
                        }, null, 8, Rn),
                        e[34] || (e[34] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                      ], 8, _n)) : x("", !0)
                    ])
                  ], 46, gn))), 128))
                ], 512), [
                  [me, !c(u.key)]
                ])
              ]))), 128))
            ], 42, rn)) : (i(), Lt(bs, {
              key: 1,
              tasks: n(H)(l, N),
              "pinned-id": n(ft) || $.value,
              "hidden-id": n(tt) !== null ? n(ft) : null,
              "is-preview": n(at),
              class: Q(["todoist-board-list", { "drag-over": n(tt) === N }]),
              "data-group-index": N,
              onDragover: z((u) => n(Z)(u, N), ["prevent"]),
              onDragleave: (u) => n(wt)(u, N),
              onDrop: z((u) => n(Pt)(u, l), ["prevent"])
            }, {
              empty: Zt(() => [
                l.tasks.length === 0 && n(tt) !== N ? (i(), r("p", Vs, " 暂无任务 · 可拖到这里 ")) : x("", !0)
              ]),
              default: Zt(({ task: u, index: k }) => [
                t("article", {
                  class: Q(["todoist-board-task", [
                    {
                      completed: u.completed,
                      "has-custom-color": !!u.customColorHex,
                      editing: $.value === u.id,
                      "dragging-task": !n(at)(u) && n(ft) === u.id,
                      "drop-before": n(vt) === u.id && !n(Mt),
                      "drop-after": n(vt) === u.id && n(Mt),
                      "saving-position": n(p).movingTaskId === u.id,
                      "todoist-task-preview": n(at)(u),
                      "drag-origin-hidden": n(ft) === u.id && !n(at)(u) && n(tt) !== null
                    }
                  ]]),
                  style: Tt(u.customColorHex ? { "--task-custom-color": u.customColorHex } : {}),
                  "data-task-id": n(at)(u) ? void 0 : u.id,
                  "aria-hidden": n(at)(u) || void 0,
                  tabindex: n(at)(u) ? -1 : 0,
                  title: st(),
                  draggable: !n(at)(u) && !u.completed && !n(p).loading && !n(p).movingTaskId && !n(p).moveNeedsRefresh && $.value !== u.id && !u.id.startsWith("optimistic-"),
                  onDragstart: (G) => n(d)(G, u, l, k),
                  onDragend: e[6] || (e[6] = //@ts-ignore
                  (...G) => n(f) && n(f)(...G)),
                  onDragover: z((G) => n(kt)(G, u, l, k), ["stop", "prevent"]),
                  onDrop: z((G) => n(Xt)(G, u, l, k), ["stop", "prevent"]),
                  onDblclick: (G) => oe(u, G),
                  onClick: (G) => ne(u, G),
                  onContextmenu: z((G) => be(u, l, G), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: Q(["todoist-board-check", { checked: u.completed }]),
                    disabled: n(at)(u) || n(p).movingTaskId === u.id,
                    title: u.completed ? "撤销完成" : "完成任务",
                    "aria-label": (u.completed ? "撤销完成：" : "完成：") + u.content,
                    onClick: z((G) => ee(u, l), ["stop"])
                  }, null, 10, Gs),
                  t("div", Ys, [
                    n(p).movingTaskId === u.id ? (i(), r("span", qs, "保存中")) : x("", !0),
                    $.value === u.id ? _t((i(), r("textarea", {
                      key: 1,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: P,
                      "onUpdate:modelValue": e[4] || (e[4] = (G) => y.value = G),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (G) => se(G, u),
                      onBlur: (G) => Nt(u, !0),
                      onClick: e[5] || (e[5] = z(() => {
                      }, ["stop"]))
                    }, null, 40, Xs)), [
                      [jt, y.value]
                    ]) : (i(), r("p", Qs, T(u.content || "未命名任务"), 1)),
                    Vt(u) ? (i(), r("p", Js, T(Vt(u)), 1)) : x("", !0),
                    bt(u) ? (i(), r("div", Zs, [
                      u.startDate && !u.dueDate ? (i(), r("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${u.startDate}`
                      }, " 🛫 自 " + T(n(Gt)(u.startDate)) + " 起 ", 9, tn)) : u.startDate && u.dueDate ? (i(), r("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${u.startDate} 至 ${u.dueDate}`
                      }, " ⏱ " + T(n(Gt)(u.startDate)) + " ~ " + T(n(Gt)(u.dueDate)), 9, en)) : u.dueText ? (i(), r("span", {
                        key: 2,
                        class: Q(["todoist-board-due", { recurring: u.isRecurring }]),
                        title: u.isRecurring ? `循环任务：${u.dueString || u.dueText}` : void 0
                      }, T(u.isRecurring ? "↻ " : "▣ ") + T(u.dueText), 11, on)) : x("", !0),
                      (i(!0), r(nt, null, ut((u.labels || []).slice(0, 3), (G) => (i(), r("span", {
                        key: G,
                        class: "todoist-board-label"
                      }, "◇ " + T(G), 1))), 128)),
                      u.timedDeadlineText ? (i(), r("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (u.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + T(u.timedDeadlineText), 9, sn)) : x("", !0),
                      u.extraCountText ? (i(), r("span", nn, T(u.extraCountText), 1)) : x("", !0)
                    ])) : x("", !0),
                    h(u) ? (i(), r("div", {
                      key: 5,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: z((G) => v(h(u), u), ["stop"])
                    }, [
                      t("img", {
                        src: h(u),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, ln),
                      e[33] || (e[33] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, an)) : x("", !0)
                  ])
                ], 46, Fs)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"]))
          ], 8, Rs))), 128)),
          n(p).view === "inbox" || n(p).view === "projects" ? (i(), r("div", Ln, [
            n(p).addingSection ? (i(), r("div", Pn, [
              _t(t("input", {
                "onUpdate:modelValue": e[11] || (e[11] = (l) => q.value = l),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  $t(z(xt, ["prevent"]), ["enter"]),
                  $t(gt, ["esc"])
                ]
              }, null, 40, On), [
                [jt, q.value]
              ]),
              t("div", { class: "todoist-add-section-actions" }, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: xt
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: gt
                }, "取消")
              ])
            ])) : (i(), r("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: e[10] || (e[10] = (l) => n(p).addingSection = !0)
            }, [...e[35] || (e[35] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : x("", !0)
        ])
      ], 64)),
      D.isOpen && D.col ? (i(), r("div", {
        key: 6,
        class: "todoist-section-menu",
        style: Tt({ left: D.x + "px", top: D.y + "px" }),
        onClick: e[17] || (e[17] = z(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: e[12] || (e[12] = (l) => so(D.col))
        }, [...e[36] || (e[36] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        D.col.sectionId && D.col.projectId ? (i(), r("button", {
          key: 0,
          type: "button",
          class: "todoist-section-menu-item",
          disabled: n($o).saving,
          onClick: e[13] || (e[13] = (l) => V(D.col))
        }, [
          e[37] || (e[37] = t("span", { class: "section-menu-icon" }, "◇", -1)),
          t("span", Mn, T(n(ue)(D.col) ? "取消 GitHub 任务区" : "设为 GitHub 任务区"), 1)
        ], 8, An)) : x("", !0),
        D.col.sectionId ? (i(), r("div", jn, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !D.canMoveLeft,
            title: "向左移动板块",
            onClick: e[14] || (e[14] = (l) => _e(D.col, -1))
          }, "◀ 左移", 8, En),
          e[38] || (e[38] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !D.canMoveRight,
            title: "向右移动板块",
            onClick: e[15] || (e[15] = (l) => _e(D.col, 1))
          }, "右移 ▶", 8, Wn)
        ])) : x("", !0),
        D.col.sectionId ? (i(), r("div", Un)) : x("", !0),
        D.col.sectionId ? (i(), r("button", {
          key: 3,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: e[16] || (e[16] = (l) => io(D.col))
        }, [...e[39] || (e[39] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : x("", !0)
      ], 4)) : x("", !0),
      g.isOpen && g.task ? (i(), r("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: Tt({ left: g.x + "px", top: g.y + "px" }),
        role: "menu",
        onClick: e[24] || (e[24] = z(() => {
        }, ["stop"]))
      }, [
        t("div", zn, [
          t("span", Hn, T(g.task.content || "任务操作"), 1)
        ]),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: g.activeSubpanel === "labels" }]),
          onClick: e[18] || (e[18] = (l) => le("labels"))
        }, [
          e[40] || (e[40] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          e[41] || (e[41] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", Bn, T(g.task.labels && g.task.labels.length ? `已选 ${g.task.labels.length}` : "无"), 1)
        ], 2),
        g.activeSubpanel === "labels" ? (i(), r("div", Nn, [
          t("div", Kn, [
            _t(t("input", {
              "onUpdate:modelValue": e[19] || (e[19] = (l) => g.newLabelText = l),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: $t(z(Le, ["prevent"]), ["enter"])
            }, null, 40, Vn), [
              [jt, g.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Le
            }, "＋")
          ]),
          t("div", Fn, [
            (i(!0), r(nt, null, ut(O.value, (l) => (i(), r("button", {
              key: l,
              type: "button",
              class: Q(["todoist-label-chip", { selected: Re(l) }]),
              onClick: (N) => qe(l)
            }, [
              t("span", null, "◇ " + T(l), 1),
              Re(l) ? (i(), r("span", Yn, "✓")) : x("", !0)
            ], 10, Gn))), 128))
          ])
        ])) : x("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: g.activeSubpanel === "recur" }]),
          onClick: e[20] || (e[20] = (l) => le("recur"))
        }, [
          e[42] || (e[42] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          e[43] || (e[43] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: Tt(g.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, T(g.task.isRecurring ? g.task.dueString || "循环" : "无"), 5)
        ], 2),
        g.activeSubpanel === "recur" ? (i(), r("div", qn, [
          t("div", Xn, [
            (i(), r(nt, null, ut(It, (l) => t("button", {
              key: l.rule,
              type: "button",
              class: Q(["todoist-recur-chip", { selected: Xe(l.rule) }]),
              onClick: (N) => Qe(l.rule, l.label)
            }, [
              t("span", null, T(l.icon), 1),
              t("span", null, T(l.label), 1)
            ], 10, Qn)), 64))
          ]),
          t("div", Jn, [
            _t(t("input", {
              "onUpdate:modelValue": e[21] || (e[21] = (l) => g.customRecurText = l),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: $t(z(Pe, ["prevent"]), ["enter"])
            }, null, 40, Zn), [
              [jt, g.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Pe
            }, "确定")
          ]),
          g.task.isRecurring ? (i(), r("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: Je
          }, "❌ 清除循环（转为单次任务）")) : x("", !0)
        ])) : x("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: g.activeSubpanel === "color" }]),
          onClick: e[22] || (e[22] = (l) => le("color"))
        }, [
          e[44] || (e[44] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          e[45] || (e[45] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", ti, [
            M.value.id === "none" ? (i(), r("span", ei, "⊘")) : (i(), r("span", {
              key: 1,
              class: "todoist-color-dot",
              style: Tt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: M.value.hex
              })
            }, null, 4)),
            Ht(" " + T(M.value.name), 1)
          ])
        ], 2),
        g.activeSubpanel === "color" ? (i(), r("div", oi, [
          t("div", si, [
            (i(), r(nt, null, ut(mt, (l) => t("button", {
              key: l.id,
              type: "button",
              class: Q(["todoist-color-swatch", { selected: M.value.id === l.id }]),
              title: l.name,
              onClick: (N) => Ze(l.id)
            }, [
              t("span", {
                class: Q(["todoist-color-dot", { none: l.id === "none" }]),
                style: Tt(l.id !== "none" ? { background: l.hex } : {})
              }, T(l.id === "none" ? M.value.id === "none" ? "✓" : "⊘" : M.value.id === l.id ? "✓" : ""), 7),
              t("span", ii, T(l.name), 1)
            ], 10, ni)), 64))
          ])
        ])) : x("", !0),
        t("button", {
          type: "button",
          class: Q(["todoist-task-menu-item", { active: g.activeSubpanel === "project" }]),
          onClick: e[23] || (e[23] = (l) => le("project"))
        }, [...e[46] || (e[46] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        g.activeSubpanel === "project" ? (i(), r("div", {
          key: 3,
          class: Q(["todoist-project-flyout", { "open-left": g.flyoutOpenLeft }]),
          style: Tt(g.flyoutStyle)
        }, [
          (i(!0), r(nt, null, ut(n(p).projects, (l) => (i(), r("button", {
            key: l.id,
            type: "button",
            class: Q(["todoist-project-flyout-item", { active: String(l.id) === S.value }]),
            disabled: !!n(p).movingTaskId || String(l.id) === S.value,
            onClick: (N) => to(l)
          }, [
            e[47] || (e[47] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", li, T(l.name), 1),
            String(l.id) === S.value ? (i(), r("span", ri, "当前")) : x("", !0)
          ], 10, ai))), 128))
        ], 6)) : x("", !0),
        e[49] || (e[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: eo
        }, [
          e[48] || (e[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", di, T(g.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : x("", !0),
      _.isOpen && n(J).active ? (i(), r("div", {
        key: 8,
        class: "todoist-dialog-overlay",
        onKeydown: $t(z(ke, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: e[26] || (e[26] = z(() => {
          }, ["stop"]))
        }, [
          t("div", ci, [
            e[50] || (e[50] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
            t("h3", pi, T(_.title), 1)
          ]),
          t("div", mi, [
            _.message ? (i(), r("p", fi, T(_.message), 1)) : x("", !0),
            _t(t("input", {
              ref_key: "promptInputRef",
              ref: Y,
              "onUpdate:modelValue": e[25] || (e[25] = (l) => _.value = l),
              type: "text",
              class: "todoist-dialog-input",
              placeholder: _.placeholder,
              onKeydown: $t(z(Ae, ["prevent"]), ["enter"])
            }, null, 40, vi), [
              [jt, _.value]
            ])
          ]),
          t("div", gi, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: ke
            }, "取消"),
            t("button", {
              type: "button",
              class: "todoist-dialog-btn primary",
              onClick: Ae
            }, T(_.confirmText || "确定"), 1)
          ])
        ])
      ], 40, ui)) : x("", !0),
      L.isOpen && n(J).active ? (i(), r("div", {
        key: 9,
        class: "todoist-dialog-overlay",
        onKeydown: $t(z(ye, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: e[27] || (e[27] = z(() => {
          }, ["stop"]))
        }, [
          t("div", ki, [
            t("span", yi, T(L.icon || "⚠️"), 1),
            t("h3", hi, T(L.title), 1)
          ]),
          t("div", wi, [
            L.danger ? (i(), r("div", Ti, [
              t("div", Di, T(L.alertText), 1)
            ])) : x("", !0),
            t("p", Ci, T(L.message), 1)
          ]),
          t("div", xi, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: ye
            }, "取消"),
            t("button", {
              type: "button",
              class: Q(["todoist-dialog-btn", L.danger ? "danger" : "primary"]),
              onClick: ao
            }, T(L.confirmText || "确定"), 3)
          ])
        ])
      ], 40, bi)) : x("", !0)
    ]));
  }
}), Si = /* @__PURE__ */ qt($i, [["__scopeId", "data-v-9eb99126"]]), Ii = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, _i = { class: "reminder-shortcuts" }, Ri = ["disabled"], Li = { class: "reminder-preview" }, Pi = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, Oi = ["disabled"], Ai = ["disabled"], Mi = ["disabled"], ji = /* @__PURE__ */ Et({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(a, { emit: o }) {
    const m = a, c = o, I = m.value || (m.taskDate ? m.taskDate + "T" + (m.taskTime || "09:00") : ""), C = A(I.slice(0, 10)), E = A(I.slice(11, 16)), p = A(!1), V = A(""), q = A(!0), K = pt(() => C.value && E.value ? (/* @__PURE__ */ new Date(C.value + "T" + E.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function B(U) {
      if (p.value) return;
      const w = /* @__PURE__ */ new Date();
      U === "tomorrow" ? (w.setDate(w.getDate() + 1), w.setHours(9, 0, 0, 0)) : w.setTime(w.getTime() + U * 6e4), C.value = `${w.getFullYear()}-${String(w.getMonth() + 1).padStart(2, "0")}-${String(w.getDate()).padStart(2, "0")}`, E.value = `${String(w.getHours()).padStart(2, "0")}:${String(w.getMinutes()).padStart(2, "0")}`, V.value = "", q.value = !0;
    }
    async function W(U) {
      if (!(p.value || J.pendingWrites)) {
        if (U && (!Number.isFinite(Date.parse(U)) || Date.parse(U) <= Date.now())) {
          V.value = "请选择未来的提醒时间。";
          return;
        }
        if (b.taskId === m.taskId) {
          p.value = !0, V.value = "";
          try {
            if (await dt.setReminder(U), b.taskId !== m.taskId) return;
            b.error ? V.value = b.error : b.reminderTime === U && c("close");
          } finally {
            p.value = !1;
          }
        }
      }
    }
    return (U, w) => (i(), Lt($e, {
      anchor: a.anchor,
      onClose: w[9] || (w[9] = ($) => c("close"))
    }, {
      default: Zt(() => [
        t("section", Ii, [
          w[11] || (w[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", _i, [
            t("button", {
              type: "button",
              onClick: w[0] || (w[0] = ($) => B(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: w[1] || (w[1] = ($) => B(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: w[2] || (w[2] = ($) => B("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: p.value }, [
            w[10] || (w[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Qt(Se, {
              modelValue: C.value,
              "onUpdate:modelValue": w[3] || (w[3] = ($) => C.value = $),
              "time-value": E.value,
              "onUpdate:timeValue": w[4] || (w[4] = ($) => E.value = $),
              embedded: "",
              onTimeValidity: w[5] || (w[5] = ($) => q.value = $)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, Ri),
          t("div", Li, T(K.value || "选择提醒的日期和时间"), 1),
          w[12] || (w[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          V.value ? (i(), r("p", Pi, T(V.value), 1)) : x("", !0),
          t("footer", null, [
            a.value ? (i(), r("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: p.value || !!n(J).pendingWrites,
              onClick: w[6] || (w[6] = ($) => W(""))
            }, "移除提醒", 8, Oi)) : x("", !0),
            t("button", {
              type: "button",
              disabled: p.value,
              onClick: w[7] || (w[7] = ($) => c("close"))
            }, "取消", 8, Ai),
            t("button", {
              type: "button",
              class: "save",
              disabled: p.value || !!n(J).pendingWrites || !C.value || !E.value || !q.value,
              onClick: w[8] || (w[8] = ($) => W(C.value + "T" + E.value))
            }, T(p.value ? "保存中…" : "设置提醒"), 9, Mi)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), Ei = /* @__PURE__ */ qt(ji, [["__scopeId", "data-v-da9e3ddd"]]), Wi = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, Ui = { class: "inspector-main-col" }, zi = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Hi = { class: "inspector-section inspector-title-section" }, Bi = { class: "task-title-row" }, Ni = {
  key: 0,
  class: "check-mark"
}, Ki = ["value", "disabled"], Vi = ["value", "disabled"], Fi = ["onKeydown"], Gi = {
  key: 0,
  class: "desc-placeholder-btn"
}, Yi = ["innerHTML"], qi = {
  key: 2,
  role: "status"
}, Xi = {
  key: 3,
  class: "attached-img-grid"
}, Qi = ["onClick"], Ji = ["src", "alt"], Zi = { class: "attached-img-info" }, ta = ["onClick"], ea = { class: "inspector-section inspector-subtasks-section" }, oa = {
  key: 0,
  class: "subtasks-list"
}, sa = ["onClick"], na = {
  key: 0,
  class: "check-tick"
}, ia = { class: "subtask-content-text" }, aa = ["onClick"], la = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, ra = ["value"], da = { class: "subtask-actions" }, ua = { class: "inspector-section inspector-comments-section" }, ca = { class: "comment-input-bar" }, pa = { class: "comment-input-wrap" }, ma = ["value", "disabled"], fa = ["disabled"], va = {
  key: 0,
  class: "comments-list"
}, ga = { class: "comment-item-content" }, ba = { class: "comment-item-header" }, ka = { class: "comment-time" }, ya = { class: "comment-text" }, ha = {
  key: 0,
  class: "comment-attached-thumb"
}, wa = ["src", "onClick"], Ta = { class: "inspector-side-col" }, Da = { class: "side-prop-group date-picker-anchor" }, Ca = { class: "row-text" }, xa = { class: "side-prop-group date-picker-anchor" }, $a = { class: "row-text" }, Sa = { class: "side-prop-group" }, Ia = { class: "row-text" }, _a = { class: "inspector-menu" }, Ra = ["disabled", "onClick"], La = { key: 0 }, Pa = { class: "side-prop-group" }, Oa = { class: "row-text" }, Aa = { class: "inspector-menu" }, Ma = ["onKeydown"], ja = { key: 0 }, Ea = {
  key: 1,
  role: "alert"
}, Wa = { class: "label-options-list" }, Ua = ["checked", "disabled", "onChange"], za = ["disabled"], Ha = { key: 3 }, Ba = { class: "side-prop-group" }, Na = { class: "row-text" }, Ka = /* @__PURE__ */ Et({
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
  setup(a, { emit: o }) {
    const m = a, c = o, I = A(!1), C = A(null), E = A(null);
    let p;
    fe(() => {
      let H = -1;
      p = new ResizeObserver((d) => {
        const f = d[0]?.contentRect.width;
        f !== H && (H = f, K(E.value), K(C.value));
      }), E.value?.parentElement && p.observe(E.value.parentElement);
    }), Bt(() => p?.disconnect());
    const V = pt(() => {
      if (!m.editDescription) return "";
      const H = m.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), d = document.createElement("template");
      d.innerHTML = _o.renderMarkdown(H);
      const f = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const Z of Array.from(d.content.querySelectorAll("*"))) {
        if (!f.has(Z.tagName)) {
          Z.replaceWith(document.createTextNode(Z.textContent || ""));
          continue;
        }
        const wt = Z.tagName === "A" ? Z.getAttribute("href") : null;
        for (const kt of Array.from(Z.attributes)) Z.removeAttribute(kt.name);
        wt && /^(https?:\/\/|mailto:)/i.test(wt) && (Z.setAttribute("href", wt), Z.setAttribute("target", "_blank"), Z.setAttribute("rel", "noopener noreferrer"));
      }
      return d.innerHTML;
    });
    function q() {
      I.value = !0, Rt(() => {
        K(C.value), C.value?.focus();
      });
    }
    function K(H) {
      H && (H.style.height = "auto", H.style.height = H.scrollHeight + "px");
    }
    function B(H) {
      K(H.el);
    }
    function W(H) {
      const d = H.target;
      K(d), c("update:editDescription", d.value), c("scheduleDraftSave", H);
    }
    function U() {
      c("saveTitleAndDesc"), I.value = !1;
    }
    const w = A(!1), $ = A(!1), y = A(null), P = A(null), D = A(!1), _ = A(!1), Y = A(!1), L = A(""), g = A(null), it = A(null), St = A(null), mt = A([]), It = A(!1), S = A("");
    let j;
    ct(() => [m.state.taskId, _.value], async (H, d, f) => {
      if (j?.abort(), !_.value) return;
      const Z = new AbortController();
      j = Z, f(() => Z.abort()), mt.value = [], It.value = !0, S.value = "";
      try {
        const wt = await rt.getLabels(Z.signal);
        Z.signal.aborted || (mt.value = wt.map((kt) => kt.name));
      } catch {
        Z.signal.aborted || (S.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        Z.signal.aborted || (It.value = !1);
      }
    });
    function O() {
      Y.value = !0;
    }
    const M = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function F(H) {
      switch (H) {
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
    function st(H) {
      D.value = !1, c("selectPriority", H);
    }
    const bt = pt(() => {
      const H = /* @__PURE__ */ new Set([...mt.value, ...m.availableLabels || []]);
      for (const d of m.state.labels || []) H.add(d);
      return Array.from(H);
    }), ot = pt(() => {
      const H = L.value.trim().toLowerCase();
      return H ? bt.value.filter((d) => d.toLowerCase().includes(H)) : bt.value;
    });
    function ft() {
      const H = L.value.trim();
      H && (c("createLabel", H), L.value = "");
    }
    function tt(H, d) {
      Ie.open(H, d);
    }
    function vt(H, d) {
      if (!H) return "";
      try {
        const f = H.split("-"), Z = parseInt(f[1], 10), wt = parseInt(f[2], 10), kt = d ? ` ${d}` : "";
        return `${Z}月${wt}日${kt}`;
      } catch {
        return H;
      }
    }
    function Mt(H) {
      if (!H) return "";
      try {
        const d = new Date(H);
        return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } catch {
        return H;
      }
    }
    function at(H) {
      if (!H) return "刚刚";
      try {
        const d = new Date(H);
        return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } catch {
        return H;
      }
    }
    return (H, d) => a.state.isOpen ? (i(), r("div", Wi, [
      t("main", Ui, [
        a.state.error ? (i(), r("p", zi, T(a.state.error), 1)) : x("", !0),
        t("section", Hi, [
          t("div", Bi, [
            t("button", {
              type: "button",
              class: Q(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: "标记完成/撤销",
              onClick: d[0] || (d[0] = (f) => c("toggleComplete"))
            }, [
              a.isTaskCompleted ? (i(), r("span", Ni, "✓")) : x("", !0)
            ], 2),
            t("textarea", {
              value: a.editTitle,
              rows: "1",
              "aria-label": "任务标题",
              onVnodeMounted: B,
              onVnodeUpdated: B,
              disabled: a.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: E,
              class: Q(["inspector-input-title", { "title-done": a.isTaskCompleted }]),
              placeholder: "任务标题",
              onInput: d[1] || (d[1] = (f) => {
                K(f.target), c("update:editTitle", f.target.value), c("scheduleDraftSave", f);
              }),
              onCompositionend: d[2] || (d[2] = (f) => c("scheduleDraftSave", f)),
              onBlur: d[3] || (d[3] = (f) => c("saveTitleAndDesc", f)),
              onKeydown: d[4] || (d[4] = $t(z((f) => c("saveTitleAndDesc", f), ["prevent"]), ["enter"]))
            }, null, 42, Ki)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: d[7] || (d[7] = z((f) => c("dragover"), ["prevent"])),
          onDragleave: d[8] || (d[8] = z((f) => c("dragleave"), ["prevent"])),
          onDrop: d[9] || (d[9] = z((f) => c("dropImage", f), ["prevent"]))
        }, [
          I.value ? (i(), r("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: C,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: "描述",
            disabled: a.isUploadingImg,
            onInput: W,
            onCompositionend: d[5] || (d[5] = (f) => c("scheduleDraftSave", f)),
            onBlur: U,
            onPaste: d[6] || (d[6] = (f) => c("descPaste", f))
          }, null, 40, Vi)) : (i(), r("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: q,
            onKeydown: $t(z(q, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (i(), r("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: V.value
            }, null, 8, Yi)) : (i(), r("span", Gi, "≡ 描述"))
          ], 40, Fi)),
          a.isUploadingImg ? (i(), r("small", qi, "图片上传中…")) : x("", !0),
          a.attachedImages.length ? (i(), r("div", Xi, [
            (i(!0), r(nt, null, ut(a.attachedImages, (f) => (i(), r("div", {
              key: f.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (Z) => tt(f.url, f.name)
              }, [
                t("img", {
                  src: f.url,
                  alt: f.name,
                  loading: "lazy"
                }, null, 8, Ji)
              ], 8, Qi),
              t("div", Zi, [
                t("span", null, T(f.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Z) => c("removeAttachedImage", f.url)
                }, "×", 8, ta)
              ])
            ]))), 128))
          ])) : x("", !0)
        ], 32),
        t("section", ea, [
          a.subtasks.length > 0 ? (i(), r("div", oa, [
            (i(!0), r(nt, null, ut(a.subtasks, (f) => (i(), r("div", {
              key: f.id,
              class: Q(["subtask-row-item", { done: f.completed }])
            }, [
              t("button", {
                type: "button",
                class: Q(["subtask-check-circle", { checked: f.completed }]),
                onClick: (Z) => c("toggleSubtask", f.id)
              }, [
                f.completed ? (i(), r("span", na, "✓")) : x("", !0)
              ], 10, sa),
              t("span", ia, T(f.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: "删除子任务",
                onClick: (Z) => c("removeSubtask", f.id)
              }, "×", 8, aa)
            ], 2))), 128))
          ])) : x("", !0),
          a.isAddingSubtask ? (i(), r("div", la, [
            t("input", {
              value: a.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: "输入子任务并回车…",
              onInput: d[10] || (d[10] = (f) => c("update:newSubtaskText", f.target.value)),
              onKeydown: [
                d[11] || (d[11] = $t(z((f) => c("confirmAddSubtask"), ["prevent"]), ["enter"])),
                d[12] || (d[12] = $t((f) => c("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, ra),
            t("div", da, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: d[13] || (d[13] = (f) => c("confirmAddSubtask"))
              }, "添加"),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: d[14] || (d[14] = (f) => c("update:isAddingSubtask", !1))
              }, "取消")
            ])
          ])) : (i(), r("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: d[15] || (d[15] = (f) => c("update:isAddingSubtask", !0))
          }, [...d[38] || (d[38] = [
            t("span", { class: "subtask-plus-icon" }, "＋", -1),
            Ht(" 添加子任务 ", -1)
          ])]))
        ]),
        (i(), Lt(Co, {
          key: a.state.taskId,
          "task-id": a.state.taskId
        }, null, 8, ["task-id"])),
        t("section", ua, [
          t("div", ca, [
            d[39] || (d[39] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", pa, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: "评论…",
                disabled: a.isSubmittingComment,
                onInput: d[16] || (d[16] = (f) => c("update:newCommentText", f.target.value)),
                onKeydown: d[17] || (d[17] = $t(z((f) => c("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, ma),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: "上传照片附件",
                onClick: d[18] || (d[18] = z((f) => c("triggerFileInput"), ["stop"]))
              }, "📎")
            ]),
            a.newCommentText.trim() ? (i(), r("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: d[19] || (d[19] = (f) => c("submitComment"))
            }, "发送", 8, fa)) : x("", !0)
          ]),
          a.state.comments.length > 0 ? (i(), r("div", va, [
            (i(!0), r(nt, null, ut(a.state.comments, (f) => (i(), r("div", {
              key: f.id,
              class: "comment-item"
            }, [
              d[41] || (d[41] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", ga, [
                t("div", ba, [
                  d[40] || (d[40] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", ka, T(at(f.postedAt)), 1)
                ]),
                t("div", ya, T(f.content), 1),
                f.attachment?.url ? (i(), r("div", ha, [
                  t("img", {
                    src: f.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Z) => tt(f.attachment.url, f.attachment.name)
                  }, null, 8, wa)
                ])) : x("", !0)
              ])
            ]))), 128))
          ])) : x("", !0)
        ])
      ]),
      t("aside", Ta, [
        t("div", Da, [
          d[43] || (d[43] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: y,
            type: "button",
            class: Q(["side-item-row click-row", { active: w.value, filled: !!a.editStartDate }]),
            onClick: d[21] || (d[21] = (f) => w.value = !w.value)
          }, [
            d[42] || (d[42] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", Ca, T(vt(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (i(), r("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: d[20] || (d[20] = z((f) => c("clearStartDate"), ["stop"]))
            }, "×")) : x("", !0)
          ], 2),
          w.value ? (i(), Lt(Se, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": y.value,
            "onUpdate:modelValue": d[22] || (d[22] = (f) => c("update:editStartDate", f)),
            "onUpdate:timeValue": d[23] || (d[23] = (f) => c("update:editStartTime", f)),
            onChange: d[24] || (d[24] = (f) => c("startChange")),
            onClose: d[25] || (d[25] = (f) => w.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : x("", !0)
        ]),
        t("div", xa, [
          d[45] || (d[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: P,
            type: "button",
            class: Q(["side-item-row click-row", { active: $.value, filled: !!a.editDueDate }]),
            onClick: d[27] || (d[27] = (f) => $.value = !$.value)
          }, [
            d[44] || (d[44] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", $a, T(vt(a.editDueDate, a.editDueTime) || "设定截止"), 1),
            a.editDueDate ? (i(), r("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除截止时间",
              onClick: d[26] || (d[26] = z((f) => c("clearDueDate"), ["stop"]))
            }, "×")) : x("", !0)
          ], 2),
          $.value ? (i(), Lt(Se, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": P.value,
            "onUpdate:modelValue": d[28] || (d[28] = (f) => c("update:editDueDate", f)),
            "onUpdate:timeValue": d[29] || (d[29] = (f) => c("update:editDueTime", f)),
            onChange: d[30] || (d[30] = (f) => c("dueChange")),
            onClose: d[31] || (d[31] = (f) => $.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : x("", !0)
        ]),
        t("div", Sa, [
          d[47] || (d[47] = t("span", { class: "side-prop-label" }, "优先级", -1)),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: St,
            type: "button",
            class: "side-item-row",
            onClick: d[32] || (d[32] = (f) => D.value = !0)
          }, [
            t("span", {
              style: Tt({ color: F(a.state.priority) })
            }, "⚑", 4),
            t("span", Ia, "P" + T(5 - a.state.priority), 1),
            d[46] || (d[46] = t("span", null, "⌄", -1))
          ], 512),
          D.value ? (i(), Lt($e, {
            key: 0,
            anchor: St.value,
            onClose: d[33] || (d[33] = (f) => D.value = !1)
          }, {
            default: Zt(() => [
              t("div", _a, [
                (i(), r(nt, null, ut(M, (f) => t("button", {
                  key: f.level,
                  type: "button",
                  disabled: !!n(J).pendingWrites,
                  onClick: (Z) => st(f.level)
                }, [
                  t("span", {
                    style: Tt({ color: f.color })
                  }, "⚑", 4),
                  Ht(" " + T(f.name) + " ", 1),
                  a.state.priority === f.level ? (i(), r("span", La, "✓")) : x("", !0)
                ], 8, Ra)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : x("", !0)
        ]),
        t("div", Pa, [
          d[49] || (d[49] = t("span", { class: "side-prop-label" }, "标签", -1)),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: g,
            type: "button",
            class: "side-item-row",
            onClick: d[34] || (d[34] = (f) => _.value = !0)
          }, [
            t("span", Oa, T(a.state.labels.join("、") || "添加标签"), 1),
            d[48] || (d[48] = t("span", null, "＋", -1))
          ], 512),
          _.value ? (i(), Lt($e, {
            key: 0,
            anchor: g.value,
            onClose: d[36] || (d[36] = (f) => _.value = !1)
          }, {
            default: Zt(() => [
              t("div", Aa, [
                _t(t("input", {
                  "onUpdate:modelValue": d[35] || (d[35] = (f) => L.value = f),
                  placeholder: "搜索或新建标签",
                  "aria-label": "搜索标签",
                  onKeydown: $t(z(ft, ["prevent"]), ["enter"])
                }, null, 40, Ma), [
                  [jt, L.value]
                ]),
                It.value ? (i(), r("small", ja, "读取标签中…")) : x("", !0),
                S.value ? (i(), r("p", Ea, T(S.value), 1)) : x("", !0),
                t("div", Wa, [
                  (i(!0), r(nt, null, ut(ot.value, (f) => (i(), r("label", {
                    key: f,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + T(f), 1),
                    t("input", {
                      type: "checkbox",
                      checked: a.state.labels.includes(f),
                      disabled: !!n(J).pendingWrites,
                      onChange: (Z) => c("toggleLabelSelect", f)
                    }, null, 40, Ua)
                  ]))), 128))
                ]),
                L.value.trim() && !bt.value.includes(L.value.trim()) ? (i(), r("button", {
                  key: 2,
                  type: "button",
                  disabled: !!n(J).pendingWrites,
                  onClick: ft
                }, "＋ 创建“" + T(L.value.trim()) + "”", 9, za)) : x("", !0),
                !It.value && !ot.value.length && !L.value ? (i(), r("small", Ha, "暂无标签")) : x("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : x("", !0)
        ]),
        t("div", Ba, [
          d[51] || (d[51] = t("span", { class: "side-prop-label" }, [
            Ht("提醒 "),
            t("small", null, "本机")
          ], -1)),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: it,
            type: "button",
            class: "side-item-row",
            onClick: O
          }, [
            t("span", Na, T(Mt(a.state.reminderTime) || "添加提醒"), 1),
            d[50] || (d[50] = t("span", null, "＋", -1))
          ], 512),
          Y.value ? (i(), Lt(Ei, {
            key: 0,
            anchor: it.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: d[37] || (d[37] = (f) => Y.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : x("", !0)
        ])
      ])
    ])) : x("", !0);
  }
}), Va = /* @__PURE__ */ qt(Ka, [["__scopeId", "data-v-eee154be"]]), Fa = { class: "inspector-title-row" }, Ga = ["title", "aria-label"], Ya = ["disabled"], qa = ["href"], Xa = "todoistInspectorPositionV2", Qa = /* @__PURE__ */ Et({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const o = b, m = pt(() => Ot.get(o.taskId)), c = pt(() => m.value?.status === "failed" ? "保存未确认" : m.value?.status === "saving" ? "正在保存…" : K.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), I = pt(() => [
      c.value,
      m.value?.status === "failed" ? m.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: C,
      headerRef: E,
      initialStyle: p,
      onHeaderPointerDown: V,
      onResizePointerDown: q
    } = Fe({
      windowId: "todoist-inspector",
      storageKey: Xa,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => o.isOpen && J.active
    }), K = A(""), B = A(""), W = A(""), U = A(""), w = A(""), $ = A(""), y = A(!1), P = A(!1), D = A(null), _ = A(!1), Y = A(""), L = A(""), g = A(!1), it = pt(() => {
      const h = o.description || "", v = [], R = h.split(`
`);
      let yt = 0;
      for (const xt of R) {
        const gt = xt.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        gt && v.push({
          id: `st_${yt++}`,
          completed: gt[1].toLowerCase() === "x",
          text: gt[2].trim()
        });
      }
      return v;
    }), St = pt(() => it.value.filter((h) => h.completed).length);
    function mt(h) {
      const yt = (o.description || "").split(`
`).filter((Ft) => !Ft.match(/^\s*-\s*\[([ xX])\]/)), xt = h.map((Ft) => `- [${Ft.completed ? "x" : " "}] ${Ft.text}`), gt = [...yt, ...xt].join(`
`).trim();
      B.value = gt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), dt.saveTitleAndDesc(K.value, gt);
    }
    function It() {
      if (!Y.value.trim()) return;
      const h = [...it.value, {
        id: `st_${Date.now()}`,
        text: Y.value.trim(),
        completed: !1
      }];
      Y.value = "", _.value = !1, mt(h);
    }
    function S(h) {
      const v = it.value.map((R) => R.id === h ? { ...R, completed: !R.completed } : R);
      mt(v);
    }
    function j(h) {
      const v = it.value.filter((R) => R.id !== h);
      mt(v);
    }
    const O = pt(() => {
      for (const h of Dt.columns || []) {
        const v = h.tasks.find((R) => R.id === o.taskId);
        if (v) return !!v.completed;
      }
      return !1;
    });
    async function M() {
      for (const h of Dt.columns || []) {
        const v = h.tasks.find((R) => R.id === o.taskId);
        if (v) {
          const R = !v.completed;
          v.completed = R, v._taskRaw && (v._taskRaw.checked = R);
          try {
            await rt.toggleTaskCompletion(v.id, R);
          } catch {
            v.completed = !R, v._taskRaw && (v._taskRaw.checked = !R), o.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function F(h) {
      dt.setPriority(h);
    }
    function st(h) {
      dt.toggleLabel(h);
    }
    function bt(h) {
      dt.toggleLabel(h);
    }
    async function ot(h) {
      h.trim() && (o.labels.includes(h.trim()) || await dt.createAndAttachLabel(h.trim()));
    }
    async function ft() {
      if (!L.value.trim() || g.value) return;
      const h = L.value.trim();
      g.value = !0;
      try {
        await dt.addComment(h), L.value = "";
      } finally {
        g.value = !1;
      }
    }
    ct(() => o.title, (h) => {
      K.value = h || "";
    }, { immediate: !0 }), ct(() => o.description, (h) => {
      B.value = (h || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => o.startDate, (h) => {
      W.value = h || "";
    }, { immediate: !0 }), ct(() => o.startTime, (h) => {
      U.value = h || "";
    }, { immediate: !0 }), ct(() => o.dueDate, (h) => {
      w.value = h || "";
    }, { immediate: !0 }), ct(() => o.dueTime, (h) => {
      $.value = h || "";
    }, { immediate: !0 });
    function tt() {
      const h = /* @__PURE__ */ new Date();
      return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`;
    }
    function vt() {
      U.value && !W.value && (W.value = tt()), dt.setStartDateAndTime(W.value, U.value);
    }
    function Mt() {
      U.value = "", vt();
    }
    function at() {
      W.value = "", U.value = "", vt();
    }
    function H() {
      $.value && !w.value && (w.value = tt()), dt.setDueDateAndTime(w.value, $.value);
    }
    function d() {
      $.value = "", H();
    }
    function f() {
      w.value = "", $.value = "", H();
    }
    const Z = pt(() => {
      const h = [], v = /* @__PURE__ */ new Set(), R = o.description || "", yt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let xt;
      for (; (xt = yt.exec(R)) !== null; ) {
        const gt = xt[2];
        v.add(gt), h.push({
          name: xt[1] || "任务照片",
          url: gt
        });
      }
      for (const gt of o.commentAttachments || [])
        v.has(gt.url) || (v.add(gt.url), h.push(gt));
      return h;
    });
    let wt, kt;
    function Xt() {
      const h = (o.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), v = [B.value.trim(), h].filter(Boolean);
      return {
        taskId: o.taskId,
        title: K.value,
        description: v.join(`

`)
      };
    }
    function Pt() {
      clearTimeout(wt), wt = void 0;
      const h = kt;
      if (kt = void 0, h?.taskId && h.title.trim())
        return dt.saveTitleAndDesc(h.title, h.description, h.taskId);
    }
    function ee(h) {
      h && "isComposing" in h && h.isComposing || (kt = Xt(), dt.stageTitleDraft(kt.taskId, kt.title, kt.description), clearTimeout(wt), wt = setTimeout(Pt, 800));
    }
    ct(() => o.taskId, () => Pt(), { flush: "sync" });
    function oe() {
      Pt(), dt.close();
    }
    function ve(h) {
      h && "isComposing" in h && h.isComposing || Pt();
    }
    function Nt() {
      kt = Xt(), Pt();
    }
    function se(h) {
      const v = Wt(h);
      v && (h.preventDefault(), h.stopPropagation(), Ct(v));
    }
    function ne() {
      J.active && D.value?.click();
    }
    async function ge(h) {
      const v = h.target;
      if (!J.active) {
        v.value = "";
        return;
      }
      const R = v.files?.[0];
      R && await Ct(R), v.value = "";
    }
    async function ie(h) {
      P.value = !1;
      const v = h.dataTransfer?.files?.[0];
      v && (v.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(v.name)) && await Ct(v);
    }
    function Wt(h) {
      const v = h.clipboardData;
      if (!v) return null;
      if (v.files && v.files.length > 0)
        for (let R = 0; R < v.files.length; R++) {
          const yt = v.files[R];
          if (yt.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(yt.name))
            return yt;
        }
      if (v.items && v.items.length > 0)
        for (let R = 0; R < v.items.length; R++) {
          const yt = v.items[R];
          if (yt.type.includes("image")) {
            const xt = yt.getAsFile();
            if (xt) return xt;
          }
        }
      return null;
    }
    async function Ct(h) {
      if (y.value || !J.active || !o.taskId) return;
      const v = o.taskId;
      y.value = !0;
      try {
        if (await Pt(), o.taskId !== v || !o.isOpen || !J.active) return;
        await dt.attachImageToTask(h);
      } catch (R) {
        o.taskId === v && (o.error = R instanceof Error ? R.message : "上传失败");
      } finally {
        y.value = !1;
      }
    }
    function ae(h) {
      const v = Wt(h);
      v && (h.preventDefault(), Ct(v));
    }
    function Kt(h) {
      if (!o.isOpen || !J.active) return;
      const v = Wt(h);
      v && (h.preventDefault(), h.stopPropagation(), Ct(v));
    }
    ct(() => J.active, (h) => {
      window.removeEventListener("paste", Kt, { capture: !0 }), h && window.addEventListener("paste", Kt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Bt(() => {
      Pt(), window.removeEventListener("paste", Kt, { capture: !0 });
    });
    async function Vt(h) {
      const v = o.description || "", R = h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), yt = v.replace(new RegExp(`!\\[[^\\]]*\\]\\(${R}\\)`, "g"), "").trim();
      await dt.saveTitleAndDesc(o.title, yt);
    }
    return (h, v) => _t((i(), r("aside", {
      ref_key: "panelRef",
      ref: C,
      class: "todoist-inspector-window",
      style: Tt(n(p)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: ae
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: E,
        class: "inspector-header",
        onPointerdown: v[2] || (v[2] = (R) => n(V)(R))
      }, [
        t("div", Fa, [
          v[18] || (v[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          m.value ? (i(), r("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: v[0] || (v[0] = z(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: I.value,
              "aria-label": I.value
            }, T(c.value), 9, Ga),
            m.value.status !== "saving" ? (i(), r("button", {
              key: 0,
              type: "button",
              disabled: n(o).saving || !K.value.trim(),
              onClick: z(Nt, ["stop"])
            }, T(m.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Ya)) : x("", !0)
          ], 32)) : x("", !0),
          n(o).url ? (i(), r("a", {
            key: 1,
            href: n(o).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, qa)) : x("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: v[1] || (v[1] = z(() => {
          }, ["stop"])),
          onClick: z(oe, ["stop"])
        }, "×", 32)
      ], 544),
      n(o).isOpen ? (i(), Lt(Va, {
        key: n(o).taskId,
        state: n(o),
        "edit-title": K.value,
        "onUpdate:editTitle": v[3] || (v[3] = (R) => K.value = R),
        "edit-description": B.value,
        "onUpdate:editDescription": v[4] || (v[4] = (R) => B.value = R),
        "edit-start-date": W.value,
        "onUpdate:editStartDate": v[5] || (v[5] = (R) => W.value = R),
        "edit-start-time": U.value,
        "onUpdate:editStartTime": v[6] || (v[6] = (R) => U.value = R),
        "edit-due-date": w.value,
        "onUpdate:editDueDate": v[7] || (v[7] = (R) => w.value = R),
        "edit-due-time": $.value,
        "onUpdate:editDueTime": v[8] || (v[8] = (R) => $.value = R),
        "is-uploading-img": y.value,
        "is-drag-over": P.value,
        "is-task-completed": O.value,
        subtasks: it.value,
        "completed-subtasks-count": St.value,
        "is-adding-subtask": _.value,
        "onUpdate:isAddingSubtask": v[9] || (v[9] = (R) => _.value = R),
        "new-subtask-text": Y.value,
        "onUpdate:newSubtaskText": v[10] || (v[10] = (R) => Y.value = R),
        "new-comment-text": L.value,
        "onUpdate:newCommentText": v[11] || (v[11] = (R) => L.value = R),
        "is-submitting-comment": g.value,
        "attached-images": Z.value,
        "available-labels": n(Dt).availableLabels || [],
        onScheduleDraftSave: ee,
        onSaveTitleAndDesc: ve,
        onToggleComplete: M,
        onTriggerFileInput: ne,
        onDragover: v[12] || (v[12] = (R) => P.value = !0),
        onDragleave: v[13] || (v[13] = (R) => P.value = !1),
        onDropImage: ie,
        onDescPaste: se,
        onRemoveAttachedImage: Vt,
        onToggleSubtask: S,
        onRemoveSubtask: j,
        onConfirmAddSubtask: It,
        onSubmitComment: ft,
        onStartChange: vt,
        onClearStartDate: at,
        onClearStartTime: Mt,
        onDueChange: H,
        onClearDueDate: f,
        onClearDueTime: d,
        onSelectPriority: F,
        onToggleLabelSelect: st,
        onRemoveLabel: bt,
        onCreateLabel: ot
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : x("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: D,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ge
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: v[14] || (v[14] = (R) => n(q)(R, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: v[15] || (v[15] = (R) => n(q)(R, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: v[16] || (v[16] = (R) => n(q)(R, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: v[17] || (v[17] = (R) => n(q)(R, "w"))
      }, null, 32)
    ], 36)), [
      [me, n(o).isOpen]
    ]);
  }
}), Ja = /* @__PURE__ */ qt(Qa, [["__scopeId", "data-v-35222deb"]]), Za = { class: "vue-todoist-workspace-wrapper" }, tl = { class: "todoist-head-title-wrap" }, el = { id: "todoist-workspace-title" }, ol = {
  id: "todoist-view-tabs",
  class: "todoist-view-tabs",
  "aria-label": "Todoist 视图"
}, sl = {
  class: "muted small",
  role: "status"
}, nl = ["aria-expanded"], il = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, al = { class: "todoist-workspace-cal-area" }, ll = { class: "todoist-workspace-task-area" }, rl = "todoistWorkspacePosition", Dl = /* @__PURE__ */ Et({
  __name: "TodoistWorkspace",
  setup(a) {
    const o = A(!1), m = ro(() => import("./TodoistAccountSettings-CUsRewpT.js")), c = A(!1), I = A(!1), C = A(!document.hidden), E = A(!1), p = pt(() => J.visible && C.value);
    J.session++, J.active = p.value, Ge(
      () => p.value && !Dt.movingTaskId,
      Yt,
      () => et.loadWorkspace(void 0, void 0, !0)
    );
    let V = !1;
    const q = A(null), K = ko;
    function B() {
      W.value && (W.value.style.removeProperty("width"), W.value.style.removeProperty("height"), W.value.style.removeProperty("left"), W.value.style.removeProperty("top"), W.value.style.removeProperty("right"), W.value.style.removeProperty("bottom"), W.value.style.removeProperty("margin"), W.value.style.removeProperty("transform"));
    }
    ct(() => J.visible, (O) => {
      O && (K.isOpen = !0, J.active = C.value, et.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: W,
      headerRef: U,
      initialStyle: w,
      stopInteractions: $,
      onHeaderPointerDown: y,
      onResizePointerDown: P,
      bringToFront: D
    } = Fe({
      windowId: "todoist",
      storageKey: rl,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => p.value
    }), _ = () => W.value;
    function Y() {
      Yt(), go(), bo(), dt.cancelReads(), $(), window.removeEventListener("keydown", it);
    }
    const L = po(Y);
    function g() {
      C.value = !document.hidden;
    }
    function it(O) {
      O.key === "Escape" && b.isOpen && (O.preventDefault(), O.stopPropagation(), dt.close());
    }
    ct(p, (O) => {
      J.active = O, O ? (window.addEventListener("keydown", it), V || (V = !0, et.loadWorkspace()), Rt(() => {
        p.value && D();
      })) : Y();
    }, { flush: "sync" }), ct(c, (O) => {
      O && (I.value = !0);
    }), ct([p, o, ze], ([O, M, F]) => {
      if (!(!O || !M || !F) && (ze.value = null, yo("todoist") === F.transition)) {
        if (J.pendingWrites || b.isOpen && b.taskId !== F.id) {
          xe.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        b.isOpen && b.taskId === F.id || dt.openTask(F.id);
      }
    }, { flush: "post" }), fe(() => {
      o.value = !0, E.value && Rt(B), re.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: _ }), document.addEventListener("visibilitychange", g), p.value && (window.addEventListener("keydown", it), V || (V = !0, et.loadWorkspace()), We.refresh());
    }), Bt(() => {
      mo(), L(), document.removeEventListener("visibilitychange", g), re.unregister("todoist", _), dt.close(), Object.assign(b, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), et.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), De.updateState({ title: "收件箱", isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), We.update([]);
    });
    function St() {
      De.toggleCalendar();
    }
    function mt() {
      De.refresh();
    }
    function It() {
      et.updateState({ accountConfigured: !0 }), p.value && et.loadWorkspace(void 0, void 0, !0);
    }
    function S() {
      re.minimize("todoist");
    }
    function j() {
      J.visible = !1, K.isOpen = !1, re.close("todoist");
    }
    return (O, M) => (i(), r("div", Za, [
      _t(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: W,
        class: "card wide todoist-workspace",
        style: Tt(n(w)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: U,
          class: "todoist-workspace-head",
          onPointerdown: M[4] || (M[4] = (F) => n(y)(F))
        }, [
          t("div", tl, [
            M[10] || (M[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", el, T(n(K).title), 1)
          ]),
          t("nav", ol, [
            Qt(Ro)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: Q(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: n(K).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: St
          }, " 📅 日历 ", 2),
          M[11] || (M[11] = t("span", { class: "grow" }, null, -1)),
          t("span", sl, T(n(J).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: q,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": c.value,
            onClick: M[0] || (M[0] = z((F) => c.value = !c.value, ["stop"]))
          }, " ⚙️ ", 8, nl),
          I.value ? (i(), Lt(n(m), {
            key: 0,
            visible: p.value && c.value,
            anchor: q.value,
            onClose: M[1] || (M[1] = (F) => c.value = !1),
            onAccountSaved: It
          }, null, 8, ["visible", "anchor"])) : x("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: "刷新",
            onClick: mt
          }, " ↻ "),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: "最小化（标签保留）",
            onPointerdown: M[2] || (M[2] = z(() => {
            }, ["stop"])),
            onClick: z(S, ["stop"])
          }, " − ", 32),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: "隐藏窗口 (Esc)；Dock 退出释放窗口资源",
            onPointerdown: M[3] || (M[3] = z(() => {
            }, ["stop"])),
            onClick: z(j, ["stop"])
          }, " ✕ ", 32)
        ], 544),
        n(Dt).accountConfigured === !1 ? (i(), Lt(ho, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: M[5] || (M[5] = (F) => c.value = !0)
        })) : (i(), r("div", il, [
          _t(t("div", al, [
            Qt(ms)
          ], 512), [
            [me, n(K).isCalendarOpen]
          ]),
          t("div", ll, [
            Qt(Si)
          ])
        ])),
        Qt(Ja),
        M[12] || (M[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        E.value ? x("", !0) : (i(), r(nt, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: M[6] || (M[6] = (F) => n(P)(F, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: M[7] || (M[7] = (F) => n(P)(F, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: M[8] || (M[8] = (F) => n(P)(F, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: M[9] || (M[9] = (F) => n(P)(F, "w"))
          }, null, 32)
        ], 64))
      ], 4), [
        [me, n(J).visible]
      ])
    ]));
  }
});
export {
  Dl as default
};
