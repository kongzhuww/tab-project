<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, watch, onBeforeUnmount } from "vue";
import "./builtins";
import { listDockModules } from "./registry";
import { appMountedState, runningAppsState, dockLifecycleController } from "../dock/dock-lifecycle.store";
import { windowManagerController } from "../core/window-manager.store";

const entries = listDockModules().filter(module => module.presentation !== "card").map(module => {
  watch(module.lifecycle.isVisible, visible => {
    if (visible) dockLifecycleController.markRunning(module.id);
  }, { immediate: true, flush: "sync" });
  const loadErrorView = defineComponent({
    setup: () => () => h("section", { class: "dock-module-load-error", role: "alert" }, [
      h("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
        h("strong", { style: "font-size: 13px; color: var(--heading);" }, `${module.title} 加载受阻`),
        h("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
      ]),
      h("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
      h("div", { style: "display: flex; gap: 8px;" }, [
        h("button", {
          type: "button",
          style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
          onClick: () => {
            if (typeof window !== "undefined") window.location.reload();
          }
        }, "⟳ 刷新标签页"),
        h("button", {
          type: "button",
          style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
          onClick: () => { void dockLifecycleController.reloadApp(module.id); }
        }, "↻ 重试"),
        h("button", {
          type: "button",
          style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
          onClick: () => { dockLifecycleController.hideApp(module.id); }
        }, "隐藏")
      ])
    ])
  });
  return {
    definition: module,
    mounted: computed(() => Boolean(appMountedState[module.id])),
    view: defineAsyncComponent({
      loader: module.loadView,
      onError(error, retry, fail, attempts) {
        if (attempts <= 2) {
          retry();
        } else {
          fail();
        }
      },
      errorComponent: loadErrorView
    })
  };
});
onBeforeUnmount(() => {
  // Page-host teardown clears frontend ownership, never an external process or posted task.
  for (const { definition } of entries) {
    void windowManagerController.close(definition.id);
    runningAppsState.delete(definition.id);
    appMountedState[definition.id] = false;
  }
});
</script>

<template>
  <div v-for="entry in entries" v-show="entry.definition.lifecycle.isVisible()" :id="entry.definition.rootId" :key="entry.definition.id">
    <component :is="entry.view" v-if="entry.mounted.value" :key="dockLifecycleController.getRenderKey(entry.definition.id)" />
  </div>
</template>

<style scoped>
:deep(.dock-module-load-error) { position:fixed; top:80px; right:24px; max-width:360px; padding:12px; z-index:200; border:1px solid var(--border); border-radius:6px; background:var(--panel); color:var(--text); }
:deep(.dock-module-load-error button) { margin-right:8px; }
</style>
