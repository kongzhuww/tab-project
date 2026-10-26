import { d as k, x as m, G as w, o as r, e as n, f as t, t as s, u as o, B as C, m as A, g as c, l as T, z as $, b as _ } from "./vendor-vue-DokqDua_.js";
import { c as e, a as B } from "./aihot-feed-store-CCxG97IT.js";
const V = { class: "aihot-viewer-head" }, N = { class: "aihot-viewer-brand" }, H = { class: "aihot-viewer-badge" }, M = {
  id: "aihot-viewer-header-source",
  class: "aihot-viewer-source"
}, W = { class: "aihot-viewer-actions" }, I = {
  key: 0,
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, L = {
  key: 1,
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, O = { "aria-live": "polite" }, R = ["href"], S = {
  id: "aihot-viewer-body",
  class: "aihot-viewer-body"
}, D = { class: "aihot-detail-title" }, z = { class: "aihot-detail-meta" }, E = { class: "aihot-detail-meta-item" }, F = {
  key: 0,
  class: "aihot-detail-meta-item"
}, G = {
  key: 1,
  class: "aihot-score-tag"
}, P = {
  key: 0,
  class: "aihot-detail-card aihot-detail-summary"
}, Q = { class: "aihot-card-text" }, j = {
  key: 1,
  class: "aihot-detail-card aihot-detail-reason"
}, q = { class: "aihot-card-text" }, J = {
  id: "aihot-detail-article",
  class: "aihot-article-container"
}, K = {
  key: 0,
  class: "aihot-loading-wrap"
}, Z = /* @__PURE__ */ k({
  __name: "AihotViewer",
  setup(U) {
    const d = _(null), u = _(null);
    m(
      () => e.open,
      () => {
        w(() => {
          const a = e.open, i = u.value;
          if (i) {
            if (a) {
              if (!i.open)
                try {
                  i.showModal();
                } catch {
                  i.setAttribute("open", "");
                }
              const l = window;
              l.LogicWeaverWindowTabs?.activate && l.LogicWeaverWindowTabs.activate("aihot-viewer");
            } else if (i.open)
              try {
                i.close();
              } catch {
                i.removeAttribute("open");
              }
          }
        });
      },
      { immediate: !0 }
    ), m(
      () => [e.content, e.open],
      () => {
        w(() => {
          if (!d.value) return;
          d.value.replaceChildren();
          const a = e.content;
          if (a)
            try {
              const l = new DOMParser().parseFromString(a, "text/html");
              for (; l.body.firstChild; )
                d.value.appendChild(l.body.firstChild);
            } catch {
              d.value.textContent = a;
            }
        });
      },
      { immediate: !0 }
    );
    function h() {
      B.close();
    }
    function f(a) {
      a.target === u.value && h();
    }
    async function y() {
      const a = d.value?.innerText || "", i = e.title, l = e.sourceName, b = e.published, p = e.summary, v = e.reason, g = e.url, x = `${i}

来源：${l} (${b})
${p ? `
【AI 导读】
${p}
` : ""}${v ? `
【推荐理由】
${v}
` : ""}
【正文】
${a.trim()}

原文：${g}`;
      try {
        await navigator.clipboard.writeText(x), e.copied = !0, setTimeout(() => {
          e.copied = !1;
        }, 2e3);
      } catch {
        e.copied = !1;
      }
    }
    return (a, i) => (r(), n("dialog", {
      id: "aihot-viewer",
      ref_key: "dialogRef",
      ref: u,
      class: "aihot-viewer",
      onClick: f,
      onClose: h,
      onCancel: h
    }, [
      t("header", V, [
        t("div", N, [
          t("span", H, s(o(e).isAiHot ? "AI HOT" : o(e).platformBadge || "资讯"), 1),
          t("span", M, s(o(e).sourceName), 1)
        ]),
        i[3] || (i[3] = t("span", { class: "grow" }, null, -1)),
        t("div", W, [
          t("button", {
            id: "aihot-viewer-copy",
            class: C(["aihot-viewer-action", { "is-copied": o(e).copied }]),
            type: "button",
            title: "复制文章内容",
            onClick: y
          }, [
            o(e).copied ? (r(), n("svg", I, [...i[0] || (i[0] = [
              t("path", { d: "m5 12 4 4L19 6" }, null, -1)
            ])])) : (r(), n("svg", L, [...i[1] || (i[1] = [
              t("rect", {
                x: "8",
                y: "8",
                width: "12",
                height: "12",
                rx: "2"
              }, null, -1),
              t("path", { d: "M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" }, null, -1)
            ])])),
            t("span", O, s(o(e).copied ? "已复制" : "复制"), 1)
          ], 2),
          t("a", {
            id: "aihot-viewer-open",
            class: "aihot-viewer-action",
            href: o(e).url,
            target: "_blank",
            rel: "noreferrer",
            title: "在浏览器新标签页打开原文"
          }, [...i[2] || (i[2] = [
            t("span", null, "原文", -1),
            t("svg", {
              viewBox: "0 0 24 24",
              "aria-hidden": "true"
            }, [
              t("path", { d: "M14 4h6v6m0-6L10 14M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" })
            ], -1)
          ])], 8, R)
        ]),
        t("button", {
          id: "aihot-viewer-close",
          class: "aihot-viewer-close",
          type: "button",
          title: "关闭 (Esc / Alt+W / Q)",
          onClick: h
        }, " ✕ ")
      ]),
      t("div", S, [
        t("h1", D, s(o(e).title), 1),
        t("div", z, [
          t("span", E, "📰 " + s(o(e).sourceName), 1),
          o(e).published ? (r(), n("span", F, [
            i[4] || (i[4] = A("🕒 ", -1)),
            t("time", null, s(o(e).published), 1)
          ])) : c("", !0),
          o(e).score ? (r(), n("span", G, "★ AI 评分 " + s(o(e).score), 1)) : c("", !0)
        ]),
        o(e).isAiHot && o(e).summary ? (r(), n("div", P, [
          i[5] || (i[5] = t("div", { class: "aihot-card-label" }, "💡 AI 导读", -1)),
          t("p", Q, s(o(e).summary), 1)
        ])) : c("", !0),
        o(e).isAiHot && o(e).reason ? (r(), n("div", j, [
          i[6] || (i[6] = t("div", { class: "aihot-card-label" }, "🎯 推荐理由", -1)),
          t("p", q, s(o(e).reason), 1)
        ])) : c("", !0),
        t("div", J, [
          o(e).loading ? (r(), n("div", K, [...i[7] || (i[7] = [
            t("div", { class: "aihot-spinner" }, null, -1),
            t("span", null, "正在加载文章正文…", -1)
          ])])) : c("", !0),
          T(t("div", {
            ref_key: "articleRef",
            ref: d,
            class: "aihot-article-content"
          }, null, 512), [
            [$, !o(e).loading]
          ])
        ])
      ])
    ], 544));
  }
});
export {
  Z as default
};
