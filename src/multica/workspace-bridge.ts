import { reactive } from "vue";
import type { ResourceAttachment } from "./resource-content";

export type AiWorkspaceRequest =
  | { id: number; kind: "draft"; text: string; resource?: ResourceAttachment }
  | { id: number; kind: "deepseek"; conversationId: string };
export const aiWorkspaceBridge = reactive<{ pending: AiWorkspaceRequest | null }>({ pending: null });
let sequence = 0;
export function requestAiDraft(text: string, resource?: ResourceAttachment): void { aiWorkspaceBridge.pending = { id: ++sequence, kind: "draft", text, resource }; }
export function requestAiConversation(kind: "deepseek", value: string): void {
  if (kind === "deepseek") aiWorkspaceBridge.pending = { id: ++sequence, kind, conversationId: value };
}
