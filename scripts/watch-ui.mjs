import { build } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configs = ["vite.ui.config.ts", "vite.sandbox.config.ts", "vite.localizer.config.ts"];
const watchers = await Promise.all(configs.map((name) => build({
  configFile: resolve(root, name),
  build: { watch: {} }
})));

async function close() {
  await Promise.all(watchers.map((watcher) => watcher?.close?.()));
}
process.once("SIGINT", () => { void close().finally(() => process.exit(0)); });
process.once("SIGTERM", () => { void close().finally(() => process.exit(0)); });
