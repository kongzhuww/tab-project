import type { PrivateRoom } from "./private-chat-config";

export type PrivateChatDestination = PrivateRoom & { channel?: string };
export type SessionRoom = PrivateRoom & { channel: string };
export interface SharedChatRoom { id: string; name: string; icon: string; description: string; space?: string }
export interface SharedChatSpace { id: string; name: string; icon: string }
export type ChatShareTarget = SessionRoom & { name: string };
export interface PrivateChatMessageContext {
  readonly scope: string;
  readonly channel: string;
  readonly sequence: number;
  readonly source: "history" | "live" | "self";
}
