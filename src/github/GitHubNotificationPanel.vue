<template>
  <div class="vue-gh-notification-panel-wrapper">
    <section
      v-if="state.isOpen"
      ref="panelRef"
      class="gh-notification-panel"
      role="dialog"
      aria-label="GitHub 消息通知中心"
      @click.stop
    >
      <!-- 头部：标题、通知统计与快捷操作 -->
      <header class="gh-msg-header">
        <div class="gh-msg-account">
          <div class="gh-msg-octo-avatar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <div>
            <h2 class="gh-msg-title">GitHub 消息通知</h2>
            <p class="gh-msg-subtitle">
              共 {{ state.items.length }} 条通知 · {{ state.unreadCount }} 条未读（完整保留不标记）
            </p>
          </div>
        </div>
        <span class="grow"></span>
        <button
          type="button"
          class="gh-panel-btn"
          title="在 GitHub 网页版查看通知列表"
          @click="openWebNotifications"
        >
          ↗
        </button>
        <button
          type="button"
          class="gh-panel-btn"
          :class="{ 'is-spinning': state.loading }"
          title="重新拉取最新 GitHub 消息通知"
          @click="refresh"
        >
          ↻
        </button>
        <button
          type="button"
          class="gh-panel-btn close-btn"
          title="关闭通知中心"
          @click="close"
        >
          ✕
        </button>
      </header>

      <!-- 选项卡：对齐 GitHub 官方「所有 / 未读 / 提及 / 作者 / CI」分类 -->
      <nav class="gh-msg-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.kind"
          type="button"
          class="gh-msg-tab"
          :class="{ active: state.activeKind === tab.kind }"
          @click="state.activeKind = tab.kind"
        >
          {{ tab.label }}
          <span v-if="tab.count > 0" class="gh-tab-pill" :class="{ 'is-unread-pill': tab.kind === 'unread' }">
            {{ tab.count }}
          </span>
        </button>
      </nav>

      <!-- 消息列表主体 -->
      <div class="gh-msg-list">
        <div v-if="state.loading && !state.items.length" class="gh-msg-loading">
          <div class="gh-msg-spinner"></div>
          <span>正在拉取 GitHub 全量消息通知…</span>
        </div>

        <div v-else-if="state.error" class="gh-msg-error">
          <span class="error-icon">⚠️</span>
          <p>{{ state.error }}</p>
          <button type="button" class="gh-retry-btn" @click="refresh">重试</button>
        </div>

        <div v-else-if="filteredItems.length === 0" class="gh-msg-empty">
          <span class="empty-emoji">☕</span>
          <strong>当前分类下暂无相关通知</strong>
          <small>你参与或关注的项目在 GitHub 上产生动态时会汇聚在此</small>
        </div>

        <template v-else>
          <article
            v-for="item in filteredItems"
            :key="item.id"
            class="gh-notification-card"
            :class="{ 'is-unread': item.unread }"
            title="点击打开通知详情预览抽屉"
            @click="openItem(item)"
          >
            <!-- 1. 未读指示蓝点 (对标 GitHub 官方样式) -->
            <div class="gh-card-indicator-col">
              <span v-if="item.unread" class="gh-unread-dot" title="未读通知"></span>
              <span v-else class="gh-read-dot-placeholder"></span>
            </div>

            <!-- 2. 类型图标 -->
            <div class="gh-card-type-col">
              <span class="gh-type-badge" :title="item.subject.type">
                {{ getTypeIcon(item.subject.type, item.reason) }}
              </span>
            </div>

            <!-- 3. 卡片主要信息 -->
            <div class="gh-card-main-col">
              <div class="gh-card-repo-row">
                <span class="gh-card-repo-name" :title="item.repository.fullName">
                  {{ item.repository.fullName }}
                </span>
                <span class="gh-card-reason-tag">{{ getReasonLabel(item.reason) }}</span>
                <time class="gh-card-time">{{ item.formattedTime }}</time>
              </div>

              <h4 class="gh-card-subject-title" :title="item.subject.title">
                {{ item.subject.title }}
              </h4>

              <div class="gh-card-footer-row">
                <span class="gh-card-type-label">{{ item.subject.type }}</span>
                <span class="gh-card-jump-hint" title="直接在 GitHub 网页打开" @click.stop="openExternal(item)">在网页打开 ↗</span>
              </div>
            </div>
          </article>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  gitHubNotificationsState as state,
  gitHubNotificationsController as controller,
  type GitHubNotificationItem,
  type GitHubNotificationTabKind,
} from "./github-notifications-store";
import { gitHubNotificationDetailController } from "./github-notification-detail-store";

