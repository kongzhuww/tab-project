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
      h("p", `${module.title} 的界面代码未能加载，并非只能打开一个窗口。`),
      h("p", "若刚更新过扩展代码，请先保存草稿，再手动刷新整个页面；旧页面引用的分块文件可能已经被移除。不会自动刷新或关闭其它窗口。"),
      h("button", { type: "button", onClick: () => { void dockLifecycleController.reloadApp(module.id); } }, "重试此窗口"),
      h("button", { type: "button", onClick: () => { dockLifecycleController.hideApp(module.id); } }, "隐藏窗口")
    ])
  });
  return {
    definition: module,
    mounted: computed(() => Boolean(appMountedState[module.id])),
    view: defineAsyncComponent({
      loader: module.loadView,
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
