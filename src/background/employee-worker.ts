import {
  DIGITAL_EMPLOYEES_KEY,
  DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY,
  EMPLOYEE_LIVE_PEEK_KEY,
  EMPLOYEE_RUN_LOG_KEY,
  EMPLOYEE_WORKER_STAMP,
  createDefaultBiliEmployee,
  createDefaultOrganizerEmployee,
  localDayKey,
  normalizeEmployee,
  safeEmployeesList,
  safeRunLogs,
  type DigitalEmployee,
  type EmployeeFeedbackExample,
  type EmployeePeekSnapshot,
  type EmployeeRunRecord,
  type OrganizerPlanStep,
} from '../agents/employee-contract';
import { evaluateWithDecisionGate, passesDecisionGate } from '../agents/decision-engine';
import { runAutonomousEmployeeAnalysis } from '../agents/employee-tools';
import {
  applyOrganizerPlanStep,
  buildHeuristicOrganizerFallback,
  buildOrganizerPlanPrompt,
  parseOrganizerPlanResponse,
  readOrganizerWorkspaceSnapshot,
  bindOrganizerPlan,
  undoOrganizerPlanStep,
} from '../agents/workspace-organizer';
import { saveArticleFromBackground } from '../backpack/article.service';
import { publishAiNotification } from '../multica/ai-notifications';
import { bilibiliService } from '../services/bilibili.service';
import { loadConfig, streamOpenAiCompatible } from '../services/byok.service';
import { pingNativeHost, runLocalAgent } from '../services/native-bridge.service';

declare const chrome: any;

const ALARM = 'digital-employee-patrol-v1';
const ERROR_BACKOFF_MS = 30 * 60 * 1000;
let queue: Promise<unknown> = Promise.resolve();

function serial<T>(fn: () => Promise<T>): Promise<T> {
  const result = queue.then(fn);
  queue = result.catch(() => {});
  return result;
}

async function readEmployees(): Promise<DigitalEmployee[]> {
  const stored = await chrome.storage.local.get([DIGITAL_EMPLOYEES_KEY, DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY]);
  if (stored[DIGITAL_EMPLOYEES_KEY] === undefined) {
    const initial = [createDefaultBiliEmployee(), createDefaultOrganizerEmployee()];
    await chrome.storage.local.set({
      [DIGITAL_EMPLOYEES_KEY]: initial,
      [DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY]: true,
    });
    return initial;
  }
  const list = safeEmployeesList(stored[DIGITAL_EMPLOYEES_KEY]);
  if (!stored[DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY]) {
    if (list.length < 40 && !list.some(e => e.source.kind === 'workspace-organizer')) {
      list.unshift(createDefaultOrganizerEmployee());
      await writeEmployees(list);
    }
    await chrome.storage.local.set({ [DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY]: true });
  }
  return list;
}

async function writeEmployees(items: DigitalEmployee[]): Promise<void> {
  await chrome.storage.local.set({ [DIGITAL_EMPLOYEES_KEY]: items });
}

async function readRuns(): Promise<EmployeeRunRecord[]> {
  const stored = await chrome.storage.local.get(EMPLOYEE_RUN_LOG_KEY);
  return safeRunLogs(stored[EMPLOYEE_RUN_LOG_KEY]);
}

async function writeRuns(runs: EmployeeRunRecord[]): Promise<void> {
  for (const run of runs) if (run.kind === 'organizer') run.organizerRevision = (run.organizerRevision || 0) + 1;
  const pruned = runs.slice(0, 120).map((item, idx) =>
    idx < 8 ? item : { ...item, peekFrames: undefined }
  );
  await chrome.storage.local.set({ [EMPLOYEE_RUN_LOG_KEY]: pruned });
}

async function publishLivePeek(snapshot: EmployeePeekSnapshot): Promise<void> {
  try {
    await chrome.storage.local.set({ [EMPLOYEE_LIVE_PEEK_KEY]: snapshot });
  } catch {}
}

async function armPatrolAlarm(employees: DigitalEmployee[]): Promise<void> {
  const active = employees.filter(e => e.enabled);
  if (!active.length) {
    await chrome.alarms.clear(ALARM);
    return;
  }
  const now = Date.now();
  const nextWake = Math.min(
    ...active.map(e => {
      if (Number.isFinite(e.nextEligibleAt) && (e.nextEligibleAt as number) > now) {
        return e.nextEligibleAt as number;
      }
      const intervalMs = Math.max(5, e.schedulePolicy.intervalMinutes) * 60_000;
      const base = Number.isFinite(e.lastRunAt) ? (e.lastRunAt as number) + intervalMs : now + 60_000;
      return Math.max(now + 15_000, base);
    })
  );
  await chrome.alarms.create(ALARM, { when: nextWake });
}

