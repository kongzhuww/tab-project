import { A as I } from "./AppWindowFrame-RMaGDdQt.js";
/* empty css                                                                             */
import "./window-manager.store-D9RSYghK.js";
import { t as b, a as B } from "./main-Bf2qIYbg.js";
import { t as a, _ as E } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { d as M, w as O, e as T, f as r, l as N, B as v, h as c, t as l, u as o, g as u, j as w, F as _, i as y, m as z, s as F, b as f, x as P } from "./vendor-vue-BbmU9NUg.js";
const V = ["disabled"], q = { class: "tabs-body" }, A = { class: "tabs-note" }, L = {
  key: 0,
  role: "alert"
}, S = { key: 1 }, U = { key: 2 }, W = ["title", "onClick"], $ = ["aria-label", "onClick"], j = /* @__PURE__ */ M({
  __name: "TabManagerPanel",
  setup(D) {
    const n = f([]), h = f(!1), d = f("");
    let m = 0;
    const g = P(() => {
      const t = /* @__PURE__ */ new Map();
      for (const i of n.value) {
        let e = a("tabs.otherTabs");
        try {
          const s = new URL(i.url);
          e = s.protocol.includes("extension") ? a("tabs.extensionPage") : s.hostname || s.protocol;
        } catch {
        }
        t.has(e) || t.set(e, []), t.get(e).push(i);
      }
      return [...t].map(([i, e]) => ({ domain: i, tabs: e }));
    });
    async function p() {
      if (!b.isOpen) return;
      const t = ++m;
      h.value = !0, d.value = "";
      try {
        if (typeof chrome > "u" || !chrome.tabs?.query) throw new Error();
        const i = await chrome.tabs.query({ currentWindow: !0 });
        if (t !== m || !b.isOpen) return;
        n.value = i.filter((e) => Number.isInteger(e.id)).map((e) => ({ id: e.id, windowId: e.windowId, title: e.title || "", url: e.url || "", active: !!e.active }));
      } catch {
        t === m && b.isOpen && (d.value = a("tabs.readError"));
      } finally {
        t === m && (h.value = !1);
      }
    }
    async function k(t) {
      try {
        await chrome.tabs.update(t.id, { active: !0 }), t.windowId != null && await chrome.windows.update(t.windowId, { focused: !0 });
      } catch {
        d.value = a("tabs.switchError");
      }
    }
    async function C(t) {
      try {
        await chrome.tabs.remove(t.id), n.value = n.value.filter((i) => i.id !== t.id);
      } catch {
        d.value = a("tabs.closeError");
      }
    }
    return O(() => b.isOpen, (t) => {
      t ? p() : (++m, n.value = [], h.value = !1);
    }, { immediate: !0 }), T(() => {
      ++m, n.value = [];
    }), (t, i) => (r(), N(o(I), {
      "window-id": "browser-tabs",
      title: o(a)("tabs.title"),
      icon: "▤",
      visible: o(b).isOpen,
      "default-width": 430,
      "default-height": 500,
      "min-width": 300,
      "show-minimize": !1,
      "show-maximize": !1,
      onClose: o(B).close
    }, {
      "header-actions": v(() => [
        c("button", {
          type: "button",
          class: "tabs-refresh",
          disabled: h.value,
          onClick: p
        }, l(o(a)("tabs.refresh")), 9, V)
      ]),
      default: v(() => [
        c("div", q, [
          c("p", A, l(o(a)("tabs.note")), 1),
          d.value ? (r(), u("p", L, l(d.value), 1)) : w("", !0),
          h.value && !n.value.length ? (r(), u("p", S, l(o(a)("tabs.reading")), 1)) : n.value.length ? w("", !0) : (r(), u("p", U, l(o(a)("tabs.empty")), 1)),
          (r(!0), u(_, null, y(g.value, (e) => (r(), u("section", {
            key: e.domain,
            class: "tabs-group"
          }, [
            c("h3", null, [
              z(l(e.domain) + " ", 1),
              c("small", null, l(e.tabs.length), 1)
            ]),
            (r(!0), u(_, null, y(e.tabs, (s) => (r(), u("div", {
              key: s.id,
              class: F(["tab-row", { active: s.active }])
            }, [
              c("button", {
                type: "button",
                class: "tab-open",
                title: s.title || o(a)("tabs.untitled"),
                onClick: (x) => k(s)
              }, l(s.title || o(a)("tabs.untitled")), 9, W),
              c("button", {
                type: "button",
                class: "tab-close",
                "aria-label": o(a)("tabs.closeTab", { title: s.title || "" }),
                onClick: (x) => C(s)
              }, "×", 8, $)
            ], 2))), 128))
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["title", "visible", "onClose"]));
  }
}), X = /* @__PURE__ */ E(j, [["__scopeId", "data-v-5cb9d7ab"]]);
export {
  X as default
};
