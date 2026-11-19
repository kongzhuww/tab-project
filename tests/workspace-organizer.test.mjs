import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const org = await loadTsModule('src/agents/workspace-organizer.ts');
const contract = await loadTsModule('src/agents/employee-contract.ts');

function fixture(t) {
  const old = globalThis.chrome;
  const locks = globalThis.navigator?.locks;
  if (globalThis.navigator && !locks) Object.defineProperty(globalThis.navigator, 'locks', {
    value: { request: async (_name, fn) => fn() }, configurable: true
  });
  const store = {
    launcherPages: ['常用网站', '工作'], launcherPageLabels: {}, launcherFolders: {}, quickLinkGroupSizes: {},
    quickLinks: [{ id: 'l1', title: 'Vite', url: 'https://vite.dev/docs?token=secret#private', page: '常用网站', group: '常用网站' }],
    [contract.DIGITAL_EMPLOYEES_KEY]: [contract.createDefaultOrganizerEmployee()],
    [contract.DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY]: true,
  };
  let sequence = 10, writes = 0, listener;
  const tree = [{ id: '0', title: '', children: [
    { id: '1', parentId: '0', title: '书签栏', children: [{ id: 'b1', parentId: '1', index: 0, title: '参考', url: 'https://example.com/reference?secret=1' }] },
    { id: '2', parentId: '0', title: '其他书签', children: [] },
  ] }];
  const all = () => { const walk = nodes => nodes.flatMap(n => [n, ...walk(n.children || [])]); return walk(tree); };
  let reorderStorageKeys = false;
  const reorder = value => Array.isArray(value) ? value.map(reorder) : value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).reverse().map(([k, v]) => [k, reorder(v)])) : value;
  const get = (input, cb) => {
    const names = Array.isArray(input) ? input : [input];
    const data = Object.fromEntries(names.map(k => [k, reorderStorageKeys ? reorder(store[k]) : structuredClone(store[k])]));
    cb?.(data); return Promise.resolve(data);
  };
  let failWrite = false, uncertainBusinessWrite = false;
  globalThis.chrome = {
    runtime: { id: 'fixture', getURL: p => `chrome-extension://fixture/${p}`, onMessage: { addListener: fn => { listener = fn; } } },
    storage: { local: { get, set: (values, cb) => {
      if (failWrite) {
        if (cb) { chrome.runtime.lastError = { message: 'fixture failure' }; cb(); delete chrome.runtime.lastError; return; }
        return Promise.reject(new Error('fixture failure'));
      }
      writes++; Object.assign(store, structuredClone(values));
      if (uncertainBusinessWrite && cb && ('launcherFolders' in values || 'quickLinks' in values)) {
        chrome.runtime.lastError = { message: 'accepted but unconfirmed fixture write' }; cb(); delete chrome.runtime.lastError;
      } else cb?.();
      return Promise.resolve();
    } } },
    alarms: { create: async () => {}, clear: async () => {}, onAlarm: { addListener() {} } },
    bookmarks: {
      getTree: cb => cb(structuredClone(tree)),
      getChildren: (id, cb) => cb(structuredClone(all().find(n => n.id === id)?.children || [])),
      create: (params, cb) => {
        writes++; const parent = all().find(n => n.id === params.parentId);
        const node = { id: String(++sequence), parentId: parent.id, title: params.title, children: [] };
        parent.children.push(node); cb(structuredClone(node));
      },
      move: (id, params, cb) => {
        writes++; const node = all().find(n => n.id === id), parent = all().find(n => n.id === node.parentId), target = all().find(n => n.id === params.parentId);
        parent.children.splice(parent.children.findIndex(n => n.id === id), 1);
        node.parentId = target.id; node.index = params.index ?? target.children.length;
        target.children.splice(node.index, 0, node); cb(structuredClone(node));
      },
      update: (id, params, cb) => {
        writes++; const node = all().find(n => n.id === id);
        Object.assign(node, params); cb(structuredClone(node));
      },
      remove: (id, cb) => {
        writes++; const node = all().find(n => n.id === id), parent = all().find(n => n.id === node.parentId);
        assert.ok(!node.children?.length, 'only empty directories may be removed');
        parent.children.splice(parent.children.findIndex(n => n.id === id), 1); cb();
      },
    },
  };
  t.after(() => {
    globalThis.chrome = old;
    if (globalThis.navigator && !locks) delete globalThis.navigator.locks;
  });
  return { store, tree, all, set reorderStorageKeys(v) { reorderStorageKeys = v; }, get writes() { return writes; }, set failWrite(v) { failWrite = v; }, set uncertainBusinessWrite(v) { uncertainBusinessWrite = v; },
    snapshot: () => org.buildSnapshotFromRaw(store, tree),
    request: (action, args) => new Promise(resolve => listener({ type: `employee:${action}`, ...args }, { id: 'fixture', url: 'chrome-extension://fixture/newtab.html' }, resolve)),
  };
}
const parse = (f, steps) => org.parseOrganizerPlanResponse(JSON.stringify({ summary: 'fixture', steps }), f.snapshot()).steps;
const folder = (name = '开发', extra = {}) => ({ type: 'create_launcher_folder', params: { folderName: name, partitionName: '常用网站', folderSize: 'medium', ...extra } });
const move = () => ({ type: 'move_quick_link', params: { linkId: 'l1', targetPartition: '常用网站', targetFolder: '开发' } });
async function approve(step, steps, snapshot) {
  const res = await org.applyOrganizerPlanStep(step, { steps, snapshot });
  Object.assign(step, { status: 'applied', undo: res.undo, result: res.result });
  return res;
}

