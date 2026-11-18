import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';
const {nextDaily,validateScheduleInput,safeScheduleList,keyFingerprint,configCredentialFingerprint,AI_SCHEDULE_LIVE_PEEK_KEY,AI_SCHEDULE_SEEDED_KEY}=await loadTsModule('src/multica/schedule-contract.ts');
const {ARTICLES_STORAGE_KEY}=await loadTsModule('src/backpack/constants.ts');
const trendingDigest = await loadTsModule('src/github/trending-digest.ts');

test('schedule validation, local daily recurrence and corrupt data protection',()=>{
  const now=Date.now();
  assert.throws(()=>validateScheduleInput({provider:'deepseek',repeat:'once',prompt:'',runAt:now+60000,model:'deepseek-flash'},now));
  assert.throws(()=>validateScheduleInput({provider:'unsupported',repeat:'daily',prompt:'test',runAt:now+60000},now));
  assert.ok(nextDaily(8,30,now)>now);
  assert.throws(()=>safeScheduleList({unexpected:true}));
});

test('DeepSeek schedule executes once, stores result, and refuses a changed account',async t=>{
  const before={chrome:globalThis.chrome,fetch:globalThis.fetch,now:Date.now};
  t.after(()=>{globalThis.chrome=before.chrome;globalThis.fetch=before.fetch;Date.now=before.now;});
  let now=Date.now(); Date.now=()=>now;
  const data={byokConfigV1:{deepseek:{key:'fake-key-a',model:'deepseek-flash'}}},alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  let requests=0;
  globalThis.fetch=async()=>{requests++;return new Response('data: {"choices":[{"delta":{"content":"test reply"}}]}\n\ndata: [DONE]\n\n',{status:200});};
  const s=await loadTsModule('src/background/ai-scheduler.ts');
  await s.createAiSchedule({provider:'deepseek',repeat:'once',prompt:'test prompt',runAt:now+60000,model:'deepseek-flash',keyFingerprint:await keyFingerprint('fake-key-a')});
  assert.equal(requests,0); now+=61000; await s.runDueAiSchedules();
  assert.equal(requests,1); assert.equal(data.byokConversationsV1[0].messages[1].content,'test reply');
  assert.equal(data.aiWorkspaceSchedulesV1[0].state,'completed');
  assert.equal(data.notificationHistoryV1.items[0].level,'success');
  await s.runDueAiSchedules(); assert.equal(requests,1);
  await s.createAiSchedule({provider:'deepseek',repeat:'once',prompt:'account check',runAt:now+60000,model:'deepseek-flash',keyFingerprint:await keyFingerprint('fake-key-a')});
  data.byokConfigV1.deepseek.key='fake-key-b'; now+=61000; await s.runDueAiSchedules();
  assert.equal(requests,1,'must not charge the new account');
  assert.equal(data.aiWorkspaceSchedulesV1[0].state,'failed');
});

test('notification storage failure keeps an outbox instead of repeating a paid request',async t=>{
  const before={chrome:globalThis.chrome,fetch:globalThis.fetch,now:Date.now};
  t.after(()=>{globalThis.chrome=before.chrome;globalThis.fetch=before.fetch;Date.now=before.now;});
  let now=Date.now(); Date.now=()=>now; let requests=0, failHistory=true;
  const data={byokConfigV1:{deepseek:{key:'key-a',model:'deepseek-flash'}}},alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>{if (failHistory && values.notificationHistoryV1) throw Error('storage failure');Object.assign(data,structuredClone(values));}}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  globalThis.fetch=async()=>{requests++;return new Response('data: {"choices":[{"delta":{"content":"reply"}}]}\n\ndata: [DONE]\n\n');};
  const s=await loadTsModule('src/background/ai-scheduler.ts');
  await s.createAiSchedule({provider:'deepseek',repeat:'once',prompt:'test',runAt:now+60000,model:'deepseek-flash',keyFingerprint:await keyFingerprint('key-a')});
  now+=61000; await s.runDueAiSchedules();
  assert.equal(data.aiWorkspaceSchedulesV1[0].state,'completed');
  assert.ok(data.aiWorkspaceSchedulesV1[0].notificationPending);
  failHistory=false; await s.runDueAiSchedules();
  assert.equal(requests,1); assert.equal(data.notificationHistoryV1.items.length,1);
  assert.equal(data.aiWorkspaceSchedulesV1[0].notificationPending,undefined);
});

