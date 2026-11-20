import type {
  DigitalEmployee,
  OrganizerWorkspaceSnapshot,
  SiteFinderMatch,
  SiteFinderRecommendation,
  SiteFinderResult,
} from './employee-contract';
import { cleanHttpUrl, organizerModelUrl } from './workspace-organizer';

export interface SiteFinderCandidate {
  id: string;
  source: 'launcher' | 'bookmark';
  title: string;
  url: string;
  modelUrl: string;
  location: string;
  score: number;
}

const TOKEN_SYNONYMS: ReadonlyArray<[RegExp, string[]]> = [
  [/svg|矢量|波浪|背景|渐变|配色|palette|gradient/i, ['svg', 'wave', 'haikei', 'gradient', 'color', 'css', 'design', 'ui', 'bg']],
  [/论文|文献|学术|paper|arxiv/i, ['arxiv', 'scholar', 'paper', 'pdf', 'semantic', 'huggingface', 'research']],
  [/机器人|仿真|具身|robot|isaac|mujoco|ros/i, ['robot', 'lerobot', 'huggingface', 'github', 'isaac', 'mujoco', 'ros']],
  [/算力|gpu|显卡|租|云主机|容器/i, ['gpu', 'autodl', 'runpod', 'lambda', 'modal', 'cloud', 'console']],
  [/ai|大模型|对话|chat|llm|agent/i, ['chat', 'gpt', 'claude', 'gemini', 'deepseek', 'ai', 'agent', 'llm']],
  [/图标|icon|logo|插画/i, ['icon', 'lucide', 'heroicons', 'iconify', 'svg', 'unDraw', 'figma']],
  [/文档|笔记|wiki|markdown|飞书|notion/i, ['docs', 'notion', 'feishu', 'lark', 'markdown', 'wiki']],
  [/视频|剪辑|b站|youtube/i, ['bilibili', 'youtube', 'video', 'clip']],
];

