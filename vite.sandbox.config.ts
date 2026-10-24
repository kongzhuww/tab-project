import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

// MV3 sandbox pages have an opaque origin: module scripts cannot be imported
// from the extension origin. Keep this single-file, classic IIFE and no Vue.
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(projectRoot, "src/wallpaper/sandbox.ts"),
      name: "LogicWeaverWallpaperSandbox",
      formats: ["iife"],
      fileName: () => "wallpaper-sandbox-ui.js"
    },
    outDir: resolve(projectRoot, "generated"),
    sourcemap: false,
    minify: "esbuild",
    target: "chrome120"
  }
});
