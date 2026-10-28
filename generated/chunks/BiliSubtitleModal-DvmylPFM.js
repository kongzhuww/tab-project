import { f as o, s as l } from "./bili-favorites-store-wlXeUPTQ.js";
import { d as T, C as L, y as B, o as a, c as X, u as t, e as r, f as n, t as c, g as b, A as S, j as D, b as M } from "./vendor-vue-DokqDua_.js";
import { _ as Y } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const O = {
  key: 0,
  class: "bili-sub-modal-overlay"
}, P = { class: "bili-sub-modal-title" }, R = ["title"], z = {
  key: 0,
  class: "bili-sub-count"
}, H = { class: "bili-sub-modal-actions" }, N = { class: "bili-sub-modal-body" }, U = {
  key: 0,
  class: "bili-sub-loading"
}, V = {
  key: 1,
  class: "bili-sub-error"
}, $ = ["value"], j = /* @__PURE__ */ T({
  __name: "BiliSubtitleModal",
  setup(A) {
    const u = M(null), d = M(null);
    let p = !1, f = 0, v = 0, m = 0, w = 0;
    function h(s) {
      if (s.target.closest("button, a, input")) return;
      p = !0;
      const e = u.value;
      if (!e) return;
      const i = e.getBoundingClientRect();
      m = i.left, w = i.top, f = s.clientX, v = s.clientY, d.value = { x: m, y: w };
      const _ = (k) => {
        if (!p) return;
        const E = k.clientX - f, C = k.clientY - v;
        d.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, m + E)),
          y: Math.max(10, Math.min(window.innerHeight - 80, w + C))
        };
      }, g = () => {
        p = !1, window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", g);
      };
      window.addEventListener("mousemove", _), window.addEventListener("mouseup", g);
    }
    function y(s) {
      s.key === "Escape" && o.isOpen && l.close();
    }
    function x(s) {
      if (!(!o.isOpen || !u.value) && !u.value.contains(s.target)) {
        if (s.target?.closest(".bili-mini-sub-btn, .fo-card-menu, #bili-subtitle-modal-root")) return;
        l.close();
      }
    }
    return L(() => {
      window.addEventListener("keydown", y), window.addEventListener("pointerdown", x, !0);
    }), B(() => {
      window.removeEventListener("keydown", y), window.removeEventListener("pointerdown", x, !0);
    }), (s, e) => (a(), X(D, { to: "body" }, [
      t(o).isOpen ? (a(), r("div", O, [
        n("div", {
          ref_key: "windowRef",
          ref: u,
          class: "bili-sub-modal-window",
          style: S(d.value ? { position: "fixed", left: `${d.value.x}px`, top: `${d.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false"
        }, [
          n("header", {
            class: "bili-sub-modal-header",
            onMousedown: h
          }, [
            n("div", P, [
              n("span", {
                class: "bili-sub-title-text",
                title: t(o).title
              }, c(t(o).title) + " · 完整字幕 TXT", 9, R),
              t(o).charCount ? (a(), r("span", z, "(" + c(t(o).charCount) + " 字)", 1)) : b("", !0)
            ]),
            n("div", H, [
              t(o).fullText ? (a(), r("button", {
                key: 0,
                type: "button",
                class: "bili-sub-action-btn",
                title: "复制全部字幕纯文本",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...i) => t(l).copy && t(l).copy(...i))
              }, c(t(o).copied ? "✓ 已复制" : "📋 复制全部"), 1)) : b("", !0),
              t(o).fullText ? (a(), r("button", {
                key: 1,
                type: "button",
                class: "bili-sub-action-btn",
                title: "下载为 .txt 纯文本文件",
                onClick: e[1] || (e[1] = //@ts-ignore
                (...i) => t(l).downloadTxt && t(l).downloadTxt(...i))
              }, " 💾 下载 TXT ")) : b("", !0),
              n("button", {
                type: "button",
                class: "bili-sub-close-btn",
                title: "关闭字幕视窗 (Esc)",
                onClick: e[2] || (e[2] = //@ts-ignore
                (...i) => t(l).close && t(l).close(...i))
              }, " ✕ ")
            ])
          ], 32),
          n("div", N, [
            t(o).loading ? (a(), r("div", U, [...e[3] || (e[3] = [
              n("div", { class: "bili-sub-spinner" }, null, -1),
              n("span", null, "正在提取并解析完整字幕流…", -1)
            ])])) : t(o).error ? (a(), r("div", V, [
              e[4] || (e[4] = n("span", { style: { "font-size": "24px" } }, "⚠️", -1)),
              n("p", null, c(t(o).error), 1)
            ])) : (a(), r("textarea", {
              key: 2,
              readonly: "",
              class: "bili-sub-textarea",
              value: t(o).fullText,
              placeholder: "暂无字幕内容"
            }, null, 8, $))
          ])
        ], 4)
      ])) : b("", !0)
    ]));
  }
}), W = /* @__PURE__ */ Y(j, [["__scopeId", "data-v-17642618"]]);
export {
  W as default
};
