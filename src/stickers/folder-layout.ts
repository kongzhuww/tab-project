import type { StickerDirectoryNode } from "./sticker-types";

export interface FolderLayout {
  revision: string;
  aliases: Record<string, string>;
  removed: string[];
  orders: Record<string, string[]>;
}
interface SavedLayout extends FolderLayout { root: FileSystemDirectoryHandle }
const KEY = "folder-layout-v1";

/** Local presentation metadata, bound to the actual authorized root handle. */
export async function readFolderLayout(db: IDBDatabase, root: FileSystemDirectoryHandle): Promise<FolderLayout> {
  const saved = await new Promise<SavedLayout | undefined>((resolve, reject) => {
    const tx = db.transaction("handles", "readonly");
    const request = tx.objectStore("handles").get(KEY);
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = tx.onabort = () => reject(tx.error || new Error("分类设置读取失败"));
  });
  const revision = saved?.revision || "";
  let sameRoot = false;
  try { sameRoot = !!saved && await root.isSameEntry(saved.root); } catch { /* Old unavailable roots are not a match. */ }
  if (saved && sameRoot) {
    return { revision, aliases: saved.aliases, removed: saved.removed, orders: saved.orders };
  }
  return { revision, aliases: {}, removed: [], orders: {} };
}

/** Compare-and-set in one transaction; never overwrite another page's edit. */
export async function saveFolderLayout(db: IDBDatabase, root: FileSystemDirectoryHandle, next: FolderLayout): Promise<FolderLayout> {
  const saved: SavedLayout = { ...next, root, revision: crypto.randomUUID() };
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("handles", "readwrite");
    let failure: Error | undefined;
    const store = tx.objectStore("handles");
    const request = store.get(KEY);
    request.onsuccess = () => {
      if ((request.result?.revision || "") !== next.revision) {
        failure = new Error("分类已被其他页面修改，请重新打开表情包模块后再操作。");
        tx.abort(); return;
      }
      store.put(saved, KEY);
    };
    tx.oncomplete = () => resolve();
    tx.onerror = tx.onabort = () => reject(failure || tx.error || new Error("分类设置保存未完成"));
  });
  return { revision: saved.revision, aliases: saved.aliases, removed: saved.removed, orders: saved.orders };
}

/** Hidden categories are folded into their visible parent, retaining every file handle. */
export function projectFolderTree(source: StickerDirectoryNode, layout: FolderLayout): StickerDirectoryNode {
  const removed = new Set(layout.removed);
  const collect = (node: StickerDirectoryNode): StickerDirectoryNode["directItems"] => [
    ...node.directItems, ...node.subDirs.flatMap(collect)
  ];
  function visit(node: StickerDirectoryNode): StickerDirectoryNode {
    const name = Object.hasOwn(layout.aliases, node.path) ? layout.aliases[node.path] : node.name;
    const directItems = node.directItems.map(item => ({ ...item, folderName: name }));
    const subDirs: StickerDirectoryNode[] = [];
    for (const child of node.subDirs) {
      if (removed.has(child.path)) directItems.push(...collect(child).map(item => ({ ...item, folderName: name })));
      else subDirs.push(visit(child));
    }
    const paths = Object.hasOwn(layout.orders, node.path) ? layout.orders[node.path] : [];
    const order = new Map(paths.map((path, index) => [path, index]));
    subDirs.sort((a, b) => (order.get(a.path) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.path) ?? Number.MAX_SAFE_INTEGER));
    return { ...node, name, directItems, subDirs };
  }
  return visit(source);
}
