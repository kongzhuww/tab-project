import { d as Ae, x as R, L as $e, o as p, e as D, f as v, u as l, D as T, w as de, i as a, g as z, c as ue, Q as Ve, t as J, J as Oe, F as ce, h as fe, B as pe, A as ge, j as qe, b as _, s as me } from "./vendor-vue-DokqDua_.js";
import { u as Ge, _ as Ue, I as Re } from "./useInlineTitleEdit-DZUJXFgS.js";
import { n as ve } from "./view-styles-SpWNtsrK.js";
import { a as g, X as ze } from "./search.service-CxgDk0dD.js";
import { f as H, a as h, l as w } from "./youtube-store-BrWDcXtO.js";
import { L as Je, l as he } from "./main-Cwcsv4iO.js";
import { L as je } from "./LauncherFolderSurface-CfetyZ6P.js";
import { _ as Ke } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Qe = { class: "launcher-folder-island" }, We = ["hidden"], Ze = ["title"], et = { class: "launcher-folder-title-box" }, tt = { class: "folder-title-text" }, nt = ["disabled"], ot = ["disabled"], rt = ["data-child-folder", "title", "onClick", "onContextmenu", "onDragstart", "onDrop"], lt = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], at = { class: "launcher-label" }, it = { class: "launcher-label" }, st = /* @__PURE__ */ Ae({
  __name: "LauncherFolderDialog",
  setup(dt) {
    const r = H, A = _(!1), y = _(!1);
    function Y(e) {
      ve.show({ appName: "常用网站", title: "文件夹操作未完成", message: e instanceof Error ? e.message : "请刷新核对，未自动重试。" });
    }
    function j(e) {
      I || y.value || Date.now() < M || w.dispatch("folder:open", e);
    }
    async function we() {
      const e = r.activeFolder;
      if (!(!e || y.value)) {
        y.value = !0;
        try {
          await g.createFolder("small", void 0, void 0, e);
        } catch (t) {
          Y(t);
        } finally {
          y.value = !1;
        }
      }
    }
    async function ye() {
      const e = r.activeFolder, t = r.parentFolder;
      if (!(!e || !t || y.value)) {
        y.value = !0;
        try {
          await g.moveFolderInto(e, g.getFolderParent(t));
        } catch (n) {
          Y(n);
        } finally {
          y.value = !1;
        }
      }
    }
    function be(e, t) {
      t.dataTransfer?.setData("application/x-newtab-launcher-folder", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
    }
    function De() {
      r.dropHoverValid = !1;
    }
    R(() => r.isOpen, (e) => {
      e ? requestAnimationFrame(() => {
        A.value = !0;
      }) : A.value = !1;
    });
    let N = !1, K = 0, Q = 0, W = 0, Z = 0;
    const ke = me(() => {
      const e = r.position;
      if (!e)
        return {
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          margin: "0"
        };
      const t = {
        transform: "none",
        margin: "0"
      };
      return e.left !== void 0 && (t.left = typeof e.left == "number" ? `${e.left}px` : String(e.left)), e.top !== void 0 && (t.top = typeof e.top == "number" ? `${e.top}px` : String(e.top)), e.bottom !== void 0 && (t.bottom = typeof e.bottom == "number" ? `${e.bottom}px` : String(e.bottom)), e.right !== void 0 && (t.right = typeof e.right == "number" ? `${e.right}px` : String(e.right)), e.maxHeight !== void 0 && (t.maxHeight = typeof e.maxHeight == "number" ? `${e.maxHeight}px` : String(e.maxHeight)), t;
    });
    function xe(e) {
      if (e.target.closest("button")) return;
      const t = document.getElementById("launcher-folder-dialog");
      if (!t) return;
      N = !0, r.isDragging = !0;
      const n = t.getBoundingClientRect();
      W = n.left, Z = n.top, K = e.clientX, Q = e.clientY;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
      }
    }
    function Le(e) {
      if (!N) return;
      const t = e.clientX - K, n = e.clientY - Q, o = Math.max(12, Math.min(window.innerWidth - 300, W + t)), i = Math.max(12, Math.min(window.innerHeight - 200, Z + n));
      w.setPosition({ left: o, top: i });
    }
    function ee(e) {
      if (N) {
        N = !1, r.isDragging = !1;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
        }
      }
    }
    function Fe() {
      w.setPosition(null);
    }
    const L = Ge({
      save: async (e, t) => {
        const n = ze(t);
        return await g.renameGroup(e, n), n;
      },
      apply: (e, t) => {
        w.dispatch("folder:open", t), oe.value = "已保存";
      },
      detachedError: (e) => {
        ve.show({ appName: "常用网站", title: "文件夹标题保存未完成", message: e, duration: 12e3 });
      }
    }), {
      editing: te,
      draft: $,
      busy: ne,
      message: oe,
      failed: V,
      revision: Ce
    } = L;
    R(() => [r.isOpen, r.activeFolder], L.reset, { flush: "sync" });
    function Ee() {
      r.activeFolder && L.start(r.activeFolder, r.activeFolder);
    }
    const Pe = L.commit, Se = L.cancel;
    function Te() {
      L.reset(), w.closeFolder(), w.dispatch("close");
    }
    function He() {
      ne.value || te.value && V.value || (L.reset(), w.closeFolder(), w.dispatch("close"));
    }
    let b = null, re = 0, le = 0, ae = 0, ie = 0, E = null, k = !1, I = !1, M = 0, m = null, X = "", O = 0;
    const s = _(null), Ie = me(() => s.value || r.links), d = _(null);
    let P = null;
    function F() {
      window.removeEventListener("pointermove", G), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), window.removeEventListener("blur", F), window.removeEventListener("keydown", q), k && (M = Date.now() + 400);
      try {
        m && b !== null && m.releasePointerCapture(b);
      } catch {
      }
      m = null, P = null, d.value = null, s.value = null, b = null, E = null, k = !1, X = "", h.handleExternalDragHover(null), document.querySelectorAll(".launcher-page-tab.drop-target, #launcher-folder-dialog [data-child-folder].drop-target").forEach((e) => e.classList.remove("drop-target"));
    }
    function q(e) {
      e.key === "Escape" && (e.preventDefault(), F());
    }
    R(() => [r.isOpen, r.activeFolder], F), $e(F);
    function Xe(e, t) {
      if (t.button !== 0 || !t.isPrimary || I) return;
      F(), t.preventDefault(), t.stopPropagation(), m = t.currentTarget, m.blur();
      const n = m.getBoundingClientRect();
      ae = t.clientX - n.left, ie = t.clientY - n.top, P = { link: e, x: n.left, y: n.top, width: n.width, height: n.height }, b = t.pointerId, re = t.clientX, le = t.clientY, E = String(e.id), X = "", O = 0, s.value = [...r.links];
      try {
        m.setPointerCapture(t.pointerId);
      } catch {
      }
      window.addEventListener("pointermove", G, { passive: !1 }), window.addEventListener("pointerup", S), window.addEventListener("pointercancel", S), window.addEventListener("blur", F), window.addEventListener("keydown", q);
    }
    function G(e) {
      if (e.pointerId !== b || !P || !k && Math.hypot(e.clientX - re, e.clientY - le) <= 5) return;
      e.preventDefault(), k = !0, d.value = { ...P, x: e.clientX - ae, y: e.clientY - ie }, document.querySelectorAll(".launcher-page-tab.drop-target").forEach((o) => o.classList.remove("drop-target"));
      const t = document.elementsFromPoint(e.clientX, e.clientY);
      if (t.find((o) => o.classList.contains("launcher-page-tab"))?.classList.add("drop-target"), t.some(
        (o) => o.id === "launcher-folder-dialog" || !!o.closest?.("#launcher-folder-dialog")
      )) {
        h.handleExternalDragHover(null), document.querySelectorAll("#launcher-folder-dialog [data-child-folder].drop-target").forEach((c) => c.classList.remove("drop-target"));
        const o = t.find((c) => c.hasAttribute("data-child-folder"));
        if (o) {
          o.classList.add("drop-target");
          return;
        }
        if (!s.value) return;
        const i = t.find((c) => {
          if (c.classList.contains("launcher-link") && c.closest("#launcher-folder-dialog-items")) {
            const f = c.getAttribute("data-launcher-id");
            return f && String(f) !== E;
          }
          return !1;
        });
        if (i) {
          const c = i.getAttribute("data-launcher-id") || "", f = i.getBoundingClientRect(), u = Math.hypot(
            e.clientX - (f.left + f.width / 2),
            e.clientY - (f.top + f.height / 2)
          ), x = Date.now();
          if (u < Math.max(f.width, f.height) * 0.48 && (c !== X || x - O > 180)) {
            const B = s.value.findIndex((C) => String(C.id) === c), U = s.value.findIndex((C) => String(C.id) === E);
            if (U >= 0 && B >= 0 && U !== B) {
              const C = [...s.value], _e = C.splice(U, 1)[0];
              C.splice(B, 0, _e), s.value = C, X = c, O = x;
            }
          }
        }
      } else
        h.handleExternalDragHover({
          link: P.link,
          clientX: e.clientX,
          clientY: e.clientY
        });
    }
    async function S(e) {
      if (e.pointerId !== b) return;
      const t = E, n = k, o = s.value, i = document.elementsFromPoint(e.clientX, e.clientY).find((u) => u.id !== "launcher-folder-backdrop");
      window.removeEventListener("pointermove", G), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), window.removeEventListener("blur", F), window.removeEventListener("keydown", q), k && (M = Date.now() + 400);
      try {
        m && b !== null && m.releasePointerCapture(b);
      } catch {
      }
      if (m = null, P = null, d.value = null, b = null, E = null, k = !1, X = "", document.querySelectorAll(".launcher-page-tab.drop-target").forEach((u) => u.classList.remove("drop-target")), e.type === "pointercancel" || !n || !t || I) {
        h.handleExternalDragHover(null), s.value = null;
        return;
      }
      if (!i) {
        h.handleExternalDragHover(null), s.value = null;
        return;
      }
      const c = i.closest("#launcher-folder-dialog"), f = i.closest("#launcher-folder-dialog-items");
      I = !0;
      try {
        if (c) {
          h.handleExternalDragHover(null);
          const u = i.closest("[data-child-folder]")?.dataset.childFolder;
          u ? await g.moveLinkTo(t, void 0, u) : f && o && await g.reorderFolderLinks(r.activeFolder, o.map((x) => String(x.id))), s.value = null;
        } else {
          const u = await h.handleExternalDrop({ id: t });
          if (h.handleExternalDragHover(null), u)
            H.links = H.links.filter((x) => String(x.id) !== t), s.value = null;
          else {
            const x = i.closest(".launcher-page-tab"), B = i.closest("[data-launcher-folder]");
            s.value = null, await g.moveLinkTo(t, x?.dataset.page || g.getState().activePage, B?.dataset.launcherFolder || "常用网站");
          }
        }
      } catch (u) {
        Y(u), s.value = null, h.handleExternalDragHover(null);
      } finally {
        document.querySelectorAll("#launcher-folder-dialog [data-child-folder].drop-target").forEach((u) => u.classList.remove("drop-target")), I = !1;
      }
    }
    function Be(e, t) {
      if (k || Date.now() < M) {
        t.preventDefault(), t.stopPropagation();
        return;
      }
      w.dispatch("link:click", { link: e, event: t });
    }
    function Ye(e, t) {
      t.preventDefault(), w.dispatch("link:contextmenu", { link: e, clientX: t.clientX, clientY: t.clientY });
    }
    function Ne(e) {
      e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"), H.dropHoverValid = !0;
    }
    function Me() {
      H.dropHoverValid = !1;
    }
    async function se(e, t = r.activeFolder) {
      if (H.dropHoverValid = !1, e.preventDefault(), e.stopPropagation(), !t) return;
      const n = e.dataTransfer?.getData("application/x-newtab-launcher-folder"), o = e.dataTransfer?.getData("application/x-newtab-launcher");
      try {
        if (n) await g.moveFolderInto(n, t);
        else if (o) {
          const i = JSON.parse(o);
          i.id && await g.moveLinkTo(i.id, void 0, t);
        }
      } catch (i) {
        Y(i);
      }
    }
    return (e, t) => (p(), D("div", Qe, [
      v("div", {
        id: "launcher-folder-backdrop",
        class: "launcher-folder-backdrop",
        hidden: !l(r).isOpen,
        onClick: He
      }, null, 8, We),
      T(je, {
        id: "launcher-folder-dialog",
        class: pe(["launcher-dialog launcher-folder-dialog", {
          "drop-hover-valid": l(r).dropHoverValid,
          dragging: l(r).isDragging
        }]),
        open: l(r).isOpen,
        "data-opened": A.value ? "active" : void 0,
        style: ge(ke.value)
      }, {
        default: de(() => [
          v("header", {
            title: "按住鼠标可自由拖动；双击恢复屏幕居中",
            style: { cursor: "grab", "user-select": "none" },
            onPointerdown: xe,
            onPointermove: Le,
            onPointerup: ee,
            onPointercancel: ee,
            onDblclick: Fe
          }, [
            l(r).parentFolder ? (p(), D("button", {
              key: 0,
              type: "button",
              class: "folder-nav-action",
              title: `返回 ${l(r).parentFolder}`,
              "aria-label": "返回上一级",
              onPointerdown: t[0] || (t[0] = a(() => {
              }, ["stop"])),
              onClick: t[1] || (t[1] = a((n) => j(l(r).parentFolder), ["stop"]))
            }, "‹", 40, Ze)) : z("", !0),
            v("div", et, [
              l(te) ? (p(), ue(l(Ue), {
                key: 0,
                modelValue: l($),
                "onUpdate:modelValue": t[2] || (t[2] = (n) => Ve($) ? $.value = n : null),
                busy: l(ne),
                revision: l(Ce),
                "aria-invalid": l(V) || void 0,
                class: "launcher-folder-title-input",
                maxlength: "20",
                placeholder: "输入文件夹名称",
                onPointerdown: t[3] || (t[3] = a(() => {
                }, ["stop"])),
                onDblclick: t[4] || (t[4] = a(() => {
                }, ["stop"])),
                onCommit: l(Pe),
                onCancel: l(Se)
              }, null, 8, ["modelValue", "busy", "revision", "aria-invalid", "onCommit", "onCancel"])) : (p(), D("h2", {
                key: 1,
                id: "launcher-folder-dialog-title",
                title: "点击修改名称",
                style: { cursor: "pointer", "user-select": "none" },
                onPointerdown: t[5] || (t[5] = a(() => {
                }, ["stop"])),
                onDblclick: t[6] || (t[6] = a(() => {
                }, ["stop"])),
                onClick: a(Ee, ["stop"])
              }, [
                v("span", tt, J(l(r).activeFolder), 1),
                t[13] || (t[13] = v("span", {
                  class: "folder-title-edit-hint",
                  "aria-hidden": "true"
                }, "✎", -1))
              ], 32))
            ]),
            t[14] || (t[14] = v("div", {
              class: "launcher-folder-drag-spacer",
              "aria-hidden": "true"
            }, null, -1)),
            l(r).parentFolder ? (p(), D("button", {
              key: 1,
              type: "button",
              class: "folder-nav-action",
              title: "将当前文件夹移到上一级",
              disabled: y.value,
              onPointerdown: t[7] || (t[7] = a(() => {
              }, ["stop"])),
              onClick: a(ye, ["stop"])
            }, "↥", 40, nt)) : z("", !0),
            v("button", {
              type: "button",
              class: "folder-nav-action",
              title: "新建子文件夹",
              "aria-label": "新建子文件夹",
              disabled: y.value,
              onPointerdown: t[8] || (t[8] = a(() => {
              }, ["stop"])),
              onClick: a(we, ["stop"])
            }, "＋", 40, ot),
            v("button", {
              id: "launcher-folder-close",
              type: "button",
              title: "关闭",
              onPointerdown: t[9] || (t[9] = a(() => {
              }, ["stop"])),
              onClick: a(Te, ["stop"])
            }, "✕", 32)
          ], 32),
          T(l(Re), {
            message: l(oe),
            failed: l(V)
          }, null, 8, ["message", "failed"]),
          T(Oe, {
            tag: "div",
            id: "launcher-folder-dialog-items",
            class: "launcher-folder-dialog-items",
            name: d.value ? "folder-items-grid" : void 0,
            css: !!d.value,
            onDragover: Ne,
            onDragleave: Me,
            onDrop: se
          }, {
            default: de(() => [
              (p(!0), D(ce, null, fe(l(r).folders, (n) => (p(), D("button", {
                key: "folder:" + n.groupName,
                type: "button",
                class: "launcher-folder size-small child-folder-tile",
                "data-child-folder": n.groupName,
                title: `${n.groupName}（点击打开；可拖入其他文件夹）`,
                draggable: "true",
                onPointerdown: t[10] || (t[10] = a(() => {
                }, ["stop"])),
                onClick: a((o) => j(n.groupName), ["stop"]),
                onContextmenu: a((o) => l(h).openFolderMenu(n.groupName, l(g).getFolderPage(n.groupName), o), ["prevent"]),
                onDragstart: a((o) => be(n.groupName, o), ["stop"]),
                onDragend: De,
                onDragover: t[11] || (t[11] = a(() => {
                }, ["prevent", "stop"])),
                onDrop: (o) => se(o, n.groupName)
              }, [
                T(Je, {
                  folder: { title: n.groupName, preview: n.links, count: n.count },
                  size: "small"
                }, null, 8, ["folder"])
              ], 40, rt))), 128)),
              (p(!0), D(ce, null, fe(Ie.value, (n) => (p(), D("a", {
                key: n.id,
                class: pe(["launcher-link", { "is-pointer-dragging": d.value && String(d.value.link.id) === String(n.id) }]),
                href: n.url,
                target: "_blank",
                rel: "noreferrer",
                title: `${n.title}${n.note ? `
📝 ` + n.note : ""}
🔗 ${n.url}`,
                "data-launcher-id": n.id,
                draggable: "false",
                onPointerdown: (o) => Xe(n, o),
                onDragstart: t[12] || (t[12] = a(() => {
                }, ["prevent"])),
                onClick: (o) => Be(n, o),
                onContextmenu: (o) => Ye(n, o)
              }, [
                T(he, { link: n }, null, 8, ["link"]),
                v("span", at, J(n.title), 1)
              ], 42, lt))), 128))
            ]),
            _: 1
          }, 8, ["name", "css"])
        ]),
        _: 1
      }, 8, ["class", "open", "data-opened", "style"]),
      (p(), ue(qe, { to: "body" }, [
        d.value ? (p(), D("div", {
          key: 0,
          class: "launcher-drag-ghost folder-link-ghost",
          style: ge({ left: "0", top: "0", width: d.value.width + "px", height: d.value.height + "px", transform: "translate3d(" + d.value.x + "px," + d.value.y + "px,0)" }),
          "aria-hidden": "true"
        }, [
          T(he, {
            link: d.value.link
          }, null, 8, ["link"]),
          v("span", it, J(d.value.link.title), 1)
        ], 4)) : z("", !0)
      ]))
    ]));
  }
}), wt = /* @__PURE__ */ Ke(st, [["__scopeId", "data-v-6fe15385"]]);
export {
  wt as default
};
