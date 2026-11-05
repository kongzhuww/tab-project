import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
import { ref, computed, reactive, shallowReactive, watch, effectScope, nextTick } from 'vue';
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const transform = source => stripTypeScriptTypes(source).replace(/^import\s[\s\S]*?;\s*$/gm, '').replace(/^export /gm, '');
const pure = vm.createContext({});
vm.runInContext(transform(await read('src/github/sidebar-tiles.ts')) + '\nglobalThis.pure = { buildSidebarTiles, reorderSidebarTiles, validateSidebarOrder, repositoryShortcut };', pure);
const { buildSidebarTiles, reorderSidebarTiles, validateSidebarOrder, repositoryShortcut } = pure.pure;
const first = { id: 1, full_name: 'fixture/one', name: 'one', html_url: 'https://github.com/fixture/one', owner: { avatar_url: 'https://avatars.githubusercontent.com/u/1' } };
const second = { id: 2, full_name: 'fixture/two', name: 'two' };
const lists = [{ id: 'list-a', name: 'AI', totalCount: 0 }, { id: 'list-b', name: 'tools', totalCount: 0 }];

test('sidebar uses stable folder IDs and only shows unclassified repositories at root', () => {
  const membership = new Map([['fixture/one', ['AI', 'tools']]]);
  const tiles = buildSidebarTiles([first, second], lists, membership, []);
  assert.deepEqual(Array.from(tiles, tile => tile.key), ['list:list-a', 'list:list-b', 'repo:fixture/two']);
  assert.equal(tiles[0].repos[0], first); assert.equal(tiles[1].repos[0], first);
  const renamed = [{ ...lists[0], name: 'renamed' }, lists[1]];
  assert.equal(buildSidebarTiles([], renamed, new Map(), ['list:list-a'])[0].key, 'list:list-a');
});
test('local ordering tolerates removed keys, missing keys and malformed storage', () => {
  const order = validateSidebarOrder(['list:list-b', null, 'unsafe', 'list:list-b', 'repo:deleted/old']);
  const tiles = buildSidebarTiles([first, second], lists, new Map(), order);
  assert.equal(tiles[0].key, 'list:list-b'); assert.equal(tiles.length, 4);
  assert.deepEqual(Array.from(reorderSidebarTiles(['a', 'b', 'c'], 'a', 'c')), ['b', 'c', 'a']);
  assert.deepEqual(Array.from(reorderSidebarTiles(['a', 'b'], 'missing', 'b')), ['a', 'b']);
});
test('sidebar tiles filter by activeSection', () => {
  const customLists = [
    { id: 'l1', name: 'Folder 1', section: '默认', totalCount: 0 },
    { id: 'l2', name: 'Folder 2', section: '工作区', totalCount: 0 }
  ];
  const defaultTiles = buildSidebarTiles([], customLists, new Map(), [], '默认');
  assert.equal(defaultTiles.length, 1);
  assert.equal(defaultTiles[0].key, 'list:l1');

  const workTiles = buildSidebarTiles([], customLists, new Map(), [], '工作区');
  assert.equal(workTiles.length, 1);
  assert.equal(workTiles[0].key, 'list:l2');
});