function summarizeReportLine(markdown: string, fallback: string): string {
  const clean = markdown
    .split(/\r?\n/)
    .map(line => line.replace(/^#+\s*/, '').replace(/^[-*]\s*/, '').trim())
    .find(line => line.length >= 8 && !/^一句话结论/.test(line));
  return (clean || fallback).slice(0, 180);
}

function organizerDwell(ms: number): Promise<void> {
  const isBrowser = typeof navigator !== 'undefined' && /Mozilla/i.test(navigator.userAgent || '');
  if (!isBrowser || ms <= 0) return Promise.resolve();
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeOrganizerForEmployee(
  emp: DigitalEmployee
): Promise<{ status: 'processed' | 'idle' | 'limit' | 'error'; record?: EmployeeRunRecord; message: string }> {
  if (!(['launcher.read', 'bookmarks.read', 'organizer.plan'] as const).every(skill => emp.skills.includes(skill))) throw new Error('整理专员需要启用桌面读取、书签读取和整理提案三项能力；未读取或发送工作区数据。');
  const now = Date.now();
  const startedAt = now;
  const peekFrames: EmployeePeekSnapshot[] = [];
  let peekState: EmployeePeekSnapshot = {
    employeeId: emp.id,
    employeeName: emp.name,
    mode: 'organizer',
    bvid: `org-${now}`,
    active: true,
    phase: 'source',
    cursorTarget: 'org-partitions',
    cursorLabel: '只读盘点桌面分区、大/紧凑文件夹与常用网站…',
    sourceKind: 'workspace-organizer',
    sourceTitle: '桌面分区 + 浏览器书签',
    sourceVideos: [],
    toolHistory: [],
    timelineSteps: ['只读盘点桌面分区、大/紧凑文件夹与常用网站…'],
    updatedAt: Date.now(),
  };

  const emitPeek = async (patch: Partial<EmployeePeekSnapshot>, recordFrame = true, dwellMs = 0) => {
    const prevSteps = peekState.timelineSteps || [];
    const nextLabel = patch.cursorLabel || peekState.cursorLabel;
    const timelineSteps =
      nextLabel && prevSteps[prevSteps.length - 1] !== nextLabel
        ? [...prevSteps.slice(-39), nextLabel]
        : prevSteps;
    peekState = {
      ...peekState,
      ...patch,
      timelineSteps,
      updatedAt: Date.now(),
    };
    if (recordFrame) {
      // The organizer run keeps one full baseline; replay frames need only progress metadata.
      peekFrames.push(JSON.parse(JSON.stringify({ ...peekState, organizerSnapshot: undefined, organizerSteps: undefined })));
    }
    await publishLivePeek(peekState);
    if (dwellMs > 0) await organizerDwell(dwellMs);
  };

  await emitPeek({}, true, 220);

  const snapshot = await readOrganizerWorkspaceSnapshot();
  await emitPeek({
    phase: 'info',
    cursorTarget: 'org-bookmarks',
    cursorLabel: `已盘点 ${snapshot.partitions.length} 个分区、${snapshot.folders.length} 个文件夹、${snapshot.links.length} 个网站与 ${snapshot.bookmarks.length} 条书签`,
    organizerSnapshot: snapshot,
    toolHistory: [
      { tool: 'launcher_read_tree', summary: `读取 ${snapshot.partitions.length} 分区 · ${snapshot.links.length} 网站`, ok: true },
      { tool: 'bookmarks_read_tree', summary: `读取 ${snapshot.bookmarkFolders.length} 目录 · ${snapshot.bookmarks.length} 书签`, ok: true },
    ],
  }, true, 260);

  await emitPeek({
    phase: 'analyzing',
    cursorTarget: 'org-approval',
    cursorLabel: '正在生成分步整理提案…',
  }, true);

  let planSummary = '';
  let planSteps: OrganizerPlanStep[] = [];
  let usedEngine: EmployeeRunRecord['engine'] = 'heuristic';
  const promptText = buildOrganizerPlanPrompt(emp, snapshot);

  const config = await loadConfig();
  if (emp.runtime.analyzer === 'native-pi') {
    try {
      const res = await runLocalAgent({
        agentId: 'pi',
        model: emp.runtime.piModel || undefined,
        thinking: emp.runtime.piThinking || 'medium',
        toolsEnabled: false,
        timeoutMs: 180_000,
        prompt: promptText,
      });
      const parsed = parseOrganizerPlanResponse(res.text || '', snapshot);
      planSummary = parsed.summary;
      planSteps = parsed.steps;
      usedEngine = 'pi';
    } catch {
      if (config.configured && config.model) {
        let out = '';
        await streamOpenAiCompatible(config, config.model, [{ role: 'user', content: promptText }], AbortSignal.timeout(120_000), t => { out += t; });
        const parsed = parseOrganizerPlanResponse(out, snapshot);
        planSummary = parsed.summary;
        planSteps = parsed.steps;
        usedEngine = 'deepseek';
      }
    }
  } else if (config.configured && config.model) {
    let out = '';
    await streamOpenAiCompatible(config, config.model, [{ role: 'user', content: promptText }], AbortSignal.timeout(120_000), t => { out += t; });
    const parsed = parseOrganizerPlanResponse(out, snapshot);
    planSummary = parsed.summary;
    planSteps = parsed.steps;
    usedEngine = 'deepseek';
  } else {
    const ping = await pingNativeHost().catch(() => null);
    const chosen = ping?.agents?.find(a => a.installed);
    if (chosen) {
      const res = await runLocalAgent({
        agentId: chosen.id,
        model: emp.runtime.piModel || undefined,
        thinking: emp.runtime.piThinking || 'medium',
        toolsEnabled: false,
        timeoutMs: 180_000,
        prompt: promptText,
      });
      const parsed = parseOrganizerPlanResponse(res.text || '', snapshot);
      planSummary = parsed.summary;
      planSteps = parsed.steps;
      usedEngine = 'pi';
    }
  }

  if (!planSummary) {
    const fallback = buildHeuristicOrganizerFallback(snapshot);
    planSummary = fallback.summary;
    planSteps = fallback.steps;
    usedEngine = 'heuristic';
  }

  await emitPeek({
    active: false,
    phase: 'done',
    cursorTarget: 'org-approval',
    cursorLabel: planSteps.length
      ? `提案已生成（共 ${planSteps.length} 条待审批，点击右侧任务逐条生效）`
      : '盘点完成：当前桌面与书签结构无需改动',
    organizerSnapshot: snapshot,
    organizerSteps: planSteps,
  }, true);

  const record: EmployeeRunRecord = {
    id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    employeeId: emp.id,
    kind: 'organizer',
    bvid: `org-${now}`,
    title: `整理提案（${planSteps.length} 条待审批）`,
    author: emp.name,
    url: '',
    status: 'analyzed',
    engine: usedEngine,
    worth: planSteps.length > 0,
    score: planSteps.length > 0 ? 1 : 0.8,
    category: '整理提案',
    reason: planSummary,
    planSummary,
    planSteps,
    organizerSnapshot: snapshot,
    toolTrace: peekState.toolHistory,
    peekFrames,
    durationMs: Date.now() - startedAt,
    createdAt: Date.now(),
  };

  if (planSteps.length && emp.skills.includes('notify.high_value')) {
    try {
      await publishAiNotification(`emp_org_${record.id}`, emp.name, `新生成 ${planSteps.length} 条桌面/书签整理提案，等待你逐条确认`, 'success');
    } catch {}
  }

  return {
    status: 'processed',
    record,
    message: planSteps.length
      ? `已生成 ${planSteps.length} 条整理建议（尚未改动真实数据），点击「👀 预览审批」即可逐条确认生效。`
      : '盘点完成，当前桌面与书签暂无需调整。',
  };
}

async function executeOneForEmployee(
  emp: DigitalEmployee,
  runs: EmployeeRunRecord[],
  options: { manual?: boolean } = {}
): Promise<{ status: 'processed' | 'idle' | 'limit' | 'error'; record?: EmployeeRunRecord; message: string }> {
  const now = Date.now();
  const startedAt = now;
  const today = localDayKey(now);
  const todayCount = runs.filter(r => r.employeeId === emp.id && r.status !== 'error' && localDayKey(r.createdAt) === today).length;
  if (!options.manual && todayCount >= emp.schedulePolicy.dailyLimit) {
    return { status: 'limit', message: `今日已达处理上限（${emp.schedulePolicy.dailyLimit} 条）。` };
  }
  if (emp.source.kind === 'workspace-organizer') return executeOrganizerForEmployee(emp);
  if (!emp.skills.includes('bili.source')) {
    throw new Error('该员工未启用「B站数据源读取」Skill。');
  }

  const mediaId =
    emp.source.kind === 'bili-history'
      ? '__history__'
      : emp.source.kind === 'bili-fav'
        ? emp.source.folderId
        : '__toview__';
  if (emp.source.kind === 'bili-fav' && !mediaId) {
    throw new Error('请先在员工配置中选择一个 B 站收藏夹。');
  }

  const sourceTitle =
    emp.source.kind === 'bili-history'
      ? '播放历史'
      : emp.source.kind === 'bili-fav'
        ? (emp.source.folderTitle || '指定收藏夹')
        : '稍后再看';

  const peekFrames: EmployeePeekSnapshot[] = [];
  let peekState: EmployeePeekSnapshot = {
    employeeId: emp.id,
    employeeName: emp.name,
    bvid: '',
    active: true,
    phase: 'source',
    cursorTarget: 'folder',
    cursorLabel: `打开「${sourceTitle}」列表…`,
    sourceKind: emp.source.kind,
    sourceTitle,
    sourceVideos: [],
    toolHistory: [],
    timelineSteps: [`打开「${sourceTitle}」列表…`],
    updatedAt: Date.now(),
  };

  const emitPeek = async (patch: Partial<EmployeePeekSnapshot>, recordFrame = true) => {
    const prevSteps = peekState.timelineSteps || [];
    const nextLabel = patch.cursorLabel || peekState.cursorLabel;
    const timelineSteps =
      nextLabel && prevSteps[prevSteps.length - 1] !== nextLabel
        ? [...prevSteps.slice(-39), nextLabel]
        : prevSteps;
    peekState = {
      ...peekState,
      ...patch,
      timelineSteps,
      updatedAt: Date.now(),
    };
    if (recordFrame) {
      peekFrames.push(JSON.parse(JSON.stringify(peekState)));
    }
    await publishLivePeek(peekState);
  };

  await emitPeek({}, true);

  const feed = await bilibiliService.getFolderVideos(mediaId!, 1, emp.schedulePolicy.maxFetchItems);
  const processedBvids = new Set(
    runs
      .filter(r => r.employeeId === emp.id && r.status !== 'error')
      .map(r => r.bvid)
  );
  const sourceVideos = (feed.medias || [])
    .filter(v => typeof v.bvid === 'string' && /^BV[0-9A-Za-z]{10}$/.test(v.bvid))
    .slice(0, 8)
    .map(v => ({
      bvid: String(v.bvid),
      title: String(v.title || v.bvid),
      author: String(v.upper?.name || '未知 UP 主'),
      cover: String(v.cover || '').replace(/^http:/, 'https:'),
      duration: Number(v.duration || 0),
    }));

  const candidate = (feed.medias || []).find(v => typeof v.bvid === 'string' && /^BV[0-9A-Za-z]{10}$/.test(v.bvid) && !processedBvids.has(v.bvid));
  if (!candidate || !candidate.bvid) {
    await emitPeek({
      active: false,
      sourceVideos,
      cursorTarget: 'folder',
      cursorLabel: '暂无未处理的新视频',
    }, false);
    return { status: 'idle', message: '数据源里暂时没有未处理的新视频。' };
  }

  const bvid = candidate.bvid;
  const videoUrl = `https://www.bilibili.com/video/${bvid}`;
  const author = candidate.upper?.name || '未知 UP 主';
  const title = candidate.title || bvid;
  const durationSec = Number(candidate.duration || 0);
  const cover = String(candidate.cover || '').replace(/^http:/, 'https:');

  await emitPeek({
    bvid,
    phase: 'source',
    cursorTarget: 'video-card',
    cursorLabel: `选中视频：${title.slice(0, 20)}`,
    sourceVideos,
    activeVideo: { bvid, title, author, cover },
  }, true);
  await new Promise(resolve => setTimeout(resolve, 420));

  // Cache view details for both optional System 1 Jev gate and autonomous tool reuse.
  const viewCache = new Map<string, any>();
  let descSnippet = '';
  try {
    const view = await bilibiliService.getVideoView(bvid);
    if (view?.cid) {
      viewCache.set(bvid, view);
      descSnippet = String(view.desc || '').slice(0, 800);
    }
  } catch {
    // Non-fatal: the agent tools can still fetch on demand or report unavailable.
  }

  if (emp.decisionGate.skipWithoutSubtitle) {
    const cachedView = viewCache.get(bvid);
    const subs = cachedView?.cid ? await bilibiliService.getVideoSubtitles(bvid, cachedView.cid).catch(() => []) : [];
    if (!subs.length) {
      await emitPeek({
        active: false,
        phase: 'skipped',
        cursorTarget: 'decision-badge',
        cursorLabel: '无可用字幕，已跳过',
        verdict: { worth: false, score: 0, category: '无字幕跳过', reason: '视频暂未提供可用字幕，已按设置跳过。' },
      }, true);
      const record: EmployeeRunRecord = {
        id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        employeeId: emp.id,
        bvid,
        title,
        author,
        url: videoUrl,
        status: 'skipped-no-sub',
        engine: 'none',
        worth: false,
        score: 0,
        category: '无字幕跳过',
        reason: '视频暂未提供可用字幕，已按设置跳过。',
        peekFrames,
        durationMs: Date.now() - startedAt,
        createdAt: Date.now(),
      };
      return { status: 'processed', record, message: `已跳过无字幕视频：《${title}》` };
    }
  }

  let preTriageNote = '';
  if (emp.skills.includes('jev.triage') && emp.runtime.decisionMode === 'jev-http' && emp.runtime.jevEndpoint) {
    const verdict = await evaluateWithDecisionGate(emp, {
      bvid,
      title,
      author,
      durationSec,
      subtitleExcerpt: descSnippet,
    });
    if (!passesDecisionGate(verdict, emp)) {
      await emitPeek({
        active: false,
        phase: 'skipped',
        cursorTarget: 'decision-badge',
        cursorLabel: `Jev 预筛跳过 (${Math.round(verdict.score * 100)}分)`,
        verdict: { worth: verdict.worth, score: verdict.score, category: verdict.category, reason: verdict.reason },
      }, true);
      const record: EmployeeRunRecord = {
        id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        employeeId: emp.id,
        bvid,
        title,
        author,
        url: videoUrl,
        status: 'skipped-gate',
        engine: verdict.engine,
        worth: verdict.worth,
        score: verdict.score,
        category: verdict.category,
        reason: verdict.reason,
        peekFrames,
        durationMs: Date.now() - startedAt,
        createdAt: Date.now(),
      };
      return {
        status: 'processed',
        record,
        message: `Jev 预筛跳过：《${title}》（${verdict.category} · ${Math.round(verdict.score * 100)}分）`,
      };
    }
    preTriageNote = `Jev 预判通过（${verdict.category} · ${Math.round(verdict.score * 100)}分：${verdict.reason}）`;
  }

  const outcome = await runAutonomousEmployeeAnalysis(
    emp,
    { bvid, title, author, durationSec, preTriageNote },
    {
      defaultBvid: bvid,
      viewCache,
      onPeek: async patch => {
        await emitPeek(patch, patch.cursorTarget === 'info-desc' || patch.cursorTarget === 'comments-list' || patch.cursorTarget === 'subtitle-lines');
      },
    }
  );

  const passed = !emp.skills.includes('jev.triage')
    ? outcome.worth
    : passesDecisionGate(
        {
          worth: outcome.worth,
          score: outcome.score,
          category: outcome.category,
          reason: outcome.reason,
          engine: outcome.engine,
        },
        emp
      );

  if (!passed || !outcome.reportMarkdown.trim()) {
    await emitPeek({
      active: false,
      phase: 'skipped',
      cursorTarget: 'decision-badge',
      cursorLabel: `研判跳过：${outcome.category}`,
      toolHistory: outcome.toolTrace,
      verdict: { worth: outcome.worth, score: outcome.score, category: outcome.category, reason: outcome.reason },
    }, true);
    const record: EmployeeRunRecord = {
      id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      employeeId: emp.id,
      bvid,
      title,
      author,
      url: videoUrl,
      status: 'skipped-gate',
      engine: outcome.engine,
      worth: outcome.worth,
      score: outcome.score,
      category: outcome.category,
      reason: outcome.reason,
      toolTrace: outcome.toolTrace,
      peekFrames,
      durationMs: Date.now() - startedAt,
      createdAt: Date.now(),
    };
    return {
      status: 'processed',
      record,
      message: `自主研判跳过：《${title}》（${outcome.category} · ${Math.round(outcome.score * 100)}分）`,
    };
  }

  let articleId: string | undefined;
  if (emp.skills.includes('library.save')) {
    await emitPeek({
      phase: 'analyzing',
      cursorTarget: 'library-save',
      cursorLabel: `写入资料库 → ${outcome.category}`,
      toolHistory: outcome.toolTrace,
      verdict: { worth: outcome.worth, score: outcome.score, category: outcome.category, reason: outcome.reason },
    }, true);
    const toolSummaryLine = outcome.toolTrace.length
      ? `\n- 自主调用工具：${outcome.toolTrace.map(t => t.summary).join(' → ')}`
      : '';
    const saved = await saveArticleFromBackground({
      title: `【B站精读】${title}`,
      sourceName: `${author} · ${emp.name}`,
      url: videoUrl,
      description: `${outcome.category}（价值分 ${(outcome.score * 100).toFixed(0)}）· ${summarizeReportLine(outcome.reportMarkdown, outcome.reason)}`,
      categoryName: outcome.category || 'B站视频笔记',
      tags: ['B站精读', outcome.category, emp.name].filter(Boolean),
      content: `${outcome.reportMarkdown}\n\n---\n- 视频原链接：${videoUrl}\n- 整理员工：${emp.name}（执行引擎：${outcome.engine}）${toolSummaryLine}`,
    });
    articleId = saved.id;
  }

  await emitPeek({
    active: false,
    phase: 'done',
    cursorTarget: emp.skills.includes('library.save') ? 'library-save' : 'decision-badge',
    cursorLabel: `已完成：${outcome.category} (${Math.round(outcome.score * 100)}分)`,
    toolHistory: outcome.toolTrace,
    verdict: { worth: outcome.worth, score: outcome.score, category: outcome.category, reason: outcome.reason },
  }, true);

  if (emp.skills.includes('notify.high_value')) {
    await publishAiNotification(
      `emp_note_${bvid}_${Date.now()}`,
      emp.name,
      `${outcome.category} · ${title}`,
      'success'
    ).catch(() => {});
  }

  const record: EmployeeRunRecord = {
    id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    employeeId: emp.id,
    bvid,
    title,
    author,
    url: videoUrl,
    status: 'analyzed',
    engine: outcome.engine,
    worth: outcome.worth,
    score: outcome.score,
    category: outcome.category,
    reason: outcome.reason,
    toolTrace: outcome.toolTrace,
    peekFrames,
    articleId,
    durationMs: Date.now() - startedAt,
    createdAt: Date.now(),
  };

  return {
    status: 'processed',
    record,
    message: `已完成自主分析：《${title}》→ ${outcome.category}（调用 ${outcome.toolTrace.length} 步工具）`,
  };
}

export async function runPatrolCycle(targetEmployeeId?: string, _organizerConsent = true): Promise<{ message: string; record?: EmployeeRunRecord }> {
  return serial(async () => {
    const employees = await readEmployees();
    const runs = await readRuns();
    const now = Date.now();

    const targets = targetEmployeeId
      ? employees.filter(e => e.id === targetEmployeeId)
      : employees.filter(e => e.enabled && (!e.nextEligibleAt || e.nextEligibleAt <= now));

    if (!targets.length) {
      await armPatrolAlarm(employees);
      return { message: '当前没有到点需要巡检的数字员工。' };
    }

    const manual = Boolean(targetEmployeeId);
    let lastMessage = '暂无需要处理的新视频。';
    let lastRecord: EmployeeRunRecord | undefined;

    const MAX_SKIP_RETRIES = 5;
    for (const emp of targets) {
      let empProcessed = false;
      try {
        let skippedInRound = 0;
        for (let attempt = 0; attempt < MAX_SKIP_RETRIES; attempt++) {
          const outcome = await executeOneForEmployee(emp, runs, { manual });
          emp.lastRunAt = Date.now();
          emp.lastError = undefined;
          emp.nextEligibleAt = Date.now() + Math.max(5, emp.schedulePolicy.intervalMinutes) * 60_000;
          lastMessage = outcome.message;
          if (outcome.record) {
            runs.unshift(outcome.record);
            lastRecord = outcome.record;
            empProcessed = true;
          }
          const wasSkipped = Boolean(
            outcome.record && (outcome.record.status === 'skipped-gate' || outcome.record.status === 'skipped-no-sub')
          );
          if (wasSkipped) {
            skippedInRound++;
          }
          if (skippedInRound > 0 && outcome.status === 'idle') {
            lastMessage = `已跳过 ${skippedInRound} 条低价值视频，数据源中暂未发现更多未处理视频。`;
          } else if (skippedInRound > 0 && outcome.status === 'limit') {
            lastMessage = `已跳过 ${skippedInRound} 条低价值视频，已达到今日处理上限（${emp.schedulePolicy.dailyLimit} 条）。`;
          } else if (skippedInRound > 0 && outcome.record?.status === 'analyzed') {
            lastMessage = `已跳过 ${skippedInRound} 条并完成自主分析：《${outcome.record.title}》→ ${outcome.record.category}`;
          } else if (wasSkipped && (!emp.decisionGate.retryOnSkip || attempt + 1 >= MAX_SKIP_RETRIES)) {
            if (emp.decisionGate.retryOnSkip && attempt + 1 >= MAX_SKIP_RETRIES) {
              lastMessage = `已连续跳过 ${skippedInRound} 条视频（达单轮重抓上限），本轮暂未沉淀。`;
            }
          }
          if (wasSkipped && emp.decisionGate.retryOnSkip && attempt + 1 < MAX_SKIP_RETRIES) {
            try {
              const prev = await chrome.storage.local.get(EMPLOYEE_LIVE_PEEK_KEY);
              const cur = prev?.[EMPLOYEE_LIVE_PEEK_KEY];
              if (cur && cur.employeeId === emp.id) {
                await publishLivePeek({
                  ...cur,
                  active: true,
                  phase: 'source',
                  cursorTarget: 'folder',
                  cursorLabel: `该视频已跳过，自动重来一轮（第 ${attempt + 2} 次尝试）…`,
                  updatedAt: Date.now(),
                });
              }
            } catch {}
            await new Promise(resolve => setTimeout(resolve, 450));
            continue;
          }
          break;
        }
        if (empProcessed && !manual) break;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : '执行失败';
        emp.lastRunAt = Date.now();
        emp.lastError = errMsg;
        emp.nextEligibleAt = Date.now() + ERROR_BACKOFF_MS;
        try {
          const prev = await chrome.storage.local.get(EMPLOYEE_LIVE_PEEK_KEY);
          const cur = prev?.[EMPLOYEE_LIVE_PEEK_KEY];
          if (cur && cur.employeeId === emp.id && cur.active) {
            await publishLivePeek({
              ...cur,
              active: false,
              phase: 'skipped',
              cursorTarget: 'decision-badge',
              cursorLabel: `执行异常：${errMsg.slice(0, 48)}`,
              updatedAt: Date.now(),
            });
          }
        } catch {}
        const errRecord: EmployeeRunRecord = {
          id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          employeeId: emp.id,
          bvid: '-',
          title: `${emp.name} 执行异常`,
          author: emp.name,
          url: '',
          status: 'error',
          engine: 'none',
          worth: false,
          score: 0,
          category: '运行异常',
          reason: errMsg,
          errorMessage: errMsg,
          durationMs: 0,
          createdAt: Date.now(),
        };
        runs.unshift(errRecord);
        lastRecord = errRecord;
        lastMessage = errMsg;
        if (manual) {
          await writeEmployees(employees);
          await writeRuns(runs);
          await armPatrolAlarm(employees);
          throw new Error(errMsg);
        }
      }
    }

    await writeEmployees(employees);
    await writeRuns(runs);
    await armPatrolAlarm(employees);
    return { message: lastMessage, record: lastRecord };
  });
}

async function recordOrganizerFeedback(run: EmployeeRunRecord, step: OrganizerPlanStep, verdict: 'keep' | 'skip' | null): Promise<void> {
  const employees = await readEmployees();
  const emp = employees.find(e => e.id === run.employeeId);
  if (!emp) return;
  const id = `org-feedback:${run.id}:${step.id}`;
  emp.ownerFeedback = emp.ownerFeedback.filter(f => f.id !== id);
  if (verdict) emp.ownerFeedback.unshift({ id, title: step.title.slice(0, 120), verdict, category: step.type, note: '仅记录本条审批偏好，不代表访问频率或自动学习。', createdAt: Date.now() });
  emp.ownerFeedback = emp.ownerFeedback.slice(0, 40);
  await writeEmployees(employees);
}

async function handleAction(action: string, message: any): Promise<unknown> {
  if (action === 'list') {
    return serial(async () => {
      const [employees, runs] = await Promise.all([readEmployees(), readRuns()]);
      let corrected = false;
      for (const run of runs) {
        if (run.kind !== 'organizer') continue;
        for (const step of run.planSteps || []) {
          // This legacy error was emitted only after Chrome confirmed the write.
          if (step.status !== 'applying' || !step.undo || !step.errorMessage?.startsWith('写入后数据已变化，结果未确认；不会自动重试。')) continue;
          step.status = 'applied';
          step.errorMessage = undefined;
          corrected = true;
        }
      }
      if (corrected) await writeRuns(runs);
      return { employees, runs, workerStamp: EMPLOYEE_WORKER_STAMP };
    });
  }
  if (action === 'save') {
    return serial(async () => {
      const incoming = normalizeEmployee(message.employee);
      incoming.lastError = undefined;
      incoming.nextEligibleAt = undefined;
      const employees = await readEmployees();
      const idx = employees.findIndex(e => e.id === incoming.id);
      if (idx >= 0) {
        incoming.createdAt = employees[idx].createdAt;
        employees[idx] = incoming;
      } else {
        if (employees.length >= 40) throw new Error('数字员工数量已达上限（40 个）。');
        employees.unshift(incoming);
      }
      await writeEmployees(employees);
      await armPatrolAlarm(employees);
      return incoming;
    });
  }
  if (action === 'toggle') {
    return serial(async () => {
      const employees = await readEmployees();
      const emp = employees.find(e => e.id === message.id);
      if (!emp) throw new Error('未找到该数字员工。');
      emp.enabled = Boolean(message.enabled);
      emp.updatedAt = Date.now();
      if (emp.enabled) {
        emp.lastError = undefined;
        emp.nextEligibleAt = Date.now() + 15_000;
      }
      await writeEmployees(employees);
      await armPatrolAlarm(employees);
      return emp;
    });
  }
  if (action === 'delete') {
    return serial(async () => {
      const employees = (await readEmployees()).filter(e => e.id !== message.id);
      const runs = (await readRuns()).filter(r => r.employeeId !== message.id);
      await writeEmployees(employees);
      await writeRuns(runs);
      await armPatrolAlarm(employees);
      return true;
    });
  }
  if (action === 'run-one') {
    if (typeof message.id !== 'string' || !message.id) throw new Error('缺少员工 ID。');
    return runPatrolCycle(message.id, message.organizerConsent === true);
  }
  if (action === 'feedback') {
    return serial(async () => {
      const employees = await readEmployees();
      const emp = employees.find(e => e.id === message.employeeId);
      if (!emp) throw new Error('未找到该数字员工。');
      const fb: EmployeeFeedbackExample = {
        id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: String(message.title || '').trim().slice(0, 120),
        verdict: message.verdict === 'skip' ? 'skip' : 'keep',
        category: String(message.category || '').trim().slice(0, 32) || emp.decisionGate.categories[0],
        note: String(message.note || '').trim().slice(0, 200),
        createdAt: Date.now(),
      };
      if (!fb.title) throw new Error('反馈条目缺少视频标题。');
      emp.ownerFeedback = [fb, ...emp.ownerFeedback.filter(item => item.title !== fb.title)].slice(0, 12);
      emp.updatedAt = Date.now();
      await writeEmployees(employees);
      return emp;
    });
  }
  if (action === 'clear-history') {
    return serial(async () => {
      const runs = (await readRuns()).filter(r => r.employeeId !== message.id);
      await writeRuns(runs);
      return true;
    });
  }
  if (action === 'apply-plan-step') {
    return serial(async () => {
      const runs = await readRuns();
      const run = runs.find(r => r.id === message.runId);
      if (!run || run.kind !== 'organizer' || !run.organizerSnapshot || !Array.isArray(run.planSteps)) throw new Error('未找到对应的整理提案记录。');
      if (run.planSteps.some(s => !Array.isArray(s.dependsOn))) throw new Error('旧版提案缺少安全引用，请重新盘点生成提案。');
      if (run.planSteps.some(s => s.status === 'applying' || s.status === 'undoing')) throw new Error('这份提案暂不可继续执行。');
      const step = run.planSteps.find(s => s.id === message.stepId);
      if (!step) throw new Error('未找到该待审批步骤。');
      if (step.status === 'applied') {
        return { run, step, note: '该步骤已生效。' };
      }

      if (!['pending', 'error'].includes(step.status)) throw new Error('这一步暂不可执行。');
      // Bindings use step IDs, not edited display names.
      if (message.patch && typeof message.patch === 'object') {
        const p = message.patch as Record<string, any>;
        if (typeof p.partitionName === 'string' && p.partitionName.trim()) {
          step.params.partitionName = p.partitionName.trim();
        }
        if (typeof p.folderName === 'string' && p.folderName.trim()) {
          step.params.folderName = p.folderName.trim();
        }
        if (['small', 'medium', 'large'].includes(p.folderSize)) {
          step.params.folderSize = p.folderSize === 'large' ? 'large' : 'small';
        }
      }

      let issued = false;
      try {
        bindOrganizerPlan(run.planSteps, run.organizerSnapshot);
        const res = await applyOrganizerPlanStep(step, {
          steps: run.planSteps,
          snapshot: run.organizerSnapshot,
          beforeWrite: async undo => {
            step.undo = undo;
            step.status = 'applying';
            await writeRuns(runs); // Journal first. A crash leaves an explicit non-retryable state.
            issued = true;
          },
        });
        step.undo = res.undo;
        step.result = res.result;
        step.status = 'applied';
        step.appliedAt = Date.now();
        step.errorMessage = undefined;
        if (Array.isArray(run.peekFrames) && run.peekFrames.length) {
          run.peekFrames[run.peekFrames.length - 1].organizerSteps = JSON.parse(JSON.stringify(run.planSteps));
        }
        await writeRuns(runs);
        const feedbackSaved = await recordOrganizerFeedback(run, step, 'keep').then(() => true, () => false);
        return { run, step, note: res.note + (feedbackSaved ? '' : '（本条偏好保存失败，实际操作已生效。）') };
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : '执行该步骤失败。';
        step.status = issued ? 'applying' : 'error';
        step.errorMessage = errMsg;
        await writeRuns(runs);
        throw new Error(errMsg);
      }
    });
  }
  if (action === 'undo-plan-step') {
    return serial(async () => {
      const runs = await readRuns();
      const run = runs.find(r => r.id === message.runId && r.kind === 'organizer');
      const step = run?.planSteps?.find(s => s.id === message.stepId);
      if (!run || !step) throw new Error('找不到该整理步骤。');
      if (run.planSteps?.some(s => s.status === 'applying' || s.status === 'undoing')) throw new Error('这份提案暂不可撤销。');
      if (run.planSteps?.some(s => s.status === 'applied' && s.dependsOn?.includes(step.id))) throw new Error('请先撤销依赖此步的后续步骤。');
      let issued = false;
      try {
        await undoOrganizerPlanStep(step, async () => {
          step.status = 'undoing';
          await writeRuns(runs);
          issued = true;
        });
        step.status = 'undone';
        step.errorMessage = undefined;
        await writeRuns(runs);
        await recordOrganizerFeedback(run, step, null).catch(() => {});
        return { run, step, note: '已撤销。' };
      } catch (err) {
        step.status = issued ? 'undoing' : 'applied';
        step.errorMessage = issued ? '撤销失败。' : (err instanceof Error ? err.message : '无法撤销。');
        await writeRuns(runs);
        throw new Error(step.errorMessage);
      }
    });
  }
  if (action === 'skip-plan-step') {
    return serial(async () => {
      const runs = await readRuns();
      const run = runs.find(r => r.id === message.runId);
      if (!run || !Array.isArray(run.planSteps)) throw new Error('未找到对应的整理提案记录。');
      const step = run.planSteps.find(s => s.id === message.stepId);
      if (!step) throw new Error('未找到该步骤。');
      if (!['pending', 'error', 'skipped'].includes(step.status)) throw new Error('这一步暂不可跳过。');
      step.status = step.status === 'skipped' ? 'pending' : 'skipped';
      step.errorMessage = undefined;
      if (Array.isArray(run.peekFrames) && run.peekFrames.length) {
        run.peekFrames[run.peekFrames.length - 1].organizerSteps = JSON.parse(JSON.stringify(run.planSteps));
      }
      await writeRuns(runs);
      const feedbackSaved = await recordOrganizerFeedback(run, step, step.status === 'skipped' ? 'skip' : null).then(() => true, () => false);
      return { run, step, note: feedbackSaved ? '步骤状态和本条偏好已保存。' : '步骤状态已保存，但偏好保存失败。' };
    });
  }
  throw new Error('未知数字员工操作');
}

export function initEmployeeWorker(): void {
  chrome.runtime.onMessage.addListener((message: any, sender: any, reply: (value: any) => void) => {
    if (typeof message?.type !== 'string' || !message.type.startsWith('employee:')) return;
    if (sender.id !== chrome.runtime.id || !String(sender.url || '').startsWith(chrome.runtime.getURL(''))) {
      reply({ ok: false, error: '无权操作数字员工' });
      return;
    }
    const action = message.type.slice('employee:'.length);
    void handleAction(action, message)
      .then(result => reply({ ok: true, result }))
      .catch(error => reply({ ok: false, error: error instanceof Error ? error.message : '操作失败' }));
    return true;
  });

  chrome.alarms.onAlarm.addListener((alarm: any) => {
    if (alarm?.name === ALARM) {
      void runPatrolCycle().catch(() => console.warn('[EmployeeWorker] Patrol tick failed.'));
    }
  });

  void serial(async () => {
    const employees = await readEmployees();
    await armPatrolAlarm(employees);
  }).catch(() => console.warn('[EmployeeWorker] Init alarm failed.'));
}
