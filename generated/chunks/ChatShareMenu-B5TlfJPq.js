import { d as q, C as A, x as W, L as D, e as s, k as F, i, A as v, B as U, f as o, t as y, u as j, F as x, g as I, h as R, s as S, b as u, o as l } from "./vendor-vue-DokqDua_.js";
import { u as G } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { I as P, J as Q } from "./view-styles-SpWNtsrK.js";
import { h as X } from "./window-manager.store-D_Nuf9-p.js";
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
}, le = ["aria-label"], re = { class: "share-space-label" }, ie = ["title", "onClick"], ue = /* @__PURE__ */ q({
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
    const b = S(() => X.isInstalled("chat")), n = d, T = V, g = u(null), c = u({}), E = S(() => n.label.startsWith("🚀") ? "🚀" : "💬"), H = S(() => n.label.replace(/^(?:💬|🚀)\s*/, ""));
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
    A(M), W(() => [n.visible, n.matchMenuItem], M, { flush: "post" });
    const f = u(!1), _ = u(!1), C = u([]), k = u(""), z = u({ x: 0, y: 0 });
    let m = 0, B;
    const N = S(() => {
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
    const { menuRef: J, style: L } = G({ visible: () => f.value && n.visible, anchor: () => z.value, dismiss: r });
    async function p() {
      if (w(), !b.value || n.disabled || !n.visible || f.value) return;
      M();
      const t = g.value?.getBoundingClientRect();
      if (!t) return;
      z.value = { x: t.right + 240 > window.innerWidth ? t.left - 240 : t.right + 4, y: t.top - 4 }, f.value = !0, _.value = !0, k.value = "", C.value = [], T("open");
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
    function O(t) {
      if (!b.value) {
        r();
        return;
      }
      const e = { ...t };
      r(), T("select", e);
    }
    return W(() => [b.value, n.visible, n.disabled, JSON.stringify(Q.room)], () => {
      r();
    }), D(r), (t, e) => b.value && d.visible ? (l(), s("div", {
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
        ref: J,
        class: "share-room-flyout",
        style: v([j(L), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: w,
        onMouseleave: K,
        onClick: e[1] || (e[1] = i(() => {
        }, ["stop"])),
        onWheel: e[2] || (e[2] = i(() => {
        }, ["stop"]))
      }, [
        _.value ? (l(), s("p", ne, "正在读取房间…")) : k.value ? (l(), s(x, { key: 1 }, [
          o("p", se, y(k.value), 1),
          o("button", {
            type: "button",
            class: "share-room-item",
            style: v(c.value),
            onClick: e[0] || (e[0] = i((a) => {
              r(), p();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (l(), s(x, { key: 2 }, [
          C.value.length ? I("", !0) : (l(), s("p", oe, "暂无可发送的房间")),
          (l(!0), s(x, null, R(N.value, ([a, $]) => (l(), s("div", {
            key: a,
            role: "group",
            "aria-label": a
          }, [
            o("div", re, y(a), 1),
            (l(!0), s(x, null, R($, (h) => (l(), s("button", {
              key: h.channel,
              type: "button",
              class: "share-room-item",
              style: v(c.value),
              role: "menuitem",
              title: h.name,
              onClick: i((ce) => O(h), ["stop"])
            }, [
              e[4] || (e[4] = o("span", { "aria-hidden": "true" }, "#", -1)),
              o("span", null, y(h.name.slice(h.name.indexOf(" / ") + 3)), 1)
            ], 12, ie))), 128))
          ], 8, le))), 128))
        ], 64))
      ], 36)) : I("", !0)
    ], 46, Z)) : I("", !0);
  }
}), ve = /* @__PURE__ */ Y(ue, [["__scopeId", "data-v-6440251a"]]);
export {
  ve as C
};
