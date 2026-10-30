<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, onBeforeUnmount, watch } from "vue";
import "./builtins";
import { getDockModule } from "./registry";
import { appMountedState, runningAppsState, dockLifecycleController } from "../dock/dock-lifecycle.store";
import { fullscreenCardState } from "../core/fullscreen-card-state";
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

function handleBackHome() {
  try {
    definition.lifecycle.hide();
  } catch {}
  if (fullscreenCardState.activeId === definition.id || fullscreenCardState.activeId === (definition as any).rootId) {
    fullscreenCardState.activeId = null;
  }
  dockLifecycleController.hideApp(definition.id);
  if (typeof document !== "undefined") {
    document.body.classList.remove("has-card-fullscreen");
  }
}

function handleReload() {
  dockLifecycleController.reloadApp(definition.id);
}

function handleRefresh() {
  if (typeof window !== "undefined") window.location.reload();
}

const view = defineAsyncComponent({
  loader: definition.loadView,
  onError(error, retry, fail, attempts) {
    if (attempts <= 2) {
      retry();
    } else {
      fail();
    }
  },
  errorComponent: defineComponent({
    setup: () => () => definition.lifecycle.isVisible() ? h("section", { class: "card wide card-fullscreen", role: "alert" }, [
      h("h2", definition.title),
      h("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
      h("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
        h("button", {
          type: "button",
          style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
          onClick: handleRefresh
        }, "⟳ 刷新标签页 (加载最新版)"),
        h("button", {
          type: "button",
          style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
          onClick: handleReload
        }, "↻ 重新加载模块"),
        h("button", {
          type: "button",
          style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
          onClick: handleBackHome
        }, "返回首页")
      ])
    ]) : null
  })
});
onBeforeUnmount(() => {
  handleBackHome();
  runningAppsState.delete(definition.id);
  delete appMountedState[definition.id];
});
</script>
<template>
  <component :is="view" v-if="mounted" :key="dockLifecycleController.getRenderKey(definition.id)" />
</template>
