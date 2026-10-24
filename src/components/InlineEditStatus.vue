<script setup lang="ts">
defineProps<{ message: string; failed?: boolean }>();
</script>
<template>
  <span v-if="message" class="inline-edit-status" :class="{ failed }" role="status" aria-live="polite"
    @pointerdown.stop>{{ message }}</span>
</template>
<style scoped>
.inline-edit-status { display: block; color: var(--muted, var(--text)); font-size: 11px; line-height: 1.45; margin-top: 4px; white-space: normal; overflow-wrap: anywhere; }
.inline-edit-status.failed { color: var(--text); border-left: 2px solid var(--border-strong, var(--border)); padding-left: 6px; }
</style>
