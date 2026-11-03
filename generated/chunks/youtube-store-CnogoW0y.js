import { a as i } from "./search.service-CLxaKgY7.js";
import { r as h, a as L } from "./vendor-vue-dDCd4-uG.js";
import { b as f } from "./read-session-Bp6OONld.js";
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
let F = null;
const S = {
  get state() {
    return a;
  },
  getSnapshot() {
    return L(a);
  },
  setMounted(e) {
    a.mounted = e;
  },
  openFolder(e, t, o) {
    a.isOpen = !0, a.activeFolder = e, a.links = [...t], o && (a.position = { ...o });
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
    F = e;
  },
  dispatch(e, t) {
    F?.(e, t);
  }
}, y = h({
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
}), l = y;
let p = null, v = null, O = "";
const x = {
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
  dispatch(e, t, o) {
    if (v)
      return v(e, t, o);
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
  openLinkMove(e, t, o, n, r = "") {
    O = r, l.linkMove.isOpen = !0, l.linkMove.linkTitle = e, l.linkMove.pages = [...t], l.linkMove.folders = [...o], l.linkMove.targetPageId = n || (t[0]?.id ?? ""), l.linkMove.targetFolderId = "", l.linkMove.showFolderSelect = o.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    l.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = i.getState().links.find((t) => t.id === O);
    if (!(!e || !l.linkMove.targetPageId))
      try {
        await i.moveLinkTo(e.id, l.linkMove.targetPageId, l.linkMove.targetFolderId || e.group), this.closeLinkMove();
      } catch (t) {
        console.warn("[Launcher] 移动网站失败", t);
      }
  },
  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(e, t, o) {
    l.folderMove.isOpen = !0, l.folderMove.folderTitle = e, l.folderMove.pages = [...t], l.folderMove.targetPageId = o || (t[0]?.id ?? ""), this.dispatch("folder-move", "open", { title: e });
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
function E(e) {
  if (!e) return;
  const t = i.getState().links.filter((c) => (c.group || "常用网站") === e), o = i.getState().folders || {}, n = Object.values(o).some((c) => c?.parent === e), r = t.length;
  if (r === 0 && !n) {
    i.deleteGroup(e, "purge");
    return;
  }
  const g = t.slice(0, 4).map((c) => c.title || "未命名").join("、");
  x.openFolderDeleteDialog({
    groupName: e,
    count: r,
    hint: r ? `包含：${g}${r > 4 ? ` 等 ${r} 个书签` : ""}` : "",
    onRelease: async () => {
      await i.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await i.deleteGroup(e, "purge");
    }
  });
}
async function T(e, t) {
  const o = t?.group;
  if (e === "folder:rename" && o) {
    const n = (await f.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${o}」的新名称：`,
      defaultValue: o
    }))?.trim();
    n && n !== o && await i.renameGroup(o, n);
  } else if (e === "folder:toggle-size" && o)
    await i.toggleGroupSize(o);
  else if (e === "folder:move" && o && t?.page)
    await i.moveFolderToPage(o, t.page);
  else if (e === "folder:delete" && o)
    E(o);
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
    const n = i.getState().links.find((r) => String(r.id) === String(t.link.id));
    if (!n) return;
    if (e === "link:rename") {
      const r = (await f.prompt({
        title: "重命名网站",
        message: `请输入网站「${n.title}」的新名称：`,
        defaultValue: n.title
      }))?.trim();
      r && r !== n.title && await i.saveLink({ ...n, title: r });
    } else e === "link:create-large-folder" || (e === "link:move" && t.page ? await i.moveLinkTo(n.id, t.page, n.group || "常用网站") : e === "link:move-out" ? await i.moveLinkTo(n.id, n.page, "常用网站") : e === "link:delete" && await i.deleteLink(n.id));
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
}), m = {
  get state() {
    return d;
  },
  getSnapshot() {
    return L(d);
  },
  setMounted(e) {
    d.mounted = e;
  },
  closeAll() {
    this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, t, o, n, r) {
    this.closeAll(), d.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: t,
      canMove: o.length > 0,
      pages: [...o],
      x: Math.max(8, Math.min(window.innerWidth - 220, n)),
      y: Math.max(8, Math.min(window.innerHeight - 240, r)),
      flyoutOpen: !1
    };
  },
  closeFolderMenu() {
    d.folderMenu.isOpen = !1, d.folderMenu.flyoutOpen = !1;
  },
  setFolderFlyoutOpen(e) {
    d.folderMenu.flyoutOpen = e;
  },
  openLinkMenu(e, t, o, n) {
    this.closeAll(), d.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...t],
      x: Math.max(8, Math.min(window.innerWidth - 220, o)),
      y: Math.max(8, Math.min(window.innerHeight - 280, n)),
      flyoutOpen: !1
    };
  },
  closeLinkMenu() {
    d.linkMenu.isOpen = !1, d.linkMenu.link = null, d.linkMenu.flyoutOpen = !1;
  },
  setLinkFlyoutOpen(e) {
    d.linkMenu.flyoutOpen = e;
  },
  openPageMenu(e, t, o, n, r) {
    this.closeAll(), d.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: t,
      canDelete: o,
      x: Math.max(8, Math.min(window.innerWidth - 200, n)),
      y: Math.max(8, Math.min(window.innerHeight - 150, r))
    };
  },
  closePageMenu() {
    d.pageMenu.isOpen = !1;
  },
  openBlankMenu(e, t, o) {
    this.closeAll(), d.blankMenu = {
      isOpen: !0,
      page: e,
      x: Math.max(8, Math.min(window.innerWidth - 200, t)),
      y: Math.max(8, Math.min(window.innerHeight - 150, o))
    };
  },
  closeBlankMenu() {
    d.blankMenu.isOpen = !1;
  },
  dispatch(e, t) {
    T(e, t).catch((o) => {
      console.warn("[Launcher] 菜单操作失败", o), f.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, A = () => ({
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
}), s = h(A());
i.subscribe((e) => {
  s.links = [...e.links], s.pages = [...e.pages], s.pageLabels = { ...e.pageLabels }, s.groupSizes = { ...e.groupSizes }, s.folders = { ...e.folders }, s.activePage = e.activePage;
});
let u = {}, P = null, w = null;
const I = {
  getSnapshot() {
    return L(s);
  },
  setExternalDragHandler(e) {
    P = e;
  },
  setExternalDropHandler(e) {
    w = e;
  },
  handleExternalDragHover(e) {
    P?.(e);
  },
  async handleExternalDrop(e) {
    return w ? w(e) : !1;
  },
  update(e) {
    e.folders && (s.folders = { ...e.folders }), e.links && (s.links = [...e.links]), e.pages && (s.pages = [...e.pages]), e.pageLabels && (s.pageLabels = { ...e.pageLabels }), e.groupSizes && (s.groupSizes = { ...e.groupSizes }), Object.assign(s, e), i.updateState(e);
  },
  setMounted(e) {
    s.mounted = e;
  },
  setActivePage(e) {
    s.activePage = e, i.setPage(e);
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
  setPrefs(e, t, o) {
    s.showSites = e, s.hasTodo = t, s.hasBili = o;
  },
  setActions(e) {
    u = { ...u, ...e };
  },
  switchPage(e) {
    s.activePage = e, i.setPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page: e } }));
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
    if (u.openFolder) {
      u.openFolder(e, t);
      return;
    }
    const o = s.links.filter((n) => (n.group || "常用网站") === e);
    S.openFolder(e, o), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (u.deleteFolder) {
      u.deleteFolder(e);
      return;
    }
    i.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, t) {
    if (t && typeof t.preventDefault == "function" && t.preventDefault(), u.openLink) {
      u.openLink(e, t);
      return;
    }
    if (e?.url) {
      const o = !!(t && (t.ctrlKey || t.metaKey || t.button === 1));
      let n = !1;
      if (typeof chrome < "u" && chrome.tabs?.create)
        try {
          chrome.tabs.create({ url: e.url, active: !o }), n = !0;
        } catch {
          n = !1;
        }
      n || window.open(e.url, "_blank", "noopener,noreferrer");
    }
  },
  openLinkMenu(e, t) {
    if (u.openLinkMenu) {
      u.openLinkMenu(e, t);
      return;
    }
    const o = t?.clientX || 0, n = t?.clientY || 0, r = s.pages.map((g) => ({ id: g, name: s.pageLabels[g] || g }));
    m.openLinkMenu(e, r, o, n);
  },
  openFolderMenu(e, t, o) {
    if (u.openFolderMenu) {
      u.openFolderMenu(e, t, o);
      return;
    }
    const n = o?.clientX || 0, r = o?.clientY || 0, c = s.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", b = s.pages.map((M) => ({ id: M, name: s.pageLabels[M] || M }));
    m.openFolderMenu(e, c, b, n, r);
  },
  openPageMenu(e, t) {
    if (u.openPageMenu) {
      u.openPageMenu(e, t);
      return;
    }
    const o = t?.clientX || 0, n = t?.clientY || 0, r = s.pageLabels[e] || e, g = s.pages.length > 1;
    m.openPageMenu(e, r, g, o, n);
  }
}, k = h({
  currentView: "favorites",
  userName: "LogicWeaver 用户",
  currentPage: 1,
  pageSize: 18,
  isLoading: !1,
  isLoadingMore: !1,
  favoritesBusy: !1,
  favoritesLoading: !1,
  favoritesNeedsReview: !1,
  favoriteMessage: "",
  error: "",
  exploreVideos: [],
  favorites: [],
  groups: [],
  channels: [],
  videos: [],
  playlists: [],
  activePlaylistId: "",
  playlistVideos: [],
  searchResults: [],
  favGroups: ["全部", "稍后观看"],
  activeFavGroup: "全部"
}), D = /* @__PURE__ */ new Set(), z = {
  get state() {
    return k;
  },
  updateState(e) {
    Object.assign(k, e);
  },
  switchView(e) {
    k.currentView = e, this.dispatch("switch-view", e);
  },
  onAction(e) {
    return D.add(e), () => {
      D.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of D)
      try {
        o(e, t);
      } catch (n) {
        console.error("[YouTube] Action error:", n);
      }
  }
};
export {
  I as a,
  m as b,
  x as c,
  s as d,
  y as e,
  a as f,
  k as g,
  S as l,
  d as m,
  E as p,
  z as y
};
