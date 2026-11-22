import { l as _ } from "./search.service-gzbpg5BD.js";
import { d as O, w as q, o as H, f as r, g as s, q as J, t as L, s as C, b as w, F, B as K, h as x, i as P, l as X, j as B, J as Y } from "./vendor-vue-C-_ocEUS.js";
import { _ as T } from "./_plugin-vue_export-helper-CUD1GoS1.js";
const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
function G(l, o) {
  for (a.delete(l), a.set(l, o), c.delete(o), c.add(o); a.size > 512; )
    a.delete(a.keys().next().value);
  for (; c.size > 512; )
    c.delete(c.values().next().value);
}
const Q = {
  key: 0,
  class: "launcher-fallback"
}, Z = ["src"], E = "lw_resolved_icon:", V = /* @__PURE__ */ O({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(l) {
    function o(e) {
      try {
        return localStorage.getItem(E + e) || "";
      } catch {
        return "";
      }
    }
    function i(e, t) {
      try {
        localStorage.setItem(E + e, t);
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
    function z(e) {
      try {
        return new URL(e).hostname.replace(/^www\./, "");
      } catch {
        return e || "";
      }
    }
    function S(e) {
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
      const e = n.link, t = (e.title || z(e.url)).trim();
      return t ? t.slice(0, 1).toUpperCase() : "🔗";
    }), u = w([]), f = w(0), m = w(!1), h = w(!1), I = C(() => h.value || f.value >= u.value.length ? "" : u.value[f.value] || "");
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
      const p = S(e.url);
      p && !p.startsWith("http://1.") && !p.startsWith("http://192.") && !p.startsWith("http://127.") && t.push(`${p}/favicon.ico`), e.customIcon && !v(e.customIcon) && t.unshift(e.customIcon);
      const R = [...new Set(t.filter(Boolean))];
      u.value = R, f.value = 0, h.value = R.length === 0;
      const U = R[0];
      U && (U.startsWith("data:") || c.has(U)) && (m.value = !0);
    }
    q(
      () => [n.link?.url, n.link?.icon, n.link?.customIcon],
      (e, t) => {
        t && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] || W();
      },
      { immediate: !0 }
    ), H(() => {
      u.value.length === 0 && W();
    });
    function M(e) {
      m.value = !0, h.value = !1;
      const t = I.value;
      if (t) {
        const d = c.has(t), g = a.get(n.link.url);
        G(n.link.url, t), g !== t && o(n.link.url) !== t && i(n.link.url, t);
        const v = e.target;
        if (!d && !t.startsWith("data:")) {
          const k = n.link.url;
          setTimeout(() => {
            _.cacheIcon(k, t, v?.getAttribute("src") === t ? v : null);
          }, 0);
        }
      }
    }
    function j() {
      const e = I.value;
      if (e) {
        c.delete(e), a.get(n.link.url) === e && a.delete(n.link.url);
        try {
          localStorage.removeItem(E + n.link.url), localStorage.removeItem("lw_sync_dataurl:" + n.link.url);
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
      class: J(l.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      h.value || !I.value ? (r(), s("span", Q, L(A.value), 1)) : (r(), s("img", {
        key: 1,
        src: I.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: M,
        onError: j
      }, null, 40, Z))
    ], 2));
  }
}), D = /* @__PURE__ */ T(V, [["__scopeId", "data-v-49e611bb"]]), ee = { class: "launcher-label launcher-title" }, te = ["title"], ne = {
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
    return (n, z) => l.link ? (r(), s(F, { key: 0 }, [
      K(D, { link: l.link }, null, 8, ["link"]),
      x("span", ee, L(l.link.title), 1)
    ], 64)) : l.folder ? (r(), s(F, { key: 1 }, [
      x("div", {
        class: "launcher-folder-preview",
        title: `打开${l.folder.title}`
      }, [
        (r(!0), s(F, null, P(y.value, (S) => (r(), X(D, {
          key: S.id,
          link: S,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        l.folder.count > i.value ? (r(), s("span", ne, "+" + L(l.folder.count - (i.value - 1)), 1)) : B("", !0),
        y.value.length ? B("", !0) : (r(), s("span", le, "📁")),
        Y(n.$slots, "default", {}, void 0, !0)
      ], 8, te),
      x("span", oe, L(l.folder.title), 1)
    ], 64)) : B("", !0);
  }
}), ie = /* @__PURE__ */ T(re, [["__scopeId", "data-v-289b8350"]]);
export {
  ie as L,
  D as a
};
