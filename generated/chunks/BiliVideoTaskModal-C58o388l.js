import { d as ke, w as be, D as ge, z as _e, o as d, e as Q, u as U, g as p, h as l, t as f, F as we, j as he, i as h, s as Z, k as ye, n as ee, q as te, B as Se, l as Te, b as o, y as I } from "./vendor-vue-FFI3kJnP.js";
import { biliVideoTaskState as x, biliVideoTaskController as L } from "./video-task-store-CzPv6smJ.js";
import { t as m, i as Ce } from "./todoist.service-CDSsgWpW.js";
import { w as ie, t as le } from "./module-state-GmAjQSzX.js";
import { e as ae } from "./calendar.service-DE6FKh8O.js";
import { openTodoistTask as xe } from "./task-navigation-C1h9ClKd.js";
import { C as oe, n as R } from "./view-styles-1_9YE1SR.js";
import { T as Ve } from "./TodoistDatePickerPopover-DjMS5BKL.js";
import { _ as je } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const Ie = {
  key: 0,
  class: "bili-task-modal-overlay"
}, Le = { class: "bili-task-header-actions" }, Me = ["disabled"], $e = { class: "bili-task-body" }, Ee = {
  key: 0,
  class: "bili-linked-tasks-section"
}, Pe = { class: "bili-linked-header" }, Be = ["disabled"], Ue = {
  key: 0,
  class: "bili-linked-list"
}, Oe = ["onClick"], De = { class: "bili-linked-meta" }, Ne = ["title", "onClick"], We = {
  key: 0,
  class: "bili-linked-due"
}, Ae = {
  key: 1,
  class: "bili-no-linked"
}, Re = { class: "bili-video-reference" }, Xe = ["src"], Ye = { class: "bili-ref-info" }, Fe = ["title"], Ke = { class: "bili-destination-selector" }, qe = { class: "bili-selector-field" }, ze = { class: "bili-selector-field" }, He = {
  key: 1,
  class: "bili-task-feedback",
  role: "alert"
}, Je = ["disabled"], Ge = { class: "bili-field-group" }, Qe = { class: "bili-field-group" }, Ze = { class: "bili-field-group" }, et = ["disabled"], tt = /* @__PURE__ */ ke({
  __name: "BiliVideoTaskModal",
  setup(it) {
    const M = o(null), V = o(null);
    let O = !1, X = 0, Y = 0, D = 0, N = 0;
    const y = o([]), $ = o([]), n = o(""), u = o(""), j = o(!1), E = o(!1), S = o(""), P = o(""), b = o(""), g = o(""), F = o(null), _ = o(!1), B = o(!0), c = o(!1), T = o(""), C = o([]), w = o(!1), v = I(() => x.video), K = I(() => {
      const i = v.value;
      return i ? (i.bvid || i.aid || "").toString() : "";
    });
    function q(i) {
      return `bili_video_tasks_v1:${i}`;
    }
    function z(i) {
      if (!i) return [];
      try {
        const e = localStorage.getItem(q(i));
        if (!e) return [];
        const t = JSON.parse(e);
        return Array.isArray(t) ? t.filter((a) => typeof a == "string") : [];
      } catch {
        return [];
      }
    }
    function se(i, e) {
      if (!i || !e) return;
      const t = z(i);
      t.includes(e) || (t.unshift(e), localStorage.setItem(q(i), JSON.stringify(t)));
    }
    async function W() {
      const i = K.value;
      if (!i) {
        C.value = [];
        return;
      }
      const e = z(i);
      if (!e.length) {
        C.value = [];
        return;
      }
      w.value = !0, C.value = e.map((t) => ({ id: t }));
      try {
        if (!await m.initToken()) {
          w.value = !1;
          return;
        }
        const a = async (s, r) => {
          try {
            const k = await m.api(`/tasks/${encodeURIComponent(s)}`);
            k && typeof k == "object" && String(k.id) === s && (C.value[r] = { id: s, task: k });
          } catch (k) {
            C.value[r] = { id: s, error: k?.message || "读取失败" };
          }
        };
        await Promise.allSettled(e.slice(0, 8).map((s, r) => a(s, r)));
      } finally {
        w.value = !1;
      }
    }
    const A = I(() => C.value.filter((i) => !i.task || !Ce(i.task)));
    async function ne(i) {
      if (!i.task || c.value) return;
      const e = i.id;
      try {
        await ie(async () => {
          await m.toggleTaskCompletion(e, !0), m.invalidateWorkspaceSnapshots(), i.task && (i.task.checked = !0, i.task.is_completed = !0), R.show({
            appName: "Todoist",
            appType: "todoist",
            title: "任务已完成",
            message: i.task?.content || e,
            level: "success",
            duration: 4e3
          }), le.active && ae.loadWorkspace(void 0, void 0, !0);
        });
      } catch (t) {
        R.fetch("Todoist", `标记完成失败: ${t?.message || "网络错误"}`);
      }
    }
    function re(i) {
      if (i.target.closest("button, a, input, select, textarea")) return;
      O = !0;
      const e = M.value;
      if (!e) return;
      const t = e.getBoundingClientRect();
      D = t.left, N = t.top, X = i.clientX, Y = i.clientY, V.value = { x: D, y: N };
      const a = (r) => {
        if (!O) return;
        const k = r.clientX - X, me = r.clientY - Y;
        V.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, D + k)),
          y: Math.max(10, Math.min(window.innerHeight - 80, N + me))
        };
      }, s = () => {
        O = !1, window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", s);
      };
      window.addEventListener("mousemove", a), window.addEventListener("mouseup", s);
    }
    function H(i) {
      if (i.key === "Escape" && x.isOpen) {
        if (_.value) {
          _.value = !1;
          return;
        }
        L.close();
      }
    }
    function J(i) {
      if (!(!x.isOpen || !M.value || _.value) && !M.value.contains(i.target)) {
        if (i.target?.closest(".fo-context-menu, .todoist-date-picker-popover")) return;
        L.close();
      }
    }
    async function de() {
      j.value = !0;
      try {
        const i = await m.getProjects();
        y.value = (i || []).filter((t) => !t.is_deleted && !t.is_archived);
        const e = localStorage.getItem("bili_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (e && y.value.some((t) => String(t.id) === e))
          n.value = e;
        else if (y.value.length > 0) {
          const t = y.value.find((a) => a.inbox_project || a.is_inbox_project || /^(Inbox|收件箱)$/i.test(a.name));
          n.value = String(t ? t.id : y.value[0].id);
        }
        n.value && await G(n.value);
      } catch (i) {
        T.value = "加载 Todoist 项目失败: " + (i?.message || "请检查登录状态");
      } finally {
        j.value = !1;
      }
    }
    async function G(i) {
      E.value = !0;
      try {
        const e = await m.getSections(i);
        $.value = (e || []).filter((a) => !!(a && a.id && a.name));
        const t = localStorage.getItem("bili_task_last_section_id");
        t && $.value.some((a) => String(a.id) === t) ? u.value = t : u.value = "";
      } catch {
        $.value = [], u.value = "";
      } finally {
        E.value = !1;
      }
    }
    const ue = I(() => y.value.map((i) => ({
      value: String(i.id),
      label: i.name,
      icon: "📁"
    }))), ce = I(() => {
      const i = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return $.value.forEach((e) => {
        i.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), i;
    });
    async function ve(i) {
      n.value = String(i), localStorage.setItem("bili_task_last_project_id", n.value), u.value = "", localStorage.removeItem("bili_task_last_section_id"), await G(n.value);
    }
    function pe(i) {
      u.value = String(i), u.value ? localStorage.setItem("bili_task_last_section_id", u.value) : localStorage.removeItem("bili_task_last_section_id");
    }
    be(() => [x.isOpen, x.video], ([i, e]) => {
      if (i && e) {
        T.value = "";
        const t = e;
        S.value = `观看看视频: ${t.title}`;
        const a = t.author ? `UP主: ${t.author}
` : "", s = t.url ? `视频地址: ${t.url}
` : "";
        P.value = `${a}${s}`.trim(), b.value = "", g.value = "", de(), W();
      }
    }, { immediate: !0 });
    async function fe() {
      if (c.value || !S.value.trim() || !n.value || !B.value) return;
      const i = n.value, e = u.value || void 0, t = K.value, a = {
        content: S.value.trim(),
        description: P.value.trim(),
        project_id: i,
        section_id: e,
        due_string: b.value ? b.value + (g.value ? " " + g.value : "") : void 0
      };
      c.value = !0, T.value = "";
      try {
        await ie(async () => {
          if (!await m.initToken())
            throw new Error("请先登录 Todoist");
          const r = await m.createTask(a);
          if (!r || typeof r.id != "string")
            throw new Error("创建任务返回异常");
          t && se(t, r.id), m.invalidateWorkspaceSnapshots(), R.show({
            appName: "Todoist",
            appType: "todoist",
            title: "B站视频任务已创建",
            message: a.content,
            level: "success",
            target: { type: "todoist-task", taskId: r.id },
            actionLabel: "查看任务",
            duration: 7e3
          }), le.active && ae.loadWorkspace(void 0, void 0, !0), W(), L.close();
        });
      } catch (s) {
        T.value = s?.message || "创建任务失败，请检查网络或配置";
      } finally {
        c.value = !1;
      }
    }
    return ge(() => {
      window.addEventListener("keydown", H), window.addEventListener("pointerdown", J, !0);
    }), _e(() => {
      window.removeEventListener("keydown", H), window.removeEventListener("pointerdown", J, !0);
    }), (i, e) => (d(), Q(Te, { to: "body" }, [
      U(x).isOpen && v.value ? (d(), p("div", Ie, [
        l("aside", {
          ref_key: "windowRef",
          ref: M,
          class: "bili-task-window",
          style: Se(V.value ? { position: "fixed", left: `${V.value.x}px`, top: `${V.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "创建 B站 视频任务"
        }, [
          l("header", {
            class: "bili-task-header",
            onMousedown: re
          }, [
            e[10] || (e[10] = l("div", { class: "bili-task-header-title" }, [
              l("span", { class: "bili-task-badge" }, "📺 视频任务"),
              l("small", null, "关联当前 B站 视频")
            ], -1)),
            l("div", Le, [
              l("button", {
                type: "button",
                class: "bili-task-close-btn",
                title: "关闭 (Esc)",
                disabled: c.value,
                onClick: e[0] || (e[0] = //@ts-ignore
                (...t) => U(L).close && U(L).close(...t))
              }, " ✕ ", 8, Me)
            ])
          ], 32),
          l("div", $e, [
            w.value || A.value.length > 0 ? (d(), p("section", Ee, [
              l("div", Pe, [
                e[11] || (e[11] = l("strong", null, "关联任务", -1)),
                l("button", {
                  type: "button",
                  class: "bili-refresh-link-btn",
                  disabled: w.value,
                  onClick: W
                }, f(w.value ? "读取中…" : "刷新"), 9, Be)
              ]),
              A.value.length ? (d(), p("ul", Ue, [
                (d(!0), p(we, null, he(A.value, (t) => (d(), p("li", {
                  key: t.id,
                  class: "bili-linked-item"
                }, [
                  l("button", {
                    type: "button",
                    class: "bili-complete-circle-btn",
                    title: "标记为完成",
                    onClick: (a) => ne(t)
                  }, " ○ ", 8, Oe),
                  l("div", De, [
                    l("span", {
                      class: "bili-linked-name",
                      title: t.task?.content || t.id,
                      onClick: (a) => U(xe)(t.id)
                    }, f(t.task?.content || `任务 #${t.id}`), 9, Ne),
                    t.task?.due?.date ? (d(), p("small", We, " 📅 " + f(t.task.due.date), 1)) : h("", !0)
                  ])
                ]))), 128))
              ])) : w.value ? h("", !0) : (d(), p("p", Ae, "暂无未完成的关联任务"))
            ])) : h("", !0),
            e[18] || (e[18] = l("h3", { class: "bili-create-heading" }, "创建任务", -1)),
            l("div", Re, [
              v.value.cover ? (d(), p("img", {
                key: 0,
                src: v.value.cover.replace(/^http:/, "https:"),
                class: "bili-ref-cover",
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Xe)) : h("", !0),
              l("div", Ye, [
                l("strong", {
                  title: v.value.title
                }, f(v.value.title), 9, Fe),
                l("small", null, f(v.value.author ? `UP主: ${v.value.author}` : "") + " " + f(v.value.bvid || ""), 1)
              ])
            ]),
            l("div", Ke, [
              l("div", qe, [
                e[12] || (e[12] = l("span", { class: "bili-selector-title" }, "📁 目标项目", -1)),
                Z(oe, {
                  modelValue: n.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (t) => n.value = t),
                  options: ue.value,
                  disabled: c.value || j.value,
                  placeholder: j.value ? "正在加载项目…" : "选择项目",
                  onChange: ve
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              l("div", ze, [
                e[13] || (e[13] = l("span", { class: "bili-selector-title" }, "📑 目标分组 (板块)", -1)),
                Z(oe, {
                  modelValue: u.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (t) => u.value = t),
                  options: ce.value,
                  disabled: c.value || E.value,
                  placeholder: E.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: pe
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            T.value ? (d(), p("p", He, f(T.value), 1)) : h("", !0),
            l("form", {
              class: "bili-task-form",
              onSubmit: ye(fe, ["prevent"])
            }, [
              l("fieldset", { disabled: c.value }, [
                l("div", Ge, [
                  e[14] || (e[14] = l("label", {
                    for: "bili-task-title-input",
                    class: "bili-field-label"
                  }, "任务名称", -1)),
                  ee(l("textarea", {
                    id: "bili-task-title-input",
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => S.value = t),
                    rows: "2",
                    maxlength: "500",
                    class: "bili-task-input",
                    placeholder: "要针对这个视频做什么？",
                    required: ""
                  }, null, 512), [
                    [te, S.value]
                  ])
                ]),
                l("div", Qe, [
                  e[15] || (e[15] = l("label", {
                    for: "bili-task-desc-input",
                    class: "bili-field-label"
                  }, "描述", -1)),
                  ee(l("textarea", {
                    id: "bili-task-desc-input",
                    "onUpdate:modelValue": e[4] || (e[4] = (t) => P.value = t),
                    rows: "3",
                    maxlength: "16000",
                    class: "bili-task-input",
                    placeholder: "记录目标、笔记或备忘（可选）"
                  }, null, 512), [
                    [te, P.value]
                  ])
                ]),
                l("div", Ze, [
                  e[16] || (e[16] = l("label", { class: "bili-field-label" }, "截止日期", -1)),
                  l("button", {
                    ref_key: "dateAnchor",
                    ref: F,
                    type: "button",
                    class: "bili-task-date-button",
                    onClick: e[5] || (e[5] = (t) => _.value = !_.value)
                  }, " ▦ " + f(b.value ? b.value + (g.value ? " " + g.value : "") : "添加日期与时间"), 513),
                  _.value ? (d(), Q(Ve, {
                    key: 0,
                    modelValue: b.value,
                    "onUpdate:modelValue": e[6] || (e[6] = (t) => b.value = t),
                    "time-value": g.value,
                    "onUpdate:timeValue": e[7] || (e[7] = (t) => g.value = t),
                    "anchor-el": F.value,
                    onTimeValidity: e[8] || (e[8] = (t) => B.value = t),
                    onClose: e[9] || (e[9] = (t) => {
                      _.value = !1, B.value = !0;
                    })
                  }, null, 8, ["modelValue", "time-value", "anchor-el"])) : h("", !0)
                ]),
                e[17] || (e[17] = l("p", { class: "bili-task-local-note" }, "任务名称、描述和截止日期将同步提交至 Todoist，并在本地与该视频绑定。", -1)),
                l("button", {
                  type: "submit",
                  class: "bili-task-submit-btn",
                  disabled: !S.value.trim() || !n.value || !B.value || j.value || c.value
                }, f(c.value ? "正在创建…" : "创建任务"), 9, et)
              ], 8, Je)
            ], 32)
          ])
        ], 4)
      ])) : h("", !0)
    ]));
  }
}), vt = /* @__PURE__ */ je(tt, [["__scopeId", "data-v-90367b83"]]);
export {
  vt as default
};
