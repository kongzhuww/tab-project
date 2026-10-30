import { d as M, o as l, e as n, u as t, B as u, f as e, t as o, F as m, h as p, i as _, D as P, g as c, s as R } from "./vendor-vue-DokqDua_.js";
import { B as z } from "./BiliRichText-BE-gFgV_.js";
import { i as D } from "./images-BhII7-Au.js";
import { u as I } from "./useWindowDraggable-DzZ5uK6K.js";
import { biliMessagePanelState as N, biliMessagePanelController as d } from "./message-panel-store-DHyMeJ3M.js";
import { _ as T } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const W = { class: "vue-bili-message-panel-wrapper" }, $ = { class: "bili-message-account" }, S = ["src"], V = { id: "bili-notification-user" }, F = { key: 0 }, H = { key: 1 }, L = {
  class: "bili-message-tabs",
  role: "tablist"
}, O = ["aria-selected", "onClick"], A = { class: "bili-message-toolbar" }, E = { class: "bili-message-list" }, U = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "24px 0" }
}, j = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "24px 0" }
}, q = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "24px 0" }
}, G = ["href", "onClick"], J = ["src"], Q = { class: "bili-message-body" }, X = { key: 0 }, Y = {
  key: 1,
  class: "bili-message-image-box"
}, Z = ["src", "onClick"], ee = { key: 2 }, ie = /* @__PURE__ */ M({
  __name: "BiliMessagePanel",
  setup(se) {
    const s = N, { panelRef: f, headerRef: h, isDragging: k } = I({
      windowId: "bili-messages",
      storageKey: "lw_bili_messages_pos",
      defaultWidth: 360,
      defaultHeight: 560,
      minWidth: 300,
      minHeight: 380,
      resizable: !1
    }), b = [
      { kind: "reply", label: "回复" },
      { kind: "at", label: "@我" },
      { kind: "like", label: "点赞" },
      { kind: "system", label: "系统" },
      { kind: "private", label: "私信" }
    ], y = R(() => {
      const a = b.find((r) => r.kind === s.activeKind);
      return a ? a.label : "消息";
    });
    function v(a) {
      s.activeKind !== a && d.switchKind(a);
    }
    function w(a) {
      window.open(a.url || "https://message.bilibili.com/", "_blank", "noopener,noreferrer");
    }
    function x(a) {
      a.image && D.open({
        source: a.image,
        title: `${a.title} 的图片`
      });
    }
    function C() {
      window.open("https://message.bilibili.com/", "_blank");
    }
    function B() {
      d.switchKind(s.activeKind);
    }
    function K() {
      d.closePanel();
    }
    return (a, r) => (l(), n("div", W, [
      t(s).isOpen ? (l(), n("section", {
        key: 0,
        ref_key: "panelRef",
        ref: f,
        id: "bili-notification-center",
        class: u(["bili-message-panel", { "is-dragging": t(k) }]),
        role: "dialog",
        "aria-label": "Bilibili 消息与互动通知中心"
      }, [
        e("header", {
          ref_key: "headerRef",
          ref: h,
          class: "bili-msg-drag-header"
        }, [
          e("div", $, [
            e("img", {
              id: "bili-notification-avatar",
              src: t(s).userAvatar || "assets/bilibili.svg",
              alt: "用户头像",
              loading: "lazy"
            }, null, 8, S),
            e("div", null, [
              e("h2", V, o(t(s).userName || "B站用户"), 1),
              t(s).userMid ? (l(), n("p", F, "UID: " + o(t(s).userMid) + " · 消息动态 (纯浏览)", 1)) : (l(), n("p", H, "点击右上角刷新获取消息"))
            ])
          ]),
          r[0] || (r[0] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "bili-web-link-btn",
            title: "打开 B站 网页版消息中心",
            onClick: C
          }, " ↗ "),
          e("button", {
            type: "button",
            class: "bili-refresh-btn",
            title: "重新拉取最新互动通知",
            onClick: B
          }, " ↻ "),
          e("button", {
            type: "button",
            class: "bili-close-btn",
            title: "关闭通知中心",
            onClick: K
          }, " ✕ ")
        ], 512),
        e("nav", L, [
          (l(), n(m, null, p(b, (i) => e("button", {
            key: i.kind,
            type: "button",
            role: "tab",
            class: u({ on: t(s).activeKind === i.kind }),
            "aria-selected": t(s).activeKind === i.kind,
            onClick: (g) => v(i.kind)
          }, o(i.label), 11, O)), 64))
        ]),
        e("div", A, [
          e("div", null, [
            e("strong", null, o(y.value), 1),
            e("span", null, "共 " + o(t(s).items.length) + " 条动态", 1)
          ]),
          r[1] || (r[1] = e("span", { class: "bili-toolbar-note" }, "🔒 纯浏览模式", -1))
        ]),
        e("div", E, [
          t(s).loading ? (l(), n("p", U, " 正在同步 B站 互动消息… ")) : t(s).emptyText ? (l(), n("p", j, o(t(s).emptyText), 1)) : t(s).items.length === 0 ? (l(), n("p", q, " 这里暂时没有消息 ☕ ")) : (l(!0), n(m, { key: 3 }, p(t(s).items, (i) => (l(), n("a", {
            key: i.id,
            class: "bili-message-item",
            href: i.url || "https://message.bilibili.com/",
            target: "_blank",
            rel: "noreferrer",
            title: "点击打开对应 B站页面",
            onClick: _((g) => w(i), ["prevent"])
          }, [
            e("img", {
              class: "bili-message-avatar",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              src: i.avatar || "assets/bilibili.svg",
              alt: ""
            }, null, 8, J),
            e("div", Q, [
              e("h3", null, o(i.title), 1),
              i.content ? (l(), n("p", X, [
                P(z, {
                  text: i.content
                }, null, 8, ["text"])
              ])) : c("", !0),
              i.image ? (l(), n("div", Y, [
                e("img", {
                  class: "bili-message-thumb",
                  loading: "lazy",
                  referrerpolicy: "no-referrer",
                  src: i.image,
                  alt: "图片附件",
                  title: "点击查看大图",
                  onClick: _((g) => x(i), ["stop", "prevent"])
                }, null, 8, Z)
              ])) : c("", !0),
              i.time ? (l(), n("time", ee, o(i.time), 1)) : c("", !0)
            ])
          ], 8, G))), 128))
        ])
      ], 2)) : c("", !0)
    ]));
  }
}), ce = /* @__PURE__ */ T(ie, [["__scopeId", "data-v-1d965b90"]]);
export {
  ce as default
};
