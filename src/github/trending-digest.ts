import { readGitHubJson, createGitHubReadHeaders, loadGitHubReadHeaders, GitHubReadError } from './api-client';
import { readAiReadme } from './ai-request';
import { fetchGitHubTrendingViaNative } from '../services/native-bridge.service';

export type TrendingSincePeriod = 'daily' | 'weekly' | 'monthly';

export interface GitHubTrendingRepoEntry {
  rank: number;
  fullName: string;
  owner: string;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  todayStars: number;
}

export interface GitHubTrendingInspectedRepo extends GitHubTrendingRepoEntry {
  readmeExcerpt: string;
  readmeSource: 'api' | 'raw' | 'description-only';
}

function decodeHtmlEntities(input: string): string {
  return String(input || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => {
      const n = Number(code);
      return Number.isFinite(n) ? String.fromCodePoint(n) : '';
    })
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFormattedCount(raw: string): number {
  const clean = String(raw || '').replace(/,/g, '').trim().toLowerCase();
  if (!clean) return 0;
  if (clean.endsWith('k')) return Math.round(parseFloat(clean) * 1000) || 0;
  if (clean.endsWith('m')) return Math.round(parseFloat(clean) * 1_000_000) || 0;
  const n = Number.parseInt(clean, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function clampTrendingTopN(value: unknown, fallback = 10): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(25, Math.round(n)));
}

/** Parse official `github.com/trending` HTML `<article class="Box-row">` entries without DOM. */
export function parseGitHubTrendingHtml(html: string, topN = 10): GitHubTrendingRepoEntry[] {
  const limit = clampTrendingTopN(topN, 10);
  const rows = String(html || '').match(/<article[^>]*class="[^"]*Box-row[^"]*"[^>]*>[\s\S]*?<\/article>/gi) || [];
  const results: GitHubTrendingRepoEntry[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    if (results.length >= limit) break;
    const h2Match = row.match(/<h2[^>]*>[\s\S]*?<a[^>]*href="\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)"/i);
    const fullName = h2Match?.[1]?.trim() || '';
    if (!fullName || seen.has(fullName) || fullName.split('/').some(part => part === '.' || part === '..')) {
      continue;
    }
    seen.add(fullName);
    const [owner, name] = fullName.split('/');

    const descMatch = row.match(/<p[^>]*class="[^"]*color-fg-muted[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? decodeHtmlEntities(descMatch[1]) : '';

    const langMatch = row.match(/itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/i);
    const language = langMatch ? decodeHtmlEntities(langMatch[1]) : '';

    const starsMatch = row.match(/href="\/[^"]+\/stargazers"[^>]*>[\s\S]*?<\/svg>([\s\S]*?)<\/a>/i);
    const stars = starsMatch ? parseFormattedCount(decodeHtmlEntities(starsMatch[1])) : 0;

    const todayMatch = row.match(/([\d,]+)\s+stars?\s+(?:today|this week|this month)/i);
    const todayStars = todayMatch ? parseFormattedCount(todayMatch[1]) : 0;

    results.push({
      rank: results.length + 1,
      fullName,
      owner,
      name,
      url: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
      description,
      language,
      stars,
      todayStars,
    });
  }

  return results;
}

async function boundedFetchText(url: string, init: RequestInit, maxBytes: number, timeoutMs: number, parent?: AbortSignal): Promise<string> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  parent?.addEventListener('abort', abort, { once: true });
  if (parent?.aborted) controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  try {
    controller.signal.throwIfAborted();
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      credentials: 'omit',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
    });
    if (!response.ok) {
      void response.body?.cancel().catch(() => undefined);
      throw new Error(`HTTP ${response.status}`);
    }
    if (!response.body) throw new Error('Empty response body');
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8', { fatal: false });
    let bytes = 0;
    let text = '';
    try {
      for (;;) {
        controller.signal.throwIfAborted();
        const part = await reader.read();
        if (part.done) break;
        bytes += part.value.byteLength;
        if (bytes > maxBytes) {
          text += decoder.decode(part.value.subarray(0, Math.max(0, maxBytes - (bytes - part.value.byteLength))), { stream: true });
          break;
        }
        text += decoder.decode(part.value, { stream: true });
      }
      return text + decoder.decode();
    } finally {
      void reader.cancel().catch(() => undefined);
      reader.releaseLock();
    }
  } finally {
    clearTimeout(timer);
    parent?.removeEventListener('abort', abort);
  }
}

