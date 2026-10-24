<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import { loadEndpoint, saveEndpoint } from "./settings";
const EndpointSettingsPanel = defineAsyncComponent(() => import("../components/EndpointSettingsPanel.vue"));
const settingsOpen = ref(false);
const settingsAnchor = ref<HTMLElement | null>(null);
import { firecrawlModalState as state, firecrawlModalController as controller } from "./firecrawl-modal-store";
import { toolModalsState, toolModalsController } from "../core/tool-modals.store";

const inputUrl = ref("");
const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

function handleClose() {
  settingsOpen.value = false;
  controller.close();
  toolModalsController.close("firecrawl");
}

function handleStartScrape() {
  const url = inputUrl.value.trim();
  if (!url) return;
  controller.scrape(url);
}

async function handlePasteClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    if (text?.trim()) {
      inputUrl.value = text.trim();
      handleStartScrape();
    }
  } catch {
    // 忽略剪贴板权限限制
  }
}

function handleReset() {
  controller.reset();
  inputUrl.value = "";
}

function onHeaderMouseDown(e: MouseEvent) {
  if ((e.target as HTMLElement).closest("button, a, input")) return;
  isDragging = true;
  const win = windowRef.value;
  if (!win) return;
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

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && (state.isOpen || toolModalsState.firecrawl)) {
    handleClose();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <EndpointSettingsPanel v-if="settingsOpen && (state.isOpen || toolModalsState.firecrawl)" :anchor="settingsAnchor" label="Firecrawl 节点设置" hint="填写 Firecrawl 服务根地址（不含 /v1/scrape）。沿用已保存配置；不再回退到写死的个人 VPS。保存不发起抓取。" :load="loadEndpoint" :save="saveEndpoint" @close="settingsOpen = false" />
  <Teleport to="body">
    <div v-if="state.isOpen || toolModalsState.firecrawl" class="fc-modal-overlay">
      <!-- 🌟 纯实体白底黑字便签悬浮视窗 (480px × 560px)，周围 100% 透明无遮挡，支持自由拖动与缩放 -->
      <div
        ref="windowRef"
        class="fc-modal-window"
        :style="pos ? { position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0' } : {}"
        role="dialog"
        aria-modal="false"
      >
        <!-- 标题栏 (按住可自由拖动) -->
        <header class="fc-modal-header" @mousedown="onHeaderMouseDown">
          <div class="fc-modal-title">
            <span class="fc-brand-icon">⚡</span>
            <span class="fc-title-text" :title="state.title || 'Firecrawl 网页提炼便签'">
              {{ state.title || 'Firecrawl 网页提炼' }}
            </span>
            <span v-if="state.charCount" class="fc-count-pill">
              {{ state.charCount }} 字
            </span>
          </div>
          <div class="fc-modal-actions">
            <button id="firecrawl-settings-open" ref="settingsAnchor" type="button" class="fc-action-btn" title="Firecrawl 节点设置" :aria-expanded="settingsOpen" @click="settingsOpen = !settingsOpen">⚙️</button>
            <button
              v-if="state.markdown"
              type="button"
              class="fc-action-btn"
              title="复制全部 Markdown"
              @click="controller.copy"
            >
              {{ state.copied ? "✓ 已复制" : "📋 复制" }}
            </button>
            <button
              type="button"
              class="fc-action-btn close"
              title="关闭便签视窗"
              @click="handleClose"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- 专属独立的 URL 录入条 (完全脱离通用搜索框) -->
        <div class="fc-input-banner">
          <div class="fc-input-wrapper">
            <span class="fc-input-prefix">🔗</span>
            <input
              v-model="inputUrl"
              class="fc-url-input"
              type="url"
              placeholder="请粘贴文章或网页网址 (http/https)..."
              @keydown.enter.prevent="handleStartScrape"
            />
            <button
              v-if="!inputUrl"
              type="button"
              class="fc-paste-quick-btn"
              title="读取剪贴板网址并直接提炼"
              @click="handlePasteClipboard"
            >
              粘贴
            </button>
            <button
              type="button"
              class="fc-scrape-submit-btn"
              :disabled="!inputUrl.trim() || state.isLoading"
              @click="handleStartScrape"
            >
              {{ state.isLoading ? "提炼中…" : "⚡ 提炼" }}
            </button>
          </div>
        </div>

        <!-- 来源网址与原网页直通 -->
        <div v-if="state.url" class="fc-sub-url-bar">
          <span class="fc-url-text" :title="state.url">{{ state.url }}</span>
          <div class="fc-url-tools">
            <button type="button" class="fc-open-ext-link" title="在浏览器打开原网页" @click="controller.openOriginal">
              原网页 ↗
            </button>
            <button type="button" class="fc-open-ext-link reset" title="提炼新网页" @click="handleReset">
              换一个 ‹
            </button>
          </div>
        </div>

        <!-- 正文区域 -->
        <div class="fc-modal-body">
          <!-- 1. 加载中 -->
          <div v-if="state.isLoading" class="fc-loading-box">
            <div class="fc-spinner"></div>
            <p class="fc-loading-text">⚡ Firecrawl 正在穿透解析网页…</p>
            <span class="fc-loading-sub">调用 VPS 无头浏览器执行渲染并剥离广告噪声，转为纯净 Markdown</span>
          </div>

          <!-- 2. 解析出错 -->
          <div v-else-if="state.error" class="fc-error-box">
            <span class="fc-error-icon">⚠️</span>
            <strong class="fc-error-title">网页解析未能完成</strong>
            <p class="fc-error-msg">{{ state.error }}</p>
            <button type="button" class="fc-open-orig-btn" @click="controller.openOriginal">
              直接在浏览器打开原网页 ↗
            </button>
          </div>

          <!-- 3. 初始空闲待录入 -->
          <div v-else-if="!state.markdown" class="fc-empty-intro-box">
            <span class="fc-empty-icon">🌐</span>
            <strong>Firecrawl 网页深度提取与归档</strong>
            <p>在上方输入任意技术博客、文章或文档网址，自动通过 VPS Playwright 无头浏览器提取纯净 Markdown，免除一切广告与杂质！</p>
            <div class="fc-empty-hints">
              <span>✓ 支持单页应用与 JS 动态渲染</span>
              <span>✓ 自动去除侧边栏与页脚广告</span>
              <span>✓ 提取后可一键复制纯净 Markdown</span>
            </div>
          </div>

          <!-- 4. 提炼成功文本框 -->
          <div v-else class="fc-editor-container">
            <textarea
              v-model="state.markdown"
              class="fc-editor-textarea"
              placeholder="Firecrawl 提炼出的 Markdown 文本…"
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- 底部轻量操作工具栏 -->
        <footer v-if="state.markdown" class="fc-modal-footer">
          <div class="fc-footer-info">
            <span class="fc-engine-tag">Engine: VPS Firecrawl v1 (Playwright)</span>
          </div>
          <div class="fc-footer-btns">
            <button type="button" class="fc-btn-primary" @click="controller.copy">
              {{ state.copied ? "✓ 已复制全部" : "📋 复制 Markdown" }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 全局零遮蔽背景 */
.fc-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: transparent !important;
  pointer-events: none;
}

/* 100% 实体白底黑字便签悬浮视窗 (480px × 560px) */
.fc-modal-window {
  pointer-events: auto;
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  height: 560px;
  min-width: 380px;
  min-height: 400px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 40px);
  background: #ffffff !important;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  resize: both;
  user-select: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #111827;
}

