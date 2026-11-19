import type { ChromeBookmarkNode } from '../services/bookmarks.service';
import { editDesktopFolder, folderDestination, isFolderEdit } from './organizer-folder-actions';
import { sameSettingValue } from '../settings/draft-values';
import type { OrganizerPlanStep, OrganizerUndoReceipt, OrganizerWorkspaceSnapshot } from './employee-contract';
import { cleanHttpUrl, cleanOrganizerName, DEFAULT_GROUP, DEFAULT_PAGE, resolveOrganizerParams } from './workspace-organizer';

declare const chrome: any;
const keys = ['quickLinks', 'launcherFolders', 'quickLinkGroupSizes', 'launcherPages', 'launcherPageLabels'];
const same = sameSettingValue;
const own = (o: object, key: string) => Object.prototype.hasOwnProperty.call(o, key);
export function organizerBookmarks<T>(method: string, ...args: unknown[]): Promise<T> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === 'undefined' || typeof chrome.bookmarks?.[method] !== 'function') return reject(new Error('浏览器书签接口不可用，未继续操作。'));
    chrome.bookmarks[method](...args, (value: T) => {
      const err = chrome.runtime?.lastError;
      if (err) reject(new Error('书签操作失败。'));
      else resolve(value);
    });
  });
}
export function organizerStorageGet(names: string[]): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) return reject(new Error('本地存储不可用。'));
    chrome.storage.local.get(names, (data: Record<string, any>) => {
      if (chrome.runtime?.lastError) reject(new Error('读取本地数据失败。'));
      else resolve(data || {});
    });
  });
}
async function storageSet(data: Record<string, unknown>): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    chrome.storage.local.set(data, () => chrome.runtime?.lastError ? reject(new Error('保存失败。')) : resolve());
  });
}
async function locked<T>(fn: () => Promise<T>): Promise<T> {
  if (typeof navigator !== 'undefined') {
    if (!navigator.locks?.request) throw new Error('当前环境不支持安全写入锁。');
    return navigator.locks.request('logicweaver:launcher-titles', fn);
  }
  return fn(); // Isolated Node tests only.
}
function launcherData(data: Record<string, any>) {
  if (data.quickLinks !== undefined && !Array.isArray(data.quickLinks)) throw new Error('网站数据格式异常，未覆盖。');
  if (data.launcherPages !== undefined && (!Array.isArray(data.launcherPages) || data.launcherPages.some((p: unknown) => typeof p !== 'string'))) throw new Error('分区数据格式异常。');
  for (const key of ['launcherFolders', 'quickLinkGroupSizes', 'launcherPageLabels']) {
    if (data[key] !== undefined && (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key]))) throw new Error('文件夹数据格式异常。');
  }
  return {
    quickLinks: structuredClone(data.quickLinks || []) as any[],
    launcherPages: [...(data.launcherPages?.length ? data.launcherPages : [DEFAULT_PAGE])] as string[],
    launcherPageLabels: { ...(data.launcherPageLabels || {}) } as Record<string, string>,
    launcherFolders: structuredClone(data.launcherFolders || {}) as Record<string, { name: string; page: string; parent?: string }>,
    quickLinkGroupSizes: { ...(data.quickLinkGroupSizes || {}) } as Record<string, string>,
  };
}
function flatten(nodes: ChromeBookmarkNode[]): ChromeBookmarkNode[] {
  return nodes.flatMap(n => [n, ...flatten(n.children || [])]);
}
function checkBookmark(node: ChromeBookmarkNode | undefined, expected: OrganizerPlanStep['expected']) {
  if (!node?.url || !expected || cleanHttpUrl(node.url) !== expected.url || String(node.title || cleanHttpUrl(node.url)).slice(0, 80) !== expected.title || node.parentId !== expected.parentId) throw new Error('书签在提案后已变化，请重新盘点，未提交修改。');
}
export interface OrganizerExecutionContext {
  steps?: readonly OrganizerPlanStep[];
  snapshot?: OrganizerWorkspaceSnapshot;
  /** Must durably journal the operation before issuing any business write. */
  beforeWrite?: (undo?: OrganizerUndoReceipt) => Promise<void>;
}

