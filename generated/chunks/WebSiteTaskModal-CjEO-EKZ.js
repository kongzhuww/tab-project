import { d as se, w as ne, D as ie, z as re, o as p, e as q, u as B, g as S, h as a, t as m, i as P, s as z, k as ue, p as H, n as F, q as G, B as de, l as ce, y as O, b as s } from "./vendor-vue-FFI3kJnP.js";
import { a as k, w as x } from "./web-task-store-C6nGTuf6.js";
import { t as T } from "./todoist.service-CDSsgWpW.js";
import { C as K, n as ve } from "./view-styles-DNJvDC7i.js";
import { w as pe, t as me } from "./module-state-GmAjQSzX.js";
import { e as we } from "./calendar.service-DE6FKh8O.js";
import { T as fe } from "./TodoistDatePickerPopover-DjMS5BKL.js";
import { a as be } from "./web-site-links-BSIympLj.js";
import { _ as ge } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const ke = {
  key: 0,
  class: "web-task-modal-overlay"
}, _e = ["aria-label"], ye = { class: "web-task-header-title" }, he = { class: "web-task-badge" }, Se = { class: "web-task-header-actions" }, xe = ["disabled"], Te = { class: "web-task-body" }, Ee = { class: "website-preview-card" }, je = ["src"], Ve = {
  key: 1,
  class: "website-preview-fallback"
}, Ie = { class: "website-preview-info" }, Me = ["title"], Ce = ["title"], Pe = {
  key: 0,
  class: "website-preview-note"
}, Le = { class: "task-destination-selector" }, $e = { class: "selector-field" }, De = { class: "selector-field" }, Ue = {
  key: 0,
  class: "task-feedback",
  role: "alert"
}, Be = ["disabled"], Oe = ["disabled"], We = /* @__PURE__ */ se({
  __name: "WebSiteTaskModal",
  setup(Ne) {
    const n = O(() => k.target), E = s(null), _ = s(null);
    let L = !1, W = 0, N = 0, $ = 0, D = 0;
    const w = s([]), j = s([]), i = s(""), r = s(""), y = s(!1), V = s(!1), f = s(""), I = s(""), d = s(""), c = s(""), X = s(null), v = s(!1), M = s(!0), u = s(!1), b = s(""), J = O(() => w.value.map((o) => ({
      value: String(o.id),
      label: o.name,
      icon: "📁"
    }))), Q = O(() => {
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
    async function Z() {
      y.value = !0;
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
        i.value && await Y(i.value);
      } catch (o) {
        b.value = "加载 Todoist 项目失败: " + (o?.message || "请检查登录状态");
      } finally {
        y.value = !1;
      }
    }
    async function Y(o) {
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
    async function ee(o) {
      i.value = String(o), localStorage.setItem("web_task_last_project_id", i.value), r.value = "", localStorage.removeItem("web_task_last_section_id"), await Y(i.value);
    }
    function te(o) {
      r.value = String(o), r.value ? localStorage.setItem("web_task_last_section_id", r.value) : localStorage.removeItem("web_task_last_section_id");
    }
    function oe(o) {
      const e = o.target;
      e && (e.style.display = "none");
    }
    ne(() => [k.isOpen, k.target], ([o, e]) => {
      if (o && e) {
        const t = e;
        f.value = t.title ? `浏览: ${t.title}` : `访问: ${t.url}`;
        const l = [];
        t.url && l.push(`网址: ${t.url}`), t.note && l.push(`备注: ${t.note}`), t.category && l.push(`分类: ${t.category}`), I.value = l.join(`
`).trim(), d.value = "", c.value = "", b.value = "", Z();
      }
    }, { immediate: !0 });
    function ae(o) {
      if (o.target.closest("button, a, input, select, textarea")) return;
      L = !0;
      const e = E.value;
      if (!e) return;
      const t = e.getBoundingClientRect();
      $ = t.left, D = t.top, W = o.clientX, N = o.clientY, _.value = { x: $, y: D };
      const l = (h) => {
        if (!L) return;
        const U = h.clientX - W, g = h.clientY - N;
        _.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, $ + U)),
          y: Math.max(10, Math.min(window.innerHeight - 80, D + g))
        };
      }, C = () => {
        L = !1, window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", C);
      };
      window.addEventListener("mousemove", l), window.addEventListener("mouseup", C);
    }
    function A(o) {
      if (o.key === "Escape" && k.isOpen) {
        if (v.value) {
          v.value = !1;
          return;
        }
        x.close();
      }
    }
    function R(o) {
      if (!(!k.isOpen || !E.value || v.value) && !E.value.contains(o.target)) {
        if (o.target?.closest(".folder-menu, .bookmark-note-menu, .todoist-date-picker-popover")) return;
        x.close();
      }
    }
    async function le() {
      if (u.value || !f.value.trim() || !i.value || !M.value || !n.value) return;
      const o = { ...n.value }, e = i.value, t = r.value || void 0, l = f.value.trim(), C = I.value.trim();
      u.value = !0, b.value = "";
      try {
        await pe(async () => {
          if (!await T.initToken())
            throw new Error("Todoist 未登录，请先在设置中绑定或登录 Todoist。");
          const U = {
            content: l,
            description: C,
            project_id: e,
            section_id: t,
            due_string: d.value ? d.value + (c.value ? " " + c.value : "") : void 0
          }, g = await T.createTask(U);
          if (!g || typeof g.id != "string")
            throw new Error("创建任务返回数据异常");
          try {
            be(g.id, {
              title: o.title || o.url,
              url: o.url,
              icon: o.icon,
              note: o.note,
              source: o.source
            });
          } catch {
          }
          T.invalidateWorkspaceSnapshots(), ve.show({
            appName: "Todoist",
            appType: "todoist",
            title: "任务已创建",
            message: l,
            level: "success",
            history: !0,
            target: { type: "todoist-task", taskId: g.id },
            actionLabel: "打开任务",
            duration: 7e3
          }), me.active && we.loadWorkspace(void 0, void 0, !0), x.close();
        });
      } catch (h) {
        b.value = h?.message || "创建任务失败，请重试";
      } finally {
        u.value = !1;
      }
    }
    return ie(() => {
      window.addEventListener("keydown", A), window.addEventListener("pointerdown", R, !0);
    }), re(() => {
      window.removeEventListener("keydown", A), window.removeEventListener("pointerdown", R, !0);
    }), (o, e) => (p(), q(ce, { to: "body" }, [
      B(k).isOpen && n.value ? (p(), S("div", ke, [
        a("aside", {
          ref_key: "windowRef",
          ref: E,
          class: "web-task-window",
          style: de(_.value ? { position: "fixed", left: `${_.value.x}px`, top: `${_.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "网站创建任务 - " + n.value.title
        }, [
          a("header", {
            class: "web-task-header",
            onMousedown: ae
          }, [
            a("div", ye, [
              a("span", he, m(n.value.source === "bookmark" ? "🔖 书签任务" : "🌐 网站任务"), 1),
              e[10] || (e[10] = a("small", null, "关联当前网页链接", -1))
            ]),
            a("div", Se, [
              a("button", {
                type: "button",
                class: "web-task-close-btn",
                disabled: u.value,
                title: "关闭视窗 (Esc)",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...t) => B(x).close && B(x).close(...t))
              }, " ✕ ", 8, xe)
            ])
          ], 32),
          a("div", Te, [
            a("div", Ee, [
              n.value.icon ? (p(), S("img", {
                key: 0,
                src: n.value.icon,
                alt: "",
                class: "website-preview-icon",
                onError: oe
              }, null, 40, je)) : (p(), S("span", Ve, "🌐")),
              a("div", Ie, [
                a("strong", {
                  class: "website-preview-title",
                  title: n.value.title
                }, m(n.value.title || n.value.url), 9, Me),
                a("small", {
                  class: "website-preview-url",
                  title: n.value.url
                }, m(n.value.url), 9, Ce),
                n.value.note ? (p(), S("div", Pe, "备注: " + m(n.value.note), 1)) : P("", !0)
              ])
            ]),
            a("div", Le, [
              a("div", $e, [
                e[11] || (e[11] = a("span", { class: "selector-title" }, "📁 目标项目", -1)),
                z(K, {
                  modelValue: i.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (t) => i.value = t),
                  options: J.value,
                  disabled: u.value || y.value,
                  placeholder: y.value ? "正在加载项目…" : "选择项目",
                  onChange: ee
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              a("div", De, [
                e[12] || (e[12] = a("span", { class: "selector-title" }, "📑 目标分组 (板块)", -1)),
                z(K, {
                  modelValue: r.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (t) => r.value = t),
                  options: Q.value,
                  disabled: u.value || V.value,
                  placeholder: V.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: te
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            b.value ? (p(), S("p", Ue, m(b.value), 1)) : P("", !0),
            a("form", {
              onSubmit: ue(le, ["prevent"])
            }, [
              a("fieldset", { disabled: u.value }, [
                a("label", null, [
                  e[13] || (e[13] = H(" 任务名称 ", -1)),
                  F(a("textarea", {
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => f.value = t),
                    rows: "2",
                    maxlength: "500",
                    placeholder: "关于这个网站需要做什么？",
                    required: ""
                  }, null, 512), [
                    [G, f.value]
                  ])
                ]),
                a("label", null, [
                  e[14] || (e[14] = H(" 描述 ", -1)),
                  F(a("textarea", {
                    "onUpdate:modelValue": e[4] || (e[4] = (t) => I.value = t),
                    rows: "3",
                    maxlength: "16000",
                    placeholder: "记录网页内容、目标或备注（可选）"
                  }, null, 512), [
                    [G, I.value]
                  ])
                ]),
                e[15] || (e[15] = a("label", null, "截止日期", -1)),
                a("button", {
                  ref_key: "dateAnchor",
                  ref: X,
                  type: "button",
                  class: "task-date-button",
                  onClick: e[5] || (e[5] = (t) => v.value = !v.value)
                }, " ▦ " + m(d.value ? d.value + (c.value ? " " + c.value : "") : "添加日期与时间"), 513),
                v.value ? (p(), q(fe, {
                  key: 0,
                  modelValue: d.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => d.value = t),
                  "time-value": c.value,
                  "onUpdate:timeValue": e[7] || (e[7] = (t) => c.value = t),
                  "anchor-el": X.value,
                  onTimeValidity: e[8] || (e[8] = (t) => M.value = t),
                  onClose: e[9] || (e[9] = (t) => {
                    v.value = !1, M.value = !0;
                  })
                }, null, 8, ["modelValue", "time-value", "anchor-el"])) : P("", !0),
                e[16] || (e[16] = a("p", { class: "task-local-note" }, " 任务提交至 Todoist，网站链接与标题将写入任务描述，便于在看板和详情中直接点击访问。 ", -1)),
                a("button", {
                  type: "submit",
                  class: "create-task",
                  disabled: !f.value.trim() || !i.value || !M.value || y.value || u.value
                }, m(u.value ? "正在创建…" : "创建任务"), 9, Oe)
              ], 8, Be)
            ], 32)
          ])
        ], 12, _e)
      ])) : P("", !0)
    ]));
  }
}), Ke = /* @__PURE__ */ ge(We, [["__scopeId", "data-v-b2947ffa"]]);
export {
  Ke as default
};
