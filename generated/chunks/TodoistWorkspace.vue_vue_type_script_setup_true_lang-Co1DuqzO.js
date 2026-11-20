import { d as Kt, f as l, g as p, F as it, h as t, u as e, s as J, t as f, r as te, w as ct, e as Mt, o as oe, m as Nt, i as dt, k as z, j as _, b as M, K as so, J as Pe, n as bt, x as tt, y as It, p as Lt, v as Gt, C as Xt, B as se, q as Ot, l as Et, A as Re, E as So } from "./vendor-vue-BbmU9NUg.js";
import { a as $o, t as q, w as Io, o as Po, p as Ro } from "./module-state-C_zTFjJe.js";
import { b as Fe, i as Ye, j as ee, k as Tt, e as ot, d as wt, c as Lo, l as Oo, t as Ge, g as Xe, h as Eo, m as Mo, n as Ao } from "./calendar.service-Dd5V2338.js";
import { u as no } from "./useWindowDraggable-BiFiOeBe.js";
import { w as pe, b as jo } from "./window-manager.store-D9RSYghK.js";
import { t as g, _ as ne } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
import { A as Wo } from "./AccountSetupGuide-aAWH-mt-.js";
import { i as Me } from "./image-viewer-store-DXesQk_J.js";
import { t as lt, d as Uo, s as Bo, b as me, g as qe, f as $e, p as Vo } from "./todoist.service-CkwQK9QD.js";
import { m as No, T as Ho } from "./task-resource-Cs4kzJPJ.js";
import { g as io, T as zo } from "./TaskRepositoryLinks-BBkBdREL.js";
import { g as Ko } from "./bili-video-links-DXpyplJq.js";
import { g as Fo } from "./web-site-links-BSIympLj.js";
import { a as Yo, q as ao, w as Go, n as Xo } from "./github.service-mYu1TuZI.js";
import { u as qo } from "./useMachine-DhSfBarp.js";
import { I as Le, T as Oe } from "./TodoistDatePickerPopover-Bx4O0q6b.js";
import { m as Qo } from "./core-utils-KTt-RZby.js";
import { pendingTodoistTask as Qe } from "./task-navigation-CdFHuF0W.js";
import { u as Jo } from "./workspace-wallpaper-BZrhOgwG.js";
import { W as Zo } from "./WorkspaceWallpaperLayer-nCpfKdVa.js";
const ts = ["title"], es = { class: "todoist-tab-text" }, os = ["title"], ss = { class: "todoist-tab-text" }, ns = /* @__PURE__ */ Kt({
  __name: "TodoistWorkspaceTabs",
  setup(i) {
    return (n, r) => (l(), p(it, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: J({ on: e(Ye).view === "inbox" }),
        title: e(g)("todoist.inbox"),
        onClick: r[0] || (r[0] = (v) => e(Fe).switchView("inbox"))
      }, [
        r[2] || (r[2] = t("span", { class: "todoist-tab-icon" }, "📥", -1)),
        t("span", es, f(e(g)("todoist.inbox")), 1)
      ], 10, ts),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: J({ on: e(Ye).view === "projects" }),
        title: e(g)("todoist.projects"),
        onClick: r[1] || (r[1] = (v) => e(Fe).switchView("projects"))
      }, [
        r[3] || (r[3] = t("span", { class: "todoist-tab-icon" }, "📁", -1)),
        t("span", ss, f(e(g)("todoist.projects")), 1)
      ], 10, os)
    ], 64));
  }
}), lo = "todoist_reminder_v2:", is = "todoist_remind_";
async function as(i) {
  if (typeof chrome > "u" || !chrome.storage?.local) return;
  const n = lo + i, r = await chrome.storage.local.get([n, "todoist_reminders_map_v1"]);
  return Object.prototype.hasOwnProperty.call(r, n) ? r[n] || void 0 : r.todoist_reminders_map_v1?.[i];
}
async function ls(i, n, r) {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error("当前环境不支持浏览器提醒。");
  const v = new Date(n).getTime();
  if (n && (!Number.isFinite(v) || v <= Date.now())) throw new Error("请选择未来的提醒时间。");
  if (n && await chrome.notifications.getPermissionLevel() !== "granted") throw new Error("请先在浏览器和系统设置中允许通知。");
  const w = lo + i, x = is + i;
  await chrome.alarms.clear(x), await chrome.storage.local.set({ [w]: n ? { time: n, title: r } : null }), n && await chrome.alarms.create(x, { when: v });
}
const Rt = te(/* @__PURE__ */ new Map());
let rs = 0;
function Je(i, n, r, v = "editing") {
  const w = ++rs;
  return Rt.set(i, { revision: w, title: n, description: r, status: v, error: "" }), w;
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
let Ie = Promise.resolve(), ve = 0, Ze = Promise.resolve();
const fe = /* @__PURE__ */ new Map();
let de = 0;
const qt = /* @__PURE__ */ new Map();
function re(i = !0) {
  i && de++;
  for (const n of qt.values()) n.abort();
  qt.clear(), y.loading = !1;
}
function to(i) {
  qt.get(i)?.abort();
  const n = new AbortController();
  qt.set(i, n);
  const r = de, v = y.taskId;
  return {
    signal: n.signal,
    current: () => !n.signal.aborted && r === de && y.isOpen && v === y.taskId && qt.get(i) === n,
    finish: () => {
      qt.get(i) === n && qt.delete(i);
    }
  };
}
function Vt() {
  re(!1);
  const i = y.taskId, n = de;
  return { taskId: i, current: () => y.isOpen && n === de && i === y.taskId };
}
function ds(i) {
  return new Promise((n) => {
    const r = new FileReader();
    r.onload = () => n(r.result || ""), r.onerror = () => n(""), r.readAsDataURL(i);
  });
}
function eo(i, n, r) {
  for (const v of Tt.columns)
    for (const w of v.tasks)
      String(w.id) === i && (w.content = n, r !== void 0 && (w.description = r), w._taskRaw && (w._taskRaw.content = n, r !== void 0 && (w._taskRaw.description = r)));
  wt.updateTaskTitle(i, n);
}
const cs = {
  state: y,
  cancelReads: re,
  stageTitleDraft(i, n, r) {
    i && (Je(i, n, r), re(!1), y.taskId === i && (y.title = n), eo(i, n, r));
  },
  async openTask(i, n) {
    if (!i) return;
    if (re(), y.taskId = i, y.isOpen = !0, y.error = "", Object.assign(y, {
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
      const x = me(n.due?.datetime || n.due?.date || n.dueDate || "");
      y.dueDate = x.date, y.dueTime = x.time;
      const E = n.startDate || qe(i, y.description), L = me(E);
      y.startDate = L.date, y.startTime = L.time, y.labels = [...n.labels || []], y.url = n.url || "";
    }
    const r = Rt.get(i);
    r && (y.title = r.title, y.description = r.description);
    const v = to("reminder");
    as(i).then((x) => {
      v.current() && (y.reminderTime = x?.time || "");
    }).catch(() => {
      v.current() && (y.error = "本机提醒读取失败。");
    }).finally(v.finish);
    const w = to("detail");
    y.loading = !0;
    try {
      const x = await lt.api(`/tasks/${encodeURIComponent(i)}`, { signal: w.signal });
      if (x && w.current()) {
        const E = Rt.get(i);
        y.title = E?.title ?? x.content ?? "", y.description = E?.description ?? x.description ?? "", y.priority = x.priority || 1;
        const L = me(x.due?.datetime || x.due?.date || "");
        y.dueDate = L.date, y.dueTime = L.time;
        const N = qe(i, x.description || y.description), G = me(N);
        y.startDate = G.date, y.startTime = G.time, y.labels = [...x.labels || []], y.url = x.url || "";
        try {
          const T = await lt.getComments(i, w.signal);
          if (T && w.current()) {
            const V = [], K = [];
            for (const R of T) {
              let D;
              if (R?.attachment?.file_url) {
                const $ = R.attachment.file_name || "附件图片";
                V.push({ name: $, url: R.attachment.file_url }), D = { name: $, url: R.attachment.file_url };
              }
              K.push({
                id: R.id,
                content: R.content || "",
                postedAt: R.posted_at || "",
                attachment: D
              });
            }
            if (y.commentAttachments = V, y.comments = K, V.length > 0 && y.description) {
              let R = y.description, D = !1;
              for (const $ of V) {
                const h = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                h.test(R) && (R = R.replace(h, `$1${$.url}$2`), D = !0);
              }
              if (D && !Rt.has(i)) {
                y.description = R;
                for (const $ of Tt.columns) {
                  const h = $.tasks.find((I) => String(I.id) === i);
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
  async setStartDateAndTime(i, n) {
    if (!y.taskId) return;
    const r = Vt(), v = i.trim(), w = v ? n.trim() : "";
    y.startDate = v, y.startTime = w, ee();
    const x = Uo(v, w);
    Bo(r.taskId, x), lt.invalidateWorkspaceSnapshots();
    for (const E of Tt.columns) {
      const L = E.tasks.find((N) => N.id === r.taskId);
      L && (L.startDate = x);
    }
  },
  async setDueDateAndTime(i, n) {
    if (!y.taskId) return;
    const r = Vt(), v = i.trim(), w = v ? n.trim() : "";
    y.dueDate = v, y.dueTime = w, ee(), lt.invalidateWorkspaceSnapshots();
    const x = (fe.get(r.taskId) || 0) + 1;
    fe.set(r.taskId, x);
    const E = Ze.then(async () => {
      try {
        const L = await lt.updateTask(r.taskId, {
          due_string: v ? w ? `${v} ${w}` : v : "no date"
        });
        if (fe.get(r.taskId) !== x) return;
        const N = lt.mapTasks([L], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const G of Tt.columns) {
          const T = G.tasks.findIndex((K) => K.id === r.taskId);
          if (T < 0) continue;
          const V = G.tasks[T];
          if (Object.assign(V, {
            dueDate: N.dueDate,
            dueText: N.dueText,
            dueString: N.dueString,
            isDueToday: N.isDueToday,
            isOverdue: N.isOverdue,
            isRecurring: N.isRecurring
          }), V._taskRaw && (V._taskRaw.due = L.due), Tt.view === "today") {
            const K = N.isOverdue ? "overdue" : N.isDueToday ? "today" : "";
            K !== G.sectionId && (G.tasks.splice(T, 1), Tt.columns.find((R) => R.sectionId === K)?.tasks.push(V));
          }
        }
        r.current() && (y.error = "");
      } catch {
        r.current() && fe.get(r.taskId) === x && (y.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Ze = E.catch(() => {
    }), await E;
  },
  async saveTitleAndDesc(i, n, r = y.taskId) {
    const v = r === y.taskId ? Vt() : { taskId: r, current: () => !1 };
    if (!v.taskId || !i.trim()) return;
    const w = i.trim(), x = n.trim(), E = Je(r, w, x, "saving");
    v.current() && (y.title = w, y.description = x), eo(v.taskId, w, x), ve++, y.saving = !0;
    const L = Ie.then(async () => {
      try {
        await lt.updateTask(v.taskId, {
          content: w,
          description: x
        }), Rt.get(r)?.revision === E && Rt.delete(r), ve === 1 && Rt.size === 0 && ot.dispatch("refresh");
      } catch (N) {
        const G = Rt.get(r);
        G?.revision === E && (G.status = "failed", G.error = N instanceof Error ? N.message : "保存未确认");
      } finally {
        ve--, y.saving = ve > 0;
      }
    });
    Ie = L.catch(() => {
    }), await L;
  },
  async attachImageToTask(i) {
    const n = Vt();
    if (await Ie, !n.current()) return;
    if (Rt.has(n.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const r = y.description || "";
    if (!n.taskId || y.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    y.saving = !0;
    try {
      const v = i.name || `截图_${Date.now()}.png`;
      let w = "";
      try {
        const x = await lt.uploadFile(i, v);
        x && x.file_url && (w = x.file_url);
      } catch (x) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", x), i.size <= 2.5 * 1024 * 1024)
          w = await ds(i);
        else
          throw new Error(x?.message || "云端上传失败且文件超过2.5MB");
      }
      if (w) {
        const x = r ? `${r}

![${v}](${w})` : `![${v}](${w})`;
        await lt.updateTask(n.taskId, {
          description: x
        }), n.current() && (y.description = x);
        for (const E of Tt.columns) {
          const L = E.tasks.find((N) => String(N.id) === n.taskId);
          if (L) {
            L.description = x, L._taskRaw && (L._taskRaw.description = x);
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
  async setPriority(i) {
    if (!y.taskId) return;
    const n = Vt();
    if (![1, 2, 3, 4].includes(i)) return;
    const r = y.priority;
    y.priority = i, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(n.taskId, { priority: i });
      for (const v of Tt.columns) {
        const w = v.tasks.find((x) => x.id === n.taskId);
        w && (w.priority = i, w._taskRaw && (w._taskRaw.priority = i));
      }
    } catch {
      n.current() && (y.priority = r, y.error = "优先级保存未确认，请刷新核对；未自动重试。");
    }
  },
  async toggleLabel(i) {
    if (!y.taskId) return;
    const n = Vt(), r = [...y.labels], w = r.includes(i) ? r.filter((x) => x !== i) : [...r, i];
    y.labels = w, ee(), lt.invalidateWorkspaceSnapshots();
    try {
      await lt.updateTask(n.taskId, { labels: w });
      for (const x of Tt.columns) {
        const E = x.tasks.find((L) => L.id === n.taskId);
        E && (E.labels = w, E._taskRaw && (E._taskRaw.labels = w));
      }
    } catch {
      n.current() && (y.labels = r, y.error = "标签保存未确认，请刷新核对；未自动重试。");
    }
  },
  async createAndAttachLabel(i) {
    const n = Vt();
    if (i = i.trim(), !(!n.taskId || !i))
      try {
        const r = await lt.getLabels();
        if (!n.current()) return;
        r.some((v) => v.name === i) || await lt.createLabel(i), n.current() && !y.labels.includes(i) && await this.toggleLabel(i);
      } catch {
        n.current() && (y.error = "标签创建未确认，请刷新标签库核对。");
      }
  },
  async addComment(i) {
    if (!y.taskId || !i.trim()) return;
    const n = Vt();
    try {
      const r = await lt.addComment({
        task_id: n.taskId,
        content: i.trim()
      });
      r && n.current() && y.comments.push({
        id: r.id || `c_${Date.now()}`,
        content: r.content || i.trim(),
        postedAt: r.posted_at || (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (r) {
      n.current() && (y.error = "发送评论失败：" + (r?.message || ""));
    }
  },
  async setReminder(i) {
    const n = Vt();
    if (n.taskId)
      try {
        await ls(n.taskId, i, y.title), n.current() && (y.reminderTime = i, y.error = "");
      } catch (r) {
        n.current() && (y.error = r instanceof Error ? r.message : "提醒未保存，请重试。");
      }
  }
}, rt = $o(cs, [
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
function ro(i, n, r) {
  let v = !1, w;
  const x = ct(
    () => [q.dataRevision, i(), q.pendingWrites],
    ([E, L, N], G) => {
      G && E !== G[0] && (v = !0, n()), w && clearTimeout(w), !(!v || !L || N) && (w = setTimeout(() => {
        w = void 0, !(!i() || q.pendingWrites) && (v = !1, r());
      }, 150));
    }
  );
  Mt(() => {
    x(), w && clearTimeout(w);
  });
}
const us = ["aria-label"], ps = { class: "todoist-cal-head" }, ms = { class: "todoist-cal-title-row" }, vs = { class: "todoist-cal-logo" }, fs = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, gs = { class: "todoist-cal-head-actions" }, bs = { class: "todoist-cal-nav" }, ks = { class: "todoist-cal-nav-group" }, ys = ["title"], hs = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, ws = ["title"], Ts = { class: "todoist-cal-nav-group" }, Ds = ["title"], Cs = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, xs = ["title"], _s = { class: "todoist-cal-weekdays" }, Ss = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, $s = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Is = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Ps = { class: "todoist-cal-agenda" }, Rs = { class: "todoist-cal-agenda-head" }, Ls = { class: "todoist-cal-agenda-title" }, Os = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, Es = {
  key: 0,
  class: "todoist-cal-empty",
  role: "alert"
}, Ms = {
  key: 1,
  class: "todoist-cal-empty",
  role: "status"
}, As = ["disabled"], js = {
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, Ws = {
  key: 0,
  class: "todoist-cal-empty"
}, Us = {
  key: 1,
  class: "todoist-cal-empty"
}, Bs = ["onClick"], Vs = { class: "todoist-cal-todo-main" }, Ns = ["disabled", "title", "onClick"], Hs = {
  key: 0,
  class: "check-icon"
}, zs = {
  key: 0,
  class: "todoist-cal-task-time"
}, Ks = {
  key: 1,
  class: "todoist-cal-completed-tag"
}, Fs = ["title", "onClick"], Ys = ["src", "alt"], Gs = { class: "todoist-cal-thumb-tag" }, Xs = /* @__PURE__ */ Kt({
  __name: "TodoistCalendarSidebar",
  setup(i) {
    const n = Oo;
    ro(
      () => q.active,
      () => wt.invalidateReads(),
      () => wt.loadTodosForDate(n.selectedDate, !0)
    ), Mt(() => wt.cancelReads()), ct(() => [q.active, q.pendingWrites], ([D, $], h) => {
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
      Lo.syncSidebarToVue();
    });
    function w() {
      wt.dispatch("today");
    }
    function x() {
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
    function G(D) {
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
    function K(D) {
    }
    function R(D, $) {
      const h = $.dataTransfer?.getData("application/x-todoist-task-id") || $.dataTransfer?.getData("text/plain");
      h && ($.preventDefault(), $.stopPropagation(), wt.dispatch("drop-task", { taskId: h, date: D }));
    }
    return (D, $) => (l(), p("aside", {
      id: "todoist-calendar-sidebar",
      class: J(["todoist-calendar-sidebar", { collapsed: e(n).collapsed }]),
      "aria-label": e(g)("todoist.calendar.sidebarLabel")
    }, [
      t("div", ps, [
        t("div", ms, [
          t("span", vs, [
            $[1] || ($[1] = Nt("📅 ", -1)),
            t("strong", null, f(e(g)("todoist.calendar.title")), 1)
          ]),
          t("span", fs, f(e(n).badgeText), 1)
        ]),
        t("div", gs, [
          t("button", {
            id: "todoist-cal-today-btn",
            class: "todoist-cal-today-btn",
            type: "button",
            onClick: w
          }, f(e(g)("todoist.calendar.today")), 1)
        ])
      ]),
      t("div", bs, [
        t("div", ks, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.prevMonth"),
            onClick: x
          }, "‹", 8, ys),
          t("span", hs, f(e(n).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.nextMonth"),
            onClick: E
          }, "›", 8, ws)
        ]),
        t("div", Ts, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.prevYear"),
            onClick: L
          }, "‹", 8, Ds),
          t("span", Cs, f(e(n).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: e(g)("todoist.calendar.nextYear"),
            onClick: N
          }, "›", 8, xs)
        ])
      ]),
      t("div", _s, [
        t("span", null, f(e(g)("todoist.calendar.weekdays.mon")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.tue")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.wed")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.thu")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.fri")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.sat")), 1),
        t("span", null, f(e(g)("todoist.calendar.weekdays.sun")), 1)
      ]),
      t("div", Ss, [
        (l(!0), p(it, null, dt(e(n).cells, (h) => (l(), p("button", {
          key: h.date,
          type: "button",
          class: J(["todoist-cal-cell", {
            outside: h.isOutside,
            today: h.isToday,
            selected: h.isSelected
          }]),
          "data-date": h.date,
          role: "gridcell",
          title: h.title,
          onClick: (I) => G(h.date),
          onContextmenu: z((I) => T(h.date, I), ["prevent"]),
          onDragover: (I) => V(h.date, I),
          onDragleave: (I) => (h.date, void 0),
          onDrop: (I) => R(h.date, I)
        }, [
          t("span", null, f(h.dayNumber), 1),
          h.hasDot ? (l(), p("span", Is)) : _("", !0)
        ], 42, $s))), 128))
      ]),
      t("div", Ps, [
        t("div", Rs, [
          t("strong", Ls, f(e(n).agendaTitle), 1),
          t("span", Os, f(e(g)("todoist.calendar.itemCount", { count: e(n).todoItems.length })), 1)
        ]),
        e(n).writeError ? (l(), p("p", Es, f(e(n).writeError), 1)) : _("", !0),
        e(n).emptyText ? (l(), p("div", Ms, [
          Nt(f(e(n).emptyText) + " ", 1),
          t("button", {
            type: "button",
            class: "todoist-cal-retry",
            disabled: e(n).todoLoading || e(q).pendingWrites > 0,
            onClick: $[0] || ($[0] = (h) => e(wt).loadTodosForDate(e(n).selectedDate, !0))
          }, f(e(g)("todoist.calendar.retryLoad")), 9, As)
        ])) : _("", !0),
        t("div", js, [
          e(n).todoLoading && !e(n).todoItems.length ? (l(), p("div", Ws, f(e(g)("todoist.calendar.loading")), 1)) : e(n).todoItems.length === 0 && !e(n).emptyText ? (l(), p("div", Us, f(e(g)("todoist.calendar.emptyDay")), 1)) : (l(!0), p(it, { key: 2 }, dt(e(n).todoItems, (h) => (l(), p("div", {
            key: h.id,
            class: J(["todoist-cal-todo-card", { completed: h.completed }]),
            onClick: (I) => v(h)
          }, [
            t("div", Vs, [
              t("button", {
                type: "button",
                class: J(["todoist-cal-check", { checked: h.completed }]),
                disabled: e(q).pendingWrites > 0,
                title: h.completed ? e(g)("todoist.calendar.clickToReopen") : e(g)("todoist.calendar.clickToComplete"),
                onClick: z((I) => r(h), ["stop"])
              }, [
                h.completed ? (l(), p("span", Hs, "✓")) : _("", !0)
              ], 10, Ns),
              t("span", {
                class: J(["todoist-cal-todo-title", { strike: h.completed }])
              }, f(h.content), 3),
              h.time ? (l(), p("small", zs, f(h.time), 1)) : _("", !0),
              h.completed ? (l(), p("span", Ks, f(e(g)("todoist.calendar.completedTag")), 1)) : _("", !0)
            ]),
            h.thumbUrl ? (l(), p("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: e(g)("todoist.calendar.viewPhoto"),
              onClick: z((I) => e(Me).open(h.thumbUrl, h.content), ["stop"])
            }, [
              t("img", {
                src: h.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: e(g)("todoist.calendar.taskPhoto"),
                loading: "lazy"
              }, null, 8, Ys),
              t("span", Gs, f(e(g)("todoist.calendar.photoTag")), 1)
            ], 8, Fs)) : _("", !0)
          ], 10, Bs))), 128))
        ])
      ])
    ], 10, us));
  }
}), qs = /* @__PURE__ */ ne(Xs, [["__scopeId", "data-v-6c1a5887"]]);
function Qs(i) {
  const n = i.state, r = M(null), v = M(null), w = M(null), x = M(!1), E = so(null), L = M(), N = /* @__PURE__ */ new Map();
  function G(m) {
    N.clear();
    const A = m.closest(".todoist-board");
    if (A)
      for (const d of A.querySelectorAll(".todoist-board-list")) {
        const et = n.columns[Number(d.dataset.groupIndex)];
        if (!et) continue;
        const Y = d.__todoistSlots;
        if (!Y) continue;
        const W = Y(), X = W.filter((pt) => pt.id !== I?.id);
        N.set(et, { list: d, rows: X, read: Y, snapshot: W });
      }
  }
  let T = 0, V;
  function K(m, A) {
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
    const Y = m.clientY - d.list.getBoundingClientRect().top + d.list.scrollTop;
    let W = 0, X = d.rows.length;
    for (; W < X; ) {
      const nt = W + X >>> 1;
      Y < d.rows[nt].middle ? X = nt : W = nt + 1;
    }
    let pt = W;
    if (v.value === n.columns.indexOf(A)) {
      const nt = L.value ? d.rows.findIndex((mt) => mt.id === L.value) : d.rows.length;
      nt >= 0 && pt > nt && Y < d.rows[nt].middle + 10 && (pt = nt), nt > 0 && pt < nt && Y > d.rows[nt - 1].middle - 10 && (pt = nt);
    }
    const xt = d.rows[pt]?.id;
    h(A, xt), v.value === n.columns.indexOf(A) && (w.value = xt || d.rows[d.rows.length - 1]?.id || null, x.value = !xt);
  }
  function D(m) {
    return m === E.value;
  }
  function $(m, A) {
    if (A !== v.value || !E.value) return m.tasks;
    const d = [...m.tasks], et = L.value ? d.findIndex((Y) => Y.id === L.value) : -1;
    return d.splice(et < 0 ? d.length : et, 0, E.value), d;
  }
  function h(m, A) {
    if (!I || !H) return;
    if (n.view === "today" && m.sectionId === "overdue" && H.sectionId !== "overdue") {
      v.value = null;
      return;
    }
    const d = A ? m.tasks.find((W) => W.id === A) : void 0, et = m === H ? String(I._taskRaw?.parent_id || "") : "";
    if (d && n.view !== "today" && String(d._taskRaw?.parent_id || "") !== et) {
      v.value = null;
      return;
    }
    const Y = n.columns.indexOf(m);
    Y < 0 || (L.value = A, v.value = Y);
  }
  let I = null, H = null;
  function Q(m, A, d, et) {
    if (!i.isActive() || n.loading || n.movingTaskId || n.moveNeedsRefresh || A.completed || A.id.startsWith("optimistic-") || i.editingTaskId() === A.id) {
      m.preventDefault();
      return;
    }
    if (m.stopPropagation(), i.closePopovers(), r.value = A.id, I = A, H = d, E.value = { ...A }, G(m.currentTarget), m.dataTransfer) {
      const Y = i.allowResourceDrag?.() ? No(A) : null;
      m.dataTransfer.effectAllowed = Y ? "copyMove" : "move";
      const W = m.currentTarget, X = W.getBoundingClientRect();
      m.dataTransfer.setDragImage(
        W,
        Math.max(0, Math.min(X.width, m.clientX - X.left)),
        Math.max(0, Math.min(X.height, m.clientY - X.top))
      ), m.dataTransfer.clearData(), m.dataTransfer.setData("application/x-todoist-task-id", A.id), m.dataTransfer.setData("application/x-logicweaver-todoist-task", A.id), m.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: A.id, sectionId: d.sectionId })), Y && m.dataTransfer.setData(Ho, JSON.stringify(Y));
    }
  }
  function F() {
    cancelAnimationFrame(T), T = 0, V = void 0, r.value = null, v.value = null, w.value = null, x.value = !1, I = null, H = null, E.value = null, L.value = void 0, N.clear();
  }
  function ft(m, A) {
    !I || n.movingTaskId || (m.preventDefault(), m.stopPropagation(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), K(m, n.columns[A]));
  }
  function at(m, A) {
    m.currentTarget?.contains(m.relatedTarget);
  }
  function B(m, A, d, et) {
    m.dataTransfer && (m.dataTransfer.dropEffect = "move"), K(m, d);
  }
  async function P(m, A) {
    V && V.col === m && (R(V, V.col), A = L.value);
    const d = I, et = H;
    F(), !(!d || !et || !i.isActive() || n.movingTaskId) && (n.view === "today" ? m.sectionId === "today" && et.sectionId !== "today" ? await i.moveTask(d.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, A) : await i.moveTask(d.id, { sectionId: m.sectionId }, A) : await i.moveTask(d.id, {
      projectId: m.projectId,
      sectionId: m.sectionId
    }, A));
  }
  async function kt(m, A, d, et) {
    m.preventDefault();
    const Y = m.dataTransfer?.getData("application/x-todoist-label") || (m.dataTransfer?.getData("text/plain")?.startsWith("label:") ? m.dataTransfer.getData("text/plain").slice(6) : "");
    if (Y) {
      i.dropLabel(A, Y);
      return;
    }
    if (v.value === n.columns.indexOf(d)) {
      await P(d, L.value);
      return;
    }
    const W = m.currentTarget.getBoundingClientRect(), X = m.clientY >= W.top + W.height / 2, pt = d.tasks.filter((mt) => mt.id !== I?.id), xt = pt.findIndex((mt) => mt.id === A.id), nt = A.id === I?.id ? A.id : X ? pt[xt + 1]?.id : A.id;
    await P(d, nt);
  }
  async function yt(m, A) {
    m.preventDefault(), m.stopPropagation(), await P(A, v.value === n.columns.indexOf(A) ? L.value : void 0);
  }
  return ct(() => [n.view, n.activeProjectId], () => F()), ct(() => n.columns, (m) => {
    H && !m.includes(H) && F();
  }), ct(i.isActive, (m) => {
    m || F();
  }, { immediate: !0, flush: "sync" }), Mt(F), {
    draggingTaskId: r,
    dragOverColIndex: v,
    dragOverTaskId: w,
    dragAfterTask: x,
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
function co(i) {
  return i.key === "Enter" && !i.isComposing && i.keyCode !== 229 && (i.ctrlKey || i.metaKey) && !i.altKey && !i.shiftKey && !i.repeat;
}
function Ee(i) {
  return i.isComposing || i.keyCode === 229;
}
const Js = ["data-row-key"], Zs = /* @__PURE__ */ Kt({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(i) {
    const n = i, r = M(null), v = /* @__PURE__ */ new Map(), w = M(0), x = so({ top: 0, height: 600 }), E = (h) => n.isPreview(h) ? `preview:${h.id}` : h.id, L = tt(() => {
      w.value;
      const h = [0];
      for (const I of n.tasks) {
        const H = I.id === n.hiddenId && !n.isPreview(I) ? 0 : v.get(E(I)) || v.get(I.id) || 110;
        h.push(h[h.length - 1] + H);
      }
      return h;
    }), N = tt(() => {
      w.value;
      let h = 0;
      return n.tasks.filter((I) => !n.isPreview(I)).map((I) => {
        const H = v.get(I.id) || 110, Q = { id: I.id, middle: h + H / 2 };
        return h += H, Q;
      });
    });
    function G(h) {
      const I = L.value;
      let H = 0, Q = n.tasks.length;
      for (; H < Q; ) {
        const F = H + Q >>> 1;
        I[F + 1] < h ? H = F + 1 : Q = F;
      }
      return H;
    }
    const T = tt(() => {
      const h = Math.max(0, G(x.value.top) - 5), I = Math.min(n.tasks.length, G(x.value.top + x.value.height) + 6), H = /* @__PURE__ */ new Set();
      for (let Q = h; Q < I; Q++) H.add(Q);
      if (n.pinnedId) {
        const Q = n.tasks.findIndex((F) => F.id === n.pinnedId && !n.isPreview(F));
        Q >= 0 && H.add(Q);
      }
      return [...H].sort((Q, F) => Q - F).map((Q) => ({ task: n.tasks[Q], index: Q, top: L.value[Q] }));
    });
    let V = 0;
    function K() {
      V || (V = requestAnimationFrame(() => {
        V = 0, r.value && (x.value = { top: r.value.scrollTop, height: r.value.clientHeight });
      }));
    }
    let R;
    const D = /* @__PURE__ */ new Map();
    function $(h, I) {
      const H = D.get(I);
      H !== h && (H && R?.unobserve(H), h instanceof HTMLElement ? (D.set(I, h), R?.observe(h)) : D.delete(I));
    }
    return ct(() => n.tasks, () => {
      const h = new Set(n.tasks.map(E));
      for (const I of v.keys()) h.has(I) || v.delete(I);
      It(K);
    }), oe(() => {
      R = new ResizeObserver((h) => {
        let I = !1;
        const H = G(r.value?.scrollTop || 0), Q = L.value[H] || 0;
        for (const F of h) {
          const ft = F.target;
          if (ft === r.value) {
            K();
            continue;
          }
          const at = ft.dataset.rowKey, B = F.borderBoxSize?.[0]?.blockSize || F.contentRect.height;
          at && B > 0 && Math.abs((v.get(at) || 0) - B) > 0.5 && (v.set(at, B), I = !0);
        }
        if (I) {
          w.value++;
          const F = (L.value[H] || 0) - Q;
          r.value && F && !n.pinnedId && (r.value.scrollTop += F), K();
        }
      }), r.value && (R.observe(r.value), r.value.__todoistSlots = () => N.value);
      for (const h of D.values()) R.observe(h);
      K();
    }), Mt(() => {
      R?.disconnect(), cancelAnimationFrame(V), r.value && delete r.value.__todoistSlots, D.clear(), v.clear();
    }), (h, I) => (l(), p("div", {
      ref_key: "root",
      ref: r,
      onScrollPassive: K
    }, [
      i.tasks.length ? (l(), p("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: bt({ height: `${L.value[L.value.length - 1]}px` })
      }, [
        (l(!0), p(it, null, dt(T.value, (H) => (l(), p("div", {
          key: E(H.task),
          ref_for: !0,
          ref: (Q) => $(Q, E(H.task)),
          "data-row-key": E(H.task),
          class: "virtual-task-row",
          style: bt({ transform: `translateY(${H.top}px)` })
        }, [
          Pe(h.$slots, "default", {
            task: H.task,
            index: H.index
          }, void 0, !0)
        ], 12, Js))), 128))
      ], 4)) : Pe(h.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), tn = /* @__PURE__ */ ne(Zs, [["__scopeId", "data-v-b7076778"]]), en = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, on = {
  key: 1,
  class: "todoist-move-status error",
  role: "status"
}, sn = {
  key: 2,
  class: "todoist-empty"
}, nn = {
  key: 3,
  class: "todoist-empty"
}, an = {
  key: 4,
  class: "todoist-projects-empty-state"
}, ln = {
  key: 0,
  class: "todoist-projects-toolbar"
}, rn = { class: "todoist-projects-toolbar-inner" }, dn = { class: "todoist-project-tabs-scroll" }, cn = ["onClick"], un = { class: "todoist-project-tab-name" }, pn = {
  key: 0,
  class: "todoist-project-actions-group"
}, mn = ["title"], vn = { class: "action-text" }, fn = ["title"], gn = { class: "action-text" }, bn = { class: "todoist-board" }, kn = ["data-section-id", "data-title", "data-column-index"], yn = { class: "todoist-board-column-head" }, hn = ["title", "onClick"], wn = ["onClick"], Tn = ["onSubmit"], Dn = ["onKeydown"], Cn = { class: "date-hint-left" }, xn = { class: "date-hint-badge" }, _n = { class: "date-hint-sub" }, Sn = {
  key: 0,
  class: "date-hint-preview"
}, $n = {
  key: 1,
  class: "date-hint-preview ignored-text"
}, In = {
  key: 1,
  class: "todoist-composer-images"
}, Pn = ["src"], Rn = { class: "todoist-composer-img-name" }, Ln = {
  key: 0,
  class: "todoist-composer-img-status"
}, On = ["onClick"], En = { class: "todoist-inline-actions" }, Mn = ["disabled"], An = ["disabled"], jn = {
  key: 0,
  class: "todoist-column-empty"
}, Wn = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Un = ["disabled", "title", "aria-label", "onClick"], Bn = { class: "todoist-board-task-main" }, Vn = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Nn = {
  key: 1,
  class: "todoist-card-repo-strip"
}, Hn = ["title", "onClick"], zn = { class: "repo-badge-name" }, Kn = {
  key: 2,
  class: "todoist-card-repo-strip bili-strip"
}, Fn = ["title", "onClick"], Yn = { class: "repo-badge-name" }, Gn = {
  key: 3,
  class: "todoist-card-repo-strip web-strip"
}, Xn = ["title", "onClick"], qn = { class: "repo-badge-name" }, Qn = ["onKeydown", "onBlur"], Jn = {
  key: 5,
  class: "todoist-board-task-title todoist-task-content"
}, Zn = {
  key: 6,
  class: "todoist-board-task-description"
}, ti = {
  key: 7,
  class: "todoist-board-task-meta"
}, ei = ["title"], oi = ["title"], si = ["title"], ni = ["title"], ii = {
  key: 4,
  class: "todoist-board-extra"
}, ai = ["onClick"], li = ["src"], ri = {
  key: 0,
  class: "todoist-board-add-column"
}, di = {
  key: 1,
  class: "todoist-add-section-form"
}, ci = ["onKeydown"], ui = { class: "todoist-add-section-actions" }, pi = { class: "section-menu-text" }, mi = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, vi = ["disabled"], fi = ["disabled"], gi = {
  key: 1,
  class: "todoist-section-menu-divider"
}, bi = { class: "section-menu-text" }, ki = { class: "todoist-task-menu-header" }, yi = { class: "todoist-task-menu-title" }, hi = { class: "todoist-menu-text" }, wi = { class: "todoist-menu-badge" }, Ti = {
  key: 0,
  class: "todoist-labels-panel"
}, Di = { class: "todoist-labels-quick-input" }, Ci = ["placeholder", "onKeydown"], xi = { class: "todoist-labels-chip-grid" }, _i = ["onClick"], Si = {
  key: 0,
  class: "chip-check"
}, $i = { class: "todoist-menu-text" }, Ii = {
  key: 1,
  class: "todoist-recur-panel"
}, Pi = { class: "todoist-recur-grid" }, Ri = ["onClick"], Li = { class: "todoist-recur-custom-row" }, Oi = ["onKeydown"], Ei = { class: "todoist-menu-text" }, Mi = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, Ai = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, ji = {
  key: 2,
  class: "todoist-color-panel"
}, Wi = { class: "todoist-color-grid" }, Ui = ["title", "onClick"], Bi = { class: "todoist-color-name" }, Vi = { class: "todoist-menu-text" }, Ni = ["disabled", "onClick"], Hi = { class: "todoist-project-flyout-name" }, zi = {
  key: 0,
  class: "todoist-menu-badge"
}, Ki = { class: "todoist-menu-text" }, Fi = { class: "todoist-dialog-title" }, Yi = ["title"], Gi = { class: "todoist-dialog-body" }, Xi = {
  key: 0,
  class: "todoist-dialog-desc"
}, qi = ["placeholder", "onKeydown"], Qi = { class: "todoist-dialog-foot" }, Ji = { class: "todoist-dialog-icon" }, Zi = { class: "todoist-dialog-title" }, ta = ["title"], ea = { class: "todoist-dialog-body" }, oa = {
  key: 0,
  class: "todoist-dialog-danger-banner"
}, sa = { class: "todoist-dialog-danger-text" }, na = { class: "todoist-dialog-msg" }, ia = { class: "todoist-dialog-foot" }, aa = /* @__PURE__ */ Kt({
  __name: "TodoistTaskList",
  props: {
    embedded: { type: Boolean, default: !1 }
  },
  setup(i) {
    const n = M(0);
    function r() {
      n.value++;
    }
    oe(() => {
      window.addEventListener("storage", r), window.addEventListener("todoist-repository-links-changed", r), window.addEventListener("todoist-bili-links-changed", r), window.addEventListener("todoist-web-links-changed", r);
    }), Mt(() => {
      window.removeEventListener("storage", r), window.removeEventListener("todoist-repository-links-changed", r), window.removeEventListener("todoist-bili-links-changed", r), window.removeEventListener("todoist-web-links-changed", r);
    });
    function v(s, o) {
      return n.value, io(s, o);
    }
    function w(s, o, a) {
      return n.value, Ko(s, o, a);
    }
    function x(s, o, a) {
      return n.value, Fo(s, o, a);
    }
    function E(s) {
      s && window.open(s, "_blank", "noopener,noreferrer");
    }
    function L(s) {
      Yo.openVideo({
        bvid: s.bvid,
        aid: s.aid ? String(s.aid) : void 0,
        title: s.title,
        author: s.author,
        cover: s.cover,
        url: s.url
      });
    }
    function N(s) {
      ao.open(s);
    }
    const G = i, T = Tt, V = M(""), K = M(null), R = M(""), D = M(!1), $ = tt(() => R.value ? Vo(R.value) : null), h = tt(() => {
      const s = Array.from(($.value?.cleanTitle || "").replace(/\s+/g, " ").trim());
      return s.length > 40 ? `${s.slice(0, 40).join("")}…` : s.join("");
    }), I = M([]);
    function H(s) {
      const o = s.clipboardData?.items;
      if (o)
        for (let a = 0; a < o.length; a++) {
          const O = o[a];
          if (O.type.indexOf("image") !== -1) {
            s.preventDefault();
            const c = O.getAsFile();
            if (!c) continue;
            const st = URL.createObjectURL(c), U = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Dt = {
              file: c,
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
    }), et = M(null), Y = M(null), W = [
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
    ], pt = tt(() => String(d.task?._taskRaw?.project_id || d.col?.projectId || "")), xt = tt(() => T.view !== "projects" ? null : T.projects.find((s) => String(s.id) === String(T.activeProjectId)) || T.projects[0] || null), nt = tt(() => {
      const s = new Set(T.availableLabels || []);
      return d.task?.labels && d.task.labels.forEach((o) => s.add(o)), Array.from(s);
    }), mt = tt(() => {
      const s = d.task?.customColorHex;
      return s && W.find((a) => a.hex.toLowerCase() === s.toLowerCase()) || W[0];
    });
    function At(s, o) {
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
      draggingTaskId: jt,
      dragOverColIndex: Ht,
      dragOverTaskId: Ft,
      dragAfterTask: Wt,
      isDragPreview: ut,
      previewTasks: j,
      onTaskDragStart: u,
      onTaskDragEnd: b,
      onColDragOver: Z,
      onColDragLeave: $t,
      onTaskDragOver: Ut,
      onTaskDrop: ge,
      onColDrop: be
    } = Qs({
      state: T,
      allowResourceDrag: () => G.embedded,
      isActive: () => q.active,
      editingTaskId: () => F.value,
      closePopovers: vt,
      moveTask: (s, o, a) => ot.moveTask(s, o, a),
      dropLabel: (s, o) => {
        s.labels || (s.labels = []), s.labels.includes(o) || (s.labels.push(o), lt.getToken() && lt.updateTask(s.id, { labels: s.labels }));
      }
    });
    function ke(s, o) {
      ot.dispatch("toggle-task", { task: s, group: o });
    }
    function ye(s, o) {
      if (s.completed) return;
      const a = o.target;
      a && a.closest("button,input,textarea,select,a") || ie(s);
    }
    function ie(s) {
      T.movingTaskId !== s.id && (F.value = s.id, ft.value = s.content, It(() => {
        at.value && (at.value.focus(), at.value.select());
      }));
    }
    function Bt(s, o) {
      if (F.value !== s.id) return;
      const a = ft.value.trim();
      F.value = null, o && a && a !== s.content && (s.content = a, ot.dispatch("update-task-title", {
        taskId: s.id,
        content: a,
        task: s,
        newContent: a
      }));
    }
    function he(s, o) {
      Ee(s) || (s.key === "Enter" ? s.shiftKey || (s.preventDefault(), Bt(o, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), Bt(o, !1)));
    }
    function ae(s, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(s.id, s);
    }
    function we(s, o, a) {
      const O = a.currentTarget;
      K.value = At(s, o), R.value = "", D.value = !1, It(() => {
        O.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function C() {
      S.value || k();
    }
    function k() {
      K.value = null, R.value = "", D.value = !1;
      for (const s of I.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      I.value = [];
    }
    const S = M(!1), gt = /* @__PURE__ */ new WeakMap();
    function _t(s) {
      const o = s.description || s._taskRaw?.description || "", a = gt.get(s);
      if (a && a.source === o) return a;
      const O = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, c = {
        source: o,
        thumb: O,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return gt.set(s, c), c;
    }
    function ht(s) {
      return _t(s).text;
    }
    function zt(s) {
      return _t(s).thumb;
    }
    function uo(s, o) {
      s && Me.open(s, o?.content || "任务照片");
    }
    async function Ae(s) {
      if (!q.active || S.value) return;
      const o = [...I.value];
      let O = R.value.trim() || o[0]?.name || "";
      if (!O) return;
      let c, st, U;
      if ($.value && !D.value) {
        const Pt = $.value;
        O = Pt.cleanTitle || O, c = Pt.date, st = Pt.label + (Pt.time ? ` ${Pt.time}` : ""), U = Pt.time ? `${Pt.date} ${Pt.time}` : Pt.date;
      }
      const Dt = K.value, Yt = R.value, St = T.view, xe = s.projectId || St === "projects" && T.activeProjectId || void 0, _e = s.sectionId !== void 0 ? s.sectionId : void 0;
      S.value = !0;
      try {
        await Io(async () => {
          for (const Ct of o)
            if (!Ct.uploadedUrl) {
              Ct.uploading = !0;
              try {
                const Se = await lt.uploadFile(Ct.file, Ct.name);
                Ct.uploadedUrl = Se.file_url;
              } catch {
                Ct.uploadedUrl = Ct.previewUrl;
              } finally {
                Ct.uploading = !1;
              }
            }
          await ot.dispatch("add-task-submit", {
            content: O,
            view: St,
            group: s,
            projectId: xe,
            sectionId: _e,
            dueDate: c,
            dueText: st,
            dueString: U,
            attachments: o.map((Ct) => ({ file_url: Ct.uploadedUrl, file_name: Ct.name, file_type: Ct.file.type || "image/png" }))
          }) && Dt === K.value && Yt === R.value && o.length === I.value.length && o.every((Ct, Se) => Ct === I.value[Se]) && k();
        });
      } catch {
        T.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        S.value = !1;
      }
    }
    function po(s, o) {
      Ee(s) || (co(s) ? (s.preventDefault(), Ae(o)) : s.key === "Escape" && (s.preventDefault(), C()));
    }
    function je() {
      const s = V.value.trim();
      if (!s) return;
      const a = T.columns.find((O) => O.projectId)?.projectId || T.activeProjectId || void 0;
      ot.dispatch("add-section-submit", { name: s, projectId: a }), Te();
    }
    function Te() {
      T.addingSection = !1, V.value = "";
    }
    function mo(s, o, a) {
      if (B.isOpen && B.col === s) {
        B.isOpen = !1;
        return;
      }
      d.isOpen = !1;
      const c = a.currentTarget.getBoundingClientRect(), U = Math.max(8, Math.min(window.innerWidth - 175 - 8, c.left)), Dt = Math.max(8, Math.min(window.innerHeight - 220, c.bottom + 4));
      B.col = s, B.x = U, B.y = Dt, B.canMoveLeft = o > 0 && !!T.columns[o - 1]?.sectionId, B.canMoveRight = o < T.columns.length - 1 && !!T.columns[o + 1]?.sectionId, B.isOpen = !0;
    }
    function We(s, o) {
      B.isOpen = !1, ot.dispatch("move-section", { sectionId: s.sectionId, direction: o });
    }
    function Ue(s, o, a) {
      if (T.movingTaskId === s.id || s.completed) return;
      B.isOpen = !1;
      const O = 236, c = 340, st = Math.max(8, Math.min(window.innerWidth - O - 8, a.clientX)), U = Math.max(8, Math.min(window.innerHeight - c - 8, a.clientY));
      if (d.task = s, d.col = o, d.x = st, d.y = U, d.activeSubpanel = null, d.descText = s.description || "", d.isSavingDesc = !1, d.newLabelText = "", d.customRecurText = "", s.dueDate) {
        const St = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(St.getTime()) && (d.calYear = St.getFullYear(), d.calMonth = St.getMonth());
      } else {
        const St = /* @__PURE__ */ new Date();
        d.calYear = St.getFullYear(), d.calMonth = St.getMonth();
      }
      const Dt = 252, Yt = st + O + Dt > window.innerWidth - 8;
      d.flyoutOpenLeft = Yt, d.flyoutStyle = {
        left: Yt ? `${-Dt - 6}px` : `${O + 6}px`,
        top: "0px"
      }, d.isOpen = !0;
    }
    function ce(s) {
      d.activeSubpanel === s ? d.activeSubpanel = null : (d.activeSubpanel = s, s === "desc" ? It(() => {
        et.value?.focus(), et.value?.select();
      }) : s === "labels" && It(() => {
        Y.value?.focus();
      }));
    }
    function Be(s) {
      return !!d.task?.labels?.includes(s);
    }
    function vo(s) {
      if (!d.task) return;
      const o = d.task.id, a = [...d.task.labels || []], O = a.includes(s) ? a.filter((c) => c !== s) : [...a, s];
      d.task.labels = O, ot.dispatch("update-task-labels", { taskId: o, labels: O });
    }
    function Ve() {
      if (!d.task) return;
      const s = d.newLabelText.trim();
      if (!s) return;
      d.newLabelText = "";
      const o = d.task.id, a = [...d.task.labels || []];
      a.includes(s) || (a.push(s), d.task.labels = a, ot.dispatch("update-task-labels", { taskId: o, labels: a })), vt();
    }
    function fo(s) {
      return String(d.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function go(s, o) {
      if (!d.task) return;
      const a = d.task.id;
      ot.dispatch("update-task-recurring", { taskId: a, rule: s, label: o }), vt();
    }
    function Ne() {
      if (!d.task) return;
      const s = d.customRecurText.trim();
      if (!s) return;
      const o = d.task.id;
      ot.dispatch("update-task-recurring", { taskId: o, rule: s, label: s }), vt();
    }
    function bo() {
      if (!d.task) return;
      const s = d.task.id;
      ot.dispatch("clear-task-recurring", { taskId: s }), vt();
    }
    function ko(s) {
      if (!d.task) return;
      const o = d.task.id, a = W.find((O) => O.id === s);
      d.task.customColorHex = a?.hex || "", ot.dispatch("update-task-color", { taskId: o, colorId: s }), vt();
    }
    function yo(s) {
      if (!d.task) return;
      const o = d.task.id;
      ot.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), vt();
    }
    function ho() {
      if (!d.task) return;
      const s = d.task, o = { x: d.x, y: d.y };
      vt();
      const a = Zt(o, 380, 220);
      m.x = a.x, m.y = a.y, s.isRecurring ? (m.title = "删除重复任务确认", m.icon = "⚠️", m.danger = !0, m.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", m.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, m.confirmText = "删除重复任务", m.actionType = "delete-task", m.payload = { taskId: s.id, isRecurring: !0 }, m.isOpen = !0) : (m.title = "删除任务确认", m.icon = "🗑️", m.danger = !0, m.alertText = `确定要删除任务「${s.content}」吗？`, m.message = "此操作不可撤销。", m.confirmText = "确认删除", m.actionType = "delete-task", m.payload = { taskId: s.id, isRecurring: !1 }, m.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, o, a) {
      Ue(s, o, a);
    });
    function Zt(s, o = 380, a = 220) {
      let O = null;
      if (s instanceof HTMLElement)
        O = s.getBoundingClientRect();
      else if (s && "currentTarget" in s && s.currentTarget instanceof HTMLElement)
        O = s.currentTarget.getBoundingClientRect();
      else if (s && "target" in s && s.target instanceof HTMLElement)
        O = (s.target.closest("button") || s.target).getBoundingClientRect();
      else if (s && "x" in s && "y" in s && typeof s.x == "number" && typeof s.y == "number") {
        const c = Math.max(16, Math.min(window.innerWidth - o - 16, s.x)), st = Math.max(16, Math.min(window.innerHeight - a - 16, s.y + 10));
        return { x: c, y: st };
      }
      if (O) {
        let c = O.right - o;
        c < 16 && (c = Math.max(16, O.left)), c = Math.max(16, Math.min(window.innerWidth - o - 16, c));
        let st = O.bottom + 8;
        return st + a > window.innerHeight - 16 && O.top > a + 16 && (st = O.top - a - 8), st = Math.max(16, Math.min(window.innerHeight - a - 16, st)), { x: c, y: st };
      }
      return {
        x: Math.max(16, Math.round((window.innerWidth - o) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - a) / 3))
      };
    }
    function He(s, o) {
      if (o.button !== 0 || o.target?.closest("button, input, textarea")) return;
      o.preventDefault();
      const a = o.clientX, O = o.clientY, c = s === "prompt" ? P : m, st = c.x, U = c.y, Dt = (St) => {
        const xe = St.clientX - a, _e = St.clientY - O;
        c.x = Math.max(10, Math.min(window.innerWidth - 320, st + xe)), c.y = Math.max(10, Math.min(window.innerHeight - 120, U + _e));
      }, Yt = () => {
        window.removeEventListener("pointermove", Dt), window.removeEventListener("pointerup", Yt);
      };
      window.addEventListener("pointermove", Dt), window.addEventListener("pointerup", Yt);
    }
    function ze(s) {
      const o = Zt(s, 380, 220);
      P.x = o.x, P.y = o.y, P.title = g("todoist.newProject"), P.message = g("todoist.inputProjectPlaceholder"), P.value = "", P.placeholder = g("todoist.inputProjectPlaceholder"), P.confirmText = g("common.confirm"), P.actionType = "create-project", P.payload = null, P.isOpen = !0, It(() => kt.value?.focus());
    }
    function wo(s, o) {
      const a = Zt(o, 380, 220);
      P.x = a.x, P.y = a.y, P.title = g("todoist.renameProject"), P.message = s.name, P.value = s.name, P.placeholder = g("todoist.inputProjectPlaceholder"), P.confirmText = g("common.save"), P.actionType = "rename-project", P.payload = { projectId: s.id }, P.isOpen = !0, It(() => {
        kt.value?.focus(), kt.value?.select();
      });
    }
    function To(s, o) {
      const a = o || { x: B.x, y: B.y };
      B.isOpen = !1;
      const O = Zt(a, 380, 220);
      P.x = O.x, P.y = O.y, P.title = g("todoist.renameSection"), P.message = s.title, P.value = s.title, P.placeholder = g("todoist.inputSectionPlaceholder"), P.confirmText = g("common.save"), P.actionType = "rename-section", P.payload = { sectionId: s.sectionId }, P.isOpen = !0, It(() => {
        kt.value?.focus(), kt.value?.select();
      });
    }
    function le() {
      P.isOpen = !1;
    }
    function Ke() {
      const s = P.value.trim();
      if (!s) return;
      const { actionType: o, payload: a } = P;
      le(), o === "create-project" ? ot.dispatch("create-project-submit", s) : o === "rename-project" && a && "projectId" in a ? ot.dispatch("rename-project-submit", { projectId: a.projectId, newName: s }) : o === "rename-section" && a && "sectionId" in a && ot.dispatch("rename-section", { sectionId: a.sectionId, newName: s });
    }
    function Do(s, o) {
      const a = Zt(o, 380, 240);
      m.x = a.x, m.y = a.y, m.title = g("todoist.deleteProjectConfirm"), m.icon = "🗑️", m.danger = !0, m.alertText = g("todoist.deleteProjectAlert", { name: s.name }), m.message = g("todoist.deleteProjectWarning"), m.confirmText = g("common.deletePermanently"), m.actionType = "delete-project", m.payload = { projectId: s.id }, m.isOpen = !0;
    }
    function Co(s, o) {
      const a = o || { x: B.x, y: B.y };
      B.isOpen = !1;
      const O = Zt(a, 380, 240);
      m.x = O.x, m.y = O.y, m.title = g("todoist.deleteSectionConfirm"), m.icon = "🗑️", m.danger = !0, m.alertText = g("todoist.deleteSectionAlert", { name: s.title }), m.message = g("todoist.deleteSectionWarning"), m.confirmText = g("todoist.deleteSection"), m.actionType = "delete-section", m.payload = { sectionId: s.sectionId }, m.isOpen = !0;
    }
    function ue() {
      m.isOpen = !1;
    }
    function xo() {
      const { actionType: s, payload: o } = m;
      ue(), s === "delete-project" && o && "projectId" in o ? ot.dispatch("delete-project-submit", o.projectId) : s === "delete-section" && o && "sectionId" in o ? ot.dispatch("delete-section", { sectionId: o.sectionId }) : s === "delete-task" && o && "taskId" in o && ot.dispatch("delete-task-submit", o);
    }
    function _o(s) {
      ot.dispatch("switch-project", s);
    }
    function De(s) {
      s.key === "Escape" && (P.isOpen && le(), m.isOpen && ue(), d.isOpen && (d.isOpen = !1, d.activeSubpanel = null), B.isOpen && (B.isOpen = !1));
    }
    function Ce(s) {
      const o = s.target;
      o && (P.isOpen && yt.value && !yt.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-project-new-btn, .todoist-section-menu-item") && le(), m.isOpen && A.value && !A.value.contains(o) && !o.closest(".todoist-project-action-btn, .todoist-section-menu-item, .todoist-task-menu-item") && ue());
    }
    return ct(() => q.active, (s) => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", Ce), s && (document.addEventListener("keydown", De), window.addEventListener("pointerdown", Ce));
    }, { immediate: !0, flush: "sync" }), Mt(() => {
      document.removeEventListener("keydown", De), window.removeEventListener("pointerdown", Ce), k();
    }), (s, o) => (l(), p("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: vt
    }, [
      Pe(s.$slots, "wallpaper", {}, void 0, !0),
      e(T).moveError && e(T).moveMessage ? (l(), p("p", en, f(e(T).moveMessage), 1)) : _("", !0),
      e(T).emptyText && e(T).columns.length > 0 && !e(T).loading ? (l(), p("p", on, f(e(g)("todoist.tasksRetained", { text: e(T).emptyText })), 1)) : _("", !0),
      e(T).loading && e(T).columns.length === 0 ? (l(), p("p", sn, f(e(g)("common.loading")), 1)) : e(T).emptyText && e(T).columns.length === 0 ? (l(), p("p", nn, f(e(T).emptyText), 1)) : e(T).view === "projects" && e(T).projects.length === 0 ? (l(), p("div", an, [
        o[29] || (o[29] = t("div", { class: "empty-icon" }, "📁", -1)),
        t("h3", null, f(e(g)("todoist.emptyProjects")), 1),
        t("p", null, f(e(g)("todoist.emptyProjectsDesc")), 1),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: o[0] || (o[0] = (a) => ze(a))
        }, f(e(g)("todoist.createFirstProject")), 1)
      ])) : (l(), p(it, { key: 5 }, [
        e(T).view === "projects" && e(T).projects.length ? (l(), p("div", ln, [
          t("div", rn, [
            t("div", dn, [
              (l(!0), p(it, null, dt(e(T).projects, (a) => (l(), p("button", {
                key: a.id,
                type: "button",
                class: J(["todoist-project-tab", { active: String(a.id) === String(e(T).activeProjectId) }]),
                onClick: (O) => _o(a.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: bt({ background: a.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", un, f(a.name), 1)
              ], 10, cn))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: o[1] || (o[1] = (a) => ze(a))
              }, "＋ 新建项目")
            ]),
            xt.value ? (l(), p("div", pn, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: e(g)("todoist.renameProject"),
                onClick: o[2] || (o[2] = (a) => wo(xt.value, a))
              }, [
                o[30] || (o[30] = t("span", { class: "action-icon" }, "✏️", -1)),
                t("span", vn, f(e(g)("common.rename")), 1)
              ], 8, mn),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: e(g)("todoist.deleteProject"),
                onClick: o[3] || (o[3] = (a) => Do(xt.value, a))
              }, [
                o[31] || (o[31] = t("span", { class: "action-icon" }, "🗑️", -1)),
                t("span", gn, f(e(g)("todoist.deleteProject")), 1)
              ], 8, fn)
            ])) : _("", !0)
          ])
        ])) : _("", !0),
        t("div", bn, [
          (l(!0), p(it, null, dt(e(T).columns, (a, O) => (l(), p("section", {
            key: a.sectionId || a.title || O,
            class: "todoist-board-column",
            "data-section-id": a.sectionId,
            "data-title": a.title,
            "data-column-index": O
          }, [
            t("header", yn, [
              t("h3", null, [
                Nt(f(a.title) + " ", 1),
                t("span", null, f(a.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: a.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: z((c) => mo(a, O, c), ["stop"])
              }, "•••", 8, hn)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (c) => we(a, O, c)
            }, "＋ 添加任务", 8, wn),
            K.value === At(a, O) ? (l(), p("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: z((c) => Ae(a), ["prevent"])
            }, [
              Lt(t("textarea", {
                "onUpdate:modelValue": o[4] || (o[4] = (c) => R.value = c),
                rows: "2",
                placeholder: "任务名称（Enter 换行，⌘/Ctrl+Enter 创建，支持粘贴图片）",
                onKeydown: (c) => po(c, a),
                onPaste: o[5] || (o[5] = (c) => H(c))
              }, null, 40, Dn), [
                [Gt, R.value]
              ]),
              $.value ? (l(), p("div", {
                key: 0,
                class: J(["todoist-composer-date-hint", { "is-ignored": D.value }])
              }, [
                t("div", Cn, [
                  o[33] || (o[33] = t("span", { class: "date-hint-icon" }, "📅", -1)),
                  t("span", xn, [
                    Nt(f($.value.label) + f($.value.time ? " " + $.value.time : "") + " ", 1),
                    t("span", _n, "(" + f($.value.formattedDate) + ")", 1)
                  ]),
                  D.value ? (l(), p("span", $n, " (已忽略日期，按纯文本创建) ")) : (l(), p("span", Sn, [
                    o[32] || (o[32] = Nt(" 精简任务名: ", -1)),
                    t("strong", null, f(h.value), 1)
                  ]))
                ]),
                t("button", {
                  type: "button",
                  class: "date-hint-toggle-btn",
                  onClick: o[6] || (o[6] = (c) => D.value = !D.value)
                }, f(D.value ? "↺ 恢复识别" : "× 忽略"), 1)
              ], 2)) : _("", !0),
              I.value.length > 0 ? (l(), p("div", In, [
                (l(!0), p(it, null, dt(I.value, (c, st) => (l(), p("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: c.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, Pn),
                  t("span", Rn, f(c.name), 1),
                  c.uploading ? (l(), p("span", Ln, "上传中…")) : _("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (U) => Q(st)
                  }, "×", 8, On)
                ]))), 128))
              ])) : _("", !0),
              t("div", En, [
                t("button", {
                  type: "button",
                  disabled: S.value,
                  onClick: C
                }, f(e(g)("common.cancel")), 9, Mn),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: S.value
                }, f(S.value ? I.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, An)
              ])
            ], 40, Tn)) : _("", !0),
            Xt(tn, {
              tasks: e(j)(a, O),
              "pinned-id": e(jt) || F.value,
              "hidden-id": e(Ht) !== null ? e(jt) : null,
              "is-preview": e(ut),
              class: J(["todoist-board-list", { "drag-over": e(Ht) === O }]),
              "data-group-index": O,
              onDragover: z((c) => e(Z)(c, O), ["prevent"]),
              onDragleave: (c) => e($t)(c, O),
              onDrop: z((c) => e(be)(c, a), ["prevent"])
            }, {
              empty: se(() => [
                a.tasks.length === 0 && e(Ht) !== O ? (l(), p("p", jn, " 暂无任务 · 可拖到这里 ")) : _("", !0)
              ]),
              default: se(({ task: c, index: st }) => [
                t("article", {
                  class: J(["todoist-board-task", [
                    {
                      completed: c.completed,
                      "has-custom-color": !!c.customColorHex,
                      editing: F.value === c.id,
                      "dragging-task": !e(ut)(c) && e(jt) === c.id,
                      "drop-before": e(Ft) === c.id && !e(Wt),
                      "drop-after": e(Ft) === c.id && e(Wt),
                      "saving-position": e(T).movingTaskId === c.id,
                      "todoist-task-preview": e(ut)(c),
                      "drag-origin-hidden": e(jt) === c.id && !e(ut)(c) && e(Ht) !== null
                    }
                  ]]),
                  style: bt(c.customColorHex ? { "--task-custom-color": c.customColorHex } : {}),
                  "data-task-id": e(ut)(c) ? void 0 : c.id,
                  "aria-hidden": e(ut)(c) || void 0,
                  tabindex: e(ut)(c) ? -1 : 0,
                  title: Qt(),
                  draggable: !e(ut)(c) && !c.completed && !e(T).loading && !e(T).movingTaskId && !e(T).moveNeedsRefresh && F.value !== c.id && !c.id.startsWith("optimistic-"),
                  onDragstart: (U) => e(u)(U, c, a, st),
                  onDragend: o[9] || (o[9] = //@ts-ignore
                  (...U) => e(b) && e(b)(...U)),
                  onDragover: z((U) => e(Ut)(U, c, a, st), ["stop", "prevent"]),
                  onDrop: z((U) => e(ge)(U, c, a, st), ["stop", "prevent"]),
                  onDblclick: (U) => ye(c, U),
                  onClick: (U) => ae(c, U),
                  onContextmenu: z((U) => Ue(c, a, U), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: J(["todoist-board-check", { checked: c.completed }]),
                    disabled: e(ut)(c) || e(T).movingTaskId === c.id,
                    title: c.completed ? "撤销完成" : "完成任务",
                    "aria-label": (c.completed ? "撤销完成：" : "完成：") + c.content,
                    onClick: z((U) => ke(c, a), ["stop"])
                  }, null, 10, Un),
                  t("div", Bn, [
                    e(T).movingTaskId === c.id ? (l(), p("span", Vn, "保存中")) : _("", !0),
                    v(c.id, c.description).length ? (l(), p("div", Nn, [
                      (l(!0), p(it, null, dt(v(c.id, c.description), (U) => (l(), p("button", {
                        key: U.fullName,
                        type: "button",
                        class: "todoist-card-repo-btn",
                        title: "关联 GitHub 仓库：" + U.fullName + " · 点击在插件内查看详情",
                        onClick: z((Dt) => N(U.fullName), ["stop"])
                      }, [
                        o[34] || (o[34] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
                        t("span", zn, f(U.fullName), 1)
                      ], 8, Hn))), 128))
                    ])) : _("", !0),
                    w(c.id, c.description, c.content).length ? (l(), p("div", Kn, [
                      (l(!0), p(it, null, dt(w(c.id, c.description, c.content), (U) => (l(), p("button", {
                        key: U.bvid,
                        type: "button",
                        class: "todoist-card-repo-btn bili-btn",
                        title: "关联 B站 视频：" + U.title + " · 点击立即播放",
                        onClick: z((Dt) => L(U), ["stop"])
                      }, [
                        o[35] || (o[35] = t("span", { class: "repo-badge-icon" }, "📺", -1)),
                        t("span", Yn, f(U.title), 1)
                      ], 8, Fn))), 128))
                    ])) : _("", !0),
                    x(c.id, c.description, c.content).length ? (l(), p("div", Gn, [
                      (l(!0), p(it, null, dt(x(c.id, c.description, c.content), (U) => (l(), p("button", {
                        key: U.url,
                        type: "button",
                        class: "todoist-card-repo-btn web-btn",
                        title: "关联网页：" + (U.title || U.url) + " · 点击直接打开",
                        onClick: z((Dt) => E(U.url), ["stop"])
                      }, [
                        o[36] || (o[36] = t("span", { class: "repo-badge-icon" }, "🌐", -1)),
                        t("span", qn, f(U.title || U.url), 1)
                      ], 8, Xn))), 128))
                    ])) : _("", !0),
                    F.value === c.id ? Lt((l(), p("textarea", {
                      key: 4,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: at,
                      "onUpdate:modelValue": o[7] || (o[7] = (U) => ft.value = U),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (U) => he(U, c),
                      onBlur: (U) => Bt(c, !0),
                      onClick: o[8] || (o[8] = z(() => {
                      }, ["stop"]))
                    }, null, 40, Qn)), [
                      [Gt, ft.value]
                    ]) : (l(), p("p", Jn, f(c.content || "未命名任务"), 1)),
                    ht(c) ? (l(), p("p", Zn, f(ht(c)), 1)) : _("", !0),
                    Jt(c) ? (l(), p("div", ti, [
                      c.startDate && !c.dueDate ? (l(), p("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${c.startDate}`
                      }, " 🛫 自 " + f(e($e)(c.startDate)) + " 起 ", 9, ei)) : c.startDate && c.dueDate ? (l(), p("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${c.startDate} 至 ${c.dueDate}`
                      }, " ⏱ " + f(e($e)(c.startDate)) + " ~ " + f(e($e)(c.dueDate)), 9, oi)) : c.dueText ? (l(), p("span", {
                        key: 2,
                        class: J(["todoist-board-due", { recurring: c.isRecurring }]),
                        title: c.isRecurring ? `循环任务：${c.dueString || c.dueText}` : void 0
                      }, f(c.isRecurring ? "↻ " : "▣ ") + f(c.dueText), 11, si)) : _("", !0),
                      (l(!0), p(it, null, dt((c.labels || []).slice(0, 3), (U) => (l(), p("span", {
                        key: U,
                        class: "todoist-board-label"
                      }, "◇ " + f(U), 1))), 128)),
                      c.timedDeadlineText ? (l(), p("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (c.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + f(c.timedDeadlineText), 9, ni)) : _("", !0),
                      c.extraCountText ? (l(), p("span", ii, f(c.extraCountText), 1)) : _("", !0)
                    ])) : _("", !0),
                    zt(c) ? (l(), p("div", {
                      key: 8,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: z((U) => uo(zt(c), c), ["stop"])
                    }, [
                      t("img", {
                        src: zt(c),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, li),
                      o[37] || (o[37] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, ai)) : _("", !0)
                  ])
                ], 46, Wn)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, kn))), 128)),
          e(T).view === "inbox" || e(T).view === "projects" ? (l(), p("div", ri, [
            e(T).addingSection ? (l(), p("div", di, [
              Lt(t("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (a) => V.value = a),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  Ot(z(je, ["prevent"]), ["enter"]),
                  Ot(Te, ["esc"])
                ]
              }, null, 40, ci), [
                [Gt, V.value]
              ]),
              t("div", ui, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: je
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
              onClick: o[10] || (o[10] = (a) => e(T).addingSection = !0)
            }, [...o[38] || (o[38] = [
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
        onClick: o[16] || (o[16] = z(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[12] || (o[12] = (a) => To(B.col, a))
        }, [
          o[39] || (o[39] = t("span", { class: "section-menu-icon" }, "✏️", -1)),
          t("span", pi, f(e(g)("todoist.menu.renameSection")), 1)
        ]),
        B.col.sectionId ? (l(), p("div", mi, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !B.canMoveLeft,
            title: "向左移动板块",
            onClick: o[13] || (o[13] = (a) => We(B.col, -1))
          }, f(e(g)("todoist.menu.moveLeft")), 9, vi),
          o[40] || (o[40] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !B.canMoveRight,
            title: "向右移动板块",
            onClick: o[14] || (o[14] = (a) => We(B.col, 1))
          }, f(e(g)("todoist.menu.moveRight")), 9, fi)
        ])) : _("", !0),
        B.col.sectionId ? (l(), p("div", gi)) : _("", !0),
        B.col.sectionId ? (l(), p("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[15] || (o[15] = (a) => Co(B.col, a))
        }, [
          o[41] || (o[41] = t("span", { class: "section-menu-icon" }, "🗑️", -1)),
          t("span", bi, f(e(g)("todoist.menu.deleteSection")), 1)
        ])) : _("", !0)
      ], 4)) : _("", !0),
      d.isOpen && d.task ? (l(), p("div", {
        key: 7,
        class: "todoist-task-context-menu",
        style: bt({ left: d.x + "px", top: d.y + "px" }),
        role: "menu",
        onClick: o[23] || (o[23] = z(() => {
        }, ["stop"]))
      }, [
        t("div", ki, [
          t("span", yi, f(d.task.content || e(g)("todoist.menu.taskOps")), 1)
        ]),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: d.activeSubpanel === "labels" }]),
          onClick: o[17] || (o[17] = (a) => ce("labels"))
        }, [
          o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          t("span", hi, f(e(g)("todoist.menu.cloudLabels")), 1),
          t("span", wi, f(d.task.labels && d.task.labels.length ? e(g)("todoist.menu.labelsSelected", { count: d.task.labels.length }) : e(g)("todoist.menu.labelsNone")), 1)
        ], 2),
        d.activeSubpanel === "labels" ? (l(), p("div", Ti, [
          t("div", Di, [
            Lt(t("input", {
              "onUpdate:modelValue": o[18] || (o[18] = (a) => d.newLabelText = a),
              type: "text",
              placeholder: e(g)("todoist.menu.newLabelPlaceholder"),
              class: "todoist-label-input",
              onKeydown: Ot(z(Ve, ["prevent"]), ["enter"])
            }, null, 40, Ci), [
              [Gt, d.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: Ve
            }, "＋")
          ]),
          t("div", xi, [
            (l(!0), p(it, null, dt(nt.value, (a) => (l(), p("button", {
              key: a,
              type: "button",
              class: J(["todoist-label-chip", { selected: Be(a) }]),
              onClick: (O) => vo(a)
            }, [
              t("span", null, "◇ " + f(a), 1),
              Be(a) ? (l(), p("span", Si, "✓")) : _("", !0)
            ], 10, _i))), 128))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: d.activeSubpanel === "recur" }]),
          onClick: o[19] || (o[19] = (a) => ce("recur"))
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          t("span", $i, f(e(g)("todoist.menu.setRecur")), 1),
          t("span", {
            class: "todoist-menu-badge",
            style: bt(d.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, f(d.task.isRecurring ? d.task.dueString || e(g)("todoist.recur.recurring") : e(g)("todoist.menu.labelsNone")), 5)
        ], 2),
        d.activeSubpanel === "recur" ? (l(), p("div", Ii, [
          t("div", Pi, [
            (l(), p(it, null, dt(X, (a) => t("button", {
              key: a.rule,
              type: "button",
              class: J(["todoist-recur-chip", { selected: fo(a.rule) }]),
              onClick: (O) => go(a.rule, a.label)
            }, [
              t("span", null, f(a.icon), 1),
              t("span", null, f(a.label), 1)
            ], 10, Ri)), 64))
          ]),
          t("div", Li, [
            Lt(t("input", {
              "onUpdate:modelValue": o[20] || (o[20] = (a) => d.customRecurText = a),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: Ot(z(Ne, ["prevent"]), ["enter"])
            }, null, 40, Oi), [
              [Gt, d.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: Ne
            }, "确定")
          ]),
          d.task.isRecurring ? (l(), p("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: bo
          }, f(e(g)("todoist.menu.clearRecur")), 1)) : _("", !0)
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: d.activeSubpanel === "color" }]),
          onClick: o[21] || (o[21] = (a) => ce("color"))
        }, [
          o[44] || (o[44] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          t("span", Ei, f(e(g)("todoist.menu.pickColor")), 1),
          t("span", Mi, [
            mt.value.id === "none" ? (l(), p("span", Ai, "⊘")) : (l(), p("span", {
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
            Nt(" " + f(mt.value.name), 1)
          ])
        ], 2),
        d.activeSubpanel === "color" ? (l(), p("div", ji, [
          t("div", Wi, [
            (l(), p(it, null, dt(W, (a) => t("button", {
              key: a.id,
              type: "button",
              class: J(["todoist-color-swatch", { selected: mt.value.id === a.id }]),
              title: a.name,
              onClick: (O) => ko(a.id)
            }, [
              t("span", {
                class: J(["todoist-color-dot", { none: a.id === "none" }]),
                style: bt(a.id !== "none" ? { background: a.hex } : {})
              }, f(a.id === "none" ? mt.value.id === "none" ? "✓" : "⊘" : mt.value.id === a.id ? "✓" : ""), 7),
              t("span", Bi, f(a.name), 1)
            ], 10, Ui)), 64))
          ])
        ])) : _("", !0),
        t("button", {
          type: "button",
          class: J(["todoist-task-menu-item", { active: d.activeSubpanel === "project" }]),
          onClick: o[22] || (o[22] = (a) => ce("project"))
        }, [
          o[45] || (o[45] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
          t("span", Vi, f(e(g)("todoist.menu.moveToProject")), 1),
          o[46] || (o[46] = t("span", { class: "todoist-menu-arrow" }, "›", -1))
        ], 2),
        d.activeSubpanel === "project" ? (l(), p("div", {
          key: 3,
          class: J(["todoist-project-flyout", { "open-left": d.flyoutOpenLeft }]),
          style: bt(d.flyoutStyle)
        }, [
          (l(!0), p(it, null, dt(e(T).projects, (a) => (l(), p("button", {
            key: a.id,
            type: "button",
            class: J(["todoist-project-flyout-item", { active: String(a.id) === pt.value }]),
            disabled: !!e(T).movingTaskId || String(a.id) === pt.value,
            onClick: (O) => yo(a)
          }, [
            o[47] || (o[47] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", Hi, f(a.name), 1),
            String(a.id) === pt.value ? (l(), p("span", zi, f(e(g)("todoist.menu.currentBadge")), 1)) : _("", !0)
          ], 10, Ni))), 128))
        ], 6)) : _("", !0),
        o[49] || (o[49] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: ho
        }, [
          o[48] || (o[48] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
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
        onClick: o[26] || (o[26] = z(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[24] || (o[24] = (a) => He("prompt", a))
        }, [
          o[50] || (o[50] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
          t("h3", Fi, f(P.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(g)("todoist.dragDialogHint")
          }, "⋮⋮", 8, Yi)
        ], 32),
        t("div", Gi, [
          P.message ? (l(), p("p", Xi, f(P.message), 1)) : _("", !0),
          Lt(t("input", {
            ref_key: "promptInputRef",
            ref: kt,
            "onUpdate:modelValue": o[25] || (o[25] = (a) => P.value = a),
            type: "text",
            class: "todoist-dialog-input",
            placeholder: P.placeholder,
            onKeydown: [
              Ot(z(Ke, ["prevent"]), ["enter"]),
              Ot(z(le, ["stop", "prevent"]), ["esc"])
            ]
          }, null, 40, qi), [
            [Gt, P.value]
          ])
        ]),
        t("div", Qi, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: le
          }, f(e(g)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: "todoist-dialog-btn primary",
            onClick: Ke
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
        onClick: o[28] || (o[28] = z(() => {
        }, ["stop"]))
      }, [
        t("div", {
          class: "todoist-dialog-head",
          onPointerdown: o[27] || (o[27] = (a) => He("confirm", a))
        }, [
          t("span", Ji, f(m.icon || "⚠️"), 1),
          t("h3", Zi, f(m.title), 1),
          t("span", {
            class: "todoist-dialog-drag-hint",
            title: e(g)("todoist.dragDialogHint")
          }, "⋮⋮", 8, ta)
        ], 32),
        t("div", ea, [
          m.danger ? (l(), p("div", oa, [
            t("div", sa, f(m.alertText), 1)
          ])) : _("", !0),
          t("p", na, f(m.message), 1)
        ]),
        t("div", ia, [
          t("button", {
            type: "button",
            class: "todoist-dialog-btn",
            onClick: ue
          }, f(e(g)("common.cancel")), 1),
          t("button", {
            type: "button",
            class: J(["todoist-dialog-btn", m.danger ? "danger" : "primary"]),
            onClick: xo
          }, f(m.confirmText || e(g)("common.confirm")), 3)
        ])
      ], 4)) : _("", !0)
    ]));
  }
}), la = /* @__PURE__ */ ne(aa, [["__scopeId", "data-v-cf51f05f"]]), oo = {
  activePopover: "none",
  isDescEditing: !1
};
class ra {
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
        return this._setState({ ...oo }), !0;
      default:
        return !1;
    }
  }
}
const da = {
  class: "reminder-picker",
  "aria-label": "设置本机提醒"
}, ca = { class: "reminder-shortcuts" }, ua = ["disabled"], pa = { class: "reminder-preview" }, ma = {
  key: 0,
  class: "reminder-error",
  role: "alert"
}, va = ["disabled"], fa = ["disabled"], ga = ["disabled"], ba = /* @__PURE__ */ Kt({
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
    const r = i, v = n, w = r.value || (r.taskDate ? r.taskDate + "T" + (r.taskTime || "09:00") : ""), x = M(w.slice(0, 10)), E = M(w.slice(11, 16)), L = M(!1), N = M(""), G = M(!0), T = tt(() => x.value && E.value ? (/* @__PURE__ */ new Date(x.value + "T" + E.value)).toLocaleString("zh-CN", { month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "2-digit", hour12: !0 }) : "");
    function V(R) {
      if (L.value) return;
      const D = /* @__PURE__ */ new Date();
      R === "tomorrow" ? (D.setDate(D.getDate() + 1), D.setHours(9, 0, 0, 0)) : D.setTime(D.getTime() + R * 6e4), x.value = `${D.getFullYear()}-${String(D.getMonth() + 1).padStart(2, "0")}-${String(D.getDate()).padStart(2, "0")}`, E.value = `${String(D.getHours()).padStart(2, "0")}:${String(D.getMinutes()).padStart(2, "0")}`, N.value = "", G.value = !0;
    }
    async function K(R) {
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
    return (R, D) => (l(), Et(Le, {
      anchor: i.anchor,
      onClose: D[9] || (D[9] = ($) => v("close"))
    }, {
      default: se(() => [
        t("section", da, [
          D[11] || (D[11] = t("header", null, [
            t("span", { class: "reminder-symbol" }, "♧"),
            t("div", null, [
              t("strong", null, "添加提醒"),
              t("small", null, "本机浏览器通知")
            ])
          ], -1)),
          t("div", ca, [
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
            Xt(Oe, {
              modelValue: x.value,
              "onUpdate:modelValue": D[3] || (D[3] = ($) => x.value = $),
              "time-value": E.value,
              "onUpdate:timeValue": D[4] || (D[4] = ($) => E.value = $),
              embedded: "",
              onTimeValidity: D[5] || (D[5] = ($) => G.value = $)
            }, null, 8, ["modelValue", "time-value"])
          ], 8, ua),
          t("div", pa, f(T.value || "选择提醒的日期和时间"), 1),
          D[12] || (D[12] = t("p", { class: "reminder-note" }, "仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。", -1)),
          N.value ? (l(), p("p", ma, f(N.value), 1)) : _("", !0),
          t("footer", null, [
            i.value ? (l(), p("button", {
              key: 0,
              type: "button",
              class: "remove",
              disabled: L.value || !!e(q).pendingWrites,
              onClick: D[6] || (D[6] = ($) => K(""))
            }, "移除提醒", 8, va)) : _("", !0),
            t("button", {
              type: "button",
              disabled: L.value,
              onClick: D[7] || (D[7] = ($) => v("close"))
            }, "取消", 8, fa),
            t("button", {
              type: "button",
              class: "save",
              disabled: L.value || !!e(q).pendingWrites || !x.value || !E.value || !G.value,
              onClick: D[8] || (D[8] = ($) => K(x.value + "T" + E.value))
            }, f(L.value ? "保存中…" : "设置提醒"), 9, ga)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor"]));
  }
}), ka = /* @__PURE__ */ ne(ba, [["__scopeId", "data-v-da9e3ddd"]]), ya = {
  key: 0,
  class: "inspector-body inspector-split-layout"
}, ha = { class: "inspector-main-col" }, wa = {
  key: 0,
  class: "draft-status",
  role: "alert"
}, Ta = {
  key: 1,
  class: "inspector-repo-badges"
}, Da = ["title", "onClick"], Ca = { class: "repo-badge-name" }, xa = { class: "inspector-section inspector-title-section" }, _a = { class: "task-title-row" }, Sa = ["title"], $a = {
  key: 0,
  class: "check-mark"
}, Ia = ["value", "aria-label", "disabled", "placeholder"], Pa = ["value", "placeholder", "disabled"], Ra = ["onKeydown"], La = {
  key: 0,
  class: "desc-placeholder-btn"
}, Oa = ["innerHTML"], Ea = {
  key: 2,
  role: "status"
}, Ma = {
  key: 3,
  class: "attached-img-grid"
}, Aa = ["onClick"], ja = ["src", "alt"], Wa = { class: "attached-img-info" }, Ua = ["onClick"], Ba = { class: "inspector-section inspector-subtasks-section" }, Va = {
  key: 0,
  class: "subtasks-list"
}, Na = ["onClick"], Ha = {
  key: 0,
  class: "check-tick"
}, za = { class: "subtask-content-text" }, Ka = ["title", "onClick"], Fa = {
  key: 1,
  class: "subtask-inline-input-wrap"
}, Ya = ["value", "placeholder"], Ga = { class: "subtask-actions" }, Xa = { class: "inspector-section inspector-comments-section" }, qa = { class: "comment-input-bar" }, Qa = { class: "comment-input-wrap" }, Ja = ["value", "placeholder", "disabled"], Za = ["title"], tl = ["disabled"], el = {
  key: 0,
  class: "comments-list"
}, ol = { class: "comment-item-content" }, sl = { class: "comment-item-header" }, nl = { class: "comment-time" }, il = { class: "comment-text" }, al = {
  key: 0,
  class: "comment-attached-thumb"
}, ll = ["src", "onClick"], rl = { class: "inspector-side-col" }, dl = { class: "side-prop-group date-picker-anchor" }, cl = { class: "row-text" }, ul = { class: "side-prop-group date-picker-anchor" }, pl = { class: "row-text" }, ml = ["title"], vl = { class: "side-prop-group" }, fl = { class: "side-prop-label" }, gl = { class: "row-text" }, bl = { class: "inspector-menu" }, kl = ["disabled", "onClick"], yl = { key: 0 }, hl = { class: "side-prop-group" }, wl = { class: "side-prop-label" }, Tl = { class: "row-text" }, Dl = { class: "inspector-menu" }, Cl = ["placeholder", "aria-label", "onKeydown"], xl = { key: 0 }, _l = {
  key: 1,
  role: "alert"
}, Sl = { class: "label-options-list" }, $l = ["checked", "disabled", "onChange"], Il = ["disabled"], Pl = { key: 3 }, Rl = { class: "side-prop-group" }, Ll = { class: "side-prop-label" }, Ol = { class: "row-text" }, El = /* @__PURE__ */ Kt({
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
    const r = i, v = n, w = new ra(), x = qo(w), E = tt(() => x.value.isDescEditing), L = tt(() => x.value.activePopover === "start_date"), N = tt(() => x.value.activePopover === "due_date"), G = tt(() => x.value.activePopover === "priority"), T = tt(() => x.value.activePopover === "labels"), V = tt(() => x.value.activePopover === "reminder"), K = M(null), R = M(null);
    let D;
    oe(() => {
      Go();
      let j = -1;
      D = new ResizeObserver((u) => {
        const b = u[0]?.contentRect.width;
        b !== j && (j = b, I(R.value), I(K.value));
      }), R.value?.parentElement && D.observe(R.value.parentElement);
    }), Mt(() => {
      D?.disconnect(), w.send({ type: "RESET_ALL" });
    });
    const $ = tt(() => {
      if (!r.editDescription) return "";
      const j = r.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), u = document.createElement("template");
      u.innerHTML = Qo.renderMarkdown(j);
      const b = /* @__PURE__ */ new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
      for (const Z of Array.from(u.content.querySelectorAll("*"))) {
        if (!b.has(Z.tagName)) {
          Z.replaceWith(document.createTextNode(Z.textContent || ""));
          continue;
        }
        const $t = Z.tagName === "A" ? Z.getAttribute("href") : null;
        for (const Ut of Array.from(Z.attributes)) Z.removeAttribute(Ut.name);
        $t && /^(https?:\/\/|mailto:)/i.test($t) && (Z.setAttribute("href", $t), Z.setAttribute("target", "_blank"), Z.setAttribute("rel", "noopener noreferrer"));
      }
      return u.innerHTML;
    });
    function h() {
      w.send({ type: "START_DESC_EDIT" }), It(() => {
        I(K.value), K.value?.focus();
      });
    }
    function I(j) {
      j && (j.style.height = "auto", j.style.height = j.scrollHeight + "px");
    }
    function H(j) {
      I(j.el);
    }
    function Q(j) {
      const u = j.target;
      I(u), v("update:editDescription", u.value), v("scheduleDraftSave", j);
    }
    function F(j) {
      Ee(j) || (co(j) ? (j.preventDefault(), v("confirmAddSubtask")) : j.key === "Escape" && (j.preventDefault(), v("update:isAddingSubtask", !1)));
    }
    function ft() {
      v("saveTitleAndDesc"), w.send({ type: "FINISH_DESC_EDIT" });
    }
    const at = M(null), B = M(null), P = M(""), kt = M(null), yt = M(null), m = M(null), A = M([]), d = M(!1), et = M("");
    let Y;
    ct(() => [r.state.taskId, T.value], async (j, u, b) => {
      if (Y?.abort(), !T.value) return;
      const Z = new AbortController();
      Y = Z, b(() => Z.abort()), A.value = [], d.value = !0, et.value = "";
      try {
        const $t = await lt.getLabels(Z.signal);
        Z.signal.aborted || (A.value = $t.map((Ut) => Ut.name));
      } catch {
        Z.signal.aborted || (et.value = "标签库读取失败，仍可查看本页标签。");
      } finally {
        Z.signal.aborted || (d.value = !1);
      }
    });
    function W() {
      w.send({ type: "OPEN_POPOVER", popover: "reminder" });
    }
    const X = [
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
    function xt(j) {
      w.send({ type: "CLOSE_POPOVER" }), v("selectPriority", j);
    }
    const nt = tt(() => {
      const j = /* @__PURE__ */ new Set([...A.value, ...r.availableLabels || []]);
      for (const u of r.state.labels || []) j.add(u);
      return Array.from(j);
    }), mt = tt(() => {
      const j = P.value.trim().toLowerCase();
      return j ? nt.value.filter((u) => u.toLowerCase().includes(j)) : nt.value;
    });
    function At() {
      const j = P.value.trim();
      j && (v("createLabel", j), P.value = "");
    }
    function Qt(j, u) {
      Me.open(j, u);
    }
    const Jt = M(0);
    function vt() {
      Jt.value++;
    }
    oe(() => {
      window.addEventListener("storage", vt), window.addEventListener("todoist-repository-links-changed", vt);
    }), Mt(() => {
      window.removeEventListener("storage", vt), window.removeEventListener("todoist-repository-links-changed", vt);
    });
    const jt = tt(() => (Jt.value, io(r.state.taskId, r.editDescription)));
    function Ht(j) {
      ao.open(j);
    }
    function Ft(j, u) {
      if (!j) return "";
      try {
        const b = j.split("-"), Z = parseInt(b[1], 10), $t = parseInt(b[2], 10), Ut = u ? ` ${u}` : "";
        return `${Z}月${$t}日${Ut}`;
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
    function ut(j) {
      if (!j) return "刚刚";
      try {
        const u = new Date(j);
        return `${u.getMonth() + 1}月${u.getDate()}日 ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`;
      } catch {
        return j;
      }
    }
    return (j, u) => i.state.isOpen ? (l(), p("div", ya, [
      t("main", ha, [
        i.state.error ? (l(), p("p", wa, f(i.state.error), 1)) : _("", !0),
        jt.value.length ? (l(), p("div", Ta, [
          (l(!0), p(it, null, dt(jt.value, (b) => (l(), p("button", {
            key: b.fullName,
            type: "button",
            class: "inspector-repo-btn",
            title: e(g)("todoist.linkRepoTitle", { name: b.fullName }),
            onClick: (Z) => Ht(b.fullName)
          }, [
            u[36] || (u[36] = t("span", { class: "repo-badge-icon" }, "🐙", -1)),
            t("span", Ca, f(b.fullName), 1),
            u[37] || (u[37] = t("span", { class: "repo-badge-jump" }, "↗", -1))
          ], 8, Da))), 128))
        ])) : _("", !0),
        t("section", xa, [
          t("div", _a, [
            t("button", {
              type: "button",
              class: J(["task-complete-circle-btn", { completed: i.isTaskCompleted }]),
              title: e(g)("todoist.toggleComplete"),
              onClick: u[0] || (u[0] = (b) => v("toggleComplete"))
            }, [
              i.isTaskCompleted ? (l(), p("span", $a, "✓")) : _("", !0)
            ], 10, Sa),
            t("textarea", {
              value: i.editTitle,
              rows: "1",
              "aria-label": e(g)("todoist.taskTitle"),
              onVnodeMounted: H,
              onVnodeUpdated: H,
              disabled: i.isUploadingImg,
              ref_key: "titleTextareaRef",
              ref: R,
              class: J(["inspector-input-title", { "title-done": i.isTaskCompleted }]),
              placeholder: e(g)("todoist.taskTitle"),
              onInput: u[1] || (u[1] = (b) => {
                I(b.target), v("update:editTitle", b.target.value), v("scheduleDraftSave", b);
              }),
              onCompositionend: u[2] || (u[2] = (b) => v("scheduleDraftSave", b)),
              onBlur: u[3] || (u[3] = (b) => v("saveTitleAndDesc", b)),
              onKeydown: u[4] || (u[4] = Ot(z((b) => v("saveTitleAndDesc", b), ["prevent"]), ["enter"]))
            }, null, 42, Ia)
          ])
        ]),
        t("section", {
          class: "inspector-section inspector-desc-section",
          onDragover: u[7] || (u[7] = z((b) => v("dragover"), ["prevent"])),
          onDragleave: u[8] || (u[8] = z((b) => v("dragleave"), ["prevent"])),
          onDrop: u[9] || (u[9] = z((b) => v("dropImage", b), ["prevent"]))
        }, [
          E.value ? (l(), p("textarea", {
            key: 0,
            ref_key: "descTextareaRef",
            ref: K,
            value: i.editDescription,
            class: "desc-inline-editor",
            rows: "1",
            placeholder: e(g)("todoist.taskDesc"),
            disabled: i.isUploadingImg,
            onInput: Q,
            onCompositionend: u[5] || (u[5] = (b) => v("scheduleDraftSave", b)),
            onBlur: ft,
            onPaste: u[6] || (u[6] = (b) => v("descPaste", b))
          }, null, 40, Pa)) : (l(), p("div", {
            key: 1,
            class: "desc-display-mode",
            role: "button",
            tabindex: "0",
            "aria-label": "编辑描述",
            onClick: h,
            onKeydown: Ot(z(h, ["prevent"]), ["enter"])
          }, [
            i.editDescription ? (l(), p("div", {
              key: 1,
              class: "rendered-markdown",
              innerHTML: $.value
            }, null, 8, Oa)) : (l(), p("span", La, "≡ 描述"))
          ], 40, Ra)),
          i.isUploadingImg ? (l(), p("small", Ea, "图片上传中…")) : _("", !0),
          i.attachedImages.length ? (l(), p("div", Ma, [
            (l(!0), p(it, null, dt(i.attachedImages, (b) => (l(), p("div", {
              key: b.url,
              class: "attached-img-card"
            }, [
              t("button", {
                type: "button",
                class: "attached-img-link",
                onClick: (Z) => Qt(b.url, b.name)
              }, [
                t("img", {
                  src: b.url,
                  alt: b.name,
                  loading: "lazy"
                }, null, 8, ja)
              ], 8, Aa),
              t("div", Wa, [
                t("span", null, f(b.name), 1),
                t("button", {
                  type: "button",
                  title: "移除图片",
                  onClick: (Z) => v("removeAttachedImage", b.url)
                }, "×", 8, Ua)
              ])
            ]))), 128))
          ])) : _("", !0)
        ], 32),
        t("section", Ba, [
          i.subtasks.length > 0 ? (l(), p("div", Va, [
            (l(!0), p(it, null, dt(i.subtasks, (b) => (l(), p("div", {
              key: b.id,
              class: J(["subtask-row-item", { done: b.completed }])
            }, [
              t("button", {
                type: "button",
                class: J(["subtask-check-circle", { checked: b.completed }]),
                onClick: (Z) => v("toggleSubtask", b.id)
              }, [
                b.completed ? (l(), p("span", Ha, "✓")) : _("", !0)
              ], 10, Na),
              t("span", za, f(b.text), 1),
              t("button", {
                type: "button",
                class: "subtask-del-btn",
                title: e(g)("todoist.subtask.delete"),
                onClick: (Z) => v("removeSubtask", b.id)
              }, "×", 8, Ka)
            ], 2))), 128))
          ])) : _("", !0),
          i.isAddingSubtask ? (l(), p("div", Fa, [
            t("input", {
              value: i.newSubtaskText,
              type: "text",
              class: "subtask-input-field",
              placeholder: e(g)("todoist.subtask.inputPlaceholder"),
              onInput: u[10] || (u[10] = (b) => v("update:newSubtaskText", b.target.value)),
              onKeydown: F
            }, null, 40, Ya),
            t("div", Ga, [
              t("button", {
                type: "button",
                class: "btn-subtask-ok",
                onClick: u[11] || (u[11] = (b) => v("confirmAddSubtask"))
              }, f(e(g)("common.add")), 1),
              t("button", {
                type: "button",
                class: "btn-subtask-cancel",
                onClick: u[12] || (u[12] = (b) => v("update:isAddingSubtask", !1))
              }, f(e(g)("common.cancel")), 1)
            ])
          ])) : (l(), p("button", {
            key: 2,
            type: "button",
            class: "inspector-add-subtask-btn",
            onClick: u[13] || (u[13] = (b) => v("update:isAddingSubtask", !0))
          }, [
            u[38] || (u[38] = t("span", { class: "subtask-plus-icon" }, "＋", -1)),
            Nt(" " + f(e(g)("todoist.subtask.add")), 1)
          ]))
        ]),
        (l(), Et(zo, {
          key: i.state.taskId,
          "task-id": i.state.taskId,
          description: i.editDescription,
          title: i.editTitle
        }, null, 8, ["task-id", "description", "title"])),
        t("section", Xa, [
          t("div", qa, [
            u[39] || (u[39] = t("div", { class: "comment-avatar" }, "💬", -1)),
            t("div", Qa, [
              t("input", {
                value: i.newCommentText,
                type: "text",
                class: "comment-input-field",
                placeholder: e(g)("todoist.comment.placeholder"),
                disabled: i.isSubmittingComment,
                onInput: u[14] || (u[14] = (b) => v("update:newCommentText", b.target.value)),
                onKeydown: u[15] || (u[15] = Ot(z((b) => v("submitComment"), ["prevent"]), ["enter"]))
              }, null, 40, Ja),
              t("button", {
                type: "button",
                class: "comment-clip-btn",
                title: e(g)("todoist.comment.attachPhoto"),
                onClick: u[16] || (u[16] = z((b) => v("triggerFileInput"), ["stop"]))
              }, "📎", 8, Za)
            ]),
            i.newCommentText.trim() ? (l(), p("button", {
              key: 0,
              type: "button",
              class: "comment-submit-btn",
              disabled: i.isSubmittingComment,
              onClick: u[17] || (u[17] = (b) => v("submitComment"))
            }, f(e(g)("todoist.comment.send")), 9, tl)) : _("", !0)
          ]),
          i.state.comments.length > 0 ? (l(), p("div", el, [
            (l(!0), p(it, null, dt(i.state.comments, (b) => (l(), p("div", {
              key: b.id,
              class: "comment-item"
            }, [
              u[41] || (u[41] = t("div", { class: "comment-item-avatar" }, "👤", -1)),
              t("div", ol, [
                t("div", sl, [
                  u[40] || (u[40] = t("span", { class: "comment-author" }, "我", -1)),
                  t("span", nl, f(ut(b.postedAt)), 1)
                ]),
                t("div", il, f(b.content), 1),
                b.attachment?.url ? (l(), p("div", al, [
                  t("img", {
                    src: b.attachment.url,
                    alt: "评论图片",
                    class: "comment-thumb-img",
                    onClick: (Z) => Qt(b.attachment.url, b.attachment.name)
                  }, null, 8, ll)
                ])) : _("", !0)
              ])
            ]))), 128))
          ])) : _("", !0)
        ])
      ]),
      t("aside", rl, [
        t("div", dl, [
          u[43] || (u[43] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "日期")
          ], -1)),
          t("button", {
            ref_key: "startDateBtnRef",
            ref: at,
            type: "button",
            class: J(["side-item-row click-row", { active: L.value, filled: !!i.editStartDate }]),
            onClick: u[19] || (u[19] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "start_date" }))
          }, [
            u[42] || (u[42] = t("span", { class: "row-icon" }, "📅", -1)),
            t("span", cl, f(Ft(i.editStartDate, i.editStartTime) || "安排日期"), 1),
            i.editStartDate ? (l(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: "清除日期",
              onClick: u[18] || (u[18] = z((b) => v("clearStartDate"), ["stop"]))
            }, "×")) : _("", !0)
          ], 2),
          L.value ? (l(), Et(Oe, {
            key: 0,
            "model-value": i.editStartDate,
            "time-value": i.editStartTime,
            "anchor-el": at.value,
            "onUpdate:modelValue": u[20] || (u[20] = (b) => v("update:editStartDate", b)),
            "onUpdate:timeValue": u[21] || (u[21] = (b) => v("update:editStartTime", b)),
            onChange: u[22] || (u[22] = (b) => v("startChange")),
            onClose: u[23] || (u[23] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", ul, [
          u[45] || (u[45] = t("div", { class: "side-prop-header" }, [
            t("span", { class: "side-prop-label" }, "截止期限")
          ], -1)),
          t("button", {
            ref_key: "dueDateBtnRef",
            ref: B,
            type: "button",
            class: J(["side-item-row click-row", { active: N.value, filled: !!i.editDueDate }]),
            onClick: u[25] || (u[25] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "due_date" }))
          }, [
            u[44] || (u[44] = t("span", { class: "row-icon" }, "▣", -1)),
            t("span", pl, f(Ft(i.editDueDate, i.editDueTime) || e(g)("todoist.prop.setDueDate")), 1),
            i.editDueDate ? (l(), p("span", {
              key: 0,
              class: "row-clear-btn",
              title: e(g)("todoist.prop.clearDueDate"),
              onClick: u[24] || (u[24] = z((b) => v("clearDueDate"), ["stop"]))
            }, "×", 8, ml)) : _("", !0)
          ], 2),
          N.value ? (l(), Et(Oe, {
            key: 0,
            "model-value": i.editDueDate,
            "time-value": i.editDueTime,
            "anchor-el": B.value,
            "onUpdate:modelValue": u[26] || (u[26] = (b) => v("update:editDueDate", b)),
            "onUpdate:timeValue": u[27] || (u[27] = (b) => v("update:editDueTime", b)),
            onChange: u[28] || (u[28] = (b) => v("dueChange")),
            onClose: u[29] || (u[29] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["model-value", "time-value", "anchor-el"])) : _("", !0)
        ]),
        t("div", vl, [
          t("span", fl, f(e(g)("todoist.prop.priority")), 1),
          t("button", {
            ref_key: "priorityBtnRef",
            ref: m,
            type: "button",
            class: "side-item-row",
            onClick: u[30] || (u[30] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "priority" }))
          }, [
            t("span", {
              style: bt({ color: pt(i.state.priority) })
            }, "⚑", 4),
            t("span", gl, "P" + f(5 - i.state.priority), 1),
            u[46] || (u[46] = t("span", null, "⌄", -1))
          ], 512),
          G.value ? (l(), Et(Le, {
            key: 0,
            anchor: m.value,
            onClose: u[31] || (u[31] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: se(() => [
              t("div", bl, [
                (l(), p(it, null, dt(X, (b) => t("button", {
                  key: b.level,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: (Z) => xt(b.level)
                }, [
                  t("span", {
                    style: bt({ color: b.color })
                  }, "⚑", 4),
                  Nt(" " + f(b.name) + " ", 1),
                  i.state.priority === b.level ? (l(), p("span", yl, "✓")) : _("", !0)
                ], 8, kl)), 64))
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", hl, [
          t("span", wl, f(e(g)("todoist.prop.labels")), 1),
          t("button", {
            ref_key: "labelsBtnRef",
            ref: kt,
            type: "button",
            class: "side-item-row",
            onClick: u[32] || (u[32] = (b) => e(w).send({ type: "TOGGLE_POPOVER", popover: "labels" }))
          }, [
            t("span", Tl, f(i.state.labels.join("、") || e(g)("todoist.prop.addLabels")), 1),
            u[47] || (u[47] = t("span", null, "＋", -1))
          ], 512),
          T.value ? (l(), Et(Le, {
            key: 0,
            anchor: kt.value,
            onClose: u[34] || (u[34] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, {
            default: se(() => [
              t("div", Dl, [
                Lt(t("input", {
                  "onUpdate:modelValue": u[33] || (u[33] = (b) => P.value = b),
                  placeholder: e(g)("todoist.prop.searchOrCreateLabel"),
                  "aria-label": e(g)("todoist.prop.searchLabelAria"),
                  onKeydown: Ot(z(At, ["prevent"]), ["enter"])
                }, null, 40, Cl), [
                  [Gt, P.value]
                ]),
                d.value ? (l(), p("small", xl, f(e(g)("todoist.prop.readingLabels")), 1)) : _("", !0),
                et.value ? (l(), p("p", _l, f(et.value), 1)) : _("", !0),
                t("div", Sl, [
                  (l(!0), p(it, null, dt(mt.value, (b) => (l(), p("label", {
                    key: b,
                    class: "label-option-row"
                  }, [
                    t("span", null, "◇ " + f(b), 1),
                    t("input", {
                      type: "checkbox",
                      checked: i.state.labels.includes(b),
                      disabled: !!e(q).pendingWrites,
                      onChange: (Z) => v("toggleLabelSelect", b)
                    }, null, 40, $l)
                  ]))), 128))
                ]),
                P.value.trim() && !nt.value.includes(P.value.trim()) ? (l(), p("button", {
                  key: 2,
                  type: "button",
                  disabled: !!e(q).pendingWrites,
                  onClick: At
                }, f(e(g)("todoist.prop.createLabelBtn", { name: P.value.trim() })), 9, Il)) : _("", !0),
                !d.value && !mt.value.length && !P.value ? (l(), p("small", Pl, f(e(g)("todoist.prop.noLabels")), 1)) : _("", !0)
              ])
            ]),
            _: 1
          }, 8, ["anchor"])) : _("", !0)
        ]),
        t("div", Rl, [
          t("span", Ll, [
            Nt(f(e(g)("todoist.prop.reminder")) + " ", 1),
            t("small", null, f(e(g)("todoist.prop.localOnly")), 1)
          ]),
          t("button", {
            ref_key: "reminderBtnRef",
            ref: yt,
            type: "button",
            class: "side-item-row",
            onClick: W
          }, [
            t("span", Ol, f(Wt(i.state.reminderTime) || e(g)("todoist.prop.addReminder")), 1),
            u[48] || (u[48] = t("span", null, "＋", -1))
          ], 512),
          V.value ? (l(), Et(ka, {
            key: 0,
            anchor: yt.value,
            "task-id": i.state.taskId,
            value: i.state.reminderTime,
            "task-date": i.editStartDate || i.editDueDate,
            "task-time": i.editStartTime || i.editDueTime,
            onClose: u[35] || (u[35] = (b) => e(w).send({ type: "CLOSE_POPOVER" }))
          }, null, 8, ["anchor", "task-id", "value", "task-date", "task-time"])) : _("", !0)
        ])
      ])
    ])) : _("", !0);
  }
}), Ml = /* @__PURE__ */ ne(El, [["__scopeId", "data-v-cad8ec6c"]]), Al = { class: "inspector-title-row" }, jl = ["title", "aria-label"], Wl = ["disabled"], Ul = ["href"], Bl = "todoistInspectorPositionV2", Vl = /* @__PURE__ */ Kt({
  __name: "TodoistInspectorDrawer",
  setup(i) {
    const n = y, r = tt(() => Rt.get(n.taskId)), v = tt(() => r.value?.status === "failed" ? "保存未确认" : r.value?.status === "saving" ? "正在保存…" : T.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), w = tt(() => [
      v.value,
      r.value?.status === "failed" ? r.value.error : "",
      "刷新或关闭浏览器标签页会丢失未保存草稿。"
    ].filter(Boolean).join("；")), {
      panelRef: x,
      headerRef: E,
      initialStyle: L,
      onHeaderPointerDown: N,
      onResizePointerDown: G
    } = no({
      windowId: "todoist-inspector",
      storageKey: Bl,
      defaultWidth: 720,
      defaultHeight: 480,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 760) : 700,
      defaultTop: 76,
      minWidth: 340,
      minHeight: 300,
      active: () => n.isOpen && q.active
    }), T = M(""), V = M(""), K = M(""), R = M(""), D = M(""), $ = M(""), h = M("idle"), I = tt(() => h.value === "uploading_img"), H = tt(() => h.value === "submitting_comment"), Q = M(!1), F = M(null), ft = M(!1), at = M(""), B = M(""), P = tt(() => {
      const C = n.description || "", k = [], S = C.split(`
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
    }), kt = tt(() => P.value.filter((C) => C.completed).length);
    function yt(C) {
      const gt = (n.description || "").split(`
`).filter((zt) => !zt.match(/^\s*-\s*\[([ xX])\]/)), _t = C.map((zt) => `- [${zt.completed ? "x" : " "}] ${zt.text}`), ht = [...gt, ..._t].join(`
`).trim();
      V.value = ht.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim(), rt.saveTitleAndDesc(T.value, ht);
    }
    function m() {
      if (!at.value.trim()) return;
      const C = [...P.value, {
        id: `st_${Date.now()}`,
        text: at.value.trim(),
        completed: !1
      }];
      at.value = "", ft.value = !1, yt(C);
    }
    function A(C) {
      const k = P.value.map((S) => S.id === C ? { ...S, completed: !S.completed } : S);
      yt(k);
    }
    function d(C) {
      const k = P.value.filter((S) => S.id !== C);
      yt(k);
    }
    const et = tt(() => {
      for (const C of Tt.columns || []) {
        const k = C.tasks.find((S) => S.id === n.taskId);
        if (k) return !!k.completed;
      }
      return !1;
    });
    async function Y() {
      for (const C of Tt.columns || []) {
        const k = C.tasks.find((S) => S.id === n.taskId);
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
    function W(C) {
      rt.setPriority(C);
    }
    function X(C) {
      rt.toggleLabel(C);
    }
    function pt(C) {
      rt.toggleLabel(C);
    }
    async function xt(C) {
      C.trim() && (n.labels.includes(C.trim()) || await rt.createAndAttachLabel(C.trim()));
    }
    async function nt() {
      if (!B.value.trim() || h.value !== "idle") return;
      const C = B.value.trim();
      h.value = "submitting_comment";
      try {
        await rt.addComment(C), B.value = "";
      } finally {
        h.value = "idle";
      }
    }
    ct(() => n.title, (C) => {
      T.value = C || "";
    }, { immediate: !0 }), ct(() => n.description, (C) => {
      V.value = (C || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), ct(() => n.startDate, (C) => {
      K.value = C || "";
    }, { immediate: !0 }), ct(() => n.startTime, (C) => {
      R.value = C || "";
    }, { immediate: !0 }), ct(() => n.dueDate, (C) => {
      D.value = C || "";
    }, { immediate: !0 }), ct(() => n.dueTime, (C) => {
      $.value = C || "";
    }, { immediate: !0 });
    function mt() {
      const C = /* @__PURE__ */ new Date();
      return `${C.getFullYear()}-${String(C.getMonth() + 1).padStart(2, "0")}-${String(C.getDate()).padStart(2, "0")}`;
    }
    function At() {
      R.value && !K.value && (K.value = mt()), rt.setStartDateAndTime(K.value, R.value);
    }
    function Qt() {
      R.value = "", At();
    }
    function Jt() {
      K.value = "", R.value = "", At();
    }
    function vt() {
      $.value && !D.value && (D.value = mt()), rt.setDueDateAndTime(D.value, $.value);
    }
    function jt() {
      $.value = "", vt();
    }
    function Ht() {
      D.value = "", $.value = "", vt();
    }
    const Ft = tt(() => {
      const C = [], k = /* @__PURE__ */ new Set(), S = n.description || "", gt = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let _t;
      for (; (_t = gt.exec(S)) !== null; ) {
        const ht = _t[2];
        k.add(ht), C.push({
          name: _t[1] || "任务照片",
          url: ht
        });
      }
      for (const ht of n.commentAttachments || [])
        k.has(ht.url) || (k.add(ht.url), C.push(ht));
      return C;
    });
    let Wt, ut;
    function j() {
      const C = (n.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`), k = [V.value.trim(), C].filter(Boolean);
      return {
        taskId: n.taskId,
        title: T.value,
        description: k.join(`

`)
      };
    }
    function u() {
      clearTimeout(Wt), Wt = void 0;
      const C = ut;
      if (ut = void 0, C?.taskId && C.title.trim())
        return rt.saveTitleAndDesc(C.title, C.description, C.taskId);
    }
    function b(C) {
      C && "isComposing" in C && C.isComposing || (ut = j(), rt.stageTitleDraft(ut.taskId, ut.title, ut.description), clearTimeout(Wt), Wt = setTimeout(u, 800));
    }
    ct(() => n.taskId, () => u(), { flush: "sync" });
    function Z() {
      u(), rt.close();
    }
    function $t(C) {
      C && "isComposing" in C && C.isComposing || u();
    }
    function Ut() {
      ut = j(), u();
    }
    function ge(C) {
      const k = ie(C);
      k && (C.preventDefault(), C.stopPropagation(), Bt(k));
    }
    function be() {
      q.active && F.value?.click();
    }
    async function ke(C) {
      const k = C.target;
      if (!q.active) {
        k.value = "";
        return;
      }
      const S = k.files?.[0];
      S && await Bt(S), k.value = "";
    }
    async function ye(C) {
      Q.value = !1;
      const k = C.dataTransfer?.files?.[0];
      k && (k.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(k.name)) && await Bt(k);
    }
    function ie(C) {
      const k = C.clipboardData;
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
    async function Bt(C) {
      if (h.value !== "idle" || !q.active || !n.taskId) return;
      const k = n.taskId;
      h.value = "uploading_img";
      try {
        if (await u(), n.taskId !== k || !n.isOpen || !q.active) return;
        await rt.attachImageToTask(C);
      } catch (S) {
        n.taskId === k && (n.error = S instanceof Error ? S.message : "上传失败");
      } finally {
        h.value = "idle";
      }
    }
    function he(C) {
      const k = ie(C);
      k && (C.preventDefault(), Bt(k));
    }
    function ae(C) {
      if (!n.isOpen || !q.active) return;
      const k = ie(C);
      k && (C.preventDefault(), C.stopPropagation(), Bt(k));
    }
    ct(() => q.active, (C) => {
      window.removeEventListener("paste", ae, { capture: !0 }), C && window.addEventListener("paste", ae, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), Mt(() => {
      u(), window.removeEventListener("paste", ae, { capture: !0 });
    });
    async function we(C) {
      const k = n.description || "", S = C.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), gt = k.replace(new RegExp(`!\\[[^\\]]*\\]\\(${S}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(n.title, gt);
    }
    return (C, k) => Lt((l(), p("aside", {
      ref_key: "panelRef",
      ref: x,
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
        t("div", Al, [
          k[18] || (k[18] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          r.value ? (l(), p("div", {
            key: 0,
            class: "inspector-save-status no-drag",
            onPointerdown: k[0] || (k[0] = z(() => {
            }, ["stop"]))
          }, [
            t("span", {
              class: "inspector-save-text",
              role: "status",
              "aria-live": "polite",
              title: w.value,
              "aria-label": w.value
            }, f(v.value), 9, jl),
            r.value.status !== "saving" ? (l(), p("button", {
              key: 0,
              type: "button",
              disabled: e(n).saving || !T.value.trim(),
              onClick: z(Ut, ["stop"])
            }, f(r.value.status === "failed" ? "重试保存" : "保存草稿"), 9, Wl)) : _("", !0)
          ], 32)) : _("", !0),
          e(n).url ? (l(), p("a", {
            key: 1,
            href: e(n).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Ul)) : _("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: k[1] || (k[1] = z(() => {
          }, ["stop"])),
          onClick: z(Z, ["stop"])
        }, "×", 32)
      ], 544),
      e(n).isOpen ? (l(), Et(Ml, {
        key: e(n).taskId,
        state: e(n),
        "edit-title": T.value,
        "onUpdate:editTitle": k[3] || (k[3] = (S) => T.value = S),
        "edit-description": V.value,
        "onUpdate:editDescription": k[4] || (k[4] = (S) => V.value = S),
        "edit-start-date": K.value,
        "onUpdate:editStartDate": k[5] || (k[5] = (S) => K.value = S),
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
        "is-submitting-comment": H.value,
        "attached-images": Ft.value,
        "available-labels": e(Tt).availableLabels || [],
        onScheduleDraftSave: b,
        onSaveTitleAndDesc: $t,
        onToggleComplete: Y,
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
        onStartChange: At,
        onClearStartDate: Jt,
        onClearStartTime: Qt,
        onDueChange: vt,
        onClearDueDate: Ht,
        onClearDueTime: jt,
        onSelectPriority: W,
        onToggleLabelSelect: X,
        onRemoveLabel: pt,
        onCreateLabel: xt
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
        onPointerdown: k[14] || (k[14] = (S) => e(G)(S, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: k[15] || (k[15] = (S) => e(G)(S, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: k[16] || (k[16] = (S) => e(G)(S, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: k[17] || (k[17] = (S) => e(G)(S, "w"))
      }, null, 32)
    ], 36)), [
      [Re, e(n).isOpen]
    ]);
  }
}), Nl = /* @__PURE__ */ ne(Vl, [["__scopeId", "data-v-23532e72"]]), Hl = { class: "vue-todoist-workspace-wrapper" }, zl = ["aria-label"], Kl = { class: "todoist-head-title-wrap" }, Fl = { id: "todoist-workspace-title" }, Yl = ["aria-label"], Gl = ["title"], Xl = {
  class: "muted small",
  role: "status"
}, ql = ["title", "aria-expanded"], Ql = ["title"], Jl = ["title"], Zl = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, tr = { class: "todoist-workspace-cal-area" }, er = { class: "todoist-workspace-task-area" }, or = "todoistWorkspacePosition", Dr = /* @__PURE__ */ Kt({
  __name: "TodoistWorkspace",
  props: {
    embedded: { type: Boolean, default: !1 }
  },
  setup(i) {
    const { style: n, media: r } = Jo("todoist"), v = i, w = M(!1), x = So(() => import("./TodoistAccountSettings-D2gMw5S3.js")), E = M(!1), L = M(!1), N = M(!document.hidden), G = M(!1), T = tt(() => q.visible && N.value);
    q.session++, q.active = T.value, ro(
      () => T.value && !Tt.movingTaskId,
      ee,
      () => ot.loadWorkspace(void 0, void 0, !0)
    );
    let V = !1;
    const K = M(null), R = Eo;
    function D() {
      $.value && ($.value.style.removeProperty("width"), $.value.style.removeProperty("height"), $.value.style.removeProperty("left"), $.value.style.removeProperty("top"), $.value.style.removeProperty("right"), $.value.style.removeProperty("bottom"), $.value.style.removeProperty("margin"), $.value.style.removeProperty("transform"));
    }
    ct(() => q.visible, (Y) => {
      Y && (R.isOpen = !0, q.active = N.value, ot.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: $,
      headerRef: h,
      initialStyle: I,
      stopInteractions: H,
      onHeaderPointerDown: Q,
      onResizePointerDown: F,
      bringToFront: ft
    } = no({
      windowId: "todoist",
      storageKey: or,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => T.value
    }), at = () => $.value;
    function B() {
      ee(), Mo(), Ao(), rt.cancelReads(), H(), window.removeEventListener("keydown", yt);
    }
    const P = Po(B);
    function kt() {
      N.value = !document.hidden;
    }
    function yt(Y) {
      Y.key === "Escape" && y.isOpen && (Y.preventDefault(), Y.stopPropagation(), rt.close());
    }
    ct(T, (Y) => {
      q.active = Y, Y ? (window.addEventListener("keydown", yt), V || (V = !0, ot.loadWorkspace()), It(() => {
        T.value && ft();
      })) : B();
    }, { flush: "sync" }), ct(E, (Y) => {
      Y && (L.value = !0);
    }), ct([T, w, Qe], ([Y, W, X]) => {
      if (!(!Y || !W || !X) && (Qe.value = null, jo("todoist") === X.transition)) {
        if (q.pendingWrites || y.isOpen && y.taskId !== X.id) {
          Xo.show({ appName: "Todoist", title: g("todoist.retainDetailTitle"), message: g("todoist.retainDetailMsg"), showActions: !1 });
          return;
        }
        y.isOpen && y.taskId === X.id || rt.openTask(X.id);
      }
    }, { flush: "post" }), oe(() => {
      w.value = !0, G.value && It(D), pe.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: at }), document.addEventListener("visibilitychange", kt), T.value && (window.addEventListener("keydown", yt), V || (V = !0, ot.loadWorkspace()), Ge.refresh());
    }), Mt(() => {
      Ro(), P(), document.removeEventListener("visibilitychange", kt), pe.unregister("todoist", at), rt.close(), Object.assign(y, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), ot.updateState({ loading: !1, addingSection: !1, activeComposerSectionId: null }), Xe.updateState({ title: g("todoist.inbox"), isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), Ge.update([]);
    });
    function m() {
      Xe.toggleCalendar();
    }
    function A() {
      ot.updateState({ accountConfigured: !0 }), T.value && ot.loadWorkspace(void 0, void 0, !0);
    }
    function d() {
      pe.minimize("todoist");
    }
    function et() {
      q.visible = !1, R.isOpen = !1, pe.close("todoist");
    }
    return (Y, W) => (l(), p("div", Hl, [
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
          onPointerdown: W[4] || (W[4] = (X) => !v.embedded && e(Q)(X))
        }, [
          t("div", Kl, [
            W[10] || (W[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Fl, f(e(R).title), 1)
          ]),
          t("nav", {
            id: "todoist-view-tabs",
            class: "todoist-view-tabs",
            "aria-label": e(g)("todoist.viewAria")
          }, [
            Xt(ns)
          ], 8, Yl),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: J(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: e(R).isCalendarOpen }]),
            type: "button",
            title: e(g)("todoist.calendarToggleTitle"),
            onClick: m
          }, " 📅 " + f(e(g)("todoist.calendar")), 11, Gl),
          W[11] || (W[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Xl, f(e(q).pendingWrites ? e(g)("todoist.pendingWrites") : e(g)("todoist.idleStatus")), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: K,
            type: "button",
            class: "no-drag",
            title: e(g)("todoist.settingsTitle"),
            "aria-expanded": E.value,
            onClick: W[0] || (W[0] = z((X) => E.value = !E.value, ["stop"]))
          }, " ⚙️ ", 8, ql),
          L.value ? (l(), Et(e(x), {
            key: 0,
            visible: T.value && E.value,
            anchor: K.value,
            onClose: W[1] || (W[1] = (X) => E.value = !1),
            onAccountSaved: A
          }, null, 8, ["visible", "anchor"])) : _("", !0),
          v.embedded ? _("", !0) : (l(), p("button", {
            key: 1,
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: e(g)("todoist.minimizeHint"),
            onPointerdown: W[2] || (W[2] = z(() => {
            }, ["stop"])),
            onClick: z(d, ["stop"])
          }, " − ", 40, Ql)),
          v.embedded ? _("", !0) : (l(), p("button", {
            key: 2,
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: e(g)("todoist.closeHint"),
            onPointerdown: W[3] || (W[3] = z(() => {
            }, ["stop"])),
            onClick: z(et, ["stop"])
          }, " ✕ ", 40, Jl))
        ], 544),
        e(Tt).accountConfigured === !1 ? (l(), Et(Wo, {
          key: 0,
          icon: "✅",
          title: e(g)("todoist.tokenMissingTitle"),
          description: e(g)("todoist.tokenMissingDesc"),
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": e(g)("todoist.getToken"),
          onConfigure: W[5] || (W[5] = (X) => E.value = !0)
        }, null, 8, ["title", "description", "secondary-label"])) : (l(), p("div", Zl, [
          Lt(t("div", tr, [
            Xt(qs)
          ], 512), [
            [Re, e(R).isCalendarOpen]
          ]),
          t("div", er, [
            Xt(la, {
              embedded: v.embedded,
              style: bt(e(n)),
              class: J({ "has-workspace-wallpaper": !!e(n) })
            }, {
              wallpaper: se(() => [
                Xt(Zo, { media: e(r) }, null, 8, ["media"])
              ]),
              _: 1
            }, 8, ["embedded", "style", "class"])
          ])
        ])),
        Xt(Nl),
        W[12] || (W[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        !G.value && !v.embedded ? (l(), p(it, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: W[6] || (W[6] = (X) => e(F)(X, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: W[7] || (W[7] = (X) => e(F)(X, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: W[8] || (W[8] = (X) => e(F)(X, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: W[9] || (W[9] = (X) => e(F)(X, "w"))
          }, null, 32)
        ], 64)) : _("", !0)
      ], 12, zl), [
        [Re, e(q).visible]
      ])
    ]));
  }
});
export {
  Dr as _
};