export async function applyOrganizerPlanStep(step: OrganizerPlanStep, context: OrganizerExecutionContext = {}): Promise<{ note: string; result?: OrganizerPlanStep['result']; undo?: OrganizerUndoReceipt }> {
  if (!['pending', 'error'].includes(step.status)) throw new Error('这一步暂不可执行。');
  const p = resolveOrganizerParams(step, context.steps || [step], true);
  const prepare = async (receipt: OrganizerUndoReceipt) => { await context.beforeWrite?.(receipt); return receipt; };
  if (['create_partition', 'create_launcher_folder', 'move_quick_link', 'promote_bookmark_to_launcher'].includes(step.type) || p.scope === 'desktop') {
    return locked(async () => {
      const raw = await organizerStorageGet(keys);
      const d = launcherData(raw);
      const changed: string[] = [];
      const pageId = (requested?: string) => {
        const name = requested || DEFAULT_PAGE;
        const matches = d.launcherPages.filter(id => id === name || (d.launcherPageLabels[id] || (id === DEFAULT_PAGE ? '默认' : id)) === name);
        if (matches.length !== 1) throw new Error(`目标分区「${name}」不存在或重名，请先审批创建步骤或重新盘点。`);
        return matches[0];
      };
      const folderPage = (name: string) => {
        const seen = new Set<string>();
        let current = name;
        while (true) {
          if (seen.has(current)) throw new Error('文件夹存在循环层级，未写入。');
          seen.add(current);
          if (!own(d.launcherFolders, current)) {
            const implicitPages = new Set<string>(d.quickLinks.filter(l => l.group === current).map(l => l.page || DEFAULT_PAGE));
            if (implicitPages.size !== 1) throw new Error(`文件夹「${current}」不存在或归属不唯一，请重新盘点。`);
            return pageId([...implicitPages][0]);
          }
          const f = d.launcherFolders[current];
          if (!f.parent) return pageId(f.page);
          current = f.parent;
        }
      };
      const checkExistingTarget = (name: string | undefined, referenced: boolean) => {
        if (!name || name === DEFAULT_GROUP || referenced || !context.snapshot) return;
        const old = context.snapshot.folders.find(f => f.name === name);
        const implicit = d.quickLinks.find(l => l.group === name);
        const now = d.launcherFolders[name] || (implicit ? { page: implicit.page || DEFAULT_PAGE, parent: undefined } : undefined);
        if (!old || !now || old.page !== now.page || old.parent !== now.parent) throw new Error('目标文件夹在提案后已变化，请重新盘点。');
      };
      if (isFolderEdit(step.type)) {
        const source = p.sourceFolder!;
        const folders = new Map(Object.entries(d.launcherFolders));
        for (const link of d.quickLinks) if (link.group && link.group !== DEFAULT_GROUP && !folders.has(link.group)) {
          folders.set(link.group, { name: link.group, page: link.page || DEFAULT_PAGE });
        }
        const name = cleanOrganizerName(p.newName);
        if (step.type === 'rename_folder' && own(d.quickLinkGroupSizes, name)) throw new Error('文件夹名称不可用。');
        editDesktopFolder(folders, d.quickLinks, step.type, source, step.type === 'rename_folder' ? name : p.targetFolder, DEFAULT_GROUP);
        // Keep implicit legacy groups implicit unless this edit changes them.
        d.launcherFolders = Object.fromEntries([...folders].filter(([id, f]) => own(d.launcherFolders, id) || id === name || (id === p.targetFolder && step.type === 'merge_folders') || f.parent));
        if (step.type === 'rename_folder' && own(d.quickLinkGroupSizes, source)) d.quickLinkGroupSizes[name] = d.quickLinkGroupSizes[source];
        delete d.quickLinkGroupSizes[source];
        changed.push('launcherFolders', 'quickLinkGroupSizes', 'quickLinks');
      } else if (step.type === 'rename_link') {
        const link = d.quickLinks.find(l => String(l.id) === p.linkId);
        const title = cleanOrganizerName(p.newName, 80);
        if (!link || !title) throw new Error('找不到链接或名称无效。');
        link.title = title;
        changed.push('quickLinks');
      } else if (step.type === 'create_partition') {
        const name = cleanOrganizerName(p.partitionName, 12);
        if (!name || name === '默认') throw new Error('分区名称无效或为保留名称。');
        if (d.launcherPages.some(id => id === name || d.launcherPageLabels[id] === name)) throw new Error('同名分区已存在。');
        d.launcherPages.push(name); d.launcherPageLabels[name] = name;
        changed.push('launcherPages', 'launcherPageLabels');
      } else if (step.type === 'create_launcher_folder') {
        const name = cleanOrganizerName(p.folderName);
        const parent = p.parentFolderName ? cleanOrganizerName(p.parentFolderName) : '';
        if (!name || name === DEFAULT_GROUP || (p.parentFolderName && !parent)) throw new Error('文件夹名称无效或为保留名称。');
        if (name === parent) throw new Error('不能将文件夹放入自身。');
        if (own(d.launcherFolders, name) || d.quickLinks.some(l => l.group === name) || own(d.quickLinkGroupSizes, name)) throw new Error('同名文件夹或分组已存在。');
        let page = pageId(p.partitionName);
        checkExistingTarget(parent, Boolean(step.refs?.parentFolder));
        if (parent) {
          const parentPage = folderPage(parent);
          if (parentPage !== page) throw new Error('父文件夹不在所选分区，未擅自改投其他分区。');
          page = parentPage;
        }
        d.launcherFolders[name] = { name, page, ...(parent ? { parent } : {}) };
        d.quickLinkGroupSizes[name] = p.folderSize === 'large' ? 'large' : 'small';
        changed.push('launcherFolders', 'quickLinkGroupSizes');
      } else {
        const group = p.targetFolder || DEFAULT_GROUP;
        let page = pageId(p.targetPartition);
        checkExistingTarget(group, Boolean(step.refs?.folder));
        if (group !== DEFAULT_GROUP) {
          const targetPage = folderPage(group);
          if (targetPage !== page) throw new Error('目标文件夹不在所选分区，未擅自改投。');
          page = targetPage;
        }
        if (step.type === 'move_quick_link') {
          const matches = d.quickLinks.filter(l => String(l.id) === p.linkId);
          const l = matches[0], e = step.expected;
          if (matches.length !== 1 || !e || cleanHttpUrl(l.url) !== e.url || String(l.title || l.url).slice(0, 80) !== e.title || (l.page || DEFAULT_PAGE) !== e.page || (l.group || DEFAULT_GROUP) !== e.group) throw new Error('网站在提案后已变化，请重新盘点。');
          l.page = page; l.group = group;
        } else {
          const tree = flatten(await organizerBookmarks<ChromeBookmarkNode[]>('getTree'));
          const bm = tree.find(b => b.id === p.bookmarkId);
          checkBookmark(bm, step.expected);
          const url = cleanHttpUrl(bm!.url);
          if (d.quickLinks.some(l => cleanHttpUrl(l.url) === url)) throw new Error('该网址已在桌面。');
          d.quickLinks.push({ id: crypto.randomUUID(), title: bm!.title || url, url, page, group });
        }
        changed.push('quickLinks');
      }
      // Normalize absent keys in receipts: undo can restore the semantically empty value without undefined serialization.
      const before = Object.fromEntries(changed.map(key => [key, raw[key] ?? (key === 'quickLinks' ? [] : key === 'launcherPages' ? [DEFAULT_PAGE] : {})]));
      const after = Object.fromEntries(changed.map(key => [key, d[key as keyof typeof d]]));
      let receipt: OrganizerUndoReceipt = { kind: 'launcher', before, after };
      if (changed.length === 1 && changed[0] === 'quickLinks') {
        const link = step.type === 'move_quick_link' || step.type === 'rename_link' ? d.quickLinks.find(l => String(l.id) === p.linkId) : d.quickLinks[d.quickLinks.length - 1];
        const original = (raw.quickLinks || []).find((l: any) => l.id === link.id) || null;
        receipt = { kind: 'launcher-link', before: { link: original, sourceFolder: original?.group ? raw.launcherFolders?.[original.group] || null : null }, after: { link: structuredClone(link) } };
      }
      const undo = await prepare(receipt);
      await storageSet(after);
      return { note: `已生效：${step.title}`, undo };
    });
  }
  const tree = flatten(await organizerBookmarks<ChromeBookmarkNode[]>('getTree'));
  const directory = (id: string | undefined) => {
    const n = tree.find(n => n.id === id && !n.url && n.id !== '0');
    if (!n) throw new Error('目标书签目录不存在，请先审批创建步骤。');
    const old = context.snapshot?.bookmarkFolders.find(f => f.id === id);
    if (old && (old.title !== n.title || old.parentId !== n.parentId)) throw new Error('目标书签目录在提案后已变化，请重新盘点。');
    return n;
  };
  if (p.scope === 'bookmarks' && (isFolderEdit(step.type) || step.type === 'rename_link')) {
    const node = tree.find(n => n.id === (step.type === 'rename_link' ? p.bookmarkId : p.sourceFolder));
    if (!node || (step.type === 'rename_link' ? !node.url : node.url || !node.parentId || node.parentId === '0')) throw new Error('找不到要整理的项目。');
    if (step.type === 'rename_folder' || step.type === 'rename_link') {
      const title = cleanOrganizerName(p.newName, 80);
      if (!title) throw new Error('名称不可用。');
      const undo = await prepare({ kind: 'bookmark-rename', bookmarkId: node.id, before: { title: node.title || '' }, after: { title } });
      await organizerBookmarks('update', node.id, { title });
      return { note: `已改名为「${title}」`, undo };
    }
    const target = folderDestination(node.id, step.type === 'merge_folders' ? p.targetFolder : node.parentId, id => tree.find(n => n.id === id && !n.url && n.id !== '0'));
    if (!target) throw new Error('找不到目标书签目录。');
    await context.beforeWrite?.();
    let index = step.type === 'remove_folder' ? tree.find(n => n.id === target.id)?.children?.findIndex(n => n.id === node.id) ?? -1 : -1;
    for (const child of node.children || []) await organizerBookmarks('move', child.id, { parentId: target.id, ...(index >= 0 ? { index: index++ } : {}) });
    await organizerBookmarks('remove', node.id);
    return { note: step.type === 'remove_folder' ? '已移除文件夹' : '已合并文件夹' };
  }
  if (step.type === 'create_bookmark_folder') {
    const title = cleanOrganizerName(p.folderName);
    if (!title) throw new Error('书签目录名称无效。');
    const parent = directory(p.parentBookmarkId || '1');
    if (tree.some(n => n.parentId === parent.id && !n.url && n.title === title)) throw new Error('该位置已有同名书签目录。');
    const undo = await prepare({ kind: 'bookmark-folder', parentId: parent.id, title });
    const created = await organizerBookmarks<ChromeBookmarkNode>('create', { parentId: parent.id, title });
    if (!created?.id) throw new Error('创建书签目录失败。');
    undo.bookmarkId = created.id;
    return { note: `已创建书签目录「${title}」`, result: { bookmarkFolderId: created.id }, undo };
  }
  if (step.type === 'move_bookmark') {
    const node = tree.find(n => n.id === p.bookmarkId);
    checkBookmark(node, step.expected);
    const target = directory(p.targetFolder);
    const undo = await prepare({ kind: 'bookmark-move', bookmarkId: node!.id, parentId: node!.parentId, index: (node as any).index, before: { title: node!.title, url: node!.url }, after: { parentId: target.id } });
    const moved = await organizerBookmarks<ChromeBookmarkNode>('move', node!.id, { parentId: target.id });
    if (moved?.parentId !== target.id) throw new Error('移动书签失败。');
    return { note: `已将书签移入「${target.title}」`, undo };
  }
  throw new Error('不支持的整理动作。');
}

