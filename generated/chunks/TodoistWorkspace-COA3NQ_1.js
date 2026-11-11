import { d as Ht, o as r, e as p, F as at, i as t, u as e, A as tt, t as v, r as Zt, w as ct, x as jt, B as oe, m as Vt, g as dt, h as K, f as C, b as M, M as eo, G as ze, z as gt, s as ot, D as Lt, l as Mt, n as Gt, p as te, H as de, k as $t, j as At, y as Re, C as Do } from "./vendor-vue-9b0eS4bW.js";
import { a as xo, t as q, w as Co, o as _o, p as So } from "./module-state-D4Dr89rP.js";
import { b as Fe, h as Ke, i as ee, j as yt, e as et, d as ft, c as $o, k as Io, t as Ye, g as $e, l as Po, m as Ro, n as Lo } from "./calendar.service-DnkbEAru.js";
import { u as oo } from "./useWindowDraggable-DY_QVDld.js";
import { w as me, b as Oo } from "./window-manager.store-BdI_8a-H.js";
import { t as f, _ as ne } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { A as Eo } from "./AccountSetupGuide-DHqCWacl.js";
import { i as Ee } from "./image-viewer-store-QvSlh445.js";
import { d as Mo, n as Ao } from "./view-styles-NfYkuEdl.js";
import { t as lt, d as jo, s as Wo, b as ve, g as Ge, f as Ie, p as Uo } from "./todoist.service-By6xSyz1.js";
import { g as no, T as Vo } from "./TaskRepositoryLinks-DBsVPgCJ.js";
import { g as Bo } from "./bili-video-links-DXpyplJq.js";
import { g as No } from "./web-site-links-BSIympLj.js";
import { v as so, D as Ho } from "./search.service-wriY3nvN.js";
import { I as Le, T as Oe } from "./TodoistDatePickerPopover-D8yR_FLS.js";
import { m as zo } from "./core-utils-B2N4WtKx.js";
import { pendingTodoistTask as Xe } from "./task-navigation-CvM3gAxl.js";
const Fo = ["title"], Ko = { class: "todoist-tab-text" }, Yo = ["title"], Go = { class: "todoist-tab-text" }, Xo = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspaceTabs",
  setup(a) {
    return (s, d) => (r(), p(at, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: tt({ on: e(Ke).view === "inbox" }),
        title: e(f)("todoist.inbox"),
        onClick: d[0] || (d[0] = (m) => e(Fe).switchView("inbox"))
      }, [
        d[2] || (d[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", Ko, v(e(f)("todoist.inbox")), 1)
      ], 10, Fo),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: tt({ on: e(Ke).view === "projects" }),
        title: e(f)("todoist.projects"),
        onClick: d[1] || (d[1] = (m) => e(Fe).switchView("projects"))
      }, [
        d[3] || (d[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", Go, v(e(f)("todoist.projects")), 1)
      ], 10, Yo)
    ], 64));
  }
}), io = "todoist_reminder_v2:", qo = "todoist_remind_";
async function Qo(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const s = io + a, d = await chrome.storage.local.get([s, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(d, s) ? d[s] || void 0 : d.todoist_reminders_map_v1?.[a];
}
async function Jo(a, s, d) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const m = new Date(s).getTime();
  if (s && (!Number.isFinite(m) || m <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (s && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const k = io + a, x = qo + a;
  await chrome.alarms.clear(x), await chrome.storage.local.set({ [k]: s ? { time: s, title: d } : null }), s && await chrome.alarms.create(x, { when: m });
}
const Et = Zt(/* @__PURE__ */ new Map());
let Zo = 0;
function qe(a, s, d, m = "editing") {
  const k = ++Zo;
  return Et.set(a, { revision: k, title: s, description: d, status: m, error: "" }), k;
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
let Pe = Promise.resolve(), fe = 0, Qe = Promise.resolve();
const ge = /* @__PURE__ */ new Map();
let ce = 0;
const Xt = /* @__PURE__ */ new Map();
function re(a = !0) {
  a && ce++;
  for (const s of Xt.values()) s.abort();
  Xt.clear(), y.loading = !1;
}
function Je(a) {
  Xt.get(a)?.abort();
  const s = new AbortController();
  Xt.set(a, s);
  const d = ce, m = y.taskId;
  return {
    signal: s.signal,
    current: () => !s.signal.aborted && d === ce && y.isOpen && m === y.taskId && Xt.get(a) === s,
    finish: () => {
      Xt.get(a) === s && Xt.delete(a);
    }
  };
}
function Ut() {
  re(!1);
  const a = y.taskId, s = ce;
  return { taskId: a, current: () => y.isOpen && s === ce && a === y.taskId };
}
function tn(a) {
  return new Promise((s) => {
    const d = new FileReader();
    d.onload = () => s(d.result || ""), d.onerror = () => s(""), d.readAsDataURL(a);
  });
}
function Ze(a, s, d) {
  for (const m of yt.columns)
    for (const k of m.tasks)
      String(k.id) === a && (k.content = s, d !== void 0 && (k.description = d), k._taskRaw && (k._taskRaw.content = s, d !== void 0 && (k._taskRaw.description = d)));
  ft.updateTaskTitle(a, s);
}
const en = {
  state: y,
  cancelReads: re,
  stageTitleDraft(a, s, d) {
    a && (qe(a, s, d), re(!1), y.taskId === a && (y.title = s), Ze(a, s, d));
  },
  async openTask(a, s) {
    if (!a) return;
    if (re(), y.taskId = a, y.isOpen = !0, y.error = "", Object.assign(y, {
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
      const x = ve(s.due?.datetime || s.due?.date || s.dueDate || "");
      y.dueDate = x.date, y.dueTime = x.time;
      const V = s.startDate || Ge(a, y.description), $ = ve(V);
      y.startDate = $.date, y.startTime = $.time, y.labels = [...s.labels || []], y.url = s.url || "";
    }
    const d = Et.get(a);
    d && (y.title = d.title, y.description = d.description);
    const m = Je("reminder");
    Qo(a).then((x) => {
      m.current() && (y.reminderTime = x?.time || "");
    }).catch(() => {
      m.current() && (y.error = "本机提醒读取失败。");
    }).finally(m.finish);
    const k = Je("detail");
    y.loading = !0;
    try {
      const x = await lt.api(`/tasks/${encodeURIComponent(a)}`, { signal: k.signal });
      if (x && k.current()) {
        const V = Et.get(a);
        y.title = V?.title ?? x.content ?? "", y.description = V?.description ?? x.description ?? "", y.priority = x.priority || 1;
        const $ = ve(x.due?.datetime || x.due?.date || "");
        y.dueDate = $.date, y.dueTime = $.time;
        const z = Ge(a, x.description || y.description), D = ve(z);
        y.startDate = D.date, y.startTime = D.time, y.labels = [...x.labels || []], y.url = x.url || "";
        try {
          const G = await lt.getComments(a, k.signal);
          if (G && k.current()) {
            const F = [], W = [];
            for (const O of G) {
              let T;
              if (O?.attachment?.file_url) {
                const I = O.attachment.file_name || "附件图片";
                F.push({ name: I, url: O.attachment.file_url }), T = { name: I, url: O.attachment.file_url };
              }
              W.push({
                id: O.id,
                content: O.content || "",
                postedAt: O.posted_at || "",
                attachment: T
              });
            }
            if (y.commentAttachments = F, y.comments = W, F.length > 0 && y.description) {
              let O = y.description, T = !1;
              for (const I of F) {
                const h = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                h.test(O) && (O = O.replace(h, `$1${I.url}$2`), T = !0);
              }
              if (T && !Et.has(a)) {
                y.description = O;
                for (const I of yt.columns) {
                  const h = I.tasks.find((R) => String(R.id) === a);
                  if (h) {
                    h.description = O, h._taskRaw && (h._taskRaw.description = O);
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
      k.current() && (y.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      k.current() && (y.loading = !1), k.finish();
    }
  },
  close() {
    re(), y.isOpen = !1, y.taskId = "";
  },
  async setStartDateAndTime(a, s) {
    if (!y.taskId) return;
    const d = Ut(), m = a.trim(), k = m ? s.trim() : "";
    y.startDate = m, y.startTime = k, ee();
    const x = jo(m, k);
    Wo(d.taskId, x), lt.invalidateWorkspaceSnapshots();
    for (const V of yt.columns) {
      const $ = V.tasks.find((z) => z.id === d.taskId);
      $ && ($.startDate = x);
    }
  },
  async setDueDateAndTime(a, s) {
    if (!y.taskId) return;
    const d = Ut(), m = a.trim(), k = m ? s.trim() : "";
    y.dueDate = m, y.dueTime = k, ee(), lt.invalidateWorkspaceSnapshots();
    const x = (ge.get(d.taskId) || 0) + 1;
    ge.set(d.taskId, x);
    const V = Qe.then(async () => {
      try {
        const $ = await lt.updateTask(d.taskId, {
          due_string: m ? k ? `${m} ${k}` : m : "no date"
        });
        if (ge.get(d.taskId) !== x) return;
        const z = lt.mapTasks([$], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const D of yt.columns) {
          const G = D.tasks.findIndex((W) => W.id === d.taskId);
          if (G < 0) continue;
          const F = D.tasks[G];
          if (Object.assign(F, {
            dueDate: z.dueDate,
            dueText: z.dueText,
            dueString: z.dueString,
            isDueToday: z.isDueToday,
            isOverdue: z.isOverdue,
            isRecurring: z.isRecurring
          }), F._taskRaw && (F._taskRaw.due = $.due), yt.view === "today") {
            const W = z.isOverdue ? "overdue" : z.isDueToday ? "today" : "";
            W !== D.sectionId && (D.tasks.splice(G, 1), yt.columns.find((O) => O.sectionId === W)?.tasks.push(F));
          }
        }
        d.current() && (y.error = "");
      } catch {
        d.current() && ge.get(d.taskId) === x && (y.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Qe = V.catch(() => {
    }), await V;
  },
  async saveTitleAndDesc(a, s, d = y.taskId) {
    const m = d === y.taskId ? Ut() : { taskId: d, current: () => !1 };
    if (!m.taskId || !a.trim()) return;
    const k = a.trim(), x = s.trim(), V = qe(d, k, x, "saving");
    m.current() && (y.title = k, y.description = x), Ze(m.taskId, k, x), fe++, y.saving = !0;
    const $ = Pe.then(async () => {
      try {
        await lt.updateTask(m.taskId, {
          content: k,
          description: x
        }), Et.get(d)?.revision === V && Et.delete(d), fe === 1 && Et.size === 0 && et.dispatch("refresh");
      } catch (z) {
        const D = Et.get(d);
        D?.revision === V && (D.status = "failed", D.error = z instanceof Error ? z.message : "保存未确认");
      } finally {
        fe--, y.saving = fe > 0;
      }
    });
    Pe = $.catch(() => {
    }), await $;
  },
  async attachImageToTask(a) {
    const s = Ut();
    if (await Pe, !s.current()) return;
    if (Et.has(s.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const d = y.description || "";
    if (!s.taskId || y.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    y.saving = !0;
    try {
      const m = a.name || `截图_${Date.now()}.png`;
      let k = "";
      try {
        const x = await lt.uploadFile(a, m);
        x && x.file_url && (k = x.file_url);
      } catch (x) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", x), a.size <= 2.5 * 1024 * 1024)
          k = await tn(a);
        else
          throw new Error(x?.message || "云端上传失败且文件超过2.5MB");
      }
      if (k) {
        const x = d ? `${d}

![${m}](${k})` : `![${m}](${k})`;
        await lt.updateTask(s.taskId, {
          description: x
        }), s.current() && (y.description = x);
        for (const V of yt.columns) {
          const $ = V.tasks.find((z) => String(z.id) === s.taskId);
          if ($) {
            $.description = x, $._taskRaw && ($._taskRaw.description = x);
            break;
          }
        }
        et.dispatch("refresh");
      }
    } catch (m) {
      s.current() && (y.error = m.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${m.message}`);
    } finally {
      y.saving = !1;
    }
  },
  async setPriority(a) {
    if (!y.taskId) return;
    const s = Ut();
    if (![1, 2, 3, 4].includes(a)) return;
    const d = y.priority;
    y.priority = a, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(s.taskId, { priority: a });
      for (const m of yt.columns) {
        const k = m.tasks.find((x) => x.id === s.taskId);
        k && (k.priority = a, k._taskRaw && (k._taskRaw.priority = a));
      }
    } catch {
      s.current() && (y.priority = d, y.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!y.taskId) return;
    const s = Ut(), d = [...y.labels], k = d.includes(a) ? d.filter((x) => x !== a) : [...d, a];
    y.labels = k, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(s.taskId, { labels: k });
      for (const x of yt.columns) {
        const V = x.tasks.find(($) => $.id === s.taskId);
        V && (V.labels = k, V._taskRaw && (V._taskRaw.labels = k));
      }
    } catch {
      s.current() && (y.labels = d, y.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const s = Ut();
    if (a = a.trim(), !(!s.taskId || !a))
      try {
        const d = await lt.getLabels();
        if (!s.current()) return;
        d.some((m) => m.name === a) || await lt.createLabel(a), s.current() && !y.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        s.current() && (y.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!y.taskId || !a.trim()) return;
    const s = Ut();
    try {
      const d = await lt.addComment({
        task_id: s.taskId,
        content: a.trim()
      });
      d && s.current() && y.comments.push({
        id: d.id || `c_${Date.now()}`,
        content: d.content || a.trim(),
        postedAt: d.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (d) {
      s.current() && (y.error = "发送评论失败：" + (d?.message || ""));
    }
  },
  async setReminder(a) {
    const s = Ut();
    if (s.taskId)
      try {
        await Jo(s.taskId, a, y.title), s.current() && (y.reminderTime = a, y.error = "");
      } catch (d) {
        s.current() && (y.error = d instanceof Error ? d.message : "提醒未保存，请重试。");
      }
  }
}, rt = xo(en, [
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
function ao(a, s, d) {
  let m = !1, k;
  const x = ct(
    () => [q.dataRevision, a(), q.pendingWrites],
    ([V, $, z], D) => {
      D && V !== D[0] && (m = !0, s()), k && clearTimeout(k), !(!m || !$ || z) && (k = setTimeout(() => {
        k = void 0, !(!a() || q.pendingWrites) && (m = !1, d());
      }, 150));
    }
  );
  jt(() => {
    x(), k && clearTimeout(k);
  });
}
const on = ["aria-label"], nn = { class: "todoist-cal-head" }, sn = { class: "todoist-cal-title-row" }, an = { class: "todoist-cal-logo" }, ln = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, rn = { class: "todoist-cal-head-actions" }, dn = { class: "todoist-cal-nav" }, cn = { class: "todoist-cal-nav-group" }, un = ["title"], pn = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, mn = ["title"], vn = { class: "todoist-cal-nav-group" }, fn = ["title"], gn = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, bn = ["title"], kn = { class: "todoist-cal-weekdays" }, yn = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, hn = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], wn = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Tn = { class: "todoist-cal-agenda" }, Dn = { class: "todoist-cal-agenda-head" }, xn = { class: "todoist-cal-agenda-title" }, Cn = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, _n = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, Sn = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, $n = ["disabled"], In = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, Pn = {
  key: 0,
  class: "todoist-cal-empty"
}, Rn = {
  key: 1,
  class: "todoist-cal-empty"
}, Ln = ["onClick"], On = { class: "todoist-cal-todo-main" }, En = ["disabled", "title", "onClick"], Mn = {
  key: 0,
  class: "check-icon"
}, An = {
  key: 0,
  class: "todoist-cal-task-time"
}, jn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, Wn = ["title", "onClick"], Un = ["src", "alt"], Vn = { class: "todoist-cal-thumb-tag" }, Bn = /* @__PURE__ */ Ht({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const s = Io;
    ao(
      () => q.active,
      () => ft.invalidateReads(),
      () => ft.loadTodosForDate(s.selectedDate, !0)
    ), jt(() => ft.cancelReads()), ct(() => [q.active, q.pendingWrites], ([T, I], h) => {
      if (!T || I) {
        ft.cancelReads();
        return;
      }
      ft.loadTodosForDate(s.selectedDate, !!h?.[1]);
    }, { immediate: !0, flush: "sync" });
    function d(T) {
      ft.toggleTodoItem(T);
    }
    function m(T) {
      rt.openTask(T.id, T);
    }
    oe(() => {
      $o.syncSidebarToVue();
    });
    function k() {
      ft.dispatch("today");
    }
    function x() {
      ft.dispatch("prev-month");
    }
    function V() {
      ft.dispatch("next-month");
    }
    function $() {
      ft.dispatch("prev-year");
    }
    function z() {
      ft.dispatch("next-year");
    }
    function D(T) {
      ft.dispatch("select-date", T);
    }
    function G(T, I) {
      ft.dispatch("context-date", {
        date: T,
        clientX: I.clientX,
        clientY: I.clientY
      });
    }
    function F(T, I) {
      const h = Array.from(I.dataTransfer?.types || []);
      (h.includes("application/x-todoist-task-id") || h.includes("text/plain")) && (I.preventDefault(), I.dataTransfer && (I.dataTransfer.dropEffect = "copy"));
    }
    function W(T) {
    }
    function O(T, I) {
      const h = I.dataTransfer?.getData("application/x-todoist-task-id") || I.dataTransfer?.getData("text/plain");
      h && (I.preventDefault(), I.stopPropagation(), ft.dispatch("drop-task", { taskId: h, date: T }));
    }
    return (T, I) => (r(), p("aside", {
      id: "todoist-calendar-sidebar",
      class: tt(["todoist-calendar-sidebar", { collapsed: e(s).collapsed }]),
      "aria-label": e(f)("todoist.calendar.sidebarLabel")
    }, [
      t("div", nn, [
        t("div", sn, [
          t("span", an, [
            I[1] || (I[1] = Vt("📅 ", -1)),
            t("strong", null, v(e(f)("todoist.calendar.title")), 1)
          ]),
          t("span", ln, v(e(s).badgeText), 1)
        ]),
        t("div", rn, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: k
          }, v(e(f)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", dn, [
        t("div", cn, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.prevMonth"),
            onClick: x
          }, "‹", 8, un),
          t("span", pn, v(e(s).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.nextMonth"),
            onClick: V
          }, "›", 8, mn)
        ]),
        t("div", vn, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.prevYear"),
            onClick: $
          }, "‹", 8, fn),
          t("span", gn, v(e(s).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.nextYear"),
            onClick: z
          }, "›", 8, bn)
        ])
      ]),
      t("div", kn, [
        t("span", null, v(e(f)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", yn, [
        (r(!0), p(at, null, dt(e(s).cells, (h) => (r(), p("button", {
          key: h.date,
          type: "button",
          class: tt(["todoist-cal-cell", {
            outside: h.isOutside,
            today: h.isToday,
            selected: h.isSelected
          }]),
          "data-date": h.date,
          role: "gridcell",
          title: h.title,
          onClick: (R) => D(h.date),
          onContextmenu: K((R) => G(h.date, R), ["prevent"]),
          onDragover: (R) => F(h.date, R),
          onDragleave: (R) => (h.date, void 0),
          onDrop: (R) => O(h.date, R)
        }, [
          t("span", null, v(h.dayNumber), 1),
          h.hasDot ? (r(), p("span", wn)) : C("", !0)
        ], 42, hn))), 128))
      ]),
      t("div", Tn, [
        t("div", Dn, [
          t("strong", xn, v(e(s).agendaTitle), 1),
          t("span", Cn, v(e(f)("todoist.calendar.itemCount", { count: e(s).todoItems.length })), 1)
        ]),
        e(s).writeError ? (r(), p("p", _n, v(e(s).writeError), 1)) : C("", !0),
        e(s).emptyText ? (r(), p("div", Sn, [
          Vt(v(e(s).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(s).todoLoading || e(q).pendingWrites > 0,
            onClick: I[0] || (I[0] = (h) => e(ft).loadTodosForDate(e(s).selectedDate, !0))
          }, v(e(f)("todoist.calendar.retryLoad")), 9, $n)
        ])) : C("", !0),
        t("div", In, [
          e(s).todoLoading && !e(s).todoItems.length ? (r(), p("div", Pn, v(e(f)("todoist.calendar.loading")), 1)) : e(s).todoItems.length === 0 && !e(s).emptyText ? (r(), p("div", Rn, v(e(f)("todoist.calendar.emptyDay")), 1)) : (r(!0), p(at, { key: 2 }, dt(e(s).todoItems, (h) => (r(), p("div", {
            key: h.id,
            class: tt(["todoist-cal-todo-card", { completed: h.completed }]),
            onClick: (R) => m(h)
          }, [
            t("div", On, [
              t("button", {
                type: "button",
                class: tt(["todoist-cal-check", { checked: h.completed }]),
                disabled: e(q).pendingWrites > 0,
                title: h.completed ? e(f)("todoist.calendar.clickToReopen") : e(f)("todoist.calendar.clickToComplete"),
                onClick: K((R) => d(h), ["stop"])
              }, [
                h.completed ? (r(), p("span", Mn, "✓")) : C("", !0)
              ], 10, En),
              t("span", {
                class: tt(["todoist-cal-todo-title", { strike: h.completed }])
              }, v(h.content), 3),
              h.time ? (r(), p("small", An, v(h.time), 1)) : C("", !0),
              h.completed ? (r(), p("span", jn, v(e(f)("todoist.calendar.completedTag")), 1)) : C("", !0)
            ]),
            h.thumbUrl ? (r(), p("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(f)("todoist.calendar.viewPhoto"),
              onClick: K((R) => e(Ee).open(h.thumbUrl, h.content), ["stop"])
            }, [
              t("img", {
                src: h.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(f)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, Un),
              t("span", Vn, v(e(f)("todoist.calendar.photoTag")), 1)
            ], 8, Wn)) : C("", !0)
          ], 10, Ln))), 128))
        ])
      ])
    ], 10, on));
  }
}), Nn = /* @__PURE__ */ ne(Bn, [["__scopeId", "data-v-6c1a5887"]]);
function Hn(a) {
  const s = a.state, d = M(null), m = M(null), k = M(null), x = M(!1), V = eo(null), $ = M(), z = /* @__PURE__ */ new Map();
  function D(l) {
    z.clear();
    const U = l.closest(".todoist-board");
    if (U)
      for (const _ of U.querySelectorAll(".todoist-board-list")) {
        const A = s.columns[Number(_.dataset.groupIndex)];
        if (!A) continue;
        const Y = _.__todoistSlots;
        if (!Y) continue;
        const nt = Y(), bt = nt.filter((vt) => vt.id !== R?.id);
        z.set(A, { list: _, rows: bt, read: Y, snapshot: nt });
      }
  }
  let G = 0, F;
  function W(l, U) {
    F = { clientY: l.clientY, col: U }, !G && (G = requestAnimationFrame(() => {
      G = 0;
      const _ = F;
      F = void 0, _ && O(_, _.col);
    }));
  }
  function O(l, U) {
    if (!R || s.movingTaskId) return;
    const _ = z.get(U);
    if (!_) return;
    const A = _.read();
    A !== _.snapshot && (_.snapshot = A, _.rows = A.filter((it) => it.id !== R?.id));
    const Y = l.clientY - _.list.getBoundingClientRect().top + _.list.scrollTop;
    let nt = 0, bt = _.rows.length;
    for (; nt < bt; ) {
      const it = nt + bt >>> 1;
      Y < _.rows[it].middle ? bt = it : nt = it + 1;
    }
    let vt = nt;
    if (m.value === s.columns.indexOf(U)) {
      const it = $.value ? _.rows.findIndex((Ct) => Ct.id === $.value) : _.rows.length;
      it >= 0 && vt > it && Y < _.rows[it].middle + 10 && (vt = it), it > 0 && vt < it && Y > _.rows[it - 1].middle - 10 && (vt = it);
    }
    const pt = _.rows[vt]?.id;
    h(U, pt), m.value === s.columns.indexOf(U) && (k.value = pt || _.rows[_.rows.length - 1]?.id || null, x.value = !pt);
  }
  function T(l) {
    return l === V.value;
  }
  function I(l, U) {
    if (U !== m.value || !V.value) return l.tasks;
    const _ = [...l.tasks], A = $.value ? _.findIndex((Y) => Y.id === $.value) : -1;
    return _.splice(A < 0 ? _.length : A, 0, V.value), _;
  }
  function h(l, U) {
    if (!R || !B) return;
    if (s.view === "today" && l.sectionId === "overdue" && B.sectionId !== "overdue") {
      m.value = null;
      return;
    }
    const _ = U ? l.tasks.find((nt) => nt.id === U) : void 0, A = l === B ? String(R._taskRaw?.parent_id || "") : "";
    if (_ && s.view !== "today" && String(_._taskRaw?.parent_id || "") !== A) {
      m.value = null;
      return;
    }
    const Y = s.columns.indexOf(l);
    Y < 0 || ($.value = U, m.value = Y);
  }
  let R = null, B = null;
  function X(l, U, _, A) {
    if (!a.isActive() || s.loading || s.movingTaskId || s.moveNeedsRefresh || U.completed || U.id.startsWith("optimistic-") || a.editingTaskId() === U.id) {
      l.preventDefault();
      return;
    }
    if (l.stopPropagation(), a.closePopovers(), d.value = U.id, R = U, B = _, V.value = { ...U }, D(l.currentTarget), l.dataTransfer) {
      l.dataTransfer.effectAllowed = "move";
      const Y = l.currentTarget, nt = Y.getBoundingClientRect();
      l.dataTransfer.setDragImage(
        Y,
        Math.max(0, Math.min(nt.width, l.clientX - nt.left)),
        Math.max(0, Math.min(nt.height, l.clientY - nt.top))
      ), l.dataTransfer.clearData(), l.dataTransfer.setData("application/x-todoist-task-id", U.id), l.dataTransfer.setData("application/x-logicweaver-todoist-task", U.id), l.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: U.id, sectionId: _.sectionId }));
    }
  }
  function Q() {
    cancelAnimationFrame(G), G = 0, F = void 0, d.value = null, m.value = null, k.value = null, x.value = !1, R = null, B = null, V.value = null, $.value = void 0, z.clear();
  }
  function H(l, U) {
    !R || s.movingTaskId || (l.preventDefault(), l.stopPropagation(), l.dataTransfer && (l.dataTransfer.dropEffect = "move"), W(l, s.columns[U]));
  }
  function L(l, U) {
    l.currentTarget?.contains(l.relatedTarget);
  }
  function J(l, U, _, A) {
    l.dataTransfer && (l.dataTransfer.dropEffect = "move"), W(l, _);
  }
  async function ut(l, U) {
    F && F.col === l && (O(F, F.col), U = $.value);
    const _ = R, A = B;
    Q(), !(!_ || !A || !a.isActive() || s.movingTaskId) && (s.view === "today" ? l.sectionId === "today" && A.sectionId !== "today" ? await a.moveTask(_.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, U) : await a.moveTask(_.id, { sectionId: l.sectionId }, U) : await a.moveTask(_.id, {
      projectId: l.projectId,
      sectionId: l.sectionId
    }, U));
  }
  async function P(l, U, _, A) {
    l.preventDefault();
    const Y = l.dataTransfer?.getData("application/x-todoist-label") || (l.dataTransfer?.getData("text/plain")?.startsWith("label:") ? l.dataTransfer.getData("text/plain").slice(6) : "");
    if (Y) {
      a.dropLabel(U, Y);
      return;
    }
    if (m.value === s.columns.indexOf(_)) {
      await ut(_, $.value);
      return;
    }
    const nt = l.currentTarget.getBoundingClientRect(), bt = l.clientY >= nt.top + nt.height / 2, vt = _.tasks.filter((Ct) => Ct.id !== R?.id), pt = vt.findIndex((Ct) => Ct.id === U.id), it = U.id === R?.id ? U.id : bt ? vt[pt + 1]?.id : U.id;
    await ut(_, it);
  }
  async function ht(l, U) {
    l.preventDefault(), l.stopPropagation(), await ut(U, m.value === s.columns.indexOf(U) ? $.value : void 0);
  }
  return ct(() => [s.view, s.activeProjectId], () => Q()), ct(() => s.columns, (l) => {
    B && !l.includes(B) && Q();
  }), ct(a.isActive, (l) => {
    l || Q();
  }, { immediate: !0, flush: "sync" }), jt(Q), {
    draggingTaskId: d,
    dragOverColIndex: m,
    dragOverTaskId: k,
    dragAfterTask: x,
    isDragPreview: T,
    previewTasks: I,
    onTaskDragStart: X,
    onTaskDragEnd: Q,
    onColDragOver: H,
    onColDragLeave: L,
    onTaskDragOver: J,
    onTaskDrop: P,
    onColDrop: ht
  };
}
const zn = ["data-row-key"], Fn = /* @__PURE__ */ Ht({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const s = a, d = M(null), m = /* @__PURE__ */ new Map(), k = M(0), x = eo({ top: 0, height: 600 }), V = (h) => s.isPreview(h) ? `preview:${h.id}` : h.id, $ = ot(() => {
      k.value;
      const h = [0];
      for (const R of s.tasks) {
        const B = R.id === s.hiddenId && !s.isPreview(R) ? 0 : m.get(V(R)) || m.get(R.id) || 110;
        h.push(h[h.length - 1] + B);
      }
      return h;
    }), z = ot(() => {
      k.value;
      let h = 0;
      return s.tasks.filter((R) => !s.isPreview(R)).map((R) => {
        const B = m.get(R.id) || 110, X = { id: R.id, middle: h + B / 2 };
        return h += B, X;
      });
    });
    function D(h) {
      const R = $.value;
      let B = 0, X = s.tasks.length;
      for (; B < X; ) {
        const Q = B + X >>> 1;
        R[Q + 1] < h ? B = Q + 1 : X = Q;
      }
      return B;
    }
    const G = ot(() => {
      const h = Math.max(0, D(x.value.top) - 5), R = Math.min(s.tasks.length, D(x.value.top + x.value.height) + 6), B = /* @__PURE__ */ new Set();
      for (let X = h; X < R; X++) B.add(X);
      if (s.pinnedId) {
        const X = s.tasks.findIndex((Q) => Q.id === s.pinnedId && !s.isPreview(Q));
        X >= 0 && B.add(X);
      }
      return [...B].sort((X, Q) => X - Q).map((X) => ({ task: s.tasks[X], index: X, top: $.value[X] }));
    });
    let F = 0;
    function W() {
      F || (F = requestAnimationFrame(() => {
        F = 0, d.value && (x.value = { top: d.value.scrollTop, height: d.value.clientHeight });
      }));
    }
    let O;
    const T = /* @__PURE__ */ new Map();
    function I(h, R) {
      const B = T.get(R);
      B !== h && (B && O?.unobserve(B), h instanceof HTMLElement ? (T.set(R, h), O?.observe(h)) : T.delete(R));
    }
    return ct(() => s.tasks, () => {
      const h = new Set(s.tasks.map(V));
      for (const R of m.keys()) h.has(R) || m.delete(R);
      Lt(W);
    }), oe(() => {
      O = new ResizeObserver((h) => {
        let R = !1;
        const B = D(d.value?.scrollTop || 0), X = $.value[B] || 0;
        for (const Q of h) {
          const H = Q.target;
          if (H === d.value) {
            W();
            continue;
          }
          const L = H.dataset.rowKey, J = Q.borderBoxSize?.[0]?.blockSize || Q.contentRect.height;
          L && J > 0 && Math.abs((m.get(L) || 0) - J) > 0.5 && (m.set(L, J), R = !0);
        }
        if (R) {
          k.value++;
          const Q = ($.value[B] || 0) - X;
          d.value && Q && !s.pinnedId && (d.value.scrollTop += Q), W();
        }
      }), d.value && (O.observe(d.value), d.value.__todoistSlots = () => z.value);
      for (const h of T.values()) O.observe(h);
      W();
    }), jt(() => {
      O?.disconnect(), cancelAnimationFrame(F), d.value && delete d.value.__todoistSlots, T.clear(), m.clear();
    }), (h, R) => (r(), p("div", {
      ref_key: "root",
      ref: d,
      onScrollPassive: W
    }, [
      a.tasks.length ? (r(), p("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: gt({ height: `${$.value[$.value.length - 1]}px` })
      }, [
        (r(!0), p(at, null, dt(G.value, (B) => (r(), p("div", {
          key: V(B.task),
          ref_for: !0,
          ref: (X) => I(X, V(B.task)),
          "data-row-key": V(B.task),
          class: "virtual-task-row",
          style: gt({ transform: `translateY(${B.top}px)` })
        }, [
          ze(h.$slots, "default", {
            task: B.task,
            index: B.index
          }, void 0, !0)
        ], 12, zn))), 128))
      ], 4)) : ze(h.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), Kn = /* @__PURE__ */ ne(Fn, [["__scopeId", "data-v-b7076778"]]), Yn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Gn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, Xn = {
  key: 2,
  class: "todoist-empty"
}, qn = {
  key: 3,
  class: "todoist-empty"
}, Qn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Jn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, Zn = { class: "todoist-projects-toolbar-inner" }, ts = { class: "todoist-project-tabs-scroll" }, es = ["onClick"], os = { class: "todoist-project-tab-name" }, ns = {
  key: 0,
  class: "todoist-project-actions-group"
}, ss = ["title"], is = { class: "action-text" }, as = ["title"], ls = { class: "action-text" }, rs = { class: "todoist-board" }, ds = ["data-section-id", "data-title", "data-column-index"], cs = { class: "todoist-board-column-head" }, us = ["title", "onClick"], ps = ["onClick"], ms = ["onSubmit"], vs = ["onKeydown"], fs = { class: "date-hint-left" }, gs = { class: "date-hint-badge" }, bs = { class: "date-hint-sub" }, ks = {
  key: 0,
  class: "date-hint-preview"
}, ys = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, hs = {
  key: 1,
  class: "todoist-composer-images"
}, ws = ["src"], Ts = { class: "todoist-composer-img-name" }, Ds = {
  key: 0,
  class: "todoist-composer-img-status"
}, xs = ["onClick"], Cs = { class: "todoist-inline-actions" }, _s = ["disabled"], Ss = ["disabled"], $s = {
  key: 0,
  class: "todoist-column-empty"
}, Is = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Ps = ["disabled", "title", "aria-label", "onClick"], Rs = { class: "todoist-board-task-main" }, Ls = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Os = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Es = ["title", "onClick"], Ms = { class: "repo-badge-name" }, As = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, js = ["title", "onClick"], Ws = { class: "repo-badge-name" }, Us = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Vs = ["title", "onClick"], Bs = { class: "repo-badge-name" }, Ns = ["onKeydown", "onBlur"], Hs = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, zs = {
  key: 6,
  class: "todoist-board-task-description"
}, Fs = {
  key: 7,
  class: "todoist-board-task-meta"
}, Ks = ["title"], Ys = ["title"], Gs = ["title"], Xs = ["title"], qs = {
  key: 4,
  class: "todoist-board-extra"
}, Qs = ["onClick"], Js = ["src"], Zs = {
  key: 0,
  class: "todoist-board-add-column"
}, ti = {
  key: 1,
  class: "todoist-add-section-form"
}, ei = ["onKeydown"], oi = { class: "todoist-add-section-actions" }, ni = { class: "section-menu-text" }, si = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, ii = ["disabled"], ai = ["disabled"], li = {
  key: 1,
  class: "todoist-section-menu-divider"
}, ri = { class: "section-menu-text" }, di = { class: "todoist-task-menu-header" }, ci = { class: "todoist-task-menu-title" }, ui = { class: "todoist-menu-text" }, pi = { class: "todoist-menu-badge" }, mi = {
  key: 0,
  class: "todoist-labels-panel"
}, vi = { class: "todoist-labels-quick-input" }, fi = ["placeholder", "onKeydown"], gi = { class: "todoist-labels-chip-grid" }, bi = ["onClick"], ki = {
  key: 0,
  class: "chip-check"
}, yi = { class: "todoist-menu-text" }, hi = {
  key: 1,
  class: "todoist-recur-panel"
}, wi = { class: "todoist-recur-grid" }, Ti = ["onClick"], Di = { class: "todoist-recur-custom-row" }, xi = ["onKeydown"], Ci = { class: "todoist-menu-text" }, _i = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Si = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, $i = {
  key: 2,
  class: "todoist-color-panel"
}, Ii = { class: "todoist-color-grid" }, Pi = ["title", "onClick"], Ri = { class: "todoist-color-name" }, Li = { class: "todoist-menu-text" }, Oi = ["disabled", "onClick"], Ei = { class: "todoist-project-flyout-name" }, Mi = {
  key: 0,
  class: "todoist-menu-badge"
}, Ai = { class: "todoist-menu-text" }, ji = { class: "todoist-dialog-title" }, Wi = ["title"], Ui = { class: "todoist-dialog-body" }, Vi = {
  key: 0,
  class: "todoist-dialog-desc"
}, Bi = ["placeholder", "onKeydown"], Ni = { class: "todoist-dialog-foot" }, Hi = { class: "todoist-dialog-icon" }, zi = { class: "todoist-dialog-title" }, Fi = ["title"], Ki = { class: "todoist-dialog-body" }, Yi = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, Gi = { class: "todoist-dialog-danger-text" }, Xi = { class: "todoist-dialog-msg" }, qi = { class: "todoist-dialog-foot" }, Qi = /* @__PURE__ */ Ht({
  __name: "TodoistTaskList",
  setup(a) {
    const s = M(0);
    function d() {
      s.value++;
    }
    oe(() => {
      window.addEventListener("storage", d), window.addEventListener("todoist-repository-links-changed", d), window.addEventListener("todoist-bili-links-changed", d), window.addEventListener("todoist-web-links-changed", d);
    }), jt(() => {
      window.removeEventListener("storage", d), window.removeEventListener("todoist-repository-links-changed", d), window.removeEventListener("todoist-bili-links-changed", d), window.removeEventListener("todoist-web-links-changed", d);
    });
    function m(n, o) {
      return s.value, no(n, o);
    }
    function k(n, o, i) {
      return s.value, Bo(n, o, i);
    }
    function x(n, o, i) {
      return s.value, No(n, o, i);
    }
    function V(n) {
      n && window.open(n, "_blank", "noopener,noreferrer");
    }
    function $(n) {
      Mo.openVideo({
        bvid: n.bvid,
        aid: n.aid ? String(n.aid) : void 0,
        title: n.title,
        author: n.author,
        cover: n.cover,
        url: n.url
      });
    }
    function z(n) {
      so.open(n);
    }
    const D = yt, G = M(""), F = M(null), W = M(""), O = M(!1), T = ot(() => W.value ? Uo(W.value) : null), I = M([]);
    function h(n) {
      const o = n.clipboardData?.items;
      if (o)
        for (let i = 0; i < o.length; i++) {
          const E = o[i];
          if (E.type.indexOf("image") !== -1) {
            n.preventDefault();
            const c = E.getAsFile();
            if (!c) continue;
            const st = URL.createObjectURL(c), N = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: c,
              previewUrl: st,
              name: `截图_${N}.png`,
              uploading: !1
            };
            I.value.push(Dt);
          }
        }
    }
    function R(n) {
      const o = I.value.splice(n, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const B = M(null), X = M(""), Q = M(null), H = Zt({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), L = Zt({
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
    }), J = M(null), ut = M(null), P = Zt({
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
    }), ht = M(null), l = Zt({
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
    }), U = M(null), _ = M(null), A = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], Y = [
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
    ], nt = ot(() => String(l.task?._taskRaw?.project_id || l.col?.projectId || "")), bt = ot(() => D.view !== "projects" ? null : D.projects.find((n) => String(n.id) === String(D.activeProjectId)) || D.projects[0] || null), vt = ot(() => {
      const n = new Set(D.availableLabels || []);
      return l.task?.labels && l.task.labels.forEach((o) => n.add(o)), Array.from(n);
    }), pt = ot(() => {
      const n = l.task?.customColorHex;
      return n && A.find((i) => i.hex.toLowerCase() === n.toLowerCase()) || A[0];
    });
    function it(n, o) {
      return n.sectionId || n.title || String(o);
    }
    function Ct() {
      return `${D.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function Bt(n) {
      return n.startDate || n.dueText || n.labels && n.labels.length > 0 || n.timedDeadlineText || n.extraCountText;
    }
    function wt() {
      H.isOpen = !1, l.isOpen = !1, l.activeSubpanel = null;
    }
    const {
      draggingTaskId: It,
      dragOverColIndex: Pt,
      dragOverTaskId: qt,
      dragAfterTask: zt,
      isDragPreview: _t,
      previewTasks: Nt,
      onTaskDragStart: j,
      onTaskDragEnd: u,
      onColDragOver: g,
      onColDragLeave: Z,
      onTaskDragOver: Rt,
      onTaskDrop: Wt,
      onColDrop: be
    } = Hn({
      state: D,
      isActive: () => q.active,
      editingTaskId: () => B.value,
      closePopovers: wt,
      moveTask: (n, o, i) => et.moveTask(n, o, i),
      dropLabel: (n, o) => {
        n.labels || (n.labels = []), n.labels.includes(o) || (n.labels.push(o), lt.getToken() && lt.updateTask(n.id, { labels: n.labels }));
      }
    });
    function ke(n, o) {
      et.dispatch("toggle-task", { task: n, group: o });
    }
    function ye(n, o) {
      if (n.completed) return;
      const i = o.target;
      i && i.closest("button,input,textarea,select,a") || he(n);
    }
    function he(n) {
      D.movingTaskId !== n.id && (B.value = n.id, X.value = n.content, Lt(() => {
        Q.value && (Q.value.focus(), Q.value.select());
      }));
    }
    function se(n, o) {
      if (B.value !== n.id) return;
      const i = X.value.trim();
      B.value = null, o && i && i !== n.content && (n.content = i, et.dispatch("update-task-title", {
        taskId: n.id,
        content: i,
        task: n,
        newContent: i
      }));
    }
    function ie(n, o) {
      n.key === "Enter" ? n.shiftKey || (n.preventDefault(), se(o, !0)) : n.key === "Escape" && (n.preventDefault(), n.stopPropagation(), se(o, !1));
    }
    function Ft(n, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(n.id, n);
    }
    function we(n, o, i) {
      const E = i.currentTarget;
      F.value = it(n, o), W.value = "", O.value = !1, Lt(() => {
        E.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function Qt() {
      w.value || ae();
    }
    function ae() {
      F.value = null, W.value = "", O.value = !1;
      for (const n of I.value)
        try {
          URL.revokeObjectURL(n.previewUrl);
        } catch {
        }
      I.value = [];
    }
    const w = M(!1), b = /* @__PURE__ */ new WeakMap();
    function S(n) {
      const o = n.description || n._taskRaw?.description || "", i = b.get(n);
      if (i && i.source === o) return i;
      const E = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: o,
        thumb: E,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return b.set(n, c), c;
    }
    function mt(n) {
      return S(n).text;
    }
    function Tt(n) {
      return S(n).thumb;
    }
    function kt(n, o) {
      n && Ee.open(n, o?.content || "任务照片");
    }
    async function Kt(n) {
      if (!q.active || w.value) return;
      const o = [...I.value];
      let E = W.value.trim() || o[0]?.name || "";
      if (!E) return;
      let c, st, N;
      if (T.value && !O.value) {
        const Ot = T.value;
        E = Ot.cleanTitle || E, c = Ot.date, st = Ot.label + (Ot.time ? ` ${Ot.time}` : ""), N = Ot.time ? `${Ot.date} ${Ot.time}` : Ot.date;
      }
      const Dt = F.value, Yt = W.value, St = D.view, Ce = n.projectId || St === "projects" && D.activeProjectId || void 0, _e = n.sectionId !== void 0 ? n.sectionId : void 0;
      w.value = !0;
      try {
        await Co(async () => {
          for (const xt of o)
            if (!xt.uploadedUrl) {
              xt.uploading = !0;
              try {
                const Se = await lt.uploadFile(xt.file, xt.name);
                xt.uploadedUrl = Se.file_url;
              } catch {
                xt.uploadedUrl = xt.previewUrl;
              } finally {
                xt.uploading = !1;
              }
            }
          await et.dispatch("add-task-submit", {
            content: E,
            view: St,
            group: n,
            projectId: Ce,
            sectionId: _e,
            dueDate: c,
            dueText: st,
            dueString: N,
            attachments: o.map((xt) => ({ file_url: xt.uploadedUrl, file_name: xt.name, file_type: xt.file.type || "image/png" }))
          }) && Dt === F.value && Yt === W.value && o.length === I.value.length && o.every((xt, Se) => xt === I.value[Se]) && ae();
        });
      } catch {
        D.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        w.value = !1;
      }
    }
    function lo(n, o) {
      n.key === "Enter" && !n.shiftKey ? (n.preventDefault(), Kt(o)) : n.key === "Escape" && (n.preventDefault(), Qt());
    }
    function Me() {
      const n = G.value.trim();
      if (!n) return;
      const i = D.columns.find((E) => E.projectId)?.projectId || D.activeProjectId || void 0;
      et.dispatch("add-section-submit", { name: n, projectId: i }), Te();
    }
    function Te() {
      D.addingSection = !1, G.value = "";
    }
    function ro(n, o, i) {
      if (H.isOpen && H.col === n) {
        H.isOpen = !1;
        return;
      }
      l.isOpen = !1;
      const c = i.currentTarget.getBoundingClientRect(), N = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      H.col = n, H.x = N, H.y = Dt, H.canMoveLeft = o > 0 && !!D.columns[o - 1]?.sectionId, H.canMoveRight = o < D.columns.length - 1 && !!D.columns[o + 1]?.sectionId, H.isOpen = !0;
    }
    function Ae(n, o) {
      H.isOpen = !1, et.dispatch("move-section", { sectionId: n.sectionId, direction: o });
    }
    function je(n, o, i) {
      if (D.movingTaskId === n.id || n.completed) return;
      H.isOpen = !1;
      const E = 236, c = 340, st = Math.max(8, Math.min(window.innerWidth - E - 8, i.clientX)), N = Math.max(8, Math.min(window.innerHeight - c - 8, i.clientY));
      if (l.task = n, l.col = o, l.x = st, l.y = N, l.activeSubpanel = null, l.descText = n.description || "", l.isSavingDesc = !1, l.newLabelText = "", l.customRecurText = "", n.dueDate) {
        const St = /* @__PURE__ */ new Date(`${n.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(St.getTime()) && (l.calYear = St.getFullYear(), l.calMonth = St.getMonth());
      } else {
        const St = /* @__PURE__ */ new Date();
        l.calYear = St.getFullYear(), l.calMonth = St.getMonth();
      }
      const Dt = 252, Yt = st + E + Dt > window.innerWidth - 8;
      l.flyoutOpenLeft = Yt, l.flyoutStyle = {
        left: Yt ? `${-Dt - 6}px` : `${E + 6}px`,
        top: "0px"
      }, l.isOpen = !0;
    }
    function ue(n) {
      l.activeSubpanel === n ? l.activeSubpanel = null : (l.activeSubpanel = n, n === "desc" ? Lt(() => {
        U.value?.focus(), U.value?.select();
      }) : n === "labels" && Lt(() => {
        _.value?.focus();
      }));
    }
    function We(n) {
      return !!l.task?.labels?.includes(n);
    }
    function co(n) {
      if (!l.task) return;
      const o = l.task.id, i = [...l.task.labels || []], E = i.includes(n) ? i.filter((c) => c !== n) : [...i, n];
      l.task.labels = E, et.dispatch("update-task-labels", { taskId: o, labels: E });
    }
    function Ue() {
      if (!l.task) return;
      const n = l.newLabelText.trim();
      if (!n) return;
      l.newLabelText = "";
      const o = l.task.id, i = [...l.task.labels || []];
      i.includes(n) || (i.push(n), l.task.labels = i, et.dispatch("update-task-labels", { taskId: o, labels: i })), wt();
    }
    function uo(n) {
      return String(l.task?.dueString || "").toLowerCase().includes(n.toLowerCase());
    }
    function po(n, o) {
      if (!l.task) return;
      const i = l.task.id;
      et.dispatch("update-task-recurring", { taskId: i, rule: n, label: o }), wt();
    }
    function Ve() {
      if (!l.task) return;
      const n = l.customRecurText.trim();
      if (!n) return;
      const o = l.task.id;
      et.dispatch("update-task-recurring", { taskId: o, rule: n, label: n }), wt();
    }
    function mo() {
      if (!l.task) return;
      const n = l.task.id;
      et.dispatch("clear-task-recurring", { taskId: n }), wt();
    }
    function vo(n) {
      if (!l.task) return;
      const o = l.task.id, i = A.find((E) => E.id === n);
      l.task.customColorHex = i?.hex || "", et.dispatch("update-task-color", { taskId: o, colorId: n }), wt();
    }
    function fo(n) {
      if (!l.task) return;
      const o = l.task.id;
      et.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: n.id,
        targetProjectName: n.name
      }), wt();
    }
    function go() {
      if (!l.task) return;
      const n = l.task, o = { x: l.x, y: l.y };
      wt();
      const i = Jt(o, 380, 220);
      P.x = i.x, P.y = i.y, n.isRecurring ? (P.title = "删除重复任务确认", P.icon = "⚠️", P.danger = !0, P.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", P.message = `任务内容：${n.content}
循环规则：${n.dueString || "循环任务"}`, P.confirmText = "删除重复任务", P.actionType = "delete-task", P.payload = { taskId: n.id, isRecurring: !0 }, P.isOpen = !0) : (P.title = "删除任务确认", P.icon = "🗑️", P.danger = !0, P.alertText = `确定要删除任务「${n.content}」吗？`, P.message = "此操作不可撤销。", P.confirmText = "确认删除", P.actionType = "delete-task", P.payload = { taskId: n.id, isRecurring: !1 }, P.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(n, o, i) {
      je(n, o, i);
    });
    function Jt(n, o = 380, i = 220) {
      let E = null;
      if (n instanceof HTMLElement)
        E = n.getBoundingClientRect();
      else if (n && "currentTarget" in n && n.currentTarget instanceof HTMLElement)
        E = n.currentTarget.getBoundingClientRect();
      else if (n && "target" in n && n.target instanceof HTMLElement)
        E = (n.target.closest("button") || n.target).getBoundingClientRect();
      else if (n && "x" in n && "y" in n && typeof n.x == "number" && typeof n.y == "number") {
        const c = Math.max(16, Math.min(window.innerWidth - o - 16, n.x)), st = Math.max(16, Math.min(window.innerHeight - i - 16, n.y + 10));
        return { x: c, y: st };
      }
      if (E) {
        let c = E.right - o;
        c < 16 && (c = Math.max(16, E.left)), c = Math.max(16, Math.min(window.innerWidth - o - 16, c));
        let st = E.bottom + 8;
        return st + i > window.innerHeight - 16 && E.top > i + 16 && (st = E.top - i - 8), st = Math.max(16, Math.min(window.innerHeight - i - 16, st)), { x: c, y: st };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - i) / 3))
      };
    }
    function Be(n, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const i = o.clientX, E = o.clientY, c = n === "prompt" ? L : P, st = c.x, N = c.y, Dt = (St) => {
        const Ce = St.clientX - i, _e = St.clientY - E;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, st + Ce)), c.y = Math.max(10, Math.min(window.innerHeight - 120, N + _e));
      }, Yt = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Yt);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Yt);
    }
    function Ne(n) {
      const o = Jt(n, 380, 220);
      L.x = o.x, L.y = o.y, L.title = f("todoist.newProject"), L.message = f("todoist.inputProjectPlaceholder"), L.value = "", L.placeholder = f("todoist.inputProjectPlaceholder"), L.confirmText = f("common.confirm"), L.actionType = "create-project", L.payload = null, L.isOpen = !0, Lt(() => J.value?.focus());
    }
    function bo(n, o) {
      const i = Jt(o, 380, 220);
      L.x = i.x, L.y = i.y, L.title = f("todoist.renameProject"), L.message = n.name, L.value = n.name, L.placeholder = f("todoist.inputProjectPlaceholder"), L.confirmText = f("common.save"), L.actionType = "rename-project", L.payload = { projectId: n.id }, L.isOpen = !0, Lt(() => {
        J.value?.focus(), J.value?.select();
      });
    }
    function ko(n, o) {
      const i = o || { x: H.x, y: H.y };
      H.isOpen = !1;
      const E = Jt(i, 380, 220);
      L.x = E.x, L.y = E.y, L.title = f("todoist.renameSection"), L.message = n.title, L.value = n.title, L.placeholder = f("todoist.inputSectionPlaceholder"), L.confirmText = f("common.save"), L.actionType = "rename-section", L.payload = { sectionId: n.sectionId }, L.isOpen = !0, Lt(() => {
        J.value?.focus(), J.value?.select();
      });
    }
    function le() {
      L.isOpen = !1;
    }
    function He() {
      const n = L.value.trim();
      if (!n) return;
      const { actionType: o, payload: i } = L;
      le(), o === "create-project" ? et.dispatch("create-project-submit", n) : o === "rename-project" && i && "projectId" in i ? et.dispatch("rename-project-submit", { projectId: i.projectId, newName: n }) : o === "rename-section" && i && "sectionId" in i && et.dispatch("rename-section", { sectionId: i.sectionId, newName: n });
    }
    function yo(n, o) {
      const i = Jt(o, 380, 240);
      P.x = i.x, P.y = i.y, P.title = f("todoist.deleteProjectConfirm"), P.icon = "🗑️", P.danger = !0, P.alertText = f("todoist.deleteProjectAlert", { name: n.name }), P.message = f("todoist.deleteProjectWarning"), P.confirmText = f("common.deletePermanently"), P.actionType = "delete-project", P.payload = { projectId: n.id }, P.isOpen = !0;
    }
    function ho(n, o) {
      const i = o || { x: H.x, y: H.y };
      H.isOpen = !1;
      const E = Jt(i, 380, 240);
      P.x = E.x, P.y = E.y, P.title = f("todoist.deleteSectionConfirm"), P.icon = "🗑️", P.danger = !0, P.alertText = f("todoist.deleteSectionAlert", { name: n.title }), P.message = f("todoist.deleteSectionWarning"), P.confirmText = f("todoist.deleteSection"), P.actionType = "delete-section", P.payload = { sectionId: n.sectionId }, P.isOpen = !0;
    }
    function pe() {
      P.isOpen = !1;
    }
    function wo() {
      const { actionType: n, payload: o } = P;
      pe(), n === "delete-project" && o && "projectId" in o ? et.dispatch("delete-project-submit", o.projectId) : n === "delete-section" && o && "sectionId" in o ? et.dispatch("delete-section", { sectionId: o.sectionId }) : n === "delete-task" && o && "taskId" in o && et.dispatch("delete-task-submit", o);
    }
    function To(n) {
      et.dispatch("switch-project", n);
    }
    function De(n) {
      n.key === "Escape" && (L.isOpen && le(), P.isOpen && pe(), l.isOpen && (l.isOpen = !1, l.activeSubpanel = null), H.isOpen && (H.isOpen = !1));
    }
    function xe(n) {
      const o = n.target;
      o && (L.isOpen && ut.value && !ut.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && le(), P.isOpen && ht.value && !ht.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && pe());
    }
    return ct(() => q.active, (n) => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", xe), n && (document.addEventListener("keydown", De), window.addEventListener("pointerdown", xe));
    }, { immediate: !0, flush: "sync" }), jt(() => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", xe), ae();
    }), (n, o) => (r(), p("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: wt
    }, [
      e(D).moveError && e(D).moveMessage ? (r(), p("p", Yn, v(e(D).moveMessage), 1)) : C("", !0),
      e(D).emptyText && e(D).columns.length > 0 && !e(D).loading ? (r(), p("p", Gn, v(e(f)("todoist.tasksRetained", { text: e(D).emptyText })), 1)) : C("", !0),
      e(D).loading && e(D).columns.length === 0 ? (r(), p("p", Xn, v(e(f)("common.loading")), 1)) : e(D).emptyText && e(D).columns.length === 0 ? (r(), p("p", qn, v(e(D).emptyText), 1)) : e(D).view === "projects" && e(D).projects.length === 0 ? (r(), p("div", Qn, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, v(e(f)("todoist.emptyProjects")), 1),
        t("p", null, v(e(f)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (i) => Ne(i))
        }, v(e(f)("todoist.createFirstProject")), 1)
      ])) : (r(), p(at, { key: 5 }, [
        e(D).view === "projects" && e(D).projects.length ? (r(), p("div", Jn, [
          t("div", Zn, [
            t("div", ts, [
              (r(!0), p(at, null, dt(e(D).projects, (i) => (r(), p("button", {
                key: i.id,
                type: "button",
                class: tt(["todoist-project-tab", { active: String(i.id) === String(e(D).activeProjectId) }]),
                onClick: (E) => To(i.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: gt({ background: i.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", os, v(i.name), 1)
              ], 10, es))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => Ne(i))
              }, "＋ 新建项目")
            ]),
            bt.value ? (r(), p("div", ns, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(f)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => bo(bt.value, i))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", is, v(e(f)("common.rename")), 1)
              ], 8, ss),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(f)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => yo(bt.value, i))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", ls, v(e(f)("todoist.deleteProject")), 1)
              ], 8, as)
            ])) : C("", !0)
          ])
        ])) : C("", !0),
        t("div", rs, [
          (r(!0), p(at, null, dt(e(D).columns, (i, E) => (r(), p("section", {
            key: i.sectionId || i.title || E,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": E
          }, [
            t("header", cs, [
              t("h3", null, [
                Vt(v(i.title) + " ", 1),
                t("span", null, v(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: K((c) => ro(i, E, c), ["stop"])
              }, "•••", 8, us)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => we(i, E, c)
            }, "＋ 添加任务", 8, ps),
            F.value === it(i, E) ? (r(), p("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: K((c) => Kt(i), ["prevent"])
            }, [
              Mt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (c) => W.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (c) => lo(c, i),
                onPaste: o[5] || (o[5] = (c) => h(c))
              }, null, 40, vs), [
                [Gt, W.value]
              ]),
              T.value ? (r(), p("div", {
                key: 0,
                class: tt(["todoist-composer-date-hint", { "is-ignored": O.value }])
              }, [
                t("div", fs, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", gs, [
                    Vt(v(T.value.label) + v(T.value.time ? " " + T.value.time : "") + " ", 1),
                    t("span", bs, "(" + v(T.value.formattedDate) + ")", 1)
                  ]),
                  O.value ? (r(), p("span", ys, " (已忽略日期，按纯文本创建) ")) : (r(), p("span", ks, [
                    o[32] || (o[32] = Vt(" 精简任务名: ", -1)),
                    t("strong", null, v(T.value.cleanTitle), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (c) => O.value = !O.value)
                }, v(O.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : C("", !0),
              I.value.length > 0 ? (r(), p("div", hs, [
                (r(!0), p(at, null, dt(I.value, (c, st) => (r(), p("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, ws),
                  t("span", Ts, v(c.name), 1),
                  c.uploading ? (r(), p("span", Ds, "上传中…")) : C("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (N) => R(st)
                  }, "×", 8, xs)
                ]))), 128))
              ])) : C("", !0),
              t("div", Cs, [
                t("button", {
                  type: "button",
                  disabled: w.value,
                  onClick: Qt
                }, v(e(f)("common.cancel")), 9, _s),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: w.value
                }, v(w.value ? I.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Ss)
              ])
            ], 40, ms)) : C("", !0),
            te(Kn, {
              tasks: e(Nt)(i, E),
              "pinned-id": e(It) || B.value,
              "hidden-id": e(Pt) !== null ? e(It) : null,
              "is-preview": e(_t),
              class: tt(["todoist-board-list", { "drag-over": e(Pt) === E }]),
              "data-group-index": E,
              onDragover: K((c) => e(g)(c, E), ["prevent"]),
              onDragleave: (c) => e(Z)(c, E),
              onDrop: K((c) => e(be)(c, i), ["prevent"])
            }, {
              empty: de(() => [
                i.tasks.length === 0 && e(Pt) !== E ? (r(), p("p", $s, " 暂无任务 · 可拖到这里 ")) : C("", !0)
              ]),
              default: de(({ task: c, index: st }) => [
                t("article", {
                  class: tt(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: B.value === c.id,
                      "dragging-task": !e(_t)(c) && e(It) === c.id,
                      "drop-before": e(qt) === c.id && !e(zt),
                      "drop-after": e(qt) === c.id && e(zt),
                      "saving-position": e(D).movingTaskId === c.id,
                      "todoist-task-preview": e(_t)(c),
                      "drag-origin-hidden": e(It) === c.id && !e(_t)(c) && e(Pt) !== null
                    }
                  ]]),
                  style: gt(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": e(_t)(c) ? void 0 : c.id,
                  "aria-hidden": e(_t)(c) || void 0,
                  tabindex: e(_t)(c) ? -1 : 0,
                  title: Ct(),
                  draggable: !e(_t)(c) && !c.completed && !e(D).loading && !e(D).movingTaskId && !e(D).moveNeedsRefresh && B.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (N) => e(j)(N, c, i, st),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...N) => e(u) && e(u)(...N)),
                  onDragover: K((N) => e(Rt)(N, c, i, st), ["stop", "prevent"]),
                  onDrop: K((N) => e(Wt)(N, c, i, st), ["stop", "prevent"]),
                  onDblclick: (N) => ye(c, N),
                  onClick: (N) => Ft(c, N),
                  onContextmenu: K((N) => je(c, i, N), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: tt(["todoist-board-check", { checked: c.completed }]),
                    disabled: e(_t)(c) || e(D).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: K((N) => ke(c, i), ["stop"])
                  }, null, 10, Ps),
                  t("div", Rs, [
                    e(D).movingTaskId === c.id ? (r(), p("span", Ls, "保存中")) : C("", !0),
                    m(c.id, c.description).length ? (r(), p("div", Os, [
                      (r(!0), p(at, null, dt(m(c.id, c.description), (N) => (r(), p("button", {
                        key: N.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + N.fullName + " · 点击在插件内查看详情",
                        onClick: K((Dt) => z(N.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", Ms, v(N.fullName), 1)
                      ], 8, Es))), 128))
                    ])) : C("", !0),
                    k(c.id, c.description, c.content).length ? (r(), p("div", As, [
                      (r(!0), p(at, null, dt(k(c.id, c.description, c.content), (N) => (r(), p("button", {
                        key: N.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + N.title + " · 点击立即播放",
                        onClick: K((Dt) => $(N), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", Ws, v(N.title), 1)
                      ], 8, js))), 128))
                    ])) : C("", !0),
                    x(c.id, c.description, c.content).length ? (r(), p("div", Us, [
                      (r(!0), p(at, null, dt(x(c.id, c.description, c.content), (N) => (r(), p("button", {
                        key: N.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (N.title || N.url) + " · 点击直接打开",
                        onClick: K((Dt) => V(N.url), ["stop"])
                      }, [
                        o[36] || (o[36] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", Bs, v(N.title || N.url), 1)
                      ], 8, Vs))), 128))
                    ])) : C("", !0),
                    B.value === c.id ? Mt((r(), p("textarea", {
                      key: 4,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: Q,
                      "onUpdate:modelValue": o[7] || (o[7] = (N) => X.value = N),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (N) => ie(N, c),
                      onBlur: (N) => se(c, !0),
                      onClick: o[8] || (o[8] = K(() => {
                      }, ["stop"]))
                    }, null, 40, Ns)), [
                      [Gt, X.value]
                    ]) : (r(), p("p", Hs, v(c.content || "未命名任务"), 1)),
                    mt(c) ? (r(), p("p", zs, v(mt(c)), 1)) : C("", !0),
                    Bt(c) ? (r(), p("div", Fs, [
                      c.startDate && !c.dueDate ? (r(), p("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + v(e(Ie)(c.startDate)) + " 起 ", 9, Ks)) : c.startDate && c.dueDate ? (r(), p("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + v(e(Ie)(c.startDate)) + " ~ " + v(e(Ie)(c.dueDate)), 9, Ys)) : c.dueText ? (r(), p("span", {
                        key: 2,
                        class: tt(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, v(c.isRecurring ? "↻ " : "▣ ") + v(c.dueText), 11, Gs)) : C("", !0),
                      (r(!0), p(at, null, dt((c.labels || []).slice(0, 3), (N) => (r(), p("span", {
                        key: N,
                        class: "todoist-board-label"
                      }, "◇ " + v(N), 1))), 128)),
                      c.timedDeadlineText ? (r(), p("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + v(c.timedDeadlineText), 9, Xs)) : C("", !0),
                      c.extraCountText ? (r(), p("span", qs, v(c.extraCountText), 1)) : C("", !0)
                    ])) : C("", !0),
                    Tt(c) ? (r(), p("div", {
                      key: 8,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: K((N) => kt(Tt(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: Tt(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, Js),
                      o[37] || (o[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, Qs)) : C("", !0)
                  ])
                ], 46, Is)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, ds))), 128)),
          e(D).view === "inbox" || e(D).view === "projects" ? (r(), p("div", Zs, [
            e(D).addingSection ? (r(), p("div", ti, [
              Mt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (i) => G.value = i),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  $t(K(Me, ["prevent"]), ["enter"]),
                  $t(Te, ["esc"])
                ]
              }, null, 40, ei), [
                [Gt, G.value]
              ]),
              t("div", oi, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: Me
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: Te
                }, v(e(f)("common.cancel")), 1)
              ])
            ])) : (r(), p("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[10] || (o[10] = (i) => e(D).addingSection = !0)
            }, [...o[38] || (o[38] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : C("", !0)
        ])
      ], 64)),
      H.isOpen && H.col ? (r(), p("div", {
        key: 6,
        class: "todoist-section-menu",
        style: gt({ left: H.x + "px", top: H.y + "px" }),
        onClick: o[16] || (o[16] = K(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (i) => ko(H.col, i))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", ni, v(e(f)("todoist.menu.renameSection")), 1)
        ]),
        H.col.sectionId ? (r(), p("div", si, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !H.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (i) => Ae(H.col, -1))
          }, v(e(f)("todoist.menu.moveLeft")), 9, ii),
          o[40] || (o[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !H.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (i) => Ae(H.col, 1))
          }, v(e(f)("todoist.menu.moveRight")), 9, ai)
        ])) : C("", !0),
        H.col.sectionId ? (r(), p("div", li)) : C("", !0),
        H.col.sectionId ? (r(), p("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (i) => ho(H.col, i))
        }, [
          o[41] || (o[41] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", ri, v(e(f)("todoist.menu.deleteSection")), 1)
        ])) : C("", !0)
      ], 4)) : C("", !0),
      l.isOpen && l.task ? (r(), p("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: gt({ left: l.x + "px", top: l.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = K(() => {
        }, ["stop"]))
      }, [
        t("div", di, [
          t("span", ci, v(l.task.content || e(f)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (i) => ue("labels"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", ui, v(e(f)("todoist.menu.cloudLabels")), 1),
          t("span", pi, v(l.task.labels && l.task.labels.length ? e(f)("todoist.menu.labelsSelected", { count: l.task.labels.length }) : e(f)("todoist.menu.labelsNone")), 1)
        ], 2),
        l.activeSubpanel === "labels" ? (r(), p("div", mi, [
          t("div", vi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (i) => l.newLabelText = i),
              type: "text",
              placeholder: e(f)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: $t(K(Ue, ["prevent"]), ["enter"])
            }, null, 40, fi), [
              [Gt, l.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Ue
            }, "＋")
          ]),
          t("div", gi, [
            (r(!0), p(at, null, dt(vt.value, (i) => (r(), p("button", {
              key: i,
              type: "button",
              class: tt(["todoist-label-chip", { selected: We(i) }]),
              onClick: (E) => co(i)
            }, [
              t("span", null, "◇ " + v(i), 1),
              We(i) ? (r(), p("span", ki, "✓")) : C("", !0)
            ], 10, bi))), 128))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (i) => ue("recur"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", yi, v(e(f)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: gt(l.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, v(l.task.isRecurring ? l.task.dueString || e(f)("todoist.recur.recurring") : e(f)("todoist.menu.labelsNone")), 5)
        ], 2),
        l.activeSubpanel === "recur" ? (r(), p("div", hi, [
          t("div", wi, [
            (r(), p(at, null, dt(Y, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: tt(["todoist-recur-chip", { selected: uo(i.rule) }]),
              onClick: (E) => po(i.rule, i.label)
            }, [
              t("span", null, v(i.icon), 1),
              t("span", null, v(i.label), 1)
            ], 10, Ti)), 64))
          ]),
          t("div", Di, [
            Mt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (i) => l.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: $t(K(Ve, ["prevent"]), ["enter"])
            }, null, 40, xi), [
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
            onClick: mo
          }, v(e(f)("todoist.menu.clearRecur")), 1)) : C("", !0)
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (i) => ue("color"))
        }, [
          o[44] || (o[44] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", Ci, v(e(f)("todoist.menu.pickColor")), 1),
          t("span", _i, [
            pt.value.id === "none" ? (r(), p("span", Si, "⊘")) : (r(), p("span", {
              key: 1,
              class: "todoist-color-dot",
              style: gt({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: pt.value.hex
              })
            }, null, 4)),
            Vt(" " + v(pt.value.name), 1)
          ])
        ], 2),
        l.activeSubpanel === "color" ? (r(), p("div", $i, [
          t("div", Ii, [
            (r(), p(at, null, dt(A, (i) => t("button", {
              key: i.id,
              type: "button",
              class: tt(["todoist-color-swatch", { selected: pt.value.id === i.id }]),
              title: i.name,
              onClick: (E) => vo(i.id)
            }, [
              t("span", {
                class: tt(["todoist-color-dot", { none: i.id === "none" }]),
                style: gt(i.id !== "none" ? { background: i.hex } : {})
              }, v(i.id === "none" ? pt.value.id === "none" ? "✓" : "⊘" : pt.value.id === i.id ? "✓" : ""), 7),
              t("span", Ri, v(i.name), 1)
            ], 10, Pi)), 64))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (i) => ue("project"))
        }, [
          o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Li, v(e(f)("todoist.menu.moveToProject")), 1),
          o[46] || (o[46] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        l.activeSubpanel === "project" ? (r(), p("div", {
          key: 3,
          class: tt(["todoist-project-flyout", { "open-left": l.flyoutOpenLeft }]),
          style: gt(l.flyoutStyle)
        }, [
          (r(!0), p(at, null, dt(e(D).projects, (i) => (r(), p("button", {
            key: i.id,
            type: "button",
            class: tt(["todoist-project-flyout-item", { active: String(i.id) === nt.value }]),
            disabled: !!e(D).movingTaskId || String(i.id) === nt.value,
            onClick: (E) => fo(i)
          }, [
            o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Ei, v(i.name), 1),
            String(i.id) === nt.value ? (r(), p("span", Mi, v(e(f)("todoist.menu.currentBadge")), 1)) : C("", !0)
          ], 10, Oi))), 128))
        ], 6)) : C("", !0),
        o[49] || (o[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: go
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Ai, v(l.task.isRecurring ? e(f)("todoist.menu.deleteRecurringTask") : e(f)("todoist.menu.deleteTask")), 1)
        ])
      ], 4)) : C("", !0),
      L.isOpen && e(q).active ? (r(), p("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: ut,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: gt({
          position: "fixed",
          left: `${L.x}px`,
          top: `${L.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[26] || (o[26] = K(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (i) => Be("prompt", i))
        }, [
          o[50] || (o[50] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", ji, v(L.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(f)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Wi)
        ], 32),
        t("div", Ui, [
          L.message ? (r(), p("p", Vi, v(L.message), 1)) : C("", !0),
          Mt(t("input", {
            ref_key: "promptInputRef",
            ref: J,
            "onUpdate:modelValue": o[25] || (o[25] = (i) => L.value = i),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: L.placeholder,
            onKeydown: [
              $t(K(He, ["prevent"]), ["enter"]),
              $t(K(le, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, Bi), [
            [Gt, L.value]
          ])
        ]),
        t("div", Ni, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: le
          }, v(e(f)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: He
          }, v(L.confirmText || e(f)("common.confirm")), 1)
        ])
      ], 4)) : C("", !0),
      P.isOpen && e(q).active ? (r(), p("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: ht,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: gt({
          position: "fixed",
          left: `${P.x}px`,
          top: `${P.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[28] || (o[28] = K(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (i) => Be("confirm", i))
        }, [
          t("span", Hi, v(P.icon || "⚠️"), 1),
          t("h3", zi, v(P.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(f)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Fi)
        ], 32),
        t("div", Ki, [
          P.danger ? (r(), p("div", Yi, [
            t("div", Gi, v(P.alertText), 1)
          ])) : C("", !0),
          t("p", Xi, v(P.message), 1)
        ]),
        t("div", qi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: pe
          }, v(e(f)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: tt(["todoist-dialog-btn", P.danger ? "danger" : "primary"]),
            onClick: wo
          }, v(P.confirmText || e(f)("common.confirm")), 3)
        ])
      ], 4)) : C("", !0)
    ]));
  }
}), Ji = /* @__PURE__ */ ne(Qi, [["__scopeId", "data-v-0e73dbcb"]]), to = {
  activePopover: "none",
  isDescEditing: !1
};
class Zi {
  constructor() {
    this._state = { ...to }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.todoistInspector = this);
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
        const m = d.activePopover === s.popover ? "none" : s.popover;
        return this._setState({
          ...d,
          activePopover: m
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
        return this._setState({ ...to }), !0;
      default:
        return !1;
    }
  }
}
const ta = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, ea = { class: "reminder-shortcuts" }, oa = ["disabled"], na = { class: "reminder-preview" }, sa = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, ia = ["disabled"], aa = ["disabled"], la = ["disabled"], ra = /* @__PURE__ */ Ht({
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
    const d = a, m = s, k = d.value || (d.taskDate ? d.taskDate + "T" + (d.taskTime || "09:00") : ""), x = M(k.slice(0, 10)), V = M(k.slice(11, 16)), $ = M(!1), z = M(""), D = M(!0), G = ot(() => x.value && V.value ? (/* @__PURE__ */ new Date(x.value + "T" + V.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function F(O) {
      if ($.value) return;
      const T = /* @__PURE__ */ new Date();
      O === "tomorrow" ? (T.setDate(T.getDate() + 1), T.setHours(9, 0, 0, 0)) : T.setTime(T.getTime() + O * 6e4), x.value = `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`, V.value = `${String(T.getHours()).padStart(2, "0")}:${String(T.getMinutes()).padStart(2, "0")}`, z.value = "", D.value = !0;
    }
    async function W(O) {
      if (!($.value || q.pendingWrites)) {
        if (O && (!Number.isFinite(Date.parse(O)) || Date.parse(O) <= Date.now())) {
          z.value = "请选择未来的提醒时间。";
          return;
        }
        if (y.taskId === d.taskId) {
          $.value = !0, z.value = "";
          try {
            if (await rt.setReminder(O), y.taskId !== d.taskId) return;
            y.error ? z.value = y.error : y.reminderTime === O && m("close");
          } finally {
            $.value = !1;
          }
        }
      }
    }
    return (O, T) => (r(), At(Le, {
      anchor: a.anchor,
      onClose: T[9] || (T[9] = (I) => m("close"))
    }, {
      default: de(() => [
        t("section", ta, [
          T[11] || (T[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", ea, [
            t("button", {
              type: "button",
              onClick: T[0] || (T[0] = (I) => F(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: T[1] || (T[1] = (I) => F(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: T[2] || (T[2] = (I) => F("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: $.value }, [
            T[10] || (T[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            te(Oe, {
              modelValue: x.value,
              "onUpdate:modelValue": T[3] || (T[3] = (I) => x.value = I),
              "time-value": V.value,
              "onUpdate:timeValue": T[4] || (T[4] = (I) => V.value = I),
              embedded: "",
              onTimeValidity: T[5] || (T[5] = (I) => D.value = I)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, oa),
          t("div", na, v(G.value || "选择提醒的日期和时间"), 1),
          T[12] || (T[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          z.value ? (r(), p("p", sa, v(z.value), 1)) : C("", !0),
          t("footer", null, [
            a.value ? (r(), p("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: $.value || !!e(q).pendingWrites,
              onClick: T[6] || (T[6] = (I) => W(""))
            }, "移除提醒", 8, ia)) : C("", !0),
            t("button", {
              type: "button",
              disabled: $.value,
              onClick: T[7] || (T[7] = (I) => m("close"))
            }, "取消", 8, aa),
            t("button", {
              type: "button",
              class: "save",
              disabled: $.value || !!e(q).pendingWrites || !x.value || !V.value || !D.value,
              onClick: T[8] || (T[8] = (I) => W(x.value + "T" + V.value))
            }, v($.value ? "保存中…" : "设置提醒"), 9, la)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), da = /* @__PURE__ */ ne(ra, [["__scopeId", "data-v-da9e3ddd"]]), ca = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, ua = { class: "inspector-main-col" }, pa = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, ma = {
  key: 1,
  class: "inspector-repo-badges"
}, va = ["title", "onClick"], fa = { class: "repo-badge-name" }, ga = { class: "inspector-section inspector-title-section" }, ba = { class: "task-title-row" }, ka = ["title"], ya = {
  key: 0,
  class: "check-mark"
}, ha = ["value", "aria-label", "disabled", "placeholder"], wa = ["value", "placeholder", "disabled"], Ta = ["onKeydown"], Da = {
  key: 0,
  class: "desc-placeholder-btn"
}, xa = ["innerHTML"], Ca = {
  key: 2,
  role: "status"
}, _a = {
  key: 3,
  class: "attached-img-grid"
}, Sa = ["onClick"], $a = ["src", "alt"], Ia = { class: "attached-img-info" }, Pa = ["onClick"], Ra = { class: "inspector-section inspector-subtasks-section" }, La = {
  key: 0,
  class: "subtasks-list"
}, Oa = ["onClick"], Ea = {
  key: 0,
  class: "check-tick"
}, Ma = { class: "subtask-content-text" }, Aa = ["title", "onClick"], ja = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Wa = ["value", "placeholder"], Ua = { class: "subtask-actions" }, Va = { class: "inspector-section inspector-comments-section" }, Ba = { class: "comment-input-bar" }, Na = { class: "comment-input-wrap" }, Ha = ["value", "placeholder", "disabled"], za = ["title"], Fa = ["disabled"], Ka = {
  key: 0,
  class: "comments-list"
}, Ya = { class: "comment-item-content" }, Ga = { class: "comment-item-header" }, Xa = { class: "comment-time" }, qa = { class: "comment-text" }, Qa = {
  key: 0,
  class: "comment-attached-thumb"
}, Ja = ["src", "onClick"], Za = { class: "inspector-side-col" }, tl = { class: "side-prop-group date-picker-anchor" }, el = { class: "row-text" }, ol = { class: "side-prop-group date-picker-anchor" }, nl = { class: "row-text" }, sl = ["title"], il = { class: "side-prop-group" }, al = { class: "side-prop-label" }, ll = { class: "row-text" }, rl = { class: "inspector-menu" }, dl = ["disabled", "onClick"], cl = { key: 0 }, ul = { class: "side-prop-group" }, pl = { class: "side-prop-label" }, ml = { class: "row-text" }, vl = { class: "inspector-menu" }, fl = ["placeholder", "aria-label", "onKeydown"], gl = { key: 0 }, bl = {
  key: 1,
  role: "alert"
}, kl = { class: "label-options-list" }, yl = ["checked", "disabled", "onChange"], hl = ["disabled"], wl = { key: 3 }, Tl = { class: "side-prop-group" }, Dl = { class: "side-prop-label" }, xl = { class: "row-text" }, Cl = /* @__PURE__ */ Ht({
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
    const d = a, m = s, k = new Zi(), x = M(k.isDescEditing), V = ot(() => k.isPopoverOpen("start_date")), $ = ot(() => k.isPopoverOpen("due_date")), z = ot(() => k.isPopoverOpen("priority")), D = ot(() => k.isPopoverOpen("labels")), G = ot(() => k.isPopoverOpen("reminder")), F = k.subscribe((j) => {
      x.value = j.isDescEditing;
    }), W = M(null), O = M(null);
    let T;
    oe(() => {
      Ho();
      let j = -1;
      T = new ResizeObserver((u) => {
        const g = u[0]?.contentRect.width;
        g !== j && (j = g, R(O.value), R(W.value));
      }), O.value?.parentElement && T.observe(O.value.parentElement);
    }), jt(() => {
      T?.disconnect(), F(), k.send({ type: "RESET_ALL" });
    });
    const I = ot(() => {
      if (!d.editDescription) return "";
      const j = d.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), u = document.createElement("template");
      u.innerHTML = zo.renderMarkdown(j);
      const g = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const Z of Array.from(u.content.querySelectorAll("*"))) {
        if (!g.has(Z.tagName)) {
          Z.replaceWith(document.createTextNode(Z.textContent || ""));
          continue;
        }
        const Rt = Z.tagName === "A" ? Z.getAttribute("href") : null;
        for (const Wt of Array.from(Z.attributes)) Z.removeAttribute(Wt.name);
        Rt && /^(https?:\/\/|mailto:)/i.test(Rt) && (Z.setAttribute("href", Rt), Z.setAttribute("target", "_blank"), Z.setAttribute("rel", "noopener noreferrer"));
      }
      return u.innerHTML;
    });
    function h() {
      k.send({ type: "START_DESC_EDIT" }), Lt(() => {
        R(W.value), W.value?.focus();
      });
    }
    function R(j) {
      j && (j.style.height = "auto", j.style.height = j.scrollHeight + "px");
    }
    function B(j) {
      R(j.el);
    }
    function X(j) {
      const u = j.target;
      R(u), m("update:editDescription", u.value), m("scheduleDraftSave", j);
    }
    function Q() {
      m("saveTitleAndDesc"), k.send({ type: "FINISH_DESC_EDIT" });
    }
    const H = M(null), L = M(null), J = M(""), ut = M(null), P = M(null), ht = M(null), l = M([]), U = M(!1), _ = M("");
    let A;
    ct(() => [d.state.taskId, D.value], async (j, u, g) => {
      if (A?.abort(), !D.value) return;
      const Z = new AbortController();
      A = Z, g(() => Z.abort()), l.value = [], U.value = !0, _.value = "";
      try {
        const Rt = await lt.getLabels(Z.signal);
        Z.signal.aborted || (l.value = Rt.map((Wt) => Wt.name));
      } catch {
        Z.signal.aborted || (_.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        Z.signal.aborted || (U.value = !1);
      }
    });
    function Y() {
      k.send({ type: "OPEN_POPOVER", popover: "reminder" });
    }
    const nt = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function bt(j) {
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
    function vt(j) {
      k.send({ type: "CLOSE_POPOVER" }), m("selectPriority", j);
    }
    const pt = ot(() => {
      const j = /* @__PURE__ */ new Set([...l.value, ...d.availableLabels || []]);
      for (const u of d.state.labels || []) j.add(u);
      return Array.from(j);
    }), it = ot(() => {
      const j = J.value.trim().toLowerCase();
      return j ? pt.value.filter((u) => u.toLowerCase().includes(j)) : pt.value;
    });
    function Ct() {
      const j = J.value.trim();
      j && (m("createLabel", j), J.value = "");
    }
    function Bt(j, u) {
      Ee.open(j, u);
    }
    const wt = M(0);
    function It() {
      wt.value++;
    }
    oe(() => {
      window.addEventListener("storage", It), window.addEventListener("todoist-repository-links-changed", It);
    }), jt(() => {
      window.removeEventListener("storage", It), window.removeEventListener("todoist-repository-links-changed", It);
    });
    const Pt = ot(() => (wt.value, no(d.state.taskId, d.editDescription)));
    function qt(j) {
      so.open(j);
    }
    function zt(j, u) {
      if (!j) return "";
      try {
        const g = j.split("-"), Z = parseInt(g[1], 10), Rt = parseInt(g[2], 10), Wt = u ? ` ${u}` : "";
        return `${Z}月${Rt}日${Wt}`;
      } catch {
        return j;
      }
    }
    function _t(j) {
      if (!j) return "";
      try {
        const u = new Date(j);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    function Nt(j) {
      if (!j) return "刚刚";
      try {
        const u = new Date(j);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    return (j, u) => a.state.isOpen ? (r(), p("div", ca, [
      t("main", ua, [
        a.state.error ? (r(), p("p", pa, v(a.state.error), 1)) : C("", !0),
        Pt.value.length ? (r(), p("div", ma, [
          (r(!0), p(at, null, dt(Pt.value, (g) => (r(), p("button", {
            key: g.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(f)("todoist.linkRepoTitle", { name: g.fullName }),
            onClick: (Z) => qt(g.fullName)
          }, [
            u[38] || (u[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", fa, v(g.fullName), 1),
            u[39] || (u[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, va))), 128))
        ])) : C("", !0),
        t("section", ga, [
          t("div", ba, [
            t("button", {
              type: "button",
              class: tt(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: e(f)("todoist.toggleComplete"),
              onClick: u[0] || (u[0] = (g) => m("toggleComplete"))
            }, [
              a.isTaskCompleted ? (r(), p("span", ya, "✓")) : C("", !0)
            ], 10, ka),
            t("textarea", {
              value: a.editTitle,
              rows: "1",
              "aria-label": e(f)("todoist.taskTitle"),
              onVnodeMounted: B,
              onVnodeUpdated: B,
              disabled: a.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: O,
              class: tt(["inspector-input-title", { "title-done": a.isTaskCompleted }]),
              placeholder: e(f)("todoist.taskTitle"),
              onInput: u[1] || (u[1] = (g) => {
                R(g.target), m("update:editTitle", g.target.value), m("scheduleDraftSave", g);
              }),
              onCompositionend: u[2] || (u[2] = (g) => m("scheduleDraftSave", g)),
              onBlur: u[3] || (u[3] = (g) => m("saveTitleAndDesc", g)),
              onKeydown: u[4] || (u[4] = $t(K((g) => m("saveTitleAndDesc", g), ["prevent"]), ["enter"]))
            }, null, 42, ha)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: u[7] || (u[7] = K((g) => m("dragover"), ["prevent"])),
          onDragleave: u[8] || (u[8] = K((g) => m("dragleave"), ["prevent"])),
          onDrop: u[9] || (u[9] = K((g) => m("dropImage", g), ["prevent"]))
        }, [
          x.value ? (r(), p("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: W,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(f)("todoist.taskDesc"),
            disabled: a.isUploadingImg,
            onInput: X,
            onCompositionend: u[5] || (u[5] = (g) => m("scheduleDraftSave", g)),
            onBlur: Q,
            onPaste: u[6] || (u[6] = (g) => m("descPaste", g))
          }, null, 40, wa)) : (r(), p("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: h,
            onKeydown: $t(K(h, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (r(), p("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: I.value
            }, null, 8, xa)) : (r(), p("span", Da, "≡ 描述"))
          ], 40, Ta)),
          a.isUploadingImg ? (r(), p("small", Ca, "图片上传中…")) : C("", !0),
          a.attachedImages.length ? (r(), p("div", _a, [
            (r(!0), p(at, null, dt(a.attachedImages, (g) => (r(), p("div", {
              key: g.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (Z) => Bt(g.url, g.name)
              }, [
                t("img", {
                  src: g.url,
                  alt: g.name,
                  loading: "lazy"
                }, null, 8, $a)
              ], 8, Sa),
              t("div", Ia, [
                t("span", null, v(g.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Z) => m("removeAttachedImage", g.url)
                }, "×", 8, Pa)
              ])
            ]))), 128))
          ])) : C("", !0)
        ], 32),
        t("section", Ra, [
          a.subtasks.length > 0 ? (r(), p("div", La, [
            (r(!0), p(at, null, dt(a.subtasks, (g) => (r(), p("div", {
              key: g.id,
              class: tt(["subtask-row-item", { done: g.completed }])
            }, [
              t("button", {
                type: "button",
                class: tt(["subtask-check-circle", { checked: g.completed }]),
                onClick: (Z) => m("toggleSubtask", g.id)
              }, [
                g.completed ? (r(), p("span", Ea, "✓")) : C("", !0)
              ], 10, Oa),
              t("span", Ma, v(g.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(f)("todoist.subtask.delete"),
                onClick: (Z) => m("removeSubtask", g.id)
              }, "×", 8, Aa)
            ], 2))), 128))
          ])) : C("", !0),
          a.isAddingSubtask ? (r(), p("div", ja, [
            t("input", {
              value: a.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(f)("todoist.subtask.inputPlaceholder"),
              onInput: u[10] || (u[10] = (g) => m("update:newSubtaskText", g.target.value)),
              onKeydown: [
                u[11] || (u[11] = $t(K((g) => m("confirmAddSubtask"), ["prevent"]), ["enter"])),
                u[12] || (u[12] = $t((g) => m("update:isAddingSubtask", !1), ["esc"]))
              ]
            }, null, 40, Wa),
            t("div", Ua, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: u[13] || (u[13] = (g) => m("confirmAddSubtask"))
              }, v(e(f)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: u[14] || (u[14] = (g) => m("update:isAddingSubtask", !1))
              }, v(e(f)("common.cancel")), 1)
            ])
          ])) : (r(), p("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: u[15] || (u[15] = (g) => m("update:isAddingSubtask", !0))
          }, [
            u[40] || (u[40] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Vt(" " + v(e(f)("todoist.subtask.add")), 1)
          ]))
        ]),
        (r(), At(Vo, {
          key: a.state.taskId,
          "task-id": a.state.taskId,
          description: a.editDescription,
          title: a.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", Va, [
          t("div", Ba, [
            u[41] || (u[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Na, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(f)("todoist.comment.placeholder"),
                disabled: a.isSubmittingComment,
                onInput: u[16] || (u[16] = (g) => m("update:newCommentText", g.target.value)),
                onKeydown: u[17] || (u[17] = $t(K((g) => m("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Ha),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(f)("todoist.comment.attachPhoto"),
                onClick: u[18] || (u[18] = K((g) => m("triggerFileInput"), ["stop"]))
              }, "📎", 8, za)
            ]),
            a.newCommentText.trim() ? (r(), p("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: u[19] || (u[19] = (g) => m("submitComment"))
            }, v(e(f)("todoist.comment.send")), 9, Fa)) : C("", !0)
          ]),
          a.state.comments.length > 0 ? (r(), p("div", Ka, [
            (r(!0), p(at, null, dt(a.state.comments, (g) => (r(), p("div", {
              key: g.id,
              class: "comment-item"
            }, [
              u[43] || (u[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", Ya, [
                t("div", Ga, [
                  u[42] || (u[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", Xa, v(Nt(g.postedAt)), 1)
                ]),
                t("div", qa, v(g.content), 1),
                g.attachment?.url ? (r(), p("div", Qa, [
                  t("img", {
                    src: g.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Z) => Bt(g.attachment.url, g.attachment.name)
                  }, null, 8, Ja)
                ])) : C("", !0)
              ])
            ]))), 128))
          ])) : C("", !0)
        ])
      ]),
      t("aside", Za, [
        t("div", tl, [
          u[45] || (u[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: H,
            type: "button",
            class: tt(["side-item-row click-row", { active: V.value, filled: !!a.editStartDate }]),
            onClick: u[21] || (u[21] = (g) => e(k).send({ type: "TOGGLE_POPOVER", popover: "start_date" }))
          }, [
            u[44] || (u[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", el, v(zt(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (r(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: u[20] || (u[20] = K((g) => m("clearStartDate"), ["stop"]))
            }, "×")) : C("", !0)
          ], 2),
          V.value ? (r(), At(Oe, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": H.value,
            "onUpdate:modelValue": u[22] || (u[22] = (g) => m("update:editStartDate", g)),
            "onUpdate:timeValue": u[23] || (u[23] = (g) => m("update:editStartTime", g)),
            onChange: u[24] || (u[24] = (g) => m("startChange")),
            onClose: u[25] || (u[25] = (g) => e(k).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", ol, [
          u[47] || (u[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: L,
            type: "button",
            class: tt(["side-item-row click-row", { active: $.value, filled: !!a.editDueDate }]),
            onClick: u[27] || (u[27] = (g) => e(k).send({ type: "TOGGLE_POPOVER", popover: "due_date" }))
          }, [
            u[46] || (u[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", nl, v(zt(a.editDueDate, a.editDueTime) || e(f)("todoist.prop.setDueDate")), 1),
            a.editDueDate ? (r(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(f)("todoist.prop.clearDueDate"),
              onClick: u[26] || (u[26] = K((g) => m("clearDueDate"), ["stop"]))
            }, "×", 8, sl)) : C("", !0)
          ], 2),
          $.value ? (r(), At(Oe, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": L.value,
            "onUpdate:modelValue": u[28] || (u[28] = (g) => m("update:editDueDate", g)),
            "onUpdate:timeValue": u[29] || (u[29] = (g) => m("update:editDueTime", g)),
            onChange: u[30] || (u[30] = (g) => m("dueChange")),
            onClose: u[31] || (u[31] = (g) => e(k).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", il, [
          t("span", al, v(e(f)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: ht,
            type: "button",
            class: "side-item-row",
            onClick: u[32] || (u[32] = (g) => e(k).send({ type: "TOGGLE_POPOVER", popover: "priority" }))
          }, [
            t("span", {
              style: gt({ color: bt(a.state.priority) })
            }, "⚑", 4),
            t("span", ll, "P" + v(5 - a.state.priority), 1),
            u[48] || (u[48] = t("span", null, "⌄", -1))
          ], 512),
          z.value ? (r(), At(Le, {
            key: 0,
            anchor: ht.value,
            onClose: u[33] || (u[33] = (g) => e(k).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: de(() => [
              t("div", rl, [
                (r(), p(at, null, dt(nt, (g) => t("button", {
                  key: g.level,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: (Z) => vt(g.level)
                }, [
                  t("span", {
                    style: gt({ color: g.color })
                  }, "⚑", 4),
                  Vt(" " + v(g.name) + " ", 1),
                  a.state.priority === g.level ? (r(), p("span", cl, "✓")) : C("", !0)
                ], 8, dl)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", ul, [
          t("span", pl, v(e(f)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: ut,
            type: "button",
            class: "side-item-row",
            onClick: u[34] || (u[34] = (g) => e(k).send({ type: "TOGGLE_POPOVER", popover: "labels" }))
          }, [
            t("span", ml, v(a.state.labels.join("、") || e(f)("todoist.prop.addLabels")), 1),
            u[49] || (u[49] = t("span", null, "＋", -1))
          ], 512),
          D.value ? (r(), At(Le, {
            key: 0,
            anchor: ut.value,
            onClose: u[36] || (u[36] = (g) => e(k).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: de(() => [
              t("div", vl, [
                Mt(t("input", {
                  "onUpdate:modelValue": u[35] || (u[35] = (g) => J.value = g),
                  placeholder: e(f)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(f)("todoist.prop.searchLabelAria"),
                  onKeydown: $t(K(Ct, ["prevent"]), ["enter"])
                }, null, 40, fl), [
                  [Gt, J.value]
                ]),
                U.value ? (r(), p("small", gl, v(e(f)("todoist.prop.readingLabels")), 1)) : C("", !0),
                _.value ? (r(), p("p", bl, v(_.value), 1)) : C("", !0),
                t("div", kl, [
                  (r(!0), p(at, null, dt(it.value, (g) => (r(), p("label", {
                    key: g,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + v(g), 1),
                    t("input", {
                      type: "checkbox",
                      checked: a.state.labels.includes(g),
                      disabled: !!e(q).pendingWrites,
                      onChange: (Z) => m("toggleLabelSelect", g)
                    }, null, 40, yl)
                  ]))), 128))
                ]),
                J.value.trim() && !pt.value.includes(J.value.trim()) ? (r(), p("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: Ct
                }, v(e(f)("todoist.prop.createLabelBtn", { name: J.value.trim() })), 9, hl)) : C("", !0),
                !U.value && !it.value.length && !J.value ? (r(), p("small", wl, v(e(f)("todoist.prop.noLabels")), 1)) : C("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", Tl, [
          t("span", Dl, [
            Vt(v(e(f)("todoist.prop.reminder")) + " ", 1),
            t("small", null, v(e(f)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: P,
            type: "button",
            class: "side-item-row",
            onClick: Y
          }, [
            t("span", xl, v(_t(a.state.reminderTime) || e(f)("todoist.prop.addReminder")), 1),
            u[50] || (u[50] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (r(), At(da, {
            key: 0,
            anchor: P.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: u[37] || (u[37] = (g) => e(k).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : C("", !0)
        ])
      ])
    ])) : C("", !0);
  }
}), _l = /* @__PURE__ */ ne(Cl, [["__scopeId", "data-v-102cc930"]]), Sl = { class: "inspector-title-row" }, $l = ["title", "aria-label"], Il = ["disabled"], Pl = ["href"], Rl = "todoistInspectorPositionV2", Ll = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const s = y, d = ot(() => Et.get(s.taskId)), m = ot(() => d.value?.status === "failed" ? "保存未确认" : d.value?.status === "saving" ? "正在保存…" : G.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), k = ot(() => [
      m.value,
      d.value?.status === "failed" ? d.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: x,
      headerRef: V,
      initialStyle: $,
      onHeaderPointerDown: z,
      onResizePointerDown: D
    } = oo({
      windowId: "todoist-inspector",
      storageKey: Rl,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => s.isOpen && q.active
    }), G = M(""), F = M(""), W = M(""), O = M(""), T = M(""), I = M(""), h = M("idle"), R = ot(() => h.value === "uploading_img"), B = ot(() => h.value === "submitting_comment"), X = M(!1), Q = M(null), H = M(!1), L = M(""), J = M(""), ut = ot(() => {
      const w = s.description || "", b = [], S = w.split(`
`);
      let mt = 0;
      for (const Tt of S) {
        const kt = Tt.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        kt && b.push({
          id: `st_${mt++}`,
          completed: kt[1].toLowerCase() === "x",
          text: kt[2].trim()
        });
      }
      return b;
    }), P = ot(() => ut.value.filter((w) => w.completed).length);
    function ht(w) {
      const mt = (s.description || "").split(`
`).filter((Kt) => !Kt.match(/^\s*-\s*\[([ xX])\]/)), Tt = w.map((Kt) => `- [${Kt.completed ? "x" : " "}] ${Kt.text}`), kt = [...mt, ...Tt].join(`
`).trim();
      F.value = kt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(G.value, kt);
    }
    function l() {
      if (!L.value.trim()) return;
      const w = [...ut.value, {
        id: `st_${Date.now()}`,
        text: L.value.trim(),
        completed: !1
      }];
      L.value = "", H.value = !1, ht(w);
    }
    function U(w) {
      const b = ut.value.map((S) => S.id === w ? { ...S, completed: !S.completed } : S);
      ht(b);
    }
    function _(w) {
      const b = ut.value.filter((S) => S.id !== w);
      ht(b);
    }
    const A = ot(() => {
      for (const w of yt.columns || []) {
        const b = w.tasks.find((S) => S.id === s.taskId);
        if (b) return !!b.completed;
      }
      return !1;
    });
    async function Y() {
      for (const w of yt.columns || []) {
        const b = w.tasks.find((S) => S.id === s.taskId);
        if (b) {
          const S = !b.completed;
          b.completed = S, b._taskRaw && (b._taskRaw.checked = S);
          try {
            await lt.toggleTaskCompletion(b.id, S);
          } catch {
            b.completed = !S, b._taskRaw && (b._taskRaw.checked = !S), s.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function nt(w) {
      rt.setPriority(w);
    }
    function bt(w) {
      rt.toggleLabel(w);
    }
    function vt(w) {
      rt.toggleLabel(w);
    }
    async function pt(w) {
      w.trim() && (s.labels.includes(w.trim()) || await rt.createAndAttachLabel(w.trim()));
    }
    async function it() {
      if (!J.value.trim() || h.value !== "idle") return;
      const w = J.value.trim();
      h.value = "submitting_comment";
      try {
        await rt.addComment(w), J.value = "";
      } finally {
        h.value = "idle";
      }
    }
    ct(() => s.title, (w) => {
      G.value = w || "";
    }, { immediate: !0 }), ct(() => s.description, (w) => {
      F.value = (w || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => s.startDate, (w) => {
      W.value = w || "";
    }, { immediate: !0 }), ct(() => s.startTime, (w) => {
      O.value = w || "";
    }, { immediate: !0 }), ct(() => s.dueDate, (w) => {
      T.value = w || "";
    }, { immediate: !0 }), ct(() => s.dueTime, (w) => {
      I.value = w || "";
    }, { immediate: !0 });
    function Ct() {
      const w = /* @__PURE__ */ new Date();
      return `${w.getFullYear()}-${String(w.getMonth() + 1).padStart(2, "0")}-${String(w.getDate()).padStart(2, "0")}`;
    }
    function Bt() {
      O.value && !W.value && (W.value = Ct()), rt.setStartDateAndTime(W.value, O.value);
    }
    function wt() {
      O.value = "", Bt();
    }
    function It() {
      W.value = "", O.value = "", Bt();
    }
    function Pt() {
      I.value && !T.value && (T.value = Ct()), rt.setDueDateAndTime(T.value, I.value);
    }
    function qt() {
      I.value = "", Pt();
    }
    function zt() {
      T.value = "", I.value = "", Pt();
    }
    const _t = ot(() => {
      const w = [], b = /* @__PURE__ */ new Set(), S = s.description || "", mt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Tt;
      for (; (Tt = mt.exec(S)) !== null; ) {
        const kt = Tt[2];
        b.add(kt), w.push({
          name: Tt[1] || "任务照片",
          url: kt
        });
      }
      for (const kt of s.commentAttachments || [])
        b.has(kt.url) || (b.add(kt.url), w.push(kt));
      return w;
    });
    let Nt, j;
    function u() {
      const w = (s.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), b = [F.value.trim(), w].filter(Boolean);
      return {
        taskId: s.taskId,
        title: G.value,
        description: b.join(`

`)
      };
    }
    function g() {
      clearTimeout(Nt), Nt = void 0;
      const w = j;
      if (j = void 0, w?.taskId && w.title.trim())
        return rt.saveTitleAndDesc(w.title, w.description, w.taskId);
    }
    function Z(w) {
      w && "isComposing" in w && w.isComposing || (j = u(), rt.stageTitleDraft(j.taskId, j.title, j.description), clearTimeout(Nt), Nt = setTimeout(g, 800));
    }
    ct(() => s.taskId, () => g(), { flush: "sync" });
    function Rt() {
      g(), rt.close();
    }
    function Wt(w) {
      w && "isComposing" in w && w.isComposing || g();
    }
    function be() {
      j = u(), g();
    }
    function ke(w) {
      const b = ie(w);
      b && (w.preventDefault(), w.stopPropagation(), Ft(b));
    }
    function ye() {
      q.active && Q.value?.click();
    }
    async function he(w) {
      const b = w.target;
      if (!q.active) {
        b.value = "";
        return;
      }
      const S = b.files?.[0];
      S && await Ft(S), b.value = "";
    }
    async function se(w) {
      X.value = !1;
      const b = w.dataTransfer?.files?.[0];
      b && (b.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(b.name)) && await Ft(b);
    }
    function ie(w) {
      const b = w.clipboardData;
      if (!b) return null;
      if (b.files && b.files.length > 0)
        for (let S = 0; S < b.files.length; S++) {
          const mt = b.files[S];
          if (mt.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(mt.name))
            return mt;
        }
      if (b.items && b.items.length > 0)
        for (let S = 0; S < b.items.length; S++) {
          const mt = b.items[S];
          if (mt.type.includes("image")) {
            const Tt = mt.getAsFile();
            if (Tt) return Tt;
          }
        }
      return null;
    }
    async function Ft(w) {
      if (h.value !== "idle" || !q.active || !s.taskId) return;
      const b = s.taskId;
      h.value = "uploading_img";
      try {
        if (await g(), s.taskId !== b || !s.isOpen || !q.active) return;
        await rt.attachImageToTask(w);
      } catch (S) {
        s.taskId === b && (s.error = S instanceof Error ? S.message : "上传失败");
      } finally {
        h.value = "idle";
      }
    }
    function we(w) {
      const b = ie(w);
      b && (w.preventDefault(), Ft(b));
    }
    function Qt(w) {
      if (!s.isOpen || !q.active) return;
      const b = ie(w);
      b && (w.preventDefault(), w.stopPropagation(), Ft(b));
    }
    ct(() => q.active, (w) => {
      window.removeEventListener("paste", Qt, { capture: !0 }), w && window.addEventListener("paste", Qt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), jt(() => {
      g(), window.removeEventListener("paste", Qt, { capture: !0 });
    });
    async function ae(w) {
      const b = s.description || "", S = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), mt = b.replace(new RegExp(`!\\[[^\\]]*\\]\\(${S}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(s.title, mt);
    }
    return (w, b) => Mt((r(), p("aside", {
      ref_key: "panelRef",
      ref: x,
      class: "todoist-inspector-window",
      style: gt(e($)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: we
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: V,
        class: "inspector-header",
        onPointerdown: b[2] || (b[2] = (S) => e(z)(S))
      }, [
        t("div", Sl, [
          b[18] || (b[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          d.value ? (r(), p("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: b[0] || (b[0] = K(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: k.value,
              "aria-label": k.value
            }, v(m.value), 9, $l),
            d.value.status !== "saving" ? (r(), p("button", {
              key: 0,
              type: "button",
              disabled: e(s).saving || !G.value.trim(),
              onClick: K(be, ["stop"])
            }, v(d.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Il)) : C("", !0)
          ], 32)) : C("", !0),
          e(s).url ? (r(), p("a", {
            key: 1,
            href: e(s).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Pl)) : C("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: b[1] || (b[1] = K(() => {
          }, ["stop"])),
          onClick: K(Rt, ["stop"])
        }, "×", 32)
      ], 544),
      e(s).isOpen ? (r(), At(_l, {
        key: e(s).taskId,
        state: e(s),
        "edit-title": G.value,
        "onUpdate:editTitle": b[3] || (b[3] = (S) => G.value = S),
        "edit-description": F.value,
        "onUpdate:editDescription": b[4] || (b[4] = (S) => F.value = S),
        "edit-start-date": W.value,
        "onUpdate:editStartDate": b[5] || (b[5] = (S) => W.value = S),
        "edit-start-time": O.value,
        "onUpdate:editStartTime": b[6] || (b[6] = (S) => O.value = S),
        "edit-due-date": T.value,
        "onUpdate:editDueDate": b[7] || (b[7] = (S) => T.value = S),
        "edit-due-time": I.value,
        "onUpdate:editDueTime": b[8] || (b[8] = (S) => I.value = S),
        "is-uploading-img": R.value,
        "is-drag-over": X.value,
        "is-task-completed": A.value,
        subtasks: ut.value,
        "completed-subtasks-count": P.value,
        "is-adding-subtask": H.value,
        "onUpdate:isAddingSubtask": b[9] || (b[9] = (S) => H.value = S),
        "new-subtask-text": L.value,
        "onUpdate:newSubtaskText": b[10] || (b[10] = (S) => L.value = S),
        "new-comment-text": J.value,
        "onUpdate:newCommentText": b[11] || (b[11] = (S) => J.value = S),
        "is-submitting-comment": B.value,
        "attached-images": _t.value,
        "available-labels": e(yt).availableLabels || [],
        onScheduleDraftSave: Z,
        onSaveTitleAndDesc: Wt,
        onToggleComplete: Y,
        onTriggerFileInput: ye,
        onDragover: b[12] || (b[12] = (S) => X.value = !0),
        onDragleave: b[13] || (b[13] = (S) => X.value = !1),
        onDropImage: se,
        onDescPaste: ke,
        onRemoveAttachedImage: ae,
        onToggleSubtask: U,
        onRemoveSubtask: _,
        onConfirmAddSubtask: l,
        onSubmitComment: it,
        onStartChange: Bt,
        onClearStartDate: It,
        onClearStartTime: wt,
        onDueChange: Pt,
        onClearDueDate: zt,
        onClearDueTime: qt,
        onSelectPriority: nt,
        onToggleLabelSelect: bt,
        onRemoveLabel: vt,
        onCreateLabel: pt
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : C("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: Q,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: he
      }, null, 544),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: b[14] || (b[14] = (S) => e(D)(S, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: b[15] || (b[15] = (S) => e(D)(S, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: b[16] || (b[16] = (S) => e(D)(S, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: b[17] || (b[17] = (S) => e(D)(S, "w"))
      }, null, 32)
    ], 36)), [
      [Re, e(s).isOpen]
    ]);
  }
}), Ol = /* @__PURE__ */ ne(Ll, [["__scopeId", "data-v-23532e72"]]), El = { class: "vue-todoist-workspace-wrapper" }, Ml = ["aria-label"], Al = { class: "todoist-head-title-wrap" }, jl = { id: "todoist-workspace-title" }, Wl = ["aria-label"], Ul = ["title"], Vl = {
  class: "muted small",
  role: "status"
}, Bl = ["title", "aria-expanded"], Nl = ["title"], Hl = ["title"], zl = ["title"], Fl = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Kl = { class: "todoist-workspace-cal-area" }, Yl = { class: "todoist-workspace-task-area" }, Gl = "todoistWorkspacePosition", pr = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspace",
  setup(a) {
    const s = M(!1), d = Do(() => import("./TodoistAccountSettings-B1VdTOgO.js")), m = M(!1), k = M(!1), x = M(!document.hidden), V = M(!1), $ = ot(() => q.visible && x.value);
    q.session++, q.active = $.value, ao(
      () => $.value && !yt.movingTaskId,
      ee,
      () => et.loadWorkspace(void 0, void 0, !0)
    );
    let z = !1;
    const D = M(null), G = Lo;
    function F() {
      W.value && (W.value.style.removeProperty("width"), W.value.style.removeProperty("height"), W.value.style.removeProperty("left"), W.value.style.removeProperty("top"), W.value.style.removeProperty("right"), W.value.style.removeProperty("bottom"), W.value.style.removeProperty("margin"), W.value.style.removeProperty("transform"));
    }
    ct(() => q.visible, (_) => {
      _ && (G.isOpen = !0, q.active = x.value, et.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: W,
      headerRef: O,
      initialStyle: T,
      stopInteractions: I,
      onHeaderPointerDown: h,
      onResizePointerDown: R,
      bringToFront: B
    } = oo({
      windowId: "todoist",
      storageKey: Gl,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => $.value
    }), X = () => W.value;
    function Q() {
      ee(), Po(), Ro(), rt.cancelReads(), I(), window.removeEventListener("keydown", J);
    }
    const H = _o(Q);
    function L() {
      x.value = !document.hidden;
    }
    function J(_) {
      _.key === "Escape" && y.isOpen && (_.preventDefault(), _.stopPropagation(), rt.close());
    }
    ct($, (_) => {
      q.active = _, _ ? (window.addEventListener("keydown", J), z || (z = !0, et.loadWorkspace()), Lt(() => {
        $.value && B();
      })) : Q();
    }, { flush: "sync" }), ct(m, (_) => {
      _ && (k.value = !0);
    }), ct([$, s, Xe], ([_, A, Y]) => {
      if (!(!_ || !A || !Y) && (Xe.value = null, Oo("todoist") === Y.transition)) {
        if (q.pendingWrites || y.isOpen && y.taskId !== Y.id) {
          Ao.show({ appName: "Todoist", title: f("todoist.retainDetailTitle"), message: f("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        y.isOpen && y.taskId === Y.id || rt.openTask(Y.id);
      }
    }, { flush: "post" }), oe(() => {
      s.value = !0, V.value && Lt(F), me.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: X }), document.addEventListener("visibilitychange", L), $.value && (window.addEventListener("keydown", J), z || (z = !0, et.loadWorkspace()), Ye.refresh());
    }), jt(() => {
      So(), H(), document.removeEventListener("visibilitychange", L), me.unregister("todoist", X), rt.close(), Object.assign(y, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), et.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), $e.updateState({ title: f("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ye.update([]);
    });
    function ut() {
      $e.toggleCalendar();
    }
    function P() {
      $e.refresh();
    }
    function ht() {
      et.updateState({ accountConfigured: !0 }), $.value && et.loadWorkspace(void 0, void 0, !0);
    }
    function l() {
      me.minimize("todoist");
    }
    function U() {
      q.visible = !1, G.isOpen = !1, me.close("todoist");
    }
    return (_, A) => (r(), p("div", El, [
      Mt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: W,
        class: "card wide todoist-workspace",
        style: gt(e(T)),
        "aria-label": e(f)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: O,
          class: "todoist-workspace-head",
          onPointerdown: A[4] || (A[4] = (Y) => e(h)(Y))
        }, [
          t("div", Al, [
            A[10] || (A[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", jl, v(e(G).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(f)("todoist.viewAria")
          }, [
            te(Xo)
          ], 8, Wl),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: tt(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(G).isCalendarOpen }]),
            type: "button",
            title: e(f)("todoist.calendarToggleTitle"),
            onClick: ut
          }, " 📅 " + v(e(f)("todoist.calendar")), 11, Ul),
          A[11] || (A[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Vl, v(e(q).pendingWrites ? e(f)("todoist.pendingWrites") : e(f)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: D,
            type: "button",
            class: "no-drag",
            title: e(f)("todoist.settingsTitle"),
            "aria-expanded": m.value,
            onClick: A[0] || (A[0] = K((Y) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Bl),
          k.value ? (r(), At(e(d), {
            key: 0,
            visible: $.value && m.value,
            anchor: D.value,
            onClose: A[1] || (A[1] = (Y) => m.value = !1),
            onAccountSaved: ht
          }, null, 8, ["visible", "anchor"])) : C("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: e(f)("common.refresh"),
            onClick: P
          }, " ↻ ", 8, Nl),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(f)("todoist.minimizeHint"),
            onPointerdown: A[2] || (A[2] = K(() => {
            }, ["stop"])),
            onClick: K(l, ["stop"])
          }, " − ", 40, Hl),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(f)("todoist.closeHint"),
            onPointerdown: A[3] || (A[3] = K(() => {
            }, ["stop"])),
            onClick: K(U, ["stop"])
          }, " ✕ ", 40, zl)
        ], 544),
        e(yt).accountConfigured === !1 ? (r(), At(Eo, {
          key: 0,
          icon: "✅",
          title: e(f)("todoist.tokenMissingTitle"),
          description: e(f)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(f)("todoist.getToken"),
          onConfigure: A[5] || (A[5] = (Y) => m.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), p("div", Fl, [
          Mt(t("div", Kl, [
            te(Nn)
          ], 512), [
            [Re, e(G).isCalendarOpen]
          ]),
          t("div", Yl, [
            te(Ji)
          ])
        ])),
        te(Ol),
        A[12] || (A[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        V.value ? C("", !0) : (r(), p(at, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: A[6] || (A[6] = (Y) => e(R)(Y, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: A[7] || (A[7] = (Y) => e(R)(Y, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: A[8] || (A[8] = (Y) => e(R)(Y, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: A[9] || (A[9] = (Y) => e(R)(Y, "w"))
          }, null, 32)
        ], 64))
      ], 12, Ml), [
        [Re, e(q).visible]
      ])
    ]));
  }
});
export {
  pr as default
};
