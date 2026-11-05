import type { GitHubUserList } from "./lists-client";
declare const chrome: any;
export interface LocalStarGroups {
  version: 1;
  owner: string;
  groups: { id: string; name: string; pinned?: boolean; section?: string }[];
  memberships: Record<string, string[]>;
  sections?: string[];
  activeSection?: string;
}
export interface LocalGroupSeed { lists: readonly GitHubUserList[]; names: ReadonlyMap<string, string[]> }
const keyFor = (owner: string) => `ghLocalStarGroupsV1:${owner}`;
function decode(value: any, owner: string): LocalStarGroups {
  if (!value || value.version !== 1 || value.owner !== owner || !Array.isArray(value.groups) ||
      !value.memberships || typeof value.memberships !== "object" || Array.isArray(value.memberships)) throw new Error("本地分组数据异常，未覆盖原数据。");
  const groups: LocalStarGroups["groups"] = value.groups.map((group: any) => {
    if (typeof group?.id !== "string" || !group.id || typeof group.name !== "string" || !group.name.trim()) throw new Error("本地分组格式异常。");
    return { id: group.id, name: group.name, pinned: Boolean(group.pinned), section: typeof group.section === "string" ? group.section.trim() : undefined };
  });
  if (new Set(groups.map(group => group.id)).size !== groups.length || new Set(groups.map(group => group.name)).size !== groups.length) throw new Error("本地分组存在重复记录。");
  const ids = new Set(groups.map(group => group.id));
  const memberships: Record<string, string[]> = Object.create(null);
  for (const [name, raw] of Object.entries(value.memberships)) {
    if (!/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(name) || !Array.isArray(raw) || raw.some(id => typeof id !== "string" || !ids.has(id))) throw new Error("本地仓库归属格式异常。");
    memberships[name.toLowerCase()] = [...new Set(raw)] as string[];
  }
  const rawSections: string[] = Array.isArray(value.sections) ? value.sections.filter((s: any) => typeof s === "string" && s.trim()) : ["默认"];
  const sections: string[] = [...new Set(rawSections.length ? rawSections : ["默认"])];
  const activeSection = typeof value.activeSection === "string" && sections.includes(value.activeSection) ? value.activeSection : sections[0];
  return { version: 1, owner, groups, memberships, sections, activeSection };
}
function fromSeed(owner: string, seed?: LocalGroupSeed): LocalStarGroups {
  const groups = (seed?.lists || []).map(list => ({ id: list.id, name: list.name }));
  const idByName = new Map(groups.map(group => [group.name, group.id]));
  const memberships = Object.fromEntries([...(seed?.names || new Map<string, string[]>())].map(([name, names]) =>
    [name.toLowerCase(), names.map(name => idByName.get(name)).filter((id): id is string => Boolean(id))]));
  return decode({ version: 1, owner, groups, memberships }, owner);
}
async function exclusive<T>(owner: string, run: () => Promise<T>): Promise<T> {
  if (!owner || typeof chrome === "undefined" || !chrome.storage?.local || typeof navigator === "undefined" || !navigator.locks) throw new Error("本地分组存储不可用，请在扩展页面配置账号后重试。");
  return navigator.locks.request(`github-local-groups:${owner}`, { mode: "exclusive" }, run);
}
async function readOrSeed(owner: string, seed?: LocalGroupSeed): Promise<LocalStarGroups> {
  const key = keyFor(owner), legacyKey = `ghListsCache_${owner}`;
  const stored = await chrome.storage.local.get([key, legacyKey]);
  if (stored[key] !== undefined) return decode(stored[key], owner);
  // One-time local import only. Never fetch or mutate GitHub Lists during migration.
  const cached = stored[legacyKey];
  const initial = seed?.lists.length ? seed : cached && Array.isArray(cached.lists)
    ? { lists: cached.lists, names: new Map<string, string[]>(Object.entries(cached.repoListNames || {})) } : seed;
  const data = fromSeed(owner, initial);
  await save(owner, data);
  return data;
}
async function save(owner: string, data: LocalStarGroups): Promise<void> {
  const key = keyFor(owner), valid = decode(data, owner);
  try {
    await chrome.storage.local.set({ [key]: valid });
    const actual = decode((await chrome.storage.local.get(key))[key], owner);
    if (JSON.stringify(actual) !== JSON.stringify(valid)) throw new Error("readback mismatch");
  } catch { throw new Error("本地分组保存或核对未完成，可能已保存；请刷新核对后再操作。"); }
}
export async function loadLocalStarGroups(owner: string, seed?: LocalGroupSeed): Promise<LocalStarGroups> {
  return exclusive(owner, () => readOrSeed(owner, seed));
}
export async function changeLocalStarGroups(owner: string, change: (data: LocalStarGroups) => void, seed?: LocalGroupSeed): Promise<LocalStarGroups> {
  return exclusive(owner, async () => {
    const data = await readOrSeed(owner, seed);
    change(data);
    const valid = decode(data, owner);
    await save(owner, valid);
    return valid;
  });
}
export function projectLocalStarGroups(data: LocalStarGroups) {
  const byId = new Map(data.groups.map(group => [group.id, group.name]));
  const repoListIds = new Map<string, string[]>(Object.entries(data.memberships));
  const repoListNames = new Map([...repoListIds].map(([repo, ids]) => [repo, ids.map(id => byId.get(id)!).filter(Boolean)]));
  const activeSection = data.activeSection || (data.sections && data.sections[0]) || "默认";
  const lists: GitHubUserList[] = data.groups.map(group => ({ ...group, description: "本地分组", isPrivate: true,
    pinned: Boolean(group.pinned),
    section: group.section || "默认",
    totalCount: [...repoListIds.values()].filter(ids => ids.includes(group.id)).length }));
  return { lists, repoListIds, repoListNames, sections: data.sections || ["默认"], activeSection };
}
export function addLocalGroup(data: LocalStarGroups, name: string): void {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100 || ["全部", "未分类"].includes(trimmed)) throw new Error("请输入 1-100 字的分组名，不能使用系统保留名称。");
  if (data.groups.some(group => group.name === trimmed)) throw new Error("本地分组已存在。");
  const section = data.activeSection || "默认";
  data.groups.push({ id: `local:${crypto.randomUUID()}`, name: trimmed, section });
}
export function addSection(data: LocalStarGroups, sectionName: string): string {
  const trimmed = sectionName.trim();
  if (!trimmed || trimmed.length > 30) throw new Error("请输入 1-30 字的分组标签名。");
  if (!data.sections) data.sections = ["默认"];
  if (data.sections.includes(trimmed)) throw new Error("该分组标签已存在。");
  data.sections.push(trimmed);
  data.activeSection = trimmed;
  return trimmed;
}
export function removeSection(data: LocalStarGroups, sectionName: string): void {
  if (!data.sections || data.sections.length <= 1) throw new Error("至少保留一个分组。");
  const idx = data.sections.indexOf(sectionName);
  if (idx < 0) return;
  data.sections.splice(idx, 1);
  const fallback = data.sections[0];
  if (data.activeSection === sectionName) {
    data.activeSection = fallback;
  }
  // 将原先在此大分组下的文件夹平移到 fallback 分组，数据不丢失
  data.groups.forEach(g => {
    if (g.section === sectionName) g.section = fallback;
  });
}
export function setActiveSection(data: LocalStarGroups, sectionName: string): void {
  if (data.sections && data.sections.includes(sectionName)) {
    data.activeSection = sectionName;
  }
}
export function removeLocalGroup(data: LocalStarGroups, id: string): void {
  data.groups = data.groups.filter(group => group.id !== id);
  for (const name of Object.keys(data.memberships)) data.memberships[name] = data.memberships[name].filter(group => group !== id);
}
export function renameLocalGroup(data: LocalStarGroups, id: string, newName: string): void {
  const trimmed = newName.trim();
  if (!trimmed || trimmed.length > 100 || ["全部", "未分类"].includes(trimmed)) throw new Error("请输入 1-100 字的新分组名，不能使用系统保留名称。");
  const target = data.groups.find(group => group.id === id);
  if (!target) throw new Error("未找到要重命名的分组。");
  if (data.groups.some(group => group.id !== id && group.name === trimmed)) throw new Error("已存在同名本地分组。");
  target.name = trimmed;
}
export function togglePinLocalGroup(data: LocalStarGroups, id: string): boolean {
  const target = data.groups.find(group => group.id === id);
  if (!target) throw new Error("未找到要操作的分组。");
  const isPinned = !target.pinned;
  target.pinned = isPinned;
  // 置顶时移到所有置顶项末尾或首位；取消置顶时移到所有非置顶项首位
  const index = data.groups.indexOf(target);
  data.groups.splice(index, 1);
  if (isPinned) {
    // 移到最前面
    data.groups.unshift(target);
  } else {
    // 找到第一个未置顶项的位置放过去
    const firstUnpinned = data.groups.findIndex(g => !g.pinned);
    if (firstUnpinned >= 0) {
      data.groups.splice(firstUnpinned, 0, target);
    } else {
      data.groups.push(target);
    }
  }
  return isPinned;
}
export function pinLocalGroup(data: LocalStarGroups, id: string): void {
  togglePinLocalGroup(data, id);
}
export function reorderLocalGroups(data: LocalStarGroups, fromId: string, toId: string): void {
  if (fromId === toId) return;
  const fromIdx = data.groups.findIndex(group => group.id === fromId);
  const toIdx = data.groups.findIndex(group => group.id === toId);
  if (fromIdx < 0 || toIdx < 0) return;
  const [item] = data.groups.splice(fromIdx, 1);
  data.groups.splice(toIdx, 0, item);
}
export function assignLocalGroup(data: LocalStarGroups, names: readonly string[], groupId: string | null, mode: "add" | "toggle" | "clear" = "add"): void {
  if (groupId !== null && !data.groups.some(group => group.id === groupId)) throw new Error("目标本地分组已不存在，请刷新核对。");
  for (const name of names) {
    const key = name.toLowerCase(), current = data.memberships[key] || [];
    data.memberships[key] = mode === "clear" ? [] : mode === "toggle" && current.includes(groupId!)
      ? current.filter(id => id !== groupId) : [...new Set([...current, groupId!])];
  }
}
