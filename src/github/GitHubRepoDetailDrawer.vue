<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import {
  githubRepoDetailState as state,
  githubRepoDetailController as controller,
  formatTimeAgo,
  type RepoHeadingItem
} from "./repo-detail-store";
import { images } from "../sdk/images";
import GitHubRepositoryTasks from "./GitHubRepositoryTasks.vue";
import { githubTaskCreation } from "../todoist/github-task-target";
import { openTodoistTask } from "../todoist/task-navigation";

const copyStatus = ref<string>("");
const isTocOpen = ref<boolean>(false);
const taskPaneOpen = ref(false);
watch(() => state.fullName, () => { taskPaneOpen.value = false; });
watch(taskPaneOpen, async () => {
  await nextTick();
  if (!pos.value || !windowRef.value) return;
  const width = windowRef.value.getBoundingClientRect().width;
  pos.value = { ...pos.value, x: Math.max(10, Math.min(pos.value.x, window.innerWidth - width - 10)) };
});
const readmeContainerRef = ref<HTMLElement | null>(null);
const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);

const pageVisible = ref(!document.hidden);
let pagePresent = true;
let uiVersion = 0, copyVersion = 0;
let copyTimer: ReturnType<typeof setTimeout> | undefined;
let stopDrag = () => {};
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

function onHeaderMouseDown(e: MouseEvent) {
  if ((e.target as HTMLElement).closest("button, a, input")) return;
  stopDrag();
  const win = windowRef.value;
  if (!win || !state.isOpen || !pageVisible.value) return;
  isDragging = true;
  const rect = win.getBoundingClientRect();
  startPosX = rect.left;
  startPosY = rect.top;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
  pos.value = { x: startPosX, y: startPosY };

  const onMouseMove = (ev: MouseEvent) => {
    if (!isDragging) return;
    const dx = ev.clientX - startMouseX;
    const dy = ev.clientY - startMouseY;
    pos.value = {
      x: Math.max(10, Math.min(window.innerWidth - 100, startPosX + dx)),
      y: Math.max(10, Math.min(window.innerHeight - 80, startPosY + dy))
    };
  };

  const onMouseUp = () => {
    isDragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  stopDrag = onMouseUp;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function handleClose() {
  controller.close();
}
function openCreatedTask(taskId: string) {
  if (githubTaskCreation.saving) return;
  controller.close();
  openTodoistTask(taskId);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    handleClose();
  }
}

async function copyText(text: string, label: string) {
  if (!state.isOpen || !pageVisible.value) return;
  const version = uiVersion, copy = ++copyVersion;
  const current = () => state.isOpen && pageVisible.value && uiVersion === version && copy === copyVersion;
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(text);
    if (current()) copyStatus.value = `已复制 ${label}`;
  } catch {
    if (current()) copyStatus.value = "复制未确认";
  }
  if (current()) copyTimer = setTimeout(() => { if (current()) copyStatus.value = ""; }, 2000);
}

function handleArticleClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  const img = target?.closest("img") as HTMLImageElement | null;
  if (img && img.src) {
    e.preventDefault();
    e.stopPropagation();
    images.open({ source: img.src, title: img.alt || "图片预览" });
    return;
  }
  const link = target?.closest("a") as HTMLAnchorElement | null;
  if (link) {
    const rawHref = link.getAttribute("href") || "";
    // 1. 内部页面锚点 (#heading)
    if (rawHref.startsWith("#")) {
      return;
    }

    // 2. 检查是否为指向项目内部其他文档/语言切换的相对链接 (例如 README_zh.md, README.zh-CN.md, README.md 等)
    const isDocSwitch = /^(?:\.?\/)?(README[._a-zA-Z0-9-]*\.md)$/i.exec(rawHref);
    if (isDocSwitch) {
      e.preventDefault();
      e.stopPropagation();
      void controller.switchReadme(isDocSwitch[1]);
      return;
    }

    // 3. 检查是否是 GitHub 完整链接指向该项目的 README 文档
    const full = state.fullName.toLowerCase();
    const blobMatch = new RegExp(`^https?:\\/\\/github\\.com\\/${full}\\/blob\\/[^/]+\\/(README[._a-zA-Z0-9-]*\\.md)$`, "i").exec(rawHref);
    if (blobMatch) {
      e.preventDefault();
      e.stopPropagation();
      void controller.switchReadme(blobMatch[1]);
      return;
    }

    // 4. 普通超链接：在浏览器新标签页安全打开 (过滤掉可能导致本地 404 的 chrome-extension:// 链接)
    if (link.href && !link.href.startsWith("chrome-extension://")) {
      e.preventDefault();
      e.stopPropagation();
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
  }
}

