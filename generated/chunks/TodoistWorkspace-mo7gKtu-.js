import { d as Ht, o as r, e as p, F as at, i as t, u as e, A as tt, t as v, r as Zt, w as ct, x as jt, B as oe, m as Vt, g as dt, h as K, f as C, b as A, M as eo, G as ze, z as gt, s as ot, D as Lt, l as Mt, n as Gt, p as te, H as de, k as $t, j as At, y as Re, C as Do } from "./vendor-vue-9b0eS4bW.js";
import { a as xo, t as q, w as Co, o as _o, p as So } from "./module-state-D4Dr89rP.js";
import { b as Fe, h as Ke, i as ee, j as yt, e as et, d as ft, c as $o, k as Io, t as Ye, g as $e, l as Po, m as Ro, n as Lo } from "./calendar.service-DnkbEAru.js";
import { u as oo } from "./useWindowDraggable-DY_QVDld.js";
import { w as me, b as Oo } from "./window-manager.store-BdI_8a-H.js";
import { t as f, _ as ne } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { A as Eo } from "./AccountSetupGuide-DHqCWacl.js";
import { i as Ee } from "./image-viewer-store-CD_I-QAv.js";
import { d as Mo, n as Ao } from "./view-styles-GoYAfbQZ.js";
import { t as lt, d as jo, s as Wo, b as ve, g as Ge, f as Ie, p as Uo } from "./todoist.service-By6xSyz1.js";
import { g as no, T as Vo } from "./TaskRepositoryLinks-ByGX7K_A.js";
import { g as Bo } from "./bili-video-links-DXpyplJq.js";
import { g as No } from "./web-site-links-BSIympLj.js";
import { v as so, D as Ho } from "./search.service-wriY3nvN.js";
import { u as zo } from "./useMachine-wbweZDNg.js";
import { I as Le, T as Oe } from "./TodoistDatePickerPopover-D8yR_FLS.js";
import { m as Fo } from "./core-utils-B2N4WtKx.js";
import { pendingTodoistTask as Xe } from "./task-navigation-CvM3gAxl.js";
const Ko = ["title"], Yo = { class: "todoist-tab-text" }, Go = ["title"], Xo = { class: "todoist-tab-text" }, qo = /* @__PURE__ */ Ht({
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
        t("span", Yo, v(e(f)("todoist.inbox")), 1)
      ], 10, Ko),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: tt({ on: e(Ke).view === "projects" }),
        title: e(f)("todoist.projects"),
        onClick: d[1] || (d[1] = (m) => e(Fe).switchView("projects"))
      }, [
        d[3] || (d[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", Xo, v(e(f)("todoist.projects")), 1)
      ], 10, Go)
    ], 64));
  }
}), io = "todoist_reminder_v2:", Qo = "todoist_remind_";
async function Jo(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const s = io + a, d = await chrome.storage.local.get([s, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(d, s) ? d[s] || void 0 : d.todoist_reminders_map_v1?.[a];
}
async function Zo(a, s, d) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const m = new Date(s).getTime();
  if (s && (!Number.isFinite(m) || m <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (s && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const w = io + a, x = Qo + a;
  await chrome.alarms.clear(x), await chrome.storage.local.set({ [w]: s ? { time: s, title: d } : null }), s && await chrome.alarms.create(x, { when: m });
}
const Et = Zt(/* @__PURE__ */ new Map());
let tn = 0;
function qe(a, s, d, m = "editing") {
  const w = ++tn;
  return Et.set(a, { revision: w, title: s, description: d, status: m, error: "" }), w;
}
const k = Zt({
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
  Xt.clear(), k.loading = !1;
}
function Je(a) {
  Xt.get(a)?.abort();
  const s = new AbortController();
  Xt.set(a, s);
  const d = ce, m = k.taskId;
  return {
    signal: s.signal,
    current: () => !s.signal.aborted && d === ce && k.isOpen && m === k.taskId && Xt.get(a) === s,
    finish: () => {
      Xt.get(a) === s && Xt.delete(a);
    }
  };
}
function Ut() {
  re(!1);
  const a = k.taskId, s = ce;
  return { taskId: a, current: () => k.isOpen && s === ce && a === k.taskId };
}
function en(a) {
  return new Promise((s) => {
    const d = new FileReader();
    d.onload = () => s(d.result || ""), d.onerror = () => s(""), d.readAsDataURL(a);
  });
}
function Ze(a, s, d) {
  for (const m of yt.columns)
    for (const w of m.tasks)
      String(w.id) === a && (w.content = s, d !== void 0 && (w.description = d), w._taskRaw && (w._taskRaw.content = s, d !== void 0 && (w._taskRaw.description = d)));
  ft.updateTaskTitle(a, s);
}
const on = {
  state: k,
  cancelReads: re,
  stageTitleDraft(a, s, d) {
    a && (qe(a, s, d), re(!1), k.taskId === a && (k.title = s), Ze(a, s, d));
  },
  async openTask(a, s) {
    if (!a) return;
    if (re(), k.taskId = a, k.isOpen = !0, k.error = "", Object.assign(k, {
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
      const x = ve(s.due?.datetime || s.due?.date || s.dueDate || "");
      k.dueDate = x.date, k.dueTime = x.time;
      const V = s.startDate || Ge(a, k.description), $ = ve(V);
      k.startDate = $.date, k.startTime = $.time, k.labels = [...s.labels || []], k.url = s.url || "";
    }
    const d = Et.get(a);
    d && (k.title = d.title, k.description = d.description);
    const m = Je("reminder");
    Jo(a).then((x) => {
      m.current() && (k.reminderTime = x?.time || "");
    }).catch(() => {
      m.current() && (k.error = "本机提醒读取失败。");
    }).finally(m.finish);
    const w = Je("detail");
    k.loading = !0;
    try {
      const x = await lt.api(`/tasks/${encodeURIComponent(a)}`, { signal: w.signal });
      if (x && w.current()) {
        const V = Et.get(a);
        k.title = V?.title ?? x.content ?? "", k.description = V?.description ?? x.description ?? "", k.priority = x.priority || 1;
        const $ = ve(x.due?.datetime || x.due?.date || "");
        k.dueDate = $.date, k.dueTime = $.time;
        const H = Ge(a, x.description || k.description), D = ve(H);
        k.startDate = D.date, k.startTime = D.time, k.labels = [...x.labels || []], k.url = x.url || "";
        try {
          const G = await lt.getComments(a, w.signal);
          if (G && w.current()) {
            const F = [], j = [];
            for (const O of G) {
              let T;
              if (O?.attachment?.file_url) {
                const I = O.attachment.file_name || "附件图片";
                F.push({ name: I, url: O.attachment.file_url }), T = { name: I, url: O.attachment.file_url };
              }
              j.push({
                id: O.id,
                content: O.content || "",
                postedAt: O.posted_at || "",
                attachment: T
              });
            }
            if (k.commentAttachments = F, k.comments = j, F.length > 0 && k.description) {
              let O = k.description, T = !1;
              for (const I of F) {
                const y = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                y.test(O) && (O = O.replace(y, `$1${I.url}$2`), T = !0);
              }
              if (T && !Et.has(a)) {
                k.description = O;
                for (const I of yt.columns) {
                  const y = I.tasks.find((R) => String(R.id) === a);
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
      w.current() && (k.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      w.current() && (k.loading = !1), w.finish();
    }
  },
  close() {
    re(), k.isOpen = !1, k.taskId = "";
  },
  async setStartDateAndTime(a, s) {
    if (!k.taskId) return;
    const d = Ut(), m = a.trim(), w = m ? s.trim() : "";
    k.startDate = m, k.startTime = w, ee();
    const x = jo(m, w);
    Wo(d.taskId, x), lt.invalidateWorkspaceSnapshots();
    for (const V of yt.columns) {
      const $ = V.tasks.find((H) => H.id === d.taskId);
      $ && ($.startDate = x);
    }
  },
  async setDueDateAndTime(a, s) {
    if (!k.taskId) return;
    const d = Ut(), m = a.trim(), w = m ? s.trim() : "";
    k.dueDate = m, k.dueTime = w, ee(), lt.invalidateWorkspaceSnapshots();
    const x = (ge.get(d.taskId) || 0) + 1;
    ge.set(d.taskId, x);
    const V = Qe.then(async () => {
      try {
        const $ = await lt.updateTask(d.taskId, {
          due_string: m ? w ? `${m} ${w}` : m : "no date"
        });
        if (ge.get(d.taskId) !== x) return;
        const H = lt.mapTasks([$], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const D of yt.columns) {
          const G = D.tasks.findIndex((j) => j.id === d.taskId);
          if (G < 0) continue;
          const F = D.tasks[G];
          if (Object.assign(F, {
            dueDate: H.dueDate,
            dueText: H.dueText,
            dueString: H.dueString,
            isDueToday: H.isDueToday,
            isOverdue: H.isOverdue,
            isRecurring: H.isRecurring
          }), F._taskRaw && (F._taskRaw.due = $.due), yt.view === "today") {
            const j = H.isOverdue ? "overdue" : H.isDueToday ? "today" : "";
            j !== D.sectionId && (D.tasks.splice(G, 1), yt.columns.find((O) => O.sectionId === j)?.tasks.push(F));
          }
        }
        d.current() && (k.error = "");
      } catch {
        d.current() && ge.get(d.taskId) === x && (k.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Qe = V.catch(() => {
    }), await V;
  },
  async saveTitleAndDesc(a, s, d = k.taskId) {
    const m = d === k.taskId ? Ut() : { taskId: d, current: () => !1 };
    if (!m.taskId || !a.trim()) return;
    const w = a.trim(), x = s.trim(), V = qe(d, w, x, "saving");
    m.current() && (k.title = w, k.description = x), Ze(m.taskId, w, x), fe++, k.saving = !0;
    const $ = Pe.then(async () => {
      try {
        await lt.updateTask(m.taskId, {
          content: w,
          description: x
        }), Et.get(d)?.revision === V && Et.delete(d), fe === 1 && Et.size === 0 && et.dispatch("refresh");
      } catch (H) {
        const D = Et.get(d);
        D?.revision === V && (D.status = "failed", D.error = H instanceof Error ? H.message : "保存未确认");
      } finally {
        fe--, k.saving = fe > 0;
      }
    });
    Pe = $.catch(() => {
    }), await $;
  },
  async attachImageToTask(a) {
    const s = Ut();
    if (await Pe, !s.current()) return;
    if (Et.has(s.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const d = k.description || "";
    if (!s.taskId || k.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    k.saving = !0;
    try {
      const m = a.name || `截图_${Date.now()}.png`;
      let w = "";
      try {
        const x = await lt.uploadFile(a, m);
        x && x.file_url && (w = x.file_url);
      } catch (x) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", x), a.size <= 2.5 * 1024 * 1024)
          w = await en(a);
        else
          throw new Error(x?.message || "云端上传失败且文件超过2.5MB");
      }
      if (w) {
        const x = d ? `${d}

![${m}](${w})` : `![${m}](${w})`;
        await lt.updateTask(s.taskId, {
          description: x
        }), s.current() && (k.description = x);
        for (const V of yt.columns) {
          const $ = V.tasks.find((H) => String(H.id) === s.taskId);
          if ($) {
            $.description = x, $._taskRaw && ($._taskRaw.description = x);
            break;
          }
        }
        et.dispatch("refresh");
      }
    } catch (m) {
      s.current() && (k.error = m.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${m.message}`);
    } finally {
      k.saving = !1;
    }
  },
  async setPriority(a) {
    if (!k.taskId) return;
    const s = Ut();
    if (![1, 2, 3, 4].includes(a)) return;
    const d = k.priority;
    k.priority = a, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(s.taskId, { priority: a });
      for (const m of yt.columns) {
        const w = m.tasks.find((x) => x.id === s.taskId);
        w && (w.priority = a, w._taskRaw && (w._taskRaw.priority = a));
      }
    } catch {
      s.current() && (k.priority = d, k.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!k.taskId) return;
    const s = Ut(), d = [...k.labels], w = d.includes(a) ? d.filter((x) => x !== a) : [...d, a];
    k.labels = w, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(s.taskId, { labels: w });
      for (const x of yt.columns) {
        const V = x.tasks.find(($) => $.id === s.taskId);
        V && (V.labels = w, V._taskRaw && (V._taskRaw.labels = w));
      }
    } catch {
      s.current() && (k.labels = d, k.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const s = Ut();
    if (a = a.trim(), !(!s.taskId || !a))
      try {
        const d = await lt.getLabels();
        if (!s.current()) return;
        d.some((m) => m.name === a) || await lt.createLabel(a), s.current() && !k.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        s.current() && (k.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!k.taskId || !a.trim()) return;
    const s = Ut();
    try {
      const d = await lt.addComment({
        task_id: s.taskId,
        content: a.trim()
      });
      d && s.current() && k.comments.push({
        id: d.id || `c_${Date.now()}`,
        content: d.content || a.trim(),
        postedAt: d.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (d) {
      s.current() && (k.error = "发送评论失败：" + (d?.message || ""));
    }
  },
  async setReminder(a) {
    const s = Ut();
    if (s.taskId)
      try {
        await Zo(s.taskId, a, k.title), s.current() && (k.reminderTime = a, k.error = "");
      } catch (d) {
        s.current() && (k.error = d instanceof Error ? d.message : "提醒未保存，请重试。");
      }
  }
}, rt = xo(on, [
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
  let m = !1, w;
  const x = ct(
    () => [q.dataRevision, a(), q.pendingWrites],
    ([V, $, H], D) => {
      D && V !== D[0] && (m = !0, s()), w && clearTimeout(w), !(!m || !$ || H) && (w = setTimeout(() => {
        w = void 0, !(!a() || q.pendingWrites) && (m = !1, d());
      }, 150));
    }
  );
  jt(() => {
    x(), w && clearTimeout(w);
  });
}
const nn = ["aria-label"], sn = { class: "todoist-cal-head" }, an = { class: "todoist-cal-title-row" }, ln = { class: "todoist-cal-logo" }, rn = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, dn = { class: "todoist-cal-head-actions" }, cn = { class: "todoist-cal-nav" }, un = { class: "todoist-cal-nav-group" }, pn = ["title"], mn = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, vn = ["title"], fn = { class: "todoist-cal-nav-group" }, gn = ["title"], bn = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, kn = ["title"], yn = { class: "todoist-cal-weekdays" }, hn = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, wn = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Tn = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Dn = { class: "todoist-cal-agenda" }, xn = { class: "todoist-cal-agenda-head" }, Cn = { class: "todoist-cal-agenda-title" }, _n = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, Sn = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, $n = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, In = ["disabled"], Pn = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, Rn = {
  key: 0,
  class: "todoist-cal-empty"
}, Ln = {
  key: 1,
  class: "todoist-cal-empty"
}, On = ["onClick"], En = { class: "todoist-cal-todo-main" }, Mn = ["disabled", "title", "onClick"], An = {
  key: 0,
  class: "check-icon"
}, jn = {
  key: 0,
  class: "todoist-cal-task-time"
}, Wn = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, Un = ["title", "onClick"], Vn = ["src", "alt"], Bn = { class: "todoist-cal-thumb-tag" }, Nn = /* @__PURE__ */ Ht({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const s = Io;
    ao(
      () => q.active,
      () => ft.invalidateReads(),
      () => ft.loadTodosForDate(s.selectedDate, !0)
    ), jt(() => ft.cancelReads()), ct(() => [q.active, q.pendingWrites], ([T, I], y) => {
      if (!T || I) {
        ft.cancelReads();
        return;
      }
      ft.loadTodosForDate(s.selectedDate, !!y?.[1]);
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
    function w() {
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
    function H() {
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
      const y = Array.from(I.dataTransfer?.types || []);
      (y.includes("application/x-todoist-task-id") || y.includes("text/plain")) && (I.preventDefault(), I.dataTransfer && (I.dataTransfer.dropEffect = "copy"));
    }
    function j(T) {
    }
    function O(T, I) {
      const y = I.dataTransfer?.getData("application/x-todoist-task-id") || I.dataTransfer?.getData("text/plain");
      y && (I.preventDefault(), I.stopPropagation(), ft.dispatch("drop-task", { taskId: y, date: T }));
    }
    return (T, I) => (r(), p("aside", {
      id: "todoist-calendar-sidebar",
      class: tt(["todoist-calendar-sidebar", { collapsed: e(s).collapsed }]),
      "aria-label": e(f)("todoist.calendar.sidebarLabel")
    }, [
      t("div", sn, [
        t("div", an, [
          t("span", ln, [
            I[1] || (I[1] = Vt("📅 ", -1)),
            t("strong", null, v(e(f)("todoist.calendar.title")), 1)
          ]),
          t("span", rn, v(e(s).badgeText), 1)
        ]),
        t("div", dn, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: w
          }, v(e(f)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", cn, [
        t("div", un, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.prevMonth"),
            onClick: x
          }, "‹", 8, pn),
          t("span", mn, v(e(s).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.nextMonth"),
            onClick: V
          }, "›", 8, vn)
        ]),
        t("div", fn, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.prevYear"),
            onClick: $
          }, "‹", 8, gn),
          t("span", bn, v(e(s).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(f)("todoist.calendar.nextYear"),
            onClick: H
          }, "›", 8, kn)
        ])
      ]),
      t("div", yn, [
        t("span", null, v(e(f)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, v(e(f)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", hn, [
        (r(!0), p(at, null, dt(e(s).cells, (y) => (r(), p("button", {
          key: y.date,
          type: "button",
          class: tt(["todoist-cal-cell", {
            outside: y.isOutside,
            today: y.isToday,
            selected: y.isSelected
          }]),
          "data-date": y.date,
          role: "gridcell",
          title: y.title,
          onClick: (R) => D(y.date),
          onContextmenu: K((R) => G(y.date, R), ["prevent"]),
          onDragover: (R) => F(y.date, R),
          onDragleave: (R) => (y.date, void 0),
          onDrop: (R) => O(y.date, R)
        }, [
          t("span", null, v(y.dayNumber), 1),
          y.hasDot ? (r(), p("span", Tn)) : C("", !0)
        ], 42, wn))), 128))
      ]),
      t("div", Dn, [
        t("div", xn, [
          t("strong", Cn, v(e(s).agendaTitle), 1),
          t("span", _n, v(e(f)("todoist.calendar.itemCount", { count: e(s).todoItems.length })), 1)
        ]),
        e(s).writeError ? (r(), p("p", Sn, v(e(s).writeError), 1)) : C("", !0),
        e(s).emptyText ? (r(), p("div", $n, [
          Vt(v(e(s).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(s).todoLoading || e(q).pendingWrites > 0,
            onClick: I[0] || (I[0] = (y) => e(ft).loadTodosForDate(e(s).selectedDate, !0))
          }, v(e(f)("todoist.calendar.retryLoad")), 9, In)
        ])) : C("", !0),
        t("div", Pn, [
          e(s).todoLoading && !e(s).todoItems.length ? (r(), p("div", Rn, v(e(f)("todoist.calendar.loading")), 1)) : e(s).todoItems.length === 0 && !e(s).emptyText ? (r(), p("div", Ln, v(e(f)("todoist.calendar.emptyDay")), 1)) : (r(!0), p(at, { key: 2 }, dt(e(s).todoItems, (y) => (r(), p("div", {
            key: y.id,
            class: tt(["todoist-cal-todo-card", { completed: y.completed }]),
            onClick: (R) => m(y)
          }, [
            t("div", En, [
              t("button", {
                type: "button",
                class: tt(["todoist-cal-check", { checked: y.completed }]),
                disabled: e(q).pendingWrites > 0,
                title: y.completed ? e(f)("todoist.calendar.clickToReopen") : e(f)("todoist.calendar.clickToComplete"),
                onClick: K((R) => d(y), ["stop"])
              }, [
                y.completed ? (r(), p("span", An, "✓")) : C("", !0)
              ], 10, Mn),
              t("span", {
                class: tt(["todoist-cal-todo-title", { strike: y.completed }])
              }, v(y.content), 3),
              y.time ? (r(), p("small", jn, v(y.time), 1)) : C("", !0),
              y.completed ? (r(), p("span", Wn, v(e(f)("todoist.calendar.completedTag")), 1)) : C("", !0)
            ]),
            y.thumbUrl ? (r(), p("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(f)("todoist.calendar.viewPhoto"),
              onClick: K((R) => e(Ee).open(y.thumbUrl, y.content), ["stop"])
            }, [
              t("img", {
                src: y.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(f)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, Vn),
              t("span", Bn, v(e(f)("todoist.calendar.photoTag")), 1)
            ], 8, Un)) : C("", !0)
          ], 10, On))), 128))
        ])
      ])
    ], 10, nn));
  }
}), Hn = /* @__PURE__ */ ne(Nn, [["__scopeId", "data-v-6c1a5887"]]);
function zn(a) {
  const s = a.state, d = A(null), m = A(null), w = A(null), x = A(!1), V = eo(null), $ = A(), H = /* @__PURE__ */ new Map();
  function D(l) {
    H.clear();
    const W = l.closest(".todoist-board");
    if (W)
      for (const _ of W.querySelectorAll(".todoist-board-list")) {
        const M = s.columns[Number(_.dataset.groupIndex)];
        if (!M) continue;
        const Y = _.__todoistSlots;
        if (!Y) continue;
        const nt = Y(), bt = nt.filter((vt) => vt.id !== R?.id);
        H.set(M, { list: _, rows: bt, read: Y, snapshot: nt });
      }
  }
  let G = 0, F;
  function j(l, W) {
    F = { clientY: l.clientY, col: W }, !G && (G = requestAnimationFrame(() => {
      G = 0;
      const _ = F;
      F = void 0, _ && O(_, _.col);
    }));
  }
  function O(l, W) {
    if (!R || s.movingTaskId) return;
    const _ = H.get(W);
    if (!_) return;
    const M = _.read();
    M !== _.snapshot && (_.snapshot = M, _.rows = M.filter((it) => it.id !== R?.id));
    const Y = l.clientY - _.list.getBoundingClientRect().top + _.list.scrollTop;
    let nt = 0, bt = _.rows.length;
    for (; nt < bt; ) {
      const it = nt + bt >>> 1;
      Y < _.rows[it].middle ? bt = it : nt = it + 1;
    }
    let vt = nt;
    if (m.value === s.columns.indexOf(W)) {
      const it = $.value ? _.rows.findIndex((Ct) => Ct.id === $.value) : _.rows.length;
      it >= 0 && vt > it && Y < _.rows[it].middle + 10 && (vt = it), it > 0 && vt < it && Y > _.rows[it - 1].middle - 10 && (vt = it);
    }
    const pt = _.rows[vt]?.id;
    y(W, pt), m.value === s.columns.indexOf(W) && (w.value = pt || _.rows[_.rows.length - 1]?.id || null, x.value = !pt);
  }
  function T(l) {
    return l === V.value;
  }
  function I(l, W) {
    if (W !== m.value || !V.value) return l.tasks;
    const _ = [...l.tasks], M = $.value ? _.findIndex((Y) => Y.id === $.value) : -1;
    return _.splice(M < 0 ? _.length : M, 0, V.value), _;
  }
  function y(l, W) {
    if (!R || !B) return;
    if (s.view === "today" && l.sectionId === "overdue" && B.sectionId !== "overdue") {
      m.value = null;
      return;
    }
    const _ = W ? l.tasks.find((nt) => nt.id === W) : void 0, M = l === B ? String(R._taskRaw?.parent_id || "") : "";
    if (_ && s.view !== "today" && String(_._taskRaw?.parent_id || "") !== M) {
      m.value = null;
      return;
    }
    const Y = s.columns.indexOf(l);
    Y < 0 || ($.value = W, m.value = Y);
  }
  let R = null, B = null;
  function X(l, W, _, M) {
    if (!a.isActive() || s.loading || s.movingTaskId || s.moveNeedsRefresh || W.completed || W.id.startsWith("optimistic-") || a.editingTaskId() === W.id) {
      l.preventDefault();
      return;
    }
    if (l.stopPropagation(), a.closePopovers(), d.value = W.id, R = W, B = _, V.value = { ...W }, D(l.currentTarget), l.dataTransfer) {
      l.dataTransfer.effectAllowed = "move";
      const Y = l.currentTarget, nt = Y.getBoundingClientRect();
      l.dataTransfer.setDragImage(
        Y,
        Math.max(0, Math.min(nt.width, l.clientX - nt.left)),
        Math.max(0, Math.min(nt.height, l.clientY - nt.top))
      ), l.dataTransfer.clearData(), l.dataTransfer.setData("application/x-todoist-task-id", W.id), l.dataTransfer.setData("application/x-logicweaver-todoist-task", W.id), l.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: W.id, sectionId: _.sectionId }));
    }
  }
  function Q() {
    cancelAnimationFrame(G), G = 0, F = void 0, d.value = null, m.value = null, w.value = null, x.value = !1, R = null, B = null, V.value = null, $.value = void 0, H.clear();
  }
  function z(l, W) {
    !R || s.movingTaskId || (l.preventDefault(), l.stopPropagation(), l.dataTransfer && (l.dataTransfer.dropEffect = "move"), j(l, s.columns[W]));
  }
  function L(l, W) {
    l.currentTarget?.contains(l.relatedTarget);
  }
  function J(l, W, _, M) {
    l.dataTransfer && (l.dataTransfer.dropEffect = "move"), j(l, _);
  }
  async function ut(l, W) {
    F && F.col === l && (O(F, F.col), W = $.value);
    const _ = R, M = B;
    Q(), !(!_ || !M || !a.isActive() || s.movingTaskId) && (s.view === "today" ? l.sectionId === "today" && M.sectionId !== "today" ? await a.moveTask(_.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, W) : await a.moveTask(_.id, { sectionId: l.sectionId }, W) : await a.moveTask(_.id, {
      projectId: l.projectId,
      sectionId: l.sectionId
    }, W));
  }
  async function P(l, W, _, M) {
    l.preventDefault();
    const Y = l.dataTransfer?.getData("application/x-todoist-label") || (l.dataTransfer?.getData("text/plain")?.startsWith("label:") ? l.dataTransfer.getData("text/plain").slice(6) : "");
    if (Y) {
      a.dropLabel(W, Y);
      return;
    }
    if (m.value === s.columns.indexOf(_)) {
      await ut(_, $.value);
      return;
    }
    const nt = l.currentTarget.getBoundingClientRect(), bt = l.clientY >= nt.top + nt.height / 2, vt = _.tasks.filter((Ct) => Ct.id !== R?.id), pt = vt.findIndex((Ct) => Ct.id === W.id), it = W.id === R?.id ? W.id : bt ? vt[pt + 1]?.id : W.id;
    await ut(_, it);
  }
  async function ht(l, W) {
    l.preventDefault(), l.stopPropagation(), await ut(W, m.value === s.columns.indexOf(W) ? $.value : void 0);
  }
  return ct(() => [s.view, s.activeProjectId], () => Q()), ct(() => s.columns, (l) => {
    B && !l.includes(B) && Q();
  }), ct(a.isActive, (l) => {
    l || Q();
  }, { immediate: !0, flush: "sync" }), jt(Q), {
    draggingTaskId: d,
    dragOverColIndex: m,
    dragOverTaskId: w,
    dragAfterTask: x,
    isDragPreview: T,
    previewTasks: I,
    onTaskDragStart: X,
    onTaskDragEnd: Q,
    onColDragOver: z,
    onColDragLeave: L,
    onTaskDragOver: J,
    onTaskDrop: P,
    onColDrop: ht
  };
}
const Fn = ["data-row-key"], Kn = /* @__PURE__ */ Ht({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const s = a, d = A(null), m = /* @__PURE__ */ new Map(), w = A(0), x = eo({ top: 0, height: 600 }), V = (y) => s.isPreview(y) ? `preview:${y.id}` : y.id, $ = ot(() => {
      w.value;
      const y = [0];
      for (const R of s.tasks) {
        const B = R.id === s.hiddenId && !s.isPreview(R) ? 0 : m.get(V(R)) || m.get(R.id) || 110;
        y.push(y[y.length - 1] + B);
      }
      return y;
    }), H = ot(() => {
      w.value;
      let y = 0;
      return s.tasks.filter((R) => !s.isPreview(R)).map((R) => {
        const B = m.get(R.id) || 110, X = { id: R.id, middle: y + B / 2 };
        return y += B, X;
      });
    });
    function D(y) {
      const R = $.value;
      let B = 0, X = s.tasks.length;
      for (; B < X; ) {
        const Q = B + X >>> 1;
        R[Q + 1] < y ? B = Q + 1 : X = Q;
      }
      return B;
    }
    const G = ot(() => {
      const y = Math.max(0, D(x.value.top) - 5), R = Math.min(s.tasks.length, D(x.value.top + x.value.height) + 6), B = /* @__PURE__ */ new Set();
      for (let X = y; X < R; X++) B.add(X);
      if (s.pinnedId) {
        const X = s.tasks.findIndex((Q) => Q.id === s.pinnedId && !s.isPreview(Q));
        X >= 0 && B.add(X);
      }
      return [...B].sort((X, Q) => X - Q).map((X) => ({ task: s.tasks[X], index: X, top: $.value[X] }));
    });
    let F = 0;
    function j() {
      F || (F = requestAnimationFrame(() => {
        F = 0, d.value && (x.value = { top: d.value.scrollTop, height: d.value.clientHeight });
      }));
    }
    let O;
    const T = /* @__PURE__ */ new Map();
    function I(y, R) {
      const B = T.get(R);
      B !== y && (B && O?.unobserve(B), y instanceof HTMLElement ? (T.set(R, y), O?.observe(y)) : T.delete(R));
    }
    return ct(() => s.tasks, () => {
      const y = new Set(s.tasks.map(V));
      for (const R of m.keys()) y.has(R) || m.delete(R);
      Lt(j);
    }), oe(() => {
      O = new ResizeObserver((y) => {
        let R = !1;
        const B = D(d.value?.scrollTop || 0), X = $.value[B] || 0;
        for (const Q of y) {
          const z = Q.target;
          if (z === d.value) {
            j();
            continue;
          }
          const L = z.dataset.rowKey, J = Q.borderBoxSize?.[0]?.blockSize || Q.contentRect.height;
          L && J > 0 && Math.abs((m.get(L) || 0) - J) > 0.5 && (m.set(L, J), R = !0);
        }
        if (R) {
          w.value++;
          const Q = ($.value[B] || 0) - X;
          d.value && Q && !s.pinnedId && (d.value.scrollTop += Q), j();
        }
      }), d.value && (O.observe(d.value), d.value.__todoistSlots = () => H.value);
      for (const y of T.values()) O.observe(y);
      j();
    }), jt(() => {
      O?.disconnect(), cancelAnimationFrame(F), d.value && delete d.value.__todoistSlots, T.clear(), m.clear();
    }), (y, R) => (r(), p("div", {
      ref_key: "root",
      ref: d,
      onScrollPassive: j
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
          ze(y.$slots, "default", {
            task: B.task,
            index: B.index
          }, void 0, !0)
        ], 12, Fn))), 128))
      ], 4)) : ze(y.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), Yn = /* @__PURE__ */ ne(Kn, [["__scopeId", "data-v-b7076778"]]), Gn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, Xn = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, qn = {
  key: 2,
  class: "todoist-empty"
}, Qn = {
  key: 3,
  class: "todoist-empty"
}, Jn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, Zn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, ts = { class: "todoist-projects-toolbar-inner" }, es = { class: "todoist-project-tabs-scroll" }, os = ["onClick"], ns = { class: "todoist-project-tab-name" }, ss = {
  key: 0,
  class: "todoist-project-actions-group"
}, is = ["title"], as = { class: "action-text" }, ls = ["title"], rs = { class: "action-text" }, ds = { class: "todoist-board" }, cs = ["data-section-id", "data-title", "data-column-index"], us = { class: "todoist-board-column-head" }, ps = ["title", "onClick"], ms = ["onClick"], vs = ["onSubmit"], fs = ["onKeydown"], gs = { class: "date-hint-left" }, bs = { class: "date-hint-badge" }, ks = { class: "date-hint-sub" }, ys = {
  key: 0,
  class: "date-hint-preview"
}, hs = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, ws = {
  key: 1,
  class: "todoist-composer-images"
}, Ts = ["src"], Ds = { class: "todoist-composer-img-name" }, xs = {
  key: 0,
  class: "todoist-composer-img-status"
}, Cs = ["onClick"], _s = { class: "todoist-inline-actions" }, Ss = ["disabled"], $s = ["disabled"], Is = {
  key: 0,
  class: "todoist-column-empty"
}, Ps = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Rs = ["disabled", "title", "aria-label", "onClick"], Ls = { class: "todoist-board-task-main" }, Os = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Es = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Ms = ["title", "onClick"], As = { class: "repo-badge-name" }, js = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, Ws = ["title", "onClick"], Us = { class: "repo-badge-name" }, Vs = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Bs = ["title", "onClick"], Ns = { class: "repo-badge-name" }, Hs = ["onKeydown", "onBlur"], zs = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, Fs = {
  key: 6,
  class: "todoist-board-task-description"
}, Ks = {
  key: 7,
  class: "todoist-board-task-meta"
}, Ys = ["title"], Gs = ["title"], Xs = ["title"], qs = ["title"], Qs = {
  key: 4,
  class: "todoist-board-extra"
}, Js = ["onClick"], Zs = ["src"], ti = {
  key: 0,
  class: "todoist-board-add-column"
}, ei = {
  key: 1,
  class: "todoist-add-section-form"
}, oi = ["onKeydown"], ni = { class: "todoist-add-section-actions" }, si = { class: "section-menu-text" }, ii = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, ai = ["disabled"], li = ["disabled"], ri = {
  key: 1,
  class: "todoist-section-menu-divider"
}, di = { class: "section-menu-text" }, ci = { class: "todoist-task-menu-header" }, ui = { class: "todoist-task-menu-title" }, pi = { class: "todoist-menu-text" }, mi = { class: "todoist-menu-badge" }, vi = {
  key: 0,
  class: "todoist-labels-panel"
}, fi = { class: "todoist-labels-quick-input" }, gi = ["placeholder", "onKeydown"], bi = { class: "todoist-labels-chip-grid" }, ki = ["onClick"], yi = {
  key: 0,
  class: "chip-check"
}, hi = { class: "todoist-menu-text" }, wi = {
  key: 1,
  class: "todoist-recur-panel"
}, Ti = { class: "todoist-recur-grid" }, Di = ["onClick"], xi = { class: "todoist-recur-custom-row" }, Ci = ["onKeydown"], _i = { class: "todoist-menu-text" }, Si = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, $i = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Ii = {
  key: 2,
  class: "todoist-color-panel"
}, Pi = { class: "todoist-color-grid" }, Ri = ["title", "onClick"], Li = { class: "todoist-color-name" }, Oi = { class: "todoist-menu-text" }, Ei = ["disabled", "onClick"], Mi = { class: "todoist-project-flyout-name" }, Ai = {
  key: 0,
  class: "todoist-menu-badge"
}, ji = { class: "todoist-menu-text" }, Wi = { class: "todoist-dialog-title" }, Ui = ["title"], Vi = { class: "todoist-dialog-body" }, Bi = {
  key: 0,
  class: "todoist-dialog-desc"
}, Ni = ["placeholder", "onKeydown"], Hi = { class: "todoist-dialog-foot" }, zi = { class: "todoist-dialog-icon" }, Fi = { class: "todoist-dialog-title" }, Ki = ["title"], Yi = { class: "todoist-dialog-body" }, Gi = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, Xi = { class: "todoist-dialog-danger-text" }, qi = { class: "todoist-dialog-msg" }, Qi = { class: "todoist-dialog-foot" }, Ji = /* @__PURE__ */ Ht({
  __name: "TodoistTaskList",
  setup(a) {
    const s = A(0);
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
    function w(n, o, i) {
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
    function H(n) {
      so.open(n);
    }
    const D = yt, G = A(""), F = A(null), j = A(""), O = A(!1), T = ot(() => j.value ? Uo(j.value) : null), I = A([]);
    function y(n) {
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
    const B = A(null), X = A(""), Q = A(null), z = Zt({
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
    }), J = A(null), ut = A(null), P = Zt({
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
    }), ht = A(null), l = Zt({
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
    }), W = A(null), _ = A(null), M = [
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
      return n && M.find((i) => i.hex.toLowerCase() === n.toLowerCase()) || M[0];
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
      z.isOpen = !1, l.isOpen = !1, l.activeSubpanel = null;
    }
    const {
      draggingTaskId: It,
      dragOverColIndex: Pt,
      dragOverTaskId: qt,
      dragAfterTask: zt,
      isDragPreview: _t,
      previewTasks: Nt,
      onTaskDragStart: U,
      onTaskDragEnd: u,
      onColDragOver: g,
      onColDragLeave: Z,
      onTaskDragOver: Rt,
      onTaskDrop: Wt,
      onColDrop: be
    } = zn({
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
      F.value = it(n, o), j.value = "", O.value = !1, Lt(() => {
        E.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function Qt() {
      h.value || ae();
    }
    function ae() {
      F.value = null, j.value = "", O.value = !1;
      for (const n of I.value)
        try {
          URL.revokeObjectURL(n.previewUrl);
        } catch {
        }
      I.value = [];
    }
    const h = A(!1), b = /* @__PURE__ */ new WeakMap();
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
      if (!q.active || h.value) return;
      const o = [...I.value];
      let E = j.value.trim() || o[0]?.name || "";
      if (!E) return;
      let c, st, N;
      if (T.value && !O.value) {
        const Ot = T.value;
        E = Ot.cleanTitle || E, c = Ot.date, st = Ot.label + (Ot.time ? ` ${Ot.time}` : ""), N = Ot.time ? `${Ot.date} ${Ot.time}` : Ot.date;
      }
      const Dt = F.value, Yt = j.value, St = D.view, Ce = n.projectId || St === "projects" && D.activeProjectId || void 0, _e = n.sectionId !== void 0 ? n.sectionId : void 0;
      h.value = !0;
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
          }) && Dt === F.value && Yt === j.value && o.length === I.value.length && o.every((xt, Se) => xt === I.value[Se]) && ae();
        });
      } catch {
        D.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        h.value = !1;
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
      if (z.isOpen && z.col === n) {
        z.isOpen = !1;
        return;
      }
      l.isOpen = !1;
      const c = i.currentTarget.getBoundingClientRect(), N = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      z.col = n, z.x = N, z.y = Dt, z.canMoveLeft = o > 0 && !!D.columns[o - 1]?.sectionId, z.canMoveRight = o < D.columns.length - 1 && !!D.columns[o + 1]?.sectionId, z.isOpen = !0;
    }
    function Ae(n, o) {
      z.isOpen = !1, et.dispatch("move-section", { sectionId: n.sectionId, direction: o });
    }
    function je(n, o, i) {
      if (D.movingTaskId === n.id || n.completed) return;
      z.isOpen = !1;
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
        W.value?.focus(), W.value?.select();
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
      const o = l.task.id, i = M.find((E) => E.id === n);
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
      const i = o || { x: z.x, y: z.y };
      z.isOpen = !1;
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
      const i = o || { x: z.x, y: z.y };
      z.isOpen = !1;
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
      n.key === "Escape" && (L.isOpen && le(), P.isOpen && pe(), l.isOpen && (l.isOpen = !1, l.activeSubpanel = null), z.isOpen && (z.isOpen = !1));
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
      e(D).moveError && e(D).moveMessage ? (r(), p("p", Gn, v(e(D).moveMessage), 1)) : C("", !0),
      e(D).emptyText && e(D).columns.length > 0 && !e(D).loading ? (r(), p("p", Xn, v(e(f)("todoist.tasksRetained", { text: e(D).emptyText })), 1)) : C("", !0),
      e(D).loading && e(D).columns.length === 0 ? (r(), p("p", qn, v(e(f)("common.loading")), 1)) : e(D).emptyText && e(D).columns.length === 0 ? (r(), p("p", Qn, v(e(D).emptyText), 1)) : e(D).view === "projects" && e(D).projects.length === 0 ? (r(), p("div", Jn, [
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
        e(D).view === "projects" && e(D).projects.length ? (r(), p("div", Zn, [
          t("div", ts, [
            t("div", es, [
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
                t("span", ns, v(i.name), 1)
              ], 10, os))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => Ne(i))
              }, "＋ 新建项目")
            ]),
            bt.value ? (r(), p("div", ss, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(f)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => bo(bt.value, i))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", as, v(e(f)("common.rename")), 1)
              ], 8, is),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(f)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => yo(bt.value, i))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", rs, v(e(f)("todoist.deleteProject")), 1)
              ], 8, ls)
            ])) : C("", !0)
          ])
        ])) : C("", !0),
        t("div", ds, [
          (r(!0), p(at, null, dt(e(D).columns, (i, E) => (r(), p("section", {
            key: i.sectionId || i.title || E,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": E
          }, [
            t("header", us, [
              t("h3", null, [
                Vt(v(i.title) + " ", 1),
                t("span", null, v(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: K((c) => ro(i, E, c), ["stop"])
              }, "•••", 8, ps)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => we(i, E, c)
            }, "＋ 添加任务", 8, ms),
            F.value === it(i, E) ? (r(), p("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: K((c) => Kt(i), ["prevent"])
            }, [
              Mt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (c) => j.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (c) => lo(c, i),
                onPaste: o[5] || (o[5] = (c) => y(c))
              }, null, 40, fs), [
                [Gt, j.value]
              ]),
              T.value ? (r(), p("div", {
                key: 0,
                class: tt(["todoist-composer-date-hint", { "is-ignored": O.value }])
              }, [
                t("div", gs, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", bs, [
                    Vt(v(T.value.label) + v(T.value.time ? " " + T.value.time : "") + " ", 1),
                    t("span", ks, "(" + v(T.value.formattedDate) + ")", 1)
                  ]),
                  O.value ? (r(), p("span", hs, " (已忽略日期，按纯文本创建) ")) : (r(), p("span", ys, [
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
              I.value.length > 0 ? (r(), p("div", ws, [
                (r(!0), p(at, null, dt(I.value, (c, st) => (r(), p("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Ts),
                  t("span", Ds, v(c.name), 1),
                  c.uploading ? (r(), p("span", xs, "上传中…")) : C("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (N) => R(st)
                  }, "×", 8, Cs)
                ]))), 128))
              ])) : C("", !0),
              t("div", _s, [
                t("button", {
                  type: "button",
                  disabled: h.value,
                  onClick: Qt
                }, v(e(f)("common.cancel")), 9, Ss),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: h.value
                }, v(h.value ? I.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, $s)
              ])
            ], 40, vs)) : C("", !0),
            te(Yn, {
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
                i.tasks.length === 0 && e(Pt) !== E ? (r(), p("p", Is, " 暂无任务 · 可拖到这里 ")) : C("", !0)
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
                  onDragstart: (N) => e(U)(N, c, i, st),
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
                  }, null, 10, Rs),
                  t("div", Ls, [
                    e(D).movingTaskId === c.id ? (r(), p("span", Os, "保存中")) : C("", !0),
                    m(c.id, c.description).length ? (r(), p("div", Es, [
                      (r(!0), p(at, null, dt(m(c.id, c.description), (N) => (r(), p("button", {
                        key: N.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + N.fullName + " · 点击在插件内查看详情",
                        onClick: K((Dt) => H(N.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", As, v(N.fullName), 1)
                      ], 8, Ms))), 128))
                    ])) : C("", !0),
                    w(c.id, c.description, c.content).length ? (r(), p("div", js, [
                      (r(!0), p(at, null, dt(w(c.id, c.description, c.content), (N) => (r(), p("button", {
                        key: N.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + N.title + " · 点击立即播放",
                        onClick: K((Dt) => $(N), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", Us, v(N.title), 1)
                      ], 8, Ws))), 128))
                    ])) : C("", !0),
                    x(c.id, c.description, c.content).length ? (r(), p("div", Vs, [
                      (r(!0), p(at, null, dt(x(c.id, c.description, c.content), (N) => (r(), p("button", {
                        key: N.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (N.title || N.url) + " · 点击直接打开",
                        onClick: K((Dt) => V(N.url), ["stop"])
                      }, [
                        o[36] || (o[36] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", Ns, v(N.title || N.url), 1)
                      ], 8, Bs))), 128))
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
                    }, null, 40, Hs)), [
                      [Gt, X.value]
                    ]) : (r(), p("p", zs, v(c.content || "未命名任务"), 1)),
                    mt(c) ? (r(), p("p", Fs, v(mt(c)), 1)) : C("", !0),
                    Bt(c) ? (r(), p("div", Ks, [
                      c.startDate && !c.dueDate ? (r(), p("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + v(e(Ie)(c.startDate)) + " 起 ", 9, Ys)) : c.startDate && c.dueDate ? (r(), p("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + v(e(Ie)(c.startDate)) + " ~ " + v(e(Ie)(c.dueDate)), 9, Gs)) : c.dueText ? (r(), p("span", {
                        key: 2,
                        class: tt(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, v(c.isRecurring ? "↻ " : "▣ ") + v(c.dueText), 11, Xs)) : C("", !0),
                      (r(!0), p(at, null, dt((c.labels || []).slice(0, 3), (N) => (r(), p("span", {
                        key: N,
                        class: "todoist-board-label"
                      }, "◇ " + v(N), 1))), 128)),
                      c.timedDeadlineText ? (r(), p("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + v(c.timedDeadlineText), 9, qs)) : C("", !0),
                      c.extraCountText ? (r(), p("span", Qs, v(c.extraCountText), 1)) : C("", !0)
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
                      }, null, 8, Zs),
                      o[37] || (o[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, Js)) : C("", !0)
                  ])
                ], 46, Ps)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, cs))), 128)),
          e(D).view === "inbox" || e(D).view === "projects" ? (r(), p("div", ti, [
            e(D).addingSection ? (r(), p("div", ei, [
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
              }, null, 40, oi), [
                [Gt, G.value]
              ]),
              t("div", ni, [
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
      z.isOpen && z.col ? (r(), p("div", {
        key: 6,
        class: "todoist-section-menu",
        style: gt({ left: z.x + "px", top: z.y + "px" }),
        onClick: o[16] || (o[16] = K(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (i) => ko(z.col, i))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", si, v(e(f)("todoist.menu.renameSection")), 1)
        ]),
        z.col.sectionId ? (r(), p("div", ii, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !z.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (i) => Ae(z.col, -1))
          }, v(e(f)("todoist.menu.moveLeft")), 9, ai),
          o[40] || (o[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !z.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (i) => Ae(z.col, 1))
          }, v(e(f)("todoist.menu.moveRight")), 9, li)
        ])) : C("", !0),
        z.col.sectionId ? (r(), p("div", ri)) : C("", !0),
        z.col.sectionId ? (r(), p("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (i) => ho(z.col, i))
        }, [
          o[41] || (o[41] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", di, v(e(f)("todoist.menu.deleteSection")), 1)
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
        t("div", ci, [
          t("span", ui, v(l.task.content || e(f)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (i) => ue("labels"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", pi, v(e(f)("todoist.menu.cloudLabels")), 1),
          t("span", mi, v(l.task.labels && l.task.labels.length ? e(f)("todoist.menu.labelsSelected", { count: l.task.labels.length }) : e(f)("todoist.menu.labelsNone")), 1)
        ], 2),
        l.activeSubpanel === "labels" ? (r(), p("div", vi, [
          t("div", fi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (i) => l.newLabelText = i),
              type: "text",
              placeholder: e(f)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: $t(K(Ue, ["prevent"]), ["enter"])
            }, null, 40, gi), [
              [Gt, l.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Ue
            }, "＋")
          ]),
          t("div", bi, [
            (r(!0), p(at, null, dt(vt.value, (i) => (r(), p("button", {
              key: i,
              type: "button",
              class: tt(["todoist-label-chip", { selected: We(i) }]),
              onClick: (E) => co(i)
            }, [
              t("span", null, "◇ " + v(i), 1),
              We(i) ? (r(), p("span", yi, "✓")) : C("", !0)
            ], 10, ki))), 128))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (i) => ue("recur"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", hi, v(e(f)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: gt(l.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, v(l.task.isRecurring ? l.task.dueString || e(f)("todoist.recur.recurring") : e(f)("todoist.menu.labelsNone")), 5)
        ], 2),
        l.activeSubpanel === "recur" ? (r(), p("div", wi, [
          t("div", Ti, [
            (r(), p(at, null, dt(Y, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: tt(["todoist-recur-chip", { selected: uo(i.rule) }]),
              onClick: (E) => po(i.rule, i.label)
            }, [
              t("span", null, v(i.icon), 1),
              t("span", null, v(i.label), 1)
            ], 10, Di)), 64))
          ]),
          t("div", xi, [
            Mt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (i) => l.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: $t(K(Ve, ["prevent"]), ["enter"])
            }, null, 40, Ci), [
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
          t("span", _i, v(e(f)("todoist.menu.pickColor")), 1),
          t("span", Si, [
            pt.value.id === "none" ? (r(), p("span", $i, "⊘")) : (r(), p("span", {
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
        l.activeSubpanel === "color" ? (r(), p("div", Ii, [
          t("div", Pi, [
            (r(), p(at, null, dt(M, (i) => t("button", {
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
              t("span", Li, v(i.name), 1)
            ], 10, Ri)), 64))
          ])
        ])) : C("", !0),
        t("button", {
          type: "button",
          class: tt(["todoist-task-menu-item", { active: l.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (i) => ue("project"))
        }, [
          o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Oi, v(e(f)("todoist.menu.moveToProject")), 1),
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
            t("span", Mi, v(i.name), 1),
            String(i.id) === nt.value ? (r(), p("span", Ai, v(e(f)("todoist.menu.currentBadge")), 1)) : C("", !0)
          ], 10, Ei))), 128))
        ], 6)) : C("", !0),
        o[49] || (o[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: go
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", ji, v(l.task.isRecurring ? e(f)("todoist.menu.deleteRecurringTask") : e(f)("todoist.menu.deleteTask")), 1)
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
          t("h3", Wi, v(L.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(f)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ui)
        ], 32),
        t("div", Vi, [
          L.message ? (r(), p("p", Bi, v(L.message), 1)) : C("", !0),
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
          }, null, 40, Ni), [
            [Gt, L.value]
          ])
        ]),
        t("div", Hi, [
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
          t("span", zi, v(P.icon || "⚠️"), 1),
          t("h3", Fi, v(P.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(f)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Ki)
        ], 32),
        t("div", Yi, [
          P.danger ? (r(), p("div", Gi, [
            t("div", Xi, v(P.alertText), 1)
          ])) : C("", !0),
          t("p", qi, v(P.message), 1)
        ]),
        t("div", Qi, [
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
}), Zi = /* @__PURE__ */ ne(Ji, [["__scopeId", "data-v-0e73dbcb"]]), to = {
  activePopover: "none",
  isDescEditing: !1
};
class ta {
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
const ea = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, oa = { class: "reminder-shortcuts" }, na = ["disabled"], sa = { class: "reminder-preview" }, ia = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, aa = ["disabled"], la = ["disabled"], ra = ["disabled"], da = /* @__PURE__ */ Ht({
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
    const d = a, m = s, w = d.value || (d.taskDate ? d.taskDate + "T" + (d.taskTime || "09:00") : ""), x = A(w.slice(0, 10)), V = A(w.slice(11, 16)), $ = A(!1), H = A(""), D = A(!0), G = ot(() => x.value && V.value ? (/* @__PURE__ */ new Date(x.value + "T" + V.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function F(O) {
      if ($.value) return;
      const T = /* @__PURE__ */ new Date();
      O === "tomorrow" ? (T.setDate(T.getDate() + 1), T.setHours(9, 0, 0, 0)) : T.setTime(T.getTime() + O * 6e4), x.value = `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`, V.value = `${String(T.getHours()).padStart(2, "0")}:${String(T.getMinutes()).padStart(2, "0")}`, H.value = "", D.value = !0;
    }
    async function j(O) {
      if (!($.value || q.pendingWrites)) {
        if (O && (!Number.isFinite(Date.parse(O)) || Date.parse(O) <= Date.now())) {
          H.value = "请选择未来的提醒时间。";
          return;
        }
        if (k.taskId === d.taskId) {
          $.value = !0, H.value = "";
          try {
            if (await rt.setReminder(O), k.taskId !== d.taskId) return;
            k.error ? H.value = k.error : k.reminderTime === O && m("close");
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
        t("section", ea, [
          T[11] || (T[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", oa, [
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
          ], 8, na),
          t("div", sa, v(G.value || "选择提醒的日期和时间"), 1),
          T[12] || (T[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          H.value ? (r(), p("p", ia, v(H.value), 1)) : C("", !0),
          t("footer", null, [
            a.value ? (r(), p("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: $.value || !!e(q).pendingWrites,
              onClick: T[6] || (T[6] = (I) => j(""))
            }, "移除提醒", 8, aa)) : C("", !0),
            t("button", {
              type: "button",
              disabled: $.value,
              onClick: T[7] || (T[7] = (I) => m("close"))
            }, "取消", 8, la),
            t("button", {
              type: "button",
              class: "save",
              disabled: $.value || !!e(q).pendingWrites || !x.value || !V.value || !D.value,
              onClick: T[8] || (T[8] = (I) => j(x.value + "T" + V.value))
            }, v($.value ? "保存中…" : "设置提醒"), 9, ra)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), ca = /* @__PURE__ */ ne(da, [["__scopeId", "data-v-da9e3ddd"]]), ua = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, pa = { class: "inspector-main-col" }, ma = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, va = {
  key: 1,
  class: "inspector-repo-badges"
}, fa = ["title", "onClick"], ga = { class: "repo-badge-name" }, ba = { class: "inspector-section inspector-title-section" }, ka = { class: "task-title-row" }, ya = ["title"], ha = {
  key: 0,
  class: "check-mark"
}, wa = ["value", "aria-label", "disabled", "placeholder"], Ta = ["value", "placeholder", "disabled"], Da = ["onKeydown"], xa = {
  key: 0,
  class: "desc-placeholder-btn"
}, Ca = ["innerHTML"], _a = {
  key: 2,
  role: "status"
}, Sa = {
  key: 3,
  class: "attached-img-grid"
}, $a = ["onClick"], Ia = ["src", "alt"], Pa = { class: "attached-img-info" }, Ra = ["onClick"], La = { class: "inspector-section inspector-subtasks-section" }, Oa = {
  key: 0,
  class: "subtasks-list"
}, Ea = ["onClick"], Ma = {
  key: 0,
  class: "check-tick"
}, Aa = { class: "subtask-content-text" }, ja = ["title", "onClick"], Wa = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Ua = ["value", "placeholder"], Va = { class: "subtask-actions" }, Ba = { class: "inspector-section inspector-comments-section" }, Na = { class: "comment-input-bar" }, Ha = { class: "comment-input-wrap" }, za = ["value", "placeholder", "disabled"], Fa = ["title"], Ka = ["disabled"], Ya = {
  key: 0,
  class: "comments-list"
}, Ga = { class: "comment-item-content" }, Xa = { class: "comment-item-header" }, qa = { class: "comment-time" }, Qa = { class: "comment-text" }, Ja = {
  key: 0,
  class: "comment-attached-thumb"
}, Za = ["src", "onClick"], tl = { class: "inspector-side-col" }, el = { class: "side-prop-group date-picker-anchor" }, ol = { class: "row-text" }, nl = { class: "side-prop-group date-picker-anchor" }, sl = { class: "row-text" }, il = ["title"], al = { class: "side-prop-group" }, ll = { class: "side-prop-label" }, rl = { class: "row-text" }, dl = { class: "inspector-menu" }, cl = ["disabled", "onClick"], ul = { key: 0 }, pl = { class: "side-prop-group" }, ml = { class: "side-prop-label" }, vl = { class: "row-text" }, fl = { class: "inspector-menu" }, gl = ["placeholder", "aria-label", "onKeydown"], bl = { key: 0 }, kl = {
  key: 1,
  role: "alert"
}, yl = { class: "label-options-list" }, hl = ["checked", "disabled", "onChange"], wl = ["disabled"], Tl = { key: 3 }, Dl = { class: "side-prop-group" }, xl = { class: "side-prop-label" }, Cl = { class: "row-text" }, _l = /* @__PURE__ */ Ht({
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
    const d = a, m = s, w = new ta(), x = zo(w), V = ot(() => x.value.isDescEditing), $ = ot(() => x.value.activePopover === "start_date"), H = ot(() => x.value.activePopover === "due_date"), D = ot(() => x.value.activePopover === "priority"), G = ot(() => x.value.activePopover === "labels"), F = ot(() => x.value.activePopover === "reminder"), j = A(null), O = A(null);
    let T;
    oe(() => {
      Ho();
      let U = -1;
      T = new ResizeObserver((u) => {
        const g = u[0]?.contentRect.width;
        g !== U && (U = g, R(O.value), R(j.value));
      }), O.value?.parentElement && T.observe(O.value.parentElement);
    }), jt(() => {
      T?.disconnect(), w.send({ type: "RESET_ALL" });
    });
    const I = ot(() => {
      if (!d.editDescription) return "";
      const U = d.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), u = document.createElement("template");
      u.innerHTML = Fo.renderMarkdown(U);
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
    function y() {
      w.send({ type: "START_DESC_EDIT" }), Lt(() => {
        R(j.value), j.value?.focus();
      });
    }
    function R(U) {
      U && (U.style.height = "auto", U.style.height = U.scrollHeight + "px");
    }
    function B(U) {
      R(U.el);
    }
    function X(U) {
      const u = U.target;
      R(u), m("update:editDescription", u.value), m("scheduleDraftSave", U);
    }
    function Q() {
      m("saveTitleAndDesc"), w.send({ type: "FINISH_DESC_EDIT" });
    }
    const z = A(null), L = A(null), J = A(""), ut = A(null), P = A(null), ht = A(null), l = A([]), W = A(!1), _ = A("");
    let M;
    ct(() => [d.state.taskId, G.value], async (U, u, g) => {
      if (M?.abort(), !G.value) return;
      const Z = new AbortController();
      M = Z, g(() => Z.abort()), l.value = [], W.value = !0, _.value = "";
      try {
        const Rt = await lt.getLabels(Z.signal);
        Z.signal.aborted || (l.value = Rt.map((Wt) => Wt.name));
      } catch {
        Z.signal.aborted || (_.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        Z.signal.aborted || (W.value = !1);
      }
    });
    function Y() {
      w.send({ type: "OPEN_POPOVER", popover: "reminder" });
    }
    const nt = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function bt(U) {
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
    function vt(U) {
      w.send({ type: "CLOSE_POPOVER" }), m("selectPriority", U);
    }
    const pt = ot(() => {
      const U = /* @__PURE__ */ new Set([...l.value, ...d.availableLabels || []]);
      for (const u of d.state.labels || []) U.add(u);
      return Array.from(U);
    }), it = ot(() => {
      const U = J.value.trim().toLowerCase();
      return U ? pt.value.filter((u) => u.toLowerCase().includes(U)) : pt.value;
    });
    function Ct() {
      const U = J.value.trim();
      U && (m("createLabel", U), J.value = "");
    }
    function Bt(U, u) {
      Ee.open(U, u);
    }
    const wt = A(0);
    function It() {
      wt.value++;
    }
    oe(() => {
      window.addEventListener("storage", It), window.addEventListener("todoist-repository-links-changed", It);
    }), jt(() => {
      window.removeEventListener("storage", It), window.removeEventListener("todoist-repository-links-changed", It);
    });
    const Pt = ot(() => (wt.value, no(d.state.taskId, d.editDescription)));
    function qt(U) {
      so.open(U);
    }
    function zt(U, u) {
      if (!U) return "";
      try {
        const g = U.split("-"), Z = parseInt(g[1], 10), Rt = parseInt(g[2], 10), Wt = u ? ` ${u}` : "";
        return `${Z}月${Rt}日${Wt}`;
      } catch {
        return U;
      }
    }
    function _t(U) {
      if (!U) return "";
      try {
        const u = new Date(U);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    function Nt(U) {
      if (!U) return "刚刚";
      try {
        const u = new Date(U);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return U;
      }
    }
    return (U, u) => a.state.isOpen ? (r(), p("div", ua, [
      t("main", pa, [
        a.state.error ? (r(), p("p", ma, v(a.state.error), 1)) : C("", !0),
        Pt.value.length ? (r(), p("div", va, [
          (r(!0), p(at, null, dt(Pt.value, (g) => (r(), p("button", {
            key: g.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(f)("todoist.linkRepoTitle", { name: g.fullName }),
            onClick: (Z) => qt(g.fullName)
          }, [
            u[38] || (u[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", ga, v(g.fullName), 1),
            u[39] || (u[39] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, fa))), 128))
        ])) : C("", !0),
        t("section", ba, [
          t("div", ka, [
            t("button", {
              type: "button",
              class: tt(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: e(f)("todoist.toggleComplete"),
              onClick: u[0] || (u[0] = (g) => m("toggleComplete"))
            }, [
              a.isTaskCompleted ? (r(), p("span", ha, "✓")) : C("", !0)
            ], 10, ya),
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
            }, null, 42, wa)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: u[7] || (u[7] = K((g) => m("dragover"), ["prevent"])),
          onDragleave: u[8] || (u[8] = K((g) => m("dragleave"), ["prevent"])),
          onDrop: u[9] || (u[9] = K((g) => m("dropImage", g), ["prevent"]))
        }, [
          V.value ? (r(), p("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: j,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(f)("todoist.taskDesc"),
            disabled: a.isUploadingImg,
            onInput: X,
            onCompositionend: u[5] || (u[5] = (g) => m("scheduleDraftSave", g)),
            onBlur: Q,
            onPaste: u[6] || (u[6] = (g) => m("descPaste", g))
          }, null, 40, Ta)) : (r(), p("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: y,
            onKeydown: $t(K(y, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (r(), p("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: I.value
            }, null, 8, Ca)) : (r(), p("span", xa, "≡ 描述"))
          ], 40, Da)),
          a.isUploadingImg ? (r(), p("small", _a, "图片上传中…")) : C("", !0),
          a.attachedImages.length ? (r(), p("div", Sa, [
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
                }, null, 8, Ia)
              ], 8, $a),
              t("div", Pa, [
                t("span", null, v(g.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Z) => m("removeAttachedImage", g.url)
                }, "×", 8, Ra)
              ])
            ]))), 128))
          ])) : C("", !0)
        ], 32),
        t("section", La, [
          a.subtasks.length > 0 ? (r(), p("div", Oa, [
            (r(!0), p(at, null, dt(a.subtasks, (g) => (r(), p("div", {
              key: g.id,
              class: tt(["subtask-row-item", { done: g.completed }])
            }, [
              t("button", {
                type: "button",
                class: tt(["subtask-check-circle", { checked: g.completed }]),
                onClick: (Z) => m("toggleSubtask", g.id)
              }, [
                g.completed ? (r(), p("span", Ma, "✓")) : C("", !0)
              ], 10, Ea),
              t("span", Aa, v(g.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(f)("todoist.subtask.delete"),
                onClick: (Z) => m("removeSubtask", g.id)
              }, "×", 8, ja)
            ], 2))), 128))
          ])) : C("", !0),
          a.isAddingSubtask ? (r(), p("div", Wa, [
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
            }, null, 40, Ua),
            t("div", Va, [
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
        t("section", Ba, [
          t("div", Na, [
            u[41] || (u[41] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Ha, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(f)("todoist.comment.placeholder"),
                disabled: a.isSubmittingComment,
                onInput: u[16] || (u[16] = (g) => m("update:newCommentText", g.target.value)),
                onKeydown: u[17] || (u[17] = $t(K((g) => m("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, za),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(f)("todoist.comment.attachPhoto"),
                onClick: u[18] || (u[18] = K((g) => m("triggerFileInput"), ["stop"]))
              }, "📎", 8, Fa)
            ]),
            a.newCommentText.trim() ? (r(), p("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: u[19] || (u[19] = (g) => m("submitComment"))
            }, v(e(f)("todoist.comment.send")), 9, Ka)) : C("", !0)
          ]),
          a.state.comments.length > 0 ? (r(), p("div", Ya, [
            (r(!0), p(at, null, dt(a.state.comments, (g) => (r(), p("div", {
              key: g.id,
              class: "comment-item"
            }, [
              u[43] || (u[43] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", Ga, [
                t("div", Xa, [
                  u[42] || (u[42] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", qa, v(Nt(g.postedAt)), 1)
                ]),
                t("div", Qa, v(g.content), 1),
                g.attachment?.url ? (r(), p("div", Ja, [
                  t("img", {
                    src: g.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Z) => Bt(g.attachment.url, g.attachment.name)
                  }, null, 8, Za)
                ])) : C("", !0)
              ])
            ]))), 128))
          ])) : C("", !0)
        ])
      ]),
      t("aside", tl, [
        t("div", el, [
          u[45] || (u[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: z,
            type: "button",
            class: tt(["side-item-row click-row", { active: $.value, filled: !!a.editStartDate }]),
            onClick: u[21] || (u[21] = (g) => e(w).send({ type: "TOGGLE_POPOVER", popover: "start_date" }))
          }, [
            u[44] || (u[44] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", ol, v(zt(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (r(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: u[20] || (u[20] = K((g) => m("clearStartDate"), ["stop"]))
            }, "×")) : C("", !0)
          ], 2),
          $.value ? (r(), At(Oe, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": z.value,
            "onUpdate:modelValue": u[22] || (u[22] = (g) => m("update:editStartDate", g)),
            "onUpdate:timeValue": u[23] || (u[23] = (g) => m("update:editStartTime", g)),
            onChange: u[24] || (u[24] = (g) => m("startChange")),
            onClose: u[25] || (u[25] = (g) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", nl, [
          u[47] || (u[47] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: L,
            type: "button",
            class: tt(["side-item-row click-row", { active: H.value, filled: !!a.editDueDate }]),
            onClick: u[27] || (u[27] = (g) => e(w).send({ type: "TOGGLE_POPOVER", popover: "due_date" }))
          }, [
            u[46] || (u[46] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", sl, v(zt(a.editDueDate, a.editDueTime) || e(f)("todoist.prop.setDueDate")), 1),
            a.editDueDate ? (r(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(f)("todoist.prop.clearDueDate"),
              onClick: u[26] || (u[26] = K((g) => m("clearDueDate"), ["stop"]))
            }, "×", 8, il)) : C("", !0)
          ], 2),
          H.value ? (r(), At(Oe, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": L.value,
            "onUpdate:modelValue": u[28] || (u[28] = (g) => m("update:editDueDate", g)),
            "onUpdate:timeValue": u[29] || (u[29] = (g) => m("update:editDueTime", g)),
            onChange: u[30] || (u[30] = (g) => m("dueChange")),
            onClose: u[31] || (u[31] = (g) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : C("", !0)
        ]),
        t("div", al, [
          t("span", ll, v(e(f)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: ht,
            type: "button",
            class: "side-item-row",
            onClick: u[32] || (u[32] = (g) => e(w).send({ type: "TOGGLE_POPOVER", popover: "priority" }))
          }, [
            t("span", {
              style: gt({ color: bt(a.state.priority) })
            }, "⚑", 4),
            t("span", rl, "P" + v(5 - a.state.priority), 1),
            u[48] || (u[48] = t("span", null, "⌄", -1))
          ], 512),
          D.value ? (r(), At(Le, {
            key: 0,
            anchor: ht.value,
            onClose: u[33] || (u[33] = (g) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: de(() => [
              t("div", dl, [
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
                  a.state.priority === g.level ? (r(), p("span", ul, "✓")) : C("", !0)
                ], 8, cl)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", pl, [
          t("span", ml, v(e(f)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: ut,
            type: "button",
            class: "side-item-row",
            onClick: u[34] || (u[34] = (g) => e(w).send({ type: "TOGGLE_POPOVER", popover: "labels" }))
          }, [
            t("span", vl, v(a.state.labels.join("、") || e(f)("todoist.prop.addLabels")), 1),
            u[49] || (u[49] = t("span", null, "＋", -1))
          ], 512),
          G.value ? (r(), At(Le, {
            key: 0,
            anchor: ut.value,
            onClose: u[36] || (u[36] = (g) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: de(() => [
              t("div", fl, [
                Mt(t("input", {
                  "onUpdate:modelValue": u[35] || (u[35] = (g) => J.value = g),
                  placeholder: e(f)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(f)("todoist.prop.searchLabelAria"),
                  onKeydown: $t(K(Ct, ["prevent"]), ["enter"])
                }, null, 40, gl), [
                  [Gt, J.value]
                ]),
                W.value ? (r(), p("small", bl, v(e(f)("todoist.prop.readingLabels")), 1)) : C("", !0),
                _.value ? (r(), p("p", kl, v(_.value), 1)) : C("", !0),
                t("div", yl, [
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
                    }, null, 40, hl)
                  ]))), 128))
                ]),
                J.value.trim() && !pt.value.includes(J.value.trim()) ? (r(), p("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: Ct
                }, v(e(f)("todoist.prop.createLabelBtn", { name: J.value.trim() })), 9, wl)) : C("", !0),
                !W.value && !it.value.length && !J.value ? (r(), p("small", Tl, v(e(f)("todoist.prop.noLabels")), 1)) : C("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : C("", !0)
        ]),
        t("div", Dl, [
          t("span", xl, [
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
            t("span", Cl, v(_t(a.state.reminderTime) || e(f)("todoist.prop.addReminder")), 1),
            u[50] || (u[50] = t("span", null, "＋", -1))
          ], 512),
          F.value ? (r(), At(ca, {
            key: 0,
            anchor: P.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: u[37] || (u[37] = (g) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : C("", !0)
        ])
      ])
    ])) : C("", !0);
  }
}), Sl = /* @__PURE__ */ ne(_l, [["__scopeId", "data-v-4228b0bd"]]), $l = { class: "inspector-title-row" }, Il = ["title", "aria-label"], Pl = ["disabled"], Rl = ["href"], Ll = "todoistInspectorPositionV2", Ol = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const s = k, d = ot(() => Et.get(s.taskId)), m = ot(() => d.value?.status === "failed" ? "保存未确认" : d.value?.status === "saving" ? "正在保存…" : G.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), w = ot(() => [
      m.value,
      d.value?.status === "failed" ? d.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: x,
      headerRef: V,
      initialStyle: $,
      onHeaderPointerDown: H,
      onResizePointerDown: D
    } = oo({
      windowId: "todoist-inspector",
      storageKey: Ll,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => s.isOpen && q.active
    }), G = A(""), F = A(""), j = A(""), O = A(""), T = A(""), I = A(""), y = A("idle"), R = ot(() => y.value === "uploading_img"), B = ot(() => y.value === "submitting_comment"), X = A(!1), Q = A(null), z = A(!1), L = A(""), J = A(""), ut = ot(() => {
      const h = s.description || "", b = [], S = h.split(`
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
    }), P = ot(() => ut.value.filter((h) => h.completed).length);
    function ht(h) {
      const mt = (s.description || "").split(`
`).filter((Kt) => !Kt.match(/^\s*-\s*\[([ xX])\]/)), Tt = h.map((Kt) => `- [${Kt.completed ? "x" : " "}] ${Kt.text}`), kt = [...mt, ...Tt].join(`
`).trim();
      F.value = kt.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(G.value, kt);
    }
    function l() {
      if (!L.value.trim()) return;
      const h = [...ut.value, {
        id: `st_${Date.now()}`,
        text: L.value.trim(),
        completed: !1
      }];
      L.value = "", z.value = !1, ht(h);
    }
    function W(h) {
      const b = ut.value.map((S) => S.id === h ? { ...S, completed: !S.completed } : S);
      ht(b);
    }
    function _(h) {
      const b = ut.value.filter((S) => S.id !== h);
      ht(b);
    }
    const M = ot(() => {
      for (const h of yt.columns || []) {
        const b = h.tasks.find((S) => S.id === s.taskId);
        if (b) return !!b.completed;
      }
      return !1;
    });
    async function Y() {
      for (const h of yt.columns || []) {
        const b = h.tasks.find((S) => S.id === s.taskId);
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
    function nt(h) {
      rt.setPriority(h);
    }
    function bt(h) {
      rt.toggleLabel(h);
    }
    function vt(h) {
      rt.toggleLabel(h);
    }
    async function pt(h) {
      h.trim() && (s.labels.includes(h.trim()) || await rt.createAndAttachLabel(h.trim()));
    }
    async function it() {
      if (!J.value.trim() || y.value !== "idle") return;
      const h = J.value.trim();
      y.value = "submitting_comment";
      try {
        await rt.addComment(h), J.value = "";
      } finally {
        y.value = "idle";
      }
    }
    ct(() => s.title, (h) => {
      G.value = h || "";
    }, { immediate: !0 }), ct(() => s.description, (h) => {
      F.value = (h || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => s.startDate, (h) => {
      j.value = h || "";
    }, { immediate: !0 }), ct(() => s.startTime, (h) => {
      O.value = h || "";
    }, { immediate: !0 }), ct(() => s.dueDate, (h) => {
      T.value = h || "";
    }, { immediate: !0 }), ct(() => s.dueTime, (h) => {
      I.value = h || "";
    }, { immediate: !0 });
    function Ct() {
      const h = /* @__PURE__ */ new Date();
      return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`;
    }
    function Bt() {
      O.value && !j.value && (j.value = Ct()), rt.setStartDateAndTime(j.value, O.value);
    }
    function wt() {
      O.value = "", Bt();
    }
    function It() {
      j.value = "", O.value = "", Bt();
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
      const h = [], b = /* @__PURE__ */ new Set(), S = s.description || "", mt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Tt;
      for (; (Tt = mt.exec(S)) !== null; ) {
        const kt = Tt[2];
        b.add(kt), h.push({
          name: Tt[1] || "任务照片",
          url: kt
        });
      }
      for (const kt of s.commentAttachments || [])
        b.has(kt.url) || (b.add(kt.url), h.push(kt));
      return h;
    });
    let Nt, U;
    function u() {
      const h = (s.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), b = [F.value.trim(), h].filter(Boolean);
      return {
        taskId: s.taskId,
        title: G.value,
        description: b.join(`

`)
      };
    }
    function g() {
      clearTimeout(Nt), Nt = void 0;
      const h = U;
      if (U = void 0, h?.taskId && h.title.trim())
        return rt.saveTitleAndDesc(h.title, h.description, h.taskId);
    }
    function Z(h) {
      h && "isComposing" in h && h.isComposing || (U = u(), rt.stageTitleDraft(U.taskId, U.title, U.description), clearTimeout(Nt), Nt = setTimeout(g, 800));
    }
    ct(() => s.taskId, () => g(), { flush: "sync" });
    function Rt() {
      g(), rt.close();
    }
    function Wt(h) {
      h && "isComposing" in h && h.isComposing || g();
    }
    function be() {
      U = u(), g();
    }
    function ke(h) {
      const b = ie(h);
      b && (h.preventDefault(), h.stopPropagation(), Ft(b));
    }
    function ye() {
      q.active && Q.value?.click();
    }
    async function he(h) {
      const b = h.target;
      if (!q.active) {
        b.value = "";
        return;
      }
      const S = b.files?.[0];
      S && await Ft(S), b.value = "";
    }
    async function se(h) {
      X.value = !1;
      const b = h.dataTransfer?.files?.[0];
      b && (b.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(b.name)) && await Ft(b);
    }
    function ie(h) {
      const b = h.clipboardData;
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
    async function Ft(h) {
      if (y.value !== "idle" || !q.active || !s.taskId) return;
      const b = s.taskId;
      y.value = "uploading_img";
      try {
        if (await g(), s.taskId !== b || !s.isOpen || !q.active) return;
        await rt.attachImageToTask(h);
      } catch (S) {
        s.taskId === b && (s.error = S instanceof Error ? S.message : "上传失败");
      } finally {
        y.value = "idle";
      }
    }
    function we(h) {
      const b = ie(h);
      b && (h.preventDefault(), Ft(b));
    }
    function Qt(h) {
      if (!s.isOpen || !q.active) return;
      const b = ie(h);
      b && (h.preventDefault(), h.stopPropagation(), Ft(b));
    }
    ct(() => q.active, (h) => {
      window.removeEventListener("paste", Qt, { capture: !0 }), h && window.addEventListener("paste", Qt, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), jt(() => {
      g(), window.removeEventListener("paste", Qt, { capture: !0 });
    });
    async function ae(h) {
      const b = s.description || "", S = h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), mt = b.replace(new RegExp(`!\\[[^\\]]*\\]\\(${S}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(s.title, mt);
    }
    return (h, b) => Mt((r(), p("aside", {
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
        onPointerdown: b[2] || (b[2] = (S) => e(H)(S))
      }, [
        t("div", $l, [
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
              title: w.value,
              "aria-label": w.value
            }, v(m.value), 9, Il),
            d.value.status !== "saving" ? (r(), p("button", {
              key: 0,
              type: "button",
              disabled: e(s).saving || !G.value.trim(),
              onClick: K(be, ["stop"])
            }, v(d.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Pl)) : C("", !0)
          ], 32)) : C("", !0),
          e(s).url ? (r(), p("a", {
            key: 1,
            href: e(s).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Rl)) : C("", !0)
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
      e(s).isOpen ? (r(), At(Sl, {
        key: e(s).taskId,
        state: e(s),
        "edit-title": G.value,
        "onUpdate:editTitle": b[3] || (b[3] = (S) => G.value = S),
        "edit-description": F.value,
        "onUpdate:editDescription": b[4] || (b[4] = (S) => F.value = S),
        "edit-start-date": j.value,
        "onUpdate:editStartDate": b[5] || (b[5] = (S) => j.value = S),
        "edit-start-time": O.value,
        "onUpdate:editStartTime": b[6] || (b[6] = (S) => O.value = S),
        "edit-due-date": T.value,
        "onUpdate:editDueDate": b[7] || (b[7] = (S) => T.value = S),
        "edit-due-time": I.value,
        "onUpdate:editDueTime": b[8] || (b[8] = (S) => I.value = S),
        "is-uploading-img": R.value,
        "is-drag-over": X.value,
        "is-task-completed": M.value,
        subtasks: ut.value,
        "completed-subtasks-count": P.value,
        "is-adding-subtask": z.value,
        "onUpdate:isAddingSubtask": b[9] || (b[9] = (S) => z.value = S),
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
        onToggleSubtask: W,
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
}), El = /* @__PURE__ */ ne(Ol, [["__scopeId", "data-v-23532e72"]]), Ml = { class: "vue-todoist-workspace-wrapper" }, Al = ["aria-label"], jl = { class: "todoist-head-title-wrap" }, Wl = { id: "todoist-workspace-title" }, Ul = ["aria-label"], Vl = ["title"], Bl = {
  class: "muted small",
  role: "status"
}, Nl = ["title", "aria-expanded"], Hl = ["title"], zl = ["title"], Fl = ["title"], Kl = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, Yl = { class: "todoist-workspace-cal-area" }, Gl = { class: "todoist-workspace-task-area" }, Xl = "todoistWorkspacePosition", vr = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspace",
  setup(a) {
    const s = A(!1), d = Do(() => import("./TodoistAccountSettings-B1VdTOgO.js")), m = A(!1), w = A(!1), x = A(!document.hidden), V = A(!1), $ = ot(() => q.visible && x.value);
    q.session++, q.active = $.value, ao(
      () => $.value && !yt.movingTaskId,
      ee,
      () => et.loadWorkspace(void 0, void 0, !0)
    );
    let H = !1;
    const D = A(null), G = Lo;
    function F() {
      j.value && (j.value.style.removeProperty("width"), j.value.style.removeProperty("height"), j.value.style.removeProperty("left"), j.value.style.removeProperty("top"), j.value.style.removeProperty("right"), j.value.style.removeProperty("bottom"), j.value.style.removeProperty("margin"), j.value.style.removeProperty("transform"));
    }
    ct(() => q.visible, (_) => {
      _ && (G.isOpen = !0, q.active = x.value, et.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: j,
      headerRef: O,
      initialStyle: T,
      stopInteractions: I,
      onHeaderPointerDown: y,
      onResizePointerDown: R,
      bringToFront: B
    } = oo({
      windowId: "todoist",
      storageKey: Xl,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => $.value
    }), X = () => j.value;
    function Q() {
      ee(), Po(), Ro(), rt.cancelReads(), I(), window.removeEventListener("keydown", J);
    }
    const z = _o(Q);
    function L() {
      x.value = !document.hidden;
    }
    function J(_) {
      _.key === "Escape" && k.isOpen && (_.preventDefault(), _.stopPropagation(), rt.close());
    }
    ct($, (_) => {
      q.active = _, _ ? (window.addEventListener("keydown", J), H || (H = !0, et.loadWorkspace()), Lt(() => {
        $.value && B();
      })) : Q();
    }, { flush: "sync" }), ct(m, (_) => {
      _ && (w.value = !0);
    }), ct([$, s, Xe], ([_, M, Y]) => {
      if (!(!_ || !M || !Y) && (Xe.value = null, Oo("todoist") === Y.transition)) {
        if (q.pendingWrites || k.isOpen && k.taskId !== Y.id) {
          Ao.show({ appName: "Todoist", title: f("todoist.retainDetailTitle"), message: f("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        k.isOpen && k.taskId === Y.id || rt.openTask(Y.id);
      }
    }, { flush: "post" }), oe(() => {
      s.value = !0, V.value && Lt(F), me.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: X }), document.addEventListener("visibilitychange", L), $.value && (window.addEventListener("keydown", J), H || (H = !0, et.loadWorkspace()), Ye.refresh());
    }), jt(() => {
      So(), z(), document.removeEventListener("visibilitychange", L), me.unregister("todoist", X), rt.close(), Object.assign(k, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), et.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), $e.updateState({ title: f("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ye.update([]);
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
    function W() {
      q.visible = !1, G.isOpen = !1, me.close("todoist");
    }
    return (_, M) => (r(), p("div", Ml, [
      Mt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: j,
        class: "card wide todoist-workspace",
        style: gt(e(T)),
        "aria-label": e(f)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: O,
          class: "todoist-workspace-head",
          onPointerdown: M[4] || (M[4] = (Y) => e(y)(Y))
        }, [
          t("div", jl, [
            M[10] || (M[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Wl, v(e(G).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(f)("todoist.viewAria")
          }, [
            te(qo)
          ], 8, Ul),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: tt(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(G).isCalendarOpen }]),
            type: "button",
            title: e(f)("todoist.calendarToggleTitle"),
            onClick: ut
          }, " 📅 " + v(e(f)("todoist.calendar")), 11, Vl),
          M[11] || (M[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Bl, v(e(q).pendingWrites ? e(f)("todoist.pendingWrites") : e(f)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: D,
            type: "button",
            class: "no-drag",
            title: e(f)("todoist.settingsTitle"),
            "aria-expanded": m.value,
            onClick: M[0] || (M[0] = K((Y) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Nl),
          w.value ? (r(), At(e(d), {
            key: 0,
            visible: $.value && m.value,
            anchor: D.value,
            onClose: M[1] || (M[1] = (Y) => m.value = !1),
            onAccountSaved: ht
          }, null, 8, ["visible", "anchor"])) : C("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: e(f)("common.refresh"),
            onClick: P
          }, " ↻ ", 8, Hl),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(f)("todoist.minimizeHint"),
            onPointerdown: M[2] || (M[2] = K(() => {
            }, ["stop"])),
            onClick: K(l, ["stop"])
          }, " − ", 40, zl),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(f)("todoist.closeHint"),
            onPointerdown: M[3] || (M[3] = K(() => {
            }, ["stop"])),
            onClick: K(W, ["stop"])
          }, " ✕ ", 40, Fl)
        ], 544),
        e(yt).accountConfigured === !1 ? (r(), At(Eo, {
          key: 0,
          icon: "✅",
          title: e(f)("todoist.tokenMissingTitle"),
          description: e(f)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(f)("todoist.getToken"),
          onConfigure: M[5] || (M[5] = (Y) => m.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (r(), p("div", Kl, [
          Mt(t("div", Yl, [
            te(Hn)
          ], 512), [
            [Re, e(G).isCalendarOpen]
          ]),
          t("div", Gl, [
            te(Zi)
          ])
        ])),
        te(El),
        M[12] || (M[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        V.value ? C("", !0) : (r(), p(at, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: M[6] || (M[6] = (Y) => e(R)(Y, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: M[7] || (M[7] = (Y) => e(R)(Y, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: M[8] || (M[8] = (Y) => e(R)(Y, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: M[9] || (M[9] = (Y) => e(R)(Y, "w"))
          }, null, 32)
        ], 64))
      ], 12, Al), [
        [Re, e(q).visible]
      ])
    ]));
  }
});
export {
  vr as default
};
