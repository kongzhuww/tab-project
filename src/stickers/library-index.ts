import type { StickerDirectoryNode, StickerFileItem } from "./sticker-types";

export const LIBRARY_CHANGE_KEY = "stickerLibraryIndexRevision";
const ROOTS_KEY = "virtual-library-roots-v1";
const key = (id: string) => `virtual-library:${id}`;
const newId = (prefix: string) => `${prefix}_${crypto.randomUUID()}`;
async function sameEntry(left: FileSystemHandle, right: FileSystemHandle): Promise<boolean> {
  try { return await left.isSameEntry(right); } catch { return false; }
}
export interface LibraryGroup { id: string; parentId: string; name: string; order: number }
export interface LibraryImage {
  id: string; path: string; name: string; size: number; modified: number;
  groupId: string; hidden: boolean; handle?: FileSystemFileHandle;
}
export interface LibraryIndex {
  schema: 1; id: string; revision: string; root: FileSystemDirectoryHandle;
  groups: LibraryGroup[]; images: LibraryImage[];
}
interface Roots { revision: string; entries: { id: string; root: FileSystemDirectoryHandle }[] }

function read<T>(db: IDBDatabase, name: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("handles", "readonly"), request = tx.objectStore("handles").get(name);
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = tx.onabort = () => reject(new Error("图库索引读取失败"));
  });
}
async function announce(revision: string, owner: string): Promise<void> {
  // Failure to notify another page must not misreport a committed transaction as failed.
  try { await chrome.storage.local.set({ [LIBRARY_CHANGE_KEY]: `${owner}:${revision}` }); } catch {}
}
declare const chrome: any;

/** Compare-and-set. Browser metadata only, never a filesystem mutation. */
export async function saveLibraryIndex(db: IDBDatabase, value: LibraryIndex, owner: string): Promise<LibraryIndex> {
  const next = { ...value, revision: crypto.randomUUID() };
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("handles", "readwrite"), store = tx.objectStore("handles");
    let failure: Error | undefined;
    const request = store.get(key(value.id));
    request.onsuccess = () => {
      if (request.result?.revision !== value.revision) {
        failure = new Error("图库索引已被其他页面修改，请刷新图库后再操作；未覆盖对方修改。");
        tx.abort(); return;
      }
      store.put(next, key(next.id));
    };
    tx.oncomplete = () => resolve();
    tx.onerror = tx.onabort = () => reject(failure || new Error("图库索引保存未确认，请重读核对后再试"));
  });
  await announce(next.revision, owner);
  return next;
}

export function cloneLibraryIndex(value: LibraryIndex): LibraryIndex {
  return { ...value, groups: value.groups.map(group => ({ ...group })), images: value.images.map(image => ({ ...image })) };
}
function allFiles(tree: StickerDirectoryNode): StickerFileItem[] {
  return [...tree.directItems, ...tree.subDirs.flatMap(allFiles)];
}
function seed(root: FileSystemDirectoryHandle, tree: StickerDirectoryNode): LibraryIndex {
  const result: LibraryIndex = { schema: 1, id: newId("library"), revision: crypto.randomUUID(), root, groups: [], images: [] };
  function visit(node: StickerDirectoryNode, parentId: string) {
    node.directItems.forEach(file => result.images.push({ id: newId("image"), path: file.relPath,
      name: file.file, size: file.size, modified: file.modified, groupId: parentId, hidden: false, handle: file.handle }));
    node.subDirs.forEach((child, order) => {
      const id = newId("group");
      result.groups.push({ id, parentId, name: child.name, order });
      visit(child, id);
    });
  }
  visit(tree, "");
  return result;
}

/** Read existing metadata even when directory content is not currently authorized/readable. */
export async function findLibraryIndex(db: IDBDatabase, root: FileSystemDirectoryHandle): Promise<LibraryIndex | null> {
  const roots = await read<Roots>(db, ROOTS_KEY);
  for (const entry of roots?.entries || []) {
    if (await sameEntry(root, entry.root)) {
      const saved = await read<LibraryIndex>(db, key(entry.id));
      if (saved?.schema === 1 && Array.isArray(saved.groups) && Array.isArray(saved.images)) return saved;
      throw new Error("已有图库索引无法读取，未替换或清空");
    }
  }
  return null;
}

