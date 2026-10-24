import { l as _ } from "./search.service-CipPV7Bz.js";
import { f as O, w as K, o as P, g as r, h as s, s as X, t as L, c as C, b as w, F, l as Y, i as x, z as j, I as q, u as z, H as G } from "./vendor-vue-BUkfvXUI.js";
import { _ as T } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
function J(l, o) {
  for (a.delete(l), a.set(l, o), c.delete(o), c.add(o); a.size > 512; )
    a.delete(a.keys().next().value);
  for (; c.size > 512; )
    c.delete(c.values().next().value);
}
const Q = {
  key: 0,
  class: "launcher-fallback"
}, Z = ["src"], B = "lw_resolved_icon:", V = /* @__PURE__ */ O({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(l) {
    function o(e) {
      try {
        return localStorage.getItem(B + e) || "";
      } catch {
        return "";
      }
    }
    function i(e, t) {
      try {
        localStorage.setItem(B + e, t);
      } catch {
      }
    }
    function y(e) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + e) || "";
      } catch {
        return "";
      }
    }
    const n = l;
    function E(e) {
      try {
        return new URL(e).hostname.replace(/^www\./, "");
      } catch {
        return e || "";
      }
    }
    function I(e) {
      try {
        return new URL(e).origin;
      } catch {
        return "";
      }
    }
    function N(e) {
      try {
        const t = window, d = typeof t.chrome < "u" ? t.chrome : globalThis.chrome;
        if (typeof d?.runtime?.getURL == "function")
          return d.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
      } catch {
      }
      return "";
    }
    const A = C(() => {
      const e = n.link, t = (e.title || E(e.url)).trim();
      return t ? t.slice(0, 1).toUpperCase() : "🔗";
    }), u = w([]), f = w(0), m = w(!1), h = w(!1), S = C(() => h.value || f.value >= u.value.length ? "" : u.value[f.value] || "");
    function W() {
      const e = n.link;
      if (!e?.url) {
        u.value = [], h.value = !0, m.value = !1;
        return;
      }
      const t = [], d = y(e.url);
      d && t.push(d);
      const g = a.get(e.url) || o(e.url);
      g && !t.includes(g) && t.push(g);
      const v = ($) => $ ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test($) : !1;
      e.customIcon && !v(e.customIcon) && t.push(e.customIcon), e.icon && !v(e.icon) && t.push(e.icon);
      const k = N(e.url);
      k && !t.includes(k) && t.push(k);
      const b = _.getCachedIcon(e.url);
      b && !t.includes(b) && t.push(b);
      const p = I(e.url);
      p && !p.startsWith("http://1.") && !p.startsWith("http://192.") && !p.startsWith("http://127.") && t.push(`${p}/favicon.ico`), e.customIcon && !v(e.customIcon) && t.unshift(e.customIcon);
      const R = [...new Set(t.filter(Boolean))];
      u.value = R, f.value = 0, h.value = R.length === 0;
      const U = R[0];
      U && (U.startsWith("data:") || c.has(U)) && (m.value = !0);
    }
    K(
      () => [n.link?.url, n.link?.icon, n.link?.customIcon],
      (e, t) => {
        t && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] || W();
      },
      { immediate: !0 }
    ), P(() => {
      u.value.length === 0 && W();
    });
    function H(e) {
      m.value = !0, h.value = !1;
      const t = S.value;
      if (t) {
        const d = c.has(t), g = a.get(n.link.url);
        J(n.link.url, t), g !== t && o(n.link.url) !== t && i(n.link.url, t);
        const v = e.target;
        if (!d && !t.startsWith("data:")) {
          const k = n.link.url;
          setTimeout(() => {
            _.cacheIcon(k, t, v?.getAttribute("src") === t ? v : null);
          }, 0);
        }
      }
    }
    function M() {
      const e = S.value;
      if (e) {
        c.delete(e), a.get(n.link.url) === e && a.delete(n.link.url);
        try {
          localStorage.removeItem(B + n.link.url), localStorage.removeItem("lw_sync_dataurl:" + n.link.url);
        } catch {
        }
      }
      if (e && _.getCachedIcon(n.link.url) === e && _.evictCachedIcon(n.link.url), f.value + 1 < u.value.length) {
        f.value += 1;
        const t = u.value[f.value];
        t && (t.startsWith("data:") || c.has(t)) && (m.value = !0);
      } else
        h.value = !0, m.value = !1;
    }
    return (e, t) => (r(), s("span", {
      class: X(l.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      h.value || !S.value ? (r(), s("span", Q, L(A.value), 1)) : (r(), s("img", {
        key: 1,
        src: S.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: H,
        onError: M
      }, null, 40, Z))
    ], 2));
  }
}), D = /* @__PURE__ */ T(V, [["__scopeId", "data-v-bc41d0d8"]]), ee = { class: "launcher-label launcher-title" }, te = ["title"], ne = {
  key: 0,
  class: "launcher-folder-more"
}, le = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, oe = { class: "launcher-folder-label launcher-title" }, re = /* @__PURE__ */ O({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(l) {
    const o = l, i = C(() => o.size === "large" ? 9 : 4), y = C(() => o.folder?.preview.slice(0, o.folder.count > i.value ? i.value - 1 : i.value) || []);
    return (n, E) => l.link ? (r(), s(F, { key: 0 }, [
      Y(D, { link: l.link }, null, 8, ["link"]),
      x("span", ee, L(l.link.title), 1)
    ], 64)) : l.folder ? (r(), s(F, { key: 1 }, [
      x("div", {
        class: "launcher-folder-preview",
        title: `打开${l.folder.title}`
      }, [
        (r(!0), s(F, null, j(y.value, (I) => (r(), q(D, {
          key: I.id,
          link: I,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        l.folder.count > i.value ? (r(), s("span", ne, "+" + L(l.folder.count - (i.value - 1)), 1)) : z("", !0),
        y.value.length ? z("", !0) : (r(), s("span", le, "📁")),
        G(n.$slots, "default", {}, void 0, !0)
      ], 8, te),
      x("span", oe, L(l.folder.title), 1)
    ], 64)) : z("", !0);
  }
}), ie = /* @__PURE__ */ T(re, [["__scopeId", "data-v-7f513029"]]);
export {
  ie as L,
  D as a
};
