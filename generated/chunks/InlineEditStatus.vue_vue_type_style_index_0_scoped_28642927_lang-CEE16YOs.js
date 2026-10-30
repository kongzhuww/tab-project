import { r as re, P as le, y as ue, H as fe, M as me, b as D, x as ge } from "./vendor-vue-wIH4jcna.js";
import { R as we, a as pe, b as be } from "./read-session-DQk1qcgF.js";
const ye = "logicweaver-sticker-files-v1", k = "stickerRootFolderName", R = "stickerFolderPath", B = "stickerActiveFolderRelPath", $ = "stickerExpandedFolderPaths", H = "stickerRootHandleRevision", Qe = [k, R, B, $, H], Z = re({ visible: !1, pendingWrites: 0 }), V = /* @__PURE__ */ new Set();
function et(n) {
  return V.add(n), () => {
    V.delete(n);
  };
}
function tt() {
  for (const n of V) n();
}
async function Pe(n) {
  Z.pendingWrites++;
  try {
    return await n();
  } finally {
    Z.pendingWrites--;
  }
}
const v = re({
  mounted: !1,
  isOpen: !1,
  frameSrc: "",
  requestedSection: null,
  requestedStorageTarget: null,
  sectionRequest: 0
});
let _ = null;
const rt = {
  state: v,
  setMounted(n) {
    v.mounted = n;
  },
  onAction(n) {
    _ = n;
  },
  dispatch(n, e) {
    if (_)
      return _(n, e);
  },
  open(n, e) {
    if (n) {
      const t = n === "bili-cache" || n === "stickers";
      v.requestedSection = t ? "storage" : n, v.requestedStorageTarget = t ? n : n === "storage" ? e ?? null : null, ++v.sectionRequest;
    }
    v.isOpen = !0, this.dispatch("open");
  },
  minimize() {
    v.isOpen = !1, this.dispatch("minimize");
  },
  close() {
    v.isOpen = !1, this.dispatch("close");
  },
  toggle() {
    v.isOpen ? this.minimize() : this.open();
  }
}, J = () => ({
  storageKind: null,
  hasFolder: !1,
  folderPath: "正在读取图片库…",
  folderSummary: "0 个分类",
  rootName: "",
  libraryImageCount: null,
  needsReadPermission: !1,
  activePath: "",
  displayTitle: "请选择表情包",
  breadcrumb: "",
  breadcrumbs: [],
  parentPath: null,
  subFolders: [],
  dropPrompt: "拖入图片，自动保存到当前选中的文件夹",
  totalCountText: "0 张",
  folders: [],
  subnavPills: [],
  items: [],
  emptyText: "",
  loading: !1,
  hasMore: !1,
  currentPage: 1,
  pageSize: 12,
  totalPages: 1,
  totalCount: 0
});
function Ie() {
  const n = le(J()), e = /* @__PURE__ */ new Set();
  return {
    get state() {
      return n;
    },
    reset() {
      Object.assign(n, J());
    },
    updateState(t) {
      Object.assign(n, t);
    },
    setItems(t) {
      n.items = [...t];
    },
    onAction(t) {
      return e.add(t), () => {
        e.delete(t);
      };
    },
    async dispatch(t, r) {
      for (const i of e) await i(t, r);
    }
  };
}
const K = Ie();
K.state;
async function ve(n) {
  if (!n.size || n.size > 25 * 1024 * 1024) throw new Error("预览图片大小须在25MB以内");
  if (n.type === "image/gif" && n.size <= 4 * 1024 * 1024) return n;
  const e = await createImageBitmap(n);
  try {
    if (e.width * e.height > 4e7) throw new Error("图片像素过大，请先缩小副本再预览");
    const t = Math.min(1, 320 / Math.max(e.width, e.height)), r = new OffscreenCanvas(Math.max(1, Math.round(e.width * t)), Math.max(1, Math.round(e.height * t))), i = r.getContext("2d");
    if (!i) throw new Error("无法生成预览");
    return i.drawImage(e, 0, 0, r.width, r.height), await r.convertToBlob({ type: "image/webp", quality: 0.8 });
  } finally {
    e.close();
  }
}
class Se {
  constructor() {
    this.urls = /* @__PURE__ */ new Map(), this.generation = 0, this.running = 0, this.pending = [], this.limit = 120;
  }
  get(e) {
    return this.urls.get(e) || "";
  }
  has(e) {
    return this.urls.has(e);
  }
  release(e) {
    const t = this.urls.get(e);
    if (t)
      try {
        URL.revokeObjectURL(t);
      } catch {
      }
    this.urls.delete(e);
  }
  /** In-flight native decode cannot be physically aborted, but cannot publish after this. */
  cancelPending() {
    ++this.generation;
    for (const e of this.pending.splice(0)) e.resolve(!1);
  }
  delete(e) {
    this.cancelPending(), this.release(e);
  }
  retain(e) {
    this.cancelPending();
    for (const t of this.urls.keys()) e.has(t) || this.release(t);
  }
  clear() {
    this.cancelPending();
    for (const e of this.urls.keys()) this.release(e);
  }
  acquire(e) {
    return e() ? this.running < 2 ? (++this.running, Promise.resolve(!0)) : new Promise((t) => this.pending.push({ current: e, resolve: t })) : Promise.resolve(!1);
  }
  releaseSlot() {
    for (--this.running; this.running < 2 && this.pending.length; ) {
      const e = this.pending.shift(), t = e.current();
      t && ++this.running, e.resolve(t);
    }
  }
  async prepare(e, t, r) {
    const i = this.generation, s = () => i === this.generation && r();
    if (!s()) return "";
    const a = this.get(e);
    if (a) return a;
    if (!await this.acquire(s)) return "";
    try {
      if (!s()) return "";
      const h = await t();
      if (!s()) return "";
      const o = await ve(h);
      if (!s()) return "";
      const d = this.get(e);
      if (d) return d;
      for (; this.urls.size >= this.limit; ) {
        const l = this.urls.keys().next();
        if (l.done) break;
        this.release(l.value);
      }
      const u = URL.createObjectURL(o);
      return this.urls.set(e, u), u;
    } finally {
      this.releaseSlot();
    }
  }
}
const xe = "folder-layout-v1";
async function Ee(n, e) {
  const t = await new Promise((s, a) => {
    const h = n.transaction("handles", "readonly"), o = h.objectStore("handles").get(xe);
    h.oncomplete = () => s(o.result), h.onerror = h.onabort = () => a(h.error || new Error("分类设置读取失败"));
  }), r = t?.revision || "";
  let i = !1;
  try {
    i = !!t && await e.isSameEntry(t.root);
  } catch {
  }
  return t && i ? { revision: r, aliases: t.aliases, removed: t.removed, orders: t.orders } : { revision: r, aliases: {}, removed: [], orders: {} };
}
function ke(n, e) {
  const t = new Set(e.removed), r = (s) => [
    ...s.directItems,
    ...s.subDirs.flatMap(r)
  ];
  function i(s) {
    const a = Object.hasOwn(e.aliases, s.path) ? e.aliases[s.path] : s.name, h = s.directItems.map((l) => ({ ...l, folderName: a })), o = [];
    for (const l of s.subDirs)
      t.has(l.path) ? h.push(...r(l).map((m) => ({ ...m, folderName: a }))) : o.push(i(l));
    const d = Object.hasOwn(e.orders, s.path) ? e.orders[s.path] : [], u = new Map(d.map((l, m) => [l, m]));
    return o.sort((l, m) => (u.get(l.path) ?? Number.MAX_SAFE_INTEGER) - (u.get(m.path) ?? Number.MAX_SAFE_INTEGER)), { ...s, name: a, directItems: h, subDirs: o };
  }
  return i(n);
}
const F = "stickerLibraryIndexRevision", W = "virtual-library-roots-v1", z = (n) => `virtual-library:${n}`, C = (n) => `${n}_${crypto.randomUUID()}`;
async function U(n, e) {
  try {
    return await n.isSameEntry(e);
  } catch {
    return !1;
  }
}
function O(n, e) {
  return new Promise((t, r) => {
    const i = n.transaction("handles", "readonly"), s = i.objectStore("handles").get(e);
    i.oncomplete = () => t(s.result), i.onerror = i.onabort = () => r(new Error("图库索引读取失败"));
  });
}
async function ie(n, e) {
  try {
    await chrome.storage.local.set({ [F]: `${e}:${n}` });
  } catch {
  }
}
async function N(n, e, t) {
  const r = { ...e, revision: crypto.randomUUID() };
  return await new Promise((i, s) => {
    const a = n.transaction("handles", "readwrite"), h = a.objectStore("handles");
    let o;
    const d = h.get(z(e.id));
    d.onsuccess = () => {
      if (d.result?.revision !== e.revision) {
        o = new Error("图库索引已被其他页面修改，请刷新图库后再操作；未覆盖对方修改。"), a.abort();
        return;
      }
      h.put(r, z(r.id));
    }, a.oncomplete = () => i(), a.onerror = a.onabort = () => s(o || new Error("图库索引保存未确认，请重读核对后再试"));
  }), await ie(r.revision, t), r;
}
function x(n) {
  return { ...n, groups: n.groups.map((e) => ({ ...e })), images: n.images.map((e) => ({ ...e })) };
}
function G(n) {
  return [...n.directItems, ...n.subDirs.flatMap(G)];
}
function De(n, e) {
  const t = { schema: 1, id: C("library"), revision: crypto.randomUUID(), root: n, groups: [], images: [] };
  function r(i, s) {
    i.directItems.forEach((a) => t.images.push({
      id: C("image"),
      path: a.relPath,
      name: a.file,
      size: a.size,
      modified: a.modified,
      groupId: s,
      hidden: !1,
      handle: a.handle
    })), i.subDirs.forEach((a, h) => {
      const o = C("group");
      t.groups.push({ id: o, parentId: s, name: a.name, order: h }), r(a, o);
    });
  }
  return r(e, ""), t;
}
async function X(n, e) {
  const t = await O(n, W);
  for (const r of t?.entries || [])
    if (await U(e, r.root)) {
      const i = await O(n, z(r.id));
      if (i?.schema === 1 && Array.isArray(i.groups) && Array.isArray(i.images)) return i;
      throw new Error("已有图库索引无法读取，未替换或清空");
    }
  return null;
}
async function Re(n, e, t, r) {
  if (!navigator.locks) throw new Error("当前环境不支持图库索引锁");
  return navigator.locks.request("logicweaver:sticker-library-roots", { signal: AbortSignal.timeout(15e3) }, async () => {
    const i = await O(n, W) || { entries: [] };
    for (const a of i.entries)
      if (await U(e, a.root)) {
        const h = await O(n, z(a.id));
        if (!h || h.schema !== 1 || !Array.isArray(h.images) || !Array.isArray(h.groups))
          throw new Error("已有图库索引无法读取，未创建空索引覆盖；请先备份核对");
        return h;
      }
    const s = De(e, t);
    if (s.images.length > 2e4 || s.groups.length > 2e3) throw new Error("图库过大，请分库管理");
    return await new Promise((a, h) => {
      const o = n.transaction("handles", "readwrite"), d = o.objectStore("handles");
      d.put(s, z(s.id)), d.put({ revision: crypto.randomUUID(), entries: [...i.entries, { id: s.id, root: e }] }, W), o.oncomplete = () => a(), o.onerror = o.onabort = () => h(new Error("图库索引初始化未确认，请重读核对"));
    }), await ie(s.revision, r), s;
  });
}
async function Te(n, e, t, r, i) {
  const s = x(e), a = G(t);
  if (a.length > 2e4) throw new Error("图库超过两万张，本次未更新索引，请分库管理");
  const h = /* @__PURE__ */ new Map();
  e.images.forEach((l) => h.set(l.path, l));
  const o = /* @__PURE__ */ new Map();
  e.images.forEach((l) => {
    const m = `${l.size}:${l.modified}`, f = o.get(m) || [];
    f.push(l), o.set(m, f);
  });
  const d = /* @__PURE__ */ new Set();
  let u = !1;
  for (const l of a) {
    i?.throwIfAborted();
    let m = h.get(l.relPath);
    if (m?.handle && !await U(m.handle, l.handle) && (m = void 0), m?.handle || (m = void 0), !m) {
      const f = (o.get(`${l.size}:${l.modified}`) || []).filter((w) => !d.has(w.id) && w.handle);
      if (f.length <= 16) {
        for (const w of f)
          if (await U(w.handle, l.handle)) {
            m = w;
            break;
          }
      }
    }
    if (m && !d.has(m.id)) {
      if (d.add(m.id), l.id = m.id, m.path !== l.relPath || m.size !== l.size || m.modified !== l.modified || m.name !== l.file) {
        const f = s.images.findIndex((w) => w.id === m.id);
        s.images[f] = { ...m, path: l.relPath, name: l.file, size: l.size, modified: l.modified, handle: l.handle }, u = !0;
      }
    } else
      l.id = C("image"), s.images.push({
        id: l.id,
        path: l.relPath,
        name: l.file,
        size: l.size,
        modified: l.modified,
        groupId: "",
        hidden: !1,
        handle: l.handle
      }), u = !0;
  }
  if (i?.throwIfAborted(), s.images.length > 2e4) throw new Error("包含失联记录的图库索引超过两万条，请先导出备份并分库管理");
  return u ? N(n, s, r) : e;
}
function M(n) {
  const e = /* @__PURE__ */ new Map([["", ""]]), t = (r, i, s) => {
    if (s > 32) throw new Error("分类层级无效");
    n.groups.filter((a) => a.parentId === r).forEach((a) => {
      const h = i ? `${i}/${a.id}` : a.id;
      e.set(a.id, h), t(a.id, h, s + 1);
    });
  };
  if (t("", "", 0), e.size !== n.groups.length + 1) throw new Error("分类索引包含失联节点或循环，未显示错误关系");
  return e;
}
function L(n, e) {
  const t = [...M(n)].find(([, r]) => r === e);
  if (!t) throw new Error("分类已变化，请重新选择");
  return t[0];
}
function Q(n, e) {
  const t = M(n), r = /* @__PURE__ */ new Map();
  r.set("", { ...e, path: "", directItems: [], subDirs: [], totalCount: 0 }), n.groups.forEach((o) => r.set(o.id, {
    handle: e.handle,
    name: o.name,
    path: t.get(o.id),
    depth: t.get(o.id).split("/").length,
    directItems: [],
    subDirs: [],
    totalCount: 0
  })), [...n.groups].sort((o, d) => o.order - d.order).forEach((o) => r.get(o.parentId).subDirs.push(r.get(o.id)));
  const i = new Map(n.images.map((o) => [o.path, o])), s = new Map(n.images.map((o) => [o.id, o]));
  for (const o of G(e)) {
    const d = o.id && s.get(o.id) || i.get(o.relPath);
    if (!d || (o.id = d.id, d.hidden)) continue;
    const u = r.get(d.groupId) || r.get("");
    u.directItems.push({ ...o, id: d.id, folderPath: u.path, folderName: u.name });
  }
  const a = (o) => (o.directItems.sort((d, u) => u.modified - d.modified), o.totalCount = o.directItems.length + o.subDirs.reduce((d, u) => d + a(u), 0), o.totalCount), h = r.get("");
  return a(h), h;
}
function Ae(n, e, t) {
  const r = x(n), i = L(r, e);
  if (r.groups.length >= 2e3) throw new Error("分类数量达到上限");
  if (r.groups.some((s) => s.parentId === i && s.name.toLocaleLowerCase() === t.toLocaleLowerCase())) throw new Error("同级已有同名分类");
  return r.groups.push({ id: C("group"), parentId: i, name: t, order: Date.now() }), M(r), r;
}
function $e(n, e, t) {
  const r = x(n);
  if (e === "reorder-folders") {
    const i = L(r, String(t?.parentPath || "")), s = r.groups.filter((o) => o.parentId === i), a = M(r), h = t?.paths;
    if (!Array.isArray(h) || h.length !== s.length || new Set(h).size !== s.length || h.some((o) => !s.some((d) => a.get(d.id) === o))) throw new Error("只能调整当前同级的完整分类顺序");
    s.forEach((o) => {
      o.order = h.indexOf(a.get(o.id));
    });
  } else {
    const i = L(r, String(t?.path || "")), s = r.groups.find((a) => a.id === i);
    if (!s) throw new Error("全部入口不能修改");
    if (e === "rename-folder") {
      if (r.groups.some((a) => a.id !== i && a.parentId === s.parentId && a.name.toLocaleLowerCase() === String(t.name).toLocaleLowerCase())) throw new Error("同级已有同名分类");
      s.name = t.name;
    } else {
      const a = /* @__PURE__ */ new Set([i]);
      for (let h = 0; h <= r.groups.length; h++) {
        const o = a.size;
        if (r.groups.forEach((d) => {
          a.has(d.parentId) && a.add(d.id);
        }), o === a.size) break;
      }
      r.groups = r.groups.filter((h) => !a.has(h.id)), r.images.forEach((h) => {
        a.has(h.groupId) && (h.groupId = s.parentId);
      });
    }
  }
  return r;
}
function Ce(n, e, t) {
  const r = x(n), i = r.images.find((s) => s.id === e);
  if (!i) throw new Error("图片索引已变化，请刷新");
  return t === null ? i.hidden = !0 : (i.groupId = L(r, t), i.hidden = !1), r;
}
function ee(n) {
  const e = JSON.stringify({
    format: "logicweaver-sticker-index",
    schema: 1,
    rootName: n.root.name,
    groups: n.groups,
    images: n.images.map(({ handle: t, ...r }) => r)
  }, null, 2);
  if (new Blob([e]).size > 8 * 1024 * 1024) throw new Error("索引备份超过8MB，请分库管理");
  return e;
}
function ze(n, e, t) {
  if (e.length > 8 * 1024 * 1024) throw new Error("索引备份不能超过8MB");
  const r = JSON.parse(e);
  if (r?.format !== "logicweaver-sticker-index" || r.schema !== 1 || !Array.isArray(r.groups) || !Array.isArray(r.images) || r.groups.length > 2e3 || r.images.length > 2e4) throw new Error("不是受支持的图库索引备份");
  const i = x(n), s = (c, g) => typeof c == "string" && new RegExp(`^${g}_[a-f0-9-]{36}$`).test(c), a = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
  i.groups = r.groups.map((c) => {
    if (!s(c?.id, "group") || a.has(c.id) || c.parentId !== "" && !s(c.parentId, "group") || typeof c.name != "string" || !c.name.trim() || c.name.length > 50 || /[\x00-\x1f/\\]/.test(c.name) || !Number.isFinite(c.order)) throw new Error("分类备份格式无效");
    const g = JSON.stringify([c.parentId, c.name.toLocaleLowerCase()]);
    if (h.has(g)) throw new Error("分类备份包含同级重名，未恢复");
    return h.add(g), a.add(c.id), { id: c.id, parentId: c.parentId, name: c.name, order: c.order };
  }), M(i);
  let o = 0;
  const d = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), l = (c) => JSON.stringify([c.path, c.size, c.modified]), m = new Map(n.images.filter((c) => c.handle && t.has(c.id)).map((c) => [c.id, c])), f = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map();
  m.forEach((c) => {
    const g = l(c), b = f.get(g) || [];
    b.push(c), f.set(g, b);
  }), r.images.forEach((c) => {
    if (c) {
      const g = l(c);
      w.set(g, (w.get(g) || 0) + 1);
    }
  });
  const p = r.images.map((c) => {
    if (!s(c?.id, "image") || u.has(c.id) || typeof c.path != "string" || c.path.length > 4096 || c.path.startsWith("/") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(c.path) || c.path.includes("\\") || c.path.split("/").some((S) => !S || S === "." || S === "..") || typeof c.name != "string" || c.name.length > 255 || !Number.isSafeInteger(c.size) || c.size < 0 || !Number.isFinite(c.modified) || typeof c.hidden != "boolean" || c.groupId !== "" && !a.has(c.groupId)) throw new Error("图片索引备份格式无效");
    u.add(c.id);
    const g = m.get(c.id), b = l(c), y = (f.get(b) || []).filter((S) => !d.has(S.id)), P = g && !d.has(g.id) ? g : w.get(b) === 1 && y.length === 1 ? y[0] : void 0;
    return P && (o++, d.add(P.id)), {
      id: c.id,
      path: P?.path || c.path,
      name: P?.name || c.name,
      size: P?.size ?? c.size,
      modified: P?.modified ?? c.modified,
      hidden: c.hidden,
      groupId: c.groupId,
      handle: P?.handle
    };
  });
  if (i.images = [...p, ...n.images.filter((c) => !d.has(c.id) && !u.has(c.id)).map((c) => ({ ...c, groupId: "" }))], i.images.length > 2e4) throw new Error("合并后的索引超过两万条，未恢复");
  return { index: i, matched: o, unmatched: p.length - o };
}
class Le {
  constructor(e) {
    this.owner = e;
  }
  open() {
    return new Promise((e, t) => {
      let r = !1;
      const i = () => {
        r || (r = !0, clearTimeout(a), t(new Error("图库句柄数据库暂不可用，请关闭占用页面后重读；未重置数据")));
      }, s = indexedDB.open(ye, 1), a = setTimeout(i, 15e3);
      s.onblocked = s.onerror = i, s.onupgradeneeded = () => {
        if (r) {
          s.transaction?.abort();
          return;
        }
        s.result.objectStoreNames.contains("handles") || s.result.createObjectStore("handles");
      }, s.onsuccess = () => {
        if (r) {
          s.result.close();
          return;
        }
        r = !0, clearTimeout(a), s.result.onversionchange = () => s.result.close(), e(s.result);
      };
    });
  }
  async readRoot() {
    const e = await this.open();
    try {
      return await new Promise((t, r) => {
        const i = e.transaction("handles", "readonly"), s = i.objectStore("handles").get("root");
        i.oncomplete = () => t(s.result || null), i.onerror = i.onabort = () => r(new Error("图库根句柄读取失败，未改用其他图库"));
      });
    } finally {
      e.close();
    }
  }
  async saveRoot(e) {
    const t = await this.open();
    try {
      await new Promise((r, i) => {
        const s = t.transaction("handles", "readwrite");
        s.objectStore("handles").put(e, "root"), s.oncomplete = () => r(), s.onerror = s.onabort = () => i(new Error("目录句柄保存未确认"));
      }), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [H]: crypto.randomUUID() });
    } finally {
      t.close();
    }
  }
  async load(e, t, r) {
    r.throwIfAborted();
    const i = await this.open();
    try {
      r.throwIfAborted();
      const s = await Ee(i, e);
      r.throwIfAborted();
      let a = await Re(i, e, ke(t, s), this.owner);
      return r.throwIfAborted(), a = await Te(i, a, t, this.owner, r), r.throwIfAborted(), a;
    } finally {
      i.close();
    }
  }
  async find(e) {
    const t = await this.open();
    try {
      return await X(t, e);
    } finally {
      t.close();
    }
  }
  async save(e) {
    const t = await this.open();
    try {
      return await N(t, e, this.owner);
    } finally {
      t.close();
    }
  }
  /** Only after the caller has confirmed successful physical removal. No delete retry. */
  async forgetDeletedImage(e, t, r) {
    const i = await this.open();
    try {
      const s = await X(i, e);
      if (!s || s.id !== t) throw new Error("图库索引已变化");
      const a = x(s);
      a.images = a.images.filter((h) => h.id !== r), await N(i, a, this.owner);
    } finally {
      i.close();
    }
  }
}
async function Me(n) {
  if (!n) return !1;
  try {
    return await n.queryPermission({ mode: "read" }) === "granted";
  } catch {
    return !1;
  }
}
async function Be(n) {
  try {
    return await n.queryPermission({ mode: "readwrite" }) === "granted" ? !0 : await n.requestPermission({ mode: "readwrite" }) === "granted";
  } catch {
    return !1;
  }
}
function T(n) {
  return n.getFile();
}
async function Fe(n, e, t, r, i) {
  const a = `${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}.${t}`;
  if (!i()) throw new Error("图库已切换，未继续写入旧目录");
  const h = await n.getFileHandle(a, { create: !0 }), o = await h.createWritable();
  try {
    await o.write(new Blob([e], { type: r })), await o.close();
  } catch (d) {
    try {
      await o.abort();
    } catch {
    }
    throw d;
  }
  return { fileName: a, handle: h };
}
async function Ue(n, e, t, r) {
  if (!e || !await n.isSameEntry(e)) throw new Error("已切换图库，未删除原图");
  const i = await n.resolve(t.handle);
  if (!i?.length || i.join("/") !== t.relPath || i.some((d) => !d || d === "." || d === ".." || /[/\\]/.test(d)))
    throw new Error("原图已移动或位置无法确认，未删除，请刷新图库");
  let s = n;
  for (const d of i.slice(0, -1)) s = await s.getDirectoryHandle(d);
  const a = i[i.length - 1], h = await s.getFileHandle(a), o = await T(h);
  if (!await h.isSameEntry(t.handle) || o.size !== t.size || o.lastModified !== t.modified || !r())
    throw new Error("原图或图库已变化，未删除，请刷新后重新确认");
  await s.removeEntry(a);
}
function se(n) {
  return /\.(png|jpe?g|gif|webp|bmp)$/i.test(n || "");
}
async function Oe(n, e = "", t = 0, r) {
  let i = 0, s = 0;
  async function a(o, d, u) {
    if (r?.throwIfAborted(), u > 6)
      return s++, null;
    const l = { handle: o, name: o.name, path: d, depth: u, directItems: [], subDirs: [], totalCount: 0 }, m = [];
    for await (const [f, w] of o.entries())
      if (r?.throwIfAborted(), !(f.startsWith(".") || f === "$RECYCLE.BIN" || f === "System Volume Information")) {
        if (w.kind === "directory") {
          const p = await a(w, d ? `${d}/${f}` : f, u + 1);
          p && l.subDirs.push(p);
        } else if (w.kind === "file" && se(f)) {
          if (++i > 2e4) throw new Error("图库超过两万张，请分库管理");
          m.push({ name: f, handle: w });
        }
      }
    for (let f = 0; f < m.length; f += 16) {
      r?.throwIfAborted();
      const w = await Promise.all(m.slice(f, f + 16).map(async ({ name: p, handle: c }) => {
        r?.throwIfAborted();
        try {
          const g = await T(c);
          return r?.throwIfAborted(), {
            file: p,
            relPath: d ? `${d}/${p}` : p,
            folderPath: d,
            folderName: o.name,
            size: g.size,
            modified: g.lastModified,
            handle: c,
            dirHandle: o
          };
        } catch {
          return r?.throwIfAborted(), s++, null;
        }
      }));
      for (const p of w) p && l.directItems.push(p);
    }
    return l.directItems.sort((f, w) => w.modified - f.modified), l.subDirs.sort((f, w) => f.name.localeCompare(w.name, "zh-CN")), l.totalCount = l.directItems.length + l.subDirs.reduce((f, w) => f + w.totalCount, 0), l;
  }
  const h = await a(n, e, t);
  return r?.throwIfAborted(), { tree: h, omissions: s };
}
function ne(n, e) {
  if (!n) return null;
  if (n.path === e) return n;
  for (const t of n.subDirs) {
    const r = ne(t, e);
    if (r) return r;
  }
  return null;
}
function ae(n) {
  return n ? [...n.directItems, ...n.subDirs.flatMap(ae)] : [];
}
function oe(n) {
  return n ? n.subDirs.length + n.subDirs.reduce((e, t) => e + oe(t), 0) : 0;
}
function A(n) {
  try {
    chrome.storage.local.set({ stickerLibraryIndexRevision: `${n}:${crypto.randomUUID()}` }).catch(() => {
    });
  } catch {
  }
}
const _e = "tab_project_stickers_v2", je = 1;
let E = null;
function ce(n) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
async function I() {
  return E || new Promise((n, e) => {
    const t = indexedDB.open(_e, je);
    t.onupgradeneeded = (r) => {
      const i = t.result;
      if (!i.objectStoreNames.contains("stickers")) {
        const s = i.createObjectStore("stickers", { keyPath: "id" });
        s.createIndex("group", "group", { unique: !1 }), s.createIndex("createdAt", "createdAt", { unique: !1 });
      }
      i.objectStoreNames.contains("groups") || i.createObjectStore("groups", { keyPath: "name" }).createIndex("order", "order", { unique: !1 });
    }, t.onsuccess = () => {
      E = t.result, E.onversionchange = () => {
        E?.close(), E = null;
      }, n(E);
    }, t.onerror = () => e(t.error);
  });
}
async function j() {
  const n = await I();
  return new Promise((e, t) => {
    const s = n.transaction("groups", "readonly").objectStore("groups").getAll();
    s.onsuccess = () => {
      const a = (s.result || []).sort((h, o) => h.order - o.order || h.name.localeCompare(o.name, "zh-CN")).map((h) => h.name);
      a.includes("默认") || a.unshift("默认"), e(a);
    }, s.onerror = () => t(s.error);
  });
}
async function qe(n, e = "external") {
  const t = n.trim();
  if (!t) return;
  const r = await I();
  return new Promise((i, s) => {
    const a = r.transaction("groups", "readwrite");
    a.objectStore("groups").add({
      name: t,
      order: Date.now(),
      createdAt: Date.now()
    }), a.oncomplete = () => {
      A(e), i();
    }, a.onerror = a.onabort = () => s(a.error || new Error("分类创建未完成"));
  });
}
async function Ve(n, e = "external") {
  if (n === "默认") return;
  const t = await I();
  return new Promise((r, i) => {
    const s = t.transaction(["groups", "stickers"], "readwrite"), a = s.objectStore("groups"), h = s.objectStore("stickers");
    let o;
    const d = a.get(n);
    d.onsuccess = () => {
      if (!d.result) {
        o = new Error("分类已被其他页面修改，请重新打开模块核对。"), s.abort();
        return;
      }
      a.delete(n);
      const u = h.index("group").openCursor(IDBKeyRange.only(n));
      u.onsuccess = () => {
        const l = u.result;
        l && (l.update({ ...l.value, group: "默认" }), l.continue());
      };
    }, s.oncomplete = () => {
      A(e), r();
    }, s.onerror = s.onabort = () => i(o || s.error || new Error("分类删除未完成"));
  });
}
async function We(n, e, t = "external") {
  if (n === "默认" || !e.trim() || e === "默认") throw new Error("默认分类不能重命名或覆盖");
  if (n === e) return;
  const r = await I();
  return new Promise((i, s) => {
    const a = r.transaction(["groups", "stickers"], "readwrite"), h = a.objectStore("groups"), o = a.objectStore("stickers"), d = h.getAll(), u = o.index("group").count(e);
    let l, m = 0;
    const f = () => {
      if (++m !== 2) return;
      const w = d.result, p = w.find((g) => g.name === n);
      if (!p || w.some((g) => g.name === e) || u.result) {
        l = new Error("分类已不存在或新名称已被使用，请重新打开模块核对。"), a.abort();
        return;
      }
      h.delete(n), h.add({ ...p, name: e });
      const c = o.index("group").openCursor(IDBKeyRange.only(n));
      c.onsuccess = () => {
        const g = c.result;
        g && (g.update({ ...g.value, group: e }), g.continue());
      };
    };
    d.onsuccess = u.onsuccess = f, a.oncomplete = () => {
      A(t), i();
    }, a.onerror = a.onabort = () => s(l || a.error || new Error("分类重命名未完成"));
  });
}
async function Ne(n, e = "external") {
  const t = await I();
  return new Promise((r, i) => {
    const s = t.transaction("groups", "readwrite"), a = s.objectStore("groups");
    let h;
    const o = a.getAll();
    o.onsuccess = () => {
      const d = o.result, u = /* @__PURE__ */ new Set(["默认", ...d.map((l) => l.name)]);
      if (n.length !== u.size || new Set(n).size !== u.size || n.some((l) => !u.has(l))) {
        h = new Error("分类列表已变化，请重新打开模块后再排序。"), s.abort();
        return;
      }
      n.forEach((l, m) => a.put({ ...d.find((f) => f.name === l) || { createdAt: Date.now() }, name: l, order: m }));
    }, s.oncomplete = () => {
      A(e), r();
    }, s.onerror = s.onabort = () => i(h || s.error || new Error("排序保存未完成"));
  });
}
async function q(n, e, t = "默认", r = "external") {
  const i = await I(), s = `stk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, a = n.type || "image/png", h = n.size, o = {
    id: s,
    name: e || `表情_${Date.now().toString().slice(-4)}`,
    group: t || "默认",
    mimeType: a,
    blob: n,
    size: h,
    createdAt: Date.now()
  };
  return new Promise((d, u) => {
    const l = i.transaction("stickers", "readwrite");
    l.objectStore("stickers").put(o), l.oncomplete = () => {
      A(r), d({
        id: o.id,
        name: o.name,
        group: o.group,
        mimeType: o.mimeType,
        size: o.size,
        sizeText: ce(o.size),
        createdAt: o.createdAt
      });
    }, l.onerror = () => u(l.error);
  });
}
async function He(n) {
  const e = await I();
  return new Promise((t, r) => {
    const i = e.transaction("stickers", "readonly"), s = i.objectStore("stickers").get(n);
    i.oncomplete = () => t(s.result), i.onerror = i.onabort = () => r(i.error || new Error("图片读取失败"));
  });
}
async function Ke(n, e, t) {
  if (t <= 0) return [];
  const r = await I();
  return new Promise((i, s) => {
    const a = r.transaction("stickers", "readonly"), h = a.objectStore("stickers").index("createdAt").openCursor(null, "prev"), o = [];
    let d = Math.max(0, e);
    h.onsuccess = () => {
      const u = h.result;
      if (!u || o.length >= t) return;
      const l = u.value;
      (!n || l.group === n) && (d ? d-- : o.push(l)), o.length < t && u.continue();
    }, a.oncomplete = () => i(o), a.onerror = a.onabort = () => s(a.error || new Error("图片分页读取失败"));
  });
}
async function Ge(n, e = "external") {
  const t = await I();
  return new Promise((r, i) => {
    const s = t.transaction("stickers", "readwrite");
    s.objectStore("stickers").delete(n), s.oncomplete = () => {
      A(e), r();
    }, s.onerror = () => i(s.error);
  });
}
async function Ye() {
  const n = await I();
  return new Promise((e, t) => {
    const r = n.transaction("stickers", "readonly"), i = r.objectStore("stickers"), s = /* @__PURE__ */ Object.create(null), a = i.count(), h = i.index("group"), o = h.openKeyCursor(null, "nextunique");
    o.onsuccess = () => {
      const d = o.result;
      if (!d) return;
      const u = String(d.key), l = h.count(d.key);
      l.onsuccess = () => {
        s[u] = l.result;
      }, d.continue();
    }, r.oncomplete = () => e({ total: a.result, groupCounts: s }), r.onerror = r.onabort = () => t(r.error || new Error("图片统计读取失败"));
  });
}
const te = 25 * 1024 * 1024;
class Ze {
  constructor(e = K, t = () => !document.hidden, r = (s) => s(), i = 1 / 0) {
    this.board = e, this.canRead = t, this.mutation = r, this.displayLimit = i, this.root = null, this.tree = null, this.sourceTree = null, this.editingFolders = !1, this.libraryIndex = null, this.ownerId = crypto.randomUUID(), this.repository = new Le(this.ownerId), this.activePath = "", this.filterSubPath = "", this.expandedPaths = /* @__PURE__ */ new Set(), this.loading = !1, this.deletingImage = !1, this.scanOmissions = 0, this.previews = new Se(), this.initialized = !1, this.disposed = !1, this.readVersion = 0, this.libraryReads = new we(), this.thumbnailVersion = 0, this.readWorkers = /* @__PURE__ */ new Set(), this.isUsingIndexedDb = !1, this.isBoardPaging = !0, this.currentPage = 1, this.pageSize = 12, this.totalPages = 1, this.toastTimer = 0;
  }
  beginLibraryRead(e) {
    return this.libraryReads.begin({
      timeoutMs: 6e4,
      isCurrent: () => !this.disposed && this.canRead() && e === this.readVersion,
      onStop: (t) => {
        this.loading = !1, this.previews.cancelPending(), this.board.updateState({ loading: !1 }), t === "timeout" && !this.disposed && this.canRead() && this.toast("图库读取超过60秒，已停止等待；请重读。原文件和已提交索引不会回滚。", !0);
      }
    });
  }
  pauseReads() {
    this.readVersion++, this.thumbnailVersion++, this.libraryReads.cancel(), this.previews.cancelPending();
    for (const e of this.readWorkers) e.abort();
    this.readWorkers.clear(), this.loading = !1, this.board.updateState({ loading: !1 });
  }
  dispose() {
    this.disposed = !0, this.pauseReads(), this.unsubscribeAction?.(), this.unsubscribeAction = void 0, this.storageListener && typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(this.storageListener), this.storageListener = void 0, clearTimeout(this.toastTimer), this.onToast = void 0, this.clearBlobUrlCache(), this.tree = null, this.sourceTree = null, this.root = null, this.libraryIndex = null, this.board.reset();
  }
  get activeFolderPath() {
    return this.activePath;
  }
  getDirectoryTree() {
    return this.tree;
  }
  getCachedFileUrl(e) {
    return this.previews.get(e);
  }
  formatSize(e) {
    const t = Number(e || 0);
    return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${Math.round(t / 1024)} KB` : `${(t / 1024 / 1024).toFixed(1)} MB`;
  }
  toast(e, t = !1) {
    if (this.disposed) return;
    if (this.onToast) {
      this.onToast(e, t);
      return;
    }
    const r = document.getElementById("sticker-toast");
    if (!r) {
      t && console.warn(`[StickersService] ${e}`);
      return;
    }
    window.clearTimeout(this.toastTimer), r.textContent = e, r.classList.toggle("bad", t), r.hidden = !1, this.toastTimer = window.setTimeout(() => {
      r.hidden = !0;
    }, 3200);
  }
  clearBlobUrlCache() {
    this.previews.clear();
  }
  openHandleDb() {
    return this.repository.open();
  }
  readSavedRoot() {
    return this.repository.readRoot();
  }
  saveRootHandle(e) {
    return this.repository.saveRoot(e);
  }
  hasPermission(e) {
    return Me(e);
  }
  async usableRoot() {
    const e = this.readVersion, t = await this.readSavedRoot();
    return this.disposed || e !== this.readVersion ? null : (this.root = t, t && await this.hasPermission(t) ? t : null);
  }
  async chooseRootFolder() {
    if (typeof window.showDirectoryPicker != "function")
      throw new Error("当前浏览器不支持文件夹授权，请使用最新版 Edge / Chrome");
    const e = await window.showDirectoryPicker({
      id: "logicweaver-stickers",
      mode: "read",
      startIn: "pictures"
    });
    this.clearBlobUrlCache(), await this.saveRootHandle(e), this.root = e;
    let t = e.name;
    typeof chrome < "u" && chrome?.storage?.local && (await chrome.storage.local.get([R]), t = e.name, await chrome.storage.local.set({
      [k]: e.name,
      [R]: t
    })), this.toast(`已关联本地文件夹「${t}」`), await this.loadLibrary();
  }
  async authorizeOrChooseRoot() {
    if (this.root && !await this.hasPermission(this.root))
      try {
        if (await this.root.requestPermission({ mode: "read" }) === "granted") {
          this.toast(`已恢复「${this.root.name}」读取授权`), await this.loadLibrary(this.activePath);
          return;
        }
      } catch {
      }
    await this.chooseRootFolder();
  }
  supportedFileName(e) {
    return se(e);
  }
  validPackName(e) {
    const t = String(e || "").trim();
    return !t || t.length > 50 || /[<>:"/\\|?*\u0000-\u001f]/.test(t) || /[. ]$/.test(t) || t === "." || t === ".." || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(t) ? "" : t;
  }
  /**
   * 递归遍历多层子文件夹并并发解析文件属性
   */
  async scanDirectoryTree(e, t = "", r = 0, i) {
    const s = await Oe(e, t, r, i);
    return this.scanOmissions = s.omissions, s.tree;
  }
  findNodeByPath(e, t) {
    return ne(e, t);
  }
  collectAllItems(e) {
    return ae(e);
  }
  countTotalFolders(e) {
    return oe(e);
  }
  async loadLibrary(e = "") {
    if (this.disposed || !this.canRead()) return;
    this.pauseReads();
    const t = this.beginLibraryRead(this.readVersion);
    if (!t.current()) return;
    this.loading = !0, this.libraryIndex = null, this.tree = null, this.sourceTree = null, this.clearBlobUrlCache(), this.board.updateState({ loading: !0, items: [], libraryImageCount: null, needsReadPermission: !1 });
    const r = t.current;
    try {
      const i = await t.wait(() => typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.get([k, R, B, $]) : Promise.resolve({}));
      if (!r()) return;
      const s = await t.wait(() => this.readSavedRoot());
      if (!r()) return;
      this.root = s, this.board.updateState({
        storageKind: s || i[k] ? "directory" : null,
        rootName: s?.name || String(i[k] || "")
      });
      const a = s ? await t.wait(() => this.hasPermission(s)) : !1;
      if (!r()) return;
      if (s && !a || !s && i[k]) {
        this.isUsingIndexedDb = !1, this.tree = null, this.libraryIndex = null, this.clearBlobUrlCache(), this.board.updateState({
          storageKind: "directory",
          hasFolder: !1,
          needsReadPermission: !0,
          libraryImageCount: null,
          items: [],
          folders: [],
          subFolders: [],
          folderPath: "图库目录需要重新授权",
          emptyText: "本地图库未获读取授权，请在设置 → 本地图库中授权；没有切换到内置库。"
        });
        return;
      }
      if (!s) {
        this.isUsingIndexedDb = !0, await this.loadIndexedDbLibrary(e || this.activePath || "");
        return;
      }
      this.isUsingIndexedDb = !1;
      const h = await t.wait(() => this.scanDirectoryTree(s, "", 0, t.signal));
      if (!r()) return;
      if (!h) throw new Error("图库目录无法扫描");
      const o = await t.wait(() => this.repository.load(s, h, t.signal));
      if (!r()) return;
      this.clearBlobUrlCache(), this.libraryIndex = o, this.sourceTree = h;
      const d = Q(o, h);
      this.tree = d, Array.isArray(i[$]) && (this.expandedPaths = new Set(i[$])), this.expandedPaths.size === 0 && d && this.expandedPaths.add("");
      let u = e || this.activePath || i[B] || "";
      for (; u && !this.findNodeByPath(d, u); )
        u = u.includes("/") ? u.slice(0, u.lastIndexOf("/")) : "";
      this.activePath = u, this.filterSubPath = "", this.currentPage = 1;
      const l = i[R] || s?.name || "", m = this.countTotalFolders(d);
      this.board.updateState({
        storageKind: "directory",
        hasFolder: !!s,
        folderPath: s && d ? `已挂载本地目录：${l}（${m} 个虚拟分类 · ${d.totalCount} 张图片）` : l ? `已配置路径「${l}」，请显式授权访问` : "尚未选择本地文件夹",
        folderSummary: `${m} 个虚拟分类 · ${d?.totalCount || 0} 张图片`
      }), this.renderTree(), this.renderItems(), this.scanOmissions && this.toast(`有 ${this.scanOmissions} 个文件或过深目录未能读取，扫描限6层；原文件与旧索引保留。`, !0);
    } catch {
      r() && this.toast("目录读取失败，请重载表情包模块后重试；若仍失败，请检查浏览器目录访问授权。", !0);
    } finally {
      t.finish() && (this.loading = !1, this.board.updateState({ loading: !1 }));
    }
  }
  renderTree() {
    this.syncStickerTreeToVue();
  }
  syncStickerTreeToVue() {
    if (!this.tree) {
      this.board.updateState({
        hasFolder: !1,
        libraryImageCount: null,
        folderSummary: "0 个分类",
        folders: []
      });
      return;
    }
    const e = [];
    e.push({
      name: `全部 / 根目录 (${this.tree.name})`,
      path: "",
      depth: 0,
      itemCount: this.tree.totalCount || 0,
      subDirs: this.tree.subDirs || [],
      isExpanded: !0
    });
    const t = (r, i) => {
      r.forEach((s) => {
        const a = this.expandedPaths.has(s.path);
        e.push({
          name: s.name,
          path: s.path,
          depth: i,
          itemCount: s.totalCount || (s.directItems ? s.directItems.length : 0),
          subDirs: s.subDirs || [],
          isExpanded: a
        }), s.subDirs?.length > 0 && t(s.subDirs, i + 1);
      });
    };
    t(this.tree.subDirs, 1), this.board.updateState({
      hasFolder: !0,
      libraryImageCount: this.tree.totalCount,
      folderSummary: `${Math.max(0, e.length - 1)} 个分类 · ${this.tree.totalCount} 张图片`,
      activePath: this.activePath,
      folders: e
    });
  }
  renderItems() {
    if (this.disposed || !this.canRead()) return;
    if (!this.tree) {
      this.syncStickerItemsToVue([], null);
      return;
    }
    const e = this.findNodeByPath(this.tree, this.activePath) || this.tree;
    let t = e?.path === "" ? this.collectAllItems(e) : e?.directItems || [];
    e && t.length === 0 && (e.totalCount || 0) > 0 && (t = this.collectAllItems(e)), this.syncStickerItemsToVue(t, e);
  }
  syncStickerItemsToVue(e = [], t = null) {
    if (!t) {
      this.board.updateState({
        displayTitle: "请选择文件夹",
        breadcrumb: "",
        totalCountText: "0 张",
        subnavPills: [],
        items: [],
        hasMore: !1,
        emptyText: this.root ? "未找到该分类，请在左侧重新选择" : "图片库尚未就绪，请重新加载页面或重载表情包模块后重试"
      });
      return;
    }
    const r = t.path ? t.name : "全部 / 根目录", i = t.path ? `(${t.path.replace(/\//g, " > ")})` : "", s = `明确导入才写入原图库，并归入「${r}」虚拟分类`, a = e.length;
    let h = 1;
    if (this.isBoardPaging) {
      h = Math.max(1, Math.ceil(a / this.pageSize)), this.currentPage > h && (this.currentPage = h), this.currentPage < 1 && (this.currentPage = 1);
      const c = (this.currentPage - 1) * this.pageSize;
      e = e.slice(c, c + this.pageSize);
    } else
      e = e.slice(0, this.displayLimit);
    this.totalPages = h;
    const o = this.isBoardPaging ? a > this.pageSize ? `${a} 张 · 第 ${this.currentPage} / ${h} 页` : `${a} 张` : a > e.length ? `${a} 张 · 已显示 ${e.length} 张` : `${a} 张`;
    this.previews.retain(new Set(e.map((c) => c.relPath)));
    const d = [{ name: "根目录", path: "" }];
    let u = null;
    if (t.path) {
      const c = t.path.split("/");
      let g = "";
      c.forEach((b, y) => {
        g = g ? `${g}/${b}` : b, d.push({ name: b, path: g }), y === c.length - 2 && (u = g);
      }), c.length === 1 && (u = "");
    }
    const l = [];
    t.subDirs && t.subDirs.length > 0 && t.subDirs.forEach((c) => {
      l.push({
        name: c.name,
        path: c.path,
        count: c.totalCount || (c.directItems || []).length
      });
    });
    const m = [];
    t.subDirs && t.subDirs.length > 0 && (m.push({
      name: "当前文件夹",
      path: t.path,
      count: (t.directItems || []).length,
      isActive: this.filterSubPath === ""
    }), t.subDirs.forEach((c) => {
      m.push({
        name: c.name,
        path: c.path,
        count: (c.directItems || []).length,
        isActive: this.filterSubPath === c.path
      });
    }));
    const f = e.map((c) => {
      const g = this.previews.get(c.relPath);
      return {
        id: c.id || c.relPath || c.file,
        file: c.file,
        relPath: c.relPath,
        folderName: c.folderName && c.folderName !== t.name ? c.folderName : "",
        size: c.size || 0,
        sizeText: this.formatSize(c.size),
        url: g
      };
    });
    this.board.updateState({
      hasFolder: !!this.root,
      activePath: this.activePath,
      displayTitle: r,
      breadcrumb: i,
      breadcrumbs: d,
      parentPath: u,
      subFolders: l,
      dropPrompt: s,
      totalCountText: o,
      hasMore: this.isBoardPaging ? this.currentPage < h : a > e.length,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalPages: h,
      totalCount: a,
      subnavPills: m,
      items: f,
      emptyText: f.length || l.length ? "" : this.root ? "当前文件夹暂无图片 · 可直接拖入" : "图片库尚未就绪，请重新加载页面或重载表情包模块后重试"
    });
    const w = e.filter((c) => !this.previews.has(c.relPath)), p = ++this.thumbnailVersion;
    (async () => {
      for (let c = 0; c < w.length; c += 2) {
        if (this.disposed || !this.canRead() || p !== this.thumbnailVersion || (await Promise.all(w.slice(c, c + 2).map(async (g) => {
          try {
            const b = await this.previews.prepare(
              g.relPath,
              () => T(g.handle),
              () => !this.disposed && this.canRead() && p === this.thumbnailVersion
            );
            if (!b || this.disposed || !this.canRead() || p !== this.thumbnailVersion) return;
            const y = this.board.state.items.find((P) => P.id === (g.id || g.relPath || g.file));
            y && (y.url = b);
          } catch {
          }
        })), this.disposed || !this.canRead() || p !== this.thumbnailVersion)) return;
        this.board.updateState({ items: [...this.board.state.items] });
      }
    })();
  }
  /** Deletes only the confirmed disk image, never a category directory. */
  async deleteStickerFile(e, t = !1) {
    const r = this.collectAllItems(this.tree).filter((i) => i.relPath === e || !t && i.file === e);
    return r.length !== 1 || !r[0].id || !this.libraryIndex ? !1 : this.mutation(() => this.deleteDirectoryImage(r[0].id));
  }
  async deleteDirectoryImage(e) {
    if (this.deletingImage || pe.isOpen) throw new Error("请先完成当前操作");
    const t = this.root, r = this.libraryIndex, i = this.readVersion, s = this.collectAllItems(this.tree).find((l) => l.id === e);
    if (!t || !r || !s || this.isUsingIndexedDb) throw new Error("图库已变化，请刷新后重试");
    const a = s.relPath, h = s.size, o = s.modified, d = () => !this.disposed && this.canRead() && this.root === t && this.libraryIndex?.id === r.id && this.readVersion === i;
    this.deletingImage = !0;
    let u = !1;
    try {
      if (!await be.confirm({
        title: "删除磁盘原图",
        danger: !0,
        confirmText: "永久删除原图",
        message: `将真正删除图库中的「${a}」。通常不进入系统回收站，无法通过分类索引备份或“恢复显示”找回。其他分类操作不会删除原图。确定删除这一张图片？`
      })) return !1;
      if (!d()) throw new Error("图库或页面状态已变化，未删除原图");
      if (!await this.ensureHandlePermission(t)) throw new Error("未获得写入权限，未删除原图");
      if (!d()) throw new Error("图库或页面状态已变化，未删除原图");
      const l = await this.readSavedRoot();
      return await Ue(t, l, { relPath: a, size: h, modified: o, handle: s.handle }, d), u = !0, await this.repository.forgetDeletedImage(t, r.id, e), this.toast("已删除磁盘原图，分类索引备份不能恢复此文件"), !0;
    } catch (l) {
      throw u ? new Error("磁盘原图已删除，但索引清理未确认；请刷新图库核对，不要重复删除") : new Error(l?.message || "删除未确认，请刷新核对；未自动重试");
    } finally {
      if (this.deletingImage = !1, u) {
        try {
          await chrome.storage.local.set({ [F]: `${this.ownerId}:${crypto.randomUUID()}` });
        } catch {
        }
        !this.disposed && this.canRead() && await this.loadLibrary();
      }
    }
  }
  async copyBlob(e, t) {
    if (this.disposed || !this.canRead() || t !== this.readVersion) return !1;
    if (e.type !== "image/png") {
      const r = await createImageBitmap(e);
      try {
        const i = document.createElement("canvas");
        i.width = r.width, i.height = r.height, i.getContext("2d")?.drawImage(r, 0, 0), e = await new Promise((s, a) => i.toBlob((h) => h ? s(h) : a(new Error("图片转换失败")), "image/png"));
      } finally {
        r.close();
      }
    }
    return this.disposed || !this.canRead() || t !== this.readVersion ? !1 : (await navigator.clipboard.write([new ClipboardItem({ "image/png": e })]), !this.disposed && this.canRead() && t === this.readVersion);
  }
  async copySticker(e) {
    const t = this.readVersion;
    try {
      const r = await T(e);
      return this.disposed || !this.canRead() || t !== this.readVersion ? !1 : await this.copyBlob(r, t);
    } catch {
      return !this.disposed && this.canRead() && t === this.readVersion && this.toast("复制失败，请检查图片和剪贴板权限。", !0), !1;
    }
  }
  async copyStickerFromUrl(e) {
    const t = this.readVersion, r = new AbortController();
    this.readWorkers.add(r);
    try {
      const i = await fetch(e, { signal: AbortSignal.any([r.signal, AbortSignal.timeout(15e3)]), credentials: "omit", redirect: "error" });
      if (!i.ok) throw new Error("图片读取失败");
      return await this.copyBlob(await i.blob(), t);
    } catch {
      return !this.disposed && this.canRead() && t === this.readVersion && this.toast("图片读取或复制失败。", !0), !1;
    } finally {
      this.readWorkers.delete(r);
    }
  }
  async readItemBlob(e) {
    const t = this.readVersion;
    let r;
    if (this.isUsingIndexedDb) r = (await He(e.id))?.blob;
    else {
      const i = this.collectAllItems(this.tree).find((s) => s.id === e.id);
      i && (r = await T(i.handle));
    }
    if (!r || !r.size || r.size > te || this.disposed || !this.canRead() || t !== this.readVersion) throw new Error("图片已变化或目录不可读，请刷新图库");
    return r;
  }
  async copyItem(e) {
    const t = this.readVersion;
    try {
      return await this.copyBlob(await this.readItemBlob(e), t);
    } catch {
      return this.toast("原图读取或复制失败，请检查目录与剪贴板权限。", !0), !1;
    }
  }
  enableBoardPaging() {
    this.isBoardPaging = !0, this.displayLimit = 12, this.currentPage = 1;
  }
  prevPage() {
    this.currentPage > 1 && (this.currentPage--, this.isUsingIndexedDb ? this.loadIndexedDbLibrary(this.activePath) : this.renderItems());
  }
  nextPage() {
    this.currentPage < this.totalPages && (this.currentPage++, this.isUsingIndexedDb ? this.loadIndexedDbLibrary(this.activePath) : this.renderItems());
  }
  goToPage(e) {
    const t = Math.max(1, Math.min(e, this.totalPages));
    t !== this.currentPage && (this.currentPage = t, this.isUsingIndexedDb ? this.loadIndexedDbLibrary(this.activePath) : this.renderItems());
  }
  showMore() {
    this.nextPage();
  }
  async saveBlobToDir(e, t, r) {
    const i = this.libraryIndex;
    if (!i || !await i.root.isSameEntry(e)) throw new Error("图库索引尚未就绪或目录已切换，未写入原图");
    if (i.images.length >= 2e4) throw new Error("图库索引达到两万条，未写入新文件，请先分库管理");
    const s = L(i, this.activePath);
    try {
      if (!await this.ensureHandlePermission(e)) throw new Error("未获得用户授予的写入权限");
      const [a, h] = await this.detectImage(t), { fileName: o, handle: d } = await Fe(
        e,
        t,
        a,
        h,
        () => this.libraryIndex?.id === i.id
      );
      if (i && await i.root.isSameEntry(e)) {
        const u = await T(d), l = x(i);
        l.images.push({
          id: `image_${crypto.randomUUID()}`,
          path: o,
          name: o,
          size: u.size,
          modified: u.lastModified,
          groupId: s,
          hidden: !1,
          handle: d
        }), await this.commitIndex(l);
      }
      this.toast(`已保存图片到原图库并加入「${r}」分类`);
    } catch (a) {
      throw this.toast("图片保存失败，可能已有部分文件完成，请核对后再操作。", !0), a;
    }
  }
  async saveFilesToDir(e, t, r) {
    if (t.length > 50) throw new Error("一次最多导入50张，请分批选择");
    for (const i of [...t])
      await this.saveBlobToDir(e, i, r);
    await this.loadLibrary(this.activePath);
  }
  async saveUrlToDir(e, t, r) {
    try {
      if (!await this.ensureHandlePermission(e)) throw new Error("未获得图库写入授权");
      if (String(t).startsWith("data:image/")) {
        await this.saveBlobToDir(e, await (await fetch(t)).blob(), r), await this.loadLibrary(this.activePath);
        return;
      }
      const i = this.assertPublicHttps(t);
      this.toast("正在读取图片…");
      const s = await fetch(i, { credentials: "omit", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15e3) });
      if (!s.ok) throw new Error(`图片请求失败（HTTP ${s.status}）`);
      await this.saveBlobToDir(e, await s.blob(), r), await this.loadLibrary(this.activePath);
    } catch (i) {
      throw this.toast("图片读取或保存失败，未自动重试。", !0), i;
    }
  }
  getActiveTargetHandle() {
    if (!this.tree) return null;
    if (this.filterSubPath) {
      const t = this.findNodeByPath(this.tree, this.filterSubPath);
      if (t) return { handle: t.handle, name: t.name };
    }
    const e = this.findNodeByPath(this.tree, this.activePath);
    return e ? { handle: e.handle, name: e.name } : this.root ? { handle: this.root, name: this.tree.name } : null;
  }
  ensureHandlePermission(e) {
    return Be(e);
  }
  async getFavoritesDirectoryHandle() {
    if (this.root || (this.root = await this.readSavedRoot()), !this.root) return null;
    try {
      return this.root;
    } catch {
      return this.root;
    }
  }
  extractImageUrlFromTransfer(e) {
    const t = e.getData("text/html") || "", r = (e.getData("text/uri-list") || e.getData("text/plain") || "").trim(), i = t + `
` + r, s = i.match(/(?:https?:)?\/\/[^\s"'()<>&;]+\.gif(?:@[^\s"'()<>&;]*)?/i);
    if (s) {
      let d = s[0];
      return d.startsWith("//") && (d = "https:" + d), d.replace(/@[^/?#]+$/i, "");
    }
    if (t)
      try {
        const d = new DOMParser().parseFromString(t, "text/html"), u = d.querySelector("img[src], img[data-src]");
        if (u) {
          let f = u.getAttribute("src") || u.getAttribute("data-src") || "";
          if (f)
            return f.startsWith("//") && (f = "https:" + f), f.includes("hdslb.com/bfs/") ? f.replace(/@[^/?#]+$/i, "") : f;
        }
        const l = d.querySelector("source:not([type*='avif'])[srcset]");
        if (l) {
          let w = (l.getAttribute("srcset") || "").split(",")[0].trim().split(" ")[0];
          return w.startsWith("//") && (w = "https:" + w), w.includes("hdslb.com/bfs/") ? w.replace(/@[^/?#]+$/i, "") : w;
        }
        const m = d.querySelector("[style*='background-image'], [style*='url']");
        if (m) {
          const w = (m.getAttribute("style") || "").match(/url\(["']?([^"')]+)["']?\)/i);
          if (w) {
            let p = w[1];
            return p.startsWith("//") && (p = "https:" + p), p.includes("hdslb.com/bfs/") ? p.replace(/@[^/?#]+$/i, "") : p;
          }
        }
      } catch {
      }
    const a = i.match(/(?:https?:)?\/\/[a-zA-Z0-9.-]*hdslb\.com\/bfs\/[^\s"'()<>&;]+/i);
    if (a) {
      let d = a[0];
      return d.startsWith("//") && (d = "https:" + d), d.replace(/@[^/?#]+$/i, "");
    }
    const h = i.match(/(?:https?:)?\/\/[^\s"'()<>&;]+\.(?:png|jpe?g|gif|webp|bmp)(?:@[^\s"'()<>&;]*)?/i);
    if (h) {
      let d = h[0];
      return d.startsWith("//") && (d = "https:" + d), d.replace(/@[^/?#]+$/i, "");
    }
    if (/^https?:\/\/[^\s]+$/i.test(r))
      return r.includes("hdslb.com/bfs/") ? r.replace(/@[^/?#]+$/i, "") : r;
    const o = i.match(/data:image\/[a-zA-Z0-9+.-]+;base64,[a-zA-Z0-9+/=]+/i);
    return o ? o[0] : null;
  }
  /**
   * 极速直落「新标签页/收藏夹」引擎
   * 通过后台 Junction 物理直写（0 弹窗、0 交互门槛、100% 成功落盘）
   */
  async saveImageToDiskSafe(e) {
    let t = e.dataUrl;
    if (!t && e.file ? t = await new Promise((r) => {
      const i = new FileReader();
      i.onload = () => r(String(i.result || "")), i.readAsDataURL(e.file);
    }) : !t && e.blob && (t = await new Promise((r) => {
      const i = new FileReader();
      i.onload = () => r(String(i.result || "")), i.readAsDataURL(e.blob);
    })), typeof chrome < "u" && chrome?.runtime?.sendMessage)
      try {
        const r = await new Promise((i) => {
          chrome.runtime.sendMessage(
            {
              type: "saveToFavorites",
              url: e.url,
              dataUrl: t
            },
            (s) => i(s)
          );
        });
        return { ok: !!r?.ok, error: r?.error };
      } catch (r) {
        return console.warn("[saveImageToDiskSafe] 写入异常:", r), { ok: !1, error: r?.message };
      }
    return { ok: !1, error: "环境不支持" };
  }
  async saveImageToFavoritesAny(e) {
    if ((!this.tree || !this.libraryIndex) && await this.loadLibrary(this.activePath), !this.isUsingIndexedDb && (!this.root || !this.libraryIndex || !this.tree)) return { ok: !1, error: "请先在设置中授权并读取本地图库；未写入图片或切换存储位置" };
    if (!this.isUsingIndexedDb && this.root && !await this.ensureHandlePermission(this.root)) return { ok: !1, error: "需要用户明确授予图库写入权限" };
    try {
      let t = e.blob || e.file;
      if (!t && (e.url || e.dataUrl)) {
        const r = e.dataUrl || this.assertPublicHttps(e.url), i = await fetch(r, { credentials: "omit", redirect: "error", signal: AbortSignal.timeout(15e3) });
        if (!i.ok) throw new Error("图片读取失败");
        t = await i.blob();
      }
      if (!t) throw new Error("未提供图片");
      return await this.detectImage(t), this.isUsingIndexedDb ? (await q(t, e.file?.name || "收藏图片", this.activePath || "默认", this.ownerId), await this.loadIndexedDbLibrary(this.activePath)) : (await this.saveBlobToDir(this.root, t, this.tree?.name || "本地图库"), await this.loadLibrary(this.activePath)), { ok: !0 };
    } catch {
      return { ok: !1, error: "图片读取或保存未确认，请核对图库；未自动重试或回退其他目录" };
    }
  }
  async handleDropToFavorites(e) {
    let t = 0;
    const r = this.extractImageUrlFromTransfer(e);
    if (r) {
      const i = await this.saveImageToFavoritesAny({ url: r });
      if (i.ok)
        t++;
      else
        throw new Error(i.error || "图片下载并写入磁盘失败，请重试");
    }
    if (t === 0 && e.files && e.files.length > 0)
      for (const i of [...e.files])
        (i.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(i.name)) && (await this.saveImageToFavoritesAny({ file: i })).ok && t++;
    if (t === 0 && e.items && e.items.length > 0) {
      for (const i of [...e.items])
        if (i.kind === "file" && i.type.startsWith("image/")) {
          const s = i.getAsFile();
          s && (await this.saveImageToFavoritesAny({ file: s })).ok && t++;
        }
    }
    if (t > 0) {
      const i = `✓ 已成功存入当前图库 (${t} 张)`;
      return this.toast(i), { ok: !0, count: t, message: i };
    } else
      throw new Error("未能识别到有效图片内容，请直接从网页按住图片拖过来");
  }
  /**
   * 支持通过剪贴板 Ctrl+V 粘贴直接存入收藏夹
   */
  async handlePasteToFavorites(e) {
    return this.handleDropToFavorites(e);
  }
  async detectImage(e) {
    if (e.size <= 0 || e.size > te) throw new Error("图片大小须在 25MB 以内");
    const t = new Uint8Array(await e.slice(0, 16).arrayBuffer());
    let r = "";
    for (let i = 0; i < t.length; i++)
      r += String.fromCharCode(t[i]);
    if (t[0] === 137 && r.slice(1, 4) === "PNG") return ["png", "image/png"];
    if (t[0] === 255 && t[1] === 216 && t[2] === 255) return ["jpg", "image/jpeg"];
    if (r.startsWith("GIF87a") || r.startsWith("GIF89a")) return ["gif", "image/gif"];
    if (r.startsWith("RIFF") && r.slice(8, 12) === "WEBP") return ["webp", "image/webp"];
    if (r.startsWith("BM")) return ["bmp", "image/bmp"];
    throw new Error("文件不是受支持的 PNG/JPEG/GIF/WebP/BMP 图片");
  }
  assertPublicHttps(e) {
    const t = new URL(e);
    if (t.protocol !== "https:" || t.username || t.password) throw new Error("只支持不带账号密码的 HTTPS 图片链接");
    const r = t.hostname.toLowerCase();
    if (r === "localhost" || r === "0.0.0.0" || r === "::1" || /^127\./.test(r) || /^10\./.test(r) || /^192\.168\./.test(r) || /^169\.254\./.test(r) || /^172\.(1[6-9]|2\d|3[01])\./.test(r))
      throw new Error("不允许访问本机或内网地址");
    return t.href;
  }
  droppedUrl(e) {
    const t = String(e.getData("text/uri-list") || "").split(/\r?\n/).find((s) => s && !s.startsWith("#"));
    if (t) return t;
    const r = e.getData("text/html");
    if (r) {
      const s = new DOMParser().parseFromString(r, "text/html").querySelector("img")?.src;
      if (s) return s;
    }
    const i = String(e.getData("text/plain") || "").trim();
    return /^https:\/\//i.test(i) || i.startsWith("data:image/") ? i : "";
  }
  attachBoard() {
    return this.unsubscribeAction || (this.unsubscribeAction = this.board.onAction((e, t) => {
      const r = async () => {
        if (e === "choose-folder")
          await this.authorizeOrChooseRoot();
        else if (e === "load-more")
          this.showMore();
        else if (e === "prev-page")
          this.prevPage();
        else if (e === "next-page")
          this.nextPage();
        else if (e === "go-page")
          this.goToPage(Number(t) || 1);
        else if (e === "refresh")
          this.loadLibrary(this.activePath);
        else if (e === "rename-folder" || e === "delete-folder" || e === "reorder-folders")
          await this.editFolder(e, t);
        else if (e === "create-folder") {
          if (this.isUsingIndexedDb) {
            const o = String(t || "").trim();
            if (!this.validPackName(o) || o === "全部") throw new Error("分类名称无效，不能使用保留名称“全部”。");
            if ((await j()).includes(o)) throw new Error("已有同名分类");
            await qe(o, this.ownerId), this.toast(`已创建分类「${o}」`), await this.loadIndexedDbLibrary(o);
            return;
          }
          const i = this.validPackName(t);
          if (!i || i === "全部") throw new Error("分类名称无效");
          if (!this.libraryIndex) throw new Error("请先授权并读取图库");
          const s = Ae(this.libraryIndex, this.activePath, i), a = s.groups[s.groups.length - 1], h = this.activePath ? `${this.activePath}/${a.id}` : a.id;
          await this.commitIndex(s, h);
        } else if (e === "select-folder" || e === "select-pill") {
          if (this.currentPage = 1, this.isUsingIndexedDb) {
            const s = String(t ?? "");
            await this.loadIndexedDbLibrary(s);
            return;
          }
          const i = String(t || "");
          typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [B]: i }), Number.isFinite(this.displayLimit) && (this.displayLimit = 12), this.activePath = i, this.filterSubPath = "", this.renderTree(), this.renderItems();
        } else if (e === "toggle-expand") {
          const i = String(t || ""), s = new Set(this.expandedPaths);
          s.has(i) ? s.delete(i) : s.add(i), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [$]: [...s] }), this.expandedPaths = s, this.renderTree();
        } else if (e === "pick-files")
          document.getElementById("sticker-file-input")?.click();
        else if (e === "copy-item")
          t && await this.copyItem(t);
        else if (e === "assign-item") {
          const i = t?.item;
          if (!this.libraryIndex || !i?.id || this.isUsingIndexedDb) throw new Error("该操作需要已授权的本地图库");
          await this.commitIndex(Ce(this.libraryIndex, i.id, String(t?.path || "")));
        } else if (e === "delete-item") {
          const i = t;
          if (this.isUsingIndexedDb) {
            i?.id && (await Ge(i.id, this.ownerId), this.previews.delete(i.id), this.toast("已删除表情"), await this.loadIndexedDbLibrary(this.activePath));
            return;
          }
          if (!this.libraryIndex || !i?.id) throw new Error("图库索引尚未就绪");
          await this.deleteDirectoryImage(i.id);
        }
      };
      return ["refresh", "load-more", "prev-page", "next-page", "go-page", "copy-item", "pick-files"].includes(e) ? r() : this.mutation(r);
    })), () => {
      this.unsubscribeAction?.(), this.unsubscribeAction = void 0;
    };
  }
  init() {
    this.initialized || this.disposed || (this.initialized = !0, this.storageListener = (e, t) => {
      if (t !== "local") return;
      const r = e[F]?.newValue;
      typeof r == "string" && r.startsWith(`${this.ownerId}:`) || (k in e || R in e || H in e || F in e) && (this.pauseReads(), this.clearBlobUrlCache(), this.root = null, this.tree = null, this.board.updateState({ hasFolder: !1, rootName: "", libraryImageCount: null, needsReadPermission: !1, items: [], folders: [], folderPath: "目录配置已变更，旧列表已失效" }), this.canRead() && this.loadLibrary(this.activePath));
    }, typeof chrome < "u" && chrome.storage?.onChanged?.addListener(this.storageListener), this.loadLibrary());
  }
  activate() {
    if (!(this.disposed || !this.canRead())) {
      if (!this.tree) {
        this.loadLibrary(this.activePath);
        return;
      }
      if (this.isUsingIndexedDb) {
        this.loadIndexedDbLibrary(this.activePath);
        return;
      }
      this.renderTree(), this.renderItems();
    }
  }
  async loadIndexedDbLibrary(e = "") {
    if (this.disposed || !this.canRead()) return;
    const t = this.beginLibraryRead(++this.readVersion), r = t.current;
    if (r()) {
      this.loading = !0, this.previews.cancelPending(), this.board.updateState({ loading: !0 });
      try {
        const i = await t.wait(() => j());
        if (!r()) return;
        const s = await t.wait(() => Ye());
        if (!r()) return;
        const a = i.includes(e) ? e : "";
        this.activePath = a;
        const h = i.map((c) => ({
          name: c,
          path: c,
          depth: 0,
          itemCount: s.groupCounts[c] || 0,
          subDirs: [],
          isExpanded: !1
        })), o = a ? s.groupCounts[a] || 0 : s.total, d = this.isBoardPaging ? this.pageSize : Math.min(this.displayLimit, 120);
        this.currentPage = Math.max(1, Math.min(this.currentPage, Math.max(1, Math.ceil(o / this.pageSize))));
        const u = await t.wait(() => Ke(a || void 0, this.isBoardPaging ? (this.currentPage - 1) * this.pageSize : 0, d));
        if (!r()) return;
        const l = o;
        let m = u, f = 1;
        this.isBoardPaging && (f = Math.max(1, Math.ceil(l / this.pageSize)), this.currentPage > f && (this.currentPage = f), this.currentPage < 1 && (this.currentPage = 1)), this.totalPages = f, this.previews.retain(new Set(m.map((c) => c.id)));
        const w = [];
        for (let c = 0; c < m.length; c += 2) {
          const g = await t.wait(() => Promise.all(m.slice(c, c + 2).map(async (b) => {
            let y = "";
            try {
              y = await this.previews.prepare(
                b.id,
                async () => b.blob,
                r
              );
            } catch {
            }
            return {
              id: b.id,
              file: b.name,
              relPath: `${b.group}/${b.name}`,
              folderName: b.group,
              size: b.size,
              sizeText: ce(b.size),
              url: y
            };
          })));
          if (!r()) return;
          w.push(...g.filter((b) => !!b));
        }
        if (!r()) return;
        const p = this.isBoardPaging ? l > this.pageSize ? `${l} 张 · 第 ${this.currentPage} / ${f} 页` : `${l} 张` : `${l} 张`;
        this.board.updateState({
          storageKind: "indexeddb",
          hasFolder: !0,
          rootName: "",
          libraryImageCount: s.total,
          needsReadPermission: !1,
          folderPath: "内置本地沙箱 (免文件夹授权)",
          folderSummary: `${i.length} 个分类 · ${s.total} 张表情`,
          activePath: a,
          displayTitle: a ? `分类：${a}` : "全部表情",
          breadcrumb: a,
          breadcrumbs: [{ name: "表情包库", path: "默认" }, { name: a, path: a }],
          parentPath: null,
          subFolders: h.map((c) => ({ name: c.name, path: c.path, count: c.itemCount })),
          dropPrompt: `拖入图片直接保存到「${a || "默认"}」分类`,
          totalCountText: p,
          folders: [{ name: "全部表情", path: "", depth: 0, itemCount: s.total, subDirs: [] }, ...h],
          subnavPills: [],
          items: w,
          emptyText: w.length === 0 ? "暂无表情包，可直接从网页或电脑拖入图片保存" : "",
          loading: !1,
          hasMore: this.isBoardPaging ? this.currentPage < f : !1,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalPages: f,
          totalCount: l
        });
      } catch {
        if (!r()) return;
        this.board.updateState({ loading: !1, emptyText: "读取表情包数据库失败" });
      } finally {
        t.finish() && (this.loading = !1, this.board.updateState({ loading: !1 }));
      }
    }
  }
  async commitIndex(e, t = this.activePath) {
    const r = await this.repository.save(e);
    this.disposed || this.libraryIndex?.id !== r.id || (this.libraryIndex = r, this.sourceTree && (this.tree = Q(r, this.sourceTree)), this.board.updateState({ folderSummary: `${r.groups.length} 个分类 · ${this.tree?.totalCount || 0} 张图片` }), this.activePath = t, this.currentPage = 1, this.clearBlobUrlCache(), this.canRead() && (this.renderTree(), this.renderItems()));
  }
  async revealHiddenImages() {
    if (!this.libraryIndex) throw new Error("请先读取本地图库");
    const e = x(this.libraryIndex);
    e.images.forEach((t) => {
      t.hidden = !1;
    }), await this.commitIndex(e);
  }
  async exportIndexBackup() {
    if (this.libraryIndex) return ee(this.libraryIndex);
    const e = await this.readSavedRoot();
    if (!e) throw new Error("没有已关联的目录句柄，未猜测其他图库");
    const t = await this.repository.find(e);
    if (!t) throw new Error("此目录尚未建立分类索引，请先授权读取");
    return ee(t);
  }
  async restoreIndexBackup(e) {
    if (!this.libraryIndex) throw new Error("请先读取已授权的本地图库");
    if (!this.sourceTree) throw new Error("请先刷新图库再恢复索引");
    const t = new Set(this.collectAllItems(this.sourceTree).map((i) => i.id || "")), r = ze(this.libraryIndex, e, t);
    return await this.commitIndex(r.index, ""), { matched: r.matched, unmatched: r.unmatched };
  }
  /** Virtual classification edits never touch disk directories or originals. */
  async editFolder(e, t) {
    if (this.disposed || !this.canRead() || this.editingFolders || this.loading) throw new Error("目录正在读取或保存，请稍候再操作。");
    this.editingFolders = !0;
    const r = this.activePath;
    try {
      const i = String(t?.path || ""), s = e === "rename-folder" ? this.validPackName(t?.name) : "";
      if (e === "rename-folder" && !s) throw new Error("名称不能为空，最长50字，且不能包含路径或特殊字符。");
      if (this.isUsingIndexedDb) {
        if (e === "rename-folder" && s === "全部") throw new Error("“全部”为保留名称，请换一个分类名称。");
        if (e === "reorder-folders") {
          if (!Array.isArray(t?.paths) || t.parentPath !== "") throw new Error("只能调整同级分类顺序");
          await Ne(t.paths, this.ownerId);
        } else {
          if (!i || i === "默认") throw new Error("全部表情和默认分类不能删除或重命名");
          if (!(await j()).includes(i)) throw new Error("分类已不存在，请重新打开模块核对。");
          e === "rename-folder" ? await We(i, s, this.ownerId) : await Ve(i, this.ownerId);
        }
        if (this.disposed) return;
        const d = e !== "reorder-folders" && r === i ? e === "rename-folder" ? s : "默认" : r;
        this.canRead() && await this.loadIndexedDbLibrary(d);
        return;
      }
      if (!this.libraryIndex) throw new Error("图库索引尚未读取，请重新打开模块。");
      const a = e === "rename-folder" ? { ...t, name: s } : t, h = $e(this.libraryIndex, e, a);
      let o = r;
      e === "delete-folder" && (r === i || r.startsWith(`${i}/`)) && (o = i.includes("/") ? i.slice(0, i.lastIndexOf("/")) : ""), await this.commitIndex(h, o);
    } finally {
      this.editingFolders = !1;
    }
  }
  async saveFilesToIndexedDb(e) {
    const t = this.activePath || "默认";
    if (!this.isUsingIndexedDb) throw new Error("已配置本地图库，未转存到内置库");
    if (e.length > 50) throw new Error("一次最多导入50张，请分批选择");
    for (const r of e)
      await this.detectImage(r), await q(r, r.name, t, this.ownerId);
    await this.loadIndexedDbLibrary(t);
  }
  async saveUrlToIndexedDb(e) {
    if (!this.isUsingIndexedDb) throw new Error("已配置本地图库，未转存到内置库");
    const t = await fetch(e.startsWith("data:image/") ? e : this.assertPublicHttps(e), { credentials: "omit", redirect: "error", signal: AbortSignal.timeout(15e3) });
    if (!t.ok) throw new Error("图片读取失败");
    const r = await t.blob();
    await this.detectImage(r);
    const i = this.activePath || "默认", s = r.type.split("/")[1] || "png", a = `web_${Date.now()}.${s}`;
    await q(r, a, i, this.ownerId), await this.loadIndexedDbLibrary(i);
  }
}
const it = new Ze(K, () => !document.hidden, Pe, 120);
function st(n) {
  const e = D(null), t = D(8), r = D(8), i = D(!1), s = D(0), a = D(0);
  let h, o = 0, d = !1;
  const u = ge(() => ({
    position: "fixed",
    left: `${t.value}px`,
    top: `${r.value}px`,
    bottom: "auto",
    maxWidth: `${Math.max(0, s.value - 16)}px`,
    maxHeight: `${Math.max(0, a.value - 16)}px`,
    overflowY: "auto",
    boxSizing: "border-box",
    visibility: i.value ? "visible" : "hidden"
  }));
  function l() {
    if (!n.visible() || !e.value) return;
    s.value = window.innerWidth, a.value = window.innerHeight;
    const g = e.value.offsetWidth, b = e.value.offsetHeight, y = n.anchor(), P = Number.isFinite(y.x) ? y.x : 8, S = Number.isFinite(y.y) ? y.y : 8, Y = n.gap ?? 0, he = n.placement === "above" ? S - b - Y : S + Y, de = n.align === "center" ? P - g / 2 : P;
    t.value = Math.max(8, Math.min(de, s.value - g - 8)), r.value = Math.max(8, Math.min(he, a.value - b - 8)), i.value = !0;
  }
  function m(g) {
    !e.value || g.composedPath().includes(e.value) || n.dismiss();
  }
  function f(g) {
    g.key !== "Escape" || g.isComposing || g.keyCode === 229 || (g.preventDefault(), g.stopPropagation(), n.dismiss());
  }
  function w() {
    n.dismiss();
  }
  function p() {
    document.hidden && n.dismiss();
  }
  function c() {
    ++o, h?.disconnect(), h = void 0, window.removeEventListener("resize", l), document.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", f, !0), window.removeEventListener("pagehide", w), document.removeEventListener("visibilitychange", p);
  }
  return ue(() => [n.visible(), n.anchor().x, n.anchor().y], async ([g]) => {
    if (c(), i.value = !1, !g || d) return;
    const b = o;
    s.value = window.innerWidth, a.value = window.innerHeight, await fe(), !(d || o !== b || !n.visible() || !e.value) && (l(), h = new ResizeObserver(l), h.observe(e.value), window.addEventListener("resize", l), document.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", f, !0), window.addEventListener("pagehide", w), document.addEventListener("visibilitychange", p));
  }, { immediate: !0, flush: "post" }), me(() => {
    d = !0, c();
  }), { menuRef: e, style: u };
}
export {
  Qe as S,
  K as a,
  it as b,
  Z as c,
  Ie as d,
  Ze as e,
  et as o,
  tt as p,
  rt as s,
  st as u,
  Pe as w
};