/** Bind to a real handle, not a folder label or absolute path. Old roots keep their own index. */
export async function loadLibraryIndex(db: IDBDatabase, root: FileSystemDirectoryHandle,
  legacyTree: StickerDirectoryNode, owner: string): Promise<LibraryIndex> {
  if (!navigator.locks) throw new Error("当前环境不支持图库索引锁");
  return navigator.locks.request("logicweaver:sticker-library-roots", { signal: AbortSignal.timeout(15000) }, async () => {
    const roots = await read<Roots>(db, ROOTS_KEY) || { revision: "", entries: [] };
    for (const entry of roots.entries) {
      if (await sameEntry(root, entry.root)) {
        const saved = await read<LibraryIndex>(db, key(entry.id));
        if (!saved || saved.schema !== 1 || !Array.isArray(saved.images) || !Array.isArray(saved.groups)) {
          throw new Error("已有图库索引无法读取，未创建空索引覆盖；请先备份核对");
        }
        return saved;
      }
    }
    const created = seed(root, legacyTree);
    if (created.images.length > 20000 || created.groups.length > 2000) throw new Error("图库过大，请分库管理");
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("handles", "readwrite"), store = tx.objectStore("handles");
      store.put(created, key(created.id));
      store.put({ revision: crypto.randomUUID(), entries: [...roots.entries, { id: created.id, root }] }, ROOTS_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => reject(new Error("图库索引初始化未确认，请重读核对"));
    });
    await announce(created.revision, owner);
    return created;
  });
}

/** Stable UUIDs survive classification and matching handle renames. Missing rows are retained. */
export async function reconcileLibraryIndex(db: IDBDatabase, value: LibraryIndex, tree: StickerDirectoryNode,
  owner: string, signal?: AbortSignal): Promise<LibraryIndex> {
  const next = cloneLibraryIndex(value), files = allFiles(tree);
  if (files.length > 20000) throw new Error("图库超过两万张，本次未更新索引，请分库管理");
  const byPath = new Map<string, LibraryImage>();
  value.images.forEach(image => byPath.set(image.path, image));
  const signatures = new Map<string, LibraryImage[]>();
  value.images.forEach(image => {
    const signature = `${image.size}:${image.modified}`;
    const rows = signatures.get(signature) || [];
    rows.push(image); signatures.set(signature, rows);
  });
  const matched = new Set<string>();
  let changed = false;
  for (const file of files) {
    signal?.throwIfAborted();
    let image = byPath.get(file.relPath);
    if (image?.handle && !await sameEntry(image.handle, file.handle)) image = undefined;
    if (!image?.handle) image = undefined;
    if (!image) {
      // Do not guess identity from a same-name/size collision; require actual handle identity.
      const candidates = (signatures.get(`${file.size}:${file.modified}`) || []).filter(row => !matched.has(row.id) && row.handle);
      if (candidates.length <= 16) {
        for (const candidate of candidates) {
          if (await sameEntry(candidate.handle!, file.handle)) { image = candidate; break; }
        }
      }
    }
    if (image && !matched.has(image.id)) {
      matched.add(image.id);
      file.id = image.id;
      if (image.path !== file.relPath || image.size !== file.size || image.modified !== file.modified || image.name !== file.file) {
        const index = next.images.findIndex(row => row.id === image!.id);
        next.images[index] = { ...image, path: file.relPath, name: file.file, size: file.size, modified: file.modified, handle: file.handle };
        changed = true;
      }
    } else {
      file.id = newId("image");
      next.images.push({ id: file.id, path: file.relPath, name: file.file, size: file.size,
        modified: file.modified, groupId: "", hidden: false, handle: file.handle });
      changed = true;
    }
  }
  signal?.throwIfAborted();
  if (next.images.length > 20000) throw new Error("包含失联记录的图库索引超过两万条，请先导出备份并分库管理");
  return changed ? saveLibraryIndex(db, next, owner) : value;
}

export function groupPaths(index: LibraryIndex): Map<string, string> {
  const paths = new Map<string, string>([["", ""]]);
  const visit = (parent: string, prefix: string, depth: number) => {
    if (depth > 32) throw new Error("分类层级无效");
    index.groups.filter(group => group.parentId === parent).forEach(group => {
      const path = prefix ? `${prefix}/${group.id}` : group.id;
      paths.set(group.id, path); visit(group.id, path, depth + 1);
    });
  };
  visit("", "", 0);
  if (paths.size !== index.groups.length + 1) throw new Error("分类索引包含失联节点或循环，未显示错误关系");
  return paths;
}
export function groupIdAtPath(index: LibraryIndex, path: string): string {
  const found = [...groupPaths(index)].find(([, candidate]) => candidate === path);
  if (!found) throw new Error("分类已变化，请重新选择");
  return found[0];
}

