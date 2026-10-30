import { reactive } from "vue";
import { gitHubService } from "../services/github.service";
import { createGitHubReadHeaders } from "./api-client";
import { markdownAstEngine } from "../utils/markdown-ast";
import type { GitHubNotificationItem } from "./github-notifications-store";

export interface GitHubReactionItem {
  emoji: string;
  count: number;
}

export interface GitHubNotificationDetailComment {
  id: number | string;
  author: {
    login: string;
    avatarUrl: string;
    association?: string;
  };
  createdAt: string;
  formattedTime: string;
  body: string;
  bodyHtml: string;
  reactions?: GitHubReactionItem[];
  replies?: GitHubNotificationDetailComment[];
}

export interface GitHubNotificationDetailData {
  notificationId: string;
  title: string;
  number?: number | string;
  state?: string; // "open" | "closed" | "merged" | "completed" | "success" | "failure"
  category?: {
    name: string;
    emoji?: string;
  };
  author: {
    login: string;
    avatarUrl: string;
    association?: string;
  };
  createdAt: string;
  formattedTime: string;
  body: string;
  bodyHtml: string;
  htmlUrl: string;
  commentsCount: number;
  totalRepliesCount?: number;
  comments: GitHubNotificationDetailComment[];
  reactions?: GitHubReactionItem[];
  repositoryFullName: string;
  type: string;
}

export interface GitHubNotificationDetailState {
  isOpen: boolean;
  loading: boolean;
  error: string;
  data: GitHubNotificationDetailData | null;
  notificationItem: GitHubNotificationItem | null;
}

export const gitHubNotificationDetailState = reactive<GitHubNotificationDetailState>({
  isOpen: false,
  loading: false,
  error: "",
  data: null,
  notificationItem: null,
});

