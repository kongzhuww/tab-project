import { q as s, o as f, b as a } from "./view-styles-CoGPhW6D.js";
import { d as x, x as E, G as L, y as B, u as n, o as l, e as r, f as o, m as w, t as d, g as c, F as N, h as H, B as M, b as k } from "./vendor-vue-DokqDua_.js";
import { _ as A } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const S = { key: 0 }, T = { "aria-label": "通知操作" }, z = ["disabled"], I = ["disabled"], $ = ["disabled"], D = {
  key: 0,
  class: "clear-confirm"
}, F = ["disabled"], O = {
  key: 1,
  class: "center-error",
  role: "alert"
}, P = { class: "center-list" }, R = {
  key: 0,
  class: "center-empty"
}, V = {
  key: 1,
  class: "center-empty"
}, U = { class: "history-meta" }, W = ["src"], q = {
  key: 0,
  class: "unread-dot",
  "aria-label": "未读"
}, G = ["datetime", "title"], j = ["disabled", "onClick"], J = ["disabled", "onClick"], K = { key: 0 }, Q = { key: 1 }, X = { class: "history-action" }, Y = /* @__PURE__ */ x({
  __name: "NotificationCenter",
  setup(Z) {
    const p = k(null), u = k(!1);
    function b() {
      const i = p.value;
      if (!i) return;
      const e = document.getElementById("bili-profile-button")?.getBoundingClientRect(), t = Math.min(400, window.innerWidth - 24);
      i.style.width = t + "px", i.style.left = Math.max(12, Math.min(e?.left || 16, window.innerWidth - t - 12)) + "px", i.style.top = Math.max(12, Math.min((e?.bottom || 46) + 10, window.innerHeight - 120)) + "px", i.style.maxHeight = Math.max(100, window.innerHeight - parseFloat(i.style.top) - 12) + "px";
    }
    function y(i) {
      const e = i.target;
      !p.value?.contains(e) && !document.getElementById("bili-profile-button")?.contains(e) && a.close();
    }
    function v(i) {
      i.key === "Escape" && !i.defaultPrevented && (i.stopPropagation(), a.close());
    }
    function h() {
      document.hidden && a.close();
    }
    function g() {
      window.removeEventListener("pointerdown", y), window.removeEventListener("keydown", v), window.removeEventListener("resize", b), document.removeEventListener("visibilitychange", h);
    }
    E(() => s.isOpen, async (i, e, t) => {
      let m = !1;
      t(() => {
        m = !0, g();
      }), u.value = !1, i && (await L(), !m && (p.value?.showPopover(), b(), window.addEventListener("pointerdown", y), window.addEventListener("keydown", v), window.addEventListener("resize", b), document.addEventListener("visibilitychange", h)));
    }, { immediate: !0, flush: "post" }), B(g);
    function _(i) {
      return new Date(i).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    async function C() {
      await a.clear(), u.value = !1;
    }
    return (i, e) => n(s).isOpen ? (l(), r("section", {
      key: 0,
      ref_key: "panel",
      ref: p,
      id: "notification-center",
      popover: "manual",
      class: "notification-center",
      "aria-label": "通知中心"
    }, [
      o("header", null, [
        o("div", null, [
          o("h2", null, [
            e[5] || (e[5] = w("通知中心 ", -1)),
            n(f) ? (l(), r("span", S, d(n(f)) + " 条未读", 1)) : c("", !0)
          ]),
          e[6] || (e[6] = o("small", null, "重要通知保留30天，最多200条 · 仅本机", -1))
        ]),
        o("button", {
          type: "button",
          "aria-label": "关闭通知中心",
          onClick: e[0] || (e[0] = //@ts-ignore
          (...t) => n(a).close && n(a).close(...t))
        }, "×")
      ]),
      o("nav", T, [
        o("button", {
          type: "button",
          disabled: n(s).saving || !n(f),
          onClick: e[1] || (e[1] = //@ts-ignore
          (...t) => n(a).markAllRead && n(a).markAllRead(...t))
        }, "全部已读", 8, z),
        o("button", {
          type: "button",
          disabled: n(s).saving || !n(s).items.length,
          onClick: e[2] || (e[2] = (t) => u.value = !u.value)
        }, "清空", 8, I),
        o("button", {
          type: "button",
          disabled: n(s).loading,
          onClick: e[3] || (e[3] = //@ts-ignore
          (...t) => n(a).refresh && n(a).refresh(...t))
        }, "重新读取", 8, $)
      ]),
      u.value ? (l(), r("div", D, [
        e[7] || (e[7] = w("清空这里的全部通知？", -1)),
        o("button", {
          type: "button",
          disabled: n(s).saving,
          onClick: C
        }, "确认清空", 8, F),
        o("button", {
          type: "button",
          onClick: e[4] || (e[4] = (t) => u.value = !1)
        }, "取消")
      ])) : c("", !0),
      n(s).error ? (l(), r("p", O, d(n(s).error), 1)) : c("", !0),
      o("div", P, [
        n(s).loading && !n(s).items.length ? (l(), r("p", R, "正在读取通知…")) : n(s).items.length ? c("", !0) : (l(), r("div", V, [...e[8] || (e[8] = [
          o("strong", null, "暂无通知", -1),
          o("p", null, "错过的重要 Toast 和任务提醒会保存在这里。普通保存、复制成功提示不会堆积。", -1)
        ])])),
        (l(!0), r(N, null, H(n(s).items, (t) => (l(), r("article", {
          key: t.id,
          class: M(["history-card", { unread: !t.read }])
        }, [
          o("div", U, [
            o("img", {
              src: t.appType === "bili" ? "assets/bilibili.svg" : "assets/icon-48.png",
              alt: ""
            }, null, 8, W),
            o("strong", null, d(t.appName), 1),
            t.read ? c("", !0) : (l(), r("span", q)),
            o("time", {
              datetime: new Date(t.createdAt).toISOString(),
              title: _(t.createdAt)
            }, d(_(t.createdAt)), 9, G),
            o("button", {
              type: "button",
              disabled: n(s).saving,
              "aria-label": "删除此通知",
              onClick: (m) => n(a).remove(t.id)
            }, "×", 8, j)
          ]),
          o("button", {
            type: "button",
            class: "history-content",
            disabled: n(s).saving,
            onClick: (m) => n(a).activate(t)
          }, [
            o("strong", null, d(t.title), 1),
            t.subtitle ? (l(), r("small", K, d(t.subtitle), 1)) : c("", !0),
            t.message ? (l(), r("p", Q, d(t.message), 1)) : c("", !0),
            o("span", X, d(t.target ? "打开相关页面 →" : t.read ? "已读" : "标记已读"), 1)
          ], 8, J)
        ], 2))), 128))
      ])
    ], 512)) : c("", !0);
  }
}), ot = /* @__PURE__ */ A(Y, [["__scopeId", "data-v-1707e552"]]);
export {
  ot as default
};