function toggleLanguage() {
  void controller.switchReadme();
}

function scrollToHeading(heading: RepoHeadingItem) {
  if (!readmeContainerRef.value) return;
  const headings = readmeContainerRef.value.querySelectorAll("h1, h2, h3");
  for (const h of Array.from(headings)) {
    if (h.textContent?.trim().includes(heading.text)) {
      h.scrollIntoView({ behavior: "smooth", block: "start" });
      isTocOpen.value = false;
      break;
    }
  }
}

watch(
  () => [state.readmeHtml, state.isOpen, pageVisible.value, state.revision] as const,
  async ([html, open, visible], _old, onCleanup) => {
    let cancelled = false, frame = 0;
    onCleanup(() => { cancelled = true; cancelAnimationFrame(frame); });
    if (!html || !open || !visible) return;
    await nextTick();
    if (cancelled) return;
    frame = requestAnimationFrame(() => {
      if (cancelled || !state.isOpen || !pageVisible.value) return;
      // Existing rendered-Markdown code controls; lifetime belongs to this DOM.
      readmeContainerRef.value?.querySelectorAll("pre").forEach(pre => {
        if (pre.querySelector(".gh-code-copy-btn")) return;
        const btn = document.createElement("button");
        btn.type = "button"; btn.className = "gh-code-copy-btn";
        btn.title = "复制代码"; btn.innerText = "复制";
        btn.addEventListener("click", event => {
          event.stopPropagation();
          void copyText(pre.querySelector("code")?.innerText || "", "代码");
        });
        pre.style.position = "relative"; pre.appendChild(btn);
      });
    });
  }
);

function clearUiWork() {
  ++uiVersion; ++copyVersion;
  clearTimeout(copyTimer);
  copyStatus.value = ""; isTocOpen.value = false;
  stopDrag();
}
watch(() => [state.revision, state.isOpen, pageVisible.value], () => {
  clearUiWork();
  window.removeEventListener("keydown", handleKeydown);
  if (state.isOpen && pageVisible.value) window.addEventListener("keydown", handleKeydown);
}, { immediate: true, flush: "sync" });

function visibility() {
  pageVisible.value = pagePresent && !document.hidden;
  controller.setPageActive(pageVisible.value);
}
function pageHide() { pagePresent = false; visibility(); }
function pageShow() { pagePresent = true; visibility(); }
onMounted(() => {
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("pagehide", pageHide);
  window.addEventListener("pageshow", pageShow);
  visibility();
});
onUnmounted(() => {
  clearUiWork(); controller.setPageActive(false);
  window.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("visibilitychange", visibility);
  window.removeEventListener("pagehide", pageHide);
  window.removeEventListener("pageshow", pageShow);
});
</script>

