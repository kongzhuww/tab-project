import { d as me, o as d, e as m, F as G, j as Je, u as n, h as x, i as o, A as B, t as k, p as v, w as Q, O as F, g as se, f as j, z as $, H as Ke, s as c } from "./vendor-vue-BkY5-p5y.js";
import { u as Xe } from "./useMachine-DdzsCIFB.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
import { _ as Ye, I as Ze, u as U } from "./useInlineTitleEdit-BU_zoVPt.js";
import { B as en, n as de } from "./view-styles-yuz8wQEV.js";
import { a as E, a0 as re, $ as nn } from "./search.service-DF5Rt2Wp.js";
import { h as T, m as ln, d as a } from "./SearchBox-BEPEbzLb.js";
import { _ as ce, L as ke, a as tn } from "./LauncherMoveMenu-C0g017cw.js";
import { C as on } from "./ChatShareMenu-DWLI-XHx.js";
import { w as an } from "./web-task-store-BUMCcQnh.js";
const un = ["title"], sn = /* @__PURE__ */ me({
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
    const y = e;
    return (H, u) => (d(), m(G, null, [
      s.editing ? (d(), Je(n(Ye), {
        key: 0,
        "model-value": s.draft,
        busy: s.busy,
        revision: s.revision,
        "aria-invalid": s.failed || void 0,
        "aria-label": "网站备注",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "输入网站备注...",
        "onUpdate:modelValue": u[0] || (u[0] = (h) => y("update:draft", h)),
        onCommit: u[1] || (u[1] = (h) => y("commit")),
        onCancel: u[2] || (u[2] = (h) => y("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (d(), m("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = x((h) => y("start"), ["stop"]))
      }, [
        u[4] || (u[4] = o("span", { class: "link-menu-note-badge" }, "📝", -1)),
        o("span", {
          class: B(["link-menu-subtext", { "is-empty": !s.note }])
        }, k(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = o("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, un)),
      v(n(Ze), {
        message: s.message,
        failed: s.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), dn = { class: "launcher-menus-island" }, rn = ["hidden"], cn = ["hidden"], kn = ["disabled", "onClick"], mn = {
  key: 0,
  style: { "margin-right": "6px" }
}, pn = ["hidden"], fn = ["hidden"], gn = ["disabled", "onClick"], Mn = {
  key: 0,
  style: { "margin-right": "6px" }
}, vn = ["hidden"], bn = ["hidden"], yn = { id: "page-menu-title" }, hn = ["disabled", "title"], Cn = ["hidden"], En = ["hidden"], Dn = /* @__PURE__ */ me({
  __name: "LauncherMenus",
  setup(s) {
    const e = ln, y = c(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), H = c(() => ({
      left: `${e.linkMenu.x}px`,
      top: `${e.linkMenu.y}px`
    })), u = c(() => ({
      left: `${e.pageMenu.x}px`,
      top: `${e.pageMenu.y}px`
    })), h = c(() => ({
      left: `${e.blankMenu.x}px`,
      top: `${e.blankMenu.y}px`
    })), N = (i) => {
      de.show({ appName: "常用网站", title: "网站编辑保存未完成", message: i, duration: 12e3 });
    }, p = U({
      save: (i, l) => E.renameLinkTitle(i.id, i.title, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, title: l });
      },
      detachedError: N
    }), C = U({
      save: async (i, l) => {
        const t = nn(l);
        return await E.renameGroup(i, t), t;
      },
      apply: (i, l) => {
        e.folderMenu.groupName = l;
      },
      detachedError: N
    }), {
      editing: W,
      draft: D,
      busy: q,
      message: pe,
      failed: J,
      revision: fe
    } = p, {
      editing: K,
      draft: w,
      busy: S,
      message: ge,
      failed: X,
      revision: Me
    } = C, _ = Xe(T), R = c(() => _.value.confirmingDelete === "link"), A = c(() => _.value.confirmingDelete === "folder"), P = c(() => _.value.confirmingDelete === "page");
    function b() {
      T.send({ type: "CANCEL_DELETE" });
    }
    function Y() {
      e.folderMenu.groupName && C.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const ve = C.commit, be = C.cancel;
    function Z() {
      if (M.value) return;
      f.reset(), g.reset();
      const i = e.linkMenu.link;
      i && p.start({ id: i.id, title: i.title || "" }, i.title || "");
    }
    const ye = p.commit, he = p.cancel;
    function ee(i, l) {
      l && (i.preventDefault(), i.stopPropagation());
    }
    const f = U({
      save: (i, l) => E.editLinkUrl(i.id, i.url, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, url: l });
      },
      detachedError: N
    }), {
      editing: ne,
      draft: z,
      busy: ie,
      message: Ce,
      failed: le,
      revision: Ee
    } = f, g = U({
      save: (i, l) => E.editLinkNote(i.id, i.note, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, note: l });
      },
      detachedError: N
    }), {
      editing: te,
      draft: I,
      busy: oe,
      message: Le,
      failed: ae,
      revision: Te
    } = g, M = c(() => q.value || ie.value || oe.value);
    function xe() {
      const i = e.linkMenu.link;
      !i || M.value || (p.reset(), g.reset(), f.start({ id: i.id, url: i.url || "" }, i.url || ""));
    }
    const Ne = f.commit, Se = f.cancel;
    function Oe(i) {
      const l = e.linkMenu.link;
      if (!l || M.value) return;
      const O = E.getState().links.find((L) => String(L.id) === String(l.id)) || l;
      let V = O.customIcon || O.icon || "";
      if (!V && l.url) {
        const L = E.getCachedIcon(l.url);
        L && L.length <= 64 * 1024 && (V = L);
      }
      const qe = {
        title: l.title || "网站",
        url: l.url || "",
        icon: V,
        note: l.note || ""
      };
      r(), en.sendWebsiteShare(qe, i);
    }
    function Fe() {
      const i = e.linkMenu.link;
      !i || M.value || (p.reset(), f.reset(), g.start({ id: i.id, note: i.note || "" }, i.note || ""));
    }
    const $e = g.commit, Ue = g.cancel;
    function r() {
      M.value || S.value || ne.value && le.value || te.value && ae.value || W.value && J.value || K.value && X.value || (p.reset(), C.reset(), f.reset(), g.reset(), b(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, a.closeAll(), a.dispatch("close"));
    }
    const Be = c(() => e.folderMenu.groupName ? re.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), De = c(() => {
      const i = e.linkMenu.link;
      return i ? re.getMenuActionsForTarget({
        id: String(i.id),
        title: i.title || "",
        url: i.url,
        kind: "link",
        source: "launcher"
      }) : [];
    });
    async function ue(i, l) {
      r();
      try {
        await i.execute(l);
      } catch (t) {
        de.show({ appName: "插件扩展", title: "执行失败", message: t?.message || "操作未完成" });
      }
    }
    function we() {
      Y();
    }
    function _e() {
      const i = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:toggle-size", { group: i });
    }
    function Re(i) {
      e.folderMenu.flyoutOpen = !1;
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:move", { group: l, page: i });
    }
    function Ae(i) {
      if (i?.stopPropagation(), !A.value) {
        T.send({ type: "REQUEST_DELETE", target: "folder" });
        return;
      }
      b();
      const l = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:delete", { group: l });
    }
    function Pe() {
      Z();
    }
    function ze() {
      const i = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move-out", { link: i });
    }
    function Ie() {
      const i = e.linkMenu.link;
      if (!i) return;
      const l = globalThis.chrome, t = i.url && l?.runtime?.id ? `chrome-extension://${l.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(i.url)}&size=32` : void 0;
      an.open({
        id: i.id,
        title: i.title || i.url || "",
        url: i.url || "",
        icon: t,
        note: i.note || void 0,
        category: i.page || i.group || "常用网站",
        source: "launcher"
      }), a.closeLinkMenu();
    }
    function Ve(i) {
      e.linkMenu.flyoutOpen = !1;
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move", { link: l, page: i });
    }
    function Qe(i) {
      if (i?.stopPropagation(), !R.value) {
        T.send({ type: "REQUEST_DELETE", target: "link" });
        return;
      }
      b();
      const l = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:delete", { link: l });
    }
    function je() {
      const i = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:rename", { page: i });
    }
    function Ge(i) {
      if (i?.stopPropagation(), !P.value) {
        T.send({ type: "REQUEST_DELETE", target: "page" });
        return;
      }
      b();
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
    return Q(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      C.reset(), b();
    }, { flush: "sync" }), Q(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      p.reset(), f.reset(), g.reset(), b();
    }, { flush: "sync" }), Q(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      b();
    }, { flush: "sync" }), (i, l) => (d(), m("div", dn, [
      o("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, rn),
      o("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).folderMenu.isOpen,
        style: $(y.value),
        onClickCapture: l[2] || (l[2] = (t) => ee(t, n(S)))
      }, [
        v(ce, {
          title: n(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: n(K),
          draft: n(w),
          "onUpdate:draft": l[0] || (l[0] = (t) => F(w) ? w.value = t : null),
          busy: n(S),
          revision: n(Me),
          failed: n(X),
          message: n(ge),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: Y,
          onCommit: n(ve),
          onCancel: n(be)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        o("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: we
        }, " 重命名收藏夹 "),
        o("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: _e
        }, k(n(e).folderMenu.sizeText), 1),
        v(ke, {
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
          onSelect: Re
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (d(!0), m(G, null, se(Be.value, (t) => (d(), m("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" }),
          onClick: (O) => ue(t, { id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" })
        }, [
          t.icon ? (d(), m("span", mn, k(t.icon), 1)) : j("", !0),
          o("span", null, k(t.label), 1)
        ], 8, kn))), 128)),
        o("button", {
          id: "folder-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": A.value }]),
          onClick: Ae
        }, k(A.value ? "确定？" : "删除文件夹"), 3)
      ], 44, cn),
      o("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, pn),
      o("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).linkMenu.isOpen,
        style: $(H.value),
        onClickCapture: l[8] || (l[8] = (t) => ee(t, M.value))
      }, [
        v(ce, {
          title: n(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: n(W),
          draft: n(D),
          "onUpdate:draft": l[5] || (l[5] = (t) => F(D) ? D.value = t : null),
          busy: n(q),
          revision: n(fe),
          failed: n(J),
          message: n(pe),
          onStart: Z,
          onCommit: n(ye),
          onCancel: n(he)
        }, {
          default: Ke(() => [
            v(tn, {
              url: n(e).linkMenu.link?.url || "",
              editing: n(ne),
              draft: n(z),
              "onUpdate:draft": l[3] || (l[3] = (t) => F(z) ? z.value = t : null),
              busy: n(ie),
              revision: n(Ee),
              failed: n(le),
              message: n(Ce),
              onStart: xe,
              onCommit: n(Ne),
              onCancel: n(Se)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            v(sn, {
              note: n(e).linkMenu.link?.note || "",
              editing: n(te),
              draft: n(I),
              "onUpdate:draft": l[4] || (l[4] = (t) => F(I) ? I.value = t : null),
              busy: n(oe),
              revision: n(Te),
              failed: n(ae),
              message: n(Le),
              onStart: Fe,
              onCommit: n($e),
              onCancel: n(Ue)
            }, null, 8, ["note", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        v(ke, {
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
          onSelect: Ve
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        n(e).linkMenu.link?.group && n(e).linkMenu.link.group !== "常用网站" ? (d(), m("button", {
          key: 0,
          type: "button",
          onClick: ze
        }, "移出文件夹，放到外面")) : j("", !0),
        o("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Pe
        }, " 重命名 "),
        o("button", {
          id: "link-menu-create-task",
          type: "button",
          onClick: Ie
        }, " 创建任务 "),
        v(on, {
          id: "link-menu-send",
          visible: n(e).linkMenu.isOpen,
          disabled: M.value,
          onOpen: l[7] || (l[7] = (t) => n(e).linkMenu.flyoutOpen = !1),
          onSelect: Oe
        }, null, 8, ["visible", "disabled"]),
        (d(!0), m(G, null, se(De.value, (t) => (d(), m("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: String(n(e).linkMenu.link?.id), title: n(e).linkMenu.link?.title || "", url: n(e).linkMenu.link?.url, kind: "link" }),
          onClick: (O) => n(e).linkMenu.link && ue(t, { id: String(n(e).linkMenu.link.id), title: n(e).linkMenu.link.title || "", url: n(e).linkMenu.link.url, kind: "link" })
        }, [
          t.icon ? (d(), m("span", Mn, k(t.icon), 1)) : j("", !0),
          o("span", null, k(t.label), 1)
        ], 8, gn))), 128)),
        o("button", {
          id: "link-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": R.value }]),
          onClick: Qe
        }, k(R.value ? "确定？" : "删除网站"), 3)
      ], 44, fn),
      o("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, vn),
      o("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).pageMenu.isOpen,
        style: $(u.value)
      }, [
        o("p", yn, "分区 · " + k(n(e).pageMenu.pageLabel), 1),
        o("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: je
        }, " 重命名分区 "),
        o("button", {
          id: "page-menu-delete",
          type: "button",
          class: B(["danger", { "is-confirming": P.value }]),
          disabled: !n(e).pageMenu.canDelete,
          title: n(e).pageMenu.canDelete ? `删除「${n(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: Ge
        }, k(P.value ? "确定？" : "删除分区"), 11, hn)
      ], 12, bn),
      o("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: x(r, ["prevent"])
      }, null, 40, Cn),
      o("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).blankMenu.isOpen,
        style: $(h.value)
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
      ], 12, En)
    ]));
  }
});
export {
  Dn as default
};
