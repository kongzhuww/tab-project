import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const code = source => stripTypeScriptTypes(source).replace(/^import\s[\s\S]*?;\s*$/gm, '').replace(/^export /gm, '');
async function fixture() {
  const records = new Map(), locks = new Map(), writes = []; let serial = 0, fail = false, calls = 0;
  const copy = value => structuredClone(value);
  const context = vm.createContext({ AbortController, GH_REMARKS_KEY: 'fixture-remarks',
    crypto: { randomUUID: () => `fixture-${++serial}` },
    navigator: { locks: { request: (name, _options, run) => {
      const job = (locks.get(name) || Promise.resolve()).then(run);
      locks.set(name, job.catch(() => {})); return job;
    } } },
    chrome: { storage: { local: {
      get: async keys => Object.fromEntries((Array.isArray(keys) ? keys : [keys]).filter(key => records.has(key)).map(key => [key, copy(records.get(key))])),
      set: async data => { if (fail) throw Error('fixture write failure'); for (const [key, value] of Object.entries(data)) { records.set(key, copy(value)); writes.push(key); } }
    } } },
    fetch: async () => { calls++; throw Error('Network must not be used for local groups'); },
    categoryFeedback: { busy: false, message: '' }, starBoardData: {},
    appDialog: { prompt: async () => 'local group', confirm: async () => true }
  });
  vm.runInContext(code(await read('src/github/local-star-groups.ts')), context);
  vm.runInContext(code(await read('src/services/github.service.ts')).replace(/^const gitHubService = GitHubService.getInstance\(\);\s*$/m, '') + '\nglobalThis.api = Object.create(GitHubService.prototype);', context);
  const api = context.api;
  Object.assign(api, { cacheKey: 'github-id:42', token: '', starWrites: 0, listsRevision: 0, lists: [],
    repoListNames: new Map(), repoListIds: new Map(), active: '全部', UNCAT: '未分类', selectedRepos: new Set(), repos: [] });
  api.publishAll = () => {}; api.publishStatus = () => {};
  return { context, api, records, writes, failWrites: value => { fail = value; }, networkCalls: () => calls };
}
const legacy = { lists: [{ id: 'old-list-id', name: 'tools', description: '', isPrivate: false, totalCount: 1 }], repoListNames: { 'fixture/one': ['tools'] } };

test('one-time account-scoped import keeps existing group IDs and does not touch legacy/cloud data', async () => {
  const f = await fixture(); f.records.set('ghListsCache_github-id:42', legacy);
  await f.api.loadLists();
  assert.equal(f.api.lists[0].id, 'old-list-id'); assert.equal(f.api.getRepoFolders('fixture/one')[0], 'tools');
  assert.ok(f.records.has('ghLocalStarGroupsV1:github-id:42'));
  assert.deepEqual(f.records.get('ghListsCache_github-id:42'), legacy);
  assert.equal(f.writes.includes('ghListsCache_github-id:42'), false);
  f.records.set('ghListsCache_github-id:42', { lists: [], repoListNames: {} });
  await f.api.loadLists(); assert.equal(f.api.lists.length, 1, 'refresh does not re-import/overwrite local groups');
  assert.equal(f.networkCalls(), 0);
});

test('create, classify, toggle, batch, clear and delete all work without a Token or any network', async () => {
  const f = await fixture(); f.records.set('ghListsCache_github-id:42', legacy);
  await f.api.loadLists(); await f.api.promptCreateFolder();
  assert.equal(f.api.lists.length, 2);
  await f.api.dropRepositoryIntoFolder('fixture/one', 'local group');
  assert.equal(f.api.getRepoFolders('fixture/one').length, 2);
  await f.api.toggleRepoList('fixture/one', 'tools');
  assert.deepEqual(Array.from(f.api.getRepoFolders('fixture/one')), ['local group']);
  f.api.selectedRepos = new Set(['fixture/one', 'fixture/two']);
  await f.api.batchAddToList('tools');
  assert.equal(f.api.getRepoFolders('fixture/two')[0], 'tools');
  await f.api.clearRepoLists('fixture/one'); assert.equal(f.api.getRepoFolders('fixture/one').length, 0);
  await f.api.deleteFolder('tools');
  assert.equal(f.api.getRepoFolders('fixture/two').length, 0); assert.equal(f.api.lists.length, 1);
  assert.equal(f.networkCalls(), 0);
  assert.ok(f.writes.every(key => key.startsWith('ghLocalStarGroupsV1:')));
});

