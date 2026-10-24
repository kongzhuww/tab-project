import type { DockModuleDefinition } from "../modules/registry";
import { chatModuleState } from "./chat-state";
import { chatService } from "./chat.service";
import { privateChatConfigured } from "./private-chat-config";
import { pluginMarketController } from "../modules/market-store";

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
    canOpen: () => pluginMarketController.isInstalled("chat"),
    open: () => {
      if (!pluginMarketController.isInstalled("chat")) return;
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

// The transport watches explicit module enablement and private configuration.
// Registration alone must not start a background connection.
