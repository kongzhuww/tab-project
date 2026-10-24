import { f as A, o as D, w as I, a as J, g as s, h as o, A as M, k as r, B as h, s as L, i as l, t as v, x as Q, F as w, u as K, z as R, b as u, c as B } from "./vendor-vue-BUkfvXUI.js";
import { u as U } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DNUqqaI7.js";
import { Q as j, R as G } from "./search.service-CJV_B19X.js";
import { _ as P } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const X = ["onKeydown"], Y = ["disabled", "aria-expanded", "onKeydown"], Z = { class: "chat-share-label-wrap" }, ee = {
  class: "chat-share-icon",
  "aria-hidden": "true"
}, te = {
  key: 0,
  class: "share-hint",
  role: "status"
}, ne = {
  class: "share-hint",
  role: "status"
}, ae = {
  key: 0,
  class: "share-hint"
}, se = ["aria-label"], oe = { class: "share-space-label" }, le = ["title", "onClick"], re = /* @__PURE__ */ A({
  __name: "ChatShareMenu",
  props: {
    visible: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    label: { default: "发送到" },
    compact: { type: Boolean, default: !1 },
    matchMenuItem: { type: Boolean, default: !1 }
  },
  emits: ["select", "open"],
  setup(y, { emit: W }) {
    const a = y, F = W, b = u(null), c = u({}), V = B(() => a.label.startsWith("🚀") ? "🚀" : "💬"), H = B(() => a.label.replace(/^(?:💬|🚀)\s*/, ""));
    function _() {
      if (c.value = {}, !a.matchMenuItem) return;
      const t = b.value?.closest('[role="menu"]')?.querySelector(':scope > button[role="menuitem"]');
      if (!t || t === b.value) return;
      const e = getComputedStyle(t);
      c.value = {
        fontFamily: e.fontFamily,
        fontSize: e.fontSize,
        fontWeight: e.fontWeight,
        fontStyle: e.fontStyle,
        fontVariant: e.fontVariant,
        lineHeight: e.lineHeight,
        letterSpacing: e.letterSpacing,
        wordSpacing: e.wordSpacing,
        textTransform: e.textTransform
      };
    }
    D(_), I(() => [a.visible, a.matchMenuItem], _, { flush: "post" });
    const f = u(!1), x = u(!1), g = u([]), C = u(""), T = u({ x: 0, y: 0 });
    let d = 0, S;
    const N = B(() => {
      const t = /* @__PURE__ */ new Map();
      for (const e of g.value) {
        const n = e.name.split(" / ")[0];
        t.set(n, [...t.get(n) || [], e]);
      }
      return [...t.entries()];
    });
    function k() {
      clearTimeout(S), S = void 0;
    }
    function i() {
      k(), f.value = !1, d++;
    }
    const { menuRef: E, style: O } = U({ visible: () => f.value && a.visible, anchor: () => T.value, dismiss: i });
    async function m() {
      if (k(), a.disabled || !a.visible || f.value) return;
      _();
      const t = b.value?.getBoundingClientRect();
      if (!t) return;
      T.value = { x: t.right + 240 > window.innerWidth ? t.left - 240 : t.right + 4, y: t.top - 4 }, f.value = !0, x.value = !0, C.value = "", g.value = [], F("open");
      const e = ++d;
      try {
        const n = await G();
        e === d && (g.value = n);
      } catch (n) {
        e === d && (C.value = n instanceof Error ? n.message : "房间列表读取失败，请重试。");
      } finally {
        e === d && (x.value = !1);
      }
    }
    function z() {
      k(), S = setTimeout(i, 280);
    }
    function $(t) {
      const e = { ...t };
      i(), F("select", e);
    }
    return I(() => [a.visible, a.disabled, JSON.stringify(j.room)], () => {
      i();
    }), J(i), (t, e) => (s(), o("div", {
      class: L(["chat-share-menu", { compact: y.compact }]),
      style: h({ fontFamily: c.value.fontFamily }),
      onMouseenter: m,
      onMouseleave: z,
      onKeydown: M(r(i, ["stop", "prevent"]), ["esc"])
    }, [
      l("button", {
        ref_key: "trigger",
        ref: b,
        type: "button",
        class: "chat-share-trigger",
        style: h(c.value),
        disabled: y.disabled,
        "aria-haspopup": "menu",
        "aria-expanded": f.value,
        onClick: r(m, ["stop"]),
        onKeydown: [
          M(r(m, ["stop", "prevent"]), ["right"]),
          M(r(m, ["stop", "prevent"]), ["down"])
        ]
      }, [
        l("span", Z, [
          l("span", ee, v(V.value), 1),
          l("span", null, v(H.value), 1)
        ]),
        e[3] || (e[3] = l("span", {
          class: "share-arrow",
          "aria-hidden": "true"
        }, "›", -1))
      ], 44, Y),
      f.value && y.visible ? (s(), o("div", {
        key: 0,
        ref_key: "menuRef",
        ref: E,
        class: "share-room-flyout",
        style: h([Q(O), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: k,
        onMouseleave: z,
        onClick: e[1] || (e[1] = r(() => {
        }, ["stop"])),
        onWheel: e[2] || (e[2] = r(() => {
        }, ["stop"]))
      }, [
        x.value ? (s(), o("p", te, "正在读取房间…")) : C.value ? (s(), o(w, { key: 1 }, [
          l("p", ne, v(C.value), 1),
          l("button", {
            type: "button",
            class: "share-room-item",
            style: h(c.value),
            onClick: e[0] || (e[0] = r((n) => {
              i(), m();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (s(), o(w, { key: 2 }, [
          g.value.length ? K("", !0) : (s(), o("p", ae, "暂无可发送的房间")),
          (s(!0), o(w, null, R(N.value, ([n, q]) => (s(), o("div", {
            key: n,
            role: "group",
            "aria-label": n
          }, [
            l("div", oe, v(n), 1),
            (s(!0), o(w, null, R(q, (p) => (s(), o("button", {
              key: p.channel,
              type: "button",
              class: "share-room-item",
              style: h(c.value),
              role: "menuitem",
              title: p.name,
              onClick: r((ie) => $(p), ["stop"])
            }, [
              e[4] || (e[4] = l("span", { "aria-hidden": "true" }, "#", -1)),
              l("span", null, v(p.name.slice(p.name.indexOf(" / ") + 3)), 1)
            ], 12, le))), 128))
          ], 8, se))), 128))
        ], 64))
      ], 36)) : K("", !0)
    ], 46, X));
  }
}), me = /* @__PURE__ */ P(re, [["__scopeId", "data-v-41395607"]]);
export {
  me as C
};
