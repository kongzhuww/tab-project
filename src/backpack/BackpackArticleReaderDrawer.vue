<script setup lang="ts">
import MessageMarkdown from "../multica/MessageMarkdown.vue";
import type { SavedArticleItem } from "./types";
import { formatBackpackShortDate } from "./backpack-helpers";

defineProps<{
  visible: boolean;
  embedded: boolean;
  article: SavedArticleItem | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "copy", article: SavedArticleItem): void;
}>();
</script>

<template>
  <transition name="drawer-slide">
    <aside v-if="visible" class="bp-side-drawer bp-reader-drawer" :class="{ 'bp-integrated': embedded }">
      <header class="bp-drawer-header">
        <div class="bp-reader-head-info">
          <span class="bp-badge-pill">{{ embedded ? "阅读模式" : "📖 阅读器" }}</span>
          <span v-if="article?.sourceName" class="bp-reader-source">{{ article.sourceName }}</span>
        </div>
        <button type="button" class="bp-btn-icon" title="关闭阅读器" @click="emit('close')">✕</button>
      </header>
      <div class="bp-drawer-body bp-reader-body">
        <h2 class="bp-reader-title">{{ article?.title }}</h2>
        <div class="bp-reader-meta">
          <span v-if="article?.sourceName">{{ embedded ? article.sourceName : `📰 ${article.sourceName}` }}</span>
          <span v-if="article?.updatedAt">{{ embedded ? formatBackpackShortDate(article.updatedAt) : `🕒 ${formatBackpackShortDate(article.updatedAt)}` }}</span>
          <a v-if="article?.url" :href="article.url" target="_blank" rel="noreferrer" class="bp-reader-link">
            原文链接 ↗
          </a>
        </div>
        <blockquote v-if="article?.description" class="bp-reader-quote">
          {{ embedded ? article.description : `💡 ${article.description}` }}
        </blockquote>
        <div class="bp-reader-text">
          <MessageMarkdown :content="article?.content || ''" />
        </div>
      </div>
      <footer class="bp-drawer-footer">
        <button type="button" class="bp-btn bp-btn-ghost" @click="emit('close')">关闭</button>
        <button type="button" class="bp-btn bp-btn-primary bp-btn-indigo" @click="article && emit('copy', article)">
          一键复制全文
        </button>
      </footer>
    </aside>
  </transition>
</template>

