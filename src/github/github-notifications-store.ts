import { reactive, computed } from "vue";
import { gitHubService } from "../services/github.service";
import { createGitHubReadHeaders } from "./api-client";

export interface GitHubNotificationItem {
  id: string;
  unread: boolean;
  reason: string;
  updatedAt: string;
  formattedTime: string;
  subject: {
    title: string;
    url: string;
    type: string;
    latestCommentUrl?: string;
  };
  repository: {
    id: number;
    name: string;
    fullName: string;
    owner: {
      login: string;
      avatarUrl?: string;
    };
    htmlUrl: string;
  };
  url: string;
  htmlUrl: string;
}

export type GitHubNotificationTabKind = "all" | "unread" | "mention" | "author" | "ci";

export interface GitHubNotificationsState {
  isOpen: boolean;
  loading: boolean;
  error: string;
  activeKind: GitHubNotificationTabKind;
  items: GitHubNotificationItem[];
  unreadCount: number;
  lastFetchedAt: number;
}

function resolveHtmlUrl(item: any): string {
  const subjectUrl = item.subject?.url;
  const repoUrl = item.repository?.html_url || "https://github.com";
  if (!subjectUrl) return repoUrl;

  const type = item.subject?.type;
  if (type === "Issue") {
    return subjectUrl.replace("https://api.github.com/repos/", "https://github.com/");
  }
  if (type === "PullRequest") {
    return subjectUrl
      .replace("https://api.github.com/repos/", "https://github.com/")
      .replace("/pulls/", "/pull/");
  }
  if (type === "Release") {
    return subjectUrl
      .replace("https://api.github.com/repos/", "https://github.com/")
      .replace("/releases/", "/releases/tag/");
  }
  if (type === "Discussion") {
    return subjectUrl.replace("https://api.github.com/repos/", "https://github.com/");
  }
  return subjectUrl.replace("https://api.github.com/repos/", "https://github.com/");
}

function formatRelativeTime(isoStr: string): string {
  try {
    const diff = Date.now() - new Date(isoStr).getTime();
    if (diff < 60000) return "刚刚";
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} 分钟前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} 小时前`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} 天前`;
    return isoStr.slice(5, 10);
  } catch {
    return "";
  }
}

export const gitHubNotificationsState = reactive<GitHubNotificationsState>({
  isOpen: false,
  loading: false,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0,
});

export const gitHubNotificationsController = {
  open() {
    gitHubNotificationsState.isOpen = true;
    if (!gitHubNotificationsState.items.length || Date.now() - gitHubNotificationsState.lastFetchedAt > 120000) {
      void this.refresh();
    }
  },

  close() {
    gitHubNotificationsState.isOpen = false;
  },

  toggle() {
    if (gitHubNotificationsState.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  setTab(kind: GitHubNotificationTabKind) {
    gitHubNotificationsState.activeKind = kind;
  },

  async refresh(): Promise<void> {
    const token = gitHubService.token?.trim();
    if (!token) {
      gitHubNotificationsState.items = [];
      gitHubNotificationsState.unreadCount = 0;
      gitHubNotificationsState.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }

    gitHubNotificationsState.loading = true;
    gitHubNotificationsState.error = "";

    try {
      const headers = {
        ...createGitHubReadHeaders(token),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };

      const res = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers,
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("GitHub Token 无效或已过期");
        }
        if (res.status === 403) {
          throw new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。");
        }
        throw new Error(`请求失败 (HTTP ${res.status})`);
      }

      const rawList = await res.json();
      if (!Array.isArray(rawList)) {
        throw new Error("GitHub 返回数据异常");
      }

      const parsed: GitHubNotificationItem[] = rawList.map((item: any) => ({
        id: String(item.id),
        unread: Boolean(item.unread),
        reason: String(item.reason || ""),
        updatedAt: item.updated_at,
        formattedTime: formatRelativeTime(item.updated_at),
        subject: {
          title: String(item.subject?.title || "未命名通知"),
          url: String(item.subject?.url || ""),
          type: String(item.subject?.type || "Issue"),
          latestCommentUrl: item.subject?.latest_comment_url,
        },
        repository: {
          id: Number(item.repository?.id || 0),
          name: String(item.repository?.name || ""),
          fullName: String(item.repository?.full_name || ""),
          owner: {
            login: String(item.repository?.owner?.login || ""),
            avatarUrl: item.repository?.owner?.avatar_url,
          },
          htmlUrl: String(item.repository?.html_url || ""),
        },
        url: String(item.url || ""),
        htmlUrl: resolveHtmlUrl(item),
      }));

      gitHubNotificationsState.items = parsed;
      gitHubNotificationsState.unreadCount = parsed.filter((i) => i.unread).length;
      gitHubNotificationsState.lastFetchedAt = Date.now();
    } catch (err: any) {
      console.warn("[GitHubNotifications] 读取失败:", err);
      gitHubNotificationsState.error = err?.message || "网络请求异常";
    } finally {
      gitHubNotificationsState.loading = false;
    }
  },

  openTarget(item: GitHubNotificationItem) {
    if (typeof window !== "undefined") {
      window.open(item.htmlUrl, "_blank", "noopener,noreferrer");
    }
  },
};
