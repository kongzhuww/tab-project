import { d as z, D, z as F, o as n, g as a, h as o, i as d, E as v, t as h, F as g, j as M, u as w, C as P, G as y, b as p, c as V } from "./chunks/vendor-vue-dDCd4-uG.js";
import { S as L } from "./chunks/StickerBoard-B9xmDs6x.js";
import { b as f, w as $ } from "./chunks/stickers.service-Qf4pDC-d.js";
import { g as b, i as S, s as j } from "./chunks/quick-links-export.service-bmE4-0fH.js";
import { _ as G } from "./chunks/_plugin-vue_export-helper-CRVO6deU.js";
const H = { class: "sticker-app" }, Q = {
  key: 0,
  class: "sticker-side-nav"
}, U = {
  key: 1,
  class: "sticker-side-tools"
}, q = {
  key: 2,
  class: "sticker-page-section"
}, J = { class: "sticker-page-grid" }, K = {
  key: 0,
  class: "sticker-empty"
}, O = ["title", "onClick"], R = ["src"], X = ["hidden"], Y = /* @__PURE__ */ z({
  __name: "StickerStandalone",
  setup(tt) {
    const T = y(() => import("./chunks/SettingsDialog-mPzbz17W.js")), B = y(() => import("./chunks/AppPromptModal-BMf1x_4w.js")), k = document.body.dataset.mode === "sidepanel", l = p([]), i = p("等待扫描"), u = p(""), _ = p(!1);
    let m = 0;
    function r(s, e = !1) {
      u.value = s, _.value = e, clearTimeout(m), m = window.setTimeout(() => {
        u.value = "";
      }, 2800);
    }
    D(() => {
      f.onToast = r;
    }), F(() => {
      f.onToast = void 0, clearTimeout(m);
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
      o("main", H, [
        k ? (n(), a("nav", Q, [...e[0] || (e[0] = [
          o("a", { href: "sidepanel.html" }, "← 工具首页", -1),
          o("span", null, "表情包", -1)
        ])])) : d("", !0),
        v(L),
        k ? (n(), a("div", U, [
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
          o("div", J, [
            i.value.endsWith("0 张 · 点击保存") ? (n(), a("div", K, "当前页面没有可收集的图片")) : d("", !0),
            (n(!0), a(g, null, M(l.value, (t) => (n(), a("button", {
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
      v(w(T)),
      v(w(B)),
      o("div", {
        id: "sticker-toast",
        class: P(["sticker-toast", { bad: _.value }]),
        hidden: !u.value
      }, h(u.value), 11, X)
    ], 64));
  }
}), Z = /* @__PURE__ */ G(Y, [["__scopeId", "data-v-afcc7f36"]]), C = document.getElementById("vue-sticker-standalone-root");
C && V(Z).mount(C);
