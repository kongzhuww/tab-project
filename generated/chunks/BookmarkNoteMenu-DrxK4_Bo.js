import { d as F, C as w, y as g, o as a, e as s, f as e, u as n, g as m, t as r, B as E, l as k, p as V, F as L, h as M, n as p, k as S, A as $ } from "./vendor-vue-DokqDua_.js";
import { e as i } from "./search.service-DGqXHLyU.js";
const B = ["hidden"], D = ["src"], N = { id: "bookmark-note-title" }, U = { id: "bookmark-context-host" }, O = ["hidden"], G = ["hidden"], K = ["value"], T = ["hidden"], z = {
  id: "bookmark-rename-label",
  for: "bookmark-rename-input"
}, R = ["hidden"], A = ["hidden"], I = ["hidden"], H = /* @__PURE__ */ F({
  __name: "BookmarkNoteMenu",
  setup(P) {
    const t = i.state;
    w(() => {
      const u = (l) => {
        if (!t.isOpen) return;
        const C = l.target, c = document.getElementById("bookmark-note-menu");
        c && !c.contains(C) && i.closeMenu();
      }, o = (l) => {
        l.key === "Escape" && t.isOpen && i.closeMenu();
      };
      document.addEventListener("pointerdown", u, !0), document.addEventListener("keydown", o), g(() => {
        document.removeEventListener("pointerdown", u, !0), document.removeEventListener("keydown", o);
      });
    });
    function y() {
      i.openBookmark();
    }
    function v() {
      i.newSubFolder();
    }
    function d(u) {
      i.setMode(u);
    }
    function f() {
      i.saveToLauncher();
    }
    function b() {
      i.saveRename();
    }
    function x() {
      i.saveNote();
    }
    function h() {
      i.confirmDelete();
    }
    return (u, o) => (a(), s("div", {
      id: "bookmark-note-menu",
      class: "bookmark-note-menu",
      role: "menu",
      "aria-label": "书签操作",
      hidden: !n(t).isOpen,
      style: $({ left: n(t).left + "px", top: n(t).top + "px" })
    }, [
      e("header", {
        class: E(["bookmark-context-head", { folder: n(t).isFolder }])
      }, [
        !n(t).isFolder && n(t).iconUrl ? (a(), s("img", {
          key: 0,
          id: "bookmark-context-icon",
          src: n(t).iconUrl,
          alt: ""
        }, null, 8, D)) : m("", !0),
        e("span", null, [
          e("b", N, r(n(t).title), 1),
          e("small", U, r(n(t).hostOrCount), 1)
        ])
      ], 2),
      e("div", {
        id: "bookmark-context-actions",
        class: "bookmark-context-actions",
        hidden: n(t).mode !== "actions"
      }, [
        e("button", {
          id: "bookmark-context-open",
          type: "button",
          role: "menuitem",
          onClick: y
        }, [
          e("b", null, r(n(t).isFolder ? "打开文件夹" : "打开书签"), 1),
          o[11] || (o[11] = e("kbd", null, "Enter", -1))
        ]),
        n(t).isFolder ? (a(), s("button", {
          key: 0,
          id: "bookmark-context-new-folder",
          type: "button",
          role: "menuitem",
          onClick: v
        }, [...o[12] || (o[12] = [
          e("b", null, "新建子文件夹", -1)
        ])])) : m("", !0),
        n(t).isFolder ? m("", !0) : (a(), s("button", {
          key: 1,
          id: "bookmark-context-launcher",
          type: "button",
          role: "menuitem",
          onClick: o[0] || (o[0] = (l) => d("launcher"))
        }, [...o[13] || (o[13] = [
          e("b", null, "添加到常用网站", -1)
        ])])),
        e("button", {
          id: "bookmark-context-rename",
          type: "button",
          role: "menuitem",
          onClick: o[1] || (o[1] = (l) => d("rename"))
        }, [
          e("b", null, r(n(t).isFolder ? "重命名文件夹" : "重命名书签"), 1)
        ]),
        n(t).isFolder ? m("", !0) : (a(), s("button", {
          key: 2,
          id: "bookmark-context-note",
          type: "button",
          role: "menuitem",
          onClick: o[2] || (o[2] = (l) => d("note"))
        }, [...o[14] || (o[14] = [
          e("b", null, "更改备注", -1)
        ])])),
        o[15] || (o[15] = e("i", null, null, -1)),
        e("button", {
          id: "bookmark-context-delete",
          class: "danger",
          type: "button",
          role: "menuitem",
          onClick: o[3] || (o[3] = (l) => d("delete"))
        }, [
          e("b", null, r(n(t).isFolder ? "删除文件夹" : "删除书签"), 1)
        ])
      ], 8, O),
      e("section", {
        id: "bookmark-launcher-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "launcher"
      }, [
        o[16] || (o[16] = e("label", { for: "bookmark-launcher-group-select" }, "选择常用网站分组", -1)),
        k(e("select", {
          id: "bookmark-launcher-group-select",
          "onUpdate:modelValue": o[4] || (o[4] = (l) => n(t).selectedLauncherGroup = l)
        }, [
          (a(!0), s(L, null, M(n(t).launcherGroups, (l) => (a(), s("option", {
            key: l,
            value: l
          }, r(l), 9, K))), 128))
        ], 512), [
          [V, n(t).selectedLauncherGroup]
        ]),
        e("div", null, [
          e("button", {
            id: "bookmark-launcher-cancel",
            type: "button",
            onClick: o[5] || (o[5] = (l) => d("actions"))
          }, "返回"),
          e("button", {
            id: "bookmark-launcher-save",
            class: "primary",
            type: "button",
            onClick: f
          }, "确认添加")
        ])
      ], 8, G),
      e("section", {
        id: "bookmark-rename-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "rename"
      }, [
        e("label", z, r(n(t).isFolder ? "重命名文件夹" : "重命名书签"), 1),
        k(e("input", {
          id: "bookmark-rename-input",
          "onUpdate:modelValue": o[6] || (o[6] = (l) => n(t).renameValue = l),
          type: "text",
          maxlength: "120",
          placeholder: "输入新名称",
          autocomplete: "off",
          onKeydown: S(b, ["enter"])
        }, null, 544), [
          [p, n(t).renameValue]
        ]),
        e("div", null, [
          e("button", {
            id: "bookmark-rename-cancel",
            type: "button",
            onClick: o[7] || (o[7] = (l) => d("actions"))
          }, "返回"),
          e("button", {
            id: "bookmark-rename-save",
            class: "primary",
            type: "button",
            onClick: b
          }, "保存")
        ])
      ], 8, T),
      e("section", {
        id: "bookmark-note-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "note"
      }, [
        o[17] || (o[17] = e("label", { for: "bookmark-note-input" }, "书签备注", -1)),
        k(e("textarea", {
          id: "bookmark-note-input",
          "onUpdate:modelValue": o[8] || (o[8] = (l) => n(t).noteValue = l),
          maxlength: "160",
          rows: "3",
          placeholder: "写一句备注"
        }, null, 512), [
          [p, n(t).noteValue]
        ]),
        e("div", null, [
          e("button", {
            id: "bookmark-note-cancel",
            type: "button",
            onClick: o[9] || (o[9] = (l) => d("actions"))
          }, "返回"),
          e("button", {
            id: "bookmark-note-save",
            class: "primary",
            type: "button",
            onClick: x
          }, "保存备注")
        ])
      ], 8, R),
      e("section", {
        id: "bookmark-delete-confirm",
        class: "bookmark-delete-confirm",
        hidden: n(t).mode !== "delete"
      }, [
        e("b", null, r(n(t).isFolder ? "删除这个文件夹？" : "删除这个书签？"), 1),
        e("p", null, r(n(t).isFolder ? "文件夹及其中全部书签将从浏览器中移除，此操作无法撤销。" : "将同时从 Edge/Chrome 书签中移除，此操作无法撤销。"), 1),
        e("div", null, [
          e("button", {
            id: "bookmark-delete-cancel",
            type: "button",
            onClick: o[10] || (o[10] = (l) => d("actions"))
          }, "取消"),
          e("button", {
            id: "bookmark-delete-apply",
            class: "danger",
            type: "button",
            onClick: h
          }, "确认删除")
        ])
      ], 8, A),
      e("p", {
        id: "bookmark-context-status",
        class: "bookmark-context-status",
        role: "status",
        hidden: !n(t).statusVisible
      }, r(n(t).statusText), 9, I)
    ], 12, B));
  }
});
export {
  H as default
};
