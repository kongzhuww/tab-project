// Browser bookmarks have no icon field. Keep decoration separate, keyed by bookmark ID.
export function bookmarkIconKey(id: string): string { return 'bookmarkBoardIcon:' + id; }
export function readBookmarkIcon(id: string): string {
  try { return localStorage.getItem(bookmarkIconKey(id)) || ''; } catch { return ''; }
}
export function removeBookmarkIcon(id: string): void {
  try { localStorage.removeItem(bookmarkIconKey(id)); } catch {}
}
export function cleanBookmarkIcon(value: string): string {
  if (!value || value.length > 2 * 1024 * 1024) throw new Error('头像为空或超过2MiB。');
  if (/^data:image\/(?:png|jpeg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=\s]+$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (['https:', 'http:'].includes(url.protocol) && !url.username && !url.password) return value;
  } catch { /* reject unsupported sources */ }
  throw new Error('请使用图片文件或不含账号密码的HTTP(S)图片地址。');
}