test('proposal generation and preview perform zero business writes; real sizes are two-state', t => {
  const f = fixture(t), baseline = structuredClone(f.store);
  const steps = parse(f, [folder(), move()]);
  assert.equal(steps[0].params.folderSize, 'small');
  const preview = org.computeOrganizerPreview(f.snapshot(), steps);
  assert.equal(preview.partitions[0].folders[0].size, 'small');
  assert.equal(preview.partitions[0].folders[0].links.length, 1);
  assert.deepEqual(f.store, baseline); assert.equal(f.writes, 0);
});

test('reject duplicate/reserved/self-parent folder names before any write', async t => {
  const f = fixture(t);
  f.store.launcherFolders['资料'] = { name: '资料', page: '工作' };
  assert.throws(() => parse(f, [folder('资料')]), /已存在/);
  assert.throws(() => parse(f, [folder('新建', { parentFolderName: '新建' })]), /自身/);
  for (const name of ['__proto__', 'constructor', '常用网站']) assert.throws(() => parse(f, [folder(name)]), /无效|保留/);
  const forged = { id: 's', order: 1, type: 'create_launcher_folder', title: '', status: 'pending', params: { folderName: '资料', partitionName: '工作', parentFolderName: '资料' } };
  await assert.rejects(org.applyOrganizerPlanStep(forged), /自身/);
  assert.equal(f.writes, 0);
});

test('execution rechecks name conflicts and parent cycles without overwriting', async t => {
  const f = fixture(t), steps = parse(f, [folder()]);
  f.store.launcherFolders['开发'] = { name: '开发', page: '工作' };
  await assert.rejects(org.applyOrganizerPlanStep(steps[0]), /同名/);
  const snapshot = f.snapshot();
  snapshot.folders.push({ name: '循环', page: '常用网站', parent: '循环', size: 'small', linkCount: 0 });
  const p = org.parseOrganizerPlanResponse(JSON.stringify({ steps: [folder('子层', { parentFolderName: '循环' })] }), snapshot).steps;
  f.store.launcherFolders['循环'] = { name: '循环', page: '常用网站', parent: '循环' };
  await assert.rejects(org.applyOrganizerPlanStep(p[0]), /循环/);
  assert.equal(f.writes, 0);
});

test('skipping an invalid edited proposal does not block unrelated valid steps', t => {
  const f = fixture(t), snapshot = f.snapshot();
  const steps = parse(f, [folder(), { type: 'create_partition', params: { partitionName: '独立分区' } }]);
  steps[0].params.folderName = '__proto__'; steps[0].status = 'skipped';
  assert.doesNotThrow(() => org.bindOrganizerPlan(steps, snapshot));
  assert.match(steps[1].title, /独立分区/);
});

