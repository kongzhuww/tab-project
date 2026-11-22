import { d as T, w as q, x as k, f as n, l as B, u as d, g as o, h as e, p as M, v as P, F as R, i as S, q as _, t as u, j as m, m as f, k as V, T as N, b as h, s as g } from "./vendor-vue-C-_ocEUS.js";
import { i as K, _ as $ } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { k as a, l as c, m as z } from "./main-Bo0A62Do.js";
const A = {
  class: "lw-cmd-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "全局命令中心"
}, F = { class: "lw-cmd-input-bar" }, O = ["data-index", "onMouseenter", "onClick"], U = { class: "lw-cmd-item-main" }, j = { class: "lw-cmd-title" }, L = {
  key: 0,
  class: "lw-cmd-desc"
}, Q = { class: "lw-cmd-item-meta" }, G = {
  key: 0,
  class: "lw-cmd-running-dot"
}, H = {
  key: 1,
  class: "lw-cmd-enter-hint"
}, J = {
  key: 1,
  class: "lw-cmd-empty"
}, W = { class: "lw-cmd-footer" }, X = { class: "lw-cmd-footer-stats" }, Y = /* @__PURE__ */ T({
  __name: "CommandPalette",
  setup(Z) {
    const p = h(null), v = h(null), w = g({
      get: () => a.query,
      set: (t) => c.setQuery(t)
    }), r = g(() => z.search(a.query, 40));
    q(
      () => a.isOpen,
      (t) => {
        t && k(() => {
          p.value?.focus(), p.value?.select();
        });
      }
    );
    function x() {
      a.selectedIndex = 0;
    }
    function C(t) {
      if (K(t)) return;
      const s = r.value.length;
      if (t.key === "ArrowDown")
        t.preventDefault(), c.selectNext(s), y();
      else if (t.key === "ArrowUp")
        t.preventDefault(), c.selectPrev(s), y();
      else if (t.key === "Enter") {
        t.preventDefault();
        const l = r.value[a.selectedIndex];
        l && c.executeCommand(l);
      } else t.key === "Escape" && (t.preventDefault(), c.close());
    }
    function y() {
      k(() => {
        const t = v.value;
        if (!t) return;
        const s = t.querySelector(`.lw-cmd-item[data-index="${a.selectedIndex}"]`);
        s && s.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
    function b(t) {
      c.executeCommand(t);
    }
    function I() {
      c.close();
    }
    function D(t) {
      switch (t) {
        case "界面":
          return "cat-ui";
        case "音乐":
          return "cat-music";
        case "待办":
          return "cat-todoist";
        case "系统":
          return "cat-system";
        case "通知":
          return "cat-notify";
        case "课表":
          return "cat-schedule";
        case "天气":
          return "cat-weather";
        case "壁纸":
          return "cat-wallpaper";
        default:
          return "cat-default";
      }
    }
    return (t, s) => (n(), B(N, { to: "body" }, [
      d(a).isOpen ? (n(), o("div", {
        key: 0,
        class: "lw-cmd-overlay",
        onMousedown: V(I, ["self"])
      }, [
        e("div", A, [
          e("div", F, [
            s[1] || (s[1] = e("span", {
              class: "lw-cmd-search-icon",
              "aria-hidden": "true"
            }, "⌕", -1)),
            M(e("input", {
              ref_key: "inputRef",
              ref: p,
              type: "text",
              class: "lw-cmd-input",
              placeholder: "搜索全局功能、工具操作或输入命令关键词…",
              "onUpdate:modelValue": s[0] || (s[0] = (l) => w.value = l),
              onInput: x,
              onKeydown: C,
              autocomplete: "off",
              spellcheck: "false"
            }, null, 544), [
              [P, w.value]
            ]),
            s[2] || (s[2] = e("kbd", { class: "lw-cmd-badge" }, "ESC 关闭", -1))
          ]),
          e("div", {
            class: "lw-cmd-list-wrap",
            ref_key: "listRef",
            ref: v
          }, [
            r.value.length > 0 ? (n(!0), o(R, { key: 0 }, S(r.value, (l, i) => (n(), o("div", {
              key: l.id,
              class: _(["lw-cmd-item", { "is-selected": i === d(a).selectedIndex }]),
              "data-index": i,
              onMouseenter: (E) => d(a).selectedIndex = i,
              onClick: (E) => b(l)
            }, [
              e("div", U, [
                e("span", {
                  class: _(["lw-cmd-category-tag", D(l.category)])
                }, u(l.category), 3),
                e("span", j, u(l.title), 1),
                l.description ? (n(), o("span", L, u(l.description), 1)) : m("", !0)
              ]),
              e("div", Q, [
                l.running ? (n(), o("span", G, "执行中…")) : m("", !0),
                i === d(a).selectedIndex ? (n(), o("kbd", H, "↵ 执行")) : m("", !0)
              ])
            ], 42, O))), 128)) : (n(), o("div", J, [...s[3] || (s[3] = [
              e("span", { style: { "font-size": "26px" } }, "🔍", -1),
              e("p", null, "未找到匹配的命令或操作", -1),
              e("small", null, "尝试搜索如“音乐”、“待办”、“刷新”、“课表”或“开屏”", -1)
            ])]))
          ], 512),
          e("footer", W, [
            s[4] || (s[4] = e("div", { class: "lw-cmd-footer-tips" }, [
              e("span", null, [
                e("kbd", null, "↑"),
                e("kbd", null, "↓"),
                f(" 移动选择")
              ]),
              e("span", null, [
                e("kbd", null, "↵"),
                f(" 执行操作")
              ]),
              e("span", null, [
                e("kbd", null, "Ctrl+K"),
                f(" 唤出面板")
              ])
            ], -1)),
            e("div", X, " 共 " + u(r.value.length) + " 项操作可用 ", 1)
          ])
        ])
      ], 32)) : m("", !0)
    ]));
  }
}), le = /* @__PURE__ */ $(Y, [["__scopeId", "data-v-27cb2a2a"]]);
export {
  le as default
};
