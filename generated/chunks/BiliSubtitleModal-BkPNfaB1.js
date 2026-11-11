import { f as i, s as r } from "./bili-favorites-store-CU2tRHU_.js";
import { y as I } from "./view-styles-Dt1HAuh9.js";
import { d as F, w as P, B as N, x as O, o as l, j as V, u as n, e as a, i as s, t as c, f as p, F as Y, g as R, A as q, z as A, T as H, b as w, s as U, D as j } from "./vendor-vue-9b0eS4bW.js";
import { _ as G } from "./_plugin-vue_export-helper-BxikU0LD.js";
const K = {
  key: 0,
  class: "bili-sub-modal-overlay"
}, W = { class: "bili-sub-modal-title" }, J = ["title"], Q = {
  key: 0,
  class: "bili-sub-count"
}, Z = { class: "bili-sub-modal-actions" }, ee = { class: "bili-sub-modal-body" }, te = {
  key: 0,
  class: "bili-sub-loading"
}, ie = {
  key: 1,
  class: "bili-sub-error"
}, oe = {
  key: 2,
  class: "bili-sub-cues-list"
}, ne = ["title", "onClick"], se = { class: "bili-sub-cue-time" }, le = { class: "bili-sub-cue-text" }, ae = ["value"], re = /* @__PURE__ */ F({
  __name: "BiliSubtitleModal",
  setup(ue) {
    const b = w(null), d = w(null);
    let y = !1, k = 0, T = 0, _ = 0, h = 0;
    const f = w(0);
    let v = null;
    function g() {
      const e = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      e && Number.isFinite(e.currentTime) ? f.value = e.currentTime : Number.isFinite(I.currentTime) && (f.value = I.currentTime);
    }
    const M = U(() => {
      const e = f.value;
      if (!i.cues || !i.cues.length) return -1;
      const t = i.cues.findIndex((o) => e >= o.from && e <= o.to);
      if (t !== -1) return t;
      for (let o = i.cues.length - 1; o >= 0; o--)
        if (e >= i.cues[o].from) return o;
      return 0;
    });
    function C(e) {
      const t = Math.floor(e / 60), o = Math.floor(e % 60);
      return `${t}:${String(o).padStart(2, "0")}`;
    }
    const x = w(null);
    function E(e = !0) {
      j(() => {
        x.value && x.value.scrollIntoView({
          behavior: e ? "smooth" : "auto",
          block: "center"
        });
      });
    }
    function X(e) {
      const t = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      t && (t.currentTime = Math.max(0, e), t.paused && t.play()), f.value = e;
    }
    P(() => i.isOpen, (e) => {
      e ? (g(), v = setInterval(g, 300), setTimeout(() => {
        E(!1);
      }, 120)) : v && (clearInterval(v), v = null);
    }), P(() => i.loading, (e) => {
      !e && i.cues.length && setTimeout(() => {
        E(!1);
      }, 120);
    });
    function $(e) {
      if (e.target.closest("button, a, input")) return;
      y = !0;
      const t = b.value;
      if (!t) return;
      const o = t.getBoundingClientRect();
      _ = o.left, h = o.top, k = e.clientX, T = e.clientY, d.value = { x: _, y: h };
      const u = (B) => {
        if (!y) return;
        const D = B.clientX - k, z = B.clientY - T;
        d.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, _ + D)),
          y: Math.max(10, Math.min(window.innerHeight - 80, h + z))
        };
      }, m = () => {
        y = !1, window.removeEventListener("mousemove", u), window.removeEventListener("mouseup", m);
      };
      window.addEventListener("mousemove", u), window.addEventListener("mouseup", m);
    }
    function S(e) {
      e.key === "Escape" && i.isOpen && r.close();
    }
    function L(e) {
      if (!(!i.isOpen || !b.value) && !b.value.contains(e.target)) {
        if (e.target?.closest(".bili-mini-sub-btn, .fo-card-menu, #bili-subtitle-modal-root")) return;
        r.close();
      }
    }
    return N(() => {
      window.addEventListener("keydown", S), window.addEventListener("pointerdown", L, !0);
    }), O(() => {
      window.removeEventListener("keydown", S), window.removeEventListener("pointerdown", L, !0);
    }), (e, t) => (l(), V(H, { to: "body" }, [
      n(i).isOpen ? (l(), a("div", K, [
        s("div", {
          ref_key: "windowRef",
          ref: b,
          class: "bili-sub-modal-window",
          style: A(d.value ? { position: "fixed", left: `${d.value.x}px`, top: `${d.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false"
        }, [
          s("header", {
            class: "bili-sub-modal-header",
            onMousedown: $
          }, [
            s("div", W, [
              s("span", {
                class: "bili-sub-title-text",
                title: n(i).title
              }, c(n(i).title) + " · 完整字幕 TXT", 9, J),
              n(i).charCount ? (l(), a("span", Q, "(" + c(n(i).charCount) + " 字)", 1)) : p("", !0)
            ]),
            s("div", Z, [
              n(i).fullText ? (l(), a("button", {
                key: 0,
                type: "button",
                class: "bili-sub-action-btn",
                title: "复制全部字幕纯文本",
                onClick: t[0] || (t[0] = //@ts-ignore
                (...o) => n(r).copy && n(r).copy(...o))
              }, c(n(i).copied ? "✓ 已复制" : "📋 复制全部"), 1)) : p("", !0),
              n(i).fullText ? (l(), a("button", {
                key: 1,
                type: "button",
                class: "bili-sub-action-btn",
                title: "下载为 .txt 纯文本文件",
                onClick: t[1] || (t[1] = //@ts-ignore
                (...o) => n(r).downloadTxt && n(r).downloadTxt(...o))
              }, " 💾 下载 TXT ")) : p("", !0),
              s("button", {
                type: "button",
                class: "bili-sub-close-btn",
                title: "关闭字幕视窗 (Esc)",
                onClick: t[2] || (t[2] = //@ts-ignore
                (...o) => n(r).close && n(r).close(...o))
              }, " ✕ ")
            ])
          ], 32),
          s("div", ee, [
            n(i).loading ? (l(), a("div", te, [...t[3] || (t[3] = [
              s("div", { class: "bili-sub-spinner" }, null, -1),
              s("span", null, "正在提取并解析完整字幕流…", -1)
            ])])) : n(i).error ? (l(), a("div", ie, [
              t[4] || (t[4] = s("span", { style: { "font-size": "24px" } }, "⚠️", -1)),
              s("p", null, c(n(i).error), 1)
            ])) : n(i).cues.length ? (l(), a("div", oe, [
              (l(!0), a(Y, null, R(n(i).cues, (o, u) => (l(), a("div", {
                key: u,
                ref_for: !0,
                ref: (m) => {
                  u === M.value && (x.value = m);
                },
                class: q(["bili-sub-cue-row", { "is-active": u === M.value }]),
                title: `点击跳转到 ${C(o.from)} 播放`,
                onClick: (m) => X(o.from)
              }, [
                s("span", se, c(C(o.from)), 1),
                s("span", le, c(o.content), 1)
              ], 10, ne))), 128))
            ])) : (l(), a("textarea", {
              key: 3,
              readonly: "",
              class: "bili-sub-textarea",
              value: n(i).fullText,
              placeholder: "暂无字幕内容"
            }, null, 8, ae))
          ])
        ], 4)
      ])) : p("", !0)
    ]));
  }
}), fe = /* @__PURE__ */ G(re, [["__scopeId", "data-v-61ad518e"]]);
export {
  fe as default
};
