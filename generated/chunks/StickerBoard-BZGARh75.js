import { d as $e, w as le, K as De, o as c, e as f, F as z, i as t, p as Ge, I as Qe, H as Je, g as ve, h as S, k as Le, A as O, t as d, f as F, j as pe, T as xe, z as me, u as s, l as ce, n as Be, b as C, s as te, r as de, D as Ze, B as et, y as Me, m as re, R as tt } from "./vendor-vue-BkY5-p5y.js";
import { c as it, s as nt, d as st, a as ot, o as at, w as rt, b as lt } from "./stickers.service-CLmzoD5s.js";
import { u as ct } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
import { _ as Se, t as _ } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const dt = ["data-folder-path", "aria-label", "aria-disabled", "onPointerdown", "onClick", "onKeydown", "onContextmenu"], ut = { class: "folder-info" }, ft = {
  key: 0,
  class: "folder-error",
  role: "alert"
}, vt = { class: "folder-info" }, pt = { class: "menu-heading" }, mt = ["disabled"], ht = ["disabled"], bt = {
  key: 0,
  class: "menu-note"
}, yt = { class: "menu-heading" }, kt = ["disabled"], gt = {
  key: 0,
  class: "menu-note"
}, wt = {
  key: 1,
  class: "menu-note"
}, _t = {
  key: 2,
  class: "folder-error",
  role: "alert"
}, xt = { class: "menu-actions" }, Ct = ["disabled"], Pt = ["disabled"], Tt = /* @__PURE__ */ $e({
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
  setup(M, { emit: V }) {
    const h = M, Y = V, R = C(null), L = C(null), W = te(() => L.value || h.folders), l = C(!1), P = C(""), p = de({ visible: !1, x: 0, y: 0, folder: null, mode: "menu", name: "" }), y = C(null);
    function n() {
      l.value || (p.visible = !1, p.folder = null, P.value = "");
    }
    const { menuRef: ie, style: k } = ct({ visible: () => p.visible && h.active, anchor: () => p, dismiss: n }), q = te(() => !p.folder?.path || !h.directoryBacked && p.folder.path === "默认");
    function ne(a, r) {
      !h.active || h.busy || l.value || (B(), Object.assign(p, { visible: !0, x: r.clientX, y: r.clientY, folder: { ...a }, mode: "menu", name: a.name }), P.value = "");
    }
    async function he() {
      p.mode = "rename", await Ze(), y.value?.focus(), y.value?.select();
    }
    async function be() {
      const a = p.folder;
      if (!(!a || q.value || l.value || h.busy || !h.active)) {
        l.value = !0, P.value = "";
        try {
          p.mode === "rename" ? await h.renameFolder(a.path, p.name.trim()) : p.mode === "delete" && await h.deleteFolder(a.path), p.visible = !1, p.folder = null;
        } catch (r) {
          P.value = r instanceof Error ? r.message : "操作未确认完成，请重新打开模块核对；未自动重试。";
        } finally {
          l.value = !1;
        }
      }
    }
    const u = de({ visible: !1, path: "", x: 0, y: 0, width: 0, height: 0, offsetX: 0, offsetY: 0, name: "", count: 0 });
    let U = null, K = 0, se = 0, $ = 0, H = 0, D = null, G = "";
    function j() {
      window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", ae), window.removeEventListener("blur", B), window.removeEventListener("keydown", b, !0), cancelAnimationFrame($), $ = 0, U = null, D = null;
    }
    function B() {
      u.visible && (H = performance.now() + 300), j(), u.visible = !1, u.path = "", L.value = null;
    }
    function A(a, r) {
      if (r.button !== 0 || !h.canReorder || h.busy || l.value || !h.active) return;
      B(), n();
      const v = r.currentTarget, g = v.getBoundingClientRect();
      U = r.pointerId, K = r.clientX, se = r.clientY, G = h.parentPath, Object.assign(u, {
        path: a.path,
        x: r.clientX,
        y: r.clientY,
        width: g.width,
        height: g.height,
        offsetX: r.clientX - g.left,
        offsetY: r.clientY - g.top,
        name: a.name,
        count: a.count
      }), D = R.value?.closest(".sticker-packs") || null, window.addEventListener("pointermove", I, { passive: !1 }), window.addEventListener("pointerup", oe), window.addEventListener("pointercancel", ae), window.addEventListener("blur", B), window.addEventListener("keydown", b, !0);
    }
    function I(a) {
      a.pointerId === U && (!u.visible && Math.hypot(a.clientX - K, a.clientY - se) < 6 || (a.preventDefault(), u.visible || (u.visible = !0, L.value = [...h.folders]), u.x = a.clientX, u.y = a.clientY, $ || ($ = requestAnimationFrame(Q))));
    }
    function Q() {
      if ($ = 0, !u.visible || !D || !R.value) return;
      const a = D.getBoundingClientRect();
      if (u.x >= a.left - 24 && u.x <= a.right + 24) {
        u.y < a.top + 28 ? D.scrollTop -= 7 : u.y > a.bottom - 28 && (D.scrollTop += 7);
        const r = [...R.value.querySelectorAll("[data-folder-path]")], v = (L.value || h.folders).filter((m) => m.path !== u.path), g = R.value.getBoundingClientRect().top;
        let J = 0;
        for (const m of v) {
          const T = r.find((X) => X.dataset.folderPath === m.path);
          T && u.y > g + T.offsetTop + T.offsetHeight / 2 && J++;
        }
        const x = h.folders.find((m) => m.path === u.path);
        if (x) {
          const m = [...v];
          m.splice(J, 0, x), m.some((T, X) => T.path !== L.value?.[X]?.path) && (L.value = m);
        }
      }
      $ = requestAnimationFrame(Q);
    }
    async function oe(a) {
      if (a.pointerId !== U) return;
      if (!u.visible) {
        B();
        return;
      }
      const r = D?.getBoundingClientRect(), v = r && a.clientX >= r.left - 24 && a.clientX <= r.right + 24 && a.clientY >= r.top - 24 && a.clientY <= r.bottom + 24;
      u.x = a.clientX, u.y = a.clientY, cancelAnimationFrame($), $ = 0, v && Q();
      const g = (L.value || h.folders).map((x) => x.path), J = g.some((x, m) => x !== h.folders[m]?.path);
      if (j(), u.visible = !1, H = performance.now() + 300, !v || !J || !h.active || h.busy) {
        B();
        return;
      }
      l.value = !0, P.value = "";
      try {
        await h.reorderFolders(G, g);
      } catch (x) {
        P.value = x instanceof Error ? x.message : "排序保存未确认，请重新打开模块核对。";
      } finally {
        l.value = !1, L.value = null, u.path = "";
      }
    }
    function ae(a) {
      a.pointerId === U && B();
    }
    function b(a) {
      a.key === "Escape" && U !== null && (a.preventDefault(), a.stopPropagation(), B());
    }
    function w(a) {
      performance.now() < H || l.value || h.busy || Y("select", a);
    }
    return le(() => [h.active, h.parentPath, h.folders.map((a) => a.path).sort().join("\0")], () => {
      B(), l.value || n();
    }), De(B), (a, r) => (c(), f(z, null, [
      t("div", {
        ref_key: "listRef",
        ref: R,
        class: "sticker-folder-cards-wrap"
      }, [
        Ge(Qe, {
          tag: "div",
          name: "sticker-folder",
          class: "sticker-folder-cards"
        }, {
          default: Je(() => [
            (c(!0), f(z, null, ve(W.value, (v) => (c(), f("div", {
              key: v.path,
              class: O(["sidebar-folder-card subfolder-card folder-card", { active: v.path === M.activePath, "is-dragging": u.visible && u.path === v.path, "can-sort": M.canReorder && !M.busy && !l.value }]),
              "data-folder-path": v.path,
              role: "button",
              tabindex: "0",
              "aria-label": v.name,
              "aria-disabled": M.busy || l.value,
              onPointerdown: (g) => A(v, g),
              onDragstart: r[0] || (r[0] = S(() => {
              }, ["prevent"])),
              onClick: (g) => w(v.path),
              onKeydown: [
                Le(S((g) => w(v.path), ["prevent"]), ["enter"]),
                Le(S((g) => w(v.path), ["prevent"]), ["space"])
              ],
              onContextmenu: S((g) => ne(v, g), ["prevent", "stop"])
            }, [
              r[5] || (r[5] = t("span", {
                class: "folder-icon",
                "aria-hidden": "true"
              }, "📁", -1)),
              t("div", ut, [
                t("strong", null, d(v.name), 1),
                t("small", null, d(v.count) + " 张图片", 1)
              ]),
              r[6] || (r[6] = t("span", {
                class: "folder-arrow",
                "aria-hidden": "true"
              }, "›", -1))
            ], 42, dt))), 128))
          ]),
          _: 1
        }),
        P.value && !p.visible ? (c(), f("p", ft, d(P.value), 1)) : F("", !0)
      ], 512),
      (c(), pe(xe, { to: "body" }, [
        u.visible ? (c(), f("div", {
          key: 0,
          class: "folder-drag-ghost",
          style: me({ left: `${u.x - u.offsetX}px`, top: `${u.y - u.offsetY}px`, width: `${u.width}px`, height: `${u.height}px` }),
          "aria-hidden": "true"
        }, [
          r[7] || (r[7] = t("span", { class: "folder-icon" }, "📁", -1)),
          t("div", vt, [
            t("strong", null, d(u.name), 1),
            t("small", null, d(u.count) + " 张图片", 1)
          ])
        ], 4)) : F("", !0),
        p.visible && M.active ? (c(), f("div", {
          key: 1,
          ref_key: "menuRef",
          ref: ie,
          class: "folder-context-menu",
          style: me(s(k)),
          onPointerdown: r[3] || (r[3] = S(() => {
          }, ["stop"])),
          onClick: r[4] || (r[4] = S(() => {
          }, ["stop"]))
        }, [
          p.mode === "menu" ? (c(), f(z, { key: 0 }, [
            t("strong", pt, d(p.folder?.name), 1),
            t("button", {
              type: "button",
              disabled: q.value || M.busy || l.value,
              onClick: he
            }, "重命名", 8, mt),
            t("button", {
              type: "button",
              class: "danger",
              disabled: q.value || M.busy || l.value,
              onClick: r[1] || (r[1] = (v) => p.mode = "delete")
            }, "删除分类", 8, ht),
            q.value ? (c(), f("small", bt, "默认分类保留，用于接收未分类图片。")) : F("", !0)
          ], 64)) : (c(), f("form", {
            key: 1,
            onSubmit: S(be, ["prevent"])
          }, [
            t("strong", yt, d(p.mode === "rename" ? "重命名分类" : "删除分类"), 1),
            p.mode === "rename" ? (c(), f(z, { key: 0 }, [
              ce(t("input", {
                ref_key: "nameInput",
                ref: y,
                "onUpdate:modelValue": r[2] || (r[2] = (v) => p.name = v),
                maxlength: "50",
                "aria-label": "分类新名称",
                disabled: l.value,
                required: ""
              }, null, 8, kt), [
                [Be, p.name]
              ]),
              M.directoryBacked ? (c(), f("small", gt, "只修改虚拟分类名称，不改磁盘目录或原图。")) : F("", !0)
            ], 64)) : (c(), f("p", wt, d(M.directoryBacked ? "移除该分类及子分类，索引中的图片归入上一级；磁盘原图和目录均不改动。" : "移除该分类，图片转入默认分类，不删除图片。"), 1)),
            P.value ? (c(), f("p", _t, d(P.value), 1)) : F("", !0),
            t("div", xt, [
              t("button", {
                type: "button",
                disabled: l.value,
                onClick: n
              }, "取消", 8, Ct),
              t("button", {
                type: "submit",
                disabled: l.value || M.busy,
                class: O({ danger: p.mode === "delete" })
              }, d(l.value ? "保存中…" : "确认"), 11, Pt)
            ])
          ], 32))
        ], 36)) : F("", !0)
      ]))
    ], 64));
  }
}), Et = /* @__PURE__ */ Se(Tt, [["__scopeId", "data-v-81bebd33"]]), Ft = { class: "vue-sticker-board-wrapper" }, Lt = {
  class: "card wide utility-workspace-stickers",
  id: "card-stickers"
}, Mt = {
  key: 0,
  role: "alert",
  class: "bad"
}, $t = ["aria-label"], Dt = { class: "sticker-sidebar-top" }, Bt = { class: "sticker-sidebar-heading" }, St = { class: "sidebar-heading-title" }, It = ["placeholder"], Yt = ["title"], Rt = ["disabled"], At = {
  class: "subfolder-card-icon",
  "aria-hidden": "true"
}, Xt = { class: "subfolder-card-info" }, Nt = { class: "subfolder-card-name" }, Ut = { class: "subfolder-card-count" }, Kt = {
  class: "subfolder-card-arrow",
  "aria-hidden": "true"
}, Ot = {
  key: 0,
  class: "sticker-empty"
}, zt = { class: "sticker-library" }, Vt = { class: "sticker-library-header" }, Wt = { class: "library-title-group" }, Ht = { id: "sticker-library-title" }, jt = { id: "sticker-library-count" }, qt = {
  id: "sticker-items",
  class: "sticker-grid"
}, Gt = {
  key: 0,
  class: "sticker-empty"
}, Qt = {
  key: 1,
  class: "sticker-empty"
}, Jt = {
  key: 2,
  class: "sticker-empty"
}, Zt = ["onClick", "onContextmenu"], ei = ["src", "alt"], ti = {
  key: 1,
  class: "sticker-badge-tag"
}, ii = {
  key: 2,
  class: "sticker-copied-pill"
}, ni = ["onClick"], si = {
  key: 0,
  class: "sticker-pagination",
  "aria-label": "表情包翻页导航"
}, oi = { class: "sticker-page-left" }, ai = { class: "sticker-page-summary" }, ri = { class: "sticker-page-badge" }, li = { class: "sticker-page-controls" }, ci = ["disabled"], di = { class: "sticker-page-numbers" }, ui = {
  key: 0,
  class: "sticker-page-ellipsis"
}, fi = ["disabled", "onClick"], vi = ["disabled"], pi = { class: "sticker-page-right" }, mi = { class: "sticker-page-progress" }, hi = {
  key: 0,
  class: "sticker-menu-classify"
}, bi = ["disabled"], yi = {
  value: "__choose__",
  disabled: ""
}, ki = ["value"], gi = ["disabled"], wi = { class: "sticker-lightbox-info" }, _i = { class: "sticker-lightbox-actions" }, xi = { class: "sticker-lightbox-body" }, Ci = ["src", "alt"], Pi = /* @__PURE__ */ $e({
  __name: "StickerBoard",
  props: {
    dockOwned: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !0 }
  },
  setup(M) {
    const V = C("__choose__");
    async function h() {
      const e = b.item, i = V.value;
      !e || i === "__choose__" || k.value || (T(), N(), await Z("assign-item", { item: e, path: i }));
    }
    const Y = M, R = C(!document.hidden);
    let L = !1, W = 0;
    function l() {
      return !L && Y.active && R.value;
    }
    function P(e) {
      return rt(e);
    }
    const p = Y.dockOwned ? it() : nt, y = Y.dockOwned ? new st(p, l, P, 120) : ot, n = p.state, ie = C(!1), k = te(() => ie.value || lt.pendingWrites > 0), q = te(() => n.subFolders.length ? n.subFolders : n.activePath ? [{ name: n.displayTitle, path: n.activePath, count: n.totalCount }] : []);
    async function ne(e, i) {
      if (!l() || k.value || n.loading) throw new Error("目录正在读取或保存，请稍后再操作。");
      T(), N(), ie.value = !0;
      try {
        await p.dispatch(e, i);
      } finally {
        ie.value = !1;
      }
    }
    function he(e, i) {
      return ne("rename-folder", { path: e, name: i });
    }
    function be(e) {
      return ne("delete-folder", { path: e });
    }
    function u(e, i) {
      return ne("reorder-folders", { parentPath: e, paths: i });
    }
    const U = !!document.getElementById("vue-sticker-standalone-root"), K = C(!1), se = C(!1), $ = C(""), H = C(null);
    le(() => n.activePath, () => {
      H.value && (H.value.scrollTop = 0);
    }, { flush: "post" });
    const D = C(null), G = C(!1), j = C(""), B = C(!1);
    let A, I, Q, oe, ae;
    const b = de({ visible: !1, x: 0, y: 0, item: null, isConfirmingDelete: !1 }), w = de({ visible: !1, item: null }), a = de({ x: 24, y: 80 });
    let r;
    function v() {
      r = void 0, window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", v), window.removeEventListener("blur", v);
    }
    function g(e) {
      if (!l() || !r || e.buttons === 0) {
        v();
        return;
      }
      a.x = Math.max(8, Math.min(window.innerWidth - 100, r.x + e.clientX - r.mouseX)), a.y = Math.max(8, Math.min(window.innerHeight - 40, r.y + e.clientY - r.mouseY));
    }
    function J(e) {
      !l() || e.button !== 0 || e.target.closest("button") || (e.preventDefault(), v(), r = { mouseX: e.clientX, mouseY: e.clientY, x: a.x, y: a.y }, window.addEventListener("mousemove", g), window.addEventListener("mouseup", v), window.addEventListener("blur", v));
    }
    function x() {
      K.value = U || document.body.dataset.mode === "sidepanel" || window.innerWidth < 680;
    }
    function m(e, i = !1) {
      L || (j.value = e, B.value = i, I !== void 0 && clearTimeout(I), l() && (I = setTimeout(() => {
        j.value = "", I = void 0;
      }, 3200)));
    }
    function T() {
      b.visible = !1, b.item = null, b.isConfirmingDelete = !1;
    }
    let X = "", ye = 0;
    function N() {
      ++ye, X && URL.revokeObjectURL(X), X = "", w.visible = !1, w.item = null, v();
    }
    function ue() {
      W++, y.pauseReads(), T(), N(), oe?.abort(), oe = void 0, ae?.abort(), ae = void 0, A !== void 0 && clearTimeout(A), I !== void 0 && clearTimeout(I), A = void 0, I = void 0, D.value = null, window.removeEventListener("resize", x);
    }
    const Ie = Y.dockOwned ? at(ue) : () => {
    };
    function Ce() {
      R.value = !document.hidden, document.hidden ? ue() : Y.active && (x(), window.addEventListener("resize", x), y.activate());
    }
    le(() => Y.active, (e) => {
      e ? R.value && (x(), window.addEventListener("resize", x), y.activate()) : ue();
    }, { flush: "sync" });
    function ke(e) {
      l() && e.key === "Escape" && (w.visible ? N() : T());
    }
    function ge(e) {
      e.target?.closest?.(".sticker-context-menu") || T();
    }
    le(() => [b.visible, w.visible], () => {
      const e = b.visible || w.visible;
      window.removeEventListener("keydown", ke), document.removeEventListener("pointerdown", ge, !0), e && l() && (window.addEventListener("keydown", ke), b.visible && document.addEventListener("pointerdown", ge, !0));
    }, { flush: "sync" }), le(() => n.hasFolder, (e) => {
      e || (T(), N());
    }), et(() => {
      Y.dockOwned && (y.onToast = m), y.enableBoardPaging(), Q = y.attachBoard(), y.init(), x(), document.addEventListener("visibilitychange", Ce), l() && window.addEventListener("resize", x);
    }), De(() => {
      L = !0, ue(), Ie(), Q?.(), document.removeEventListener("visibilitychange", Ce), document.removeEventListener("pointerdown", ge, !0), window.removeEventListener("keydown", ke), y.dispose();
    });
    async function Z(e, i) {
      if (l()) {
        if (k.value) {
          m("操作尚未结束，请稍候；没有自动排队。");
          return;
        }
        try {
          await p.dispatch(e, i);
        } catch (o) {
          m(e === "delete-item" ? o?.message || "删除未确认，请刷新核对，不要重复删除。" : "操作未完成，目录关联或部分文件可能已保存，请核对后再操作；未自动重试。", !0);
        }
      }
    }
    async function Ye() {
      const e = $.value.trim();
      if (!(!e || !l() || k.value))
        try {
          await p.dispatch("create-folder", e), L || ($.value = "");
        } catch {
          m("新建或后续读取失败，请核对目录后再操作。", !0);
        }
    }
    function Re(e) {
      const o = e.currentTarget?.querySelector(".sticker-packs");
      if (!o || e.target instanceof Node && o.contains(e.target)) return;
      const E = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? e.deltaY * o.clientHeight : e.deltaY;
      o.scrollTop += E;
    }
    const Ae = te(() => n.folders.find((e) => e.path === "")?.itemCount || n.totalCount);
    function Pe(e) {
      k.value || (T(), N(), Z("select-folder", e), K.value && (se.value = !1));
    }
    const Te = C(null);
    async function Xe() {
      if (!l() || k.value) return;
      const e = y.getActiveTargetHandle();
      if (n.storageKind === "directory" && (!e || !await y.ensureHandlePermission(e.handle))) {
        m("图片目录暂不可用，请检查已有目录授权；未更改原有数据。", !0);
        return;
      }
      l() && Te.value?.click();
    }
    function we() {
      const e = document.getElementById("sticker-items");
      e && e.scrollTo({ top: 0, behavior: "smooth" });
    }
    const Ne = te(() => {
      const e = n.totalPages, i = n.currentPage;
      if (e <= 7)
        return Array.from({ length: e }, (fe, qe) => qe + 1);
      const o = [1];
      i > 3 && o.push(-1);
      const E = Math.max(2, i - 1), ee = Math.min(e - 1, i + 1);
      for (let fe = E; fe <= ee; fe++)
        o.push(fe);
      return i < e - 2 && o.push(-1), o.push(e), o;
    });
    function Ue(e) {
      e < 1 || e > n.totalPages || e === n.currentPage || k.value || (Z("go-page", e), we());
    }
    function Ke() {
      Z("prev-page"), we();
    }
    function Oe() {
      Z("next-page"), we();
    }
    async function Ee(e) {
      if (!l() || k.value || !e.length) return;
      if (e.length > 50) {
        m("一次最多导入50张，请分批；已在图库文件夹中的图片无需再次导入。", !0);
        return;
      }
      const i = y.getActiveTargetHandle();
      if (!i) {
        if (n.storageKind !== "indexeddb") {
          m("请先在设置中重新授权图库，未转存到内置库。", !0);
          return;
        }
        try {
          await P(() => y.saveFilesToIndexedDb(e)), m(`✓ 已保存 ${e.length} 张表情到内置库`);
        } catch {
          m("保存表情失败，请稍后重试", !0);
        }
        return;
      }
      try {
        await P(() => y.saveFilesToDir(i.handle, e, i.name));
      } catch {
        m("保存未完成，可能已有部分文件写入，请核对；未自动重试。", !0);
      }
    }
    function ze(e) {
      const i = e.target, o = Array.from(i.files || []);
      i.value = "", Ee(o);
    }
    async function Ve(e) {
      const i = e.dataTransfer;
      if (!i || !l() || k.value) return;
      const o = Array.from(i.files);
      if (o.length) {
        await Ee(o);
        return;
      }
      const E = y.extractImageUrlFromTransfer(i) || y.droppedUrl(i);
      if (!E) {
        m("未识别到可拖入的图片内容。", !0);
        return;
      }
      const ee = y.getActiveTargetHandle();
      if (!ee) {
        if (n.storageKind !== "indexeddb") {
          m("请先在设置中重新授权图库，未转存到内置库。", !0);
          return;
        }
        try {
          await P(() => y.saveUrlToIndexedDb(E)), m("✓ 已保存网络表情到内置库");
        } catch {
          m("读取或保存网络表情失败，请核对。", !0);
        }
        return;
      }
      try {
        await P(() => y.saveUrlToDir(ee.handle, E, ee.name));
      } catch {
        m("读取或保存失败，请核对目录；未自动重试。", !0);
      }
    }
    async function _e(e) {
      if (!l() || G.value) return;
      G.value = !0;
      const i = W;
      try {
        if (!await y.copyItem(e) || !l() || i !== W) return;
        D.value = e.id, A !== void 0 && clearTimeout(A), A = setTimeout(() => {
          D.value = null, A = void 0;
        }, 1800);
      } finally {
        L || (G.value = !1);
      }
    }
    function Fe(e, i) {
      i.preventDefault(), i.stopPropagation(), l() && (b.item = e, b.isConfirmingDelete = !1, V.value = "__choose__", b.x = Math.max(8, Math.min(i.clientX, window.innerWidth - 250)), b.y = Math.max(8, Math.min(i.clientY, window.innerHeight - 280)), b.visible = !0);
    }
    function We() {
      const e = b.item;
      T(), e && _e(e);
    }
    async function He() {
      const e = b.item, i = W;
      T(), N();
      const o = ye;
      if (e)
        try {
          const E = await y.readItemBlob(e);
          if (!l() || i !== W || o !== ye) return;
          X = URL.createObjectURL(E), a.x = Math.max(8, window.innerWidth - 700), a.y = 80, w.item = { ...e, url: X }, w.visible = !0;
        } catch {
          m("原图读取失败，请核对图库授权。", !0);
        }
    }
    function je(e) {
      if (e.stopPropagation(), !b.item || k.value) return;
      if (n.storageKind !== "directory" && !b.isConfirmingDelete) {
        b.isConfirmingDelete = !0;
        return;
      }
      const i = b.item;
      T(), N(), Z("delete-item", i);
    }
    return (e, i) => (c(), f("div", Ft, [
      ce(t("section", Lt, [
        j.value && B.value ? (c(), f("p", Mt, d(j.value), 1)) : F("", !0),
        t("div", {
          class: O(["sticker-layout", { "is-narrow-layout": K.value }])
        }, [
          ce(t("aside", {
            class: O(["sticker-sidebar", { "is-drawer": K.value }]),
            "aria-label": s(_)("stickers.sidebarAria"),
            onWheelPassive: Re
          }, [
            t("div", Dt, [
              t("div", Bt, [
                t("span", St, "🏷️ " + d(s(_)("stickers.categories")), 1)
              ]),
              t("form", {
                id: "sticker-pack-form",
                class: "sticker-pack-form",
                onSubmit: S(Ye, ["prevent"])
              }, [
                ce(t("input", {
                  id: "sticker-pack-name",
                  "onUpdate:modelValue": i[0] || (i[0] = (o) => $.value = o),
                  maxlength: "40",
                  placeholder: s(_)("stickers.newCategoryPlaceholder"),
                  autocomplete: "off",
                  required: ""
                }, null, 8, It), [
                  [Be, $.value]
                ]),
                t("button", {
                  type: "submit",
                  title: s(_)("stickers.createTitle")
                }, d(s(_)("stickers.create")), 9, Yt)
              ], 32)
            ]),
            s(n).hasFolder ? (c(), f("button", {
              key: 0,
              type: "button",
              class: O(["sidebar-folder-card subfolder-card sidebar-navigation-card", { active: s(n).parentPath === null && s(n).activePath === "" }]),
              disabled: k.value || s(n).loading,
              onClick: i[1] || (i[1] = (o) => Pe(s(n).parentPath ?? ""))
            }, [
              t("span", At, d(s(n).parentPath !== null ? "⬅" : "🗂️"), 1),
              t("span", Xt, [
                t("strong", Nt, d(s(n).parentPath !== null ? s(_)("stickers.backToParent") : s(_)("stickers.allStickers")), 1),
                t("span", Ut, d(s(n).parentPath !== null ? s(_)("stickers.currentFolder", { name: s(n).displayTitle }) : s(_)("stickers.countText", { count: Ae.value })), 1)
              ]),
              t("span", Kt, d(s(n).parentPath !== null ? "‹" : "›"), 1)
            ], 10, Rt)) : F("", !0),
            t("nav", {
              ref_key: "folderList",
              ref: H,
              id: "sticker-packs",
              class: "sticker-packs",
              "aria-label": "表情包分类列表"
            }, [
              !s(n).hasFolder && (!s(n).subFolders || s(n).subFolders.length === 0) ? (c(), f("div", Ot, d(s(n).loading ? s(_)("stickers.reading") : s(_)("stickers.notReady")), 1)) : (c(), pe(Et, {
                key: 1,
                folders: q.value,
                "active-path": s(n).activePath,
                "parent-path": s(n).storageKind === "indexeddb" ? "" : s(n).activePath,
                active: l(),
                busy: k.value || s(n).loading,
                "directory-backed": s(n).storageKind === "directory",
                "can-reorder": s(n).subFolders.length > 1,
                "rename-folder": he,
                "delete-folder": be,
                "reorder-folders": u,
                onSelect: Pe
              }, null, 8, ["folders", "active-path", "parent-path", "active", "busy", "directory-backed", "can-reorder"]))
            ], 512)
          ], 42, $t), [
            [Me, !K.value || se.value]
          ]),
          t("div", {
            class: "sticker-main-pane",
            onDragover: i[2] || (i[2] = S(() => {
            }, ["prevent"])),
            onDrop: S(Ve, ["prevent"])
          }, [
            t("input", {
              id: "sticker-file-input",
              ref_key: "fileInput",
              ref: Te,
              type: "file",
              accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
              multiple: "",
              hidden: "",
              onChange: ze
            }, null, 544),
            t("section", zt, [
              t("header", Vt, [
                t("div", Wt, [
                  t("strong", Ht, d(s(n).displayTitle), 1),
                  t("span", jt, d(s(n).totalCountText), 1)
                ]),
                t("button", {
                  type: "button",
                  class: "tool-btn sticker-quick-import-btn",
                  title: "导入图片到当前分类",
                  onClick: Xe
                }, " ＋ 导入图片 ")
              ]),
              t("div", qt, [
                s(n).loading ? (c(), f("div", Gt, " 正在加载表情包… ")) : s(n).emptyText ? (c(), f("div", Qt, d(s(n).emptyText), 1)) : s(n).items.length === 0 ? (c(), f("div", Jt, " 当前分类暂无表情包 · 可直接从电脑或网页拖入图片保存 ")) : (c(!0), f(z, { key: 3 }, ve(s(n).items, (o) => (c(), f("article", {
                  key: o.id,
                  class: O(["sticker-item", { "just-copied": D.value === o.id }]),
                  tabindex: "0",
                  title: "单击复制原图；右键查看、归类或删除图片",
                  onClick: (E) => _e(o),
                  onContextmenu: (E) => Fe(o, E)
                }, [
                  o.url ? (c(), f("img", {
                    key: 0,
                    src: o.url,
                    alt: o.file,
                    loading: "lazy"
                  }, null, 8, ei)) : F("", !0),
                  o.folderName ? (c(), f("span", ti, d(o.folderName), 1)) : F("", !0),
                  D.value === o.id ? (c(), f("span", ii, " ✓ 已复制 ")) : F("", !0),
                  t("footer", null, [
                    t("span", null, d(o.sizeText), 1),
                    t("button", {
                      type: "button",
                      title: "图片操作",
                      onClick: S((E) => Fe(o, E), ["stop"])
                    }, " ··· ", 8, ni)
                  ])
                ], 42, Zt))), 128))
              ]),
              s(n).totalPages > 1 ? (c(), f("nav", si, [
                t("div", oi, [
                  t("span", ai, [
                    i[8] || (i[8] = re("共 ", -1)),
                    t("strong", null, d(s(n).totalCount), 1),
                    i[9] || (i[9] = re(" 张", -1))
                  ]),
                  t("span", ri, "每页 " + d(s(n).pageSize) + " 张", 1)
                ]),
                t("div", li, [
                  t("button", {
                    type: "button",
                    class: "sticker-nav-btn",
                    disabled: k.value || s(n).currentPage <= 1,
                    title: "上一页",
                    onClick: Ke
                  }, " ‹ 上一页 ", 8, ci),
                  t("div", di, [
                    (c(!0), f(z, null, ve(Ne.value, (o, E) => (c(), f(z, { key: E }, [
                      o === -1 ? (c(), f("span", ui, "…")) : (c(), f("button", {
                        key: 1,
                        type: "button",
                        class: O(["sticker-num-btn", { active: o === s(n).currentPage }]),
                        disabled: k.value,
                        onClick: (ee) => Ue(o)
                      }, d(o), 11, fi))
                    ], 64))), 128))
                  ]),
                  t("button", {
                    type: "button",
                    class: "sticker-nav-btn",
                    disabled: k.value || s(n).currentPage >= s(n).totalPages,
                    title: "下一页",
                    onClick: Oe
                  }, " 下一页 › ", 8, vi)
                ]),
                t("div", pi, [
                  t("span", mi, d(s(n).currentPage) + " / " + d(s(n).totalPages), 1)
                ])
              ])) : F("", !0)
            ])
          ], 32)
        ], 2)
      ], 512), [
        [Me, l()]
      ]),
      (c(), pe(xe, { to: "body" }, [
        b.visible ? (c(), f("div", {
          key: 0,
          class: "sticker-context-menu",
          style: me({ left: `${b.x}px`, top: `${b.y}px` }),
          onClick: i[5] || (i[5] = S(() => {
          }, ["stop"]))
        }, [
          t("button", {
            type: "button",
            class: "sticker-menu-item",
            onClick: We
          }, [
            i[10] || (i[10] = t("span", { class: "menu-icon" }, "📋", -1)),
            re(" " + d(s(_)("stickers.menu.copyImage")), 1)
          ]),
          t("button", {
            type: "button",
            class: "sticker-menu-item",
            onClick: He
          }, [
            i[11] || (i[11] = t("span", { class: "menu-icon" }, "🔍", -1)),
            re(" " + d(s(_)("stickers.menu.viewLarge")), 1)
          ]),
          s(n).storageKind === "directory" ? (c(), f("div", hi, [
            ce(t("select", {
              "onUpdate:modelValue": i[3] || (i[3] = (o) => V.value = o),
              "aria-label": "选择图片分类",
              disabled: k.value
            }, [
              t("option", yi, d(s(_)("stickers.menu.chooseCategory")), 1),
              (c(!0), f(z, null, ve(s(n).folders, (o) => (c(), f("option", {
                key: o.path,
                value: o.path
              }, d(o.path ? `${"－".repeat(o.depth)}${o.name}` : "未分类（全部中保留）"), 9, ki))), 128))
            ], 8, bi), [
              [tt, V.value]
            ]),
            t("button", {
              type: "button",
              class: "sticker-menu-item",
              disabled: k.value || V.value === "__choose__",
              onClick: h
            }, d(s(_)("stickers.menu.saveCategory")), 9, gi)
          ])) : F("", !0),
          i[13] || (i[13] = t("div", { class: "sticker-menu-divider" }, null, -1)),
          t("button", {
            type: "button",
            class: O(["sticker-menu-item danger", { "is-confirming": b.isConfirmingDelete }]),
            onClick: i[4] || (i[4] = (o) => je(o))
          }, [
            i[12] || (i[12] = t("span", { class: "menu-icon" }, "🗑️", -1)),
            re(" " + d(s(n).storageKind === "directory" ? s(_)("stickers.menu.deleteDiskOriginal") : b.isConfirmingDelete ? s(_)("stickers.menu.confirmDeleteBuiltin") : s(_)("stickers.menu.deleteBuiltin")), 1)
          ], 2)
        ], 4)) : F("", !0)
      ])),
      (c(), pe(xe, { to: "body" }, [
        w.visible && w.item ? (c(), f("div", {
          key: 0,
          class: "sticker-lightbox-window",
          style: me({ left: `${a.x}px`, top: `${a.y}px` })
        }, [
          t("div", {
            class: "sticker-lightbox-dialog",
            onClick: i[7] || (i[7] = S(() => {
            }, ["stop"]))
          }, [
            t("header", {
              class: "sticker-lightbox-head",
              onMousedown: J
            }, [
              t("div", wi, [
                t("strong", null, d(w.item.file), 1),
                t("small", null, d(w.item.sizeText) + " · 本地浮窗预览（拖动标题栏移动，Esc 关闭）", 1)
              ]),
              t("div", _i, [
                t("button", {
                  type: "button",
                  class: "lightbox-action-btn copy",
                  title: "复制到剪贴板，支持直接在微信/QQ粘贴",
                  onClick: i[6] || (i[6] = (o) => _e(w.item))
                }, " 📋 复制图片 "),
                t("button", {
                  type: "button",
                  class: "lightbox-close-btn",
                  title: "关闭大图预览 (Esc)",
                  onClick: N
                }, " ✕ ")
              ])
            ], 32),
            t("div", xi, [
              t("img", {
                src: w.item.url,
                alt: w.item.file,
                class: "sticker-lightbox-img"
              }, null, 8, Ci)
            ])
          ])
        ], 4)) : F("", !0)
      ]))
    ]));
  }
}), Mi = /* @__PURE__ */ Se(Pi, [["__scopeId", "data-v-44e7a1fb"]]);
export {
  Mi as S
};
