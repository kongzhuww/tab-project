import { d as $, o, f as r, g as l, I as S, B as c, u as n, C as v, F as u, n as b, t as h, i as z, j as m, h as P, x as B } from "./vendor-vue-wIH4jcna.js";
import { n as E, k as d, l as M } from "./main-BifbFpKJ.js";
const I = ["hidden"], N = {
  id: "nav-wheel-beam-svg",
  class: "nav-wheel-beam-svg",
  viewBox: "0 0 320 320",
  "aria-hidden": "true"
}, G = ["d"], V = ["x1", "y1", "x2", "y2"], j = ["x1", "y1", "x2", "y2"], D = ["d"], L = {
  id: "nav-wheel-hub-icon",
  class: "nav-wheel-hub-icon"
}, F = ["src"], H = {
  id: "nav-wheel-hub-title",
  class: "nav-wheel-hub-title"
}, O = {
  id: "nav-wheel-hub-desc",
  class: "nav-wheel-hub-desc"
}, R = {
  id: "nav-wheel-sectors",
  class: "nav-wheel-sectors"
}, X = ["data-id", "title", "aria-label", "onMouseenter", "onMouseleave", "onClick", "onContextmenu"], Y = ["title", "aria-label", "onClick"], T = { class: "nav-wheel-sector-icon" }, U = ["src", "onError"], K = /* @__PURE__ */ $({
  __name: "NavWheelOverlay",
  setup(q) {
    const a = E, f = B(() => !a.ballPosition.x && !a.ballPosition.y ? {} : {
      left: `${a.ballPosition.x}px`,
      top: `${a.ballPosition.y}px`
    });
    function p(t) {
      return t ? t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".ico") || t.endsWith(".webp") || t.endsWith(".jpg") || t.endsWith(".jpeg") || t.startsWith("assets/") || t.startsWith("http://") || t.startsWith("https://") || t.startsWith("data:") || t.startsWith("blob:") || t.startsWith("chrome://") || t.startsWith("chrome-extension://") || t.includes("/_favicon/") : !1;
    }
    function w(t, i) {
      const e = t.target;
      if (e) {
        if (i.desc && i.desc.startsWith("http"))
          try {
            const s = new URL(i.desc).origin;
            if (!e.src.includes(s)) {
              e.src = `${s}/favicon.ico`;
              return;
            }
          } catch {
          }
        e.style.display = "none";
      }
    }
    function x(t) {
      t.stopPropagation(), d.dispatch("hub:click");
    }
    function y(t) {
      !a.isExpanded || t.target?.closest("#nav-wheel-hub, #nav-wheel-context-menu, .nav-wheel-sector") || d.dispatch("container:click");
    }
    function g(t) {
      d.dispatch("sector:hover", t);
    }
    function _(t) {
      d.dispatch("sector:leave", t);
    }
    function k(t, i) {
      i.stopPropagation(), d.dispatch("sector:click", t);
    }
    function W(t) {
      M.removeShortcut(t.id);
    }
    function C(t, i) {
      i.preventDefault(), i.stopPropagation(), d.dispatch("sector:contextmenu", { sector: t, clientX: i.clientX, clientY: i.clientY });
    }
    return (t, i) => (o(), r("div", {
      id: "nav-wheel-overlay",
      class: "nav-wheel-overlay",
      hidden: !n(a).isOpen,
      "aria-label": "页面导航悬浮球与轮盘"
    }, [
      i[2] || (i[2] = l("div", {
        id: "nav-wheel-center-dot",
        class: "nav-wheel-center-dot"
      }, null, -1)),
      l("div", {
        id: "nav-wheel-container",
        class: v(["nav-wheel-container", { expanded: n(a).isExpanded }]),
        style: c(f.value),
        onClick: y
      }, [
        (o(), r("svg", N, [
          i[1] || (i[1] = S('<defs><radialGradient id="navWheelBeamGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255, 255, 255, 0.28)"></stop><stop offset="50%" stop-color="rgba(255, 255, 255, 0.16)"></stop><stop offset="85%" stop-color="rgba(255, 255, 255, 0.06)"></stop><stop offset="100%" stop-color="rgba(255, 255, 255, 0.01)"></stop></radialGradient></defs>', 1)),
          l("g", {
            id: "nav-wheel-beam-group",
            class: "nav-wheel-beam-group",
            style: c({ opacity: n(a).beam.visible ? "1" : "0" })
          }, [
            l("path", {
              id: "nav-wheel-beam-wedge",
              class: "nav-wheel-beam-wedge",
              fill: "url(#navWheelBeamGrad)",
              d: n(a).beam.wedgePath
            }, null, 8, G),
            l("line", {
              id: "nav-wheel-beam-line1",
              class: "nav-wheel-beam-line",
              x1: n(a).beam.line1.x1,
              y1: n(a).beam.line1.y1,
              x2: n(a).beam.line1.x2,
              y2: n(a).beam.line1.y2
            }, null, 8, V),
            l("line", {
              id: "nav-wheel-beam-line2",
              class: "nav-wheel-beam-line",
              x1: n(a).beam.line2.x1,
              y1: n(a).beam.line2.y1,
              x2: n(a).beam.line2.x2,
              y2: n(a).beam.line2.y2
            }, null, 8, j),
            l("path", {
              id: "nav-wheel-beam-arc",
              class: "nav-wheel-beam-arc",
              d: n(a).beam.arcPath
            }, null, 8, D)
          ], 4)
        ])),
        l("div", {
          id: "nav-wheel-hub",
          class: v(["nav-wheel-hub", { active: n(a).hub.active }]),
          role: "button",
          tabindex: "0",
          title: "导航悬浮球 (点击展开/收起轮盘，快捷键可移至当前鼠标)",
          onClick: x
        }, [
          l("div", L, [
            p(n(a).hub.icon) ? (o(), r("img", {
              key: 0,
              src: n(a).hub.icon,
              alt: "",
              referrerpolicy: "no-referrer"
            }, null, 8, F)) : (o(), r(u, { key: 1 }, [
              b(h(n(a).hub.icon), 1)
            ], 64))
          ]),
          l("div", H, h(n(a).hub.title), 1),
          l("div", O, h(n(a).hub.desc), 1)
        ], 2),
        l("div", R, [
          (o(!0), r(u, null, z(n(a).sectors, (e) => (o(), r("button", {
            key: e.id,
            type: "button",
            class: v(["nav-wheel-sector", { active: e.id === n(a).activeSectorId }]),
            "data-id": e.id,
            style: c({
              left: `${e.x}px`,
              top: `${e.y}px`,
              width: e.size && e.size !== 56 ? `${e.size}px` : void 0,
              height: e.size && e.size !== 56 ? `${e.size}px` : void 0
            }),
            title: `${e.title} - ${e.desc || ""}`,
            "aria-label": e.title,
            onMouseenter: (s) => g(e),
            onMouseleave: (s) => _(e),
            onClick: (s) => k(e, s),
            onContextmenu: (s) => C(e, s)
          }, [
            n(a).mode === "shortcuts" && e.isShortcut ? (o(), r("span", {
              key: 0,
              role: "button",
              tabindex: "0",
              class: "nav-wheel-sector-del",
              title: `从快捷轮盘移除「${e.title}」`,
              "aria-label": `删除 ${e.title}`,
              onPointerdown: i[0] || (i[0] = m(() => {
              }, ["stop"])),
              onClick: m((s) => W(e), ["stop", "prevent"])
            }, " ✕ ", 40, Y)) : P("", !0),
            l("span", T, [
              p(e.icon) ? (o(), r("img", {
                key: 0,
                src: e.icon,
                alt: "",
                referrerpolicy: "no-referrer",
                onError: (s) => w(s, e)
              }, null, 40, U)) : (o(), r(u, { key: 1 }, [
                b(h(e.icon || "🔗"), 1)
              ], 64))
            ]),
            l("span", {
              class: "nav-wheel-sector-label",
              style: c(e.size && e.size < 50 ? { fontSize: "8px", maxWidth: "40px" } : void 0)
            }, h(e.title), 5)
          ], 46, X))), 128))
        ])
      ], 6)
    ], 8, I));
  }
});
export {
  K as default
};