/** Project physical files into virtual groups. Every group targets the ONE root for imports. */
export function projectLibraryTree(index: LibraryIndex, source: StickerDirectoryNode): StickerDirectoryNode {
  const paths = groupPaths(index), nodes = new Map<string, StickerDirectoryNode>();
  nodes.set("", { ...source, path: "", directItems: [], subDirs: [], totalCount: 0 });
  index.groups.forEach(group => nodes.set(group.id, { handle: source.handle, name: group.name,
    path: paths.get(group.id)!, depth: paths.get(group.id)!.split("/").length, directItems: [], subDirs: [], totalCount: 0 }));
  [...index.groups].sort((a, b) => a.order - b.order).forEach(group => nodes.get(group.parentId)!.subDirs.push(nodes.get(group.id)!));
  const rows = new Map(index.images.map(image => [image.path, image]));
  const ids = new Map(index.images.map(image => [image.id, image]));
  for (const file of allFiles(source)) {
    const image = (file.id && ids.get(file.id)) || rows.get(file.relPath);
    if (!image) continue;
    file.id = image.id;
    if (image.hidden) continue;
    const node = nodes.get(image.groupId) || nodes.get("")!;
    node.directItems.push({ ...file, id: image.id, folderPath: node.path, folderName: node.name });
  }
  const count = (node: StickerDirectoryNode): number => {
    node.directItems.sort((a, b) => b.modified - a.modified);
    node.totalCount = node.directItems.length + node.subDirs.reduce((sum, child) => sum + count(child), 0);
    return node.totalCount;
  };
  const root = nodes.get("")!; count(root); return root;
}

export function addVirtualGroup(index: LibraryIndex, parentPath: string, name: string): LibraryIndex {
  const next = cloneLibraryIndex(index), parentId = groupIdAtPath(next, parentPath);
  if (next.groups.length >= 2000) throw new Error("分类数量达到上限");
  if (next.groups.some(group => group.parentId === parentId && group.name.toLocaleLowerCase() === name.toLocaleLowerCase())) throw new Error("同级已有同名分类");
  next.groups.push({ id: newId("group"), parentId, name, order: Date.now() });
  groupPaths(next);
  return next;
}
export function editVirtualGroup(index: LibraryIndex, action: "rename-folder" | "delete-folder" | "reorder-folders", payload: any): LibraryIndex {
  const next = cloneLibraryIndex(index);
  if (action === "reorder-folders") {
    const parent = groupIdAtPath(next, String(payload?.parentPath || ""));
    const siblings = next.groups.filter(group => group.parentId === parent);
    const paths = groupPaths(next), requested = payload?.paths;
    if (!Array.isArray(requested) || requested.length !== siblings.length || new Set(requested).size !== siblings.length || requested.some(path => !siblings.some(group => paths.get(group.id) === path))) throw new Error("只能调整当前同级的完整分类顺序");
    siblings.forEach(group => { group.order = requested.indexOf(paths.get(group.id)); });
  } else {
    const id = groupIdAtPath(next, String(payload?.path || ""));
    const group = next.groups.find(group => group.id === id);
    if (!group) throw new Error("全部入口不能修改");
    if (action === "rename-folder") {
      if (next.groups.some(other => other.id !== id && other.parentId === group.parentId && other.name.toLocaleLowerCase() === String(payload.name).toLocaleLowerCase())) throw new Error("同级已有同名分类");
      group.name = payload.name;
    } else {
      const removed = new Set([id]);
      for (let i = 0; i <= next.groups.length; i++) {
        const before = removed.size;
        next.groups.forEach(child => { if (removed.has(child.parentId)) removed.add(child.id); });
        if (before === removed.size) break;
      }
      next.groups = next.groups.filter(child => !removed.has(child.id));
      next.images.forEach(image => { if (removed.has(image.groupId)) image.groupId = group.parentId; });
    }
  }
  return next;
}
export function assignLibraryImage(index: LibraryIndex, id: string, path: string | null): LibraryIndex {
  const next = cloneLibraryIndex(index), image = next.images.find(image => image.id === id);
  if (!image) throw new Error("图片索引已变化，请刷新");
  if (path === null) image.hidden = true;
  else { image.groupId = groupIdAtPath(next, path); image.hidden = false; }
  return next;
}

