/**
 * AI 智能语义搜索服务 (DeepSeek 驱动)
 * 允许用户在主搜索框中输入 `/ai [自然语言意图]`，
 * 自动分析用户的书签与常用网站，通过 DeepSeek 匹配最贴合意图的目标站点并提供一句话推荐理由。
 */

import type { SearchSuggestionItem } from "./store";
import { launcherService } from "../services/launcher.service";
import { bookmarksService } from "../services/bookmarks.service";
import { optionsService } from "../services/options.service";

interface CandidateSite {
  idx: number;
  id: string;
  title: string;
  url: string;
  domain: string;
  source: "常用网站" | "书签";
  iconSrc?: string;
}

export function isAiSearchCommand(query: string): boolean {
  const q = query.trim().toLowerCase();
  return q === "/ai" || q.startsWith("/ai ") || q.startsWith("/ai:") || q.startsWith("/ai：");
}

export function extractAiPrompt(query: string): string {
  return query.trim().replace(/^\/ai[\s:：]*/i, "").trim();
}

export async function executeAiSearch(
  prompt: string,
  signal: AbortSignal
): Promise<SearchSuggestionItem[]> {
  const trimmedPrompt = prompt.trim();

  // 1. 读取 DeepSeek 配置
  let apiKey = "";
  let baseUrl = "https://api.deepseek.com";
  let model = "deepseek-chat";

  try {
    const cfg = await optionsService.loadGlobalSettings();
    apiKey = String(cfg.deepseekApiKey || "").trim();
    if (cfg.deepseekBaseUrl && String(cfg.deepseekBaseUrl).trim()) {
      baseUrl = String(cfg.deepseekBaseUrl).trim();
    }
    if (cfg.deepseekModel && String(cfg.deepseekModel).trim()) {
      model = String(cfg.deepseekModel).trim();
    }
  } catch {}

  // 2. 如果未配置 API Key，立即提示用户配置
  if (!apiKey) {
    return [
      {
        id: "ai-no-api-key",
        title: "未配置 DeepSeek API Key",
        meta: "点击此处直接打开「设置」，在模块与功能中填写 DeepSeek 密钥即可启用智能搜索",
        type: "open-settings",
        badge: { className: "badge-warning", text: "需配置", icon: "⚙️" }
      }
    ];
  }

  // 3. 用户仅仅输入了 /ai 还未输入具体意图
  if (!trimmedPrompt) {
    return [
      {
        id: "ai-prompt-placeholder",
        title: "🤖 DeepSeek AI 智能语义搜索",
        meta: "输入你想找的网站或书签特征，例如：“/ai 那个做SVG渐变配色的工具” 或 “/ai 查模型价格”",
        badge: { className: "badge-ai", text: "输入意图", icon: "✨" }
      }
    ];
  }

  // 4. 收集候选集（常用网站 + 浏览器书签）
  const candidates: CandidateSite[] = [];
  const seenUrls = new Set<string>();
  let idx = 0;

  // 4.1 常用网站
  try {
    const links = launcherService.getState().links || [];
    for (const link of links) {
      if (!link.url || seenUrls.has(link.url)) continue;
      seenUrls.add(link.url);
      let domain = "";
      try { domain = new URL(link.url).hostname; } catch {}
      let iconSrc = launcherService.getCachedIcon(link.url) || link.customIcon || link.icon || "";
      if (!iconSrc && typeof chrome !== "undefined" && chrome?.runtime?.getURL) {
        iconSrc = chrome.runtime.getURL(`_favicon/?pageUrl=${encodeURIComponent(link.url)}&size=32`);
      }
      candidates.push({
        idx: idx++,
        id: `launcher_${link.id}`,
        title: link.title || link.url,
        url: link.url,
        domain,
        source: "常用网站",
        iconSrc: iconSrc || undefined
      });
      if (candidates.length >= 80) break;
    }
  } catch {}

  // 4.2 浏览器书签
  try {
    await bookmarksService.ensureBookmarkData();
    const bookmarkItems = bookmarksService.importState.items || [];
    const ignored = await bookmarksService.getIgnoredFolders();
    const folderMap = bookmarksService.getBookmarkFolderMap();

    for (const b of bookmarkItems) {
      if (!b.url || b.url.startsWith("javascript:") || seenUrls.has(b.url)) continue;
      if (bookmarksService.isBookmarkIgnored(b, ignored, folderMap)) continue;
      seenUrls.add(b.url);
      let domain = "";
      try { domain = new URL(b.url).hostname; } catch {}
      let iconSrc = "";
      if (typeof chrome !== "undefined" && chrome?.runtime?.getURL) {
        iconSrc = chrome.runtime.getURL(`_favicon/?pageUrl=${encodeURIComponent(b.url)}&size=32`);
      }
      candidates.push({
        idx: idx++,
        id: `bm_${b.id}`,
        title: b.title || b.url,
        url: b.url,
        domain,
        source: "书签",
        iconSrc: iconSrc || undefined
      });
      if (candidates.length >= 100) break;
    }
  } catch {}

  if (!candidates.length) {
    return [
      {
        id: "ai-no-candidates",
        title: "未找到任何书签或常用网站",
        meta: "请先添加常用网站或确认浏览器已授予书签访问权限",
        badge: { className: "badge-warning", text: "无数据", icon: "∅" }
      }
    ];
  }

  // 5. 调用 DeepSeek API 进行语义分析
  const simplifiedList = candidates.map(c => ({
    idx: c.idx,
    title: c.title,
    domain: c.domain
  }));

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const systemPrompt = `你是一个精准的个人书签与网站意图匹配专家。
用户会提供一段模糊的自然语言意图描述，以及用户的书签/常用网站列表。
请分析用户真正想要找的是哪个网站，从列表中挑选出最吻合的 1 到 3 个网站。
必须严格输出纯 JSON 数组，严禁包含任何 Markdown 格式或多余文字。
输出格式规范：
[
  { "idx": 0, "reason": "匹配原因（一句话，必须在25字以内）" }
]
如果列表中完全没有任何一个网站能匹配用户的意图，请输出空数组 []。`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `用户意图：“${trimmedPrompt}”\n候选网站列表：\n${JSON.stringify(simplifiedList)}` }
        ],
        temperature: 0.1,
        max_tokens: 300
      }),
      signal
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`API 响应错误 HTTP ${res.status}: ${errText.slice(0, 100)}`);
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim() || "[]";
    // 清理可能的 markdown 代码块标记
    const cleanJson = rawContent.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();

    let matchedItems: Array<{ idx: number; reason: string }> = [];
    try {
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed)) matchedItems = parsed;
    } catch {}

    if (!matchedItems.length) {
      return [
        {
          id: `ai-empty-${Date.now()}`,
          title: `未在书签和常用网站中找到与 “${trimmedPrompt}” 相关的站点`,
          meta: "可尝试换个描述，或回车通过默认搜索引擎在全网检索",
          badge: { className: "badge-ai", text: "无匹配", icon: "∅" }
        }
      ];
    }

    // 6. 构造匹配成功的展示项
    const results: SearchSuggestionItem[] = [];
    for (const match of matchedItems) {
      const site = candidates.find(c => c.idx === match.idx);
      if (!site) continue;
      results.push({
        id: `ai_match_${site.id}`,
        title: site.title,
        meta: `💡 AI 分析：${match.reason || "符合搜索意图"} · ${site.url}`,
        iconSrc: site.iconSrc,
        url: site.url,
        badge: { className: "badge-ai", text: `AI 精选 · ${site.source}`, icon: "✨" }
      });
    }

    return results;
  } catch (err: any) {
    if (err.name === "AbortError") return [];
    return [
      {
        id: "ai-error",
        title: `DeepSeek 检索失败：${err.message || "请求异常"}`,
        meta: "请检查设置中的 DeepSeek API Key 与服务端点是否正确",
        type: "open-settings",
        badge: { className: "badge-warning", text: "请求失败", icon: "⚠" }
      }
    ];
  }
}
