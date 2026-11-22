<template>
  <Teleport to="body">
    <aside
      v-if="state.isOpen && target"
      ref="panelRef"
      class="web-preview-window"
      :style="initialStyle"
      role="dialog"
      aria-modal="false"
      :aria-label="'网站预览 - ' + (target.title || target.url)"
    >
      <!-- 顶部可拖拽窗口标题栏 -->
      <header ref="headerRef" class="wp-header" @pointerdown="onHeaderPointerDown">
        <div class="wp-title-group">
          <img
            v-if="target.icon && !iconFailed"
            :src="target.icon"
            alt=""
            class="wp-favicon"
            @error="iconFailed = true"
          />
          <span v-else class="wp-favicon-fallback">🌐</span>
          <div class="wp-title-meta">
            <strong class="wp-title" :title="target.title || target.url">{{ target.title || hostname || target.url }}</strong>
            <span class="wp-badge">{{ target.category || (target.source === "bookmark" ? "书签" : "常用网站") }}</span>
          </div>
        </div>

        <!-- 中间地址栏 -->
        <div class="wp-address-bar no-drag" @pointerdown.stop>
          <span class="wp-lock-icon" aria-hidden="true">{{ isHttps ? "🔒" : "🔗" }}</span>
          <button
            type="button"
            class="wp-url-copy-btn"
            :title="copyTip || `点击复制链接：${target.url}`"
            @click="copyUrl"
          >
            {{ copyTip || target.url }}
          </button>
          <button
            type="button"
            class="wp-icon-btn"
            title="刷新预览"
            aria-label="刷新预览"
            @click="reloadPreview"
          >↻</button>
        </div>

        <!-- 右侧模式切换与窗口控制 -->
        <div class="wp-actions no-drag" @pointerdown.stop>
          <div class="wp-segmented" role="tablist" aria-label="预览模式">
            <button
              type="button"
              role="tab"
              :aria-selected="viewMode === 'live'"
              :class="{ active: viewMode === 'live' }"
              @click="viewMode = 'live'"
            >🌐 实时网页</button>
            <button
              type="button"
              role="tab"
              :aria-selected="viewMode === 'card'"
              :class="{ active: viewMode === 'card' }"
              @click="viewMode = 'card'"
            >🪪 站点名片</button>
          </div>

          <div v-if="viewMode === 'live'" class="wp-segmented wp-viewport-switch" role="group" aria-label="视口宽度">
            <button
              type="button"
              :class="{ active: viewportMode === 'desktop' }"
              title="桌面视口"
              @click="viewportMode = 'desktop'"
            >🖥</button>
            <button
              type="button"
              :class="{ active: viewportMode === 'mobile' }"
              title="手机视口 (390px)"
              @click="viewportMode = 'mobile'"
            >📱</button>
          </div>

          <button
            type="button"
            class="wp-tool-btn"
            :class="{ active: showDetails }"
            title="展开或收起右侧站点详情"
            @click="showDetails = !showDetails"
          >ⓘ 详情</button>

          <button
            type="button"
            class="wp-tool-btn primary"
            title="在浏览器新标签页打开"
            @click="openInNewTab"
          >↗ 打开</button>

          <button
            type="button"
            class="wp-close-btn"
            title="关闭预览 (Esc)"
            aria-label="关闭预览"
            @click="controller.close"
          >✕</button>
        </div>
      </header>

      <!-- 主内容区：左侧预览舞台 + 右侧详情栏 -->
      <div class="wp-body">
        <div class="wp-stage" :class="{ 'is-mobile': viewMode === 'live' && viewportMode === 'mobile' }">
          <template v-if="!safeUrl">
            <div class="wp-empty-state">
              <div class="wp-empty-icon">🔗</div>
              <h4>无法预览此链接</h4>
              <p>仅支持预览 HTTP / HTTPS 协议的网站地址。</p>
            </div>
          </template>

          <!-- 实时网页模式 -->
          <template v-else-if="viewMode === 'live'">
            <div v-if="frameLoading" class="wp-progress-bar" aria-hidden="true"><span></span></div>

            <div v-if="frameSlowHint || frameError" class="wp-notice-banner" role="status">
              <span>
                {{ frameError ? "该网站未能完成内嵌加载，可切换「站点名片」或直接在新标签页打开。" : "页面加载较慢或被站点脚本限制内嵌？可随时切到「站点名片」或新标签页查看。" }}
              </span>
              <div class="wp-notice-actions">
                <button type="button" @click="viewMode = 'card'">查看站点名片</button>
                <button type="button" @click="openInNewTab">新标签页打开 ↗</button>
              </div>
            </div>

            <div class="wp-frame-shell" :class="{ mobile: viewportMode === 'mobile' }">
              <iframe
                :key="`${safeUrl}#${frameKey}`"
                :src="safeUrl"
                class="wp-iframe"
                :style="{ pointerEvents: isDragging || isResizing ? 'none' : 'auto' }"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                referrerpolicy="no-referrer"
                @load="onFrameLoad"
                @error="onFrameError"
              />
            </div>
          </template>

          <!-- 站点名片模式（参考 Linkit 视觉名片） -->
          <template v-else>
            <div class="wp-card-stage">
              <article class="wp-site-card">
                <div class="wp-browser-chrome">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="chrome-url">{{ hostname || safeUrl }}</span>
                </div>

                <div class="wp-card-hero" :class="{ 'has-image': Boolean(meta?.imageUrl && !coverFailed) }">
                  <img
                    v-if="meta?.imageUrl && !coverFailed"
                    :src="meta.imageUrl"
                    alt=""
                    class="wp-card-cover"
                    referrerpolicy="no-referrer"
                    @error="coverFailed = true"
                  />
                  <div v-else class="wp-card-gradient">
                    <img
                      v-if="target.icon && !iconFailed"
                      :src="target.icon"
                      alt=""
                      class="wp-card-hero-icon"
                      @error="iconFailed = true"
                    />
                    <span v-else class="wp-card-hero-globe">🌐</span>
                    <div class="wp-card-hero-title">{{ meta?.title || target.title || hostname }}</div>
                    <small>{{ hostname }}</small>
                  </div>
                </div>

                <div class="wp-card-content">
                  <div class="wp-card-meta-row">
                    <span v-if="meta?.siteName" class="wp-site-pill">{{ meta.siteName }}</span>
                    <span class="wp-site-host">{{ hostname }}</span>
                  </div>
                  <h3>{{ meta?.title || target.title || hostname }}</h3>
                  <p class="wp-card-desc">
                    {{ metaLoading ? "正在读取网站摘要与封面信息…" : (meta?.description || meta?.error || "该站点未提供公开摘要信息。") }}
                  </p>
                  <div class="wp-card-footer-btns">
                    <button type="button" class="wp-tool-btn" @click="viewMode = 'live'">🌐 尝试实时网页预览</button>
                    <button type="button" class="wp-tool-btn primary" @click="openInNewTab">↗ 在新标签页打开</button>
                  </div>
                </div>
              </article>
            </div>
          </template>
        </div>

        <!-- 右侧站点详情面板 -->
        <aside v-if="showDetails" class="wp-sidebar">
          <div class="wp-side-section wp-side-head">
            <img
              v-if="target.icon && !iconFailed"
              :src="target.icon"
              alt=""
              class="wp-side-icon"
              @error="iconFailed = true"
            />
            <span v-else class="wp-side-icon-fallback">🌐</span>
            <div class="wp-side-head-text">
              <h4>{{ target.title || hostname || "未命名网站" }}</h4>
              <a :href="safeUrl || target.url" target="_blank" rel="noreferrer" class="wp-side-link">{{ target.url }}</a>
            </div>
          </div>

          <!-- 迷你网站卡片预览 -->
          <div class="wp-side-section">
            <div class="wp-side-label-row">
              <span>站点名片</span>
              <button type="button" class="wp-mini-link" :disabled="metaLoading" @click="controller.refreshMeta()">
                {{ metaLoading ? "读取中…" : "↻ 更新" }}
              </button>
            </div>
            <button type="button" class="wp-mini-browser" title="切换站点名片视图" @click="viewMode = viewMode === 'live' ? 'card' : 'live'">
              <div class="wp-browser-chrome compact">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="chrome-url">{{ hostname }}</span>
              </div>
              <div class="wp-mini-preview-box">
                <img
                  v-if="meta?.imageUrl && !coverFailed"
                  :src="meta.imageUrl"
                  alt=""
                  referrerpolicy="no-referrer"
                  @error="coverFailed = true"
                />
                <div v-else class="wp-mini-placeholder">
                  <span>{{ meta?.title || target.title || hostname }}</span>
                </div>
              </div>
            </button>
          </div>

          <!-- 站点简介 -->
          <div class="wp-side-section">
            <div class="wp-side-label-row">
              <span>网站简介</span>
              <span v-if="meta?.siteName" class="wp-site-tag">{{ meta.siteName }}</span>
            </div>
            <p class="wp-side-desc">
              {{ metaLoading ? "正在读取页面元信息…" : (meta?.description || meta?.error || "暂无公开描述。") }}
            </p>
          </div>

          <!-- 个人备注（常用网站可直接编辑保存） -->
          <div class="wp-side-section">
            <div class="wp-side-label-row">
              <span>网站备注</span>
              <button
                v-if="canEditNote && !editingNote"
                type="button"
                class="wp-mini-link"
                @click="startEditNote"
              >✏️ 编辑</button>
            </div>

            <div v-if="editingNote" class="wp-note-editor">
              <textarea
                v-model="noteDraft"
                rows="3"
                maxlength="200"
                placeholder="输入网站备注…"
                :disabled="noteSaving"
                @keydown="onNoteKeydown"
              />
              <div class="wp-note-actions">
                <button type="button" class="wp-tool-btn" :disabled="noteSaving" @click="editingNote = false">取消</button>
                <button type="button" class="wp-tool-btn primary" :disabled="noteSaving" @click="saveNote">
                  {{ noteSaving ? "保存中…" : "保存" }}
                </button>
              </div>
              <p v-if="noteError" class="wp-note-error">{{ noteError }}</p>
            </div>
            <p v-else class="wp-side-note" :class="{ empty: !target.note }">
              {{ target.note || (canEditNote ? "暂无备注，点击右上角编辑添加" : "暂无备注") }}
            </p>
          </div>

          <!-- 底部快捷操作 -->
          <div class="wp-side-footer">
            <button type="button" class="wp-tool-btn" @click="copyUrl">{{ copyTip || "📋 复制网址" }}</button>
            <button type="button" class="wp-tool-btn" @click="openTaskModal">✓ 创建任务</button>
          </div>
        </aside>
      </div>

      <!-- 四边缩放手柄 -->
      <i class="wp-resize-handle n" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'n')"></i>
      <i class="wp-resize-handle e" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'e')"></i>
      <i class="wp-resize-handle s" aria-hidden="true" @pointerdown="onResizePointerDown($event, 's')"></i>
      <i class="wp-resize-handle w" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'w')"></i>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useWindowDraggable } from "../core/useWindowDraggable";
