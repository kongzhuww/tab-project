import { l, k as h, b as r } from "./view-styles-CIHS6zRl.js";
import { t as a, c as E, _ as L } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { d as T, w as A, D as B, x as H, u as t, o as c, e as d, i as n, m as k, t as o, f as u, F as M, g as N, A as R, b as C } from "./vendor-vue-9b0eS4bW.js";
const S = ["aria-label"], D = { key: 0 }, z = ["aria-label"], I = ["aria-label"], O = ["disabled"], $ = ["disabled"], F = ["disabled"], P = {
  key: 0,
  class: "clear-confirm"
}, U = ["disabled"], V = {
  key: 1,
  class: "center-error",
  role: "alert"
}, W = { class: "center-list" }, j = {
  key: 0,
  class: "center-empty"
}, q = {
  key: 1,
  class: "center-empty"
}, G = { class: "history-meta" }, J = ["src"], K = {
  key: 0,
  class: "unread-dot",
  "aria-label": "未读"
}, Q = ["datetime", "title"], X = ["disabled", "onClick"], Y = ["disabled", "onClick"], Z = { key: 0 }, tt = { key: 1 }, et = { class: "history-action" }, nt = /* @__PURE__ */ T({
  __name: "NotificationCenter",
  setup(it) {
    const m = C(null), f = C(!1);
    function b() {
      const s = m.value;
      if (!s) return;
      const i = document.getElementById("bili-profile-button")?.getBoundingClientRect(), e = Math.min(320, window.innerWidth - 24);
      s.style.width = e + "px", s.style.left = Math.max(12, Math.min(i?.left || 16, window.innerWidth - e - 12)) + "px", s.style.top = Math.max(12, Math.min((i?.bottom || 46) + 10, window.innerHeight - 120)) + "px";
      const p = window.innerHeight - parseFloat(s.style.top) - 16;
      s.style.maxHeight = Math.max(100, Math.min(520, p)) + "px";
    }
    function y(s) {
      const i = s.target;
      !m.value?.contains(i) && !document.getElementById("bili-profile-button")?.contains(i) && r.close();
    }
    function _(s) {
      s.key === "Escape" && !s.defaultPrevented && (s.stopPropagation(), r.close());
    }
    function v() {
      document.hidden && r.close();
    }
    function g() {
      window.removeEventListener("pointerdown", y), window.removeEventListener("keydown", _), window.removeEventListener("resize", b), document.removeEventListener("visibilitychange", v);
    }
    A(() => l.isOpen, async (s, i, e) => {
      let p = !1;
      e(() => {
        p = !0, g();
      }), f.value = !1, s && (await B(), !p && (m.value?.showPopover(), b(), window.addEventListener("pointerdown", y), window.addEventListener("keydown", _), window.addEventListener("resize", b), document.addEventListener("visibilitychange", v)));
    }, { immediate: !0, flush: "post" }), H(g);
    function w(s) {
      const i = E.value === "en" ? "en-US" : "zh-CN";
      return new Date(s).toLocaleString(i, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    async function x() {
      await r.clear(), f.value = !1;
    }
    return (s, i) => t(l).isOpen ? (c(), d("section", {
      key: 0,
      ref_key: "panel",
      ref: m,
      id: "notification-center",
      popover: "manual",
      class: "notification-center",
      "aria-label": t(a)("notifications.centerTitle")
    }, [
      n("header", null, [
        n("div", null, [
          n("h2", null, [
            k(o(t(a)("notifications.centerTitle")) + " ", 1),
            t(h) ? (c(), d("span", D, o(t(a)("notifications.unreadCountOnly", { count: t(h) })), 1)) : u("", !0)
          ]),
          n("small", null, o(t(a)("notifications.retention")), 1)
        ]),
        n("button", {
          type: "button",
          "aria-label": t(a)("window.close"),
          onClick: i[0] || (i[0] = //@ts-ignore
          (...e) => t(r).close && t(r).close(...e))
        }, "×", 8, z)
      ]),
      n("nav", {
        "aria-label": t(a)("notifications.centerTitle")
      }, [
        n("button", {
          type: "button",
          disabled: t(l).saving || !t(h),
          onClick: i[1] || (i[1] = //@ts-ignore
          (...e) => t(r).markAllRead && t(r).markAllRead(...e))
        }, o(t(a)("notifications.markAllRead")), 9, O),
        n("button", {
          type: "button",
          disabled: t(l).saving || !t(l).items.length,
          onClick: i[2] || (i[2] = (e) => f.value = !f.value)
        }, o(t(a)("notifications.clear")), 9, $),
        n("button", {
          type: "button",
          disabled: t(l).loading,
          onClick: i[3] || (i[3] = //@ts-ignore
          (...e) => t(r).refresh && t(r).refresh(...e))
        }, o(t(a)("notifications.reload")), 9, F)
      ], 8, I),
      f.value ? (c(), d("div", P, [
        k(o(t(a)("notifications.clearConfirm")), 1),
        n("button", {
          type: "button",
          disabled: t(l).saving,
          onClick: x
        }, o(t(a)("notifications.confirmClearBtn")), 9, U),
        n("button", {
          type: "button",
          onClick: i[4] || (i[4] = (e) => f.value = !1)
        }, o(t(a)("common.cancel")), 1)
      ])) : u("", !0),
      t(l).error ? (c(), d("p", V, o(t(l).error), 1)) : u("", !0),
      n("div", W, [
        t(l).loading && !t(l).items.length ? (c(), d("p", j, o(t(a)("notifications.reading")), 1)) : t(l).items.length ? u("", !0) : (c(), d("div", q, [
          n("strong", null, o(t(a)("notifications.emptyTitle")), 1),
          n("p", null, o(t(a)("notifications.emptyDesc")), 1)
        ])),
        (c(!0), d(M, null, N(t(l).items, (e) => (c(), d("article", {
          key: e.id,
          class: R(["history-card", { unread: !e.read }])
        }, [
          n("div", G, [
            n("img", {
              src: e.appType === "bili" ? "assets/bilibili.svg" : "assets/icon-48.png",
              alt: ""
            }, null, 8, J),
            n("strong", null, o(e.appName), 1),
            e.read ? u("", !0) : (c(), d("span", K)),
            n("time", {
              datetime: new Date(e.createdAt).toISOString(),
              title: w(e.createdAt)
            }, o(w(e.createdAt)), 9, Q),
            n("button", {
              type: "button",
              disabled: t(l).saving,
              "aria-label": "删除此通知",
              onClick: (p) => t(r).remove(e.id)
            }, "×", 8, X)
          ]),
          n("button", {
            type: "button",
            class: "history-content",
            disabled: t(l).saving,
            onClick: (p) => t(r).activate(e)
          }, [
            n("strong", null, o(e.title), 1),
            e.subtitle ? (c(), d("small", Z, o(e.subtitle), 1)) : u("", !0),
            e.message ? (c(), d("p", tt, o(e.message), 1)) : u("", !0),
            n("span", et, o(e.target ? t(a)("notifications.openTarget") : e.read ? t(a)("notifications.isRead") : t(a)("notifications.markRead")), 1)
          ], 8, Y)
        ], 2))), 128))
      ])
    ], 8, S)) : u("", !0);
  }
}), lt = /* @__PURE__ */ L(nt, [["__scopeId", "data-v-8948b333"]]);
export {
  lt as default
};