<template>
  <div
    v-if="state.isOpen"
    class="gh-modal-overlay"
  >
    <!-- 桌面工具同款非模态视窗：无暗黑模糊遮罩、背景清清楚楚、彻底消除掉帧卡顿、支持自由拖拽 -->
    <div
      ref="windowRef"
      class="gh-modal-window"
      :class="{ 'has-task-pane': taskPaneOpen }"
      :style="pos ? { position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0' } : {}"
      role="dialog"
      aria-modal="false"
      :aria-label="state.fullName"
    >
      <!-- 1. 视窗顶部 Header 标题栏（支持拖拽） -->
      <header class="gh-modal-header" @mousedown="onHeaderMouseDown">
        <div class="gh-modal-title-wrap">
          <span class="gh-modal-octo-icon">🐙</span>
          <a
            :href="state.htmlUrl"
            target="_blank"
            rel="noreferrer"
            class="gh-modal-repo-name"
            title="在 GitHub 新标签页打开"
          >
            <span class="gh-owner">{{ state.owner }}</span>
            <span class="gh-sep">/</span>
            <strong class="gh-name">{{ state.repo }}</strong>
            <span class="gh-external-arrow">↗</span>
          </a>
        </div>

        <!-- 操作按钮工具栏 -->
        <div class="gh-modal-actions">
          <span v-if="copyStatus" class="gh-status-tip">{{ copyStatus }}</span>
          <button type="button" class="gh-btn gh-btn-action" :aria-expanded="taskPaneOpen"
            :disabled="githubTaskCreation.saving" @click="taskPaneOpen = !taskPaneOpen">任务</button>

          <button
            type="button"
            class="gh-btn gh-btn-close"
            :disabled="githubTaskCreation.saving"
            title="关闭视窗 (Esc)"
            @click="handleClose"
          >
            ✕
          </button>
        </div>
      </header>

      <div class="gh-modal-content">
      <div class="gh-repository-content">
      <!-- 2. 项目核心元信息条 (Repo Meta Ribbon) -->
      <div class="gh-modal-ribbon">
        <div class="gh-meta-badges">
          <!-- 中文/英文一键切换按钮 (可点击原地互切) -->
          <button
            type="button"
            class="gh-meta-item gh-meta-zh-btn"
            :class="{ 'is-zh': state.isZh }"
            :title="state.isZh ? '当前为中文文档 · 点击切换为英文原版' : '当前为英文文档 · 点击切换为中文文档'"
            @click="toggleLanguage"
          >
            {{ state.isZh ? '🇨🇳 中文版' : '🌐 English' }}
            <span class="zh-toggle-arrow">⇄</span>
          </button>
          <span class="gh-meta-item gh-meta-stars" title="Stars 关注数">
            ★ <strong>{{ state.stars.toLocaleString() }}</strong>
          </span>
          <span class="gh-meta-item gh-meta-forks" title="Forks 派生数">
            ⌥ <strong>{{ state.forks.toLocaleString() }}</strong>
          </span>
          <span v-if="state.language" class="gh-meta-item gh-meta-lang" title="主要编程语言">
            💻 {{ state.language }}
          </span>
          <span v-if="state.license" class="gh-meta-item gh-meta-license" title="开源许可证协议">
            📄 {{ state.license }}
          </span>
          <span v-if="state.pushedAt" class="gh-meta-item gh-meta-updated" title="最后代码提交时间">
            ⏱ {{ formatTimeAgo(state.pushedAt) }}
          </span>
        </div>

        <p v-if="state.description" class="gh-modal-desc">
          {{ state.description }}
        </p>

        <!-- Topics 标签列表 -->
        <div v-if="state.topics.length" class="gh-modal-topics">
          <span v-for="t in state.topics" :key="t" class="gh-topic-tag">
            #{{ t }}
          </span>
        </div>
      </div>

      <!-- 3. 主体内容区域：目录导航与 README 渲染 -->
      <main class="gh-modal-body">
        <p v-if="state.notice" class="gh-status-tip">{{ state.notice }}</p>
        <!-- 悬浮/顶部目录导航 (TOC) -->
        <aside v-if="state.headings.length > 0" class="gh-modal-toc" :class="{ 'is-open': isTocOpen }">
          <div class="gh-toc-header" @click="isTocOpen = !isTocOpen">
            <span class="gh-toc-icon">📑</span>
            <span class="gh-toc-title">目录大纲 ({{ state.headings.length }})</span>
            <span class="gh-toc-arrow">{{ isTocOpen ? "▲" : "▼" }}</span>
          </div>
          <ul v-show="isTocOpen" class="gh-toc-list">
            <li
              v-for="(h, idx) in state.headings"
              :key="idx"
              class="gh-toc-item"
              :class="`level-${h.level}`"
              @click="scrollToHeading(h)"
            >
              <span class="gh-toc-bullet">·</span>
              <span class="gh-toc-text">{{ h.text }}</span>
            </li>
          </ul>
        </aside>

        <!-- 加载中指示器 -->
        <div v-if="state.isLoading" class="gh-readme-loading">
          <div class="gh-spinner"></div>
          <span>正在获取并排版 {{ state.fullName }} 的 README.md …</span>
        </div>

        <!-- 错误提示 -->
        <div v-else-if="state.error" class="gh-readme-error">
          <span class="gh-error-icon">⚠️</span>
          <p>{{ state.error }}</p>
          <a :href="state.htmlUrl" target="_blank" rel="noreferrer" class="gh-btn gh-btn-action">
            直接前往 GitHub 网页查看 ↗
          </a>
        </div>

        <p v-else-if="state.hasReadme && !state.readmeMarkdown" class="gh-readme-loading">README 内容为空。</p>

        <!-- 正文渲染 -->
        <article
          v-else
          ref="readmeContainerRef"
          class="gh-readme-rendered obsidian-markdown-rendered allow-copy"
          v-html="state.readmeHtml"
          @click="handleArticleClick"
        ></article>
      </main>
      </div>
      <GitHubRepositoryTasks v-if="taskPaneOpen" :key="state.fullName"
        :repository="{ fullName: state.fullName, description: state.description, stars: state.stars, language: state.language, updated: state.pushedAt }"
        @close="taskPaneOpen = false" @open-task="openCreatedTask" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局无衬线系统字体栈 */
