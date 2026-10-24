import { chatModuleState, type ChatMessage, type ChatUserInfo, type FriendRequest } from "./chat-state";
import { notifications } from "../sdk/notifications";
import { safeExternalUrl } from "./chat-security";
import { installPrivateChat, ensurePrivateChat, restartPrivateChat, stopPrivateChat, sendPrivateMessage, sendPrivateShare, sendPrivateFriendRequest, respondPrivateFriendRequest, type ChatShareTarget } from "./private-chat-client";

// Sharing helpers stay public; transport is now the single self-hosted HTTPS path.
class ChatService {
  constructor() { installPrivateChat(); }
  public connect(): void { ensurePrivateChat(); }
  public disconnect(): void { stopPrivateChat(); }
  public resetReconnectAndConnect(): void { restartPrivateChat(); }
  public async retryMessage(message: ChatMessage): Promise<void> { await sendPrivateMessage(message); }
  private dispatchOutgoing(message: ChatMessage, target?: ChatShareTarget): void {
    if (!target) { void sendPrivateMessage(message); return; }
    void sendPrivateShare(message, target).then(() => {
      notifications.fetch("海狸聊天室", `已发送到 ${target.name}`, "服务器已保存，不代表成员已读。");
    }).catch(error => { notifications.fetch("海狸聊天室", "分享未确认", error instanceof Error ? error.message : "未确认发送结果，请检查聊天室连接。"); });
  }
  public sendWebsiteShare(link: { title: string; url: string; icon?: string; note?: string }, target: ChatShareTarget): void {
    const url = safeExternalUrl(link.url);
    if (!url) { notifications.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。"); return; }
    const title = (link.title || "网站").slice(0, 100);
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "website",
      content: `分享了常用网站：${title}`,
      meta: {
        linkTitle: title,
        linkUrl: url,
        linkIcon: link.icon || "",
        linkNote: (link.note || "").slice(0, 200)
      },
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }
  public async sendTextMessage(text: string, target?: ChatShareTarget): Promise<boolean> {
    const trimmed = text.trim();
    if (!trimmed) return false;

    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "text",
      content: trimmed,
      timestamp: Date.now()
    };

    if (!target) return sendPrivateMessage(msg);
    try { await sendPrivateShare(msg, target); return true; }
    catch (error) {
      notifications.fetch("海狸聊天室", "分享未确认", error instanceof Error ? error.message : "未确认发送结果，请检查聊天室连接。");
      return false;
    }
  }

  public sendMusicShare(meta: {
    musicTitle: string;
    musicArtist: string;
    musicCover?: string;
    musicUrl?: string;
    neteaseId?: string | number;
    sirenCid?: string | number;
    rawSong?: any;
  }, target?: ChatShareTarget): void {
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "music",
      content: `正在听：${meta.musicTitle} - ${meta.musicArtist}`,
      meta,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }

  public sendBiliShare(video: {
    bvid?: string;
    aid?: string | number;
    title: string;
    cover: string;
    upName?: string;
    upMid?: string | number;
    upFace?: string;
    upFans?: string | number;
    play?: string | number;
    like?: string | number;
    danmaku?: string | number;
  }, target?: ChatShareTarget): void {
    const meta: ChatMessage["meta"] = {
      bvid: video.bvid || (video.aid ? `av${video.aid}` : ""),
      aid: video.aid,
      videoTitle: video.title,
      videoCover: video.cover,
      upName: video.upName || "UP主",
      upMid: video.upMid,
      upFace: video.upFace,
      upFans: video.upFans,
      playCount: video.play,
      likeCount: video.like,
      danmakuCount: video.danmaku,
      isHot: true
    };
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "bilibili",
      content: `分享了B站视频：${video.title}`,
      meta,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }

