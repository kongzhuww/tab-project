import { d as ce, o as d, e as k, F as G, c as je, u as n, i as S, f as a, B as w, t as c, D as M, x as I, Q as $, h as ae, g as z, A as B, w as qe, s as h, b as V } from "./vendor-vue-DokqDua_.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { _ as He, I as Je, u as U } from "./useInlineTitleEdit-DZUJXFgS.js";
import { B as Ke, n as ue } from "./view-styles-CHw25oOz.js";
import { a as N, Z as se, Y as Xe } from "./search.service-D8BPpHmG.js";
import { m as en, c as o } from "./youtube-store-s5h4S9ww.js";
import { _ as de, L as re, a as nn } from "./LauncherMoveMenu-BlCFzExJ.js";
import { C as ln } from "./ChatShareMenu-Dcwjxl0L.js";
const tn = ["title"], on = /* @__PURE__ */ ce({
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
    return (Q, u) => (d(), k(G, null, [
      s.editing ? (d(), je(n(He), {
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
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (d(), k("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = S((L) => C("start"), ["stop"]))
      }, [
        u[4] || (u[4] = a("span", { class: "link-menu-note-badge" }, "📝", -1)),
        a("span", {
          class: w(["link-menu-subtext", { "is-empty": !s.note }])
        }, c(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = a("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, tn)),
      M(n(Je), {
        message: s.message,
        failed: s.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), an = { class: "launcher-menus-island" }, un = ["hidden"], sn = ["hidden"], dn = ["disabled", "onClick"], rn = {
  key: 0,
  style: { "margin-right": "6px" }
}, cn = ["hidden"], kn = ["hidden"], fn = ["disabled", "onClick"], mn = {
  key: 0,
  style: { "margin-right": "6px" }
}, pn = ["hidden"], gn = ["hidden"], Mn = { id: "page-menu-title" }, vn = ["disabled", "title"], bn = ["hidden"], yn = ["hidden"], On = /* @__PURE__ */ ce({
  __name: "LauncherMenus",
  setup(s) {
    const e = en, C = h(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), Q = h(() => ({
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
        const t = Xe(l);
        return await N.renameGroup(i, t), t;
      },
      apply: (i, l) => {
        e.folderMenu.groupName = l;
      },
      detachedError: F
    }), {
      editing: W,
      draft: D,
      busy: Y,
      message: ke,
      failed: Z,
      revision: fe
    } = f, {
      editing: j,
      draft: P,
      busy: O,
      message: me,
      failed: q,
      revision: pe
    } = x, v = V(!1), b = V(!1), y = V(!1);
    function ge() {
      v.value = !1, b.value = !1, y.value = !1;
    }
    function H() {
      e.folderMenu.groupName && x.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const Me = x.commit, ve = x.cancel;
    function J() {
      if (g.value) return;
      m.reset(), p.reset();
      const i = e.linkMenu.link;
      i && f.start({ id: i.id, title: i.title || "" }, i.title || "");
    }
    const be = f.commit, ye = f.cancel;
    function K(i, l) {
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
      const Ze = {
        title: l.title || "网站",
        url: l.url || "",
        icon: _,
        note: l.note || ""
      };
      r(), Ke.sendWebsiteShare(Ze, i);
    }
    function Oe() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), m.reset(), p.start({ id: i.id, note: i.note || "" }, i.note || ""));
    }
    const Ee = p.commit, $e = p.cancel;
    function r() {
      g.value || O.value || X.value && ne.value || ie.value && te.value || W.value && Z.value || j.value && q.value || (f.reset(), x.reset(), m.reset(), p.reset(), ge(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, o.closeAll(), o.dispatch("close"));
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
      H();
    }
    function De() {
      const i = e.folderMenu.groupName;
      o.closeFolderMenu(), o.dispatch("folder:toggle-size", { group: i });
    }
    function Pe(i) {
      e.folderMenu.flyoutOpen = !1;
      const l = e.folderMenu.groupName;
      o.closeFolderMenu(), o.dispatch("folder:move", { group: l, page: i });
    }
    function Ae(i) {
      if (i?.stopPropagation(), !b.value) {
        b.value = !0;
        return;
      }
      b.value = !1;
      const l = e.folderMenu.groupName;
      o.closeFolderMenu(), o.dispatch("folder:delete", { group: l });
    }
    function Re() {
      J();
    }
    function _e() {
      const i = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:change-icon", { link: i });
    }
    function Ie() {
      const i = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:move-out", { link: i });
    }
    function ze(i) {
      e.linkMenu.flyoutOpen = !1;
      const l = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:move", { link: l, page: i });
    }
    function Ve(i) {
      if (i?.stopPropagation(), !v.value) {
        v.value = !0;
        return;
      }
      v.value = !1;
      const l = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:delete", { link: l });
    }
    function Ge() {
      const i = e.pageMenu.pageName;
      o.closePageMenu(), o.dispatch("page:rename", { page: i });
    }
    function Qe(i) {
      if (i?.stopPropagation(), !y.value) {
        y.value = !0;
        return;
      }
      y.value = !1;
      const l = e.pageMenu.pageName;
      o.closePageMenu(), o.dispatch("page:delete", { page: l });
    }
    function We() {
      const i = e.blankMenu.page;
      o.closeBlankMenu(), o.dispatch("blank:create-large-folder", { page: i });
    }
    function Ye() {
      const i = e.blankMenu.page;
      o.closeBlankMenu(), o.dispatch("blank:create-medium-folder", { page: i });
    }
    return I(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      x.reset(), b.value = !1;
    }, { flush: "sync" }), I(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      f.reset(), m.reset(), p.reset(), v.value = !1;
    }, { flush: "sync" }), I(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      y.value = !1;
    }, { flush: "sync" }), (i, l) => (d(), k("div", an, [
      a("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, un),
      a("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).folderMenu.isOpen,
        style: B(C.value),
        onClickCapture: l[2] || (l[2] = (t) => K(t, n(O)))
      }, [
        M(de, {
          title: n(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: n(j),
          draft: n(P),
          "onUpdate:draft": l[0] || (l[0] = (t) => $(P) ? P.value = t : null),
          busy: n(O),
          revision: n(pe),
          failed: n(q),
          message: n(me),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: H,
          onCommit: n(Me),
          onCancel: n(ve)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        a("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: we
        }, " 重命名收藏夹 "),
        a("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: De
        }, c(n(e).folderMenu.sizeText), 1),
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
          onSelect: Pe
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (d(!0), k(G, null, ae(Be.value, (t) => (d(), k("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" }),
          onClick: (E) => oe(t, { id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" })
        }, [
          t.icon ? (d(), k("span", rn, c(t.icon), 1)) : z("", !0),
          a("span", null, c(t.label), 1)
        ], 8, dn))), 128)),
        a("button", {
          id: "folder-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": b.value }]),
          onClick: Ae
        }, c(b.value ? "确定？" : "删除文件夹"), 3)
      ], 44, sn),
      a("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, cn),
      a("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).linkMenu.isOpen,
        style: B(Q.value),
        onClickCapture: l[8] || (l[8] = (t) => K(t, g.value))
      }, [
        M(de, {
          title: n(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: n(W),
          draft: n(D),
          "onUpdate:draft": l[5] || (l[5] = (t) => $(D) ? D.value = t : null),
          busy: n(Y),
          revision: n(fe),
          failed: n(Z),
          message: n(ke),
          onStart: J,
          onCommit: n(be),
          onCancel: n(ye)
        }, {
          default: qe(() => [
            M(nn, {
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
            M(on, {
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
        n(e).linkMenu.link?.group && n(e).linkMenu.link.group !== "常用网站" ? (d(), k("button", {
          key: 0,
          type: "button",
          onClick: Ie
        }, "移出文件夹，放到外面")) : z("", !0),
        a("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Re
        }, " 重命名 "),
        M(ln, {
          id: "link-menu-send",
          visible: n(e).linkMenu.isOpen,
          disabled: g.value,
          onOpen: l[7] || (l[7] = (t) => n(e).linkMenu.flyoutOpen = !1),
          onSelect: Fe
        }, null, 8, ["visible", "disabled"]),
        a("button", {
          id: "link-menu-change-icon",
          type: "button",
          onClick: _e
        }, " 获取头像 "),
        (d(!0), k(G, null, ae(Ue.value, (t) => (d(), k("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: String(n(e).linkMenu.link?.id), title: n(e).linkMenu.link?.title || "", url: n(e).linkMenu.link?.url, kind: "link" }),
          onClick: (E) => n(e).linkMenu.link && oe(t, { id: String(n(e).linkMenu.link.id), title: n(e).linkMenu.link.title || "", url: n(e).linkMenu.link.url, kind: "link" })
        }, [
          t.icon ? (d(), k("span", mn, c(t.icon), 1)) : z("", !0),
          a("span", null, c(t.label), 1)
        ], 8, fn))), 128)),
        a("button", {
          id: "link-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": v.value }]),
          onClick: Ve
        }, c(v.value ? "确定？" : "删除网站"), 3)
      ], 44, kn),
      a("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, pn),
      a("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).pageMenu.isOpen,
        style: B(u.value)
      }, [
        a("p", Mn, "分区 · " + c(n(e).pageMenu.pageLabel), 1),
        a("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: Ge
        }, " 重命名分区 "),
        a("button", {
          id: "page-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": y.value }]),
          disabled: !n(e).pageMenu.canDelete,
          title: n(e).pageMenu.canDelete ? `删除「${n(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: Qe
        }, c(y.value ? "确定？" : "删除分区"), 11, vn)
      ], 12, gn),
      a("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, bn),
      a("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).blankMenu.isOpen,
        style: B(L.value)
      }, [
        a("button", {
          id: "blank-menu-create-folder",
          type: "button",
          onClick: We
        }, " 创建大文件夹 "),
        a("button", {
          id: "blank-menu-create-medium-folder",
          type: "button",
          onClick: Ye
        }, " 创建中文件夹 ")
      ], 12, yn)
    ]));
  }
});
export {
  On as default
};
