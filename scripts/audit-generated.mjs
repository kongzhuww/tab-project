// Read-only inventory. Unreferenced chunks are candidates, not proof of safe deletion:
// an open older tab can still request chunks from an earlier build.
import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const rootArg = args.indexOf('--root');
if (rootArg !== -1 && (!args[rootArg + 1] || args[rootArg + 1].startsWith('--'))) throw new Error('--root requires a directory');
const generated = rootArg === -1 ? path.join(project, 'generated') : path.resolve(args[rootArg + 1]);
const chunks = path.join(generated, 'chunks');
if (!existsSync(chunks)) throw new Error(`Missing chunks directory: ${chunks}`);
const files = (await readdir(chunks)).filter(name => name.endsWith('.js')).sort();
const present = new Set(files);
const entries = (await readdir(generated)).filter(name => name.endsWith('.js')).sort();
const reachable = new Set(), missing = new Set(), queue = entries.map(name => ({ file:path.join(generated,name), chunk:false }));
while (queue.length) {
  const item = queue.shift();
  const content = await readFile(item.file, 'utf8');
  const patterns = [/chunks\/([\w.-]+\.js)/g];
  if (item.chunk) patterns.push(/["'`]\.\/([\w.-]+\.js)["'`]/g);
  for (const re of patterns) for (const match of content.matchAll(re)) {
    const name = match[1];
    if (!present.has(name)) { missing.add(name); continue; }
    if (!reachable.has(name)) { reachable.add(name); queue.push({ file:path.join(chunks,name), chunk:true }); }
  }
}
const candidates = files.filter(name => !reachable.has(name));
let candidateBytes = 0;
for (const name of candidates) candidateBytes += (await stat(path.join(chunks,name))).size;
const report = { generated, entryCount:entries.length, chunkCount:files.length, reachableCount:reachable.size, candidateCount:candidates.length, candidateBytes, missing:[...missing].sort(), candidates };
if (args.includes('--json')) console.log(JSON.stringify(report,null,2));
else {
  console.log(`Generated: ${generated}\nEntries: ${entries.length}; chunks: ${files.length}; reachable: ${reachable.size}; candidates: ${candidates.length} (${(candidateBytes / 1048576).toFixed(1)} MiB); missing references: ${missing.size}.`);
  console.log('Read-only estimate; open old tabs and dynamic references may still need candidate files. Nothing was removed. Use --json for the complete list.');
}
