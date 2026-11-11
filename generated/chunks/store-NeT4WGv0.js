import { a as o } from "./search.service-wriY3nvN.js";
import { r as M, a as D } from "./vendor-vue-9b0eS4bW.js";
import { a as h } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
const a = M({
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
let L = null;
const S = {
  get state() {
    return a;
  },
  getSnapshot() {
    return D(a);
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
    L = e;
  },
  dispatch(e, t) {
    L?.(e, t);
  }
}, P = M({
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
}), l = P;
let f = null, v = null, O = "";
const y = {
  state: l,
  updateState(e) {
    Object.assign(l, e);
  },
  setMounted(e) {
    l.mounted = e;
  },
  onAction(e) {
    v = e;
  },
  dispatch(e, t, n) {
    if (v)
      return v(e, t, n);
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
      await o.saveLink({
        id: l.editDialog.id,
        title: l.editDialog.title.trim(),
        url: l.editDialog.url.trim(),
        group: l.editDialog.group.trim(),
        note: l.editDialog.note.trim()
      }), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 保存网站失败", e), h.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },
  async deleteFromEditDialog() {
    try {
      l.editDialog.id && await o.deleteLink(l.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), h.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, t, n, i, r = "") {
    O = r, l.linkMove.isOpen = !0, l.linkMove.linkTitle = e, l.linkMove.pages = [...t], l.linkMove.folders = [...n], l.linkMove.targetPageId = i || (t[0]?.id ?? ""), l.linkMove.targetFolderId = "", l.linkMove.showFolderSelect = n.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    l.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = o.getState().links.find((t) => t.id === O);
    if (!(!e || !l.linkMove.targetPageId))
      try {
        await o.moveLinkTo(e.id, l.linkMove.targetPageId, l.linkMove.targetFolderId || e.group), this.closeLinkMove();
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
        await o.moveFolderToPage(l.folderMove.folderTitle, l.folderMove.targetPageId), this.closeFolderMove();
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
      await o.mergeGroups(l.groupMerge.groupTitle, l.groupMerge.targetGroup), this.closeGroupMerge();
    } catch (e) {
      console.warn("[Launcher] 合并文件夹失败", e);
    }
  },
  // --- 6. 文件夹删除确认 ---
  openFolderDeleteDialog(e) {
    l.folderDelete.isOpen = !0, l.folderDelete.groupName = e.groupName, l.folderDelete.count = e.count, l.folderDelete.hint = e.hint || "", f = {
      onRelease: e.onRelease,
      onDeleteAll: e.onDeleteAll,
      onCancel: e.onCancel
    }, this.dispatch("folder-delete", "open", { groupName: e.groupName, count: e.count });
  },
  closeFolderDeleteDialog() {
    l.folderDelete.isOpen = !1;
    const e = f?.onCancel;
    f = null, e?.(), this.dispatch("folder-delete", "close");
  },
  async releaseFolderDelete() {
    l.folderDelete.isOpen = !1;
    const e = f?.onRelease;
    f = null, e && await e(), this.dispatch("folder-delete", "release");
  },
  async deleteAllFolderDelete() {
    l.folderDelete.isOpen = !1;
    const e = f?.onDeleteAll;
    f = null, e && await e(), this.dispatch("folder-delete", "delete-all");
  }
};
function b(e) {
  if (!e) return;
  const t = o.getState().links.filter((p) => (p.group || "常用网站") === e), n = o.getState().folders || {}, i = Object.values(n).some((p) => p?.parent === e), r = t.length;
  if (r === 0 && !i) {
    o.deleteGroup(e, "purge");
    return;
  }
  const c = t.slice(0, 4).map((p) => p.title || "未命名").join("、");
  y.openFolderDeleteDialog({
    groupName: e,
    count: r,
    hint: r ? `包含：${c}${r > 4 ? ` 等 ${r} 个书签` : ""}` : "",
    onRelease: async () => {
      await o.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await o.deleteGroup(e, "purge");
    }
  });
}
async function A(e, t) {
  const n = t?.group;
  if (e === "folder:rename" && n) {
    const i = (await h.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${n}」的新名称：`,
      defaultValue: n
    }))?.trim();
    i && i !== n && await o.renameGroup(n, i);
  } else if (e === "folder:toggle-size" && n)
    await o.toggleGroupSize(n);
  else if (e === "folder:move" && n && t?.page)
    await o.moveFolderToPage(n, t.page);
  else if (e === "folder:delete" && n)
    b(n);
  else if (e === "page:delete" && t?.page) {
    if (o.getPageNames().length <= 1) {
      await h.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await h.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${o.getPageLabel(t.page)}」吗？
该分区下的网站和文件夹将移至保留分区。`,
      danger: !0
    }) && await o.deletePage(t.page);
  } else if (e === "blank:create-large-folder")
    await o.createLargeFolder(void 0, t?.page);
  else if (e === "blank:create-medium-folder")
    await o.createMediumFolder(void 0, t?.page);
  else if (e.startsWith("link:") && t?.link) {
    const i = o.getState().links.find((r) => String(r.id) === String(t.link.id));
    if (!i) return;
    if (e === "link:rename") {
      const r = (await h.prompt({
        title: "重命名网站",
        message: `请输入网站「${i.title}」的新名称：`,
        defaultValue: i.title
      }))?.trim();
      r && r !== i.title && await o.saveLink({ ...i, title: r });
    } else e === "link:create-large-folder" || (e === "link:move" && t.page ? await o.moveLinkTo(i.id, t.page, i.group || "常用网站") : e === "link:move-out" ? await o.moveLinkTo(i.id, i.page, "常用网站") : e === "link:delete" && await o.deleteLink(i.id));
  }
}
const _ = {
  activeMenu: "none",
  confirmingDelete: "none",
  flyoutOpen: !1
};
class T {
  constructor() {
    this._state = { ..._ }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.launcherMenus = this);
  }
  get state() {
    return this._state;
  }
  get activeMenu() {
    return this._state.activeMenu;
  }
  get confirmingDelete() {
    return this._state.confirmingDelete;
  }
  get flyoutOpen() {
    return this._state.flyoutOpen;
  }
  isMenuOpen(t) {
    return this._state.activeMenu === t;
  }
  isConfirming(t) {
    return this._state.confirmingDelete === t;
  }
  subscribe(t) {
    return this._listeners.add(t), () => {
      this._listeners.delete(t);
    };
  }
  _setState(t) {
    this._state = t;
    for (const n of this._listeners)
      n(t);
  }
  send(t) {
    const n = this._state;
    switch (t.type) {
      case "OPEN_FOLDER_MENU":
        return this._setState({
          activeMenu: "folder",
          confirmingDelete: "none",
          flyoutOpen: !1
        }), !0;
      case "OPEN_LINK_MENU":
        return this._setState({
          activeMenu: "link",
          confirmingDelete: "none",
          flyoutOpen: !1
        }), !0;
      case "OPEN_PAGE_MENU":
        return this._setState({
          activeMenu: "page",
          confirmingDelete: "none",
          flyoutOpen: !1
        }), !0;
      case "OPEN_BLANK_MENU":
        return this._setState({
          activeMenu: "blank",
          confirmingDelete: "none",
          flyoutOpen: !1
        }), !0;
      case "SET_FLYOUT":
        return n.activeMenu === "none" ? !1 : (this._setState({
          ...n,
          flyoutOpen: t.open
        }), !0);
      case "REQUEST_DELETE":
        return n.activeMenu === "none" ? !1 : (this._setState({
          ...n,
          confirmingDelete: t.target
        }), !0);
      case "CANCEL_DELETE":
        return n.confirmingDelete !== "none" ? (this._setState({
          ...n,
          confirmingDelete: "none"
        }), !0) : !1;
      case "CLOSE_ALL":
        return this._setState({ ..._ }), !0;
      default:
        return !1;
    }
  }
}
const g = new T(), u = M({
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
}), w = {
  get state() {
    return u;
  },
  get machine() {
    return g;
  },
  getSnapshot() {
    return D(u);
  },
  setMounted(e) {
    u.mounted = e;
  },
  closeAll() {
    g.send({ type: "CLOSE_ALL" }), this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, t, n, i, r) {
    this.closeAll(), g.send({ type: "OPEN_FOLDER_MENU" }), u.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: t,
      canMove: n.length > 0,
      pages: [...n],
      x: Math.max(8, Math.min(window.innerWidth - 220, i)),
      y: Math.max(8, Math.min(window.innerHeight - 240, r)),
      flyoutOpen: !1
    };
  },
  closeFolderMenu() {
    u.folderMenu.isOpen = !1, u.folderMenu.flyoutOpen = !1;
  },
  setFolderFlyoutOpen(e) {
    g.send({ type: "SET_FLYOUT", open: e }), u.folderMenu.flyoutOpen = e;
  },
  openLinkMenu(e, t, n, i) {
    this.closeAll(), g.send({ type: "OPEN_LINK_MENU" }), u.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...t],
      x: Math.max(8, Math.min(window.innerWidth - 220, n)),
      y: Math.max(8, Math.min(window.innerHeight - 280, i)),
      flyoutOpen: !1
    };
  },
  closeLinkMenu() {
    u.linkMenu.isOpen = !1, u.linkMenu.link = null, u.linkMenu.flyoutOpen = !1;
  },
  setLinkFlyoutOpen(e) {
    g.send({ type: "SET_FLYOUT", open: e }), u.linkMenu.flyoutOpen = e;
  },
  openPageMenu(e, t, n, i, r) {
    this.closeAll(), g.send({ type: "OPEN_PAGE_MENU" }), u.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: t,
      canDelete: n,
      x: Math.max(8, Math.min(window.innerWidth - 200, i)),
      y: Math.max(8, Math.min(window.innerHeight - 150, r))
    };
  },
  closePageMenu() {
    u.pageMenu.isOpen = !1;
  },
  openBlankMenu(e, t, n) {
    this.closeAll(), g.send({ type: "OPEN_BLANK_MENU" }), u.blankMenu = {
      isOpen: !0,
      page: e,
      x: Math.max(8, Math.min(window.innerWidth - 200, t)),
      y: Math.max(8, Math.min(window.innerHeight - 150, n))
    };
  },
  closeBlankMenu() {
    u.blankMenu.isOpen = !1;
  },
  dispatch(e, t) {
    A(e, t).catch((n) => {
      console.warn("[Launcher] 菜单操作失败", n), h.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, x = () => ({
  mounted: !1,
  activePage: "常用网站",
  pages: ["常用网站"],
  pageLabels: {},
  links: [],
  groupSizes: {},
  folders: {},
  showSites: !0,
  sitesView: "sites",
  hasTodo: !0,
  hasBili: !1
}), s = M(x());
o.subscribe((e) => {
  s.links = [...e.links], s.pages = [...e.pages], s.pageLabels = { ...e.pageLabels }, s.groupSizes = { ...e.groupSizes }, s.folders = { ...e.folders }, s.activePage = e.activePage;
});
let d = {}, E = null, k = null;
const I = {
  getSnapshot() {
    return D(s);
  },
  setExternalDragHandler(e) {
    E = e;
  },
  setExternalDropHandler(e) {
    k = e;
  },
  handleExternalDragHover(e) {
    E?.(e);
  },
  async handleExternalDrop(e) {
    return k ? k(e) : !1;
  },
  update(e) {
    e.folders && (s.folders = { ...e.folders }), e.links && (s.links = [...e.links]), e.pages && (s.pages = [...e.pages]), e.pageLabels && (s.pageLabels = { ...e.pageLabels }), e.groupSizes && (s.groupSizes = { ...e.groupSizes }), Object.assign(s, e), o.updateState(e);
  },
  setMounted(e) {
    s.mounted = e;
  },
  setActivePage(e) {
    s.activePage = e, o.setPage(e);
  },
  setPages(e) {
    s.pages = [...e];
  },
  setPageLabels(e) {
    s.pageLabels = { ...e };
  },
  setLinks(e) {
    s.links = [...e];
  },
  setPrefs(e, t, n) {
    s.showSites = e, s.hasTodo = t, s.hasBili = n;
  },
  setSitesView(e) {
    s.sitesView = e;
  },
  setActions(e) {
    d = { ...d, ...e };
  },
  switchPage(e) {
    s.activePage = e, o.setPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page: e } }));
  },
  nextPage() {
    o.stepPage(1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-next-page"));
  },
  prevPage() {
    o.stepPage(-1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-prev-page"));
  },
  addPage(e) {
    o.addPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-add-page", { detail: { name: e } }));
  },
  openFolder(e, t) {
    if (d.openFolder) {
      d.openFolder(e, t);
      return;
    }
    const n = s.links.filter((i) => (i.group || "常用网站") === e);
    S.openFolder(e, n), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (d.deleteFolder) {
      d.deleteFolder(e);
      return;
    }
    o.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, t) {
    if (t && typeof t.preventDefault == "function" && t.preventDefault(), d.openLink) {
      d.openLink(e, t);
      return;
    }
    if (e?.url) {
      const n = !!(t && (t.ctrlKey || t.metaKey || t.button === 1));
      let i = !1;
      if (typeof chrome < "u" && chrome.tabs?.create)
        try {
          chrome.tabs.create({ url: e.url, active: !n }), i = !0;
        } catch {
          i = !1;
        }
      i || window.open(e.url, "_blank", "noopener,noreferrer");
    }
  },
  openLinkMenu(e, t) {
    if (d.openLinkMenu) {
      d.openLinkMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, i = t?.clientY || 0, r = s.pages.map((c) => ({ id: c, name: s.pageLabels[c] || c }));
    w.openLinkMenu(e, r, n, i);
  },
  openFolderMenu(e, t, n) {
    if (d.openFolderMenu) {
      d.openFolderMenu(e, t, n);
      return;
    }
    const i = n?.clientX || 0, r = n?.clientY || 0, p = s.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", F = s.pages.map((m) => ({ id: m, name: s.pageLabels[m] || m }));
    w.openFolderMenu(e, p, F, i, r);
  },
  openPageMenu(e, t) {
    if (d.openPageMenu) {
      d.openPageMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, i = t?.clientY || 0, r = s.pageLabels[e] || e, c = s.pages.length > 1;
    w.openPageMenu(e, r, c, n, i);
  }
};
export {
  y as a,
  S as b,
  w as c,
  s as d,
  P as e,
  a as f,
  g,
  I as l,
  u as m,
  b as p
};
