import { f as D, o as J, w as W, a as L, g as s, h as o, A as F, k as i, B as v, s as U, i as l, t as y, x as j, F as x, u as T, z as N, c as S, b as u } from "./vendor-vue-BUkfvXUI.js";
import { u as G } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DNUqqaI7.js";
import { N as P, O as Q } from "./search.service-BNKrftAD.js";
import { p as X } from "./read-session-BWENvNUM.js";
import { _ as Y } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Z = ["onKeydown"], ee = ["disabled", "aria-expanded", "onKeydown"], te = { class: "chat-share-label-wrap" }, ae = {
  class: "chat-share-icon",
  "aria-hidden": "true"
}, ne = {
  key: 0,
  class: "share-hint",
  role: "status"
}, se = {
  class: "share-hint",
  role: "status"
}, oe = {
  key: 0,
  class: "share-hint"
}, le = ["aria-label"], re = { class: "share-space-label" }, ie = ["title", "onClick"], ue = /* @__PURE__ */ D({
  __name: "ChatShareMenu",
  props: {
    visible: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    label: { default: "发送到" },
    compact: { type: Boolean, default: !1 },
    matchMenuItem: { type: Boolean, default: !1 }
  },
  emits: ["select", "open"],
  setup(d, { emit: R }) {
    const b = S(() => X.isInstalled("chat")), n = d, z = R, g = u(null), c = u({}), V = S(() => n.label.startsWith("🚀") ? "🚀" : "💬"), E = S(() => n.label.replace(/^(?:💬|🚀)\s*/, ""));
    function M() {
      if (c.value = {}, !n.matchMenuItem) return;
      const t = g.value?.closest('[role="menu"]')?.querySelector(':scope > button[role="menuitem"]');
      if (!t || t === g.value) return;
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
    J(M), W(() => [n.visible, n.matchMenuItem], M, { flush: "post" });
    const f = u(!1), _ = u(!1), k = u([]), C = u(""), I = u({ x: 0, y: 0 });
    let m = 0, B;
    const H = S(() => {
      const t = /* @__PURE__ */ new Map();
      for (const e of k.value) {
        const a = e.name.split(" / ")[0];
        t.set(a, [...t.get(a) || [], e]);
      }
      return [...t.entries()];
    });
    function w() {
      clearTimeout(B), B = void 0;
    }
    function r() {
      w(), f.value = !1, m++;
    }
    const { menuRef: O, style: $ } = G({ visible: () => f.value && n.visible, anchor: () => I.value, dismiss: r });
    async function p() {
      if (w(), !b.value || n.disabled || !n.visible || f.value) return;
      M();
      const t = g.value?.getBoundingClientRect();
      if (!t) return;
      I.value = { x: t.right + 240 > window.innerWidth ? t.left - 240 : t.right + 4, y: t.top - 4 }, f.value = !0, _.value = !0, C.value = "", k.value = [], z("open");
      const e = ++m;
      try {
        const a = await Q();
        e === m && (k.value = a);
      } catch (a) {
        e === m && (C.value = a instanceof Error ? a.message : "房间列表读取失败，请重试。");
      } finally {
        e === m && (_.value = !1);
      }
    }
    function K() {
      w(), B = setTimeout(r, 280);
    }
    function q(t) {
      if (!b.value) {
        r();
        return;
      }
      const e = { ...t };
      r(), z("select", e);
    }
    return W(() => [b.value, n.visible, n.disabled, JSON.stringify(P.room)], () => {
      r();
    }), L(r), (t, e) => b.value && d.visible ? (s(), o("div", {
      key: 0,
      class: U(["chat-share-menu", { compact: d.compact }]),
      style: v({ fontFamily: c.value.fontFamily }),
      onMouseenter: p,
      onMouseleave: K,
      onKeydown: F(i(r, ["stop", "prevent"]), ["esc"])
    }, [
      l("button", {
        ref_key: "trigger",
        ref: g,
        type: "button",
        class: "chat-share-trigger",
        style: v(c.value),
        disabled: d.disabled,
        "aria-haspopup": "menu",
        "aria-expanded": f.value,
        onClick: i(p, ["stop"]),
        onKeydown: [
          F(i(p, ["stop", "prevent"]), ["right"]),
          F(i(p, ["stop", "prevent"]), ["down"])
        ]
      }, [
        l("span", te, [
          l("span", ae, y(V.value), 1),
          l("span", null, y(E.value), 1)
        ]),
        e[3] || (e[3] = l("span", {
          class: "share-arrow",
          "aria-hidden": "true"
        }, "›", -1))
      ], 44, ee),
      f.value && d.visible ? (s(), o("div", {
        key: 0,
        ref_key: "menuRef",
        ref: O,
        class: "share-room-flyout",
        style: v([j($), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: w,
        onMouseleave: K,
        onClick: e[1] || (e[1] = i(() => {
        }, ["stop"])),
        onWheel: e[2] || (e[2] = i(() => {
        }, ["stop"]))
      }, [
        _.value ? (s(), o("p", ne, "正在读取房间…")) : C.value ? (s(), o(x, { key: 1 }, [
          l("p", se, y(C.value), 1),
          l("button", {
            type: "button",
            class: "share-room-item",
            style: v(c.value),
            onClick: e[0] || (e[0] = i((a) => {
              r(), p();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (s(), o(x, { key: 2 }, [
          k.value.length ? T("", !0) : (s(), o("p", oe, "暂无可发送的房间")),
          (s(!0), o(x, null, N(H.value, ([a, A]) => (s(), o("div", {
            key: a,
            role: "group",
            "aria-label": a
          }, [
            l("div", re, y(a), 1),
            (s(!0), o(x, null, N(A, (h) => (s(), o("button", {
              key: h.channel,
              type: "button",
              class: "share-room-item",
              style: v(c.value),
              role: "menuitem",
              title: h.name,
              onClick: i((ce) => q(h), ["stop"])
            }, [
              e[4] || (e[4] = l("span", { "aria-hidden": "true" }, "#", -1)),
              l("span", null, y(h.name.slice(h.name.indexOf(" / ") + 3)), 1)
            ], 12, ie))), 128))
          ], 8, le))), 128))
        ], 64))
      ], 36)) : T("", !0)
    ], 46, Z)) : T("", !0);
  }
}), ve = /* @__PURE__ */ Y(ue, [["__scopeId", "data-v-6440251a"]]);
export {
  ve as C
};
