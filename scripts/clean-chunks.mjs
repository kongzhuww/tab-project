import { readdir, readFile, unlink, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const genDir = path.join(root, "generated");
const chunksDir = path.join(genDir, "chunks");

if (!existsSync(chunksDir)) {
  console.log("No generated/chunks directory found.");
  process.exit(0);
}

const isForce = process.argv.includes("--force") || process.argv.includes("--all");
const isPurgeAll = process.argv.includes("--purge-all");
const allChunkFiles = await readdir(chunksDir);
const entryFiles = (await readdir(genDir)).filter(f => f.endsWith(".js") && f !== "theme-init.js");

const reachableChunks = new Set();
const queue = [];

async function scanFile(filePath, isChunk) {
  const content = await readFile(filePath, "utf8");
  // 1. Matches from entries: chunks/xxx.js
  const reChunks = /chunks\/([a-zA-Z0-9_\-\.]+\.js)/g;
  let match;
  while ((match = reChunks.exec(content)) !== null) {
    const name = match[1];
    if (!reachableChunks.has(name)) {
      reachableChunks.add(name);
      const full = path.join(chunksDir, name);
      if (existsSync(full)) queue.push({ path: full, isChunk: true });
    }
  }

  // 2. Matches between chunks: import("./xxx.js") or from "./xxx.js"
  if (isChunk) {
    const reRel = /[\"\'\`]\.\/([a-zA-Z0-9_\-\.]+\.js)[\"\'\`]/g;
    while ((match = reRel.exec(content)) !== null) {
      const name = match[1];
      if (!reachableChunks.has(name)) {
        reachableChunks.add(name);
        const full = path.join(chunksDir, name);
        if (existsSync(full)) queue.push({ path: full, isChunk: true });
      }
    }
  }
}

for (const entry of entryFiles) {
  queue.push({ path: path.join(genDir, entry), isChunk: false });
}

while (queue.length > 0) {
  const current = queue.shift();
  await scanFile(current.path, current.isChunk);
}

const now = Date.now();
// 默认宽容保留 60 分钟内构建的切片；即使普通 --force 也保留 15 分钟内的切片，保护正在运行的老标签页
const MAX_AGE_MS = 60 * 60 * 1000;
const FORCE_GRACE_MS = 15 * 60 * 1000;
let removedCount = 0;
let retainedCount = 0;

for (const file of allChunkFiles) {
  if (!reachableChunks.has(file)) {
    const filePath = path.join(chunksDir, file);
    if (!isPurgeAll) {
      try {
        const fileStat = await stat(filePath);
        const ageLimit = isForce ? FORCE_GRACE_MS : MAX_AGE_MS;
        if (now - fileStat.mtimeMs < ageLimit) {
          retainedCount++;
          continue;
        }
      } catch {}
    }
    await unlink(filePath).catch(() => {});
    removedCount++;
  }
}

console.log(`Verified ${allChunkFiles.length} chunks. Active: ${reachableChunks.size}, Cleaned: ${removedCount}${retainedCount ? `, Gracefully Retained: ${retainedCount}` : ""}.`);
