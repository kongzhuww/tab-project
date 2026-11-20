import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const contract = await loadTsModule('src/agents/employee-contract.ts');
const decision = await loadTsModule('src/agents/decision-engine.ts');
const tools = await loadTsModule('src/agents/employee-tools.ts');
const client = await loadTsModule('src/agents/employee-client.ts');

test('employee export strips private folder IDs, owner feedback, and enables safe import', () => {
  const emp = contract.createDefaultBiliEmployee(1000);
  emp.enabled = true;
  emp.source = { kind: 'bili-fav', folderId: '987654321', folderTitle: '我的私人收藏' };
  emp.runtime.jevEndpoint = 'http://127.0.0.1:8787/decide';
  emp.ownerFeedback = [{ id: 'f1', title: '私人视频', verdict: 'keep', category: 'AI 与 Agent', createdAt: 1000 }];

  const pkg = contract.exportEmployeeBlueprint(emp);
  assert.equal(pkg.format, contract.EMPLOYEE_SHARE_FORMAT);
  assert.equal(pkg.blueprint.source.folderId, '');
  assert.equal(pkg.blueprint.runtime.jevEndpoint, '');
  assert.equal(pkg.blueprint.ownerFeedback, undefined);

  const imported = contract.parseEmployeeImport(JSON.stringify(pkg), 2000);
  assert.equal(imported.enabled, false);
  assert.equal(imported.source.kind, 'bili-toview');
  assert.notEqual(imported.id, emp.id);
  assert.equal(imported.name, emp.name);
});

test('decision JSON parser and gate filter worth, threshold, and skip categories', () => {
  const emp = contract.createDefaultBiliEmployee(1000);
  emp.decisionGate.minScore = 0.7;

  const parsed = decision.extractJsonDecision(
    '```json\n{"worth": true, "score": 0.85, "category": "AI 与 Agent", "reason": "干货密集"}\n```',
    emp.decisionGate.categories
  );
  assert.ok(parsed);
  assert.equal(decision.passesDecisionGate({ ...parsed, engine: 'jev' }, emp), true);

  const lowScore = decision.extractJsonDecision(
    '{"worth": true, "score": 0.45, "category": "AI 与 Agent", "reason": "略浅"}',
    emp.decisionGate.categories
  );
  assert.equal(decision.passesDecisionGate({ ...lowScore, engine: 'jev' }, emp), false);

  const skippedCat = decision.extractJsonDecision(
    '{"worth": true, "score": 0.9, "category": "娱乐/低信息跳过", "reason": "水视频"}',
    emp.decisionGate.categories
  );
  assert.equal(decision.passesDecisionGate({ ...skippedCat, engine: 'jev' }, emp), false);
});

test('employee backend client surfaces unavailable runtime clearly', async () => {
  await assert.rejects(
    client.callEmployeeBackend(null, 'list'),
    client.EmployeeBackendUnavailable
  );
  await assert.rejects(
    client.callEmployeeBackend({ sendMessage: async () => ({ ok: false, error: '权限不足' }) }, 'save'),
    /权限不足/
  );
});

test('workspace sidebar exposes 数字员工 navigation and panel', async () => {
  const sidebar = await readFile(new URL('../src/multica/ConversationSidebar.vue', import.meta.url), 'utf8');
  const dialog = await readFile(new URL('../src/multica/MulticaDialog.vue', import.meta.url), 'utf8');
  assert.match(sidebar, /emit\('navigate', 'agents'\)/);
  assert.match(sidebar, /<span>数字员工<\/span>/);
  assert.match(dialog, /<EmployeesPanel v-if="agentsOpened" v-show="workspaceSection === 'agents'"/);
});

