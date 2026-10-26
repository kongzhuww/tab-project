import { l as s, n as $ } from "./search.service-lHw6yJW3.js";
import { r as L, a as x } from "./vendor-vue-CjOHdfe5.js";
import { q as k } from "./read-session-C1M3QoXl.js";
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
  openFolder(e, i, o) {
    a.isOpen = !0, a.activeFolder = e, a.links = [...i], o && (a.position = { ...o });
  },
  closeFolder() {
    a.folders = [], a.parentFolder = "", a.isOpen = !1, a.activeFolder = "", a.isDragging = !1, a.dropHoverValid = !1;
  },
  setLinks(e) {
    a.links = [...e];
  },
  setFolders(e, i) {
    a.folders = e, a.parentFolder = i || "";
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
  dispatch(e, i) {
    I?.(e, i);
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
async function E(e, i) {
  const o = new AbortController(), n = setTimeout(() => o.abort(), i);
  try {
    const l = await fetch(e, { signal: o.signal });
    return l.ok ? await l.json() : null;
  } finally {
    clearTimeout(n);
  }
}
async function G(e, i, o) {
  const n = String(e || "").trim();
  let l = "";
  try {
    const u = new URL(i);
    (u.protocol === "https:" || u.protocol === "http:") && (l = u.hostname);
  } catch {
  }
  const c = [], p = /* @__PURE__ */ new Set(), h = (u) => {
    !u.url || p.has(u.url) || (p.add(u.url), c.push(u));
  }, m = () => {
    c.length && o?.([...c]);
  }, D = [];
  if (n && D.push((async () => {
    try {
      const u = await E(`https://itunes.apple.com/search?term=${encodeURIComponent(n)}&entity=software&limit=6&country=cn`, 2800);
      for (const f of u?.results || []) {
        const w = f.artworkUrl512 || f.artworkUrl100 || f.artworkUrl60;
        w && h({ title: f.trackName || n, url: w, source: "appstore", sourceLabel: "官方App" });
      }
      m();
    } catch {
    }
  })()), l) {
    const u = l.split("."), f = u.length > 2 ? u.slice(-2).join(".") : l;
    h({ title: `${n || l} 官方高清Favicon`, url: `https://www.google.com/s2/favicons?domain=${l}&sz=128`, source: "official", sourceLabel: "Favicon 128px" }), h({ title: `${n || l} 官方Logo`, url: `https://icon.horse/icon/${l}`, source: "official", sourceLabel: "IconHorse" }), f !== l && h({ title: `${f} 主站图标`, url: `https://icon.horse/icon/${f}`, source: "official", sourceLabel: "主站Favicon" }), h({ title: `${n || l} 品牌综合Logo`, url: `https://unavatar.io/${l}`, source: "official", sourceLabel: "Unavatar" }), m();
  }
  return n && D.push((async () => {
    try {
      const u = [n, ...H[n.toLowerCase()] || []], f = await E(`https://api.iconify.design/search?query=${encodeURIComponent(u.slice(0, 3).join(" "))}&limit=16`, 2500);
      for (const w of f?.icons || []) {
        const P = String(w).split(":");
        P.length === 2 && h({ title: P[1], url: `https://api.iconify.design/${P[0]}/${P[1]}.svg?color=%23333`, source: "iconify", sourceLabel: "矢量图标" });
      }
      m();
    } catch {
    }
  })()), await Promise.allSettled(D), c;
}
const U = L({
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
}), t = U;
let v = null, b = null, M = 0, y, T = "";
const S = {
  state: t,
  updateState(e) {
    Object.assign(t, e);
  },
  setMounted(e) {
    t.mounted = e;
  },
  onAction(e) {
    b = e;
  },
  dispatch(e, i, o) {
    if (b)
      return b(e, i, o);
  },
  // --- 1. 编辑/添加弹窗 ---
  openEditDialog(e) {
    t.editDialog.isOpen = !0, t.editDialog.id = e.id || "", t.editDialog.title = e.title || "", t.editDialog.url = e.url || "", t.editDialog.group = e.group || "常用网站", t.editDialog.note = e.note || "", t.editDialog.isNew = !e.id, this.dispatch("edit", "open", e);
  },
  closeEditDialog() {
    t.editDialog.isOpen = !1, this.dispatch("edit", "close");
  },
  async submitEditDialog() {
    try {
      await s.saveLink({
        id: t.editDialog.id,
        title: t.editDialog.title.trim(),
        url: t.editDialog.url.trim(),
        group: t.editDialog.group.trim(),
        note: t.editDialog.note.trim()
      }), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 保存网站失败", e), k.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },
  async deleteFromEditDialog() {
    try {
      t.editDialog.id && await s.deleteLink(t.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), k.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 2. 图标选择弹窗 ---
  openIconPicker(e, i = "", o = "", n = "", l) {
    t.iconPicker.isSaving || (y = l, t.iconPicker.session++, M++, t.iconPicker.targetUrl = o, t.iconPicker.targetId = n, t.iconPicker.customUrl = "", t.iconPicker.isLoading = !1, t.iconPicker.totalPages = 1, t.iconPicker.results = [], t.iconPicker.isOpen = !0, t.iconPicker.previewTargetTitle = e, t.iconPicker.query = i || e, t.iconPicker.selectedIconUrl = "", t.iconPicker.isCustomPanelOpen = !1, t.iconPicker.currentPage = 1, this.dispatch("icon-picker", "open", { targetTitle: e, query: t.iconPicker.query }));
  },
  closeIconPicker() {
    t.iconPicker.isSaving || (y = void 0, t.iconPicker.session++, M++, t.iconPicker.isOpen = !1, this.dispatch("icon-picker", "close"));
  },
  async searchIcons(e, i = t.iconPicker.targetUrl) {
    if (t.iconPicker.isSaving) return;
    const o = ++M;
    t.iconPicker.query = e, t.iconPicker.results = [], t.iconPicker.currentPage = 1, t.iconPicker.isLoading = !0;
    try {
      const n = await G(e, i, (l) => {
        o === M && t.iconPicker.isOpen && this.setIconPickerResults(l);
      });
      o === M && t.iconPicker.isOpen && this.setIconPickerResults(n);
    } finally {
      o === M && (t.iconPicker.isLoading = !1);
    }
  },
  setIconPickerResults(e, i) {
    t.iconPicker.results = e, t.iconPicker.totalPages = i || Math.max(1, Math.ceil(e.length / t.iconPicker.pageSize)), t.iconPicker.isLoading = !1;
  },
  selectIcon(e) {
    t.iconPicker.selectedIconUrl = e;
  },
  async confirmIcon() {
    const { targetId: e, selectedIconUrl: i, isOpen: o, isSaving: n } = t.iconPicker, l = y;
    if (!(!o || n || !e && !l || !i)) {
      t.iconPicker.isSaving = !0;
      try {
        l ? await l(i) : await s.setLinkIcon(e, i), t.iconPicker.isSaving = !1, this.closeIconPicker();
      } catch (c) {
        $.show({ appName: "网站头像", title: "保存未完成", message: c instanceof Error ? c.message : "请核对存储状态后再操作。" });
      } finally {
        t.iconPicker.isSaving = !1;
      }
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, i, o, n, l = "") {
    T = l, t.linkMove.isOpen = !0, t.linkMove.linkTitle = e, t.linkMove.pages = [...i], t.linkMove.folders = [...o], t.linkMove.targetPageId = n || (i[0]?.id ?? ""), t.linkMove.targetFolderId = "", t.linkMove.showFolderSelect = o.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    t.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = s.getState().links.find((i) => i.id === T);
    if (!(!e || !t.linkMove.targetPageId))
      try {
        await s.moveLinkTo(e.id, t.linkMove.targetPageId, t.linkMove.targetFolderId || e.group), this.closeLinkMove();
      } catch (i) {
        console.warn("[Launcher] 移动网站失败", i);
      }
  },
  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(e, i, o) {
    t.folderMove.isOpen = !0, t.folderMove.folderTitle = e, t.folderMove.pages = [...i], t.folderMove.targetPageId = o || (i[0]?.id ?? ""), this.dispatch("folder-move", "open", { title: e });
  },
  closeFolderMove() {
    t.folderMove.isOpen = !1, this.dispatch("folder-move", "close");
  },
  async confirmFolderMove() {
    if (!(!t.folderMove.folderTitle || !t.folderMove.targetPageId))
      try {
        await s.moveFolderToPage(t.folderMove.folderTitle, t.folderMove.targetPageId), this.closeFolderMove();
      } catch (e) {
        console.warn("[Launcher] 移动文件夹失败", e);
      }
  },
  // --- 5. 合并收藏夹 ---
  openGroupMerge(e, i) {
    t.groupMerge.isOpen = !0, t.groupMerge.groupTitle = e, t.groupMerge.groups = [...i], t.groupMerge.targetGroup = i[0] || "", this.dispatch("group-merge", "open", { title: e });
  },
  closeGroupMerge() {
    t.groupMerge.isOpen = !1, this.dispatch("group-merge", "close");
  },
  async confirmGroupMerge() {
    try {
      await s.mergeGroups(t.groupMerge.groupTitle, t.groupMerge.targetGroup), this.closeGroupMerge();
    } catch (e) {
      console.warn("[Launcher] 合并文件夹失败", e);
    }
  },
  // --- 6. 文件夹删除确认 ---
  openFolderDeleteDialog(e) {
    t.folderDelete.isOpen = !0, t.folderDelete.groupName = e.groupName, t.folderDelete.count = e.count, t.folderDelete.hint = e.hint || "", v = {
      onRelease: e.onRelease,
      onDeleteAll: e.onDeleteAll,
      onCancel: e.onCancel
    }, this.dispatch("folder-delete", "open", { groupName: e.groupName, count: e.count });
  },
  closeFolderDeleteDialog() {
    t.folderDelete.isOpen = !1;
    const e = v?.onCancel;
    v = null, e?.(), this.dispatch("folder-delete", "close");
  },
  async releaseFolderDelete() {
    t.folderDelete.isOpen = !1;
    const e = v?.onRelease;
    v = null, e && await e(), this.dispatch("folder-delete", "release");
  },
  async deleteAllFolderDelete() {
    t.folderDelete.isOpen = !1;
    const e = v?.onDeleteAll;
    v = null, e && await e(), this.dispatch("folder-delete", "delete-all");
  }
};
function z(e) {
  if (!e) return;
  const i = s.getState().links.filter((p) => (p.group || "常用网站") === e), o = s.getState().folders || {}, n = Object.values(o).some((p) => p?.parent === e), l = i.length;
  if (l === 0 && !n) {
    s.deleteGroup(e, "purge");
    return;
  }
  const c = i.slice(0, 4).map((p) => p.title || "未命名").join("、");
  S.openFolderDeleteDialog({
    groupName: e,
    count: l,
    hint: l ? `包含：${c}${l > 4 ? ` 等 ${l} 个书签` : ""}` : "",
    onRelease: async () => {
      await s.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await s.deleteGroup(e, "purge");
    }
  });
}
async function q(e, i) {
  const o = i?.group;
  if (e === "folder:rename" && o) {
    const n = (await k.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${o}」的新名称：`,
      defaultValue: o
    }))?.trim();
    n && n !== o && await s.renameGroup(o, n);
  } else if (e === "folder:toggle-size" && o)
    await s.toggleGroupSize(o);
  else if (e === "folder:move" && o && i?.page)
    await s.moveFolderToPage(o, i.page);
  else if (e === "folder:delete" && o)
    z(o);
  else if (e === "page:delete" && i?.page) {
    if (s.getPageNames().length <= 1) {
      await k.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await k.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${s.getPageLabel(i.page)}」吗？
该分区下的网站和文件夹将移至保留分区。`,
      danger: !0
    }) && await s.deletePage(i.page);
  } else if (e === "blank:create-large-folder")
    await s.createLargeFolder(void 0, i?.page);
  else if (e === "blank:create-medium-folder")
    await s.createMediumFolder(void 0, i?.page);
  else if (e.startsWith("link:") && i?.link) {
    const n = s.getState().links.find((l) => String(l.id) === String(i.link.id));
    if (!n) return;
    if (e === "link:rename") {
      const l = (await k.prompt({
        title: "重命名网站",
        message: `请输入网站「${n.title}」的新名称：`,
        defaultValue: n.title
      }))?.trim();
      l && l !== n.title && await s.saveLink({ ...n, title: l });
    } else if (e === "link:create-large-folder") {
      const l = `${n.title || "新"}大文件夹`, c = (await k.prompt({
        title: "创建大文件夹",
        message: `为「${n.title}」创建大文件夹名称：`,
        defaultValue: l
      }))?.trim();
      c && await s.createLargeFolderFromLink(n.id, c);
    } else if (e === "link:change-icon") {
      const l = n.title || s.hostOf(n.url);
      S.openIconPicker(n.title || "网站", l, n.url, n.id), await S.searchIcons(l);
    } else e === "link:move" && i.page ? await s.moveLinkTo(n.id, i.page, n.group || "常用网站") : e === "link:move-out" ? await s.moveLinkTo(n.id, n.page, "常用网站") : e === "link:delete" && await s.deleteLink(n.id);
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
  openFolderMenu(e, i, o, n, l) {
    this.closeAll(), d.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: i,
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
  openLinkMenu(e, i, o, n) {
    this.closeAll(), d.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...i],
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
  openPageMenu(e, i, o, n, l) {
    this.closeAll(), d.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: i,
      canDelete: o,
      x: Math.max(8, Math.min(window.innerWidth - 200, n)),
      y: Math.max(8, Math.min(window.innerHeight - 150, l))
    };
  },
  closePageMenu() {
    d.pageMenu.isOpen = !1;
  },
  openBlankMenu(e, i, o) {
    this.closeAll(), d.blankMenu = {
      isOpen: !0,
      page: e,
      x: Math.max(8, Math.min(window.innerWidth - 200, i)),
      y: Math.max(8, Math.min(window.innerHeight - 150, o))
    };
  },
  closeBlankMenu() {
    d.blankMenu.isOpen = !1;
  },
  dispatch(e, i) {
    q(e, i).catch((o) => {
      console.warn("[Launcher] 菜单操作失败", o), k.alert({ title: "操作失败", message: "操作失败，请重试。" });
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
  setPrefs(e, i, o) {
    r.showSites = e, r.hasTodo = i, r.hasBili = o;
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
  openFolder(e, i) {
    if (g.openFolder) {
      g.openFolder(e, i);
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
  openLink(e, i) {
    if (i && typeof i.preventDefault == "function" && i.preventDefault(), g.openLink) {
      g.openLink(e, i);
      return;
    }
    if (e?.url) {
      const o = !!(i && (i.ctrlKey || i.metaKey || i.button === 1));
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: e.url, active: !o }) : window.open(e.url, "_blank", "noopener,noreferrer");
    }
  },
  openLinkMenu(e, i) {
    if (g.openLinkMenu) {
      g.openLinkMenu(e, i);
      return;
    }
    const o = i?.clientX || 0, n = i?.clientY || 0, l = r.pages.map((c) => ({ id: c, name: r.pageLabels[c] || c }));
    F.openLinkMenu(e, l, o, n);
  },
  openFolderMenu(e, i, o) {
    if (g.openFolderMenu) {
      g.openFolderMenu(e, i, o);
      return;
    }
    const n = o?.clientX || 0, l = o?.clientY || 0, p = r.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", h = r.pages.map((m) => ({ id: m, name: r.pageLabels[m] || m }));
    F.openFolderMenu(e, p, h, n, l);
  },
  openPageMenu(e, i) {
    if (g.openPageMenu) {
      g.openPageMenu(e, i);
      return;
    }
    const o = i?.clientX || 0, n = i?.clientY || 0, l = r.pageLabels[e] || e, c = r.pages.length > 1;
    F.openPageMenu(e, l, c, o, n);
  }
};
export {
  W as a,
  S as b,
  F as c,
  r as d,
  U as e,
  a as f,
  A as l,
  d as m,
  z as p
};
