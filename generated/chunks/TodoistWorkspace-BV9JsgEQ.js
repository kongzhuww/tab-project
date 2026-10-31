import { d as Ut, o as a, f as d, F as ot, g as t, u as c, C as X, r as Yt, z as Et, y as rt, D as Xt, n as jt, t as x, i as dt, j as N, h as _, b as P, O as He, J as Ae, B as Tt, x as st, H as St, m as Rt, p as Nt, E as Gt, w as ne, l as Ct, e as Lt, A as Ce, G as po } from "./vendor-vue-wIH4jcna.js";
import { a as mo, t as q, w as vo, o as fo, p as go } from "./module-state-BmW4SrQd.js";
import { b as Me, h as je, i as qt, j as kt, e as Q, d as mt, c as bo, k as ko, t as Ee, g as he, l as yo, m as wo, n as ho } from "./calendar.service-_YumC_hP.js";
import { u as Ve } from "./useWindowDraggable-CUOTL3np.js";
import { w as ue, b as To } from "./window-manager.store-DgNn9Rtk.js";
import { A as Do } from "./AccountSetupGuide-TNciZwtl.js";
import { i as Se } from "./image-viewer-store-Bs97aDbi.js";
import { n as Co } from "./view-styles-BcxK8WCo.js";
import { t as et, d as xo, s as $o, b as ce, g as We, f as Te, p as So } from "./todoist.service-BwvB2mGP.js";
import { u as Fe, g as Ye, I as xe, T as $e, a as Io } from "./TodoistDatePickerPopover-Bc07IbMy.js";
import { _ as Qt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { A as Ge } from "./search.service-B8FaDQLd.js";
import { m as _o } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Ue } from "./task-navigation-CFuqS02f.js";
const Ro = /* @__PURE__ */ Ut({
  __name: "TodoistWorkspaceTabs",
  setup(n) {
    return (e, u) => (a(), d(ot, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: X({ on: c(je).view === "inbox" }),
        title: "收件箱",
        onClick: u[0] || (u[0] = (p) => c(Me).switchView("inbox"))
      }, [...u[2] || (u[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: X({ on: c(je).view === "projects" }),
        title: "项目",
        onClick: u[1] || (u[1] = (p) => c(Me).switchView("projects"))
      }, [...u[3] || (u[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), qe = "todoist_reminder_v2:", Lo = "todoist_remind_";
async function Po(n) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const e = qe + n, u = await chrome.storage.local.get([e, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(u, e) ? u[e] || void 0 : u.todoist_reminders_map_v1?.[n];
}
async function Oo(n, e, u) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const p = new Date(e).getTime();
  if (e && (!Number.isFinite(p) || p <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (e && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const $ = qe + n, r = Lo + n;
  await chrome.alarms.clear(r), await chrome.storage.local.set({ [$]: e ? { time: e, title: u } : null }), e && await chrome.alarms.create(r, { when: p });
}
const _t = Yt(/* @__PURE__ */ new Map());
let Ao = 0;
function ze(n, e, u, p = "editing") {
  const $ = ++Ao;
  return _t.set(n, { revision: $, title: e, description: u, status: p, error: "" }), $;
}
const b = Yt({
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
let De = Promise.resolve(), pe = 0, Be = Promise.resolve();
const me = /* @__PURE__ */ new Map();
let ie = 0;
const Ht = /* @__PURE__ */ new Map();
function se(n = !0) {
  n && ie++;
  for (const e of Ht.values()) e.abort();
  Ht.clear(), b.loading = !1;
}
function Ke(n) {
  Ht.get(n)?.abort();
  const e = new AbortController();
  Ht.set(n, e);
  const u = ie, p = b.taskId;
  return {
    signal: e.signal,
    current: () => !e.signal.aborted && u === ie && b.isOpen && p === b.taskId && Ht.get(n) === e,
    finish: () => {
      Ht.get(n) === e && Ht.delete(n);
    }
  };
}
function Mt() {
  se(!1);
  const n = b.taskId, e = ie;
  return { taskId: n, current: () => b.isOpen && e === ie && n === b.taskId };
}
function Mo(n) {
  return new Promise((e) => {
    const u = new FileReader();
    u.onload = () => e(u.result || ""), u.onerror = () => e(""), u.readAsDataURL(n);
  });
}
function Ne(n, e, u) {
  for (const p of kt.columns)
    for (const $ of p.tasks)
      String($.id) === n && ($.content = e, u !== void 0 && ($.description = u), $._taskRaw && ($._taskRaw.content = e, u !== void 0 && ($._taskRaw.description = u)));
  mt.updateTaskTitle(n, e);
}
const jo = {
  state: b,
  cancelReads: se,
  stageTitleDraft(n, e, u) {
    n && (ze(n, e, u), se(!1), b.taskId === n && (b.title = e), Ne(n, e, u));
  },
  async openTask(n, e) {
    if (!n) return;
    if (se(), b.taskId = n, b.isOpen = !0, b.error = "", Object.assign(b, {
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
    }), e) {
      b.title = e.content || e.title || "", b.description = e.description || e.raw?.description || "", b.priority = e.priority || 1;
      const r = ce(e.due?.datetime || e.due?.date || e.dueDate || "");
      b.dueDate = r.date, b.dueTime = r.time;
      const O = e.startDate || We(n, b.description), S = ce(O);
      b.startDate = S.date, b.startTime = S.time, b.labels = [...e.labels || []], b.url = e.url || "";
    }
    const u = _t.get(n);
    u && (b.title = u.title, b.description = u.description);
    const p = Ke("reminder");
    Po(n).then((r) => {
      p.current() && (b.reminderTime = r?.time || "");
    }).catch(() => {
      p.current() && (b.error = "本机提醒读取失败。");
    }).finally(p.finish);
    const $ = Ke("detail");
    b.loading = !0;
    try {
      const r = await et.api(`/tasks/${encodeURIComponent(n)}`, { signal: $.signal });
      if (r && $.current()) {
        const O = _t.get(n);
        b.title = O?.title ?? r.content ?? "", b.description = O?.description ?? r.description ?? "", b.priority = r.priority || 1;
        const S = ce(r.due?.datetime || r.due?.date || "");
        b.dueDate = S.date, b.dueTime = S.time;
        const M = We(n, r.description || b.description), H = ce(M);
        b.startDate = H.date, b.startTime = H.time, b.labels = [...r.labels || []], b.url = r.url || "";
        try {
          const z = await et.getComments(n, $.signal);
          if (z && $.current()) {
            const U = [], B = [];
            for (const j of z) {
              let y;
              if (j?.attachment?.file_url) {
                const L = j.attachment.file_name || "附件图片";
                U.push({ name: L, url: j.attachment.file_url }), y = { name: L, url: j.attachment.file_url };
              }
              B.push({
                id: j.id,
                content: j.content || "",
                postedAt: j.posted_at || "",
                attachment: y
              });
            }
            if (b.commentAttachments = U, b.comments = B, U.length > 0 && b.description) {
              let j = b.description, y = !1;
              for (const L of U) {
                const k = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                k.test(j) && (j = j.replace(k, `$1${L.url}$2`), y = !0);
              }
              if (y && !_t.has(n)) {
                b.description = j;
                for (const L of kt.columns) {
                  const k = L.tasks.find((w) => String(w.id) === n);
                  if (k) {
                    k.description = j, k._taskRaw && (k._taskRaw.description = j);
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
      $.current() && (b.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      $.current() && (b.loading = !1), $.finish();
    }
  },
  close() {
    se(), b.isOpen = !1, b.taskId = "";
  },
  async setStartDateAndTime(n, e) {
    if (!b.taskId) return;
    const u = Mt(), p = n.trim(), $ = p ? e.trim() : "";
    b.startDate = p, b.startTime = $, qt();
    const r = xo(p, $);
    $o(u.taskId, r), et.invalidateWorkspaceSnapshots();
    for (const O of kt.columns) {
      const S = O.tasks.find((M) => M.id === u.taskId);
      S && (S.startDate = r);
    }
  },
  async setDueDateAndTime(n, e) {
    if (!b.taskId) return;
    const u = Mt(), p = n.trim(), $ = p ? e.trim() : "";
    b.dueDate = p, b.dueTime = $, qt(), et.invalidateWorkspaceSnapshots();
    const r = (me.get(u.taskId) || 0) + 1;
    me.set(u.taskId, r);
    const O = Be.then(async () => {
      try {
        const S = await et.updateTask(u.taskId, {
          due_string: p ? $ ? `${p} ${$}` : p : "no date"
        });
        if (me.get(u.taskId) !== r) return;
        const M = et.mapTasks([S], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const H of kt.columns) {
          const z = H.tasks.findIndex((B) => B.id === u.taskId);
          if (z < 0) continue;
          const U = H.tasks[z];
          if (Object.assign(U, {
            dueDate: M.dueDate,
            dueText: M.dueText,
            dueString: M.dueString,
            isDueToday: M.isDueToday,
            isOverdue: M.isOverdue,
            isRecurring: M.isRecurring
          }), U._taskRaw && (U._taskRaw.due = S.due), kt.view === "today") {
            const B = M.isOverdue ? "overdue" : M.isDueToday ? "today" : "";
            B !== H.sectionId && (H.tasks.splice(z, 1), kt.columns.find((j) => j.sectionId === B)?.tasks.push(U));
          }
        }
        u.current() && (b.error = "");
      } catch {
        u.current() && me.get(u.taskId) === r && (b.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Be = O.catch(() => {
    }), await O;
  },
  async saveTitleAndDesc(n, e, u = b.taskId) {
    const p = u === b.taskId ? Mt() : { taskId: u, current: () => !1 };
    if (!p.taskId || !n.trim()) return;
    const $ = n.trim(), r = e.trim(), O = ze(u, $, r, "saving");
    p.current() && (b.title = $, b.description = r), Ne(p.taskId, $, r), pe++, b.saving = !0;
    const S = De.then(async () => {
      try {
        await et.updateTask(p.taskId, {
          content: $,
          description: r
        }), _t.get(u)?.revision === O && _t.delete(u), pe === 1 && _t.size === 0 && Q.dispatch("refresh");
      } catch (M) {
        const H = _t.get(u);
        H?.revision === O && (H.status = "failed", H.error = M instanceof Error ? M.message : "保存未确认");
      } finally {
        pe--, b.saving = pe > 0;
      }
    });
    De = S.catch(() => {
    }), await S;
  },
  async attachImageToTask(n) {
    const e = Mt();
    if (await De, !e.current()) return;
    if (_t.has(e.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const u = b.description || "";
    if (!e.taskId || b.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    b.saving = !0;
    try {
      const p = n.name || `截图_${Date.now()}.png`;
      let $ = "";
      try {
        const r = await et.uploadFile(n, p);
        r && r.file_url && ($ = r.file_url);
      } catch (r) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", r), n.size <= 2.5 * 1024 * 1024)
          $ = await Mo(n);
        else
          throw new Error(r?.message || "云端上传失败且文件超过2.5MB");
      }
      if ($) {
        const r = u ? `${u}

![${p}](${$})` : `![${p}](${$})`;
        await et.updateTask(e.taskId, {
          description: r
        }), e.current() && (b.description = r);
        for (const O of kt.columns) {
          const S = O.tasks.find((M) => String(M.id) === e.taskId);
          if (S) {
            S.description = r, S._taskRaw && (S._taskRaw.description = r);
            break;
          }
        }
        Q.dispatch("refresh");
      }
    } catch (p) {
      e.current() && (b.error = p.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${p.message}`);
    } finally {
      b.saving = !1;
    }
  },
  async setPriority(n) {
    if (!b.taskId) return;
    const e = Mt();
    if (![1, 2, 3, 4].includes(n)) return;
    const u = b.priority;
    b.priority = n, qt(), et.invalidateWorkspaceSnapshots();
    try {
      await et.updateTask(e.taskId, { priority: n });
      for (const p of kt.columns) {
        const $ = p.tasks.find((r) => r.id === e.taskId);
        $ && ($.priority = n, $._taskRaw && ($._taskRaw.priority = n));
      }
    } catch {
      e.current() && (b.priority = u, b.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(n) {
    if (!b.taskId) return;
    const e = Mt(), u = [...b.labels], $ = u.includes(n) ? u.filter((r) => r !== n) : [...u, n];
    b.labels = $, qt(), et.invalidateWorkspaceSnapshots();
    try {
      await et.updateTask(e.taskId, { labels: $ });
      for (const r of kt.columns) {
        const O = r.tasks.find((S) => S.id === e.taskId);
        O && (O.labels = $, O._taskRaw && (O._taskRaw.labels = $));
      }
    } catch {
      e.current() && (b.labels = u, b.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(n) {
    const e = Mt();
    if (n = n.trim(), !(!e.taskId || !n))
      try {
        const u = await et.getLabels();
        if (!e.current()) return;
        u.some((p) => p.name === n) || await et.createLabel(n), e.current() && !b.labels.includes(n) && await this.toggleLabel(n);
      } catch {
        e.current() && (b.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(n) {
    if (!b.taskId || !n.trim()) return;
    const e = Mt();
    try {
      const u = await et.addComment({
        task_id: e.taskId,
        content: n.trim()
      });
      u && e.current() && b.comments.push({
        id: u.id || `c_${Date.now()}`,
        content: u.content || n.trim(),
        postedAt: u.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (u) {
      e.current() && (b.error = "发送评论失败：" + (u?.message || ""));
    }
  },
  async setReminder(n) {
    const e = Mt();
    if (e.taskId)
      try {
        await Oo(e.taskId, n, b.title), e.current() && (b.reminderTime = n, b.error = "");
      } catch (u) {
        e.current() && (b.error = u instanceof Error ? u.message : "提醒未保存，请重试。");
      }
  }
}, at = mo(jo, [
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
}, zo = { class: "todoist-cal-nav" }, Bo = { class: "todoist-cal-nav-group" }, Ko = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, No = { class: "todoist-cal-nav-group" }, Ho = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, Vo = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Fo = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Yo = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Go = { class: "todoist-cal-agenda" }, qo = { class: "todoist-cal-agenda-head" }, Xo = { class: "todoist-cal-agenda-title" }, Qo = {
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
}, us = ["onClick"], cs = ["src"], ps = /* @__PURE__ */ Ut({
  __name: "TodoistCalendarSidebar",
  setup(n) {
    const e = ko;
    Fe(
      () => q.active,
      () => mt.invalidateReads(),
      () => mt.loadTodosForDate(e.selectedDate, !0)
    ), Et(() => mt.cancelReads()), rt(() => [q.active, q.pendingWrites], ([y, L], k) => {
      if (!y || L) {
        mt.cancelReads();
        return;
      }
      mt.loadTodosForDate(e.selectedDate, !!k?.[1]);
    }, { immediate: !0, flush: "sync" });
    function u(y) {
      mt.toggleTodoItem(y);
    }
    function p(y) {
      at.openTask(y.id, y);
    }
    Xt(() => {
      bo.syncSidebarToVue();
    });
    function $() {
      mt.dispatch("today");
    }
    function r() {
      mt.dispatch("prev-month");
    }
    function O() {
      mt.dispatch("next-month");
    }
    function S() {
      mt.dispatch("prev-year");
    }
    function M() {
      mt.dispatch("next-year");
    }
    function H(y) {
      mt.dispatch("select-date", y);
    }
    function z(y, L) {
      mt.dispatch("context-date", {
        date: y,
        clientX: L.clientX,
        clientY: L.clientY
      });
    }
    function U(y, L) {
      const k = Array.from(L.dataTransfer?.types || []);
      (k.includes("application/x-todoist-task-id") || k.includes("text/plain")) && (L.preventDefault(), L.dataTransfer && (L.dataTransfer.dropEffect = "copy"));
    }
    function B(y) {
    }
    function j(y, L) {
      const k = L.dataTransfer?.getData("application/x-todoist-task-id") || L.dataTransfer?.getData("text/plain");
      k && (L.preventDefault(), L.stopPropagation(), mt.dispatch("drop-task", { taskId: k, date: y }));
    }
    return (y, L) => (a(), d("aside", {
      id: "todoist-calendar-sidebar",
      class: X(["todoist-calendar-sidebar", { collapsed: c(e).collapsed }]),
      "aria-label": "Todoist 任务日历"
    }, [
      t("div", Eo, [
        t("div", Wo, [
          L[1] || (L[1] = t("span", { class: "todoist-cal-logo" }, [
            jt("📅 "),
            t("strong", null, "任务日历")
          ], -1)),
          t("span", Uo, x(c(e).badgeText), 1)
        ]),
        t("div", { class: "todoist-cal-head-actions" }, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: $
          }, "返回今天")
        ])
      ]),
      t("div", zo, [
        t("div", Bo, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: r
          }, "‹"),
          t("span", Ko, x(c(e).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: "下个月",
            onClick: O
          }, "›")
        ]),
        t("div", No, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: "上一年",
            onClick: S
          }, "‹"),
          t("span", Ho, x(c(e).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: "下一年",
            onClick: M
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
      t("div", Vo, [
        (a(!0), d(ot, null, dt(c(e).cells, (k) => (a(), d("button", {
          key: k.date,
          type: "button",
          class: X(["todoist-cal-cell", {
            outside: k.isOutside,
            today: k.isToday,
            selected: k.isSelected
          }]),
          "data-date": k.date,
          role: "gridcell",
          title: k.title,
          onClick: (w) => H(k.date),
          onContextmenu: N((w) => z(k.date, w), ["prevent"]),
          onDragover: (w) => U(k.date, w),
          onDragleave: (w) => (k.date, void 0),
          onDrop: (w) => j(k.date, w)
        }, [
          t("span", null, x(k.dayNumber), 1),
          k.hasDot ? (a(), d("span", Yo)) : _("", !0)
        ], 42, Fo))), 128))
      ]),
      t("div", Go, [
        t("div", qo, [
          t("strong", Xo, x(c(e).agendaTitle), 1),
          t("span", Qo, x(c(e).todoItems.length) + " 项", 1)
        ]),
        c(e).writeError ? (a(), d("p", Jo, x(c(e).writeError), 1)) : _("", !0),
        c(e).emptyText ? (a(), d("div", Zo, [
          jt(x(c(e).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: c(e).todoLoading || c(q).pendingWrites > 0,
            onClick: L[0] || (L[0] = (k) => c(mt).loadTodosForDate(c(e).selectedDate, !0))
          }, "重试读取", 8, ts)
        ])) : _("", !0),
        t("div", es, [
          c(e).todoLoading && !c(e).todoItems.length ? (a(), d("div", os, " 正在读取待办与完成历史… ")) : c(e).todoItems.length === 0 && !c(e).emptyText ? (a(), d("div", ss, " 当天没有待办或完成任务 ☕ ")) : (a(!0), d(ot, { key: 2 }, dt(c(e).todoItems, (k) => (a(), d("div", {
            key: k.id,
            class: X(["todoist-cal-todo-card", { completed: k.completed }]),
            onClick: (w) => p(k)
          }, [
            t("div", is, [
              t("button", {
                type: "button",
                class: X(["todoist-cal-check", { checked: k.completed }]),
                disabled: c(q).pendingWrites > 0,
                title: k.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: N((w) => u(k), ["stop"])
              }, [
                k.completed ? (a(), d("span", ls, "✓")) : _("", !0)
              ], 10, as),
              t("span", {
                class: X(["todoist-cal-todo-title", { strike: k.completed }])
              }, x(k.content), 3),
              k.time ? (a(), d("small", rs, x(k.time), 1)) : _("", !0),
              k.completed ? (a(), d("span", ds, "已完成")) : _("", !0)
            ]),
            k.thumbUrl ? (a(), d("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: N((w) => c(Se).open(k.thumbUrl, k.content), ["stop"])
            }, [
              t("img", {
                src: k.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, cs),
              L[2] || (L[2] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, us)) : _("", !0)
          ], 10, ns))), 128))
        ])
      ])
    ], 2));
  }
}), ms = /* @__PURE__ */ Qt(ps, [["__scopeId", "data-v-6d6d531e"]]);
function vs(n) {
  const e = n.state, u = P(null), p = P(null), $ = P(null), r = P(!1), O = He(null), S = P(), M = /* @__PURE__ */ new Map();
  function H(C) {
    M.clear();
    const E = C.closest(".todoist-board");
    if (E)
      for (const I of E.querySelectorAll(".todoist-board-list")) {
        const A = e.columns[Number(I.dataset.groupIndex)];
        if (!A) continue;
        const V = I.__todoistSlots;
        if (!V) continue;
        const Z = V(), tt = Z.filter((it) => it.id !== w?.id);
        M.set(A, { list: I, rows: tt, read: V, snapshot: Z });
      }
  }
  let z = 0, U;
  function B(C, E) {
    U = { clientY: C.clientY, col: E }, !z && (z = requestAnimationFrame(() => {
      z = 0;
      const I = U;
      U = void 0, I && j(I, I.col);
    }));
  }
  function j(C, E) {
    if (!w || e.movingTaskId) return;
    const I = M.get(E);
    if (!I) return;
    const A = I.read();
    A !== I.snapshot && (I.snapshot = A, I.rows = A.filter((J) => J.id !== w?.id));
    const V = C.clientY - I.list.getBoundingClientRect().top + I.list.scrollTop;
    let Z = 0, tt = I.rows.length;
    for (; Z < tt; ) {
      const J = Z + tt >>> 1;
      V < I.rows[J].middle ? tt = J : Z = J + 1;
    }
    let it = Z;
    if (p.value === e.columns.indexOf(E)) {
      const J = S.value ? I.rows.findIndex((ft) => ft.id === S.value) : I.rows.length;
      J >= 0 && it > J && V < I.rows[J].middle + 10 && (it = J), J > 0 && it < J && V > I.rows[J - 1].middle - 10 && (it = J);
    }
    const vt = I.rows[it]?.id;
    k(E, vt), p.value === e.columns.indexOf(E) && ($.value = vt || I.rows[I.rows.length - 1]?.id || null, r.value = !vt);
  }
  function y(C) {
    return C === O.value;
  }
  function L(C, E) {
    if (E !== p.value || !O.value) return C.tasks;
    const I = [...C.tasks], A = S.value ? I.findIndex((V) => V.id === S.value) : -1;
    return I.splice(A < 0 ? I.length : A, 0, O.value), I;
  }
  function k(C, E) {
    if (!w || !T) return;
    if (e.view === "today" && C.sectionId === "overdue" && T.sectionId !== "overdue") {
      p.value = null;
      return;
    }
    const I = E ? C.tasks.find((Z) => Z.id === E) : void 0, A = C === T ? String(w._taskRaw?.parent_id || "") : "";
    if (I && e.view !== "today" && String(I._taskRaw?.parent_id || "") !== A) {
      p.value = null;
      return;
    }
    const V = e.columns.indexOf(C);
    V < 0 || (S.value = E, p.value = V);
  }
  let w = null, T = null;
  function K(C, E, I, A) {
    if (!n.isActive() || e.loading || e.movingTaskId || e.moveNeedsRefresh || E.completed || E.id.startsWith("optimistic-") || n.editingTaskId() === E.id) {
      C.preventDefault();
      return;
    }
    if (C.stopPropagation(), n.closePopovers(), u.value = E.id, w = E, T = I, O.value = { ...E }, H(C.currentTarget), C.dataTransfer) {
      C.dataTransfer.effectAllowed = "move";
      const V = C.currentTarget, Z = V.getBoundingClientRect();
      C.dataTransfer.setDragImage(
        V,
        Math.max(0, Math.min(Z.width, C.clientX - Z.left)),
        Math.max(0, Math.min(Z.height, C.clientY - Z.top))
      ), C.dataTransfer.clearData(), C.dataTransfer.setData("application/x-todoist-task-id", E.id), C.dataTransfer.setData("application/x-logicweaver-todoist-task", E.id), C.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: E.id, sectionId: I.sectionId }));
    }
  }
  function D() {
    cancelAnimationFrame(z), z = 0, U = void 0, u.value = null, p.value = null, $.value = null, r.value = !1, w = null, T = null, O.value = null, S.value = void 0, M.clear();
  }
  function f(C, E) {
    !w || e.movingTaskId || (C.preventDefault(), C.stopPropagation(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), B(C, e.columns[E]));
  }
  function lt(C, E) {
    C.currentTarget?.contains(C.relatedTarget);
  }
  function nt(C, E, I, A) {
    C.dataTransfer && (C.dataTransfer.dropEffect = "move"), B(C, I);
  }
  async function ct(C, E) {
    U && U.col === C && (j(U, U.col), E = S.value);
    const I = w, A = T;
    D(), !(!I || !A || !n.isActive() || e.movingTaskId) && (e.view === "today" ? C.sectionId === "today" && A.sectionId !== "today" ? await n.moveTask(I.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, E) : await n.moveTask(I.id, { sectionId: C.sectionId }, E) : await n.moveTask(I.id, {
      projectId: C.projectId,
      sectionId: C.sectionId
    }, E));
  }
  async function Dt(C, E, I, A) {
    C.preventDefault();
    const V = C.dataTransfer?.getData("application/x-todoist-label") || (C.dataTransfer?.getData("text/plain")?.startsWith("label:") ? C.dataTransfer.getData("text/plain").slice(6) : "");
    if (V) {
      n.dropLabel(E, V);
      return;
    }
    if (p.value === e.columns.indexOf(I)) {
      await ct(I, S.value);
      return;
    }
    const Z = C.currentTarget.getBoundingClientRect(), tt = C.clientY >= Z.top + Z.height / 2, it = I.tasks.filter((ft) => ft.id !== w?.id), vt = it.findIndex((ft) => ft.id === E.id), J = E.id === w?.id ? E.id : tt ? it[vt + 1]?.id : E.id;
    await ct(I, J);
  }
  async function yt(C, E) {
    C.preventDefault(), C.stopPropagation(), await ct(E, p.value === e.columns.indexOf(E) ? S.value : void 0);
  }
  return rt(() => [e.view, e.activeProjectId], () => D()), rt(() => e.columns, (C) => {
    T && !C.includes(T) && D();
  }), rt(n.isActive, (C) => {
    C || D();
  }, { immediate: !0, flush: "sync" }), Et(D), {
    draggingTaskId: u,
    dragOverColIndex: p,
    dragOverTaskId: $,
    dragAfterTask: r,
    isDragPreview: y,
    previewTasks: L,
    onTaskDragStart: K,
    onTaskDragEnd: D,
    onColDragOver: f,
    onColDragLeave: lt,
    onTaskDragOver: nt,
    onTaskDrop: Dt,
    onColDrop: yt
  };
}
const fs = ["data-row-key"], gs = /* @__PURE__ */ Ut({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(n) {
    const e = n, u = P(null), p = /* @__PURE__ */ new Map(), $ = P(0), r = He({ top: 0, height: 600 }), O = (k) => e.isPreview(k) ? `preview:${k.id}` : k.id, S = st(() => {
      $.value;
      const k = [0];
      for (const w of e.tasks) {
        const T = w.id === e.hiddenId && !e.isPreview(w) ? 0 : p.get(O(w)) || p.get(w.id) || 110;
        k.push(k[k.length - 1] + T);
      }
      return k;
    }), M = st(() => {
      $.value;
      let k = 0;
      return e.tasks.filter((w) => !e.isPreview(w)).map((w) => {
        const T = p.get(w.id) || 110, K = { id: w.id, middle: k + T / 2 };
        return k += T, K;
      });
    });
    function H(k) {
      const w = S.value;
      let T = 0, K = e.tasks.length;
      for (; T < K; ) {
        const D = T + K >>> 1;
        w[D + 1] < k ? T = D + 1 : K = D;
      }
      return T;
    }
    const z = st(() => {
      const k = Math.max(0, H(r.value.top) - 5), w = Math.min(e.tasks.length, H(r.value.top + r.value.height) + 6), T = /* @__PURE__ */ new Set();
      for (let K = k; K < w; K++) T.add(K);
      if (e.pinnedId) {
        const K = e.tasks.findIndex((D) => D.id === e.pinnedId && !e.isPreview(D));
        K >= 0 && T.add(K);
      }
      return [...T].sort((K, D) => K - D).map((K) => ({ task: e.tasks[K], index: K, top: S.value[K] }));
    });
    let U = 0;
    function B() {
      U || (U = requestAnimationFrame(() => {
        U = 0, u.value && (r.value = { top: u.value.scrollTop, height: u.value.clientHeight });
      }));
    }
    let j;
    const y = /* @__PURE__ */ new Map();
    function L(k, w) {
      const T = y.get(w);
      T !== k && (T && j?.unobserve(T), k instanceof HTMLElement ? (y.set(w, k), j?.observe(k)) : y.delete(w));
    }
    return rt(() => e.tasks, () => {
      const k = new Set(e.tasks.map(O));
      for (const w of p.keys()) k.has(w) || p.delete(w);
      St(B);
    }), Xt(() => {
      j = new ResizeObserver((k) => {
        let w = !1;
        const T = H(u.value?.scrollTop || 0), K = S.value[T] || 0;
        for (const D of k) {
          const f = D.target;
          if (f === u.value) {
            B();
            continue;
          }
          const lt = f.dataset.rowKey, nt = D.borderBoxSize?.[0]?.blockSize || D.contentRect.height;
          lt && nt > 0 && Math.abs((p.get(lt) || 0) - nt) > 0.5 && (p.set(lt, nt), w = !0);
        }
        if (w) {
          $.value++;
          const D = (S.value[T] || 0) - K;
          u.value && D && !e.pinnedId && (u.value.scrollTop += D), B();
        }
      }), u.value && (j.observe(u.value), u.value.__todoistSlots = () => M.value);
      for (const k of y.values()) j.observe(k);
      B();
    }), Et(() => {
      j?.disconnect(), cancelAnimationFrame(U), u.value && delete u.value.__todoistSlots, y.clear(), p.clear();
    }), (k, w) => (a(), d("div", {
      ref_key: "root",
      ref: u,
      onScrollPassive: B
    }, [
      n.tasks.length ? (a(), d("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: Tt({ height: `${S.value[S.value.length - 1]}px` })
      }, [
        (a(!0), d(ot, null, dt(z.value, (T) => (a(), d("div", {
          key: O(T.task),
          ref_for: !0,
          ref: (K) => L(K, O(T.task)),
          "data-row-key": O(T.task),
          class: "virtual-task-row",
          style: Tt({ transform: `translateY(${T.top}px)` })
        }, [
          Ae(k.$slots, "default", {
            task: T.task,
            index: T.index
          }, void 0, !0)
        ], 12, fs))), 128))
      ], 4)) : Ae(k.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), bs = /* @__PURE__ */ Qt(gs, [["__scopeId", "data-v-e0ed77d8"]]), ks = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, ys = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, ws = {
  key: 2,
  class: "todoist-empty"
}, hs = {
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
}, _s = { class: "todoist-board" }, Rs = ["data-section-id", "data-title", "data-column-index"], Ls = { class: "todoist-board-column-head" }, Ps = ["title", "onClick"], Os = ["onClick"], As = ["onSubmit"], Ms = ["onKeydown"], js = { class: "date-hint-left" }, Es = { class: "date-hint-badge" }, Ws = { class: "date-hint-sub" }, Us = {
  key: 0,
  class: "date-hint-preview"
}, zs = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, Bs = {
  key: 1,
  class: "todoist-composer-images"
}, Ks = ["src"], Ns = { class: "todoist-composer-img-name" }, Hs = {
  key: 0,
  class: "todoist-composer-img-status"
}, Vs = ["onClick"], Fs = { class: "todoist-inline-actions" }, Ys = ["disabled"], Gs = ["disabled"], qs = {
  key: 0,
  class: "todoist-column-empty"
}, Xs = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Qs = ["disabled", "title", "aria-label", "onClick"], Js = { class: "todoist-board-task-main" }, Zs = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, tn = {
  key: 1,
  class: "todoist-card-repo-strip"
}, en = ["title", "onClick"], on = { class: "repo-badge-name" }, sn = ["onKeydown", "onBlur"], nn = {
  key: 3,
  class: "todoist-board-task-title todoist-task-content"
}, an = {
  key: 4,
  class: "todoist-board-task-description"
}, ln = {
  key: 5,
  class: "todoist-board-task-meta"
}, rn = ["title"], dn = ["title"], un = ["title"], cn = ["title"], pn = {
  key: 4,
  class: "todoist-board-extra"
}, mn = ["onClick"], vn = ["src"], fn = {
  key: 0,
  class: "todoist-board-add-column"
}, gn = {
  key: 1,
  class: "todoist-add-section-form"
}, bn = ["onKeydown"], kn = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, yn = ["disabled"], wn = ["disabled"], hn = {
  key: 1,
  class: "todoist-section-menu-divider"
}, Tn = { class: "todoist-task-menu-header" }, Dn = { class: "todoist-task-menu-title" }, Cn = { class: "todoist-menu-badge" }, xn = {
  key: 0,
  class: "todoist-labels-panel"
}, $n = { class: "todoist-labels-quick-input" }, Sn = ["onKeydown"], In = { class: "todoist-labels-chip-grid" }, _n = ["onClick"], Rn = {
  key: 0,
  class: "chip-check"
}, Ln = {
  key: 1,
  class: "todoist-recur-panel"
}, Pn = { class: "todoist-recur-grid" }, On = ["onClick"], An = { class: "todoist-recur-custom-row" }, Mn = ["onKeydown"], jn = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, En = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Wn = {
  key: 2,
  class: "todoist-color-panel"
}, Un = { class: "todoist-color-grid" }, zn = ["title", "onClick"], Bn = { class: "todoist-color-name" }, Kn = ["disabled", "onClick"], Nn = { class: "todoist-project-flyout-name" }, Hn = {
  key: 0,
  class: "todoist-menu-badge"
}, Vn = { class: "todoist-menu-text" }, Fn = ["onKeydown"], Yn = { class: "todoist-dialog-head" }, Gn = { class: "todoist-dialog-title" }, qn = { class: "todoist-dialog-body" }, Xn = {
  key: 0,
  class: "todoist-dialog-desc"
}, Qn = ["placeholder", "onKeydown"], Jn = { class: "todoist-dialog-foot" }, Zn = ["onKeydown"], ti = { class: "todoist-dialog-head" }, ei = { class: "todoist-dialog-icon" }, oi = { class: "todoist-dialog-title" }, si = { class: "todoist-dialog-body" }, ni = {
  key: 0,
  style: { background: "#fef2f2", padding: "10px 12px", "border-radius": "8px", border: "1px solid #fee2e2", "margin-bottom": "10px" }
}, ii = { style: { "font-weight": "700", color: "#dc2626", "font-size": "13.5px" } }, ai = { style: { margin: "0", color: "#64748b", "font-size": "12.5px", "line-height": "1.5" } }, li = { class: "todoist-dialog-foot" }, ri = /* @__PURE__ */ Ut({
  __name: "TodoistTaskList",
  setup(n) {
    const e = P(0);
    function u() {
      e.value++;
    }
    Xt(() => {
      window.addEventListener("storage", u), window.addEventListener("todoist-repository-links-changed", u);
    }), Et(() => {
      window.removeEventListener("storage", u), window.removeEventListener("todoist-repository-links-changed", u);
    });
    function p(s, o) {
      return e.value, Ye(s, o);
    }
    function $(s) {
      Ge.open(s);
    }
    const r = kt, O = P(""), S = P(null), M = P(""), H = P(!1), z = st(() => M.value ? So(M.value) : null), U = P([]);
    function B(s) {
      const o = s.clipboardData?.items;
      if (o)
        for (let l = 0; l < o.length; l++) {
          const F = o[l];
          if (F.type.indexOf("image") !== -1) {
            s.preventDefault();
            const m = F.getAsFile();
            if (!m) continue;
            const bt = URL.createObjectURL(m), Y = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Ot = {
              file: m,
              previewUrl: bt,
              name: `截图_${Y}.png`,
              uploading: !1
            };
            U.value.push(Ot);
          }
        }
    }
    function j(s) {
      const o = U.value.splice(s, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const y = P(null), L = P(""), k = P(null), w = Yt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), T = Yt({
      isOpen: !1,
      title: "",
      message: "",
      value: "",
      placeholder: "",
      confirmText: "确定",
      actionType: "",
      payload: null
    }), K = P(null), D = Yt({
      isOpen: !1,
      title: "确认操作",
      icon: "⚠️",
      alertText: "",
      message: "",
      confirmText: "确定",
      danger: !1,
      actionType: "",
      payload: null
    }), f = Yt({
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
    }), lt = P(null), nt = P(null), ct = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], Dt = [
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
    ], yt = st(() => String(f.task?._taskRaw?.project_id || f.col?.projectId || "")), C = st(() => r.view !== "projects" ? null : r.projects.find((s) => String(s.id) === String(r.activeProjectId)) || r.projects[0] || null), E = st(() => {
      const s = new Set(r.availableLabels || []);
      return f.task?.labels && f.task.labels.forEach((o) => s.add(o)), Array.from(s);
    }), I = st(() => {
      const s = f.task?.customColorHex;
      return s && ct.find((l) => l.hex.toLowerCase() === s.toLowerCase()) || ct[0];
    });
    function A(s, o) {
      return s.sectionId || s.title || String(o);
    }
    function V() {
      return `${r.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function Z(s) {
      return s.startDate || s.dueText || s.labels && s.labels.length > 0 || s.timedDeadlineText || s.extraCountText;
    }
    function tt() {
      w.isOpen = !1, f.isOpen = !1, f.activeSubpanel = null;
    }
    const {
      draggingTaskId: it,
      dragOverColIndex: vt,
      dragOverTaskId: J,
      dragAfterTask: ft,
      isDragPreview: pt,
      previewTasks: Vt,
      onTaskDragStart: zt,
      onTaskDragEnd: Bt,
      onColDragOver: Jt,
      onColDragLeave: Zt,
      onTaskDragOver: W,
      onTaskDrop: i,
      onColDrop: v
    } = vs({
      state: r,
      isActive: () => q.active,
      editingTaskId: () => y.value,
      closePopovers: tt,
      moveTask: (s, o, l) => Q.moveTask(s, o, l),
      dropLabel: (s, o) => {
        s.labels || (s.labels = []), s.labels.includes(o) || (s.labels.push(o), et.getToken() && et.updateTask(s.id, { labels: s.labels }));
      }
    });
    function G(s, o) {
      Q.dispatch("toggle-task", { task: s, group: o });
    }
    function xt(s, o) {
      if (s.completed) return;
      const l = o.target;
      l && l.closest("button,input,textarea,select,a") || Pt(s);
    }
    function Pt(s) {
      r.movingTaskId !== s.id && (y.value = s.id, L.value = s.content, St(() => {
        k.value && (k.value.focus(), k.value.select());
      }));
    }
    function te(s, o) {
      if (y.value !== s.id) return;
      const l = L.value.trim();
      y.value = null, o && l && l !== s.content && (s.content = l, Q.dispatch("update-task-title", {
        taskId: s.id,
        content: l,
        task: s,
        newContent: l
      }));
    }
    function ve(s, o) {
      s.key === "Enter" ? s.shiftKey || (s.preventDefault(), te(o, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), te(o, !1));
    }
    function fe(s, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || at.openTask(s.id, s);
    }
    function ge(s, o, l) {
      const F = l.currentTarget;
      S.value = A(s, o), M.value = "", H.value = !1, St(() => {
        F.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function ae() {
      $t.value || ee();
    }
    function ee() {
      S.value = null, M.value = "", H.value = !1;
      for (const s of U.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      U.value = [];
    }
    const $t = P(!1), Wt = /* @__PURE__ */ new WeakMap();
    function le(s) {
      const o = s.description || s._taskRaw?.description || "", l = Wt.get(s);
      if (l && l.source === o) return l;
      const F = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, m = {
        source: o,
        thumb: F,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return Wt.set(s, m), m;
    }
    function Ft(s) {
      return le(s).text;
    }
    function oe(s) {
      return le(s).thumb;
    }
    function h(s, o) {
      s && Se.open(s, o?.content || "任务照片");
    }
    async function g(s) {
      if (!q.active || $t.value) return;
      const o = [...U.value];
      let F = M.value.trim() || o[0]?.name || "";
      if (!F) return;
      let m, bt, Y;
      if (z.value && !H.value) {
        const It = z.value;
        F = It.cleanTitle || F, m = It.date, bt = It.label + (It.time ? ` ${It.time}` : ""), Y = It.time ? `${It.date} ${It.time}` : It.date;
      }
      const Ot = S.value, de = M.value, At = r.view, uo = s.projectId || At === "projects" && r.activeProjectId || void 0, co = s.sectionId !== void 0 ? s.sectionId : void 0;
      $t.value = !0;
      try {
        await vo(async () => {
          for (const ht of o)
            if (!ht.uploadedUrl) {
              ht.uploading = !0;
              try {
                const we = await et.uploadFile(ht.file, ht.name);
                ht.uploadedUrl = we.file_url;
              } catch {
                ht.uploadedUrl = ht.previewUrl;
              } finally {
                ht.uploading = !1;
              }
            }
          await Q.dispatch("add-task-submit", {
            content: F,
            view: At,
            group: s,
            projectId: uo,
            sectionId: co,
            dueDate: m,
            dueText: bt,
            dueString: Y,
            attachments: o.map((ht) => ({ file_url: ht.uploadedUrl, file_name: ht.name, file_type: ht.file.type || "image/png" }))
          }) && Ot === S.value && de === M.value && o.length === U.value.length && o.every((ht, we) => ht === U.value[we]) && ee();
        });
      } catch {
        r.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        $t.value = !1;
      }
    }
    function R(s, o) {
      s.key === "Enter" && !s.shiftKey ? (s.preventDefault(), g(o)) : s.key === "Escape" && (s.preventDefault(), ae());
    }
    function ut() {
      const s = O.value.trim();
      if (!s) return;
      const l = r.columns.find((F) => F.projectId)?.projectId || r.activeProjectId || void 0;
      Q.dispatch("add-section-submit", { name: s, projectId: l }), wt();
    }
    function wt() {
      r.addingSection = !1, O.value = "";
    }
    function gt(s, o, l) {
      if (w.isOpen && w.col === s) {
        w.isOpen = !1;
        return;
      }
      f.isOpen = !1;
      const m = l.currentTarget.getBoundingClientRect(), Y = Math.max(8, Math.min(window.innerWidth - 175 - 8, m.left)), Ot = Math.max(8, Math.min(window.innerHeight - 220, m.bottom + 4));
      w.col = s, w.x = Y, w.y = Ot, w.canMoveLeft = o > 0 && !!r.columns[o - 1]?.sectionId, w.canMoveRight = o < r.columns.length - 1 && !!r.columns[o + 1]?.sectionId, w.isOpen = !0;
    }
    function Kt(s, o) {
      w.isOpen = !1, Q.dispatch("move-section", { sectionId: s.sectionId, direction: o });
    }
    function Ie(s, o, l) {
      if (r.movingTaskId === s.id || s.completed) return;
      w.isOpen = !1;
      const F = 236, m = 340, bt = Math.max(8, Math.min(window.innerWidth - F - 8, l.clientX)), Y = Math.max(8, Math.min(window.innerHeight - m - 8, l.clientY));
      if (f.task = s, f.col = o, f.x = bt, f.y = Y, f.activeSubpanel = null, f.descText = s.description || "", f.isSavingDesc = !1, f.newLabelText = "", f.customRecurText = "", s.dueDate) {
        const At = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(At.getTime()) && (f.calYear = At.getFullYear(), f.calMonth = At.getMonth());
      } else {
        const At = /* @__PURE__ */ new Date();
        f.calYear = At.getFullYear(), f.calMonth = At.getMonth();
      }
      const Ot = 252, de = bt + F + Ot > window.innerWidth - 8;
      f.flyoutOpenLeft = de, f.flyoutStyle = {
        left: de ? `${-Ot - 6}px` : `${F + 6}px`,
        top: "0px"
      }, f.isOpen = !0;
    }
    function re(s) {
      f.activeSubpanel === s ? f.activeSubpanel = null : (f.activeSubpanel = s, s === "desc" ? St(() => {
        lt.value?.focus(), lt.value?.select();
      }) : s === "labels" && St(() => {
        nt.value?.focus();
      }));
    }
    function _e(s) {
      return !!f.task?.labels?.includes(s);
    }
    function Xe(s) {
      if (!f.task) return;
      const o = f.task.id, l = [...f.task.labels || []], F = l.includes(s) ? l.filter((m) => m !== s) : [...l, s];
      f.task.labels = F, Q.dispatch("update-task-labels", { taskId: o, labels: F });
    }
    function Re() {
      if (!f.task) return;
      const s = f.newLabelText.trim();
      if (!s) return;
      f.newLabelText = "";
      const o = f.task.id, l = [...f.task.labels || []];
      l.includes(s) || (l.push(s), f.task.labels = l, Q.dispatch("update-task-labels", { taskId: o, labels: l })), tt();
    }
    function Qe(s) {
      return String(f.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function Je(s, o) {
      if (!f.task) return;
      const l = f.task.id;
      Q.dispatch("update-task-recurring", { taskId: l, rule: s, label: o }), tt();
    }
    function Le() {
      if (!f.task) return;
      const s = f.customRecurText.trim();
      if (!s) return;
      const o = f.task.id;
      Q.dispatch("update-task-recurring", { taskId: o, rule: s, label: s }), tt();
    }
    function Ze() {
      if (!f.task) return;
      const s = f.task.id;
      Q.dispatch("clear-task-recurring", { taskId: s }), tt();
    }
    function to(s) {
      if (!f.task) return;
      const o = f.task.id, l = ct.find((F) => F.id === s);
      f.task.customColorHex = l?.hex || "", Q.dispatch("update-task-color", { taskId: o, colorId: s }), tt();
    }
    function eo(s) {
      if (!f.task) return;
      const o = f.task.id;
      Q.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), tt();
    }
    function oo() {
      if (!f.task) return;
      const s = f.task;
      tt(), s.isRecurring ? (D.title = "删除重复任务确认", D.icon = "⚠️", D.danger = !0, D.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", D.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, D.confirmText = "删除重复任务", D.actionType = "delete-task", D.payload = { taskId: s.id, isRecurring: !0 }, D.isOpen = !0) : (D.title = "删除任务确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要删除任务「${s.content}」吗？`, D.message = "此操作不可撤销。", D.confirmText = "确认删除", D.actionType = "delete-task", D.payload = { taskId: s.id, isRecurring: !1 }, D.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, o, l) {
      Ie(s, o, l);
    });
    function Pe() {
      T.title = "新建项目", T.message = "请输入新项目名称：", T.value = "", T.placeholder = "项目名称…", T.confirmText = "创建", T.actionType = "create-project", T.payload = null, T.isOpen = !0, St(() => K.value?.focus());
    }
    function so(s) {
      T.title = "重命名项目", T.message = `正在重命名项目「${s.name}」：`, T.value = s.name, T.placeholder = "新项目名称…", T.confirmText = "保存", T.actionType = "rename-project", T.payload = { projectId: s.id }, T.isOpen = !0, St(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function no(s) {
      w.isOpen = !1, T.title = "重命名板块", T.message = `正在重命名板块「${s.title}」：`, T.value = s.title, T.placeholder = "新板块名称…", T.confirmText = "保存", T.actionType = "rename-section", T.payload = { sectionId: s.sectionId }, T.isOpen = !0, St(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function be() {
      T.isOpen = !1;
    }
    function Oe() {
      const s = T.value.trim();
      if (!s) return;
      const { actionType: o, payload: l } = T;
      be(), o === "create-project" ? Q.dispatch("create-project-submit", s) : o === "rename-project" && l && "projectId" in l ? Q.dispatch("rename-project-submit", { projectId: l.projectId, newName: s }) : o === "rename-section" && l && "sectionId" in l && Q.dispatch("rename-section", { sectionId: l.sectionId, newName: s });
    }
    function io(s) {
      D.title = "删除项目确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要彻底删除项目「${s.name}」吗？`, D.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！", D.confirmText = "彻底删除", D.actionType = "delete-project", D.payload = { projectId: s.id }, D.isOpen = !0;
    }
    function ao(s) {
      w.isOpen = !1, D.title = "删除板块确认", D.icon = "🗑️", D.danger = !0, D.alertText = `确定要删除板块「${s.title}」吗？`, D.message = "板块内的任务将自动保留并移至默认收件箱。", D.confirmText = "删除板块", D.actionType = "delete-section", D.payload = { sectionId: s.sectionId }, D.isOpen = !0;
    }
    function ke() {
      D.isOpen = !1;
    }
    function lo() {
      const { actionType: s, payload: o } = D;
      ke(), s === "delete-project" && o && "projectId" in o ? Q.dispatch("delete-project-submit", o.projectId) : s === "delete-section" && o && "sectionId" in o ? Q.dispatch("delete-section", { sectionId: o.sectionId }) : s === "delete-task" && o && "taskId" in o && Q.dispatch("delete-task-submit", o);
    }
    function ro(s) {
      Q.dispatch("switch-project", s);
    }
    function ye(s) {
      s.key === "Escape" && (f.isOpen && (f.isOpen = !1, f.activeSubpanel = null), w.isOpen && (w.isOpen = !1));
    }
    return rt(() => q.active, (s) => {
      document.removeEventListener("keydown", ye), s && document.addEventListener("keydown", ye);
    }, { immediate: !0, flush: "sync" }), Et(() => {
      document.removeEventListener("keydown", ye), ee();
    }), (s, o) => (a(), d("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: tt
    }, [
      c(r).moveError && c(r).moveMessage ? (a(), d("p", ks, x(c(r).moveMessage), 1)) : _("", !0),
      c(r).emptyText && c(r).columns.length > 0 && !c(r).loading ? (a(), d("p", ys, x(c(r).emptyText) + " 已显示的任务保留。", 1)) : _("", !0),
      c(r).loading && c(r).columns.length === 0 ? (a(), d("p", ws, "加载中…")) : c(r).emptyText && c(r).columns.length === 0 ? (a(), d("p", hs, x(c(r).emptyText), 1)) : c(r).view === "projects" && c(r).projects.length === 0 ? (a(), d("div", Ts, [
        o[25] || (o[25] = t("div", { class: "empty-icon" }, "📁", -1)),
        o[26] || (o[26] = t("h3", null, "暂无自定义项目", -1)),
        o[27] || (o[27] = t("p", null, "你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！", -1)),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: Pe
        }, "＋ 新建第一个项目")
      ])) : (a(), d(ot, { key: 5 }, [
        c(r).view === "projects" && c(r).projects.length ? (a(), d("div", Ds, [
          t("div", Cs, [
            t("div", xs, [
              (a(!0), d(ot, null, dt(c(r).projects, (l) => (a(), d("button", {
                key: l.id,
                type: "button",
                class: X(["todoist-project-tab", { active: String(l.id) === String(c(r).activeProjectId) }]),
                onClick: (F) => ro(l.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: Tt({ background: l.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", Ss, x(l.name), 1)
              ], 10, $s))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: Pe
              }, "＋ 新建项目")
            ]),
            C.value ? (a(), d("div", Is, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: "重命名项目",
                onClick: o[0] || (o[0] = (l) => so(C.value))
              }, [...o[28] || (o[28] = [
                t("span", { class: "action-icon" }, "✏️", -1),
                t("span", { class: "action-text" }, "重命名", -1)
              ])]),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: "删除项目",
                onClick: o[1] || (o[1] = (l) => io(C.value))
              }, [...o[29] || (o[29] = [
                t("span", { class: "action-icon" }, "🗑️", -1),
                t("span", { class: "action-text" }, "删除项目", -1)
              ])])
            ])) : _("", !0)
          ])
        ])) : _("", !0),
        t("div", _s, [
          (a(!0), d(ot, null, dt(c(r).columns, (l, F) => (a(), d("section", {
            key: l.sectionId || l.title || F,
            class: "todoist-board-column",
            "data-section-id": l.sectionId,
            "data-title": l.title,
            "data-column-index": F
          }, [
            t("header", Ls, [
              t("h3", null, [
                jt(x(l.title) + " ", 1),
                t("span", null, x(l.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: l.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: N((m) => gt(l, F, m), ["stop"])
              }, "•••", 8, Ps)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (m) => ge(l, F, m)
            }, "＋ 添加任务", 8, Os),
            S.value === A(l, F) ? (a(), d("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: N((m) => g(l), ["prevent"])
            }, [
              Rt(t("textarea", {
                "onUpdate:modelValue": o[2] || (o[2] = (m) => M.value = m),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (m) => R(m, l),
                onPaste: o[3] || (o[3] = (m) => B(m))
              }, null, 40, Ms), [
                [Nt, M.value]
              ]),
              z.value ? (a(), d("div", {
                key: 0,
                class: X(["todoist-composer-date-hint", { "is-ignored": H.value }])
              }, [
                t("div", js, [
                  o[31] || (o[31] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", Es, [
                    jt(x(z.value.label) + x(z.value.time ? " " + z.value.time : "") + " ", 1),
                    t("span", Ws, "(" + x(z.value.formattedDate) + ")", 1)
                  ]),
                  H.value ? (a(), d("span", zs, " (已忽略日期，按纯文本创建) ")) : (a(), d("span", Us, [
                    o[30] || (o[30] = jt(" 精简任务名: ", -1)),
                    t("strong", null, x(z.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[4] || (o[4] = (m) => H.value = !H.value)
                }, x(H.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : _("", !0),
              U.value.length > 0 ? (a(), d("div", Bs, [
                (a(!0), d(ot, null, dt(U.value, (m, bt) => (a(), d("div", {
                  key: bt,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: m.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Ks),
                  t("span", Ns, x(m.name), 1),
                  m.uploading ? (a(), d("span", Hs, "上传中…")) : _("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (Y) => j(bt)
                  }, "×", 8, Vs)
                ]))), 128))
              ])) : _("", !0),
              t("div", Fs, [
                t("button", {
                  type: "button",
                  disabled: $t.value,
                  onClick: ae
                }, "取消", 8, Ys),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: $t.value
                }, x($t.value ? U.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Gs)
              ])
            ], 40, As)) : _("", !0),
            Gt(bs, {
              tasks: c(Vt)(l, F),
              "pinned-id": c(it) || y.value,
              "hidden-id": c(vt) !== null ? c(it) : null,
              "is-preview": c(pt),
              class: X(["todoist-board-list", { "drag-over": c(vt) === F }]),
              "data-group-index": F,
              onDragover: N((m) => c(Jt)(m, F), ["prevent"]),
              onDragleave: (m) => c(Zt)(m, F),
              onDrop: N((m) => c(v)(m, l), ["prevent"])
            }, {
              empty: ne(() => [
                l.tasks.length === 0 && c(vt) !== F ? (a(), d("p", qs, " 暂无任务 · 可拖到这里 ")) : _("", !0)
              ]),
              default: ne(({ task: m, index: bt }) => [
                t("article", {
                  class: X(["todoist-board-task", [
                    {
                      completed: m.completed,
                      "has-custom-color": !!m.customColorHex,
                      editing: y.value === m.id,
                      "dragging-task": !c(pt)(m) && c(it) === m.id,
                      "drop-before": c(J) === m.id && !c(ft),
                      "drop-after": c(J) === m.id && c(ft),
                      "saving-position": c(r).movingTaskId === m.id,
                      "todoist-task-preview": c(pt)(m),
                      "drag-origin-hidden": c(it) === m.id && !c(pt)(m) && c(vt) !== null
                    }
                  ]]),
                  style: Tt(m.customColorHex ? { "--task-custom-color": m.customColorHex } : {}),
                  "data-task-id": c(pt)(m) ? void 0 : m.id,
                  "aria-hidden": c(pt)(m) || void 0,
                  tabindex: c(pt)(m) ? -1 : 0,
                  title: V(),
                  draggable: !c(pt)(m) && !m.completed && !c(r).loading && !c(r).movingTaskId && !c(r).moveNeedsRefresh && y.value !== m.id && !m.id.startsWith("optimistic-"),
                  onDragstart: (Y) => c(zt)(Y, m, l, bt),
                  onDragend: o[7] || (o[7] = //@ts-ignore
                  (...Y) => c(Bt) && c(Bt)(...Y)),
                  onDragover: N((Y) => c(W)(Y, m, l, bt), ["stop", "prevent"]),
                  onDrop: N((Y) => c(i)(Y, m, l, bt), ["stop", "prevent"]),
                  onDblclick: (Y) => xt(m, Y),
                  onClick: (Y) => fe(m, Y),
                  onContextmenu: N((Y) => Ie(m, l, Y), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: X(["todoist-board-check", { checked: m.completed }]),
                    disabled: c(pt)(m) || c(r).movingTaskId === m.id,
                    title: m.completed ? "撤销完成" : "完成任务",
                    "aria-label": (m.completed ? "撤销完成：" : "完成：") + m.content,
                    onClick: N((Y) => G(m, l), ["stop"])
                  }, null, 10, Qs),
                  t("div", Js, [
                    c(r).movingTaskId === m.id ? (a(), d("span", Zs, "保存中")) : _("", !0),
                    p(m.id, m.description).length ? (a(), d("div", tn, [
                      (a(!0), d(ot, null, dt(p(m.id, m.description), (Y) => (a(), d("button", {
                        key: Y.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + Y.fullName + " · 点击在插件内查看详情",
                        onClick: N((Ot) => $(Y.fullName), ["stop"])
                      }, [
                        o[32] || (o[32] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", on, x(Y.fullName), 1)
                      ], 8, en))), 128))
                    ])) : _("", !0),
                    y.value === m.id ? Rt((a(), d("textarea", {
                      key: 2,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: k,
                      "onUpdate:modelValue": o[5] || (o[5] = (Y) => L.value = Y),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (Y) => ve(Y, m),
                      onBlur: (Y) => te(m, !0),
                      onClick: o[6] || (o[6] = N(() => {
                      }, ["stop"]))
                    }, null, 40, sn)), [
                      [Nt, L.value]
                    ]) : (a(), d("p", nn, x(m.content || "未命名任务"), 1)),
                    Ft(m) ? (a(), d("p", an, x(Ft(m)), 1)) : _("", !0),
                    Z(m) ? (a(), d("div", ln, [
                      m.startDate && !m.dueDate ? (a(), d("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${m.startDate}`
                      }, " 🛫 自 " + x(c(Te)(m.startDate)) + " 起 ", 9, rn)) : m.startDate && m.dueDate ? (a(), d("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${m.startDate} 至 ${m.dueDate}`
                      }, " ⏱ " + x(c(Te)(m.startDate)) + " ~ " + x(c(Te)(m.dueDate)), 9, dn)) : m.dueText ? (a(), d("span", {
                        key: 2,
                        class: X(["todoist-board-due", { recurring: m.isRecurring }]),
                        title: m.isRecurring ? `循环任务：${m.dueString || m.dueText}` : void 0
                      }, x(m.isRecurring ? "↻ " : "▣ ") + x(m.dueText), 11, un)) : _("", !0),
                      (a(!0), d(ot, null, dt((m.labels || []).slice(0, 3), (Y) => (a(), d("span", {
                        key: Y,
                        class: "todoist-board-label"
                      }, "◇ " + x(Y), 1))), 128)),
                      m.timedDeadlineText ? (a(), d("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (m.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + x(m.timedDeadlineText), 9, cn)) : _("", !0),
                      m.extraCountText ? (a(), d("span", pn, x(m.extraCountText), 1)) : _("", !0)
                    ])) : _("", !0),
                    oe(m) ? (a(), d("div", {
                      key: 6,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: N((Y) => h(oe(m), m), ["stop"])
                    }, [
                      t("img", {
                        src: oe(m),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, vn),
                      o[33] || (o[33] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, mn)) : _("", !0)
                  ])
                ], 46, Xs)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, Rs))), 128)),
          c(r).view === "inbox" || c(r).view === "projects" ? (a(), d("div", fn, [
            c(r).addingSection ? (a(), d("div", gn, [
              Rt(t("input", {
                "onUpdate:modelValue": o[9] || (o[9] = (l) => O.value = l),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  Ct(N(ut, ["prevent"]), ["enter"]),
                  Ct(wt, ["esc"])
                ]
              }, null, 40, bn), [
                [Nt, O.value]
              ]),
              t("div", { class: "todoist-add-section-actions" }, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: ut
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: wt
                }, "取消")
              ])
            ])) : (a(), d("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[8] || (o[8] = (l) => c(r).addingSection = !0)
            }, [...o[34] || (o[34] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : _("", !0)
        ])
      ], 64)),
      w.isOpen && w.col ? (a(), d("div", {
        key: 6,
        class: "todoist-section-menu",
        style: Tt({ left: w.x + "px", top: w.y + "px" }),
        onClick: o[14] || (o[14] = N(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[10] || (o[10] = (l) => no(w.col))
        }, [...o[35] || (o[35] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        w.col.sectionId ? (a(), d("div", kn, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !w.canMoveLeft,
            title: "向左移动板块",
            onClick: o[11] || (o[11] = (l) => Kt(w.col, -1))
          }, "◀ 左移", 8, yn),
          o[36] || (o[36] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !w.canMoveRight,
            title: "向右移动板块",
            onClick: o[12] || (o[12] = (l) => Kt(w.col, 1))
          }, "右移 ▶", 8, wn)
        ])) : _("", !0),
        w.col.sectionId ? (a(), d("div", hn)) : _("", !0),
        w.col.sectionId ? (a(), d("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[13] || (o[13] = (l) => ao(w.col))
        }, [...o[37] || (o[37] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : _("", !0)
      ], 4)) : _("", !0),
      f.isOpen && f.task ? (a(), d("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: Tt({ left: f.x + "px", top: f.y + "px" }),
        role: "menu",
        onClick: o[21] || (o[21] = N(() => {
        }, ["stop"]))
      }, [
        t("div", Tn, [
          t("span", Dn, x(f.task.content || "任务操作"), 1)
        ]),
        t("button", {
          type: "button",
          class: X(["todoist-task-menu-item", { active: f.activeSubpanel === "labels" }]),
          onClick: o[15] || (o[15] = (l) => re("labels"))
        }, [
          o[38] || (o[38] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          o[39] || (o[39] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", Cn, x(f.task.labels && f.task.labels.length ? `已选 ${f.task.labels.length}` : "无"), 1)
        ], 2),
        f.activeSubpanel === "labels" ? (a(), d("div", xn, [
          t("div", $n, [
            Rt(t("input", {
              "onUpdate:modelValue": o[16] || (o[16] = (l) => f.newLabelText = l),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: Ct(N(Re, ["prevent"]), ["enter"])
            }, null, 40, Sn), [
              [Nt, f.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Re
            }, "＋")
          ]),
          t("div", In, [
            (a(!0), d(ot, null, dt(E.value, (l) => (a(), d("button", {
              key: l,
              type: "button",
              class: X(["todoist-label-chip", { selected: _e(l) }]),
              onClick: (F) => Xe(l)
            }, [
              t("span", null, "◇ " + x(l), 1),
              _e(l) ? (a(), d("span", Rn, "✓")) : _("", !0)
            ], 10, _n))), 128))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: X(["todoist-task-menu-item", { active: f.activeSubpanel === "recur" }]),
          onClick: o[17] || (o[17] = (l) => re("recur"))
        }, [
          o[40] || (o[40] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          o[41] || (o[41] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: Tt(f.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, x(f.task.isRecurring ? f.task.dueString || "循环" : "无"), 5)
        ], 2),
        f.activeSubpanel === "recur" ? (a(), d("div", Ln, [
          t("div", Pn, [
            (a(), d(ot, null, dt(Dt, (l) => t("button", {
              key: l.rule,
              type: "button",
              class: X(["todoist-recur-chip", { selected: Qe(l.rule) }]),
              onClick: (F) => Je(l.rule, l.label)
            }, [
              t("span", null, x(l.icon), 1),
              t("span", null, x(l.label), 1)
            ], 10, On)), 64))
          ]),
          t("div", An, [
            Rt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (l) => f.customRecurText = l),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: Ct(N(Le, ["prevent"]), ["enter"])
            }, null, 40, Mn), [
              [Nt, f.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Le
            }, "确定")
          ]),
          f.task.isRecurring ? (a(), d("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: Ze
          }, "❌ 清除循环（转为单次任务）")) : _("", !0)
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: X(["todoist-task-menu-item", { active: f.activeSubpanel === "color" }]),
          onClick: o[19] || (o[19] = (l) => re("color"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          o[43] || (o[43] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", jn, [
            I.value.id === "none" ? (a(), d("span", En, "⊘")) : (a(), d("span", {
              key: 1,
              class: "todoist-color-dot",
              style: Tt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: I.value.hex
              })
            }, null, 4)),
            jt(" " + x(I.value.name), 1)
          ])
        ], 2),
        f.activeSubpanel === "color" ? (a(), d("div", Wn, [
          t("div", Un, [
            (a(), d(ot, null, dt(ct, (l) => t("button", {
              key: l.id,
              type: "button",
              class: X(["todoist-color-swatch", { selected: I.value.id === l.id }]),
              title: l.name,
              onClick: (F) => to(l.id)
            }, [
              t("span", {
                class: X(["todoist-color-dot", { none: l.id === "none" }]),
                style: Tt(l.id !== "none" ? { background: l.hex } : {})
              }, x(l.id === "none" ? I.value.id === "none" ? "✓" : "⊘" : I.value.id === l.id ? "✓" : ""), 7),
              t("span", Bn, x(l.name), 1)
            ], 10, zn)), 64))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: X(["todoist-task-menu-item", { active: f.activeSubpanel === "project" }]),
          onClick: o[20] || (o[20] = (l) => re("project"))
        }, [...o[44] || (o[44] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        f.activeSubpanel === "project" ? (a(), d("div", {
          key: 3,
          class: X(["todoist-project-flyout", { "open-left": f.flyoutOpenLeft }]),
          style: Tt(f.flyoutStyle)
        }, [
          (a(!0), d(ot, null, dt(c(r).projects, (l) => (a(), d("button", {
            key: l.id,
            type: "button",
            class: X(["todoist-project-flyout-item", { active: String(l.id) === yt.value }]),
            disabled: !!c(r).movingTaskId || String(l.id) === yt.value,
            onClick: (F) => eo(l)
          }, [
            o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Nn, x(l.name), 1),
            String(l.id) === yt.value ? (a(), d("span", Hn, "当前")) : _("", !0)
          ], 10, Kn))), 128))
        ], 6)) : _("", !0),
        o[47] || (o[47] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: oo
        }, [
          o[46] || (o[46] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Vn, x(f.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : _("", !0),
      T.isOpen && c(q).active ? (a(), d("div", {
        key: 8,
        class: "todoist-dialog-overlay",
        onKeydown: Ct(N(be, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: o[23] || (o[23] = N(() => {
          }, ["stop"]))
        }, [
          t("div", Yn, [
            o[48] || (o[48] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
            t("h3", Gn, x(T.title), 1)
          ]),
          t("div", qn, [
            T.message ? (a(), d("p", Xn, x(T.message), 1)) : _("", !0),
            Rt(t("input", {
              ref_key: "promptInputRef",
              ref: K,
              "onUpdate:modelValue": o[22] || (o[22] = (l) => T.value = l),
              type: "text",
              class: "todoist-dialog-input",
              placeholder: T.placeholder,
              onKeydown: Ct(N(Oe, ["prevent"]), ["enter"])
            }, null, 40, Qn), [
              [Nt, T.value]
            ])
          ]),
          t("div", Jn, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: be
            }, "取消"),
            t("button", {
              type: "button",
              class: "todoist-dialog-btn primary",
              onClick: Oe
            }, x(T.confirmText || "确定"), 1)
          ])
        ])
      ], 40, Fn)) : _("", !0),
      D.isOpen && c(q).active ? (a(), d("div", {
        key: 9,
        class: "todoist-dialog-overlay",
        onKeydown: Ct(N(ke, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: o[24] || (o[24] = N(() => {
          }, ["stop"]))
        }, [
          t("div", ti, [
            t("span", ei, x(D.icon || "⚠️"), 1),
            t("h3", oi, x(D.title), 1)
          ]),
          t("div", si, [
            D.danger ? (a(), d("div", ni, [
              t("div", ii, x(D.alertText), 1)
            ])) : _("", !0),
            t("p", ai, x(D.message), 1)
          ]),
          t("div", li, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: ke
            }, "取消"),
            t("button", {
              type: "button",
              class: X(["todoist-dialog-btn", D.danger ? "danger" : "primary"]),
              onClick: lo
            }, x(D.confirmText || "确定"), 3)
          ])
        ])
      ], 40, Zn)) : _("", !0)
    ]));
  }
}), di = /* @__PURE__ */ Qt(ri, [["__scopeId", "data-v-7fec8f57"]]), ui = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, ci = { class: "reminder-shortcuts" }, pi = ["disabled"], mi = { class: "reminder-preview" }, vi = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, fi = ["disabled"], gi = ["disabled"], bi = ["disabled"], ki = /* @__PURE__ */ Ut({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(n, { emit: e }) {
    const u = n, p = e, $ = u.value || (u.taskDate ? u.taskDate + "T" + (u.taskTime || "09:00") : ""), r = P($.slice(0, 10)), O = P($.slice(11, 16)), S = P(!1), M = P(""), H = P(!0), z = st(() => r.value && O.value ? (/* @__PURE__ */ new Date(r.value + "T" + O.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function U(j) {
      if (S.value) return;
      const y = /* @__PURE__ */ new Date();
      j === "tomorrow" ? (y.setDate(y.getDate() + 1), y.setHours(9, 0, 0, 0)) : y.setTime(y.getTime() + j * 6e4), r.value = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`, O.value = `${String(y.getHours()).padStart(2, "0")}:${String(y.getMinutes()).padStart(2, "0")}`, M.value = "", H.value = !0;
    }
    async function B(j) {
      if (!(S.value || q.pendingWrites)) {
        if (j && (!Number.isFinite(Date.parse(j)) || Date.parse(j) <= Date.now())) {
          M.value = "请选择未来的提醒时间。";
          return;
        }
        if (b.taskId === u.taskId) {
          S.value = !0, M.value = "";
          try {
            if (await at.setReminder(j), b.taskId !== u.taskId) return;
            b.error ? M.value = b.error : b.reminderTime === j && p("close");
          } finally {
            S.value = !1;
          }
        }
      }
    }
    return (j, y) => (a(), Lt(xe, {
      anchor: n.anchor,
      onClose: y[9] || (y[9] = (L) => p("close"))
    }, {
      default: ne(() => [
        t("section", ui, [
          y[11] || (y[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", ci, [
            t("button", {
              type: "button",
              onClick: y[0] || (y[0] = (L) => U(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: y[1] || (y[1] = (L) => U(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: y[2] || (y[2] = (L) => U("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: S.value }, [
            y[10] || (y[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Gt($e, {
              modelValue: r.value,
              "onUpdate:modelValue": y[3] || (y[3] = (L) => r.value = L),
              "time-value": O.value,
              "onUpdate:timeValue": y[4] || (y[4] = (L) => O.value = L),
              embedded: "",
              onTimeValidity: y[5] || (y[5] = (L) => H.value = L)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, pi),
          t("div", mi, x(z.value || "选择提醒的日期和时间"), 1),
          y[12] || (y[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          M.value ? (a(), d("p", vi, x(M.value), 1)) : _("", !0),
          t("footer", null, [
            n.value ? (a(), d("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: S.value || !!c(q).pendingWrites,
              onClick: y[6] || (y[6] = (L) => B(""))
            }, "移除提醒", 8, fi)) : _("", !0),
            t("button", {
              type: "button",
              disabled: S.value,
              onClick: y[7] || (y[7] = (L) => p("close"))
            }, "取消", 8, gi),
            t("button", {
              type: "button",
              class: "save",
              disabled: S.value || !!c(q).pendingWrites || !r.value || !O.value || !H.value,
              onClick: y[8] || (y[8] = (L) => B(r.value + "T" + O.value))
            }, x(S.value ? "保存中…" : "设置提醒"), 9, bi)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), yi = /* @__PURE__ */ Qt(ki, [["__scopeId", "data-v-da9e3ddd"]]), wi = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, hi = { class: "inspector-main-col" }, Ti = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Di = {
  key: 1,
  class: "inspector-repo-badges"
}, Ci = ["title", "onClick"], xi = { class: "repo-badge-name" }, $i = { class: "inspector-section inspector-title-section" }, Si = { class: "task-title-row" }, Ii = {
  key: 0,
  class: "check-mark"
}, _i = ["value", "disabled"], Ri = ["value", "disabled"], Li = ["onKeydown"], Pi = {
  key: 0,
  class: "desc-placeholder-btn"
}, Oi = ["innerHTML"], Ai = {
  key: 2,
  role: "status"
}, Mi = {
  key: 3,
  class: "attached-img-grid"
}, ji = ["onClick"], Ei = ["src", "alt"], Wi = { class: "attached-img-info" }, Ui = ["onClick"], zi = { class: "inspector-section inspector-subtasks-section" }, Bi = {
  key: 0,
  class: "subtasks-list"
}, Ki = ["onClick"], Ni = {
  key: 0,
  class: "check-tick"
}, Hi = { class: "subtask-content-text" }, Vi = ["onClick"], Fi = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Yi = ["value"], Gi = { class: "subtask-actions" }, qi = { class: "inspector-section inspector-comments-section" }, Xi = { class: "comment-input-bar" }, Qi = { class: "comment-input-wrap" }, Ji = ["value", "disabled"], Zi = ["disabled"], ta = {
  key: 0,
  class: "comments-list"
}, ea = { class: "comment-item-content" }, oa = { class: "comment-item-header" }, sa = { class: "comment-time" }, na = { class: "comment-text" }, ia = {
  key: 0,
  class: "comment-attached-thumb"
}, aa = ["src", "onClick"], la = { class: "inspector-side-col" }, ra = { class: "side-prop-group date-picker-anchor" }, da = { class: "row-text" }, ua = { class: "side-prop-group date-picker-anchor" }, ca = { class: "row-text" }, pa = { class: "side-prop-group" }, ma = { class: "row-text" }, va = { class: "inspector-menu" }, fa = ["disabled", "onClick"], ga = { key: 0 }, ba = { class: "side-prop-group" }, ka = { class: "row-text" }, ya = { class: "inspector-menu" }, wa = ["onKeydown"], ha = { key: 0 }, Ta = {
  key: 1,
  role: "alert"
}, Da = { class: "label-options-list" }, Ca = ["checked", "disabled", "onChange"], xa = ["disabled"], $a = { key: 3 }, Sa = { class: "side-prop-group" }, Ia = { class: "row-text" }, _a = /* @__PURE__ */ Ut({
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
  setup(n, { emit: e }) {
    const u = n, p = e, $ = P(!1), r = P(null), O = P(null);
    let S;
    Xt(() => {
      let W = -1;
      S = new ResizeObserver((i) => {
        const v = i[0]?.contentRect.width;
        v !== W && (W = v, z(O.value), z(r.value));
      }), O.value?.parentElement && S.observe(O.value.parentElement);
    }), Et(() => S?.disconnect());
    const M = st(() => {
      if (!u.editDescription) return "";
      const W = u.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), i = document.createElement("template");
      i.innerHTML = _o.renderMarkdown(W);
      const v = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const G of Array.from(i.content.querySelectorAll("*"))) {
        if (!v.has(G.tagName)) {
          G.replaceWith(document.createTextNode(G.textContent || ""));
          continue;
        }
        const xt = G.tagName === "A" ? G.getAttribute("href") : null;
        for (const Pt of Array.from(G.attributes)) G.removeAttribute(Pt.name);
        xt && /^(https?:\/\/|mailto:)/i.test(xt) && (G.setAttribute("href", xt), G.setAttribute("target", "_blank"), G.setAttribute("rel", "noopener noreferrer"));
      }
      return i.innerHTML;
    });
    function H() {
      $.value = !0, St(() => {
        z(r.value), r.value?.focus();
      });
    }
    function z(W) {
      W && (W.style.height = "auto", W.style.height = W.scrollHeight + "px");
    }
    function U(W) {
      z(W.el);
    }
    function B(W) {
      const i = W.target;
      z(i), p("update:editDescription", i.value), p("scheduleDraftSave", W);
    }
    function j() {
      p("saveTitleAndDesc"), $.value = !1;
    }
    const y = P(!1), L = P(!1), k = P(null), w = P(null), T = P(!1), K = P(!1), D = P(!1), f = P(""), lt = P(null), nt = P(null), ct = P(null), Dt = P([]), yt = P(!1), C = P("");
    let E;
    rt(() => [u.state.taskId, K.value], async (W, i, v) => {
      if (E?.abort(), !K.value) return;
      const G = new AbortController();
      E = G, v(() => G.abort()), Dt.value = [], yt.value = !0, C.value = "";
      try {
        const xt = await et.getLabels(G.signal);
        G.signal.aborted || (Dt.value = xt.map((Pt) => Pt.name));
      } catch {
        G.signal.aborted || (C.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        G.signal.aborted || (yt.value = !1);
      }
    });
    function I() {
      D.value = !0;
    }
    const A = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function V(W) {
      switch (W) {
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
    function Z(W) {
      T.value = !1, p("selectPriority", W);
    }
    const tt = st(() => {
      const W = /* @__PURE__ */ new Set([...Dt.value, ...u.availableLabels || []]);
      for (const i of u.state.labels || []) W.add(i);
      return Array.from(W);
    }), it = st(() => {
      const W = f.value.trim().toLowerCase();
      return W ? tt.value.filter((i) => i.toLowerCase().includes(W)) : tt.value;
    });
    function vt() {
      const W = f.value.trim();
      W && (p("createLabel", W), f.value = "");
    }
    function J(W, i) {
      Se.open(W, i);
    }
    const ft = P(0);
    function pt() {
      ft.value++;
    }
    Xt(() => {
      window.addEventListener("storage", pt), window.addEventListener("todoist-repository-links-changed", pt);
    }), Et(() => {
      window.removeEventListener("storage", pt), window.removeEventListener("todoist-repository-links-changed", pt);
    });
    const Vt = st(() => (ft.value, Ye(u.state.taskId, u.editDescription)));
    function zt(W) {
      Ge.open(W);
    }
    function Bt(W, i) {
      if (!W) return "";
      try {
        const v = W.split("-"), G = parseInt(v[1], 10), xt = parseInt(v[2], 10), Pt = i ? ` ${i}` : "";
        return `${G}月${xt}日${Pt}`;
      } catch {
        return W;
      }
    }
    function Jt(W) {
      if (!W) return "";
      try {
        const i = new Date(W);
        return `${i.getMonth() + 1}月${i.getDate()}日 ${String(i.getHours()).padStart(2, "0")}:${String(i.getMinutes()).padStart(2, "0")}`;
      } catch {
        return W;
      }
    }
    function Zt(W) {
      if (!W) return "刚刚";
      try {
        const i = new Date(W);
        return `${i.getMonth() + 1}月${i.getDate()}日 ${String(i.getHours()).padStart(2, "0")}:${String(i.getMinutes()).padStart(2, "0")}`;
      } catch {
        return W;
      }
    }
    return (W, i) => n.state.isOpen ? (a(), d("div", wi, [
      t("main", hi, [
        n.state.error ? (a(), d("p", Ti, x(n.state.error), 1)) : _("", !0),
        Vt.value.length ? (a(), d("div", Di, [
          (a(!0), d(ot, null, dt(Vt.value, (v) => (a(), d("button", {
            key: v.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: "关联 GitHub 仓库：" + v.fullName + " · 点击在插件内查看详情",
            onClick: (G) => zt(v.fullName)
          }, [
            i[38] || (i[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", xi, x(v.fullName), 1),
            i[39] || (i[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, Ci))), 128))
        ])) : _("", !0),
        t("section", $i, [
          t("div", Si, [
            t("button", {
              type: "button",
              class: X(["task-complete-circle-btn", { completed: n.isTaskCompleted }]),
              title: "标记完成/撤销",
              onClick: i[0] || (i[0] = (v) => p("toggleComplete"))
            }, [
              n.isTaskCompleted ? (a(), d("span", Ii, "✓")) : _("", !0)
            ], 2),
            t("textarea", {
              value: n.editTitle,
              rows: "1",
              "aria-label": "任务标题",
              onVnodeMounted: U,
              onVnodeUpdated: U,
              disabled: n.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: O,
              class: X(["inspector-input-title", { "title-done": n.isTaskCompleted }]),
              placeholder: "任务标题",
              onInput: i[1] || (i[1] = (v) => {
                z(v.target), p("update:editTitle", v.target.value), p("scheduleDraftSave", v);
              }),
              onCompositionend: i[2] || (i[2] = (v) => p("scheduleDraftSave", v)),
              onBlur: i[3] || (i[3] = (v) => p("saveTitleAndDesc", v)),
              onKeydown: i[4] || (i[4] = Ct(N((v) => p("saveTitleAndDesc", v), ["prevent"]), ["enter"]))
            }, null, 42, _i)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: i[7] || (i[7] = N((v) => p("dragover"), ["prevent"])),
          onDragleave: i[8] || (i[8] = N((v) => p("dragleave"), ["prevent"])),
          onDrop: i[9] || (i[9] = N((v) => p("dropImage", v), ["prevent"]))
        }, [
          $.value ? (a(), d("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: r,
            value: n.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: "描述",
            disabled: n.isUploadingImg,
            onInput: B,
            onCompositionend: i[5] || (i[5] = (v) => p("scheduleDraftSave", v)),
            onBlur: j,
            onPaste: i[6] || (i[6] = (v) => p("descPaste", v))
          }, null, 40, Ri)) : (a(), d("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: H,
            onKeydown: Ct(N(H, ["prevent"]), ["enter"])
          }, [
            n.editDescription ? (a(), d("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: M.value
            }, null, 8, Oi)) : (a(), d("span", Pi, "≡ 描述"))
          ], 40, Li)),
          n.isUploadingImg ? (a(), d("small", Ai, "图片上传中…")) : _("", !0),
          n.attachedImages.length ? (a(), d("div", Mi, [
            (a(!0), d(ot, null, dt(n.attachedImages, (v) => (a(), d("div", {
              key: v.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (G) => J(v.url, v.name)
              }, [
                t("img", {
                  src: v.url,
                  alt: v.name,
                  loading: "lazy"
                }, null, 8, Ei)
              ], 8, ji),
              t("div", Wi, [
                t("span", null, x(v.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (G) => p("removeAttachedImage", v.url)
                }, "×", 8, Ui)
              ])
            ]))), 128))
          ])) : _("", !0)
        ], 32),
        t("section", zi, [
          n.subtasks.length > 0 ? (a(), d("div", Bi, [
            (a(!0), d(ot, null, dt(n.subtasks, (v) => (a(), d("div", {
              key: v.id,
              class: X(["subtask-row-item", { done: v.completed }])
            }, [
              t("button", {
                type: "button",
                class: X(["subtask-check-circle", { checked: v.completed }]),
                onClick: (G) => p("toggleSubtask", v.id)
              }, [
                v.completed ? (a(), d("span", Ni, "✓")) : _("", !0)
              ], 10, Ki),
              t("span", Hi, x(v.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: "删除子任务",
                onClick: (G) => p("removeSubtask", v.id)
              }, "×", 8, Vi)
            ], 2))), 128))
          ])) : _("", !0),
          n.isAddingSubtask ? (a(), d("div", Fi, [
            t("input", {
              value: n.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: "输入子任务并回车…",
              onInput: i[10] || (i[10] = (v) => p("update:newSubtaskText", v.target.value)),
              onKeydown: [
                i[11] || (i[11] = Ct(N((v) => p("confirmAddSubtask"), ["prevent"]), ["enter"])),
                i[12] || (i[12] = Ct((v) => p("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Yi),
            t("div", Gi, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: i[13] || (i[13] = (v) => p("confirmAddSubtask"))
              }, "添加"),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: i[14] || (i[14] = (v) => p("update:isAddingSubtask", !1))
              }, "取消")
            ])
          ])) : (a(), d("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: i[15] || (i[15] = (v) => p("update:isAddingSubtask", !0))
          }, [...i[40] || (i[40] = [
            t("span", { class: "subtask-plus-icon" }, "＋", -1),
            jt(" 添加子任务 ", -1)
          ])]))
        ]),
        (a(), Lt(Io, {
          key: n.state.taskId,
          "task-id": n.state.taskId
        }, null, 8, ["task-id"])),
        t("section", qi, [
          t("div", Xi, [
            i[41] || (i[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Qi, [
              t("input", {
                value: n.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: "评论…",
                disabled: n.isSubmittingComment,
                onInput: i[16] || (i[16] = (v) => p("update:newCommentText", v.target.value)),
                onKeydown: i[17] || (i[17] = Ct(N((v) => p("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Ji),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: "上传照片附件",
                onClick: i[18] || (i[18] = N((v) => p("triggerFileInput"), ["stop"]))
              }, "📎")
            ]),
            n.newCommentText.trim() ? (a(), d("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: n.isSubmittingComment,
              onClick: i[19] || (i[19] = (v) => p("submitComment"))
            }, "发送", 8, Zi)) : _("", !0)
          ]),
          n.state.comments.length > 0 ? (a(), d("div", ta, [
            (a(!0), d(ot, null, dt(n.state.comments, (v) => (a(), d("div", {
              key: v.id,
              class: "comment-item"
            }, [
              i[43] || (i[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", ea, [
                t("div", oa, [
                  i[42] || (i[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", sa, x(Zt(v.postedAt)), 1)
                ]),
                t("div", na, x(v.content), 1),
                v.attachment?.url ? (a(), d("div", ia, [
                  t("img", {
                    src: v.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (G) => J(v.attachment.url, v.attachment.name)
                  }, null, 8, aa)
                ])) : _("", !0)
              ])
            ]))), 128))
          ])) : _("", !0)
        ])
      ]),
      t("aside", la, [
        t("div", ra, [
          i[45] || (i[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: k,
            type: "button",
            class: X(["side-item-row click-row", { active: y.value, filled: !!n.editStartDate }]),
            onClick: i[21] || (i[21] = (v) => y.value = !y.value)
          }, [
            i[44] || (i[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", da, x(Bt(n.editStartDate, n.editStartTime) || "安排日期"), 1),
            n.editStartDate ? (a(), d("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: i[20] || (i[20] = N((v) => p("clearStartDate"), ["stop"]))
            }, "×")) : _("", !0)
          ], 2),
          y.value ? (a(), Lt($e, {
            key: 0,
            "model-value": n.editStartDate,
            "time-value": n.editStartTime,
            "anchor-el": k.value,
            "onUpdate:modelValue": i[22] || (i[22] = (v) => p("update:editStartDate", v)),
            "onUpdate:timeValue": i[23] || (i[23] = (v) => p("update:editStartTime", v)),
            onChange: i[24] || (i[24] = (v) => p("startChange")),
            onClose: i[25] || (i[25] = (v) => y.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", ua, [
          i[47] || (i[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: w,
            type: "button",
            class: X(["side-item-row click-row", { active: L.value, filled: !!n.editDueDate }]),
            onClick: i[27] || (i[27] = (v) => L.value = !L.value)
          }, [
            i[46] || (i[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", ca, x(Bt(n.editDueDate, n.editDueTime) || "设定截止"), 1),
            n.editDueDate ? (a(), d("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除截止时间",
              onClick: i[26] || (i[26] = N((v) => p("clearDueDate"), ["stop"]))
            }, "×")) : _("", !0)
          ], 2),
          L.value ? (a(), Lt($e, {
            key: 0,
            "model-value": n.editDueDate,
            "time-value": n.editDueTime,
            "anchor-el": w.value,
            "onUpdate:modelValue": i[28] || (i[28] = (v) => p("update:editDueDate", v)),
            "onUpdate:timeValue": i[29] || (i[29] = (v) => p("update:editDueTime", v)),
            onChange: i[30] || (i[30] = (v) => p("dueChange")),
            onClose: i[31] || (i[31] = (v) => L.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", pa, [
          i[49] || (i[49] = t("span", { class: "side-prop-label" }, "优先级", -1)),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: ct,
            type: "button",
            class: "side-item-row",
            onClick: i[32] || (i[32] = (v) => T.value = !0)
          }, [
            t("span", {
              style: Tt({ color: V(n.state.priority) })
            }, "⚑", 4),
            t("span", ma, "P" + x(5 - n.state.priority), 1),
            i[48] || (i[48] = t("span", null, "⌄", -1))
          ], 512),
          T.value ? (a(), Lt(xe, {
            key: 0,
            anchor: ct.value,
            onClose: i[33] || (i[33] = (v) => T.value = !1)
          }, {
            default: ne(() => [
              t("div", va, [
                (a(), d(ot, null, dt(A, (v) => t("button", {
                  key: v.level,
                  type: "button",
                  disabled: !!c(q).pendingWrites,
                  onClick: (G) => Z(v.level)
                }, [
                  t("span", {
                    style: Tt({ color: v.color })
                  }, "⚑", 4),
                  jt(" " + x(v.name) + " ", 1),
                  n.state.priority === v.level ? (a(), d("span", ga, "✓")) : _("", !0)
                ], 8, fa)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", ba, [
          i[51] || (i[51] = t("span", { class: "side-prop-label" }, "标签", -1)),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: lt,
            type: "button",
            class: "side-item-row",
            onClick: i[34] || (i[34] = (v) => K.value = !0)
          }, [
            t("span", ka, x(n.state.labels.join("、") || "添加标签"), 1),
            i[50] || (i[50] = t("span", null, "＋", -1))
          ], 512),
          K.value ? (a(), Lt(xe, {
            key: 0,
            anchor: lt.value,
            onClose: i[36] || (i[36] = (v) => K.value = !1)
          }, {
            default: ne(() => [
              t("div", ya, [
                Rt(t("input", {
                  "onUpdate:modelValue": i[35] || (i[35] = (v) => f.value = v),
                  placeholder: "搜索或新建标签",
                  "aria-label": "搜索标签",
                  onKeydown: Ct(N(vt, ["prevent"]), ["enter"])
                }, null, 40, wa), [
                  [Nt, f.value]
                ]),
                yt.value ? (a(), d("small", ha, "读取标签中…")) : _("", !0),
                C.value ? (a(), d("p", Ta, x(C.value), 1)) : _("", !0),
                t("div", Da, [
                  (a(!0), d(ot, null, dt(it.value, (v) => (a(), d("label", {
                    key: v,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + x(v), 1),
                    t("input", {
                      type: "checkbox",
                      checked: n.state.labels.includes(v),
                      disabled: !!c(q).pendingWrites,
                      onChange: (G) => p("toggleLabelSelect", v)
                    }, null, 40, Ca)
                  ]))), 128))
                ]),
                f.value.trim() && !tt.value.includes(f.value.trim()) ? (a(), d("button", {
                  key: 2,
                  type: "button",
                  disabled: !!c(q).pendingWrites,
                  onClick: vt
                }, "＋ 创建“" + x(f.value.trim()) + "”", 9, xa)) : _("", !0),
                !yt.value && !it.value.length && !f.value ? (a(), d("small", $a, "暂无标签")) : _("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", Sa, [
          i[53] || (i[53] = t("span", { class: "side-prop-label" }, [
            jt("提醒 "),
            t("small", null, "本机")
          ], -1)),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: nt,
            type: "button",
            class: "side-item-row",
            onClick: I
          }, [
            t("span", Ia, x(Jt(n.state.reminderTime) || "添加提醒"), 1),
            i[52] || (i[52] = t("span", null, "＋", -1))
          ], 512),
          D.value ? (a(), Lt(yi, {
            key: 0,
            anchor: nt.value,
            "task-id": n.state.taskId,
            value: n.state.reminderTime,
            "task-date": n.editStartDate || n.editDueDate,
            "task-time": n.editStartTime || n.editDueTime,
            onClose: i[37] || (i[37] = (v) => D.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : _("", !0)
        ])
      ])
    ])) : _("", !0);
  }
}), Ra = /* @__PURE__ */ Qt(_a, [["__scopeId", "data-v-3b157130"]]), La = { class: "inspector-title-row" }, Pa = ["title", "aria-label"], Oa = ["disabled"], Aa = ["href"], Ma = "todoistInspectorPositionV2", ja = /* @__PURE__ */ Ut({
  __name: "TodoistInspectorDrawer",
  setup(n) {
    const e = b, u = st(() => _t.get(e.taskId)), p = st(() => u.value?.status === "failed" ? "保存未确认" : u.value?.status === "saving" ? "正在保存…" : z.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), $ = st(() => [
      p.value,
      u.value?.status === "failed" ? u.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: r,
      headerRef: O,
      initialStyle: S,
      onHeaderPointerDown: M,
      onResizePointerDown: H
    } = Ve({
      windowId: "todoist-inspector",
      storageKey: Ma,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => e.isOpen && q.active
    }), z = P(""), U = P(""), B = P(""), j = P(""), y = P(""), L = P(""), k = P(!1), w = P(!1), T = P(null), K = P(!1), D = P(""), f = P(""), lt = P(!1), nt = st(() => {
      const h = e.description || "", g = [], R = h.split(`
`);
      let ut = 0;
      for (const wt of R) {
        const gt = wt.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        gt && g.push({
          id: `st_${ut++}`,
          completed: gt[1].toLowerCase() === "x",
          text: gt[2].trim()
        });
      }
      return g;
    }), ct = st(() => nt.value.filter((h) => h.completed).length);
    function Dt(h) {
      const ut = (e.description || "").split(`
`).filter((Kt) => !Kt.match(/^\s*-\s*\[([ xX])\]/)), wt = h.map((Kt) => `- [${Kt.completed ? "x" : " "}] ${Kt.text}`), gt = [...ut, ...wt].join(`
`).trim();
      U.value = gt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), at.saveTitleAndDesc(z.value, gt);
    }
    function yt() {
      if (!D.value.trim()) return;
      const h = [...nt.value, {
        id: `st_${Date.now()}`,
        text: D.value.trim(),
        completed: !1
      }];
      D.value = "", K.value = !1, Dt(h);
    }
    function C(h) {
      const g = nt.value.map((R) => R.id === h ? { ...R, completed: !R.completed } : R);
      Dt(g);
    }
    function E(h) {
      const g = nt.value.filter((R) => R.id !== h);
      Dt(g);
    }
    const I = st(() => {
      for (const h of kt.columns || []) {
        const g = h.tasks.find((R) => R.id === e.taskId);
        if (g) return !!g.completed;
      }
      return !1;
    });
    async function A() {
      for (const h of kt.columns || []) {
        const g = h.tasks.find((R) => R.id === e.taskId);
        if (g) {
          const R = !g.completed;
          g.completed = R, g._taskRaw && (g._taskRaw.checked = R);
          try {
            await et.toggleTaskCompletion(g.id, R);
          } catch {
            g.completed = !R, g._taskRaw && (g._taskRaw.checked = !R), e.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function V(h) {
      at.setPriority(h);
    }
    function Z(h) {
      at.toggleLabel(h);
    }
    function tt(h) {
      at.toggleLabel(h);
    }
    async function it(h) {
      h.trim() && (e.labels.includes(h.trim()) || await at.createAndAttachLabel(h.trim()));
    }
    async function vt() {
      if (!f.value.trim() || lt.value) return;
      const h = f.value.trim();
      lt.value = !0;
      try {
        await at.addComment(h), f.value = "";
      } finally {
        lt.value = !1;
      }
    }
    rt(() => e.title, (h) => {
      z.value = h || "";
    }, { immediate: !0 }), rt(() => e.description, (h) => {
      U.value = (h || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), rt(() => e.startDate, (h) => {
      B.value = h || "";
    }, { immediate: !0 }), rt(() => e.startTime, (h) => {
      j.value = h || "";
    }, { immediate: !0 }), rt(() => e.dueDate, (h) => {
      y.value = h || "";
    }, { immediate: !0 }), rt(() => e.dueTime, (h) => {
      L.value = h || "";
    }, { immediate: !0 });
    function J() {
      const h = /* @__PURE__ */ new Date();
      return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`;
    }
    function ft() {
      j.value && !B.value && (B.value = J()), at.setStartDateAndTime(B.value, j.value);
    }
    function pt() {
      j.value = "", ft();
    }
    function Vt() {
      B.value = "", j.value = "", ft();
    }
    function zt() {
      L.value && !y.value && (y.value = J()), at.setDueDateAndTime(y.value, L.value);
    }
    function Bt() {
      L.value = "", zt();
    }
    function Jt() {
      y.value = "", L.value = "", zt();
    }
    const Zt = st(() => {
      const h = [], g = /* @__PURE__ */ new Set(), R = e.description || "", ut = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let wt;
      for (; (wt = ut.exec(R)) !== null; ) {
        const gt = wt[2];
        g.add(gt), h.push({
          name: wt[1] || "任务照片",
          url: gt
        });
      }
      for (const gt of e.commentAttachments || [])
        g.has(gt.url) || (g.add(gt.url), h.push(gt));
      return h;
    });
    let W, i;
    function v() {
      const h = (e.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), g = [U.value.trim(), h].filter(Boolean);
      return {
        taskId: e.taskId,
        title: z.value,
        description: g.join(`

`)
      };
    }
    function G() {
      clearTimeout(W), W = void 0;
      const h = i;
      if (i = void 0, h?.taskId && h.title.trim())
        return at.saveTitleAndDesc(h.title, h.description, h.taskId);
    }
    function xt(h) {
      h && "isComposing" in h && h.isComposing || (i = v(), at.stageTitleDraft(i.taskId, i.title, i.description), clearTimeout(W), W = setTimeout(G, 800));
    }
    rt(() => e.taskId, () => G(), { flush: "sync" });
    function Pt() {
      G(), at.close();
    }
    function te(h) {
      h && "isComposing" in h && h.isComposing || G();
    }
    function ve() {
      i = v(), G();
    }
    function fe(h) {
      const g = $t(h);
      g && (h.preventDefault(), h.stopPropagation(), Wt(g));
    }
    function ge() {
      q.active && T.value?.click();
    }
    async function ae(h) {
      const g = h.target;
      if (!q.active) {
        g.value = "";
        return;
      }
      const R = g.files?.[0];
      R && await Wt(R), g.value = "";
    }
    async function ee(h) {
      w.value = !1;
      const g = h.dataTransfer?.files?.[0];
      g && (g.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(g.name)) && await Wt(g);
    }
    function $t(h) {
      const g = h.clipboardData;
      if (!g) return null;
      if (g.files && g.files.length > 0)
        for (let R = 0; R < g.files.length; R++) {
          const ut = g.files[R];
          if (ut.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(ut.name))
            return ut;
        }
      if (g.items && g.items.length > 0)
        for (let R = 0; R < g.items.length; R++) {
          const ut = g.items[R];
          if (ut.type.includes("image")) {
            const wt = ut.getAsFile();
            if (wt) return wt;
          }
        }
      return null;
    }
    async function Wt(h) {
      if (k.value || !q.active || !e.taskId) return;
      const g = e.taskId;
      k.value = !0;
      try {
        if (await G(), e.taskId !== g || !e.isOpen || !q.active) return;
        await at.attachImageToTask(h);
      } catch (R) {
        e.taskId === g && (e.error = R instanceof Error ? R.message : "上传失败");
      } finally {
        k.value = !1;
      }
    }
    function le(h) {
      const g = $t(h);
      g && (h.preventDefault(), Wt(g));
    }
    function Ft(h) {
      if (!e.isOpen || !q.active) return;
      const g = $t(h);
      g && (h.preventDefault(), h.stopPropagation(), Wt(g));
    }
    rt(() => q.active, (h) => {
      window.removeEventListener("paste", Ft, { capture: !0 }), h && window.addEventListener("paste", Ft, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Et(() => {
      G(), window.removeEventListener("paste", Ft, { capture: !0 });
    });
    async function oe(h) {
      const g = e.description || "", R = h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ut = g.replace(new RegExp(`!\\[[^\\]]*\\]\\(${R}\\)`, "g"), "").trim();
      await at.saveTitleAndDesc(e.title, ut);
    }
    return (h, g) => Rt((a(), d("aside", {
      ref_key: "panelRef",
      ref: r,
      class: "todoist-inspector-window",
      style: Tt(c(S)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: le
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: O,
        class: "inspector-header",
        onPointerdown: g[2] || (g[2] = (R) => c(M)(R))
      }, [
        t("div", La, [
          g[18] || (g[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          u.value ? (a(), d("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: g[0] || (g[0] = N(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: $.value,
              "aria-label": $.value
            }, x(p.value), 9, Pa),
            u.value.status !== "saving" ? (a(), d("button", {
              key: 0,
              type: "button",
              disabled: c(e).saving || !z.value.trim(),
              onClick: N(ve, ["stop"])
            }, x(u.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Oa)) : _("", !0)
          ], 32)) : _("", !0),
          c(e).url ? (a(), d("a", {
            key: 1,
            href: c(e).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Aa)) : _("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: g[1] || (g[1] = N(() => {
          }, ["stop"])),
          onClick: N(Pt, ["stop"])
        }, "×", 32)
      ], 544),
      c(e).isOpen ? (a(), Lt(Ra, {
        key: c(e).taskId,
        state: c(e),
        "edit-title": z.value,
        "onUpdate:editTitle": g[3] || (g[3] = (R) => z.value = R),
        "edit-description": U.value,
        "onUpdate:editDescription": g[4] || (g[4] = (R) => U.value = R),
        "edit-start-date": B.value,
        "onUpdate:editStartDate": g[5] || (g[5] = (R) => B.value = R),
        "edit-start-time": j.value,
        "onUpdate:editStartTime": g[6] || (g[6] = (R) => j.value = R),
        "edit-due-date": y.value,
        "onUpdate:editDueDate": g[7] || (g[7] = (R) => y.value = R),
        "edit-due-time": L.value,
        "onUpdate:editDueTime": g[8] || (g[8] = (R) => L.value = R),
        "is-uploading-img": k.value,
        "is-drag-over": w.value,
        "is-task-completed": I.value,
        subtasks: nt.value,
        "completed-subtasks-count": ct.value,
        "is-adding-subtask": K.value,
        "onUpdate:isAddingSubtask": g[9] || (g[9] = (R) => K.value = R),
        "new-subtask-text": D.value,
        "onUpdate:newSubtaskText": g[10] || (g[10] = (R) => D.value = R),
        "new-comment-text": f.value,
        "onUpdate:newCommentText": g[11] || (g[11] = (R) => f.value = R),
        "is-submitting-comment": lt.value,
        "attached-images": Zt.value,
        "available-labels": c(kt).availableLabels || [],
        onScheduleDraftSave: xt,
        onSaveTitleAndDesc: te,
        onToggleComplete: A,
        onTriggerFileInput: ge,
        onDragover: g[12] || (g[12] = (R) => w.value = !0),
        onDragleave: g[13] || (g[13] = (R) => w.value = !1),
        onDropImage: ee,
        onDescPaste: fe,
        onRemoveAttachedImage: oe,
        onToggleSubtask: C,
        onRemoveSubtask: E,
        onConfirmAddSubtask: yt,
        onSubmitComment: vt,
        onStartChange: ft,
        onClearStartDate: Vt,
        onClearStartTime: pt,
        onDueChange: zt,
        onClearDueDate: Jt,
        onClearDueTime: Bt,
        onSelectPriority: V,
        onToggleLabelSelect: Z,
        onRemoveLabel: tt,
        onCreateLabel: it
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : _("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: T,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ae
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: g[14] || (g[14] = (R) => c(H)(R, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: g[15] || (g[15] = (R) => c(H)(R, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: g[16] || (g[16] = (R) => c(H)(R, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: g[17] || (g[17] = (R) => c(H)(R, "w"))
      }, null, 32)
    ], 36)), [
      [Ce, c(e).isOpen]
    ]);
  }
}), Ea = /* @__PURE__ */ Qt(ja, [["__scopeId", "data-v-35222deb"]]), Wa = { class: "vue-todoist-workspace-wrapper" }, Ua = { class: "todoist-head-title-wrap" }, za = { id: "todoist-workspace-title" }, Ba = {
  id: "todoist-view-tabs",
  class: "todoist-view-tabs",
  "aria-label": "Todoist 视图"
}, Ka = {
  class: "muted small",
  role: "status"
}, Na = ["aria-expanded"], Ha = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Va = { class: "todoist-workspace-cal-area" }, Fa = { class: "todoist-workspace-task-area" }, Ya = "todoistWorkspacePosition", rl = /* @__PURE__ */ Ut({
  __name: "TodoistWorkspace",
  setup(n) {
    const e = P(!1), u = po(() => import("./TodoistAccountSettings-Duun8Ppa.js")), p = P(!1), $ = P(!1), r = P(!document.hidden), O = P(!1), S = st(() => q.visible && r.value);
    q.session++, q.active = S.value, Fe(
      () => S.value && !kt.movingTaskId,
      qt,
      () => Q.loadWorkspace(void 0, void 0, !0)
    );
    let M = !1;
    const H = P(null), z = ho;
    function U() {
      B.value && (B.value.style.removeProperty("width"), B.value.style.removeProperty("height"), B.value.style.removeProperty("left"), B.value.style.removeProperty("top"), B.value.style.removeProperty("right"), B.value.style.removeProperty("bottom"), B.value.style.removeProperty("margin"), B.value.style.removeProperty("transform"));
    }
    rt(() => q.visible, (I) => {
      I && (z.isOpen = !0, q.active = r.value, Q.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: B,
      headerRef: j,
      initialStyle: y,
      stopInteractions: L,
      onHeaderPointerDown: k,
      onResizePointerDown: w,
      bringToFront: T
    } = Ve({
      windowId: "todoist",
      storageKey: Ya,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => S.value
    }), K = () => B.value;
    function D() {
      qt(), yo(), wo(), at.cancelReads(), L(), window.removeEventListener("keydown", nt);
    }
    const f = fo(D);
    function lt() {
      r.value = !document.hidden;
    }
    function nt(I) {
      I.key === "Escape" && b.isOpen && (I.preventDefault(), I.stopPropagation(), at.close());
    }
    rt(S, (I) => {
      q.active = I, I ? (window.addEventListener("keydown", nt), M || (M = !0, Q.loadWorkspace()), St(() => {
        S.value && T();
      })) : D();
    }, { flush: "sync" }), rt(p, (I) => {
      I && ($.value = !0);
    }), rt([S, e, Ue], ([I, A, V]) => {
      if (!(!I || !A || !V) && (Ue.value = null, To("todoist") === V.transition)) {
        if (q.pendingWrites || b.isOpen && b.taskId !== V.id) {
          Co.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        b.isOpen && b.taskId === V.id || at.openTask(V.id);
      }
    }, { flush: "post" }), Xt(() => {
      e.value = !0, O.value && St(U), ue.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: K }), document.addEventListener("visibilitychange", lt), S.value && (window.addEventListener("keydown", nt), M || (M = !0, Q.loadWorkspace()), Ee.refresh());
    }), Et(() => {
      go(), f(), document.removeEventListener("visibilitychange", lt), ue.unregister("todoist", K), at.close(), Object.assign(b, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), Q.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), he.updateState({ title: "收件箱", isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ee.update([]);
    });
    function ct() {
      he.toggleCalendar();
    }
    function Dt() {
      he.refresh();
    }
    function yt() {
      Q.updateState({ accountConfigured: !0 }), S.value && Q.loadWorkspace(void 0, void 0, !0);
    }
    function C() {
      ue.minimize("todoist");
    }
    function E() {
      q.visible = !1, z.isOpen = !1, ue.close("todoist");
    }
    return (I, A) => (a(), d("div", Wa, [
      Rt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: B,
        class: "card wide todoist-workspace",
        style: Tt(c(y)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: j,
          class: "todoist-workspace-head",
          onPointerdown: A[4] || (A[4] = (V) => c(k)(V))
        }, [
          t("div", Ua, [
            A[10] || (A[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", za, x(c(z).title), 1)
          ]),
          t("nav", Ba, [
            Gt(Ro)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: X(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: c(z).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: ct
          }, " 📅 日历 ", 2),
          A[11] || (A[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Ka, x(c(q).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: H,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": p.value,
            onClick: A[0] || (A[0] = N((V) => p.value = !p.value, ["stop"]))
          }, " ⚙️ ", 8, Na),
          $.value ? (a(), Lt(c(u), {
            key: 0,
            visible: S.value && p.value,
            anchor: H.value,
            onClose: A[1] || (A[1] = (V) => p.value = !1),
            onAccountSaved: yt
          }, null, 8, ["visible", "anchor"])) : _("", !0),
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
            onPointerdown: A[2] || (A[2] = N(() => {
            }, ["stop"])),
            onClick: N(C, ["stop"])
          }, " − ", 32),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: "隐藏窗口 (Esc)；Dock 退出释放窗口资源",
            onPointerdown: A[3] || (A[3] = N(() => {
            }, ["stop"])),
            onClick: N(E, ["stop"])
          }, " ✕ ", 32)
        ], 544),
        c(kt).accountConfigured === !1 ? (a(), Lt(Do, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: A[5] || (A[5] = (V) => p.value = !0)
        })) : (a(), d("div", Ha, [
          Rt(t("div", Va, [
            Gt(ms)
          ], 512), [
            [Ce, c(z).isCalendarOpen]
          ]),
          t("div", Fa, [
            Gt(di)
          ])
        ])),
        Gt(Ea),
        A[12] || (A[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        O.value ? _("", !0) : (a(), d(ot, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: A[6] || (A[6] = (V) => c(w)(V, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: A[7] || (A[7] = (V) => c(w)(V, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: A[8] || (A[8] = (V) => c(w)(V, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: A[9] || (A[9] = (V) => c(w)(V, "w"))
          }, null, 32)
        ], 64))
      ], 4), [
        [Ce, c(q).visible]
      ])
    ]));
  }
});
export {
  rl as default
};
