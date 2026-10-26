import { execFileSync } from "node:child_process";
import { appendFile, cp, lstat, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run with npm run release:build (uses installed dependencies; no installation).");

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
if (packageJson.version !== manifest.version) throw new Error("Package and manifest versions must match.");
if (process.env.GITHUB_REF_TYPE === "tag" && process.env.GITHUB_REF_NAME !== `v${manifest.version}`) {
  throw new Error("Tag must exactly match v + manifest/package version.");
}

// Include current uncommitted sources, but never ignored local config or existing bundles.
const candidates = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }).split("\0").filter(Boolean);
const deleted = new Set(execFileSync("git", ["ls-files", "--deleted", "-z"],
  { cwd: root, encoding: "utf8" }).split("\0"));
const safe = [...new Set(candidates)].filter(file => !deleted.has(file) &&
  !/(^|\/)(?:\.env(?:\..*)?|[^/]*\.local\.[^/]*|node_modules)(\/|$)/i.test(file));
const runtimeFiles = safe.filter(file => /^(?:assets|third_party)\//.test(file) ||
  /^[^/]+\.html$/.test(file) || ["manifest.json", "favicon.ico", "popup.css", "LICENSE", "ATTRIBUTION.md"].includes(file));
const sourceFiles = safe.filter(file => file.startsWith("src/") ||
  // Public compile-time contract only: never copy the whole server/config tree.
  ["package.json", "tsconfig.ui.json", "vite.ui.config.ts", "vite.sandbox.config.ts", "vite.localizer.config.ts",
    "server/private-chat/protocol.json", "server/private-chat/README.md"].includes(file));

const distExtDir = path.join(root, "dist-extension");
await mkdir(distExtDir, { recursive: true });
// Preserve previous releases. Cleanup is an explicit operator action, not a build side effect.
const buildRoot = await mkdtemp(path.join(distExtDir, `v${manifest.version}-`));
const work = path.join(buildRoot, "work");
const output = path.join(buildRoot, "extension");
await mkdir(work);
await mkdir(output);

async function copyFiles(files, destination) {
  for (const file of files) {
    const source = path.join(root, file);
    const target = path.join(destination, file);
    if (!(await lstat(source)).isFile()) throw new Error(`Release input must be a regular file: ${file}`);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(source, target, { dereference: false });
  }
}

// All three Vite configs derive their root from their own location. Building the
// copied configs isolates *all* output, including the legacy duplicate workers.
await copyFiles([...sourceFiles, ...runtimeFiles], work);
try {
  execFileSync(process.execPath, [npmCli, "run", "check"], { cwd: work, stdio: "inherit" });
  await copyFiles(runtimeFiles, output);
  await cp(path.join(work, "generated"), path.join(output, "generated"), { recursive: true });
  // Preserve legacy worker filenames; retiring debug RPC does not change runtime entry paths.
  for (const file of ["background.js", "bookmarks-worker.js"]) {
    await cp(path.join(work, file), path.join(output, file));
  }
  execFileSync(process.execPath, ["--check", path.join(output, "generated/background.js")], { stdio: "inherit" });
  const chunkCount = (await readdir(path.join(output, "generated/chunks"))).length;
  await writeFile(path.join(buildRoot, "build-info.json"), JSON.stringify({
    version: manifest.version, chunkCount, sourceFileCount: sourceFiles.length,
    runtimeFileCount: runtimeFiles.length, builtAt: new Date().toISOString(),
    commit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(),
    environment: process.env.GITHUB_ACTIONS === "true" ? "github-actions" : "local-working-tree",
    note: "Build only; not browser-validated or audited for secrets. Local builds may include uncommitted sources."
  }, null, 2) + "\n");
  // Remove only this invocation's disposable source copy, never the live generated/.
  await rm(work, { recursive: true, force: true });
  if (process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT,
      `extension_dir=${output}\nbuild_info=${path.join(buildRoot, "build-info.json")}\nversion=${manifest.version}\n`);
  }
  console.log(`Clean extension: ${output}`);
  console.log(`Fresh chunks: ${chunkCount}. No existing release was overwritten or uploaded.`);
} catch (error) {
  console.error(`Build failed. Isolated workspace retained at ${work}`);
  throw error;
}
