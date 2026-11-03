import { d as j, w as H, o as r, g as d, h as e, k, u as t, t as n, p as u, n as p, q as g, i as P, s as h, F as m, j as f, m as J, C as Q, y as W, b as X } from "./vendor-vue-dDCd4-uG.js";
import { b as s } from "./youtube-store-DwsgR9tl.js";
import { t as a } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
const Y = { class: "vue-launcher-dialogs-root" }, Z = ["open"], ee = ["value"], oe = { id: "launcher-dialog-title" }, ie = ["placeholder"], te = ["placeholder"], le = { class: "dialog-actions" }, ne = {
  class: "dialog-primary",
  type: "submit"
}, se = ["open"], re = {
  id: "group-merge-copy",
  class: "dialog-copy"
}, de = ["value"], ce = ["open"], ae = {
  id: "folder-move-page-copy",
  class: "dialog-copy"
}, ue = ["value"], pe = ["open"], ge = {
  id: "link-move-copy",
  class: "dialog-copy"
}, ke = { id: "link-move-page-label" }, me = ["value"], fe = {
  key: 0,
  id: "link-move-folder-label"
}, be = ["value"], ve = ["open"], he = ["inert", "aria-busy"], ye = { class: "icon-picker-search-bar" }, Pe = ["onKeydown"], _e = ["hidden"], De = { class: "icon-picker-custom-row" }, Ce = { class: "icon-picker-upload-row" }, Me = { class: "icon-picker-upload-btn" }, Ue = { class: "icon-picker-results-wrap" }, we = ["hidden"], Ie = ["hidden"], Fe = {
  id: "icon-picker-grid",
  class: "icon-picker-grid"
}, xe = ["onClick"], Se = ["src"], Ve = ["hidden"], Oe = ["disabled"], Le = {
  id: "icon-picker-page-info",
  class: "icon-picker-page-info"
}, qe = ["disabled"], Ee = { class: "icon-picker-footer" }, Ne = { class: "icon-picker-current-selection" }, Ge = {
  id: "icon-picker-preview-box",
  class: "icon-picker-preview-box"
}, Re = ["src"], Ae = {
  key: 1,
  class: "icon-picker-preview-empty"
}, Te = { class: "dialog-actions" }, Be = ["disabled"], ze = ["open"], Ke = { class: "folder-delete-dialog-shell" }, $e = { class: "folder-delete-head" }, je = { id: "folder-delete-title" }, He = { class: "folder-delete-body" }, Je = {
  id: "folder-delete-desc",
  class: "folder-delete-desc"
}, Qe = ["hidden"], We = { class: "folder-delete-actions" }, oo = /* @__PURE__ */ j({
  __name: "LauncherDialogs",
  setup(Xe) {
    const o = s.state;
    function U() {
      s.submitEditDialog();
    }
    function w() {
      s.deleteFromEditDialog();
    }
    function I() {
      s.closeEditDialog();
    }
    function F() {
      s.confirmGroupMerge();
    }
    function x() {
      s.closeGroupMerge();
    }
    function S() {
      s.confirmFolderMove();
    }
    function V() {
      s.closeFolderMove();
    }
    function O() {
      s.confirmLinkMove();
    }
    function L() {
      s.closeLinkMove();
    }
    const q = W(() => {
      const c = (o.iconPicker.currentPage - 1) * o.iconPicker.pageSize;
      return o.iconPicker.results.slice(c, c + o.iconPicker.pageSize);
    });
    function _() {
      s.searchIcons(o.iconPicker.query);
    }
    function E() {
      o.iconPicker.isCustomPanelOpen = !o.iconPicker.isCustomPanelOpen;
    }
    function N() {
      o.iconPicker.customUrl.trim() && (o.iconPicker.selectedIconUrl = o.iconPicker.customUrl.trim());
    }
    function G(c) {
      const i = c.target.files?.[0];
      if (!i) return;
      const l = o.iconPicker.session, v = new FileReader();
      v.onload = (C) => {
        if (!o.iconPicker.isOpen || o.iconPicker.isSaving || o.iconPicker.session !== l) return;
        const M = C.target?.result;
        M && (o.iconPicker.selectedIconUrl = M);
      }, v.readAsDataURL(i);
    }
    function R(c) {
      s.selectIcon(c);
    }
    function A() {
      o.iconPicker.currentPage > 1 && o.iconPicker.currentPage--;
    }
    function T() {
      o.iconPicker.currentPage < o.iconPicker.totalPages && o.iconPicker.currentPage++;
    }
    function D() {
      s.closeIconPicker();
    }
    function B() {
      s.confirmIcon();
    }
    const y = X(null);
    H(
      () => o.folderDelete.isOpen,
      (c) => {
        const i = y.value;
        if (i) {
          if (c) {
            if (!i.open)
              try {
                i.showModal();
              } catch {
                i.setAttribute("open", "");
              }
          } else if (i.open)
            try {
              i.close();
            } catch {
              i.removeAttribute("open");
            }
        }
      }
    );
    function b() {
      s.closeFolderDeleteDialog();
    }
    function z() {
      s.releaseFolderDelete();
    }
    function K() {
      s.deleteAllFolderDelete();
    }
    function $(c) {
      c.target === y.value && b();
    }
    return (c, i) => (r(), d("div", Y, [
      e("dialog", {
        id: "launcher-dialog",
        class: "launcher-dialog",
        open: t(o).editDialog.isOpen
      }, [
        e("form", {
          id: "launcher-form",
          onSubmit: k(U, ["prevent"])
        }, [
          e("input", {
            id: "launcher-id",
            type: "hidden",
            value: t(o).editDialog.id
          }, null, 8, ee),
          e("h2", oe, n(t(o).editDialog.isNew ? t(a)("sites.addSite") : t(a)("sites.editSite")), 1),
          e("label", null, [
            u(n(t(a)("sites.name")) + " ", 1),
            p(e("input", {
              id: "launcher-title",
              "onUpdate:modelValue": i[0] || (i[0] = (l) => t(o).editDialog.title = l),
              maxlength: "30",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [g, t(o).editDialog.title]
            ])
          ]),
          e("label", null, [
            u(n(t(a)("sites.url")) + " ", 1),
            p(e("input", {
              id: "launcher-url",
              "onUpdate:modelValue": i[1] || (i[1] = (l) => t(o).editDialog.url = l),
              type: "text",
              placeholder: "https://example.com",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [g, t(o).editDialog.url]
            ])
          ]),
          e("label", null, [
            u(n(t(a)("sites.note")) + " ", 1),
            p(e("input", {
              id: "launcher-note",
              "onUpdate:modelValue": i[2] || (i[2] = (l) => t(o).editDialog.note = l),
              type: "text",
              maxlength: "100",
              placeholder: t(a)("sites.notePlaceholder"),
              autocomplete: "off"
            }, null, 8, ie), [
              [g, t(o).editDialog.note]
            ])
          ]),
          e("label", null, [
            u(n(t(a)("sites.group")) + " ", 1),
            p(e("input", {
              id: "launcher-group",
              "onUpdate:modelValue": i[3] || (i[3] = (l) => t(o).editDialog.group = l),
              maxlength: "20",
              placeholder: t(a)("sites.groupDefault"),
              autocomplete: "off"
            }, null, 8, te), [
              [g, t(o).editDialog.group]
            ])
          ]),
          e("div", le, [
            t(o).editDialog.isNew ? P("", !0) : (r(), d("button", {
              key: 0,
              id: "launcher-delete",
              class: "dialog-danger",
              type: "button",
              onClick: w
            }, n(t(a)("sites.deleteSite")), 1)),
            i[10] || (i[10] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "launcher-cancel",
              type: "button",
              onClick: I
            }, n(t(a)("common.cancel")), 1),
            e("button", ne, n(t(a)("sites.saveSite")), 1)
          ])
        ], 32)
      ], 8, Z),
      e("dialog", {
        id: "group-merge-dialog",
        class: "launcher-dialog",
        open: t(o).groupMerge.isOpen
      }, [
        e("form", {
          id: "group-merge-form",
          onSubmit: k(F, ["prevent"])
        }, [
          i[14] || (i[14] = e("h2", null, "合并收藏夹", -1)),
          e("p", re, " 将「" + n(t(o).groupMerge.groupTitle) + "」合并到其他分组： ", 1),
          e("label", null, [
            i[11] || (i[11] = u(" 合并到 ", -1)),
            p(e("select", {
              id: "group-merge-target",
              "onUpdate:modelValue": i[4] || (i[4] = (l) => t(o).groupMerge.targetGroup = l),
              required: ""
            }, [
              (r(!0), d(m, null, f(t(o).groupMerge.groups, (l) => (r(), d("option", {
                key: l,
                value: l
              }, n(l), 9, de))), 128))
            ], 512), [
              [h, t(o).groupMerge.targetGroup]
            ])
          ]),
          e("div", { class: "dialog-actions" }, [
            i[12] || (i[12] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "group-merge-cancel",
              type: "button",
              onClick: x
            }, "取消"),
            i[13] || (i[13] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "合并", -1))
          ])
        ], 32)
      ], 8, se),
      e("dialog", {
        id: "folder-move-page-dialog",
        class: "launcher-dialog",
        open: t(o).folderMove.isOpen
      }, [
        e("form", {
          id: "folder-move-page-form",
          onSubmit: k(S, ["prevent"])
        }, [
          i[18] || (i[18] = e("h2", null, "添加到分区 / 移动分区", -1)),
          e("p", ae, " 将「" + n(t(o).folderMove.folderTitle) + "」移动到指定分区： ", 1),
          e("label", null, [
            i[15] || (i[15] = u(" 目标分区 ", -1)),
            p(e("select", {
              id: "folder-move-page-target",
              "onUpdate:modelValue": i[5] || (i[5] = (l) => t(o).folderMove.targetPageId = l),
              required: ""
            }, [
              (r(!0), d(m, null, f(t(o).folderMove.pages, (l) => (r(), d("option", {
                key: l.id,
                value: l.id
              }, n(l.name), 9, ue))), 128))
            ], 512), [
              [h, t(o).folderMove.targetPageId]
            ])
          ]),
          e("div", { class: "dialog-actions" }, [
            i[16] || (i[16] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "folder-move-page-cancel",
              type: "button",
              onClick: V
            }, "取消"),
            i[17] || (i[17] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, ce),
      e("dialog", {
        id: "link-move-dialog",
        class: "launcher-dialog",
        open: t(o).linkMove.isOpen
      }, [
        e("form", {
          id: "link-move-form",
          onSubmit: k(O, ["prevent"])
        }, [
          i[24] || (i[24] = e("h2", null, "移动网站", -1)),
          e("p", ge, " 移动「" + n(t(o).linkMove.linkTitle) + "」到： ", 1),
          e("label", ke, [
            i[19] || (i[19] = u(" 目标位置 / 分区 ", -1)),
            p(e("select", {
              id: "link-move-page-target",
              "onUpdate:modelValue": i[6] || (i[6] = (l) => t(o).linkMove.targetPageId = l)
            }, [
              (r(!0), d(m, null, f(t(o).linkMove.pages, (l) => (r(), d("option", {
                key: l.id,
                value: l.id
              }, n(l.name), 9, me))), 128))
            ], 512), [
              [h, t(o).linkMove.targetPageId]
            ])
          ]),
          t(o).linkMove.showFolderSelect ? (r(), d("label", fe, [
            i[21] || (i[21] = u(" 目标文件夹 / 收藏夹 ", -1)),
            p(e("select", {
              id: "link-move-folder-target",
              "onUpdate:modelValue": i[7] || (i[7] = (l) => t(o).linkMove.targetFolderId = l)
            }, [
              i[20] || (i[20] = e("option", { value: "" }, "（不放入文件夹，保留在分区根目录）", -1)),
              (r(!0), d(m, null, f(t(o).linkMove.folders, (l) => (r(), d("option", {
                key: l.id,
                value: l.id
              }, n(l.name), 9, be))), 128))
            ], 512), [
              [h, t(o).linkMove.targetFolderId]
            ])
          ])) : P("", !0),
          e("div", { class: "dialog-actions" }, [
            i[22] || (i[22] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "link-move-cancel",
              type: "button",
              onClick: L
            }, "取消"),
            i[23] || (i[23] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, pe),
      e("dialog", {
        id: "launcher-icon-picker-dialog",
        class: "launcher-dialog launcher-icon-picker-dialog",
        open: t(o).iconPicker.isOpen
      }, [
        e("div", {
          class: "icon-picker-shell",
          inert: t(o).iconPicker.isSaving,
          "aria-busy": t(o).iconPicker.isSaving
        }, [
          e("header", { class: "icon-picker-header" }, [
            i[25] || (i[25] = e("div", { class: "icon-picker-title-group" }, [
              e("span", { class: "icon-picker-icon" }, "🎨"),
              e("div", null, [
                e("h2", { id: "icon-picker-title" }, "获取网站头像"),
                e("p", {
                  id: "icon-picker-subtitle",
                  class: "dialog-copy"
                }, "根据网站名称智能搜索并挑选图标")
              ])
            ], -1)),
            e("button", {
              id: "icon-picker-close",
              type: "button",
              class: "icon-picker-close-btn",
              title: "关闭",
              onClick: D
            }, " ✕ ")
          ]),
          e("div", ye, [
            p(e("input", {
              id: "icon-picker-search-input",
              "onUpdate:modelValue": i[8] || (i[8] = (l) => t(o).iconPicker.query = l),
              type: "text",
              placeholder: "输入名称搜索图标，例如：学习通、B站、知乎…",
              autocomplete: "off",
              onKeydown: J(k(_, ["prevent"]), ["enter"])
            }, null, 40, Pe), [
              [g, t(o).iconPicker.query]
            ]),
            e("button", {
              id: "icon-picker-search-btn",
              type: "button",
              onClick: _
            }, "🔍 搜索"),
            e("button", {
              id: "icon-picker-custom-toggle-btn",
              type: "button",
              class: "icon-picker-ext-btn",
              title: "输入图片网址或选择本地图片",
              onClick: E
            }, " 📁 上传/贴链接 ")
          ]),
          e("div", {
            id: "icon-picker-custom-panel",
            class: "icon-picker-custom-panel",
            hidden: !t(o).iconPicker.isCustomPanelOpen
          }, [
            e("div", De, [
              p(e("input", {
                id: "icon-picker-url-input",
                "onUpdate:modelValue": i[9] || (i[9] = (l) => t(o).iconPicker.customUrl = l),
                type: "url",
                placeholder: "粘贴任意在线图片网址 (https://...)"
              }, null, 512), [
                [g, t(o).iconPicker.customUrl]
              ]),
              e("button", {
                id: "icon-picker-url-apply",
                type: "button",
                onClick: N
              }, "使用网址")
            ]),
            e("div", Ce, [
              e("label", Me, [
                i[26] || (i[26] = u(" 📁 选择本地图片文件 ", -1)),
                e("input", {
                  id: "icon-picker-file-input",
                  type: "file",
                  accept: "image/*",
                  style: { display: "none" },
                  onChange: G
                }, null, 32)
              ]),
              i[27] || (i[27] = e("span", {
                id: "icon-picker-upload-tip",
                class: "small muted"
              }, "支持 png, jpg, webp, svg 等格式", -1))
            ])
          ], 8, _e),
          e("div", Ue, [
            e("div", {
              id: "icon-picker-loading",
              class: "icon-picker-loading",
              hidden: !t(o).iconPicker.isLoading
            }, [...i[28] || (i[28] = [
              e("span", { class: "icon-picker-spinner" }, null, -1),
              u(" 正在搜索高质量头像图标… ", -1)
            ])], 8, we),
            e("div", {
              id: "icon-picker-empty",
              class: "icon-picker-empty",
              hidden: t(o).iconPicker.isLoading || t(o).iconPicker.results.length > 0
            }, " 没有找到相关图标，您可以更换搜索词或点击右上角「上传/贴链接」。 ", 8, Ie),
            e("div", Fe, [
              (r(!0), d(m, null, f(q.value, (l, v) => (r(), d("button", {
                key: v,
                class: Q(["icon-picker-item", { selected: t(o).iconPicker.selectedIconUrl === l.url }]),
                type: "button",
                onClick: (C) => R(l.url)
              }, [
                e("img", {
                  src: l.url,
                  alt: ""
                }, null, 8, Se)
              ], 10, xe))), 128))
            ])
          ]),
          e("div", {
            id: "icon-picker-pagination",
            class: "icon-picker-pagination",
            hidden: t(o).iconPicker.totalPages <= 1
          }, [
            e("button", {
              id: "icon-picker-prev-page",
              type: "button",
              class: "icon-picker-page-btn",
              title: "上一页",
              disabled: t(o).iconPicker.currentPage <= 1,
              onClick: A
            }, " ‹ 上一页 ", 8, Oe),
            e("span", Le, " 第 " + n(t(o).iconPicker.currentPage) + " / " + n(t(o).iconPicker.totalPages) + " 页 ", 1),
            e("button", {
              id: "icon-picker-next-page",
              type: "button",
              class: "icon-picker-page-btn",
              title: "下一页",
              disabled: t(o).iconPicker.currentPage >= t(o).iconPicker.totalPages,
              onClick: T
            }, " 下一页 › ", 8, qe)
          ], 8, Ve),
          e("footer", Ee, [
            e("div", Ne, [
              i[29] || (i[29] = e("span", { class: "muted small" }, "当前选用：", -1)),
              e("div", Ge, [
                t(o).iconPicker.selectedIconUrl ? (r(), d("img", {
                  key: 0,
                  src: t(o).iconPicker.selectedIconUrl,
                  alt: ""
                }, null, 8, Re)) : (r(), d("span", Ae, "未选择"))
              ])
            ]),
            e("div", Te, [
              e("button", {
                id: "icon-picker-cancel",
                type: "button",
                onClick: D
              }, "取消"),
              e("button", {
                id: "icon-picker-confirm",
                class: "dialog-primary",
                type: "button",
                disabled: !t(o).iconPicker.selectedIconUrl,
                onClick: B
              }, " 确定设为头像 ", 8, Be)
            ])
          ])
        ], 8, he)
      ], 8, ve),
      e("dialog", {
        ref_key: "folderDeleteDialogRef",
        ref: y,
        id: "folder-delete-dialog",
        class: "launcher-dialog folder-delete-dialog",
        open: t(o).folderDelete.isOpen,
        onClick: $,
        onCancel: b
      }, [
        e("div", Ke, [
          e("header", $e, [
            e("h3", je, "📁 删除文件夹" + n(t(o).folderDelete.groupName ? `「${t(o).folderDelete.groupName}」` : ""), 1),
            e("button", {
              id: "folder-delete-close",
              type: "button",
              class: "folder-delete-close-btn",
              title: "关闭",
              onClick: b
            }, "✕")
          ]),
          e("div", He, [
            e("p", Je, n(t(o).folderDelete.count > 0 ? `文件夹内共有 ${t(o).folderDelete.count} 个书签，请选择删除处理方式：` : "请选择当前文件夹的删除处理方式："), 1),
            e("div", {
              id: "folder-delete-hint",
              class: "folder-delete-hint",
              hidden: !t(o).folderDelete.hint
            }, n(t(o).folderDelete.hint), 9, Qe)
          ]),
          e("div", We, [
            t(o).folderDelete.count > 0 ? (r(), d("button", {
              key: 0,
              id: "folder-delete-release-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-release",
              onClick: z
            }, [...i[30] || (i[30] = [
              e("span", { class: "dialog-btn-icon" }, "📦", -1),
              e("span", { class: "dialog-btn-text" }, [
                e("strong", null, "仅解散文件夹（保留内容）"),
                e("small", null, "直属网站和子文件夹移到上一级；顶层内容移到分区根目录")
              ], -1)
            ])])) : P("", !0),
            e("button", {
              id: "folder-delete-all-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-danger",
              onClick: K
            }, [...i[31] || (i[31] = [
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
              onClick: b
            }, "取消")
          ])
        ])
      ], 40, ze)
    ]));
  }
});
export {
  oo as default
};
