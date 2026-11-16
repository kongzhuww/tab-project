import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

test('scheduled Multica dispatch creates once and is handed off for completion tracking',async t=>{
  const prior={chrome:globalThis.chrome,fetch:globalThis.fetch,now:Date.now};
  t.after(()=>{globalThis.chrome=prior.chrome;globalThis.fetch=prior.fetch;Date.now=prior.now;});
  let now=Date.now(); Date.now=()=>now;
  const data={multicaCredentialV1:{token:'test-token',workspaceId:'ws-1'}},alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  let posts=0;
  globalThis.fetch=async(url,options)=>{assert.equal(options.method,'POST');posts++;return Response.json({id:'issue-1',identifier:'A-1'});};
  const s=await loadTsModule('src/background/ai-scheduler.ts');
  await s.createAiSchedule({provider:'multica',repeat:'once',prompt:'scheduled',runAt:now+60000,agentId:'agent-1',workspaceId:'ws-1'});
  now+=61000; await s.runDueAiSchedules();
  assert.equal(posts,1); assert.equal(data.aiWorkspaceSchedulesV1[0].state,'completed');
  assert.equal(data.aiTrackedMulticaTasksV1[0].issueId,'issue-1');
  assert.equal(data.notificationHistoryV1,undefined,'dispatch is not task completion');
  await s.runDueAiSchedules(); assert.equal(posts,1);
});

test('scheduler message listener responds to authorized extension pages',async t=>{
  const prior=globalThis.chrome; t.after(()=>{globalThis.chrome=prior;});
  const data={},alarms=new Map();let listener;
  globalThis.chrome={runtime:{onMessage:{addListener(fn){listener=fn;}},id:'test',getURL:()=> 'chrome-extension://test/'},storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{onAlarm:{addListener(){}},get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  const s=await loadTsModule('src/background/ai-scheduler.ts');s.initAiScheduler();
  const authorized=await new Promise(resolve=>{assert.equal(listener({type:'ai-schedule:list'},{id:'test',url:'chrome-extension://test/newtab.html'},resolve),true);});
  assert.deepEqual(authorized,{ok:true,result:[]});
  let rejected;listener({type:'ai-schedule:list'},{id:'test',url:'https://example.com/'},value=>{rejected=value;});
  assert.equal(rejected.ok,false);
});

test('worker restart marks an in-flight run unknown and archives a warning',async t=>{
  const prior=globalThis.chrome; t.after(()=>{globalThis.chrome=prior;});
  const now=Date.now(),alarms=new Map();
  const data={aiWorkspaceSchedulesV1:[{id:'s1',provider:'deepseek',prompt:'scheduled',runAt:now-1000,repeat:'once',localHour:8,localMinute:0,state:'running',createdAt:now-60000,startedAt:now-1000,runId:'run-1'}]};
  globalThis.chrome={runtime:{onMessage:{addListener(){}},id:'test',getURL:()=> 'chrome-extension://test/'},storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{onAlarm:{addListener(){}},get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  const s=await loadTsModule('src/background/ai-scheduler.ts');s.initAiScheduler();
  for(let i=0;i<30 && !data.notificationHistoryV1;i++) await new Promise(r=>setTimeout(r,10));
  assert.equal(data.aiWorkspaceSchedulesV1[0].state,'unknown');
  assert.equal(data.notificationHistoryV1.items[0].level,'warning');
});

test('uncertain write is not automatically repeated and a workspace switch prevents dispatch',async t=>{
  const prior={chrome:globalThis.chrome,fetch:globalThis.fetch,now:Date.now};
  t.after(()=>{globalThis.chrome=prior.chrome;globalThis.fetch=prior.fetch;Date.now=prior.now;});
  let now=Date.now(); Date.now=()=>now; let calls=0;
  const data={multicaCredentialV1:{token:'test-token',workspaceId:'ws-1'}},alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  globalThis.fetch=async()=>{calls++;throw Error('request could have been accepted');};
  const s=await loadTsModule('src/background/ai-scheduler.ts');
  await s.createAiSchedule({provider:'multica',repeat:'once',prompt:'unsure',runAt:now+60000,agentId:'agent-1',workspaceId:'ws-1'});
  now+=61000; await s.runDueAiSchedules(); assert.equal(calls,1); assert.equal(data.aiWorkspaceSchedulesV1[0].state,'unknown');
  await s.runDueAiSchedules(); assert.equal(calls,1);
  await s.createAiSchedule({provider:'multica',repeat:'once',prompt:'account',runAt:now+60000,agentId:'agent-1',workspaceId:'ws-1'});
  data.multicaCredentialV1.workspaceId='ws-2'; now+=61000; await s.runDueAiSchedules();
  assert.equal(calls,1); assert.equal(data.aiWorkspaceSchedulesV1[0].state,'failed');
});
