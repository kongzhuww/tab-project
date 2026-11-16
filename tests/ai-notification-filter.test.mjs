import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const {unreadAiCount,newAiNotifications}=await loadTsModule('src/multica/notification-filter.ts');
const now=Date.now();
const make=(id,appType='ai-workspace',read=false)=>({id,appType,appName:'AI',title:'Task',subtitle:'',message:'',level:'success',createdAt:now,read});

test('Dock badge counts only unread AI records; history updates do not redisplay a toast',()=>{
  const old={version:1,items:[make('old'),make('other','bili')]};
  const next={version:2,items:[make('new'),...old.items]};
  assert.equal(unreadAiCount(next.items),2);
  assert.deepEqual(newAiNotifications(old,next,now).map(x=>x.id),['new']);
  const read={version:3,items:next.items.map(x=>x.id==='new'?{...x,read:true}:x)};
  assert.equal(unreadAiCount(read.items),1);
  assert.deepEqual(newAiNotifications(next,read,now),[]);
});
