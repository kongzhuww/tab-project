import { d as ie, w as re, B as ue, x as de, o as m, j as H, u as U, e as S, i as a, t as p, f as P, p as q, h as ce, m as F, l as G, n as K, z as ve, T as me, s as O, b as s } from "./vendor-vue-BkY5-p5y.js";
import { a as _, w as x } from "./web-task-store-BUMCcQnh.js";
import { t as j } from "./todoist.service-ygsqjft3.js";
import { C as J, n as pe } from "./view-styles-yuz8wQEV.js";
import { w as fe, t as we } from "./system-theme-V_tLotZp.js";
import { e as be } from "./calendar.service-Bb5cNvY8.js";
import { T as ge } from "./TodoistDatePickerPopover-CEGXC0XF.js";
import { a as _e } from "./web-site-links-BSIympLj.js";
import { t as ke, _ as ye } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const he = {
  key: 0,
  class: "web-task-modal-overlay"
}, Se = ["aria-label"], xe = { class: "web-task-header-title" }, je = { class: "web-task-badge" }, Te = { class: "web-task-header-actions" }, Ee = ["disabled"], Ie = { class: "web-task-body" }, Ve = { class: "website-preview-card" }, Me = ["src"], Ce = {
  key: 1,
  class: "website-preview-fallback"
}, Pe = { class: "website-preview-info" }, $e = ["title"], Le = ["title"], De = {
  key: 0,
  class: "website-preview-note"
}, Be = { class: "task-destination-selector" }, Ue = { class: "selector-field" }, Oe = { class: "selector-field" }, We = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, Ne = ["disabled"], Xe = ["disabled"], Ye = /* @__PURE__ */ ie({
  __name: "WebSiteTaskModal",
  setup(Ae) {
    const n = O(() => _.target), T = s(null), k = s(null);
    let $ = !1, W = 0, N = 0, L = 0, D = 0;
    const f = s([]), E = s([]), i = s(""), r = s(""), y = s(!1), I = s(!1), w = s(""), V = s(""), d = s(""), c = s(""), X = s(null), v = s(!1), M = s(!0), u = s(!1), b = s("");
    function Y(t) {
      return !!(t.inbox_project || t.is_inbox_project || /^(Inbox|收件箱)$/i.test(t.name.trim()));
    }
    function Q(t) {
      return Y(t) ? ke("todoist.inbox") || "收件箱" : t.name;
    }
    const Z = O(() => f.value.map((t) => ({
      value: String(t.id),
      label: Q(t),
      icon: Y(t) ? "📥" : "📁"
    }))), ee = O(() => {
      const t = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return E.value.forEach((e) => {
        t.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), t;
    });
    async function te() {
      y.value = !0;
      try {
        const t = await j.getProjects();
        f.value = (t || []).filter((o) => !o.is_deleted && !o.is_archived);
        const e = localStorage.getItem("web_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (e && f.value.some((o) => String(o.id) === e))
          i.value = e;
        else if (f.value.length > 0) {
          const o = f.value.find((l) => l.inbox_project || l.is_inbox_project || /^(Inbox|收件箱)$/i.test(l.name));
          i.value = String(o ? o.id : f.value[0].id);
        }
        i.value && await A(i.value);
      } catch (t) {
        b.value = "加载 Todoist 项目失败: " + (t?.message || "请检查登录状态");
      } finally {
        y.value = !1;
      }
    }
    async function A(t) {
      I.value = !0;
      try {
        const e = await j.getSections(t);
        E.value = (e || []).filter((l) => !!(l && l.id && l.name));
        const o = localStorage.getItem("web_task_last_section_id");
        o && E.value.some((l) => String(l.id) === o) ? r.value = o : r.value = "";
      } catch {
        E.value = [], r.value = "";
      } finally {
        I.value = !1;
      }
    }
    async function oe(t) {
      i.value = String(t), localStorage.setItem("web_task_last_project_id", i.value), r.value = "", localStorage.removeItem("web_task_last_section_id"), await A(i.value);
    }
    function ae(t) {
      r.value = String(t), r.value ? localStorage.setItem("web_task_last_section_id", r.value) : localStorage.removeItem("web_task_last_section_id");
    }
    function le(t) {
      const e = t.target;
      e && (e.style.display = "none");
    }
    re(() => [_.isOpen, _.target], ([t, e]) => {
      if (t && e) {
        const o = e;
        w.value = o.title ? `浏览: ${o.title}` : `访问: ${o.url}`;
        const l = [];
        o.url && l.push(`网址: ${o.url}`), o.note && l.push(`备注: ${o.note}`), o.category && l.push(`分类: ${o.category}`), V.value = l.join(`
`).trim(), d.value = "", c.value = "", b.value = "", te();
      }
    }, { immediate: !0 });
    function se(t) {
      if (t.target.closest("button, a, input, select, textarea")) return;
      $ = !0;
      const e = T.value;
      if (!e) return;
      const o = e.getBoundingClientRect();
      L = o.left, D = o.top, W = t.clientX, N = t.clientY, k.value = { x: L, y: D };
      const l = (h) => {
        if (!$) return;
        const B = h.clientX - W, g = h.clientY - N;
        k.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, L + B)),
          y: Math.max(10, Math.min(window.innerHeight - 80, D + g))
        };
      }, C = () => {
        $ = !1, window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", C);
      };
      window.addEventListener("mousemove", l), window.addEventListener("mouseup", C);
    }
    function R(t) {
      if (t.key === "Escape" && _.isOpen) {
        if (v.value) {
          v.value = !1;
          return;
        }
        x.close();
      }
    }
    function z(t) {
      if (!(!_.isOpen || !T.value || v.value) && !T.value.contains(t.target)) {
        if (t.target?.closest(".folder-menu, .bookmark-note-menu, .todoist-date-picker-popover")) return;
        x.close();
      }
    }
    async function ne() {
      if (u.value || !w.value.trim() || !i.value || !M.value || !n.value) return;
      const t = { ...n.value }, e = i.value, o = r.value || void 0, l = w.value.trim(), C = V.value.trim();
      u.value = !0, b.value = "";
      try {
        await fe(async () => {
          if (!await j.initToken())
            throw new Error("Todoist 未登录，请先在设置中绑定或登录 Todoist。");
          const B = {
            content: l,
            description: C,
            project_id: e,
            section_id: o,
            due_string: d.value ? d.value + (c.value ? " " + c.value : "") : void 0
          }, g = await j.createTask(B);
          if (!g || typeof g.id != "string")
            throw new Error("创建任务返回数据异常");
          try {
            _e(g.id, {
              title: t.title || t.url,
              url: t.url,
              icon: t.icon,
              note: t.note,
              source: t.source
            });
          } catch {
          }
          j.invalidateWorkspaceSnapshots(), pe.show({
            appName: "Todoist",
            appType: "todoist",
            title: "任务已创建",
            message: l,
            level: "success",
            history: !0,
            target: { type: "todoist-task", taskId: g.id },
            actionLabel: "打开任务",
            duration: 7e3
          }), we.active && be.loadWorkspace(void 0, void 0, !0), x.close();
        });
      } catch (h) {
        b.value = h?.message || "创建任务失败，请重试";
      } finally {
        u.value = !1;
      }
    }
    return ue(() => {
      window.addEventListener("keydown", R), window.addEventListener("pointerdown", z, !0);
    }), de(() => {
      window.removeEventListener("keydown", R), window.removeEventListener("pointerdown", z, !0);
    }), (t, e) => (m(), H(me, { to: "body" }, [
      U(_).isOpen && n.value ? (m(), S("div", he, [
        a("aside", {
          ref_key: "windowRef",
          ref: T,
          class: "web-task-window",
          style: ve(k.value ? { position: "fixed", left: `${k.value.x}px`, top: `${k.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "网站创建任务 - " + n.value.title
        }, [
          a("header", {
            class: "web-task-header",
            onMousedown: se
          }, [
            a("div", xe, [
              a("span", je, p(n.value.source === "bookmark" ? "🔖 书签任务" : "🌐 网站任务"), 1),
              e[10] || (e[10] = a("small", null, "关联当前网页链接", -1))
            ]),
            a("div", Te, [
              a("button", {
                type: "button",
                class: "web-task-close-btn",
                disabled: u.value,
                title: "关闭视窗 (Esc)",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...o) => U(x).close && U(x).close(...o))
              }, " ✕ ", 8, Ee)
            ])
          ], 32),
          a("div", Ie, [
            a("div", Ve, [
              n.value.icon ? (m(), S("img", {
                key: 0,
                src: n.value.icon,
                alt: "",
                class: "website-preview-icon",
                onError: le
              }, null, 40, Me)) : (m(), S("span", Ce, "🌐")),
              a("div", Pe, [
                a("strong", {
                  class: "website-preview-title",
                  title: n.value.title
                }, p(n.value.title || n.value.url), 9, $e),
                a("small", {
                  class: "website-preview-url",
                  title: n.value.url
                }, p(n.value.url), 9, Le),
                n.value.note ? (m(), S("div", De, "备注: " + p(n.value.note), 1)) : P("", !0)
              ])
            ]),
            a("div", Be, [
              a("div", Ue, [
                e[11] || (e[11] = a("span", { class: "selector-title" }, "📁 目标项目", -1)),
                q(J, {
                  modelValue: i.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (o) => i.value = o),
                  options: Z.value,
                  disabled: u.value || y.value,
                  placeholder: y.value ? "正在加载项目…" : "选择项目",
                  onChange: oe
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              a("div", Oe, [
                e[12] || (e[12] = a("span", { class: "selector-title" }, "📑 目标分组 (板块)", -1)),
                q(J, {
                  modelValue: r.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (o) => r.value = o),
                  options: ee.value,
                  disabled: u.value || I.value,
                  placeholder: I.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: ae
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            b.value ? (m(), S("p", We, p(b.value), 1)) : P("", !0),
            a("form", {
              onSubmit: ce(ne, ["prevent"])
            }, [
              a("fieldset", { disabled: u.value }, [
                a("label", null, [
                  e[13] || (e[13] = F(" 任务名称 ", -1)),
                  G(a("textarea", {
                    "onUpdate:modelValue": e[3] || (e[3] = (o) => w.value = o),
                    rows: "2",
                    maxlength: "500",
                    placeholder: "关于这个网站需要做什么？",
                    required: ""
                  }, null, 512), [
                    [K, w.value]
                  ])
                ]),
                a("label", null, [
                  e[14] || (e[14] = F(" 描述 ", -1)),
                  G(a("textarea", {
                    "onUpdate:modelValue": e[4] || (e[4] = (o) => V.value = o),
                    rows: "3",
                    maxlength: "16000",
                    placeholder: "记录网页内容、目标或备注（可选）"
                  }, null, 512), [
                    [K, V.value]
                  ])
                ]),
                e[15] || (e[15] = a("label", null, "截止日期", -1)),
                a("button", {
                  ref_key: "dateAnchor",
                  ref: X,
                  type: "button",
                  class: "task-date-button",
                  onClick: e[5] || (e[5] = (o) => v.value = !v.value)
                }, " ▦ " + p(d.value ? d.value + (c.value ? " " + c.value : "") : "添加日期与时间"), 513),
                v.value ? (m(), H(ge, {
                  key: 0,
                  modelValue: d.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (o) => d.value = o),
                  "time-value": c.value,
                  "onUpdate:timeValue": e[7] || (e[7] = (o) => c.value = o),
                  "anchor-el": X.value,
                  onTimeValidity: e[8] || (e[8] = (o) => M.value = o),
                  onClose: e[9] || (e[9] = (o) => {
                    v.value = !1, M.value = !0;
                  })
                }, null, 8, ["modelValue", "time-value", "anchor-el"])) : P("", !0),
                e[16] || (e[16] = a("p", { class: "task-local-note" }, " 任务提交至 Todoist，网站链接与标题将写入任务描述，便于在看板和详情中直接点击访问。 ", -1)),
                a("button", {
                  type: "submit",
                  class: "create-task",
                  disabled: !w.value.trim() || !i.value || !M.value || y.value || u.value
                }, p(u.value ? "正在创建…" : "创建任务"), 9, Xe)
              ], 8, Ne)
            ], 32)
          ])
        ], 12, Se)
      ])) : P("", !0)
    ]));
  }
}), Ze = /* @__PURE__ */ ye(Ye, [["__scopeId", "data-v-2140814f"]]);
export {
  Ze as default
};
