/**
 * B站文本富文本分词解析器
 * 1. 自动识别 http/https 链接与常见裸域名
 * 2. 自动识别 GitHub 仓库文本格式（如 `GitHub - user/repo`）
 * 3. 自动识别 B站 视频号（BV号、av号）并转化为可跳转视频链接
 * 4. 自动识别 B站 表情代号 `[xxx]`（含带空格的长名称动态/装扮表情）并转化为对应表情图标
 * 5. 自动识别 `@用户名` 提及并转化为可点击蓝色个人主页 / 搜索链接
 */

export interface BiliRichToken {
  type: "text" | "link" | "emote" | "mention";
  text: string;
  url?: string;
}

// 常见标点结尾修剪
const TRAILING_PUNCTUATION_REGEX = /[.,;:!?，。；：！？\s]+$/;

let globalEmoteMap: Map<string, string> | null = null;
let emoteFetchPromise: Promise<void> | null = null;
const emoteListeners = new Set<() => void>();

function notifyEmoteListeners(): void {
  for (const listener of emoteListeners) {
    try {
      listener();
    } catch {}
  }
}

export function onGlobalBiliEmotesLoaded(listener: () => void): () => void {
  emoteListeners.add(listener);
  return () => emoteListeners.delete(listener);
}

export function extractBiliCommentEmotes(content: any): Record<string, string> {
  const emotes: Record<string, string> = {};
  if (content?.emote && typeof content.emote === "object") {
    for (const [key, val] of Object.entries(content.emote)) {
      const u = (val as any)?.url || (val as any)?.gif_url;
      if (typeof u === "string" && u) {
        emotes[key] = u.replace(/^http:/i, "https:");
      }
    }
  }
  return emotes;
}

export function extractBiliCommentMentions(content: any): Record<string, string> {
  const mentions: Record<string, string> = {};
  if (content?.at_name_to_mid && typeof content.at_name_to_mid === "object") {
    for (const [name, mid] of Object.entries(content.at_name_to_mid)) {
      const cleanName = String(name || "").trim();
      const cleanMid = mid !== undefined && mid !== null ? String(mid).trim() : "";
      if (cleanName && /^\d+$/.test(cleanMid)) {
        mentions[cleanName] = cleanMid;
      }
    }
  }
  if (Array.isArray(content?.members)) {
    for (const m of content.members) {
      const cleanName = String(m?.uname || "").trim();
      const cleanMid = m?.mid !== undefined && m?.mid !== null ? String(m.mid).trim() : "";
      if (cleanName && /^\d+$/.test(cleanMid) && !mentions[cleanName]) {
        mentions[cleanName] = cleanMid;
      }
    }
  }
  return mentions;
}

export async function ensureGlobalBiliEmotes(): Promise<Map<string, string>> {
  if (globalEmoteMap && globalEmoteMap.size > 0) return globalEmoteMap;
  if (!globalEmoteMap) globalEmoteMap = new Map();

  if (emoteFetchPromise) {
    await emoteFetchPromise;
    return globalEmoteMap;
  }

  emoteFetchPromise = (async () => {
    try {
      const resp = await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", {
        credentials: "include"
      });
      const res = await resp.json();
      if (res?.code === 0 && Array.isArray(res?.data?.packages)) {
        let added = false;
        for (const pack of res.data.packages) {
          if (Array.isArray(pack.emote)) {
            for (const em of pack.emote) {
              if (em.text && (em.url || em.gif_url)) {
                globalEmoteMap!.set(em.text, String(em.url || em.gif_url).replace(/^http:/i, "https:"));
                added = true;
              }
            }
          }
        }
        if (added) notifyEmoteListeners();
      }
    } catch {
      // 网络离线或未登录时允许静默降级
    } finally {
      emoteFetchPromise = null;
    }
  })();

  await emoteFetchPromise;
  return globalEmoteMap;
}

/**
 * 触发异步后台预热表情表
 */
