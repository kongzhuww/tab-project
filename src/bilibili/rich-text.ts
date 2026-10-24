/**
 * B站文本富文本分词解析器
 * 1. 自动识别 http/https 链接
 * 2. 自动识别 GitHub 仓库文本格式（如 `GitHub - Celine258/idea-from-limbus-company-dancing-lyrics: ...`）
 * 3. 自动识别 B站 视频号（BV号、av号）并转化为可跳转视频链接
 * 4. 自动识别 B站 表情代号 `[xxx]` 并转化为对应表情图标
 */

export interface BiliRichToken {
  type: "text" | "link" | "emote";
  text: string;
  url?: string;
}

// 常见标点结尾修剪
const TRAILING_PUNCTUATION_REGEX = /[.,;:!?，。；：！？\s]+$/;

// 统一的全局表情静态镜像与映射表缓存
const DEFAULT_EMOTE_CDN = "https://i0.hdslb.com/bfs/emote/";
let globalEmoteMap: Map<string, string> | null = null;
let emoteFetchPromise: Promise<void> | null = null;

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
        for (const pack of res.data.packages) {
          if (Array.isArray(pack.emote)) {
            for (const em of pack.emote) {
              if (em.text && em.url) {
                globalEmoteMap!.set(em.text, String(em.url).replace(/^http:/, "https:"));
              }
            }
          }
        }
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

/**
 * 将普通文本解析为包含链接与表情的 Token 列表
 */
export function parseBiliRichText(
  text: string,
  extraEmotes?: Record<string, string> | Map<string, string>
): BiliRichToken[] {
  if (!text) return [];

  // 合并专属表情映射
  const getEmoteUrl = (key: string): string | undefined => {
    if (extraEmotes instanceof Map) {
      if (extraEmotes.has(key)) return extraEmotes.get(key);
    } else if (extraEmotes && typeof extraEmotes === "object") {
      if (key in extraEmotes) return extraEmotes[key];
    }
    return globalEmoteMap?.get(key);
  };

  const pattern = new RegExp(
    [
      // 1. 标准 HTTP/HTTPS 链接
      "(https?:\\/\\/[^\\s\\u4e00-\\u9fa5<>\"'()\\[\\]]+)",
      // 2. GitHub 仓库标记文本: GitHub - user/repo 或 GitHub: user/repo
      "(GitHub\\s*[-–—:]\\s*([A-Za-z0-9_.\\-]+)\\/([A-Za-z0-9_.\\-]+))",
      // 3. B站视频号: BV 或 av
      "(\\b(?:BV1[0-9A-Za-z]{9}|av\\d{4,12})\\b)",
      // 4. 表情短码: [xxx]
      "(\\[([^\\s\\]\\r\\n]{1,32})\\])"
    ].join("|"),
    "g"
  );

  const tokens: BiliRichToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // 标准链接
      const raw = match[1];
      const cleaned = raw.replace(TRAILING_PUNCTUATION_REGEX, "");
      tokens.push({ type: "link", text: cleaned, url: cleaned });
      if (cleaned.length < raw.length) {
        tokens.push({ type: "text", text: raw.slice(cleaned.length) });
      }
    } else if (match[2]) {
      // GitHub 仓库文本简记
      const user = match[3];
      const repo = match[4];
      tokens.push({
        type: "link",
        text: match[2],
        url: `https://github.com/${user}/${repo}`
      });
    } else if (match[5]) {
      // B站视频号
      const vid = match[5];
      tokens.push({
        type: "link",
        text: vid,
        url: `https://www.bilibili.com/video/${vid}`
      });
    } else if (match[6]) {
      // 表情
      const fullEmote = match[6];
      const emoteUrl = getEmoteUrl(fullEmote);
      if (emoteUrl) {
        tokens.push({ type: "emote", text: fullEmote, url: emoteUrl });
      } else {
        tokens.push({ type: "text", text: fullEmote });
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", text: text.slice(lastIndex) });
  }

  return tokens;
}
