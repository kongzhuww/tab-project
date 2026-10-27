import { d as $e, x as se, L as De, o as l, e as c, F as z, f as n, D as Ge, J as Qe, w as Je, h as ue, i as M, k as Fe, B as O, t as m, g as E, c as fe, j as xe, A as ve, u as r, l as oe, n as Be, b as x, s as G, r as ae, G as Ze, C as et, z as Me, m as ie, p as tt } from "./vendor-vue-DokqDua_.js";
import { u as nt, d as it, a as st, e as ot, b as at, o as rt, s as lt, w as dt, c as ct } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { w as ut } from "./window-manager.store-D_Nuf9-p.js";
import { _ as Se } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const ft = ["data-folder-path", "aria-label", "aria-disabled", "onPointerdown", "onClick", "onKeydown", "onContextmenu"], vt = { class: "folder-info" }, pt = {
  key: 0,
  class: "folder-error",
  role: "alert"
}, mt = { class: "folder-info" }, bt = { class: "menu-heading" }, ht = ["disabled"], yt = ["disabled"], gt = {
  key: 0,
  class: "menu-note"
}, kt = { class: "menu-heading" }, wt = ["disabled"], _t = {
  key: 0,
  class: "menu-note"
}, xt = {
  key: 1,
  class: "menu-note"
}, Ct = {
  key: 2,
  class: "folder-error",
  role: "alert"
}, Pt = { class: "menu-actions" }, Et = ["disabled"], Tt = ["disabled"], Lt = /* @__PURE__ */ $e({
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
  setup(L, { emit: pe }) {
    const u = L, me = pe, F = x(null), $ = x(null), V = G(() => $.value || u.folders), y = x(!1), f = x(""), p = ae({ visible: !1, x: 0, y: 0, folder: null, mode: "menu", name: "" }), X = x(null);
    function h() {
      y.value || (p.visible = !1, p.folder = null, f.value = "");
    }
    const { menuRef: i, style: Q } = nt({ visible: () => p.visible && u.active, anchor: () => p, dismiss: h }), k = G(() => !p.folder?.path || !u.directoryBacked && p.folder.path === "默认");
    function be(s, a) {
      !u.active || u.busy || y.value || (P(), Object.assign(p, { visible: !0, x: a.clientX, y: a.clientY, folder: { ...s }, mode: "menu", name: s.name }), f.value = "");
    }
    async function J() {
      p.mode = "rename", await Ze(), X.value?.focus(), X.value?.select();
    }
    async function he() {
      const s = p.folder;
      if (!(!s || k.value || y.value || u.busy || !u.active)) {
        y.value = !0, f.value = "";
        try {
          p.mode === "rename" ? await u.renameFolder(s.path, p.name.trim()) : p.mode === "delete" && await u.deleteFolder(s.path), p.visible = !1, p.folder = null;
        } catch (a) {
          f.value = a instanceof Error ? a.message : "操作未确认完成，请重新打开模块核对；未自动重试。";
        } finally {
          y.value = !1;
        }
      }
    }
    const d = ae({ visible: !1, path: "", x: 0, y: 0, width: 0, height: 0, offsetX: 0, offsetY: 0, name: "", count: 0 });
    let R = null, re = 0, N = 0, D = 0, U = 0, B = null, K = "";
    function j() {
      window.removeEventListener("pointermove", Y), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", ee), window.removeEventListener("blur", P), window.removeEventListener("keydown", te, !0), cancelAnimationFrame(D), D = 0, R = null, B = null;
    }
    function P() {
      d.visible && (U = performance.now() + 300), j(), d.visible = !1, d.path = "", $.value = null;
    }
    function le(s, a) {
      if (a.button !== 0 || !u.canReorder || u.busy || y.value || !u.active) return;
      P(), h();
      const v = a.currentTarget, g = v.getBoundingClientRect();
      R = a.pointerId, re = a.clientX, N = a.clientY, K = u.parentPath, Object.assign(d, {
        path: s.path,
        x: a.clientX,
        y: a.clientY,
        width: g.width,
        height: g.height,
        offsetX: a.clientX - g.left,
        offsetY: a.clientY - g.top,
        name: s.name,
        count: s.count
      }), B = F.value?.closest(".sticker-packs") || null, window.addEventListener("pointermove", Y, { passive: !1 }), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", ee), window.addEventListener("blur", P), window.addEventListener("keydown", te, !0);
    }
    function Y(s) {
      s.pointerId === R && (!d.visible && Math.hypot(s.clientX - re, s.clientY - N) < 6 || (s.preventDefault(), d.visible || (d.visible = !0, $.value = [...u.folders]), d.x = s.clientX, d.y = s.clientY, D || (D = requestAnimationFrame(S))));
    }
    function S() {
      if (D = 0, !d.visible || !B || !F.value) return;
      const s = B.getBoundingClientRect();
      if (d.x >= s.left - 24 && d.x <= s.right + 24) {
        d.y < s.top + 28 ? B.scrollTop -= 7 : d.y > s.bottom - 28 && (B.scrollTop += 7);
        const a = [...F.value.querySelectorAll("[data-folder-path]")], v = ($.value || u.folders).filter((_) => _.path !== d.path), g = F.value.getBoundingClientRect().top;
        let W = 0;
        for (const _ of v) {
          const w = a.find((T) => T.dataset.folderPath === _.path);
          w && d.y > g + w.offsetTop + w.offsetHeight / 2 && W++;
        }
        const I = u.folders.find((_) => _.path === d.path);
        if (I) {
          const _ = [...v];
          _.splice(W, 0, I), _.some((w, T) => w.path !== $.value?.[T]?.path) && ($.value = _);
        }
      }
      D = requestAnimationFrame(S);
    }
    async function Z(s) {
      if (s.pointerId !== R) return;
      if (!d.visible) {
        P();
        return;
      }
      const a = B?.getBoundingClientRect(), v = a && s.clientX >= a.left - 24 && s.clientX <= a.right + 24 && s.clientY >= a.top - 24 && s.clientY <= a.bottom + 24;
      d.x = s.clientX, d.y = s.clientY, cancelAnimationFrame(D), D = 0, v && S();
      const g = ($.value || u.folders).map((I) => I.path), W = g.some((I, _) => I !== u.folders[_]?.path);
      if (j(), d.visible = !1, U = performance.now() + 300, !v || !W || !u.active || u.busy) {
        P();
        return;
      }
      y.value = !0, f.value = "";
      try {
        await u.reorderFolders(K, g);
      } catch (I) {
        f.value = I instanceof Error ? I.message : "排序保存未确认，请重新打开模块核对。";
      } finally {
        y.value = !1, $.value = null, d.path = "";
      }
    }
    function ee(s) {
      s.pointerId === R && P();
    }
    function te(s) {
      s.key === "Escape" && R !== null && (s.preventDefault(), s.stopPropagation(), P());
    }
    function b(s) {
      performance.now() < U || y.value || u.busy || me("select", s);
    }
    return se(() => [u.active, u.parentPath, u.folders.map((s) => s.path).sort().join("\0")], () => {
      P(), y.value || h();
    }), De(P), (s, a) => (l(), c(z, null, [
      n("div", {
        ref_key: "listRef",
        ref: F,
        class: "sticker-folder-cards-wrap"
      }, [
        Ge(Qe, {
          tag: "div",
          name: "sticker-folder",
          class: "sticker-folder-cards"
        }, {
          default: Je(() => [
            (l(!0), c(z, null, ue(V.value, (v) => (l(), c("div", {
              key: v.path,
              class: O(["sidebar-folder-card subfolder-card folder-card", { active: v.path === L.activePath, "is-dragging": d.visible && d.path === v.path, "can-sort": L.canReorder && !L.busy && !y.value }]),
              "data-folder-path": v.path,
              role: "button",
              tabindex: "0",
              "aria-label": v.name,
              "aria-disabled": L.busy || y.value,
              onPointerdown: (g) => le(v, g),
              onDragstart: a[0] || (a[0] = M(() => {
              }, ["prevent"])),
              onClick: (g) => b(v.path),
              onKeydown: [
                Fe(M((g) => b(v.path), ["prevent"]), ["enter"]),
                Fe(M((g) => b(v.path), ["prevent"]), ["space"])
              ],
              onContextmenu: M((g) => be(v, g), ["prevent", "stop"])
            }, [
              a[5] || (a[5] = n("span", {
                class: "folder-icon",
                "aria-hidden": "true"
              }, "📁", -1)),
              n("div", vt, [
                n("strong", null, m(v.name), 1),
                n("small", null, m(v.count) + " 张图片", 1)
              ]),
              a[6] || (a[6] = n("span", {
                class: "folder-arrow",
                "aria-hidden": "true"
              }, "›", -1))
            ], 42, ft))), 128))
          ]),
          _: 1
        }),
        f.value && !p.visible ? (l(), c("p", pt, m(f.value), 1)) : E("", !0)
      ], 512),
      (l(), fe(xe, { to: "body" }, [
        d.visible ? (l(), c("div", {
          key: 0,
          class: "folder-drag-ghost",
          style: ve({ left: `${d.x - d.offsetX}px`, top: `${d.y - d.offsetY}px`, width: `${d.width}px`, height: `${d.height}px` }),
          "aria-hidden": "true"
        }, [
          a[7] || (a[7] = n("span", { class: "folder-icon" }, "📁", -1)),
          n("div", mt, [
            n("strong", null, m(d.name), 1),
            n("small", null, m(d.count) + " 张图片", 1)
          ])
        ], 4)) : E("", !0),
        p.visible && L.active ? (l(), c("div", {
          key: 1,
          ref_key: "menuRef",
          ref: i,
          class: "folder-context-menu",
          style: ve(r(Q)),
          onPointerdown: a[3] || (a[3] = M(() => {
          }, ["stop"])),
          onClick: a[4] || (a[4] = M(() => {
          }, ["stop"]))
        }, [
          p.mode === "menu" ? (l(), c(z, { key: 0 }, [
            n("strong", bt, m(p.folder?.name), 1),
            n("button", {
              type: "button",
              disabled: k.value || L.busy || y.value,
              onClick: J
            }, "重命名", 8, ht),
            n("button", {
              type: "button",
              class: "danger",
              disabled: k.value || L.busy || y.value,
              onClick: a[1] || (a[1] = (v) => p.mode = "delete")
            }, "删除分类", 8, yt),
            k.value ? (l(), c("small", gt, "默认分类保留，用于接收未分类图片。")) : E("", !0)
          ], 64)) : (l(), c("form", {
            key: 1,
            onSubmit: M(he, ["prevent"])
          }, [
            n("strong", kt, m(p.mode === "rename" ? "重命名分类" : "删除分类"), 1),
            p.mode === "rename" ? (l(), c(z, { key: 0 }, [
              oe(n("input", {
                ref_key: "nameInput",
                ref: X,
                "onUpdate:modelValue": a[2] || (a[2] = (v) => p.name = v),
                maxlength: "50",
                "aria-label": "分类新名称",
                disabled: y.value,
                required: ""
              }, null, 8, wt), [
                [Be, p.name]
              ]),
              L.directoryBacked ? (l(), c("small", _t, "只修改虚拟分类名称，不改磁盘目录或原图。")) : E("", !0)
            ], 64)) : (l(), c("p", xt, m(L.directoryBacked ? "移除该分类及子分类，索引中的图片归入上一级；磁盘原图和目录均不改动。" : "移除该分类，图片转入默认分类，不删除图片。"), 1)),
            f.value ? (l(), c("p", Ct, m(f.value), 1)) : E("", !0),
            n("div", Pt, [
              n("button", {
                type: "button",
                disabled: y.value,
                onClick: h
              }, "取消", 8, Et),
              n("button", {
                type: "submit",
                disabled: y.value || L.busy,
                class: O({ danger: p.mode === "delete" })
              }, m(y.value ? "保存中…" : "确认"), 11, Tt)
            ])
          ], 32))
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), Ft = /* @__PURE__ */ Se(Lt, [["__scopeId", "data-v-a708d170"]]), Mt = { class: "vue-sticker-board-wrapper" }, $t = {
  class: "card wide utility-workspace-stickers",
  id: "card-stickers"
}, Dt = {
  key: 0,
  role: "alert",
  class: "bad"
}, Bt = { class: "sticker-sidebar-top" }, St = ["disabled"], It = {
  class: "subfolder-card-icon",
  "aria-hidden": "true"
}, Yt = { class: "subfolder-card-info" }, Xt = { class: "subfolder-card-name" }, At = { class: "subfolder-card-count" }, Rt = {
  class: "subfolder-card-arrow",
  "aria-hidden": "true"
}, Nt = {
  key: 0,
  class: "sticker-empty"
}, Ut = { class: "sticker-library" }, Kt = { class: "sticker-library-header" }, Ot = { class: "library-title-group" }, zt = { id: "sticker-library-title" }, Vt = { id: "sticker-library-count" }, Wt = {
  id: "sticker-items",
  class: "sticker-grid"
}, jt = {
  key: 0,
  class: "sticker-empty"
}, qt = {
  key: 1,
  class: "sticker-empty"
}, Ht = {
  key: 2,
  class: "sticker-empty"
}, Gt = ["onClick", "onContextmenu"], Qt = ["src", "alt"], Jt = {
  key: 1,
  class: "sticker-badge-tag"
}, Zt = {
  key: 2,
  class: "sticker-copied-pill"
}, en = ["onClick"], tn = {
  key: 0,
  class: "sticker-pagination",
  "aria-label": "表情包翻页导航"
}, nn = { class: "sticker-page-left" }, sn = { class: "sticker-page-summary" }, on = { class: "sticker-page-badge" }, an = { class: "sticker-page-controls" }, rn = ["disabled"], ln = { class: "sticker-page-numbers" }, dn = {
  key: 0,
  class: "sticker-page-ellipsis"
}, cn = ["disabled", "onClick"], un = ["disabled"], fn = { class: "sticker-page-right" }, vn = { class: "sticker-page-progress" }, pn = {
  key: 0,
  class: "sticker-menu-classify"
}, mn = ["disabled"], bn = ["value"], hn = ["disabled"], yn = { class: "sticker-lightbox-info" }, gn = { class: "sticker-lightbox-actions" }, kn = { class: "sticker-lightbox-body" }, wn = ["src", "alt"], _n = /* @__PURE__ */ $e({
  __name: "StickerBoard",
  props: {
    dockOwned: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !0 }
  },
  setup(L) {
    function pe() {
      lt.open("storage", "stickers"), ut.activate("settings");
    }
    const u = x("__choose__");
    async function me() {
      const e = b.item, t = u.value;
      !e || t === "__choose__" || k.value || (T(), A(), await q("assign-item", { item: e, path: t }));
    }
    const F = L, $ = x(!document.hidden);
    let V = !1, y = 0;
    function f() {
      return !V && F.active && $.value;
    }
    function p(e) {
      return dt(e);
    }
    const X = F.dockOwned ? it() : st, h = F.dockOwned ? new ot(X, f, p, 120) : at, i = X.state, Q = x(!1), k = G(() => Q.value || ct.pendingWrites > 0), be = G(() => i.subFolders.length ? i.subFolders : i.activePath ? [{ name: i.displayTitle, path: i.activePath, count: i.totalCount }] : []);
    async function J(e, t) {
      if (!f() || k.value || i.loading) throw new Error("目录正在读取或保存，请稍后再操作。");
      T(), A(), Q.value = !0;
      try {
        await X.dispatch(e, t);
      } finally {
        Q.value = !1;
      }
    }
    function he(e, t) {
      return J("rename-folder", { path: e, name: t });
    }
    function d(e) {
      return J("delete-folder", { path: e });
    }
    function R(e, t) {
      return J("reorder-folders", { parentPath: e, paths: t });
    }
    const re = !!document.getElementById("vue-sticker-standalone-root"), N = x(!1), D = x(!1), U = x(""), B = x(null);
    se(() => i.activePath, () => {
      B.value && (B.value.scrollTop = 0);
    }, { flush: "post" });
    const K = x(null), j = x(!1), P = x(""), le = x(!1);
    let Y, S, Z, ee, te;
    const b = ae({ visible: !1, x: 0, y: 0, item: null, isConfirmingDelete: !1 }), s = ae({ visible: !1, item: null }), a = ae({ x: 24, y: 80 });
    let v;
    function g() {
      v = void 0, window.removeEventListener("mousemove", W), window.removeEventListener("mouseup", g), window.removeEventListener("blur", g);
    }
    function W(e) {
      if (!f() || !v || e.buttons === 0) {
        g();
        return;
      }
      a.x = Math.max(8, Math.min(window.innerWidth - 100, v.x + e.clientX - v.mouseX)), a.y = Math.max(8, Math.min(window.innerHeight - 40, v.y + e.clientY - v.mouseY));
    }
    function I(e) {
      !f() || e.button !== 0 || e.target.closest("button") || (e.preventDefault(), g(), v = { mouseX: e.clientX, mouseY: e.clientY, x: a.x, y: a.y }, window.addEventListener("mousemove", W), window.addEventListener("mouseup", g), window.addEventListener("blur", g));
    }
    function _() {
      N.value = re || document.body.dataset.mode === "sidepanel" || window.innerWidth < 680;
    }
    function w(e, t = !1) {
      V || (P.value = e, le.value = t, S !== void 0 && clearTimeout(S), f() && (S = setTimeout(() => {
        P.value = "", S = void 0;
      }, 3200)));
    }
    function T() {
      b.visible = !1, b.item = null, b.isConfirmingDelete = !1;
    }
    let ne = "", ye = 0;
    function A() {
      ++ye, ne && URL.revokeObjectURL(ne), ne = "", s.visible = !1, s.item = null, g();
    }
    function de() {
      y++, h.pauseReads(), T(), A(), ee?.abort(), ee = void 0, te?.abort(), te = void 0, Y !== void 0 && clearTimeout(Y), S !== void 0 && clearTimeout(S), Y = void 0, S = void 0, K.value = null, window.removeEventListener("resize", _);
    }
    const Ie = F.dockOwned ? rt(de) : () => {
    };
    function Ce() {
      $.value = !document.hidden, document.hidden ? de() : F.active && (_(), window.addEventListener("resize", _), h.activate());
    }
    se(() => F.active, (e) => {
      e ? $.value && (_(), window.addEventListener("resize", _), h.activate()) : de();
    }, { flush: "sync" });
    function ge(e) {
      f() && e.key === "Escape" && (s.visible ? A() : T());
    }
    function ke(e) {
      e.target?.closest?.(".sticker-context-menu") || T();
    }
    se(() => [b.visible, s.visible], () => {
      const e = b.visible || s.visible;
      window.removeEventListener("keydown", ge), document.removeEventListener("pointerdown", ke, !0), e && f() && (window.addEventListener("keydown", ge), b.visible && document.addEventListener("pointerdown", ke, !0));
    }, { flush: "sync" }), se(() => i.hasFolder, (e) => {
      e || (T(), A());
    }), et(() => {
      F.dockOwned && (h.onToast = w), h.enableBoardPaging(), Z = h.attachBoard(), h.init(), _(), document.addEventListener("visibilitychange", Ce), f() && window.addEventListener("resize", _);
    }), De(() => {
      V = !0, de(), Ie(), Z?.(), document.removeEventListener("visibilitychange", Ce), document.removeEventListener("pointerdown", ke, !0), window.removeEventListener("keydown", ge), h.dispose();
    });
    async function q(e, t) {
      if (f()) {
        if (k.value) {
          w("操作尚未结束，请稍候；没有自动排队。");
          return;
        }
        try {
          await X.dispatch(e, t);
        } catch (o) {
          w(e === "delete-item" ? o?.message || "删除未确认，请刷新核对，不要重复删除。" : "操作未完成，目录关联或部分文件可能已保存，请核对后再操作；未自动重试。", !0);
        }
      }
    }
    async function Ye() {
      const e = U.value.trim();
      if (!(!e || !f() || k.value))
        try {
          await X.dispatch("create-folder", e), V || (U.value = "");
        } catch {
          w("新建或后续读取失败，请核对目录后再操作。", !0);
        }
    }
    function Xe(e) {
      const o = e.currentTarget?.querySelector(".sticker-packs");
      if (!o || e.target instanceof Node && o.contains(e.target)) return;
      const C = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? e.deltaY * o.clientHeight : e.deltaY;
      o.scrollTop += C;
    }
    const Ae = G(() => i.folders.find((e) => e.path === "")?.itemCount || i.totalCount);
    function Pe(e) {
      k.value || (T(), A(), q("select-folder", e), N.value && (D.value = !1));
    }
    const Ee = x(null);
    async function Re() {
      if (!f() || k.value) return;
      const e = h.getActiveTargetHandle();
      if (i.storageKind === "directory" && (!e || !await h.ensureHandlePermission(e.handle))) {
        w("请先在图库设置中授权读取或允许添加图片。", !0);
        return;
      }
      f() && Ee.value?.click();
    }
    function we() {
      const e = document.getElementById("sticker-items");
      e && e.scrollTo({ top: 0, behavior: "smooth" });
    }
    const Ne = G(() => {
      const e = i.totalPages, t = i.currentPage;
      if (e <= 7)
        return Array.from({ length: e }, (ce, He) => He + 1);
      const o = [1];
      t > 3 && o.push(-1);
      const C = Math.max(2, t - 1), H = Math.min(e - 1, t + 1);
      for (let ce = C; ce <= H; ce++)
        o.push(ce);
      return t < e - 2 && o.push(-1), o.push(e), o;
    });
    function Ue(e) {
      e < 1 || e > i.totalPages || e === i.currentPage || k.value || (q("go-page", e), we());
    }
    function Ke() {
      q("prev-page"), we();
    }
    function Oe() {
      q("next-page"), we();
    }
    async function Te(e) {
      if (!f() || k.value || !e.length) return;
      if (e.length > 50) {
        w("一次最多导入50张，请分批；已在图库文件夹中的图片无需再次导入。", !0);
        return;
      }
      const t = h.getActiveTargetHandle();
      if (!t) {
        if (i.storageKind !== "indexeddb") {
          w("请先在设置中重新授权图库，未转存到内置库。", !0);
          return;
        }
        try {
          await p(() => h.saveFilesToIndexedDb(e)), w(`✓ 已保存 ${e.length} 张表情到内置库`);
        } catch {
          w("保存表情失败，请稍后重试", !0);
        }
        return;
      }
      try {
        await p(() => h.saveFilesToDir(t.handle, e, t.name));
      } catch {
        w("保存未完成，可能已有部分文件写入，请核对；未自动重试。", !0);
      }
    }
    function ze(e) {
      const t = e.target, o = Array.from(t.files || []);
      t.value = "", Te(o);
    }
    async function Ve(e) {
      const t = e.dataTransfer;
      if (!t || !f() || k.value) return;
      const o = Array.from(t.files);
      if (o.length) {
        await Te(o);
        return;
      }
      const C = h.extractImageUrlFromTransfer(t) || h.droppedUrl(t);
      if (!C) {
        w("未识别到可拖入的图片内容。", !0);
        return;
      }
      const H = h.getActiveTargetHandle();
      if (!H) {
        if (i.storageKind !== "indexeddb") {
          w("请先在设置中重新授权图库，未转存到内置库。", !0);
          return;
        }
        try {
          await p(() => h.saveUrlToIndexedDb(C)), w("✓ 已保存网络表情到内置库");
        } catch {
          w("读取或保存网络表情失败，请核对。", !0);
        }
        return;
      }
      try {
        await p(() => h.saveUrlToDir(H.handle, C, H.name));
      } catch {
        w("读取或保存失败，请核对目录；未自动重试。", !0);
      }
    }
    async function _e(e) {
      if (!f() || j.value) return;
      j.value = !0;
      const t = y;
      try {
        if (!await h.copyItem(e) || !f() || t !== y) return;
        K.value = e.id, Y !== void 0 && clearTimeout(Y), Y = setTimeout(() => {
          K.value = null, Y = void 0;
        }, 1800);
      } finally {
        V || (j.value = !1);
      }
    }
    function Le(e, t) {
      t.preventDefault(), t.stopPropagation(), f() && (b.item = e, b.isConfirmingDelete = !1, u.value = "__choose__", b.x = Math.max(8, Math.min(t.clientX, window.innerWidth - 250)), b.y = Math.max(8, Math.min(t.clientY, window.innerHeight - 280)), b.visible = !0);
    }
    function We() {
      const e = b.item;
      T(), e && _e(e);
    }
    async function je() {
      const e = b.item, t = y;
      T(), A();
      const o = ye;
      if (e)
        try {
          const C = await h.readItemBlob(e);
          if (!f() || t !== y || o !== ye) return;
          ne = URL.createObjectURL(C), a.x = Math.max(8, window.innerWidth - 700), a.y = 80, s.item = { ...e, url: ne }, s.visible = !0;
        } catch {
          w("原图读取失败，请核对图库授权。", !0);
        }
    }
    function qe(e) {
      if (e.stopPropagation(), !b.item || k.value) return;
      if (i.storageKind !== "directory" && !b.isConfirmingDelete) {
        b.isConfirmingDelete = !0;
        return;
      }
      const t = b.item;
      T(), A(), q("delete-item", t);
    }
    return (e, t) => (l(), c("div", Mt, [
      oe(n("section", $t, [
        P.value && le.value ? (l(), c("p", Dt, m(P.value), 1)) : E("", !0),
        n("div", {
          class: O(["sticker-layout", { "is-narrow-layout": N.value }])
        }, [
          oe(n("aside", {
            class: O(["sticker-sidebar", { "is-drawer": N.value }]),
            "aria-label": "图片分类导航",
            onWheelPassive: Xe
          }, [
            n("div", Bt, [
              t[9] || (t[9] = n("div", { class: "sticker-sidebar-heading" }, [
                n("span", { class: "sidebar-heading-title" }, "🏷️ 分类")
              ], -1)),
              n("form", {
                id: "sticker-pack-form",
                class: "sticker-pack-form",
                onSubmit: M(Ye, ["prevent"])
              }, [
                oe(n("input", {
                  id: "sticker-pack-name",
                  "onUpdate:modelValue": t[0] || (t[0] = (o) => U.value = o),
                  maxlength: "40",
                  placeholder: "＋ 新建分类",
                  autocomplete: "off",
                  required: ""
                }, null, 512), [
                  [Be, U.value]
                ]),
                t[8] || (t[8] = n("button", {
                  type: "submit",
                  title: "创建新分类"
                }, "新建", -1))
              ], 32)
            ]),
            r(i).hasFolder ? (l(), c("button", {
              key: 0,
              type: "button",
              class: O(["sidebar-folder-card subfolder-card sidebar-navigation-card", { active: r(i).parentPath === null && r(i).activePath === "" }]),
              disabled: k.value || r(i).loading,
              onClick: t[1] || (t[1] = (o) => Pe(r(i).parentPath ?? ""))
            }, [
              n("span", It, m(r(i).parentPath !== null ? "⬅" : "🗂️"), 1),
              n("span", Yt, [
                n("strong", Xt, m(r(i).parentPath !== null ? "返回上一级" : "全部表情"), 1),
                n("span", At, m(r(i).parentPath !== null ? `当前：${r(i).displayTitle}` : `${Ae.value} 张图片`), 1)
              ]),
              n("span", Rt, m(r(i).parentPath !== null ? "‹" : "›"), 1)
            ], 10, St)) : E("", !0),
            n("nav", {
              ref_key: "folderList",
              ref: B,
              id: "sticker-packs",
              class: "sticker-packs",
              "aria-label": "表情包分类列表"
            }, [
              !r(i).hasFolder && (!r(i).subFolders || r(i).subFolders.length === 0) ? (l(), c("div", Nt, m(r(i).loading ? "正在读取图片库…" : "图片库尚未就绪，请重新加载页面或重载本模块"), 1)) : (l(), fe(Ft, {
                key: 1,
                folders: be.value,
                "active-path": r(i).activePath,
                "parent-path": r(i).storageKind === "indexeddb" ? "" : r(i).activePath,
                active: f(),
                busy: k.value || r(i).loading,
                "directory-backed": r(i).storageKind === "directory",
                "can-reorder": r(i).subFolders.length > 1,
                "rename-folder": he,
                "delete-folder": d,
                "reorder-folders": R,
                onSelect: Pe
              }, null, 8, ["folders", "active-path", "parent-path", "active", "busy", "directory-backed", "can-reorder"]))
            ], 512)
          ], 34), [
            [Me, !N.value || D.value]
          ]),
          n("div", {
            class: "sticker-main-pane",
            onDragover: t[2] || (t[2] = M(() => {
            }, ["prevent"])),
            onDrop: M(Ve, ["prevent"])
          }, [
            n("input", {
              id: "sticker-file-input",
              ref_key: "fileInput",
              ref: Ee,
              type: "file",
              accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
              multiple: "",
              hidden: "",
              onChange: ze
            }, null, 544),
            n("section", Ut, [
              n("header", Kt, [
                n("div", Ot, [
                  n("strong", zt, m(r(i).displayTitle), 1),
                  n("span", Vt, m(r(i).totalCountText), 1)
                ]),
                n("button", {
                  type: "button",
                  class: "tool-btn",
                  onClick: pe
                }, "图库设置"),
                n("button", {
                  type: "button",
                  class: "tool-btn sticker-quick-import-btn",
                  title: "导入图片到当前分类",
                  onClick: Re
                }, " ＋ 导入图片 ")
              ]),
              n("div", Wt, [
                r(i).loading ? (l(), c("div", jt, " 正在加载表情包… ")) : r(i).emptyText ? (l(), c("div", qt, m(r(i).emptyText), 1)) : r(i).items.length === 0 ? (l(), c("div", Ht, " 当前分类暂无表情包 · 可直接从电脑或网页拖入图片保存 ")) : (l(!0), c(z, { key: 3 }, ue(r(i).items, (o) => (l(), c("article", {
                  key: o.id,
                  class: O(["sticker-item", { "just-copied": K.value === o.id }]),
                  tabindex: "0",
                  title: "单击复制原图；右键查看、归类或删除图片",
                  onClick: (C) => _e(o),
                  onContextmenu: (C) => Le(o, C)
                }, [
                  o.url ? (l(), c("img", {
                    key: 0,
                    src: o.url,
                    alt: o.file,
                    loading: "lazy"
                  }, null, 8, Qt)) : E("", !0),
                  o.folderName ? (l(), c("span", Jt, m(o.folderName), 1)) : E("", !0),
                  K.value === o.id ? (l(), c("span", Zt, " ✓ 已复制 ")) : E("", !0),
                  n("footer", null, [
                    n("span", null, m(o.sizeText), 1),
                    n("button", {
                      type: "button",
                      title: "图片操作",
                      onClick: M((C) => Le(o, C), ["stop"])
                    }, " ··· ", 8, en)
                  ])
                ], 42, Gt))), 128))
              ]),
              r(i).totalPages > 1 ? (l(), c("nav", tn, [
                n("div", nn, [
                  n("span", sn, [
                    t[10] || (t[10] = ie("共 ", -1)),
                    n("strong", null, m(r(i).totalCount), 1),
                    t[11] || (t[11] = ie(" 张", -1))
                  ]),
                  n("span", on, "每页 " + m(r(i).pageSize) + " 张", 1)
                ]),
                n("div", an, [
                  n("button", {
                    type: "button",
                    class: "sticker-nav-btn",
                    disabled: k.value || r(i).currentPage <= 1,
                    title: "上一页",
                    onClick: Ke
                  }, " ‹ 上一页 ", 8, rn),
                  n("div", ln, [
                    (l(!0), c(z, null, ue(Ne.value, (o, C) => (l(), c(z, { key: C }, [
                      o === -1 ? (l(), c("span", dn, "…")) : (l(), c("button", {
                        key: 1,
                        type: "button",
                        class: O(["sticker-num-btn", { active: o === r(i).currentPage }]),
                        disabled: k.value,
                        onClick: (H) => Ue(o)
                      }, m(o), 11, cn))
                    ], 64))), 128))
                  ]),
                  n("button", {
                    type: "button",
                    class: "sticker-nav-btn",
                    disabled: k.value || r(i).currentPage >= r(i).totalPages,
                    title: "下一页",
                    onClick: Oe
                  }, " 下一页 › ", 8, un)
                ]),
                n("div", fn, [
                  n("span", vn, m(r(i).currentPage) + " / " + m(r(i).totalPages), 1)
                ])
              ])) : E("", !0)
            ])
          ], 32)
        ], 2)
      ], 512), [
        [Me, f()]
      ]),
      (l(), fe(xe, { to: "body" }, [
        b.visible ? (l(), c("div", {
          key: 0,
          class: "sticker-context-menu",
          style: ve({ left: `${b.x}px`, top: `${b.y}px` }),
          onClick: t[5] || (t[5] = M(() => {
          }, ["stop"]))
        }, [
          n("button", {
            type: "button",
            class: "sticker-menu-item",
            onClick: We
          }, [...t[12] || (t[12] = [
            n("span", { class: "menu-icon" }, "📋", -1),
            ie(" 复制图片 ", -1)
          ])]),
          n("button", {
            type: "button",
            class: "sticker-menu-item",
            onClick: je
          }, [...t[13] || (t[13] = [
            n("span", { class: "menu-icon" }, "🔍", -1),
            ie(" 查看大图 ", -1)
          ])]),
          r(i).storageKind === "directory" ? (l(), c("div", pn, [
            oe(n("select", {
              "onUpdate:modelValue": t[3] || (t[3] = (o) => u.value = o),
              "aria-label": "选择图片分类",
              disabled: k.value
            }, [
              t[14] || (t[14] = n("option", {
                value: "__choose__",
                disabled: ""
              }, "归类到…", -1)),
              (l(!0), c(z, null, ue(r(i).folders, (o) => (l(), c("option", {
                key: o.path,
                value: o.path
              }, m(o.path ? `${"－".repeat(o.depth)}${o.name}` : "未分类（全部中保留）"), 9, bn))), 128))
            ], 8, mn), [
              [tt, u.value]
            ]),
            n("button", {
              type: "button",
              class: "sticker-menu-item",
              disabled: k.value || u.value === "__choose__",
              onClick: me
            }, "保存分类（不移动原图）", 8, hn)
          ])) : E("", !0),
          t[16] || (t[16] = n("div", { class: "sticker-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: O(["sticker-menu-item danger", { "is-confirming": b.isConfirmingDelete }]),
            onClick: t[4] || (t[4] = (o) => qe(o))
          }, [
            t[15] || (t[15] = n("span", { class: "menu-icon" }, "🗑️", -1)),
            ie(" " + m(r(i).storageKind === "directory" ? "删除磁盘原图…" : b.isConfirmingDelete ? "确定删除内置副本？" : "删除内置图片"), 1)
          ], 2)
        ], 4)) : E("", !0)
      ])),
      (l(), fe(xe, { to: "body" }, [
        s.visible && s.item ? (l(), c("div", {
          key: 0,
          class: "sticker-lightbox-window",
          style: ve({ left: `${a.x}px`, top: `${a.y}px` })
        }, [
          n("div", {
            class: "sticker-lightbox-dialog",
            onClick: t[7] || (t[7] = M(() => {
            }, ["stop"]))
          }, [
            n("header", {
              class: "sticker-lightbox-head",
              onMousedown: I
            }, [
              n("div", yn, [
                n("strong", null, m(s.item.file), 1),
                n("small", null, m(s.item.sizeText) + " · 本地浮窗预览（拖动标题栏移动，Esc 关闭）", 1)
              ]),
              n("div", gn, [
                n("button", {
                  type: "button",
                  class: "lightbox-action-btn copy",
                  title: "复制到剪贴板，支持直接在微信/QQ粘贴",
                  onClick: t[6] || (t[6] = (o) => _e(s.item))
                }, " 📋 复制图片 "),
                n("button", {
                  type: "button",
                  class: "lightbox-close-btn",
                  title: "关闭大图预览 (Esc)",
                  onClick: A
                }, " ✕ ")
              ])
            ], 32),
            n("div", kn, [
              n("img", {
                src: s.item.url,
                alt: s.item.file,
                class: "sticker-lightbox-img"
              }, null, 8, wn)
            ])
          ])
        ], 4)) : E("", !0)
      ]))
    ]));
  }
}), Tn = /* @__PURE__ */ Se(_n, [["__scopeId", "data-v-3db66d26"]]);
export {
  Tn as S
};