test('missed jobs are not executed or automatically retried',async t=>{
  const before={chrome:globalThis.chrome,fetch:globalThis.fetch,now:Date.now};
  t.after(()=>{globalThis.chrome=before.chrome;globalThis.fetch=before.fetch;Date.now=before.now;});
  let now=Date.now(); Date.now=()=>now; let calls=0;
  const data={byokConfigV1:{deepseek:{key:'key-a',model:'deepseek-flash'}}},alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  globalThis.fetch=async()=>{calls++;throw Error('should not call');};
  const s=await loadTsModule('src/background/ai-scheduler.ts');
  await s.createAiSchedule({provider:'deepseek',repeat:'once',prompt:'test',runAt:now+60000,model:'deepseek-flash',keyFingerprint:await keyFingerprint('key-a')});
  now+=12*60000; await s.runDueAiSchedules();
  assert.equal(calls,0); assert.equal(data.aiWorkspaceSchedulesV1[0].state,'skipped');
  assert.equal(data.notificationHistoryV1.items[0].level,'warning');
});

test('GitHub trending digest parses topN HTML, inspects READMEs, and runs inside scheduler', async t => {
  const sampleHtml = [
    '<article class="Box-row"><h2 class="h3"><a href="/alice/agent-core">alice / agent-core</a></h2><p class="col-9 color-fg-muted">Lightweight agent runtime</p><span itemprop="programmingLanguage">TypeScript</span><a href="/alice/agent-core/stargazers"><svg></svg>4,200</a><span>650 stars today</span></article>',
    '<article class="Box-row"><h2 class="h3"><a href="/bob/awesome-list">bob / awesome-list</a></h2><p class="col-9 color-fg-muted">Curated links</p><span itemprop="programmingLanguage">Markdown</span><a href="/bob/awesome-list/stargazers"><svg></svg>900</a><span>120 stars today</span></article>',
    '<article class="Box-row"><h2 class="h3"><a href="/carol/toy-demo">carol / toy-demo</a></h2><p class="col-9 color-fg-muted">Demo</p></article>',
  ].join('\n');

  const top2 = trendingDigest.parseGitHubTrendingHtml(sampleHtml, 2);
  assert.equal(top2.length, 2);
  assert.equal(top2[0].fullName, 'alice/agent-core');
  assert.equal(top2[0].stars, 4200);
  assert.equal(top2[0].todayStars, 650);
  assert.equal(top2[1].fullName, 'bob/awesome-list');

  const before = { chrome: globalThis.chrome, fetch: globalThis.fetch, now: Date.now, locks: globalThis.navigator?.locks };
  const hadNavigator = 'navigator' in globalThis;
  t.after(() => {
    globalThis.chrome = before.chrome;
    globalThis.fetch = before.fetch;
    Date.now = before.now;
    if (hadNavigator && globalThis.navigator && before.locks === undefined) {
      try { delete globalThis.navigator.locks; } catch {}
    } else if (hadNavigator && globalThis.navigator && before.locks !== undefined) {
      Object.defineProperty(globalThis.navigator, 'locks', { value: before.locks, configurable: true });
    }
  });
  let now = Date.now();
  Date.now = () => now;
  const data = { byokConfigV1: { deepseek: { key: 'gh-test-key', model: 'deepseek-flash' } } };
  const alarms = new Map();
  if (globalThis.navigator && !globalThis.navigator.locks) {
    Object.defineProperty(globalThis.navigator, 'locks', {
      value: { request: async (_name, fn) => fn() },
      configurable: true,
    });
  }
  globalThis.chrome = {
    storage: {
      local: {
        get: async key => {
          const keys = Array.isArray(key) ? key : [key];
          const out = {};
          for (const k of keys) out[k] = structuredClone(data[k]);
          return out;
        },
        set: async values => Object.assign(data, structuredClone(values)),
      },
    },
    alarms: { get: async name => alarms.get(name), create: async (name, value) => alarms.set(name, value), clear: async name => alarms.delete(name) },
  };
  let seenPrompt = '';
  globalThis.fetch = async (url, init) => {
    const sUrl = String(url);
    if (sUrl.startsWith('https://github.com/trending')) {
      return new Response(sampleHtml, { status: 200 });
    }
    if (sUrl.startsWith('https://raw.githubusercontent.com/alice/agent-core/')) {
      return new Response('# Agent Core\nReal modular multi-agent harness.', { status: 200 });
    }
    if (sUrl.startsWith('https://raw.githubusercontent.com/bob/awesome-list/')) {
      return new Response('# Awesome List\nJust links.', { status: 200 });
    }
    if (sUrl.startsWith('https://api.deepseek.com/chat/completions')) {
      const parsedBody = JSON.parse(String(init?.body || '{}'));
      seenPrompt = parsedBody.messages?.[0]?.content || '';
      return new Response('data: {"choices":[{"delta":{"content":"## 今日榜单结论\\n1. alice/agent-core 很有用"}}]}\n\ndata: [DONE]\n\n', { status: 200 });
    }
    return new Response('Not Found', { status: 404 });
  };

  const s = await loadTsModule('src/background/ai-scheduler.ts');
  const created = await s.createAiSchedule({
    provider: 'deepseek',
    kind: 'github-trending',
    repeat: 'daily',
    prompt: '筛选有用的项目并逐个介绍',
    runAt: now + 3600_000,
    model: 'deepseek-flash',
    keyFingerprint: await keyFingerprint('gh-test-key'),
    githubConfig: { topN: 2, since: 'daily', focus: '重点关注 Agent 工具', saveToLibrary: true },
  });

  const res = await s.runAiScheduleNow(created.id);
  assert.match(res.message, /前 2 个仓库/);
  assert.ok(seenPrompt.includes('alice/agent-core'));
  assert.ok(seenPrompt.includes('bob/awesome-list'));
  assert.ok(seenPrompt.includes('Real modular multi-agent harness'));
  assert.equal(data.aiWorkspaceSchedulesV1[0].state, 'pending');
  assert.ok(data.aiWorkspaceSchedulesV1[0].lastReportContent.includes('alice/agent-core'));
  assert.equal(data[ARTICLES_STORAGE_KEY]?.length || 0, 1);
  assert.ok(res.item?.lastArticleId);
  assert.ok(Array.isArray(res.item?.peekFrames) && res.item.peekFrames.length >= 4);
  assert.equal(data[AI_SCHEDULE_LIVE_PEEK_KEY]?.active, false);
  assert.equal(data[AI_SCHEDULE_LIVE_PEEK_KEY]?.phase, 'done');
  assert.ok((data[AI_SCHEDULE_LIVE_PEEK_KEY]?.timelineSteps?.length || 0) >= 4);
});

