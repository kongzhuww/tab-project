import { d as $, w as x, o as E, x as g, e as M, f as p, g as w, j as k, h as o, t as c, m as I, k as N, B as T, u as S, l as Q, F, D as P, b as _, s as l, c as j } from "./chunks/vendor-vue-_upDT3S_.js";
import { u as A, g as H, j as K, S as q, s as O, i as R } from "./chunks/drawer-store-Bgl7wnLO.js";
import { e as U } from "./chunks/_plugin-vue_export-helper-DtNgUcga.js";
import { s as Y } from "./chunks/search.service-I5ZPPxGy.js";
const z = {
  key: 0,
  id: "hero-background-media",
  class: "quick-wallpaper",
  "aria-hidden": "true"
}, G = { class: "sub-newtab-center" }, J = { class: "hero-clock" }, X = { id: "greeting" }, Z = {
  id: "clock",
  class: "clock"
}, ee = { id: "secs" }, ae = {
  id: "date",
  class: "date"
}, te = /* @__PURE__ */ $({
  __name: "SearchLauncher",
  setup(oe) {
    const D = P(() => import("./chunks/InPageSideDrawer-O98gJrHG.js")), b = A(() => O.isOpen);
    let h;
    const a = _(/* @__PURE__ */ new Date());
    let m = 0;
    const t = _(!0);
    let r = !1, d = 0;
    async function s(e) {
      const n = ++d;
      if (!e) return;
      await g();
      const { WallpaperService: i } = await import("./chunks/wallpaper.service-Bv45Nhfa.js").then((V) => V.w);
      r && t.value && n === d && await i.initWallpaper({ fallbackWhenNone: !0 });
    }
    function v(e, n) {
      if (n !== "local") return;
      e.showQuickSearchWallpaper && (t.value = e.showQuickSearchWallpaper.newValue !== !1);
      const i = e.heroBackground?.newValue;
      t.value && (i === "none" || i?.type === "none") && s(!0);
    }
    x(t, (e) => {
      r && s(e);
    });
    const C = l(() => {
      const e = a.value.getHours();
      return e >= 5 && e < 9 ? "早上好" : e >= 9 && e < 12 ? "上午好" : e >= 12 && e < 14 ? "中午好" : e >= 14 && e < 18 ? "下午好" : e >= 18 && e < 23 ? "晚上好" : e >= 23 || e < 5 ? "夜深了" : "你好";
    }), W = l(() => `${String(a.value.getHours()).padStart(2, "0")}:${String(a.value.getMinutes()).padStart(2, "0")}`), B = l(() => `:${String(a.value.getSeconds()).padStart(2, "0")}`), L = l(() => `${a.value.getFullYear()}年${a.value.getMonth() + 1}月${a.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][a.value.getDay()]}`);
    function u() {
      document.hidden || (a.value = /* @__PURE__ */ new Date());
    }
    function f(e) {
      e.altKey && e.key.toLowerCase() === "h" && (e.preventDefault(), location.href = "newtab.html");
    }
    return E(() => {
      r = !0, h = H(), typeof chrome < "u" && chrome.storage?.local ? (chrome.storage.onChanged.addListener(v), chrome.storage.local.get("showQuickSearchWallpaper").then((e) => {
        r && (t.value = e.showQuickSearchWallpaper !== !1, t.value && s(!0));
      })) : s(!0), m = window.setInterval(u, 1e3), document.addEventListener("visibilitychange", u), window.addEventListener("keydown", f), g(() => {
        Y.focus();
      });
    }), M(() => {
      r = !1, h?.(), K.close(), d++, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener(v), clearInterval(m), document.removeEventListener("visibilitychange", u), window.removeEventListener("keydown", f);
    }), (e, n) => (p(), w(F, null, [
      t.value ? (p(), w("div", z)) : k("", !0),
      o("div", G, [
        o("div", J, [
          o("p", X, c(C.value), 1),
          o("p", Z, [
            I(c(W.value), 1),
            o("span", ee, c(B.value), 1)
          ]),
          o("p", ae, c(L.value), 1)
        ]),
        o("form", {
          id: "search",
          class: "search",
          onSubmit: n[0] || (n[0] = N(() => {
          }, ["prevent"]))
        }, [
          T(q)
        ], 32)
      ]),
      S(b) ? (p(), Q(S(D), { key: 1 })) : k("", !0)
    ], 64));
  }
});
R();
U();
const y = document.getElementById("vue-search-launcher-root");
y && j(te).mount(y);