test('bookmark read failures are surfaced rather than treated as an empty library', async t => {
  const f = fixture(t);
  chrome.bookmarks.getTree = cb => { chrome.runtime.lastError = { message: 'fixture' }; cb(undefined); delete chrome.runtime.lastError; };
  await assert.rejects(org.readOrganizerWorkspaceSnapshot(), /书签操作失败/);
  assert.equal(f.writes, 0);
});

test('stable creation refs survive edited partition/folder names and enforce approval order', async t => {
  const f = fixture(t), snapshot = f.snapshot();
  const steps = parse(f, [
    { type: 'create_partition', params: { partitionName: '开发区' } },
    folder('开发', { partitionName: '开发区' }),
    { type: 'move_quick_link', params: { linkId: 'l1', targetPartition: '开发区', targetFolder: '开发' } },
  ]);
  steps[0].params.partitionName = '新工作'; steps[1].params.folderName = '新目录';
  org.bindOrganizerPlan(steps, snapshot);
  assert.match(steps[2].title, /新工作.*新目录/);
  await assert.rejects(org.applyOrganizerPlanStep(steps[2], { steps, snapshot }), /前置/);
  for (const step of steps) await approve(step, steps, snapshot);
  assert.equal(f.store.quickLinks[0].page, '新工作'); assert.equal(f.store.quickLinks[0].group, '新目录');
});

test('previews isolate actual, whole-plan and focused-step states; skipped parents never hide links', t => {
  const f = fixture(t), snapshot = f.snapshot();
  const steps = parse(f, [folder(), move(), { type: 'create_partition', params: { partitionName: '无关分区' } }]);
  const actual = org.computeOrganizerPreview(snapshot, steps, undefined, 'actual');
  assert.equal(actual.partitions[0].looseLinks.length, 1); assert.equal(actual.partitions[0].folders.length, 0);
  const focus = org.computeOrganizerPreview(snapshot, steps, steps[1].id);
  assert.equal(focus.partitions.some(p => p.id === '无关分区'), false);
  assert.equal(focus.partitions[0].folders[0].links.length, 1);
  steps[0].status = 'skipped';
  const blocked = org.computeOrganizerPreview(snapshot, steps);
  assert.equal(blocked.partitions[0].looseLinks.length, 1); assert.deepEqual(blocked.warnings, []);
});

test('existing bookmark name ambiguity is rejected; new nested directories resolve returned IDs after renaming', async t => {
  const f = fixture(t);
  f.tree[0].children[0].children.push({ id: 'd1', parentId: '1', title: '重复', children: [] });
  f.tree[0].children[1].children.push({ id: 'd2', parentId: '2', title: '重复', children: [] });
  assert.throws(() => parse(f, [{ type: 'move_bookmark', params: { bookmarkId: 'b1', targetFolder: '重复' } }]), /重名/);
  const exact = parse(f, [{ type: 'move_bookmark', params: { bookmarkId: 'b1', targetFolder: 'd2' } }]);
  assert.equal(exact[0].params.targetFolder, 'd2');
  const snapshot = f.snapshot(), steps = parse(f, [
    { type: 'create_bookmark_folder', params: { parentBookmarkId: '1', folderName: '父目录' } },
    { type: 'create_bookmark_folder', params: { parentBookmarkId: '父目录', folderName: '子目录' } },
    { type: 'move_bookmark', params: { bookmarkId: 'b1', targetFolder: '子目录' } },
  ]);
  steps[0].params.folderName = '改名父目录'; steps[1].params.folderName = '改名子目录';
  for (const step of steps) await approve(step, steps, snapshot);
  const parentId = steps[0].result.bookmarkFolderId, childId = steps[1].result.bookmarkFolderId;
  assert.equal(f.all().find(n => n.id === childId).parentId, parentId);
  assert.equal(f.all().find(n => n.id === 'b1').parentId, childId);
});