/** Fetch today's (or weekly/monthly) GitHub Trending Top N repositories, with API Search fallback. */
export async function fetchGitHubTrendingTopRepos(options: {
  topN?: number;
  since?: TrendingSincePeriod;
  signal?: AbortSignal;
} = {}): Promise<{ repos: GitHubTrendingRepoEntry[]; sourceLabel: string }> {
  const topN = clampTrendingTopN(options.topN, 10);
  const since: TrendingSincePeriod = options.since === 'weekly' || options.since === 'monthly' ? options.since : 'daily';

  let trendingErr = '';
  try {
    const html = await boundedFetchText(
      `https://github.com/trending?since=${since}`,
      { headers: { Accept: 'text/html,application/xhtml+xml' } },
      2 * 1024 * 1024,
      15_000,
      options.signal
    );
    const parsed = parseGitHubTrendingHtml(html, topN);
    if (parsed.length > 0) {
      const labelMap: Record<TrendingSincePeriod, string> = {
        daily: 'GitHub 今日官方 Trending 榜',
        weekly: 'GitHub 本周官方 Trending 榜',
        monthly: 'GitHub 本月官方 Trending 榜',
      };
      return { repos: parsed, sourceLabel: labelMap[since] };
    }
    trendingErr = 'Trending HTML 未解析到仓库条目';
  } catch (err) {
    options.signal?.throwIfAborted();
    trendingErr = err instanceof Error ? err.message : String(err);
  }

  // Fallback to GitHub Search API when trending HTML is unreachable
  const days = since === 'weekly' ? 7 : since === 'monthly' ? 30 : 2;
  const date = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  let headers: Record<string, string>;
  try {
    headers = await loadGitHubReadHeaders(options.signal || AbortSignal.timeout(10_000));
  } catch {
    headers = createGitHubReadHeaders('');
  }
  try {
    const { data } = await readGitHubJson<{ items?: any[] }>(
      `/search/repositories?q=${encodeURIComponent(`is:public created:>${date}`)}&sort=stars&order=desc&per_page=${topN}`,
      { headers, signal: options.signal, maxBytes: 2 * 1024 * 1024, timeoutMs: 15_000 }
    );
    const items = Array.isArray(data?.items) ? data.items.slice(0, topN) : [];
    const repos: GitHubTrendingRepoEntry[] = [];
    for (const item of items) {
      const fullName = typeof item?.full_name === 'string' ? item.full_name.trim() : '';
      if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName)) continue;
      const [owner, name] = fullName.split('/');
      repos.push({
        rank: repos.length + 1,
        fullName,
        owner,
        name,
        url: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
        description: typeof item.description === 'string' ? item.description.trim() : '',
        language: typeof item.language === 'string' ? item.language.trim() : '',
        stars: Number(item.stargazers_count) || 0,
        todayStars: 0,
      });
    }
    if (repos.length) {
      return { repos, sourceLabel: `GitHub Search 新星热榜（${date} 起）` };
    }
    throw new Error('Search API 返回空仓库列表');
  } catch (apiErr) {
    options.signal?.throwIfAborted();
    const apiMsg = apiErr instanceof GitHubReadError ? apiErr.message : (apiErr instanceof Error ? apiErr.message : String(apiErr));
    throw new Error(`Trending 网页不可用（${trendingErr}），且 Search API 兜底失败（${apiMsg}）`);
  }
}

