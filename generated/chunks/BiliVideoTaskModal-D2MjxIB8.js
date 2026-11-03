import { d as pe, w as ke, D as me, z as _e, o as a, e as te, u as B, g as n, h as l, t as c, F as R, j as X, i as p, n as U, s as ie, k as ge, q as le, B as we, l as ye, b as o, y as Y } from "./vendor-vue-dDCd4-uG.js";
import { biliVideoTaskState as j, biliVideoTaskController as L } from "./video-task-store-DZUMJM0l.js";
import { t as k, i as he } from "./todoist.service-Dv_P8OyB.js";
import { w as se, t as oe } from "./module-state-9dj2qWDB.js";
import { e as ae } from "./calendar.service-DdfVd2EX.js";
import { openTodoistTask as Se } from "./task-navigation-CAQ3LPno.js";
import { n as F } from "./view-styles-_33m77d-.js";
import { T as Te } from "./TodoistDatePickerPopover-JsxrTqEB.js";
import { _ as xe } from "./_plugin-vue_export-helper-CRVO6deU.js";
const je = {
  key: 0,
  class: "bili-task-modal-overlay"
}, Ce = { class: "bili-task-header-actions" }, Ie = ["disabled"], Le = { class: "bili-task-body" }, Me = {
  key: 0,
  class: "bili-linked-tasks-section"
}, Ve = { class: "bili-linked-header" }, $e = ["disabled"], Pe = {
  key: 0,
  class: "bili-linked-list"
}, Ee = ["onClick"], Be = { class: "bili-linked-meta" }, Ue = ["title", "onClick"], De = {
  key: 0,
  class: "bili-linked-due"
}, Oe = {
  key: 1,
  class: "bili-no-linked"
}, Ne = { class: "bili-video-reference" }, We = ["src"], Ae = { class: "bili-ref-info" }, Re = ["title"], Xe = { class: "bili-destination-selector" }, Ye = { class: "bili-selector-field" }, Fe = ["disabled"], Ke = {
  key: 0,
  value: "",
  disabled: ""
}, qe = {
  key: 1,
  value: "",
  disabled: ""
}, ze = ["value"], He = { class: "bili-selector-field" }, Je = ["disabled"], Ge = {
  key: 0,
  value: "",
  disabled: ""
}, Qe = ["value"], Ze = {
  key: 1,
  class: "bili-task-feedback",
  role: "alert"
}, et = ["disabled"], tt = { class: "bili-field-group" }, it = { class: "bili-field-group" }, lt = { class: "bili-field-group" }, st = ["disabled"], ot = /* @__PURE__ */ pe({
  __name: "BiliVideoTaskModal",
  setup(at) {
    const M = o(null), C = o(null);
    let D = !1, K = 0, q = 0, O = 0, N = 0;
    const _ = o([]), V = o([]), d = o(""), f = o(""), I = o(!1), $ = o(!1), S = o(""), P = o(""), g = o(""), w = o(""), z = o(null), y = o(!1), E = o(!0), v = o(!1), T = o(""), x = o([]), h = o(!1), b = Y(() => j.video), H = Y(() => {
      const i = b.value;
      return i ? (i.bvid || i.aid || "").toString() : "";
    });
    function J(i) {
      return `bili_video_tasks_v1:${i}`;
    }
    function G(i) {
      if (!i) return [];
      try {
        const t = localStorage.getItem(J(i));
        if (!t) return [];
        const e = JSON.parse(t);
        return Array.isArray(e) ? e.filter((s) => typeof s == "string") : [];
      } catch {
        return [];
      }
    }
    function ne(i, t) {
      if (!i || !t) return;
      const e = G(i);
      e.includes(t) || (e.unshift(t), localStorage.setItem(J(i), JSON.stringify(e)));
    }
    async function W() {
      const i = H.value;
      if (!i) {
        x.value = [];
        return;
      }
      const t = G(i);
      if (!t.length) {
        x.value = [];
        return;
      }
      h.value = !0, x.value = t.map((e) => ({ id: e }));
      try {
        if (!await k.initToken()) {
          h.value = !1;
          return;
        }
        const s = async (r, u) => {
          try {
            const m = await k.api(`/tasks/${encodeURIComponent(r)}`);
            m && typeof m == "object" && String(m.id) === r && (x.value[u] = { id: r, task: m });
          } catch (m) {
            x.value[u] = { id: r, error: m?.message || "读取失败" };
          }
        };
        await Promise.allSettled(t.slice(0, 8).map((r, u) => s(r, u)));
      } finally {
        h.value = !1;
      }
    }
    const A = Y(() => x.value.filter((i) => !i.task || !he(i.task)));
    async function re(i) {
      if (!i.task || v.value) return;
      const t = i.id;
      try {
        await se(async () => {
          await k.toggleTaskCompletion(t, !0), k.invalidateWorkspaceSnapshots(), i.task && (i.task.checked = !0, i.task.is_completed = !0), F.show({
            appName: "Todoist",
            appType: "todoist",
            title: "任务已完成",
            message: i.task?.content || t,
            level: "success",
            duration: 4e3
          }), oe.active && ae.loadWorkspace(void 0, void 0, !0);
        });
      } catch (e) {
        F.fetch("Todoist", `标记完成失败: ${e?.message || "网络错误"}`);
      }
    }
    function de(i) {
      if (i.target.closest("button, a, input, select, textarea")) return;
      D = !0;
      const t = M.value;
      if (!t) return;
      const e = t.getBoundingClientRect();
      O = e.left, N = e.top, K = i.clientX, q = i.clientY, C.value = { x: O, y: N };
      const s = (u) => {
        if (!D) return;
        const m = u.clientX - K, be = u.clientY - q;
        C.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, O + m)),
          y: Math.max(10, Math.min(window.innerHeight - 80, N + be))
        };
      }, r = () => {
        D = !1, window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", r);
      };
      window.addEventListener("mousemove", s), window.addEventListener("mouseup", r);
    }
    function Q(i) {
      if (i.key === "Escape" && j.isOpen) {
        if (y.value) {
          y.value = !1;
          return;
        }
        L.close();
      }
    }
    function Z(i) {
      if (!(!j.isOpen || !M.value || y.value) && !M.value.contains(i.target)) {
        if (i.target?.closest(".fo-context-menu, .todoist-date-picker-popover")) return;
        L.close();
      }
    }
    async function ue() {
      I.value = !0;
      try {
        const i = await k.getProjects();
        _.value = (i || []).filter((e) => !e.is_deleted && !e.is_archived);
        const t = localStorage.getItem("bili_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (t && _.value.some((e) => String(e.id) === t))
          d.value = t;
        else if (_.value.length > 0) {
          const e = _.value.find((s) => s.inbox_project || s.is_inbox_project || /^(Inbox|收件箱)$/i.test(s.name));
          d.value = String(e ? e.id : _.value[0].id);
        }
        d.value && await ee(d.value);
      } catch (i) {
        T.value = "加载 Todoist 项目失败: " + (i?.message || "请检查登录状态");
      } finally {
        I.value = !1;
      }
    }
    async function ee(i) {
      $.value = !0;
      try {
        const t = await k.getSections(i);
        V.value = (t || []).filter((s) => !!(s && s.id && s.name));
        const e = localStorage.getItem("bili_task_last_section_id");
        e && V.value.some((s) => String(s.id) === e) ? f.value = e : f.value = "";
      } catch {
        V.value = [], f.value = "";
      } finally {
        $.value = !1;
      }
    }
    async function ce() {
      d.value && (localStorage.setItem("bili_task_last_project_id", d.value), f.value = "", localStorage.removeItem("bili_task_last_section_id"), await ee(d.value));
    }
    function ve() {
      f.value ? localStorage.setItem("bili_task_last_section_id", f.value) : localStorage.removeItem("bili_task_last_section_id");
    }
    ke(() => [j.isOpen, j.video], ([i, t]) => {
      if (i && t) {
        T.value = "";
        const e = t;
        S.value = `观看看视频: ${e.title}`;
        const s = e.author ? `UP主: ${e.author}
` : "", r = e.url ? `视频地址: ${e.url}
` : "";
        P.value = `${s}${r}`.trim(), g.value = "", w.value = "", ue(), W();
      }
    }, { immediate: !0 });
    async function fe() {
      if (v.value || !S.value.trim() || !d.value || !E.value) return;
      const i = d.value, t = f.value || void 0, e = H.value, s = {
        content: S.value.trim(),
        description: P.value.trim(),
        project_id: i,
        section_id: t,
        due_string: g.value ? g.value + (w.value ? " " + w.value : "") : void 0
      };
      v.value = !0, T.value = "";
      try {
        await se(async () => {
          if (!await k.initToken())
            throw new Error("请先登录 Todoist");
          const u = await k.createTask(s);
          if (!u || typeof u.id != "string")
            throw new Error("创建任务返回异常");
          e && ne(e, u.id), k.invalidateWorkspaceSnapshots(), F.show({
            appName: "Todoist",
            appType: "todoist",
            title: "B站视频任务已创建",
            message: s.content,
            level: "success",
            target: { type: "todoist-task", taskId: u.id },
            actionLabel: "查看任务",
            duration: 7e3
          }), oe.active && ae.loadWorkspace(void 0, void 0, !0), W(), L.close();
        });
      } catch (r) {
        T.value = r?.message || "创建任务失败，请检查网络或配置";
      } finally {
        v.value = !1;
      }
    }
    return me(() => {
      window.addEventListener("keydown", Q), window.addEventListener("pointerdown", Z, !0);
    }), _e(() => {
      window.removeEventListener("keydown", Q), window.removeEventListener("pointerdown", Z, !0);
    }), (i, t) => (a(), te(ye, { to: "body" }, [
      B(j).isOpen && b.value ? (a(), n("div", je, [
        l("aside", {
          ref_key: "windowRef",
          ref: M,
          class: "bili-task-window",
          style: we(C.value ? { position: "fixed", left: `${C.value.x}px`, top: `${C.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "创建 B站 视频任务"
        }, [
          l("header", {
            class: "bili-task-header",
            onMousedown: de
          }, [
            t[10] || (t[10] = l("div", { class: "bili-task-header-title" }, [
              l("span", { class: "bili-task-badge" }, "📺 视频任务"),
              l("small", null, "关联当前 B站 视频")
            ], -1)),
            l("div", Ce, [
              l("button", {
                type: "button",
                class: "bili-task-close-btn",
                title: "关闭 (Esc)",
                disabled: v.value,
                onClick: t[0] || (t[0] = //@ts-ignore
                (...e) => B(L).close && B(L).close(...e))
              }, " ✕ ", 8, Ie)
            ])
          ], 32),
          l("div", Le, [
            h.value || A.value.length > 0 ? (a(), n("section", Me, [
              l("div", Ve, [
                t[11] || (t[11] = l("strong", null, "关联任务", -1)),
                l("button", {
                  type: "button",
                  class: "bili-refresh-link-btn",
                  disabled: h.value,
                  onClick: W
                }, c(h.value ? "读取中…" : "刷新"), 9, $e)
              ]),
              A.value.length ? (a(), n("ul", Pe, [
                (a(!0), n(R, null, X(A.value, (e) => (a(), n("li", {
                  key: e.id,
                  class: "bili-linked-item"
                }, [
                  l("button", {
                    type: "button",
                    class: "bili-complete-circle-btn",
                    title: "标记为完成",
                    onClick: (s) => re(e)
                  }, " ○ ", 8, Ee),
                  l("div", Be, [
                    l("span", {
                      class: "bili-linked-name",
                      title: e.task?.content || e.id,
                      onClick: (s) => B(Se)(e.id)
                    }, c(e.task?.content || `任务 #${e.id}`), 9, Ue),
                    e.task?.due?.date ? (a(), n("small", De, " 📅 " + c(e.task.due.date), 1)) : p("", !0)
                  ])
                ]))), 128))
              ])) : h.value ? p("", !0) : (a(), n("p", Oe, "暂无未完成的关联任务"))
            ])) : p("", !0),
            t[19] || (t[19] = l("h3", { class: "bili-create-heading" }, "创建任务", -1)),
            l("div", Ne, [
              b.value.cover ? (a(), n("img", {
                key: 0,
                src: b.value.cover.replace(/^http:/, "https:"),
                class: "bili-ref-cover",
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, We)) : p("", !0),
              l("div", Ae, [
                l("strong", {
                  title: b.value.title
                }, c(b.value.title), 9, Re),
                l("small", null, c(b.value.author ? `UP主: ${b.value.author}` : "") + " " + c(b.value.bvid || ""), 1)
              ])
            ]),
            l("div", Xe, [
              l("div", Ye, [
                t[12] || (t[12] = l("label", {
                  class: "bili-selector-label",
                  for: "bili-dest-project"
                }, [
                  l("span", { class: "bili-selector-title" }, "📁 目标项目")
                ], -1)),
                U(l("select", {
                  id: "bili-dest-project",
                  "onUpdate:modelValue": t[1] || (t[1] = (e) => d.value = e),
                  class: "bili-project-select",
                  disabled: v.value || I.value,
                  onChange: ce
                }, [
                  I.value ? (a(), n("option", Ke, "正在加载 Todoist 项目…")) : _.value.length ? p("", !0) : (a(), n("option", qe, "未找到可用项目，请检查登录")),
                  (a(!0), n(R, null, X(_.value, (e) => (a(), n("option", {
                    key: e.id,
                    value: String(e.id)
                  }, c(e.name), 9, ze))), 128))
                ], 40, Fe), [
                  [ie, d.value]
                ])
              ]),
              l("div", He, [
                t[14] || (t[14] = l("label", {
                  class: "bili-selector-label",
                  for: "bili-dest-section"
                }, [
                  l("span", { class: "bili-selector-title" }, "📑 目标分组 (板块)")
                ], -1)),
                U(l("select", {
                  id: "bili-dest-section",
                  "onUpdate:modelValue": t[2] || (t[2] = (e) => f.value = e),
                  class: "bili-section-select",
                  disabled: v.value || $.value,
                  onChange: ve
                }, [
                  t[13] || (t[13] = l("option", { value: "" }, "(无分组 / 默认项目根)", -1)),
                  $.value ? (a(), n("option", Ge, "正在加载板块分组…")) : p("", !0),
                  (a(!0), n(R, null, X(V.value, (e) => (a(), n("option", {
                    key: e.id,
                    value: String(e.id)
                  }, c(e.name), 9, Qe))), 128))
                ], 40, Je), [
                  [ie, f.value]
                ])
              ])
            ]),
            T.value ? (a(), n("p", Ze, c(T.value), 1)) : p("", !0),
            l("form", {
              class: "bili-task-form",
              onSubmit: ge(fe, ["prevent"])
            }, [
              l("fieldset", { disabled: v.value }, [
                l("div", tt, [
                  t[15] || (t[15] = l("label", {
                    for: "bili-task-title-input",
                    class: "bili-field-label"
                  }, "任务名称", -1)),
                  U(l("textarea", {
                    id: "bili-task-title-input",
                    "onUpdate:modelValue": t[3] || (t[3] = (e) => S.value = e),
                    rows: "2",
                    maxlength: "500",
                    class: "bili-task-input",
                    placeholder: "要针对这个视频做什么？",
                    required: ""
                  }, null, 512), [
                    [le, S.value]
                  ])
                ]),
                l("div", it, [
                  t[16] || (t[16] = l("label", {
                    for: "bili-task-desc-input",
                    class: "bili-field-label"
                  }, "描述", -1)),
                  U(l("textarea", {
                    id: "bili-task-desc-input",
                    "onUpdate:modelValue": t[4] || (t[4] = (e) => P.value = e),
                    rows: "3",
                    maxlength: "16000",
                    class: "bili-task-input",
                    placeholder: "记录目标、笔记或备忘（可选）"
                  }, null, 512), [
                    [le, P.value]
                  ])
                ]),
                l("div", lt, [
                  t[17] || (t[17] = l("label", { class: "bili-field-label" }, "截止日期", -1)),
                  l("button", {
                    ref_key: "dateAnchor",
                    ref: z,
                    type: "button",
                    class: "bili-task-date-button",
                    onClick: t[5] || (t[5] = (e) => y.value = !y.value)
                  }, " ▦ " + c(g.value ? g.value + (w.value ? " " + w.value : "") : "添加日期与时间"), 513),
                  y.value ? (a(), te(Te, {
                    key: 0,
                    modelValue: g.value,
                    "onUpdate:modelValue": t[6] || (t[6] = (e) => g.value = e),
                    "time-value": w.value,
                    "onUpdate:timeValue": t[7] || (t[7] = (e) => w.value = e),
                    "anchor-el": z.value,
                    onTimeValidity: t[8] || (t[8] = (e) => E.value = e),
                    onClose: t[9] || (t[9] = (e) => {
                      y.value = !1, E.value = !0;
                    })
                  }, null, 8, ["modelValue", "time-value", "anchor-el"])) : p("", !0)
                ]),
                t[18] || (t[18] = l("p", { class: "bili-task-local-note" }, "任务名称、描述和截止日期将同步提交至 Todoist，并在本地与该视频绑定。", -1)),
                l("button", {
                  type: "submit",
                  class: "bili-task-submit-btn",
                  disabled: !S.value.trim() || !d.value || !E.value || I.value || v.value
                }, c(v.value ? "正在创建…" : "创建任务"), 9, st)
              ], 8, et)
            ], 32)
          ])
        ], 4)
      ])) : p("", !0)
    ]));
  }
}), kt = /* @__PURE__ */ xe(ot, [["__scopeId", "data-v-6fe495fe"]]);
export {
  kt as default
};
