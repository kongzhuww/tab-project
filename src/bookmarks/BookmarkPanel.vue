<template>
  <aside
    id="bookmark-panel"
    class="bookmark-panel"
    :class="{
      open: state.open,
      pinned: state.pinned
    }"
    :style="panelStyle"
    aria-label="浏览器书签"
  >
    <section class="bookmark-panel-sheet">
      <header>
        <div>
          <h2>{{ state.title }}</h2>
          <p
            id="bookmark-feedback"
            :class="{ error: state.feedbackError }"
            :hidden="!state.feedbackVisible"
          >{{ state.feedbackText }}</p>
        </div>
        <button
          id="bookmark-pin"
          type="button"
          :aria-pressed="state.pinned ? 'true' : 'false'"
          :title="state.pinned ? '取消固定（取消后点击页面空白处会自动收起）' : '固定书签窗口，不因点击页面其他位置而消失'"
          @click="onTogglePin"
        >📌</button>
        <button
          id="bookmark-close"
          type="button"
          title="收起"
          @click="onClose"
        >✕</button>
      </header>
      <nav id="bookmark-page-tabs" class="bookmark-page-tabs" aria-label="书签页面" hidden></nav>
      <div id="bookmark-import-list" class="bookmark-import-list">
        <div v-if="state.items.length" class="bookmark-tree">
          <template v-for="item in state.items" :key="item.id">
            <!-- 文件夹项：严格对齐 .bookmark-tree-folder + .bookmark-folder-row 原生样式，支持就地展开折叠 -->
            <div
              v-if="item.isFolder"
              class="bookmark-tree-folder"
              :class="{ expanded: item.expanded }"
              :data-bookmark-folder-id="item.id"
            >
              <button
                type="button"
                class="bookmark-folder-row"
                :style="{ paddingLeft: (item.level ? (item.level * 16 + 12) + 'px' : undefined) }"
                :title="`打开书签文件夹：${item.title || '未命名'}`"
                @mouseenter="showFlyoutAtLevel(0, item, $event)"
                @mouseleave="scheduleCloseFlyout"
                @click="showFlyoutAtLevel(0, item, $event)"
                @contextmenu.prevent="handleItemContextMenu($event, item)"
              >
                <span class="bookmark-folder-icon" aria-hidden="true">📁</span>
                <span class="bookmark-folder-name">{{ item.title || "未命名" }}</span>
                <span class="bookmark-folder-arrow" aria-hidden="true">›</span>
              </button>
            </div>

            <!-- 网页书签项：严格对齐 .bookmark-import-item 图标、主副标题与网格 -->
            <article
              v-else
              class="bookmark-import-item"
              :style="{ paddingLeft: (item.level ? (item.level * 16 + 12) + 'px' : undefined) }"
              :data-bookmark-id="item.id"
              :title="`${item.title}\n${item.url}`"
              @click="handleItemClick(item)"
              @contextmenu.prevent="handleItemContextMenu($event, item)"
            >
              <img
                :src="getFaviconUrl(item.url)"
                alt=""
                loading="lazy"
                @error="handleFaviconError($event)"
              />
              <div class="bookmark-import-copy">
                <span class="bookmark-import-title">{{ item.title || item.url || "未命名书签" }}</span>
                <span class="bookmark-import-host">{{ getHostname(item.url) }}</span>
              </div>
              <button
                type="button"
                class="bookmark-import-add"
                title="添加到快捷方式"
                @click.stop="handleAddToLauncher(item)"
              >＋</button>
            </article>
          </template>
        </div>
        <p v-else class="bookmark-import-empty">{{ state.emptyText || "书签栏为空" }}</p>
      </div>

      <!-- 多级原生级联拓展栏 (Cascading Multi-Level Flyout Submenus: 支持2级、3级、4级及无限延伸) -->
      <aside
        v-for="(flyout, idx) in flyoutStack"
        :key="flyout.folderId"
        class="bookmark-flyout-subpanel"
        :style="{
          top: `${flyout.top}px`,
          left: `calc(100% + ${8 + idx * 286}px)`
        }"
        @mouseenter="cancelCloseFlyout"
        @mouseleave="scheduleCloseFlyout"
      >
        <div class="bookmark-flyout-list">
          <template v-if="flyout.items.length">
            <template v-for="subItem in flyout.items" :key="subItem.id">
              <!-- 下级子文件夹：悬停展开更深一级拓展栏 -->
              <div v-if="subItem.isFolder" class="bookmark-tree-folder">
                <button
                  type="button"
                  class="bookmark-folder-row"
                  @mouseenter="showFlyoutAtLevel(idx + 1, subItem, $event)"
                  @click="showFlyoutAtLevel(idx + 1, subItem, $event)"
                  @contextmenu.prevent="handleItemContextMenu($event, subItem)"
                >
                  <span class="bookmark-folder-icon" aria-hidden="true">📁</span>
                  <span class="bookmark-folder-name">{{ subItem.title || "未命名" }}</span>
                  <span class="bookmark-folder-arrow" aria-hidden="true">›</span>
                </button>
              </div>

              <!-- 下级书签：点击打开网页 -->
              <article
                v-else
                class="bookmark-import-item"
                :title="`${subItem.title}\n${subItem.url}`"
                @click="handleItemClick(subItem)"
                @contextmenu.prevent="handleItemContextMenu($event, subItem)"
              >
                <img
                  :src="getFaviconUrl(subItem.url)"
                  alt=""
                  loading="lazy"
                  @error="handleFaviconError($event)"
                />
                <div class="bookmark-import-copy">
                  <span class="bookmark-import-title">{{ subItem.title || subItem.url || "未命名书签" }}</span>
                  <span class="bookmark-import-host">{{ getHostname(subItem.url) }}</span>
                </div>
              </article>
            </template>
          </template>
          <p v-else class="bookmark-import-empty">该文件夹为空</p>
        </div>
      </aside>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { bookmarkPanelState, bookmarkPanelController, type BookmarkItem } from "./panel-store";
