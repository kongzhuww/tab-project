import type { chatModuleState, ChatMessage, ChatFriend, UserActivity } from "./chat-state";
import type { PrivateChatMessageContext, SharedChatRoom, SharedChatSpace } from "./private-chat-types";
import type { ChatCapabilities } from "./chat-contract";
import type { PrivateChatSyncPage, PrivateChatMember } from "./private-chat-sync-reader";
import type { PrivateSyncRound } from "./private-chat-sync";
import { MAX_CHAT_MESSAGES } from "./chat-security";

type ChatView = Pick<typeof chatModuleState, "messages" | "visible" | "unreadCount" | "userActivities" | "friends" | "friendRequests" | "connected" | "connecting" | "error">;
export interface PrivateSyncView {
  capabilities: ChatCapabilities; imageMessagesSupported: boolean;
  rooms: SharedChatRoom[]; spaces: SharedChatSpace[]; roomsSupported: boolean; spacesSupported: boolean;
  role: string; members: PrivateChatMember[]; friends: string[]; status: string;
}
interface ProjectionPorts {
  chat: ChatView;
  service: PrivateSyncView;
  authenticated(): void;
  publish(message: ChatMessage, context: PrivateChatMessageContext, current: () => boolean): void;
  notify(message: ChatMessage, channel: string): void;
}
type ProjectionRound = Pick<PrivateSyncRound, "current" | "restoring" | "caughtUp">;
/** Synchronous guarded assignments, not an IndexedDB/Vue transaction or rollback. */
function assignCurrent<T extends object>(target: T, patch: Partial<T>, current: () => boolean): boolean {
  for (const key of Object.keys(patch) as (keyof T)[]) {
    if (!current()) return false;
    target[key] = patch[key] as T[keyof T];
  }
  return current();
}
/** Called only after this validated page's history/cursor transaction has completed. */
export function applyPrivateChatSyncPage(page: PrivateChatSyncPage, context: { scope: string; channel: string; cursor: number; now: number },
  round: ProjectionRound, ports: ProjectionPorts): boolean {
  const { chat, service } = ports, current = round.current;
  if (!current()) return false;
  const restoring = round.restoring();
  for (let index = 0; index < page.messages.length; index++) {
    if (!current()) return false;
    const message = page.messages[index];
    ports.publish(message, Object.freeze({ scope: context.scope, channel: context.channel, sequence: page.sequences[index],
      source: restoring ? "history" : message.sender.uid === page.uid ? "self" : "live" }), current);
  }
  if (!current()) return false;
  const existing = new Set(chat.messages.map(message => message.id));
  const incoming = page.messages.filter(message => message.sender.uid !== page.uid && !message.meta?.silentPartySync && message.type !== "system" && !existing.has(message.id));
  const notifications = !chat.visible
    ? incoming.filter(message => (context.cursor > 0 || context.now - message.timestamp < 30000) && (message.type !== "music_party" || !restoring)).slice(-3) : [];
  const merged = new Map(chat.messages.map(message => [message.id, message]));
  for (const message of page.messages) merged.set(message.id, message);
  const activities: Record<string, UserActivity> = Object.assign(Object.create(null), chat.userActivities);
  for (const member of page.members) if (member.activity) activities[member.uid] = member.activity;
  const addedFriends: ChatFriend[] = [], known = new Set(chat.friends.map(friend => friend.uid)), roster = new Map(page.members.map(member => [member.uid, member]));
  for (const uid of page.friends || []) {
    const member = roster.get(uid);
    if (member && !known.has(uid)) {
      addedFriends.push({ uid, name: member.name, avatar: member.avatar, addedAt: context.now, status: "mutual" }); known.add(uid);
    }
  }
  if (!assignCurrent(chat, { messages: [...merged.values()].sort((a, b) => a.timestamp - b.timestamp || a.id.localeCompare(b.id)).slice(-MAX_CHAT_MESSAGES),
    unreadCount: incoming.length ? chat.visible ? 0 : chat.unreadCount + incoming.length : chat.unreadCount }, current)) return false;
  if (!assignCurrent(service, { capabilities: page.capabilities, imageMessagesSupported: page.capabilities.messageTypes.includes("image"),
    spacesSupported: page.spacesSupported, spaces: page.spaces, roomsSupported: page.roomsSupported, rooms: page.rooms }, current)) return false;
  ports.authenticated();
  if (!current()) return false;
  if (!assignCurrent(service, { role: page.role, members: page.members, ...(page.friends === undefined ? {} : { friends: page.friends }) }, current)) return false;
  for (const friend of addedFriends) {
    if (!current()) return false;
    if (!chat.friends.some(existing => existing.uid === friend.uid)) chat.friends.push(friend);
  }
  const activityPatch = page.members.some(member => !!member.activity) || Object.getPrototypeOf(chat.userActivities) !== null ? { userActivities: activities } : {};
  if (!assignCurrent(chat, { ...activityPatch, ...(page.friendRequests === undefined ? {} : { friendRequests: page.friendRequests }),
    connected: true, connecting: false, error: "" }, current)) return false;
  if (!assignCurrent(service, { status: "已连接私有服务器" }, current)) return false;
  if (!page.hasMore) round.caughtUp();
  for (const message of notifications) {
    if (!current()) return false;
    if (chat.visible) break;
    try { ports.notify(message, context.channel); }
    catch { console.warn("[PrivateChat] notification failed"); }
  }
  return current();
}
