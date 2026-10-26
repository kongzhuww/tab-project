import { d as _, b as d, C as w, G as b, y as k, o as y, e as S, f as t, t as a, m as D, i as E, D as $, H as C, F as L, s as i, N as x } from "./chunks/vendor-vue-CjOHdfe5.js";
import { _ as B, i as H } from "./chunks/dock-lifecycle.store-DsRd7nze.js";
import { s as N } from "./chunks/search.service-lHw6yJW3.js";
import { cliBridgeRuntime as T } from "./chunks/cli-bridge-BIlexgHR.js";
const I = { class: "sub-newtab-topbar" }, M = { class: "sub-newtab-center" }, V = { class: "hero-clock" }, F = { id: "greeting" }, A = {
  id: "clock",
  class: "clock"
}, K = { id: "secs" }, P = {
  id: "date",
  class: "date"
}, G = /* @__PURE__ */ _({
  __name: "SearchLauncher",
  setup(R) {
    const n = d(/* @__PURE__ */ new Date()), o = d(document.documentElement.dataset.theme || "light");
    let l = 0;
    const m = i(() => {
      const e = n.value.getHours();
      return e >= 5 && e < 9 ? "早上好" : e >= 9 && e < 12 ? "上午好" : e >= 12 && e < 14 ? "中午好" : e >= 14 && e < 18 ? "下午好" : e >= 18 && e < 23 ? "晚上好" : e >= 23 || e < 5 ? "夜深了" : "你好";
    }), h = i(() => `${String(n.value.getHours()).padStart(2, "0")}:${String(n.value.getMinutes()).padStart(2, "0")}`), v = i(() => `:${String(n.value.getSeconds()).padStart(2, "0")}`), g = i(() => `${n.value.getFullYear()}年${n.value.getMonth() + 1}月${n.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][n.value.getDay()]}`);
    function c() {
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
    return w(() => {
      l = window.setInterval(c, 1e3), document.addEventListener("visibilitychange", c), window.addEventListener("keydown", r), b(() => {
        N.focus();
      });
    }), k(() => {
      clearInterval(l), document.removeEventListener("visibilitychange", c), window.removeEventListener("keydown", r);
    }), (e, s) => (y(), S(L, null, [
      t("div", I, [
        t("button", {
          id: "theme-toggle",
          class: "sub-theme-toggle",
          type: "button",
          title: "切换主题",
          onClick: p
        }, a(o.value === "light" ? "☀" : "🌙"), 1)
      ]),
      t("div", M, [
        t("div", V, [
          t("p", F, a(m.value), 1),
          t("p", A, [
            D(a(h.value), 1),
            t("span", K, a(v.value), 1)
          ]),
          t("p", P, a(g.value), 1)
        ]),
        t("form", {
          id: "search",
          class: "search",
          onSubmit: s[0] || (s[0] = E(() => {
          }, ["prevent"]))
        }, [
          $(B)
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
          C('<div class="enter-home-icon">⚡</div><div class="enter-home-text"><span class="enter-home-title">进入主标签页</span><span class="enter-home-desc">播放开屏动画 ➔</span></div><span class="enter-home-arrow">➔</span>', 3)
        ])])
      ])
    ], 64));
  }
});
H();
const u = document.getElementById("vue-search-launcher-root");
u && x(G).mount(u);
T.start();