.gh-modal-overlay,
.gh-modal-window {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif !important;
}

:deep(.gh-readme-rendered img),
:deep(.obsidian-markdown-rendered img) {
  cursor: zoom-in;
  transition: opacity 0.15s ease;
}
:deep(.gh-readme-rendered img:hover),
:deep(.obsidian-markdown-rendered img:hover) {
  opacity: 0.92;
}

/* 全屏浮层容器：完全透明且鼠标穿透，彻底移除 backdrop-filter 消除卡顿罪魁祸首，使视窗旁边一清二楚 */
.gh-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

/* 桌面工具风格独立视窗卡片：像其他桌面工具一样小巧利落，支持拖动，不遮挡背景内容 */
.gh-modal-window {
  pointer-events: auto;
  width: min(780px, 94vw);
  height: min(780px, 90vh);
  background: var(--panel);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.38), 0 0 0 1px var(--border, rgba(255, 255, 255, 0.08));
  display: flex;
  flex-direction: column;
  color: var(--text);
  overflow: hidden;
  contain: paint;
}

.gh-modal-window.has-task-pane { width: min(1100px, 96vw); }
.gh-modal-content { display: flex; flex: 1; min-height: 0; min-width: 0; }
.gh-repository-content { display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0; }
@media (max-width: 620px) {
  .gh-modal-window.has-task-pane .gh-repository-content { display: none; }
  .gh-modal-window.has-task-pane :deep(.github-repository-tasks) { width: 100%; border-left: 0; }
}

/* 顶部 Header 标题栏 */
.gh-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--panel);
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  gap: 8px;
  flex-shrink: 0;
  cursor: grab;
  user-select: none;
}

.gh-modal-header:active {
  cursor: grabbing;
}

.gh-modal-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.gh-modal-octo-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.gh-modal-repo-name {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--heading);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.15s;
}

.gh-modal-repo-name:hover {
  color: #38bdf8;
}

.gh-owner {
  opacity: 0.75;
}

