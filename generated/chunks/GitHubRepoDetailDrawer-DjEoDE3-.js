import { d as ae, C as oe, o as n, e as i, f as e, u as s, t as r, m as B, g as y, F as W, D as re, i as ue, l as Q, n as ee, c as ne, b as m, x as X, G as te, y as de, h as se, B as K, z as ce, A as ve } from "./vendor-vue-DokqDua_.js";
import { Z as pe, $ as f, a1 as me, p as a, A as Y, a2 as ge } from "./search.service-Du6XfCKa.js";
import { i as fe } from "./images-D5aKlHE6.js";
import { t as j } from "./todoist.service-DhWmfqf0.js";
import { n as he } from "./view-styles-BVg88bAF.js";
import { w as ye, t as ke } from "./module-state-BT0PQSND.js";
import { e as we } from "./calendar.service-CoUPYBch.js";
import { a as be, T as _e, r as Te, b as Ie } from "./TodoistDatePickerPopover-6I6RI501.js";
import { _ as ie } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { openTodoistTask as xe } from "./task-navigation-DnsZubWl.js";
const Ce = {
  class: "github-repository-tasks",
  "aria-label": "仓库任务创建栏"
}, Ee = ["disabled"], Se = { class: "task-pane-content" }, Le = { class: "repository-reference" }, $e = {
  key: 0,
  class: "task-guide"
}, Ae = {
  key: 1,
  class: "task-destination"
}, Me = {
  key: 2,
  class: "task-feedback",
  role: "alert"
}, Ne = {
  key: 3,
  class: "task-receipt"
}, Re = ["disabled"], De = ["disabled"], He = { key: 0 }, Oe = ["disabled"], Ve = ["disabled"], qe = /* @__PURE__ */ ae({
  __name: "GitHubRepositoryTasks",
  props: {
    repository: {}
  },
  emits: ["close", "openTask"],
  setup(F, { emit: $ }) {
    const k = F, b = $, w = pe(), _ = m(""), h = m(""), g = m(""), T = m(""), O = m(null), A = m(!1), S = m(!0), p = m(""), M = m(!1), R = m(!1), v = m(null), I = "github_task_attempt_v1:" + k.repository.fullName.toLowerCase();
    function D() {
      try {
        const d = localStorage.getItem(I);
        if (!d) return;
        const t = JSON.parse(d);
        if (!t || typeof t.requestId != "string" || typeof t.content != "string" || !t.target || typeof t.target.title != "string" || t.repository?.fullName !== k.repository.fullName || t.taskId !== void 0 && typeof t.taskId != "string") throw new Error();
        v.value = t, t.taskId && (R.value = Te(t.taskId).some((c) => c.fullName.toLowerCase() === k.repository.fullName.toLowerCase()));
      } catch {
        M.value = !0, p.value = "上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。";
      }
    }
    oe(D);
    async function Z() {
      if (f.saving || v.value || M.value || !_.value.trim() || !w.value || !S.value) return;
      const d = { ...w.value }, t = { ...k.repository }, c = { content: _.value.trim(), description: h.value.trim(), project_id: d.projectId, section_id: d.sectionId, due_string: g.value ? g.value + (T.value ? " " + T.value : "") : void 0 };
      f.saving = !0, p.value = "";
      try {
        if (!navigator.locks) throw new Error("当前环境不支持跨标签页提交保护，尚未发送。");
        await navigator.locks.request(I, { ifAvailable: !0 }, async (C) => {
          if (!C) throw new Error("另一个标签页正在创建这个仓库的任务，请稍后核对。");
          D(), !(v.value || M.value) && await ye(async () => {
            const N = await j.initToken(), L = await j.api("/sections/" + encodeURIComponent(d.sectionId));
            if (me(), document.hidden || !N || N !== j.getToken() || w.value?.sectionId !== d.sectionId || w.value?.projectId !== d.projectId) throw new Error("配置或页面状态已变化，尚未提交，请重新确认任务区。");
            if (!L || String(L.id) !== d.sectionId || String(L.project_id) !== d.projectId || L.is_deleted || L.is_archived) throw new Error("目标分组不存在、已归档或已移动，请在 Todoist 中重新指定任务区。");
            const E = { requestId: crypto.randomUUID(), repository: t, target: { ...d, title: L.name || d.title }, content: c.content };
            localStorage.setItem(I, JSON.stringify(E)), v.value = E;
            try {
              const l = await j.createTask(c, E.requestId);
              if (!l || typeof l.id != "string") throw new Error();
              E.taskId = l.id, v.value = { ...E };
              try {
                localStorage.setItem(I, JSON.stringify(E));
              } catch {
                p.value = "任务已创建，但本机回执保存失败，请记录任务地址；不要重复创建。";
              }
              j.invalidateWorkspaceSnapshots(), (String(l.project_id) !== d.projectId || String(l.section_id) !== d.sectionId) && (p.value = "任务已创建，但返回的分组与目标不一致，请核对任务地址；未重新提交。"), G(), he.show({
                appName: "Todoist",
                appType: "todoist",
                title: "任务已创建",
                message: E.content,
                level: "success",
                history: !0,
                target: { type: "todoist-task", taskId: l.id },
                actionLabel: "打开任务",
                duration: 7e3
              }), ke.active && we.loadWorkspace(void 0, void 0, !0);
            } catch {
              p.value = v.value?.taskId ? "任务已创建，但后续界面更新未完成，请使用任务地址核对；不要重复创建。" : "创建结果未确认，请核对原 Todoist 分组。已保留提交记录，未自动重试。";
            }
          });
        });
      } catch (C) {
        p.value = C instanceof Error && !v.value ? C.message : "本机提交记录保存失败，尚未发送创建请求。";
      } finally {
        f.saving = !1;
      }
    }
    function G() {
      const d = v.value;
      if (d?.taskId)
        try {
          Ie(d.taskId, d.repository), R.value = !0, p.value.startsWith("任务已创建，但仓库卡片保存失败") && (p.value = "");
        } catch {
          p.value = "任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。";
        }
    }
    async function z() {
      if (f.saving || !v.value) return !1;
      const d = v.value.requestId;
      f.saving = !0;
      try {
        if (!navigator.locks) throw new Error();
        return await navigator.locks.request(I, { ifAvailable: !0 }, async (t) => {
          if (!t)
            return p.value = "另一个标签页正在提交，请稍后核对。", !1;
          const c = localStorage.getItem(I), C = c ? JSON.parse(c) : null;
          return C && C.requestId !== d ? (D(), p.value = "其他标签页已更新提交记录，请先核对最新任务。", !1) : (localStorage.removeItem(I), v.value = null, p.value = "", !0);
        });
      } catch {
        return p.value = "本机提交记录无法更新，未解除保护。", !1;
      } finally {
        f.saving = !1;
      }
    }
    async function P() {
      await z() && (_.value = "", h.value = "", g.value = "", T.value = "", R.value = !1, S.value = !0);
    }
    return (d, t) => (n(), i("aside", Ce, [
      e("header", null, [
        t[9] || (t[9] = e("div", null, [
          e("strong", null, "创建任务"),
          e("small", null, "关联当前 GitHub 仓库")
        ], -1)),
        e("button", {
          type: "button",
          disabled: s(f).saving,
          "aria-label": "收起任务栏",
          onClick: t[0] || (t[0] = (c) => b("close"))
        }, "×", 8, Ee)
      ]),
      e("div", Se, [
        e("div", Le, [
          t[10] || (t[10] = e("span", null, "◇", -1)),
          e("div", null, [
            e("strong", null, r(F.repository.fullName), 1),
            e("small", null, r(F.repository.description || "创建后自动关联此仓库"), 1)
          ])
        ]),
        s(w) ? (n(), i("p", Ae, [
          t[11] || (t[11] = B("创建到 ", -1)),
          e("strong", null, r(s(w).title), 1),
          t[12] || (t[12] = e("small", null, "Todoist 分组 · 仅本机选择", -1))
        ])) : (n(), i("p", $e, "请先打开 Todoist，在目标分组的“更多”菜单中选择“设为 GitHub 任务区”。设置后即可在此创建。")),
        p.value ? (n(), i("p", Me, r(p.value), 1)) : y("", !0),
        v.value ? (n(), i("section", Ne, [
          v.value.taskId ? (n(), i(W, { key: 0 }, [
            t[13] || (t[13] = e("strong", null, "任务已创建", -1)),
            e("p", null, r(v.value.content), 1),
            e("button", {
              type: "button",
              class: "task-open-link",
              disabled: s(f).saving,
              onClick: t[1] || (t[1] = (c) => b("openTask", v.value.taskId))
            }, "在插件中打开任务 →", 8, Re),
            re(be, {
              "task-id": v.value.taskId
            }, null, 8, ["task-id"]),
            R.value ? (n(), i("button", {
              key: 1,
              type: "button",
              onClick: P
            }, "继续创建")) : (n(), i("button", {
              key: 0,
              type: "button",
              disabled: s(f).saving,
              onClick: G
            }, "仅重试仓库关联", 8, De))
          ], 64)) : (n(), i(W, { key: 1 }, [
            e("strong", null, r(s(f).saving ? "正在创建任务…" : "上次提交结果未确认"), 1),
            e("p", null, r(v.value.content), 1),
            s(f).saving ? (n(), i("small", He, "正在提交至“" + r(v.value.target.title) + "”，请稍候。", 1)) : (n(), i(W, { key: 1 }, [
              e("small", null, "请先在 Todoist 核对原分组“" + r(v.value.target.title) + "”。未自动重新提交，避免重复创建。", 1),
              e("button", {
                type: "button",
                onClick: z
              }, "我已核对，允许新建")
            ], 64))
          ], 64))
        ])) : s(w) ? (n(), i("form", {
          key: 4,
          onSubmit: ue(Z, ["prevent"])
        }, [
          e("fieldset", {
            disabled: s(f).saving || M.value
          }, [
            e("label", null, [
              t[14] || (t[14] = B("任务名称", -1)),
              Q(e("textarea", {
                "onUpdate:modelValue": t[2] || (t[2] = (c) => _.value = c),
                rows: "2",
                maxlength: "500",
                placeholder: "要在这个仓库上做什么？",
                required: ""
              }, null, 512), [
                [ee, _.value]
              ])
            ]),
            e("label", null, [
              t[15] || (t[15] = B("描述", -1)),
              Q(e("textarea", {
                "onUpdate:modelValue": t[3] || (t[3] = (c) => h.value = c),
                rows: "4",
                maxlength: "16000",
                placeholder: "记录目标、步骤或想法（可选）"
              }, null, 512), [
                [ee, h.value]
              ])
            ]),
            t[16] || (t[16] = e("label", null, "截止日期", -1)),
            e("button", {
              ref_key: "dateAnchor",
              ref: O,
              type: "button",
              class: "task-date-button",
              onClick: t[4] || (t[4] = (c) => A.value = !A.value)
            }, "▦ " + r(g.value ? g.value + (T.value ? " " + T.value : "") : "添加日期与时间"), 513),
            A.value ? (n(), ne(_e, {
              key: 0,
              modelValue: g.value,
              "onUpdate:modelValue": t[5] || (t[5] = (c) => g.value = c),
              "time-value": T.value,
              "onUpdate:timeValue": t[6] || (t[6] = (c) => T.value = c),
              "anchor-el": O.value,
              onTimeValidity: t[7] || (t[7] = (c) => S.value = c),
              onClose: t[8] || (t[8] = (c) => {
                A.value = !1, S.value = !0;
              })
            }, null, 8, ["modelValue", "time-value", "anchor-el"])) : y("", !0),
            t[17] || (t[17] = e("p", { class: "task-local-note" }, "名称、描述和截止日期提交至 Todoist；仓库卡片只保存在本插件。", -1)),
            e("button", {
              type: "submit",
              class: "create-task",
              disabled: !_.value.trim() || !S.value
            }, r(s(f).saving ? "正在创建…" : "创建任务"), 9, Ve)
          ], 8, Oe)
        ], 32)) : y("", !0)
      ])
    ]));
  }
}), Ue = /* @__PURE__ */ ie(qe, [["__scopeId", "data-v-953bd71a"]]), Ge = {
  key: 0,
  class: "gh-modal-overlay"
}, Pe = ["aria-label"], je = { class: "gh-modal-title-wrap" }, Be = ["href"], We = { class: "gh-owner" }, Fe = { class: "gh-name" }, ze = { class: "gh-modal-actions" }, Je = {
  key: 0,
  class: "gh-status-tip"
}, Xe = ["aria-expanded", "disabled"], Ye = ["disabled"], Ze = { class: "gh-modal-content" }, Ke = { class: "gh-repository-content" }, Qe = { class: "gh-modal-ribbon" }, et = { class: "gh-meta-badges" }, tt = {
  key: 0,
  class: "gh-meta-item gh-meta-zh",
  title: "当前已优先加载中文版 README"
}, st = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, at = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, ot = {
  key: 1,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, nt = {
  key: 2,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, it = {
  key: 3,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, lt = {
  key: 0,
  class: "gh-modal-desc"
}, rt = {
  key: 1,
  class: "gh-modal-topics"
}, ut = { class: "gh-modal-body" }, dt = {
  key: 0,
  class: "gh-status-tip"
}, ct = { class: "gh-toc-title" }, vt = { class: "gh-toc-arrow" }, pt = { class: "gh-toc-list" }, mt = ["onClick"], gt = { class: "gh-toc-text" }, ft = {
  key: 2,
  class: "gh-readme-loading"
}, ht = {
  key: 3,
  class: "gh-readme-error"
}, yt = ["href"], kt = {
  key: 4,
  class: "gh-readme-loading"
}, wt = ["innerHTML"], bt = /* @__PURE__ */ ae({
  __name: "GitHubRepoDetailDrawer",
  setup(F) {
    const $ = m(""), k = m(!1), b = m(!1);
    X(() => a.fullName, () => {
      b.value = !1;
    }), X(b, async () => {
      if (await te(), !h.value || !_.value) return;
      const l = _.value.getBoundingClientRect().width;
      h.value = { ...h.value, x: Math.max(10, Math.min(h.value.x, window.innerWidth - l - 10)) };
    });
    const w = m(null), _ = m(null), h = m(null), g = m(!document.hidden);
    let T = !0, O = 0, A = 0, S, p = () => {
    }, M = !1, R = 0, v = 0, I = 0, D = 0;
    function Z(l) {
      if (l.target.closest("button, a, input")) return;
      p();
      const o = _.value;
      if (!o || !a.isOpen || !g.value) return;
      M = !0;
      const u = o.getBoundingClientRect();
      I = u.left, D = u.top, R = l.clientX, v = l.clientY, h.value = { x: I, y: D };
      const H = (V) => {
        if (!M) return;
        const J = V.clientX - R, q = V.clientY - v;
        h.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, I + J)),
          y: Math.max(10, Math.min(window.innerHeight - 80, D + q))
        };
      }, x = () => {
        M = !1, window.removeEventListener("mousemove", H), window.removeEventListener("mouseup", x);
      };
      p = x, window.addEventListener("mousemove", H), window.addEventListener("mouseup", x);
    }
    function G() {
      Y.close();
    }
    function z(l) {
      f.saving || (Y.close(), xe(l));
    }
    function P(l) {
      l.key === "Escape" && a.isOpen && G();
    }
    async function d(l, o) {
      if (!a.isOpen || !g.value) return;
      const u = O, H = ++A, x = () => a.isOpen && g.value && O === u && H === A;
      clearTimeout(S);
      try {
        await navigator.clipboard.writeText(l), x() && ($.value = `已复制 ${o}`);
      } catch {
        x() && ($.value = "复制未确认");
      }
      x() && (S = setTimeout(() => {
        x() && ($.value = "");
      }, 2e3));
    }
    function t(l) {
      const u = l.target?.closest("img");
      u && u.src && (l.preventDefault(), l.stopPropagation(), fe.open({ source: u.src, title: u.alt || "图片预览" }));
    }
    function c(l) {
      if (!w.value) return;
      const o = w.value.querySelectorAll("h1, h2, h3");
      for (const u of Array.from(o))
        if (u.textContent?.trim().includes(l.text)) {
          u.scrollIntoView({ behavior: "smooth", block: "start" }), k.value = !1;
          break;
        }
    }
    X(
      () => [a.readmeHtml, a.isOpen, g.value, a.revision],
      async ([l, o, u], H, x) => {
        let V = !1, J = 0;
        x(() => {
          V = !0, cancelAnimationFrame(J);
        }), !(!l || !o || !u) && (await te(), !V && (J = requestAnimationFrame(() => {
          V || !a.isOpen || !g.value || w.value?.querySelectorAll("pre").forEach((q) => {
            if (q.querySelector(".gh-code-copy-btn")) return;
            const U = document.createElement("button");
            U.type = "button", U.className = "gh-code-copy-btn", U.title = "复制代码", U.innerText = "复制", U.addEventListener("click", (le) => {
              le.stopPropagation(), d(q.querySelector("code")?.innerText || "", "代码");
            }), q.style.position = "relative", q.appendChild(U);
          });
        })));
      }
    );
    function C() {
      ++O, ++A, clearTimeout(S), $.value = "", k.value = !1, p();
    }
    X(() => [a.revision, a.isOpen, g.value], () => {
      C(), window.removeEventListener("keydown", P), a.isOpen && g.value && window.addEventListener("keydown", P);
    }, { immediate: !0, flush: "sync" });
    function N() {
      g.value = T && !document.hidden, Y.setPageActive(g.value);
    }
    function L() {
      T = !1, N();
    }
    function E() {
      T = !0, N();
    }
    return oe(() => {
      document.addEventListener("visibilitychange", N), window.addEventListener("pagehide", L), window.addEventListener("pageshow", E), N();
    }), de(() => {
      C(), Y.setPageActive(!1), window.removeEventListener("keydown", P), document.removeEventListener("visibilitychange", N), window.removeEventListener("pagehide", L), window.removeEventListener("pageshow", E);
    }), (l, o) => s(a).isOpen ? (n(), i("div", Ge, [
      e("div", {
        ref_key: "windowRef",
        ref: _,
        class: K(["gh-modal-window", { "has-task-pane": b.value }]),
        style: ve(h.value ? { position: "fixed", left: `${h.value.x}px`, top: `${h.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": s(a).fullName
      }, [
        e("header", {
          class: "gh-modal-header",
          onMousedown: Z
        }, [
          e("div", je, [
            o[5] || (o[5] = e("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            e("a", {
              href: s(a).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              e("span", We, r(s(a).owner), 1),
              o[3] || (o[3] = e("span", { class: "gh-sep" }, "/", -1)),
              e("strong", Fe, r(s(a).repo), 1),
              o[4] || (o[4] = e("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, Be)
          ]),
          e("div", ze, [
            $.value ? (n(), i("span", Je, r($.value), 1)) : y("", !0),
            e("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              "aria-expanded": b.value,
              disabled: s(f).saving,
              onClick: o[0] || (o[0] = (u) => b.value = !b.value)
            }, "任务", 8, Xe),
            e("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: s(f).saving,
              title: "关闭视窗 (Esc)",
              onClick: G
            }, " ✕ ", 8, Ye)
          ])
        ], 32),
        e("div", Ze, [
          e("div", Ke, [
            e("div", Qe, [
              e("div", et, [
                s(a).isZh ? (n(), i("span", tt, " 🇨🇳 中文版 ")) : y("", !0),
                e("span", st, [
                  o[6] || (o[6] = B(" ★ ", -1)),
                  e("strong", null, r(s(a).stars.toLocaleString()), 1)
                ]),
                e("span", at, [
                  o[7] || (o[7] = B(" ⌥ ", -1)),
                  e("strong", null, r(s(a).forks.toLocaleString()), 1)
                ]),
                s(a).language ? (n(), i("span", ot, " 💻 " + r(s(a).language), 1)) : y("", !0),
                s(a).license ? (n(), i("span", nt, " 📄 " + r(s(a).license), 1)) : y("", !0),
                s(a).pushedAt ? (n(), i("span", it, " ⏱ " + r(s(ge)(s(a).pushedAt)), 1)) : y("", !0)
              ]),
              s(a).description ? (n(), i("p", lt, r(s(a).description), 1)) : y("", !0),
              s(a).topics.length ? (n(), i("div", rt, [
                (n(!0), i(W, null, se(s(a).topics, (u) => (n(), i("span", {
                  key: u,
                  class: "gh-topic-tag"
                }, " #" + r(u), 1))), 128))
              ])) : y("", !0)
            ]),
            e("main", ut, [
              s(a).notice ? (n(), i("p", dt, r(s(a).notice), 1)) : y("", !0),
              s(a).headings.length > 0 ? (n(), i("aside", {
                key: 1,
                class: K(["gh-modal-toc", { "is-open": k.value }])
              }, [
                e("div", {
                  class: "gh-toc-header",
                  onClick: o[1] || (o[1] = (u) => k.value = !k.value)
                }, [
                  o[8] || (o[8] = e("span", { class: "gh-toc-icon" }, "📑", -1)),
                  e("span", ct, "目录大纲 (" + r(s(a).headings.length) + ")", 1),
                  e("span", vt, r(k.value ? "▲" : "▼"), 1)
                ]),
                Q(e("ul", pt, [
                  (n(!0), i(W, null, se(s(a).headings, (u, H) => (n(), i("li", {
                    key: H,
                    class: K(["gh-toc-item", `level-${u.level}`]),
                    onClick: (x) => c(u)
                  }, [
                    o[9] || (o[9] = e("span", { class: "gh-toc-bullet" }, "·", -1)),
                    e("span", gt, r(u.text), 1)
                  ], 10, mt))), 128))
                ], 512), [
                  [ce, k.value]
                ])
              ], 2)) : y("", !0),
              s(a).isLoading ? (n(), i("div", ft, [
                o[10] || (o[10] = e("div", { class: "gh-spinner" }, null, -1)),
                e("span", null, "正在获取并排版 " + r(s(a).fullName) + " 的 README.md …", 1)
              ])) : s(a).error ? (n(), i("div", ht, [
                o[11] || (o[11] = e("span", { class: "gh-error-icon" }, "⚠️", -1)),
                e("p", null, r(s(a).error), 1),
                e("a", {
                  href: s(a).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, yt)
              ])) : s(a).hasReadme && !s(a).readmeMarkdown ? (n(), i("p", kt, "README 内容为空。")) : (n(), i("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: w,
                class: "gh-readme-rendered obsidian-markdown-rendered allow-copy",
                innerHTML: s(a).readmeHtml,
                onClick: t
              }, null, 8, wt))
            ])
          ]),
          b.value ? (n(), ne(Ue, {
            key: s(a).fullName,
            repository: { fullName: s(a).fullName, description: s(a).description, stars: s(a).stars, language: s(a).language, updated: s(a).pushedAt },
            onClose: o[2] || (o[2] = (u) => b.value = !1),
            onOpenTask: z
          }, null, 8, ["repository"])) : y("", !0)
        ])
      ], 14, Pe)
    ])) : y("", !0);
  }
}), Mt = /* @__PURE__ */ ie(bt, [["__scopeId", "data-v-76439878"]]);
export {
  Mt as default
};
