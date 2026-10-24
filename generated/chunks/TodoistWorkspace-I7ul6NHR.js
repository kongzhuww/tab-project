import { f as St, g as a, h as d, F as Q, i as t, x as i, s as B, r as It, o as le, j as Vt, t as C, z as lt, k as A, u as O, B as st, w as Z, d as At, b as U, E as Oe, n as bt, H as he, c as ut, q as ot, v as ct, l as Mt, K as we, A as Tt, D as ne, I as Te, J as Xe } from "./vendor-vue-BUkfvXUI.js";
import { a as Je, t as H, w as Qe, o as Ze, p as to } from "./module-state-BVJNDzfS.js";
import { t as _e, e as xe, b as _t, a as Y, f as ie, c as eo, d as oe } from "./main-workspace-store-MJn0Q4qx.js";
import { todoistCalendarSidebarController as at, todoistCalendarSidebarState as oo, cancelTodoistDateReads as so } from "./calendar-sidebar-store-PcAZpNPl.js";
import { p as Ce, t as De, c as no } from "./task-navigation-DGbsSQqt.js";
import { u as Re } from "./useWindowDraggable-ClzyorH0.js";
import { b as io, w as Et } from "./read-session-BWENvNUM.js";
import { A as ao } from "./AccountSetupGuide-CyxqXFu_.js";
import { i as Ft } from "./image-viewer-store-DtJx3sqp.js";
import { t as vt, a as lo, s as ro, p as zt, g as $e, f as $t } from "./todoist.service-DeCQ21Vr.js";
import { _ as Yt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { w as ae } from "./search.service-BE0VV64-.js";
const co = /* @__PURE__ */ St({
  __name: "TodoistWorkspaceTabs",
  setup(_) {
    return (e, p) => (a(), d(Q, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: B({ on: i(xe).view === "inbox" }),
        title: "收件箱",
        onClick: p[0] || (p[0] = (g) => i(_e).switchView("inbox"))
      }, [...p[2] || (p[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: B({ on: i(xe).view === "projects" }),
        title: "项目",
        onClick: p[1] || (p[1] = (g) => i(_e).switchView("projects"))
      }, [...p[3] || (p[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), kt = It(/* @__PURE__ */ new Map());
let uo = 0;
function Ie(_, e, p, g = "editing") {
  const w = ++uo;
  return kt.set(_, { revision: w, title: e, description: p, status: g, error: "" }), w;
}
const k = It({
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
  loading: !1,
  saving: !1,
  error: "",
  url: ""
});
let se = Promise.resolve(), Ut = 0, Se = Promise.resolve();
const Kt = /* @__PURE__ */ new Map();
let Lt = 0;
const Dt = /* @__PURE__ */ new Map();
function jt(_ = !0) {
  _ && Lt++;
  for (const e of Dt.values()) e.abort();
  Dt.clear(), k.loading = !1;
}
function po(_) {
  Dt.get(_)?.abort();
  const e = new AbortController();
  Dt.set(_, e);
  const p = Lt, g = k.taskId;
  return {
    signal: e.signal,
    current: () => !e.signal.aborted && p === Lt && k.isOpen && g === k.taskId && Dt.get(_) === e,
    finish: () => {
      Dt.get(_) === e && Dt.delete(_);
    }
  };
}
function Nt() {
  jt(!1);
  const _ = k.taskId, e = Lt;
  return { taskId: _, current: () => k.isOpen && e === Lt && _ === k.taskId };
}
function fo(_) {
  return new Promise((e) => {
    const p = new FileReader();
    p.onload = () => e(p.result || ""), p.onerror = () => e(""), p.readAsDataURL(_);
  });
}
function Pe(_, e, p) {
  for (const g of _t.columns)
    for (const w of g.tasks)
      String(w.id) === _ && (w.content = e, p !== void 0 && (w.description = p), w._taskRaw && (w._taskRaw.content = e, p !== void 0 && (w._taskRaw.description = p)));
  at.updateTaskTitle(_, e);
}
const vo = {
  state: k,
  cancelReads: jt,
  stageTitleDraft(_, e, p) {
    _ && (Ie(_, e, p), jt(!1), k.taskId === _ && (k.title = e), Pe(_, e, p));
  },
  async openTask(_, e) {
    if (!_) return;
    if (jt(), k.taskId = _, k.isOpen = !0, k.error = "", Object.assign(k, {
      title: "",
      description: "",
      priority: 1,
      startDate: "",
      startTime: "",
      dueDate: "",
      dueTime: "",
      labels: [],
      url: ""
    }), e) {
      k.title = e.content || e.title || "", k.description = e.description || e.raw?.description || "", k.priority = e.priority || 1;
      const w = zt(e.due?.datetime || e.due?.date || e.dueDate || "");
      k.dueDate = w.date, k.dueTime = w.time;
      const $ = e.startDate || $e(_, k.description), W = zt($);
      k.startDate = W.date, k.startTime = W.time, k.labels = [...e.labels || []], k.url = e.url || "";
    }
    const p = kt.get(_);
    p && (k.title = p.title, k.description = p.description);
    const g = po("detail");
    k.loading = !0;
    try {
      const w = await vt.api(`/tasks/${encodeURIComponent(_)}`, { signal: g.signal });
      if (w && g.current()) {
        const $ = kt.get(_);
        k.title = $?.title ?? w.content ?? "", k.description = $?.description ?? w.description ?? "", k.priority = w.priority || 1;
        const W = zt(w.due?.datetime || w.due?.date || "");
        k.dueDate = W.date, k.dueTime = W.time;
        const P = $e(_, w.description || k.description), R = zt(P);
        k.startDate = R.date, k.startTime = R.time, k.labels = [...w.labels || []], k.url = w.url || "";
      }
    } catch {
      g.current() && (k.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      g.current() && (k.loading = !1), g.finish();
    }
  },
  close() {
    jt(), k.isOpen = !1, k.taskId = "";
  },
  async setStartDateAndTime(_, e) {
    if (!k.taskId) return;
    const p = Nt(), g = _.trim(), w = g ? e.trim() : "";
    k.startDate = g, k.startTime = w, ie();
    const $ = lo(g, w);
    ro(p.taskId, $), vt.invalidateWorkspaceSnapshots();
    for (const W of _t.columns) {
      const P = W.tasks.find((R) => R.id === p.taskId);
      P && (P.startDate = $);
    }
  },
  async setDueDateAndTime(_, e) {
    if (!k.taskId) return;
    const p = Nt(), g = _.trim(), w = g ? e.trim() : "";
    k.dueDate = g, k.dueTime = w, ie(), vt.invalidateWorkspaceSnapshots();
    const $ = (Kt.get(p.taskId) || 0) + 1;
    Kt.set(p.taskId, $);
    const W = Se.then(async () => {
      try {
        const P = await vt.updateTask(p.taskId, {
          due_string: g ? w ? `${g} ${w}` : g : "no date"
        });
        if (Kt.get(p.taskId) !== $) return;
        const R = vt.mapTasks([P], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const F of _t.columns) {
          const E = F.tasks.findIndex((v) => v.id === p.taskId);
          if (E < 0) continue;
          const T = F.tasks[E];
          if (Object.assign(T, {
            dueDate: R.dueDate,
            dueText: R.dueText,
            dueString: R.dueString,
            isDueToday: R.isDueToday,
            isOverdue: R.isOverdue,
            isRecurring: R.isRecurring
          }), T._taskRaw && (T._taskRaw.due = P.due), _t.view === "today") {
            const v = R.isOverdue ? "overdue" : R.isDueToday ? "today" : "";
            v !== F.sectionId && (F.tasks.splice(E, 1), _t.columns.find((K) => K.sectionId === v)?.tasks.push(T));
          }
        }
        p.current() && (k.error = "");
      } catch {
        p.current() && Kt.get(p.taskId) === $ && (k.error = "时间保存未确认，请刷新核对；未自动重试。");
      }
    });
    Se = W.catch(() => {
    }), await W;
  },
  async saveTitleAndDesc(_, e, p = k.taskId) {
    const g = p === k.taskId ? Nt() : { taskId: p, current: () => !1 };
    if (!g.taskId || !_.trim()) return;
    const w = _.trim(), $ = e.trim(), W = Ie(p, w, $, "saving");
    g.current() && (k.title = w, k.description = $), Pe(g.taskId, w, $), Ut++, k.saving = !0;
    const P = se.then(async () => {
      try {
        await vt.updateTask(g.taskId, {
          content: w,
          description: $
        }), kt.get(p)?.revision === W && kt.delete(p), Ut === 1 && kt.size === 0 && Y.dispatch("refresh");
      } catch (R) {
        const F = kt.get(p);
        F?.revision === W && (F.status = "failed", F.error = R instanceof Error ? R.message : "保存未确认");
      } finally {
        Ut--, k.saving = Ut > 0;
      }
    });
    se = P.catch(() => {
    }), await P;
  },
  async attachImageToTask(_) {
    const e = Nt();
    if (await se, !e.current()) return;
    if (kt.has(e.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const p = k.description || "";
    if (!e.taskId || k.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    k.saving = !0;
    try {
      const g = _.name || `截图_${Date.now()}.png`;
      let w = "";
      try {
        const $ = await vt.uploadFile(_, g);
        $ && $.file_url && (w = $.file_url);
      } catch ($) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", $), _.size <= 2.5 * 1024 * 1024)
          w = await fo(_);
        else
          throw new Error($?.message || "云端上传失败且文件超过2.5MB");
      }
      if (w) {
        const $ = p ? `${p}

![${g}](${w})` : `![${g}](${w})`;
        await vt.updateTask(e.taskId, {
          description: $
        }), e.current() && (k.description = $);
        for (const W of _t.columns) {
          const P = W.tasks.find((R) => String(R.id) === e.taskId);
          if (P) {
            P.description = $, P._taskRaw && (P._taskRaw.description = $);
            break;
          }
        }
        Y.dispatch("refresh");
      }
    } catch (g) {
      e.current() && (k.error = g.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${g.message}`);
    } finally {
      k.saving = !1;
    }
  }
}, dt = Je(vo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime"
]), mo = { class: "todoist-cal-head" }, go = { class: "todoist-cal-title-row" }, bo = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, yo = { class: "todoist-cal-nav" }, ko = { class: "todoist-cal-nav-group" }, ho = {
  id: "todoist-cal-month-label",
  class: "cal-nav-label"
}, wo = { class: "todoist-cal-nav-group" }, To = {
  id: "todoist-cal-year-label",
  class: "cal-nav-label"
}, _o = {
  id: "todoist-cal-grid",
  class: "todoist-cal-grid",
  role: "grid"
}, xo = ["data-date", "title", "onClick", "onContextmenu", "onDragover", "onDragleave", "onDrop"], Co = {
  key: 0,
  class: "todoist-cal-dot event",
  "aria-hidden": "true"
}, Do = { class: "todoist-cal-agenda" }, $o = { class: "todoist-cal-agenda-head" }, Io = { class: "todoist-cal-tab-switch" }, So = {
  id: "todoist-cal-agenda-count",
  class: "agenda-count"
}, Po = {
  key: 0,
  id: "todoist-cal-agenda-list",
  class: "todoist-cal-agenda-list"
}, Oo = {
  key: 0,
  class: "todoist-cal-empty"
}, Ro = ["href", "onContextmenu"], Mo = { class: "agenda-event-time" }, jo = { class: "agenda-event-copy" }, Lo = ["title"], Ao = ["onContextmenu"], Wo = { class: "agenda-event-time" }, Eo = { class: "agenda-event-copy" }, zo = ["title"], Uo = {
  key: 1,
  id: "todoist-cal-todo-list",
  class: "todoist-cal-agenda-list todoist-cal-todos"
}, Ko = {
  key: 0,
  class: "todoist-cal-empty"
}, No = {
  key: 1,
  class: "todoist-cal-empty"
}, Vo = ["onClick"], Fo = { class: "todoist-cal-todo-main" }, Yo = ["title", "onClick"], Bo = {
  key: 0,
  class: "check-icon"
}, Ho = {
  key: 0,
  class: "todoist-cal-completed-tag"
}, Go = ["onClick"], qo = ["src"], Xo = /* @__PURE__ */ St({
  __name: "TodoistCalendarSidebar",
  setup(_) {
    const e = oo;
    function p(D) {
      at.setTabMode(D);
    }
    function g(D) {
      at.toggleTodoItem(D);
    }
    function w(D) {
      dt.openTask(D.id, D);
    }
    le(() => {
      at.dispatch("init");
    });
    function $() {
      at.dispatch("today");
    }
    function W() {
      at.dispatch("prev-month");
    }
    function P() {
      at.dispatch("next-month");
    }
    function R() {
      at.dispatch("prev-year");
    }
    function F() {
      at.dispatch("next-year");
    }
    function E(D) {
      at.dispatch("select-date", D);
    }
    function T(D, b) {
      at.dispatch("context-date", {
        date: D,
        clientX: b.clientX,
        clientY: b.clientY
      });
    }
    function v(D, b) {
      const r = Array.from(b.dataTransfer?.types || []);
      (r.includes("application/x-todoist-task-id") || r.includes("text/plain")) && (b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "copy"));
    }
    function K(D) {
    }
    function h(D, b) {
      const r = b.dataTransfer?.getData("application/x-todoist-task-id") || b.dataTransfer?.getData("text/plain");
      r && (b.preventDefault(), b.stopPropagation(), at.dispatch("drop-task", { taskId: r, date: D }));
    }
    function c(D, b) {
      at.dispatch("context-agenda", {
        item: D,
        clientX: b.clientX,
        clientY: b.clientY
      });
    }
    return (D, b) => (a(), d("aside", {
      id: "todoist-calendar-sidebar",
      class: B(["todoist-calendar-sidebar", { collapsed: i(e).collapsed }]),
      "aria-label": "DayLine 日历拓展"
    }, [
      t("div", mo, [
        t("div", go, [
          b[2] || (b[2] = t("span", { class: "todoist-cal-logo" }, [
            Vt("📅 "),
            t("strong", null, "Google 日历")
          ], -1)),
          t("span", bo, C(i(e).badgeText), 1)
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
      t("div", yo, [
        t("div", ko, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: W
          }, "‹"),
          t("span", ho, C(i(e).monthLabel), 1),
          t("button", {
            id: "todoist-cal-next-month",
            type: "button",
            class: "cal-nav-btn",
            title: "下个月",
            onClick: P
          }, "›")
        ]),
        t("div", wo, [
          t("button", {
            id: "todoist-cal-prev-year",
            type: "button",
            class: "cal-nav-btn",
            title: "上一年",
            onClick: R
          }, "‹"),
          t("span", To, C(i(e).yearLabel), 1),
          t("button", {
            id: "todoist-cal-next-year",
            type: "button",
            class: "cal-nav-btn",
            title: "下一年",
            onClick: F
          }, "›")
        ])
      ]),
      b[4] || (b[4] = t("div", { class: "todoist-cal-weekdays" }, [
        t("span", null, "一"),
        t("span", null, "二"),
        t("span", null, "三"),
        t("span", null, "四"),
        t("span", null, "五"),
        t("span", null, "六"),
        t("span", null, "日")
      ], -1)),
      t("div", _o, [
        (a(!0), d(Q, null, lt(i(e).cells, (r) => (a(), d("button", {
          key: r.date,
          type: "button",
          class: B(["todoist-cal-cell", {
            outside: r.isOutside,
            today: r.isToday,
            selected: r.isSelected
          }]),
          "data-date": r.date,
          role: "gridcell",
          title: r.title,
          onClick: (j) => E(r.date),
          onContextmenu: A((j) => T(r.date, j), ["prevent"]),
          onDragover: (j) => v(r.date, j),
          onDragleave: (j) => (r.date, void 0),
          onDrop: (j) => h(r.date, j)
        }, [
          t("span", null, C(r.dayNumber), 1),
          r.hasDot ? (a(), d("span", Co)) : O("", !0)
        ], 42, xo))), 128))
      ]),
      t("div", Do, [
        t("div", $o, [
          t("div", Io, [
            t("button", {
              type: "button",
              class: B(["cal-tab-btn", { active: i(e).tabMode === "agenda" }]),
              onClick: b[0] || (b[0] = (r) => p("agenda"))
            }, C(i(e).agendaTitle.includes(" ") ? i(e).agendaTitle.split(" ")[0] + " 日程" : i(e).agendaTitle), 3),
            t("button", {
              type: "button",
              class: B(["cal-tab-btn", { active: i(e).tabMode === "todo" }]),
              onClick: b[1] || (b[1] = (r) => p("todo"))
            }, " 待办 ", 2)
          ]),
          t("span", So, C(i(e).tabMode === "agenda" ? i(e).agendaCount : `${i(e).todoItems.length} 项`), 1)
        ]),
        i(e).tabMode === "agenda" ? (a(), d("div", Po, [
          i(e).agendaItems.length === 0 ? (a(), d("div", Oo, C(i(e).emptyText), 1)) : (a(!0), d(Q, { key: 1 }, lt(i(e).agendaItems, (r) => (a(), d(Q, {
            key: r.id
          }, [
            r.htmlLink ? (a(), d("a", {
              key: 0,
              href: r.htmlLink,
              target: "_blank",
              rel: "noreferrer",
              class: "todoist-cal-agenda-item todoist-cal-event-item google-calendar-agenda-item",
              style: st(r.color ? { "--google-event-color": r.color } : void 0),
              title: "点击打开 Google 日历；右键可修改、复制或删除",
              onContextmenu: A((j) => c(r, j), ["prevent"])
            }, [
              t("span", Mo, C(r.time), 1),
              t("span", jo, [
                t("b", {
                  title: r.summary
                }, C(r.summary), 9, Lo),
                t("small", null, C(r.subtitle), 1)
              ])
            ], 44, Ro)) : (a(), d("div", {
              key: 1,
              class: "todoist-cal-agenda-item todoist-cal-event-item google-calendar-agenda-item",
              style: st(r.color ? { "--google-event-color": r.color } : void 0),
              title: "Google 日历日程；右键可修改、复制或删除",
              onContextmenu: A((j) => c(r, j), ["prevent"])
            }, [
              t("span", Wo, C(r.time), 1),
              t("span", Eo, [
                t("b", {
                  title: r.summary
                }, C(r.summary), 9, zo),
                t("small", null, C(r.subtitle), 1)
              ])
            ], 44, Ao))
          ], 64))), 128))
        ])) : (a(), d("div", Uo, [
          i(e).todoLoading ? (a(), d("div", Ko, " 正在读取待办与完成历史… ")) : i(e).todoItems.length === 0 ? (a(), d("div", No, " 当天没有待办或完成任务 ☕ ")) : (a(!0), d(Q, { key: 2 }, lt(i(e).todoItems, (r) => (a(), d("div", {
            key: r.id,
            class: B(["todoist-cal-todo-card", { completed: r.completed }]),
            onClick: (j) => w(r)
          }, [
            t("div", Fo, [
              t("button", {
                type: "button",
                class: B(["todoist-cal-check", { checked: r.completed }]),
                title: r.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: A((j) => g(r), ["stop"])
              }, [
                r.completed ? (a(), d("span", Bo, "✓")) : O("", !0)
              ], 10, Yo),
              t("span", {
                class: B(["todoist-cal-todo-title", { strike: r.completed }])
              }, C(r.content), 3),
              r.completed ? (a(), d("span", Ho, "已完成")) : O("", !0)
            ]),
            r.thumbUrl ? (a(), d("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: A((j) => i(Ft).open(r.thumbUrl, r.content), ["stop"])
            }, [
              t("img", {
                src: r.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, qo),
              b[3] || (b[3] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, Go)) : O("", !0)
          ], 10, Vo))), 128))
        ]))
      ])
    ], 2));
  }
}), Jo = /* @__PURE__ */ Yt(Xo, [["__scopeId", "data-v-e33427ca"]]);
function Qo(_) {
  const e = _.state, p = U(null), g = U(null), w = U(null), $ = U(!1), W = Oe(null), P = U(), R = /* @__PURE__ */ new Map();
  function F(f) {
    R.clear();
    const I = f.closest(".todoist-board");
    if (I)
      for (const m of I.querySelectorAll(".todoist-board-list")) {
        const S = e.columns[Number(m.dataset.groupIndex)];
        if (!S) continue;
        const M = m.__todoistSlots;
        if (!M) continue;
        const N = M(), pt = N.filter((tt) => tt.id !== b?.id);
        R.set(S, { list: m, rows: pt, read: M, snapshot: N });
      }
  }
  let E = 0, T;
  function v(f, I) {
    T = { clientY: f.clientY, col: I }, !E && (E = requestAnimationFrame(() => {
      E = 0;
      const m = T;
      T = void 0, m && K(m, m.col);
    }));
  }
  function K(f, I) {
    if (!b || e.movingTaskId) return;
    const m = R.get(I);
    if (!m) return;
    const S = m.read();
    S !== m.snapshot && (m.snapshot = S, m.rows = S.filter((X) => X.id !== b?.id));
    const M = f.clientY - m.list.getBoundingClientRect().top + m.list.scrollTop;
    let N = 0, pt = m.rows.length;
    for (; N < pt; ) {
      const X = N + pt >>> 1;
      M < m.rows[X].middle ? pt = X : N = X + 1;
    }
    let tt = N;
    if (g.value === e.columns.indexOf(I)) {
      const X = P.value ? m.rows.findIndex((gt) => gt.id === P.value) : m.rows.length;
      X >= 0 && tt > X && M < m.rows[X].middle + 10 && (tt = X), X > 0 && tt < X && M > m.rows[X - 1].middle - 10 && (tt = X);
    }
    const ft = m.rows[tt]?.id;
    D(I, ft), g.value === e.columns.indexOf(I) && (w.value = ft || m.rows[m.rows.length - 1]?.id || null, $.value = !ft);
  }
  function h(f) {
    return f === W.value;
  }
  function c(f, I) {
    if (I !== g.value || !W.value) return f.tasks;
    const m = [...f.tasks], S = P.value ? m.findIndex((M) => M.id === P.value) : -1;
    return m.splice(S < 0 ? m.length : S, 0, W.value), m;
  }
  function D(f, I) {
    if (!b || !r) return;
    if (e.view === "today" && f.sectionId === "overdue" && r.sectionId !== "overdue") {
      g.value = null;
      return;
    }
    const m = I ? f.tasks.find((N) => N.id === I) : void 0, S = f === r ? String(b._taskRaw?.parent_id || "") : "";
    if (m && e.view !== "today" && String(m._taskRaw?.parent_id || "") !== S) {
      g.value = null;
      return;
    }
    const M = e.columns.indexOf(f);
    M < 0 || (P.value = I, g.value = M);
  }
  let b = null, r = null;
  function j(f, I, m, S) {
    if (!_.isActive() || e.loading || e.movingTaskId || e.moveNeedsRefresh || I.completed || I.id.startsWith("optimistic-") || _.editingTaskId() === I.id) {
      f.preventDefault();
      return;
    }
    if (f.stopPropagation(), _.closePopovers(), p.value = I.id, b = I, r = m, W.value = { ...I }, F(f.currentTarget), f.dataTransfer) {
      f.dataTransfer.effectAllowed = "move";
      const M = f.currentTarget, N = M.getBoundingClientRect();
      f.dataTransfer.setDragImage(
        M,
        Math.max(0, Math.min(N.width, f.clientX - N.left)),
        Math.max(0, Math.min(N.height, f.clientY - N.top))
      ), f.dataTransfer.clearData(), f.dataTransfer.setData("application/x-todoist-task-id", I.id), f.dataTransfer.setData("application/x-logicweaver-todoist-task", I.id), f.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: I.id, sectionId: m.sectionId }));
    }
  }
  function z() {
    cancelAnimationFrame(E), E = 0, T = void 0, p.value = null, g.value = null, w.value = null, $.value = !1, b = null, r = null, W.value = null, P.value = void 0, R.clear();
  }
  function rt(f, I) {
    !b || e.movingTaskId || (f.preventDefault(), f.stopPropagation(), f.dataTransfer && (f.dataTransfer.dropEffect = "move"), v(f, e.columns[I]));
  }
  function nt(f, I) {
    f.currentTarget?.contains(f.relatedTarget);
  }
  function G(f, I, m, S) {
    f.dataTransfer && (f.dataTransfer.dropEffect = "move"), v(f, m);
  }
  async function mt(f, I) {
    T && T.col === f && (K(T, T.col), I = P.value);
    const m = b, S = r;
    z(), !(!m || !S || !_.isActive() || e.movingTaskId) && (e.view === "today" ? f.sectionId === "today" && S.sectionId !== "today" ? await _.moveTask(m.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, I) : await _.moveTask(m.id, { sectionId: f.sectionId }, I) : await _.moveTask(m.id, {
      projectId: f.projectId,
      sectionId: f.sectionId
    }, I));
  }
  async function ht(f, I, m, S) {
    f.preventDefault();
    const M = f.dataTransfer?.getData("application/x-todoist-label") || (f.dataTransfer?.getData("text/plain")?.startsWith("label:") ? f.dataTransfer.getData("text/plain").slice(6) : "");
    if (M) {
      _.dropLabel(I, M);
      return;
    }
    if (g.value === e.columns.indexOf(m)) {
      await mt(m, P.value);
      return;
    }
    const N = f.currentTarget.getBoundingClientRect(), pt = f.clientY >= N.top + N.height / 2, tt = m.tasks.filter((gt) => gt.id !== b?.id), ft = tt.findIndex((gt) => gt.id === I.id), X = I.id === b?.id ? I.id : pt ? tt[ft + 1]?.id : I.id;
    await mt(m, X);
  }
  async function xt(f, I) {
    f.preventDefault(), f.stopPropagation(), await mt(I, g.value === e.columns.indexOf(I) ? P.value : void 0);
  }
  return Z(() => [e.view, e.activeProjectId], () => z()), Z(() => e.columns, (f) => {
    r && !f.includes(r) && z();
  }), Z(_.isActive, (f) => {
    f || z();
  }, { immediate: !0, flush: "sync" }), At(z), {
    draggingTaskId: p,
    dragOverColIndex: g,
    dragOverTaskId: w,
    dragAfterTask: $,
    isDragPreview: h,
    previewTasks: c,
    onTaskDragStart: j,
    onTaskDragEnd: z,
    onColDragOver: rt,
    onColDragLeave: nt,
    onTaskDragOver: G,
    onTaskDrop: ht,
    onColDrop: xt
  };
}
const Zo = ["data-row-key"], ts = /* @__PURE__ */ St({
  __name: "TodoistVirtualList",
  props: {
    tasks: {},
    pinnedId: {},
    hiddenId: {},
    isPreview: { type: Function }
  },
  setup(_) {
    const e = _, p = U(null), g = /* @__PURE__ */ new Map(), w = U(0), $ = Oe({ top: 0, height: 600 }), W = (D) => e.isPreview(D) ? `preview:${D.id}` : D.id, P = ut(() => {
      w.value;
      const D = [0];
      for (const b of e.tasks) {
        const r = b.id === e.hiddenId && !e.isPreview(b) ? 0 : g.get(W(b)) || g.get(b.id) || 110;
        D.push(D[D.length - 1] + r);
      }
      return D;
    }), R = ut(() => {
      w.value;
      let D = 0;
      return e.tasks.filter((b) => !e.isPreview(b)).map((b) => {
        const r = g.get(b.id) || 110, j = { id: b.id, middle: D + r / 2 };
        return D += r, j;
      });
    });
    function F(D) {
      const b = P.value;
      let r = 0, j = e.tasks.length;
      for (; r < j; ) {
        const z = r + j >>> 1;
        b[z + 1] < D ? r = z + 1 : j = z;
      }
      return r;
    }
    const E = ut(() => {
      const D = Math.max(0, F($.value.top) - 5), b = Math.min(e.tasks.length, F($.value.top + $.value.height) + 6), r = /* @__PURE__ */ new Set();
      for (let j = D; j < b; j++) r.add(j);
      if (e.pinnedId) {
        const j = e.tasks.findIndex((z) => z.id === e.pinnedId && !e.isPreview(z));
        j >= 0 && r.add(j);
      }
      return [...r].sort((j, z) => j - z).map((j) => ({ task: e.tasks[j], index: j, top: P.value[j] }));
    });
    let T = 0;
    function v() {
      T || (T = requestAnimationFrame(() => {
        T = 0, p.value && ($.value = { top: p.value.scrollTop, height: p.value.clientHeight });
      }));
    }
    let K;
    const h = /* @__PURE__ */ new Map();
    function c(D, b) {
      const r = h.get(b);
      r !== D && (r && K?.unobserve(r), D instanceof HTMLElement ? (h.set(b, D), K?.observe(D)) : h.delete(b));
    }
    return Z(() => e.tasks, () => {
      const D = new Set(e.tasks.map(W));
      for (const b of g.keys()) D.has(b) || g.delete(b);
      bt(v);
    }), le(() => {
      K = new ResizeObserver((D) => {
        let b = !1;
        const r = F(p.value?.scrollTop || 0), j = P.value[r] || 0;
        for (const z of D) {
          const rt = z.target;
          if (rt === p.value) {
            v();
            continue;
          }
          const nt = rt.dataset.rowKey, G = z.borderBoxSize?.[0]?.blockSize || z.contentRect.height;
          nt && G > 0 && Math.abs((g.get(nt) || 0) - G) > 0.5 && (g.set(nt, G), b = !0);
        }
        if (b) {
          w.value++;
          const z = (P.value[r] || 0) - j;
          p.value && z && !e.pinnedId && (p.value.scrollTop += z), v();
        }
      }), p.value && (K.observe(p.value), p.value.__todoistSlots = () => R.value);
      for (const D of h.values()) K.observe(D);
      v();
    }), At(() => {
      K?.disconnect(), cancelAnimationFrame(T), p.value && delete p.value.__todoistSlots, h.clear(), g.clear();
    }), (D, b) => (a(), d("div", {
      ref_key: "root",
      ref: p,
      onScrollPassive: v
    }, [
      _.tasks.length ? (a(), d("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: st({ height: `${P.value[P.value.length - 1]}px` })
      }, [
        (a(!0), d(Q, null, lt(E.value, (r) => (a(), d("div", {
          key: W(r.task),
          ref_for: !0,
          ref: (j) => c(j, W(r.task)),
          "data-row-key": W(r.task),
          class: "virtual-task-row",
          style: st({ transform: `translateY(${r.top}px)` })
        }, [
          he(D.$slots, "default", {
            task: r.task,
            index: r.index
          }, void 0, !0)
        ], 12, Zo))), 128))
      ], 4)) : he(D.$slots, "empty", {}, void 0, !0, 0)
    ], 544));
  }
}), es = /* @__PURE__ */ Yt(ts, [["__scopeId", "data-v-e0ed77d8"]]), os = {
  key: 0,
  class: "todoist-move-status error",
  role: "alert"
}, ss = {
  key: 1,
  class: "todoist-empty"
}, ns = {
  key: 2,
  class: "todoist-empty"
}, is = {
  key: 3,
  class: "todoist-projects-empty-state"
}, as = {
  key: 0,
  class: "todoist-projects-toolbar"
}, ls = { class: "todoist-projects-toolbar-inner" }, ds = { class: "todoist-project-tabs-scroll" }, rs = ["onClick"], cs = { class: "todoist-project-tab-name" }, us = {
  key: 0,
  class: "todoist-project-actions-group"
}, ps = { class: "todoist-board" }, fs = ["data-section-id", "data-title", "data-column-index"], vs = { class: "todoist-board-column-head" }, ms = ["title", "onClick"], gs = ["onClick"], bs = ["onSubmit"], ys = ["onKeydown"], ks = {
  key: 0,
  class: "todoist-composer-images"
}, hs = ["src"], ws = { class: "todoist-composer-img-name" }, Ts = {
  key: 0,
  class: "todoist-composer-img-status"
}, _s = ["onClick"], xs = { class: "todoist-inline-actions" }, Cs = ["disabled"], Ds = ["disabled"], $s = {
  key: 0,
  class: "todoist-column-empty"
}, Is = ["data-task-id", "aria-hidden", "tabindex", "title", "draggable", "onDragstart", "onDragover", "onDrop", "onDblclick", "onClick", "onContextmenu"], Ss = ["disabled", "title", "aria-label", "onClick"], Ps = { class: "todoist-board-task-main" }, Os = {
  key: 0,
  class: "todoist-position-pending",
  role: "status"
}, Rs = ["onKeydown", "onBlur"], Ms = {
  key: 2,
  class: "todoist-board-task-title todoist-task-content"
}, js = {
  key: 3,
  class: "todoist-board-task-description"
}, Ls = {
  key: 4,
  class: "todoist-board-task-meta"
}, As = ["title"], Ws = ["title"], Es = ["title"], zs = ["title"], Us = {
  key: 4,
  class: "todoist-board-extra"
}, Ks = ["onClick"], Ns = ["src"], Vs = {
  key: 0,
  class: "todoist-board-add-column"
}, Fs = {
  key: 1,
  class: "todoist-add-section-form"
}, Ys = ["onKeydown"], Bs = {
  key: 0,
  class: "todoist-section-menu-move-row"
}, Hs = ["disabled"], Gs = ["disabled"], qs = {
  key: 1,
  class: "todoist-section-menu-divider"
}, Xs = { class: "todoist-task-menu-header" }, Js = { class: "todoist-task-menu-title" }, Qs = { class: "todoist-menu-badge" }, Zs = {
  key: 0,
  class: "todoist-labels-panel"
}, tn = { class: "todoist-labels-quick-input" }, en = ["onKeydown"], on = { class: "todoist-labels-chip-grid" }, sn = ["onClick"], nn = {
  key: 0,
  class: "chip-check"
}, an = {
  key: 1,
  class: "todoist-recur-panel"
}, ln = { class: "todoist-recur-grid" }, dn = ["onClick"], rn = { class: "todoist-recur-custom-row" }, cn = ["onKeydown"], un = {
  class: "todoist-menu-badge",
  style: { display: "inline-flex", "align-items": "center", gap: "5px" }
}, pn = {
  key: 0,
  class: "todoist-color-dot none",
  style: { width: "10px", height: "10px", display: "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1", "font-size": "8px" }
}, fn = {
  key: 2,
  class: "todoist-color-panel"
}, vn = { class: "todoist-color-grid" }, mn = ["title", "onClick"], gn = { class: "todoist-color-name" }, bn = ["disabled", "onClick"], yn = { class: "todoist-project-flyout-name" }, kn = {
  key: 0,
  class: "todoist-menu-badge"
}, hn = { class: "todoist-menu-text" }, wn = ["onKeydown"], Tn = { class: "todoist-dialog-head" }, _n = { class: "todoist-dialog-title" }, xn = { class: "todoist-dialog-body" }, Cn = {
  key: 0,
  class: "todoist-dialog-desc"
}, Dn = ["placeholder", "onKeydown"], $n = { class: "todoist-dialog-foot" }, In = ["onKeydown"], Sn = { class: "todoist-dialog-head" }, Pn = { class: "todoist-dialog-icon" }, On = { class: "todoist-dialog-title" }, Rn = { class: "todoist-dialog-body" }, Mn = {
  key: 0,
  style: { background: "#fef2f2", padding: "10px 12px", "border-radius": "8px", border: "1px solid #fee2e2", "margin-bottom": "10px" }
}, jn = { style: { "font-weight": "700", color: "#dc2626", "font-size": "13.5px" } }, Ln = { style: { margin: "0", color: "#64748b", "font-size": "12.5px", "line-height": "1.5" } }, An = { class: "todoist-dialog-foot" }, Wn = /* @__PURE__ */ St({
  __name: "TodoistTaskList",
  setup(_) {
    const e = _t, p = U(""), g = U(null), w = U(""), $ = U([]);
    function W(s) {
      const o = s.clipboardData?.items;
      if (o)
        for (let n = 0; n < o.length; n++) {
          const L = o[n];
          if (L.type.indexOf("image") !== -1) {
            s.preventDefault();
            const l = L.getAsFile();
            if (!l) continue;
            const et = URL.createObjectURL(l), V = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), wt = {
              file: l,
              previewUrl: et,
              name: `截图_${V}.png`,
              uploading: !1
            };
            $.value.push(wt);
          }
        }
    }
    function P(s) {
      const o = $.value.splice(s, 1)[0];
      if (o && o.previewUrl)
        try {
          URL.revokeObjectURL(o.previewUrl);
        } catch {
        }
    }
    const R = U(null), F = U(""), E = U(null), T = It({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), v = It({
      isOpen: !1,
      title: "",
      message: "",
      value: "",
      placeholder: "",
      confirmText: "确定",
      actionType: "",
      payload: null
    }), K = U(null), h = It({
      isOpen: !1,
      title: "确认操作",
      icon: "⚠️",
      alertText: "",
      message: "",
      confirmText: "确定",
      danger: !1,
      actionType: "",
      payload: null
    }), c = It({
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
    }), D = U(null), b = U(null), r = [
      { id: "none", name: "无颜色", hex: "" },
      { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
      { id: "blue", name: "天青蓝", hex: "#3b82f6" },
      { id: "emerald", name: "翡翠绿", hex: "#10b981" },
      { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
      { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
      { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
      { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
      { id: "slate", name: "石墨灰", hex: "#64748b" }
    ], j = [
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
    ], z = ut(() => String(c.task?._taskRaw?.project_id || c.col?.projectId || "")), rt = ut(() => e.view !== "projects" ? null : e.projects.find((s) => String(s.id) === String(e.activeProjectId)) || e.projects[0] || null), nt = ut(() => {
      const s = new Set(e.availableLabels || []);
      return c.task?.labels && c.task.labels.forEach((o) => s.add(o)), Array.from(s);
    }), G = ut(() => {
      const s = c.task?.customColorHex;
      return s && r.find((n) => n.hex.toLowerCase() === s.toLowerCase()) || r[0];
    });
    function mt(s, o) {
      return s.sectionId || s.title || String(o);
    }
    function ht() {
      return `${e.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function xt(s) {
      return s.startDate || s.dueText || s.labels && s.labels.length > 0 || s.timedDeadlineText || s.extraCountText;
    }
    function f() {
      T.isOpen = !1, c.isOpen = !1, c.activeSubpanel = null;
    }
    const {
      draggingTaskId: I,
      dragOverColIndex: m,
      dragOverTaskId: S,
      dragAfterTask: M,
      isDragPreview: N,
      previewTasks: pt,
      onTaskDragStart: tt,
      onTaskDragEnd: ft,
      onColDragOver: X,
      onColDragLeave: gt,
      onTaskDragOver: Bt,
      onTaskDrop: Ht,
      onColDrop: Pt
    } = Qo({
      state: e,
      isActive: () => H.active,
      editingTaskId: () => R.value,
      closePopovers: f,
      moveTask: (s, o, n) => Y.moveTask(s, o, n),
      dropLabel: (s, o) => {
        s.labels || (s.labels = []), s.labels.includes(o) || (s.labels.push(o), vt.getToken() && vt.updateTask(s.id, { labels: s.labels }));
      }
    });
    function Ct(s, o) {
      Y.dispatch("toggle-task", { task: s, group: o });
    }
    function Gt(s, o) {
      if (s.completed) return;
      const n = o.target;
      n && n.closest("button,input,textarea,select,a") || Ot(s);
    }
    function Ot(s) {
      e.movingTaskId !== s.id && (R.value = s.id, F.value = s.content, bt(() => {
        E.value && (E.value.focus(), E.value.select());
      }));
    }
    function Rt(s, o) {
      if (R.value !== s.id) return;
      const n = F.value.trim();
      R.value = null, o && n && n !== s.content && (s.content = n, Y.dispatch("update-task-title", {
        taskId: s.id,
        content: n,
        task: s,
        newContent: n
      }));
    }
    function y(s, o) {
      s.key === "Enter" ? s.shiftKey || (s.preventDefault(), Rt(o, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), Rt(o, !1));
    }
    function u(s, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || dt.openTask(s.id, s);
    }
    function x(s, o, n) {
      const L = n.currentTarget;
      g.value = mt(s, o), w.value = "", bt(() => {
        L.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function J() {
      yt.value || it();
    }
    function it() {
      g.value = null, w.value = "";
      for (const s of $.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      $.value = [];
    }
    const yt = U(!1), de = /* @__PURE__ */ new WeakMap();
    function re(s) {
      const o = s.description || s._taskRaw?.description || "", n = de.get(s);
      if (n && n.source === o) return n;
      const L = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, l = {
        source: o,
        thumb: L,
        text: o.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
      };
      return de.set(s, l), l;
    }
    function ce(s) {
      return re(s).text;
    }
    function qt(s) {
      return re(s).thumb;
    }
    function Me(s, o) {
      s && Ft.open(s, o?.content || "任务照片");
    }
    async function ue(s) {
      if (!H.active || yt.value) return;
      const o = [...$.value], n = w.value.trim() || o[0]?.name || "";
      if (!n) return;
      const L = g.value, l = w.value, et = e.view, V = s.projectId || et === "projects" && e.activeProjectId || void 0, wt = s.sectionId !== void 0 ? s.sectionId : void 0;
      yt.value = !0;
      try {
        await Qe(async () => {
          for (const q of o)
            if (!q.uploadedUrl) {
              q.uploading = !0;
              try {
                const ee = await vt.uploadFile(q.file, q.name);
                q.uploadedUrl = ee.file_url;
              } catch {
                q.uploadedUrl = q.previewUrl;
              } finally {
                q.uploading = !1;
              }
            }
          await Y.dispatch("add-task-submit", {
            content: n,
            view: et,
            group: s,
            projectId: V,
            sectionId: wt,
            attachments: o.map((q) => ({ file_url: q.uploadedUrl, file_name: q.name, file_type: q.file.type || "image/png" }))
          }) && L === g.value && l === w.value && o.length === $.value.length && o.every((q, ee) => q === $.value[ee]) && it();
        });
      } catch {
        e.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        yt.value = !1;
      }
    }
    function je(s, o) {
      s.key === "Enter" && !s.shiftKey ? (s.preventDefault(), ue(o)) : s.key === "Escape" && (s.preventDefault(), J());
    }
    function pe() {
      const s = p.value.trim();
      if (!s) return;
      const n = e.columns.find((L) => L.projectId)?.projectId || e.activeProjectId || void 0;
      Y.dispatch("add-section-submit", { name: s, projectId: n }), Xt();
    }
    function Xt() {
      e.addingSection = !1, p.value = "";
    }
    function Le(s, o, n) {
      if (T.isOpen && T.col === s) {
        T.isOpen = !1;
        return;
      }
      c.isOpen = !1;
      const l = n.currentTarget.getBoundingClientRect(), V = Math.max(8, Math.min(window.innerWidth - 175 - 8, l.left)), wt = Math.min(window.innerHeight - 160, l.bottom + 4);
      T.col = s, T.x = V, T.y = wt, T.canMoveLeft = o > 0 && !!e.columns[o - 1]?.sectionId, T.canMoveRight = o < e.columns.length - 1 && !!e.columns[o + 1]?.sectionId, T.isOpen = !0;
    }
    function fe(s, o) {
      T.isOpen = !1, Y.dispatch("move-section", { sectionId: s.sectionId, direction: o });
    }
    function ve(s, o, n) {
      if (e.movingTaskId === s.id || s.completed) return;
      T.isOpen = !1;
      const L = 236, l = 340, et = Math.max(8, Math.min(window.innerWidth - L - 8, n.clientX)), V = Math.max(8, Math.min(window.innerHeight - l - 8, n.clientY));
      if (c.task = s, c.col = o, c.x = et, c.y = V, c.activeSubpanel = null, c.descText = s.description || "", c.isSavingDesc = !1, c.newLabelText = "", c.customRecurText = "", s.dueDate) {
        const q = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(q.getTime()) && (c.calYear = q.getFullYear(), c.calMonth = q.getMonth());
      } else {
        const q = /* @__PURE__ */ new Date();
        c.calYear = q.getFullYear(), c.calMonth = q.getMonth();
      }
      const wt = 252, te = et + L + wt > window.innerWidth - 8;
      c.flyoutOpenLeft = te, c.flyoutStyle = {
        left: te ? `${-wt - 6}px` : `${L + 6}px`,
        top: "0px"
      }, c.isOpen = !0;
    }
    function Wt(s) {
      c.activeSubpanel === s ? c.activeSubpanel = null : (c.activeSubpanel = s, s === "desc" ? bt(() => {
        D.value?.focus(), D.value?.select();
      }) : s === "labels" && bt(() => {
        b.value?.focus();
      }));
    }
    function me(s) {
      return !!c.task?.labels?.includes(s);
    }
    function Ae(s) {
      if (!c.task) return;
      const o = c.task.id, n = [...c.task.labels || []], L = n.includes(s) ? n.filter((l) => l !== s) : [...n, s];
      c.task.labels = L, Y.dispatch("update-task-labels", { taskId: o, labels: L });
    }
    function ge() {
      if (!c.task) return;
      const s = c.newLabelText.trim();
      if (!s) return;
      c.newLabelText = "";
      const o = c.task.id, n = [...c.task.labels || []];
      n.includes(s) || (n.push(s), c.task.labels = n, Y.dispatch("update-task-labels", { taskId: o, labels: n })), f();
    }
    function We(s) {
      return String(c.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function Ee(s, o) {
      if (!c.task) return;
      const n = c.task.id;
      Y.dispatch("update-task-recurring", { taskId: n, rule: s, label: o }), f();
    }
    function be() {
      if (!c.task) return;
      const s = c.customRecurText.trim();
      if (!s) return;
      const o = c.task.id;
      Y.dispatch("update-task-recurring", { taskId: o, rule: s, label: s }), f();
    }
    function ze() {
      if (!c.task) return;
      const s = c.task.id;
      Y.dispatch("clear-task-recurring", { taskId: s }), f();
    }
    function Ue(s) {
      if (!c.task) return;
      const o = c.task.id, n = r.find((L) => L.id === s);
      c.task.customColorHex = n?.hex || "", Y.dispatch("update-task-color", { taskId: o, colorId: s }), f();
    }
    function Ke(s) {
      if (!c.task) return;
      const o = c.task.id;
      Y.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), f();
    }
    async function Ne() {
      const s = c.task, o = s ? {
        id: `todoist:${s.id}`,
        content: s.content,
        completed: s.completed,
        priority: s.priority,
        dueDate: s.dueDate
      } : null;
      if (f(), !!o?.content.trim())
        try {
          const { addWorkbenchTask: n } = await import("./workbench.store---R-eEes.js"), L = n(o.content, o);
          ae.show({
            appName: "海狸工作台",
            title: L ? "已添加到工作台" : "任务已在工作台中",
            message: L ? "已加入顶部待办条；工作台勾选仅影响本地副本。" : "没有重复添加"
          });
        } catch {
          ae.show({ appName: "海狸工作台", title: "添加失败", message: "未能添加任务，请重试。" });
        }
    }
    function Ve() {
      if (!c.task) return;
      const s = c.task;
      f(), s.isRecurring ? (h.title = "删除重复任务确认", h.icon = "⚠️", h.danger = !0, h.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", h.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, h.confirmText = "删除重复任务", h.actionType = "delete-task", h.payload = { taskId: s.id, isRecurring: !0 }, h.isOpen = !0) : (h.title = "删除任务确认", h.icon = "🗑️", h.danger = !0, h.alertText = `确定要删除任务「${s.content}」吗？`, h.message = "此操作不可撤销。", h.confirmText = "确认删除", h.actionType = "delete-task", h.payload = { taskId: s.id, isRecurring: !1 }, h.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, o, n) {
      ve(s, o, n);
    });
    function ye() {
      v.title = "新建项目", v.message = "请输入新项目名称：", v.value = "", v.placeholder = "项目名称…", v.confirmText = "创建", v.actionType = "create-project", v.payload = null, v.isOpen = !0, bt(() => K.value?.focus());
    }
    function Fe(s) {
      v.title = "重命名项目", v.message = `正在重命名项目「${s.name}」：`, v.value = s.name, v.placeholder = "新项目名称…", v.confirmText = "保存", v.actionType = "rename-project", v.payload = { projectId: s.id }, v.isOpen = !0, bt(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function Ye(s) {
      T.isOpen = !1, v.title = "重命名板块", v.message = `正在重命名板块「${s.title}」：`, v.value = s.title, v.placeholder = "新板块名称…", v.confirmText = "保存", v.actionType = "rename-section", v.payload = { sectionId: s.sectionId }, v.isOpen = !0, bt(() => {
        K.value?.focus(), K.value?.select();
      });
    }
    function Jt() {
      v.isOpen = !1;
    }
    function ke() {
      const s = v.value.trim();
      if (!s) return;
      const { actionType: o, payload: n } = v;
      Jt(), o === "create-project" ? Y.dispatch("create-project-submit", s) : o === "rename-project" && n && "projectId" in n ? Y.dispatch("rename-project-submit", { projectId: n.projectId, newName: s }) : o === "rename-section" && n && "sectionId" in n && Y.dispatch("rename-section", { sectionId: n.sectionId, newName: s });
    }
    function Be(s) {
      h.title = "删除项目确认", h.icon = "🗑️", h.danger = !0, h.alertText = `确定要彻底删除项目「${s.name}」吗？`, h.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！", h.confirmText = "彻底删除", h.actionType = "delete-project", h.payload = { projectId: s.id }, h.isOpen = !0;
    }
    function He(s) {
      T.isOpen = !1, h.title = "删除板块确认", h.icon = "🗑️", h.danger = !0, h.alertText = `确定要删除板块「${s.title}」吗？`, h.message = "板块内的任务将自动保留并移至默认收件箱。", h.confirmText = "删除板块", h.actionType = "delete-section", h.payload = { sectionId: s.sectionId }, h.isOpen = !0;
    }
    function Qt() {
      h.isOpen = !1;
    }
    function Ge() {
      const { actionType: s, payload: o } = h;
      Qt(), s === "delete-project" && o && "projectId" in o ? Y.dispatch("delete-project-submit", o.projectId) : s === "delete-section" && o && "sectionId" in o ? Y.dispatch("delete-section", { sectionId: o.sectionId }) : s === "delete-task" && o && "taskId" in o && Y.dispatch("delete-task-submit", o);
    }
    function qe(s) {
      Y.dispatch("switch-project", s);
    }
    function Zt(s) {
      s.key === "Escape" && (c.isOpen && (c.isOpen = !1, c.activeSubpanel = null), T.isOpen && (T.isOpen = !1));
    }
    return Z(() => H.active, (s) => {
      document.removeEventListener("keydown", Zt), s && document.addEventListener("keydown", Zt);
    }, { immediate: !0, flush: "sync" }), At(() => {
      document.removeEventListener("keydown", Zt), it();
    }), (s, o) => (a(), d("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: f
    }, [
      i(e).moveError && i(e).moveMessage ? (a(), d("p", os, C(i(e).moveMessage), 1)) : O("", !0),
      i(e).loading && i(e).columns.length === 0 ? (a(), d("p", ss, "加载中…")) : i(e).emptyText && i(e).columns.length === 0 ? (a(), d("p", ns, C(i(e).emptyText), 1)) : i(e).view === "projects" && i(e).projects.length === 0 ? (a(), d("div", is, [
        o[24] || (o[24] = t("div", { class: "empty-icon" }, "📁", -1)),
        o[25] || (o[25] = t("h3", null, "暂无自定义项目", -1)),
        o[26] || (o[26] = t("p", null, "你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！", -1)),
        t("button", {
          type: "button",
          class: "todoist-add-section-submit",
          style: { padding: "8px 18px", "font-size": "13px", cursor: "pointer" },
          onClick: ye
        }, "＋ 新建第一个项目")
      ])) : (a(), d(Q, { key: 4 }, [
        i(e).view === "projects" && i(e).projects.length ? (a(), d("div", as, [
          t("div", ls, [
            t("div", ds, [
              (a(!0), d(Q, null, lt(i(e).projects, (n) => (a(), d("button", {
                key: n.id,
                type: "button",
                class: B(["todoist-project-tab", { active: String(n.id) === String(i(e).activeProjectId) }]),
                onClick: (L) => qe(n.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: st({ background: n.colorHex || "#0ea5e9" })
                }, null, 4),
                t("span", cs, C(n.name), 1)
              ], 10, rs))), 128)),
              t("button", {
                type: "button",
                class: "todoist-project-new-btn",
                title: "创建新项目",
                onClick: ye
              }, "＋ 新建项目")
            ]),
            rt.value ? (a(), d("div", us, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: "重命名项目",
                onClick: o[0] || (o[0] = (n) => Fe(rt.value))
              }, [...o[27] || (o[27] = [
                t("span", { class: "action-icon" }, "✏️", -1),
                t("span", { class: "action-text" }, "重命名", -1)
              ])]),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: "删除项目",
                onClick: o[1] || (o[1] = (n) => Be(rt.value))
              }, [...o[28] || (o[28] = [
                t("span", { class: "action-icon" }, "🗑️", -1),
                t("span", { class: "action-text" }, "删除项目", -1)
              ])])
            ])) : O("", !0)
          ])
        ])) : O("", !0),
        t("div", ps, [
          (a(!0), d(Q, null, lt(i(e).columns, (n, L) => (a(), d("section", {
            key: n.sectionId || n.title || L,
            class: "todoist-board-column",
            "data-section-id": n.sectionId,
            "data-title": n.title,
            "data-column-index": L
          }, [
            t("header", vs, [
              t("h3", null, [
                Vt(C(n.title) + " ", 1),
                t("span", null, C(n.tasks.length), 1)
              ]),
              t("button", {
                type: "button",
                class: "todoist-column-more",
                title: n.sectionId ? "板块操作（重命名／删除／移动）" : "默认板块信息",
                onClick: A((l) => Le(n, L, l), ["stop"])
              }, "•••", 8, ms)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (l) => x(n, L, l)
            }, "＋ 添加任务", 8, gs),
            g.value === mt(n, L) ? (a(), d("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: A((l) => ue(n), ["prevent"])
            }, [
              ot(t("textarea", {
                "onUpdate:modelValue": o[2] || (o[2] = (l) => w.value = l),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (l) => je(l, n),
                onPaste: o[3] || (o[3] = (l) => W(l))
              }, null, 40, ys), [
                [ct, w.value]
              ]),
              $.value.length > 0 ? (a(), d("div", ks, [
                (a(!0), d(Q, null, lt($.value, (l, et) => (a(), d("div", {
                  key: et,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: l.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, hs),
                  t("span", ws, C(l.name), 1),
                  l.uploading ? (a(), d("span", Ts, "上传中…")) : O("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (V) => P(et)
                  }, "×", 8, _s)
                ]))), 128))
              ])) : O("", !0),
              t("div", xs, [
                t("button", {
                  type: "button",
                  disabled: yt.value,
                  onClick: J
                }, "取消", 8, Cs),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: yt.value
                }, C(yt.value ? $.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Ds)
              ])
            ], 40, bs)) : O("", !0),
            Mt(es, {
              tasks: i(pt)(n, L),
              "pinned-id": i(I) || R.value,
              "hidden-id": i(m) !== null ? i(I) : null,
              "is-preview": i(N),
              class: B(["todoist-board-list", { "drag-over": i(m) === L }]),
              "data-group-index": L,
              onDragover: A((l) => i(X)(l, L), ["prevent"]),
              onDragleave: (l) => i(gt)(l, L),
              onDrop: A((l) => i(Pt)(l, n), ["prevent"])
            }, {
              empty: we(() => [
                n.tasks.length === 0 && i(m) !== L ? (a(), d("p", $s, " 暂无任务 · 可拖到这里 ")) : O("", !0)
              ]),
              default: we(({ task: l, index: et }) => [
                t("article", {
                  class: B(["todoist-board-task", [
                    {
                      completed: l.completed,
                      "has-custom-color": !!l.customColorHex,
                      editing: R.value === l.id,
                      "dragging-task": !i(N)(l) && i(I) === l.id,
                      "drop-before": i(S) === l.id && !i(M),
                      "drop-after": i(S) === l.id && i(M),
                      "saving-position": i(e).movingTaskId === l.id,
                      "todoist-task-preview": i(N)(l),
                      "drag-origin-hidden": i(I) === l.id && !i(N)(l) && i(m) !== null
                    }
                  ]]),
                  style: st(l.customColorHex ? { "--task-custom-color": l.customColorHex } : {}),
                  "data-task-id": i(N)(l) ? void 0 : l.id,
                  "aria-hidden": i(N)(l) || void 0,
                  tabindex: i(N)(l) ? -1 : 0,
                  title: ht(),
                  draggable: !i(N)(l) && !l.completed && !i(e).loading && !i(e).movingTaskId && !i(e).moveNeedsRefresh && R.value !== l.id && !l.id.startsWith("optimistic-"),
                  onDragstart: (V) => i(tt)(V, l, n, et),
                  onDragend: o[6] || (o[6] = //@ts-ignore
                  (...V) => i(ft) && i(ft)(...V)),
                  onDragover: A((V) => i(Bt)(V, l, n, et), ["stop", "prevent"]),
                  onDrop: A((V) => i(Ht)(V, l, n, et), ["stop", "prevent"]),
                  onDblclick: (V) => Gt(l, V),
                  onClick: (V) => u(l, V),
                  onContextmenu: A((V) => ve(l, n, V), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: B(["todoist-board-check", { checked: l.completed }]),
                    disabled: i(N)(l) || i(e).movingTaskId === l.id,
                    title: l.completed ? "撤销完成" : "完成任务",
                    "aria-label": (l.completed ? "撤销完成：" : "完成：") + l.content,
                    onClick: A((V) => Ct(l, n), ["stop"])
                  }, null, 10, Ss),
                  t("div", Ps, [
                    i(e).movingTaskId === l.id ? (a(), d("span", Os, "保存中")) : O("", !0),
                    R.value === l.id ? ot((a(), d("textarea", {
                      key: 1,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: E,
                      "onUpdate:modelValue": o[4] || (o[4] = (V) => F.value = V),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (V) => y(V, l),
                      onBlur: (V) => Rt(l, !0),
                      onClick: o[5] || (o[5] = A(() => {
                      }, ["stop"]))
                    }, null, 40, Rs)), [
                      [ct, F.value]
                    ]) : (a(), d("p", Ms, C(l.content || "未命名任务"), 1)),
                    ce(l) ? (a(), d("p", js, C(ce(l)), 1)) : O("", !0),
                    xt(l) ? (a(), d("div", Ls, [
                      l.startDate && !l.dueDate ? (a(), d("span", {
                        key: 0,
                        class: "todoist-board-due start-only",
                        title: `开始时间：${l.startDate}`
                      }, " 🛫 自 " + C(i($t)(l.startDate)) + " 起 ", 9, As)) : l.startDate && l.dueDate ? (a(), d("span", {
                        key: 1,
                        class: "todoist-board-due date-range",
                        title: `时间区间：${l.startDate} 至 ${l.dueDate}`
                      }, " ⏱ " + C(i($t)(l.startDate)) + " ~ " + C(i($t)(l.dueDate)), 9, Ws)) : l.dueText ? (a(), d("span", {
                        key: 2,
                        class: B(["todoist-board-due", { recurring: l.isRecurring }]),
                        title: l.isRecurring ? `循环任务：${l.dueString || l.dueText}` : void 0
                      }, C(l.isRecurring ? "↻ " : "▣ ") + C(l.dueText), 11, Es)) : O("", !0),
                      (a(!0), d(Q, null, lt((l.labels || []).slice(0, 3), (V) => (a(), d("span", {
                        key: V,
                        class: "todoist-board-label"
                      }, "◇ " + C(V), 1))), 128)),
                      l.timedDeadlineText ? (a(), d("span", {
                        key: 3,
                        class: "todoist-board-timer",
                        title: (l.timedDurationMinutes || 0) + "分钟时间限制"
                      }, "⏱ " + C(l.timedDeadlineText), 9, zs)) : O("", !0),
                      l.extraCountText ? (a(), d("span", Us, C(l.extraCountText), 1)) : O("", !0)
                    ])) : O("", !0),
                    qt(l) ? (a(), d("div", {
                      key: 5,
                      class: "todoist-card-thumb-wrap",
                      title: "点击在小窗查看大图",
                      onClick: A((V) => Me(qt(l), l), ["stop"])
                    }, [
                      t("img", {
                        src: qt(l),
                        class: "todoist-card-thumb",
                        alt: "任务照片",
                        loading: "lazy"
                      }, null, 8, Ns),
                      o[29] || (o[29] = t("span", { class: "todoist-card-img-badge" }, "🖼️ 附件照片", -1))
                    ], 8, Ks)) : O("", !0)
                  ])
                ], 46, Is)
              ]),
              _: 2
            }, 1032, ["tasks", "pinned-id", "hidden-id", "is-preview", "data-group-index", "class", "onDragover", "onDragleave", "onDrop"])
          ], 8, fs))), 128)),
          i(e).view === "inbox" || i(e).view === "projects" ? (a(), d("div", Vs, [
            i(e).addingSection ? (a(), d("div", Fs, [
              ot(t("input", {
                "onUpdate:modelValue": o[8] || (o[8] = (n) => p.value = n),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  Tt(A(pe, ["prevent"]), ["enter"]),
                  Tt(Xt, ["esc"])
                ]
              }, null, 40, Ys), [
                [ct, p.value]
              ]),
              t("div", { class: "todoist-add-section-actions" }, [
                t("button", {
                  type: "button",
                  class: "todoist-add-section-submit",
                  onClick: pe
                }, "添加板块"),
                t("button", {
                  type: "button",
                  class: "todoist-add-section-cancel",
                  onClick: Xt
                }, "取消")
              ])
            ])) : (a(), d("button", {
              key: 0,
              type: "button",
              class: "todoist-board-add-column-btn",
              onClick: o[7] || (o[7] = (n) => i(e).addingSection = !0)
            }, [...o[30] || (o[30] = [
              t("span", { "aria-hidden": "true" }, "＋", -1),
              t("span", null, "添加板块", -1)
            ])]))
          ])) : O("", !0)
        ])
      ], 64)),
      T.isOpen && T.col ? (a(), d("div", {
        key: 5,
        class: "todoist-section-menu",
        style: st({ left: T.x + "px", top: T.y + "px" }),
        onClick: o[13] || (o[13] = A(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[9] || (o[9] = (n) => Ye(T.col))
        }, [...o[31] || (o[31] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        T.col.sectionId ? (a(), d("div", Bs, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !T.canMoveLeft,
            title: "向左移动板块",
            onClick: o[10] || (o[10] = (n) => fe(T.col, -1))
          }, "◀ 左移", 8, Hs),
          o[32] || (o[32] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !T.canMoveRight,
            title: "向右移动板块",
            onClick: o[11] || (o[11] = (n) => fe(T.col, 1))
          }, "右移 ▶", 8, Gs)
        ])) : O("", !0),
        T.col.sectionId ? (a(), d("div", qs)) : O("", !0),
        T.col.sectionId ? (a(), d("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[12] || (o[12] = (n) => He(T.col))
        }, [...o[33] || (o[33] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : O("", !0)
      ], 4)) : O("", !0),
      c.isOpen && c.task ? (a(), d("div", {
        key: 6,
        class: "todoist-task-context-menu",
        style: st({ left: c.x + "px", top: c.y + "px" }),
        role: "menu",
        onClick: o[20] || (o[20] = A(() => {
        }, ["stop"]))
      }, [
        t("div", Xs, [
          t("span", Js, C(c.task.content || "任务操作"), 1)
        ]),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item",
          role: "menuitem",
          onClick: Ne
        }, [...o[34] || (o[34] = [
          t("span", {
            class: "todoist-menu-icon",
            "aria-hidden": "true"
          }, "📌", -1),
          t("span", { class: "todoist-menu-text" }, "移动到工作台", -1)
        ])]),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: c.activeSubpanel === "labels" }]),
          onClick: o[14] || (o[14] = (n) => Wt("labels"))
        }, [
          o[35] || (o[35] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          o[36] || (o[36] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", Qs, C(c.task.labels && c.task.labels.length ? `已选 ${c.task.labels.length}` : "无"), 1)
        ], 2),
        c.activeSubpanel === "labels" ? (a(), d("div", Zs, [
          t("div", tn, [
            ot(t("input", {
              "onUpdate:modelValue": o[15] || (o[15] = (n) => c.newLabelText = n),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: Tt(A(ge, ["prevent"]), ["enter"])
            }, null, 40, en), [
              [ct, c.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: ge
            }, "＋")
          ]),
          t("div", on, [
            (a(!0), d(Q, null, lt(nt.value, (n) => (a(), d("button", {
              key: n,
              type: "button",
              class: B(["todoist-label-chip", { selected: me(n) }]),
              onClick: (L) => Ae(n)
            }, [
              t("span", null, "◇ " + C(n), 1),
              me(n) ? (a(), d("span", nn, "✓")) : O("", !0)
            ], 10, sn))), 128))
          ])
        ])) : O("", !0),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: c.activeSubpanel === "recur" }]),
          onClick: o[16] || (o[16] = (n) => Wt("recur"))
        }, [
          o[37] || (o[37] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          o[38] || (o[38] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: st(c.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, C(c.task.isRecurring ? c.task.dueString || "循环" : "无"), 5)
        ], 2),
        c.activeSubpanel === "recur" ? (a(), d("div", an, [
          t("div", ln, [
            (a(), d(Q, null, lt(j, (n) => t("button", {
              key: n.rule,
              type: "button",
              class: B(["todoist-recur-chip", { selected: We(n.rule) }]),
              onClick: (L) => Ee(n.rule, n.label)
            }, [
              t("span", null, C(n.icon), 1),
              t("span", null, C(n.label), 1)
            ], 10, dn)), 64))
          ]),
          t("div", rn, [
            ot(t("input", {
              "onUpdate:modelValue": o[17] || (o[17] = (n) => c.customRecurText = n),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: Tt(A(be, ["prevent"]), ["enter"])
            }, null, 40, cn), [
              [ct, c.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: be
            }, "确定")
          ]),
          c.task.isRecurring ? (a(), d("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: ze
          }, "❌ 清除循环（转为单次任务）")) : O("", !0)
        ])) : O("", !0),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: c.activeSubpanel === "color" }]),
          onClick: o[18] || (o[18] = (n) => Wt("color"))
        }, [
          o[39] || (o[39] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          o[40] || (o[40] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", un, [
            G.value.id === "none" ? (a(), d("span", pn, "⊘")) : (a(), d("span", {
              key: 1,
              class: "todoist-color-dot",
              style: st({
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: G.value.hex
              })
            }, null, 4)),
            Vt(" " + C(G.value.name), 1)
          ])
        ], 2),
        c.activeSubpanel === "color" ? (a(), d("div", fn, [
          t("div", vn, [
            (a(), d(Q, null, lt(r, (n) => t("button", {
              key: n.id,
              type: "button",
              class: B(["todoist-color-swatch", { selected: G.value.id === n.id }]),
              title: n.name,
              onClick: (L) => Ue(n.id)
            }, [
              t("span", {
                class: B(["todoist-color-dot", { none: n.id === "none" }]),
                style: st(n.id !== "none" ? { background: n.hex } : {})
              }, C(n.id === "none" ? G.value.id === "none" ? "✓" : "⊘" : G.value.id === n.id ? "✓" : ""), 7),
              t("span", gn, C(n.name), 1)
            ], 10, mn)), 64))
          ])
        ])) : O("", !0),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: c.activeSubpanel === "project" }]),
          onClick: o[19] || (o[19] = (n) => Wt("project"))
        }, [...o[41] || (o[41] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        c.activeSubpanel === "project" ? (a(), d("div", {
          key: 3,
          class: B(["todoist-project-flyout", { "open-left": c.flyoutOpenLeft }]),
          style: st(c.flyoutStyle)
        }, [
          (a(!0), d(Q, null, lt(i(e).projects, (n) => (a(), d("button", {
            key: n.id,
            type: "button",
            class: B(["todoist-project-flyout-item", { active: String(n.id) === z.value }]),
            disabled: !!i(e).movingTaskId || String(n.id) === z.value,
            onClick: (L) => Ke(n)
          }, [
            o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", yn, C(n.name), 1),
            String(n.id) === z.value ? (a(), d("span", kn, "当前")) : O("", !0)
          ], 10, bn))), 128))
        ], 6)) : O("", !0),
        o[44] || (o[44] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: Ve
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", hn, C(c.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : O("", !0),
      v.isOpen && i(H).active ? (a(), d("div", {
        key: 7,
        class: "todoist-dialog-overlay",
        onKeydown: Tt(A(Jt, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: o[22] || (o[22] = A(() => {
          }, ["stop"]))
        }, [
          t("div", Tn, [
            o[45] || (o[45] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
            t("h3", _n, C(v.title), 1)
          ]),
          t("div", xn, [
            v.message ? (a(), d("p", Cn, C(v.message), 1)) : O("", !0),
            ot(t("input", {
              ref_key: "promptInputRef",
              ref: K,
              "onUpdate:modelValue": o[21] || (o[21] = (n) => v.value = n),
              type: "text",
              class: "todoist-dialog-input",
              placeholder: v.placeholder,
              onKeydown: Tt(A(ke, ["prevent"]), ["enter"])
            }, null, 40, Dn), [
              [ct, v.value]
            ])
          ]),
          t("div", $n, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: Jt
            }, "取消"),
            t("button", {
              type: "button",
              class: "todoist-dialog-btn primary",
              onClick: ke
            }, C(v.confirmText || "确定"), 1)
          ])
        ])
      ], 40, wn)) : O("", !0),
      h.isOpen && i(H).active ? (a(), d("div", {
        key: 8,
        class: "todoist-dialog-overlay",
        onKeydown: Tt(A(Qt, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: o[23] || (o[23] = A(() => {
          }, ["stop"]))
        }, [
          t("div", Sn, [
            t("span", Pn, C(h.icon || "⚠️"), 1),
            t("h3", On, C(h.title), 1)
          ]),
          t("div", Rn, [
            h.danger ? (a(), d("div", Mn, [
              t("div", jn, C(h.alertText), 1)
            ])) : O("", !0),
            t("p", Ln, C(h.message), 1)
          ]),
          t("div", An, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: Qt
            }, "取消"),
            t("button", {
              type: "button",
              class: B(["todoist-dialog-btn", h.danger ? "danger" : "primary"]),
              onClick: Ge
            }, C(h.confirmText || "确定"), 3)
          ])
        ])
      ], 40, In)) : O("", !0)
    ]));
  }
}), En = /* @__PURE__ */ Yt(Wn, [["__scopeId", "data-v-19108c84"]]), zn = { class: "inspector-title-row" }, Un = ["href"], Kn = {
  key: 0,
  class: "inspector-body"
}, Nn = {
  key: 0,
  class: "draft-status",
  role: "status",
  "aria-live": "polite"
}, Vn = ["disabled"], Fn = { key: 1 }, Yn = ["disabled"], Bn = {
  key: 1,
  class: "draft-status",
  role: "alert"
}, Hn = { class: "inspector-section" }, Gn = ["disabled", "onKeydown"], qn = { class: "inspector-section" }, Xn = { class: "section-head-row" }, Jn = { class: "inspector-label" }, Qn = {
  key: 0,
  style: { "font-weight": "normal", opacity: "0.85" }
}, Zn = ["disabled"], ti = {
  key: 0,
  class: "attached-img-grid in-desc"
}, ei = ["onClick"], oi = ["src"], si = { class: "attached-img-info" }, ni = ["title"], ii = { class: "attached-img-actions" }, ai = ["onClick"], li = ["onClick"], di = { class: "desc-composite-footer" }, ri = {
  key: 0,
  class: "composite-hint uploading"
}, ci = {
  key: 1,
  class: "composite-hint dragging"
}, ui = {
  key: 2,
  class: "composite-hint"
}, pi = { class: "inspector-section inspector-time-hub" }, fi = { class: "section-head-row" }, vi = { class: "hub-header-title" }, mi = { class: "time-hub-cards-row" }, gi = { class: "time-hub-card start-card" }, bi = { class: "time-card-head" }, yi = { class: "time-card-inputs" }, ki = { class: "time-input-wrap" }, hi = { class: "time-hub-card due-card" }, wi = { class: "time-card-head" }, Ti = { class: "time-card-inputs" }, _i = { class: "time-input-wrap" }, xi = "todoistInspectorPosition", Ci = /* @__PURE__ */ St({
  __name: "TodoistInspectorDrawer",
  setup(_) {
    const e = k, p = ut(() => kt.get(e.taskId)), {
      panelRef: g,
      headerRef: w,
      initialStyle: $,
      onHeaderPointerDown: W,
      onResizePointerDown: P
    } = Re({
      windowId: "todoist-inspector",
      storageKey: xi,
      defaultWidth: 400,
      defaultHeight: 620,
      defaultLeft: typeof window < "u" ? Math.max(16, window.innerWidth - 440) : 960,
      defaultTop: 76,
      minWidth: 320,
      minHeight: 360,
      active: () => e.isOpen && H.active
    }), R = U(""), F = U(""), E = U(""), T = U(""), v = U(""), K = U(""), h = U(!1), c = U(!1), D = U(null);
    Z(() => e.title, (y) => {
      R.value = y || "";
    }, { immediate: !0 }), Z(() => e.description, (y) => {
      F.value = (y || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), Z(() => e.startDate, (y) => {
      E.value = y || "";
    }, { immediate: !0 }), Z(() => e.startTime, (y) => {
      T.value = y || "";
    }, { immediate: !0 }), Z(() => e.dueDate, (y) => {
      v.value = y || "";
    }, { immediate: !0 }), Z(() => e.dueTime, (y) => {
      K.value = y || "";
    }, { immediate: !0 });
    const b = ut(() => {
      const y = E.value, u = T.value, x = v.value, J = K.value;
      if (y && x) {
        const it = $t(y, u), yt = $t(x, J);
        return `${it} ~ ${yt}`;
      }
      return y && !x ? `自 ${$t(y, u)} 起 (无截止)` : !y && x ? `截止 ${$t(x, J)}` : "";
    }), r = ut(() => {
      const y = E.value, u = v.value;
      return y && u ? "status-range" : y && !u ? "status-start-only" : !y && u ? "status-due-only" : "";
    });
    function j() {
      const y = /* @__PURE__ */ new Date();
      return `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
    }
    function z() {
      T.value && !E.value && (E.value = j()), dt.setStartDateAndTime(E.value, T.value);
    }
    function rt() {
      T.value = "", z();
    }
    function nt() {
      E.value = "", T.value = "", z();
    }
    function G() {
      K.value && !v.value && (v.value = j()), dt.setDueDateAndTime(v.value, K.value);
    }
    function mt() {
      K.value = "", G();
    }
    function ht() {
      v.value = "", K.value = "", G();
    }
    function xt() {
      nt(), ht();
    }
    const f = ut(() => {
      const y = [], u = e.description || "", x = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let J;
      for (; (J = x.exec(u)) !== null; )
        y.push({
          name: J[1] || "任务照片",
          url: J[2]
        });
      return y;
    });
    let I, m;
    function S() {
      const y = (e.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`);
      return {
        taskId: e.taskId,
        title: R.value,
        description: [F.value.trim(), y].filter(Boolean).join(`

`)
      };
    }
    function M() {
      clearTimeout(I), I = void 0;
      const y = m;
      if (m = void 0, y?.taskId && y.title.trim())
        return dt.saveTitleAndDesc(y.title, y.description, y.taskId);
    }
    function N(y) {
      y && "isComposing" in y && y.isComposing || (m = S(), dt.stageTitleDraft(m.taskId, m.title, m.description), clearTimeout(I), I = setTimeout(M, 800));
    }
    Z(() => e.taskId, () => M(), { flush: "sync" });
    function pt() {
      M(), dt.close();
    }
    function tt(y) {
      y && "isComposing" in y && y.isComposing || M();
    }
    function ft() {
      m = S(), M();
    }
    function X(y) {
      const u = Pt(y);
      u && (y.preventDefault(), y.stopPropagation(), Ct(u));
    }
    function gt() {
      H.active && D.value?.click();
    }
    async function Bt(y) {
      const u = y.target;
      if (!H.active) {
        u.value = "";
        return;
      }
      const x = u.files?.[0];
      x && await Ct(x), u.value = "";
    }
    async function Ht(y) {
      c.value = !1;
      const u = y.dataTransfer?.files?.[0];
      u && (u.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(u.name)) && await Ct(u);
    }
    function Pt(y) {
      const u = y.clipboardData;
      if (!u) return null;
      if (u.files && u.files.length > 0)
        for (let x = 0; x < u.files.length; x++) {
          const J = u.files[x];
          if (J.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(J.name))
            return J;
        }
      if (u.items && u.items.length > 0)
        for (let x = 0; x < u.items.length; x++) {
          const J = u.items[x];
          if (J.type.includes("image")) {
            const it = J.getAsFile();
            if (it) return it;
          }
        }
      return null;
    }
    async function Ct(y) {
      if (h.value || !H.active || !e.taskId) return;
      const u = e.taskId;
      h.value = !0;
      try {
        if (await M(), e.taskId !== u || !e.isOpen || !H.active) return;
        await dt.attachImageToTask(y);
      } catch (x) {
        e.taskId === u && (e.error = x instanceof Error ? x.message : "上传失败");
      } finally {
        h.value = !1;
      }
    }
    function Gt(y) {
      const u = Pt(y);
      u && (y.preventDefault(), Ct(u));
    }
    function Ot(y) {
      if (!e.isOpen || !H.active) return;
      const u = Pt(y);
      u && (y.preventDefault(), y.stopPropagation(), Ct(u));
    }
    Z(() => H.active, (y) => {
      window.removeEventListener("paste", Ot, { capture: !0 }), y && window.addEventListener("paste", Ot, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), At(() => {
      M(), window.removeEventListener("paste", Ot, { capture: !0 });
    });
    async function Rt(y) {
      const u = e.description || "", x = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), J = u.replace(new RegExp(`!\\[[^\\]]*\\]\\(${x}\\)`, "g"), "").trim();
      await dt.saveTitleAndDesc(e.title, J);
    }
    return (y, u) => ot((a(), d("aside", {
      ref_key: "panelRef",
      ref: g,
      class: "todoist-inspector-window",
      style: st(i($)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: Gt
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: w,
        class: "inspector-header",
        onPointerdown: u[1] || (u[1] = (x) => i(W)(x))
      }, [
        t("div", zn, [
          u[14] || (u[14] = t("span", { class: "inspector-badge" }, "📋 任务属性", -1)),
          i(e).url ? (a(), d("a", {
            key: 0,
            href: i(e).url,
            target: "_blank",
            rel: "noreferrer",
            class: "inspector-external-link",
            title: "在 Todoist 官方网页中打开"
          }, "在 Todoist 中打开 ↗", 8, Un)) : O("", !0)
        ]),
        t("button", {
          type: "button",
          class: "inspector-close-btn no-drag",
          "aria-label": "收起拓展栏",
          title: "关闭浮窗 (Esc)",
          onPointerdown: u[0] || (u[0] = A(() => {
          }, ["stop"])),
          onClick: A(pt, ["stop"])
        }, "×", 32)
      ], 544),
      i(e).isOpen ? (a(), d("div", Kn, [
        p.value ? (a(), d("div", Nn, [
          p.value.status === "failed" ? (a(), d(Q, { key: 0 }, [
            t("span", null, "保存未确认，草稿保留在当前页面。" + C(p.value.error), 1),
            t("button", {
              type: "button",
              disabled: i(e).saving || !R.value.trim(),
              onClick: ft
            }, "重试保存", 8, Vn)
          ], 64)) : (a(), d("span", Fn, C(p.value.status === "saving" ? "正在保存…" : R.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), 1)),
          p.value.status === "editing" ? (a(), d("button", {
            key: 2,
            type: "button",
            disabled: i(e).saving || !R.value.trim(),
            onClick: ft
          }, "保存草稿", 8, Yn)) : O("", !0),
          u[15] || (u[15] = t("small", null, "刷新或关闭浏览器标签页会丢失未保存草稿。", -1))
        ])) : O("", !0),
        i(e).error ? (a(), d("p", Bn, C(i(e).error), 1)) : O("", !0),
        t("section", Hn, [
          u[16] || (u[16] = t("label", { class: "inspector-label" }, "任务标题", -1)),
          ot(t("input", {
            "onUpdate:modelValue": u[2] || (u[2] = (x) => R.value = x),
            disabled: h.value,
            type: "text",
            class: "inspector-input-title",
            placeholder: "任务标题",
            onInput: N,
            onCompositionend: N,
            onBlur: tt,
            onKeydown: Tt(A(tt, ["prevent"]), ["enter"])
          }, null, 40, Gn), [
            [ct, R.value]
          ])
        ]),
        t("section", qn, [
          t("div", Xn, [
            t("label", Jn, [
              u[17] || (u[17] = Vt(" 任务描述 ", -1)),
              f.value.length ? (a(), d("span", Qn, " · 包含 " + C(f.value.length) + " 张照片 ", 1)) : O("", !0)
            ]),
            t("button", {
              type: "button",
              class: "inspector-add-img-btn",
              title: "选择本地图片文件上传至任务",
              onClick: gt
            }, "＋ 上传照片")
          ]),
          t("div", {
            class: B(["inspector-desc-composite-box", { dragging: c.value, uploading: h.value }]),
            onDragover: u[4] || (u[4] = A((x) => c.value = !0, ["prevent"])),
            onDragleave: u[5] || (u[5] = A((x) => c.value = !1, ["prevent"])),
            onDrop: A(Ht, ["prevent"])
          }, [
            ot(t("textarea", {
              "onUpdate:modelValue": u[3] || (u[3] = (x) => F.value = x),
              disabled: h.value,
              rows: "8",
              class: "inspector-textarea-desc",
              placeholder: "添加文字说明…（直接拖入照片，或在此 Ctrl+V 粘贴图片即可贴入）",
              onInput: N,
              onCompositionend: N,
              onBlur: tt,
              onPaste: X
            }, null, 40, Zn), [
              [ct, F.value]
            ]),
            f.value.length > 0 ? (a(), d("div", ti, [
              (a(!0), d(Q, null, lt(f.value, (x, J) => (a(), d("div", {
                key: J,
                class: "attached-img-card"
              }, [
                t("div", {
                  class: "attached-img-link",
                  title: "点击在小窗查看大图",
                  onClick: (it) => i(Ft).open(x.url, x.name)
                }, [
                  t("img", {
                    src: x.url,
                    class: "attached-preview-img",
                    alt: "任务照片",
                    loading: "lazy"
                  }, null, 8, oi)
                ], 8, ei),
                t("div", si, [
                  t("span", {
                    class: "attached-img-name",
                    title: x.name
                  }, C(x.name), 9, ni),
                  t("div", ii, [
                    t("button", {
                      type: "button",
                      class: "attached-open-btn",
                      title: "点击在小窗查看大图",
                      onClick: (it) => i(Ft).open(x.url, x.name)
                    }, "查看 ↗", 8, ai),
                    t("button", {
                      type: "button",
                      class: "attached-del-btn",
                      title: "从任务中移除此照片",
                      onClick: (it) => Rt(x.url)
                    }, "×", 8, li)
                  ])
                ])
              ]))), 128))
            ])) : O("", !0),
            t("div", di, [
              h.value ? (a(), d("span", ri, "⏳ 照片上传同步中…")) : c.value ? (a(), d("span", ci, "📥 松开鼠标立即存入照片")) : (a(), d("span", ui, "📷 拖入图片或按 Ctrl+V 粘贴照片")),
              t("button", {
                type: "button",
                class: "composite-attach-icon",
                title: "选择本地照片",
                onClick: A(gt, ["stop"])
              }, "📎")
            ])
          ], 34),
          t("input", {
            ref_key: "fileInputRef",
            ref: D,
            type: "file",
            accept: "image/*",
            style: { display: "none" },
            onChange: Bt
          }, null, 544)
        ]),
        t("section", pi, [
          t("div", fi, [
            t("div", vi, [
              u[18] || (u[18] = t("label", { class: "inspector-label" }, "时间规划", -1)),
              b.value ? (a(), d("span", {
                key: 0,
                class: B(["time-plan-badge", r.value])
              }, C(b.value), 3)) : O("", !0)
            ]),
            E.value || v.value ? (a(), d("button", {
              key: 0,
              type: "button",
              class: "inspector-clear-all-dates-btn",
              title: "清空全部时间设置",
              onClick: xt
            }, " 清空时间 ")) : O("", !0)
          ]),
          t("div", mi, [
            t("div", gi, [
              t("div", bi, [
                u[19] || (u[19] = t("span", { class: "time-card-label" }, "🛫 开始时间", -1)),
                E.value || T.value ? (a(), d("button", {
                  key: 0,
                  type: "button",
                  class: "time-clear-btn",
                  title: "清除开始时间",
                  onClick: nt
                }, "✕")) : O("", !0)
              ]),
              t("div", yi, [
                ot(t("input", {
                  "onUpdate:modelValue": u[6] || (u[6] = (x) => E.value = x),
                  type: "date",
                  class: "inspector-date-input",
                  title: "选择开始日期",
                  onChange: z
                }, null, 544), [
                  [ct, E.value]
                ]),
                t("div", ki, [
                  ot(t("input", {
                    "onUpdate:modelValue": u[7] || (u[7] = (x) => T.value = x),
                    type: "time",
                    class: "inspector-time-input",
                    placeholder: "具体时间",
                    title: "随时设置具体时间 (如 12:00)",
                    onChange: z
                  }, null, 544), [
                    [ct, T.value]
                  ]),
                  T.value ? (a(), d("button", {
                    key: 0,
                    type: "button",
                    class: "time-sub-clear",
                    title: "清除具体时间",
                    onClick: rt
                  }, "×")) : O("", !0)
                ])
              ])
            ]),
            u[21] || (u[21] = t("div", { class: "time-hub-arrow" }, "至", -1)),
            t("div", hi, [
              t("div", wi, [
                u[20] || (u[20] = t("span", { class: "time-card-label" }, "▣ 截止日期", -1)),
                v.value || K.value ? (a(), d("button", {
                  key: 0,
                  type: "button",
                  class: "time-clear-btn",
                  title: "清除截止时间",
                  onClick: ht
                }, "✕")) : O("", !0)
              ]),
              t("div", Ti, [
                ot(t("input", {
                  "onUpdate:modelValue": u[8] || (u[8] = (x) => v.value = x),
                  type: "date",
                  class: "inspector-date-input",
                  title: "选择截止日期",
                  onChange: G
                }, null, 544), [
                  [ct, v.value]
                ]),
                t("div", _i, [
                  ot(t("input", {
                    "onUpdate:modelValue": u[9] || (u[9] = (x) => K.value = x),
                    type: "time",
                    class: "inspector-time-input",
                    placeholder: "具体时间",
                    title: "随时设置具体时间 (如 12:00)",
                    onChange: G
                  }, null, 544), [
                    [ct, K.value]
                  ]),
                  K.value ? (a(), d("button", {
                    key: 0,
                    type: "button",
                    class: "time-sub-clear",
                    title: "清除具体时间",
                    onClick: mt
                  }, "×")) : O("", !0)
                ])
              ])
            ])
          ])
        ])
      ])) : O("", !0),
      t("i", {
        class: "todoist-resize-handle todoist-resize-n",
        "data-resize-edge": "n",
        "aria-hidden": "true",
        onPointerdown: u[10] || (u[10] = (x) => i(P)(x, "n"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-e",
        "data-resize-edge": "e",
        "aria-hidden": "true",
        onPointerdown: u[11] || (u[11] = (x) => i(P)(x, "e"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-s",
        "data-resize-edge": "s",
        "aria-hidden": "true",
        onPointerdown: u[12] || (u[12] = (x) => i(P)(x, "s"))
      }, null, 32),
      t("i", {
        class: "todoist-resize-handle todoist-resize-w",
        "data-resize-edge": "w",
        "aria-hidden": "true",
        onPointerdown: u[13] || (u[13] = (x) => i(P)(x, "w"))
      }, null, 32)
    ], 36)), [
      [ne, i(e).isOpen]
    ]);
  }
}), Di = /* @__PURE__ */ Yt(Ci, [["__scopeId", "data-v-af6c469c"]]), $i = { class: "vue-todoist-workspace-wrapper" }, Ii = { class: "todoist-head-title-wrap" }, Si = { id: "todoist-workspace-title" }, Pi = {
  id: "todoist-view-tabs",
  class: "todoist-view-tabs",
  "aria-label": "Todoist 视图"
}, Oi = {
  class: "muted small",
  role: "status"
}, Ri = ["aria-expanded"], Mi = {
  key: 1,
  class: "todoist-workspace-main-wrap"
}, ji = { class: "todoist-workspace-cal-area" }, Li = { class: "todoist-workspace-task-area" }, Ai = "todoistWorkspacePosition", qi = /* @__PURE__ */ St({
  __name: "TodoistWorkspace",
  setup(_) {
    const e = U(!1), p = Xe(() => import("./TodoistAccountSettings-Dp722bKz.js")), g = U(!1), w = U(!1), $ = U(!document.hidden), W = U(!1), P = ut(() => H.visible && $.value);
    H.session++, H.active = P.value;
    let R = !1;
    const F = U(null), E = eo;
    function T() {
      v.value && (v.value.style.removeProperty("width"), v.value.style.removeProperty("height"), v.value.style.removeProperty("left"), v.value.style.removeProperty("top"), v.value.style.removeProperty("right"), v.value.style.removeProperty("bottom"), v.value.style.removeProperty("margin"), v.value.style.removeProperty("transform"));
    }
    Z(() => H.visible, (m) => {
      m && (E.isOpen = !0, H.active = $.value, Y.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: v,
      headerRef: K,
      initialStyle: h,
      stopInteractions: c,
      onHeaderPointerDown: D,
      onResizePointerDown: b,
      bringToFront: r
    } = Re({
      windowId: "todoist",
      storageKey: Ai,
      defaultWidth: 980,
      defaultHeight: 640,
      defaultLeft: Math.max(340, typeof window < "u" ? Math.floor(window.innerWidth - 1e3) : 480),
      defaultTop: 68,
      minWidth: 520,
      minHeight: 380,
      active: () => P.value
    }), j = () => v.value;
    function z() {
      ie(), so(), no(), dt.cancelReads(), c(), window.removeEventListener("keydown", G);
    }
    const rt = Ze(z);
    function nt() {
      $.value = !document.hidden;
    }
    function G(m) {
      m.key === "Escape" && k.isOpen && (m.preventDefault(), m.stopPropagation(), dt.close());
    }
    Z(P, (m) => {
      H.active = m, m ? (window.addEventListener("keydown", G), R || (R = !0, Y.loadWorkspace()), bt(() => {
        P.value && r();
      })) : z();
    }, { flush: "sync" }), Z(g, (m) => {
      m && (w.value = !0);
    }), Z([P, e, Ce], ([m, S, M]) => {
      if (!(!m || !S || !M) && (Ce.value = null, io("todoist") === M.transition)) {
        if (H.pendingWrites || k.isOpen && k.taskId !== M.id) {
          ae.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        k.isOpen && k.taskId === M.id || dt.openTask(M.id);
      }
    }, { flush: "post" }), le(() => {
      e.value = !0, W.value && bt(T), Et.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: j }), document.addEventListener("visibilitychange", nt), P.value && (window.addEventListener("keydown", G), R || (R = !0, Y.loadWorkspace()), De.refresh());
    }), At(() => {
      to(), rt(), document.removeEventListener("visibilitychange", nt), Et.unregister("todoist", j), dt.close(), Object.assign(k, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), Y.updateState({
        accountConfigured: null,
        columns: [],
        projects: [],
        availableLabels: [],
        loading: !1,
        view: "inbox",
        activeProjectId: "",
        activeProjectName: "",
        emptyText: "",
        addingSection: !1,
        activeComposerSectionId: null
      }), oe.updateState({ title: "收件箱", isSaving: !1, isCalendarOpen: !0, isLabelPopoverOpen: !1 }), De.update([]);
    });
    function mt() {
      oe.toggleCalendar();
    }
    function ht() {
      oe.refresh();
    }
    function xt() {
      Y.updateState({ accountConfigured: !0 }), P.value && Y.loadWorkspace(void 0, void 0, !0);
    }
    function f() {
      Et.minimize("todoist");
    }
    function I() {
      H.visible = !1, E.isOpen = !1, Et.close("todoist");
    }
    return (m, S) => (a(), d("div", $i, [
      ot(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: v,
        class: "card wide todoist-workspace",
        style: st(i(h)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: K,
          class: "todoist-workspace-head",
          onPointerdown: S[4] || (S[4] = (M) => i(D)(M))
        }, [
          t("div", Ii, [
            S[10] || (S[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Si, C(i(E).title), 1)
          ]),
          t("nav", Pi, [
            Mt(co)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: B(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: i(E).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: mt
          }, " 📅 日历 ", 2),
          S[11] || (S[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Oi, C(i(H).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: F,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": g.value,
            onClick: S[0] || (S[0] = A((M) => g.value = !g.value, ["stop"]))
          }, " ⚙️ ", 8, Ri),
          w.value ? (a(), Te(i(p), {
            key: 0,
            visible: P.value && g.value,
            anchor: F.value,
            onClose: S[1] || (S[1] = (M) => g.value = !1),
            onAccountSaved: xt
          }, null, 8, ["visible", "anchor"])) : O("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: "刷新",
            onClick: ht
          }, " ↻ "),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: "最小化（标签保留）",
            onPointerdown: S[2] || (S[2] = A(() => {
            }, ["stop"])),
            onClick: A(f, ["stop"])
          }, " − ", 32),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: "隐藏窗口 (Esc)；Dock 退出释放窗口资源",
            onPointerdown: S[3] || (S[3] = A(() => {
            }, ["stop"])),
            onClick: A(I, ["stop"])
          }, " ✕ ", 32)
        ], 544),
        i(_t).accountConfigured === !1 ? (a(), Te(ao, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: S[5] || (S[5] = (M) => g.value = !0)
        })) : (a(), d("div", Mi, [
          ot(t("div", ji, [
            Mt(Jo)
          ], 512), [
            [ne, i(E).isCalendarOpen]
          ]),
          t("div", Li, [
            Mt(En)
          ])
        ])),
        Mt(Di),
        S[12] || (S[12] = t("div", {
          id: "todoist-toast-container",
          class: "todoist-toast-container",
          "aria-live": "polite"
        }, null, -1)),
        W.value ? O("", !0) : (a(), d(Q, { key: 2 }, [
          t("i", {
            class: "todoist-resize-handle todoist-resize-n",
            "data-resize-edge": "n",
            "aria-hidden": "true",
            onPointerdown: S[6] || (S[6] = (M) => i(b)(M, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: S[7] || (S[7] = (M) => i(b)(M, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: S[8] || (S[8] = (M) => i(b)(M, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: S[9] || (S[9] = (M) => i(b)(M, "w"))
          }, null, 32)
        ], 64))
      ], 4), [
        [ne, i(H).visible]
      ])
    ]));
  }
});
export {
  qi as default
};
