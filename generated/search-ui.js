import { d as w, b as d, C as b, G as _, y as k, o as y, e as S, f as t, t as a, m as D, i as E, D as C, H as $, F as x, s as c, O as L } from "./chunks/vendor-vue-DokqDua_.js";
import { S as B, i as H } from "./chunks/SearchBox-2TwJjwnv.js";
import { s as T } from "./chunks/search.service-D8BPpHmG.js";
const I = { class: "sub-newtab-topbar" }, M = { class: "sub-newtab-center" }, N = { class: "hero-clock" }, V = { id: "greeting" }, F = {
  id: "clock",
  class: "clock"
}, A = { id: "secs" }, K = {
  id: "date",
  class: "date"
}, P = /* @__PURE__ */ w({
  __name: "SearchLauncher",
  setup(G) {
    const o = d(/* @__PURE__ */ new Date()), n = d(document.documentElement.dataset.theme || "light");
    let l = 0;
    const m = c(() => {
      const e = o.value.getHours();
      return e >= 5 && e < 9 ? "早上好" : e >= 9 && e < 12 ? "上午好" : e >= 12 && e < 14 ? "中午好" : e >= 14 && e < 18 ? "下午好" : e >= 18 && e < 23 ? "晚上好" : e >= 23 || e < 5 ? "夜深了" : "你好";
    }), h = c(() => `${String(o.value.getHours()).padStart(2, "0")}:${String(o.value.getMinutes()).padStart(2, "0")}`), v = c(() => `:${String(o.value.getSeconds()).padStart(2, "0")}`), g = c(() => `${o.value.getFullYear()}年${o.value.getMonth() + 1}月${o.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][o.value.getDay()]}`);
    function i() {
      document.hidden || (o.value = /* @__PURE__ */ new Date());
    }
    function p() {
      n.value = n.value === "light" ? "dark" : "light", document.documentElement.dataset.theme = n.value, localStorage.setItem("theme", n.value);
    }
    function r(e) {
      e.altKey && e.key.toLowerCase() === "h" && (e.preventDefault(), location.href = "newtab.html");
    }
    function f() {
      location.href = "newtab.html";
    }
    return b(() => {
      l = window.setInterval(i, 1e3), document.addEventListener("visibilitychange", i), window.addEventListener("keydown", r), _(() => {
        T.focus();
      });
    }), k(() => {
      clearInterval(l), document.removeEventListener("visibilitychange", i), window.removeEventListener("keydown", r);
    }), (e, s) => (y(), S(x, null, [
      t("div", I, [
        t("button", {
          id: "theme-toggle",
          class: "sub-theme-toggle",
          type: "button",
          title: "切换主题",
          onClick: p
        }, a(n.value === "light" ? "☀" : "🌙"), 1)
      ]),
      t("div", M, [
        t("div", N, [
          t("p", V, a(m.value), 1),
          t("p", F, [
            D(a(h.value), 1),
            t("span", A, a(v.value), 1)
          ]),
          t("p", K, a(g.value), 1)
        ]),
        t("form", {
          id: "search",
          class: "search",
          onSubmit: s[0] || (s[0] = E(() => {
          }, ["prevent"]))
        }, [
          C(B)
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
