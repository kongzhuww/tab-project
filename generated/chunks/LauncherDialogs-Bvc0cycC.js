import { d as L, w as T, o as p, e as g, i as e, h as c, u as o, t as d, m as r, l as m, n as f, f as k, p as v, s as b, b as z } from "./vendor-vue-9b0eS4bW.js";
import { a } from "./store-DWO5sXp8.js";
import { t as s } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { C as h } from "./view-styles-DAxG1CiI.js";
const A = { class: "vue-launcher-dialogs-root" }, B = ["open"], R = ["value"], q = { id: "launcher-dialog-title" }, $ = ["placeholder"], j = ["placeholder"], H = { class: "dialog-actions" }, J = {
  class: "dialog-primary",
  type: "submit"
}, K = ["open"], Q = {
  id: "group-merge-copy",
  class: "dialog-copy"
}, W = ["open"], X = {
  id: "folder-move-page-copy",
  class: "dialog-copy"
}, Y = ["open"], Z = {
  id: "link-move-copy",
  class: "dialog-copy"
}, ee = { id: "link-move-page-label" }, le = {
  key: 0,
  id: "link-move-folder-label"
}, oe = ["open"], te = { class: "folder-delete-dialog-shell" }, ne = { class: "folder-delete-head" }, ie = { id: "folder-delete-title" }, de = { class: "folder-delete-body" }, ae = {
  id: "folder-delete-desc",
  class: "folder-delete-desc"
}, se = ["hidden"], re = { class: "folder-delete-actions" }, fe = /* @__PURE__ */ L({
  __name: "LauncherDialogs",
  setup(ue) {
    const t = a.state, M = b(() => (t.groupMerge.groups || []).map((n) => ({ value: n, label: n, icon: "📁" }))), y = b(() => (t.folderMove.pages || []).map((n) => ({ value: n.id, label: n.name, icon: "📑" }))), C = b(() => (t.linkMove.pages || []).map((n) => ({ value: n.id, label: n.name, icon: "📑" }))), V = b(() => {
      const n = [
        { value: "", label: "（不放入文件夹，保留在分区根目录）", icon: "🌐" }
      ];
      return (t.linkMove.folders || []).forEach((l) => {
        n.push({ value: l.id, label: l.name, icon: "📁" });
      }), n;
    });
    function F() {
      a.submitEditDialog();
    }
    function w() {
      a.deleteFromEditDialog();
    }
    function x() {
      a.closeEditDialog();
    }
    function S() {
      a.confirmGroupMerge();
    }
    function O() {
      a.closeGroupMerge();
    }
    function _() {
      a.confirmFolderMove();
    }
    function E() {
      a.closeFolderMove();
    }
    function N() {
      a.confirmLinkMove();
    }
    function U() {
      a.closeLinkMove();
    }
    const D = z(null);
    T(
      () => t.folderDelete.isOpen,
      (n) => {
        const l = D.value;
        if (l) {
          if (n) {
            if (!l.open)
              try {
                l.showModal();
              } catch {
                l.setAttribute("open", "");
              }
          } else if (l.open)
            try {
              l.close();
            } catch {
              l.removeAttribute("open");
            }
        }
      }
    );
    function u() {
      a.closeFolderDeleteDialog();
    }
    function P() {
      a.releaseFolderDelete();
    }
    function G() {
      a.deleteAllFolderDelete();
    }
    function I(n) {
      n.target === D.value && u();
    }
    return (n, l) => (p(), g("div", A, [
      e("dialog", {
        id: "launcher-dialog",
        class: "launcher-dialog",
        open: o(t).editDialog.isOpen
      }, [
        e("form", {
          id: "launcher-form",
          onSubmit: c(F, ["prevent"])
        }, [
          e("input", {
            id: "launcher-id",
            type: "hidden",
            value: o(t).editDialog.id
          }, null, 8, R),
          e("h2", q, d(o(t).editDialog.isNew ? o(s)("sites.addSite") : o(s)("sites.editSite")), 1),
          e("label", null, [
            r(d(o(s)("sites.name")) + " ", 1),
            m(e("input", {
              id: "launcher-title",
              "onUpdate:modelValue": l[0] || (l[0] = (i) => o(t).editDialog.title = i),
              maxlength: "30",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [f, o(t).editDialog.title]
            ])
          ]),
          e("label", null, [
            r(d(o(s)("sites.url")) + " ", 1),
            m(e("input", {
              id: "launcher-url",
              "onUpdate:modelValue": l[1] || (l[1] = (i) => o(t).editDialog.url = i),
              type: "text",
              placeholder: "https://example.com",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [f, o(t).editDialog.url]
            ])
          ]),
          e("label", null, [
            r(d(o(s)("sites.note")) + " ", 1),
            m(e("input", {
              id: "launcher-note",
              "onUpdate:modelValue": l[2] || (l[2] = (i) => o(t).editDialog.note = i),
              type: "text",
              maxlength: "100",
              placeholder: o(s)("sites.notePlaceholder"),
              autocomplete: "off"
            }, null, 8, $), [
              [f, o(t).editDialog.note]
            ])
          ]),
          e("label", null, [
            r(d(o(s)("sites.group")) + " ", 1),
            m(e("input", {
              id: "launcher-group",
              "onUpdate:modelValue": l[3] || (l[3] = (i) => o(t).editDialog.group = i),
              maxlength: "20",
              placeholder: o(s)("sites.groupDefault"),
              autocomplete: "off"
            }, null, 8, j), [
              [f, o(t).editDialog.group]
            ])
          ]),
          e("div", H, [
            o(t).editDialog.isNew ? k("", !0) : (p(), g("button", {
              key: 0,
              id: "launcher-delete",
              class: "dialog-danger",
              type: "button",
              onClick: w
            }, d(o(s)("sites.deleteSite")), 1)),
            l[8] || (l[8] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "launcher-cancel",
              type: "button",
              onClick: x
            }, d(o(s)("common.cancel")), 1),
            e("button", J, d(o(s)("sites.saveSite")), 1)
          ])
        ], 32)
      ], 8, B),
      e("dialog", {
        id: "group-merge-dialog",
        class: "launcher-dialog",
        open: o(t).groupMerge.isOpen
      }, [
        e("form", {
          id: "group-merge-form",
          onSubmit: c(S, ["prevent"])
        }, [
          l[12] || (l[12] = e("h2", null, "合并收藏夹", -1)),
          e("p", Q, " 将「" + d(o(t).groupMerge.groupTitle) + "」合并到其他分组： ", 1),
          e("label", null, [
            l[9] || (l[9] = r(" 合并到 ", -1)),
            v(h, {
              id: "group-merge-target",
              modelValue: o(t).groupMerge.targetGroup,
              "onUpdate:modelValue": l[4] || (l[4] = (i) => o(t).groupMerge.targetGroup = i),
              options: M.value,
              size: "sm"
            }, null, 8, ["modelValue", "options"])
          ]),
          e("div", { class: "dialog-actions" }, [
            l[10] || (l[10] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "group-merge-cancel",
              type: "button",
              onClick: O
            }, "取消"),
            l[11] || (l[11] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "合并", -1))
          ])
        ], 32)
      ], 8, K),
      e("dialog", {
        id: "folder-move-page-dialog",
        class: "launcher-dialog",
        open: o(t).folderMove.isOpen
      }, [
        e("form", {
          id: "folder-move-page-form",
          onSubmit: c(_, ["prevent"])
        }, [
          l[16] || (l[16] = e("h2", null, "添加到分区 / 移动分区", -1)),
          e("p", X, " 将「" + d(o(t).folderMove.folderTitle) + "」移动到指定分区： ", 1),
          e("label", null, [
            l[13] || (l[13] = r(" 目标分区 ", -1)),
            v(h, {
              id: "folder-move-page-target",
              modelValue: o(t).folderMove.targetPageId,
              "onUpdate:modelValue": l[5] || (l[5] = (i) => o(t).folderMove.targetPageId = i),
              options: y.value,
              size: "sm"
            }, null, 8, ["modelValue", "options"])
          ]),
          e("div", { class: "dialog-actions" }, [
            l[14] || (l[14] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "folder-move-page-cancel",
              type: "button",
              onClick: E
            }, "取消"),
            l[15] || (l[15] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, W),
      e("dialog", {
        id: "link-move-dialog",
        class: "launcher-dialog",
        open: o(t).linkMove.isOpen
      }, [
        e("form", {
          id: "link-move-form",
          onSubmit: c(N, ["prevent"])
        }, [
          l[21] || (l[21] = e("h2", null, "移动网站", -1)),
          e("p", Z, " 移动「" + d(o(t).linkMove.linkTitle) + "」到： ", 1),
          e("label", ee, [
            l[17] || (l[17] = r(" 目标位置 / 分区 ", -1)),
            v(h, {
              id: "link-move-page-target",
              modelValue: o(t).linkMove.targetPageId,
              "onUpdate:modelValue": l[6] || (l[6] = (i) => o(t).linkMove.targetPageId = i),
              options: C.value,
              size: "sm"
            }, null, 8, ["modelValue", "options"])
          ]),
          o(t).linkMove.showFolderSelect ? (p(), g("label", le, [
            l[18] || (l[18] = r(" 目标文件夹 / 收藏夹 ", -1)),
            v(h, {
              id: "link-move-folder-target",
              modelValue: o(t).linkMove.targetFolderId,
              "onUpdate:modelValue": l[7] || (l[7] = (i) => o(t).linkMove.targetFolderId = i),
              options: V.value,
              size: "sm"
            }, null, 8, ["modelValue", "options"])
          ])) : k("", !0),
          e("div", { class: "dialog-actions" }, [
            l[19] || (l[19] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "link-move-cancel",
              type: "button",
              onClick: U
            }, "取消"),
            l[20] || (l[20] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, Y),
      e("dialog", {
        ref_key: "folderDeleteDialogRef",
        ref: D,
        id: "folder-delete-dialog",
        class: "launcher-dialog folder-delete-dialog",
        open: o(t).folderDelete.isOpen,
        onClick: I,
        onCancel: u
      }, [
        e("div", te, [
          e("header", ne, [
            e("h3", ie, "📁 删除文件夹" + d(o(t).folderDelete.groupName ? `「${o(t).folderDelete.groupName}」` : ""), 1),
            e("button", {
              id: "folder-delete-close",
              type: "button",
              class: "folder-delete-close-btn",
              title: "关闭",
              onClick: u
            }, "✕")
          ]),
          e("div", de, [
            e("p", ae, d(o(t).folderDelete.count > 0 ? `文件夹内共有 ${o(t).folderDelete.count} 个书签，请选择删除处理方式：` : "请选择当前文件夹的删除处理方式："), 1),
            e("div", {
              id: "folder-delete-hint",
              class: "folder-delete-hint",
              hidden: !o(t).folderDelete.hint
            }, d(o(t).folderDelete.hint), 9, se)
          ]),
          e("div", re, [
            o(t).folderDelete.count > 0 ? (p(), g("button", {
              key: 0,
              id: "folder-delete-release-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-release",
              onClick: P
            }, [...l[22] || (l[22] = [
              e("span", { class: "dialog-btn-icon" }, "📦", -1),
              e("span", { class: "dialog-btn-text" }, [
                e("strong", null, "仅解散文件夹（保留内容）"),
                e("small", null, "直属网站和子文件夹移到上一级；顶层内容移到分区根目录")
              ], -1)
            ])])) : k("", !0),
            e("button", {
              id: "folder-delete-all-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-danger",
              onClick: G
            }, [...l[23] || (l[23] = [
              e("span", { class: "dialog-btn-icon" }, "🗑️", -1),
              e("span", { class: "dialog-btn-text" }, [
                e("strong", null, "删除文件夹及直属网站"),
                e("small", null, "只删除当前文件夹及直属网站；子文件夹保留并移到上一级")
              ], -1)
            ])]),
            e("button", {
              id: "folder-delete-cancel-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-cancel",
              onClick: u
            }, "取消")
          ])
        ])
      ], 40, oe)
    ]));
  }
});
export {
  fe as default
};