import { isImeComposing, onImeEnter } from "../core/ime-keyboard";
import { launcherService } from "../services/launcher.service";
import { webSiteTaskController } from "./web-task-store";
import {
  normalizePreviewUrl,
  webSitePreviewController,
  webSitePreviewState
} from "./web-preview-store";

const state = webSitePreviewState;
const controller = webSitePreviewController;
const target = computed(() => state.target);
const meta = computed(() => state.meta);
const metaLoading = computed(() => state.metaLoading);

const safeUrl = computed(() => normalizePreviewUrl(target.value?.url || ""));
const hostname = computed(() => {
  try {
    return safeUrl.value ? new URL(safeUrl.value).hostname : "";
  } catch {
    return "";
  }
});
const isHttps = computed(() => safeUrl.value.startsWith("https://"));

const viewMode = ref<"live" | "card">("live");
const viewportMode = ref<"desktop" | "mobile">("desktop");
const showDetails = ref(true);
const frameKey = ref(0);
const frameLoading = ref(false);
const frameSlowHint = ref(false);
const frameError = ref(false);
const iconFailed = ref(false);
const coverFailed = ref(false);
const copyTip = ref("");

const canEditNote = computed(() => Boolean(target.value?.source === "launcher" && target.value?.id));
const editingNote = ref(false);
const noteDraft = ref("");
const noteSaving = ref(false);
const noteError = ref("");

