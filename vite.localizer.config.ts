import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

// MV3 content scripts and chrome.scripting.executeScript files must load as
// single classic scripts; do not share ESM chunks across page worlds.
export default defineConfig({
  plugins: [vue()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(projectRoot, "src/localizer/main.ts"),
      name: "LogicWeaverLocalizer",
      formats: ["iife"],
      fileName: () => "page-localizer-ui.js"
    },
    outDir: resolve(projectRoot, "generated"),
    sourcemap: false,
    minify: "esbuild",
    target: "chrome120"
  }
});
