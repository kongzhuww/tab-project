import { d as Ae, w as z, L as Ve, o as f, g as D, h, u as l, s as T, f as ue, k as a, i as W, e as ce, P as Oe, t as J, J as qe, F as pe, j as fe, C as ge, B as me, l as Ge, b as _, y as he } from "./vendor-vue-FFI3kJnP.js";
import { u as Re, _ as Ue, I as ze } from "./useInlineTitleEdit-BydmJujj.js";
import { n as ve } from "./view-styles-1_9YE1SR.js";
import { a as g, Y as We } from "./search.service-Ct9e-A4u.js";
import { f as H, l as v, b as w } from "./store-DzGR9XOR.js";
import { L as Je, k as $, m as we } from "./main-DRLlt3xJ.js";
import { L as je } from "./LauncherFolderSurface-D-7z7S2M.js";
import { _ as Ke } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const Qe = { class: "launcher-folder-island" }, Ze = ["hidden"], et = ["title"], tt = { class: "launcher-folder-title-box" }, nt = { class: "folder-title-text" }, ot = ["disabled"], rt = ["disabled"], lt = ["data-child-folder", "title", "onClick", "onContextmenu", "onDragstart", "onDrop"], at = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], it = { class: "launcher-label" }, st = { class: "launcher-label" }, dt = /* @__PURE__ */ Ae({
  __name: "LauncherFolderDialog",
  setup(ut) {
    const r = H, A = _(!1), y = _(!1);
    function X(e) {
      ve.show({ appName: "常用网站", title: "文件夹操作未完成", message: e instanceof Error ? e.message : "请刷新核对，未自动重试。" });
    }
    function j(e) {
      I || y.value || Date.now() < M || w.dispatch("folder:open", e);
    }
    async function ye() {
      const e = r.activeFolder;
      if (!(!e || y.value)) {
        y.value = !0;
        try {
          await g.createFolder("small", void 0, void 0, e);
        } catch (t) {
          X(t);
        } finally {
          y.value = !1;
        }
      }
    }
    async function be() {
      const e = r.activeFolder, t = r.parentFolder;
      if (!(!e || !t || y.value)) {
        y.value = !0;
        try {
          await g.moveFolderInto(e, g.getFolderParent(t));
        } catch (n) {
          X(n);
        } finally {
          y.value = !1;
        }
      }
    }
    function De(e, t) {
      t.dataTransfer?.setData("application/x-newtab-launcher-folder", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
    }
    function ke() {
      r.dropHoverValid = !1;
    }
    z(() => r.isOpen, (e) => {
      e ? requestAnimationFrame(() => {
        A.value = !0;
      }) : A.value = !1;
    });
    let N = !1, K = 0, Q = 0, Z = 0, ee = 0;
    const xe = he(() => {
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
    function Le(e) {
      if (e.target.closest("button")) return;
      const t = document.getElementById("launcher-folder-dialog");
      if (!t) return;
      N = !0, r.isDragging = !0;
      const n = t.getBoundingClientRect();
      Z = n.left, ee = n.top, K = e.clientX, Q = e.clientY;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
      }
    }
    function Ce(e) {
      if (!N) return;
      const t = e.clientX - K, n = e.clientY - Q, o = Math.max(12, Math.min(window.innerWidth - 300, Z + t)), i = Math.max(12, Math.min(window.innerHeight - 200, ee + n));
      w.setPosition({ left: o, top: i });
    }
    function te(e) {
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
    const L = Re({
      save: async (e, t) => {
        const n = We(t);
        return await g.renameGroup(e, n), n;
      },
      apply: (e, t) => {
        w.dispatch("folder:open", t), re.value = "已保存";
      },
      detachedError: (e) => {
        ve.show({ appName: "常用网站", title: "文件夹标题保存未完成", message: e, duration: 12e3 });
      }
    }), {
      editing: ne,
      draft: V,
      busy: oe,
      message: re,
      failed: O,
      revision: Ee
    } = L;
    z(() => [r.isOpen, r.activeFolder], L.reset, { flush: "sync" });
    function Pe() {
      r.activeFolder && L.start(r.activeFolder, r.activeFolder);
    }
    const Se = L.commit, Te = L.cancel;
    function He() {
      L.reset(), w.closeFolder(), w.dispatch("close");
    }
    function Ie() {
      oe.value || ne.value && O.value || (L.reset(), w.closeFolder(), w.dispatch("close"));
    }
    let b = null, le = 0, ae = 0, ie = 0, se = 0, E = null, k = !1, I = !1, M = 0, m = null, Y = "", q = 0;
    const s = _(null), Ye = he(() => s.value || r.links), d = _(null);
    let P = null;
    function C() {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), window.removeEventListener("blur", C), window.removeEventListener("keydown", G), k && (M = Date.now() + 400);
      try {
        m && b !== null && m.releasePointerCapture(b);
      } catch {
      }
      m = null, P = null, d.value = null, s.value = null, b = null, E = null, k = !1, Y = "", v.handleExternalDragHover(null), document.querySelectorAll(".launcher-page-tab.drop-target, #launcher-folder-dialog [data-child-folder].drop-target").forEach((e) => e.classList.remove("drop-target"));
    }
    function G(e) {
      e.key === "Escape" && (e.preventDefault(), C());
    }
    z(() => [r.isOpen, r.activeFolder], C), Ve(C);
    function Be(e, t) {
      if (t.button !== 0 || !t.isPrimary || I) return;
      C(), t.preventDefault(), t.stopPropagation(), m = t.currentTarget, m.blur();
      const n = m.getBoundingClientRect();
      ie = t.clientX - n.left, se = t.clientY - n.top, P = { link: e, x: n.left, y: n.top, width: n.width, height: n.height }, b = t.pointerId, le = t.clientX, ae = t.clientY, E = String(e.id), Y = "", q = 0, s.value = [...r.links];
      try {
        m.setPointerCapture(t.pointerId);
      } catch {
      }
      window.addEventListener("pointermove", R, { passive: !1 }), window.addEventListener("pointerup", S), window.addEventListener("pointercancel", S), window.addEventListener("blur", C), window.addEventListener("keydown", G);
    }
    function R(e) {
      if (e.pointerId !== b || !P || !k && Math.hypot(e.clientX - le, e.clientY - ae) <= 5) return;
      e.preventDefault(), k = !0, d.value = { ...P, x: e.clientX - ie, y: e.clientY - se }, document.querySelectorAll(".launcher-page-tab.drop-target").forEach((o) => o.classList.remove("drop-target"));
      const t = document.elementsFromPoint(e.clientX, e.clientY);
      if (t.find((o) => o.classList.contains("launcher-page-tab"))?.classList.add("drop-target"), t.some(
        (o) => o.id === "launcher-folder-dialog" || !!o.closest?.("#launcher-folder-dialog")
      )) {
        v.handleExternalDragHover(null), document.querySelectorAll("#launcher-folder-dialog [data-child-folder].drop-target").forEach((c) => c.classList.remove("drop-target"));
        const o = t.find((c) => c.hasAttribute("data-child-folder"));
        if (o) {
          o.classList.add("drop-target");
          return;
        }
        if (!s.value) return;
        const i = t.find((c) => {
          if (c.classList.contains("launcher-link") && c.closest("#launcher-folder-dialog-items")) {
            const p = c.getAttribute("data-launcher-id");
            return p && String(p) !== E;
          }
          return !1;
        });
        if (i) {
          const c = i.getAttribute("data-launcher-id") || "", p = i.getBoundingClientRect(), u = Math.hypot(
            e.clientX - (p.left + p.width / 2),
            e.clientY - (p.top + p.height / 2)
          ), x = Date.now();
          if (u < Math.max(p.width, p.height) * 0.48 && (c !== Y || x - q > 180)) {
            const B = s.value.findIndex((F) => String(F.id) === c), U = s.value.findIndex((F) => String(F.id) === E);
            if (U >= 0 && B >= 0 && U !== B) {
              const F = [...s.value], $e = F.splice(U, 1)[0];
              F.splice(B, 0, $e), s.value = F, Y = c, q = x;
            }
          }
        }
      } else
        v.handleExternalDragHover({
          link: P.link,
          clientX: e.clientX,
          clientY: e.clientY
        });
    }
    async function S(e) {
      if (e.pointerId !== b) return;
      const t = E, n = k, o = s.value, i = document.elementsFromPoint(e.clientX, e.clientY).find((u) => u.id !== "launcher-folder-backdrop");
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), window.removeEventListener("blur", C), window.removeEventListener("keydown", G), k && (M = Date.now() + 400);
      try {
        m && b !== null && m.releasePointerCapture(b);
      } catch {
      }
      if (m = null, P = null, d.value = null, b = null, E = null, k = !1, Y = "", document.querySelectorAll(".launcher-page-tab.drop-target").forEach((u) => u.classList.remove("drop-target")), e.type === "pointercancel" || !n || !t || I) {
        v.handleExternalDragHover(null), s.value = null;
        return;
      }
      if (!i) {
        v.handleExternalDragHover(null), s.value = null;
        return;
      }
      const c = i.closest("#launcher-folder-dialog"), p = i.closest("#launcher-folder-dialog-items");
      I = !0;
      try {
        if (c) {
          v.handleExternalDragHover(null);
          const u = i.closest("[data-child-folder]")?.dataset.childFolder;
          u ? await g.moveLinkTo(t, void 0, u) : p && o && await g.reorderFolderLinks(r.activeFolder, o.map((x) => String(x.id))), s.value = null;
        } else {
          const u = await v.handleExternalDrop({ id: t });
          if (v.handleExternalDragHover(null), u)
            H.links = H.links.filter((x) => String(x.id) !== t), s.value = null;
          else {
            const x = i.closest(".launcher-page-tab"), B = i.closest("[data-launcher-folder]");
            s.value = null, await g.moveLinkTo(t, x?.dataset.page || g.getState().activePage, B?.dataset.launcherFolder || "常用网站");
          }
        }
      } catch (u) {
        X(u), s.value = null, v.handleExternalDragHover(null);
      } finally {
        document.querySelectorAll("#launcher-folder-dialog [data-child-folder].drop-target").forEach((u) => u.classList.remove("drop-target")), I = !1;
      }
    }
    function Xe(e, t) {
      if ($.isEditingShortcuts) {
        t.preventDefault(), t.stopPropagation(), $.handleLinkSelection(e);
        return;
      }
      if (k || Date.now() < M) {
        t.preventDefault(), t.stopPropagation();
        return;
      }
      w.dispatch("link:click", { link: e, event: t });
    }
    function Ne(e, t) {
      t.preventDefault(), w.dispatch("link:contextmenu", { link: e, clientX: t.clientX, clientY: t.clientY });
    }
    function Me(e) {
      e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"), H.dropHoverValid = !0;
    }
    function _e() {
      H.dropHoverValid = !1;
    }
    async function de(e, t = r.activeFolder) {
      if (H.dropHoverValid = !1, e.preventDefault(), e.stopPropagation(), !t) return;
      const n = e.dataTransfer?.getData("application/x-newtab-launcher-folder"), o = e.dataTransfer?.getData("application/x-newtab-launcher");
      try {
        if (n) await g.moveFolderInto(n, t);
        else if (o) {
          const i = JSON.parse(o);
          i.id && await g.moveLinkTo(i.id, void 0, t);
        }
      } catch (i) {
        X(i);
      }
    }
    return (e, t) => (f(), D("div", Qe, [
      h("div", {
        id: "launcher-folder-backdrop",
        class: "launcher-folder-backdrop",
        hidden: !l(r).isOpen,
        onClick: Ie
      }, null, 8, Ze),
      T(je, {
        id: "launcher-folder-dialog",
        class: ge(["launcher-dialog launcher-folder-dialog", {
          "drop-hover-valid": l(r).dropHoverValid,
          dragging: l(r).isDragging
        }]),
        open: l(r).isOpen,
        "data-opened": A.value ? "active" : void 0,
        style: me(xe.value)
      }, {
        default: ue(() => [
          h("header", {
            title: "按住鼠标可自由拖动；双击恢复屏幕居中",
            style: { cursor: "grab", "user-select": "none" },
            onPointerdown: Le,
            onPointermove: Ce,
            onPointerup: te,
            onPointercancel: te,
            onDblclick: Fe
          }, [
            l(r).parentFolder ? (f(), D("button", {
              key: 0,
              type: "button",
              class: "folder-nav-action",
              title: `返回 ${l(r).parentFolder}`,
              "aria-label": "返回上一级",
              onPointerdown: t[0] || (t[0] = a(() => {
              }, ["stop"])),
              onClick: t[1] || (t[1] = a((n) => j(l(r).parentFolder), ["stop"]))
            }, "‹", 40, et)) : W("", !0),
            h("div", tt, [
              l(ne) ? (f(), ce(l(Ue), {
                key: 0,
                modelValue: l(V),
                "onUpdate:modelValue": t[2] || (t[2] = (n) => Oe(V) ? V.value = n : null),
                busy: l(oe),
                revision: l(Ee),
                "aria-invalid": l(O) || void 0,
                class: "launcher-folder-title-input",
                maxlength: "20",
                placeholder: "输入文件夹名称",
                onPointerdown: t[3] || (t[3] = a(() => {
                }, ["stop"])),
                onDblclick: t[4] || (t[4] = a(() => {
                }, ["stop"])),
                onCommit: l(Se),
                onCancel: l(Te)
              }, null, 8, ["modelValue", "busy", "revision", "aria-invalid", "onCommit", "onCancel"])) : (f(), D("h2", {
                key: 1,
                id: "launcher-folder-dialog-title",
                title: "点击修改名称",
                style: { cursor: "pointer", "user-select": "none" },
                onPointerdown: t[5] || (t[5] = a(() => {
                }, ["stop"])),
                onDblclick: t[6] || (t[6] = a(() => {
                }, ["stop"])),
                onClick: a(Pe, ["stop"])
              }, [
                h("span", nt, J(l(r).activeFolder), 1),
                t[13] || (t[13] = h("span", {
                  class: "folder-title-edit-hint",
                  "aria-hidden": "true"
                }, "✎", -1))
              ], 32))
            ]),
            t[14] || (t[14] = h("div", {
              class: "launcher-folder-drag-spacer",
              "aria-hidden": "true"
            }, null, -1)),
            l(r).parentFolder ? (f(), D("button", {
              key: 1,
              type: "button",
              class: "folder-nav-action",
              title: "将当前文件夹移到上一级",
              disabled: y.value,
              onPointerdown: t[7] || (t[7] = a(() => {
              }, ["stop"])),
              onClick: a(be, ["stop"])
            }, "↥", 40, ot)) : W("", !0),
            h("button", {
              type: "button",
              class: "folder-nav-action",
              title: "新建子文件夹",
              "aria-label": "新建子文件夹",
              disabled: y.value,
              onPointerdown: t[8] || (t[8] = a(() => {
              }, ["stop"])),
              onClick: a(ye, ["stop"])
            }, "＋", 40, rt),
            h("button", {
              id: "launcher-folder-close",
              type: "button",
              title: "关闭",
              onPointerdown: t[9] || (t[9] = a(() => {
              }, ["stop"])),
              onClick: a(He, ["stop"])
            }, "✕", 32)
          ], 32),
          T(l(ze), {
            message: l(re),
            failed: l(O)
          }, null, 8, ["message", "failed"]),
          T(qe, {
            tag: "div",
            id: "launcher-folder-dialog-items",
            class: "launcher-folder-dialog-items",
            name: d.value ? "folder-items-grid" : void 0,
            css: !!d.value,
            onDragover: Me,
            onDragleave: _e,
            onDrop: de
          }, {
            default: ue(() => [
              (f(!0), D(pe, null, fe(l(r).folders, (n) => (f(), D("button", {
                key: "folder:" + n.groupName,
                type: "button",
                class: "launcher-folder size-small child-folder-tile",
                "data-child-folder": n.groupName,
                title: `${n.groupName}（点击打开；可拖入其他文件夹）`,
                draggable: "true",
                onPointerdown: t[10] || (t[10] = a(() => {
                }, ["stop"])),
                onClick: a((o) => j(n.groupName), ["stop"]),
                onContextmenu: a((o) => l(v).openFolderMenu(n.groupName, l(g).getFolderPage(n.groupName), o), ["prevent"]),
                onDragstart: a((o) => De(n.groupName, o), ["stop"]),
                onDragend: ke,
                onDragover: t[11] || (t[11] = a(() => {
                }, ["prevent", "stop"])),
                onDrop: (o) => de(o, n.groupName)
              }, [
                T(Je, {
                  folder: { title: n.groupName, preview: n.links, count: n.count },
                  size: "small"
                }, null, 8, ["folder"])
              ], 40, lt))), 128)),
              (f(!0), D(pe, null, fe(Ye.value, (n) => (f(), D("a", {
                key: n.id,
                class: ge(["launcher-link", {
                  "is-pointer-dragging": d.value && String(d.value.link.id) === String(n.id),
                  "is-wheel-picked": l($).isEditingShortcuts && l($).isLinkInWheel(n.url)
                }]),
                href: n.url,
                target: "_blank",
                rel: "noreferrer",
                title: `${n.title}${n.note ? `
📝 ` + n.note : ""}
🔗 ${n.url}`,
                "data-launcher-id": n.id,
                draggable: "false",
                onPointerdown: (o) => Be(n, o),
                onDragstart: t[12] || (t[12] = a(() => {
                }, ["prevent"])),
                onClick: (o) => Xe(n, o),
                onContextmenu: (o) => Ne(n, o)
              }, [
                T(we, { link: n }, null, 8, ["link"]),
                h("span", it, J(n.title), 1)
              ], 42, at))), 128))
            ]),
            _: 1
          }, 8, ["name", "css"])
        ]),
        _: 1
      }, 8, ["class", "open", "data-opened", "style"]),
      (f(), ce(Ge, { to: "body" }, [
        d.value ? (f(), D("div", {
          key: 0,
          class: "launcher-drag-ghost folder-link-ghost",
          style: me({ left: "0", top: "0", width: d.value.width + "px", height: d.value.height + "px", transform: "translate3d(" + d.value.x + "px," + d.value.y + "px,0)" }),
          "aria-hidden": "true"
        }, [
          T(we, {
            link: d.value.link
          }, null, 8, ["link"]),
          h("span", st, J(d.value.link.title), 1)
        ], 4)) : W("", !0)
      ]))
    ]));
  }
}), yt = /* @__PURE__ */ Ke(dt, [["__scopeId", "data-v-5081c4a9"]]);
export {
  yt as default
};
