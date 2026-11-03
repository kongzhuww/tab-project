import { d as ke, o as d, g as c, F as j, e as Ze, u as n, k as S, h as o, C as w, t as k, s as M, w as z, P as $, j as ae, i as I, B, f as qe, y as h, b as V } from "./vendor-vue-FFI3kJnP.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DRvNM_7u.js";
import { _ as He, I as Je, u as U } from "./useInlineTitleEdit-BydmJujj.js";
import { B as Ke, n as ue } from "./view-styles-BecvgcJv.js";
import { a as N, Z as se, Y as Qe } from "./search.service-DacqWPJU.js";
import { m as Xe, c as a } from "./store-_XqQ77hc.js";
import { _ as de, L as re, a as en } from "./LauncherMoveMenu-BXiRmAjd.js";
import { C as nn } from "./ChatShareMenu-D867P6lA.js";
const ln = ["title"], tn = /* @__PURE__ */ ke({
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
    const C = e;
    return (G, u) => (d(), c(j, null, [
      s.editing ? (d(), Ze(n(He), {
        key: 0,
        "model-value": s.draft,
        busy: s.busy,
        revision: s.revision,
        "aria-invalid": s.failed || void 0,
        "aria-label": "网站备注",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "输入网站备注...",
        "onUpdate:modelValue": u[0] || (u[0] = (L) => C("update:draft", L)),
        onCommit: u[1] || (u[1] = (L) => C("commit")),
        onCancel: u[2] || (u[2] = (L) => C("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (d(), c("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = S((L) => C("start"), ["stop"]))
      }, [
        u[4] || (u[4] = o("span", { class: "link-menu-note-badge" }, "📝", -1)),
        o("span", {
          class: w(["link-menu-subtext", { "is-empty": !s.note }])
        }, k(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = o("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, ln)),
      M(n(Je), {
        message: s.message,
        failed: s.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), on = { class: "launcher-menus-island" }, an = ["hidden"], un = ["hidden"], sn = ["disabled", "onClick"], dn = {
  key: 0,
  style: { "margin-right": "6px" }
}, rn = ["hidden"], kn = ["hidden"], cn = ["disabled", "onClick"], fn = {
  key: 0,
  style: { "margin-right": "6px" }
}, mn = ["hidden"], pn = ["hidden"], gn = { id: "page-menu-title" }, Mn = ["disabled", "title"], vn = ["hidden"], bn = ["hidden"], Fn = /* @__PURE__ */ ke({
  __name: "LauncherMenus",
  setup(s) {
    const e = Xe, C = h(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), G = h(() => ({
      left: `${e.linkMenu.x}px`,
      top: `${e.linkMenu.y}px`
    })), u = h(() => ({
      left: `${e.pageMenu.x}px`,
      top: `${e.pageMenu.y}px`
    })), L = h(() => ({
      left: `${e.blankMenu.x}px`,
      top: `${e.blankMenu.y}px`
    })), F = (i) => {
      ue.show({ appName: "常用网站", title: "网站编辑保存未完成", message: i, duration: 12e3 });
    }, f = U({
      save: (i, l) => N.renameLinkTitle(i.id, i.title, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, title: l });
      },
      detachedError: F
    }), x = U({
      save: async (i, l) => {
        const t = Qe(l);
        return await N.renameGroup(i, t), t;
      },
      apply: (i, l) => {
        e.folderMenu.groupName = l;
      },
      detachedError: F
    }), {
      editing: W,
      draft: P,
      busy: Y,
      message: ce,
      failed: Z,
      revision: fe
    } = f, {
      editing: q,
      draft: D,
      busy: O,
      message: me,
      failed: H,
      revision: pe
    } = x, v = V(!1), b = V(!1), y = V(!1);
    function ge() {
      v.value = !1, b.value = !1, y.value = !1;
    }
    function J() {
      e.folderMenu.groupName && x.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const Me = x.commit, ve = x.cancel;
    function K() {
      if (g.value) return;
      m.reset(), p.reset();
      const i = e.linkMenu.link;
      i && f.start({ id: i.id, title: i.title || "" }, i.title || "");
    }
    const be = f.commit, ye = f.cancel;
    function Q(i, l) {
      l && (i.preventDefault(), i.stopPropagation());
    }
    const m = U({
      save: (i, l) => N.editLinkUrl(i.id, i.url, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, url: l });
      },
      detachedError: F
    }), {
      editing: X,
      draft: A,
      busy: ee,
      message: he,
      failed: ne,
      revision: Ce
    } = m, p = U({
      save: (i, l) => N.editLinkNote(i.id, i.note, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, note: l });
      },
      detachedError: F
    }), {
      editing: ie,
      draft: R,
      busy: le,
      message: Le,
      failed: te,
      revision: xe
    } = p, g = h(() => Y.value || ee.value || le.value);
    function Ne() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), p.reset(), m.start({ id: i.id, url: i.url || "" }, i.url || ""));
    }
    const Te = m.commit, Se = m.cancel;
    function Fe(i) {
      const l = e.linkMenu.link;
      if (!l || g.value) return;
      const E = N.getState().links.find((T) => String(T.id) === String(l.id)) || l;
      let _ = E.customIcon || E.icon || "";
      if (!_ && l.url) {
        const T = N.getCachedIcon(l.url);
        T && T.length <= 64 * 1024 && (_ = T);
      }
      const Ye = {
        title: l.title || "网站",
        url: l.url || "",
        icon: _,
        note: l.note || ""
      };
      r(), Ke.sendWebsiteShare(Ye, i);
    }
    function Oe() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), m.reset(), p.start({ id: i.id, note: i.note || "" }, i.note || ""));
    }
    const Ee = p.commit, $e = p.cancel;
    function r() {
      g.value || O.value || X.value && ne.value || ie.value && te.value || W.value && Z.value || q.value && H.value || (f.reset(), x.reset(), m.reset(), p.reset(), ge(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, a.closeAll(), a.dispatch("close"));
    }
    const Be = h(() => e.folderMenu.groupName ? se.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), Ue = h(() => {
      const i = e.linkMenu.link;
      return i ? se.getMenuActionsForTarget({
        id: String(i.id),
        title: i.title || "",
        url: i.url,
        kind: "link",
        source: "launcher"
      }) : [];
    });
    async function oe(i, l) {
      r();
      try {
        await i.execute(l);
      } catch (t) {
        ue.show({ appName: "插件扩展", title: "执行失败", message: t?.message || "操作未完成" });
      }
    }
    function we() {
      J();
    }
    function Pe() {
      const i = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:toggle-size", { group: i });
    }
    function De(i) {
      e.folderMenu.flyoutOpen = !1;
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:move", { group: l, page: i });
    }
    function Ae(i) {
      if (i?.stopPropagation(), !b.value) {
        b.value = !0;
        return;
      }
      b.value = !1;
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:delete", { group: l });
    }
    function Re() {
      K();
    }
    function _e() {
      const i = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move-out", { link: i });
    }
    function ze(i) {
      e.linkMenu.flyoutOpen = !1;
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move", { link: l, page: i });
    }
    function Ie(i) {
      if (i?.stopPropagation(), !v.value) {
        v.value = !0;
        return;
      }
      v.value = !1;
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:delete", { link: l });
    }
    function Ve() {
      const i = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:rename", { page: i });
    }
    function je(i) {
      if (i?.stopPropagation(), !y.value) {
        y.value = !0;
        return;
      }
      y.value = !1;
      const l = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:delete", { page: l });
    }
    function Ge() {
      const i = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-large-folder", { page: i });
    }
    function We() {
      const i = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-medium-folder", { page: i });
    }
    return z(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      x.reset(), b.value = !1;
    }, { flush: "sync" }), z(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      f.reset(), m.reset(), p.reset(), v.value = !1;
    }, { flush: "sync" }), z(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      y.value = !1;
    }, { flush: "sync" }), (i, l) => (d(), c("div", on, [
      o("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, an),
      o("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).folderMenu.isOpen,
        style: B(C.value),
        onClickCapture: l[2] || (l[2] = (t) => Q(t, n(O)))
      }, [
        M(de, {
          title: n(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: n(q),
          draft: n(D),
          "onUpdate:draft": l[0] || (l[0] = (t) => $(D) ? D.value = t : null),
          busy: n(O),
          revision: n(pe),
          failed: n(H),
          message: n(me),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: J,
          onCommit: n(Me),
          onCancel: n(ve)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        o("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: we
        }, " 重命名收藏夹 "),
        o("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: Pe
        }, k(n(e).folderMenu.sizeText), 1),
        M(re, {
          id: "folder-menu-move-wrapper",
          "button-id": "folder-menu-move-page",
          "submenu-id": "folder-move-flyout",
          open: n(e).folderMenu.flyoutOpen,
          "onUpdate:open": l[1] || (l[1] = (t) => n(e).folderMenu.flyoutOpen = t),
          visible: n(e).folderMenu.isOpen,
          x: n(e).folderMenu.x,
          y: n(e).folderMenu.y,
          items: n(e).folderMenu.pages,
          disabled: !n(e).folderMenu.canMove || n(O),
          label: "移动到其他分区",
          title: n(e).folderMenu.canMove ? "将此大收藏夹添加到指定网站分区" : "当前只有一个分区，先新建分区再移动",
          onSelect: De
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (d(!0), c(j, null, ae(Be.value, (t) => (d(), c("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" }),
          onClick: (E) => oe(t, { id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" })
        }, [
          t.icon ? (d(), c("span", dn, k(t.icon), 1)) : I("", !0),
          o("span", null, k(t.label), 1)
        ], 8, sn))), 128)),
        o("button", {
          id: "folder-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": b.value }]),
          onClick: Ae
        }, k(b.value ? "确定？" : "删除文件夹"), 3)
      ], 44, un),
      o("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, rn),
      o("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).linkMenu.isOpen,
        style: B(G.value),
        onClickCapture: l[8] || (l[8] = (t) => Q(t, g.value))
      }, [
        M(de, {
          title: n(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: n(W),
          draft: n(P),
          "onUpdate:draft": l[5] || (l[5] = (t) => $(P) ? P.value = t : null),
          busy: n(Y),
          revision: n(fe),
          failed: n(Z),
          message: n(ce),
          onStart: K,
          onCommit: n(be),
          onCancel: n(ye)
        }, {
          default: qe(() => [
            M(en, {
              url: n(e).linkMenu.link?.url || "",
              editing: n(X),
              draft: n(A),
              "onUpdate:draft": l[3] || (l[3] = (t) => $(A) ? A.value = t : null),
              busy: n(ee),
              revision: n(Ce),
              failed: n(ne),
              message: n(he),
              onStart: Ne,
              onCommit: n(Te),
              onCancel: n(Se)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            M(tn, {
              note: n(e).linkMenu.link?.note || "",
              editing: n(ie),
              draft: n(R),
              "onUpdate:draft": l[4] || (l[4] = (t) => $(R) ? R.value = t : null),
              busy: n(le),
              revision: n(xe),
              failed: n(te),
              message: n(Le),
              onStart: Oe,
              onCommit: n(Ee),
              onCancel: n($e)
            }, null, 8, ["note", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        M(re, {
          id: "link-menu-move-wrapper",
          "button-id": "link-menu-move",
          "submenu-id": "link-move-flyout",
          open: n(e).linkMenu.flyoutOpen,
          "onUpdate:open": l[6] || (l[6] = (t) => n(e).linkMenu.flyoutOpen = t),
          visible: n(e).linkMenu.isOpen,
          x: n(e).linkMenu.x,
          y: n(e).linkMenu.y,
          items: n(e).linkMenu.pages,
          disabled: g.value,
          "vertical-budget": 280,
          onSelect: ze
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        n(e).linkMenu.link?.group && n(e).linkMenu.link.group !== "常用网站" ? (d(), c("button", {
          key: 0,
          type: "button",
          onClick: _e
        }, "移出文件夹，放到外面")) : I("", !0),
        o("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Re
        }, " 重命名 "),
        M(nn, {
          id: "link-menu-send",
          visible: n(e).linkMenu.isOpen,
          disabled: g.value,
          onOpen: l[7] || (l[7] = (t) => n(e).linkMenu.flyoutOpen = !1),
          onSelect: Fe
        }, null, 8, ["visible", "disabled"]),
        (d(!0), c(j, null, ae(Ue.value, (t) => (d(), c("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: String(n(e).linkMenu.link?.id), title: n(e).linkMenu.link?.title || "", url: n(e).linkMenu.link?.url, kind: "link" }),
          onClick: (E) => n(e).linkMenu.link && oe(t, { id: String(n(e).linkMenu.link.id), title: n(e).linkMenu.link.title || "", url: n(e).linkMenu.link.url, kind: "link" })
        }, [
          t.icon ? (d(), c("span", fn, k(t.icon), 1)) : I("", !0),
          o("span", null, k(t.label), 1)
        ], 8, cn))), 128)),
        o("button", {
          id: "link-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": v.value }]),
          onClick: Ie
        }, k(v.value ? "确定？" : "删除网站"), 3)
      ], 44, kn),
      o("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, mn),
      o("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).pageMenu.isOpen,
        style: B(u.value)
      }, [
        o("p", gn, "分区 · " + k(n(e).pageMenu.pageLabel), 1),
        o("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: Ve
        }, " 重命名分区 "),
        o("button", {
          id: "page-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": y.value }]),
          disabled: !n(e).pageMenu.canDelete,
          title: n(e).pageMenu.canDelete ? `删除「${n(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: je
        }, k(y.value ? "确定？" : "删除分区"), 11, Mn)
      ], 12, pn),
      o("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, vn),
      o("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).blankMenu.isOpen,
        style: B(L.value)
      }, [
        o("button", {
          id: "blank-menu-create-folder",
          type: "button",
          onClick: Ge
        }, " 创建大文件夹 "),
        o("button", {
          id: "blank-menu-create-medium-folder",
          type: "button",
          onClick: We
        }, " 创建中文件夹 ")
      ], 12, bn)
    ]));
  }
});
export {
  Fn as default
};
