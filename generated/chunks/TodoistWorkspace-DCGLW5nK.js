import { d as zt, o as r, g as u, F as it, h as t, u as e, C as Z, t as m, r as Qt, z as Ut, w as ct, D as te, p as Wt, j as dt, k as K, i as C, b as P, N as to, I as Ve, B as bt, y as lt, G as It, n as Mt, q as Kt, s as Jt, f as ie, m as St, e as Ot, A as Re, E as To } from "./vendor-vue-FFI3kJnP.js";
import { a as Do, t as J, w as xo, o as Co, p as $o } from "./module-state-GmAjQSzX.js";
import { b as Ke, h as Fe, i as Zt, j as kt, e as tt, d as gt, c as So, k as _o, t as Ye, g as Se, l as Io, m as Ro, n as Lo } from "./calendar.service-DE6FKh8O.js";
import { u as eo } from "./useWindowDraggable-CiS0PRk-.js";
import { w as ce, b as Po } from "./window-manager.store-BD4IokhA.js";
import { t as f, _ as ee } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { A as Mo } from "./AccountSetupGuide-ZDGhjuNx.js";
import { i as Me } from "./image-viewer-store-3m5L-ber.js";
import { d as Oo, n as Ao } from "./view-styles-Dl5Su5-d.js";
import { t as at, d as jo, s as Eo, b as ue, g as Xe, f as _e, p as Wo } from "./todoist.service-CDSsgWpW.js";
import { u as oo, g as no, T as Uo } from "./TaskRepositoryLinks-DZO_KChE.js";
import { g as Bo } from "./bili-video-links-DXpyplJq.js";
import { g as zo } from "./web-site-links-BSIympLj.js";
import { A as so } from "./search.service-DacqWPJU.js";
import { I as Le, T as Pe } from "./TodoistDatePickerPopover-DjMS5BKL.js";
import { m as Ho } from "./core-utils-Ccz-tarm.js";
import { pendingTodoistTask as Ge } from "./task-navigation-C1h9ClKd.js";
const No = ["title"], Vo = { class: "todoist-tab-text" }, Ko = ["title"], Fo = { class: "todoist-tab-text" }, Yo = /* @__PURE__ */ zt({
  __name: "TodoistWorkspaceTabs",
  setup(l) {
    return (s, p) => (r(), u(it, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: Z({ on: e(Fe).view === "inbox" }),
        title: e(f)("todoist.inbox"),
        onClick: p[0] || (p[0] = (v) => e(Ke).switchView("inbox"))
      }, [
        p[2] || (p[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", Vo, m(e(f)("todoist.inbox")), 1)
      ], 10, No),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: Z({ on: e(Fe).view === "projects" }),
        title: e(f)("todoist.projects"),
        onClick: p[1] || (p[1] = (v) => e(Ke).switchView("projects"))
      }, [
        p[3] || (p[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", Fo, m(e(f)("todoist.projects")), 1)
      ], 10, Ko)
    ], 64));
  }
}), io = "todoist_reminder_v2:", Xo = "todoist_remind_";
async function Go(l) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const s = io + l, p = await chrome.storage.local.get([s, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(p, s) ? p[s] || void 0 : p.todoist_reminders_map_v1?.[l];
}
async function qo(l, s, p) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const v = new Date(s).getTime();
  if (s && (!Number.isFinite(v) || v <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (s && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const x = io + l, D = Xo + l;
  await chrome.alarms.clear(D), await chrome.storage.local.set({ [x]: s ? { time: s, title: p } : null }), s && await chrome.alarms.create(D, { when: v });
}
const Pt = Qt(/* @__PURE__ */ new Map());
let Qo = 0;
function qe(l, s, p, v = "editing") {
  const x = ++Qo;
  return Pt.set(l, { revision: x, title: s, description: p, status: v, error: "" }), x;
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
let Ie = Promise.resolve(), pe = 0, Qe = Promise.resolve();
const me = /* @__PURE__ */ new Map();
let ae = 0;
const Ft = /* @__PURE__ */ new Map();
function se(l = !0) {
  l && ae++;
  for (const s of Ft.values()) s.abort();
  Ft.clear(), k.loading = !1;
}
function Je(l) {
  Ft.get(l)?.abort();
  const s = new AbortController();
  Ft.set(l, s);
  const p = ae, v = k.taskId;
  return {
    signal: s.signal,
    current: () => !s.signal.aborted && p === ae && k.isOpen && v === k.taskId && Ft.get(l) === s,
    finish: () => {
      Ft.get(l) === s && Ft.delete(l);
    }
  };
}
function Et() {
  se(!1);
  const l = k.taskId, s = ae;
  return { taskId: l, current: () => k.isOpen && s === ae && l === k.taskId };
}
function Jo(l) {
  return new Promise((s) => {
    const p = new FileReader();
    p.onload = () => s(p.result || ""), p.onerror = () => s(""), p.readAsDataURL(l);
  });
}
function Ze(l, s, p) {
  for (const v of kt.columns)
    for (const x of v.tasks)
      String(x.id) === l && (x.content = s, p !== void 0 && (x.description = p), x._taskRaw && (x._taskRaw.content = s, p !== void 0 && (x._taskRaw.description = p)));
  gt.updateTaskTitle(l, s);
}
const Zo = {
  state: k,
  cancelReads: se,
  stageTitleDraft(l, s, p) {
    l && (qe(l, s, p), se(!1), k.taskId === l && (k.title = s), Ze(l, s, p));
  },
  async openTask(l, s) {
    if (!l) return;
    if (se(), k.taskId = l, k.isOpen = !0, k.error = "", Object.assign(k, {
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
      const D = ue(s.due?.datetime || s.due?.date || s.dueDate || "");
      k.dueDate = D.date, k.dueTime = D.time;
      const B = s.startDate || Xe(l, k.description), I = ue(B);
      k.startDate = I.date, k.startTime = I.time, k.labels = [...s.labels || []], k.url = s.url || "";
    }
    const p = Pt.get(l);
    p && (k.title = p.title, k.description = p.description);
    const v = Je("reminder");
    Go(l).then((D) => {
      v.current() && (k.reminderTime = D?.time || "");
    }).catch(() => {
      v.current() && (k.error = "本机提醒读取失败。");
    }).finally(v.finish);
    const x = Je("detail");
    k.loading = !0;
    try {
      const D = await at.api(`/tasks/${encodeURIComponent(l)}`, { signal: x.signal });
      if (D && x.current()) {
        const B = Pt.get(l);
        k.title = B?.title ?? D.content ?? "", k.description = B?.description ?? D.description ?? "", k.priority = D.priority || 1;
        const I = ue(D.due?.datetime || D.due?.date || "");
        k.dueDate = I.date, k.dueTime = I.time;
        const F = Xe(l, D.description || k.description), T = ue(F);
        k.startDate = T.date, k.startTime = T.time, k.labels = [...D.labels || []], k.url = D.url || "";
        try {
          const Y = await at.getComments(l, x.signal);
          if (Y && x.current()) {
            const V = [], H = [];
            for (const A of Y) {
              let y;
              if (A?.attachment?.file_url) {
                const $ = A.attachment.file_name || "附件图片";
                V.push({ name: $, url: A.attachment.file_url }), y = { name: $, url: A.attachment.file_url };
              }
              H.push({
                id: A.id,
                content: A.content || "",
                postedAt: A.posted_at || "",
                attachment: y
              });
            }
            if (k.commentAttachments = V, k.comments = H, V.length > 0 && k.description) {
              let A = k.description, y = !1;
              for (const $ of V) {
                const h = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                h.test(A) && (A = A.replace(h, `$1${$.url}$2`), y = !0);
              }
              if (y && !Pt.has(l)) {
                k.description = A;
                for (const $ of kt.columns) {
                  const h = $.tasks.find((L) => String(L.id) === l);
                  if (h) {
                    h.description = A, h._taskRaw && (h._taskRaw.description = A);
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
      x.current() && (k.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      x.current() && (k.loading = !1), x.finish();
    }
  },
  close() {
    se(), k.isOpen = !1, k.taskId = "";
  },
  async setStartDateAndTime(l, s) {
    if (!k.taskId) return;
    const p = Et(), v = l.trim(), x = v ? s.trim() : "";
    k.startDate = v, k.startTime = x, Zt();
    const D = jo(v, x);
    Eo(p.taskId, D), at.invalidateWorkspaceSnapshots();
    for (const B of kt.columns) {
      const I = B.tasks.find((F) => F.id === p.taskId);
      I && (I.startDate = D);
    }
  },
  async setDueDateAndTime(l, s) {
    if (!k.taskId) return;
    const p = Et(), v = l.trim(), x = v ? s.trim() : "";
    k.dueDate = v, k.dueTime = x, Zt(), at.invalidateWorkspaceSnapshots();
    const D = (me.get(p.taskId) || 0) + 1;
    me.set(p.taskId, D);
    const B = Qe.then(async () => {
      try {
        const I = await at.updateTask(p.taskId, {
          due_string: v ? x ? `${v} ${x}` : v : "no date"
        });
        if (me.get(p.taskId) !== D) return;
        const F = at.mapTasks([I], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const T of kt.columns) {
          const Y = T.tasks.findIndex((H) => H.id === p.taskId);
          if (Y < 0) continue;
          const V = T.tasks[Y];
          if (Object.assign(V, {
            dueDate: F.dueDate,
            dueText: F.dueText,
            dueString: F.dueString,
            isDueToday: F.isDueToday,
            isOverdue: F.isOverdue,
            isRecurring: F.isRecurring
          }), V._taskRaw && (V._taskRaw.due = I.due), kt.view === "today") {
            const H = F.isOverdue ? "overdue" : F.isDueToday ? "today" : "";
            H !== T.sectionId && (T.tasks.splice(Y, 1), kt.columns.find((A) => A.sectionId === H)?.tasks.push(V));
          }
        }
        p.current() && (k.error = "");
      } catch {
        p.current() && me.get(p.taskId) === D && (k.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Qe = B.catch(() => {
    }), await B;
  },
  async saveTitleAndDesc(l, s, p = k.taskId) {
    const v = p === k.taskId ? Et() : { taskId: p, current: () => !1 };
    if (!v.taskId || !l.trim()) return;
    const x = l.trim(), D = s.trim(), B = qe(p, x, D, "saving");
    v.current() && (k.title = x, k.description = D), Ze(v.taskId, x, D), pe++, k.saving = !0;
    const I = Ie.then(async () => {
      try {
        await at.updateTask(v.taskId, {
          content: x,
          description: D
        }), Pt.get(p)?.revision === B && Pt.delete(p), pe === 1 && Pt.size === 0 && tt.dispatch("refresh");
      } catch (F) {
        const T = Pt.get(p);
        T?.revision === B && (T.status = "failed", T.error = F instanceof Error ? F.message : "保存未确认");
      } finally {
        pe--, k.saving = pe > 0;
      }
    });
    Ie = I.catch(() => {
    }), await I;
  },
  async attachImageToTask(l) {
    const s = Et();
    if (await Ie, !s.current()) return;
    if (Pt.has(s.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const p = k.description || "";
    if (!s.taskId || k.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    k.saving = !0;
    try {
      const v = l.name || `截图_${Date.now()}.png`;
      let x = "";
      try {
        const D = await at.uploadFile(l, v);
        D && D.file_url && (x = D.file_url);
      } catch (D) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", D), l.size <= 2.5 * 1024 * 1024)
          x = await Jo(l);
        else
          throw new Error(D?.message || "云端上传失败且文件超过2.5MB");
      }
      if (x) {
        const D = p ? `${p}

![${v}](${x})` : `![${v}](${x})`;
        await at.updateTask(s.taskId, {
          description: D
        }), s.current() && (k.description = D);
        for (const B of kt.columns) {
          const I = B.tasks.find((F) => String(F.id) === s.taskId);
          if (I) {
            I.description = D, I._taskRaw && (I._taskRaw.description = D);
            break;
          }
        }
        tt.dispatch("refresh");
      }
    } catch (v) {
      s.current() && (k.error = v.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${v.message}`);
    } finally {
      k.saving = !1;
    }
  },
  async setPriority(l) {
    if (!k.taskId) return;
    const s = Et();
    if (![1, 2, 3, 4].includes(l)) return;
    const p = k.priority;
    k.priority = l, Zt(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { priority: l });
      for (const v of kt.columns) {
        const x = v.tasks.find((D) => D.id === s.taskId);
        x && (x.priority = l, x._taskRaw && (x._taskRaw.priority = l));
      }
    } catch {
      s.current() && (k.priority = p, k.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(l) {
    if (!k.taskId) return;
    const s = Et(), p = [...k.labels], x = p.includes(l) ? p.filter((D) => D !== l) : [...p, l];
    k.labels = x, Zt(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { labels: x });
      for (const D of kt.columns) {
        const B = D.tasks.find((I) => I.id === s.taskId);
        B && (B.labels = x, B._taskRaw && (B._taskRaw.labels = x));
      }
    } catch {
      s.current() && (k.labels = p, k.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(l) {
    const s = Et();
    if (l = l.trim(), !(!s.taskId || !l))
      try {
        const p = await at.getLabels();
        if (!s.current()) return;
        p.some((v) => v.name === l) || await at.createLabel(l), s.current() && !k.labels.includes(l) && await this.toggleLabel(l);
      } catch {
        s.current() && (k.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(l) {
    if (!k.taskId || !l.trim()) return;
    const s = Et();
    try {
      const p = await at.addComment({
        task_id: s.taskId,
        content: l.trim()
      });
      p && s.current() && k.comments.push({
        id: p.id || `c_${Date.now()}`,
        content: p.content || l.trim(),
        postedAt: p.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (p) {
      s.current() && (k.error = "发送评论失败：" + (p?.message || ""));
    }
  },
  async setReminder(l) {
    const s = Et();
    if (s.taskId)
      try {
        await qo(s.taskId, l, k.title), s.current() && (k.reminderTime = l, k.error = "");
      } catch (p) {
        s.current() && (k.error = p instanceof Error ? p.message : "提醒未保存，请重试。");
      }
  }
}, rt = Do(Zo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime",
  "setPriority",
  "toggleLabel",
  "setReminder",
  "addComment",
  "createAndAttachLabel"
]), tn = ["aria-label"], en = { class: "todoist-cal-head" }, on = { class: "todoist-cal-title-row" }, nn = { class: "todoist-cal-logo" }, sn = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, an = { class: "todoist-cal-head-actions" }, ln = { class: "todoist-cal-nav" }, rn = { class: "todoist-cal-nav-group" }, dn = ["title"], cn = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, un = ["title"], pn = { class: "todoist-cal-nav-group" }, mn = ["title"], fn = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, vn = ["title"], gn = { class: "todoist-cal-weekdays" }, bn = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, kn = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], yn = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, hn = { class: "todoist-cal-agenda" }, wn = { class: "todoist-cal-agenda-head" }, Tn = { class: "todoist-cal-agenda-title" }, Dn = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, xn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, Cn = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, $n = ["disabled"], Sn = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, _n = {
  key: 0,
  class: "todoist-cal-empty"
}, In = {
  key: 1,
  class: "todoist-cal-empty"
}, Rn = ["onClick"], Ln = { class: "todoist-cal-todo-main" }, Pn = ["disabled", "title", "onClick"], Mn = {
  key: 0,
  class: "check-icon"
}, On = {
  key: 0,
  class: "todoist-cal-task-time"
}, An = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, jn = ["title", "onClick"], En = ["src", "alt"], Wn = { class: "todoist-cal-thumb-tag" }, Un = /* @__PURE__ */ zt({
  __name: "TodoistCalendarSidebar",
  setup(l) {
    const s = _o;
    oo(
      () => J.active,
      () => gt.invalidateReads(),
      () => gt.loadTodosForDate(s.selectedDate, !0)
    ), Ut(() => gt.cancelReads()), ct(() => [J.active, J.pendingWrites], ([y, $], h) => {
      if (!y || $) {
        gt.cancelReads();
        return;
      }
      gt.loadTodosForDate(s.selectedDate, !!h?.[1]);
    }, { immediate: !0, flush: "sync" });
    function p(y) {
      gt.toggleTodoItem(y);
    }
    function v(y) {
      rt.openTask(y.id, y);
    }
    te(() => {
      So.syncSidebarToVue();
    });
    function x() {
      gt.dispatch("today");
    }
    function D() {
      gt.dispatch("prev-month");
    }
    function B() {
      gt.dispatch("next-month");
    }
    function I() {
      gt.dispatch("prev-year");
    }
    function F() {
      gt.dispatch("next-year");
    }
    function T(y) {
      gt.dispatch("select-date", y);
    }
    function Y(y, $) {
      gt.dispatch("context-date", {
        date: y,
        clientX: $.clientX,
        clientY: $.clientY
      });
    }
    function V(y, $) {
      const h = Array.from($.dataTransfer?.types || []);
      (h.includes("application/x-todoist-task-id") || h.includes("text/plain")) && ($.preventDefault(), $.dataTransfer && ($.dataTransfer.dropEffect = "copy"));
    }
    function H(y) {
    }
    function A(y, $) {
      const h = $.dataTransfer?.getData("application/x-todoist-task-id") || $.dataTransfer?.getData("text/plain");
      h && ($.preventDefault(), $.stopPropagation(), gt.dispatch("drop-task", { taskId: h, date: y }));
    }
    return (y, $) => (r(), u("aside", {
      id: "todoist-calendar-sidebar",
      class: Z(["todoist-calendar-sidebar", { collapsed: e(s).collapsed }]),
      "aria-label": e(f)("todoist.calendar.sidebarLabel")
    }, [
      t("div", en, [
        t("div", on, [
          t("span", nn, [
            $[1] || ($[1] = Wt("📅 ", -1)),
            t("strong", null, m(e(f)("todoist.calendar.title")), 1)
          ]),
          t("span", sn, m(e(s).badgeText), 1)
        ]),
        t("div", an, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: x
          }, m(e(f)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", ln, [
        t("div", rn, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.prevMonth"),
            onClick: D
          }, "‹", 8, dn),
          t("span", cn, m(e(s).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.nextMonth"),
            onClick: B
          }, "›", 8, un)
        ]),
        t("div", pn, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.prevYear"),
            onClick: I
          }, "‹", 8, mn),
          t("span", fn, m(e(s).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.nextYear"),
            onClick: F
          }, "›", 8, vn)
        ])
      ]),
      t("div", gn, [
        t("span", null, m(e(f)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, m(e(f)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, m(e(f)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, m(e(f)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, m(e(f)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, m(e(f)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, m(e(f)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", bn, [
        (r(!0), u(it, null, dt(e(s).cells, (h) => (r(), u("button", {
          key: h.date,
          type: "button",
          class: Z(["todoist-cal-cell", {
            outside: h.isOutside,
            today: h.isToday,
            selected: h.isSelected
          }]),
          "data-date": h.date,
          role: "gridcell",
          title: h.title,
          onClick: (L) => T(h.date),
          onContextmenu: K((L) => Y(h.date, L), ["prevent"]),
          onDragover: (L) => V(h.date, L),
          onDragleave: (L) => (h.date, void 0),
          onDrop: (L) => A(h.date, L)
        }, [
          t("span", null, m(h.dayNumber), 1),
          h.hasDot ? (r(), u("span", yn)) : C("", !0)
        ], 42, kn))), 128))
      ]),
      t("div", hn, [
        t("div", wn, [
          t("strong", Tn, m(e(s).agendaTitle), 1),
          t("span", Dn, m(e(f)("todoist.calendar.itemCount", { count: e(s).todoItems.length })), 1)
        ]),
        e(s).writeError ? (r(), u("p", xn, m(e(s).writeError), 1)) : C("", !0),
        e(s).emptyText ? (r(), u("div", Cn, [
          Wt(m(e(s).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(s).todoLoading || e(J).pendingWrites > 0,
            onClick: $[0] || ($[0] = (h) => e(gt).loadTodosForDate(e(s).selectedDate, !0))
          }, m(e(f)("todoist.calendar.retryLoad")), 9, $n)
        ])) : C("", !0),
        t("div", Sn, [
          e(s).todoLoading && !e(s).todoItems.length ? (r(), u("div", _n, m(e(f)("todoist.calendar.loading")), 1)) : e(s).todoItems.length === 0 && !e(s).emptyText ? (r(), u("div", In, m(e(f)("todoist.calendar.emptyDay")), 1)) : (r(!0), u(it, { key: 2 }, dt(e(s).todoItems, (h) => (r(), u("div", {
            key: h.id,
            class: Z(["todoist-cal-todo-card", { completed: h.completed }]),
            onClick: (L) => v(h)
          }, [
            t("div", Ln, [
              t("button", {
                type: "button",
                class: Z(["todoist-cal-check", { checked: h.completed }]),
                disabled: e(J).pendingWrites > 0,
                title: h.completed ? e(f)("todoist.calendar.clickToReopen") : e(f)("todoist.calendar.clickToComplete"),
                onClick: K((L) => p(h), ["stop"])
              }, [
                h.completed ? (r(), u("span", Mn, "✓")) : C("", !0)
              ], 10, Pn),
              t("span", {
                class: Z(["todoist-cal-todo-title", { strike: h.completed }])
              }, m(h.content), 3),
              h.time ? (r(), u("small", On, m(h.time), 1)) : C("", !0),
              h.completed ? (r(), u("span", An, m(e(f)("todoist.calendar.completedTag")), 1)) : C("", !0)
            ]),
            h.thumbUrl ? (r(), u("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(f)("todoist.calendar.viewPhoto"),
              onClick: K((L) => e(Me).open(h.thumbUrl, h.content), ["stop"])
            }, [
              t("img", {
                src: h.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(f)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, En),
              t("span", Wn, m(e(f)("todoist.calendar.photoTag")), 1)
            ], 8, jn)) : C("", !0)
          ], 10, Rn))), 128))
        ])
      ])
    ], 10, tn));
  }
}), Bn = /* @__PURE__ */ ee(Un, [["__scopeId", "data-v-6114d4da"]]);
function zn(l) {
  const s = l.state, p = P(null), v = P(null), x = P(null), D = P(!1), B = to(null), I = P(), F = /* @__PURE__ */ new Map();
  function T(a) {
    F.clear();
    const z = a.closest(".todoist-board");
    if (z)
      for (const R of z.querySelectorAll(".todoist-board-list")) {
        const W = s.columns[Number(R.dataset.groupIndex)];
        if (!W) continue;
        const X = R.__todoistSlots;
        if (!X) continue;
        const ot = X(), ut = ot.filter((pt) => pt.id !== L?.id);
        F.set(W, { list: R, rows: ut, read: X, snapshot: ot });
      }
  }
  let Y = 0, V;
  function H(a, z) {
    V = { clientY: a.clientY, col: z }, !Y && (Y = requestAnimationFrame(() => {
      Y = 0;
      const R = V;
      V = void 0, R && A(R, R.col);
    }));
  }
  function A(a, z) {
    if (!L || s.movingTaskId) return;
    const R = F.get(z);
    if (!R) return;
    const W = R.read();
    W !== R.snapshot && (R.snapshot = W, R.rows = W.filter((nt) => nt.id !== L?.id));
    const X = a.clientY - R.list.getBoundingClientRect().top + R.list.scrollTop;
    let ot = 0, ut = R.rows.length;
    for (; ot < ut; ) {
      const nt = ot + ut >>> 1;
      X < R.rows[nt].middle ? ut = nt : ot = nt + 1;
    }
    let pt = ot;
    if (v.value === s.columns.indexOf(z)) {
      const nt = I.value ? R.rows.findIndex((wt) => wt.id === I.value) : R.rows.length;
      nt >= 0 && pt > nt && X < R.rows[nt].middle + 10 && (pt = nt), nt > 0 && pt < nt && X > R.rows[nt - 1].middle - 10 && (pt = nt);
    }
    const mt = R.rows[pt]?.id;
    h(z, mt), v.value === s.columns.indexOf(z) && (x.value = mt || R.rows[R.rows.length - 1]?.id || null, D.value = !mt);
  }
  function y(a) {
    return a === B.value;
  }
  function $(a, z) {
    if (z !== v.value || !B.value) return a.tasks;
    const R = [...a.tasks], W = I.value ? R.findIndex((X) => X.id === I.value) : -1;
    return R.splice(W < 0 ? R.length : W, 0, B.value), R;
  }
  function h(a, z) {
    if (!L || !U) return;
    if (s.view === "today" && a.sectionId === "overdue" && U.sectionId !== "overdue") {
      v.value = null;
      return;
    }
    const R = z ? a.tasks.find((ot) => ot.id === z) : void 0, W = a === U ? String(L._taskRaw?.parent_id || "") : "";
    if (R && s.view !== "today" && String(R._taskRaw?.parent_id || "") !== W) {
      v.value = null;
      return;
    }
    const X = s.columns.indexOf(a);
    X < 0 || (I.value = z, v.value = X);
  }
  let L = null, U = null;
  function G(a, z, R, W) {
    if (!l.isActive() || s.loading || s.movingTaskId || s.moveNeedsRefresh || z.completed || z.id.startsWith("optimistic-") || l.editingTaskId() === z.id) {
      a.preventDefault();
      return;
    }
    if (a.stopPropagation(), l.closePopovers(), p.value = z.id, L = z, U = R, B.value = { ...z }, T(a.currentTarget), a.dataTransfer) {
      a.dataTransfer.effectAllowed = "move";
      const X = a.currentTarget, ot = X.getBoundingClientRect();
      a.dataTransfer.setDragImage(
        X,
        Math.max(0, Math.min(ot.width, a.clientX - ot.left)),
        Math.max(0, Math.min(ot.height, a.clientY - ot.top))
      ), a.dataTransfer.clearData(), a.dataTransfer.setData("application/x-todoist-task-id", z.id), a.dataTransfer.setData("application/x-logicweaver-todoist-task", z.id), a.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: z.id, sectionId: R.sectionId }));
    }
  }
  function q() {
    cancelAnimationFrame(Y), Y = 0, V = void 0, p.value = null, v.value = null, x.value = null, D.value = !1, L = null, U = null, B.value = null, I.value = void 0, F.clear();
  }
  function E(a, z) {
    !L || s.movingTaskId || (a.preventDefault(), a.stopPropagation(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), H(a, s.columns[z]));
  }
  function M(a, z) {
    a.currentTarget?.contains(a.relatedTarget);
  }
  function et(a, z, R, W) {
    a.dataTransfer && (a.dataTransfer.dropEffect = "move"), H(a, R);
  }
  async function yt(a, z) {
    V && V.col === a && (A(V, V.col), z = I.value);
    const R = L, W = U;
    q(), !(!R || !W || !l.isActive() || s.movingTaskId) && (s.view === "today" ? a.sectionId === "today" && W.sectionId !== "today" ? await l.moveTask(R.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, z) : await l.moveTask(R.id, { sectionId: a.sectionId }, z) : await l.moveTask(R.id, {
      projectId: a.projectId,
      sectionId: a.sectionId
    }, z));
  }
  async function _(a, z, R, W) {
    a.preventDefault();
    const X = a.dataTransfer?.getData("application/x-todoist-label") || (a.dataTransfer?.getData("text/plain")?.startsWith("label:") ? a.dataTransfer.getData("text/plain").slice(6) : "");
    if (X) {
      l.dropLabel(z, X);
      return;
    }
    if (v.value === s.columns.indexOf(R)) {
      await yt(R, I.value);
      return;
    }
    const ot = a.currentTarget.getBoundingClientRect(), ut = a.clientY >= ot.top + ot.height / 2, pt = R.tasks.filter((wt) => wt.id !== L?.id), mt = pt.findIndex((wt) => wt.id === z.id), nt = z.id === L?.id ? z.id : ut ? pt[mt + 1]?.id : z.id;
    await yt(R, nt);
  }
  async function ht(a, z) {
    a.preventDefault(), a.stopPropagation(), await yt(z, v.value === s.columns.indexOf(z) ? I.value : void 0);
  }
  return ct(() => [s.view, s.activeProjectId], () => q()), ct(() => s.columns, (a) => {
    U && !a.includes(U) && q();
  }), ct(l.isActive, (a) => {
    a || q();
  }, { immediate: !0, flush: "sync" }), Ut(q), {
    draggingTaskId: p,
    dragOverColIndex: v,
    dragOverTaskId: x,
    dragAfterTask: D,
    isDragPreview: y,
    previewTasks: $,
    onTaskDragStart: G,
    onTaskDragEnd: q,
    onColDragOver: E,
    onColDragLeave: M,
    onTaskDragOver: et,
    onTaskDrop: _,
    onColDrop: ht
  };
}
const Hn = ["data-row-key"], Nn = /* @__PURE__ */ zt({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(l) {
    const s = l, p = P(null), v = /* @__PURE__ */ new Map(), x = P(0), D = to({ top: 0, height: 600 }), B = (h) => s.isPreview(h) ? `preview:${h.id}` : h.id, I = lt(() => {
      x.value;
      const h = [0];
      for (const L of s.tasks) {
        const U = L.id === s.hiddenId && !s.isPreview(L) ? 0 : v.get(B(L)) || v.get(L.id) || 110;
        h.push(h[h.length - 1] + U);
      }
      return h;
    }), F = lt(() => {
      x.value;
      let h = 0;
      return s.tasks.filter((L) => !s.isPreview(L)).map((L) => {
        const U = v.get(L.id) || 110, G = { id: L.id, middle: h + U / 2 };
        return h += U, G;
      });
    });
    function T(h) {
      const L = I.value;
      let U = 0, G = s.tasks.length;
      for (; U < G; ) {
        const q = U + G >>> 1;
        L[q + 1] < h ? U = q + 1 : G = q;
      }
      return U;
    }
    const Y = lt(() => {
      const h = Math.max(0, T(D.value.top) - 5), L = Math.min(s.tasks.length, T(D.value.top + D.value.height) + 6), U = /* @__PURE__ */ new Set();
      for (let G = h; G < L; G++) U.add(G);
      if (s.pinnedId) {
        const G = s.tasks.findIndex((q) => q.id === s.pinnedId && !s.isPreview(q));
        G >= 0 && U.add(G);
      }
      return [...U].sort((G, q) => G - q).map((G) => ({ task: s.tasks[G], index: G, top: I.value[G] }));
    });
    let V = 0;
    function H() {
      V || (V = requestAnimationFrame(() => {
        V = 0, p.value && (D.value = { top: p.value.scrollTop, height: p.value.clientHeight });
      }));
    }
    let A;
    const y = /* @__PURE__ */ new Map();
    function $(h, L) {
      const U = y.get(L);
      U !== h && (U && A?.unobserve(U), h instanceof HTMLElement ? (y.set(L, h), A?.observe(h)) : y.delete(L));
    }
    return ct(() => s.tasks, () => {
      const h = new Set(s.tasks.map(B));
      for (const L of v.keys()) h.has(L) || v.delete(L);
      It(H);
    }), te(() => {
      A = new ResizeObserver((h) => {
        let L = !1;
        const U = T(p.value?.scrollTop || 0), G = I.value[U] || 0;
        for (const q of h) {
          const E = q.target;
          if (E === p.value) {
            H();
            continue;
          }
          const M = E.dataset.rowKey, et = q.borderBoxSize?.[0]?.blockSize || q.contentRect.height;
          M && et > 0 && Math.abs((v.get(M) || 0) - et) > 0.5 && (v.set(M, et), L = !0);
        }
        if (L) {
          x.value++;
          const q = (I.value[U] || 0) - G;
          p.value && q && !s.pinnedId && (p.value.scrollTop += q), H();
        }
      }), p.value && (A.observe(p.value), p.value.__todoistSlots = () => F.value);
      for (const h of y.values()) A.observe(h);
      H();
    }), Ut(() => {
      A?.disconnect(), cancelAnimationFrame(V), p.value && delete p.value.__todoistSlots, y.clear(), v.clear();
    }), (h, L) => (r(), u("div", {
      ref_key: "root",
      ref: p,
      onScrollPassive: H
    }, [
      l.tasks.length ? (r(), u("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${I.value[I.value.length - 1]}px` })
      }, [
        (r(!0), u(it, null, dt(Y.value, (U) => (r(), u("div", {
          key: B(U.task),
          ref_for: !0,
          ref: (G) => $(G, B(U.task)),
          "data-row-key": B(U.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${U.top}px)` })
        }, [
          Ve(h.$slots, "default", {
            task: U.task,
            index: U.index
          }, void 0, !0)
        ], 12, Hn))), 128))
      ], 4)) : Ve(h.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), Vn = /* @__PURE__ */ ee(Nn, [["__scopeId", "data-v-e0ed77d8"]]), Kn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Fn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Yn = {
  key: 2,
  class: "todoist-empty"
}, Xn = {
  key: 3,
  class: "todoist-empty"
}, Gn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, qn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Qn = { class: "todoist-projects-toolbar-inner" }, Jn = { class: "todoist-project-tabs-scroll" }, Zn = ["onClick"], ts = { class: "todoist-project-tab-name" }, es = {
  key: 0,
  class: "todoist-project-actions-group"
}, os = ["title"], ns = { class: "action-text" }, ss = ["title"], is = { class: "action-text" }, as = { class: "todoist-board" }, ls = ["data-section-id", "data-title", "data-column-index"], rs = { class: "todoist-board-column-head" }, ds = ["title", "onClick"], cs = ["onClick"], us = ["onSubmit"], ps = ["onKeydown"], ms = { class: "date-hint-left" }, fs = { class: "date-hint-badge" }, vs = { class: "date-hint-sub" }, gs = {
  key: 0,
  class: "date-hint-preview"
}, bs = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, ks = {
  key: 1,
  class: "todoist-composer-images"
}, ys = ["src"], hs = { class: "todoist-composer-img-name" }, ws = {
  key: 0,
  class: "todoist-composer-img-status"
}, Ts = ["onClick"], Ds = { class: "todoist-inline-actions" }, xs = ["disabled"], Cs = ["disabled"], $s = {
  key: 0,
  class: "todoist-column-empty"
}, Ss = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], _s = ["disabled", "title", "aria-label", "onClick"], Is = { class: "todoist-board-task-main" }, Rs = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Ls = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Ps = ["title", "onClick"], Ms = { class: "repo-badge-name" }, Os = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, As = ["title", "onClick"], js = { class: "repo-badge-name" }, Es = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Ws = ["title", "onClick"], Us = { class: "repo-badge-name" }, Bs = ["onKeydown", "onBlur"], zs = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, Hs = {
  key: 6,
  class: "todoist-board-task-description"
}, Ns = {
  key: 7,
  class: "todoist-board-task-meta"
}, Vs = ["title"], Ks = ["title"], Fs = ["title"], Ys = ["title"], Xs = {
  key: 4,
  class: "todoist-board-extra"
}, Gs = ["onClick"], qs = ["src"], Qs = {
  key: 0,
  class: "todoist-board-add-column"
}, Js = {
  key: 1,
  class: "todoist-add-section-form"
}, Zs = ["onKeydown"], ti = { class: "todoist-add-section-actions" }, ei = { class: "section-menu-text" }, oi = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, ni = ["disabled"], si = ["disabled"], ii = {
  key: 1,
  class: "todoist-section-menu-divider"
}, ai = { class: "section-menu-text" }, li = { class: "todoist-task-menu-header" }, ri = { class: "todoist-task-menu-title" }, di = { class: "todoist-menu-text" }, ci = { class: "todoist-menu-badge" }, ui = {
  key: 0,
  class: "todoist-labels-panel"
}, pi = { class: "todoist-labels-quick-input" }, mi = ["placeholder", "onKeydown"], fi = { class: "todoist-labels-chip-grid" }, vi = ["onClick"], gi = {
  key: 0,
  class: "chip-check"
}, bi = { class: "todoist-menu-text" }, ki = {
  key: 1,
  class: "todoist-recur-panel"
}, yi = { class: "todoist-recur-grid" }, hi = ["onClick"], wi = { class: "todoist-recur-custom-row" }, Ti = ["onKeydown"], Di = { class: "todoist-menu-text" }, xi = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Ci = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, $i = {
  key: 2,
  class: "todoist-color-panel"
}, Si = { class: "todoist-color-grid" }, _i = ["title", "onClick"], Ii = { class: "todoist-color-name" }, Ri = { class: "todoist-menu-text" }, Li = ["disabled", "onClick"], Pi = { class: "todoist-project-flyout-name" }, Mi = {
  key: 0,
  class: "todoist-menu-badge"
}, Oi = { class: "todoist-menu-text" }, Ai = { class: "todoist-dialog-title" }, ji = ["title"], Ei = { class: "todoist-dialog-body" }, Wi = {
  key: 0,
  class: "todoist-dialog-desc"
}, Ui = ["placeholder", "onKeydown"], Bi = { class: "todoist-dialog-foot" }, zi = { class: "todoist-dialog-icon" }, Hi = { class: "todoist-dialog-title" }, Ni = ["title"], Vi = { class: "todoist-dialog-body" }, Ki = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, Fi = { class: "todoist-dialog-danger-text" }, Yi = { class: "todoist-dialog-msg" }, Xi = { class: "todoist-dialog-foot" }, Gi = /* @__PURE__ */ zt({
  __name: "TodoistTaskList",
  setup(l) {
    const s = P(0);
    function p() {
      s.value++;
    }
    te(() => {
      window.addEventListener("storage", p), window.addEventListener("todoist-repository-links-changed", p), window.addEventListener("todoist-bili-links-changed", p), window.addEventListener("todoist-web-links-changed", p);
    }), Ut(() => {
      window.removeEventListener("storage", p), window.removeEventListener("todoist-repository-links-changed", p), window.removeEventListener("todoist-bili-links-changed", p), window.removeEventListener("todoist-web-links-changed", p);
    });
    function v(n, o) {
      return s.value, no(n, o);
    }
    function x(n, o, i) {
      return s.value, Bo(n, o, i);
    }
    function D(n, o, i) {
      return s.value, zo(n, o, i);
    }
    function B(n) {
      n && window.open(n, "_blank", "noopener,noreferrer");
    }
    function I(n) {
      Oo.openVideo({
        bvid: n.bvid,
        aid: n.aid ? String(n.aid) : void 0,
        title: n.title,
        author: n.author,
        cover: n.cover,
        url: n.url
      });
    }
    function F(n) {
      so.open(n);
    }
    const T = kt, Y = P(""), V = P(null), H = P(""), A = P(!1), y = lt(() => H.value ? Wo(H.value) : null), $ = P([]);
    function h(n) {
      const o = n.clipboardData?.items;
      if (o)
        for (let i = 0; i < o.length; i++) {
          const j = o[i];
          if (j.type.indexOf("image") !== -1) {
            n.preventDefault();
            const c = j.getAsFile();
            if (!c) continue;
            const st = URL.createObjectURL(c), N = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: c,
              previewUrl: st,
              name: `截图_${N}.png`,
              uploading: !1
            };
            $.value.push(Dt);
          }
        }
    }
    function L(n) {
      const o = $.value.splice(n, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const U = P(null), G = P(""), q = P(null), E = Qt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), M = Qt({
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
    }), et = P(null), yt = P(null), _ = Qt({
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
    }), ht = P(null), a = Qt({
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
    }), z = P(null), R = P(null), W = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], X = [
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
    ], ot = lt(() => String(a.task?._taskRaw?.project_id || a.col?.projectId || "")), ut = lt(() => T.view !== "projects" ? null : T.projects.find((n) => String(n.id) === String(T.activeProjectId)) || T.projects[0] || null), pt = lt(() => {
      const n = new Set(T.availableLabels || []);
      return a.task?.labels && a.task.labels.forEach((o) => n.add(o)), Array.from(n);
    }), mt = lt(() => {
      const n = a.task?.customColorHex;
      return n && W.find((i) => i.hex.toLowerCase() === n.toLowerCase()) || W[0];
    });
    function nt(n, o) {
      return n.sectionId || n.title || String(o);
    }
    function wt() {
      return `${T.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function Bt(n) {
      return n.startDate || n.dueText || n.labels && n.labels.length > 0 || n.timedDeadlineText || n.extraCountText;
    }
    function Tt() {
      E.isOpen = !1, a.isOpen = !1, a.activeSubpanel = null;
    }
    const {
      draggingTaskId: Rt,
      dragOverColIndex: At,
      dragOverTaskId: Yt,
      dragAfterTask: Xt,
      isDragPreview: O,
      previewTasks: d,
      onTaskDragStart: g,
      onTaskDragEnd: Q,
      onColDragOver: _t,
      onColDragLeave: jt,
      onTaskDragOver: fe,
      onTaskDrop: ve,
      onColDrop: ge
    } = zn({
      state: T,
      isActive: () => J.active,
      editingTaskId: () => U.value,
      closePopovers: Tt,
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
      T.movingTaskId !== n.id && (U.value = n.id, G.value = n.content, It(() => {
        q.value && (q.value.focus(), q.value.select());
      }));
    }
    function Ht(n, o) {
      if (U.value !== n.id) return;
      const i = G.value.trim();
      U.value = null, o && i && i !== n.content && (n.content = i, tt.dispatch("update-task-title", {
        taskId: n.id,
        content: i,
        task: n,
        newContent: i
      }));
    }
    function Nt(n, o) {
      n.key === "Enter" ? n.shiftKey || (n.preventDefault(), Ht(o, !0)) : n.key === "Escape" && (n.preventDefault(), n.stopPropagation(), Ht(o, !1));
    }
    function he(n, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(n.id, n);
    }
    function oe(n, o, i) {
      const j = i.currentTarget;
      V.value = nt(n, o), H.value = "", A.value = !1, It(() => {
        j.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function le() {
      b.value || w();
    }
    function w() {
      V.value = null, H.value = "", A.value = !1;
      for (const n of $.value)
        try {
          URL.revokeObjectURL(n.previewUrl);
        } catch {
        }
      $.value = [];
    }
    const b = P(!1), S = /* @__PURE__ */ new WeakMap();
    function ft(n) {
      const o = n.description || n._taskRaw?.description || "", i = S.get(n);
      if (i && i.source === o) return i;
      const j = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: o,
        thumb: j,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return S.set(n, c), c;
    }
    function Ct(n) {
      return ft(n).text;
    }
    function vt(n) {
      return ft(n).thumb;
    }
    function Gt(n, o) {
      n && Me.open(n, o?.content || "任务照片");
    }
    async function Oe(n) {
      if (!J.active || b.value) return;
      const o = [...$.value];
      let j = H.value.trim() || o[0]?.name || "";
      if (!j) return;
      let c, st, N;
      if (y.value && !A.value) {
        const Lt = y.value;
        j = Lt.cleanTitle || j, c = Lt.date, st = Lt.label + (Lt.time ? ` ${Lt.time}` : ""), N = Lt.time ? `${Lt.date} ${Lt.time}` : Lt.date;
      }
      const Dt = V.value, Vt = H.value, $t = T.view, xe = n.projectId || $t === "projects" && T.activeProjectId || void 0, Ce = n.sectionId !== void 0 ? n.sectionId : void 0;
      b.value = !0;
      try {
        await xo(async () => {
          for (const xt of o)
            if (!xt.uploadedUrl) {
              xt.uploading = !0;
              try {
                const $e = await at.uploadFile(xt.file, xt.name);
                xt.uploadedUrl = $e.file_url;
              } catch {
                xt.uploadedUrl = xt.previewUrl;
              } finally {
                xt.uploading = !1;
              }
            }
          await tt.dispatch("add-task-submit", {
            content: j,
            view: $t,
            group: n,
            projectId: xe,
            sectionId: Ce,
            dueDate: c,
            dueText: st,
            dueString: N,
            attachments: o.map((xt) => ({ file_url: xt.uploadedUrl, file_name: xt.name, file_type: xt.file.type || "image/png" }))
          }) && Dt === V.value && Vt === H.value && o.length === $.value.length && o.every((xt, $e) => xt === $.value[$e]) && w();
        });
      } catch {
        T.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        b.value = !1;
      }
    }
    function ao(n, o) {
      n.key === "Enter" && !n.shiftKey ? (n.preventDefault(), Oe(o)) : n.key === "Escape" && (n.preventDefault(), le());
    }
    function Ae() {
      const n = Y.value.trim();
      if (!n) return;
      const i = T.columns.find((j) => j.projectId)?.projectId || T.activeProjectId || void 0;
      tt.dispatch("add-section-submit", { name: n, projectId: i }), we();
    }
    function we() {
      T.addingSection = !1, Y.value = "";
    }
    function lo(n, o, i) {
      if (E.isOpen && E.col === n) {
        E.isOpen = !1;
        return;
      }
      a.isOpen = !1;
      const c = i.currentTarget.getBoundingClientRect(), N = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      E.col = n, E.x = N, E.y = Dt, E.canMoveLeft = o > 0 && !!T.columns[o - 1]?.sectionId, E.canMoveRight = o < T.columns.length - 1 && !!T.columns[o + 1]?.sectionId, E.isOpen = !0;
    }
    function je(n, o) {
      E.isOpen = !1, tt.dispatch("move-section", { sectionId: n.sectionId, direction: o });
    }
    function Ee(n, o, i) {
      if (T.movingTaskId === n.id || n.completed) return;
      E.isOpen = !1;
      const j = 236, c = 340, st = Math.max(8, Math.min(window.innerWidth - j - 8, i.clientX)), N = Math.max(8, Math.min(window.innerHeight - c - 8, i.clientY));
      if (a.task = n, a.col = o, a.x = st, a.y = N, a.activeSubpanel = null, a.descText = n.description || "", a.isSavingDesc = !1, a.newLabelText = "", a.customRecurText = "", n.dueDate) {
        const $t = /* @__PURE__ */ new Date(`${n.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite($t.getTime()) && (a.calYear = $t.getFullYear(), a.calMonth = $t.getMonth());
      } else {
        const $t = /* @__PURE__ */ new Date();
        a.calYear = $t.getFullYear(), a.calMonth = $t.getMonth();
      }
      const Dt = 252, Vt = st + j + Dt > window.innerWidth - 8;
      a.flyoutOpenLeft = Vt, a.flyoutStyle = {
        left: Vt ? `${-Dt - 6}px` : `${j + 6}px`,
        top: "0px"
      }, a.isOpen = !0;
    }
    function re(n) {
      a.activeSubpanel === n ? a.activeSubpanel = null : (a.activeSubpanel = n, n === "desc" ? It(() => {
        z.value?.focus(), z.value?.select();
      }) : n === "labels" && It(() => {
        R.value?.focus();
      }));
    }
    function We(n) {
      return !!a.task?.labels?.includes(n);
    }
    function ro(n) {
      if (!a.task) return;
      const o = a.task.id, i = [...a.task.labels || []], j = i.includes(n) ? i.filter((c) => c !== n) : [...i, n];
      a.task.labels = j, tt.dispatch("update-task-labels", { taskId: o, labels: j });
    }
    function Ue() {
      if (!a.task) return;
      const n = a.newLabelText.trim();
      if (!n) return;
      a.newLabelText = "";
      const o = a.task.id, i = [...a.task.labels || []];
      i.includes(n) || (i.push(n), a.task.labels = i, tt.dispatch("update-task-labels", { taskId: o, labels: i })), Tt();
    }
    function co(n) {
      return String(a.task?.dueString || "").toLowerCase().includes(n.toLowerCase());
    }
    function uo(n, o) {
      if (!a.task) return;
      const i = a.task.id;
      tt.dispatch("update-task-recurring", { taskId: i, rule: n, label: o }), Tt();
    }
    function Be() {
      if (!a.task) return;
      const n = a.customRecurText.trim();
      if (!n) return;
      const o = a.task.id;
      tt.dispatch("update-task-recurring", { taskId: o, rule: n, label: n }), Tt();
    }
    function po() {
      if (!a.task) return;
      const n = a.task.id;
      tt.dispatch("clear-task-recurring", { taskId: n }), Tt();
    }
    function mo(n) {
      if (!a.task) return;
      const o = a.task.id, i = W.find((j) => j.id === n);
      a.task.customColorHex = i?.hex || "", tt.dispatch("update-task-color", { taskId: o, colorId: n }), Tt();
    }
    function fo(n) {
      if (!a.task) return;
      const o = a.task.id;
      tt.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: n.id,
        targetProjectName: n.name
      }), Tt();
    }
    function vo() {
      if (!a.task) return;
      const n = a.task, o = { x: a.x, y: a.y };
      Tt();
      const i = qt(o, 380, 220);
      _.x = i.x, _.y = i.y, n.isRecurring ? (_.title = "删除重复任务确认", _.icon = "⚠️", _.danger = !0, _.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", _.message = `任务内容：${n.content}
循环规则：${n.dueString || "循环任务"}`, _.confirmText = "删除重复任务", _.actionType = "delete-task", _.payload = { taskId: n.id, isRecurring: !0 }, _.isOpen = !0) : (_.title = "删除任务确认", _.icon = "🗑️", _.danger = !0, _.alertText = `确定要删除任务「${n.content}」吗？`, _.message = "此操作不可撤销。", _.confirmText = "确认删除", _.actionType = "delete-task", _.payload = { taskId: n.id, isRecurring: !1 }, _.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(n, o, i) {
      Ee(n, o, i);
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
        const c = Math.max(16, Math.min(window.innerWidth - o - 16, n.x)), st = Math.max(16, Math.min(window.innerHeight - i - 16, n.y + 10));
        return { x: c, y: st };
      }
      if (j) {
        let c = j.right - o;
        c < 16 && (c = Math.max(16, j.left)), c = Math.max(16, Math.min(window.innerWidth - o - 16, c));
        let st = j.bottom + 8;
        return st + i > window.innerHeight - 16 && j.top > i + 16 && (st = j.top - i - 8), st = Math.max(16, Math.min(window.innerHeight - i - 16, st)), { x: c, y: st };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - i) / 3))
      };
    }
    function ze(n, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const i = o.clientX, j = o.clientY, c = n === "prompt" ? M : _, st = c.x, N = c.y, Dt = ($t) => {
        const xe = $t.clientX - i, Ce = $t.clientY - j;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, st + xe)), c.y = Math.max(10, Math.min(window.innerHeight - 120, N + Ce));
      }, Vt = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Vt);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Vt);
    }
    function He(n) {
      const o = qt(n, 380, 220);
      M.x = o.x, M.y = o.y, M.title = f("todoist.newProject"), M.message = f("todoist.inputProjectPlaceholder"), M.value = "", M.placeholder = f("todoist.inputProjectPlaceholder"), M.confirmText = f("common.confirm"), M.actionType = "create-project", M.payload = null, M.isOpen = !0, It(() => et.value?.focus());
    }
    function go(n, o) {
      const i = qt(o, 380, 220);
      M.x = i.x, M.y = i.y, M.title = f("todoist.renameProject"), M.message = n.name, M.value = n.name, M.placeholder = f("todoist.inputProjectPlaceholder"), M.confirmText = f("common.save"), M.actionType = "rename-project", M.payload = { projectId: n.id }, M.isOpen = !0, It(() => {
        et.value?.focus(), et.value?.select();
      });
    }
    function bo(n, o) {
      const i = o || { x: E.x, y: E.y };
      E.isOpen = !1;
      const j = qt(i, 380, 220);
      M.x = j.x, M.y = j.y, M.title = f("todoist.renameSection"), M.message = n.title, M.value = n.title, M.placeholder = f("todoist.inputSectionPlaceholder"), M.confirmText = f("common.save"), M.actionType = "rename-section", M.payload = { sectionId: n.sectionId }, M.isOpen = !0, It(() => {
        et.value?.focus(), et.value?.select();
      });
    }
    function ne() {
      M.isOpen = !1;
    }
    function Ne() {
      const n = M.value.trim();
      if (!n) return;
      const { actionType: o, payload: i } = M;
      ne(), o === "create-project" ? tt.dispatch("create-project-submit", n) : o === "rename-project" && i && "projectId" in i ? tt.dispatch("rename-project-submit", { projectId: i.projectId, newName: n }) : o === "rename-section" && i && "sectionId" in i && tt.dispatch("rename-section", { sectionId: i.sectionId, newName: n });
    }
    function ko(n, o) {
      const i = qt(o, 380, 240);
      _.x = i.x, _.y = i.y, _.title = f("todoist.deleteProjectConfirm"), _.icon = "🗑️", _.danger = !0, _.alertText = f("todoist.deleteProjectAlert", { name: n.name }), _.message = f("todoist.deleteProjectWarning"), _.confirmText = f("common.deletePermanently"), _.actionType = "delete-project", _.payload = { projectId: n.id }, _.isOpen = !0;
    }
    function yo(n, o) {
      const i = o || { x: E.x, y: E.y };
      E.isOpen = !1;
      const j = qt(i, 380, 240);
      _.x = j.x, _.y = j.y, _.title = f("todoist.deleteSectionConfirm"), _.icon = "🗑️", _.danger = !0, _.alertText = f("todoist.deleteSectionAlert", { name: n.title }), _.message = f("todoist.deleteSectionWarning"), _.confirmText = f("todoist.deleteSection"), _.actionType = "delete-section", _.payload = { sectionId: n.sectionId }, _.isOpen = !0;
    }
    function de() {
      _.isOpen = !1;
    }
    function ho() {
      const { actionType: n, payload: o } = _;
      de(), n === "delete-project" && o && "projectId" in o ? tt.dispatch("delete-project-submit", o.projectId) : n === "delete-section" && o && "sectionId" in o ? tt.dispatch("delete-section", { sectionId: o.sectionId }) : n === "delete-task" && o && "taskId" in o && tt.dispatch("delete-task-submit", o);
    }
    function wo(n) {
      tt.dispatch("switch-project", n);
    }
    function Te(n) {
      n.key === "Escape" && (M.isOpen && ne(), _.isOpen && de(), a.isOpen && (a.isOpen = !1, a.activeSubpanel = null), E.isOpen && (E.isOpen = !1));
    }
    function De(n) {
      const o = n.target;
      o && (M.isOpen && yt.value && !yt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && ne(), _.isOpen && ht.value && !ht.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && de());
    }
    return ct(() => J.active, (n) => {
      document.removeEventListener("keydown", Te), window.removeEventListener("pointerdown", De), n && (document.addEventListener("keydown", Te), window.addEventListener("pointerdown", De));
    }, { immediate: !0, flush: "sync" }), Ut(() => {
      document.removeEventListener("keydown", Te), window.removeEventListener("pointerdown", De), w();
    }), (n, o) => (r(), u("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: Tt
    }, [
      e(T).moveError && e(T).moveMessage ? (r(), u("p", Kn, m(e(T).moveMessage), 1)) : C("", !0),
      e(T).emptyText && e(T).columns.length > 0 && !e(T).loading ? (r(), u("p", Fn, m(e(f)("todoist.tasksRetained", { text: e(T).emptyText })), 1)) : C("", !0),
      e(T).loading && e(T).columns.length === 0 ? (r(), u("p", Yn, m(e(f)("common.loading")), 1)) : e(T).emptyText && e(T).columns.length === 0 ? (r(), u("p", Xn, m(e(T).emptyText), 1)) : e(T).view === "projects" && e(T).projects.length === 0 ? (r(), u("div", Gn, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, m(e(f)("todoist.emptyProjects")), 1),
        t("p", null, m(e(f)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (i) => He(i))
        }, m(e(f)("todoist.createFirstProject")), 1)
      ])) : (r(), u(it, { key: 5 }, [
        e(T).view === "projects" && e(T).projects.length ? (r(), u("div", qn, [
          t("div", Qn, [
            t("div", Jn, [
              (r(!0), u(it, null, dt(e(T).projects, (i) => (r(), u("button", {
                key: i.id,
                type: "button",
                class: Z(["todoist-project-tab", { active: String(i.id) === String(e(T).activeProjectId) }]),
                onClick: (j) => wo(i.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: bt({ background: i.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", ts, m(i.name), 1)
              ], 10, Zn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => He(i))
              }, "＋ 新建项目")
            ]),
            ut.value ? (r(), u("div", es, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(f)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => go(ut.value, i))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", ns, m(e(f)("common.rename")), 1)
              ], 8, os),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(f)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => ko(ut.value, i))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", is, m(e(f)("todoist.deleteProject")), 1)
              ], 8, ss)
            ])) : C("", !0)
          ])
        ])) : C("", !0),
        t("div", as, [
          (r(!0), u(it, null, dt(e(T).columns, (i, j) => (r(), u("section", {
            key: i.sectionId || i.title || j,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": j
          }, [
            t("header", rs, [
              t("h3", null, [
                Wt(m(i.title) + " ", 1),
                t("span", null, m(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: K((c) => lo(i, j, c), ["stop"])
              }, "•••", 8, ds)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => oe(i, j, c)
            }, "＋ 添加任务", 8, cs),
            V.value === nt(i, j) ? (r(), u("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: K((c) => Oe(i), ["prevent"])
            }, [
              Mt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (c) => H.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (c) => ao(c, i),
                onPaste: o[5] || (o[5] = (c) => h(c))
              }, null, 40, ps), [
                [Kt, H.value]
              ]),
              y.value ? (r(), u("div", {
                key: 0,
                class: Z(["todoist-composer-date-hint", { "is-ignored": A.value }])
              }, [
                t("div", ms, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", fs, [
                    Wt(m(y.value.label) + m(y.value.time ? " " + y.value.time : "") + " ", 1),
                    t("span", vs, "(" + m(y.value.formattedDate) + ")", 1)
                  ]),
                  A.value ? (r(), u("span", bs, " (已忽略日期，按纯文本创建) ")) : (r(), u("span", gs, [
                    o[32] || (o[32] = Wt(" 精简任务名: ", -1)),
                    t("strong", null, m(y.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (c) => A.value = !A.value)
                }, m(A.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : C("", !0),
              $.value.length > 0 ? (r(), u("div", ks, [
                (r(!0), u(it, null, dt($.value, (c, st) => (r(), u("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, ys),
                  t("span", hs, m(c.name), 1),
                  c.uploading ? (r(), u("span", ws, "上传中…")) : C("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (N) => L(st)
                  }, "×", 8, Ts)
                ]))), 128))
              ])) : C("", !0),
              t("div", Ds, [
                t("button", {
                  type: "button",
                  disabled: b.value,
                  onClick: le
                }, m(e(f)("common.cancel")), 9, xs),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: b.value
                }, m(b.value ? $.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Cs)
              ])
            ], 40, us)) : C("", !0),
            Jt(Vn, {
              tasks: e(d)(i, j),
              "pinned-id": e(Rt) || U.value,
              "hidden-id": e(At) !== null ? e(Rt) : null,
              "is-preview": e(O),
              class: Z(["todoist-board-list", { "drag-over": e(At) === j }]),
              "data-group-index": j,
              onDragover: K((c) => e(_t)(c, j), ["prevent"]),
              onDragleave: (c) => e(jt)(c, j),
              onDrop: K((c) => e(ge)(c, i), ["prevent"])
            }, {
              empty: ie(() => [
                i.tasks.length === 0 && e(At) !== j ? (r(), u("p", $s, " 暂无任务 · 可拖到这里 ")) : C("", !0)
              ]),
              default: ie(({ task: c, index: st }) => [
                t("article", {
                  class: Z(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: U.value === c.id,
                      "dragging-task": !e(O)(c) && e(Rt) === c.id,
                      "drop-before": e(Yt) === c.id && !e(Xt),
                      "drop-after": e(Yt) === c.id && e(Xt),
                      "saving-position": e(T).movingTaskId === c.id,
                      "todoist-task-preview": e(O)(c),
                      "drag-origin-hidden": e(Rt) === c.id && !e(O)(c) && e(At) !== null
                    }
                  ]]),
                  style: bt(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": e(O)(c) ? void 0 : c.id,
                  "aria-hidden": e(O)(c) || void 0,
                  tabindex: e(O)(c) ? -1 : 0,
                  title: wt(),
                  draggable: !e(O)(c) && !c.completed && !e(T).loading && !e(T).movingTaskId && !e(T).moveNeedsRefresh && U.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (N) => e(g)(N, c, i, st),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...N) => e(Q) && e(Q)(...N)),
                  onDragover: K((N) => e(fe)(N, c, i, st), ["stop", "prevent"]),
                  onDrop: K((N) => e(ve)(N, c, i, st), ["stop", "prevent"]),
                  onDblclick: (N) => ke(c, N),
                  onClick: (N) => he(c, N),
                  onContextmenu: K((N) => Ee(c, i, N), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: Z(["todoist-board-check", { checked: c.completed }]),
                    disabled: e(O)(c) || e(T).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: K((N) => be(c, i), ["stop"])
                  }, null, 10, _s),
                  t("div", Is, [
                    e(T).movingTaskId === c.id ? (r(), u("span", Rs, "保存中")) : C("", !0),
                    v(c.id, c.description).length ? (r(), u("div", Ls, [
                      (r(!0), u(it, null, dt(v(c.id, c.description), (N) => (r(), u("button", {
                        key: N.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + N.fullName + " · 点击在插件内查看详情",
                        onClick: K((Dt) => F(N.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", Ms, m(N.fullName), 1)
                      ], 8, Ps))), 128))
                    ])) : C("", !0),
                    x(c.id, c.description, c.content).length ? (r(), u("div", Os, [
                      (r(!0), u(it, null, dt(x(c.id, c.description, c.content), (N) => (r(), u("button", {
                        key: N.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + N.title + " · 点击立即播放",
                        onClick: K((Dt) => I(N), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", js, m(N.title), 1)
                      ], 8, As))), 128))
                    ])) : C("", !0),
                    D(c.id, c.description, c.content).length ? (r(), u("div", Es, [
                      (r(!0), u(it, null, dt(D(c.id, c.description, c.content), (N) => (r(), u("button", {
                        key: N.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (N.title || N.url) + " · 点击直接打开",
                        onClick: K((Dt) => B(N.url), ["stop"])
                      }, [
                        o[36] || (o[36] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", Us, m(N.title || N.url), 1)
                      ], 8, Ws))), 128))
                    ])) : C("", !0),
                    U.value === c.id ? Mt((r(), u("textarea", {
                      key: 4,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: q,
                      "onUpdate:modelValue": o[7] || (o[7] = (N) => G.value = N),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (N) => Nt(N, c),
                      onBlur: (N) => Ht(c, !0),
                      onClick: o[8] || (o[8] = K(() => {
                      }, ["stop"]))
                    }, null, 40, Bs)), [
                      [Kt, G.value]
                    ]) : (r(), u("p", zs, m(c.content || "未命名任务"), 1)),
                    Ct(c) ? (r(), u("p", Hs, m(Ct(c)), 1)) : C("", !0),
                    Bt(c) ? (r(), u("div", Ns, [
                      c.startDate && !c.dueDate ? (r(), u("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + m(e(_e)(c.startDate)) + " 起 ", 9, Vs)) : c.startDate && c.dueDate ? (r(), u("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + m(e(_e)(c.startDate)) + " ~ " + m(e(_e)(c.dueDate)), 9, Ks)) : c.dueText ? (r(), u("span", {
                        key: 2,
                        class: Z(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, m(c.isRecurring ? "↻ " : "▣ ") + m(c.dueText), 11, Fs)) : C("", !0),
                      (r(!0), u(it, null, dt((c.labels || []).slice(0, 3), (N) => (r(), u("span", {
                        key: N,
                        class: "todoist-board-label"
                      }, "◇ " + m(N), 1))), 128)),
                      c.timedDeadlineText ? (r(), u("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + m(c.timedDeadlineText), 9, Ys)) : C("", !0),
                      c.extraCountText ? (r(), u("span", Xs, m(c.extraCountText), 1)) : C("", !0)
                    ])) : C("", !0),
                    vt(c) ? (r(), u("div", {
                      key: 8,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: K((N) => Gt(vt(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: vt(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, qs),
                      o[37] || (o[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, Gs)) : C("", !0)
                  ])
                ], 46, Ss)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, ls))), 128)),
          e(T).view === "inbox" || e(T).view === "projects" ? (r(), u("div", Qs, [
            e(T).addingSection ? (r(), u("div", Js, [
              Mt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (i) => Y.value = i),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  St(K(Ae, ["prevent"]), ["enter"]),
                  St(we, ["esc"])
                ]
              }, null, 40, Zs), [
                [Kt, Y.value]
              ]),
              t("div", ti, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: Ae
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: we
                }, m(e(f)("common.cancel")), 1)
              ])
            ])) : (r(), u("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[10] || (o[10] = (i) => e(T).addingSection = !0)
            }, [...o[38] || (o[38] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : C("", !0)
        ])
      ], 64)),
      E.isOpen && E.col ? (r(), u("div", {
        key: 6,
        class: "todoist-section-menu",
        style: bt({ left: E.x + "px", top: E.y + "px" }),
        onClick: o[16] || (o[16] = K(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (i) => bo(E.col, i))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", ei, m(e(f)("todoist.menu.renameSection")), 1)
        ]),
        E.col.sectionId ? (r(), u("div", oi, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !E.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (i) => je(E.col, -1))
          }, m(e(f)("todoist.menu.moveLeft")), 9, ni),
          o[40] || (o[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !E.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (i) => je(E.col, 1))
          }, m(e(f)("todoist.menu.moveRight")), 9, si)
        ])) : C("", !0),
        E.col.sectionId ? (r(), u("div", ii)) : C("", !0),
        E.col.sectionId ? (r(), u("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (i) => yo(E.col, i))
        }, [
          o[41] || (o[41] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", ai, m(e(f)("todoist.menu.deleteSection")), 1)
        ])) : C("", !0)
      ], 4)) : C("", !0),
      a.isOpen && a.task ? (r(), u("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: a.x + "px", top: a.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = K(() => {
        }, ["stop"]))
      }, [
        t("div", li, [
          t("span", ri, m(a.task.content || e(f)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: a.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (i) => re("labels"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", di, m(e(f)("todoist.menu.cloudLabels")), 1),
          t("span", ci, m(a.task.labels && a.task.labels.length ? e(f)("todoist.menu.labelsSelected", { count: a.task.labels.length }) : e(f)("todoist.menu.labelsNone")), 1)
        ], 2),
        a.activeSubpanel === "labels" ? (r(), u("div", ui, [
          t("div", pi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (i) => a.newLabelText = i),
              type: "text",
              placeholder: e(f)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: St(K(Ue, ["prevent"]), ["enter"])
            }, null, 40, mi), [
              [Kt, a.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Ue
            }, "＋")
          ]),
          t("div", fi, [
            (r(!0), u(it, null, dt(pt.value, (i) => (r(), u("button", {
              key: i,
              type: "button",
              class: Z(["todoist-label-chip", { selected: We(i) }]),
              onClick: (j) => ro(i)
            }, [
              t("span", null, "◇ " + m(i), 1),
              We(i) ? (r(), u("span", gi, "✓")) : C("", !0)
            ], 10, vi))), 128))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: a.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (i) => re("recur"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", bi, m(e(f)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(a.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, m(a.task.isRecurring ? a.task.dueString || e(f)("todoist.recur.recurring") : e(f)("todoist.menu.labelsNone")), 5)
        ], 2),
        a.activeSubpanel === "recur" ? (r(), u("div", ki, [
          t("div", yi, [
            (r(), u(it, null, dt(X, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: Z(["todoist-recur-chip", { selected: co(i.rule) }]),
              onClick: (j) => uo(i.rule, i.label)
            }, [
              t("span", null, m(i.icon), 1),
              t("span", null, m(i.label), 1)
            ], 10, hi)), 64))
          ]),
          t("div", wi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (i) => a.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: St(K(Be, ["prevent"]), ["enter"])
            }, null, 40, Ti), [
              [Kt, a.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Be
            }, "确定")
          ]),
          a.task.isRecurring ? (r(), u("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: po
          }, m(e(f)("todoist.menu.clearRecur")), 1)) : C("", !0)
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: a.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (i) => re("color"))
        }, [
          o[44] || (o[44] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", Di, m(e(f)("todoist.menu.pickColor")), 1),
          t("span", xi, [
            mt.value.id === "none" ? (r(), u("span", Ci, "⊘")) : (r(), u("span", {
              key: 1,
              class: "todoist-color-dot",
              style: bt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: mt.value.hex
              })
            }, null, 4)),
            Wt(" " + m(mt.value.name), 1)
          ])
        ], 2),
        a.activeSubpanel === "color" ? (r(), u("div", $i, [
          t("div", Si, [
            (r(), u(it, null, dt(W, (i) => t("button", {
              key: i.id,
              type: "button",
              class: Z(["todoist-color-swatch", { selected: mt.value.id === i.id }]),
              title: i.name,
              onClick: (j) => mo(i.id)
            }, [
              t("span", {
                class: Z(["todoist-color-dot", { none: i.id === "none" }]),
                style: bt(i.id !== "none" ? { background: i.hex } : {})
              }, m(i.id === "none" ? mt.value.id === "none" ? "✓" : "⊘" : mt.value.id === i.id ? "✓" : ""), 7),
              t("span", Ii, m(i.name), 1)
            ], 10, _i)), 64))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: a.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (i) => re("project"))
        }, [
          o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Ri, m(e(f)("todoist.menu.moveToProject")), 1),
          o[46] || (o[46] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        a.activeSubpanel === "project" ? (r(), u("div", {
          key: 3,
          class: Z(["todoist-project-flyout", { "open-left": a.flyoutOpenLeft }]),
          style: bt(a.flyoutStyle)
        }, [
          (r(!0), u(it, null, dt(e(T).projects, (i) => (r(), u("button", {
            key: i.id,
            type: "button",
            class: Z(["todoist-project-flyout-item", { active: String(i.id) === ot.value }]),
            disabled: !!e(T).movingTaskId || String(i.id) === ot.value,
            onClick: (j) => fo(i)
          }, [
            o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Pi, m(i.name), 1),
            String(i.id) === ot.value ? (r(), u("span", Mi, m(e(f)("todoist.menu.currentBadge")), 1)) : C("", !0)
          ], 10, Li))), 128))
        ], 6)) : C("", !0),
        o[49] || (o[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: vo
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Oi, m(a.task.isRecurring ? e(f)("todoist.menu.deleteRecurringTask") : e(f)("todoist.menu.deleteTask")), 1)
        ])
      ], 4)) : C("", !0),
      M.isOpen && e(J).active ? (r(), u("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: yt,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${M.x}px`,
          top: `${M.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[26] || (o[26] = K(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (i) => ze("prompt", i))
        }, [
          o[50] || (o[50] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", Ai, m(M.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(f)("todoist.dragDialogHint")
          }, "⋮⋮", 8, ji)
        ], 32),
        t("div", Ei, [
          M.message ? (r(), u("p", Wi, m(M.message), 1)) : C("", !0),
          Mt(t("input", {
            ref_key: "promptInputRef",
            ref: et,
            "onUpdate:modelValue": o[25] || (o[25] = (i) => M.value = i),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: M.placeholder,
            onKeydown: [
              St(K(Ne, ["prevent"]), ["enter"]),
              St(K(ne, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, Ui), [
            [Kt, M.value]
          ])
        ]),
        t("div", Bi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ne
          }, m(e(f)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: Ne
          }, m(M.confirmText || e(f)("common.confirm")), 1)
        ])
      ], 4)) : C("", !0),
      _.isOpen && e(J).active ? (r(), u("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: ht,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${_.x}px`,
          top: `${_.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[28] || (o[28] = K(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (i) => ze("confirm", i))
        }, [
          t("span", zi, m(_.icon || "⚠️"), 1),
          t("h3", Hi, m(_.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(f)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ni)
        ], 32),
        t("div", Vi, [
          _.danger ? (r(), u("div", Ki, [
            t("div", Fi, m(_.alertText), 1)
          ])) : C("", !0),
          t("p", Yi, m(_.message), 1)
        ]),
        t("div", Xi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: de
          }, m(e(f)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: Z(["todoist-dialog-btn", _.danger ? "danger" : "primary"]),
            onClick: ho
          }, m(_.confirmText || e(f)("common.confirm")), 3)
        ])
      ], 4)) : C("", !0)
    ]));
  }
}), qi = /* @__PURE__ */ ee(Gi, [["__scopeId", "data-v-61d30a30"]]), Qi = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, Ji = { class: "reminder-shortcuts" }, Zi = ["disabled"], ta = { class: "reminder-preview" }, ea = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, oa = ["disabled"], na = ["disabled"], sa = ["disabled"], ia = /* @__PURE__ */ zt({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(l, { emit: s }) {
    const p = l, v = s, x = p.value || (p.taskDate ? p.taskDate + "T" + (p.taskTime || "09:00") : ""), D = P(x.slice(0, 10)), B = P(x.slice(11, 16)), I = P(!1), F = P(""), T = P(!0), Y = lt(() => D.value && B.value ? (/* @__PURE__ */ new Date(D.value + "T" + B.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function V(A) {
      if (I.value) return;
      const y = /* @__PURE__ */ new Date();
      A === "tomorrow" ? (y.setDate(y.getDate() + 1), y.setHours(9, 0, 0, 0)) : y.setTime(y.getTime() + A * 6e4), D.value = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`, B.value = `${String(y.getHours()).padStart(2, "0")}:${String(y.getMinutes()).padStart(2, "0")}`, F.value = "", T.value = !0;
    }
    async function H(A) {
      if (!(I.value || J.pendingWrites)) {
        if (A && (!Number.isFinite(Date.parse(A)) || Date.parse(A) <= Date.now())) {
          F.value = "请选择未来的提醒时间。";
          return;
        }
        if (k.taskId === p.taskId) {
          I.value = !0, F.value = "";
          try {
            if (await rt.setReminder(A), k.taskId !== p.taskId) return;
            k.error ? F.value = k.error : k.reminderTime === A && v("close");
          } finally {
            I.value = !1;
          }
        }
      }
    }
    return (A, y) => (r(), Ot(Le, {
      anchor: l.anchor,
      onClose: y[9] || (y[9] = ($) => v("close"))
    }, {
      default: ie(() => [
        t("section", Qi, [
          y[11] || (y[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", Ji, [
            t("button", {
              type: "button",
              onClick: y[0] || (y[0] = ($) => V(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: y[1] || (y[1] = ($) => V(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: y[2] || (y[2] = ($) => V("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: I.value }, [
            y[10] || (y[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Jt(Pe, {
              modelValue: D.value,
              "onUpdate:modelValue": y[3] || (y[3] = ($) => D.value = $),
              "time-value": B.value,
              "onUpdate:timeValue": y[4] || (y[4] = ($) => B.value = $),
              embedded: "",
              onTimeValidity: y[5] || (y[5] = ($) => T.value = $)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, Zi),
          t("div", ta, m(Y.value || "选择提醒的日期和时间"), 1),
          y[12] || (y[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          F.value ? (r(), u("p", ea, m(F.value), 1)) : C("", !0),
          t("footer", null, [
            l.value ? (r(), u("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: I.value || !!e(J).pendingWrites,
              onClick: y[6] || (y[6] = ($) => H(""))
            }, "移除提醒", 8, oa)) : C("", !0),
            t("button", {
              type: "button",
              disabled: I.value,
              onClick: y[7] || (y[7] = ($) => v("close"))
            }, "取消", 8, na),
            t("button", {
              type: "button",
              class: "save",
              disabled: I.value || !!e(J).pendingWrites || !D.value || !B.value || !T.value,
              onClick: y[8] || (y[8] = ($) => H(D.value + "T" + B.value))
            }, m(I.value ? "保存中…" : "设置提醒"), 9, sa)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), aa = /* @__PURE__ */ ee(ia, [["__scopeId", "data-v-da9e3ddd"]]), la = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, ra = { class: "inspector-main-col" }, da = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, ca = {
  key: 1,
  class: "inspector-repo-badges"
}, ua = ["title", "onClick"], pa = { class: "repo-badge-name" }, ma = { class: "inspector-section inspector-title-section" }, fa = { class: "task-title-row" }, va = ["title"], ga = {
  key: 0,
  class: "check-mark"
}, ba = ["value", "aria-label", "disabled", "placeholder"], ka = ["value", "placeholder", "disabled"], ya = ["onKeydown"], ha = {
  key: 0,
  class: "desc-placeholder-btn"
}, wa = ["innerHTML"], Ta = {
  key: 2,
  role: "status"
}, Da = {
  key: 3,
  class: "attached-img-grid"
}, xa = ["onClick"], Ca = ["src", "alt"], $a = { class: "attached-img-info" }, Sa = ["onClick"], _a = { class: "inspector-section inspector-subtasks-section" }, Ia = {
  key: 0,
  class: "subtasks-list"
}, Ra = ["onClick"], La = {
  key: 0,
  class: "check-tick"
}, Pa = { class: "subtask-content-text" }, Ma = ["title", "onClick"], Oa = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Aa = ["value", "placeholder"], ja = { class: "subtask-actions" }, Ea = { class: "inspector-section inspector-comments-section" }, Wa = { class: "comment-input-bar" }, Ua = { class: "comment-input-wrap" }, Ba = ["value", "placeholder", "disabled"], za = ["title"], Ha = ["disabled"], Na = {
  key: 0,
  class: "comments-list"
}, Va = { class: "comment-item-content" }, Ka = { class: "comment-item-header" }, Fa = { class: "comment-time" }, Ya = { class: "comment-text" }, Xa = {
  key: 0,
  class: "comment-attached-thumb"
}, Ga = ["src", "onClick"], qa = { class: "inspector-side-col" }, Qa = { class: "side-prop-group date-picker-anchor" }, Ja = { class: "row-text" }, Za = { class: "side-prop-group date-picker-anchor" }, tl = { class: "row-text" }, el = ["title"], ol = { class: "side-prop-group" }, nl = { class: "side-prop-label" }, sl = { class: "row-text" }, il = { class: "inspector-menu" }, al = ["disabled", "onClick"], ll = { key: 0 }, rl = { class: "side-prop-group" }, dl = { class: "side-prop-label" }, cl = { class: "row-text" }, ul = { class: "inspector-menu" }, pl = ["placeholder", "aria-label", "onKeydown"], ml = { key: 0 }, fl = {
  key: 1,
  role: "alert"
}, vl = { class: "label-options-list" }, gl = ["checked", "disabled", "onChange"], bl = ["disabled"], kl = { key: 3 }, yl = { class: "side-prop-group" }, hl = { class: "side-prop-label" }, wl = { class: "row-text" }, Tl = /* @__PURE__ */ zt({
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
  setup(l, { emit: s }) {
    const p = l, v = s, x = P(!1), D = P(null), B = P(null);
    let I;
    te(() => {
      let O = -1;
      I = new ResizeObserver((d) => {
        const g = d[0]?.contentRect.width;
        g !== O && (O = g, Y(B.value), Y(D.value));
      }), B.value?.parentElement && I.observe(B.value.parentElement);
    }), Ut(() => I?.disconnect());
    const F = lt(() => {
      if (!p.editDescription) return "";
      const O = p.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), d = document.createElement("template");
      d.innerHTML = Ho.renderMarkdown(O);
      const g = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const Q of Array.from(d.content.querySelectorAll("*"))) {
        if (!g.has(Q.tagName)) {
          Q.replaceWith(document.createTextNode(Q.textContent || ""));
          continue;
        }
        const _t = Q.tagName === "A" ? Q.getAttribute("href") : null;
        for (const jt of Array.from(Q.attributes)) Q.removeAttribute(jt.name);
        _t && /^(https?:\/\/|mailto:)/i.test(_t) && (Q.setAttribute("href", _t), Q.setAttribute("target", "_blank"), Q.setAttribute("rel", "noopener noreferrer"));
      }
      return d.innerHTML;
    });
    function T() {
      x.value = !0, It(() => {
        Y(D.value), D.value?.focus();
      });
    }
    function Y(O) {
      O && (O.style.height = "auto", O.style.height = O.scrollHeight + "px");
    }
    function V(O) {
      Y(O.el);
    }
    function H(O) {
      const d = O.target;
      Y(d), v("update:editDescription", d.value), v("scheduleDraftSave", O);
    }
    function A() {
      v("saveTitleAndDesc"), x.value = !1;
    }
    const y = P(!1), $ = P(!1), h = P(null), L = P(null), U = P(!1), G = P(!1), q = P(!1), E = P(""), M = P(null), et = P(null), yt = P(null), _ = P([]), ht = P(!1), a = P("");
    let z;
    ct(() => [p.state.taskId, G.value], async (O, d, g) => {
      if (z?.abort(), !G.value) return;
      const Q = new AbortController();
      z = Q, g(() => Q.abort()), _.value = [], ht.value = !0, a.value = "";
      try {
        const _t = await at.getLabels(Q.signal);
        Q.signal.aborted || (_.value = _t.map((jt) => jt.name));
      } catch {
        Q.signal.aborted || (a.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        Q.signal.aborted || (ht.value = !1);
      }
    });
    function R() {
      q.value = !0;
    }
    const W = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function X(O) {
      switch (O) {
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
    function ot(O) {
      U.value = !1, v("selectPriority", O);
    }
    const ut = lt(() => {
      const O = /* @__PURE__ */ new Set([..._.value, ...p.availableLabels || []]);
      for (const d of p.state.labels || []) O.add(d);
      return Array.from(O);
    }), pt = lt(() => {
      const O = E.value.trim().toLowerCase();
      return O ? ut.value.filter((d) => d.toLowerCase().includes(O)) : ut.value;
    });
    function mt() {
      const O = E.value.trim();
      O && (v("createLabel", O), E.value = "");
    }
    function nt(O, d) {
      Me.open(O, d);
    }
    const wt = P(0);
    function Bt() {
      wt.value++;
    }
    te(() => {
      window.addEventListener("storage", Bt), window.addEventListener("todoist-repository-links-changed", Bt);
    }), Ut(() => {
      window.removeEventListener("storage", Bt), window.removeEventListener("todoist-repository-links-changed", Bt);
    });
    const Tt = lt(() => (wt.value, no(p.state.taskId, p.editDescription)));
    function Rt(O) {
      so.open(O);
    }
    function At(O, d) {
      if (!O) return "";
      try {
        const g = O.split("-"), Q = parseInt(g[1], 10), _t = parseInt(g[2], 10), jt = d ? ` ${d}` : "";
        return `${Q}月${_t}日${jt}`;
      } catch {
        return O;
      }
    }
    function Yt(O) {
      if (!O) return "";
      try {
        const d = new Date(O);
        return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } catch {
        return O;
      }
    }
    function Xt(O) {
      if (!O) return "刚刚";
      try {
        const d = new Date(O);
        return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } catch {
        return O;
      }
    }
    return (O, d) => l.state.isOpen ? (r(), u("div", la, [
      t("main", ra, [
        l.state.error ? (r(), u("p", da, m(l.state.error), 1)) : C("", !0),
        Tt.value.length ? (r(), u("div", ca, [
          (r(!0), u(it, null, dt(Tt.value, (g) => (r(), u("button", {
            key: g.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(f)("todoist.linkRepoTitle", { name: g.fullName }),
            onClick: (Q) => Rt(g.fullName)
          }, [
            d[38] || (d[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", pa, m(g.fullName), 1),
            d[39] || (d[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, ua))), 128))
        ])) : C("", !0),
        t("section", ma, [
          t("div", fa, [
            t("button", {
              type: "button",
              class: Z(["task-complete-circle-btn", { completed: l.isTaskCompleted }]),
              title: e(f)("todoist.toggleComplete"),
              onClick: d[0] || (d[0] = (g) => v("toggleComplete"))
            }, [
              l.isTaskCompleted ? (r(), u("span", ga, "✓")) : C("", !0)
            ], 10, va),
            t("textarea", {
              value: l.editTitle,
              rows: "1",
              "aria-label": e(f)("todoist.taskTitle"),
              onVnodeMounted: V,
              onVnodeUpdated: V,
              disabled: l.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: B,
              class: Z(["inspector-input-title", { "title-done": l.isTaskCompleted }]),
              placeholder: e(f)("todoist.taskTitle"),
              onInput: d[1] || (d[1] = (g) => {
                Y(g.target), v("update:editTitle", g.target.value), v("scheduleDraftSave", g);
              }),
              onCompositionend: d[2] || (d[2] = (g) => v("scheduleDraftSave", g)),
              onBlur: d[3] || (d[3] = (g) => v("saveTitleAndDesc", g)),
              onKeydown: d[4] || (d[4] = St(K((g) => v("saveTitleAndDesc", g), ["prevent"]), ["enter"]))
            }, null, 42, ba)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: d[7] || (d[7] = K((g) => v("dragover"), ["prevent"])),
          onDragleave: d[8] || (d[8] = K((g) => v("dragleave"), ["prevent"])),
          onDrop: d[9] || (d[9] = K((g) => v("dropImage", g), ["prevent"]))
        }, [
          x.value ? (r(), u("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: D,
            value: l.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(f)("todoist.taskDesc"),
            disabled: l.isUploadingImg,
            onInput: H,
            onCompositionend: d[5] || (d[5] = (g) => v("scheduleDraftSave", g)),
            onBlur: A,
            onPaste: d[6] || (d[6] = (g) => v("descPaste", g))
          }, null, 40, ka)) : (r(), u("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: T,
            onKeydown: St(K(T, ["prevent"]), ["enter"])
          }, [
            l.editDescription ? (r(), u("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: F.value
            }, null, 8, wa)) : (r(), u("span", ha, "≡ 描述"))
          ], 40, ya)),
          l.isUploadingImg ? (r(), u("small", Ta, "图片上传中…")) : C("", !0),
          l.attachedImages.length ? (r(), u("div", Da, [
            (r(!0), u(it, null, dt(l.attachedImages, (g) => (r(), u("div", {
              key: g.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (Q) => nt(g.url, g.name)
              }, [
                t("img", {
                  src: g.url,
                  alt: g.name,
                  loading: "lazy"
                }, null, 8, Ca)
              ], 8, xa),
              t("div", $a, [
                t("span", null, m(g.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Q) => v("removeAttachedImage", g.url)
                }, "×", 8, Sa)
              ])
            ]))), 128))
          ])) : C("", !0)
        ], 32),
        t("section", _a, [
          l.subtasks.length > 0 ? (r(), u("div", Ia, [
            (r(!0), u(it, null, dt(l.subtasks, (g) => (r(), u("div", {
              key: g.id,
              class: Z(["subtask-row-item", { done: g.completed }])
            }, [
              t("button", {
                type: "button",
                class: Z(["subtask-check-circle", { checked: g.completed }]),
                onClick: (Q) => v("toggleSubtask", g.id)
              }, [
                g.completed ? (r(), u("span", La, "✓")) : C("", !0)
              ], 10, Ra),
              t("span", Pa, m(g.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(f)("todoist.subtask.delete"),
                onClick: (Q) => v("removeSubtask", g.id)
              }, "×", 8, Ma)
            ], 2))), 128))
          ])) : C("", !0),
          l.isAddingSubtask ? (r(), u("div", Oa, [
            t("input", {
              value: l.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(f)("todoist.subtask.inputPlaceholder"),
              onInput: d[10] || (d[10] = (g) => v("update:newSubtaskText", g.target.value)),
              onKeydown: [
                d[11] || (d[11] = St(K((g) => v("confirmAddSubtask"), ["prevent"]), ["enter"])),
                d[12] || (d[12] = St((g) => v("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Aa),
            t("div", ja, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: d[13] || (d[13] = (g) => v("confirmAddSubtask"))
              }, m(e(f)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: d[14] || (d[14] = (g) => v("update:isAddingSubtask", !1))
              }, m(e(f)("common.cancel")), 1)
            ])
          ])) : (r(), u("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: d[15] || (d[15] = (g) => v("update:isAddingSubtask", !0))
          }, [
            d[40] || (d[40] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Wt(" " + m(e(f)("todoist.subtask.add")), 1)
          ]))
        ]),
        (r(), Ot(Uo, {
          key: l.state.taskId,
          "task-id": l.state.taskId,
          description: l.editDescription,
          title: l.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", Ea, [
          t("div", Wa, [
            d[41] || (d[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Ua, [
              t("input", {
                value: l.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(f)("todoist.comment.placeholder"),
                disabled: l.isSubmittingComment,
                onInput: d[16] || (d[16] = (g) => v("update:newCommentText", g.target.value)),
                onKeydown: d[17] || (d[17] = St(K((g) => v("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Ba),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(f)("todoist.comment.attachPhoto"),
                onClick: d[18] || (d[18] = K((g) => v("triggerFileInput"), ["stop"]))
              }, "📎", 8, za)
            ]),
            l.newCommentText.trim() ? (r(), u("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: l.isSubmittingComment,
              onClick: d[19] || (d[19] = (g) => v("submitComment"))
            }, m(e(f)("todoist.comment.send")), 9, Ha)) : C("", !0)
          ]),
          l.state.comments.length > 0 ? (r(), u("div", Na, [
            (r(!0), u(it, null, dt(l.state.comments, (g) => (r(), u("div", {
              key: g.id,
              class: "comment-item"
            }, [
              d[43] || (d[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", Va, [
                t("div", Ka, [
                  d[42] || (d[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", Fa, m(Xt(g.postedAt)), 1)
                ]),
                t("div", Ya, m(g.content), 1),
                g.attachment?.url ? (r(), u("div", Xa, [
                  t("img", {
                    src: g.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Q) => nt(g.attachment.url, g.attachment.name)
                  }, null, 8, Ga)
                ])) : C("", !0)
              ])
            ]))), 128))
          ])) : C("", !0)
        ])
      ]),
      t("aside", qa, [
        t("div", Qa, [
          d[45] || (d[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: h,
            type: "button",
            class: Z(["side-item-row click-row", { active: y.value, filled: !!l.editStartDate }]),
            onClick: d[21] || (d[21] = (g) => y.value = !y.value)
          }, [
            d[44] || (d[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", Ja, m(At(l.editStartDate, l.editStartTime) || "安排日期"), 1),
            l.editStartDate ? (r(), u("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: d[20] || (d[20] = K((g) => v("clearStartDate"), ["stop"]))
            }, "×")) : C("", !0)
          ], 2),
          y.value ? (r(), Ot(Pe, {
            key: 0,
            "model-value": l.editStartDate,
            "time-value": l.editStartTime,
            "anchor-el": h.value,
            "onUpdate:modelValue": d[22] || (d[22] = (g) => v("update:editStartDate", g)),
            "onUpdate:timeValue": d[23] || (d[23] = (g) => v("update:editStartTime", g)),
            onChange: d[24] || (d[24] = (g) => v("startChange")),
            onClose: d[25] || (d[25] = (g) => y.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", Za, [
          d[47] || (d[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: L,
            type: "button",
            class: Z(["side-item-row click-row", { active: $.value, filled: !!l.editDueDate }]),
            onClick: d[27] || (d[27] = (g) => $.value = !$.value)
          }, [
            d[46] || (d[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", tl, m(At(l.editDueDate, l.editDueTime) || e(f)("todoist.prop.setDueDate")), 1),
            l.editDueDate ? (r(), u("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(f)("todoist.prop.clearDueDate"),
              onClick: d[26] || (d[26] = K((g) => v("clearDueDate"), ["stop"]))
            }, "×", 8, el)) : C("", !0)
          ], 2),
          $.value ? (r(), Ot(Pe, {
            key: 0,
            "model-value": l.editDueDate,
            "time-value": l.editDueTime,
            "anchor-el": L.value,
            "onUpdate:modelValue": d[28] || (d[28] = (g) => v("update:editDueDate", g)),
            "onUpdate:timeValue": d[29] || (d[29] = (g) => v("update:editDueTime", g)),
            onChange: d[30] || (d[30] = (g) => v("dueChange")),
            onClose: d[31] || (d[31] = (g) => $.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", ol, [
          t("span", nl, m(e(f)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: yt,
            type: "button",
            class: "side-item-row",
            onClick: d[32] || (d[32] = (g) => U.value = !0)
          }, [
            t("span", {
              style: bt({ color: X(l.state.priority) })
            }, "⚑", 4),
            t("span", sl, "P" + m(5 - l.state.priority), 1),
            d[48] || (d[48] = t("span", null, "⌄", -1))
          ], 512),
          U.value ? (r(), Ot(Le, {
            key: 0,
            anchor: yt.value,
            onClose: d[33] || (d[33] = (g) => U.value = !1)
          }, {
            default: ie(() => [
              t("div", il, [
                (r(), u(it, null, dt(W, (g) => t("button", {
                  key: g.level,
                  type: "button",
                  disabled: !!e(J).pendingWrites,
                  onClick: (Q) => ot(g.level)
                }, [
                  t("span", {
                    style: bt({ color: g.color })
                  }, "⚑", 4),
                  Wt(" " + m(g.name) + " ", 1),
                  l.state.priority === g.level ? (r(), u("span", ll, "✓")) : C("", !0)
                ], 8, al)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", rl, [
          t("span", dl, m(e(f)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: M,
            type: "button",
            class: "side-item-row",
            onClick: d[34] || (d[34] = (g) => G.value = !0)
          }, [
            t("span", cl, m(l.state.labels.join("、") || e(f)("todoist.prop.addLabels")), 1),
            d[49] || (d[49] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (r(), Ot(Le, {
            key: 0,
            anchor: M.value,
            onClose: d[36] || (d[36] = (g) => G.value = !1)
          }, {
            default: ie(() => [
              t("div", ul, [
                Mt(t("input", {
                  "onUpdate:modelValue": d[35] || (d[35] = (g) => E.value = g),
                  placeholder: e(f)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(f)("todoist.prop.searchLabelAria"),
                  onKeydown: St(K(mt, ["prevent"]), ["enter"])
                }, null, 40, pl), [
                  [Kt, E.value]
                ]),
                ht.value ? (r(), u("small", ml, m(e(f)("todoist.prop.readingLabels")), 1)) : C("", !0),
                a.value ? (r(), u("p", fl, m(a.value), 1)) : C("", !0),
                t("div", vl, [
                  (r(!0), u(it, null, dt(pt.value, (g) => (r(), u("label", {
                    key: g,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + m(g), 1),
                    t("input", {
                      type: "checkbox",
                      checked: l.state.labels.includes(g),
                      disabled: !!e(J).pendingWrites,
                      onChange: (Q) => v("toggleLabelSelect", g)
                    }, null, 40, gl)
                  ]))), 128))
                ]),
                E.value.trim() && !ut.value.includes(E.value.trim()) ? (r(), u("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(J).pendingWrites,
                  onClick: mt
                }, m(e(f)("todoist.prop.createLabelBtn", { name: E.value.trim() })), 9, bl)) : C("", !0),
                !ht.value && !pt.value.length && !E.value ? (r(), u("small", kl, m(e(f)("todoist.prop.noLabels")), 1)) : C("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", yl, [
          t("span", hl, [
            Wt(m(e(f)("todoist.prop.reminder")) + " ", 1),
            t("small", null, m(e(f)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: et,
            type: "button",
            class: "side-item-row",
            onClick: R
          }, [
            t("span", wl, m(Yt(l.state.reminderTime) || e(f)("todoist.prop.addReminder")), 1),
            d[50] || (d[50] = t("span", null, "＋", -1))
          ], 512),
          q.value ? (r(), Ot(aa, {
            key: 0,
            anchor: et.value,
            "task-id": l.state.taskId,
            value: l.state.reminderTime,
            "task-date": l.editStartDate || l.editDueDate,
            "task-time": l.editStartTime || l.editDueTime,
            onClose: d[37] || (d[37] = (g) => q.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : C("", !0)
        ])
      ])
    ])) : C("", !0);
  }
}), Dl = /* @__PURE__ */ ee(Tl, [["__scopeId", "data-v-817d9116"]]), xl = { class: "inspector-title-row" }, Cl = ["title", "aria-label"], $l = ["disabled"], Sl = ["href"], _l = "todoistInspectorPositionV2", Il = /* @__PURE__ */ zt({
  __name: "TodoistInspectorDrawer",
  setup(l) {
    const s = k, p = lt(() => Pt.get(s.taskId)), v = lt(() => p.value?.status === "failed" ? "保存未确认" : p.value?.status === "saving" ? "正在保存…" : Y.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), x = lt(() => [
      v.value,
      p.value?.status === "failed" ? p.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: D,
      headerRef: B,
      initialStyle: I,
      onHeaderPointerDown: F,
      onResizePointerDown: T
    } = eo({
      windowId: "todoist-inspector",
      storageKey: _l,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => s.isOpen && J.active
    }), Y = P(""), V = P(""), H = P(""), A = P(""), y = P(""), $ = P(""), h = P(!1), L = P(!1), U = P(null), G = P(!1), q = P(""), E = P(""), M = P(!1), et = lt(() => {
      const w = s.description || "", b = [], S = w.split(`
`);
      let ft = 0;
      for (const Ct of S) {
        const vt = Ct.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        vt && b.push({
          id: `st_${ft++}`,
          completed: vt[1].toLowerCase() === "x",
          text: vt[2].trim()
        });
      }
      return b;
    }), yt = lt(() => et.value.filter((w) => w.completed).length);
    function _(w) {
      const ft = (s.description || "").split(`
`).filter((Gt) => !Gt.match(/^\s*-\s*\[([ xX])\]/)), Ct = w.map((Gt) => `- [${Gt.completed ? "x" : " "}] ${Gt.text}`), vt = [...ft, ...Ct].join(`
`).trim();
      V.value = vt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(Y.value, vt);
    }
    function ht() {
      if (!q.value.trim()) return;
      const w = [...et.value, {
        id: `st_${Date.now()}`,
        text: q.value.trim(),
        completed: !1
      }];
      q.value = "", G.value = !1, _(w);
    }
    function a(w) {
      const b = et.value.map((S) => S.id === w ? { ...S, completed: !S.completed } : S);
      _(b);
    }
    function z(w) {
      const b = et.value.filter((S) => S.id !== w);
      _(b);
    }
    const R = lt(() => {
      for (const w of kt.columns || []) {
        const b = w.tasks.find((S) => S.id === s.taskId);
        if (b) return !!b.completed;
      }
      return !1;
    });
    async function W() {
      for (const w of kt.columns || []) {
        const b = w.tasks.find((S) => S.id === s.taskId);
        if (b) {
          const S = !b.completed;
          b.completed = S, b._taskRaw && (b._taskRaw.checked = S);
          try {
            await at.toggleTaskCompletion(b.id, S);
          } catch {
            b.completed = !S, b._taskRaw && (b._taskRaw.checked = !S), s.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function X(w) {
      rt.setPriority(w);
    }
    function ot(w) {
      rt.toggleLabel(w);
    }
    function ut(w) {
      rt.toggleLabel(w);
    }
    async function pt(w) {
      w.trim() && (s.labels.includes(w.trim()) || await rt.createAndAttachLabel(w.trim()));
    }
    async function mt() {
      if (!E.value.trim() || M.value) return;
      const w = E.value.trim();
      M.value = !0;
      try {
        await rt.addComment(w), E.value = "";
      } finally {
        M.value = !1;
      }
    }
    ct(() => s.title, (w) => {
      Y.value = w || "";
    }, { immediate: !0 }), ct(() => s.description, (w) => {
      V.value = (w || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => s.startDate, (w) => {
      H.value = w || "";
    }, { immediate: !0 }), ct(() => s.startTime, (w) => {
      A.value = w || "";
    }, { immediate: !0 }), ct(() => s.dueDate, (w) => {
      y.value = w || "";
    }, { immediate: !0 }), ct(() => s.dueTime, (w) => {
      $.value = w || "";
    }, { immediate: !0 });
    function nt() {
      const w = /* @__PURE__ */ new Date();
      return `${w.getFullYear()}-${String(w.getMonth() + 1).padStart(2, "0")}-${String(w.getDate()).padStart(2, "0")}`;
    }
    function wt() {
      A.value && !H.value && (H.value = nt()), rt.setStartDateAndTime(H.value, A.value);
    }
    function Bt() {
      A.value = "", wt();
    }
    function Tt() {
      H.value = "", A.value = "", wt();
    }
    function Rt() {
      $.value && !y.value && (y.value = nt()), rt.setDueDateAndTime(y.value, $.value);
    }
    function At() {
      $.value = "", Rt();
    }
    function Yt() {
      y.value = "", $.value = "", Rt();
    }
    const Xt = lt(() => {
      const w = [], b = /* @__PURE__ */ new Set(), S = s.description || "", ft = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Ct;
      for (; (Ct = ft.exec(S)) !== null; ) {
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
    let O, d;
    function g() {
      const w = (s.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), b = [V.value.trim(), w].filter(Boolean);
      return {
        taskId: s.taskId,
        title: Y.value,
        description: b.join(`

`)
      };
    }
    function Q() {
      clearTimeout(O), O = void 0;
      const w = d;
      if (d = void 0, w?.taskId && w.title.trim())
        return rt.saveTitleAndDesc(w.title, w.description, w.taskId);
    }
    function _t(w) {
      w && "isComposing" in w && w.isComposing || (d = g(), rt.stageTitleDraft(d.taskId, d.title, d.description), clearTimeout(O), O = setTimeout(Q, 800));
    }
    ct(() => s.taskId, () => Q(), { flush: "sync" });
    function jt() {
      Q(), rt.close();
    }
    function fe(w) {
      w && "isComposing" in w && w.isComposing || Q();
    }
    function ve() {
      d = g(), Q();
    }
    function ge(w) {
      const b = Ht(w);
      b && (w.preventDefault(), w.stopPropagation(), Nt(b));
    }
    function be() {
      J.active && U.value?.click();
    }
    async function ke(w) {
      const b = w.target;
      if (!J.active) {
        b.value = "";
        return;
      }
      const S = b.files?.[0];
      S && await Nt(S), b.value = "";
    }
    async function ye(w) {
      L.value = !1;
      const b = w.dataTransfer?.files?.[0];
      b && (b.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(b.name)) && await Nt(b);
    }
    function Ht(w) {
      const b = w.clipboardData;
      if (!b) return null;
      if (b.files && b.files.length > 0)
        for (let S = 0; S < b.files.length; S++) {
          const ft = b.files[S];
          if (ft.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(ft.name))
            return ft;
        }
      if (b.items && b.items.length > 0)
        for (let S = 0; S < b.items.length; S++) {
          const ft = b.items[S];
          if (ft.type.includes("image")) {
            const Ct = ft.getAsFile();
            if (Ct) return Ct;
          }
        }
      return null;
    }
    async function Nt(w) {
      if (h.value || !J.active || !s.taskId) return;
      const b = s.taskId;
      h.value = !0;
      try {
        if (await Q(), s.taskId !== b || !s.isOpen || !J.active) return;
        await rt.attachImageToTask(w);
      } catch (S) {
        s.taskId === b && (s.error = S instanceof Error ? S.message : "上传失败");
      } finally {
        h.value = !1;
      }
    }
    function he(w) {
      const b = Ht(w);
      b && (w.preventDefault(), Nt(b));
    }
    function oe(w) {
      if (!s.isOpen || !J.active) return;
      const b = Ht(w);
      b && (w.preventDefault(), w.stopPropagation(), Nt(b));
    }
    ct(() => J.active, (w) => {
      window.removeEventListener("paste", oe, { capture: !0 }), w && window.addEventListener("paste", oe, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Ut(() => {
      Q(), window.removeEventListener("paste", oe, { capture: !0 });
    });
    async function le(w) {
      const b = s.description || "", S = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ft = b.replace(new RegExp(`!\\[[^\\]]*\\]\\(${S}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(s.title, ft);
    }
    return (w, b) => Mt((r(), u("aside", {
      ref_key: "panelRef",
      ref: D,
      class: "todoist-inspector-window",
      style: bt(e(I)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: he
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: B,
        class: "inspector-header",
        onPointerdown: b[2] || (b[2] = (S) => e(F)(S))
      }, [
        t("div", xl, [
          b[18] || (b[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          p.value ? (r(), u("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: b[0] || (b[0] = K(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: x.value,
              "aria-label": x.value
            }, m(v.value), 9, Cl),
            p.value.status !== "saving" ? (r(), u("button", {
              key: 0,
              type: "button",
              disabled: e(s).saving || !Y.value.trim(),
              onClick: K(ve, ["stop"])
            }, m(p.value.status === "failed" ? "重试保存" : "保存草稿"), 9, $l)) : C("", !0)
          ], 32)) : C("", !0),
          e(s).url ? (r(), u("a", {
            key: 1,
            href: e(s).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Sl)) : C("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: b[1] || (b[1] = K(() => {
          }, ["stop"])),
          onClick: K(jt, ["stop"])
        }, "×", 32)
      ], 544),
      e(s).isOpen ? (r(), Ot(Dl, {
        key: e(s).taskId,
        state: e(s),
        "edit-title": Y.value,
        "onUpdate:editTitle": b[3] || (b[3] = (S) => Y.value = S),
        "edit-description": V.value,
        "onUpdate:editDescription": b[4] || (b[4] = (S) => V.value = S),
        "edit-start-date": H.value,
        "onUpdate:editStartDate": b[5] || (b[5] = (S) => H.value = S),
        "edit-start-time": A.value,
        "onUpdate:editStartTime": b[6] || (b[6] = (S) => A.value = S),
        "edit-due-date": y.value,
        "onUpdate:editDueDate": b[7] || (b[7] = (S) => y.value = S),
        "edit-due-time": $.value,
        "onUpdate:editDueTime": b[8] || (b[8] = (S) => $.value = S),
        "is-uploading-img": h.value,
        "is-drag-over": L.value,
        "is-task-completed": R.value,
        subtasks: et.value,
        "completed-subtasks-count": yt.value,
        "is-adding-subtask": G.value,
        "onUpdate:isAddingSubtask": b[9] || (b[9] = (S) => G.value = S),
        "new-subtask-text": q.value,
        "onUpdate:newSubtaskText": b[10] || (b[10] = (S) => q.value = S),
        "new-comment-text": E.value,
        "onUpdate:newCommentText": b[11] || (b[11] = (S) => E.value = S),
        "is-submitting-comment": M.value,
        "attached-images": Xt.value,
        "available-labels": e(kt).availableLabels || [],
        onScheduleDraftSave: _t,
        onSaveTitleAndDesc: fe,
        onToggleComplete: W,
        onTriggerFileInput: be,
        onDragover: b[12] || (b[12] = (S) => L.value = !0),
        onDragleave: b[13] || (b[13] = (S) => L.value = !1),
        onDropImage: ye,
        onDescPaste: ge,
        onRemoveAttachedImage: le,
        onToggleSubtask: a,
        onRemoveSubtask: z,
        onConfirmAddSubtask: ht,
        onSubmitComment: mt,
        onStartChange: wt,
        onClearStartDate: Tt,
        onClearStartTime: Bt,
        onDueChange: Rt,
        onClearDueDate: Yt,
        onClearDueTime: At,
        onSelectPriority: X,
        onToggleLabelSelect: ot,
        onRemoveLabel: ut,
        onCreateLabel: pt
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : C("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: U,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ke
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: b[14] || (b[14] = (S) => e(T)(S, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: b[15] || (b[15] = (S) => e(T)(S, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: b[16] || (b[16] = (S) => e(T)(S, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: b[17] || (b[17] = (S) => e(T)(S, "w"))
      }, null, 32)
    ], 36)), [
      [Re, e(s).isOpen]
    ]);
  }
}), Rl = /* @__PURE__ */ ee(Il, [["__scopeId", "data-v-35222deb"]]), Ll = { class: "vue-todoist-workspace-wrapper" }, Pl = ["aria-label"], Ml = { class: "todoist-head-title-wrap" }, Ol = { id: "todoist-workspace-title" }, Al = ["aria-label"], jl = ["title"], El = {
  class: "muted small",
  role: "status"
}, Wl = ["title", "aria-expanded"], Ul = ["title"], Bl = ["title"], zl = ["title"], Hl = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Nl = { class: "todoist-workspace-cal-area" }, Vl = { class: "todoist-workspace-task-area" }, Kl = "todoistWorkspacePosition", dr = /* @__PURE__ */ zt({
  __name: "TodoistWorkspace",
  setup(l) {
    const s = P(!1), p = To(() => import("./TodoistAccountSettings-BhDjpcuQ.js")), v = P(!1), x = P(!1), D = P(!document.hidden), B = P(!1), I = lt(() => J.visible && D.value);
    J.session++, J.active = I.value, oo(
      () => I.value && !kt.movingTaskId,
      Zt,
      () => tt.loadWorkspace(void 0, void 0, !0)
    );
    let F = !1;
    const T = P(null), Y = Lo;
    function V() {
      H.value && (H.value.style.removeProperty("width"), H.value.style.removeProperty("height"), H.value.style.removeProperty("left"), H.value.style.removeProperty("top"), H.value.style.removeProperty("right"), H.value.style.removeProperty("bottom"), H.value.style.removeProperty("margin"), H.value.style.removeProperty("transform"));
    }
    ct(() => J.visible, (R) => {
      R && (Y.isOpen = !0, J.active = D.value, tt.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: H,
      headerRef: A,
      initialStyle: y,
      stopInteractions: $,
      onHeaderPointerDown: h,
      onResizePointerDown: L,
      bringToFront: U
    } = eo({
      windowId: "todoist",
      storageKey: Kl,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => I.value
    }), G = () => H.value;
    function q() {
      Zt(), Io(), Ro(), rt.cancelReads(), $(), window.removeEventListener("keydown", et);
    }
    const E = Co(q);
    function M() {
      D.value = !document.hidden;
    }
    function et(R) {
      R.key === "Escape" && k.isOpen && (R.preventDefault(), R.stopPropagation(), rt.close());
    }
    ct(I, (R) => {
      J.active = R, R ? (window.addEventListener("keydown", et), F || (F = !0, tt.loadWorkspace()), It(() => {
        I.value && U();
      })) : q();
    }, { flush: "sync" }), ct(v, (R) => {
      R && (x.value = !0);
    }), ct([I, s, Ge], ([R, W, X]) => {
      if (!(!R || !W || !X) && (Ge.value = null, Po("todoist") === X.transition)) {
        if (J.pendingWrites || k.isOpen && k.taskId !== X.id) {
          Ao.show({ appName: "Todoist", title: f("todoist.retainDetailTitle"), message: f("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        k.isOpen && k.taskId === X.id || rt.openTask(X.id);
      }
    }, { flush: "post" }), te(() => {
      s.value = !0, B.value && It(V), ce.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: G }), document.addEventListener("visibilitychange", M), I.value && (window.addEventListener("keydown", et), F || (F = !0, tt.loadWorkspace()), Ye.refresh());
    }), Ut(() => {
      $o(), E(), document.removeEventListener("visibilitychange", M), ce.unregister("todoist", G), rt.close(), Object.assign(k, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), tt.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Se.updateState({ title: f("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ye.update([]);
    });
    function yt() {
      Se.toggleCalendar();
    }
    function _() {
      Se.refresh();
    }
    function ht() {
      tt.updateState({ accountConfigured: !0 }), I.value && tt.loadWorkspace(void 0, void 0, !0);
    }
    function a() {
      ce.minimize("todoist");
    }
    function z() {
      J.visible = !1, Y.isOpen = !1, ce.close("todoist");
    }
    return (R, W) => (r(), u("div", Ll, [
      Mt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: H,
        class: "card wide todoist-workspace",
        style: bt(e(y)),
        "aria-label": e(f)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: A,
          class: "todoist-workspace-head",
          onPointerdown: W[4] || (W[4] = (X) => e(h)(X))
        }, [
          t("div", Ml, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Ol, m(e(Y).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(f)("todoist.viewAria")
          }, [
            Jt(Yo)
          ], 8, Al),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: Z(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(Y).isCalendarOpen }]),
            type: "button",
            title: e(f)("todoist.calendarToggleTitle"),
            onClick: yt
          }, " 📅 " + m(e(f)("todoist.calendar")), 11, jl),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", El, m(e(J).pendingWrites ? e(f)("todoist.pendingWrites") : e(f)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: T,
            type: "button",
            class: "no-drag",
            title: e(f)("todoist.settingsTitle"),
            "aria-expanded": v.value,
            onClick: W[0] || (W[0] = K((X) => v.value = !v.value, ["stop"]))
          }, " ⚙️ ", 8, Wl),
          x.value ? (r(), Ot(e(p), {
            key: 0,
            visible: I.value && v.value,
            anchor: T.value,
            onClose: W[1] || (W[1] = (X) => v.value = !1),
            onAccountSaved: ht
          }, null, 8, ["visible", "anchor"])) : C("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: e(f)("common.refresh"),
            onClick: _
          }, " ↻ ", 8, Ul),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(f)("todoist.minimizeHint"),
            onPointerdown: W[2] || (W[2] = K(() => {
            }, ["stop"])),
            onClick: K(a, ["stop"])
          }, " − ", 40, Bl),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(f)("todoist.closeHint"),
            onPointerdown: W[3] || (W[3] = K(() => {
            }, ["stop"])),
            onClick: K(z, ["stop"])
          }, " ✕ ", 40, zl)
        ], 544),
        e(kt).accountConfigured === !1 ? (r(), Ot(Mo, {
          key: 0,
          icon: "✅",
          title: e(f)("todoist.tokenMissingTitle"),
          description: e(f)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(f)("todoist.getToken"),
          onConfigure: W[5] || (W[5] = (X) => v.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), u("div", Hl, [
          Mt(t("div", Nl, [
            Jt(Bn)
          ], 512), [
            [Re, e(Y).isCalendarOpen]
          ]),
          t("div", Vl, [
            Jt(qi)
          ])
        ])),
        Jt(Rl),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        B.value ? C("", !0) : (r(), u(it, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: W[6] || (W[6] = (X) => e(L)(X, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: W[7] || (W[7] = (X) => e(L)(X, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: W[8] || (W[8] = (X) => e(L)(X, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: W[9] || (W[9] = (X) => e(L)(X, "w"))
          }, null, 32)
        ], 64))
      ], 12, Pl), [
        [Re, e(J).visible]
      ])
    ]));
  }
});
export {
  dr as default
};
