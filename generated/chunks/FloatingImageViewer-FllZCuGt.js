import { a as o, i as s } from "./image-viewer-store-cmaf9u7Q.js";
import { d as G, x as J, C as Q, y as tt, o as w, c as nt, u as a, e as b, f as i, t as v, g as O, B as et, A as B, j as ot, b as c, s as at } from "./vendor-vue-DokqDua_.js";
import { _ as it } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const st = {
  key: 0,
  class: "floating-img-overlay"
}, lt = { class: "floating-img-title" }, rt = ["title"], ct = {
  key: 0,
  class: "floating-img-dimen"
}, ut = { class: "floating-img-actions" }, dt = { class: "floating-zoom-tag" }, gt = { class: "floating-img-canvas" }, ft = ["src", "alt"], mt = /* @__PURE__ */ G({
  __name: "FloatingImageViewer",
  setup(pt) {
    const Z = c(null), r = c({ x: 100, y: 100 }), y = c({ width: 400, height: 260 });
    let f = !1, x = 0, P = 0, _ = 0, M = 0;
    const m = c(0), p = c(0), l = c(!1);
    let k = 0, C = 0, H = 0, I = 0;
    function W(t, n) {
      if (!t || !n) return;
      const e = typeof window < "u" ? window.innerWidth : 1920, u = typeof window < "u" ? window.innerHeight : 1080, Y = 40, V = 340, E = Math.max(V, e - 80), q = Math.max(160, u - 80);
      let d = t, g = n;
      const S = q - Y;
      if (d > E || g > S) {
        const A = Math.min(E / d, S / g);
        d = Math.round(d * A), g = Math.round(g * A);
      }
      const T = Math.max(V, d), $ = g + Y;
      y.value = {
        width: T,
        height: $
      }, r.value = {
        x: Math.max(16, Math.round((e - T) / 2)),
        y: Math.max(24, Math.round((u - $) / 2))
      }, h();
    }
    J(
      () => o.isOpen,
      (t) => {
        t && (h(), o.naturalWidth && o.naturalHeight && W(o.naturalWidth, o.naturalHeight));
      }
    );
    function L(t) {
      if (t.target.closest("button, a, input")) return;
      const n = t.currentTarget;
      try {
        n.setPointerCapture(t.pointerId);
      } catch {
      }
      f = !0, x = t.clientX, P = t.clientY, _ = r.value.x, M = r.value.y;
    }
    function N(t) {
      if (!f) return;
      const n = t.clientX - x, e = t.clientY - P;
      r.value = {
        x: Math.max(10, Math.min(window.innerWidth - 80, _ + n)),
        y: Math.max(10, Math.min(window.innerHeight - 60, M + e))
      };
    }
    function z(t) {
      if (f) {
        f = !1;
        try {
          t.currentTarget.releasePointerCapture(t.pointerId);
        } catch {
        }
      }
    }
    function R(t) {
      if (t.target.closest("button, a") || t.button !== 0) return;
      const n = t.currentTarget;
      try {
        n.setPointerCapture(t.pointerId);
      } catch {
      }
      l.value = !0, k = t.clientX, C = t.clientY, H = m.value, I = p.value;
    }
    function U(t) {
      if (!l.value) return;
      const n = t.clientX - k, e = t.clientY - C;
      m.value = H + n, p.value = I + e;
    }
    function X(t) {
      if (l.value) {
        l.value = !1;
        try {
          t.currentTarget.releasePointerCapture(t.pointerId);
        } catch {
        }
      }
    }
    function h() {
      s.resetZoom(), m.value = 0, p.value = 0, l.value = !1;
    }
    const F = at(() => ({
      transform: `translate3d(${m.value}px, ${p.value}px, 0px) scale(${o.zoom})`,
      transition: l.value ? "none" : "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
    }));
    function j(t) {
      const n = t.target;
      if (!o.isOpen || n.getAttribute("src") !== o.src) return;
      const e = n.naturalWidth || 400, u = n.naturalHeight || 300;
      s.setDimensions(e, u), W(e, u);
    }
    function K(t) {
      t.preventDefault();
      const n = t.deltaY < 0 ? 0.15 : -0.15;
      s.setZoom(o.zoom + n);
    }
    function D(t) {
      t.key === "Escape" && o.isOpen && s.close();
    }
    return Q(() => {
      window.addEventListener("keydown", D);
    }), tt(() => {
      window.removeEventListener("keydown", D), s.close();
    }), (t, n) => (w(), nt(ot, { to: "body" }, [
      a(o).isOpen ? (w(), b("div", st, [
        i("div", {
          ref_key: "windowRef",
          ref: Z,
          class: "floating-img-window",
          style: B({
            position: "fixed",
            left: `${r.value.x}px`,
            top: `${r.value.y}px`,
            width: `${y.value.width}px`,
            height: `${y.value.height}px`,
            margin: "0"
          }),
          role: "dialog",
          "aria-modal": "false"
        }, [
          i("header", {
            class: "floating-img-header",
            onPointerdown: L,
            onPointermove: N,
            onPointerup: z,
            onPointercancel: z
          }, [
            i("div", lt, [
              n[5] || (n[5] = i("span", { class: "floating-img-icon" }, "🖼️", -1)),
              i("span", {
                class: "floating-img-name",
                title: a(o).alt
              }, v(a(o).alt), 9, rt),
              a(o).naturalWidth ? (w(), b("span", ct, v(a(o).naturalWidth) + " × " + v(a(o).naturalHeight), 1)) : O("", !0)
            ]),
            i("div", ut, [
              i("button", {
                type: "button",
                class: "floating-tool-btn",
                title: "放大 (+)",
                onClick: n[0] || (n[0] = //@ts-ignore
                (...e) => a(s).zoomIn && a(s).zoomIn(...e))
              }, "+"),
              i("span", dt, v(Math.round(a(o).zoom * 100)) + "%", 1),
              i("button", {
                type: "button",
                class: "floating-tool-btn",
                title: "缩小 (-)",
                onClick: n[1] || (n[1] = //@ts-ignore
                (...e) => a(s).zoomOut && a(s).zoomOut(...e))
              }, "-"),
              i("button", {
                type: "button",
                class: "floating-tool-btn reset",
                title: "还原 1:1",
                onClick: n[2] || (n[2] = //@ts-ignore
                (...e) => a(s).resetZoom && a(s).resetZoom(...e))
              }, "1:1"),
              i("button", {
                type: "button",
                class: "floating-tool-btn reset",
                title: "居中复位 (双击画面)",
                onClick: h
              }, "🔄"),
              n[6] || (n[6] = i("div", { class: "floating-divider" }, null, -1)),
              i("button", {
                type: "button",
                class: "floating-action-btn",
                title: "复制图片到剪贴板",
                onClick: n[3] || (n[3] = //@ts-ignore
                (...e) => a(s).copyImage && a(s).copyImage(...e))
              }, " 📋 "),
              i("button", {
                type: "button",
                class: "floating-close-btn",
                title: "关闭 (Esc)",
                onClick: n[4] || (n[4] = //@ts-ignore
                (...e) => a(s).close && a(s).close(...e))
              }, " ✕ ")
            ])
          ], 32),
          i("div", {
            class: et(["floating-img-viewport", { "is-grabbing": l.value }]),
            onWheel: K,
            onDblclick: h,
            onPointerdown: R,
            onPointermove: U,
            onPointerup: X,
            onPointercancel: X
          }, [
            i("div", gt, [
              (w(), b("img", {
                key: a(o).src,
                src: a(o).src,
                alt: a(o).alt,
                class: "floating-render-img",
                style: B(F.value),
                onLoad: j
              }, null, 44, ft))
            ])
          ], 34)
        ], 4)
      ])) : O("", !0)
    ]));
  }
}), yt = /* @__PURE__ */ it(mt, [["__scopeId", "data-v-823b4e30"]]);
export {
  yt as default
};