const panelRef = ref<HTMLElement | null>(null);

const tabs = computed(() => [
  { kind: "all" as GitHubNotificationTabKind, label: "所有", count: state.items.length },
  { kind: "unread" as GitHubNotificationTabKind, label: "未读", count: state.items.filter((i) => i.unread).length },
  { kind: "mention" as GitHubNotificationTabKind, label: "提及", count: state.items.filter((i) => i.reason === "mention").length },
  { kind: "author" as GitHubNotificationTabKind, label: "作者", count: state.items.filter((i) => i.reason === "author").length },
  { kind: "ci" as GitHubNotificationTabKind, label: "CI 活动", count: state.items.filter((i) => i.reason === "ci_activity" || i.subject.type === "CheckSuite").length },
]);

const filteredItems = computed(() => {
  const list = state.items;
  switch (state.activeKind) {
    case "unread":
      return list.filter((i) => i.unread);
    case "mention":
      return list.filter((i) => i.reason === "mention");
    case "author":
      return list.filter((i) => i.reason === "author");
    case "ci":
      return list.filter((i) => i.reason === "ci_activity" || i.subject.type === "CheckSuite");
    default:
      return list;
  }
});

function getTypeIcon(type: string, reason?: string): string {
  if (reason === "ci_activity" || type === "CheckSuite") {
    return "⚡";
  }
  switch (type) {
    case "Issue":
      return "🟢";
    case "PullRequest":
      return "🔀";
    case "Release":
      return "🏷️";
    case "Discussion":
      return "💡";
    default:
      return "📦";
  }
}

function getReasonLabel(reason: string): string {
  switch (reason) {
    case "mention":
      return "提及";
    case "author":
      return "作者";
    case "ci_activity":
      return "CI 活动";
    case "review_requested":
      return "待我审查";
    case "comment":
      return "新评论";
    case "subscribed":
      return "关注动态";
    case "assign":
      return "指派给我";
    default:
      return reason || "通知";
  }
}

function openWebNotifications() {
  if (typeof window !== "undefined") {
    window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
  }
}

function refresh() {
  void controller.refresh();
}

function close() {
  controller.close();
}

function openItem(item: GitHubNotificationItem) {
  void gitHubNotificationDetailController.open(item);
}

function openExternal(item: GitHubNotificationItem) {
  controller.openTarget(item);
}

function onGlobalPointerDown(e: PointerEvent) {
  if (!state.isOpen) return;
  const target = e.target as HTMLElement | null;
  if (!panelRef.value?.contains(target) && !target?.closest("#gh-header-msg-center-btn")) {
    controller.close();
  }
}

function onGlobalKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    controller.close();
  }
}

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("pointerdown", onGlobalPointerDown);
    window.addEventListener("keydown", onGlobalKeyDown);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("pointerdown", onGlobalPointerDown);
    window.removeEventListener("keydown", onGlobalKeyDown);
  }
});
</script>

<style scoped>
.vue-gh-notification-panel-wrapper {
  position: relative;
  z-index: 1000;
}

.gh-notification-panel {
  position: fixed;
  top: 76px;
  right: 28px;
  width: 420px;
  max-width: calc(100vw - 32px);
  max-height: min(80vh, 680px);
  background: var(--panel, #ffffff);
  border: 1px solid var(--border-strong, var(--border, rgba(0, 0, 0, 0.12)));
  border-radius: 12px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22), 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1005;
  animation: ghPanelFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes ghPanelFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.gh-msg-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: color-mix(in srgb, var(--panel, #ffffff) 94%, var(--text, #000000) 6%);
}

.gh-msg-account {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gh-msg-octo-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--surface, rgba(0, 0, 0, 0.06));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--heading, #0f172a);
}

.gh-msg-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  line-height: 1.2;
}

