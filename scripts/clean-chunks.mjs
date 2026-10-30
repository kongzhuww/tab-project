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
const MAX_AGE_MS = 15 * 60 * 1000; // 保留 15 分钟内构建的旧切片，防止开发时立即击碎正在打开的标签页
let removedCount = 0;
let retainedCount = 0;

for (const file of allChunkFiles) {
  if (!reachableChunks.has(file)) {
    const filePath = path.join(chunksDir, file);
    if (!isForce) {
      try {
        const fileStat = await stat(filePath);
        if (now - fileStat.mtimeMs < MAX_AGE_MS) {
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
