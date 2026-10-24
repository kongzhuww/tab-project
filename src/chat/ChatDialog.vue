<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import { AppWindowFrame } from "../sdk/ui";
import { images } from "../sdk/images";
import {
  chatModuleState as state,
  joinChatEndpoint,
  saveActivityPreference,
  saveChatProfile,
  switchRoom,
  createCustomRoom,
  deleteCustomRoom,
  addFriend,
  removeFriend,
  updateFriendStatus,
  dismissFriendRequest,
  type FriendRequest,
  type FriendStatus,
  type ChatUserInfo,
  switchGroupAndChannel,
  createNewGroup,
  deleteGroup,
  createChannelInCurrentGroup,
  renameGroup,
  renameChannel,
  deleteChannel,
  setTransportMode,
  type ChatMessage
} from "./chat-state";
import ChatPrivateSetup from "./ChatPrivateSetup.vue";
import SharedRoomNavigation from "./SharedRoomNavigation.vue";
import { profileAvatarUrl } from "./chat-avatar";
import { privateChatState, dmTargetUid, openDirectMessage, sendServerInvitationCard, joinPrivateInvite } from "./private-chat-client";
import { privateChatConfigured, savePrivatePublicConfig } from "./private-chat-config";
import { restartPrivateChat } from "./private-chat-client";
import { chatService } from "./chat.service";
import { roomPeers, rosterError } from "./chat-peer-roster";
import { historyScope } from "./chat-history";
import { deliveryLabel, deliveryState, deliveryError, pauseDelivery } from "./chat-delivery";
const deliveryScope = computed(() => historyScope(state.currentUser.uid, state.serverUrl, state.currentRoomId));
import ChatHistoryTools from "./ChatHistoryTools.vue";
import MeasuredVirtualList from "../core/MeasuredVirtualList.vue";
import { historyBrowsing } from "./chat-history";
import { prepareChatImage } from "./chat-images";
import { safeExternalUrl, safeImageUrl, serverUrl, MAX_CHAT_TEXT } from "./chat-security";

import { homeMusicState, homeMusicController } from "../music/store";
import { musicService } from "../services/music.service";
import { windowManagerController } from "../core/window-manager.store";
import { biliFavoritesController } from "../bilibili/bili-favorites-store";
import { biliMiniPlayerController, biliMiniPlayerState } from "../bilibili/mini-player-store";
import {
  togetherPartyState,
  openDjModal,
  joinParty,
  leaveParty,
  closeParty,
  stopParty,
  isPartyHost,
  joinPartyFromCard
} from "./together-listen.store";
import ChatMusicDjDialog from "./ChatMusicDjDialog.vue";
import ChatStickerPicker from "./ChatStickerPicker.vue";
import { StickersService } from "../services/stickers.service";
import { createStickerBoardController } from "../stickers/sticker-board-store";
import { withStickersWrite } from "../stickers/module-state";
import { notifications } from "../sdk/notifications";

const displayMessages = computed(() => {
  return state.messages.filter((m) => !m.meta?.silentPartySync);
});

function handleJoinPartyFromCard(msg: ChatMessage) {
  void joinPartyFromCard(msg);
}

function handleClosePartyBar() {
  if (isPartyHost.value) {
    void stopParty(true);
  } else {
    leaveParty();
    closeParty();
  }
}

import { detectCurrentActivity } from "./chat-activity";

// Keep invalid image URLs and oversized data strings out of text fallbacks.
function avatarFallback(value: unknown): string {
  return typeof value === "string" && value.length <= 32 && !/[:/]/.test(value) ? value || "👤" : "👤";
}

// 计算当前我的实时动态
const currentMyActivity = computed(() => detectCurrentActivity());

const userCardLiveActivity = computed(() => {
  const u = userProfileCard.value.user;
  if (!u) return null;
  if (u.uid === state.currentUser.uid) {
    return currentMyActivity.value || state.currentUser.activity || detectCurrentActivity();
  }
  const m = privateChatState.members.find(x => x.uid === u.uid);
  return m?.activity || state.userActivities[u.uid] || u.activity;
});

const userCardLiveOnline = computed(() => {
  const u = userProfileCard.value.user;
  if (!u) return false;
  if (u.uid === state.currentUser.uid) return true;
  const m = privateChatState.members.find(x => x.uid === u.uid);
  return m ? m.online : !!u.online;
});

import { topProfileState } from "../profile/store";

// 用户状态卡片（右键头像查看）
const userProfileCard = ref<{
  visible: boolean;
  x: number;
  y: number;
  user: any;
}>({
  visible: false,
  x: 0,
  y: 0,
  user: null
});

function openUserCard(e: MouseEvent, sender: any) {
  e.preventDefault();
  e.stopPropagation();
  const targetUser = { ...sender };
  const member = privateChatState.members.find(m => m.uid === targetUser.uid);
  if (member) {
    if (member.activity) targetUser.activity = member.activity;
    targetUser.online = member.online;
    targetUser.name = member.name || targetUser.name;
    targetUser.avatar = member.avatar || targetUser.avatar;
  }
  if (targetUser.uid === state.currentUser.uid && currentMyActivity.value) {
    targetUser.activity = currentMyActivity.value;
    targetUser.online = true;
  } else if (state.userActivities[targetUser.uid]) {
    targetUser.activity = state.userActivities[targetUser.uid];
  }
  userProfileCard.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    user: targetUser
  };
}

// 仅当 activity 真实类型或标题变化时才更新，避免时间戳微跳动引起的高频重算
watch(
  () => {
    if (!state.shareActivity) return "";
    const act = currentMyActivity.value;
    return act ? `${act.type}:${act.title}` : "";
  },
  () => {
    state.currentUser.activity = currentMyActivity.value;
  },
  { immediate: true }
);

function closeUserCard() {
  userProfileCard.value.visible = false;
  userProfileCard.value.user = null;
}

const imageInputRef = ref<HTMLInputElement | null>(null);

const pendingImage = ref<string | null>(null);

function triggerImageUpload() {
  imageInputRef.value?.click();
}

const imagePreparing = ref(false), imageSending = ref(false), imageError = ref("");
let imageGeneration = 0, imageAlive = true;
watch(deliveryScope, () => { imageGeneration++; pendingImage.value = null; imageError.value = ""; });
watch(() => state.visible, visible => { if (!visible && imagePreparing.value) imageGeneration++; });
async function prepareSelectedImage(file: Blob, send = false) {
  if (imagePreparing.value || imageSending.value) return;
  const generation = ++imageGeneration, scope = deliveryScope.value;
  const current = () => imageAlive && state.visible && !document.hidden &&
    generation === imageGeneration && scope === deliveryScope.value;
  imagePreparing.value = true; imageError.value = "";
  try {
    const data = await prepareChatImage(file, privateChatState.capabilities);
    if (!current()) return;
    if (send) {
      const accepted = await chatService.sendImageMessage(data);
      if (!current()) return;
      if (!accepted) pendingImage.value = data; // Keep a usable draft on unsupported server/storage failure.
      else scrollToBottom();
    } else pendingImage.value = data;
  } catch (error: any) { if (current()) imageError.value = error?.message || "图片处理失败，请换一张图片"; }
  finally { if (imageAlive) imagePreparing.value = false; }
}
async function handleImageSelected(event: Event) {
  const input = event.target as HTMLInputElement, file = input.files?.[0];
  input.value = "";
  if (file) await prepareSelectedImage(file);
}
function removePendingImage() { imageGeneration++; pendingImage.value = null; imageError.value = ""; }
async function handlePaste(event: ClipboardEvent) {
  const data = event.clipboardData;
  if (!data) return;
  const image = Array.from(data.items || []).find(item => item.kind === "file" && item.type.startsWith("image/"))?.getAsFile()
    || Array.from(data.files || []).find(file => file.type.startsWith("image/"));
  if (!image) return; // Ordinary text paste keeps the browser default.
  event.preventDefault(); event.stopPropagation(); // The input and composer both listen for paste.
  await prepareSelectedImage(image);
}
function handleStickerSelected(file: Blob) { void prepareSelectedImage(file, true); }

async function convertImageToLocalDataUrl(url: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({ type: "fetchImageForClipboard", url }, (resp: any) => {
          if (resp?.ok && resp.dataUrl) {
            resolve(resp.dataUrl);
            return;
          }
          resolve(url);
        });
      } else {
        resolve(url);
      }
    } catch {
      resolve(url);
    }
  });
}

async function syncFromBiliProfile() {
  if (topProfileState.userName && topProfileState.userName !== "哔哩哔哩用户") {
    editName.value = topProfileState.userName;
  }
  if (topProfileState.avatarUrl && !topProfileState.avatarUrl.endsWith(".svg")) {
    // Keep a shareable URL; data images cannot be sent as relay query parameters.
    editAvatar.value = profileAvatarUrl(topProfileState.avatarUrl) || editAvatar.value;
  }
  // 同步后直接执行保存并生效，无需用户手动再按一次保存
  saveProfile();
}
const biliMenuState = ref<{
  visible: boolean;
  x: number;
  y: number;
  meta: any;
}>({
  visible: false,
  x: 0,
  y: 0,
  meta: null
});

function openBiliContextMenu(e: MouseEvent, meta: any) {
  e.preventDefault();
  e.stopPropagation();
  biliMenuState.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    meta
  };
}

function closeBiliContextMenu() {
  biliMenuState.value.visible = false;
  biliMenuState.value.meta = null;
}

