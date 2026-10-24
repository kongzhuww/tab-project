import { reactive, watch } from "vue";
import { archiveMessages, historyScope, readHistoryPage, historyError, pendingHistoryCount } from "./chat-history";
import { normalizeMessage, serverUrl as validateServerUrl } from "./chat-security";
import { topProfileState } from "../profile/store";
import { profileAvatarUrl } from "./chat-avatar";

const STORAGE_KEY_SERVER = "lw_chat_server_url";
const STORAGE_KEY_USER_ID = "lw_chat_user_id";
const STORAGE_KEY_USER_NAME = "lw_chat_user_name";
const STORAGE_KEY_USER_AVATAR = "lw_chat_user_avatar";
const STORAGE_KEY_GROUPS = "lw_chat_groups";
const STORAGE_KEY_CURRENT_GROUP = "lw_chat_current_group";
const STORAGE_KEY_ROOMS = "lw_chat_rooms";
const STORAGE_KEY_FRIENDS = "lw_chat_friends";
const STORAGE_KEY_FRIEND_REQUESTS = "lw_chat_friend_requests_v1";
const STORAGE_KEY_TRANSPORT_MODE = "lw_chat_transport_mode";
const STORAGE_KEY_CURRENT_ROOM = "lw_chat_current_room";


// No built-in public chat endpoint.
const DEFAULT_SERVER_URL = "";

function getStored(key: string, fallback: string): string {
  try {
    if (typeof localStorage !== "undefined") {
      const val = localStorage.getItem(key);
      // 清除历史残留的公共写死域名
      if (key === STORAGE_KEY_SERVER && val && localStorage.getItem("lw_chat_server_explicit") !== "true" && (val.includes("sslip.io") || val.includes("your-domain.com"))) {
        localStorage.removeItem(key);
        return fallback;
      }
      if (val !== null) return val;
    }
  } catch {}
  return fallback;
}

function setStored(key: string, val: string): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, val);
    }
  } catch {}
}

function getStoredJSON<T>(key: string, fallback: T): T {
  try {
    if (typeof localStorage !== "undefined") {
      const val = localStorage.getItem(key);
      if (val) return JSON.parse(val);
    }
  } catch {}
  return fallback;
}

const defaultGroups: ChatGroup[] = [
  {
    id: "hub_main",
    name: "公共自习室",
    icon: "🏠",
    channels: [
      { id: "general", name: "综合闲聊", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站放映厅", icon: "📺" },
      { id: "dev", name: "开源与代码", icon: "🐙" }
    ]
  },
  {
    id: "hub_gaming",
    name: "宿舍开黑组",
    icon: "🎮",
    channels: [
      { id: "general", name: "开黑集合", icon: "💬" },
      { id: "music", name: "战歌分享", icon: "🎵" },
      { id: "meme", name: "搞笑动态", icon: "⚡" }
    ]
  }
];

const defaultRooms: ChatRoom[] = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];

function randomName(): string {
  const adjectives = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"];
  const nouns = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${adj}的${noun}#${num}`;
}

