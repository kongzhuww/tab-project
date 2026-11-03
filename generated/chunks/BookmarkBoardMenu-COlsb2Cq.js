import { d as te, O as ie, b as x, o as s, e as I, h as g, u as t, f as ae, i as y, g as u, t as f, E, F as h, j as D, C as R, k as j, B as le, l as ne, y as k } from "./vendor-vue-dDCd4-uG.js";
import { _ as oe, a as se, L as O } from "./LauncherMoveMenu-w24-JE_G.js";
import { Z as X } from "./search.service-Ybzy778d.js";
import { u as ue } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DMGLRgln.js";
import { u as M, _ as re, I as de } from "./useInlineTitleEdit-n_9v15NY.js";
import { n as Y } from "./view-styles-DotZEB6b.js";
import { _ as me } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
const ve = { key: 1 }, ce = {
  key: 2,
  class: "bookmark-menu-error",
  role: "status"
}, ge = ["disabled"], fe = ["disabled"], be = ["disabled", "onClick"], ke = {
  key: 0,
  style: { "margin-right": "6px" }
}, ye = ["disabled"], pe = ["disabled"], Ce = ["disabled"], xe = ["disabled", "onClick"], he = {
  key: 0,
  style: { "margin-right": "6px" }
}, Se = ["disabled"], Fe = ["disabled"], Be = {
  key: 0,
  class: "link-menu-header"
}, we = ["disabled"], Te = /* @__PURE__ */ te({
  __name: "BookmarkBoardMenu",
  props: {
    target: {},
    busy: { type: Boolean },
    blocked: { type: Boolean },
    size: {},
    outerParentId: {},
    destinations: {},
    saveText: { type: Function },
    createFolder: { type: Function },
    remove: { type: Function },
    move: { type: Function }
  },
  emits: ["close", "toggleSize", "refresh"],
  setup(n, { expose: Z, emit: q }) {
    const l = n, b = q, c = x(!1), p = x(!1), S = x(""), N = (a) => Y.show({ appName: "书签", title: "保存未完成", message: a }), v = ie(l.target.item), r = M({ save: (a, e) => l.saveText(a, "title", e), apply: (a, e) => {
      F.value = e, v.value = { ...a, title: e };
    }, detachedError: N }), d = M({ save: (a, e) => l.saveText(a, "url", e), apply: (a, e) => {
      B.value = e, a.kind === "link" && (v.value = { ...a, url: e });
    }, detachedError: N }), m = M({ save: (a, e) => l.createFolder(a, e), apply: () => b("close"), detachedError: N }), F = x(l.target.item?.title || "书签"), B = x(l.target.item?.kind === "link" ? l.target.item.url : ""), w = k(() => l.busy || r.busy.value || d.busy.value || m.busy.value), U = k(() => r.editing.value || d.editing.value || m.editing.value), o = k(() => w.value || l.blocked || U.value), $ = k(() => !w.value && !U.value);
    Z({ canDismiss: $ });
    function G() {
      $.value && b("close");
    }
    const { menuRef: H, style: C } = ue({ visible: () => !0, anchor: () => l.target, dismiss: G }), J = k(() => ({
      ...C.value,
      overflowX: p.value ? "visible" : "hidden",
      overflowY: p.value ? "visible" : "auto"
    })), T = k(() => l.destinations.map((a) => ({ id: a.id, name: a.title, disabled: a.disabled })));
    function z() {
      o.value || !v.value || (d.reset(), c.value = !1, r.start({ ...v.value, title: F.value }, F.value));
    }
    function V() {
      o.value || v.value?.kind !== "link" || (r.reset(), c.value = !1, d.start({ ...v.value, url: B.value }, B.value));
    }
    function K() {
      o.value || m.start(l.target.item?.kind === "folder" ? l.target.item.id : l.target.parentId, "");
    }
    async function A(a) {
      if (!(!v.value || o.value))
        try {
          await l.move(v.value, a), b("close");
        } catch (e) {
          S.value = e instanceof Error ? e.message : "移动失败，请刷新核对。";
        }
    }
    async function L() {
      if (!(!v.value || o.value)) {
        if (!c.value) {
          c.value = !0;
          return;
        }
        try {
          await l.remove(v.value), b("close");
        } catch (a) {
          c.value = !1, S.value = a instanceof Error ? a.message : "删除失败，请刷新核对。";
        }
      }
    }
    function Q(a) {
      o.value || (b("toggleSize", a), b("close"));
    }
    const W = k(() => !l.target.item || l.target.item.kind !== "folder" ? [] : X.getMenuActionsForTarget({
      id: l.target.item.id,
      title: l.target.item.title,
      kind: "folder",
      source: "bookmarks"
    })), _ = k(() => !l.target.item || l.target.item.kind !== "link" ? [] : X.getMenuActionsForTarget({
      id: l.target.item.id,
      title: l.target.item.title,
      url: l.target.item.url,
      kind: "link",
      source: "bookmarks"
    }));
    async function P(a, e) {
      if (!o.value) {
        b("close");
        try {
          await a.execute(e);
        } catch (i) {
          Y.show({ appName: "插件扩展", title: "执行失败", message: i?.message || "操作未完成" });
        }
      }
    }
    return (a, e) => (s(), I(ne, { to: "body" }, [
      g("div", {
        ref_key: "menuRef",
        ref: H,
        class: "folder-menu bookmark-board-menu",
        role: "menu",
        style: le(J.value),
        onPointerdown: e[7] || (e[7] = j(() => {
        }, ["stop"])),
        onContextmenu: e[8] || (e[8] = j(() => {
        }, ["prevent", "stop"])),
        onClickCapture: e[9] || (e[9] = (i) => w.value && (i.preventDefault(), i.stopPropagation()))
      }, [
        n.target.item ? (s(), I(oe, {
          key: 0,
          title: F.value,
          editing: t(r).editing.value,
          draft: t(r).draft.value,
          "onUpdate:draft": e[1] || (e[1] = (i) => t(r).draft.value = i),
          busy: t(r).busy.value,
          revision: t(r).revision.value,
          failed: t(r).failed.value,
          message: t(r).message.value,
          maxlength: 100,
          onStart: z,
          onCommit: t(r).commit,
          onCancel: t(r).cancel
        }, {
          default: ae(() => [
            n.target.item.kind === "link" ? (s(), I(se, {
              key: 0,
              url: B.value,
              editing: t(d).editing.value,
              draft: t(d).draft.value,
              "onUpdate:draft": e[0] || (e[0] = (i) => t(d).draft.value = i),
              busy: t(d).busy.value,
              revision: t(d).revision.value,
              failed: t(d).failed.value,
              message: t(d).message.value,
              onStart: V,
              onCommit: t(d).commit,
              onCancel: t(d).cancel
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : y("", !0)
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : (s(), u("p", ve, "书签操作")),
        S.value ? (s(), u("span", ce, f(S.value), 1)) : y("", !0),
        n.target.item?.kind === "folder" ? (s(), u(h, { key: 3 }, [
          g("button", {
            id: "folder-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: z
          }, f(n.target.section ? "重命名板块" : "重命名收藏夹"), 9, ge),
          n.target.section ? y("", !0) : (s(), u("button", {
            key: 0,
            id: "folder-menu-size",
            type: "button",
            disabled: o.value,
            onClick: e[2] || (e[2] = (i) => Q(n.target.item.id))
          }, f(n.size === "small" ? "扩大为大收藏夹" : "收缩为中收藏夹"), 9, fe)),
          E(O, {
            open: p.value,
            "onUpdate:open": e[3] || (e[3] = (i) => p.value = i),
            visible: !0,
            disabled: o.value || !T.value.length,
            label: "移动到其他分区",
            items: T.value,
            x: Number.parseFloat(String(t(C).left || 0)),
            y: Number.parseFloat(String(t(C).top || 0)),
            "vertical-budget": 240,
            "empty-text": "暂无其他分区",
            onSelect: A
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          (s(!0), u(h, null, D(W.value, (i) => (s(), u("button", {
            key: i.id,
            type: "button",
            disabled: o.value || i.disabled?.({ id: n.target.item.id, title: n.target.item.title, kind: "folder" }),
            onClick: (ee) => P(i, { id: n.target.item.id, title: n.target.item.title, kind: "folder" })
          }, [
            i.icon ? (s(), u("span", ke, f(i.icon), 1)) : y("", !0),
            g("span", null, f(i.label), 1)
          ], 8, be))), 128)),
          g("button", {
            id: "folder-menu-delete",
            type: "button",
            class: R(["danger", { "is-confirming": c.value }]),
            disabled: o.value,
            onClick: L
          }, f(c.value ? `确认删除整个文件夹及 ${n.target.item.count} 个书签？` : n.target.section ? "删除板块" : "删除文件夹"), 11, ye)
        ], 64)) : n.target.item?.kind === "link" ? (s(), u(h, { key: 4 }, [
          E(O, {
            open: p.value,
            "onUpdate:open": e[4] || (e[4] = (i) => p.value = i),
            visible: !0,
            disabled: o.value || !T.value.length,
            label: "移动到分区",
            items: T.value,
            x: Number.parseFloat(String(t(C).left || 0)),
            y: Number.parseFloat(String(t(C).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无其他可移动分区",
            onSelect: A
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          g("button", {
            id: "link-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: z
          }, "重命名", 8, pe),
          g("button", {
            id: "link-menu-edit",
            type: "button",
            disabled: o.value,
            onClick: V
          }, "编辑", 8, Ce),
          (s(!0), u(h, null, D(_.value, (i) => (s(), u("button", {
            key: i.id,
            type: "button",
            disabled: o.value || i.disabled?.({ id: n.target.item.id, title: n.target.item.title, url: n.target.item.url, kind: "link" }),
            onClick: (ee) => P(i, { id: n.target.item.id, title: n.target.item.title, url: n.target.item.url, kind: "link" })
          }, [
            i.icon ? (s(), u("span", he, f(i.icon), 1)) : y("", !0),
            g("span", null, f(i.label), 1)
          ], 8, xe))), 128)),
          g("button", {
            id: "link-menu-delete",
            type: "button",
            class: R(["danger", { "is-confirming": c.value }]),
            disabled: o.value,
            onClick: L
          }, f(c.value ? "确定删除此书签？" : "删除网站"), 11, Se)
        ], 64)) : (s(), u(h, { key: 5 }, [
          g("button", {
            type: "button",
            disabled: o.value,
            onClick: K
          }, "创建中文件夹", 8, Fe),
          t(m).editing.value ? (s(), u("div", Be, [
            E(t(re), {
              modelValue: t(m).draft.value,
              "onUpdate:modelValue": e[5] || (e[5] = (i) => t(m).draft.value = i),
              busy: t(m).busy.value,
              revision: t(m).revision.value,
              "aria-invalid": t(m).failed.value || void 0,
              class: "link-menu-title-input",
              maxlength: "100",
              placeholder: "输入文件夹名称",
              onCommit: t(m).commit,
              onCancel: t(m).cancel
            }, null, 8, ["modelValue", "busy", "revision", "aria-invalid", "onCommit", "onCancel"]),
            E(t(de), {
              message: t(m).message.value,
              failed: t(m).failed.value
            }, null, 8, ["message", "failed"])
          ])) : y("", !0)
        ], 64)),
        n.blocked ? (s(), u("button", {
          key: 6,
          type: "button",
          disabled: w.value,
          onClick: e[6] || (e[6] = (i) => b("refresh"))
        }, "刷新核对后恢复操作", 8, we)) : y("", !0)
      ], 36)
    ]));
  }
}), Ve = /* @__PURE__ */ me(Te, [["__scopeId", "data-v-155dd1f0"]]);
export {
  Ve as default
};
