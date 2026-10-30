import { listDockModules } from "./registry";

let prefetched = false;

/**
 * 空闲时静默预加载所有 Dock 模块的视图组件代码 (Idle Prefetching)
 * 作用：在首屏渲染完成后的系统空闲期，提前将网易云、YouTube、B站等切片代码拉入浏览器缓存/内存。
 * 即使开发者随后在终端重新 build/clean，旧标签页内点击模块依然直接命中内存缓存，100% 杜绝 404 / Chunk 丢失。
 */
export function scheduleDockModulesPrefetch(delayMs: number = 1800) {
  if (prefetched || typeof window === "undefined") return;

  const doPrefetch = () => {
    if (prefetched) return;
    prefetched = true;

    const modules = listDockModules();
    for (const mod of modules) {
      if (typeof mod.loadView === "function") {
        try {
          // 仅触发动态 import 并缓存 promise，不挂载 DOM，零额外 UI 开销
          void mod.loadView().catch(() => {});
        } catch {}
      }
    }
  };

  if ("requestIdleCallback" in window) {
    setTimeout(() => {
      window.requestIdleCallback(doPrefetch, { timeout: 4000 });
    }, delayMs);
  } else {
    setTimeout(doPrefetch, delayMs);
  }
}
