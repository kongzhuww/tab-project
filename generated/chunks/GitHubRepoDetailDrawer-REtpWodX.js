import { d as le, y as Q, D as re, z as fe, o as n, f as i, g as t, n as ee, t as u, h as w, u as s, F as q, i as te, j as ke, C as se, b as m, x as ie, E as ue, m as ae, q as ce, p as ve, e as he, H as pe, A as we, B as _e } from "./vendor-vue-wIH4jcna.js";
import { _ as N, p as o, A as X, $ as Te } from "./search.service-BaF_8M5R.js";
import { i as Se } from "./images-CNM8ZZy4.js";
import { i as Ce, t as M, a as me, T as ge, e as $e } from "./todoist.service-D4pqRzvn.js";
import { n as Ee } from "./view-styles-CHCK4VG2.js";
import { t as F, w as ye } from "./module-state-BmW4SrQd.js";
import { e as be } from "./calendar.service-BdHRLORS.js";
import { u as Ie, f as xe, a as Le, T as Ne, r as Re, b as Ae } from "./TodoistDatePickerPopover-l5Tjcm5f.js";
import { R as Me } from "./read-session-DQk1qcgF.js";
import { _ as de } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { openTodoistTask as De } from "./task-navigation-CFuqS02f.js";
const Pe = ["aria-busy"], je = { class: "linked-tasks-heading" }, Oe = { key: 0 }, He = ["disabled"], Ve = {
  key: 0,
  class: "linked-tasks-message",
  role: "status"
}, We = {
  key: 1,
  class: "linked-tasks-message",
  role: "status"
}, Ue = {
  key: 2,
  class: "linked-tasks-message",
  role: "alert"
}, qe = {
  key: 3,
  class: "linked-tasks-empty"
}, Be = {
  key: 4,
  class: "linked-tasks-list",
  tabindex: "0",
  "aria-label": "关联任务列表，可滚动"
}, Ge = {
  key: 0,
  class: "linked-task-card"
}, ze = ["disabled", "aria-label", "title", "onClick"], Fe = ["disabled", "aria-label", "onClick"], Ye = {
  key: 0,
  class: "linked-task-description"
}, Ze = {
  key: 1,
  class: "linked-task-meta"
}, Xe = ["title"], Je = {
  key: 1,
  class: "linked-task-unavailable",
  role: "status"
}, Ke = /* @__PURE__ */ le({
  __name: "GitHubRepositoryLinkedTasks",
  props: {
    repositoryName: {},
    disabled: { type: Boolean }
  },
  emits: ["openTask"],
  setup(W, { emit: U }) {
    const b = W, D = U, _ = m([]), S = m(!1), p = m(""), f = m(""), C = m(""), j = m(""), x = ie(() => _.value.filter((g) => !g.task || !Ce(g.task))), T = new Me();
    let $ = !1, R = !0, B = !1;
    const H = m(!document.hidden), L = () => $ && R && H.value;
    Ie(() => H.value && !b.disabled, () => T.cancel(), () => y());
    function y() {
      B || !L() || (B = !0, queueMicrotask(() => {
        B = !1, L() && !F.pendingWrites && G();
      }));
    }
    async function G() {
      if (!L() || F.pendingWrites) return;
      T.cancel(), p.value = "", f.value = "", _.value = [];
      let g;
      try {
        const A = xe(b.repositoryName);
        g = A.taskIds, A.unreadableCount && (f.value = "部分本机关联记录无法读取，列表可能不完整；未修改记录。");
      } catch {
        p.value = "本机关联记录读取失败，请稍后刷新；未修改记录。";
        return;
      }
      if (!g.length) return;
      _.value = g.map((A) => ({ id: A }));
      const I = b.repositoryName;
      let c = null;
      const k = T.begin({
        timeoutMs: 3e4,
        isCurrent: () => L() && b.repositoryName === I && (c === null || c === M.getToken()),
        onStop: (A) => {
          S.value = !1, A === "timeout" && (p.value = "关联任务读取超时，保留已读取结果，请手动刷新。");
        }
      });
      S.value = !0;
      try {
        if (c = await k.wait(() => M.initToken()), !k.current()) return;
        if (!c.trim()) {
          p.value = "请先配置 Todoist 账号，才能读取已关联的任务。";
          return;
        }
        let A = 0;
        const v = async () => {
          for (; k.current(); ) {
            const l = A++;
            if (l >= g.length) return;
            const d = g[l];
            try {
              const r = await k.wait(() => M.api("/tasks/" + encodeURIComponent(d), { signal: k.signal }));
              if (!k.current()) return;
              if (!r || typeof r != "object") throw new Error("Invalid task");
              const e = r;
              if (String(e.id) !== d || typeof e.content != "string" || e.is_deleted || e.checked === void 0 && e.is_completed === void 0 || e.checked !== void 0 && typeof e.checked != "boolean" || e.is_completed !== void 0 && typeof e.is_completed != "boolean") throw new Error("Invalid task");
              _.value[l] = { id: d, task: e };
            } catch (r) {
              if (!k.current()) return;
              _.value[l] = { id: d, error: me(r) };
            }
          }
        };
        await Promise.allSettled(Array.from({ length: Math.min(3, g.length) }, v));
      } catch {
        k.current() && (p.value = "Todoist 配置或任务读取失败，请手动刷新。");
      } finally {
        k.finish() && (S.value = !1);
      }
    }
    async function z(g) {
      if (!g.task || b.disabled || C.value || F.pendingWrites || !L()) return;
      const I = g.id, c = b.repositoryName, k = g.task, A = M.getToken();
      C.value = I, j.value = "", T.cancel();
      let v = !1, l = !1;
      try {
        await ye(async () => {
          const d = await M.initToken();
          if (!d || d !== A || !L() || b.repositoryName !== c || b.disabled) throw new Error("Not submitted");
          if (v = !0, await M.toggleTaskCompletion(I, !0), l = !0, M.invalidateWorkspaceSnapshots(), !$ || d !== M.getToken()) return;
          g.task = { ...k, checked: !0, is_completed: !0 };
          const { todoistCalendarSidebarController: r } = await import("./calendar.service-BdHRLORS.js").then((e) => e.o);
          !$ || d !== M.getToken() || r.recordTaskCompletion({
            id: I,
            content: k.content,
            description: k.description,
            completed: !0,
            dueDate: k.due?.date,
            _taskRaw: k
          }, !0);
        }), F.active && be.loadWorkspace(void 0, void 0, !0);
      } catch (d) {
        d instanceof ge && !d.submitted && (v = !1), $ && b.repositoryName === c && (j.value = l ? "任务已完成，但本地显示更新失败，请刷新核对。" : v ? "完成结果未确认，请刷新核对；未自动重试。" : d instanceof ge ? me(d) + " 尚未提交完成操作。" : "页面或账号状态已变化，尚未提交完成操作。");
      } finally {
        C.value = "", y();
      }
    }
    function h(g) {
      g instanceof StorageEvent && g.key !== null && !g.key.startsWith("todoist_repository_links_v1:") || y();
    }
    function P() {
      H.value = !document.hidden, L() ? y() : T.cancel();
    }
    function J() {
      R = !1, T.cancel();
    }
    function Y() {
      R = !0, P();
    }
    function K(g, I) {
      I !== "local" || !Object.prototype.hasOwnProperty.call(g, $e) || (T.cancel(), _.value = [], p.value = "", y());
    }
    return Q(() => b.repositoryName, () => {
      T.cancel(), _.value = [], y();
    }), Q(() => F.pendingWrites, (g, I) => {
      g ? T.cancel() : I && y();
    }), re(() => {
      $ = !0, window.addEventListener("storage", h), window.addEventListener("todoist-repository-links-changed", h), document.addEventListener("visibilitychange", P), window.addEventListener("pagehide", J), window.addEventListener("pageshow", Y), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(K), y();
    }), fe(() => {
      $ = !1, T.cancel(), window.removeEventListener("storage", h), window.removeEventListener("todoist-repository-links-changed", h), document.removeEventListener("visibilitychange", P), window.removeEventListener("pagehide", J), window.removeEventListener("pageshow", Y), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(K);
    }), (g, I) => (n(), i("section", {
      class: "repository-linked-tasks",
      "aria-label": "当前仓库关联的 Todoist 任务",
      "aria-busy": S.value
    }, [
      t("div", je, [
        t("h3", null, [
          I[0] || (I[0] = ee("关联任务 ", -1)),
          x.value.length ? (n(), i("small", Oe, u(x.value.length), 1)) : w("", !0)
        ]),
        t("button", {
          type: "button",
          class: "linked-tasks-refresh",
          disabled: S.value || W.disabled || !!s(F).pendingWrites,
          onClick: G
        }, u(S.value ? "读取中…" : "刷新"), 9, He)
      ]),
      p.value ? (n(), i("p", Ve, u(p.value), 1)) : w("", !0),
      f.value ? (n(), i("p", We, u(f.value), 1)) : w("", !0),
      j.value ? (n(), i("p", Ue, u(j.value), 1)) : w("", !0),
      !x.value.length && !p.value ? (n(), i("p", qe, "暂无未完成的关联任务")) : w("", !0),
      x.value.length ? (n(), i("div", Be, [
        (n(!0), i(q, null, te(x.value, (c) => (n(), i(q, {
          key: c.id
        }, [
          c.task ? (n(), i("article", Ge, [
            t("button", {
              type: "button",
              class: se(["linked-task-check", { pending: C.value === c.id }]),
              disabled: W.disabled || !!C.value || !!s(F).pendingWrites,
              "aria-label": "完成任务：" + c.task.content,
              title: C.value === c.id ? "正在提交完成…" : "完成任务",
              onClick: ke((k) => z(c), ["stop"])
            }, u(C.value === c.id ? "…" : ""), 11, ze),
            t("button", {
              type: "button",
              class: "linked-task-body",
              disabled: W.disabled || !!C.value,
              "aria-label": "在插件中打开任务：" + c.task.content,
              onClick: (k) => D("openTask", c.id)
            }, [
              t("strong", null, u(c.task.content || "未命名任务"), 1),
              c.task.description ? (n(), i("span", Ye, u(c.task.description), 1)) : w("", !0),
              c.task.due?.date || c.task.labels?.length ? (n(), i("span", Ze, [
                c.task.due?.date ? (n(), i("span", {
                  key: 0,
                  title: c.task.due.date
                }, "▦ " + u(c.task.due.date), 9, Xe)) : w("", !0),
                (n(!0), i(q, null, te((c.task.labels || []).slice(0, 3), (k) => (n(), i("span", { key: k }, "◇ " + u(k), 1))), 128))
              ])) : w("", !0)
            ], 8, Fe)
          ])) : (n(), i("p", Je, u(c.error || (S.value ? "正在读取关联任务…" : "任务尚未读取，请刷新核对。")), 1))
        ], 64))), 128))
      ])) : w("", !0)
    ], 8, Pe));
  }
}), Qe = /* @__PURE__ */ de(Ke, [["__scopeId", "data-v-6193401f"]]), et = {
  class: "github-repository-tasks",
  "aria-label": "仓库关联任务与创建栏"
}, tt = ["disabled"], st = { class: "task-pane-content" }, at = { class: "repository-reference" }, ot = { class: "task-destination-selector" }, nt = { class: "selector-field" }, it = ["disabled"], lt = {
  key: 0,
  value: "",
  disabled: ""
}, rt = {
  key: 1,
  value: "",
  disabled: ""
}, dt = ["value"], ut = { class: "selector-field" }, ct = ["disabled"], vt = {
  key: 0,
  value: "",
  disabled: ""
}, pt = ["value"], mt = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, gt = {
  key: 1,
  class: "task-receipt"
}, ft = ["disabled"], kt = ["disabled"], ht = { key: 0 }, yt = ["disabled"], bt = ["disabled"], wt = /* @__PURE__ */ le({
  __name: "GitHubRepositoryTasks",
  props: {
    repository: {}
  },
  emits: ["close", "openTask"],
  setup(W, { emit: U }) {
    const b = W, D = U, _ = m([]), S = m([]), p = m(""), f = m(""), C = m(!1), j = m(!1), x = m(""), T = m(""), $ = m(""), R = m(""), B = m(null), H = m(!1), L = m(!0), y = m(""), G = m(!1), z = m(!1), h = m(null), P = "github_task_attempt_v1:" + b.repository.fullName.toLowerCase(), J = ie(() => _.value.find((r) => String(r.id) === p.value)?.name || "未命名项目"), Y = ie(() => f.value && S.value.find((r) => String(r.id) === f.value)?.name || "");
    async function K() {
      C.value = !0;
      try {
        const r = await M.getProjects();
        _.value = (r || []).filter((a) => !a.is_deleted && !a.is_archived);
        const e = localStorage.getItem("github_task_last_project_id");
        if (e && _.value.some((a) => String(a.id) === e))
          p.value = e;
        else if (_.value.length > 0) {
          const a = _.value.find((E) => E.inbox_project || E.is_inbox_project || /^(Inbox|收件箱)$/i.test(E.name));
          p.value = String(a ? a.id : _.value[0].id);
        }
        p.value && await g(p.value);
      } catch (r) {
        y.value = "加载 Todoist 项目失败: " + (r?.message || "请检查登录状态");
      } finally {
        C.value = !1;
      }
    }
    async function g(r) {
      j.value = !0;
      try {
        const e = await M.getSections(r);
        S.value = (e || []).filter((E) => !!(E && E.id && E.name));
        const a = localStorage.getItem("github_task_last_section_id");
        a && S.value.some((E) => String(E.id) === a) ? f.value = a : f.value = "";
      } catch {
        S.value = [], f.value = "";
      } finally {
        j.value = !1;
      }
    }
    async function I() {
      p.value && (localStorage.setItem("github_task_last_project_id", p.value), f.value = "", localStorage.removeItem("github_task_last_section_id"), await g(p.value));
    }
    function c() {
      f.value ? localStorage.setItem("github_task_last_section_id", f.value) : localStorage.removeItem("github_task_last_section_id");
    }
    function k() {
      try {
        const r = localStorage.getItem(P);
        if (!r) return;
        const e = JSON.parse(r);
        if (!e || typeof e.requestId != "string" || typeof e.content != "string" || !e.target || typeof e.target.title != "string" || e.repository?.fullName !== b.repository.fullName || e.taskId !== void 0 && typeof e.taskId != "string") throw new Error();
        h.value = e, e.taskId && (z.value = Re(e.taskId).some((a) => a.fullName.toLowerCase() === b.repository.fullName.toLowerCase()));
      } catch {
        G.value = !0, y.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
      }
    }
    re(() => {
      k(), K();
    });
    async function A() {
      if (N.saving || h.value || G.value || !x.value.trim() || !p.value || !L.value) return;
      const r = p.value, e = f.value || void 0, a = { ...b.repository }, E = J.value + (Y.value ? " / " + Y.value : ""), O = {
        content: x.value.trim(),
        description: T.value.trim(),
        project_id: r,
        section_id: e,
        due_string: $.value ? $.value + (R.value ? " " + R.value : "") : void 0
      };
      N.saving = !0, y.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(P, { ifAvailable: !0 }, async (V) => {
          if (!V) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          k(), !(h.value || G.value) && await ye(async () => {
            const oe = await M.initToken();
            if (document.hidden || !oe || oe !== M.getToken())
              throw new Error("Todoist 未登录或 Token 已变更，请检查账号设置。");
            const Z = {
              requestId: crypto.randomUUID(),
              repository: a,
              target: { projectId: r, sectionId: e || "", title: E },
              content: O.content
            };
            localStorage.setItem(P, JSON.stringify(Z)), h.value = Z;
            try {
              const ne = await M.createTask(O, Z.requestId);
              if (!ne || typeof ne.id != "string") throw new Error("创建任务返回数据异常");
              Z.taskId = ne.id, h.value = { ...Z };
              try {
                localStorage.setItem(P, JSON.stringify(Z));
              } catch {
                y.value = "任务已创建，但本机回执保存失败；不要重复创建。";
              }
              M.invalidateWorkspaceSnapshots(), v(), Ee.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: Z.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: ne.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), F.active && be.loadWorkspace(void 0, void 0, !0);
            } catch {
              y.value = h.value?.taskId ? "任务已创建，但后续界面更新未完成；不要重复创建。" : "创建结果未确认，请核对 Todoist。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (V) {
        y.value = V instanceof Error && !h.value ? V.message : "提交记录保存失败，尚未发送创建请求。";
      } finally {
        N.saving = !1;
      }
    }
    function v() {
      const r = h.value;
      if (r?.taskId)
        try {
          Ae(r.taskId, r.repository), z.value = !0, y.value.startsWith("任务已创建，但仓库卡片保存失败") && (y.value = "");
        } catch {
          y.value = "任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。";
        }
    }
    function l() {
      h.value = null, x.value = "", T.value = "", $.value = "", R.value = "", z.value = !1, localStorage.removeItem(P);
    }
    function d() {
      h.value = null, localStorage.removeItem(P);
    }
    return (r, e) => (n(), i("aside", et, [
      t("header", null, [
        e[12] || (e[12] = t("div", null, [
          t("strong", null, "仓库任务"),
          t("small", null, "关联当前 GitHub 仓库")
        ], -1)),
        t("button", {
          type: "button",
          disabled: s(N).saving,
          "aria-label": "收起任务栏",
          onClick: e[0] || (e[0] = (a) => D("close"))
        }, "×", 8, tt)
      ]),
      t("div", st, [
        ue(Qe, {
          "repository-name": W.repository.fullName,
          disabled: s(N).saving,
          onOpenTask: e[1] || (e[1] = (a) => D("openTask", a))
        }, null, 8, ["repository-name", "disabled"]),
        e[22] || (e[22] = t("h3", { class: "task-create-heading" }, "创建任务", -1)),
        t("div", at, [
          e[13] || (e[13] = t("span", null, "◇", -1)),
          t("div", null, [
            t("strong", null, u(W.repository.fullName), 1),
            t("small", null, u(W.repository.description || "创建后自动关联此仓库"), 1)
          ])
        ]),
        t("div", ot, [
          t("div", nt, [
            e[14] || (e[14] = t("label", {
              class: "selector-label",
              for: "task-dest-project"
            }, [
              t("span", { class: "selector-title" }, "📁 目标项目")
            ], -1)),
            ae(t("select", {
              id: "task-dest-project",
              "onUpdate:modelValue": e[2] || (e[2] = (a) => p.value = a),
              class: "task-project-select",
              disabled: s(N).saving || C.value,
              onChange: I
            }, [
              C.value ? (n(), i("option", lt, "正在加载 Todoist 项目…")) : _.value.length ? w("", !0) : (n(), i("option", rt, "未找到可用项目，请检查登录")),
              (n(!0), i(q, null, te(_.value, (a) => (n(), i("option", {
                key: a.id,
                value: String(a.id)
              }, u(a.name), 9, dt))), 128))
            ], 40, it), [
              [ce, p.value]
            ])
          ]),
          t("div", ut, [
            e[16] || (e[16] = t("label", {
              class: "selector-label",
              for: "task-dest-section"
            }, [
              t("span", { class: "selector-title" }, "📑 目标分组 (板块)")
            ], -1)),
            ae(t("select", {
              id: "task-dest-section",
              "onUpdate:modelValue": e[3] || (e[3] = (a) => f.value = a),
              class: "task-section-select",
              disabled: s(N).saving || j.value,
              onChange: c
            }, [
              e[15] || (e[15] = t("option", { value: "" }, "(无分组 / 默认项目根)", -1)),
              j.value ? (n(), i("option", vt, "正在加载板块分组…")) : w("", !0),
              (n(!0), i(q, null, te(S.value, (a) => (n(), i("option", {
                key: a.id,
                value: String(a.id)
              }, u(a.name), 9, pt))), 128))
            ], 40, ct), [
              [ce, f.value]
            ])
          ])
        ]),
        y.value ? (n(), i("p", mt, u(y.value), 1)) : w("", !0),
        h.value ? (n(), i("section", gt, [
          h.value.taskId ? (n(), i(q, { key: 0 }, [
            e[17] || (e[17] = t("strong", null, "任务已创建", -1)),
            t("p", null, u(h.value.content), 1),
            t("button", {
              type: "button",
              class: "task-open-link",
              disabled: s(N).saving,
              onClick: e[4] || (e[4] = (a) => D("openTask", h.value.taskId))
            }, "在插件中打开任务 →", 8, ft),
            ue(Le, {
              "task-id": h.value.taskId
            }, null, 8, ["task-id"]),
            z.value ? (n(), i("button", {
              key: 1,
              type: "button",
              onClick: l
            }, "继续创建")) : (n(), i("button", {
              key: 0,
              type: "button",
              disabled: s(N).saving,
              onClick: v
            }, "仅重试仓库关联", 8, kt))
          ], 64)) : (n(), i(q, { key: 1 }, [
            t("strong", null, u(s(N).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
            t("p", null, u(h.value.content), 1),
            s(N).saving ? (n(), i("small", ht, "正在提交至“" + u(h.value.target.title) + "”，请稍候。", 1)) : (n(), i(q, { key: 1 }, [
              t("small", null, "请先在 Todoist 核对“" + u(h.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
              t("button", {
                type: "button",
                onClick: d
              }, "我已核对，允许新建")
            ], 64))
          ], 64))
        ])) : (n(), i("form", {
          key: 2,
          onSubmit: ke(A, ["prevent"])
        }, [
          t("fieldset", {
            disabled: s(N).saving || G.value
          }, [
            t("label", null, [
              e[18] || (e[18] = ee(" 任务名称 ", -1)),
              ae(t("textarea", {
                "onUpdate:modelValue": e[5] || (e[5] = (a) => x.value = a),
                rows: "2",
                maxlength: "500",
                placeholder: "要在这个仓库上做什么？",
                required: ""
              }, null, 512), [
                [ve, x.value]
              ])
            ]),
            t("label", null, [
              e[19] || (e[19] = ee(" 描述 ", -1)),
              ae(t("textarea", {
                "onUpdate:modelValue": e[6] || (e[6] = (a) => T.value = a),
                rows: "4",
                maxlength: "16000",
                placeholder: "记录目标、步骤或想法（可选）"
              }, null, 512), [
                [ve, T.value]
              ])
            ]),
            e[20] || (e[20] = t("label", null, "截止日期", -1)),
            t("button", {
              ref_key: "dateAnchor",
              ref: B,
              type: "button",
              class: "task-date-button",
              onClick: e[7] || (e[7] = (a) => H.value = !H.value)
            }, "▦ " + u($.value ? $.value + (R.value ? " " + R.value : "") : "添加日期与时间"), 513),
            H.value ? (n(), he(Ne, {
              key: 0,
              modelValue: $.value,
              "onUpdate:modelValue": e[8] || (e[8] = (a) => $.value = a),
              "time-value": R.value,
              "onUpdate:timeValue": e[9] || (e[9] = (a) => R.value = a),
              "anchor-el": B.value,
              onTimeValidity: e[10] || (e[10] = (a) => L.value = a),
              onClose: e[11] || (e[11] = (a) => {
                H.value = !1, L.value = !0;
              })
            }, null, 8, ["modelValue", "time-value", "anchor-el"])) : w("", !0),
            e[21] || (e[21] = t("p", { class: "task-local-note" }, "任务名称、描述和截止日期提交至 Todoist；关联仓库双向保存在本机。", -1)),
            t("button", {
              type: "submit",
              class: "create-task",
              disabled: !x.value.trim() || !p.value || !L.value || C.value
            }, u(s(N).saving ? "正在创建…" : "创建任务"), 9, bt)
          ], 8, yt)
        ], 32))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ de(wt, [["__scopeId", "data-v-fd5bb9dd"]]), Tt = {
  key: 0,
  class: "gh-modal-overlay"
}, St = ["aria-label"], Ct = { class: "gh-modal-title-wrap" }, $t = ["href"], Et = { class: "gh-owner" }, It = { class: "gh-name" }, xt = { class: "gh-modal-actions" }, Lt = {
  key: 0,
  class: "gh-status-tip"
}, Nt = ["aria-expanded", "disabled"], Rt = ["disabled"], At = { class: "gh-modal-content" }, Mt = { class: "gh-repository-content" }, Dt = { class: "gh-modal-ribbon" }, Pt = { class: "gh-meta-badges" }, jt = ["title"], Ot = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, Ht = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, Vt = {
  key: 0,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Wt = {
  key: 1,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, Ut = {
  key: 2,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, qt = {
  key: 0,
  class: "gh-modal-desc"
}, Bt = {
  key: 1,
  class: "gh-modal-topics"
}, Gt = { class: "gh-modal-body" }, zt = {
  key: 0,
  class: "gh-status-tip"
}, Ft = { class: "gh-toc-title" }, Yt = { class: "gh-toc-arrow" }, Zt = { class: "gh-toc-list" }, Xt = ["onClick"], Jt = { class: "gh-toc-text" }, Kt = {
  key: 2,
  class: "gh-readme-loading"
}, Qt = {
  key: 3,
  class: "gh-readme-error"
}, es = ["href"], ts = {
  key: 4,
  class: "gh-readme-loading"
}, ss = ["innerHTML"], as = /* @__PURE__ */ le({
  __name: "GitHubRepoDetailDrawer",
  setup(W) {
    const U = m(""), b = m(!1), D = m(!1);
    Q(() => o.fullName, () => {
      D.value = !1;
    }), Q(D, async () => {
      if (await pe(), !p.value || !S.value) return;
      const v = S.value.getBoundingClientRect().width;
      p.value = { ...p.value, x: Math.max(10, Math.min(p.value.x, window.innerWidth - v - 10)) };
    });
    const _ = m(null), S = m(null), p = m(null), f = m(!document.hidden);
    let C = !0, j = 0, x = 0, T, $ = () => {
    }, R = !1, B = 0, H = 0, L = 0, y = 0;
    function G(v) {
      if (v.target.closest("button, a, input")) return;
      $();
      const l = S.value;
      if (!l || !o.isOpen || !f.value) return;
      R = !0;
      const d = l.getBoundingClientRect();
      L = d.left, y = d.top, B = v.clientX, H = v.clientY, p.value = { x: L, y };
      const r = (a) => {
        if (!R) return;
        const E = a.clientX - B, O = a.clientY - H;
        p.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, L + E)),
          y: Math.max(10, Math.min(window.innerHeight - 80, y + O))
        };
      }, e = () => {
        R = !1, window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", e);
      };
      $ = e, window.addEventListener("mousemove", r), window.addEventListener("mouseup", e);
    }
    function z() {
      X.close();
    }
    function h(v) {
      N.saving || (X.close(), De(v));
    }
    function P(v) {
      v.key === "Escape" && o.isOpen && z();
    }
    async function J(v, l) {
      if (!o.isOpen || !f.value) return;
      const d = j, r = ++x, e = () => o.isOpen && f.value && j === d && r === x;
      clearTimeout(T);
      try {
        await navigator.clipboard.writeText(v), e() && (U.value = `已复制 ${l}`);
      } catch {
        e() && (U.value = "复制未确认");
      }
      e() && (T = setTimeout(() => {
        e() && (U.value = "");
      }, 2e3));
    }
    function Y(v) {
      const l = v.target, d = l?.closest("img");
      if (d && d.src) {
        v.preventDefault(), v.stopPropagation(), Se.open({ source: d.src, title: d.alt || "图片预览" });
        return;
      }
      const r = l?.closest("a");
      if (r) {
        const e = r.getAttribute("href") || "";
        if (e.startsWith("#"))
          return;
        const a = /^(?:\.?\/)?(README[._a-zA-Z0-9-]*\.md)$/i.exec(e);
        if (a) {
          v.preventDefault(), v.stopPropagation(), X.switchReadme(a[1]);
          return;
        }
        const E = o.fullName.toLowerCase(), O = new RegExp(`^https?:\\/\\/github\\.com\\/${E}\\/blob\\/[^/]+\\/(README[._a-zA-Z0-9-]*\\.md)$`, "i").exec(e);
        if (O) {
          v.preventDefault(), v.stopPropagation(), X.switchReadme(O[1]);
          return;
        }
        r.href && !r.href.startsWith("chrome-extension://") && (v.preventDefault(), v.stopPropagation(), window.open(r.href, "_blank", "noopener,noreferrer"));
      }
    }
    function K() {
      X.switchReadme();
    }
    function g(v) {
      if (!_.value) return;
      const l = _.value.querySelectorAll("h1, h2, h3");
      for (const d of Array.from(l))
        if (d.textContent?.trim().includes(v.text)) {
          d.scrollIntoView({ behavior: "smooth", block: "start" }), b.value = !1;
          break;
        }
    }
    Q(
      () => [o.readmeHtml, o.isOpen, f.value, o.revision],
      async ([v, l, d], r, e) => {
        let a = !1, E = 0;
        e(() => {
          a = !0, cancelAnimationFrame(E);
        }), !(!v || !l || !d) && (await pe(), !a && (E = requestAnimationFrame(() => {
          a || !o.isOpen || !f.value || _.value?.querySelectorAll("pre").forEach((O) => {
            if (O.querySelector(".gh-code-copy-btn")) return;
            const V = document.createElement("button");
            V.type = "button", V.className = "gh-code-copy-btn", V.title = "复制代码", V.innerText = "复制", V.addEventListener("click", (oe) => {
              oe.stopPropagation(), J(O.querySelector("code")?.innerText || "", "代码");
            }), O.style.position = "relative", O.appendChild(V);
          });
        })));
      }
    );
    function I() {
      ++j, ++x, clearTimeout(T), U.value = "", b.value = !1, $();
    }
    Q(() => [o.revision, o.isOpen, f.value], () => {
      I(), window.removeEventListener("keydown", P), o.isOpen && f.value && window.addEventListener("keydown", P);
    }, { immediate: !0, flush: "sync" });
    function c() {
      f.value = C && !document.hidden, X.setPageActive(f.value);
    }
    function k() {
      C = !1, c();
    }
    function A() {
      C = !0, c();
    }
    return re(() => {
      document.addEventListener("visibilitychange", c), window.addEventListener("pagehide", k), window.addEventListener("pageshow", A), c();
    }), fe(() => {
      I(), X.setPageActive(!1), window.removeEventListener("keydown", P), document.removeEventListener("visibilitychange", c), window.removeEventListener("pagehide", k), window.removeEventListener("pageshow", A);
    }), (v, l) => s(o).isOpen ? (n(), i("div", Tt, [
      t("div", {
        ref_key: "windowRef",
        ref: S,
        class: se(["gh-modal-window", { "has-task-pane": D.value }]),
        style: _e(p.value ? { position: "fixed", left: `${p.value.x}px`, top: `${p.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": s(o).fullName
      }, [
        t("header", {
          class: "gh-modal-header",
          onMousedown: G
        }, [
          t("div", Ct, [
            l[5] || (l[5] = t("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            t("a", {
              href: s(o).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              t("span", Et, u(s(o).owner), 1),
              l[3] || (l[3] = t("span", { class: "gh-sep" }, "/", -1)),
              t("strong", It, u(s(o).repo), 1),
              l[4] || (l[4] = t("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, $t)
          ]),
          t("div", xt, [
            U.value ? (n(), i("span", Lt, u(U.value), 1)) : w("", !0),
            t("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              "aria-expanded": D.value,
              disabled: s(N).saving,
              onClick: l[0] || (l[0] = (d) => D.value = !D.value)
            }, "任务", 8, Nt),
            t("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: s(N).saving,
              title: "关闭视窗 (Esc)",
              onClick: z
            }, " ✕ ", 8, Rt)
          ])
        ], 32),
        t("div", At, [
          t("div", Mt, [
            t("div", Dt, [
              t("div", Pt, [
                t("button", {
                  type: "button",
                  class: se(["gh-meta-item gh-meta-zh-btn", { "is-zh": s(o).isZh }]),
                  title: s(o).isZh ? "当前为中文文档 · 点击切换为英文原版" : "当前为英文文档 · 点击切换为中文文档",
                  onClick: K
                }, [
                  ee(u(s(o).isZh ? "🇨🇳 中文版" : "🌐 English") + " ", 1),
                  l[6] || (l[6] = t("span", { class: "zh-toggle-arrow" }, "⇄", -1))
                ], 10, jt),
                t("span", Ot, [
                  l[7] || (l[7] = ee(" ★ ", -1)),
                  t("strong", null, u(s(o).stars.toLocaleString()), 1)
                ]),
                t("span", Ht, [
                  l[8] || (l[8] = ee(" ⌥ ", -1)),
                  t("strong", null, u(s(o).forks.toLocaleString()), 1)
                ]),
                s(o).language ? (n(), i("span", Vt, " 💻 " + u(s(o).language), 1)) : w("", !0),
                s(o).license ? (n(), i("span", Wt, " 📄 " + u(s(o).license), 1)) : w("", !0),
                s(o).pushedAt ? (n(), i("span", Ut, " ⏱ " + u(s(Te)(s(o).pushedAt)), 1)) : w("", !0)
              ]),
              s(o).description ? (n(), i("p", qt, u(s(o).description), 1)) : w("", !0),
              s(o).topics.length ? (n(), i("div", Bt, [
                (n(!0), i(q, null, te(s(o).topics, (d) => (n(), i("span", {
                  key: d,
                  class: "gh-topic-tag"
                }, " #" + u(d), 1))), 128))
              ])) : w("", !0)
            ]),
            t("main", Gt, [
              s(o).notice ? (n(), i("p", zt, u(s(o).notice), 1)) : w("", !0),
              s(o).headings.length > 0 ? (n(), i("aside", {
                key: 1,
                class: se(["gh-modal-toc", { "is-open": b.value }])
              }, [
                t("div", {
                  class: "gh-toc-header",
                  onClick: l[1] || (l[1] = (d) => b.value = !b.value)
                }, [
                  l[9] || (l[9] = t("span", { class: "gh-toc-icon" }, "📑", -1)),
                  t("span", Ft, "目录大纲 (" + u(s(o).headings.length) + ")", 1),
                  t("span", Yt, u(b.value ? "▲" : "▼"), 1)
                ]),
                ae(t("ul", Zt, [
                  (n(!0), i(q, null, te(s(o).headings, (d, r) => (n(), i("li", {
                    key: r,
                    class: se(["gh-toc-item", `level-${d.level}`]),
                    onClick: (e) => g(d)
                  }, [
                    l[10] || (l[10] = t("span", { class: "gh-toc-bullet" }, "·", -1)),
                    t("span", Jt, u(d.text), 1)
                  ], 10, Xt))), 128))
                ], 512), [
                  [we, b.value]
                ])
              ], 2)) : w("", !0),
              s(o).isLoading ? (n(), i("div", Kt, [
                l[11] || (l[11] = t("div", { class: "gh-spinner" }, null, -1)),
                t("span", null, "正在获取并排版 " + u(s(o).fullName) + " 的 README.md …", 1)
              ])) : s(o).error ? (n(), i("div", Qt, [
                l[12] || (l[12] = t("span", { class: "gh-error-icon" }, "⚠️", -1)),
                t("p", null, u(s(o).error), 1),
                t("a", {
                  href: s(o).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, es)
              ])) : s(o).hasReadme && !s(o).readmeMarkdown ? (n(), i("p", ts, "README 内容为空。")) : (n(), i("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: _,
                class: "gh-readme-rendered obsidian-markdown-rendered allow-copy",
                innerHTML: s(o).readmeHtml,
                onClick: Y
              }, null, 8, ss))
            ])
          ]),
          D.value ? (n(), he(_t, {
            key: s(o).fullName,
            repository: { fullName: s(o).fullName, description: s(o).description, stars: s(o).stars, language: s(o).language, updated: s(o).pushedAt },
            onClose: l[2] || (l[2] = (d) => D.value = !1),
            onOpenTask: h
          }, null, 8, ["repository"])) : w("", !0)
        ])
      ], 14, St)
    ])) : w("", !0);
  }
}), gs = /* @__PURE__ */ de(as, [["__scopeId", "data-v-2f8673df"]]);
export {
  gs as default
};
