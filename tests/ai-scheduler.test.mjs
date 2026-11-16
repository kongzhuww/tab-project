import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const {nextDaily,validateScheduleInput,safeScheduleList,keyFingerprint}=await loadTsModule('src/multica/schedule-contract.ts');

test('schedule validation, local daily recurrence and corrupt data protection',()=>{
  const now=Date.now();
  assert.throws(()=>validateScheduleInput({provider:'deepseek',repeat:'once',prompt:'',runAt:now+60000,model:'deepseek-flash'},now));
  assert.throws(()=>validateScheduleInput({provider:'multica',repeat:'daily',prompt:'test',runAt:now+60000,agentId:''},now));
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
  const data={multicaCredentialV1:{token:'fake-token',workspaceId:'ws-1'}}, alarms=new Map();
  globalThis.chrome={storage:{local:{get:async key=>({[key]:structuredClone(data[key])}),set:async values=>Object.assign(data,structuredClone(values))}},alarms:{get:async name=>alarms.get(name),create:async(name,value)=>alarms.set(name,value),clear:async name=>alarms.delete(name)}};
  globalThis.fetch=async()=>{calls++;throw Error('should not call');};
  const s=await loadTsModule('src/background/ai-scheduler.ts');
  await s.createAiSchedule({provider:'multica',repeat:'once',prompt:'test',runAt:now+60000,agentId:'agent-1',workspaceId:'ws-1'});
  now+=12*60000; await s.runDueAiSchedules();
  assert.equal(calls,0); assert.equal(data.aiWorkspaceSchedulesV1[0].state,'skipped');
  assert.equal(data.notificationHistoryV1.items[0].level,'warning');
});