/* 暗黑模式实体纯色 */
:root[data-theme="dark"] .fc-modal-window,
:root[data-theme="endfield"] .fc-modal-window {
  background: #1e293b !important;
  border-color: rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.7);
}

/* 标题栏 */
.fc-modal-header {
  height: 42px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
}
.fc-modal-header:active {
  cursor: grabbing;
}
:root[data-theme="dark"] .fc-modal-header,
:root[data-theme="endfield"] .fc-modal-header {
  background: #1e293b !important;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.fc-modal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}
.fc-brand-icon {
  font-size: 15px;
}
.fc-title-text {
  font-size: 13.5px;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:root[data-theme="dark"] .fc-title-text,
:root[data-theme="endfield"] .fc-title-text {
  color: #f8fafc;
}

.fc-count-pill {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  font-weight: 600;
  white-space: nowrap;
}

.fc-modal-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.fc-action-btn {
  height: 26px;
  padding: 0 9px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  background: #f8fafc;
  color: #334155;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.fc-action-btn:hover {
  background: #f1f5f9;
  border-color: rgba(0, 0, 0, 0.2);
}
:root[data-theme="dark"] .fc-action-btn,
:root[data-theme="endfield"] .fc-action-btn {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
}
:root[data-theme="dark"] .fc-action-btn:hover,
:root[data-theme="endfield"] .fc-action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.fc-action-btn.close {
  width: 26px;
  padding: 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fc-action-btn.close:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fca5a5;
}

/* 专属独立录入条 */
.fc-input-banner {
  padding: 10px 14px;
  background: #f8fafc;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}
:root[data-theme="dark"] .fc-input-banner,
:root[data-theme="endfield"] .fc-input-banner {
  background: #0f172a;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.fc-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 3px 8px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
:root[data-theme="dark"] .fc-input-wrapper,
:root[data-theme="endfield"] .fc-input-wrapper {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.15);
}
.fc-input-wrapper:focus-within {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.fc-input-prefix {
  font-size: 14px;
  opacity: 0.7;
}

.fc-url-input {
  flex: 1;
  min-width: 0;
  height: 28px;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-size: 12.5px;
}

.fc-paste-quick-btn {
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  font-size: 11px;
  color: #64748b;
  cursor: pointer;
}
:root[data-theme="dark"] .fc-paste-quick-btn,
:root[data-theme="endfield"] .fc-paste-quick-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
}

.fc-scrape-submit-btn {
  height: 28px;
  padding: 0 12px;
  background: #10b981;
  border: 1px solid #10b981;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s;
}
.fc-scrape-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.fc-scrape-submit-btn:not(:disabled):hover {
  opacity: 0.9;
}

/* 来源网址副标 */
.fc-sub-url-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 14px;
  background: #f1f5f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 11.5px;
}
:root[data-theme="dark"] .fc-sub-url-bar,
:root[data-theme="endfield"] .fc-sub-url-bar {
  background: #141e33;
  border-bottom-color: rgba(255, 255, 255, 0.06);
}
.fc-url-text {
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 8px;
}
.fc-url-tools {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.fc-open-ext-link {
  border: none;
  background: transparent;
  color: #3b82f6;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
}
.fc-open-ext-link:hover {
  text-decoration: underline;
}
.fc-open-ext-link.reset {
  color: #10b981;
}

/* 正文主体 */
.fc-modal-body {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #ffffff !important;
  display: flex;
  flex-direction: column;
}
:root[data-theme="dark"] .fc-modal-body,
:root[data-theme="endfield"] .fc-modal-body {
  background: #1e293b !important;
}

/* 初始空闲引导卡片 */
.fc-empty-intro-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 30px;
  text-align: center;
  user-select: none;
}
.fc-empty-icon {
  font-size: 38px;
}
.fc-empty-intro-box strong {
  font-size: 15px;
  color: #0f172a;
}
:root[data-theme="dark"] .fc-empty-intro-box strong,
:root[data-theme="endfield"] .fc-empty-intro-box strong {
  color: #f8fafc;
}
.fc-empty-intro-box p {
  font-size: 12.5px;
  color: #64748b;
  max-width: 340px;
  margin: 0;
  line-height: 1.6;
}
.fc-empty-hints {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11.5px;
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  padding: 10px 16px;
  border-radius: 8px;
  margin-top: 8px;
}

/* 加载中动画 */
.fc-loading-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 30px;
  text-align: center;
}
.fc-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(16, 185, 129, 0.2);
  border-top-color: #10b981;
  border-radius: 50%;
  animation: fc-spin 0.8s linear infinite;
}
@keyframes fc-spin {
  to { transform: rotate(360deg); }
}
.fc-loading-text {
  margin: 0;
  font-size: 14.5px;
  font-weight: 600;
  color: #0f172a;
}
:root[data-theme="dark"] .fc-loading-text,
:root[data-theme="endfield"] .fc-loading-text {
  color: #f8fafc;
}
.fc-loading-sub {
  font-size: 11.5px;
  color: #64748b;
  max-width: 300px;
}