export function cleanReadmeExcerpt(raw: string, maxChars = 1600): string {
  const cleaned = String(raw || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<img\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]{600,}?```/g, '[代码示例略]')
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  if (cleaned.length <= maxChars) return cleaned;
  return `${cleaned.slice(0, maxChars).trim()}…`;
}

async function fetchRawReadmeFallback(owner: string, name: string, signal?: AbortSignal): Promise<string> {
  const branches = ['HEAD', 'main', 'master'];
  for (const branch of branches) {
    try {
      const text = await boundedFetchText(
        `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/${branch}/README.md`,
        { headers: { Accept: 'text/plain' } },
        256 * 1024,
        8_000,
        signal
      );
      if (text.trim()) return text;
    } catch {
      signal?.throwIfAborted();
    }
  }
  return '';
}

/** Read README excerpts across all Top N repositories with bounded concurrency. */
export async function inspectGitHubTrendingRepos(
  repos: readonly GitHubTrendingRepoEntry[],
  options: { signal?: AbortSignal; perRepoMaxChars?: number } = {}
): Promise<GitHubTrendingInspectedRepo[]> {
  const perRepoMaxChars = options.perRepoMaxChars ?? 1400;
  let headers: Record<string, string>;
  try {
    headers = await loadGitHubReadHeaders(options.signal || AbortSignal.timeout(10_000));
  } catch {
    headers = createGitHubReadHeaders('');
  }

  const out: GitHubTrendingInspectedRepo[] = new Array(repos.length);
  let cursor = 0;
  const CONCURRENCY = Math.min(3, Math.max(1, repos.length));

  const worker = async () => {
    while (cursor < repos.length) {
      options.signal?.throwIfAborted();
      const idx = cursor++;
      const repo = repos[idx];
      let excerpt = '';
      let readmeSource: 'api' | 'raw' | 'description-only' = 'description-only';

      // Prefer raw.githubusercontent when unauthenticated to preserve GitHub API 60/hr quota.
      const hasToken = Boolean(headers.Authorization);
      if (hasToken) {
        try {
          const rawMd = await readAiReadme(repo.fullName, headers, options.signal);
          excerpt = cleanReadmeExcerpt(rawMd, perRepoMaxChars);
          if (excerpt) readmeSource = 'api';
        } catch {
          options.signal?.throwIfAborted();
        }
      }
      if (!excerpt) {
        const rawText = await fetchRawReadmeFallback(repo.owner, repo.name, options.signal);
        excerpt = cleanReadmeExcerpt(rawText, perRepoMaxChars);
        if (excerpt) readmeSource = 'raw';
      }
      if (!excerpt && !hasToken) {
        try {
          const rawMd = await readAiReadme(repo.fullName, headers, options.signal);
          excerpt = cleanReadmeExcerpt(rawMd, perRepoMaxChars);
          if (excerpt) readmeSource = 'api';
        } catch {
          options.signal?.throwIfAborted();
        }
      }
      if (!excerpt) {
        excerpt = repo.description || '（该仓库未提供 README 说明，请结合仓库描述判断）';
        readmeSource = 'description-only';
      }

      out[idx] = {
        ...repo,
        readmeExcerpt: excerpt,
        readmeSource,
      };
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return out;
}

/**
 * Fetch Top N trending repos + inspect READMEs via direct browser fetch first,
 * falling back to Native Messaging Host (macOS Node.js) if the browser network
 * context cannot reach GitHub (e.g. TUN/DNS split in browser service worker).
 */
export async function collectGitHubTrendingInspected(options: {
  topN?: number;
  since?: TrendingSincePeriod;
  signal?: AbortSignal;
} = {}): Promise<{ repos: GitHubTrendingInspectedRepo[]; sourceLabel: string }> {
  const topN = clampTrendingTopN(options.topN, 10);
  const since: TrendingSincePeriod = options.since === 'weekly' || options.since === 'monthly' ? options.since : 'daily';

  try {
    const fetched = await fetchGitHubTrendingTopRepos({ topN, since, signal: options.signal });
    const inspected = await inspectGitHubTrendingRepos(fetched.repos, { signal: options.signal });
    return { repos: inspected, sourceLabel: fetched.sourceLabel };
  } catch (browserErr) {
    options.signal?.throwIfAborted();
    try {
      const nativeRes = await fetchGitHubTrendingViaNative({ topN, since });
      if (nativeRes.repos.length > 0) {
        return {
          sourceLabel: nativeRes.sourceLabel,
          repos: nativeRes.repos as GitHubTrendingInspectedRepo[],
        };
      }
    } catch (nativeErr) {
      const bMsg = browserErr instanceof Error ? browserErr.message : String(browserErr);
      const nMsg = nativeErr instanceof Error ? nativeErr.message : String(nativeErr);
      throw new Error(`浏览器直连失败：${bMsg}；本机桥接也失败：${nMsg}`);
    }
    throw browserErr;
  }
}

export function buildGitHubTrendingDigestPrompt(
  repos: readonly GitHubTrendingInspectedRepo[],
  options: { sourceLabel: string; since: TrendingSincePeriod; focus?: string; customPrompt?: string }
): string {
  const todayLabel = new Date().toLocaleDateString('zh-CN');
  const focus = String(options.focus || options.customPrompt || '').trim();
  const repoBlocks = repos
    .map(r => [
      `### #${r.rank} ${r.fullName}`,
      `- 链接：${r.url}`,
      `- 语言：${r.language || '未知'} | 总 Star：${r.stars} | 今日新增 Star：${r.todayStars || '未知'}`,
      `- 官方简介：${r.description || '无'}`,
      `- README 实读内容：\n${r.readmeExcerpt}`,
    ].join('\n'))
    .join('\n\n');

  return [
    `你是主人的「GitHub 榜单情报助手」。今天是 ${todayLabel}，数据源为「${options.sourceLabel}」（共抓取前 ${repos.length} 个仓库）。`,
    focus ? `主人本次特别关注方向/筛选要求：${focus}` : '',
    '',
    '请务必基于下面每个仓库的真实简介与 README 内容完成一份结构清晰、干货向的中文巡检报告（禁止虚构未读到的功能），要求：',
    '1. 先输出 **「## 今日榜单结论与真正有作用的推荐」**：明确指出前 ' + repos.length + ' 个仓库里哪些最值得关注、各自适合什么工作流/人群，以及哪些偏刷榜、演示玩具或作用有限；',
    `2. 再输出 **「## Top ${repos.length} 全部仓库逐一介绍（#1 ~ #${repos.length}）」**：**一个不落地把所有 ${repos.length} 个仓库全部过一遍并介绍清楚**，每个仓库统一按以下结构：`,
    '   - `### #序号 仓库全名` + 可点击链接',
    '   - 实用评级：`🌟 推荐关注` / `⚪ 酌情了解` / `⏭️ 作用有限`',
    '   - 一句话定位：它解决什么具体问题',
    '   - 核心能力与亮点：基于 README 提炼 2~3 条核心原理/玩法/支持能力',
    '   - 判断理由：为什么认为它有作用（或作用不大）',
    '',
    '---',
    '以下是逐个读取到的仓库原始材料：',
    '',
    repoBlocks,
  ]
    .filter(Boolean)
    .join('\n');
}