import { bookmarkMenuController } from "./menu-store";

const state = bookmarkPanelState;

interface FlyoutLevel {
  level: number;
  folderId: string;
  title: string;
  items: BookmarkItem[];
  top: number;
}

const flyoutStack = ref<FlyoutLevel[]>([]);

let flyoutTimer: ReturnType<typeof setTimeout> | undefined;

function showFlyoutAtLevel(targetLevel: number, item: BookmarkItem, event: MouseEvent) {
  if (flyoutTimer) clearTimeout(flyoutTimer);
  const win = typeof window !== "undefined" ? (window as any) : null;
  const svc = win?.LogicWeaverBookmarksService;
  const children = svc?.getChildrenOfFolder ? svc.getChildrenOfFolder(item.id) : [];
  const target = event.currentTarget as HTMLElement | null;
  const panelEl = document.getElementById("bookmark-panel");
  const panelRect = panelEl?.getBoundingClientRect();
  const targetRect = target?.getBoundingClientRect();
  let topOffset = targetRect && panelRect ? Math.max(0, targetRect.top - panelRect.top) : 0;
  if (topOffset > 280) topOffset = Math.max(20, topOffset - 100);

  // 截断 targetLevel 之后的所有级数，保证同级互斥切换
  flyoutStack.value = flyoutStack.value.slice(0, targetLevel);

  // 压入目标级数
  flyoutStack.value.push({
    level: targetLevel,
    folderId: item.id,
    title: item.title,
    items: children,
    top: topOffset
  });
}

function scheduleCloseFlyout() {
  if (flyoutTimer) clearTimeout(flyoutTimer);
  flyoutTimer = setTimeout(() => {
    flyoutStack.value = [];
  }, 240);
}

function cancelCloseFlyout() {
  if (flyoutTimer) clearTimeout(flyoutTimer);
}

const panelStyle = computed(() => {
  if (typeof state.positionLeft === "number") {
    return { left: `${state.positionLeft}px` };
  }
  return {};
});

function onTogglePin() {
  bookmarkPanelController.setPinned(!state.pinned);
  bookmarkPanelController.dispatch("toggle-pin", state.pinned);
}

function onClose() {
  bookmarkPanelController.close();
  bookmarkPanelController.dispatch("close");
}

function handleItemClick(item: BookmarkItem) {
  bookmarkPanelController.openBookmark(item);
}

function handleItemContextMenu(event: MouseEvent, item: BookmarkItem) {
  bookmarkPanelController.openContextMenu(item, event.clientX, event.clientY);
  const win = typeof window !== "undefined" ? (window as any) : null;
  const launcherGroups = Array.isArray(win?.launcherState?.groups)
    ? win.launcherState.groups.map((g: any) => g.name || g)
    : ["常用网站"];
  bookmarkMenuController.openMenu(
    {
      id: item.id,
      title: item.title,
      url: item.url,
      isFolder: item.isFolder,
      parentId: item.parentId
    },
    event.clientX,
    event.clientY,
    {
      hostOrCount: item.isFolder ? "浏览器文件夹" : (item.url || ""),
      note: (item.url && win?.bookmarkImportState?.remarks?.[item.url]) || "",
      launcherGroups
    }
  );
}

function getHostname(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url?: string): string {
  if (!url) return "assets/default-favicon.svg";
  const chromeApi = (globalThis as any).chrome;
  if (chromeApi?.runtime?.id) {
    return `chrome-extension://${chromeApi.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
  }
  return "assets/default-favicon.svg";
}

function handleFaviconError(event: Event) {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = "assets/default-favicon.svg";
  }
}

function handleAddToLauncher(item: BookmarkItem) {
  const win = typeof window !== "undefined" ? (window as any) : null;
  const targetPage = win?.launcherState?.activePage || "常用网站";
  if (win?.LogicWeaverBookmarksService?.saveBookmarkToLauncher) {
    void win.LogicWeaverBookmarksService.saveBookmarkToLauncher(targetPage);
  }
}
</script>

<style scoped>
.bookmark-panel {
  overflow: visible !important;
}

.bookmark-panel-sheet {
  position: relative;
  overflow: visible !important;
}

.bookmark-flyout-subpanel {
  position: absolute;
  left: calc(100% + 8px);
  width: 280px;
  max-height: 480px;
  background: var(--panel, #1e293b);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.14));
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.38);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 120;
  backdrop-filter: blur(8px);
  animation: flyout-appear 0.14s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes flyout-appear {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.bookmark-flyout-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #f8fafc);
  background: rgba(255, 255, 255, 0.03);
}

.bookmark-flyout-icon {
  font-size: 15px;
}

.bookmark-flyout-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bookmark-flyout-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bookmark-flyout-list::-webkit-scrollbar {
  width: 4px;
}
.bookmark-flyout-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>
