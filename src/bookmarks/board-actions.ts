import type { ChromeBookmarkNode } from '../services/bookmarks.service';
import { apiCall, type BookmarkBoardItem, type BookmarkBoardLink } from './board-data';
import { bookmarkIconKey, cleanBookmarkIcon, removeBookmarkIcon } from './icon-storage';
declare const chrome: any;

export function cleanBookmarkTitle(draft: string): string {
  const title = draft.trim();
  if (!title || title.length > 100) throw new Error('名称不能为空，且最多100个字符。');
  return title;
}
export function cleanBookmarkUrl(draft: string): string {
  const url = draft.trim();
  try {
    const value = new URL(url);
    if (!['http:', 'https:'].includes(value.protocol) || value.username || value.password) throw new Error();
  } catch { throw new Error('请填写不含账号密码的 HTTP(S) 网址。'); }
  return url;
}
async function readEditable(id: string): Promise<ChromeBookmarkNode> {
  const node = (await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.get(id, callback)))[0];
  if (!node?.parentId || node.parentId === '0') throw new Error('浏览器固定目录不能修改。');
  return node;
}
export async function saveBookmarkText(item: BookmarkBoardItem, field: 'title' | 'url', draft: string): Promise<string> {
  const value = field === 'title' ? cleanBookmarkTitle(draft) : cleanBookmarkUrl(draft);
  const node = await readEditable(item.id);
  const original = field === 'title' ? (node.title || node.url || '未命名文件夹') : node.url;
  const expected = field === 'title' ? item.title : item.kind === 'link' ? item.url : undefined;
  if (original !== expected || (field === 'url' && !node.url)) throw new Error('该字段已在其他页面修改，请刷新核对后再编辑。');
  const result = await apiCall<ChromeBookmarkNode>(callback => chrome.bookmarks.update(item.id, { [field]: value }, callback));
  if (result?.id !== item.id || result[field] !== value) throw new Error('保存结果未确认，请刷新核对，不要重复提交。');
  return value;
}
export async function saveBookmarkIcon(item: BookmarkBoardLink, icon: string): Promise<void> {
  const value = cleanBookmarkIcon(icon);
  const node = await readEditable(item.id);
  if (node.url !== item.url) throw new Error('网站网址已变化，请刷新后重新选择头像。');
  const key = bookmarkIconKey(item.id);
  if ((localStorage.getItem(key) || '') !== (item.customIcon || '')) throw new Error('头像已在其他页面修改，请刷新核对。');
  localStorage.setItem(key, value);
  if (localStorage.getItem(key) !== value) throw new Error('头像保存未确认，请刷新核对，不要重复提交。');
}
function signature(item: BookmarkBoardItem): string {
  return JSON.stringify(item.kind === 'link' ? [item.id, item.title, item.url] : [item.id, item.title, item.items.map(signature)]);
}
function currentSignature(node: ChromeBookmarkNode): string {
  return JSON.stringify(node.url ? [node.id, node.title || node.url, node.url] : [node.id, node.title || '未命名文件夹', (node.children || []).map(currentSignature)]);
}
export async function deleteBookmarkItem(item: BookmarkBoardItem): Promise<void> {
  const node = await readEditable(item.id);
  const subtree = (await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.getSubTree(item.id, callback)))[0];
  if (!subtree || signature(item) !== currentSignature(subtree)) throw new Error('书签内容已变化，已拒绝删除，请刷新核对后重新确认。');
  await apiCall<void>(callback => item.kind === 'folder' ? chrome.bookmarks.removeTree(item.id, callback) : chrome.bookmarks.remove(item.id, callback));
  const remaining = await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.getChildren(node.parentId, callback));
  if (remaining.some(child => child.id === item.id)) throw new Error('删除结果未确认，请刷新核对，不要重复提交。');
  if (item.kind === 'link') removeBookmarkIcon(item.id);
}
export async function createBookmarkFolder(parentId: string, draft: string): Promise<string> {
  const title = cleanBookmarkTitle(draft);
  const parent = (await apiCall<ChromeBookmarkNode[]>(callback => chrome.bookmarks.get(parentId, callback)))[0];
  if (!parent || parent.url || parentId === '0') throw new Error('无法在该位置创建文件夹，请刷新核对。');
  const result = await apiCall<ChromeBookmarkNode>(callback => chrome.bookmarks.create({ parentId, title }, callback));
  if (!result?.id || result.parentId !== parentId || result.title !== title) throw new Error('创建结果未确认，请刷新核对，不要重复提交。');
  return title;
}
