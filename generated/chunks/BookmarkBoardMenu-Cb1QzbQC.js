import { d as ne, N as oe, b as x, o as r, e as L, h as f, u as t, f as re, i as p, g as s, t as b, s as F, F as w, j as X, C as Y, k as Z, B as ue, l as se, y as k } from "./vendor-vue-FFI3kJnP.js";
import { _ as de, a as me, L as $ } from "./LauncherMoveMenu-BXiRmAjd.js";
import { a as C, Z as q } from "./search.service-DacqWPJU.js";
import { u as ve } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DRvNM_7u.js";
import { u as I, _ as ce, I as ge } from "./useInlineTitleEdit-BydmJujj.js";
import { n as M } from "./view-styles-DJ-jYhvJ.js";
import { _ as fe } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const be = { key: 1 }, ke = {
  key: 2,
  class: "bookmark-menu-error",
  role: "status"
}, ye = ["disabled"], pe = ["disabled"], Ce = ["disabled", "onClick"], he = {
  key: 0,
  style: { "margin-right": "6px" }
}, xe = ["disabled"], Se = ["disabled"], Fe = ["disabled"], we = ["disabled", "onClick"], Te = {
  key: 0,
  style: { "margin-right": "6px" }
}, Ne = ["disabled"], Be = ["disabled"], Ee = {
  key: 0,
  class: "link-menu-header"
}, Pe = ["disabled"], Ue = /* @__PURE__ */ ne({
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
  setup(n, { expose: G, emit: J }) {
    const i = n, c = J, g = x(!1), h = x(!1), T = x(!1), S = x(""), U = (a) => M.show({ appName: "书签", title: "保存未完成", message: a }), u = oe(i.target.item), d = I({ save: (a, e) => i.saveText(a, "title", e), apply: (a, e) => {
      N.value = e, u.value = { ...a, title: e };
    }, detachedError: U }), m = I({ save: (a, e) => i.saveText(a, "url", e), apply: (a, e) => {
      B.value = e, a.kind === "link" && (u.value = { ...a, url: e });
    }, detachedError: U }), v = I({ save: (a, e) => i.createFolder(a, e), apply: () => c("close"), detachedError: U }), N = x(i.target.item?.title || "书签"), B = x(i.target.item?.kind === "link" ? i.target.item.url : ""), E = k(() => i.busy || d.busy.value || m.busy.value || v.busy.value), V = k(() => d.editing.value || m.editing.value || v.editing.value), o = k(() => E.value || i.blocked || V.value), A = k(() => !E.value && !V.value);
    G({ canDismiss: A });
    function K() {
      A.value && c("close");
    }
    const { menuRef: Q, style: y } = ve({ visible: () => !0, anchor: () => i.target, dismiss: K }), W = k(() => ({
      ...y.value,
      overflowX: h.value || T.value ? "visible" : "hidden",
      overflowY: h.value || T.value ? "visible" : "auto"
    })), P = k(() => i.destinations.map((a) => ({ id: a.id, name: a.title, disabled: a.disabled }))), R = k(() => C.getPageNames().map((a) => ({
      id: a,
      name: C.getPageLabel(a)
    })));
    async function _(a) {
      if (!(!u.value || u.value.kind !== "link" || o.value))
        try {
          const e = new URL(C.normalizeUrl(u.value.url));
          if (e.protocol !== "http:" && e.protocol !== "https:")
            throw new Error("仅支持 HTTP/HTTPS 网站");
          await C.ready, await C.addLink({
            title: u.value.title || C.hostOf(e.href),
            url: e.href,
            group: "常用网站",
            page: a
          }), M.show({
            appName: "常用网站",
            title: "收藏成功",
            message: `已将「${u.value.title || u.value.url}」收藏到【${C.getPageLabel(a)}】分区`
          }), c("close");
        } catch (e) {
          S.value = e?.message || "收藏失败，请重试";
        }
    }
    function z() {
      o.value || !u.value || (m.reset(), g.value = !1, d.start({ ...u.value, title: N.value }, N.value));
    }
    function D() {
      o.value || u.value?.kind !== "link" || (d.reset(), g.value = !1, m.start({ ...u.value, url: B.value }, B.value));
    }
    function ee() {
      o.value || v.start(i.target.item?.kind === "folder" ? i.target.item.id : i.target.parentId, "");
    }
    async function H(a) {
      if (!(!u.value || o.value))
        try {
          await i.move(u.value, a), c("close");
        } catch (e) {
          S.value = e instanceof Error ? e.message : "移动失败，请刷新核对。";
        }
    }
    async function j() {
      if (!(!u.value || o.value)) {
        if (!g.value) {
          g.value = !0;
          return;
        }
        try {
          await i.remove(u.value), c("close");
        } catch (a) {
          g.value = !1, S.value = a instanceof Error ? a.message : "删除失败，请刷新核对。";
        }
      }
    }
    function te(a) {
      o.value || (c("toggleSize", a), c("close"));
    }
    const ae = k(() => !i.target.item || i.target.item.kind !== "folder" ? [] : q.getMenuActionsForTarget({
      id: i.target.item.id,
      title: i.target.item.title,
      kind: "folder",
      source: "bookmarks"
    })), le = k(() => !i.target.item || i.target.item.kind !== "link" ? [] : q.getMenuActionsForTarget({
      id: i.target.item.id,
      title: i.target.item.title,
      url: i.target.item.url,
      kind: "link",
      source: "bookmarks"
    }));
    async function O(a, e) {
      if (!o.value) {
        c("close");
        try {
          await a.execute(e);
        } catch (l) {
          M.show({ appName: "插件扩展", title: "执行失败", message: l?.message || "操作未完成" });
        }
      }
    }
    return (a, e) => (r(), L(se, { to: "body" }, [
      f("div", {
        ref_key: "menuRef",
        ref: Q,
        class: "folder-menu bookmark-board-menu",
        role: "menu",
        style: ue(W.value),
        onPointerdown: e[8] || (e[8] = Z(() => {
        }, ["stop"])),
        onContextmenu: e[9] || (e[9] = Z(() => {
        }, ["prevent", "stop"])),
        onClickCapture: e[10] || (e[10] = (l) => E.value && (l.preventDefault(), l.stopPropagation()))
      }, [
        n.target.item ? (r(), L(de, {
          key: 0,
          title: N.value,
          editing: t(d).editing.value,
          draft: t(d).draft.value,
          "onUpdate:draft": e[1] || (e[1] = (l) => t(d).draft.value = l),
          busy: t(d).busy.value,
          revision: t(d).revision.value,
          failed: t(d).failed.value,
          message: t(d).message.value,
          maxlength: 100,
          onStart: z,
          onCommit: t(d).commit,
          onCancel: t(d).cancel
        }, {
          default: re(() => [
            n.target.item.kind === "link" ? (r(), L(me, {
              key: 0,
              url: B.value,
              editing: t(m).editing.value,
              draft: t(m).draft.value,
              "onUpdate:draft": e[0] || (e[0] = (l) => t(m).draft.value = l),
              busy: t(m).busy.value,
              revision: t(m).revision.value,
              failed: t(m).failed.value,
              message: t(m).message.value,
              onStart: D,
              onCommit: t(m).commit,
              onCancel: t(m).cancel
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : p("", !0)
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : (r(), s("p", be, "书签操作")),
        S.value ? (r(), s("span", ke, b(S.value), 1)) : p("", !0),
        n.target.item?.kind === "folder" ? (r(), s(w, { key: 3 }, [
          f("button", {
            id: "folder-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: z
          }, b(n.target.section ? "重命名板块" : "重命名收藏夹"), 9, ye),
          n.target.section ? p("", !0) : (r(), s("button", {
            key: 0,
            id: "folder-menu-size",
            type: "button",
            disabled: o.value,
            onClick: e[2] || (e[2] = (l) => te(n.target.item.id))
          }, b(n.size === "small" ? "扩大为大收藏夹" : "收缩为中收藏夹"), 9, pe)),
          F($, {
            open: h.value,
            "onUpdate:open": e[3] || (e[3] = (l) => h.value = l),
            visible: !0,
            disabled: o.value || !P.value.length,
            label: "移动到其他分区",
            items: P.value,
            x: Number.parseFloat(String(t(y).left || 0)),
            y: Number.parseFloat(String(t(y).top || 0)),
            "vertical-budget": 240,
            "empty-text": "暂无其他分区",
            onSelect: H
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          (r(!0), s(w, null, X(ae.value, (l) => (r(), s("button", {
            key: l.id,
            type: "button",
            disabled: o.value || l.disabled?.({ id: n.target.item.id, title: n.target.item.title, kind: "folder" }),
            onClick: (ie) => O(l, { id: n.target.item.id, title: n.target.item.title, kind: "folder" })
          }, [
            l.icon ? (r(), s("span", he, b(l.icon), 1)) : p("", !0),
            f("span", null, b(l.label), 1)
          ], 8, Ce))), 128)),
          f("button", {
            id: "folder-menu-delete",
            type: "button",
            class: Y(["danger", { "is-confirming": g.value }]),
            disabled: o.value,
            onClick: j
          }, b(g.value ? `确认删除整个文件夹及 ${n.target.item.count} 个书签？` : n.target.section ? "删除板块" : "删除文件夹"), 11, xe)
        ], 64)) : n.target.item?.kind === "link" ? (r(), s(w, { key: 4 }, [
          F($, {
            open: T.value,
            "onUpdate:open": e[4] || (e[4] = (l) => T.value = l),
            visible: !0,
            disabled: o.value || !R.value.length,
            label: "收藏到常用网站",
            items: R.value,
            x: Number.parseFloat(String(t(y).left || 0)),
            y: Number.parseFloat(String(t(y).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无常用网站分区",
            onSelect: _
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          F($, {
            open: h.value,
            "onUpdate:open": e[5] || (e[5] = (l) => h.value = l),
            visible: !0,
            disabled: o.value || !P.value.length,
            label: "移动到分区",
            items: P.value,
            x: Number.parseFloat(String(t(y).left || 0)),
            y: Number.parseFloat(String(t(y).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无其他可移动分区",
            onSelect: H
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          f("button", {
            id: "link-menu-rename",
            type: "button",
            disabled: o.value,
            onClick: z
          }, "重命名", 8, Se),
          f("button", {
            id: "link-menu-edit",
            type: "button",
            disabled: o.value,
            onClick: D
          }, "编辑", 8, Fe),
          (r(!0), s(w, null, X(le.value, (l) => (r(), s("button", {
            key: l.id,
            type: "button",
            disabled: o.value || l.disabled?.({ id: n.target.item.id, title: n.target.item.title, url: n.target.item.url, kind: "link" }),
            onClick: (ie) => O(l, { id: n.target.item.id, title: n.target.item.title, url: n.target.item.url, kind: "link" })
          }, [
            l.icon ? (r(), s("span", Te, b(l.icon), 1)) : p("", !0),
            f("span", null, b(l.label), 1)
          ], 8, we))), 128)),
          f("button", {
            id: "link-menu-delete",
            type: "button",
            class: Y(["danger", { "is-confirming": g.value }]),
            disabled: o.value,
            onClick: j
          }, b(g.value ? "确定删除此书签？" : "删除网站"), 11, Ne)
        ], 64)) : (r(), s(w, { key: 5 }, [
          f("button", {
            type: "button",
            disabled: o.value,
            onClick: ee
          }, "创建中文件夹", 8, Be),
          t(v).editing.value ? (r(), s("div", Ee, [
            F(t(ce), {
              modelValue: t(v).draft.value,
              "onUpdate:modelValue": e[6] || (e[6] = (l) => t(v).draft.value = l),
              busy: t(v).busy.value,
              revision: t(v).revision.value,
              "aria-invalid": t(v).failed.value || void 0,
              class: "link-menu-title-input",
              maxlength: "100",
              placeholder: "输入文件夹名称",
              onCommit: t(v).commit,
              onCancel: t(v).cancel
            }, null, 8, ["modelValue", "busy", "revision", "aria-invalid", "onCommit", "onCancel"]),
            F(t(ge), {
              message: t(v).message.value,
              failed: t(v).failed.value
            }, null, 8, ["message", "failed"])
          ])) : p("", !0)
        ], 64)),
        n.blocked ? (r(), s("button", {
          key: 6,
          type: "button",
          disabled: E.value,
          onClick: e[7] || (e[7] = (l) => c("refresh"))
        }, "刷新核对后恢复操作", 8, Pe)) : p("", !0)
      ], 36)
    ]));
  }
}), Re = /* @__PURE__ */ fe(Ue, [["__scopeId", "data-v-6631ba00"]]);
export {
  Re as default
};
