/**
 * 海狸自习室 - 去中心化 WebRTC P2P 传输层
 *
 * 核心特性：
 * 1. 当前通过 RTCDataChannel 向已连接对端发送，不提供离线投递。
 * 2. STUN 仅辅助 NAT 穿透，不保证可达；当前没有 TURN 兜底。
 * 3. 动态 RTT 延迟检测：DataChannel 内置 Ping/Pong 毫秒级网络探测
 * 4. 支持多个独立直连；不自动建立 Mesh，不转发其他对端消息。
 * 5. 端到端 DTLS 加密：网络传输完全加密，中间没有任何服务器能读取
 */

import {
  byteLength,
  MAX_CHAT_BYTES,
  MAX_CHAT_USERS,
  normalizeMessage,
  normalizeActivity,
  normalizeFriendRequest,
  normalizeFriendResponse
} from "./chat-security";
import type { ChatMessage, ChatUserInfo, FriendRequest, UserActivity } from "./chat-state";

export const DEFAULT_ICE_SERVERS: RTCIceServer[] = [
  // 腾讯公开 STUN（国内免翻，极速打洞）
  { urls: "stun:stun.qq.com:4430" },
  // B站公开 STUN
  { urls: "stun:stun.bilibili.com:443" },
  { urls: "stun:stun.chat.bilibili.com:443" },
  // 小米路由器公开 STUN
  { urls: "stun:stun.miwifi.com:3478" },
  // Google 公开 STUN（全球覆盖备选）
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" }
];

export interface PeerInfo {
  uid: string;
  name: string;
  avatar: string;
  rtt?: number;
  connectedAt: number;
}

export type P2PState = "disconnected" | "connecting" | "connected";

export interface P2PEvents {
  onMessage: (msg: ChatMessage, fromPeer: PeerInfo) => boolean | Promise<boolean>;
  onAck?: (id: string, uid: string) => void;
  onActivity: (uid: string, act: UserActivity) => void;
  onPresence: (user: ChatUserInfo, action: "join" | "leave") => void;
  onFriendRequest: (req: FriendRequest) => void;
  onFriendResponse: (resp: { requestId: string; from: ChatUserInfo; toUid: string; accepted: boolean; timestamp: number }) => void;
  onPeersChange: (peers: PeerInfo[]) => void;
  onPeerConnected?: (peer: PeerSession) => void;
  onStateChange: (state: P2PState) => void;
}

export class PeerSession {
  public remoteUid: string;
  public roomId = "";
  public handshakeId = "";
  private destroyed = false;
  public remoteName = "海狸同学";
  public remoteAvatar = "🦫";
  public pc: RTCPeerConnection;
  public dc: RTCDataChannel | null = null;
  public connectedAt = 0;
  public rtt = 0;
  private pingTimer?: ReturnType<typeof setInterval>;
  private lastPingSent = 0;
  private connectionDeadline?: ReturnType<typeof setTimeout>;

  constructor(
    remoteUid: string,
    pc: RTCPeerConnection,
    private readonly onData: (peer: PeerSession, data: any) => void,
    private readonly onClose: (peer: PeerSession) => void,
    private readonly onOpen?: (peer: PeerSession) => void
  ) {
    this.remoteUid = remoteUid;
    this.pc = pc;
    this.connectionDeadline = setTimeout(() => this.destroy(), 120000);

    this.pc.onconnectionstatechange = () => {
      const state = this.pc.connectionState;
      if (state === "failed" || state === "closed") {
        this.destroy();
      }
    };
  }

  public setupDataChannel(channel: RTCDataChannel): void {
    this.dc = channel;
    this.dc.binaryType = "arraybuffer";

    this.dc.onopen = () => {
      clearTimeout(this.connectionDeadline);
      this.connectedAt = Date.now();
      this.startHeartbeat();
      this.onOpen?.(this);
    };

    this.dc.onmessage = (event) => {
      try {
        const raw = typeof event.data === "string" ? event.data : new TextDecoder().decode(event.data);
        if (byteLength(raw) > MAX_CHAT_BYTES) return;

        const data = JSON.parse(raw);
        if (data.type === "ping") {
          this.send({ type: "pong", echo: data.ts });
          return;
        }
        if (data.type === "pong" && data.echo) {
          this.rtt = Math.max(1, Date.now() - Number(data.echo));
          return;
        }

        this.onData(this, data);
      } catch {
        // Ignore malformed packets.
      }
    };

    this.dc.onclose = () => {
      this.destroy();
    };

    this.dc.onerror = () => {
      this.destroy();
    };
  }

