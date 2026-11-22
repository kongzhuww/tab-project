import { e as n, s as u } from "./bili-favorites-store-DclRPAm4.js";
import { k as I } from "./github.service-BkChs4sP.js";
import { c as Y } from "./subtitle-follow-CMrW8CCD.js";
import { d as q, w as h, o as z, e as R, f as l, l as V, u as o, g as r, h as s, t as m, j as y, F as H, i as K, q as U, n as W, T as j, b as v, s as A, x as G } from "./vendor-vue-C-_ocEUS.js";
import { _ as J } from "./_plugin-vue_export-helper-CUD1GoS1.js";
const Q = {
  key: 0,
  class: "bili-sub-modal-overlay"
}, Z = { class: "bili-sub-modal-title" }, ee = ["title"], te = {
  key: 0,
  class: "bili-sub-count"
}, ie = { class: "bili-sub-modal-actions" }, oe = { class: "bili-sub-modal-body" }, ne = {
  key: 0,
  class: "bili-sub-loading"
}, se = {
  key: 1,
  class: "bili-sub-error"
}, le = ["title", "onClick"], re = { class: "bili-sub-cue-time" }, ae = { class: "bili-sub-cue-text" }, ue = ["value"], ce = /* @__PURE__ */ q({
  __name: "BiliSubtitleModal",
  setup(de) {
    const p = v(null), b = v(null);
    let k = !1, M = 0, C = 0, x = 0, T = 0;
    const w = v(0);
    let c = null;
    function E() {
      const t = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      t && Number.isFinite(t.currentTime) ? w.value = t.currentTime : Number.isFinite(I.currentTime) && (w.value = I.currentTime);
    }
    const g = A(() => {
      const t = w.value;
      if (!n.cues || !n.cues.length) return -1;
      const e = n.cues.findIndex((i) => t >= i.from && t <= i.to);
      if (e !== -1) return e;
      for (let i = n.cues.length - 1; i >= 0; i--)
        if (t >= n.cues[i].from) return i;
      return 0;
    });
    function L(t) {
      const e = Math.floor(t / 60), i = Math.floor(t % 60);
      return `${e}:${String(i).padStart(2, "0")}`;
    }
    const S = v(null), D = v(null), a = Y(() => D.value, () => S.value);
    function _(t = !0) {
      G(() => a.follow(t));
    }
    h(g, () => {
      n.isOpen && _();
    });
    function X(t) {
      const e = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      e && (e.currentTime = Math.max(0, t), e.paused && e.play()), w.value = t;
    }
    h(() => n.isOpen, (t) => {
      t ? (E(), c = setInterval(E, 300), setTimeout(() => {
        _(!1);
      }, 120)) : (a.reset(), c && (clearInterval(c), c = null));
    }), h(() => n.loading, (t) => {
      !t && n.cues.length && setTimeout(() => {
        _(!1);
      }, 120);
    });
    function $(t) {
      if (t.target.closest("button, a, input")) return;
      k = !0;
      const e = p.value;
      if (!e) return;
      const i = e.getBoundingClientRect();
      x = i.left, T = i.top, M = t.clientX, C = t.clientY, b.value = { x, y: T };
      const d = (F) => {
        if (!k) return;
        const O = F.clientX - M, N = F.clientY - C;
        b.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, x + O)),
          y: Math.max(10, Math.min(window.innerHeight - 80, T + N))
        };
      }, f = () => {
        k = !1, window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", f);
      };
      window.addEventListener("mousemove", d), window.addEventListener("mouseup", f);
    }
    function P(t) {
      t.key === "Escape" && n.isOpen && u.close();
    }
    function B(t) {
      if (!(!n.isOpen || !p.value) && !p.value.contains(t.target)) {
        if (t.target?.closest(".bili-mini-sub-btn, .fo-card-menu, #bili-subtitle-modal-root")) return;
        u.close();
      }
    }
    return z(() => {
      window.addEventListener("keydown", P), window.addEventListener("pointerdown", B, !0);
    }), R(() => {
      a.reset(), c && clearInterval(c), window.removeEventListener("keydown", P), window.removeEventListener("pointerdown", B, !0);
    }), (t, e) => (l(), V(j, { to: "body" }, [
      o(n).isOpen ? (l(), r("div", Q, [
        s("div", {
          ref_key: "windowRef",
          ref: p,
          class: "bili-sub-modal-window",
          style: W(b.value ? { position: "fixed", left: `${b.value.x}px`, top: `${b.value.y}px`, margin: "0" } : {}),
          role: "dialog",
          "aria-modal": "false"
        }, [
          s("header", {
            class: "bili-sub-modal-header",
            onMousedown: $
          }, [
            s("div", Z, [
              s("span", {
                class: "bili-sub-title-text",
                title: o(n).title
              }, m(o(n).title) + " · 完整字幕 TXT", 9, ee),
              o(n).charCount ? (l(), r("span", te, "(" + m(o(n).charCount) + " 字)", 1)) : y("", !0)
            ]),
            s("div", ie, [
              o(n).fullText ? (l(), r("button", {
                key: 0,
                type: "button",
                class: "bili-sub-action-btn",
                title: "复制全部字幕纯文本",
                onClick: e[0] || (e[0] = //@ts-ignore
                (...i) => o(u).copy && o(u).copy(...i))
              }, m(o(n).copied ? "✓ 已复制" : "📋 复制全部"), 1)) : y("", !0),
              o(n).fullText ? (l(), r("button", {
                key: 1,
                type: "button",
                class: "bili-sub-action-btn",
                title: "下载为 .txt 纯文本文件",
                onClick: e[1] || (e[1] = //@ts-ignore
                (...i) => o(u).downloadTxt && o(u).downloadTxt(...i))
              }, " 💾 下载 TXT ")) : y("", !0),
              s("button", {
                type: "button",
                class: "bili-sub-close-btn",
                title: "关闭字幕视窗 (Esc)",
                onClick: e[2] || (e[2] = //@ts-ignore
                (...i) => o(u).close && o(u).close(...i))
              }, " ✕ ")
            ])
          ], 32),
          s("div", oe, [
            o(n).loading ? (l(), r("div", ne, [...e[6] || (e[6] = [
              s("div", { class: "bili-sub-spinner" }, null, -1),
              s("span", null, "正在提取并解析完整字幕流…", -1)
            ])])) : o(n).error ? (l(), r("div", se, [
              e[7] || (e[7] = s("span", { style: { "font-size": "24px" } }, "⚠️", -1)),
              s("p", null, m(o(n).error), 1)
            ])) : o(n).cues.length ? (l(), r("div", {
              key: 2,
              ref_key: "cuesList",
              ref: D,
              class: "bili-sub-cues-list",
              tabindex: "0",
              onWheelPassive: e[3] || (e[3] = //@ts-ignore
              (...i) => o(a).interact && o(a).interact(...i)),
              onPointerdown: e[4] || (e[4] = //@ts-ignore
              (...i) => o(a).pointerDown && o(a).pointerDown(...i)),
              onKeydown: e[5] || (e[5] = //@ts-ignore
              (...i) => o(a).keyDown && o(a).keyDown(...i))
            }, [
              (l(!0), r(H, null, K(o(n).cues, (i, d) => (l(), r("div", {
                key: d,
                ref_for: !0,
                ref: (f) => {
                  d === g.value && (S.value = f);
                },
                class: U(["bili-sub-cue-row", { "is-active": d === g.value }]),
                title: `点击跳转到 ${L(i.from)} 播放`,
                onClick: (f) => X(i.from)
              }, [
                s("span", re, m(L(i.from)), 1),
                s("span", ae, m(i.content), 1)
              ], 10, le))), 128))
            ], 544)) : (l(), r("textarea", {
              key: 3,
              readonly: "",
              class: "bili-sub-textarea",
              value: o(n).fullText,
              placeholder: "暂无字幕内容"
            }, null, 8, ue))
          ])
        ], 4)
      ])) : y("", !0)
    ]));
  }
}), we = /* @__PURE__ */ J(ce, [["__scopeId", "data-v-25e95f19"]]);
export {
  we as default
};