function handleBiliAction(action: string) {
  const meta = biliMenuState.value.meta;
  closeBiliContextMenu();
  if (!meta) return;

  const bvid = meta.bvid || (meta.aid ? `av${meta.aid}` : "");
  const targetUrl = bvid ? `https://www.bilibili.com/video/${bvid}` : "https://www.bilibili.com";

  if (action === "play") {
    handlePlayBiliVideo(meta);
  } else if (action === "open") {
    window.open(targetUrl, "_blank", "noreferrer");
  } else if (action === "copy-link") {
    void navigator.clipboard.writeText(targetUrl);
  } else if (action === "cache") {
    biliFavoritesController.dispatch("organizer-video-action", {
      id: bvid,
      video: { bvid, aid: meta.aid, title: meta.videoTitle, cover: meta.videoCover, url: targetUrl },
      action: "cache"
    });
  } else if (action === "subtitle") {
    biliFavoritesController.dispatch("organizer-video-action", {
      id: bvid,
      video: { bvid, aid: meta.aid, title: meta.videoTitle, cover: meta.videoCover, url: targetUrl },
      action: "subtitle"
    });
  }
}

function handlePlaySeriesTrack(item: any) {
  if (!item) return;
  void biliMiniPlayerController.openVideo({
    bvid: item.bvid || (item.aid ? `av${item.aid}` : ""),
    aid: item.aid,
    title: item.title,
    cover: item.cover,
    author: item.author
  });
}

const inputText = ref("");
const composerCapabilityReason = computed(() => {
  const caps = privateChatState.capabilities;
  if (caps.status === "unknown" || caps.status === "incompatible") return caps.reason;
  if (pendingImage.value && !caps.messageTypes.includes("image")) return caps.reason || "服务端未启用图片消息";
  if (inputText.value.trim() && !caps.messageTypes.includes("text")) return "此服务端未启用文字消息，草稿已保留。";
  return "";
});
const messagesContainer = ref<HTMLElement | null>(null);

// 编辑资料相关
const editName = ref(state.currentUser.name);
const nicknameSaved = ref(false);
watch(editName, () => { nicknameSaved.value = false; });
function saveNickname() {
  if (!editName.value.trim()) return;
  saveChatProfile(editName.value, state.currentUser.avatar);
  editName.value = state.currentUser.name;
  nextTick(() => { nicknameSaved.value = true; });
}
const editAvatar = ref(state.currentUser.avatar);
const editServer = ref(state.serverUrl);
const editShareActivity = ref(state.shareActivity);
const playingMusicId = ref<string | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

watch(
  () => state.messages.length,
  () => {
    if (!historyBrowsing.value) scrollToBottom();
  }
);

watch(
  () => state.serverUrl,
  (val) => {
    editServer.value = val;
  }
);

watch(
  () => state.visible,
  (val) => {
    if (val) {
      state.unreadCount = 0;
      scrollToBottom();
      editServer.value = state.serverUrl;
      chatService.connect();
    }
  },
  { immediate: true }
);

const showStickerPicker = ref(false);
function toggleStickerPicker() {
  showStickerPicker.value = !showStickerPicker.value;
}

async function handleCollectSticker(imageUrl?: string) {
  if (!imageUrl) return;
  try {
    const collector = new StickersService(createStickerBoardController(), () => state.visible && !document.hidden, withStickersWrite, 0);
    collector.isBoardPaging = false;
    try {
      const result = await withStickersWrite(() => collector.saveImageToFavoritesAny(imageUrl.startsWith("data:image/") ? { dataUrl: imageUrl } : { url: imageUrl }));
      if (!result.ok) throw new Error(result.error);
      notifications.fetch("海狸表情包", "收藏成功", "已加入当前图库，未使用 Native Host。");
    } finally { collector.dispose(); }
  } catch (err) {
    console.warn("收藏表情失败:", err);
    notifications.fetch("海狸表情包", "收藏未完成", "无法读取图片数据，请重试。");
  }
}

function onGlobalWindowClick() {
  closeAllContextMenus();
  showNotifPopover.value = false;
  showStickerPicker.value = false;
}

onMounted(() => {
  scrollToBottom();
  window.addEventListener("click", onGlobalWindowClick);
});

onUnmounted(() => {
  imageAlive = false; imageGeneration++;
  window.removeEventListener("click", onGlobalWindowClick);
});

async function handleSend() {
  if (imagePreparing.value || imageSending.value) return;
  if (composerCapabilityReason.value) { deliveryError.value = composerCapabilityReason.value; return; }
  const scope = deliveryScope.value, generation = imageGeneration;
  const image = pendingImage.value, text = inputText.value;
  if (image) {
    imageSending.value = true;
    try {
      if (!await chatService.sendImageMessage(image)) return;
      if (generation === imageGeneration && pendingImage.value === image) pendingImage.value = null;
    } catch { imageError.value = "图片入队未确认，待发图片已保留，请检查存储"; return; }
    finally { imageSending.value = false; }
  }
  if (scope !== deliveryScope.value || !imageAlive) return;
  if (text.trim()) {
    imageSending.value = true;
    try {
      if (!await chatService.sendTextMessage(text)) return;
      if (imageAlive && scope === deliveryScope.value && generation === imageGeneration && inputText.value === text) inputText.value = "";
    } catch { deliveryError.value = "文字入队未确认，草稿已保留，请检查存储后重试。"; }
    finally { imageSending.value = false; }
  }
  scrollToBottom();
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}

function shareCurrentPlayingMusic() {
  if (!homeMusicState.title) return;
  const currentSong = musicService.getState().currentSong;
  chatService.sendMusicShare({
    musicTitle: homeMusicState.title,
    musicArtist: homeMusicState.artist || "未知歌手",
    musicCover: homeMusicState.coverUrl || "",
    neteaseId: currentSong?.neteaseId,
    sirenCid: currentSong?.cid,
    rawSong: currentSong?.rawSong
  });
}

function formatDomain(raw?: string): string {
  if (!raw) return "";
  try {
    return new URL(raw).hostname;
  } catch {
    return raw;
  }
}

function handleOpenWebsiteCard(meta: any) {
  const url = safeExternalUrl(meta?.linkUrl);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}

async function handlePlayMusicCard(meta: any) {
  if (!meta) return;
  const songId = String(meta.neteaseId || meta.sirenCid || meta.musicTitle || "");
  playingMusicId.value = songId;
  try {
    if (meta.rawSong) {
      await homeMusicController.playNeteaseTrack(meta.rawSong);
    } else if (meta.sirenCid) {
      homeMusicController.playTrack(meta.sirenCid);
    } else if (meta.neteaseId) {
      await homeMusicController.playNeteaseTrack({ id: meta.neteaseId, name: meta.musicTitle, ar: [{ name: meta.musicArtist }] });
    }
  } finally {
    setTimeout(() => {
      if (playingMusicId.value === songId) {
        playingMusicId.value = null;
      }
    }, 1200);
  }
}

function handleOpenExternal(url?: string) {
  const safe = safeExternalUrl(url);
  if (!safe) return;
  window.open(safe, "_blank", "noopener,noreferrer");
}

function isSafeUrl(url?: string): boolean { return !!safeImageUrl(url); }

function handlePreviewImage(url?: string, authorName?: string) {
  const safe = safeImageUrl(url);
  if (!safe) return;
  images.open({
    source: safe,
    title: authorName ? `${authorName} 发送的图片` : "聊天图片"
  });
}

function handlePlayBiliVideo(meta: any) {
  if (!meta) return;
  void biliMiniPlayerController.openVideo({
    bvid: meta.bvid,
    aid: meta.aid,
    title: meta.videoTitle,
    cover: meta.videoCover,
    author: meta.upName,
    authorFace: meta.upFace,
    mid: meta.upMid
  });
}

function handleOpenGithub(meta: any) {
  if (!meta?.repoUrl) return;
  handleOpenExternal(meta.repoUrl);
}

function handleJoinByInvite(url: string) {
  editServer.value = url;
  saveProfile();
}

// 存储水位监控
const storageQuota = ref<{
  usedMB?: string;
  maxGB?: string;
  percent?: string;
  totalMessages?: number;
  totalImages?: number;
  retentionPolicy?: string;
} | null>(null);

async function fetchStorageQuota() {
  if (!state.serverUrl || !state.serverUrl.startsWith("http") && !state.serverUrl.startsWith("ws")) return;
  try {
    const httpUrl = state.serverUrl.replace(/^ws/, "http").split("?")[0].replace(/\/ws$/, "") + "/api/quota";
    const res = await fetch(httpUrl, { cache: "no-store" });
    if (res.ok) {
      storageQuota.value = await res.json();
    }
  } catch {}
}

watch(() => state.showProfileEdit, (val) => {
  if (val) {
    editName.value = state.currentUser.name;
    nicknameSaved.value = false;
    void fetchStorageQuota();
  }
});

const showQuotaDrawer = ref(false);

function toggleQuotaDrawer() {
  showQuotaDrawer.value = !showQuotaDrawer.value;
  if (showQuotaDrawer.value) {
    void fetchStorageQuota();
  }
}

const userCardRelation = computed<"self" | "mutual" | "pending" | "local" | "none">(() => {
  const u = userProfileCard.value.user;
  if (!u?.uid) return "none";
  if (u.uid === state.currentUser.uid) return "self";
  if (privateChatState.friends.includes(u.uid) || state.friends.some(f => f.uid === u.uid)) return "mutual";
  if (state.friendRequests.some(r => (r.toUid === u.uid || r.from.uid === u.uid) && r.status === "pending")) return "pending";
  return "none";
});

