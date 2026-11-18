import { loadConfig, streamOpenAiCompatible } from '../services/byok.service';
import { runLocalAgent } from '../services/native-bridge.service';
import type { DigitalEmployee } from './employee-contract';

export interface TriageCandidate {
  bvid: string;
  title: string;
  author: string;
  durationSec: number;
  subtitleExcerpt: string;
}

export interface DecisionVerdict {
  worth: boolean;
  score: number;
  category: string;
  reason: string;
  engine: 'jev' | 'deepseek' | 'pi' | 'heuristic';
}

export function extractJsonDecision(
  rawText: string,
  allowedCategories: readonly string[]
): { worth: boolean; score: number; category: string; reason: string } | null {
  const cleaned = rawText
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object') return null;
  const rawWorth = parsed.worth ?? parsed.noul;
  const worth = typeof rawWorth === 'boolean' ? rawWorth : typeof rawWorth === 'number' ? rawWorth >= 0.5 : false;
  const numScore = Number(parsed.score);
  const score = Number.isFinite(numScore) ? Math.max(0, Math.min(1, Math.round(numScore * 100) / 100)) : worth ? 0.7 : 0.25;
  const rawCategory = String(parsed.category ?? parsed.choice ?? '').trim();
  const category =
    allowedCategories.find(c => c === rawCategory) ||
    allowedCategories.find(c => rawCategory && (c.includes(rawCategory) || rawCategory.includes(c))) ||
    allowedCategories[0] ||
    '未分类';
  const reason = String(parsed.reason || '').trim().slice(0, 180) || (worth ? '符合分拣条件' : '信息增量不足');
  return { worth, score, category, reason };
}

export function passesDecisionGate(verdict: DecisionVerdict, employee: DigitalEmployee): boolean {
  if (!verdict.worth) return false;
  if (verdict.score < employee.decisionGate.minScore) return false;
  if (employee.decisionGate.skipCategories.includes(verdict.category)) return false;
  return true;
}

function buildTriagePrompt(employee: DigitalEmployee, candidate: TriageCandidate): string {
  const feedbackBlock = employee.ownerFeedback.length
    ? `\n\n主人历史偏好参考：\n${employee.ownerFeedback
        .slice(-8)
        .map(f => `- 《${f.title}》 -> ${f.verdict === 'keep' ? '保留精读' : '跳过'}（分类：${f.category}${f.note ? `；说明：${f.note}` : ''}）`)
        .join('\n')}`
    : '';

  return [
    '你是 System 1 快速分拣决策器。只输出一个合法 JSON 对象，不要 markdown 代码块、不要多余解释。',
    `JSON 字段：{"worth": boolean, "score": number(0到1之间保留两位小数), "category": string, "reason": string(不超过40字)}`,
    `判断问题（Noul）：${employee.decisionGate.worthQuestion}`,
    `可选分类（Choice，必须严格从中选一个）：${employee.decisionGate.categories.join(' | ')}`,
    `不建议精读的跳过分类：${employee.decisionGate.skipCategories.join(' | ') || '无'}`,
    feedbackBlock,
    '',
    '待判断视频：',
    `- 标题：${candidate.title}`,
    `- UP主：${candidate.author || '未知'}`,
    `- 时长：${candidate.durationSec || 0} 秒`,
    `- 字幕片段：\n${candidate.subtitleExcerpt || '（无字幕摘录）'}`,
  ]
    .filter(Boolean)
    .join('\n');
}

async function runJevHttp(employee: DigitalEmployee, candidate: TriageCandidate): Promise<DecisionVerdict> {
  const endpoint = employee.runtime.jevEndpoint;
  if (!endpoint) throw new Error('尚未配置 Jev HTTP 端点。');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal: AbortSignal.timeout(12_000),
    credentials: 'omit',
    body: JSON.stringify({
      format: 'tab-project-jev-v1',
      state: {
        bvid: candidate.bvid,
        title: candidate.title,
        author: candidate.author,
        durationSec: candidate.durationSec,
        excerpt: candidate.subtitleExcerpt,
      },
      feedback: employee.ownerFeedback.slice(-8),
      probes: {
        worth: { type: 'noul', question: employee.decisionGate.worthQuestion },
        score: { type: 'score', min: 0, max: 1 },
        category: { type: 'choice', options: employee.decisionGate.categories },
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Jev 端点返回 HTTP ${response.status}`);
  }
  const text = await response.text();
  const parsed = extractJsonDecision(text, employee.decisionGate.categories);
  if (!parsed) throw new Error('Jev 端点返回 JSON 格式无法解析。');
  return { ...parsed, engine: 'jev' };
}

async function runFastViaDeepSeek(employee: DigitalEmployee, candidate: TriageCandidate): Promise<DecisionVerdict> {
  const config = await loadConfig();
  if (!config.configured) throw new Error(`${config.label || '模型服务'} 尚未配置`);
  let output = '';
  await streamOpenAiCompatible(
    config,
    config.model || 'deepseek-chat',
    [{ role: 'user', content: buildTriagePrompt(employee, candidate) }],
    AbortSignal.timeout(25_000),
    chunk => { output += chunk; },
    'none'
  );
  const parsed = extractJsonDecision(output, employee.decisionGate.categories);
  if (!parsed) throw new Error('快速分拣返回的 JSON 格式异常');
  return { ...parsed, engine: 'deepseek' };
}

async function runFastViaPi(employee: DigitalEmployee, candidate: TriageCandidate): Promise<DecisionVerdict> {
  const res = await runLocalAgent({
    agentId: 'pi',
    model: employee.runtime.piModel || undefined,
    thinking: 'off',
    toolsEnabled: false,
    timeoutMs: 45_000,
    prompt: buildTriagePrompt(employee, candidate),
  });
  const parsed = extractJsonDecision(res.text || '', employee.decisionGate.categories);
  if (!parsed) throw new Error('本机 Pi 快速分拣返回 JSON 异常');
  return { ...parsed, engine: 'pi' };
}

export async function evaluateWithDecisionGate(
  employee: DigitalEmployee,
  candidate: TriageCandidate
): Promise<DecisionVerdict> {
  if (!employee.skills.includes('jev.triage')) {
    return {
      worth: true,
      score: 1,
      category: employee.decisionGate.categories[0] || 'AI 与 Agent',
      reason: '已关闭前置快筛，直接进入精读分析',
      engine: 'heuristic',
    };
  }

  if (employee.runtime.decisionMode === 'jev-http') {
    return runJevHttp(employee, candidate);
  }

  if (employee.runtime.analyzer === 'native-pi') {
    try {
      return await runFastViaPi(employee, candidate);
    } catch (piErr) {
      const cfg = await loadConfig().catch(() => ({ key: '', model: '' }));
      if (cfg.key) return runFastViaDeepSeek(employee, candidate);
      throw piErr;
    }
  }

  return runFastViaDeepSeek(employee, candidate);
}