test('SchedulePeekModal exposes simulated GitHub & report peek targets', async () => {
  const modal = await readFile(new URL('../src/multica/SchedulePeekModal.vue', import.meta.url), 'utf8');
  for (const target of ['source', 'repo-card', 'readme-panel', 'ai-panel', 'library-save', 'report-done']) {
    assert.ok(modal.includes(`data-peek-target="${target}"`) || modal.includes(`'${target}'`), `Missing schedule peek target ${target}`);
  }
});

test('official GitHub trending preset seeds once on initial list, can be edited, and stays deleted if removed', async t => {
  const before = { chrome: globalThis.chrome, now: Date.now };
  t.after(() => { globalThis.chrome = before.chrome; Date.now = before.now; });
  const now = Date.now();
  Date.now = () => now;
  const data = {};
  const alarms = new Map();
  globalThis.chrome = {
    storage: {
      local: {
        get: async key => {
          const keys = Array.isArray(key) ? key : [key];
          const out = {};
          for (const k of keys) out[k] = structuredClone(data[k]);
          return out;
        },
        set: async values => Object.assign(data, structuredClone(values)),
      },
    },
    alarms: { get: async name => alarms.get(name), create: async (name, value) => alarms.set(name, value), clear: async name => alarms.delete(name) },
  };

  const s = await loadTsModule('src/background/ai-scheduler.ts');
  const firstList = await s.listAiSchedules();
  assert.equal(firstList.length, 1);
  assert.equal(firstList[0].kind, 'github-trending');
  assert.equal(firstList[0].githubConfig.topN, 10);

  const edited = await s.updateAiSchedule(firstList[0].id, {
    provider: 'native-pi',
    kind: 'github-trending',
    repeat: 'daily',
    prompt: 'GitHub 定制榜\n\n看前 15 个仓库',
    runAt: now + 3600_000,
    githubConfig: { topN: 15, since: 'weekly', focus: '只看效率工具', saveToLibrary: true },
  });
  assert.equal(edited.githubConfig.topN, 15);
  assert.equal(edited.githubConfig.since, 'weekly');

  await s.changeAiSchedule('delete', firstList[0].id);
  const afterDelete = await s.listAiSchedules();
  assert.equal(afterDelete.length, 0);
});

