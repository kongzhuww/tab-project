import type { OrganizerPlanStep } from './employee-contract';

export const isFolderEdit = (type: OrganizerPlanStep['type']) => type === 'rename_folder' || type === 'remove_folder' || type === 'merge_folders';

export function folderDestination<T extends { parentId?: string }>(sourceId: string, targetId: string | undefined, find: (id: string) => T | undefined) {
  const target = targetId ? find(targetId) : undefined;
  if (targetId && !target) throw new Error('找不到目标文件夹。');
  const seen = new Set([sourceId]);
  for (let id = targetId; id; id = find(id)?.parentId) {
    if (seen.has(id)) throw new Error('不能合并到自身或子文件夹。');
    seen.add(id);
  }
  return target;
}

export function editDesktopFolder<F extends { name: string; parent?: string; page: string }, L extends { group?: string; page?: string }>(
  folders: Map<string, F>, links: L[], type: OrganizerPlanStep['type'], sourceName: string, value: string | undefined, rootGroup: string,
) {
  const source = folders.get(sourceName);
  if (!source || sourceName === rootGroup) throw new Error('找不到要整理的文件夹。');
  if (type === 'rename_folder' && (!value || value === rootGroup || folders.has(value))) throw new Error('文件夹名称不可用。');
  const targetName = type === 'merge_folders' ? value : source.parent;
  if (type === 'merge_folders' && !targetName) throw new Error('请选择合并目标。');
  folderDestination(sourceName, targetName, id => {
    const folder = folders.get(id);
    return folder && { parentId: folder.parent };
  });
  const destination = type === 'rename_folder' ? value : targetName;
  const page = (targetName && folders.get(targetName)?.page) || source.page;
  const subtree = new Set([sourceName]);
  for (let changed = true; changed;) {
    changed = false;
    for (const [name, f] of folders) if (f.parent && subtree.has(f.parent) && !subtree.has(name)) { subtree.add(name); changed = true; }
  }
  folders.delete(sourceName);
  if (type === 'rename_folder' && destination) folders.set(destination, { ...source, name: destination });
  for (const [id, f] of folders) {
    if (!subtree.has(id)) continue;
    const next = { ...f, page };
    if (f.parent === sourceName) {
      if (destination) next.parent = destination;
      else delete next.parent;
    }
    folders.set(id, next);
  }
  for (const link of links) {
    if (link.group && subtree.has(link.group)) link.page = page;
    if (link.group === sourceName) link.group = destination || rootGroup;
  }
}
