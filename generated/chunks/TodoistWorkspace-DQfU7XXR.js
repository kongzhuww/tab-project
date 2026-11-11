import { d as zt, o as r, e as u, F as it, i as t, u as e, A as Z, t as f, r as Qt, w as ct, x as At, B as te, m as Ut, g as dt, h as F, f as C, b as P, M as to, G as Ne, z as bt, s as lt, D as It, l as Mt, n as Kt, p as Jt, H as ie, k as St, j as Ot, y as Re, C as To } from "./vendor-vue-9b0eS4bW.js";
import { a as Do, t as J, w as xo, o as Co, p as $o } from "./module-state-D4Dr89rP.js";
import { b as Ke, h as Fe, i as Zt, j as kt, e as tt, d as gt, c as So, k as _o, t as Ye, g as Se, l as Io, m as Ro, n as Lo } from "./calendar.service-DnkbEAru.js";
import { u as eo } from "./useWindowDraggable-CH36ZGqj.js";
import { w as ce, b as Po } from "./window-manager.store-BdI_8a-H.js";
import { t as v, _ as ee } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { A as Mo } from "./AccountSetupGuide-DHqCWacl.js";
import { i as Me } from "./image-viewer-store-CcKACbML.js";
import { d as Oo, n as Ao } from "./view-styles-CD3MhxLh.js";
import { t as at, d as jo, s as Eo, b as ue, g as Xe, f as _e, p as Wo } from "./todoist.service-By6xSyz1.js";
import { g as oo, T as Uo } from "./TaskRepositoryLinks-C5dcMqXp.js";
import { g as Bo } from "./bili-video-links-DXpyplJq.js";
import { g as zo } from "./web-site-links-BSIympLj.js";
import { v as no, D as Ho } from "./search.service-wriY3nvN.js";
import { I as Le, T as Pe } from "./TodoistDatePickerPopover-D8yR_FLS.js";
import { m as Vo } from "./core-utils-B2N4WtKx.js";
import { pendingTodoistTask as Ge } from "./task-navigation-CvM3gAxl.js";
const No = ["title"], Ko = { class: "todoist-tab-text" }, Fo = ["title"], Yo = { class: "todoist-tab-text" }, Xo = /* @__PURE__ */ zt({
  __name: "TodoistWorkspaceTabs",
  setup(a) {
    return (s, p) => (r(), u(it, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: Z({ on: e(Fe).view === "inbox" }),
        title: e(v)("todoist.inbox"),
        onClick: p[0] || (p[0] = (m) => e(Ke).switchView("inbox"))
      }, [
        p[2] || (p[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", Ko, f(e(v)("todoist.inbox")), 1)
      ], 10, No),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: Z({ on: e(Fe).view === "projects" }),
        title: e(v)("todoist.projects"),
        onClick: p[1] || (p[1] = (m) => e(Ke).switchView("projects"))
      }, [
        p[3] || (p[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", Yo, f(e(v)("todoist.projects")), 1)
      ], 10, Fo)
    ], 64));
  }
}), so = "todoist_reminder_v2:", Go = "todoist_remind_";
async function qo(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const s = so + a, p = await chrome.storage.local.get([s, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(p, s) ? p[s] || void 0 : p.todoist_reminders_map_v1?.[a];
}
async function Qo(a, s, p) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const m = new Date(s).getTime();
  if (s && (!Number.isFinite(m) || m <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (s && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const x = so + a, D = Go + a;
  await chrome.alarms.clear(D), await chrome.storage.local.set({ [x]: s ? { time: s, title: p } : null }), s && await chrome.alarms.create(D, { when: m });
}
const Pt = Qt(/* @__PURE__ */ new Map());
let Jo = 0;
function qe(a, s, p, m = "editing") {
  const x = ++Jo;
  return Pt.set(a, { revision: x, title: s, description: p, status: m, error: "" }), x;
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
function se(a = !0) {
  a && ae++;
  for (const s of Ft.values()) s.abort();
  Ft.clear(), k.loading = !1;
}
function Je(a) {
  Ft.get(a)?.abort();
  const s = new AbortController();
  Ft.set(a, s);
  const p = ae, m = k.taskId;
  return {
    signal: s.signal,
    current: () => !s.signal.aborted && p === ae && k.isOpen && m === k.taskId && Ft.get(a) === s,
    finish: () => {
      Ft.get(a) === s && Ft.delete(a);
    }
  };
}
function Wt() {
  se(!1);
  const a = k.taskId, s = ae;
  return { taskId: a, current: () => k.isOpen && s === ae && a === k.taskId };
}
function Zo(a) {
  return new Promise((s) => {
    const p = new FileReader();
    p.onload = () => s(p.result || ""), p.onerror = () => s(""), p.readAsDataURL(a);
  });
}
function Ze(a, s, p) {
  for (const m of kt.columns)
    for (const x of m.tasks)
      String(x.id) === a && (x.content = s, p !== void 0 && (x.description = p), x._taskRaw && (x._taskRaw.content = s, p !== void 0 && (x._taskRaw.description = p)));
  gt.updateTaskTitle(a, s);
}
const tn = {
  state: k,
  cancelReads: se,
  stageTitleDraft(a, s, p) {
    a && (qe(a, s, p), se(!1), k.taskId === a && (k.title = s), Ze(a, s, p));
  },
  async openTask(a, s) {
    if (!a) return;
    if (se(), k.taskId = a, k.isOpen = !0, k.error = "", Object.assign(k, {
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
      const U = s.startDate || Xe(a, k.description), $ = ue(U);
      k.startDate = $.date, k.startTime = $.time, k.labels = [...s.labels || []], k.url = s.url || "";
    }
    const p = Pt.get(a);
    p && (k.title = p.title, k.description = p.description);
    const m = Je("reminder");
    qo(a).then((D) => {
      m.current() && (k.reminderTime = D?.time || "");
    }).catch(() => {
      m.current() && (k.error = "本机提醒读取失败。");
    }).finally(m.finish);
    const x = Je("detail");
    k.loading = !0;
    try {
      const D = await at.api(`/tasks/${encodeURIComponent(a)}`, { signal: x.signal });
      if (D && x.current()) {
        const U = Pt.get(a);
        k.title = U?.title ?? D.content ?? "", k.description = U?.description ?? D.description ?? "", k.priority = D.priority || 1;
        const $ = ue(D.due?.datetime || D.due?.date || "");
        k.dueDate = $.date, k.dueTime = $.time;
        const N = Xe(a, D.description || k.description), T = ue(N);
        k.startDate = T.date, k.startTime = T.time, k.labels = [...D.labels || []], k.url = D.url || "";
        try {
          const Y = await at.getComments(a, x.signal);
          if (Y && x.current()) {
            const K = [], H = [];
            for (const A of Y) {
              let y;
              if (A?.attachment?.file_url) {
                const S = A.attachment.file_name || "附件图片";
                K.push({ name: S, url: A.attachment.file_url }), y = { name: S, url: A.attachment.file_url };
              }
              H.push({
                id: A.id,
                content: A.content || "",
                postedAt: A.posted_at || "",
                attachment: y
              });
            }
            if (k.commentAttachments = K, k.comments = H, K.length > 0 && k.description) {
              let A = k.description, y = !1;
              for (const S of K) {
                const h = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                h.test(A) && (A = A.replace(h, `$1${S.url}$2`), y = !0);
              }
              if (y && !Pt.has(a)) {
                k.description = A;
                for (const S of kt.columns) {
                  const h = S.tasks.find((L) => String(L.id) === a);
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
  async setStartDateAndTime(a, s) {
    if (!k.taskId) return;
    const p = Wt(), m = a.trim(), x = m ? s.trim() : "";
    k.startDate = m, k.startTime = x, Zt();
    const D = jo(m, x);
    Eo(p.taskId, D), at.invalidateWorkspaceSnapshots();
    for (const U of kt.columns) {
      const $ = U.tasks.find((N) => N.id === p.taskId);
      $ && ($.startDate = D);
    }
  },
  async setDueDateAndTime(a, s) {
    if (!k.taskId) return;
    const p = Wt(), m = a.trim(), x = m ? s.trim() : "";
    k.dueDate = m, k.dueTime = x, Zt(), at.invalidateWorkspaceSnapshots();
    const D = (me.get(p.taskId) || 0) + 1;
    me.set(p.taskId, D);
    const U = Qe.then(async () => {
      try {
        const $ = await at.updateTask(p.taskId, {
          due_string: m ? x ? `${m} ${x}` : m : "no date"
        });
        if (me.get(p.taskId) !== D) return;
        const N = at.mapTasks([$], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const T of kt.columns) {
          const Y = T.tasks.findIndex((H) => H.id === p.taskId);
          if (Y < 0) continue;
          const K = T.tasks[Y];
          if (Object.assign(K, {
            dueDate: N.dueDate,
            dueText: N.dueText,
            dueString: N.dueString,
            isDueToday: N.isDueToday,
            isOverdue: N.isOverdue,
            isRecurring: N.isRecurring
          }), K._taskRaw && (K._taskRaw.due = $.due), kt.view === "today") {
            const H = N.isOverdue ? "overdue" : N.isDueToday ? "today" : "";
            H !== T.sectionId && (T.tasks.splice(Y, 1), kt.columns.find((A) => A.sectionId === H)?.tasks.push(K));
          }
        }
        p.current() && (k.error = "");
      } catch {
        p.current() && me.get(p.taskId) === D && (k.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Qe = U.catch(() => {
    }), await U;
  },
  async saveTitleAndDesc(a, s, p = k.taskId) {
    const m = p === k.taskId ? Wt() : { taskId: p, current: () => !1 };
    if (!m.taskId || !a.trim()) return;
    const x = a.trim(), D = s.trim(), U = qe(p, x, D, "saving");
    m.current() && (k.title = x, k.description = D), Ze(m.taskId, x, D), pe++, k.saving = !0;
    const $ = Ie.then(async () => {
      try {
        await at.updateTask(m.taskId, {
          content: x,
          description: D
        }), Pt.get(p)?.revision === U && Pt.delete(p), pe === 1 && Pt.size === 0 && tt.dispatch("refresh");
      } catch (N) {
        const T = Pt.get(p);
        T?.revision === U && (T.status = "failed", T.error = N instanceof Error ? N.message : "保存未确认");
      } finally {
        pe--, k.saving = pe > 0;
      }
    });
    Ie = $.catch(() => {
    }), await $;
  },
  async attachImageToTask(a) {
    const s = Wt();
    if (await Ie, !s.current()) return;
    if (Pt.has(s.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const p = k.description || "";
    if (!s.taskId || k.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    k.saving = !0;
    try {
      const m = a.name || `截图_${Date.now()}.png`;
      let x = "";
      try {
        const D = await at.uploadFile(a, m);
        D && D.file_url && (x = D.file_url);
      } catch (D) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", D), a.size <= 2.5 * 1024 * 1024)
          x = await Zo(a);
        else
          throw new Error(D?.message || "云端上传失败且文件超过2.5MB");
      }
      if (x) {
        const D = p ? `${p}

![${m}](${x})` : `![${m}](${x})`;
        await at.updateTask(s.taskId, {
          description: D
        }), s.current() && (k.description = D);
        for (const U of kt.columns) {
          const $ = U.tasks.find((N) => String(N.id) === s.taskId);
          if ($) {
            $.description = D, $._taskRaw && ($._taskRaw.description = D);
            break;
          }
        }
        tt.dispatch("refresh");
      }
    } catch (m) {
      s.current() && (k.error = m.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${m.message}`);
    } finally {
      k.saving = !1;
    }
  },
  async setPriority(a) {
    if (!k.taskId) return;
    const s = Wt();
    if (![1, 2, 3, 4].includes(a)) return;
    const p = k.priority;
    k.priority = a, Zt(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { priority: a });
      for (const m of kt.columns) {
        const x = m.tasks.find((D) => D.id === s.taskId);
        x && (x.priority = a, x._taskRaw && (x._taskRaw.priority = a));
      }
    } catch {
      s.current() && (k.priority = p, k.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!k.taskId) return;
    const s = Wt(), p = [...k.labels], x = p.includes(a) ? p.filter((D) => D !== a) : [...p, a];
    k.labels = x, Zt(), at.invalidateWorkspaceSnapshots();
    try {
      await at.updateTask(s.taskId, { labels: x });
      for (const D of kt.columns) {
        const U = D.tasks.find(($) => $.id === s.taskId);
        U && (U.labels = x, U._taskRaw && (U._taskRaw.labels = x));
      }
    } catch {
      s.current() && (k.labels = p, k.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const s = Wt();
    if (a = a.trim(), !(!s.taskId || !a))
      try {
        const p = await at.getLabels();
        if (!s.current()) return;
        p.some((m) => m.name === a) || await at.createLabel(a), s.current() && !k.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        s.current() && (k.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!k.taskId || !a.trim()) return;
    const s = Wt();
    try {
      const p = await at.addComment({
        task_id: s.taskId,
        content: a.trim()
      });
      p && s.current() && k.comments.push({
        id: p.id || `c_${Date.now()}`,
        content: p.content || a.trim(),
        postedAt: p.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (p) {
      s.current() && (k.error = "发送评论失败：" + (p?.message || ""));
    }
  },
  async setReminder(a) {
    const s = Wt();
    if (s.taskId)
      try {
        await Qo(s.taskId, a, k.title), s.current() && (k.reminderTime = a, k.error = "");
      } catch (p) {
        s.current() && (k.error = p instanceof Error ? p.message : "提醒未保存，请重试。");
      }
  }
}, rt = Do(tn, [
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
function io(a, s, p) {
  let m = !1, x;
  const D = ct(
    () => [J.dataRevision, a(), J.pendingWrites],
    ([U, $, N], T) => {
      T && U !== T[0] && (m = !0, s()), x && clearTimeout(x), !(!m || !$ || N) && (x = setTimeout(() => {
        x = void 0, !(!a() || J.pendingWrites) && (m = !1, p());
      }, 150));
    }
  );
  At(() => {
    D(), x && clearTimeout(x);
  });
}
const en = ["aria-label"], on = { class: "todoist-cal-head" }, nn = { class: "todoist-cal-title-row" }, sn = { class: "todoist-cal-logo" }, an = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, ln = { class: "todoist-cal-head-actions" }, rn = { class: "todoist-cal-nav" }, dn = { class: "todoist-cal-nav-group" }, cn = ["title"], un = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, pn = ["title"], mn = { class: "todoist-cal-nav-group" }, fn = ["title"], vn = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, gn = ["title"], bn = { class: "todoist-cal-weekdays" }, kn = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, yn = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], hn = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, wn = { class: "todoist-cal-agenda" }, Tn = { class: "todoist-cal-agenda-head" }, Dn = { class: "todoist-cal-agenda-title" }, xn = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, Cn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, $n = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, Sn = ["disabled"], _n = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, In = {
  key: 0,
  class: "todoist-cal-empty"
}, Rn = {
  key: 1,
  class: "todoist-cal-empty"
}, Ln = ["onClick"], Pn = { class: "todoist-cal-todo-main" }, Mn = ["disabled", "title", "onClick"], On = {
  key: 0,
  class: "check-icon"
}, An = {
  key: 0,
  class: "todoist-cal-task-time"
}, jn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, En = ["title", "onClick"], Wn = ["src", "alt"], Un = { class: "todoist-cal-thumb-tag" }, Bn = /* @__PURE__ */ zt({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const s = _o;
    io(
      () => J.active,
      () => gt.invalidateReads(),
      () => gt.loadTodosForDate(s.selectedDate, !0)
    ), At(() => gt.cancelReads()), ct(() => [J.active, J.pendingWrites], ([y, S], h) => {
      if (!y || S) {
        gt.cancelReads();
        return;
      }
      gt.loadTodosForDate(s.selectedDate, !!h?.[1]);
    }, { immediate: !0, flush: "sync" });
    function p(y) {
      gt.toggleTodoItem(y);
    }
    function m(y) {
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
    function U() {
      gt.dispatch("next-month");
    }
    function $() {
      gt.dispatch("prev-year");
    }
    function N() {
      gt.dispatch("next-year");
    }
    function T(y) {
      gt.dispatch("select-date", y);
    }
    function Y(y, S) {
      gt.dispatch("context-date", {
        date: y,
        clientX: S.clientX,
        clientY: S.clientY
      });
    }
    function K(y, S) {
      const h = Array.from(S.dataTransfer?.types || []);
      (h.includes("application/x-todoist-task-id") || h.includes("text/plain")) && (S.preventDefault(), S.dataTransfer && (S.dataTransfer.dropEffect = "copy"));
    }
    function H(y) {
    }
    function A(y, S) {
      const h = S.dataTransfer?.getData("application/x-todoist-task-id") || S.dataTransfer?.getData("text/plain");
      h && (S.preventDefault(), S.stopPropagation(), gt.dispatch("drop-task", { taskId: h, date: y }));
    }
    return (y, S) => (r(), u("aside", {
      id: "todoist-calendar-sidebar",
      class: Z(["todoist-calendar-sidebar", { collapsed: e(s).collapsed }]),
      "aria-label": e(v)("todoist.calendar.sidebarLabel")
    }, [
      t("div", on, [
        t("div", nn, [
          t("span", sn, [
            S[1] || (S[1] = Ut("📅 ", -1)),
            t("strong", null, f(e(v)("todoist.calendar.title")), 1)
          ]),
          t("span", an, f(e(s).badgeText), 1)
        ]),
        t("div", ln, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: x
          }, f(e(v)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", rn, [
        t("div", dn, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(v)("todoist.calendar.prevMonth"),
            onClick: D
          }, "‹", 8, cn),
          t("span", un, f(e(s).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(v)("todoist.calendar.nextMonth"),
            onClick: U
          }, "›", 8, pn)
        ]),
        t("div", mn, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(v)("todoist.calendar.prevYear"),
            onClick: $
          }, "‹", 8, fn),
          t("span", vn, f(e(s).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(v)("todoist.calendar.nextYear"),
            onClick: N
          }, "›", 8, gn)
        ])
      ]),
      t("div", bn, [
        t("span", null, f(e(v)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, f(e(v)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, f(e(v)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, f(e(v)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, f(e(v)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, f(e(v)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, f(e(v)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", kn, [
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
          onContextmenu: F((L) => Y(h.date, L), ["prevent"]),
          onDragover: (L) => K(h.date, L),
          onDragleave: (L) => (h.date, void 0),
          onDrop: (L) => A(h.date, L)
        }, [
          t("span", null, f(h.dayNumber), 1),
          h.hasDot ? (r(), u("span", hn)) : C("", !0)
        ], 42, yn))), 128))
      ]),
      t("div", wn, [
        t("div", Tn, [
          t("strong", Dn, f(e(s).agendaTitle), 1),
          t("span", xn, f(e(v)("todoist.calendar.itemCount", { count: e(s).todoItems.length })), 1)
        ]),
        e(s).writeError ? (r(), u("p", Cn, f(e(s).writeError), 1)) : C("", !0),
        e(s).emptyText ? (r(), u("div", $n, [
          Ut(f(e(s).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(s).todoLoading || e(J).pendingWrites > 0,
            onClick: S[0] || (S[0] = (h) => e(gt).loadTodosForDate(e(s).selectedDate, !0))
          }, f(e(v)("todoist.calendar.retryLoad")), 9, Sn)
        ])) : C("", !0),
        t("div", _n, [
          e(s).todoLoading && !e(s).todoItems.length ? (r(), u("div", In, f(e(v)("todoist.calendar.loading")), 1)) : e(s).todoItems.length === 0 && !e(s).emptyText ? (r(), u("div", Rn, f(e(v)("todoist.calendar.emptyDay")), 1)) : (r(!0), u(it, { key: 2 }, dt(e(s).todoItems, (h) => (r(), u("div", {
            key: h.id,
            class: Z(["todoist-cal-todo-card", { completed: h.completed }]),
            onClick: (L) => m(h)
          }, [
            t("div", Pn, [
              t("button", {
                type: "button",
                class: Z(["todoist-cal-check", { checked: h.completed }]),
                disabled: e(J).pendingWrites > 0,
                title: h.completed ? e(v)("todoist.calendar.clickToReopen") : e(v)("todoist.calendar.clickToComplete"),
                onClick: F((L) => p(h), ["stop"])
              }, [
                h.completed ? (r(), u("span", On, "✓")) : C("", !0)
              ], 10, Mn),
              t("span", {
                class: Z(["todoist-cal-todo-title", { strike: h.completed }])
              }, f(h.content), 3),
              h.time ? (r(), u("small", An, f(h.time), 1)) : C("", !0),
              h.completed ? (r(), u("span", jn, f(e(v)("todoist.calendar.completedTag")), 1)) : C("", !0)
            ]),
            h.thumbUrl ? (r(), u("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(v)("todoist.calendar.viewPhoto"),
              onClick: F((L) => e(Me).open(h.thumbUrl, h.content), ["stop"])
            }, [
              t("img", {
                src: h.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(v)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, Wn),
              t("span", Un, f(e(v)("todoist.calendar.photoTag")), 1)
            ], 8, En)) : C("", !0)
          ], 10, Ln))), 128))
        ])
      ])
    ], 10, en));
  }
}), zn = /* @__PURE__ */ ee(Bn, [["__scopeId", "data-v-6c1a5887"]]);
function Hn(a) {
  const s = a.state, p = P(null), m = P(null), x = P(null), D = P(!1), U = to(null), $ = P(), N = /* @__PURE__ */ new Map();
  function T(l) {
    N.clear();
    const z = l.closest(".todoist-board");
    if (z)
      for (const R of z.querySelectorAll(".todoist-board-list")) {
        const W = s.columns[Number(R.dataset.groupIndex)];
        if (!W) continue;
        const X = R.__todoistSlots;
        if (!X) continue;
        const ot = X(), ut = ot.filter((pt) => pt.id !== L?.id);
        N.set(W, { list: R, rows: ut, read: X, snapshot: ot });
      }
  }
  let Y = 0, K;
  function H(l, z) {
    K = { clientY: l.clientY, col: z }, !Y && (Y = requestAnimationFrame(() => {
      Y = 0;
      const R = K;
      K = void 0, R && A(R, R.col);
    }));
  }
  function A(l, z) {
    if (!L || s.movingTaskId) return;
    const R = N.get(z);
    if (!R) return;
    const W = R.read();
    W !== R.snapshot && (R.snapshot = W, R.rows = W.filter((nt) => nt.id !== L?.id));
    const X = l.clientY - R.list.getBoundingClientRect().top + R.list.scrollTop;
    let ot = 0, ut = R.rows.length;
    for (; ot < ut; ) {
      const nt = ot + ut >>> 1;
      X < R.rows[nt].middle ? ut = nt : ot = nt + 1;
    }
    let pt = ot;
    if (m.value === s.columns.indexOf(z)) {
      const nt = $.value ? R.rows.findIndex((wt) => wt.id === $.value) : R.rows.length;
      nt >= 0 && pt > nt && X < R.rows[nt].middle + 10 && (pt = nt), nt > 0 && pt < nt && X > R.rows[nt - 1].middle - 10 && (pt = nt);
    }
    const mt = R.rows[pt]?.id;
    h(z, mt), m.value === s.columns.indexOf(z) && (x.value = mt || R.rows[R.rows.length - 1]?.id || null, D.value = !mt);
  }
  function y(l) {
    return l === U.value;
  }
  function S(l, z) {
    if (z !== m.value || !U.value) return l.tasks;
    const R = [...l.tasks], W = $.value ? R.findIndex((X) => X.id === $.value) : -1;
    return R.splice(W < 0 ? R.length : W, 0, U.value), R;
  }
  function h(l, z) {
    if (!L || !B) return;
    if (s.view === "today" && l.sectionId === "overdue" && B.sectionId !== "overdue") {
      m.value = null;
      return;
    }
    const R = z ? l.tasks.find((ot) => ot.id === z) : void 0, W = l === B ? String(L._taskRaw?.parent_id || "") : "";
    if (R && s.view !== "today" && String(R._taskRaw?.parent_id || "") !== W) {
      m.value = null;
      return;
    }
    const X = s.columns.indexOf(l);
    X < 0 || ($.value = z, m.value = X);
  }
  let L = null, B = null;
  function G(l, z, R, W) {
    if (!a.isActive() || s.loading || s.movingTaskId || s.moveNeedsRefresh || z.completed || z.id.startsWith("optimistic-") || a.editingTaskId() === z.id) {
      l.preventDefault();
      return;
    }
    if (l.stopPropagation(), a.closePopovers(), p.value = z.id, L = z, B = R, U.value = { ...z }, T(l.currentTarget), l.dataTransfer) {
      l.dataTransfer.effectAllowed = "move";
      const X = l.currentTarget, ot = X.getBoundingClientRect();
      l.dataTransfer.setDragImage(
        X,
        Math.max(0, Math.min(ot.width, l.clientX - ot.left)),
        Math.max(0, Math.min(ot.height, l.clientY - ot.top))
      ), l.dataTransfer.clearData(), l.dataTransfer.setData("application/x-todoist-task-id", z.id), l.dataTransfer.setData("application/x-logicweaver-todoist-task", z.id), l.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: z.id, sectionId: R.sectionId }));
    }
  }
  function q() {
    cancelAnimationFrame(Y), Y = 0, K = void 0, p.value = null, m.value = null, x.value = null, D.value = !1, L = null, B = null, U.value = null, $.value = void 0, N.clear();
  }
  function E(l, z) {
    !L || s.movingTaskId || (l.preventDefault(), l.stopPropagation(), l.dataTransfer && (l.dataTransfer.dropEffect = "move"), H(l, s.columns[z]));
  }
  function M(l, z) {
    l.currentTarget?.contains(l.relatedTarget);
  }
  function et(l, z, R, W) {
    l.dataTransfer && (l.dataTransfer.dropEffect = "move"), H(l, R);
  }
  async function yt(l, z) {
    K && K.col === l && (A(K, K.col), z = $.value);
    const R = L, W = B;
    q(), !(!R || !W || !a.isActive() || s.movingTaskId) && (s.view === "today" ? l.sectionId === "today" && W.sectionId !== "today" ? await a.moveTask(R.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, z) : await a.moveTask(R.id, { sectionId: l.sectionId }, z) : await a.moveTask(R.id, {
      projectId: l.projectId,
      sectionId: l.sectionId
    }, z));
  }
  async function I(l, z, R, W) {
    l.preventDefault();
    const X = l.dataTransfer?.getData("application/x-todoist-label") || (l.dataTransfer?.getData("text/plain")?.startsWith("label:") ? l.dataTransfer.getData("text/plain").slice(6) : "");
    if (X) {
      a.dropLabel(z, X);
      return;
    }
    if (m.value === s.columns.indexOf(R)) {
      await yt(R, $.value);
      return;
    }
    const ot = l.currentTarget.getBoundingClientRect(), ut = l.clientY >= ot.top + ot.height / 2, pt = R.tasks.filter((wt) => wt.id !== L?.id), mt = pt.findIndex((wt) => wt.id === z.id), nt = z.id === L?.id ? z.id : ut ? pt[mt + 1]?.id : z.id;
    await yt(R, nt);
  }
  async function ht(l, z) {
    l.preventDefault(), l.stopPropagation(), await yt(z, m.value === s.columns.indexOf(z) ? $.value : void 0);
  }
  return ct(() => [s.view, s.activeProjectId], () => q()), ct(() => s.columns, (l) => {
    B && !l.includes(B) && q();
  }), ct(a.isActive, (l) => {
    l || q();
  }, { immediate: !0, flush: "sync" }), At(q), {
    draggingTaskId: p,
    dragOverColIndex: m,
    dragOverTaskId: x,
    dragAfterTask: D,
    isDragPreview: y,
    previewTasks: S,
    onTaskDragStart: G,
    onTaskDragEnd: q,
    onColDragOver: E,
    onColDragLeave: M,
    onTaskDragOver: et,
    onTaskDrop: I,
    onColDrop: ht
  };
}
const Vn = ["data-row-key"], Nn = /* @__PURE__ */ zt({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const s = a, p = P(null), m = /* @__PURE__ */ new Map(), x = P(0), D = to({ top: 0, height: 600 }), U = (h) => s.isPreview(h) ? `preview:${h.id}` : h.id, $ = lt(() => {
      x.value;
      const h = [0];
      for (const L of s.tasks) {
        const B = L.id === s.hiddenId && !s.isPreview(L) ? 0 : m.get(U(L)) || m.get(L.id) || 110;
        h.push(h[h.length - 1] + B);
      }
      return h;
    }), N = lt(() => {
      x.value;
      let h = 0;
      return s.tasks.filter((L) => !s.isPreview(L)).map((L) => {
        const B = m.get(L.id) || 110, G = { id: L.id, middle: h + B / 2 };
        return h += B, G;
      });
    });
    function T(h) {
      const L = $.value;
      let B = 0, G = s.tasks.length;
      for (; B < G; ) {
        const q = B + G >>> 1;
        L[q + 1] < h ? B = q + 1 : G = q;
      }
      return B;
    }
    const Y = lt(() => {
      const h = Math.max(0, T(D.value.top) - 5), L = Math.min(s.tasks.length, T(D.value.top + D.value.height) + 6), B = /* @__PURE__ */ new Set();
      for (let G = h; G < L; G++) B.add(G);
      if (s.pinnedId) {
        const G = s.tasks.findIndex((q) => q.id === s.pinnedId && !s.isPreview(q));
        G >= 0 && B.add(G);
      }
      return [...B].sort((G, q) => G - q).map((G) => ({ task: s.tasks[G], index: G, top: $.value[G] }));
    });
    let K = 0;
    function H() {
      K || (K = requestAnimationFrame(() => {
        K = 0, p.value && (D.value = { top: p.value.scrollTop, height: p.value.clientHeight });
      }));
    }
    let A;
    const y = /* @__PURE__ */ new Map();
    function S(h, L) {
      const B = y.get(L);
      B !== h && (B && A?.unobserve(B), h instanceof HTMLElement ? (y.set(L, h), A?.observe(h)) : y.delete(L));
    }
    return ct(() => s.tasks, () => {
      const h = new Set(s.tasks.map(U));
      for (const L of m.keys()) h.has(L) || m.delete(L);
      It(H);
    }), te(() => {
      A = new ResizeObserver((h) => {
        let L = !1;
        const B = T(p.value?.scrollTop || 0), G = $.value[B] || 0;
        for (const q of h) {
          const E = q.target;
          if (E === p.value) {
            H();
            continue;
          }
          const M = E.dataset.rowKey, et = q.borderBoxSize?.[0]?.blockSize || q.contentRect.height;
          M && et > 0 && Math.abs((m.get(M) || 0) - et) > 0.5 && (m.set(M, et), L = !0);
        }
        if (L) {
          x.value++;
          const q = ($.value[B] || 0) - G;
          p.value && q && !s.pinnedId && (p.value.scrollTop += q), H();
        }
      }), p.value && (A.observe(p.value), p.value.__todoistSlots = () => N.value);
      for (const h of y.values()) A.observe(h);
      H();
    }), At(() => {
      A?.disconnect(), cancelAnimationFrame(K), p.value && delete p.value.__todoistSlots, y.clear(), m.clear();
    }), (h, L) => (r(), u("div", {
      ref_key: "root",
      ref: p,
      onScrollPassive: H
    }, [
      a.tasks.length ? (r(), u("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${$.value[$.value.length - 1]}px` })
      }, [
        (r(!0), u(it, null, dt(Y.value, (B) => (r(), u("div", {
          key: U(B.task),
          ref_for: !0,
          ref: (G) => S(G, U(B.task)),
          "data-row-key": U(B.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${B.top}px)` })
        }, [
          Ne(h.$slots, "default", {
            task: B.task,
            index: B.index
          }, void 0, !0)
        ], 12, Vn))), 128))
      ], 4)) : Ne(h.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), Kn = /* @__PURE__ */ ee(Nn, [["__scopeId", "data-v-b7076778"]]), Fn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Yn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Xn = {
  key: 2,
  class: "todoist-empty"
}, Gn = {
  key: 3,
  class: "todoist-empty"
}, qn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Qn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Jn = { class: "todoist-projects-toolbar-inner" }, Zn = { class: "todoist-project-tabs-scroll" }, ts = ["onClick"], es = { class: "todoist-project-tab-name" }, os = {
  key: 0,
  class: "todoist-project-actions-group"
}, ns = ["title"], ss = { class: "action-text" }, is = ["title"], as = { class: "action-text" }, ls = { class: "todoist-board" }, rs = ["data-section-id", "data-title", "data-column-index"], ds = { class: "todoist-board-column-head" }, cs = ["title", "onClick"], us = ["onClick"], ps = ["onSubmit"], ms = ["onKeydown"], fs = { class: "date-hint-left" }, vs = { class: "date-hint-badge" }, gs = { class: "date-hint-sub" }, bs = {
  key: 0,
  class: "date-hint-preview"
}, ks = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, ys = {
  key: 1,
  class: "todoist-composer-images"
}, hs = ["src"], ws = { class: "todoist-composer-img-name" }, Ts = {
  key: 0,
  class: "todoist-composer-img-status"
}, Ds = ["onClick"], xs = { class: "todoist-inline-actions" }, Cs = ["disabled"], $s = ["disabled"], Ss = {
  key: 0,
  class: "todoist-column-empty"
}, _s = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Is = ["disabled", "title", "aria-label", "onClick"], Rs = { class: "todoist-board-task-main" }, Ls = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Ps = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Ms = ["title", "onClick"], Os = { class: "repo-badge-name" }, As = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, js = ["title", "onClick"], Es = { class: "repo-badge-name" }, Ws = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Us = ["title", "onClick"], Bs = { class: "repo-badge-name" }, zs = ["onKeydown", "onBlur"], Hs = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, Vs = {
  key: 6,
  class: "todoist-board-task-description"
}, Ns = {
  key: 7,
  class: "todoist-board-task-meta"
}, Ks = ["title"], Fs = ["title"], Ys = ["title"], Xs = ["title"], Gs = {
  key: 4,
  class: "todoist-board-extra"
}, qs = ["onClick"], Qs = ["src"], Js = {
  key: 0,
  class: "todoist-board-add-column"
}, Zs = {
  key: 1,
  class: "todoist-add-section-form"
}, ti = ["onKeydown"], ei = { class: "todoist-add-section-actions" }, oi = { class: "section-menu-text" }, ni = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, si = ["disabled"], ii = ["disabled"], ai = {
  key: 1,
  class: "todoist-section-menu-divider"
}, li = { class: "section-menu-text" }, ri = { class: "todoist-task-menu-header" }, di = { class: "todoist-task-menu-title" }, ci = { class: "todoist-menu-text" }, ui = { class: "todoist-menu-badge" }, pi = {
  key: 0,
  class: "todoist-labels-panel"
}, mi = { class: "todoist-labels-quick-input" }, fi = ["placeholder", "onKeydown"], vi = { class: "todoist-labels-chip-grid" }, gi = ["onClick"], bi = {
  key: 0,
  class: "chip-check"
}, ki = { class: "todoist-menu-text" }, yi = {
  key: 1,
  class: "todoist-recur-panel"
}, hi = { class: "todoist-recur-grid" }, wi = ["onClick"], Ti = { class: "todoist-recur-custom-row" }, Di = ["onKeydown"], xi = { class: "todoist-menu-text" }, Ci = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, $i = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Si = {
  key: 2,
  class: "todoist-color-panel"
}, _i = { class: "todoist-color-grid" }, Ii = ["title", "onClick"], Ri = { class: "todoist-color-name" }, Li = { class: "todoist-menu-text" }, Pi = ["disabled", "onClick"], Mi = { class: "todoist-project-flyout-name" }, Oi = {
  key: 0,
  class: "todoist-menu-badge"
}, Ai = { class: "todoist-menu-text" }, ji = { class: "todoist-dialog-title" }, Ei = ["title"], Wi = { class: "todoist-dialog-body" }, Ui = {
  key: 0,
  class: "todoist-dialog-desc"
}, Bi = ["placeholder", "onKeydown"], zi = { class: "todoist-dialog-foot" }, Hi = { class: "todoist-dialog-icon" }, Vi = { class: "todoist-dialog-title" }, Ni = ["title"], Ki = { class: "todoist-dialog-body" }, Fi = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, Yi = { class: "todoist-dialog-danger-text" }, Xi = { class: "todoist-dialog-msg" }, Gi = { class: "todoist-dialog-foot" }, qi = /* @__PURE__ */ zt({
  __name: "TodoistTaskList",
  setup(a) {
    const s = P(0);
    function p() {
      s.value++;
    }
    te(() => {
      window.addEventListener("storage", p), window.addEventListener("todoist-repository-links-changed", p), window.addEventListener("todoist-bili-links-changed", p), window.addEventListener("todoist-web-links-changed", p);
    }), At(() => {
      window.removeEventListener("storage", p), window.removeEventListener("todoist-repository-links-changed", p), window.removeEventListener("todoist-bili-links-changed", p), window.removeEventListener("todoist-web-links-changed", p);
    });
    function m(n, o) {
      return s.value, oo(n, o);
    }
    function x(n, o, i) {
      return s.value, Bo(n, o, i);
    }
    function D(n, o, i) {
      return s.value, zo(n, o, i);
    }
    function U(n) {
      n && window.open(n, "_blank", "noopener,noreferrer");
    }
    function $(n) {
      Oo.openVideo({
        bvid: n.bvid,
        aid: n.aid ? String(n.aid) : void 0,
        title: n.title,
        author: n.author,
        cover: n.cover,
        url: n.url
      });
    }
    function N(n) {
      no.open(n);
    }
    const T = kt, Y = P(""), K = P(null), H = P(""), A = P(!1), y = lt(() => H.value ? Wo(H.value) : null), S = P([]);
    function h(n) {
      const o = n.clipboardData?.items;
      if (o)
        for (let i = 0; i < o.length; i++) {
          const j = o[i];
          if (j.type.indexOf("image") !== -1) {
            n.preventDefault();
            const c = j.getAsFile();
            if (!c) continue;
            const st = URL.createObjectURL(c), V = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: c,
              previewUrl: st,
              name: `截图_${V}.png`,
              uploading: !1
            };
            S.value.push(Dt);
          }
        }
    }
    function L(n) {
      const o = S.value.splice(n, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const B = P(null), G = P(""), q = P(null), E = Qt({
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
    }), et = P(null), yt = P(null), I = Qt({
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
    }), ht = P(null), l = Qt({
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
    ], ot = lt(() => String(l.task?._taskRaw?.project_id || l.col?.projectId || "")), ut = lt(() => T.view !== "projects" ? null : T.projects.find((n) => String(n.id) === String(T.activeProjectId)) || T.projects[0] || null), pt = lt(() => {
      const n = new Set(T.availableLabels || []);
      return l.task?.labels && l.task.labels.forEach((o) => n.add(o)), Array.from(n);
    }), mt = lt(() => {
      const n = l.task?.customColorHex;
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
      E.isOpen = !1, l.isOpen = !1, l.activeSubpanel = null;
    }
    const {
      draggingTaskId: Rt,
      dragOverColIndex: jt,
      dragOverTaskId: Yt,
      dragAfterTask: Xt,
      isDragPreview: O,
      previewTasks: d,
      onTaskDragStart: g,
      onTaskDragEnd: Q,
      onColDragOver: _t,
      onColDragLeave: Et,
      onTaskDragOver: fe,
      onTaskDrop: ve,
      onColDrop: ge
    } = Hn({
      state: T,
      isActive: () => J.active,
      editingTaskId: () => B.value,
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
      T.movingTaskId !== n.id && (B.value = n.id, G.value = n.content, It(() => {
        q.value && (q.value.focus(), q.value.select());
      }));
    }
    function Ht(n, o) {
      if (B.value !== n.id) return;
      const i = G.value.trim();
      B.value = null, o && i && i !== n.content && (n.content = i, tt.dispatch("update-task-title", {
        taskId: n.id,
        content: i,
        task: n,
        newContent: i
      }));
    }
    function Vt(n, o) {
      n.key === "Enter" ? n.shiftKey || (n.preventDefault(), Ht(o, !0)) : n.key === "Escape" && (n.preventDefault(), n.stopPropagation(), Ht(o, !1));
    }
    function he(n, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(n.id, n);
    }
    function oe(n, o, i) {
      const j = i.currentTarget;
      K.value = nt(n, o), H.value = "", A.value = !1, It(() => {
        j.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function le() {
      b.value || w();
    }
    function w() {
      K.value = null, H.value = "", A.value = !1;
      for (const n of S.value)
        try {
          URL.revokeObjectURL(n.previewUrl);
        } catch {
        }
      S.value = [];
    }
    const b = P(!1), _ = /* @__PURE__ */ new WeakMap();
    function ft(n) {
      const o = n.description || n._taskRaw?.description || "", i = _.get(n);
      if (i && i.source === o) return i;
      const j = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: o,
        thumb: j,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return _.set(n, c), c;
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
      const o = [...S.value];
      let j = H.value.trim() || o[0]?.name || "";
      if (!j) return;
      let c, st, V;
      if (y.value && !A.value) {
        const Lt = y.value;
        j = Lt.cleanTitle || j, c = Lt.date, st = Lt.label + (Lt.time ? ` ${Lt.time}` : ""), V = Lt.time ? `${Lt.date} ${Lt.time}` : Lt.date;
      }
      const Dt = K.value, Nt = H.value, $t = T.view, xe = n.projectId || $t === "projects" && T.activeProjectId || void 0, Ce = n.sectionId !== void 0 ? n.sectionId : void 0;
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
            dueString: V,
            attachments: o.map((xt) => ({ file_url: xt.uploadedUrl, file_name: xt.name, file_type: xt.file.type || "image/png" }))
          }) && Dt === K.value && Nt === H.value && o.length === S.value.length && o.every((xt, $e) => xt === S.value[$e]) && w();
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
      l.isOpen = !1;
      const c = i.currentTarget.getBoundingClientRect(), V = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      E.col = n, E.x = V, E.y = Dt, E.canMoveLeft = o > 0 && !!T.columns[o - 1]?.sectionId, E.canMoveRight = o < T.columns.length - 1 && !!T.columns[o + 1]?.sectionId, E.isOpen = !0;
    }
    function je(n, o) {
      E.isOpen = !1, tt.dispatch("move-section", { sectionId: n.sectionId, direction: o });
    }
    function Ee(n, o, i) {
      if (T.movingTaskId === n.id || n.completed) return;
      E.isOpen = !1;
      const j = 236, c = 340, st = Math.max(8, Math.min(window.innerWidth - j - 8, i.clientX)), V = Math.max(8, Math.min(window.innerHeight - c - 8, i.clientY));
      if (l.task = n, l.col = o, l.x = st, l.y = V, l.activeSubpanel = null, l.descText = n.description || "", l.isSavingDesc = !1, l.newLabelText = "", l.customRecurText = "", n.dueDate) {
        const $t = /* @__PURE__ */ new Date(`${n.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite($t.getTime()) && (l.calYear = $t.getFullYear(), l.calMonth = $t.getMonth());
      } else {
        const $t = /* @__PURE__ */ new Date();
        l.calYear = $t.getFullYear(), l.calMonth = $t.getMonth();
      }
      const Dt = 252, Nt = st + j + Dt > window.innerWidth - 8;
      l.flyoutOpenLeft = Nt, l.flyoutStyle = {
        left: Nt ? `${-Dt - 6}px` : `${j + 6}px`,
        top: "0px"
      }, l.isOpen = !0;
    }
    function re(n) {
      l.activeSubpanel === n ? l.activeSubpanel = null : (l.activeSubpanel = n, n === "desc" ? It(() => {
        z.value?.focus(), z.value?.select();
      }) : n === "labels" && It(() => {
        R.value?.focus();
      }));
    }
    function We(n) {
      return !!l.task?.labels?.includes(n);
    }
    function ro(n) {
      if (!l.task) return;
      const o = l.task.id, i = [...l.task.labels || []], j = i.includes(n) ? i.filter((c) => c !== n) : [...i, n];
      l.task.labels = j, tt.dispatch("update-task-labels", { taskId: o, labels: j });
    }
    function Ue() {
      if (!l.task) return;
      const n = l.newLabelText.trim();
      if (!n) return;
      l.newLabelText = "";
      const o = l.task.id, i = [...l.task.labels || []];
      i.includes(n) || (i.push(n), l.task.labels = i, tt.dispatch("update-task-labels", { taskId: o, labels: i })), Tt();
    }
    function co(n) {
      return String(l.task?.dueString || "").toLowerCase().includes(n.toLowerCase());
    }
    function uo(n, o) {
      if (!l.task) return;
      const i = l.task.id;
      tt.dispatch("update-task-recurring", { taskId: i, rule: n, label: o }), Tt();
    }
    function Be() {
      if (!l.task) return;
      const n = l.customRecurText.trim();
      if (!n) return;
      const o = l.task.id;
      tt.dispatch("update-task-recurring", { taskId: o, rule: n, label: n }), Tt();
    }
    function po() {
      if (!l.task) return;
      const n = l.task.id;
      tt.dispatch("clear-task-recurring", { taskId: n }), Tt();
    }
    function mo(n) {
      if (!l.task) return;
      const o = l.task.id, i = W.find((j) => j.id === n);
      l.task.customColorHex = i?.hex || "", tt.dispatch("update-task-color", { taskId: o, colorId: n }), Tt();
    }
    function fo(n) {
      if (!l.task) return;
      const o = l.task.id;
      tt.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: n.id,
        targetProjectName: n.name
      }), Tt();
    }
    function vo() {
      if (!l.task) return;
      const n = l.task, o = { x: l.x, y: l.y };
      Tt();
      const i = qt(o, 380, 220);
      I.x = i.x, I.y = i.y, n.isRecurring ? (I.title = "删除重复任务确认", I.icon = "⚠️", I.danger = !0, I.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", I.message = `任务内容：${n.content}
循环规则：${n.dueString || "循环任务"}`, I.confirmText = "删除重复任务", I.actionType = "delete-task", I.payload = { taskId: n.id, isRecurring: !0 }, I.isOpen = !0) : (I.title = "删除任务确认", I.icon = "🗑️", I.danger = !0, I.alertText = `确定要删除任务「${n.content}」吗？`, I.message = "此操作不可撤销。", I.confirmText = "确认删除", I.actionType = "delete-task", I.payload = { taskId: n.id, isRecurring: !1 }, I.isOpen = !0);
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
      const i = o.clientX, j = o.clientY, c = n === "prompt" ? M : I, st = c.x, V = c.y, Dt = ($t) => {
        const xe = $t.clientX - i, Ce = $t.clientY - j;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, st + xe)), c.y = Math.max(10, Math.min(window.innerHeight - 120, V + Ce));
      }, Nt = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Nt);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Nt);
    }
    function He(n) {
      const o = qt(n, 380, 220);
      M.x = o.x, M.y = o.y, M.title = v("todoist.newProject"), M.message = v("todoist.inputProjectPlaceholder"), M.value = "", M.placeholder = v("todoist.inputProjectPlaceholder"), M.confirmText = v("common.confirm"), M.actionType = "create-project", M.payload = null, M.isOpen = !0, It(() => et.value?.focus());
    }
    function go(n, o) {
      const i = qt(o, 380, 220);
      M.x = i.x, M.y = i.y, M.title = v("todoist.renameProject"), M.message = n.name, M.value = n.name, M.placeholder = v("todoist.inputProjectPlaceholder"), M.confirmText = v("common.save"), M.actionType = "rename-project", M.payload = { projectId: n.id }, M.isOpen = !0, It(() => {
        et.value?.focus(), et.value?.select();
      });
    }
    function bo(n, o) {
      const i = o || { x: E.x, y: E.y };
      E.isOpen = !1;
      const j = qt(i, 380, 220);
      M.x = j.x, M.y = j.y, M.title = v("todoist.renameSection"), M.message = n.title, M.value = n.title, M.placeholder = v("todoist.inputSectionPlaceholder"), M.confirmText = v("common.save"), M.actionType = "rename-section", M.payload = { sectionId: n.sectionId }, M.isOpen = !0, It(() => {
        et.value?.focus(), et.value?.select();
      });
    }
    function ne() {
      M.isOpen = !1;
    }
    function Ve() {
      const n = M.value.trim();
      if (!n) return;
      const { actionType: o, payload: i } = M;
      ne(), o === "create-project" ? tt.dispatch("create-project-submit", n) : o === "rename-project" && i && "projectId" in i ? tt.dispatch("rename-project-submit", { projectId: i.projectId, newName: n }) : o === "rename-section" && i && "sectionId" in i && tt.dispatch("rename-section", { sectionId: i.sectionId, newName: n });
    }
    function ko(n, o) {
      const i = qt(o, 380, 240);
      I.x = i.x, I.y = i.y, I.title = v("todoist.deleteProjectConfirm"), I.icon = "🗑️", I.danger = !0, I.alertText = v("todoist.deleteProjectAlert", { name: n.name }), I.message = v("todoist.deleteProjectWarning"), I.confirmText = v("common.deletePermanently"), I.actionType = "delete-project", I.payload = { projectId: n.id }, I.isOpen = !0;
    }
    function yo(n, o) {
      const i = o || { x: E.x, y: E.y };
      E.isOpen = !1;
      const j = qt(i, 380, 240);
      I.x = j.x, I.y = j.y, I.title = v("todoist.deleteSectionConfirm"), I.icon = "🗑️", I.danger = !0, I.alertText = v("todoist.deleteSectionAlert", { name: n.title }), I.message = v("todoist.deleteSectionWarning"), I.confirmText = v("todoist.deleteSection"), I.actionType = "delete-section", I.payload = { sectionId: n.sectionId }, I.isOpen = !0;
    }
    function de() {
      I.isOpen = !1;
    }
    function ho() {
      const { actionType: n, payload: o } = I;
      de(), n === "delete-project" && o && "projectId" in o ? tt.dispatch("delete-project-submit", o.projectId) : n === "delete-section" && o && "sectionId" in o ? tt.dispatch("delete-section", { sectionId: o.sectionId }) : n === "delete-task" && o && "taskId" in o && tt.dispatch("delete-task-submit", o);
    }
    function wo(n) {
      tt.dispatch("switch-project", n);
    }
    function Te(n) {
      n.key === "Escape" && (M.isOpen && ne(), I.isOpen && de(), l.isOpen && (l.isOpen = !1, l.activeSubpanel = null), E.isOpen && (E.isOpen = !1));
    }
    function De(n) {
      const o = n.target;
      o && (M.isOpen && yt.value && !yt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && ne(), I.isOpen && ht.value && !ht.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && de());
    }
    return ct(() => J.active, (n) => {
      document.removeEventListener("keydown", Te), window.removeEventListener("pointerdown", De), n && (document.addEventListener("keydown", Te), window.addEventListener("pointerdown", De));
    }, { immediate: !0, flush: "sync" }), At(() => {
      document.removeEventListener("keydown", Te), window.removeEventListener("pointerdown", De), w();
    }), (n, o) => (r(), u("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: Tt
    }, [
      e(T).moveError && e(T).moveMessage ? (r(), u("p", Fn, f(e(T).moveMessage), 1)) : C("", !0),
      e(T).emptyText && e(T).columns.length > 0 && !e(T).loading ? (r(), u("p", Yn, f(e(v)("todoist.tasksRetained", { text: e(T).emptyText })), 1)) : C("", !0),
      e(T).loading && e(T).columns.length === 0 ? (r(), u("p", Xn, f(e(v)("common.loading")), 1)) : e(T).emptyText && e(T).columns.length === 0 ? (r(), u("p", Gn, f(e(T).emptyText), 1)) : e(T).view === "projects" && e(T).projects.length === 0 ? (r(), u("div", qn, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, f(e(v)("todoist.emptyProjects")), 1),
        t("p", null, f(e(v)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (i) => He(i))
        }, f(e(v)("todoist.createFirstProject")), 1)
      ])) : (r(), u(it, { key: 5 }, [
        e(T).view === "projects" && e(T).projects.length ? (r(), u("div", Qn, [
          t("div", Jn, [
            t("div", Zn, [
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
                t("span", es, f(i.name), 1)
              ], 10, ts))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => He(i))
              }, "＋ 新建项目")
            ]),
            ut.value ? (r(), u("div", os, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(v)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => go(ut.value, i))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", ss, f(e(v)("common.rename")), 1)
              ], 8, ns),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(v)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => ko(ut.value, i))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", as, f(e(v)("todoist.deleteProject")), 1)
              ], 8, is)
            ])) : C("", !0)
          ])
        ])) : C("", !0),
        t("div", ls, [
          (r(!0), u(it, null, dt(e(T).columns, (i, j) => (r(), u("section", {
            key: i.sectionId || i.title || j,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": j
          }, [
            t("header", ds, [
              t("h3", null, [
                Ut(f(i.title) + " ", 1),
                t("span", null, f(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: F((c) => lo(i, j, c), ["stop"])
              }, "•••", 8, cs)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => oe(i, j, c)
            }, "＋ 添加任务", 8, us),
            K.value === nt(i, j) ? (r(), u("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: F((c) => Oe(i), ["prevent"])
            }, [
              Mt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (c) => H.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (c) => ao(c, i),
                onPaste: o[5] || (o[5] = (c) => h(c))
              }, null, 40, ms), [
                [Kt, H.value]
              ]),
              y.value ? (r(), u("div", {
                key: 0,
                class: Z(["todoist-composer-date-hint", { "is-ignored": A.value }])
              }, [
                t("div", fs, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", vs, [
                    Ut(f(y.value.label) + f(y.value.time ? " " + y.value.time : "") + " ", 1),
                    t("span", gs, "(" + f(y.value.formattedDate) + ")", 1)
                  ]),
                  A.value ? (r(), u("span", ks, " (已忽略日期，按纯文本创建) ")) : (r(), u("span", bs, [
                    o[32] || (o[32] = Ut(" 精简任务名: ", -1)),
                    t("strong", null, f(y.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (c) => A.value = !A.value)
                }, f(A.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : C("", !0),
              S.value.length > 0 ? (r(), u("div", ys, [
                (r(!0), u(it, null, dt(S.value, (c, st) => (r(), u("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, hs),
                  t("span", ws, f(c.name), 1),
                  c.uploading ? (r(), u("span", Ts, "上传中…")) : C("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (V) => L(st)
                  }, "×", 8, Ds)
                ]))), 128))
              ])) : C("", !0),
              t("div", xs, [
                t("button", {
                  type: "button",
                  disabled: b.value,
                  onClick: le
                }, f(e(v)("common.cancel")), 9, Cs),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: b.value
                }, f(b.value ? S.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, $s)
              ])
            ], 40, ps)) : C("", !0),
            Jt(Kn, {
              tasks: e(d)(i, j),
              "pinned-id": e(Rt) || B.value,
              "hidden-id": e(jt) !== null ? e(Rt) : null,
              "is-preview": e(O),
              class: Z(["todoist-board-list", { "drag-over": e(jt) === j }]),
              "data-group-index": j,
              onDragover: F((c) => e(_t)(c, j), ["prevent"]),
              onDragleave: (c) => e(Et)(c, j),
              onDrop: F((c) => e(ge)(c, i), ["prevent"])
            }, {
              empty: ie(() => [
                i.tasks.length === 0 && e(jt) !== j ? (r(), u("p", Ss, " 暂无任务 · 可拖到这里 ")) : C("", !0)
              ]),
              default: ie(({ task: c, index: st }) => [
                t("article", {
                  class: Z(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: B.value === c.id,
                      "dragging-task": !e(O)(c) && e(Rt) === c.id,
                      "drop-before": e(Yt) === c.id && !e(Xt),
                      "drop-after": e(Yt) === c.id && e(Xt),
                      "saving-position": e(T).movingTaskId === c.id,
                      "todoist-task-preview": e(O)(c),
                      "drag-origin-hidden": e(Rt) === c.id && !e(O)(c) && e(jt) !== null
                    }
                  ]]),
                  style: bt(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": e(O)(c) ? void 0 : c.id,
                  "aria-hidden": e(O)(c) || void 0,
                  tabindex: e(O)(c) ? -1 : 0,
                  title: wt(),
                  draggable: !e(O)(c) && !c.completed && !e(T).loading && !e(T).movingTaskId && !e(T).moveNeedsRefresh && B.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (V) => e(g)(V, c, i, st),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...V) => e(Q) && e(Q)(...V)),
                  onDragover: F((V) => e(fe)(V, c, i, st), ["stop", "prevent"]),
                  onDrop: F((V) => e(ve)(V, c, i, st), ["stop", "prevent"]),
                  onDblclick: (V) => ke(c, V),
                  onClick: (V) => he(c, V),
                  onContextmenu: F((V) => Ee(c, i, V), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: Z(["todoist-board-check", { checked: c.completed }]),
                    disabled: e(O)(c) || e(T).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: F((V) => be(c, i), ["stop"])
                  }, null, 10, Is),
                  t("div", Rs, [
                    e(T).movingTaskId === c.id ? (r(), u("span", Ls, "保存中")) : C("", !0),
                    m(c.id, c.description).length ? (r(), u("div", Ps, [
                      (r(!0), u(it, null, dt(m(c.id, c.description), (V) => (r(), u("button", {
                        key: V.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + V.fullName + " · 点击在插件内查看详情",
                        onClick: F((Dt) => N(V.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", Os, f(V.fullName), 1)
                      ], 8, Ms))), 128))
                    ])) : C("", !0),
                    x(c.id, c.description, c.content).length ? (r(), u("div", As, [
                      (r(!0), u(it, null, dt(x(c.id, c.description, c.content), (V) => (r(), u("button", {
                        key: V.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + V.title + " · 点击立即播放",
                        onClick: F((Dt) => $(V), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", Es, f(V.title), 1)
                      ], 8, js))), 128))
                    ])) : C("", !0),
                    D(c.id, c.description, c.content).length ? (r(), u("div", Ws, [
                      (r(!0), u(it, null, dt(D(c.id, c.description, c.content), (V) => (r(), u("button", {
                        key: V.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (V.title || V.url) + " · 点击直接打开",
                        onClick: F((Dt) => U(V.url), ["stop"])
                      }, [
                        o[36] || (o[36] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", Bs, f(V.title || V.url), 1)
                      ], 8, Us))), 128))
                    ])) : C("", !0),
                    B.value === c.id ? Mt((r(), u("textarea", {
                      key: 4,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: q,
                      "onUpdate:modelValue": o[7] || (o[7] = (V) => G.value = V),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (V) => Vt(V, c),
                      onBlur: (V) => Ht(c, !0),
                      onClick: o[8] || (o[8] = F(() => {
                      }, ["stop"]))
                    }, null, 40, zs)), [
                      [Kt, G.value]
                    ]) : (r(), u("p", Hs, f(c.content || "未命名任务"), 1)),
                    Ct(c) ? (r(), u("p", Vs, f(Ct(c)), 1)) : C("", !0),
                    Bt(c) ? (r(), u("div", Ns, [
                      c.startDate && !c.dueDate ? (r(), u("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + f(e(_e)(c.startDate)) + " 起 ", 9, Ks)) : c.startDate && c.dueDate ? (r(), u("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + f(e(_e)(c.startDate)) + " ~ " + f(e(_e)(c.dueDate)), 9, Fs)) : c.dueText ? (r(), u("span", {
                        key: 2,
                        class: Z(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, f(c.isRecurring ? "↻ " : "▣ ") + f(c.dueText), 11, Ys)) : C("", !0),
                      (r(!0), u(it, null, dt((c.labels || []).slice(0, 3), (V) => (r(), u("span", {
                        key: V,
                        class: "todoist-board-label"
                      }, "◇ " + f(V), 1))), 128)),
                      c.timedDeadlineText ? (r(), u("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + f(c.timedDeadlineText), 9, Xs)) : C("", !0),
                      c.extraCountText ? (r(), u("span", Gs, f(c.extraCountText), 1)) : C("", !0)
                    ])) : C("", !0),
                    vt(c) ? (r(), u("div", {
                      key: 8,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: F((V) => Gt(vt(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: vt(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, Qs),
                      o[37] || (o[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, qs)) : C("", !0)
                  ])
                ], 46, _s)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, rs))), 128)),
          e(T).view === "inbox" || e(T).view === "projects" ? (r(), u("div", Js, [
            e(T).addingSection ? (r(), u("div", Zs, [
              Mt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (i) => Y.value = i),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  St(F(Ae, ["prevent"]), ["enter"]),
                  St(we, ["esc"])
                ]
              }, null, 40, ti), [
                [Kt, Y.value]
              ]),
              t("div", ei, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: Ae
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: we
                }, f(e(v)("common.cancel")), 1)
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
        onClick: o[16] || (o[16] = F(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (i) => bo(E.col, i))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", oi, f(e(v)("todoist.menu.renameSection")), 1)
        ]),
        E.col.sectionId ? (r(), u("div", ni, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !E.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (i) => je(E.col, -1))
          }, f(e(v)("todoist.menu.moveLeft")), 9, si),
          o[40] || (o[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !E.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (i) => je(E.col, 1))
          }, f(e(v)("todoist.menu.moveRight")), 9, ii)
        ])) : C("", !0),
        E.col.sectionId ? (r(), u("div", ai)) : C("", !0),
        E.col.sectionId ? (r(), u("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (i) => yo(E.col, i))
        }, [
          o[41] || (o[41] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", li, f(e(v)("todoist.menu.deleteSection")), 1)
        ])) : C("", !0)
      ], 4)) : C("", !0),
      l.isOpen && l.task ? (r(), u("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: l.x + "px", top: l.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = F(() => {
        }, ["stop"]))
      }, [
        t("div", ri, [
          t("span", di, f(l.task.content || e(v)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: l.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (i) => re("labels"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", ci, f(e(v)("todoist.menu.cloudLabels")), 1),
          t("span", ui, f(l.task.labels && l.task.labels.length ? e(v)("todoist.menu.labelsSelected", { count: l.task.labels.length }) : e(v)("todoist.menu.labelsNone")), 1)
        ], 2),
        l.activeSubpanel === "labels" ? (r(), u("div", pi, [
          t("div", mi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (i) => l.newLabelText = i),
              type: "text",
              placeholder: e(v)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: St(F(Ue, ["prevent"]), ["enter"])
            }, null, 40, fi), [
              [Kt, l.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Ue
            }, "＋")
          ]),
          t("div", vi, [
            (r(!0), u(it, null, dt(pt.value, (i) => (r(), u("button", {
              key: i,
              type: "button",
              class: Z(["todoist-label-chip", { selected: We(i) }]),
              onClick: (j) => ro(i)
            }, [
              t("span", null, "◇ " + f(i), 1),
              We(i) ? (r(), u("span", bi, "✓")) : C("", !0)
            ], 10, gi))), 128))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: l.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (i) => re("recur"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", ki, f(e(v)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(l.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, f(l.task.isRecurring ? l.task.dueString || e(v)("todoist.recur.recurring") : e(v)("todoist.menu.labelsNone")), 5)
        ], 2),
        l.activeSubpanel === "recur" ? (r(), u("div", yi, [
          t("div", hi, [
            (r(), u(it, null, dt(X, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: Z(["todoist-recur-chip", { selected: co(i.rule) }]),
              onClick: (j) => uo(i.rule, i.label)
            }, [
              t("span", null, f(i.icon), 1),
              t("span", null, f(i.label), 1)
            ], 10, wi)), 64))
          ]),
          t("div", Ti, [
            Mt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (i) => l.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: St(F(Be, ["prevent"]), ["enter"])
            }, null, 40, Di), [
              [Kt, l.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Be
            }, "确定")
          ]),
          l.task.isRecurring ? (r(), u("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: po
          }, f(e(v)("todoist.menu.clearRecur")), 1)) : C("", !0)
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: l.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (i) => re("color"))
        }, [
          o[44] || (o[44] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", xi, f(e(v)("todoist.menu.pickColor")), 1),
          t("span", Ci, [
            mt.value.id === "none" ? (r(), u("span", $i, "⊘")) : (r(), u("span", {
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
            Ut(" " + f(mt.value.name), 1)
          ])
        ], 2),
        l.activeSubpanel === "color" ? (r(), u("div", Si, [
          t("div", _i, [
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
              }, f(i.id === "none" ? mt.value.id === "none" ? "✓" : "⊘" : mt.value.id === i.id ? "✓" : ""), 7),
              t("span", Ri, f(i.name), 1)
            ], 10, Ii)), 64))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: l.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (i) => re("project"))
        }, [
          o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Li, f(e(v)("todoist.menu.moveToProject")), 1),
          o[46] || (o[46] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        l.activeSubpanel === "project" ? (r(), u("div", {
          key: 3,
          class: Z(["todoist-project-flyout", { "open-left": l.flyoutOpenLeft }]),
          style: bt(l.flyoutStyle)
        }, [
          (r(!0), u(it, null, dt(e(T).projects, (i) => (r(), u("button", {
            key: i.id,
            type: "button",
            class: Z(["todoist-project-flyout-item", { active: String(i.id) === ot.value }]),
            disabled: !!e(T).movingTaskId || String(i.id) === ot.value,
            onClick: (j) => fo(i)
          }, [
            o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Mi, f(i.name), 1),
            String(i.id) === ot.value ? (r(), u("span", Oi, f(e(v)("todoist.menu.currentBadge")), 1)) : C("", !0)
          ], 10, Pi))), 128))
        ], 6)) : C("", !0),
        o[49] || (o[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: vo
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Ai, f(l.task.isRecurring ? e(v)("todoist.menu.deleteRecurringTask") : e(v)("todoist.menu.deleteTask")), 1)
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
        onClick: o[26] || (o[26] = F(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (i) => ze("prompt", i))
        }, [
          o[50] || (o[50] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", ji, f(M.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(v)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ei)
        ], 32),
        t("div", Wi, [
          M.message ? (r(), u("p", Ui, f(M.message), 1)) : C("", !0),
          Mt(t("input", {
            ref_key: "promptInputRef",
            ref: et,
            "onUpdate:modelValue": o[25] || (o[25] = (i) => M.value = i),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: M.placeholder,
            onKeydown: [
              St(F(Ve, ["prevent"]), ["enter"]),
              St(F(ne, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, Bi), [
            [Kt, M.value]
          ])
        ]),
        t("div", zi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ne
          }, f(e(v)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: Ve
          }, f(M.confirmText || e(v)("common.confirm")), 1)
        ])
      ], 4)) : C("", !0),
      I.isOpen && e(J).active ? (r(), u("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: ht,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${I.x}px`,
          top: `${I.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[28] || (o[28] = F(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (i) => ze("confirm", i))
        }, [
          t("span", Hi, f(I.icon || "⚠️"), 1),
          t("h3", Vi, f(I.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(v)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ni)
        ], 32),
        t("div", Ki, [
          I.danger ? (r(), u("div", Fi, [
            t("div", Yi, f(I.alertText), 1)
          ])) : C("", !0),
          t("p", Xi, f(I.message), 1)
        ]),
        t("div", Gi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: de
          }, f(e(v)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: Z(["todoist-dialog-btn", I.danger ? "danger" : "primary"]),
            onClick: ho
          }, f(I.confirmText || e(v)("common.confirm")), 3)
        ])
      ], 4)) : C("", !0)
    ]));
  }
}), Qi = /* @__PURE__ */ ee(qi, [["__scopeId", "data-v-0e73dbcb"]]), Ji = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, Zi = { class: "reminder-shortcuts" }, ta = ["disabled"], ea = { class: "reminder-preview" }, oa = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, na = ["disabled"], sa = ["disabled"], ia = ["disabled"], aa = /* @__PURE__ */ zt({
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
    const p = a, m = s, x = p.value || (p.taskDate ? p.taskDate + "T" + (p.taskTime || "09:00") : ""), D = P(x.slice(0, 10)), U = P(x.slice(11, 16)), $ = P(!1), N = P(""), T = P(!0), Y = lt(() => D.value && U.value ? (/* @__PURE__ */ new Date(D.value + "T" + U.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function K(A) {
      if ($.value) return;
      const y = /* @__PURE__ */ new Date();
      A === "tomorrow" ? (y.setDate(y.getDate() + 1), y.setHours(9, 0, 0, 0)) : y.setTime(y.getTime() + A * 6e4), D.value = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`, U.value = `${String(y.getHours()).padStart(2, "0")}:${String(y.getMinutes()).padStart(2, "0")}`, N.value = "", T.value = !0;
    }
    async function H(A) {
      if (!($.value || J.pendingWrites)) {
        if (A && (!Number.isFinite(Date.parse(A)) || Date.parse(A) <= Date.now())) {
          N.value = "请选择未来的提醒时间。";
          return;
        }
        if (k.taskId === p.taskId) {
          $.value = !0, N.value = "";
          try {
            if (await rt.setReminder(A), k.taskId !== p.taskId) return;
            k.error ? N.value = k.error : k.reminderTime === A && m("close");
          } finally {
            $.value = !1;
          }
        }
      }
    }
    return (A, y) => (r(), Ot(Le, {
      anchor: a.anchor,
      onClose: y[9] || (y[9] = (S) => m("close"))
    }, {
      default: ie(() => [
        t("section", Ji, [
          y[11] || (y[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", Zi, [
            t("button", {
              type: "button",
              onClick: y[0] || (y[0] = (S) => K(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: y[1] || (y[1] = (S) => K(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: y[2] || (y[2] = (S) => K("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: $.value }, [
            y[10] || (y[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Jt(Pe, {
              modelValue: D.value,
              "onUpdate:modelValue": y[3] || (y[3] = (S) => D.value = S),
              "time-value": U.value,
              "onUpdate:timeValue": y[4] || (y[4] = (S) => U.value = S),
              embedded: "",
              onTimeValidity: y[5] || (y[5] = (S) => T.value = S)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, ta),
          t("div", ea, f(Y.value || "选择提醒的日期和时间"), 1),
          y[12] || (y[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          N.value ? (r(), u("p", oa, f(N.value), 1)) : C("", !0),
          t("footer", null, [
            a.value ? (r(), u("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: $.value || !!e(J).pendingWrites,
              onClick: y[6] || (y[6] = (S) => H(""))
            }, "移除提醒", 8, na)) : C("", !0),
            t("button", {
              type: "button",
              disabled: $.value,
              onClick: y[7] || (y[7] = (S) => m("close"))
            }, "取消", 8, sa),
            t("button", {
              type: "button",
              class: "save",
              disabled: $.value || !!e(J).pendingWrites || !D.value || !U.value || !T.value,
              onClick: y[8] || (y[8] = (S) => H(D.value + "T" + U.value))
            }, f($.value ? "保存中…" : "设置提醒"), 9, ia)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), la = /* @__PURE__ */ ee(aa, [["__scopeId", "data-v-da9e3ddd"]]), ra = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, da = { class: "inspector-main-col" }, ca = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, ua = {
  key: 1,
  class: "inspector-repo-badges"
}, pa = ["title", "onClick"], ma = { class: "repo-badge-name" }, fa = { class: "inspector-section inspector-title-section" }, va = { class: "task-title-row" }, ga = ["title"], ba = {
  key: 0,
  class: "check-mark"
}, ka = ["value", "aria-label", "disabled", "placeholder"], ya = ["value", "placeholder", "disabled"], ha = ["onKeydown"], wa = {
  key: 0,
  class: "desc-placeholder-btn"
}, Ta = ["innerHTML"], Da = {
  key: 2,
  role: "status"
}, xa = {
  key: 3,
  class: "attached-img-grid"
}, Ca = ["onClick"], $a = ["src", "alt"], Sa = { class: "attached-img-info" }, _a = ["onClick"], Ia = { class: "inspector-section inspector-subtasks-section" }, Ra = {
  key: 0,
  class: "subtasks-list"
}, La = ["onClick"], Pa = {
  key: 0,
  class: "check-tick"
}, Ma = { class: "subtask-content-text" }, Oa = ["title", "onClick"], Aa = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, ja = ["value", "placeholder"], Ea = { class: "subtask-actions" }, Wa = { class: "inspector-section inspector-comments-section" }, Ua = { class: "comment-input-bar" }, Ba = { class: "comment-input-wrap" }, za = ["value", "placeholder", "disabled"], Ha = ["title"], Va = ["disabled"], Na = {
  key: 0,
  class: "comments-list"
}, Ka = { class: "comment-item-content" }, Fa = { class: "comment-item-header" }, Ya = { class: "comment-time" }, Xa = { class: "comment-text" }, Ga = {
  key: 0,
  class: "comment-attached-thumb"
}, qa = ["src", "onClick"], Qa = { class: "inspector-side-col" }, Ja = { class: "side-prop-group date-picker-anchor" }, Za = { class: "row-text" }, tl = { class: "side-prop-group date-picker-anchor" }, el = { class: "row-text" }, ol = ["title"], nl = { class: "side-prop-group" }, sl = { class: "side-prop-label" }, il = { class: "row-text" }, al = { class: "inspector-menu" }, ll = ["disabled", "onClick"], rl = { key: 0 }, dl = { class: "side-prop-group" }, cl = { class: "side-prop-label" }, ul = { class: "row-text" }, pl = { class: "inspector-menu" }, ml = ["placeholder", "aria-label", "onKeydown"], fl = { key: 0 }, vl = {
  key: 1,
  role: "alert"
}, gl = { class: "label-options-list" }, bl = ["checked", "disabled", "onChange"], kl = ["disabled"], yl = { key: 3 }, hl = { class: "side-prop-group" }, wl = { class: "side-prop-label" }, Tl = { class: "row-text" }, Dl = /* @__PURE__ */ zt({
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
    const p = a, m = s, x = P(!1), D = P(null), U = P(null);
    let $;
    te(() => {
      Ho();
      let O = -1;
      $ = new ResizeObserver((d) => {
        const g = d[0]?.contentRect.width;
        g !== O && (O = g, Y(U.value), Y(D.value));
      }), U.value?.parentElement && $.observe(U.value.parentElement);
    }), At(() => $?.disconnect());
    const N = lt(() => {
      if (!p.editDescription) return "";
      const O = p.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), d = document.createElement("template");
      d.innerHTML = Vo.renderMarkdown(O);
      const g = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const Q of Array.from(d.content.querySelectorAll("*"))) {
        if (!g.has(Q.tagName)) {
          Q.replaceWith(document.createTextNode(Q.textContent || ""));
          continue;
        }
        const _t = Q.tagName === "A" ? Q.getAttribute("href") : null;
        for (const Et of Array.from(Q.attributes)) Q.removeAttribute(Et.name);
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
    function K(O) {
      Y(O.el);
    }
    function H(O) {
      const d = O.target;
      Y(d), m("update:editDescription", d.value), m("scheduleDraftSave", O);
    }
    function A() {
      m("saveTitleAndDesc"), x.value = !1;
    }
    const y = P(!1), S = P(!1), h = P(null), L = P(null), B = P(!1), G = P(!1), q = P(!1), E = P(""), M = P(null), et = P(null), yt = P(null), I = P([]), ht = P(!1), l = P("");
    let z;
    ct(() => [p.state.taskId, G.value], async (O, d, g) => {
      if (z?.abort(), !G.value) return;
      const Q = new AbortController();
      z = Q, g(() => Q.abort()), I.value = [], ht.value = !0, l.value = "";
      try {
        const _t = await at.getLabels(Q.signal);
        Q.signal.aborted || (I.value = _t.map((Et) => Et.name));
      } catch {
        Q.signal.aborted || (l.value = "标签库读取失败，仍可查看本页标签。");
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
      B.value = !1, m("selectPriority", O);
    }
    const ut = lt(() => {
      const O = /* @__PURE__ */ new Set([...I.value, ...p.availableLabels || []]);
      for (const d of p.state.labels || []) O.add(d);
      return Array.from(O);
    }), pt = lt(() => {
      const O = E.value.trim().toLowerCase();
      return O ? ut.value.filter((d) => d.toLowerCase().includes(O)) : ut.value;
    });
    function mt() {
      const O = E.value.trim();
      O && (m("createLabel", O), E.value = "");
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
    }), At(() => {
      window.removeEventListener("storage", Bt), window.removeEventListener("todoist-repository-links-changed", Bt);
    });
    const Tt = lt(() => (wt.value, oo(p.state.taskId, p.editDescription)));
    function Rt(O) {
      no.open(O);
    }
    function jt(O, d) {
      if (!O) return "";
      try {
        const g = O.split("-"), Q = parseInt(g[1], 10), _t = parseInt(g[2], 10), Et = d ? ` ${d}` : "";
        return `${Q}月${_t}日${Et}`;
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
    return (O, d) => a.state.isOpen ? (r(), u("div", ra, [
      t("main", da, [
        a.state.error ? (r(), u("p", ca, f(a.state.error), 1)) : C("", !0),
        Tt.value.length ? (r(), u("div", ua, [
          (r(!0), u(it, null, dt(Tt.value, (g) => (r(), u("button", {
            key: g.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(v)("todoist.linkRepoTitle", { name: g.fullName }),
            onClick: (Q) => Rt(g.fullName)
          }, [
            d[38] || (d[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", ma, f(g.fullName), 1),
            d[39] || (d[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, pa))), 128))
        ])) : C("", !0),
        t("section", fa, [
          t("div", va, [
            t("button", {
              type: "button",
              class: Z(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: e(v)("todoist.toggleComplete"),
              onClick: d[0] || (d[0] = (g) => m("toggleComplete"))
            }, [
              a.isTaskCompleted ? (r(), u("span", ba, "✓")) : C("", !0)
            ], 10, ga),
            t("textarea", {
              value: a.editTitle,
              rows: "1",
              "aria-label": e(v)("todoist.taskTitle"),
              onVnodeMounted: K,
              onVnodeUpdated: K,
              disabled: a.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: U,
              class: Z(["inspector-input-title", { "title-done": a.isTaskCompleted }]),
              placeholder: e(v)("todoist.taskTitle"),
              onInput: d[1] || (d[1] = (g) => {
                Y(g.target), m("update:editTitle", g.target.value), m("scheduleDraftSave", g);
              }),
              onCompositionend: d[2] || (d[2] = (g) => m("scheduleDraftSave", g)),
              onBlur: d[3] || (d[3] = (g) => m("saveTitleAndDesc", g)),
              onKeydown: d[4] || (d[4] = St(F((g) => m("saveTitleAndDesc", g), ["prevent"]), ["enter"]))
            }, null, 42, ka)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: d[7] || (d[7] = F((g) => m("dragover"), ["prevent"])),
          onDragleave: d[8] || (d[8] = F((g) => m("dragleave"), ["prevent"])),
          onDrop: d[9] || (d[9] = F((g) => m("dropImage", g), ["prevent"]))
        }, [
          x.value ? (r(), u("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: D,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(v)("todoist.taskDesc"),
            disabled: a.isUploadingImg,
            onInput: H,
            onCompositionend: d[5] || (d[5] = (g) => m("scheduleDraftSave", g)),
            onBlur: A,
            onPaste: d[6] || (d[6] = (g) => m("descPaste", g))
          }, null, 40, ya)) : (r(), u("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: T,
            onKeydown: St(F(T, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (r(), u("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: N.value
            }, null, 8, Ta)) : (r(), u("span", wa, "≡ 描述"))
          ], 40, ha)),
          a.isUploadingImg ? (r(), u("small", Da, "图片上传中…")) : C("", !0),
          a.attachedImages.length ? (r(), u("div", xa, [
            (r(!0), u(it, null, dt(a.attachedImages, (g) => (r(), u("div", {
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
                }, null, 8, $a)
              ], 8, Ca),
              t("div", Sa, [
                t("span", null, f(g.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Q) => m("removeAttachedImage", g.url)
                }, "×", 8, _a)
              ])
            ]))), 128))
          ])) : C("", !0)
        ], 32),
        t("section", Ia, [
          a.subtasks.length > 0 ? (r(), u("div", Ra, [
            (r(!0), u(it, null, dt(a.subtasks, (g) => (r(), u("div", {
              key: g.id,
              class: Z(["subtask-row-item", { done: g.completed }])
            }, [
              t("button", {
                type: "button",
                class: Z(["subtask-check-circle", { checked: g.completed }]),
                onClick: (Q) => m("toggleSubtask", g.id)
              }, [
                g.completed ? (r(), u("span", Pa, "✓")) : C("", !0)
              ], 10, La),
              t("span", Ma, f(g.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(v)("todoist.subtask.delete"),
                onClick: (Q) => m("removeSubtask", g.id)
              }, "×", 8, Oa)
            ], 2))), 128))
          ])) : C("", !0),
          a.isAddingSubtask ? (r(), u("div", Aa, [
            t("input", {
              value: a.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(v)("todoist.subtask.inputPlaceholder"),
              onInput: d[10] || (d[10] = (g) => m("update:newSubtaskText", g.target.value)),
              onKeydown: [
                d[11] || (d[11] = St(F((g) => m("confirmAddSubtask"), ["prevent"]), ["enter"])),
                d[12] || (d[12] = St((g) => m("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, ja),
            t("div", Ea, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: d[13] || (d[13] = (g) => m("confirmAddSubtask"))
              }, f(e(v)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: d[14] || (d[14] = (g) => m("update:isAddingSubtask", !1))
              }, f(e(v)("common.cancel")), 1)
            ])
          ])) : (r(), u("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: d[15] || (d[15] = (g) => m("update:isAddingSubtask", !0))
          }, [
            d[40] || (d[40] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Ut(" " + f(e(v)("todoist.subtask.add")), 1)
          ]))
        ]),
        (r(), Ot(Uo, {
          key: a.state.taskId,
          "task-id": a.state.taskId,
          description: a.editDescription,
          title: a.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", Wa, [
          t("div", Ua, [
            d[41] || (d[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Ba, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(v)("todoist.comment.placeholder"),
                disabled: a.isSubmittingComment,
                onInput: d[16] || (d[16] = (g) => m("update:newCommentText", g.target.value)),
                onKeydown: d[17] || (d[17] = St(F((g) => m("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, za),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(v)("todoist.comment.attachPhoto"),
                onClick: d[18] || (d[18] = F((g) => m("triggerFileInput"), ["stop"]))
              }, "📎", 8, Ha)
            ]),
            a.newCommentText.trim() ? (r(), u("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: d[19] || (d[19] = (g) => m("submitComment"))
            }, f(e(v)("todoist.comment.send")), 9, Va)) : C("", !0)
          ]),
          a.state.comments.length > 0 ? (r(), u("div", Na, [
            (r(!0), u(it, null, dt(a.state.comments, (g) => (r(), u("div", {
              key: g.id,
              class: "comment-item"
            }, [
              d[43] || (d[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", Ka, [
                t("div", Fa, [
                  d[42] || (d[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", Ya, f(Xt(g.postedAt)), 1)
                ]),
                t("div", Xa, f(g.content), 1),
                g.attachment?.url ? (r(), u("div", Ga, [
                  t("img", {
                    src: g.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Q) => nt(g.attachment.url, g.attachment.name)
                  }, null, 8, qa)
                ])) : C("", !0)
              ])
            ]))), 128))
          ])) : C("", !0)
        ])
      ]),
      t("aside", Qa, [
        t("div", Ja, [
          d[45] || (d[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: h,
            type: "button",
            class: Z(["side-item-row click-row", { active: y.value, filled: !!a.editStartDate }]),
            onClick: d[21] || (d[21] = (g) => y.value = !y.value)
          }, [
            d[44] || (d[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", Za, f(jt(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (r(), u("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: d[20] || (d[20] = F((g) => m("clearStartDate"), ["stop"]))
            }, "×")) : C("", !0)
          ], 2),
          y.value ? (r(), Ot(Pe, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": h.value,
            "onUpdate:modelValue": d[22] || (d[22] = (g) => m("update:editStartDate", g)),
            "onUpdate:timeValue": d[23] || (d[23] = (g) => m("update:editStartTime", g)),
            onChange: d[24] || (d[24] = (g) => m("startChange")),
            onClose: d[25] || (d[25] = (g) => y.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", tl, [
          d[47] || (d[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: L,
            type: "button",
            class: Z(["side-item-row click-row", { active: S.value, filled: !!a.editDueDate }]),
            onClick: d[27] || (d[27] = (g) => S.value = !S.value)
          }, [
            d[46] || (d[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", el, f(jt(a.editDueDate, a.editDueTime) || e(v)("todoist.prop.setDueDate")), 1),
            a.editDueDate ? (r(), u("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(v)("todoist.prop.clearDueDate"),
              onClick: d[26] || (d[26] = F((g) => m("clearDueDate"), ["stop"]))
            }, "×", 8, ol)) : C("", !0)
          ], 2),
          S.value ? (r(), Ot(Pe, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": L.value,
            "onUpdate:modelValue": d[28] || (d[28] = (g) => m("update:editDueDate", g)),
            "onUpdate:timeValue": d[29] || (d[29] = (g) => m("update:editDueTime", g)),
            onChange: d[30] || (d[30] = (g) => m("dueChange")),
            onClose: d[31] || (d[31] = (g) => S.value = !1)
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", nl, [
          t("span", sl, f(e(v)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: yt,
            type: "button",
            class: "side-item-row",
            onClick: d[32] || (d[32] = (g) => B.value = !0)
          }, [
            t("span", {
              style: bt({ color: X(a.state.priority) })
            }, "⚑", 4),
            t("span", il, "P" + f(5 - a.state.priority), 1),
            d[48] || (d[48] = t("span", null, "⌄", -1))
          ], 512),
          B.value ? (r(), Ot(Le, {
            key: 0,
            anchor: yt.value,
            onClose: d[33] || (d[33] = (g) => B.value = !1)
          }, {
            default: ie(() => [
              t("div", al, [
                (r(), u(it, null, dt(W, (g) => t("button", {
                  key: g.level,
                  type: "button",
                  disabled: !!e(J).pendingWrites,
                  onClick: (Q) => ot(g.level)
                }, [
                  t("span", {
                    style: bt({ color: g.color })
                  }, "⚑", 4),
                  Ut(" " + f(g.name) + " ", 1),
                  a.state.priority === g.level ? (r(), u("span", rl, "✓")) : C("", !0)
                ], 8, ll)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", dl, [
          t("span", cl, f(e(v)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: M,
            type: "button",
            class: "side-item-row",
            onClick: d[34] || (d[34] = (g) => G.value = !0)
          }, [
            t("span", ul, f(a.state.labels.join("、") || e(v)("todoist.prop.addLabels")), 1),
            d[49] || (d[49] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (r(), Ot(Le, {
            key: 0,
            anchor: M.value,
            onClose: d[36] || (d[36] = (g) => G.value = !1)
          }, {
            default: ie(() => [
              t("div", pl, [
                Mt(t("input", {
                  "onUpdate:modelValue": d[35] || (d[35] = (g) => E.value = g),
                  placeholder: e(v)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(v)("todoist.prop.searchLabelAria"),
                  onKeydown: St(F(mt, ["prevent"]), ["enter"])
                }, null, 40, ml), [
                  [Kt, E.value]
                ]),
                ht.value ? (r(), u("small", fl, f(e(v)("todoist.prop.readingLabels")), 1)) : C("", !0),
                l.value ? (r(), u("p", vl, f(l.value), 1)) : C("", !0),
                t("div", gl, [
                  (r(!0), u(it, null, dt(pt.value, (g) => (r(), u("label", {
                    key: g,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + f(g), 1),
                    t("input", {
                      type: "checkbox",
                      checked: a.state.labels.includes(g),
                      disabled: !!e(J).pendingWrites,
                      onChange: (Q) => m("toggleLabelSelect", g)
                    }, null, 40, bl)
                  ]))), 128))
                ]),
                E.value.trim() && !ut.value.includes(E.value.trim()) ? (r(), u("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(J).pendingWrites,
                  onClick: mt
                }, f(e(v)("todoist.prop.createLabelBtn", { name: E.value.trim() })), 9, kl)) : C("", !0),
                !ht.value && !pt.value.length && !E.value ? (r(), u("small", yl, f(e(v)("todoist.prop.noLabels")), 1)) : C("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", hl, [
          t("span", wl, [
            Ut(f(e(v)("todoist.prop.reminder")) + " ", 1),
            t("small", null, f(e(v)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: et,
            type: "button",
            class: "side-item-row",
            onClick: R
          }, [
            t("span", Tl, f(Yt(a.state.reminderTime) || e(v)("todoist.prop.addReminder")), 1),
            d[50] || (d[50] = t("span", null, "＋", -1))
          ], 512),
          q.value ? (r(), Ot(la, {
            key: 0,
            anchor: et.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: d[37] || (d[37] = (g) => q.value = !1)
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : C("", !0)
        ])
      ])
    ])) : C("", !0);
  }
}), xl = /* @__PURE__ */ ee(Dl, [["__scopeId", "data-v-20d0cacd"]]), Cl = { class: "inspector-title-row" }, $l = ["title", "aria-label"], Sl = ["disabled"], _l = ["href"], Il = "todoistInspectorPositionV2", Rl = /* @__PURE__ */ zt({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const s = k, p = lt(() => Pt.get(s.taskId)), m = lt(() => p.value?.status === "failed" ? "保存未确认" : p.value?.status === "saving" ? "正在保存…" : Y.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), x = lt(() => [
      m.value,
      p.value?.status === "failed" ? p.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: D,
      headerRef: U,
      initialStyle: $,
      onHeaderPointerDown: N,
      onResizePointerDown: T
    } = eo({
      windowId: "todoist-inspector",
      storageKey: Il,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => s.isOpen && J.active
    }), Y = P(""), K = P(""), H = P(""), A = P(""), y = P(""), S = P(""), h = P(!1), L = P(!1), B = P(null), G = P(!1), q = P(""), E = P(""), M = P(!1), et = lt(() => {
      const w = s.description || "", b = [], _ = w.split(`
`);
      let ft = 0;
      for (const Ct of _) {
        const vt = Ct.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        vt && b.push({
          id: `st_${ft++}`,
          completed: vt[1].toLowerCase() === "x",
          text: vt[2].trim()
        });
      }
      return b;
    }), yt = lt(() => et.value.filter((w) => w.completed).length);
    function I(w) {
      const ft = (s.description || "").split(`
`).filter((Gt) => !Gt.match(/^\s*-\s*\[([ xX])\]/)), Ct = w.map((Gt) => `- [${Gt.completed ? "x" : " "}] ${Gt.text}`), vt = [...ft, ...Ct].join(`
`).trim();
      K.value = vt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(Y.value, vt);
    }
    function ht() {
      if (!q.value.trim()) return;
      const w = [...et.value, {
        id: `st_${Date.now()}`,
        text: q.value.trim(),
        completed: !1
      }];
      q.value = "", G.value = !1, I(w);
    }
    function l(w) {
      const b = et.value.map((_) => _.id === w ? { ..._, completed: !_.completed } : _);
      I(b);
    }
    function z(w) {
      const b = et.value.filter((_) => _.id !== w);
      I(b);
    }
    const R = lt(() => {
      for (const w of kt.columns || []) {
        const b = w.tasks.find((_) => _.id === s.taskId);
        if (b) return !!b.completed;
      }
      return !1;
    });
    async function W() {
      for (const w of kt.columns || []) {
        const b = w.tasks.find((_) => _.id === s.taskId);
        if (b) {
          const _ = !b.completed;
          b.completed = _, b._taskRaw && (b._taskRaw.checked = _);
          try {
            await at.toggleTaskCompletion(b.id, _);
          } catch {
            b.completed = !_, b._taskRaw && (b._taskRaw.checked = !_), s.error = "完成状态保存未确认，请刷新核对。";
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
      K.value = (w || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => s.startDate, (w) => {
      H.value = w || "";
    }, { immediate: !0 }), ct(() => s.startTime, (w) => {
      A.value = w || "";
    }, { immediate: !0 }), ct(() => s.dueDate, (w) => {
      y.value = w || "";
    }, { immediate: !0 }), ct(() => s.dueTime, (w) => {
      S.value = w || "";
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
      S.value && !y.value && (y.value = nt()), rt.setDueDateAndTime(y.value, S.value);
    }
    function jt() {
      S.value = "", Rt();
    }
    function Yt() {
      y.value = "", S.value = "", Rt();
    }
    const Xt = lt(() => {
      const w = [], b = /* @__PURE__ */ new Set(), _ = s.description || "", ft = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Ct;
      for (; (Ct = ft.exec(_)) !== null; ) {
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

`), b = [K.value.trim(), w].filter(Boolean);
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
    function Et() {
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
      b && (w.preventDefault(), w.stopPropagation(), Vt(b));
    }
    function be() {
      J.active && B.value?.click();
    }
    async function ke(w) {
      const b = w.target;
      if (!J.active) {
        b.value = "";
        return;
      }
      const _ = b.files?.[0];
      _ && await Vt(_), b.value = "";
    }
    async function ye(w) {
      L.value = !1;
      const b = w.dataTransfer?.files?.[0];
      b && (b.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(b.name)) && await Vt(b);
    }
    function Ht(w) {
      const b = w.clipboardData;
      if (!b) return null;
      if (b.files && b.files.length > 0)
        for (let _ = 0; _ < b.files.length; _++) {
          const ft = b.files[_];
          if (ft.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(ft.name))
            return ft;
        }
      if (b.items && b.items.length > 0)
        for (let _ = 0; _ < b.items.length; _++) {
          const ft = b.items[_];
          if (ft.type.includes("image")) {
            const Ct = ft.getAsFile();
            if (Ct) return Ct;
          }
        }
      return null;
    }
    async function Vt(w) {
      if (h.value || !J.active || !s.taskId) return;
      const b = s.taskId;
      h.value = !0;
      try {
        if (await Q(), s.taskId !== b || !s.isOpen || !J.active) return;
        await rt.attachImageToTask(w);
      } catch (_) {
        s.taskId === b && (s.error = _ instanceof Error ? _.message : "上传失败");
      } finally {
        h.value = !1;
      }
    }
    function he(w) {
      const b = Ht(w);
      b && (w.preventDefault(), Vt(b));
    }
    function oe(w) {
      if (!s.isOpen || !J.active) return;
      const b = Ht(w);
      b && (w.preventDefault(), w.stopPropagation(), Vt(b));
    }
    ct(() => J.active, (w) => {
      window.removeEventListener("paste", oe, { capture: !0 }), w && window.addEventListener("paste", oe, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), At(() => {
      Q(), window.removeEventListener("paste", oe, { capture: !0 });
    });
    async function le(w) {
      const b = s.description || "", _ = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ft = b.replace(new RegExp(`!\\[[^\\]]*\\]\\(${_}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(s.title, ft);
    }
    return (w, b) => Mt((r(), u("aside", {
      ref_key: "panelRef",
      ref: D,
      class: "todoist-inspector-window",
      style: bt(e($)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: he
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: U,
        class: "inspector-header",
        onPointerdown: b[2] || (b[2] = (_) => e(N)(_))
      }, [
        t("div", Cl, [
          b[18] || (b[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          p.value ? (r(), u("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: b[0] || (b[0] = F(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: x.value,
              "aria-label": x.value
            }, f(m.value), 9, $l),
            p.value.status !== "saving" ? (r(), u("button", {
              key: 0,
              type: "button",
              disabled: e(s).saving || !Y.value.trim(),
              onClick: F(ve, ["stop"])
            }, f(p.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Sl)) : C("", !0)
          ], 32)) : C("", !0),
          e(s).url ? (r(), u("a", {
            key: 1,
            href: e(s).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, _l)) : C("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: b[1] || (b[1] = F(() => {
          }, ["stop"])),
          onClick: F(Et, ["stop"])
        }, "×", 32)
      ], 544),
      e(s).isOpen ? (r(), Ot(xl, {
        key: e(s).taskId,
        state: e(s),
        "edit-title": Y.value,
        "onUpdate:editTitle": b[3] || (b[3] = (_) => Y.value = _),
        "edit-description": K.value,
        "onUpdate:editDescription": b[4] || (b[4] = (_) => K.value = _),
        "edit-start-date": H.value,
        "onUpdate:editStartDate": b[5] || (b[5] = (_) => H.value = _),
        "edit-start-time": A.value,
        "onUpdate:editStartTime": b[6] || (b[6] = (_) => A.value = _),
        "edit-due-date": y.value,
        "onUpdate:editDueDate": b[7] || (b[7] = (_) => y.value = _),
        "edit-due-time": S.value,
        "onUpdate:editDueTime": b[8] || (b[8] = (_) => S.value = _),
        "is-uploading-img": h.value,
        "is-drag-over": L.value,
        "is-task-completed": R.value,
        subtasks: et.value,
        "completed-subtasks-count": yt.value,
        "is-adding-subtask": G.value,
        "onUpdate:isAddingSubtask": b[9] || (b[9] = (_) => G.value = _),
        "new-subtask-text": q.value,
        "onUpdate:newSubtaskText": b[10] || (b[10] = (_) => q.value = _),
        "new-comment-text": E.value,
        "onUpdate:newCommentText": b[11] || (b[11] = (_) => E.value = _),
        "is-submitting-comment": M.value,
        "attached-images": Xt.value,
        "available-labels": e(kt).availableLabels || [],
        onScheduleDraftSave: _t,
        onSaveTitleAndDesc: fe,
        onToggleComplete: W,
        onTriggerFileInput: be,
        onDragover: b[12] || (b[12] = (_) => L.value = !0),
        onDragleave: b[13] || (b[13] = (_) => L.value = !1),
        onDropImage: ye,
        onDescPaste: ge,
        onRemoveAttachedImage: le,
        onToggleSubtask: l,
        onRemoveSubtask: z,
        onConfirmAddSubtask: ht,
        onSubmitComment: mt,
        onStartChange: wt,
        onClearStartDate: Tt,
        onClearStartTime: Bt,
        onDueChange: Rt,
        onClearDueDate: Yt,
        onClearDueTime: jt,
        onSelectPriority: X,
        onToggleLabelSelect: ot,
        onRemoveLabel: ut,
        onCreateLabel: pt
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : C("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: B,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: ke
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: b[14] || (b[14] = (_) => e(T)(_, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: b[15] || (b[15] = (_) => e(T)(_, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: b[16] || (b[16] = (_) => e(T)(_, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: b[17] || (b[17] = (_) => e(T)(_, "w"))
      }, null, 32)
    ], 36)), [
      [Re, e(s).isOpen]
    ]);
  }
}), Ll = /* @__PURE__ */ ee(Rl, [["__scopeId", "data-v-35222deb"]]), Pl = { class: "vue-todoist-workspace-wrapper" }, Ml = ["aria-label"], Ol = { class: "todoist-head-title-wrap" }, Al = { id: "todoist-workspace-title" }, jl = ["aria-label"], El = ["title"], Wl = {
  class: "muted small",
  role: "status"
}, Ul = ["title", "aria-expanded"], Bl = ["title"], zl = ["title"], Hl = ["title"], Vl = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Nl = { class: "todoist-workspace-cal-area" }, Kl = { class: "todoist-workspace-task-area" }, Fl = "todoistWorkspacePosition", cr = /* @__PURE__ */ zt({
  __name: "TodoistWorkspace",
  setup(a) {
    const s = P(!1), p = To(() => import("./TodoistAccountSettings-B1VdTOgO.js")), m = P(!1), x = P(!1), D = P(!document.hidden), U = P(!1), $ = lt(() => J.visible && D.value);
    J.session++, J.active = $.value, io(
      () => $.value && !kt.movingTaskId,
      Zt,
      () => tt.loadWorkspace(void 0, void 0, !0)
    );
    let N = !1;
    const T = P(null), Y = Lo;
    function K() {
      H.value && (H.value.style.removeProperty("width"), H.value.style.removeProperty("height"), H.value.style.removeProperty("left"), H.value.style.removeProperty("top"), H.value.style.removeProperty("right"), H.value.style.removeProperty("bottom"), H.value.style.removeProperty("margin"), H.value.style.removeProperty("transform"));
    }
    ct(() => J.visible, (R) => {
      R && (Y.isOpen = !0, J.active = D.value, tt.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: H,
      headerRef: A,
      initialStyle: y,
      stopInteractions: S,
      onHeaderPointerDown: h,
      onResizePointerDown: L,
      bringToFront: B
    } = eo({
      windowId: "todoist",
      storageKey: Fl,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => $.value
    }), G = () => H.value;
    function q() {
      Zt(), Io(), Ro(), rt.cancelReads(), S(), window.removeEventListener("keydown", et);
    }
    const E = Co(q);
    function M() {
      D.value = !document.hidden;
    }
    function et(R) {
      R.key === "Escape" && k.isOpen && (R.preventDefault(), R.stopPropagation(), rt.close());
    }
    ct($, (R) => {
      J.active = R, R ? (window.addEventListener("keydown", et), N || (N = !0, tt.loadWorkspace()), It(() => {
        $.value && B();
      })) : q();
    }, { flush: "sync" }), ct(m, (R) => {
      R && (x.value = !0);
    }), ct([$, s, Ge], ([R, W, X]) => {
      if (!(!R || !W || !X) && (Ge.value = null, Po("todoist") === X.transition)) {
        if (J.pendingWrites || k.isOpen && k.taskId !== X.id) {
          Ao.show({ appName: "Todoist", title: v("todoist.retainDetailTitle"), message: v("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        k.isOpen && k.taskId === X.id || rt.openTask(X.id);
      }
    }, { flush: "post" }), te(() => {
      s.value = !0, U.value && It(K), ce.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: G }), document.addEventListener("visibilitychange", M), $.value && (window.addEventListener("keydown", et), N || (N = !0, tt.loadWorkspace()), Ye.refresh());
    }), At(() => {
      $o(), E(), document.removeEventListener("visibilitychange", M), ce.unregister("todoist", G), rt.close(), Object.assign(k, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), tt.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Se.updateState({ title: v("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ye.update([]);
    });
    function yt() {
      Se.toggleCalendar();
    }
    function I() {
      Se.refresh();
    }
    function ht() {
      tt.updateState({ accountConfigured: !0 }), $.value && tt.loadWorkspace(void 0, void 0, !0);
    }
    function l() {
      ce.minimize("todoist");
    }
    function z() {
      J.visible = !1, Y.isOpen = !1, ce.close("todoist");
    }
    return (R, W) => (r(), u("div", Pl, [
      Mt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: H,
        class: "card wide todoist-workspace",
        style: bt(e(y)),
        "aria-label": e(v)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: A,
          class: "todoist-workspace-head",
          onPointerdown: W[4] || (W[4] = (X) => e(h)(X))
        }, [
          t("div", Ol, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Al, f(e(Y).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(v)("todoist.viewAria")
          }, [
            Jt(Xo)
          ], 8, jl),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: Z(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(Y).isCalendarOpen }]),
            type: "button",
            title: e(v)("todoist.calendarToggleTitle"),
            onClick: yt
          }, " 📅 " + f(e(v)("todoist.calendar")), 11, El),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Wl, f(e(J).pendingWrites ? e(v)("todoist.pendingWrites") : e(v)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: T,
            type: "button",
            class: "no-drag",
            title: e(v)("todoist.settingsTitle"),
            "aria-expanded": m.value,
            onClick: W[0] || (W[0] = F((X) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Ul),
          x.value ? (r(), Ot(e(p), {
            key: 0,
            visible: $.value && m.value,
            anchor: T.value,
            onClose: W[1] || (W[1] = (X) => m.value = !1),
            onAccountSaved: ht
          }, null, 8, ["visible", "anchor"])) : C("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: e(v)("common.refresh"),
            onClick: I
          }, " ↻ ", 8, Bl),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(v)("todoist.minimizeHint"),
            onPointerdown: W[2] || (W[2] = F(() => {
            }, ["stop"])),
            onClick: F(l, ["stop"])
          }, " − ", 40, zl),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(v)("todoist.closeHint"),
            onPointerdown: W[3] || (W[3] = F(() => {
            }, ["stop"])),
            onClick: F(z, ["stop"])
          }, " ✕ ", 40, Hl)
        ], 544),
        e(kt).accountConfigured === !1 ? (r(), Ot(Mo, {
          key: 0,
          icon: "✅",
          title: e(v)("todoist.tokenMissingTitle"),
          description: e(v)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(v)("todoist.getToken"),
          onConfigure: W[5] || (W[5] = (X) => m.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), u("div", Vl, [
          Mt(t("div", Nl, [
            Jt(zn)
          ], 512), [
            [Re, e(Y).isCalendarOpen]
          ]),
          t("div", Kl, [
            Jt(Qi)
          ])
        ])),
        Jt(Ll),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        U.value ? C("", !0) : (r(), u(it, { key: 2 }, [
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
      ], 12, Ml), [
        [Re, e(J).visible]
      ])
    ]));
  }
});
export {
  cr as default
};
