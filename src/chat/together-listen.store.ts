import { reactive, computed, watch } from "vue";
import { chatModuleState as state, chatHistoryLoadState, type ChatMessage } from "./chat-state";
import { privateChatState as chat, sendPrivateMessage, onPrivateChatMessage,
  currentPrivateChatMessageSession, type PrivateChatMessageContext } from "./private-chat-client";
import { musicService } from "../services/music.service";
import { biliRadioPlayer } from "../bilibili/radio-player";
import { homeMusicController } from "../music/store";
import { notifications } from "../sdk/notifications";
import { emptyPartySnapshot, reducePartyMessage, PartyMessageReceipts,
  type PartySnapshot, type ListenTogetherTrack } from "./together-listen-model";
export type { ListenTogetherTrack } from "./together-listen-model";

export interface TogetherPartyState extends PartySnapshot {
  isJoined: boolean;
  djModalOpen: boolean;
}

// Joining is an explicit action in this page/session, never an old global storage flag.
export const togetherPartyState = reactive<TogetherPartyState>({
  ...emptyPartySnapshot(), isJoined: false, djModalOpen: false
});
const messageSession = computed(() => currentPrivateChatMessageSession());
const sessionScope = computed(() => messageSession.value?.scope || "");
const receipts = new PartyMessageReceipts();
let restoredScope = "";
let restorationLocked = false;
let hasLocalIntent = false;
let playbackVersion = 0;
let preparedTrackKey = "";
const trackKey = (track: ListenTogetherTrack) => JSON.stringify([sessionScope.value, track.source, track.trackId]);

function applyPartySnapshot(snapshot: PartySnapshot, invalidatePlayback = true): void {
  if (invalidatePlayback) ++playbackVersion;
  Object.assign(togetherPartyState, snapshot);
  if (!snapshot.isActive) {
    preparedTrackKey = "";
    togetherPartyState.isJoined = false;
  }
}

watch(sessionScope, () => {
  ++playbackVersion;
  restoredScope = "";
  restorationLocked = false;
  hasLocalIntent = false;
  preparedTrackKey = "";
  Object.assign(togetherPartyState, emptyPartySnapshot(messageSession.value?.channel),
    { isJoined: false, djModalOpen: false });
}, { immediate: true, flush: "sync" });

function restorePartyFromHistory(): void {
  const session = messageSession.value;
  if (!session || !chatHistoryLoadState.ready || chatHistoryLoadState.scope !== session.scope ||
      restoredScope === session.scope || restorationLocked) return;
  restoredScope = session.scope;
  let snapshot = emptyPartySnapshot(session.channel);
  for (const msg of state.messages) {
    const next = reducePartyMessage(snapshot, msg, session.channel);
    if (next) { snapshot = next; receipts.accept(session.scope, msg.id); }
  }
  // Projection only: no notifications, player updates, joins or outgoing messages.
  applyPartySnapshot(snapshot);
}

watch(() => [sessionScope.value, chatHistoryLoadState.scope, chatHistoryLoadState.ready],
  restorePartyFromHistory, { immediate: true });

export const isPartyHost = computed(() => {
  return !togetherPartyState.isActive || !togetherPartyState.hostUid || togetherPartyState.hostUid === state.currentUser.uid;
});

export function openDjModal(): void {
  togetherPartyState.djModalOpen = true;
}

export function closeDjModal(): void {
  togetherPartyState.djModalOpen = false;
}

/**
 * 移交或接管 DJ 独家控制权
 */
