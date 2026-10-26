<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import {
  aihotViewerState,
  aihotViewerController
} from "./store";

const articleRef = ref<HTMLDivElement | null>(null);
const dialogRef = ref<HTMLDialogElement | null>(null);

watch(
  () => aihotViewerState.open,
  () => {
    void nextTick(() => {
      const isOpen = aihotViewerState.open;
      const dialog = dialogRef.value;
      if (!dialog) return;
      if (isOpen) {
        if (!dialog.open) {
          try {
            dialog.showModal();
          } catch {
            dialog.setAttribute("open", "");
          }
        }
        const win = window as any;
        if (win.LogicWeaverWindowTabs?.activate) {
          win.LogicWeaverWindowTabs.activate("aihot-viewer");
        }
      } else {
        if (dialog.open) {
          try {
            dialog.close();
          } catch {
            dialog.removeAttribute("open");
          }
        }
      }
    });
  },
  { immediate: true }
);

watch(
  () => [aihotViewerState.content, aihotViewerState.open],
  () => {
    void nextTick(() => {
      if (!articleRef.value) return;
      articleRef.value.replaceChildren();
      const raw = aihotViewerState.content;
      if (raw) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(raw, "text/html");
          while (doc.body.firstChild) {
            articleRef.value.appendChild(doc.body.firstChild);
          }
        } catch {
          articleRef.value.textContent = raw;
        }
      }
    });
  },
  { immediate: true }
);

function handleClose() {
  aihotViewerController.close();
}

function handleOverlayClick(e: MouseEvent) {
  if (e.target === dialogRef.value) {
    handleClose();
  }
}

async function handleCopy() {
  const articleText = articleRef.value?.innerText || "";
  const title = aihotViewerState.title;
  const sourceName = aihotViewerState.sourceName;
  const published = aihotViewerState.published;
  const sum = aihotViewerState.summary;
  const reason = aihotViewerState.reason;
  const url = aihotViewerState.url;

  const copyText = `${title}\n\n来源：${sourceName} (${published})\n${sum ? `\n【AI 导读】\n${sum}\n` : ""}${reason ? `\n【推荐理由】\n${reason}\n` : ""}\n【正文】\n${articleText.trim()}\n\n原文：${url}`;
  try {
    await navigator.clipboard.writeText(copyText);
    aihotViewerState.copied = true;
    setTimeout(() => { aihotViewerState.copied = false; }, 2000);
  } catch {
    aihotViewerState.copied = false;
  }
}
</script>

<template>
  <dialog
    id="aihot-viewer"
    ref="dialogRef"
    class="aihot-viewer"
    @click="handleOverlayClick"
    @close="handleClose"
    @cancel="handleClose"
  >
    <header class="aihot-viewer-head">
      <div class="aihot-viewer-brand">
        <span class="aihot-viewer-badge">{{ aihotViewerState.isAiHot ? "AI HOT" : (aihotViewerState.platformBadge || "资讯") }}</span>
        <span id="aihot-viewer-header-source" class="aihot-viewer-source">{{ aihotViewerState.sourceName }}</span>
      </div>
      <span class="grow"></span>
      <div class="aihot-viewer-actions">
        <button
          id="aihot-viewer-copy"
          class="aihot-viewer-action"
          :class="{ 'is-copied': aihotViewerState.copied }"
          type="button"
          title="复制文章内容"
          @click="handleCopy"
        >
          <svg v-if="aihotViewerState.copied" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
          </svg>
          <span aria-live="polite">{{ aihotViewerState.copied ? "已复制" : "复制" }}</span>
        </button>
        <a
          id="aihot-viewer-open"
          class="aihot-viewer-action"
          :href="aihotViewerState.url"
          target="_blank"
          rel="noreferrer"
          title="在浏览器新标签页打开原文"
        >
          <span>原文</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 4h6v6m0-6L10 14M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
          </svg>
        </a>
      </div>
      <button
        id="aihot-viewer-close"
        class="aihot-viewer-close"
        type="button"
        title="关闭 (Esc / Alt+W / Q)"
        @click="handleClose"
      >
        ✕
      </button>
    </header>

    <div id="aihot-viewer-body" class="aihot-viewer-body">
      <h1 class="aihot-detail-title">{{ aihotViewerState.title }}</h1>
      <div class="aihot-detail-meta">
        <span class="aihot-detail-meta-item">📰 {{ aihotViewerState.sourceName }}</span>
        <span v-if="aihotViewerState.published" class="aihot-detail-meta-item">🕒 <time>{{ aihotViewerState.published }}</time></span>
        <span v-if="aihotViewerState.score" class="aihot-score-tag">★ AI 评分 {{ aihotViewerState.score }}</span>
      </div>

      <div v-if="aihotViewerState.isAiHot && aihotViewerState.summary" class="aihot-detail-card aihot-detail-summary">
        <div class="aihot-card-label">💡 AI 导读</div>
        <p class="aihot-card-text">{{ aihotViewerState.summary }}</p>
      </div>

      <div v-if="aihotViewerState.isAiHot && aihotViewerState.reason" class="aihot-detail-card aihot-detail-reason">
        <div class="aihot-card-label">🎯 推荐理由</div>
        <p class="aihot-card-text">{{ aihotViewerState.reason }}</p>
      </div>

      <div id="aihot-detail-article" class="aihot-article-container">
        <div v-if="aihotViewerState.loading" class="aihot-loading-wrap">
          <div class="aihot-spinner"></div>
          <span>正在加载文章正文…</span>
        </div>
        <div ref="articleRef" class="aihot-article-content" v-show="!aihotViewerState.loading"></div>
      </div>
    </div>
  </dialog>
</template>
