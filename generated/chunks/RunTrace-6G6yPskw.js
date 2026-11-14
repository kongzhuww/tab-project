import { d as Z, w as B, B as D, K as $, o as n, e as l, i as s, t as c, A as q, m as F, l as J, R as O, F as I, g as R, f as k, b as g, s as T } from "./vendor-vue-BkY5-p5y.js";
import { m as A } from "./multica.service-C7XZpV6O.js";
import { _ as U } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const j = { class: "trace-section" }, K = { class: "trace-head" }, W = ["aria-expanded"], G = {
  key: 0,
  class: "trace-panel"
}, H = { class: "toolbar" }, P = ["value"], Q = ["disabled"], X = {
  key: 0,
  class: "error",
  role: "alert"
}, Y = {
  key: 1,
  class: "placeholder"
}, ee = {
  key: 2,
  class: "placeholder"
}, te = { class: "entry-label" }, ae = {
  key: 3,
  class: "entry"
}, se = /* @__PURE__ */ Z({
  __name: "RunTrace",
  props: {
    issueId: {},
    active: { type: Boolean }
  },
  setup(N) {
    const p = N, i = g(!1), u = g([]), d = g(""), h = g([]), o = g(!1), v = g("");
    let _ = 0, w;
    const y = T(() => u.value.find((e) => e.id === d.value)), C = T(() => h.value.filter((e) => ["tool_use", "tool_result", "text", "error"].includes(e.type || "")));
    function b(e) {
      return e.replace(/(Bearer\s+)[A-Za-z0-9._~+\/-]+/gi, "$1[已隐藏]").replace(/((?:api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|authorization)\s*[=:]\s*[\"']?)[^\s\"',;]+/gi, "$1[已隐藏]").replace(/\b(?:sk-[A-Za-z0-9_-]{12,}|mul_[A-Za-z0-9_-]{12,}|mat_[A-Za-z0-9_-]{12,})\b/g, "[已隐藏]").slice(0, 8e3);
    }
    function x(e) {
      if (e == null) return "";
      if (typeof e == "string") {
        if (e.startsWith("{"))
          try {
            const t = JSON.parse(e);
            if (typeof t?.structuredContent?.output == "string") return b(t.structuredContent.output);
          } catch {
          }
        return b(e);
      }
      if (typeof e == "object") {
        const t = e;
        return typeof t.command == "string" ? b(t.command) : b(JSON.stringify(e, (a, r) => /token|password|secret|api.?key|authorization/i.test(a) ? "[已隐藏]" : r, 2));
      }
      return b(String(e));
    }
    function V(e) {
      return e.type === "tool_use" ? `› ${e.tool || "工具调用"}` : e.type === "tool_result" ? "↳ 输出" : e.type === "error" ? "! 错误" : "● 回复";
    }
    function E(e) {
      return x(e.type === "tool_use" ? e.input : e.type === "tool_result" ? e.output : e.content);
    }
    function m() {
      _++, w && clearTimeout(w), w = void 0;
    }
    async function f() {
      if (!i.value || !p.active || document.visibilityState !== "visible") return;
      m();
      const e = _;
      o.value = !0, v.value = "";
      try {
        const t = p.issueId, a = await A.issueRuns(t);
        if (e !== _) return;
        if (u.value = [...a].sort((r, z) => (z.created_at || z.started_at || "").localeCompare(r.created_at || r.started_at || "")), u.value.some((r) => r.id === d.value) || (d.value = u.value[0]?.id || ""), d.value) {
          const r = await A.runMessages(d.value);
          if (e !== _) return;
          h.value = r;
        } else h.value = [];
        y.value && ["queued", "dispatched", "running", "waiting_local_directory"].includes(y.value.status) && (w = setTimeout(() => {
          f();
        }, 7e3));
      } catch (t) {
        e === _ && (v.value = t instanceof Error ? t.message : "执行记录读取失败");
      } finally {
        e === _ && (o.value = !1);
      }
    }
    function L() {
      i.value = !i.value, i.value ? f() : (m(), o.value = !1);
    }
    function M() {
      h.value = [], f();
    }
    B(() => p.issueId, () => {
      m(), d.value = "", u.value = [], h.value = [], v.value = "", o.value = !1, i.value && p.active && f();
    }), B(() => p.active, (e) => {
      e ? i.value && f() : (m(), o.value = !1);
    });
    function S() {
      document.visibilityState !== "visible" ? (m(), o.value = !1) : i.value && p.active && f();
    }
    return D(() => document.addEventListener("visibilitychange", S)), $(() => {
      m(), document.removeEventListener("visibilitychange", S);
    }), (e, t) => (n(), l("section", j, [
      s("div", K, [
        t[1] || (t[1] = s("div", null, [
          s("strong", null, "执行过程"),
          s("small", null, "真实运行记录 · 可随时收起")
        ], -1)),
        s("button", {
          type: "button",
          "aria-expanded": i.value,
          onClick: L
        }, c(i.value ? "隐藏操作" : "显示操作"), 9, W)
      ]),
      i.value ? (n(), l("div", G, [
        s("div", H, [
          s("span", null, [
            s("span", {
              class: q(["indicator", { running: y.value?.status === "running" }])
            }, null, 2),
            F(" " + c(y.value?.status || "暂无运行"), 1)
          ]),
          u.value.length > 1 ? J((n(), l("select", {
            key: 0,
            "onUpdate:modelValue": t[0] || (t[0] = (a) => d.value = a),
            "aria-label": "选择运行记录",
            onChange: M
          }, [
            (n(!0), l(I, null, R(u.value, (a) => (n(), l("option", {
              key: a.id,
              value: a.id
            }, c(a.created_at ? new Date(a.created_at).toLocaleString() : a.id.slice(0, 8)) + " · " + c(a.status), 9, P))), 128))
          ], 544)), [
            [O, d.value]
          ]) : k("", !0),
          s("button", {
            type: "button",
            disabled: o.value,
            onClick: f
          }, c(o.value ? "读取中…" : "刷新"), 9, Q)
        ]),
        t[3] || (t[3] = s("p", { class: "warning" }, "记录可能包含路径、命令或敏感信息；已做基础遮盖，但不能保证完全脱敏。运行中的记录约每 7 秒刷新。", -1)),
        v.value ? (n(), l("p", X, c(v.value) + "（已暂停自动刷新，可手动重试）", 1)) : k("", !0),
        !u.value.length && !o.value && !v.value ? (n(), l("p", Y, "这条任务还没有运行记录。")) : u.value.length && !C.value.length && !o.value && !v.value ? (n(), l("p", ee, "该次运行暂无可展示的操作。")) : k("", !0),
        (n(!0), l(I, null, R(C.value, (a, r) => (n(), l("div", {
          key: a.seq ?? r,
          class: "entry"
        }, [
          s("div", te, c(V(a)), 1),
          s("pre", null, c(E(a) || "（无文本）"), 1)
        ]))), 128)),
        y.value?.error ? (n(), l("div", ae, [
          t[2] || (t[2] = s("div", { class: "entry-label fail" }, "! 运行错误", -1)),
          s("pre", null, c(x(y.value.error)), 1)
        ])) : k("", !0)
      ])) : k("", !0)
    ]));
  }
}), oe = /* @__PURE__ */ U(se, [["__scopeId", "data-v-272a7d6d"]]);
export {
  oe as default
};
