<script setup lang="ts">
import { InlineTitleInput, InlineEditStatus } from '../sdk/interactions';
withDefaults(defineProps<{ title: string; titleId?: string; editing: boolean; draft: string; busy: boolean; revision: number; failed: boolean; message: string; maxlength?: number; placeholder?: string }>(), { maxlength: 50, placeholder: '输入新标题' });
const emit = defineEmits<{ 'update:draft': [value: string]; start: []; commit: []; cancel: [] }>();
</script>
<template>
  <div class="link-menu-header">
    <InlineTitleInput v-if="editing" :model-value="draft" :busy="busy" :revision="revision" :aria-invalid="failed || undefined"
      class="link-menu-title-input" :maxlength="maxlength" :placeholder="placeholder"
      @update:model-value="emit('update:draft', $event)" @commit="emit('commit')" @cancel="emit('cancel')" />
    <div v-else class="link-menu-title-display" title="点击直接修改名称" @click.stop="emit('start')">
      <span :id="titleId" class="link-menu-title-text">{{ title }}</span><span class="link-menu-title-edit-hint" aria-hidden="true">✎</span>
    </div>
    <InlineEditStatus :message="message" :failed="failed" />
    <slot />
  </div>
</template>