test('scheduler executes keyless OpenAI-compatible preset (Ollama) cleanly', async t => {
  const before = { chrome: globalThis.chrome, fetch: globalThis.fetch, now: Date.now };
  t.after(() => { globalThis.chrome = before.chrome; globalThis.fetch = before.fetch; Date.now = before.now; });
  let now = Date.now();
  Date.now = () => now;
  const alarms = new Map();
  const data = {
    [AI_SCHEDULE_SEEDED_KEY]: true,
    byokConfigV1: {
      openaiCompat: {
        presetId: 'ollama',
        label: 'Ollama（本机免费）',
        baseUrl: 'http://localhost:11434/v1',
        key: '',
        model: 'qwen2.5:7b',
        models: ['qwen2.5:7b'],
      },
    },
  };
  globalThis.chrome = {
    storage: { local: { get: async k => ({ [k]: structuredClone(data[k]) }), set: async v => Object.assign(data, structuredClone(v)) } },
    alarms: { get: async n => alarms.get(n), create: async (n, v) => alarms.set(n, v), clear: async n => alarms.delete(n) },
  };
  let seenUrl = '';
  let seenAuth;
  globalThis.fetch = async (url, init) => {
    seenUrl = String(url);
    seenAuth = init?.headers?.Authorization;
    return new Response('data: {"choices":[{"delta":{"content":"ollama schedule reply"}}]}\n\ndata: [DONE]\n\n', { status: 200 });
  };
  const { loadConfig } = await loadTsModule('src/services/byok.service.ts');
  const cfg = await loadConfig();
  const s = await loadTsModule('src/background/ai-scheduler.ts');
  const created = await s.createAiSchedule({
    provider: 'openai-compat',
    providerLabel: cfg.label,
    repeat: 'once',
    prompt: 'ollama prompt',
    runAt: now + 60_000,
    model: 'qwen2.5:7b',
    keyFingerprint: await configCredentialFingerprint(cfg),
  });
  const res = await s.runAiScheduleNow(created.id);
  assert.equal(seenUrl, 'http://localhost:11434/v1/chat/completions');
  assert.equal(seenAuth, undefined);
  assert.match(res.item?.lastReportContent || '', /ollama schedule reply/);
  assert.equal(data.byokConversationsV1?.[0]?.messages?.[1]?.content, 'ollama schedule reply');
});

