import { r as Q, a as Z, d as Ne, b as I, w as re, B as Re, x as Ve, o as k, e as b, F as ue, i as v, z as ce, u as d, t as D, f as _, A as N, g as He, h as j, j as qe, T as Ge, s as E } from "./vendor-vue-BkY5-p5y.js";
import { a as l, o as de, t as ge, s as M, d as x, D as ze, E as a } from "./search.service-DF5Rt2Wp.js";
import { a as A, u as Ue } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
import { t as g, _ as $e } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
function fe(e) {
  const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
  return t ? !!t.closest("input, textarea") || t instanceof HTMLElement && t.isContentEditable : !1;
}
function St() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (e) => {
    fe(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (e) => {
    fe(e.target) || e.preventDefault();
  }));
}
const h = Q({
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
let pe = null;
const P = {
  get state() {
    return h;
  },
  getSnapshot() {
    return Z(h);
  },
  setMounted(e) {
    h.mounted = e;
  },
  openFolder(e, t, n) {
    h.isOpen = !0, h.activeFolder = e, h.links = [...t], n && (h.position = { ...n });
  },
  closeFolder() {
    h.folders = [], h.parentFolder = "", h.isOpen = !1, h.activeFolder = "", h.isDragging = !1, h.dropHoverValid = !1;
  },
  setLinks(e) {
    h.links = [...e];
  },
  setFolders(e, t) {
    h.folders = e, h.parentFolder = t || "";
  },
  setActiveFolder(e) {
    h.activeFolder = e;
  },
  setPosition(e) {
    h.position = e ? { ...e } : null;
  },
  setDragging(e) {
    h.isDragging = e;
  },
  setDropHoverValid(e) {
    h.dropHoverValid = e;
  },
  setActionHandler(e) {
    pe = e;
  },
  dispatch(e, t) {
    pe?.(e, t);
  }
}, Qe = Q({
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
}), o = Qe;
let C = null, Y = null, he = "";
const Me = {
  state: o,
  updateState(e) {
    Object.assign(o, e);
  },
  setMounted(e) {
    o.mounted = e;
  },
  onAction(e) {
    Y = e;
  },
  dispatch(e, t, n) {
    if (Y)
      return Y(e, t, n);
  },
  // --- 1. 编辑/添加弹窗 ---
  openEditDialog(e) {
    o.editDialog.isOpen = !0, o.editDialog.id = e.id || "", o.editDialog.title = e.title || "", o.editDialog.url = e.url || "", o.editDialog.group = e.group || "常用网站", o.editDialog.note = e.note || "", o.editDialog.isNew = !e.id, this.dispatch("edit", "open", e);
  },
  closeEditDialog() {
    o.editDialog.isOpen = !1, this.dispatch("edit", "close");
  },
  async submitEditDialog() {
    try {
      await l.saveLink({
        id: o.editDialog.id,
        title: o.editDialog.title.trim(),
        url: o.editDialog.url.trim(),
        group: o.editDialog.group.trim(),
        note: o.editDialog.note.trim()
      }), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 保存网站失败", e), A.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },
  async deleteFromEditDialog() {
    try {
      o.editDialog.id && await l.deleteLink(o.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), A.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, t, n, i, c = "") {
    he = c, o.linkMove.isOpen = !0, o.linkMove.linkTitle = e, o.linkMove.pages = [...t], o.linkMove.folders = [...n], o.linkMove.targetPageId = i || (t[0]?.id ?? ""), o.linkMove.targetFolderId = "", o.linkMove.showFolderSelect = n.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    o.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = l.getState().links.find((t) => t.id === he);
    if (!(!e || !o.linkMove.targetPageId))
      try {
        await l.moveLinkTo(e.id, o.linkMove.targetPageId, o.linkMove.targetFolderId || e.group), this.closeLinkMove();
      } catch (t) {
        console.warn("[Launcher] 移动网站失败", t);
      }
  },
  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(e, t, n) {
    o.folderMove.isOpen = !0, o.folderMove.folderTitle = e, o.folderMove.pages = [...t], o.folderMove.targetPageId = n || (t[0]?.id ?? ""), this.dispatch("folder-move", "open", { title: e });
  },
  closeFolderMove() {
    o.folderMove.isOpen = !1, this.dispatch("folder-move", "close");
  },
  async confirmFolderMove() {
    if (!(!o.folderMove.folderTitle || !o.folderMove.targetPageId))
      try {
        await l.moveFolderToPage(o.folderMove.folderTitle, o.folderMove.targetPageId), this.closeFolderMove();
      } catch (e) {
        console.warn("[Launcher] 移动文件夹失败", e);
      }
  },
  // --- 5. 合并收藏夹 ---
  openGroupMerge(e, t) {
    o.groupMerge.isOpen = !0, o.groupMerge.groupTitle = e, o.groupMerge.groups = [...t], o.groupMerge.targetGroup = t[0] || "", this.dispatch("group-merge", "open", { title: e });
  },
  closeGroupMerge() {
    o.groupMerge.isOpen = !1, this.dispatch("group-merge", "close");
  },
  async confirmGroupMerge() {
    try {
      await l.mergeGroups(o.groupMerge.groupTitle, o.groupMerge.targetGroup), this.closeGroupMerge();
    } catch (e) {
      console.warn("[Launcher] 合并文件夹失败", e);
    }
  },
  // --- 6. 文件夹删除确认 ---
  openFolderDeleteDialog(e) {
    o.folderDelete.isOpen = !0, o.folderDelete.groupName = e.groupName, o.folderDelete.count = e.count, o.folderDelete.hint = e.hint || "", C = {
      onRelease: e.onRelease,
      onDeleteAll: e.onDeleteAll,
      onCancel: e.onCancel
    }, this.dispatch("folder-delete", "open", { groupName: e.groupName, count: e.count });
  },
  closeFolderDeleteDialog() {
    o.folderDelete.isOpen = !1;
    const e = C?.onCancel;
    C = null, e?.(), this.dispatch("folder-delete", "close");
  },
  async releaseFolderDelete() {
    o.folderDelete.isOpen = !1;
    const e = C?.onRelease;
    C = null, e && await e(), this.dispatch("folder-delete", "release");
  },
  async deleteAllFolderDelete() {
    o.folderDelete.isOpen = !1;
    const e = C?.onDeleteAll;
    C = null, e && await e(), this.dispatch("folder-delete", "delete-all");
  }
};
function ye(e) {
  if (!e) return;
  const t = l.getState().links.filter((m) => (m.group || "常用网站") === e), n = l.getState().folders || {}, i = Object.values(n).some((m) => m?.parent === e), c = t.length;
  if (c === 0 && !i) {
    l.deleteGroup(e, "purge");
    return;
  }
  const r = t.slice(0, 4).map((m) => m.title || "未命名").join("、");
  Me.openFolderDeleteDialog({
    groupName: e,
    count: c,
    hint: c ? `包含：${r}${c > 4 ? ` 等 ${c} 个书签` : ""}` : "",
    onRelease: async () => {
      await l.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await l.deleteGroup(e, "purge");
    }
  });
}
async function je(e, t) {
  const n = t?.group;
  if (e === "folder:rename" && n) {
    const i = (await A.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${n}」的新名称：`,
      defaultValue: n
    }))?.trim();
    i && i !== n && await l.renameGroup(n, i);
  } else if (e === "folder:toggle-size" && n)
    await l.toggleGroupSize(n);
  else if (e === "folder:move" && n && t?.page)
    await l.moveFolderToPage(n, t.page);
  else if (e === "folder:delete" && n)
    ye(n);
  else if (e === "page:delete" && t?.page) {
    if (l.getPageNames().length <= 1) {
      await A.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await A.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${l.getPageLabel(t.page)}」吗？
该分区下的网站和文件夹将移至保留分区。`,
      danger: !0
    }) && await l.deletePage(t.page);
  } else if (e === "blank:create-large-folder")
    await l.createLargeFolder(void 0, t?.page);
  else if (e === "blank:create-medium-folder")
    await l.createMediumFolder(void 0, t?.page);
  else if (e.startsWith("link:") && t?.link) {
    const i = l.getState().links.find((c) => String(c.id) === String(t.link.id));
    if (!i) return;
    if (e === "link:rename") {
      const c = (await A.prompt({
        title: "重命名网站",
        message: `请输入网站「${i.title}」的新名称：`,
        defaultValue: i.title
      }))?.trim();
      c && c !== i.title && await l.saveLink({ ...i, title: c });
    } else e === "link:create-large-folder" || (e === "link:move" && t.page ? await l.moveLinkTo(i.id, t.page, i.group || "常用网站") : e === "link:move-out" ? await l.moveLinkTo(i.id, i.page, "常用网站") : e === "link:delete" && await l.deleteLink(i.id));
  }
}
const ve = {
  activeMenu: "none",
  confirmingDelete: "none",
  flyoutOpen: !1
};
class Ye {
  constructor() {
    this._state = { ...ve }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.launcherMenus = this);
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
        return this._setState({ ...ve }), !0;
      default:
        return !1;
    }
  }
}
const F = new Ye(), y = Q({
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
}), V = {
  get state() {
    return y;
  },
  get machine() {
    return F;
  },
  getSnapshot() {
    return Z(y);
  },
  setMounted(e) {
    y.mounted = e;
  },
  closeAll() {
    F.send({ type: "CLOSE_ALL" }), this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, t, n, i, c) {
    this.closeAll(), F.send({ type: "OPEN_FOLDER_MENU" }), y.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: t,
      canMove: n.length > 0,
      pages: [...n],
      x: Math.max(8, Math.min(window.innerWidth - 220, i)),
      y: Math.max(8, Math.min(window.innerHeight - 240, c)),
      flyoutOpen: !1
    };
  },
  closeFolderMenu() {
    y.folderMenu.isOpen = !1, y.folderMenu.flyoutOpen = !1;
  },
  setFolderFlyoutOpen(e) {
    F.send({ type: "SET_FLYOUT", open: e }), y.folderMenu.flyoutOpen = e;
  },
  openLinkMenu(e, t, n, i) {
    this.closeAll(), F.send({ type: "OPEN_LINK_MENU" }), y.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...t],
      x: Math.max(8, Math.min(window.innerWidth - 220, n)),
      y: Math.max(8, Math.min(window.innerHeight - 280, i)),
      flyoutOpen: !1
    };
  },
  closeLinkMenu() {
    y.linkMenu.isOpen = !1, y.linkMenu.link = null, y.linkMenu.flyoutOpen = !1;
  },
  setLinkFlyoutOpen(e) {
    F.send({ type: "SET_FLYOUT", open: e }), y.linkMenu.flyoutOpen = e;
  },
  openPageMenu(e, t, n, i, c) {
    this.closeAll(), F.send({ type: "OPEN_PAGE_MENU" }), y.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: t,
      canDelete: n,
      x: Math.max(8, Math.min(window.innerWidth - 200, i)),
      y: Math.max(8, Math.min(window.innerHeight - 150, c))
    };
  },
  closePageMenu() {
    y.pageMenu.isOpen = !1;
  },
  openBlankMenu(e, t, n) {
    this.closeAll(), F.send({ type: "OPEN_BLANK_MENU" }), y.blankMenu = {
      isOpen: !0,
      page: e,
      x: Math.max(8, Math.min(window.innerWidth - 200, t)),
      y: Math.max(8, Math.min(window.innerHeight - 150, n))
    };
  },
  closeBlankMenu() {
    y.blankMenu.isOpen = !1;
  },
  dispatch(e, t) {
    je(e, t).catch((n) => {
      console.warn("[Launcher] 菜单操作失败", n), A.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, Ke = () => ({
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
}), f = Q(Ke());
l.subscribe((e) => {
  f.links = [...e.links], f.pages = [...e.pages], f.pageLabels = { ...e.pageLabels }, f.groupSizes = { ...e.groupSizes }, f.folders = { ...e.folders }, f.activePage = e.activePage;
});
let S = {}, me = null, K = null;
const z = {
  getSnapshot() {
    return Z(f);
  },
  setExternalDragHandler(e) {
    me = e;
  },
  setExternalDropHandler(e) {
    K = e;
  },
  handleExternalDragHover(e) {
    me?.(e);
  },
  async handleExternalDrop(e) {
    return K ? K(e) : !1;
  },
  update(e) {
    e.folders && (f.folders = { ...e.folders }), e.links && (f.links = [...e.links]), e.pages && (f.pages = [...e.pages]), e.pageLabels && (f.pageLabels = { ...e.pageLabels }), e.groupSizes && (f.groupSizes = { ...e.groupSizes }), Object.assign(f, e), l.updateState(e);
  },
  setMounted(e) {
    f.mounted = e;
  },
  setActivePage(e) {
    f.activePage = e, l.setPage(e);
  },
  setPages(e) {
    f.pages = [...e];
  },
  setPageLabels(e) {
    f.pageLabels = { ...e };
  },
  setLinks(e) {
    f.links = [...e];
  },
  setPrefs(e, t, n) {
    f.showSites = e, f.hasTodo = t, f.hasBili = n;
  },
  setSitesView(e) {
    f.sitesView = e;
  },
  setActions(e) {
    S = { ...S, ...e };
  },
  switchPage(e) {
    f.activePage = e, l.setPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page: e } }));
  },
  nextPage() {
    l.stepPage(1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-next-page"));
  },
  prevPage() {
    l.stepPage(-1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-prev-page"));
  },
  addPage(e) {
    l.addPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-add-page", { detail: { name: e } }));
  },
  openFolder(e, t) {
    if (S.openFolder) {
      S.openFolder(e, t);
      return;
    }
    const n = f.links.filter((i) => (i.group || "常用网站") === e);
    P.openFolder(e, n), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (S.deleteFolder) {
      S.deleteFolder(e);
      return;
    }
    l.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, t) {
    if (t && typeof t.preventDefault == "function" && t.preventDefault(), S.openLink) {
      S.openLink(e, t);
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
    if (S.openLinkMenu) {
      S.openLinkMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, i = t?.clientY || 0, c = f.pages.map((r) => ({ id: r, name: f.pageLabels[r] || r }));
    V.openLinkMenu(e, c, n, i);
  },
  openFolderMenu(e, t, n) {
    if (S.openFolderMenu) {
      S.openFolderMenu(e, t, n);
      return;
    }
    const i = n?.clientX || 0, c = n?.clientY || 0, m = f.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", U = f.pages.map((T) => ({ id: T, name: f.pageLabels[T] || T }));
    V.openFolderMenu(e, m, U, i, c);
  },
  openPageMenu(e, t) {
    if (S.openPageMenu) {
      S.openPageMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, i = t?.clientY || 0, c = f.pageLabels[e] || e, r = f.pages.length > 1;
    V.openPageMenu(e, c, r, n, i);
  }
}, X = () => window;
let R = !1, q, W, G;
function ke(e) {
  return l.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: l.getPageLabel(t) }));
}
function be() {
  if (!h.isOpen || !h.activeFolder) return;
  const e = l.getState(), t = h.activeFolder;
  P.setLinks(e.links.filter((r) => (r.group || "常用网站") === t));
  const n = /* @__PURE__ */ new Map();
  for (const r of e.links) {
    const m = r.group || "常用网站";
    n.has(m) || n.set(m, []), n.get(m).push(r);
  }
  const i = new Map(Object.keys(e.folders).map((r) => [r, de(e.folders, r)])), c = /* @__PURE__ */ new Map();
  for (const r of i.values()) r && c.set(r, (c.get(r) || 0) + 1);
  P.setFolders([...i].filter(([, r]) => r === t).map(([r]) => ({
    groupName: r,
    links: n.get(r) || [],
    count: (n.get(r)?.length || 0) + (c.get(r) || 0)
  })), de(e.folders, t));
}
const Xe = {
  openEditor(e) {
    Me.openEditDialog(e || {});
  },
  openFolder(e = h.activeFolder) {
    if (!e) return;
    const n = l.getState().links.filter((i) => (i.group || "常用网站") === e);
    P.openFolder(e, n), be();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), V.openLinkMenu(e, ke(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, n) {
    t?.preventDefault?.();
    const i = l.getState(), c = n || i.activePage;
    V.openFolderMenu(
      e,
      l.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      ke(c),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), V.openPageMenu(
      e,
      l.getPageLabel(e),
      l.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  async locateLink(e) {
    if (!e) return !1;
    await l.ready;
    const t = l.getState().links.find((c) => String(c.id) === String(e));
    if (!t) return !1;
    const n = t.page || "常用网站";
    l.getState().activePage !== n && await l.setPage(n);
    const i = t.group || "常用网站";
    return i !== "常用网站" ? this.openFolder(i) : h.isOpen && P.closeFolder(), setTimeout(() => {
      const c = `[data-launcher-id="${t.id}"]`, r = document.querySelector(c);
      r && (r.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), r.classList.remove("launcher-locate-highlight"), r.offsetWidth, r.classList.add("launcher-locate-highlight"), setTimeout(() => {
        r.classList.remove("launcher-locate-highlight");
      }, 3200));
    }, 120), !0;
  },
  render() {
    const e = l.getState(), t = l.getPageNames();
    z.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), be();
  },
  start() {
    R || (R = !0, z.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: ye,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, n) => this.openFolderMenu(e, n, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), P.setActionHandler((e, t) => {
      e === "close" ? P.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), W = l.subscribe(() => {
      this.render();
    }), G = (e, t) => {
      if (t !== "local") return;
      const n = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, i = {};
      for (const [c, r] of Object.entries(n)) {
        if (!(c in e)) continue;
        const m = e[c].newValue;
        i[r] = r === "links" ? Array.isArray(m) ? m : [] : r === "pages" ? Array.isArray(m) && m.length ? m : ["常用网站"] : r === "activePage" ? m || "常用网站" : m || {};
      }
      Object.keys(i).length && (l.updateState(i), this.render());
    }, X().chrome?.storage?.onChanged?.addListener(G));
  },
  init() {
    return this.start(), q || (q = (async () => {
      await l.ready;
      const e = X().chrome;
      if (!R) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      R && (t.quickLinksReady || await e?.storage?.local?.set({ quickLinksReady: !0 }), R && this.render());
    })().catch((e) => {
      throw q = void 0, e;
    }), q);
  },
  stop() {
    R = !1, W?.(), W = void 0, G && X().chrome?.storage?.onChanged?.removeListener(G), G = void 0, P.setActionHandler(null), z.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, J = {
  nodeId: "",
  url: "",
  timestamp: 0
};
function We(e, t) {
  J.nodeId = e || "", J.url = t || "", J.timestamp = Date.now(), window.dispatchEvent(new CustomEvent("logicweaver:locate-bookmark", {
    detail: { nodeId: e, url: t }
  }));
}
const Je = ["title", "aria-label"], Ze = ["src"], et = {
  key: 1,
  "aria-hidden": "true"
}, tt = ["placeholder", "value"], nt = ["title"], st = ["title", "aria-label"], it = ["title"], ot = { class: "gh-search-rule-icon" }, lt = ["title", "aria-label"], at = ["title", "aria-label"], rt = ["title", "aria-label", "hidden"], ut = ["hidden"], ct = ["onClick", "onContextmenu", "onMouseenter"], dt = ["src"], gt = { class: "search-suggestion-main" }, ft = { class: "search-suggestion-title" }, pt = {
  key: 0,
  class: "search-suggestion-meta"
}, ht = ["title", "onClick"], vt = {
  key: 0,
  class: "badge-icon"
}, mt = { class: "search-suggestion-menu-header" }, kt = { key: 0 }, bt = /* @__PURE__ */ Ne({
  __name: "SearchBox",
  setup(e) {
    const t = E(() => a.mode === "web" ? g("search.web.placeholder") : a.mode === "bilibili" ? g("search.bilibili.placeholder") : a.mode === "github" ? g("search.github.placeholder") : a.mode === "netease" ? g("search.netease.placeholder") : a.mode === "qcc" ? g("search.qcc.placeholder") : a.placeholder), n = I(ge.searchRule || "exact"), i = E(() => a.hasQuery ? /^\/bm[\s:]/i.test(a.query.trim()) ? g("search.status.bookmarks") : /^\/sites[\s:]/i.test(a.query.trim()) ? g("search.status.sites") : g("search.status.all") : g("search.status.history")), c = E(() => [
      { id: "exact", icon: "🎯", name: g("search.rule.exact"), desc: g("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: g("search.rule.fuzzy"), desc: g("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: g("search.rule.topic"), desc: g("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: g("search.rule.smart"), desc: g("search.rule.smartDesc") }
    ]), r = E(() => c.value.find((s) => s.id === n.value) || c.value[0]);
    function m(s) {
      s.preventDefault(), s.stopPropagation();
      const u = ge.cycleSearchRule();
      n.value = u, M.update({
        placeholder: g("search.placeholder.gh", { rule: r.value.name })
      }), a.query && x.scheduleSuggestions(a.query);
    }
    const U = E(() => a.mode === "netease" && a.isSuggestionsVisible && a.suggestions.length > 0), T = E(() => a.mode === "bilibili" && a.isSuggestionsVisible && a.suggestions.length > 0), ee = E(() => a.mode === "qcc" && a.isSuggestionsVisible && a.suggestions.length > 0);
    function we(s) {
      s.preventDefault(), ee.value ? M.setSuggestionsVisible(!1) : (a.query && M.setQuery(""), x.loadQccRecommendations(!0));
    }
    function Le(s) {
      s.preventDefault(), M.cycleMode();
    }
    function Se(s) {
      const u = s.target;
      M.setQuery(u.value);
    }
    function De(s) {
      s.preventDefault(), M.clear();
    }
    function te() {
      M.submit();
    }
    function _e() {
      x.handleFocus();
    }
    function Ee() {
      a.isSuggestionsVisible || x.handleFocus();
    }
    function Fe(s) {
      s.preventDefault(), U.value ? M.setSuggestionsVisible(!1) : (a.query && M.setQuery(""), x.loadNeteaseRecentRecommendations(!0));
    }
    function Pe(s) {
      s.preventDefault(), T.value ? M.setSuggestionsVisible(!1) : (a.query && M.setQuery(""), x.loadBilibiliRecommendations(!0));
    }
    const ne = I(null), w = I(-1);
    re(() => a.suggestions, () => {
      w.value = -1;
    }), re(() => a.isSuggestionsVisible, (s) => {
      s || (w.value = -1);
    });
    function Oe(s) {
      if (!a.isSuggestionsVisible || !a.suggestions.length) {
        s.key === "Enter" && te();
        return;
      }
      s.key === "ArrowDown" ? (s.preventDefault(), w.value < a.suggestions.length - 1 ? w.value++ : w.value = 0, se()) : s.key === "ArrowUp" ? (s.preventDefault(), w.value > 0 ? w.value-- : w.value = a.suggestions.length - 1, se()) : s.key === "Enter" ? w.value >= 0 && w.value < a.suggestions.length ? (s.preventDefault(), $(a.suggestions[w.value])) : te() : s.key === "Escape" && M.setSuggestionsVisible(!1);
    }
    function se() {
      const s = document.getElementById("search-suggestions");
      if (!s) return;
      const p = s.querySelectorAll(".search-suggestion")[w.value];
      p && p.scrollIntoView({ block: "nearest" });
    }
    const L = I(null), O = I(!1), ie = I({ x: 0, y: 0 }), { menuRef: xe, style: Ce } = Ue({
      visible: () => O.value,
      anchor: () => ie.value,
      dismiss: () => {
        O.value = !1;
      }
    });
    function Ae(s, u) {
      u.preventDefault(), u.stopPropagation(), L.value = s, ie.value = { x: u.clientX, y: u.clientY }, O.value = !0;
    }
    const Te = E(() => L.value ? L.value.launcherLinkId ? !0 : L.value.url ? (l.getState().links || []).some((u) => u.url === L.value?.url) : !1 : !1), Be = E(() => L.value ? !!(L.value.bookmarkId || L.value.badge?.text?.includes("书签")) : !1);
    async function oe(s) {
      const u = s && "id" in s ? s : L.value;
      O.value = !1, u && (M.setSuggestionsVisible(!1), z.setSitesView("bookmarks"), We(u.bookmarkId, u.url));
    }
    async function le(s) {
      const u = s && "id" in s ? s : L.value;
      if (O.value = !1, !u) return;
      let p = u.launcherLinkId;
      if (!p && u.url) {
        const H = l.getState().links.find((B) => B.url === u.url);
        H && (p = String(H.id));
      }
      p && (z.setSitesView("sites"), M.setSuggestionsVisible(!1), await Xe.locateLink(p));
    }
    function Ie(s) {
      s.launcherLinkId || s.badge?.text?.includes("常用网站") ? le(s) : s.bookmarkId || s.badge?.text?.includes("书签") ? oe(s) : $(s);
    }
    function $(s) {
      O.value = !1, M.onSuggestionClick(s);
    }
    function ae(s) {
      s.target?.closest("#search") || M.setSuggestionsVisible(!1);
    }
    return Re(() => {
      document.addEventListener("click", ae), M.setFocusAction(() => {
        ne.value?.focus(), x.handleFocus();
      }), ze();
    }), Ve(() => {
      document.removeEventListener("click", ae);
    }), (s, u) => (k(), b(ue, null, [
      v("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: d(a).toggleTitle,
        "aria-label": d(a).toggleAriaLabel,
        style: ce(d(a).modeColor ? { color: d(a).modeColor } : {}),
        onClick: Le
      }, [
        d(a).modeIconSrc ? (k(), b("img", {
          key: 0,
          src: d(a).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, Ze)) : (k(), b("span", et, D(d(a).modeIconText || "⌕"), 1))
      ], 12, Je),
      v("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: ne,
        placeholder: t.value,
        value: d(a).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: Se,
        onFocus: _e,
        onClick: Ee,
        onKeydown: Oe
      }, null, 40, tt),
      d(a).mode === "web" ? (k(), b("span", {
        key: 0,
        class: "search-web-status",
        title: d(a).hasQuery ? d(g)("search.webStatus.query") : d(g)("search.webStatus.idle")
      }, D(i.value), 9, nt)) : _("", !0),
      d(a).mode === "netease" ? (k(), b("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: N(["search-history-btn", { active: U.value }]),
        type: "button",
        title: d(g)("search.historyBtnTip"),
        "aria-label": d(g)("search.historyBtn"),
        onClick: Fe
      }, [
        u[5] || (u[5] = v("svg", {
          class: "search-history-icon",
          viewBox: "0 0 24 24",
          width: "13",
          height: "13",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          v("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          v("polyline", { points: "12 6 12 12 16 14" })
        ], -1)),
        v("span", null, D(d(g)("search.historyBtn")), 1)
      ], 10, st)) : _("", !0),
      d(a).mode === "github" ? (k(), b("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: N(["search-history-btn search-gh-rule-btn", `rule-${r.value.id}`]),
        type: "button",
        title: `当前匹配规则：${r.value.name}（${r.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: m
      }, [
        v("span", ot, D(r.value.icon), 1),
        v("span", null, D(r.value.name), 1)
      ], 10, it)) : _("", !0),
      d(a).mode === "bilibili" ? (k(), b("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: N(["search-history-btn search-bili-btn", { active: T.value }]),
        type: "button",
        title: d(g)("search.biliRecBtnTip"),
        "aria-label": d(g)("search.biliRecBtn"),
        onClick: Pe
      }, [
        u[6] || (u[6] = v("svg", {
          class: "search-history-icon",
          viewBox: "0 0 24 24",
          width: "13",
          height: "13",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          v("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
        ], -1)),
        v("span", null, D(d(g)("search.biliRecBtn")), 1)
      ], 10, lt)) : _("", !0),
      d(a).mode === "qcc" ? (k(), b("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: N(["search-history-btn search-qcc-btn", { active: ee.value }]),
        type: "button",
        title: d(g)("search.qccTipsBtnTip"),
        "aria-label": d(g)("search.qccTipsAria"),
        onClick: we
      }, [
        u[7] || (u[7] = v("span", { class: "gh-search-rule-icon" }, "🏢", -1)),
        v("span", null, D(d(g)("search.qccTipsBtn")), 1)
      ], 10, at)) : _("", !0),
      v("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: d(g)("search.clearBtnTip"),
        "aria-label": d(g)("search.clearBtnTip"),
        hidden: !d(a).hasQuery,
        onClick: De
      }, " ✕ ", 8, rt),
      v("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !d(a).isSuggestionsVisible || !d(a).suggestions.length
      }, [
        (k(!0), b(ue, null, He(d(a).suggestions, (p, H) => (k(), b("button", {
          key: p.id,
          class: N(["search-suggestion", { "is-selected": H === w.value }]),
          type: "button",
          role: "option",
          onClick: (B) => $(p),
          onContextmenu: (B) => Ae(p, B),
          onMouseenter: (B) => w.value = H
        }, [
          p.iconSrc ? (k(), b("img", {
            key: 0,
            src: p.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, dt)) : _("", !0),
          v("span", gt, [
            v("span", ft, D(p.title), 1),
            p.meta ? (k(), b("span", pt, D(p.meta), 1)) : _("", !0)
          ]),
          p.badge ? (k(), b("span", {
            key: 1,
            class: N(["search-suggestion-badge", p.badge.className, "is-clickable"]),
            title: p.badge.title || (p.launcherLinkId || p.badge.text && p.badge.text.includes("常用网站") ? "点击直接定位到常用网站位置" : "点击直接定位到书签位置"),
            onClick: j((B) => Ie(p), ["stop"])
          }, [
            p.badge.icon ? (k(), b("i", vt, D(p.badge.icon), 1)) : _("", !0),
            v("span", null, D(p.badge.text), 1)
          ], 10, ht)) : _("", !0)
        ], 42, ct))), 128))
      ], 8, ut),
      (k(), qe(Ge, { to: "body" }, [
        O.value ? (k(), b("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: xe,
          class: "folder-menu search-suggestion-context-menu",
          role: "menu",
          style: ce(d(Ce)),
          onPointerdown: u[3] || (u[3] = j(() => {
          }, ["stop"])),
          onContextmenu: u[4] || (u[4] = j(() => {
          }, ["prevent", "stop"]))
        }, [
          v("div", mt, [
            v("strong", null, D(L.value?.title), 1),
            L.value?.url ? (k(), b("small", kt, D(L.value?.url), 1)) : _("", !0)
          ]),
          Te.value ? (k(), b("button", {
            key: 0,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-btn",
            onClick: u[0] || (u[0] = (p) => le())
          }, [...u[8] || (u[8] = [
            v("span", null, "🎯 定位到常用网站", -1)
          ])])) : _("", !0),
          Be.value ? (k(), b("button", {
            key: 1,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-bookmark-btn",
            onClick: u[1] || (u[1] = (p) => oe())
          }, [...u[9] || (u[9] = [
            v("span", null, "🔖 定位到书签", -1)
          ])])) : _("", !0),
          v("button", {
            type: "button",
            class: "search-suggestion-menu-btn",
            onClick: u[2] || (u[2] = (p) => $(L.value))
          }, [...u[10] || (u[10] = [
            v("span", null, "🔗 打开此网页", -1)
          ])])
        ], 36)) : _("", !0)
      ]))
    ], 64));
  }
}), Dt = /* @__PURE__ */ $e(bt, [["__scopeId", "data-v-8d1b30be"]]);
export {
  Dt as S,
  z as a,
  Me as b,
  P as c,
  V as d,
  f as e,
  h as f,
  Qe as g,
  F as h,
  St as i,
  Xe as l,
  y as m,
  J as p
};
