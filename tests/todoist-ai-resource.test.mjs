import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { makeTodoistResource, parseTodoistResource, TODOIST_RESOURCE_MIME } = await loadTsModule('src/todoist/task-resource.ts');
const { messageWithResources } = await loadTsModule('src/multica/resource-content.ts');

test('task drag creates a bounded snapshot without unrelated private task data', () => {
  const task={id:'Ab12-xyz',content:'测试任务',description:'😀'.repeat(2005),dueDate:'2027-01-02',completed:false,_taskRaw:{token:'SECRET'}};
  const data=makeTodoistResource(task);
  assert.equal(TODOIST_RESOURCE_MIME,'application/x-tab-project-todoist-resource');
  assert.equal(data.kind,'todoist');assert.equal(data.truncated,true);
  assert.equal(Array.from(data.description).length,2000);
  assert.doesNotMatch(JSON.stringify(data),/SECRET/);
  const parsed=parseTodoistResource(JSON.stringify({...data,url:'https://attacker.example/'}));
  assert.equal(parsed.url,'https://app.todoist.com/app/task/Ab12-xyz');
  const message=messageWithResources('帮我安排',[parsed]);
  assert.match(message,/Todoist 任务/);assert.match(message,/测试任务/);assert.match(message,/截止日期：2027-01-02/);assert.match(message,/描述（已截断）/);
  assert.doesNotMatch(message,/README|字幕|attacker|SECRET/);
});

test('untrusted task drag data is validated', () => {
  assert.equal(parseTodoistResource('bad json'),null);
  assert.equal(parseTodoistResource(JSON.stringify({kind:'todoist',id:'../bad',title:'任务'})),null);
  assert.equal(parseTodoistResource(JSON.stringify({kind:'todoist',id:'123',title:'任务',description:'a'.repeat(2001)})),null);
  assert.equal(makeTodoistResource({id:'optimistic-1',content:'',completed:false}),null);
});
