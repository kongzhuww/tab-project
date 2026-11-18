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