function handleAddFriendFromCard() {
  if (!userProfileCard.value.user) return;
  const target = userProfileCard.value.user;
  chatService.sendFriendRequest({
    uid: target.uid,
    name: target.name,
    avatar: target.avatar
  });
  state.error = `✓ 已向【${target.name}】发送好友申请！`;
  setTimeout(() => { if (state.error.startsWith("✓ 已向")) state.error = ""; }, 3000);
}

function startDmFromCard() {
  const u = userProfileCard.value.user;
  if (!u) return;
  closeUserCard();
  openDirectMessage(u.uid);
}

const showNewRoomModal = ref(false);
const newRoomName = ref("");
const newRoomIcon = ref("💬");

function handleCreateRoom() {
  if (!newRoomName.value.trim()) return;
  createCustomRoom(newRoomName.value, newRoomIcon.value || "💬");
  newRoomName.value = "";
  showNewRoomModal.value = false;
  chatService.connect();
}

function handleSwitchRoom(roomId: string) {
  switchRoom(roomId);
  chatService.connect();
}


// 当前选中的大群对象与当前子频道对象
const currentGroup = computed(() => {
  return state.groups.find(g => g.id === state.currentGroupId) || state.groups[0];
});

const currentChannel = computed(() => {
  if (!currentGroup.value) return undefined;
  return currentGroup.value.channels.find(c => c.id === state.currentChannelId) || currentGroup.value.channels[0];
});

function handleSwitchGroup(groupId: string) {
  const g = state.groups.find(item => item.id === groupId);
  if (!g) return;
  const firstChannel = g.channels[0]?.id || "general";
  switchGroupAndChannel(groupId, firstChannel);
  chatService.connect();
}

function handleSwitchChannel(channelId: string) {
  switchGroupAndChannel(state.currentGroupId, channelId);
  chatService.connect();
}

// 模态框：创建新大群
const showNewGroupModal = ref(false);
const newGroupName = ref("");
const newGroupIcon = ref("👥");

function handleCreateGroupConfirm() {
  if (!newGroupName.value.trim()) return;
  createNewGroup(newGroupName.value, newGroupIcon.value || "👥");
  newGroupName.value = "";
  showNewGroupModal.value = false;
  chatService.connect();
}

// 模态框：在当前群添加新子频道
const showNewChannelModal = ref(false);
const newChannelName = ref("");
const newChannelIcon = ref("💬");

function handleCreateChannelConfirm() {
  if (!newChannelName.value.trim()) return;
  createChannelInCurrentGroup(newChannelName.value, newChannelIcon.value || "💬");
  newChannelName.value = "";
  showNewChannelModal.value = false;
  chatService.connect();
}


// 1. 群聊空间右键菜单
const groupContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  group: any;
}>({
  visible: false,
  x: 0,
  y: 0,
  group: null
});

function openGroupContextMenu(e: MouseEvent, grp: any) {
  e.preventDefault();
  e.stopPropagation();
  closeAllContextMenus();
  groupContextMenu.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    group: grp
  };
}

// 2. 频道房间右键菜单
const channelContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  channel: any;
}>({
  visible: false,
  x: 0,
  y: 0,
  channel: null
});

function openChannelContextMenu(e: MouseEvent, ch: any) {
  e.preventDefault();
  e.stopPropagation();
  closeAllContextMenus();
  channelContextMenu.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    channel: ch
  };
}

function closeAllContextMenus() {
  groupContextMenu.value.visible = false;
  channelContextMenu.value.visible = false;
  memberContextMenu.value.visible = false;
  biliMenuState.value.visible = false;
  showNotifPopover.value = false;
  closeUserCard();
}

const memberContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  member: any;
}>({
  visible: false,
  x: 0,
  y: 0,
  member: null
});

function openMemberMenu(e: MouseEvent, m: any) {
  e.preventDefault();
  e.stopPropagation();
  closeAllContextMenus();
  memberContextMenu.value = {
    visible: true,
    x: Math.min(e.clientX, window.innerWidth - 180),
    y: Math.min(e.clientY, window.innerHeight - 200),
    member: m
  };
}

function handleOpenCardFromMenu(m: any) {
  closeAllContextMenus();
  openUserCard({ clientX: memberContextMenu.value.x, clientY: memberContextMenu.value.y, preventDefault() {}, stopPropagation() {} } as any, m);
}

function handleStartDmFromMenu(m: any) {
  closeAllContextMenus();
  openDirectMessage(m.uid);
}

function handleAddFriendFromMenu(m: any) {
  closeAllContextMenus();
  chatService.sendFriendRequest({
    uid: m.uid,
    name: m.name,
    avatar: m.avatar
  });
  state.error = `✓ 已向【${m.name}】发送好友申请！`;
  setTimeout(() => { if (state.error.startsWith("✓ 已向")) state.error = ""; }, 3000);
}

async function handleInviteServer(target: { uid: string; name: string }) {
  closeAllContextMenus();
  try {
    await sendServerInvitationCard(target);
    state.error = `✓ 已向【${target.name}】发送服务器邀请卡片！`;
    setTimeout(() => { if (state.error.startsWith("✓ 已向")) state.error = ""; }, 3000);
  } catch (err: any) {
    state.error = `发送邀请失败：${err.message || err}`;
    setTimeout(() => { if (state.error.startsWith("发送邀请失败")) state.error = ""; }, 4000);
  }
}

async function handleAcceptInvitationCard(meta?: ChatMessage["meta"]) {
  if (!meta?.inviteCode) return;
  try {
    await joinPrivateInvite(meta.inviteCode);
    state.error = `✓ 成功加入聊天室【${meta.inviteServerName || meta.inviteRoom}】！`;
    setTimeout(() => { if (state.error.startsWith("✓ 成功加入")) state.error = ""; }, 4000);
  } catch (err: any) {
    state.error = `加入聊天室失败：${err.message || err}`;
  }
}

function isMutualFriend(uid: string): boolean {
  return privateChatState.friends.includes(uid) || state.friends.some(f => f.uid === uid && f.status === "mutual");
}

function isPendingFriend(uid: string): boolean {
  return state.friendRequests.some(r => (r.toUid === uid || r.from.uid === uid) && r.status === "pending");
}

// 重命名弹窗
const showRenameModal = ref(false);
const renameTargetType = ref<"group" | "channel">("group");
const renameTargetId = ref("");
const renameTitle = ref("");
const renameInputName = ref("");
const renameInputIcon = ref("💬");

function triggerRenameGroup(grp: any) {
  closeAllContextMenus();
  renameTargetType.value = "group";
  renameTargetId.value = grp.id;
  renameTitle.value = `重命名群空间【${grp.name}】`;
  renameInputName.value = grp.name;
  renameInputIcon.value = grp.icon || "👥";
  showRenameModal.value = true;
}

function triggerRenameChannel(ch: any) {
  closeAllContextMenus();
  renameTargetType.value = "channel";
  renameTargetId.value = ch.id;
  renameTitle.value = `重命名频道【${ch.name}】`;
  renameInputName.value = ch.name;
  renameInputIcon.value = ch.icon || "💬";
  showRenameModal.value = true;
}

function handleConfirmRename() {
  if (!renameInputName.value.trim()) return;
  if (renameTargetType.value === "group") {
    renameGroup(renameTargetId.value, renameInputName.value, renameInputIcon.value);
  } else {
    renameChannel(state.currentGroupId, renameTargetId.value, renameInputName.value, renameInputIcon.value);
  }
  showRenameModal.value = false;
}

function handleDeleteChannelFromMenu(channelId: string) {
  closeAllContextMenus();
  deleteChannel(state.currentGroupId, channelId);
  chatService.connect();
}

function handleDeleteGroupFromMenu(groupId: string) {
  closeAllContextMenus();
  deleteGroup(groupId);
  chatService.connect();
}


const inviteCopiedToast = ref(false);

async function copyRoomInviteLink() {
  const base = state.serverUrl;
  if (!base) { state.error = "本地房间没有联机邀请地址，请先配置服务器"; return; }
  try {
    await navigator.clipboard.writeText(base);
    inviteCopiedToast.value = true;
    setTimeout(() => { inviteCopiedToast.value = false; }, 2500);
  } catch {}
}

// Authenticated server membership, not inferred online status.
const displayGroupMembers = computed(() => privateChatState.members);
const failedAvatarUrls = ref(new Set<string>());
function displayedAvatar(user: { uid: string; avatar: string }): string {
  if (user.uid === state.currentUser.uid) return state.currentUser.avatar;
  return privateChatState.members.find(m => m.uid === user.uid)?.avatar || user.avatar;
}
function avatarImage(user: { uid: string; avatar: string }): string {
  const url = safeImageUrl(displayedAvatar(user));
  return failedAvatarUrls.value.has(url) ? "" : url;
}
function avatarFailed(user: { uid: string; avatar: string }): void {
  failedAvatarUrls.value.add(safeImageUrl(displayedAvatar(user)));
}

const showNotifPopover = ref(false);
const currentDmPartner = computed(() => {
  const targetUid = dmTargetUid(privateChatState.channel);
  if (!targetUid) return null;
  const m = privateChatState.members.find(x => x.uid === targetUid);
  const local = state.friends.find(x => x.uid === targetUid);
  return {
    uid: targetUid,
    name: m?.name || local?.name || targetUid,
    avatar: m?.avatar || local?.avatar || "🦫",
    online: m?.online ?? false,
    activity: m?.activity || state.userActivities[targetUid]
  };
});
const searchFriendInput = ref("");
const addFriendFeedback = ref("");

const incomingFriendRequests = computed(() => {
  return state.friendRequests.filter(r => r.toUid === state.currentUser.uid && r.status === "pending");
});

function handleAcceptFriendRequest(req: FriendRequest) {
  chatService.respondFriendRequest(req, true);
}

