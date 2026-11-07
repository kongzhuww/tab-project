import { o as s, u as z, G as R, H as j, I as Q, J as X } from "./view-styles-BsiXiaEf.js";
import { k as K, w as Z, g as ee, h as te } from "./window-manager.store-BdI_8a-H.js";
import { d as ne, B as ae, w as H, K as oe, e as l, k as O, h as c, z as b, A as se, i, t as w, u as le, F as x, f as D, g as N, s as M, b as f, o as r } from "./vendor-vue-9b0eS4bW.js";
import { u as ie } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-9z3_WNrf.js";
import { _ as re } from "./_plugin-vue_export-helper-BZmK54HO.js";
const _ = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube"];
let B = null;
function ue() {
  if (B) return;
  const t = document.querySelector("#hero-background-media video");
  t && !t.paused && (B = t, t.pause());
}
function ce() {
  const t = B;
  B = null, t?.isConnected && t.play().catch(() => {
  });
}
const q = {
  get activeId() {
    return s.activeId;
  },
  enter(t) {
    if (!_.includes(t)) return;
    const p = ee(t);
    if (p?.lifecycle.canOpen && !p.lifecycle.canOpen()) return;
    s.activeId && K(s.activeId), p && K(t), ue();
    try {
      sessionStorage.setItem(R, t);
    } catch {
    }
    s.activeId = t, z(s.activeId);
    const d = window;
    t === "daily-bilibili" && (d.LogicWeaverBiliFavorites?.loadOrganizer?.(), requestAnimationFrame(() => d.ensureDailyDataLoaded?.()));
  },
  exit() {
    if (!s.activeId) {
      z(null);
      return;
    }
    const t = s.activeId;
    K(s.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), s.activeId = null;
    try {
      sessionStorage.removeItem(R);
    } catch {
    }
    z(null), Z.releaseFocus(t), ce();
  },
  cycle() {
    const t = s.activeId;
    this.enter(_[(_.indexOf(t) + 1) % _.length]);
  }
};
j({ enter: (t) => q.enter(t), exit: () => q.exit() });
const de = ["onKeydown"], fe = ["disabled", "aria-expanded", "onKeydown"], ve = { class: "chat-share-label-wrap" }, me = {
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
  setup(t, { emit: p }) {
    const d = M(() => te.isInstalled("chat")), o = t, E = p, C = f(null), v = f({}), L = M(() => o.label.startsWith("🚀") ? "🚀" : "💬"), J = M(() => o.label.replace(/^(?:💬|🚀)\s*/, ""));
    function F() {
      if (v.value = {}, !o.matchMenuItem) return;
      const n = C.value?.closest('[role="menu"]')?.querySelector(':scope > button[role="menuitem"]');
      if (!n || n === C.value) return;
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
    ae(F), H(() => [o.visible, o.matchMenuItem], F, { flush: "post" });
    const m = f(!1), T = f(!1), k = f([]), I = f(""), W = f({ x: 0, y: 0 });
    let h = 0, V;
    const $ = M(() => {
      const n = /* @__PURE__ */ new Map();
      for (const e of k.value) {
        const a = e.name.split(" / ")[0];
        n.set(a, [...n.get(a) || [], e]);
      }
      return [...n.entries()];
    });
    function S() {
      clearTimeout(V), V = void 0;
    }
    function u() {
      S(), m.value = !1, h++;
    }
    const { menuRef: G, style: P } = ie({ visible: () => m.value && o.visible, anchor: () => W.value, dismiss: u });
    async function y() {
      if (S(), !d.value || o.disabled || !o.visible || m.value) return;
      F();
      const n = C.value?.getBoundingClientRect();
      if (!n) return;
      W.value = { x: n.right + 240 > window.innerWidth ? n.left - 240 : n.right + 4, y: n.top - 4 }, m.value = !0, T.value = !0, I.value = "", k.value = [], E("open");
      const e = ++h;
      try {
        const a = await Q();
        e === h && (k.value = a);
      } catch (a) {
        e === h && (I.value = a instanceof Error ? a.message : "房间列表读取失败，请重试。");
      } finally {
        e === h && (T.value = !1);
      }
    }
    function A() {
      S(), V = setTimeout(u, 280);
    }
    function U(n) {
      if (!d.value) {
        u();
        return;
      }
      const e = { ...n };
      u(), E("select", e);
    }
    return H(() => [d.value, o.visible, o.disabled, JSON.stringify(X.room)], () => {
      u();
    }), oe(u), (n, e) => d.value && t.visible ? (r(), l("div", {
      key: 0,
      class: se(["chat-share-menu", { compact: t.compact }]),
      style: b({ fontFamily: v.value.fontFamily }),
      onMouseenter: y,
      onMouseleave: A,
      onKeydown: O(c(u, ["stop", "prevent"]), ["esc"])
    }, [
      i("button", {
        ref_key: "trigger",
        ref: C,
        type: "button",
        class: "chat-share-trigger",
        style: b(v.value),
        disabled: t.disabled,
        "aria-haspopup": "menu",
        "aria-expanded": m.value,
        onClick: c(y, ["stop"]),
        onKeydown: [
          O(c(y, ["stop", "prevent"]), ["right"]),
          O(c(y, ["stop", "prevent"]), ["down"])
        ]
      }, [
        i("span", ve, [
          i("span", me, w(L.value), 1),
          i("span", null, w(J.value), 1)
        ]),
        e[3] || (e[3] = i("span", {
          class: "share-arrow",
          "aria-hidden": "true"
        }, "›", -1))
      ], 44, fe),
      m.value && t.visible ? (r(), l("div", {
        key: 0,
        ref_key: "menuRef",
        ref: G,
        class: "share-room-flyout",
        style: b([le(P), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: S,
        onMouseleave: A,
        onClick: e[1] || (e[1] = c(() => {
        }, ["stop"])),
        onWheel: e[2] || (e[2] = c(() => {
        }, ["stop"]))
      }, [
        T.value ? (r(), l("p", pe, "正在读取房间…")) : I.value ? (r(), l(x, { key: 1 }, [
          i("p", he, w(I.value), 1),
          i("button", {
            type: "button",
            class: "share-room-item",
            style: b(v.value),
            onClick: e[0] || (e[0] = c((a) => {
              u(), y();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (r(), l(x, { key: 2 }, [
          k.value.length ? D("", !0) : (r(), l("p", ye, "暂无可发送的房间")),
          (r(!0), l(x, null, N($.value, ([a, Y]) => (r(), l("div", {
            key: a,
            role: "group",
            "aria-label": a
          }, [
            i("div", be, w(a), 1),
            (r(!0), l(x, null, N(Y, (g) => (r(), l("button", {
              key: g.channel,
              type: "button",
              class: "share-room-item",
              style: b(v.value),
              role: "menuitem",
              title: g.name,
              onClick: c((ke) => U(g), ["stop"])
            }, [
              e[4] || (e[4] = i("span", { "aria-hidden": "true" }, "#", -1)),
              i("span", null, w(g.name.slice(g.name.indexOf(" / ") + 3)), 1)
            ], 12, we))), 128))
          ], 8, ge))), 128))
        ], 64))
      ], 36)) : D("", !0)
    ], 46, de)) : D("", !0);
  }
}), Be = /* @__PURE__ */ re(Ce, [["__scopeId", "data-v-6440251a"]]);
export {
  Be as C,
  q as f
};