function extractSearchTerms(query: string): string[] {
  const lower = query.toLowerCase().trim();
  const terms = new Set<string>();
  for (const part of lower.split(/[\s,，。！？、；;:/|()（）「」"']+/)) {
    const clean = part.trim();
    if (clean.length >= 2) terms.add(clean);
  }
  const cjkRuns = lower.match(/[\u4e00-\u9fff]{2,}/g) || [];
  for (const run of cjkRuns) {
    terms.add(run);
    for (let i = 0; i < run.length - 1; i++) {
      terms.add(run.slice(i, i + 2));
    }
  }
  for (const [pattern, extras] of TOKEN_SYNONYMS) {
    if (pattern.test(lower)) {
      for (const extra of extras) terms.add(extra);
    }
  }
  return [...terms];
}

export function rankSiteCandidates(
  query: string,
  snapshot: OrganizerWorkspaceSnapshot,
  limit = 45
): SiteFinderCandidate[] {
  const terms = extractSearchTerms(query);
  const partitionMap = new Map(snapshot.partitions.map((p) => [p.id, p.label]));
  const all: SiteFinderCandidate[] = [];

  for (const link of snapshot.links) {
    const partLabel = partitionMap.get(link.page) || link.page || '默认';
    const location = link.group && link.group !== '常用网站' ? `桌面「${partLabel} / ${link.group}」` : `桌面「${partLabel}」`;
    const haystack = `${link.title} ${link.url} ${partLabel} ${link.group}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (link.title.toLowerCase().includes(term)) score += 6;
      else if (link.url.toLowerCase().includes(term)) score += 4;
      else if (haystack.includes(term)) score += 2;
    }
    all.push({
      id: `l:${link.id}`,
      source: 'launcher',
      title: link.title,
      url: link.url,
      modelUrl: organizerModelUrl(link.url),
      location,
      score,
    });
  }

  for (const bm of snapshot.bookmarks) {
    const location = bm.folderPath ? `书签「${bm.folderPath}」` : '书签栏';
    const haystack = `${bm.title} ${bm.url} ${bm.folderPath}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (bm.title.toLowerCase().includes(term)) score += 6;
      else if (bm.url.toLowerCase().includes(term)) score += 4;
      else if (haystack.includes(term)) score += 2;
    }
    all.push({
      id: `b:${bm.id}`,
      source: 'bookmark',
      title: bm.title,
      url: bm.url,
      modelUrl: organizerModelUrl(bm.url),
      location,
      score,
    });
  }

  const sorted = all.sort((a, b) => b.score - a.score);
  const matched = sorted.filter((item) => item.score > 0);
  if (matched.length >= Math.min(12, limit)) {
    return matched.slice(0, limit);
  }
  return sorted.slice(0, limit);
}

export function buildSiteFinderPrompt(
  emp: DigitalEmployee,
  query: string,
  candidates: readonly SiteFinderCandidate[]
): string {
  const list = candidates.map((c) => ({
    id: c.id,
    source: c.source,
    title: c.title,
    location: c.location,
    origin: c.modelUrl,
    score: c.score,
  }));

  return [
    emp.prompt.systemPrompt,
    emp.customSkillInstructions ? `补充要求：${emp.customSkillInstructions}` : '',
    '',
    `用户模糊记忆描述：${query}`,
    `Jev/关键词初筛候选（共 ${list.length} 条，按初筛分排序；不传递敏感路径与查询参数）：`,
    JSON.stringify(list),
    '',
    '请严格输出纯 JSON 对象（不要输出 markdown 代码块之外的闲聊）：',
    '{',
    '  "summary": "一句简明总结：是否找到，或为何推荐替代入口",',
    '  "foundInLibrary": true/false,',
    '  "matches": [',
    '    { "id": "候选中的精确id", "confidence": "high|medium", "reason": "为什么符合用户记忆" }',
    '  ],',
    '  "recommendations": [',
    '    { "title": "推荐网站名称", "url": "https://...", "description": "一句话说明用途", "reason": "为什么适合当前需求" }',
    '  ]',
    '}',
    '规则：matches 最多 5 条，id 必须来自上方候选列表；若 foundInLibrary 为 false 或候选不太准，请务必给出 2~4 个真实可靠的 https 外部入口 recommendations。',
  ]
    .filter(Boolean)
    .join('\n');
}

export function parseSiteFinderResponse(
  rawText: string,
  snapshot: OrganizerWorkspaceSnapshot,
  query: string,
  shortlistCount: number
): SiteFinderResult {
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('模型未返回有效 JSON 找站结果。');
  }
  const parsed = JSON.parse(jsonMatch[0]);
  const byId = new Map<string, { source: 'launcher' | 'bookmark'; title: string; url: string; location: string }>();
  const partitionMap = new Map(snapshot.partitions.map((p) => [p.id, p.label]));

  for (const l of snapshot.links) {
    const partLabel = partitionMap.get(l.page) || l.page || '默认';
    const location = l.group && l.group !== '常用网站' ? `桌面「${partLabel} / ${l.group}」` : `桌面「${partLabel}」`;
    byId.set(`l:${l.id}`, { source: 'launcher', title: l.title, url: l.url, location });
  }
  for (const b of snapshot.bookmarks) {
    byId.set(`b:${b.id}`, {
      source: 'bookmark',
      title: b.title,
      url: b.url,
      location: b.folderPath ? `书签「${b.folderPath}」` : '书签栏',
    });
  }

  const matches: SiteFinderMatch[] = [];
  const seenMatchIds = new Set<string>();
  for (const item of Array.isArray(parsed.matches) ? parsed.matches : []) {
    const id = String(item?.id || '');
    if (!id || seenMatchIds.has(id)) continue;
    const real = byId.get(id);
    if (!real) continue;
    seenMatchIds.add(id);
    matches.push({
      id,
      source: real.source,
      title: real.title,
      url: real.url,
      location: real.location,
      confidence: item?.confidence === 'high' ? 'high' : 'medium',
      reason: String(item?.reason || '语义与标题特征匹配').slice(0, 120),
    });
    if (matches.length >= 5) break;
  }

  const recommendations: SiteFinderRecommendation[] = [];
  const seenUrls = new Set<string>();
  for (const rec of Array.isArray(parsed.recommendations) ? parsed.recommendations : []) {
    const safeUrl = cleanHttpUrl(rec?.url);
    if (!safeUrl || seenUrls.has(safeUrl)) continue;
    seenUrls.add(safeUrl);
    recommendations.push({
      title: String(rec?.title || new URL(safeUrl).hostname).slice(0, 60),
      url: safeUrl,
      description: String(rec?.description || '').slice(0, 120),
      reason: String(rec?.reason || '根据描述推荐的常用入口').slice(0, 120),
    });
    if (recommendations.length >= 5) break;
  }

  const foundInLibrary = Boolean(parsed.foundInLibrary ?? matches.length > 0) && matches.length > 0;
  return {
    query,
    summary: String(parsed.summary || (matches.length ? `在收藏中为你找回 ${matches.length} 个可能匹配的网站。` : '未在现有收藏中找到确切匹配，已为你补充推荐入口。')).slice(0, 200),
    foundInLibrary,
    searchedCount: snapshot.links.length + snapshot.bookmarks.length,
    shortlistCount,
    matches,
    recommendations,
  };
}