test('autonomous employee tools enforce skill permissions and parse Pi tool/final turns', async () => {
  const emp = contract.createDefaultBiliEmployee(1000);
  emp.skills = ['bili.source', 'bili.info'];
  const enabled = tools.buildEnabledTools(emp.skills);
  assert.deepEqual(enabled.map(t => t.name), ['bili_get_video_info']);

  const denied = await tools.executeEmployeeTool(
    'bili_get_comments',
    { bvid: 'BV1GJ411x7h7' },
    emp,
    { defaultBvid: 'BV1GJ411x7h7', viewCache: new Map() }
  );
  assert.equal(denied.ok, false);
  assert.match(denied.error, /权限不足/);

  const callTurn = tools.parsePiToolTurn('```json\n{"type":"tool_call","tool":"bili_get_comments","args":{"bvid":"BV1GJ411x7h7"}}\n```');
  assert.deepEqual(callTurn, { type: 'tool_call', tool: 'bili_get_comments', args: { bvid: 'BV1GJ411x7h7' } });

  const finalOutcome = tools.parseAgentFinalOutcome(
    '{"worth":true,"score":0.91,"category":"AI 与 Agent","reason":"评论区课代表总结极佳","reportMarkdown":"## 总结\\n内容"}',
    emp
  );
  assert.equal(finalOutcome.worth, true);
  assert.equal(finalOutcome.score, 0.91);
  assert.equal(finalOutcome.category, 'AI 与 Agent');
  assert.match(finalOutcome.reportMarkdown, /## 总结/);
});

test('live peek modal exposes simulated targets for source, info, comments, subtitle, and library save', async () => {
  const modal = await readFile(new URL('../src/agents/LivePeekModal.vue', import.meta.url), 'utf8');
  for (const target of ['folder', 'video-card', 'tab-info', 'info-desc', 'tab-comments', 'comments-list', 'tab-subtitle', 'subtitle-lines', 'decision-badge', 'library-save']) {
    assert.ok(modal.includes(`data-peek-target="${target}"`) || modal.includes(`'${target}'`), `Missing peek target ${target}`);
  }
});

test('preloaded Bilibili details are projected into live peek before the AI calls tools', async () => {
  const { peekVideoFromView } = await loadTsModule('src/agents/employee-peek-video.ts');
  const current = { bvid: 'BV1GJ411x7h7', title: '原始标题', author: 'UP', cover: '' };
  const result = peekVideoFromView(current, {
    desc: '真实简介', title: '视频标题', owner: { name: '作者' }, pic: 'http://example.com/a.jpg',
    pages: [{ page: 1, part: '正片', duration: 42 }], stat: { view: 10, like: 3 }
  });
  assert.equal(result.desc, '真实简介');
  assert.equal(result.descStatus, 'loaded');
  assert.equal(result.pages[0].durationSec, 42);
  assert.equal(result.cover, 'https://example.com/a.jpg');
  assert.equal(peekVideoFromView(current, { desc: '' }).descStatus, 'loaded');
  const worker = await readFile(new URL('../src/background/employee-worker.ts', import.meta.url), 'utf8');
  assert.match(worker, /await emitPeek\(\{ activeVideo: peekVideoFromView\(peekState\.activeVideo!, view\) \}\)/);
  assert.match(worker, /descStatus: 'unavailable'/);
  const modal = await readFile(new URL('../src/agents/LivePeekModal.vue', import.meta.url), 'utf8');
  assert.match(modal, /该视频暂无简介/);
  assert.match(modal, /暂时无法获取视频简介/);
});

test('decision gate retryOnSkip defaults to true and respects explicit opt-out', () => {
  const def = contract.createDefaultBiliEmployee(1000);
  assert.equal(def.decisionGate.retryOnSkip, true);

  const legacy = contract.normalizeEmployee({ name: '旧配置员工', decisionGate: { minScore: 0.7 } }, 1000);
  assert.equal(legacy.decisionGate.retryOnSkip, true);

  const disabled = contract.normalizeEmployee({ name: '单次员工', decisionGate: { retryOnSkip: false } }, 1000);
  assert.equal(disabled.decisionGate.retryOnSkip, false);
});

test('Pi tool loop reuses one sessionId across turns for a single video while isolating across videos', async () => {
  const emp = contract.createDefaultBiliEmployee(1000);
  emp.runtime.analyzer = 'native-pi';

  const sidA = tools.buildPiVideoSessionId(emp.id, 'BV1GJ411x7h7', 1000);
  const sidB = tools.buildPiVideoSessionId(emp.id, 'BV18j4i6HEvu', 1000);
  assert.notEqual(sidA, sidB);
  assert.ok(sidA.length <= 80 && /^[a-zA-Z0-9._-]+$/.test(sidA));

  const calls = [];
  const viewCache = new Map([
    ['BV1GJ411x7h7', {
      bvid: 'BV1GJ411x7h7',
      aid: 12345,
      cid: 67890,
      title: 'Test Video',
      owner: { name: 'Tester' },
      tname: 'Tech',
      duration: 120,
      desc: 'Test description body',
      stat: { view: 100, like: 10, coin: 5, favorite: 8, reply: 2 },
      pages: [{ page: 1, part: 'P1', duration: 120 }],
    }],
  ]);

  const outcome = await tools.runAutonomousEmployeeAnalysis(
    emp,
    { bvid: 'BV1GJ411x7h7', title: 'Test Video', author: 'Tester', durationSec: 120 },
    {
      defaultBvid: 'BV1GJ411x7h7',
      viewCache,
      runPiTurn: async opts => {
        calls.push({ sessionId: opts.sessionId, prompt: opts.prompt });
        if (calls.length === 1) {
          return {
            ok: true,
            text: '{"type":"tool_call","tool":"bili_get_video_info","args":{"bvid":"BV1GJ411x7h7"}}',
          };
        }
        return {
          ok: true,
          text: '{"type":"final","worth":true,"score":0.9,"category":"AI 与 Agent","reason":"结构清晰","reportMarkdown":"## 一句话结论\\n测试报告"}',
        };
      },
    }
  );

  assert.equal(calls.length, 2);
  assert.equal(calls[0].sessionId, calls[1].sessionId);
  assert.ok(calls[0].prompt.includes('系统指令：'));
  assert.ok(!calls[1].prompt.includes('系统指令：'), 'Turn 2 should send only incremental tool result');
  assert.ok(calls[1].prompt.includes('Test description body'));
  assert.equal(outcome.engine, 'pi');
  assert.equal(outcome.toolTrace.length, 1);
  assert.equal(outcome.toolTrace[0].tool, 'bili_get_video_info');
});

test('workspace organizer builds partition/folder/bookmark proposals in pending state and applies only clicked steps', async t => {
  const organizer = await loadTsModule('src/agents/workspace-organizer.ts');
  const orgEmp = contract.createDefaultOrganizerEmployee(1000);
  assert.equal(orgEmp.source.kind, 'workspace-organizer');
  assert.ok(orgEmp.skills.includes('bookmarks.read') && orgEmp.skills.includes('launcher.read'));

  const beforeChrome = globalThis.chrome;
  const locks = globalThis.navigator?.locks;
  if (globalThis.navigator && !locks) Object.defineProperty(globalThis.navigator, 'locks', {
    value: { request: async (_name, fn) => fn() }, configurable: true
  });
  t.after(() => {
    globalThis.chrome = beforeChrome;
    if (globalThis.navigator && !locks) delete globalThis.navigator.locks;
  });

  const store = {
    launcherPages: ['常用网站'],
    launcherPageLabels: { 常用网站: '默认' },
    launcherFolders: {},
    quickLinkGroupSizes: {},
    quickLinks: [
      { id: 'link-ai-1', title: 'DeepSeek', url: 'https://chat.deepseek.com/', page: '常用网站', group: '常用网站' },
      { id: 'link-dev-1', title: 'GitHub', url: 'https://github.com/', page: '常用网站', group: '常用网站' },
    ],
  };
  const bookmarksTree = [
    {
      id: '0',
      children: [
        {
          id: '1',
          parentId: '0',
          title: '书签栏',
          children: [
            { id: 'bm-1', parentId: '1', title: 'Vite 官方文档', url: 'https://vite.dev/' },
          ],
        },
      ],
    },
  ];
  let createdBookmarkId = 100;
  const bookmarkFolderNodes = [{ id: '1', title: '书签栏', parentId: '0' }];
  globalThis.chrome = {
    storage: {
      local: {
        get: (keys, cb) => {
          const arr = Array.isArray(keys) ? keys : [keys];
          const out = {};
          for (const k of arr) out[k] = structuredClone(store[k]);
          cb(out);
        },
        set: (values, cb) => { Object.assign(store, structuredClone(values)); cb(); },
      },
    },
    bookmarks: {
      getTree: cb => cb(structuredClone(bookmarksTree)),
      getChildren: (parentId, cb) => {
        const list = bookmarksTree[0].children.find(c => c.id === parentId)?.children || [];
        cb(structuredClone(list));
      },
      create: ({ parentId, title }, cb) => {
        const id = `bm-dir-${++createdBookmarkId}`;
        const node = { id, parentId, title, children: [] };
        const parent = bookmarksTree[0].children.find(c => c.id === parentId);
        if (parent) parent.children.push(node);
        bookmarkFolderNodes.push(node);
        cb(structuredClone(node));
      },
      move: (id, { parentId }, cb) => {
        const root = bookmarksTree[0].children[0];
        const idx = root.children.findIndex(c => c.id === id);
        if (idx >= 0) {
          const [moved] = root.children.splice(idx, 1);
          moved.parentId = parentId;
          const dest = bookmarkFolderNodes.find(f => f.id === parentId);
          if (dest) dest.children.push(moved);
          cb(structuredClone(moved));
          return;
        }
        cb({ id, parentId });
      },
    },
  };

  const snap = await organizer.readOrganizerWorkspaceSnapshot();
  assert.equal(snap.partitions.length, 1);
  assert.equal(snap.links.length, 2);
  assert.equal(snap.bookmarks.length, 1);

  const parsed = organizer.parseOrganizerPlanResponse(
    JSON.stringify({
      summary: '建议按 AI 与开发分类，建大/中文件夹并归档书签',
      steps: [
        { type: 'create_partition', title: '新建分区「AI工作」', params: { partitionName: 'AI工作' } },
        { type: 'create_launcher_folder', title: '在「AI工作」新建大文件夹「大模型」', params: { partitionName: 'AI工作', folderName: '大模型', folderSize: 'large' } },
        { type: 'create_launcher_folder', title: '在「大模型」下新建小文件夹「提示词」', params: { partitionName: 'AI工作', parentFolderName: '大模型', folderName: '提示词', folderSize: 'small' } },
        { type: 'move_quick_link', title: '移动 DeepSeek 到大模型', params: { linkId: 'link-ai-1', targetPartition: 'AI工作', targetFolder: '大模型' } },
        { type: 'create_bookmark_folder', title: '新建书签目录「开发参考」', params: { parentBookmarkId: '1', folderName: '开发参考' } },
        { type: 'move_bookmark', title: '移动 Vite 文档到开发参考', params: { bookmarkId: 'bm-1', targetFolder: '开发参考' } },
      ],
    }),
    snap
  );

  // Proposal stage must NOT touch storage or bookmarks
  assert.equal(parsed.steps.length, 6);
  assert.ok(parsed.steps.every(s => s.status === 'pending'));
  assert.equal(store.launcherPages.length, 1);

  // Preview stage shows simulated result cleanly
  const sim = organizer.computeOrganizerPreview(snap, parsed.steps);
  assert.ok(sim.partitions.some(p => p.label === 'AI工作' && p.badge === 'new'));

  // Dependency check: trying to move link into uncreated folder before approving step #2 must fail cleanly
  const context = { steps: parsed.steps, snapshot: snap };
  await assert.rejects(organizer.applyOrganizerPlanStep(parsed.steps[3], context), /前置步骤尚未生效/);
  async function approve(step) {
    const result = await organizer.applyOrganizerPlanStep(step, context);
    step.status = 'applied';
    step.result = result.result;
    step.undo = result.undo;
  }

  // Step-by-step approval executes ONLY each clicked step
  await approve(parsed.steps[0]);
  assert.ok(store.launcherPages.includes('AI工作'));
  assert.equal(Object.keys(store.launcherFolders).length, 0);

  await approve(parsed.steps[1]);
  assert.equal(store.quickLinkGroupSizes['大模型'], 'large');
  await approve(parsed.steps[2]);
  assert.equal(store.launcherFolders['提示词'].parent, '大模型');
  assert.equal(store.quickLinkGroupSizes['提示词'], 'small');

  await approve(parsed.steps[3]);
  assert.equal(store.quickLinks.find(l => l.id === 'link-ai-1').group, '大模型');
  assert.equal(store.quickLinks.find(l => l.id === 'link-dev-1').group, '常用网站'); // untouched!

  await approve(parsed.steps[4]);
  await approve(parsed.steps[5]);
  const createdFolder = bookmarksTree[0].children[0].children.find(c => c.title === '开发参考');
  assert.equal(createdFolder.children[0].id, 'bm-1');

  const orgModal = await readFile(new URL('../src/agents/OrganizerPeekModal.vue', import.meta.url), 'utf8');
  for (const target of ['org-partitions', 'org-folders', 'org-links', 'org-bookmarks', 'org-approval']) {
    assert.ok(orgModal.includes(`data-peek-target="${target}"`), `Missing organizer peek target ${target}`);
  }
});
