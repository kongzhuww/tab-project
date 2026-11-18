import {
  AI_SCHEDULE_KEY,
  AI_SCHEDULE_LIVE_PEEK_KEY,
  AI_SCHEDULE_SEEDED_KEY,
  AI_SCHEDULE_WORKER_STAMP,
  configCredentialFingerprint,
  createDefaultGitHubTrendingSchedule,
  isApiScheduleProvider,
  nextDaily,
  safeScheduleList,
  validateScheduleInput,
  type AiSchedule,
  type GitHubTrendingScheduleConfig,
  type SchedulePeekRepoItem,
  type SchedulePeekSnapshot,
} from '../multica/schedule-contract';
import { publishAiNotification } from '../multica/ai-notifications';
import { loadConfig, saveConversation, streamOpenAiCompatible, type LocalConversation } from '../services/byok.service';
import { sessionTitle } from '../multica/session-content';
import { pingNativeHost, runLocalAgent } from '../services/native-bridge.service';
import { saveArticleFromBackground } from '../backpack/article-background';
import {
  buildGitHubTrendingDigestPrompt,
  buildGitHubTrendingFallbackDigest,
  clampTrendingTopN,
  collectGitHubTrendingInspected,
  type GitHubTrendingInspectedRepo,
} from '../github/trending-digest';
declare const chrome:any;
const ALARM='ai-workspace-schedule-v1', MAX_LATE=10*60*1000, WATCHDOG=10*60*1000;
let queue:Promise<unknown> = Promise.resolve();
function serial<T>(fn:()=>Promise<T>):Promise<T> { const result=queue.then(fn); queue=result.catch(()=>{}); return result; }
async function read():Promise<AiSchedule[]> { return safeScheduleList((await chrome.storage.local.get(AI_SCHEDULE_KEY))[AI_SCHEDULE_KEY]); }
async function write(items:AiSchedule[]):Promise<void> {
  let keptPeekRuns = 0;
  const pruned = items.map(item => {
    if (item.peekFrames?.length && keptPeekRuns < 6) {
      keptPeekRuns++;
      return item;
    }
    return item.peekFrames ? { ...item, peekFrames: undefined } : item;
  });
  await chrome.storage.local.set({[AI_SCHEDULE_KEY]:pruned});
}
async function publishSchedulePeek(snapshot:SchedulePeekSnapshot):Promise<void> {
  try { await chrome.storage.local.set({[AI_SCHEDULE_LIVE_PEEK_KEY]:snapshot}); } catch {}
}
function peekHeadline(rawPrompt:string):string {
  return String(rawPrompt||'').trim().split(/\r?\n/)[0].slice(0,60)||'自动化任务';
}
function peekDwell(ms:number):Promise<void> {
  const isBrowser = typeof navigator !== 'undefined' && /Mozilla/i.test(navigator.userAgent || '');
  if (!isBrowser || ms <= 0) return Promise.resolve();
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function arm(items:AiSchedule[]):Promise<void> {
  const running=items.some(item=>item.state==='running');
  const due=items.flatMap(item => [item.notificationPending ? Date.now()+60000 : Infinity, item.state==='pending' && !running && !item.notificationPending ? item.runAt : item.state==='running' && Number.isFinite(item.startedAt) ? item.startedAt!+WATCHDOG : Infinity]).filter(Number.isFinite);
  if (!due.length) { await chrome.alarms.clear(ALARM); return; }
  await chrome.alarms.create(ALARM,{when:Math.max(Date.now()+1000,Math.min(...due))});
}
export async function createAiSchedule(input:any):Promise<AiSchedule> {
  validateScheduleInput(input);
  let keyFingerprint:string|undefined;
  let providerLabel:string|undefined;
  let model=typeof input.model==='string'?input.model.trim():'';
  if (isApiScheduleProvider(input.provider)) {
    const config=await loadConfig(); if (!config.configured) throw new Error(`请先配置 ${config.label || '模型服务'}。`);
    keyFingerprint=await configCredentialFingerprint(config);
    if (keyFingerprint!==input.keyFingerprint) throw new Error(`${config.label || '模型服务'} 配置已更换，请重新打开定时任务。`);
    providerLabel=typeof input.providerLabel==='string' && input.providerLabel.trim() ? input.providerLabel.trim().slice(0,40) : config.label;
  } else if (input.provider==='auto') {
    providerLabel='智能自动';
  }
  const date=new Date(input.runAt);
  const kind = input.kind==='github-trending'?'github-trending':'prompt';
  const githubConfig: GitHubTrendingScheduleConfig | undefined = kind==='github-trending'
    ? {
        topN: clampTrendingTopN(input.githubConfig?.topN, 10),
        since: input.githubConfig?.since==='weekly'||input.githubConfig?.since==='monthly'?input.githubConfig.since:'daily',
        focus: typeof input.githubConfig?.focus==='string'?input.githubConfig.focus.trim().slice(0,1000):'',
        saveToLibrary: input.githubConfig?.saveToLibrary !== false,
      }
    : undefined;
  const item:AiSchedule={
    id:crypto.randomUUID(),
    provider:input.provider,
    ...(providerLabel?{providerLabel}:{}),
    kind,
    prompt:input.prompt.trim(),
    runAt:input.runAt,
    repeat:input.repeat,
    localHour:date.getHours(),
    localMinute:date.getMinutes(),
    state:'pending',
    createdAt:Date.now(),
    ...(keyFingerprint?{keyFingerprint}:{}),
    ...(model?{model}:{}),
    ...(githubConfig?{githubConfig}:{}),
  };
  return serial(async()=>{
    const all=await read(); if (all.length>=100) throw new Error('定时任务已达上限，请先删除旧记录。');
    all.unshift(item); await write(all);
    try { await arm(all); } catch { throw new Error('任务已保存，但浏览器定时唤醒未确认；请查看列表，勿重复创建。'); }
    return item;
  });
}
export async function listAiSchedules():Promise<AiSchedule[]> {
  return serial(async()=>{
    const rawSchedules=(await chrome.storage.local.get(AI_SCHEDULE_KEY))[AI_SCHEDULE_KEY];
    if (rawSchedules===undefined || (Array.isArray(rawSchedules) && rawSchedules.length===0)) {
      const seededFlag=(await chrome.storage.local.get(AI_SCHEDULE_SEEDED_KEY))[AI_SCHEDULE_SEEDED_KEY];
      if (!seededFlag) {
        const preset=[createDefaultGitHubTrendingSchedule()];
        await write(preset);
        await chrome.storage.local.set({[AI_SCHEDULE_SEEDED_KEY]:true});
        await arm(preset).catch(()=>{});
        return preset;
      }
    }
    const list = safeScheduleList(rawSchedules);
    let upgraded = false;
    const migrated = list.map(item => {
      if (item.id === 'preset-github-trending-daily' && item.isDefault && item.provider === 'native-pi' && !item.providerExplicit && !item.lastReportContent) {
        upgraded = true;
        return {
          ...item,
          provider: 'auto' as const,
          providerLabel: '智能自动',
          ...(item.state === 'failed' ? { state: 'pending' as const, lastResult: undefined } : {}),
        };
      }
      return item;
    });
    if (upgraded) await write(migrated);
    return migrated;
  });
}
export async function updateAiSchedule(id:string,input:any):Promise<AiSchedule> {
  validateScheduleInput(input);
  let keyFingerprint:string|undefined;
  let providerLabel:string|undefined;
  const model=typeof input.model==='string'?input.model.trim():'';
  if (isApiScheduleProvider(input.provider)) {
    const config=await loadConfig(); if (!config.configured) throw new Error(`请先配置 ${config.label || '模型服务'}。`);
    keyFingerprint=await configCredentialFingerprint(config);
    if (keyFingerprint!==input.keyFingerprint) throw new Error(`${config.label || '模型服务'} 配置已更换，请重新打开定时任务。`);
    providerLabel=typeof input.providerLabel==='string' && input.providerLabel.trim() ? input.providerLabel.trim().slice(0,40) : config.label;
  } else if (input.provider==='auto') {
    providerLabel='智能自动';
  }
  const date=new Date(input.runAt);
  const kind=input.kind==='github-trending'?'github-trending':'prompt';
  const githubConfig: GitHubTrendingScheduleConfig | undefined = kind==='github-trending'
    ? {
        topN: clampTrendingTopN(input.githubConfig?.topN, 10),
        since: input.githubConfig?.since==='weekly'||input.githubConfig?.since==='monthly'?input.githubConfig.since:'daily',
        focus: typeof input.githubConfig?.focus==='string'?input.githubConfig.focus.trim().slice(0,1000):'',
        saveToLibrary: input.githubConfig?.saveToLibrary !== false,
      }
    : undefined;
  return serial(async()=>{
    const all=await read(), index=all.findIndex(item=>item.id===id);
    if (index<0) throw new Error('定时任务不存在。');
    const prev=all[index];
    if (prev.state==='running') throw new Error('任务正在执行，请等待完成后再编辑。');
    const updated:AiSchedule={
      ...prev,
      provider:input.provider,
      providerExplicit:true,
      ...(providerLabel?{providerLabel}:{}),
      kind,
      prompt:input.prompt.trim(),
      runAt:input.runAt,
      repeat:input.repeat,
      localHour:date.getHours(),
      localMinute:date.getMinutes(),
      state:prev.state==='paused'?'paused':'pending',
      ...(keyFingerprint?{keyFingerprint}:{}),
      ...(model?{model}:{}),
    };
    if (!isApiScheduleProvider(updated.provider)) {
      delete updated.keyFingerprint;
      if (updated.provider!=='auto') delete updated.providerLabel;
    }
    if (githubConfig) updated.githubConfig=githubConfig;
    else delete updated.githubConfig;
    all[index]=updated;
    await write(all); await arm(all);
    return updated;
  });
}
export async function changeAiSchedule(action:'pause'|'resume'|'delete',id:string):Promise<void> {
  return serial(async()=>{
    const all=await read(), index=all.findIndex(item=>item.id===id);
    if (index<0) throw new Error('定时任务不存在。');
    const item=all[index];
    if (item.state==='running') throw new Error('任务已开始执行，不能假装取消；请等待结果。');
    if (action==='delete') all.splice(index,1);
    else if (action==='pause') { if (item.state!=='pending') throw new Error('该任务当前不能暂停。'); item.state='paused'; }
    else {
      if (item.repeat==='daily' && ['paused','failed','unknown'].includes(item.state)) item.runAt=nextDaily(item.localHour,item.localMinute,Date.now());
      else if (!(item.repeat==='once' && item.state==='paused' && item.runAt>Date.now()+10000)) throw new Error('此任务不能恢复，请重新创建。');
      item.state='pending'; item.lastResult='已恢复';
    }
    await write(all); await arm(all);
  });
}
async function resolveExecutionTarget(item: AiSchedule): Promise<
  | { mode: 'api'; config: Awaited<ReturnType<typeof loadConfig>>; model: string; label: string }
  | { mode: 'native'; agentId: string; model?: string; label: string }
  | { mode: 'fallback'; label: string }
  | { mode: 'error'; message: string; label: string }
> {
  if (item.provider === 'native-pi') {
    return { mode: 'native', agentId: 'pi', model: item.model || undefined, label: '本机 Pi' };
  }

  if (isApiScheduleProvider(item.provider)) {
    const label = item.providerLabel || 'DeepSeek';
    const config = await loadConfig();
    if (!config.configured || !item.keyFingerprint || (await configCredentialFingerprint(config)) !== item.keyFingerprint || !item.model) {
      return { mode: 'error', label, message: `${label} 配置已更换或未配置，未发起请求。` };
    }
    return { mode: 'api', config, model: item.model, label };
  }

  // item.provider === 'auto'
  const config = await loadConfig();
  if (config.configured && config.model) {
    return { mode: 'api', config, model: config.model, label: config.label || '模型服务' };
  }
  const ping = await pingNativeHost().catch(() => null);
  const installed = ping?.agents?.filter(a => a.installed) || [];
  const chosen = installed.find(a => a.id === 'pi') || installed[0];
  if (chosen) {
    return { mode: 'native', agentId: chosen.id, model: item.model || undefined, label: `本机 ${chosen.name}` };
  }
  if (ping?.piAvailable) {
    return { mode: 'native', agentId: 'pi', model: item.model || undefined, label: '本机 Pi' };
  }
  return { mode: 'fallback', label: '基础结构化简报' };
}

async function execute(item:AiSchedule):Promise<{
  outcome:'success'|'error'|'unknown';
  message:string;
  notify:boolean;
  reportContent?:string;
  articleId?:string;
  conversationId?:string;
  peekFrames?:SchedulePeekSnapshot[];
}> {
  let effectivePrompt=item.prompt;
  let inspectedCount=0;
  let sourceLabel='';
  let collectedRepos: GitHubTrendingInspectedRepo[] = [];
  let trendingSince: 'daily' | 'weekly' | 'monthly' = 'daily';
  const kind = item.kind === 'github-trending' ? 'github-trending' : 'prompt';
  let engineLabel = item.provider === 'native-pi' ? '本机 Pi' : item.provider === 'auto' ? '智能引擎' : (item.providerLabel || 'DeepSeek');
  const peekFrames: SchedulePeekSnapshot[] = [];
  let peekState: SchedulePeekSnapshot = {
    jobId: item.id,
    jobTitle: peekHeadline(item.prompt),
    kind,
    provider: item.provider,
    providerLabel: engineLabel,
    active: true,
    phase: 'fetching',
    cursorTarget: kind === 'github-trending' ? 'source' : 'ai-panel',
    cursorLabel: kind === 'github-trending' ? '连接 GitHub 榜单数据源…' : '准备执行提示词任务…',
    repos: [],
    timelineSteps: [kind === 'github-trending' ? '连接 GitHub 榜单数据源…' : '准备执行提示词任务…'],
    updatedAt: Date.now(),
  };

  const emitPeek = async (patch: Partial<SchedulePeekSnapshot>, recordFrame = true, dwellMs = 0) => {
    const prevSteps = peekState.timelineSteps || [];
    const nextLabel = patch.cursorLabel || peekState.cursorLabel;
    const timelineSteps =
      nextLabel && prevSteps[prevSteps.length - 1] !== nextLabel
        ? [...prevSteps.slice(-49), nextLabel]
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
    await publishSchedulePeek(peekState);
    if (dwellMs > 0) await peekDwell(dwellMs);
  };

  await emitPeek({}, true, kind === 'github-trending' ? 250 : 0);

  let latestPeekRepos: SchedulePeekRepoItem[] = [];
  if (kind==='github-trending') {
    const topN=clampTrendingTopN(item.githubConfig?.topN,10);
    trendingSince=item.githubConfig?.since==='weekly'||item.githubConfig?.since==='monthly'?item.githubConfig.since:'daily';
    const signal=AbortSignal.timeout(90_000);
    try {
      const collected=await collectGitHubTrendingInspected({topN,since:trendingSince,signal});
      sourceLabel=collected.sourceLabel;
      collectedRepos=collected.repos;
      inspectedCount=collected.repos.length;
      const peekRepos: SchedulePeekRepoItem[] = collected.repos.map(r => ({
        rank: r.rank,
        fullName: r.fullName,
        url: r.url,
        description: r.description,
        language: r.language,
        stars: r.stars,
        todayStars: r.todayStars,
        status: 'pending',
        readmeExcerpt: r.readmeExcerpt,
      }));
      await emitPeek({
        phase: 'trending',
        cursorTarget: 'source',
        cursorLabel: `已抓到「${sourceLabel}」前 ${inspectedCount} 个仓库`,
        sourceLabel,
        repos: peekRepos.map(r => ({ ...r, readmeExcerpt: undefined })),
      }, true, 320);

      for (let i = 0; i < peekRepos.length; i++) {
        const cur = peekRepos[i];
        peekRepos[i] = { ...cur, status: 'reading' };
        await emitPeek({
          phase: 'readme',
          cursorTarget: 'repo-card',
          cursorLabel: `打开 #${cur.rank} ${cur.fullName}`,
          activeRepoIndex: i,
          activeRepo: { ...cur, status: 'reading', readmeExcerpt: undefined },
          repos: peekRepos.map(r => ({ ...r, readmeExcerpt: undefined })),
        }, false, 160);
        await emitPeek({
          phase: 'readme',
          cursorTarget: 'readme-panel',
          cursorLabel: `通读 #${cur.rank} ${cur.fullName} README`,
          activeRepoIndex: i,
          activeRepo: { ...cur, status: 'reading' },
          repos: peekRepos.map(r => ({ ...r, readmeExcerpt: undefined })),
        }, true, 220);
        peekRepos[i] = { ...cur, status: 'done' };
      }
      latestPeekRepos = peekRepos.map(r => ({ ...r, readmeExcerpt: undefined }));

      effectivePrompt=buildGitHubTrendingDigestPrompt(collected.repos,{
        sourceLabel:collected.sourceLabel,
        since:trendingSince,
        focus:item.githubConfig?.focus,
        customPrompt:item.prompt,
      });
    } catch (err) {
      const msg = err instanceof Error?`抓取 GitHub 榜单失败：${err.message}`:'抓取 GitHub 榜单失败，请检查网络后重试。';
      await emitPeek({
        active: false,
        phase: 'error',
        cursorTarget: 'source',
        cursorLabel: msg.slice(0, 72),
      }, true);
      return {
        outcome:'error',
        message:msg,
        notify:true,
        peekFrames,
      };
    }
  }

  const target = await resolveExecutionTarget(item);
  engineLabel = target.label;

  if (target.mode === 'error') {
    await emitPeek({
      active: false,
      phase: 'error',
      cursorTarget: 'ai-panel',
      providerLabel: engineLabel,
      cursorLabel: target.message.slice(0, 72),
    }, true);
    return { outcome: 'error', message: target.message, notify: true, peekFrames };
  }

  await emitPeek({
    phase: 'analyzing',
    cursorTarget: 'ai-panel',
    providerLabel: engineLabel,
    cursorLabel: target.mode === 'fallback'
      ? (kind === 'github-trending' ? `未配置 AI 引擎，正在生成前 ${inspectedCount} 个仓库的结构化基础简报…` : '未检测到可用 AI 模型或本机终端')
      : (kind === 'github-trending' ? `已看完全部 ${inspectedCount} 个仓库，${engineLabel} 正在评估价值与逐一撰写介绍…` : `${engineLabel} 正在执行提示词指令…`),
    ...(latestPeekRepos.length ? { repos: latestPeekRepos } : {}),
  }, true);

  let reportText='';
  let conversationId:string|undefined;

  if (target.mode === 'fallback') {
    if (kind !== 'github-trending') {
      const noEngineMsg = '尚未配置模型服务（DeepSeek / 硅基流动 / Ollama）或本机终端，请前往「AI 设置」完成配置后再运行。';
      await emitPeek({
        active: false,
        phase: 'error',
        cursorTarget: 'ai-panel',
        providerLabel: engineLabel,
        cursorLabel: noEngineMsg.slice(0, 72),
      }, true);
      return { outcome: 'error', message: noEngineMsg, notify: true, peekFrames };
    }
    reportText = buildGitHubTrendingFallbackDigest(collectedRepos, {
      sourceLabel: sourceLabel || 'GitHub Trending',
      since: trendingSince,
      focus: item.githubConfig?.focus,
    });
  } else if (target.mode === 'native') {
    try {
      const res=await runLocalAgent({
        agentId:target.agentId,
        model:target.model,
        thinking:'medium',
        toolsEnabled:false,
        timeoutMs:240_000,
        prompt:effectivePrompt,
      });
      reportText=(res.text||'').trim();
      if (!reportText) throw new Error(`${engineLabel} 未返回有效报告正文`);
    } catch (error) {
      const errMsg = error instanceof Error?`${engineLabel} 执行失败：${error.message}`:`${engineLabel} 执行失败。`;
      await emitPeek({
        active: false,
        phase: 'error',
        cursorTarget: 'ai-panel',
        providerLabel: engineLabel,
        cursorLabel: errMsg.slice(0, 72),
      }, true);
      return {
        outcome:'error',
        message:errMsg,
        notify:true,
        peekFrames,
      };
    }
  } else {
    const chat:LocalConversation={id:crypto.randomUUID(),provider:'deepseek',model:target.model,title:sessionTitle(item.prompt),updatedAt:Date.now(),messages:[{role:'user',content:kind==='github-trending'?`[GitHub 榜单助手] ${item.prompt}`:item.prompt,incomplete:true},{role:'assistant',content:'',incomplete:true}]};
    try { await saveConversation(chat); } catch {
      await emitPeek({ active: false, phase: 'error', cursorTarget: 'ai-panel', providerLabel: engineLabel, cursorLabel: '本机会话存储失败' }, true);
      return {outcome:'error',message:'会话未能保存，请求未发送。',notify:true,peekFrames};
    }
    try {
      await streamOpenAiCompatible(target.config,target.model,[{role:'user',content:effectivePrompt}],AbortSignal.timeout(9*60*1000),text=>{chat.messages[1].content+=text;},undefined,text=>{chat.messages[1].reasoning=(chat.messages[1].reasoning||'')+text;});
      if (!chat.messages[1].content.trim()) throw new Error('没有返回可显示的正文');
      chat.messages[0].incomplete=false; chat.messages[1].incomplete=false; chat.updatedAt=Date.now();
      reportText=chat.messages[1].content.trim();
      conversationId=chat.id;
      try { await saveConversation(chat); } catch {
        await emitPeek({ active: false, phase: 'done', cursorTarget: 'report-done', providerLabel: engineLabel, cursorLabel: '已生成报告，会话保存未确认', reportPreview: reportText.slice(0, 900) }, true);
        return {outcome:'unknown',message:'回复保存未确认，请在本机会话核对。',notify:true,reportContent:reportText.slice(0,32000),conversationId,peekFrames};
      }
    } catch (error) {
      chat.updatedAt=Date.now(); try { await saveConversation(chat); } catch { /* partial output is best effort */ }
      const definite=error instanceof Error && /（(?:401|402|429)）|HTTP (?:400|401|402|403|404|422|429)\b/.test(error.message);
      await emitPeek({ active: false, phase: 'error', cursorTarget: 'ai-panel', providerLabel: engineLabel, cursorLabel: `${engineLabel} 请求异常或中断` }, true);
      return {outcome:definite?'error':'unknown',message:definite?`请求失败，请检查 ${engineLabel} 配置。`:'请求中断或结果不确定，可能已计费；请先核对，勿自动重试。',notify:true,peekFrames};
    }
  }

  let articleId:string|undefined;
  if (kind==='github-trending' && item.githubConfig?.saveToLibrary!==false && reportText) {
    await emitPeek({
      phase: 'saving',
      cursorTarget: 'library-save',
      providerLabel: engineLabel,
      cursorLabel: '写入「资料库 → 文章（GitHub 每日榜单）」…',
      reportPreview: reportText.slice(0, 900),
    }, true, 260);
    try {
      const today=new Date().toLocaleDateString('zh-CN');
      const saved=await saveArticleFromBackground({
        title:`【GitHub 榜单精选 · Top ${inspectedCount || item.githubConfig?.topN || 10}】${today}`,
        sourceName:`GitHub 榜单助手 · ${engineLabel}`,
        url:`https://github.com/trending?since=${item.githubConfig?.since||'daily'}`,
        description:`已通读 ${sourceLabel||'GitHub Trending'} 前 ${inspectedCount||10} 个仓库并整理介绍。`,
        categoryName:'GitHub 每日榜单',
        tags:['GitHub榜单','自动化',item.githubConfig?.since||'daily'],
        content:reportText,
      });
      articleId=saved.id;
    } catch {}
  }

  await emitPeek({
    active: false,
    phase: 'done',
    cursorTarget: 'report-done',
    providerLabel: engineLabel,
    cursorLabel: kind==='github-trending'
      ? (target.mode === 'fallback' ? `已完成前 ${inspectedCount} 个仓库基础简报（配置 AI 后可深度点评）！` : `已完成前 ${inspectedCount} 个仓库评估与介绍！`)
      : '自动化执行完成！',
    reportPreview: reportText.slice(0, 900),
  }, true);

  const msg=kind==='github-trending'
    ? (target.mode === 'fallback'
        ? `已抓取「${sourceLabel||'GitHub 榜单'}」前 ${inspectedCount} 个仓库并生成基础简报${articleId?'（已写入资料库）':''}；配置模型服务后可开启 AI 点评。`
        : `已完成「${sourceLabel||'GitHub 榜单'}」前 ${inspectedCount} 个仓库分析${articleId?'（已写入资料库与报告预览）':'（已生成报告预览）'}。`)
    : target.mode==='native'
      ? `已完成 ${engineLabel} 执行，点击「查看报告」查看正文。`
      : '回复已保存到本机会话。';

  return {
    outcome:'success',
    message:msg,
    notify:true,
    reportContent:reportText.slice(0,32000),
    peekFrames,
    ...(articleId?{articleId}:{}),
    ...(conversationId?{conversationId}:{}),
  };
}
function applyExecutionResult(
  live:AiSchedule,
  runId:string,
  result:Awaited<ReturnType<typeof execute>>
):void {
  live.lastResult=result.message;
  if (result.reportContent) live.lastReportContent=result.reportContent;
  if (result.articleId) live.lastArticleId=result.articleId;
  if (result.conversationId) live.lastConversationId=result.conversationId;
  if (result.peekFrames?.length) live.peekFrames=result.peekFrames;
  if (result.notify) live.notificationPending={runId,outcome:result.outcome};
}

async function flushNotifications():Promise<void> {
  await serial(async()=>{
    const all=await read();
    for (const item of all) {
      const pending=item.notificationPending;
      if (!pending) continue;
      try {
        const providerTitle = item.kind==='github-trending' ? 'GitHub 榜单助手' : item.provider==='native-pi' ? '本机 Pi' : (item.providerLabel || 'DeepSeek');
        await publishAiNotification(`ai_sched_${pending.runId}`,providerTitle,sessionTitle(item.prompt),pending.outcome);
        delete item.notificationPending;
        await write(all);
      } catch { /* Keep the durable outbox for a later alarm. */ }
    }
    await arm(all);
  });
}
export async function runDueAiSchedules():Promise<void> {
  await flushNotifications();
  const selected=await serial(async()=>{
    const all=await read(),now=Date.now();
    // A watchdog cannot establish whether an interrupted network write happened.
    for (const item of all) if (item.state==='running' && item.startedAt && now-item.startedAt>=WATCHDOG) { item.state='unknown'; item.lastResult='执行中断或超时，结果未确认；未自动重试。'; if (item.runId) item.notificationPending={runId:item.runId,outcome:'unknown'}; }
    if (all.some(item=>item.state==='running')) { await write(all); await arm(all); return null; }
    const item=all.filter(x=>x.state==='pending' && !x.notificationPending && x.runAt<=now).sort((a,b)=>a.runAt-b.runAt)[0];
    if (!item) { await write(all); await arm(all); return null; }
    const runId=crypto.randomUUID();
    if (now-item.runAt>MAX_LATE) {
      item.lastResult='错过计划时间超过 10 分钟，本次未执行。'; item.runId=runId; item.notificationPending={runId,outcome:'skipped'};
      if (item.repeat==='daily') item.runAt=nextDaily(item.localHour,item.localMinute,now); else item.state='skipped';
      await write(all); await arm(all); return {item:{...item},runId,missed:true};
    }
    item.state='running'; item.startedAt=now; item.runId=runId;
    await write(all); await arm(all);
    return {item:{...item},runId,missed:false};
  });
  if (!selected) { await flushNotifications(); return; }
  if (selected.missed) { await flushNotifications(); void runDueAiSchedules().catch(()=>{}); return; }
  let result:Awaited<ReturnType<typeof execute>>;
  try { result=await execute(selected.item); } catch { result={outcome:'unknown',message:'运行中断，结果未确认；请核对后再操作。',notify:true}; }
  const committed=await serial(async()=>{
    const all=await read(), live=all.find(x=>x.id===selected.item.id);
    if (!live || live.state!=='running' || live.runId!==selected.runId) return false;
    applyExecutionResult(live,selected.runId,result);
    if (result.outcome==='success' && live.repeat==='daily') { live.state='pending'; live.runAt=nextDaily(live.localHour,live.localMinute,Date.now()); }
    else live.state=result.outcome==='success'?'completed':result.outcome==='error'?'failed':'unknown';
    await write(all); await arm(all); return true;
  });
  if (committed && result.notify) await flushNotifications();
  void runDueAiSchedules().catch(()=>{});
}
export async function runAiScheduleNow(id:string):Promise<{message:string;item?:AiSchedule}> {
  const prep=await serial(async()=>{
    const all=await read();
    if (all.some(x=>x.state==='running')) throw new Error('已有定时任务正在执行，请稍候完成后再试。');
    const item=all.find(x=>x.id===id);
    if (!item) throw new Error('未找到该自动化任务。');
    const runId=crypto.randomUUID();
    const prevRunAt=item.runAt;
    item.state='running';
    item.startedAt=Date.now();
    item.runId=runId;
    await write(all);
    return {snapshot:{...item},runId,prevRunAt};
  });

  let result:Awaited<ReturnType<typeof execute>>;
  try {
    result=await execute(prep.snapshot);
  } catch {
    result={outcome:'unknown',message:'运行中断，结果未确认；请核对后再操作。',notify:true};
  }

  let updatedItem:AiSchedule|undefined;
  const committed=await serial(async()=>{
    const all=await read(), live=all.find(x=>x.id===prep.snapshot.id);
    if (!live || live.state!=='running' || live.runId!==prep.runId) return false;
    applyExecutionResult(live,prep.runId,result);
    if (result.outcome==='success') {
      if (live.repeat==='daily') {
        live.state='pending';
        live.runAt=prep.prevRunAt>Date.now()?prep.prevRunAt:nextDaily(live.localHour,live.localMinute,Date.now());
      } else {
        live.state='completed';
      }
    } else {
      live.state=result.outcome==='error'?'failed':'unknown';
    }
    updatedItem={...live};
    await write(all); await arm(all); return true;
  });

  if (committed && result.notify) await flushNotifications();
  if (result.outcome!=='success') throw new Error(result.message);
  return {message:result.message,item:updatedItem};
}

export function initAiScheduler():void {
  chrome.runtime.onMessage.addListener((message:any,sender:any,reply:(value:any)=>void)=>{
    if (typeof message?.type!=='string' || !message.type.startsWith('ai-schedule:')) return;
    if (sender.id!==chrome.runtime.id || !String(sender.url||'').startsWith(chrome.runtime.getURL(''))) { reply({ok:false,error:'无权操作定时任务'}); return; }
    const action=message.type.slice('ai-schedule:'.length);
    const operation=action==='stamp'?Promise.resolve({stamp:AI_SCHEDULE_WORKER_STAMP}):action==='list'?listAiSchedules():action==='create'?createAiSchedule(message.input):action==='update'?updateAiSchedule(message.id,message.input):action==='run-now'?runAiScheduleNow(message.id):['pause','resume','delete'].includes(action)?changeAiSchedule(action as 'pause'|'resume'|'delete',message.id):Promise.reject(new Error('未知操作'));
    void operation.then(result=>reply({ok:true,result})).catch(error=>reply({ok:false,error:error instanceof Error?error.message:'操作未确认'}));
    return true;
  });
  chrome.alarms.onAlarm.addListener((alarm:any)=>{ if(alarm?.name===ALARM) void runDueAiSchedules().catch(()=>console.warn('[AI schedule] Execution not confirmed.')); });
  // On worker restart, in-flight requests may already have reached the remote service.
  void serial(async()=>{
    const all=await read();
    for(const item of all) if(item.state==='running') { item.state='unknown'; item.lastResult='后台已重启，结果未确认；未自动重试。'; if (item.runId) item.notificationPending={runId:item.runId,outcome:'unknown'}; }
    await write(all); await arm(all);
  }).then(()=>flushNotifications()).catch(()=>console.warn('[AI schedule] Restore not confirmed.'));
}
