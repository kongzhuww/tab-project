import { r as $, a as j, d as Ne, b as A, w as te, o as Ve, e as He, f as k, g as b, F as ce, h as m, n as de, u as d, t as D, j as _, q as R, i as qe, l as Ge, k as K, T as ze, s as E } from "./vendor-vue-C-_ocEUS.js";
import { t as g, i as Ue, _ as $e } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { l, o as ge, s as M, d as C, y as a } from "./search.service-gzbpg5BD.js";
import { m as fe, w as je } from "./github.service-BkChs4sP.js";
import { a as T } from "./read-session-Bth5Co7m.js";
import { u as Qe } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-Bk2ztKZ7.js";
import "./window-manager.store-BoJtJrk7.js";
function pe(e) {
  const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
  return t ? !!t.closest("input, textarea") || t instanceof HTMLElement && t.isContentEditable : !1;
}
function Ot() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (e) => {
    pe(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (e) => {
    pe(e.target) || e.preventDefault();
  }));
}
const h = $({
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
let he = null;
const P = {
  get state() {
    return h;
  },
  getSnapshot() {
    return j(h);
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
    he = e;
  },
  dispatch(e, t) {
    he?.(e, t);
  }
}, Ye = $({
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
}), o = Ye;
let x = null, W = null, me = "";
const ye = {
  state: o,
  updateState(e) {
    Object.assign(o, e);
  },
  setMounted(e) {
    o.mounted = e;
  },
  onAction(e) {
    W = e;
  },
  dispatch(e, t, n) {
    if (W)
      return W(e, t, n);
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
      console.warn("[Launcher] 保存网站失败", e), T.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },
  async deleteFromEditDialog() {
    try {
      o.editDialog.id && await l.deleteLink(o.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), T.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, t, n, s, c = "") {
    me = c, o.linkMove.isOpen = !0, o.linkMove.linkTitle = e, o.linkMove.pages = [...t], o.linkMove.folders = [...n], o.linkMove.targetPageId = s || (t[0]?.id ?? ""), o.linkMove.targetFolderId = "", o.linkMove.showFolderSelect = n.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    o.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = l.getState().links.find((t) => t.id === me);
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
    o.folderDelete.isOpen = !0, o.folderDelete.groupName = e.groupName, o.folderDelete.count = e.count, o.folderDelete.hint = e.hint || "", x = {
      onRelease: e.onRelease,
      onDeleteAll: e.onDeleteAll,
      onCancel: e.onCancel
    }, this.dispatch("folder-delete", "open", { groupName: e.groupName, count: e.count });
  },
  closeFolderDeleteDialog() {
    o.folderDelete.isOpen = !1;
    const e = x?.onCancel;
    x = null, e?.(), this.dispatch("folder-delete", "close");
  },
  async releaseFolderDelete() {
    o.folderDelete.isOpen = !1;
    const e = x?.onRelease;
    x = null, e && await e(), this.dispatch("folder-delete", "release");
  },
  async deleteAllFolderDelete() {
    o.folderDelete.isOpen = !1;
    const e = x?.onDeleteAll;
    x = null, e && await e(), this.dispatch("folder-delete", "delete-all");
  }
};
function we(e) {
  if (!e) return;
  const t = l.getState().links.filter((v) => (v.group || "常用网站") === e), n = l.getState().folders || {}, s = Object.values(n).some((v) => v?.parent === e), c = t.length;
  if (c === 0 && !s) {
    l.deleteGroup(e, "purge");
    return;
  }
  const r = t.slice(0, 4).map((v) => v.title || "未命名").join("、");
  ye.openFolderDeleteDialog({
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
async function Ke(e, t) {
  const n = t?.group;
  if (e === "folder:rename" && n) {
    const s = (await T.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${n}」的新名称：`,
      defaultValue: n
    }))?.trim();
    s && s !== n && await l.renameGroup(n, s);
  } else if (e === "folder:toggle-size" && n)
    await l.toggleGroupSize(n);
  else if (e === "folder:move" && n && t?.page)
    await l.moveFolderToPage(n, t.page);
  else if (e === "folder:delete" && n)
    we(n);
  else if (e === "page:delete" && t?.page) {
    if (l.getPageNames().length <= 1) {
      await T.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await T.confirm({
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
    const s = l.getState().links.find((c) => String(c.id) === String(t.link.id));
    if (!s) return;
    if (e === "link:rename") {
      const c = (await T.prompt({
        title: "重命名网站",
        message: `请输入网站「${s.title}」的新名称：`,
        defaultValue: s.title
      }))?.trim();
      c && c !== s.title && await l.saveLink({ ...s, title: c });
    } else e === "link:create-large-folder" || (e === "link:move" && t.page ? await l.moveLinkTo(s.id, t.page, s.group || "常用网站") : e === "link:move-out" ? await l.moveLinkTo(s.id, s.page, "常用网站") : e === "link:delete" && await l.deleteLink(s.id));
  }
}
const ve = {
  activeMenu: "none",
  confirmingDelete: "none",
  flyoutOpen: !1
};
class We {
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
const F = new We(), y = $({
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
    return j(y);
  },
  setMounted(e) {
    y.mounted = e;
  },
  closeAll() {
    F.send({ type: "CLOSE_ALL" }), this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, t, n, s, c) {
    this.closeAll(), F.send({ type: "OPEN_FOLDER_MENU" }), y.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: t,
      canMove: n.length > 0,
      pages: [...n],
      x: Math.max(8, Math.min(window.innerWidth - 220, s)),
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
  openLinkMenu(e, t, n, s) {
    this.closeAll(), F.send({ type: "OPEN_LINK_MENU" }), y.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...t],
      x: Math.max(8, Math.min(window.innerWidth - 220, n)),
      y: Math.max(8, Math.min(window.innerHeight - 280, s)),
      flyoutOpen: !1
    };
  },
  closeLinkMenu() {
    y.linkMenu.isOpen = !1, y.linkMenu.link = null, y.linkMenu.flyoutOpen = !1;
  },
  setLinkFlyoutOpen(e) {
    F.send({ type: "SET_FLYOUT", open: e }), y.linkMenu.flyoutOpen = e;
  },
  openPageMenu(e, t, n, s, c) {
    this.closeAll(), F.send({ type: "OPEN_PAGE_MENU" }), y.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: t,
      canDelete: n,
      x: Math.max(8, Math.min(window.innerWidth - 200, s)),
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
    Ke(e, t).catch((n) => {
      console.warn("[Launcher] 菜单操作失败", n), T.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, Xe = () => ({
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
}), f = $(Xe());
l.subscribe((e) => {
  f.links = [...e.links], f.pages = [...e.pages], f.pageLabels = { ...e.pageLabels }, f.groupSizes = { ...e.groupSizes }, f.folders = { ...e.folders }, f.activePage = e.activePage;
});
let L = {}, ke = null, X = null;
const U = {
  getSnapshot() {
    return j(f);
  },
  setExternalDragHandler(e) {
    ke = e;
  },
  setExternalDropHandler(e) {
    X = e;
  },
  handleExternalDragHover(e) {
    ke?.(e);
  },
  async handleExternalDrop(e) {
    return X ? X(e) : !1;
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
    L = { ...L, ...e };
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
    if (L.openFolder) {
      L.openFolder(e, t);
      return;
    }
    const n = f.links.filter((s) => (s.group || "常用网站") === e);
    P.openFolder(e, n), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (L.deleteFolder) {
      L.deleteFolder(e);
      return;
    }
    l.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, t) {
    if (t && typeof t.preventDefault == "function" && t.preventDefault(), L.openLink) {
      L.openLink(e, t);
      return;
    }
    if (e?.url) {
      const n = !!(t && (t.ctrlKey || t.metaKey || t.button === 1));
      let s = !1;
      if (typeof chrome < "u" && chrome.tabs?.create)
        try {
          chrome.tabs.create({ url: e.url, active: !n }), s = !0;
        } catch {
          s = !1;
        }
      s || window.open(e.url, "_blank", "noopener,noreferrer");
    }
  },
  openLinkMenu(e, t) {
    if (L.openLinkMenu) {
      L.openLinkMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, s = t?.clientY || 0, c = f.pages.map((r) => ({ id: r, name: f.pageLabels[r] || r }));
    V.openLinkMenu(e, c, n, s);
  },
  openFolderMenu(e, t, n) {
    if (L.openFolderMenu) {
      L.openFolderMenu(e, t, n);
      return;
    }
    const s = n?.clientX || 0, c = n?.clientY || 0, v = f.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", Q = f.pages.map((I) => ({ id: I, name: f.pageLabels[I] || I }));
    V.openFolderMenu(e, v, Q, s, c);
  },
  openPageMenu(e, t) {
    if (L.openPageMenu) {
      L.openPageMenu(e, t);
      return;
    }
    const n = t?.clientX || 0, s = t?.clientY || 0, c = f.pageLabels[e] || e, r = f.pages.length > 1;
    V.openPageMenu(e, c, r, n, s);
  }
}, J = () => window;
let N = !1, q, Z, G;
function be(e) {
  return l.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: l.getPageLabel(t) }));
}
function Me() {
  if (!h.isOpen || !h.activeFolder) return;
  const e = l.getState(), t = h.activeFolder;
  P.setLinks(e.links.filter((r) => (r.group || "常用网站") === t));
  const n = /* @__PURE__ */ new Map();
  for (const r of e.links) {
    const v = r.group || "常用网站";
    n.has(v) || n.set(v, []), n.get(v).push(r);
  }
  const s = new Map(Object.keys(e.folders).map((r) => [r, ge(e.folders, r)])), c = /* @__PURE__ */ new Map();
  for (const r of s.values()) r && c.set(r, (c.get(r) || 0) + 1);
  P.setFolders([...s].filter(([, r]) => r === t).map(([r]) => ({
    groupName: r,
    links: n.get(r) || [],
    count: (n.get(r)?.length || 0) + (c.get(r) || 0)
  })), ge(e.folders, t));
}
const Je = {
  openEditor(e) {
    ye.openEditDialog(e || {});
  },
  openFolder(e = h.activeFolder) {
    if (!e) return;
    const n = l.getState().links.filter((s) => (s.group || "常用网站") === e);
    P.openFolder(e, n), Me();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), V.openLinkMenu(e, be(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, n) {
    t?.preventDefault?.();
    const s = l.getState(), c = n || s.activePage;
    V.openFolderMenu(
      e,
      l.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      be(c),
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
    const s = t.group || "常用网站";
    return s !== "常用网站" ? this.openFolder(s) : h.isOpen && P.closeFolder(), setTimeout(() => {
      const c = `[data-launcher-id="${t.id}"]`, r = document.querySelector(c);
      r && (r.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), r.classList.remove("launcher-locate-highlight"), r.offsetWidth, r.classList.add("launcher-locate-highlight"), setTimeout(() => {
        r.classList.remove("launcher-locate-highlight");
      }, 3200));
    }, 120), !0;
  },
  render() {
    const e = l.getState(), t = l.getPageNames();
    U.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), Me();
  },
  start() {
    N || (N = !0, U.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: we,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, n) => this.openFolderMenu(e, n, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), P.setActionHandler((e, t) => {
      e === "close" ? P.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), Z = l.subscribe(() => {
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
      }, s = {};
      for (const [c, r] of Object.entries(n)) {
        if (!(c in e)) continue;
        const v = e[c].newValue;
        s[r] = r === "links" ? Array.isArray(v) ? v : [] : r === "pages" ? Array.isArray(v) && v.length ? v : ["常用网站"] : r === "activePage" ? v || "常用网站" : v || {};
      }
      Object.keys(s).length && (l.updateState(s), this.render());
    }, J().chrome?.storage?.onChanged?.addListener(G));
  },
  init() {
    return this.start(), q || (q = (async () => {
      await l.ready;
      const e = J().chrome;
      if (!N) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      N && (t.quickLinksReady || await e?.storage?.local?.set({ quickLinksReady: !0 }), N && this.render());
    })().catch((e) => {
      throw q = void 0, e;
    }), q);
  },
  stop() {
    N = !1, Z?.(), Z = void 0, G && J().chrome?.storage?.onChanged?.removeListener(G), G = void 0, P.setActionHandler(null), U.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, ee = {
  nodeId: "",
  url: "",
  timestamp: 0
};
function Ze(e, t) {
  ee.nodeId = e || "", ee.url = t || "", ee.timestamp = Date.now(), window.dispatchEvent(new CustomEvent("logicweaver:locate-bookmark", {
    detail: { nodeId: e, url: t }
  }));
}
const et = ["title", "aria-label"], tt = ["src"], nt = {
  key: 1,
  "aria-hidden": "true"
}, st = ["placeholder", "value"], it = ["title"], ot = ["title", "aria-label"], lt = ["title"], at = { class: "gh-search-rule-icon" }, rt = ["title", "aria-label"], ut = ["title", "aria-label"], ct = ["title", "aria-label", "hidden"], dt = ["hidden"], gt = ["onClick", "onContextmenu", "onMouseenter"], ft = ["src", "referrerpolicy"], pt = { class: "search-suggestion-main" }, ht = { class: "search-suggestion-title" }, mt = {
  key: 0,
  class: "search-suggestion-meta"
}, vt = ["title", "onClick"], kt = {
  key: 0,
  class: "badge-icon"
}, bt = { class: "search-suggestion-menu-header" }, Mt = { key: 0 }, yt = /* @__PURE__ */ Ne({
  __name: "SearchBox",
  setup(e) {
    const t = E(() => a.mode === "web" ? g("search.web.placeholder") : a.mode === "bilibili" ? g("search.bilibili.placeholder") : a.mode === "github" ? g("search.github.placeholder") : a.mode === "netease" ? g("search.netease.placeholder") : a.mode === "qcc" ? g("search.qcc.placeholder") : a.placeholder), n = A(fe.searchRule || "exact"), s = E(() => a.hasQuery ? /^\/bm[\s:]/i.test(a.query.trim()) ? g("search.status.bookmarks") : /^\/sites[\s:]/i.test(a.query.trim()) ? g("search.status.sites") : g("search.status.all") : g("search.status.history")), c = E(() => [
      { id: "exact", icon: "🎯", name: g("search.rule.exact"), desc: g("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: g("search.rule.fuzzy"), desc: g("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: g("search.rule.topic"), desc: g("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: g("search.rule.smart"), desc: g("search.rule.smartDesc") }
    ]), r = E(() => c.value.find((i) => i.id === n.value) || c.value[0]);
    function v(i) {
      i.preventDefault(), i.stopPropagation();
      const u = fe.cycleSearchRule();
      n.value = u, M.update({
        placeholder: g("search.placeholder.gh", { rule: r.value.name })
      }), a.query && C.scheduleSuggestions(a.query);
    }
    const Q = E(() => a.mode === "netease" && a.isSuggestionsVisible && a.suggestions.length > 0), I = E(() => a.mode === "bilibili" && a.isSuggestionsVisible && a.suggestions.length > 0), ne = E(() => a.mode === "qcc" && a.isSuggestionsVisible && a.suggestions.length > 0);
    function Se(i) {
      i.preventDefault(), ne.value ? M.setSuggestionsVisible(!1) : (a.query && M.setQuery(""), C.loadQccRecommendations(!0));
    }
    function Le(i) {
      i.preventDefault(), M.cycleMode();
    }
    function De(i) {
      const u = i.target;
      M.setQuery(u.value);
    }
    function _e(i) {
      i.preventDefault(), M.clear();
    }
    function se() {
      M.submit();
    }
    function Ee() {
      C.handleFocus();
    }
    function Fe() {
      a.isSuggestionsVisible || C.handleFocus();
    }
    function Pe(i) {
      i.preventDefault(), Q.value ? M.setSuggestionsVisible(!1) : (a.query && M.setQuery(""), C.loadNeteaseRecentRecommendations(!0));
    }
    function Oe(i) {
      i.preventDefault(), I.value ? M.setSuggestionsVisible(!1) : (a.query && M.setQuery(""), C.loadBilibiliRecommendations(!0));
    }
    const ie = A(null), w = A(-1);
    te(() => a.suggestions, () => {
      w.value = -1;
    }), te(() => a.isSuggestionsVisible, (i) => {
      i || (w.value = -1);
    });
    function Ce(i) {
      if (!Ue(i)) {
        if (!a.isSuggestionsVisible || !a.suggestions.length) {
          i.key === "Enter" && se();
          return;
        }
        i.key === "ArrowDown" ? (i.preventDefault(), w.value < a.suggestions.length - 1 ? w.value++ : w.value = 0, oe()) : i.key === "ArrowUp" ? (i.preventDefault(), w.value > 0 ? w.value-- : w.value = a.suggestions.length - 1, oe()) : i.key === "Enter" ? w.value >= 0 && w.value < a.suggestions.length ? (i.preventDefault(), Y(a.suggestions[w.value])) : se() : i.key === "Escape" && M.setSuggestionsVisible(!1);
      }
    }
    function oe() {
      const i = document.getElementById("search-suggestions");
      if (!i) return;
      const p = i.querySelectorAll(".search-suggestion")[w.value];
      p && p.scrollIntoView({ block: "nearest" });
    }
    const S = A(null), O = A(!1), le = A({ x: 0, y: 0 }), { menuRef: xe, style: Ae } = Qe({
      visible: () => O.value,
      anchor: () => le.value,
      dismiss: () => {
        O.value = !1;
      }
    });
    function Te(i, u) {
      u.preventDefault(), u.stopPropagation(), S.value = i, le.value = { x: u.clientX, y: u.clientY }, O.value = !0;
    }
    const Ie = E(() => S.value ? S.value.launcherLinkId ? !0 : S.value.url ? (l.getState().links || []).some((u) => u.url === S.value?.url) : !1 : !1), Be = E(() => S.value ? !!(S.value.bookmarkId || S.value.badge?.text?.includes("书签")) : !1);
    async function ae(i) {
      const u = i && "id" in i ? i : S.value;
      O.value = !1, u && (M.setSuggestionsVisible(!1), U.setSitesView("bookmarks"), Ze(u.bookmarkId, u.url));
    }
    async function re(i) {
      const u = i && "id" in i ? i : S.value;
      if (O.value = !1, !u) return;
      let p = u.launcherLinkId;
      if (!p && u.url) {
        const H = l.getState().links.find((B) => B.url === u.url);
        H && (p = String(H.id));
      }
      p && (U.setSitesView("sites"), M.setSuggestionsVisible(!1), await Je.locateLink(p));
    }
    function Re(i) {
      i.launcherLinkId || i.badge?.text?.includes("常用网站") ? re(i) : i.bookmarkId || i.badge?.text?.includes("书签") ? ae(i) : Y(i);
    }
    function Y(i) {
      O.value = !1, M.onSuggestionClick(i);
    }
    function ue(i) {
      i.target?.closest("#search") || M.setSuggestionsVisible(!1);
    }
    return Ve(() => {
      document.addEventListener("click", ue), M.setFocusAction(() => {
        ie.value?.focus(), C.handleFocus();
      }), je();
    }), He(() => {
      document.removeEventListener("click", ue);
    }), (i, u) => (k(), b(ce, null, [
      m("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: d(a).toggleTitle,
        "aria-label": d(a).toggleAriaLabel,
        style: de(d(a).modeColor ? { color: d(a).modeColor } : {}),
        onClick: Le
      }, [
        d(a).modeIconSrc ? (k(), b("img", {
          key: 0,
          src: d(a).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, tt)) : (k(), b("span", nt, D(d(a).modeIconText || "⌕"), 1))
      ], 12, et),
      m("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: ie,
        placeholder: t.value,
        value: d(a).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: De,
        onFocus: Ee,
        onClick: Fe,
        onKeydown: Ce
      }, null, 40, st),
      d(a).mode === "web" ? (k(), b("span", {
        key: 0,
        class: "search-web-status",
        title: d(a).hasQuery ? d(g)("search.webStatus.query") : d(g)("search.webStatus.idle")
      }, D(s.value), 9, it)) : _("", !0),
      d(a).mode === "netease" ? (k(), b("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: R(["search-history-btn", { active: Q.value }]),
        type: "button",
        title: d(g)("search.historyBtnTip"),
        "aria-label": d(g)("search.historyBtn"),
        onClick: Pe
      }, [
        u[5] || (u[5] = m("svg", {
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
          m("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          m("polyline", { points: "12 6 12 12 16 14" })
        ], -1)),
        m("span", null, D(d(g)("search.historyBtn")), 1)
      ], 10, ot)) : _("", !0),
      d(a).mode === "github" ? (k(), b("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: R(["search-history-btn search-gh-rule-btn", `rule-${r.value.id}`]),
        type: "button",
        title: `当前匹配规则：${r.value.name}（${r.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: v
      }, [
        m("span", at, D(r.value.icon), 1),
        m("span", null, D(r.value.name), 1)
      ], 10, lt)) : _("", !0),
      d(a).mode === "bilibili" ? (k(), b("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: R(["search-history-btn search-bili-btn", { active: I.value }]),
        type: "button",
        title: d(g)("search.biliRecBtnTip"),
        "aria-label": d(g)("search.biliRecBtn"),
        onClick: Oe
      }, [
        u[6] || (u[6] = m("svg", {
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
          m("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
        ], -1)),
        m("span", null, D(d(g)("search.biliRecBtn")), 1)
      ], 10, rt)) : _("", !0),
      d(a).mode === "qcc" ? (k(), b("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: R(["search-history-btn search-qcc-btn", { active: ne.value }]),
        type: "button",
        title: d(g)("search.qccTipsBtnTip"),
        "aria-label": d(g)("search.qccTipsAria"),
        onClick: Se
      }, [
        u[7] || (u[7] = m("span", { class: "gh-search-rule-icon" }, "🏢", -1)),
        m("span", null, D(d(g)("search.qccTipsBtn")), 1)
      ], 10, ut)) : _("", !0),
      m("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: d(g)("search.clearBtnTip"),
        "aria-label": d(g)("search.clearBtnTip"),
        hidden: !d(a).hasQuery,
        onClick: _e
      }, " ✕ ", 8, ct),
      m("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !d(a).isSuggestionsVisible || !d(a).suggestions.length
      }, [
        (k(!0), b(ce, null, qe(d(a).suggestions, (p, H) => (k(), b("button", {
          key: p.id,
          class: R(["search-suggestion", { "is-selected": H === w.value }]),
          type: "button",
          role: "option",
          onClick: (B) => Y(p),
          onContextmenu: (B) => Te(p, B),
          onMouseenter: (B) => w.value = H
        }, [
          p.iconSrc ? (k(), b("img", {
            key: 0,
            src: p.iconSrc,
            referrerpolicy: p.badge?.className === "badge-bilibili" ? "no-referrer" : void 0,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, ft)) : _("", !0),
          m("span", pt, [
            m("span", ht, D(p.title), 1),
            p.meta ? (k(), b("span", mt, D(p.meta), 1)) : _("", !0)
          ]),
          p.badge ? (k(), b("span", {
            key: 1,
            class: R(["search-suggestion-badge", p.badge.className, "is-clickable"]),
            title: p.badge.title || (p.launcherLinkId || p.badge.text && p.badge.text.includes("常用网站") ? "点击直接定位到常用网站位置" : "点击直接定位到书签位置"),
            onClick: K((B) => Re(p), ["stop"])
          }, [
            p.badge.icon ? (k(), b("i", kt, D(p.badge.icon), 1)) : _("", !0),
            m("span", null, D(p.badge.text), 1)
          ], 10, vt)) : _("", !0)
        ], 42, gt))), 128))
      ], 8, dt),
      (k(), Ge(ze, { to: "body" }, [
        O.value ? (k(), b("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: xe,
          class: "folder-menu search-suggestion-context-menu",
          role: "menu",
          style: de(d(Ae)),
          onPointerdown: u[3] || (u[3] = K(() => {
          }, ["stop"])),
          onContextmenu: u[4] || (u[4] = K(() => {
          }, ["prevent", "stop"]))
        }, [
          m("div", bt, [
            m("strong", null, D(S.value?.title), 1),
            S.value?.url ? (k(), b("small", Mt, D(S.value?.url), 1)) : _("", !0)
          ]),
          Ie.value ? (k(), b("button", {
            key: 0,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-btn",
            onClick: u[0] || (u[0] = (p) => re())
          }, [...u[8] || (u[8] = [
            m("span", null, "🎯 定位到常用网站", -1)
          ])])) : _("", !0),
          Be.value ? (k(), b("button", {
            key: 1,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-bookmark-btn",
            onClick: u[1] || (u[1] = (p) => ae())
          }, [...u[9] || (u[9] = [
            m("span", null, "🔖 定位到书签", -1)
          ])])) : _("", !0),
          m("button", {
            type: "button",
            class: "search-suggestion-menu-btn",
            onClick: u[2] || (u[2] = (p) => Y(S.value))
          }, [...u[10] || (u[10] = [
            m("span", null, "🔗 打开此网页", -1)
          ])])
        ], 36)) : _("", !0)
      ]))
    ], 64));
  }
}), Ct = /* @__PURE__ */ $e(yt, [["__scopeId", "data-v-fe3dc07c"]]);
function xt(e, t) {
  const n = A(!1);
  return te(
    e,
    (s) => {
      s && (n.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), j(n);
}
const z = $({
  isOpen: !1
}), wt = {
  open() {
    z.isOpen = !0;
  },
  close() {
    z.isOpen = !1;
  },
  toggle() {
    z.isOpen = !z.isOpen;
  }
}, At = j(z);
function Tt() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const n = (s, c, r) => {
    c.id !== chrome.runtime.id || s?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || s.targetTabId !== t || (wt.toggle(), r({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((s) => {
    e || (t = s?.id, chrome.runtime.onMessage.addListener(n));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(n);
  };
}
export {
  Ct as S,
  U as a,
  ye as b,
  P as c,
  V as d,
  f as e,
  h as f,
  Tt as g,
  Ye as h,
  Ot as i,
  wt as j,
  F as k,
  Je as l,
  y as m,
  ee as p,
  At as s,
  xt as u
};
