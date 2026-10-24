import { f as v, g as a, h as d, I as x, x as b, k as f, i, t as c, l as B, H as w, F as $, w as L, d as T, s as k, u as V, z as F, c as U } from "./vendor-vue-BUkfvXUI.js";
import { _ as h, I as C } from "./useInlineTitleEdit-B07QlU7T.js";
import { _ as N } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const S = { class: "link-menu-header" }, z = ["id"], Q = /* @__PURE__ */ v({
  __name: "LauncherMenuTitle",
  props: {
    title: {},
    titleId: {},
    editing: { type: Boolean },
    draft: {},
    busy: { type: Boolean },
    revision: {},
    failed: { type: Boolean },
    message: {},
    maxlength: { default: 50 },
    placeholder: { default: "输入新标题" }
  },
  emits: ["update:draft", "start", "commit", "cancel"],
  setup(e, { emit: m }) {
    const n = m;
    return (s, t) => (a(), d("div", S, [
      e.editing ? (a(), x(b(h), {
        key: 0,
        "model-value": e.draft,
        busy: e.busy,
        revision: e.revision,
        "aria-invalid": e.failed || void 0,
        class: "link-menu-title-input",
        maxlength: e.maxlength,
        placeholder: e.placeholder,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => n("update:draft", l)),
        onCommit: t[1] || (t[1] = (l) => n("commit")),
        onCancel: t[2] || (t[2] = (l) => n("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid", "maxlength", "placeholder"])) : (a(), d("div", {
        key: 1,
        class: "link-menu-title-display",
        title: "点击直接修改名称",
        onClick: t[3] || (t[3] = f((l) => n("start"), ["stop"]))
      }, [
        i("span", {
          id: e.titleId,
          class: "link-menu-title-text"
        }, c(e.title), 9, z),
        t[4] || (t[4] = i("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ])),
      B(b(C), {
        message: e.message,
        failed: e.failed
      }, null, 8, ["message", "failed"]),
      w(s.$slots, "default")
    ]));
  }
}), E = ["title"], H = { class: "link-menu-subtext" }, R = /* @__PURE__ */ v({
  __name: "LauncherMenuUrl",
  props: {
    url: {},
    editing: { type: Boolean },
    draft: {},
    busy: { type: Boolean },
    revision: {},
    failed: { type: Boolean },
    message: {}
  },
  emits: ["update:draft", "start", "commit", "cancel"],
  setup(e, { emit: m }) {
    const n = m;
    return (s, t) => (a(), d($, null, [
      e.editing ? (a(), x(b(h), {
        key: 0,
        "model-value": e.draft,
        busy: e.busy,
        revision: e.revision,
        "aria-invalid": e.failed || void 0,
        "aria-label": "网站网址",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "https://...",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => n("update:draft", l)),
        onCommit: t[1] || (t[1] = (l) => n("commit")),
        onCancel: t[2] || (t[2] = (l) => n("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (a(), d("div", {
        key: 1,
        class: "link-menu-subtitle",
        title: "点击直接修改网址: " + e.url,
        onClick: t[3] || (t[3] = f((l) => n("start"), ["stop"]))
      }, [
        t[4] || (t[4] = i("span", { class: "link-menu-note-badge" }, "🔗", -1)),
        i("span", H, c(e.url || "未设置网址"), 1),
        t[5] || (t[5] = i("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, E)),
      B(b(C), {
        message: e.message,
        failed: e.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), W = ["id", "disabled", "title"], D = ["id", "hidden"], j = {
  key: 0,
  class: "folder-submenu-empty"
}, q = ["disabled", "title", "onClick"], A = { class: "folder-submenu-text" }, G = /* @__PURE__ */ v({
  __name: "LauncherMoveMenu",
  props: {
    open: { type: Boolean },
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    items: {},
    x: {},
    y: {},
    verticalBudget: { default: 240 },
    buttonId: {},
    submenuId: {},
    label: { default: "移动到" },
    title: {},
    emptyText: { default: "暂无其他分组" }
  },
  emits: ["update:open", "select"],
  setup(e, { emit: m }) {
    const n = e, s = m;
    let t;
    const l = U(() => ({
      "open-left": n.x + 196 + 220 > window.innerWidth,
      "open-up": n.y + n.verticalBudget > window.innerHeight
    }));
    function o() {
      clearTimeout(t), t = void 0;
    }
    function y() {
      o(), n.visible && !n.disabled && s("update:open", !0);
    }
    function p() {
      o(), t = setTimeout(() => {
        s("update:open", !1), t = void 0;
      }, 280);
    }
    function M() {
      o(), n.disabled || s("update:open", !n.open);
    }
    function I(g) {
      o(), s("update:open", !1), s("select", g);
    }
    return L(() => [n.open, n.visible, n.disabled], () => {
      (!n.open || !n.visible || n.disabled) && o(), (!n.visible || n.disabled) && n.open && s("update:open", !1);
    }), T(o), (g, u) => (a(), d("div", {
      class: k(["folder-menu-sub-wrapper", { open: e.open }]),
      onMouseenter: y,
      onMouseleave: p
    }, [
      i("button", {
        id: e.buttonId,
        type: "button",
        class: "folder-menu-has-sub",
        disabled: e.disabled,
        title: e.title,
        onClick: f(M, ["stop"])
      }, [
        i("span", null, c(e.label), 1),
        u[1] || (u[1] = i("span", { class: "folder-menu-arrow" }, "›", -1))
      ], 8, W),
      i("div", {
        id: e.submenuId,
        class: k(["folder-submenu", l.value]),
        role: "menu",
        hidden: !e.open,
        onMouseenter: y,
        onMouseleave: p,
        onWheel: u[0] || (u[0] = f(() => {
        }, ["stop"]))
      }, [
        e.items.length ? V("", !0) : (a(), d("span", j, c(e.emptyText), 1)),
        (a(!0), d($, null, F(e.items, (r) => (a(), d("button", {
          key: r.id,
          class: "folder-submenu-item",
          type: "button",
          disabled: r.disabled || e.disabled,
          title: r.name,
          onClick: f((J) => I(r.id), ["stop"])
        }, [
          u[2] || (u[2] = i("span", { class: "folder-submenu-icon" }, "📁", -1)),
          i("span", A, c(r.name), 1)
        ], 8, q))), 128))
      ], 42, D)
    ], 34));
  }
}), X = /* @__PURE__ */ N(G, [["__scopeId", "data-v-2e473cc3"]]);
export {
  X as L,
  Q as _,
  R as a
};
