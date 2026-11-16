import { d as D, B as J, w as W, C as L, e as s, k as F, h as i, z as v, A as U, i as o, t as y, u as j, F as S, f as T, g as R, s as x, b as u, o as l } from "./vendor-vue-C09jaOfK.js";
import { u as G } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DSwVoylL.js";
import { q as P, u as Q } from "./view-styles-BWvP_cB-.js";
import { h as X } from "./window-manager.store-CzUcQOW-.js";
import { _ as Y } from "./_plugin-vue_export-helper-BTb4PcVA.js";
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
  setup(d, { emit: V }) {
    const b = x(() => X.isInstalled("chat")), n = d, z = V, g = u(null), c = u({}), E = x(() => n.label.startsWith("🚀") ? "🚀" : "💬"), H = x(() => n.label.replace(/^(?:💬|🚀)\s*/, ""));
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
    const f = u(!1), _ = u(!1), C = u([]), k = u(""), I = u({ x: 0, y: 0 });
    let m = 0, B;
    const N = x(() => {
      const t = /* @__PURE__ */ new Map();
      for (const e of C.value) {
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
    const { menuRef: q, style: O } = G({ visible: () => f.value && n.visible, anchor: () => I.value, dismiss: r });
    async function p() {
      if (w(), !b.value || n.disabled || !n.visible || f.value) return;
      M();
      const t = g.value?.getBoundingClientRect();
      if (!t) return;
      I.value = { x: t.right + 240 > window.innerWidth ? t.left - 240 : t.right + 4, y: t.top - 4 }, f.value = !0, _.value = !0, k.value = "", C.value = [], z("open");
      const e = ++m;
      try {
        const a = await P();
        e === m && (C.value = a);
      } catch (a) {
        e === m && (k.value = a instanceof Error ? a.message : "房间列表读取失败，请重试。");
      } finally {
        e === m && (_.value = !1);
      }
    }
    function K() {
      w(), B = setTimeout(r, 280);
    }
    function $(t) {
      if (!b.value) {
        r();
        return;
      }
      const e = { ...t };
      r(), z("select", e);
    }
    return W(() => [b.value, n.visible, n.disabled, JSON.stringify(Q.room)], () => {
      r();
    }), L(r), (t, e) => b.value && d.visible ? (l(), s("div", {
      key: 0,
      class: U(["chat-share-menu", { compact: d.compact }]),
      style: v({ fontFamily: c.value.fontFamily }),
      onMouseenter: p,
      onMouseleave: K,
      onKeydown: F(i(r, ["stop", "prevent"]), ["esc"])
    }, [
      o("button", {
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
        o("span", te, [
          o("span", ae, y(E.value), 1),
          o("span", null, y(H.value), 1)
        ]),
        e[3] || (e[3] = o("span", {
          class: "share-arrow",
          "aria-hidden": "true"
        }, "›", -1))
      ], 44, ee),
      f.value && d.visible ? (l(), s("div", {
        key: 0,
        ref_key: "menuRef",
        ref: q,
        class: "share-room-flyout",
        style: v([j(O), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: w,
        onMouseleave: K,
        onClick: e[1] || (e[1] = i(() => {
        }, ["stop"])),
        onWheel: e[2] || (e[2] = i(() => {
        }, ["stop"]))
      }, [
        _.value ? (l(), s("p", ne, "正在读取房间…")) : k.value ? (l(), s(S, { key: 1 }, [
          o("p", se, y(k.value), 1),
          o("button", {
            type: "button",
            class: "share-room-item",
            style: v(c.value),
            onClick: e[0] || (e[0] = i((a) => {
              r(), p();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (l(), s(S, { key: 2 }, [
          C.value.length ? T("", !0) : (l(), s("p", oe, "暂无可发送的房间")),
          (l(!0), s(S, null, R(N.value, ([a, A]) => (l(), s("div", {
            key: a,
            role: "group",
            "aria-label": a
          }, [
            o("div", re, y(a), 1),
            (l(!0), s(S, null, R(A, (h) => (l(), s("button", {
              key: h.channel,
              type: "button",
              class: "share-room-item",
              style: v(c.value),
              role: "menuitem",
              title: h.name,
              onClick: i((ce) => $(h), ["stop"])
            }, [
              e[4] || (e[4] = o("span", { "aria-hidden": "true" }, "#", -1)),
              o("span", null, y(h.name.slice(h.name.indexOf(" / ") + 3)), 1)
            ], 12, ie))), 128))
          ], 8, le))), 128))
        ], 64))
      ], 36)) : T("", !0)
    ], 46, Z)) : T("", !0);
  }
}), ve = /* @__PURE__ */ Y(ue, [["__scopeId", "data-v-eaf766be"]]);
export {
  ve as C
};