export function exportLibraryIndex(index: LibraryIndex): string {
  const result = JSON.stringify({ format: "logicweaver-sticker-index", schema: 1, rootName: index.root.name,
    groups: index.groups, images: index.images.map(({ handle: _handle, ...image }) => image) }, null, 2);
  if (new Blob([result]).size > 8 * 1024 * 1024) throw new Error("索引备份超过8MB，请分库管理");
  return result;
}

/** Import metadata only after explicit confirmation. No handles, absolute paths or image bytes. */
export function restoreLibraryIndex(index: LibraryIndex, input: string, present: ReadonlySet<string>): { index: LibraryIndex; matched: number; unmatched: number } {
  if (input.length > 8 * 1024 * 1024) throw new Error("索引备份不能超过8MB");
  const data = JSON.parse(input);
  if (data?.format !== "logicweaver-sticker-index" || data.schema !== 1 || !Array.isArray(data.groups) || !Array.isArray(data.images) || data.groups.length > 2000 || data.images.length > 20000) throw new Error("不是受支持的图库索引备份");
  const next = cloneLibraryIndex(index);
  const idValid = (id: unknown, prefix: string) => typeof id === "string" && new RegExp(`^${prefix}_[a-f0-9-]{36}$`).test(id);
  const ids = new Set<string>(), siblingNames = new Set<string>();
  next.groups = data.groups.map((group: any) => {
    if (!idValid(group?.id, "group") || ids.has(group.id) || (group.parentId !== "" && !idValid(group.parentId, "group")) || typeof group.name !== "string" || !group.name.trim() || group.name.length > 50 || /[\x00-\x1f/\\]/.test(group.name) || !Number.isFinite(group.order)) throw new Error("分类备份格式无效");
    const siblingName = JSON.stringify([group.parentId, group.name.toLocaleLowerCase()]);
    if (siblingNames.has(siblingName)) throw new Error("分类备份包含同级重名，未恢复");
    siblingNames.add(siblingName); ids.add(group.id);
    return { id: group.id, parentId: group.parentId, name: group.name, order: group.order };
  });
  groupPaths(next);
  let matched = 0;
  const used = new Set<string>(), imageIds = new Set<string>();
  const signature = (image: Pick<LibraryImage, "path" | "size" | "modified">) => JSON.stringify([image.path, image.size, image.modified]);
  const currentById = new Map(index.images.filter(image => image.handle && present.has(image.id)).map(image => [image.id, image]));
  const candidatesBySignature = new Map<string, LibraryImage[]>(), backupCounts = new Map<string, number>();
  currentById.forEach(image => { const k = signature(image); const rows = candidatesBySignature.get(k) || []; rows.push(image); candidatesBySignature.set(k, rows); });
  data.images.forEach((image: any) => { if (image) { const k = signature(image); backupCounts.set(k, (backupCounts.get(k) || 0) + 1); } });
  const restored: LibraryImage[] = data.images.map((image: any) => {
    if (!idValid(image?.id, "image") || imageIds.has(image.id) || typeof image.path !== "string" || image.path.length > 4096 || image.path.startsWith("/") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(image.path) || image.path.includes("\\") || image.path.split("/").some((part: string) => !part || part === "." || part === "..") || typeof image.name !== "string" || image.name.length > 255 || !Number.isSafeInteger(image.size) || image.size < 0 || !Number.isFinite(image.modified) || typeof image.hidden !== "boolean" || (image.groupId !== "" && !ids.has(image.groupId))) throw new Error("图片索引备份格式无效");
    imageIds.add(image.id);
    const direct = currentById.get(image.id);
    const k = signature(image), candidates = (candidatesBySignature.get(k) || []).filter(row => !used.has(row.id));
    const found = direct && !used.has(direct.id) ? direct : backupCounts.get(k) === 1 && candidates.length === 1 ? candidates[0] : undefined;
    if (found) { matched++; used.add(found.id); }
    return { id: image.id, path: found?.path || image.path, name: found?.name || image.name,
      size: found?.size ?? image.size, modified: found?.modified ?? image.modified,
      hidden: image.hidden, groupId: image.groupId, handle: found?.handle };
  });
  next.images = [...restored, ...index.images.filter(image => !used.has(image.id) && !imageIds.has(image.id))
    .map(image => ({ ...image, groupId: "" }))];
  if (next.images.length > 20000) throw new Error("合并后的索引超过两万条，未恢复");
  return { index: next, matched, unmatched: restored.length - matched };
}