.gh-sep {
  opacity: 0.4;
  margin: 0 1px;
}

.gh-name {
  font-weight: 700;
  color: #38bdf8;
}

.gh-external-arrow {
  font-size: 11px;
  opacity: 0.6;
}

/* 工具栏按钮 */
.gh-modal-actions {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.gh-status-tip {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.gh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 26px;
  padding: 0 8px;
  border-radius: 5px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: var(--surface);
  color: var(--text);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.gh-btn:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.1));
  color: var(--heading);
  border-color: rgba(255, 255, 255, 0.25);
}

.gh-btn-close {
  width: 26px;
  padding: 0;
  font-size: 12px;
  opacity: 0.8;
}

.gh-btn-close:hover {
  opacity: 1;
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.5);
  color: #f87171;
}

/* 元信息 Ribbon */
.gh-modal-ribbon {
  padding: 10px 14px;
  background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%);
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
}

.gh-meta-badges {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11px;
}

.gh-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--panel);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  color: var(--dim);
}

.gh-meta-stars {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.08);
}

.gh-meta-zh {
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.15);
  font-weight: 600;
}

.gh-meta-forks {
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(56, 189, 248, 0.08);
}

.gh-modal-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text);
  opacity: 0.95;
}

.gh-modal-topics {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.gh-topic-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.25);
}

/* 主体与 TOC */
.gh-modal-body {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 目录 TOC */
.gh-modal-toc {
  background: var(--panel);
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.gh-toc-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--dim);
  user-select: none;
}

.gh-toc-header:hover {
  color: #38bdf8;
  background: rgba(255, 255, 255, 0.03);
}

.gh-toc-title {
  flex: 1;
}

.gh-toc-arrow {
  font-size: 9px;
  opacity: 0.6;
}

.gh-toc-list {
  list-style: none;
  margin: 0;
  padding: 4px 12px 8px;
  max-height: 150px;
  overflow-y: auto;
  border-top: 1px dashed var(--border, rgba(255, 255, 255, 0.06));
}

.gh-toc-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 11.5px;
  cursor: pointer;
  color: var(--text);
  transition: background 0.12s, color 0.12s;
}

.gh-toc-item:hover {
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
}

.gh-toc-item.level-2 {
  padding-left: 16px;
  font-size: 11px;
  opacity: 0.85;
}

.gh-toc-item.level-3 {
  padding-left: 28px;
  font-size: 10.5px;
  opacity: 0.7;
}

/* README 渲染区域 */
.gh-readme-rendered {
  flex: 1 1 auto;
  overflow-y: auto !important;
  padding: 16px 20px 80px;
  box-sizing: border-box;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--text);
  word-break: break-word;
  user-select: text !important;
  -webkit-user-select: text !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif !important;
}

.gh-readme-loading,
.gh-readme-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 16px;
  gap: 12px;
  color: var(--dim);
  font-size: 13px;
}

.gh-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(56, 189, 248, 0.2);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.gh-error-icon {
  font-size: 32px;
}

/* 🌟 排版精修：杜绝图片过大与错乱 */
.gh-readme-rendered :deep(h1),
.gh-readme-rendered :deep(h2),
.gh-readme-rendered :deep(h3),
.gh-readme-rendered :deep(h4) {
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  padding-bottom: 4px;
  margin-top: 18px;
  margin-bottom: 10px;
  color: var(--heading);
  font-weight: 650;
  line-height: 1.35;
}

.gh-readme-rendered :deep(h1) { font-size: 21px; font-weight: 700; margin-top: 20px; margin-bottom: 12px; }
.gh-readme-rendered :deep(h2) { font-size: 17px; font-weight: 650; margin-top: 18px; margin-bottom: 10px; }
.gh-readme-rendered :deep(h3) { font-size: 14.5px; font-weight: 600; margin-top: 14px; margin-bottom: 8px; }

.gh-readme-rendered :deep(p) {
  margin: 12px 0;
  line-height: 1.65;
}

