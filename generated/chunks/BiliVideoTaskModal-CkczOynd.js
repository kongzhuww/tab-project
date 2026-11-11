import { d as ge, w as _e, B as we, x as he, o as d, j as Z, u as U, e as f, i as o, t as m, F as ye, g as Se, f as h, p as ee, h as Te, l as te, n as ie, z as xe, T as Ve, b as a, s as I } from "./vendor-vue-9b0eS4bW.js";
import { biliVideoTaskState as V, biliVideoTaskController as $ } from "./video-task-store-CrDKY7nD.js";
import { t as b, i as je } from "./todoist.service-By6xSyz1.js";
import { w as oe, t as le } from "./module-state-D4Dr89rP.js";
import { e as ae } from "./calendar.service-DnkbEAru.js";
import { openTodoistTask as Ce } from "./task-navigation-CvM3gAxl.js";
import { C as se, n as R } from "./view-styles-KV13C9x1.js";
import { T as Ie } from "./TodoistDatePickerPopover-D8yR_FLS.js";
import { a as $e } from "./bili-video-links-DXpyplJq.js";
import { t as Le, _ as Pe } from "./_plugin-vue_export-helper-BxikU0LD.js";
const Me = {
  key: 0,
  class: "bili-task-modal-overlay"
}, Ee = { class: "bili-task-header-actions" }, Be = ["disabled"], Ue = { class: "bili-task-body" }, Oe = {
  key: 0,
  class: "bili-linked-tasks-section"
}, De = { class: "bili-linked-header" }, Ne = ["disabled"], We = {
  key: 0,
  class: "bili-linked-list"
}, Ae = ["onClick"], Re = { class: "bili-linked-meta" }, Xe = ["title", "onClick"], Ye = {
  key: 0,
  class: "bili-linked-due"
}, Fe = {
  key: 1,
  class: "bili-no-linked"
}, Ke = { class: "bili-video-reference" }, ze = ["src"], He = { class: "bili-ref-info" }, Je = ["title"], qe = { class: "bili-destination-selector" }, Ge = { class: "bili-selector-field" }, Qe = { class: "bili-selector-field" }, Ze = {
  key: 1,
  class: "bili-task-feedback",
  role: "alert"
}, et = ["disabled"], tt = { class: "bili-field-group" }, it = { class: "bili-field-group" }, ot = { class: "bili-field-group" }, lt = ["disabled"], at = /* @__PURE__ */ ge({
  __name: "BiliVideoTaskModal",
  setup(st) {
    const L = a(null), j = a(null);
    let O = !1, X = 0, Y = 0, D = 0, N = 0;
    const y = a([]), P = a([]), r = a(""), u = a(""), C = a(!1), M = a(!1), S = a(""), E = a(""), k = a(""), g = a(""), F = a(null), _ = a(!1), B = a(!0), c = a(!1), T = a(""), x = a([]), w = a(!1), v = I(() => V.video), K = I(() => {
      const i = v.value;
      return i ? (i.bvid || i.aid || "").toString() : "";
    });
    function z(i) {
      return `bili_video_tasks_v1:${i}`;
    }
    function H(i) {
      if (!i) return [];
      try {
        const e = localStorage.getItem(z(i));
        if (!e) return [];
        const t = JSON.parse(e);
        return Array.isArray(t) ? t.filter((l) => typeof l == "string") : [];
      } catch {
        return [];
      }
    }
    function ne(i, e) {
      if (!i || !e) return;
      const t = H(i);
      t.includes(e) || (t.unshift(e), localStorage.setItem(z(i), JSON.stringify(t)));
    }
    async function W() {
      const i = K.value;
      if (!i) {
        x.value = [];
        return;
      }
      const e = H(i);
      if (!e.length) {
        x.value = [];
        return;
      }
      w.value = !0, x.value = e.map((t) => ({ id: t }));
      try {
        if (!await b.initToken()) {
          w.value = !1;
          return;
        }
        const l = async (s, p) => {
          try {
            const n = await b.api(`/tasks/${encodeURIComponent(s)}`);
            n && typeof n == "object" && String(n.id) === s && (x.value[p] = { id: s, task: n });
          } catch (n) {
            x.value[p] = { id: s, error: n?.message || "读取失败" };
          }
        };
        await Promise.allSettled(e.slice(0, 8).map((s, p) => l(s, p)));
      } finally {
        w.value = !1;
      }
    }
    const A = I(() => x.value.filter((i) => !i.task || !je(i.task)));
    async function re(i) {
      if (!i.task || c.value) return;
      const e = i.id;
      try {
        await oe(async () => {
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
    function de(i) {
      if (i.target.closest("button, a, input, select, textarea")) return;
      O = !0;
      const e = L.value;
      if (!e) return;
      const t = e.getBoundingClientRect();
      D = t.left, N = t.top, X = i.clientX, Y = i.clientY, j.value = { x: D, y: N };
      const l = (p) => {
        if (!O) return;
        const n = p.clientX - X, ke = p.clientY - Y;
        j.value = {
          x: Math.max(10, Math.min(window.innerWidth - 120, D + n)),
          y: Math.max(10, Math.min(window.innerHeight - 80, N + ke))
        };
      }, s = () => {
        O = !1, window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", s);
      };
      window.addEventListener("mousemove", l), window.addEventListener("mouseup", s);
    }
    function J(i) {
      if (i.key === "Escape" && V.isOpen) {
        if (_.value) {
          _.value = !1;
          return;
        }
        $.close();
      }
    }
    function q(i) {
      if (!(!V.isOpen || !L.value || _.value) && !L.value.contains(i.target)) {
        if (i.target?.closest(".fo-context-menu, .todoist-date-picker-popover")) return;
        $.close();
      }
    }
    async function ue() {
      C.value = !0;
      try {
        const i = await b.getProjects();
        y.value = (i || []).filter((t) => !t.is_deleted && !t.is_archived);
        const e = localStorage.getItem("bili_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
        if (e && y.value.some((t) => String(t.id) === e))
          r.value = e;
        else if (y.value.length > 0) {
          const t = y.value.find((l) => l.inbox_project || l.is_inbox_project || /^(Inbox|收件箱)$/i.test(l.name));
          r.value = String(t ? t.id : y.value[0].id);
        }
        r.value && await G(r.value);
      } catch (i) {
        T.value = "加载 Todoist 项目失败: " + (i?.message || "请检查登录状态");
      } finally {
        C.value = !1;
      }
    }
    async function G(i) {
      M.value = !0;
      try {
        const e = await b.getSections(i);
        P.value = (e || []).filter((l) => !!(l && l.id && l.name));
        const t = localStorage.getItem("bili_task_last_section_id");
        t && P.value.some((l) => String(l.id) === t) ? u.value = t : u.value = "";
      } catch {
        P.value = [], u.value = "";
      } finally {
        M.value = !1;
      }
    }
    function Q(i) {
      return !!(i.inbox_project || i.is_inbox_project || /^(Inbox|收件箱)$/i.test(i.name.trim()));
    }
    function ce(i) {
      return Q(i) ? Le("todoist.inbox") || "收件箱" : i.name;
    }
    const ve = I(() => y.value.map((i) => ({
      value: String(i.id),
      label: ce(i),
      icon: Q(i) ? "📥" : "📁"
    }))), pe = I(() => {
      const i = [
        { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
      ];
      return P.value.forEach((e) => {
        i.push({
          value: String(e.id),
          label: e.name,
          icon: "📑"
        });
      }), i;
    });
    async function fe(i) {
      r.value = String(i), localStorage.setItem("bili_task_last_project_id", r.value), u.value = "", localStorage.removeItem("bili_task_last_section_id"), await G(r.value);
    }
    function me(i) {
      u.value = String(i), u.value ? localStorage.setItem("bili_task_last_section_id", u.value) : localStorage.removeItem("bili_task_last_section_id");
    }
    _e(() => [V.isOpen, V.video], ([i, e]) => {
      if (i && e) {
        T.value = "";
        const t = e;
        S.value = `观看看视频: ${t.title}`;
        const l = t.author ? `UP主: ${t.author}
` : "", s = t.url ? `视频地址: ${t.url}
` : "";
        E.value = `${l}${s}`.trim(), k.value = "", g.value = "", ue(), W();
      }
    }, { immediate: !0 });
    async function be() {
      if (c.value || !S.value.trim() || !r.value || !B.value) return;
      const i = r.value, e = u.value || void 0, t = K.value, l = v.value, s = {
        content: S.value.trim(),
        description: E.value.trim(),
        project_id: i,
        section_id: e,
        due_string: k.value ? k.value + (g.value ? " " + g.value : "") : void 0
      };
      c.value = !0, T.value = "";
      try {
        await oe(async () => {
          if (!await b.initToken())
            throw new Error("请先登录 Todoist");
          const n = await b.createTask(s);
          if (!n || typeof n.id != "string")
            throw new Error("创建任务返回异常");
          t && ne(t, n.id), l && $e(n.id, {
            bvid: l.bvid || (t.startsWith("BV") ? t : ""),
            aid: l.aid,
            title: l.title,
            cover: l.cover,
            author: l.author,
            url: l.url || (l.bvid ? `https://www.bilibili.com/video/${l.bvid}` : "")
          }), b.invalidateWorkspaceSnapshots(), R.show({
            appName: "Todoist",
            appType: "todoist",
            title: "B站视频任务已创建",
            message: s.content,
            level: "success",
            target: { type: "todoist-task", taskId: n.id },
            actionLabel: "查看任务",
            duration: 7e3
          }), le.active && ae.loadWorkspace(void 0, void 0, !0), W(), $.close();
        });
      } catch (p) {
        T.value = p?.message || "创建任务失败，请检查网络或配置";
      } finally {
        c.value = !1;
      }
    }
    return we(() => {
      window.addEventListener("keydown", J), window.addEventListener("pointerdown", q, !0);
    }), he(() => {
      window.removeEventListener("keydown", J), window.removeEventListener("pointerdown", q, !0);
    }), (i, e) => (d(), Z(Ve, { to: "body" }, [
      U(V).isOpen && v.value ? (d(), f("div", Me, [
        o("aside", {
          ref_key: "windowRef",
          ref: L,
          class: "bili-task-window",
          style: xe(j.value ? { position: "fixed", left: `${j.value.x}px`, top: `${j.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": "创建 B站 视频任务"
        }, [
          o("header", {
            class: "bili-task-header",
            onMousedown: de
          }, [
            e[10] || (e[10] = o("div", { class: "bili-task-header-title" }, [
              o("span", { class: "bili-task-badge" }, "📺 视频任务"),
              o("small", null, "关联当前 B站 视频")
            ], -1)),
            o("div", Ee, [
              o("button", {
                type: "button",
                class: "bili-task-close-btn",
                title: "关闭 (Esc)",
                disabled: c.value,
                onClick: e[0] || (e[0] = //@ts-ignore
                (...t) => U($).close && U($).close(...t))
              }, " ✕ ", 8, Be)
            ])
          ], 32),
          o("div", Ue, [
            w.value || A.value.length > 0 ? (d(), f("section", Oe, [
              o("div", De, [
                e[11] || (e[11] = o("strong", null, "关联任务", -1)),
                o("button", {
                  type: "button",
                  class: "bili-refresh-link-btn",
                  disabled: w.value,
                  onClick: W
                }, m(w.value ? "读取中…" : "刷新"), 9, Ne)
              ]),
              A.value.length ? (d(), f("ul", We, [
                (d(!0), f(ye, null, Se(A.value, (t) => (d(), f("li", {
                  key: t.id,
                  class: "bili-linked-item"
                }, [
                  o("button", {
                    type: "button",
                    class: "bili-complete-circle-btn",
                    title: "标记为完成",
                    onClick: (l) => re(t)
                  }, " ○ ", 8, Ae),
                  o("div", Re, [
                    o("span", {
                      class: "bili-linked-name",
                      title: t.task?.content || t.id,
                      onClick: (l) => U(Ce)(t.id)
                    }, m(t.task?.content || `任务 #${t.id}`), 9, Xe),
                    t.task?.due?.date ? (d(), f("small", Ye, " 📅 " + m(t.task.due.date), 1)) : h("", !0)
                  ])
                ]))), 128))
              ])) : w.value ? h("", !0) : (d(), f("p", Fe, "暂无未完成的关联任务"))
            ])) : h("", !0),
            e[18] || (e[18] = o("h3", { class: "bili-create-heading" }, "创建任务", -1)),
            o("div", Ke, [
              v.value.cover ? (d(), f("img", {
                key: 0,
                src: v.value.cover.replace(/^http:/, "https:"),
                class: "bili-ref-cover",
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, ze)) : h("", !0),
              o("div", He, [
                o("strong", {
                  title: v.value.title
                }, m(v.value.title), 9, Je),
                o("small", null, m(v.value.author ? `UP主: ${v.value.author}` : "") + " " + m(v.value.bvid || ""), 1)
              ])
            ]),
            o("div", qe, [
              o("div", Ge, [
                e[12] || (e[12] = o("span", { class: "bili-selector-title" }, "📁 目标项目", -1)),
                ee(se, {
                  modelValue: r.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (t) => r.value = t),
                  options: ve.value,
                  disabled: c.value || C.value,
                  placeholder: C.value ? "正在加载项目…" : "选择项目",
                  onChange: fe
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ]),
              o("div", Qe, [
                e[13] || (e[13] = o("span", { class: "bili-selector-title" }, "📑 目标分组 (板块)", -1)),
                ee(se, {
                  modelValue: u.value,
                  "onUpdate:modelValue": e[2] || (e[2] = (t) => u.value = t),
                  options: pe.value,
                  disabled: c.value || M.value,
                  placeholder: M.value ? "正在加载板块…" : "(无分组 / 默认项目根)",
                  onChange: me
                }, null, 8, ["modelValue", "options", "disabled", "placeholder"])
              ])
            ]),
            T.value ? (d(), f("p", Ze, m(T.value), 1)) : h("", !0),
            o("form", {
              class: "bili-task-form",
              onSubmit: Te(be, ["prevent"])
            }, [
              o("fieldset", { disabled: c.value }, [
                o("div", tt, [
                  e[14] || (e[14] = o("label", {
                    for: "bili-task-title-input",
                    class: "bili-field-label"
                  }, "任务名称", -1)),
                  te(o("textarea", {
                    id: "bili-task-title-input",
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => S.value = t),
                    rows: "2",
                    maxlength: "500",
                    class: "bili-task-input",
                    placeholder: "要针对这个视频做什么？",
                    required: ""
                  }, null, 512), [
                    [ie, S.value]
                  ])
                ]),
                o("div", it, [
                  e[15] || (e[15] = o("label", {
                    for: "bili-task-desc-input",
                    class: "bili-field-label"
                  }, "描述", -1)),
                  te(o("textarea", {
                    id: "bili-task-desc-input",
                    "onUpdate:modelValue": e[4] || (e[4] = (t) => E.value = t),
                    rows: "3",
                    maxlength: "16000",
                    class: "bili-task-input",
                    placeholder: "记录目标、笔记或备忘（可选）"
                  }, null, 512), [
                    [ie, E.value]
                  ])
                ]),
                o("div", ot, [
                  e[16] || (e[16] = o("label", { class: "bili-field-label" }, "截止日期", -1)),
                  o("button", {
                    ref_key: "dateAnchor",
                    ref: F,
                    type: "button",
                    class: "bili-task-date-button",
                    onClick: e[5] || (e[5] = (t) => _.value = !_.value)
                  }, " ▦ " + m(k.value ? k.value + (g.value ? " " + g.value : "") : "添加日期与时间"), 513),
                  _.value ? (d(), Z(Ie, {
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
                e[17] || (e[17] = o("p", { class: "bili-task-local-note" }, "任务名称、描述和截止日期将同步提交至 Todoist，并在本地与该视频绑定。", -1)),
                o("button", {
                  type: "submit",
                  class: "bili-task-submit-btn",
                  disabled: !S.value.trim() || !r.value || !B.value || C.value || c.value
                }, m(c.value ? "正在创建…" : "创建任务"), 9, lt)
              ], 8, et)
            ], 32)
          ])
        ], 4)
      ])) : h("", !0)
    ]));
  }
}), kt = /* @__PURE__ */ Pe(at, [["__scopeId", "data-v-b38507a2"]]);
export {
  kt as default
};
