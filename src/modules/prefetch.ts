import { listDockModules } from "./registry";

let prefetched = false;

/**
 * 空闲时静默预加载所有 Dock 模块的视图组件代码 (Idle Prefetching)
 * 作用：在首屏渲染后的空闲期，预加载当前已注册 Dock 模块的视图代码。
 * 预加载可以减少后续打开模块的等待，但不能保证旧构建产物始终可用。
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
