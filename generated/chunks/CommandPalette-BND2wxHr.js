import { f as T, w as q, n as k, g as n, I as B, x as i, h as o, i as e, q as M, v as P, F as R, z as S, s as _, t as u, u as m, j as p, k as V, T as N, b as h, c as g } from "./vendor-vue-BUkfvXUI.js";
import { g as a, h as c, i as z } from "./main-DibL9Sag.js";
import { _ as K } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const $ = {
  class: "lw-cmd-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "全局命令中心"
}, A = { class: "lw-cmd-input-bar" }, F = ["data-index", "onMouseenter", "onClick"], O = { class: "lw-cmd-item-main" }, U = { class: "lw-cmd-title" }, j = {
  key: 0,
  class: "lw-cmd-desc"
}, L = { class: "lw-cmd-item-meta" }, Q = {
  key: 0,
  class: "lw-cmd-running-dot"
}, G = {
  key: 1,
  class: "lw-cmd-enter-hint"
}, H = {
  key: 1,
  class: "lw-cmd-empty"
}, J = { class: "lw-cmd-footer" }, W = { class: "lw-cmd-footer-stats" }, X = /* @__PURE__ */ T({
  __name: "CommandPalette",
  setup(Y) {
    const f = h(null), v = h(null), w = g({
      get: () => a.query,
      set: (t) => c.setQuery(t)
    }), r = g(() => z.search(a.query, 40));
    q(
      () => a.isOpen,
      (t) => {
        t && k(() => {
          f.value?.focus(), f.value?.select();
        });
      }
    );
    function x() {
      a.selectedIndex = 0;
    }
    function C(t) {
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
      i(a).isOpen ? (n(), o("div", {
        key: 0,
        class: "lw-cmd-overlay",
        onMousedown: V(I, ["self"])
      }, [
        e("div", $, [
          e("div", A, [
            s[1] || (s[1] = e("span", {
              class: "lw-cmd-search-icon",
              "aria-hidden": "true"
            }, "⌕", -1)),
            M(e("input", {
              ref_key: "inputRef",
              ref: f,
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
            r.value.length > 0 ? (n(!0), o(R, { key: 0 }, S(r.value, (l, d) => (n(), o("div", {
              key: l.id,
              class: _(["lw-cmd-item", { "is-selected": d === i(a).selectedIndex }]),
              "data-index": d,
              onMouseenter: (E) => i(a).selectedIndex = d,
              onClick: (E) => b(l)
            }, [
              e("div", O, [
                e("span", {
                  class: _(["lw-cmd-category-tag", D(l.category)])
                }, u(l.category), 3),
                e("span", U, u(l.title), 1),
                l.description ? (n(), o("span", j, u(l.description), 1)) : m("", !0)
              ]),
              e("div", L, [
                l.running ? (n(), o("span", Q, "执行中…")) : m("", !0),
                d === i(a).selectedIndex ? (n(), o("kbd", G, "↵ 执行")) : m("", !0)
              ])
            ], 42, F))), 128)) : (n(), o("div", H, [...s[3] || (s[3] = [
              e("span", { style: { "font-size": "26px" } }, "🔍", -1),
              e("p", null, "未找到匹配的命令或操作", -1),
              e("small", null, "尝试搜索如“音乐”、“待办”、“刷新”、“课表”或“开屏”", -1)
            ])]))
          ], 512),
          e("footer", J, [
            s[4] || (s[4] = e("div", { class: "lw-cmd-footer-tips" }, [
              e("span", null, [
                e("kbd", null, "↑"),
                e("kbd", null, "↓"),
                p(" 移动选择")
              ]),
              e("span", null, [
                e("kbd", null, "↵"),
                p(" 执行操作")
              ]),
              e("span", null, [
                e("kbd", null, "Ctrl+K"),
                p(" 唤出面板")
              ])
            ], -1)),
            e("div", W, " 共 " + u(r.value.length) + " 项操作可用 ", 1)
          ])
        ])
      ], 32)) : m("", !0)
    ]));
  }
}), se = /* @__PURE__ */ K(X, [["__scopeId", "data-v-1ad381f6"]]);
export {
  se as default
};