function handleRejectFriendRequest(req: FriendRequest) {
  chatService.respondFriendRequest(req, false);
  dismissFriendRequest(req.id);
}

const searchFriendCandidates = computed(() => {
  const q = searchFriendInput.value.trim().toLowerCase();
  if (!q || q.startsWith("beaver-contact:")) return [];
  const pool = new Map<string, { uid: string; name: string; avatar: string }>();

  // 1. 房间当前成员
  for (const m of displayGroupMembers.value) {
    if (m.uid && m.uid !== state.currentUser.uid) {
      pool.set(m.uid, { uid: m.uid, name: m.name, avatar: m.avatar });
    }
  }
  // 2. 聊天历史发言人
  for (const msg of state.messages) {
    if (msg.sender && msg.sender.uid && msg.sender.uid !== "system" && msg.sender.uid !== state.currentUser.uid) {
      if (!pool.has(msg.sender.uid)) {
        pool.set(msg.sender.uid, { uid: msg.sender.uid, name: msg.sender.name, avatar: msg.sender.avatar });
      }
    }
  }
  // 3. 好友列表
  for (const f of state.friends) {
    if (f.uid && f.uid !== state.currentUser.uid && !pool.has(f.uid)) {
      pool.set(f.uid, { uid: f.uid, name: f.name, avatar: f.avatar });
    }
  }

  const matches: Array<{
    uid: string;
    name: string;
    avatar: string;
    relation: "mutual" | "pending" | "local" | "none";
  }> = [];

  for (const u of pool.values()) {
    if (u.uid.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)) {
      const friend = state.friends.find(f => f.uid === u.uid);
      let relation: "mutual" | "pending" | "local" | "none" = "none";
      if (friend) {
        relation = friend.status === "mutual" ? "mutual" : friend.status === "pending_outgoing" ? "pending" : "local";
      }
      matches.push({ ...u, relation });
    }
  }
  return matches.slice(0, 5);
});

function handleSendRequestToCandidate(c: { uid: string; name: string; avatar: string }) {
  chatService.sendFriendRequest({ uid: c.uid, name: c.name, avatar: c.avatar });
  addFriendFeedback.value = `✓ 已向【${c.name}】发送好友申请！`;
  setTimeout(() => { addFriendFeedback.value = ""; }, 3000);
}

async function copyMyUid() {
  try {
    await navigator.clipboard.writeText(state.currentUser.uid);
    addFriendFeedback.value = "✓ 我的 UID 已复制！";
    setTimeout(() => { addFriendFeedback.value = ""; }, 2500);
  } catch {}
}

function handleAddFriendDirect() {
  const query = searchFriendInput.value.trim();
  if (!query) return;
  if (query === state.currentUser.uid) { addFriendFeedback.value = "这是当前身份，不能添加自己"; return; }

  // 1. 名片导入
  if (query.startsWith("beaver-contact:")) {
    try {
      if (query.length > 3000000) throw new Error();
      const card = JSON.parse(query.slice("beaver-contact:".length));
      if (card.version !== 1 || typeof card.uid !== "string" || !/^u_[a-zA-Z0-9_-]{1,150}$/.test(card.uid) ||
          typeof card.name !== "string" || !card.name.trim() || card.name.length > 100) throw new Error();
      if (card.uid === state.currentUser.uid) { addFriendFeedback.value = "这是当前身份，不能添加自己"; return; }
      const target = { uid: card.uid, name: card.name, avatar: safeImageUrl(card.avatar) || avatarFallback(card.avatar) };
      addFriend({ ...target, status: "local" });
      if (state.connected) {
        chatService.sendFriendRequest(target);
        addFriendFeedback.value = `✓ 已保存联系人，并向【${target.name}】发送了双向好友申请！`;
      } else {
        addFriendFeedback.value = `✓ 已保存为本地联系人（连接服务器后可发起双向认证）`;
      }
      searchFriendInput.value = "";
      return;
    } catch { addFriendFeedback.value = "名片格式无效，请让对方重新复制名片"; return; }
  }

  // 2. 候选人列表有匹配
  if (searchFriendCandidates.value.length > 0) {
    const top = searchFriendCandidates.value[0];
    handleSendRequestToCandidate(top);
    searchFriendInput.value = "";
    return;
  }

  // 3. 匹配 UID 格式但尚未在本地出现的离线/指定用户
  if (/^u_[a-zA-Z0-9_-]{1,150}$/.test(query)) {
    const target = { uid: query, name: "海狸友", avatar: "🦫" };
    chatService.sendFriendRequest(target);
    addFriendFeedback.value = `✓ 已向 UID: ${query} 发送好友申请！待对方在线确认`;
    searchFriendInput.value = "";
    return;
  }

  addFriendFeedback.value = "本地未找到该用户。可输入准确 UID 或让对方在设置中点击「复制我的名片」发给你。";
}

async function copyMyContactCard() {
  try {
    await navigator.clipboard.writeText("beaver-contact:" + JSON.stringify({
      version: 1, uid: state.currentUser.uid, name: state.currentUser.name, avatar: state.currentUser.avatar
    }));
    addFriendFeedback.value = "✓ 名片已复制，发给对方粘贴即可一键导入并互发申请";
  } catch { addFriendFeedback.value = "复制失败，请检查剪贴板权限"; }
}

function saveProfile() {
  saveChatProfile(editName.value, editAvatar.value);
  state.showProfileEdit = false;
}

function close() {
  windowManagerController.close("chat");
}

function formatMsgTime(ts: number): string {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}
</script>

