import { a as i } from "./search.service-B9qkjmAV.js";
import { r as h, a as w } from "./vendor-vue-D8gPZiit.js";
import { b as f } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
const a = h({
  mounted: !1,
  isOpen: !1,
  activeFolder: "",
  links: [],
  folders: [],
  parentFolder: "",
  position: null,
  isDragging: !1,
  dropHoverValid: !1
});
let D = null;
const P = {
  get state() {
    return a;
  },
  getSnapshot() {
    return w(a);
  },
  setMounted(e) {
    a.mounted = e;
  },
  openFolder(e, t, n) {
    a.isOpen = !0, a.activeFolder = e, a.links = [...t], n && (a.position = { ...n });
  },
  closeFolder() {
    a.folders = [], a.parentFolder = "", a.isOpen = !1, a.activeFolder = "", a.isDragging = !1, a.dropHoverValid = !1;
  },
  setLinks(e) {
    a.links = [...e];
  },
  setFolders(e, t) {
    a.folders = e, a.parentFolder = t || "";
  },
  setActiveFolder(e) {
    a.activeFolder = e;
  },
  setPosition(e) {
    a.position = e ? { ...e } : null;
  },
  setDragging(e) {
    a.isDragging = e;
  },
  setDropHoverValid(e) {
    a.dropHoverValid = e;
  },
  setActionHandler(e) {
    D = e;
  },
  dispatch(e, t) {
    D?.(e, t);
  }
}, b = h({
  mounted: !1,
  editDialog: {
    isOpen: !1,
    id: "",
    title: "",
    url: "",
    group: "",
    note: "",
    isNew: !0
  },
  linkMove: {
    isOpen: !1,
    linkTitle: "",
    pages: [],
    folders: [],
    targetPageId: "",
    targetFolderId: "",
    showFolderSelect: !1
  },
  folderMove: {
    isOpen: !1,
    folderTitle: "",
    pages: [],
    targetPageId: ""
  },
  groupMerge: {
    isOpen: !1,
    groupTitle: "",
    groups: [],
    targetGroup: ""
  },
  folderDelete: {
    isOpen: !1,
    groupName: "",
    count: 0,
    hint: ""
  }
}), l = b;
let p = null, m = null, F = "";
const x = {
  state: l,
  updateState(e) {
    Object.assign(l, e);
  },
  setMounted(e) {
    l.mounted = e;
  },
  onAction(e) {
    m = e;
  },
  dispatch(e, t, n) {
    if (m)
      return m(e, t, n);
  },
  // --- 1. 编辑/添加弹窗 ---
  openEditDialog(e) {
    l.editDialog.isOpen = !0, l.editDialog.id = e.id || "", l.editDialog.title = e.title || "", l.editDialog.url = e.url || "", l.editDialog.group = e.group || "常用网站", l.editDialog.note = e.note || "", l.editDialog.isNew = !e.id, this.dispatch("edit", "open", e);
  },
  closeEditDialog() {
    l.editDialog.isOpen = !1, this.dispatch("edit", "close");
  },
  async submitEditDialog() {
    try {
      await i.saveLink({
        id: l.editDialog.id,
        title: l.editDialog.title.trim(),
        url: l.editDialog.url.trim(),
        group: l.editDialog.group.trim(),
        note: l.editDialog.note.trim()
      }), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 保存网站失败", e), f.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },
  async deleteFromEditDialog() {
    try {
      l.editDialog.id && await i.deleteLink(l.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), f.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, t, n, o, s = "") {
    F = s, l.linkMove.isOpen = !0, l.linkMove.linkTitle = e, l.linkMove.pages = [...t], l.linkMove.folders = [...n], l.linkMove.targetPageId = o || (t[0]?.id ?? ""), l.linkMove.targetFolderId = "", l.linkMove.showFolderSelect = n.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    l.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = i.getState().links.find((t) => t.id === F);
    if (!(!e || !l.linkMove.targetPageId))
      try {
        await i.moveLinkTo(e.id, l.linkMove.targetPageId, l.linkMove.targetFolderId || e.group), this.closeLinkMove();
      } catch (t) {
        console.warn("[Launcher] 移动网站失败", t);
      }
  },
  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(e, t, n) {
    l.folderMove.isOpen = !0, l.folderMove.folderTitle = e, l.folderMove.pages = [...t], l.folderMove.targetPageId = n || (t[0]?.id ?? ""), this.dispatch("folder-move", "open", { title: e });
  },
  closeFolderMove() {
    l.folderMove.isOpen = !1, this.dispatch("folder-move", "close");
  },
  async confirmFolderMove() {
    if (!(!l.folderMove.folderTitle || !l.folderMove.targetPageId))
      try {
        await i.moveFolderToPage(l.folderMove.folderTitle, l.folderMove.targetPageId), this.closeFolderMove();
      } catch (e) {
        console.warn("[Launcher] 移动文件夹失败", e);
      }
  },
  // --- 5. 合并收藏夹 ---
  openGroupMerge(e, t) {
    l.groupMerge.isOpen = !0, l.groupMerge.groupTitle = e, l.groupMerge.groups = [...t], l.groupMerge.targetGroup = t[0] || "", this.dispatch("group-merge", "open", { title: e });
  },
  closeGroupMerge() {
    l.groupMerge.isOpen = !1, this.dispatch("group-merge", "close");
  },
  async confirmGroupMerge() {
    try {
      await i.mergeGroups(l.groupMerge.groupTitle, l.groupMerge.targetGroup), this.closeGroupMerge();
    } catch (e) {
      console.warn("[Launcher] 合并文件夹失败", e);
    }
  },
  // --- 6. 文件夹删除确认 ---
  openFolderDeleteDialog(e) {
    l.folderDelete.isOpen = !0, l.folderDelete.groupName = e.groupName, l.folderDelete.count = e.count, l.folderDelete.hint = e.hint || "", p = {
      onRelease: e.onRelease,
      onDeleteAll: e.onDeleteAll,
      onCancel: e.onCancel
    }, this.dispatch("folder-delete", "open", { groupName: e.groupName, count: e.count });
  },
  closeFolderDeleteDialog() {
    l.folderDelete.isOpen = !1;
    const e = p?.onCancel;
    p = null, e?.(), this.dispatch("folder-delete", "close");
  },
  async releaseFolderDelete() {
    l.folderDelete.isOpen = !1;
    const e = p?.onRelease;
    p = null, e && await e(), this.dispatch("folder-delete", "release");
  },
  async deleteAllFolderDelete() {
    l.folderDelete.isOpen = !1;
    const e = p?.onDeleteAll;
    p = null, e && await e(), this.dispatch("folder-delete", "delete-all");
  }
};
function S(e) {
  if (!e) return;
  const t = i.getState().links.filter((c) => (c.group || "常用网站") === e), n = i.getState().folders || {}, o = Object.values(n).some((c) => c?.parent === e), s = t.length;
  if (s === 0 && !o) {
    i.deleteGroup(e, "purge");
    return;
  }
  const u = t.slice(0, 4).map((c) => c.title || "未命名").join("、");
  x.openFolderDeleteDialog({
    groupName: e,
    count: s,
    hint: s ? `包含：${u}${s > 4 ? ` 等 ${s} 个书签` : ""}` : "",
    onRelease: async () => {
      await i.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await i.deleteGroup(e, "purge");
    }
  });
}
async function y(e, t) {
  const n = t?.group;
  if (e === "folder:rename" && n) {
    const o = (await f.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${n}」的新名称：`,
      defaultValue: n
    }))?.trim();
    o && o !== n && await i.renameGroup(n, o);
  } else if (e === "folder:toggle-size" && n)
    await i.toggleGroupSize(n);
  else if (e === "folder:move" && n && t?.page)
    await i.moveFolderToPage(n, t.page);
  else if (e === "folder:delete" && n)
    S(n);
  else if (e === "page:delete" && t?.page) {
    if (i.getPageNames().length <= 1) {
      await f.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await f.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${i.getPageLabel(t.page)}」吗？
该分区下的网站和文件夹将移至保留分区。`,
      danger: !0
    }) && await i.deletePage(t.page);
  } else if (e === "blank:create-large-folder")
    await i.createLargeFolder(void 0, t?.page);
  else if (e === "blank:create-medium-folder")
    await i.createMediumFolder(void 0, t?.page);
  else if (e.startsWith("link:") && t?.link) {
    const o = i.getState().links.find((s) => String(s.id) === String(t.link.id));
    if (!o) return;
    if (e === "link:rename") {
      const s = (await f.prompt({
        title: "重命名网站",
        message: `请输入网站「${o.title}」的新名称：`,
        defaultValue: o.title
      }))?.trim();
      s && s !== o.title && await i.saveLink({ ...o, title: s });
    } else e === "link:create-large-folder" || (e === "link:move" && t.page ? await i.moveLinkTo(o.id, t.page, o.group || "常用网站") : e === "link:move-out" ? await i.moveLinkTo(o.id, o.page, "常用网站") : e === "link:delete" && await i.deleteLink(o.id));
  }
}
const d = h({
  mounted: !1,
  folderMenu: {
    isOpen: !1,
    groupName: "",
    sizeText: "扩大为大收藏夹",
    canMove: !0,
    pages: [],
    x: 0,
    y: 0,
    flyoutOpen: !1
  },
  linkMenu: {
    isOpen: !1,
    link: null,
    pages: [],
    x: 0,
    y: 0,
    flyoutOpen: !1
  },
  pageMenu: {
    isOpen: !1,
    pageName: "",
    pageLabel: "",
    canDelete: !0,
    x: 0,
    y: 0
  },
  blankMenu: {
    isOpen: !1,
    page: "",
    x: 0,
    y: 0
  }
}), v = {
  get state() {
    return d;
  },
  getSnapshot() {
    return w(d);
  },
  setMounted(e) {
    d.mounted = e;
  },
  closeAll() {
    this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, t, n, o, s) {
    this.closeAll(), d.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: t,
      canMove: n.length > 0,
      pages: [...n],
      x: Math.max(8, Math.min(window.innerWidth - 220, o)),
      y: Math.max(8, Math.min(window.innerHeight - 240, s)),
      flyoutOpen: !1
    };
  },
  closeFolderMenu() {
    d.folderMenu.isOpen = !1, d.folderMenu.flyoutOpen = !1;
  },
  setFolderFlyoutOpen(e) {
    d.folderMenu.flyoutOpen = e;
  },
  openLinkMenu(e, t, n, o) {
    this.closeAll(), d.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...t],
      x: Math.max(8, Math.min(window.innerWidth - 220, n)),
      y: Math.max(8, Math.min(window.innerHeight - 280, o)),
      flyoutOpen: !1
    };
  },
  closeLinkMenu() {
    d.linkMenu.isOpen = !1, d.linkMenu.link = null, d.linkMenu.flyoutOpen = !1;
  },
  setLinkFlyoutOpen(e) {
    d.linkMenu.flyoutOpen = e;
  },
  openPageMenu(e, t, n, o, s) {
    this.closeAll(), d.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: t,
      canDelete: n,
      x: Math.max(8, Math.min(window.innerWidth - 200, o)),
      y: Math.max(8, Math.min(window.innerHeight - 150, s))
    };
  },
  closePageMenu() {
    d.pageMenu.isOpen = !1;
  },
  openBlankMenu(e, t, n) {
    this.closeAll(), d.blankMenu = {
      isOpen: !0,
      page: e,
      x: Math.max(8, Math.min(window.innerWidth - 200, t)),
      y: Math.max(8, Math.min(window.innerHeight - 150, n))
    };
  },
  closeBlankMenu() {
    d.blankMenu.isOpen = !1;
  },
  dispatch(e, t) {
    y(e, t).catch((n) => {
      console.warn("[Launcher] 菜单操作失败", n), f.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, E = () => ({
  mounted: !1,
  activePage: "常用网站",
  pages: ["常用网站"],
  pageLabels: {},
  links: [],
  groupSizes: {},
  folders: {},
  showSites: !0,
  hasTodo: !0,
  hasBili: !1
}), r = h(E());
i.subscribe((e) => {
  r.links = [...e.links], r.pages = [...e.pages], r.pageLabels = { ...e.pageLabels }, r.groupSizes = { ...e.groupSizes }, r.folders = { ...e.folders }, r.activePage = e.activePage;
});
let g = {}, L = null, k = null;
const H = {
  getSnapshot() {
    return w(r);
  },
  setExternalDragHandler(e) {
    L = e;
  },
  setExternalDropHandler(e) {
    k = e;
  },
  handleExternalDragHover(e) {
    L?.(e);
  },
  async handleExternalDrop(e) {
    return k ? k(e) : !1;
  },
  update(e) {
    e.folders && (r.folders = { ...e.folders }), e.links && (r.links = [...e.links]), e.pages && (r.pages = [...e.pages]), e.pageLabels && (r.pageLabels = { ...e.pageLabels }), e.groupSizes && (r.groupSizes = { ...e.groupSizes }), Object.assign(r, e), i.updateState(e);
  },
  setMounted(e) {
    r.mounted = e;
  },
  setActivePage(e) {
    r.activePage = e, i.setPage(e);
  },
  setPages(e) {
    r.pages = [...e];
  },
  setPageLabels(e) {
    r.pageLabels = { ...e };
  },
  setLinks(e) {
    r.links = [...e];
  },
  setPrefs(e, t, n) {
    r.showSites = e, r.hasTodo = t, r.hasBili = n;
  },
  setActions(e) {
    g = { ...g, ...e };
  },
  switchPage(e) {
    r.activePage = e, i.setPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page: e } }));
  },
  nextPage() {
    i.stepPage(1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-next-page"));
  },
  prevPage() {
    i.stepPage(-1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-prev-page"));
  },
  addPage(e) {
    i.addPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-add-page", { detail: { name: e } }));
  },
  openFolder(e, t) {
    if (g.openFolder) {
      g.openFolder(e, t);
      return;
    }
    const n = r.links.filter((o) => (o.group || "常用网站") === e);
    P.openFolder(e, n), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (g.deleteFolder) {
      g.deleteFolder(e);
      return;
    }
    i.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, t) {
    if (t && typeof t.preventDefault == "function" && t.preventDefault(), g.openLink) {
      g.openLink(e, t);
      return;
    }
    if (e?.url) {
      const n = !!(t && (t.ctrlKey || t.metaKey || t.button === 1));
      let o = !1;
      if (typeof chrome < "u" && chrome.tabs?.create)
        try {
          chrome.tabs.create({ url: e.url, active: !n }), o = !0;
        } catch {
          o = !1;
        }
      o || window.open(e.url, "_blank", "noopener,noreferrer");
    }
  },
  openLinkMenu(e, t) {
    if (g.openLinkMenu) {
      g.openLinkMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, o = t?.clientY || 0, s = r.pages.map((u) => ({ id: u, name: r.pageLabels[u] || u }));
    v.openLinkMenu(e, s, n, o);
  },
  openFolderMenu(e, t, n) {
    if (g.openFolderMenu) {
      g.openFolderMenu(e, t, n);
      return;
    }
    const o = n?.clientX || 0, s = n?.clientY || 0, c = r.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", O = r.pages.map((M) => ({ id: M, name: r.pageLabels[M] || M }));
    v.openFolderMenu(e, c, O, o, s);
  },
  openPageMenu(e, t) {
    if (g.openPageMenu) {
      g.openPageMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, o = t?.clientY || 0, s = r.pageLabels[e] || e, u = r.pages.length > 1;
    v.openPageMenu(e, s, u, n, o);
  }
};
export {
  x as a,
  P as b,
  v as c,
  r as d,
  b as e,
  a as f,
  H as l,
  d as m,
  S as p
};
