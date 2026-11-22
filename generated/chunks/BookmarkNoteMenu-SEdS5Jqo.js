import { d as F, o as V, e as g, f as s, g as u, h as o, u as n, j as m, t as d, q as E, B as S, p, v as c, n as M } from "./vendor-vue-_upDT3S_.js";
import { o as L } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { d as i } from "./search.service-I5ZPPxGy.js";
import { C as $ } from "./CustomSelect-DO3yQybc.js";
import { w as B } from "./web-task-store-XxOqv0xY.js";
const N = ["hidden"], U = ["src"], D = { id: "bookmark-note-title" }, O = { id: "bookmark-context-host" }, T = ["hidden"], z = ["hidden"], G = ["hidden"], I = {
  id: "bookmark-rename-label",
  for: "bookmark-rename-input"
}, K = ["hidden"], R = ["hidden"], j = ["hidden"], W = /* @__PURE__ */ F({
  __name: "BookmarkNoteMenu",
  setup(q) {
    const t = i.state;
    V(() => {
      const r = (l) => {
        if (!t.isOpen) return;
        const w = l.target, b = document.getElementById("bookmark-note-menu");
        b && !b.contains(w) && i.closeMenu();
      }, e = (l) => {
        l.key === "Escape" && t.isOpen && i.closeMenu();
      };
      document.addEventListener("pointerdown", r, !0), document.addEventListener("keydown", e), g(() => {
        document.removeEventListener("pointerdown", r, !0), document.removeEventListener("keydown", e);
      });
    });
    function f() {
      i.openBookmark();
    }
    function v() {
      const r = t.item;
      !r || r.isFolder || (B.open({
        id: r.id,
        title: t.title || r.url || "",
        url: r.url || "",
        icon: t.iconUrl || void 0,
        note: t.noteValue || void 0,
        source: "bookmark"
      }), i.closeMenu());
    }
    function y() {
      i.newSubFolder();
    }
    function a(r) {
      i.setMode(r);
    }
    function x() {
      i.saveToLauncher();
    }
    function k() {
      i.saveRename();
    }
    function C() {
      i.saveNote();
    }
    function h() {
      i.confirmDelete();
    }
    return (r, e) => (s(), u("div", {
      id: "bookmark-note-menu",
      class: "bookmark-note-menu",
      role: "menu",
      "aria-label": "书签操作",
      hidden: !n(t).isOpen,
      style: M({ left: n(t).left + "px", top: n(t).top + "px" })
    }, [
      o("header", {
        class: E(["bookmark-context-head", { folder: n(t).isFolder }])
      }, [
        !n(t).isFolder && n(t).iconUrl ? (s(), u("img", {
          key: 0,
          id: "bookmark-context-icon",
          src: n(t).iconUrl,
          alt: ""
        }, null, 8, U)) : m("", !0),
        o("span", null, [
          o("b", D, d(n(t).title), 1),
          o("small", O, d(n(t).hostOrCount), 1)
        ])
      ], 2),
      o("div", {
        id: "bookmark-context-actions",
        class: "bookmark-context-actions",
        hidden: n(t).mode !== "actions"
      }, [
        o("button", {
          id: "bookmark-context-open",
          type: "button",
          role: "menuitem",
          onClick: f
        }, [
          o("b", null, d(n(t).isFolder ? "打开文件夹" : "打开书签"), 1),
          e[12] || (e[12] = o("kbd", null, "Enter", -1))
        ]),
        n(t).isFolder ? (s(), u("button", {
          key: 0,
          id: "bookmark-context-new-folder",
          type: "button",
          role: "menuitem",
          onClick: y
        }, [...e[13] || (e[13] = [
          o("b", null, "新建子文件夹", -1)
        ])])) : m("", !0),
        n(t).isFolder ? m("", !0) : (s(), u("button", {
          key: 1,
          id: "bookmark-context-launcher",
          type: "button",
          role: "menuitem",
          onClick: e[0] || (e[0] = (l) => a("launcher"))
        }, [...e[14] || (e[14] = [
          o("b", null, "添加到常用网站", -1)
        ])])),
        n(t).isFolder ? m("", !0) : (s(), u("button", {
          key: 2,
          id: "bookmark-context-create-task",
          type: "button",
          role: "menuitem",
          onClick: v
        }, [...e[15] || (e[15] = [
          o("b", null, "创建任务", -1)
        ])])),
        o("button", {
          id: "bookmark-context-rename",
          type: "button",
          role: "menuitem",
          onClick: e[1] || (e[1] = (l) => a("rename"))
        }, [
          o("b", null, d(n(t).isFolder ? "重命名文件夹" : "重命名书签"), 1)
        ]),
        n(t).isFolder ? m("", !0) : (s(), u("button", {
          key: 3,
          id: "bookmark-context-note",
          type: "button",
          role: "menuitem",
          onClick: e[2] || (e[2] = (l) => a("note"))
        }, [...e[16] || (e[16] = [
          o("b", null, "更改备注", -1)
        ])])),
        e[17] || (e[17] = o("i", null, null, -1)),
        o("button", {
          id: "bookmark-context-delete",
          class: "danger",
          type: "button",
          role: "menuitem",
          onClick: e[3] || (e[3] = (l) => a("delete"))
        }, [
          o("b", null, d(n(t).isFolder ? "删除文件夹" : "删除书签"), 1)
        ])
      ], 8, T),
      o("section", {
        id: "bookmark-launcher-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "launcher"
      }, [
        e[18] || (e[18] = o("label", { for: "bookmark-launcher-group-select" }, "选择常用网站分区", -1)),
        S($, {
          id: "bookmark-launcher-group-select",
          modelValue: n(t).selectedLauncherGroup,
          "onUpdate:modelValue": e[4] || (e[4] = (l) => n(t).selectedLauncherGroup = l),
          options: n(t).launcherGroups,
          size: "sm"
        }, null, 8, ["modelValue", "options"]),
        o("div", null, [
          o("button", {
            id: "bookmark-launcher-cancel",
            type: "button",
            onClick: e[5] || (e[5] = (l) => a("actions"))
          }, "返回"),
          o("button", {
            id: "bookmark-launcher-save",
            class: "primary",
            type: "button",
            onClick: x
          }, "确认收藏")
        ])
      ], 8, z),
      o("section", {
        id: "bookmark-rename-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "rename"
      }, [
        o("label", I, d(n(t).isFolder ? "重命名文件夹" : "重命名书签"), 1),
        p(o("input", {
          id: "bookmark-rename-input",
          "onUpdate:modelValue": e[6] || (e[6] = (l) => n(t).renameValue = l),
          type: "text",
          maxlength: "120",
          placeholder: "输入新名称",
          autocomplete: "off",
          onKeydown: e[7] || (e[7] = (l) => n(L)(l, k))
        }, null, 544), [
          [c, n(t).renameValue]
        ]),
        o("div", null, [
          o("button", {
            id: "bookmark-rename-cancel",
            type: "button",
            onClick: e[8] || (e[8] = (l) => a("actions"))
          }, "返回"),
          o("button", {
            id: "bookmark-rename-save",
            class: "primary",
            type: "button",
            onClick: k
          }, "保存")
        ])
      ], 8, G),
      o("section", {
        id: "bookmark-note-editor",
        class: "bookmark-context-editor",
        hidden: n(t).mode !== "note"
      }, [
        e[19] || (e[19] = o("label", { for: "bookmark-note-input" }, "书签备注", -1)),
        p(o("textarea", {
          id: "bookmark-note-input",
          "onUpdate:modelValue": e[9] || (e[9] = (l) => n(t).noteValue = l),
          maxlength: "160",
          rows: "3",
          placeholder: "写一句备注"
        }, null, 512), [
          [c, n(t).noteValue]
        ]),
        o("div", null, [
          o("button", {
            id: "bookmark-note-cancel",
            type: "button",
            onClick: e[10] || (e[10] = (l) => a("actions"))
          }, "返回"),
          o("button", {
            id: "bookmark-note-save",
            class: "primary",
            type: "button",
            onClick: C
          }, "保存备注")
        ])
      ], 8, K),
      o("section", {
        id: "bookmark-delete-confirm",
        class: "bookmark-delete-confirm",
        hidden: n(t).mode !== "delete"
      }, [
        o("b", null, d(n(t).isFolder ? "删除这个文件夹？" : "删除这个书签？"), 1),
        o("p", null, d(n(t).isFolder ? "文件夹及其中全部书签将从浏览器中移除，此操作无法撤销。" : "将同时从 Edge/Chrome 书签中移除，此操作无法撤销。"), 1),
        o("div", null, [
          o("button", {
            id: "bookmark-delete-cancel",
            type: "button",
            onClick: e[11] || (e[11] = (l) => a("actions"))
          }, "取消"),
          o("button", {
            id: "bookmark-delete-apply",
            class: "danger",
            type: "button",
            onClick: h
          }, "确认删除")
        ])
      ], 8, R),
      o("p", {
        id: "bookmark-context-status",
        class: "bookmark-context-status",
        role: "status",
        hidden: !n(t).statusVisible
      }, d(n(t).statusText), 9, j)
    ], 12, N));
  }
});
export {
  W as default
};
