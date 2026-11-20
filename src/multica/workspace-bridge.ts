import { reactive } from "vue";
import type { ResourceAttachment } from "./resource-content";

export interface AiDraftTarget {
  service: "deepseek" | "native";
  model?: string;
  nativeAgentId?: string;
}

export type AiWorkspaceRequest =
  | { id: number; kind: "draft"; text: string; resource?: ResourceAttachment; target?: AiDraftTarget }
  | { id: number; kind: "deepseek"; conversationId: string };
export const aiWorkspaceBridge = reactive<{ pending: AiWorkspaceRequest | null }>({ pending: null });
let sequence = 0;
export function requestAiDraft(text: string, resource?: ResourceAttachment, target?: AiDraftTarget): void {
  aiWorkspaceBridge.pending = { id: ++sequence, kind: "draft", text, resource, target };
}
export function requestAiConversation(kind: "deepseek", value: string): void {
  if (kind === "deepseek") aiWorkspaceBridge.pending = { id: ++sequence, kind, conversationId: value };
}
