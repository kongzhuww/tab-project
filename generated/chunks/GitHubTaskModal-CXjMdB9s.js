import { d as be, w as we, B as he, x as _e, o as v, j as le, u as c, e as m, i as o, t as p, p as q, f as G, F as W, h as Se, m as se, l as ne, n as ie, z as Ie, T as Te, s as I, b as s } from "./vendor-vue-9b0eS4bW.js";
import { v as T, g as V } from "./main-yP8Eg8Bk.js";
import { t as x } from "./todoist.service-By6xSyz1.js";
import { C as re, n as xe } from "./view-styles-Dr_syfb0.js";
import { w as Ce, t as je } from "./module-state-D4Dr89rP.js";
import { e as Ee } from "./calendar.service-DnkbEAru.js";
import { T as Me, r as Ne, a as Ve } from "./TaskRepositoryLinks-BvQdSM6r.js";
import { a1 as r } from "./search.service-wriY3nvN.js";
import { openTodoistTask as Le } from "./task-navigation-CvM3gAxl.js";
import { T as Pe } from "./TodoistDatePickerPopover-D8yR_FLS.js";
import { t as Oe, _ as Ue } from "./_plugin-vue_export-helper-BxikU0LD.js";
const De = {
  key: 0,
  class: "gh-task-modal-overlay"
}, $e = { class: "gh-task-header-actions" }, Be = ["disabled"], Re = { class: "gh-task-body" }, Ae = { class: "repository-reference" }, He = { class: "task-destination-selector" }, qe = { class: "selector-field" }, Ge = { class: "selector-field" }, We = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, Xe = {
  key: 1,
  class: "task-receipt"
}, Ye = ["disabled"], Fe = ["disabled"], Je = { key: 0 }, ze = ["disabled"], Ke = ["disabled"], Qe = /* @__PURE__ */ be({
  __name: "GitHubTaskModal",
  setup(Ze) {
    const f = I(() => T.repository), L = s(null), C = s(null);
    let R = !1, X = 0, Y = 0, A = 0, H = 0;
    const k = s([]), j = s([]), i = s(""), u = s(""), E = s(!1), P = s(!1), y = s(""), M = s(""), b = s(""), w = s(""), F = s(null), h = s(!1), O = s(!0), d = s(""), U = s(!1), D = s(!1), l = s(null), S = I(() => "github_task_attempt_v1:" + (f.value?.fullName.toLowerCase() || ""));
    function J(t) {
      return !!(t.inbox_project || t.is_inbox_project || /^(Inbox|收件箱)$/i.test(t.name.trim()));
    }
    function z(t) {
      return J(t) ? Oe("todoist.inbox") || "收件箱" : t.name;
    }
    const ue = I(() => {
      const t = k.value.find((e) => String(e.id) === i.value);
      return t ? z(t) : "未命名项目";
    }), K = I(() => u.value && j.value.find((t) => String(t.id) === u.value)?.name || ""), de = I(() => k.value.map((t) => ({
      value: String(t.id),
      label: z(t),
      icon: J(t) ? "📥" : "📁"
    }))), ve = I(() => {
      const t = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return j.value.forEach((e) => {
        t.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), t;
    });
    async function ce() {
      E.value = !0;
      try {
        const t = await x.getProjects();
        k.value = (t || []).filter((a) => !a.is_deleted && !a.is_archived);
        const e = localStorage.getItem("github_task_last_project_id");
        if (e && k.value.some((a) => String(a.id) === e))
          i.value = e;
        else if (k.value.length > 0) {
          const a = k.value.find((n) => n.inbox_project || n.is_inbox_project || /^(Inbox|收件箱)$/i.test(n.name));
          i.value = String(a ? a.id : k.value[0].id);
        }
        i.value && await Q(i.value);
      } catch (t) {
        d.value = "加载 Todoist 项目失败: " + (t?.message || "请检查登录状态");
      } finally {
        E.value = !1;
      }
    }
    async function Q(t) {
      P.value = !0;
      try {
        const e = await x.getSections(t);
        j.value = (e || []).filter((n) => !!(n && n.id && n.name));
        const a = localStorage.getItem("github_task_last_section_id");
        a && j.value.some((n) => String(n.id) === a) ? u.value = a : u.value = "";
      } catch {
        j.value = [], u.value = "";
      } finally {
        P.value = !1;
      }
    }
    async function me(t) {
      i.value = String(t), localStorage.setItem("github_task_last_project_id", i.value), u.value = "", localStorage.removeItem("github_task_last_section_id"), await Q(i.value);
    }
    function pe(t) {
      u.value = String(t), u.value ? localStorage.setItem("github_task_last_section_id", u.value) : localStorage.removeItem("github_task_last_section_id");
    }
    function Z() {
      if (S.value)
        try {
          const t = localStorage.getItem(S.value);
          if (!t) return;
          const e = JSON.parse(t);
          if (!e || typeof e.requestId != "string" || typeof e.content != "string" || !e.target || typeof e.target.title != "string" || e.repository?.fullName !== f.value?.fullName || e.taskId !== void 0 && typeof e.taskId != "string") throw new Error();
          l.value = e, e.taskId && f.value && (D.value = Ne(e.taskId).some((a) => a.fullName.toLowerCase() === f.value.fullName.toLowerCase()));
        } catch {
          U.value = !0, d.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
        }
    }
    we(() => [T.isOpen, T.repository], ([t, e]) => {
      if (t && e) {
        const a = e;
        y.value = "", M.value = `GitHub 仓库: https://github.com/${a.fullName}
${a.description || ""}`.trim(), b.value = "", w.value = "", d.value = "", l.value = null, Z(), ce();
      }
    }, { immediate: !0 });
    function fe(t) {
      if (t.target.closest("button, a, input, select, textarea")) return;
      R = !0;
      const e = L.value;
      if (!e) return;
      const a = e.getBoundingClientRect();
      A = a.left, H = a.top, X = t.clientX, Y = t.clientY, C.value = { x: A, y: H };
      const n = (_) => {
        if (!R) return;
        const $ = _.clientX - X, g = _.clientY - Y;
        C.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, A + $)),
          y: Math.max(10, Math.min(window.innerHeight - 80, H + g))
        };
      }, N = () => {
        R = !1, window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", N);
      };
      window.addEventListener("mousemove", n), window.addEventListener("mouseup", N);
    }
    function ee(t) {
      if (t.key === "Escape" && T.isOpen) {
        if (h.value) {
          h.value = !1;
          return;
        }
        V.close();
      }
    }
    function te(t) {
      if (!(!T.isOpen || !L.value || h.value) && !L.value.contains(t.target)) {
        if (t.target?.closest(".fo-cover-context-menu, .todoist-date-picker-popover")) return;
        V.close();
      }
    }
    async function ge() {
      if (r.saving || l.value || U.value || !y.value.trim() || !i.value || !O.value || !f.value) return;
      const t = i.value, e = u.value || void 0, a = { ...f.value }, n = ue.value + (K.value ? " / " + K.value : ""), N = {
        content: y.value.trim(),
        description: M.value.trim(),
        project_id: t,
        section_id: e,
        due_string: b.value ? b.value + (w.value ? " " + w.value : "") : void 0
      };
      r.saving = !0, d.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(S.value, { ifAvailable: !0 }, async (_) => {
          if (!_) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          Z(), !(l.value || U.value) && await Ce(async () => {
            const $ = await x.initToken();
            if (document.hidden || !$ || $ !== x.getToken())
              throw new Error("Todoist 未登录或 Token 已变更，请检查账号设置。");
            const g = {
              requestId: crypto.randomUUID(),
              repository: a,
              target: { projectId: t, sectionId: e || "", title: n },
              content: N.content
            };
            localStorage.setItem(S.value, JSON.stringify(g)), l.value = g;
            try {
              const B = await x.createTask(N, g.requestId);
              if (!B || typeof B.id != "string") throw new Error("创建任务返回数据异常");
              g.taskId = B.id, l.value = { ...g };
              try {
                localStorage.setItem(S.value, JSON.stringify(g));
              } catch {
                d.value = "任务已创建，但本机回执保存失败；不要重复创建。";
              }
              x.invalidateWorkspaceSnapshots(), ae(), xe.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: g.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: B.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), je.active && Ee.loadWorkspace(void 0, void 0, !0);
            } catch {
              d.value = l.value?.taskId ? "任务已创建，但后续界面更新未完成；不要重复创建。" : "创建结果未确认，请核对 Todoist。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (_) {
        d.value = _ instanceof Error && !l.value ? _.message : "提交记录保存失败，尚未发送创建请求。";
      } finally {
        r.saving = !1;
      }
    }
    function ae() {
      const t = l.value;
      if (t?.taskId)
        try {
          Ve(t.taskId, t.repository), D.value = !0;
        } catch {
          D.value = !1, d.value = "任务已创建，但关联仓库本地保存失败；可稍后在任务中手动添加。";
        }
    }
    function oe() {
      if (!(r.saving || !l.value))
        try {
          localStorage.removeItem(S.value), l.value = null, d.value = "", y.value = "", M.value = "";
        } catch {
          d.value = "确认记录移除失败，请检查浏览器存储；已保留记录。";
        }
    }
    function ke() {
      oe();
    }
    function ye(t) {
      Le(t), V.close();
    }
    return he(() => {
      window.addEventListener("keydown", ee), window.addEventListener("pointerdown", te, !0);
    }), _e(() => {
      window.removeEventListener("keydown", ee), window.removeEventListener("pointerdown", te, !0);
    }), (t, e) => (v(), le(Te, { to: "body" }, [
      c(T).isOpen && f.value ? (v(), m("div", De, [
        o("aside", {
          ref_key: "windowRef",
          ref: L,
          class: "gh-task-window",
          style: Ie(C.value ? { position: "fixed", left: `${C.value.x}px`, top: `${C.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "仓库关联任务与创建栏"
        }, [
          o("header", {
            class: "gh-task-header",
            onMousedown: fe
          }, [
            e[11] || (e[11] = o("div", { class: "gh-task-header-title" }, [
              o("span", { class: "gh-task-badge" }, "🐙 仓库任务"),
              o("small", null, "关联当前 GitHub 仓库")
            ], -1)),
            o("div", $e, [
              o("button", {
                type: "button",
                class: "gh-task-close-btn",
                disabled: c(r).saving,
                title: "关闭 (Esc)",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...a) => c(V).close && c(V).close(...a))
              }, " ✕ ", 8, Be)
            ])
          ], 32),
          o("div", Re, [
            o("div", Ae, [
              e[12] || (e[12] = o("span", null, "◇", -1)),
              o("div", null, [
                o("strong", null, p(f.value.fullName), 1),
                o("small", null, p(f.value.description || "创建后自动关联此仓库"), 1)
              ])
            ]),
            o("div", He, [
              o("div", qe, [
                e[13] || (e[13] = o("span", { class: "selector-title" }, "📁 目标项目", -1)),
                q(re, {
                  modelValue: i.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (a) => i.value = a),
                  options: de.value,
                  disabled: c(r).saving || E.value,
                  placeholder: E.value ? "正在加载项目…" : "选择项目",
                  onChange: me
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              o("div", Ge, [
                e[14] || (e[14] = o("span", { class: "selector-title" }, "📑 目标分组 (板块)", -1)),
                q(re, {
                  modelValue: u.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (a) => u.value = a),
                  options: ve.value,
                  disabled: c(r).saving || P.value,
                  placeholder: P.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: pe
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            d.value ? (v(), m("p", We, p(d.value), 1)) : G("", !0),
            l.value ? (v(), m("section", Xe, [
              l.value.taskId ? (v(), m(W, { key: 0 }, [
                e[15] || (e[15] = o("strong", null, "任务已创建", -1)),
                o("p", null, p(l.value.content), 1),
                o("button", {
                  type: "button",
                  class: "task-open-link",
                  disabled: c(r).saving,
                  onClick: e[3] || (e[3] = (a) => ye(l.value.taskId))
                }, "在插件中打开任务 →", 8, Ye),
                q(Me, {
                  "task-id": l.value.taskId
                }, null, 8, ["task-id"]),
                D.value ? (v(), m("button", {
                  key: 1,
                  type: "button",
                  onClick: ke
                }, "继续创建")) : (v(), m("button", {
                  key: 0,
                  type: "button",
                  disabled: c(r).saving,
                  onClick: ae
                }, "仅重试仓库关联", 8, Fe))
              ], 64)) : (v(), m(W, { key: 1 }, [
                o("strong", null, p(c(r).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
                o("p", null, p(l.value.content), 1),
                c(r).saving ? (v(), m("small", Je, "正在提交至“" + p(l.value.target.title) + "”，请稍候。", 1)) : (v(), m(W, { key: 1 }, [
                  o("small", null, "请先在 Todoist 核对“" + p(l.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
                  o("button", {
                    type: "button",
                    onClick: oe
                  }, "我已核对，允许新建")
                ], 64))
              ], 64))
            ])) : (v(), m("form", {
              key: 2,
              onSubmit: Se(ge, ["prevent"])
            }, [
              o("fieldset", {
                disabled: c(r).saving || U.value
              }, [
                o("label", null, [
                  e[16] || (e[16] = se(" 任务名称 ", -1)),
                  ne(o("textarea", {
                    "onUpdate:modelValue": e[4] || (e[4] = (a) => y.value = a),
                    rows: "2",
                    maxlength: "500",
                    placeholder: "要在这个仓库上做什么？",
                    required: ""
                  }, null, 512), [
                    [ie, y.value]
                  ])
                ]),
                o("label", null, [
                  e[17] || (e[17] = se(" 描述 ", -1)),
                  ne(o("textarea", {
                    "onUpdate:modelValue": e[5] || (e[5] = (a) => M.value = a),
                    rows: "3",
                    maxlength: "16000",
                    placeholder: "记录目标、步骤或想法（可选）"
                  }, null, 512), [
                    [ie, M.value]
                  ])
                ]),
                e[18] || (e[18] = o("label", null, "截止日期", -1)),
                o("button", {
                  ref_key: "dateAnchor",
                  ref: F,
                  type: "button",
                  class: "task-date-button",
                  onClick: e[6] || (e[6] = (a) => h.value = !h.value)
                }, "▦ " + p(b.value ? b.value + (w.value ? " " + w.value : "") : "添加日期与时间"), 513),
                h.value ? (v(), le(Pe, {
                  key: 0,
                  modelValue: b.value,
                  "onUpdate:modelValue": e[7] || (e[7] = (a) => b.value = a),
                  "time-value": w.value,
                  "onUpdate:timeValue": e[8] || (e[8] = (a) => w.value = a),
                  "anchor-el": F.value,
                  onTimeValidity: e[9] || (e[9] = (a) => O.value = a),
                  onClose: e[10] || (e[10] = (a) => {
                    h.value = !1, O.value = !0;
                  })
                }, null, 8, ["modelValue", "time-value", "anchor-el"])) : G("", !0),
                e[19] || (e[19] = o("p", { class: "task-local-note" }, "任务名称、描述和截止日期提交至 Todoist；关联仓库双向保存在本机。", -1)),
                o("button", {
                  type: "submit",
                  class: "create-task",
                  disabled: !y.value.trim() || !i.value || !O.value || E.value
                }, p(c(r).saving ? "正在创建…" : "创建任务"), 9, Ke)
              ], 8, ze)
            ], 32))
          ])
        ], 4)
      ])) : G("", !0)
    ]));
  }
}), vt = /* @__PURE__ */ Ue(Qe, [["__scopeId", "data-v-417f3202"]]);
export {
  vt as default
};
