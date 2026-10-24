import { l as s, w as $ } from "./search.service-CJV_B19X.js";
import { r as L, e as x } from "./vendor-vue-BUkfvXUI.js";
import { d as h } from "./read-session-CysyqM5X.js";
const a = L({
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
let I = null;
const A = {
  get state() {
    return a;
  },
  getSnapshot() {
    return x(a);
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
    I = e;
  },
  dispatch(e, t) {
    I?.(e, t);
  }
}, H = {
  学习通: ["chaoxing", "book", "education", "school"],
  学习: ["study", "learn", "book", "education"],
  课程: ["course", "education", "class"],
  知乎: ["zhihu", "question", "help"],
  哔哩哔哩: ["bilibili", "video", "play"],
  b站: ["bilibili", "video", "play"],
  网易云音乐: ["netease", "music"],
  qq音乐: ["qq-music", "music"],
  音乐: ["music", "audio", "sound", "headphones"],
  视频: ["video", "film", "movie", "player"],
  微信: ["wechat", "message", "chat"],
  微博: ["weibo", "social", "share"],
  百度网盘: ["baidu", "cloud", "download", "storage"],
  网盘: ["cloud", "storage", "drive", "folder"],
  邮箱: ["email", "mail", "inbox"],
  邮件: ["email", "mail", "inbox"],
  搜索: ["search", "magnify", "find"],
  游戏: ["game", "gamepad", "controller"],
  代码: ["code", "github", "terminal", "branch"],
  购物: ["shopping", "cart", "store", "bag"],
  商城: ["shop", "store", "market", "bag"],
  笔记: ["note", "edit", "pen", "notebook"],
  地图: ["map", "location", "pin", "navigation"],
  工具: ["tool", "wrench", "settings"]
};
async function E(e, t) {
  const o = new AbortController(), n = setTimeout(() => o.abort(), t);
  try {
    const l = await fetch(e, { signal: o.signal });
    return l.ok ? await l.json() : null;
  } finally {
    clearTimeout(n);
  }
}
async function U(e, t, o) {
  const n = String(e || "").trim();
  let l = "";
  try {
    const u = new URL(t);
    (u.protocol === "https:" || u.protocol === "http:") && (l = u.hostname);
  } catch {
  }
  const c = [], M = /* @__PURE__ */ new Set(), f = (u) => {
    !u.url || M.has(u.url) || (M.add(u.url), c.push(u));
  }, k = () => {
    c.length && o?.([...c]);
  }, D = [];
  if (n && D.push((async () => {
    try {
      const u = await E(`https://itunes.apple.com/search?term=${encodeURIComponent(n)}&entity=software&limit=6&country=cn`, 2800);
      for (const p of u?.results || []) {
        const w = p.artworkUrl512 || p.artworkUrl100 || p.artworkUrl60;
        w && f({ title: p.trackName || n, url: w, source: "appstore", sourceLabel: "官方App" });
      }
      k();
    } catch {
    }
  })()), l) {
    const u = l.split("."), p = u.length > 2 ? u.slice(-2).join(".") : l;
    f({ title: `${n || l} 官方高清Favicon`, url: `https://www.google.com/s2/favicons?domain=${l}&sz=128`, source: "official", sourceLabel: "Favicon 128px" }), f({ title: `${n || l} 官方Logo`, url: `https://icon.horse/icon/${l}`, source: "official", sourceLabel: "IconHorse" }), p !== l && f({ title: `${p} 主站图标`, url: `https://icon.horse/icon/${p}`, source: "official", sourceLabel: "主站Favicon" }), f({ title: `${n || l} 品牌综合Logo`, url: `https://unavatar.io/${l}`, source: "official", sourceLabel: "Unavatar" }), k();
  }
  return n && D.push((async () => {
    try {
      const u = [n, ...H[n.toLowerCase()] || []], p = await E(`https://api.iconify.design/search?query=${encodeURIComponent(u.slice(0, 3).join(" "))}&limit=16`, 2500);
      for (const w of p?.icons || []) {
        const P = String(w).split(":");
        P.length === 2 && f({ title: P[1], url: `https://api.iconify.design/${P[0]}/${P[1]}.svg?color=%23333`, source: "iconify", sourceLabel: "矢量图标" });
      }
      k();
    } catch {
    }
  })()), await Promise.allSettled(D), c;
}
const z = L({
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
  iconPicker: {
    isOpen: !1,
    query: "",
    targetUrl: "",
    targetId: "",
    results: [],
    currentPage: 1,
    pageSize: 8,
    totalPages: 1,
    selectedIconUrl: "",
    isSaving: !1,
    session: 0,
    previewTargetTitle: "",
    customUrl: "",
    isCustomPanelOpen: !1,
    isLoading: !1
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
}), i = z;
let m = null, y = null, v = 0, b, T = "";
const S = {
  state: i,
  updateState(e) {
    Object.assign(i, e);
  },
  setMounted(e) {
    i.mounted = e;
  },
  onAction(e) {
    y = e;
  },
  dispatch(e, t, o) {
    if (y)
      return y(e, t, o);
  },
  // --- 1. 编辑/添加弹窗 ---
  openEditDialog(e) {
    i.editDialog.isOpen = !0, i.editDialog.id = e.id || "", i.editDialog.title = e.title || "", i.editDialog.url = e.url || "", i.editDialog.group = e.group || "常用网站", i.editDialog.note = e.note || "", i.editDialog.isNew = !e.id, this.dispatch("edit", "open", e);
  },
  closeEditDialog() {
    i.editDialog.isOpen = !1, this.dispatch("edit", "close");
  },
  async submitEditDialog() {
    try {
      await s.saveLink({
        id: i.editDialog.id,
        title: i.editDialog.title.trim(),
        url: i.editDialog.url.trim(),
        group: i.editDialog.group.trim(),
        note: i.editDialog.note.trim()
      }), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 保存网站失败", e), h.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },
  async deleteFromEditDialog() {
    try {
      i.editDialog.id && await s.deleteLink(i.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), h.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 2. 图标选择弹窗 ---
  openIconPicker(e, t = "", o = "", n = "", l) {
    i.iconPicker.isSaving || (b = l, i.iconPicker.session++, v++, i.iconPicker.targetUrl = o, i.iconPicker.targetId = n, i.iconPicker.customUrl = "", i.iconPicker.isLoading = !1, i.iconPicker.totalPages = 1, i.iconPicker.results = [], i.iconPicker.isOpen = !0, i.iconPicker.previewTargetTitle = e, i.iconPicker.query = t || e, i.iconPicker.selectedIconUrl = "", i.iconPicker.isCustomPanelOpen = !1, i.iconPicker.currentPage = 1, this.dispatch("icon-picker", "open", { targetTitle: e, query: i.iconPicker.query }));
  },
  closeIconPicker() {
    i.iconPicker.isSaving || (b = void 0, i.iconPicker.session++, v++, i.iconPicker.isOpen = !1, this.dispatch("icon-picker", "close"));
  },
  async searchIcons(e, t = i.iconPicker.targetUrl) {
    if (i.iconPicker.isSaving) return;
    const o = ++v;
    i.iconPicker.query = e, i.iconPicker.results = [], i.iconPicker.currentPage = 1, i.iconPicker.isLoading = !0;
    try {
      const n = await U(e, t, (l) => {
        o === v && i.iconPicker.isOpen && this.setIconPickerResults(l);
      });
      o === v && i.iconPicker.isOpen && this.setIconPickerResults(n);
    } finally {
      o === v && (i.iconPicker.isLoading = !1);
    }
  },
  setIconPickerResults(e, t) {
    i.iconPicker.results = e, i.iconPicker.totalPages = t || Math.max(1, Math.ceil(e.length / i.iconPicker.pageSize)), i.iconPicker.isLoading = !1;
  },
  selectIcon(e) {
    i.iconPicker.selectedIconUrl = e;
  },
  async confirmIcon() {
    const { targetId: e, selectedIconUrl: t, isOpen: o, isSaving: n } = i.iconPicker, l = b;
    if (!(!o || n || !e && !l || !t)) {
      i.iconPicker.isSaving = !0;
      try {
        l ? await l(t) : await s.setLinkIcon(e, t), i.iconPicker.isSaving = !1, this.closeIconPicker();
      } catch (c) {
        $.show({ appName: "网站头像", title: "保存未完成", message: c instanceof Error ? c.message : "请核对存储状态后再操作。" });
      } finally {
        i.iconPicker.isSaving = !1;
      }
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, t, o, n, l = "") {
    T = l, i.linkMove.isOpen = !0, i.linkMove.linkTitle = e, i.linkMove.pages = [...t], i.linkMove.folders = [...o], i.linkMove.targetPageId = n || (t[0]?.id ?? ""), i.linkMove.targetFolderId = "", i.linkMove.showFolderSelect = o.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    i.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = s.getState().links.find((t) => t.id === T);
    if (!(!e || !i.linkMove.targetPageId))
      try {
        await s.moveLinkTo(e.id, i.linkMove.targetPageId, i.linkMove.targetFolderId || e.group), this.closeLinkMove();
      } catch (t) {
        console.warn("[Launcher] 移动网站失败", t);
      }
  },
  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(e, t, o) {
    i.folderMove.isOpen = !0, i.folderMove.folderTitle = e, i.folderMove.pages = [...t], i.folderMove.targetPageId = o || (t[0]?.id ?? ""), this.dispatch("folder-move", "open", { title: e });
  },
  closeFolderMove() {
    i.folderMove.isOpen = !1, this.dispatch("folder-move", "close");
  },
  async confirmFolderMove() {
    if (!(!i.folderMove.folderTitle || !i.folderMove.targetPageId))
      try {
        await s.moveFolderToPage(i.folderMove.folderTitle, i.folderMove.targetPageId), this.closeFolderMove();
      } catch (e) {
        console.warn("[Launcher] 移动文件夹失败", e);
      }
  },
  // --- 5. 合并收藏夹 ---
  openGroupMerge(e, t) {
    i.groupMerge.isOpen = !0, i.groupMerge.groupTitle = e, i.groupMerge.groups = [...t], i.groupMerge.targetGroup = t[0] || "", this.dispatch("group-merge", "open", { title: e });
  },
  closeGroupMerge() {
    i.groupMerge.isOpen = !1, this.dispatch("group-merge", "close");
  },
  async confirmGroupMerge() {
    try {
      await s.mergeGroups(i.groupMerge.groupTitle, i.groupMerge.targetGroup), this.closeGroupMerge();
    } catch (e) {
      console.warn("[Launcher] 合并文件夹失败", e);
    }
  },
  // --- 6. 文件夹删除确认 ---
  openFolderDeleteDialog(e) {
    i.folderDelete.isOpen = !0, i.folderDelete.groupName = e.groupName, i.folderDelete.count = e.count, i.folderDelete.hint = e.hint || "", m = {
      onRelease: e.onRelease,
      onDeleteAll: e.onDeleteAll,
      onCancel: e.onCancel
    }, this.dispatch("folder-delete", "open", { groupName: e.groupName, count: e.count });
  },
  closeFolderDeleteDialog() {
    i.folderDelete.isOpen = !1;
    const e = m?.onCancel;
    m = null, e?.(), this.dispatch("folder-delete", "close");
  },
  async releaseFolderDelete() {
    i.folderDelete.isOpen = !1;
    const e = m?.onRelease;
    m = null, e && await e(), this.dispatch("folder-delete", "release");
  },
  async deleteAllFolderDelete() {
    i.folderDelete.isOpen = !1;
    const e = m?.onDeleteAll;
    m = null, e && await e(), this.dispatch("folder-delete", "delete-all");
  }
};
function G(e) {
  if (!e) return;
  const t = s.getState().links.filter((l) => (l.group || "常用网站") === e), o = t.length, n = t.slice(0, 4).map((l) => l.title || "未命名").join("、");
  S.openFolderDeleteDialog({
    groupName: e,
    count: o,
    hint: o ? `包含：${n}${o > 4 ? ` 等 ${o} 个书签` : ""}` : "",
    onRelease: async () => {
      await s.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await s.deleteGroup(e, "purge");
    }
  });
}
async function q(e, t) {
  const o = t?.group;
  if (e === "folder:rename" && o) {
    const n = (await h.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${o}」的新名称：`,
      defaultValue: o
    }))?.trim();
    n && n !== o && await s.renameGroup(o, n);
  } else if (e === "folder:toggle-size" && o)
    await s.toggleGroupSize(o);
  else if (e === "folder:move" && o && t?.page)
    await s.moveFolderToPage(o, t.page);
  else if (e === "folder:delete" && o)
    G(o);
  else if (e === "page:delete" && t?.page) {
    if (s.getPageNames().length <= 1) {
      await h.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await h.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${s.getPageLabel(t.page)}」吗？
该分区下的网站和文件夹将移至保留分区。`,
      danger: !0
    }) && await s.deletePage(t.page);
  } else if (e === "blank:create-large-folder")
    await s.createLargeFolder(void 0, t?.page);
  else if (e === "blank:create-medium-folder")
    await s.createMediumFolder(void 0, t?.page);
  else if (e.startsWith("link:") && t?.link) {
    const n = s.getState().links.find((l) => String(l.id) === String(t.link.id));
    if (!n) return;
    if (e === "link:rename") {
      const l = (await h.prompt({
        title: "重命名网站",
        message: `请输入网站「${n.title}」的新名称：`,
        defaultValue: n.title
      }))?.trim();
      l && l !== n.title && await s.saveLink({ ...n, title: l });
    } else if (e === "link:create-large-folder") {
      const l = `${n.title || "新"}大文件夹`, c = (await h.prompt({
        title: "创建大文件夹",
        message: `为「${n.title}」创建大文件夹名称：`,
        defaultValue: l
      }))?.trim();
      c && await s.createLargeFolderFromLink(n.id, c);
    } else if (e === "link:change-icon") {
      const l = n.title || s.hostOf(n.url);
      S.openIconPicker(n.title || "网站", l, n.url, n.id), await S.searchIcons(l);
    } else e === "link:move" && t.page ? await s.moveLinkTo(n.id, t.page, n.group || "常用网站") : e === "link:move-out" ? await s.moveLinkTo(n.id, n.page, "常用网站") : e === "link:delete" && await s.deleteLink(n.id);
  }
}
const d = L({
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
}), F = {
  get state() {
    return d;
  },
  getSnapshot() {
    return x(d);
  },
  setMounted(e) {
    d.mounted = e;
  },
  closeAll() {
    this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, t, o, n, l) {
    this.closeAll(), d.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: t,
      canMove: o.length > 0,
      pages: [...o],
      x: Math.max(8, Math.min(window.innerWidth - 220, n)),
      y: Math.max(8, Math.min(window.innerHeight - 240, l)),
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
  openPageMenu(e, t, o, n, l) {
    this.closeAll(), d.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: t,
      canDelete: o,
      x: Math.max(8, Math.min(window.innerWidth - 200, n)),
      y: Math.max(8, Math.min(window.innerHeight - 150, l))
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
    q(e, t).catch((o) => {
      console.warn("[Launcher] 菜单操作失败", o), h.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, R = () => ({
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
}), r = L(R());
s.subscribe((e) => {
  r.links = [...e.links], r.pages = [...e.pages], r.pageLabels = { ...e.pageLabels }, r.groupSizes = { ...e.groupSizes }, r.folders = { ...e.folders }, r.activePage = e.activePage;
});
let g = {}, C = null, O = null;
const W = {
  getSnapshot() {
    return x(r);
  },
  setExternalDragHandler(e) {
    C = e;
  },
  setExternalDropHandler(e) {
    O = e;
  },
  handleExternalDragHover(e) {
    C?.(e);
  },
  async handleExternalDrop(e) {
    return O ? O(e) : !1;
  },
  update(e) {
    e.folders && (r.folders = { ...e.folders }), e.links && (r.links = [...e.links]), e.pages && (r.pages = [...e.pages]), e.pageLabels && (r.pageLabels = { ...e.pageLabels }), e.groupSizes && (r.groupSizes = { ...e.groupSizes }), Object.assign(r, e), s.updateState(e);
  },
  setMounted(e) {
    r.mounted = e;
  },
  setActivePage(e) {
    r.activePage = e, s.setPage(e);
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
  setPrefs(e, t, o) {
    r.showSites = e, r.hasTodo = t, r.hasBili = o;
  },
  setActions(e) {
    g = { ...g, ...e };
  },
  switchPage(e) {
    r.activePage = e, s.setPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page: e } }));
  },
  nextPage() {
    s.stepPage(1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-next-page"));
  },
  prevPage() {
    s.stepPage(-1), window.dispatchEvent(new CustomEvent("logicweaver:launcher-prev-page"));
  },
  addPage(e) {
    s.addPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-add-page", { detail: { name: e } }));
  },
  openFolder(e, t) {
    if (g.openFolder) {
      g.openFolder(e, t);
      return;
    }
    const o = r.links.filter((n) => (n.group || "常用网站") === e);
    A.openFolder(e, o), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (g.deleteFolder) {
      g.deleteFolder(e);
      return;
    }
    s.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, t) {
    if (t && typeof t.preventDefault == "function" && t.preventDefault(), g.openLink) {
      g.openLink(e, t);
      return;
    }
    if (e?.url) {
      const o = !!(t && (t.ctrlKey || t.metaKey || t.button === 1));
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: e.url, active: !o }) : window.open(e.url, "_blank", "noopener,noreferrer");
    }
  },
  openLinkMenu(e, t) {
    if (g.openLinkMenu) {
      g.openLinkMenu(e, t);
      return;
    }
    const o = t?.clientX || 0, n = t?.clientY || 0, l = r.pages.map((c) => ({ id: c, name: r.pageLabels[c] || c }));
    F.openLinkMenu(e, l, o, n);
  },
  openFolderMenu(e, t, o) {
    if (g.openFolderMenu) {
      g.openFolderMenu(e, t, o);
      return;
    }
    const n = o?.clientX || 0, l = o?.clientY || 0, M = r.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", f = r.pages.map((k) => ({ id: k, name: r.pageLabels[k] || k }));
    F.openFolderMenu(e, M, f, n, l);
  },
  openPageMenu(e, t) {
    if (g.openPageMenu) {
      g.openPageMenu(e, t);
      return;
    }
    const o = t?.clientX || 0, n = t?.clientY || 0, l = r.pageLabels[e] || e, c = r.pages.length > 1;
    F.openPageMenu(e, l, c, o, n);
  }
};
export {
  W as a,
  A as b,
  F as c,
  r as d,
  z as e,
  a as f,
  S as l,
  d as m,
  G as p
};
