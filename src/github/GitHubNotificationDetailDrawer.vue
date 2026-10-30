<template>
  <Teleport to="body">
    <div
      v-if="state.isOpen"
      class="gh-nonmodal-backdrop"
    >
      <div
        ref="windowRef"
        class="gh-nonmodal-window"
        :style="windowStyle"
        role="dialog"
        aria-modal="false"
        :aria-label="state.data?.title || 'GitHub 详情'"
      >
        <!-- 1. 顶部无模态拖拽标题栏 (小巧利落，对标 GitHubRepoDetailDrawer) -->
        <header class="gh-modal-header" @mousedown="onHeaderMouseDown">
          <div class="gh-modal-title-wrap">
            <span class="gh-modal-octo-icon">{{ getTypeIcon(state.data?.type || state.notificationItem?.subject.type) }}</span>
            <a
              v-if="state.data?.htmlUrl || state.notificationItem?.htmlUrl"
              :href="state.data?.htmlUrl || state.notificationItem?.htmlUrl"
              target="_blank"
              rel="noreferrer"
              class="gh-modal-repo-name"
              title="在 GitHub 新标签页打开原帖"
            >
              <span class="gh-owner">{{ ownerName }}</span>
              <span class="gh-sep">/</span>
              <strong class="gh-name">{{ repoName }}</strong>
              <span class="gh-external-arrow">↗</span>
            </a>
            <span v-else class="gh-modal-repo-name">
              <strong class="gh-name">{{ state.data?.repositoryFullName || "GitHub 详情" }}</strong>
            </span>
          </div>

          <!-- 右侧操作栏 -->
          <div class="gh-modal-actions">
            <span
              v-if="state.data?.state"
              class="gh-detail-state-pill"
              :class="state.data.state"
            >
              {{ getStateLabel(state.data.state) }}
            </span>

            <button
              v-if="state.data?.htmlUrl || state.notificationItem?.htmlUrl"
              type="button"
              class="gh-btn gh-btn-action"
              title="在 GitHub 网页中打开原帖"
              @click="openInWeb"
            >
              在网页打开 ↗
            </button>

            <button
              type="button"
              class="gh-btn gh-btn-close"
              title="关闭视窗 (Esc)"
              aria-label="关闭视窗"
              @click="handleClose"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- 2. 主体滚动区 -->
        <div class="gh-modal-content">
          <!-- 加载中动画 -->
          <div v-if="state.loading" class="gh-content-loading">
            <div class="gh-loading-spinner"></div>
            <span>正在获取并排版 {{ state.notificationItem?.repository.fullName }} 的贴子详情与对话流 …</span>
          </div>

          <!-- 错误提示 -->
          <div v-else-if="state.error" class="gh-content-error">
            <span class="error-icon">⚠️</span>
            <p>{{ state.error }}</p>
            <div class="error-actions">
              <button type="button" class="gh-btn" @click="retry">重试</button>
              <button type="button" class="gh-btn gh-btn-action" @click="openInWeb">在 GitHub 打开 ↗</button>
            </div>
          </div>

          <!-- 正文展示区 (结构 100% 对齐 GitHub 官方贴子结构) -->
          <div
            v-else-if="state.data"
            ref="scrollContainerRef"
            class="gh-detail-scrollable"
            @click="onContentClick"
          >
            <!-- 贴子大标题与分类元信息行 (对标图 1/图 2) -->
            <div class="gh-discussion-title-header">
              <h1 class="gh-discussion-h1">
                {{ state.data.title }}
                <span v-if="state.data.number" class="gh-discussion-num">#{{ state.data.number }}</span>
              </h1>

              <div class="gh-discussion-sub-meta">
                <span v-if="state.data.category" class="gh-category-pill">
                  <span v-if="state.data.category.emoji" class="cat-emoji">{{ state.data.category.emoji }}</span>
                  <span>{{ state.data.category.name }}</span>
                </span>
                <span v-else class="gh-category-pill">
                  {{ getTypeLabel(state.data.type) }}
                </span>

                <span class="gh-sub-author">{{ state.data.author.login }}</span>
                <span class="gh-sub-verb">发布于 {{ state.data.formattedTime }}</span>
                <span v-if="state.data.commentsCount" class="gh-sub-comments-count">
                  · {{ state.data.commentsCount }} 条讨论主题
                  <template v-if="state.data.totalRepliesCount">
                    （含 {{ state.data.totalRepliesCount }} 条互动对话）
                  </template>
                </span>
              </div>
            </div>

            <!-- ★★★ 核心重点：楼主发帖主卡片 (上面必须有东西，包含完整路线图与 @kongzhuww) ★★★ -->
            <article class="gh-op-post-card">
              <div class="gh-op-post-head">
                <div class="gh-op-author-left">
                  <img
                    class="gh-op-avatar"
                    :src="state.data.author.avatarUrl || 'assets/icon-48.png'"
                    alt=""
                    loading="lazy"
                  />
                  <div class="gh-op-meta">
                    <div class="gh-op-name-row">
                      <strong class="gh-op-name">{{ state.data.author.login }}</strong>
                      <span v-if="state.data.author.association" class="gh-role-pill">
                        {{ state.data.author.association }}
                      </span>
                    </div>
                    <time class="gh-op-time">{{ state.data.formattedTime }}</time>
                  </div>
                </div>
                <span class="gh-op-badge">楼主</span>
              </div>

              <div class="gh-op-divider"></div>

              <!-- 主贴正文 Markdown 排版 (双保险渲染，确保 100% 完整展示全部任务清单) -->
              <div
                class="gh-post-markdown obsidian-markdown-rendered"
                v-html="renderedBodyHtml"
              ></div>

              <!-- 贴子表情点赞反应条 (Reactions) -->
              <div v-if="state.data.reactions?.length" class="gh-reactions-bar">
                <span
                  v-for="r in state.data.reactions"
                  :key="r.emoji"
                  class="gh-reaction-pill"
                >
                  <span class="rx-emoji">{{ r.emoji }}</span>
                  <span class="rx-count">{{ r.count }}</span>
                </span>
              </div>
            </article>

            <!-- 讨论与楼层评论列表 -->
            <div v-if="state.data.comments.length" class="gh-comments-block">
              <div class="gh-comments-header">
                <strong>💬 讨论回复与对话流</strong>
                <span class="gh-comments-count-pill">
                  {{ state.data.commentsCount }} 条主题
                  <template v-if="state.data.totalRepliesCount">
                    · {{ state.data.totalRepliesCount }} 条楼内对话
                  </template>
                </span>
              </div>

              <div class="gh-comments-feed">
                <div
                  v-for="comment in state.data.comments"
                  :key="comment.id"
                  class="gh-comment-item-card"
                >
                  <!-- 主评论头部 -->
                  <div class="gh-comment-head">
                    <img
                      class="gh-comment-avatar"
                      :src="comment.author.avatarUrl || 'assets/icon-48.png'"
                      alt=""
                      loading="lazy"
                    />
                    <div class="gh-comment-meta">
                      <span class="gh-comment-author">{{ comment.author.login }}</span>
                      <span v-if="comment.author.association" class="gh-role-pill small">
                        {{ comment.author.association }}
                      </span>
                      <time class="gh-comment-time">{{ comment.formattedTime }}</time>
                    </div>
                  </div>

                  <div class="gh-op-divider"></div>

                  <!-- 主评论正文 -->
                  <div
                    class="gh-post-markdown obsidian-markdown-rendered"
                    v-html="comment.bodyHtml"
                  ></div>

                  <!-- 评论表情反馈 -->
                  <div v-if="comment.reactions?.length" class="gh-reactions-bar comment-rx">
                    <span
                      v-for="r in comment.reactions"
                      :key="r.emoji"
                      class="gh-reaction-pill"
                    >
                      <span class="rx-emoji">{{ r.emoji }}</span>
                      <span class="rx-count">{{ r.count }}</span>
                    </span>
                  </div>

                  <!-- 楼中楼对话流 (Thread Replies) -->
                  <div v-if="comment.replies?.length" class="gh-comment-replies-thread">
                    <div class="gh-replies-thread-title">
                      <span>💬 {{ comment.replies.length }} 条回复对话</span>
                    </div>

                    <div
                      v-for="reply in comment.replies"
                      :key="reply.id"
                      class="gh-reply-item-card"
                    >
                      <div class="gh-reply-head">
                        <img
                          class="gh-reply-avatar"
                          :src="reply.author.avatarUrl || 'assets/icon-48.png'"
                          alt=""
                          loading="lazy"
                        />
                        <div class="gh-reply-meta">
                          <strong class="gh-reply-author">{{ reply.author.login }}</strong>
                          <span v-if="reply.author.association" class="gh-role-pill tiny">
                            {{ reply.author.association }}
                          </span>
                          <time class="gh-reply-time">{{ reply.formattedTime }}</time>
                        </div>
                      </div>

                      <div
                        class="gh-post-markdown gh-reply-markdown obsidian-markdown-rendered"
                        v-html="reply.bodyHtml"
                      ></div>

                      <div v-if="reply.reactions?.length" class="gh-reactions-bar reply-rx">
                        <span
                          v-for="r in reply.reactions"
                          :key="r.emoji"
                          class="gh-reaction-pill"
                        >
                          <span class="rx-emoji">{{ r.emoji }}</span>
                          <span class="rx-count">{{ r.count }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 无评论说明 -->
            <div v-else class="gh-no-comments">
              <span>暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import {
  gitHubNotificationDetailState as state,
  gitHubNotificationDetailController as controller,
} from "./github-notification-detail-store";
import { markdownAstEngine } from "../utils/markdown-ast";

const windowRef = ref<HTMLElement | null>(null);
const scrollContainerRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);

