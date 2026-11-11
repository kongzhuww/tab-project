import { d as w, b as d, B as b, D as _, x as k, o as y, e as S, i as t, t as a, m as E, h as D, p as x, E as $, F as B, s as c, c as C } from "./chunks/vendor-vue-9b0eS4bW.js";
import { S as L, i as T } from "./chunks/SearchBox-BAAvcwmE.js";
import { s as H } from "./chunks/search.service-B3RWjSnd.js";
const I = { class: "sub-newtab-topbar" }, M = { class: "sub-newtab-center" }, N = { class: "hero-clock" }, V = { id: "greeting" }, F = {
  id: "clock",
  class: "clock"
}, A = { id: "secs" }, K = {
  id: "date",
  class: "date"
}, P = /* @__PURE__ */ w({
  __name: "SearchLauncher",
  setup(U) {
    const o = d(/* @__PURE__ */ new Date()), n = d(document.documentElement.dataset.theme || "light");
    let l = 0;
    const m = c(() => {
      const e = o.value.getHours();
      return e >= 5 && e < 9 ? "早上好" : e >= 9 && e < 12 ? "上午好" : e >= 12 && e < 14 ? "中午好" : e >= 14 && e < 18 ? "下午好" : e >= 18 && e < 23 ? "晚上好" : e >= 23 || e < 5 ? "夜深了" : "你好";
    }), h = c(() => `${String(o.value.getHours()).padStart(2, "0")}:${String(o.value.getMinutes()).padStart(2, "0")}`), v = c(() => `:${String(o.value.getSeconds()).padStart(2, "0")}`), p = c(() => `${o.value.getFullYear()}年${o.value.getMonth() + 1}月${o.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][o.value.getDay()]}`);
    function i() {
      document.hidden || (o.value = /* @__PURE__ */ new Date());
    }
    function g() {
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
        H.focus();
      });
    }), k(() => {
      clearInterval(l), document.removeEventListener("visibilitychange", i), window.removeEventListener("keydown", r);
    }), (e, s) => (y(), S(B, null, [
      t("div", I, [
        t("button", {
          id: "theme-toggle",
          class: "sub-theme-toggle",
          type: "button",
          title: "切换主题",
          onClick: g
        }, a(n.value === "light" ? "☀" : "🌙"), 1)
      ]),
      t("div", M, [
        t("div", N, [
          t("p", V, a(m.value), 1),
          t("p", F, [
            E(a(h.value), 1),
            t("span", A, a(v.value), 1)
          ]),
          t("p", K, a(p.value), 1)
        ]),
        t("form", {
          id: "search",
          class: "search",
          onSubmit: s[0] || (s[0] = D(() => {
          }, ["prevent"]))
        }, [
          x(L)
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
T();
const u = document.getElementById("vue-search-launcher-root");
u && C(P).mount(u);
