import { C as rt } from "./vendor-vue-BUkfvXUI.js";
import { S as it, k as Y, j as st, R as at, m as A, n as v, q as U, r as z, c as nt, d as ot } from "./read-session-CysyqM5X.js";
const N = () => ({
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
function ht() {
  const n = rt(N()), t = /* @__PURE__ */ new Set();
  return {
    get state() {
      return n;
    },
    reset() {
      Object.assign(n, N());
    },
    updateState(e) {
      Object.assign(n, e);
    },
    setItems(e) {
      n.items = [...e];
    },
    onAction(e) {
      return t.add(e), () => {
        t.delete(e);
      };
    },
    async dispatch(e, r) {
      for (const i of t) await i(e, r);
    }
  };
}
const _ = ht();
_.state;
async function ct(n) {
  if (!n.size || n.size > 25 * 1024 * 1024) throw new Error("预览图片大小须在25MB以内");
  if (n.type === "image/gif" && n.size <= 4 * 1024 * 1024) return n;
  const t = await createImageBitmap(n);
  try {
    if (t.width * t.height > 4e7) throw new Error("图片像素过大，请先缩小副本再预览");
    const e = Math.min(1, 320 / Math.max(t.width, t.height)), r = new OffscreenCanvas(Math.max(1, Math.round(t.width * e)), Math.max(1, Math.round(t.height * e))), i = r.getContext("2d");
    if (!i) throw new Error("无法生成预览");
    return i.drawImage(t, 0, 0, r.width, r.height), await r.convertToBlob({ type: "image/webp", quality: 0.8 });
  } finally {
    t.close();
  }
}
class dt {
  constructor() {
    this.urls = /* @__PURE__ */ new Map(), this.generation = 0, this.running = 0, this.pending = [], this.limit = 120;
  }
  get(t) {
    return this.urls.get(t) || "";
  }
  has(t) {
    return this.urls.has(t);
  }
  release(t) {
    const e = this.urls.get(t);
    if (e)
      try {
        URL.revokeObjectURL(e);
      } catch {
      }
    this.urls.delete(t);
  }
  /** In-flight native decode cannot be physically aborted, but cannot publish after this. */
  cancelPending() {
    ++this.generation;
    for (const t of this.pending.splice(0)) t.resolve(!1);
  }
  delete(t) {
    this.cancelPending(), this.release(t);
  }
  retain(t) {
    this.cancelPending();
    for (const e of this.urls.keys()) t.has(e) || this.release(e);
  }
  clear() {
    this.cancelPending();
    for (const t of this.urls.keys()) this.release(t);
  }
  acquire(t) {
    return t() ? this.running < 2 ? (++this.running, Promise.resolve(!0)) : new Promise((e) => this.pending.push({ current: t, resolve: e })) : Promise.resolve(!1);
  }
  releaseSlot() {
    for (--this.running; this.running < 2 && this.pending.length; ) {
      const t = this.pending.shift(), e = t.current();
      e && ++this.running, t.resolve(e);
    }
  }
  async prepare(t, e, r) {
    const i = this.generation, s = () => i === this.generation && r();
    if (!s()) return "";
    const a = this.get(t);
    if (a) return a;
    if (!await this.acquire(s)) return "";
    try {
      if (!s()) return "";
      const d = await e();
      if (!s()) return "";
      const o = await ct(d);
      if (!s()) return "";
      const c = this.get(t);
      if (c) return c;
      for (; this.urls.size >= this.limit; ) {
        const l = this.urls.keys().next();
        if (l.done) break;
        this.release(l.value);
      }
      const u = URL.createObjectURL(o);
      return this.urls.set(t, u), u;
    } finally {
      this.releaseSlot();
    }
  }
}
const lt = "folder-layout-v1";
async function ut(n, t) {
  const e = await new Promise((s, a) => {
    const d = n.transaction("handles", "readonly"), o = d.objectStore("handles").get(lt);
    d.oncomplete = () => s(o.result), d.onerror = d.onabort = () => a(d.error || new Error("分类设置读取失败"));
  }), r = e?.revision || "";
  let i = !1;
  try {
    i = !!e && await t.isSameEntry(e.root);
  } catch {
  }
  return e && i ? { revision: r, aliases: e.aliases, removed: e.removed, orders: e.orders } : { revision: r, aliases: {}, removed: [], orders: {} };
}
function ft(n, t) {
  const e = new Set(t.removed), r = (s) => [
    ...s.directItems,
    ...s.subDirs.flatMap(r)
  ];
  function i(s) {
    const a = Object.hasOwn(t.aliases, s.path) ? t.aliases[s.path] : s.name, d = s.directItems.map((l) => ({ ...l, folderName: a })), o = [];
    for (const l of s.subDirs)
      e.has(l.path) ? d.push(...r(l).map((m) => ({ ...m, folderName: a }))) : o.push(i(l));
    const c = Object.hasOwn(t.orders, s.path) ? t.orders[s.path] : [], u = new Map(c.map((l, m) => [l, m]));
    return o.sort((l, m) => (u.get(l.path) ?? Number.MAX_SAFE_INTEGER) - (u.get(m.path) ?? Number.MAX_SAFE_INTEGER)), { ...s, name: a, directItems: d, subDirs: o };
  }
  return i(n);
}
const B = "stickerLibraryIndexRevision", O = "virtual-library-roots-v1", R = (n) => `virtual-library:${n}`, T = (n) => `${n}_${crypto.randomUUID()}`;
async function L(n, t) {
  try {
    return await n.isSameEntry(t);
  } catch {
    return !1;
  }
}
function M(n, t) {
  return new Promise((e, r) => {
    const i = n.transaction("handles", "readonly"), s = i.objectStore("handles").get(t);
    i.oncomplete = () => e(s.result), i.onerror = i.onabort = () => r(new Error("图库索引读取失败"));
  });
}
async function Z(n, t) {
  try {
    await chrome.storage.local.set({ [B]: `${t}:${n}` });
  } catch {
  }
}
async function V(n, t, e) {
  const r = { ...t, revision: crypto.randomUUID() };
  return await new Promise((i, s) => {
    const a = n.transaction("handles", "readwrite"), d = a.objectStore("handles");
    let o;
    const c = d.get(R(t.id));
    c.onsuccess = () => {
      if (c.result?.revision !== t.revision) {
        o = new Error("图库索引已被其他页面修改，请刷新图库后再操作；未覆盖对方修改。"), a.abort();
        return;
      }
      d.put(r, R(r.id));
    }, a.oncomplete = () => i(), a.onerror = a.onabort = () => s(o || new Error("图库索引保存未确认，请重读核对后再试"));
  }), await Z(r.revision, e), r;
}
function S(n) {
  return { ...n, groups: n.groups.map((t) => ({ ...t })), images: n.images.map((t) => ({ ...t })) };
}
function q(n) {
  return [...n.directItems, ...n.subDirs.flatMap(q)];
}
function mt(n, t) {
  const e = { schema: 1, id: T("library"), revision: crypto.randomUUID(), root: n, groups: [], images: [] };
  function r(i, s) {
    i.directItems.forEach((a) => e.images.push({
      id: T("image"),
      path: a.relPath,
      name: a.file,
      size: a.size,
      modified: a.modified,
      groupId: s,
      hidden: !1,
      handle: a.handle
    })), i.subDirs.forEach((a, d) => {
      const o = T("group");
      e.groups.push({ id: o, parentId: s, name: a.name, order: d }), r(a, o);
    });
  }
  return r(t, ""), e;
}
async function W(n, t) {
  const e = await M(n, O);
  for (const r of e?.entries || [])
    if (await L(t, r.root)) {
      const i = await M(n, R(r.id));
      if (i?.schema === 1 && Array.isArray(i.groups) && Array.isArray(i.images)) return i;
      throw new Error("已有图库索引无法读取，未替换或清空");
    }
  return null;
}
async function gt(n, t, e, r) {
  if (!navigator.locks) throw new Error("当前环境不支持图库索引锁");
  return navigator.locks.request("logicweaver:sticker-library-roots", { signal: AbortSignal.timeout(15e3) }, async () => {
    const i = await M(n, O) || { entries: [] };
    for (const a of i.entries)
      if (await L(t, a.root)) {
        const d = await M(n, R(a.id));
        if (!d || d.schema !== 1 || !Array.isArray(d.images) || !Array.isArray(d.groups))
          throw new Error("已有图库索引无法读取，未创建空索引覆盖；请先备份核对");
        return d;
      }
    const s = mt(t, e);
    if (s.images.length > 2e4 || s.groups.length > 2e3) throw new Error("图库过大，请分库管理");
    return await new Promise((a, d) => {
      const o = n.transaction("handles", "readwrite"), c = o.objectStore("handles");
      c.put(s, R(s.id)), c.put({ revision: crypto.randomUUID(), entries: [...i.entries, { id: s.id, root: t }] }, O), o.oncomplete = () => a(), o.onerror = o.onabort = () => d(new Error("图库索引初始化未确认，请重读核对"));
    }), await Z(s.revision, r), s;
  });
}
async function wt(n, t, e, r, i) {
  const s = S(t), a = q(e);
  if (a.length > 2e4) throw new Error("图库超过两万张，本次未更新索引，请分库管理");
  const d = /* @__PURE__ */ new Map();
  t.images.forEach((l) => d.set(l.path, l));
  const o = /* @__PURE__ */ new Map();
  t.images.forEach((l) => {
    const m = `${l.size}:${l.modified}`, f = o.get(m) || [];
    f.push(l), o.set(m, f);
  });
  const c = /* @__PURE__ */ new Set();
  let u = !1;
  for (const l of a) {
    i?.throwIfAborted();
    let m = d.get(l.relPath);
    if (m?.handle && !await L(m.handle, l.handle) && (m = void 0), m?.handle || (m = void 0), !m) {
      const f = (o.get(`${l.size}:${l.modified}`) || []).filter((g) => !c.has(g.id) && g.handle);
      if (f.length <= 16) {
        for (const g of f)
          if (await L(g.handle, l.handle)) {
            m = g;
            break;
          }
      }
    }
    if (m && !c.has(m.id)) {
      if (c.add(m.id), l.id = m.id, m.path !== l.relPath || m.size !== l.size || m.modified !== l.modified || m.name !== l.file) {
        const f = s.images.findIndex((g) => g.id === m.id);
        s.images[f] = { ...m, path: l.relPath, name: l.file, size: l.size, modified: l.modified, handle: l.handle }, u = !0;
      }
    } else
      l.id = T("image"), s.images.push({
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
  return u ? V(n, s, r) : t;
}
function C(n) {
  const t = /* @__PURE__ */ new Map([["", ""]]), e = (r, i, s) => {
    if (s > 32) throw new Error("分类层级无效");
    n.groups.filter((a) => a.parentId === r).forEach((a) => {
      const d = i ? `${i}/${a.id}` : a.id;
      t.set(a.id, d), e(a.id, d, s + 1);
    });
  };
  if (e("", "", 0), t.size !== n.groups.length + 1) throw new Error("分类索引包含失联节点或循环，未显示错误关系");
  return t;
}
function $(n, t) {
  const e = [...C(n)].find(([, r]) => r === t);
  if (!e) throw new Error("分类已变化，请重新选择");
  return e[0];
}
function K(n, t) {
  const e = C(n), r = /* @__PURE__ */ new Map();
  r.set("", { ...t, path: "", directItems: [], subDirs: [], totalCount: 0 }), n.groups.forEach((o) => r.set(o.id, {
    handle: t.handle,
    name: o.name,
    path: e.get(o.id),
    depth: e.get(o.id).split("/").length,
    directItems: [],
    subDirs: [],
    totalCount: 0
  })), [...n.groups].sort((o, c) => o.order - c.order).forEach((o) => r.get(o.parentId).subDirs.push(r.get(o.id)));
  const i = new Map(n.images.map((o) => [o.path, o])), s = new Map(n.images.map((o) => [o.id, o]));
  for (const o of q(t)) {
    const c = o.id && s.get(o.id) || i.get(o.relPath);
    if (!c || (o.id = c.id, c.hidden)) continue;
    const u = r.get(c.groupId) || r.get("");
    u.directItems.push({ ...o, id: c.id, folderPath: u.path, folderName: u.name });
  }
  const a = (o) => (o.directItems.sort((c, u) => u.modified - c.modified), o.totalCount = o.directItems.length + o.subDirs.reduce((c, u) => c + a(u), 0), o.totalCount), d = r.get("");
  return a(d), d;
}
function pt(n, t, e) {
  const r = S(n), i = $(r, t);
  if (r.groups.length >= 2e3) throw new Error("分类数量达到上限");
  if (r.groups.some((s) => s.parentId === i && s.name.toLocaleLowerCase() === e.toLocaleLowerCase())) throw new Error("同级已有同名分类");
  return r.groups.push({ id: T("group"), parentId: i, name: e, order: Date.now() }), C(r), r;
}
function bt(n, t, e) {
  const r = S(n);
  if (t === "reorder-folders") {
    const i = $(r, String(e?.parentPath || "")), s = r.groups.filter((o) => o.parentId === i), a = C(r), d = e?.paths;
    if (!Array.isArray(d) || d.length !== s.length || new Set(d).size !== s.length || d.some((o) => !s.some((c) => a.get(c.id) === o))) throw new Error("只能调整当前同级的完整分类顺序");
    s.forEach((o) => {
      o.order = d.indexOf(a.get(o.id));
    });
  } else {
    const i = $(r, String(e?.path || "")), s = r.groups.find((a) => a.id === i);
    if (!s) throw new Error("全部入口不能修改");
    if (t === "rename-folder") {
      if (r.groups.some((a) => a.id !== i && a.parentId === s.parentId && a.name.toLocaleLowerCase() === String(e.name).toLocaleLowerCase())) throw new Error("同级已有同名分类");
      s.name = e.name;
    } else {
      const a = /* @__PURE__ */ new Set([i]);
      for (let d = 0; d <= r.groups.length; d++) {
        const o = a.size;
        if (r.groups.forEach((c) => {
          a.has(c.parentId) && a.add(c.id);
        }), o === a.size) break;
      }
      r.groups = r.groups.filter((d) => !a.has(d.id)), r.images.forEach((d) => {
        a.has(d.groupId) && (d.groupId = s.parentId);
      });
    }
  }
  return r;
}
function yt(n, t, e) {
  const r = S(n), i = r.images.find((s) => s.id === t);
  if (!i) throw new Error("图片索引已变化，请刷新");
  return e === null ? i.hidden = !0 : (i.groupId = $(r, e), i.hidden = !1), r;
}
function H(n) {
  const t = JSON.stringify({
    format: "logicweaver-sticker-index",
    schema: 1,
    rootName: n.root.name,
    groups: n.groups,
    images: n.images.map(({ handle: e, ...r }) => r)
  }, null, 2);
  if (new Blob([t]).size > 8 * 1024 * 1024) throw new Error("索引备份超过8MB，请分库管理");
  return t;
}
function Pt(n, t, e) {
  if (t.length > 8 * 1024 * 1024) throw new Error("索引备份不能超过8MB");
  const r = JSON.parse(t);
  if (r?.format !== "logicweaver-sticker-index" || r.schema !== 1 || !Array.isArray(r.groups) || !Array.isArray(r.images) || r.groups.length > 2e3 || r.images.length > 2e4) throw new Error("不是受支持的图库索引备份");
  const i = S(n), s = (h, w) => typeof h == "string" && new RegExp(`^${w}_[a-f0-9-]{36}$`).test(h), a = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  i.groups = r.groups.map((h) => {
    if (!s(h?.id, "group") || a.has(h.id) || h.parentId !== "" && !s(h.parentId, "group") || typeof h.name != "string" || !h.name.trim() || h.name.length > 50 || /[\x00-\x1f/\\]/.test(h.name) || !Number.isFinite(h.order)) throw new Error("分类备份格式无效");
    const w = JSON.stringify([h.parentId, h.name.toLocaleLowerCase()]);
    if (d.has(w)) throw new Error("分类备份包含同级重名，未恢复");
    return d.add(w), a.add(h.id), { id: h.id, parentId: h.parentId, name: h.name, order: h.order };
  }), C(i);
  let o = 0;
  const c = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), l = (h) => JSON.stringify([h.path, h.size, h.modified]), m = new Map(n.images.filter((h) => h.handle && e.has(h.id)).map((h) => [h.id, h])), f = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
  m.forEach((h) => {
    const w = l(h), b = f.get(w) || [];
    b.push(h), f.set(w, b);
  }), r.images.forEach((h) => {
    if (h) {
      const w = l(h);
      g.set(w, (g.get(w) || 0) + 1);
    }
  });
  const p = r.images.map((h) => {
    if (!s(h?.id, "image") || u.has(h.id) || typeof h.path != "string" || h.path.length > 4096 || h.path.startsWith("/") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(h.path) || h.path.includes("\\") || h.path.split("/").some((k) => !k || k === "." || k === "..") || typeof h.name != "string" || h.name.length > 255 || !Number.isSafeInteger(h.size) || h.size < 0 || !Number.isFinite(h.modified) || typeof h.hidden != "boolean" || h.groupId !== "" && !a.has(h.groupId)) throw new Error("图片索引备份格式无效");
    u.add(h.id);
    const w = m.get(h.id), b = l(h), y = (f.get(b) || []).filter((k) => !c.has(k.id)), I = w && !c.has(w.id) ? w : g.get(b) === 1 && y.length === 1 ? y[0] : void 0;
    return I && (o++, c.add(I.id)), {
      id: h.id,
      path: I?.path || h.path,
      name: I?.name || h.name,
      size: I?.size ?? h.size,
      modified: I?.modified ?? h.modified,
      hidden: h.hidden,
      groupId: h.groupId,
      handle: I?.handle
    };
  });
  if (i.images = [...p, ...n.images.filter((h) => !c.has(h.id) && !u.has(h.id)).map((h) => ({ ...h, groupId: "" }))], i.images.length > 2e4) throw new Error("合并后的索引超过两万条，未恢复");
  return { index: i, matched: o, unmatched: p.length - o };
}
class It {
  constructor(t) {
    this.owner = t;
  }
  open() {
    return new Promise((t, e) => {
      let r = !1;
      const i = () => {
        r || (r = !0, clearTimeout(a), e(new Error("图库句柄数据库暂不可用，请关闭占用页面后重读；未重置数据")));
      }, s = indexedDB.open(it, 1), a = setTimeout(i, 15e3);
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
        r = !0, clearTimeout(a), s.result.onversionchange = () => s.result.close(), t(s.result);
      };
    });
  }
  async readRoot() {
    const t = await this.open();
    try {
      return await new Promise((e, r) => {
        const i = t.transaction("handles", "readonly"), s = i.objectStore("handles").get("root");
        i.oncomplete = () => e(s.result || null), i.onerror = i.onabort = () => r(new Error("图库根句柄读取失败，未改用其他图库"));
      });
    } finally {
      t.close();
    }
  }
  async saveRoot(t) {
    const e = await this.open();
    try {
      await new Promise((r, i) => {
        const s = e.transaction("handles", "readwrite");
        s.objectStore("handles").put(t, "root"), s.oncomplete = () => r(), s.onerror = s.onabort = () => i(new Error("目录句柄保存未确认"));
      }), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Y]: crypto.randomUUID() });
    } finally {
      e.close();
    }
  }
  async load(t, e, r) {
    r.throwIfAborted();
    const i = await this.open();
    try {
      r.throwIfAborted();
      const s = await ut(i, t);
      r.throwIfAborted();
      let a = await gt(i, t, ft(e, s), this.owner);
      return r.throwIfAborted(), a = await wt(i, a, e, this.owner, r), r.throwIfAborted(), a;
    } finally {
      i.close();
    }
  }
  async find(t) {
    const e = await this.open();
    try {
      return await W(e, t);
    } finally {
      e.close();
    }
  }
  async save(t) {
    const e = await this.open();
    try {
      return await V(e, t, this.owner);
    } finally {
      e.close();
    }
  }
  /** Only after the caller has confirmed successful physical removal. No delete retry. */
  async forgetDeletedImage(t, e, r) {
    const i = await this.open();
    try {
      const s = await W(i, t);
      if (!s || s.id !== e) throw new Error("图库索引已变化");
      const a = S(s);
      a.images = a.images.filter((d) => d.id !== r), await V(i, a, this.owner);
    } finally {
      i.close();
    }
  }
}
async function St(n) {
  if (!n) return !1;
  try {
    return await n.queryPermission({ mode: "read" }) === "granted";
  } catch {
    return !1;
  }
}
async function xt(n) {
  try {
    return await n.queryPermission({ mode: "readwrite" }) === "granted" ? !0 : await n.requestPermission({ mode: "readwrite" }) === "granted";
  } catch {
    return !1;
  }
}
function E(n) {
  return n.getFile();
}
async function vt(n, t, e, r, i) {
  const a = `${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}.${e}`;
  if (!i()) throw new Error("图库已切换，未继续写入旧目录");
  const d = await n.getFileHandle(a, { create: !0 }), o = await d.createWritable();
  try {
    await o.write(new Blob([t], { type: r })), await o.close();
  } catch (c) {
    try {
      await o.abort();
    } catch {
    }
    throw c;
  }
  return { fileName: a, handle: d };
}
async function Et(n, t, e, r) {
  if (!t || !await n.isSameEntry(t)) throw new Error("已切换图库，未删除原图");
  const i = await n.resolve(e.handle);
  if (!i?.length || i.join("/") !== e.relPath || i.some((c) => !c || c === "." || c === ".." || /[/\\]/.test(c)))
    throw new Error("原图已移动或位置无法确认，未删除，请刷新图库");
  let s = n;
  for (const c of i.slice(0, -1)) s = await s.getDirectoryHandle(c);
  const a = i[i.length - 1], d = await s.getFileHandle(a), o = await E(d);
  if (!await d.isSameEntry(e.handle) || o.size !== e.size || o.lastModified !== e.modified || !r())
    throw new Error("原图或图库已变化，未删除，请刷新后重新确认");
  await s.removeEntry(a);
}
function J(n) {
  return /\.(png|jpe?g|gif|webp|bmp)$/i.test(n || "");
}
async function Dt(n, t = "", e = 0, r) {
  let i = 0, s = 0;
  async function a(o, c, u) {
    if (r?.throwIfAborted(), u > 6)
      return s++, null;
    const l = { handle: o, name: o.name, path: c, depth: u, directItems: [], subDirs: [], totalCount: 0 }, m = [];
    for await (const [f, g] of o.entries())
      if (r?.throwIfAborted(), !(f.startsWith(".") || f === "$RECYCLE.BIN" || f === "System Volume Information")) {
        if (g.kind === "directory") {
          const p = await a(g, c ? `${c}/${f}` : f, u + 1);
          p && l.subDirs.push(p);
        } else if (g.kind === "file" && J(f)) {
          if (++i > 2e4) throw new Error("图库超过两万张，请分库管理");
          m.push({ name: f, handle: g });
        }
      }
    for (let f = 0; f < m.length; f += 16) {
      r?.throwIfAborted();
      const g = await Promise.all(m.slice(f, f + 16).map(async ({ name: p, handle: h }) => {
        r?.throwIfAborted();
        try {
          const w = await E(h);
          return r?.throwIfAborted(), {
            file: p,
            relPath: c ? `${c}/${p}` : p,
            folderPath: c,
            folderName: o.name,
            size: w.size,
            modified: w.lastModified,
            handle: h,
            dirHandle: o
          };
        } catch {
          return r?.throwIfAborted(), s++, null;
        }
      }));
      for (const p of g) p && l.directItems.push(p);
    }
    return l.directItems.sort((f, g) => g.modified - f.modified), l.subDirs.sort((f, g) => f.name.localeCompare(g.name, "zh-CN")), l.totalCount = l.directItems.length + l.subDirs.reduce((f, g) => f + g.totalCount, 0), l;
  }
  const d = await a(n, t, e);
  return r?.throwIfAborted(), { tree: d, omissions: s };
}
function X(n, t) {
  if (!n) return null;
  if (n.path === t) return n;
  for (const e of n.subDirs) {
    const r = X(e, t);
    if (r) return r;
  }
  return null;
}
function Q(n) {
  return n ? [...n.directItems, ...n.subDirs.flatMap(Q)] : [];
}
function tt(n) {
  return n ? n.subDirs.length + n.subDirs.reduce((t, e) => t + tt(e), 0) : 0;
}
function D(n) {
  try {
    chrome.storage.local.set({ stickerLibraryIndexRevision: `${n}:${crypto.randomUUID()}` }).catch(() => {
    });
  } catch {
  }
}
const kt = "tab_project_stickers_v2", At = 1;
let x = null;
function et(n) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
async function P() {
  return x || new Promise((n, t) => {
    const e = indexedDB.open(kt, At);
    e.onupgradeneeded = (r) => {
      const i = e.result;
      if (!i.objectStoreNames.contains("stickers")) {
        const s = i.createObjectStore("stickers", { keyPath: "id" });
        s.createIndex("group", "group", { unique: !1 }), s.createIndex("createdAt", "createdAt", { unique: !1 });
      }
      i.objectStoreNames.contains("groups") || i.createObjectStore("groups", { keyPath: "name" }).createIndex("order", "order", { unique: !1 });
    }, e.onsuccess = () => {
      x = e.result, x.onversionchange = () => {
        x?.close(), x = null;
      }, n(x);
    }, e.onerror = () => t(e.error);
  });
}
async function F() {
  const n = await P();
  return new Promise((t, e) => {
    const s = n.transaction("groups", "readonly").objectStore("groups").getAll();
    s.onsuccess = () => {
      const a = (s.result || []).sort((d, o) => d.order - o.order || d.name.localeCompare(o.name, "zh-CN")).map((d) => d.name);
      a.includes("默认") || a.unshift("默认"), t(a);
    }, s.onerror = () => e(s.error);
  });
}
async function Tt(n, t = "external") {
  const e = n.trim();
  if (!e) return;
  const r = await P();
  return new Promise((i, s) => {
    const a = r.transaction("groups", "readwrite");
    a.objectStore("groups").add({
      name: e,
      order: Date.now(),
      createdAt: Date.now()
    }), a.oncomplete = () => {
      D(t), i();
    }, a.onerror = a.onabort = () => s(a.error || new Error("分类创建未完成"));
  });
}
async function Rt(n, t = "external") {
  if (n === "默认") return;
  const e = await P();
  return new Promise((r, i) => {
    const s = e.transaction(["groups", "stickers"], "readwrite"), a = s.objectStore("groups"), d = s.objectStore("stickers");
    let o;
    const c = a.get(n);
    c.onsuccess = () => {
      if (!c.result) {
        o = new Error("分类已被其他页面修改，请重新打开模块核对。"), s.abort();
        return;
      }
      a.delete(n);
      const u = d.index("group").openCursor(IDBKeyRange.only(n));
      u.onsuccess = () => {
        const l = u.result;
        l && (l.update({ ...l.value, group: "默认" }), l.continue());
      };
    }, s.oncomplete = () => {
      D(t), r();
    }, s.onerror = s.onabort = () => i(o || s.error || new Error("分类删除未完成"));
  });
}
async function $t(n, t, e = "external") {
  if (n === "默认" || !t.trim() || t === "默认") throw new Error("默认分类不能重命名或覆盖");
  if (n === t) return;
  const r = await P();
  return new Promise((i, s) => {
    const a = r.transaction(["groups", "stickers"], "readwrite"), d = a.objectStore("groups"), o = a.objectStore("stickers"), c = d.getAll(), u = o.index("group").count(t);
    let l, m = 0;
    const f = () => {
      if (++m !== 2) return;
      const g = c.result, p = g.find((w) => w.name === n);
      if (!p || g.some((w) => w.name === t) || u.result) {
        l = new Error("分类已不存在或新名称已被使用，请重新打开模块核对。"), a.abort();
        return;
      }
      d.delete(n), d.add({ ...p, name: t });
      const h = o.index("group").openCursor(IDBKeyRange.only(n));
      h.onsuccess = () => {
        const w = h.result;
        w && (w.update({ ...w.value, group: t }), w.continue());
      };
    };
    c.onsuccess = u.onsuccess = f, a.oncomplete = () => {
      D(e), i();
    }, a.onerror = a.onabort = () => s(l || a.error || new Error("分类重命名未完成"));
  });
}
async function Ct(n, t = "external") {
  const e = await P();
  return new Promise((r, i) => {
    const s = e.transaction("groups", "readwrite"), a = s.objectStore("groups");
    let d;
    const o = a.getAll();
    o.onsuccess = () => {
      const c = o.result, u = /* @__PURE__ */ new Set(["默认", ...c.map((l) => l.name)]);
      if (n.length !== u.size || new Set(n).size !== u.size || n.some((l) => !u.has(l))) {
        d = new Error("分类列表已变化，请重新打开模块后再排序。"), s.abort();
        return;
      }
      n.forEach((l, m) => a.put({ ...c.find((f) => f.name === l) || { createdAt: Date.now() }, name: l, order: m }));
    }, s.oncomplete = () => {
      D(t), r();
    }, s.onerror = s.onabort = () => i(d || s.error || new Error("排序保存未完成"));
  });
}
async function j(n, t, e = "默认", r = "external") {
  const i = await P(), s = `stk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, a = n.type || "image/png", d = n.size, o = {
    id: s,
    name: t || `表情_${Date.now().toString().slice(-4)}`,
    group: e || "默认",
    mimeType: a,
    blob: n,
    size: d,
    createdAt: Date.now()
  };
  return new Promise((c, u) => {
    const l = i.transaction("stickers", "readwrite");
    l.objectStore("stickers").put(o), l.oncomplete = () => {
      D(r), c({
        id: o.id,
        name: o.name,
        group: o.group,
        mimeType: o.mimeType,
        size: o.size,
        sizeText: et(o.size),
        createdAt: o.createdAt
      });
    }, l.onerror = () => u(l.error);
  });
}
async function zt(n) {
  const t = await P();
  return new Promise((e, r) => {
    const i = t.transaction("stickers", "readonly"), s = i.objectStore("stickers").get(n);
    i.oncomplete = () => e(s.result), i.onerror = i.onabort = () => r(i.error || new Error("图片读取失败"));
  });
}
async function Bt(n, t, e) {
  if (e <= 0) return [];
  const r = await P();
  return new Promise((i, s) => {
    const a = r.transaction("stickers", "readonly"), d = a.objectStore("stickers").index("createdAt").openCursor(null, "prev"), o = [];
    let c = Math.max(0, t);
    d.onsuccess = () => {
      const u = d.result;
      if (!u || o.length >= e) return;
      const l = u.value;
      (!n || l.group === n) && (c ? c-- : o.push(l)), o.length < e && u.continue();
    }, a.oncomplete = () => i(o), a.onerror = a.onabort = () => s(a.error || new Error("图片分页读取失败"));
  });
}
async function Lt(n, t = "external") {
  const e = await P();
  return new Promise((r, i) => {
    const s = e.transaction("stickers", "readwrite");
    s.objectStore("stickers").delete(n), s.oncomplete = () => {
      D(t), r();
    }, s.onerror = () => i(s.error);
  });
}
async function Mt() {
  const n = await P();
  return new Promise((t, e) => {
    const r = n.transaction("stickers", "readonly"), i = r.objectStore("stickers"), s = /* @__PURE__ */ Object.create(null), a = i.count(), d = i.index("group"), o = d.openKeyCursor(null, "nextunique");
    o.onsuccess = () => {
      const c = o.result;
      if (!c) return;
      const u = String(c.key), l = d.count(c.key);
      l.onsuccess = () => {
        s[u] = l.result;
      }, c.continue();
    }, r.oncomplete = () => t({ total: a.result, groupCounts: s }), r.onerror = r.onabort = () => e(r.error || new Error("图片统计读取失败"));
  });
}
const G = 25 * 1024 * 1024;
class Ut {
  constructor(t = _, e = () => !document.hidden, r = (s) => s(), i = 1 / 0) {
    this.board = t, this.canRead = e, this.mutation = r, this.displayLimit = i, this.root = null, this.tree = null, this.sourceTree = null, this.editingFolders = !1, this.libraryIndex = null, this.ownerId = crypto.randomUUID(), this.repository = new It(this.ownerId), this.activePath = "", this.filterSubPath = "", this.expandedPaths = /* @__PURE__ */ new Set(), this.loading = !1, this.deletingImage = !1, this.scanOmissions = 0, this.previews = new dt(), this.initialized = !1, this.disposed = !1, this.readVersion = 0, this.libraryReads = new at(), this.thumbnailVersion = 0, this.readWorkers = /* @__PURE__ */ new Set(), this.isUsingIndexedDb = !1, this.isBoardPaging = !0, this.currentPage = 1, this.pageSize = 12, this.totalPages = 1, this.toastTimer = 0;
  }
  beginLibraryRead(t) {
    return this.libraryReads.begin({
      timeoutMs: 6e4,
      isCurrent: () => !this.disposed && this.canRead() && t === this.readVersion,
      onStop: (e) => {
        this.loading = !1, this.previews.cancelPending(), this.board.updateState({ loading: !1 }), e === "timeout" && !this.disposed && this.canRead() && this.toast("图库读取超过60秒，已停止等待；请重读。原文件和已提交索引不会回滚。", !0);
      }
    });
  }
  pauseReads() {
    this.readVersion++, this.thumbnailVersion++, this.libraryReads.cancel(), this.previews.cancelPending();
    for (const t of this.readWorkers) t.abort();
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
  getCachedFileUrl(t) {
    return this.previews.get(t);
  }
  formatSize(t) {
    const e = Number(t || 0);
    return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${Math.round(e / 1024)} KB` : `${(e / 1024 / 1024).toFixed(1)} MB`;
  }
  toast(t, e = !1) {
    if (this.disposed) return;
    if (this.onToast) {
      this.onToast(t, e);
      return;
    }
    const r = document.getElementById("sticker-toast");
    if (!r) {
      e && console.warn(`[StickersService] ${t}`);
      return;
    }
    window.clearTimeout(this.toastTimer), r.textContent = t, r.classList.toggle("bad", e), r.hidden = !1, this.toastTimer = window.setTimeout(() => {
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
  saveRootHandle(t) {
    return this.repository.saveRoot(t);
  }
  hasPermission(t) {
    return St(t);
  }
  async usableRoot() {
    const t = this.readVersion, e = await this.readSavedRoot();
    return this.disposed || t !== this.readVersion ? null : (this.root = e, e && await this.hasPermission(e) ? e : null);
  }
  async chooseRootFolder() {
    if (typeof window.showDirectoryPicker != "function")
      throw new Error("当前浏览器不支持文件夹授权，请使用最新版 Edge / Chrome");
    const t = await window.showDirectoryPicker({
      id: "logicweaver-stickers",
      mode: "read",
      startIn: "pictures"
    });
    this.clearBlobUrlCache(), await this.saveRootHandle(t), this.root = t;
    let e = t.name;
    typeof chrome < "u" && chrome?.storage?.local && (await chrome.storage.local.get([A]), e = t.name, await chrome.storage.local.set({
      [v]: t.name,
      [A]: e
    })), this.toast(`已关联本地文件夹「${e}」`), await this.loadLibrary();
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
  supportedFileName(t) {
    return J(t);
  }
  validPackName(t) {
    const e = String(t || "").trim();
    return !e || e.length > 50 || /[<>:"/\\|?*\u0000-\u001f]/.test(e) || /[. ]$/.test(e) || e === "." || e === ".." || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(e) ? "" : e;
  }
  /**
   * 递归遍历多层子文件夹并并发解析文件属性
   */
  async scanDirectoryTree(t, e = "", r = 0, i) {
    const s = await Dt(t, e, r, i);
    return this.scanOmissions = s.omissions, s.tree;
  }
  findNodeByPath(t, e) {
    return X(t, e);
  }
  collectAllItems(t) {
    return Q(t);
  }
  countTotalFolders(t) {
    return tt(t);
  }
  async loadLibrary(t = "") {
    if (this.disposed || !this.canRead()) return;
    this.pauseReads();
    const e = this.beginLibraryRead(this.readVersion);
    if (!e.current()) return;
    this.loading = !0, this.libraryIndex = null, this.tree = null, this.sourceTree = null, this.clearBlobUrlCache(), this.board.updateState({ loading: !0, items: [], libraryImageCount: null, needsReadPermission: !1 });
    const r = e.current;
    try {
      const i = await e.wait(() => typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.get([v, A, U, z]) : Promise.resolve({}));
      if (!r()) return;
      const s = await e.wait(() => this.readSavedRoot());
      if (!r()) return;
      this.root = s, this.board.updateState({
        storageKind: s || i[v] ? "directory" : null,
        rootName: s?.name || String(i[v] || "")
      });
      const a = s ? await e.wait(() => this.hasPermission(s)) : !1;
      if (!r()) return;
      if (s && !a || !s && i[v]) {
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
        this.isUsingIndexedDb = !0, await this.loadIndexedDbLibrary(t || this.activePath || "");
        return;
      }
      this.isUsingIndexedDb = !1;
      const d = await e.wait(() => this.scanDirectoryTree(s, "", 0, e.signal));
      if (!r()) return;
      if (!d) throw new Error("图库目录无法扫描");
      const o = await e.wait(() => this.repository.load(s, d, e.signal));
      if (!r()) return;
      this.clearBlobUrlCache(), this.libraryIndex = o, this.sourceTree = d;
      const c = K(o, d);
      this.tree = c, Array.isArray(i[z]) && (this.expandedPaths = new Set(i[z])), this.expandedPaths.size === 0 && c && this.expandedPaths.add("");
      let u = t || this.activePath || i[U] || "";
      for (; u && !this.findNodeByPath(c, u); )
        u = u.includes("/") ? u.slice(0, u.lastIndexOf("/")) : "";
      this.activePath = u, this.filterSubPath = "", this.currentPage = 1;
      const l = i[A] || s?.name || "", m = this.countTotalFolders(c);
      this.board.updateState({
        storageKind: "directory",
        hasFolder: !!s,
        folderPath: s && c ? `已挂载本地目录：${l}（${m} 个虚拟分类 · ${c.totalCount} 张图片）` : l ? `已配置路径「${l}」，请显式授权访问` : "尚未选择本地文件夹",
        folderSummary: `${m} 个虚拟分类 · ${c?.totalCount || 0} 张图片`
      }), this.renderTree(), this.renderItems(), this.scanOmissions && this.toast(`有 ${this.scanOmissions} 个文件或过深目录未能读取，扫描限6层；原文件与旧索引保留。`, !0);
    } catch {
      r() && this.toast("目录读取失败，请重载表情包模块后重试；若仍失败，请检查浏览器目录访问授权。", !0);
    } finally {
      e.finish() && (this.loading = !1, this.board.updateState({ loading: !1 }));
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
    const t = [];
    t.push({
      name: `全部 / 根目录 (${this.tree.name})`,
      path: "",
      depth: 0,
      itemCount: this.tree.totalCount || 0,
      subDirs: this.tree.subDirs || [],
      isExpanded: !0
    });
    const e = (r, i) => {
      r.forEach((s) => {
        const a = this.expandedPaths.has(s.path);
        t.push({
          name: s.name,
          path: s.path,
          depth: i,
          itemCount: s.totalCount || (s.directItems ? s.directItems.length : 0),
          subDirs: s.subDirs || [],
          isExpanded: a
        }), s.subDirs?.length > 0 && e(s.subDirs, i + 1);
      });
    };
    e(this.tree.subDirs, 1), this.board.updateState({
      hasFolder: !0,
      libraryImageCount: this.tree.totalCount,
      folderSummary: `${Math.max(0, t.length - 1)} 个分类 · ${this.tree.totalCount} 张图片`,
      activePath: this.activePath,
      folders: t
    });
  }
  renderItems() {
    if (this.disposed || !this.canRead()) return;
    if (!this.tree) {
      this.syncStickerItemsToVue([], null);
      return;
    }
    const t = this.findNodeByPath(this.tree, this.activePath) || this.tree;
    let e = t?.path === "" ? this.collectAllItems(t) : t?.directItems || [];
    t && e.length === 0 && (t.totalCount || 0) > 0 && (e = this.collectAllItems(t)), this.syncStickerItemsToVue(e, t);
  }
  syncStickerItemsToVue(t = [], e = null) {
    if (!e) {
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
    const r = e.path ? e.name : "全部 / 根目录", i = e.path ? `(${e.path.replace(/\//g, " > ")})` : "", s = `明确导入才写入原图库，并归入「${r}」虚拟分类`, a = t.length;
    let d = 1;
    if (this.isBoardPaging) {
      d = Math.max(1, Math.ceil(a / this.pageSize)), this.currentPage > d && (this.currentPage = d), this.currentPage < 1 && (this.currentPage = 1);
      const h = (this.currentPage - 1) * this.pageSize;
      t = t.slice(h, h + this.pageSize);
    } else
      t = t.slice(0, this.displayLimit);
    this.totalPages = d;
    const o = this.isBoardPaging ? a > this.pageSize ? `${a} 张 · 第 ${this.currentPage} / ${d} 页` : `${a} 张` : a > t.length ? `${a} 张 · 已显示 ${t.length} 张` : `${a} 张`;
    this.previews.retain(new Set(t.map((h) => h.relPath)));
    const c = [{ name: "根目录", path: "" }];
    let u = null;
    if (e.path) {
      const h = e.path.split("/");
      let w = "";
      h.forEach((b, y) => {
        w = w ? `${w}/${b}` : b, c.push({ name: b, path: w }), y === h.length - 2 && (u = w);
      }), h.length === 1 && (u = "");
    }
    const l = [];
    e.subDirs && e.subDirs.length > 0 && e.subDirs.forEach((h) => {
      l.push({
        name: h.name,
        path: h.path,
        count: h.totalCount || (h.directItems || []).length
      });
    });
    const m = [];
    e.subDirs && e.subDirs.length > 0 && (m.push({
      name: "当前文件夹",
      path: e.path,
      count: (e.directItems || []).length,
      isActive: this.filterSubPath === ""
    }), e.subDirs.forEach((h) => {
      m.push({
        name: h.name,
        path: h.path,
        count: (h.directItems || []).length,
        isActive: this.filterSubPath === h.path
      });
    }));
    const f = t.map((h) => {
      const w = this.previews.get(h.relPath);
      return {
        id: h.id || h.relPath || h.file,
        file: h.file,
        relPath: h.relPath,
        folderName: h.folderName && h.folderName !== e.name ? h.folderName : "",
        size: h.size || 0,
        sizeText: this.formatSize(h.size),
        url: w
      };
    });
    this.board.updateState({
      hasFolder: !!this.root,
      activePath: this.activePath,
      displayTitle: r,
      breadcrumb: i,
      breadcrumbs: c,
      parentPath: u,
      subFolders: l,
      dropPrompt: s,
      totalCountText: o,
      hasMore: this.isBoardPaging ? this.currentPage < d : a > t.length,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalPages: d,
      totalCount: a,
      subnavPills: m,
      items: f,
      emptyText: f.length || l.length ? "" : this.root ? "当前文件夹暂无图片 · 可直接拖入" : "图片库尚未就绪，请重新加载页面或重载表情包模块后重试"
    });
    const g = t.filter((h) => !this.previews.has(h.relPath)), p = ++this.thumbnailVersion;
    (async () => {
      for (let h = 0; h < g.length; h += 2) {
        if (this.disposed || !this.canRead() || p !== this.thumbnailVersion || (await Promise.all(g.slice(h, h + 2).map(async (w) => {
          try {
            const b = await this.previews.prepare(
              w.relPath,
              () => E(w.handle),
              () => !this.disposed && this.canRead() && p === this.thumbnailVersion
            );
            if (!b || this.disposed || !this.canRead() || p !== this.thumbnailVersion) return;
            const y = this.board.state.items.find((I) => I.id === (w.id || w.relPath || w.file));
            y && (y.url = b);
          } catch {
          }
        })), this.disposed || !this.canRead() || p !== this.thumbnailVersion)) return;
        this.board.updateState({ items: [...this.board.state.items] });
      }
    })();
  }
  /** Deletes only the confirmed disk image, never a category directory. */
  async deleteStickerFile(t, e = !1) {
    const r = this.collectAllItems(this.tree).filter((i) => i.relPath === t || !e && i.file === t);
    return r.length !== 1 || !r[0].id || !this.libraryIndex ? !1 : this.mutation(() => this.deleteDirectoryImage(r[0].id));
  }
  async deleteDirectoryImage(t) {
    if (this.deletingImage || nt.isOpen) throw new Error("请先完成当前操作");
    const e = this.root, r = this.libraryIndex, i = this.readVersion, s = this.collectAllItems(this.tree).find((l) => l.id === t);
    if (!e || !r || !s || this.isUsingIndexedDb) throw new Error("图库已变化，请刷新后重试");
    const a = s.relPath, d = s.size, o = s.modified, c = () => !this.disposed && this.canRead() && this.root === e && this.libraryIndex?.id === r.id && this.readVersion === i;
    this.deletingImage = !0;
    let u = !1;
    try {
      if (!await ot.confirm({
        title: "删除磁盘原图",
        danger: !0,
        confirmText: "永久删除原图",
        message: `将真正删除图库中的「${a}」。通常不进入系统回收站，无法通过分类索引备份或“恢复显示”找回。其他分类操作不会删除原图。确定删除这一张图片？`
      })) return !1;
      if (!c()) throw new Error("图库或页面状态已变化，未删除原图");
      if (!await this.ensureHandlePermission(e)) throw new Error("未获得写入权限，未删除原图");
      if (!c()) throw new Error("图库或页面状态已变化，未删除原图");
      const l = await this.readSavedRoot();
      return await Et(e, l, { relPath: a, size: d, modified: o, handle: s.handle }, c), u = !0, await this.repository.forgetDeletedImage(e, r.id, t), this.toast("已删除磁盘原图，分类索引备份不能恢复此文件"), !0;
    } catch (l) {
      throw u ? new Error("磁盘原图已删除，但索引清理未确认；请刷新图库核对，不要重复删除") : new Error(l?.message || "删除未确认，请刷新核对；未自动重试");
    } finally {
      if (this.deletingImage = !1, u) {
        try {
          await chrome.storage.local.set({ [B]: `${this.ownerId}:${crypto.randomUUID()}` });
        } catch {
        }
        !this.disposed && this.canRead() && await this.loadLibrary();
      }
    }
  }
  async copyBlob(t, e) {
    if (this.disposed || !this.canRead() || e !== this.readVersion) return !1;
    if (t.type !== "image/png") {
      const r = await createImageBitmap(t);
      try {
        const i = document.createElement("canvas");
        i.width = r.width, i.height = r.height, i.getContext("2d")?.drawImage(r, 0, 0), t = await new Promise((s, a) => i.toBlob((d) => d ? s(d) : a(new Error("图片转换失败")), "image/png"));
      } finally {
        r.close();
      }
    }
    return this.disposed || !this.canRead() || e !== this.readVersion ? !1 : (await navigator.clipboard.write([new ClipboardItem({ "image/png": t })]), !this.disposed && this.canRead() && e === this.readVersion);
  }
  async copySticker(t) {
    const e = this.readVersion;
    try {
      const r = await E(t);
      return this.disposed || !this.canRead() || e !== this.readVersion ? !1 : await this.copyBlob(r, e);
    } catch {
      return !this.disposed && this.canRead() && e === this.readVersion && this.toast("复制失败，请检查图片和剪贴板权限。", !0), !1;
    }
  }
  async copyStickerFromUrl(t) {
    const e = this.readVersion, r = new AbortController();
    this.readWorkers.add(r);
    try {
      const i = await fetch(t, { signal: AbortSignal.any([r.signal, AbortSignal.timeout(15e3)]), credentials: "omit", redirect: "error" });
      if (!i.ok) throw new Error("图片读取失败");
      return await this.copyBlob(await i.blob(), e);
    } catch {
      return !this.disposed && this.canRead() && e === this.readVersion && this.toast("图片读取或复制失败。", !0), !1;
    } finally {
      this.readWorkers.delete(r);
    }
  }
  async readItemBlob(t) {
    const e = this.readVersion;
    let r;
    if (this.isUsingIndexedDb) r = (await zt(t.id))?.blob;
    else {
      const i = this.collectAllItems(this.tree).find((s) => s.id === t.id);
      i && (r = await E(i.handle));
    }
    if (!r || !r.size || r.size > G || this.disposed || !this.canRead() || e !== this.readVersion) throw new Error("图片已变化或目录不可读，请刷新图库");
    return r;
  }
  async copyItem(t) {
    const e = this.readVersion;
    try {
      return await this.copyBlob(await this.readItemBlob(t), e);
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
  goToPage(t) {
    const e = Math.max(1, Math.min(t, this.totalPages));
    e !== this.currentPage && (this.currentPage = e, this.isUsingIndexedDb ? this.loadIndexedDbLibrary(this.activePath) : this.renderItems());
  }
  showMore() {
    this.nextPage();
  }
  async saveBlobToDir(t, e, r) {
    const i = this.libraryIndex;
    if (!i || !await i.root.isSameEntry(t)) throw new Error("图库索引尚未就绪或目录已切换，未写入原图");
    if (i.images.length >= 2e4) throw new Error("图库索引达到两万条，未写入新文件，请先分库管理");
    const s = $(i, this.activePath);
    try {
      if (!await this.ensureHandlePermission(t)) throw new Error("未获得用户授予的写入权限");
      const [a, d] = await this.detectImage(e), { fileName: o, handle: c } = await vt(
        t,
        e,
        a,
        d,
        () => this.libraryIndex?.id === i.id
      );
      if (i && await i.root.isSameEntry(t)) {
        const u = await E(c), l = S(i);
        l.images.push({
          id: `image_${crypto.randomUUID()}`,
          path: o,
          name: o,
          size: u.size,
          modified: u.lastModified,
          groupId: s,
          hidden: !1,
          handle: c
        }), await this.commitIndex(l);
      }
      this.toast(`已保存图片到原图库并加入「${r}」分类`);
    } catch (a) {
      throw this.toast("图片保存失败，可能已有部分文件完成，请核对后再操作。", !0), a;
    }
  }
  async saveFilesToDir(t, e, r) {
    if (e.length > 50) throw new Error("一次最多导入50张，请分批选择");
    for (const i of [...e])
      await this.saveBlobToDir(t, i, r);
    await this.loadLibrary(this.activePath);
  }
  async saveUrlToDir(t, e, r) {
    try {
      if (!await this.ensureHandlePermission(t)) throw new Error("未获得图库写入授权");
      if (String(e).startsWith("data:image/")) {
        await this.saveBlobToDir(t, await (await fetch(e)).blob(), r), await this.loadLibrary(this.activePath);
        return;
      }
      const i = this.assertPublicHttps(e);
      this.toast("正在读取图片…");
      const s = await fetch(i, { credentials: "omit", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15e3) });
      if (!s.ok) throw new Error(`图片请求失败（HTTP ${s.status}）`);
      await this.saveBlobToDir(t, await s.blob(), r), await this.loadLibrary(this.activePath);
    } catch (i) {
      throw this.toast("图片读取或保存失败，未自动重试。", !0), i;
    }
  }
  getActiveTargetHandle() {
    if (!this.tree) return null;
    if (this.filterSubPath) {
      const e = this.findNodeByPath(this.tree, this.filterSubPath);
      if (e) return { handle: e.handle, name: e.name };
    }
    const t = this.findNodeByPath(this.tree, this.activePath);
    return t ? { handle: t.handle, name: t.name } : this.root ? { handle: this.root, name: this.tree.name } : null;
  }
  ensureHandlePermission(t) {
    return xt(t);
  }
  async getFavoritesDirectoryHandle() {
    if (this.root || (this.root = await this.readSavedRoot()), !this.root) return null;
    try {
      return this.root;
    } catch {
      return this.root;
    }
  }
  extractImageUrlFromTransfer(t) {
    const e = t.getData("text/html") || "", r = (t.getData("text/uri-list") || t.getData("text/plain") || "").trim(), i = e + `
` + r, s = i.match(/(?:https?:)?\/\/[^\s"'()<>&;]+\.gif(?:@[^\s"'()<>&;]*)?/i);
    if (s) {
      let c = s[0];
      return c.startsWith("//") && (c = "https:" + c), c.replace(/@[^/?#]+$/i, "");
    }
    if (e)
      try {
        const c = new DOMParser().parseFromString(e, "text/html"), u = c.querySelector("img[src], img[data-src]");
        if (u) {
          let f = u.getAttribute("src") || u.getAttribute("data-src") || "";
          if (f)
            return f.startsWith("//") && (f = "https:" + f), f.includes("hdslb.com/bfs/") ? f.replace(/@[^/?#]+$/i, "") : f;
        }
        const l = c.querySelector("source:not([type*='avif'])[srcset]");
        if (l) {
          let g = (l.getAttribute("srcset") || "").split(",")[0].trim().split(" ")[0];
          return g.startsWith("//") && (g = "https:" + g), g.includes("hdslb.com/bfs/") ? g.replace(/@[^/?#]+$/i, "") : g;
        }
        const m = c.querySelector("[style*='background-image'], [style*='url']");
        if (m) {
          const g = (m.getAttribute("style") || "").match(/url\(["']?([^"')]+)["']?\)/i);
          if (g) {
            let p = g[1];
            return p.startsWith("//") && (p = "https:" + p), p.includes("hdslb.com/bfs/") ? p.replace(/@[^/?#]+$/i, "") : p;
          }
        }
      } catch {
      }
    const a = i.match(/(?:https?:)?\/\/[a-zA-Z0-9.-]*hdslb\.com\/bfs\/[^\s"'()<>&;]+/i);
    if (a) {
      let c = a[0];
      return c.startsWith("//") && (c = "https:" + c), c.replace(/@[^/?#]+$/i, "");
    }
    const d = i.match(/(?:https?:)?\/\/[^\s"'()<>&;]+\.(?:png|jpe?g|gif|webp|bmp)(?:@[^\s"'()<>&;]*)?/i);
    if (d) {
      let c = d[0];
      return c.startsWith("//") && (c = "https:" + c), c.replace(/@[^/?#]+$/i, "");
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
  async saveImageToDiskSafe(t) {
    let e = t.dataUrl;
    if (!e && t.file ? e = await new Promise((r) => {
      const i = new FileReader();
      i.onload = () => r(String(i.result || "")), i.readAsDataURL(t.file);
    }) : !e && t.blob && (e = await new Promise((r) => {
      const i = new FileReader();
      i.onload = () => r(String(i.result || "")), i.readAsDataURL(t.blob);
    })), typeof chrome < "u" && chrome?.runtime?.sendMessage)
      try {
        const r = await new Promise((i) => {
          chrome.runtime.sendMessage(
            {
              type: "saveToFavorites",
              url: t.url,
              dataUrl: e
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
  async saveImageToFavoritesAny(t) {
    if ((!this.tree || !this.libraryIndex) && await this.loadLibrary(this.activePath), !this.isUsingIndexedDb && (!this.root || !this.libraryIndex || !this.tree)) return { ok: !1, error: "请先在设置中授权并读取本地图库；未写入图片或切换存储位置" };
    if (!this.isUsingIndexedDb && this.root && !await this.ensureHandlePermission(this.root)) return { ok: !1, error: "需要用户明确授予图库写入权限" };
    try {
      let e = t.blob || t.file;
      if (!e && (t.url || t.dataUrl)) {
        const r = t.dataUrl || this.assertPublicHttps(t.url), i = await fetch(r, { credentials: "omit", redirect: "error", signal: AbortSignal.timeout(15e3) });
        if (!i.ok) throw new Error("图片读取失败");
        e = await i.blob();
      }
      if (!e) throw new Error("未提供图片");
      return await this.detectImage(e), this.isUsingIndexedDb ? (await j(e, t.file?.name || "收藏图片", this.activePath || "默认", this.ownerId), await this.loadIndexedDbLibrary(this.activePath)) : (await this.saveBlobToDir(this.root, e, this.tree?.name || "本地图库"), await this.loadLibrary(this.activePath)), { ok: !0 };
    } catch {
      return { ok: !1, error: "图片读取或保存未确认，请核对图库；未自动重试或回退其他目录" };
    }
  }
  async handleDropToFavorites(t) {
    let e = 0;
    const r = this.extractImageUrlFromTransfer(t);
    if (r) {
      const i = await this.saveImageToFavoritesAny({ url: r });
      if (i.ok)
        e++;
      else
        throw new Error(i.error || "图片下载并写入磁盘失败，请重试");
    }
    if (e === 0 && t.files && t.files.length > 0)
      for (const i of [...t.files])
        (i.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(i.name)) && (await this.saveImageToFavoritesAny({ file: i })).ok && e++;
    if (e === 0 && t.items && t.items.length > 0) {
      for (const i of [...t.items])
        if (i.kind === "file" && i.type.startsWith("image/")) {
          const s = i.getAsFile();
          s && (await this.saveImageToFavoritesAny({ file: s })).ok && e++;
        }
    }
    if (e > 0) {
      const i = `✓ 已成功存入当前图库 (${e} 张)`;
      return this.toast(i), { ok: !0, count: e, message: i };
    } else
      throw new Error("未能识别到有效图片内容，请直接从网页按住图片拖过来");
  }
  /**
   * 支持通过剪贴板 Ctrl+V 粘贴直接存入收藏夹
   */
  async handlePasteToFavorites(t) {
    return this.handleDropToFavorites(t);
  }
  async detectImage(t) {
    if (t.size <= 0 || t.size > G) throw new Error("图片大小须在 25MB 以内");
    const e = new Uint8Array(await t.slice(0, 16).arrayBuffer());
    let r = "";
    for (let i = 0; i < e.length; i++)
      r += String.fromCharCode(e[i]);
    if (e[0] === 137 && r.slice(1, 4) === "PNG") return ["png", "image/png"];
    if (e[0] === 255 && e[1] === 216 && e[2] === 255) return ["jpg", "image/jpeg"];
    if (r.startsWith("GIF87a") || r.startsWith("GIF89a")) return ["gif", "image/gif"];
    if (r.startsWith("RIFF") && r.slice(8, 12) === "WEBP") return ["webp", "image/webp"];
    if (r.startsWith("BM")) return ["bmp", "image/bmp"];
    throw new Error("文件不是受支持的 PNG/JPEG/GIF/WebP/BMP 图片");
  }
  assertPublicHttps(t) {
    const e = new URL(t);
    if (e.protocol !== "https:" || e.username || e.password) throw new Error("只支持不带账号密码的 HTTPS 图片链接");
    const r = e.hostname.toLowerCase();
    if (r === "localhost" || r === "0.0.0.0" || r === "::1" || /^127\./.test(r) || /^10\./.test(r) || /^192\.168\./.test(r) || /^169\.254\./.test(r) || /^172\.(1[6-9]|2\d|3[01])\./.test(r))
      throw new Error("不允许访问本机或内网地址");
    return e.href;
  }
  droppedUrl(t) {
    const e = String(t.getData("text/uri-list") || "").split(/\r?\n/).find((s) => s && !s.startsWith("#"));
    if (e) return e;
    const r = t.getData("text/html");
    if (r) {
      const s = new DOMParser().parseFromString(r, "text/html").querySelector("img")?.src;
      if (s) return s;
    }
    const i = String(t.getData("text/plain") || "").trim();
    return /^https:\/\//i.test(i) || i.startsWith("data:image/") ? i : "";
  }
  attachBoard() {
    return this.unsubscribeAction || (this.unsubscribeAction = this.board.onAction((t, e) => {
      const r = async () => {
        if (t === "choose-folder")
          await this.authorizeOrChooseRoot();
        else if (t === "load-more")
          this.showMore();
        else if (t === "prev-page")
          this.prevPage();
        else if (t === "next-page")
          this.nextPage();
        else if (t === "go-page")
          this.goToPage(Number(e) || 1);
        else if (t === "refresh")
          this.loadLibrary(this.activePath);
        else if (t === "rename-folder" || t === "delete-folder" || t === "reorder-folders")
          await this.editFolder(t, e);
        else if (t === "create-folder") {
          if (this.isUsingIndexedDb) {
            const o = String(e || "").trim();
            if (!this.validPackName(o) || o === "全部") throw new Error("分类名称无效，不能使用保留名称“全部”。");
            if ((await F()).includes(o)) throw new Error("已有同名分类");
            await Tt(o, this.ownerId), this.toast(`已创建分类「${o}」`), await this.loadIndexedDbLibrary(o);
            return;
          }
          const i = this.validPackName(e);
          if (!i || i === "全部") throw new Error("分类名称无效");
          if (!this.libraryIndex) throw new Error("请先授权并读取图库");
          const s = pt(this.libraryIndex, this.activePath, i), a = s.groups[s.groups.length - 1], d = this.activePath ? `${this.activePath}/${a.id}` : a.id;
          await this.commitIndex(s, d);
        } else if (t === "select-folder" || t === "select-pill") {
          if (this.currentPage = 1, this.isUsingIndexedDb) {
            const s = String(e ?? "");
            await this.loadIndexedDbLibrary(s);
            return;
          }
          const i = String(e || "");
          typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [U]: i }), Number.isFinite(this.displayLimit) && (this.displayLimit = 12), this.activePath = i, this.filterSubPath = "", this.renderTree(), this.renderItems();
        } else if (t === "toggle-expand") {
          const i = String(e || ""), s = new Set(this.expandedPaths);
          s.has(i) ? s.delete(i) : s.add(i), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [z]: [...s] }), this.expandedPaths = s, this.renderTree();
        } else if (t === "pick-files")
          document.getElementById("sticker-file-input")?.click();
        else if (t === "copy-item")
          e && await this.copyItem(e);
        else if (t === "assign-item") {
          const i = e?.item;
          if (!this.libraryIndex || !i?.id || this.isUsingIndexedDb) throw new Error("该操作需要已授权的本地图库");
          await this.commitIndex(yt(this.libraryIndex, i.id, String(e?.path || "")));
        } else if (t === "delete-item") {
          const i = e;
          if (this.isUsingIndexedDb) {
            i?.id && (await Lt(i.id, this.ownerId), this.previews.delete(i.id), this.toast("已删除表情"), await this.loadIndexedDbLibrary(this.activePath));
            return;
          }
          if (!this.libraryIndex || !i?.id) throw new Error("图库索引尚未就绪");
          await this.deleteDirectoryImage(i.id);
        }
      };
      return ["refresh", "load-more", "prev-page", "next-page", "go-page", "copy-item", "pick-files"].includes(t) ? r() : this.mutation(r);
    })), () => {
      this.unsubscribeAction?.(), this.unsubscribeAction = void 0;
    };
  }
  init() {
    this.initialized || this.disposed || (this.initialized = !0, this.storageListener = (t, e) => {
      if (e !== "local") return;
      const r = t[B]?.newValue;
      typeof r == "string" && r.startsWith(`${this.ownerId}:`) || (v in t || A in t || Y in t || B in t) && (this.pauseReads(), this.clearBlobUrlCache(), this.root = null, this.tree = null, this.board.updateState({ hasFolder: !1, rootName: "", libraryImageCount: null, needsReadPermission: !1, items: [], folders: [], folderPath: "目录配置已变更，旧列表已失效" }), this.canRead() && this.loadLibrary(this.activePath));
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
  async loadIndexedDbLibrary(t = "") {
    if (this.disposed || !this.canRead()) return;
    const e = this.beginLibraryRead(++this.readVersion), r = e.current;
    if (r()) {
      this.loading = !0, this.previews.cancelPending(), this.board.updateState({ loading: !0 });
      try {
        const i = await e.wait(() => F());
        if (!r()) return;
        const s = await e.wait(() => Mt());
        if (!r()) return;
        const a = i.includes(t) ? t : "";
        this.activePath = a;
        const d = i.map((h) => ({
          name: h,
          path: h,
          depth: 0,
          itemCount: s.groupCounts[h] || 0,
          subDirs: [],
          isExpanded: !1
        })), o = a ? s.groupCounts[a] || 0 : s.total, c = this.isBoardPaging ? this.pageSize : Math.min(this.displayLimit, 120);
        this.currentPage = Math.max(1, Math.min(this.currentPage, Math.max(1, Math.ceil(o / this.pageSize))));
        const u = await e.wait(() => Bt(a || void 0, this.isBoardPaging ? (this.currentPage - 1) * this.pageSize : 0, c));
        if (!r()) return;
        const l = o;
        let m = u, f = 1;
        this.isBoardPaging && (f = Math.max(1, Math.ceil(l / this.pageSize)), this.currentPage > f && (this.currentPage = f), this.currentPage < 1 && (this.currentPage = 1)), this.totalPages = f, this.previews.retain(new Set(m.map((h) => h.id)));
        const g = [];
        for (let h = 0; h < m.length; h += 2) {
          const w = await e.wait(() => Promise.all(m.slice(h, h + 2).map(async (b) => {
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
              sizeText: et(b.size),
              url: y
            };
          })));
          if (!r()) return;
          g.push(...w.filter((b) => !!b));
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
          subFolders: d.map((h) => ({ name: h.name, path: h.path, count: h.itemCount })),
          dropPrompt: `拖入图片直接保存到「${a || "默认"}」分类`,
          totalCountText: p,
          folders: [{ name: "全部表情", path: "", depth: 0, itemCount: s.total, subDirs: [] }, ...d],
          subnavPills: [],
          items: g,
          emptyText: g.length === 0 ? "暂无表情包，可直接从网页或电脑拖入图片保存" : "",
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
        e.finish() && (this.loading = !1, this.board.updateState({ loading: !1 }));
      }
    }
  }
  async commitIndex(t, e = this.activePath) {
    const r = await this.repository.save(t);
    this.disposed || this.libraryIndex?.id !== r.id || (this.libraryIndex = r, this.sourceTree && (this.tree = K(r, this.sourceTree)), this.board.updateState({ folderSummary: `${r.groups.length} 个分类 · ${this.tree?.totalCount || 0} 张图片` }), this.activePath = e, this.currentPage = 1, this.clearBlobUrlCache(), this.canRead() && (this.renderTree(), this.renderItems()));
  }
  async revealHiddenImages() {
    if (!this.libraryIndex) throw new Error("请先读取本地图库");
    const t = S(this.libraryIndex);
    t.images.forEach((e) => {
      e.hidden = !1;
    }), await this.commitIndex(t);
  }
  async exportIndexBackup() {
    if (this.libraryIndex) return H(this.libraryIndex);
    const t = await this.readSavedRoot();
    if (!t) throw new Error("没有已关联的目录句柄，未猜测其他图库");
    const e = await this.repository.find(t);
    if (!e) throw new Error("此目录尚未建立分类索引，请先授权读取");
    return H(e);
  }
  async restoreIndexBackup(t) {
    if (!this.libraryIndex) throw new Error("请先读取已授权的本地图库");
    if (!this.sourceTree) throw new Error("请先刷新图库再恢复索引");
    const e = new Set(this.collectAllItems(this.sourceTree).map((i) => i.id || "")), r = Pt(this.libraryIndex, t, e);
    return await this.commitIndex(r.index, ""), { matched: r.matched, unmatched: r.unmatched };
  }
  /** Virtual classification edits never touch disk directories or originals. */
  async editFolder(t, e) {
    if (this.disposed || !this.canRead() || this.editingFolders || this.loading) throw new Error("目录正在读取或保存，请稍候再操作。");
    this.editingFolders = !0;
    const r = this.activePath;
    try {
      const i = String(e?.path || ""), s = t === "rename-folder" ? this.validPackName(e?.name) : "";
      if (t === "rename-folder" && !s) throw new Error("名称不能为空，最长50字，且不能包含路径或特殊字符。");
      if (this.isUsingIndexedDb) {
        if (t === "rename-folder" && s === "全部") throw new Error("“全部”为保留名称，请换一个分类名称。");
        if (t === "reorder-folders") {
          if (!Array.isArray(e?.paths) || e.parentPath !== "") throw new Error("只能调整同级分类顺序");
          await Ct(e.paths, this.ownerId);
        } else {
          if (!i || i === "默认") throw new Error("全部表情和默认分类不能删除或重命名");
          if (!(await F()).includes(i)) throw new Error("分类已不存在，请重新打开模块核对。");
          t === "rename-folder" ? await $t(i, s, this.ownerId) : await Rt(i, this.ownerId);
        }
        if (this.disposed) return;
        const c = t !== "reorder-folders" && r === i ? t === "rename-folder" ? s : "默认" : r;
        this.canRead() && await this.loadIndexedDbLibrary(c);
        return;
      }
      if (!this.libraryIndex) throw new Error("图库索引尚未读取，请重新打开模块。");
      const a = t === "rename-folder" ? { ...e, name: s } : e, d = bt(this.libraryIndex, t, a);
      let o = r;
      t === "delete-folder" && (r === i || r.startsWith(`${i}/`)) && (o = i.includes("/") ? i.slice(0, i.lastIndexOf("/")) : ""), await this.commitIndex(d, o);
    } finally {
      this.editingFolders = !1;
    }
  }
  async saveFilesToIndexedDb(t) {
    const e = this.activePath || "默认";
    if (!this.isUsingIndexedDb) throw new Error("已配置本地图库，未转存到内置库");
    if (t.length > 50) throw new Error("一次最多导入50张，请分批选择");
    for (const r of t)
      await this.detectImage(r), await j(r, r.name, e, this.ownerId);
    await this.loadIndexedDbLibrary(e);
  }
  async saveUrlToIndexedDb(t) {
    if (!this.isUsingIndexedDb) throw new Error("已配置本地图库，未转存到内置库");
    const e = await fetch(t.startsWith("data:image/") ? t : this.assertPublicHttps(t), { credentials: "omit", redirect: "error", signal: AbortSignal.timeout(15e3) });
    if (!e.ok) throw new Error("图片读取失败");
    const r = await e.blob();
    await this.detectImage(r);
    const i = this.activePath || "默认", s = r.type.split("/")[1] || "png", a = `web_${Date.now()}.${s}`;
    await j(r, a, i, this.ownerId), await this.loadIndexedDbLibrary(i);
  }
}
const Ot = new Ut(_, () => !document.hidden, st, 120);
export {
  Ut as S,
  _ as a,
  ht as c,
  Ot as s
};