let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;
let stopDrag = () => {};

const ownerName = computed(() => {
  const full = state.data?.repositoryFullName || state.notificationItem?.repository.fullName || "";
  return full.split("/")[0] || "";
});

const repoName = computed(() => {
  const full = state.data?.repositoryFullName || state.notificationItem?.repository.fullName || "";
  return full.split("/")[1] || full;
});

// 双保险计算属性：优先使用官方权威 bodyHtml，若为空则由本地 AST 引擎实时解析 body
const renderedBodyHtml = computed(() => {
  if (!state.data) return "";
  const html = state.data.bodyHtml?.trim() || "";
  if (html.length > 20) return html;
  const raw = state.data.body?.trim() || "";
  if (raw.length > 0) return markdownAstEngine.renderMarkdown(raw);
  return "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
});

const windowStyle = computed(() => {
  if (!pos.value) return {};
  return {
    position: "fixed" as const,
    left: `${pos.value.x}px`,
    top: `${pos.value.y}px`,
    transform: "none",
  };
});

// 每次打开重置为屏幕居中并复位滚动条到最顶部
watch(
  () => state.isOpen,
  (open) => {
    if (open) {
      pos.value = null;
      void nextTick(() => {
        if (scrollContainerRef.value) {
          scrollContainerRef.value.scrollTop = 0;
        }
      });
    }
  }
);