function randomAvatar(): string {
  const avatars = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

const initialUserId = getStored(STORAGE_KEY_USER_ID, "");
const finalUserId = initialUserId || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
if (!initialUserId) {
  setStored(STORAGE_KEY_USER_ID, finalUserId);
}

const initialUserName = getStored(STORAGE_KEY_USER_NAME, "");
const isDefaultName = !initialUserName || initialUserName.includes("#");
const biliName = topProfileState.userName && topProfileState.userName !== "哔哩哔哩用户" && topProfileState.userName !== "浏览器指纹与环境" ? topProfileState.userName : "";
const finalUserName = (isDefaultName && biliName) ? biliName : (initialUserName || randomName());
if (!initialUserName) {
  setStored(STORAGE_KEY_USER_NAME, finalUserName);
}

const initialAvatar = getStored(STORAGE_KEY_USER_AVATAR, "");
const isDefaultEmoji = !initialAvatar || initialAvatar.length <= 4 || initialAvatar.startsWith("data:") || initialAvatar.includes("/noface.");
const biliAvatar = profileAvatarUrl(topProfileState.avatarUrl);
const finalAvatar = (isDefaultEmoji && biliAvatar) ? biliAvatar : (initialAvatar || randomAvatar());
if (!initialAvatar) {
  setStored(STORAGE_KEY_USER_AVATAR, finalAvatar);
}

export interface UserActivity {
  type: "bilibili" | "github" | "music" | "aihot" | "youtube" | "idle";
  title: string;
  url?: string;
  updatedAt: number;
}

export type FriendStatus = "mutual" | "local" | "pending_outgoing";

export interface ChatFriend {
  uid: string;
  name: string;
  avatar: string;
  addedAt: number;
  status?: FriendStatus;
  activity?: UserActivity;
  online?: boolean;
}

export interface FriendRequest {
  id: string;
  from: ChatUserInfo;
  toUid: string;
  note?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: number;
}

export interface ChatChannel {
  endpoint?: string; // Exact connection target, including its room parameter.
  id: string; // e.g. "general", "music", "bili"
  name: string; // e.g. "综合闲聊", "音乐咖啡馆"
  icon: string; // e.g. "💬", "🎵", "📺", "🐙"
}

export interface GroupMember {
  uid: string;
  name: string;
  avatar: string;
  online: boolean;
  activity?: UserActivity;
  role?: "owner" | "member";
}
export interface ChatGroup {
  id: string; // e.g. "hub_main", "hub_dorm"
  name: string; // e.g. "海狸公共自习室", "502宿舍"
  icon: string; // e.g. "🏠", "🎮", "💻"
  channels: ChatChannel[];
  endpoint?: string;
  isCustom?: boolean;
}

export interface ChatRoom {
  id: string; // e.g. "main", "dorm502"
  name: string; // e.g. "🏠 自习室大厅", "🎮 宿舍开黑"
  icon?: string;
  isCustom?: boolean;
}

export interface ChatUserInfo {
  uid: string;
  name: string;
  avatar: string;
  activity?: UserActivity;
}

export interface ChatMessage {
  id: string;
  sender: ChatUserInfo;
  type: import("./chat-contract").ChatWireMessageType | "system";
  content: string;
  meta?: {
    // 一起听派对元数据
    partySource?: "siren" | "netease" | "bilibili";
    partyTrackId?: string;
    partyTitle?: string;
    partyArtist?: string;
    partyCover?: string;
    partyUrl?: string;
    partyPosition?: number;
    partyAction?: "play" | "pause" | "seek" | "switch" | "stop" | "transfer_dj";
    partyListenersCount?: number;
    silentPartySync?: boolean;
    partyNewHostUid?: string;
    partyNewHostName?: string;

    // 服务器邀请卡片元数据
    inviteOrigin?: string;
    inviteRoom?: string;
    inviteRoomName?: string;
    inviteServerName?: string;
    inviteServerIcon?: string;
    inviteToken?: string;
    inviteTargetUid?: string;
    inviteCode?: string;

    // 常用网站分享卡片元数据
    linkTitle?: string;
    linkUrl?: string;
    linkIcon?: string;
    linkNote?: string;

    // 图片元数据
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;

    // AI HOT 资讯元数据
    aihotTitle?: string;
    aihotSummary?: string;
    aihotSource?: string;
    aihotCategory?: string;
    aihotUrl?: string;
    aihotDate?: string;

    // YouTube 视频元数据
    youtubeId?: string;
    youtubeTitle?: string;
    youtubeCover?: string;
    youtubeAuthor?: string;
    youtubeViews?: string | number;
    youtubeUrl?: string;
    // 音乐元数据
    musicTitle?: string;
    musicArtist?: string;
    musicUrl?: string;
    musicCover?: string;
    neteaseId?: string | number;
    sirenCid?: string | number;
    rawSong?: any;

    // B站视频元数据
    bvid?: string;
    aid?: string | number;
    videoTitle?: string;
    videoCover?: string;
    upName?: string;
    upMid?: string | number;
    upFace?: string;
    upFans?: string | number;
    playCount?: string | number;
    likeCount?: string | number;
    danmakuCount?: string | number;
    isHot?: boolean;

    // B站电台系列元数据
    seriesId?: string;
    seriesName?: string;
    seriesCount?: number;
    seriesItems?: Array<{
      id?: string;
      aid?: string;
      bvid?: string;
      title: string;
      cover?: string;
      author?: string;
      duration?: string;
    }>;

    // GitHub 仓库元数据
    repoFullName?: string;
    repoName?: string;
    repoOwner?: string;
    repoOwnerAvatar?: string;
    repoDesc?: string;
    repoLanguage?: string;
    repoStars?: number | string;
    repoCategory?: string;
    repoUrl?: string;
    repoUpdatedAt?: string;
  };
  timestamp: number;
}

export const chatModuleState = reactive<{
  visible: boolean;
  shareActivity: boolean;
  error: string;
  connected: boolean;
  connecting: boolean;
  onlineCount: number;
  serverUrl: string;
  currentGroupId: string;
  currentChannelId: string;
  groups: ChatGroup[];
  groupMembers: GroupMember[];
  currentRoomId: string;
  rooms: ChatRoom[];
  friends: ChatFriend[];
  friendRequests: FriendRequest[];
  currentUser: ChatUserInfo;
  messages: ChatMessage[];
  unreadCount: number;
  showProfileEdit: boolean;
  transportMode: "p2p" | "relay";
  p2pPeers: Array<{ uid: string; name: string; avatar: string; rtt?: number }>;
  userActivities: Record<string, UserActivity>;
}>({
  visible: false,
  shareActivity: getStored("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: false,
  connecting: false,
  onlineCount: 1,
  serverUrl: getStored(STORAGE_KEY_SERVER, DEFAULT_SERVER_URL),
  currentGroupId: getStored(STORAGE_KEY_CURRENT_GROUP, "hub_main"),
  currentChannelId: "general",
  groups: getStoredJSON<ChatGroup[]>(STORAGE_KEY_GROUPS, defaultGroups),
  groupMembers: [],
  currentRoomId: getStored(STORAGE_KEY_CURRENT_ROOM, "main"),
  rooms: getStoredJSON<ChatRoom[]>(STORAGE_KEY_ROOMS, defaultRooms),
  friends: getStoredJSON<ChatFriend[]>(STORAGE_KEY_FRIENDS, []),
  friendRequests: getStoredJSON<FriendRequest[]>(STORAGE_KEY_FRIEND_REQUESTS, []),
  currentUser: {
    uid: finalUserId,
    name: finalUserName,
    avatar: finalAvatar
  },
  messages: loadRoomHistory(getStored(STORAGE_KEY_CURRENT_ROOM, "main")).length > 0
    ? loadRoomHistory(getStored(STORAGE_KEY_CURRENT_ROOM, "main"))
    : [
        {
          id: "sys-welcome",
          sender: { uid: "system", name: "系统通知", avatar: "🤖" },
          type: "system",
          content: "欢迎来到聊天室！这里是大家的专属自习室与分享空间，点击顶部「🔗 邀请好友进房间」即可拉同学一起连线～",
          timestamp: Date.now() - 60000
        }
      ],
  unreadCount: 0,
  showProfileEdit: false,
  transportMode: "relay",
  p2pPeers: [],
  userActivities: {}
});

export function setTransportMode(_mode: "p2p" | "relay"): void {
  chatModuleState.transportMode = "relay";
  setStored(STORAGE_KEY_TRANSPORT_MODE, "relay");
}

// A single persisted session record is authoritative; the old keys remain for migration.
restoreSession();

watch(
  () => [topProfileState.avatarUrl, topProfileState.userName],
  ([avatar, name]) => {
    const currentAvatar = chatModuleState.currentUser.avatar;
    if (profileAvatarUrl(avatar) && (!currentAvatar || currentAvatar.length <= 4 || currentAvatar.startsWith("data:") || currentAvatar.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(currentAvatar))) {
      chatModuleState.currentUser.avatar = avatar;
      setStored(STORAGE_KEY_USER_AVATAR, avatar);
    }
    if (name && name !== "哔哩哔哩用户" && name !== "浏览器指纹与环境" && (!chatModuleState.currentUser.name || chatModuleState.currentUser.name.includes("#") || chatModuleState.currentUser.name.startsWith("摸鱼"))) {
      chatModuleState.currentUser.name = name;
      setStored(STORAGE_KEY_USER_NAME, name);
    }
  },
  { immediate: true }
);

// History consumers wait for actual completion, never a startup timer.
export const chatHistoryLoadState = reactive({ scope: "", ready: false });
let historyLoadGeneration = 0;
watch(
  () => historyScope(chatModuleState.currentUser.uid, chatModuleState.serverUrl, chatModuleState.currentRoomId),
  async (scope) => {
    const generation = ++historyLoadGeneration;
    Object.assign(chatHistoryLoadState, { scope, ready: false });
    const { currentRoomId, serverUrl: endpoint, currentUser } = chatModuleState;
    // Import only v2 data with explicit identity and endpoint scope. Never merge ambiguous legacy rooms.
    const cached = loadRoomHistory(currentRoomId, endpoint, currentUser.uid);
    await archiveMessages(scope, cached);
    try {
      const page = await readHistoryPage(scope);
      if (generation !== historyLoadGeneration) return;
      const merged = new Map(page.map(message => [message.id, message]));
      for (const message of chatModuleState.messages) if (message.id !== "sys-welcome") merged.set(message.id, message);
      chatModuleState.messages = [...merged.values()].sort((a, b) => a.timestamp - b.timestamp || a.id.localeCompare(b.id)).slice(-200);
    } catch {
      if (generation === historyLoadGeneration) historyError.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。";
    } finally {
      // On failure the remaining local cache is still a silent snapshot, not a live event.
      if (generation === historyLoadGeneration) chatHistoryLoadState.ready = true;
    }
  },
  { immediate: true }
);

export function saveActivityPreference(enabled: boolean): void {
  chatModuleState.shareActivity = enabled;
  setStored("lw_chat_share_activity", String(enabled));
}

export function saveChatSettings(endpoint: string): void {
  joinChatEndpoint(endpoint);
}

export function saveChatProfile(name: string, avatar: string): void {
  chatModuleState.currentUser.name = name.trim() || chatModuleState.currentUser.name;
  chatModuleState.currentUser.avatar = avatar.trim() || chatModuleState.currentUser.avatar;
  setStored(STORAGE_KEY_USER_NAME, chatModuleState.currentUser.name);
  setStored(STORAGE_KEY_USER_AVATAR, chatModuleState.currentUser.avatar);
}



function historyKey(roomId: string, endpoint: string, uid: string): string {
  return "lw_chat_history_v2_" + JSON.stringify([uid, endpoint, roomId]);
}

export function loadRoomHistory(roomId: string, endpoint = getStored(STORAGE_KEY_SERVER, DEFAULT_SERVER_URL), uid = finalUserId): ChatMessage[] {
  try {
    const raw = localStorage.getItem(historyKey(roomId, endpoint, uid));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(normalizeMessage).filter((m): m is ChatMessage => !!m).slice(-200);
    }
  } catch {}
  return [];
}

export function saveRoomHistory(roomId: string, messages: ChatMessage[]): void {
  const scope = historyScope(chatModuleState.currentUser.uid, chatModuleState.serverUrl, roomId);
  void archiveMessages(scope, messages);
}

export function switchRoom(roomId: string): void {
  joinChatEndpoint(endpointForRoom(chatModuleState.serverUrl, roomId), roomId);
}

type ChatSession = { groupId: string; channelId: string; roomId: string; endpoint: string };
function endpointForRoom(endpoint: string, roomId: string): string {
  if (!endpoint) return "";
  const url = new URL(validateServerUrl(endpoint));
  url.searchParams.set("room", roomId);
  return url.href;
}
function commitSession(next: ChatSession, archive = true, preserveConnection = false): boolean {
  if (archive && historyError.value && pendingHistoryCount.value > 0) {
    chatModuleState.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间";
    return false;
  }
  try {
    next.endpoint = validateServerUrl(next.endpoint);
    // Persist the selection atomically before changing the visible session.
    localStorage.setItem("lw_chat_session_v1", JSON.stringify(next));
  } catch {
    chatModuleState.error = "会话保存失败或地址无效，未切换房间";
    return false;
  }
  const changed = next.endpoint !== chatModuleState.serverUrl || next.roomId !== chatModuleState.currentRoomId;
  if (changed && archive) saveRoomHistory(chatModuleState.currentRoomId, chatModuleState.messages);
  Object.assign(chatModuleState, {
    currentGroupId: next.groupId, currentChannelId: next.channelId,
    currentRoomId: next.roomId, serverUrl: next.endpoint
  });
  if (changed) {
    chatModuleState.messages = loadRoomHistory(next.roomId, next.endpoint, chatModuleState.currentUser.uid);
    chatModuleState.userActivities = {};
    chatModuleState.unreadCount = 0;
    if (!preserveConnection) {
      chatModuleState.connected = false;
      chatModuleState.connecting = false;
    }
    chatModuleState.onlineCount = 0;
  }
  setStored(STORAGE_KEY_SERVER, next.endpoint);
  setStored(STORAGE_KEY_CURRENT_ROOM, next.roomId);
  setStored(STORAGE_KEY_CURRENT_GROUP, next.groupId);
  return true;
}
export function joinChatEndpoint(raw: string, localRoom = "local", preserveConnection = false): boolean {
  let endpoint: string;
  let roomId = localRoom;
  try {
    endpoint = validateServerUrl(raw);
    if (endpoint) {
      const url = new URL(endpoint);
      roomId = url.searchParams.get("room") || "default";
      if (!roomId || roomId.length > 160) throw new Error();
      url.searchParams.set("room", roomId);
      endpoint = url.href;
    }
  } catch { chatModuleState.error = "房间地址无效，未切换会话"; return false; }
  for (const group of chatModuleState.groups) {
    for (const ch of group.channels) {
      const target = ch.endpoint ?? endpointForRoom(group.endpoint ?? "", `${group.id}__${ch.id}`);
      if (target === endpoint && (endpoint || ch.id === roomId)) {
        return commitSession({ groupId: group.id, channelId: ch.id, roomId, endpoint }, true, preserveConnection);
      }
    }
  }
  const id = "joined_" + crypto.randomUUID();
  const group: ChatGroup = {
    id, name: endpoint ? "受邀房间" : "本地房间", icon: "💬", endpoint, isCustom: true,
    channels: [{ id: roomId, name: roomId, icon: "💬", endpoint }]
  };
  chatModuleState.groups.push(group);
  if (!commitSession({ groupId: id, channelId: roomId, roomId, endpoint }, true, preserveConnection)) {
    chatModuleState.groups.pop();
    return false;
  }
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
  return true;
}
function restoreSession(): void {
  // Pin previously unbound groups to the old server, not whichever invitation is opened later.
  for (const group of chatModuleState.groups) group.endpoint ??= chatModuleState.serverUrl;
  const saved = getStoredJSON<ChatSession | null>("lw_chat_session_v1", null);
  if (saved && typeof saved.endpoint === "string" && typeof saved.roomId === "string") {
    const group = chatModuleState.groups.find(g => g.id === saved.groupId);
    const ch = group?.channels.find(c => c.id === saved.channelId);
    if (group && ch) {
      try {
        const endpoint = validateServerUrl(saved.endpoint);
        const roomId = endpoint ? new URL(endpoint).searchParams.get("room") || "default" : saved.roomId;
        ch.endpoint = endpoint;
        Object.assign(chatModuleState, { currentGroupId: group.id, currentChannelId: ch.id, currentRoomId: roomId, serverUrl: endpoint,
          messages: loadRoomHistory(roomId, endpoint, chatModuleState.currentUser.uid) });
        setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
        return;
      } catch { /* Keep old storage available for manual recovery. */ }
    }
  }
  // Migrate old mismatched labels into a visible exact room entry.
  joinChatEndpoint(chatModuleState.serverUrl, chatModuleState.currentRoomId);
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
}

export function createCustomRoom(name: string, icon = "💬"): ChatRoom {
  const cleanName = name.trim() || "未命名房间";
  const id = "room_" + Math.random().toString(36).slice(2, 8);
  const newRoom: ChatRoom = { id, name: cleanName, icon, isCustom: true };
  chatModuleState.rooms.push(newRoom);
  setStored(STORAGE_KEY_ROOMS, JSON.stringify(chatModuleState.rooms));
  switchRoom(id);
  return newRoom;
}

export function deleteCustomRoom(id: string): void {
  chatModuleState.rooms = chatModuleState.rooms.filter(r => r.id !== id);
  setStored(STORAGE_KEY_ROOMS, JSON.stringify(chatModuleState.rooms));
  if (chatModuleState.currentRoomId === id) {
    switchRoom("main");
  }
}

export function addFriend(user: { uid: string; name: string; avatar: string; status?: FriendStatus }): boolean {
  if (!user?.uid || user.uid === chatModuleState.currentUser.uid) return false;
  const existing = chatModuleState.friends.find(f => f.uid === user.uid);
  if (existing) {
    if (user.status && existing.status !== user.status) {
      existing.status = user.status;
      setStored(STORAGE_KEY_FRIENDS, JSON.stringify(chatModuleState.friends));
    }
    return false;
  }
  const newFriend: ChatFriend = {
    uid: user.uid,
    name: user.name || "海狸友",
    avatar: user.avatar || "🦫",
    addedAt: Date.now(),
    status: user.status || "local"
  };
  chatModuleState.friends.push(newFriend);
  setStored(STORAGE_KEY_FRIENDS, JSON.stringify(chatModuleState.friends));
  return true;
}

export function updateFriendStatus(uid: string, status: FriendStatus): void {
  const f = chatModuleState.friends.find(x => x.uid === uid);
  if (f) {
    f.status = status;
    setStored(STORAGE_KEY_FRIENDS, JSON.stringify(chatModuleState.friends));
  }
}

export function recordFriendRequest(req: FriendRequest): void {
  const idx = chatModuleState.friendRequests.findIndex(r => r.id === req.id);
  if (idx >= 0) {
    chatModuleState.friendRequests[idx] = req;
  } else {
    chatModuleState.friendRequests.unshift(req);
    if (chatModuleState.friendRequests.length > 50) chatModuleState.friendRequests.pop();
  }
  setStored(STORAGE_KEY_FRIEND_REQUESTS, JSON.stringify(chatModuleState.friendRequests));
}

export function dismissFriendRequest(requestId: string): void {
  chatModuleState.friendRequests = chatModuleState.friendRequests.filter(r => r.id !== requestId);
  setStored(STORAGE_KEY_FRIEND_REQUESTS, JSON.stringify(chatModuleState.friendRequests));
}

export function removeFriend(uid: string): void {
  chatModuleState.friends = chatModuleState.friends.filter(f => f.uid !== uid);
  setStored(STORAGE_KEY_FRIENDS, JSON.stringify(chatModuleState.friends));
}


export function switchGroupAndChannel(groupId: string, channelId: string): boolean {
  const group = chatModuleState.groups.find(g => g.id === groupId);
  const ch = group?.channels.find(c => c.id === channelId) || group?.channels[0];
  if (!group || !ch) return false;
  const roomId = ch.endpoint !== undefined ? (ch.endpoint ? new URL(ch.endpoint).searchParams.get("room") || "default" : ch.id) : `${group.id}__${ch.id}`;
  const endpoint = ch.endpoint ?? endpointForRoom(group.endpoint ?? "", roomId);
  return commitSession({ groupId: group.id, channelId: ch.id, roomId, endpoint });
}

export function createNewGroup(name: string, icon = "👥"): ChatGroup {
  const cleanName = name.trim() || "新群组";
  const id = "group_" + Math.random().toString(36).slice(2, 8);
  const newGroup: ChatGroup = {
    id,
    name: cleanName,
    icon,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: chatModuleState.serverUrl,
    isCustom: true
  };
  chatModuleState.groups.push(newGroup);
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
  switchGroupAndChannel(id, "general");
  return newGroup;
}

export function deleteGroup(groupId: string): void {
  if (chatModuleState.groups.length <= 1) return; // 至少保留一个群聊
  const remaining = chatModuleState.groups.filter(g => g.id !== groupId);
  if (chatModuleState.currentGroupId === groupId) {
    const nextGroup = remaining[0];
    if (!nextGroup || !switchGroupAndChannel(nextGroup.id, nextGroup.channels[0]?.id || "general")) return;
  }
  chatModuleState.groups = remaining;
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
}

export function createChannelInCurrentGroup(name: string, icon = "💬"): void {
  const group = chatModuleState.groups.find(g => g.id === chatModuleState.currentGroupId);
  if (!group) return;
  const id = "ch_" + Math.random().toString(36).slice(2, 6);
  group.channels.push({ id, name: name.trim() || "新频道", icon });
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
  switchGroupAndChannel(group.id, id);
}


export function renameGroup(groupId: string, newName: string, newIcon?: string): void {
  const grp = chatModuleState.groups.find(g => g.id === groupId);
  if (!grp) return;
  grp.name = newName.trim() || grp.name;
  if (newIcon) grp.icon = newIcon;
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
}

export function renameChannel(groupId: string, channelId: string, newName: string, newIcon?: string): void {
  const grp = chatModuleState.groups.find(g => g.id === groupId);
  if (!grp) return;
  const ch = grp.channels.find(c => c.id === channelId);
  if (!ch) return;
  ch.name = newName.trim() || ch.name;
  if (newIcon) ch.icon = newIcon;
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
}

export function deleteChannel(groupId: string, channelId: string): void {
  const grp = chatModuleState.groups.find(g => g.id === groupId);
  if (!grp || grp.channels.length <= 1) return; // 至少保留一个频道
  const remaining = grp.channels.filter(c => c.id !== channelId);
  if (chatModuleState.currentGroupId === groupId && chatModuleState.currentChannelId === channelId) {
    if (!remaining[0] || !switchGroupAndChannel(groupId, remaining[0].id)) return;
  }
  grp.channels = remaining;
  setStored(STORAGE_KEY_GROUPS, JSON.stringify(chatModuleState.groups));
}
