import type { ChromeBookmarkNode } from "../services/bookmarks.service";
import type { LauncherLink } from "../launchers/store";
import { readBookmarkIcon } from "./icon-storage";

declare const chrome: any;

export interface BookmarkBoardLink extends LauncherLink { kind: "link"; parentId: string; }
export interface BookmarkBoardFolder {
  kind: "folder";
  id: string;
  parentId?: string;
  title: string;
  path: string;
  items: BookmarkBoardItem[];
  preview: LauncherLink[];
  count: number;
}
export type BookmarkBoardItem = BookmarkBoardFolder | BookmarkBoardLink;
export interface BookmarkBoardSource { id: string; title: string; sections: BookmarkBoardFolder[]; }
export interface BookmarkBoardProjection { sources: BookmarkBoardSource[]; folders: Map<string, BookmarkBoardFolder>; }

// Browser containers are sources, their direct folders are sections, deeper folders stay tiles.
// IDs/order remain browser-owned; no data is copied into quickLinks.
export function projectBookmarkBoard(tree: ChromeBookmarkNode[]): BookmarkBoardProjection {
  const folders = new Map<string, BookmarkBoardFolder>();
  function visit(node: ChromeBookmarkNode, ancestors: string[]): BookmarkBoardFolder {
    const title = node.title || "未命名文件夹";
    const path = [...ancestors, title];
    const folder: BookmarkBoardFolder = { kind: "folder", id: node.id, parentId: node.parentId,
      title, path: path.join(" / "), items: [], preview: [], count: 0 };
    folders.set(node.id, folder);
    for (const child of node.children || []) {
      if (child.url) {
        const link: BookmarkBoardLink = { kind: "link", id: child.id, parentId: node.id,
          title: child.title || child.url, url: child.url, customIcon: readBookmarkIcon(child.id) };
        folder.items.push(link);
        folder.count++;
        if (folder.preview.length < 9) folder.preview.push(link);
      } else {
        const nested = visit(child, path);
        folder.items.push(nested);
        folder.count += nested.count;
        folder.preview.push(...nested.preview.slice(0, 9 - folder.preview.length));
      }
    }
    return folder;
  }
  const sources: BookmarkBoardSource[] = [];
  for (const root of tree) for (const node of root.children || []) {
    if (node.url) continue;
    // Exclude browser workspace placeholder roots; do not register or mutate them.
    // User-created folders with these names inside ordinary bookmarks remain untouched.
    const rootTitle = (node.title || '').replace(/[\s_-]/g, '').toLowerCase();
    if (/^(?:工作区|工作區|工作空间|工作空間|(?:microsoft)?edge工作区|(?:microsoft)?edgeworkspaces?|workspaces?)$/.test(rootTitle)) continue;
    const container = visit(node, []);
    if (!container.items.length) continue;
    const sections = container.items.filter((item): item is BookmarkBoardFolder => item.kind === "folder");
    const looseLinks = container.items.filter(item => item.kind === "link");
    if (looseLinks.length) {
      // Separate loose root URLs without hiding or duplicating them in each section.
      const loose = { ...container, title: sections.length ? "未分组书签" : container.title, items: looseLinks };
      folders.set(container.id, loose);
      sections.unshift(loose);
    }
    sources.push({ id: node.id, title: container.title, sections });
  }
  return { sources, folders };
}

export function apiCall<T>(invoke: (callback: (result: T) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("书签操作结果未确认，请刷新核对，不要重复提交。")), 10000);
    try {
      invoke(result => {
        const failed = !!chrome.runtime?.lastError;
        clearTimeout(timeout);
        if (failed) reject(new Error("浏览器书签操作失败，请刷新核对。"));
        else resolve(result);
      });
    } catch {
      clearTimeout(timeout);
      reject(new Error("浏览器书签接口不可用。"));
    }
  });
}

export function readBookmarkBoard(): Promise<ChromeBookmarkNode[]> {
  if (typeof chrome === "undefined" || !chrome.bookmarks?.getTree) {
    return Promise.reject(new Error("当前页面无法读取浏览器书签，请在扩展新标签页打开。"));
  }
  return apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.getTree(callback));
}

// Move only the explicitly selected node. Never rewrite the entire tree.
export async function moveBoardNode(id: string, parentId: string, beforeId?: string, atEnd = false, expectedParentId?: string): Promise<void> {
  const nodes = await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.get(id, callback));
  const targets = await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.get(parentId, callback));
  const source = nodes[0];
  if (!source?.parentId || source.parentId === '0' || !targets[0] || targets[0].url || parentId === '0') throw new Error("书签或目标文件夹已变化，或是浏览器固定目录，请刷新后再移动。");
  if (expectedParentId && source.parentId !== expectedParentId) throw new Error('该节点已被其他页面移动，请刷新核对后再操作。');
  if (!source.url) {
    let ancestor = targets[0];
    const visited = new Set<string>();
    while (ancestor) {
      if (ancestor.id === id) throw new Error('不能把文件夹移入自身或子文件夹。');
      if (!ancestor.parentId) break;
      if (visited.has(ancestor.id)) throw new Error('目录结构异常，请刷新核对。');
      visited.add(ancestor.id);
      ancestor = (await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.get(ancestor.parentId, callback)))[0];
    }
  }
  let index: number | undefined;
  if (beforeId) {
    if (beforeId === id) return;
    const before = (await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.get(beforeId, callback)))[0];
    if (!before || before.parentId !== parentId || before.index === undefined) throw new Error("目标书签已变化，请刷新后再移动。");
    index = before.index;
    if (source.parentId === parentId && source.index !== undefined && source.index < index) index--;
  } else if (source.parentId === parentId) {
    if (!atEnd) return;
    const siblings = await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.getChildren(parentId, callback));
    index = Math.max(0, siblings.length - 1);
    if (source.index === index) return;
  }
  const result = await apiCall<ChromeBookmarkNode>(callback => chrome.bookmarks.move(id, { parentId, ...(index === undefined ? {} : { index }) }, callback));
  if (result?.id !== id || result.parentId !== parentId) throw new Error("移动结果未确认，请刷新核对，不要重复提交。");
  const siblings = await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.getChildren(parentId, callback));
  const position = siblings.findIndex(node => node.id === id);
  if (position < 0 || (beforeId ? siblings[position + 1]?.id !== beforeId : position !== siblings.length - 1)) {
    throw new Error('书签排列结果未确认，请刷新核对，不要重复提交。');
  }
}

export function subscribeBookmarkBoard(callback: () => void): () => void {
  if (typeof chrome === "undefined" || !chrome.bookmarks) return () => {};
  const events = [chrome.bookmarks.onCreated, chrome.bookmarks.onRemoved, chrome.bookmarks.onChanged,
    chrome.bookmarks.onMoved, chrome.bookmarks.onChildrenReordered, chrome.bookmarks.onImportEnded];
  for (const event of events) event?.addListener(callback);
  return () => { for (const event of events) event?.removeListener(callback); };
}
