import { d as F, o as M, e as P, f as n, g as a, h as o, j as d, C as v, t as h, F as g, i as V, u as b, s as z, E as w, b as p, c as D } from "./chunks/vendor-vue-BbmU9NUg.js";
import { S as L } from "./chunks/StickerBoard-ywD9rePR.js";
import { a as f } from "./chunks/stickers.service-DwyFQlqA.js";
import { w as $ } from "./chunks/InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { g as y, i as S, s as j } from "./chunks/quick-links-export.service-bmE4-0fH.js";
import { _ as H } from "./chunks/_plugin-vue_export-helper-CP_tFnee.js";
const Q = { class: "sticker-app" }, U = {
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
    const T = w(() => import("./chunks/SettingsDialog-Ma60cdlT.js")), B = w(() => import("./chunks/AppPromptModal-Bl4xlX3c.js")), m = document.body.dataset.mode === "sidepanel", l = p([]), i = p("等待扫描"), u = p(""), _ = p(!1);
    let k = 0;
    function r(s, e = !1) {
      u.value = s, _.value = e, clearTimeout(k), k = window.setTimeout(() => {
        u.value = "";
      }, 2800);
    }
    M(() => {
      f.onToast = r;
    }), P(() => {
      f.onToast = void 0, clearTimeout(k);
    });
    function E() {
      location.href = "stickers.html";
    }
    async function I() {
      try {
        const s = await y();
        if (!S(s)) throw new Error("当前标签页不是普通网页");
        const e = await j(s);
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
        m ? (n(), a("nav", U, [...e[0] || (e[0] = [
          o("a", { href: "sidepanel.html" }, "← 工具首页", -1),
          o("span", null, "表情包", -1)
        ])])) : d("", !0),
        v(L),
        m ? (n(), a("div", q, [
          o("button", {
            type: "button",
            onClick: E
          }, "完整工具 ↗"),
          o("button", {
            type: "button",
            onClick: I
          }, "☆ 保存网页到常用网站")
        ])) : d("", !0),
        m ? (n(), a("section", G, [
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
              onClick: (c) => A(t)
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
}), Z = /* @__PURE__ */ H(Y, [["__scopeId", "data-v-7b038dbe"]]), C = document.getElementById("vue-sticker-standalone-root");
C && D(Z).mount(C);