test('rename, pin and reorder local groups work without touching cloud or other accounts', async () => {
  const f = await fixture();
  f.records.set('ghLocalStarGroupsV1:github-id:42', {
    version: 1, owner: 'github-id:42',
    groups: [{ id: 'g1', name: 'Group 1' }, { id: 'g2', name: 'Group 2' }, { id: 'g3', name: 'Group 3' }],
    memberships: {}
  });
  await f.api.loadLists();
  assert.equal(f.api.lists.length, 3);

  // 重命名
  f.context.appDialog.prompt = async () => 'New Group 2';
  await f.api.renameFolder('g2', 'Group 2');
  assert.equal(f.api.lists.find(l => l.id === 'g2').name, 'New Group 2');

  // 置顶
  await f.api.pinFolder('g3');
  assert.equal(f.api.lists[0].id, 'g3');
  assert.equal(f.api.lists[0].pinned, true);

  // 取消置顶
  await f.api.pinFolder('g3');
  assert.equal(f.api.lists[0].pinned, false);

  // 拖动排序
  await f.api.reorderFolders('g1', 'g3');
  assert.equal(f.api.lists[0].id, 'g1');
  assert.equal(f.networkCalls(), 0);
});

test('create, switch and remove local sections/tabs without network', async () => {
  const f = await fixture();
  f.records.set('ghLocalStarGroupsV1:github-id:42', {
    version: 1, owner: 'github-id:42',
    groups: [{ id: 'g1', name: 'Folder 1', section: '默认' }],
    memberships: {},
    sections: ['默认'],
    activeSection: '默认'
  });
  await f.api.loadLists();
  assert.deepEqual(Array.from(f.api.sections), ['默认']);

  // 新建大分组
  await f.api.createSection('工作区');
  assert.deepEqual(Array.from(f.api.sections), ['默认', '工作区']);
  assert.equal(f.api.activeSection, '工作区');

  // 切换大分组
  await f.api.switchSection('默认');
  assert.equal(f.api.activeSection, '默认');

  // 删除大分组（内容自动归并）
  await f.api.deleteSection('工作区');
  assert.deepEqual(Array.from(f.api.sections), ['默认']);
  assert.equal(f.api.activeSection, '默认');
  assert.equal(f.networkCalls(), 0);
});

test('account isolation and stale batch confirmation cannot move repositories in another account', async () => {
  const f = await fixture(); f.records.set('ghListsCache_github-id:42', legacy);
  await f.api.loadLists(); f.api.selectedRepos = new Set(['fixture/one']);
  const prepared = f.api.prepareBatchMove();
  f.api.cacheKey = 'user:another'; f.api.lists = []; f.api.repoListNames = new Map();
  await f.api.loadLists(); assert.equal(f.api.lists.length, 0);
  assert.equal(await prepared.submit(''), false);
  assert.equal(f.records.get('ghLocalStarGroupsV1:github-id:42').memberships['fixture/one'][0], 'old-list-id');
});

test('malformed storage and failed saves never replace the last visible groups', async () => {
  const f = await fixture(); f.records.set('ghListsCache_github-id:42', legacy); await f.api.loadLists();
  f.failWrites(true); await f.api.promptCreateFolder();
  assert.equal(f.api.lists.length, 1); assert.equal(f.api.actionError, true); assert.equal(f.context.categoryFeedback.busy, false);
  f.failWrites(false);
  f.records.set('ghLocalStarGroupsV1:github-id:42', { version: 1, owner: 'wrong-owner', groups: [], memberships: {} });
  const count = f.writes.length;
  await f.api.loadLists(); assert.equal(f.api.lists.length, 1); assert.equal(f.writes.length, count);
  assert.equal(f.api.actionError, true);
});

test('cross-page transactions re-read current local data instead of losing another edit', async () => {
  const f = await fixture();
  await Promise.all([
    f.context.changeLocalStarGroups('user:fixture', data => f.context.addLocalGroup(data, 'one')),
    f.context.changeLocalStarGroups('user:fixture', data => f.context.addLocalGroup(data, 'two'))
  ]);
  assert.equal(f.records.get('ghLocalStarGroupsV1:user:fixture').groups.length, 2);
  assert.equal(f.networkCalls(), 0);
});

test('active classification paths contain no GitHub Lists mutation/query calls', async () => {
  const service = await read('src/services/github.service.ts');
  assert.doesNotMatch(service, /\b(?:fetchGitHubUserLists|createGitHubUserList|deleteGitHubUserList|updateGitHubItemLists|getOrFetchRepoNodeId)\s*\(/);
  const board = await read('src/github/GitHubStarsBoard.vue');
  assert.doesNotMatch(board, /class="shelf-search-wrap"|v-model="state.searchQuery"/);
  assert.match(board, /col-pinned-icon/);
  assert.match(board, /取消置顶/);
  const hero = await read('src/github/GitHubHero.vue');
  assert.match(hero, /gh-github-help-btn/);
  const workspace = await read('src/github/GitHubWorkspaceCard.vue');
  assert.match(workspace, /:spreads="githubGuideSpreads"/);
  const book = await read('src/launchers/LauncherBookGuideDialog.vue');
  assert.match(book, /props.spreads/); assert.match(book, /bookCaseRef.value/);
  assert.match(book, /props.helpSelector/);
});
