import type { StickerFileItem } from "./sticker-types";

/** Passive checks never prompt. Write permission is only requested by an explicit mutation. */
export async function hasStickerReadPermission(handle: FileSystemHandle | null): Promise<boolean> {
  if (!handle) return false;
  try { return await (handle as any).queryPermission({ mode: "read" }) === "granted"; }
  catch { return false; }
}
export async function requestStickerWritePermission(handle: FileSystemHandle): Promise<boolean> {
  try {
    if (await (handle as any).queryPermission({ mode: "readwrite" }) === "granted") return true;
    return await (handle as any).requestPermission({ mode: "readwrite" }) === "granted";
  } catch { return false; }
}
export function readStickerOriginal(handle: FileSystemFileHandle): Promise<File> { return handle.getFile(); }

/** Caller owns permission, image validation, target selection and index registration.
 * Once writing starts, view cancellation is NOT a filesystem rollback. Never retry here. */
export async function writeStickerOriginal(dir: FileSystemDirectoryHandle, blob: Blob, extension: string, mime: string, current: () => boolean): Promise<{ fileName: string; handle: FileSystemFileHandle }> {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const fileName = `${stamp}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  if (!current()) throw new Error("图库已切换，未继续写入旧目录");
  const handle = await dir.getFileHandle(fileName, { create: true });
  const writable = await (handle as any).createWritable();
  try {
    await writable.write(new Blob([blob], { type: mime }));
    await writable.close();
  } catch (error) { try { await writable.abort(); } catch {} throw error; }
  return { fileName, handle };
}

/** Invoke only AFTER explicit per-image confirmation and write permission.
 * Resolves the actual handle, verifies the captured metadata, removes ONE leaf, never recursive. */
export async function deleteStickerOriginal(root: FileSystemDirectoryHandle, selected: FileSystemDirectoryHandle | null,
  target: Readonly<Pick<StickerFileItem, "relPath" | "size" | "modified" | "handle">>, current: () => boolean): Promise<void> {
  if (!selected || !await root.isSameEntry(selected)) throw new Error("已切换图库，未删除原图");
  const components = await root.resolve(target.handle);
  if (!components?.length || components.join("/") !== target.relPath ||
      components.some(part => !part || part === "." || part === ".." || /[/\\]/.test(part))) {
    throw new Error("原图已移动或位置无法确认，未删除，请刷新图库");
  }
  let parent = root;
  for (const part of components.slice(0, -1)) parent = await parent.getDirectoryHandle(part);
  const name = components[components.length - 1];
  const entry = await parent.getFileHandle(name);
  const file = await readStickerOriginal(entry);
  if (!await entry.isSameEntry(target.handle) || file.size !== target.size || file.lastModified !== target.modified || !current()) {
    throw new Error("原图或图库已变化，未删除，请刷新后重新确认");
  }
  await parent.removeEntry(name);
}