const FALLBACK_RECOMMENDATION_BANK: ReadonlyArray<{
  test: RegExp;
  items: SiteFinderRecommendation[];
}> = [
  {
    test: /svg|波浪|背景|渐变|配色|css|设计/i,
    items: [
      { title: 'Haikei', url: 'https://app.haikei.app/', description: '免费在线 SVG 波浪/渐变/几何背景生成器', reason: '常用于生成网页 SVG 波浪与背景' },
      { title: 'UI Gradients / CSS Gradient', url: 'https://cssgradient.io/', description: '可视化 CSS 渐变配色生成工具', reason: '适合快速调试背景渐变色' },
    ],
  },
  {
    test: /论文|学术|arxiv|文献/i,
    items: [
      { title: 'arXiv', url: 'https://arxiv.org/', description: '计算机、AI 与物理等前沿论文预印本库', reason: '查 AI 与科研论文最常用入口' },
      { title: 'Semantic Scholar', url: 'https://www.semanticscholar.org/', description: 'AI 驱动的学术论文检索与引用图谱', reason: '支持按模糊语义找相关论文' },
    ],
  },
  {
    test: /图标|icon|logo/i,
    items: [
      { title: 'Lucide Icons', url: 'https://lucide.dev/icons/', description: '开源简洁线性图标库，支持直接复制 SVG', reason: '前端开发最常用的轻量图标库' },
      { title: 'Iconify', url: 'https://icon-sets.iconify.design/', description: '聚合 200+ 开源图标集的一站式检索站', reason: '几乎能搜到所有常见图标风格' },
    ],
  },
  {
    test: /算力|gpu|机器人|模型|ai/i,
    items: [
      { title: 'Hugging Face', url: 'https://huggingface.co/', description: '开源模型、数据集与机器人 Spaces 平台', reason: '查找开源模型与具身项目的核心社区' },
      { title: 'GitHub Explore', url: 'https://github.com/explore', description: '开源项目与热门代码仓库发现页', reason: '适合顺着关键词找回开源项目' },
    ],
  },
];

export function buildHeuristicSiteFinderFallback(
  query: string,
  snapshot: OrganizerWorkspaceSnapshot,
  candidates: readonly SiteFinderCandidate[]
): SiteFinderResult {
  const strong = candidates.filter((c) => c.score >= 4).slice(0, 5);
  const matches: SiteFinderMatch[] = strong.map((c) => ({
    id: c.id,
    source: c.source,
    title: c.title,
    url: c.url,
    location: c.location,
    confidence: c.score >= 8 ? 'high' : 'medium',
    reason: '本地关键词与域名特征召回命中（免模型规则模式）',
  }));

  const recommendations: SiteFinderRecommendation[] = [];
  if (!matches.length) {
    for (const group of FALLBACK_RECOMMENDATION_BANK) {
      if (group.test.test(query)) {
        for (const item of group.items) {
          if (recommendations.length < 4) recommendations.push(item);
        }
      }
    }
    if (!recommendations.length) {
      recommendations.push(
        {
          title: 'GitHub Search',
          url: `https://github.com/search?q=${encodeURIComponent(query)}`,
          description: '在 GitHub 仓库与项目介绍中按记忆关键词检索',
          reason: '适合找回开源工具与技术项目',
        },
        {
          title: 'Bing / Google 站外搜寻',
          url: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
          description: '使用当前记忆描述直接进行网页检索',
          reason: '未命中本地收藏时的快速兜底入口',
        }
      );
    }
  }

  return {
    query,
    summary: matches.length
      ? `免模型本地召回：从 ${snapshot.links.length + snapshot.bookmarks.length} 个收藏中找到 ${matches.length} 个近似站点。`
      : '未配置大模型 Key，且本地关键词未直接命中；已为你生成推荐入口（配置模型后可启用语义推理找站）。',
    foundInLibrary: matches.length > 0,
    searchedCount: snapshot.links.length + snapshot.bookmarks.length,
    shortlistCount: candidates.length,
    matches,
    recommendations,
  };
}
