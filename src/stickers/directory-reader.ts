import type { StickerDirectoryNode, StickerFileItem } from "./sticker-types";
import { readStickerOriginal } from "./original-files";

export function supportedStickerFileName(name: string): boolean {
  return /\.(png|jpe?g|gif|webp|bmp)$/i.test(name || "");
}

/** Read-only metadata scan. Counters belong to this invocation, not a shared service. */
export async function scanStickerDirectory(dir: FileSystemDirectoryHandle, path = "", depth = 0, signal?: AbortSignal): Promise<{ tree: StickerDirectoryNode | null; omissions: number }> {
  let files = 0, omissions = 0;
  async function visit(handle: FileSystemDirectoryHandle, path: string, depth: number): Promise<StickerDirectoryNode | null> {
    signal?.throwIfAborted();
    if (depth > 6) { omissions++; return null; }
    const node: StickerDirectoryNode = { handle, name: handle.name, path, depth, directItems: [], subDirs: [], totalCount: 0 };
    const entries: { name: string; handle: FileSystemFileHandle }[] = [];
    for await (const [name, entry] of (handle as any).entries()) {
      signal?.throwIfAborted();
      if (name.startsWith(".") || name === "$RECYCLE.BIN" || name === "System Volume Information") continue;
      if (entry.kind === "directory") {
        const child = await visit(entry, path ? `${path}/${name}` : name, depth + 1);
        if (child) node.subDirs.push(child);
      } else if (entry.kind === "file" && supportedStickerFileName(name)) {
        if (++files > 20000) throw new Error("图库超过两万张，请分库管理");
        entries.push({ name, handle: entry as FileSystemFileHandle });
      }
    }
    // Native file reads are cooperative, not physically abortable; never read all at once.
    for (let offset = 0; offset < entries.length; offset += 16) {
      signal?.throwIfAborted();
      const items = await Promise.all(entries.slice(offset, offset + 16).map(async ({ name, handle: fileHandle }) => {
        signal?.throwIfAborted();
        try {
          const file = await readStickerOriginal(fileHandle);
          signal?.throwIfAborted();
          return { file: name, relPath: path ? `${path}/${name}` : name, folderPath: path,
            folderName: handle.name, size: file.size, modified: file.lastModified, handle: fileHandle, dirHandle: handle } as StickerFileItem;
        } catch { signal?.throwIfAborted(); omissions++; return null; }
      }));
      for (const item of items) if (item) node.directItems.push(item);
    }
    node.directItems.sort((a, b) => b.modified - a.modified);
    node.subDirs.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    node.totalCount = node.directItems.length + node.subDirs.reduce((sum, child) => sum + child.totalCount, 0);
    return node;
  }
  const tree = await visit(dir, path, depth);
  signal?.throwIfAborted();
  return { tree, omissions };
}

export function findStickerNode(node: StickerDirectoryNode | null, path: string): StickerDirectoryNode | null {
  if (!node) return null;
  if (node.path === path) return node;
  for (const child of node.subDirs) {
    const found = findStickerNode(child, path);
    if (found) return found;
  }
  return null;
}
export function collectStickerFiles(node: StickerDirectoryNode | null): StickerFileItem[] {
  if (!node) return [];
  return [...node.directItems, ...node.subDirs.flatMap(collectStickerFiles)];
}
export function countStickerFolders(node: StickerDirectoryNode | null): number {
  if (!node) return 0;
  return node.subDirs.length + node.subDirs.reduce((sum, child) => sum + countStickerFolders(child), 0);
}
