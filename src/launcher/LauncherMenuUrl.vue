<script setup lang="ts">
import { InlineTitleInput, InlineEditStatus } from '../sdk/interactions';
defineProps<{ url: string; editing: boolean; draft: string; busy: boolean; revision: number; failed: boolean; message: string }>();
const emit = defineEmits<{ 'update:draft': [value: string]; start: []; commit: []; cancel: [] }>();
</script>
<template>
  <InlineTitleInput v-if="editing" :model-value="draft" :busy="busy" :revision="revision" :aria-invalid="failed || undefined"
    aria-label="网站网址" class="link-menu-title-input link-menu-note-input" placeholder="https://..."
    @update:model-value="emit('update:draft', $event)" @commit="emit('commit')" @cancel="emit('cancel')" />
  <div v-else class="link-menu-subtitle" :title="'点击直接修改网址: ' + url" @click.stop="emit('start')">
    <span class="link-menu-note-badge">🔗</span><span class="link-menu-subtext">{{ url || '未设置网址' }}</span>
    <span class="link-menu-title-edit-hint" aria-hidden="true">✎</span>
  </div>
  <InlineEditStatus :message="message" :failed="failed" />
</template>
