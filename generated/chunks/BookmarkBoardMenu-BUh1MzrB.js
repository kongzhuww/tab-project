import { d as te, O as ie, b as h, o as s, e as z, g as c, u as t, w as ae, h as y, f as u, t as b, E, F as x, i as D, C as R, j, B as le, k as ne, x as k } from "./vendor-vue-wIH4jcna.js";
import { _ as oe, a as se, L as O } from "./LauncherMoveMenu-DgZ2jSXj.js";
import { Z as X } from "./search.service-B8FaDQLd.js";
import { u as ue } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { u as M, _ as re, I as de } from "./useInlineTitleEdit-DCp7gnvs.js";
import { n as Y } from "./view-styles-BcxK8WCo.js";
import { _ as me } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const ve = { key: 1 }, ce = {
  key: 2,
  class: "bookmark-menu-error",
  role: "status"
}, ge = ["disabled"], fe = ["disabled"], be = ["disabled", "onClick"], ke = {
  key: 0,
  style: { "margin-right": "6px" }
}, ye = ["disabled"], pe = ["disabled"], Ce = ["disabled"], he = ["disabled"], xe = ["disabled", "onClick"], Se = {
  key: 0,
  style: { "margin-right": "6px" }
}, Fe = ["disabled"], we = ["disabled"], Be = {
  key: 0,
  class: "link-menu-header"
}, Te = ["disabled"], Ee = /* @__PURE__ */ te({
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
  emits: ["close", "toggleSize", "refresh", "changeIcon"],
  setup(n, { expose: Z, emit: q }) {
    const l = n, g = q, f = h(!1), p = h(!1), S = h(""), I = (a) => Y.show({ appName: "书签", title: "保存未完成", message: a }), v = ie(l.target.item), r = M({ save: (a, e) => l.saveText(a, "title", e), apply: (a, e) => {
      F.value = e, v.value = { ...a, title: e };
    }, detachedError: I }), d = M({ save: (a, e) => l.saveText(a, "url", e), apply: (a, e) => {
      w.value = e, a.kind === "link" && (v.value = { ...a, url: e });
    }, detachedError: I }), m = M({ save: (a, e) => l.createFolder(a, e), apply: () => g("close"), detachedError: I }), F = h(l.target.item?.title || "书签"), w = h(l.target.item?.kind === "link" ? l.target.item.url : ""), B = k(() => l.busy || r.busy.value || d.busy.value || m.busy.value), $ = k(() => r.editing.value || d.editing.value || m.editing.value), o = k(() => B.value || l.blocked || $.value), U = k(() => !B.value && !$.value);
    Z({ canDismiss: U });
    function G() {
      U.value && g("close");
    }
    const { menuRef: H, style: C } = ue({ visible: () => !0, anchor: () => l.target, dismiss: G }), J = k(() => ({
      ...C.value,
      overflowX: p.value ? "visible" : "hidden",
      overflowY: p.value ? "visible" : "auto"
    })), T = k(() => l.destinations.map((a) => ({ id: a.id, name: a.title, disabled: a.disabled })));
    function N() {
      o.value || !v.value || (d.reset(), f.value = !1, r.start({ ...v.value, title: F.value }, F.value));
    }
    function V() {
      o.value || v.value?.kind !== "link" || (r.reset(), f.value = !1, d.start({ ...v.value, url: w.value }, w.value));
    }
    function K() {
      o.value || m.start(l.target.item?.kind === "folder" ? l.target.item.id : l.target.parentId, "");
    }
    async function A(a) {
      if (!(!v.value || o.value))
        try {
          await l.move(v.value, a), g("close");
        } catch (e) {
          S.value = e instanceof Error ? e.message : "移动失败，请刷新核对。";
        }
    }
    async function L() {
      if (!(!v.value || o.value)) {
        if (!f.value) {
          f.value = !0;
          return;
        }
        try {
          await l.remove(v.value), g("close");
        } catch (a) {
          f.value = !1, S.value = a instanceof Error ? a.message : "删除失败，请刷新核对。";
        }
      }
    }
    function Q(a) {
      o.value || (g("toggleSize", a), g("close"));
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
        g("close");
        try {
          await a.execute(e);
        } catch (i) {
          Y.show({ appName: "插件扩展", title: "执行失败", message: i?.message || "操作未完成" });
        }
      }
    }
    return (a, e) => (s(), z(ne, { to: "body" }, [
      c("div", {
        ref_key: "menuRef",
        ref: H,
        class: "folder-menu bookmark-board-menu",
        role: "menu",
        style: le(J.value),
        onPointerdown: e[8] || (e[8] = j(() => {
        }, ["stop"])),
        onContextmenu: e[9] || (e[9] = j(() => {
        }, ["prevent", "stop"])),
        onClickCapture: e[10] || (e[10] = (i) => B.value && (i.preventDefault(), i.stopPropagation()))
      }, [
        n.target.item ? (s(), z(oe, {
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
          onStart: N,
          onCommit: t(r).commit,
          onCancel: t(r).cancel
        }, {
          default: ae(() => [
            n.target.item.kind === "link" ? (s(), z(se, {
              key: 0,
              url: w.value,
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
        S.value ? (s(), u("span", ce, b(S.value), 1)) : y("", !0),
        n.target.item?.kind === "folder" ? (s(), u(x, { key: 3 }, [
          c("button", {
            id: "folder-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: N
          }, b(n.target.section ? "重命名板块" : "重命名收藏夹"), 9, ge),
          n.target.section ? y("", !0) : (s(), u("button", {
            key: 0,
            id: "folder-menu-size",
            type: "button",
            disabled: o.value,
            onClick: e[2] || (e[2] = (i) => Q(n.target.item.id))
          }, b(n.size === "small" ? "扩大为大收藏夹" : "收缩为中收藏夹"), 9, fe)),
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
          (s(!0), u(x, null, D(W.value, (i) => (s(), u("button", {
            key: i.id,
            type: "button",
            disabled: o.value || i.disabled?.({ id: n.target.item.id, title: n.target.item.title, kind: "folder" }),
            onClick: (ee) => P(i, { id: n.target.item.id, title: n.target.item.title, kind: "folder" })
          }, [
            i.icon ? (s(), u("span", ke, b(i.icon), 1)) : y("", !0),
            c("span", null, b(i.label), 1)
          ], 8, be))), 128)),
          c("button", {
            id: "folder-menu-delete",
            type: "button",
            class: R(["danger", { "is-confirming": f.value }]),
            disabled: o.value,
            onClick: L
          }, b(f.value ? `确认删除整个文件夹及 ${n.target.item.count} 个书签？` : n.target.section ? "删除板块" : "删除文件夹"), 11, ye)
        ], 64)) : n.target.item?.kind === "link" ? (s(), u(x, { key: 4 }, [
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
          c("button", {
            id: "link-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: N
          }, "重命名", 8, pe),
          c("button", {
            id: "link-menu-edit",
            type: "button",
            disabled: o.value,
            onClick: V
          }, "编辑", 8, Ce),
          c("button", {
            id: "link-menu-change-icon",
            type: "button",
            disabled: o.value,
            onClick: e[5] || (e[5] = (i) => v.value && g("changeIcon", v.value))
          }, "获取头像", 8, he),
          (s(!0), u(x, null, D(_.value, (i) => (s(), u("button", {
            key: i.id,
            type: "button",
            disabled: o.value || i.disabled?.({ id: n.target.item.id, title: n.target.item.title, url: n.target.item.url, kind: "link" }),
            onClick: (ee) => P(i, { id: n.target.item.id, title: n.target.item.title, url: n.target.item.url, kind: "link" })
          }, [
            i.icon ? (s(), u("span", Se, b(i.icon), 1)) : y("", !0),
            c("span", null, b(i.label), 1)
          ], 8, xe))), 128)),
          c("button", {
            id: "link-menu-delete",
            type: "button",
            class: R(["danger", { "is-confirming": f.value }]),
            disabled: o.value,
            onClick: L
          }, b(f.value ? "确定删除此书签？" : "删除网站"), 11, Fe)
        ], 64)) : (s(), u(x, { key: 5 }, [
          c("button", {
            type: "button",
            disabled: o.value,
            onClick: K
          }, "创建中文件夹", 8, we),
          t(m).editing.value ? (s(), u("div", Be, [
            E(t(re), {
              modelValue: t(m).draft.value,
              "onUpdate:modelValue": e[6] || (e[6] = (i) => t(m).draft.value = i),
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
          disabled: B.value,
          onClick: e[7] || (e[7] = (i) => g("refresh"))
        }, "刷新核对后恢复操作", 8, Te)) : y("", !0)
      ], 36)
    ]));
  }
}), Ae = /* @__PURE__ */ me(Ee, [["__scopeId", "data-v-0e89197c"]]);
export {
  Ae as default
};