export async function transferDjRole(targetUid: string, targetName: string): Promise<void> {
  const session = messageSession.value;
  if (!session || !togetherPartyState.isActive || !togetherPartyState.track) return;
  restorationLocked = true;
  hasLocalIntent = true;
  togetherPartyState.hostUid = targetUid;
  togetherPartyState.hostName = targetName;

  const msg: ChatMessage = {
    id: `msg_party_dj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    sender: {
      uid: state.currentUser.uid,
      name: state.currentUser.name,
      avatar: state.currentUser.avatar
    },
    type: "music_party",
    content: `🎛️ 【${state.currentUser.name}】已将打碟机播控权移交给了【${targetName}】！`,
    meta: {
      partySource: togetherPartyState.track?.source,
      partyTrackId: togetherPartyState.track?.trackId,
      partyTitle: togetherPartyState.track?.title,
      partyArtist: togetherPartyState.track?.artist,
      partyCover: togetherPartyState.track?.cover,
      partyUrl: togetherPartyState.track?.url,
      partyPosition: togetherPartyState.position,
      partyAction: "transfer_dj",
      partyNewHostUid: targetUid,
      partyNewHostName: targetName,
      partyListenersCount: togetherPartyState.listenersCount,
      silentPartySync: true // 静默同频通知所有人更新 DJ 归属
    },
    timestamp: Date.now()
  };

  try {
    receipts.accept(session.scope, msg.id);
    await sendPrivateMessage(msg);
    if (session.scope !== sessionScope.value || togetherPartyState.hostUid !== targetUid) return;
    notifications.fetch("海狸调音台", "播控权已移交", `已将打碟机控制权交给【${targetName}】`);
  } catch (err) {
    console.warn("[TogetherListen] 广播移交控制权失败:", err);
  }
}

/**
 * 听众一键申请/接管 DJ 独家控制权
 */
export async function claimDjRole(): Promise<void> {
  await transferDjRole(state.currentUser.uid, state.currentUser.name);
}

/**
 * 广播派对更新：
 * - isInviteCard: true => 首次发起或显式邀请时，在群里发一张白底精致派对卡片拉人；
 * - isInviteCard: false => 切歌/播放/暂停等同频同步，走静默信令广播，自动更新所有人的播放器与顶栏，绝不刷屏发卡片！
 */
export async function broadcastPartyTrack(
  track: ListenTogetherTrack,
  action: "switch" | "play" | "pause" | "stop" = "switch",
  isInviteCard: boolean = false
): Promise<void> {
  const session = messageSession.value;
  if (!session) {
    notifications.fetch("海狸一起听", "尚未进入有效聊天室", "请先配置并进入要广播的房间。");
    return;
  }
  restorationLocked = true;
  hasLocalIntent = true;
  togetherPartyState.isActive = true;
  togetherPartyState.isJoined = true;
  togetherPartyState.roomId = chat.channel;
  togetherPartyState.hostUid = state.currentUser.uid;
  togetherPartyState.hostName = state.currentUser.name;
  togetherPartyState.track = { ...track };
  togetherPartyState.position = 0;
  togetherPartyState.timestamp = Date.now();
  togetherPartyState.isPlaying = action !== "pause";
  togetherPartyState.listenersCount = Math.max(togetherPartyState.listenersCount, 1);

  // 1. 本机立即执行起播/控制
  if (action === "stop") {
    closeParty();
  } else if ((action === "pause" || action === "play") && preparedTrackKey === trackKey(track)) {
    ++playbackVersion;
    syncPlayerTime(track.source, 0, action === "play");
  } else {
    // Sending a switch must not wait for a slow/blocked local audio request.
    void playTrackLocally(track, 0);
  }

  if (session.scope !== sessionScope.value) return;
  // 2. 广播到 captured room only; a late local player result cannot switch the destination.
  const syncMessage: ChatMessage = {
    id: `msg_party_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    sender: {
      uid: state.currentUser.uid,
      name: state.currentUser.name,
      avatar: state.currentUser.avatar
    },
    type: "music_party",
    content: action === "stop"
      ? `⏹️ 【${state.currentUser.name}】结束了本次海狸音乐派对。`
      : isInviteCard
      ? `🎧 【${state.currentUser.name}】发起了海狸音乐派对，邀请大家一起听《${track.title}》！`
      : `[同频同步] 《${track.title}》`,
    meta: {
      partySource: track.source,
      partyTrackId: track.trackId,
      partyTitle: track.title,
      partyArtist: track.artist,
      partyCover: track.cover,
      partyUrl: track.url,
      partyPosition: 0,
      partyAction: action,
      partyListenersCount: togetherPartyState.listenersCount,
      silentPartySync: !isInviteCard // 关键：只有显式拉人时才发卡片，切歌/暂停静默同频同步！
    },
    timestamp: Date.now()
  };

  try {
    receipts.accept(session.scope, syncMessage.id);
    await sendPrivateMessage(syncMessage);
  } catch (err) {
    console.warn("[TogetherListen] 广播派对状态失败:", err);
  }
}

/**
 * 由 DJ 在调音台发起/切换一起听曲目
 */
