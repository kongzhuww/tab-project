import { f as ce, g as d, h as k, F as W, I as He, x as n, k as O, i as a, s as D, t as c, l as M, w as A, M as w, z as ae, u as z, B, K as Je, c as h, b as V } from "./vendor-vue-BUkfvXUI.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DNUqqaI7.js";
import { _ as Xe, I as Ye, u as U } from "./useInlineTitleEdit-B07QlU7T.js";
import { l as C, L as Ze, R as ue, w as se, Q as en } from "./search.service-CipPV7Bz.js";
import { m as nn, c as o } from "./store-BDmF35tO.js";
import { _ as de, L as re, a as ln } from "./LauncherMoveMenu-DjISnIkf.js";
import { C as tn } from "./ChatShareMenu-9_HmFcNG.js";
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
    const L = e;
    return (G, u) => (d(), k(W, null, [
      s.editing ? (d(), He(n(Xe), {
        key: 0,
        "model-value": s.draft,
        busy: s.busy,
        revision: s.revision,
        "aria-invalid": s.failed || void 0,
        "aria-label": "网站备注",
        class: "link-menu-title-input link-menu-note-input",
        placeholder: "输入网站备注...",
        "onUpdate:modelValue": u[0] || (u[0] = (x) => L("update:draft", x)),
        onCommit: u[1] || (u[1] = (x) => L("commit")),
        onCancel: u[2] || (u[2] = (x) => L("cancel"))
      }, null, 8, ["model-value", "busy", "revision", "aria-invalid"])) : (d(), k("div", {
        key: 1,
        class: "link-menu-subtitle link-menu-note-row",
        title: "点击修改备注: " + (s.note || "无备注"),
        onClick: u[3] || (u[3] = O((x) => L("start"), ["stop"]))
      }, [
        u[4] || (u[4] = a("span", { class: "link-menu-note-badge" }, "📝", -1)),
        a("span", {
          class: D(["link-menu-subtext", { "is-empty": !s.note }])
        }, c(s.note || "添加网站备注..."), 3),
        u[5] || (u[5] = a("span", {
          class: "link-menu-title-edit-hint",
          "aria-hidden": "true"
        }, "✎", -1))
      ], 8, on)),
      M(n(Ye), {
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
}, gn = ["hidden"], Mn = ["hidden"], vn = { id: "page-menu-title" }, bn = ["disabled", "title"], yn = ["hidden"], hn = ["hidden"], On = /* @__PURE__ */ ce({
  __name: "LauncherMenus",
  setup(s) {
    const e = nn, L = h(() => ({
      left: `${e.folderMenu.x}px`,
      top: `${e.folderMenu.y}px`
    })), G = h(() => ({
      left: `${e.linkMenu.x}px`,
      top: `${e.linkMenu.y}px`
    })), u = h(() => ({
      left: `${e.pageMenu.x}px`,
      top: `${e.pageMenu.y}px`
    })), x = h(() => ({
      left: `${e.blankMenu.x}px`,
      top: `${e.blankMenu.y}px`
    })), E = (i) => {
      se.show({ appName: "常用网站", title: "网站编辑保存未完成", message: i, duration: 12e3 });
    }, f = U({
      save: (i, l) => C.renameLinkTitle(i.id, i.title, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, title: l });
      },
      detachedError: E
    }), N = U({
      save: async (i, l) => {
        const t = en(l);
        return await C.renameGroup(i, t), t;
      },
      apply: (i, l) => {
        e.folderMenu.groupName = l;
      },
      detachedError: E
    }), {
      editing: K,
      draft: I,
      busy: Q,
      message: ke,
      failed: j,
      revision: fe
    } = f, {
      editing: q,
      draft: P,
      busy: $,
      message: me,
      failed: H,
      revision: pe
    } = N, v = V(!1), b = V(!1), y = V(!1);
    function ge() {
      v.value = !1, b.value = !1, y.value = !1;
    }
    function J() {
      e.folderMenu.groupName && N.start(e.folderMenu.groupName, e.folderMenu.groupName);
    }
    const Me = N.commit, ve = N.cancel;
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
    const m = U({
      save: (i, l) => C.editLinkUrl(i.id, i.url, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, url: l });
      },
      detachedError: E
    }), {
      editing: Z,
      draft: R,
      busy: ee,
      message: he,
      failed: ne,
      revision: Ce
    } = m, p = U({
      save: (i, l) => C.editLinkNote(i.id, i.note, l),
      apply: (i, l) => {
        e.linkMenu.link?.id === i.id && (e.linkMenu.link = { ...e.linkMenu.link, note: l });
      },
      detachedError: E
    }), {
      editing: ie,
      draft: _,
      busy: le,
      message: Le,
      failed: te,
      revision: xe
    } = p, g = h(() => Q.value || ee.value || le.value);
    function Ne() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), p.reset(), m.start({ id: i.id, url: i.url || "" }, i.url || ""));
    }
    const Se = m.commit, Te = m.cancel;
    function Fe(i) {
      const l = e.linkMenu.link;
      if (!l || g.value) return;
      const S = C.getState().links.find((F) => String(F.id) === String(l.id)) || l;
      let T = S.customIcon || S.icon || "";
      if (!T && l.url) {
        const F = C.getCachedIcon(l.url);
        F && F.length <= 64 * 1024 && (T = F);
      }
      const qe = {
        title: l.title || "网站",
        url: l.url || "",
        icon: T,
        note: l.note || ""
      };
      r(), Ze.sendWebsiteShare(qe, i);
    }
    function Oe() {
      const i = e.linkMenu.link;
      !i || g.value || (f.reset(), m.reset(), p.start({ id: i.id, note: i.note || "" }, i.note || ""));
    }
    const Ee = p.commit, $e = p.cancel;
    function r() {
      g.value || $.value || Z.value && ne.value || ie.value && te.value || K.value && j.value || q.value && H.value || (f.reset(), N.reset(), m.reset(), p.reset(), ge(), e.folderMenu.flyoutOpen = !1, e.linkMenu.flyoutOpen = !1, o.closeAll(), o.dispatch("close"));
    }
    const we = h(() => e.folderMenu.groupName ? ue.getMenuActionsForTarget({
      id: e.folderMenu.groupName,
      title: e.folderMenu.groupName,
      kind: "folder",
      source: "launcher"
    }) : []), Be = h(() => {
      const i = e.linkMenu.link;
      return i ? ue.getMenuActionsForTarget({
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
        se.show({ appName: "插件扩展", title: "执行失败", message: t?.message || "操作未完成" });
      }
    }
    function Ue() {
      J();
    }
    function De() {
      const i = e.folderMenu.groupName;
      o.closeFolderMenu(), o.dispatch("folder:toggle-size", { group: i });
    }
    function Ie(i) {
      e.folderMenu.flyoutOpen = !1;
      const l = e.folderMenu.groupName;
      o.closeFolderMenu(), o.dispatch("folder:move", { group: l, page: i });
    }
    function Pe(i) {
      if (i?.stopPropagation(), !b.value) {
        b.value = !0;
        return;
      }
      b.value = !1;
      const l = e.folderMenu.groupName;
      o.closeFolderMenu(), o.dispatch("folder:delete", { group: l });
    }
    function Re() {
      X();
    }
    function _e() {
      const i = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:change-icon", { link: i });
    }
    function Ae() {
      const i = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:move-out", { link: i });
    }
    async function ze() {
      const i = e.linkMenu.link;
      if (o.closeLinkMenu(), !i) return;
      const l = C.getState().links.find((t) => String(t.id) === String(i.id));
      try {
        const { addWorkbenchWeb: t } = await import("./workbench.store---R-eEes.js");
        t({
          id: String(i.id || `web_${Date.now()}`),
          title: i.title || "未命名网站",
          url: i.url || "",
          icon: l?.icon || "",
          customIcon: l?.customIcon || ""
        });
        const { notifications: S } = await import("./youtube-store--HTVWf9f.js").then((T) => T.n);
        S.show({
          appName: "海狸工作台",
          title: "已添加到工作台",
          message: `已将网站「${i.title || i.url}」放入常用参考`
        });
      } catch (t) {
        console.warn("添加网站到工作台失败", t);
      }
    }
    function Ve(i) {
      e.linkMenu.flyoutOpen = !1;
      const l = e.linkMenu.link;
      o.closeLinkMenu(), o.dispatch("link:move", { link: l, page: i });
    }
    function We(i) {
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
    function Ke(i) {
      if (i?.stopPropagation(), !y.value) {
        y.value = !0;
        return;
      }
      y.value = !1;
      const l = e.pageMenu.pageName;
      o.closePageMenu(), o.dispatch("page:delete", { page: l });
    }
    function Qe() {
      const i = e.blankMenu.page;
      o.closeBlankMenu(), o.dispatch("blank:create-large-folder", { page: i });
    }
    function je() {
      const i = e.blankMenu.page;
      o.closeBlankMenu(), o.dispatch("blank:create-medium-folder", { page: i });
    }
    return A(() => [e.folderMenu, e.folderMenu.isOpen], () => {
      N.reset(), b.value = !1;
    }, { flush: "sync" }), A(() => [e.linkMenu, e.linkMenu.isOpen], () => {
      f.reset(), m.reset(), p.reset(), v.value = !1;
    }, { flush: "sync" }), A(() => [e.pageMenu, e.pageMenu.isOpen], () => {
      y.value = !1;
    }, { flush: "sync" }), (i, l) => (d(), k("div", un, [
      a("div", {
        id: "folder-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).folderMenu.isOpen,
        onClick: r,
        onContextmenu: O(r, ["prevent"])
      }, null, 40, sn),
      a("div", {
        id: "folder-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).folderMenu.isOpen,
        style: B(L.value),
        onClickCapture: l[2] || (l[2] = (t) => Y(t, n($)))
      }, [
        M(de, {
          title: n(e).folderMenu.groupName,
          "title-id": "folder-menu-title",
          editing: n(q),
          draft: n(P),
          "onUpdate:draft": l[0] || (l[0] = (t) => w(P) ? P.value = t : null),
          busy: n($),
          revision: n(pe),
          failed: n(H),
          message: n(me),
          maxlength: 20,
          placeholder: "输入文件夹名称",
          onStart: J,
          onCommit: n(Me),
          onCancel: n(ve)
        }, null, 8, ["title", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
        a("button", {
          id: "folder-menu-rename",
          type: "button",
          onClick: Ue
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
          disabled: !n(e).folderMenu.canMove || n($),
          label: "移动到其他分区",
          title: n(e).folderMenu.canMove ? "将此大收藏夹添加到指定网站分区" : "当前只有一个分区，先新建分区再移动",
          onSelect: Ie
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled", "title"]),
        (d(!0), k(W, null, ae(we.value, (t) => (d(), k("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" }),
          onClick: (S) => oe(t, { id: n(e).folderMenu.groupName, title: n(e).folderMenu.groupName, kind: "folder" })
        }, [
          t.icon ? (d(), k("span", cn, c(t.icon), 1)) : z("", !0),
          a("span", null, c(t.label), 1)
        ], 8, rn))), 128)),
        a("button", {
          id: "folder-menu-delete",
          type: "button",
          class: D(["danger", { "is-confirming": b.value }]),
          onClick: Pe
        }, c(b.value ? "确定？" : "删除文件夹"), 3)
      ], 44, dn),
      a("div", {
        id: "link-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).linkMenu.isOpen,
        onClick: r,
        onContextmenu: O(r, ["prevent"])
      }, null, 40, kn),
      a("div", {
        id: "link-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).linkMenu.isOpen,
        style: B(G.value),
        onClickCapture: l[8] || (l[8] = (t) => Y(t, g.value))
      }, [
        M(de, {
          title: n(e).linkMenu.link?.title || "",
          "title-id": "link-menu-title",
          editing: n(K),
          draft: n(I),
          "onUpdate:draft": l[5] || (l[5] = (t) => w(I) ? I.value = t : null),
          busy: n(Q),
          revision: n(fe),
          failed: n(j),
          message: n(ke),
          onStart: X,
          onCommit: n(be),
          onCancel: n(ye)
        }, {
          default: Je(() => [
            M(ln, {
              url: n(e).linkMenu.link?.url || "",
              editing: n(Z),
              draft: n(R),
              "onUpdate:draft": l[3] || (l[3] = (t) => w(R) ? R.value = t : null),
              busy: n(ee),
              revision: n(Ce),
              failed: n(ne),
              message: n(he),
              onStart: Ne,
              onCommit: n(Se),
              onCancel: n(Te)
            }, null, 8, ["url", "editing", "draft", "busy", "revision", "failed", "message", "onCommit", "onCancel"]),
            M(an, {
              note: n(e).linkMenu.link?.note || "",
              editing: n(ie),
              draft: n(_),
              "onUpdate:draft": l[4] || (l[4] = (t) => w(_) ? _.value = t : null),
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
          onSelect: Ve
        }, null, 8, ["open", "visible", "x", "y", "items", "disabled"]),
        n(e).linkMenu.link?.group && n(e).linkMenu.link.group !== "常用网站" ? (d(), k("button", {
          key: 0,
          type: "button",
          onClick: Ae
        }, "移出文件夹，放到外面")) : z("", !0),
        a("button", {
          id: "link-menu-rename",
          type: "button",
          onClick: Re
        }, " 重命名 "),
        a("button", {
          id: "link-menu-send-workbench",
          type: "button",
          onClick: ze
        }, " 📌 发送到工作台 "),
        M(tn, {
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
        (d(!0), k(W, null, ae(Be.value, (t) => (d(), k("button", {
          key: t.id,
          type: "button",
          disabled: t.disabled?.({ id: String(n(e).linkMenu.link?.id), title: n(e).linkMenu.link?.title || "", url: n(e).linkMenu.link?.url, kind: "link" }),
          onClick: (S) => n(e).linkMenu.link && oe(t, { id: String(n(e).linkMenu.link.id), title: n(e).linkMenu.link.title || "", url: n(e).linkMenu.link.url, kind: "link" })
        }, [
          t.icon ? (d(), k("span", pn, c(t.icon), 1)) : z("", !0),
          a("span", null, c(t.label), 1)
        ], 8, mn))), 128)),
        a("button", {
          id: "link-menu-delete",
          type: "button",
          class: D(["danger", { "is-confirming": v.value }]),
          onClick: We
        }, c(v.value ? "确定？" : "删除网站"), 3)
      ], 44, fn),
      a("div", {
        id: "page-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).pageMenu.isOpen,
        onClick: r,
        onContextmenu: O(r, ["prevent"])
      }, null, 40, gn),
      a("div", {
        id: "page-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).pageMenu.isOpen,
        style: B(u.value)
      }, [
        a("p", vn, "分区 · " + c(n(e).pageMenu.pageLabel), 1),
        a("button", {
          id: "page-menu-rename",
          type: "button",
          onClick: Ge
        }, " 重命名分区 "),
        a("button", {
          id: "page-menu-delete",
          type: "button",
          class: D(["danger", { "is-confirming": y.value }]),
          disabled: !n(e).pageMenu.canDelete,
          title: n(e).pageMenu.canDelete ? `删除「${n(e).pageMenu.pageLabel}」分区` : "至少需要保留一个分区",
          onClick: Ke
        }, c(y.value ? "确定？" : "删除分区"), 11, bn)
      ], 12, Mn),
      a("div", {
        id: "blank-menu-backdrop",
        class: "folder-menu-backdrop",
        hidden: !n(e).blankMenu.isOpen,
        onClick: r,
        onContextmenu: O(r, ["prevent"])
      }, null, 40, yn),
      a("div", {
        id: "blank-menu",
        class: "folder-menu",
        role: "menu",
        hidden: !n(e).blankMenu.isOpen,
        style: B(x.value)
      }, [
        a("button", {
          id: "blank-menu-create-folder",
          type: "button",
          onClick: Qe
        }, " 创建大文件夹 "),
        a("button", {
          id: "blank-menu-create-medium-folder",
          type: "button",
          onClick: je
        }, " 创建中文件夹 ")
      ], 12, hn)
    ]));
  }
});
export {
  On as default
};