/** Conservative inverse: never overwrite intervening edits; undo creations only if still empty. */
export async function undoOrganizerPlanStep(step: OrganizerPlanStep, beforeWrite?: () => Promise<void>): Promise<void> {
  if (step.status !== 'applied' || !step.undo) throw new Error('该步骤没有可撤销的已确认写入。');
  const r = step.undo;
  if (r.kind === 'launcher-link') {
    await locked(async () => {
      const raw = await organizerStorageGet(keys), d = launcherData(raw);
      const after = r.after?.link as Record<string, any> | undefined;
      const before = r.before?.link as Record<string, any> | null;
      const index = d.quickLinks.findIndex(l => l.id === after?.id);
      if (!after || index < 0 || !same(d.quickLinks[index], after)) throw new Error('网站已被后续步骤或手动操作修改，不能覆盖。');
      if (before) {
        const page = before.page || DEFAULT_PAGE, group = before.group || DEFAULT_GROUP;
        if (!d.launcherPages.includes(page)) throw new Error('原分区已不存在，请重新盘点。');
        if (group !== DEFAULT_GROUP && (!same(d.launcherFolders[group] || null, r.before?.sourceFolder || null) || d.quickLinks.some(l => l.group === group && l.id !== before.id && (l.page || DEFAULT_PAGE) !== page))) throw new Error('原文件夹归属已变化，请重新盘点。');
        d.quickLinks[index] = structuredClone(before);
      } else d.quickLinks.splice(index, 1);
      await beforeWrite?.();
      await storageSet({ quickLinks: d.quickLinks });

    });
    return;
  }
  if (r.kind === 'launcher') {
    await locked(async () => {
      const names = Object.keys(r.after || {});
      const actual = await organizerStorageGet(keys);
      if (names.some(k => !same(actual[k], r.after?.[k]))) throw new Error('相关数据已被后续步骤或手动操作修改；请先撤销后续操作，不能覆盖。');
      // New partitions/folders can have gained content in keys not touched by the creation.
      const before = launcherData(r.before || {}), after = launcherData(r.after || {}), now = launcherData(actual);
      const addedPages = after.launcherPages.filter(p => !before.launcherPages.includes(p));
      const addedFolders = Object.keys(after.launcherFolders).filter(f => !own(before.launcherFolders, f));
      if ((!r.after?.quickLinks && now.quickLinks.some(l => addedPages.includes(l.page) || addedFolders.includes(l.group))) ||
          (!r.after?.quickLinks && Object.values(now.launcherFolders).some(f => addedPages.includes(f.page) || (f.parent && addedFolders.includes(f.parent))))) throw new Error('新建分区或文件夹已有内容，请先撤销相关移动。');
      await beforeWrite?.();
      await storageSet(r.before || {});

    });
    return;
  }
  const tree = flatten(await organizerBookmarks<ChromeBookmarkNode[]>('getTree'));
  const node = tree.find(n => n.id === r.bookmarkId);
  if (!node) throw new Error('原书签或目录已不存在。');
  if (r.kind === 'bookmark-rename') {
    if (node.title !== r.after?.title) throw new Error('名称已变更。');
    await beforeWrite?.();
    await organizerBookmarks('update', node.id, { title: r.before?.title });
  } else if (r.kind === 'bookmark-folder') {
    if (node.url || node.title !== r.title || node.parentId !== r.parentId || node.children?.length) throw new Error('新建目录已有内容或已变化，不能撤销。');
    await beforeWrite?.();
    await organizerBookmarks('remove', node.id); // Only this confirmed, empty, employee-created folder.
  } else {
    if (node.parentId !== r.after?.parentId || node.url !== r.before?.url || node.title !== r.before?.title || !tree.some(n => n.id === r.parentId && !n.url)) throw new Error('书签或原目录已变化，不能覆盖。');
    await beforeWrite?.();
    await organizerBookmarks('move', node.id, { parentId: r.parentId, ...(typeof r.index === 'number' ? { index: r.index } : {}) });
  }
}
