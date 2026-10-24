import { f as $, w as j, g as s, h as r, i as e, k as g, x as t, t as d, j as a, q as u, v as p, u as h, y as v, F as k, z as f, A as H, s as J, c as Q, b as W } from "./vendor-vue-BUkfvXUI.js";
import { l as n } from "./store-BDmF35tO.js";
const X = { class: "vue-launcher-dialogs-root" }, Y = ["open"], Z = ["value"], ee = { id: "launcher-dialog-title" }, oe = { class: "dialog-actions" }, ie = ["open"], te = {
  id: "group-merge-copy",
  class: "dialog-copy"
}, le = ["value"], ne = ["open"], se = {
  id: "folder-move-page-copy",
  class: "dialog-copy"
}, re = ["value"], de = ["open"], ce = {
  id: "link-move-copy",
  class: "dialog-copy"
}, ae = { id: "link-move-page-label" }, ue = ["value"], pe = {
  key: 0,
  id: "link-move-folder-label"
}, ge = ["value"], ke = ["open"], fe = ["inert", "aria-busy"], me = { class: "icon-picker-search-bar" }, be = ["onKeydown"], ve = ["hidden"], ye = { class: "icon-picker-custom-row" }, he = { class: "icon-picker-upload-row" }, Pe = { class: "icon-picker-upload-btn" }, De = { class: "icon-picker-results-wrap" }, Ce = ["hidden"], Me = ["hidden"], _e = {
  id: "icon-picker-grid",
  class: "icon-picker-grid"
}, Ue = ["onClick"], we = ["src"], Ie = ["hidden"], xe = ["disabled"], Fe = {
  id: "icon-picker-page-info",
  class: "icon-picker-page-info"
}, Se = ["disabled"], Ve = { class: "icon-picker-footer" }, Oe = { class: "icon-picker-current-selection" }, Le = {
  id: "icon-picker-preview-box",
  class: "icon-picker-preview-box"
}, qe = ["src"], Ee = {
  key: 1,
  class: "icon-picker-preview-empty"
}, Ne = { class: "dialog-actions" }, Ae = ["disabled"], Ge = ["open"], Re = { class: "folder-delete-dialog-shell" }, Te = { class: "folder-delete-head" }, ze = { id: "folder-delete-title" }, Be = { class: "folder-delete-body" }, Ke = {
  id: "folder-delete-desc",
  class: "folder-delete-desc"
}, $e = ["hidden"], je = { class: "folder-delete-actions" }, We = /* @__PURE__ */ $({
  __name: "LauncherDialogs",
  setup(He) {
    const i = n.state;
    function _() {
      n.submitEditDialog();
    }
    function U() {
      n.deleteFromEditDialog();
    }
    function w() {
      n.closeEditDialog();
    }
    function I() {
      n.confirmGroupMerge();
    }
    function x() {
      n.closeGroupMerge();
    }
    function F() {
      n.confirmFolderMove();
    }
    function S() {
      n.closeFolderMove();
    }
    function V() {
      n.confirmLinkMove();
    }
    function O() {
      n.closeLinkMove();
    }
    const L = Q(() => {
      const c = (i.iconPicker.currentPage - 1) * i.iconPicker.pageSize;
      return i.iconPicker.results.slice(c, c + i.iconPicker.pageSize);
    });
    function P() {
      n.searchIcons(i.iconPicker.query);
    }
    function q() {
      i.iconPicker.isCustomPanelOpen = !i.iconPicker.isCustomPanelOpen;
    }
    function E() {
      i.iconPicker.customUrl.trim() && (i.iconPicker.selectedIconUrl = i.iconPicker.customUrl.trim());
    }
    function N(c) {
      const o = c.target.files?.[0];
      if (!o) return;
      const l = i.iconPicker.session, b = new FileReader();
      b.onload = (C) => {
        if (!i.iconPicker.isOpen || i.iconPicker.isSaving || i.iconPicker.session !== l) return;
        const M = C.target?.result;
        M && (i.iconPicker.selectedIconUrl = M);
      }, b.readAsDataURL(o);
    }
    function A(c) {
      n.selectIcon(c);
    }
    function G() {
      i.iconPicker.currentPage > 1 && i.iconPicker.currentPage--;
    }
    function R() {
      i.iconPicker.currentPage < i.iconPicker.totalPages && i.iconPicker.currentPage++;
    }
    function D() {
      n.closeIconPicker();
    }
    function T() {
      n.confirmIcon();
    }
    const y = W(null);
    j(
      () => i.folderDelete.isOpen,
      (c) => {
        const o = y.value;
        if (o) {
          if (c) {
            if (!o.open)
              try {
                o.showModal();
              } catch {
                o.setAttribute("open", "");
              }
          } else if (o.open)
            try {
              o.close();
            } catch {
              o.removeAttribute("open");
            }
        }
      }
    );
    function m() {
      n.closeFolderDeleteDialog();
    }
    function z() {
      n.releaseFolderDelete();
    }
    function B() {
      n.deleteAllFolderDelete();
    }
    function K(c) {
      c.target === y.value && m();
    }
    return (c, o) => (s(), r("div", X, [
      e("dialog", {
        id: "launcher-dialog",
        class: "launcher-dialog",
        open: t(i).editDialog.isOpen
      }, [
        e("form", {
          id: "launcher-form",
          onSubmit: g(_, ["prevent"])
        }, [
          e("input", {
            id: "launcher-id",
            type: "hidden",
            value: t(i).editDialog.id
          }, null, 8, Z),
          e("h2", ee, d(t(i).editDialog.isNew ? "添加网站" : "编辑网站"), 1),
          e("label", null, [
            o[10] || (o[10] = a(" 名称 ", -1)),
            u(e("input", {
              id: "launcher-title",
              "onUpdate:modelValue": o[0] || (o[0] = (l) => t(i).editDialog.title = l),
              maxlength: "30",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [p, t(i).editDialog.title]
            ])
          ]),
          e("label", null, [
            o[11] || (o[11] = a(" 网址 ", -1)),
            u(e("input", {
              id: "launcher-url",
              "onUpdate:modelValue": o[1] || (o[1] = (l) => t(i).editDialog.url = l),
              type: "text",
              placeholder: "https://example.com",
              required: "",
              autocomplete: "off"
            }, null, 512), [
              [p, t(i).editDialog.url]
            ])
          ]),
          e("label", null, [
            o[12] || (o[12] = a(" 备注 ", -1)),
            u(e("input", {
              id: "launcher-note",
              "onUpdate:modelValue": o[2] || (o[2] = (l) => t(i).editDialog.note = l),
              type: "text",
              maxlength: "100",
              placeholder: "鼠标悬停提示备注（可替代网址展示）",
              autocomplete: "off"
            }, null, 512), [
              [p, t(i).editDialog.note]
            ])
          ]),
          e("label", null, [
            o[13] || (o[13] = a(" 分组 ", -1)),
            u(e("input", {
              id: "launcher-group",
              "onUpdate:modelValue": o[3] || (o[3] = (l) => t(i).editDialog.group = l),
              maxlength: "20",
              placeholder: "常用网站",
              autocomplete: "off"
            }, null, 512), [
              [p, t(i).editDialog.group]
            ])
          ]),
          e("div", oe, [
            t(i).editDialog.isNew ? h("", !0) : (s(), r("button", {
              key: 0,
              id: "launcher-delete",
              class: "dialog-danger",
              type: "button",
              onClick: U
            }, " 删除 ")),
            o[14] || (o[14] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "launcher-cancel",
              type: "button",
              onClick: w
            }, "取消"),
            o[15] || (o[15] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "保存", -1))
          ])
        ], 32)
      ], 8, Y),
      e("dialog", {
        id: "group-merge-dialog",
        class: "launcher-dialog",
        open: t(i).groupMerge.isOpen
      }, [
        e("form", {
          id: "group-merge-form",
          onSubmit: g(I, ["prevent"])
        }, [
          o[19] || (o[19] = e("h2", null, "合并收藏夹", -1)),
          e("p", te, " 将「" + d(t(i).groupMerge.groupTitle) + "」合并到其他分组： ", 1),
          e("label", null, [
            o[16] || (o[16] = a(" 合并到 ", -1)),
            u(e("select", {
              id: "group-merge-target",
              "onUpdate:modelValue": o[4] || (o[4] = (l) => t(i).groupMerge.targetGroup = l),
              required: ""
            }, [
              (s(!0), r(k, null, f(t(i).groupMerge.groups, (l) => (s(), r("option", {
                key: l,
                value: l
              }, d(l), 9, le))), 128))
            ], 512), [
              [v, t(i).groupMerge.targetGroup]
            ])
          ]),
          e("div", { class: "dialog-actions" }, [
            o[17] || (o[17] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "group-merge-cancel",
              type: "button",
              onClick: x
            }, "取消"),
            o[18] || (o[18] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "合并", -1))
          ])
        ], 32)
      ], 8, ie),
      e("dialog", {
        id: "folder-move-page-dialog",
        class: "launcher-dialog",
        open: t(i).folderMove.isOpen
      }, [
        e("form", {
          id: "folder-move-page-form",
          onSubmit: g(F, ["prevent"])
        }, [
          o[23] || (o[23] = e("h2", null, "添加到分区 / 移动分区", -1)),
          e("p", se, " 将「" + d(t(i).folderMove.folderTitle) + "」移动到指定分区： ", 1),
          e("label", null, [
            o[20] || (o[20] = a(" 目标分区 ", -1)),
            u(e("select", {
              id: "folder-move-page-target",
              "onUpdate:modelValue": o[5] || (o[5] = (l) => t(i).folderMove.targetPageId = l),
              required: ""
            }, [
              (s(!0), r(k, null, f(t(i).folderMove.pages, (l) => (s(), r("option", {
                key: l.id,
                value: l.id
              }, d(l.name), 9, re))), 128))
            ], 512), [
              [v, t(i).folderMove.targetPageId]
            ])
          ]),
          e("div", { class: "dialog-actions" }, [
            o[21] || (o[21] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "folder-move-page-cancel",
              type: "button",
              onClick: S
            }, "取消"),
            o[22] || (o[22] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, ne),
      e("dialog", {
        id: "link-move-dialog",
        class: "launcher-dialog",
        open: t(i).linkMove.isOpen
      }, [
        e("form", {
          id: "link-move-form",
          onSubmit: g(V, ["prevent"])
        }, [
          o[29] || (o[29] = e("h2", null, "移动网站", -1)),
          e("p", ce, " 移动「" + d(t(i).linkMove.linkTitle) + "」到： ", 1),
          e("label", ae, [
            o[24] || (o[24] = a(" 目标位置 / 分区 ", -1)),
            u(e("select", {
              id: "link-move-page-target",
              "onUpdate:modelValue": o[6] || (o[6] = (l) => t(i).linkMove.targetPageId = l)
            }, [
              (s(!0), r(k, null, f(t(i).linkMove.pages, (l) => (s(), r("option", {
                key: l.id,
                value: l.id
              }, d(l.name), 9, ue))), 128))
            ], 512), [
              [v, t(i).linkMove.targetPageId]
            ])
          ]),
          t(i).linkMove.showFolderSelect ? (s(), r("label", pe, [
            o[26] || (o[26] = a(" 目标文件夹 / 收藏夹 ", -1)),
            u(e("select", {
              id: "link-move-folder-target",
              "onUpdate:modelValue": o[7] || (o[7] = (l) => t(i).linkMove.targetFolderId = l)
            }, [
              o[25] || (o[25] = e("option", { value: "" }, "（不放入文件夹，保留在分区根目录）", -1)),
              (s(!0), r(k, null, f(t(i).linkMove.folders, (l) => (s(), r("option", {
                key: l.id,
                value: l.id
              }, d(l.name), 9, ge))), 128))
            ], 512), [
              [v, t(i).linkMove.targetFolderId]
            ])
          ])) : h("", !0),
          e("div", { class: "dialog-actions" }, [
            o[27] || (o[27] = e("span", { class: "grow" }, null, -1)),
            e("button", {
              id: "link-move-cancel",
              type: "button",
              onClick: O
            }, "取消"),
            o[28] || (o[28] = e("button", {
              class: "dialog-primary",
              type: "submit"
            }, "确定移动", -1))
          ])
        ], 32)
      ], 8, de),
      e("dialog", {
        id: "launcher-icon-picker-dialog",
        class: "launcher-dialog launcher-icon-picker-dialog",
        open: t(i).iconPicker.isOpen
      }, [
        e("div", {
          class: "icon-picker-shell",
          inert: t(i).iconPicker.isSaving,
          "aria-busy": t(i).iconPicker.isSaving
        }, [
          e("header", { class: "icon-picker-header" }, [
            o[30] || (o[30] = e("div", { class: "icon-picker-title-group" }, [
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
          e("div", me, [
            u(e("input", {
              id: "icon-picker-search-input",
              "onUpdate:modelValue": o[8] || (o[8] = (l) => t(i).iconPicker.query = l),
              type: "text",
              placeholder: "输入名称搜索图标，例如：学习通、B站、知乎…",
              autocomplete: "off",
              onKeydown: H(g(P, ["prevent"]), ["enter"])
            }, null, 40, be), [
              [p, t(i).iconPicker.query]
            ]),
            e("button", {
              id: "icon-picker-search-btn",
              type: "button",
              onClick: P
            }, "🔍 搜索"),
            e("button", {
              id: "icon-picker-custom-toggle-btn",
              type: "button",
              class: "icon-picker-ext-btn",
              title: "输入图片网址或选择本地图片",
              onClick: q
            }, " 📁 上传/贴链接 ")
          ]),
          e("div", {
            id: "icon-picker-custom-panel",
            class: "icon-picker-custom-panel",
            hidden: !t(i).iconPicker.isCustomPanelOpen
          }, [
            e("div", ye, [
              u(e("input", {
                id: "icon-picker-url-input",
                "onUpdate:modelValue": o[9] || (o[9] = (l) => t(i).iconPicker.customUrl = l),
                type: "url",
                placeholder: "粘贴任意在线图片网址 (https://...)"
              }, null, 512), [
                [p, t(i).iconPicker.customUrl]
              ]),
              e("button", {
                id: "icon-picker-url-apply",
                type: "button",
                onClick: E
              }, "使用网址")
            ]),
            e("div", he, [
              e("label", Pe, [
                o[31] || (o[31] = a(" 📁 选择本地图片文件 ", -1)),
                e("input", {
                  id: "icon-picker-file-input",
                  type: "file",
                  accept: "image/*",
                  style: { display: "none" },
                  onChange: N
                }, null, 32)
              ]),
              o[32] || (o[32] = e("span", {
                id: "icon-picker-upload-tip",
                class: "small muted"
              }, "支持 png, jpg, webp, svg 等格式", -1))
            ])
          ], 8, ve),
          e("div", De, [
            e("div", {
              id: "icon-picker-loading",
              class: "icon-picker-loading",
              hidden: !t(i).iconPicker.isLoading
            }, [...o[33] || (o[33] = [
              e("span", { class: "icon-picker-spinner" }, null, -1),
              a(" 正在搜索高质量头像图标… ", -1)
            ])], 8, Ce),
            e("div", {
              id: "icon-picker-empty",
              class: "icon-picker-empty",
              hidden: t(i).iconPicker.isLoading || t(i).iconPicker.results.length > 0
            }, " 没有找到相关图标，您可以更换搜索词或点击右上角「上传/贴链接」。 ", 8, Me),
            e("div", _e, [
              (s(!0), r(k, null, f(L.value, (l, b) => (s(), r("button", {
                key: b,
                class: J(["icon-picker-item", { selected: t(i).iconPicker.selectedIconUrl === l.url }]),
                type: "button",
                onClick: (C) => A(l.url)
              }, [
                e("img", {
                  src: l.url,
                  alt: ""
                }, null, 8, we)
              ], 10, Ue))), 128))
            ])
          ]),
          e("div", {
            id: "icon-picker-pagination",
            class: "icon-picker-pagination",
            hidden: t(i).iconPicker.totalPages <= 1
          }, [
            e("button", {
              id: "icon-picker-prev-page",
              type: "button",
              class: "icon-picker-page-btn",
              title: "上一页",
              disabled: t(i).iconPicker.currentPage <= 1,
              onClick: G
            }, " ‹ 上一页 ", 8, xe),
            e("span", Fe, " 第 " + d(t(i).iconPicker.currentPage) + " / " + d(t(i).iconPicker.totalPages) + " 页 ", 1),
            e("button", {
              id: "icon-picker-next-page",
              type: "button",
              class: "icon-picker-page-btn",
              title: "下一页",
              disabled: t(i).iconPicker.currentPage >= t(i).iconPicker.totalPages,
              onClick: R
            }, " 下一页 › ", 8, Se)
          ], 8, Ie),
          e("footer", Ve, [
            e("div", Oe, [
              o[34] || (o[34] = e("span", { class: "muted small" }, "当前选用：", -1)),
              e("div", Le, [
                t(i).iconPicker.selectedIconUrl ? (s(), r("img", {
                  key: 0,
                  src: t(i).iconPicker.selectedIconUrl,
                  alt: ""
                }, null, 8, qe)) : (s(), r("span", Ee, "未选择"))
              ])
            ]),
            e("div", Ne, [
              e("button", {
                id: "icon-picker-cancel",
                type: "button",
                onClick: D
              }, "取消"),
              e("button", {
                id: "icon-picker-confirm",
                class: "dialog-primary",
                type: "button",
                disabled: !t(i).iconPicker.selectedIconUrl,
                onClick: T
              }, " 确定设为头像 ", 8, Ae)
            ])
          ])
        ], 8, fe)
      ], 8, ke),
      e("dialog", {
        ref_key: "folderDeleteDialogRef",
        ref: y,
        id: "folder-delete-dialog",
        class: "launcher-dialog folder-delete-dialog",
        open: t(i).folderDelete.isOpen,
        onClick: K,
        onCancel: m
      }, [
        e("div", Re, [
          e("header", Te, [
            e("h3", ze, "📁 删除文件夹" + d(t(i).folderDelete.groupName ? `「${t(i).folderDelete.groupName}」` : ""), 1),
            e("button", {
              id: "folder-delete-close",
              type: "button",
              class: "folder-delete-close-btn",
              title: "关闭",
              onClick: m
            }, "✕")
          ]),
          e("div", Be, [
            e("p", Ke, d(t(i).folderDelete.count > 0 ? `文件夹内共有 ${t(i).folderDelete.count} 个书签，请选择删除处理方式：` : "请选择当前文件夹的删除处理方式："), 1),
            e("div", {
              id: "folder-delete-hint",
              class: "folder-delete-hint",
              hidden: !t(i).folderDelete.hint
            }, d(t(i).folderDelete.hint), 9, $e)
          ]),
          e("div", je, [
            t(i).folderDelete.count > 0 ? (s(), r("button", {
              key: 0,
              id: "folder-delete-release-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-release",
              onClick: z
            }, [...o[35] || (o[35] = [
              e("span", { class: "dialog-btn-icon" }, "📦", -1),
              e("span", { class: "dialog-btn-text" }, [
                e("strong", null, "仅解散文件夹（保留内容）"),
                e("small", null, "直属网站和子文件夹移到上一级；顶层内容移到分区根目录")
              ], -1)
            ])])) : h("", !0),
            e("button", {
              id: "folder-delete-all-btn",
              type: "button",
              class: "dialog-action-btn dialog-action-danger",
              onClick: B
            }, [...o[36] || (o[36] = [
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
              onClick: m
            }, "取消")
          ])
        ])
      ], 40, Ge)
    ]));
  }
});
export {
  We as default
};