test('model cannot invent bookmark URLs or move existing desktop entries through promotion', async t => {
  const f = fixture(t);
  assert.throws(() => parse(f, [{ type: 'promote_bookmark_to_launcher', params: { bookmarkId: 'invented', bookmarkUrl: 'https://attacker.example/', targetPartition: '常用网站' } }]), /不存在/);
  f.store.quickLinks.push({ id: 'already', title: '已添加', url: 'https://example.com/reference?secret=1', page: '工作', group: '常用网站' });
  assert.throws(() => parse(f, [{ type: 'promote_bookmark_to_launcher', params: { bookmarkId: 'b1', targetPartition: '常用网站' } }]), /已在桌面/);
  f.store.quickLinks.pop();
  const snapshot = f.snapshot(), steps = parse(f, [{ type: 'promote_bookmark_to_launcher', params: { bookmarkId: 'b1', targetPartition: '常用网站' } }]);
  f.store.quickLinks.push({ id: 'late', url: steps[0].params.bookmarkUrl });
  await assert.rejects(org.applyOrganizerPlanStep(steps[0], { steps, snapshot }), /已在桌面/);
  assert.equal(f.writes, 0);
});

test('stale source changes and cross-partition targets fail without writing', async t => {
  const f = fixture(t), steps = parse(f, [folder(), move()]), snapshot = f.snapshot();
  await approve(steps[0], steps, snapshot);
  const writes = f.writes;
  f.store.quickLinks[0].page = '工作';
  await assert.rejects(org.applyOrganizerPlanStep(steps[1], { steps, snapshot }), /已变化/);
  f.store.quickLinks[0].page = '常用网站'; f.store.launcherFolders['开发'].page = '工作';
  await assert.rejects(org.applyOrganizerPlanStep(steps[1], { steps, snapshot }), /不在所选分区/);
  assert.equal(f.writes, writes);
});

test('successful folder approval and undo tolerate storage reordering object properties', async t => {
  const f = fixture(t), snapshot = f.snapshot(), steps = parse(f, [folder()]);
  f.reorderStorageKeys = true;
  await approve(steps[0], steps, snapshot);
  assert.equal(f.store.launcherFolders['开发'].page, '常用网站');
  await org.undoOrganizerPlanStep(steps[0]);
  assert.deepEqual(f.store.launcherFolders, {});
});

test('undo restores clicked operations in reverse order and refuses intervening edits', async t => {
  const f = fixture(t), snapshot = f.snapshot(), before = structuredClone(f.store.quickLinks);
  const steps = parse(f, [folder(), move()]);
  for (const step of steps) await approve(step, steps, snapshot);
  await assert.rejects(org.undoOrganizerPlanStep(steps[0]), /已有内容/);
  const unrelated = { id: 'unrelated', title: '其他网站', url: 'https://unrelated.example/', page: '工作', group: '常用网站' };
  f.store.quickLinks.push(unrelated);
  await org.undoOrganizerPlanStep(steps[1]); steps[1].status = 'undone';
  assert.deepEqual(f.store.quickLinks, [...before, unrelated]);
  f.store.launcherFolders['开发'].parent = '手动修改';
  await assert.rejects(org.undoOrganizerPlanStep(steps[0]), /已被后续/);
  delete f.store.launcherFolders['开发'].parent;
  await org.undoOrganizerPlanStep(steps[0]);
  assert.deepEqual(f.store.launcherFolders, {});
});

test('bookmark undo restores source position and removes only confirmed empty new folders', async t => {
  const f = fixture(t), snapshot = f.snapshot(), steps = parse(f, [
    { type: 'create_bookmark_folder', params: { parentBookmarkId: '2', folderName: '归档' } },
    { type: 'move_bookmark', params: { bookmarkId: 'b1', targetFolder: '归档' } },
  ]);
  for (const step of steps) await approve(step, steps, snapshot);
  await assert.rejects(org.undoOrganizerPlanStep(steps[0]), /已有内容/);
  await org.undoOrganizerPlanStep(steps[1]);
  assert.equal(f.all().find(n => n.id === 'b1').parentId, '1');
  await org.undoOrganizerPlanStep(steps[0]);
  assert.equal(f.all().some(n => n.id === steps[0].result.bookmarkFolderId), false);
});

test('model input discloses sampling and does not include full URLs, query tokens or local addresses', t => {
  const f = fixture(t);
  f.store.quickLinks[0].title = 'Vite https://vite.dev/private?hidden=title-secret';
  f.store.quickLinks.push({ id: 'local', title: '本地工具', url: 'http://192.168.1.20:8000/private?token=local-secret', page: '常用网站', group: '常用网站' });
  const snapshot = f.snapshot();
  for (let i = 0; i < 100; i++) snapshot.bookmarks.push({ id: `extra${i}`, title: '样本', url: 'https://example.org/a?private=1', parentId: '1', folderPath: '书签栏' });
  const prompt = org.buildOrganizerPlanPrompt(contract.createDefaultOrganizerEmployee(), snapshot);
  assert.ok(prompt.includes('限量样本')); assert.ok(prompt.includes('"bookmarks":80'));
  for (const value of ['token=secret', '#private', '/docs?', '192.168.1.20', 'local-secret', 'secret=1', 'title-secret']) assert.equal(prompt.includes(value), false, value);
  assert.ok(prompt.includes('https://vite.dev'));
});

