import { f as P, g as l, h as a, x as n, s as g, i as t, t as o, F as f, z as h, j as R, u as c, k as _, l as T, c as p } from "./vendor-vue-BUkfvXUI.js";
import { B as $ } from "./BiliRichText-sNjt2n6q.js";
import { i as V } from "./images-C_Un6BHf.js";
import { u as W } from "./useWindowDraggable-ClzyorH0.js";
import { a as A, c as d } from "./up-group-manager-store-CPsfzf7t.js";
import { _ as O } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const S = { class: "vue-bili-message-panel-wrapper" }, U = { class: "bili-message-account" }, j = ["src"], F = { id: "bili-notification-user" }, H = { key: 0 }, L = { key: 1 }, E = {
  class: "bili-message-tabs",
  role: "tablist"
}, q = ["aria-selected", "onClick"], G = {
  key: 0,
  class: "bili-tab-badge"
}, J = { class: "bili-message-toolbar" }, Q = ["disabled"], X = { class: "bili-message-list" }, Y = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "24px 0" }
}, Z = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "24px 0" }
}, ee = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "24px 0" }
}, ie = ["href", "onClick", "onDblclick"], te = ["src"], se = { class: "bili-message-body" }, ne = { key: 0 }, le = {
  key: 1,
  class: "bili-message-image-box"
}, ae = ["src", "onClick"], oe = { key: 2 }, re = /* @__PURE__ */ P({
  __name: "BiliMessagePanel",
  setup(ce) {
    const e = A, { panelRef: v, headerRef: y, isDragging: w } = W({
      windowId: "bili-messages",
      storageKey: "lw_bili_messages_pos",
      defaultWidth: 360,
      defaultHeight: 560,
      minWidth: 300,
      minHeight: 380,
      resizable: !1
    }), m = [
      { kind: "reply", label: "回复" },
      { kind: "at", label: "@我" },
      { kind: "like", label: "点赞" },
      { kind: "system", label: "系统" },
      { kind: "private", label: "私信" }
    ], C = p(() => {
      const s = m.find((r) => r.kind === e.activeKind);
      return s ? s.label : "消息";
    }), k = p(() => Number(e.unreadCounts[e.activeKind] || 0)), x = p(() => Object.values(e.unreadCounts).reduce((s, r) => s + (Number(r) || 0), 0));
    function K(s) {
      e.activeKind !== s && d.switchKind(s);
    }
    function B() {
      d.markAllKnown(e.activeKind);
    }
    function u(s) {
      d.markKnown(e.activeKind, s.id);
    }
    function M(s) {
      u(s), window.open(s.url || "https://message.bilibili.com/", "_blank");
    }
    function D(s) {
      s.image && (u(s), V.open({
        source: s.image,
        title: `${s.title} 的图片`
      }));
    }
    function N() {
      window.open("https://message.bilibili.com/", "_blank");
    }
    function z() {
      d.switchKind(e.activeKind);
    }
    function I() {
      d.closePanel();
    }
    return (s, r) => (l(), a("div", S, [
      n(e).isOpen ? (l(), a("section", {
        key: 0,
        ref_key: "panelRef",
        ref: v,
        id: "bili-notification-center",
        class: g(["bili-message-panel", { "is-dragging": n(w) }]),
        role: "dialog",
        "aria-label": "Bilibili 消息与互动通知中心"
      }, [
        t("header", {
          ref_key: "headerRef",
          ref: y,
          class: "bili-msg-drag-header"
        }, [
          t("div", U, [
            t("img", {
              id: "bili-notification-avatar",
              src: n(e).userAvatar || "assets/bilibili.svg",
              alt: "用户头像",
              loading: "lazy"
            }, null, 8, j),
            t("div", null, [
              t("h2", F, o(n(e).userName || "B站用户"), 1),
              n(e).userMid ? (l(), a("p", H, "UID: " + o(n(e).userMid) + " · " + o(x.value) + " 条未读", 1)) : (l(), a("p", L, "点击右上角刷新获取未读"))
            ])
          ]),
          r[0] || (r[0] = t("span", { class: "grow" }, null, -1)),
          t("button", {
            type: "button",
            class: "bili-web-link-btn",
            title: "打开 B站 网页版消息中心",
            onClick: N
          }, " ↗ "),
          t("button", {
            type: "button",
            class: "bili-refresh-btn",
            title: "重新拉取最新互动通知",
            onClick: z
          }, " ↻ "),
          t("button", {
            type: "button",
            class: "bili-close-btn",
            title: "关闭通知中心",
            onClick: I
          }, " ✕ ")
        ], 512),
        t("nav", E, [
          (l(), a(f, null, h(m, (i) => t("button", {
            key: i.kind,
            type: "button",
            role: "tab",
            class: g({ on: n(e).activeKind === i.kind }),
            "aria-selected": n(e).activeKind === i.kind,
            onClick: (b) => K(i.kind)
          }, [
            R(o(i.label) + " ", 1),
            n(e).unreadCounts[i.kind] > 0 ? (l(), a("span", G, o(n(e).unreadCounts[i.kind]), 1)) : c("", !0)
          ], 10, q)), 64))
        ]),
        t("div", J, [
          t("div", null, [
            t("strong", null, o(C.value), 1),
            t("span", null, o(n(e).items.length) + " 条 · 未读 " + o(k.value), 1)
          ]),
          t("button", {
            type: "button",
            class: "bili-local-read",
            disabled: k.value <= 0,
            title: "仅清除扩展内未读红点",
            onClick: B
          }, " ✓ 一键已读 ", 8, Q)
        ]),
        t("div", X, [
          n(e).loading ? (l(), a("p", Y, " 正在同步 B站 互动消息… ")) : n(e).emptyText ? (l(), a("p", Z, o(n(e).emptyText), 1)) : n(e).items.length === 0 ? (l(), a("p", ee, " 这里暂时没有消息 ☕ ")) : (l(!0), a(f, { key: 3 }, h(n(e).items, (i) => (l(), a("a", {
            key: i.id,
            class: g(["bili-message-item", { "locally-known": i.isKnown }]),
            href: i.url || "https://message.bilibili.com/",
            target: "_blank",
            rel: "noreferrer",
            title: "单击：标记已读；双击：打开对应 B站页面",
            onClick: _((b) => u(i), ["prevent"]),
            onDblclick: _((b) => M(i), ["prevent", "stop"])
          }, [
            t("img", {
              class: "bili-message-avatar",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              src: i.avatar || "assets/bilibili.svg",
              alt: ""
            }, null, 8, te),
            t("div", se, [
              t("h3", null, o(i.title), 1),
              i.content ? (l(), a("p", ne, [
                T($, {
                  text: i.content
                }, null, 8, ["text"])
              ])) : c("", !0),
              i.image ? (l(), a("div", le, [
                t("img", {
                  class: "bili-message-thumb",
                  loading: "lazy",
                  referrerpolicy: "no-referrer",
                  src: i.image,
                  alt: "图片附件",
                  title: "点击查看大图",
                  onClick: _((b) => D(i), ["stop", "prevent"])
                }, null, 8, ae)
              ])) : c("", !0),
              i.time ? (l(), a("time", oe, o(i.time), 1)) : c("", !0)
            ])
          ], 42, ie))), 128))
        ])
      ], 2)) : c("", !0)
    ]));
  }
}), me = /* @__PURE__ */ O(re, [["__scopeId", "data-v-10cffb34"]]);
export {
  me as default
};
