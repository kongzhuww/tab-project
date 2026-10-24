import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  experimental: {
    // Extension pages live above generated/. Resolve this worker beside its bundle,
    // not at the extension's /assets root; leave existing asset URLs unchanged.
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === "js" && filename.startsWith("assets/markdown.worker-")) return { relative: true };
    }
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        "vue-ui": resolve(projectRoot, "src/intro/main.ts"),
        "search-ui": resolve(projectRoot, "src/search/main.ts"),
        "sticker-ui": resolve(projectRoot, "src/stickers/main.ts"),
        "sidepanel-ui": resolve(projectRoot, "src/sidepanel/index.ts"),
        "sync-bridge-ui": resolve(projectRoot, "src/sync/main.ts"),
        "bootstrap-ui": resolve(projectRoot, "src/bootstrap/main.ts")
      },
      name: "LogicWeaverUiBundle",
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`
    },
    outDir: resolve(projectRoot, "generated"),
    sourcemap: false,
    minify: "esbuild",
    assetsInlineLimit: 0,
    target: "chrome120",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "vue-ui.css";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "chunks/[name]-[hash].js",
        manualChunks(id) {
          const normalized = id.replace(/\\/g, "/");
          if (normalized.includes("node_modules/vue") || normalized.includes("node_modules/@vue")) {
            return "vendor-vue";
          }
          if (normalized.includes("/src/utils/")) {
            return "core-utils";
          }
        }
      }
    }
  }
});
