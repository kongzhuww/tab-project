import { sameSettingValue } from "./draft-values";

const owns = (value: object, key: string): boolean => Object.prototype.hasOwnProperty.call(value, key);
const conflict = (): never => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};

function shortcutMap(value: unknown): Record<string, unknown> {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  }
  return value as Record<string, unknown>;
}

function sameEntry(left: Record<string, unknown>, right: Record<string, unknown>, id: string): boolean {
  return owns(left, id) === owns(right, id) && (!owns(left, id) || sameSettingValue(left[id], right[id]));
}

// Preserve latest unknown/default overrides; only the draft's changed IDs express write intent.
export function mergeShortcutDraft(baseline: unknown, submitted: unknown, latest: unknown): Record<string, unknown> {
  const before = shortcutMap(baseline);
  const desired = shortcutMap(submitted);
  const current = shortcutMap(latest);
  const merged: Record<string, unknown> = Object.assign(Object.create(null), current);
  for (const id of new Set([...Object.keys(before), ...Object.keys(desired)])) {
    if (sameEntry(before, desired, id)) continue;
    if (owns(desired, id) && typeof desired[id] !== "string") {
      throw new Error("待保存的快捷键格式异常，未提交修改");
    }
    if (!sameEntry(current, before, id) && !sameEntry(current, desired, id)) conflict();
    if (owns(desired, id)) merged[id] = desired[id];
    else delete merged[id];
  }
  return merged;
}

export function ignoredFolderId(value: unknown): string | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const id = (value as Record<string, unknown>).id;
  if (typeof id === "string" && id.length) return id;
  if (typeof id === "number" && Number.isFinite(id)) return String(id);
  return undefined;
}

function folderList(value: unknown): unknown[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return value;
}

function indexFolders(values: unknown[]): Map<string, unknown> {
  const indexed = new Map<string, unknown>();
  for (const value of values) {
    const id = ignoredFolderId(value);
    if (id === undefined) continue;
    if (indexed.has(id)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
    indexed.set(id, value);
  }
  return indexed;
}

function sameFolder(left: Map<string, unknown>, right: Map<string, unknown>, id: string): boolean {
  return left.has(id) === right.has(id) && (!left.has(id) || sameSettingValue(left.get(id), right.get(id)));
}

// Legacy strings / ID-less records are opaque: retain the latest copy and never edit them here.
export function mergeIgnoredFolderDraft(baseline: unknown, submitted: unknown, latest: unknown): unknown[] {
  const before = folderList(baseline);
  const desired = folderList(submitted);
  const current = folderList(latest);
  const opaque = (values: unknown[]) => values.filter(value => ignoredFolderId(value) === undefined);
  if (!sameSettingValue(opaque(before), opaque(desired))) {
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  }
  const originalById = indexFolders(before);
  const desiredById = indexFolders(desired);
  const currentById = indexFolders(current);
  const merged = [...current];
  for (const id of new Set([...originalById.keys(), ...desiredById.keys()])) {
    if (sameFolder(originalById, desiredById, id)) continue;
    if (!sameFolder(currentById, originalById, id) && !sameFolder(currentById, desiredById, id)) conflict();
    const index = merged.findIndex(value => ignoredFolderId(value) === id);
    if (!desiredById.has(id)) {
      if (index !== -1) merged.splice(index, 1);
    } else if (index !== -1) {
      merged[index] = desiredById.get(id);
    } else {
      merged.push(desiredById.get(id));
    }
  }
  return merged;
}
