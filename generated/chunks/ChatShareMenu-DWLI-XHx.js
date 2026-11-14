import { o as l, u as V, J as R, K as Q, L as X, M as Z } from "./view-styles-yuz8wQEV.js";
import { g as L, k as z, w as ee, h as te } from "./window-manager.store-fHSi_Uh8.js";
import { d as ne, B as ae, w as N, K as oe, e as i, k as D, h as d, z as w, A as se, i as r, t as C, u as le, F as _, f as E, g as q, s as B, b as m, o as c } from "./vendor-vue-BkY5-p5y.js";
import { u as ie } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
import { _ as re } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const k = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "multica"];
let F = null;
function ce() {
  if (F) return;
  const t = document.querySelector("#hero-background-media video");
  t && !t.paused && (F = t, t.pause());
}
function ue() {
  const t = F;
  F = null, t?.isConnected && t.play().catch(() => {
  });
}
const H = {
  get activeId() {
    return l.activeId;
  },
  enter(t) {
    if (!k.includes(t)) return;
    const f = L(t);
    if (f?.lifecycle.canOpen && !f.lifecycle.canOpen()) return;
    l.activeId && z(l.activeId), f && z(t), ce();
    try {
      sessionStorage.setItem(R, t);
    } catch {
    }
    l.activeId = t, V(l.activeId);
    const s = window;
    t === "daily-bilibili" && (s.LogicWeaverBiliFavorites?.loadOrganizer?.(), requestAnimationFrame(() => s.ensureDailyDataLoaded?.()));
  },
  exit() {
    if (!l.activeId) {
      V(null);
      return;
    }
    const t = l.activeId;
    z(l.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), l.activeId = null;
    try {
      sessionStorage.removeItem(R);
    } catch {
    }
    V(null), ee.releaseFocus(t), ue();
  },
  cycle() {
    const t = l.activeId, f = k.indexOf(t);
    for (let s = 1; s <= k.length; s++) {
      const a = k[(f + s) % k.length], h = L(a);
      if (!h?.lifecycle.canOpen || h.lifecycle.canOpen()) {
        this.enter(a);
        return;
      }
    }
  }
};
Q({ enter: (t) => H.enter(t), exit: () => H.exit() });
const de = ["onKeydown"], fe = ["disabled", "aria-expanded", "onKeydown"], me = { class: "chat-share-label-wrap" }, ve = {
  class: "chat-share-icon",
  "aria-hidden": "true"
}, pe = {
  key: 0,
  class: "share-hint",
  role: "status"
}, he = {
  class: "share-hint",
  role: "status"
}, ye = {
  key: 0,
  class: "share-hint"
}, ge = ["aria-label"], be = { class: "share-space-label" }, we = ["title", "onClick"], Ce = /* @__PURE__ */ ne({
  __name: "ChatShareMenu",
  props: {
    visible: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    label: { default: "发送到" },
    compact: { type: Boolean, default: !1 },
    matchMenuItem: { type: Boolean, default: !1 }
  },
  emits: ["select", "open"],
  setup(t, { emit: f }) {
    const s = B(() => te.isInstalled("chat")), a = t, h = f, S = m(null), v = m({}), J = B(() => a.label.startsWith("🚀") ? "🚀" : "💬"), $ = B(() => a.label.replace(/^(?:💬|🚀)\s*/, ""));
    function T() {
      if (v.value = {}, !a.matchMenuItem) return;
      const n = S.value?.closest('[role="menu"]')?.querySelector(':scope > button[role="menuitem"]');
      if (!n || n === S.value) return;
      const e = getComputedStyle(n);
      v.value = {
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
    ae(T), N(() => [a.visible, a.matchMenuItem], T, { flush: "post" });
    const p = m(!1), O = m(!1), I = m([]), x = m(""), W = m({ x: 0, y: 0 });
    let y = 0, K;
    const P = B(() => {
      const n = /* @__PURE__ */ new Map();
      for (const e of I.value) {
        const o = e.name.split(" / ")[0];
        n.set(o, [...n.get(o) || [], e]);
      }
      return [...n.entries()];
    });
    function M() {
      clearTimeout(K), K = void 0;
    }
    function u() {
      M(), p.value = !1, y++;
    }
    const { menuRef: U, style: Y } = ie({ visible: () => p.value && a.visible, anchor: () => W.value, dismiss: u });
    async function g() {
      if (M(), !s.value || a.disabled || !a.visible || p.value) return;
      T();
      const n = S.value?.getBoundingClientRect();
      if (!n) return;
      W.value = { x: n.right + 240 > window.innerWidth ? n.left - 240 : n.right + 4, y: n.top - 4 }, p.value = !0, O.value = !0, x.value = "", I.value = [], h("open");
      const e = ++y;
      try {
        const o = await X();
        e === y && (I.value = o);
      } catch (o) {
        e === y && (x.value = o instanceof Error ? o.message : "房间列表读取失败，请重试。");
      } finally {
        e === y && (O.value = !1);
      }
    }
    function A() {
      M(), K = setTimeout(u, 280);
    }
    function j(n) {
      if (!s.value) {
        u();
        return;
      }
      const e = { ...n };
      u(), h("select", e);
    }
    return N(() => [s.value, a.visible, a.disabled, JSON.stringify(Z.room)], () => {
      u();
    }), oe(u), (n, e) => s.value && t.visible ? (c(), i("div", {
      key: 0,
      class: se(["chat-share-menu", { compact: t.compact }]),
      style: w({ fontFamily: v.value.fontFamily }),
      onMouseenter: g,
      onMouseleave: A,
      onKeydown: D(d(u, ["stop", "prevent"]), ["esc"])
    }, [
      r("button", {
        ref_key: "trigger",
        ref: S,
        type: "button",
        class: "chat-share-trigger",
        style: w(v.value),
        disabled: t.disabled,
        "aria-haspopup": "menu",
        "aria-expanded": p.value,
        onClick: d(g, ["stop"]),
        onKeydown: [
          D(d(g, ["stop", "prevent"]), ["right"]),
          D(d(g, ["stop", "prevent"]), ["down"])
        ]
      }, [
        r("span", me, [
          r("span", ve, C(J.value), 1),
          r("span", null, C($.value), 1)
        ]),
        e[3] || (e[3] = r("span", {
          class: "share-arrow",
          "aria-hidden": "true"
        }, "›", -1))
      ], 44, fe),
      p.value && t.visible ? (c(), i("div", {
        key: 0,
        ref_key: "menuRef",
        ref: U,
        class: "share-room-flyout",
        style: w([le(Y), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: M,
        onMouseleave: A,
        onClick: e[1] || (e[1] = d(() => {
        }, ["stop"])),
        onWheel: e[2] || (e[2] = d(() => {
        }, ["stop"]))
      }, [
        O.value ? (c(), i("p", pe, "正在读取房间…")) : x.value ? (c(), i(_, { key: 1 }, [
          r("p", he, C(x.value), 1),
          r("button", {
            type: "button",
            class: "share-room-item",
            style: w(v.value),
            onClick: e[0] || (e[0] = d((o) => {
              u(), g();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (c(), i(_, { key: 2 }, [
          I.value.length ? E("", !0) : (c(), i("p", ye, "暂无可发送的房间")),
          (c(!0), i(_, null, q(P.value, ([o, G]) => (c(), i("div", {
            key: o,
            role: "group",
            "aria-label": o
          }, [
            r("div", be, C(o), 1),
            (c(!0), i(_, null, q(G, (b) => (c(), i("button", {
              key: b.channel,
              type: "button",
              class: "share-room-item",
              style: w(v.value),
              role: "menuitem",
              title: b.name,
              onClick: d((ke) => j(b), ["stop"])
            }, [
              e[4] || (e[4] = r("span", { "aria-hidden": "true" }, "#", -1)),
              r("span", null, C(b.name.slice(b.name.indexOf(" / ") + 3)), 1)
            ], 12, we))), 128))
          ], 8, ge))), 128))
        ], 64))
      ], 36)) : E("", !0)
    ], 46, de)) : E("", !0);
  }
}), Be = /* @__PURE__ */ re(Ce, [["__scopeId", "data-v-eaf766be"]]);
export {
  Be as C,
  H as f
};
