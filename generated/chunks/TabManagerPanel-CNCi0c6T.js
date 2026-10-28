import { A as x } from "./AppWindowFrame-D05mPlSe.js";
/* empty css                                                                             */
import "./window-manager.store-D_Nuf9-p.js";
import { t as d, d as I } from "./main-B8XBetlB.js";
import { d as B, x as M, y as O, o as n, c as N, w as h, f as i, e as l, t as m, g as w, F as _, h as b, m as z, B as F, u as f, b as p, s as T } from "./vendor-vue-DokqDua_.js";
import { _ as V } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const q = ["disabled"], A = { class: "tabs-body" }, E = {
  key: 0,
  role: "alert"
}, L = { key: 1 }, P = { key: 2 }, S = ["title", "onClick"], U = ["aria-label", "onClick"], W = /* @__PURE__ */ B({
  __name: "TabManagerPanel",
  setup($) {
    const o = p([]), u = p(!1), r = p("");
    let c = 0;
    const y = T(() => {
      const t = /* @__PURE__ */ new Map();
      for (const a of o.value) {
        let e = "其他标签页";
        try {
          const s = new URL(a.url);
          e = s.protocol.includes("extension") ? "插件页面" : s.hostname || s.protocol;
        } catch {
        }
        t.has(e) || t.set(e, []), t.get(e).push(a);
      }
      return [...t].map(([a, e]) => ({ domain: a, tabs: e }));
    });
    async function v() {
      if (!d.isOpen) return;
      const t = ++c;
      u.value = !0, r.value = "";
      try {
        if (typeof chrome > "u" || !chrome.tabs?.query) throw new Error();
        const a = await chrome.tabs.query({ currentWindow: !0 });
        if (t !== c || !d.isOpen) return;
        o.value = a.filter((e) => Number.isInteger(e.id)).map((e) => ({ id: e.id, windowId: e.windowId, title: e.title || "", url: e.url || "", active: !!e.active }));
      } catch {
        t === c && d.isOpen && (r.value = "标签页读取失败，未显示示例数据。");
      } finally {
        t === c && (u.value = !1);
      }
    }
    async function g(t) {
      try {
        await chrome.tabs.update(t.id, { active: !0 }), t.windowId != null && await chrome.windows.update(t.windowId, { focused: !0 });
      } catch {
        r.value = "切换未完成，标签页可能已关闭。";
      }
    }
    async function k(t) {
      try {
        await chrome.tabs.remove(t.id), o.value = o.value.filter((a) => a.id !== t.id);
      } catch {
        r.value = "关闭未确认，请刷新列表核对。";
      }
    }
    return M(() => d.isOpen, (t) => {
      t ? v() : (++c, o.value = [], u.value = !1);
    }, { immediate: !0 }), O(() => {
      ++c, o.value = [];
    }), (t, a) => (n(), N(f(x), {
      "window-id": "browser-tabs",
      title: "标签页管理",
      icon: "▤",
      visible: f(d).isOpen,
      "default-width": 430,
      "default-height": 500,
      "min-width": 300,
      "show-minimize": !1,
      "show-maximize": !1,
      onClose: f(I).close
    }, {
      "header-actions": h(() => [
        i("button", {
          type: "button",
          class: "tabs-refresh",
          disabled: u.value,
          onClick: v
        }, "刷新", 8, q)
      ]),
      default: h(() => [
        i("div", A, [
          a[0] || (a[0] = i("p", { class: "tabs-note" }, "仅在此窗口打开时读取当前浏览器窗口的标签页。", -1)),
          r.value ? (n(), l("p", E, m(r.value), 1)) : w("", !0),
          u.value && !o.value.length ? (n(), l("p", L, "正在读取标签页…")) : o.value.length ? w("", !0) : (n(), l("p", P, "暂无可显示的标签页")),
          (n(!0), l(_, null, b(y.value, (e) => (n(), l("section", {
            key: e.domain,
            class: "tabs-group"
          }, [
            i("h3", null, [
              z(m(e.domain) + " ", 1),
              i("small", null, m(e.tabs.length), 1)
            ]),
            (n(!0), l(_, null, b(e.tabs, (s) => (n(), l("div", {
              key: s.id,
              class: F(["tab-row", { active: s.active }])
            }, [
              i("button", {
                type: "button",
                class: "tab-open",
                title: s.title || "未命名标签页",
                onClick: (C) => g(s)
              }, m(s.title || "未命名标签页"), 9, S),
              i("button", {
                type: "button",
                class: "tab-close",
                "aria-label": "关闭标签页 " + (s.title || ""),
                onClick: (C) => k(s)
              }, "×", 8, U)
            ], 2))), 128))
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["visible", "onClose"]));
  }
}), K = /* @__PURE__ */ V(W, [["__scopeId", "data-v-ac2999e1"]]);
export {
  K as default
};
