import { t as B, a as $ } from "./todoist.service-ygsqjft3.js";
import { B as F, t as M } from "./board-filters-CoIYPE2A.js";
import { L as O } from "./MulticaDialog-B8YIPz1e.js";
import { d as R, B as z, K as D, o as n, e as i, i as l, m as P, t as v, p as L, f as m, F as N, g as V, b as f, s as C } from "./vendor-vue-BkY5-p5y.js";
import { _ as K } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const U = {
  class: "todo-panel",
  "aria-label": "Todoist 待办"
}, G = { class: "toolbar" }, H = { class: "toolbar-actions" }, J = ["disabled"], Q = { class: "task-list" }, W = {
  key: 0,
  class: "hint"
}, X = {
  key: 1,
  class: "error",
  role: "alert"
}, Y = {
  key: 2,
  class: "error",
  role: "status"
}, Z = {
  key: 3,
  class: "hint"
}, ee = { class: "task-body" }, te = { key: 0 }, oe = { class: "task-meta" }, le = { key: 0 }, ae = /* @__PURE__ */ R({
  __name: "TodoistPanel",
  emits: ["close"],
  setup(se, { emit: q }) {
    const A = q, b = f([]), _ = f([]), y = f([]), r = f(""), c = f(""), p = f(!1), g = f(""), h = f("");
    let u = null, d = 0;
    const k = C(() => b.value.flatMap((t) => {
      const e = String(t.id), o = t.inbox_project || t.is_inbox_project ? "收件箱" : t.name, s = [{ id: `all|${e}`, label: o, group: "项目 · 全部任务", projectId: e, sectionId: null }];
      if (e === r.value) {
        s.push({ id: `default|${e}`, label: "默认板块", group: o, projectId: e, sectionId: "" });
        for (const a of _.value) s.push({ id: `section|${e}|${a.id}`, label: a.name, group: o, projectId: e, sectionId: String(a.id) });
      }
      return s;
    })), S = C(() => k.value.find((t) => t.id === c.value)), T = C(() => {
      const t = S.value;
      return !t || t.projectId !== r.value ? [] : M(y.value, t.sectionId);
    });
    async function I(t, e = `all|${t}`) {
      u?.abort();
      const o = new AbortController();
      u = o;
      const s = ++d;
      r.value = t, c.value = e, _.value = [], y.value = [], p.value = !0, g.value = "", h.value = "";
      try {
        const [a, w] = await Promise.allSettled([B.getTasksByProject(t, o.signal), B.getSections(t, o.signal)]);
        if (s !== d || o.signal.aborted) return;
        a.status === "fulfilled" ? y.value = a.value : g.value = $(a.reason), w.status === "fulfilled" ? _.value = w.value : h.value = "项目板块读取失败，可刷新重试。";
      } finally {
        s === d && (p.value = !1, u = null);
      }
    }
    async function j() {
      u?.abort();
      const t = new AbortController();
      u = t;
      const e = ++d;
      p.value = !0, g.value = "", h.value = "";
      try {
        if (await B.initToken(), e !== d || t.signal.aborted) return;
        const o = await B.getProjects(t.signal);
        if (e !== d || t.signal.aborted) return;
        b.value = o.filter((a) => !a.is_archived && !a.is_deleted);
        const s = b.value.find((a) => a.inbox_project || a.is_inbox_project) || b.value[0];
        if (s) {
          await I(String(s.id));
          return;
        }
        c.value = "", r.value = "", y.value = [], _.value = [];
      } catch (o) {
        e === d && !t.signal.aborted && (g.value = $(o));
      } finally {
        e === d && (p.value = !1, u = null);
      }
    }
    function E(t) {
      const e = k.value.find((o) => o.id === t);
      e && (e.projectId !== r.value ? I(e.projectId, e.id) : c.value = e.id);
    }
    function x(t, e) {
      e !== "local" || !Object.prototype.hasOwnProperty.call(t, "todoistToken") || (d++, u?.abort(), u = null, b.value = [], _.value = [], y.value = [], r.value = "", c.value = "", j());
    }
    return z(() => {
      typeof chrome < "u" && chrome.storage?.onChanged?.addListener(x), j();
    }), D(() => {
      d++, u?.abort(), u = null, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(x);
    }), (t, e) => (n(), i("aside", U, [
      l("header", null, [
        e[3] || (e[3] = l("div", null, [
          l("strong", null, [
            l("span", { class: "todo-logo" }, "✓"),
            P(" Todoist 待办")
          ]),
          l("small", null, "只读查看项目和板块")
        ], -1)),
        l("button", {
          type: "button",
          class: "close",
          "aria-label": "关闭侧栏",
          onClick: e[0] || (e[0] = (o) => A("close"))
        }, "✕")
      ]),
      l("div", G, [
        l("strong", null, v(S.value?.label || "选择板块"), 1),
        l("div", H, [
          l("button", {
            type: "button",
            class: "refresh",
            disabled: p.value,
            title: "刷新",
            onClick: e[1] || (e[1] = (o) => r.value ? I(r.value, c.value) : j())
          }, "↻", 8, J),
          L(F, {
            options: k.value,
            selected: c.value,
            disabled: !k.value.length,
            onSelect: E
          }, null, 8, ["options", "selected", "disabled"])
        ])
      ]),
      l("div", Q, [
        p.value ? (n(), i("p", W, [
          L(O, { label: "正在读取板块" })
        ])) : m("", !0),
        g.value ? (n(), i("p", X, [
          P(v(g.value) + " ", 1),
          l("button", {
            type: "button",
            onClick: e[2] || (e[2] = (o) => r.value ? I(r.value, c.value) : j())
          }, "重试")
        ])) : m("", !0),
        h.value ? (n(), i("p", Y, v(h.value), 1)) : m("", !0),
        !p.value && !g.value && !T.value.length ? (n(), i("p", Z, v(b.value.length ? "该板块暂无未完成任务。" : "暂无可用项目。"), 1)) : m("", !0),
        (n(!0), i(N, null, V(T.value, (o) => (n(), i("article", {
          key: o.id,
          class: "task-card"
        }, [
          e[4] || (e[4] = l("span", {
            class: "task-circle",
            "aria-hidden": "true"
          }, null, -1)),
          l("div", ee, [
            l("strong", null, v(o.content), 1),
            o.description ? (n(), i("p", te, v(o.description), 1)) : m("", !0),
            l("div", oe, [
              o.due?.date ? (n(), i("span", le, "◷ " + v(o.due.string || o.due.date), 1)) : m("", !0),
              (n(!0), i(N, null, V((o.labels || []).slice(0, 3), (s) => (n(), i("span", { key: s }, "#" + v(s), 1))), 128))
            ])
          ])
        ]))), 128))
      ]),
      e[5] || (e[5] = l("footer", null, "仅查看，不会修改 Todoist 或发送给助手。每个项目最多显示 200 条。", -1))
    ]));
  }
}), ce = /* @__PURE__ */ K(ae, [["__scopeId", "data-v-dd61eae4"]]);
export {
  ce as default
};
