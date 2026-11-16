import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { classifyRun, trackedRun, trackingDelay } = await loadTsModule('src/multica/task-tracking.ts');

test('only confirmed terminal run states generate success or failure', () => {
  assert.equal(classifyRun({id:'1',status:'running'}),null);
  assert.equal(classifyRun({id:'1',status:'in_review'}),null);
  assert.equal(classifyRun({id:'1',status:'completed'}),'success');
  assert.equal(classifyRun({id:'1',status:'failed'}),'error');
  assert.equal(classifyRun({id:'1',status:'completed',error:'failed'}),'error');
  assert.equal(trackedRun({knownRunIds:['old']},[{id:'old',status:'completed'},{id:'new',status:'running'}]).id,'new');
  assert.ok(trackingDelay(6)>trackingDelay(1));
});

test('tracked runs notify once and do not cross workspace accounts', async t => {
  const previousChrome=globalThis.chrome, previousFetch=globalThis.fetch;
  t.after(()=>{ globalThis.chrome=previousChrome; globalThis.fetch=previousFetch; });
  const data={multicaCredentialV1:{token:'fake-token',workspaceId:'ws-1'}};
  const alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:data[key]}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  let calls=0;
  globalThis.fetch=async()=>{calls++;return Response.json([{id:'old',status:'completed'},{id:'run-1',status:'completed'}]);};
  const {trackMulticaTask,checkTrackedMulticaTasks}=await loadTsModule('src/background/ai-task-tracker.ts');
  await trackMulticaTask('issue-1','测试任务',['old'],'ws-1');
  assert.equal(alarms.size,1);
  data.multicaCredentialV1.workspaceId='ws-2'; await checkTrackedMulticaTasks();
  assert.equal(calls,0); assert.equal(data.notificationHistoryV1,undefined);
  data.multicaCredentialV1.workspaceId='ws-1'; await checkTrackedMulticaTasks();
  assert.equal(data.notificationHistoryV1.items.length,1);
  assert.equal(data.notificationHistoryV1.items[0].appType,'ai-workspace');
  assert.equal(data.notificationHistoryV1.items[0].level,'success');
  assert.equal(data.aiTrackedMulticaTasksV1.length,0);
  assert.equal(alarms.size,0);
  await checkTrackedMulticaTasks(); assert.equal(data.notificationHistoryV1.items.length,1);
  globalThis.fetch=async()=>Response.json([{id:'run-2',status:'failed'}]);
  await trackMulticaTask('issue-2','失败任务',[],'ws-1');
  await checkTrackedMulticaTasks();
  assert.equal(data.notificationHistoryV1.items.length,2);
  assert.equal(data.notificationHistoryV1.items[0].level,'error');
  globalThis.fetch=async()=>new Response('',{status:401});
  await trackMulticaTask('issue-3','网络错误',[],'ws-1');
  await checkTrackedMulticaTasks();
  assert.equal(data.notificationHistoryV1.items.length,2,'a request error must not become task success or failure');
  assert.equal(data.aiTrackedMulticaTasksV1.length,1);
  assert.ok(data.aiTrackedMulticaTasksV1[0].retryAt > Date.now());
});
