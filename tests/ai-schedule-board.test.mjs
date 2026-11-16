import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const {groupScheduleJobs,scheduleStatusLabel}=await loadTsModule('src/multica/schedule-board.ts');
const {callScheduleBackend,ScheduleBackendUnavailable}=await loadTsModule('src/multica/schedule-client.ts');
const item=(id,state,runAt=100,provider='multica')=>({id,state,runAt,provider,prompt:id,repeat:'once',createdAt:1,localHour:1,localMinute:0});

test('board groups every real state without changing tasks and orders pending by time',()=>{
  const jobs=[item('late','pending',200),item('p','paused'),item('a','running'),item('c','completed'),item('f','failed'),item('u','unknown'),item('s','skipped'),item('early','pending',50)];
  const before=JSON.stringify(jobs), groups=groupScheduleJobs(jobs);
  assert.deepEqual(groups.pending.map(x=>x.id),['early','late']);
  assert.deepEqual(groups.running.map(x=>x.id),['a']);
  assert.deepEqual(groups.completed.map(x=>x.id),['c']);
  assert.deepEqual(groups.attention.map(x=>x.id),['p','f','u','s']);
  assert.equal(JSON.stringify(jobs),before);
  assert.equal(scheduleStatusLabel(groups.completed[0]),'已派发');
  assert.equal(scheduleStatusLabel(item('x','completed',100,'deepseek')),'已执行');
});
test('background absence and uncertain writes are explicit and never retried',async()=>{
  let attempts=0;
  const runtime={sendMessage:async()=>{attempts++;return undefined;}};
  await assert.rejects(callScheduleBackend(runtime,'create',{input:{}}),ScheduleBackendUnavailable);
  assert.equal(attempts,1);
  await assert.rejects(callScheduleBackend({sendMessage:async()=>({ok:false,error:'拒绝访问'})},'list'),/拒绝访问/);
  assert.deepEqual(await callScheduleBackend({sendMessage:async()=>({ok:true,result:[]})},'list'),[]);
});