test('auto provider migrates untouched preset, produces fallback GitHub briefing without LLM, and routes to configured API when present', async t => {
  const before = { chrome: globalThis.chrome, fetch: globalThis.fetch, now: Date.now };
  t.after(() => { globalThis.chrome = before.chrome; globalThis.fetch = before.fetch; Date.now = before.now; });
  let now = Date.now();
  Date.now = () => now;
  const alarms = new Map();
  const data = {
    [AI_SCHEDULE_SEEDED_KEY]: true,
    aiWorkspaceSchedulesV1: [
      {
        id: 'preset-github-trending-daily',
        provider: 'native-pi',
        kind: 'github-trending',
        isDefault: true,
        prompt: 'GitHub 今日榜单精选助手\n\n每天抓取前 2 个仓库',
        runAt: now + 3600_000,
        repeat: 'daily',
        localHour: 9,
        localMinute: 0,
        state: 'failed',
        lastResult: '本机 Pi 执行失败',
        createdAt: now - 10_000,
        githubConfig: { topN: 2, since: 'daily', focus: '重点看实用工具', saveToLibrary: true },
      },
    ],
  };

  globalThis.chrome = {
    storage: {
      local: {
        get: async key => {
          const keys = Array.isArray(key) ? key : [key];
          const out = {};
          for (const k of keys) out[k] = structuredClone(data[k]);
          return out;
        },
        set: async values => Object.assign(data, structuredClone(values)),
      },
    },
    alarms: { get: async n => alarms.get(n), create: async (n, v) => alarms.set(n, v), clear: async n => alarms.delete(n) },
  };

  const sampleHtml = `
    <article class="Box-row">
      <h2 class="h3 lh-condensed"><a href="/acme/autoflow">acme / autoflow</a></h2>
      <p class="color-fg-muted my-1 pr-4">Lightweight workflow runner</p>
      <span itemprop="programmingLanguage">TypeScript</span>
      <a href="/acme/autoflow/stargazers"><svg></svg>3,100</a>
      <span>520 stars today</span>
    </article>
  `;

  globalThis.fetch = async url => {
    const sUrl = String(url);
    if (sUrl.startsWith('https://github.com/trending')) return new Response(sampleHtml, { status: 200 });
    if (sUrl.includes('raw.githubusercontent.com/acme/autoflow')) {
      return new Response('# AutoFlow\nRun structured browser tasks easily.', { status: 200 });
    }
    throw new Error(`Unexpected url ${sUrl}`);
  };

  const s = await loadTsModule('src/background/ai-scheduler.ts');
  const migratedList = await s.listAiSchedules();
  assert.equal(migratedList[0].provider, 'auto');
  assert.equal(migratedList[0].state, 'pending');

  // 1) No API key, no native bridge -> fallback structured digest succeeds with peek frames + library save
  const fallbackRes = await s.runAiScheduleNow(migratedList[0].id);
  assert.match(fallbackRes.message, /基础简报/);
  assert.match(fallbackRes.item?.lastReportContent || '', /免配置模式直出/);
  assert.match(fallbackRes.item?.lastReportContent || '', /acme\/autoflow/);
  assert.equal(data[ARTICLES_STORAGE_KEY]?.length || 0, 1);
  assert.ok((fallbackRes.item?.peekFrames?.length || 0) >= 4);

  // 2) Once user saves SiliconFlow / OpenAI-compatible config, 'auto' routes automatically to it
  data.byokConfigV1 = {
    openaiCompat: {
      presetId: 'siliconflow',
      label: '硅基流动 SiliconFlow',
      baseUrl: 'https://api.siliconflow.cn/v1',
      key: 'sf-test-key',
      model: 'deepseek-ai/DeepSeek-V3',
      models: ['deepseek-ai/DeepSeek-V3'],
    },
  };
  let seenApiUrl = '';
  globalThis.fetch = async url => {
    const sUrl = String(url);
    if (sUrl.startsWith('https://github.com/trending')) return new Response(sampleHtml, { status: 200 });
    if (sUrl.includes('raw.githubusercontent.com/acme/autoflow')) {
      return new Response('# AutoFlow\nRun structured browser tasks easily.', { status: 200 });
    }
    if (sUrl === 'https://api.siliconflow.cn/v1/chat/completions') {
      seenApiUrl = sUrl;
      return new Response('data: {"choices":[{"delta":{"content":"硅基流动深度点评报告"}}]}\n\ndata: [DONE]\n\n', { status: 200 });
    }
    throw new Error(`Unexpected url ${sUrl}`);
  };
  const routedRes = await s.runAiScheduleNow(migratedList[0].id);
  assert.equal(seenApiUrl, 'https://api.siliconflow.cn/v1/chat/completions');
  assert.match(routedRes.item?.lastReportContent || '', /硅基流动深度点评报告/);
});
