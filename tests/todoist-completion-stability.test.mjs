import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

async function load(entry, mocks) {
  const result = await build({ entryPoints: [fileURLToPath(new URL(`../${entry}`, import.meta.url))], bundle: true, format: 'esm', platform: 'node', write: false, plugins: [{ name: 'mocks', setup(build) {
    build.onResolve({ filter: /.*/ }, args => Object.hasOwn(mocks, args.path) ? { path: args.path, namespace: 'mock' } : null);
    build.onLoad({ filter: /.*/, namespace: 'mock' }, args => ({ contents: mocks[args.path], loader: 'js' }));
  }}] });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}
const moduleMock = `export const todoistModuleState = {active:true,pendingWrites:0,session:1}; export async function withTodoistWrite(fn){ todoistModuleState.pendingWrites++; try{return await fn()}finally{todoistModuleState.pendingWrites--} }`;

test('completing a board task invalidates reads and keeps the write pending until the API finishes', async t => {
  let finish;
  const old = globalThis.__todoistMock;
  t.after(() => { globalThis.__todoistMock = old; });
  globalThis.__todoistMock = { records: [], calls: [], response: new Promise(resolve => { finish = resolve; }) };
  const serviceMock = `export const todoistService = { invalidateWorkspaceSnapshots(){globalThis.__todoistMock.calls.push('invalidate')}, getToken(){return 'token'}, toggleTaskCompletion(id, completed){globalThis.__todoistMock.calls.push([id,completed]); return globalThis.__todoistMock.response} }`;
  const calendarMock = `export const todoistCalendarSidebarController={recordTaskCompletion(task,completed){globalThis.__todoistMock.records.push([task.id,completed])}}`;
  const store = await load('src/todoist/task-list-store.ts', { './module-state': moduleMock, '../services/todoist.service': serviceMock, './calendar-sidebar-store': calendarMock });
  const item = { id: '1', content: 'task', completed: false };
  store.todoistTaskListState.columns = [{ sectionId: '', title: 'Inbox', tasks: [item] }];
  store.todoistTaskListState.loading = true;
  store.todoistTaskListController.dispatch('toggle-task', { taskId: '1' });
  assert.equal(store.todoistTaskListState.loading, false);
  assert.deepEqual(store.todoistTaskListState.columns[0].tasks, []);
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(globalThis.__todoistMock.calls, ['invalidate', ['1', true]]);
  assert.deepEqual(globalThis.__todoistMock.records, [['1', true]]);
  finish();
  await new Promise(resolve => setImmediate(resolve));
});

test('today sidebar keeps task order when a task is completed', async t => {
  const old = globalThis.localStorage;
  const data = new Map();
  globalThis.localStorage = { getItem: key => data.get(key) || null, setItem: (key, value) => data.set(key, value) };
  t.after(() => { globalThis.localStorage = old; });
  const day = new Date();
  const date = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
  globalThis.__calendarTasks = ['a','b','c'].map((id, i) => ({ id, content: id, due: { date: `${date}T${String(i + 8).padStart(2, '0')}:00` } }));
  t.after(() => { delete globalThis.__calendarTasks; });
  const serviceMock = `export const todoistService={listCalendarTasks:async()=>globalThis.__calendarTasks,getCompletedTasks:async()=>({items:[]})}; export const isTodoistTaskCompleted=t=>t.checked===true||t.is_completed===true;`;
  const dateMock = `export const createTaskStartDateReader=()=>()=>''; export function parseDateAndTime(s){return {date:(s||'').slice(0,10),time:(s||'').slice(11,16)}}`;
  const store = await load('src/todoist/calendar-sidebar-store.ts', { './module-state': moduleMock, '../services/todoist.service': serviceMock, './task-list-store': `export const todoistTaskListState={columns:[]}; export const todoistTaskListController={}`, './task-date-helper': dateMock, '../i18n': `export const t=x=>x` });
  await store.todoistCalendarSidebarController.loadTodosForDate(date, true);
  assert.deepEqual(store.todoistCalendarSidebarState.todoItems.map(x => x.id), ['a','b','c']);
  store.todoistCalendarSidebarController.recordTaskCompletion(store.todoistCalendarSidebarState.todoItems[1], true);
  assert.deepEqual(store.todoistCalendarSidebarState.todoItems.map(x => x.id), ['a','b','c']);
  assert.equal(store.todoistCalendarSidebarState.todoItems[1].completed, true);
});

