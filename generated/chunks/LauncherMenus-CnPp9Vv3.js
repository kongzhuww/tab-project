import { d as ce, o as d, e as k, F as j, j as Je, u as n, h as S, i as o, A as w, t as c, p as v, w as z, O as $, g as ae, f as I, z as U, H as Ke, s as h, b as V } from "./vendor-vue-9b0eS4bW.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { _ as Qe, I as Xe, u as B } from "./useInlineTitleEdit-CTt9CSo8.js";
import { A as Ye, n as ue } from "./view-styles-DlL1xl3w.js";
import { a as T, a0 as se, $ as Ze } from "./search.service-BeX-I1bn.js";
import { m as en, c as a } from "./store-Cp6MIqF9.js";
import { _ as de, L as re, a as nn } from "./LauncherMoveMenu-BGzDuoXZ.js";
import { C as ln } from "./ChatShareMenu-H3By0zRr.js";
import { w as tn } from "./web-task-store-DMFbdA_S.js";
const on = ["title"], an = /* @__PURE__ */ ce({
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
    return (G, u) => (d(), k(j, null, [
      s.editing ? (d(), Je(n(Qe), {
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
        u[4] || (u[4] = o("span", { class: "link-menu-note-badge" }, "📝", -1)),
        o("span", {
          class: w(["link-menu-subtext", { "is-empty": !s.note }])
        }, c(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = o("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, on)),
      v(n(Xe), {
        message: s.message,
        failed: s.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), un = { class: "launcher-menus-island" }, sn = ["hidden"], dn = ["hidden"], rn = ["disabled", "onClick"], cn = {
  key: 0,
  style: { "margin-right": "6px" }
}, kn = ["hidden"], fn = ["hidden"], mn = ["disabled", "onClick"], pn = {
  key: 0,
  style: { "margin-right": "6px" }
}, gn = ["hidden"], vn = ["hidden"], Mn = { id: "page-menu-title" }, bn = ["disabled", "title"], yn = ["hidden"], hn = ["hidden"], $n = /* @__PURE__ */ ce({
  __name: "LauncherMenus",
  setup(s) {
    const e = en, C = h(() => ({
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
    })), O = (i) => {
      ue.show({ appName: "常用网站", title: "网站编辑保存未完成", message: i, duration: 12e3 });
    }, f = B({
      save: (i, l) => T.renameLinkTitle(i.id, i.title, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, title: l });
      },
      detachedError: O
    }), x = B({
      save: async (i, l) => {
        const t = Ze(l);
        return await T.renameGroup(i, t), t;
      },
      apply: (i, l) => {
        e.folderMenu.groupName = l;
      },
      detachedError: O
    }), {
      editing: H,
      draft: A,
      busy: W,
      message: ke,
      failed: q,
      revision: fe
    } = f, {
      editing: J,
      draft: D,
      busy: F,
      message: me,
      failed: K,
      revision: pe
    } = x, M = V(!1), b = V(!1), y = V(!1);
    function ge() {
      M.value = !1, b.value = !1, y.value = !1;
    }
    function Q() {
      e.folderMenu.groupName && x.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const ve = x.commit, Me = x.cancel;
    function X() {
      if (g.value) return;
      m.reset(), p.reset();
      const i = e.linkMenu.link;
      i && f.start({ id: i.id, title: i.title || "" }, i.title || "");
    }
    const be = f.commit, ye = f.cancel;
    function Y(i, l) {
      l && (i.preventDefault(), i.stopPropagation());
    }
    const m = B({
      save: (i, l) => T.editLinkUrl(i.id, i.url, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, url: l });
      },
      detachedError: O
    }), {
      editing: Z,
      draft: P,
      busy: ee,
      message: he,
      failed: ne,
      revision: Ce
    } = m, p = B({
      save: (i, l) => T.editLinkNote(i.id, i.note, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, note: l });
      },
      detachedError: O
    }), {
      editing: ie,
      draft: R,
      busy: le,
      message: Le,
      failed: te,
      revision: xe
    } = p, g = h(() => W.value || ee.value || le.value);
    function Te() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), p.reset(), m.start({ id: i.id, url: i.url || "" }, i.url || ""));
    }
    const Ne = m.commit, Se = m.cancel;
    function Oe(i) {
      const l = e.linkMenu.link;
      if (!l || g.value) return;
      const E = T.getState().links.find((N) => String(N.id) === String(l.id)) || l;
      let _ = E.customIcon || E.icon || "";
      if (!_ && l.url) {
        const N = T.getCachedIcon(l.url);
        N && N.length <= 64 * 1024 && (_ = N);
      }
      const qe = {
        title: l.title || "网站",
        url: l.url || "",
        icon: _,
        note: l.note || ""
      };
      r(), Ye.sendWebsiteShare(qe, i);
    }
    function Fe() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), m.reset(), p.start({ id: i.id, note: i.note || "" }, i.note || ""));
    }
    const Ee = p.commit, $e = p.cancel;
    function r() {
      g.value || F.value || Z.value && ne.value || ie.value && te.value || H.value && q.value || J.value && K.value || (f.reset(), x.reset(), m.reset(), p.reset(), ge(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, a.closeAll(), a.dispatch("close"));
    }
    const Ue = h(() => e.folderMenu.groupName ? se.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), Be = h(() => {
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
      Q();
    }
    function Ae() {
      const i = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:toggle-size", { group: i });
    }
    function De(i) {
      e.folderMenu.flyoutOpen = !1;
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:move", { group: l, page: i });
    }
    function Pe(i) {
      if (i?.stopPropagation(), !b.value) {
        b.value = !0;
        return;
      }
      b.value = !1;
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:delete", { group: l });
    }
    function Re() {
      X();
    }
    function _e() {
      const i = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move-out", { link: i });
    }
    function ze() {
      const i = e.linkMenu.link;
      if (!i) return;
      const l = globalThis.chrome, t = i.url && l?.runtime?.id ? `chrome-extension://${l.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(i.url)}&size=32` : void 0;
      tn.open({
        id: i.id,
        title: i.title || i.url || "",
        url: i.url || "",
        icon: t,
        note: i.note || void 0,
        category: i.page || i.group || "常用网站",
        source: "launcher"
      }), a.closeLinkMenu();
    }
    function Ie(i) {
      e.linkMenu.flyoutOpen = !1;
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move", { link: l, page: i });
    }
    function Ve(i) {
      if (i?.stopPropagation(), !M.value) {
        M.value = !0;
        return;
      }
      M.value = !1;
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:delete", { link: l });
    }
    function je() {
      const i = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:rename", { page: i });
    }
    function Ge(i) {
      if (i?.stopPropagation(), !y.value) {
        y.value = !0;
        return;
      }
      y.value = !1;
      const l = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:delete", { page: l });
    }
    function He() {
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
      f.reset(), m.reset(), p.reset(), M.value = !1;
    }, { flush: "sync" }), z(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      y.value = !1;
    }, { flush: "sync" }), (i, l) => (d(), k("div", un, [
      o("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, sn),
      o("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).folderMenu.isOpen,
        style: U(C.value),
        onClickCapture: l[2] || (l[2] = (t) => Y(t, n(F)))
      }, [
        v(de, {
          title: n(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: n(J),
          draft: n(D),
          "onUpdate:draft": l[0] || (l[0] = (t) => $(D) ? D.value = t : null),
          busy: n(F),
          revision: n(pe),
          failed: n(K),
          message: n(me),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: Q,
          onCommit: n(ve),
          onCancel: n(Me)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        o("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: we
        }, " 重命名收藏夹 "),
        o("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: Ae
        }, c(n(e).folderMenu.sizeText), 1),
        v(re, {
          id: "folder-menu-move-wrapper",
          "button-id": "folder-menu-move-page",
          "submenu-id": "folder-move-flyout",
          open: n(e).folderMenu.flyoutOpen,
          "onUpdate:open": l[1] || (l[1] = (t) => n(e).folderMenu.flyoutOpen = t),
          visible: n(e).folderMenu.isOpen,
          x: n(e).folderMenu.x,
          y: n(e).folderMenu.y,
          items: n(e).folderMenu.pages,
          disabled: !n(e).folderMenu.canMove || n(F),
          label: "移动到其他分区",
          title: n(e).folderMenu.canMove ? "将此大收藏夹添加到指定网站分区" : "当前只有一个分区，先新建分区再移动",
          onSelect: De
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (d(!0), k(j, null, ae(Ue.value, (t) => (d(), k("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" }),
          onClick: (E) => oe(t, { id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" })
        }, [
          t.icon ? (d(), k("span", cn, c(t.icon), 1)) : I("", !0),
          o("span", null, c(t.label), 1)
        ], 8, rn))), 128)),
        o("button", {
          id: "folder-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": b.value }]),
          onClick: Pe
        }, c(b.value ? "确定？" : "删除文件夹"), 3)
      ], 44, dn),
      o("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, kn),
      o("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).linkMenu.isOpen,
        style: U(G.value),
        onClickCapture: l[8] || (l[8] = (t) => Y(t, g.value))
      }, [
        v(de, {
          title: n(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: n(H),
          draft: n(A),
          "onUpdate:draft": l[5] || (l[5] = (t) => $(A) ? A.value = t : null),
          busy: n(W),
          revision: n(fe),
          failed: n(q),
          message: n(ke),
          onStart: X,
          onCommit: n(be),
          onCancel: n(ye)
        }, {
          default: Ke(() => [
            v(nn, {
              url: n(e).linkMenu.link?.url || "",
              editing: n(Z),
              draft: n(P),
              "onUpdate:draft": l[3] || (l[3] = (t) => $(P) ? P.value = t : null),
              busy: n(ee),
              revision: n(Ce),
              failed: n(ne),
              message: n(he),
              onStart: Te,
              onCommit: n(Ne),
              onCancel: n(Se)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            v(an, {
              note: n(e).linkMenu.link?.note || "",
              editing: n(ie),
              draft: n(R),
              "onUpdate:draft": l[4] || (l[4] = (t) => $(R) ? R.value = t : null),
              busy: n(le),
              revision: n(xe),
              failed: n(te),
              message: n(Le),
              onStart: Fe,
              onCommit: n(Ee),
              onCancel: n($e)
            }, null, 8, ["note", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        v(re, {
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
          onSelect: Ie
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        n(e).linkMenu.link?.group && n(e).linkMenu.link.group !== "常用网站" ? (d(), k("button", {
          key: 0,
          type: "button",
          onClick: _e
        }, "移出文件夹，放到外面")) : I("", !0),
        o("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Re
        }, " 重命名 "),
        o("button", {
          id: "link-menu-create-task",
          type: "button",
          onClick: ze
        }, " 创建任务 "),
        v(ln, {
          id: "link-menu-send",
          visible: n(e).linkMenu.isOpen,
          disabled: g.value,
          onOpen: l[7] || (l[7] = (t) => n(e).linkMenu.flyoutOpen = !1),
          onSelect: Oe
        }, null, 8, ["visible", "disabled"]),
        (d(!0), k(j, null, ae(Be.value, (t) => (d(), k("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: String(n(e).linkMenu.link?.id), title: n(e).linkMenu.link?.title || "", url: n(e).linkMenu.link?.url, kind: "link" }),
          onClick: (E) => n(e).linkMenu.link && oe(t, { id: String(n(e).linkMenu.link.id), title: n(e).linkMenu.link.title || "", url: n(e).linkMenu.link.url, kind: "link" })
        }, [
          t.icon ? (d(), k("span", pn, c(t.icon), 1)) : I("", !0),
          o("span", null, c(t.label), 1)
        ], 8, mn))), 128)),
        o("button", {
          id: "link-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": M.value }]),
          onClick: Ve
        }, c(M.value ? "确定？" : "删除网站"), 3)
      ], 44, fn),
      o("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, gn),
      o("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).pageMenu.isOpen,
        style: U(u.value)
      }, [
        o("p", Mn, "分区 · " + c(n(e).pageMenu.pageLabel), 1),
        o("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: je
        }, " 重命名分区 "),
        o("button", {
          id: "page-menu-delete",
          type: "button",
          class: w(["danger", { "is-confirming": y.value }]),
          disabled: !n(e).pageMenu.canDelete,
          title: n(e).pageMenu.canDelete ? `删除「${n(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: Ge
        }, c(y.value ? "确定？" : "删除分区"), 11, bn)
      ], 12, vn),
      o("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: S(r, ["prevent"])
      }, null, 40, yn),
      o("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).blankMenu.isOpen,
        style: U(L.value)
      }, [
        o("button", {
          id: "blank-menu-create-folder",
          type: "button",
          onClick: He
        }, " 创建大文件夹 "),
        o("button", {
          id: "blank-menu-create-medium-folder",
          type: "button",
          onClick: We
        }, " 创建中文件夹 ")
      ], 12, hn)
    ]));
  }
});
export {
  $n as default
};