// 当详情数据加载就绪后，再次确保滚动条处于最上方
watch(
  () => state.data,
  (d) => {
    if (d) {
      void nextTick(() => {
        if (scrollContainerRef.value) {
          scrollContainerRef.value.scrollTop = 0;
        }
      });
    }
  }
);

function onHeaderMouseDown(e: MouseEvent) {
  if ((e.target as HTMLElement).closest("button, a, input")) return;
  stopDrag();
  const win = windowRef.value;
  if (!win || !state.isOpen) return;

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
      y: Math.max(10, Math.min(window.innerHeight - 80, startPosY + dy)),
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

function openInWeb() {
  const url = state.data?.htmlUrl || state.notificationItem?.htmlUrl;
  if (url && typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

// 统一事件委托：点击 Markdown 内部链接（如 @kongzhuww、#110 等）均在新标签页安全打开
function onContentClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  const link = target?.closest("a") as HTMLAnchorElement | null;
  if (link && link.href) {
    e.preventDefault();
    e.stopPropagation();
    window.open(link.href, "_blank", "noopener,noreferrer");
  }
}

function retry() {
  if (state.notificationItem) {
    void controller.open(state.notificationItem);
  }
}

function getTypeIcon(type?: string): string {
  switch (type) {
    case "Discussion":
      return "💡";
    case "Issue":
      return "🟢";
    case "PullRequest":
      return "🔀";
    case "Release":
      return "🏷️";
    case "CheckSuite":
      return "⚡";
    default:
      return "🐙";
  }
}

function getTypeLabel(type?: string): string {
  switch (type) {
    case "Discussion":
      return "Discussion 讨论";
    case "Issue":
      return "Issue 议题";
    case "PullRequest":
      return "Pull Request 合并请求";
    case "Release":
      return "Release 发行版";
    case "CheckSuite":
      return "CI 流水线";
    default:
      return type || "通知详情";
  }
}

function getStateLabel(st?: string): string {
  switch (st) {
    case "open":
      return "Open 开启";
    case "closed":
      return "Closed 已关闭";
    case "merged":
      return "Merged 已合并";
    case "discussion":
      return "活跃中";
    case "success":
      return "构建成功";
    case "failure":
      return "构建失败";
    default:
      return st || "";
  }
}

function onGlobalKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    handleClose();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onGlobalKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onGlobalKeyDown);
  stopDrag();
});
</script>