.gh-msg-subtitle {
  margin: 2px 0 0;
  font-size: 10px;
  color: var(--muted, #64748b);
  line-height: 1.2;
}

.grow {
  flex: 1;
}

.gh-panel-btn {
  background: transparent;
  border: none;
  font-size: 12px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.gh-panel-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.06));
  color: var(--heading, #0f172a);
}

.gh-panel-btn.close-btn:hover {
  color: #ef4444;
}

.gh-panel-btn.is-spinning {
  animation: ghSpin 0.8s linear infinite;
}

@keyframes ghSpin {
  to {
    transform: rotate(360deg);
  }
}

/* 分类选项卡 */
.gh-msg-tabs {
  display: flex;
  padding: 6px 10px;
  gap: 4px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  background: var(--panel, #ffffff);
  overflow-x: auto;
}

.gh-msg-tab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 9px;
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.gh-msg-tab:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.04));
  color: var(--heading, #0f172a);
}

.gh-msg-tab.active {
  background: rgba(2, 132, 199, 0.12);
  color: #0284c7;
}

.gh-tab-pill {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 999px;
  background: var(--surface, rgba(0, 0, 0, 0.08));
  color: var(--text, #334155);
}

.gh-tab-pill.is-unread-pill {
  background: #0284c7;
  color: #fff;
}

/* 消息列表主体 */
.gh-msg-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 200px;
}

.gh-msg-loading,
.gh-msg-empty,
.gh-msg-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 36px 16px;
  color: var(--muted, #64748b);
  gap: 8px;
}

.gh-msg-spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2.5px solid rgba(2, 132, 199, 0.15);
  border-top-color: #0284c7;
  animation: ghSpin 0.8s linear infinite;
}

.empty-emoji,
.error-icon {
  font-size: 26px;
}

.gh-msg-empty strong {
  font-size: 13px;
  color: var(--heading, #0f172a);
}

.gh-msg-empty small {
  font-size: 10px;
  line-height: 1.4;
}

.gh-msg-error p {
  margin: 0;
  font-size: 12px;
  color: #ef4444;
  line-height: 1.4;
}

.gh-retry-btn {
  margin-top: 4px;
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 11px;
  cursor: pointer;
}

/* 通知卡片 */
.gh-notification-card {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  background: var(--panel, #ffffff);
  cursor: pointer;
  transition: all 0.15s ease;
}

.gh-notification-card:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.03));
  border-color: var(--border-strong, rgba(0, 0, 0, 0.2));
  transform: translateY(-1px);
}

.gh-notification-card.is-unread {
  background: color-mix(in srgb, var(--panel, #ffffff) 96%, #0284c7 4%);
  border-left: 3px solid #0284c7;
}

.gh-card-indicator-col {
  width: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
}

.gh-unread-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0284c7;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
}

.gh-read-dot-placeholder {
  width: 7px;
  height: 7px;
}

.gh-card-type-col {
  padding-top: 1px;
}

.gh-type-badge {
  font-size: 13px;
}

.gh-card-main-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gh-card-repo-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
}

.gh-card-repo-name {
  font-weight: 600;
  color: var(--muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gh-card-reason-tag {
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--surface, rgba(0, 0, 0, 0.05));
  color: var(--text, #334155);
  font-weight: 500;
  flex-shrink: 0;
}

.gh-card-time {
  margin-left: auto;
  color: var(--dim, #94a3b8);
  white-space: nowrap;
  font-size: 9.5px;
}

.gh-card-subject-title {
  margin: 1px 0 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gh-card-footer-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}

.gh-card-type-label {
  font-size: 9px;
  font-weight: 500;
  color: var(--dim, #94a3b8);
}

.gh-card-jump-hint {
  margin-left: auto;
  font-size: 9.5px;
  color: var(--muted, #64748b);
  opacity: 0;
  transition: opacity 0.12s ease;
}

.gh-notification-card:hover .gh-card-jump-hint {
  opacity: 1;
  color: #0284c7;
}
</style>
