import { f as St, g as a, h as d, F as Q, i as t, x as i, s as B, r as It, o as le, j as Vt, t as C, z as dt, k as E, u as O, B as it, w as tt, d as At, b as K, E as Oe, n as ht, H as ke, c as ft, q as nt, v as pt, l as Mt, K as we, A as _t, D as ne, I as Te, J as Xe } from "./vendor-vue-BUkfvXUI.js";
import { a as Je, t as H, w as Qe, o as Ze, p as to } from "./module-state-BVJNDzfS.js";
import { t as _e, e as xe, b as kt, a as Y, f as ie, c as eo, d as oe } from "./main-workspace-store-MJn0Q4qx.js";
import { todoistCalendarSidebarController as lt, todoistCalendarSidebarState as oo, cancelTodoistDateReads as so } from "./calendar-sidebar-store-PcAZpNPl.js";
import { p as Ce, t as De, c as no } from "./task-navigation-DGbsSQqt.js";
import { u as Re } from "./useWindowDraggable-ClzyorH0.js";
import { b as io, w as Wt } from "./read-session-BWENvNUM.js";
import { A as ao } from "./AccountSetupGuide-CyxqXFu_.js";
import { i as Ft } from "./image-viewer-store-Bj2Qq7Nf.js";
import { t as ut, a as lo, s as ro, p as zt, g as $e, f as $t } from "./todoist.service-DeCQ21Vr.js";
import { _ as Yt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { w as ae } from "./search.service-BNKrftAD.js";
const co = /* @__PURE__ */ St({
  __name: "TodoistWorkspaceTabs",
  setup(T) {
    return (e, p) => (a(), d(Q, null, [
      t("button", {
        type: "button",
        "data-view": "inbox",
        class: B({ on: i(xe).view === "inbox" }),
        title: "收件箱",
        onClick: p[0] || (p[0] = (m) => i(_e).switchView("inbox"))
      }, [...p[2] || (p[2] = [
        t("span", { class: "todoist-tab-icon" }, "📥", -1),
        t("span", { class: "todoist-tab-text" }, "收件箱", -1)
      ])], 2),
      t("button", {
        type: "button",
        "data-view": "projects",
        class: B({ on: i(xe).view === "projects" }),
        title: "项目",
        onClick: p[1] || (p[1] = (m) => i(_e).switchView("projects"))
      }, [...p[3] || (p[3] = [
        t("span", { class: "todoist-tab-icon" }, "📁", -1),
        t("span", { class: "todoist-tab-text" }, "项目", -1)
      ])], 2)
    ], 64));
  }
}), yt = It(/* @__PURE__ */ new Map());
let uo = 0;
function Ie(T, e, p, m = "editing") {
  const _ = ++uo;
  return yt.set(T, { revision: _, title: e, description: p, status: m, error: "" }), _;
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
  url: "",
  commentAttachments: []
});
let se = Promise.resolve(), Ut = 0, Se = Promise.resolve();
const Kt = /* @__PURE__ */ new Map();
let Lt = 0;
const Dt = /* @__PURE__ */ new Map();
function jt(T = !0) {
  T && Lt++;
  for (const e of Dt.values()) e.abort();
  Dt.clear(), k.loading = !1;
}
function po(T) {
  Dt.get(T)?.abort();
  const e = new AbortController();
  Dt.set(T, e);
  const p = Lt, m = k.taskId;
  return {
    signal: e.signal,
    current: () => !e.signal.aborted && p === Lt && k.isOpen && m === k.taskId && Dt.get(T) === e,
    finish: () => {
      Dt.get(T) === e && Dt.delete(T);
    }
  };
}
function Nt() {
  jt(!1);
  const T = k.taskId, e = Lt;
  return { taskId: T, current: () => k.isOpen && e === Lt && T === k.taskId };
}
function fo(T) {
  return new Promise((e) => {
    const p = new FileReader();
    p.onload = () => e(p.result || ""), p.onerror = () => e(""), p.readAsDataURL(T);
  });
}
function Pe(T, e, p) {
  for (const m of kt.columns)
    for (const _ of m.tasks)
      String(_.id) === T && (_.content = e, p !== void 0 && (_.description = p), _._taskRaw && (_._taskRaw.content = e, p !== void 0 && (_._taskRaw.description = p)));
  lt.updateTaskTitle(T, e);
}
const vo = {
  state: k,
  cancelReads: jt,
  stageTitleDraft(T, e, p) {
    T && (Ie(T, e, p), jt(!1), k.taskId === T && (k.title = e), Pe(T, e, p));
  },
  async openTask(T, e) {
    if (!T) return;
    if (jt(), k.taskId = T, k.isOpen = !0, k.error = "", Object.assign(k, {
      title: "",
      description: "",
      priority: 1,
      startDate: "",
      startTime: "",
      dueDate: "",
      dueTime: "",
      labels: [],
      url: "",
      commentAttachments: []
    }), e) {
      k.title = e.content || e.title || "", k.description = e.description || e.raw?.description || "", k.priority = e.priority || 1;
      const _ = zt(e.due?.datetime || e.due?.date || e.dueDate || "");
      k.dueDate = _.date, k.dueTime = _.time;
      const $ = e.startDate || $e(T, k.description), W = zt($);
      k.startDate = W.date, k.startTime = W.time, k.labels = [...e.labels || []], k.url = e.url || "";
    }
    const p = yt.get(T);
    p && (k.title = p.title, k.description = p.description);
    const m = po("detail");
    k.loading = !0;
    try {
      const _ = await ut.api(`/tasks/${encodeURIComponent(T)}`, { signal: m.signal });
      if (_ && m.current()) {
        const $ = yt.get(T);
        k.title = $?.title ?? _.content ?? "", k.description = $?.description ?? _.description ?? "", k.priority = _.priority || 1;
        const W = zt(_.due?.datetime || _.due?.date || "");
        k.dueDate = W.date, k.dueTime = W.time;
        const P = $e(T, _.description || k.description), R = zt(P);
        k.startDate = R.date, k.startTime = R.time, k.labels = [..._.labels || []], k.url = _.url || "";
        try {
          const N = await ut.getComments(T, m.signal);
          if (N && m.current()) {
            const L = [];
            for (const g of N)
              if (g?.attachment?.file_url) {
                const f = g.attachment.file_name || "附件图片";
                L.push({ name: f, url: g.attachment.file_url });
              }
            if (k.commentAttachments = L, L.length > 0 && k.description) {
              let g = k.description, f = !1;
              for (const z of L) {
                const b = new RegExp("(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))", "g");
                b.test(g) && (g = g.replace(b, `$1${z.url}$2`), f = !0);
              }
              if (f && !yt.has(T)) {
                k.description = g;
                for (const z of kt.columns) {
                  const b = z.tasks.find((r) => String(r.id) === T);
                  if (b) {
                    b.description = g, b._taskRaw && (b._taskRaw.description = g);
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
      m.current() && (k.error = "任务详情读取失败，请重新打开重试。");
    } finally {
      m.current() && (k.loading = !1), m.finish();
    }
  },
  close() {
    jt(), k.isOpen = !1, k.taskId = "";
  },
  async setStartDateAndTime(T, e) {
    if (!k.taskId) return;
    const p = Nt(), m = T.trim(), _ = m ? e.trim() : "";
    k.startDate = m, k.startTime = _, ie();
    const $ = lo(m, _);
    ro(p.taskId, $), ut.invalidateWorkspaceSnapshots();
    for (const W of kt.columns) {
      const P = W.tasks.find((R) => R.id === p.taskId);
      P && (P.startDate = $);
    }
  },
  async setDueDateAndTime(T, e) {
    if (!k.taskId) return;
    const p = Nt(), m = T.trim(), _ = m ? e.trim() : "";
    k.dueDate = m, k.dueTime = _, ie(), ut.invalidateWorkspaceSnapshots();
    const $ = (Kt.get(p.taskId) || 0) + 1;
    Kt.set(p.taskId, $);
    const W = Se.then(async () => {
      try {
        const P = await ut.updateTask(p.taskId, {
          due_string: m ? _ ? `${m} ${_}` : m : "no date"
        });
        if (Kt.get(p.taskId) !== $) return;
        const R = ut.mapTasks([P], (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))[0];
        for (const N of kt.columns) {
          const L = N.tasks.findIndex((f) => f.id === p.taskId);
          if (L < 0) continue;
          const g = N.tasks[L];
          if (Object.assign(g, {
            dueDate: R.dueDate,
            dueText: R.dueText,
            dueString: R.dueString,
            isDueToday: R.isDueToday,
            isOverdue: R.isOverdue,
            isRecurring: R.isRecurring
          }), g._taskRaw && (g._taskRaw.due = P.due), kt.view === "today") {
            const f = R.isOverdue ? "overdue" : R.isDueToday ? "today" : "";
            f !== N.sectionId && (N.tasks.splice(L, 1), kt.columns.find((z) => z.sectionId === f)?.tasks.push(g));
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
  async saveTitleAndDesc(T, e, p = k.taskId) {
    const m = p === k.taskId ? Nt() : { taskId: p, current: () => !1 };
    if (!m.taskId || !T.trim()) return;
    const _ = T.trim(), $ = e.trim(), W = Ie(p, _, $, "saving");
    m.current() && (k.title = _, k.description = $), Pe(m.taskId, _, $), Ut++, k.saving = !0;
    const P = se.then(async () => {
      try {
        await ut.updateTask(m.taskId, {
          content: _,
          description: $
        }), yt.get(p)?.revision === W && yt.delete(p), Ut === 1 && yt.size === 0 && Y.dispatch("refresh");
      } catch (R) {
        const N = yt.get(p);
        N?.revision === W && (N.status = "failed", N.error = R instanceof Error ? R.message : "保存未确认");
      } finally {
        Ut--, k.saving = Ut > 0;
      }
    });
    se = P.catch(() => {
    }), await P;
  },
  async attachImageToTask(T) {
    const e = Nt();
    if (await se, !e.current()) return;
    if (yt.has(e.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const p = k.description || "";
    if (!e.taskId || k.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    k.saving = !0;
    try {
      const m = T.name || `截图_${Date.now()}.png`;
      let _ = "";
      try {
        const $ = await ut.uploadFile(T, m);
        $ && $.file_url && (_ = $.file_url);
      } catch ($) {
        if (console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", $), T.size <= 2.5 * 1024 * 1024)
          _ = await fo(T);
        else
          throw new Error($?.message || "云端上传失败且文件超过2.5MB");
      }
      if (_) {
        const $ = p ? `${p}

![${m}](${_})` : `![${m}](${_})`;
        await ut.updateTask(e.taskId, {
          description: $
        }), e.current() && (k.description = $);
        for (const W of kt.columns) {
          const P = W.tasks.find((R) => String(R.id) === e.taskId);
          if (P) {
            P.description = $, P._taskRaw && (P._taskRaw.description = $);
            break;
          }
        }
        Y.dispatch("refresh");
      }
    } catch (m) {
      e.current() && (k.error = m.message || "上传图片失败"), typeof window < "u" && window.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${m.message}`);
    } finally {
      k.saving = !1;
    }
  }
}, rt = Je(vo, [
  "saveTitleAndDesc",
  "attachImageToTask",
  "setStartDateAndTime",
  "setDueDateAndTime"
]), mo = { class: "todoist-cal-head" }, go = { class: "todoist-cal-title-row" }, bo = {
  id: "todoist-cal-month-badge",
  class: "todoist-cal-badge"
}, yo = { class: "todoist-cal-nav" }, ho = { class: "todoist-cal-nav-group" }, ko = {
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
}, Ro = ["href", "onContextmenu"], Mo = { class: "agenda-event-time" }, jo = { class: "agenda-event-copy" }, Lo = ["title"], Ao = ["onContextmenu"], Eo = { class: "agenda-event-time" }, Wo = { class: "agenda-event-copy" }, zo = ["title"], Uo = {
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
  setup(T) {
    const e = oo;
    function p(D) {
      lt.setTabMode(D);
    }
    function m(D) {
      lt.toggleTodoItem(D);
    }
    function _(D) {
      rt.openTask(D.id, D);
    }
    le(() => {
      lt.dispatch("init");
    });
    function $() {
      lt.dispatch("today");
    }
    function W() {
      lt.dispatch("prev-month");
    }
    function P() {
      lt.dispatch("next-month");
    }
    function R() {
      lt.dispatch("prev-year");
    }
    function N() {
      lt.dispatch("next-year");
    }
    function L(D) {
      lt.dispatch("select-date", D);
    }
    function g(D, h) {
      lt.dispatch("context-date", {
        date: D,
        clientX: h.clientX,
        clientY: h.clientY
      });
    }
    function f(D, h) {
      const c = Array.from(h.dataTransfer?.types || []);
      (c.includes("application/x-todoist-task-id") || c.includes("text/plain")) && (h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "copy"));
    }
    function z(D) {
    }
    function b(D, h) {
      const c = h.dataTransfer?.getData("application/x-todoist-task-id") || h.dataTransfer?.getData("text/plain");
      c && (h.preventDefault(), h.stopPropagation(), lt.dispatch("drop-task", { taskId: c, date: D }));
    }
    function r(D, h) {
      lt.dispatch("context-agenda", {
        item: D,
        clientX: h.clientX,
        clientY: h.clientY
      });
    }
    return (D, h) => (a(), d("aside", {
      id: "todoist-calendar-sidebar",
      class: B(["todoist-calendar-sidebar", { collapsed: i(e).collapsed }]),
      "aria-label": "DayLine 日历拓展"
    }, [
      t("div", mo, [
        t("div", go, [
          h[2] || (h[2] = t("span", { class: "todoist-cal-logo" }, [
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
        t("div", ho, [
          t("button", {
            id: "todoist-cal-prev-month",
            type: "button",
            class: "cal-nav-btn",
            title: "上个月",
            onClick: W
          }, "‹"),
          t("span", ko, C(i(e).monthLabel), 1),
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
            onClick: N
          }, "›")
        ])
      ]),
      h[4] || (h[4] = t("div", { class: "todoist-cal-weekdays" }, [
        t("span", null, "一"),
        t("span", null, "二"),
        t("span", null, "三"),
        t("span", null, "四"),
        t("span", null, "五"),
        t("span", null, "六"),
        t("span", null, "日")
      ], -1)),
      t("div", _o, [
        (a(!0), d(Q, null, dt(i(e).cells, (c) => (a(), d("button", {
          key: c.date,
          type: "button",
          class: B(["todoist-cal-cell", {
            outside: c.isOutside,
            today: c.isToday,
            selected: c.isSelected
          }]),
          "data-date": c.date,
          role: "gridcell",
          title: c.title,
          onClick: (j) => L(c.date),
          onContextmenu: E((j) => g(c.date, j), ["prevent"]),
          onDragover: (j) => f(c.date, j),
          onDragleave: (j) => (c.date, void 0),
          onDrop: (j) => b(c.date, j)
        }, [
          t("span", null, C(c.dayNumber), 1),
          c.hasDot ? (a(), d("span", Co)) : O("", !0)
        ], 42, xo))), 128))
      ]),
      t("div", Do, [
        t("div", $o, [
          t("div", Io, [
            t("button", {
              type: "button",
              class: B(["cal-tab-btn", { active: i(e).tabMode === "agenda" }]),
              onClick: h[0] || (h[0] = (c) => p("agenda"))
            }, C(i(e).agendaTitle.includes(" ") ? i(e).agendaTitle.split(" ")[0] + " 日程" : i(e).agendaTitle), 3),
            t("button", {
              type: "button",
              class: B(["cal-tab-btn", { active: i(e).tabMode === "todo" }]),
              onClick: h[1] || (h[1] = (c) => p("todo"))
            }, " 待办 ", 2)
          ]),
          t("span", So, C(i(e).tabMode === "agenda" ? i(e).agendaCount : `${i(e).todoItems.length} 项`), 1)
        ]),
        i(e).tabMode === "agenda" ? (a(), d("div", Po, [
          i(e).agendaItems.length === 0 ? (a(), d("div", Oo, C(i(e).emptyText), 1)) : (a(!0), d(Q, { key: 1 }, dt(i(e).agendaItems, (c) => (a(), d(Q, {
            key: c.id
          }, [
            c.htmlLink ? (a(), d("a", {
              key: 0,
              href: c.htmlLink,
              target: "_blank",
              rel: "noreferrer",
              class: "todoist-cal-agenda-item todoist-cal-event-item google-calendar-agenda-item",
              style: it(c.color ? { "--google-event-color": c.color } : void 0),
              title: "点击打开 Google 日历；右键可修改、复制或删除",
              onContextmenu: E((j) => r(c, j), ["prevent"])
            }, [
              t("span", Mo, C(c.time), 1),
              t("span", jo, [
                t("b", {
                  title: c.summary
                }, C(c.summary), 9, Lo),
                t("small", null, C(c.subtitle), 1)
              ])
            ], 44, Ro)) : (a(), d("div", {
              key: 1,
              class: "todoist-cal-agenda-item todoist-cal-event-item google-calendar-agenda-item",
              style: it(c.color ? { "--google-event-color": c.color } : void 0),
              title: "Google 日历日程；右键可修改、复制或删除",
              onContextmenu: E((j) => r(c, j), ["prevent"])
            }, [
              t("span", Eo, C(c.time), 1),
              t("span", Wo, [
                t("b", {
                  title: c.summary
                }, C(c.summary), 9, zo),
                t("small", null, C(c.subtitle), 1)
              ])
            ], 44, Ao))
          ], 64))), 128))
        ])) : (a(), d("div", Uo, [
          i(e).todoLoading ? (a(), d("div", Ko, " 正在读取待办与完成历史… ")) : i(e).todoItems.length === 0 ? (a(), d("div", No, " 当天没有待办或完成任务 ☕ ")) : (a(!0), d(Q, { key: 2 }, dt(i(e).todoItems, (c) => (a(), d("div", {
            key: c.id,
            class: B(["todoist-cal-todo-card", { completed: c.completed }]),
            onClick: (j) => _(c)
          }, [
            t("div", Fo, [
              t("button", {
                type: "button",
                class: B(["todoist-cal-check", { checked: c.completed }]),
                title: c.completed ? "已完成 · 点击撤销(Reopen)" : "点击标记完成",
                onClick: E((j) => m(c), ["stop"])
              }, [
                c.completed ? (a(), d("span", Bo, "✓")) : O("", !0)
              ], 10, Yo),
              t("span", {
                class: B(["todoist-cal-todo-title", { strike: c.completed }])
              }, C(c.content), 3),
              c.completed ? (a(), d("span", Ho, "已完成")) : O("", !0)
            ]),
            c.thumbUrl ? (a(), d("div", {
              key: 0,
              class: "todoist-cal-thumb-box",
              title: "点击在小窗查看原图",
              onClick: E((j) => i(Ft).open(c.thumbUrl, c.content), ["stop"])
            }, [
              t("img", {
                src: c.thumbUrl,
                class: "todoist-cal-thumb-img",
                alt: "任务照片",
                loading: "lazy"
              }, null, 8, qo),
              h[3] || (h[3] = t("span", { class: "todoist-cal-thumb-tag" }, "🖼️ 照片", -1))
            ], 8, Go)) : O("", !0)
          ], 10, Vo))), 128))
        ]))
      ])
    ], 2));
  }
}), Jo = /* @__PURE__ */ Yt(Xo, [["__scopeId", "data-v-e33427ca"]]);
function Qo(T) {
  const e = T.state, p = K(null), m = K(null), _ = K(null), $ = K(!1), W = Oe(null), P = K(), R = /* @__PURE__ */ new Map();
  function N(v) {
    R.clear();
    const I = v.closest(".todoist-board");
    if (I)
      for (const y of I.querySelectorAll(".todoist-board-list")) {
        const S = e.columns[Number(y.dataset.groupIndex)];
        if (!S) continue;
        const M = y.__todoistSlots;
        if (!M) continue;
        const V = M(), vt = V.filter((et) => et.id !== h?.id);
        R.set(S, { list: y, rows: vt, read: M, snapshot: V });
      }
  }
  let L = 0, g;
  function f(v, I) {
    g = { clientY: v.clientY, col: I }, !L && (L = requestAnimationFrame(() => {
      L = 0;
      const y = g;
      g = void 0, y && z(y, y.col);
    }));
  }
  function z(v, I) {
    if (!h || e.movingTaskId) return;
    const y = R.get(I);
    if (!y) return;
    const S = y.read();
    S !== y.snapshot && (y.snapshot = S, y.rows = S.filter((X) => X.id !== h?.id));
    const M = v.clientY - y.list.getBoundingClientRect().top + y.list.scrollTop;
    let V = 0, vt = y.rows.length;
    for (; V < vt; ) {
      const X = V + vt >>> 1;
      M < y.rows[X].middle ? vt = X : V = X + 1;
    }
    let et = V;
    if (m.value === e.columns.indexOf(I)) {
      const X = P.value ? y.rows.findIndex((bt) => bt.id === P.value) : y.rows.length;
      X >= 0 && et > X && M < y.rows[X].middle + 10 && (et = X), X > 0 && et < X && M > y.rows[X - 1].middle - 10 && (et = X);
    }
    const mt = y.rows[et]?.id;
    D(I, mt), m.value === e.columns.indexOf(I) && (_.value = mt || y.rows[y.rows.length - 1]?.id || null, $.value = !mt);
  }
  function b(v) {
    return v === W.value;
  }
  function r(v, I) {
    if (I !== m.value || !W.value) return v.tasks;
    const y = [...v.tasks], S = P.value ? y.findIndex((M) => M.id === P.value) : -1;
    return y.splice(S < 0 ? y.length : S, 0, W.value), y;
  }
  function D(v, I) {
    if (!h || !c) return;
    if (e.view === "today" && v.sectionId === "overdue" && c.sectionId !== "overdue") {
      m.value = null;
      return;
    }
    const y = I ? v.tasks.find((V) => V.id === I) : void 0, S = v === c ? String(h._taskRaw?.parent_id || "") : "";
    if (y && e.view !== "today" && String(y._taskRaw?.parent_id || "") !== S) {
      m.value = null;
      return;
    }
    const M = e.columns.indexOf(v);
    M < 0 || (P.value = I, m.value = M);
  }
  let h = null, c = null;
  function j(v, I, y, S) {
    if (!T.isActive() || e.loading || e.movingTaskId || e.moveNeedsRefresh || I.completed || I.id.startsWith("optimistic-") || T.editingTaskId() === I.id) {
      v.preventDefault();
      return;
    }
    if (v.stopPropagation(), T.closePopovers(), p.value = I.id, h = I, c = y, W.value = { ...I }, N(v.currentTarget), v.dataTransfer) {
      v.dataTransfer.effectAllowed = "move";
      const M = v.currentTarget, V = M.getBoundingClientRect();
      v.dataTransfer.setDragImage(
        M,
        Math.max(0, Math.min(V.width, v.clientX - V.left)),
        Math.max(0, Math.min(V.height, v.clientY - V.top))
      ), v.dataTransfer.clearData(), v.dataTransfer.setData("application/x-todoist-task-id", I.id), v.dataTransfer.setData("application/x-logicweaver-todoist-task", I.id), v.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: I.id, sectionId: y.sectionId }));
    }
  }
  function U() {
    cancelAnimationFrame(L), L = 0, g = void 0, p.value = null, m.value = null, _.value = null, $.value = !1, h = null, c = null, W.value = null, P.value = void 0, R.clear();
  }
  function ct(v, I) {
    !h || e.movingTaskId || (v.preventDefault(), v.stopPropagation(), v.dataTransfer && (v.dataTransfer.dropEffect = "move"), f(v, e.columns[I]));
  }
  function at(v, I) {
    v.currentTarget?.contains(v.relatedTarget);
  }
  function G(v, I, y, S) {
    v.dataTransfer && (v.dataTransfer.dropEffect = "move"), f(v, y);
  }
  async function gt(v, I) {
    g && g.col === v && (z(g, g.col), I = P.value);
    const y = h, S = c;
    U(), !(!y || !S || !T.isActive() || e.movingTaskId) && (e.view === "today" ? v.sectionId === "today" && S.sectionId !== "today" ? await T.moveTask(y.id, { dueDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") }, I) : await T.moveTask(y.id, { sectionId: v.sectionId }, I) : await T.moveTask(y.id, {
      projectId: v.projectId,
      sectionId: v.sectionId
    }, I));
  }
  async function wt(v, I, y, S) {
    v.preventDefault();
    const M = v.dataTransfer?.getData("application/x-todoist-label") || (v.dataTransfer?.getData("text/plain")?.startsWith("label:") ? v.dataTransfer.getData("text/plain").slice(6) : "");
    if (M) {
      T.dropLabel(I, M);
      return;
    }
    if (m.value === e.columns.indexOf(y)) {
      await gt(y, P.value);
      return;
    }
    const V = v.currentTarget.getBoundingClientRect(), vt = v.clientY >= V.top + V.height / 2, et = y.tasks.filter((bt) => bt.id !== h?.id), mt = et.findIndex((bt) => bt.id === I.id), X = I.id === h?.id ? I.id : vt ? et[mt + 1]?.id : I.id;
    await gt(y, X);
  }
  async function xt(v, I) {
    v.preventDefault(), v.stopPropagation(), await gt(I, m.value === e.columns.indexOf(I) ? P.value : void 0);
  }
  return tt(() => [e.view, e.activeProjectId], () => U()), tt(() => e.columns, (v) => {
    c && !v.includes(c) && U();
  }), tt(T.isActive, (v) => {
    v || U();
  }, { immediate: !0, flush: "sync" }), At(U), {
    draggingTaskId: p,
    dragOverColIndex: m,
    dragOverTaskId: _,
    dragAfterTask: $,
    isDragPreview: b,
    previewTasks: r,
    onTaskDragStart: j,
    onTaskDragEnd: U,
    onColDragOver: ct,
    onColDragLeave: at,
    onTaskDragOver: G,
    onTaskDrop: wt,
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
  setup(T) {
    const e = T, p = K(null), m = /* @__PURE__ */ new Map(), _ = K(0), $ = Oe({ top: 0, height: 600 }), W = (D) => e.isPreview(D) ? `preview:${D.id}` : D.id, P = ft(() => {
      _.value;
      const D = [0];
      for (const h of e.tasks) {
        const c = h.id === e.hiddenId && !e.isPreview(h) ? 0 : m.get(W(h)) || m.get(h.id) || 110;
        D.push(D[D.length - 1] + c);
      }
      return D;
    }), R = ft(() => {
      _.value;
      let D = 0;
      return e.tasks.filter((h) => !e.isPreview(h)).map((h) => {
        const c = m.get(h.id) || 110, j = { id: h.id, middle: D + c / 2 };
        return D += c, j;
      });
    });
    function N(D) {
      const h = P.value;
      let c = 0, j = e.tasks.length;
      for (; c < j; ) {
        const U = c + j >>> 1;
        h[U + 1] < D ? c = U + 1 : j = U;
      }
      return c;
    }
    const L = ft(() => {
      const D = Math.max(0, N($.value.top) - 5), h = Math.min(e.tasks.length, N($.value.top + $.value.height) + 6), c = /* @__PURE__ */ new Set();
      for (let j = D; j < h; j++) c.add(j);
      if (e.pinnedId) {
        const j = e.tasks.findIndex((U) => U.id === e.pinnedId && !e.isPreview(U));
        j >= 0 && c.add(j);
      }
      return [...c].sort((j, U) => j - U).map((j) => ({ task: e.tasks[j], index: j, top: P.value[j] }));
    });
    let g = 0;
    function f() {
      g || (g = requestAnimationFrame(() => {
        g = 0, p.value && ($.value = { top: p.value.scrollTop, height: p.value.clientHeight });
      }));
    }
    let z;
    const b = /* @__PURE__ */ new Map();
    function r(D, h) {
      const c = b.get(h);
      c !== D && (c && z?.unobserve(c), D instanceof HTMLElement ? (b.set(h, D), z?.observe(D)) : b.delete(h));
    }
    return tt(() => e.tasks, () => {
      const D = new Set(e.tasks.map(W));
      for (const h of m.keys()) D.has(h) || m.delete(h);
      ht(f);
    }), le(() => {
      z = new ResizeObserver((D) => {
        let h = !1;
        const c = N(p.value?.scrollTop || 0), j = P.value[c] || 0;
        for (const U of D) {
          const ct = U.target;
          if (ct === p.value) {
            f();
            continue;
          }
          const at = ct.dataset.rowKey, G = U.borderBoxSize?.[0]?.blockSize || U.contentRect.height;
          at && G > 0 && Math.abs((m.get(at) || 0) - G) > 0.5 && (m.set(at, G), h = !0);
        }
        if (h) {
          _.value++;
          const U = (P.value[c] || 0) - j;
          p.value && U && !e.pinnedId && (p.value.scrollTop += U), f();
        }
      }), p.value && (z.observe(p.value), p.value.__todoistSlots = () => R.value);
      for (const D of b.values()) z.observe(D);
      f();
    }), At(() => {
      z?.disconnect(), cancelAnimationFrame(g), p.value && delete p.value.__todoistSlots, b.clear(), m.clear();
    }), (D, h) => (a(), d("div", {
      ref_key: "root",
      ref: p,
      onScrollPassive: f
    }, [
      T.tasks.length ? (a(), d("div", {
        key: 1,
        class: "virtual-task-canvas",
        style: it({ height: `${P.value[P.value.length - 1]}px` })
      }, [
        (a(!0), d(Q, null, dt(L.value, (c) => (a(), d("div", {
          key: W(c.task),
          ref_for: !0,
          ref: (j) => r(j, W(c.task)),
          "data-row-key": W(c.task),
          class: "virtual-task-row",
          style: it({ transform: `translateY(${c.top}px)` })
        }, [
          ke(D.$slots, "default", {
            task: c.task,
            index: c.index
          }, void 0, !0)
        ], 12, Zo))), 128))
      ], 4)) : ke(D.$slots, "empty", {}, void 0, !0, 0)
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
}, ps = { class: "todoist-board" }, fs = ["data-section-id", "data-title", "data-column-index"], vs = { class: "todoist-board-column-head" }, ms = ["title", "onClick"], gs = ["onClick"], bs = ["onSubmit"], ys = ["onKeydown"], hs = {
  key: 0,
  class: "todoist-composer-images"
}, ks = ["src"], ws = { class: "todoist-composer-img-name" }, Ts = {
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
}, As = ["title"], Es = ["title"], Ws = ["title"], zs = ["title"], Us = {
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
}, vn = { class: "todoist-color-grid" }, mn = ["title", "onClick"], gn = { class: "todoist-color-name" }, bn = ["disabled", "onClick"], yn = { class: "todoist-project-flyout-name" }, hn = {
  key: 0,
  class: "todoist-menu-badge"
}, kn = { class: "todoist-menu-text" }, wn = ["onKeydown"], Tn = { class: "todoist-dialog-head" }, _n = { class: "todoist-dialog-title" }, xn = { class: "todoist-dialog-body" }, Cn = {
  key: 0,
  class: "todoist-dialog-desc"
}, Dn = ["placeholder", "onKeydown"], $n = { class: "todoist-dialog-foot" }, In = ["onKeydown"], Sn = { class: "todoist-dialog-head" }, Pn = { class: "todoist-dialog-icon" }, On = { class: "todoist-dialog-title" }, Rn = { class: "todoist-dialog-body" }, Mn = {
  key: 0,
  style: { background: "#fef2f2", padding: "10px 12px", "border-radius": "8px", border: "1px solid #fee2e2", "margin-bottom": "10px" }
}, jn = { style: { "font-weight": "700", color: "#dc2626", "font-size": "13.5px" } }, Ln = { style: { margin: "0", color: "#64748b", "font-size": "12.5px", "line-height": "1.5" } }, An = { class: "todoist-dialog-foot" }, En = /* @__PURE__ */ St({
  __name: "TodoistTaskList",
  setup(T) {
    const e = kt, p = K(""), m = K(null), _ = K(""), $ = K([]);
    function W(s) {
      const o = s.clipboardData?.items;
      if (o)
        for (let n = 0; n < o.length; n++) {
          const A = o[n];
          if (A.type.indexOf("image") !== -1) {
            s.preventDefault();
            const l = A.getAsFile();
            if (!l) continue;
            const st = URL.createObjectURL(l), F = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: !1 }).replace(/:/g, ""), Tt = {
              file: l,
              previewUrl: st,
              name: `截图_${F}.png`,
              uploading: !1
            };
            $.value.push(Tt);
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
    const R = K(null), N = K(""), L = K(null), g = It({
      isOpen: !1,
      x: 0,
      y: 0,
      col: null,
      canMoveLeft: !1,
      canMoveRight: !1
    }), f = It({
      isOpen: !1,
      title: "",
      message: "",
      value: "",
      placeholder: "",
      confirmText: "确定",
      actionType: "",
      payload: null
    }), z = K(null), b = It({
      isOpen: !1,
      title: "确认操作",
      icon: "⚠️",
      alertText: "",
      message: "",
      confirmText: "确定",
      danger: !1,
      actionType: "",
      payload: null
    }), r = It({
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
    }), D = K(null), h = K(null), c = [
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
    ], U = ft(() => String(r.task?._taskRaw?.project_id || r.col?.projectId || "")), ct = ft(() => e.view !== "projects" ? null : e.projects.find((s) => String(s.id) === String(e.activeProjectId)) || e.projects[0] || null), at = ft(() => {
      const s = new Set(e.availableLabels || []);
      return r.task?.labels && r.task.labels.forEach((o) => s.add(o)), Array.from(s);
    }), G = ft(() => {
      const s = r.task?.customColorHex;
      return s && c.find((n) => n.hex.toLowerCase() === s.toLowerCase()) || c[0];
    });
    function gt(s, o) {
      return s.sectionId || s.title || String(o);
    }
    function wt() {
      return `${e.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
    }
    function xt(s) {
      return s.startDate || s.dueText || s.labels && s.labels.length > 0 || s.timedDeadlineText || s.extraCountText;
    }
    function v() {
      g.isOpen = !1, r.isOpen = !1, r.activeSubpanel = null;
    }
    const {
      draggingTaskId: I,
      dragOverColIndex: y,
      dragOverTaskId: S,
      dragAfterTask: M,
      isDragPreview: V,
      previewTasks: vt,
      onTaskDragStart: et,
      onTaskDragEnd: mt,
      onColDragOver: X,
      onColDragLeave: bt,
      onTaskDragOver: Bt,
      onTaskDrop: Ht,
      onColDrop: Pt
    } = Qo({
      state: e,
      isActive: () => H.active,
      editingTaskId: () => R.value,
      closePopovers: v,
      moveTask: (s, o, n) => Y.moveTask(s, o, n),
      dropLabel: (s, o) => {
        s.labels || (s.labels = []), s.labels.includes(o) || (s.labels.push(o), ut.getToken() && ut.updateTask(s.id, { labels: s.labels }));
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
      e.movingTaskId !== s.id && (R.value = s.id, N.value = s.content, ht(() => {
        L.value && (L.value.focus(), L.value.select());
      }));
    }
    function Rt(s, o) {
      if (R.value !== s.id) return;
      const n = N.value.trim();
      R.value = null, o && n && n !== s.content && (s.content = n, Y.dispatch("update-task-title", {
        taskId: s.id,
        content: n,
        task: s,
        newContent: n
      }));
    }
    function w(s, o) {
      s.key === "Enter" ? s.shiftKey || (s.preventDefault(), Rt(o, !0)) : s.key === "Escape" && (s.preventDefault(), s.stopPropagation(), Rt(o, !1));
    }
    function u(s, o) {
      o.target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button") || rt.openTask(s.id, s);
    }
    function x(s, o, n) {
      const A = n.currentTarget;
      m.value = gt(s, o), _.value = "", ht(() => {
        A.nextElementSibling?.querySelector("textarea")?.focus();
      });
    }
    function J() {
      ot.value || Z();
    }
    function Z() {
      m.value = null, _.value = "";
      for (const s of $.value)
        try {
          URL.revokeObjectURL(s.previewUrl);
        } catch {
        }
      $.value = [];
    }
    const ot = K(!1), de = /* @__PURE__ */ new WeakMap();
    function re(s) {
      const o = s.description || s._taskRaw?.description || "", n = de.get(s);
      if (n && n.source === o) return n;
      const A = o.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null, l = {
        source: o,
        thumb: A,
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
      if (!H.active || ot.value) return;
      const o = [...$.value], n = _.value.trim() || o[0]?.name || "";
      if (!n) return;
      const A = m.value, l = _.value, st = e.view, F = s.projectId || st === "projects" && e.activeProjectId || void 0, Tt = s.sectionId !== void 0 ? s.sectionId : void 0;
      ot.value = !0;
      try {
        await Qe(async () => {
          for (const q of o)
            if (!q.uploadedUrl) {
              q.uploading = !0;
              try {
                const ee = await ut.uploadFile(q.file, q.name);
                q.uploadedUrl = ee.file_url;
              } catch {
                q.uploadedUrl = q.previewUrl;
              } finally {
                q.uploading = !1;
              }
            }
          await Y.dispatch("add-task-submit", {
            content: n,
            view: st,
            group: s,
            projectId: F,
            sectionId: Tt,
            attachments: o.map((q) => ({ file_url: q.uploadedUrl, file_name: q.name, file_type: q.file.type || "image/png" }))
          }) && A === m.value && l === _.value && o.length === $.value.length && o.every((q, ee) => q === $.value[ee]) && Z();
        });
      } catch {
        e.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
      } finally {
        ot.value = !1;
      }
    }
    function je(s, o) {
      s.key === "Enter" && !s.shiftKey ? (s.preventDefault(), ue(o)) : s.key === "Escape" && (s.preventDefault(), J());
    }
    function pe() {
      const s = p.value.trim();
      if (!s) return;
      const n = e.columns.find((A) => A.projectId)?.projectId || e.activeProjectId || void 0;
      Y.dispatch("add-section-submit", { name: s, projectId: n }), Xt();
    }
    function Xt() {
      e.addingSection = !1, p.value = "";
    }
    function Le(s, o, n) {
      if (g.isOpen && g.col === s) {
        g.isOpen = !1;
        return;
      }
      r.isOpen = !1;
      const l = n.currentTarget.getBoundingClientRect(), F = Math.max(8, Math.min(window.innerWidth - 175 - 8, l.left)), Tt = Math.min(window.innerHeight - 160, l.bottom + 4);
      g.col = s, g.x = F, g.y = Tt, g.canMoveLeft = o > 0 && !!e.columns[o - 1]?.sectionId, g.canMoveRight = o < e.columns.length - 1 && !!e.columns[o + 1]?.sectionId, g.isOpen = !0;
    }
    function fe(s, o) {
      g.isOpen = !1, Y.dispatch("move-section", { sectionId: s.sectionId, direction: o });
    }
    function ve(s, o, n) {
      if (e.movingTaskId === s.id || s.completed) return;
      g.isOpen = !1;
      const A = 236, l = 340, st = Math.max(8, Math.min(window.innerWidth - A - 8, n.clientX)), F = Math.max(8, Math.min(window.innerHeight - l - 8, n.clientY));
      if (r.task = s, r.col = o, r.x = st, r.y = F, r.activeSubpanel = null, r.descText = s.description || "", r.isSavingDesc = !1, r.newLabelText = "", r.customRecurText = "", s.dueDate) {
        const q = /* @__PURE__ */ new Date(`${s.dueDate.slice(0, 10)}T00:00:00`);
        Number.isFinite(q.getTime()) && (r.calYear = q.getFullYear(), r.calMonth = q.getMonth());
      } else {
        const q = /* @__PURE__ */ new Date();
        r.calYear = q.getFullYear(), r.calMonth = q.getMonth();
      }
      const Tt = 252, te = st + A + Tt > window.innerWidth - 8;
      r.flyoutOpenLeft = te, r.flyoutStyle = {
        left: te ? `${-Tt - 6}px` : `${A + 6}px`,
        top: "0px"
      }, r.isOpen = !0;
    }
    function Et(s) {
      r.activeSubpanel === s ? r.activeSubpanel = null : (r.activeSubpanel = s, s === "desc" ? ht(() => {
        D.value?.focus(), D.value?.select();
      }) : s === "labels" && ht(() => {
        h.value?.focus();
      }));
    }
    function me(s) {
      return !!r.task?.labels?.includes(s);
    }
    function Ae(s) {
      if (!r.task) return;
      const o = r.task.id, n = [...r.task.labels || []], A = n.includes(s) ? n.filter((l) => l !== s) : [...n, s];
      r.task.labels = A, Y.dispatch("update-task-labels", { taskId: o, labels: A });
    }
    function ge() {
      if (!r.task) return;
      const s = r.newLabelText.trim();
      if (!s) return;
      r.newLabelText = "";
      const o = r.task.id, n = [...r.task.labels || []];
      n.includes(s) || (n.push(s), r.task.labels = n, Y.dispatch("update-task-labels", { taskId: o, labels: n })), v();
    }
    function Ee(s) {
      return String(r.task?.dueString || "").toLowerCase().includes(s.toLowerCase());
    }
    function We(s, o) {
      if (!r.task) return;
      const n = r.task.id;
      Y.dispatch("update-task-recurring", { taskId: n, rule: s, label: o }), v();
    }
    function be() {
      if (!r.task) return;
      const s = r.customRecurText.trim();
      if (!s) return;
      const o = r.task.id;
      Y.dispatch("update-task-recurring", { taskId: o, rule: s, label: s }), v();
    }
    function ze() {
      if (!r.task) return;
      const s = r.task.id;
      Y.dispatch("clear-task-recurring", { taskId: s }), v();
    }
    function Ue(s) {
      if (!r.task) return;
      const o = r.task.id, n = c.find((A) => A.id === s);
      r.task.customColorHex = n?.hex || "", Y.dispatch("update-task-color", { taskId: o, colorId: s }), v();
    }
    function Ke(s) {
      if (!r.task) return;
      const o = r.task.id;
      Y.dispatch("move-task-to-project", {
        taskId: o,
        targetProjectId: s.id,
        targetProjectName: s.name
      }), v();
    }
    async function Ne() {
      const s = r.task, o = s ? {
        id: `todoist:${s.id}`,
        content: s.content,
        completed: s.completed,
        priority: s.priority,
        dueDate: s.dueDate
      } : null;
      if (v(), !!o?.content.trim())
        try {
          const { addWorkbenchTask: n } = await import("./workbench.store---R-eEes.js"), A = n(o.content, o);
          ae.show({
            appName: "海狸工作台",
            title: A ? "已添加到工作台" : "任务已在工作台中",
            message: A ? "已加入顶部待办条；工作台勾选仅影响本地副本。" : "没有重复添加"
          });
        } catch {
          ae.show({ appName: "海狸工作台", title: "添加失败", message: "未能添加任务，请重试。" });
        }
    }
    function Ve() {
      if (!r.task) return;
      const s = r.task;
      v(), s.isRecurring ? (b.title = "删除重复任务确认", b.icon = "⚠️", b.danger = !0, b.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。", b.message = `任务内容：${s.content}
循环规则：${s.dueString || "循环任务"}`, b.confirmText = "删除重复任务", b.actionType = "delete-task", b.payload = { taskId: s.id, isRecurring: !0 }, b.isOpen = !0) : (b.title = "删除任务确认", b.icon = "🗑️", b.danger = !0, b.alertText = `确定要删除任务「${s.content}」吗？`, b.message = "此操作不可撤销。", b.confirmText = "确认删除", b.actionType = "delete-task", b.payload = { taskId: s.id, isRecurring: !1 }, b.isOpen = !0);
    }
    window.LogicWeaverTodoistTaskList && (window.LogicWeaverTodoistTaskList.openTaskMenu = function(s, o, n) {
      ve(s, o, n);
    });
    function ye() {
      f.title = "新建项目", f.message = "请输入新项目名称：", f.value = "", f.placeholder = "项目名称…", f.confirmText = "创建", f.actionType = "create-project", f.payload = null, f.isOpen = !0, ht(() => z.value?.focus());
    }
    function Fe(s) {
      f.title = "重命名项目", f.message = `正在重命名项目「${s.name}」：`, f.value = s.name, f.placeholder = "新项目名称…", f.confirmText = "保存", f.actionType = "rename-project", f.payload = { projectId: s.id }, f.isOpen = !0, ht(() => {
        z.value?.focus(), z.value?.select();
      });
    }
    function Ye(s) {
      g.isOpen = !1, f.title = "重命名板块", f.message = `正在重命名板块「${s.title}」：`, f.value = s.title, f.placeholder = "新板块名称…", f.confirmText = "保存", f.actionType = "rename-section", f.payload = { sectionId: s.sectionId }, f.isOpen = !0, ht(() => {
        z.value?.focus(), z.value?.select();
      });
    }
    function Jt() {
      f.isOpen = !1;
    }
    function he() {
      const s = f.value.trim();
      if (!s) return;
      const { actionType: o, payload: n } = f;
      Jt(), o === "create-project" ? Y.dispatch("create-project-submit", s) : o === "rename-project" && n && "projectId" in n ? Y.dispatch("rename-project-submit", { projectId: n.projectId, newName: s }) : o === "rename-section" && n && "sectionId" in n && Y.dispatch("rename-section", { sectionId: n.sectionId, newName: s });
    }
    function Be(s) {
      b.title = "删除项目确认", b.icon = "🗑️", b.danger = !0, b.alertText = `确定要彻底删除项目「${s.name}」吗？`, b.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！", b.confirmText = "彻底删除", b.actionType = "delete-project", b.payload = { projectId: s.id }, b.isOpen = !0;
    }
    function He(s) {
      g.isOpen = !1, b.title = "删除板块确认", b.icon = "🗑️", b.danger = !0, b.alertText = `确定要删除板块「${s.title}」吗？`, b.message = "板块内的任务将自动保留并移至默认收件箱。", b.confirmText = "删除板块", b.actionType = "delete-section", b.payload = { sectionId: s.sectionId }, b.isOpen = !0;
    }
    function Qt() {
      b.isOpen = !1;
    }
    function Ge() {
      const { actionType: s, payload: o } = b;
      Qt(), s === "delete-project" && o && "projectId" in o ? Y.dispatch("delete-project-submit", o.projectId) : s === "delete-section" && o && "sectionId" in o ? Y.dispatch("delete-section", { sectionId: o.sectionId }) : s === "delete-task" && o && "taskId" in o && Y.dispatch("delete-task-submit", o);
    }
    function qe(s) {
      Y.dispatch("switch-project", s);
    }
    function Zt(s) {
      s.key === "Escape" && (r.isOpen && (r.isOpen = !1, r.activeSubpanel = null), g.isOpen && (g.isOpen = !1));
    }
    return tt(() => H.active, (s) => {
      document.removeEventListener("keydown", Zt), s && document.addEventListener("keydown", Zt);
    }, { immediate: !0, flush: "sync" }), At(() => {
      document.removeEventListener("keydown", Zt), Z();
    }), (s, o) => (a(), d("div", {
      id: "todoist-workspace-body",
      class: "todoist-workspace-body",
      onClick: v
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
              (a(!0), d(Q, null, dt(i(e).projects, (n) => (a(), d("button", {
                key: n.id,
                type: "button",
                class: B(["todoist-project-tab", { active: String(n.id) === String(i(e).activeProjectId) }]),
                onClick: (A) => qe(n.id)
              }, [
                t("span", {
                  class: "todoist-project-dot",
                  style: it({ background: n.colorHex || "#0ea5e9" })
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
            ct.value ? (a(), d("div", us, [
              t("button", {
                type: "button",
                class: "todoist-project-action-btn",
                title: "重命名项目",
                onClick: o[0] || (o[0] = (n) => Fe(ct.value))
              }, [...o[27] || (o[27] = [
                t("span", { class: "action-icon" }, "✏️", -1),
                t("span", { class: "action-text" }, "重命名", -1)
              ])]),
              t("button", {
                type: "button",
                class: "todoist-project-action-btn danger",
                title: "删除项目",
                onClick: o[1] || (o[1] = (n) => Be(ct.value))
              }, [...o[28] || (o[28] = [
                t("span", { class: "action-icon" }, "🗑️", -1),
                t("span", { class: "action-text" }, "删除项目", -1)
              ])])
            ])) : O("", !0)
          ])
        ])) : O("", !0),
        t("div", ps, [
          (a(!0), d(Q, null, dt(i(e).columns, (n, A) => (a(), d("section", {
            key: n.sectionId || n.title || A,
            class: "todoist-board-column",
            "data-section-id": n.sectionId,
            "data-title": n.title,
            "data-column-index": A
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
                onClick: E((l) => Le(n, A, l), ["stop"])
              }, "•••", 8, ms)
            ]),
            t("button", {
              type: "button",
              class: "todoist-column-add",
              onClick: (l) => x(n, A, l)
            }, "＋ 添加任务", 8, gs),
            m.value === gt(n, A) ? (a(), d("form", {
              key: 0,
              class: "todoist-inline-add",
              onSubmit: E((l) => ue(n), ["prevent"])
            }, [
              nt(t("textarea", {
                "onUpdate:modelValue": o[2] || (o[2] = (l) => _.value = l),
                rows: "2",
                placeholder: "任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）",
                onKeydown: (l) => je(l, n),
                onPaste: o[3] || (o[3] = (l) => W(l))
              }, null, 40, ys), [
                [pt, _.value]
              ]),
              $.value.length > 0 ? (a(), d("div", hs, [
                (a(!0), d(Q, null, dt($.value, (l, st) => (a(), d("div", {
                  key: st,
                  class: "todoist-composer-img-pill"
                }, [
                  t("img", {
                    src: l.previewUrl,
                    class: "todoist-composer-img-thumb",
                    alt: "预览"
                  }, null, 8, ks),
                  t("span", ws, C(l.name), 1),
                  l.uploading ? (a(), d("span", Ts, "上传中…")) : O("", !0),
                  t("button", {
                    type: "button",
                    class: "todoist-composer-img-remove",
                    title: "移除此图片",
                    onClick: (F) => P(st)
                  }, "×", 8, _s)
                ]))), 128))
              ])) : O("", !0),
              t("div", xs, [
                t("button", {
                  type: "button",
                  disabled: ot.value,
                  onClick: J
                }, "取消", 8, Cs),
                t("button", {
                  type: "submit",
                  class: "primary",
                  disabled: ot.value
                }, C(ot.value ? $.value.length ? "图片上传中…" : "添加中…" : "添加任务"), 9, Ds)
              ])
            ], 40, bs)) : O("", !0),
            Mt(es, {
              tasks: i(vt)(n, A),
              "pinned-id": i(I) || R.value,
              "hidden-id": i(y) !== null ? i(I) : null,
              "is-preview": i(V),
              class: B(["todoist-board-list", { "drag-over": i(y) === A }]),
              "data-group-index": A,
              onDragover: E((l) => i(X)(l, A), ["prevent"]),
              onDragleave: (l) => i(bt)(l, A),
              onDrop: E((l) => i(Pt)(l, n), ["prevent"])
            }, {
              empty: we(() => [
                n.tasks.length === 0 && i(y) !== A ? (a(), d("p", $s, " 暂无任务 · 可拖到这里 ")) : O("", !0)
              ]),
              default: we(({ task: l, index: st }) => [
                t("article", {
                  class: B(["todoist-board-task", [
                    {
                      completed: l.completed,
                      "has-custom-color": !!l.customColorHex,
                      editing: R.value === l.id,
                      "dragging-task": !i(V)(l) && i(I) === l.id,
                      "drop-before": i(S) === l.id && !i(M),
                      "drop-after": i(S) === l.id && i(M),
                      "saving-position": i(e).movingTaskId === l.id,
                      "todoist-task-preview": i(V)(l),
                      "drag-origin-hidden": i(I) === l.id && !i(V)(l) && i(y) !== null
                    }
                  ]]),
                  style: it(l.customColorHex ? { "--task-custom-color": l.customColorHex } : {}),
                  "data-task-id": i(V)(l) ? void 0 : l.id,
                  "aria-hidden": i(V)(l) || void 0,
                  tabindex: i(V)(l) ? -1 : 0,
                  title: wt(),
                  draggable: !i(V)(l) && !l.completed && !i(e).loading && !i(e).movingTaskId && !i(e).moveNeedsRefresh && R.value !== l.id && !l.id.startsWith("optimistic-"),
                  onDragstart: (F) => i(et)(F, l, n, st),
                  onDragend: o[6] || (o[6] = //@ts-ignore
                  (...F) => i(mt) && i(mt)(...F)),
                  onDragover: E((F) => i(Bt)(F, l, n, st), ["stop", "prevent"]),
                  onDrop: E((F) => i(Ht)(F, l, n, st), ["stop", "prevent"]),
                  onDblclick: (F) => Gt(l, F),
                  onClick: (F) => u(l, F),
                  onContextmenu: E((F) => ve(l, n, F), ["prevent", "stop"])
                }, [
                  t("button", {
                    type: "button",
                    class: B(["todoist-board-check", { checked: l.completed }]),
                    disabled: i(V)(l) || i(e).movingTaskId === l.id,
                    title: l.completed ? "撤销完成" : "完成任务",
                    "aria-label": (l.completed ? "撤销完成：" : "完成：") + l.content,
                    onClick: E((F) => Ct(l, n), ["stop"])
                  }, null, 10, Ss),
                  t("div", Ps, [
                    i(e).movingTaskId === l.id ? (a(), d("span", Os, "保存中")) : O("", !0),
                    R.value === l.id ? nt((a(), d("textarea", {
                      key: 1,
                      ref_for: !0,
                      ref_key: "editingInputRef",
                      ref: L,
                      "onUpdate:modelValue": o[4] || (o[4] = (F) => N.value = F),
                      class: "todoist-task-editor",
                      rows: "2",
                      "aria-label": "编辑任务名称",
                      onKeydown: (F) => w(F, l),
                      onBlur: (F) => Rt(l, !0),
                      onClick: o[5] || (o[5] = E(() => {
                      }, ["stop"]))
                    }, null, 40, Rs)), [
                      [pt, N.value]
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
                      }, " ⏱ " + C(i($t)(l.startDate)) + " ~ " + C(i($t)(l.dueDate)), 9, Es)) : l.dueText ? (a(), d("span", {
                        key: 2,
                        class: B(["todoist-board-due", { recurring: l.isRecurring }]),
                        title: l.isRecurring ? `循环任务：${l.dueString || l.dueText}` : void 0
                      }, C(l.isRecurring ? "↻ " : "▣ ") + C(l.dueText), 11, Ws)) : O("", !0),
                      (a(!0), d(Q, null, dt((l.labels || []).slice(0, 3), (F) => (a(), d("span", {
                        key: F,
                        class: "todoist-board-label"
                      }, "◇ " + C(F), 1))), 128)),
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
                      onClick: E((F) => Me(qt(l), l), ["stop"])
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
              nt(t("input", {
                "onUpdate:modelValue": o[8] || (o[8] = (n) => p.value = n),
                type: "text",
                class: "todoist-add-section-input",
                placeholder: "板块名称…",
                autofocus: "",
                onKeydown: [
                  _t(E(pe, ["prevent"]), ["enter"]),
                  _t(Xt, ["esc"])
                ]
              }, null, 40, Ys), [
                [pt, p.value]
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
      g.isOpen && g.col ? (a(), d("div", {
        key: 5,
        class: "todoist-section-menu",
        style: it({ left: g.x + "px", top: g.y + "px" }),
        onClick: o[13] || (o[13] = E(() => {
        }, ["stop"]))
      }, [
        t("button", {
          type: "button",
          class: "todoist-section-menu-item",
          onClick: o[9] || (o[9] = (n) => Ye(g.col))
        }, [...o[31] || (o[31] = [
          t("span", { class: "section-menu-icon" }, "✏️", -1),
          t("span", { class: "section-menu-text" }, "重命名板块", -1)
        ])]),
        g.col.sectionId ? (a(), d("div", Bs, [
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !g.canMoveLeft,
            title: "向左移动板块",
            onClick: o[10] || (o[10] = (n) => fe(g.col, -1))
          }, "◀ 左移", 8, Hs),
          o[32] || (o[32] = t("span", { class: "move-btn-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: "todoist-section-menu-move-btn",
            disabled: !g.canMoveRight,
            title: "向右移动板块",
            onClick: o[11] || (o[11] = (n) => fe(g.col, 1))
          }, "右移 ▶", 8, Gs)
        ])) : O("", !0),
        g.col.sectionId ? (a(), d("div", qs)) : O("", !0),
        g.col.sectionId ? (a(), d("button", {
          key: 2,
          type: "button",
          class: "todoist-section-menu-item danger",
          onClick: o[12] || (o[12] = (n) => He(g.col))
        }, [...o[33] || (o[33] = [
          t("span", { class: "section-menu-icon" }, "🗑️", -1),
          t("span", { class: "section-menu-text" }, "删除分组", -1)
        ])])) : O("", !0)
      ], 4)) : O("", !0),
      r.isOpen && r.task ? (a(), d("div", {
        key: 6,
        class: "todoist-task-context-menu",
        style: it({ left: r.x + "px", top: r.y + "px" }),
        role: "menu",
        onClick: o[20] || (o[20] = E(() => {
        }, ["stop"]))
      }, [
        t("div", Xs, [
          t("span", Js, C(r.task.content || "任务操作"), 1)
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
          class: B(["todoist-task-menu-item", { active: r.activeSubpanel === "labels" }]),
          onClick: o[14] || (o[14] = (n) => Et("labels"))
        }, [
          o[35] || (o[35] = t("span", { class: "todoist-menu-icon" }, "🏷️", -1)),
          o[36] || (o[36] = t("span", { class: "todoist-menu-text" }, "云端标签", -1)),
          t("span", Qs, C(r.task.labels && r.task.labels.length ? `已选 ${r.task.labels.length}` : "无"), 1)
        ], 2),
        r.activeSubpanel === "labels" ? (a(), d("div", Zs, [
          t("div", tn, [
            nt(t("input", {
              "onUpdate:modelValue": o[15] || (o[15] = (n) => r.newLabelText = n),
              type: "text",
              placeholder: "新建或添加标签…",
              class: "todoist-label-input",
              onKeydown: _t(E(ge, ["prevent"]), ["enter"])
            }, null, 40, en), [
              [pt, r.newLabelText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-label-add-btn",
              onClick: ge
            }, "＋")
          ]),
          t("div", on, [
            (a(!0), d(Q, null, dt(at.value, (n) => (a(), d("button", {
              key: n,
              type: "button",
              class: B(["todoist-label-chip", { selected: me(n) }]),
              onClick: (A) => Ae(n)
            }, [
              t("span", null, "◇ " + C(n), 1),
              me(n) ? (a(), d("span", nn, "✓")) : O("", !0)
            ], 10, sn))), 128))
          ])
        ])) : O("", !0),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: r.activeSubpanel === "recur" }]),
          onClick: o[16] || (o[16] = (n) => Et("recur"))
        }, [
          o[37] || (o[37] = t("span", { class: "todoist-menu-icon" }, "🔄", -1)),
          o[38] || (o[38] = t("span", { class: "todoist-menu-text" }, "设置循环周期", -1)),
          t("span", {
            class: "todoist-menu-badge",
            style: it(r.task.isRecurring ? "color:#7c3aed;font-weight:700;" : "")
          }, C(r.task.isRecurring ? r.task.dueString || "循环" : "无"), 5)
        ], 2),
        r.activeSubpanel === "recur" ? (a(), d("div", an, [
          t("div", ln, [
            (a(), d(Q, null, dt(j, (n) => t("button", {
              key: n.rule,
              type: "button",
              class: B(["todoist-recur-chip", { selected: Ee(n.rule) }]),
              onClick: (A) => We(n.rule, n.label)
            }, [
              t("span", null, C(n.icon), 1),
              t("span", null, C(n.label), 1)
            ], 10, dn)), 64))
          ]),
          t("div", rn, [
            nt(t("input", {
              "onUpdate:modelValue": o[17] || (o[17] = (n) => r.customRecurText = n),
              type: "text",
              class: "todoist-recur-custom-input",
              placeholder: "自定义循环 (如: every 2 weeks)…",
              onKeydown: _t(E(be, ["prevent"]), ["enter"])
            }, null, 40, cn), [
              [pt, r.customRecurText]
            ]),
            t("button", {
              type: "button",
              class: "todoist-recur-custom-submit",
              onClick: be
            }, "确定")
          ]),
          r.task.isRecurring ? (a(), d("button", {
            key: 0,
            type: "button",
            class: "todoist-recur-clear-btn",
            onClick: ze
          }, "❌ 清除循环（转为单次任务）")) : O("", !0)
        ])) : O("", !0),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: r.activeSubpanel === "color" }]),
          onClick: o[18] || (o[18] = (n) => Et("color"))
        }, [
          o[39] || (o[39] = t("span", { class: "todoist-menu-icon" }, "🎨", -1)),
          o[40] || (o[40] = t("span", { class: "todoist-menu-text" }, "选择标签颜色", -1)),
          t("span", un, [
            G.value.id === "none" ? (a(), d("span", pn, "⊘")) : (a(), d("span", {
              key: 1,
              class: "todoist-color-dot",
              style: it({
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
        r.activeSubpanel === "color" ? (a(), d("div", fn, [
          t("div", vn, [
            (a(), d(Q, null, dt(c, (n) => t("button", {
              key: n.id,
              type: "button",
              class: B(["todoist-color-swatch", { selected: G.value.id === n.id }]),
              title: n.name,
              onClick: (A) => Ue(n.id)
            }, [
              t("span", {
                class: B(["todoist-color-dot", { none: n.id === "none" }]),
                style: it(n.id !== "none" ? { background: n.hex } : {})
              }, C(n.id === "none" ? G.value.id === "none" ? "✓" : "⊘" : G.value.id === n.id ? "✓" : ""), 7),
              t("span", gn, C(n.name), 1)
            ], 10, mn)), 64))
          ])
        ])) : O("", !0),
        t("button", {
          type: "button",
          class: B(["todoist-task-menu-item", { active: r.activeSubpanel === "project" }]),
          onClick: o[19] || (o[19] = (n) => Et("project"))
        }, [...o[41] || (o[41] = [
          t("span", { class: "todoist-menu-icon" }, "📁", -1),
          t("span", { class: "todoist-menu-text" }, "移动到项目…", -1),
          t("span", { class: "todoist-menu-arrow" }, "›", -1)
        ])], 2),
        r.activeSubpanel === "project" ? (a(), d("div", {
          key: 3,
          class: B(["todoist-project-flyout", { "open-left": r.flyoutOpenLeft }]),
          style: it(r.flyoutStyle)
        }, [
          (a(!0), d(Q, null, dt(i(e).projects, (n) => (a(), d("button", {
            key: n.id,
            type: "button",
            class: B(["todoist-project-flyout-item", { active: String(n.id) === U.value }]),
            disabled: !!i(e).movingTaskId || String(n.id) === U.value,
            onClick: (A) => Ke(n)
          }, [
            o[42] || (o[42] = t("span", { class: "todoist-menu-icon" }, "📁", -1)),
            t("span", yn, C(n.name), 1),
            String(n.id) === U.value ? (a(), d("span", hn, "当前")) : O("", !0)
          ], 10, bn))), 128))
        ], 6)) : O("", !0),
        o[44] || (o[44] = t("div", { class: "todoist-task-menu-divider" }, null, -1)),
        t("button", {
          type: "button",
          class: "todoist-task-menu-item danger",
          onClick: Ve
        }, [
          o[43] || (o[43] = t("span", { class: "todoist-menu-icon" }, "🗑️", -1)),
          t("span", kn, C(r.task.isRecurring ? "删除重复任务…" : "删除任务"), 1)
        ])
      ], 4)) : O("", !0),
      f.isOpen && i(H).active ? (a(), d("div", {
        key: 7,
        class: "todoist-dialog-overlay",
        onKeydown: _t(E(Jt, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: o[22] || (o[22] = E(() => {
          }, ["stop"]))
        }, [
          t("div", Tn, [
            o[45] || (o[45] = t("span", { class: "todoist-dialog-icon" }, "✏️", -1)),
            t("h3", _n, C(f.title), 1)
          ]),
          t("div", xn, [
            f.message ? (a(), d("p", Cn, C(f.message), 1)) : O("", !0),
            nt(t("input", {
              ref_key: "promptInputRef",
              ref: z,
              "onUpdate:modelValue": o[21] || (o[21] = (n) => f.value = n),
              type: "text",
              class: "todoist-dialog-input",
              placeholder: f.placeholder,
              onKeydown: _t(E(he, ["prevent"]), ["enter"])
            }, null, 40, Dn), [
              [pt, f.value]
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
              onClick: he
            }, C(f.confirmText || "确定"), 1)
          ])
        ])
      ], 40, wn)) : O("", !0),
      b.isOpen && i(H).active ? (a(), d("div", {
        key: 8,
        class: "todoist-dialog-overlay",
        onKeydown: _t(E(Qt, ["stop", "prevent"]), ["esc"])
      }, [
        t("div", {
          class: "todoist-dialog-card",
          onClick: o[23] || (o[23] = E(() => {
          }, ["stop"]))
        }, [
          t("div", Sn, [
            t("span", Pn, C(b.icon || "⚠️"), 1),
            t("h3", On, C(b.title), 1)
          ]),
          t("div", Rn, [
            b.danger ? (a(), d("div", Mn, [
              t("div", jn, C(b.alertText), 1)
            ])) : O("", !0),
            t("p", Ln, C(b.message), 1)
          ]),
          t("div", An, [
            t("button", {
              type: "button",
              class: "todoist-dialog-btn",
              onClick: Qt
            }, "取消"),
            t("button", {
              type: "button",
              class: B(["todoist-dialog-btn", b.danger ? "danger" : "primary"]),
              onClick: Ge
            }, C(b.confirmText || "确定"), 3)
          ])
        ])
      ], 40, In)) : O("", !0)
    ]));
  }
}), Wn = /* @__PURE__ */ Yt(En, [["__scopeId", "data-v-19108c84"]]), zn = { class: "inspector-title-row" }, Un = ["href"], Kn = {
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
}, pi = { class: "inspector-section inspector-time-hub" }, fi = { class: "section-head-row" }, vi = { class: "hub-header-title" }, mi = { class: "time-hub-cards-row" }, gi = { class: "time-hub-card start-card" }, bi = { class: "time-card-head" }, yi = { class: "time-card-inputs" }, hi = { class: "time-input-wrap" }, ki = { class: "time-hub-card due-card" }, wi = { class: "time-card-head" }, Ti = { class: "time-card-inputs" }, _i = { class: "time-input-wrap" }, xi = "todoistInspectorPosition", Ci = /* @__PURE__ */ St({
  __name: "TodoistInspectorDrawer",
  setup(T) {
    const e = k, p = ft(() => yt.get(e.taskId)), {
      panelRef: m,
      headerRef: _,
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
    }), R = K(""), N = K(""), L = K(""), g = K(""), f = K(""), z = K(""), b = K(!1), r = K(!1), D = K(null);
    tt(() => e.title, (w) => {
      R.value = w || "";
    }, { immediate: !0 }), tt(() => e.description, (w) => {
      N.value = (w || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
    }, { immediate: !0 }), tt(() => e.startDate, (w) => {
      L.value = w || "";
    }, { immediate: !0 }), tt(() => e.startTime, (w) => {
      g.value = w || "";
    }, { immediate: !0 }), tt(() => e.dueDate, (w) => {
      f.value = w || "";
    }, { immediate: !0 }), tt(() => e.dueTime, (w) => {
      z.value = w || "";
    }, { immediate: !0 });
    const h = ft(() => {
      const w = L.value, u = g.value, x = f.value, J = z.value;
      if (w && x) {
        const Z = $t(w, u), ot = $t(x, J);
        return `${Z} ~ ${ot}`;
      }
      return w && !x ? `自 ${$t(w, u)} 起 (无截止)` : !w && x ? `截止 ${$t(x, J)}` : "";
    }), c = ft(() => {
      const w = L.value, u = f.value;
      return w && u ? "status-range" : w && !u ? "status-start-only" : !w && u ? "status-due-only" : "";
    });
    function j() {
      const w = /* @__PURE__ */ new Date();
      return `${w.getFullYear()}-${String(w.getMonth() + 1).padStart(2, "0")}-${String(w.getDate()).padStart(2, "0")}`;
    }
    function U() {
      g.value && !L.value && (L.value = j()), rt.setStartDateAndTime(L.value, g.value);
    }
    function ct() {
      g.value = "", U();
    }
    function at() {
      L.value = "", g.value = "", U();
    }
    function G() {
      z.value && !f.value && (f.value = j()), rt.setDueDateAndTime(f.value, z.value);
    }
    function gt() {
      z.value = "", G();
    }
    function wt() {
      f.value = "", z.value = "", G();
    }
    function xt() {
      at(), wt();
    }
    const v = ft(() => {
      const w = [], u = /* @__PURE__ */ new Set(), x = e.description || "", J = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
      let Z;
      for (; (Z = J.exec(x)) !== null; ) {
        const ot = Z[2];
        u.add(ot), w.push({
          name: Z[1] || "任务照片",
          url: ot
        });
      }
      for (const ot of e.commentAttachments || [])
        u.has(ot.url) || (u.add(ot.url), w.push(ot));
      return w;
    });
    let I, y;
    function S() {
      const w = (e.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join(`

`);
      return {
        taskId: e.taskId,
        title: R.value,
        description: [N.value.trim(), w].filter(Boolean).join(`

`)
      };
    }
    function M() {
      clearTimeout(I), I = void 0;
      const w = y;
      if (y = void 0, w?.taskId && w.title.trim())
        return rt.saveTitleAndDesc(w.title, w.description, w.taskId);
    }
    function V(w) {
      w && "isComposing" in w && w.isComposing || (y = S(), rt.stageTitleDraft(y.taskId, y.title, y.description), clearTimeout(I), I = setTimeout(M, 800));
    }
    tt(() => e.taskId, () => M(), { flush: "sync" });
    function vt() {
      M(), rt.close();
    }
    function et(w) {
      w && "isComposing" in w && w.isComposing || M();
    }
    function mt() {
      y = S(), M();
    }
    function X(w) {
      const u = Pt(w);
      u && (w.preventDefault(), w.stopPropagation(), Ct(u));
    }
    function bt() {
      H.active && D.value?.click();
    }
    async function Bt(w) {
      const u = w.target;
      if (!H.active) {
        u.value = "";
        return;
      }
      const x = u.files?.[0];
      x && await Ct(x), u.value = "";
    }
    async function Ht(w) {
      r.value = !1;
      const u = w.dataTransfer?.files?.[0];
      u && (u.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(u.name)) && await Ct(u);
    }
    function Pt(w) {
      const u = w.clipboardData;
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
            const Z = J.getAsFile();
            if (Z) return Z;
          }
        }
      return null;
    }
    async function Ct(w) {
      if (b.value || !H.active || !e.taskId) return;
      const u = e.taskId;
      b.value = !0;
      try {
        if (await M(), e.taskId !== u || !e.isOpen || !H.active) return;
        await rt.attachImageToTask(w);
      } catch (x) {
        e.taskId === u && (e.error = x instanceof Error ? x.message : "上传失败");
      } finally {
        b.value = !1;
      }
    }
    function Gt(w) {
      const u = Pt(w);
      u && (w.preventDefault(), Ct(u));
    }
    function Ot(w) {
      if (!e.isOpen || !H.active) return;
      const u = Pt(w);
      u && (w.preventDefault(), w.stopPropagation(), Ct(u));
    }
    tt(() => H.active, (w) => {
      window.removeEventListener("paste", Ot, { capture: !0 }), w && window.addEventListener("paste", Ot, { capture: !0 });
    }, { immediate: !0, flush: "sync" }), At(() => {
      M(), window.removeEventListener("paste", Ot, { capture: !0 });
    });
    async function Rt(w) {
      const u = e.description || "", x = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), J = u.replace(new RegExp(`!\\[[^\\]]*\\]\\(${x}\\)`, "g"), "").trim();
      await rt.saveTitleAndDesc(e.title, J);
    }
    return (w, u) => nt((a(), d("aside", {
      ref_key: "panelRef",
      ref: m,
      class: "todoist-inspector-window",
      style: it(i($)),
      "aria-label": "Todoist 任务属性独立窗口",
      onPaste: Gt
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: _,
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
          onPointerdown: u[0] || (u[0] = E(() => {
          }, ["stop"])),
          onClick: E(vt, ["stop"])
        }, "×", 32)
      ], 544),
      i(e).isOpen ? (a(), d("div", Kn, [
        p.value ? (a(), d("div", Nn, [
          p.value.status === "failed" ? (a(), d(Q, { key: 0 }, [
            t("span", null, "保存未确认，草稿保留在当前页面。" + C(p.value.error), 1),
            t("button", {
              type: "button",
              disabled: i(e).saving || !R.value.trim(),
              onClick: mt
            }, "重试保存", 8, Vn)
          ], 64)) : (a(), d("span", Fn, C(p.value.status === "saving" ? "正在保存…" : R.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存"), 1)),
          p.value.status === "editing" ? (a(), d("button", {
            key: 2,
            type: "button",
            disabled: i(e).saving || !R.value.trim(),
            onClick: mt
          }, "保存草稿", 8, Yn)) : O("", !0),
          u[15] || (u[15] = t("small", null, "刷新或关闭浏览器标签页会丢失未保存草稿。", -1))
        ])) : O("", !0),
        i(e).error ? (a(), d("p", Bn, C(i(e).error), 1)) : O("", !0),
        t("section", Hn, [
          u[16] || (u[16] = t("label", { class: "inspector-label" }, "任务标题", -1)),
          nt(t("input", {
            "onUpdate:modelValue": u[2] || (u[2] = (x) => R.value = x),
            disabled: b.value,
            type: "text",
            class: "inspector-input-title",
            placeholder: "任务标题",
            onInput: V,
            onCompositionend: V,
            onBlur: et,
            onKeydown: _t(E(et, ["prevent"]), ["enter"])
          }, null, 40, Gn), [
            [pt, R.value]
          ])
        ]),
        t("section", qn, [
          t("div", Xn, [
            t("label", Jn, [
              u[17] || (u[17] = Vt(" 任务描述 ", -1)),
              v.value.length ? (a(), d("span", Qn, " · 包含 " + C(v.value.length) + " 张照片 ", 1)) : O("", !0)
            ]),
            t("button", {
              type: "button",
              class: "inspector-add-img-btn",
              title: "选择本地图片文件上传至任务",
              onClick: bt
            }, "＋ 上传照片")
          ]),
          t("div", {
            class: B(["inspector-desc-composite-box", { dragging: r.value, uploading: b.value }]),
            onDragover: u[4] || (u[4] = E((x) => r.value = !0, ["prevent"])),
            onDragleave: u[5] || (u[5] = E((x) => r.value = !1, ["prevent"])),
            onDrop: E(Ht, ["prevent"])
          }, [
            nt(t("textarea", {
              "onUpdate:modelValue": u[3] || (u[3] = (x) => N.value = x),
              disabled: b.value,
              rows: "8",
              class: "inspector-textarea-desc",
              placeholder: "添加文字说明…（直接拖入照片，或在此 Ctrl+V 粘贴图片即可贴入）",
              onInput: V,
              onCompositionend: V,
              onBlur: et,
              onPaste: X
            }, null, 40, Zn), [
              [pt, N.value]
            ]),
            v.value.length > 0 ? (a(), d("div", ti, [
              (a(!0), d(Q, null, dt(v.value, (x, J) => (a(), d("div", {
                key: J,
                class: "attached-img-card"
              }, [
                t("div", {
                  class: "attached-img-link",
                  title: "点击在小窗查看大图",
                  onClick: (Z) => i(Ft).open(x.url, x.name)
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
                      onClick: (Z) => i(Ft).open(x.url, x.name)
                    }, "查看 ↗", 8, ai),
                    t("button", {
                      type: "button",
                      class: "attached-del-btn",
                      title: "从任务中移除此照片",
                      onClick: (Z) => Rt(x.url)
                    }, "×", 8, li)
                  ])
                ])
              ]))), 128))
            ])) : O("", !0),
            t("div", di, [
              b.value ? (a(), d("span", ri, "⏳ 照片上传同步中…")) : r.value ? (a(), d("span", ci, "📥 松开鼠标立即存入照片")) : (a(), d("span", ui, "📷 拖入图片或按 Ctrl+V 粘贴照片")),
              t("button", {
                type: "button",
                class: "composite-attach-icon",
                title: "选择本地照片",
                onClick: E(bt, ["stop"])
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
              h.value ? (a(), d("span", {
                key: 0,
                class: B(["time-plan-badge", c.value])
              }, C(h.value), 3)) : O("", !0)
            ]),
            L.value || f.value ? (a(), d("button", {
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
                L.value || g.value ? (a(), d("button", {
                  key: 0,
                  type: "button",
                  class: "time-clear-btn",
                  title: "清除开始时间",
                  onClick: at
                }, "✕")) : O("", !0)
              ]),
              t("div", yi, [
                nt(t("input", {
                  "onUpdate:modelValue": u[6] || (u[6] = (x) => L.value = x),
                  type: "date",
                  class: "inspector-date-input",
                  title: "选择开始日期",
                  onChange: U
                }, null, 544), [
                  [pt, L.value]
                ]),
                t("div", hi, [
                  nt(t("input", {
                    "onUpdate:modelValue": u[7] || (u[7] = (x) => g.value = x),
                    type: "time",
                    class: "inspector-time-input",
                    placeholder: "具体时间",
                    title: "随时设置具体时间 (如 12:00)",
                    onChange: U
                  }, null, 544), [
                    [pt, g.value]
                  ]),
                  g.value ? (a(), d("button", {
                    key: 0,
                    type: "button",
                    class: "time-sub-clear",
                    title: "清除具体时间",
                    onClick: ct
                  }, "×")) : O("", !0)
                ])
              ])
            ]),
            u[21] || (u[21] = t("div", { class: "time-hub-arrow" }, "至", -1)),
            t("div", ki, [
              t("div", wi, [
                u[20] || (u[20] = t("span", { class: "time-card-label" }, "▣ 截止日期", -1)),
                f.value || z.value ? (a(), d("button", {
                  key: 0,
                  type: "button",
                  class: "time-clear-btn",
                  title: "清除截止时间",
                  onClick: wt
                }, "✕")) : O("", !0)
              ]),
              t("div", Ti, [
                nt(t("input", {
                  "onUpdate:modelValue": u[8] || (u[8] = (x) => f.value = x),
                  type: "date",
                  class: "inspector-date-input",
                  title: "选择截止日期",
                  onChange: G
                }, null, 544), [
                  [pt, f.value]
                ]),
                t("div", _i, [
                  nt(t("input", {
                    "onUpdate:modelValue": u[9] || (u[9] = (x) => z.value = x),
                    type: "time",
                    class: "inspector-time-input",
                    placeholder: "具体时间",
                    title: "随时设置具体时间 (如 12:00)",
                    onChange: G
                  }, null, 544), [
                    [pt, z.value]
                  ]),
                  z.value ? (a(), d("button", {
                    key: 0,
                    type: "button",
                    class: "time-sub-clear",
                    title: "清除具体时间",
                    onClick: gt
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
}), Di = /* @__PURE__ */ Yt(Ci, [["__scopeId", "data-v-098b5d8a"]]), $i = { class: "vue-todoist-workspace-wrapper" }, Ii = { class: "todoist-head-title-wrap" }, Si = { id: "todoist-workspace-title" }, Pi = {
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
  setup(T) {
    const e = K(!1), p = Xe(() => import("./TodoistAccountSettings-Dp722bKz.js")), m = K(!1), _ = K(!1), $ = K(!document.hidden), W = K(!1), P = ft(() => H.visible && $.value);
    H.session++, H.active = P.value;
    let R = !1;
    const N = K(null), L = eo;
    function g() {
      f.value && (f.value.style.removeProperty("width"), f.value.style.removeProperty("height"), f.value.style.removeProperty("left"), f.value.style.removeProperty("top"), f.value.style.removeProperty("right"), f.value.style.removeProperty("bottom"), f.value.style.removeProperty("margin"), f.value.style.removeProperty("transform"));
    }
    tt(() => H.visible, (y) => {
      y && (L.isOpen = !0, H.active = $.value, Y.loadWorkspace());
    }, { immediate: !0 });
    const {
      panelRef: f,
      headerRef: z,
      initialStyle: b,
      stopInteractions: r,
      onHeaderPointerDown: D,
      onResizePointerDown: h,
      bringToFront: c
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
    }), j = () => f.value;
    function U() {
      ie(), so(), no(), rt.cancelReads(), r(), window.removeEventListener("keydown", G);
    }
    const ct = Ze(U);
    function at() {
      $.value = !document.hidden;
    }
    function G(y) {
      y.key === "Escape" && k.isOpen && (y.preventDefault(), y.stopPropagation(), rt.close());
    }
    tt(P, (y) => {
      H.active = y, y ? (window.addEventListener("keydown", G), R || (R = !0, Y.loadWorkspace()), ht(() => {
        P.value && c();
      })) : U();
    }, { flush: "sync" }), tt(m, (y) => {
      y && (_.value = !0);
    }), tt([P, e, Ce], ([y, S, M]) => {
      if (!(!y || !S || !M) && (Ce.value = null, io("todoist") === M.transition)) {
        if (H.pendingWrites || k.isOpen && k.taskId !== M.id) {
          ae.show({ appName: "Todoist", title: "任务详情已保留", message: "请先完成当前操作并关闭已有任务详情，再点击日历任务。", showActions: !1 });
          return;
        }
        k.isOpen && k.taskId === M.id || rt.openTask(M.id);
      }
    }, { flush: "post" }), le(() => {
      e.value = !0, W.value && ht(g), Wt.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: j }), document.addEventListener("visibilitychange", at), P.value && (window.addEventListener("keydown", G), R || (R = !0, Y.loadWorkspace()), De.refresh());
    }), At(() => {
      to(), ct(), document.removeEventListener("visibilitychange", at), Wt.unregister("todoist", j), rt.close(), Object.assign(k, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" }), Y.updateState({
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
    function gt() {
      oe.toggleCalendar();
    }
    function wt() {
      oe.refresh();
    }
    function xt() {
      Y.updateState({ accountConfigured: !0 }), P.value && Y.loadWorkspace(void 0, void 0, !0);
    }
    function v() {
      Wt.minimize("todoist");
    }
    function I() {
      H.visible = !1, L.isOpen = !1, Wt.close("todoist");
    }
    return (y, S) => (a(), d("div", $i, [
      nt(t("section", {
        id: "todoist-workspace",
        ref_key: "panelRef",
        ref: f,
        class: "card wide todoist-workspace",
        style: it(i(b)),
        "aria-label": "Todoist 工作区"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: z,
          class: "todoist-workspace-head",
          onPointerdown: S[4] || (S[4] = (M) => i(D)(M))
        }, [
          t("div", Ii, [
            S[10] || (S[10] = t("span", {
              class: "todoist-mark",
              "aria-hidden": "true"
            }, "✓", -1)),
            t("h2", Si, C(i(L).title), 1)
          ]),
          t("nav", Pi, [
            Mt(co)
          ]),
          t("button", {
            id: "todoist-calendar-toggle-btn",
            class: B(["todoist-shelf-tool todoist-calendar-toggle-btn", { on: i(L).isCalendarOpen }]),
            type: "button",
            title: "展开/收起左侧 DayLine 日历拓展",
            onClick: gt
          }, " 📅 日历 ", 2),
          S[11] || (S[11] = t("span", { class: "grow" }, null, -1)),
          t("span", Oi, C(i(H).pendingWrites ? "写入处理中；可以隐藏，暂不能退出" : "隐藏保留草稿；退出保留首页限时任务"), 1),
          t("button", {
            id: "todoist-settings-open",
            ref_key: "accountSettingsButton",
            ref: N,
            type: "button",
            class: "no-drag",
            title: "Todoist 模组设置",
            "aria-expanded": m.value,
            onClick: S[0] || (S[0] = E((M) => m.value = !m.value, ["stop"]))
          }, " ⚙️ ", 8, Ri),
          _.value ? (a(), Te(i(p), {
            key: 0,
            visible: P.value && m.value,
            anchor: N.value,
            onClose: S[1] || (S[1] = (M) => m.value = !1),
            onAccountSaved: xt
          }, null, 8, ["visible", "anchor"])) : O("", !0),
          t("button", {
            id: "todoist-workspace-refresh",
            type: "button",
            title: "刷新",
            onClick: wt
          }, " ↻ "),
          t("button", {
            id: "todoist-workspace-minimize",
            class: "no-drag",
            type: "button",
            title: "最小化（标签保留）",
            onPointerdown: S[2] || (S[2] = E(() => {
            }, ["stop"])),
            onClick: E(v, ["stop"])
          }, " − ", 32),
          t("button", {
            id: "todoist-workspace-close",
            class: "no-drag",
            type: "button",
            title: "隐藏窗口 (Esc)；Dock 退出释放窗口资源",
            onPointerdown: S[3] || (S[3] = E(() => {
            }, ["stop"])),
            onClick: E(I, ["stop"])
          }, " ✕ ", 32)
        ], 544),
        i(kt).accountConfigured === !1 ? (a(), Te(ao, {
          key: 0,
          icon: "✅",
          title: "尚未配置 Todoist Token",
          description: "在设置中填写 Todoist API Token，即可读取和管理你的任务。",
          "secondary-url": "https://app.todoist.com/app/settings/integrations/developer",
          "secondary-label": "获取 Todoist Token",
          onConfigure: S[5] || (S[5] = (M) => m.value = !0)
        })) : (a(), d("div", Mi, [
          nt(t("div", ji, [
            Mt(Jo)
          ], 512), [
            [ne, i(L).isCalendarOpen]
          ]),
          t("div", Li, [
            Mt(Wn)
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
            onPointerdown: S[6] || (S[6] = (M) => i(h)(M, "n"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-e",
            "data-resize-edge": "e",
            "aria-hidden": "true",
            onPointerdown: S[7] || (S[7] = (M) => i(h)(M, "e"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-s",
            "data-resize-edge": "s",
            "aria-hidden": "true",
            onPointerdown: S[8] || (S[8] = (M) => i(h)(M, "s"))
          }, null, 32),
          t("i", {
            class: "todoist-resize-handle todoist-resize-w",
            "data-resize-edge": "w",
            "aria-hidden": "true",
            onPointerdown: S[9] || (S[9] = (M) => i(h)(M, "w"))
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
