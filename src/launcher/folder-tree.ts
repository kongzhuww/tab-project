export interface LauncherFolderRecord { name: string; page?: string; parent?: string }
export type LauncherFolderMap = Record<string, LauncherFolderRecord>;
const own = (map: object, key: string) => Object.prototype.hasOwnProperty.call(map, key);
// Bad imported parent references are displayed at the root, never hidden or deleted.
export function folderParent(folders: LauncherFolderMap, name: string): string | undefined {
  if (!own(folders, name)) return;
  const parent = folders[name]?.parent;
  if (!parent || typeof parent !== "string" || !own(folders, parent)) return;
  const seen = new Set([name]);
  let current: string | undefined = parent;
  while (current) {
    if (seen.has(current)) return;
    seen.add(current);
    current = own(folders, current) ? folders[current]?.parent : undefined;
  }
  return parent;
}
export function folderSubtree(folders: LauncherFolderMap, name: string): Set<string> {
  const result = new Set([name]);
  const children = new Map<string, string[]>();
  for (const key of Object.keys(folders)) {
    const parent = folderParent(folders, key);
    if (parent) children.set(parent, [...(children.get(parent) || []), key]);
  }
  const queue = [name];
  for (let index = 0; index < queue.length; index++) for (const child of children.get(queue[index]) || []) {
    if (!result.has(child)) { result.add(child); queue.push(child); }
  }
  return result;
}
