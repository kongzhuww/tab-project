import { d as F, B as M, x as P, o as n, e as a, i as o, f as d, p as v, t as h, F as g, g as V, u as b, A as z, C as w, b as p, c as D } from "./chunks/vendor-vue-9b0eS4bW.js";
import { S as L } from "./chunks/StickerBoard-DreYTFj7.js";
import { a as f, w as $ } from "./chunks/stickers.service-Bdd21-le.js";
import { g as y, i as S, s as H } from "./chunks/quick-links-export.service-bmE4-0fH.js";
import { _ as Q } from "./chunks/_plugin-vue_export-helper-BxikU0LD.js";
const U = { class: "sticker-app" }, j = {
  key: 0,
  class: "sticker-side-nav"
}, q = {
  key: 1,
  class: "sticker-side-tools"
}, G = {
  key: 2,
  class: "sticker-page-section"
}, J = { class: "sticker-page-grid" }, K = {
  key: 0,
  class: "sticker-empty"
}, O = ["title", "onClick"], R = ["src"], X = ["hidden"], Y = /* @__PURE__ */ F({
  __name: "StickerStandalone",
  setup(tt) {
    const T = w(() => import("./chunks/SettingsDialog-CVYav4Ip.js")), B = w(() => import("./chunks/AppPromptModal-B4AzoAKC.js")), k = document.body.dataset.mode === "sidepanel", l = p([]), i = p("等待扫描"), u = p(""), _ = p(!1);
    let m = 0;
    function r(s, e = !1) {
      u.value = s, _.value = e, clearTimeout(m), m = window.setTimeout(() => {
        u.value = "";
      }, 2800);
    }
    M(() => {
      f.onToast = r;
    }), P(() => {
      f.onToast = void 0, clearTimeout(m);
    });
    function A() {
      location.href = "stickers.html";
    }
    async function I() {
      try {
        const s = await y();
        if (!S(s)) throw new Error("当前标签页不是普通网页");
        const e = await H(s);
        r(e.ok ? "已保存到常用网站" : e.error || "保存失败", !e.ok);
      } catch (s) {
        r(s?.message || "保存失败", !0);
      }
    }
    async function W() {
      i.value = "正在扫描…", l.value = [];
      try {
        const s = await y();
        if (!S(s) || !s?.id) throw new Error("当前标签页不是普通网页");
        const e = await chrome.scripting.executeScript({
          target: { tabId: s.id },
          func: () => [...document.images].map((t) => ({
            url: t.currentSrc || t.src,
            width: t.naturalWidth || t.width,
            height: t.naturalHeight || t.height,
            alt: t.alt || ""
          })).filter((t) => t.url && !t.url.startsWith("blob:") && t.width >= 32 && t.height >= 32).filter((t, c, E) => E.findIndex((N) => N.url === t.url) === c).sort((t, c) => c.width * c.height - t.width * t.height).slice(0, 80)
        });
        l.value = e?.[0]?.result || [], i.value = `${l.value.length} 张 · 点击保存`;
      } catch (s) {
        i.value = "扫描失败", r(s?.message || "无法扫描当前页", !0);
      }
    }
    async function x(s) {
      try {
        const e = await $(() => f.saveImageToFavoritesAny({ url: s.url }));
        if (!e.ok) throw new Error(e.error);
        r("图片已保存到当前图库");
      } catch (e) {
        r(e?.message || "保存图片失败", !0);
      }
    }
    return (s, e) => (n(), a(g, null, [
      o("main", U, [
        k ? (n(), a("nav", j, [...e[0] || (e[0] = [
          o("a", { href: "sidepanel.html" }, "← 工具首页", -1),
          o("span", null, "表情包", -1)
        ])])) : d("", !0),
        v(L),
        k ? (n(), a("div", q, [
          o("button", {
            type: "button",
            onClick: A
          }, "完整工具 ↗"),
          o("button", {
            type: "button",
            onClick: I
          }, "☆ 保存网页到常用网站")
        ])) : d("", !0),
        k ? (n(), a("section", G, [
          o("header", null, [
            o("div", null, [
              e[1] || (e[1] = o("strong", null, "当前网页图片", -1)),
              o("span", null, h(i.value), 1)
            ]),
            o("button", {
              type: "button",
              onClick: W
            }, "扫描当前页")
          ]),
          o("div", J, [
            i.value.endsWith("0 张 · 点击保存") ? (n(), a("div", K, "当前页面没有可收集的图片")) : d("", !0),
            (n(!0), a(g, null, V(l.value, (t) => (n(), a("button", {
              key: t.url,
              type: "button",
              class: "sticker-page-image",
              title: t.alt || t.url,
              onClick: (c) => x(t)
            }, [
              o("img", {
                src: t.url,
                loading: "lazy",
                alt: ""
              }, null, 8, R),
              o("i", null, h(t.width) + "×" + h(t.height), 1)
            ], 8, O))), 128))
          ])
        ])) : d("", !0)
      ]),
      v(b(T)),
      v(b(B)),
      o("div", {
        id: "sticker-toast",
        class: z(["sticker-toast", { bad: _.value }]),
        hidden: !u.value
      }, h(u.value), 11, X)
    ], 64));
  }
}), Z = /* @__PURE__ */ Q(Y, [["__scopeId", "data-v-7b038dbe"]]), C = document.getElementById("vue-sticker-standalone-root");
C && D(Z).mount(C);