test('write journaling is awaited before business writes; unknown-status steps cannot retry', async t => {
  const f = fixture(t), steps = parse(f, [folder()]);
  await assert.rejects(org.applyOrganizerPlanStep(steps[0], { beforeWrite: async () => { assert.equal(f.writes, 0); throw new Error('journal failed'); } }), /journal failed/);
  assert.equal(f.writes, 0);
  steps[0].status = 'applying';
  await assert.rejects(org.applyOrganizerPlanStep(steps[0]), /暂不可执行/);
});

test('worker persists approvals, feedback and undo; legacy plans and uncertain writes are blocked', async t => {
  const f = fixture(t);
  // Bundle Vue as well: this worker's service imports cannot resolve bare imports from a data: URL.
  const { build } = await import('esbuild');
  const bundle = await build({ entryPoints: [new URL('../src/background/employee-worker.ts', import.meta.url).pathname], bundle: true, format: 'esm', write: false, platform: 'node', target: 'node20', external: ['node:*'] });
  const worker = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  worker.initEmployeeWorker();
  const employee = f.store[contract.DIGITAL_EMPLOYEES_KEY][0];
  assert.match((await worker.runPatrolCycle()).message, /没有到点需要巡检/);
  const enable = await f.request('toggle', { id: employee.id, enabled: true });
  assert.equal(enable.result.enabled, true);
  f.store[contract.DIGITAL_EMPLOYEES_KEY][0].nextEligibleAt = Date.now() - 1;
  const beforePatrol = f.snapshot();
  const autoCycle = await worker.runPatrolCycle();
  assert.equal(autoCycle.record?.kind, 'organizer');
  assert.ok(autoCycle.record.planSteps.length > 0);
  assert.ok(autoCycle.record.planSteps.every(step => step.status === 'pending'));
  assert.deepEqual({ ...f.snapshot(), capturedAt: 0 }, { ...beforePatrol, capturedAt: 0 });
  assert.equal((await f.request('toggle', { id: employee.id, enabled: false })).result.enabled, false);
  assert.match((await worker.runPatrolCycle()).message, /没有到点需要巡检/);
  const snapshot = f.snapshot(), steps = parse(f, [folder(), move()]);
  f.store[contract.EMPLOYEE_RUN_LOG_KEY] = [{ id: 'run1', employeeId: employee.id, bvid: 'org1', kind: 'organizer', organizerSnapshot: snapshot, planSteps: steps }];
  let reply = await f.request('skip-plan-step', { runId: 'run1', stepId: steps[1].id });
  assert.equal(reply.ok, true);
  assert.equal(f.store[contract.DIGITAL_EMPLOYEES_KEY][0].ownerFeedback[0].verdict, 'skip');
  reply = await f.request('apply-plan-step', { runId: 'run1', stepId: steps[1].id });
  assert.equal(reply.ok, false); assert.match(reply.error, /暂不可执行/);
  reply = await f.request('apply-plan-step', { runId: 'run1', stepId: steps[0].id, patch: { folderName: '改名开发' } });
  assert.equal(reply.ok, true);
  assert.equal(reply.result.step.status, 'applied'); assert.ok(reply.result.step.undo);
  assert.equal(f.store[contract.DIGITAL_EMPLOYEES_KEY][0].ownerFeedback.some(v => v.verdict === 'keep'), true);
  reply = await f.request('undo-plan-step', { runId: 'run1', stepId: steps[0].id });
  assert.equal(reply.ok, true); assert.equal(reply.result.step.status, 'undone');
  assert.deepEqual(f.store.launcherFolders, {});
  f.store[contract.EMPLOYEE_RUN_LOG_KEY][0].planSteps[0].status = 'applying';
  reply = await f.request('apply-plan-step', { runId: 'run1', stepId: steps[1].id });
  assert.equal(reply.ok, false); assert.match(reply.error, /暂不可继续执行/);

  const legacy = structuredClone(steps); delete legacy[0].dependsOn;
  f.store[contract.EMPLOYEE_RUN_LOG_KEY] = [{ id: 'legacy', employeeId: employee.id, bvid: 'org-old', kind: 'organizer', organizerSnapshot: snapshot, planSteps: legacy }];
  reply = await f.request('apply-plan-step', { runId: 'legacy', stepId: legacy[0].id });
  assert.equal(reply.ok, false); assert.match(reply.error, /旧版提案/);

  const failureSteps = parse(f, [folder('结果未确认')]);
  f.store[contract.EMPLOYEE_RUN_LOG_KEY] = [{ id: 'uncertain', employeeId: employee.id, bvid: 'org-uncertain', kind: 'organizer', organizerSnapshot: f.snapshot(), planSteps: failureSteps }];
  f.uncertainBusinessWrite = true;
  reply = await f.request('apply-plan-step', { runId: 'uncertain', stepId: failureSteps[0].id });
  assert.equal(reply.ok, false);
  assert.ok(f.store.launcherFolders['结果未确认']); // The callback error is NOT proof that no write happened.
  assert.equal(f.store[contract.EMPLOYEE_RUN_LOG_KEY][0].planSteps[0].status, 'applying');
  const writes = f.writes;
  reply = await f.request('apply-plan-step', { runId: 'uncertain', stepId: failureSteps[0].id });
  assert.equal(reply.ok, false); assert.match(reply.error, /暂不可继续执行/); assert.equal(f.writes, writes);
});

