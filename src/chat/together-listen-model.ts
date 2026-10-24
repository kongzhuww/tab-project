import type { ChatMessage } from "./chat-state";

export interface ListenTogetherTrack {
  source: "siren" | "netease" | "bilibili";
  trackId: string;
  title: string;
  artist: string;
  cover: string;
  url?: string;
  duration?: number;
}

export interface PartySnapshot {
  isActive: boolean;
  roomId: string;
  hostUid: string;
  hostName: string;
  track: ListenTogetherTrack | null;
  position: number;
  timestamp: number;
  isPlaying: boolean;
  listenersCount: number;
}

export function emptyPartySnapshot(roomId = ""): PartySnapshot {
  return { isActive: false, roomId, hostUid: "", hostName: "", track: null,
    position: 0, timestamp: 0, isPlaying: false, listenersCount: 1 };
}

/** Pure state projection: never notifies, plays, writes storage or broadcasts. */
export function reducePartyMessage(previous: PartySnapshot, msg: ChatMessage, roomId: string): PartySnapshot | null {
  const meta = msg.meta;
  if (msg.type !== "music_party" || !meta || !["switch", "play", "pause", "seek", "stop", "transfer_dj"].includes(String(meta.partyAction))) return null;
  if (meta.partyAction === "stop") return { ...emptyPartySnapshot(roomId), timestamp: msg.timestamp };
  const source = meta.partySource;
  if (!["siren", "netease", "bilibili"].includes(String(source)) ||
      typeof meta.partyTrackId !== "string" || !meta.partyTrackId || meta.partyTrackId.length > 160 ||
      typeof meta.partyTitle !== "string" || !meta.partyTitle || meta.partyTitle.length > 500) return null;
  const transfer = meta.partyAction === "transfer_dj";
  if (transfer && (typeof meta.partyNewHostUid !== "string" || !meta.partyNewHostUid || meta.partyNewHostUid.length > 160)) return null;
  return {
    isActive: true, roomId,
    hostUid: transfer ? meta.partyNewHostUid! : msg.sender.uid,
    hostName: transfer ? String(meta.partyNewHostName || "海狸群友").slice(0, 100) : msg.sender.name,
    track: { source: source as ListenTogetherTrack["source"], trackId: meta.partyTrackId,
      title: meta.partyTitle, artist: String(meta.partyArtist || "未知歌手").slice(0, 500),
      cover: typeof meta.partyCover === "string" ? meta.partyCover : "",
      url: typeof meta.partyUrl === "string" ? meta.partyUrl : undefined },
    position: transfer && previous.isActive ? previous.position :
      typeof meta.partyPosition === "number" && Number.isFinite(meta.partyPosition) ? Math.max(0, meta.partyPosition) : 0,
    timestamp: transfer && previous.isActive ? previous.timestamp : msg.timestamp,
    isPlaying: transfer && previous.isActive ? previous.isPlaying : meta.partyAction !== "pause",
    listenersCount: typeof meta.partyListenersCount === "number" && Number.isFinite(meta.partyListenersCount)
      ? Math.max(1, Math.min(65, Math.floor(meta.partyListenersCount))) : 1
  };
}

/** Page-local, bounded event receipts. Scope includes user, server, parent room and channel. */
export class PartyMessageReceipts {
  private scopes = new Map<string, { sequence: number; ids: Set<string> }>();
  accept(scope: string, id: string, sequence?: number): boolean {
    let receipt = this.scopes.get(scope);
    if (!receipt) {
      receipt = { sequence: 0, ids: new Set() };
      this.scopes.set(scope, receipt);
      if (this.scopes.size > 32) this.scopes.delete(this.scopes.keys().next().value!);
    }
    if (sequence !== undefined && sequence <= receipt.sequence) return false;
    if (sequence !== undefined) receipt.sequence = sequence;
    if (receipt.ids.has(id)) return false;
    receipt.ids.add(id);
    if (receipt.ids.size > 512) receipt.ids.delete(receipt.ids.values().next().value!);
    return true;
  }
}