/** Generate a structured Markdown briefing without requiring an LLM API key or local CLI. */
export function buildGitHubTrendingFallbackDigest(
  repos: readonly GitHubTrendingInspectedRepo[],
  options: { sourceLabel: string; since: TrendingSincePeriod; focus?: string }
): string {
  const todayLabel = new Date().toLocaleDateString('zh-CN');
  const periodMap: Record<TrendingSincePeriod, string> = {
    daily: '今日榜单',
    weekly: '本周榜单',
    monthly: '本月榜单',
  };

  const rows = repos
    .map(r => {
      const desc = (r.description || '暂无简介').replace(/\|/g, '\\|').slice(0, 72);
      const lang = (r.language || '未知').replace(/\|/g, '\\|');
      const gain = r.todayStars ? `+${r.todayStars}` : '-';
      return `| #${r.rank} | [${r.fullName}](${r.url}) | ${lang} | ${r.stars} | ${gain} | ${desc} |`;
    })
    .join('\n');

  const details = repos
    .map(r => {
      const snippet = (r.readmeExcerpt || r.description || '暂无详细说明')
        .replace(/\n{3,}/g, '\n\n')
        .slice(0, 420)
        .trim();
      const gainText = r.todayStars ? ` · 近期新增 ${r.todayStars} ★` : '';
      return [
        `### #${r.rank} [${r.fullName}](${r.url})`,
        `- **技术栈与热度**：${r.language || '未标注'} · 总 Star ${r.stars}${gainText}`,
        `- **一句话简介**：${r.description || '仓库暂未填写简介'}`,
        `- **README 核心节选**：`,
        '',
        snippet,
      ].join('\n');
    })
    .join('\n\n---\n\n');

  return [
    `# GitHub ${periodMap[options.since]}基础结构化简报（${todayLabel}）`,
    '',
    `> 💡 **免配置模式直出**：当前尚未配置云端模型 API Key、本机 Ollama 或本机终端，因此为你直接基于「${options.sourceLabel}」前 ${repos.length} 个仓库的真实元信息与 README 整理本简报。前往 **AI 设置 → 模型服务** 填入 DeepSeek / 硅基流动 / Kimi / OpenRouter Key 或连接本机免 Key Ollama 后，可自动升级为 **AI 深度价值筛选与中文拆解报告**。`,
    options.focus ? `\n- **预设关注方向**：${options.focus}` : '',
    '',
    '## 今日上榜总览',
    '',
    '| 排名 | 仓库 | 语言 | 总 Star | 增长 | 简介 |',
    '| --- | --- | --- | --- | --- | --- |',
    rows,
    '',
    `## Top ${repos.length} 全部仓库逐一速览（#1 ~ #${repos.length}）`,
    '',
    details,
  ]
    .filter(v => v !== '')
    .join('\n');
}
