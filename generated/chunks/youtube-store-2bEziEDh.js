import { a as l } from "./search.service-B8FaDQLd.js";
import { r as M, a as T } from "./vendor-vue-wIH4jcna.js";
import { b as k } from "./read-session-DQk1qcgF.js";
import { n as H } from "./view-styles-BcxK8WCo.js";
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
let E = null;
const G = {
  get state() {
    return a;
  },
  getSnapshot() {
    return T(a);
  },
  setMounted(e) {
    a.mounted = e;
  },
  openFolder(e, i, n) {
    a.isOpen = !0, a.activeFolder = e, a.links = [...i], n && (a.position = { ...n });
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
    E = e;
  },
  dispatch(e, i) {
    E?.(e, i);
  }
}, z = {
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
async function C(e, i) {
  const n = new AbortController(), o = setTimeout(() => n.abort(), i);
  try {
    const s = await fetch(e, { signal: n.signal });
    return s.ok ? await s.json() : null;
  } finally {
    clearTimeout(o);
  }
}
async function U(e, i, n) {
  const o = String(e || "").trim();
  let s = "";
  try {
    const u = new URL(i);
    (u.protocol === "https:" || u.protocol === "http:") && (s = u.hostname);
  } catch {
  }
  const c = [], p = /* @__PURE__ */ new Set(), h = (u) => {
    !u.url || p.has(u.url) || (p.add(u.url), c.push(u));
  }, m = () => {
    c.length && n?.([...c]);
  }, y = [];
  if (o && y.push((async () => {
    try {
      const u = await C(`https://itunes.apple.com/search?term=${encodeURIComponent(o)}&entity=software&limit=6&country=cn`, 2800);
      for (const f of u?.results || []) {
        const P = f.artworkUrl512 || f.artworkUrl100 || f.artworkUrl60;
        P && h({ title: f.trackName || o, url: P, source: "appstore", sourceLabel: "官方App" });
      }
      m();
    } catch {
    }
  })()), s) {
    const u = s.split("."), f = u.length > 2 ? u.slice(-2).join(".") : s;
    h({ title: `${o || s} 官方高清Favicon`, url: `https://www.google.com/s2/favicons?domain=${s}&sz=128`, source: "official", sourceLabel: "Favicon 128px" }), h({ title: `${o || s} 官方Logo`, url: `https://icon.horse/icon/${s}`, source: "official", sourceLabel: "IconHorse" }), f !== s && h({ title: `${f} 主站图标`, url: `https://icon.horse/icon/${f}`, source: "official", sourceLabel: "主站Favicon" }), h({ title: `${o || s} 品牌综合Logo`, url: `https://unavatar.io/${s}`, source: "official", sourceLabel: "Unavatar" }), m();
  }
  return o && y.push((async () => {
    try {
      const u = [o, ...z[o.toLowerCase()] || []], f = await C(`https://api.iconify.design/search?query=${encodeURIComponent(u.slice(0, 3).join(" "))}&limit=16`, 2500);
      for (const P of f?.icons || []) {
        const L = String(P).split(":");
        L.length === 2 && h({ title: L[1], url: `https://api.iconify.design/${L[0]}/${L[1]}.svg?color=%23333`, source: "iconify", sourceLabel: "矢量图标" });
      }
      m();
    } catch {
    }
  })()), await Promise.allSettled(y), c;
}
const V = M({
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
}), t = V;
let v = null, b = null, w = 0, D, A = "";
const I = {
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
  dispatch(e, i, n) {
    if (b)
      return b(e, i, n);
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
      await l.saveLink({
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
      t.editDialog.id && await l.deleteLink(t.editDialog.id), this.closeEditDialog();
    } catch (e) {
      console.warn("[Launcher] 删除网站失败", e), k.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },
  // --- 2. 图标选择弹窗 ---
  openIconPicker(e, i = "", n = "", o = "", s) {
    t.iconPicker.isSaving || (D = s, t.iconPicker.session++, w++, t.iconPicker.targetUrl = n, t.iconPicker.targetId = o, t.iconPicker.customUrl = "", t.iconPicker.isLoading = !1, t.iconPicker.totalPages = 1, t.iconPicker.results = [], t.iconPicker.isOpen = !0, t.iconPicker.previewTargetTitle = e, t.iconPicker.query = i || e, t.iconPicker.selectedIconUrl = "", t.iconPicker.isCustomPanelOpen = !1, t.iconPicker.currentPage = 1, this.dispatch("icon-picker", "open", { targetTitle: e, query: t.iconPicker.query }));
  },
  closeIconPicker() {
    t.iconPicker.isSaving || (D = void 0, t.iconPicker.session++, w++, t.iconPicker.isOpen = !1, this.dispatch("icon-picker", "close"));
  },
  async searchIcons(e, i = t.iconPicker.targetUrl) {
    if (t.iconPicker.isSaving) return;
    const n = ++w;
    t.iconPicker.query = e, t.iconPicker.results = [], t.iconPicker.currentPage = 1, t.iconPicker.isLoading = !0;
    try {
      const o = await U(e, i, (s) => {
        n === w && t.iconPicker.isOpen && this.setIconPickerResults(s);
      });
      n === w && t.iconPicker.isOpen && this.setIconPickerResults(o);
    } finally {
      n === w && (t.iconPicker.isLoading = !1);
    }
  },
  setIconPickerResults(e, i) {
    t.iconPicker.results = e, t.iconPicker.totalPages = i || Math.max(1, Math.ceil(e.length / t.iconPicker.pageSize)), t.iconPicker.isLoading = !1;
  },
  selectIcon(e) {
    t.iconPicker.selectedIconUrl = e;
  },
  async confirmIcon() {
    const { targetId: e, selectedIconUrl: i, isOpen: n, isSaving: o } = t.iconPicker, s = D;
    if (!(!n || o || !e && !s || !i)) {
      t.iconPicker.isSaving = !0;
      try {
        s ? await s(i) : await l.setLinkIcon(e, i), t.iconPicker.isSaving = !1, this.closeIconPicker();
      } catch (c) {
        H.show({ appName: "网站头像", title: "保存未完成", message: c instanceof Error ? c.message : "请核对存储状态后再操作。" });
      } finally {
        t.iconPicker.isSaving = !1;
      }
    }
  },
  // --- 3. 网站移动弹窗 ---
  openLinkMove(e, i, n, o, s = "") {
    A = s, t.linkMove.isOpen = !0, t.linkMove.linkTitle = e, t.linkMove.pages = [...i], t.linkMove.folders = [...n], t.linkMove.targetPageId = o || (i[0]?.id ?? ""), t.linkMove.targetFolderId = "", t.linkMove.showFolderSelect = n.length > 0, this.dispatch("link-move", "open", { title: e });
  },
  closeLinkMove() {
    t.linkMove.isOpen = !1, this.dispatch("link-move", "close");
  },
  async confirmLinkMove() {
    const e = l.getState().links.find((i) => i.id === A);
    if (!(!e || !t.linkMove.targetPageId))
      try {
        await l.moveLinkTo(e.id, t.linkMove.targetPageId, t.linkMove.targetFolderId || e.group), this.closeLinkMove();
      } catch (i) {
        console.warn("[Launcher] 移动网站失败", i);
      }
  },
  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(e, i, n) {
    t.folderMove.isOpen = !0, t.folderMove.folderTitle = e, t.folderMove.pages = [...i], t.folderMove.targetPageId = n || (i[0]?.id ?? ""), this.dispatch("folder-move", "open", { title: e });
  },
  closeFolderMove() {
    t.folderMove.isOpen = !1, this.dispatch("folder-move", "close");
  },
  async confirmFolderMove() {
    if (!(!t.folderMove.folderTitle || !t.folderMove.targetPageId))
      try {
        await l.moveFolderToPage(t.folderMove.folderTitle, t.folderMove.targetPageId), this.closeFolderMove();
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
      await l.mergeGroups(t.groupMerge.groupTitle, t.groupMerge.targetGroup), this.closeGroupMerge();
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
function R(e) {
  if (!e) return;
  const i = l.getState().links.filter((p) => (p.group || "常用网站") === e), n = l.getState().folders || {}, o = Object.values(n).some((p) => p?.parent === e), s = i.length;
  if (s === 0 && !o) {
    l.deleteGroup(e, "purge");
    return;
  }
  const c = i.slice(0, 4).map((p) => p.title || "未命名").join("、");
  I.openFolderDeleteDialog({
    groupName: e,
    count: s,
    hint: s ? `包含：${c}${s > 4 ? ` 等 ${s} 个书签` : ""}` : "",
    onRelease: async () => {
      await l.deleteGroup(e, "release");
    },
    onDeleteAll: async () => {
      await l.deleteGroup(e, "purge");
    }
  });
}
async function q(e, i) {
  const n = i?.group;
  if (e === "folder:rename" && n) {
    const o = (await k.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${n}」的新名称：`,
      defaultValue: n
    }))?.trim();
    o && o !== n && await l.renameGroup(n, o);
  } else if (e === "folder:toggle-size" && n)
    await l.toggleGroupSize(n);
  else if (e === "folder:move" && n && i?.page)
    await l.moveFolderToPage(n, i.page);
  else if (e === "folder:delete" && n)
    R(n);
  else if (e === "page:delete" && i?.page) {
    if (l.getPageNames().length <= 1) {
      await k.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    await k.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${l.getPageLabel(i.page)}」吗？
该分区下的网站和文件夹将移至保留分区。`,
      danger: !0
    }) && await l.deletePage(i.page);
  } else if (e === "blank:create-large-folder")
    await l.createLargeFolder(void 0, i?.page);
  else if (e === "blank:create-medium-folder")
    await l.createMediumFolder(void 0, i?.page);
  else if (e.startsWith("link:") && i?.link) {
    const o = l.getState().links.find((s) => String(s.id) === String(i.link.id));
    if (!o) return;
    if (e === "link:rename") {
      const s = (await k.prompt({
        title: "重命名网站",
        message: `请输入网站「${o.title}」的新名称：`,
        defaultValue: o.title
      }))?.trim();
      s && s !== o.title && await l.saveLink({ ...o, title: s });
    } else if (e === "link:create-large-folder") {
      const s = `${o.title || "新"}大文件夹`, c = (await k.prompt({
        title: "创建大文件夹",
        message: `为「${o.title}」创建大文件夹名称：`,
        defaultValue: s
      }))?.trim();
      c && await l.createLargeFolderFromLink(o.id, c);
    } else if (e === "link:change-icon") {
      const s = o.title || l.hostOf(o.url);
      I.openIconPicker(o.title || "网站", s, o.url, o.id), await I.searchIcons(s);
    } else e === "link:move" && i.page ? await l.moveLinkTo(o.id, i.page, o.group || "常用网站") : e === "link:move-out" ? await l.moveLinkTo(o.id, o.page, "常用网站") : e === "link:delete" && await l.deleteLink(o.id);
  }
}
const d = M({
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
    return T(d);
  },
  setMounted(e) {
    d.mounted = e;
  },
  closeAll() {
    this.closeFolderMenu(), this.closeLinkMenu(), this.closePageMenu(), this.closeBlankMenu();
  },
  openFolderMenu(e, i, n, o, s) {
    this.closeAll(), d.folderMenu = {
      isOpen: !0,
      groupName: e,
      sizeText: i,
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
  openLinkMenu(e, i, n, o) {
    this.closeAll(), d.linkMenu = {
      isOpen: !0,
      link: { ...e },
      pages: [...i],
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
  openPageMenu(e, i, n, o, s) {
    this.closeAll(), d.pageMenu = {
      isOpen: !0,
      pageName: e,
      pageLabel: i,
      canDelete: n,
      x: Math.max(8, Math.min(window.innerWidth - 200, o)),
      y: Math.max(8, Math.min(window.innerHeight - 150, s))
    };
  },
  closePageMenu() {
    d.pageMenu.isOpen = !1;
  },
  openBlankMenu(e, i, n) {
    this.closeAll(), d.blankMenu = {
      isOpen: !0,
      page: e,
      x: Math.max(8, Math.min(window.innerWidth - 200, i)),
      y: Math.max(8, Math.min(window.innerHeight - 150, n))
    };
  },
  closeBlankMenu() {
    d.blankMenu.isOpen = !1;
  },
  dispatch(e, i) {
    q(e, i).catch((n) => {
      console.warn("[Launcher] 菜单操作失败", n), k.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
}, j = () => ({
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
}), r = M(j());
l.subscribe((e) => {
  r.links = [...e.links], r.pages = [...e.pages], r.pageLabels = { ...e.pageLabels }, r.groupSizes = { ...e.groupSizes }, r.folders = { ...e.folders }, r.activePage = e.activePage;
});
let g = {}, $ = null, O = null;
const X = {
  getSnapshot() {
    return T(r);
  },
  setExternalDragHandler(e) {
    $ = e;
  },
  setExternalDropHandler(e) {
    O = e;
  },
  handleExternalDragHover(e) {
    $?.(e);
  },
  async handleExternalDrop(e) {
    return O ? O(e) : !1;
  },
  update(e) {
    e.folders && (r.folders = { ...e.folders }), e.links && (r.links = [...e.links]), e.pages && (r.pages = [...e.pages]), e.pageLabels && (r.pageLabels = { ...e.pageLabels }), e.groupSizes && (r.groupSizes = { ...e.groupSizes }), Object.assign(r, e), l.updateState(e);
  },
  setMounted(e) {
    r.mounted = e;
  },
  setActivePage(e) {
    r.activePage = e, l.setPage(e);
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
  setPrefs(e, i, n) {
    r.showSites = e, r.hasTodo = i, r.hasBili = n;
  },
  setActions(e) {
    g = { ...g, ...e };
  },
  switchPage(e) {
    r.activePage = e, l.setPage(e), window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page: e } }));
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
  openFolder(e, i) {
    if (g.openFolder) {
      g.openFolder(e, i);
      return;
    }
    const n = r.links.filter((o) => (o.group || "常用网站") === e);
    G.openFolder(e, n), window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName: e } }));
  },
  deleteFolder(e) {
    if (g.deleteFolder) {
      g.deleteFolder(e);
      return;
    }
    l.deleteGroup(e, "release"), window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName: e } }));
  },
  openLink(e, i) {
    if (i && typeof i.preventDefault == "function" && i.preventDefault(), g.openLink) {
      g.openLink(e, i);
      return;
    }
    if (e?.url) {
      const n = !!(i && (i.ctrlKey || i.metaKey || i.button === 1));
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
  openLinkMenu(e, i) {
    if (g.openLinkMenu) {
      g.openLinkMenu(e, i);
      return;
    }
    const n = i?.clientX || 0, o = i?.clientY || 0, s = r.pages.map((c) => ({ id: c, name: r.pageLabels[c] || c }));
    F.openLinkMenu(e, s, n, o);
  },
  openFolderMenu(e, i, n) {
    if (g.openFolderMenu) {
      g.openFolderMenu(e, i, n);
      return;
    }
    const o = n?.clientX || 0, s = n?.clientY || 0, p = r.groupSizes[e] === "large" ? "缩小为普通文件夹" : "扩大为大文件夹", h = r.pages.map((m) => ({ id: m, name: r.pageLabels[m] || m }));
    F.openFolderMenu(e, p, h, o, s);
  },
  openPageMenu(e, i) {
    if (g.openPageMenu) {
      g.openPageMenu(e, i);
      return;
    }
    const n = i?.clientX || 0, o = i?.clientY || 0, s = r.pageLabels[e] || e, c = r.pages.length > 1;
    F.openPageMenu(e, s, c, n, o);
  }
}, S = M({
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
}), x = /* @__PURE__ */ new Set(), K = {
  get state() {
    return S;
  },
  updateState(e) {
    Object.assign(S, e);
  },
  switchView(e) {
    S.currentView = e, this.dispatch("switch-view", e);
  },
  onAction(e) {
    return x.add(e), () => {
      x.delete(e);
    };
  },
  dispatch(e, i) {
    for (const n of x)
      try {
        n(e, i);
      } catch (o) {
        console.error("[YouTube] Action error:", o);
      }
  }
};
export {
  X as a,
  I as b,
  F as c,
  r as d,
  V as e,
  a as f,
  S as g,
  G as l,
  d as m,
  R as p,
  K as y
};