test('old readback warning is corrected without recreating the folder', async t => {
  const f = fixture(t);
  const { build } = await import('esbuild');
  const bundle = await build({ entryPoints: [new URL('../src/background/employee-worker.ts', import.meta.url).pathname], bundle: true, format: 'esm', write: false, platform: 'node', target: 'node20', external: ['node:*'] });
  const worker = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  worker.initEmployeeWorker();
  const snapshot = f.snapshot(), steps = parse(f, [folder(), move()]);
  await approve(steps[0], steps, snapshot);
  steps[0].status = 'applying';
  steps[0].errorMessage = '写入后数据已变化，结果未确认；不会自动重试。 写入结果未确认，请核对实际数据并重新盘点，不要重复执行。';
  const employee = f.store[contract.DIGITAL_EMPLOYEES_KEY][0];
  f.store[contract.EMPLOYEE_RUN_LOG_KEY] = [{ id: 'old-warning', employeeId: employee.id, bvid: 'org-old-warning', kind: 'organizer', organizerSnapshot: snapshot, planSteps: steps }];
  const before = structuredClone(f.store.launcherFolders);
  const reply = await f.request('list', {});
  assert.equal(reply.result.runs[0].planSteps[0].status, 'applied');
  assert.equal(reply.result.runs[0].planSteps[0].errorMessage, undefined);
  assert.deepEqual(f.store.launcherFolders, before);
  assert.equal((await f.request('apply-plan-step', { runId: 'old-warning', stepId: steps[1].id })).ok, true);
});

