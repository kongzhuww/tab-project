export interface MessageUsageMetrics {
  input?: number;
  output?: number;
  cacheRead?: number;
  cacheWrite?: number;
  reasoning?: number;
  totalTokens?: number;
  cost?: { total?: number };
}

export interface HudTurnInput {
  turn: number;
  model: string;
  userPreview: string;
  durationMs?: number;
  toolCalls: number;
  toolNames: string[];
  usage?: MessageUsageMetrics | null;
}

export interface HudTurnRecord {
  turn: number;
  model: string;
  userPreview: string;
  ctxUsed: number;
  ctxDelta: number;
  freshInput: number;
  cacheRead: number;
  output: number;
  thinking: number;
  totalTokens: number;
  durationMs: number;
  speed: number;
  cacheHitPct: number;
  toolCalls: number;
}

export interface HudToolRank {
  name: string;
  count: number;
}

export interface SessionTelemetry {
  modelName: string;
  maxContext: number;
  usedTokens: number;
  remainingTokens: number;
  remainingPct: number;
  usedPct: number;
  ringColor: string;
  freshInput: number;
  cacheRead: number;
  cacheWrite: number;
  lastOutput: number;
  lastThinking: number;
  draftChars: number;
  draftTokens: number;
  cacheHitPct: number;
  lastSpeed: number;
  avgSpeed: number;
  avgDurationMs: number;
  totalTokens: number;
  totalOutput: number;
  totalToolCalls: number;
  turnCount: number;
  hasTelemetry: boolean;
  turns: HudTurnRecord[];
  toolLeaderboard: HudToolRank[];
}

/** Parse compact context sizes like "1M", "500K", "131.1K" into token counts. */
export function parseContextWindowSize(raw?: string): number {
  if (typeof raw !== 'string') return 0;
  const match = raw.trim().match(/^(\d+(?:\.\d+)?)\s*([km])?$/i);
  if (!match) return 0;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value <= 0) return 0;
  const unit = (match[2] || '').toLowerCase();
  if (unit === 'm') return Math.round(value * 1_000_000);
  if (unit === 'k') return Math.round(value * 1_000);
  return Math.round(value);
}