async function sidebar() {
  const scope = effectScope(), actions = [], storage = new Map(), handlers = new Map();
  const cleanup = [];
  let hit = null, timerActive = false, completionCalls = 0;
  const context = vm.createContext({ ref, computed, reactive, watch,
    defineProps: () => ({}), withDefaults: (props, defaults) => ({ ...defaults, ...props }), defineEmits: () => () => {},
    onMounted: callback => callback(), onBeforeUnmount: callback => cleanup.push(callback),
    useContextMenu: () => ({ menuRef: ref(null), style: computed(() => ({})) }),
    categoryFeedback: reactive({ busy: false, message: '' }),
    state: reactive({ folders: [{ title: '全部', kind: 'all' }, { title: '未分类', kind: 'uncategorized' }, ...lists.map(list => ({ title: list.name, kind: 'custom' }))] }),
    starBoardData: shallowReactive({ ownerKey: 'fixture-owner', activeSection: '默认', repos: [first, second], lists, repoListNames: new Map(), loading: false }),
    controller: { select: title => actions.push(['select', title]), delete: title => actions.push(['delete', title]), dropRepository: (name, title) => actions.push(['drop', name, title]) },
    githubRepoDetailController: { open: name => actions.push(['open', name]) },
    gitHubService: { ensureAllStarsLoaded: async () => { completionCalls++; } },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    Node: class {},
    window: { addEventListener: (event, fn) => { if (!handlers.has(event)) handlers.set(event, new Set()); handlers.get(event).add(fn); }, removeEventListener: (event, fn) => handlers.get(event)?.delete(fn) },
    document: { hidden: false, elementFromPoint: () => hit, addEventListener() {}, removeEventListener() {} },
    setInterval: () => { timerActive = true; return 1; }, clearInterval: () => { timerActive = false; }
  });
  const geometry = transform(await read('src/launchers/tile-drag-geometry.ts'));
  const helpers = transform(await read('src/github/sidebar-tiles.ts'));
  const drag = transform(await read('src/github/repository-drag.ts'));
  const sfc = await read('src/github/GitHubFolders.vue');
  const script = transform(sfc.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1]);
  scope.run(() => vm.runInContext(geometry + '\n' + helpers + '\n' + drag + '\n' + script + `
    globalThis.ui = { pointerDown, pointerMove, pointerUp, cancelDrag, openTile, nativeDrop, ghost, openListId,
      openContextMenu, closeContextMenu, moveMenuRepoToUnclassified, contextTarget,
      get tiles() { return tiles.value }, get order() { return localOrder.value }, get dropTarget() { return dropTarget.value } };`, context));
  const event = (x, y) => ({ button: 0, pointerId: 1, clientX: x, clientY: y, preventDefault() {},
    target: { closest: () => null }, currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) } });
  const element = (key, title) => ({ dataset: { ghTile: key, ghListDrop: title },
    hasAttribute: attribute => attribute === 'data-gh-tile' && Boolean(key),
    closest: selector => selector === '[data-gh-list-drop]' ? title ? element(key, title) : null : selector === '[data-gh-tile]' ? key ? element(key, title) : null : null,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }), classList: { add() {}, remove() {} } });
  return { context, ui: context.ui, actions, storage, event, element, hit: value => { hit = value; },
    timerActive: () => timerActive, completionCalls: () => completionCalls,
    dispose: () => { cleanup.forEach(callback => callback()); scope.stop(); }, handlers };
}

test('short pointer movement remains a click and never submits membership changes', async () => {
  const f = await sidebar();
  try {
    const tile = f.ui.tiles.find(tile => tile.kind === 'repo');
    f.ui.pointerDown(f.event(1, 1), tile); f.ui.pointerMove(f.event(3, 2));
    assert.equal(f.ui.ghost.visible, false);
    f.ui.pointerUp(f.event(3, 2)); f.ui.openTile(tile);
    assert.deepEqual(f.actions, [['open', first.full_name]]);
  } finally { f.dispose(); }
});
test('folder-center drop submits once, suppresses accidental click and keeps ordering local', async () => {
  const f = await sidebar();
  try {
    const tile = f.ui.tiles.find(tile => tile.kind === 'repo');
    f.hit(f.element('list:list-a', 'AI'));
    f.ui.pointerDown(f.event(1, 1), tile); f.ui.pointerMove(f.event(50, 50));
    assert.equal(f.ui.dropTarget, 'AI'); assert.equal(f.ui.ghost.visible, true);
    f.ui.pointerUp(f.event(50, 50)); f.ui.openTile(tile);
    assert.deepEqual(f.actions, [['drop', first.full_name, 'AI']]);
    assert.equal(f.ui.ghost.visible, false); assert.equal(f.timerActive(), false);
    assert.equal(f.context.starBoardData.repoListNames.size, 0, 'membership only changes after service confirmation');
  } finally { f.dispose(); }
});
test('drag sorting persists only local tile order; cancellation restores preview and listeners', async () => {
  const f = await sidebar();
  try {
    const tile = f.ui.tiles.find(tile => tile.kind === 'repo');
    f.hit(f.element('repo:fixture/two'));
    f.ui.pointerDown(f.event(1, 1), tile); f.ui.pointerMove(f.event(50, 50));
    assert.equal(f.ui.order.at(-1), tile.key);
    f.ui.cancelDrag(); assert.equal(f.ui.order.length, 0); assert.equal(f.timerActive(), false);
    assert.equal(f.handlers.get('pointermove').size, 0);
    f.ui.pointerDown(f.event(1, 1), tile); f.ui.pointerMove(f.event(50, 50)); f.ui.pointerUp(f.event(50, 50));
    await Promise.resolve(); await Promise.resolve();
    assert.ok(f.storage.has('ghSidebarTileOrderV1:fixture-owner:默认'));
    assert.equal(f.actions.length, 0);
  } finally { f.dispose(); }
});
test('account/view changes cancel pointer state and automatic completion does not retry-loop', async () => {
  const f = await sidebar();
  try {
    assert.equal(f.completionCalls(), 1);
    f.context.starBoardData.loading = true; await nextTick();
    f.context.starBoardData.loading = false; await nextTick();
    assert.equal(f.completionCalls(), 1);
    f.ui.pointerDown(f.event(1, 1), f.ui.tiles.find(tile => tile.kind === 'repo'));
    f.ui.pointerMove(f.event(50, 50));
    f.context.starBoardData.ownerKey = 'new-fixture-owner'; await nextTick();
    assert.equal(f.ui.ghost.visible, false); assert.equal(f.ui.openListId.value, '');
    assert.equal(f.ui.order.length, 0); assert.equal(f.actions.length, 0);
  } finally { f.dispose(); }
});
test('native repository drag uses shared MIME, rejects plain text, and cannot nest folders', async () => {
  const f = await sidebar();
  try {
    const native = data => ({ dataTransfer: data, preventDefault() {}, stopPropagation() {} });
    f.ui.nativeDrop(native({ types: ['text/plain'], getData: () => first.full_name }), 'AI');
    assert.equal(f.actions.length, 0);
    f.ui.nativeDrop(native({ types: ['application/x-logicweaver-gh-repo'], getData: () => first.full_name }), 'AI');
    assert.deepEqual(f.actions, [['drop', first.full_name, 'AI']]);
    f.hit(f.element('list:list-b', 'tools'));
    f.ui.pointerDown(f.event(1, 1), f.ui.tiles.find(tile => tile.kind === 'folder'));
    f.ui.pointerMove(f.event(50, 50)); f.ui.pointerUp(f.event(50, 50));
    assert.equal(f.actions.length, 1, 'folder drag only reorders, never changes native Lists');
  } finally { f.dispose(); }
});

