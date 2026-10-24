<template>
  <span class="bili-rich-text">
    <template v-for="(tok, idx) in tokens" :key="idx">
      <a
        v-if="tok.type === 'link'"
        class="bili-rich-link"
        :href="tok.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="tok.url"
        @click.stop
      >{{ tok.text }}</a>
      <img
        v-else-if="tok.type === 'emote' && tok.url"
        class="bili-comment-emote"
        :src="tok.url"
        :alt="tok.text"
        :title="tok.text"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
      <span v-else>{{ tok.text }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseBiliRichText } from "./rich-text";

const props = defineProps<{
  text?: string;
  emotes?: Record<string, string> | Map<string, string>;
}>();

const tokens = computed(() => parseBiliRichText(props.text || "", props.emotes));
</script>

<style scoped>
.bili-rich-text {
  display: inline;
  word-break: break-word;
  white-space: pre-wrap;
}

.bili-rich-link {
  color: var(--primary, #00aeec);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.bili-rich-link:hover {
  opacity: 0.8;
}

.bili-comment-emote {
  display: inline-block;
  vertical-align: text-bottom;
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin: 0 1px;
}
</style>
