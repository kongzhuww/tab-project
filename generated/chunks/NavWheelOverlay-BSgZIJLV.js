import { n as k, k as d } from "./main-BypVWs23.js";
import { d as C, o, e as r, f as s, H as z, A as c, u as n, B as v, F as u, m as b, t as h, h as $, s as S } from "./vendor-vue-DokqDua_.js";
const P = ["hidden"], B = {
  id: "nav-wheel-beam-svg",
  class: "nav-wheel-beam-svg",
  viewBox: "0 0 320 320",
  "aria-hidden": "true"
}, E = ["d"], M = ["x1", "y1", "x2", "y2"], G = ["x1", "y1", "x2", "y2"], I = ["d"], N = {
  id: "nav-wheel-hub-icon",
  class: "nav-wheel-hub-icon"
}, H = ["src"], L = {
  id: "nav-wheel-hub-title",
  class: "nav-wheel-hub-title"
}, V = {
  id: "nav-wheel-hub-desc",
  class: "nav-wheel-hub-desc"
}, j = {
  id: "nav-wheel-sectors",
  class: "nav-wheel-sectors"
}, D = ["data-id", "title", "aria-label", "onMouseenter", "onMouseleave", "onClick", "onContextmenu"], F = { class: "nav-wheel-sector-icon" }, O = ["src", "onError"], R = /* @__PURE__ */ C({
  __name: "NavWheelOverlay",
  setup(X) {
    const a = k, m = S(() => !a.ballPosition.x && !a.ballPosition.y ? {} : {
      left: `${a.ballPosition.x}px`,
      top: `${a.ballPosition.y}px`
    });
    function p(e) {
      return e ? e.endsWith(".svg") || e.endsWith(".png") || e.endsWith(".ico") || e.endsWith(".webp") || e.endsWith(".jpg") || e.endsWith(".jpeg") || e.startsWith("assets/") || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("data:") || e.startsWith("blob:") || e.startsWith("chrome://") || e.startsWith("chrome-extension://") || e.includes("/_favicon/") : !1;
    }
    function f(e, i) {
      const t = e.target;
      if (t) {
        if (i.desc && i.desc.startsWith("http"))
          try {
            const l = new URL(i.desc).origin;
            if (!t.src.includes(l)) {
              t.src = `${l}/favicon.ico`;
              return;
            }
          } catch {
          }
        t.style.display = "none";
      }
    }
    function w(e) {
      e.stopPropagation(), d.dispatch("hub:click");
    }
    function x(e) {
      !a.isExpanded || e.target?.closest("#nav-wheel-hub, #nav-wheel-context-menu, .nav-wheel-sector") || d.dispatch("container:click");
    }
    function y(e) {
      d.dispatch("sector:hover", e);
    }
    function g(e) {
      d.dispatch("sector:leave", e);
    }
    function _(e, i) {
      i.stopPropagation(), d.dispatch("sector:click", e);
    }
    function W(e, i) {
      i.preventDefault(), i.stopPropagation(), d.dispatch("sector:contextmenu", { sector: e, clientX: i.clientX, clientY: i.clientY });
    }
    return (e, i) => (o(), r("div", {
      id: "nav-wheel-overlay",
      class: "nav-wheel-overlay",
      hidden: !n(a).isOpen,
      "aria-label": "页面导航悬浮球与轮盘"
    }, [
      i[1] || (i[1] = s("div", {
        id: "nav-wheel-center-dot",
        class: "nav-wheel-center-dot"
      }, null, -1)),
      s("div", {
        id: "nav-wheel-container",
        class: v(["nav-wheel-container", { expanded: n(a).isExpanded }]),
        style: c(m.value),
        onClick: x
      }, [
        (o(), r("svg", B, [
          i[0] || (i[0] = z('<defs><radialGradient id="navWheelBeamGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255, 255, 255, 0.28)"></stop><stop offset="50%" stop-color="rgba(255, 255, 255, 0.16)"></stop><stop offset="85%" stop-color="rgba(255, 255, 255, 0.06)"></stop><stop offset="100%" stop-color="rgba(255, 255, 255, 0.01)"></stop></radialGradient></defs>', 1)),
          s("g", {
            id: "nav-wheel-beam-group",
            class: "nav-wheel-beam-group",
            style: c({ opacity: n(a).beam.visible ? "1" : "0" })
          }, [
            s("path", {
              id: "nav-wheel-beam-wedge",
              class: "nav-wheel-beam-wedge",
              fill: "url(#navWheelBeamGrad)",
              d: n(a).beam.wedgePath
            }, null, 8, E),
            s("line", {
              id: "nav-wheel-beam-line1",
              class: "nav-wheel-beam-line",
              x1: n(a).beam.line1.x1,
              y1: n(a).beam.line1.y1,
              x2: n(a).beam.line1.x2,
              y2: n(a).beam.line1.y2
            }, null, 8, M),
            s("line", {
              id: "nav-wheel-beam-line2",
              class: "nav-wheel-beam-line",
              x1: n(a).beam.line2.x1,
              y1: n(a).beam.line2.y1,
              x2: n(a).beam.line2.x2,
              y2: n(a).beam.line2.y2
            }, null, 8, G),
            s("path", {
              id: "nav-wheel-beam-arc",
              class: "nav-wheel-beam-arc",
              d: n(a).beam.arcPath
            }, null, 8, I)
          ], 4)
        ])),
        s("div", {
          id: "nav-wheel-hub",
          class: v(["nav-wheel-hub", { active: n(a).hub.active }]),
          role: "button",
          tabindex: "0",
          title: "导航悬浮球 (点击展开/收起轮盘，快捷键可移至当前鼠标)",
          onClick: w
        }, [
          s("div", N, [
            p(n(a).hub.icon) ? (o(), r("img", {
              key: 0,
              src: n(a).hub.icon,
              alt: "",
              referrerpolicy: "no-referrer"
            }, null, 8, H)) : (o(), r(u, { key: 1 }, [
              b(h(n(a).hub.icon), 1)
            ], 64))
          ]),
          s("div", L, h(n(a).hub.title), 1),
          s("div", V, h(n(a).hub.desc), 1)
        ], 2),
        s("div", j, [
          (o(!0), r(u, null, $(n(a).sectors, (t) => (o(), r("button", {
            key: t.id,
            type: "button",
            class: v(["nav-wheel-sector", { active: t.id === n(a).activeSectorId }]),
            "data-id": t.id,
            style: c({
              left: `${t.x}px`,
              top: `${t.y}px`,
              width: t.size && t.size !== 56 ? `${t.size}px` : void 0,
              height: t.size && t.size !== 56 ? `${t.size}px` : void 0
            }),
            title: `${t.title} - ${t.desc || ""}`,
            "aria-label": t.title,
            onMouseenter: (l) => y(t),
            onMouseleave: (l) => g(t),
            onClick: (l) => _(t, l),
            onContextmenu: (l) => W(t, l)
          }, [
            s("span", F, [
              p(t.icon) ? (o(), r("img", {
                key: 0,
                src: t.icon,
                alt: "",
                referrerpolicy: "no-referrer",
                onError: (l) => f(l, t)
              }, null, 40, O)) : (o(), r(u, { key: 1 }, [
                b(h(t.icon || "🔗"), 1)
              ], 64))
            ]),
            s("span", {
              class: "nav-wheel-sector-label",
              style: c(t.size && t.size < 50 ? { fontSize: "8px", maxWidth: "40px" } : void 0)
            }, h(t.title), 5)
          ], 46, D))), 128))
        ])
      ], 6)
    ], 8, P));
  }
});
export {
  R as default
};
