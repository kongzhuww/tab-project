import { reactive } from "vue";
import type { MulticaIssue } from "../services/multica.service";
import type { ResourceAttachment } from "./resource-content";

export type AiWorkspaceRequest =
  | { id: number; kind: "draft"; text: string; resource?: ResourceAttachment }
  | { id: number; kind: "deepseek"; conversationId: string }
  | { id: number; kind: "multica"; issue: MulticaIssue };
export const aiWorkspaceBridge = reactive<{ pending: AiWorkspaceRequest | null }>({ pending: null });
let sequence = 0;
export function requestAiDraft(text: string, resource?: ResourceAttachment): void { aiWorkspaceBridge.pending = { id: ++sequence, kind: "draft", text, resource }; }
export function requestAiConversation(kind: "deepseek", conversationId: string): void;
export function requestAiConversation(kind: "multica", issue: MulticaIssue): void;
export function requestAiConversation(kind: "deepseek" | "multica", value: string | MulticaIssue): void {
  if (kind === "deepseek" && typeof value === "string") aiWorkspaceBridge.pending = { id: ++sequence, kind, conversationId: value };
  if (kind === "multica" && typeof value !== "string") aiWorkspaceBridge.pending = { id: ++sequence, kind, issue: value };
}