let slowTimer: ReturnType<typeof setTimeout> | undefined;
let copyTimer: ReturnType<typeof setTimeout> | undefined;

const {
  panelRef,
  headerRef,
  initialStyle,
  isDragging,
  isResizing,
  stopInteractions,
  onHeaderPointerDown,
  onResizePointerDown,
  bringToFront
} = useWindowDraggable({
  windowId: "web-site-preview",
  managed: false,
  storageKey: "webSitePreviewPositionV1",
  defaultWidth: typeof window !== "undefined" ? Math.min(1120, Math.max(680, window.innerWidth - 120)) : 1040,
  defaultHeight: typeof window !== "undefined" ? Math.min(720, Math.max(460, window.innerHeight - 100)) : 660,
  defaultLeft: typeof window !== "undefined" ? Math.max(40, Math.floor((window.innerWidth - Math.min(1120, Math.max(680, window.innerWidth - 120))) / 2)) : 120,
  defaultTop: 48,
  minWidth: 520,
  minHeight: 380,
  active: () => state.isOpen
});

function startFrameLoadWatch() {
  clearTimeout(slowTimer);
  frameLoading.value = Boolean(safeUrl.value);
  frameSlowHint.value = false;
  frameError.value = false;
  if (!safeUrl.value) return;
  slowTimer = setTimeout(() => {
    if (frameLoading.value) {
      frameSlowHint.value = true;
      frameLoading.value = false;
    }
  }, 6000);
}

