<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, onBeforeUnmount, watch } from "vue";
import "./builtins";
import { getDockModule } from "./registry";
import { appMountedState, runningAppsState, dockLifecycleController } from "../dock/dock-lifecycle.store";
const props = defineProps<{ id: string }>();
// Each keyed host occupies the exact original card slot and adds no layout wrapper.
const module = getDockModule(props.id);
if (!module || module.presentation !== "card") throw new Error("Unknown registered workspace card");
const definition = module;
// The workspace host itself is created only after the existing idle-ready gate.
// Keep legacy eager cards mounted without opening them or loading their services here.
if (definition.mountPolicy === "workspace-ready") dockLifecycleController.markRunning(definition.id);
watch(definition.lifecycle.isVisible, visible => {
  if (visible) dockLifecycleController.markRunning(definition.id);
}, { immediate: true, flush: "sync" });
const mounted = computed(() => Boolean(appMountedState[definition.id]));
const view = defineAsyncComponent({
  loader: definition.loadView,
  errorComponent: defineComponent({
    setup: () => () => definition.lifecycle.isVisible() ? h("section", { class: "card wide card-fullscreen", role: "alert" }, [
      h("h2", definition.title),
      h("p", "工作区代码加载失败。请先保存其它窗口的草稿，再手动刷新页面；不会自动刷新或重发任务。"),
      h("button", { type: "button", onClick: definition.lifecycle.hide }, "返回首页")
    ]) : null
  })
});
onBeforeUnmount(() => {
  definition.lifecycle.hide();
  runningAppsState.delete(definition.id);
  delete appMountedState[definition.id];
});
</script>
<template>
  <component :is="view" v-if="mounted" :key="dockLifecycleController.getRenderKey(definition.id)" />
</template>
