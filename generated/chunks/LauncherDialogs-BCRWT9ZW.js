import { d as G, w as I, o as a, g as s, h as e, k as f, u as o, t as i, p as u, n as p, q as m, i as D, s as v, F as b, j as k, b as L } from "./vendor-vue-dDCd4-uG.js";
import { a as d } from "./store-Bh9CU7U6.js";
import { t as r } from "./_plugin-vue_export-helper-CRVO6deU.js";
const O = { class: "vue-launcher-dialogs-root" }, q = ["open"], P = ["value"], T = { id: "launcher-dialog-title" }, A = ["placeholder"], B = ["placeholder"], R = { class: "dialog-actions" }, $ = {
  class: "dialog-primary",
  type: "submit"
}, j = ["open"], z = {
  id: "group-merge-copy",
  class: "dialog-copy"
}, H = ["value"], J = ["open"], K = {
  id: "folder-move-page-copy",
  class: "dialog-copy"
}, Q = ["value"], W = ["open"], X = {
  id: "link-move-copy",
  class: "dialog-copy"
}, Y = { id: "link-move-page-label" }, Z = ["value"], ee = {
  key: 0,
  id: "link-move-folder-label"
}, le = ["value"], oe = ["open"], te = { class: "folder-delete-dialog-shell" }, ne = { class: "folder-delete-head" }, ie = { id: "folder-delete-title" }, de = { class: "folder-delete-body" }, ae = {
  id: "folder-delete-desc",
  class: "folder-delete-desc"
}, se = ["hidden"], re = { class: "folder-delete-actions" }, fe = /* @__PURE__ */ G({
  __name: "LauncherDialogs",
  setup(ue) {
    const t = d.state;
    function y() {
      d.submitEditDialog();
    }
    function M() {
      d.deleteFromEditDialog();
    }
    function C() {
      d.closeEditDialog();
    }
    function F() {
      d.confirmGroupMerge();
    }
    function _() {
      d.closeGroupMerge();
    }
    function w() {
      d.confirmFolderMove();
    }
    function x() {
      d.closeFolderMove();
    }
    function S() {
      d.confirmLinkMove();
    }
    function V() {
      d.closeLinkMove();
    }
    const h = L(null);
    I(
      () => t.folderDelete.isOpen,
      (c) => {
        const l = h.value;
        if (l) {
          if (c) {
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
    function g() {
      d.closeFolderDeleteDialog();
    }
    function U() {
      d.releaseFolderDelete();
    }
    function E() {
      d.deleteAllFolderDelete();
    }
    function N(c) {
      c.target === h.value && g();
    }
    return (c, l) => (a(), s("div", O, [
      e("dialog", {
        id: "launcher-dialog",
        class: "launcher-dialog",
        open: o(t).editDialog.isOpen
      }, [
        e("form", {
          id: "launcher-form",
          onSubmit: f(y, ["prevent"])
        }, [
          e("input", {
            id: "launcher-id",
            type: "hidden",
            value: o(t).editDialog.id
          }, null, 8, P),
          e("h2", T, i(o(t).editDialog.isNew ? o(r)("sites.addSite") : o(r)("sites.editSite")), 1),
          e("label", null, [
            u(i(o(r)("sites.name")) + " ", 1),
            p(e("input", {
              id: "launcher-title",
              "onUpdate:modelValue": l[0] || (l[0] = (n) => o(t).editDialog.title = n),
              maxlength: "30",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [m, o(t).editDialog.title]
            ])
          ]),
          e("label", null, [
            u(i(o(r)("sites.url")) + " ", 1),
            p(e("input", {
              id: "launcher-url",
              "onUpdate:modelValue": l[1] || (l[1] = (n) => o(t).editDialog.url = n),
              type: "text",
              placeholder: "https://example.com",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [m, o(t).editDialog.url]
            ])
          ]),
          e("label", null, [
            u(i(o(r)("sites.note")) + " ", 1),
            p(e("input", {
              id: "launcher-note",
              "onUpdate:modelValue": l[2] || (l[2] = (n) => o(t).editDialog.note = n),
              type: "text",
              maxlength: "100",
              placeholder: o(r)("sites.notePlaceholder"),
              autocomplete: "off"
            }, null, 8, A), [
              [m, o(t).editDialog.note]
            ])
          ]),
          e("label", null, [
            u(i(o(r)("sites.group")) + " ", 1),
            p(e("input", {
              id: "launcher-group",
              "onUpdate:modelValue": l[3] || (l[3] = (n) => o(t).editDialog.group = n),
              maxlength: "20",
              placeholder: o(r)("sites.groupDefault"),
              autocomplete: "off"
            }, null, 8, B), [
              [m, o(t).editDialog.group]
            ])
          ]),
          e("div", R, [
            o(t).editDialog.isNew ? D("", !0) : (a(), s("button", {
              key: 0,
              id: "launcher-delete",
              class: "dialog-danger",
              type: "button",
              onClick: M
            }, i(o(r)("sites.deleteSite")), 1)),
            l[8] || (l[8] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "launcher-cancel",
              type: "button",
              onClick: C
            }, i(o(r)("common.cancel")), 1),
            e("button", $, i(o(r)("sites.saveSite")), 1)
          ])
        ], 32)
      ], 8, q),
      e("dialog", {
        id: "group-merge-dialog",
        class: "launcher-dialog",
        open: o(t).groupMerge.isOpen
      }, [
        e("form", {
          id: "group-merge-form",
          onSubmit: f(F, ["prevent"])
        }, [
          l[12] || (l[12] = e("h2", null, "合并收藏夹", -1)),
          e("p", z, " 将「" + i(o(t).groupMerge.groupTitle) + "」合并到其他分组： ", 1),
          e("label", null, [
            l[9] || (l[9] = u(" 合并到 ", -1)),
            p(e("select", {
              id: "group-merge-target",
              "onUpdate:modelValue": l[4] || (l[4] = (n) => o(t).groupMerge.targetGroup = n),
              required: ""
            }, [
              (a(!0), s(b, null, k(o(t).groupMerge.groups, (n) => (a(), s("option", {
                key: n,
                value: n
              }, i(n), 9, H))), 128))
            ], 512), [
              [v, o(t).groupMerge.targetGroup]
            ])
          ]),
          e("div", { class: "dialog-actions" }, [
            l[10] || (l[10] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "group-merge-cancel",
              type: "button",
              onClick: _
            }, "取消"),
            l[11] || (l[11] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "合并", -1))
          ])
        ], 32)
      ], 8, j),
      e("dialog", {
        id: "folder-move-page-dialog",
        class: "launcher-dialog",
        open: o(t).folderMove.isOpen
      }, [
        e("form", {
          id: "folder-move-page-form",
          onSubmit: f(w, ["prevent"])
        }, [
          l[16] || (l[16] = e("h2", null, "添加到分区 / 移动分区", -1)),
          e("p", K, " 将「" + i(o(t).folderMove.folderTitle) + "」移动到指定分区： ", 1),
          e("label", null, [
            l[13] || (l[13] = u(" 目标分区 ", -1)),
            p(e("select", {
              id: "folder-move-page-target",
              "onUpdate:modelValue": l[5] || (l[5] = (n) => o(t).folderMove.targetPageId = n),
              required: ""
            }, [
              (a(!0), s(b, null, k(o(t).folderMove.pages, (n) => (a(), s("option", {
                key: n.id,
                value: n.id
              }, i(n.name), 9, Q))), 128))
            ], 512), [
              [v, o(t).folderMove.targetPageId]
            ])
          ]),
          e("div", { class: "dialog-actions" }, [
            l[14] || (l[14] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "folder-move-page-cancel",
              type: "button",
              onClick: x
            }, "取消"),
            l[15] || (l[15] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, J),
      e("dialog", {
        id: "link-move-dialog",
        class: "launcher-dialog",
        open: o(t).linkMove.isOpen
      }, [
        e("form", {
          id: "link-move-form",
          onSubmit: f(S, ["prevent"])
        }, [
          l[22] || (l[22] = e("h2", null, "移动网站", -1)),
          e("p", X, " 移动「" + i(o(t).linkMove.linkTitle) + "」到： ", 1),
          e("label", Y, [
            l[17] || (l[17] = u(" 目标位置 / 分区 ", -1)),
            p(e("select", {
              id: "link-move-page-target",
              "onUpdate:modelValue": l[6] || (l[6] = (n) => o(t).linkMove.targetPageId = n)
            }, [
              (a(!0), s(b, null, k(o(t).linkMove.pages, (n) => (a(), s("option", {
                key: n.id,
                value: n.id
              }, i(n.name), 9, Z))), 128))
            ], 512), [
              [v, o(t).linkMove.targetPageId]
            ])
          ]),
          o(t).linkMove.showFolderSelect ? (a(), s("label", ee, [
            l[19] || (l[19] = u(" 目标文件夹 / 收藏夹 ", -1)),
            p(e("select", {
              id: "link-move-folder-target",
              "onUpdate:modelValue": l[7] || (l[7] = (n) => o(t).linkMove.targetFolderId = n)
            }, [
              l[18] || (l[18] = e("option", { value: "" }, "（不放入文件夹，保留在分区根目录）", -1)),
              (a(!0), s(b, null, k(o(t).linkMove.folders, (n) => (a(), s("option", {
                key: n.id,
                value: n.id
              }, i(n.name), 9, le))), 128))
            ], 512), [
              [v, o(t).linkMove.targetFolderId]
            ])
          ])) : D("", !0),
          e("div", { class: "dialog-actions" }, [
            l[20] || (l[20] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "link-move-cancel",
              type: "button",
              onClick: V
            }, "取消"),
            l[21] || (l[21] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, W),
      e("dialog", {
        ref_key: "folderDeleteDialogRef",
        ref: h,
        id: "folder-delete-dialog",
        class: "launcher-dialog folder-delete-dialog",
        open: o(t).folderDelete.isOpen,
        onClick: N,
        onCancel: g
      }, [
        e("div", te, [
          e("header", ne, [
            e("h3", ie, "📁 删除文件夹" + i(o(t).folderDelete.groupName ? `「${o(t).folderDelete.groupName}」` : ""), 1),
            e("button", {
              id: "folder-delete-close",
              type: "button",
              class: "folder-delete-close-btn",
              title: "关闭",
              onClick: g
            }, "✕")
          ]),
          e("div", de, [
            e("p", ae, i(o(t).folderDelete.count > 0 ? `文件夹内共有 ${o(t).folderDelete.count} 个书签，请选择删除处理方式：` : "请选择当前文件夹的删除处理方式："), 1),
            e("div", {
              id: "folder-delete-hint",
              class: "folder-delete-hint",
              hidden: !o(t).folderDelete.hint
            }, i(o(t).folderDelete.hint), 9, se)
          ]),
          e("div", re, [
            o(t).folderDelete.count > 0 ? (a(), s("button", {
              key: 0,
              id: "folder-delete-release-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-release",
              onClick: U
            }, [...l[23] || (l[23] = [
              e("span", { class: "dialog-btn-icon" }, "📦", -1),
              e("span", { class: "dialog-btn-text" }, [
                e("strong", null, "仅解散文件夹（保留内容）"),
                e("small", null, "直属网站和子文件夹移到上一级；顶层内容移到分区根目录")
              ], -1)
            ])])) : D("", !0),
            e("button", {
              id: "folder-delete-all-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-danger",
              onClick: E
            }, [...l[24] || (l[24] = [
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
              onClick: g
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
