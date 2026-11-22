<template>
  <span class="bili-rich-text">
    <template v-for="(tok, idx) in tokens" :key="idx">
      <a
        v-if="tok.type === 'link' || tok.type === 'mention'"
        class="bili-rich-link"
        :class="{ 'bili-rich-mention': tok.type === 'mention' }"
        :href="tok.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="tok.type === 'mention' ? `前往 ${tok.text} 的B站主页` : tok.url"
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
import { computed, onMounted, onUnmounted, ref } from "vue";
import { onGlobalBiliEmotesLoaded, parseBiliRichText } from "./rich-text";

const props = defineProps<{
  text?: string;
  emotes?: Record<string, string> | Map<string, string>;
  mentions?: Record<string, string | number> | Map<string, string | number>;
}>();

const emoteRevision = ref(0);
let stopListening: (() => void) | null = null;

onMounted(() => {
  stopListening = onGlobalBiliEmotesLoaded(() => {
    emoteRevision.value += 1;
  });
});

onUnmounted(() => {
  stopListening?.();
  stopListening = null;
});

const tokens = computed(() => {
  void emoteRevision.value;
  return parseBiliRichText(props.text || "", props.emotes, props.mentions);
});
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

.bili-rich-link.bili-rich-mention {
  text-decoration: none;
  font-weight: 500;
}

.bili-rich-link.bili-rich-mention:hover {
  text-decoration: underline;
}

.bili-rich-link:hover {
  opacity: 0.8;
}

.bili-comment-emote {
  display: inline-block;
  vertical-align: middle;
  width: auto;
  min-width: 18px;
  height: 24px;
  max-width: 64px;
  object-fit: contain;
  margin: 0 2px;
}
</style>
