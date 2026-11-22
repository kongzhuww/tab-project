import { d as ue, K as re, b as x, f as r, l as E, h as g, u as l, A as se, j as p, g as s, t as b, B as F, F as U, i as K, q as O, k as X, n as de, T as ve, s as k } from "./vendor-vue-_upDT3S_.js";
import { _ as me, a as ce, L as I } from "./LauncherMoveMenu-DV-Ki-hG.js";
import { l as h, M as Y } from "./search.service-I5ZPPxGy.js";
import { u as ge } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { u as L, _ as fe, I as be } from "./useInlineTitleEdit-DBnOO5b5.js";
import { n as M } from "./store-BodPoZPS.js";
import { w as ke } from "./web-task-store-XxOqv0xY.js";
import { w as ye } from "./main-JHkPnzTg.js";
import { _ as pe } from "./_plugin-vue_export-helper-DtNgUcga.js";
const he = { key: 1 }, Ce = {
  key: 2,
  class: "bookmark-menu-error",
  role: "status"
}, xe = ["disabled"], we = ["disabled"], Se = ["disabled", "onClick"], Te = {
  key: 0,
  style: { "margin-right": "6px" }
}, Fe = ["disabled"], Ue = ["disabled"], Ne = ["disabled"], $e = ["disabled"], Be = ["disabled"], Pe = ["disabled", "onClick"], ze = {
  key: 0,
  style: { "margin-right": "6px" }
}, Ee = ["disabled"], Ie = ["disabled"], Le = {
  key: 0,
  class: "link-menu-header"
}, Me = ["disabled"], Ae = /* @__PURE__ */ ue({
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
  setup(u, { expose: G, emit: J }) {
    const n = u, c = J, f = x(!1), C = x(!1), N = x(!1), w = x(""), P = (t) => M.show({ appName: "书签", title: "保存未完成", message: t }), i = re(n.target.item), d = L({ save: (t, e) => n.saveText(t, "title", e), apply: (t, e) => {
      S.value = e, i.value = { ...t, title: e };
    }, detachedError: P }), v = L({ save: (t, e) => n.saveText(t, "url", e), apply: (t, e) => {
      T.value = e, t.kind === "link" && (i.value = { ...t, url: e });
    }, detachedError: P }), m = L({ save: (t, e) => n.createFolder(t, e), apply: () => c("close"), detachedError: P }), S = x(n.target.item?.title || "书签"), T = x(n.target.item?.kind === "link" ? n.target.item.url : ""), $ = k(() => n.busy || d.busy.value || v.busy.value || m.busy.value), A = k(() => d.editing.value || v.editing.value || m.editing.value), o = k(() => $.value || n.blocked || A.value), R = k(() => !$.value && !A.value);
    G({ canDismiss: R });
    function Q() {
      R.value && c("close");
    }
    const { menuRef: W, style: y } = ge({ visible: () => !0, anchor: () => n.target, dismiss: Q }), Z = k(() => ({
      ...y.value,
      overflowX: C.value || N.value ? "visible" : "hidden",
      overflowY: C.value || N.value ? "visible" : "auto"
    })), B = k(() => n.destinations.map((t) => ({ id: t.id, name: t.title, disabled: t.disabled }))), V = k(() => h.getPageNames().map((t) => ({
      id: t,
      name: h.getPageLabel(t)
    })));
    async function _(t) {
      if (!(!i.value || i.value.kind !== "link" || o.value))
        try {
          const e = new URL(h.normalizeUrl(i.value.url));
          if (e.protocol !== "http:" && e.protocol !== "https:")
            throw new Error("仅支持 HTTP/HTTPS 网站");
          await h.ready, await h.addLink({
            title: i.value.title || h.hostOf(e.href),
            url: e.href,
            group: "常用网站",
            page: t
          }), M.show({
            appName: "常用网站",
            title: "收藏成功",
            message: `已将「${i.value.title || i.value.url}」收藏到【${h.getPageLabel(t)}】分区`
          }), c("close");
        } catch (e) {
          w.value = e?.message || "收藏失败，请重试";
        }
    }
    function ee() {
      if (!i.value || i.value.kind !== "link" || o.value) return;
      const t = globalThis.chrome, e = i.value.url && t?.runtime?.id ? `chrome-extension://${t.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(i.value.url)}&size=32` : void 0;
      ke.open({
        id: i.value.id,
        title: i.value.title || i.value.url,
        url: i.value.url,
        icon: e,
        source: "bookmark"
      }), c("close");
    }
    function te() {
      if (!i.value || i.value.kind !== "link" || o.value) return;
      const t = globalThis.chrome, e = i.value.url && t?.runtime?.id ? `chrome-extension://${t.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(i.value.url)}&size=32` : void 0;
      ye.open({
        id: i.value.id,
        title: S.value || i.value.url,
        url: T.value || i.value.url,
        icon: e,
        category: "书签",
        source: "bookmark"
      }), c("close");
    }
    function z() {
      o.value || !i.value || (v.reset(), f.value = !1, d.start({ ...i.value, title: S.value }, S.value));
    }
    function D() {
      o.value || i.value?.kind !== "link" || (d.reset(), f.value = !1, v.start({ ...i.value, url: T.value }, T.value));
    }
    function le() {
      o.value || m.start(n.target.item?.kind === "folder" ? n.target.item.id : n.target.parentId, "");
    }
    async function H(t) {
      if (!(!i.value || o.value))
        try {
          await n.move(i.value, t), c("close");
        } catch (e) {
          w.value = e instanceof Error ? e.message : "移动失败，请刷新核对。";
        }
    }
    async function j() {
      if (!(!i.value || o.value)) {
        if (!f.value) {
          f.value = !0;
          return;
        }
        try {
          await n.remove(i.value), c("close");
        } catch (t) {
          f.value = !1, w.value = t instanceof Error ? t.message : "删除失败，请刷新核对。";
        }
      }
    }
    function ae(t) {
      o.value || (c("toggleSize", t), c("close"));
    }
    const ie = k(() => !n.target.item || n.target.item.kind !== "folder" ? [] : Y.getMenuActionsForTarget({
      id: n.target.item.id,
      title: n.target.item.title,
      kind: "folder",
      source: "bookmarks"
    })), ne = k(() => !n.target.item || n.target.item.kind !== "link" ? [] : Y.getMenuActionsForTarget({
      id: n.target.item.id,
      title: n.target.item.title,
      url: n.target.item.url,
      kind: "link",
      source: "bookmarks"
    }));
    async function q(t, e) {
      if (!o.value) {
        c("close");
        try {
          await t.execute(e);
        } catch (a) {
          M.show({ appName: "插件扩展", title: "执行失败", message: a?.message || "操作未完成" });
        }
      }
    }
    return (t, e) => (r(), E(ve, { to: "body" }, [
      g("div", {
        ref_key: "menuRef",
        ref: W,
        class: "folder-menu bookmark-board-menu",
        role: "menu",
        style: de(Z.value),
        onPointerdown: e[8] || (e[8] = X(() => {
        }, ["stop"])),
        onContextmenu: e[9] || (e[9] = X(() => {
        }, ["prevent", "stop"])),
        onClickCapture: e[10] || (e[10] = (a) => $.value && (a.preventDefault(), a.stopPropagation()))
      }, [
        u.target.item ? (r(), E(me, {
          key: 0,
          title: S.value,
          editing: l(d).editing.value,
          draft: l(d).draft.value,
          "onUpdate:draft": e[1] || (e[1] = (a) => l(d).draft.value = a),
          busy: l(d).busy.value,
          revision: l(d).revision.value,
          failed: l(d).failed.value,
          message: l(d).message.value,
          maxlength: 100,
          onStart: z,
          onCommit: l(d).commit,
          onCancel: l(d).cancel
        }, {
          default: se(() => [
            u.target.item.kind === "link" ? (r(), E(ce, {
              key: 0,
              url: T.value,
              editing: l(v).editing.value,
              draft: l(v).draft.value,
              "onUpdate:draft": e[0] || (e[0] = (a) => l(v).draft.value = a),
              busy: l(v).busy.value,
              revision: l(v).revision.value,
              failed: l(v).failed.value,
              message: l(v).message.value,
              onStart: D,
              onCommit: l(v).commit,
              onCancel: l(v).cancel
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : p("", !0)
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : (r(), s("p", he, "书签操作")),
        w.value ? (r(), s("span", Ce, b(w.value), 1)) : p("", !0),
        u.target.item?.kind === "folder" ? (r(), s(U, { key: 3 }, [
          g("button", {
            id: "folder-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: z
          }, b(u.target.section ? "重命名板块" : "重命名收藏夹"), 9, xe),
          u.target.section ? p("", !0) : (r(), s("button", {
            key: 0,
            id: "folder-menu-size",
            type: "button",
            disabled: o.value,
            onClick: e[2] || (e[2] = (a) => ae(u.target.item.id))
          }, b(u.size === "small" ? "扩大为大收藏夹" : "收缩为中收藏夹"), 9, we)),
          F(I, {
            open: C.value,
            "onUpdate:open": e[3] || (e[3] = (a) => C.value = a),
            visible: !0,
            disabled: o.value || !B.value.length,
            label: "移动到其他分区",
            items: B.value,
            x: Number.parseFloat(String(l(y).left || 0)),
            y: Number.parseFloat(String(l(y).top || 0)),
            "vertical-budget": 240,
            "empty-text": "暂无其他分区",
            onSelect: H
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          (r(!0), s(U, null, K(ie.value, (a) => (r(), s("button", {
            key: a.id,
            type: "button",
            disabled: o.value || a.disabled?.({ id: u.target.item.id, title: u.target.item.title, kind: "folder" }),
            onClick: (oe) => q(a, { id: u.target.item.id, title: u.target.item.title, kind: "folder" })
          }, [
            a.icon ? (r(), s("span", Te, b(a.icon), 1)) : p("", !0),
            g("span", null, b(a.label), 1)
          ], 8, Se))), 128)),
          g("button", {
            id: "folder-menu-delete",
            type: "button",
            class: O(["danger", { "is-confirming": f.value }]),
            disabled: o.value,
            onClick: j
          }, b(f.value ? `确认删除整个文件夹及 ${u.target.item.count} 个书签？` : u.target.section ? "删除板块" : "删除文件夹"), 11, Fe)
        ], 64)) : u.target.item?.kind === "link" ? (r(), s(U, { key: 4 }, [
          F(I, {
            open: N.value,
            "onUpdate:open": e[4] || (e[4] = (a) => N.value = a),
            visible: !0,
            disabled: o.value || !V.value.length,
            label: "收藏到常用网站",
            items: V.value,
            x: Number.parseFloat(String(l(y).left || 0)),
            y: Number.parseFloat(String(l(y).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无常用网站分区",
            onSelect: _
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          F(I, {
            open: C.value,
            "onUpdate:open": e[5] || (e[5] = (a) => C.value = a),
            visible: !0,
            disabled: o.value || !B.value.length,
            label: "移动到分区",
            items: B.value,
            x: Number.parseFloat(String(l(y).left || 0)),
            y: Number.parseFloat(String(l(y).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无其他可移动分区",
            onSelect: H
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          g("button", {
            id: "link-menu-preview",
            type: "button",
            disabled: o.value,
            onClick: te
          }, "预览", 8, Ue),
          g("button", {
            id: "link-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: z
          }, "重命名", 8, Ne),
          g("button", {
            id: "link-menu-create-task",
            type: "button",
            disabled: o.value,
            onClick: ee
          }, "创建任务", 8, $e),
          g("button", {
            id: "link-menu-edit",
            type: "button",
            disabled: o.value,
            onClick: D
          }, "编辑", 8, Be),
          (r(!0), s(U, null, K(ne.value, (a) => (r(), s("button", {
            key: a.id,
            type: "button",
            disabled: o.value || a.disabled?.({ id: u.target.item.id, title: u.target.item.title, url: u.target.item.url, kind: "link" }),
            onClick: (oe) => q(a, { id: u.target.item.id, title: u.target.item.title, url: u.target.item.url, kind: "link" })
          }, [
            a.icon ? (r(), s("span", ze, b(a.icon), 1)) : p("", !0),
            g("span", null, b(a.label), 1)
          ], 8, Pe))), 128)),
          g("button", {
            id: "link-menu-delete",
            type: "button",
            class: O(["danger", { "is-confirming": f.value }]),
            disabled: o.value,
            onClick: j
          }, b(f.value ? "确定删除此书签？" : "删除网站"), 11, Ee)
        ], 64)) : (r(), s(U, { key: 5 }, [
          g("button", {
            type: "button",
            disabled: o.value,
            onClick: le
          }, "创建中文件夹", 8, Ie),
          l(m).editing.value ? (r(), s("div", Le, [
            F(l(fe), {
              modelValue: l(m).draft.value,
              "onUpdate:modelValue": e[6] || (e[6] = (a) => l(m).draft.value = a),
              busy: l(m).busy.value,
              revision: l(m).revision.value,
              "aria-invalid": l(m).failed.value || void 0,
              class: "link-menu-title-input",
              maxlength: "100",
              placeholder: "输入文件夹名称",
              onCommit: l(m).commit,
              onCancel: l(m).cancel
            }, null, 8, ["modelValue", "busy", "revision", "aria-invalid", "onCommit", "onCancel"]),
            F(l(be), {
              message: l(m).message.value,
              failed: l(m).failed.value
            }, null, 8, ["message", "failed"])
          ])) : p("", !0)
        ], 64)),
        u.blocked ? (r(), s("button", {
          key: 6,
          type: "button",
          disabled: $.value,
          onClick: e[7] || (e[7] = (a) => c("refresh"))
        }, "刷新核对后恢复操作", 8, Me)) : p("", !0)
      ], 36)
    ]));
  }
}), Ye = /* @__PURE__ */ pe(Ae, [["__scopeId", "data-v-5e5d7250"]]);
export {
  Ye as default
};
