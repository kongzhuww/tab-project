import { d as pe, f as k, g as m, F as j, l as Je, u as i, k as N, h as o, q as B, t as c, B as b, w as W, N as U, i as se, j as re, n as $, A as Ke, s as d } from "./vendor-vue-C-_ocEUS.js";
import { u as Xe } from "./useMachine-BqmBKWND.js";
import "./_plugin-vue_export-helper-CUD1GoS1.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-Bk2ztKZ7.js";
import { _ as Ye, I as Ze, u as w } from "./useInlineTitleEdit-B-LQyF-3.js";
import { n as de } from "./github.service-BkChs4sP.js";
import { l as v, x as en, W as ce, V as nn } from "./search.service-gzbpg5BD.js";
import { k as S, m as tn, d as a } from "./drawer-store-BkfYIYhg.js";
import { _ as ke, L as me, a as ln } from "./LauncherMoveMenu-3bw4U7tQ.js";
import { C as on } from "./ChatShareMenu-mUBr85SQ.js";
import { w as an } from "./web-task-store-BwXY4qeL.js";
import { w as un } from "./main-Bo0A62Do.js";
const sn = ["title"], rn = /* @__PURE__ */ pe({
  __name: "LauncherMenuNote",
  props: {
    note: {},
    editing: { type: Boolean },
    draft: {},
    busy: { type: Boolean },
    revision: {},
    failed: { type: Boolean },
    message: {}
  },
  emits: ["update:draft", "start", "commit", "cancel"],
  setup(s, { emit: e }) {
    const L = e;
    return (q, u) => (k(), m(j, null, [
      s.editing ? (k(), Je(i(Ye), {
        key: 0,
        "model-value": s.draft,
        busy: s.busy,
        revision: s.revision,
        "aria-invalid": s.failed || void 0,
        "aria-label": "网站备注",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "输入网站备注...",
        "onUpdate:modelValue": u[0] || (u[0] = (E) => L("update:draft", E)),
        onCommit: u[1] || (u[1] = (E) => L("commit")),
        onCancel: u[2] || (u[2] = (E) => L("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (k(), m("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = N((E) => L("start"), ["stop"]))
      }, [
        u[4] || (u[4] = o("span", { class: "link-menu-note-badge" }, "📝", -1)),
        o("span", {
          class: B(["link-menu-subtext", { "is-empty": !s.note }])
        }, c(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = o("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, sn)),
      b(i(Ze), {
        message: s.message,
        failed: s.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), dn = { class: "launcher-menus-island" }, cn = ["hidden"], kn = ["hidden"], mn = ["disabled", "onClick"], pn = {
  key: 0,
  style: { "margin-right": "6px" }
}, fn = ["hidden"], gn = ["hidden"], Mn = ["disabled", "onClick"], vn = {
  key: 0,
  style: { "margin-right": "6px" }
}, bn = ["hidden"], yn = ["hidden"], hn = { id: "page-menu-title" }, Cn = ["disabled", "title"], Ln = ["hidden"], En = ["hidden"], Rn = /* @__PURE__ */ pe({
  __name: "LauncherMenus",
  setup(s) {
    const e = tn, L = d(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), q = d(() => ({
      left: `${e.linkMenu.x}px`,
      top: `${e.linkMenu.y}px`
    })), u = d(() => ({
      left: `${e.pageMenu.x}px`,
      top: `${e.pageMenu.y}px`
    })), E = d(() => ({
      left: `${e.blankMenu.x}px`,
      top: `${e.blankMenu.y}px`
    })), F = (n) => {
      de.show({ appName: "常用网站", title: "网站编辑保存未完成", message: n, duration: 12e3 });
    }, p = w({
      save: (n, t) => v.renameLinkTitle(n.id, n.title, t),
      apply: (n, t) => {
        e.linkMenu.link?.id === n.id && (e.linkMenu.link = { ...e.linkMenu.link, title: t });
      },
      detachedError: F
    }), T = w({
      save: async (n, t) => {
        const l = nn(t);
        return await v.renameGroup(n, l), l;
      },
      apply: (n, t) => {
        e.folderMenu.groupName = t;
      },
      detachedError: F
    }), {
      editing: G,
      draft: D,
      busy: H,
      message: fe,
      failed: J,
      revision: ge
    } = p, {
      editing: K,
      draft: _,
      busy: O,
      message: Me,
      failed: X,
      revision: ve
    } = T, R = Xe(S), A = d(() => R.value.confirmingDelete === "link"), P = d(() => R.value.confirmingDelete === "folder"), I = d(() => R.value.confirmingDelete === "page");
    function y() {
      S.send({ type: "CANCEL_DELETE" });
    }
    function Y() {
      e.folderMenu.groupName && T.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const be = T.commit, ye = T.cancel;
    function Z() {
      if (M.value) return;
      f.reset(), g.reset();
      const n = e.linkMenu.link;
      n && p.start({ id: n.id, title: n.title || "" }, n.title || "");
    }
    const he = p.commit, Ce = p.cancel;
    function ee(n, t) {
      t && (n.preventDefault(), n.stopPropagation());
    }
    const f = w({
      save: (n, t) => v.editLinkUrl(n.id, n.url, t),
      apply: (n, t) => {
        e.linkMenu.link?.id === n.id && (e.linkMenu.link = { ...e.linkMenu.link, url: t });
      },
      detachedError: F
    }), {
      editing: ne,
      draft: z,
      busy: ie,
      message: Le,
      failed: te,
      revision: Ee
    } = f, g = w({
      save: (n, t) => v.editLinkNote(n.id, n.note, t),
      apply: (n, t) => {
        e.linkMenu.link?.id === n.id && (e.linkMenu.link = { ...e.linkMenu.link, note: t });
      },
      detachedError: F
    }), {
      editing: le,
      draft: V,
      busy: oe,
      message: Te,
      failed: ae,
      revision: xe
    } = g, M = d(() => H.value || ie.value || oe.value);
    function Se() {
      const n = e.linkMenu.link;
      !n || M.value || (p.reset(), g.reset(), f.start({ id: n.id, url: n.url || "" }, n.url || ""));
    }
    const Ne = f.commit, Fe = f.cancel;
    function Oe(n) {
      const t = e.linkMenu.link;
      if (!t || M.value) return;
      const h = v.getState().links.find((x) => String(x.id) === String(t.id)) || t;
      let C = h.customIcon || h.icon || "";
      if (!C && t.url) {
        const x = v.getCachedIcon(t.url);
        x && x.length <= 64 * 1024 && (C = x);
      }
      const Q = {
        title: t.title || "网站",
        url: t.url || "",
        icon: C,
        note: t.note || ""
      };
      r(), en.sendWebsiteShare(Q, n);
    }
    function Ue() {
      const n = e.linkMenu.link;
      !n || M.value || (p.reset(), f.reset(), g.start({ id: n.id, note: n.note || "" }, n.note || ""));
    }
    const $e = g.commit, we = g.cancel;
    function r() {
      M.value || O.value || ne.value && te.value || le.value && ae.value || G.value && J.value || K.value && X.value || (p.reset(), T.reset(), f.reset(), g.reset(), y(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, a.closeAll(), a.dispatch("close"));
    }
    const Be = d(() => e.folderMenu.groupName ? ce.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), De = d(() => {
      const n = e.linkMenu.link;
      return n ? ce.getMenuActionsForTarget({
        id: String(n.id),
        title: n.title || "",
        url: n.url,
        kind: "link",
        source: "launcher"
      }) : [];
    });
    async function ue(n, t) {
      r();
      try {
        await n.execute(t);
      } catch (l) {
        de.show({ appName: "插件扩展", title: "执行失败", message: l?.message || "操作未完成" });
      }
    }
    function _e() {
      Y();
    }
    function Re() {
      const n = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:toggle-size", { group: n });
    }
    function Ae(n) {
      e.folderMenu.flyoutOpen = !1;
      const t = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:move", { group: t, page: n });
    }
    function Pe(n) {
      if (n?.stopPropagation(), !P.value) {
        S.send({ type: "REQUEST_DELETE", target: "folder" });
        return;
      }
      y();
      const t = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:delete", { group: t });
    }
    function Ie() {
      Z();
    }
    function ze() {
      const n = e.linkMenu.link;
      if (!n) return;
      const l = v.getState().links.find((Q) => String(Q.id) === String(n.id)) || n, h = globalThis.chrome;
      let C = l.customIcon || l.icon || "";
      !C && n.url && (C = v.getCachedIcon(n.url) || (h?.runtime?.id ? `chrome-extension://${h.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(n.url)}&size=32` : "")), un.open({
        id: n.id,
        title: n.title || n.url || "",
        url: n.url || "",
        icon: C || void 0,
        note: n.note || void 0,
        category: n.group && n.group !== "常用网站" ? n.group : n.page || "常用网站",
        source: "launcher"
      }), a.closeLinkMenu();
    }
    function Ve() {
      const n = e.linkMenu.link;
      if (!n) return;
      const t = globalThis.chrome, l = n.url && t?.runtime?.id ? `chrome-extension://${t.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(n.url)}&size=32` : void 0;
      an.open({
        id: n.id,
        title: n.title || n.url || "",
        url: n.url || "",
        icon: l,
        note: n.note || void 0,
        category: n.page || n.group || "常用网站",
        source: "launcher"
      }), a.closeLinkMenu();
    }
    function Qe(n) {
      e.linkMenu.flyoutOpen = !1;
      const t = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move", { link: t, page: n });
    }
    function We(n) {
      if (n?.stopPropagation(), !A.value) {
        S.send({ type: "REQUEST_DELETE", target: "link" });
        return;
      }
      y();
      const t = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:delete", { link: t });
    }
    function je() {
      const n = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:rename", { page: n });
    }
    function qe(n) {
      if (n?.stopPropagation(), !I.value) {
        S.send({ type: "REQUEST_DELETE", target: "page" });
        return;
      }
      y();
      const t = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:delete", { page: t });
    }
    function Ge() {
      const n = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-large-folder", { page: n });
    }
    function He() {
      const n = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-medium-folder", { page: n });
    }
    return W(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      T.reset(), y();
    }, { flush: "sync" }), W(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      p.reset(), f.reset(), g.reset(), y();
    }, { flush: "sync" }), W(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      y();
    }, { flush: "sync" }), (n, t) => (k(), m("div", dn, [
      o("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: N(r, ["prevent"])
      }, null, 40, cn),
      o("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).folderMenu.isOpen,
        style: $(L.value),
        onClickCapture: t[2] || (t[2] = (l) => ee(l, i(O)))
      }, [
        b(ke, {
          title: i(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: i(K),
          draft: i(_),
          "onUpdate:draft": t[0] || (t[0] = (l) => U(_) ? _.value = l : null),
          busy: i(O),
          revision: i(ve),
          failed: i(X),
          message: i(Me),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: Y,
          onCommit: i(be),
          onCancel: i(ye)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        o("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: _e
        }, " 重命名收藏夹 "),
        o("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: Re
        }, c(i(e).folderMenu.sizeText), 1),
        b(me, {
          id: "folder-menu-move-wrapper",
          "button-id": "folder-menu-move-page",
          "submenu-id": "folder-move-flyout",
          open: i(e).folderMenu.flyoutOpen,
          "onUpdate:open": t[1] || (t[1] = (l) => i(e).folderMenu.flyoutOpen = l),
          visible: i(e).folderMenu.isOpen,
          x: i(e).folderMenu.x,
          y: i(e).folderMenu.y,
          items: i(e).folderMenu.pages,
          disabled: !i(e).folderMenu.canMove || i(O),
          label: "移动到其他分区",
          title: i(e).folderMenu.canMove ? "将此大收藏夹添加到指定网站分区" : "当前只有一个分区，先新建分区再移动",
          onSelect: Ae
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (k(!0), m(j, null, se(Be.value, (l) => (k(), m("button", {
          key: l.id,
          type: "button",
          disabled: l.disabled?.({ id: i(e).folderMenu.groupName, title: i(e).folderMenu.groupName, kind: "folder" }),
          onClick: (h) => ue(l, { id: i(e).folderMenu.groupName, title: i(e).folderMenu.groupName, kind: "folder" })
        }, [
          l.icon ? (k(), m("span", pn, c(l.icon), 1)) : re("", !0),
          o("span", null, c(l.label), 1)
        ], 8, mn))), 128)),
        o("button", {
          id: "folder-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": P.value }]),
          onClick: Pe
        }, c(P.value ? "确定？" : "删除文件夹"), 3)
      ], 44, kn),
      o("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: N(r, ["prevent"])
      }, null, 40, fn),
      o("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).linkMenu.isOpen,
        style: $(q.value),
        onClickCapture: t[8] || (t[8] = (l) => ee(l, M.value))
      }, [
        b(ke, {
          title: i(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: i(G),
          draft: i(D),
          "onUpdate:draft": t[5] || (t[5] = (l) => U(D) ? D.value = l : null),
          busy: i(H),
          revision: i(ge),
          failed: i(J),
          message: i(fe),
          onStart: Z,
          onCommit: i(he),
          onCancel: i(Ce)
        }, {
          default: Ke(() => [
            b(ln, {
              url: i(e).linkMenu.link?.url || "",
              editing: i(ne),
              draft: i(z),
              "onUpdate:draft": t[3] || (t[3] = (l) => U(z) ? z.value = l : null),
              busy: i(ie),
              revision: i(Ee),
              failed: i(te),
              message: i(Le),
              onStart: Se,
              onCommit: i(Ne),
              onCancel: i(Fe)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            b(rn, {
              note: i(e).linkMenu.link?.note || "",
              editing: i(le),
              draft: i(V),
              "onUpdate:draft": t[4] || (t[4] = (l) => U(V) ? V.value = l : null),
              busy: i(oe),
              revision: i(xe),
              failed: i(ae),
              message: i(Te),
              onStart: Ue,
              onCommit: i($e),
              onCancel: i(we)
            }, null, 8, ["note", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        b(me, {
          id: "link-menu-move-wrapper",
          "button-id": "link-menu-move",
          "submenu-id": "link-move-flyout",
          open: i(e).linkMenu.flyoutOpen,
          "onUpdate:open": t[6] || (t[6] = (l) => i(e).linkMenu.flyoutOpen = l),
          visible: i(e).linkMenu.isOpen,
          x: i(e).linkMenu.x,
          y: i(e).linkMenu.y,
          items: i(e).linkMenu.pages,
          disabled: M.value,
          "vertical-budget": 280,
          onSelect: Qe
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        o("button", {
          id: "link-menu-preview",
          type: "button",
          onClick: ze
        }, " 预览 "),
        o("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Ie
        }, " 重命名 "),
        o("button", {
          id: "link-menu-create-task",
          type: "button",
          onClick: Ve
        }, " 创建任务 "),
        b(on, {
          id: "link-menu-send",
          visible: i(e).linkMenu.isOpen,
          disabled: M.value,
          onOpen: t[7] || (t[7] = (l) => i(e).linkMenu.flyoutOpen = !1),
          onSelect: Oe
        }, null, 8, ["visible", "disabled"]),
        (k(!0), m(j, null, se(De.value, (l) => (k(), m("button", {
          key: l.id,
          type: "button",
          disabled: l.disabled?.({ id: String(i(e).linkMenu.link?.id), title: i(e).linkMenu.link?.title || "", url: i(e).linkMenu.link?.url, kind: "link" }),
          onClick: (h) => i(e).linkMenu.link && ue(l, { id: String(i(e).linkMenu.link.id), title: i(e).linkMenu.link.title || "", url: i(e).linkMenu.link.url, kind: "link" })
        }, [
          l.icon ? (k(), m("span", vn, c(l.icon), 1)) : re("", !0),
          o("span", null, c(l.label), 1)
        ], 8, Mn))), 128)),
        o("button", {
          id: "link-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": A.value }]),
          onClick: We
        }, c(A.value ? "确定？" : "删除网站"), 3)
      ], 44, gn),
      o("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: N(r, ["prevent"])
      }, null, 40, bn),
      o("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).pageMenu.isOpen,
        style: $(u.value)
      }, [
        o("p", hn, "分区 · " + c(i(e).pageMenu.pageLabel), 1),
        o("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: je
        }, " 重命名分区 "),
        o("button", {
          id: "page-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": I.value }]),
          disabled: !i(e).pageMenu.canDelete,
          title: i(e).pageMenu.canDelete ? `删除「${i(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: qe
        }, c(I.value ? "确定？" : "删除分区"), 11, Cn)
      ], 12, yn),
      o("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: N(r, ["prevent"])
      }, null, 40, Ln),
      o("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).blankMenu.isOpen,
        style: $(E.value)
      }, [
        o("button", {
          id: "blank-menu-create-folder",
          type: "button",
          onClick: Ge
        }, " 创建大文件夹 "),
        o("button", {
          id: "blank-menu-create-medium-folder",
          type: "button",
          onClick: He
        }, " 创建中文件夹 ")
      ], 12, En)
    ]));
  }
});
export {
  Rn as default
};
