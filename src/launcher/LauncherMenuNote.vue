<script setup lang="ts">
import { InlineTitleInput, InlineEditStatus } from '../sdk/interactions';
defineProps<{ note: string; editing: boolean; draft: string; busy: boolean; revision: number; failed: boolean; message: string }>();
const emit = defineEmits<{ 'update:draft': [value: string]; start: []; commit: []; cancel: [] }>();
</script>
<template>
  <InlineTitleInput v-if="editing" :model-value="draft" :busy="busy" :revision="revision" :aria-invalid="failed || undefined"
    aria-label="网站备注" class="link-menu-title-input link-menu-note-input" placeholder="输入网站备注..."
    @update:model-value="emit('update:draft', $event)" @commit="emit('commit')" @cancel="emit('cancel')" />
  <div v-else class="link-menu-subtitle link-menu-note-row" :title="'点击修改备注: ' + (note || '无备注')" @click.stop="emit('start')">
    <span class="link-menu-note-badge">📝</span><span class="link-menu-subtext" :class="{ 'is-empty': !note }">{{ note || '添加网站备注...' }}</span>
    <span class="link-menu-title-edit-hint" aria-hidden="true">✎</span>
  </div>
  <InlineEditStatus :message="message" :failed="failed" />
</template>
