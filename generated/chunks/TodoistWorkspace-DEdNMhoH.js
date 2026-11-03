import { d as Ut, o as l, f as d, F as nt, g as t, u as p, C as q, r as Gt, z as jt, y as dt, D as Jt, n as Et, t as C, i as ut, j as N, h as R, b as P, O as Xe, J as We, B as ft, x as st, H as Rt, m as Pt, p as Nt, E as qt, w as ae, l as xt, e as Mt, A as Se, G as vo } from "./vendor-vue-wIH4jcna.js";
import { a as fo, t as G, w as go, o as bo, p as ko } from "./module-state-BmW4SrQd.js";
import { b as Ue, h as ze, i as Qt, j as yt, e as Q, d as vt, c as yo, k as wo, t as Be, g as xe, l as ho, m as To, n as Do } from "./calendar.service-_YumC_hP.js";
import { u as Ge } from "./useWindowDraggable-CUOTL3np.js";
import { w as me, b as xo } from "./window-manager.store-DgNn9Rtk.js";
import { A as Co } from "./AccountSetupGuide-TNciZwtl.js";
import { i as _e } from "./image-viewer-store-7hQiFIcW.js";
import { n as $o } from "./view-styles-o3bzKLlw.js";
import { t as ot, d as So, s as Io, b as ve, g as He, f as Ce, p as Ro } from "./todoist.service-BwvB2mGP.js";
import { u as qe, g as Qe, I as Ie, T as Re, a as _o } from "./TodoistDatePickerPopover-Bc07IbMy.js";
import { _ as Zt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { A as Je } from "./search.service-B8FaDQLd.js";
import { m as Lo } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Ke } from "./task-navigation-CFuqS02f.js";
const Po = /* @__PURE__ */ Ut({
  __name: "TodoistWorkspaceTabs",
  setup(i) {
    return (n, u) => (l(), d(nt, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: q({ on: p(ze).view === "inbox" }),
        title: "收件箱",
        onClick: u[0] || (u[0] = (m) => p(Ue).switchView("inbox"))
      }, [...u[2] || (u[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: q({ on: p(ze).view === "projects" }),
        title: "项目",
        onClick: u[1] || (u[1] = (m) => p(Ue).switchView("projects"))
      }, [...u[3] || (u[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), Ze = "todoist_reminder_v2:", Mo = "todoist_remind_";
async function Oo(i) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const n = Ze + i, u = await chrome.storage.local.get([n, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(u, n) ? u[n] || void 0 : u.todoist_reminders_map_v1?.[i];
}
async function Ao(i, n, u) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const m = new Date(n).getTime();
  if (n && (!Number.isFinite(m) || m <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (n && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const $ = Ze + i, r = Mo + i;
  await chrome.alarms.clear(r), await chrome.storage.local.set({ [$]: n ? { time: n, title: u } : null }), n && await chrome.alarms.create(r, { when: m });
}
const Lt = Gt(/* @__PURE__ */ new Map());
let Eo = 0;
function Ne(i, n, u, m = "editing") {
  const $ = ++Eo;
  return Lt.set(i, { revision: $, title: n, description: u, status: m, error: "" }), $;
}
const b = Gt({
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
let $e = Promise.resolve(), fe = 0, Ve = Promise.resolve();
const ge = /* @__PURE__ */ new Map();
let le = 0;
const Vt = /* @__PURE__ */ new Map();
function ie(i = !0) {
  i && le++;
  for (const n of Vt.values()) n.abort();
  Vt.clear(), b.loading = !1;
}
function Fe(i) {
  Vt.get(i)?.abort();
  const n = new AbortController();
  Vt.set(i, n);
  const u = le, m = b.taskId;
  return {
    signal: n.signal,
    current: () => !n.signal.aborted && u === le && b.isOpen && m === b.taskId && Vt.get(i) === n,
    finish: () => {
      Vt.get(i) === n && Vt.delete(i);
    }
  };
}
function At() {
  ie(!1);
  const i = b.taskId, n = le;
  return { taskId: i, current: () => b.isOpen && n === le && i === b.taskId };
}
function jo(i) {
  return new Promise((n) => {
    const u = new FileReader();
    u.onload = () => n(u.result || ""), u.onerror = () => n(""), u.readAsDataURL(i);
  });
}
function Ye(i, n, u) {
  for (const m of yt.columns)
    for (const $ of m.tasks)
      String($.id) === i && ($.content = n, u !== void 0 && ($.description = u), $._taskRaw && ($._taskRaw.content = n, u !== void 0 && ($._taskRaw.description = u)));
  vt.updateTaskTitle(i, n);
}
const Wo = {
  state: b,
  cancelReads: ie,
  stageTitleDraft(i, n, u) {
    i && (Ne(i, n, u), ie(!1), b.taskId === i && (b.title = n), Ye(i, n, u));
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
      const r = ve(n.due?.datetime || n.due?.date || n.dueDate || "");
      b.dueDate = r.date, b.dueTime = r.time;
      const O = n.startDate || He(i, b.description), S = ve(O);
      b.startDate = S.date, b.startTime = S.time, b.labels = [...n.labels || []], b.url = n.url || "";
    }
    const u = Lt.get(i);
    u && (b.title = u.title, b.description = u.description);
    const m = Fe("reminder");
    Oo(i).then((r) => {
      m.current() && (b.reminderTime = r?.time || "");
    }).catch(() => {
      m.current() && (b.error = "本机提醒读取失败。");
    }).finally(m.finish);
    const $ = Fe("detail");
    b.loading = !0;
    try {
      const r = await ot.api(`/tasks/${encodeURIComponent(i)}`, { signal: $.signal });
      if (r && $.current()) {
        const O = Lt.get(i);
        b.title = O?.title ?? r.content ?? "", b.description = O?.description ?? r.description ?? "", b.priority = r.priority || 1;
        const S = ve(r.due?.datetime || r.due?.date || "");
        b.dueDate = S.date, b.dueTime = S.time;
        const E = He(i, r.description || b.description), V = ve(E);
        b.startDate = V.date, b.startTime = V.time, b.labels = [...r.labels || []], b.url = r.url || "";
        try {
          const B = await ot.getComments(i, $.signal);
          if (B && $.current()) {
            const z = [], H = [];
            for (const j of B) {
              let w;
              if (j?.attachment?.file_url) {
                const L = j.attachment.file_name || "附件图片";
                z.push({ name: L, url: j.attachment.file_url }), w = { name: L, url: j.attachment.file_url };
              }
              H.push({
                id: j.id,
                content: j.content || "",
                postedAt: j.posted_at || "",
                attachment: w
              });
            }
            if (b.commentAttachments = z, b.comments = H, z.length > 0 && b.description) {
              let j = b.description, w = !1;
              for (const L of z) {
                const y = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                y.test(j) && (j = j.replace(y, `$1${L.url}$2`), w = !0);
              }
              if (w && !Lt.has(i)) {
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
      $.current() && (b.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      $.current() && (b.loading = !1), $.finish();
    }
  },
  close() {
    ie(), b.isOpen = !1, b.taskId = "";
  },
  async setStartDateAndTime(i, n) {
    if (!b.taskId) return;
    const u = At(), m = i.trim(), $ = m ? n.trim() : "";
    b.startDate = m, b.startTime = $, Qt();
    const r = So(m, $);
    Io(u.taskId, r), ot.invalidateWorkspaceSnapshots();
    for (const O of yt.columns) {
      const S = O.tasks.find((E) => E.id === u.taskId);
      S && (S.startDate = r);
    }
  },
  async setDueDateAndTime(i, n) {
    if (!b.taskId) return;
    const u = At(), m = i.trim(), $ = m ? n.trim() : "";
    b.dueDate = m, b.dueTime = $, Qt(), ot.invalidateWorkspaceSnapshots();
    const r = (ge.get(u.taskId) || 0) + 1;
    ge.set(u.taskId, r);
    const O = Ve.then(async () => {
      try {
        const S = await ot.updateTask(u.taskId, {
          due_string: m ? $ ? `${m} ${$}` : m : "no date"
        });
        if (ge.get(u.taskId) !== r) return;
        const E = ot.mapTasks([S], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const V of yt.columns) {
          const B = V.tasks.findIndex((H) => H.id === u.taskId);
          if (B < 0) continue;
          const z = V.tasks[B];
          if (Object.assign(z, {
            dueDate: E.dueDate,
            dueText: E.dueText,
            dueString: E.dueString,
            isDueToday: E.isDueToday,
            isOverdue: E.isOverdue,
            isRecurring: E.isRecurring
          }), z._taskRaw && (z._taskRaw.due = S.due), yt.view === "today") {
            const H = E.isOverdue ? "overdue" : E.isDueToday ? "today" : "";
            H !== V.sectionId && (V.tasks.splice(B, 1), yt.columns.find((j) => j.sectionId === H)?.tasks.push(z));
          }
        }
        u.current() && (b.error = "");
      } catch {
        u.current() && ge.get(u.taskId) === r && (b.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Ve = O.catch(() => {
    }), await O;
  },
  async saveTitleAndDesc(i, n, u = b.taskId) {
    const m = u === b.taskId ? At() : { taskId: u, current: () => !1 };
    if (!m.taskId || !i.trim()) return;
    const $ = i.trim(), r = n.trim(), O = Ne(u, $, r, "saving");
    m.current() && (b.title = $, b.description = r), Ye(m.taskId, $, r), fe++, b.saving = !0;
    const S = $e.then(async () => {
      try {
        await ot.updateTask(m.taskId, {
          content: $,
          description: r
        }), Lt.get(u)?.revision === O && Lt.delete(u), fe === 1 && Lt.size === 0 && Q.dispatch("refresh");
      } catch (E) {
        const V = Lt.get(u);
        V?.revision === O && (V.status = "failed", V.error = E instanceof Error ? E.message : "保存未确认");
      } finally {
        fe--, b.saving = fe > 0;
      }
    });
    $e = S.catch(() => {
    }), await S;
  },
  async attachImageToTask(i) {
    const n = At();
    if (await $e, !n.current()) return;
    if (Lt.has(n.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const u = b.description || "";
    if (!n.taskId || b.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    b.saving = !0;
    try {
      const m = i.name || `截图_${Date.now()}.png`;
      let $ = "";
      try {
        const r = await ot.uploadFile(i, m);
        r && r.file_url && ($ = r.file_url);
      } catch (r) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", r), i.size <= 2.5 * 1024 * 1024)
          $ = await jo(i);
        else
          throw new Error(r?.message || "云端上传失败且文件超过2.5MB");
      }
      if ($) {
        const r = u ? `${u}

![${m}](${$})` : `![${m}](${$})`;
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
        Q.dispatch("refresh");
      }
    } catch (m) {
      n.current() && (b.error = m.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${m.message}`);
    } finally {
      b.saving = !1;
    }
  },
  async setPriority(i) {
    if (!b.taskId) return;
    const n = At();
    if (![1, 2, 3, 4].includes(i)) return;
    const u = b.priority;
    b.priority = i, Qt(), ot.invalidateWorkspaceSnapshots();
    try {
      await ot.updateTask(n.taskId, { priority: i });
      for (const m of yt.columns) {
        const $ = m.tasks.find((r) => r.id === n.taskId);
        $ && ($.priority = i, $._taskRaw && ($._taskRaw.priority = i));
      }
    } catch {
      n.current() && (b.priority = u, b.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(i) {
    if (!b.taskId) return;
    const n = At(), u = [...b.labels], $ = u.includes(i) ? u.filter((r) => r !== i) : [...u, i];
    b.labels = $, Qt(), ot.invalidateWorkspaceSnapshots();
    try {
      await ot.updateTask(n.taskId, { labels: $ });
      for (const r of yt.columns) {
        const O = r.tasks.find((S) => S.id === n.taskId);
        O && (O.labels = $, O._taskRaw && (O._taskRaw.labels = $));
      }
    } catch {
      n.current() && (b.labels = u, b.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(i) {
    const n = At();
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
    const n = At();
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
    const n = At();
    if (n.taskId)
      try {
        await Ao(n.taskId, i, b.title), n.current() && (b.reminderTime = i, b.error = "");
      } catch (u) {
        n.current() && (b.error = u instanceof Error ? u.message : "提醒未保存，请重试。");
      }
  }
}, lt = fo(Wo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), Uo = { class: "todoist-cal-head" }, zo = { class: "todoist-cal-title-row" }, Bo = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, Ho = { class: "todoist-cal-nav" }, Ko = { class: "todoist-cal-nav-group" }, No = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, Vo = { class: "todoist-cal-nav-group" }, Fo = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, Yo = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Xo = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Go = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, qo = { class: "todoist-cal-agenda" }, Qo = { class: "todoist-cal-agenda-head" }, Jo = { class: "todoist-cal-agenda-title" }, Zo = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, tn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, en = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, on = ["disabled"], nn = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, sn = {
  key: 0,
  class: "todoist-cal-empty"
}, an = {
  key: 1,
  class: "todoist-cal-empty"
}, ln = ["onClick"], rn = { class: "todoist-cal-todo-main" }, dn = ["disabled", "title", "onClick"], un = {
  key: 0,
  class: "check-icon"
}, cn = {
  key: 0,
  class: "todoist-cal-task-time"
}, pn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, mn = ["onClick"], vn = ["src"], fn = /* @__PURE__ */ Ut({
  __name: "TodoistCalendarSidebar",
  setup(i) {
    const n = wo;
    qe(
      () => G.active,
      () => vt.invalidateReads(),
      () => vt.loadTodosForDate(n.selectedDate, !0)
    ), jt(() => vt.cancelReads()), dt(() => [G.active, G.pendingWrites], ([w, L], y) => {
      if (!w || L) {
        vt.cancelReads();
        return;
      }
      vt.loadTodosForDate(n.selectedDate, !!y?.[1]);
    }, { immediate: !0, flush: "sync" });
    function u(w) {
      vt.toggleTodoItem(w);
    }
    function m(w) {
      lt.openTask(w.id, w);
    }
    Jt(() => {
      yo.syncSidebarToVue();
    });
    function $() {
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
    function V(w) {
      vt.dispatch("select-date", w);
    }
    function B(w, L) {
      vt.dispatch("context-date", {
        date: w,
        clientX: L.clientX,
        clientY: L.clientY
      });
    }
    function z(w, L) {
      const y = Array.from(L.dataTransfer?.types || []);
      (y.includes("application/x-todoist-task-id") || y.includes("text/plain")) && (L.preventDefault(), L.dataTransfer && (L.dataTransfer.dropEffect = "copy"));
    }
    function H(w) {
    }
    function j(w, L) {
      const y = L.dataTransfer?.getData("application/x-todoist-task-id") || L.dataTransfer?.getData("text/plain");
      y && (L.preventDefault(), L.stopPropagation(), vt.dispatch("drop-task", { taskId: y, date: w }));
    }
    return (w, L) => (l(), d("aside", {
      id: "todoist-calendar-sidebar",
      class: q(["todoist-calendar-sidebar", { collapsed: p(n).collapsed }]),
      "aria-label": "Todoist 任务日历"
    }, [
      t("div", Uo, [
        t("div", zo, [
          L[1] || (L[1] = t("span", { class: "todoist-cal-logo" }, [
            Et("📅 "),
            t("strong", null, "任务日历")
          ], -1)),
          t("span", Bo, C(p(n).badgeText), 1)
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
      t("div", Ho, [
        t("div", Ko, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: r
          }, "‹"),
          t("span", No, C(p(n).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: "下个月",
            onClick: O
          }, "›")
        ]),
        t("div", Vo, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: "上一年",
            onClick: S
          }, "‹"),
          t("span", Fo, C(p(n).yearLabel), 1),
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
      t("div", Yo, [
        (l(!0), d(nt, null, ut(p(n).cells, (y) => (l(), d("button", {
          key: y.date,
          type: "button",
          class: q(["todoist-cal-cell", {
            outside: y.isOutside,
            today: y.isToday,
            selected: y.isSelected
          }]),
          "data-date": y.date,
          role: "gridcell",
          title: y.title,
          onClick: (k) => V(y.date),
          onContextmenu: N((k) => B(y.date, k), ["prevent"]),
          onDragover: (k) => z(y.date, k),
          onDragleave: (k) => (y.date, void 0),
          onDrop: (k) => j(y.date, k)
        }, [
          t("span", null, C(y.dayNumber), 1),
          y.hasDot ? (l(), d("span", Go)) : R("", !0)
        ], 42, Xo))), 128))
      ]),
      t("div", qo, [
        t("div", Qo, [
          t("strong", Jo, C(p(n).agendaTitle), 1),
          t("span", Zo, C(p(n).todoItems.length) + " 项", 1)
        ]),
        p(n).writeError ? (l(), d("p", tn, C(p(n).writeError), 1)) : R("", !0),
        p(n).emptyText ? (l(), d("div", en, [
          Et(C(p(n).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: p(n).todoLoading || p(G).pendingWrites > 0,
            onClick: L[0] || (L[0] = (y) => p(vt).loadTodosForDate(p(n).selectedDate, !0))
          }, "重试读取", 8, on)
        ])) : R("", !0),
        t("div", nn, [
          p(n).todoLoading && !p(n).todoItems.length ? (l(), d("div", sn, " 正在读取待办与完成历史… ")) : p(n).todoItems.length === 0 && !p(n).emptyText ? (l(), d("div", an, " 当天没有待办或完成任务 ☕ ")) : (l(!0), d(nt, { key: 2 }, ut(p(n).todoItems, (y) => (l(), d("div", {
            key: y.id,
            class: q(["todoist-cal-todo-card", { completed: y.completed }]),
            onClick: (k) => m(y)
          }, [
            t("div", rn, [
              t("button", {
                type: "button",
                class: q(["todoist-cal-check", { checked: y.completed }]),
                disabled: p(G).pendingWrites > 0,
                title: y.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: N((k) => u(y), ["stop"])
              }, [
                y.completed ? (l(), d("span", un, "✓")) : R("", !0)
              ], 10, dn),
              t("span", {
                class: q(["todoist-cal-todo-title", { strike: y.completed }])
              }, C(y.content), 3),
              y.time ? (l(), d("small", cn, C(y.time), 1)) : R("", !0),
              y.completed ? (l(), d("span", pn, "已完成")) : R("", !0)
            ]),
            y.thumbUrl ? (l(), d("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: N((k) => p(_e).open(y.thumbUrl, y.content), ["stop"])
            }, [
              t("img", {
                src: y.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, vn),
              L[2] || (L[2] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, mn)) : R("", !0)
          ], 10, ln))), 128))
        ])
      ])
    ], 2));
  }
}), gn = /* @__PURE__ */ Zt(fn, [["__scopeId", "data-v-6d6d531e"]]);
function bn(i) {
  const n = i.state, u = P(null), m = P(null), $ = P(null), r = P(!1), O = Xe(null), S = P(), E = /* @__PURE__ */ new Map();
  function V(x) {
    E.clear();
    const W = x.closest(".todoist-board");
    if (W)
      for (const I of W.querySelectorAll(".todoist-board-list")) {
        const A = n.columns[Number(I.dataset.groupIndex)];
        if (!A) continue;
        const F = I.__todoistSlots;
        if (!F) continue;
        const tt = F(), et = tt.filter((at) => at.id !== k?.id);
        E.set(A, { list: I, rows: et, read: F, snapshot: tt });
      }
  }
  let B = 0, z;
  function H(x, W) {
    z = { clientY: x.clientY, col: W }, !B && (B = requestAnimationFrame(() => {
      B = 0;
      const I = z;
      z = void 0, I && j(I, I.col);
    }));
  }
  function j(x, W) {
    if (!k || n.movingTaskId) return;
    const I = E.get(W);
    if (!I) return;
    const A = I.read();
    A !== I.snapshot && (I.snapshot = A, I.rows = A.filter((J) => J.id !== k?.id));
    const F = x.clientY - I.list.getBoundingClientRect().top + I.list.scrollTop;
    let tt = 0, et = I.rows.length;
    for (; tt < et; ) {
      const J = tt + et >>> 1;
      F < I.rows[J].middle ? et = J : tt = J + 1;
    }
    let at = tt;
    if (m.value === n.columns.indexOf(W)) {
      const J = S.value ? I.rows.findIndex((bt) => bt.id === S.value) : I.rows.length;
      J >= 0 && at > J && F < I.rows[J].middle + 10 && (at = J), J > 0 && at < J && F > I.rows[J - 1].middle - 10 && (at = J);
    }
    const gt = I.rows[at]?.id;
    y(W, gt), m.value === n.columns.indexOf(W) && ($.value = gt || I.rows[I.rows.length - 1]?.id || null, r.value = !gt);
  }
  function w(x) {
    return x === O.value;
  }
  function L(x, W) {
    if (W !== m.value || !O.value) return x.tasks;
    const I = [...x.tasks], A = S.value ? I.findIndex((F) => F.id === S.value) : -1;
    return I.splice(A < 0 ? I.length : A, 0, O.value), I;
  }
  function y(x, W) {
    if (!k || !h) return;
    if (n.view === "today" && x.sectionId === "overdue" && h.sectionId !== "overdue") {
      m.value = null;
      return;
    }
    const I = W ? x.tasks.find((tt) => tt.id === W) : void 0, A = x === h ? String(k._taskRaw?.parent_id || "") : "";
    if (I && n.view !== "today" && String(I._taskRaw?.parent_id || "") !== A) {
      m.value = null;
      return;
    }
    const F = n.columns.indexOf(x);
    F < 0 || (S.value = W, m.value = F);
  }
  let k = null, h = null;
  function K(x, W, I, A) {
    if (!i.isActive() || n.loading || n.movingTaskId || n.moveNeedsRefresh || W.completed || W.id.startsWith("optimistic-") || i.editingTaskId() === W.id) {
      x.preventDefault();
      return;
    }
    if (x.stopPropagation(), i.closePopovers(), u.value = W.id, k = W, h = I, O.value = { ...W }, V(x.currentTarget), x.dataTransfer) {
      x.dataTransfer.effectAllowed = "move";
      const F = x.currentTarget, tt = F.getBoundingClientRect();
      x.dataTransfer.setDragImage(
        F,
        Math.max(0, Math.min(tt.width, x.clientX - tt.left)),
        Math.max(0, Math.min(tt.height, x.clientY - tt.top))
      ), x.dataTransfer.clearData(), x.dataTransfer.setData("application/x-todoist-task-id", W.id), x.dataTransfer.setData("application/x-logicweaver-todoist-task", W.id), x.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: W.id, sectionId: I.sectionId }));
    }
  }
  function T() {
    cancelAnimationFrame(B), B = 0, z = void 0, u.value = null, m.value = null, $.value = null, r.value = !1, k = null, h = null, O.value = null, S.value = void 0, E.clear();
  }
  function v(x, W) {
    !k || n.movingTaskId || (x.preventDefault(), x.stopPropagation(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), H(x, n.columns[W]));
  }
  function rt(x, W) {
    x.currentTarget?.contains(x.relatedTarget);
  }
  function it(x, W, I, A) {
    x.dataTransfer && (x.dataTransfer.dropEffect = "move"), H(x, I);
  }
  async function pt(x, W) {
    z && z.col === x && (j(z, z.col), W = S.value);
    const I = k, A = h;
    T(), !(!I || !A || !i.isActive() || n.movingTaskId) && (n.view === "today" ? x.sectionId === "today" && A.sectionId !== "today" ? await i.moveTask(I.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, W) : await i.moveTask(I.id, { sectionId: x.sectionId }, W) : await i.moveTask(I.id, {
      projectId: x.projectId,
      sectionId: x.sectionId
    }, W));
  }
  async function Dt(x, W, I, A) {
    x.preventDefault();
    const F = x.dataTransfer?.getData("application/x-todoist-label") || (x.dataTransfer?.getData("text/plain")?.startsWith("label:") ? x.dataTransfer.getData("text/plain").slice(6) : "");
    if (F) {
      i.dropLabel(W, F);
      return;
    }
    if (m.value === n.columns.indexOf(I)) {
      await pt(I, S.value);
      return;
    }
    const tt = x.currentTarget.getBoundingClientRect(), et = x.clientY >= tt.top + tt.height / 2, at = I.tasks.filter((bt) => bt.id !== k?.id), gt = at.findIndex((bt) => bt.id === W.id), J = W.id === k?.id ? W.id : et ? at[gt + 1]?.id : W.id;
    await pt(I, J);
  }
  async function wt(x, W) {
    x.preventDefault(), x.stopPropagation(), await pt(W, m.value === n.columns.indexOf(W) ? S.value : void 0);
  }
  return dt(() => [n.view, n.activeProjectId], () => T()), dt(() => n.columns, (x) => {
    h && !x.includes(h) && T();
  }), dt(i.isActive, (x) => {
    x || T();
  }, { immediate: !0, flush: "sync" }), jt(T), {
    draggingTaskId: u,
    dragOverColIndex: m,
    dragOverTaskId: $,
    dragAfterTask: r,
    isDragPreview: w,
    previewTasks: L,
    onTaskDragStart: K,
    onTaskDragEnd: T,
    onColDragOver: v,
    onColDragLeave: rt,
    onTaskDragOver: it,
    onTaskDrop: Dt,
    onColDrop: wt
  };
}
const kn = ["data-row-key"], yn = /* @__PURE__ */ Ut({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(i) {
    const n = i, u = P(null), m = /* @__PURE__ */ new Map(), $ = P(0), r = Xe({ top: 0, height: 600 }), O = (y) => n.isPreview(y) ? `preview:${y.id}` : y.id, S = st(() => {
      $.value;
      const y = [0];
      for (const k of n.tasks) {
        const h = k.id === n.hiddenId && !n.isPreview(k) ? 0 : m.get(O(k)) || m.get(k.id) || 110;
        y.push(y[y.length - 1] + h);
      }
      return y;
    }), E = st(() => {
      $.value;
      let y = 0;
      return n.tasks.filter((k) => !n.isPreview(k)).map((k) => {
        const h = m.get(k.id) || 110, K = { id: k.id, middle: y + h / 2 };
        return y += h, K;
      });
    });
    function V(y) {
      const k = S.value;
      let h = 0, K = n.tasks.length;
      for (; h < K; ) {
        const T = h + K >>> 1;
        k[T + 1] < y ? h = T + 1 : K = T;
      }
      return h;
    }
    const B = st(() => {
      const y = Math.max(0, V(r.value.top) - 5), k = Math.min(n.tasks.length, V(r.value.top + r.value.height) + 6), h = /* @__PURE__ */ new Set();
      for (let K = y; K < k; K++) h.add(K);
      if (n.pinnedId) {
        const K = n.tasks.findIndex((T) => T.id === n.pinnedId && !n.isPreview(T));
        K >= 0 && h.add(K);
      }
      return [...h].sort((K, T) => K - T).map((K) => ({ task: n.tasks[K], index: K, top: S.value[K] }));
    });
    let z = 0;
    function H() {
      z || (z = requestAnimationFrame(() => {
        z = 0, u.value && (r.value = { top: u.value.scrollTop, height: u.value.clientHeight });
      }));
    }
    let j;
    const w = /* @__PURE__ */ new Map();
    function L(y, k) {
      const h = w.get(k);
      h !== y && (h && j?.unobserve(h), y instanceof HTMLElement ? (w.set(k, y), j?.observe(y)) : w.delete(k));
    }
    return dt(() => n.tasks, () => {
      const y = new Set(n.tasks.map(O));
      for (const k of m.keys()) y.has(k) || m.delete(k);
      Rt(H);
    }), Jt(() => {
      j = new ResizeObserver((y) => {
        let k = !1;
        const h = V(u.value?.scrollTop || 0), K = S.value[h] || 0;
        for (const T of y) {
          const v = T.target;
          if (v === u.value) {
            H();
            continue;
          }
          const rt = v.dataset.rowKey, it = T.borderBoxSize?.[0]?.blockSize || T.contentRect.height;
          rt && it > 0 && Math.abs((m.get(rt) || 0) - it) > 0.5 && (m.set(rt, it), k = !0);
        }
        if (k) {
          $.value++;
          const T = (S.value[h] || 0) - K;
          u.value && T && !n.pinnedId && (u.value.scrollTop += T), H();
        }
      }), u.value && (j.observe(u.value), u.value.__todoistSlots = () => E.value);
      for (const y of w.values()) j.observe(y);
      H();
    }), jt(() => {
      j?.disconnect(), cancelAnimationFrame(z), u.value && delete u.value.__todoistSlots, w.clear(), m.clear();
    }), (y, k) => (l(), d("div", {
      ref_key: "root",
      ref: u,
      onScrollPassive: H
    }, [
      i.tasks.length ? (l(), d("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: ft({ height: `${S.value[S.value.length - 1]}px` })
      }, [
        (l(!0), d(nt, null, ut(B.value, (h) => (l(), d("div", {
          key: O(h.task),
          ref_for: !0,
          ref: (K) => L(K, O(h.task)),
          "data-row-key": O(h.task),
          class: "virtual-task-row",
          style: ft({ transform: `translateY(${h.top}px)` })
        }, [
          We(y.$slots, "default", {
            task: h.task,
            index: h.index
          }, void 0, !0)
        ], 12, kn))), 128))
      ], 4)) : We(y.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), wn = /* @__PURE__ */ Zt(yn, [["__scopeId", "data-v-e0ed77d8"]]), hn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Tn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Dn = {
  key: 2,
  class: "todoist-empty"
}, xn = {
  key: 3,
  class: "todoist-empty"
}, Cn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, $n = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Sn = { class: "todoist-projects-toolbar-inner" }, In = { class: "todoist-project-tabs-scroll" }, Rn = ["onClick"], _n = { class: "todoist-project-tab-name" }, Ln = {
  key: 0,
  class: "todoist-project-actions-group"
}, Pn = { class: "todoist-board" }, Mn = ["data-section-id", "data-title", "data-column-index"], On = { class: "todoist-board-column-head" }, An = ["title", "onClick"], En = ["onClick"], jn = ["onSubmit"], Wn = ["onKeydown"], Un = { class: "date-hint-left" }, zn = { class: "date-hint-badge" }, Bn = { class: "date-hint-sub" }, Hn = {
  key: 0,
  class: "date-hint-preview"
}, Kn = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, Nn = {
  key: 1,
  class: "todoist-composer-images"
}, Vn = ["src"], Fn = { class: "todoist-composer-img-name" }, Yn = {
  key: 0,
  class: "todoist-composer-img-status"
}, Xn = ["onClick"], Gn = { class: "todoist-inline-actions" }, qn = ["disabled"], Qn = ["disabled"], Jn = {
  key: 0,
  class: "todoist-column-empty"
}, Zn = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], ts = ["disabled", "title", "aria-label", "onClick"], es = { class: "todoist-board-task-main" }, os = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, ns = {
  key: 1,
  class: "todoist-card-repo-strip"
}, ss = ["title", "onClick"], is = { class: "repo-badge-name" }, as = ["onKeydown", "onBlur"], ls = {
  key: 3,
  class: "todoist-board-task-title todoist-task-content"
}, rs = {
  key: 4,
  class: "todoist-board-task-description"
}, ds = {
  key: 5,
  class: "todoist-board-task-meta"
}, us = ["title"], cs = ["title"], ps = ["title"], ms = ["title"], vs = {
  key: 4,
  class: "todoist-board-extra"
}, fs = ["onClick"], gs = ["src"], bs = {
  key: 0,
  class: "todoist-board-add-column"
}, ks = {
  key: 1,
  class: "todoist-add-section-form"
}, ys = ["onKeydown"], ws = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, hs = ["disabled"], Ts = ["disabled"], Ds = {
  key: 1,
  class: "todoist-section-menu-divider"
}, xs = { class: "todoist-task-menu-header" }, Cs = { class: "todoist-task-menu-title" }, $s = { class: "todoist-menu-badge" }, Ss = {
  key: 0,
  class: "todoist-labels-panel"
}, Is = { class: "todoist-labels-quick-input" }, Rs = ["onKeydown"], _s = { class: "todoist-labels-chip-grid" }, Ls = ["onClick"], Ps = {
  key: 0,
  class: "chip-check"
}, Ms = {
  key: 1,
  class: "todoist-recur-panel"
}, Os = { class: "todoist-recur-grid" }, As = ["onClick"], Es = { class: "todoist-recur-custom-row" }, js = ["onKeydown"], Ws = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Us = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, zs = {
  key: 2,
  class: "todoist-color-panel"
}, Bs = { class: "todoist-color-grid" }, Hs = ["title", "onClick"], Ks = { class: "todoist-color-name" }, Ns = ["disabled", "onClick"], Vs = { class: "todoist-project-flyout-name" }, Fs = {
  key: 0,
  class: "todoist-menu-badge"
}, Ys = { class: "todoist-menu-text" }, Xs = ["onKeydown"], Gs = { class: "todoist-dialog-title" }, qs = { class: "todoist-dialog-body" }, Qs = {
  key: 0,
  class: "todoist-dialog-desc"
}, Js = ["placeholder", "onKeydown"], Zs = { class: "todoist-dialog-foot" }, ti = ["onKeydown"], ei = { class: "todoist-dialog-icon" }, oi = { class: "todoist-dialog-title" }, ni = { class: "todoist-dialog-body" }, si = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, ii = { class: "todoist-dialog-danger-text" }, ai = { class: "todoist-dialog-msg" }, li = { class: "todoist-dialog-foot" }, ri = /* @__PURE__ */ Ut({
  __name: "TodoistTaskList",
  setup(i) {
    const n = P(0);
    function u() {
      n.value++;
    }
    Jt(() => {
      window.addEventListener("storage", u), window.addEventListener("todoist-repository-links-changed", u);
    }), jt(() => {
      window.removeEventListener("storage", u), window.removeEventListener("todoist-repository-links-changed", u);
    });
    function m(o, e) {
      return n.value, Qe(o, e);
    }
    function $(o) {
      Je.open(o);
    }
    const r = yt, O = P(""), S = P(null), E = P(""), V = P(!1), B = st(() => E.value ? Ro(E.value) : null), z = P([]);
    function H(o) {
      const e = o.clipboardData?.items;
      if (e)
        for (let s = 0; s < e.length; s++) {
          const M = e[s];
          if (M.type.indexOf("image") !== -1) {
            o.preventDefault();
            const c = M.getAsFile();
            if (!c) continue;
            const Z = URL.createObjectURL(c), Y = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Ct = {
              file: c,
              previewUrl: Z,
              name: `截图_${Y}.png`,
              uploading: !1
            };
            z.value.push(Ct);
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
    const w = P(null), L = P(""), y = P(null), k = Gt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), h = Gt({
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
    }), K = P(null), T = Gt({
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
    }), v = Gt({
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
    }), rt = P(null), it = P(null), pt = [
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
    ], wt = st(() => String(v.task?._taskRaw?.project_id || v.col?.projectId || "")), x = st(() => r.view !== "projects" ? null : r.projects.find((o) => String(o.id) === String(r.activeProjectId)) || r.projects[0] || null), W = st(() => {
      const o = new Set(r.availableLabels || []);
      return v.task?.labels && v.task.labels.forEach((e) => o.add(e)), Array.from(o);
    }), I = st(() => {
      const o = v.task?.customColorHex;
      return o && pt.find((s) => s.hex.toLowerCase() === o.toLowerCase()) || pt[0];
    });
    function A(o, e) {
      return o.sectionId || o.title || String(e);
    }
    function F() {
      return `${r.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function tt(o) {
      return o.startDate || o.dueText || o.labels && o.labels.length > 0 || o.timedDeadlineText || o.extraCountText;
    }
    function et() {
      k.isOpen = !1, v.isOpen = !1, v.activeSubpanel = null;
    }
    const {
      draggingTaskId: at,
      dragOverColIndex: gt,
      dragOverTaskId: J,
      dragAfterTask: bt,
      isDragPreview: mt,
      previewTasks: Ft,
      onTaskDragStart: zt,
      onTaskDragEnd: Bt,
      onColDragOver: te,
      onColDragLeave: ee,
      onTaskDragOver: U,
      onTaskDrop: a,
      onColDrop: f
    } = bn({
      state: r,
      isActive: () => G.active,
      editingTaskId: () => w.value,
      closePopovers: et,
      moveTask: (o, e, s) => Q.moveTask(o, e, s),
      dropLabel: (o, e) => {
        o.labels || (o.labels = []), o.labels.includes(e) || (o.labels.push(e), ot.getToken() && ot.updateTask(o.id, { labels: o.labels }));
      }
    });
    function X(o, e) {
      Q.dispatch("toggle-task", { task: o, group: e });
    }
    function St(o, e) {
      if (o.completed) return;
      const s = e.target;
      s && s.closest("button,input,textarea,select,a") || Ot(o);
    }
    function Ot(o) {
      r.movingTaskId !== o.id && (w.value = o.id, L.value = o.content, Rt(() => {
        y.value && (y.value.focus(), y.value.select());
      }));
    }
    function oe(o, e) {
      if (w.value !== o.id) return;
      const s = L.value.trim();
      w.value = null, e && s && s !== o.content && (o.content = s, Q.dispatch("update-task-title", {
        taskId: o.id,
        content: s,
        task: o,
        newContent: s
      }));
    }
    function be(o, e) {
      o.key === "Enter" ? o.shiftKey || (o.preventDefault(), oe(e, !0)) : o.key === "Escape" && (o.preventDefault(), o.stopPropagation(), oe(e, !1));
    }
    function ke(o, e) {
      e.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || lt.openTask(o.id, o);
    }
    function ye(o, e, s) {
      const M = s.currentTarget;
      S.value = A(o, e), E.value = "", V.value = !1, Rt(() => {
        M.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function re() {
      It.value || ne();
    }
    function ne() {
      S.value = null, E.value = "", V.value = !1;
      for (const o of z.value)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
      z.value = [];
    }
    const It = P(!1), Wt = /* @__PURE__ */ new WeakMap();
    function de(o) {
      const e = o.description || o._taskRaw?.description || "", s = Wt.get(o);
      if (s && s.source === e) return s;
      const M = e.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: e,
        thumb: M,
        text: e.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return Wt.set(o, c), c;
    }
    function Yt(o) {
      return de(o).text;
    }
    function se(o) {
      return de(o).thumb;
    }
    function D(o, e) {
      o && _e.open(o, e?.content || "任务照片");
    }
    async function g(o) {
      if (!G.active || It.value) return;
      const e = [...z.value];
      let M = E.value.trim() || e[0]?.name || "";
      if (!M) return;
      let c, Z, Y;
      if (B.value && !V.value) {
        const _t = B.value;
        M = _t.cleanTitle || M, c = _t.date, Z = _t.label + (_t.time ? ` ${_t.time}` : ""), Y = _t.time ? `${_t.date} ${_t.time}` : _t.date;
      }
      const Ct = S.value, Kt = E.value, $t = r.view, he = o.projectId || $t === "projects" && r.activeProjectId || void 0, Te = o.sectionId !== void 0 ? o.sectionId : void 0;
      It.value = !0;
      try {
        await go(async () => {
          for (const Tt of e)
            if (!Tt.uploadedUrl) {
              Tt.uploading = !0;
              try {
                const De = await ot.uploadFile(Tt.file, Tt.name);
                Tt.uploadedUrl = De.file_url;
              } catch {
                Tt.uploadedUrl = Tt.previewUrl;
              } finally {
                Tt.uploading = !1;
              }
            }
          await Q.dispatch("add-task-submit", {
            content: M,
            view: $t,
            group: o,
            projectId: he,
            sectionId: Te,
            dueDate: c,
            dueText: Z,
            dueString: Y,
            attachments: e.map((Tt) => ({ file_url: Tt.uploadedUrl, file_name: Tt.name, file_type: Tt.file.type || "image/png" }))
          }) && Ct === S.value && Kt === E.value && e.length === z.value.length && e.every((Tt, De) => Tt === z.value[De]) && ne();
        });
      } catch {
        r.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        It.value = !1;
      }
    }
    function _(o, e) {
      o.key === "Enter" && !o.shiftKey ? (o.preventDefault(), g(e)) : o.key === "Escape" && (o.preventDefault(), re());
    }
    function ct() {
      const o = O.value.trim();
      if (!o) return;
      const s = r.columns.find((M) => M.projectId)?.projectId || r.activeProjectId || void 0;
      Q.dispatch("add-section-submit", { name: o, projectId: s }), ht();
    }
    function ht() {
      r.addingSection = !1, O.value = "";
    }
    function kt(o, e, s) {
      if (k.isOpen && k.col === o) {
        k.isOpen = !1;
        return;
      }
      v.isOpen = !1;
      const c = s.currentTarget.getBoundingClientRect(), Y = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Ct = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      k.col = o, k.x = Y, k.y = Ct, k.canMoveLeft = e > 0 && !!r.columns[e - 1]?.sectionId, k.canMoveRight = e < r.columns.length - 1 && !!r.columns[e + 1]?.sectionId, k.isOpen = !0;
    }
    function Ht(o, e) {
      k.isOpen = !1, Q.dispatch("move-section", { sectionId: o.sectionId, direction: e });
    }
    function Le(o, e, s) {
      if (r.movingTaskId === o.id || o.completed) return;
      k.isOpen = !1;
      const M = 236, c = 340, Z = Math.max(8, Math.min(window.innerWidth - M - 8, s.clientX)), Y = Math.max(8, Math.min(window.innerHeight - c - 8, s.clientY));
      if (v.task = o, v.col = e, v.x = Z, v.y = Y, v.activeSubpanel = null, v.descText = o.description || "", v.isSavingDesc = !1, v.newLabelText = "", v.customRecurText = "", o.dueDate) {
        const $t = /* @__PURE__ */ new Date(`${o.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite($t.getTime()) && (v.calYear = $t.getFullYear(), v.calMonth = $t.getMonth());
      } else {
        const $t = /* @__PURE__ */ new Date();
        v.calYear = $t.getFullYear(), v.calMonth = $t.getMonth();
      }
      const Ct = 252, Kt = Z + M + Ct > window.innerWidth - 8;
      v.flyoutOpenLeft = Kt, v.flyoutStyle = {
        left: Kt ? `${-Ct - 6}px` : `${M + 6}px`,
        top: "0px"
      }, v.isOpen = !0;
    }
    function ue(o) {
      v.activeSubpanel === o ? v.activeSubpanel = null : (v.activeSubpanel = o, o === "desc" ? Rt(() => {
        rt.value?.focus(), rt.value?.select();
      }) : o === "labels" && Rt(() => {
        it.value?.focus();
      }));
    }
    function Pe(o) {
      return !!v.task?.labels?.includes(o);
    }
    function to(o) {
      if (!v.task) return;
      const e = v.task.id, s = [...v.task.labels || []], M = s.includes(o) ? s.filter((c) => c !== o) : [...s, o];
      v.task.labels = M, Q.dispatch("update-task-labels", { taskId: e, labels: M });
    }
    function Me() {
      if (!v.task) return;
      const o = v.newLabelText.trim();
      if (!o) return;
      v.newLabelText = "";
      const e = v.task.id, s = [...v.task.labels || []];
      s.includes(o) || (s.push(o), v.task.labels = s, Q.dispatch("update-task-labels", { taskId: e, labels: s })), et();
    }
    function eo(o) {
      return String(v.task?.dueString || "").toLowerCase().includes(o.toLowerCase());
    }
    function oo(o, e) {
      if (!v.task) return;
      const s = v.task.id;
      Q.dispatch("update-task-recurring", { taskId: s, rule: o, label: e }), et();
    }
    function Oe() {
      if (!v.task) return;
      const o = v.customRecurText.trim();
      if (!o) return;
      const e = v.task.id;
      Q.dispatch("update-task-recurring", { taskId: e, rule: o, label: o }), et();
    }
    function no() {
      if (!v.task) return;
      const o = v.task.id;
      Q.dispatch("clear-task-recurring", { taskId: o }), et();
    }
    function so(o) {
      if (!v.task) return;
      const e = v.task.id, s = pt.find((M) => M.id === o);
      v.task.customColorHex = s?.hex || "", Q.dispatch("update-task-color", { taskId: e, colorId: o }), et();
    }
    function io(o) {
      if (!v.task) return;
      const e = v.task.id;
      Q.dispatch("move-task-to-project", {
        taskId: e,
        targetProjectId: o.id,
        targetProjectName: o.name
      }), et();
    }
    function ao() {
      if (!v.task) return;
      const o = v.task, e = { x: v.x, y: v.y };
      et();
      const s = Xt(e, 380, 220);
      T.x = s.x, T.y = s.y, o.isRecurring ? (T.title = "删除重复任务确认", T.icon = "⚠️", T.danger = !0, T.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", T.message = `任务内容：${o.content}
循环规则：${o.dueString || "循环任务"}`, T.confirmText = "删除重复任务", T.actionType = "delete-task", T.payload = { taskId: o.id, isRecurring: !0 }, T.isOpen = !0) : (T.title = "删除任务确认", T.icon = "🗑️", T.danger = !0, T.alertText = `确定要删除任务「${o.content}」吗？`, T.message = "此操作不可撤销。", T.confirmText = "确认删除", T.actionType = "delete-task", T.payload = { taskId: o.id, isRecurring: !1 }, T.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(o, e, s) {
      Le(o, e, s);
    });
    function Xt(o, e = 380, s = 220) {
      let M = null;
      if (o instanceof HTMLElement)
        M = o.getBoundingClientRect();
      else if (o && "currentTarget" in o && o.currentTarget instanceof HTMLElement)
        M = o.currentTarget.getBoundingClientRect();
      else if (o && "target" in o && o.target instanceof HTMLElement)
        M = (o.target.closest("button") || o.target).getBoundingClientRect();
      else if (o && "x" in o && "y" in o && typeof o.x == "number" && typeof o.y == "number") {
        const c = Math.max(16, Math.min(window.innerWidth - e - 16, o.x)), Z = Math.max(16, Math.min(window.innerHeight - s - 16, o.y + 10));
        return { x: c, y: Z };
      }
      if (M) {
        let c = M.right - e;
        c < 16 && (c = Math.max(16, M.left)), c = Math.max(16, Math.min(window.innerWidth - e - 16, c));
        let Z = M.bottom + 8;
        return Z + s > window.innerHeight - 16 && M.top > s + 16 && (Z = M.top - s - 8), Z = Math.max(16, Math.min(window.innerHeight - s - 16, Z)), { x: c, y: Z };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - e) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - s) / 3))
      };
    }
    function Ae(o, e) {
      if (e.button !== 0 || e.target?.closest("button, input, textarea")) return;
      e.preventDefault();
      const s = e.clientX, M = e.clientY, c = o === "prompt" ? h : T, Z = c.x, Y = c.y, Ct = ($t) => {
        const he = $t.clientX - s, Te = $t.clientY - M;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, Z + he)), c.y = Math.max(10, Math.min(window.innerHeight - 120, Y + Te));
      }, Kt = () => {
        window.removeEventListener("pointermove", Ct), window.removeEventListener("pointerup", Kt);
      };
      window.addEventListener("pointermove", Ct), window.addEventListener("pointerup", Kt);
    }
    function Ee(o) {
      const e = Xt(o, 380, 220);
      h.x = e.x, h.y = e.y, h.title = "新建项目", h.message = "请输入新项目名称：", h.value = "", h.placeholder = "项目名称…", h.confirmText = "创建", h.actionType = "create-project", h.payload = null, h.isOpen = !0, Rt(() => K.value?.focus());
    }
    function lo(o, e) {
      const s = Xt(e, 380, 220);
      h.x = s.x, h.y = s.y, h.title = "重命名项目", h.message = `正在重命名项目「${o.name}」：`, h.value = o.name, h.placeholder = "新项目名称…", h.confirmText = "保存", h.actionType = "rename-project", h.payload = { projectId: o.id }, h.isOpen = !0, Rt(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function ro(o, e) {
      const s = e || { x: k.x, y: k.y };
      k.isOpen = !1;
      const M = Xt(s, 380, 220);
      h.x = M.x, h.y = M.y, h.title = "重命名板块", h.message = `正在重命名板块「${o.title}」：`, h.value = o.title, h.placeholder = "新板块名称…", h.confirmText = "保存", h.actionType = "rename-section", h.payload = { sectionId: o.sectionId }, h.isOpen = !0, Rt(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function ce() {
      h.isOpen = !1;
    }
    function je() {
      const o = h.value.trim();
      if (!o) return;
      const { actionType: e, payload: s } = h;
      ce(), e === "create-project" ? Q.dispatch("create-project-submit", o) : e === "rename-project" && s && "projectId" in s ? Q.dispatch("rename-project-submit", { projectId: s.projectId, newName: o }) : e === "rename-section" && s && "sectionId" in s && Q.dispatch("rename-section", { sectionId: s.sectionId, newName: o });
    }
    function uo(o, e) {
      const s = Xt(e, 380, 240);
      T.x = s.x, T.y = s.y, T.title = "删除项目确认", T.icon = "🗑️", T.danger = !0, T.alertText = `确定要彻底删除项目「${o.name}」吗？`, T.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！", T.confirmText = "彻底删除", T.actionType = "delete-project", T.payload = { projectId: o.id }, T.isOpen = !0;
    }
    function co(o, e) {
      const s = e || { x: k.x, y: k.y };
      k.isOpen = !1;
      const M = Xt(s, 380, 240);
      T.x = M.x, T.y = M.y, T.title = "删除板块确认", T.icon = "🗑️", T.danger = !0, T.alertText = `确定要删除板块「${o.title}」吗？`, T.message = "板块内的任务将自动保留并移至默认收件箱。", T.confirmText = "删除板块", T.actionType = "delete-section", T.payload = { sectionId: o.sectionId }, T.isOpen = !0;
    }
    function pe() {
      T.isOpen = !1;
    }
    function po() {
      const { actionType: o, payload: e } = T;
      pe(), o === "delete-project" && e && "projectId" in e ? Q.dispatch("delete-project-submit", e.projectId) : o === "delete-section" && e && "sectionId" in e ? Q.dispatch("delete-section", { sectionId: e.sectionId }) : o === "delete-task" && e && "taskId" in e && Q.dispatch("delete-task-submit", e);
    }
    function mo(o) {
      Q.dispatch("switch-project", o);
    }
    function we(o) {
      o.key === "Escape" && (v.isOpen && (v.isOpen = !1, v.activeSubpanel = null), k.isOpen && (k.isOpen = !1));
    }
    return dt(() => G.active, (o) => {
      document.removeEventListener("keydown", we), o && document.addEventListener("keydown", we);
    }, { immediate: !0, flush: "sync" }), jt(() => {
      document.removeEventListener("keydown", we), ne();
    }), (o, e) => (l(), d("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: et
    }, [
      p(r).moveError && p(r).moveMessage ? (l(), d("p", hn, C(p(r).moveMessage), 1)) : R("", !0),
      p(r).emptyText && p(r).columns.length > 0 && !p(r).loading ? (l(), d("p", Tn, C(p(r).emptyText) + " 已显示的任务保留。", 1)) : R("", !0),
      p(r).loading && p(r).columns.length === 0 ? (l(), d("p", Dn, "加载中…")) : p(r).emptyText && p(r).columns.length === 0 ? (l(), d("p", xn, C(p(r).emptyText), 1)) : p(r).view === "projects" && p(r).projects.length === 0 ? (l(), d("div", Cn, [
        e[29] || (e[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        e[30] || (e[30] = t("h3", null, "暂无自定义项目", -1)),
        e[31] || (e[31] = t("p", null, "你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！", -1)),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: e[0] || (e[0] = (s) => Ee(s))
        }, "＋ 新建第一个项目")
      ])) : (l(), d(nt, { key: 5 }, [
        p(r).view === "projects" && p(r).projects.length ? (l(), d("div", $n, [
          t("div", Sn, [
            t("div", In, [
              (l(!0), d(nt, null, ut(p(r).projects, (s) => (l(), d("button", {
                key: s.id,
                type: "button",
                class: q(["todoist-project-tab", { active: String(s.id) === String(p(r).activeProjectId) }]),
                onClick: (M) => mo(s.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: ft({ background: s.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", _n, C(s.name), 1)
              ], 10, Rn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: e[1] || (e[1] = (s) => Ee(s))
              }, "＋ 新建项目")
            ]),
            x.value ? (l(), d("div", Ln, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: "重命名项目",
                onClick: e[2] || (e[2] = (s) => lo(x.value, s))
              }, [...e[32] || (e[32] = [
                t("span", { class: "action-icon" }, "✏️", -1),
                t("span", { class: "action-text" }, "重命名", -1)
              ])]),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: "删除项目",
                onClick: e[3] || (e[3] = (s) => uo(x.value, s))
              }, [...e[33] || (e[33] = [
                t("span", { class: "action-icon" }, "🗑️", -1),
                t("span", { class: "action-text" }, "删除项目", -1)
              ])])
            ])) : R("", !0)
          ])
        ])) : R("", !0),
        t("div", Pn, [
          (l(!0), d(nt, null, ut(p(r).columns, (s, M) => (l(), d("section", {
            key: s.sectionId || s.title || M,
            class: "todoist-board-column",
            "data-section-id": s.sectionId,
            "data-title": s.title,
            "data-column-index": M
          }, [
            t("header", On, [
              t("h3", null, [
                Et(C(s.title) + " ", 1),
                t("span", null, C(s.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: s.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: N((c) => kt(s, M, c), ["stop"])
              }, "•••", 8, An)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => ye(s, M, c)
            }, "＋ 添加任务", 8, En),
            S.value === A(s, M) ? (l(), d("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: N((c) => g(s), ["prevent"])
            }, [
              Pt(t("textarea", {
                "onUpdate:modelValue": e[4] || (e[4] = (c) => E.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (c) => _(c, s),
                onPaste: e[5] || (e[5] = (c) => H(c))
              }, null, 40, Wn), [
                [Nt, E.value]
              ]),
              B.value ? (l(), d("div", {
                key: 0,
                class: q(["todoist-composer-date-hint", { "is-ignored": V.value }])
              }, [
                t("div", Un, [
                  e[35] || (e[35] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", zn, [
                    Et(C(B.value.label) + C(B.value.time ? " " + B.value.time : "") + " ", 1),
                    t("span", Bn, "(" + C(B.value.formattedDate) + ")", 1)
                  ]),
                  V.value ? (l(), d("span", Kn, " (已忽略日期，按纯文本创建) ")) : (l(), d("span", Hn, [
                    e[34] || (e[34] = Et(" 精简任务名: ", -1)),
                    t("strong", null, C(B.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: e[6] || (e[6] = (c) => V.value = !V.value)
                }, C(V.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : R("", !0),
              z.value.length > 0 ? (l(), d("div", Nn, [
                (l(!0), d(nt, null, ut(z.value, (c, Z) => (l(), d("div", {
                  key: Z,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Vn),
                  t("span", Fn, C(c.name), 1),
                  c.uploading ? (l(), d("span", Yn, "上传中…")) : R("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (Y) => j(Z)
                  }, "×", 8, Xn)
                ]))), 128))
              ])) : R("", !0),
              t("div", Gn, [
                t("button", {
                  type: "button",
                  disabled: It.value,
                  onClick: re
                }, "取消", 8, qn),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: It.value
                }, C(It.value ? z.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Qn)
              ])
            ], 40, jn)) : R("", !0),
            qt(wn, {
              tasks: p(Ft)(s, M),
              "pinned-id": p(at) || w.value,
              "hidden-id": p(gt) !== null ? p(at) : null,
              "is-preview": p(mt),
              class: q(["todoist-board-list", { "drag-over": p(gt) === M }]),
              "data-group-index": M,
              onDragover: N((c) => p(te)(c, M), ["prevent"]),
              onDragleave: (c) => p(ee)(c, M),
              onDrop: N((c) => p(f)(c, s), ["prevent"])
            }, {
              empty: ae(() => [
                s.tasks.length === 0 && p(gt) !== M ? (l(), d("p", Jn, " 暂无任务 · 可拖到这里 ")) : R("", !0)
              ]),
              default: ae(({ task: c, index: Z }) => [
                t("article", {
                  class: q(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: w.value === c.id,
                      "dragging-task": !p(mt)(c) && p(at) === c.id,
                      "drop-before": p(J) === c.id && !p(bt),
                      "drop-after": p(J) === c.id && p(bt),
                      "saving-position": p(r).movingTaskId === c.id,
                      "todoist-task-preview": p(mt)(c),
                      "drag-origin-hidden": p(at) === c.id && !p(mt)(c) && p(gt) !== null
                    }
                  ]]),
                  style: ft(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": p(mt)(c) ? void 0 : c.id,
                  "aria-hidden": p(mt)(c) || void 0,
                  tabindex: p(mt)(c) ? -1 : 0,
                  title: F(),
                  draggable: !p(mt)(c) && !c.completed && !p(r).loading && !p(r).movingTaskId && !p(r).moveNeedsRefresh && w.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (Y) => p(zt)(Y, c, s, Z),
                  onDragend: e[9] || (e[9] = //@ts-ignore
                  (...Y) => p(Bt) && p(Bt)(...Y)),
                  onDragover: N((Y) => p(U)(Y, c, s, Z), ["stop", "prevent"]),
                  onDrop: N((Y) => p(a)(Y, c, s, Z), ["stop", "prevent"]),
                  onDblclick: (Y) => St(c, Y),
                  onClick: (Y) => ke(c, Y),
                  onContextmenu: N((Y) => Le(c, s, Y), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: q(["todoist-board-check", { checked: c.completed }]),
                    disabled: p(mt)(c) || p(r).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: N((Y) => X(c, s), ["stop"])
                  }, null, 10, ts),
                  t("div", es, [
                    p(r).movingTaskId === c.id ? (l(), d("span", os, "保存中")) : R("", !0),
                    m(c.id, c.description).length ? (l(), d("div", ns, [
                      (l(!0), d(nt, null, ut(m(c.id, c.description), (Y) => (l(), d("button", {
                        key: Y.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + Y.fullName + " · 点击在插件内查看详情",
                        onClick: N((Ct) => $(Y.fullName), ["stop"])
                      }, [
                        e[36] || (e[36] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", is, C(Y.fullName), 1)
                      ], 8, ss))), 128))
                    ])) : R("", !0),
                    w.value === c.id ? Pt((l(), d("textarea", {
                      key: 2,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: y,
                      "onUpdate:modelValue": e[7] || (e[7] = (Y) => L.value = Y),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (Y) => be(Y, c),
                      onBlur: (Y) => oe(c, !0),
                      onClick: e[8] || (e[8] = N(() => {
                      }, ["stop"]))
                    }, null, 40, as)), [
                      [Nt, L.value]
                    ]) : (l(), d("p", ls, C(c.content || "未命名任务"), 1)),
                    Yt(c) ? (l(), d("p", rs, C(Yt(c)), 1)) : R("", !0),
                    tt(c) ? (l(), d("div", ds, [
                      c.startDate && !c.dueDate ? (l(), d("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + C(p(Ce)(c.startDate)) + " 起 ", 9, us)) : c.startDate && c.dueDate ? (l(), d("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + C(p(Ce)(c.startDate)) + " ~ " + C(p(Ce)(c.dueDate)), 9, cs)) : c.dueText ? (l(), d("span", {
                        key: 2,
                        class: q(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, C(c.isRecurring ? "↻ " : "▣ ") + C(c.dueText), 11, ps)) : R("", !0),
                      (l(!0), d(nt, null, ut((c.labels || []).slice(0, 3), (Y) => (l(), d("span", {
                        key: Y,
                        class: "todoist-board-label"
                      }, "◇ " + C(Y), 1))), 128)),
                      c.timedDeadlineText ? (l(), d("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + C(c.timedDeadlineText), 9, ms)) : R("", !0),
                      c.extraCountText ? (l(), d("span", vs, C(c.extraCountText), 1)) : R("", !0)
                    ])) : R("", !0),
                    se(c) ? (l(), d("div", {
                      key: 6,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: N((Y) => D(se(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: se(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, gs),
                      e[37] || (e[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, fs)) : R("", !0)
                  ])
                ], 46, Zn)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, Mn))), 128)),
          p(r).view === "inbox" || p(r).view === "projects" ? (l(), d("div", bs, [
            p(r).addingSection ? (l(), d("div", ks, [
              Pt(t("input", {
                "onUpdate:modelValue": e[11] || (e[11] = (s) => O.value = s),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  xt(N(ct, ["prevent"]), ["enter"]),
                  xt(ht, ["esc"])
                ]
              }, null, 40, ys), [
                [Nt, O.value]
              ]),
              t("div", { class: "todoist-add-section-actions" }, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: ct
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: ht
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
          ])) : R("", !0)
        ])
      ], 64)),
      k.isOpen && k.col ? (l(), d("div", {
        key: 6,
        class: "todoist-section-menu",
        style: ft({ left: k.x + "px", top: k.y + "px" }),
        onClick: e[16] || (e[16] = N(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: e[12] || (e[12] = (s) => ro(k.col, s))
        }, [...e[39] || (e[39] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        k.col.sectionId ? (l(), d("div", ws, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !k.canMoveLeft,
            title: "向左移动板块",
            onClick: e[13] || (e[13] = (s) => Ht(k.col, -1))
          }, "◀ 左移", 8, hs),
          e[40] || (e[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !k.canMoveRight,
            title: "向右移动板块",
            onClick: e[14] || (e[14] = (s) => Ht(k.col, 1))
          }, "右移 ▶", 8, Ts)
        ])) : R("", !0),
        k.col.sectionId ? (l(), d("div", Ds)) : R("", !0),
        k.col.sectionId ? (l(), d("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: e[15] || (e[15] = (s) => co(k.col, s))
        }, [...e[41] || (e[41] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : R("", !0)
      ], 4)) : R("", !0),
      v.isOpen && v.task ? (l(), d("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: ft({ left: v.x + "px", top: v.y + "px" }),
        role: "menu",
        onClick: e[23] || (e[23] = N(() => {
        }, ["stop"]))
      }, [
        t("div", xs, [
          t("span", Cs, C(v.task.content || "任务操作"), 1)
        ]),
        t("button", {
          type: "button",
          class: q(["todoist-task-menu-item", { active: v.activeSubpanel === "labels" }]),
          onClick: e[17] || (e[17] = (s) => ue("labels"))
        }, [
          e[42] || (e[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          e[43] || (e[43] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", $s, C(v.task.labels && v.task.labels.length ? `已选 ${v.task.labels.length}` : "无"), 1)
        ], 2),
        v.activeSubpanel === "labels" ? (l(), d("div", Ss, [
          t("div", Is, [
            Pt(t("input", {
              "onUpdate:modelValue": e[18] || (e[18] = (s) => v.newLabelText = s),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: xt(N(Me, ["prevent"]), ["enter"])
            }, null, 40, Rs), [
              [Nt, v.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Me
            }, "＋")
          ]),
          t("div", _s, [
            (l(!0), d(nt, null, ut(W.value, (s) => (l(), d("button", {
              key: s,
              type: "button",
              class: q(["todoist-label-chip", { selected: Pe(s) }]),
              onClick: (M) => to(s)
            }, [
              t("span", null, "◇ " + C(s), 1),
              Pe(s) ? (l(), d("span", Ps, "✓")) : R("", !0)
            ], 10, Ls))), 128))
          ])
        ])) : R("", !0),
        t("button", {
          type: "button",
          class: q(["todoist-task-menu-item", { active: v.activeSubpanel === "recur" }]),
          onClick: e[19] || (e[19] = (s) => ue("recur"))
        }, [
          e[44] || (e[44] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          e[45] || (e[45] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: ft(v.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, C(v.task.isRecurring ? v.task.dueString || "循环" : "无"), 5)
        ], 2),
        v.activeSubpanel === "recur" ? (l(), d("div", Ms, [
          t("div", Os, [
            (l(), d(nt, null, ut(Dt, (s) => t("button", {
              key: s.rule,
              type: "button",
              class: q(["todoist-recur-chip", { selected: eo(s.rule) }]),
              onClick: (M) => oo(s.rule, s.label)
            }, [
              t("span", null, C(s.icon), 1),
              t("span", null, C(s.label), 1)
            ], 10, As)), 64))
          ]),
          t("div", Es, [
            Pt(t("input", {
              "onUpdate:modelValue": e[20] || (e[20] = (s) => v.customRecurText = s),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: xt(N(Oe, ["prevent"]), ["enter"])
            }, null, 40, js), [
              [Nt, v.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Oe
            }, "确定")
          ]),
          v.task.isRecurring ? (l(), d("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: no
          }, "❌ 清除循环（转为单次任务）")) : R("", !0)
        ])) : R("", !0),
        t("button", {
          type: "button",
          class: q(["todoist-task-menu-item", { active: v.activeSubpanel === "color" }]),
          onClick: e[21] || (e[21] = (s) => ue("color"))
        }, [
          e[46] || (e[46] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          e[47] || (e[47] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", Ws, [
            I.value.id === "none" ? (l(), d("span", Us, "⊘")) : (l(), d("span", {
              key: 1,
              class: "todoist-color-dot",
              style: ft({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: I.value.hex
              })
            }, null, 4)),
            Et(" " + C(I.value.name), 1)
          ])
        ], 2),
        v.activeSubpanel === "color" ? (l(), d("div", zs, [
          t("div", Bs, [
            (l(), d(nt, null, ut(pt, (s) => t("button", {
              key: s.id,
              type: "button",
              class: q(["todoist-color-swatch", { selected: I.value.id === s.id }]),
              title: s.name,
              onClick: (M) => so(s.id)
            }, [
              t("span", {
                class: q(["todoist-color-dot", { none: s.id === "none" }]),
                style: ft(s.id !== "none" ? { background: s.hex } : {})
              }, C(s.id === "none" ? I.value.id === "none" ? "✓" : "⊘" : I.value.id === s.id ? "✓" : ""), 7),
              t("span", Ks, C(s.name), 1)
            ], 10, Hs)), 64))
          ])
        ])) : R("", !0),
        t("button", {
          type: "button",
          class: q(["todoist-task-menu-item", { active: v.activeSubpanel === "project" }]),
          onClick: e[22] || (e[22] = (s) => ue("project"))
        }, [...e[48] || (e[48] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        v.activeSubpanel === "project" ? (l(), d("div", {
          key: 3,
          class: q(["todoist-project-flyout", { "open-left": v.flyoutOpenLeft }]),
          style: ft(v.flyoutStyle)
        }, [
          (l(!0), d(nt, null, ut(p(r).projects, (s) => (l(), d("button", {
            key: s.id,
            type: "button",
            class: q(["todoist-project-flyout-item", { active: String(s.id) === wt.value }]),
            disabled: !!p(r).movingTaskId || String(s.id) === wt.value,
            onClick: (M) => io(s)
          }, [
            e[49] || (e[49] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Vs, C(s.name), 1),
            String(s.id) === wt.value ? (l(), d("span", Fs, "当前")) : R("", !0)
          ], 10, Ns))), 128))
        ], 6)) : R("", !0),
        e[51] || (e[51] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: ao
        }, [
          e[50] || (e[50] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Ys, C(v.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : R("", !0),
      h.isOpen && p(G).active ? (l(), d("div", {
        key: 8,
        class: "todoist-dialog-overlay",
        onClick: ce,
        onKeydown: xt(N(ce, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card is-draggable",
          style: ft({
            position: "fixed",
            left: `${h.x}px`,
            top: `${h.y}px`,
            width: "min(380px, calc(100vw - 32px))",
            margin: 0
          }),
          onClick: e[26] || (e[26] = N(() => {
          }, ["stop"]))
        }, [
          t("div", {
            class: "todoist-dialog-head",
            onPointerdown: e[24] || (e[24] = (s) => Ae("prompt", s))
          }, [
            e[52] || (e[52] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
            t("h3", Gs, C(h.title), 1),
            e[53] || (e[53] = t("span", {
              class: "todoist-dialog-drag-hint",
              title: "按住可拖动位置"
            }, "⋮⋮", -1))
          ], 32),
          t("div", qs, [
            h.message ? (l(), d("p", Qs, C(h.message), 1)) : R("", !0),
            Pt(t("input", {
              ref_key: "promptInputRef",
              ref: K,
              "onUpdate:modelValue": e[25] || (e[25] = (s) => h.value = s),
              type: "text",
              class: "todoist-dialog-input",
              placeholder: h.placeholder,
              onKeydown: xt(N(je, ["prevent"]), ["enter"])
            }, null, 40, Js), [
              [Nt, h.value]
            ])
          ]),
          t("div", Zs, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: ce
            }, "取消"),
            t("button", {
              type: "button",
              class: "todoist-dialog-btn primary",
              onClick: je
            }, C(h.confirmText || "确定"), 1)
          ])
        ], 4)
      ], 40, Xs)) : R("", !0),
      T.isOpen && p(G).active ? (l(), d("div", {
        key: 9,
        class: "todoist-dialog-overlay",
        onClick: pe,
        onKeydown: xt(N(pe, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card is-draggable",
          style: ft({
            position: "fixed",
            left: `${T.x}px`,
            top: `${T.y}px`,
            width: "min(380px, calc(100vw - 32px))",
            margin: 0
          }),
          onClick: e[28] || (e[28] = N(() => {
          }, ["stop"]))
        }, [
          t("div", {
            class: "todoist-dialog-head",
            onPointerdown: e[27] || (e[27] = (s) => Ae("confirm", s))
          }, [
            t("span", ei, C(T.icon || "⚠️"), 1),
            t("h3", oi, C(T.title), 1),
            e[54] || (e[54] = t("span", {
              class: "todoist-dialog-drag-hint",
              title: "按住可拖动位置"
            }, "⋮⋮", -1))
          ], 32),
          t("div", ni, [
            T.danger ? (l(), d("div", si, [
              t("div", ii, C(T.alertText), 1)
            ])) : R("", !0),
            t("p", ai, C(T.message), 1)
          ]),
          t("div", li, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: pe
            }, "取消"),
            t("button", {
              type: "button",
              class: q(["todoist-dialog-btn", T.danger ? "danger" : "primary"]),
              onClick: po
            }, C(T.confirmText || "确定"), 3)
          ])
        ], 4)
      ], 40, ti)) : R("", !0)
    ]));
  }
}), di = /* @__PURE__ */ Zt(ri, [["__scopeId", "data-v-30d4d0ea"]]), ui = {
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
  setup(i, { emit: n }) {
    const u = i, m = n, $ = u.value || (u.taskDate ? u.taskDate + "T" + (u.taskTime || "09:00") : ""), r = P($.slice(0, 10)), O = P($.slice(11, 16)), S = P(!1), E = P(""), V = P(!0), B = st(() => r.value && O.value ? (/* @__PURE__ */ new Date(r.value + "T" + O.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function z(j) {
      if (S.value) return;
      const w = /* @__PURE__ */ new Date();
      j === "tomorrow" ? (w.setDate(w.getDate() + 1), w.setHours(9, 0, 0, 0)) : w.setTime(w.getTime() + j * 6e4), r.value = `${w.getFullYear()}-${String(w.getMonth() + 1).padStart(2, "0")}-${String(w.getDate()).padStart(2, "0")}`, O.value = `${String(w.getHours()).padStart(2, "0")}:${String(w.getMinutes()).padStart(2, "0")}`, E.value = "", V.value = !0;
    }
    async function H(j) {
      if (!(S.value || G.pendingWrites)) {
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
    return (j, w) => (l(), Mt(Ie, {
      anchor: i.anchor,
      onClose: w[9] || (w[9] = (L) => m("close"))
    }, {
      default: ae(() => [
        t("section", ui, [
          w[11] || (w[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", ci, [
            t("button", {
              type: "button",
              onClick: w[0] || (w[0] = (L) => z(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: w[1] || (w[1] = (L) => z(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: w[2] || (w[2] = (L) => z("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: S.value }, [
            w[10] || (w[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            qt(Re, {
              modelValue: r.value,
              "onUpdate:modelValue": w[3] || (w[3] = (L) => r.value = L),
              "time-value": O.value,
              "onUpdate:timeValue": w[4] || (w[4] = (L) => O.value = L),
              embedded: "",
              onTimeValidity: w[5] || (w[5] = (L) => V.value = L)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, pi),
          t("div", mi, C(B.value || "选择提醒的日期和时间"), 1),
          w[12] || (w[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          E.value ? (l(), d("p", vi, C(E.value), 1)) : R("", !0),
          t("footer", null, [
            i.value ? (l(), d("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: S.value || !!p(G).pendingWrites,
              onClick: w[6] || (w[6] = (L) => H(""))
            }, "移除提醒", 8, fi)) : R("", !0),
            t("button", {
              type: "button",
              disabled: S.value,
              onClick: w[7] || (w[7] = (L) => m("close"))
            }, "取消", 8, gi),
            t("button", {
              type: "button",
              class: "save",
              disabled: S.value || !!p(G).pendingWrites || !r.value || !O.value || !V.value,
              onClick: w[8] || (w[8] = (L) => H(r.value + "T" + O.value))
            }, C(S.value ? "保存中…" : "设置提醒"), 9, bi)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), yi = /* @__PURE__ */ Zt(ki, [["__scopeId", "data-v-da9e3ddd"]]), wi = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, hi = { class: "inspector-main-col" }, Ti = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Di = {
  key: 1,
  class: "inspector-repo-badges"
}, xi = ["title", "onClick"], Ci = { class: "repo-badge-name" }, $i = { class: "inspector-section inspector-title-section" }, Si = { class: "task-title-row" }, Ii = {
  key: 0,
  class: "check-mark"
}, Ri = ["value", "disabled"], _i = ["value", "disabled"], Li = ["onKeydown"], Pi = {
  key: 0,
  class: "desc-placeholder-btn"
}, Mi = ["innerHTML"], Oi = {
  key: 2,
  role: "status"
}, Ai = {
  key: 3,
  class: "attached-img-grid"
}, Ei = ["onClick"], ji = ["src", "alt"], Wi = { class: "attached-img-info" }, Ui = ["onClick"], zi = { class: "inspector-section inspector-subtasks-section" }, Bi = {
  key: 0,
  class: "subtasks-list"
}, Hi = ["onClick"], Ki = {
  key: 0,
  class: "check-tick"
}, Ni = { class: "subtask-content-text" }, Vi = ["onClick"], Fi = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Yi = ["value"], Xi = { class: "subtask-actions" }, Gi = { class: "inspector-section inspector-comments-section" }, qi = { class: "comment-input-bar" }, Qi = { class: "comment-input-wrap" }, Ji = ["value", "disabled"], Zi = ["disabled"], ta = {
  key: 0,
  class: "comments-list"
}, ea = { class: "comment-item-content" }, oa = { class: "comment-item-header" }, na = { class: "comment-time" }, sa = { class: "comment-text" }, ia = {
  key: 0,
  class: "comment-attached-thumb"
}, aa = ["src", "onClick"], la = { class: "inspector-side-col" }, ra = { class: "side-prop-group date-picker-anchor" }, da = { class: "row-text" }, ua = { class: "side-prop-group date-picker-anchor" }, ca = { class: "row-text" }, pa = { class: "side-prop-group" }, ma = { class: "row-text" }, va = { class: "inspector-menu" }, fa = ["disabled", "onClick"], ga = { key: 0 }, ba = { class: "side-prop-group" }, ka = { class: "row-text" }, ya = { class: "inspector-menu" }, wa = ["onKeydown"], ha = { key: 0 }, Ta = {
  key: 1,
  role: "alert"
}, Da = { class: "label-options-list" }, xa = ["checked", "disabled", "onChange"], Ca = ["disabled"], $a = { key: 3 }, Sa = { class: "side-prop-group" }, Ia = { class: "row-text" }, Ra = /* @__PURE__ */ Ut({
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
    const u = i, m = n, $ = P(!1), r = P(null), O = P(null);
    let S;
    Jt(() => {
      let U = -1;
      S = new ResizeObserver((a) => {
        const f = a[0]?.contentRect.width;
        f !== U && (U = f, B(O.value), B(r.value));
      }), O.value?.parentElement && S.observe(O.value.parentElement);
    }), jt(() => S?.disconnect());
    const E = st(() => {
      if (!u.editDescription) return "";
      const U = u.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), a = document.createElement("template");
      a.innerHTML = Lo.renderMarkdown(U);
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
    function V() {
      $.value = !0, Rt(() => {
        B(r.value), r.value?.focus();
      });
    }
    function B(U) {
      U && (U.style.height = "auto", U.style.height = U.scrollHeight + "px");
    }
    function z(U) {
      B(U.el);
    }
    function H(U) {
      const a = U.target;
      B(a), m("update:editDescription", a.value), m("scheduleDraftSave", U);
    }
    function j() {
      m("saveTitleAndDesc"), $.value = !1;
    }
    const w = P(!1), L = P(!1), y = P(null), k = P(null), h = P(!1), K = P(!1), T = P(!1), v = P(""), rt = P(null), it = P(null), pt = P(null), Dt = P([]), wt = P(!1), x = P("");
    let W;
    dt(() => [u.state.taskId, K.value], async (U, a, f) => {
      if (W?.abort(), !K.value) return;
      const X = new AbortController();
      W = X, f(() => X.abort()), Dt.value = [], wt.value = !0, x.value = "";
      try {
        const St = await ot.getLabels(X.signal);
        X.signal.aborted || (Dt.value = St.map((Ot) => Ot.name));
      } catch {
        X.signal.aborted || (x.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        X.signal.aborted || (wt.value = !1);
      }
    });
    function I() {
      T.value = !0;
    }
    const A = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function F(U) {
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
    function tt(U) {
      h.value = !1, m("selectPriority", U);
    }
    const et = st(() => {
      const U = /* @__PURE__ */ new Set([...Dt.value, ...u.availableLabels || []]);
      for (const a of u.state.labels || []) U.add(a);
      return Array.from(U);
    }), at = st(() => {
      const U = v.value.trim().toLowerCase();
      return U ? et.value.filter((a) => a.toLowerCase().includes(U)) : et.value;
    });
    function gt() {
      const U = v.value.trim();
      U && (m("createLabel", U), v.value = "");
    }
    function J(U, a) {
      _e.open(U, a);
    }
    const bt = P(0);
    function mt() {
      bt.value++;
    }
    Jt(() => {
      window.addEventListener("storage", mt), window.addEventListener("todoist-repository-links-changed", mt);
    }), jt(() => {
      window.removeEventListener("storage", mt), window.removeEventListener("todoist-repository-links-changed", mt);
    });
    const Ft = st(() => (bt.value, Qe(u.state.taskId, u.editDescription)));
    function zt(U) {
      Je.open(U);
    }
    function Bt(U, a) {
      if (!U) return "";
      try {
        const f = U.split("-"), X = parseInt(f[1], 10), St = parseInt(f[2], 10), Ot = a ? ` ${a}` : "";
        return `${X}月${St}日${Ot}`;
      } catch {
        return U;
      }
    }
    function te(U) {
      if (!U) return "";
      try {
        const a = new Date(U);
        return `${a.getMonth() + 1}月${a.getDate()}日 ${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    function ee(U) {
      if (!U) return "刚刚";
      try {
        const a = new Date(U);
        return `${a.getMonth() + 1}月${a.getDate()}日 ${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    return (U, a) => i.state.isOpen ? (l(), d("div", wi, [
      t("main", hi, [
        i.state.error ? (l(), d("p", Ti, C(i.state.error), 1)) : R("", !0),
        Ft.value.length ? (l(), d("div", Di, [
          (l(!0), d(nt, null, ut(Ft.value, (f) => (l(), d("button", {
            key: f.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: "关联 GitHub 仓库：" + f.fullName + " · 点击在插件内查看详情",
            onClick: (X) => zt(f.fullName)
          }, [
            a[38] || (a[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", Ci, C(f.fullName), 1),
            a[39] || (a[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, xi))), 128))
        ])) : R("", !0),
        t("section", $i, [
          t("div", Si, [
            t("button", {
              type: "button",
              class: q(["task-complete-circle-btn", { completed: i.isTaskCompleted }]),
              title: "标记完成/撤销",
              onClick: a[0] || (a[0] = (f) => m("toggleComplete"))
            }, [
              i.isTaskCompleted ? (l(), d("span", Ii, "✓")) : R("", !0)
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
              class: q(["inspector-input-title", { "title-done": i.isTaskCompleted }]),
              placeholder: "任务标题",
              onInput: a[1] || (a[1] = (f) => {
                B(f.target), m("update:editTitle", f.target.value), m("scheduleDraftSave", f);
              }),
              onCompositionend: a[2] || (a[2] = (f) => m("scheduleDraftSave", f)),
              onBlur: a[3] || (a[3] = (f) => m("saveTitleAndDesc", f)),
              onKeydown: a[4] || (a[4] = xt(N((f) => m("saveTitleAndDesc", f), ["prevent"]), ["enter"]))
            }, null, 42, Ri)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: a[7] || (a[7] = N((f) => m("dragover"), ["prevent"])),
          onDragleave: a[8] || (a[8] = N((f) => m("dragleave"), ["prevent"])),
          onDrop: a[9] || (a[9] = N((f) => m("dropImage", f), ["prevent"]))
        }, [
          $.value ? (l(), d("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: r,
            value: i.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: "描述",
            disabled: i.isUploadingImg,
            onInput: H,
            onCompositionend: a[5] || (a[5] = (f) => m("scheduleDraftSave", f)),
            onBlur: j,
            onPaste: a[6] || (a[6] = (f) => m("descPaste", f))
          }, null, 40, _i)) : (l(), d("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: V,
            onKeydown: xt(N(V, ["prevent"]), ["enter"])
          }, [
            i.editDescription ? (l(), d("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: E.value
            }, null, 8, Mi)) : (l(), d("span", Pi, "≡ 描述"))
          ], 40, Li)),
          i.isUploadingImg ? (l(), d("small", Oi, "图片上传中…")) : R("", !0),
          i.attachedImages.length ? (l(), d("div", Ai, [
            (l(!0), d(nt, null, ut(i.attachedImages, (f) => (l(), d("div", {
              key: f.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (X) => J(f.url, f.name)
              }, [
                t("img", {
                  src: f.url,
                  alt: f.name,
                  loading: "lazy"
                }, null, 8, ji)
              ], 8, Ei),
              t("div", Wi, [
                t("span", null, C(f.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (X) => m("removeAttachedImage", f.url)
                }, "×", 8, Ui)
              ])
            ]))), 128))
          ])) : R("", !0)
        ], 32),
        t("section", zi, [
          i.subtasks.length > 0 ? (l(), d("div", Bi, [
            (l(!0), d(nt, null, ut(i.subtasks, (f) => (l(), d("div", {
              key: f.id,
              class: q(["subtask-row-item", { done: f.completed }])
            }, [
              t("button", {
                type: "button",
                class: q(["subtask-check-circle", { checked: f.completed }]),
                onClick: (X) => m("toggleSubtask", f.id)
              }, [
                f.completed ? (l(), d("span", Ki, "✓")) : R("", !0)
              ], 10, Hi),
              t("span", Ni, C(f.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: "删除子任务",
                onClick: (X) => m("removeSubtask", f.id)
              }, "×", 8, Vi)
            ], 2))), 128))
          ])) : R("", !0),
          i.isAddingSubtask ? (l(), d("div", Fi, [
            t("input", {
              value: i.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: "输入子任务并回车…",
              onInput: a[10] || (a[10] = (f) => m("update:newSubtaskText", f.target.value)),
              onKeydown: [
                a[11] || (a[11] = xt(N((f) => m("confirmAddSubtask"), ["prevent"]), ["enter"])),
                a[12] || (a[12] = xt((f) => m("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Yi),
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
            Et(" 添加子任务 ", -1)
          ])]))
        ]),
        (l(), Mt(_o, {
          key: i.state.taskId,
          "task-id": i.state.taskId
        }, null, 8, ["task-id"])),
        t("section", Gi, [
          t("div", qi, [
            a[41] || (a[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Qi, [
              t("input", {
                value: i.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: "评论…",
                disabled: i.isSubmittingComment,
                onInput: a[16] || (a[16] = (f) => m("update:newCommentText", f.target.value)),
                onKeydown: a[17] || (a[17] = xt(N((f) => m("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Ji),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: "上传照片附件",
                onClick: a[18] || (a[18] = N((f) => m("triggerFileInput"), ["stop"]))
              }, "📎")
            ]),
            i.newCommentText.trim() ? (l(), d("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: i.isSubmittingComment,
              onClick: a[19] || (a[19] = (f) => m("submitComment"))
            }, "发送", 8, Zi)) : R("", !0)
          ]),
          i.state.comments.length > 0 ? (l(), d("div", ta, [
            (l(!0), d(nt, null, ut(i.state.comments, (f) => (l(), d("div", {
              key: f.id,
              class: "comment-item"
            }, [
              a[43] || (a[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", ea, [
                t("div", oa, [
                  a[42] || (a[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", na, C(ee(f.postedAt)), 1)
                ]),
                t("div", sa, C(f.content), 1),
                f.attachment?.url ? (l(), d("div", ia, [
                  t("img", {
                    src: f.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (X) => J(f.attachment.url, f.attachment.name)
                  }, null, 8, aa)
                ])) : R("", !0)
              ])
            ]))), 128))
          ])) : R("", !0)
        ])
      ]),
      t("aside", la, [
        t("div", ra, [
          a[45] || (a[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: y,
            type: "button",
            class: q(["side-item-row click-row", { active: w.value, filled: !!i.editStartDate }]),
            onClick: a[21] || (a[21] = (f) => w.value = !w.value)
          }, [
            a[44] || (a[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", da, C(Bt(i.editStartDate, i.editStartTime) || "安排日期"), 1),
            i.editStartDate ? (l(), d("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: a[20] || (a[20] = N((f) => m("clearStartDate"), ["stop"]))
            }, "×")) : R("", !0)
          ], 2),
          w.value ? (l(), Mt(Re, {
            key: 0,
            "model-value": i.editStartDate,
            "time-value": i.editStartTime,
            "anchor-el": y.value,
            "onUpdate:modelValue": a[22] || (a[22] = (f) => m("update:editStartDate", f)),
            "onUpdate:timeValue": a[23] || (a[23] = (f) => m("update:editStartTime", f)),
            onChange: a[24] || (a[24] = (f) => m("startChange")),
            onClose: a[25] || (a[25] = (f) => w.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : R("", !0)
        ]),
        t("div", ua, [
          a[47] || (a[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: k,
            type: "button",
            class: q(["side-item-row click-row", { active: L.value, filled: !!i.editDueDate }]),
            onClick: a[27] || (a[27] = (f) => L.value = !L.value)
          }, [
            a[46] || (a[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", ca, C(Bt(i.editDueDate, i.editDueTime) || "设定截止"), 1),
            i.editDueDate ? (l(), d("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除截止时间",
              onClick: a[26] || (a[26] = N((f) => m("clearDueDate"), ["stop"]))
            }, "×")) : R("", !0)
          ], 2),
          L.value ? (l(), Mt(Re, {
            key: 0,
            "model-value": i.editDueDate,
            "time-value": i.editDueTime,
            "anchor-el": k.value,
            "onUpdate:modelValue": a[28] || (a[28] = (f) => m("update:editDueDate", f)),
            "onUpdate:timeValue": a[29] || (a[29] = (f) => m("update:editDueTime", f)),
            onChange: a[30] || (a[30] = (f) => m("dueChange")),
            onClose: a[31] || (a[31] = (f) => L.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : R("", !0)
        ]),
        t("div", pa, [
          a[49] || (a[49] = t("span", { class: "side-prop-label" }, "优先级", -1)),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: pt,
            type: "button",
            class: "side-item-row",
            onClick: a[32] || (a[32] = (f) => h.value = !0)
          }, [
            t("span", {
              style: ft({ color: F(i.state.priority) })
            }, "⚑", 4),
            t("span", ma, "P" + C(5 - i.state.priority), 1),
            a[48] || (a[48] = t("span", null, "⌄", -1))
          ], 512),
          h.value ? (l(), Mt(Ie, {
            key: 0,
            anchor: pt.value,
            onClose: a[33] || (a[33] = (f) => h.value = !1)
          }, {
            default: ae(() => [
              t("div", va, [
                (l(), d(nt, null, ut(A, (f) => t("button", {
                  key: f.level,
                  type: "button",
                  disabled: !!p(G).pendingWrites,
                  onClick: (X) => tt(f.level)
                }, [
                  t("span", {
                    style: ft({ color: f.color })
                  }, "⚑", 4),
                  Et(" " + C(f.name) + " ", 1),
                  i.state.priority === f.level ? (l(), d("span", ga, "✓")) : R("", !0)
                ], 8, fa)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : R("", !0)
        ]),
        t("div", ba, [
          a[51] || (a[51] = t("span", { class: "side-prop-label" }, "标签", -1)),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: rt,
            type: "button",
            class: "side-item-row",
            onClick: a[34] || (a[34] = (f) => K.value = !0)
          }, [
            t("span", ka, C(i.state.labels.join("、") || "添加标签"), 1),
            a[50] || (a[50] = t("span", null, "＋", -1))
          ], 512),
          K.value ? (l(), Mt(Ie, {
            key: 0,
            anchor: rt.value,
            onClose: a[36] || (a[36] = (f) => K.value = !1)
          }, {
            default: ae(() => [
              t("div", ya, [
                Pt(t("input", {
                  "onUpdate:modelValue": a[35] || (a[35] = (f) => v.value = f),
                  placeholder: "搜索或新建标签",
                  "aria-label": "搜索标签",
                  onKeydown: xt(N(gt, ["prevent"]), ["enter"])
                }, null, 40, wa), [
                  [Nt, v.value]
                ]),
                wt.value ? (l(), d("small", ha, "读取标签中…")) : R("", !0),
                x.value ? (l(), d("p", Ta, C(x.value), 1)) : R("", !0),
                t("div", Da, [
                  (l(!0), d(nt, null, ut(at.value, (f) => (l(), d("label", {
                    key: f,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + C(f), 1),
                    t("input", {
                      type: "checkbox",
                      checked: i.state.labels.includes(f),
                      disabled: !!p(G).pendingWrites,
                      onChange: (X) => m("toggleLabelSelect", f)
                    }, null, 40, xa)
                  ]))), 128))
                ]),
                v.value.trim() && !et.value.includes(v.value.trim()) ? (l(), d("button", {
                  key: 2,
                  type: "button",
                  disabled: !!p(G).pendingWrites,
                  onClick: gt
                }, "＋ 创建“" + C(v.value.trim()) + "”", 9, Ca)) : R("", !0),
                !wt.value && !at.value.length && !v.value ? (l(), d("small", $a, "暂无标签")) : R("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : R("", !0)
        ]),
        t("div", Sa, [
          a[53] || (a[53] = t("span", { class: "side-prop-label" }, [
            Et("提醒 "),
            t("small", null, "本机")
          ], -1)),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: it,
            type: "button",
            class: "side-item-row",
            onClick: I
          }, [
            t("span", Ia, C(te(i.state.reminderTime) || "添加提醒"), 1),
            a[52] || (a[52] = t("span", null, "＋", -1))
          ], 512),
          T.value ? (l(), Mt(yi, {
            key: 0,
            anchor: it.value,
            "task-id": i.state.taskId,
            value: i.state.reminderTime,
            "task-date": i.editStartDate || i.editDueDate,
            "task-time": i.editStartTime || i.editDueTime,
            onClose: a[37] || (a[37] = (f) => T.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : R("", !0)
        ])
      ])
    ])) : R("", !0);
  }
}), _a = /* @__PURE__ */ Zt(Ra, [["__scopeId", "data-v-3b157130"]]), La = { class: "inspector-title-row" }, Pa = ["title", "aria-label"], Ma = ["disabled"], Oa = ["href"], Aa = "todoistInspectorPositionV2", Ea = /* @__PURE__ */ Ut({
  __name: "TodoistInspectorDrawer",
  setup(i) {
    const n = b, u = st(() => Lt.get(n.taskId)), m = st(() => u.value?.status === "failed" ? "保存未确认" : u.value?.status === "saving" ? "正在保存…" : B.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), $ = st(() => [
      m.value,
      u.value?.status === "failed" ? u.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: r,
      headerRef: O,
      initialStyle: S,
      onHeaderPointerDown: E,
      onResizePointerDown: V
    } = Ge({
      windowId: "todoist-inspector",
      storageKey: Aa,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => n.isOpen && G.active
    }), B = P(""), z = P(""), H = P(""), j = P(""), w = P(""), L = P(""), y = P(!1), k = P(!1), h = P(null), K = P(!1), T = P(""), v = P(""), rt = P(!1), it = st(() => {
      const D = n.description || "", g = [], _ = D.split(`
`);
      let ct = 0;
      for (const ht of _) {
        const kt = ht.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        kt && g.push({
          id: `st_${ct++}`,
          completed: kt[1].toLowerCase() === "x",
          text: kt[2].trim()
        });
      }
      return g;
    }), pt = st(() => it.value.filter((D) => D.completed).length);
    function Dt(D) {
      const ct = (n.description || "").split(`
`).filter((Ht) => !Ht.match(/^\s*-\s*\[([ xX])\]/)), ht = D.map((Ht) => `- [${Ht.completed ? "x" : " "}] ${Ht.text}`), kt = [...ct, ...ht].join(`
`).trim();
      z.value = kt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), lt.saveTitleAndDesc(B.value, kt);
    }
    function wt() {
      if (!T.value.trim()) return;
      const D = [...it.value, {
        id: `st_${Date.now()}`,
        text: T.value.trim(),
        completed: !1
      }];
      T.value = "", K.value = !1, Dt(D);
    }
    function x(D) {
      const g = it.value.map((_) => _.id === D ? { ..._, completed: !_.completed } : _);
      Dt(g);
    }
    function W(D) {
      const g = it.value.filter((_) => _.id !== D);
      Dt(g);
    }
    const I = st(() => {
      for (const D of yt.columns || []) {
        const g = D.tasks.find((_) => _.id === n.taskId);
        if (g) return !!g.completed;
      }
      return !1;
    });
    async function A() {
      for (const D of yt.columns || []) {
        const g = D.tasks.find((_) => _.id === n.taskId);
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
    function F(D) {
      lt.setPriority(D);
    }
    function tt(D) {
      lt.toggleLabel(D);
    }
    function et(D) {
      lt.toggleLabel(D);
    }
    async function at(D) {
      D.trim() && (n.labels.includes(D.trim()) || await lt.createAndAttachLabel(D.trim()));
    }
    async function gt() {
      if (!v.value.trim() || rt.value) return;
      const D = v.value.trim();
      rt.value = !0;
      try {
        await lt.addComment(D), v.value = "";
      } finally {
        rt.value = !1;
      }
    }
    dt(() => n.title, (D) => {
      B.value = D || "";
    }, { immediate: !0 }), dt(() => n.description, (D) => {
      z.value = (D || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), dt(() => n.startDate, (D) => {
      H.value = D || "";
    }, { immediate: !0 }), dt(() => n.startTime, (D) => {
      j.value = D || "";
    }, { immediate: !0 }), dt(() => n.dueDate, (D) => {
      w.value = D || "";
    }, { immediate: !0 }), dt(() => n.dueTime, (D) => {
      L.value = D || "";
    }, { immediate: !0 });
    function J() {
      const D = /* @__PURE__ */ new Date();
      return `${D.getFullYear()}-${String(D.getMonth() + 1).padStart(2, "0")}-${String(D.getDate()).padStart(2, "0")}`;
    }
    function bt() {
      j.value && !H.value && (H.value = J()), lt.setStartDateAndTime(H.value, j.value);
    }
    function mt() {
      j.value = "", bt();
    }
    function Ft() {
      H.value = "", j.value = "", bt();
    }
    function zt() {
      L.value && !w.value && (w.value = J()), lt.setDueDateAndTime(w.value, L.value);
    }
    function Bt() {
      L.value = "", zt();
    }
    function te() {
      w.value = "", L.value = "", zt();
    }
    const ee = st(() => {
      const D = [], g = /* @__PURE__ */ new Set(), _ = n.description || "", ct = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let ht;
      for (; (ht = ct.exec(_)) !== null; ) {
        const kt = ht[2];
        g.add(kt), D.push({
          name: ht[1] || "任务照片",
          url: kt
        });
      }
      for (const kt of n.commentAttachments || [])
        g.has(kt.url) || (g.add(kt.url), D.push(kt));
      return D;
    });
    let U, a;
    function f() {
      const D = (n.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), g = [z.value.trim(), D].filter(Boolean);
      return {
        taskId: n.taskId,
        title: B.value,
        description: g.join(`

`)
      };
    }
    function X() {
      clearTimeout(U), U = void 0;
      const D = a;
      if (a = void 0, D?.taskId && D.title.trim())
        return lt.saveTitleAndDesc(D.title, D.description, D.taskId);
    }
    function St(D) {
      D && "isComposing" in D && D.isComposing || (a = f(), lt.stageTitleDraft(a.taskId, a.title, a.description), clearTimeout(U), U = setTimeout(X, 800));
    }
    dt(() => n.taskId, () => X(), { flush: "sync" });
    function Ot() {
      X(), lt.close();
    }
    function oe(D) {
      D && "isComposing" in D && D.isComposing || X();
    }
    function be() {
      a = f(), X();
    }
    function ke(D) {
      const g = It(D);
      g && (D.preventDefault(), D.stopPropagation(), Wt(g));
    }
    function ye() {
      G.active && h.value?.click();
    }
    async function re(D) {
      const g = D.target;
      if (!G.active) {
        g.value = "";
        return;
      }
      const _ = g.files?.[0];
      _ && await Wt(_), g.value = "";
    }
    async function ne(D) {
      k.value = !1;
      const g = D.dataTransfer?.files?.[0];
      g && (g.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(g.name)) && await Wt(g);
    }
    function It(D) {
      const g = D.clipboardData;
      if (!g) return null;
      if (g.files && g.files.length > 0)
        for (let _ = 0; _ < g.files.length; _++) {
          const ct = g.files[_];
          if (ct.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(ct.name))
            return ct;
        }
      if (g.items && g.items.length > 0)
        for (let _ = 0; _ < g.items.length; _++) {
          const ct = g.items[_];
          if (ct.type.includes("image")) {
            const ht = ct.getAsFile();
            if (ht) return ht;
          }
        }
      return null;
    }
    async function Wt(D) {
      if (y.value || !G.active || !n.taskId) return;
      const g = n.taskId;
      y.value = !0;
      try {
        if (await X(), n.taskId !== g || !n.isOpen || !G.active) return;
        await lt.attachImageToTask(D);
      } catch (_) {
        n.taskId === g && (n.error = _ instanceof Error ? _.message : "上传失败");
      } finally {
        y.value = !1;
      }
    }
    function de(D) {
      const g = It(D);
      g && (D.preventDefault(), Wt(g));
    }
    function Yt(D) {
      if (!n.isOpen || !G.active) return;
      const g = It(D);
      g && (D.preventDefault(), D.stopPropagation(), Wt(g));
    }
    dt(() => G.active, (D) => {
      window.removeEventListener("paste", Yt, { capture: !0 }), D && window.addEventListener("paste", Yt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), jt(() => {
      X(), window.removeEventListener("paste", Yt, { capture: !0 });
    });
    async function se(D) {
      const g = n.description || "", _ = D.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ct = g.replace(new RegExp(`!\\[[^\\]]*\\]\\(${_}\\)`, "g"), "").trim();
      await lt.saveTitleAndDesc(n.title, ct);
    }
    return (D, g) => Pt((l(), d("aside", {
      ref_key: "panelRef",
      ref: r,
      class: "todoist-inspector-window",
      style: ft(p(S)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: de
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: O,
        class: "inspector-header",
        onPointerdown: g[2] || (g[2] = (_) => p(E)(_))
      }, [
        t("div", La, [
          g[18] || (g[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          u.value ? (l(), d("div", {
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
            }, C(m.value), 9, Pa),
            u.value.status !== "saving" ? (l(), d("button", {
              key: 0,
              type: "button",
              disabled: p(n).saving || !B.value.trim(),
              onClick: N(be, ["stop"])
            }, C(u.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Ma)) : R("", !0)
          ], 32)) : R("", !0),
          p(n).url ? (l(), d("a", {
            key: 1,
            href: p(n).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Oa)) : R("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: g[1] || (g[1] = N(() => {
          }, ["stop"])),
          onClick: N(Ot, ["stop"])
        }, "×", 32)
      ], 544),
      p(n).isOpen ? (l(), Mt(_a, {
        key: p(n).taskId,
        state: p(n),
        "edit-title": B.value,
        "onUpdate:editTitle": g[3] || (g[3] = (_) => B.value = _),
        "edit-description": z.value,
        "onUpdate:editDescription": g[4] || (g[4] = (_) => z.value = _),
        "edit-start-date": H.value,
        "onUpdate:editStartDate": g[5] || (g[5] = (_) => H.value = _),
        "edit-start-time": j.value,
        "onUpdate:editStartTime": g[6] || (g[6] = (_) => j.value = _),
        "edit-due-date": w.value,
        "onUpdate:editDueDate": g[7] || (g[7] = (_) => w.value = _),
        "edit-due-time": L.value,
        "onUpdate:editDueTime": g[8] || (g[8] = (_) => L.value = _),
        "is-uploading-img": y.value,
        "is-drag-over": k.value,
        "is-task-completed": I.value,
        subtasks: it.value,
        "completed-subtasks-count": pt.value,
        "is-adding-subtask": K.value,
        "onUpdate:isAddingSubtask": g[9] || (g[9] = (_) => K.value = _),
        "new-subtask-text": T.value,
        "onUpdate:newSubtaskText": g[10] || (g[10] = (_) => T.value = _),
        "new-comment-text": v.value,
        "onUpdate:newCommentText": g[11] || (g[11] = (_) => v.value = _),
        "is-submitting-comment": rt.value,
        "attached-images": ee.value,
        "available-labels": p(yt).availableLabels || [],
        onScheduleDraftSave: St,
        onSaveTitleAndDesc: oe,
        onToggleComplete: A,
        onTriggerFileInput: ye,
        onDragover: g[12] || (g[12] = (_) => k.value = !0),
        onDragleave: g[13] || (g[13] = (_) => k.value = !1),
        onDropImage: ne,
        onDescPaste: ke,
        onRemoveAttachedImage: se,
        onToggleSubtask: x,
        onRemoveSubtask: W,
        onConfirmAddSubtask: wt,
        onSubmitComment: gt,
        onStartChange: bt,
        onClearStartDate: Ft,
        onClearStartTime: mt,
        onDueChange: zt,
        onClearDueDate: te,
        onClearDueTime: Bt,
        onSelectPriority: F,
        onToggleLabelSelect: tt,
        onRemoveLabel: et,
        onCreateLabel: at
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : R("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: h,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: re
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: g[14] || (g[14] = (_) => p(V)(_, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: g[15] || (g[15] = (_) => p(V)(_, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: g[16] || (g[16] = (_) => p(V)(_, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: g[17] || (g[17] = (_) => p(V)(_, "w"))
      }, null, 32)
    ], 36)), [
      [Se, p(n).isOpen]
    ]);
  }
}), ja = /* @__PURE__ */ Zt(Ea, [["__scopeId", "data-v-35222deb"]]), Wa = { class: "vue-todoist-workspace-wrapper" }, Ua = { class: "todoist-head-title-wrap" }, za = { id: "todoist-workspace-title" }, Ba = {
  id: "todoist-view-tabs",
  class: "todoist-view-tabs",
  "aria-label": "Todoist 视图"
}, Ha = {
  class: "muted small",
  role: "status"
}, Ka = ["aria-expanded"], Na = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Va = { class: "todoist-workspace-cal-area" }, Fa = { class: "todoist-workspace-task-area" }, Ya = "todoistWorkspacePosition", rl = /* @__PURE__ */ Ut({
  __name: "TodoistWorkspace",
  setup(i) {
    const n = P(!1), u = vo(() => import("./TodoistAccountSettings-Duun8Ppa.js")), m = P(!1), $ = P(!1), r = P(!document.hidden), O = P(!1), S = st(() => G.visible && r.value);
    G.session++, G.active = S.value, qe(
      () => S.value && !yt.movingTaskId,
      Qt,
      () => Q.loadWorkspace(void 0, void 0, !0)
    );
    let E = !1;
    const V = P(null), B = Do;
    function z() {
      H.value && (H.value.style.removeProperty("width"), H.value.style.removeProperty("height"), H.value.style.removeProperty("left"), H.value.style.removeProperty("top"), H.value.style.removeProperty("right"), H.value.style.removeProperty("bottom"), H.value.style.removeProperty("margin"), H.value.style.removeProperty("transform"));
    }
    dt(() => G.visible, (I) => {
      I && (B.isOpen = !0, G.active = r.value, Q.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: H,
      headerRef: j,
      initialStyle: w,
      stopInteractions: L,
      onHeaderPointerDown: y,
      onResizePointerDown: k,
      bringToFront: h
    } = Ge({
      windowId: "todoist",
      storageKey: Ya,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => S.value
    }), K = () => H.value;
    function T() {
      Qt(), ho(), To(), lt.cancelReads(), L(), window.removeEventListener("keydown", it);
    }
    const v = bo(T);
    function rt() {
      r.value = !document.hidden;
    }
    function it(I) {
      I.key === "Escape" && b.isOpen && (I.preventDefault(), I.stopPropagation(), lt.close());
    }
    dt(S, (I) => {
      G.active = I, I ? (window.addEventListener("keydown", it), E || (E = !0, Q.loadWorkspace()), Rt(() => {
        S.value && h();
      })) : T();
    }, { flush: "sync" }), dt(m, (I) => {
      I && ($.value = !0);
    }), dt([S, n, Ke], ([I, A, F]) => {
      if (!(!I || !A || !F) && (Ke.value = null, xo("todoist") === F.transition)) {
        if (G.pendingWrites || b.isOpen && b.taskId !== F.id) {
          $o.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        b.isOpen && b.taskId === F.id || lt.openTask(F.id);
      }
    }, { flush: "post" }), Jt(() => {
      n.value = !0, O.value && Rt(z), me.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: K }), document.addEventListener("visibilitychange", rt), S.value && (window.addEventListener("keydown", it), E || (E = !0, Q.loadWorkspace()), Be.refresh());
    }), jt(() => {
      ko(), v(), document.removeEventListener("visibilitychange", rt), me.unregister("todoist", K), lt.close(), Object.assign(b, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), Q.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), xe.updateState({ title: "收件箱", isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Be.update([]);
    });
    function pt() {
      xe.toggleCalendar();
    }
    function Dt() {
      xe.refresh();
    }
    function wt() {
      Q.updateState({ accountConfigured: !0 }), S.value && Q.loadWorkspace(void 0, void 0, !0);
    }
    function x() {
      me.minimize("todoist");
    }
    function W() {
      G.visible = !1, B.isOpen = !1, me.close("todoist");
    }
    return (I, A) => (l(), d("div", Wa, [
      Pt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: H,
        class: "card wide todoist-workspace",
        style: ft(p(w)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: j,
          class: "todoist-workspace-head",
          onPointerdown: A[4] || (A[4] = (F) => p(y)(F))
        }, [
          t("div", Ua, [
            A[10] || (A[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", za, C(p(B).title), 1)
          ]),
          t("nav", Ba, [
            qt(Po)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: q(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: p(B).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: pt
          }, " 📅 日历 ", 2),
          A[11] || (A[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Ha, C(p(G).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: V,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": m.value,
            onClick: A[0] || (A[0] = N((F) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Ka),
          $.value ? (l(), Mt(p(u), {
            key: 0,
            visible: S.value && m.value,
            anchor: V.value,
            onClose: A[1] || (A[1] = (F) => m.value = !1),
            onAccountSaved: wt
          }, null, 8, ["visible", "anchor"])) : R("", !0),
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
            onClick: N(x, ["stop"])
          }, " − ", 32),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: "隐藏窗口 (Esc)；Dock 退出释放窗口资源",
            onPointerdown: A[3] || (A[3] = N(() => {
            }, ["stop"])),
            onClick: N(W, ["stop"])
          }, " ✕ ", 32)
        ], 544),
        p(yt).accountConfigured === !1 ? (l(), Mt(Co, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: A[5] || (A[5] = (F) => m.value = !0)
        })) : (l(), d("div", Na, [
          Pt(t("div", Va, [
            qt(gn)
          ], 512), [
            [Se, p(B).isCalendarOpen]
          ]),
          t("div", Fa, [
            qt(di)
          ])
        ])),
        qt(ja),
        A[12] || (A[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        O.value ? R("", !0) : (l(), d(nt, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: A[6] || (A[6] = (F) => p(k)(F, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: A[7] || (A[7] = (F) => p(k)(F, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: A[8] || (A[8] = (F) => p(k)(F, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: A[9] || (A[9] = (F) => p(k)(F, "w"))
          }, null, 32)
        ], 64))
      ], 4), [
        [Se, p(G).visible]
      ])
    ]));
  }
});
export {
  rl as default
};
