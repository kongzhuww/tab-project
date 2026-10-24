import { f as k, w as m, n as w, g as l, h as c, i as t, t as s, x as a, j as x, u as d, q as A, D as T, b as _ } from "./vendor-vue-BUkfvXUI.js";
import { b as e, c as $ } from "./aihot-feed-store-DsgeWww_.js";
const N = { class: "aihot-viewer-head" }, V = { class: "aihot-viewer-brand" }, W = { class: "aihot-viewer-badge" }, B = {
  id: "aihot-viewer-header-source",
  class: "aihot-viewer-source"
}, D = { class: "aihot-viewer-actions" }, H = ["href"], I = {
  id: "aihot-viewer-body",
  class: "aihot-viewer-body"
}, O = { class: "aihot-detail-title" }, R = { class: "aihot-detail-meta" }, S = { class: "aihot-detail-meta-item" }, E = {
  key: 0,
  class: "aihot-detail-meta-item"
}, L = {
  key: 1,
  class: "aihot-score-tag"
}, M = {
  key: 0,
  class: "aihot-detail-card aihot-detail-summary"
}, j = { class: "aihot-card-text" }, q = {
  key: 1,
  class: "aihot-detail-card aihot-detail-reason"
}, F = { class: "aihot-card-text" }, P = {
  id: "aihot-detail-article",
  class: "aihot-article-container"
}, Q = {
  key: 0,
  class: "aihot-loading-wrap"
}, K = /* @__PURE__ */ k({
  __name: "AihotViewer",
  setup(z) {
    const n = _(null), u = _(null);
    m(
      () => e.open,
      () => {
        w(() => {
          const o = e.open, i = u.value;
          if (i) {
            if (o) {
              if (!i.open)
                try {
                  i.showModal();
                } catch {
                  i.setAttribute("open", "");
                }
              const r = window;
              r.LogicWeaverWindowTabs?.activate && r.LogicWeaverWindowTabs.activate("aihot-viewer");
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
          if (!n.value) return;
          n.value.replaceChildren();
          const o = e.content;
          if (o)
            try {
              const r = new DOMParser().parseFromString(o, "text/html");
              for (; r.body.firstChild; )
                n.value.appendChild(r.body.firstChild);
            } catch {
              n.value.textContent = o;
            }
        });
      },
      { immediate: !0 }
    );
    function h() {
      $.close();
    }
    function f(o) {
      o.target === u.value && h();
    }
    async function y() {
      const o = n.value?.innerText || "", i = e.title, r = e.sourceName, b = e.published, p = e.summary, v = e.reason, g = e.url, C = `${i}

来源：${r} (${b})
${p ? `
【AI 导读】
${p}
` : ""}${v ? `
【推荐理由】
${v}
` : ""}
【正文】
${o.trim()}

原文：${g}`;
      try {
        await navigator.clipboard.writeText(C), e.copied = !0, setTimeout(() => {
          e.copied = !1;
        }, 2e3);
      } catch {
        e.copied = !1;
      }
    }
    return (o, i) => (l(), c("dialog", {
      id: "aihot-viewer",
      ref_key: "dialogRef",
      ref: u,
      class: "aihot-viewer",
      onClick: f,
      onClose: h,
      onCancel: h
    }, [
      t("header", N, [
        t("div", V, [
          t("span", W, s(a(e).isAiHot ? "AI HOT" : a(e).platformBadge || "资讯"), 1),
          t("span", B, s(a(e).sourceName), 1)
        ]),
        i[0] || (i[0] = t("span", { class: "grow" }, null, -1)),
        t("div", D, [
          t("button", {
            id: "aihot-viewer-copy",
            class: "ai-chat-new",
            type: "button",
            title: "复制文章内容",
            onClick: y
          }, s(a(e).copied ? "✓ 已复制" : "📋 复制"), 1),
          t("a", {
            id: "aihot-viewer-open",
            class: "ai-chat-new",
            href: a(e).url,
            target: "_blank",
            rel: "noreferrer",
            title: "在浏览器新标签页打开原文"
          }, " 原文 ↗ ", 8, H)
        ]),
        t("button", {
          id: "aihot-viewer-close",
          class: "aihot-viewer-close",
          type: "button",
          title: "关闭 (Esc / Alt+W / Q)",
          onClick: h
        }, " ✕ ")
      ]),
      t("div", I, [
        t("h1", O, s(a(e).title), 1),
        t("div", R, [
          t("span", S, "📰 " + s(a(e).sourceName), 1),
          a(e).published ? (l(), c("span", E, [
            i[1] || (i[1] = x("🕒 ", -1)),
            t("time", null, s(a(e).published), 1)
          ])) : d("", !0),
          a(e).score ? (l(), c("span", L, "★ AI 评分 " + s(a(e).score), 1)) : d("", !0)
        ]),
        a(e).isAiHot && a(e).summary ? (l(), c("div", M, [
          i[2] || (i[2] = t("div", { class: "aihot-card-label" }, "💡 AI 导读", -1)),
          t("p", j, s(a(e).summary), 1)
        ])) : d("", !0),
        a(e).isAiHot && a(e).reason ? (l(), c("div", q, [
          i[3] || (i[3] = t("div", { class: "aihot-card-label" }, "🎯 推荐理由", -1)),
          t("p", F, s(a(e).reason), 1)
        ])) : d("", !0),
        t("div", P, [
          a(e).loading ? (l(), c("div", Q, [...i[4] || (i[4] = [
            t("div", { class: "aihot-spinner" }, null, -1),
            t("span", null, "正在加载文章正文…", -1)
          ])])) : d("", !0),
          A(t("div", {
            ref_key: "articleRef",
            ref: n,
            class: "aihot-article-content"
          }, null, 512), [
            [T, !a(e).loading]
          ])
        ])
      ])
    ], 544));
  }
});
export {
  K as default
};
