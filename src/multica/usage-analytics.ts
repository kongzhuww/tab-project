/**
 * Workspace Usage Analytics & Book Yardstick Helper.
 * Adapted from 0DNANCY/agy-claude-style usage-core.js (MIT License).
 */

import { formatCompactK } from './token-hud';
import type { NativeConversation } from './use-native-agent';
import type { LocalConversation } from '../services/byok.service';

export type UsageRange = 'all' | '30d' | '7d';

export const HOME_HEAT_WEEKS = 26;

export const HOME_BOOKS = [
  { tokens: 7607, zh: '《道德经》' },
  { tokens: 27557, zh: '《变形记》' },
  { tokens: 37248, zh: '《爱丽丝漫游奇境》' },
  { tokens: 51004, zh: '《绿野仙踪》' },
  { tokens: 65763, zh: '《了不起的盖茨比》' },
  { tokens: 73931, zh: '《安徒生童话》' },
  { tokens: 97886, zh: '《弗兰肯斯坦》' },
  { tokens: 115000, zh: '《活着》' },
  { tokens: 136278, zh: '《一九八四》' },
  { tokens: 152659, zh: '《瓦尔登湖》' },
  { tokens: 171701, zh: '《傲慢与偏见》' },
  { tokens: 202000, zh: '《三体》' },
  { tokens: 256179, zh: '《简·爱》' },
  { tokens: 285009, zh: '《罪与罚》' },
  { tokens: 336000, zh: '《三体Ⅲ·死神永生》' },
  { tokens: 481659, zh: '《安娜·卡列尼娜》' },
  { tokens: 625000, zh: '《魔戒》' },
  { tokens: 638009, zh: '《三国演义》' },
  { tokens: 783200, zh: '《西游记》' },
  { tokens: 903956, zh: '《红楼梦》' },
  { tokens: 958242, zh: '《水浒传》' },
  { tokens: 1409000, zh: '《哈利·波特》全集' },
] as const;

const MODEL_COLORS = [
  '#b4403e',
  '#6e737b',
  '#8a6d1b',
  '#c95d24',
  '#2b6b64',
  '#4d6bfe',
  '#7c3aed',
  '#14b8a6',
];

export interface HeatmapCell {
  date: string;
  tokens: number;
  messages: number;
  level: 0 | 1 | 2 | 3 | 4 | 5;
  future: boolean;
}

export interface ModelUsageRow {
  name: string;
  inputTokens: number;
  outputTokens: number;
  tokens: number;
  messages: number;
  sessions: number;
  sharePct: number;
  color: string;
}

export interface DailyChartSegment {
  model: string;
  color: string;
  heightPct: number;
  tokens: number;
}

export interface DailyChartColumn {
  date: string;
  label: string;
  totalTokens: number;
  totalHeightPct: number;
  segments: DailyChartSegment[];
}

export interface WorkspaceUsageStats {
  sessions: number;
  messages: number;
  totalTokens: number;
  activeDays: number;
  peakHourLabel: string;
  topModel: string;
  funBook: string;
  heatmapCells: HeatmapCell[];
  models: ModelUsageRow[];
  chartColumns: DailyChartColumn[];
  chartMaxTokens: number;
}

function pad2(v: number): string {
  return v < 10 ? `0${v}` : String(v);
}

