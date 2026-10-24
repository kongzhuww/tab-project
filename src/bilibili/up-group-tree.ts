/** Pure group-tree projections and move validation. Never mutate or persist groups. */
import type { BiliUpGroup } from "./channel-types";

/**
 * Include the root and descendants, with unique MIDs in original stack traversal
 * order (later siblings first). Keep strict ID matching and first-match lookup.
 * A repeated group is skipped so malformed parent cycles cannot loop forever.
 */
export function collectBiliGroupMids(groups: readonly BiliUpGroup[], groupId: string): string[] {
  const mids = new Set<string>();
  const pending = [groupId];
  const visited = new Set<string>();
  while (pending.length) {
    const id = pending.pop()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const group = groups.find(item => item.id === id);
    (group?.upMids || []).forEach(mid => mids.add(String(mid)));
    groups.forEach(item => {
      if (item.parentId === id) pending.push(item.id);
    });
  }
  return Array.from(mids);
}

/**
 * Validate before any mutation. Parent links are normalized like the manager.
 * Root moves may repair a broken source chain; other moves require an intact
 * target ancestry. No automatic repair, and no traversal of unrelated branches.
 */
export function validateBiliGroupMove(
  groups: readonly BiliUpGroup[], sourceId: string, targetId: string, mode: string
): string | null {
  if (!["root", "into", "before", "after"].includes(mode)) return "不支持的分组移动方式";
  const sources = groups.filter(group => String(group.id) === sourceId);
  if (!sourceId || sources.length !== 1) return "来源分组不存在或 ID 重复，请刷新检查";
  if (sourceId === targetId) return "不能将分组移动到自身";
  if (mode === "root") return null;
  if (!targetId) return "请选择目标分组";

  const visited = new Set<string>();
  let currentId = targetId;
  while (currentId) {
    if (currentId === sourceId) return "不能将分组移动到自己的子分组中或旁边";
    if (visited.has(currentId)) return "目标分组存在循环父子关系，本次移动未执行";
    visited.add(currentId);
    const matches = groups.filter(group => String(group.id) === currentId);
    if (matches.length !== 1) return "目标分组或其父分组缺失、ID 重复，本次移动未执行";
    currentId = String(matches[0].parentId || "");
  }
  return null;
}

/**
 * Manager-only display projection: roots/children in source order, followed by
 * unreachable groups at depth zero. Preserve legacy normalization and fallback;
 * this does not repair parent links or deduplicate stored records.
 */
export function flattenBiliUpGroups(groups: readonly BiliUpGroup[]): BiliUpGroup[] {
  const byParent = new Map<string, BiliUpGroup[]>();
  groups.forEach((group) => {
    const parentId = String(group.parentId || "");
    if (!byParent.has(parentId)) byParent.set(parentId, []);
    byParent.get(parentId)!.push(group);
  });
  const result: BiliUpGroup[] = [];
  const seen = new Set<string>();
  const walk = (parentId = "", depth = 0) => {
    (byParent.get(parentId) || []).forEach((group) => {
      if (seen.has(String(group.id))) return;
      seen.add(String(group.id));
      result.push({
        id: String(group.id),
        name: String(group.name || "未命名分组"),
        parentId: String(group.parentId || ""),
        upMids: (group.upMids || []).map(String),
        depth
      });
      walk(String(group.id), depth + 1);
    });
  };
  walk();
  groups.forEach((group) => {
    if (!seen.has(String(group.id))) {
      result.push({
        id: String(group.id),
        name: String(group.name || "未命名分组"),
        parentId: "",
        upMids: (group.upMids || []).map(String),
        depth: 0
      });
    }
  });
  return result;
}
