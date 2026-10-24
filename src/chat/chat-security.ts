import { CHAT_LIMITS, CHAT_MESSAGE_TYPES } from "./chat-contract";
import type { ChatMessage, ChatUserInfo, FriendRequest, UserActivity } from "./chat-state";

export const MAX_CHAT_BYTES = CHAT_LIMITS.imageMessageBytes;
export const MAX_CHAT_MESSAGES = 200;
export const MAX_CHAT_USERS = 200;
export const MAX_CHAT_TEXT = CHAT_LIMITS.textChars;
export function byteLength(value: string): number { return new TextEncoder().encode(value).byteLength; }
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const bounded = (value: unknown, max: number): value is string => typeof value === "string" && value.length <= max;

export function safeExternalUrl(value: unknown): string {
  if (!bounded(value, 4096)) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : "";
  } catch { return ""; }
}
export function safeImageUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  // Only raster data images; do not accept SVG, arbitrary blob URLs or relative paths from peers.
  if (value.length <= MAX_CHAT_BYTES && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(value)) return value;
  return safeExternalUrl(value);
}
export function serverUrl(value: unknown): string {
  if (!bounded(value, 4096)) throw new Error("服务器地址过长");
  if (!value.trim()) return "";
  let url: URL;
  try { url = new URL(value.trim()); } catch { throw new Error("服务器地址格式不正确"); }
  const host = url.hostname;
  const local = host === "localhost" || host === "[::1]" || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);
  if ((url.protocol !== "wss:" && !(url.protocol === "ws:" && local)) || url.username || url.password || url.hash) {
    throw new Error("公网服务器须使用 WSS；WS 仅限本机或局域网，地址不能含用户信息或片段");
  }
  return url.href;
}
export function normalizeActivity(value: unknown): UserActivity | undefined { return normalizeActivityAt(value, Date.now()); }
export function normalizeActivityAt(value: unknown, now: number): UserActivity | undefined {
  if (!record(value) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(value.type)) || !bounded(value.title, 500)) return undefined;
  return { type: value.type as UserActivity["type"], title: value.title, url: safeExternalUrl(value.url) || undefined, updatedAt: now };
}
function normalizeMeta(value: unknown, depth = 0): Record<string, unknown> | undefined {
  if (!record(value) || depth > 2) return undefined;
  const out: Record<string, unknown> = Object.create(null);
  for (const [key, item] of Object.entries(value).slice(0, 64)) {
    if (["__proto__", "constructor", "prototype", "rawSong"].includes(key)) continue;
    if (typeof item === "string" && item.length <= (key === "imageUrl" ? MAX_CHAT_BYTES : MAX_CHAT_TEXT)) {
      out[key] = /(?:cover|avatar|face|imageUrl)$/i.test(key) ? safeImageUrl(item) : /url$/i.test(key) ? safeExternalUrl(item) : item;
    } else if (typeof item === "boolean" || (typeof item === "number" && Number.isFinite(item))) out[key] = item;
    else if (key === "seriesItems" && Array.isArray(item)) out[key] = item.slice(0, 100).map(v => normalizeMeta(v, depth + 1)).filter(Boolean);
  }
  return out;
}
export function normalizeMessage(value: unknown): ChatMessage | undefined { return normalizeMessageAt(value, Date.now()); }
export function normalizeMessageAt(value: unknown, now: number): ChatMessage | undefined {
  if (!record(value) || !record(value.sender) || !bounded(value.id, 160) || !value.id || !bounded(value.sender.uid, 160) || !value.sender.uid || !bounded(value.sender.name, 100) || !bounded(value.content, MAX_CHAT_TEXT)) return undefined;
  if (![...CHAT_MESSAGE_TYPES, "system"].includes(String(value.type)) || typeof value.timestamp !== "number" || !Number.isFinite(value.timestamp)) return undefined;
  const avatar = safeImageUrl(value.sender.avatar) || (bounded(value.sender.avatar, 32) && !/[:/]/.test(value.sender.avatar) ? value.sender.avatar : "👤");
  return { id: value.id, sender: { uid: value.sender.uid, name: value.sender.name, avatar, activity: normalizeActivityAt(value.sender.activity, now) }, type: value.type as ChatMessage["type"], content: value.content, timestamp: value.timestamp, meta: normalizeMeta(value.meta) as ChatMessage["meta"] };
}

export function normalizeUserInfo(value: unknown): ChatUserInfo | undefined { return normalizeUserInfoAt(value, Date.now()); }
export function normalizeUserInfoAt(value: unknown, now: number): ChatUserInfo | undefined {
  if (!record(value) || !bounded(value.uid, 160) || !value.uid || !bounded(value.name, 100)) return undefined;
  const avatar = safeImageUrl(value.avatar) || (bounded(value.avatar, 32) && !/[:/]/.test(value.avatar) ? value.avatar : "👤");
  return { uid: value.uid, name: value.name, avatar, activity: normalizeActivityAt(value.activity, now) };
}

export function normalizeFriendRequest(value: unknown): FriendRequest | undefined {
  if (!record(value) || !bounded(value.id, 160) || !value.id || !bounded(value.toUid, 160) || !value.toUid) return undefined;
  const from = normalizeUserInfo(value.from);
  if (!from) return undefined;
  const status = ["pending", "accepted", "rejected"].includes(String(value.status)) ? (value.status as FriendRequest["status"]) : "pending";
  const createdAt = typeof value.createdAt === "number" && Number.isFinite(value.createdAt) ? value.createdAt : Date.now();
  const note = bounded(value.note, 200) ? value.note : undefined;
  return { id: value.id, from, toUid: value.toUid, note, status, createdAt };
}

export function normalizeFriendResponse(value: unknown): { requestId: string; from: ChatUserInfo; toUid: string; accepted: boolean; timestamp: number } | undefined {
  if (!record(value) || !bounded(value.requestId, 160) || !value.requestId || !bounded(value.toUid, 160) || !value.toUid || typeof value.accepted !== "boolean") return undefined;
  const from = normalizeUserInfo(value.from);
  if (!from) return undefined;
  const timestamp = typeof value.timestamp === "number" && Number.isFinite(value.timestamp) ? value.timestamp : Date.now();
  return { requestId: value.requestId, from, toUid: value.toUid, accepted: value.accepted, timestamp };
}
