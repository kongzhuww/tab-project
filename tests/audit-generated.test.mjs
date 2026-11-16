import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const script = path.resolve('scripts/audit-generated.mjs');

test('chunk audit follows nested dependencies and never removes candidates', async t => {
  const root = await mkdtemp(path.join(tmpdir(),'tab-audit-test-'));
  t.after(() => rm(root,{recursive:true,force:true}));
  await mkdir(path.join(root,'chunks'));
  await writeFile(path.join(root,'entry.js'), 'import "./chunks/main-a.js";');
  await writeFile(path.join(root,'chunks/main-a.js'), 'import "./child-b.js";');
  await writeFile(path.join(root,'chunks/child-b.js'), 'export const v=1;');
  await writeFile(path.join(root,'chunks/old-c.js'), 'export const old=1;');
  const run = await exec(process.execPath,[script,'--root',root,'--json']);
  const info = JSON.parse(run.stdout);
  assert.equal(info.reachableCount,2); assert.deepEqual(info.candidates,['old-c.js']);
  assert.deepEqual(info.missing,[]);
  assert.equal(await readFile(path.join(root,'chunks/old-c.js'),'utf8'),'export const old=1;');
});
test('missing referenced chunks are surfaced and do not authorize deletion', async t => {
  const root = await mkdtemp(path.join(tmpdir(),'tab-audit-missing-'));
  t.after(() => rm(root,{recursive:true,force:true}));
  await mkdir(path.join(root,'chunks'));
  await writeFile(path.join(root,'entry.js'), 'import "./chunks/missing.js";');
  const info = JSON.parse((await exec(process.execPath,[script,'--root',root,'--json'])).stdout);
  assert.deepEqual(info.missing,['missing.js']);
});
