import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { readBackpackRevision, writeBackpackIfCurrent, StaleBackpackError } = await loadTsModule('src/backpack/revision-guard.ts');
function harness(initial = {}) {
  const data = {...initial}, tails = new Map();
  return { data, storage:{async get(key) { return {[key]:data[key]}; }, async set(values) { Object.assign(data, values); }}, locks:{request(name, callback) {
    const start = tails.get(name) || Promise.resolve();
    const result = start.then(callback); tails.set(name, result.catch(() => {})); return result;
  }}};
}
test('rejects a stale tab after another tab writes', async () => {
  const {data,storage,locks}=harness({items:['original']});
  const a=await readBackpackRevision(storage,'rev'), b=await readBackpackRevision(storage,'rev');
  assert.equal(await writeBackpackIfCurrent(storage,locks,'rev',a,{items:['restored']}),1);
  await assert.rejects(writeBackpackIfCurrent(storage,locks,'rev',b,{items:['old']}),StaleBackpackError);
  assert.deepEqual(data.items,['restored']);
});
test('concurrent writers with the same revision cannot both commit', async () => {
  const {data,storage,locks}=harness();
  const result=await Promise.allSettled([
    writeBackpackIfCurrent(storage,locks,'rev',0,{items:['a']}),
    writeBackpackIfCurrent(storage,locks,'rev',0,{items:['b']})
  ]);
  assert.equal(result.filter(x=>x.status==='fulfilled').length,1);
  assert.equal(result.filter(x=>x.status==='rejected').length,1);
  assert.equal(data.rev,1);
});
test('invalid revision and failed writes never report a successful commit', async () => {
  const {storage,locks}=harness({rev:'invalid'});
  await assert.rejects(writeBackpackIfCurrent(storage,locks,'rev',0,{items:[]}),/版本记录无效/);
  const good=harness(); good.storage.set=async()=>{throw Error('storage failure')};
  await assert.rejects(writeBackpackIfCurrent(good.storage,good.locks,'rev',0,{items:[]}),/storage failure/);
  assert.equal(good.data.rev,undefined);
});
