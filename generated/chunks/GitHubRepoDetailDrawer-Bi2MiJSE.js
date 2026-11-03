import { d as de, w as Q, D as ue, z as ke, o as i, g as l, h as t, p as ee, t as u, i as T, u as a, F, j as le, k as ye, C as te, b as m, y as ae, s as ie, n as re, q as pe, e as be, G as me, A as Te, B as Se } from "./vendor-vue-FFI3kJnP.js";
import { _ as A, p as s, A as X, $ as Ce } from "./search.service-Ct9e-A4u.js";
import { i as Ee } from "./images-akU5NltQ.js";
import { i as $e, t as P, a as ge, T as fe, e as Ie } from "./todoist.service-CDSsgWpW.js";
import { C as he, n as xe } from "./view-styles-COzBKjCs.js";
import { t as z, w as we } from "./module-state-GmAjQSzX.js";
import { e as _e } from "./calendar.service-DE6FKh8O.js";
import { u as Le, f as Ne, T as Re, r as Ae, a as Me } from "./TaskRepositoryLinks-zooTO4G2.js";
import { T as De } from "./TodoistDatePickerPopover-FCWFwVeB.js";
import { R as Pe } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DRvNM_7u.js";
import { _ as ce } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { openTodoistTask as Oe } from "./task-navigation-C1h9ClKd.js";
const Ve = ["aria-busy"], je = { class: "linked-tasks-heading" }, He = { key: 0 }, We = ["disabled"], Ue = {
  key: 0,
  class: "linked-tasks-message",
  role: "status"
}, qe = {
  key: 1,
  class: "linked-tasks-message",
  role: "status"
}, Ge = {
  key: 2,
  class: "linked-tasks-message",
  role: "alert"
}, Be = {
  key: 3,
  class: "linked-tasks-empty"
}, ze = {
  key: 4,
  class: "linked-tasks-list",
  tabindex: "0",
  "aria-label": "关联任务列表，可滚动"
}, Fe = {
  key: 0,
  class: "linked-task-card"
}, Ye = ["disabled", "aria-label", "title", "onClick"], Ze = ["disabled", "aria-label", "onClick"], Xe = {
  key: 0,
  class: "linked-task-description"
}, Je = {
  key: 1,
  class: "linked-task-meta"
}, Ke = ["title"], Qe = {
  key: 1,
  class: "linked-task-unavailable",
  role: "status"
}, et = /* @__PURE__ */ de({
  __name: "GitHubRepositoryLinkedTasks",
  props: {
    repositoryName: {},
    disabled: { type: Boolean }
  },
  emits: ["openTask"],
  setup(W, { emit: U }) {
    const w = W, O = U, S = m([]), E = m(!1), p = m(""), h = m(""), $ = m(""), j = m(""), N = ae(() => S.value.filter((f) => !f.task || !$e(f.task))), C = new Pe();
    let I = !1, M = !0, q = !1;
    const H = m(!document.hidden), R = () => I && M && H.value;
    Le(() => H.value && !w.disabled, () => C.cancel(), () => b());
    function b() {
      q || !R() || (q = !0, queueMicrotask(() => {
        q = !1, R() && !z.pendingWrites && G();
      }));
    }
    async function G() {
      if (!R() || z.pendingWrites) return;
      C.cancel(), p.value = "", h.value = "", S.value = [];
      let f;
      try {
        const D = Ne(w.repositoryName);
        f = D.taskIds, D.unreadableCount && (h.value = "部分本机关联记录无法读取，列表可能不完整；未修改记录。");
      } catch {
        p.value = "本机关联记录读取失败，请稍后刷新；未修改记录。";
        return;
      }
      if (!f.length) return;
      S.value = f.map((D) => ({ id: D }));
      const L = w.repositoryName;
      let c = null;
      const y = C.begin({
        timeoutMs: 3e4,
        isCurrent: () => R() && w.repositoryName === L && (c === null || c === P.getToken()),
        onStop: (D) => {
          E.value = !1, D === "timeout" && (p.value = "关联任务读取超时，保留已读取结果，请手动刷新。");
        }
      });
      E.value = !0;
      try {
        if (c = await y.wait(() => P.initToken()), !y.current()) return;
        if (!c.trim()) {
          p.value = "请先配置 Todoist 账号，才能读取已关联的任务。";
          return;
        }
        let D = 0;
        const v = async () => {
          for (; y.current(); ) {
            const o = D++;
            if (o >= f.length) return;
            const r = f[o];
            try {
              const _ = await y.wait(() => P.api("/tasks/" + encodeURIComponent(r), { signal: y.signal }));
              if (!y.current()) return;
              if (!_ || typeof _ != "object") throw new Error("Invalid task");
              const g = _;
              if (String(g.id) !== r || typeof g.content != "string" || g.is_deleted || g.checked === void 0 && g.is_completed === void 0 || g.checked !== void 0 && typeof g.checked != "boolean" || g.is_completed !== void 0 && typeof g.is_completed != "boolean") throw new Error("Invalid task");
              S.value[o] = { id: r, task: g };
            } catch (_) {
              if (!y.current()) return;
              S.value[o] = { id: r, error: ge(_) };
            }
          }
        };
        await Promise.allSettled(Array.from({ length: Math.min(3, f.length) }, v));
      } catch {
        y.current() && (p.value = "Todoist 配置或任务读取失败，请手动刷新。");
      } finally {
        y.finish() && (E.value = !1);
      }
    }
    async function B(f) {
      if (!f.task || w.disabled || $.value || z.pendingWrites || !R()) return;
      const L = f.id, c = w.repositoryName, y = f.task, D = P.getToken();
      $.value = L, j.value = "", C.cancel();
      let v = !1, o = !1;
      try {
        await we(async () => {
          const r = await P.initToken();
          if (!r || r !== D || !R() || w.repositoryName !== c || w.disabled) throw new Error("Not submitted");
          if (v = !0, await P.toggleTaskCompletion(L, !0), o = !0, P.invalidateWorkspaceSnapshots(), !I || r !== P.getToken()) return;
          f.task = { ...y, checked: !0, is_completed: !0 };
          const { todoistCalendarSidebarController: _ } = await import("./calendar.service-DE6FKh8O.js").then((g) => g.o);
          !I || r !== P.getToken() || _.recordTaskCompletion({
            id: L,
            content: y.content,
            description: y.description,
            completed: !0,
            dueDate: y.due?.date,
            _taskRaw: y
          }, !0);
        }), z.active && _e.loadWorkspace(void 0, void 0, !0);
      } catch (r) {
        r instanceof fe && !r.submitted && (v = !1), I && w.repositoryName === c && (j.value = o ? "任务已完成，但本地显示更新失败，请刷新核对。" : v ? "完成结果未确认，请刷新核对；未自动重试。" : r instanceof fe ? ge(r) + " 尚未提交完成操作。" : "页面或账号状态已变化，尚未提交完成操作。");
      } finally {
        $.value = "", b();
      }
    }
    function k(f) {
      f instanceof StorageEvent && f.key !== null && !f.key.startsWith("todoist_repository_links_v1:") || b();
    }
    function V() {
      H.value = !document.hidden, R() ? b() : C.cancel();
    }
    function J() {
      M = !1, C.cancel();
    }
    function Y() {
      M = !0, V();
    }
    function K(f, L) {
      L !== "local" || !Object.prototype.hasOwnProperty.call(f, Ie) || (C.cancel(), S.value = [], p.value = "", b());
    }
    return Q(() => w.repositoryName, () => {
      C.cancel(), S.value = [], b();
    }), Q(() => z.pendingWrites, (f, L) => {
      f ? C.cancel() : L && b();
    }), ue(() => {
      I = !0, window.addEventListener("storage", k), window.addEventListener("todoist-repository-links-changed", k), document.addEventListener("visibilitychange", V), window.addEventListener("pagehide", J), window.addEventListener("pageshow", Y), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(K), b();
    }), ke(() => {
      I = !1, C.cancel(), window.removeEventListener("storage", k), window.removeEventListener("todoist-repository-links-changed", k), document.removeEventListener("visibilitychange", V), window.removeEventListener("pagehide", J), window.removeEventListener("pageshow", Y), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(K);
    }), (f, L) => (i(), l("section", {
      class: "repository-linked-tasks",
      "aria-label": "当前仓库关联的 Todoist 任务",
      "aria-busy": E.value
    }, [
      t("div", je, [
        t("h3", null, [
          L[0] || (L[0] = ee("关联任务 ", -1)),
          N.value.length ? (i(), l("small", He, u(N.value.length), 1)) : T("", !0)
        ]),
        t("button", {
          type: "button",
          class: "linked-tasks-refresh",
          disabled: E.value || W.disabled || !!a(z).pendingWrites,
          onClick: G
        }, u(E.value ? "读取中…" : "刷新"), 9, We)
      ]),
      p.value ? (i(), l("p", Ue, u(p.value), 1)) : T("", !0),
      h.value ? (i(), l("p", qe, u(h.value), 1)) : T("", !0),
      j.value ? (i(), l("p", Ge, u(j.value), 1)) : T("", !0),
      !N.value.length && !p.value ? (i(), l("p", Be, "暂无未完成的关联任务")) : T("", !0),
      N.value.length ? (i(), l("div", ze, [
        (i(!0), l(F, null, le(N.value, (c) => (i(), l(F, {
          key: c.id
        }, [
          c.task ? (i(), l("article", Fe, [
            t("button", {
              type: "button",
              class: te(["linked-task-check", { pending: $.value === c.id }]),
              disabled: W.disabled || !!$.value || !!a(z).pendingWrites,
              "aria-label": "完成任务：" + c.task.content,
              title: $.value === c.id ? "正在提交完成…" : "完成任务",
              onClick: ye((y) => B(c), ["stop"])
            }, u($.value === c.id ? "…" : ""), 11, Ye),
            t("button", {
              type: "button",
              class: "linked-task-body",
              disabled: W.disabled || !!$.value,
              "aria-label": "在插件中打开任务：" + c.task.content,
              onClick: (y) => O("openTask", c.id)
            }, [
              t("strong", null, u(c.task.content || "未命名任务"), 1),
              c.task.description ? (i(), l("span", Xe, u(c.task.description), 1)) : T("", !0),
              c.task.due?.date || c.task.labels?.length ? (i(), l("span", Je, [
                c.task.due?.date ? (i(), l("span", {
                  key: 0,
                  title: c.task.due.date
                }, "▦ " + u(c.task.due.date), 9, Ke)) : T("", !0),
                (i(!0), l(F, null, le((c.task.labels || []).slice(0, 3), (y) => (i(), l("span", { key: y }, "◇ " + u(y), 1))), 128))
              ])) : T("", !0)
            ], 8, Ze)
          ])) : (i(), l("p", Qe, u(c.error || (E.value ? "正在读取关联任务…" : "任务尚未读取，请刷新核对。")), 1))
        ], 64))), 128))
      ])) : T("", !0)
    ], 8, Ve));
  }
}), tt = /* @__PURE__ */ ce(et, [["__scopeId", "data-v-6193401f"]]), at = {
  class: "github-repository-tasks",
  "aria-label": "仓库关联任务与创建栏"
}, st = ["disabled"], ot = { class: "task-pane-content" }, nt = { class: "repository-reference" }, it = { class: "task-destination-selector" }, lt = { class: "selector-field" }, rt = { class: "selector-field" }, dt = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, ut = {
  key: 1,
  class: "task-receipt"
}, ct = ["disabled"], vt = ["disabled"], pt = { key: 0 }, mt = ["disabled"], gt = ["disabled"], ft = /* @__PURE__ */ de({
  __name: "GitHubRepositoryTasks",
  props: {
    repository: {}
  },
  emits: ["close", "openTask"],
  setup(W, { emit: U }) {
    const w = W, O = U, S = m([]), E = m([]), p = m(""), h = m(""), $ = m(!1), j = m(!1), N = m(""), C = m(""), I = m(""), M = m(""), q = m(null), H = m(!1), R = m(!0), b = m(""), G = m(!1), B = m(!1), k = m(null), V = "github_task_attempt_v1:" + w.repository.fullName.toLowerCase(), J = ae(() => S.value.find((d) => String(d.id) === p.value)?.name || "未命名项目"), Y = ae(() => h.value && E.value.find((d) => String(d.id) === h.value)?.name || "");
    async function K() {
      $.value = !0;
      try {
        const d = await P.getProjects();
        S.value = (d || []).filter((n) => !n.is_deleted && !n.is_archived);
        const e = localStorage.getItem("github_task_last_project_id");
        if (e && S.value.some((n) => String(n.id) === e))
          p.value = e;
        else if (S.value.length > 0) {
          const n = S.value.find((x) => x.inbox_project || x.is_inbox_project || /^(Inbox|收件箱)$/i.test(x.name));
          p.value = String(n ? n.id : S.value[0].id);
        }
        p.value && await f(p.value);
      } catch (d) {
        b.value = "加载 Todoist 项目失败: " + (d?.message || "请检查登录状态");
      } finally {
        $.value = !1;
      }
    }
    async function f(d) {
      j.value = !0;
      try {
        const e = await P.getSections(d);
        E.value = (e || []).filter((x) => !!(x && x.id && x.name));
        const n = localStorage.getItem("github_task_last_section_id");
        n && E.value.some((x) => String(x.id) === n) ? h.value = n : h.value = "";
      } catch {
        E.value = [], h.value = "";
      } finally {
        j.value = !1;
      }
    }
    const L = ae(() => S.value.map((d) => ({
      value: String(d.id),
      label: d.name,
      icon: "📁"
    }))), c = ae(() => {
      const d = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return E.value.forEach((e) => {
        d.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), d;
    });
    async function y(d) {
      p.value = String(d), localStorage.setItem("github_task_last_project_id", p.value), h.value = "", localStorage.removeItem("github_task_last_section_id"), await f(p.value);
    }
    function D(d) {
      h.value = String(d), h.value ? localStorage.setItem("github_task_last_section_id", h.value) : localStorage.removeItem("github_task_last_section_id");
    }
    function v() {
      try {
        const d = localStorage.getItem(V);
        if (!d) return;
        const e = JSON.parse(d);
        if (!e || typeof e.requestId != "string" || typeof e.content != "string" || !e.target || typeof e.target.title != "string" || e.repository?.fullName !== w.repository.fullName || e.taskId !== void 0 && typeof e.taskId != "string") throw new Error();
        k.value = e, e.taskId && (B.value = Ae(e.taskId).some((n) => n.fullName.toLowerCase() === w.repository.fullName.toLowerCase()));
      } catch {
        G.value = !0, b.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
      }
    }
    ue(() => {
      v(), K();
    });
    async function o() {
      if (A.saving || k.value || G.value || !N.value.trim() || !p.value || !R.value) return;
      const d = p.value, e = h.value || void 0, n = { ...w.repository }, x = J.value + (Y.value ? " / " + Y.value : ""), se = {
        content: N.value.trim(),
        description: C.value.trim(),
        project_id: d,
        section_id: e,
        due_string: I.value ? I.value + (M.value ? " " + M.value : "") : void 0
      };
      A.saving = !0, b.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(V, { ifAvailable: !0 }, async (oe) => {
          if (!oe) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          v(), !(k.value || G.value) && await we(async () => {
            const ve = await P.initToken();
            if (document.hidden || !ve || ve !== P.getToken())
              throw new Error("Todoist 未登录或 Token 已变更，请检查账号设置。");
            const Z = {
              requestId: crypto.randomUUID(),
              repository: n,
              target: { projectId: d, sectionId: e || "", title: x },
              content: se.content
            };
            localStorage.setItem(V, JSON.stringify(Z)), k.value = Z;
            try {
              const ne = await P.createTask(se, Z.requestId);
              if (!ne || typeof ne.id != "string") throw new Error("创建任务返回数据异常");
              Z.taskId = ne.id, k.value = { ...Z };
              try {
                localStorage.setItem(V, JSON.stringify(Z));
              } catch {
                b.value = "任务已创建，但本机回执保存失败；不要重复创建。";
              }
              P.invalidateWorkspaceSnapshots(), r(), xe.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: Z.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: ne.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), z.active && _e.loadWorkspace(void 0, void 0, !0);
            } catch {
              b.value = k.value?.taskId ? "任务已创建，但后续界面更新未完成；不要重复创建。" : "创建结果未确认，请核对 Todoist。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (oe) {
        b.value = oe instanceof Error && !k.value ? oe.message : "提交记录保存失败，尚未发送创建请求。";
      } finally {
        A.saving = !1;
      }
    }
    function r() {
      const d = k.value;
      if (d?.taskId)
        try {
          Me(d.taskId, d.repository), B.value = !0, b.value.startsWith("任务已创建，但仓库卡片保存失败") && (b.value = "");
        } catch {
          b.value = "任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。";
        }
    }
    function _() {
      k.value = null, N.value = "", C.value = "", I.value = "", M.value = "", B.value = !1, localStorage.removeItem(V);
    }
    function g() {
      k.value = null, localStorage.removeItem(V);
    }
    return (d, e) => (i(), l("aside", at, [
      t("header", null, [
        e[12] || (e[12] = t("div", null, [
          t("strong", null, "仓库任务"),
          t("small", null, "关联当前 GitHub 仓库")
        ], -1)),
        t("button", {
          type: "button",
          disabled: a(A).saving,
          "aria-label": "收起任务栏",
          onClick: e[0] || (e[0] = (n) => O("close"))
        }, "×", 8, st)
      ]),
      t("div", ot, [
        ie(tt, {
          "repository-name": W.repository.fullName,
          disabled: a(A).saving,
          onOpenTask: e[1] || (e[1] = (n) => O("openTask", n))
        }, null, 8, ["repository-name", "disabled"]),
        e[21] || (e[21] = t("h3", { class: "task-create-heading" }, "创建任务", -1)),
        t("div", nt, [
          e[13] || (e[13] = t("span", null, "◇", -1)),
          t("div", null, [
            t("strong", null, u(W.repository.fullName), 1),
            t("small", null, u(W.repository.description || "创建后自动关联此仓库"), 1)
          ])
        ]),
        t("div", it, [
          t("div", lt, [
            e[14] || (e[14] = t("span", { class: "selector-title" }, "📁 目标项目", -1)),
            ie(he, {
              modelValue: p.value,
              "onUpdate:modelValue": e[2] || (e[2] = (n) => p.value = n),
              options: L.value,
              disabled: a(A).saving || $.value,
              placeholder: $.value ? "正在加载项目…" : "选择项目",
              onChange: y
            }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
          ]),
          t("div", rt, [
            e[15] || (e[15] = t("span", { class: "selector-title" }, "📑 目标分组 (板块)", -1)),
            ie(he, {
              modelValue: h.value,
              "onUpdate:modelValue": e[3] || (e[3] = (n) => h.value = n),
              options: c.value,
              disabled: a(A).saving || j.value,
              placeholder: j.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
              onChange: D
            }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
          ])
        ]),
        b.value ? (i(), l("p", dt, u(b.value), 1)) : T("", !0),
        k.value ? (i(), l("section", ut, [
          k.value.taskId ? (i(), l(F, { key: 0 }, [
            e[16] || (e[16] = t("strong", null, "任务已创建", -1)),
            t("p", null, u(k.value.content), 1),
            t("button", {
              type: "button",
              class: "task-open-link",
              disabled: a(A).saving,
              onClick: e[4] || (e[4] = (n) => O("openTask", k.value.taskId))
            }, "在插件中打开任务 →", 8, ct),
            ie(Re, {
              "task-id": k.value.taskId
            }, null, 8, ["task-id"]),
            B.value ? (i(), l("button", {
              key: 1,
              type: "button",
              onClick: _
            }, "继续创建")) : (i(), l("button", {
              key: 0,
              type: "button",
              disabled: a(A).saving,
              onClick: r
            }, "仅重试仓库关联", 8, vt))
          ], 64)) : (i(), l(F, { key: 1 }, [
            t("strong", null, u(a(A).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
            t("p", null, u(k.value.content), 1),
            a(A).saving ? (i(), l("small", pt, "正在提交至“" + u(k.value.target.title) + "”，请稍候。", 1)) : (i(), l(F, { key: 1 }, [
              t("small", null, "请先在 Todoist 核对“" + u(k.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
              t("button", {
                type: "button",
                onClick: g
              }, "我已核对，允许新建")
            ], 64))
          ], 64))
        ])) : (i(), l("form", {
          key: 2,
          onSubmit: ye(o, ["prevent"])
        }, [
          t("fieldset", {
            disabled: a(A).saving || G.value
          }, [
            t("label", null, [
              e[17] || (e[17] = ee(" 任务名称 ", -1)),
              re(t("textarea", {
                "onUpdate:modelValue": e[5] || (e[5] = (n) => N.value = n),
                rows: "2",
                maxlength: "500",
                placeholder: "要在这个仓库上做什么？",
                required: ""
              }, null, 512), [
                [pe, N.value]
              ])
            ]),
            t("label", null, [
              e[18] || (e[18] = ee(" 描述 ", -1)),
              re(t("textarea", {
                "onUpdate:modelValue": e[6] || (e[6] = (n) => C.value = n),
                rows: "4",
                maxlength: "16000",
                placeholder: "记录目标、步骤或想法（可选）"
              }, null, 512), [
                [pe, C.value]
              ])
            ]),
            e[19] || (e[19] = t("label", null, "截止日期", -1)),
            t("button", {
              ref_key: "dateAnchor",
              ref: q,
              type: "button",
              class: "task-date-button",
              onClick: e[7] || (e[7] = (n) => H.value = !H.value)
            }, "▦ " + u(I.value ? I.value + (M.value ? " " + M.value : "") : "添加日期与时间"), 513),
            H.value ? (i(), be(De, {
              key: 0,
              modelValue: I.value,
              "onUpdate:modelValue": e[8] || (e[8] = (n) => I.value = n),
              "time-value": M.value,
              "onUpdate:timeValue": e[9] || (e[9] = (n) => M.value = n),
              "anchor-el": q.value,
              onTimeValidity: e[10] || (e[10] = (n) => R.value = n),
              onClose: e[11] || (e[11] = (n) => {
                H.value = !1, R.value = !0;
              })
            }, null, 8, ["modelValue", "time-value", "anchor-el"])) : T("", !0),
            e[20] || (e[20] = t("p", { class: "task-local-note" }, "任务名称、描述和截止日期提交至 Todoist；关联仓库双向保存在本机。", -1)),
            t("button", {
              type: "submit",
              class: "create-task",
              disabled: !N.value.trim() || !p.value || !R.value || $.value
            }, u(a(A).saving ? "正在创建…" : "创建任务"), 9, gt)
          ], 8, mt)
        ], 32))
      ])
    ]));
  }
}), ht = /* @__PURE__ */ ce(ft, [["__scopeId", "data-v-6f97a405"]]), kt = {
  key: 0,
  class: "gh-modal-overlay"
}, yt = ["aria-label"], bt = { class: "gh-modal-title-wrap" }, wt = ["href"], _t = { class: "gh-owner" }, Tt = { class: "gh-name" }, St = { class: "gh-modal-actions" }, Ct = {
  key: 0,
  class: "gh-status-tip"
}, Et = ["aria-expanded", "disabled"], $t = ["disabled"], It = { class: "gh-modal-content" }, xt = { class: "gh-repository-content" }, Lt = { class: "gh-modal-ribbon" }, Nt = { class: "gh-meta-badges" }, Rt = ["title"], At = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, Mt = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, Dt = {
  key: 0,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Pt = {
  key: 1,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, Ot = {
  key: 2,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, Vt = {
  key: 0,
  class: "gh-modal-desc"
}, jt = {
  key: 1,
  class: "gh-modal-topics"
}, Ht = { class: "gh-modal-body" }, Wt = {
  key: 0,
  class: "gh-status-tip"
}, Ut = { class: "gh-toc-title" }, qt = { class: "gh-toc-arrow" }, Gt = { class: "gh-toc-list" }, Bt = ["onClick"], zt = { class: "gh-toc-text" }, Ft = {
  key: 2,
  class: "gh-readme-loading"
}, Yt = {
  key: 3,
  class: "gh-readme-error"
}, Zt = ["href"], Xt = {
  key: 4,
  class: "gh-readme-loading"
}, Jt = ["innerHTML"], Kt = /* @__PURE__ */ de({
  __name: "GitHubRepoDetailDrawer",
  setup(W) {
    const U = m(""), w = m(!1), O = m(!1);
    Q(() => s.fullName, () => {
      O.value = !1;
    }), Q(O, async () => {
      if (await me(), !p.value || !E.value) return;
      const v = E.value.getBoundingClientRect().width;
      p.value = { ...p.value, x: Math.max(10, Math.min(p.value.x, window.innerWidth - v - 10)) };
    });
    const S = m(null), E = m(null), p = m(null), h = m(!document.hidden);
    let $ = !0, j = 0, N = 0, C, I = () => {
    }, M = !1, q = 0, H = 0, R = 0, b = 0;
    function G(v) {
      if (v.target.closest("button, a, input")) return;
      I();
      const o = E.value;
      if (!o || !s.isOpen || !h.value) return;
      M = !0;
      const r = o.getBoundingClientRect();
      R = r.left, b = r.top, q = v.clientX, H = v.clientY, p.value = { x: R, y: b };
      const _ = (d) => {
        if (!M) return;
        const e = d.clientX - q, n = d.clientY - H;
        p.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, R + e)),
          y: Math.max(10, Math.min(window.innerHeight - 80, b + n))
        };
      }, g = () => {
        M = !1, window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", g);
      };
      I = g, window.addEventListener("mousemove", _), window.addEventListener("mouseup", g);
    }
    function B() {
      X.close();
    }
    function k(v) {
      A.saving || (X.close(), Oe(v));
    }
    function V(v) {
      v.key === "Escape" && s.isOpen && B();
    }
    async function J(v, o) {
      if (!s.isOpen || !h.value) return;
      const r = j, _ = ++N, g = () => s.isOpen && h.value && j === r && _ === N;
      clearTimeout(C);
      try {
        await navigator.clipboard.writeText(v), g() && (U.value = `已复制 ${o}`);
      } catch {
        g() && (U.value = "复制未确认");
      }
      g() && (C = setTimeout(() => {
        g() && (U.value = "");
      }, 2e3));
    }
    function Y(v) {
      const o = v.target, r = o?.closest("img");
      if (r && r.src) {
        v.preventDefault(), v.stopPropagation(), Ee.open({ source: r.src, title: r.alt || "图片预览" });
        return;
      }
      const _ = o?.closest("a");
      if (_) {
        const g = _.getAttribute("href") || "";
        if (g.startsWith("#"))
          return;
        const d = /^(?:\.?\/)?(README[._a-zA-Z0-9-]*\.md)$/i.exec(g);
        if (d) {
          v.preventDefault(), v.stopPropagation(), X.switchReadme(d[1]);
          return;
        }
        const e = s.fullName.toLowerCase(), n = new RegExp(`^https?:\\/\\/github\\.com\\/${e}\\/blob\\/[^/]+\\/(README[._a-zA-Z0-9-]*\\.md)$`, "i").exec(g);
        if (n) {
          v.preventDefault(), v.stopPropagation(), X.switchReadme(n[1]);
          return;
        }
        _.href && !_.href.startsWith("chrome-extension://") && (v.preventDefault(), v.stopPropagation(), window.open(_.href, "_blank", "noopener,noreferrer"));
      }
    }
    function K() {
      X.switchReadme();
    }
    function f(v) {
      if (!S.value) return;
      const o = S.value.querySelectorAll("h1, h2, h3");
      for (const r of Array.from(o))
        if (r.textContent?.trim().includes(v.text)) {
          r.scrollIntoView({ behavior: "smooth", block: "start" }), w.value = !1;
          break;
        }
    }
    Q(
      () => [s.readmeHtml, s.isOpen, h.value, s.revision],
      async ([v, o, r], _, g) => {
        let d = !1, e = 0;
        g(() => {
          d = !0, cancelAnimationFrame(e);
        }), !(!v || !o || !r) && (await me(), !d && (e = requestAnimationFrame(() => {
          d || !s.isOpen || !h.value || S.value?.querySelectorAll("pre").forEach((n) => {
            if (n.querySelector(".gh-code-copy-btn")) return;
            const x = document.createElement("button");
            x.type = "button", x.className = "gh-code-copy-btn", x.title = "复制代码", x.innerText = "复制", x.addEventListener("click", (se) => {
              se.stopPropagation(), J(n.querySelector("code")?.innerText || "", "代码");
            }), n.style.position = "relative", n.appendChild(x);
          });
        })));
      }
    );
    function L() {
      ++j, ++N, clearTimeout(C), U.value = "", w.value = !1, I();
    }
    Q(() => [s.revision, s.isOpen, h.value], () => {
      L(), window.removeEventListener("keydown", V), s.isOpen && h.value && window.addEventListener("keydown", V);
    }, { immediate: !0, flush: "sync" });
    function c() {
      h.value = $ && !document.hidden, X.setPageActive(h.value);
    }
    function y() {
      $ = !1, c();
    }
    function D() {
      $ = !0, c();
    }
    return ue(() => {
      document.addEventListener("visibilitychange", c), window.addEventListener("pagehide", y), window.addEventListener("pageshow", D), c();
    }), ke(() => {
      L(), X.setPageActive(!1), window.removeEventListener("keydown", V), document.removeEventListener("visibilitychange", c), window.removeEventListener("pagehide", y), window.removeEventListener("pageshow", D);
    }), (v, o) => a(s).isOpen ? (i(), l("div", kt, [
      t("div", {
        ref_key: "windowRef",
        ref: E,
        class: te(["gh-modal-window", { "has-task-pane": O.value }]),
        style: Se(p.value ? { position: "fixed", left: `${p.value.x}px`, top: `${p.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": a(s).fullName
      }, [
        t("header", {
          class: "gh-modal-header",
          onMousedown: G
        }, [
          t("div", bt, [
            o[5] || (o[5] = t("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            t("a", {
              href: a(s).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              t("span", _t, u(a(s).owner), 1),
              o[3] || (o[3] = t("span", { class: "gh-sep" }, "/", -1)),
              t("strong", Tt, u(a(s).repo), 1),
              o[4] || (o[4] = t("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, wt)
          ]),
          t("div", St, [
            U.value ? (i(), l("span", Ct, u(U.value), 1)) : T("", !0),
            t("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              "aria-expanded": O.value,
              disabled: a(A).saving,
              onClick: o[0] || (o[0] = (r) => O.value = !O.value)
            }, "任务", 8, Et),
            t("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: a(A).saving,
              title: "关闭视窗 (Esc)",
              onClick: B
            }, " ✕ ", 8, $t)
          ])
        ], 32),
        t("div", It, [
          t("div", xt, [
            t("div", Lt, [
              t("div", Nt, [
                t("button", {
                  type: "button",
                  class: te(["gh-meta-item gh-meta-zh-btn", { "is-zh": a(s).isZh }]),
                  title: a(s).isZh ? "当前为中文文档 · 点击切换为英文原版" : "当前为英文文档 · 点击切换为中文文档",
                  onClick: K
                }, [
                  ee(u(a(s).isZh ? "🇨🇳 中文版" : "🌐 English") + " ", 1),
                  o[6] || (o[6] = t("span", { class: "zh-toggle-arrow" }, "⇄", -1))
                ], 10, Rt),
                t("span", At, [
                  o[7] || (o[7] = ee(" ★ ", -1)),
                  t("strong", null, u(a(s).stars.toLocaleString()), 1)
                ]),
                t("span", Mt, [
                  o[8] || (o[8] = ee(" ⌥ ", -1)),
                  t("strong", null, u(a(s).forks.toLocaleString()), 1)
                ]),
                a(s).language ? (i(), l("span", Dt, " 💻 " + u(a(s).language), 1)) : T("", !0),
                a(s).license ? (i(), l("span", Pt, " 📄 " + u(a(s).license), 1)) : T("", !0),
                a(s).pushedAt ? (i(), l("span", Ot, " ⏱ " + u(a(Ce)(a(s).pushedAt)), 1)) : T("", !0)
              ]),
              a(s).description ? (i(), l("p", Vt, u(a(s).description), 1)) : T("", !0),
              a(s).topics.length ? (i(), l("div", jt, [
                (i(!0), l(F, null, le(a(s).topics, (r) => (i(), l("span", {
                  key: r,
                  class: "gh-topic-tag"
                }, " #" + u(r), 1))), 128))
              ])) : T("", !0)
            ]),
            t("main", Ht, [
              a(s).notice ? (i(), l("p", Wt, u(a(s).notice), 1)) : T("", !0),
              a(s).headings.length > 0 ? (i(), l("aside", {
                key: 1,
                class: te(["gh-modal-toc", { "is-open": w.value }])
              }, [
                t("div", {
                  class: "gh-toc-header",
                  onClick: o[1] || (o[1] = (r) => w.value = !w.value)
                }, [
                  o[9] || (o[9] = t("span", { class: "gh-toc-icon" }, "📑", -1)),
                  t("span", Ut, "目录大纲 (" + u(a(s).headings.length) + ")", 1),
                  t("span", qt, u(w.value ? "▲" : "▼"), 1)
                ]),
                re(t("ul", Gt, [
                  (i(!0), l(F, null, le(a(s).headings, (r, _) => (i(), l("li", {
                    key: _,
                    class: te(["gh-toc-item", `level-${r.level}`]),
                    onClick: (g) => f(r)
                  }, [
                    o[10] || (o[10] = t("span", { class: "gh-toc-bullet" }, "·", -1)),
                    t("span", zt, u(r.text), 1)
                  ], 10, Bt))), 128))
                ], 512), [
                  [Te, w.value]
                ])
              ], 2)) : T("", !0),
              a(s).isLoading ? (i(), l("div", Ft, [
                o[11] || (o[11] = t("div", { class: "gh-spinner" }, null, -1)),
                t("span", null, "正在获取并排版 " + u(a(s).fullName) + " 的 README.md …", 1)
              ])) : a(s).error ? (i(), l("div", Yt, [
                o[12] || (o[12] = t("span", { class: "gh-error-icon" }, "⚠️", -1)),
                t("p", null, u(a(s).error), 1),
                t("a", {
                  href: a(s).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, Zt)
              ])) : a(s).hasReadme && !a(s).readmeMarkdown ? (i(), l("p", Xt, "README 内容为空。")) : (i(), l("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: S,
                class: "gh-readme-rendered markdown-rendered allow-copy",
                innerHTML: a(s).readmeHtml,
                onClick: Y
              }, null, 8, Jt))
            ])
          ]),
          O.value ? (i(), be(ht, {
            key: a(s).fullName,
            repository: { fullName: a(s).fullName, description: a(s).description, stars: a(s).stars, language: a(s).language, updated: a(s).pushedAt },
            onClose: o[2] || (o[2] = (r) => O.value = !1),
            onOpenTask: k
          }, null, 8, ["repository"])) : T("", !0)
        ])
      ], 14, yt)
    ])) : T("", !0);
  }
}), ca = /* @__PURE__ */ ce(Kt, [["__scopeId", "data-v-11ceb783"]]);
export {
  ca as default
};