<template>
  <AppWindowFrame
    window-id="chat"
    title="聊天室"
    icon="💬"
    :visible="state.visible"
    custom-class="chat-workspace-window"
    :default-width="760"
    :default-height="600"
    :min-width="500"
    :min-height="460"
    @close="close"
  >
    <template #header-left>
      <div class="chat-status-pill" :class="{ online: state.connected }">
        <span class="status-dot"></span>
        <span class="status-text">
          {{ state.connected ? "已连接私有服务器" : state.connecting ? "同步中…" : state.error ? "同步失败" : privateChatState.status }}
        </span>
      </div>
    </template>

    <template #header-actions>
      <button
        type="button"
        class="chat-icon-btn"
        :class="{ active: state.showProfileEdit }"
        :title="state.showProfileEdit ? '返回自习室' : '设置我的昵称与房间配置'"
        @click="state.showProfileEdit = !state.showProfileEdit"
      >
        {{ state.showProfileEdit ? '💬' : '⚙️' }}
      </button>
    </template>

    <div class="chat-container">
      <!-- 错误/重连状态栏 -->
      <div v-if="state.error" role="status" class="chat-error-bar">
        <span class="chat-error-text">{{ state.error }}</span>
        <div class="chat-error-actions">
          <button type="button" class="error-action-btn" title="立即重试连接" @click="chatService.resetReconnectAndConnect()">🔄 重试</button>
          <button type="button" class="error-action-btn" title="打开自习室设置" @click="state.showProfileEdit = true">⚙️ 配置</button>
          <button type="button" class="error-close-pill" title="隐藏提示" @click="state.error = ''">✕</button>
        </div>
      </div>
      <div v-if="state.showProfileEdit" class="chat-settings-page">
        <header class="settings-page-header">
          <button type="button" class="modern-back-btn" @click="state.showProfileEdit = false">
            <span class="back-arrow">←</span> 返回聊天
          </button>
          <div class="settings-header-title">
            <span class="settings-icon">⚙️</span>
            <strong>聊天室与网络配置</strong>
          </div>
        </header>
        <div class="settings-page-body">
          <form class="settings-card chat-profile-card" @submit.prevent="saveNickname">
            <div class="profile-card-left">
              <span class="profile-card-icon">👤</span>
              <div class="profile-card-label">
                <strong>我的聊天昵称</strong>
                <small>在群聊与房间中对好友展示的名字</small>
              </div>
            </div>
            <div class="profile-card-right">
              <input
                v-model="editName"
                class="chat-settings-input"
                maxlength="100"
                autocomplete="off"
                placeholder="设置你的聊天昵称"
              />
              <span v-if="nicknameSaved" class="chat-profile-feedback" role="status">✅ 已保存</span>
              <button
                type="submit"
                class="settings-save-btn"
                :disabled="!editName.trim() || editName.trim() === state.currentUser.name"
              >
                保存
              </button>
            </div>
          </form>
          <div class="settings-card setup-card-wrap"><ChatPrivateSetup /></div>
        </div>
      </div>

      <!-- 页面 2：QQ / KOOK 经典三栏自习室架构 -->
      <template v-else>
        <div class="chat-three-column-layout">
          <SharedRoomNavigation @settings="state.showProfileEdit = true">
            <template #members>
            <details open class="sidebar-room-members">
              <summary>房间成员 · {{ displayGroupMembers.length }}</summary>
            <div class="members-scroll-inner">
              <p v-if="!displayGroupMembers.length">{{ !privateChatConfigured ? '尚未配置连接，请点击设置或成员与邀请。' : state.error ? '成员列表尚未同步，请重试' : '正在获取成员列表…' }}</p>
              <div
                v-for="m in displayGroupMembers"
                :key="m.uid"
                class="member-item-row"
                :title="`${m.name}（${m.role === 'owner' ? '群主' : '成员'} · 右键更多操作）`"
                @contextmenu.prevent="openMemberMenu($event, m)"
                @click="openMemberMenu($event, m)"
              >
                <div class="member-avatar-wrap">
                  <img
                    v-if="avatarImage(m)"
                    :src="avatarImage(m)"
                    class="member-avatar-img"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    alt=""
                    @error="avatarFailed(m)"
                  />
                  <span v-else class="member-avatar-text">{{ avatarFallback(displayedAvatar(m)) }}</span>
                </div>
                <div class="member-info-col"><span class="member-name">{{ m.uid === state.currentUser.uid ? state.currentUser.name : m.name }}</span><small>{{ m.role === "owner" ? "群主" : "成员" }}</small></div>
              </div>
            </div>
            </details>
            </template>
          </SharedRoomNavigation>

          <!-- 第 3 栏：当前房间右侧主视图 (消息流 + 工具栏 + 输入框) -->
          <div class="col-main-content">
            <!-- 房间顶栏名牌 -->
            <div class="current-room-bar">
              <div class="room-title-info">
                <template v-if="currentDmPartner">
                  <strong>💬 与【{{ currentDmPartner.name }}】私聊</strong>
                  <small class="shared-room-description">
                    <span class="user-status-dot" :class="{ online: currentDmPartner.online }"></span>
                    {{ currentDmPartner.online ? '当前在线' : '离线' }}
                    <span v-if="currentDmPartner.activity?.title"> · {{ currentDmPartner.activity.title }}</span>
                  </small>
                </template>
                <template v-else>
                  <strong>{{ privateChatState.rooms.find(r => r.id === privateChatState.channel)?.name || '私有聊天室' }}</strong>
                  <small class="shared-room-description">{{ privateChatState.rooms.find(r => r.id === privateChatState.channel)?.description }}</small>
                </template>
              </div>
              <div class="room-bar-right-actions">
                <!-- 好友通知铃铛 -->
                <div class="notif-bell-wrap">
                  <button
                    type="button"
                    class="btn-notif-bell"
                    :class="{ 'has-unread': incomingFriendRequests.length > 0 }"
                    title="好友申请通知"
                    @click.stop="showNotifPopover = !showNotifPopover"
                  >
                    <span class="notif-icon">🔔</span>
                    <span v-if="incomingFriendRequests.length > 0" class="notif-count-badge">{{ incomingFriendRequests.length }}</span>
                  </button>
                  <div v-if="showNotifPopover" class="notif-dropdown-popover" @click.stop>
                    <div class="notif-popover-head">
                      <strong>好友申请 ({{ incomingFriendRequests.length }})</strong>
                      <button type="button" class="notif-close-btn" @click.stop="showNotifPopover = false">✕</button>
                    </div>
                    <div class="notif-popover-body">
                      <div v-for="req in incomingFriendRequests" :key="req.id" class="notif-req-card">
                        <div class="notif-user-row">
                          <span class="notif-avatar">{{ req.from.avatar || '🦫' }}</span>
                          <div class="notif-info">
                            <span class="notif-name">{{ req.from.name }}</span>
                            <small class="notif-uid">{{ req.from.uid }}</small>
                          </div>
                        </div>
                        <div class="notif-action-row">
                          <button type="button" class="notif-btn-accept" @click.stop="handleAcceptFriendRequest(req)">✓ 同意</button>
                          <button type="button" class="notif-btn-reject" @click.stop="handleRejectFriendRequest(req)">忽略</button>
                        </div>
                      </div>
                      <p v-if="!incomingFriendRequests.length" class="notif-empty">暂无待处理的好友申请</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn-invite-room"
                  title="在设置中管理独立成员邀请"
                  @click="state.showProfileEdit = true"
                >
                  <span class="invite-icon">🔗</span>
                  <span>成员与邀请</span>
                </button>
              </div>
            </div>

            <!-- QQ 风格：一起听派对顶栏 (当房间有人开启一起听时常驻呈现) -->
            <div v-if="togetherPartyState.isActive && togetherPartyState.track" class="party-top-bar">
              <div class="party-bar-info" @click="openDjModal">
                <span class="party-disc-icon" :class="{ spinning: togetherPartyState.isPlaying }">💿</span>
                <div class="party-bar-text">
                  <strong>一起听：{{ togetherPartyState.track.title }}</strong>
                  <small>【{{ togetherPartyState.hostName }}】正在点播 · {{ togetherPartyState.listenersCount }} 人收听</small>
                </div>
              </div>
              <div class="party-bar-actions">
                <button
                  v-if="!togetherPartyState.isJoined"
                  type="button"
                  class="party-btn-join"
                  @click="joinParty"
                >
                  🎧 加入一起听
                </button>
                <button
                  v-else
                  type="button"
                  class="party-btn-leave"
                  @click="leaveParty"
                >
                  退出
                </button>
                <button
                  type="button"
                  class="party-btn-dj"
                  title="打开 DJ 播控台"
                  @click="openDjModal"
                >
                  🎛️ 调音台
                </button>
                <button
                  type="button"
                  class="party-btn-close"
                  title="关闭/结束一起听栏"
                  @click="handleClosePartyBar"
                >
                  ✕
                </button>
              </div>
            </div>

            <!-- 消息列表流 -->
            <div ref="messagesContainer" class="chat-messages-area" :aria-busy="privateChatState.syncing">
        <MeasuredVirtualList :items="displayMessages" :scroll-host="messagesContainer" :active="state.visible"
          :reset-key="deliveryScope" :estimate="112" :gap="12">
          <template #default="{ item: msg }">
        <div
          :key="msg.id"
          class="chat-msg-row"
          :class="{
            'is-me': msg.sender.uid === state.currentUser.uid,
            'is-sys': msg.type === 'system'
          }"
        >
          <!-- 系统消息 -->
          <div v-if="msg.type === 'system'" class="chat-sys-banner">
            <span>{{ msg.content }}</span>
          </div>

          <!-- 普通消息 / 音乐分享 -->
          <template v-else>
            <div
              class="chat-avatar clickable"
              :title="`${msg.sender.name} (右键查看状态)`"
              @contextmenu="openUserCard($event, msg.sender)"
            >
              <img
                v-if="avatarImage(msg.sender)"
                :src="avatarImage(msg.sender)"
                class="chat-avatar-img"
                referrerpolicy="no-referrer"
                loading="lazy"
                alt=""
                @error="avatarFailed(msg.sender)"
              />
              <span v-else>{{ avatarFallback(displayedAvatar(msg.sender)) }}</span>
            </div>
            <div class="chat-msg-content-wrap">
              <div class="chat-msg-meta">
                <span class="chat-sender-name">{{ msg.sender.uid === state.currentUser.uid ? state.currentUser.name : msg.sender.name }}</span>
                <span class="chat-msg-time">{{ formatMsgTime(msg.timestamp) }}</span>
                <details v-if="msg.sender.uid === state.currentUser.uid" class="chat-message-actions" name="chat-message-actions" :key="deliveryScope + msg.id">
                  <summary aria-label="消息详情与操作" title="消息详情与操作">⋯</summary>
                  <div class="chat-message-actions-content">
                    <span>{{ deliveryLabel(deliveryScope, msg.id) }}</span>
                    <button type="button" class="chat-tool-btn" title="重新加入本房间待发队列，服务器按消息 ID 去重" @click="chatService.retryMessage(msg)">重试发送</button>
                    <button type="button" class="chat-tool-btn" title="停止自动补发，不撤回已发出的消息" @click="pauseDelivery(deliveryScope, msg.id)">暂停补发</button>
                  </div>
                </details>
              </div>
              <div class="chat-msg-delivery-box">
                <span
                  v-if="msg.sender.uid === state.currentUser.uid && ['sending', 'failed'].includes(deliveryState(deliveryScope, msg.id))"
                  class="chat-delivery-indicator"
                  :class="deliveryState(deliveryScope, msg.id) === 'failed' ? 'is-failed' : 'is-sending'"
                  role="status"
                  tabindex="0"
                  :title="deliveryLabel(deliveryScope, msg.id)"
                  :aria-label="deliveryLabel(deliveryScope, msg.id)"
                >{{ deliveryState(deliveryScope, msg.id) === 'failed' ? '!' : '' }}</span>
              <div class="chat-msg-bubble" :class="{ 'is-share-card': ['music', 'bilibili', 'bili_series', 'github', 'aihot', 'youtube', 'website', 'server_invite', 'music_party'].includes(msg.type) }">
                <!-- 1. 音乐卡片 -->
                <div
                  v-if="msg.type === 'music'"
                  class="chat-music-card clickable"
                  title="点击立即在我的音乐播放器中播放这首歌"
                  @click="handlePlayMusicCard(msg.meta)"
                >
                  <img referrerpolicy="no-referrer" v-if="msg.meta?.musicCover" :src="safeImageUrl(msg.meta.musicCover)" class="music-cover-img" alt="" />
                  <span v-else class="music-icon">🎵</span>
                  <div class="music-info">
                    <strong class="music-title">{{ msg.meta?.musicTitle }}</strong>
                    <small class="music-artist">{{ msg.meta?.musicArtist }}</small>
                  </div>
                  <button
                    type="button"
                    class="music-play-btn"
                    :class="{ loading: playingMusicId === String(msg.meta?.neteaseId || msg.meta?.sirenCid || msg.meta?.musicTitle || '') }"
                    title="点击播放"
                  >
                    <template v-if="playingMusicId === String(msg.meta?.neteaseId || msg.meta?.sirenCid || msg.meta?.musicTitle || '')">⏳</template>
                    <template v-else>▶</template>
                  </button>
                </div>

                <!-- 2. B站视频卡片 (完全还原截图样式 + 支持右键菜单) -->
                <div
                  v-else-if="msg.type === 'bilibili'"
                  class="chat-bili-card clickable"
                  title="左键小窗播放，右键打开操作菜单"
                  @click="handlePlayBiliVideo(msg.meta)"
                  @contextmenu="openBiliContextMenu($event, msg.meta)"
                >
                  <div class="bili-card-header">
                    <span class="bili-badge-pink">📺 哔哩哔哩</span>
                  </div>
                  <div class="bili-card-title">{{ msg.meta?.videoTitle }}</div>
                  <div class="bili-card-up-row">
                    <img referrerpolicy="no-referrer" v-if="msg.meta?.upFace" :src="safeImageUrl(msg.meta.upFace)" class="bili-up-avatar" alt="" />
                    <span class="bili-up-name">{{ msg.meta?.upName }}</span>
                    <span class="bili-up-tag">UP主</span>
                    <span v-if="msg.meta?.upFans" class="bili-up-fans">{{ msg.meta?.upFans }}粉丝</span>
                  </div>
                  <div class="bili-card-cover-wrap">
                    <img referrerpolicy="no-referrer" :src="safeImageUrl(msg.meta?.videoCover)" class="bili-cover-img" alt="" loading="lazy" />
                    <span v-if="msg.meta?.isHot" class="bili-hot-tag">B站热门</span>
                    <div class="bili-play-overlay">
                      <span class="bili-play-icon">▶</span>
                    </div>
                    <div class="bili-cover-bottom">
                      <span>{{ msg.meta?.playCount ? `${msg.meta.playCount}播放` : '近期热门' }}</span>
                      <span v-if="msg.meta?.likeCount">{{ msg.meta.likeCount }}点赞</span>
                      <span v-if="msg.meta?.danmakuCount">{{ msg.meta.danmakuCount }}弹幕</span>
                    </div>
                  </div>
                </div>

                <!-- 2.5 B站电台系列卡片 (可滚动展示歌曲列表，底部显示总数) -->
                <div
                  v-else-if="msg.type === 'bili_series'"
                  class="chat-series-card"
                >
                  <div class="series-card-head">
                    <div class="series-title-row">
                      <span class="series-icon">📻</span>
                      <strong class="series-name">{{ msg.meta?.seriesName }}</strong>
                    </div>
                  </div>
                  <div class="series-items-scroll-box">
                    <div
                      v-for="(item, idx) in msg.meta?.seriesItems || []"
                      :key="item.bvid || idx"
                      class="series-item-row"
                      :title="`点击立即播放：${item.title}`"
                      @click="handlePlaySeriesTrack(item)"
                    >
                      <span class="series-item-num">{{ idx + 1 }}</span>
                      <img referrerpolicy="no-referrer" v-if="item.cover" :src="safeImageUrl(item.cover)" class="series-item-thumb" alt="" loading="lazy" />
                      <div class="series-item-title">{{ item.title }}</div>
                    </div>
                  </div>
                  <div class="series-card-footer">
                    <span>共 {{ msg.meta?.seriesCount || (msg.meta?.seriesItems?.length || 0) }} 首音乐 · 点击任意曲目播放</span>
                  </div>
                </div>

                <!-- 3. GitHub 仓库卡片 (完全还原截图样式) -->
                <div
                  v-else-if="msg.type === 'github'"
                  class="chat-github-card clickable"
                  title="点击在新标签页打开此仓库"
                  @click="handleOpenGithub(msg.meta)"
                >
                  <div class="gh-card-top-row">
                    <img referrerpolicy="no-referrer" v-if="msg.meta?.repoOwnerAvatar" :src="safeImageUrl(msg.meta.repoOwnerAvatar)" class="gh-owner-avatar" alt="" />
                    <span v-else class="gh-owner-icon">🐙</span>
                    <span class="gh-repo-fullname">
                      <span class="gh-owner-name">{{ msg.meta?.repoOwner }}</span>/<strong class="gh-repo-name">{{ msg.meta?.repoName }}</strong>
                    </span>
                    <span class="gh-more-dot">⋮</span>
                  </div>
                  <div class="gh-card-tags">
                    <span class="gh-tag-pill">+ {{ msg.meta?.repoCategory || '未分类' }}</span>
                  </div>
                  <div class="gh-card-desc">{{ msg.meta?.repoDesc }}</div>
                  <div class="gh-card-footer">
                    <span class="gh-star-stat">★ {{ msg.meta?.repoStars || 0 }}</span>
                    <span class="gh-lang-stat">{{ msg.meta?.repoLanguage || 'Plain Text' }}</span>
                    <span class="gh-date-stat">更新 {{ msg.meta?.repoUpdatedAt }}</span>
                  </div>
                </div>

                <!-- 3.5 AI HOT 资讯卡片 -->
                <div
                  v-else-if="msg.type === 'aihot'"
                  class="chat-aihot-card clickable"
                  title="点击打开 AI 资讯"
                  @click="handleOpenExternal(msg.meta?.aihotUrl)"
                >
                  <div class="aihot-card-badge">🔥 {{ msg.meta?.aihotCategory || "AI 资讯" }}</div>
                  <strong class="aihot-card-title">{{ msg.meta?.aihotTitle }}</strong>
                  <p v-if="msg.meta?.aihotSummary" class="aihot-card-summary">{{ msg.meta?.aihotSummary }}</p>
                  <div class="aihot-card-footer">
                    <span>{{ msg.meta?.aihotSource }}</span>
                    <span>{{ msg.meta?.aihotDate }}</span>
                  </div>
                </div>

                <!-- 3.6 YouTube 视频卡片 -->
                <div
                  v-else-if="msg.type === 'youtube'"
                  class="chat-youtube-card clickable"
                  title="点击在 YouTube 观看"
                  @click="handleOpenExternal(msg.meta?.youtubeUrl)"
                >
                  <div class="yt-thumb-wrap">
                    <img referrerpolicy="no-referrer" v-if="msg.meta?.youtubeCover" :src="safeImageUrl(msg.meta.youtubeCover)" class="yt-thumb" alt="" loading="lazy" />
                    <span class="yt-badge">YouTube</span>
                  </div>
                  <strong class="yt-title">{{ msg.meta?.youtubeTitle }}</strong>
                  <div class="yt-author">{{ msg.meta?.youtubeAuthor }}</div>
                </div>

                <!-- 3.7 图片消息 -->
                <div
                  v-else-if="msg.type === 'image'"
                  class="chat-image-bubble"
                >
                  <img referrerpolicy="no-referrer"
                    v-if="isSafeUrl(msg.meta?.imageUrl)"
                    :src="safeImageUrl(msg.meta?.imageUrl)"
                    class="chat-sent-image"
                    alt="发送的图片"
                    loading="lazy"
                    title="点击查看大图"
                    @click="handlePreviewImage(msg.meta?.imageUrl, msg.sender?.name)"
                  />
                  <button
                    v-if="isSafeUrl(msg.meta?.imageUrl)"
                    type="button"
                    class="chat-collect-sticker-btn"
                    title="收藏到我的表情包"
                    @click.stop="handleCollectSticker(msg.meta?.imageUrl)"
                  >
                    ⭐ 存为表情
                  </button>
                  <div v-else class="chat-unsafe-tip">⚠️ 非法或不安全的图片协议</div>
                </div>

                <!-- 3.8 常用网站卡片 (点击跳转) -->
                <div
                  v-else-if="msg.type === 'website'"
                  class="chat-website-card clickable"
                  :title="`点击在新标签页打开：${msg.meta?.linkUrl || ''}`"
                  @click="handleOpenWebsiteCard(msg.meta)"
                >
                  <div class="website-card-icon-wrap">
                    <img
                      v-if="safeImageUrl(msg.meta?.linkIcon)"
                      :src="safeImageUrl(msg.meta?.linkIcon)"
                      class="website-card-icon-img"
                      alt=""
                      loading="lazy"
                      referrerpolicy="no-referrer"
                      @error="($event.target as HTMLElement).style.display = 'none'"
                    />
                    <span v-else class="website-card-icon-fallback">🌐</span>
                  </div>
                  <div class="website-card-info">
                    <strong class="website-card-title">{{ msg.meta?.linkTitle || '常用网站' }}</strong>
                    <span class="website-card-domain">{{ formatDomain(msg.meta?.linkUrl) }}</span>
                    <small v-if="msg.meta?.linkNote" class="website-card-note">{{ msg.meta?.linkNote }}</small>
                  </div>
                  <span class="website-card-arrow" aria-hidden="true">↗</span>
                </div>

                <!-- 3.9 服务器邀请卡片 (精确契合用户截图3设计，点击直连加入) -->
                <div
                  v-else-if="msg.type === 'server_invite'"
                  class="chat-server-invite-card clickable"
                  :title="`点击直接加入聊天室：${msg.meta?.inviteServerName || msg.meta?.inviteRoom || ''}`"
                  @click="handleAcceptInvitationCard(msg.meta)"
                >
                  <div class="server-invite-icon-wrap">
                    <span class="server-invite-icon">{{ msg.meta?.inviteServerIcon || '🏠' }}</span>
                  </div>
                  <div class="server-invite-info">
                    <div class="server-invite-head">
                      <strong class="server-invite-title">邀请加入：{{ msg.meta?.inviteServerName || msg.meta?.inviteRoom }}</strong>
                      <span class="server-invite-arrow" title="立即加入">↗</span>
                    </div>
                    <span class="server-invite-origin">{{ msg.meta?.inviteOrigin || '海狸私有服务器' }}</span>
                    <small class="server-invite-hint">点击直接加入此聊天室</small>
                  </div>
                </div>

                <!-- 3.10 一起听派对卡片 -->
                <div
                  v-else-if="msg.type === 'music_party'"
                  class="chat-party-card"
                >
                  <div class="party-card-head">
                    <span class="party-card-badge">🎧 音乐派对 · 一起听</span>
                    <span class="party-source-label">{{ msg.meta?.partySource === 'bilibili' ? '📺 B站音频' : msg.meta?.partySource === 'netease' ? '🎵 网易云' : '💿 塞壬唱片' }}</span>
                  </div>
                  <div class="party-card-main">
                    <div class="party-cover-wrap">
                      <img
                        v-if="safeImageUrl(msg.meta?.partyCover)"
                        :src="safeImageUrl(msg.meta?.partyCover)"
                        class="party-cover-img"
                        referrerpolicy="no-referrer"
                        alt=""
                        @error="($event.target as HTMLElement).style.display = 'none'"
                      />
                      <span v-else class="party-cover-fallback">💿</span>
                      <span class="party-play-indicator">▶</span>
                    </div>
                    <div class="party-meta-info">
                      <strong class="party-meta-title">{{ msg.meta?.partyTitle }}</strong>
                      <span class="party-meta-artist">{{ msg.meta?.partyArtist }}</span>
                      <small class="party-meta-host">由【{{ msg.sender.name }}】发起的同频收听</small>
                    </div>
                  </div>
                  <div class="party-card-foot">
                    <button
                      v-if="!togetherPartyState.isJoined || togetherPartyState.track?.trackId !== msg.meta?.partyTrackId"
                      type="button"
                      class="party-join-btn"
                      @click="handleJoinPartyFromCard(msg)"
                    >
                      🎧 加入一起听
                    </button>
                    <span v-else class="party-joined-badge">✓ 正在同步收听中</span>
                  </div>
                </div>

                <!-- 4. 普通文本消息 -->
                <div v-else class="chat-msg-text">
                  {{ msg.content }}
                </div>
              </div>
              </div>
            </div>
          </template>
        </div>
          </template>
        </MeasuredVirtualList>
      </div>

      <!-- 底部输入框与工具栏 -->
      <div class="chat-input-bar" @paste="handlePaste">
        <p v-if="deliveryError" role="alert">{{ deliveryError }}</p>
        <p v-if="imageError" class="chat-image-error" role="alert">{{ imageError }}</p>
        <p v-if="imagePreparing" class="chat-image-processing" role="status">正在处理图片…</p>
        <div class="chat-tools-strip">
          <ChatHistoryTools :container="messagesContainer" />
          <button
            type="button"
            class="chat-tool-btn"
            :title="privateChatState.imageMessagesSupported ? '发送图片（支持截图直接 Ctrl+V 粘贴）' : privateChatState.capabilities.reason"
            :disabled="imagePreparing || imageSending || !privateChatState.imageMessagesSupported"
            @click="triggerImageUpload"
          >
            🖼️ 图片
          </button>
          <input
            ref="imageInputRef"
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp,image/bmp"
            style="display: none;"
            @change="handleImageSelected"
          />
          <button
            type="button"
            class="chat-tool-btn dj-tool-btn"
            title="打开海狸 DJ 音乐播控台（多音源一起听）"
            @click="openDjModal"
          >
            🎛️ 一起听 / DJ
          </button>
          <div class="chat-sticker-btn-anchor">
            <button
              type="button"
              class="chat-tool-btn sticker-tool-btn"
              :class="{ 'is-active': showStickerPicker }"
              :title="privateChatState.imageMessagesSupported ? '打开表情包面板，点击即可直接发送' : privateChatState.capabilities.reason"
              :disabled="!privateChatState.imageMessagesSupported"
              @click.stop="toggleStickerPicker"
            >
              😜 表情包
            </button>
            <ChatStickerPicker
              v-if="showStickerPicker"
              :active="state.visible && privateChatState.imageMessagesSupported && !imagePreparing && !imageSending"
              @close="showStickerPicker = false"
              @select="handleStickerSelected"
            />
          </div>
          <button
            v-if="homeMusicState.playing && homeMusicState.title"
            type="button"
            class="chat-tool-btn"
            title="分享正在播放的歌曲"
            @click="shareCurrentPlayingMusic"
          >
            🎵 分享正在听的歌
          </button>
        </div>
        <!-- 待发送图片预览条 -->
        <div v-if="pendingImage" class="chat-pending-image-bar">
          <div class="pending-img-wrap">
            <img
              referrerpolicy="no-referrer"
              :src="safeImageUrl(pendingImage)"
              class="pending-preview-thumb"
              alt="待发预览"
              title="点击查看大图"
              style="cursor: pointer;"
              @click="handlePreviewImage(pendingImage, '待发图片')"
            />
            <button type="button" class="modal-close-pill pending-del-pill" title="撤销该图片" @click="removePendingImage">✕</button>
          </div>
          <span class="pending-tip">已就绪 · 点击发送或按 Enter 发出</span>
        </div>

        <div class="chat-textarea-wrap">
          <textarea
            v-model="inputText"
            :maxlength="MAX_CHAT_TEXT"
            class="chat-textarea"
            placeholder="聊点什么…（支持直接按 Ctrl+V 粘贴截图）"
            aria-label="消息内容，Enter 发送，Shift+Enter 换行"
            title="Enter 发送 · Shift+Enter 换行 · 支持 Ctrl+V 粘贴图片"
            rows="2"
            @keydown="handleKeyDown"
            @paste="handlePaste"
          ></textarea>
          <button
            type="button"
            class="chat-send-btn"
            :disabled="imagePreparing || imageSending || !!composerCapabilityReason || (!inputText.trim() && !pendingImage)"
            :title="composerCapabilityReason || '发送消息'"
            @click="handleSend"
          >
            发送
          </button>
        </div>
      </div> <!-- /chat-input-bar -->
      </div> <!-- /col-main-content -->
      </div> <!-- /chat-three-column-layout -->
      </template>
      <!-- 用户状态详情卡片（右键头像查看） -->
      <Teleport to="body">
        <div
          v-if="userProfileCard.visible && userProfileCard.user"
          class="chat-user-card-modal"
          :style="{ left: `${Math.min(userProfileCard.x, 600)}px`, top: `${Math.min(userProfileCard.y, 400)}px` }"
          @click.stop
        >
          <div class="user-card-head">
            <div class="user-card-avatar-wrap">
              <img
                v-if="safeImageUrl(userProfileCard.user.avatar)"
                :src="safeImageUrl(userProfileCard.user.avatar)"
                class="user-card-avatar-img"
                referrerpolicy="no-referrer"
                alt=""
              />
              <span v-else class="user-card-avatar-emoji">{{ avatarFallback(userProfileCard.user.avatar) }}</span>
            </div>
            <div class="user-card-meta">
              <strong class="user-card-name">{{ userProfileCard.user.name }}</strong>
              <small class="user-card-uid">UID: {{ userProfileCard.user.uid }}</small>
            </div>
            <button type="button" class="modal-close-pill" title="关闭名片" @click="closeUserCard">✕</button>
          </div>
          <div class="user-card-body">
            <div class="user-status-row">
              <span class="user-status-dot" :class="{ online: userCardLiveOnline }"></span>
              <span class="user-status-text">{{ userCardLiveOnline ? '当前在线' : '离线' }}</span>
            </div>
            <!-- 加好友按钮 -->
            <div v-if="userProfileCard.user?.uid !== state.currentUser.uid" class="user-card-friend-action">
              <button
                v-if="userCardRelation === 'mutual'"
                type="button"
                class="card-add-friend-btn active-dm"
                @click="startDmFromCard"
              >
                💬 发送私聊
              </button>
              <button
                v-else-if="userCardRelation === 'pending'"
                type="button"
                class="card-add-friend-btn"
                disabled
              >
                ⏳ 已发申请 · 等待对方确认
              </button>
              <button
                v-else
                type="button"
                class="card-add-friend-btn"
                @click="handleAddFriendFromCard"
              >
                ➕ 添加为好友
              </button>
              <button
                type="button"
                class="card-add-friend-btn invite-action-btn"
                @click="handleInviteServer(userProfileCard.user)"
              >
                📨 邀请加入服务器卡片
              </button>
            </div>
            <div class="user-activity-section">
              <div class="activity-label">当前动态 (实时同步)</div>
              <div class="activity-content-box">
                <template v-if="userCardLiveActivity?.title">
                  <span class="act-icon">
                    {{ userCardLiveActivity.type === 'bilibili' ? '📺' : userCardLiveActivity.type === 'github' ? '🐙' : userCardLiveActivity.type === 'aihot' ? '🔥' : userCardLiveActivity.type === 'youtube' ? '▶️' : '🎵' }}
                  </span>
                  <div class="act-details">
                    <strong class="act-title">{{ userCardLiveActivity.title }}</strong>
                    <small v-if="userCardLiveActivity.type === 'bilibili'">正在 B站 观看视频</small>
                    <small v-else-if="userCardLiveActivity.type === 'github'">正在研读代码仓库</small>
                    <small v-else-if="userCardLiveActivity.type === 'aihot'">正在阅读 AI 热点</small>
                    <small v-else-if="userCardLiveActivity.type === 'youtube'">正在观看 YouTube</small>
                    <small v-else-if="userCardLiveActivity.type === 'music'">正在聆听音乐</small>
                    <small v-else>正在新标签页活动</small>
                  </div>
                </template>
                <template v-else>
                  <span class="act-icon">☕</span>
                  <span class="act-idle">正在新标签页摸鱼发呆中…</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- B站视频卡片专属右键菜单 -->
      <Teleport to="body">
        <div
          v-if="biliMenuState.visible && biliMenuState.meta"
          class="chat-context-menu"
          :style="{ left: `${biliMenuState.x}px`, top: `${biliMenuState.y}px` }"
          @click.stop
        >
          <div class="chat-context-header" :title="biliMenuState.meta.videoTitle">
            {{ biliMenuState.meta.videoTitle }}
          </div>
          <button type="button" class="chat-context-item" @click="handleBiliAction('play')">
            <span class="chat-context-icon">▶</span> 小窗播放视频
          </button>
          <div class="chat-context-divider"></div>
          <button type="button" class="chat-context-item" @click="handleBiliAction('open')">
            <span class="chat-context-icon">↗</span> 跳转到 B站
          </button>
          <button type="button" class="chat-context-item" @click="handleBiliAction('copy-link')">
            <span class="chat-context-icon">📋</span> 复制链接
          </button>
          <button type="button" class="chat-context-item" @click="handleBiliAction('cache')">
            <span class="chat-context-icon">💾</span> 缓存视频
          </button>
          <div class="chat-context-divider"></div>
          <button type="button" class="chat-context-item" @click="handleBiliAction('subtitle')">
            <span class="chat-context-icon">▤</span> 字幕转文本
          </button>
        </div>
      </Teleport>

      <!-- 房间成员专属右键菜单 -->
      <Teleport to="body">
        <div
          v-if="memberContextMenu.visible && memberContextMenu.member"
          class="chat-context-menu"
          :style="{ left: `${memberContextMenu.x}px`, top: `${memberContextMenu.y}px` }"
          @click.stop
        >
          <div class="chat-context-header">
            <strong>{{ memberContextMenu.member.name }}</strong>
            <small style="margin-left: 6px; opacity: 0.7;">{{ memberContextMenu.member.role === 'owner' ? '群主' : '成员' }}</small>
          </div>
          <button type="button" class="chat-context-item" @click="handleOpenCardFromMenu(memberContextMenu.member)">
            <span class="chat-context-icon">👤</span> 查看详细名片
          </button>
          <template v-if="memberContextMenu.member.uid !== state.currentUser.uid">
            <div class="chat-context-divider"></div>
            <button
              v-if="isMutualFriend(memberContextMenu.member.uid)"
              type="button"
              class="chat-context-item"
              @click="handleStartDmFromMenu(memberContextMenu.member)"
            >
              <span class="chat-context-icon">💬</span> 发送私聊
            </button>
            <button
              v-else-if="isPendingFriend(memberContextMenu.member.uid)"
              type="button"
              class="chat-context-item"
              disabled
            >
              <span class="chat-context-icon">⏳</span> 好友申请处理中
            </button>
            <button
              v-else
              type="button"
              class="chat-context-item"
              @click="handleAddFriendFromMenu(memberContextMenu.member)"
            >
              <span class="chat-context-icon">➕</span> 添加为好友
            </button>
            <button
              v-if="state.connected && privateChatState.role === 'owner'"
              type="button"
              class="chat-context-item"
              @click="handleInviteServer(memberContextMenu.member)"
            >
              <span class="chat-context-icon">📨</span> 邀请加入服务器卡片
            </button>
          </template>
        </div>
      </Teleport>

      <!-- 塞壬/网易云/B站 原创 DJ 播控台 -->
      <ChatMusicDjDialog v-if="togetherPartyState.djModalOpen" />

      <!-- 非模态浮层 1：创建新大群空间 -->
      <div v-if="showNewGroupModal" class="nonmodal-room-popover" @click.stop>
        <div class="create-room-modal-card">
          <div class="create-room-title">
            <strong>➕ 创建新大群 / 空间</strong>
            <button type="button" class="modal-close-pill" title="关闭" @click="showNewGroupModal = false">✕</button>
          </div>
          <div class="create-room-form">
            <label>群聊空间名称</label>
            <input v-model="newGroupName" class="chat-input" placeholder="例如：计科3班摸鱼基地" maxlength="20" />
            <label>群聊图标 Emoji</label>
            <div class="icon-selector-row">
              <button v-for="ic in ['🏠', '🎮', '💻', '☕', '🎵', '📚', '🚀', '🦫']" :key="ic" type="button" class="icon-choice-btn" :class="{ sel: newGroupIcon === ic }" @click="newGroupIcon = ic">{{ ic }}</button>
            </div>
            <div class="create-room-actions">
              <button type="button" class="chat-btn-primary" :disabled="!newGroupName.trim()" @click="handleCreateGroupConfirm">立即创建群聊</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 非模态浮层 2：在当前群添加新子频道房间 -->
      <div v-if="showNewChannelModal" class="nonmodal-room-popover" @click.stop>
        <div class="create-room-modal-card">
          <div class="create-room-title">
            <strong>➕ 在【{{ currentGroup?.name }}】添加房间</strong>
            <button type="button" class="modal-close-pill" title="关闭" @click="showNewChannelModal = false">✕</button>
          </div>
          <div class="create-room-form">
            <label>房间名称</label>
            <input v-model="newChannelName" class="chat-input" placeholder="例如：考研打卡、动漫吐槽" maxlength="15" />
            <label>房间图标 Emoji</label>
            <div class="icon-selector-row">
              <button v-for="ic in ['💬', '🎵', '📺', '🐙', '⚡', '☕', '🎮', '💡']" :key="ic" type="button" class="icon-choice-btn" :class="{ sel: newChannelIcon === ic }" @click="newChannelIcon = ic">{{ ic }}</button>
            </div>
            <div class="create-room-actions">
              <button type="button" class="chat-btn-primary" :disabled="!newChannelName.trim()" @click="handleCreateChannelConfirm">添加此房间</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 群聊空间专属右键菜单 -->
      <Teleport to="body">
        <div
          v-if="groupContextMenu.visible && groupContextMenu.group"
          class="chat-context-menu"
          :style="{ left: `${groupContextMenu.x}px`, top: `${groupContextMenu.y}px` }"
          @click.stop
        >
          <div class="chat-context-header">
            {{ groupContextMenu.group.name }}
          </div>
          <button type="button" class="chat-context-item" @click="triggerRenameGroup(groupContextMenu.group)">
            <span class="chat-context-icon">✏️</span> 重命名此群聊
          </button>
          <button type="button" class="chat-context-item" @click="showNewChannelModal = true; closeAllContextMenus()">
            <span class="chat-context-icon">➕</span> 添加子房间频道
          </button>
          <template v-if="state.groups && state.groups.length > 1">
            <div class="chat-context-divider"></div>
            <button type="button" class="chat-context-item text-danger" @click="handleDeleteGroupFromMenu(groupContextMenu.group.id)">
              <span class="chat-context-icon">🗑️</span> 删除此群聊空间
            </button>
          </template>
        </div>
      </Teleport>

      <!-- 房间频道专属右键菜单 -->
      <Teleport to="body">
        <div
          v-if="channelContextMenu.visible && channelContextMenu.channel"
          class="chat-context-menu"
          :style="{ left: `${channelContextMenu.x}px`, top: `${channelContextMenu.y}px` }"
          @click.stop
        >
          <div class="chat-context-header">
            # {{ channelContextMenu.channel.name }}
          </div>
          <button type="button" class="chat-context-item" @click="triggerRenameChannel(channelContextMenu.channel)">
            <span class="chat-context-icon">✏️</span> 重命名房间频道
          </button>
          <template v-if="currentGroup?.channels && currentGroup.channels.length > 1">
            <div class="chat-context-divider"></div>
            <button type="button" class="chat-context-item text-danger" @click="handleDeleteChannelFromMenu(channelContextMenu.channel.id)">
              <span class="chat-context-icon">🗑️</span> 删除此房间
            </button>
          </template>
        </div>
      </Teleport>

      <!-- 非模态浮层 3：统一重命名 -->
      <div v-if="showRenameModal" class="nonmodal-room-popover" @click.stop>
        <div class="create-room-modal-card">
          <div class="create-room-title">
            <strong>{{ renameTitle }}</strong>
            <button type="button" class="modal-close-pill" title="关闭" @click="showRenameModal = false">✕</button>
          </div>
          <div class="create-room-form">
            <label>新名称</label>
            <input v-model="renameInputName" class="chat-input" maxlength="20" autofocus />
            <label>图标 Emoji</label>
            <div class="icon-selector-row">
              <button v-for="ic in ['🏠', '💬', '🎵', '📺', '🐙', '🎮', '💻', '⚡', '☕', '📚', '🚀', '🦫']" :key="ic" type="button" class="icon-choice-btn" :class="{ sel: renameInputIcon === ic }" @click="renameInputIcon = ic">{{ ic }}</button>
            </div>
            <div class="create-room-actions">
              <button type="button" class="chat-btn-primary" :disabled="!renameInputName.trim()" @click="handleConfirmRename">保存修改</button>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- /chat-container -->
  </AppWindowFrame>
</template>



<style scoped src="./chat-dialog.css"></style>
<style scoped>
.chat-message-actions { min-width: 24px; color: var(--muted); font-size: 11px; }
.chat-message-actions summary { list-style: none; cursor: pointer; border-radius: 4px; padding: 0 5px; font-size: 18px; line-height: 22px; text-align: center; }
.chat-message-actions summary::-webkit-details-marker { display: none; }
.chat-message-actions summary:hover, .chat-message-actions[open] summary { background: var(--surface); color: var(--text); }
.chat-message-actions summary:focus-visible { outline: 2px solid var(--heading); outline-offset: 2px; }
.chat-message-actions-content { display: flex; flex-direction: column; align-items: stretch; gap: 6px; padding: 8px; background: var(--panel); border: 1px solid var(--border); border-radius: 6px; max-width: 240px; white-space: normal; overflow-wrap: anywhere; }
</style>
