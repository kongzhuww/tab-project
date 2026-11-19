import { d as V, w as $, o as x, y as g, e as M, f as h, g as w, j as k, h as o, t as c, m as N, k as I, C as Q, u as S, l as T, F, E as P, b as y, x as l, c as j } from "./chunks/vendor-vue-BbmU9NUg.js";
import { u as A, g as H, j as K, S as q, s as O, i as R } from "./chunks/drawer-store-BfI-AFt0.js";
import { s as U } from "./chunks/search.service-B3Axreqn.js";
const Y = {
  key: 0,
  id: "hero-background-media",
  class: "quick-wallpaper",
  "aria-hidden": "true"
}, z = { class: "sub-newtab-center" }, G = { class: "hero-clock" }, J = { id: "greeting" }, X = {
  id: "clock",
  class: "clock"
}, Z = { id: "secs" }, ee = {
  id: "date",
  class: "date"
}, ae = /* @__PURE__ */ V({
  __name: "SearchLauncher",
  setup(te) {
    const D = P(() => import("./chunks/InPageSideDrawer-DzgEeQEQ.js")), b = A(() => O.isOpen);
    let p;
    const a = y(/* @__PURE__ */ new Date());
    let m = 0;
    const t = y(!0);
    let r = !1, d = 0;
    async function s(e) {
      const n = ++d;
      if (!e) return;
      await g();
      const { WallpaperService: i } = await import("./chunks/wallpaper.service-BubE3Pw2.js").then((E) => E.w);
      r && t.value && n === d && await i.initWallpaper({ fallbackWhenNone: !0 });
    }
    function v(e, n) {
      if (n !== "local") return;
      e.showQuickSearchWallpaper && (t.value = e.showQuickSearchWallpaper.newValue !== !1);
      const i = e.heroBackground?.newValue;
      t.value && (i === "none" || i?.type === "none") && s(!0);
    }
    $(t, (e) => {
      r && s(e);
    });
    const C = l(() => {
      const e = a.value.getHours();
      return e >= 5 && e < 9 ? "早上好" : e >= 9 && e < 12 ? "上午好" : e >= 12 && e < 14 ? "中午好" : e >= 14 && e < 18 ? "下午好" : e >= 18 && e < 23 ? "晚上好" : e >= 23 || e < 5 ? "夜深了" : "你好";
    }), W = l(() => `${String(a.value.getHours()).padStart(2, "0")}:${String(a.value.getMinutes()).padStart(2, "0")}`), L = l(() => `:${String(a.value.getSeconds()).padStart(2, "0")}`), B = l(() => `${a.value.getFullYear()}年${a.value.getMonth() + 1}月${a.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][a.value.getDay()]}`);
    function u() {
      document.hidden || (a.value = /* @__PURE__ */ new Date());
    }
    function f(e) {
      e.altKey && e.key.toLowerCase() === "h" && (e.preventDefault(), location.href = "newtab.html");
    }
    return x(() => {
      r = !0, p = H(), typeof chrome < "u" && chrome.storage?.local ? (chrome.storage.onChanged.addListener(v), chrome.storage.local.get("showQuickSearchWallpaper").then((e) => {
        r && (t.value = e.showQuickSearchWallpaper !== !1, t.value && s(!0));
      })) : s(!0), m = window.setInterval(u, 1e3), document.addEventListener("visibilitychange", u), window.addEventListener("keydown", f), g(() => {
        U.focus();
      });
    }), M(() => {
      r = !1, p?.(), K.close(), d++, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener(v), clearInterval(m), document.removeEventListener("visibilitychange", u), window.removeEventListener("keydown", f);
    }), (e, n) => (h(), w(F, null, [
      t.value ? (h(), w("div", Y)) : k("", !0),
      o("div", z, [
        o("div", G, [
          o("p", J, c(C.value), 1),
          o("p", X, [
            N(c(W.value), 1),
            o("span", Z, c(L.value), 1)
          ]),
          o("p", ee, c(B.value), 1)
        ]),
        o("form", {
          id: "search",
          class: "search",
          onSubmit: n[0] || (n[0] = I(() => {
          }, ["prevent"]))
        }, [
          Q(q)
        ], 32)
      ]),
      S(b) ? (h(), T(S(D), { key: 1 })) : k("", !0)
    ], 64));
  }
});
R();
const _ = document.getElementById("vue-search-launcher-root");
_ && j(ae).mount(_);
