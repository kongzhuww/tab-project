import { d as N, o as F, e as M, f as n, g as r, h as o, j as d, B as v, t as h, F as g, i as P, u as b, q as V, D as w, b as p, c as z } from "./chunks/vendor-vue-_upDT3S_.js";
import { _ as L, e as $ } from "./chunks/_plugin-vue_export-helper-DtNgUcga.js";
import { S as j } from "./chunks/StickerBoard-CoEBwyRr.js";
import { a as f } from "./chunks/stickers.service-BwfsLlup.js";
import { w as q } from "./chunks/InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { g as y, i as S, s as H } from "./chunks/quick-links-export.service-BSSTNgxD.js";
const Q = { class: "sticker-app" }, U = {
  key: 0,
  class: "sticker-side-nav"
}, G = {
  key: 1,
  class: "sticker-side-tools"
}, J = {
  key: 2,
  class: "sticker-page-section"
}, K = { class: "sticker-page-grid" }, O = {
  key: 0,
  class: "sticker-empty"
}, R = ["title", "onClick"], X = ["src"], Y = ["hidden"], Z = /* @__PURE__ */ N({
  __name: "StickerStandalone",
  setup(et) {
    const C = w(() => import("./chunks/SettingsDialog-oeAnMYp2.js")), B = w(() => import("./chunks/AppPromptModal-Cy4fFeAF.js")), m = document.body.dataset.mode === "sidepanel", l = p([]), i = p("等待扫描"), u = p(""), _ = p(!1);
    let k = 0;
    function a(s, e = !1) {
      u.value = s, _.value = e, clearTimeout(k), k = window.setTimeout(() => {
        u.value = "";
      }, 2800);
    }
    F(() => {
      f.onToast = a;
    }), M(() => {
      f.onToast = void 0, clearTimeout(k);
    });
    function I() {
      location.href = "stickers.html";
    }
    async function W() {
      try {
        const s = await y();
        if (!S(s)) throw new Error("当前标签页不是普通网页");
        const e = await H(s);
        a(e.ok ? "已保存到常用网站" : e.error || "保存失败", !e.ok);
      } catch (s) {
        a(s?.message || "保存失败", !0);
      }
    }
    async function A() {
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
          })).filter((t) => t.url && !t.url.startsWith("blob:") && t.width >= 32 && t.height >= 32).filter((t, c, x) => x.findIndex((D) => D.url === t.url) === c).sort((t, c) => c.width * c.height - t.width * t.height).slice(0, 80)
        });
        l.value = e?.[0]?.result || [], i.value = `${l.value.length} 张 · 点击保存`;
      } catch (s) {
        i.value = "扫描失败", a(s?.message || "无法扫描当前页", !0);
      }
    }
    async function E(s) {
      try {
        const e = await q(() => f.saveImageToFavoritesAny({ url: s.url }));
        if (!e.ok) throw new Error(e.error);
        a("图片已保存到当前图库");
      } catch (e) {
        a(e?.message || "保存图片失败", !0);
      }
    }
    return (s, e) => (n(), r(g, null, [
      o("main", Q, [
        m ? (n(), r("nav", U, [...e[0] || (e[0] = [
          o("a", { href: "sidepanel.html" }, "← 工具首页", -1),
          o("span", null, "表情包", -1)
        ])])) : d("", !0),
        v(j),
        m ? (n(), r("div", G, [
          o("button", {
            type: "button",
            onClick: I
          }, "完整工具 ↗"),
          o("button", {
            type: "button",
            onClick: W
          }, "☆ 保存网页到常用网站")
        ])) : d("", !0),
        m ? (n(), r("section", J, [
          o("header", null, [
            o("div", null, [
              e[1] || (e[1] = o("strong", null, "当前网页图片", -1)),
              o("span", null, h(i.value), 1)
            ]),
            o("button", {
              type: "button",
              onClick: A
            }, "扫描当前页")
          ]),
          o("div", K, [
            i.value.endsWith("0 张 · 点击保存") ? (n(), r("div", O, "当前页面没有可收集的图片")) : d("", !0),
            (n(!0), r(g, null, P(l.value, (t) => (n(), r("button", {
              key: t.url,
              type: "button",
              class: "sticker-page-image",
              title: t.alt || t.url,
              onClick: (c) => E(t)
            }, [
              o("img", {
                src: t.url,
                loading: "lazy",
                alt: ""
              }, null, 8, X),
              o("i", null, h(t.width) + "×" + h(t.height), 1)
            ], 8, R))), 128))
          ])
        ])) : d("", !0)
      ]),
      v(b(C)),
      v(b(B)),
      o("div", {
        id: "sticker-toast",
        class: V(["sticker-toast", { bad: _.value }]),
        hidden: !u.value
      }, h(u.value), 11, Y)
    ], 64));
  }
}), tt = /* @__PURE__ */ L(Z, [["__scopeId", "data-v-7b038dbe"]]);
$();
const T = document.getElementById("vue-sticker-standalone-root");
T && z(tt).mount(T);
