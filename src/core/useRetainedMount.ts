import { readonly, ref, watch } from "vue";
import { dockLifecycleController } from "../dock/dock-lifecycle.store";

/**
 * Gate an async component until its first open request, then retain its instance.
 * Call in setup so Vue disposes the watcher with the owning layout.
 * When toolId is provided, binds to Dock lifecycle for macOS-style Quit / Reload.
 */
export function useRetainedMount(isOpen: () => boolean, toolId?: string) {
  const requested = ref(false);

  watch(
    isOpen,
    (open) => {
      if (open) {
        requested.value = true;
        if (toolId) {
          dockLifecycleController.markRunning(toolId);
        }
      }
    },
    { immediate: true, flush: "sync" }
  );

  // 监听 Dock 进程退出事件：当触发“真正的关闭”时，彻底销毁组件释放内存
  if (toolId) {
    watch(
      () => dockLifecycleController.isRunning(toolId),
      (running) => {
        if (!running) {
          requested.value = false;
        }
      }
    );
  }

  return readonly(requested);
}
