import { d as m, f as a, l as u, A as k, g as s, q as f, h as t, t as d, j as c, u as n, B as h, U as y } from "./vendor-vue-_upDT3S_.js";
import p from "./MessageMarkdown-CRwTqMK-.js";
import { f as l } from "./BackpackDialog-CrPn7XXf.js";
import { _ as v } from "./_plugin-vue_export-helper-DtNgUcga.js";
const w = { class: "bp-drawer-header" }, B = { class: "bp-reader-head-info" }, g = { class: "bp-badge-pill" }, N = {
  key: 0,
  class: "bp-reader-source"
}, C = { class: "bp-drawer-body bp-reader-body" }, A = { class: "bp-reader-title" }, $ = { class: "bp-reader-meta" }, x = { key: 0 }, D = { key: 1 }, q = ["href"], V = {
  key: 0,
  class: "bp-reader-quote"
}, M = { class: "bp-reader-text" }, R = { class: "bp-drawer-footer" }, S = /* @__PURE__ */ m({
  __name: "BackpackArticleReaderDrawer",
  props: {
    visible: { type: Boolean },
    embedded: { type: Boolean },
    article: {}
  },
  emits: ["close", "copy"],
  setup(e, { emit: b }) {
    const i = b;
    return (j, r) => (a(), u(y, { name: "drawer-slide" }, {
      default: k(() => [
        e.visible ? (a(), s("aside", {
          key: 0,
          class: f(["bp-side-drawer bp-reader-drawer", { "bp-integrated": e.embedded }])
        }, [
          t("header", w, [
            t("div", B, [
              t("span", g, d(e.embedded ? "阅读模式" : "📖 阅读器"), 1),
              e.article?.sourceName ? (a(), s("span", N, d(e.article.sourceName), 1)) : c("", !0)
            ]),
            t("button", {
              type: "button",
              class: "bp-btn-icon",
              title: "关闭阅读器",
              onClick: r[0] || (r[0] = (o) => i("close"))
            }, "✕")
          ]),
          t("div", C, [
            t("h2", A, d(e.article?.title), 1),
            t("div", $, [
              e.article?.sourceName ? (a(), s("span", x, d(e.embedded ? e.article.sourceName : `📰 ${e.article.sourceName}`), 1)) : c("", !0),
              e.article?.updatedAt ? (a(), s("span", D, d(e.embedded ? n(l)(e.article.updatedAt) : `🕒 ${n(l)(e.article.updatedAt)}`), 1)) : c("", !0),
              e.article?.url ? (a(), s("a", {
                key: 2,
                href: e.article.url,
                target: "_blank",
                rel: "noreferrer",
                class: "bp-reader-link"
              }, " 原文链接 ↗ ", 8, q)) : c("", !0)
            ]),
            e.article?.description ? (a(), s("blockquote", V, d(e.embedded ? e.article.description : `💡 ${e.article.description}`), 1)) : c("", !0),
            t("div", M, [
              h(p, {
                content: e.article?.content || ""
              }, null, 8, ["content"])
            ])
          ]),
          t("footer", R, [
            t("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              onClick: r[1] || (r[1] = (o) => i("close"))
            }, "关闭"),
            t("button", {
              type: "button",
              class: "bp-btn bp-btn-primary bp-btn-indigo",
              onClick: r[2] || (r[2] = (o) => e.article && i("copy", e.article))
            }, " 一键复制全文 ")
          ])
        ], 2)) : c("", !0)
      ]),
      _: 1
    }));
  }
}), U = /* @__PURE__ */ v(S, [["__scopeId", "data-v-e914db31"]]);
export {
  U as default
};
