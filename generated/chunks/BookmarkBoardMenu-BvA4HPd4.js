import { d as oe, N as ue, b as x, o as r, e as P, h as g, u as t, f as re, i as p, g as s, t as b, s as w, F as T, j as X, C as Y, k as q, B as se, l as de, y as k } from "./vendor-vue-D8gPZiit.js";
import { _ as me, a as ve, L as I } from "./LauncherMoveMenu-CG2gFX5R.js";
import { a as C, $ as G } from "./search.service-Boal8ceH.js";
import { u as ce } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { u as L, _ as ge, I as fe } from "./useInlineTitleEdit-BzC1Lzg5.js";
import { n as M } from "./view-styles-KXYy1iqP.js";
import { w as be } from "./web-task-store-DHNwk9Kh.js";
import { _ as ke } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
const ye = { key: 1 }, pe = {
  key: 2,
  class: "bookmark-menu-error",
  role: "status"
}, Ce = ["disabled"], he = ["disabled"], xe = ["disabled", "onClick"], Se = {
  key: 0,
  style: { "margin-right": "6px" }
}, we = ["disabled"], Te = ["disabled"], Fe = ["disabled"], Ne = ["disabled"], Be = ["disabled", "onClick"], Ue = {
  key: 0,
  style: { "margin-right": "6px" }
}, $e = ["disabled"], ze = ["disabled"], Ee = {
  key: 0,
  class: "link-menu-header"
}, Pe = ["disabled"], Ie = /* @__PURE__ */ oe({
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
  setup(o, { expose: J, emit: K }) {
    const i = o, c = K, f = x(!1), h = x(!1), F = x(!1), S = x(""), z = (l) => M.show({ appName: "书签", title: "保存未完成", message: l }), n = ue(i.target.item), d = L({ save: (l, e) => i.saveText(l, "title", e), apply: (l, e) => {
      N.value = e, n.value = { ...l, title: e };
    }, detachedError: z }), m = L({ save: (l, e) => i.saveText(l, "url", e), apply: (l, e) => {
      B.value = e, l.kind === "link" && (n.value = { ...l, url: e });
    }, detachedError: z }), v = L({ save: (l, e) => i.createFolder(l, e), apply: () => c("close"), detachedError: z }), N = x(i.target.item?.title || "书签"), B = x(i.target.item?.kind === "link" ? i.target.item.url : ""), U = k(() => i.busy || d.busy.value || m.busy.value || v.busy.value), A = k(() => d.editing.value || m.editing.value || v.editing.value), u = k(() => U.value || i.blocked || A.value), V = k(() => !U.value && !A.value);
    J({ canDismiss: V });
    function Q() {
      V.value && c("close");
    }
    const { menuRef: W, style: y } = ce({ visible: () => !0, anchor: () => i.target, dismiss: Q }), Z = k(() => ({
      ...y.value,
      overflowX: h.value || F.value ? "visible" : "hidden",
      overflowY: h.value || F.value ? "visible" : "auto"
    })), $ = k(() => i.destinations.map((l) => ({ id: l.id, name: l.title, disabled: l.disabled }))), R = k(() => C.getPageNames().map((l) => ({
      id: l,
      name: C.getPageLabel(l)
    })));
    async function _(l) {
      if (!(!n.value || n.value.kind !== "link" || u.value))
        try {
          const e = new URL(C.normalizeUrl(n.value.url));
          if (e.protocol !== "http:" && e.protocol !== "https:")
            throw new Error("仅支持 HTTP/HTTPS 网站");
          await C.ready, await C.addLink({
            title: n.value.title || C.hostOf(e.href),
            url: e.href,
            group: "常用网站",
            page: l
          }), M.show({
            appName: "常用网站",
            title: "收藏成功",
            message: `已将「${n.value.title || n.value.url}」收藏到【${C.getPageLabel(l)}】分区`
          }), c("close");
        } catch (e) {
          S.value = e?.message || "收藏失败，请重试";
        }
    }
    function ee() {
      if (!n.value || n.value.kind !== "link" || u.value) return;
      const l = globalThis.chrome, e = n.value.url && l?.runtime?.id ? `chrome-extension://${l.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(n.value.url)}&size=32` : void 0;
      be.open({
        id: n.value.id,
        title: n.value.title || n.value.url,
        url: n.value.url,
        icon: e,
        source: "bookmark"
      }), c("close");
    }
    function E() {
      u.value || !n.value || (m.reset(), f.value = !1, d.start({ ...n.value, title: N.value }, N.value));
    }
    function D() {
      u.value || n.value?.kind !== "link" || (d.reset(), f.value = !1, m.start({ ...n.value, url: B.value }, B.value));
    }
    function te() {
      u.value || v.start(i.target.item?.kind === "folder" ? i.target.item.id : i.target.parentId, "");
    }
    async function H(l) {
      if (!(!n.value || u.value))
        try {
          await i.move(n.value, l), c("close");
        } catch (e) {
          S.value = e instanceof Error ? e.message : "移动失败，请刷新核对。";
        }
    }
    async function j() {
      if (!(!n.value || u.value)) {
        if (!f.value) {
          f.value = !0;
          return;
        }
        try {
          await i.remove(n.value), c("close");
        } catch (l) {
          f.value = !1, S.value = l instanceof Error ? l.message : "删除失败，请刷新核对。";
        }
      }
    }
    function le(l) {
      u.value || (c("toggleSize", l), c("close"));
    }
    const ae = k(() => !i.target.item || i.target.item.kind !== "folder" ? [] : G.getMenuActionsForTarget({
      id: i.target.item.id,
      title: i.target.item.title,
      kind: "folder",
      source: "bookmarks"
    })), ie = k(() => !i.target.item || i.target.item.kind !== "link" ? [] : G.getMenuActionsForTarget({
      id: i.target.item.id,
      title: i.target.item.title,
      url: i.target.item.url,
      kind: "link",
      source: "bookmarks"
    }));
    async function O(l, e) {
      if (!u.value) {
        c("close");
        try {
          await l.execute(e);
        } catch (a) {
          M.show({ appName: "插件扩展", title: "执行失败", message: a?.message || "操作未完成" });
        }
      }
    }
    return (l, e) => (r(), P(de, { to: "body" }, [
      g("div", {
        ref_key: "menuRef",
        ref: W,
        class: "folder-menu bookmark-board-menu",
        role: "menu",
        style: se(Z.value),
        onPointerdown: e[8] || (e[8] = q(() => {
        }, ["stop"])),
        onContextmenu: e[9] || (e[9] = q(() => {
        }, ["prevent", "stop"])),
        onClickCapture: e[10] || (e[10] = (a) => U.value && (a.preventDefault(), a.stopPropagation()))
      }, [
        o.target.item ? (r(), P(me, {
          key: 0,
          title: N.value,
          editing: t(d).editing.value,
          draft: t(d).draft.value,
          "onUpdate:draft": e[1] || (e[1] = (a) => t(d).draft.value = a),
          busy: t(d).busy.value,
          revision: t(d).revision.value,
          failed: t(d).failed.value,
          message: t(d).message.value,
          maxlength: 100,
          onStart: E,
          onCommit: t(d).commit,
          onCancel: t(d).cancel
        }, {
          default: re(() => [
            o.target.item.kind === "link" ? (r(), P(ve, {
              key: 0,
              url: B.value,
              editing: t(m).editing.value,
              draft: t(m).draft.value,
              "onUpdate:draft": e[0] || (e[0] = (a) => t(m).draft.value = a),
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
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])) : (r(), s("p", ye, "书签操作")),
        S.value ? (r(), s("span", pe, b(S.value), 1)) : p("", !0),
        o.target.item?.kind === "folder" ? (r(), s(T, { key: 3 }, [
          g("button", {
            id: "folder-menu-rename",
            type: "button",
            disabled: u.value,
            onClick: E
          }, b(o.target.section ? "重命名板块" : "重命名收藏夹"), 9, Ce),
          o.target.section ? p("", !0) : (r(), s("button", {
            key: 0,
            id: "folder-menu-size",
            type: "button",
            disabled: u.value,
            onClick: e[2] || (e[2] = (a) => le(o.target.item.id))
          }, b(o.size === "small" ? "扩大为大收藏夹" : "收缩为中收藏夹"), 9, he)),
          w(I, {
            open: h.value,
            "onUpdate:open": e[3] || (e[3] = (a) => h.value = a),
            visible: !0,
            disabled: u.value || !$.value.length,
            label: "移动到其他分区",
            items: $.value,
            x: Number.parseFloat(String(t(y).left || 0)),
            y: Number.parseFloat(String(t(y).top || 0)),
            "vertical-budget": 240,
            "empty-text": "暂无其他分区",
            onSelect: H
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          (r(!0), s(T, null, X(ae.value, (a) => (r(), s("button", {
            key: a.id,
            type: "button",
            disabled: u.value || a.disabled?.({ id: o.target.item.id, title: o.target.item.title, kind: "folder" }),
            onClick: (ne) => O(a, { id: o.target.item.id, title: o.target.item.title, kind: "folder" })
          }, [
            a.icon ? (r(), s("span", Se, b(a.icon), 1)) : p("", !0),
            g("span", null, b(a.label), 1)
          ], 8, xe))), 128)),
          g("button", {
            id: "folder-menu-delete",
            type: "button",
            class: Y(["danger", { "is-confirming": f.value }]),
            disabled: u.value,
            onClick: j
          }, b(f.value ? `确认删除整个文件夹及 ${o.target.item.count} 个书签？` : o.target.section ? "删除板块" : "删除文件夹"), 11, we)
        ], 64)) : o.target.item?.kind === "link" ? (r(), s(T, { key: 4 }, [
          w(I, {
            open: F.value,
            "onUpdate:open": e[4] || (e[4] = (a) => F.value = a),
            visible: !0,
            disabled: u.value || !R.value.length,
            label: "收藏到常用网站",
            items: R.value,
            x: Number.parseFloat(String(t(y).left || 0)),
            y: Number.parseFloat(String(t(y).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无常用网站分区",
            onSelect: _
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          w(I, {
            open: h.value,
            "onUpdate:open": e[5] || (e[5] = (a) => h.value = a),
            visible: !0,
            disabled: u.value || !$.value.length,
            label: "移动到分区",
            items: $.value,
            x: Number.parseFloat(String(t(y).left || 0)),
            y: Number.parseFloat(String(t(y).top || 0)),
            "vertical-budget": 280,
            "empty-text": "暂无其他可移动分区",
            onSelect: H
          }, null, 8, ["open", "disabled", "items", "x", "y"]),
          g("button", {
            id: "link-menu-rename",
            type: "button",
            disabled: u.value,
            onClick: E
          }, "重命名", 8, Te),
          g("button", {
            id: "link-menu-create-task",
            type: "button",
            disabled: u.value,
            onClick: ee
          }, "创建任务", 8, Fe),
          g("button", {
            id: "link-menu-edit",
            type: "button",
            disabled: u.value,
            onClick: D
          }, "编辑", 8, Ne),
          (r(!0), s(T, null, X(ie.value, (a) => (r(), s("button", {
            key: a.id,
            type: "button",
            disabled: u.value || a.disabled?.({ id: o.target.item.id, title: o.target.item.title, url: o.target.item.url, kind: "link" }),
            onClick: (ne) => O(a, { id: o.target.item.id, title: o.target.item.title, url: o.target.item.url, kind: "link" })
          }, [
            a.icon ? (r(), s("span", Ue, b(a.icon), 1)) : p("", !0),
            g("span", null, b(a.label), 1)
          ], 8, Be))), 128)),
          g("button", {
            id: "link-menu-delete",
            type: "button",
            class: Y(["danger", { "is-confirming": f.value }]),
            disabled: u.value,
            onClick: j
          }, b(f.value ? "确定删除此书签？" : "删除网站"), 11, $e)
        ], 64)) : (r(), s(T, { key: 5 }, [
          g("button", {
            type: "button",
            disabled: u.value,
            onClick: te
          }, "创建中文件夹", 8, ze),
          t(v).editing.value ? (r(), s("div", Ee, [
            w(t(ge), {
              modelValue: t(v).draft.value,
              "onUpdate:modelValue": e[6] || (e[6] = (a) => t(v).draft.value = a),
              busy: t(v).busy.value,
              revision: t(v).revision.value,
              "aria-invalid": t(v).failed.value || void 0,
              class: "link-menu-title-input",
              maxlength: "100",
              placeholder: "输入文件夹名称",
              onCommit: t(v).commit,
              onCancel: t(v).cancel
            }, null, 8, ["modelValue", "busy", "revision", "aria-invalid", "onCommit", "onCancel"]),
            w(t(fe), {
              message: t(v).message.value,
              failed: t(v).failed.value
            }, null, 8, ["message", "failed"])
          ])) : p("", !0)
        ], 64)),
        o.blocked ? (r(), s("button", {
          key: 6,
          type: "button",
          disabled: U.value,
          onClick: e[7] || (e[7] = (a) => c("refresh"))
        }, "刷新核对后恢复操作", 8, Pe)) : p("", !0)
      ], 36)
    ]));
  }
}), Oe = /* @__PURE__ */ ke(Ie, [["__scopeId", "data-v-6936506a"]]);
export {
  Oe as default
};