test('desktop rename, merge and remove preserve links and nested folders in preview and on approval', async t => {
  const f = fixture(t);
  f.store.launcherFolders = {
    A: { name: 'A', page: '常用网站' }, C: { name: 'C', page: '常用网站', parent: 'A' },
    B: { name: 'B', page: '工作' }, D: { name: 'D', page: '工作', parent: 'B' },
  };
  f.store.quickLinkGroupSizes.A = 'large';
  f.store.quickLinks[0].group = 'A';
  const snap = f.snapshot();
  const rename = parse(f, [{ type: 'rename_folder', params: { scope: 'desktop', sourceFolder: 'A', newName: '开发' } },
    { type: 'rename_link', params: { scope: 'desktop', linkId: 'l1', newName: '开发文档' } }]);
  const preview = org.computeOrganizerPreview(snap, rename);
  assert.equal(preview.partitions[0].folders.find(f => f.name === 'C').parent, '开发');
  assert.equal(preview.partitions[0].folders.find(f => f.name === '开发').links[0].title, '开发文档');
  assert.equal(f.writes, 0);
  for (const step of rename) await approve(step, rename, snap);
  assert.equal(f.store.quickLinkGroupSizes['开发'], 'large');
  assert.equal(f.store.quickLinks[0].title, '开发文档');
  await assert.rejects(org.applyOrganizerPlanStep(parse(f, [{ type: 'merge_folders', params: { scope: 'desktop', sourceFolder: '开发', targetFolder: 'C' } }])[0]), /子文件夹/);
  const merge = parse(f, [{ type: 'merge_folders', params: { scope: 'desktop', sourceFolder: '开发', targetFolder: 'B' } }]);
  await approve(merge[0], merge, f.snapshot());
  assert.deepEqual(f.store.launcherFolders.C, { name: 'C', page: '工作', parent: 'B' });
  assert.equal(f.store.quickLinks[0].group, 'B');
  const remove = parse(f, [{ type: 'remove_folder', params: { scope: 'desktop', sourceFolder: 'B' } }]);
  await approve(remove[0], remove, f.snapshot());
  assert.equal(f.store.launcherFolders.B, undefined);
  assert.equal(f.store.launcherFolders.C.parent, undefined);
  assert.equal(f.store.launcherFolders.D.parent, undefined);
  assert.equal(f.store.quickLinks[0].group, '常用网站');
  assert.equal(f.store.quickLinks[0].page, '工作');
  await org.undoOrganizerPlanStep(remove[0]);
  assert.equal(f.store.launcherFolders.C.parent, 'B');
  assert.equal(f.store.quickLinks[0].group, 'B');
});

test('bookmark folder edits keep children and URLs, and rename works for folders and links', async t => {
  const f = fixture(t);
  const root = f.tree[0].children[0];
  root.children.push({ id: 'A', parentId: '1', title: 'A', children: [root.children.shift(), { id: 'C', parentId: 'A', title: 'C', children: [] }] },
    { id: 'B', parentId: '1', title: 'B', children: [] });
  f.all().find(n => n.id === 'b1').parentId = 'A';
  const snap = f.snapshot();
  const steps = parse(f, [
    { type: 'rename_folder', params: { scope: 'bookmarks', sourceFolder: 'A', newName: '资料' } },
    { type: 'rename_link', params: { scope: 'bookmarks', bookmarkId: 'b1', newName: '参考资料' } },
    { type: 'merge_folders', params: { scope: 'bookmarks', sourceFolder: 'A', targetFolder: 'B' } },
  ]);
  const preview = org.computeOrganizerPreview(snap, steps);
  assert.equal(preview.bookmarkFolders.find(f => f.id === 'B').items[0].title, '参考资料');
  assert.equal(preview.bookmarkFolders.find(f => f.id === 'C').parentId, 'B');
  assert.equal(f.writes, 0);
  for (const step of steps) await approve(step, steps, snap);
  assert.equal(f.all().find(n => n.id === 'b1').parentId, 'B');
  const remove = parse(f, [{ type: 'remove_folder', params: { scope: 'bookmarks', sourceFolder: 'B' } }]);
  await approve(remove[0], remove, f.snapshot());
  assert.equal(f.all().find(n => n.id === 'B'), undefined);
  assert.equal(f.all().find(n => n.id === 'C').parentId, '1');
  assert.equal(f.all().find(n => n.id === 'b1').parentId, '1');
  assert.equal(f.all().find(n => n.id === 'b1').url, snap.bookmarks[0].url);
  await org.undoOrganizerPlanStep(steps[1]);
  assert.equal(f.all().find(n => n.id === 'b1').title, '参考');
});

test('approval window retains explicit batch confirmation, AI cursor, and uses SDK modeless dragging', async () => {
  const ui = await readFile(new URL('../src/agents/OrganizerPeekModal.vue', import.meta.url), 'utf8');
  assert.match(ui, /全部生效/); assert.match(ui, /确认全部生效/);
  assert.match(ui, /aria-modal="false"/); assert.match(ui, /useWindowDraggable/);
  assert.match(ui, /class="peek-cursor"/); assert.match(ui, /previewMode === 'step'/);
  assert.doesNotMatch(ui, /class="org-overlay"|backdrop-filter|class="org-disclosure"|dataConsent/);
});
