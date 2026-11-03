import { d as w, D as g, z as F, o as s, g as u, h as e, u as n, i as m, t as i, C as V, s as E, n as c, q as p, m as S, B as L } from "./vendor-vue-FFI3kJnP.js";
import { e as r } from "./search.service-DacqWPJU.js";
import { C as M } from "./view-styles-BecvgcJv.js";
const $ = ["hidden"], B = ["src"], D = { id: "bookmark-note-title" }, N = { id: "bookmark-context-host" }, U = ["hidden"], O = ["hidden"], z = ["hidden"], G = {
  id: "bookmark-rename-label",
  for: "bookmark-rename-input"
}, K = ["hidden"], T = ["hidden"], R = ["hidden"], A = /* @__PURE__ */ w({
  __name: "BookmarkNoteMenu",
  setup(q) {
    const t = r.state;
    g(() => {
      const a = (l) => {
        if (!t.isOpen) return;
        const h = l.target, b = document.getElementById("bookmark-note-menu");
        b && !b.contains(h) && r.closeMenu();
      }, o = (l) => {
        l.key === "Escape" && t.isOpen && r.closeMenu();
      };
      document.addEventListener("pointerdown", a, !0), document.addEventListener("keydown", o), F(() => {
        document.removeEventListener("pointerdown", a, !0), document.removeEventListener("keydown", o);
      });
    });
    function y() {
      r.openBookmark();
    }
    function v() {
      r.newSubFolder();
    }
    function d(a) {
      r.setMode(a);
    }
    function f() {
      r.saveToLauncher();
    }
    function k() {
      r.saveRename();
    }
    function x() {
      r.saveNote();
    }
    function C() {
      r.confirmDelete();
    }
    return (a, o) => (s(), u("div", {
      id: "bookmark-note-menu",
      class: "bookmark-note-menu",
      role: "menu",
      "aria-label": "书签操作",
      hidden: !n(t).isOpen,
      style: L({ left: n(t).left + "px", top: n(t).top + "px" })
    }, [
      e("header", {
        class: V(["bookmark-context-head", { folder: n(t).isFolder }])
      }, [
        !n(t).isFolder && n(t).iconUrl ? (s(), u("img", {
          key: 0,
          id: "bookmark-context-icon",
          src: n(t).iconUrl,
          alt: ""
        }, null, 8, B)) : m("", !0),
        e("span", null, [
          e("b", D, i(n(t).title), 1),
          e("small", N, i(n(t).hostOrCount), 1)
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
          e("b", null, i(n(t).isFolder ? "打开文件夹" : "打开书签"), 1),
          o[11] || (o[11] = e("kbd", null, "Enter", -1))
        ]),
        n(t).isFolder ? (s(), u("button", {
          key: 0,
          id: "bookmark-context-new-folder",
          type: "button",
          role: "menuitem",
          onClick: v
        }, [...o[12] || (o[12] = [
          e("b", null, "新建子文件夹", -1)
        ])])) : m("", !0),
        n(t).isFolder ? m("", !0) : (s(), u("button", {
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
          e("b", null, i(n(t).isFolder ? "重命名文件夹" : "重命名书签"), 1)
        ]),
        n(t).isFolder ? m("", !0) : (s(), u("button", {
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
          e("b", null, i(n(t).isFolder ? "删除文件夹" : "删除书签"), 1)
        ])
      ], 8, U),
      e("section", {
        id: "bookmark-launcher-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "launcher"
      }, [
        o[16] || (o[16] = e("label", { for: "bookmark-launcher-group-select" }, "选择常用网站分区", -1)),
        E(M, {
          id: "bookmark-launcher-group-select",
          modelValue: n(t).selectedLauncherGroup,
          "onUpdate:modelValue": o[4] || (o[4] = (l) => n(t).selectedLauncherGroup = l),
          options: n(t).launcherGroups,
          size: "sm"
        }, null, 8, ["modelValue", "options"]),
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
          }, "确认收藏")
        ])
      ], 8, O),
      e("section", {
        id: "bookmark-rename-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "rename"
      }, [
        e("label", G, i(n(t).isFolder ? "重命名文件夹" : "重命名书签"), 1),
        c(e("input", {
          id: "bookmark-rename-input",
          "onUpdate:modelValue": o[6] || (o[6] = (l) => n(t).renameValue = l),
          type: "text",
          maxlength: "120",
          placeholder: "输入新名称",
          autocomplete: "off",
          onKeydown: S(k, ["enter"])
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
            onClick: k
          }, "保存")
        ])
      ], 8, z),
      e("section", {
        id: "bookmark-note-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "note"
      }, [
        o[17] || (o[17] = e("label", { for: "bookmark-note-input" }, "书签备注", -1)),
        c(e("textarea", {
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
      ], 8, K),
      e("section", {
        id: "bookmark-delete-confirm",
        class: "bookmark-delete-confirm",
        hidden: n(t).mode !== "delete"
      }, [
        e("b", null, i(n(t).isFolder ? "删除这个文件夹？" : "删除这个书签？"), 1),
        e("p", null, i(n(t).isFolder ? "文件夹及其中全部书签将从浏览器中移除，此操作无法撤销。" : "将同时从 Edge/Chrome 书签中移除，此操作无法撤销。"), 1),
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
            onClick: C
          }, "确认删除")
        ])
      ], 8, T),
      e("p", {
        id: "bookmark-context-status",
        class: "bookmark-context-status",
        role: "status",
        hidden: !n(t).statusVisible
      }, i(n(t).statusText), 9, R)
    ], 12, $));
  }
});
export {
  A as default
};
