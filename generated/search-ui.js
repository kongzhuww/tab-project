import { d as w, b as d, D as b, H as _, z as k, o as y, f as S, g as t, t as a, n as E, j as D, E as x, I as $, F as C, x as c, c as L } from "./chunks/vendor-vue-wIH4jcna.js";
import { S as B, i as H } from "./chunks/SearchBox-C3NNrgex.js";
import { s as I } from "./chunks/search.service-BaF_8M5R.js";
const T = { class: "sub-newtab-topbar" }, M = { class: "sub-newtab-center" }, N = { class: "hero-clock" }, V = { id: "greeting" }, F = {
  id: "clock",
  class: "clock"
}, A = { id: "secs" }, K = {
  id: "date",
  class: "date"
}, P = /* @__PURE__ */ w({
  __name: "SearchLauncher",
  setup(j) {
    const n = d(/* @__PURE__ */ new Date()), o = d(document.documentElement.dataset.theme || "light");
    let l = 0;
    const m = c(() => {
      const e = n.value.getHours();
      return e >= 5 && e < 9 ? "早上好" : e >= 9 && e < 12 ? "上午好" : e >= 12 && e < 14 ? "中午好" : e >= 14 && e < 18 ? "下午好" : e >= 18 && e < 23 ? "晚上好" : e >= 23 || e < 5 ? "夜深了" : "你好";
    }), h = c(() => `${String(n.value.getHours()).padStart(2, "0")}:${String(n.value.getMinutes()).padStart(2, "0")}`), v = c(() => `:${String(n.value.getSeconds()).padStart(2, "0")}`), g = c(() => `${n.value.getFullYear()}年${n.value.getMonth() + 1}月${n.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][n.value.getDay()]}`);
    function i() {
      document.hidden || (n.value = /* @__PURE__ */ new Date());
    }
    function p() {
      o.value = o.value === "light" ? "dark" : "light", document.documentElement.dataset.theme = o.value, localStorage.setItem("theme", o.value);
    }
    function r(e) {
      e.altKey && e.key.toLowerCase() === "h" && (e.preventDefault(), location.href = "newtab.html");
    }
    function f() {
      location.href = "newtab.html";
    }
    return b(() => {
      l = window.setInterval(i, 1e3), document.addEventListener("visibilitychange", i), window.addEventListener("keydown", r), _(() => {
        I.focus();
      });
    }), k(() => {
      clearInterval(l), document.removeEventListener("visibilitychange", i), window.removeEventListener("keydown", r);
    }), (e, s) => (y(), S(C, null, [
      t("div", T, [
        t("button", {
          id: "theme-toggle",
          class: "sub-theme-toggle",
          type: "button",
          title: "切换主题",
          onClick: p
        }, a(o.value === "light" ? "☀" : "🌙"), 1)
      ]),
      t("div", M, [
        t("div", N, [
          t("p", V, a(m.value), 1),
          t("p", F, [
            E(a(h.value), 1),
            t("span", A, a(v.value), 1)
          ]),
          t("p", K, a(g.value), 1)
        ]),
        t("form", {
          id: "search",
          class: "search",
          onSubmit: s[0] || (s[0] = D(() => {
          }, ["prevent"]))
        }, [
          x(B)
        ], 32)
      ]),
      t("aside", { class: "enter-home-dock" }, [
        t("button", {
          id: "enter-home-btn",
          class: "enter-home-btn",
          type: "button",
          title: "进入主标签页（或按 Alt+H）",
          onClick: f
        }, [...s[1] || (s[1] = [
          $('<div class="enter-home-icon">⚡</div><div class="enter-home-text"><span class="enter-home-title">进入主标签页</span><span class="enter-home-desc">播放开屏动画 ➔</span></div><span class="enter-home-arrow">➔</span>', 3)
        ])])
      ])
    ], 64));
  }
});
H();
const u = document.getElementById("vue-search-launcher-root");
u && L(P).mount(u);