/* 错误提示 */
.fc-error-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
}
.fc-error-icon {
  font-size: 32px;
}
.fc-error-title {
  font-size: 14px;
  color: #ef4444;
}
.fc-error-msg {
  font-size: 12px;
  color: #64748b;
  max-width: 340px;
  margin: 0;
  line-height: 1.5;
}
.fc-open-orig-btn {
  margin-top: 8px;
  padding: 6px 14px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

/* 编辑文本域 */
.fc-editor-container {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 8px 12px;
}
.fc-editor-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  background: #ffffff !important;
  color: #111827 !important;
  font-family: Consolas, "Cascadia Code", "Fira Code", Monaco, monospace;
  font-size: 12.5px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-y: auto;
}
:root[data-theme="dark"] .fc-editor-textarea,
:root[data-theme="endfield"] .fc-editor-textarea {
  background: #1e293b !important;
  color: #f1f5f9 !important;
}

/* 底部操作条 */
.fc-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: #f8fafc;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
:root[data-theme="dark"] .fc-modal-footer,
:root[data-theme="endfield"] .fc-modal-footer {
  background: #0f172a;
  border-top-color: rgba(255, 255, 255, 0.08);
}

.fc-engine-tag {
  font-size: 10.5px;
  color: #94a3b8;
  font-family: Consolas, monospace;
}
.fc-footer-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fc-btn-secondary {
  padding: 5px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #ffffff;
  color: #334155;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}
.fc-btn-secondary:hover {
  background: #f1f5f9;
}
:root[data-theme="dark"] .fc-btn-secondary,
:root[data-theme="endfield"] .fc-btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
}

.fc-btn-primary {
  padding: 5px 14px;
  border: 1px solid #10b981;
  background: #10b981;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}
.fc-btn-primary:hover {
  opacity: 0.9;
}
</style>
