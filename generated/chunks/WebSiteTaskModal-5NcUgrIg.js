import { d as se, w as ne, B as ie, x as re, o as m, j as z, u as B, e as S, i as a, t as p, f as P, p as H, h as ue, m as q, l as F, n as G, z as de, T as ce, s as O, b as s } from "./vendor-vue-9b0eS4bW.js";
import { a as k, w as x } from "./web-task-store-DMFbdA_S.js";
import { t as T } from "./todoist.service-Dx1APSIb.js";
import { C as K, n as ve } from "./view-styles-BsiXiaEf.js";
import { w as me, t as pe } from "./module-state-D4Dr89rP.js";
import { e as fe } from "./calendar.service-W5hd1w4A.js";
import { T as we } from "./TodoistDatePickerPopover-D5MxOCKw.js";
import { a as be } from "./web-site-links-BSIympLj.js";
import { _ as ge } from "./_plugin-vue_export-helper-BZmK54HO.js";
const ke = {
  key: 0,
  class: "web-task-modal-overlay"
}, _e = ["aria-label"], ye = { class: "web-task-header-title" }, he = { class: "web-task-badge" }, Se = { class: "web-task-header-actions" }, xe = ["disabled"], Te = { class: "web-task-body" }, je = { class: "website-preview-card" }, Ee = ["src"], Ve = {
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
    const n = O(() => k.target), j = s(null), _ = s(null);
    let L = !1, W = 0, N = 0, $ = 0, D = 0;
    const f = s([]), E = s([]), i = s(""), r = s(""), y = s(!1), V = s(!1), w = s(""), I = s(""), d = s(""), c = s(""), X = s(null), v = s(!1), M = s(!0), u = s(!1), b = s(""), J = O(() => f.value.map((o) => ({
      value: String(o.id),
      label: o.name,
      icon: "📁"
    }))), Q = O(() => {
      const o = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return E.value.forEach((e) => {
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
        f.value = (o || []).filter((t) => !t.is_deleted && !t.is_archived);
        const e = localStorage.getItem("web_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (e && f.value.some((t) => String(t.id) === e))
          i.value = e;
        else if (f.value.length > 0) {
          const t = f.value.find((l) => l.inbox_project || l.is_inbox_project || /^(Inbox|收件箱)$/i.test(l.name));
          i.value = String(t ? t.id : f.value[0].id);
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
        E.value = (e || []).filter((l) => !!(l && l.id && l.name));
        const t = localStorage.getItem("web_task_last_section_id");
        t && E.value.some((l) => String(l.id) === t) ? r.value = t : r.value = "";
      } catch {
        E.value = [], r.value = "";
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
        w.value = t.title ? `浏览: ${t.title}` : `访问: ${t.url}`;
        const l = [];
        t.url && l.push(`网址: ${t.url}`), t.note && l.push(`备注: ${t.note}`), t.category && l.push(`分类: ${t.category}`), I.value = l.join(`
`).trim(), d.value = "", c.value = "", b.value = "", Z();
      }
    }, { immediate: !0 });
    function ae(o) {
      if (o.target.closest("button, a, input, select, textarea")) return;
      L = !0;
      const e = j.value;
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
      if (!(!k.isOpen || !j.value || v.value) && !j.value.contains(o.target)) {
        if (o.target?.closest(".folder-menu, .bookmark-note-menu, .todoist-date-picker-popover")) return;
        x.close();
      }
    }
    async function le() {
      if (u.value || !w.value.trim() || !i.value || !M.value || !n.value) return;
      const o = { ...n.value }, e = i.value, t = r.value || void 0, l = w.value.trim(), C = I.value.trim();
      u.value = !0, b.value = "";
      try {
        await me(async () => {
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
          }), pe.active && fe.loadWorkspace(void 0, void 0, !0), x.close();
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
    }), (o, e) => (m(), z(ce, { to: "body" }, [
      B(k).isOpen && n.value ? (m(), S("div", ke, [
        a("aside", {
          ref_key: "windowRef",
          ref: j,
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
              a("span", he, p(n.value.source === "bookmark" ? "🔖 书签任务" : "🌐 网站任务"), 1),
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
            a("div", je, [
              n.value.icon ? (m(), S("img", {
                key: 0,
                src: n.value.icon,
                alt: "",
                class: "website-preview-icon",
                onError: oe
              }, null, 40, Ee)) : (m(), S("span", Ve, "🌐")),
              a("div", Ie, [
                a("strong", {
                  class: "website-preview-title",
                  title: n.value.title
                }, p(n.value.title || n.value.url), 9, Me),
                a("small", {
                  class: "website-preview-url",
                  title: n.value.url
                }, p(n.value.url), 9, Ce),
                n.value.note ? (m(), S("div", Pe, "备注: " + p(n.value.note), 1)) : P("", !0)
              ])
            ]),
            a("div", Le, [
              a("div", $e, [
                e[11] || (e[11] = a("span", { class: "selector-title" }, "📁 目标项目", -1)),
                H(K, {
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
                H(K, {
                  modelValue: r.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (t) => r.value = t),
                  options: Q.value,
                  disabled: u.value || V.value,
                  placeholder: V.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: te
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            b.value ? (m(), S("p", Ue, p(b.value), 1)) : P("", !0),
            a("form", {
              onSubmit: ue(le, ["prevent"])
            }, [
              a("fieldset", { disabled: u.value }, [
                a("label", null, [
                  e[13] || (e[13] = q(" 任务名称 ", -1)),
                  F(a("textarea", {
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => w.value = t),
                    rows: "2",
                    maxlength: "500",
                    placeholder: "关于这个网站需要做什么？",
                    required: ""
                  }, null, 512), [
                    [G, w.value]
                  ])
                ]),
                a("label", null, [
                  e[14] || (e[14] = q(" 描述 ", -1)),
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
                }, " ▦ " + p(d.value ? d.value + (c.value ? " " + c.value : "") : "添加日期与时间"), 513),
                v.value ? (m(), z(we, {
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
                  disabled: !w.value.trim() || !i.value || !M.value || y.value || u.value
                }, p(u.value ? "正在创建…" : "创建任务"), 9, Oe)
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