function formatRelativeTime(isoStr: string): string {
  try {
    const diff = Date.now() - new Date(isoStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}天前`;
    const d = new Date(isoStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  } catch {
    return "";
  }
}

function translateAssociation(role?: string): string {
  switch (role) {
    case "OWNER":
      return "所有者";
    case "MEMBER":
      return "成员";
    case "COLLABORATOR":
      return "维护者";
    case "CONTRIBUTOR":
      return "贡献者";
    case "FIRST_TIME_CONTRIBUTOR":
      return "初次贡献";
    case "FIRST_TIMER":
      return "新人";
    case "AUTHOR":
      return "作者";
    case "NONE":
    default:
      return ""; // 不渲染任何 NONE 或生僻字段
  }
}

function formatGitHubEmoji(code?: string): string {
  if (!code) return "";
  const map: Record<string, string> = {
    ":triangular_flag_on_post:": "🚩",
    ":speech_balloon:": "💬",
    ":bulb:": "💡",
    ":mega:": "📢",
    ":sparkles:": "✨",
    ":books:": "📚",
    ":tada:": "🎉",
    ":pray:": "🙏",
    ":question:": "❓",
    ":hammer:": "🔨",
    ":zap:": "⚡",
    ":fire:": "🔥",
    ":heart:": "❤️",
    ":rocket:": "🚀",
    ":eyes:": "👀",
  };
  return map[code] || (code.startsWith(":") && code.endsWith(":") ? code.slice(1, -1) : code);
}

function parseGraphQLReactions(reactionGroups?: any[]): GitHubReactionItem[] {
  if (!Array.isArray(reactionGroups)) return [];
  const map: Record<string, string> = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀",
  };
  return reactionGroups
    .map((r) => ({
      emoji: map[r.content] || r.content,
      count: r.reactors?.totalCount || r.users?.totalCount || 0,
    }))
    .filter((r) => r.count > 0);
}

function parseRestReactions(reactionsObj?: any): GitHubReactionItem[] {
  if (!reactionsObj || typeof reactionsObj !== "object") return [];
  const map: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
  };
  const list: GitHubReactionItem[] = [];
  for (const [key, emoji] of Object.entries(map)) {
    const count = Number(reactionsObj[key] || 0);
    if (count > 0) list.push({ emoji, count });
  }
  return list;
}

async function renderWithOfficialMarkdown(text: string, token: string): Promise<string> {
  if (!text) return "";
  try {
    const res = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...createGitHubReadHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, mode: "gfm" }),
    });
    if (res.ok) {
      return await res.text();
    }
  } catch {}
  return markdownAstEngine.renderMarkdown(text);
}

async function fetchDiscussionDetail(
  owner: string,
  repo: string,
  num: number,
  token: string
): Promise<Partial<GitHubNotificationDetailData> | null> {
  const query = `
    query($owner: String!, $name: String!, $num: Int!) {
      repository(owner: $owner, name: $name) {
        discussion(number: $num) {
          title
          body
          bodyHTML
          author { login avatarUrl }
          authorAssociation
          createdAt
          url
          category {
            name
            emoji
          }
          reactionGroups {
            content
            reactors {
              totalCount
            }
          }
          comments(first: 30) {
            totalCount
            nodes {
              id
              body
              bodyHTML
              createdAt
              author { login avatarUrl }
              authorAssociation
              reactionGroups {
                content
                reactors {
                  totalCount
                }
              }
              replies(first: 30) {
                totalCount
                nodes {
                  id
                  body
                  bodyHTML
                  createdAt
                  author { login avatarUrl }
                  authorAssociation
                  reactionGroups {
                    content
                    reactors {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...createGitHubReadHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { owner, name: repo, num },
      }),
    });

    if (!res.ok) return null;
    const json = await res.json();
    const disc = json?.data?.repository?.discussion;
    if (!disc) return null;

    let totalRepliesCount = 0;
    const comments: GitHubNotificationDetailComment[] = (disc.comments?.nodes || []).map((c: any) => {
      const repliesNodes = c.replies?.nodes || [];
      totalRepliesCount += repliesNodes.length;

      const replies: GitHubNotificationDetailComment[] = repliesNodes.map((r: any) => ({
        id: r.id,
        author: {
          login: r.author?.login || "匿名",
          avatarUrl: r.author?.avatarUrl || "",
          association: translateAssociation(r.authorAssociation),
        },
        createdAt: r.createdAt,
        formattedTime: formatRelativeTime(r.createdAt),
        body: r.body || "",
        bodyHtml: r.bodyHTML || (r.body ? markdownAstEngine.renderMarkdown(r.body) : ""),
        reactions: parseGraphQLReactions(r.reactionGroups),
      }));

      return {
        id: c.id,
        author: {
          login: c.author?.login || "匿名",
          avatarUrl: c.author?.avatarUrl || "",
          association: translateAssociation(c.authorAssociation),
        },
        createdAt: c.createdAt,
        formattedTime: formatRelativeTime(c.createdAt),
        body: c.body || "",
        bodyHtml: c.bodyHTML || (c.body ? markdownAstEngine.renderMarkdown(c.body) : "<p>（评论内容为空）</p>"),
        reactions: parseGraphQLReactions(c.reactionGroups),
        replies,
      };
    });

    const rawBody = disc.body || "";
    // 双保险：优先使用官方 bodyHTML，若短于10字符则由自研 MarkdownAstEngine 完整转换输出
    const bodyHtml = (disc.bodyHTML && disc.bodyHTML.trim().length > 10)
      ? disc.bodyHTML
      : (rawBody ? markdownAstEngine.renderMarkdown(rawBody) : "<p>（主贴内容为空）</p>");

    return {
      title: disc.title,
      number: num,
      state: "discussion",
      category: disc.category
        ? {
            name: disc.category.name,
            emoji: formatGitHubEmoji(disc.category.emoji),
          }
        : undefined,
      author: {
        login: disc.author?.login || "未知",
        avatarUrl: disc.author?.avatarUrl || "",
        association: translateAssociation(disc.authorAssociation),
      },
      createdAt: disc.createdAt,
      formattedTime: formatRelativeTime(disc.createdAt),
      body: rawBody,
      bodyHtml,
      htmlUrl: disc.url,
      commentsCount: disc.comments?.totalCount || comments.length,
      totalRepliesCount,
      comments,
      reactions: parseGraphQLReactions(disc.reactionGroups),
    };
  } catch {
    return null;
  }
}

export const gitHubNotificationDetailController = {
  async open(item: GitHubNotificationItem): Promise<void> {
    gitHubNotificationDetailState.isOpen = true;
    gitHubNotificationDetailState.loading = true;
    gitHubNotificationDetailState.error = "";
    gitHubNotificationDetailState.data = null;
    gitHubNotificationDetailState.notificationItem = item;

    const token = gitHubService.token?.trim() || "";
    const headers = {
      ...createGitHubReadHeaders(token),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    try {
      const subjectUrl = item.subject?.url;
      const type = item.subject?.type;
      const repoFullName = item.repository?.fullName || "";
      const [owner, repoName] = repoFullName.split("/");

      // 提取目标编号 (如 #57)
      const numMatch = subjectUrl?.match(/\/(\d+)$/);
      const targetNumber = numMatch ? Number(numMatch[1]) : undefined;

      // 1. 如果是 Discussion
      if (type === "Discussion" && owner && repoName && targetNumber) {
        const discData = await fetchDiscussionDetail(owner, repoName, targetNumber, token);
        if (discData) {
          gitHubNotificationDetailState.data = {
            notificationId: item.id,
            title: discData.title || item.subject.title,
            number: targetNumber,
            state: "discussion",
            category: discData.category,
            author: discData.author || { login: item.repository.owner.login, avatarUrl: item.repository.owner.avatarUrl || "" },
            createdAt: discData.createdAt || item.updatedAt,
            formattedTime: discData.formattedTime || item.formattedTime,
            body: discData.body || "",
            bodyHtml: discData.bodyHtml || (discData.body ? markdownAstEngine.renderMarkdown(discData.body) : ""),
            htmlUrl: discData.htmlUrl || item.htmlUrl,
            commentsCount: discData.commentsCount || 0,
            totalRepliesCount: discData.totalRepliesCount || 0,
            comments: discData.comments || [],
            reactions: discData.reactions || [],
            repositoryFullName: repoFullName,
            type: "Discussion",
          };
          return;
        }
      }

      // 2. 如果有 subjectUrl，通过 REST 请求目标详情 (Issue, PullRequest, Release, etc.)
      if (subjectUrl) {
        const res = await fetch(subjectUrl, { headers, cache: "no-store" });
        if (res.ok) {
          const detail = await res.json();

          let comments: GitHubNotificationDetailComment[] = [];
          if (detail.comments_url && detail.comments > 0) {
            try {
              const cRes = await fetch(`${detail.comments_url}?per_page=50`, { headers, cache: "no-store" });
              if (cRes.ok) {
                const cList = await cRes.json();
                if (Array.isArray(cList)) {
                  comments = await Promise.all(
                    cList.map(async (c: any) => {
                      const cHtml = c.body_html || (c.body ? await renderWithOfficialMarkdown(c.body, token) : "");
                      return {
                        id: c.id,
                        author: {
                          login: c.user?.login || "匿名",
                          avatarUrl: c.user?.avatar_url || "",
                          association: translateAssociation(c.author_association),
                        },
                        createdAt: c.created_at,
                        formattedTime: formatRelativeTime(c.created_at),
                        body: c.body || "",
                        bodyHtml: cHtml,
                        reactions: parseRestReactions(c.reactions),
                      };
                    })
                  );
                }
              }
            } catch (err) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", err);
            }
          }

          const rawBody = detail.body || "";
          let bodyHtml = detail.body_html || "";
          if (!bodyHtml && rawBody) {
            bodyHtml = await renderWithOfficialMarkdown(rawBody, token);
          }
          if (!bodyHtml && rawBody) {
            bodyHtml = markdownAstEngine.renderMarkdown(rawBody);
          }

          gitHubNotificationDetailState.data = {
            notificationId: item.id,
            title: detail.title || detail.name || item.subject.title,
            number: detail.number || targetNumber,
            state: detail.merged ? "merged" : (detail.state || (detail.conclusion || "open")),
            author: {
              login: detail.user?.login || detail.author?.login || item.repository.owner.login,
              avatarUrl: detail.user?.avatar_url || detail.author?.avatar_url || item.repository.owner.avatarUrl || "",
              association: translateAssociation(detail.author_association),
            },
            createdAt: detail.created_at || detail.published_at || item.updatedAt,
            formattedTime: formatRelativeTime(detail.created_at || detail.published_at || item.updatedAt),
            body: rawBody,
            bodyHtml: bodyHtml || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: detail.html_url || item.htmlUrl,
            commentsCount: typeof detail.comments === "number" ? detail.comments : comments.length,
            comments,
            reactions: parseRestReactions(detail.reactions),
            repositoryFullName: repoFullName,
            type: type || "Issue",
          };
          return;
        }
      }

      // 3. Fallback: 使用通知元数据
      gitHubNotificationDetailState.data = {
        notificationId: item.id,
        title: item.subject.title,
        number: targetNumber,
        state: "open",
        author: {
          login: item.repository.owner.login,
          avatarUrl: item.repository.owner.avatarUrl || "",
        },
        createdAt: item.updatedAt,
        formattedTime: item.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: item.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: repoFullName,
        type: type || "通知",
      };
    } catch (err: any) {
      console.warn("[GitHubNotificationDetail] 读取异常:", err);
      gitHubNotificationDetailState.error = err?.message || "网络请求异常";
    } finally {
      gitHubNotificationDetailState.loading = false;
    }
  },

  close(): void {
    gitHubNotificationDetailState.isOpen = false;
    gitHubNotificationDetailState.data = null;
    gitHubNotificationDetailState.error = "";
  },
};
