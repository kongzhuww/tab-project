<template>
  <div class="vue-bili-message-panel-wrapper">
    <section
      v-if="state.isOpen"
      ref="panelRef"
      id="bili-notification-center"
      class="bili-message-panel"
      :class="{ 'is-dragging': isDragging }"
      role="dialog"
      aria-label="Bilibili 消息与互动通知中心"
    >
      <!-- 头部：用户信息、未读总数与操作按钮 -->
      <header ref="headerRef" class="bili-msg-drag-header">
        <div class="bili-message-account">
          <img
            id="bili-notification-avatar"
            :src="state.userAvatar || 'assets/bilibili.svg'"
            alt="用户头像"
            loading="lazy"
          />
          <div>
            <h2 id="bili-notification-user">{{ state.userName || 'B站用户' }}</h2>
            <p v-if="state.userMid">UID: {{ state.userMid }} · {{ totalUnread }} 条未读</p>
            <p v-else>点击右上角刷新获取未读</p>
          </div>
        </div>
        <span class="grow"></span>
        <button
          type="button"
          class="bili-web-link-btn"
          title="打开 B站 网页版消息中心"
          @click="onOpenWeb"
        >
          ↗
        </button>
        <button
          type="button"
          class="bili-refresh-btn"
          title="重新拉取最新互动通知"
          @click="onRefresh"
        >
          ↻
        </button>
        <button
          type="button"
          class="bili-close-btn"
          title="关闭通知中心"
          @click="onClose"
        >
          ✕
        </button>
      </header>

      <!-- 5 大分类选项卡 -->
      <nav class="bili-message-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.kind"
          type="button"
          role="tab"
          :class="{ on: state.activeKind === tab.kind }"
          :aria-selected="state.activeKind === tab.kind"
          @click="onSwitchKind(tab.kind)"
        >
          {{ tab.label }}
          <span v-if="state.unreadCounts[tab.kind] > 0" class="bili-tab-badge">
            {{ state.unreadCounts[tab.kind] }}
          </span>
        </button>
      </nav>

      <!-- 操作工具栏：分类标题与一键已读 -->
      <div class="bili-message-toolbar">
        <div>
          <strong>{{ currentTabLabel }}</strong>
          <span>{{ state.items.length }} 条 · 未读 {{ currentUnread }}</span>
        </div>
        <button
          type="button"
          class="bili-local-read"
          :disabled="currentUnread <= 0"
          title="仅清除扩展内未读红点"
          @click="onMarkAllKnown"
        >
          ✓ 一键已读
        </button>
      </div>

      <!-- 消息列表主体 -->
      <div class="bili-message-list">
        <p v-if="state.loading" class="muted small" style="text-align:center; padding: 24px 0;">
          正在同步 B站 互动消息…
        </p>
        <p v-else-if="state.emptyText" class="muted small" style="text-align:center; padding: 24px 0;">
          {{ state.emptyText }}
        </p>
        <p v-else-if="state.items.length === 0" class="muted small" style="text-align:center; padding: 24px 0;">
          这里暂时没有消息 ☕
        </p>
        <template v-else>
          <a
            v-for="item in state.items"
            :key="item.id"
            class="bili-message-item"
            :class="{ 'locally-known': item.isKnown }"
            :href="item.url || 'https://message.bilibili.com/'"
            target="_blank"
            rel="noreferrer"
            title="单击：标记已读；双击：打开对应 B站页面"
            @click.prevent="onItemClick(item)"
            @dblclick.prevent.stop="onItemDblClick(item)"
          >
            <img
              class="bili-message-avatar"
              loading="lazy"
              referrerpolicy="no-referrer"
              :src="item.avatar || 'assets/bilibili.svg'"
              alt=""
            />
            <div class="bili-message-body">
              <h3>{{ item.title }}</h3>
              <p v-if="item.content"><BiliRichText :text="item.content" /></p>
              <div v-if="item.image" class="bili-message-image-box">
                <img
                  class="bili-message-thumb"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  :src="item.image"
                  alt="图片附件"
                  title="点击查看大图"
                  @click.stop.prevent="onImagePreview(item)"
                />
              </div>
              <time v-if="item.time">{{ item.time }}</time>
            </div>
          </a>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BiliRichText from "./BiliRichText.vue";
