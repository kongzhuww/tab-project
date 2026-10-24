<script setup lang="ts">
import { ref, onMounted } from "vue";
import { todoistLabelController as controller, todoistLabelState as state } from "./labels";

const dragging = ref("");

onMounted(() => {
  void controller.refresh();
});

function startDrag(event: DragEvent, name: string): void {
  dragging.value = name;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("application/x-todoist-label", name);
    event.dataTransfer.setData("text/plain", `label:${name}`);
  }
  controller.startDrag(name, event);
}

function endDrag(): void {
  dragging.value = "";
}
</script>

<template>
  <p v-if="!state.labels.length" class="muted small" style="margin:6px 0;font-size:11px;color:#94a3b8;width:100%;text-align:center" @pointerdown.stop>暂无标签，可下方新建</p>
  <span
    v-for="label in state.labels"
    :key="label.id || label.name"
    class="todoist-label-shelf-chip"
    :class="{ dragging: dragging === label.name }"
    draggable="true"
    :title="`拖到任务卡片：${label.name}`"
    @pointerdown.stop
    @dragstart="startDrag($event, label.name)"
    @dragend="endDrag"
  >{{ label.name }}</span>
</template>