/** Format token counts compactly (e.g. 713, 2.7K, 439.8K, 1.43M). */
export function formatCompactK(value: number): string {
  const n = Number(value) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

export function pickRingColor(remainingPct: number): string {
  if (remainingPct <= 10) return '#dc3c3d';
  if (remainingPct <= 30) return '#f59e0b';
  return '#257de0';
}

export function buildSessionTelemetry(params: {
  modelName: string;
  maxContext?: number;
  draftText?: string;
  turns: HudTurnInput[];
}): SessionTelemetry {
  const maxContext = params.maxContext && params.maxContext > 0 ? params.maxContext : 200_000;
  const draftChars = (params.draftText || '').length;
  const draftTokens = draftChars > 0 ? Math.ceil(draftChars / 3) : 0;

  let prevCtxUsed = 0;
  let totalTokens = 0;
  let totalOutput = 0;
  let totalToolCalls = 0;
  let speedSum = 0;
  let speedCount = 0;
  let durationSum = 0;
  let durationCount = 0;
  const toolCounts = new Map<string, number>();

  const turns: HudTurnRecord[] = [];
  for (const item of params.turns) {
    const u = item.usage || null;
    const freshInput = Math.max(0, Number(u?.input || 0));
    const cacheRead = Math.max(0, Number(u?.cacheRead || 0));
    const cacheWrite = Math.max(0, Number(u?.cacheWrite || 0));
    const output = Math.max(0, Number(u?.output || 0));
    const thinking = Math.max(0, Number(u?.reasoning || 0));
    const rowTotal = Math.max(0, Number(u?.totalTokens || 0)) || (freshInput + cacheRead + cacheWrite + output + thinking);
    const ctxUsed = freshInput + cacheRead + cacheWrite + output + thinking;
    const ctxDelta = turns.length ? ctxUsed - prevCtxUsed : ctxUsed;
    if (ctxUsed > 0) prevCtxUsed = ctxUsed;

    const durationMs = Math.max(0, Number(item.durationMs || 0));
    const speed = durationMs > 0 && output > 0 ? Math.round((output / durationMs) * 1000) : 0;
    const denom = freshInput + cacheRead;
    const cacheHitPct = denom > 0 ? Math.round((cacheRead / denom) * 1000) / 10 : 0;

    totalTokens += rowTotal;
    totalOutput += output;
    totalToolCalls += Math.max(0, item.toolCalls || 0);
    if (speed > 0) { speedSum += speed; speedCount++; }
    if (durationMs > 0) { durationSum += durationMs; durationCount++; }
    for (const name of item.toolNames || []) {
      if (name) toolCounts.set(name, (toolCounts.get(name) || 0) + 1);
    }

    turns.push({
      turn: item.turn,
      model: item.model || params.modelName,
      userPreview: item.userPreview.replace(/\s+/g, ' ').trim().slice(0, 90),
      ctxUsed,
      ctxDelta,
      freshInput,
      cacheRead,
      output,
      thinking,
      totalTokens: rowTotal,
      durationMs,
      speed,
      cacheHitPct,
      toolCalls: item.toolCalls || 0,
    });
  }

  const latest = turns[turns.length - 1];
  const latestRaw = params.turns[params.turns.length - 1]?.usage || null;
  const freshInput = latest ? latest.freshInput : 0;
  const cacheRead = latest ? latest.cacheRead : 0;
  const cacheWrite = Math.max(0, Number(latestRaw?.cacheWrite || 0));
  const lastOutput = latest ? latest.output : 0;
  const lastThinking = latest ? latest.thinking : 0;

  const baseUsed = latest ? latest.ctxUsed : 0;
  const usedTokens = Math.min(maxContext, baseUsed + draftTokens);
  const remainingTokens = Math.max(0, maxContext - usedTokens);
  const remainingPct = maxContext > 0 ? Math.max(0, Math.min(100, (remainingTokens / maxContext) * 100)) : 100;
  const usedPct = Math.max(0, Math.min(100, 100 - remainingPct));
  const denom = freshInput + cacheRead;
  const cacheHitPct = denom > 0 ? Math.round((cacheRead / denom) * 1000) / 10 : 0;

  const toolLeaderboard = Array.from(toolCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    modelName: params.modelName,
    maxContext,
    usedTokens,
    remainingTokens,
    remainingPct,
    usedPct,
    ringColor: pickRingColor(remainingPct),
    freshInput,
    cacheRead,
    cacheWrite,
    lastOutput,
    lastThinking,
    draftChars,
    draftTokens,
    cacheHitPct,
    lastSpeed: latest?.speed || 0,
    avgSpeed: speedCount ? Math.round(speedSum / speedCount) : 0,
    avgDurationMs: durationCount ? Math.round(durationSum / durationCount) : 0,
    totalTokens,
    totalOutput,
    totalToolCalls,
    turnCount: turns.length,
    hasTelemetry: totalTokens > 0 || baseUsed > 0,
    turns,
    toolLeaderboard,
  };
}

export function formatTelemetryReport(t: SessionTelemetry): string {
  return [
    `# 上下文窗口与 Token 监控报告`,
    `- 模型：${t.modelName}`,
    `- 剩余可用：${formatCompactK(t.remainingTokens)} / ${formatCompactK(t.maxContext)} (${t.remainingPct.toFixed(1)}%)`,
    `- 已用上下文：${formatCompactK(t.usedTokens)} (${t.usedPct.toFixed(1)}%)`,
    `- 缓存命中率：${t.cacheHitPct.toFixed(1)}%（读 ${formatCompactK(t.cacheRead)} · 新 ${formatCompactK(t.freshInput)}）`,
    `- 输出速度：${t.lastSpeed ? `${t.lastSpeed} tok/s` : '—'}（均值 ${t.avgSpeed ? `${t.avgSpeed} tok/s` : '—'}）`,
    `- 会话累计：${formatCompactK(t.totalTokens)}（${t.turnCount} 轮 · ${t.totalToolCalls} 次调用 · 输出 ${formatCompactK(t.totalOutput)}）`,
  ].join('\n');
}

export interface ChangedFileEntry {
  path: string;
  name: string;
  added: number;
  removed: number;
}

export interface ChangedFilesSummary {
  files: ChangedFileEntry[];
  totalAdded: number;
  totalRemoved: number;
}

function countLines(value: unknown): number {
  if (typeof value !== 'string' || !value.length) return 0;
  return value.split(/\r?\n/).length;
}

function basenameOf(filePath: string): string {
  const parts = filePath.split(/[\\/]/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : filePath;
}

export function extractChangedFiles(
  toolSteps?: Array<{ name?: string; args?: Record<string, unknown> }> | null
): ChangedFilesSummary {
  const byPath = new Map<string, ChangedFileEntry>();
  const addEntry = (rawPath: unknown, added: number, removed: number) => {
    if (typeof rawPath !== 'string' || !rawPath.trim()) return;
    const p = rawPath.trim();
    const prev = byPath.get(p);
    if (prev) {
      prev.added += Math.max(0, added);
      prev.removed += Math.max(0, removed);
    } else {
      byPath.set(p, {
        path: p,
        name: basenameOf(p),
        added: Math.max(0, added),
        removed: Math.max(0, removed),
      });
    }
  };

  for (const step of toolSteps || []) {
    const tool = (step?.name || '').toLowerCase();
    const args = step?.args;
    if (!args || typeof args !== 'object') continue;

    if (tool === 'file_change' && Array.isArray(args.changes)) {
      for (const ch of args.changes as Array<Record<string, unknown>>) {
        addEntry(ch?.path || ch?.file, 0, 0);
      }
      continue;
    }

    const isWrite = tool === 'write' || tool === 'write_file' || tool === 'write_to_file' || tool === 'create_file';
    const isEdit =
      tool === 'edit' ||
      tool === 'edit_file' ||
      tool === 'multiedit' ||
      tool === 'multi_edit' ||
      tool === 'replace_file_content' ||
      tool === 'multi_replace_file_content';
    if (!isWrite && !isEdit) continue;

    const targetPath = args.path ?? args.file_path ?? args.filePath ?? args.TargetFile;
    if (isWrite) {
      const content = args.content ?? args.CodeContent;
      addEntry(targetPath, countLines(content), 0);
      continue;
    }

    if (Array.isArray(args.edits)) {
      let added = 0;
      let removed = 0;
      for (const e of args.edits as Array<Record<string, unknown>>) {
        added += countLines(e?.newText ?? e?.new_string);
        removed += countLines(e?.oldText ?? e?.old_string);
      }
      addEntry(targetPath, added, removed);
    } else if (Array.isArray(args.ReplacementChunks)) {
      let added = 0;
      let removed = 0;
      for (const c of args.ReplacementChunks as Array<Record<string, unknown>>) {
        added += countLines(c?.ReplacementContent);
        removed += countLines(c?.TargetContent);
      }
      addEntry(targetPath, added, removed);
    } else {
      const added = countLines(args.newText ?? args.new_string ?? args.ReplacementContent);
      const removed = countLines(args.oldText ?? args.old_string ?? args.TargetContent);
      addEntry(targetPath, added, removed);
    }
  }

  const files = Array.from(byPath.values());
  let totalAdded = 0;
  let totalRemoved = 0;
  for (const f of files) {
    totalAdded += f.added;
    totalRemoved += f.removed;
  }
  return { files, totalAdded, totalRemoved };
}
