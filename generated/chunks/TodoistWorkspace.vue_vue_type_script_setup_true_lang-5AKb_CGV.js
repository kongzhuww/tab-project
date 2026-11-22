import { d as Ht, f as l, g as p, F as it, h as t, u as e, q as Z, t as f, r as te, w as ct, e as Et, o as oe, m as Vt, i as dt, k as X, j as _, b as M, K as io, J as Re, n as bt, s as tt, x as It, p as Lt, v as Yt, B as Gt, A as se, I as Le, l as Ot, z as Oe, D as Io } from "./vendor-vue-_upDT3S_.js";
import { a as Po, t as q, w as Ro, o as Lo, p as Oo } from "./module-state-BGAOq8La.js";
import { b as Xe, i as qe, j as ee, k as Tt, e as ot, d as wt, c as Eo, l as Mo, t as $e, g as Qe, h as Ao, m as jo, n as Wo } from "./calendar.service-l2hESSGs.js";
import { u as ao } from "./useWindowDraggable-DlE89hnn.js";
import { w as pe, b as Uo } from "./window-manager.store-D2fEf4ic.js";
import { t as g, _ as ne, i as Ee, a as Bo, o as qt } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { A as Vo } from "./AccountSetupGuide-BPwrQLXi.js";
import { i as We } from "./image-viewer-store-PPUbSYaU.js";
import { t as lt, d as No, s as zo, b as me, g as Je, f as Ie, p as Ho } from "./todoist.service-DU71_-GO.js";
import { m as Fo, T as Ko } from "./task-resource-Cs4kzJPJ.js";
import { g as lo, T as Yo } from "./TaskRepositoryLinks-B1D4g0NW.js";
import { g as Go } from "./bili-video-links-DXpyplJq.js";
import { g as Xo } from "./web-site-links-BSIympLj.js";
import { l as ro, q as qo } from "./github.service-CyBcxOSX.js";
import { biliMiniPlayerController as Qo } from "./mini-player-store-mh4dZhnt.js";
import { u as Jo } from "./useMachine-DVONSfP9.js";
import { I as Me, T as Ae } from "./TodoistDatePickerPopover-DkRhAeLz.js";
import { m as Zo } from "./core-utils-KTt-RZby.js";
import { pendingTodoistTask as Ze } from "./task-navigation-Bdn-hP0e.js";
import { n as ts } from "./store-BodPoZPS.js";
import { u as es } from "./workspace-wallpaper-VZA3CcfK.js";
import { W as os } from "./WorkspaceWallpaperLayer-BRKnRO7I.js";
const ss = ["title"], ns = { class: "todoist-tab-text" }, is = ["title"], as = { class: "todoist-tab-text" }, ls = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspaceTabs",
  setup(a) {
    return (n, r) => (l(), p(it, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: Z({ on: e(qe).view === "inbox" }),
        title: e(g)("todoist.inbox"),
        onClick: r[0] || (r[0] = (v) => e(Xe).switchView("inbox"))
      }, [
        r[2] || (r[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", ns, f(e(g)("todoist.inbox")), 1)
      ], 10, ss),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: Z({ on: e(qe).view === "projects" }),
        title: e(g)("todoist.projects"),
        onClick: r[1] || (r[1] = (v) => e(Xe).switchView("projects"))
      }, [
        r[3] || (r[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", as, f(e(g)("todoist.projects")), 1)
      ], 10, is)
    ], 64));
  }
}), co = "todoist_reminder_v2:", rs = "todoist_remind_";
async function ds(a) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const n = co + a, r = await chrome.storage.local.get([n, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(r, n) ? r[n] || void 0 : r.todoist_reminders_map_v1?.[a];
}
async function cs(a, n, r) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const v = new Date(n).getTime();
  if (n && (!Number.isFinite(v) || v <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (n && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const w = co + a, C = rs + a;
  await chrome.alarms.clear(C), await chrome.storage.local.set({ [w]: n ? { time: n, title: r } : null }), n && await chrome.alarms.create(C, { when: v });
}
const Rt = te(/* @__PURE__ */ new Map());
let us = 0;
function to(a, n, r, v = "editing") {
  const w = ++us;
  return Rt.set(a, { revision: w, title: n, description: r, status: v, error: "" }), w;
}
const y = te({
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
let Pe = Promise.resolve(), ve = 0, eo = Promise.resolve();
const fe = /* @__PURE__ */ new Map();
let de = 0;
const Xt = /* @__PURE__ */ new Map();
function re(a = !0) {
  a && de++;
  for (const n of Xt.values()) n.abort();
  Xt.clear(), y.loading = !1;
}
function oo(a) {
  Xt.get(a)?.abort();
  const n = new AbortController();
  Xt.set(a, n);
  const r = de, v = y.taskId;
  return {
    signal: n.signal,
    current: () => !n.signal.aborted && r === de && y.isOpen && v === y.taskId && Xt.get(a) === n,
    finish: () => {
      Xt.get(a) === n && Xt.delete(a);
    }
  };
}
function Bt() {
  re(!1);
  const a = y.taskId, n = de;
  return { taskId: a, current: () => y.isOpen && n === de && a === y.taskId };
}
function ps(a) {
  return new Promise((n) => {
    const r = new FileReader();
    r.onload = () => n(r.result || ""), r.onerror = () => n(""), r.readAsDataURL(a);
  });
}
function so(a, n, r) {
  for (const v of Tt.columns)
    for (const w of v.tasks)
      String(w.id) === a && (w.content = n, r !== void 0 && (w.description = r), w._taskRaw && (w._taskRaw.content = n, r !== void 0 && (w._taskRaw.description = r)));
  wt.updateTaskTitle(a, n);
}
const ms = {
  state: y,
  cancelReads: re,
  stageTitleDraft(a, n, r) {
    a && (to(a, n, r), re(!1), y.taskId === a && (y.title = n), so(a, n, r));
  },
  async openTask(a, n) {
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
    }), n) {
      y.title = n.content || n.title || "", y.description = n.description || n.raw?.description || "", y.priority = n.priority || 1;
      const C = me(n.due?.datetime || n.due?.date || n.dueDate || "");
      y.dueDate = C.date, y.dueTime = C.time;
      const E = n.startDate || Je(a, y.description), L = me(E);
      y.startDate = L.date, y.startTime = L.time, y.labels = [...n.labels || []], y.url = n.url || "";
    }
    const r = Rt.get(a);
    r && (y.title = r.title, y.description = r.description);
    const v = oo("reminder");
    ds(a).then((C) => {
      v.current() && (y.reminderTime = C?.time || "");
    }).catch(() => {
      v.current() && (y.error = "本机提醒读取失败。");
    }).finally(v.finish);
    const w = oo("detail");
    y.loading = !0;
    try {
      const C = await lt.api(`/tasks/${encodeURIComponent(a)}`, { signal: w.signal });
      if (C && w.current()) {
        const E = Rt.get(a);
        y.title = E?.title ?? C.content ?? "", y.description = E?.description ?? C.description ?? "", y.priority = C.priority || 1;
        const L = me(C.due?.datetime || C.due?.date || "");
        y.dueDate = L.date, y.dueTime = L.time;
        const N = Je(a, C.description || y.description), Y = me(N);
        y.startDate = Y.date, y.startTime = Y.time, y.labels = [...C.labels || []], y.url = C.url || "";
        try {
          const T = await lt.getComments(a, w.signal);
          if (T && w.current()) {
            const V = [], H = [];
            for (const R of T) {
              let D;
              if (R?.attachment?.file_url) {
                const $ = R.attachment.file_name || "附件图片";
                V.push({ name: $, url: R.attachment.file_url }), D = { name: $, url: R.attachment.file_url };
              }
              H.push({
                id: R.id,
                content: R.content || "",
                postedAt: R.posted_at || "",
                attachment: D
              });
            }
            if (y.commentAttachments = V, y.comments = H, V.length > 0 && y.description) {
              let R = y.description, D = !1;
              for (const $ of V) {
                const h = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                h.test(R) && (R = R.replace(h, `$1${$.url}$2`), D = !0);
              }
              if (D && !Rt.has(a)) {
                y.description = R;
                for (const $ of Tt.columns) {
                  const h = $.tasks.find((I) => String(I.id) === a);
                  if (h) {
                    h.description = R, h._taskRaw && (h._taskRaw.description = R);
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
      w.current() && (y.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      w.current() && (y.loading = !1), w.finish();
    }
  },
  close() {
    re(), y.isOpen = !1, y.taskId = "";
  },
  async setStartDateAndTime(a, n) {
    if (!y.taskId) return;
    const r = Bt(), v = a.trim(), w = v ? n.trim() : "";
    y.startDate = v, y.startTime = w, ee();
    const C = No(v, w);
    zo(r.taskId, C), lt.invalidateWorkspaceSnapshots();
    for (const E of Tt.columns) {
      const L = E.tasks.find((N) => N.id === r.taskId);
      L && (L.startDate = C);
    }
  },
  async setDueDateAndTime(a, n) {
    if (!y.taskId) return;
    const r = Bt(), v = a.trim(), w = v ? n.trim() : "";
    y.dueDate = v, y.dueTime = w, ee(), lt.invalidateWorkspaceSnapshots();
    const C = (fe.get(r.taskId) || 0) + 1;
    fe.set(r.taskId, C);
    const E = eo.then(async () => {
      try {
        const L = await lt.updateTask(r.taskId, {
          due_string: v ? w ? `${v} ${w}` : v : "no date"
        });
        if (fe.get(r.taskId) !== C) return;
        const N = lt.mapTasks([L], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const Y of Tt.columns) {
          const T = Y.tasks.findIndex((H) => H.id === r.taskId);
          if (T < 0) continue;
          const V = Y.tasks[T];
          if (Object.assign(V, {
            dueDate: N.dueDate,
            dueText: N.dueText,
            dueString: N.dueString,
            isDueToday: N.isDueToday,
            isOverdue: N.isOverdue,
            isRecurring: N.isRecurring
          }), V._taskRaw && (V._taskRaw.due = L.due), Tt.view === "today") {
            const H = N.isOverdue ? "overdue" : N.isDueToday ? "today" : "";
            H !== Y.sectionId && (Y.tasks.splice(T, 1), Tt.columns.find((R) => R.sectionId === H)?.tasks.push(V));
          }
        }
        r.current() && (y.error = "");
      } catch {
        r.current() && fe.get(r.taskId) === C && (y.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    eo = E.catch(() => {
    }), await E;
  },
  async saveTitleAndDesc(a, n, r = y.taskId) {
    const v = r === y.taskId ? Bt() : { taskId: r, current: () => !1 };
    if (!v.taskId || !a.trim()) return;
    const w = a.trim(), C = n.trim(), E = to(r, w, C, "saving");
    v.current() && (y.title = w, y.description = C), so(v.taskId, w, C), ve++, y.saving = !0;
    const L = Pe.then(async () => {
      try {
        await lt.updateTask(v.taskId, {
          content: w,
          description: C
        }), Rt.get(r)?.revision === E && Rt.delete(r), ve === 1 && Rt.size === 0 && ot.dispatch("refresh");
      } catch (N) {
        const Y = Rt.get(r);
        Y?.revision === E && (Y.status = "failed", Y.error = N instanceof Error ? N.message : "保存未确认");
      } finally {
        ve--, y.saving = ve > 0;
      }
    });
    Pe = L.catch(() => {
    }), await L;
  },
  async attachImageToTask(a) {
    const n = Bt();
    if (await Pe, !n.current()) return;
    if (Rt.has(n.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const r = y.description || "";
    if (!n.taskId || y.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    y.saving = !0;
    try {
      const v = a.name || `截图_${Date.now()}.png`;
      let w = "";
      try {
        const C = await lt.uploadFile(a, v);
        C && C.file_url && (w = C.file_url);
      } catch (C) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", C), a.size <= 2.5 * 1024 * 1024)
          w = await ps(a);
        else
          throw new Error(C?.message || "云端上传失败且文件超过2.5MB");
      }
      if (w) {
        const C = r ? `${r}

![${v}](${w})` : `![${v}](${w})`;
        await lt.updateTask(n.taskId, {
          description: C
        }), n.current() && (y.description = C);
        for (const E of Tt.columns) {
          const L = E.tasks.find((N) => String(N.id) === n.taskId);
          if (L) {
            L.description = C, L._taskRaw && (L._taskRaw.description = C);
            break;
          }
        }
        ot.dispatch("refresh");
      }
    } catch (v) {
      n.current() && (y.error = v.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${v.message}`);
    } finally {
      y.saving = !1;
    }
  },
  async setPriority(a) {
    if (!y.taskId) return;
    const n = Bt();
    if (![1, 2, 3, 4].includes(a)) return;
    const r = y.priority;
    y.priority = a, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(n.taskId, { priority: a });
      for (const v of Tt.columns) {
        const w = v.tasks.find((C) => C.id === n.taskId);
        w && (w.priority = a, w._taskRaw && (w._taskRaw.priority = a));
      }
    } catch {
      n.current() && (y.priority = r, y.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(a) {
    if (!y.taskId) return;
    const n = Bt(), r = [...y.labels], w = r.includes(a) ? r.filter((C) => C !== a) : [...r, a];
    y.labels = w, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(n.taskId, { labels: w });
      for (const C of Tt.columns) {
        const E = C.tasks.find((L) => L.id === n.taskId);
        E && (E.labels = w, E._taskRaw && (E._taskRaw.labels = w));
      }
    } catch {
      n.current() && (y.labels = r, y.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(a) {
    const n = Bt();
    if (a = a.trim(), !(!n.taskId || !a))
      try {
        const r = await lt.getLabels();
        if (!n.current()) return;
        r.some((v) => v.name === a) || await lt.createLabel(a), n.current() && !y.labels.includes(a) && await this.toggleLabel(a);
      } catch {
        n.current() && (y.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(a) {
    if (!y.taskId || !a.trim()) return;
    const n = Bt();
    try {
      const r = await lt.addComment({
        task_id: n.taskId,
        content: a.trim()
      });
      r && n.current() && y.comments.push({
        id: r.id || `c_${Date.now()}`,
        content: r.content || a.trim(),
        postedAt: r.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (r) {
      n.current() && (y.error = "发送评论失败：" + (r?.message || ""));
    }
  },
  async setReminder(a) {
    const n = Bt();
    if (n.taskId)
      try {
        await cs(n.taskId, a, y.title), n.current() && (y.reminderTime = a, y.error = "");
      } catch (r) {
        n.current() && (y.error = r instanceof Error ? r.message : "提醒未保存，请重试。");
      }
  }
}, rt = Po(ms, [
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
function uo(a, n, r) {
  let v = !1, w;
  const C = ct(
    () => [q.dataRevision, a(), q.pendingWrites],
    ([E, L, N], Y) => {
      Y && E !== Y[0] && (v = !0, n()), w && clearTimeout(w), !(!v || !L || N) && (w = setTimeout(() => {
        w = void 0, !(!a() || q.pendingWrites) && (v = !1, r());
      }, 150));
    }
  );
  Et(() => {
    C(), w && clearTimeout(w);
  });
}
const vs = ["aria-label"], fs = { class: "todoist-cal-head" }, gs = { class: "todoist-cal-title-row" }, bs = { class: "todoist-cal-logo" }, ks = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, ys = { class: "todoist-cal-head-actions" }, hs = { class: "todoist-cal-nav" }, ws = { class: "todoist-cal-nav-group" }, Ts = ["title"], Ds = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, xs = ["title"], Cs = { class: "todoist-cal-nav-group" }, _s = ["title"], Ss = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, $s = ["title"], Is = { class: "todoist-cal-weekdays" }, Ps = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, Rs = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Ls = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Os = { class: "todoist-cal-agenda" }, Es = { class: "todoist-cal-agenda-head" }, Ms = { class: "todoist-cal-agenda-title" }, As = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, js = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, Ws = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, Us = ["disabled"], Bs = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, Vs = {
  key: 0,
  class: "todoist-cal-empty"
}, Ns = {
  key: 1,
  class: "todoist-cal-empty"
}, zs = ["onClick"], Hs = { class: "todoist-cal-todo-main" }, Fs = ["disabled", "title", "onClick"], Ks = {
  key: 0,
  class: "check-icon"
}, Ys = {
  key: 0,
  class: "todoist-cal-task-time"
}, Gs = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, Xs = ["title", "onClick"], qs = ["src", "alt"], Qs = { class: "todoist-cal-thumb-tag" }, Js = /* @__PURE__ */ Ht({
  __name: "TodoistCalendarSidebar",
  setup(a) {
    const n = Mo;
    uo(
      () => q.active,
      () => wt.invalidateReads(),
      () => wt.loadTodosForDate(n.selectedDate, !0)
    ), Et(() => wt.cancelReads()), ct(() => [q.active, q.pendingWrites], ([D, $], h) => {
      if (!D || $) {
        wt.cancelReads();
        return;
      }
      wt.loadTodosForDate(n.selectedDate, !!h?.[1]);
    }, { immediate: !0, flush: "sync" });
    function r(D) {
      wt.toggleTodoItem(D);
    }
    function v(D) {
      rt.openTask(D.id, D);
    }
    oe(() => {
      Eo.syncSidebarToVue();
    });
    function w() {
      wt.dispatch("today");
    }
    function C() {
      wt.dispatch("prev-month");
    }
    function E() {
      wt.dispatch("next-month");
    }
    function L() {
      wt.dispatch("prev-year");
    }
    function N() {
      wt.dispatch("next-year");
    }
    function Y(D) {
      wt.dispatch("select-date", D);
    }
    function T(D, $) {
      wt.dispatch("context-date", {
        date: D,
        clientX: $.clientX,
        clientY: $.clientY
      });
    }
    function V(D, $) {
      const h = Array.from($.dataTransfer?.types || []);
      (h.includes("application/x-todoist-task-id") || h.includes("text/plain")) && ($.preventDefault(), $.dataTransfer && ($.dataTransfer.dropEffect = "copy"));
    }
    function H(D) {
    }
    function R(D, $) {
      const h = $.dataTransfer?.getData("application/x-todoist-task-id") || $.dataTransfer?.getData("text/plain");
      h && ($.preventDefault(), $.stopPropagation(), wt.dispatch("drop-task", { taskId: h, date: D }));
    }
    return (D, $) => (l(), p("aside", {
      id: "todoist-calendar-sidebar",
      class: Z(["todoist-calendar-sidebar", { collapsed: e(n).collapsed }]),
      "aria-label": e(g)("todoist.calendar.sidebarLabel")
    }, [
      t("div", fs, [
        t("div", gs, [
          t("span", bs, [
            $[1] || ($[1] = Vt("📅 ", -1)),
            t("strong", null, f(e(g)("todoist.calendar.title")), 1)
          ]),
          t("span", ks, f(e(n).badgeText), 1)
        ]),
        t("div", ys, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: w
          }, f(e(g)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", hs, [
        t("div", ws, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.prevMonth"),
            onClick: C
          }, "‹", 8, Ts),
          t("span", Ds, f(e(n).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.nextMonth"),
            onClick: E
          }, "›", 8, xs)
        ]),
        t("div", Cs, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.prevYear"),
            onClick: L
          }, "‹", 8, _s),
          t("span", Ss, f(e(n).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.nextYear"),
            onClick: N
          }, "›", 8, $s)
        ])
      ]),
      t("div", Is, [
        t("span", null, f(e(g)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", Ps, [
        (l(!0), p(it, null, dt(e(n).cells, (h) => (l(), p("button", {
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
          onClick: (I) => Y(h.date),
          onContextmenu: X((I) => T(h.date, I), ["prevent"]),
          onDragover: (I) => V(h.date, I),
          onDragleave: (I) => (h.date, void 0),
          onDrop: (I) => R(h.date, I)
        }, [
          t("span", null, f(h.dayNumber), 1),
          h.hasDot ? (l(), p("span", Ls)) : _("", !0)
        ], 42, Rs))), 128))
      ]),
      t("div", Os, [
        t("div", Es, [
          t("strong", Ms, f(e(n).agendaTitle), 1),
          t("span", As, f(e(g)("todoist.calendar.itemCount", { count: e(n).todoItems.length })), 1)
        ]),
        e(n).writeError ? (l(), p("p", js, f(e(n).writeError), 1)) : _("", !0),
        e(n).emptyText ? (l(), p("div", Ws, [
          Vt(f(e(n).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(n).todoLoading || e(q).pendingWrites > 0,
            onClick: $[0] || ($[0] = (h) => e(wt).loadTodosForDate(e(n).selectedDate, !0))
          }, f(e(g)("todoist.calendar.retryLoad")), 9, Us)
        ])) : _("", !0),
        t("div", Bs, [
          e(n).todoLoading && !e(n).todoItems.length ? (l(), p("div", Vs, f(e(g)("todoist.calendar.loading")), 1)) : e(n).todoItems.length === 0 && !e(n).emptyText ? (l(), p("div", Ns, f(e(g)("todoist.calendar.emptyDay")), 1)) : (l(!0), p(it, { key: 2 }, dt(e(n).todoItems, (h) => (l(), p("div", {
            key: h.id,
            class: Z(["todoist-cal-todo-card", { completed: h.completed }]),
            onClick: (I) => v(h)
          }, [
            t("div", Hs, [
              t("button", {
                type: "button",
                class: Z(["todoist-cal-check", { checked: h.completed }]),
                disabled: e(q).pendingWrites > 0,
                title: h.completed ? e(g)("todoist.calendar.clickToReopen") : e(g)("todoist.calendar.clickToComplete"),
                onClick: X((I) => r(h), ["stop"])
              }, [
                h.completed ? (l(), p("span", Ks, "✓")) : _("", !0)
              ], 10, Fs),
              t("span", {
                class: Z(["todoist-cal-todo-title", { strike: h.completed }])
              }, f(h.content), 3),
              h.time ? (l(), p("small", Ys, f(h.time), 1)) : _("", !0),
              h.completed ? (l(), p("span", Gs, f(e(g)("todoist.calendar.completedTag")), 1)) : _("", !0)
            ]),
            h.thumbUrl ? (l(), p("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(g)("todoist.calendar.viewPhoto"),
              onClick: X((I) => e(We).open(h.thumbUrl, h.content), ["stop"])
            }, [
              t("img", {
                src: h.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(g)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, qs),
              t("span", Qs, f(e(g)("todoist.calendar.photoTag")), 1)
            ], 8, Xs)) : _("", !0)
          ], 10, zs))), 128))
        ])
      ])
    ], 10, vs));
  }
}), Zs = /* @__PURE__ */ ne(Js, [["__scopeId", "data-v-6c1a5887"]]);
function tn(a) {
  const n = a.state, r = M(null), v = M(null), w = M(null), C = M(!1), E = io(null), L = M(), N = /* @__PURE__ */ new Map();
  function Y(m) {
    N.clear();
    const A = m.closest(".todoist-board");
    if (A)
      for (const d of A.querySelectorAll(".todoist-board-list")) {
        const et = n.columns[Number(d.dataset.groupIndex)];
        if (!et) continue;
        const K = d.__todoistSlots;
        if (!K) continue;
        const W = K(), G = W.filter((pt) => pt.id !== I?.id);
        N.set(et, { list: d, rows: G, read: K, snapshot: W });
      }
  }
  let T = 0, V;
  function H(m, A) {
    V = { clientY: m.clientY, col: A }, !T && (T = requestAnimationFrame(() => {
      T = 0;
      const d = V;
      V = void 0, d && R(d, d.col);
    }));
  }
  function R(m, A) {
    if (!I || n.movingTaskId) return;
    const d = N.get(A);
    if (!d) return;
    const et = d.read();
    et !== d.snapshot && (d.snapshot = et, d.rows = et.filter((nt) => nt.id !== I?.id));
    const K = m.clientY - d.list.getBoundingClientRect().top + d.list.scrollTop;
    let W = 0, G = d.rows.length;
    for (; W < G; ) {
      const nt = W + G >>> 1;
      K < d.rows[nt].middle ? G = nt : W = nt + 1;
    }
    let pt = W;
    if (v.value === n.columns.indexOf(A)) {
      const nt = L.value ? d.rows.findIndex((mt) => mt.id === L.value) : d.rows.length;
      nt >= 0 && pt > nt && K < d.rows[nt].middle + 10 && (pt = nt), nt > 0 && pt < nt && K > d.rows[nt - 1].middle - 10 && (pt = nt);
    }
    const Ct = d.rows[pt]?.id;
    h(A, Ct), v.value === n.columns.indexOf(A) && (w.value = Ct || d.rows[d.rows.length - 1]?.id || null, C.value = !Ct);
  }
  function D(m) {
    return m === E.value;
  }
  function $(m, A) {
    if (A !== v.value || !E.value) return m.tasks;
    const d = [...m.tasks], et = L.value ? d.findIndex((K) => K.id === L.value) : -1;
    return d.splice(et < 0 ? d.length : et, 0, E.value), d;
  }
  function h(m, A) {
    if (!I || !z) return;
    if (n.view === "today" && m.sectionId === "overdue" && z.sectionId !== "overdue") {
      v.value = null;
      return;
    }
    const d = A ? m.tasks.find((W) => W.id === A) : void 0, et = m === z ? String(I._taskRaw?.parent_id || "") : "";
    if (d && n.view !== "today" && String(d._taskRaw?.parent_id || "") !== et) {
      v.value = null;
      return;
    }
    const K = n.columns.indexOf(m);
    K < 0 || (L.value = A, v.value = K);
  }
  let I = null, z = null;
  function Q(m, A, d, et) {
    if (!a.isActive() || n.loading || n.movingTaskId || n.moveNeedsRefresh || A.completed || A.id.startsWith("optimistic-") || a.editingTaskId() === A.id) {
      m.preventDefault();
      return;
    }
    if (m.stopPropagation(), a.closePopovers(), r.value = A.id, I = A, z = d, E.value = { ...A }, Y(m.currentTarget), m.dataTransfer) {
      const K = a.allowResourceDrag?.() ? Fo(A) : null;
      m.dataTransfer.effectAllowed = K ? "copyMove" : "move";
      const W = m.currentTarget, G = W.getBoundingClientRect();
      m.dataTransfer.setDragImage(
        W,
        Math.max(0, Math.min(G.width, m.clientX - G.left)),
        Math.max(0, Math.min(G.height, m.clientY - G.top))
      ), m.dataTransfer.clearData(), m.dataTransfer.setData("application/x-todoist-task-id", A.id), m.dataTransfer.setData("application/x-logicweaver-todoist-task", A.id), m.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: A.id, sectionId: d.sectionId })), K && m.dataTransfer.setData(Ko, JSON.stringify(K));
    }
  }
  function F() {
    cancelAnimationFrame(T), T = 0, V = void 0, r.value = null, v.value = null, w.value = null, C.value = !1, I = null, z = null, E.value = null, L.value = void 0, N.clear();
  }
  function ft(m, A) {
    !I || n.movingTaskId || (m.preventDefault(), m.stopPropagation(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), H(m, n.columns[A]));
  }
  function at(m, A) {
    m.currentTarget?.contains(m.relatedTarget);
  }
  function B(m, A, d, et) {
    m.dataTransfer && (m.dataTransfer.dropEffect = "move"), H(m, d);
  }
  async function P(m, A) {
    V && V.col === m && (R(V, V.col), A = L.value);
    const d = I, et = z;
    F(), !(!d || !et || !a.isActive() || n.movingTaskId) && (n.view === "today" ? m.sectionId === "today" && et.sectionId !== "today" ? await a.moveTask(d.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, A) : await a.moveTask(d.id, { sectionId: m.sectionId }, A) : await a.moveTask(d.id, {
      projectId: m.projectId,
      sectionId: m.sectionId
    }, A));
  }
  async function kt(m, A, d, et) {
    m.preventDefault();
    const K = m.dataTransfer?.getData("application/x-todoist-label") || (m.dataTransfer?.getData("text/plain")?.startsWith("label:") ? m.dataTransfer.getData("text/plain").slice(6) : "");
    if (K) {
      a.dropLabel(A, K);
      return;
    }
    if (v.value === n.columns.indexOf(d)) {
      await P(d, L.value);
      return;
    }
    const W = m.currentTarget.getBoundingClientRect(), G = m.clientY >= W.top + W.height / 2, pt = d.tasks.filter((mt) => mt.id !== I?.id), Ct = pt.findIndex((mt) => mt.id === A.id), nt = A.id === I?.id ? A.id : G ? pt[Ct + 1]?.id : A.id;
    await P(d, nt);
  }
  async function yt(m, A) {
    m.preventDefault(), m.stopPropagation(), await P(A, v.value === n.columns.indexOf(A) ? L.value : void 0);
  }
  return ct(() => [n.view, n.activeProjectId], () => F()), ct(() => n.columns, (m) => {
    z && !m.includes(z) && F();
  }), ct(a.isActive, (m) => {
    m || F();
  }, { immediate: !0, flush: "sync" }), Et(F), {
    draggingTaskId: r,
    dragOverColIndex: v,
    dragOverTaskId: w,
    dragAfterTask: C,
    isDragPreview: D,
    previewTasks: $,
    onTaskDragStart: Q,
    onTaskDragEnd: F,
    onColDragOver: ft,
    onColDragLeave: at,
    onTaskDragOver: B,
    onTaskDrop: kt,
    onColDrop: yt
  };
}
function po(a) {
  return Bo(a, { allowCtrlOrMeta: !0 });
}
function je(a) {
  return Ee(a);
}
const en = ["data-row-key"], on = /* @__PURE__ */ Ht({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(a) {
    const n = a, r = M(null), v = /* @__PURE__ */ new Map(), w = M(0), C = io({ top: 0, height: 600 }), E = (h) => n.isPreview(h) ? `preview:${h.id}` : h.id, L = tt(() => {
      w.value;
      const h = [0];
      for (const I of n.tasks) {
        const z = I.id === n.hiddenId && !n.isPreview(I) ? 0 : v.get(E(I)) || v.get(I.id) || 110;
        h.push(h[h.length - 1] + z);
      }
      return h;
    }), N = tt(() => {
      w.value;
      let h = 0;
      return n.tasks.filter((I) => !n.isPreview(I)).map((I) => {
        const z = v.get(I.id) || 110, Q = { id: I.id, middle: h + z / 2 };
        return h += z, Q;
      });
    });
    function Y(h) {
      const I = L.value;
      let z = 0, Q = n.tasks.length;
      for (; z < Q; ) {
        const F = z + Q >>> 1;
        I[F + 1] < h ? z = F + 1 : Q = F;
      }
      return z;
    }
    const T = tt(() => {
      const h = Math.max(0, Y(C.value.top) - 5), I = Math.min(n.tasks.length, Y(C.value.top + C.value.height) + 6), z = /* @__PURE__ */ new Set();
      for (let Q = h; Q < I; Q++) z.add(Q);
      if (n.pinnedId) {
        const Q = n.tasks.findIndex((F) => F.id === n.pinnedId && !n.isPreview(F));
        Q >= 0 && z.add(Q);
      }
      return [...z].sort((Q, F) => Q - F).map((Q) => ({ task: n.tasks[Q], index: Q, top: L.value[Q] }));
    });
    let V = 0;
    function H() {
      V || (V = requestAnimationFrame(() => {
        V = 0, r.value && (C.value = { top: r.value.scrollTop, height: r.value.clientHeight });
      }));
    }
    let R;
    const D = /* @__PURE__ */ new Map();
    function $(h, I) {
      const z = D.get(I);
      z !== h && (z && R?.unobserve(z), h instanceof HTMLElement ? (D.set(I, h), R?.observe(h)) : D.delete(I));
    }
    return ct(() => n.tasks, () => {
      const h = new Set(n.tasks.map(E));
      for (const I of v.keys()) h.has(I) || v.delete(I);
      It(H);
    }), oe(() => {
      R = new ResizeObserver((h) => {
        let I = !1;
        const z = Y(r.value?.scrollTop || 0), Q = L.value[z] || 0;
        for (const F of h) {
          const ft = F.target;
          if (ft === r.value) {
            H();
            continue;
          }
          const at = ft.dataset.rowKey, B = F.borderBoxSize?.[0]?.blockSize || F.contentRect.height;
          at && B > 0 && Math.abs((v.get(at) || 0) - B) > 0.5 && (v.set(at, B), I = !0);
        }
        if (I) {
          w.value++;
          const F = (L.value[z] || 0) - Q;
          r.value && F && !n.pinnedId && (r.value.scrollTop += F), H();
        }
      }), r.value && (R.observe(r.value), r.value.__todoistSlots = () => N.value);
      for (const h of D.values()) R.observe(h);
      H();
    }), Et(() => {
      R?.disconnect(), cancelAnimationFrame(V), r.value && delete r.value.__todoistSlots, D.clear(), v.clear();
    }), (h, I) => (l(), p("div", {
      ref_key: "root",
      ref: r,
      onScrollPassive: H
    }, [
      a.tasks.length ? (l(), p("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${L.value[L.value.length - 1]}px` })
      }, [
        (l(!0), p(it, null, dt(T.value, (z) => (l(), p("div", {
          key: E(z.task),
          ref_for: !0,
          ref: (Q) => $(Q, E(z.task)),
          "data-row-key": E(z.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${z.top}px)` })
        }, [
          Re(h.$slots, "default", {
            task: z.task,
            index: z.index
          }, void 0, !0)
        ], 12, en))), 128))
      ], 4)) : Re(h.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), sn = /* @__PURE__ */ ne(on, [["__scopeId", "data-v-b7076778"]]), nn = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, an = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, ln = {
  key: 2,
  class: "todoist-empty"
}, rn = {
  key: 3,
  class: "todoist-empty"
}, dn = {
  key: 4,
  class: "todoist-projects-empty-state"
}, cn = {
  key: 0,
  class: "todoist-projects-toolbar"
}, un = { class: "todoist-projects-toolbar-inner" }, pn = { class: "todoist-project-tabs-scroll" }, mn = ["onClick"], vn = { class: "todoist-project-tab-name" }, fn = {
  key: 0,
  class: "todoist-project-actions-group"
}, gn = ["title"], bn = { class: "action-text" }, kn = ["title"], yn = { class: "action-text" }, hn = { class: "todoist-board" }, wn = ["data-section-id", "data-title", "data-column-index"], Tn = { class: "todoist-board-column-head" }, Dn = ["title", "onClick"], xn = ["onClick"], Cn = ["onSubmit"], _n = ["onKeydown"], Sn = { class: "date-hint-left" }, $n = { class: "date-hint-badge" }, In = { class: "date-hint-sub" }, Pn = {
  key: 0,
  class: "date-hint-preview"
}, Rn = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, Ln = {
  key: 1,
  class: "todoist-composer-images"
}, On = ["src"], En = { class: "todoist-composer-img-name" }, Mn = {
  key: 0,
  class: "todoist-composer-img-status"
}, An = ["onClick"], jn = { class: "todoist-inline-actions" }, Wn = ["disabled"], Un = ["disabled"], Bn = {
  key: 0,
  class: "todoist-column-empty"
}, Vn = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Nn = ["disabled", "title", "aria-label", "onClick"], zn = { class: "todoist-board-task-main" }, Hn = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Fn = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Kn = ["title", "onClick"], Yn = { class: "repo-badge-name" }, Gn = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, Xn = ["title", "onClick"], qn = { class: "repo-badge-name" }, Qn = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Jn = ["title", "onClick"], Zn = { class: "repo-badge-name" }, ti = ["onKeydown", "onBlur"], ei = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, oi = {
  key: 6,
  class: "todoist-board-task-description"
}, si = {
  key: 7,
  class: "todoist-board-task-meta"
}, ni = ["title"], ii = ["title"], ai = ["title"], li = ["title"], ri = {
  key: 4,
  class: "todoist-board-extra"
}, di = ["onClick"], ci = ["src"], ui = {
  key: 0,
  class: "todoist-board-add-column"
}, pi = {
  key: 1,
  class: "todoist-add-section-form"
}, mi = { class: "todoist-add-section-actions" }, vi = { class: "section-menu-text" }, fi = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, gi = ["disabled"], bi = ["disabled"], ki = {
  key: 1,
  class: "todoist-section-menu-divider"
}, yi = { class: "section-menu-text" }, hi = { class: "todoist-task-menu-header" }, wi = { class: "todoist-task-menu-title" }, Ti = { class: "todoist-menu-text" }, Di = { class: "todoist-menu-badge" }, xi = {
  key: 0,
  class: "todoist-labels-panel"
}, Ci = { class: "todoist-labels-quick-input" }, _i = ["placeholder"], Si = { class: "todoist-labels-chip-grid" }, $i = ["onClick"], Ii = {
  key: 0,
  class: "chip-check"
}, Pi = { class: "todoist-menu-text" }, Ri = {
  key: 1,
  class: "todoist-recur-panel"
}, Li = { class: "todoist-recur-grid" }, Oi = ["onClick"], Ei = { class: "todoist-recur-custom-row" }, Mi = { class: "todoist-menu-text" }, Ai = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, ji = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, Wi = {
  key: 2,
  class: "todoist-color-panel"
}, Ui = { class: "todoist-color-grid" }, Bi = ["title", "onClick"], Vi = { class: "todoist-color-name" }, Ni = { class: "todoist-menu-text" }, zi = ["disabled", "onClick"], Hi = { class: "todoist-project-flyout-name" }, Fi = {
  key: 0,
  class: "todoist-menu-badge"
}, Ki = { class: "todoist-menu-text" }, Yi = { class: "todoist-dialog-title" }, Gi = ["title"], Xi = { class: "todoist-dialog-body" }, qi = {
  key: 0,
  class: "todoist-dialog-desc"
}, Qi = ["placeholder", "onKeydown"], Ji = { class: "todoist-dialog-foot" }, Zi = { class: "todoist-dialog-icon" }, ta = { class: "todoist-dialog-title" }, ea = ["title"], oa = { class: "todoist-dialog-body" }, sa = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, na = { class: "todoist-dialog-danger-text" }, ia = { class: "todoist-dialog-msg" }, aa = { class: "todoist-dialog-foot" }, la = /* @__PURE__ */ Ht({
  __name: "TodoistTaskList",
  props: {
    embedded: { type: Boolean, default: !1 }
  },
  setup(a) {
    const n = M(0);
    function r() {
      n.value++;
    }
    oe(() => {
      window.addEventListener("storage", r), window.addEventListener("todoist-repository-links-changed", r), window.addEventListener("todoist-bili-links-changed", r), window.addEventListener("todoist-web-links-changed", r);
    }), Et(() => {
      window.removeEventListener("storage", r), window.removeEventListener("todoist-repository-links-changed", r), window.removeEventListener("todoist-bili-links-changed", r), window.removeEventListener("todoist-web-links-changed", r);
    });
    function v(s, o) {
      return n.value, lo(s, o);
    }
    function w(s, o, i) {
      return n.value, Go(s, o, i);
    }
    function C(s, o, i) {
      return n.value, Xo(s, o, i);
    }
    function E(s) {
      s && window.open(s, "_blank", "noopener,noreferrer");
    }
    function L(s) {
      Qo.openVideo({
        bvid: s.bvid,
        aid: s.aid ? String(s.aid) : void 0,
        title: s.title,
        author: s.author,
        cover: s.cover,
        url: s.url
      });
    }
    function N(s) {
      ro.open(s);
    }
    const Y = a, T = Tt, V = M(""), H = M(null), R = M(""), D = M(!1), $ = tt(() => R.value ? Ho(R.value) : null), h = tt(() => {
      const s = Array.from(($.value?.cleanTitle || "").replace(/\s+/g, " ").trim());
      return s.length > 40 ? `${s.slice(0, 40).join("")}…` : s.join("");
    }), I = M([]);
    function z(s) {
      const o = s.clipboardData?.items;
      if (o)
        for (let i = 0; i < o.length; i++) {
          const O = o[i];
          if (O.type.indexOf("image") !== -1) {
            s.preventDefault();
            const u = O.getAsFile();
            if (!u) continue;
            const st = URL.createObjectURL(u), U = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: u,
              previewUrl: st,
              name: `截图_${U}.png`,
              uploading: !1
            };
            I.value.push(Dt);
          }
        }
    }
    function Q(s) {
      const o = I.value.splice(s, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const F = M(null), ft = M(""), at = M(null), B = te({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), P = te({
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
    }), kt = M(null), yt = M(null), m = te({
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
    }), A = M(null), d = te({
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
    }), et = M(null), K = M(null), W = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], G = [
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
    ], pt = tt(() => String(d.task?._taskRaw?.project_id || d.col?.projectId || "")), Ct = tt(() => T.view !== "projects" ? null : T.projects.find((s) => String(s.id) === String(T.activeProjectId)) || T.projects[0] || null), nt = tt(() => {
      const s = new Set(T.availableLabels || []);
      return d.task?.labels && d.task.labels.forEach((o) => s.add(o)), Array.from(s);
    }), mt = tt(() => {
      const s = d.task?.customColorHex;
      return s && W.find((i) => i.hex.toLowerCase() === s.toLowerCase()) || W[0];
    });
    function Mt(s, o) {
      return s.sectionId || s.title || String(o);
    }
    function Qt() {
      return `${T.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function Jt(s) {
      return s.startDate || s.dueText || s.labels && s.labels.length > 0 || s.timedDeadlineText || s.extraCountText;
    }
    function vt() {
      B.isOpen = !1, d.isOpen = !1, d.activeSubpanel = null;
    }
    const {
      draggingTaskId: At,
      dragOverColIndex: Nt,
      dragOverTaskId: Ft,
      dragAfterTask: jt,
      isDragPreview: ut,
      previewTasks: j,
      onTaskDragStart: c,
      onTaskDragEnd: b,
      onColDragOver: J,
      onColDragLeave: $t,
      onTaskDragOver: Wt,
      onTaskDrop: ge,
      onColDrop: be
    } = tn({
      state: T,
      allowResourceDrag: () => Y.embedded,
      isActive: () => q.active,
      editingTaskId: () => F.value,
      closePopovers: vt,
      moveTask: (s, o, i) => ot.moveTask(s, o, i),
      dropLabel: (s, o) => {
        s.labels || (s.labels = []), s.labels.includes(o) || (s.labels.push(o), lt.getToken() && lt.updateTask(s.id, { labels: s.labels }));
      }
    });
    function ke(s, o) {
      ot.dispatch("toggle-task", { task: s, group: o });
    }
    function ye(s, o) {
      if (s.completed) return;
      const i = o.target;
      i && i.closest("button,input,textarea,select,a") || ie(s);
    }
    function ie(s) {
      T.movingTaskId !== s.id && (F.value = s.id, ft.value = s.content, It(() => {
        at.value && (at.value.focus(), at.value.select());
      }));
    }
    function Ut(s, o) {
      if (F.value !== s.id) return;
      const i = ft.value.trim();
      F.value = null, o && i && i !== s.content && (s.content = i, ot.dispatch("update-task-title", {
        taskId: s.id,
        content: i,
        task: s,
        newContent: i
      }));
    }
    function he(s, o) {
      je(s) || (s.key === "Enter" ? s.shiftKey || (s.preventDefault(), Ut(o, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), Ut(o, !1)));
    }
    function ae(s, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(s.id, s);
    }
    function we(s, o, i) {
      const O = i.currentTarget;
      H.value = Mt(s, o), R.value = "", D.value = !1, It(() => {
        O.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function x() {
      S.value || k();
    }
    function k() {
      H.value = null, R.value = "", D.value = !1;
      for (const s of I.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      I.value = [];
    }
    const S = M(!1), gt = /* @__PURE__ */ new WeakMap();
    function _t(s) {
      const o = s.description || s._taskRaw?.description || "", i = gt.get(s);
      if (i && i.source === o) return i;
      const O = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, u = {
        source: o,
        thumb: O,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return gt.set(s, u), u;
    }
    function ht(s) {
      return _t(s).text;
    }
    function zt(s) {
      return _t(s).thumb;
    }
    function mo(s, o) {
      s && We.open(s, o?.content || "任务照片");
    }
    async function Ue(s) {
      if (!q.active || S.value) return;
      const o = [...I.value];
      let O = R.value.trim() || o[0]?.name || "";
      if (!O) return;
      let u, st, U;
      if ($.value && !D.value) {
        const Pt = $.value;
        O = Pt.cleanTitle || O, u = Pt.date, st = Pt.label + (Pt.time ? ` ${Pt.time}` : ""), U = Pt.time ? `${Pt.date} ${Pt.time}` : Pt.date;
      }
      const Dt = H.value, Kt = R.value, St = T.view, Ce = s.projectId || St === "projects" && T.activeProjectId || void 0, _e = s.sectionId !== void 0 ? s.sectionId : void 0;
      S.value = !0;
      try {
        await Ro(async () => {
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
          await ot.dispatch("add-task-submit", {
            content: O,
            view: St,
            group: s,
            projectId: Ce,
            sectionId: _e,
            dueDate: u,
            dueText: st,
            dueString: U,
            attachments: o.map((xt) => ({ file_url: xt.uploadedUrl, file_name: xt.name, file_type: xt.file.type || "image/png" }))
          }) && Dt === H.value && Kt === R.value && o.length === I.value.length && o.every((xt, Se) => xt === I.value[Se]) && k();
        });
      } catch {
        T.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        S.value = !1;
      }
    }
    function vo(s, o) {
      je(s) || (po(s) ? (s.preventDefault(), Ue(o)) : s.key === "Escape" && (s.preventDefault(), x()));
    }
    function Be() {
      const s = V.value.trim();
      if (!s) return;
      const i = T.columns.find((O) => O.projectId)?.projectId || T.activeProjectId || void 0;
      ot.dispatch("add-section-submit", { name: s, projectId: i }), Te();
    }
    function Te() {
      T.addingSection = !1, V.value = "";
    }
    function fo(s, o, i) {
      if (B.isOpen && B.col === s) {
        B.isOpen = !1;
        return;
      }
      d.isOpen = !1;
      const u = i.currentTarget.getBoundingClientRect(), U = Math.max(8, Math.min(window.innerWidth - 175 - 8, u.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, u.bottom + 4));
      B.col = s, B.x = U, B.y = Dt, B.canMoveLeft = o > 0 && !!T.columns[o - 1]?.sectionId, B.canMoveRight = o < T.columns.length - 1 && !!T.columns[o + 1]?.sectionId, B.isOpen = !0;
    }
    function Ve(s, o) {
      B.isOpen = !1, ot.dispatch("move-section", { sectionId: s.sectionId, direction: o });
    }
    function Ne(s, o, i) {
      if (T.movingTaskId === s.id || s.completed) return;
      B.isOpen = !1;
      const O = 236, u = 340, st = Math.max(8, Math.min(window.innerWidth - O - 8, i.clientX)), U = Math.max(8, Math.min(window.innerHeight - u - 8, i.clientY));
      if (d.task = s, d.col = o, d.x = st, d.y = U, d.activeSubpanel = null, d.descText = s.description || "", d.isSavingDesc = !1, d.newLabelText = "", d.customRecurText = "", s.dueDate) {
        const St = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(St.getTime()) && (d.calYear = St.getFullYear(), d.calMonth = St.getMonth());
      } else {
        const St = /* @__PURE__ */ new Date();
        d.calYear = St.getFullYear(), d.calMonth = St.getMonth();
      }
      const Dt = 252, Kt = st + O + Dt > window.innerWidth - 8;
      d.flyoutOpenLeft = Kt, d.flyoutStyle = {
        left: Kt ? `${-Dt - 6}px` : `${O + 6}px`,
        top: "0px"
      }, d.isOpen = !0;
    }
    function ce(s) {
      d.activeSubpanel === s ? d.activeSubpanel = null : (d.activeSubpanel = s, s === "desc" ? It(() => {
        et.value?.focus(), et.value?.select();
      }) : s === "labels" && It(() => {
        K.value?.focus();
      }));
    }
    function ze(s) {
      return !!d.task?.labels?.includes(s);
    }
    function go(s) {
      if (!d.task) return;
      const o = d.task.id, i = [...d.task.labels || []], O = i.includes(s) ? i.filter((u) => u !== s) : [...i, s];
      d.task.labels = O, ot.dispatch("update-task-labels", { taskId: o, labels: O });
    }
    function He() {
      if (!d.task) return;
      const s = d.newLabelText.trim();
      if (!s) return;
      d.newLabelText = "";
      const o = d.task.id, i = [...d.task.labels || []];
      i.includes(s) || (i.push(s), d.task.labels = i, ot.dispatch("update-task-labels", { taskId: o, labels: i })), vt();
    }
    function bo(s) {
      return String(d.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function ko(s, o) {
      if (!d.task) return;
      const i = d.task.id;
      ot.dispatch("update-task-recurring", { taskId: i, rule: s, label: o }), vt();
    }
    function Fe() {
      if (!d.task) return;
      const s = d.customRecurText.trim();
      if (!s) return;
      const o = d.task.id;
      ot.dispatch("update-task-recurring", { taskId: o, rule: s, label: s }), vt();
    }
    function yo() {
      if (!d.task) return;
      const s = d.task.id;
      ot.dispatch("clear-task-recurring", { taskId: s }), vt();
    }
    function ho(s) {
      if (!d.task) return;
      const o = d.task.id, i = W.find((O) => O.id === s);
      d.task.customColorHex = i?.hex || "", ot.dispatch("update-task-color", { taskId: o, colorId: s }), vt();
    }
    function wo(s) {
      if (!d.task) return;
      const o = d.task.id;
      ot.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), vt();
    }
    function To() {
      if (!d.task) return;
      const s = d.task, o = { x: d.x, y: d.y };
      vt();
      const i = Zt(o, 380, 220);
      m.x = i.x, m.y = i.y, s.isRecurring ? (m.title = "删除重复任务确认", m.icon = "⚠️", m.danger = !0, m.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", m.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, m.confirmText = "删除重复任务", m.actionType = "delete-task", m.payload = { taskId: s.id, isRecurring: !0 }, m.isOpen = !0) : (m.title = "删除任务确认", m.icon = "🗑️", m.danger = !0, m.alertText = `确定要删除任务「${s.content}」吗？`, m.message = "此操作不可撤销。", m.confirmText = "确认删除", m.actionType = "delete-task", m.payload = { taskId: s.id, isRecurring: !1 }, m.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, o, i) {
      Ne(s, o, i);
    });
    function Zt(s, o = 380, i = 220) {
      let O = null;
      if (s instanceof HTMLElement)
        O = s.getBoundingClientRect();
      else if (s && "currentTarget" in s && s.currentTarget instanceof HTMLElement)
        O = s.currentTarget.getBoundingClientRect();
      else if (s && "target" in s && s.target instanceof HTMLElement)
        O = (s.target.closest("button") || s.target).getBoundingClientRect();
      else if (s && "x" in s && "y" in s && typeof s.x == "number" && typeof s.y == "number") {
        const u = Math.max(16, Math.min(window.innerWidth - o - 16, s.x)), st = Math.max(16, Math.min(window.innerHeight - i - 16, s.y + 10));
        return { x: u, y: st };
      }
      if (O) {
        let u = O.right - o;
        u < 16 && (u = Math.max(16, O.left)), u = Math.max(16, Math.min(window.innerWidth - o - 16, u));
        let st = O.bottom + 8;
        return st + i > window.innerHeight - 16 && O.top > i + 16 && (st = O.top - i - 8), st = Math.max(16, Math.min(window.innerHeight - i - 16, st)), { x: u, y: st };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - i) / 3))
      };
    }
    function Ke(s, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const i = o.clientX, O = o.clientY, u = s === "prompt" ? P : m, st = u.x, U = u.y, Dt = (St) => {
        const Ce = St.clientX - i, _e = St.clientY - O;
        u.x = Math.max(10, Math.min(window.innerWidth - 320, st + Ce)), u.y = Math.max(10, Math.min(window.innerHeight - 120, U + _e));
      }, Kt = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Kt);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Kt);
    }
    function Ye(s) {
      const o = Zt(s, 380, 220);
      P.x = o.x, P.y = o.y, P.title = g("todoist.newProject"), P.message = g("todoist.inputProjectPlaceholder"), P.value = "", P.placeholder = g("todoist.inputProjectPlaceholder"), P.confirmText = g("common.confirm"), P.actionType = "create-project", P.payload = null, P.isOpen = !0, It(() => kt.value?.focus());
    }
    function Do(s, o) {
      const i = Zt(o, 380, 220);
      P.x = i.x, P.y = i.y, P.title = g("todoist.renameProject"), P.message = s.name, P.value = s.name, P.placeholder = g("todoist.inputProjectPlaceholder"), P.confirmText = g("common.save"), P.actionType = "rename-project", P.payload = { projectId: s.id }, P.isOpen = !0, It(() => {
        kt.value?.focus(), kt.value?.select();
      });
    }
    function xo(s, o) {
      const i = o || { x: B.x, y: B.y };
      B.isOpen = !1;
      const O = Zt(i, 380, 220);
      P.x = O.x, P.y = O.y, P.title = g("todoist.renameSection"), P.message = s.title, P.value = s.title, P.placeholder = g("todoist.inputSectionPlaceholder"), P.confirmText = g("common.save"), P.actionType = "rename-section", P.payload = { sectionId: s.sectionId }, P.isOpen = !0, It(() => {
        kt.value?.focus(), kt.value?.select();
      });
    }
    function le() {
      P.isOpen = !1;
    }
    function Ge() {
      const s = P.value.trim();
      if (!s) return;
      const { actionType: o, payload: i } = P;
      le(), o === "create-project" ? ot.dispatch("create-project-submit", s) : o === "rename-project" && i && "projectId" in i ? ot.dispatch("rename-project-submit", { projectId: i.projectId, newName: s }) : o === "rename-section" && i && "sectionId" in i && ot.dispatch("rename-section", { sectionId: i.sectionId, newName: s });
    }
    function Co(s, o) {
      const i = Zt(o, 380, 240);
      m.x = i.x, m.y = i.y, m.title = g("todoist.deleteProjectConfirm"), m.icon = "🗑️", m.danger = !0, m.alertText = g("todoist.deleteProjectAlert", { name: s.name }), m.message = g("todoist.deleteProjectWarning"), m.confirmText = g("common.deletePermanently"), m.actionType = "delete-project", m.payload = { projectId: s.id }, m.isOpen = !0;
    }
    function _o(s, o) {
      const i = o || { x: B.x, y: B.y };
      B.isOpen = !1;
      const O = Zt(i, 380, 240);
      m.x = O.x, m.y = O.y, m.title = g("todoist.deleteSectionConfirm"), m.icon = "🗑️", m.danger = !0, m.alertText = g("todoist.deleteSectionAlert", { name: s.title }), m.message = g("todoist.deleteSectionWarning"), m.confirmText = g("todoist.deleteSection"), m.actionType = "delete-section", m.payload = { sectionId: s.sectionId }, m.isOpen = !0;
    }
    function ue() {
      m.isOpen = !1;
    }
    function So() {
      const { actionType: s, payload: o } = m;
      ue(), s === "delete-project" && o && "projectId" in o ? ot.dispatch("delete-project-submit", o.projectId) : s === "delete-section" && o && "sectionId" in o ? ot.dispatch("delete-section", { sectionId: o.sectionId }) : s === "delete-task" && o && "taskId" in o && ot.dispatch("delete-task-submit", o);
    }
    function $o(s) {
      ot.dispatch("switch-project", s);
    }
    function De(s) {
      s.key === "Escape" && (P.isOpen && le(), m.isOpen && ue(), d.isOpen && (d.isOpen = !1, d.activeSubpanel = null), B.isOpen && (B.isOpen = !1));
    }
    function xe(s) {
      const o = s.target;
      o && (P.isOpen && yt.value && !yt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && le(), m.isOpen && A.value && !A.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ue());
    }
    return ct(() => q.active, (s) => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", xe), s && (document.addEventListener("keydown", De), window.addEventListener("pointerdown", xe));
    }, { immediate: !0, flush: "sync" }), Et(() => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", xe), k();
    }), (s, o) => (l(), p("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: vt
    }, [
      Re(s.$slots, "wallpaper", {}, void 0, !0),
      e(T).moveError && e(T).moveMessage ? (l(), p("p", nn, f(e(T).moveMessage), 1)) : _("", !0),
      e(T).emptyText && e(T).columns.length > 0 && !e(T).loading ? (l(), p("p", an, f(e(g)("todoist.tasksRetained", { text: e(T).emptyText })), 1)) : _("", !0),
      e(T).loading && e(T).columns.length === 0 ? (l(), p("p", ln, f(e(g)("common.loading")), 1)) : e(T).emptyText && e(T).columns.length === 0 ? (l(), p("p", rn, f(e(T).emptyText), 1)) : e(T).view === "projects" && e(T).projects.length === 0 ? (l(), p("div", dn, [
        o[33] || (o[33] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, f(e(g)("todoist.emptyProjects")), 1),
        t("p", null, f(e(g)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (i) => Ye(i))
        }, f(e(g)("todoist.createFirstProject")), 1)
      ])) : (l(), p(it, { key: 5 }, [
        e(T).view === "projects" && e(T).projects.length ? (l(), p("div", cn, [
          t("div", un, [
            t("div", pn, [
              (l(!0), p(it, null, dt(e(T).projects, (i) => (l(), p("button", {
                key: i.id,
                type: "button",
                class: Z(["todoist-project-tab", { active: String(i.id) === String(e(T).activeProjectId) }]),
                onClick: (O) => $o(i.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: bt({ background: i.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", vn, f(i.name), 1)
              ], 10, mn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (i) => Ye(i))
              }, "＋ 新建项目")
            ]),
            Ct.value ? (l(), p("div", fn, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(g)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (i) => Do(Ct.value, i))
              }, [
                o[34] || (o[34] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", bn, f(e(g)("common.rename")), 1)
              ], 8, gn),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(g)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (i) => Co(Ct.value, i))
              }, [
                o[35] || (o[35] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", yn, f(e(g)("todoist.deleteProject")), 1)
              ], 8, kn)
            ])) : _("", !0)
          ])
        ])) : _("", !0),
        t("div", hn, [
          (l(!0), p(it, null, dt(e(T).columns, (i, O) => (l(), p("section", {
            key: i.sectionId || i.title || O,
            class: "todoist-board-column",
            "data-section-id": i.sectionId,
            "data-title": i.title,
            "data-column-index": O
          }, [
            t("header", Tn, [
              t("h3", null, [
                Vt(f(i.title) + " ", 1),
                t("span", null, f(i.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: i.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: X((u) => fo(i, O, u), ["stop"])
              }, "•••", 8, Dn)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (u) => we(i, O, u)
            }, "＋ 添加任务", 8, xn),
            H.value === Mt(i, O) ? (l(), p("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: X((u) => Ue(i), ["prevent"])
            }, [
              Lt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (u) => R.value = u),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持粘贴图片）",
                onKeydown: (u) => vo(u, i),
                onPaste: o[5] || (o[5] = (u) => z(u))
              }, null, 40, _n), [
                [Yt, R.value]
              ]),
              $.value ? (l(), p("div", {
                key: 0,
                class: Z(["todoist-composer-date-hint", { "is-ignored": D.value }])
              }, [
                t("div", Sn, [
                  o[37] || (o[37] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", $n, [
                    Vt(f($.value.label) + f($.value.time ? " " + $.value.time : "") + " ", 1),
                    t("span", In, "(" + f($.value.formattedDate) + ")", 1)
                  ]),
                  D.value ? (l(), p("span", Rn, " (已忽略日期，按纯文本创建) ")) : (l(), p("span", Pn, [
                    o[36] || (o[36] = Vt(" 精简任务名: ", -1)),
                    t("strong", null, f(h.value), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (u) => D.value = !D.value)
                }, f(D.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : _("", !0),
              I.value.length > 0 ? (l(), p("div", Ln, [
                (l(!0), p(it, null, dt(I.value, (u, st) => (l(), p("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: u.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, On),
                  t("span", En, f(u.name), 1),
                  u.uploading ? (l(), p("span", Mn, "上传中…")) : _("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (U) => Q(st)
                  }, "×", 8, An)
                ]))), 128))
              ])) : _("", !0),
              t("div", jn, [
                t("button", {
                  type: "button",
                  disabled: S.value,
                  onClick: x
                }, f(e(g)("common.cancel")), 9, Wn),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: S.value
                }, f(S.value ? I.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Un)
              ])
            ], 40, Cn)) : _("", !0),
            Gt(sn, {
              tasks: e(j)(i, O),
              "pinned-id": e(At) || F.value,
              "hidden-id": e(Nt) !== null ? e(At) : null,
              "is-preview": e(ut),
              class: Z(["todoist-board-list", { "drag-over": e(Nt) === O }]),
              "data-group-index": O,
              onDragover: X((u) => e(J)(u, O), ["prevent"]),
              onDragleave: (u) => e($t)(u, O),
              onDrop: X((u) => e(be)(u, i), ["prevent"])
            }, {
              empty: se(() => [
                i.tasks.length === 0 && e(Nt) !== O ? (l(), p("p", Bn, " 暂无任务 · 可拖到这里 ")) : _("", !0)
              ]),
              default: se(({ task: u, index: st }) => [
                t("article", {
                  class: Z(["todoist-board-task", [
                    {
                      completed: u.completed,
                      "has-custom-color": !!u.customColorHex,
                      editing: F.value === u.id,
                      "dragging-task": !e(ut)(u) && e(At) === u.id,
                      "drop-before": e(Ft) === u.id && !e(jt),
                      "drop-after": e(Ft) === u.id && e(jt),
                      "saving-position": e(T).movingTaskId === u.id,
                      "todoist-task-preview": e(ut)(u),
                      "drag-origin-hidden": e(At) === u.id && !e(ut)(u) && e(Nt) !== null
                    }
                  ]]),
                  style: bt(u.customColorHex ? { "--task-custom-color": u.customColorHex } : {}),
                  "data-task-id": e(ut)(u) ? void 0 : u.id,
                  "aria-hidden": e(ut)(u) || void 0,
                  tabindex: e(ut)(u) ? -1 : 0,
                  title: Qt(),
                  draggable: !e(ut)(u) && !u.completed && !e(T).loading && !e(T).movingTaskId && !e(T).moveNeedsRefresh && F.value !== u.id && !u.id.startsWith("optimistic-"),
                  onDragstart: (U) => e(c)(U, u, i, st),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...U) => e(b) && e(b)(...U)),
                  onDragover: X((U) => e(Wt)(U, u, i, st), ["stop", "prevent"]),
                  onDrop: X((U) => e(ge)(U, u, i, st), ["stop", "prevent"]),
                  onDblclick: (U) => ye(u, U),
                  onClick: (U) => ae(u, U),
                  onContextmenu: X((U) => Ne(u, i, U), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: Z(["todoist-board-check", { checked: u.completed }]),
                    disabled: e(ut)(u) || e(T).movingTaskId === u.id,
                    title: u.completed ? "撤销完成" : "完成任务",
                    "aria-label": (u.completed ? "撤销完成：" : "完成：") + u.content,
                    onClick: X((U) => ke(u, i), ["stop"])
                  }, null, 10, Nn),
                  t("div", zn, [
                    e(T).movingTaskId === u.id ? (l(), p("span", Hn, "保存中")) : _("", !0),
                    v(u.id, u.description).length ? (l(), p("div", Fn, [
                      (l(!0), p(it, null, dt(v(u.id, u.description), (U) => (l(), p("button", {
                        key: U.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + U.fullName + " · 点击在插件内查看详情",
                        onClick: X((Dt) => N(U.fullName), ["stop"])
                      }, [
                        o[38] || (o[38] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", Yn, f(U.fullName), 1)
                      ], 8, Kn))), 128))
                    ])) : _("", !0),
                    w(u.id, u.description, u.content).length ? (l(), p("div", Gn, [
                      (l(!0), p(it, null, dt(w(u.id, u.description, u.content), (U) => (l(), p("button", {
                        key: U.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + U.title + " · 点击立即播放",
                        onClick: X((Dt) => L(U), ["stop"])
                      }, [
                        o[39] || (o[39] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", qn, f(U.title), 1)
                      ], 8, Xn))), 128))
                    ])) : _("", !0),
                    C(u.id, u.description, u.content).length ? (l(), p("div", Qn, [
                      (l(!0), p(it, null, dt(C(u.id, u.description, u.content), (U) => (l(), p("button", {
                        key: U.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (U.title || U.url) + " · 点击直接打开",
                        onClick: X((Dt) => E(U.url), ["stop"])
                      }, [
                        o[40] || (o[40] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", Zn, f(U.title || U.url), 1)
                      ], 8, Jn))), 128))
                    ])) : _("", !0),
                    F.value === u.id ? Lt((l(), p("textarea", {
                      key: 4,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: at,
                      "onUpdate:modelValue": o[7] || (o[7] = (U) => ft.value = U),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (U) => he(U, u),
                      onBlur: (U) => Ut(u, !0),
                      onClick: o[8] || (o[8] = X(() => {
                      }, ["stop"]))
                    }, null, 40, ti)), [
                      [Yt, ft.value]
                    ]) : (l(), p("p", ei, f(u.content || "未命名任务"), 1)),
                    ht(u) ? (l(), p("p", oi, f(ht(u)), 1)) : _("", !0),
                    Jt(u) ? (l(), p("div", si, [
                      u.startDate && !u.dueDate ? (l(), p("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${u.startDate}`
                      }, " 🛫 自 " + f(e(Ie)(u.startDate)) + " 起 ", 9, ni)) : u.startDate && u.dueDate ? (l(), p("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${u.startDate} 至 ${u.dueDate}`
                      }, " ⏱ " + f(e(Ie)(u.startDate)) + " ~ " + f(e(Ie)(u.dueDate)), 9, ii)) : u.dueText ? (l(), p("span", {
                        key: 2,
                        class: Z(["todoist-board-due", { recurring: u.isRecurring }]),
                        title: u.isRecurring ? `循环任务：${u.dueString || u.dueText}` : void 0
                      }, f(u.isRecurring ? "↻ " : "▣ ") + f(u.dueText), 11, ai)) : _("", !0),
                      (l(!0), p(it, null, dt((u.labels || []).slice(0, 3), (U) => (l(), p("span", {
                        key: U,
                        class: "todoist-board-label"
                      }, "◇ " + f(U), 1))), 128)),
                      u.timedDeadlineText ? (l(), p("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (u.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + f(u.timedDeadlineText), 9, li)) : _("", !0),
                      u.extraCountText ? (l(), p("span", ri, f(u.extraCountText), 1)) : _("", !0)
                    ])) : _("", !0),
                    zt(u) ? (l(), p("div", {
                      key: 8,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: X((U) => mo(zt(u), u), ["stop"])
                    }, [
                      t("img", {
                        src: zt(u),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, ci),
                      o[41] || (o[41] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, di)) : _("", !0)
                  ])
                ], 46, Vn)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, wn))), 128)),
          e(T).view === "inbox" || e(T).view === "projects" ? (l(), p("div", ui, [
            e(T).addingSection ? (l(), p("div", pi, [
              Lt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (i) => V.value = i),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  o[12] || (o[12] = (i) => e(qt)(i, Be)),
                  Le(Te, ["esc"])
                ]
              }, null, 544), [
                [Yt, V.value]
              ]),
              t("div", mi, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: Be
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: Te
                }, f(e(g)("common.cancel")), 1)
              ])
            ])) : (l(), p("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[10] || (o[10] = (i) => e(T).addingSection = !0)
            }, [...o[42] || (o[42] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : _("", !0)
        ])
      ], 64)),
      B.isOpen && B.col ? (l(), p("div", {
        key: 6,
        class: "todoist-section-menu",
        style: bt({ left: B.x + "px", top: B.y + "px" }),
        onClick: o[17] || (o[17] = X(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[13] || (o[13] = (i) => xo(B.col, i))
        }, [
          o[43] || (o[43] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", vi, f(e(g)("todoist.menu.renameSection")), 1)
        ]),
        B.col.sectionId ? (l(), p("div", fi, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !B.canMoveLeft,
            title: "向左移动板块",
            onClick: o[14] || (o[14] = (i) => Ve(B.col, -1))
          }, f(e(g)("todoist.menu.moveLeft")), 9, gi),
          o[44] || (o[44] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !B.canMoveRight,
            title: "向右移动板块",
            onClick: o[15] || (o[15] = (i) => Ve(B.col, 1))
          }, f(e(g)("todoist.menu.moveRight")), 9, bi)
        ])) : _("", !0),
        B.col.sectionId ? (l(), p("div", ki)) : _("", !0),
        B.col.sectionId ? (l(), p("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[16] || (o[16] = (i) => _o(B.col, i))
        }, [
          o[45] || (o[45] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", yi, f(e(g)("todoist.menu.deleteSection")), 1)
        ])) : _("", !0)
      ], 4)) : _("", !0),
      d.isOpen && d.task ? (l(), p("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: d.x + "px", top: d.y + "px" }),
        role: "menu",
        onClick: o[26] || (o[26] = X(() => {
        }, ["stop"]))
      }, [
        t("div", hi, [
          t("span", wi, f(d.task.content || e(g)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: d.activeSubpanel === "labels" }]),
          onClick: o[18] || (o[18] = (i) => ce("labels"))
        }, [
          o[46] || (o[46] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", Ti, f(e(g)("todoist.menu.cloudLabels")), 1),
          t("span", Di, f(d.task.labels && d.task.labels.length ? e(g)("todoist.menu.labelsSelected", { count: d.task.labels.length }) : e(g)("todoist.menu.labelsNone")), 1)
        ], 2),
        d.activeSubpanel === "labels" ? (l(), p("div", xi, [
          t("div", Ci, [
            Lt(t("input", {
              "onUpdate:modelValue": o[19] || (o[19] = (i) => d.newLabelText = i),
              type: "text",
              placeholder: e(g)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: o[20] || (o[20] = (i) => e(qt)(i, He))
            }, null, 40, _i), [
              [Yt, d.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: He
            }, "＋")
          ]),
          t("div", Si, [
            (l(!0), p(it, null, dt(nt.value, (i) => (l(), p("button", {
              key: i,
              type: "button",
              class: Z(["todoist-label-chip", { selected: ze(i) }]),
              onClick: (O) => go(i)
            }, [
              t("span", null, "◇ " + f(i), 1),
              ze(i) ? (l(), p("span", Ii, "✓")) : _("", !0)
            ], 10, $i))), 128))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: d.activeSubpanel === "recur" }]),
          onClick: o[21] || (o[21] = (i) => ce("recur"))
        }, [
          o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", Pi, f(e(g)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(d.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, f(d.task.isRecurring ? d.task.dueString || e(g)("todoist.recur.recurring") : e(g)("todoist.menu.labelsNone")), 5)
        ], 2),
        d.activeSubpanel === "recur" ? (l(), p("div", Ri, [
          t("div", Li, [
            (l(), p(it, null, dt(G, (i) => t("button", {
              key: i.rule,
              type: "button",
              class: Z(["todoist-recur-chip", { selected: bo(i.rule) }]),
              onClick: (O) => ko(i.rule, i.label)
            }, [
              t("span", null, f(i.icon), 1),
              t("span", null, f(i.label), 1)
            ], 10, Oi)), 64))
          ]),
          t("div", Ei, [
            Lt(t("input", {
              "onUpdate:modelValue": o[22] || (o[22] = (i) => d.customRecurText = i),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: o[23] || (o[23] = (i) => e(qt)(i, Fe))
            }, null, 544), [
              [Yt, d.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Fe
            }, "确定")
          ]),
          d.task.isRecurring ? (l(), p("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: yo
          }, f(e(g)("todoist.menu.clearRecur")), 1)) : _("", !0)
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: d.activeSubpanel === "color" }]),
          onClick: o[24] || (o[24] = (i) => ce("color"))
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", Mi, f(e(g)("todoist.menu.pickColor")), 1),
          t("span", Ai, [
            mt.value.id === "none" ? (l(), p("span", ji, "⊘")) : (l(), p("span", {
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
            Vt(" " + f(mt.value.name), 1)
          ])
        ], 2),
        d.activeSubpanel === "color" ? (l(), p("div", Wi, [
          t("div", Ui, [
            (l(), p(it, null, dt(W, (i) => t("button", {
              key: i.id,
              type: "button",
              class: Z(["todoist-color-swatch", { selected: mt.value.id === i.id }]),
              title: i.name,
              onClick: (O) => ho(i.id)
            }, [
              t("span", {
                class: Z(["todoist-color-dot", { none: i.id === "none" }]),
                style: bt(i.id !== "none" ? { background: i.hex } : {})
              }, f(i.id === "none" ? mt.value.id === "none" ? "✓" : "⊘" : mt.value.id === i.id ? "✓" : ""), 7),
              t("span", Vi, f(i.name), 1)
            ], 10, Bi)), 64))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: Z(["todoist-task-menu-item", { active: d.activeSubpanel === "project" }]),
          onClick: o[25] || (o[25] = (i) => ce("project"))
        }, [
          o[49] || (o[49] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Ni, f(e(g)("todoist.menu.moveToProject")), 1),
          o[50] || (o[50] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        d.activeSubpanel === "project" ? (l(), p("div", {
          key: 3,
          class: Z(["todoist-project-flyout", { "open-left": d.flyoutOpenLeft }]),
          style: bt(d.flyoutStyle)
        }, [
          (l(!0), p(it, null, dt(e(T).projects, (i) => (l(), p("button", {
            key: i.id,
            type: "button",
            class: Z(["todoist-project-flyout-item", { active: String(i.id) === pt.value }]),
            disabled: !!e(T).movingTaskId || String(i.id) === pt.value,
            onClick: (O) => wo(i)
          }, [
            o[51] || (o[51] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Hi, f(i.name), 1),
            String(i.id) === pt.value ? (l(), p("span", Fi, f(e(g)("todoist.menu.currentBadge")), 1)) : _("", !0)
          ], 10, zi))), 128))
        ], 6)) : _("", !0),
        o[53] || (o[53] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: To
        }, [
          o[52] || (o[52] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", Ki, f(d.task.isRecurring ? e(g)("todoist.menu.deleteRecurringTask") : e(g)("todoist.menu.deleteTask")), 1)
        ])
      ], 4)) : _("", !0),
      P.isOpen && e(q).active ? (l(), p("div", {
        key: 8,
        ref_key: "promptDialogCardRef",
        ref: yt,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${P.x}px`,
          top: `${P.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[30] || (o[30] = X(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (i) => Ke("prompt", i))
        }, [
          o[54] || (o[54] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", Yi, f(P.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(g)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Gi)
        ], 32),
        t("div", Xi, [
          P.message ? (l(), p("p", qi, f(P.message), 1)) : _("", !0),
          Lt(t("input", {
            ref_key: "promptInputRef",
            ref: kt,
            "onUpdate:modelValue": o[28] || (o[28] = (i) => P.value = i),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: P.placeholder,
            onKeydown: [
              o[29] || (o[29] = (i) => e(qt)(i, Ge)),
              Le(X(le, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, Qi), [
            [Yt, P.value]
          ])
        ]),
        t("div", Ji, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: le
          }, f(e(g)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: Ge
          }, f(P.confirmText || e(g)("common.confirm")), 1)
        ])
      ], 4)) : _("", !0),
      m.isOpen && e(q).active ? (l(), p("div", {
        key: 9,
        ref_key: "confirmDialogCardRef",
        ref: A,
        class: "todoist-dialog-card is-modeless is-draggable",
        style: bt({
          position: "fixed",
          left: `${m.x}px`,
          top: `${m.y}px`,
          width: "min(380px, calc(100vw - 32px))",
          margin: 0
        }),
        onClick: o[32] || (o[32] = X(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[31] || (o[31] = (i) => Ke("confirm", i))
        }, [
          t("span", Zi, f(m.icon || "⚠️"), 1),
          t("h3", ta, f(m.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(g)("todoist.dragDialogHint")
          }, "⋮⋮", 8, ea)
        ], 32),
        t("div", oa, [
          m.danger ? (l(), p("div", sa, [
            t("div", na, f(m.alertText), 1)
          ])) : _("", !0),
          t("p", ia, f(m.message), 1)
        ]),
        t("div", aa, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ue
          }, f(e(g)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: Z(["todoist-dialog-btn", m.danger ? "danger" : "primary"]),
            onClick: So
          }, f(m.confirmText || e(g)("common.confirm")), 3)
        ])
      ], 4)) : _("", !0)
    ]));
  }
}), ra = /* @__PURE__ */ ne(la, [["__scopeId", "data-v-b8db0cb5"]]), no = {
  activePopover: "none",
  isDescEditing: !1
};
class da {
  constructor() {
    this._state = { ...no }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.todoistInspector = this);
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
  isPopoverOpen(n) {
    return this._state.activePopover === n;
  }
  subscribe(n) {
    return this._listeners.add(n), () => {
      this._listeners.delete(n);
    };
  }
  _setState(n) {
    this._state = n;
    for (const r of this._listeners)
      r(n);
  }
  send(n) {
    const r = this._state;
    switch (n.type) {
      case "OPEN_POPOVER":
        return this._setState({
          ...r,
          activePopover: n.popover
        }), !0;
      case "TOGGLE_POPOVER": {
        const v = r.activePopover === n.popover ? "none" : n.popover;
        return this._setState({
          ...r,
          activePopover: v
        }), !0;
      }
      case "CLOSE_POPOVER":
        return r.activePopover !== "none" ? (this._setState({
          ...r,
          activePopover: "none"
        }), !0) : !1;
      case "START_DESC_EDIT":
        return this._setState({
          ...r,
          isDescEditing: !0,
          activePopover: "none"
        }), !0;
      case "FINISH_DESC_EDIT":
        return r.isDescEditing ? (this._setState({
          ...r,
          isDescEditing: !1
        }), !0) : !1;
      case "RESET_ALL":
        return this._setState({ ...no }), !0;
      default:
        return !1;
    }
  }
}
const ca = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, ua = { class: "reminder-shortcuts" }, pa = ["disabled"], ma = { class: "reminder-preview" }, va = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, fa = ["disabled"], ga = ["disabled"], ba = ["disabled"], ka = /* @__PURE__ */ Ht({
  __name: "ReminderPicker",
  props: {
    anchor: {},
    taskId: {},
    value: {},
    taskDate: {},
    taskTime: {}
  },
  emits: ["close"],
  setup(a, { emit: n }) {
    const r = a, v = n, w = r.value || (r.taskDate ? r.taskDate + "T" + (r.taskTime || "09:00") : ""), C = M(w.slice(0, 10)), E = M(w.slice(11, 16)), L = M(!1), N = M(""), Y = M(!0), T = tt(() => C.value && E.value ? (/* @__PURE__ */ new Date(C.value + "T" + E.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function V(R) {
      if (L.value) return;
      const D = /* @__PURE__ */ new Date();
      R === "tomorrow" ? (D.setDate(D.getDate() + 1), D.setHours(9, 0, 0, 0)) : D.setTime(D.getTime() + R * 6e4), C.value = `${D.getFullYear()}-${String(D.getMonth() + 1).padStart(2, "0")}-${String(D.getDate()).padStart(2, "0")}`, E.value = `${String(D.getHours()).padStart(2, "0")}:${String(D.getMinutes()).padStart(2, "0")}`, N.value = "", Y.value = !0;
    }
    async function H(R) {
      if (!(L.value || q.pendingWrites)) {
        if (R && (!Number.isFinite(Date.parse(R)) || Date.parse(R) <= Date.now())) {
          N.value = "请选择未来的提醒时间。";
          return;
        }
        if (y.taskId === r.taskId) {
          L.value = !0, N.value = "";
          try {
            if (await rt.setReminder(R), y.taskId !== r.taskId) return;
            y.error ? N.value = y.error : y.reminderTime === R && v("close");
          } finally {
            L.value = !1;
          }
        }
      }
    }
    return (R, D) => (l(), Ot(Me, {
      anchor: a.anchor,
      onClose: D[9] || (D[9] = ($) => v("close"))
    }, {
      default: se(() => [
        t("section", ca, [
          D[11] || (D[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", ua, [
            t("button", {
              type: "button",
              onClick: D[0] || (D[0] = ($) => V(10))
            }, "10分钟后"),
            t("button", {
              type: "button",
              onClick: D[1] || (D[1] = ($) => V(60))
            }, "1小时后"),
            t("button", {
              type: "button",
              onClick: D[2] || (D[2] = ($) => V("tomorrow"))
            }, "明早9点")
          ]),
          t("fieldset", { disabled: L.value }, [
            D[10] || (D[10] = t("legend", { class: "sr-only" }, "提醒日期和时间", -1)),
            Gt(Ae, {
              modelValue: C.value,
              "onUpdate:modelValue": D[3] || (D[3] = ($) => C.value = $),
              "time-value": E.value,
              "onUpdate:timeValue": D[4] || (D[4] = ($) => E.value = $),
              embedded: "",
              onTimeValidity: D[5] || (D[5] = ($) => Y.value = $)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, pa),
          t("div", ma, f(T.value || "选择提醒的日期和时间"), 1),
          D[12] || (D[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          N.value ? (l(), p("p", va, f(N.value), 1)) : _("", !0),
          t("footer", null, [
            a.value ? (l(), p("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: L.value || !!e(q).pendingWrites,
              onClick: D[6] || (D[6] = ($) => H(""))
            }, "移除提醒", 8, fa)) : _("", !0),
            t("button", {
              type: "button",
              disabled: L.value,
              onClick: D[7] || (D[7] = ($) => v("close"))
            }, "取消", 8, ga),
            t("button", {
              type: "button",
              class: "save",
              disabled: L.value || !!e(q).pendingWrites || !C.value || !E.value || !Y.value,
              onClick: D[8] || (D[8] = ($) => H(C.value + "T" + E.value))
            }, f(L.value ? "保存中…" : "设置提醒"), 9, ba)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), ya = /* @__PURE__ */ ne(ka, [["__scopeId", "data-v-da9e3ddd"]]), ha = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, wa = { class: "inspector-main-col" }, Ta = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Da = {
  key: 1,
  class: "inspector-repo-badges"
}, xa = ["title", "onClick"], Ca = { class: "repo-badge-name" }, _a = { class: "inspector-section inspector-title-section" }, Sa = { class: "task-title-row" }, $a = ["title"], Ia = {
  key: 0,
  class: "check-mark"
}, Pa = ["value", "aria-label", "disabled", "placeholder"], Ra = ["value", "placeholder", "disabled"], La = ["onKeydown"], Oa = {
  key: 0,
  class: "desc-placeholder-btn"
}, Ea = ["innerHTML"], Ma = {
  key: 2,
  role: "status"
}, Aa = {
  key: 3,
  class: "attached-img-grid"
}, ja = ["onClick"], Wa = ["src", "alt"], Ua = { class: "attached-img-info" }, Ba = ["onClick"], Va = { class: "inspector-section inspector-subtasks-section" }, Na = {
  key: 0,
  class: "subtasks-list"
}, za = ["onClick"], Ha = {
  key: 0,
  class: "check-tick"
}, Fa = { class: "subtask-content-text" }, Ka = ["title", "onClick"], Ya = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Ga = ["value", "placeholder"], Xa = { class: "subtask-actions" }, qa = { class: "inspector-section inspector-comments-section" }, Qa = { class: "comment-input-bar" }, Ja = { class: "comment-input-wrap" }, Za = ["value", "placeholder", "disabled"], tl = ["title"], el = ["disabled"], ol = {
  key: 0,
  class: "comments-list"
}, sl = { class: "comment-item-content" }, nl = { class: "comment-item-header" }, il = { class: "comment-time" }, al = { class: "comment-text" }, ll = {
  key: 0,
  class: "comment-attached-thumb"
}, rl = ["src", "onClick"], dl = { class: "inspector-side-col" }, cl = { class: "side-prop-group date-picker-anchor" }, ul = { class: "row-text" }, pl = { class: "side-prop-group date-picker-anchor" }, ml = { class: "row-text" }, vl = ["title"], fl = { class: "side-prop-group" }, gl = { class: "side-prop-label" }, bl = { class: "row-text" }, kl = { class: "inspector-menu" }, yl = ["disabled", "onClick"], hl = { key: 0 }, wl = { class: "side-prop-group" }, Tl = { class: "side-prop-label" }, Dl = { class: "row-text" }, xl = { class: "inspector-menu" }, Cl = ["placeholder", "aria-label"], _l = { key: 0 }, Sl = {
  key: 1,
  role: "alert"
}, $l = { class: "label-options-list" }, Il = ["checked", "disabled", "onChange"], Pl = ["disabled"], Rl = { key: 3 }, Ll = { class: "side-prop-group" }, Ol = { class: "side-prop-label" }, El = { class: "row-text" }, Ml = /* @__PURE__ */ Ht({
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
  setup(a, { emit: n }) {
    const r = a, v = n, w = new da(), C = Jo(w), E = tt(() => C.value.isDescEditing), L = tt(() => C.value.activePopover === "start_date"), N = tt(() => C.value.activePopover === "due_date"), Y = tt(() => C.value.activePopover === "priority"), T = tt(() => C.value.activePopover === "labels"), V = tt(() => C.value.activePopover === "reminder"), H = M(null), R = M(null);
    let D;
    oe(() => {
      qo();
      let j = -1;
      D = new ResizeObserver((c) => {
        const b = c[0]?.contentRect.width;
        b !== j && (j = b, I(R.value), I(H.value));
      }), R.value?.parentElement && D.observe(R.value.parentElement);
    }), Et(() => {
      D?.disconnect(), w.send({ type: "RESET_ALL" });
    });
    const $ = tt(() => {
      if (!r.editDescription) return "";
      const j = r.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), c = document.createElement("template");
      c.innerHTML = Zo.renderMarkdown(j);
      const b = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const J of Array.from(c.content.querySelectorAll("*"))) {
        if (!b.has(J.tagName)) {
          J.replaceWith(document.createTextNode(J.textContent || ""));
          continue;
        }
        const $t = J.tagName === "A" ? J.getAttribute("href") : null;
        for (const Wt of Array.from(J.attributes)) J.removeAttribute(Wt.name);
        $t && /^(https?:\/\/|mailto:)/i.test($t) && (J.setAttribute("href", $t), J.setAttribute("target", "_blank"), J.setAttribute("rel", "noopener noreferrer"));
      }
      return c.innerHTML;
    });
    function h() {
      w.send({ type: "START_DESC_EDIT" }), It(() => {
        I(H.value), H.value?.focus();
      });
    }
    function I(j) {
      j && (j.style.height = "auto", j.style.height = j.scrollHeight + "px");
    }
    function z(j) {
      I(j.el);
    }
    function Q(j) {
      const c = j.target;
      I(c), v("update:editDescription", c.value), v("scheduleDraftSave", j);
    }
    function F(j) {
      je(j) || (po(j) ? (j.preventDefault(), v("confirmAddSubtask")) : j.key === "Escape" && (j.preventDefault(), v("update:isAddingSubtask", !1)));
    }
    function ft() {
      v("saveTitleAndDesc"), w.send({ type: "FINISH_DESC_EDIT" });
    }
    const at = M(null), B = M(null), P = M(""), kt = M(null), yt = M(null), m = M(null), A = M([]), d = M(!1), et = M("");
    let K;
    ct(() => [r.state.taskId, T.value], async (j, c, b) => {
      if (K?.abort(), !T.value) return;
      const J = new AbortController();
      K = J, b(() => J.abort()), A.value = [], d.value = !0, et.value = "";
      try {
        const $t = await lt.getLabels(J.signal);
        J.signal.aborted || (A.value = $t.map((Wt) => Wt.name));
      } catch {
        J.signal.aborted || (et.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        J.signal.aborted || (d.value = !1);
      }
    });
    function W() {
      w.send({ type: "OPEN_POPOVER", popover: "reminder" });
    }
    const G = [
      { level: 4, name: "优先级 1", color: "#d1453b" },
      { level: 3, name: "优先级 2", color: "#eb8909" },
      { level: 2, name: "优先级 3", color: "#246fe0" },
      { level: 1, name: "优先级 4", color: "#808080" }
    ];
    function pt(j) {
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
    function Ct(j) {
      w.send({ type: "CLOSE_POPOVER" }), v("selectPriority", j);
    }
    const nt = tt(() => {
      const j = /* @__PURE__ */ new Set([...A.value, ...r.availableLabels || []]);
      for (const c of r.state.labels || []) j.add(c);
      return Array.from(j);
    }), mt = tt(() => {
      const j = P.value.trim().toLowerCase();
      return j ? nt.value.filter((c) => c.toLowerCase().includes(j)) : nt.value;
    });
    function Mt() {
      const j = P.value.trim();
      j && (v("createLabel", j), P.value = "");
    }
    function Qt(j, c) {
      We.open(j, c);
    }
    const Jt = M(0);
    function vt() {
      Jt.value++;
    }
    oe(() => {
      window.addEventListener("storage", vt), window.addEventListener("todoist-repository-links-changed", vt);
    }), Et(() => {
      window.removeEventListener("storage", vt), window.removeEventListener("todoist-repository-links-changed", vt);
    });
    const At = tt(() => (Jt.value, lo(r.state.taskId, r.editDescription)));
    function Nt(j) {
      ro.open(j);
    }
    function Ft(j, c) {
      if (!j) return "";
      try {
        const b = j.split("-"), J = parseInt(b[1], 10), $t = parseInt(b[2], 10), Wt = c ? ` ${c}` : "";
        return `${J}月${$t}日${Wt}`;
      } catch {
        return j;
      }
    }
    function jt(j) {
      if (!j) return "";
      try {
        const c = new Date(j);
        return `${c.getMonth() + 1}月${c.getDate()}日 ${String(c.getHours()).padStart(2, "0")}:${String(c.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    function ut(j) {
      if (!j) return "刚刚";
      try {
        const c = new Date(j);
        return `${c.getMonth() + 1}月${c.getDate()}日 ${String(c.getHours()).padStart(2, "0")}:${String(c.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    return (j, c) => a.state.isOpen ? (l(), p("div", ha, [
      t("main", wa, [
        a.state.error ? (l(), p("p", Ta, f(a.state.error), 1)) : _("", !0),
        At.value.length ? (l(), p("div", Da, [
          (l(!0), p(it, null, dt(At.value, (b) => (l(), p("button", {
            key: b.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(g)("todoist.linkRepoTitle", { name: b.fullName }),
            onClick: (J) => Nt(b.fullName)
          }, [
            c[37] || (c[37] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", Ca, f(b.fullName), 1),
            c[38] || (c[38] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, xa))), 128))
        ])) : _("", !0),
        t("section", _a, [
          t("div", Sa, [
            t("button", {
              type: "button",
              class: Z(["task-complete-circle-btn", { completed: a.isTaskCompleted }]),
              title: e(g)("todoist.toggleComplete"),
              onClick: c[0] || (c[0] = (b) => v("toggleComplete"))
            }, [
              a.isTaskCompleted ? (l(), p("span", Ia, "✓")) : _("", !0)
            ], 10, $a),
            t("textarea", {
              value: a.editTitle,
              rows: "1",
              "aria-label": e(g)("todoist.taskTitle"),
              onVnodeMounted: z,
              onVnodeUpdated: z,
              disabled: a.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: R,
              class: Z(["inspector-input-title", { "title-done": a.isTaskCompleted }]),
              placeholder: e(g)("todoist.taskTitle"),
              onInput: c[1] || (c[1] = (b) => {
                I(b.target), v("update:editTitle", b.target.value), v("scheduleDraftSave", b);
              }),
              onCompositionend: c[2] || (c[2] = (b) => v("scheduleDraftSave", b)),
              onBlur: c[3] || (c[3] = (b) => v("saveTitleAndDesc", b)),
              onKeydown: c[4] || (c[4] = (b) => e(qt)(b, (J) => v("saveTitleAndDesc", J)))
            }, null, 42, Pa)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: c[7] || (c[7] = X((b) => v("dragover"), ["prevent"])),
          onDragleave: c[8] || (c[8] = X((b) => v("dragleave"), ["prevent"])),
          onDrop: c[9] || (c[9] = X((b) => v("dropImage", b), ["prevent"]))
        }, [
          E.value ? (l(), p("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: H,
            value: a.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(g)("todoist.taskDesc"),
            disabled: a.isUploadingImg,
            onInput: Q,
            onCompositionend: c[5] || (c[5] = (b) => v("scheduleDraftSave", b)),
            onBlur: ft,
            onPaste: c[6] || (c[6] = (b) => v("descPaste", b))
          }, null, 40, Ra)) : (l(), p("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: h,
            onKeydown: Le(X(h, ["prevent"]), ["enter"])
          }, [
            a.editDescription ? (l(), p("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: $.value
            }, null, 8, Ea)) : (l(), p("span", Oa, "≡ 描述"))
          ], 40, La)),
          a.isUploadingImg ? (l(), p("small", Ma, "图片上传中…")) : _("", !0),
          a.attachedImages.length ? (l(), p("div", Aa, [
            (l(!0), p(it, null, dt(a.attachedImages, (b) => (l(), p("div", {
              key: b.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (J) => Qt(b.url, b.name)
              }, [
                t("img", {
                  src: b.url,
                  alt: b.name,
                  loading: "lazy"
                }, null, 8, Wa)
              ], 8, ja),
              t("div", Ua, [
                t("span", null, f(b.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (J) => v("removeAttachedImage", b.url)
                }, "×", 8, Ba)
              ])
            ]))), 128))
          ])) : _("", !0)
        ], 32),
        t("section", Va, [
          a.subtasks.length > 0 ? (l(), p("div", Na, [
            (l(!0), p(it, null, dt(a.subtasks, (b) => (l(), p("div", {
              key: b.id,
              class: Z(["subtask-row-item", { done: b.completed }])
            }, [
              t("button", {
                type: "button",
                class: Z(["subtask-check-circle", { checked: b.completed }]),
                onClick: (J) => v("toggleSubtask", b.id)
              }, [
                b.completed ? (l(), p("span", Ha, "✓")) : _("", !0)
              ], 10, za),
              t("span", Fa, f(b.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(g)("todoist.subtask.delete"),
                onClick: (J) => v("removeSubtask", b.id)
              }, "×", 8, Ka)
            ], 2))), 128))
          ])) : _("", !0),
          a.isAddingSubtask ? (l(), p("div", Ya, [
            t("input", {
              value: a.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(g)("todoist.subtask.inputPlaceholder"),
              onInput: c[10] || (c[10] = (b) => v("update:newSubtaskText", b.target.value)),
              onKeydown: F
            }, null, 40, Ga),
            t("div", Xa, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: c[11] || (c[11] = (b) => v("confirmAddSubtask"))
              }, f(e(g)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: c[12] || (c[12] = (b) => v("update:isAddingSubtask", !1))
              }, f(e(g)("common.cancel")), 1)
            ])
          ])) : (l(), p("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: c[13] || (c[13] = (b) => v("update:isAddingSubtask", !0))
          }, [
            c[39] || (c[39] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Vt(" " + f(e(g)("todoist.subtask.add")), 1)
          ]))
        ]),
        (l(), Ot(Yo, {
          key: a.state.taskId,
          "task-id": a.state.taskId,
          description: a.editDescription,
          title: a.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", qa, [
          t("div", Qa, [
            c[40] || (c[40] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Ja, [
              t("input", {
                value: a.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(g)("todoist.comment.placeholder"),
                disabled: a.isSubmittingComment,
                onInput: c[14] || (c[14] = (b) => v("update:newCommentText", b.target.value)),
                onKeydown: c[15] || (c[15] = (b) => e(qt)(b, () => v("submitComment")))
              }, null, 40, Za),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(g)("todoist.comment.attachPhoto"),
                onClick: c[16] || (c[16] = X((b) => v("triggerFileInput"), ["stop"]))
              }, "📎", 8, tl)
            ]),
            a.newCommentText.trim() ? (l(), p("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: a.isSubmittingComment,
              onClick: c[17] || (c[17] = (b) => v("submitComment"))
            }, f(e(g)("todoist.comment.send")), 9, el)) : _("", !0)
          ]),
          a.state.comments.length > 0 ? (l(), p("div", ol, [
            (l(!0), p(it, null, dt(a.state.comments, (b) => (l(), p("div", {
              key: b.id,
              class: "comment-item"
            }, [
              c[42] || (c[42] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", sl, [
                t("div", nl, [
                  c[41] || (c[41] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", il, f(ut(b.postedAt)), 1)
                ]),
                t("div", al, f(b.content), 1),
                b.attachment?.url ? (l(), p("div", ll, [
                  t("img", {
                    src: b.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (J) => Qt(b.attachment.url, b.attachment.name)
                  }, null, 8, rl)
                ])) : _("", !0)
              ])
            ]))), 128))
          ])) : _("", !0)
        ])
      ]),
      t("aside", dl, [
        t("div", cl, [
          c[44] || (c[44] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: at,
            type: "button",
            class: Z(["side-item-row click-row", { active: L.value, filled: !!a.editStartDate }]),
            onClick: c[19] || (c[19] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "start_date" }))
          }, [
            c[43] || (c[43] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", ul, f(Ft(a.editStartDate, a.editStartTime) || "安排日期"), 1),
            a.editStartDate ? (l(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: c[18] || (c[18] = X((b) => v("clearStartDate"), ["stop"]))
            }, "×")) : _("", !0)
          ], 2),
          L.value ? (l(), Ot(Ae, {
            key: 0,
            "model-value": a.editStartDate,
            "time-value": a.editStartTime,
            "anchor-el": at.value,
            "onUpdate:modelValue": c[20] || (c[20] = (b) => v("update:editStartDate", b)),
            "onUpdate:timeValue": c[21] || (c[21] = (b) => v("update:editStartTime", b)),
            onChange: c[22] || (c[22] = (b) => v("startChange")),
            onClose: c[23] || (c[23] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", pl, [
          c[46] || (c[46] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: B,
            type: "button",
            class: Z(["side-item-row click-row", { active: N.value, filled: !!a.editDueDate }]),
            onClick: c[25] || (c[25] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "due_date" }))
          }, [
            c[45] || (c[45] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", ml, f(Ft(a.editDueDate, a.editDueTime) || e(g)("todoist.prop.setDueDate")), 1),
            a.editDueDate ? (l(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(g)("todoist.prop.clearDueDate"),
              onClick: c[24] || (c[24] = X((b) => v("clearDueDate"), ["stop"]))
            }, "×", 8, vl)) : _("", !0)
          ], 2),
          N.value ? (l(), Ot(Ae, {
            key: 0,
            "model-value": a.editDueDate,
            "time-value": a.editDueTime,
            "anchor-el": B.value,
            "onUpdate:modelValue": c[26] || (c[26] = (b) => v("update:editDueDate", b)),
            "onUpdate:timeValue": c[27] || (c[27] = (b) => v("update:editDueTime", b)),
            onChange: c[28] || (c[28] = (b) => v("dueChange")),
            onClose: c[29] || (c[29] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", fl, [
          t("span", gl, f(e(g)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: m,
            type: "button",
            class: "side-item-row",
            onClick: c[30] || (c[30] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "priority" }))
          }, [
            t("span", {
              style: bt({ color: pt(a.state.priority) })
            }, "⚑", 4),
            t("span", bl, "P" + f(5 - a.state.priority), 1),
            c[47] || (c[47] = t("span", null, "⌄", -1))
          ], 512),
          Y.value ? (l(), Ot(Me, {
            key: 0,
            anchor: m.value,
            onClose: c[31] || (c[31] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: se(() => [
              t("div", kl, [
                (l(), p(it, null, dt(G, (b) => t("button", {
                  key: b.level,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: (J) => Ct(b.level)
                }, [
                  t("span", {
                    style: bt({ color: b.color })
                  }, "⚑", 4),
                  Vt(" " + f(b.name) + " ", 1),
                  a.state.priority === b.level ? (l(), p("span", hl, "✓")) : _("", !0)
                ], 8, yl)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", wl, [
          t("span", Tl, f(e(g)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: kt,
            type: "button",
            class: "side-item-row",
            onClick: c[32] || (c[32] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "labels" }))
          }, [
            t("span", Dl, f(a.state.labels.join("、") || e(g)("todoist.prop.addLabels")), 1),
            c[48] || (c[48] = t("span", null, "＋", -1))
          ], 512),
          T.value ? (l(), Ot(Me, {
            key: 0,
            anchor: kt.value,
            onClose: c[35] || (c[35] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: se(() => [
              t("div", xl, [
                Lt(t("input", {
                  "onUpdate:modelValue": c[33] || (c[33] = (b) => P.value = b),
                  placeholder: e(g)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(g)("todoist.prop.searchLabelAria"),
                  onKeydown: c[34] || (c[34] = (b) => e(qt)(b, Mt))
                }, null, 40, Cl), [
                  [Yt, P.value]
                ]),
                d.value ? (l(), p("small", _l, f(e(g)("todoist.prop.readingLabels")), 1)) : _("", !0),
                et.value ? (l(), p("p", Sl, f(et.value), 1)) : _("", !0),
                t("div", $l, [
                  (l(!0), p(it, null, dt(mt.value, (b) => (l(), p("label", {
                    key: b,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + f(b), 1),
                    t("input", {
                      type: "checkbox",
                      checked: a.state.labels.includes(b),
                      disabled: !!e(q).pendingWrites,
                      onChange: (J) => v("toggleLabelSelect", b)
                    }, null, 40, Il)
                  ]))), 128))
                ]),
                P.value.trim() && !nt.value.includes(P.value.trim()) ? (l(), p("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: Mt
                }, f(e(g)("todoist.prop.createLabelBtn", { name: P.value.trim() })), 9, Pl)) : _("", !0),
                !d.value && !mt.value.length && !P.value ? (l(), p("small", Rl, f(e(g)("todoist.prop.noLabels")), 1)) : _("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", Ll, [
          t("span", Ol, [
            Vt(f(e(g)("todoist.prop.reminder")) + " ", 1),
            t("small", null, f(e(g)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: yt,
            type: "button",
            class: "side-item-row",
            onClick: W
          }, [
            t("span", El, f(jt(a.state.reminderTime) || e(g)("todoist.prop.addReminder")), 1),
            c[49] || (c[49] = t("span", null, "＋", -1))
          ], 512),
          V.value ? (l(), Ot(ya, {
            key: 0,
            anchor: yt.value,
            "task-id": a.state.taskId,
            value: a.state.reminderTime,
            "task-date": a.editStartDate || a.editDueDate,
            "task-time": a.editStartTime || a.editDueTime,
            onClose: c[36] || (c[36] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : _("", !0)
        ])
      ])
    ])) : _("", !0);
  }
}), Al = /* @__PURE__ */ ne(Ml, [["__scopeId", "data-v-b5062f07"]]), jl = { class: "inspector-title-row" }, Wl = ["title", "aria-label"], Ul = ["disabled"], Bl = ["href"], Vl = "todoistInspectorPositionV2", Nl = /* @__PURE__ */ Ht({
  __name: "TodoistInspectorDrawer",
  setup(a) {
    const n = y, r = tt(() => Rt.get(n.taskId)), v = tt(() => r.value?.status === "failed" ? "保存未确认" : r.value?.status === "saving" ? "正在保存…" : T.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), w = tt(() => [
      v.value,
      r.value?.status === "failed" ? r.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: C,
      headerRef: E,
      initialStyle: L,
      onHeaderPointerDown: N,
      onResizePointerDown: Y
    } = ao({
      windowId: "todoist-inspector",
      storageKey: Vl,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => n.isOpen && q.active
    }), T = M(""), V = M(""), H = M(""), R = M(""), D = M(""), $ = M(""), h = M("idle"), I = tt(() => h.value === "uploading_img"), z = tt(() => h.value === "submitting_comment"), Q = M(!1), F = M(null), ft = M(!1), at = M(""), B = M(""), P = tt(() => {
      const x = n.description || "", k = [], S = x.split(`
`);
      let gt = 0;
      for (const _t of S) {
        const ht = _t.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
        ht && k.push({
          id: `st_${gt++}`,
          completed: ht[1].toLowerCase() === "x",
          text: ht[2].trim()
        });
      }
      return k;
    }), kt = tt(() => P.value.filter((x) => x.completed).length);
    function yt(x) {
      const gt = (n.description || "").split(`
`).filter((zt) => !zt.match(/^\s*-\s*\[([ xX])\]/)), _t = x.map((zt) => `- [${zt.completed ? "x" : " "}] ${zt.text}`), ht = [...gt, ..._t].join(`
`).trim();
      V.value = ht.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(T.value, ht);
    }
    function m() {
      if (!at.value.trim()) return;
      const x = [...P.value, {
        id: `st_${Date.now()}`,
        text: at.value.trim(),
        completed: !1
      }];
      at.value = "", ft.value = !1, yt(x);
    }
    function A(x) {
      const k = P.value.map((S) => S.id === x ? { ...S, completed: !S.completed } : S);
      yt(k);
    }
    function d(x) {
      const k = P.value.filter((S) => S.id !== x);
      yt(k);
    }
    const et = tt(() => {
      for (const x of Tt.columns || []) {
        const k = x.tasks.find((S) => S.id === n.taskId);
        if (k) return !!k.completed;
      }
      return !1;
    });
    async function K() {
      for (const x of Tt.columns || []) {
        const k = x.tasks.find((S) => S.id === n.taskId);
        if (k) {
          const S = !k.completed;
          k.completed = S, k._taskRaw && (k._taskRaw.checked = S);
          try {
            await lt.toggleTaskCompletion(k.id, S);
          } catch {
            k.completed = !S, k._taskRaw && (k._taskRaw.checked = !S), n.error = "完成状态保存未确认，请刷新核对。";
          }
          break;
        }
      }
    }
    function W(x) {
      rt.setPriority(x);
    }
    function G(x) {
      rt.toggleLabel(x);
    }
    function pt(x) {
      rt.toggleLabel(x);
    }
    async function Ct(x) {
      x.trim() && (n.labels.includes(x.trim()) || await rt.createAndAttachLabel(x.trim()));
    }
    async function nt() {
      if (!B.value.trim() || h.value !== "idle") return;
      const x = B.value.trim();
      h.value = "submitting_comment";
      try {
        await rt.addComment(x), B.value = "";
      } finally {
        h.value = "idle";
      }
    }
    ct(() => n.title, (x) => {
      T.value = x || "";
    }, { immediate: !0 }), ct(() => n.description, (x) => {
      V.value = (x || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => n.startDate, (x) => {
      H.value = x || "";
    }, { immediate: !0 }), ct(() => n.startTime, (x) => {
      R.value = x || "";
    }, { immediate: !0 }), ct(() => n.dueDate, (x) => {
      D.value = x || "";
    }, { immediate: !0 }), ct(() => n.dueTime, (x) => {
      $.value = x || "";
    }, { immediate: !0 });
    function mt() {
      const x = /* @__PURE__ */ new Date();
      return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
    }
    function Mt() {
      R.value && !H.value && (H.value = mt()), rt.setStartDateAndTime(H.value, R.value);
    }
    function Qt() {
      R.value = "", Mt();
    }
    function Jt() {
      H.value = "", R.value = "", Mt();
    }
    function vt() {
      $.value && !D.value && (D.value = mt()), rt.setDueDateAndTime(D.value, $.value);
    }
    function At() {
      $.value = "", vt();
    }
    function Nt() {
      D.value = "", $.value = "", vt();
    }
    const Ft = tt(() => {
      const x = [], k = /* @__PURE__ */ new Set(), S = n.description || "", gt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let _t;
      for (; (_t = gt.exec(S)) !== null; ) {
        const ht = _t[2];
        k.add(ht), x.push({
          name: _t[1] || "任务照片",
          url: ht
        });
      }
      for (const ht of n.commentAttachments || [])
        k.has(ht.url) || (k.add(ht.url), x.push(ht));
      return x;
    });
    let jt, ut;
    function j() {
      const x = (n.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), k = [V.value.trim(), x].filter(Boolean);
      return {
        taskId: n.taskId,
        title: T.value,
        description: k.join(`

`)
      };
    }
    function c() {
      clearTimeout(jt), jt = void 0;
      const x = ut;
      if (ut = void 0, x?.taskId && x.title.trim())
        return rt.saveTitleAndDesc(x.title, x.description, x.taskId);
    }
    function b(x) {
      x && Ee(x) || (ut = j(), rt.stageTitleDraft(ut.taskId, ut.title, ut.description), clearTimeout(jt), jt = setTimeout(c, 800));
    }
    ct(() => n.taskId, () => c(), { flush: "sync" });
    function J() {
      c(), rt.close();
    }
    function $t(x) {
      x && Ee(x) || c();
    }
    function Wt() {
      ut = j(), c();
    }
    function ge(x) {
      const k = ie(x);
      k && (x.preventDefault(), x.stopPropagation(), Ut(k));
    }
    function be() {
      q.active && F.value?.click();
    }
    async function ke(x) {
      const k = x.target;
      if (!q.active) {
        k.value = "";
        return;
      }
      const S = k.files?.[0];
      S && await Ut(S), k.value = "";
    }
    async function ye(x) {
      Q.value = !1;
      const k = x.dataTransfer?.files?.[0];
      k && (k.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(k.name)) && await Ut(k);
    }
    function ie(x) {
      const k = x.clipboardData;
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
    async function Ut(x) {
      if (h.value !== "idle" || !q.active || !n.taskId) return;
      const k = n.taskId;
      h.value = "uploading_img";
      try {
        if (await c(), n.taskId !== k || !n.isOpen || !q.active) return;
        await rt.attachImageToTask(x);
      } catch (S) {
        n.taskId === k && (n.error = S instanceof Error ? S.message : "上传失败");
      } finally {
        h.value = "idle";
      }
    }
    function he(x) {
      const k = ie(x);
      k && (x.preventDefault(), Ut(k));
    }
    function ae(x) {
      if (!n.isOpen || !q.active) return;
      const k = ie(x);
      k && (x.preventDefault(), x.stopPropagation(), Ut(k));
    }
    ct(() => q.active, (x) => {
      window.removeEventListener("paste", ae, { capture: !0 }), x && window.addEventListener("paste", ae, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Et(() => {
      c(), window.removeEventListener("paste", ae, { capture: !0 });
    });
    async function we(x) {
      const k = n.description || "", S = x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), gt = k.replace(new RegExp(`!\\[[^\\]]*\\]\\(${S}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(n.title, gt);
    }
    return (x, k) => Lt((l(), p("aside", {
      ref_key: "panelRef",
      ref: C,
      class: "todoist-inspector-window",
      style: bt(e(L)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: he
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: E,
        class: "inspector-header",
        onPointerdown: k[2] || (k[2] = (S) => e(N)(S))
      }, [
        t("div", jl, [
          k[18] || (k[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          r.value ? (l(), p("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: k[0] || (k[0] = X(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: w.value,
              "aria-label": w.value
            }, f(v.value), 9, Wl),
            r.value.status !== "saving" ? (l(), p("button", {
              key: 0,
              type: "button",
              disabled: e(n).saving || !T.value.trim(),
              onClick: X(Wt, ["stop"])
            }, f(r.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Ul)) : _("", !0)
          ], 32)) : _("", !0),
          e(n).url ? (l(), p("a", {
            key: 1,
            href: e(n).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Bl)) : _("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: k[1] || (k[1] = X(() => {
          }, ["stop"])),
          onClick: X(J, ["stop"])
        }, "×", 32)
      ], 544),
      e(n).isOpen ? (l(), Ot(Al, {
        key: e(n).taskId,
        state: e(n),
        "edit-title": T.value,
        "onUpdate:editTitle": k[3] || (k[3] = (S) => T.value = S),
        "edit-description": V.value,
        "onUpdate:editDescription": k[4] || (k[4] = (S) => V.value = S),
        "edit-start-date": H.value,
        "onUpdate:editStartDate": k[5] || (k[5] = (S) => H.value = S),
        "edit-start-time": R.value,
        "onUpdate:editStartTime": k[6] || (k[6] = (S) => R.value = S),
        "edit-due-date": D.value,
        "onUpdate:editDueDate": k[7] || (k[7] = (S) => D.value = S),
        "edit-due-time": $.value,
        "onUpdate:editDueTime": k[8] || (k[8] = (S) => $.value = S),
        "is-uploading-img": I.value,
        "is-drag-over": Q.value,
        "is-task-completed": et.value,
        subtasks: P.value,
        "completed-subtasks-count": kt.value,
        "is-adding-subtask": ft.value,
        "onUpdate:isAddingSubtask": k[9] || (k[9] = (S) => ft.value = S),
        "new-subtask-text": at.value,
        "onUpdate:newSubtaskText": k[10] || (k[10] = (S) => at.value = S),
        "new-comment-text": B.value,
        "onUpdate:newCommentText": k[11] || (k[11] = (S) => B.value = S),
        "is-submitting-comment": z.value,
        "attached-images": Ft.value,
        "available-labels": e(Tt).availableLabels || [],
        onScheduleDraftSave: b,
        onSaveTitleAndDesc: $t,
        onToggleComplete: K,
        onTriggerFileInput: be,
        onDragover: k[12] || (k[12] = (S) => Q.value = !0),
        onDragleave: k[13] || (k[13] = (S) => Q.value = !1),
        onDropImage: ye,
        onDescPaste: ge,
        onRemoveAttachedImage: we,
        onToggleSubtask: A,
        onRemoveSubtask: d,
        onConfirmAddSubtask: m,
        onSubmitComment: nt,
        onStartChange: Mt,
        onClearStartDate: Jt,
        onClearStartTime: Qt,
        onDueChange: vt,
        onClearDueDate: Nt,
        onClearDueTime: At,
        onSelectPriority: W,
        onToggleLabelSelect: G,
        onRemoveLabel: pt,
        onCreateLabel: Ct
      }, null, 8, ["state", "edit-title", "edit-description", "edit-start-date", "edit-start-time", "edit-due-date", "edit-due-time", "is-uploading-img", "is-drag-over", "is-task-completed", "subtasks", "completed-subtasks-count", "is-adding-subtask", "new-subtask-text", "new-comment-text", "is-submitting-comment", "attached-images", "available-labels"])) : _("", !0),
      t("input", {
        ref_key: "fileInputRef",
        ref: F,
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
      [Oe, e(n).isOpen]
    ]);
  }
}), zl = /* @__PURE__ */ ne(Nl, [["__scopeId", "data-v-00d71dbf"]]), Hl = { class: "vue-todoist-workspace-wrapper" }, Fl = ["aria-label"], Kl = { class: "todoist-head-title-wrap" }, Yl = { id: "todoist-workspace-title" }, Gl = ["aria-label"], Xl = ["title"], ql = {
  class: "muted small",
  role: "status"
}, Ql = ["title", "aria-expanded"], Jl = ["title"], Zl = ["title"], tr = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, er = { class: "todoist-workspace-cal-area" }, or = { class: "todoist-workspace-task-area" }, sr = "todoistWorkspacePosition", _r = /* @__PURE__ */ Ht({
  __name: "TodoistWorkspace",
  props: {
    embedded: { type: Boolean, default: !1 }
  },
  setup(a) {
    const { style: n, media: r } = es("todoist"), v = a, w = M(!1), C = Io(() => import("./TodoistAccountSettings-DTo5tIuV.js")), E = M(!1), L = M(!1), N = M(!document.hidden), Y = M(!1), T = tt(() => q.visible && N.value);
    q.session++, q.active = T.value, uo(
      () => T.value && !Tt.movingTaskId,
      ee,
      () => ot.loadWorkspace(void 0, void 0, !0)
    );
    let V = !1;
    const H = M(null), R = Ao;
    function D() {
      $.value && ($.value.style.removeProperty("width"), $.value.style.removeProperty("height"), $.value.style.removeProperty("left"), $.value.style.removeProperty("top"), $.value.style.removeProperty("right"), $.value.style.removeProperty("bottom"), $.value.style.removeProperty("margin"), $.value.style.removeProperty("transform"));
    }
    ct(() => q.visible, (K) => {
      K && (R.isOpen = !0, q.active = N.value, N.value && (V = !0, ot.loadWorkspace()));
    }, { immediate: !0 });
    const {
      panelRef: $,
      headerRef: h,
      initialStyle: I,
      stopInteractions: z,
      onHeaderPointerDown: Q,
      onResizePointerDown: F,
      bringToFront: ft
    } = ao({
      windowId: "todoist",
      storageKey: sr,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => T.value
    }), at = () => $.value;
    function B() {
      ee(), jo(), Wo(), rt.cancelReads(), z(), window.removeEventListener("keydown", yt);
    }
    const P = Lo(B);
    function kt() {
      N.value = !document.hidden;
    }
    function yt(K) {
      K.key === "Escape" && y.isOpen && (K.preventDefault(), K.stopPropagation(), rt.close());
    }
    ct(T, (K) => {
      q.active = K, K ? (window.addEventListener("keydown", yt), V || (V = !0, ot.loadWorkspace()), It(() => {
        T.value && ft();
      })) : B();
    }, { flush: "sync" }), ct(E, (K) => {
      K && (L.value = !0);
    }), ct([T, w, Ze], ([K, W, G]) => {
      if (!(!K || !W || !G) && (Ze.value = null, Uo("todoist") === G.transition)) {
        if (q.pendingWrites || y.isOpen && y.taskId !== G.id) {
          ts.show({ appName: "Todoist", title: g("todoist.retainDetailTitle"), message: g("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        y.isOpen && y.taskId === G.id || rt.openTask(G.id);
      }
    }, { flush: "post" }), oe(() => {
      w.value = !0, Y.value && It(D), pe.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: at }), document.addEventListener("visibilitychange", kt), T.value && (window.addEventListener("keydown", yt), V || (V = !0, ot.loadWorkspace()), $e.refresh());
    }), Et(() => {
      Oo(), P(), document.removeEventListener("visibilitychange", kt), pe.unregister("todoist", at), rt.close(), Object.assign(y, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), ot.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Qe.updateState({ title: g("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), $e.update([]);
    });
    function m() {
      Qe.toggleCalendar();
    }
    function A() {
      ot.updateState({ accountConfigured: !0 }), T.value && (ot.loadWorkspace(void 0, void 0, !0), $e.refresh(!0));
    }
    function d() {
      pe.minimize("todoist");
    }
    function et() {
      q.visible = !1, R.isOpen = !1, pe.close("todoist");
    }
    return (K, W) => (l(), p("div", Hl, [
      Lt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: $,
        class: "card wide todoist-workspace",
        style: bt(v.embedded ? void 0 : e(I)),
        "aria-label": e(g)("todoist.workspaceAria")
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: h,
          class: "todoist-workspace-head",
          onPointerdown: W[4] || (W[4] = (G) => !v.embedded && e(Q)(G))
        }, [
          t("div", Kl, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Yl, f(e(R).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(g)("todoist.viewAria")
          }, [
            Gt(ls)
          ], 8, Gl),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: Z(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(R).isCalendarOpen }]),
            type: "button",
            title: e(g)("todoist.calendarToggleTitle"),
            onClick: m
          }, " 📅 " + f(e(g)("todoist.calendar")), 11, Xl),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", ql, f(e(q).pendingWrites ? e(g)("todoist.pendingWrites") : e(g)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: H,
            type: "button",
            class: "no-drag",
            title: e(g)("todoist.settingsTitle"),
            "aria-expanded": E.value,
            onClick: W[0] || (W[0] = X((G) => E.value = !E.value, ["stop"]))
          }, " ⚙️ ", 8, Ql),
          L.value ? (l(), Ot(e(C), {
            key: 0,
            visible: T.value && E.value,
            anchor: H.value,
            onClose: W[1] || (W[1] = (G) => E.value = !1),
            onAccountSaved: A
          }, null, 8, ["visible", "anchor"])) : _("", !0),
          v.embedded ? _("", !0) : (l(), p("button", {
            key: 1,
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(g)("todoist.minimizeHint"),
            onPointerdown: W[2] || (W[2] = X(() => {
            }, ["stop"])),
            onClick: X(d, ["stop"])
          }, " − ", 40, Jl)),
          v.embedded ? _("", !0) : (l(), p("button", {
            key: 2,
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(g)("todoist.closeHint"),
            onPointerdown: W[3] || (W[3] = X(() => {
            }, ["stop"])),
            onClick: X(et, ["stop"])
          }, " ✕ ", 40, Zl))
        ], 544),
        e(Tt).accountConfigured === !1 ? (l(), Ot(Vo, {
          key: 0,
          icon: "✅",
          title: e(g)("todoist.tokenMissingTitle"),
          description: e(g)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(g)("todoist.getToken"),
          onConfigure: W[5] || (W[5] = (G) => E.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (l(), p("div", tr, [
          Lt(t("div", er, [
            Gt(Zs)
          ], 512), [
            [Oe, e(R).isCalendarOpen]
          ]),
          t("div", or, [
            Gt(ra, {
              embedded: v.embedded,
              style: bt(e(n)),
              class: Z({ "has-workspace-wallpaper": !!e(n) })
            }, {
              wallpaper: se(() => [
                Gt(os, { media: e(r) }, null, 8, ["media"])
              ]),
              _: 1
            }, 8, ["embedded", "style", "class"])
          ])
        ])),
        Gt(zl),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        !Y.value && !v.embedded ? (l(), p(it, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: W[6] || (W[6] = (G) => e(F)(G, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: W[7] || (W[7] = (G) => e(F)(G, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: W[8] || (W[8] = (G) => e(F)(G, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: W[9] || (W[9] = (G) => e(F)(G, "w"))
          }, null, 32)
        ], 64)) : _("", !0)
      ], 12, Fl), [
        [Oe, e(q).visible]
      ])
    ]));
  }
});
export {
  _r as _
};