export async function startPartyTrack(track: ListenTogetherTrack): Promise<void> {
  return broadcastPartyTrack(track, "switch", false);
}

/**
 * 加入当前房间正在进行的一起听派对
 */
export async function joinParty(): Promise<void> {
  const track = togetherPartyState.track;
  const scope = sessionScope.value;
  if (!scope || !togetherPartyState.isActive || !track) return;
  restorationLocked = true;
  hasLocalIntent = true;
  togetherPartyState.isJoined = true;
  const elapsed = Math.max(0, (Date.now() - togetherPartyState.timestamp) / 1000);
  const targetPos = togetherPartyState.position + (togetherPartyState.isPlaying ? elapsed : 0);

  await playTrackLocally(track, targetPos);
  if (scope !== sessionScope.value || !togetherPartyState.isJoined || togetherPartyState.track !== track) return;
  notifications.fetch(
    "海狸一起听",
    `已加入音乐派对：${togetherPartyState.track.title}`,
    `当前正在与【${togetherPartyState.hostName}】同步收听。`
  );
}

/**
 * 退出当前的一起听派对
 */
export function leaveParty(): void {
  togetherPartyState.isJoined = false;
  restorationLocked = true;
  hasLocalIntent = true;
  ++playbackVersion;
  notifications.fetch("海狸一起听", "已退出一起听", "你现在可以独立控制播放。");
}

/**
 * 本地关闭/隐藏一起听顶栏
 */
export function closeParty(): void {
  restorationLocked = true;
  hasLocalIntent = true;
  applyPartySnapshot(emptyPartySnapshot(messageSession.value?.channel));
}

/**
 * 彻底结束当前一起听派对并广播通知全群
 */
export async function stopParty(broadcast = true): Promise<void> {
  const scope = sessionScope.value;
  if (broadcast && togetherPartyState.track) {
    try {
      await broadcastPartyTrack(togetherPartyState.track, "stop", true);
    } catch {}
  }
  if (scope !== sessionScope.value) return;
  // Do not close a new party started while the previous stop was being queued.
  if (broadcast && togetherPartyState.isActive) return;
  closeParty();
  notifications.fetch("海狸调音台", "派对已结束", "已关闭一起听音乐广播。");
}

/**
 * Transport messages have explicit source, scope and server order.
 * History changes the snapshot only; self echoes acknowledge already-applied local actions.
 */
export function handleIncomingPartyMessage(msg: ChatMessage, context: PrivateChatMessageContext): void {
  const session = messageSession.value;
  if (!session || context.scope !== session.scope || context.channel !== session.channel) return;
  const next = reducePartyMessage(togetherPartyState, msg, session.channel);
  if (!next || !receipts.accept(context.scope, msg.id, context.sequence)) return;
  restorationLocked = true;
  // A startup page arriving late cannot undo an explicit join/switch/dismiss in this session.
  if (context.source === "history" && hasLocalIntent) return;
  const wasActive = togetherPartyState.isActive;
  const sameTrack = togetherPartyState.track?.source === next.track?.source &&
    togetherPartyState.track?.trackId === next.track?.trackId;
  applyPartySnapshot(next, !(sameTrack && msg.meta?.partyAction === "transfer_dj"));
  if (context.source !== "live") return;

  if (msg.meta?.partyAction === "stop") {
    notifications.fetch("海狸调音台", "一起听已结束",
      `【${msg.sender.name}】已结束本次一起听派对。`);
    return;
  }
  if (msg.meta?.partyAction === "transfer_dj") {
    notifications.fetch("海狸调音台", "播控权已变更",
      `【${togetherPartyState.hostName}】已接管 DJ 调音台打碟控制权。`);
    return;
  }
  const track = togetherPartyState.track;
  if (!track) return;
  if (togetherPartyState.isJoined) {
    homeMusicController.setTrack(track.title, track.artist, track.cover);
    const elapsed = Math.max(0, (Date.now() - togetherPartyState.timestamp) / 1000);
    const position = togetherPartyState.position + (togetherPartyState.isPlaying ? elapsed : 0);
    if (!sameTrack || msg.meta?.partyAction === "switch" || preparedTrackKey !== trackKey(track)) {
      void playTrackLocally(track, msg.meta?.partyAction === "switch" ? 0 : position);
    } else {
      syncPlayerTime(track.source, position, togetherPartyState.isPlaying);
    }
  } else if (!wasActive && !msg.meta?.silentPartySync) {
    notifications.fetch("海狸音乐派对", `【${msg.sender.name}】发起了《${track.title}》`,
      "点击群内卡片或顶栏即可一键加入一起听！");
  }
}

