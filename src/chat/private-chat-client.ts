import { reactive, watch } from "vue";
import { topProfileState } from "../profile/store";
import { relayAvatar } from "./chat-avatar";
import { chatModuleState as state, joinChatEndpoint, type ChatMessage } from "./chat-state";
import { privateChatConfig, privateEndpoint, savePrivatePublicConfig, validatePrivateRoom, type PrivateRoom } from "./private-chat-config";
import { archiveMessages, historyScope, readRelayCursor, commitRelayPage } from "./chat-history";
import { acknowledgeDeliveries, enqueueDelivery, refreshDeliveries, deliveryError } from "./chat-delivery";
import { unknownChatCapabilities, outgoingChatError, type ChatCapabilities } from "./chat-contract";
import { normalizeMessage } from "./chat-security";
import { detectCurrentActivity } from "./chat-activity";
import { notifyIncomingChatMessage } from "./chat-notifications";
import { HttpError, ChatCapabilityError } from "./private-chat-errors";
import { PrivateChatCredentialRepository } from "./private-chat-credentials";
import { PrivateChatHttpClient } from "./private-chat-http";
import { privateChatIdentityKey as key, isPrivateChatToken } from "./private-chat-identity";
import { PrivateChatSyncCoordinator, type PrivateSyncRound } from "./private-chat-sync";
import { parsePrivateChatSyncPage, parseRooms, parseSpaces, type PrivateChatMember } from "./private-chat-sync-reader";
import { applyPrivateChatSyncPage } from "./private-chat-sync-projection";
import { PrivateChatOutboxCoordinator, PRIVATE_CHAT_RECEIPT as RECEIPT } from "./private-chat-outbox";
import type { PrivateChatDestination, SessionRoom, SharedChatRoom, SharedChatSpace, ChatShareTarget, PrivateChatMessageContext } from "./private-chat-types";
export type { SharedChatRoom, SharedChatSpace, ChatShareTarget, PrivateChatMessageContext } from "./private-chat-types";
type PrivateChatMessageListener = (msg: ChatMessage, context: PrivateChatMessageContext) => void;
const privateChatMessageListeners: PrivateChatMessageListener[] = [];
export function onPrivateChatMessage(listener: PrivateChatMessageListener): () => void {
  privateChatMessageListeners.push(listener);
  return () => {
    const idx = privateChatMessageListeners.indexOf(listener);
    if (idx >= 0) privateChatMessageListeners.splice(idx, 1);
  };
}
export async function loadChatShareTargets(): Promise<ChatShareTarget[]> {
  const current = privateChatConfig.room;
  if (!current || current.uid !== state.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const c = { ...current };
  const result = await request(c, "/api/v1/rooms", "GET", undefined, AbortSignal.timeout(15000));
  if (!privateChatConfig.room || key(c) !== key(privateChatConfig.room)) throw new Error("聊天室配置已改变，请重新选择");
  const spaces = result.spaces ? parseSpaces(result.spaces) : [];
  return parseRooms(result.rooms).map(r => ({ ...c, channel: r.id, name: `${spaces.find(s => s.id === r.space)?.name || "聊天室"} / ${r.name}` }));
}
export async function sendPrivateShare(message: ChatMessage, target: ChatShareTarget): Promise<void> {
  const c = privateChatConfig.room;
  if (!c || key(c) !== key(target) || state.currentUser.uid !== target.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const normalized = normalizeMessage(message);
  if (!normalized || normalized.type === "system" || normalized.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const frozen = { ...target };
  normalized.sender = { ...normalized.sender, uid: frozen.uid, avatar: relayAvatar(state.currentUser.avatar, topProfileState.avatarUrl), name: state.currentUser.name };
  const capabilityError = outgoingChatError(capabilitiesFor(frozen), normalized);
  if (capabilityError) throw new Error(capabilityError);
  await archiveMessages(scope(frozen), [normalized]);
  await enqueueDelivery(scope(frozen), normalized, [RECEIPT]);
  if (active(frozen) && !state.messages.some(m => m.id === normalized.id)) state.messages.push(normalized);
  // Do not switch the visible room. The outbox remains bound to this immutable target.
  try {
    await outbox.postAndAcknowledge(frozen, normalized, 15000);
  } catch (error) {
    await outbox.recordFailure(frozen, normalized.id, error, 0);
    ensurePrivateChat();
    throw new Error(`未收到「${frozen.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}

export const privateChatState = reactive({
  status: "未配置私有服务器",
  role: "",
  syncing: false,
  channel: "main",
  rooms: [] as SharedChatRoom[],
  spaces: [] as SharedChatSpace[],
  spacesSupported: false,
  imageMessagesSupported: false,
  capabilities: unknownChatCapabilities(),
  roomsSupported: false,
  friends: [] as string[],
  members: [] as PrivateChatMember[]
});
function capabilitiesFor(c: PrivateRoom): ChatCapabilities {
  return authenticatedKey === key(c) && privateChatConfig.room && key(privateChatConfig.room) === key(c) && state.currentUser.uid === c.uid
    ? privateChatState.capabilities : unknownChatCapabilities();
}
function clearCapabilities(): void { privateChatState.capabilities = unknownChatCapabilities(); privateChatState.imageMessagesSupported = false; }
const outbox = new PrivateChatOutboxCoordinator({
  active, capabilities: capabilitiesFor, scope,
  avatar: value => relayAvatar(value, topProfileState.avatarUrl),
  destinations: c => [session(c), ...privateChatState.rooms.filter(room => room.id !== privateChatState.channel).map(room => ({ ...c, channel: room.id }))],
  post: (destination, message, signal) => request(destination, "/api/v1/messages", "POST", { message }, signal)
});
const credentials = new PrivateChatCredentialRepository(() => {
  privateChatState.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
});
const http = new PrivateChatHttpClient({
  credential: (destination, signal) => credentials.read(destination, signal),
  beforeSend: ({ destination, path, method, body }) => {
    if (method === "POST" && path === "/api/v1/messages") {
      const problem = outgoingChatError(capabilitiesFor(destination), (body as { message: ChatMessage }).message);
      if (problem) throw new ChatCapabilityError(problem);
    }
  }
});
export function previewPrivateInvite(raw: string): PrivateRoom & { token: string } {
  const prefix = "BEAVER-PRIVATE1:";
  if (!raw.startsWith(prefix) || raw.length > 8000) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const v = JSON.parse(decodeURIComponent(atob(raw.slice(prefix.length))));
    if (!v || !isPrivateChatToken(v.token)) throw new Error();
    return { ...validatePrivateRoom(v), token: v.token };
  } catch { throw new Error("邀请格式无效"); }
}
let invitationActivationVersion = 0;
export async function joinPrivateInvite(raw: string): Promise<void> {
  const c = previewPrivateInvite(raw);
  if (c.uid !== state.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const publicConfig = validatePrivateRoom(c);
  const originalConfig = privateChatConfig.room ? key(privateChatConfig.room) : null;
  // Invalidate before an accepted write can change the key, including uncertain late commits.
  stopPrivateChat();
  const version = invitationActivationVersion;
  await credentials.write(publicConfig, c.token);
  if (version !== invitationActivationVersion || state.currentUser.uid !== c.uid ||
      originalConfig !== (privateChatConfig.room ? key(privateChatConfig.room) : null)) {
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  }
  // Only this still-current activation may clear authentication and change public config.
  stopPrivateChat();
  savePrivatePublicConfig(publicConfig);
  state.transportMode = "relay";
  joinChatEndpoint(privateEndpoint(publicConfig), c.room);
  restartPrivateChat();
}
function request(c: PrivateRoom, path: string, method = "GET", body?: unknown, signal?: AbortSignal): Promise<any> {
  return http.request({ destination: c, path, method, body, signal });
}
async function admin(path: string, method: string, body?: unknown): Promise<any> {
  const c = privateChatConfig.room; if (!c) throw new Error("未配置私有服务器");
  return request({ ...c }, path, method, body, AbortSignal.timeout(15000));
}
export async function listPrivateMembers(): Promise<any[]> { return (await admin("/api/v1/members", "GET")).members; }
export async function invitePrivateMember(uid: string, name: string): Promise<string> {
  const c = privateChatConfig.room; if (!c) throw new Error("未配置私有服务器");
  const frozen = { ...c };
  const r = await request(frozen, "/api/v1/members", "POST", { uid, name }, AbortSignal.timeout(15000));
  if (!isPrivateChatToken(r.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...frozen, uid, token: r.token })));
}
export async function sendServerInvitationCard(targetUser: { uid: string; name: string }): Promise<void> {
  const c = privateChatConfig.room;
  if (!c) throw new Error("未配置私有服务器，无法发送邀请");
  if (targetUser.uid === state.currentUser.uid) throw new Error("不能邀请自己");
  const caps = capabilitiesFor(c);
  if (!caps.messageTypes.includes("server_invite")) throw new Error(caps.status === "unknown" || caps.status === "incompatible" ? caps.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");

  const inviteCode = await invitePrivateMember(targetUser.uid, targetUser.name);
  const currentSpace = privateChatState.spaces.find(s => s.id === (privateChatState.rooms.find(r => r.id === privateChatState.channel)?.space || "hub_main"));
  const currentRoom = privateChatState.rooms.find(r => r.id === privateChatState.channel) || privateChatState.rooms[0];
  const serverName = currentSpace?.name || c.room || "海狸聊天室";
  const roomName = currentRoom?.name || "综合讨论";

  let token = "";
  try {
    const raw = JSON.parse(decodeURIComponent(atob(inviteCode.replace(/^BEAVER-PRIVATE1:/, ""))));
    token = raw.token || "";
  } catch {}

  const inviteMessage: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: state.currentUser.uid,
      name: state.currentUser.name,
      avatar: state.currentUser.avatar
    },
    type: "server_invite",
    content: `邀请你加入【${serverName}】聊天室`,
    meta: {
      inviteOrigin: c.origin,
      inviteRoom: c.room,
      inviteRoomName: roomName,
      inviteServerName: serverName,
      inviteServerIcon: currentSpace?.icon || "🏠",
      inviteToken: token,
      inviteTargetUid: targetUser.uid,
      inviteCode: inviteCode
    },
    timestamp: Date.now()
  };

  const dmChannel = dmChannelId(targetUser.uid);
  await sendPrivateShare(inviteMessage, {
    ...c,
    channel: dmChannel,
    name: `私聊 / ${targetUser.name}`
  });

  openDirectMessage(targetUser.uid);
}

export async function revokePrivateMember(id: string): Promise<void> {
  if (!/^[a-f0-9]{32}$/.test(id)) throw new Error("成员标识无效");
  await admin("/api/v1/members/" + id, "DELETE");
}
function session(c: PrivateRoom): SessionRoom { return { ...c, channel: privateChatState.channel }; }
function sessionEndpoint(c: PrivateRoom): string {
  const u = new URL(privateEndpoint(c));
  const channel = (c as SessionRoom).channel || "main";
  if (channel !== "main") u.searchParams.set("channel", channel);
  return u.href;
}
function scope(c: PrivateRoom): string { return historyScope(c.uid, sessionEndpoint(c), c.room); }
function active(c: PrivateRoom): boolean { return state.currentUser.uid === c.uid && state.serverUrl === sessionEndpoint(c) && ((c as SessionRoom).channel || "main") === privateChatState.channel && state.currentRoomId === c.room && privateChatConfig.room !== null && key(privateChatConfig.room) === key(c); }
/** Public event identity only; never exposes credentials or starts a connection. */
export function currentPrivateChatMessageSession(): { scope: string; channel: string } | null {
  const c = privateChatConfig.room && session(privateChatConfig.room);
  return c && active(c) ? { scope: scope(c), channel: c.channel } : null;
}
export function dmChannelId(targetUid: string): string {
  return "dm_" + [state.currentUser.uid, targetUid].sort().join("__");
}

export function dmTargetUid(channel: string): string | undefined {
  if (!channel.startsWith("dm_")) return undefined;
  const parts = channel.slice(3).split("__");
  if (parts.length !== 2) return undefined;
  return parts.find(u => u !== state.currentUser.uid);
}

export function openDirectMessage(targetUid: string): void {
  const c = privateChatConfig.room;
  if (!c || !targetUid || targetUid === state.currentUser.uid) return;
  const channel = dmChannelId(targetUid);
  if (channel === privateChatState.channel && active(session(c))) return;
  if (!joinChatEndpoint(sessionEndpoint({ ...c, channel } as SessionRoom), c.room, true)) return;
  privateChatState.channel = channel;
  restartPrivateChat();
}

export async function sendPrivateFriendRequest(toUid: string): Promise<void> {
  const c = privateChatConfig.room;
  if (!c) throw new Error("未配置私有服务器");
  await request({ ...c }, "/api/v1/friends/request", "POST", { toUid }, AbortSignal.timeout(15000));
}

export async function respondPrivateFriendRequest(id: string, accept: boolean): Promise<void> {
  const c = privateChatConfig.room;
  if (!c) throw new Error("未配置私有服务器");
  await request({ ...c }, "/api/v1/friends/respond", "POST", { id, accept }, AbortSignal.timeout(15000));
}

export function selectSharedRoom(id: string): void {
  const c = privateChatConfig.room;
  if (!c || !privateChatState.rooms.some(r => r.id === id)) return;
  if (id === privateChatState.channel && active(session(c))) { ensurePrivateChat(); return; }
  if (!joinChatEndpoint(sessionEndpoint({ ...c, channel: id } as SessionRoom), c.room, authenticatedKey === key(c) && state.currentUser.uid === c.uid)) return;
  privateChatState.channel = id;
  restartPrivateChat();
}
export async function saveSharedRoom(value: Omit<SharedChatRoom, "id">, id?: string): Promise<void> {
  const c = privateChatConfig.room; if (!c) throw new Error("未配置");
  const original = key(c);
  const frozen = { ...c };
  await request(frozen, id ? `/api/v1/rooms/${encodeURIComponent(id)}` : "/api/v1/rooms", "POST", value, AbortSignal.timeout(15000));
  const result = await request(frozen, "/api/v1/rooms", "GET", undefined, AbortSignal.timeout(15000));
  if (privateChatConfig.room && key(privateChatConfig.room) === original && state.currentUser.uid === c.uid) {
    const rooms = parseRooms(result.rooms), spaces = result.spaces ? parseSpaces(result.spaces) : undefined;
    privateChatState.rooms = rooms;
    if (spaces && privateChatConfig.room && key(privateChatConfig.room) === original && state.currentUser.uid === c.uid) privateChatState.spaces = spaces;
  }
}
export async function archiveSharedRoom(id: string): Promise<void> {
  if (id === "main") throw new Error("默认房间不可移除");
  const c = privateChatConfig.room; if (!c) throw new Error("未配置");
  const original = key(c);
  await request({ ...c }, `/api/v1/rooms/${encodeURIComponent(id)}`, "DELETE", undefined, AbortSignal.timeout(15000));
  if (!privateChatConfig.room || key(privateChatConfig.room) !== original) return;
  privateChatState.rooms = privateChatState.rooms.filter(r => r.id !== id);
  if (privateChatState.channel === id) selectSharedRoom("main");
}
export async function saveSharedSpace(value: Omit<SharedChatSpace, "id">, id?: string): Promise<void> {
  const c = privateChatConfig.room; if (!c) throw new Error("未配置");
  const original = key(c);
  await request({ ...c }, id ? `/api/v1/spaces/${encodeURIComponent(id)}` : "/api/v1/spaces", "POST", value, AbortSignal.timeout(15000));
  if (privateChatConfig.room && key(privateChatConfig.room) === original) await refreshSpaceCatalog(c);
}
export async function archiveSharedSpace(id: string): Promise<void> {
  if (id === "hub_main") throw new Error("默认空间不可移除");
  const c = privateChatConfig.room; if (!c) throw new Error("未配置");
  const original = key(c), selectedChannel = privateChatState.channel;
  await request({ ...c }, `/api/v1/spaces/${encodeURIComponent(id)}`, "DELETE", undefined, AbortSignal.timeout(15000));
  if (!privateChatConfig.room || key(privateChatConfig.room) !== original || state.currentUser.uid !== c.uid) return;
  await refreshSpaceCatalog(c);
  if (!privateChatConfig.room || key(privateChatConfig.room) !== original || state.currentUser.uid !== c.uid) return;
  if (privateChatState.channel === selectedChannel && !privateChatState.rooms.some(r => r.id === selectedChannel)) selectSharedRoom("main");
}
async function refreshSpaceCatalog(c: PrivateRoom): Promise<void> {
  const result = await request({ ...c }, "/api/v1/spaces", "GET", undefined, AbortSignal.timeout(15000));
  if (!privateChatConfig.room || key(privateChatConfig.room) !== key(c) || state.currentUser.uid !== c.uid) return;
  const spaces = parseSpaces(result.spaces), rooms = parseRooms(result.rooms);
  privateChatState.spaces = spaces;
  if (privateChatConfig.room && key(privateChatConfig.room) === key(c) && state.currentUser.uid === c.uid) privateChatState.rooms = rooms;
}
let connectionKey = "";
// Parent-room identity survives child-room changes, not explicit disconnects or auth failures.
let authenticatedKey = "";
const sync = new PrivateChatSyncCoordinator({
  active, visible: () => state.visible, poll: pollPrivateChat,
  started: () => { state.connecting = !state.connected; privateChatState.syncing = true; },
  idle: () => { privateChatState.syncing = false; },
  classify: (error, c) => error instanceof HttpError && error.status === 404 && (c.channel || "main") !== "main" ? "missing-room"
    : error instanceof HttpError && [401, 403].includes(error.status) ? "auth" : "retry",
  failed: (kind, phase, failures) => {
    if (kind === "missing-room") {
      privateChatState.channel = "main";
      privateChatState.status = "房间已移除，正在返回综合讨论";
    } else if (kind === "auth") {
      authenticatedKey = ""; clearCapabilities(); privateChatState.role = "";
      state.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请";
      state.connected = false; state.connecting = false;
    } else if (failures >= 2) {
      state.connected = false; state.connecting = false;
      state.error = `${phase}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`;
      privateChatState.status = state.error;
    }
  },
  restart: () => restartPrivateChat()
});
export function ensurePrivateChat(): void {
  const c = privateChatConfig.room && session(privateChatConfig.room);
  if (c && !sync.stopped && connectionKey === key(c) && active(c)) return;
  restartPrivateChat();
}
function cancelRoomSync(): void { sync.cancel(); }
export function stopPrivateChat(): void {
  ++invitationActivationVersion;
  cancelRoomSync(); authenticatedKey = ""; clearCapabilities();
  state.connected = false; state.connecting = false; privateChatState.role = "";
}
export function restartPrivateChat(): void {
  const c = privateChatConfig.room && session(privateChatConfig.room);
  const sameIdentity = !!c && authenticatedKey === key(c) && state.currentUser.uid === c.uid;
  if (sameIdentity) cancelRoomSync(); else stopPrivateChat();
  if (!c) { privateChatState.status = "尚未读取到聊天室配置，请在此窗口设置中检查"; state.error = ""; return; }
  if (c.uid !== state.currentUser.uid) { state.error = privateChatState.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请"; return; }
  state.transportMode = "relay";
  if (!joinChatEndpoint(sessionEndpoint(c), c.room, sameIdentity)) return;
  connectionKey = key(c);
  if (!state.connected) privateChatState.status = "正在同步";
  sync.start(c);
}
async function pollPrivateChat(c: PrivateChatDestination, round: PrivateSyncRound): Promise<{ hasMore: boolean } | undefined> {
  const scopeKey = scope(c), channel = c.channel || "main";
  const cursor = await round.wait(() => readRelayCursor(scopeKey));
  const avatar = relayAvatar(state.currentUser.avatar, topProfileState.avatarUrl);
  const act = state.currentUser.activity || detectCurrentActivity();
  const actQuery = (state.shareActivity !== false && act?.title)
    ? `&act_type=${encodeURIComponent(act.type || "")}&act_title=${encodeURIComponent(act.title || "")}&act_url=${encodeURIComponent(act.url || "")}` : "";
  const waitQuery = round.visible ? "&wait=6" : "";
  const syncPath = `/api/v1/sync?after=${cursor}&avatar=${encodeURIComponent(avatar)}&name=${encodeURIComponent(state.currentUser.name.slice(0, 100))}${actQuery}${waitQuery}`;
  round.phase("连接私有服务器");
  const result: unknown = await round.wait(() => request(c, syncPath, "GET", undefined, round.signal));
  if (!round.current()) return;
  round.phase("校验同步页");
  let page: ReturnType<typeof parsePrivateChatSyncPage>;
  try { page = parsePrivateChatSyncPage(result, c.uid, cursor, Date.now()); }
  catch (error) {
    // A structurally invalid authenticated page is not fresh permission to send.
    if (round.current()) clearCapabilities();
    throw error;
  }
  if (!round.current()) return;
  round.phase("保存同步记录");
  await round.wait(() => commitRelayPage(scopeKey, page.messages, page.next));
  if (!round.current()) return;
  // An authenticated sync copy remains storage proof when a POST receipt was lost.
  try {
    await round.wait(() => acknowledgeDeliveries(scopeKey, page.messages.filter(message => message.sender.uid === c.uid).map(message => message.id), RECEIPT));
  } catch { if (round.current()) deliveryError.value = "无法保存消息的发送确认，请检查浏览器存储。"; }
  if (!round.current()) return;
  round.phase("应用同步状态");
  if (!applyPrivateChatSyncPage(page, { scope: scopeKey, channel, cursor, now: Date.now() }, round, {
    chat: state, service: privateChatState, authenticated: () => { authenticatedKey = key(c); },
    publish: (message, context, current) => {
      // A listener added during dispatch joins the next message, not this dispatch.
      for (const listener of [...privateChatMessageListeners]) {
        if (!current()) return;
        try { listener(message, context); } catch { console.warn("[PrivateChat] message listener failed"); }
      }
    },
    notify: notifyIncomingChatMessage
  })) return;
  if (!round.current()) return;
  round.phase("处理待发消息");
  void outbox.flush(c);
  return { hasMore: page.hasMore };
}

export async function sendPrivateMessage(value: ChatMessage): Promise<boolean> {
  const c = privateChatConfig.room && session(privateChatConfig.room);
  if (!c || !active(c)) { deliveryError.value = "未配置此房间的私有服务器，未发送"; return false; }
  if (value.sender) {
    value.sender.avatar = relayAvatar(state.currentUser.avatar, topProfileState.avatarUrl);
    if (state.currentUser.name) value.sender.name = state.currentUser.name;
  }
  const message = normalizeMessage(value);
  if (!message || message.type === "system") {
    deliveryError.value = "消息格式无效，未发送";
    return false;
  }
  const capabilityError = outgoingChatError(capabilitiesFor(c), message);
  if (capabilityError) { deliveryError.value = capabilityError; return false; }
  const frozen = { ...c };
  try {
    await archiveMessages(scope(frozen), [message]);
    await enqueueDelivery(scope(frozen), message, [RECEIPT]);
    if (active(frozen) && !state.messages.some(m => m.id === message.id)) state.messages.push(message);
    deliveryError.value = "";
    // 关键：立即异步触发独立发信管道，0ms 直接发往服务器，绝不阻塞在长轮询后面！
    void outbox.flush(frozen);
    return true; // Accepted by the local durable outbox, not a server/read receipt.
  } catch { deliveryError.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试"; return false; }
}
let installed = false;
export function installPrivateChat(): void {
  if (installed) return; installed = true;
  watch(() => JSON.stringify(privateChatConfig.room), () => {
    const c = privateChatConfig.room;
    privateChatState.members = [];
    privateChatState.rooms = [];
    privateChatState.roomsSupported = false;
    privateChatState.spaces = [];
    privateChatState.spacesSupported = false;
    clearCapabilities();
    privateChatState.channel = "main";
    if (!c) {
      state.visible = false; privateChatState.members = [];
    }
    restartPrivateChat();
  }, { immediate: true });
  watch(() => state.visible, visible => { if (visible) ensurePrivateChat(); });
  watch(() => state.currentUser.uid, () => restartPrivateChat());
  if (privateChatConfig.room) void refreshDeliveries(scope(privateChatConfig.room)).catch(() => { deliveryError.value = "待发队列读取失败，请关闭旧标签页后重试"; });
}
