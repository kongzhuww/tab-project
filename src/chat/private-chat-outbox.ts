import type { ChatMessage } from "./chat-state";
import type { PrivateChatDestination } from "./private-chat-types";
import type { ChatCapabilities } from "./chat-contract";
import { outgoingChatError } from "./chat-contract";
import { HttpError, ChatCapabilityError } from "./private-chat-errors";
import { acknowledgeDelivery, markDeliveryFailure, pumpDeliveries, deliveryError } from "./chat-delivery";

export const PRIVATE_CHAT_RECEIPT = "private-relay-server";
export interface PrivateOutboxPorts {
  active(destination: PrivateChatDestination): boolean;
  capabilities(destination: PrivateChatDestination): ChatCapabilities;
  destinations(destination: PrivateChatDestination): readonly PrivateChatDestination[];
  scope(destination: PrivateChatDestination): string;
  avatar(value: string): string;
  post(destination: PrivateChatDestination, message: ChatMessage, signal: AbortSignal): Promise<{ stored?: unknown; id?: unknown }>;
}

/** Outbox writes have their own lifetime; never take a view/read-session AbortSignal. */
export class PrivateChatOutboxCoordinator {
  private flushing = false;
  constructor(private readonly ports: PrivateOutboxPorts) {}
  async postAndAcknowledge(destination: PrivateChatDestination, message: ChatMessage, timeoutMs = 12000): Promise<void> {
    const target = Object.freeze({ ...destination });
    const problem = outgoingChatError(this.ports.capabilities(target), message);
    if (problem) throw new ChatCapabilityError(problem);
    const result = await this.ports.post(target, message, AbortSignal.timeout(timeoutMs));
    if (!result || result.stored !== true || result.id !== message.id) throw new Error("未收到服务器落盘确认");
    await acknowledgeDelivery(this.ports.scope(target), message.id, PRIVATE_CHAT_RECEIPT);
  }
  async recordFailure(destination: PrivateChatDestination, id: string, error: unknown, lastAttempt?: number): Promise<void> {
    try {
      if (error instanceof ChatCapabilityError) {
        deliveryError.value = error.message;
        await markDeliveryFailure(this.ports.scope(destination), id, PRIVATE_CHAT_RECEIPT, false, lastAttempt, true);
        return;
      }
      const rejected = error instanceof HttpError && error.status >= 400 && error.status < 500 && ![408, 429].includes(error.status);
      await markDeliveryFailure(this.ports.scope(destination), id, PRIVATE_CHAT_RECEIPT, rejected, lastAttempt);
    } catch { deliveryError.value = "无法保存消息的发送状态，请检查浏览器存储。"; }
  }
  async flush(destination: PrivateChatDestination): Promise<void> {
    if (this.flushing || !this.ports.active(destination) || ["unknown", "incompatible"].includes(this.ports.capabilities(destination).status)) return;
    this.flushing = true;
    const sending: Promise<void>[] = [];
    try {
      const destinations = this.ports.destinations(destination).map(value => Object.freeze({ ...value }));
      let budget = 8;
      for (const target of destinations) {
        if (!budget || !this.ports.active(destination)) break;
        await pumpDeliveries(this.ports.scope(target), [PRIVATE_CHAT_RECEIPT], () => this.ports.active(destination), (_uid, message, lastAttempt) => {
          --budget;
          const outgoing = { ...message, sender: { ...message.sender, avatar: this.ports.avatar(message.sender.avatar) } };
          sending.push(this.postAndAcknowledge(target, outgoing).catch(error => this.recordFailure(target, message.id, error, lastAttempt)));
          return true;
        }, budget, message => !outgoingChatError(this.ports.capabilities(target), message));
      }
    } catch {
      deliveryError.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      // Keep the lease until every POST already started by this batch has settled.
      // A later scan/storage failure must not release it while earlier writes are still in flight.
      await Promise.allSettled(sending);
      this.flushing = false;
    }
  }
}