watch(
  () => [state.isOpen, safeUrl.value] as const,
  ([open, url]) => {
    if (!open) {
      clearTimeout(slowTimer);
      stopInteractions();
      editingNote.value = false;
      noteError.value = "";
      return;
    }
    iconFailed.value = false;
    coverFailed.value = false;
    editingNote.value = false;
    noteError.value = "";
    viewMode.value = url ? "live" : "card";
    frameKey.value++;
    startFrameLoadWatch();
    bringToFront();
  },
  { immediate: true }
);

watch(() => meta.value?.imageUrl, () => {
  coverFailed.value = false;
});

function reloadPreview() {
  frameKey.value++;
  startFrameLoadWatch();
  controller.refreshMeta();
}

function onFrameLoad() {
  clearTimeout(slowTimer);
  frameLoading.value = false;
  frameSlowHint.value = false;
  frameError.value = false;
}

function onFrameError() {
  clearTimeout(slowTimer);
  frameLoading.value = false;
  frameError.value = true;
}

async function copyUrl() {
  const url = safeUrl.value || target.value?.url || "";
  if (!url) return;
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(url);
    copyTip.value = "已复制链接 ✓";
  } catch {
    copyTip.value = "复制失败";
  }
  copyTimer = setTimeout(() => { copyTip.value = ""; }, 1800);
}

function openInNewTab() {
  const url = safeUrl.value;
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openTaskModal() {
  if (!target.value) return;
  webSiteTaskController.open({
    id: target.value.id,
    title: target.value.title,
    url: safeUrl.value || target.value.url,
    icon: target.value.icon,
    note: target.value.note,
    category: target.value.category,
    source: target.value.source
  });
}

function startEditNote() {
  noteDraft.value = target.value?.note || "";
  noteError.value = "";
  editingNote.value = true;
}

async function saveNote() {
  if (!target.value?.id || noteSaving.value) return;
  noteSaving.value = true;
  noteError.value = "";
  try {
    const saved = await launcherService.editLinkNote(target.value.id, target.value.note || "", noteDraft.value);
    controller.updateNote(saved);
    editingNote.value = false;
  } catch (err: any) {
    noteError.value = err?.message || "备注保存失败";
  } finally {
    noteSaving.value = false;
  }
}

function onNoteKeydown(event: KeyboardEvent) {
  if (isImeComposing(event)) return;
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    editingNote.value = false;
    return;
  }
  onImeEnter(event, () => { void saveNote(); });
}

function onGlobalKeydown(event: KeyboardEvent) {
  if (!state.isOpen || event.key !== "Escape") return;
  if (isImeComposing(event) || editingNote.value) return;
  event.preventDefault();
  event.stopPropagation();
  controller.close();
}

onMounted(() => {
  window.addEventListener("keydown", onGlobalKeydown);
});

onUnmounted(() => {
  clearTimeout(slowTimer);
  clearTimeout(copyTimer);
  stopInteractions();
  window.removeEventListener("keydown", onGlobalKeydown);
});
</script>