<style scoped>
.bp-side-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 390px;
  max-width: 92%;
  background: var(--panel-solid, #ffffff);
  border-left: 1px solid var(--border, #e2e8f0);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  z-index: 20;
}
.bp-reader-drawer {
  width: min(580px, calc(100% - 24px));
  max-width: 660px;
}
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
  opacity: 0.8;
}
.bp-drawer-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bp-btn-icon {
  background: none;
  border: none;
  font-size: 13px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.bp-btn-icon:hover { background: var(--surface, #f1f5f9); color: var(--heading, #0f172a); }
.bp-drawer-body {
  padding: 14px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.bp-drawer-footer {
  padding: 10px 16px;
  border-top: 1px solid var(--border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: var(--surface, #f8fafc);
}
.bp-btn {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s;
}
.bp-btn-ghost {
  background: transparent;
  border-color: var(--border, #e2e8f0);
  color: var(--text, #334155);
}
.bp-btn-ghost:hover { background: var(--surface, #f1f5f9); }
.bp-btn-primary {
  background: var(--accent, #3b82f6);
  color: #ffffff;
}
.bp-btn-indigo {
  background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
  color: #fff;
}
.bp-reader-head-info { display: flex; align-items: center; gap: 8px; }
.bp-badge-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}
.bp-reader-source { font-size: 11px; color: var(--muted, #64748b); }
.bp-reader-title { margin: 0; font-size: 16px; font-weight: 700; color: var(--heading, #0f172a); line-height: 1.4; }
.bp-reader-meta { display: flex; align-items: center; gap: 10px; font-size: 11px; color: var(--muted, #64748b); }
.bp-reader-link { color: #6366f1; text-decoration: none; }
.bp-reader-link:hover { text-decoration: underline; }
.bp-reader-quote {
  margin: 0;
  padding: 8px 12px;
  border-left: 3px solid #6366f1;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text, #334155);
}
.bp-reader-text {
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text, #334155);
  word-break: break-word;
  user-select: text;
}
.bp-reader-text :deep(.message-markdown) { font-size: 13.5px; line-height: 1.75; }
.bp-reader-text :deep(.message-markdown h1) { font-size: 17px; font-weight: 700; margin: 14px 0 8px; padding-bottom: 5px; border-bottom: 1px solid var(--border, #e2e8f0); }
.bp-reader-text :deep(.message-markdown h2) { font-size: 15.5px; font-weight: 700; margin: 16px 0 8px; color: var(--heading, #0f172a); }
.bp-reader-text :deep(.message-markdown h3) { font-size: 14px; font-weight: 650; margin: 13px 0 6px; color: var(--heading, #0f172a); }
.bp-reader-text :deep(.message-markdown ul ul),
.bp-reader-text :deep(.message-markdown ol ul) { margin: 4px 0; }
.bp-reader-text :deep(.message-markdown th) { background: rgba(148, 163, 184, 0.1); font-weight: 600; font-size: 12.5px; }
.bp-reader-text :deep(.message-markdown td) { font-size: 12.5px; }
.bp-reader-text :deep(.message-markdown math) {
  font-family: "Latin Modern Math", "Cambria Math", "STIX Two Math", "Noto Sans Math", serif;
  font-size: 1.05em;
}
.bp-reader-text :deep(.message-markdown .obs-math-block) {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  margin: 12px 0;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--surface, rgba(148, 163, 184, 0.08));
  border: 1px solid var(--border, #e2e8f0);
}

.bp-side-drawer.bp-integrated {
  background: color-mix(in srgb, var(--panel, #ffffff) 96%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid var(--border, #e5e8ef);
  box-shadow: -16px 0 40px rgba(15, 23, 42, 0.16);
}
.bp-side-drawer.bp-integrated.bp-reader-drawer {
  width: min(560px, calc(100% - 24px));
  max-width: 640px;
}
.bp-side-drawer.bp-integrated .bp-drawer-header {
  padding: 15px 18px;
  background: color-mix(in srgb, #6366f1 3%, var(--panel, #ffffff));
}
.bp-side-drawer.bp-integrated .bp-drawer-body { padding: 16px 18px; gap: 14px; }
.bp-side-drawer.bp-integrated .bp-drawer-footer {
  padding: 12px 18px;
  background: color-mix(in srgb, var(--surface, #f7f8fb) 65%, transparent);
}
.bp-side-drawer.bp-integrated .bp-drawer-footer .bp-btn {
  height: 32px;
  padding: 0 15px;
  border-radius: 999px;
}
.bp-side-drawer.bp-integrated .bp-drawer-footer .bp-btn-ghost {
  background: var(--panel, #ffffff);
  border-color: var(--border, #dce2ec);
}
.bp-side-drawer.bp-integrated .bp-drawer-footer .bp-btn-primary,
.bp-side-drawer.bp-integrated .bp-drawer-footer .bp-btn-indigo {
  background: linear-gradient(135deg, #6366f1, #4f6ef7) !important;
  border-color: transparent !important;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.26);
}
.bp-side-drawer.bp-integrated .bp-badge-pill {
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
}
.bp-side-drawer.bp-integrated .bp-reader-quote {
  border-left-color: #6366f1;
  background: rgba(99, 102, 241, 0.06);
  border-radius: 8px;
  padding: 10px 14px;
}
.bp-side-drawer.bp-integrated .bp-reader-link { color: #4f6ef7; }
</style>
