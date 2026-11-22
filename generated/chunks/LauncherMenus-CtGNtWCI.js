import { d as me, f as c, g as k, F as Q, l as He, u as i, k as T, h as o, q as O, t as d, B as v, w as V, P as F, i as ae, j as ue, n as U, A as Je, s as r } from "./vendor-vue-_upDT3S_.js";
import { u as Ke } from "./useMachine-DVONSfP9.js";
import "./_plugin-vue_export-helper-DtNgUcga.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { _ as We, I as Xe, u as $ } from "./useInlineTitleEdit-DBnOO5b5.js";
import { n as se } from "./store-BodPoZPS.js";
import { M as re, l as L, L as Ye } from "./search.service-I5ZPPxGy.js";
import { k as E, m as Ze, d as a } from "./drawer-store-Bgl7wnLO.js";
import { _ as de, L as ce, a as en } from "./LauncherMoveMenu-DV-Ki-hG.js";
import { w as nn } from "./web-task-store-XxOqv0xY.js";
import { w as tn } from "./main-JHkPnzTg.js";
const ln = ["title"], on = /* @__PURE__ */ me({
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
    const b = e;
    return (j, u) => (c(), k(Q, null, [
      s.editing ? (c(), He(i(We), {
        key: 0,
        "model-value": s.draft,
        busy: s.busy,
        revision: s.revision,
        "aria-invalid": s.failed || void 0,
        "aria-label": "网站备注",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "输入网站备注...",
        "onUpdate:modelValue": u[0] || (u[0] = (y) => b("update:draft", y)),
        onCommit: u[1] || (u[1] = (y) => b("commit")),
        onCancel: u[2] || (u[2] = (y) => b("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (c(), k("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = T((y) => b("start"), ["stop"]))
      }, [
        u[4] || (u[4] = o("span", { class: "link-menu-note-badge" }, "📝", -1)),
        o("span", {
          class: O(["link-menu-subtext", { "is-empty": !s.note }])
        }, d(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = o("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, ln)),
      v(i(Xe), {
        message: s.message,
        failed: s.failed
      }, null, 8, ["message", "failed"])
    ], 64));
  }
}), an = { class: "launcher-menus-island" }, un = ["hidden"], sn = ["hidden"], rn = ["disabled", "onClick"], dn = {
  key: 0,
  style: { "margin-right": "6px" }
}, cn = ["hidden"], mn = ["hidden"], kn = ["disabled", "onClick"], pn = {
  key: 0,
  style: { "margin-right": "6px" }
}, fn = ["hidden"], gn = ["hidden"], Mn = { id: "page-menu-title" }, vn = ["disabled", "title"], bn = ["hidden"], yn = ["hidden"], On = /* @__PURE__ */ me({
  __name: "LauncherMenus",
  setup(s) {
    const e = Ze, b = r(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), j = r(() => ({
      left: `${e.linkMenu.x}px`,
      top: `${e.linkMenu.y}px`
    })), u = r(() => ({
      left: `${e.pageMenu.x}px`,
      top: `${e.pageMenu.y}px`
    })), y = r(() => ({
      left: `${e.blankMenu.x}px`,
      top: `${e.blankMenu.y}px`
    })), x = (n) => {
      se.show({ appName: "常用网站", title: "网站编辑保存未完成", message: n, duration: 12e3 });
    }, p = $({
      save: (n, t) => L.renameLinkTitle(n.id, n.title, t),
      apply: (n, t) => {
        e.linkMenu.link?.id === n.id && (e.linkMenu.link = { ...e.linkMenu.link, title: t });
      },
      detachedError: x
    }), h = $({
      save: async (n, t) => {
        const l = Ye(t);
        return await L.renameGroup(n, l), l;
      },
      apply: (n, t) => {
        e.folderMenu.groupName = t;
      },
      detachedError: x
    }), {
      editing: q,
      draft: w,
      busy: G,
      message: ke,
      failed: H,
      revision: pe
    } = p, {
      editing: J,
      draft: B,
      busy: N,
      message: fe,
      failed: K,
      revision: ge
    } = h, D = Ke(E), _ = r(() => D.value.confirmingDelete === "link"), P = r(() => D.value.confirmingDelete === "folder"), R = r(() => D.value.confirmingDelete === "page");
    function M() {
      E.send({ type: "CANCEL_DELETE" });
    }
    function W() {
      e.folderMenu.groupName && h.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const Me = h.commit, ve = h.cancel;
    function X() {
      if (C.value) return;
      f.reset(), g.reset();
      const n = e.linkMenu.link;
      n && p.start({ id: n.id, title: n.title || "" }, n.title || "");
    }
    const be = p.commit, ye = p.cancel;
    function Y(n, t) {
      t && (n.preventDefault(), n.stopPropagation());
    }
    const f = $({
      save: (n, t) => L.editLinkUrl(n.id, n.url, t),
      apply: (n, t) => {
        e.linkMenu.link?.id === n.id && (e.linkMenu.link = { ...e.linkMenu.link, url: t });
      },
      detachedError: x
    }), {
      editing: Z,
      draft: A,
      busy: ee,
      message: he,
      failed: ne,
      revision: Ce
    } = f, g = $({
      save: (n, t) => L.editLinkNote(n.id, n.note, t),
      apply: (n, t) => {
        e.linkMenu.link?.id === n.id && (e.linkMenu.link = { ...e.linkMenu.link, note: t });
      },
      detachedError: x
    }), {
      editing: ie,
      draft: z,
      busy: te,
      message: Le,
      failed: le,
      revision: Ee
    } = g, C = r(() => G.value || ee.value || te.value);
    function Te() {
      const n = e.linkMenu.link;
      !n || C.value || (p.reset(), g.reset(), f.start({ id: n.id, url: n.url || "" }, n.url || ""));
    }
    const xe = f.commit, Ne = f.cancel;
    function Se() {
      const n = e.linkMenu.link;
      !n || C.value || (p.reset(), f.reset(), g.start({ id: n.id, note: n.note || "" }, n.note || ""));
    }
    const Fe = g.commit, Ue = g.cancel;
    function m() {
      C.value || N.value || Z.value && ne.value || ie.value && le.value || q.value && H.value || J.value && K.value || (p.reset(), h.reset(), f.reset(), g.reset(), M(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, a.closeAll(), a.dispatch("close"));
    }
    const $e = r(() => e.folderMenu.groupName ? re.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), Oe = r(() => {
      const n = e.linkMenu.link;
      return n ? re.getMenuActionsForTarget({
        id: String(n.id),
        title: n.title || "",
        url: n.url,
        kind: "link",
        source: "launcher"
      }) : [];
    });
    async function oe(n, t) {
      m();
      try {
        await n.execute(t);
      } catch (l) {
        se.show({ appName: "插件扩展", title: "执行失败", message: l?.message || "操作未完成" });
      }
    }
    function we() {
      W();
    }
    function Be() {
      const n = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:toggle-size", { group: n });
    }
    function De(n) {
      e.folderMenu.flyoutOpen = !1;
      const t = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:move", { group: t, page: n });
    }
    function _e(n) {
      if (n?.stopPropagation(), !P.value) {
        E.send({ type: "REQUEST_DELETE", target: "folder" });
        return;
      }
      M();
      const t = e.folderMenu.groupName;
      a.closeFolderMenu(), a.dispatch("folder:delete", { group: t });
    }
    function Pe() {
      X();
    }
    function Re() {
      const n = e.linkMenu.link;
      if (!n) return;
      const l = L.getState().links.find((Ge) => String(Ge.id) === String(n.id)) || n, S = globalThis.chrome;
      let I = l.customIcon || l.icon || "";
      !I && n.url && (I = L.getCachedIcon(n.url) || (S?.runtime?.id ? `chrome-extension://${S.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(n.url)}&size=32` : "")), tn.open({
        id: n.id,
        title: n.title || n.url || "",
        url: n.url || "",
        icon: I || void 0,
        note: n.note || void 0,
        category: n.group && n.group !== "常用网站" ? n.group : n.page || "常用网站",
        source: "launcher"
      }), a.closeLinkMenu();
    }
    function Ae() {
      const n = e.linkMenu.link;
      if (!n) return;
      const t = globalThis.chrome, l = n.url && t?.runtime?.id ? `chrome-extension://${t.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(n.url)}&size=32` : void 0;
      nn.open({
        id: n.id,
        title: n.title || n.url || "",
        url: n.url || "",
        icon: l,
        note: n.note || void 0,
        category: n.page || n.group || "常用网站",
        source: "launcher"
      }), a.closeLinkMenu();
    }
    function ze(n) {
      e.linkMenu.flyoutOpen = !1;
      const t = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:move", { link: t, page: n });
    }
    function Ie(n) {
      if (n?.stopPropagation(), !_.value) {
        E.send({ type: "REQUEST_DELETE", target: "link" });
        return;
      }
      M();
      const t = e.linkMenu.link;
      a.closeLinkMenu(), a.dispatch("link:delete", { link: t });
    }
    function Ve() {
      const n = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:rename", { page: n });
    }
    function Qe(n) {
      if (n?.stopPropagation(), !R.value) {
        E.send({ type: "REQUEST_DELETE", target: "page" });
        return;
      }
      M();
      const t = e.pageMenu.pageName;
      a.closePageMenu(), a.dispatch("page:delete", { page: t });
    }
    function je() {
      const n = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-large-folder", { page: n });
    }
    function qe() {
      const n = e.blankMenu.page;
      a.closeBlankMenu(), a.dispatch("blank:create-medium-folder", { page: n });
    }
    return V(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      h.reset(), M();
    }, { flush: "sync" }), V(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      p.reset(), f.reset(), g.reset(), M();
    }, { flush: "sync" }), V(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      M();
    }, { flush: "sync" }), (n, t) => (c(), k("div", an, [
      o("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).folderMenu.isOpen,
        onClick: m,
        onContextmenu: T(m, ["prevent"])
      }, null, 40, un),
      o("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).folderMenu.isOpen,
        style: U(b.value),
        onClickCapture: t[2] || (t[2] = (l) => Y(l, i(N)))
      }, [
        v(de, {
          title: i(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: i(J),
          draft: i(B),
          "onUpdate:draft": t[0] || (t[0] = (l) => F(B) ? B.value = l : null),
          busy: i(N),
          revision: i(ge),
          failed: i(K),
          message: i(fe),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: W,
          onCommit: i(Me),
          onCancel: i(ve)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        o("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: we
        }, " 重命名收藏夹 "),
        o("button", {
          id: "folder-menu-size",
          type: "button",
          onClick: Be
        }, d(i(e).folderMenu.sizeText), 1),
        v(ce, {
          id: "folder-menu-move-wrapper",
          "button-id": "folder-menu-move-page",
          "submenu-id": "folder-move-flyout",
          open: i(e).folderMenu.flyoutOpen,
          "onUpdate:open": t[1] || (t[1] = (l) => i(e).folderMenu.flyoutOpen = l),
          visible: i(e).folderMenu.isOpen,
          x: i(e).folderMenu.x,
          y: i(e).folderMenu.y,
          items: i(e).folderMenu.pages,
          disabled: !i(e).folderMenu.canMove || i(N),
          label: "移动到其他分区",
          title: i(e).folderMenu.canMove ? "将此大收藏夹添加到指定网站分区" : "当前只有一个分区，先新建分区再移动",
          onSelect: De
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (c(!0), k(Q, null, ae($e.value, (l) => (c(), k("button", {
          key: l.id,
          type: "button",
          disabled: l.disabled?.({ id: i(e).folderMenu.groupName, title: i(e).folderMenu.groupName, kind: "folder" }),
          onClick: (S) => oe(l, { id: i(e).folderMenu.groupName, title: i(e).folderMenu.groupName, kind: "folder" })
        }, [
          l.icon ? (c(), k("span", dn, d(l.icon), 1)) : ue("", !0),
          o("span", null, d(l.label), 1)
        ], 8, rn))), 128)),
        o("button", {
          id: "folder-menu-delete",
          type: "button",
          class: O(["danger", { "is-confirming": P.value }]),
          onClick: _e
        }, d(P.value ? "确定？" : "删除文件夹"), 3)
      ], 44, sn),
      o("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).linkMenu.isOpen,
        onClick: m,
        onContextmenu: T(m, ["prevent"])
      }, null, 40, cn),
      o("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).linkMenu.isOpen,
        style: U(j.value),
        onClickCapture: t[7] || (t[7] = (l) => Y(l, C.value))
      }, [
        v(de, {
          title: i(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: i(q),
          draft: i(w),
          "onUpdate:draft": t[5] || (t[5] = (l) => F(w) ? w.value = l : null),
          busy: i(G),
          revision: i(pe),
          failed: i(H),
          message: i(ke),
          onStart: X,
          onCommit: i(be),
          onCancel: i(ye)
        }, {
          default: Je(() => [
            v(en, {
              url: i(e).linkMenu.link?.url || "",
              editing: i(Z),
              draft: i(A),
              "onUpdate:draft": t[3] || (t[3] = (l) => F(A) ? A.value = l : null),
              busy: i(ee),
              revision: i(Ce),
              failed: i(ne),
              message: i(he),
              onStart: Te,
              onCommit: i(xe),
              onCancel: i(Ne)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            v(on, {
              note: i(e).linkMenu.link?.note || "",
              editing: i(ie),
              draft: i(z),
              "onUpdate:draft": t[4] || (t[4] = (l) => F(z) ? z.value = l : null),
              busy: i(te),
              revision: i(Ee),
              failed: i(le),
              message: i(Le),
              onStart: Se,
              onCommit: i(Fe),
              onCancel: i(Ue)
            }, null, 8, ["note", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"])
          ]),
          _: 1
        }, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        v(ce, {
          id: "link-menu-move-wrapper",
          "button-id": "link-menu-move",
          "submenu-id": "link-move-flyout",
          open: i(e).linkMenu.flyoutOpen,
          "onUpdate:open": t[6] || (t[6] = (l) => i(e).linkMenu.flyoutOpen = l),
          visible: i(e).linkMenu.isOpen,
          x: i(e).linkMenu.x,
          y: i(e).linkMenu.y,
          items: i(e).linkMenu.pages,
          disabled: C.value,
          "vertical-budget": 280,
          onSelect: ze
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        o("button", {
          id: "link-menu-preview",
          type: "button",
          onClick: Re
        }, " 预览 "),
        o("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Pe
        }, " 重命名 "),
        o("button", {
          id: "link-menu-create-task",
          type: "button",
          onClick: Ae
        }, " 创建任务 "),
        (c(!0), k(Q, null, ae(Oe.value, (l) => (c(), k("button", {
          key: l.id,
          type: "button",
          disabled: l.disabled?.({ id: String(i(e).linkMenu.link?.id), title: i(e).linkMenu.link?.title || "", url: i(e).linkMenu.link?.url, kind: "link" }),
          onClick: (S) => i(e).linkMenu.link && oe(l, { id: String(i(e).linkMenu.link.id), title: i(e).linkMenu.link.title || "", url: i(e).linkMenu.link.url, kind: "link" })
        }, [
          l.icon ? (c(), k("span", pn, d(l.icon), 1)) : ue("", !0),
          o("span", null, d(l.label), 1)
        ], 8, kn))), 128)),
        o("button", {
          id: "link-menu-delete",
          type: "button",
          class: O(["danger", { "is-confirming": _.value }]),
          onClick: Ie
        }, d(_.value ? "确定？" : "删除网站"), 3)
      ], 44, mn),
      o("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).pageMenu.isOpen,
        onClick: m,
        onContextmenu: T(m, ["prevent"])
      }, null, 40, fn),
      o("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).pageMenu.isOpen,
        style: U(u.value)
      }, [
        o("p", Mn, "分区 · " + d(i(e).pageMenu.pageLabel), 1),
        o("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: Ve
        }, " 重命名分区 "),
        o("button", {
          id: "page-menu-delete",
          type: "button",
          class: O(["danger", { "is-confirming": R.value }]),
          disabled: !i(e).pageMenu.canDelete,
          title: i(e).pageMenu.canDelete ? `删除「${i(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: Qe
        }, d(R.value ? "确定？" : "删除分区"), 11, vn)
      ], 12, gn),
      o("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !i(e).blankMenu.isOpen,
        onClick: m,
        onContextmenu: T(m, ["prevent"])
      }, null, 40, bn),
      o("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !i(e).blankMenu.isOpen,
        style: U(y.value)
      }, [
        o("button", {
          id: "blank-menu-create-folder",
          type: "button",
          onClick: je
        }, " 创建大文件夹 "),
        o("button", {
          id: "blank-menu-create-medium-folder",
          type: "button",
          onClick: qe
        }, " 创建中文件夹 ")
      ], 12, yn)
    ]));
  }
});
export {
  On as default
};