test('context action moves grouped repository only on explicit menu selection', async () => {
  const f = await sidebar();
  try {
    f.context.starBoardData.repoListNames = new Map([[first.full_name, ['AI', 'tools']]]);
    const event = { clientX: 90, clientY: 120, preventDefault() {}, stopPropagation() {} };
    f.ui.openContextMenu(event, first);
    assert.equal(f.ui.contextTarget.value.fullName, first.full_name);
    assert.equal(f.actions.length, 0, 'opening a menu does not submit or open details');
    f.ui.moveMenuRepoToUnclassified();
    assert.deepEqual(f.actions, [['drop', first.full_name, '未分类']]);
    assert.equal(f.ui.contextTarget.value, null);
    f.ui.moveMenuRepoToUnclassified();
    assert.equal(f.actions.length, 1, 'closed menu cannot submit twice');
  } finally { f.dispose(); }
});

test('context action rejects ungrouped, busy and stale-account targets', async () => {
  const f = await sidebar();
  try {
    const event = { clientX: 90, clientY: 120, preventDefault() {}, stopPropagation() {} };
    f.ui.openContextMenu(event, first); f.ui.moveMenuRepoToUnclassified();
    assert.equal(f.actions.length, 0);
    f.context.starBoardData.repoListNames = new Map([[first.full_name, ['AI']]]);
    f.context.categoryFeedback.busy = true;
    f.ui.moveMenuRepoToUnclassified(); assert.equal(f.actions.length, 0);
    f.context.categoryFeedback.busy = false;
    f.context.starBoardData.ownerKey = 'another-account';
    f.ui.moveMenuRepoToUnclassified(); assert.equal(f.actions.length, 0);
    await nextTick(); assert.equal(f.ui.contextTarget.value, null);
  } finally { f.dispose(); }
});

test('folder window stays opaque and inline unclassified buttons are replaced by SDK context menu', async () => {
  const sfc = await read('src/github/GitHubFolders.vue');
  assert.doesNotMatch(sfc, /(?:^|\n)\.is-dragging\s*\{/);
  assert.match(sfc, /\.gh-shortcut-cell\.is-dragging\s*\{\s*opacity: 0\.25/);
  assert.match(sfc, /\.gh-shortcut-folder-window\.lw-window-frame\)\s*\{[^}]*opacity: 1 !important; background: var\(--panel\) !important/);
  assert.doesNotMatch(sfc, /<button[^>]*class="gh-tile-actions"/);
  assert.match(sfc, /useContextMenu\(/);
  assert.match(sfc, /@contextmenu="openContextMenu\(\$event, repo\)"/);
  assert.match(sfc, /@click="moveMenuRepoToUnclassified">移到未分组/);
  assert.match(sfc, /\.gh-shortcut-context-menu\s*\{[^}]*background: var\(--panel\)/);
  assert.doesNotMatch(sfc, /class="gh-shortcut-navigation"|拖进文件夹归类 · 拖到边缘排序/);
});