<style scoped>
.web-preview-window {
  position: fixed;
  z-index: 10025;
  display: flex;
  flex-direction: column;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 14px;
  box-shadow: 0 22px 54px rgba(15, 23, 42, 0.24);
  overflow: hidden;
  backdrop-filter: blur(18px);
}

.wp-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--border, rgba(15, 23, 42, 0.08));
  background: color-mix(in srgb, var(--surface, #f8fafc) 92%, transparent);
  cursor: move;
  user-select: none;
  flex-shrink: 0;
}

.wp-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  max-width: 240px;
}

.wp-favicon {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  object-fit: cover;
  flex-shrink: 0;
}

.wp-favicon-fallback {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.wp-title-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.wp-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wp-badge {
  flex-shrink: 0;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent, #0284c7) 12%, transparent);
  color: var(--accent, #0284c7);
  font-weight: 600;
}

.wp-address-bar {
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 6px 0 10px;
  border-radius: 8px;
  border: 1px solid var(--border, rgba(15, 23, 42, 0.1));
  background: var(--panel, #ffffff);
  cursor: default;
}

.wp-lock-icon {
  font-size: 11px;
  opacity: 0.75;
  flex-shrink: 0;
}

.wp-url-copy-btn {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 11.5px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  padding: 0;
}

.wp-url-copy-btn:hover {
  color: var(--text, #0f172a);
}

.wp-icon-btn {
  border: 0;
  background: transparent;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1;
}

.wp-icon-btn:hover {
  background: var(--surface, rgba(15, 23, 42, 0.06));
  color: var(--heading, #0f172a);
}

.wp-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  cursor: default;
}

.wp-segmented {
  display: inline-flex;
  padding: 2px;
  border-radius: 8px;
  background: var(--surface, rgba(15, 23, 42, 0.06));
  border: 1px solid var(--border, rgba(15, 23, 42, 0.08));
}

.wp-segmented button {
  border: 0;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 11.5px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.wp-segmented button.active {
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.wp-tool-btn {
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.wp-tool-btn:hover {
  border-color: var(--accent, #0284c7);
  color: var(--accent, #0284c7);
}

.wp-tool-btn.active {
  background: color-mix(in srgb, var(--accent, #0284c7) 12%, transparent);
  border-color: var(--accent, #0284c7);
  color: var(--accent, #0284c7);
}

.wp-tool-btn.primary {
  background: var(--accent, #0284c7);
  border-color: var(--accent, #0284c7);
  color: #ffffff;
}

.wp-tool-btn.primary:hover {
  filter: brightness(1.06);
  color: #ffffff;
}

.wp-close-btn {
  border: 0;
  background: transparent;
  color: var(--muted, #64748b);
  width: 28px;
  height: 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.wp-close-btn:hover {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}

.wp-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.wp-stage {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg, #f1f5f9);
  overflow: hidden;
}

.wp-stage.is-mobile {
  padding: 16px;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.wp-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  z-index: 3;
  overflow: hidden;
}

.wp-progress-bar span {
  display: block;
  width: 35%;
  height: 100%;
  background: linear-gradient(90deg, #0284c7, #38bdf8);
  animation: wp-slide 1.2s ease-in-out infinite;
}

@keyframes wp-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

.wp-notice-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 7px 12px;
  font-size: 11.5px;
  background: color-mix(in srgb, #f59e0b 12%, var(--panel, #ffffff));
  border-bottom: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
  color: var(--text, #334155);
  flex-shrink: 0;
}

.wp-notice-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.wp-notice-actions button {
  border: 1px solid var(--border, rgba(15, 23, 42, 0.14));
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
}

.wp-frame-shell {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: #ffffff;
}

.wp-frame-shell.mobile {
  width: 390px;
  max-width: 100%;
  height: 100%;
  border-radius: 22px;
  border: 8px solid #1e293b;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
  overflow: hidden;
}

.wp-iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #ffffff;
}

.wp-card-stage {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

.wp-site-card {
  width: 100%;
  max-width: 660px;
  border-radius: 14px;
  overflow: hidden;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.1));
  box-shadow: 0 16px 38px rgba(15, 23, 42, 0.12);
}

.wp-browser-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--surface, #f8fafc);
  border-bottom: 1px solid var(--border, rgba(15, 23, 42, 0.08));
}

.wp-browser-chrome.compact {
  padding: 6px 8px;
}

.wp-browser-chrome .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.wp-browser-chrome .dot.red { background: #ef4444; }
.wp-browser-chrome .dot.yellow { background: #f59e0b; }
.wp-browser-chrome .dot.green { background: #22c55e; }

.wp-browser-chrome .chrome-url {
  margin-left: 6px;
  font-size: 11px;
  color: var(--muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wp-card-hero {
  position: relative;
  height: 260px;
  background: linear-gradient(135deg, #0f172a, #1e293b 55%, #0369a1);
  overflow: hidden;
}

.wp-card-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wp-card-gradient {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
  color: #f8fafc;
}

.wp-card-hero-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  padding: 6px;
}

.wp-card-hero-globe {
  font-size: 38px;
}

.wp-card-hero-title {
  font-size: 18px;
  font-weight: 700;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wp-card-gradient small {
  opacity: 0.78;
  font-size: 12px;
}

.wp-card-content {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wp-card-meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
}

.wp-site-pill {
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent, #0284c7) 12%, transparent);
  color: var(--accent, #0284c7);
  font-weight: 600;
}

.wp-site-host {
  color: var(--muted, #64748b);
}

.wp-card-content h3 {
  margin: 0;
  font-size: 17px;
  color: var(--heading, #0f172a);
}

.wp-card-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted, #64748b);
}

.wp-card-footer-btns {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.wp-sidebar {
  width: 296px;
  flex-shrink: 0;
  border-left: 1px solid var(--border, rgba(15, 23, 42, 0.08));
  background: var(--panel, #ffffff);
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 14px;
  overflow-y: auto;
}

.wp-side-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wp-side-head {
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border, rgba(15, 23, 42, 0.08));
}

.wp-side-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
}

.wp-side-icon-fallback {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface, #f1f5f9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.wp-side-head-text {
  min-width: 0;
  flex: 1;
}

.wp-side-head-text h4 {
  margin: 0 0 3px;
  font-size: 13.5px;
  color: var(--heading, #0f172a);
  word-break: break-word;
}

.wp-side-link {
  font-size: 11px;
  color: var(--accent, #0284c7);
  word-break: break-all;
  text-decoration: none;
}

.wp-side-link:hover {
  text-decoration: underline;
}

.wp-side-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted, #64748b);
}

.wp-mini-link {
  border: 0;
  background: transparent;
  color: var(--accent, #0284c7);
  font-size: 11px;
  cursor: pointer;
  padding: 0;
}

.wp-mini-browser {
  border: 1px solid var(--border, rgba(15, 23, 42, 0.1));
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface, #f8fafc);
  padding: 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.wp-mini-preview-box {
  height: 116px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.wp-mini-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wp-mini-placeholder {
  padding: 12px;
  color: #e2e8f0;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.wp-site-tag {
  font-size: 10.5px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--surface, #f1f5f9);
}

.wp-side-desc,
.wp-side-note {
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
  color: var(--text, #334155);
  white-space: pre-wrap;
  word-break: break-word;
}

.wp-side-note.empty {
  color: var(--muted, #94a3b8);
}

.wp-note-editor textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border, rgba(15, 23, 42, 0.16));
  border-radius: 8px;
  padding: 7px 9px;
  font-size: 12px;
  background: var(--surface, #f8fafc);
  color: var(--text, #0f172a);
  resize: vertical;
}

.wp-note-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 6px;
}

.wp-note-error {
  margin: 4px 0 0;
  font-size: 11px;
  color: #ef4444;
}

.wp-side-footer {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid var(--border, rgba(15, 23, 42, 0.08));
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.wp-empty-state {
  margin: auto;
  text-align: center;
  padding: 32px;
  color: var(--muted, #64748b);
}

.wp-empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.wp-resize-handle {
  position: absolute;
  z-index: 5;
}

.wp-resize-handle.n { top: 0; left: 10px; right: 10px; height: 5px; cursor: ns-resize; }
.wp-resize-handle.s { bottom: 0; left: 10px; right: 10px; height: 5px; cursor: ns-resize; }
.wp-resize-handle.e { top: 10px; bottom: 10px; right: 0; width: 5px; cursor: ew-resize; }
.wp-resize-handle.w { top: 10px; bottom: 10px; left: 0; width: 5px; cursor: ew-resize; }
</style>
