import { d as ke, o as d, e as m, F as j, j as qe, u as n, h as x, i as o, A as B, t as k, p as v, w as V, O as F, g as ue, f as Q, z as $, H as Je, s as c } from "./vendor-vue-9b0eS4bW.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { _ as Ke, I as Xe, u as U } from "./useInlineTitleEdit-CTt9CSo8.js";
import { D as Ye, n as se } from "./view-styles-BJv4828I.js";
import { a as L, a0 as de, $ as Ze } from "./search.service-wriY3nvN.js";
import { m as en, g as y, c as a } from "./store-NeT4WGv0.js";
import { _ as re, L as ce, a as nn } from "./LauncherMoveMenu-BGzDuoXZ.js";
import { C as ln } from "./ChatShareMenu-DCiYB8N_.js";
import { w as tn } from "./web-task-store-DMFbdA_S.js";
const on = ["title"], an = /* @__PURE__ */ ke({
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
    const h = e;
    return (G, u) => (d(), m(j, null, [
      s.editing ? (d(), qe(n(Ke), {
        key: 0,
        "model-value": s.draft,
        busy: s.busy,
        revision: s.revision,
        "aria-invalid": s.failed || void 0,
        "aria-label": "网站备注",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "输入网站备注...",
        "onUpdate:modelValue": u[0] || (u[0] = (C) => h("update:draft", C)),
        onCommit: u[1] || (u[1] = (C) => h("commit")),
        onCancel: u[2] || (u[2] = (C) => h("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (d(), m("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = x((C) => h("start"), ["stop"]))
      }, [
        u[4] || (u[4] = o("span", { class: "link-menu-note-badge" }, "📝", -1)),
        o("span", {
          class: B(["link-menu-subtext", { "is-empty": !s.note }])
        }, k(s.note || "添加网站备注..."), 3),
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
}, kn = ["hidden"], mn = ["hidden"], pn = ["disabled", "onClick"], fn = {
  key: 0,
  style: { "margin-right": "6px" }
}, gn = ["hidden"], Mn = ["hidden"], vn = { id: "page-menu-title" }, bn = ["disabled", "title"], yn = ["hidden"], hn = ["hidden"], $n = /* @__PURE__ */ ke({
  __name: "LauncherMenus",
  setup(s) {
    const e = en, h = c(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), G = c(() => ({
      left: `${e.linkMenu.x}px`,
      top: `${e.linkMenu.y}px`
    })), u = c(() => ({
      left: `${e.pageMenu.x}px`,
      top: `${e.pageMenu.y}px`
    })), C = c(() => ({
      left: `${e.blankMenu.x}px`,
      top: `${e.blankMenu.y}px`
    })), N = (i) => {
      se.show({ appName: "常用网站", title: "网站编辑保存未完成", message: i, duration: 12e3 });
    }, p = U({
      save: (i, l) => L.renameLinkTitle(i.id, i.title, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, title: l });
      },
      detachedError: N
    }), E = U({
      save: async (i, l) => {
        const t = Ze(l);
        return await L.renameGroup(i, t), t;
      },
      apply: (i, l) => {
        e.folderMenu.groupName = l;
      },
      detachedError: N
    }), {
      editing: H,
      draft: D,
      busy: W,
      message: me,
      failed: q,
      revision: pe
    } = p, {
      editing: J,
      draft: w,
      busy: S,
      message: fe,
      failed: K,
      revision: ge
    } = E, _ = c(() => y.isConfirming("link")), R = c(() => y.isConfirming("folder")), A = c(() => y.isConfirming("page"));
    function b() {
      y.send({ type: "CANCEL_DELETE" });
    }
    function X() {
      e.folderMenu.groupName && E.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const Me = E.commit, ve = E.cancel;
    function Y() {
      if (M.value) return;
      f.reset(), g.reset();
      const i = e.linkMenu.link;
      i && p.start({ id: i.id, title: i.title || "" }, i.title || "");
    }
    const be = p.commit, ye = p.cancel;
    function Z(i, l) {
      l && (i.preventDefault(), i.stopPropagation());
    }
    const f = U({
      save: (i, l) => L.editLinkUrl(i.id, i.url, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, url: l });
      },
      detachedError: N
    }), {
      editing: ee,
      draft: P,
      busy: ne,
      message: he,
      failed: ie,
      revision: Ce
    } = f, g = U({
      save: (i, l) => L.editLinkNote(i.id, i.note, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, note: l });
      },
      detachedError: N
    }), {
      editing: le,
      draft: z,
      busy: te,
      message: Ee,
      failed: oe,
      revision: Le
    } = g, M = c(() => W.value || ne.value || te.value);
    function Te() {
      const i = e.linkMenu.link;
      !i || M.value || (p.reset(), g.reset(), f.start({ id: i.id, url: i.url || "" }, i.url || ""));
    }
    const xe = f.commit, Ne = f.cancel;
    function Se(i) {
      const l = e.linkMenu.link;
      if (!l || M.value) return;
      const O = L.getState().links.find((T) => String(T.id) === String(l.id)) || l;
      let I = O.customIcon || O.icon || "";
      if (!I && l.url) {
        const T = L.getCachedIcon(l.url);
        T && T.length <= 64 * 1024 && (I = T);
      }
      const We = {
        title: l.title || "网站",
        url: l.url || "",
        icon: I,
        note: l.note || ""
      };
      r(), Ye.sendWebsiteShare(We, i);
    }
    function Oe() {
      const i = e.linkMenu.link;
      !i || M.value || (p.reset(), f.reset(), g.start({ id: i.id, note: i.note || "" }, i.note || ""));
    }
    const Fe = g.commit, $e = g.cancel;
    function r() {
      M.value || S.value || ee.value && ie.value || le.value && oe.value || H.value && q.value || J.value && K.value || (p.reset(), E.reset(), f.reset(), g.reset(), b(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, a.closeAll(), a.dispatch("close"));
    }
    const Ue = c(() => e.folderMenu.groupName ? de.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), Be = c(() => {
      const i = e.linkMenu.link;
      return i ? de.getMenuActionsForTarget({
        id: String(i.id),
        title: i.title || "",
        url: i.url,
        kind: "link",
        source: "launcher"
      }) : [];
    });
    async function ae(i, l) {
      r();
      try {
        await i.execute(l);
      } catch (t) {
        se.show({ appName: "插件扩展", title: "执行失败", message: t?.message || "操作未完成" });
      }
    }
    function De() {
      X();
    }
    function we() {
      const i = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:toggle-size", { group: i });
    }
    function _e(i) {
      e.folderMenu.flyoutOpen = !1;
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:move", { group: l, page: i });
    }
    function Re(i) {
      if (i?.stopPropagation(), !R.value) {
        y.send({ type: "REQUEST_DELETE", target: "folder" });
        return;
      }
      b();
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:delete", { group: l });
    }
    function Ae() {
      Y();
    }
    function Pe() {
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
      if (i?.stopPropagation(), !_.value) {
        y.send({ type: "REQUEST_DELETE", target: "link" });
        return;
      }
      b();
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:delete", { link: l });
    }
    function Qe() {
      const i = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:rename", { page: i });
    }
    function je(i) {
      if (i?.stopPropagation(), !A.value) {
        y.send({ type: "REQUEST_DELETE", target: "page" });
        return;
      }
      b();
      const l = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:delete", { page: l });
    }
    function Ge() {
      const i = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-large-folder", { page: i });
    }
    function He() {
      const i = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-medium-folder", { page: i });
    }
    return V(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      E.reset(), b();
    }, { flush: "sync" }), V(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      p.reset(), f.reset(), g.reset(), b();
    }, { flush: "sync" }), V(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      b();
    }, { flush: "sync" }), (i, l) => (d(), m("div", un, [
      o("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, sn),
      o("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).folderMenu.isOpen,
        style: $(h.value),
        onClickCapture: l[2] || (l[2] = (t) => Z(t, n(S)))
      }, [
        v(re, {
          title: n(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: n(J),
          draft: n(w),
          "onUpdate:draft": l[0] || (l[0] = (t) => F(w) ? w.value = t : null),
          busy: n(S),
          revision: n(ge),
          failed: n(K),
          message: n(fe),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: X,
          onCommit: n(Me),
          onCancel: n(ve)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        o("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: De
        }, " 重命名收藏夹 "),
        o("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: we
        }, k(n(e).folderMenu.sizeText), 1),
        v(ce, {
          id: "folder-menu-move-wrapper",
          "button-id": "folder-menu-move-page",
          "submenu-id": "folder-move-flyout",
          open: n(e).folderMenu.flyoutOpen,
          "onUpdate:open": l[1] || (l[1] = (t) => n(e).folderMenu.flyoutOpen = t),
          visible: n(e).folderMenu.isOpen,
          x: n(e).folderMenu.x,
          y: n(e).folderMenu.y,
          items: n(e).folderMenu.pages,
          disabled: !n(e).folderMenu.canMove || n(S),
          label: "移动到其他分区",
          title: n(e).folderMenu.canMove ? "将此大收藏夹添加到指定网站分区" : "当前只有一个分区，先新建分区再移动",
          onSelect: _e
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (d(!0), m(j, null, ue(Ue.value, (t) => (d(), m("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" }),
          onClick: (O) => ae(t, { id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" })
        }, [
          t.icon ? (d(), m("span", cn, k(t.icon), 1)) : Q("", !0),
          o("span", null, k(t.label), 1)
        ], 8, rn))), 128)),
        o("button", {
          id: "folder-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": R.value }]),
          onClick: Re
        }, k(R.value ? "确定？" : "删除文件夹"), 3)
      ], 44, dn),
      o("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, kn),
      o("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).linkMenu.isOpen,
        style: $(G.value),
        onClickCapture: l[8] || (l[8] = (t) => Z(t, M.value))
      }, [
        v(re, {
          title: n(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: n(H),
          draft: n(D),
          "onUpdate:draft": l[5] || (l[5] = (t) => F(D) ? D.value = t : null),
          busy: n(W),
          revision: n(pe),
          failed: n(q),
          message: n(me),
          onStart: Y,
          onCommit: n(be),
          onCancel: n(ye)
        }, {
          default: Je(() => [
            v(nn, {
              url: n(e).linkMenu.link?.url || "",
              editing: n(ee),
              draft: n(P),
              "onUpdate:draft": l[3] || (l[3] = (t) => F(P) ? P.value = t : null),
              busy: n(ne),
              revision: n(Ce),
              failed: n(ie),
              message: n(he),
              onStart: Te,
              onCommit: n(xe),
              onCancel: n(Ne)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            v(an, {
              note: n(e).linkMenu.link?.note || "",
              editing: n(le),
              draft: n(z),
              "onUpdate:draft": l[4] || (l[4] = (t) => F(z) ? z.value = t : null),
              busy: n(te),
              revision: n(Le),
              failed: n(oe),
              message: n(Ee),
              onStart: Oe,
              onCommit: n(Fe),
              onCancel: n($e)
            }, null, 8, ["note", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        v(ce, {
          id: "link-menu-move-wrapper",
          "button-id": "link-menu-move",
          "submenu-id": "link-move-flyout",
          open: n(e).linkMenu.flyoutOpen,
          "onUpdate:open": l[6] || (l[6] = (t) => n(e).linkMenu.flyoutOpen = t),
          visible: n(e).linkMenu.isOpen,
          x: n(e).linkMenu.x,
          y: n(e).linkMenu.y,
          items: n(e).linkMenu.pages,
          disabled: M.value,
          "vertical-budget": 280,
          onSelect: Ie
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        n(e).linkMenu.link?.group && n(e).linkMenu.link.group !== "常用网站" ? (d(), m("button", {
          key: 0,
          type: "button",
          onClick: Pe
        }, "移出文件夹，放到外面")) : Q("", !0),
        o("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Ae
        }, " 重命名 "),
        o("button", {
          id: "link-menu-create-task",
          type: "button",
          onClick: ze
        }, " 创建任务 "),
        v(ln, {
          id: "link-menu-send",
          visible: n(e).linkMenu.isOpen,
          disabled: M.value,
          onOpen: l[7] || (l[7] = (t) => n(e).linkMenu.flyoutOpen = !1),
          onSelect: Se
        }, null, 8, ["visible", "disabled"]),
        (d(!0), m(j, null, ue(Be.value, (t) => (d(), m("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: String(n(e).linkMenu.link?.id), title: n(e).linkMenu.link?.title || "", url: n(e).linkMenu.link?.url, kind: "link" }),
          onClick: (O) => n(e).linkMenu.link && ae(t, { id: String(n(e).linkMenu.link.id), title: n(e).linkMenu.link.title || "", url: n(e).linkMenu.link.url, kind: "link" })
        }, [
          t.icon ? (d(), m("span", fn, k(t.icon), 1)) : Q("", !0),
          o("span", null, k(t.label), 1)
        ], 8, pn))), 128)),
        o("button", {
          id: "link-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": _.value }]),
          onClick: Ve
        }, k(_.value ? "确定？" : "删除网站"), 3)
      ], 44, mn),
      o("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, gn),
      o("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).pageMenu.isOpen,
        style: $(u.value)
      }, [
        o("p", vn, "分区 · " + k(n(e).pageMenu.pageLabel), 1),
        o("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: Qe
        }, " 重命名分区 "),
        o("button", {
          id: "page-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": A.value }]),
          disabled: !n(e).pageMenu.canDelete,
          title: n(e).pageMenu.canDelete ? `删除「${n(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: je
        }, k(A.value ? "确定？" : "删除分区"), 11, bn)
      ], 12, Mn),
      o("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, yn),
      o("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).blankMenu.isOpen,
        style: $(C.value)
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
      ], 12, hn)
    ]));
  }
});
export {
  $n as default
};