if (typeof window !== "undefined") {
  void ensureGlobalBiliEmotes();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeMentionsMap(
  mentions?: Record<string, string | number> | Map<string, string | number>
): Map<string, string> {
  const map = new Map<string, string>();
  if (!mentions) return map;
  const entries = mentions instanceof Map ? mentions.entries() : Object.entries(mentions);
  for (const [name, mid] of entries) {
    const cleanName = String(name || "").trim();
    const cleanMid = mid !== undefined && mid !== null ? String(mid).trim() : "";
    if (cleanName && /^\d+$/.test(cleanMid)) {
      map.set(cleanName, cleanMid);
    }
  }
  return map;
}

/**
 * 将普通文本解析为包含链接、表情与 @提及 的 Token 列表
 */
export function parseBiliRichText(
  text: string,
  extraEmotes?: Record<string, string> | Map<string, string>,
  mentions?: Record<string, string | number> | Map<string, string | number>
): BiliRichToken[] {
  if (!text) return [];

  const getEmoteUrl = (key: string): string | undefined => {
    if (extraEmotes instanceof Map) {
      if (extraEmotes.has(key)) return extraEmotes.get(key);
    } else if (extraEmotes && typeof extraEmotes === "object") {
      if (key in extraEmotes) return extraEmotes[key];
    }
    return globalEmoteMap?.get(key);
  };

  const mentionMap = normalizeMentionsMap(mentions);
  const mentionNames = Array.from(mentionMap.keys()).sort((a, b) => b.length - a.length);

  const parts = [
    // 1. 标准 HTTP/HTTPS 链接（或常见裸域名如 github.com/xxx, bilibili.com/xxx）
    "(?<url>(?:https?:\\/\\/|(?<![\\w@])(?:[a-zA-Z0-9-]+\\.)+(?:com|cn|net|org|io|me|cc|tv|xyz|top|app|dev|site|vip)(?:\\/[^\\s\\u4e00-\\u9fa5<>\"'()\\[\\]]*)?)[^\\s\\u4e00-\\u9fa5<>\"'()\\[\\]]*)",
    // 2. GitHub 仓库标记文本: GitHub - user/repo 或 GitHub: user/repo
    "(?<gh>GitHub\\s*[-–—:]\\s*(?<ghUser>[A-Za-z0-9_.\\-]+)\\/(?<ghRepo>[A-Za-z0-9_.\\-]+))",
    // 3. B站视频号: BV 或 av
    "(?<bvid>\\b(?:BV1[0-9A-Za-z]{9}|av\\d{4,12})\\b)",
    // 4. 表情短码: [xxx]（支持带空格的装扮/动态表情名）
    "(?<emote>\\[[^\\]\\r\\n]{1,64}\\])"
  ];

  if (mentionNames.length > 0) {
    const escaped = mentionNames.map(escapeRegExp).join("|");
    parts.push(
      `(?<![A-Za-z0-9_.])@(?<knownMention>${escaped})(?=$|[\\s:：,，;；!！?？\\[\\]<>()（）"'~·。])`
    );
  }

  parts.push("(?<![A-Za-z0-9_.])@(?<mention>[A-Za-z0-9_\\-\\u4e00-\\u9fa5\\u3040-\\u30ff]{1,32})");

  const pattern = new RegExp(parts.join("|"), "g");

  const tokens: BiliRichToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }

    const groups = match.groups || {};
    if (groups.url) {
      const raw = groups.url;
      const cleaned = raw.replace(TRAILING_PUNCTUATION_REGEX, "");
      const fullUrl = /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
      tokens.push({ type: "link", text: cleaned, url: fullUrl });
      if (cleaned.length < raw.length) {
        tokens.push({ type: "text", text: raw.slice(cleaned.length) });
      }
    } else if (groups.gh && groups.ghUser && groups.ghRepo) {
      tokens.push({
        type: "link",
        text: groups.gh,
        url: `https://github.com/${groups.ghUser}/${groups.ghRepo}`
      });
    } else if (groups.bvid) {
      const vid = groups.bvid;
      tokens.push({
        type: "link",
        text: vid,
        url: `https://www.bilibili.com/video/${vid}`
      });
    } else if (groups.emote) {
      const fullEmote = groups.emote;
      const emoteUrl = getEmoteUrl(fullEmote);
      if (emoteUrl) {
        tokens.push({ type: "emote", text: fullEmote, url: emoteUrl });
      } else {
        tokens.push({ type: "text", text: fullEmote });
      }
    } else if (groups.knownMention) {
      const uname = groups.knownMention;
      const mid = mentionMap.get(uname);
      tokens.push({
        type: "mention",
        text: `@${uname}`,
        url: mid ? `https://space.bilibili.com/${mid}` : `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(uname)}`
      });
    } else if (groups.mention) {
      const uname = groups.mention;
      const mid = mentionMap.get(uname);
      tokens.push({
        type: "mention",
        text: `@${uname}`,
        url: mid ? `https://space.bilibili.com/${mid}` : `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(uname)}`
      });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", text: text.slice(lastIndex) });
  }

  return tokens;
}
