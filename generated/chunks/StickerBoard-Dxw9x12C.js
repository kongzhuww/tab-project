import { d as De, w as oe, L as Be, o as l, g as u, F as z, h as t, s as Qe, J as Je, f as Ze, j as fe, k as $, m as Me, C as V, t as c, i as E, e as ve, l as Ce, B as pe, u as s, n as ae, q as Se, b as C, y as Q, r as re, G as et, D as tt, A as $e, p as se, U as nt } from "./vendor-vue-D8gPZiit.js";
import { d as it, a as st, e as ot, b as at, o as rt, s as lt, w as ct, c as dt } from "./stickers.service-DDI7EXIX.js";
import { w as ut } from "./window-manager.store-B8yz4j-E.js";
import { u as ft } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { _ as Ie, t as x } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
const vt = ["data-folder-path", "aria-label", "aria-disabled", "onPointerdown", "onClick", "onKeydown", "onContextmenu"], pt = { class: "folder-info" }, mt = {
  key: 0,
  class: "folder-error",
  role: "alert"
}, ht = { class: "folder-info" }, bt = { class: "menu-heading" }, yt = ["disabled"], kt = ["disabled"], gt = {
  key: 0,
  class: "menu-note"
}, wt = { class: "menu-heading" }, _t = ["disabled"], xt = {
  key: 0,
  class: "menu-note"
}, Ct = {
  key: 1,
  class: "menu-note"
}, Pt = {
  key: 2,
  class: "folder-error",
  role: "alert"
}, Tt = { class: "menu-actions" }, Et = ["disabled"], Lt = ["disabled"], Ft = /* @__PURE__ */ De({
  __name: "StickerFolderCards",
  props: {
    folders: {},
    activePath: {},
    parentPath: {},
    active: { type: Boolean },
    busy: { type: Boolean },
    directoryBacked: { type: Boolean },
    canReorder: { type: Boolean },
    renameFolder: { type: Function },
    deleteFolder: { type: Function },
    reorderFolders: { type: Function }
  },
  emits: ["select"],
  setup(F, { emit: me }) {
    const f = F, he = me, M = C(null), D = C(null), W = Q(() => D.value || f.folders), y = C(!1), v = C(""), m = re({ visible: !1, x: 0, y: 0, folder: null, mode: "menu", name: "" }), R = C(null);
    function b() {
      y.value || (m.visible = !1, m.folder = null, v.value = "");
    }
    const { menuRef: i, style: J } = ft({ visible: () => m.visible && f.active, anchor: () => m, dismiss: b }), g = Q(() => !m.folder?.path || !f.directoryBacked && m.folder.path === "默认");
    function be(o, r) {
      !f.active || f.busy || y.value || (T(), Object.assign(m, { visible: !0, x: r.clientX, y: r.clientY, folder: { ...o }, mode: "menu", name: o.name }), v.value = "");
    }
    async function Z() {
      m.mode = "rename", await et(), R.value?.focus(), R.value?.select();
    }
    async function ye() {
      const o = m.folder;
      if (!(!o || g.value || y.value || f.busy || !f.active)) {
        y.value = !0, v.value = "";
        try {
          m.mode === "rename" ? await f.renameFolder(o.path, m.name.trim()) : m.mode === "delete" && await f.deleteFolder(o.path), m.visible = !1, m.folder = null;
        } catch (r) {
          v.value = r instanceof Error ? r.message : "操作未确认完成，请重新打开模块核对；未自动重试。";
        } finally {
          y.value = !1;
        }
      }
    }
    const d = re({ visible: !1, path: "", x: 0, y: 0, width: 0, height: 0, offsetX: 0, offsetY: 0, name: "", count: 0 });
    let U = null, le = 0, N = 0, B = 0, O = 0, S = null, K = "";
    function j() {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", te), window.removeEventListener("blur", T), window.removeEventListener("keydown", ne, !0), cancelAnimationFrame(B), B = 0, U = null, S = null;
    }
    function T() {
      d.visible && (O = performance.now() + 300), j(), d.visible = !1, d.path = "", D.value = null;
    }
    function ce(o, r) {
      if (r.button !== 0 || !f.canReorder || f.busy || y.value || !f.active) return;
      T(), b();
      const p = r.currentTarget, k = p.getBoundingClientRect();
      U = r.pointerId, le = r.clientX, N = r.clientY, K = f.parentPath, Object.assign(d, {
        path: o.path,
        x: r.clientX,
        y: r.clientY,
        width: k.width,
        height: k.height,
        offsetX: r.clientX - k.left,
        offsetY: r.clientY - k.top,
        name: o.name,
        count: o.count
      }), S = M.value?.closest(".sticker-packs") || null, window.addEventListener("pointermove", A, { passive: !1 }), window.addEventListener("pointerup", ee), window.addEventListener("pointercancel", te), window.addEventListener("blur", T), window.addEventListener("keydown", ne, !0);
    }
    function A(o) {
      o.pointerId === U && (!d.visible && Math.hypot(o.clientX - le, o.clientY - N) < 6 || (o.preventDefault(), d.visible || (d.visible = !0, D.value = [...f.folders]), d.x = o.clientX, d.y = o.clientY, B || (B = requestAnimationFrame(I))));
    }
    function I() {
      if (B = 0, !d.visible || !S || !M.value) return;
      const o = S.getBoundingClientRect();
      if (d.x >= o.left - 24 && d.x <= o.right + 24) {
        d.y < o.top + 28 ? S.scrollTop -= 7 : d.y > o.bottom - 28 && (S.scrollTop += 7);
        const r = [...M.value.querySelectorAll("[data-folder-path]")], p = (D.value || f.folders).filter((_) => _.path !== d.path), k = M.value.getBoundingClientRect().top;
        let q = 0;
        for (const _ of p) {
          const w = r.find((L) => L.dataset.folderPath === _.path);
          w && d.y > k + w.offsetTop + w.offsetHeight / 2 && q++;
        }
        const Y = f.folders.find((_) => _.path === d.path);
        if (Y) {
          const _ = [...p];
          _.splice(q, 0, Y), _.some((w, L) => w.path !== D.value?.[L]?.path) && (D.value = _);
        }
      }
      B = requestAnimationFrame(I);
    }
    async function ee(o) {
      if (o.pointerId !== U) return;
      if (!d.visible) {
        T();
        return;
      }
      const r = S?.getBoundingClientRect(), p = r && o.clientX >= r.left - 24 && o.clientX <= r.right + 24 && o.clientY >= r.top - 24 && o.clientY <= r.bottom + 24;
      d.x = o.clientX, d.y = o.clientY, cancelAnimationFrame(B), B = 0, p && I();
      const k = (D.value || f.folders).map((Y) => Y.path), q = k.some((Y, _) => Y !== f.folders[_]?.path);
      if (j(), d.visible = !1, O = performance.now() + 300, !p || !q || !f.active || f.busy) {
        T();
        return;
      }
      y.value = !0, v.value = "";
      try {
        await f.reorderFolders(K, k);
      } catch (Y) {
        v.value = Y instanceof Error ? Y.message : "排序保存未确认，请重新打开模块核对。";
      } finally {
        y.value = !1, D.value = null, d.path = "";
      }
    }
    function te(o) {
      o.pointerId === U && T();
    }
    function ne(o) {
      o.key === "Escape" && U !== null && (o.preventDefault(), o.stopPropagation(), T());
    }
    function h(o) {
      performance.now() < O || y.value || f.busy || he("select", o);
    }
    return oe(() => [f.active, f.parentPath, f.folders.map((o) => o.path).sort().join("\0")], () => {
      T(), y.value || b();
    }), Be(T), (o, r) => (l(), u(z, null, [
      t("div", {
        ref_key: "listRef",
        ref: M,
        class: "sticker-folder-cards-wrap"
      }, [
        Qe(Je, {
          tag: "div",
          name: "sticker-folder",
          class: "sticker-folder-cards"
        }, {
          default: Ze(() => [
            (l(!0), u(z, null, fe(W.value, (p) => (l(), u("div", {
              key: p.path,
              class: V(["sidebar-folder-card subfolder-card folder-card", { active: p.path === F.activePath, "is-dragging": d.visible && d.path === p.path, "can-sort": F.canReorder && !F.busy && !y.value }]),
              "data-folder-path": p.path,
              role: "button",
              tabindex: "0",
              "aria-label": p.name,
              "aria-disabled": F.busy || y.value,
              onPointerdown: (k) => ce(p, k),
              onDragstart: r[0] || (r[0] = $(() => {
              }, ["prevent"])),
              onClick: (k) => h(p.path),
              onKeydown: [
                Me($((k) => h(p.path), ["prevent"]), ["enter"]),
                Me($((k) => h(p.path), ["prevent"]), ["space"])
              ],
              onContextmenu: $((k) => be(p, k), ["prevent", "stop"])
            }, [
              r[5] || (r[5] = t("span", {
                class: "folder-icon",
                "aria-hidden": "true"
              }, "📁", -1)),
              t("div", pt, [
                t("strong", null, c(p.name), 1),
                t("small", null, c(p.count) + " 张图片", 1)
              ]),
              r[6] || (r[6] = t("span", {
                class: "folder-arrow",
                "aria-hidden": "true"
              }, "›", -1))
            ], 42, vt))), 128))
          ]),
          _: 1
        }),
        v.value && !m.visible ? (l(), u("p", mt, c(v.value), 1)) : E("", !0)
      ], 512),
      (l(), ve(Ce, { to: "body" }, [
        d.visible ? (l(), u("div", {
          key: 0,
          class: "folder-drag-ghost",
          style: pe({ left: `${d.x - d.offsetX}px`, top: `${d.y - d.offsetY}px`, width: `${d.width}px`, height: `${d.height}px` }),
          "aria-hidden": "true"
        }, [
          r[7] || (r[7] = t("span", { class: "folder-icon" }, "📁", -1)),
          t("div", ht, [
            t("strong", null, c(d.name), 1),
            t("small", null, c(d.count) + " 张图片", 1)
          ])
        ], 4)) : E("", !0),
        m.visible && F.active ? (l(), u("div", {
          key: 1,
          ref_key: "menuRef",
          ref: i,
          class: "folder-context-menu",
          style: pe(s(J)),
          onPointerdown: r[3] || (r[3] = $(() => {
          }, ["stop"])),
          onClick: r[4] || (r[4] = $(() => {
          }, ["stop"]))
        }, [
          m.mode === "menu" ? (l(), u(z, { key: 0 }, [
            t("strong", bt, c(m.folder?.name), 1),
            t("button", {
              type: "button",
              disabled: g.value || F.busy || y.value,
              onClick: Z
            }, "重命名", 8, yt),
            t("button", {
              type: "button",
              class: "danger",
              disabled: g.value || F.busy || y.value,
              onClick: r[1] || (r[1] = (p) => m.mode = "delete")
            }, "删除分类", 8, kt),
            g.value ? (l(), u("small", gt, "默认分类保留，用于接收未分类图片。")) : E("", !0)
          ], 64)) : (l(), u("form", {
            key: 1,
            onSubmit: $(ye, ["prevent"])
          }, [
            t("strong", wt, c(m.mode === "rename" ? "重命名分类" : "删除分类"), 1),
            m.mode === "rename" ? (l(), u(z, { key: 0 }, [
              ae(t("input", {
                ref_key: "nameInput",
                ref: R,
                "onUpdate:modelValue": r[2] || (r[2] = (p) => m.name = p),
                maxlength: "50",
                "aria-label": "分类新名称",
                disabled: y.value,
                required: ""
              }, null, 8, _t), [
                [Se, m.name]
              ]),
              F.directoryBacked ? (l(), u("small", xt, "只修改虚拟分类名称，不改磁盘目录或原图。")) : E("", !0)
            ], 64)) : (l(), u("p", Ct, c(F.directoryBacked ? "移除该分类及子分类，索引中的图片归入上一级；磁盘原图和目录均不改动。" : "移除该分类，图片转入默认分类，不删除图片。"), 1)),
            v.value ? (l(), u("p", Pt, c(v.value), 1)) : E("", !0),
            t("div", Tt, [
              t("button", {
                type: "button",
                disabled: y.value,
                onClick: b
              }, "取消", 8, Et),
              t("button", {
                type: "submit",
                disabled: y.value || F.busy,
                class: V({ danger: m.mode === "delete" })
              }, c(y.value ? "保存中…" : "确认"), 11, Lt)
            ])
          ], 32))
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), Mt = /* @__PURE__ */ Ie(Ft, [["__scopeId", "data-v-a708d170"]]), $t = { class: "vue-sticker-board-wrapper" }, Dt = {
  class: "card wide utility-workspace-stickers",
  id: "card-stickers"
}, Bt = {
  key: 0,
  role: "alert",
  class: "bad"
}, St = ["aria-label"], It = { class: "sticker-sidebar-top" }, Yt = { class: "sticker-sidebar-heading" }, At = { class: "sidebar-heading-title" }, Rt = ["placeholder"], Xt = ["title"], Ut = ["disabled"], Nt = {
  class: "subfolder-card-icon",
  "aria-hidden": "true"
}, Ot = { class: "subfolder-card-info" }, Kt = { class: "subfolder-card-name" }, Vt = { class: "subfolder-card-count" }, zt = {
  class: "subfolder-card-arrow",
  "aria-hidden": "true"
}, Wt = {
  key: 0,
  class: "sticker-empty"
}, qt = { class: "sticker-library" }, jt = { class: "sticker-library-header" }, Ht = { class: "library-title-group" }, Gt = { id: "sticker-library-title" }, Qt = { id: "sticker-library-count" }, Jt = {
  id: "sticker-items",
  class: "sticker-grid"
}, Zt = {
  key: 0,
  class: "sticker-empty"
}, en = {
  key: 1,
  class: "sticker-empty"
}, tn = {
  key: 2,
  class: "sticker-empty"
}, nn = ["onClick", "onContextmenu"], sn = ["src", "alt"], on = {
  key: 1,
  class: "sticker-badge-tag"
}, an = {
  key: 2,
  class: "sticker-copied-pill"
}, rn = ["onClick"], ln = {
  key: 0,
  class: "sticker-pagination",
  "aria-label": "表情包翻页导航"
}, cn = { class: "sticker-page-left" }, dn = { class: "sticker-page-summary" }, un = { class: "sticker-page-badge" }, fn = { class: "sticker-page-controls" }, vn = ["disabled"], pn = { class: "sticker-page-numbers" }, mn = {
  key: 0,
  class: "sticker-page-ellipsis"
}, hn = ["disabled", "onClick"], bn = ["disabled"], yn = { class: "sticker-page-right" }, kn = { class: "sticker-page-progress" }, gn = {
  key: 0,
  class: "sticker-menu-classify"
}, wn = ["disabled"], _n = {
  value: "__choose__",
  disabled: ""
}, xn = ["value"], Cn = ["disabled"], Pn = { class: "sticker-lightbox-info" }, Tn = { class: "sticker-lightbox-actions" }, En = { class: "sticker-lightbox-body" }, Ln = ["src", "alt"], Fn = /* @__PURE__ */ De({
  __name: "StickerBoard",
  props: {
    dockOwned: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !0 }
  },
  setup(F) {
    function me() {
      lt.open("storage", "stickers"), ut.activate("settings");
    }
    const f = C("__choose__");
    async function he() {
      const e = h.item, n = f.value;
      !e || n === "__choose__" || g.value || (L(), X(), await H("assign-item", { item: e, path: n }));
    }
    const M = F, D = C(!document.hidden);
    let W = !1, y = 0;
    function v() {
      return !W && M.active && D.value;
    }
    function m(e) {
      return ct(e);
    }
    const R = M.dockOwned ? it() : st, b = M.dockOwned ? new ot(R, v, m, 120) : at, i = R.state, J = C(!1), g = Q(() => J.value || dt.pendingWrites > 0), be = Q(() => i.subFolders.length ? i.subFolders : i.activePath ? [{ name: i.displayTitle, path: i.activePath, count: i.totalCount }] : []);
    async function Z(e, n) {
      if (!v() || g.value || i.loading) throw new Error("目录正在读取或保存，请稍后再操作。");
      L(), X(), J.value = !0;
      try {
        await R.dispatch(e, n);
      } finally {
        J.value = !1;
      }
    }
    function ye(e, n) {
      return Z("rename-folder", { path: e, name: n });
    }
    function d(e) {
      return Z("delete-folder", { path: e });
    }
    function U(e, n) {
      return Z("reorder-folders", { parentPath: e, paths: n });
    }
    const le = !!document.getElementById("vue-sticker-standalone-root"), N = C(!1), B = C(!1), O = C(""), S = C(null);
    oe(() => i.activePath, () => {
      S.value && (S.value.scrollTop = 0);
    }, { flush: "post" });
    const K = C(null), j = C(!1), T = C(""), ce = C(!1);
    let A, I, ee, te, ne;
    const h = re({ visible: !1, x: 0, y: 0, item: null, isConfirmingDelete: !1 }), o = re({ visible: !1, item: null }), r = re({ x: 24, y: 80 });
    let p;
    function k() {
      p = void 0, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", k), window.removeEventListener("blur", k);
    }
    function q(e) {
      if (!v() || !p || e.buttons === 0) {
        k();
        return;
      }
      r.x = Math.max(8, Math.min(window.innerWidth - 100, p.x + e.clientX - p.mouseX)), r.y = Math.max(8, Math.min(window.innerHeight - 40, p.y + e.clientY - p.mouseY));
    }
    function Y(e) {
      !v() || e.button !== 0 || e.target.closest("button") || (e.preventDefault(), k(), p = { mouseX: e.clientX, mouseY: e.clientY, x: r.x, y: r.y }, window.addEventListener("mousemove", q), window.addEventListener("mouseup", k), window.addEventListener("blur", k));
    }
    function _() {
      N.value = le || document.body.dataset.mode === "sidepanel" || window.innerWidth < 680;
    }
    function w(e, n = !1) {
      W || (T.value = e, ce.value = n, I !== void 0 && clearTimeout(I), v() && (I = setTimeout(() => {
        T.value = "", I = void 0;
      }, 3200)));
    }
    function L() {
      h.visible = !1, h.item = null, h.isConfirmingDelete = !1;
    }
    let ie = "", ke = 0;
    function X() {
      ++ke, ie && URL.revokeObjectURL(ie), ie = "", o.visible = !1, o.item = null, k();
    }
    function de() {
      y++, b.pauseReads(), L(), X(), te?.abort(), te = void 0, ne?.abort(), ne = void 0, A !== void 0 && clearTimeout(A), I !== void 0 && clearTimeout(I), A = void 0, I = void 0, K.value = null, window.removeEventListener("resize", _);
    }
    const Ye = M.dockOwned ? rt(de) : () => {
    };
    function Pe() {
      D.value = !document.hidden, document.hidden ? de() : M.active && (_(), window.addEventListener("resize", _), b.activate());
    }
    oe(() => M.active, (e) => {
      e ? D.value && (_(), window.addEventListener("resize", _), b.activate()) : de();
    }, { flush: "sync" });
    function ge(e) {
      v() && e.key === "Escape" && (o.visible ? X() : L());
    }
    function we(e) {
      e.target?.closest?.(".sticker-context-menu") || L();
    }
    oe(() => [h.visible, o.visible], () => {
      const e = h.visible || o.visible;
      window.removeEventListener("keydown", ge), document.removeEventListener("pointerdown", we, !0), e && v() && (window.addEventListener("keydown", ge), h.visible && document.addEventListener("pointerdown", we, !0));
    }, { flush: "sync" }), oe(() => i.hasFolder, (e) => {
      e || (L(), X());
    }), tt(() => {
      M.dockOwned && (b.onToast = w), b.enableBoardPaging(), ee = b.attachBoard(), b.init(), _(), document.addEventListener("visibilitychange", Pe), v() && window.addEventListener("resize", _);
    }), Be(() => {
      W = !0, de(), Ye(), ee?.(), document.removeEventListener("visibilitychange", Pe), document.removeEventListener("pointerdown", we, !0), window.removeEventListener("keydown", ge), b.dispose();
    });
    async function H(e, n) {
      if (v()) {
        if (g.value) {
          w("操作尚未结束，请稍候；没有自动排队。");
          return;
        }
        try {
          await R.dispatch(e, n);
        } catch (a) {
          w(e === "delete-item" ? a?.message || "删除未确认，请刷新核对，不要重复删除。" : "操作未完成，目录关联或部分文件可能已保存，请核对后再操作；未自动重试。", !0);
        }
      }
    }
    async function Ae() {
      const e = O.value.trim();
      if (!(!e || !v() || g.value))
        try {
          await R.dispatch("create-folder", e), W || (O.value = "");
        } catch {
          w("新建或后续读取失败，请核对目录后再操作。", !0);
        }
    }
    function Re(e) {
      const a = e.currentTarget?.querySelector(".sticker-packs");
      if (!a || e.target instanceof Node && a.contains(e.target)) return;
      const P = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? e.deltaY * a.clientHeight : e.deltaY;
      a.scrollTop += P;
    }
    const Xe = Q(() => i.folders.find((e) => e.path === "")?.itemCount || i.totalCount);
    function Te(e) {
      g.value || (L(), X(), H("select-folder", e), N.value && (B.value = !1));
    }
    const Ee = C(null);
    async function Ue() {
      if (!v() || g.value) return;
      const e = b.getActiveTargetHandle();
      if (i.storageKind === "directory" && (!e || !await b.ensureHandlePermission(e.handle))) {
        w("请先在图库设置中授权读取或允许添加图片。", !0);
        return;
      }
      v() && Ee.value?.click();
    }
    function _e() {
      const e = document.getElementById("sticker-items");
      e && e.scrollTo({ top: 0, behavior: "smooth" });
    }
    const Ne = Q(() => {
      const e = i.totalPages, n = i.currentPage;
      if (e <= 7)
        return Array.from({ length: e }, (ue, Ge) => Ge + 1);
      const a = [1];
      n > 3 && a.push(-1);
      const P = Math.max(2, n - 1), G = Math.min(e - 1, n + 1);
      for (let ue = P; ue <= G; ue++)
        a.push(ue);
      return n < e - 2 && a.push(-1), a.push(e), a;
    });
    function Oe(e) {
      e < 1 || e > i.totalPages || e === i.currentPage || g.value || (H("go-page", e), _e());
    }
    function Ke() {
      H("prev-page"), _e();
    }
    function Ve() {
      H("next-page"), _e();
    }
    async function Le(e) {
      if (!v() || g.value || !e.length) return;
      if (e.length > 50) {
        w("一次最多导入50张，请分批；已在图库文件夹中的图片无需再次导入。", !0);
        return;
      }
      const n = b.getActiveTargetHandle();
      if (!n) {
        if (i.storageKind !== "indexeddb") {
          w("请先在设置中重新授权图库，未转存到内置库。", !0);
          return;
        }
        try {
          await m(() => b.saveFilesToIndexedDb(e)), w(`✓ 已保存 ${e.length} 张表情到内置库`);
        } catch {
          w("保存表情失败，请稍后重试", !0);
        }
        return;
      }
      try {
        await m(() => b.saveFilesToDir(n.handle, e, n.name));
      } catch {
        w("保存未完成，可能已有部分文件写入，请核对；未自动重试。", !0);
      }
    }
    function ze(e) {
      const n = e.target, a = Array.from(n.files || []);
      n.value = "", Le(a);
    }
    async function We(e) {
      const n = e.dataTransfer;
      if (!n || !v() || g.value) return;
      const a = Array.from(n.files);
      if (a.length) {
        await Le(a);
        return;
      }
      const P = b.extractImageUrlFromTransfer(n) || b.droppedUrl(n);
      if (!P) {
        w("未识别到可拖入的图片内容。", !0);
        return;
      }
      const G = b.getActiveTargetHandle();
      if (!G) {
        if (i.storageKind !== "indexeddb") {
          w("请先在设置中重新授权图库，未转存到内置库。", !0);
          return;
        }
        try {
          await m(() => b.saveUrlToIndexedDb(P)), w("✓ 已保存网络表情到内置库");
        } catch {
          w("读取或保存网络表情失败，请核对。", !0);
        }
        return;
      }
      try {
        await m(() => b.saveUrlToDir(G.handle, P, G.name));
      } catch {
        w("读取或保存失败，请核对目录；未自动重试。", !0);
      }
    }
    async function xe(e) {
      if (!v() || j.value) return;
      j.value = !0;
      const n = y;
      try {
        if (!await b.copyItem(e) || !v() || n !== y) return;
        K.value = e.id, A !== void 0 && clearTimeout(A), A = setTimeout(() => {
          K.value = null, A = void 0;
        }, 1800);
      } finally {
        W || (j.value = !1);
      }
    }
    function Fe(e, n) {
      n.preventDefault(), n.stopPropagation(), v() && (h.item = e, h.isConfirmingDelete = !1, f.value = "__choose__", h.x = Math.max(8, Math.min(n.clientX, window.innerWidth - 250)), h.y = Math.max(8, Math.min(n.clientY, window.innerHeight - 280)), h.visible = !0);
    }
    function qe() {
      const e = h.item;
      L(), e && xe(e);
    }
    async function je() {
      const e = h.item, n = y;
      L(), X();
      const a = ke;
      if (e)
        try {
          const P = await b.readItemBlob(e);
          if (!v() || n !== y || a !== ke) return;
          ie = URL.createObjectURL(P), r.x = Math.max(8, window.innerWidth - 700), r.y = 80, o.item = { ...e, url: ie }, o.visible = !0;
        } catch {
          w("原图读取失败，请核对图库授权。", !0);
        }
    }
    function He(e) {
      if (e.stopPropagation(), !h.item || g.value) return;
      if (i.storageKind !== "directory" && !h.isConfirmingDelete) {
        h.isConfirmingDelete = !0;
        return;
      }
      const n = h.item;
      L(), X(), H("delete-item", n);
    }
    return (e, n) => (l(), u("div", $t, [
      ae(t("section", Dt, [
        T.value && ce.value ? (l(), u("p", Bt, c(T.value), 1)) : E("", !0),
        t("div", {
          class: V(["sticker-layout", { "is-narrow-layout": N.value }])
        }, [
          ae(t("aside", {
            class: V(["sticker-sidebar", { "is-drawer": N.value }]),
            "aria-label": s(x)("stickers.sidebarAria"),
            onWheelPassive: Re
          }, [
            t("div", It, [
              t("div", Yt, [
                t("span", At, "🏷️ " + c(s(x)("stickers.categories")), 1)
              ]),
              t("form", {
                id: "sticker-pack-form",
                class: "sticker-pack-form",
                onSubmit: $(Ae, ["prevent"])
              }, [
                ae(t("input", {
                  id: "sticker-pack-name",
                  "onUpdate:modelValue": n[0] || (n[0] = (a) => O.value = a),
                  maxlength: "40",
                  placeholder: s(x)("stickers.newCategoryPlaceholder"),
                  autocomplete: "off",
                  required: ""
                }, null, 8, Rt), [
                  [Se, O.value]
                ]),
                t("button", {
                  type: "submit",
                  title: s(x)("stickers.createTitle")
                }, c(s(x)("stickers.create")), 9, Xt)
              ], 32)
            ]),
            s(i).hasFolder ? (l(), u("button", {
              key: 0,
              type: "button",
              class: V(["sidebar-folder-card subfolder-card sidebar-navigation-card", { active: s(i).parentPath === null && s(i).activePath === "" }]),
              disabled: g.value || s(i).loading,
              onClick: n[1] || (n[1] = (a) => Te(s(i).parentPath ?? ""))
            }, [
              t("span", Nt, c(s(i).parentPath !== null ? "⬅" : "🗂️"), 1),
              t("span", Ot, [
                t("strong", Kt, c(s(i).parentPath !== null ? s(x)("stickers.backToParent") : s(x)("stickers.allStickers")), 1),
                t("span", Vt, c(s(i).parentPath !== null ? s(x)("stickers.currentFolder", { name: s(i).displayTitle }) : s(x)("stickers.countText", { count: Xe.value })), 1)
              ]),
              t("span", zt, c(s(i).parentPath !== null ? "‹" : "›"), 1)
            ], 10, Ut)) : E("", !0),
            t("nav", {
              ref_key: "folderList",
              ref: S,
              id: "sticker-packs",
              class: "sticker-packs",
              "aria-label": "表情包分类列表"
            }, [
              !s(i).hasFolder && (!s(i).subFolders || s(i).subFolders.length === 0) ? (l(), u("div", Wt, c(s(i).loading ? s(x)("stickers.reading") : s(x)("stickers.notReady")), 1)) : (l(), ve(Mt, {
                key: 1,
                folders: be.value,
                "active-path": s(i).activePath,
                "parent-path": s(i).storageKind === "indexeddb" ? "" : s(i).activePath,
                active: v(),
                busy: g.value || s(i).loading,
                "directory-backed": s(i).storageKind === "directory",
                "can-reorder": s(i).subFolders.length > 1,
                "rename-folder": ye,
                "delete-folder": d,
                "reorder-folders": U,
                onSelect: Te
              }, null, 8, ["folders", "active-path", "parent-path", "active", "busy", "directory-backed", "can-reorder"]))
            ], 512)
          ], 42, St), [
            [$e, !N.value || B.value]
          ]),
          t("div", {
            class: "sticker-main-pane",
            onDragover: n[2] || (n[2] = $(() => {
            }, ["prevent"])),
            onDrop: $(We, ["prevent"])
          }, [
            t("input", {
              id: "sticker-file-input",
              ref_key: "fileInput",
              ref: Ee,
              type: "file",
              accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
              multiple: "",
              hidden: "",
              onChange: ze
            }, null, 544),
            t("section", qt, [
              t("header", jt, [
                t("div", Ht, [
                  t("strong", Gt, c(s(i).displayTitle), 1),
                  t("span", Qt, c(s(i).totalCountText), 1)
                ]),
                t("button", {
                  type: "button",
                  class: "tool-btn",
                  onClick: me
                }, "图库设置"),
                t("button", {
                  type: "button",
                  class: "tool-btn sticker-quick-import-btn",
                  title: "导入图片到当前分类",
                  onClick: Ue
                }, " ＋ 导入图片 ")
              ]),
              t("div", Jt, [
                s(i).loading ? (l(), u("div", Zt, " 正在加载表情包… ")) : s(i).emptyText ? (l(), u("div", en, c(s(i).emptyText), 1)) : s(i).items.length === 0 ? (l(), u("div", tn, " 当前分类暂无表情包 · 可直接从电脑或网页拖入图片保存 ")) : (l(!0), u(z, { key: 3 }, fe(s(i).items, (a) => (l(), u("article", {
                  key: a.id,
                  class: V(["sticker-item", { "just-copied": K.value === a.id }]),
                  tabindex: "0",
                  title: "单击复制原图；右键查看、归类或删除图片",
                  onClick: (P) => xe(a),
                  onContextmenu: (P) => Fe(a, P)
                }, [
                  a.url ? (l(), u("img", {
                    key: 0,
                    src: a.url,
                    alt: a.file,
                    loading: "lazy"
                  }, null, 8, sn)) : E("", !0),
                  a.folderName ? (l(), u("span", on, c(a.folderName), 1)) : E("", !0),
                  K.value === a.id ? (l(), u("span", an, " ✓ 已复制 ")) : E("", !0),
                  t("footer", null, [
                    t("span", null, c(a.sizeText), 1),
                    t("button", {
                      type: "button",
                      title: "图片操作",
                      onClick: $((P) => Fe(a, P), ["stop"])
                    }, " ··· ", 8, rn)
                  ])
                ], 42, nn))), 128))
              ]),
              s(i).totalPages > 1 ? (l(), u("nav", ln, [
                t("div", cn, [
                  t("span", dn, [
                    n[8] || (n[8] = se("共 ", -1)),
                    t("strong", null, c(s(i).totalCount), 1),
                    n[9] || (n[9] = se(" 张", -1))
                  ]),
                  t("span", un, "每页 " + c(s(i).pageSize) + " 张", 1)
                ]),
                t("div", fn, [
                  t("button", {
                    type: "button",
                    class: "sticker-nav-btn",
                    disabled: g.value || s(i).currentPage <= 1,
                    title: "上一页",
                    onClick: Ke
                  }, " ‹ 上一页 ", 8, vn),
                  t("div", pn, [
                    (l(!0), u(z, null, fe(Ne.value, (a, P) => (l(), u(z, { key: P }, [
                      a === -1 ? (l(), u("span", mn, "…")) : (l(), u("button", {
                        key: 1,
                        type: "button",
                        class: V(["sticker-num-btn", { active: a === s(i).currentPage }]),
                        disabled: g.value,
                        onClick: (G) => Oe(a)
                      }, c(a), 11, hn))
                    ], 64))), 128))
                  ]),
                  t("button", {
                    type: "button",
                    class: "sticker-nav-btn",
                    disabled: g.value || s(i).currentPage >= s(i).totalPages,
                    title: "下一页",
                    onClick: Ve
                  }, " 下一页 › ", 8, bn)
                ]),
                t("div", yn, [
                  t("span", kn, c(s(i).currentPage) + " / " + c(s(i).totalPages), 1)
                ])
              ])) : E("", !0)
            ])
          ], 32)
        ], 2)
      ], 512), [
        [$e, v()]
      ]),
      (l(), ve(Ce, { to: "body" }, [
        h.visible ? (l(), u("div", {
          key: 0,
          class: "sticker-context-menu",
          style: pe({ left: `${h.x}px`, top: `${h.y}px` }),
          onClick: n[5] || (n[5] = $(() => {
          }, ["stop"]))
        }, [
          t("button", {
            type: "button",
            class: "sticker-menu-item",
            onClick: qe
          }, [
            n[10] || (n[10] = t("span", { class: "menu-icon" }, "📋", -1)),
            se(" " + c(s(x)("stickers.menu.copyImage")), 1)
          ]),
          t("button", {
            type: "button",
            class: "sticker-menu-item",
            onClick: je
          }, [
            n[11] || (n[11] = t("span", { class: "menu-icon" }, "🔍", -1)),
            se(" " + c(s(x)("stickers.menu.viewLarge")), 1)
          ]),
          s(i).storageKind === "directory" ? (l(), u("div", gn, [
            ae(t("select", {
              "onUpdate:modelValue": n[3] || (n[3] = (a) => f.value = a),
              "aria-label": "选择图片分类",
              disabled: g.value
            }, [
              t("option", _n, c(s(x)("stickers.menu.chooseCategory")), 1),
              (l(!0), u(z, null, fe(s(i).folders, (a) => (l(), u("option", {
                key: a.path,
                value: a.path
              }, c(a.path ? `${"－".repeat(a.depth)}${a.name}` : "未分类（全部中保留）"), 9, xn))), 128))
            ], 8, wn), [
              [nt, f.value]
            ]),
            t("button", {
              type: "button",
              class: "sticker-menu-item",
              disabled: g.value || f.value === "__choose__",
              onClick: he
            }, c(s(x)("stickers.menu.saveCategory")), 9, Cn)
          ])) : E("", !0),
          n[13] || (n[13] = t("div", { class: "sticker-menu-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: V(["sticker-menu-item danger", { "is-confirming": h.isConfirmingDelete }]),
            onClick: n[4] || (n[4] = (a) => He(a))
          }, [
            n[12] || (n[12] = t("span", { class: "menu-icon" }, "🗑️", -1)),
            se(" " + c(s(i).storageKind === "directory" ? s(x)("stickers.menu.deleteDiskOriginal") : h.isConfirmingDelete ? s(x)("stickers.menu.confirmDeleteBuiltin") : s(x)("stickers.menu.deleteBuiltin")), 1)
          ], 2)
        ], 4)) : E("", !0)
      ])),
      (l(), ve(Ce, { to: "body" }, [
        o.visible && o.item ? (l(), u("div", {
          key: 0,
          class: "sticker-lightbox-window",
          style: pe({ left: `${r.x}px`, top: `${r.y}px` })
        }, [
          t("div", {
            class: "sticker-lightbox-dialog",
            onClick: n[7] || (n[7] = $(() => {
            }, ["stop"]))
          }, [
            t("header", {
              class: "sticker-lightbox-head",
              onMousedown: Y
            }, [
              t("div", Pn, [
                t("strong", null, c(o.item.file), 1),
                t("small", null, c(o.item.sizeText) + " · 本地浮窗预览（拖动标题栏移动，Esc 关闭）", 1)
              ]),
              t("div", Tn, [
                t("button", {
                  type: "button",
                  class: "lightbox-action-btn copy",
                  title: "复制到剪贴板，支持直接在微信/QQ粘贴",
                  onClick: n[6] || (n[6] = (a) => xe(o.item))
                }, " 📋 复制图片 "),
                t("button", {
                  type: "button",
                  class: "lightbox-close-btn",
                  title: "关闭大图预览 (Esc)",
                  onClick: X
                }, " ✕ ")
              ])
            ], 32),
            t("div", En, [
              t("img", {
                src: o.item.url,
                alt: o.item.file,
                class: "sticker-lightbox-img"
              }, null, 8, Ln)
            ])
          ])
        ], 4)) : E("", !0)
      ]))
    ]));
  }
}), In = /* @__PURE__ */ Ie(Fn, [["__scopeId", "data-v-f3d92c06"]]);
export {
  In as S
};
