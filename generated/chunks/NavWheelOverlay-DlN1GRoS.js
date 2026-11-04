import { d as D, o as s, g as r, h as l, H as N, B as p, u as i, C as b, F as m, p as W, t as u, j, k, i as G, y as V } from "./vendor-vue-FFI3kJnP.js";
import { n as F, i as C, j as d } from "./main-DYcoynvZ.js";
const O = ["hidden"], R = {
  id: "nav-wheel-beam-svg",
  class: "nav-wheel-beam-svg",
  viewBox: "0 0 320 320",
  "aria-hidden": "true"
}, T = ["d"], U = ["x1", "y1", "x2", "y2"], q = ["x1", "y1", "x2", "y2"], A = ["d"], J = {
  id: "nav-wheel-hub-icon",
  class: "nav-wheel-hub-icon"
}, K = ["src"], Q = {
  id: "nav-wheel-hub-title",
  class: "nav-wheel-hub-title"
}, Z = {
  id: "nav-wheel-hub-desc",
  class: "nav-wheel-hub-desc"
}, ee = {
  id: "nav-wheel-sectors",
  class: "nav-wheel-sectors"
}, te = ["data-id", "title", "aria-label", "onMouseenter", "onMouseleave", "onClick", "onContextmenu"], ne = ["title", "aria-label", "onClick"], ie = { class: "nav-wheel-sector-icon" }, ae = ["src", "onError"], re = /* @__PURE__ */ D({
  __name: "NavWheelOverlay",
  setup(oe) {
    const n = F, P = V(() => !n.ballPosition.x && !n.ballPosition.y ? {} : {
      left: `${n.ballPosition.x}px`,
      top: `${n.ballPosition.y}px`
    });
    function w(e) {
      return e ? e.endsWith(".svg") || e.endsWith(".png") || e.endsWith(".ico") || e.endsWith(".webp") || e.endsWith(".jpg") || e.endsWith(".jpeg") || e.startsWith("assets/") || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("data:") || e.startsWith("blob:") || e.startsWith("chrome://") || e.startsWith("chrome-extension://") || e.includes("/_favicon/") : !1;
    }
    function S(e, a) {
      const t = e.target;
      if (t) {
        if (a.desc && a.desc.startsWith("http"))
          try {
            const o = new URL(a.desc).origin;
            if (!t.src.includes(o)) {
              t.src = `${o}/favicon.ico`;
              return;
            }
          } catch {
          }
        t.style.display = "none";
      }
    }
    let c = !1, f = 0, x = 0, g = 0, y = 0, h = !1;
    function E(e) {
      if (e.button === 0) {
        e.stopPropagation(), c = !0, h = !1, f = e.clientX, x = e.clientY, g = n.ballPosition.x, y = n.ballPosition.y;
        try {
          e.currentTarget?.setPointerCapture?.(e.pointerId);
        } catch {
        }
        window.addEventListener("pointermove", _), window.addEventListener("pointerup", v), window.addEventListener("pointercancel", v);
      }
    }
    function _(e) {
      if (!c) return;
      const a = e.clientX - f, t = e.clientY - x;
      if (!h && Math.hypot(a, t) > 4 && (h = !0), h) {
        const o = n.isExpanded ? 160 : 24, X = Math.max(o + 8, Math.min(window.innerWidth - o - 8, g + a)), Y = Math.max(o + 8, Math.min(window.innerHeight - o - 8, y + t));
        d.setBallPosition(X, Y);
      }
    }
    function v(e) {
      c && (c = !1, window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", v));
    }
    function $(e) {
      if (e.stopPropagation(), h) {
        h = !1;
        return;
      }
      d.dispatch("hub:click");
    }
    function M(e) {
      !n.isExpanded || e.target?.closest("#nav-wheel-hub, #nav-wheel-context-menu, .nav-wheel-sector") || d.dispatch("container:click");
    }
    function z(e) {
      d.dispatch("sector:hover", e);
    }
    function B(e) {
      d.dispatch("sector:leave", e);
    }
    function H(e, a) {
      a.stopPropagation(), d.dispatch("sector:click", e);
    }
    function L(e) {
      C.removeShortcut(e.id);
    }
    function I(e, a) {
      a.preventDefault(), a.stopPropagation(), d.dispatch("sector:contextmenu", { sector: e, clientX: a.clientX, clientY: a.clientY });
    }
    return (e, a) => (s(), r("div", {
      id: "nav-wheel-overlay",
      class: "nav-wheel-overlay",
      hidden: !i(n).isOpen,
      "aria-label": "页面导航悬浮球与轮盘"
    }, [
      a[2] || (a[2] = l("div", {
        id: "nav-wheel-center-dot",
        class: "nav-wheel-center-dot"
      }, null, -1)),
      l("div", {
        id: "nav-wheel-container",
        class: b(["nav-wheel-container", { expanded: i(n).isExpanded }]),
        style: p(P.value),
        onClick: M
      }, [
        (s(), r("svg", R, [
          a[1] || (a[1] = N('<defs><radialGradient id="navWheelBeamGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255, 255, 255, 0.28)"></stop><stop offset="50%" stop-color="rgba(255, 255, 255, 0.16)"></stop><stop offset="85%" stop-color="rgba(255, 255, 255, 0.06)"></stop><stop offset="100%" stop-color="rgba(255, 255, 255, 0.01)"></stop></radialGradient></defs>', 1)),
          l("g", {
            id: "nav-wheel-beam-group",
            class: "nav-wheel-beam-group",
            style: p({ opacity: i(n).beam.visible ? "1" : "0" })
          }, [
            l("path", {
              id: "nav-wheel-beam-wedge",
              class: "nav-wheel-beam-wedge",
              fill: "url(#navWheelBeamGrad)",
              d: i(n).beam.wedgePath
            }, null, 8, T),
            l("line", {
              id: "nav-wheel-beam-line1",
              class: "nav-wheel-beam-line",
              x1: i(n).beam.line1.x1,
              y1: i(n).beam.line1.y1,
              x2: i(n).beam.line1.x2,
              y2: i(n).beam.line1.y2
            }, null, 8, U),
            l("line", {
              id: "nav-wheel-beam-line2",
              class: "nav-wheel-beam-line",
              x1: i(n).beam.line2.x1,
              y1: i(n).beam.line2.y1,
              x2: i(n).beam.line2.x2,
              y2: i(n).beam.line2.y2
            }, null, 8, q),
            l("path", {
              id: "nav-wheel-beam-arc",
              class: "nav-wheel-beam-arc",
              d: i(n).beam.arcPath
            }, null, 8, A)
          ], 4)
        ])),
        l("div", {
          id: "nav-wheel-hub",
          class: b(["nav-wheel-hub", { active: i(n).hub.active, dragging: i(c) }]),
          role: "button",
          tabindex: "0",
          title: "按住中心可拖拽移动轮盘位置；点击返回上级或收起",
          onPointerdown: E,
          onClick: $
        }, [
          l("div", J, [
            w(i(n).hub.icon) ? (s(), r("img", {
              key: 0,
              src: i(n).hub.icon,
              alt: "",
              referrerpolicy: "no-referrer"
            }, null, 8, K)) : (s(), r(m, { key: 1 }, [
              W(u(i(n).hub.icon), 1)
            ], 64))
          ]),
          l("div", Q, u(i(n).hub.title), 1),
          l("div", Z, u(i(n).hub.desc), 1)
        ], 34),
        l("div", ee, [
          (s(!0), r(m, null, j(i(n).sectors, (t) => (s(), r("button", {
            key: t.id,
            type: "button",
            class: b(["nav-wheel-sector", { active: t.id === i(n).activeSectorId }]),
            "data-id": t.id,
            style: p({
              left: `${t.x}px`,
              top: `${t.y}px`,
              width: t.size && t.size !== 56 ? `${t.size}px` : void 0,
              height: t.size && t.size !== 56 ? `${t.size}px` : void 0
            }),
            title: `${t.title} - ${t.desc || ""}`,
            "aria-label": t.title,
            onMouseenter: (o) => z(t),
            onMouseleave: (o) => B(t),
            onClick: (o) => H(t, o),
            onContextmenu: (o) => I(t, o)
          }, [
            i(n).mode === "shortcuts" && t.isShortcut && i(C).isEditingShortcuts ? (s(), r("span", {
              key: 0,
              role: "button",
              tabindex: "0",
              class: "nav-wheel-sector-del",
              title: `从快捷轮盘移除「${t.title}」`,
              "aria-label": `删除 ${t.title}`,
              onPointerdown: a[0] || (a[0] = k(() => {
              }, ["stop"])),
              onClick: k((o) => L(t), ["stop", "prevent"])
            }, " ✕ ", 40, ne)) : G("", !0),
            l("span", ie, [
              w(t.icon) ? (s(), r("img", {
                key: 0,
                src: t.icon,
                alt: "",
                referrerpolicy: "no-referrer",
                onError: (o) => S(o, t)
              }, null, 40, ae)) : (s(), r(m, { key: 1 }, [
                W(u(t.icon || "🔗"), 1)
              ], 64))
            ]),
            l("span", {
              class: "nav-wheel-sector-label",
              style: p(t.size && t.size < 50 ? { fontSize: "8px", maxWidth: "40px" } : void 0)
            }, u(t.title), 5)
          ], 46, te))), 128))
        ])
      ], 6)
    ], 8, O));
  }
});
export {
  re as default
};