export function dayKeyOf(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function shortDayLabel(dayKey: string): string {
  const [, m, d] = dayKey.split('-');
  if (!m || !d) return dayKey;
  return `${Number(m)}月${Number(d)}日`;
}

export function formatHourZh(hour: number): string {
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h < 12 ? '上午' : '下午'} ${h12} 点`;
}

export function pickFunBook(totalTokens: number): string {
  if (totalTokens <= 0) return '发送第一条消息，开始记录工作区 Token 用量轨迹。';
  let chosen: (typeof HOME_BOOKS)[number] | null = null;
  for (let i = HOME_BOOKS.length - 1; i >= 0; i--) {
    if (totalTokens >= HOME_BOOKS[i].tokens) {
      chosen = HOME_BOOKS[i];
      break;
    }
  }
  if (!chosen) chosen = HOME_BOOKS[0];
  const count = Math.max(1, Math.round(totalTokens / chosen.tokens));
  const formatted = count.toLocaleString('en-US');
  return `你的 Token 用量相当于 ${formatted} 本${chosen.zh}。`;
}

export function aggregateWorkspaceUsage(params: {
  nativeConversations: NativeConversation[];
  localConversations: LocalConversation[];
  range: UsageRange;
  nowMs?: number;
}): WorkspaceUsageStats {
  const now = params.nowMs ?? Date.now();
  const cutoff =
    params.range === '7d'
      ? now - 7 * 86_400_000
      : params.range === '30d'
        ? now - 30 * 86_400_000
        : 0;

  const sessionSet = new Set<string>();
  const activeDaySet = new Set<string>();
  const hourBuckets = new Array<number>(24).fill(0);
  const dailyMap = new Map<string, { tokens: number; messages: number }>();
  const dailyModelMap = new Map<string, Map<string, number>>();
  const modelMap = new Map<
    string,
    { inputTokens: number; outputTokens: number; tokens: number; messages: number; sessions: Set<string> }
  >();

  let messages = 0;
  let totalTokens = 0;

  const recordMessage = (
    chatKey: string,
    ts: number,
    modelName: string,
    inToks: number,
    outToks: number,
    totalToks: number
  ) => {
    if (cutoff > 0 && ts < cutoff) return;
    messages++;
    totalTokens += totalToks;
    sessionSet.add(chatKey);
    const dk = dayKeyOf(ts);
    activeDaySet.add(dk);
    hourBuckets[new Date(ts).getHours()] += 1;

    const prevDay = dailyMap.get(dk) || { tokens: 0, messages: 0 };
    prevDay.tokens += totalToks;
    prevDay.messages += 1;
    dailyMap.set(dk, prevDay);

    const modelKey = modelName || '未标注模型';
    let m = modelMap.get(modelKey);
    if (!m) {
      m = { inputTokens: 0, outputTokens: 0, tokens: 0, messages: 0, sessions: new Set() };
      modelMap.set(modelKey, m);
    }
    m.inputTokens += inToks;
    m.outputTokens += outToks;
    m.tokens += totalToks;
    m.messages += 1;
    m.sessions.add(chatKey);

    let dm = dailyModelMap.get(dk);
    if (!dm) {
      dm = new Map();
      dailyModelMap.set(dk, dm);
    }
    dm.set(modelKey, (dm.get(modelKey) || 0) + totalToks);
  };

  for (const chat of params.nativeConversations || []) {
    const fallbackModel = chat.model || chat.agentId || '本机 Agent';
    for (const msg of chat.messages || []) {
      const ts = msg.createdAt || chat.updatedAt || now;
      const u = msg.usage;
      const inTok = u ? Number((u.input || 0) + (u.cacheRead || 0)) : msg.role === 'user' ? Math.max(0, Math.round((msg.content?.length || 0) / 3)) : 0;
      const outTok = u ? Number((u.output || 0) + (u.reasoning || 0)) : msg.role === 'assistant' ? Math.max(0, Math.round((msg.content?.length || 0) / 3)) : 0;
      const totalTok = u
        ? Number(u.totalTokens || inTok + outTok)
        : inTok + outTok;
      const mName = msg.modelLabel || fallbackModel;
      recordMessage(`n:${chat.id}`, ts, mName, inTok, outTok, totalTok);
    }
  }

  for (const chat of params.localConversations || []) {
    const fallbackModel = chat.model || 'DeepSeek';
    for (const msg of chat.messages || []) {
      if (msg.incomplete) continue;
      const ts = msg.createdAt || chat.updatedAt || now;
      const est = Math.max(0, Math.round(((msg.content?.length || 0) + (msg.reasoning?.length || 0)) / 3));
      const inTok = msg.role === 'user' ? est : 0;
      const outTok = msg.role === 'assistant' ? est : 0;
      recordMessage(`d:${chat.id}`, ts, fallbackModel, inTok, outTok, est);
    }
  }

  let peakHour = -1;
  let peakHits = 0;
  for (let h = 0; h < 24; h++) {
    if (hourBuckets[h] > peakHits) {
      peakHits = hourBuckets[h];
      peakHour = h;
    }
  }

  const maxDailyMetric = Math.max(
    1,
    ...Array.from(dailyMap.values()).map(v => (v.tokens > 0 ? v.tokens : v.messages * 500))
  );

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const todayKey = dayKeyOf(today.getTime());
  const dayOfWeek = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek - (HOME_HEAT_WEEKS - 1) * 7);

  const heatmapCells: HeatmapCell[] = [];
  for (let i = 0; i < HOME_HEAT_WEEKS * 7; i++) {
    const cellDate = new Date(start);
    cellDate.setDate(start.getDate() + i);
    const dk = dayKeyOf(cellDate.getTime());
    const future = dk > todayKey;
    const rec = dailyMap.get(dk);
    const score = rec ? (rec.tokens > 0 ? rec.tokens : rec.messages * 500) : 0;
    let level: 0 | 1 | 2 | 3 | 4 | 5 = 0;
    if (!future && score > 0) {
      const ratio = (score / maxDailyMetric) * 100;
      if (ratio <= 8) level = 1;
      else if (ratio <= 28) level = 2;
      else if (ratio <= 52) level = 3;
      else if (ratio <= 76) level = 4;
      else level = 5;
    }
    heatmapCells.push({
      date: dk,
      tokens: rec?.tokens || 0,
      messages: rec?.messages || 0,
      level,
      future,
    });
  }

  const sortedModels = Array.from(modelMap.entries())
    .map(([name, info]) => ({
      name,
      inputTokens: info.inputTokens,
      outputTokens: info.outputTokens,
      tokens: info.tokens,
      messages: info.messages,
      sessions: info.sessions.size,
    }))
    .sort((a, b) => b.tokens - a.tokens || b.messages - a.messages || a.name.localeCompare(b.name));

  const colorMap = new Map<string, string>();
  const denomTokens = Math.max(1, totalTokens);
  const models: ModelUsageRow[] = sortedModels.slice(0, 6).map((m, idx) => {
    const color = MODEL_COLORS[idx % MODEL_COLORS.length];
    colorMap.set(m.name, color);
    return {
      ...m,
      sharePct: Math.round((m.tokens / denomTokens) * 1000) / 10,
      color,
    };
  });

  // Build daily columns for the Models stacked bar chart (up to last 7-14 days ending today, min 4 days window)
  const activeDates = Array.from(dailyMap.keys()).sort();
  let spanDays = 4;
  if (activeDates.length > 0) {
    const earliest = new Date(`${activeDates[0]}T00:00:00`).getTime();
    const diffDays = Math.ceil((today.getTime() - earliest) / 86_400_000) + 1;
    spanDays = Math.max(4, Math.min(params.range === '7d' ? 7 : 14, diffDays));
  }
  const chartKeys: string[] = [];
  for (let i = spanDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    chartKeys.push(dayKeyOf(d.getTime()));
  }

  const rawDayTotals = chartKeys.map(dk => dailyMap.get(dk)?.tokens || 0);
  const chartMaxTokens = Math.max(1, ...rawDayTotals);

  const chartColumns: DailyChartColumn[] = chartKeys.map(dk => {
    const dm = dailyModelMap.get(dk);
    const total = dailyMap.get(dk)?.tokens || 0;
    const segments: DailyChartSegment[] = [];
    if (dm) {
      for (const m of models) {
        const val = dm.get(m.name) || 0;
        if (val > 0) {
          segments.push({
            model: m.name,
            color: m.color,
            heightPct: total > 0 ? (val / total) * 100 : 0,
            tokens: val,
          });
        }
      }
    }
    return {
      date: dk,
      label: shortDayLabel(dk),
      totalTokens: total,
      totalHeightPct: total > 0 ? Math.max(3, (total / chartMaxTokens) * 100) : 0,
      segments,
    };
  });

  return {
    sessions: sessionSet.size,
    messages,
    totalTokens,
    activeDays: activeDaySet.size,
    peakHourLabel: peakHour >= 0 ? formatHourZh(peakHour) : '—',
    topModel: models[0]?.name || '—',
    funBook: pickFunBook(totalTokens),
    heatmapCells,
    models,
    chartColumns,
    chartMaxTokens,
  };
}

export { formatCompactK };
