import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mobileSrc = path.join(root, "mobile");
const output = path.join(root, "dist-mobile");
const assets = [
  "mobile.css",
  "mobile-app-runtime.js",
  "mobile-shim.js",
  "mobile.js",
  "mobile-tools.js",
  "mobile-update.js"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of assets) await cp(path.join(mobileSrc, file), path.join(output, file));

let html = await readFile(path.join(mobileSrc, "mobile.html"), "utf8");
html = html
  .replace("<title>LogicWeaver Mobile</title>", "<title>LogicWeaver</title>")
  .replace("<script src=\"mobile-shim.js\"></script>", "<script src=\"mobile-app-runtime.js\"></script>\n  <script src=\"mobile-shim.js\"></script>")
  .replace("<script src=\"mobile-tools.js\"></script>", "<script src=\"mobile-tools.js\"></script>\n  <script src=\"mobile-update.js\"></script>");
await writeFile(path.join(output, "index.html"), html, "utf8");
console.log(`Prepared ${assets.length + 1} mobile app files in ${output}`);
