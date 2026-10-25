import { d as D, C as F, y as M, o as a, e as n, f as o, g as d, D as f, t as h, F as g, h as P, u as y, B as V, E as w, b as p, N as z } from "./chunks/vendor-vue-CjOHdfe5.js";
import { S as L } from "./chunks/StickerBoard-BKVV-W-Y.js";
import { a as v } from "./chunks/stickers.service-IL7ouITS.js";
import { j as $ } from "./chunks/read-session-C1M3QoXl.js";
import { g as b, i as S, s as j } from "./chunks/quick-links-export.service-bmE4-0fH.js";
import { _ as H } from "./chunks/_plugin-vue_export-helper-CHgC5LLL.js";
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
}, O = ["title", "onClick"], R = ["src"], X = ["hidden"], Y = /* @__PURE__ */ D({
  __name: "StickerStandalone",
  setup(tt) {
    const T = w(() => import("./chunks/SettingsDialog-D_TYBV4x.js")), B = w(() => import("./chunks/AppPromptModal-DLEL0uaJ.js")), m = document.body.dataset.mode === "sidepanel", l = p([]), i = p("等待扫描"), u = p(""), _ = p(!1);
    let k = 0;
    function r(s, e = !1) {
      u.value = s, _.value = e, clearTimeout(k), k = window.setTimeout(() => {
        u.value = "";
      }, 2800);
    }
    F(() => {
      v.onToast = r;
    }), M(() => {
      v.onToast = void 0, clearTimeout(k);
    });
    function E() {
      location.href = "stickers.html";
    }
    async function I() {
      try {
        const s = await b();
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
        const s = await b();
        if (!S(s) || !s?.id) throw new Error("当前标签页不是普通网页");
        const e = await chrome.scripting.executeScript({
          target: { tabId: s.id },
          func: () => [...document.images].map((t) => ({
            url: t.currentSrc || t.src,
            width: t.naturalWidth || t.width,
            height: t.naturalHeight || t.height,
            alt: t.alt || ""
          })).filter((t) => t.url && !t.url.startsWith("blob:") && t.width >= 32 && t.height >= 32).filter((t, c, N) => N.findIndex((x) => x.url === t.url) === c).sort((t, c) => c.width * c.height - t.width * t.height).slice(0, 80)
        });
        l.value = e?.[0]?.result || [], i.value = `${l.value.length} 张 · 点击保存`;
      } catch (s) {
        i.value = "扫描失败", r(s?.message || "无法扫描当前页", !0);
      }
    }
    async function A(s) {
      try {
        const e = await $(() => v.saveImageToFavoritesAny({ url: s.url }));
        if (!e.ok) throw new Error(e.error);
        r("图片已保存到当前图库");
      } catch (e) {
        r(e?.message || "保存图片失败", !0);
      }
    }
    return (s, e) => (a(), n(g, null, [
      o("main", Q, [
        m ? (a(), n("nav", U, [...e[0] || (e[0] = [
          o("a", { href: "sidepanel.html" }, "← 工具首页", -1),
          o("span", null, "表情包", -1)
        ])])) : d("", !0),
        f(L),
        m ? (a(), n("div", q, [
          o("button", {
            type: "button",
            onClick: E
          }, "完整工具 ↗"),
          o("button", {
            type: "button",
            onClick: I
          }, "☆ 保存网页到常用网站")
        ])) : d("", !0),
        m ? (a(), n("section", G, [
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
            i.value.endsWith("0 张 · 点击保存") ? (a(), n("div", K, "当前页面没有可收集的图片")) : d("", !0),
            (a(!0), n(g, null, P(l.value, (t) => (a(), n("button", {
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
      f(y(T)),
      f(y(B)),
      o("div", {
        id: "sticker-toast",
        class: V(["sticker-toast", { bad: _.value }]),
        hidden: !u.value
      }, h(u.value), 11, X)
    ], 64));
  }
}), Z = /* @__PURE__ */ H(Y, [["__scopeId", "data-v-afcc7f36"]]), C = document.getElementById("vue-sticker-standalone-root");
C && z(Z).mount(C);
