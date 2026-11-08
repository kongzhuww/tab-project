import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { stripTypeScriptTypes } from 'node:module';
import { defaultDockCards } from '../src/dock/default-order.ts';

test('new-user Dock puts Bilibili first without changing other relative order or input', () => {
  const cards = [{ id: 'todoist' }, { id: 'daily-bilibili' }, { id: 'card-github' }];
  assert.deepEqual(defaultDockCards(cards).map(card => card.id), ['daily-bilibili', 'todoist', 'card-github']);
  assert.equal(cards[0].id, 'todoist');
  assert.deepEqual(defaultDockCards([]), []);
  assert.deepEqual(defaultDockCards([{ id: 'card-github' }]), [{ id: 'card-github' }]);
});

test('saved drag order still overrides the Bilibili-first default; hidden cards stay hidden', async () => {
  const raw = await readFile(new URL('../src/dock/store.ts', import.meta.url), 'utf8');
  assert.match(raw, /DOCK_CARDS: DockCardItem\[\] = defaultDockCards\(mergeBuiltinDockCards\(\[\]\)\)/);
  const start = raw.indexOf('export function getVisibleDockCards()');
  const end = raw.indexOf('const initialState', start);
  const source = stripTypeScriptTypes(raw.slice(start, end).replace('export ', ''));
  const context = vm.createContext({
    DOCK_CARDS: defaultDockCards([{ id: 'todoist' }, { id: 'daily-bilibili' }, { id: 'card-github' }]),
    pluginMarketController: { isInstalled: id => id !== 'todoist' },
    loadCustomOrder: () => ({ cards: ['card-github', 'daily-bilibili'] })
  });
  vm.runInContext(source, context);
  assert.deepEqual(Array.from(context.getVisibleDockCards(), card => card.id), ['card-github', 'daily-bilibili']);
  context.loadCustomOrder = () => ({});
  assert.deepEqual(Array.from(context.getVisibleDockCards(), card => card.id), ['daily-bilibili', 'card-github']);
});
