import type { DockModuleDefinition } from "../modules/registry";
import { chatModuleState } from "./chat-state";
import { chatService } from "./chat.service";
import { privateChatConfigured } from "./private-chat-config";

export const chatDockModule = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => chatModuleState.unreadCount,
  loadView: () => import("./ChatDialog.vue").then((m) => m.default),
  lifecycle: {
    isVisible: () => chatModuleState.visible,
    open: () => {
      chatModuleState.visible = true;
      chatModuleState.unreadCount = 0;
      if (privateChatConfigured.value) chatService.connect();
    },
    hide: () => {
      chatModuleState.visible = false;
    },
    canUnmount: () => true
  }
} satisfies DockModuleDefinition;

// No default endpoint; only explicitly configured private rooms synchronize.
setTimeout(() => {
  if (privateChatConfigured.value) chatService.connect();
}, 1200);