  public send(payload: any): boolean {
    if (!this.dc || this.dc.readyState !== "open") return false;
    try {
      const json = JSON.stringify(payload);
      if (byteLength(json) > MAX_CHAT_BYTES || this.dc.bufferedAmount > MAX_CHAT_BYTES) return false;
      this.dc.send(json);
      return true;
    } catch {
      return false;
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.pingTimer = setInterval(() => {
      if (this.dc && this.dc.readyState === "open") {
        this.lastPingSent = Date.now();
        this.send({ type: "ping", ts: this.lastPingSent });
      }
    }, 15000);
  }

  private stopHeartbeat(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = undefined;
    }
  }

  public destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    clearTimeout(this.connectionDeadline);
    this.stopHeartbeat();
    if (this.dc) {
      this.dc.onopen = this.dc.onmessage = this.dc.onclose = this.dc.onerror = null;
      try { this.dc.close(); } catch {}
      this.dc = null;
    }
    if (this.pc) {
      this.pc.onconnectionstatechange = null;
      this.pc.ondatachannel = null;
      try { this.pc.close(); } catch {}
    }
    this.onClose(this);
  }
}

export class P2PCoordinator {
  private peers = new Map<string, PeerSession>();
  private roomId = "";
  private allowedPeers: Set<string> | null = null;
  public restrictPeers(uids: string[] | null): void {
    this.allowedPeers = uids === null ? null : new Set(uids);
    for (const peer of this.peers.values()) if (this.allowedPeers && !this.allowedPeers.has(peer.remoteUid)) peer.destroy();
  }
  public hasPeer(uid: string): boolean { return this.peers.has(uid); }
  public dropPeer(uid: string): void { this.peers.get(uid)?.destroy(); }
  public setRoom(roomId: string): void {
    if (roomId === this.roomId) return;
    this.roomId = roomId;
    this.disconnectAll();
  }
  public getRoom(): string { return this.roomId; }
  private currentUser: ChatUserInfo = { uid: "", name: "", avatar: "" };
  private events: Partial<P2PEvents> = {};

  public init(currentUser: ChatUserInfo, events: Partial<P2PEvents>): void {
    this.currentUser = currentUser;
    this.events = events;
  }

  public updateCurrentUser(user: ChatUserInfo): void {
    this.currentUser = user;
    this.broadcast({
      type: "user_info",
      user
    });
  }

  public getCurrentUser(): ChatUserInfo {
    return this.currentUser;
  }

  public getPeerList(): PeerInfo[] {
    const list: PeerInfo[] = [];
    for (const p of this.peers.values()) {
      if (p.dc && p.dc.readyState === "open") {
        list.push({
          uid: p.remoteUid,
          name: p.remoteName,
          avatar: p.remoteAvatar,
          rtt: p.rtt,
          connectedAt: p.connectedAt
        });
      }
    }
    return list;
  }

  public getConnectedCount(): number {
    let count = 0;
    for (const p of this.peers.values()) {
      if (p.dc && p.dc.readyState === "open") count++;
    }
    return count;
  }

  /**
   * 创建发给指定 Peer 的 Offer (包含完整聚集的 ICE Candidates)
   */
  public async createOffer(remoteUid: string, authorizedSignal = false): Promise<string> {
    if (this.allowedPeers !== null && !authorizedSignal) throw new Error("此房间仅允许通过已认证信令握手，请使用自动连线");
    if (!this.roomId) throw new Error("请先选择 P2P 房间");
    if (this.allowedPeers && !this.allowedPeers.has(remoteUid)) throw new Error("对方不在已授权在线成员列表中");
    this.peers.get(remoteUid)?.destroy();
    if (this.peers.size >= MAX_CHAT_USERS) throw new Error("连接数已达上限");
    const pc = new RTCPeerConnection({ iceServers: DEFAULT_ICE_SERVERS });
    const session = new PeerSession(
      remoteUid,
      pc,
      (peer, data) => this.handlePeerData(peer, data),
      (peer) => this.handlePeerClosed(peer),
      (peer) => this.handlePeerOpened(peer)
    );
    session.roomId = this.roomId;
    session.handshakeId = crypto.randomUUID();
    this.peers.set(remoteUid, session);

    const dc = pc.createDataChannel("beaver-chat", { ordered: true });
    session.setupDataChannel(dc);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // 等待 ICE Candidates 收集完毕，生成开箱即用的完整 Ticket
    await this.waitForIceGathering(pc);

    return JSON.stringify({
      version: 1,
      type: "offer",
      from: this.currentUser,
      toUid: remoteUid,
      roomId: session.roomId,
      handshakeId: session.handshakeId,
      sdp: pc.localDescription?.sdp
    });
  }

