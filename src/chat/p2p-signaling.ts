import { p2pCoordinator } from "./p2p-transport";
import type { ChatUserInfo } from "./chat-state";

type Ticket = {
  v: 2; t: "offer" | "answer"; from: ChatUserInfo;
  toUid?: string; roomId: string; handshakeId: string; sdp: string;
};
function decode(str: string): Ticket {
  if (str.length > 100000) throw new Error("连线码过大");
  const t = JSON.parse(decodeURIComponent(atob(str.trim().replace(/^BEAVER-P2P:/i, ""))));
  if (t?.v !== 2) throw new Error("旧版连线码不支持房间隔离，请双方更新后重新生成");
  if (!["offer", "answer"].includes(t.t) || typeof t.from?.uid !== "string" || !t.from.uid || t.from.uid.length > 160 || typeof t.sdp !== "string" || !t.sdp || typeof t.roomId !== "string" || !t.roomId || t.roomId.length > 4096 || typeof t.handshakeId !== "string" || !t.handshakeId || t.handshakeId.length > 100) throw new Error("连线码格式无效");
  return t;
}
function encode(t: Ticket): string {
  return "BEAVER-P2P:" + btoa(encodeURIComponent(JSON.stringify(t)));
}
export function inspectP2PTicket(str: string): { type: "offer" | "answer"; from: ChatUserInfo } | null {
  try { const t = decode(str); return { type: t.t, from: t.from }; } catch { return null; }
}
export class P2PSignaling {
  private bc?: BroadcastChannel;
  private callback?: (user: ChatUserInfo) => void;
  private discoverUntil = 0;
  public startLocalDiscovery(callback?: (user: ChatUserInfo) => void): void {
    this.callback = callback;
    if (this.bc || typeof BroadcastChannel === "undefined") return;
    this.bc = new BroadcastChannel("beaver_p2p_local_bus_v2");
    this.bc.onmessage = async event => {
      // Both windows must explicitly enable discovery. Merely opening chat is not consent.
      if (Date.now() > this.discoverUntil || typeof event.data?.ticket !== "string") return;
      try {
        const t = decode(event.data.ticket);
        if (t.roomId !== p2pCoordinator.getRoom() || t.from.uid === p2pCoordinator.getCurrentUser().uid) return;
        if (t.t === "offer") {
          // Deterministic initiator avoids simultaneous-offer collisions.
          if (p2pCoordinator.getCurrentUser().uid < t.from.uid) return;
          const result = await this.acceptInviteCard(event.data.ticket);
          this.bc?.postMessage({ ticket: result.answerCard });
        } else if (t.toUid === p2pCoordinator.getCurrentUser().uid) {
          await this.completeInviteCard(event.data.ticket);
        } else return;
        this.callback?.(t.from);
      } catch { /* Unrelated broadcasts do not modify the current session. */ }
    };
  }
  public async broadcastLocalOffer(): Promise<string> {
    this.startLocalDiscovery(this.callback);
    this.discoverUntil = Date.now() + 60000;
    const card = await this.createInviteCard();
    this.bc?.postMessage({ ticket: card });
    return card;
  }
  public async createInviteCard(targetUid?: string): Promise<string> {
    const p = JSON.parse(await p2pCoordinator.createOffer(targetUid || "peer_guest"));
    return encode({ v: 2, t: "offer", from: p.from, toUid: targetUid, roomId: p.roomId, handshakeId: p.handshakeId, sdp: p.sdp });
  }
  public async acceptInviteCard(str: string): Promise<{ answerCard: string; fromUser: ChatUserInfo }> {
    const t = decode(str);
    if (t.t !== "offer") throw new Error("请粘贴邀请方的连线码");
    if (t.toUid && t.toUid !== p2pCoordinator.getCurrentUser().uid) throw new Error("邀请不是发给当前用户的");
    if (!p2pCoordinator.getRoom() || t.roomId !== p2pCoordinator.getRoom()) throw new Error("双方不在同一房间。请先通过房间邀请进入同一房间，再交换连线码；不会自动合并或发送历史。");
    const p = JSON.parse(await p2pCoordinator.handleOffer(JSON.stringify({ ...t, type: t.t })));
    return { answerCard: encode({ v: 2, t: "answer", from: p.from, toUid: t.from.uid, roomId: p.roomId, handshakeId: p.handshakeId, sdp: p.sdp }), fromUser: t.from };
  }
  public async completeInviteCard(str: string): Promise<ChatUserInfo> {
    const t = decode(str);
    if (t.t !== "answer") throw new Error("请粘贴对方的回应码");
    await p2pCoordinator.handleAnswer(JSON.stringify({ ...t, type: t.t }));
    return t.from;
  }
}
export const p2pSignaling = new P2PSignaling();
