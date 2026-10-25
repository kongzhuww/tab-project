import { notifications } from "../sdk/notifications";
import { windowManagerController } from "../core/window-manager.store";
import { chatModuleState, type ChatMessage } from "./chat-state";
import { privateChatState } from "./private-chat-client";
import { safeImageUrl } from "./chat-security";

export function formatMessageNotificationPreview(msg: ChatMessage): string {
  switch (msg.type) {
    case "music": {
      const title = msg.meta?.musicTitle || "未知曲目";
      const artist = msg.meta?.musicArtist ? ` - ${msg.meta.musicArtist}` : "";
      return `🎵 音乐分享: 《${title}》${artist}`;
    }
    case "bilibili":
      return `📺 B站视频: ${msg.meta?.videoTitle || "视频分享"}`;
    case "bili_series":
      return `📻 B站电台: ${msg.meta?.seriesName || "系列分享"}`;
    case "github": {
      const repo = msg.meta?.repoOwner && msg.meta?.repoName ? `${msg.meta.repoOwner}/${msg.meta.repoName}` : (msg.meta?.repoName || "GitHub仓库");
      return `🐙 GitHub仓库: ${repo}`;
    }
    case "aihot":
      return `🔥 AI资讯: ${msg.meta?.aihotTitle || "资讯分享"}`;
    case "youtube":
      return `▶️ YouTube: ${msg.meta?.youtubeTitle || "视频分享"}`;
    case "image":
      return `🖼️ [图片]`;
    case "website":
      return `🔗 网页分享: ${msg.meta?.linkTitle || msg.meta?.linkUrl || "网页"}`;
    case "music_party":
      return `🎧 一起听: 《${msg.meta?.partyTitle || "音乐派对"}》`;
    case "server_invite":
      return `🏠 邀请加入: ${msg.meta?.inviteServerName || msg.meta?.inviteRoom || "聊天室"}`;
    default:
      return msg.content || "收到一条新消息";
  }
}

export function notifyIncomingChatMessage(msg: ChatMessage, channelId?: string): void {
  // 聊天窗口已打开时不弹 toast，避免干扰用户聊天
  if (chatModuleState.visible) return;

  const currentChannel = channelId || privateChatState.channel || "main";
  const channelObj = privateChatState.rooms.find((r) => r.id === currentChannel);
  const subtitle = channelObj?.name ? `#${channelObj.name}` : undefined;

  let avatarIcon = "assets/icon-48.png";
  if (msg.sender?.avatar && /^https?:\/\//i.test(msg.sender.avatar)) {
    const safe = safeImageUrl(msg.sender.avatar);
    if (safe) avatarIcon = safe;
  }

  notifications.show({
    id: `chat_msg_${msg.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: avatarIcon,
    title: msg.sender?.name || "新消息",
    subtitle,
    message: formatMessageNotificationPreview(msg),
    duration: 6500,
    level: "info",
    history: true,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      windowManagerController.handleToolClick("chat");
    }
  });
}
