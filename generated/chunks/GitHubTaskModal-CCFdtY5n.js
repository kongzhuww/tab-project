import { d as ye, w as le, D as we, z as _e, o as n, g as r, h as o, p as ne, t as c, i as x, u as h, F as K, j as pe, k as Te, C as xe, b as i, y as F, e as ke, s as se, n as me, q as fe, B as $e, l as Me } from "./vendor-vue-FFI3kJnP.js";
import { v as J, g as ee } from "./main-CQf_lm0f.js";
import { i as je, t as b, a as ge, T as he, e as Ve } from "./todoist.service-CDSsgWpW.js";
import { C as be, n as Pe } from "./view-styles-DNJvDC7i.js";
import { t as q, w as Se } from "./module-state-GmAjQSzX.js";
import { e as Ie } from "./calendar.service-DE6FKh8O.js";
import { u as Oe, f as Re, T as We, r as De, a as Ue } from "./TaskRepositoryLinks-DQIo0aFX.js";
import { a0 as _ } from "./search.service-B_r1P6oe.js";
import { openTodoistTask as Ae } from "./task-navigation-C1h9ClKd.js";
import { T as He } from "./TodoistDatePickerPopover-DjMS5BKL.js";
import { R as qe } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DRvNM_7u.js";
import { _ as Ce } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const Be = ["aria-busy"], Ge = { class: "linked-tasks-heading" }, Ye = { key: 0 }, Xe = ["disabled"], ze = {
  key: 0,
  class: "linked-tasks-message",
  role: "status"
}, Fe = {
  key: 1,
  class: "linked-tasks-message",
  role: "status"
}, Je = {
  key: 2,
  class: "linked-tasks-message",
  role: "alert"
}, Ke = {
  key: 3,
  class: "linked-tasks-empty"
}, Qe = {
  key: 4,
  class: "linked-tasks-list",
  tabindex: "0",
  "aria-label": "关联任务列表，可滚动"
}, Ze = {
  key: 0,
  class: "linked-task-card"
}, et = ["disabled", "aria-label", "title", "onClick"], tt = ["disabled", "aria-label", "onClick"], at = {
  key: 0,
  class: "linked-task-description"
}, ot = {
  key: 1,
  class: "linked-task-meta"
}, st = ["title"], lt = {
  key: 1,
  class: "linked-task-unavailable",
  role: "status"
}, nt = /* @__PURE__ */ ye({
  __name: "GitHubRepositoryLinkedTasks",
  props: {
    repositoryName: {},
    disabled: { type: Boolean }
  },
  emits: ["openTask"],
  setup(Q, { emit: S }) {
    const f = Q, B = S, $ = i([]), V = i(!1), I = i(""), U = i(""), C = i(""), E = i(""), M = F(() => $.value.filter((t) => !t.task || !je(t.task))), u = new qe();
    let v = !1, O = !0, A = !1;
    const j = i(!document.hidden), T = () => v && O && j.value;
    Oe(() => j.value && !f.disabled, () => u.cancel(), () => m());
    function m() {
      A || !T() || (A = !0, queueMicrotask(() => {
        A = !1, T() && !q.pendingWrites && P();
      }));
    }
    async function P() {
      if (!T() || q.pendingWrites) return;
      u.cancel(), I.value = "", U.value = "", $.value = [];
      let t;
      try {
        const N = Re(f.repositoryName);
        t = N.taskIds, N.unreadableCount && (U.value = "部分本机关联记录无法读取，列表可能不完整；未修改记录。");
      } catch {
        I.value = "本机关联记录读取失败，请稍后刷新；未修改记录。";
        return;
      }
      if (!t.length) return;
      $.value = t.map((N) => ({ id: N }));
      const p = f.repositoryName;
      let l = null;
      const d = u.begin({
        timeoutMs: 3e4,
        isCurrent: () => T() && f.repositoryName === p && (l === null || l === b.getToken()),
        onStop: (N) => {
          V.value = !1, N === "timeout" && (I.value = "关联任务读取超时，保留已读取结果，请手动刷新。");
        }
      });
      V.value = !0;
      try {
        if (l = await d.wait(() => b.initToken()), !d.current()) return;
        if (!l.trim()) {
          I.value = "请先配置 Todoist 账号，才能读取已关联的任务。";
          return;
        }
        let N = 0;
        const X = async () => {
          for (; d.current(); ) {
            const R = N++;
            if (R >= t.length) return;
            const k = t[R];
            try {
              const W = await d.wait(() => b.api("/tasks/" + encodeURIComponent(k), { signal: d.signal }));
              if (!d.current()) return;
              if (!W || typeof W != "object") throw new Error("Invalid task");
              const y = W;
              if (String(y.id) !== k || typeof y.content != "string" || y.is_deleted || y.checked === void 0 && y.is_completed === void 0 || y.checked !== void 0 && typeof y.checked != "boolean" || y.is_completed !== void 0 && typeof y.is_completed != "boolean") throw new Error("Invalid task");
              $.value[R] = { id: k, task: y };
            } catch (W) {
              if (!d.current()) return;
              $.value[R] = { id: k, error: ge(W) };
            }
          }
        };
        await Promise.allSettled(Array.from({ length: Math.min(3, t.length) }, X));
      } catch {
        d.current() && (I.value = "Todoist 配置或任务读取失败，请手动刷新。");
      } finally {
        d.finish() && (V.value = !1);
      }
    }
    async function te(t) {
      if (!t.task || f.disabled || C.value || q.pendingWrites || !T()) return;
      const p = t.id, l = f.repositoryName, d = t.task, N = b.getToken();
      C.value = p, E.value = "", u.cancel();
      let X = !1, R = !1;
      try {
        await Se(async () => {
          const k = await b.initToken();
          if (!k || k !== N || !T() || f.repositoryName !== l || f.disabled) throw new Error("Not submitted");
          if (X = !0, await b.toggleTaskCompletion(p, !0), R = !0, b.invalidateWorkspaceSnapshots(), !v || k !== b.getToken()) return;
          t.task = { ...d, checked: !0, is_completed: !0 };
          const { todoistCalendarSidebarController: W } = await import("./calendar.service-DE6FKh8O.js").then((y) => y.o);
          !v || k !== b.getToken() || W.recordTaskCompletion({
            id: p,
            content: d.content,
            description: d.description,
            completed: !0,
            dueDate: d.due?.date,
            _taskRaw: d
          }, !0);
        }), q.active && Ie.loadWorkspace(void 0, void 0, !0);
      } catch (k) {
        k instanceof he && !k.submitted && (X = !1), v && f.repositoryName === l && (E.value = R ? "任务已完成，但本地显示更新失败，请刷新核对。" : X ? "完成结果未确认，请刷新核对；未自动重试。" : k instanceof he ? ge(k) + " 尚未提交完成操作。" : "页面或账号状态已变化，尚未提交完成操作。");
      } finally {
        C.value = "", m();
      }
    }
    function L(t) {
      t instanceof StorageEvent && t.key !== null && !t.key.startsWith("todoist_repository_links_v1:") || m();
    }
    function H() {
      j.value = !document.hidden, T() ? m() : u.cancel();
    }
    function g() {
      O = !1, u.cancel();
    }
    function G() {
      O = !0, H();
    }
    function Y(t, p) {
      p !== "local" || !Object.prototype.hasOwnProperty.call(t, Ve) || (u.cancel(), $.value = [], I.value = "", m());
    }
    return le(() => f.repositoryName, () => {
      u.cancel(), $.value = [], m();
    }), le(() => q.pendingWrites, (t, p) => {
      t ? u.cancel() : p && m();
    }), we(() => {
      v = !0, window.addEventListener("storage", L), window.addEventListener("todoist-repository-links-changed", L), document.addEventListener("visibilitychange", H), window.addEventListener("pagehide", g), window.addEventListener("pageshow", G), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(Y), m();
    }), _e(() => {
      v = !1, u.cancel(), window.removeEventListener("storage", L), window.removeEventListener("todoist-repository-links-changed", L), document.removeEventListener("visibilitychange", H), window.removeEventListener("pagehide", g), window.removeEventListener("pageshow", G), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(Y);
    }), (t, p) => (n(), r("section", {
      class: "repository-linked-tasks",
      "aria-label": "当前仓库关联的 Todoist 任务",
      "aria-busy": V.value
    }, [
      o("div", Ge, [
        o("h3", null, [
          p[0] || (p[0] = ne("关联任务 ", -1)),
          M.value.length ? (n(), r("small", Ye, c(M.value.length), 1)) : x("", !0)
        ]),
        o("button", {
          type: "button",
          class: "linked-tasks-refresh",
          disabled: V.value || Q.disabled || !!h(q).pendingWrites,
          onClick: P
        }, c(V.value ? "读取中…" : "刷新"), 9, Xe)
      ]),
      I.value ? (n(), r("p", ze, c(I.value), 1)) : x("", !0),
      U.value ? (n(), r("p", Fe, c(U.value), 1)) : x("", !0),
      E.value ? (n(), r("p", Je, c(E.value), 1)) : x("", !0),
      !M.value.length && !I.value ? (n(), r("p", Ke, "暂无未完成的关联任务")) : x("", !0),
      M.value.length ? (n(), r("div", Qe, [
        (n(!0), r(K, null, pe(M.value, (l) => (n(), r(K, {
          key: l.id
        }, [
          l.task ? (n(), r("article", Ze, [
            o("button", {
              type: "button",
              class: xe(["linked-task-check", { pending: C.value === l.id }]),
              disabled: Q.disabled || !!C.value || !!h(q).pendingWrites,
              "aria-label": "完成任务：" + l.task.content,
              title: C.value === l.id ? "正在提交完成…" : "完成任务",
              onClick: Te((d) => te(l), ["stop"])
            }, c(C.value === l.id ? "…" : ""), 11, et),
            o("button", {
              type: "button",
              class: "linked-task-body",
              disabled: Q.disabled || !!C.value,
              "aria-label": "在插件中打开任务：" + l.task.content,
              onClick: (d) => B("openTask", l.id)
            }, [
              o("strong", null, c(l.task.content || "未命名任务"), 1),
              l.task.description ? (n(), r("span", at, c(l.task.description), 1)) : x("", !0),
              l.task.due?.date || l.task.labels?.length ? (n(), r("span", ot, [
                l.task.due?.date ? (n(), r("span", {
                  key: 0,
                  title: l.task.due.date
                }, "▦ " + c(l.task.due.date), 9, st)) : x("", !0),
                (n(!0), r(K, null, pe((l.task.labels || []).slice(0, 3), (d) => (n(), r("span", { key: d }, "◇ " + c(d), 1))), 128))
              ])) : x("", !0)
            ], 8, tt)
          ])) : (n(), r("p", lt, c(l.error || (V.value ? "正在读取关联任务…" : "任务尚未读取，请刷新核对。")), 1))
        ], 64))), 128))
      ])) : x("", !0)
    ], 8, Be));
  }
}), it = /* @__PURE__ */ Ce(nt, [["__scopeId", "data-v-6193401f"]]), rt = {
  key: 0,
  class: "gh-task-modal-overlay"
}, ut = { class: "gh-task-header-actions" }, dt = ["disabled"], ct = { class: "gh-task-body" }, vt = { class: "repository-reference" }, pt = { class: "task-destination-selector" }, kt = { class: "selector-field" }, mt = { class: "selector-field" }, ft = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, gt = {
  key: 1,
  class: "task-receipt"
}, ht = ["disabled"], bt = ["disabled"], yt = { key: 0 }, wt = ["disabled"], _t = ["disabled"], Tt = /* @__PURE__ */ ye({
  __name: "GitHubTaskModal",
  setup(Q) {
    const S = F(() => J.repository), f = i(null), B = i(null);
    let $ = !1, V = 0, I = 0, U = 0, C = 0;
    const E = i([]), M = i([]), u = i(""), v = i(""), O = i(!1), A = i(!1), j = i(""), T = i(""), m = i(""), P = i(""), te = i(null), L = i(!1), H = i(!0), g = i(""), G = i(!1), Y = i(!1), t = i(null), p = F(() => "github_task_attempt_v1:" + (S.value?.fullName.toLowerCase() || "")), l = F(() => E.value.find((a) => String(a.id) === u.value)?.name || "未命名项目"), d = F(() => v.value && M.value.find((a) => String(a.id) === v.value)?.name || ""), N = F(() => E.value.map((a) => ({
      value: String(a.id),
      label: a.name,
      icon: "📁"
    }))), X = F(() => {
      const a = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return M.value.forEach((e) => {
        a.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), a;
    });
    async function R() {
      O.value = !0;
      try {
        const a = await b.getProjects();
        E.value = (a || []).filter((s) => !s.is_deleted && !s.is_archived);
        const e = localStorage.getItem("github_task_last_project_id");
        if (e && E.value.some((s) => String(s.id) === e))
          u.value = e;
        else if (E.value.length > 0) {
          const s = E.value.find((w) => w.inbox_project || w.is_inbox_project || /^(Inbox|收件箱)$/i.test(w.name));
          u.value = String(s ? s.id : E.value[0].id);
        }
        u.value && await k(u.value);
      } catch (a) {
        g.value = "加载 Todoist 项目失败: " + (a?.message || "请检查登录状态");
      } finally {
        O.value = !1;
      }
    }
    async function k(a) {
      A.value = !0;
      try {
        const e = await b.getSections(a);
        M.value = (e || []).filter((w) => !!(w && w.id && w.name));
        const s = localStorage.getItem("github_task_last_section_id");
        s && M.value.some((w) => String(w.id) === s) ? v.value = s : v.value = "";
      } catch {
        M.value = [], v.value = "";
      } finally {
        A.value = !1;
      }
    }
    async function W(a) {
      u.value = String(a), localStorage.setItem("github_task_last_project_id", u.value), v.value = "", localStorage.removeItem("github_task_last_section_id"), await k(u.value);
    }
    function y(a) {
      v.value = String(a), v.value ? localStorage.setItem("github_task_last_section_id", v.value) : localStorage.removeItem("github_task_last_section_id");
    }
    function ie() {
      if (p.value)
        try {
          const a = localStorage.getItem(p.value);
          if (!a) return;
          const e = JSON.parse(a);
          if (!e || typeof e.requestId != "string" || typeof e.content != "string" || !e.target || typeof e.target.title != "string" || e.repository?.fullName !== S.value?.fullName || e.taskId !== void 0 && typeof e.taskId != "string") throw new Error();
          t.value = e, e.taskId && S.value && (Y.value = De(e.taskId).some((s) => s.fullName.toLowerCase() === S.value.fullName.toLowerCase()));
        } catch {
          G.value = !0, g.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
        }
    }
    le(() => [J.isOpen, J.repository], ([a, e]) => {
      if (a && e) {
        const s = e;
        j.value = "", T.value = `GitHub 仓库: https://github.com/${s.fullName}
${s.description || ""}`.trim(), m.value = "", P.value = "", g.value = "", t.value = null, ie(), R();
      }
    }, { immediate: !0 });
    function Ee(a) {
      if (a.target.closest("button, a, input, select, textarea")) return;
      $ = !0;
      const e = f.value;
      if (!e) return;
      const s = e.getBoundingClientRect();
      U = s.left, C = s.top, V = a.clientX, I = a.clientY, B.value = { x: U, y: C };
      const w = (z) => {
        if (!$) return;
        const ae = z.clientX - V, D = z.clientY - I;
        B.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, U + ae)),
          y: Math.max(10, Math.min(window.innerHeight - 80, C + D))
        };
      }, Z = () => {
        $ = !1, window.removeEventListener("mousemove", w), window.removeEventListener("mouseup", Z);
      };
      window.addEventListener("mousemove", w), window.addEventListener("mouseup", Z);
    }
    function re(a) {
      if (a.key === "Escape" && J.isOpen) {
        if (L.value) {
          L.value = !1;
          return;
        }
        ee.close();
      }
    }
    function ue(a) {
      if (!(!J.isOpen || !f.value || L.value) && !f.value.contains(a.target)) {
        if (a.target?.closest(".fo-cover-context-menu, .todoist-date-picker-popover")) return;
        ee.close();
      }
    }
    async function Le() {
      if (_.saving || t.value || G.value || !j.value.trim() || !u.value || !H.value || !S.value) return;
      const a = u.value, e = v.value || void 0, s = { ...S.value }, w = l.value + (d.value ? " / " + d.value : ""), Z = {
        content: j.value.trim(),
        description: T.value.trim(),
        project_id: a,
        section_id: e,
        due_string: m.value ? m.value + (P.value ? " " + P.value : "") : void 0
      };
      _.saving = !0, g.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(p.value, { ifAvailable: !0 }, async (z) => {
          if (!z) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          ie(), !(t.value || G.value) && await Se(async () => {
            const ae = await b.initToken();
            if (document.hidden || !ae || ae !== b.getToken())
              throw new Error("Todoist 未登录或 Token 已变更，请检查账号设置。");
            const D = {
              requestId: crypto.randomUUID(),
              repository: s,
              target: { projectId: a, sectionId: e || "", title: w },
              content: Z.content
            };
            localStorage.setItem(p.value, JSON.stringify(D)), t.value = D;
            try {
              const oe = await b.createTask(Z, D.requestId);
              if (!oe || typeof oe.id != "string") throw new Error("创建任务返回数据异常");
              D.taskId = oe.id, t.value = { ...D };
              try {
                localStorage.setItem(p.value, JSON.stringify(D));
              } catch {
                g.value = "任务已创建，但本机回执保存失败；不要重复创建。";
              }
              b.invalidateWorkspaceSnapshots(), de(), Pe.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: D.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: oe.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), q.active && Ie.loadWorkspace(void 0, void 0, !0);
            } catch {
              g.value = t.value?.taskId ? "任务已创建，但后续界面更新未完成；不要重复创建。" : "创建结果未确认，请核对 Todoist。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (z) {
        g.value = z instanceof Error && !t.value ? z.message : "提交记录保存失败，尚未发送创建请求。";
      } finally {
        _.saving = !1;
      }
    }
    function de() {
      const a = t.value;
      if (a?.taskId)
        try {
          Ue(a.taskId, a.repository), Y.value = !0;
        } catch {
          Y.value = !1, g.value = "任务已创建，但关联仓库本地保存失败；可稍后在任务中手动添加。";
        }
    }
    function ce() {
      if (!(_.saving || !t.value))
        try {
          localStorage.removeItem(p.value), t.value = null, g.value = "", j.value = "", T.value = "";
        } catch {
          g.value = "确认记录移除失败，请检查浏览器存储；已保留记录。";
        }
    }
    function Ne() {
      ce();
    }
    function ve(a) {
      Ae(a), ee.close();
    }
    return we(() => {
      window.addEventListener("keydown", re), window.addEventListener("pointerdown", ue, !0);
    }), _e(() => {
      window.removeEventListener("keydown", re), window.removeEventListener("pointerdown", ue, !0);
    }), (a, e) => (n(), ke(Me, { to: "body" }, [
      h(J).isOpen && S.value ? (n(), r("div", rt, [
        o("aside", {
          ref_key: "windowRef",
          ref: f,
          class: "gh-task-window",
          style: $e(B.value ? { position: "fixed", left: `${B.value.x}px`, top: `${B.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "仓库关联任务与创建栏"
        }, [
          o("header", {
            class: "gh-task-header",
            onMousedown: Ee
          }, [
            e[11] || (e[11] = o("div", { class: "gh-task-header-title" }, [
              o("span", { class: "gh-task-badge" }, "🐙 仓库任务"),
              o("small", null, "关联当前 GitHub 仓库")
            ], -1)),
            o("div", ut, [
              o("button", {
                type: "button",
                class: "gh-task-close-btn",
                disabled: h(_).saving,
                title: "关闭 (Esc)",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...s) => h(ee).close && h(ee).close(...s))
              }, " ✕ ", 8, dt)
            ])
          ], 32),
          o("div", ct, [
            se(it, {
              "repository-name": S.value.fullName,
              disabled: h(_).saving,
              onOpenTask: ve
            }, null, 8, ["repository-name", "disabled"]),
            e[20] || (e[20] = o("h3", { class: "task-create-heading" }, "创建任务", -1)),
            o("div", vt, [
              e[12] || (e[12] = o("span", null, "◇", -1)),
              o("div", null, [
                o("strong", null, c(S.value.fullName), 1),
                o("small", null, c(S.value.description || "创建后自动关联此仓库"), 1)
              ])
            ]),
            o("div", pt, [
              o("div", kt, [
                e[13] || (e[13] = o("span", { class: "selector-title" }, "📁 目标项目", -1)),
                se(be, {
                  modelValue: u.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (s) => u.value = s),
                  options: N.value,
                  disabled: h(_).saving || O.value,
                  placeholder: O.value ? "正在加载项目…" : "选择项目",
                  onChange: W
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              o("div", mt, [
                e[14] || (e[14] = o("span", { class: "selector-title" }, "📑 目标分组 (板块)", -1)),
                se(be, {
                  modelValue: v.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (s) => v.value = s),
                  options: X.value,
                  disabled: h(_).saving || A.value,
                  placeholder: A.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: y
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            g.value ? (n(), r("p", ft, c(g.value), 1)) : x("", !0),
            t.value ? (n(), r("section", gt, [
              t.value.taskId ? (n(), r(K, { key: 0 }, [
                e[15] || (e[15] = o("strong", null, "任务已创建", -1)),
                o("p", null, c(t.value.content), 1),
                o("button", {
                  type: "button",
                  class: "task-open-link",
                  disabled: h(_).saving,
                  onClick: e[3] || (e[3] = (s) => ve(t.value.taskId))
                }, "在插件中打开任务 →", 8, ht),
                se(We, {
                  "task-id": t.value.taskId
                }, null, 8, ["task-id"]),
                Y.value ? (n(), r("button", {
                  key: 1,
                  type: "button",
                  onClick: Ne
                }, "继续创建")) : (n(), r("button", {
                  key: 0,
                  type: "button",
                  disabled: h(_).saving,
                  onClick: de
                }, "仅重试仓库关联", 8, bt))
              ], 64)) : (n(), r(K, { key: 1 }, [
                o("strong", null, c(h(_).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
                o("p", null, c(t.value.content), 1),
                h(_).saving ? (n(), r("small", yt, "正在提交至“" + c(t.value.target.title) + "”，请稍候。", 1)) : (n(), r(K, { key: 1 }, [
                  o("small", null, "请先在 Todoist 核对“" + c(t.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
                  o("button", {
                    type: "button",
                    onClick: ce
                  }, "我已核对，允许新建")
                ], 64))
              ], 64))
            ])) : (n(), r("form", {
              key: 2,
              onSubmit: Te(Le, ["prevent"])
            }, [
              o("fieldset", {
                disabled: h(_).saving || G.value
              }, [
                o("label", null, [
                  e[16] || (e[16] = ne(" 任务名称 ", -1)),
                  me(o("textarea", {
                    "onUpdate:modelValue": e[4] || (e[4] = (s) => j.value = s),
                    rows: "2",
                    maxlength: "500",
                    placeholder: "要在这个仓库上做什么？",
                    required: ""
                  }, null, 512), [
                    [fe, j.value]
                  ])
                ]),
                o("label", null, [
                  e[17] || (e[17] = ne(" 描述 ", -1)),
                  me(o("textarea", {
                    "onUpdate:modelValue": e[5] || (e[5] = (s) => T.value = s),
                    rows: "3",
                    maxlength: "16000",
                    placeholder: "记录目标、步骤或想法（可选）"
                  }, null, 512), [
                    [fe, T.value]
                  ])
                ]),
                e[18] || (e[18] = o("label", null, "截止日期", -1)),
                o("button", {
                  ref_key: "dateAnchor",
                  ref: te,
                  type: "button",
                  class: "task-date-button",
                  onClick: e[6] || (e[6] = (s) => L.value = !L.value)
                }, "▦ " + c(m.value ? m.value + (P.value ? " " + P.value : "") : "添加日期与时间"), 513),
                L.value ? (n(), ke(He, {
                  key: 0,
                  modelValue: m.value,
                  "onUpdate:modelValue": e[7] || (e[7] = (s) => m.value = s),
                  "time-value": P.value,
                  "onUpdate:timeValue": e[8] || (e[8] = (s) => P.value = s),
                  "anchor-el": te.value,
                  onTimeValidity: e[9] || (e[9] = (s) => H.value = s),
                  onClose: e[10] || (e[10] = (s) => {
                    L.value = !1, H.value = !0;
                  })
                }, null, 8, ["modelValue", "time-value", "anchor-el"])) : x("", !0),
                e[19] || (e[19] = o("p", { class: "task-local-note" }, "任务名称、描述和截止日期提交至 Todoist；关联仓库双向保存在本机。", -1)),
                o("button", {
                  type: "submit",
                  class: "create-task",
                  disabled: !j.value.trim() || !u.value || !H.value || O.value
                }, c(h(_).saving ? "正在创建…" : "创建任务"), 9, _t)
              ], 8, wt)
            ], 32))
          ])
        ], 4)
      ])) : x("", !0)
    ]));
  }
}), Ot = /* @__PURE__ */ Ce(Tt, [["__scopeId", "data-v-2419dd9c"]]);
export {
  Ot as default
};
