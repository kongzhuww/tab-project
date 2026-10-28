import { d as se, x as J, C as ae, y as ue, o, e as n, f as e, m as X, t as r, g as b, u as s, F as j, h as ee, i as ce, B as Q, b as f, s as ke, D as ne, l as te, n as ie, c as ve, G as le, z as fe, A as he } from "./vendor-vue-DokqDua_.js";
import { _ as ye, a0 as N, a2 as be, p as a, A as Z, a3 as we } from "./search.service-D8BPpHmG.js";
import { i as _e } from "./images-DKKVKjaO.js";
import { i as Te, t as O, a as re, T as de, d as Ce } from "./todoist.service-CJhh6PtZ.js";
import { n as Ee } from "./view-styles-DcR4NtZM.js";
import { t as U, w as pe } from "./module-state-Dt_XKbbf.js";
import { e as me } from "./calendar.service-DB6_5Mkx.js";
import { u as Ie, f as $e, a as Le, T as xe, r as Se, b as Ne } from "./TodoistDatePickerPopover-p_bbL9Ka.js";
import { R as Re } from "./read-session-e15k1OwA.js";
import { _ as oe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { openTodoistTask as Ae } from "./task-navigation-CtkR4LCq.js";
const Me = ["aria-busy"], Oe = { class: "linked-tasks-heading" }, De = { key: 0 }, He = ["disabled"], Ve = {
  key: 0,
  class: "linked-tasks-message",
  role: "status"
}, We = {
  key: 1,
  class: "linked-tasks-message",
  role: "status"
}, qe = {
  key: 2,
  class: "linked-tasks-message",
  role: "alert"
}, Ge = {
  key: 3,
  class: "linked-tasks-empty"
}, Pe = {
  key: 4,
  class: "linked-tasks-list",
  tabindex: "0",
  "aria-label": "关联任务列表，可滚动"
}, Ue = {
  key: 0,
  class: "linked-task-card"
}, je = ["disabled", "aria-label", "title", "onClick"], Be = ["disabled", "aria-label", "onClick"], Fe = {
  key: 0,
  class: "linked-task-description"
}, Ye = {
  key: 1,
  class: "linked-task-meta"
}, ze = ["title"], Je = {
  key: 1,
  class: "linked-task-unavailable",
  role: "status"
}, Xe = /* @__PURE__ */ se({
  __name: "GitHubRepositoryLinkedTasks",
  props: {
    repositoryName: {},
    disabled: { type: Boolean }
  },
  emits: ["openTask"],
  setup(W, { emit: q }) {
    const y = W, A = q, C = f([]), $ = f(!1), h = f(""), w = f(""), E = f(""), H = f(""), M = ke(() => C.value.filter((u) => !u.task || !Te(u.task))), I = new Re();
    let m = !1, D = !0, V = !1;
    const g = f(!document.hidden), L = () => m && D && g.value;
    Ie(() => g.value && !y.disabled, () => I.cancel(), () => R());
    function R() {
      V || !L() || (V = !0, queueMicrotask(() => {
        V = !1, L() && !U.pendingWrites && F();
      }));
    }
    async function F() {
      if (!L() || U.pendingWrites) return;
      I.cancel(), h.value = "", w.value = "", C.value = [];
      let u;
      try {
        const l = $e(y.repositoryName);
        u = l.taskIds, l.unreadableCount && (w.value = "部分本机关联记录无法读取，列表可能不完整；未修改记录。");
      } catch {
        h.value = "本机关联记录读取失败，请稍后刷新；未修改记录。";
        return;
      }
      if (!u.length) return;
      C.value = u.map((l) => ({ id: l }));
      const T = y.repositoryName;
      let d = null;
      const v = I.begin({
        timeoutMs: 3e4,
        isCurrent: () => L() && y.repositoryName === T && (d === null || d === O.getToken()),
        onStop: (l) => {
          $.value = !1, l === "timeout" && (h.value = "关联任务读取超时，保留已读取结果，请手动刷新。");
        }
      });
      $.value = !0;
      try {
        if (d = await v.wait(() => O.initToken()), !v.current()) return;
        if (!d.trim()) {
          h.value = "请先配置 Todoist 账号，才能读取已关联的任务。";
          return;
        }
        let l = 0;
        const i = async () => {
          for (; v.current(); ) {
            const c = l++;
            if (c >= u.length) return;
            const _ = u[c];
            try {
              const x = await v.wait(() => O.api("/tasks/" + encodeURIComponent(_), { signal: v.signal }));
              if (!v.current()) return;
              if (!x || typeof x != "object") throw new Error("Invalid task");
              const S = x;
              if (String(S.id) !== _ || typeof S.content != "string" || S.is_deleted || S.checked === void 0 && S.is_completed === void 0 || S.checked !== void 0 && typeof S.checked != "boolean" || S.is_completed !== void 0 && typeof S.is_completed != "boolean") throw new Error("Invalid task");
              C.value[c] = { id: _, task: S };
            } catch (x) {
              if (!v.current()) return;
              C.value[c] = { id: _, error: re(x) };
            }
          }
        };
        await Promise.allSettled(Array.from({ length: Math.min(3, u.length) }, i));
      } catch {
        v.current() && (h.value = "Todoist 配置或任务读取失败，请手动刷新。");
      } finally {
        v.finish() && ($.value = !1);
      }
    }
    async function B(u) {
      if (!u.task || y.disabled || E.value || U.pendingWrites || !L()) return;
      const T = u.id, d = y.repositoryName, v = u.task, l = O.getToken();
      E.value = T, H.value = "", I.cancel();
      let i = !1, c = !1;
      try {
        await pe(async () => {
          const _ = await O.initToken();
          if (!_ || _ !== l || !L() || y.repositoryName !== d || y.disabled) throw new Error("Not submitted");
          if (i = !0, await O.toggleTaskCompletion(T, !0), c = !0, O.invalidateWorkspaceSnapshots(), !m || _ !== O.getToken()) return;
          u.task = { ...v, checked: !0, is_completed: !0 };
          const { todoistCalendarSidebarController: x } = await import("./calendar.service-DB6_5Mkx.js").then((S) => S.o);
          !m || _ !== O.getToken() || x.recordTaskCompletion({
            id: T,
            content: v.content,
            description: v.description,
            completed: !0,
            dueDate: v.due?.date,
            _taskRaw: v
          }, !0);
        }), U.active && me.loadWorkspace(void 0, void 0, !0);
      } catch (_) {
        _ instanceof de && !_.submitted && (i = !1), m && y.repositoryName === d && (H.value = c ? "任务已完成，但本地显示更新失败，请刷新核对。" : i ? "完成结果未确认，请刷新核对；未自动重试。" : _ instanceof de ? re(_) + " 尚未提交完成操作。" : "页面或账号状态已变化，尚未提交完成操作。");
      } finally {
        E.value = "", R();
      }
    }
    function G(u) {
      u instanceof StorageEvent && u.key !== null && !u.key.startsWith("todoist_repository_links_v1:") || R();
    }
    function P() {
      g.value = !document.hidden, L() ? R() : I.cancel();
    }
    function k() {
      D = !1, I.cancel();
    }
    function t() {
      D = !0, P();
    }
    function p(u, T) {
      T !== "local" || !Object.prototype.hasOwnProperty.call(u, Ce) || (I.cancel(), C.value = [], h.value = "", R());
    }
    return J(() => y.repositoryName, () => {
      I.cancel(), C.value = [], R();
    }), J(() => U.pendingWrites, (u, T) => {
      u ? I.cancel() : T && R();
    }), ae(() => {
      m = !0, window.addEventListener("storage", G), window.addEventListener("todoist-repository-links-changed", G), document.addEventListener("visibilitychange", P), window.addEventListener("pagehide", k), window.addEventListener("pageshow", t), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(p), R();
    }), ue(() => {
      m = !1, I.cancel(), window.removeEventListener("storage", G), window.removeEventListener("todoist-repository-links-changed", G), document.removeEventListener("visibilitychange", P), window.removeEventListener("pagehide", k), window.removeEventListener("pageshow", t), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(p);
    }), (u, T) => (o(), n("section", {
      class: "repository-linked-tasks",
      "aria-label": "当前仓库关联的 Todoist 任务",
      "aria-busy": $.value
    }, [
      e("div", Oe, [
        e("h3", null, [
          T[0] || (T[0] = X("关联任务 ", -1)),
          M.value.length ? (o(), n("small", De, r(M.value.length), 1)) : b("", !0)
        ]),
        e("button", {
          type: "button",
          class: "linked-tasks-refresh",
          disabled: $.value || W.disabled || !!s(U).pendingWrites,
          onClick: F
        }, r($.value ? "读取中…" : "刷新"), 9, He)
      ]),
      h.value ? (o(), n("p", Ve, r(h.value), 1)) : b("", !0),
      w.value ? (o(), n("p", We, r(w.value), 1)) : b("", !0),
      H.value ? (o(), n("p", qe, r(H.value), 1)) : b("", !0),
      !M.value.length && !h.value ? (o(), n("p", Ge, "暂无未完成的关联任务")) : b("", !0),
      M.value.length ? (o(), n("div", Pe, [
        (o(!0), n(j, null, ee(M.value, (d) => (o(), n(j, {
          key: d.id
        }, [
          d.task ? (o(), n("article", Ue, [
            e("button", {
              type: "button",
              class: Q(["linked-task-check", { pending: E.value === d.id }]),
              disabled: W.disabled || !!E.value || !!s(U).pendingWrites,
              "aria-label": "完成任务：" + d.task.content,
              title: E.value === d.id ? "正在提交完成…" : "完成任务",
              onClick: ce((v) => B(d), ["stop"])
            }, r(E.value === d.id ? "…" : ""), 11, je),
            e("button", {
              type: "button",
              class: "linked-task-body",
              disabled: W.disabled || !!E.value,
              "aria-label": "在插件中打开任务：" + d.task.content,
              onClick: (v) => A("openTask", d.id)
            }, [
              e("strong", null, r(d.task.content || "未命名任务"), 1),
              d.task.description ? (o(), n("span", Fe, r(d.task.description), 1)) : b("", !0),
              d.task.due?.date || d.task.labels?.length ? (o(), n("span", Ye, [
                d.task.due?.date ? (o(), n("span", {
                  key: 0,
                  title: d.task.due.date
                }, "▦ " + r(d.task.due.date), 9, ze)) : b("", !0),
                (o(!0), n(j, null, ee((d.task.labels || []).slice(0, 3), (v) => (o(), n("span", { key: v }, "◇ " + r(v), 1))), 128))
              ])) : b("", !0)
            ], 8, Be)
          ])) : (o(), n("p", Je, r(d.error || ($.value ? "正在读取关联任务…" : "任务尚未读取，请刷新核对。")), 1))
        ], 64))), 128))
      ])) : b("", !0)
    ], 8, Me));
  }
}), Ke = /* @__PURE__ */ oe(Xe, [["__scopeId", "data-v-6193401f"]]), Ze = {
  class: "github-repository-tasks",
  "aria-label": "仓库关联任务与创建栏"
}, Qe = ["disabled"], et = { class: "task-pane-content" }, tt = { class: "repository-reference" }, st = {
  key: 0,
  class: "task-guide"
}, at = {
  key: 1,
  class: "task-destination"
}, ot = {
  key: 2,
  class: "task-feedback",
  role: "alert"
}, nt = {
  key: 3,
  class: "task-receipt"
}, it = ["disabled"], lt = ["disabled"], rt = { key: 0 }, dt = ["disabled"], ut = ["disabled"], ct = /* @__PURE__ */ se({
  __name: "GitHubRepositoryTasks",
  props: {
    repository: {}
  },
  emits: ["close", "openTask"],
  setup(W, { emit: q }) {
    const y = W, A = q, C = ye(), $ = f(""), h = f(""), w = f(""), E = f(""), H = f(null), M = f(!1), I = f(!0), m = f(""), D = f(!1), V = f(!1), g = f(null), L = "github_task_attempt_v1:" + y.repository.fullName.toLowerCase();
    function R() {
      try {
        const k = localStorage.getItem(L);
        if (!k) return;
        const t = JSON.parse(k);
        if (!t || typeof t.requestId != "string" || typeof t.content != "string" || !t.target || typeof t.target.title != "string" || t.repository?.fullName !== y.repository.fullName || t.taskId !== void 0 && typeof t.taskId != "string") throw new Error();
        g.value = t, t.taskId && (V.value = Se(t.taskId).some((p) => p.fullName.toLowerCase() === y.repository.fullName.toLowerCase()));
      } catch {
        D.value = !0, m.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
      }
    }
    ae(R);
    async function F() {
      if (N.saving || g.value || D.value || !$.value.trim() || !C.value || !I.value) return;
      const k = { ...C.value }, t = { ...y.repository }, p = { content: $.value.trim(), description: h.value.trim(), project_id: k.projectId, section_id: k.sectionId, due_string: w.value ? w.value + (E.value ? " " + E.value : "") : void 0 };
      N.saving = !0, m.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(L, { ifAvailable: !0 }, async (u) => {
          if (!u) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          R(), !(g.value || D.value) && await pe(async () => {
            const T = await O.initToken(), d = await O.api("/sections/" + encodeURIComponent(k.sectionId));
            if (be(), document.hidden || !T || T !== O.getToken() || C.value?.sectionId !== k.sectionId || C.value?.projectId !== k.projectId) throw new Error("配置或页面状态已变化，尚未提交，请重新确认任务区。");
            if (!d || String(d.id) !== k.sectionId || String(d.project_id) !== k.projectId || d.is_deleted || d.is_archived) throw new Error("目标分组不存在、已归档或已移动，请在 Todoist 中重新指定任务区。");
            const v = { requestId: crypto.randomUUID(), repository: t, target: { ...k, title: d.name || k.title }, content: p.content };
            localStorage.setItem(L, JSON.stringify(v)), g.value = v;
            try {
              const l = await O.createTask(p, v.requestId);
              if (!l || typeof l.id != "string") throw new Error();
              v.taskId = l.id, g.value = { ...v };
              try {
                localStorage.setItem(L, JSON.stringify(v));
              } catch {
                m.value = "任务已创建，但本机回执保存失败，请记录任务地址；不要重复创建。";
              }
              O.invalidateWorkspaceSnapshots(), (String(l.project_id) !== k.projectId || String(l.section_id) !== k.sectionId) && (m.value = "任务已创建，但返回的分组与目标不一致，请核对任务地址；未重新提交。"), B(), Ee.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: v.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: l.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), U.active && me.loadWorkspace(void 0, void 0, !0);
            } catch {
              m.value = g.value?.taskId ? "任务已创建，但后续界面更新未完成，请使用任务地址核对；不要重复创建。" : "创建结果未确认，请核对原 Todoist 分组。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (u) {
        m.value = u instanceof Error && !g.value ? u.message : "本机提交记录保存失败，尚未发送创建请求。";
      } finally {
        N.saving = !1;
      }
    }
    function B() {
      const k = g.value;
      if (k?.taskId)
        try {
          Ne(k.taskId, k.repository), V.value = !0, m.value.startsWith("任务已创建，但仓库卡片保存失败") && (m.value = "");
        } catch {
          m.value = "任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。";
        }
    }
    async function G() {
      if (N.saving || !g.value) return !1;
      const k = g.value.requestId;
      N.saving = !0;
      try {
        if (!navigator.locks) throw new Error();
        return await navigator.locks.request(L, { ifAvailable: !0 }, async (t) => {
          if (!t)
            return m.value = "另一个标签页正在提交，请稍后核对。", !1;
          const p = localStorage.getItem(L), u = p ? JSON.parse(p) : null;
          return u && u.requestId !== k ? (R(), m.value = "其他标签页已更新提交记录，请先核对最新任务。", !1) : (localStorage.removeItem(L), g.value = null, m.value = "", !0);
        });
      } catch {
        return m.value = "本机提交记录无法更新，未解除保护。", !1;
      } finally {
        N.saving = !1;
      }
    }
    async function P() {
      await G() && ($.value = "", h.value = "", w.value = "", E.value = "", V.value = !1, I.value = !0);
    }
    return (k, t) => (o(), n("aside", Ze, [
      e("header", null, [
        t[10] || (t[10] = e("div", null, [
          e("strong", null, "仓库任务"),
          e("small", null, "关联当前 GitHub 仓库")
        ], -1)),
        e("button", {
          type: "button",
          disabled: s(N).saving,
          "aria-label": "收起任务栏",
          onClick: t[0] || (t[0] = (p) => A("close"))
        }, "×", 8, Qe)
      ]),
      e("div", et, [
        ne(Ke, {
          "repository-name": W.repository.fullName,
          disabled: s(N).saving,
          onOpenTask: t[1] || (t[1] = (p) => A("openTask", p))
        }, null, 8, ["repository-name", "disabled"]),
        t[19] || (t[19] = e("h3", { class: "task-create-heading" }, "创建任务", -1)),
        e("div", tt, [
          t[11] || (t[11] = e("span", null, "◇", -1)),
          e("div", null, [
            e("strong", null, r(W.repository.fullName), 1),
            e("small", null, r(W.repository.description || "创建后自动关联此仓库"), 1)
          ])
        ]),
        s(C) ? (o(), n("p", at, [
          t[12] || (t[12] = X("创建到 ", -1)),
          e("strong", null, r(s(C).title), 1),
          t[13] || (t[13] = e("small", null, "Todoist 分组 · 仅本机选择", -1))
        ])) : (o(), n("p", st, "请先打开 Todoist，在目标分组的“更多”菜单中选择“设为 GitHub 任务区”。设置后即可在此创建。")),
        m.value ? (o(), n("p", ot, r(m.value), 1)) : b("", !0),
        g.value ? (o(), n("section", nt, [
          g.value.taskId ? (o(), n(j, { key: 0 }, [
            t[14] || (t[14] = e("strong", null, "任务已创建", -1)),
            e("p", null, r(g.value.content), 1),
            e("button", {
              type: "button",
              class: "task-open-link",
              disabled: s(N).saving,
              onClick: t[2] || (t[2] = (p) => A("openTask", g.value.taskId))
            }, "在插件中打开任务 →", 8, it),
            ne(Le, {
              "task-id": g.value.taskId
            }, null, 8, ["task-id"]),
            V.value ? (o(), n("button", {
              key: 1,
              type: "button",
              onClick: P
            }, "继续创建")) : (o(), n("button", {
              key: 0,
              type: "button",
              disabled: s(N).saving,
              onClick: B
            }, "仅重试仓库关联", 8, lt))
          ], 64)) : (o(), n(j, { key: 1 }, [
            e("strong", null, r(s(N).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
            e("p", null, r(g.value.content), 1),
            s(N).saving ? (o(), n("small", rt, "正在提交至“" + r(g.value.target.title) + "”，请稍候。", 1)) : (o(), n(j, { key: 1 }, [
              e("small", null, "请先在 Todoist 核对原分组“" + r(g.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
              e("button", {
                type: "button",
                onClick: G
              }, "我已核对，允许新建")
            ], 64))
          ], 64))
        ])) : s(C) ? (o(), n("form", {
          key: 4,
          onSubmit: ce(F, ["prevent"])
        }, [
          e("fieldset", {
            disabled: s(N).saving || D.value
          }, [
            e("label", null, [
              t[15] || (t[15] = X("任务名称", -1)),
              te(e("textarea", {
                "onUpdate:modelValue": t[3] || (t[3] = (p) => $.value = p),
                rows: "2",
                maxlength: "500",
                placeholder: "要在这个仓库上做什么？",
                required: ""
              }, null, 512), [
                [ie, $.value]
              ])
            ]),
            e("label", null, [
              t[16] || (t[16] = X("描述", -1)),
              te(e("textarea", {
                "onUpdate:modelValue": t[4] || (t[4] = (p) => h.value = p),
                rows: "4",
                maxlength: "16000",
                placeholder: "记录目标、步骤或想法（可选）"
              }, null, 512), [
                [ie, h.value]
              ])
            ]),
            t[17] || (t[17] = e("label", null, "截止日期", -1)),
            e("button", {
              ref_key: "dateAnchor",
              ref: H,
              type: "button",
              class: "task-date-button",
              onClick: t[5] || (t[5] = (p) => M.value = !M.value)
            }, "▦ " + r(w.value ? w.value + (E.value ? " " + E.value : "") : "添加日期与时间"), 513),
            M.value ? (o(), ve(xe, {
              key: 0,
              modelValue: w.value,
              "onUpdate:modelValue": t[6] || (t[6] = (p) => w.value = p),
              "time-value": E.value,
              "onUpdate:timeValue": t[7] || (t[7] = (p) => E.value = p),
              "anchor-el": H.value,
              onTimeValidity: t[8] || (t[8] = (p) => I.value = p),
              onClose: t[9] || (t[9] = (p) => {
                M.value = !1, I.value = !0;
              })
            }, null, 8, ["modelValue", "time-value", "anchor-el"])) : b("", !0),
            t[18] || (t[18] = e("p", { class: "task-local-note" }, "名称、描述和截止日期提交至 Todoist；仓库卡片只保存在本插件。", -1)),
            e("button", {
              type: "submit",
              class: "create-task",
              disabled: !$.value.trim() || !I.value
            }, r(s(N).saving ? "正在创建…" : "创建任务"), 9, ut)
          ], 8, dt)
        ], 32)) : b("", !0)
      ])
    ]));
  }
}), vt = /* @__PURE__ */ oe(ct, [["__scopeId", "data-v-97c13a8f"]]), pt = {
  key: 0,
  class: "gh-modal-overlay"
}, mt = ["aria-label"], gt = { class: "gh-modal-title-wrap" }, kt = ["href"], ft = { class: "gh-owner" }, ht = { class: "gh-name" }, yt = { class: "gh-modal-actions" }, bt = {
  key: 0,
  class: "gh-status-tip"
}, wt = ["aria-expanded", "disabled"], _t = ["disabled"], Tt = { class: "gh-modal-content" }, Ct = { class: "gh-repository-content" }, Et = { class: "gh-modal-ribbon" }, It = { class: "gh-meta-badges" }, $t = {
  key: 0,
  class: "gh-meta-item gh-meta-zh",
  title: "当前已优先加载中文版 README"
}, Lt = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, xt = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, St = {
  key: 1,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Nt = {
  key: 2,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, Rt = {
  key: 3,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, At = {
  key: 0,
  class: "gh-modal-desc"
}, Mt = {
  key: 1,
  class: "gh-modal-topics"
}, Ot = { class: "gh-modal-body" }, Dt = {
  key: 0,
  class: "gh-status-tip"
}, Ht = { class: "gh-toc-title" }, Vt = { class: "gh-toc-arrow" }, Wt = { class: "gh-toc-list" }, qt = ["onClick"], Gt = { class: "gh-toc-text" }, Pt = {
  key: 2,
  class: "gh-readme-loading"
}, Ut = {
  key: 3,
  class: "gh-readme-error"
}, jt = ["href"], Bt = {
  key: 4,
  class: "gh-readme-loading"
}, Ft = ["innerHTML"], Yt = /* @__PURE__ */ se({
  __name: "GitHubRepoDetailDrawer",
  setup(W) {
    const q = f(""), y = f(!1), A = f(!1);
    J(() => a.fullName, () => {
      A.value = !1;
    }), J(A, async () => {
      if (await le(), !h.value || !$.value) return;
      const l = $.value.getBoundingClientRect().width;
      h.value = { ...h.value, x: Math.max(10, Math.min(h.value.x, window.innerWidth - l - 10)) };
    });
    const C = f(null), $ = f(null), h = f(null), w = f(!document.hidden);
    let E = !0, H = 0, M = 0, I, m = () => {
    }, D = !1, V = 0, g = 0, L = 0, R = 0;
    function F(l) {
      if (l.target.closest("button, a, input")) return;
      m();
      const i = $.value;
      if (!i || !a.isOpen || !w.value) return;
      D = !0;
      const c = i.getBoundingClientRect();
      L = c.left, R = c.top, V = l.clientX, g = l.clientY, h.value = { x: L, y: R };
      const _ = (S) => {
        if (!D) return;
        const K = S.clientX - V, Y = S.clientY - g;
        h.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, L + K)),
          y: Math.max(10, Math.min(window.innerHeight - 80, R + Y))
        };
      }, x = () => {
        D = !1, window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", x);
      };
      m = x, window.addEventListener("mousemove", _), window.addEventListener("mouseup", x);
    }
    function B() {
      Z.close();
    }
    function G(l) {
      N.saving || (Z.close(), Ae(l));
    }
    function P(l) {
      l.key === "Escape" && a.isOpen && B();
    }
    async function k(l, i) {
      if (!a.isOpen || !w.value) return;
      const c = H, _ = ++M, x = () => a.isOpen && w.value && H === c && _ === M;
      clearTimeout(I);
      try {
        await navigator.clipboard.writeText(l), x() && (q.value = `已复制 ${i}`);
      } catch {
        x() && (q.value = "复制未确认");
      }
      x() && (I = setTimeout(() => {
        x() && (q.value = "");
      }, 2e3));
    }
    function t(l) {
      const c = l.target?.closest("img");
      c && c.src && (l.preventDefault(), l.stopPropagation(), _e.open({ source: c.src, title: c.alt || "图片预览" }));
    }
    function p(l) {
      if (!C.value) return;
      const i = C.value.querySelectorAll("h1, h2, h3");
      for (const c of Array.from(i))
        if (c.textContent?.trim().includes(l.text)) {
          c.scrollIntoView({ behavior: "smooth", block: "start" }), y.value = !1;
          break;
        }
    }
    J(
      () => [a.readmeHtml, a.isOpen, w.value, a.revision],
      async ([l, i, c], _, x) => {
        let S = !1, K = 0;
        x(() => {
          S = !0, cancelAnimationFrame(K);
        }), !(!l || !i || !c) && (await le(), !S && (K = requestAnimationFrame(() => {
          S || !a.isOpen || !w.value || C.value?.querySelectorAll("pre").forEach((Y) => {
            if (Y.querySelector(".gh-code-copy-btn")) return;
            const z = document.createElement("button");
            z.type = "button", z.className = "gh-code-copy-btn", z.title = "复制代码", z.innerText = "复制", z.addEventListener("click", (ge) => {
              ge.stopPropagation(), k(Y.querySelector("code")?.innerText || "", "代码");
            }), Y.style.position = "relative", Y.appendChild(z);
          });
        })));
      }
    );
    function u() {
      ++H, ++M, clearTimeout(I), q.value = "", y.value = !1, m();
    }
    J(() => [a.revision, a.isOpen, w.value], () => {
      u(), window.removeEventListener("keydown", P), a.isOpen && w.value && window.addEventListener("keydown", P);
    }, { immediate: !0, flush: "sync" });
    function T() {
      w.value = E && !document.hidden, Z.setPageActive(w.value);
    }
    function d() {
      E = !1, T();
    }
    function v() {
      E = !0, T();
    }
    return ae(() => {
      document.addEventListener("visibilitychange", T), window.addEventListener("pagehide", d), window.addEventListener("pageshow", v), T();
    }), ue(() => {
      u(), Z.setPageActive(!1), window.removeEventListener("keydown", P), document.removeEventListener("visibilitychange", T), window.removeEventListener("pagehide", d), window.removeEventListener("pageshow", v);
    }), (l, i) => s(a).isOpen ? (o(), n("div", pt, [
      e("div", {
        ref_key: "windowRef",
        ref: $,
        class: Q(["gh-modal-window", { "has-task-pane": A.value }]),
        style: he(h.value ? { position: "fixed", left: `${h.value.x}px`, top: `${h.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": s(a).fullName
      }, [
        e("header", {
          class: "gh-modal-header",
          onMousedown: F
        }, [
          e("div", gt, [
            i[5] || (i[5] = e("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            e("a", {
              href: s(a).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              e("span", ft, r(s(a).owner), 1),
              i[3] || (i[3] = e("span", { class: "gh-sep" }, "/", -1)),
              e("strong", ht, r(s(a).repo), 1),
              i[4] || (i[4] = e("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, kt)
          ]),
          e("div", yt, [
            q.value ? (o(), n("span", bt, r(q.value), 1)) : b("", !0),
            e("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              "aria-expanded": A.value,
              disabled: s(N).saving,
              onClick: i[0] || (i[0] = (c) => A.value = !A.value)
            }, "任务", 8, wt),
            e("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: s(N).saving,
              title: "关闭视窗 (Esc)",
              onClick: B
            }, " ✕ ", 8, _t)
          ])
        ], 32),
        e("div", Tt, [
          e("div", Ct, [
            e("div", Et, [
              e("div", It, [
                s(a).isZh ? (o(), n("span", $t, " 🇨🇳 中文版 ")) : b("", !0),
                e("span", Lt, [
                  i[6] || (i[6] = X(" ★ ", -1)),
                  e("strong", null, r(s(a).stars.toLocaleString()), 1)
                ]),
                e("span", xt, [
                  i[7] || (i[7] = X(" ⌥ ", -1)),
                  e("strong", null, r(s(a).forks.toLocaleString()), 1)
                ]),
                s(a).language ? (o(), n("span", St, " 💻 " + r(s(a).language), 1)) : b("", !0),
                s(a).license ? (o(), n("span", Nt, " 📄 " + r(s(a).license), 1)) : b("", !0),
                s(a).pushedAt ? (o(), n("span", Rt, " ⏱ " + r(s(we)(s(a).pushedAt)), 1)) : b("", !0)
              ]),
              s(a).description ? (o(), n("p", At, r(s(a).description), 1)) : b("", !0),
              s(a).topics.length ? (o(), n("div", Mt, [
                (o(!0), n(j, null, ee(s(a).topics, (c) => (o(), n("span", {
                  key: c,
                  class: "gh-topic-tag"
                }, " #" + r(c), 1))), 128))
              ])) : b("", !0)
            ]),
            e("main", Ot, [
              s(a).notice ? (o(), n("p", Dt, r(s(a).notice), 1)) : b("", !0),
              s(a).headings.length > 0 ? (o(), n("aside", {
                key: 1,
                class: Q(["gh-modal-toc", { "is-open": y.value }])
              }, [
                e("div", {
                  class: "gh-toc-header",
                  onClick: i[1] || (i[1] = (c) => y.value = !y.value)
                }, [
                  i[8] || (i[8] = e("span", { class: "gh-toc-icon" }, "📑", -1)),
                  e("span", Ht, "目录大纲 (" + r(s(a).headings.length) + ")", 1),
                  e("span", Vt, r(y.value ? "▲" : "▼"), 1)
                ]),
                te(e("ul", Wt, [
                  (o(!0), n(j, null, ee(s(a).headings, (c, _) => (o(), n("li", {
                    key: _,
                    class: Q(["gh-toc-item", `level-${c.level}`]),
                    onClick: (x) => p(c)
                  }, [
                    i[9] || (i[9] = e("span", { class: "gh-toc-bullet" }, "·", -1)),
                    e("span", Gt, r(c.text), 1)
                  ], 10, qt))), 128))
                ], 512), [
                  [fe, y.value]
                ])
              ], 2)) : b("", !0),
              s(a).isLoading ? (o(), n("div", Pt, [
                i[10] || (i[10] = e("div", { class: "gh-spinner" }, null, -1)),
                e("span", null, "正在获取并排版 " + r(s(a).fullName) + " 的 README.md …", 1)
              ])) : s(a).error ? (o(), n("div", Ut, [
                i[11] || (i[11] = e("span", { class: "gh-error-icon" }, "⚠️", -1)),
                e("p", null, r(s(a).error), 1),
                e("a", {
                  href: s(a).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, jt)
              ])) : s(a).hasReadme && !s(a).readmeMarkdown ? (o(), n("p", Bt, "README 内容为空。")) : (o(), n("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: C,
                class: "gh-readme-rendered obsidian-markdown-rendered allow-copy",
                innerHTML: s(a).readmeHtml,
                onClick: t
              }, null, 8, Ft))
            ])
          ]),
          A.value ? (o(), ve(vt, {
            key: s(a).fullName,
            repository: { fullName: s(a).fullName, description: s(a).description, stars: s(a).stars, language: s(a).language, updated: s(a).pushedAt },
            onClose: i[2] || (i[2] = (c) => A.value = !1),
            onOpenTask: G
          }, null, 8, ["repository"])) : b("", !0)
        ])
      ], 14, mt)
    ])) : b("", !0);
  }
}), ns = /* @__PURE__ */ oe(Yt, [["__scopeId", "data-v-76439878"]]);
export {
  ns as default
};