  public sendGitHubShare(repo: {
    fullName: string;
    name?: string;
    owner?: string;
    ownerAvatar?: string;
    desc?: string;
    language?: string;
    stars?: number | string;
    category?: string;
    url?: string;
    updatedAt?: string;
  }, target?: ChatShareTarget): void {
    const meta: ChatMessage["meta"] = {
      repoFullName: repo.fullName,
      repoName: repo.name || repo.fullName.split("/")[1] || repo.fullName,
      repoOwner: repo.owner || repo.fullName.split("/")[0] || "",
      repoOwnerAvatar: repo.ownerAvatar,
      repoDesc: repo.desc || "暂无描述",
      repoLanguage: repo.language || "Plain Text",
      repoStars: repo.stars || 0,
      repoCategory: repo.category || "未分类",
      repoUrl: repo.url || `https://github.com/${repo.fullName}`,
      repoUpdatedAt: repo.updatedAt || new Date().toISOString().split("T")[0]
    };
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "github",
      content: `分享了GitHub仓库：${repo.fullName}`,
      meta,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }

  public sendBiliSeriesShare(series: {
    id: string;
    name: string;
    count: number;
    items: Array<{
      id?: string;
      aid?: string;
      bvid?: string;
      title: string;
      cover?: string;
      author?: string;
      duration?: string | number;
    }>;
  }, target?: ChatShareTarget): void {
    const meta: ChatMessage["meta"] = {
      seriesId: series.id,
      seriesName: series.name,
      seriesCount: series.count,
      seriesItems: series.items.map((it) => ({
        id: it.id,
        aid: it.aid,
        bvid: it.bvid,
        title: it.title,
        cover: it.cover,
        author: it.author,
        duration: it.duration != null ? String(it.duration) : undefined
      }))
    };
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "bili_series",
      content: `分享了B站电台系列：${series.name} (${series.count}首)`,
      meta,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }

  public async sendImageMessage(dataUrl: string): Promise<boolean> {
    if (!dataUrl) return false;
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: dataUrl
      },
      timestamp: Date.now()
    };
    return sendPrivateMessage(msg);
  }

  public sendAiHotShare(article: {
    title: string;
    summary?: string;
    sourceName?: string;
    category?: string;
    url: string;
    published?: string;
  }, target?: ChatShareTarget): void {
    const meta: ChatMessage["meta"] = {
      aihotTitle: article.title,
      aihotSummary: article.summary,
      aihotSource: article.sourceName || "AI资讯",
      aihotCategory: article.category || "AI HOT",
      aihotUrl: article.url,
      aihotDate: article.published
    };
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "aihot",
      content: `分享了AI热点：${article.title}`,
      meta,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }

  public sendYouTubeShare(video: {
    id: string;
    title: string;
    cover: string;
    author?: string;
    views?: string | number;
    url?: string;
  }, target?: ChatShareTarget): void {
    const meta: ChatMessage["meta"] = {
      youtubeId: video.id,
      youtubeTitle: video.title,
      youtubeCover: video.cover,
      youtubeAuthor: video.author || "YouTube",
      youtubeViews: video.views,
      youtubeUrl: video.url || `https://www.youtube.com/watch?v=${video.id}`
    };
    const msg: ChatMessage = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...chatModuleState.currentUser, activity: chatModuleState.shareActivity ? chatModuleState.currentUser.activity : undefined },
      type: "youtube",
      content: `分享了YouTube视频：${video.title}`,
      meta,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(msg, target);
  }


  public sendActivity(_activity: unknown): void {
    // Activity is synchronized with the room via periodic sync queries.
  }
  public sendFriendRequest(target: ChatUserInfo, _note?: string): void {
    if (!target.uid || target.uid === chatModuleState.currentUser.uid) return;
    void sendPrivateFriendRequest(target.uid).then(() => {
      notifications.fetch("海狸聊天室", `已向【${target.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch(e => {
      notifications.fetch("海狸聊天室", "好友申请未发送", e instanceof Error ? e.message : "请检查聊天室连接。");
    });
  }
  public respondFriendRequest(request: FriendRequest, accepted: boolean): void {
    if (!request.id) return;
    void respondPrivateFriendRequest(request.id, accepted).then(() => {
      notifications.fetch("海狸聊天室", accepted ? `已通过【${request.from.name}】的好友申请` : "已忽略该申请", accepted ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch(e => {
      notifications.fetch("海狸聊天室", "操作未完成", e instanceof Error ? e.message : "请检查网络。");
    });
  }
}
export const chatService = new ChatService();