.gh-readme-rendered :deep(p[align="center"]) {
  text-align: center;
}

.gh-readme-rendered :deep(a) {
  color: var(--accent, #0969da);
  text-decoration: underline;
  text-underline-offset: 2.5px;
  white-space: nowrap;
}

.gh-readme-rendered :deep(blockquote) {
  border-left: 3.5px solid var(--accent, #0969da);
  padding: 6px 14px;
  background: var(--surface);
  border-radius: 0 6px 6px 0;
  margin: 14px 0;
  color: var(--text);
}

/* 🌟 H1 标题右侧的内联 App 图标 */
.gh-readme-rendered :deep(.gh-inline-header-logo) {
  display: inline-block !important;
  width: 32px !important;
  height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
  object-fit: contain !important;
  vertical-align: -5px !important;
  margin: 0 0 0 8px !important;
  border-radius: 7px !important;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15)) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18) !important;
}

.gh-meta-zh-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #ffffff);
  color: #0284c7;
  font-weight: 600;
  padding: 2px 7px;
  font-size: 11px;
  transition: all 0.15s ease;
  user-select: none;
}

.gh-meta-zh-btn:hover {
  background: rgba(2, 132, 199, 0.08);
  border-color: #0284c7;
}

.gh-meta-zh-btn.is-zh {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border-color: rgba(16, 185, 129, 0.3);
}

.gh-meta-zh-btn.is-zh:hover {
  background: rgba(16, 185, 129, 0.18);
  border-color: #059669;
}

.zh-toggle-arrow {
  font-size: 10px;
  opacity: 0.6;
}

/* 限制 README 内部大图尺寸，避免撑破视口 */
.gh-readme-rendered :deep(img):not(.gh-inline-header-logo) {
  max-width: 100% !important;
  max-height: 240px !important;
  object-fit: contain !important;
  border-radius: 6px;
  margin: 8px auto;
  display: block;
}

/* GitHub 官方预渲染 HTML 特征元素适配 */
.gh-readme-rendered :deep(.markdown-body) {
  font-family: inherit;
  color: inherit;
}

.gh-readme-rendered :deep(details) {
  margin: 12px 0;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  padding: 10px 14px;
  background: var(--surface);
}

.gh-readme-rendered :deep(summary) {
  cursor: pointer;
  font-weight: 600;
  color: var(--heading);
  outline: none;
}

.gh-readme-rendered :deep(summary:hover) {
  color: #0284c7;
}

.gh-readme-rendered :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0;
  font-size: 13px;
  display: table;
  overflow-x: auto;
}

.gh-readme-rendered :deep(th),
.gh-readme-rendered :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  text-align: left;
}

.gh-readme-rendered :deep(th) {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  font-weight: 650;
  color: var(--heading);
}

.gh-readme-rendered :deep(ul.contains-task-list) {
  list-style: none !important;
  padding-left: 0 !important;
}

.gh-readme-rendered :deep(li.task-list-item) {
  list-style: none !important;
  display: flex !important;
  align-items: baseline !important;
  gap: 8px !important;
  margin: 4px 0 !important;
}

.gh-readme-rendered :deep(input[type="checkbox"]) {
  accent-color: #0284c7;
  cursor: default;
}

/* 针对 shields.io 徽章、build 状态、小图标：保持行内并排，不强制独占放大 */
.gh-readme-rendered :deep(img[src*="shields.io"]),
.gh-readme-rendered :deep(img[src*="badge"]),
.gh-readme-rendered :deep(img[src*="github-actions"]),
.gh-readme-rendered :deep(p > a > img),
.gh-readme-rendered :deep(a > img:only-child) {
  display: inline-block !important;
  max-height: 22px !important;
  margin: 2px 3px !important;
  vertical-align: middle !important;
}

.gh-readme-rendered :deep(hr) {
  border: 0;
  height: 1px;
  background: var(--border, rgba(255, 255, 255, 0.1));
  margin: 16px 0;
}

