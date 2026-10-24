import { readdir, readFile, unlink } from "node:fs/promises";
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

let removedCount = 0;
for (const file of allChunkFiles) {
  if (!reachableChunks.has(file)) {
    await unlink(path.join(chunksDir, file)).catch(() => {});
    removedCount++;
  }
}

console.log(`Verified ${allChunkFiles.length} chunks. Active: ${reachableChunks.size}, Cleaned: ${removedCount}.`);
