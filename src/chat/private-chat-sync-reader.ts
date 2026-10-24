import type { ChatMessage, FriendRequest, UserActivity } from "./chat-state";
import type { SharedChatRoom, SharedChatSpace } from "./private-chat-types";
import { normalizeMessageAt, normalizeUserInfoAt } from "./chat-security";
import { parseChatCapabilities, type ChatCapabilities } from "./chat-contract";

const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const id = (v: unknown): v is string => typeof v === "string" && /^[A-Za-z0-9_-]{1,160}$/.test(v);
const absent = (v: unknown): boolean => v === undefined || v === null;
const finite = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;
function fail(): never { throw new Error("同步页格式无效，未提交本页记录或推进游标"); }

export interface PrivateChatMember {
  uid: string; name: string; avatar: string; role: "owner" | "member";
  activity?: UserActivity; online?: boolean; lastSeen?: number;
}
export interface PrivateChatSyncPage {
  readonly uid: string;
  readonly role: "owner" | "member";
  readonly messages: ChatMessage[];
  readonly sequences: number[];
  readonly next: number;
  readonly hasMore: boolean;
  readonly capabilities: ChatCapabilities;
  readonly rooms: SharedChatRoom[];
  readonly spaces: SharedChatSpace[];
  readonly roomsSupported: boolean;
  readonly spacesSupported: boolean;
  readonly members: PrivateChatMember[];
  readonly friends?: string[];
  readonly friendRequests?: FriendRequest[];
}
export function parseRooms(value: unknown): SharedChatRoom[] {
  if (!Array.isArray(value) || value.length > 32) throw new Error("房间列表格式无效");
  return value.map(r => {
    if (!record(r) || !id(r.id) || typeof r.name !== "string" || r.name.length > 80 || typeof r.icon !== "string" || r.icon.length > 8 || typeof r.description !== "string" || r.description.length > 500) throw new Error("房间格式无效");
    if (r.space !== undefined && !id(r.space)) throw new Error("空间格式无效");
    return { id: r.id, name: r.name, icon: r.icon, description: r.description, space: typeof r.space === "string" ? r.space : "hub_main" };
  });
}
export function parseSpaces(value: unknown): SharedChatSpace[] {
  if (!Array.isArray(value) || value.length > 16) throw new Error("空间列表格式无效");
  return value.map(s => {
    if (!record(s) || !id(s.id) || typeof s.name !== "string" || s.name.length > 80 || typeof s.icon !== "string" || s.icon.length > 8) throw new Error("空间格式无效");
    return { id: s.id, name: s.name, icon: s.icon };
  });
}
// Server metadata names can contain 80 Unicode code points (up to 160 UTF-16 units).
// Reuse avatar/activity normalization without imposing the separate 100-unit message-name limit.
function metadataUser(value: Record<string, unknown>, now: number) {
  if (typeof value.name !== "string" || value.name.length > 200) return undefined;
  const user = normalizeUserInfoAt({ ...value, name: value.name.slice(0, 100) }, now);
  return user && { ...user, name: value.name };
}
function members(value: unknown, now: number): PrivateChatMember[] {
  if (absent(value)) return [];
  if (!Array.isArray(value) || value.length > 65) fail();
  return value.map(raw => {
    if (!record(raw) || !id(raw.uid) || (raw.role !== undefined && raw.role !== "owner" && raw.role !== "member")) fail();
    const user = metadataUser(raw, now);
    if (!user) fail();
    if (user.activity && record(raw.activity) && finite(raw.activity.updatedAt)) user.activity.updatedAt = raw.activity.updatedAt;
    return { ...user, role: raw.role === "owner" ? "owner" : "member",
      online: typeof raw.online === "boolean" ? raw.online : undefined, lastSeen: finite(raw.lastSeen) ? raw.lastSeen : undefined };
  });
}
function requests(value: unknown, uid: string, now: number): FriendRequest[] | undefined {
  if (absent(value)) return undefined;
  if (!Array.isArray(value) || value.length > 200) fail();
  return value.map(raw => {
    if (!record(raw) || !id(raw.id) || !id(raw.toUid) || !record(raw.from) || !id(raw.from.uid)) fail();
    const from = metadataUser(raw.from, now);
    if (!from || (from.uid !== uid && raw.toUid !== uid) || !["pending", "accepted", "rejected"].includes(String(raw.status))) fail();
    if (raw.createdAt !== undefined && !finite(raw.createdAt)) fail();
    return { id: raw.id, from, toUid: raw.toUid, status: raw.status as FriendRequest["status"],
      createdAt: finite(raw.createdAt) ? raw.createdAt : now, note: typeof raw.note === "string" && raw.note.length <= 200 ? raw.note : undefined };
  });
}
/** Deterministic draft only: no clock reads, globals, stores, notifications or I/O. */
export function parsePrivateChatSyncPage(value: unknown, uid: string, cursor: number, now: number): PrivateChatSyncPage {
  if (!Number.isSafeInteger(cursor) || cursor < 0 || !finite(now) || !record(value) || !record(value.identity) ||
      value.identity.uid !== uid || (value.identity.role !== "owner" && value.identity.role !== "member") ||
      !Array.isArray(value.messages) || value.messages.length > 50) fail();
  let next = cursor;
  const messages: ChatMessage[] = [], sequences: number[] = [];
  for (const row of value.messages) {
    if (!record(row) || !Number.isSafeInteger(row.seq) || (row.seq as number) <= next) fail();
    const message = normalizeMessageAt(row.message, now);
    if (!message) fail();
    messages.push(message); sequences.push(row.seq as number); next = row.seq as number;
  }
  if (value.hasMore !== undefined && typeof value.hasMore !== "boolean") fail();
  const hasMore = value.hasMore === true;
  if (hasMore && !messages.length) fail();
  let friends: string[] | undefined;
  if (!absent(value.friends)) {
    if (!Array.isArray(value.friends) || value.friends.length > 4096 || !value.friends.every(id)) fail();
    friends = [...new Set(value.friends as string[])];
  }
  return Object.freeze({ uid, role: value.identity.role, messages, sequences, next, hasMore,
    capabilities: parseChatCapabilities(value.capabilities),
    rooms: absent(value.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : parseRooms(value.rooms),
    spaces: absent(value.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : parseSpaces(value.spaces),
    roomsSupported: Array.isArray(value.rooms), spacesSupported: Array.isArray(value.spaces),
    members: members(value.members, now), friends, friendRequests: requests(value.friendRequests, uid, now) });
}