<style scoped>
/* 无模态窗口外层：背景完全透明，不拦截底层网页操作 */
.gh-nonmodal-backdrop {
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

/* 桌面工具风格独立视窗卡片 */
.gh-nonmodal-window {
  pointer-events: auto;
  width: min(840px, 94vw);
  height: min(800px, 92vh);
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28), 0 0 0 1px var(--border, rgba(0, 0, 0, 0.06));
  display: flex;
  flex-direction: column;
  color: var(--text, #1e293b);
  overflow: hidden;
  contain: paint;
  animation: windowPopIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes windowPopIn {
  from {
    opacity: 0;
    transform: scale(0.97) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 顶部拖拽标题栏 */
.gh-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--panel, #ffffff);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
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
  font-size: 17px;
  flex-shrink: 0;
}

.gh-modal-repo-name {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--heading, #0f172a);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.15s;
}

.gh-modal-repo-name:hover {
  color: #0284c7;
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
  color: #0284c7;
}

.gh-external-arrow {
  font-size: 11px;
  opacity: 0.6;
}

/* 操作栏按钮 */
.gh-modal-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.gh-detail-state-pill {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
  line-height: 1.3;
}

.gh-detail-state-pill.open {
  background: #10b981;
  color: #ffffff;
}

.gh-detail-state-pill.closed {
  background: #64748b;
  color: #ffffff;
}

.gh-detail-state-pill.merged {
  background: #8b5cf6;
  color: #ffffff;
}

.gh-detail-state-pill.discussion {
  background: rgba(14, 165, 233, 0.14);
  color: #0284c7;
}

.gh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 26px;
  padding: 0 8px;
  border-radius: 5px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #f8fafc);
  color: var(--text, #334155);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.gh-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  border-color: var(--border-strong, rgba(0, 0, 0, 0.2));
  color: var(--heading, #0f172a);
}

.gh-btn-action {
  color: #0284c7;
  border-color: rgba(2, 132, 199, 0.3);
}

.gh-btn-action:hover {
  background: rgba(2, 132, 199, 0.08);
  border-color: #0284c7;
  color: #0284c7;
}

.gh-btn-close {
  width: 26px;
  padding: 0;
  color: var(--muted, #64748b);
}

/* 主体容器与滚动区 */
.gh-modal-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.gh-detail-scrollable {
  flex: 1;
  overflow-y: auto;
  padding: 16px 22px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 贴子大标题区 (对标图 1 与官方贴子顶部) */
.gh-discussion-title-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  flex-shrink: 0;
}

.gh-discussion-h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  line-height: 1.35;
  word-break: break-word;
}

.gh-discussion-num {
  font-weight: 400;
  color: var(--muted, #94a3b8);
  margin-left: 6px;
}

.gh-discussion-sub-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--muted, #64748b);
}

.gh-category-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  color: var(--heading, #0f172a);
}

.cat-emoji {
  font-size: 11px;
}

.gh-sub-author {
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.gh-sub-verb, .gh-sub-comments-count {
  color: var(--muted, #64748b);
}

/* 加载中与错误 */
.gh-content-loading,
.gh-content-error {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  color: var(--muted, #64748b);
  gap: 12px;
  font-size: 13px;
}

.gh-loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--border, rgba(0, 0, 0, 0.1));
  border-top-color: #0284c7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-actions {
  display: flex;
  gap: 8px;
}

/* ★★★ 楼主主贴大卡片 (确保在最上方完整稳定展开，绝不折叠丢失) ★★★ */
.gh-op-post-card {
  display: block !important;
  flex-shrink: 0 !important;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.gh-op-post-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--panel, #f8fafc);
}

.gh-op-author-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.gh-op-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--surface-hover, #e2e8f0);
}

.gh-op-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gh-op-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.gh-op-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.gh-role-pill {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #ffffff);
  color: var(--muted, #64748b);
  font-weight: 500;
}

.gh-role-pill.small {
  font-size: 9px;
  padding: 0 5px;
}

.gh-op-time {
  font-size: 11px;
  color: var(--muted, #94a3b8);
}

.gh-op-badge {
  font-size: 11px;
  color: var(--muted, #94a3b8);
  font-weight: 500;
}

.gh-op-divider {
  height: 1px;
  background: var(--border, rgba(0, 0, 0, 0.08));
}

/* Markdown 排版区 (高质感 GitHub + Obsidian 原生排版) */
.gh-post-markdown {
  padding: 16px 20px;
  font-size: 13.5px;
  line-height: 1.68;
  color: var(--text, #334155);
  word-break: break-word;
}

.gh-post-markdown :deep(p) {
  margin: 0 0 10px;
}

.gh-post-markdown :deep(p:last-child) {
  margin-bottom: 0;
}

.gh-post-markdown :deep(h1),
.gh-post-markdown :deep(h2),
.gh-post-markdown :deep(h3) {
  margin: 18px 0 8px;
  color: var(--heading, #0f172a);
  font-weight: 700;
}

.gh-post-markdown :deep(h2) {
  font-size: 16px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
}

.gh-post-markdown :deep(ul),
.gh-post-markdown :deep(ol) {
  margin: 6px 0 10px;
  padding-left: 20px;
}

.gh-post-markdown :deep(li) {
  margin: 4px 0;
}

/* ★★★ 专属强化：GitHub GFM 任务清单排版 (消除黑圆点，保证完美单列平铺) ★★★ */
.gh-post-markdown :deep(ul.contains-task-list) {
  list-style: none !important;
  list-style-type: none !important;
  padding-left: 0 !important;
  margin: 8px 0 14px !important;
}

.gh-post-markdown :deep(li.task-list-item) {
  list-style: none !important;
  list-style-type: none !important;
  display: flex !important;
  align-items: baseline !important;
  gap: 8px !important;
  margin: 4px 0 !important;
  padding-left: 0 !important;
}

.gh-post-markdown :deep(input[type="checkbox"]),
.gh-post-markdown :deep(input.task-list-item-checkbox) {
  width: 14.5px !important;
  height: 14.5px !important;
  margin: 0 !important;
  accent-color: #0284c7 !important;
  flex-shrink: 0 !important;
  vertical-align: middle !important;
  cursor: default !important;
}

/* 链接与提及 (@kongzhuww 等) 专属样式 */
.gh-post-markdown :deep(a) {
  color: #0284c7 !important;
  text-decoration: underline !important;
  text-underline-offset: 2.5px !important;
}

.gh-post-markdown :deep(a.user-mention) {
  color: #0284c7 !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  background: rgba(2, 132, 199, 0.08) !important;
  padding: 1px 6px !important;
  border-radius: 4px !important;
  margin: 0 1px !important;
}

.gh-post-markdown :deep(a.user-mention:hover) {
  background: rgba(2, 132, 199, 0.16) !important;
  text-decoration: underline !important;
}

.gh-post-markdown :deep(a.issue-link) {
  color: #0284c7 !important;
  font-weight: 600 !important;
  text-decoration: none !important;
}

.gh-post-markdown :deep(a.issue-link:hover) {
  text-decoration: underline !important;
}

.gh-post-markdown :deep(blockquote) {
  margin: 8px 0;
  padding: 6px 12px;
  border-left: 3px solid #0284c7;
  background: var(--panel, rgba(0, 0, 0, 0.02));
  color: var(--muted, #64748b);
}

.gh-post-markdown :deep(pre) {
  background: var(--panel, #f1f5f9);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  padding: 10px 12px;
  overflow-x: auto;
  font-size: 12px;
  margin: 8px 0;
}

.gh-post-markdown :deep(code) {
  background: var(--panel, #f1f5f9);
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
}

.gh-post-markdown :deep(img) {
  max-width: 100%;
  border-radius: 6px;
}

/* 增强定义列表与详情折叠排版 */
.gh-post-markdown :deep(dl) {
  margin: 10px 0;
  padding: 10px 14px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.025));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
}

.gh-post-markdown :deep(dt) {
  font-weight: 700;
  color: var(--heading, #0f172a);
  margin-top: 8px;
  font-size: 13px;
}

.gh-post-markdown :deep(dt:first-child) {
  margin-top: 0;
}

.gh-post-markdown :deep(dd) {
  margin-left: 12px;
  color: var(--text, #334155);
  margin-bottom: 6px;
  line-height: 1.55;
}

.gh-post-markdown :deep(details) {
  margin: 8px 0;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 6px;
  padding: 8px 12px;
  background: var(--surface, #ffffff);
}

.gh-post-markdown :deep(summary) {
  cursor: pointer;
  font-weight: 600;
  color: var(--heading, #0f172a);
  user-select: none;
  outline: none;
}

.gh-post-markdown :deep(summary:hover) {
  color: #0284c7;
}

.gh-post-markdown :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 12.5px;
}

.gh-post-markdown :deep(th),
.gh-post-markdown :deep(td) {
  padding: 6px 10px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  text-align: left;
}

.gh-post-markdown :deep(th) {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  font-weight: 650;
  color: var(--heading, #0f172a);
}

/* 表情点赞反应栏 (Reactions) */
.gh-reactions-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--panel, #f8fafc);
  border-top: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  flex-wrap: wrap;
}

.gh-reactions-bar.comment-rx {
  padding: 6px 12px;
}

.gh-reactions-bar.reply-rx {
  padding: 4px 10px;
  background: transparent;
}

.gh-reaction-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #ffffff);
  font-size: 11px;
}

.rx-emoji {
  font-size: 12px;
}

.rx-count {
  font-size: 11px;
  font-weight: 600;
  color: var(--text, #334155);
}

/* 讨论区与楼层列表 */
.gh-comments-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
}

.gh-comments-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.gh-comments-count-pill {
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--muted, #64748b);
  font-weight: 500;
}

.gh-comments-feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gh-comment-item-card {
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  overflow: hidden;
}

.gh-comment-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--panel, #f8fafc);
}

.gh-comment-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
}

.gh-comment-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  font-size: 12px;
}

.gh-comment-author {
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.gh-comment-time {
  font-size: 11px;
  color: var(--muted, #94a3b8);
  margin-left: auto;
}

/* 楼中楼对话流 (Thread Replies) */
.gh-comment-replies-thread {
  margin: 6px 12px 12px 14px;
  padding: 10px 12px 12px;
  background: var(--panel, #f8fafc);
  border-left: 3px solid #0284c7;
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gh-replies-thread-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 2px;
}

.gh-reply-item-card {
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  overflow: hidden;
}

.gh-reply-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.02));
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.05));
}

.gh-reply-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
}

.gh-reply-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  font-size: 11.5px;
}

.gh-reply-author {
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.gh-role-pill.tiny {
  font-size: 8.5px;
  padding: 0 4px;
}

.gh-reply-time {
  font-size: 10.5px;
  color: var(--muted, #94a3b8);
  margin-left: auto;
}

.gh-reply-markdown {
  padding: 8px 12px;
  font-size: 12.5px;
  line-height: 1.6;
}

.gh-no-comments {
  padding: 20px 0;
  text-align: center;
  color: var(--muted, #94a3b8);
  font-size: 12px;
}
</style>
