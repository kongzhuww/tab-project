/** Public identity only. Importing this module does not access browser storage. */
export interface PrivateRoom { origin: string; room: string; uid: string }
export const privateChatIdentityKey = (c: PrivateRoom): string => JSON.stringify([c.origin, c.room, c.uid]);
export function isPrivateChatToken(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]{43}$/.test(value);
}
export function validatePrivateRoom(value: unknown): PrivateRoom {
  try {
    if (!value || typeof value !== "object") throw new Error();
    const v = value as PrivateRoom;
    if (typeof v.origin !== "string" || typeof v.room !== "string" || typeof v.uid !== "string") throw new Error();
    const url = new URL(v.origin);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash || !/^[A-Za-z0-9_-]{1,160}$/.test(v.room) || !/^[A-Za-z0-9_-]{1,160}$/.test(v.uid)) throw new Error();
    if (url.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error();
    return { origin: url.origin, room: v.room, uid: v.uid };
  } catch { throw new Error("聊天室配置无效：公网必须使用 HTTPS；HTTP 仅允许 localhost、127.0.0.1 或 ::1"); }
}
