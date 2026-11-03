import { d as we, w as ye, D as he, z as Se, o, e as se, u as B, g as n, h as s, t as v, F as Y, j as z, i as b, C as U, k as Te, n as le, q as oe, B as Ce, l as xe, b as a, y as D } from "./vendor-vue-dDCd4-uG.js";
import { biliVideoTaskState as j, biliVideoTaskController as M } from "./video-task-store-DZUMJM0l.js";
import { t as k, i as je } from "./todoist.service-Dv_P8OyB.js";
import { w as ae, t as ne } from "./module-state-9dj2qWDB.js";
import { e as re } from "./calendar.service-DdfVd2EX.js";
import { openTodoistTask as Pe } from "./task-navigation-CAQ3LPno.js";
import { n as F } from "./view-styles-HjAT5OZi.js";
import { T as $e } from "./TodoistDatePickerPopover-JsxrTqEB.js";
import { _ as Me } from "./_plugin-vue_export-helper-CRVO6deU.js";
const Ie = {
  key: 0,
  class: "bili-task-modal-overlay"
}, Le = { class: "bili-task-header-actions" }, Ee = ["disabled"], Ve = { class: "bili-task-body" }, Be = {
  key: 0,
  class: "bili-linked-tasks-section"
}, Ue = { class: "bili-linked-header" }, De = ["disabled"], Oe = {
  key: 0,
  class: "bili-linked-list"
}, Ne = ["onClick"], Ae = { class: "bili-linked-meta" }, We = ["title", "onClick"], Re = {
  key: 0,
  class: "bili-linked-due"
}, Xe = {
  key: 1,
  class: "bili-no-linked"
}, Ye = { class: "bili-video-reference" }, ze = ["src"], Fe = { class: "bili-ref-info" }, Ke = ["title"], qe = { class: "bili-destination-selector" }, He = { class: "bili-selector-field" }, Je = { class: "bili-custom-select-wrapper" }, Ge = ["disabled"], Qe = { class: "bili-select-text" }, Ze = {
  key: 0,
  class: "bili-custom-popover-menu"
}, et = {
  key: 0,
  class: "bili-popover-empty"
}, tt = ["onClick"], it = {
  key: 0,
  class: "bili-popover-check"
}, st = { class: "bili-selector-field" }, lt = {
  key: 0,
  class: "bili-pills-loading"
}, ot = {
  key: 1,
  class: "bili-pills-container"
}, at = ["disabled"], nt = ["disabled", "onClick"], rt = {
  key: 1,
  class: "bili-task-feedback",
  role: "alert"
}, ut = ["disabled"], dt = { class: "bili-field-group" }, ct = { class: "bili-field-group" }, vt = { class: "bili-field-group" }, pt = ["disabled"], bt = /* @__PURE__ */ we({
  __name: "BiliVideoTaskModal",
  setup(ft) {
    const I = a(null), P = a(null);
    let O = !1, K = 0, q = 0, N = 0, A = 0;
    const m = a([]), L = a([]), r = a(""), p = a(""), S = a(!1), W = a(!1), T = a(""), E = a(""), g = a(""), w = a(""), H = a(null), y = a(!1), V = a(!0), d = a(!1), C = a(""), x = a([]), h = a(!1), f = D(() => j.video), J = D(() => {
      const i = f.value;
      return i ? (i.bvid || i.aid || "").toString() : "";
    });
    function G(i) {
      return `bili_video_tasks_v1:${i}`;
    }
    function Q(i) {
      if (!i) return [];
      try {
        const t = localStorage.getItem(G(i));
        if (!t) return [];
        const e = JSON.parse(t);
        return Array.isArray(e) ? e.filter((l) => typeof l == "string") : [];
      } catch {
        return [];
      }
    }
    function ue(i, t) {
      if (!i || !t) return;
      const e = Q(i);
      e.includes(t) || (e.unshift(t), localStorage.setItem(G(i), JSON.stringify(e)));
    }
    async function R() {
      const i = J.value;
      if (!i) {
        x.value = [];
        return;
      }
      const t = Q(i);
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
        const l = async (u, c) => {
          try {
            const _ = await k.api(`/tasks/${encodeURIComponent(u)}`);
            _ && typeof _ == "object" && String(_.id) === u && (x.value[c] = { id: u, task: _ });
          } catch (_) {
            x.value[c] = { id: u, error: _?.message || "读取失败" };
          }
        };
        await Promise.allSettled(t.slice(0, 8).map((u, c) => l(u, c)));
      } finally {
        h.value = !1;
      }
    }
    const X = D(() => x.value.filter((i) => !i.task || !je(i.task)));
    async function de(i) {
      if (!i.task || d.value) return;
      const t = i.id;
      try {
        await ae(async () => {
          await k.toggleTaskCompletion(t, !0), k.invalidateWorkspaceSnapshots(), i.task && (i.task.checked = !0, i.task.is_completed = !0), F.show({
            appName: "Todoist",
            appType: "todoist",
            title: "任务已完成",
            message: i.task?.content || t,
            level: "success",
            duration: 4e3
          }), ne.active && re.loadWorkspace(void 0, void 0, !0);
        });
      } catch (e) {
        F.fetch("Todoist", `标记完成失败: ${e?.message || "网络错误"}`);
      }
    }
    function ce(i) {
      if (i.target.closest("button, a, input, select, textarea")) return;
      O = !0;
      const t = I.value;
      if (!t) return;
      const e = t.getBoundingClientRect();
      N = e.left, A = e.top, K = i.clientX, q = i.clientY, P.value = { x: N, y: A };
      const l = (c) => {
        if (!O) return;
        const _ = c.clientX - K, ge = c.clientY - q;
        P.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, N + _)),
          y: Math.max(10, Math.min(window.innerHeight - 80, A + ge))
        };
      }, u = () => {
        O = !1, window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", u);
      };
      window.addEventListener("mousemove", l), window.addEventListener("mouseup", u);
    }
    function Z(i) {
      if (i.key === "Escape" && j.isOpen) {
        if (y.value) {
          y.value = !1;
          return;
        }
        M.close();
      }
    }
    function ee(i) {
      if (!(!j.isOpen || !I.value || y.value) && !I.value.contains(i.target)) {
        if (i.target?.closest(".fo-context-menu, .todoist-date-picker-popover")) return;
        M.close();
      }
    }
    async function ve() {
      S.value = !0;
      try {
        const i = await k.getProjects();
        m.value = (i || []).filter((e) => !e.is_deleted && !e.is_archived);
        const t = localStorage.getItem("bili_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (t && m.value.some((e) => String(e.id) === t))
          r.value = t;
        else if (m.value.length > 0) {
          const e = m.value.find((l) => l.inbox_project || l.is_inbox_project || /^(Inbox|收件箱)$/i.test(l.name));
          r.value = String(e ? e.id : m.value[0].id);
        }
        r.value && await te(r.value);
      } catch (i) {
        C.value = "加载 Todoist 项目失败: " + (i?.message || "请检查登录状态");
      } finally {
        S.value = !1;
      }
    }
    async function te(i) {
      W.value = !0;
      try {
        const t = await k.getSections(i);
        L.value = (t || []).filter((l) => !!(l && l.id && l.name));
        const e = localStorage.getItem("bili_task_last_section_id");
        e && L.value.some((l) => String(l.id) === e) ? p.value = e : p.value = "";
      } catch {
        L.value = [], p.value = "";
      } finally {
        W.value = !1;
      }
    }
    const pe = D(() => m.value.find((i) => String(i.id) === r.value)?.name || "选择项目…"), $ = a(!1);
    function be() {
      d.value || S.value || ($.value = !$.value);
    }
    async function fe() {
      r.value && (localStorage.setItem("bili_task_last_project_id", r.value), p.value = "", localStorage.removeItem("bili_task_last_section_id"), await te(r.value));
    }
    function ke() {
      p.value ? localStorage.setItem("bili_task_last_section_id", p.value) : localStorage.removeItem("bili_task_last_section_id");
    }
    function me(i) {
      r.value = i, $.value = !1, fe();
    }
    function ie(i) {
      p.value = i, ke();
    }
    ye(() => [j.isOpen, j.video], ([i, t]) => {
      if (i && t) {
        C.value = "";
        const e = t;
        T.value = `观看看视频: ${e.title}`;
        const l = e.author ? `UP主: ${e.author}
` : "", u = e.url ? `视频地址: ${e.url}
` : "";
        E.value = `${l}${u}`.trim(), g.value = "", w.value = "", ve(), R();
      }
    }, { immediate: !0 });
    async function _e() {
      if (d.value || !T.value.trim() || !r.value || !V.value) return;
      const i = r.value, t = p.value || void 0, e = J.value, l = {
        content: T.value.trim(),
        description: E.value.trim(),
        project_id: i,
        section_id: t,
        due_string: g.value ? g.value + (w.value ? " " + w.value : "") : void 0
      };
      d.value = !0, C.value = "";
      try {
        await ae(async () => {
          if (!await k.initToken())
            throw new Error("请先登录 Todoist");
          const c = await k.createTask(l);
          if (!c || typeof c.id != "string")
            throw new Error("创建任务返回异常");
          e && ue(e, c.id), k.invalidateWorkspaceSnapshots(), F.show({
            appName: "Todoist",
            appType: "todoist",
            title: "B站视频任务已创建",
            message: l.content,
            level: "success",
            target: { type: "todoist-task", taskId: c.id },
            actionLabel: "查看任务",
            duration: 7e3
          }), ne.active && re.loadWorkspace(void 0, void 0, !0), R(), M.close();
        });
      } catch (u) {
        C.value = u?.message || "创建任务失败，请检查网络或配置";
      } finally {
        d.value = !1;
      }
    }
    return he(() => {
      window.addEventListener("keydown", Z), window.addEventListener("pointerdown", ee, !0);
    }), Se(() => {
      window.removeEventListener("keydown", Z), window.removeEventListener("pointerdown", ee, !0);
    }), (i, t) => (o(), se(xe, { to: "body" }, [
      B(j).isOpen && f.value ? (o(), n("div", Ie, [
        s("aside", {
          ref_key: "windowRef",
          ref: I,
          class: "bili-task-window",
          style: Ce(P.value ? { position: "fixed", left: `${P.value.x}px`, top: `${P.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "创建 B站 视频任务"
        }, [
          s("header", {
            class: "bili-task-header",
            onMousedown: ce
          }, [
            t[9] || (t[9] = s("div", { class: "bili-task-header-title" }, [
              s("span", { class: "bili-task-badge" }, "📺 视频任务"),
              s("small", null, "关联当前 B站 视频")
            ], -1)),
            s("div", Le, [
              s("button", {
                type: "button",
                class: "bili-task-close-btn",
                title: "关闭 (Esc)",
                disabled: d.value,
                onClick: t[0] || (t[0] = //@ts-ignore
                (...e) => B(M).close && B(M).close(...e))
              }, " ✕ ", 8, Ee)
            ])
          ], 32),
          s("div", Ve, [
            h.value || X.value.length > 0 ? (o(), n("section", Be, [
              s("div", Ue, [
                t[10] || (t[10] = s("strong", null, "关联任务", -1)),
                s("button", {
                  type: "button",
                  class: "bili-refresh-link-btn",
                  disabled: h.value,
                  onClick: R
                }, v(h.value ? "读取中…" : "刷新"), 9, De)
              ]),
              X.value.length ? (o(), n("ul", Oe, [
                (o(!0), n(Y, null, z(X.value, (e) => (o(), n("li", {
                  key: e.id,
                  class: "bili-linked-item"
                }, [
                  s("button", {
                    type: "button",
                    class: "bili-complete-circle-btn",
                    title: "标记为完成",
                    onClick: (l) => de(e)
                  }, " ○ ", 8, Ne),
                  s("div", Ae, [
                    s("span", {
                      class: "bili-linked-name",
                      title: e.task?.content || e.id,
                      onClick: (l) => B(Pe)(e.id)
                    }, v(e.task?.content || `任务 #${e.id}`), 9, We),
                    e.task?.due?.date ? (o(), n("small", Re, " 📅 " + v(e.task.due.date), 1)) : b("", !0)
                  ])
                ]))), 128))
              ])) : h.value ? b("", !0) : (o(), n("p", Xe, "暂无未完成的关联任务"))
            ])) : b("", !0),
            t[18] || (t[18] = s("h3", { class: "bili-create-heading" }, "创建任务", -1)),
            s("div", Ye, [
              f.value.cover ? (o(), n("img", {
                key: 0,
                src: f.value.cover.replace(/^http:/, "https:"),
                class: "bili-ref-cover",
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, ze)) : b("", !0),
              s("div", Fe, [
                s("strong", {
                  title: f.value.title
                }, v(f.value.title), 9, Ke),
                s("small", null, v(f.value.author ? `UP主: ${f.value.author}` : "") + " " + v(f.value.bvid || ""), 1)
              ])
            ]),
            s("div", qe, [
              s("div", He, [
                t[12] || (t[12] = s("span", { class: "bili-selector-title" }, "📁 目标项目 (方案 B: 现代弹出菜单)", -1)),
                s("div", Je, [
                  s("button", {
                    type: "button",
                    class: U(["bili-custom-select-btn", { "is-open": $.value }]),
                    disabled: d.value || S.value,
                    onClick: be
                  }, [
                    s("span", Qe, v(S.value ? "正在读取项目…" : pe.value), 1),
                    t[11] || (t[11] = s("span", { class: "bili-select-arrow" }, "▾", -1))
                  ], 10, Ge),
                  $.value ? (o(), n("div", Ze, [
                    m.value.length ? b("", !0) : (o(), n("div", et, "未找到可用项目")),
                    (o(!0), n(Y, null, z(m.value, (e) => (o(), n("button", {
                      key: e.id,
                      type: "button",
                      class: U(["bili-popover-item", { "is-active": String(e.id) === r.value }]),
                      onClick: (l) => me(String(e.id))
                    }, [
                      s("span", null, v(e.name), 1),
                      String(e.id) === r.value ? (o(), n("span", it, "✓")) : b("", !0)
                    ], 10, tt))), 128))
                  ])) : b("", !0)
                ])
              ]),
              s("div", st, [
                t[13] || (t[13] = s("span", { class: "bili-selector-title" }, "📑 目标分组 (方案 A: 药丸胶囊平铺)", -1)),
                W.value ? (o(), n("div", lt, "正在读取板块…")) : (o(), n("div", ot, [
                  s("button", {
                    type: "button",
                    class: U(["bili-pill-chip", { "is-active": !p.value }]),
                    disabled: d.value,
                    onClick: t[1] || (t[1] = (e) => ie(""))
                  }, " (默认项目根) ", 10, at),
                  (o(!0), n(Y, null, z(L.value, (e) => (o(), n("button", {
                    key: e.id,
                    type: "button",
                    class: U(["bili-pill-chip", { "is-active": p.value === String(e.id) }]),
                    disabled: d.value,
                    onClick: (l) => ie(String(e.id))
                  }, v(e.name), 11, nt))), 128))
                ]))
              ])
            ]),
            C.value ? (o(), n("p", rt, v(C.value), 1)) : b("", !0),
            s("form", {
              class: "bili-task-form",
              onSubmit: Te(_e, ["prevent"])
            }, [
              s("fieldset", { disabled: d.value }, [
                s("div", dt, [
                  t[14] || (t[14] = s("label", {
                    for: "bili-task-title-input",
                    class: "bili-field-label"
                  }, "任务名称", -1)),
                  le(s("textarea", {
                    id: "bili-task-title-input",
                    "onUpdate:modelValue": t[2] || (t[2] = (e) => T.value = e),
                    rows: "2",
                    maxlength: "500",
                    class: "bili-task-input",
                    placeholder: "要针对这个视频做什么？",
                    required: ""
                  }, null, 512), [
                    [oe, T.value]
                  ])
                ]),
                s("div", ct, [
                  t[15] || (t[15] = s("label", {
                    for: "bili-task-desc-input",
                    class: "bili-field-label"
                  }, "描述", -1)),
                  le(s("textarea", {
                    id: "bili-task-desc-input",
                    "onUpdate:modelValue": t[3] || (t[3] = (e) => E.value = e),
                    rows: "3",
                    maxlength: "16000",
                    class: "bili-task-input",
                    placeholder: "记录目标、笔记或备忘（可选）"
                  }, null, 512), [
                    [oe, E.value]
                  ])
                ]),
                s("div", vt, [
                  t[16] || (t[16] = s("label", { class: "bili-field-label" }, "截止日期", -1)),
                  s("button", {
                    ref_key: "dateAnchor",
                    ref: H,
                    type: "button",
                    class: "bili-task-date-button",
                    onClick: t[4] || (t[4] = (e) => y.value = !y.value)
                  }, " ▦ " + v(g.value ? g.value + (w.value ? " " + w.value : "") : "添加日期与时间"), 513),
                  y.value ? (o(), se($e, {
                    key: 0,
                    modelValue: g.value,
                    "onUpdate:modelValue": t[5] || (t[5] = (e) => g.value = e),
                    "time-value": w.value,
                    "onUpdate:timeValue": t[6] || (t[6] = (e) => w.value = e),
                    "anchor-el": H.value,
                    onTimeValidity: t[7] || (t[7] = (e) => V.value = e),
                    onClose: t[8] || (t[8] = (e) => {
                      y.value = !1, V.value = !0;
                    })
                  }, null, 8, ["modelValue", "time-value", "anchor-el"])) : b("", !0)
                ]),
                t[17] || (t[17] = s("p", { class: "bili-task-local-note" }, "任务名称、描述和截止日期将同步提交至 Todoist，并在本地与该视频绑定。", -1)),
                s("button", {
                  type: "submit",
                  class: "bili-task-submit-btn",
                  disabled: !T.value.trim() || !r.value || !V.value || S.value || d.value
                }, v(d.value ? "正在创建…" : "创建任务"), 9, pt)
              ], 8, ut)
            ], 32)
          ])
        ], 4)
      ])) : b("", !0)
    ]));
  }
}), Ct = /* @__PURE__ */ Me(bt, [["__scopeId", "data-v-b0b5c891"]]);
export {
  Ct as default
};