/** A historical invitation cannot overwrite a newer switch/stop or transfer. */
export async function joinPartyFromCard(msg: ChatMessage): Promise<void> {
  restorePartyFromHistory();
  const current = togetherPartyState.track;
  if (msg.meta?.partyAction === "stop" || !togetherPartyState.isActive || !current) {
    notifications.fetch("海狸一起听", "该邀请当前不可加入", "派对已结束或状态尚未恢复，请查看当前一起听状态。");
    return;
  }
  if (msg.meta?.partySource !== current.source || msg.meta?.partyTrackId !== current.trackId) {
    notifications.fetch("海狸一起听", "曲目已经更新", "这是一张旧邀请，请通过当前一起听顶栏加入。");
    return;
  }
  await joinParty();
}

/**
 * 本地播放适配器（塞壬、网易云、B站）
 */
async function playTrackLocally(track: ListenTogetherTrack, seekSec: number): Promise<void> {
  const version = ++playbackVersion;
  const scope = sessionScope.value;
  const key = trackKey(track);
  const current = () => version === playbackVersion && scope === sessionScope.value &&
    togetherPartyState.isJoined && togetherPartyState.isActive &&
    togetherPartyState.track?.source === track.source && togetherPartyState.track?.trackId === track.trackId;
  const options = { isCurrent: current, autoplay: togetherPartyState.isPlaying };
  const ready = (audio: HTMLAudioElement) => {
    if (!current()) return;
    preparedTrackKey = key;
    const source = audio.src;
    const seek = () => {
      if (current() && audio.src === source && Number.isFinite(seekSec) && seekSec > 0) {
        try { audio.currentTime = seekSec; } catch {}
      }
    };
    if (audio.readyState >= 1) seek();
    else audio.addEventListener("loadedmetadata", seek, { once: true });
  };
  try {
    if (track.source === "bilibili") {
      biliRadioPlayer.playQueue({
        name: `海狸一起听 · ${track.title}`,
        items: [{ bvid: track.trackId, title: track.title, cover: track.cover, author: track.artist }],
        startIndex: 0, ...options, onReady: ready
      });
    } else {
      // Resolve once through the player service; never override a later source with a party URL.
      const prepared = track.source === "netease"
        ? await musicService.playNeteaseSong({ id: track.trackId, name: track.title,
            artists: [{ name: track.artist }], album: { picUrl: track.cover } }, options)
        : await musicService.playSong({ cid: track.trackId, name: track.title,
            artists: [track.artist], coverUrl: track.cover }, options);
      if (!current() || !prepared) return;
      const audio = musicService.getAudioElement();
      if (audio) ready(audio);
    }
    if (current()) homeMusicController.setTrack(track.title, track.artist, track.cover);
  } catch {
    // Network/autoplay errors do not replay a broadcast or act on a different room.
    if (current()) notifications.fetch("海狸一起听", "本地播放未就绪", "请检查音源或点击播放，不会自动重复广播。");
  }
}

function syncPlayerTime(source: string, seekSec: number, play: boolean): void {
  const audio = source === "bilibili" ? biliRadioPlayer.getAudioElement() : musicService.getAudioElement();
  if (!audio) return;
  const version = playbackVersion, scope = sessionScope.value, mediaSource = audio.src;
  const current = () => version === playbackVersion && scope === sessionScope.value &&
    togetherPartyState.isJoined && audio.src === mediaSource;
  const seek = () => {
    if (current() && Number.isFinite(seekSec) && seekSec >= 0 && Math.abs(audio.currentTime - seekSec) > 4) {
      try { audio.currentTime = seekSec; } catch {}
    }
  };
  if (audio.readyState >= 1) seek();
  else audio.addEventListener("loadedmetadata", seek, { once: true });
  if (play && audio.paused) void audio.play().catch(() => {});
  else if (!play && !audio.paused) audio.pause();
}

// Network catch-up and live delivery share an envelope, not the same side effects.
onPrivateChatMessage(handleIncomingPartyMessage);
