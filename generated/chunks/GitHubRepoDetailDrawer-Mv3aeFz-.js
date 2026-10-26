import { d as se, x as z, C as ae, y as re, o as n, e as i, f as e, m as J, t as r, g as b, u as s, F as j, h as ee, i as de, B as Q, b as h, s as me, D as ne, l as te, n as ie, c as ue, G as le, z as ge, A as ke } from "./vendor-vue-DokqDua_.js";
import { Z as fe, $ as x, a1 as he, p as o, A as Z, a2 as ye } from "./search.service-N0DgqU3Q.js";
import { i as be } from "./images-DOigKs1W.js";
import { i as we, t as M, T as _e } from "./todoist.service-7bvn-_sx.js";
import { n as Te } from "./view-styles-CoGPhW6D.js";
import { t as U, w as ce } from "./module-state-BT0PQSND.js";
import { e as ve } from "./calendar.service-C9c0RMiI.js";
import { f as Ce, a as Ee, T as Ie, r as $e, b as Le } from "./TodoistDatePickerPopover-DZD6lSsA.js";
import { R as xe } from "./read-session-e15k1OwA.js";
import { _ as oe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { openTodoistTask as Se } from "./task-navigation-DnsZubWl.js";
const Ne = ["aria-busy"], Re = { class: "linked-tasks-heading" }, Me = { key: 0 }, Ae = ["disabled"], Oe = {
  key: 0,
  class: "linked-tasks-message",
  role: "status"
}, De = {
  key: 1,
  class: "linked-tasks-message",
  role: "status"
}, He = {
  key: 2,
  class: "linked-tasks-message",
  role: "alert"
}, We = {
  key: 3,
  class: "linked-tasks-empty"
}, Ve = {
  key: 4,
  class: "linked-tasks-list",
  tabindex: "0",
  "aria-label": "关联任务列表，可滚动"
}, qe = {
  key: 0,
  class: "linked-task-card"
}, Ge = ["disabled", "aria-label", "title", "onClick"], Pe = ["disabled", "aria-label", "onClick"], Ue = {
  key: 0,
  class: "linked-task-description"
}, je = {
  key: 1,
  class: "linked-task-meta"
}, Be = ["title"], Fe = {
  key: 1,
  class: "linked-task-unavailable",
  role: "status"
}, Ye = /* @__PURE__ */ se({
  __name: "GitHubRepositoryLinkedTasks",
  props: {
    repositoryName: {},
    disabled: { type: Boolean }
  },
  emits: ["openTask"],
  setup(H, { emit: W }) {
    const w = H, N = W, C = h([]), I = h(!1), f = h(""), _ = h(""), E = h(""), O = h(""), R = me(() => C.value.filter((a) => !a.task || !we(a.task))), $ = new xe();
    let m = !1, A = !0, D = !1;
    const v = () => m && A && !document.hidden;
    function L() {
      D || !v() || (D = !0, queueMicrotask(() => {
        D = !1, v() && !U.pendingWrites && V();
      }));
    }
    async function V() {
      if (!v() || U.pendingWrites) return;
      $.cancel(), f.value = "", _.value = "", C.value = [];
      let a;
      try {
        const T = Ce(w.repositoryName);
        a = T.taskIds, T.unreadableCount && (_.value = "部分本机关联记录无法读取，列表可能不完整；未修改记录。");
      } catch {
        f.value = "本机关联记录读取失败，请稍后刷新；未修改记录。";
        return;
      }
      if (!a.length) return;
      C.value = a.map((T) => ({ id: T }));
      const y = w.repositoryName;
      let d = null;
      const p = $.begin({
        timeoutMs: 3e4,
        isCurrent: () => v() && w.repositoryName === y && (d === null || d === M.getToken()),
        onStop: (T) => {
          I.value = !1, T === "timeout" && (f.value = "关联任务读取超时，保留已读取结果，请手动刷新。");
        }
      });
      I.value = !0;
      try {
        if (d = await p.wait(() => M.initToken()), !p.current()) return;
        if (!d.trim()) {
          f.value = "请先配置 Todoist 账号，才能读取已关联的任务。";
          return;
        }
        let T = 0;
        const c = async () => {
          for (; p.current(); ) {
            const l = T++;
            if (l >= a.length) return;
            const u = a[l];
            try {
              const S = await p.wait(() => M.api("/tasks/" + encodeURIComponent(u), { signal: p.signal }));
              if (!p.current()) return;
              if (!S || typeof S != "object") throw new Error("Invalid task");
              const k = S;
              if (String(k.id) !== u || typeof k.content != "string" || k.is_deleted || k.checked === void 0 && k.is_completed === void 0 || k.checked !== void 0 && typeof k.checked != "boolean" || k.is_completed !== void 0 && typeof k.is_completed != "boolean") throw new Error("Invalid task");
              C.value[l] = { id: u, task: k };
            } catch (S) {
              if (!p.current()) return;
              const k = S instanceof Error && /\((401|403)\)/.test(S.message);
              C.value[l] = { id: u, error: k ? "账号或权限不可用，请检查 Todoist 配置。" : "暂无法读取此任务，请刷新或在 Todoist 中核对。" };
            }
          }
        };
        await Promise.allSettled(Array.from({ length: Math.min(3, a.length) }, c));
      } catch {
        p.current() && (f.value = "Todoist 配置或任务读取失败，请手动刷新。");
      } finally {
        p.finish() && (I.value = !1);
      }
    }
    async function X(a) {
      if (!a.task || w.disabled || E.value || U.pendingWrites || !v()) return;
      const y = a.id, d = w.repositoryName, p = a.task, T = M.getToken();
      E.value = y, O.value = "", $.cancel();
      let c = !1, l = !1;
      try {
        await ce(async () => {
          const u = await M.initToken();
          if (!u || u !== T || !v() || w.repositoryName !== d || w.disabled) throw new Error("Not submitted");
          if (c = !0, await M.toggleTaskCompletion(y, !0), l = !0, M.invalidateWorkspaceSnapshots(), !m || u !== M.getToken()) return;
          a.task = { ...p, checked: !0, is_completed: !0 };
          const { todoistCalendarSidebarController: S } = await import("./calendar.service-C9c0RMiI.js").then((k) => k.o);
          !m || u !== M.getToken() || S.recordTaskCompletion({
            id: y,
            content: p.content,
            description: p.description,
            completed: !0,
            dueDate: p.due?.date,
            _taskRaw: p
          }, !0);
        }), U.active && ve.loadWorkspace(void 0, void 0, !0);
      } catch {
        m && w.repositoryName === d && (O.value = l ? "任务已完成，但本地显示更新失败，请刷新核对。" : c ? "完成结果未确认，请刷新核对；未自动重试。" : "页面或账号状态已变化，尚未提交完成操作。");
      } finally {
        E.value = "", L();
      }
    }
    function q(a) {
      a instanceof StorageEvent && a.key !== null && !a.key.startsWith("todoist_repository_links_v1:") || L();
    }
    function G() {
      v() ? L() : $.cancel();
    }
    function P() {
      A = !1, $.cancel();
    }
    function g() {
      A = !0, G();
    }
    function t(a, y) {
      y !== "local" || !Object.prototype.hasOwnProperty.call(a, _e) || ($.cancel(), C.value = [], f.value = "", L());
    }
    return z(() => w.repositoryName, () => {
      $.cancel(), C.value = [], L();
    }), z(() => U.pendingWrites, (a, y) => {
      a ? $.cancel() : y && L();
    }), ae(() => {
      m = !0, window.addEventListener("storage", q), window.addEventListener("todoist-repository-links-changed", q), document.addEventListener("visibilitychange", G), window.addEventListener("pagehide", P), window.addEventListener("pageshow", g), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(t), L();
    }), re(() => {
      m = !1, $.cancel(), window.removeEventListener("storage", q), window.removeEventListener("todoist-repository-links-changed", q), document.removeEventListener("visibilitychange", G), window.removeEventListener("pagehide", P), window.removeEventListener("pageshow", g), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(t);
    }), (a, y) => (n(), i("section", {
      class: "repository-linked-tasks",
      "aria-label": "当前仓库关联的 Todoist 任务",
      "aria-busy": I.value
    }, [
      e("div", Re, [
        e("h3", null, [
          y[0] || (y[0] = J("关联任务 ", -1)),
          R.value.length ? (n(), i("small", Me, r(R.value.length), 1)) : b("", !0)
        ]),
        e("button", {
          type: "button",
          class: "linked-tasks-refresh",
          disabled: I.value || H.disabled || !!s(U).pendingWrites,
          onClick: V
        }, r(I.value ? "读取中…" : "刷新"), 9, Ae)
      ]),
      f.value ? (n(), i("p", Oe, r(f.value), 1)) : b("", !0),
      _.value ? (n(), i("p", De, r(_.value), 1)) : b("", !0),
      O.value ? (n(), i("p", He, r(O.value), 1)) : b("", !0),
      !R.value.length && !f.value ? (n(), i("p", We, "暂无未完成的关联任务")) : b("", !0),
      R.value.length ? (n(), i("div", Ve, [
        (n(!0), i(j, null, ee(R.value, (d) => (n(), i(j, {
          key: d.id
        }, [
          d.task ? (n(), i("article", qe, [
            e("button", {
              type: "button",
              class: Q(["linked-task-check", { pending: E.value === d.id }]),
              disabled: H.disabled || !!E.value || !!s(U).pendingWrites,
              "aria-label": "完成任务：" + d.task.content,
              title: E.value === d.id ? "正在提交完成…" : "完成任务",
              onClick: de((p) => X(d), ["stop"])
            }, r(E.value === d.id ? "…" : ""), 11, Ge),
            e("button", {
              type: "button",
              class: "linked-task-body",
              disabled: H.disabled || !!E.value,
              "aria-label": "在插件中打开任务：" + d.task.content,
              onClick: (p) => N("openTask", d.id)
            }, [
              e("strong", null, r(d.task.content || "未命名任务"), 1),
              d.task.description ? (n(), i("span", Ue, r(d.task.description), 1)) : b("", !0),
              d.task.due?.date || d.task.labels?.length ? (n(), i("span", je, [
                d.task.due?.date ? (n(), i("span", {
                  key: 0,
                  title: d.task.due.date
                }, "▦ " + r(d.task.due.date), 9, Be)) : b("", !0),
                (n(!0), i(j, null, ee((d.task.labels || []).slice(0, 3), (p) => (n(), i("span", { key: p }, "◇ " + r(p), 1))), 128))
              ])) : b("", !0)
            ], 8, Pe)
          ])) : (n(), i("p", Fe, r(d.error || (I.value ? "正在读取关联任务…" : "任务尚未读取，请刷新核对。")), 1))
        ], 64))), 128))
      ])) : b("", !0)
    ], 8, Ne));
  }
}), ze = /* @__PURE__ */ oe(Ye, [["__scopeId", "data-v-fb8f5882"]]), Je = {
  class: "github-repository-tasks",
  "aria-label": "仓库关联任务与创建栏"
}, Xe = ["disabled"], Ke = { class: "task-pane-content" }, Ze = { class: "repository-reference" }, Qe = {
  key: 0,
  class: "task-guide"
}, et = {
  key: 1,
  class: "task-destination"
}, tt = {
  key: 2,
  class: "task-feedback",
  role: "alert"
}, st = {
  key: 3,
  class: "task-receipt"
}, at = ["disabled"], ot = ["disabled"], nt = { key: 0 }, it = ["disabled"], lt = ["disabled"], rt = /* @__PURE__ */ se({
  __name: "GitHubRepositoryTasks",
  props: {
    repository: {}
  },
  emits: ["close", "openTask"],
  setup(H, { emit: W }) {
    const w = H, N = W, C = fe(), I = h(""), f = h(""), _ = h(""), E = h(""), O = h(null), R = h(!1), $ = h(!0), m = h(""), A = h(!1), D = h(!1), v = h(null), L = "github_task_attempt_v1:" + w.repository.fullName.toLowerCase();
    function V() {
      try {
        const g = localStorage.getItem(L);
        if (!g) return;
        const t = JSON.parse(g);
        if (!t || typeof t.requestId != "string" || typeof t.content != "string" || !t.target || typeof t.target.title != "string" || t.repository?.fullName !== w.repository.fullName || t.taskId !== void 0 && typeof t.taskId != "string") throw new Error();
        v.value = t, t.taskId && (D.value = $e(t.taskId).some((a) => a.fullName.toLowerCase() === w.repository.fullName.toLowerCase()));
      } catch {
        A.value = !0, m.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
      }
    }
    ae(V);
    async function X() {
      if (x.saving || v.value || A.value || !I.value.trim() || !C.value || !$.value) return;
      const g = { ...C.value }, t = { ...w.repository }, a = { content: I.value.trim(), description: f.value.trim(), project_id: g.projectId, section_id: g.sectionId, due_string: _.value ? _.value + (E.value ? " " + E.value : "") : void 0 };
      x.saving = !0, m.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(L, { ifAvailable: !0 }, async (y) => {
          if (!y) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          V(), !(v.value || A.value) && await ce(async () => {
            const d = await M.initToken(), p = await M.api("/sections/" + encodeURIComponent(g.sectionId));
            if (he(), document.hidden || !d || d !== M.getToken() || C.value?.sectionId !== g.sectionId || C.value?.projectId !== g.projectId) throw new Error("配置或页面状态已变化，尚未提交，请重新确认任务区。");
            if (!p || String(p.id) !== g.sectionId || String(p.project_id) !== g.projectId || p.is_deleted || p.is_archived) throw new Error("目标分组不存在、已归档或已移动，请在 Todoist 中重新指定任务区。");
            const T = { requestId: crypto.randomUUID(), repository: t, target: { ...g, title: p.name || g.title }, content: a.content };
            localStorage.setItem(L, JSON.stringify(T)), v.value = T;
            try {
              const c = await M.createTask(a, T.requestId);
              if (!c || typeof c.id != "string") throw new Error();
              T.taskId = c.id, v.value = { ...T };
              try {
                localStorage.setItem(L, JSON.stringify(T));
              } catch {
                m.value = "任务已创建，但本机回执保存失败，请记录任务地址；不要重复创建。";
              }
              M.invalidateWorkspaceSnapshots(), (String(c.project_id) !== g.projectId || String(c.section_id) !== g.sectionId) && (m.value = "任务已创建，但返回的分组与目标不一致，请核对任务地址；未重新提交。"), q(), Te.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: T.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: c.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), U.active && ve.loadWorkspace(void 0, void 0, !0);
            } catch {
              m.value = v.value?.taskId ? "任务已创建，但后续界面更新未完成，请使用任务地址核对；不要重复创建。" : "创建结果未确认，请核对原 Todoist 分组。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (y) {
        m.value = y instanceof Error && !v.value ? y.message : "本机提交记录保存失败，尚未发送创建请求。";
      } finally {
        x.saving = !1;
      }
    }
    function q() {
      const g = v.value;
      if (g?.taskId)
        try {
          Le(g.taskId, g.repository), D.value = !0, m.value.startsWith("任务已创建，但仓库卡片保存失败") && (m.value = "");
        } catch {
          m.value = "任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。";
        }
    }
    async function G() {
      if (x.saving || !v.value) return !1;
      const g = v.value.requestId;
      x.saving = !0;
      try {
        if (!navigator.locks) throw new Error();
        return await navigator.locks.request(L, { ifAvailable: !0 }, async (t) => {
          if (!t)
            return m.value = "另一个标签页正在提交，请稍后核对。", !1;
          const a = localStorage.getItem(L), y = a ? JSON.parse(a) : null;
          return y && y.requestId !== g ? (V(), m.value = "其他标签页已更新提交记录，请先核对最新任务。", !1) : (localStorage.removeItem(L), v.value = null, m.value = "", !0);
        });
      } catch {
        return m.value = "本机提交记录无法更新，未解除保护。", !1;
      } finally {
        x.saving = !1;
      }
    }
    async function P() {
      await G() && (I.value = "", f.value = "", _.value = "", E.value = "", D.value = !1, $.value = !0);
    }
    return (g, t) => (n(), i("aside", Je, [
      e("header", null, [
        t[10] || (t[10] = e("div", null, [
          e("strong", null, "仓库任务"),
          e("small", null, "关联当前 GitHub 仓库")
        ], -1)),
        e("button", {
          type: "button",
          disabled: s(x).saving,
          "aria-label": "收起任务栏",
          onClick: t[0] || (t[0] = (a) => N("close"))
        }, "×", 8, Xe)
      ]),
      e("div", Ke, [
        ne(ze, {
          "repository-name": H.repository.fullName,
          disabled: s(x).saving,
          onOpenTask: t[1] || (t[1] = (a) => N("openTask", a))
        }, null, 8, ["repository-name", "disabled"]),
        t[19] || (t[19] = e("h3", { class: "task-create-heading" }, "创建任务", -1)),
        e("div", Ze, [
          t[11] || (t[11] = e("span", null, "◇", -1)),
          e("div", null, [
            e("strong", null, r(H.repository.fullName), 1),
            e("small", null, r(H.repository.description || "创建后自动关联此仓库"), 1)
          ])
        ]),
        s(C) ? (n(), i("p", et, [
          t[12] || (t[12] = J("创建到 ", -1)),
          e("strong", null, r(s(C).title), 1),
          t[13] || (t[13] = e("small", null, "Todoist 分组 · 仅本机选择", -1))
        ])) : (n(), i("p", Qe, "请先打开 Todoist，在目标分组的“更多”菜单中选择“设为 GitHub 任务区”。设置后即可在此创建。")),
        m.value ? (n(), i("p", tt, r(m.value), 1)) : b("", !0),
        v.value ? (n(), i("section", st, [
          v.value.taskId ? (n(), i(j, { key: 0 }, [
            t[14] || (t[14] = e("strong", null, "任务已创建", -1)),
            e("p", null, r(v.value.content), 1),
            e("button", {
              type: "button",
              class: "task-open-link",
              disabled: s(x).saving,
              onClick: t[2] || (t[2] = (a) => N("openTask", v.value.taskId))
            }, "在插件中打开任务 →", 8, at),
            ne(Ee, {
              "task-id": v.value.taskId
            }, null, 8, ["task-id"]),
            D.value ? (n(), i("button", {
              key: 1,
              type: "button",
              onClick: P
            }, "继续创建")) : (n(), i("button", {
              key: 0,
              type: "button",
              disabled: s(x).saving,
              onClick: q
            }, "仅重试仓库关联", 8, ot))
          ], 64)) : (n(), i(j, { key: 1 }, [
            e("strong", null, r(s(x).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
            e("p", null, r(v.value.content), 1),
            s(x).saving ? (n(), i("small", nt, "正在提交至“" + r(v.value.target.title) + "”，请稍候。", 1)) : (n(), i(j, { key: 1 }, [
              e("small", null, "请先在 Todoist 核对原分组“" + r(v.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
              e("button", {
                type: "button",
                onClick: G
              }, "我已核对，允许新建")
            ], 64))
          ], 64))
        ])) : s(C) ? (n(), i("form", {
          key: 4,
          onSubmit: de(X, ["prevent"])
        }, [
          e("fieldset", {
            disabled: s(x).saving || A.value
          }, [
            e("label", null, [
              t[15] || (t[15] = J("任务名称", -1)),
              te(e("textarea", {
                "onUpdate:modelValue": t[3] || (t[3] = (a) => I.value = a),
                rows: "2",
                maxlength: "500",
                placeholder: "要在这个仓库上做什么？",
                required: ""
              }, null, 512), [
                [ie, I.value]
              ])
            ]),
            e("label", null, [
              t[16] || (t[16] = J("描述", -1)),
              te(e("textarea", {
                "onUpdate:modelValue": t[4] || (t[4] = (a) => f.value = a),
                rows: "4",
                maxlength: "16000",
                placeholder: "记录目标、步骤或想法（可选）"
              }, null, 512), [
                [ie, f.value]
              ])
            ]),
            t[17] || (t[17] = e("label", null, "截止日期", -1)),
            e("button", {
              ref_key: "dateAnchor",
              ref: O,
              type: "button",
              class: "task-date-button",
              onClick: t[5] || (t[5] = (a) => R.value = !R.value)
            }, "▦ " + r(_.value ? _.value + (E.value ? " " + E.value : "") : "添加日期与时间"), 513),
            R.value ? (n(), ue(Ie, {
              key: 0,
              modelValue: _.value,
              "onUpdate:modelValue": t[6] || (t[6] = (a) => _.value = a),
              "time-value": E.value,
              "onUpdate:timeValue": t[7] || (t[7] = (a) => E.value = a),
              "anchor-el": O.value,
              onTimeValidity: t[8] || (t[8] = (a) => $.value = a),
              onClose: t[9] || (t[9] = (a) => {
                R.value = !1, $.value = !0;
              })
            }, null, 8, ["modelValue", "time-value", "anchor-el"])) : b("", !0),
            t[18] || (t[18] = e("p", { class: "task-local-note" }, "名称、描述和截止日期提交至 Todoist；仓库卡片只保存在本插件。", -1)),
            e("button", {
              type: "submit",
              class: "create-task",
              disabled: !I.value.trim() || !$.value
            }, r(s(x).saving ? "正在创建…" : "创建任务"), 9, lt)
          ], 8, it)
        ], 32)) : b("", !0)
      ])
    ]));
  }
}), dt = /* @__PURE__ */ oe(rt, [["__scopeId", "data-v-97c13a8f"]]), ut = {
  key: 0,
  class: "gh-modal-overlay"
}, ct = ["aria-label"], vt = { class: "gh-modal-title-wrap" }, pt = ["href"], mt = { class: "gh-owner" }, gt = { class: "gh-name" }, kt = { class: "gh-modal-actions" }, ft = {
  key: 0,
  class: "gh-status-tip"
}, ht = ["aria-expanded", "disabled"], yt = ["disabled"], bt = { class: "gh-modal-content" }, wt = { class: "gh-repository-content" }, _t = { class: "gh-modal-ribbon" }, Tt = { class: "gh-meta-badges" }, Ct = {
  key: 0,
  class: "gh-meta-item gh-meta-zh",
  title: "当前已优先加载中文版 README"
}, Et = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, It = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, $t = {
  key: 1,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Lt = {
  key: 2,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, xt = {
  key: 3,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, St = {
  key: 0,
  class: "gh-modal-desc"
}, Nt = {
  key: 1,
  class: "gh-modal-topics"
}, Rt = { class: "gh-modal-body" }, Mt = {
  key: 0,
  class: "gh-status-tip"
}, At = { class: "gh-toc-title" }, Ot = { class: "gh-toc-arrow" }, Dt = { class: "gh-toc-list" }, Ht = ["onClick"], Wt = { class: "gh-toc-text" }, Vt = {
  key: 2,
  class: "gh-readme-loading"
}, qt = {
  key: 3,
  class: "gh-readme-error"
}, Gt = ["href"], Pt = {
  key: 4,
  class: "gh-readme-loading"
}, Ut = ["innerHTML"], jt = /* @__PURE__ */ se({
  __name: "GitHubRepoDetailDrawer",
  setup(H) {
    const W = h(""), w = h(!1), N = h(!1);
    z(() => o.fullName, () => {
      N.value = !1;
    }), z(N, async () => {
      if (await le(), !f.value || !I.value) return;
      const c = I.value.getBoundingClientRect().width;
      f.value = { ...f.value, x: Math.max(10, Math.min(f.value.x, window.innerWidth - c - 10)) };
    });
    const C = h(null), I = h(null), f = h(null), _ = h(!document.hidden);
    let E = !0, O = 0, R = 0, $, m = () => {
    }, A = !1, D = 0, v = 0, L = 0, V = 0;
    function X(c) {
      if (c.target.closest("button, a, input")) return;
      m();
      const l = I.value;
      if (!l || !o.isOpen || !_.value) return;
      A = !0;
      const u = l.getBoundingClientRect();
      L = u.left, V = u.top, D = c.clientX, v = c.clientY, f.value = { x: L, y: V };
      const S = (B) => {
        if (!A) return;
        const K = B.clientX - D, F = B.clientY - v;
        f.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, L + K)),
          y: Math.max(10, Math.min(window.innerHeight - 80, V + F))
        };
      }, k = () => {
        A = !1, window.removeEventListener("mousemove", S), window.removeEventListener("mouseup", k);
      };
      m = k, window.addEventListener("mousemove", S), window.addEventListener("mouseup", k);
    }
    function q() {
      Z.close();
    }
    function G(c) {
      x.saving || (Z.close(), Se(c));
    }
    function P(c) {
      c.key === "Escape" && o.isOpen && q();
    }
    async function g(c, l) {
      if (!o.isOpen || !_.value) return;
      const u = O, S = ++R, k = () => o.isOpen && _.value && O === u && S === R;
      clearTimeout($);
      try {
        await navigator.clipboard.writeText(c), k() && (W.value = `已复制 ${l}`);
      } catch {
        k() && (W.value = "复制未确认");
      }
      k() && ($ = setTimeout(() => {
        k() && (W.value = "");
      }, 2e3));
    }
    function t(c) {
      const u = c.target?.closest("img");
      u && u.src && (c.preventDefault(), c.stopPropagation(), be.open({ source: u.src, title: u.alt || "图片预览" }));
    }
    function a(c) {
      if (!C.value) return;
      const l = C.value.querySelectorAll("h1, h2, h3");
      for (const u of Array.from(l))
        if (u.textContent?.trim().includes(c.text)) {
          u.scrollIntoView({ behavior: "smooth", block: "start" }), w.value = !1;
          break;
        }
    }
    z(
      () => [o.readmeHtml, o.isOpen, _.value, o.revision],
      async ([c, l, u], S, k) => {
        let B = !1, K = 0;
        k(() => {
          B = !0, cancelAnimationFrame(K);
        }), !(!c || !l || !u) && (await le(), !B && (K = requestAnimationFrame(() => {
          B || !o.isOpen || !_.value || C.value?.querySelectorAll("pre").forEach((F) => {
            if (F.querySelector(".gh-code-copy-btn")) return;
            const Y = document.createElement("button");
            Y.type = "button", Y.className = "gh-code-copy-btn", Y.title = "复制代码", Y.innerText = "复制", Y.addEventListener("click", (pe) => {
              pe.stopPropagation(), g(F.querySelector("code")?.innerText || "", "代码");
            }), F.style.position = "relative", F.appendChild(Y);
          });
        })));
      }
    );
    function y() {
      ++O, ++R, clearTimeout($), W.value = "", w.value = !1, m();
    }
    z(() => [o.revision, o.isOpen, _.value], () => {
      y(), window.removeEventListener("keydown", P), o.isOpen && _.value && window.addEventListener("keydown", P);
    }, { immediate: !0, flush: "sync" });
    function d() {
      _.value = E && !document.hidden, Z.setPageActive(_.value);
    }
    function p() {
      E = !1, d();
    }
    function T() {
      E = !0, d();
    }
    return ae(() => {
      document.addEventListener("visibilitychange", d), window.addEventListener("pagehide", p), window.addEventListener("pageshow", T), d();
    }), re(() => {
      y(), Z.setPageActive(!1), window.removeEventListener("keydown", P), document.removeEventListener("visibilitychange", d), window.removeEventListener("pagehide", p), window.removeEventListener("pageshow", T);
    }), (c, l) => s(o).isOpen ? (n(), i("div", ut, [
      e("div", {
        ref_key: "windowRef",
        ref: I,
        class: Q(["gh-modal-window", { "has-task-pane": N.value }]),
        style: ke(f.value ? { position: "fixed", left: `${f.value.x}px`, top: `${f.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": s(o).fullName
      }, [
        e("header", {
          class: "gh-modal-header",
          onMousedown: X
        }, [
          e("div", vt, [
            l[5] || (l[5] = e("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            e("a", {
              href: s(o).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              e("span", mt, r(s(o).owner), 1),
              l[3] || (l[3] = e("span", { class: "gh-sep" }, "/", -1)),
              e("strong", gt, r(s(o).repo), 1),
              l[4] || (l[4] = e("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, pt)
          ]),
          e("div", kt, [
            W.value ? (n(), i("span", ft, r(W.value), 1)) : b("", !0),
            e("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              "aria-expanded": N.value,
              disabled: s(x).saving,
              onClick: l[0] || (l[0] = (u) => N.value = !N.value)
            }, "任务", 8, ht),
            e("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: s(x).saving,
              title: "关闭视窗 (Esc)",
              onClick: q
            }, " ✕ ", 8, yt)
          ])
        ], 32),
        e("div", bt, [
          e("div", wt, [
            e("div", _t, [
              e("div", Tt, [
                s(o).isZh ? (n(), i("span", Ct, " 🇨🇳 中文版 ")) : b("", !0),
                e("span", Et, [
                  l[6] || (l[6] = J(" ★ ", -1)),
                  e("strong", null, r(s(o).stars.toLocaleString()), 1)
                ]),
                e("span", It, [
                  l[7] || (l[7] = J(" ⌥ ", -1)),
                  e("strong", null, r(s(o).forks.toLocaleString()), 1)
                ]),
                s(o).language ? (n(), i("span", $t, " 💻 " + r(s(o).language), 1)) : b("", !0),
                s(o).license ? (n(), i("span", Lt, " 📄 " + r(s(o).license), 1)) : b("", !0),
                s(o).pushedAt ? (n(), i("span", xt, " ⏱ " + r(s(ye)(s(o).pushedAt)), 1)) : b("", !0)
              ]),
              s(o).description ? (n(), i("p", St, r(s(o).description), 1)) : b("", !0),
              s(o).topics.length ? (n(), i("div", Nt, [
                (n(!0), i(j, null, ee(s(o).topics, (u) => (n(), i("span", {
                  key: u,
                  class: "gh-topic-tag"
                }, " #" + r(u), 1))), 128))
              ])) : b("", !0)
            ]),
            e("main", Rt, [
              s(o).notice ? (n(), i("p", Mt, r(s(o).notice), 1)) : b("", !0),
              s(o).headings.length > 0 ? (n(), i("aside", {
                key: 1,
                class: Q(["gh-modal-toc", { "is-open": w.value }])
              }, [
                e("div", {
                  class: "gh-toc-header",
                  onClick: l[1] || (l[1] = (u) => w.value = !w.value)
                }, [
                  l[8] || (l[8] = e("span", { class: "gh-toc-icon" }, "📑", -1)),
                  e("span", At, "目录大纲 (" + r(s(o).headings.length) + ")", 1),
                  e("span", Ot, r(w.value ? "▲" : "▼"), 1)
                ]),
                te(e("ul", Dt, [
                  (n(!0), i(j, null, ee(s(o).headings, (u, S) => (n(), i("li", {
                    key: S,
                    class: Q(["gh-toc-item", `level-${u.level}`]),
                    onClick: (k) => a(u)
                  }, [
                    l[9] || (l[9] = e("span", { class: "gh-toc-bullet" }, "·", -1)),
                    e("span", Wt, r(u.text), 1)
                  ], 10, Ht))), 128))
                ], 512), [
                  [ge, w.value]
                ])
              ], 2)) : b("", !0),
              s(o).isLoading ? (n(), i("div", Vt, [
                l[10] || (l[10] = e("div", { class: "gh-spinner" }, null, -1)),
                e("span", null, "正在获取并排版 " + r(s(o).fullName) + " 的 README.md …", 1)
              ])) : s(o).error ? (n(), i("div", qt, [
                l[11] || (l[11] = e("span", { class: "gh-error-icon" }, "⚠️", -1)),
                e("p", null, r(s(o).error), 1),
                e("a", {
                  href: s(o).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, Gt)
              ])) : s(o).hasReadme && !s(o).readmeMarkdown ? (n(), i("p", Pt, "README 内容为空。")) : (n(), i("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: C,
                class: "gh-readme-rendered obsidian-markdown-rendered allow-copy",
                innerHTML: s(o).readmeHtml,
                onClick: t
              }, null, 8, Ut))
            ])
          ]),
          N.value ? (n(), ue(dt, {
            key: s(o).fullName,
            repository: { fullName: s(o).fullName, description: s(o).description, stars: s(o).stars, language: s(o).language, updated: s(o).pushedAt },
            onClose: l[2] || (l[2] = (u) => N.value = !1),
            onOpenTask: G
          }, null, 8, ["repository"])) : b("", !0)
        ])
      ], 14, ct)
    ])) : b("", !0);
  }
}), ss = /* @__PURE__ */ oe(jt, [["__scopeId", "data-v-76439878"]]);
export {
  ss as default
};