import { images } from "../sdk/images";
import { useWindowDraggable } from "../core/useWindowDraggable";
import {
  biliMessagePanelState,
  biliMessagePanelController,
  type BiliMessageKind,
  type BiliMessageItem
} from "./message-panel-store";

const state = biliMessagePanelState;

const { panelRef, headerRef, isDragging } = useWindowDraggable({
  windowId: "bili-messages",
  storageKey: "lw_bili_messages_pos",
  defaultWidth: 360,
  defaultHeight: 560,
  minWidth: 300,
  minHeight: 380,
  resizable: false
});

interface TabDef {
  kind: BiliMessageKind;
  label: string;
}

const tabs: TabDef[] = [
  { kind: "reply", label: "回复" },
  { kind: "at", label: "@我" },
  { kind: "like", label: "点赞" },
  { kind: "system", label: "系统" },
  { kind: "private", label: "私信" }
];

const currentTabLabel = computed(() => {
  const match = tabs.find((t) => t.kind === state.activeKind);
  return match ? match.label : "消息";
});

const currentUnread = computed(() => {
  return Number(state.unreadCounts[state.activeKind] || 0);
});

const totalUnread = computed(() => {
  return Object.values(state.unreadCounts).reduce((acc, cur) => acc + (Number(cur) || 0), 0);
});

function onSwitchKind(kind: BiliMessageKind) {
  if (state.activeKind === kind) return;
  biliMessagePanelController.switchKind(kind);
}

function onMarkAllKnown() {
  biliMessagePanelController.markAllKnown(state.activeKind);
}

function onItemClick(item: BiliMessageItem) {
  biliMessagePanelController.markKnown(state.activeKind, item.id);
}

function onItemDblClick(item: BiliMessageItem) {
  onItemClick(item);
  window.open(item.url || "https://message.bilibili.com/", "_blank");
}

function onImagePreview(item: BiliMessageItem) {
  if (item.image) {
    onItemClick(item);
    images.open({
      source: item.image,
      title: `${item.title} 的图片`
    });
  }
}

function onOpenWeb() {
  window.open("https://message.bilibili.com/", "_blank");
}

function onRefresh() {
  biliMessagePanelController.switchKind(state.activeKind);
}

function onClose() {
  biliMessagePanelController.closePanel();
}
</script>

<style scoped>
.vue-bili-message-panel-wrapper {
  position: relative;
  z-index: 92;
}

.bili-tab-badge {
  display: inline-block;
  margin-left: 3px;
  padding: 0 4px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
  font-size: 9px;
  line-height: 14px;
  font-weight: 700;
  vertical-align: middle;
}

.bili-msg-drag-header {
  cursor: grab !important;
  user-select: none !important;
}

.bili-msg-drag-header:active,
.bili-message-panel.is-dragging .bili-msg-drag-header {
  cursor: grabbing !important;
}

.bili-msg-drag-header button {
  cursor: pointer !important;
}

.bili-web-link-btn,
.bili-refresh-btn,
.bili-close-btn {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: all 0.15s ease;
}

.bili-web-link-btn:hover,
.bili-refresh-btn:hover,
.bili-close-btn:hover {
  background: var(--surface-hover);
  color: var(--heading);
}

.bili-message-image-box {
  margin-top: 5px;
}

.bili-message-thumb {
  width: auto !important;
  max-width: 140px !important;
  max-height: 96px !important;
  border-radius: 6px !important;
  object-fit: cover !important;
  display: block;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.bili-message-thumb:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
</style>
