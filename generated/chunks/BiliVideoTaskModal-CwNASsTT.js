import { d as be, w as ke, D as ge, z as _e, o as d, e as Q, u as U, g as f, h as l, t as m, F as we, j as he, i as h, s as Z, k as ye, n as ee, q as te, B as Se, l as Te, b as o, y as I } from "./vendor-vue-D8gPZiit.js";
import { biliVideoTaskState as C, biliVideoTaskController as L } from "./video-task-store-CicQyBkB.js";
import { t as b, i as Ve } from "./todoist.service-C09bjqJk.js";
import { w as ie, t as le } from "./module-state-CYd8scC_.js";
import { e as ae } from "./calendar.service-CQ1CnD59.js";
import { openTodoistTask as Ce } from "./task-navigation-BefdRGbn.js";
import { C as oe, n as R } from "./view-styles-BpB_p4vg.js";
import { T as xe } from "./TodoistDatePickerPopover-Ciuer6UQ.js";
import { a as je } from "./bili-video-links-DXpyplJq.js";
import { _ as Ie } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
const Le = {
  key: 0,
  class: "bili-task-modal-overlay"
}, $e = { class: "bili-task-header-actions" }, Me = ["disabled"], Ee = { class: "bili-task-body" }, Pe = {
  key: 0,
  class: "bili-linked-tasks-section"
}, Be = { class: "bili-linked-header" }, Ue = ["disabled"], Oe = {
  key: 0,
  class: "bili-linked-list"
}, De = ["onClick"], Ne = { class: "bili-linked-meta" }, We = ["title", "onClick"], Ae = {
  key: 0,
  class: "bili-linked-due"
}, Re = {
  key: 1,
  class: "bili-no-linked"
}, Xe = { class: "bili-video-reference" }, Ye = ["src"], Fe = { class: "bili-ref-info" }, Ke = ["title"], qe = { class: "bili-destination-selector" }, ze = { class: "bili-selector-field" }, He = { class: "bili-selector-field" }, Je = {
  key: 1,
  class: "bili-task-feedback",
  role: "alert"
}, Ge = ["disabled"], Qe = { class: "bili-field-group" }, Ze = { class: "bili-field-group" }, et = { class: "bili-field-group" }, tt = ["disabled"], it = /* @__PURE__ */ be({
  __name: "BiliVideoTaskModal",
  setup(lt) {
    const $ = o(null), x = o(null);
    let O = !1, X = 0, Y = 0, D = 0, N = 0;
    const y = o([]), M = o([]), r = o(""), u = o(""), j = o(!1), E = o(!1), S = o(""), P = o(""), k = o(""), g = o(""), F = o(null), _ = o(!1), B = o(!0), c = o(!1), T = o(""), V = o([]), w = o(!1), v = I(() => C.video), K = I(() => {
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
        V.value = [];
        return;
      }
      const e = z(i);
      if (!e.length) {
        V.value = [];
        return;
      }
      w.value = !0, V.value = e.map((t) => ({ id: t }));
      try {
        if (!await b.initToken()) {
          w.value = !1;
          return;
        }
        const a = async (s, p) => {
          try {
            const n = await b.api(`/tasks/${encodeURIComponent(s)}`);
            n && typeof n == "object" && String(n.id) === s && (V.value[p] = { id: s, task: n });
          } catch (n) {
            V.value[p] = { id: s, error: n?.message || "读取失败" };
          }
        };
        await Promise.allSettled(e.slice(0, 8).map((s, p) => a(s, p)));
      } finally {
        w.value = !1;
      }
    }
    const A = I(() => V.value.filter((i) => !i.task || !Ve(i.task)));
    async function ne(i) {
      if (!i.task || c.value) return;
      const e = i.id;
      try {
        await ie(async () => {
          await b.toggleTaskCompletion(e, !0), b.invalidateWorkspaceSnapshots(), i.task && (i.task.checked = !0, i.task.is_completed = !0), R.show({
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
      const e = $.value;
      if (!e) return;
      const t = e.getBoundingClientRect();
      D = t.left, N = t.top, X = i.clientX, Y = i.clientY, x.value = { x: D, y: N };
      const a = (p) => {
        if (!O) return;
        const n = p.clientX - X, me = p.clientY - Y;
        x.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, D + n)),
          y: Math.max(10, Math.min(window.innerHeight - 80, N + me))
        };
      }, s = () => {
        O = !1, window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", s);
      };
      window.addEventListener("mousemove", a), window.addEventListener("mouseup", s);
    }
    function H(i) {
      if (i.key === "Escape" && C.isOpen) {
        if (_.value) {
          _.value = !1;
          return;
        }
        L.close();
      }
    }
    function J(i) {
      if (!(!C.isOpen || !$.value || _.value) && !$.value.contains(i.target)) {
        if (i.target?.closest(".fo-context-menu, .todoist-date-picker-popover")) return;
        L.close();
      }
    }
    async function de() {
      j.value = !0;
      try {
        const i = await b.getProjects();
        y.value = (i || []).filter((t) => !t.is_deleted && !t.is_archived);
        const e = localStorage.getItem("bili_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (e && y.value.some((t) => String(t.id) === e))
          r.value = e;
        else if (y.value.length > 0) {
          const t = y.value.find((a) => a.inbox_project || a.is_inbox_project || /^(Inbox|收件箱)$/i.test(a.name));
          r.value = String(t ? t.id : y.value[0].id);
        }
        r.value && await G(r.value);
      } catch (i) {
        T.value = "加载 Todoist 项目失败: " + (i?.message || "请检查登录状态");
      } finally {
        j.value = !1;
      }
    }
    async function G(i) {
      E.value = !0;
      try {
        const e = await b.getSections(i);
        M.value = (e || []).filter((a) => !!(a && a.id && a.name));
        const t = localStorage.getItem("bili_task_last_section_id");
        t && M.value.some((a) => String(a.id) === t) ? u.value = t : u.value = "";
      } catch {
        M.value = [], u.value = "";
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
      return M.value.forEach((e) => {
        i.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), i;
    });
    async function ve(i) {
      r.value = String(i), localStorage.setItem("bili_task_last_project_id", r.value), u.value = "", localStorage.removeItem("bili_task_last_section_id"), await G(r.value);
    }
    function pe(i) {
      u.value = String(i), u.value ? localStorage.setItem("bili_task_last_section_id", u.value) : localStorage.removeItem("bili_task_last_section_id");
    }
    ke(() => [C.isOpen, C.video], ([i, e]) => {
      if (i && e) {
        T.value = "";
        const t = e;
        S.value = `观看看视频: ${t.title}`;
        const a = t.author ? `UP主: ${t.author}
` : "", s = t.url ? `视频地址: ${t.url}
` : "";
        P.value = `${a}${s}`.trim(), k.value = "", g.value = "", de(), W();
      }
    }, { immediate: !0 });
    async function fe() {
      if (c.value || !S.value.trim() || !r.value || !B.value) return;
      const i = r.value, e = u.value || void 0, t = K.value, a = v.value, s = {
        content: S.value.trim(),
        description: P.value.trim(),
        project_id: i,
        section_id: e,
        due_string: k.value ? k.value + (g.value ? " " + g.value : "") : void 0
      };
      c.value = !0, T.value = "";
      try {
        await ie(async () => {
          if (!await b.initToken())
            throw new Error("请先登录 Todoist");
          const n = await b.createTask(s);
          if (!n || typeof n.id != "string")
            throw new Error("创建任务返回异常");
          t && se(t, n.id), a && je(n.id, {
            bvid: a.bvid || (t.startsWith("BV") ? t : ""),
            aid: a.aid,
            title: a.title,
            cover: a.cover,
            author: a.author,
            url: a.url || (a.bvid ? `https://www.bilibili.com/video/${a.bvid}` : "")
          }), b.invalidateWorkspaceSnapshots(), R.show({
            appName: "Todoist",
            appType: "todoist",
            title: "B站视频任务已创建",
            message: s.content,
            level: "success",
            target: { type: "todoist-task", taskId: n.id },
            actionLabel: "查看任务",
            duration: 7e3
          }), le.active && ae.loadWorkspace(void 0, void 0, !0), W(), L.close();
        });
      } catch (p) {
        T.value = p?.message || "创建任务失败，请检查网络或配置";
      } finally {
        c.value = !1;
      }
    }
    return ge(() => {
      window.addEventListener("keydown", H), window.addEventListener("pointerdown", J, !0);
    }), _e(() => {
      window.removeEventListener("keydown", H), window.removeEventListener("pointerdown", J, !0);
    }), (i, e) => (d(), Q(Te, { to: "body" }, [
      U(C).isOpen && v.value ? (d(), f("div", Le, [
        l("aside", {
          ref_key: "windowRef",
          ref: $,
          class: "bili-task-window",
          style: Se(x.value ? { position: "fixed", left: `${x.value.x}px`, top: `${x.value.y}px`, margin: "0" } : {}),
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
            l("div", $e, [
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
          l("div", Ee, [
            w.value || A.value.length > 0 ? (d(), f("section", Pe, [
              l("div", Be, [
                e[11] || (e[11] = l("strong", null, "关联任务", -1)),
                l("button", {
                  type: "button",
                  class: "bili-refresh-link-btn",
                  disabled: w.value,
                  onClick: W
                }, m(w.value ? "读取中…" : "刷新"), 9, Ue)
              ]),
              A.value.length ? (d(), f("ul", Oe, [
                (d(!0), f(we, null, he(A.value, (t) => (d(), f("li", {
                  key: t.id,
                  class: "bili-linked-item"
                }, [
                  l("button", {
                    type: "button",
                    class: "bili-complete-circle-btn",
                    title: "标记为完成",
                    onClick: (a) => ne(t)
                  }, " ○ ", 8, De),
                  l("div", Ne, [
                    l("span", {
                      class: "bili-linked-name",
                      title: t.task?.content || t.id,
                      onClick: (a) => U(Ce)(t.id)
                    }, m(t.task?.content || `任务 #${t.id}`), 9, We),
                    t.task?.due?.date ? (d(), f("small", Ae, " 📅 " + m(t.task.due.date), 1)) : h("", !0)
                  ])
                ]))), 128))
              ])) : w.value ? h("", !0) : (d(), f("p", Re, "暂无未完成的关联任务"))
            ])) : h("", !0),
            e[18] || (e[18] = l("h3", { class: "bili-create-heading" }, "创建任务", -1)),
            l("div", Xe, [
              v.value.cover ? (d(), f("img", {
                key: 0,
                src: v.value.cover.replace(/^http:/, "https:"),
                class: "bili-ref-cover",
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Ye)) : h("", !0),
              l("div", Fe, [
                l("strong", {
                  title: v.value.title
                }, m(v.value.title), 9, Ke),
                l("small", null, m(v.value.author ? `UP主: ${v.value.author}` : "") + " " + m(v.value.bvid || ""), 1)
              ])
            ]),
            l("div", qe, [
              l("div", ze, [
                e[12] || (e[12] = l("span", { class: "bili-selector-title" }, "📁 目标项目", -1)),
                Z(oe, {
                  modelValue: r.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (t) => r.value = t),
                  options: ue.value,
                  disabled: c.value || j.value,
                  placeholder: j.value ? "正在加载项目…" : "选择项目",
                  onChange: ve
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              l("div", He, [
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
            T.value ? (d(), f("p", Je, m(T.value), 1)) : h("", !0),
            l("form", {
              class: "bili-task-form",
              onSubmit: ye(fe, ["prevent"])
            }, [
              l("fieldset", { disabled: c.value }, [
                l("div", Qe, [
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
                l("div", Ze, [
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
                l("div", et, [
                  e[16] || (e[16] = l("label", { class: "bili-field-label" }, "截止日期", -1)),
                  l("button", {
                    ref_key: "dateAnchor",
                    ref: F,
                    type: "button",
                    class: "bili-task-date-button",
                    onClick: e[5] || (e[5] = (t) => _.value = !_.value)
                  }, " ▦ " + m(k.value ? k.value + (g.value ? " " + g.value : "") : "添加日期与时间"), 513),
                  _.value ? (d(), Q(xe, {
                    key: 0,
                    modelValue: k.value,
                    "onUpdate:modelValue": e[6] || (e[6] = (t) => k.value = t),
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
                  disabled: !S.value.trim() || !r.value || !B.value || j.value || c.value
                }, m(c.value ? "正在创建…" : "创建任务"), 9, tt)
              ], 8, Ge)
            ], 32)
          ])
        ], 4)
      ])) : h("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ Ie(it, [["__scopeId", "data-v-126e3703"]]);
export {
  ft as default
};