.gh-readme-rendered :deep(sup) {
  font-size: 11px;
  vertical-align: super;
  opacity: 0.85;
}

.gh-readme-rendered :deep(sub) {
  font-size: 11px;
  vertical-align: sub;
  opacity: 0.85;
}

.gh-readme-rendered :deep(pre) {
  position: relative;
  background: var(--panel) !important;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
  border-radius: 6px !important;
  padding: 10px 14px !important;
  overflow-x: auto;
  margin: 12px 0 !important;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace !important;
  font-size: 12px !important;
  line-height: 1.55 !important;
}

.gh-readme-rendered :deep(code) {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace !important;
}

.gh-readme-rendered :deep(.gh-code-copy-btn) {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 2px 7px;
  font-size: 10.5px;
  border-radius: 4px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  background: var(--surface, rgba(30, 41, 59, 0.85));
  color: var(--dim);
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.15s;
}

.gh-readme-rendered :deep(.gh-code-copy-btn:hover) {
  background: #0284c7;
  color: #fff;
  border-color: #38bdf8;
}

/* 🌟 孤星（米色）主题专属高质感适配 */
html[data-theme="lonetrail"] .gh-modal-window {
  background: #f4efe4 !important;
  border-color: rgba(38, 34, 26, 0.16) !important;
  color: #26221a !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(38, 34, 26, 0.12) !important;
}

html[data-theme="lonetrail"] .gh-modal-header {
  background: rgba(240, 234, 222, 0.98) !important;
  border-bottom-color: rgba(38, 34, 26, 0.12) !important;
}

html[data-theme="lonetrail"] .gh-modal-repo-name {
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-modal-repo-name .gh-name {
  color: #0284c7 !important;
}

html[data-theme="lonetrail"] .gh-btn {
  background: rgba(255, 255, 255, 0.85) !important;
  border-color: rgba(38, 34, 26, 0.18) !important;
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-btn:hover {
  background: #ffffff !important;
  border-color: rgba(38, 34, 26, 0.35) !important;
}

html[data-theme="lonetrail"] .gh-btn-obsidian {
  background: rgba(139, 92, 246, 0.12) !important;
  border-color: rgba(139, 92, 246, 0.35) !important;
  color: #7c3aed !important;
}

html[data-theme="lonetrail"] .gh-btn-obsidian:hover {
  background: rgba(139, 92, 246, 0.22) !important;
}

html[data-theme="lonetrail"] .gh-modal-ribbon {
  background: rgba(246, 242, 234, 0.9) !important;
  border-bottom-color: rgba(38, 34, 26, 0.1) !important;
}

html[data-theme="lonetrail"] .gh-meta-item {
  background: rgba(255, 255, 255, 0.8) !important;
  border-color: rgba(38, 34, 26, 0.12) !important;
  color: rgba(38, 34, 26, 0.75) !important;
}

html[data-theme="lonetrail"] .gh-modal-desc {
  color: rgba(38, 34, 26, 0.85) !important;
}

html[data-theme="lonetrail"] .gh-readme-rendered {
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-readme-rendered :deep(h1),
html[data-theme="lonetrail"] .gh-readme-rendered :deep(h2),
html[data-theme="lonetrail"] .gh-readme-rendered :deep(h3),
html[data-theme="lonetrail"] .gh-readme-rendered :deep(h4) {
  color: #17140f !important;
  border-bottom-color: rgba(38, 34, 26, 0.12) !important;
}

html[data-theme="lonetrail"] .gh-readme-rendered :deep(pre) {
  background: rgba(38, 34, 26, 0.05) !important;
  border-color: rgba(38, 34, 26, 0.12) !important;
  color: #17140f !important;
}

html[data-theme="lonetrail"] .gh-readme-rendered :deep(.gh-code-copy-btn) {
  background: #ffffff !important;
  border-color: rgba(38, 34, 26, 0.2) !important;
  color: #26221a !important;
}
</style>