  /**
   * 接收来自 Peer 的 Offer，并生成 Answer
   */
  public async handleOffer(offerTicketStr: string, authorizedSignal = false): Promise<string> {
    if (this.allowedPeers !== null && !authorizedSignal) throw new Error("此房间不接受手动连线码，请使用已认证信令");
    const ticket = JSON.parse(offerTicketStr);
    if (ticket.type !== "offer" || !ticket.sdp || !ticket.from?.uid) {
      throw new Error("无效的连接 Offer");
    }

    if (ticket.from.uid === this.currentUser.uid) {
      throw new Error("这是你自己生成的名片，不能填给自己。请在小号或朋友窗口中粘贴！");
    }

    if (!this.roomId || ticket.roomId !== this.roomId || typeof ticket.handshakeId !== "string" || !ticket.handshakeId || ticket.handshakeId.length > 100) throw new Error("房间或握手标识不匹配");
    if (this.peers.size >= MAX_CHAT_USERS) throw new Error("连接数已达上限");
    const remoteUid = ticket.from.uid;
    if (this.allowedPeers && !this.allowedPeers.has(remoteUid)) throw new Error("对方不是已授权在线成员");
    const existing = this.peers.get(remoteUid);
    if (existing) existing.destroy();

    const pc = new RTCPeerConnection({ iceServers: DEFAULT_ICE_SERVERS });
    const session = new PeerSession(
      remoteUid,
      pc,
      (peer, data) => this.handlePeerData(peer, data),
      (peer) => this.handlePeerClosed(peer),
      (peer) => this.handlePeerOpened(peer)
    );
    session.roomId = ticket.roomId;
    session.handshakeId = ticket.handshakeId;
    session.remoteName = ticket.from.name || "海狸同学";
    session.remoteAvatar = ticket.from.avatar || "🦫";
    this.peers.set(remoteUid, session);

    pc.ondatachannel = (event) => {
      session.setupDataChannel(event.channel);
      this.notifyPeersChanged();
      // 回送自己的个人信息
      session.send({
        type: "user_info",
        user: this.currentUser
      });
    };

    await pc.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: ticket.sdp }));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    await this.waitForIceGathering(pc);

    return JSON.stringify({
      version: 1,
      type: "answer",
      from: this.currentUser,
      toUid: remoteUid,
      roomId: session.roomId,
      handshakeId: session.handshakeId,
      sdp: pc.localDescription?.sdp
    });
  }

  /**
   * 接收来自 Peer 的 Answer，完成握手
   */
  public async handleAnswer(answerTicketStr: string, authorizedSignal = false): Promise<void> {
    if (this.allowedPeers !== null && !authorizedSignal) throw new Error("此房间不接受手动回应码，请使用已认证信令");
    const ticket = JSON.parse(answerTicketStr);
    if (ticket.type !== "answer" || !ticket.sdp || !ticket.from?.uid) {
      throw new Error("无效的连接 Answer");
    }

    if (ticket.from.uid === this.currentUser.uid) {
      throw new Error("这是你自己生成的回应代码，不能填给自己。请发给发起连线的一方粘贴！");
    }

    if (ticket.toUid !== this.currentUser.uid || ticket.roomId !== this.roomId) throw new Error("回应码不属于当前用户或房间");
    if (this.allowedPeers && !this.allowedPeers.has(ticket.from.uid)) throw new Error("成员授权已失效");
    const session = [...this.peers.values()].find(p => p.handshakeId === ticket.handshakeId && p.pc.signalingState === "have-local-offer");
    if (!session || (session.remoteUid !== "peer_guest" && session.remoteUid !== ticket.from.uid)) throw new Error("回应码已过期或不属于本次邀请");
    this.peers.delete(session.remoteUid);
    this.peers.get(ticket.from.uid)?.destroy();
    session.remoteUid = ticket.from.uid;
    this.peers.set(session.remoteUid, session);

    session.remoteName = ticket.from.name || session.remoteName;
    session.remoteAvatar = ticket.from.avatar || session.remoteAvatar;

    await session.pc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: ticket.sdp }));
    this.notifyPeersChanged();
  }

  public broadcast(payload: any, excludeUid?: string): number {
    let sent = 0;
    for (const [uid, peer] of this.peers) {
      if (uid !== excludeUid && peer.roomId === this.roomId && peer.send({ ...payload, roomId: this.roomId })) sent++;
    }
    return sent;
  }

  public sendTo(targetUid: string, payload: any): boolean {
    const peer = this.peers.get(targetUid);
    if (peer) {
      return peer.roomId === this.roomId && peer.send({ ...payload, roomId: this.roomId });
    }
    return false;
  }

  public disconnectAll(): void {
    for (const peer of this.peers.values()) {
      peer.destroy();
    }
    this.peers.clear();
    this.notifyPeersChanged();
  }

  private handlePeerData(peer: PeerSession, data: any): void {
    if (!data || typeof data !== "object" || !this.roomId || peer.roomId !== this.roomId || data.roomId !== this.roomId) return;

    if (data.type === "user_info" && data.user) {
      if (typeof data.user.name === "string") peer.remoteName = data.user.name.slice(0, 100);
      if (typeof data.user.avatar === "string") peer.remoteAvatar = data.user.avatar.slice(0, 500);
      this.notifyPeersChanged();
      this.events.onPresence?.({ uid: peer.remoteUid, name: peer.remoteName, avatar: peer.remoteAvatar }, "join");
      return;
    }

    if (data.type === "ack" && typeof data.id === "string" && data.id.length <= 200) {
      this.events.onAck?.(data.id, peer.remoteUid);
      return;
    }
    if (data.type === "history_sync") return; // No unsolicited history import.

    if (data.type === "message" && data.message) {
      const msg = normalizeMessage(data.message);
      if (msg && msg.type !== "system" && msg.sender.uid === peer.remoteUid) {
        if (msg.sender && msg.sender.uid) {
          if (peer.remoteName === "海狸同学" || !peer.remoteName) peer.remoteName = msg.sender.name || peer.remoteName;
          if (peer.remoteAvatar === "🦫" || !peer.remoteAvatar) peer.remoteAvatar = msg.sender.avatar || peer.remoteAvatar;
          this.notifyPeersChanged();
        }
        const accepted = this.events.onMessage?.(msg, {
          uid: peer.remoteUid,
          name: peer.remoteName,
          avatar: peer.remoteAvatar,
          rtt: peer.rtt,
          connectedAt: peer.connectedAt
        });
        void Promise.resolve(accepted).then(saved => {
          if (saved && this.peers.get(peer.remoteUid) === peer && peer.roomId === this.roomId) {
            peer.send({ type: "ack", id: msg.id, roomId: peer.roomId });
          }
        }).catch(() => {});
      }
      return;
    }

    if (data.type === "activity" && data.activity) {
      const act = normalizeActivity(data.activity);
      if (act) {
        this.events.onActivity?.(peer.remoteUid, act);
      }
      return;
    }

    if (data.type === "friend_request" && data.request) {
      const req = normalizeFriendRequest(data.request);
      if (req && req.from.uid === peer.remoteUid) {
        this.events.onFriendRequest?.(req);
      }
      return;
    }

    if (data.type === "friend_response" && data.response) {
      const resp = normalizeFriendResponse(data.response);
      if (resp && resp.from.uid === peer.remoteUid) {
        this.events.onFriendResponse?.(resp);
      }
      return;
    }
  }

  private handlePeerOpened(peer: PeerSession): void {
    peer.send({
      type: "user_info",
      roomId: peer.roomId,
      user: this.currentUser
    });
    this.events.onPeerConnected?.(peer);
    this.notifyPeersChanged();
  }

  private handlePeerClosed(peer: PeerSession): void {
    if (this.peers.get(peer.remoteUid) !== peer) return;
    this.peers.delete(peer.remoteUid);
    if (peer.roomId !== this.roomId) return;
    this.events.onPresence?.({ uid: peer.remoteUid, name: peer.remoteName, avatar: peer.remoteAvatar }, "leave");
    this.notifyPeersChanged();
  }

  private notifyPeersChanged(): void {
    const list = this.getPeerList();
    this.events.onPeersChange?.(list);
    this.events.onStateChange?.(list.length > 0 ? "connected" : "disconnected");
  }

  private waitForIceGathering(pc: RTCPeerConnection): Promise<void> {
    return new Promise((resolve) => {
      if (pc.iceGatheringState === "complete") {
        resolve();
        return;
      }

      const timer = setTimeout(() => {
        pc.removeEventListener("icegatheringstatechange", check);
        resolve();
      }, 3500); // 最多等待 3.5 秒聚集国内 STUN 候选

      const check = () => {
        if (pc.iceGatheringState === "complete") {
          clearTimeout(timer);
          pc.removeEventListener("icegatheringstatechange", check);
          resolve();
        }
      };

      pc.addEventListener("icegatheringstatechange", check);
    });
  }
}

export const p2pCoordinator = new P2PCoordinator();
