import { d as D, C as F, y as M, o as n, e as a, f as o, g as d, D as v, t as h, F as g, h as P, u as y, B as V, E as w, b as p, O as z } from "./chunks/vendor-vue-DokqDua_.js";
import { S as L } from "./chunks/StickerBoard-BeWjK9Tb.js";
import { b as f, w as $ } from "./chunks/InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { g as b, i as S, s as H } from "./chunks/quick-links-export.service-bmE4-0fH.js";
import { _ as O } from "./chunks/_plugin-vue_export-helper-CHgC5LLL.js";
const Q = { class: "sticker-app" }, U = {
  key: 0,
  class: "sticker-side-nav"
}, j = {
  key: 1,
  class: "sticker-side-tools"
}, q = {
  key: 2,
  class: "sticker-page-section"
}, G = { class: "sticker-page-grid" }, J = {
  key: 0,
  class: "sticker-empty"
}, K = ["title", "onClick"], R = ["src"], X = ["hidden"], Y = /* @__PURE__ */ D({
  __name: "StickerStandalone",
  setup(tt) {
    const T = w(() => import("./chunks/SettingsDialog-B_U73mo0.js")), B = w(() => import("./chunks/AppPromptModal-BeukD1Gs.js")), k = document.body.dataset.mode === "sidepanel", l = p([]), i = p("等待扫描"), u = p(""), _ = p(!1);
    let m = 0;
    function r(s, e = !1) {
      u.value = s, _.value = e, clearTimeout(m), m = window.setTimeout(() => {
        u.value = "";
      }, 2800);
    }
    F(() => {
      f.onToast = r;
    }), M(() => {
      f.onToast = void 0, clearTimeout(m);
    });
    function E() {
      location.href = "stickers.html";
    }
    async function I() {
      try {
        const s = await b();
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
        const s = await b();
        if (!S(s) || !s?.id) throw new Error("当前标签页不是普通网页");
        const e = await chrome.scripting.executeScript({
          target: { tabId: s.id },
          func: () => [...document.images].map((t) => ({
            url: t.currentSrc || t.src,
            width: t.naturalWidth || t.width,
            height: t.naturalHeight || t.height,
            alt: t.alt || ""
          })).filter((t) => t.url && !t.url.startsWith("blob:") && t.width >= 32 && t.height >= 32).filter((t, c, x) => x.findIndex((N) => N.url === t.url) === c).sort((t, c) => c.width * c.height - t.width * t.height).slice(0, 80)
        });
        l.value = e?.[0]?.result || [], i.value = `${l.value.length} 张 · 点击保存`;
      } catch (s) {
        i.value = "扫描失败", r(s?.message || "无法扫描当前页", !0);
      }
    }
    async function A(s) {
      try {
        const e = await $(() => f.saveImageToFavoritesAny({ url: s.url }));
        if (!e.ok) throw new Error(e.error);
        r("图片已保存到当前图库");
      } catch (e) {
        r(e?.message || "保存图片失败", !0);
      }
    }
    return (s, e) => (n(), a(g, null, [
      o("main", Q, [
        k ? (n(), a("nav", U, [...e[0] || (e[0] = [
          o("a", { href: "sidepanel.html" }, "← 工具首页", -1),
          o("span", null, "表情包", -1)
        ])])) : d("", !0),
        v(L),
        k ? (n(), a("div", j, [
          o("button", {
            type: "button",
            onClick: E
          }, "完整工具 ↗"),
          o("button", {
            type: "button",
            onClick: I
          }, "☆ 保存网页到常用网站")
        ])) : d("", !0),
        k ? (n(), a("section", q, [
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
          o("div", G, [
            i.value.endsWith("0 张 · 点击保存") ? (n(), a("div", J, "当前页面没有可收集的图片")) : d("", !0),
            (n(!0), a(g, null, P(l.value, (t) => (n(), a("button", {
              key: t.url,
              type: "button",
              class: "sticker-page-image",
              title: t.alt || t.url,
              onClick: (c) => A(t)
            }, [
              o("img", {
                src: t.url,
                loading: "lazy",
                alt: ""
              }, null, 8, R),
              o("i", null, h(t.width) + "×" + h(t.height), 1)
            ], 8, K))), 128))
          ])
        ])) : d("", !0)
      ]),
      v(y(T)),
      v(y(B)),
      o("div", {
        id: "sticker-toast",
        class: V(["sticker-toast", { bad: _.value }]),
        hidden: !u.value
      }, h(u.value), 11, X)
    ], 64));
  }
}), Z = /* @__PURE__ */ O(Y, [["__scopeId", "data-v-afcc7f36"]]), C = document.getElementById("vue-sticker-standalone-root");
C && z(Z).mount(C);