test('invalidated fast snapshots are not served', async t => {
  const old = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => JSON.stringify({ data: { columns: [{ tasks: [{id:'completed'}] }] } }) };
  t.after(() => { globalThis.localStorage = old; });
  const service = await load('src/services/todoist.service.ts', { '../todoist/module-state': moduleMock + '; export const trackTodoistWrites=x=>x', '../todoist/change-channel': `export const createTodoistChangeChannel=()=>({publish:async()=>{}})` });
  const instance = service.TodoistService.getInstance();
  assert.ok(instance.getFastSnapshot('today'));
  instance.invalidateWorkspaceSnapshots();
  assert.equal(instance.getFastSnapshot('today'), null);
});

test('fresh New Tab startup does not invalidate already-synced change-channel revision', async t => {
  const storage = new Map();
  const winListeners = new Map();
  const docListeners = new Map();
  const oldStorage = globalThis.localStorage;
  const oldWindow = globalThis.window;
  const oldDoc = globalThis.document;
  globalThis.localStorage = {
    getItem: k => storage.get(k) ?? null,
    setItem: (k, v) => storage.set(k, v),
    removeItem: k => storage.delete(k)
  };
  globalThis.window = {
    addEventListener: (type, fn) => winListeners.set(type, fn)
  };
  globalThis.document = {
    hidden: false,
    addEventListener: (type, fn) => docListeners.set(type, fn)
  };
  t.after(() => {
    globalThis.localStorage = oldStorage;
    globalThis.window = oldWindow;
    globalThis.document = oldDoc;
  });

  const { createTodoistChangeChannel } = await load('src/todoist/change-channel.ts', {});
  let invalidations = 0;
  const channel1 = createTodoistChangeChannel(async () => 'token-1', () => { invalidations++; });
  await channel1.publish('token-1');
  await channel1.markSynced('token-1');

  // Simulate a New Tab refresh: new channel instance with empty in-memory `seen`.
  createTodoistChangeChannel(async () => 'token-1', () => { invalidations++; });
  winListeners.get('pageshow')?.();
  await new Promise(r => setTimeout(r, 20));
  assert.equal(invalidations, 0, 'synced revision must not invalidate on New Tab refresh');

  // Simulate another tab publishing an un-synced write.
  await channel1.publish('token-1');
  winListeners.get('pageshow')?.();
  await new Promise(r => setTimeout(r, 20));
  assert.equal(invalidations, 1, 'unsynced write must invalidate');
});

test('loadWorkspaceData reuses valid cached snapshot across reloads without forcing network', async t => {
  const oldStorage = globalThis.localStorage;
  const oldTimestamp = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago
  const snapshot = {
    data: {
      columns: [{ sectionId: '', title: 'Inbox', tasks: [{ id: 't1', content: 'cached', completed: false }] }],
      projects: [],
      activeProjectId: '',
      activeProjectName: '',
      availableLabels: []
    },
    timestamp: oldTimestamp
  };
  const store = new Map([['todoist_fast_snapshot:v3:inbox', JSON.stringify(snapshot)]]);
  globalThis.localStorage = {
    getItem: k => store.get(k) ?? null,
    setItem: (k, v) => store.set(k, v),
    removeItem: k => store.delete(k)
  };
  t.after(() => { globalThis.localStorage = oldStorage; });

  const service = await load('src/services/todoist.service.ts', {
    '../todoist/module-state': moduleMock + '; export const trackTodoistWrites=x=>x',
    '../todoist/change-channel': `export const createTodoistChangeChannel=()=>({publish:async()=>{},markSynced:async()=>{},clear:()=>{}})`
  });
  const instance = service.TodoistService.getInstance();
  instance.token = 'fixture-token';
  let onlineCalls = 0;
  instance.fetchWorkspaceDataOnline = async () => { onlineCalls++; return snapshot.data; };
  // Populate memory cache from fast snapshot as task-list-store does
  assert.ok(instance.getFastSnapshot('inbox'));
  const loaded = await instance.loadWorkspaceData('inbox');
  assert.equal(onlineCalls, 0, 'cached snapshot must be reused without network fetch');
  assert.equal(loaded.columns[0].tasks[0].id, 't1');

  await instance.loadWorkspaceData('inbox', undefined, true);
  assert.equal(onlineCalls, 1, 'explicit force=true still fetches online');
});
