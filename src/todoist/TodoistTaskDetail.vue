<script setup lang="ts">
import { ref, watch } from "vue";
import { todoistTaskDetailController, todoistTaskDetailState } from "./task-detail-store";
import { todoistService } from "../services/todoist.service";

const title = ref("");
const description = ref("");
const dueDate = ref("");
const isUploadingImage = ref(false);

watch(() => [todoistTaskDetailState.title, todoistTaskDetailState.description, todoistTaskDetailState.dueDate], ([nextTitle, nextDescription, nextDate]) => { title.value = nextTitle; description.value = nextDescription; dueDate.value = nextDate; }, { immediate: true });
function save() { todoistTaskDetailController.save({ title: title.value.trim(), description: description.value, dueDate: dueDate.value }); }

function onDetailPaste(event: ClipboardEvent) {
  const items = event.clipboardData?.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf("image") !== -1) {
      event.preventDefault();
      const file = item.getAsFile();
      if (!file) continue;

      isUploadingImage.value = true;
      const timeStr = new Date().toLocaleTimeString("zh-CN", { hour12: false }).replace(/:/g, "");
      const fileName = `截图_${timeStr}.png`;
      void todoistService.uploadFile(file, fileName).then((res) => {
        isUploadingImage.value = false;
        const md = `\n\n![${fileName}](${res.file_url})\n`;
        description.value = (description.value || "") + md;
      }).catch((err) => {
        isUploadingImage.value = false;
        console.warn("[Todoist Detail] Upload image error:", err);
      });
    }
  }
}
</script>

<template>
  <Transition name="todoist-modal">
    <div v-if="todoistTaskDetailState.open" class="todoist-detail-overlay" role="dialog" aria-modal="true" aria-label="Todoist 任务详情" @keydown.esc.prevent="todoistTaskDetailController.close()">
      <div class="todoist-detail-backdrop" @click="todoistTaskDetailController.close()"></div>
      <section class="todoist-detail-panel" tabindex="-1">
        <header class="todoist-detail-head"><div class="todoist-detail-context">{{ todoistTaskDetailState.context }}</div><span class="grow"></span><a class="todoist-detail-link" target="_blank" rel="noreferrer" :href="todoistTaskDetailState.url">在 Todoist 中打开 ↗</a><button type="button" class="todoist-detail-close" aria-label="关闭任务详情" @click="todoistTaskDetailController.close()">×</button></header>
        <div class="todoist-detail-status" :class="{ error: todoistTaskDetailState.error }" aria-live="polite">{{ todoistTaskDetailState.status }}</div>
        <div class="todoist-detail-grid"><main class="todoist-detail-main">
          <label class="todoist-detail-label">任务标题<input v-model="title" class="todoist-detail-title" type="text" :disabled="todoistTaskDetailState.loading" /></label>
          <label class="todoist-detail-label">
            描述
            <span v-if="isUploadingImage" class="todoist-uploading-tag">图片上传中…</span>
            <textarea v-model="description" class="todoist-detail-description" rows="3" placeholder="添加描述（支持 Ctrl+V 粘贴图片）" :disabled="todoistTaskDetailState.loading" @paste="onDetailPaste"></textarea>
          </label>
          <button type="button" class="todoist-detail-save" :disabled="todoistTaskDetailState.loading || todoistTaskDetailState.saving || isUploadingImage" @click="save">{{ todoistTaskDetailState.saving ? '保存中…' : '保存更改' }}</button>
        </main><aside class="todoist-detail-rail"><section><h3>日期</h3><label class="todoist-detail-label todoist-date-field"><input v-model="dueDate" class="todoist-due-date" type="date" aria-label="选择日期" :disabled="todoistTaskDetailState.loading" /></label></section></aside></div>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
.todoist-uploading-tag {
  font-size: 11px;
  color: var(--accent, #db4035);
  margin-left: 8px;
  font-weight: normal;
}
.todoist-modal-enter-active,
.todoist-modal-leave-active {
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.todoist-modal-enter-active .todoist-detail-panel,
.todoist-modal-leave-active .todoist-detail-panel {
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.todoist-modal-enter-from,
.todoist-modal-leave-to {
  opacity: 0;
}
.todoist-modal-enter-from .todoist-detail-panel,
.todoist-modal-leave-to .todoist-detail-panel {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
</style>
