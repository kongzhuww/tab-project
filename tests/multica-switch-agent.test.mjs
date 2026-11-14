import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { multicaService } = await loadTsModule('src/services/multica.service.ts');
const { shouldSendComposer } = await loadTsModule('src/multica/composer-keyboard.ts');

test('Enter sends but Shift+Enter and IME composition do not', () => {
  const event = { key:'Enter', shiftKey:false, isComposing:false, keyCode:13 };
  assert.equal(shouldSendComposer(event), true);
  assert.equal(shouldSendComposer({...event,shiftKey:true}), false);
  assert.equal(shouldSendComposer({...event,isComposing:true}), false);
  assert.equal(shouldSendComposer({...event,keyCode:229}), false);
  assert.equal(shouldSendComposer({...event,key:'a'}), false);
});

test('agent switch verifies latest assignee, requests no run, and checks response', async () => {
  const oldChrome=globalThis.chrome, oldFetch=globalThis.fetch, calls=[];
  globalThis.chrome={storage:{local:{async get() { return {multicaCredentialV1:{token:'test-token',workspaceId:'ws'}}; }}}};
  globalThis.fetch=async (url,init) => {
    calls.push({url,init});
    if (!init.method) return Response.json({id:'issue',revision:3,assignee_type:'agent',assignee_id:'old'});
    return Response.json({id:'issue',revision:4,assignee_type:'agent',assignee_id:'new'});
  };
  try {
    const result=await multicaService.switchIssueAgent('issue','old','new');
    assert.equal(result.assignee_id,'new'); assert.equal(calls.length,2);
    assert.deepEqual(JSON.parse(calls[1].init.body),{assignee_type:'agent',assignee_id:'new',expected_revision:3,suppress_run:true});
    await assert.rejects(multicaService.switchIssueAgent('issue','other','new'),/已在其他地方改变/);
    assert.equal(calls.length,3);
  } finally { globalThis.chrome=oldChrome; globalThis.fetch=oldFetch; }
});

test('agent switch refuses missing revisions and uncertain update responses', async () => {
  const oldChrome=globalThis.chrome, oldFetch=globalThis.fetch;
  globalThis.chrome={storage:{local:{async get() { return {multicaCredentialV1:{token:'test-token',workspaceId:'ws'}}; }}}};
  try {
    let writes=0;
    globalThis.fetch=async (_url,init) => { if(init.method) writes++; return Response.json({id:'issue',assignee_id:'old'}); };
    await assert.rejects(multicaService.switchIssueAgent('issue','old','new'),/无法确认会话版本/); assert.equal(writes,0);
    globalThis.fetch=async (_url,init) => !init.method ? Response.json({id:'issue',assignee_id:'old',revision:2}) : Response.json({id:'issue',assignee_id:'old',assignee_type:'agent'});
    await assert.rejects(multicaService.switchIssueAgent('issue','old','new'),/切换结果无法确认/);
  } finally { globalThis.chrome=oldChrome; globalThis.fetch=oldFetch; }
});
