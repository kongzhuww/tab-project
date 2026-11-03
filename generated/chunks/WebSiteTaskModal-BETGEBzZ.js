import { d as se, w as ne, D as ie, z as re, o as p, e as R, u as U, g as S, h as a, t as m, i as P, s as q, k as ue, p as z, n as H, q as F, B as de, l as ce, y as B, b as s } from "./vendor-vue-FFI3kJnP.js";
import { a as g, w as x } from "./web-task-store-C6nGTuf6.js";
import { t as T } from "./todoist.service-CDSsgWpW.js";
import { C as G, n as ve } from "./view-styles-D7nGbd1d.js";
import { w as pe, t as me } from "./module-state-GmAjQSzX.js";
import { e as we } from "./calendar.service-DE6FKh8O.js";
import { T as fe } from "./TodoistDatePickerPopover-DjMS5BKL.js";
import { _ as be } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const ge = {
  key: 0,
  class: "web-task-modal-overlay"
}, ke = ["aria-label"], _e = { class: "web-task-header-title" }, ye = { class: "web-task-badge" }, he = { class: "web-task-header-actions" }, Se = ["disabled"], xe = { class: "web-task-body" }, Te = { class: "website-preview-card" }, Ee = ["src"], je = {
  key: 1,
  class: "website-preview-fallback"
}, Ve = { class: "website-preview-info" }, Ie = ["title"], Me = ["title"], Ce = {
  key: 0,
  class: "website-preview-note"
}, Pe = { class: "task-destination-selector" }, Le = { class: "selector-field" }, $e = { class: "selector-field" }, De = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, Ue = ["disabled"], Be = ["disabled"], Oe = /* @__PURE__ */ se({
  __name: "WebSiteTaskModal",
  setup(We) {
    const n = B(() => g.target), E = s(null), k = s(null);
    let L = !1, O = 0, W = 0, $ = 0, D = 0;
    const w = s([]), j = s([]), i = s(""), r = s(""), _ = s(!1), V = s(!1), f = s(""), I = s(""), d = s(""), c = s(""), N = s(null), v = s(!1), M = s(!0), u = s(!1), b = s(""), K = B(() => w.value.map((o) => ({
      value: String(o.id),
      label: o.name,
      icon: "📁"
    }))), J = B(() => {
      const o = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return j.value.forEach((e) => {
        o.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), o;
    });
    async function Q() {
      _.value = !0;
      try {
        const o = await T.getProjects();
        w.value = (o || []).filter((t) => !t.is_deleted && !t.is_archived);
        const e = localStorage.getItem("web_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (e && w.value.some((t) => String(t.id) === e))
          i.value = e;
        else if (w.value.length > 0) {
          const t = w.value.find((l) => l.inbox_project || l.is_inbox_project || /^(Inbox|收件箱)$/i.test(l.name));
          i.value = String(t ? t.id : w.value[0].id);
        }
        i.value && await X(i.value);
      } catch (o) {
        b.value = "加载 Todoist 项目失败: " + (o?.message || "请检查登录状态");
      } finally {
        _.value = !1;
      }
    }
    async function X(o) {
      V.value = !0;
      try {
        const e = await T.getSections(o);
        j.value = (e || []).filter((l) => !!(l && l.id && l.name));
        const t = localStorage.getItem("web_task_last_section_id");
        t && j.value.some((l) => String(l.id) === t) ? r.value = t : r.value = "";
      } catch {
        j.value = [], r.value = "";
      } finally {
        V.value = !1;
      }
    }
    async function Z(o) {
      i.value = String(o), localStorage.setItem("web_task_last_project_id", i.value), r.value = "", localStorage.removeItem("web_task_last_section_id"), await X(i.value);
    }
    function ee(o) {
      r.value = String(o), r.value ? localStorage.setItem("web_task_last_section_id", r.value) : localStorage.removeItem("web_task_last_section_id");
    }
    function te(o) {
      const e = o.target;
      e && (e.style.display = "none");
    }
    ne(() => [g.isOpen, g.target], ([o, e]) => {
      if (o && e) {
        const t = e;
        f.value = t.title ? `浏览: ${t.title}` : `访问: ${t.url}`;
        const l = [];
        t.url && l.push(`网址: ${t.url}`), t.note && l.push(`备注: ${t.note}`), t.category && l.push(`分类: ${t.category}`), I.value = l.join(`
`).trim(), d.value = "", c.value = "", b.value = "", Q();
      }
    }, { immediate: !0 });
    function oe(o) {
      if (o.target.closest("button, a, input, select, textarea")) return;
      L = !0;
      const e = E.value;
      if (!e) return;
      const t = e.getBoundingClientRect();
      $ = t.left, D = t.top, O = o.clientX, W = o.clientY, k.value = { x: $, y: D };
      const l = (C) => {
        if (!L) return;
        const h = C.clientX - O, le = C.clientY - W;
        k.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, $ + h)),
          y: Math.max(10, Math.min(window.innerHeight - 80, D + le))
        };
      }, y = () => {
        L = !1, window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", l), window.addEventListener("mouseup", y);
    }
    function Y(o) {
      if (o.key === "Escape" && g.isOpen) {
        if (v.value) {
          v.value = !1;
          return;
        }
        x.close();
      }
    }
    function A(o) {
      if (!(!g.isOpen || !E.value || v.value) && !E.value.contains(o.target)) {
        if (o.target?.closest(".folder-menu, .bookmark-note-menu, .todoist-date-picker-popover")) return;
        x.close();
      }
    }
    async function ae() {
      if (u.value || !f.value.trim() || !i.value || !M.value || !n.value) return;
      const o = i.value, e = r.value || void 0, t = f.value.trim(), l = I.value.trim();
      u.value = !0, b.value = "";
      try {
        await pe(async () => {
          if (!await T.initToken())
            throw new Error("Todoist 未登录，请先在设置中绑定或登录 Todoist。");
          const C = {
            content: t,
            description: l,
            project_id: o,
            section_id: e,
            due_string: d.value ? d.value + (c.value ? " " + c.value : "") : void 0
          }, h = await T.createTask(C);
          if (!h || typeof h.id != "string")
            throw new Error("创建任务返回数据异常");
          T.invalidateWorkspaceSnapshots(), ve.show({
            appName: "Todoist",
            appType: "todoist",
            title: "任务已创建",
            message: t,
            level: "success",
            history: !0,
            target: { type: "todoist-task", taskId: h.id },
            actionLabel: "打开任务",
            duration: 7e3
          }), me.active && we.loadWorkspace(void 0, void 0, !0), x.close();
        });
      } catch (y) {
        b.value = y?.message || "创建任务失败，请重试";
      } finally {
        u.value = !1;
      }
    }
    return ie(() => {
      window.addEventListener("keydown", Y), window.addEventListener("pointerdown", A, !0);
    }), re(() => {
      window.removeEventListener("keydown", Y), window.removeEventListener("pointerdown", A, !0);
    }), (o, e) => (p(), R(ce, { to: "body" }, [
      U(g).isOpen && n.value ? (p(), S("div", ge, [
        a("aside", {
          ref_key: "windowRef",
          ref: E,
          class: "web-task-window",
          style: de(k.value ? { position: "fixed", left: `${k.value.x}px`, top: `${k.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "网站创建任务 - " + n.value.title
        }, [
          a("header", {
            class: "web-task-header",
            onMousedown: oe
          }, [
            a("div", _e, [
              a("span", ye, m(n.value.source === "bookmark" ? "🔖 书签任务" : "🌐 网站任务"), 1),
              e[10] || (e[10] = a("small", null, "关联当前网页链接", -1))
            ]),
            a("div", he, [
              a("button", {
                type: "button",
                class: "web-task-close-btn",
                disabled: u.value,
                title: "关闭视窗 (Esc)",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...t) => U(x).close && U(x).close(...t))
              }, " ✕ ", 8, Se)
            ])
          ], 32),
          a("div", xe, [
            a("div", Te, [
              n.value.icon ? (p(), S("img", {
                key: 0,
                src: n.value.icon,
                alt: "",
                class: "website-preview-icon",
                onError: te
              }, null, 40, Ee)) : (p(), S("span", je, "🌐")),
              a("div", Ve, [
                a("strong", {
                  class: "website-preview-title",
                  title: n.value.title
                }, m(n.value.title || n.value.url), 9, Ie),
                a("small", {
                  class: "website-preview-url",
                  title: n.value.url
                }, m(n.value.url), 9, Me),
                n.value.note ? (p(), S("div", Ce, "备注: " + m(n.value.note), 1)) : P("", !0)
              ])
            ]),
            a("div", Pe, [
              a("div", Le, [
                e[11] || (e[11] = a("span", { class: "selector-title" }, "📁 目标项目", -1)),
                q(G, {
                  modelValue: i.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (t) => i.value = t),
                  options: K.value,
                  disabled: u.value || _.value,
                  placeholder: _.value ? "正在加载项目…" : "选择项目",
                  onChange: Z
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              a("div", $e, [
                e[12] || (e[12] = a("span", { class: "selector-title" }, "📑 目标分组 (板块)", -1)),
                q(G, {
                  modelValue: r.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (t) => r.value = t),
                  options: J.value,
                  disabled: u.value || V.value,
                  placeholder: V.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: ee
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            b.value ? (p(), S("p", De, m(b.value), 1)) : P("", !0),
            a("form", {
              onSubmit: ue(ae, ["prevent"])
            }, [
              a("fieldset", { disabled: u.value }, [
                a("label", null, [
                  e[13] || (e[13] = z(" 任务名称 ", -1)),
                  H(a("textarea", {
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => f.value = t),
                    rows: "2",
                    maxlength: "500",
                    placeholder: "关于这个网站需要做什么？",
                    required: ""
                  }, null, 512), [
                    [F, f.value]
                  ])
                ]),
                a("label", null, [
                  e[14] || (e[14] = z(" 描述 ", -1)),
                  H(a("textarea", {
                    "onUpdate:modelValue": e[4] || (e[4] = (t) => I.value = t),
                    rows: "3",
                    maxlength: "16000",
                    placeholder: "记录网页内容、目标或备注（可选）"
                  }, null, 512), [
                    [F, I.value]
                  ])
                ]),
                e[15] || (e[15] = a("label", null, "截止日期", -1)),
                a("button", {
                  ref_key: "dateAnchor",
                  ref: N,
                  type: "button",
                  class: "task-date-button",
                  onClick: e[5] || (e[5] = (t) => v.value = !v.value)
                }, " ▦ " + m(d.value ? d.value + (c.value ? " " + c.value : "") : "添加日期与时间"), 513),
                v.value ? (p(), R(fe, {
                  key: 0,
                  modelValue: d.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => d.value = t),
                  "time-value": c.value,
                  "onUpdate:timeValue": e[7] || (e[7] = (t) => c.value = t),
                  "anchor-el": N.value,
                  onTimeValidity: e[8] || (e[8] = (t) => M.value = t),
                  onClose: e[9] || (e[9] = (t) => {
                    v.value = !1, M.value = !0;
                  })
                }, null, 8, ["modelValue", "time-value", "anchor-el"])) : P("", !0),
                e[16] || (e[16] = a("p", { class: "task-local-note" }, " 任务提交至 Todoist，网站链接与标题将写入任务描述，便于在看板和详情中直接点击访问。 ", -1)),
                a("button", {
                  type: "submit",
                  class: "create-task",
                  disabled: !f.value.trim() || !i.value || !M.value || _.value || u.value
                }, m(u.value ? "正在创建…" : "创建任务"), 9, Be)
              ], 8, Ue)
            ], 32)
          ])
        ], 12, ke)
      ])) : P("", !0)
    ]));
  }
}), Fe = /* @__PURE__ */ be(Oe, [["__scopeId", "data-v-71bb8745"]]);
export {
  Fe as default
};
