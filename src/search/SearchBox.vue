<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { searchState, searchController, type SearchSuggestionItem } from "./store";
import { searchService } from "../services/search.service";
import { gitHubService, type GitHubSearchRule } from "../services/github.service";
import { launcherRuntime } from "../launcher/runtime";
import { launcherService } from "../services/launcher.service";
import { useContextMenu } from "../sdk/interactions";
import { t } from "../i18n";

const searchPlaceholder = computed(() => {
  if (searchState.mode === "web") return t("search.web.placeholder");
  if (searchState.mode === "bilibili") return t("search.bilibili.placeholder");
  if (searchState.mode === "github") return t("search.github.placeholder");
  if (searchState.mode === "netease") return t("search.netease.placeholder");
  if (searchState.mode === "qcc") return t("search.qcc.placeholder");
  return searchState.placeholder;
});

const currentGhRule = ref<GitHubSearchRule>(gitHubService.searchRule || "exact");
const webStatus = computed(() => !searchState.hasQuery ? t("search.status.history") :
  /^\/bm[\s:]/i.test(searchState.query.trim()) ? t("search.status.bookmarks") :
  /^\/sites[\s:]/i.test(searchState.query.trim()) ? t("search.status.sites") : t("search.status.all"));
const GH_SEARCH_RULES = computed(() => [
  { id: "exact", icon: "🎯", name: t("search.rule.exact"), desc: t("search.rule.exactDesc") },
  { id: "fuzzy", icon: "🔍", name: t("search.rule.fuzzy"), desc: t("search.rule.fuzzyDesc") },
  { id: "topic", icon: "🏷️", name: t("search.rule.topic"), desc: t("search.rule.topicDesc") },
  { id: "smart", icon: "✨", name: t("search.rule.smart"), desc: t("search.rule.smartDesc") }
] as const);

const activeGhRuleMeta = computed(() => {
  return GH_SEARCH_RULES.value.find((r) => r.id === currentGhRule.value) || GH_SEARCH_RULES.value[0];
});

function onCycleGhRule(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  const next = gitHubService.cycleSearchRule();
  currentGhRule.value = next;
  searchController.update({
    placeholder: t("search.placeholder.gh", { rule: activeGhRuleMeta.value.name })
  });
  if (searchState.query) {
    searchService.scheduleSuggestions(searchState.query);
  }
}

const isHistoryActive = computed(() => {
  return (
    searchState.mode === "netease" &&
    searchState.isSuggestionsVisible &&
    searchState.suggestions.length > 0
  );
});

const isBiliRecActive = computed(() => {
  return (
    searchState.mode === "bilibili" &&
    searchState.isSuggestionsVisible &&
    searchState.suggestions.length > 0
  );
});

const isQccActive = computed(() => {
  return (
    searchState.mode === "qcc" &&
    searchState.isSuggestionsVisible &&
    searchState.suggestions.length > 0
  );
});

function onToggleQccTips(e: MouseEvent) {
  e.preventDefault();
  if (isQccActive.value) {
    searchController.setSuggestionsVisible(false);
  } else {
    if (searchState.query) {
      searchController.setQuery("");
    }
    void searchService.loadQccRecommendations(true);
  }
}

function onToggleClick(e: MouseEvent) {
  e.preventDefault();
  searchController.cycleMode();
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  searchController.setQuery(target.value);
}

function onClearClick(e: MouseEvent) {
  e.preventDefault();
  searchController.clear();
}

function onSubmit() {
  searchController.submit();
}

function onInputFocus() {
  searchService.handleFocus();
}

function onInputClick() {
  if (!searchState.isSuggestionsVisible) {
    searchService.handleFocus();
  }
}

function onToggleHistory(e: MouseEvent) {
  e.preventDefault();
  if (isHistoryActive.value) {
    searchController.setSuggestionsVisible(false);
  } else {
    if (searchState.query) {
      searchController.setQuery("");
    }
    void searchService.loadNeteaseRecentRecommendations(true);
  }
}

function onToggleBiliRec(e: MouseEvent) {
  e.preventDefault();
  if (isBiliRecActive.value) {
    searchController.setSuggestionsVisible(false);
  } else {
    if (searchState.query) {
      searchController.setQuery("");
    }
    void searchService.loadBilibiliRecommendations(true);
  }
}

const inputRef = ref<HTMLInputElement | null>(null);
const selectedSuggestionIndex = ref(-1);

watch(() => searchState.suggestions, () => {
  selectedSuggestionIndex.value = -1;
});
watch(() => searchState.isSuggestionsVisible, (visible) => {
  if (!visible) selectedSuggestionIndex.value = -1;
});

function onKeydown(e: KeyboardEvent) {
  if (!searchState.isSuggestionsVisible || !searchState.suggestions.length) {
    if (e.key === "Enter") onSubmit();
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (selectedSuggestionIndex.value < searchState.suggestions.length - 1) {
      selectedSuggestionIndex.value++;
    } else {
      selectedSuggestionIndex.value = 0;
    }
    scrollSelectedSuggestionIntoView();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (selectedSuggestionIndex.value > 0) {
      selectedSuggestionIndex.value--;
    } else {
      selectedSuggestionIndex.value = searchState.suggestions.length - 1;
    }
    scrollSelectedSuggestionIntoView();
  } else if (e.key === "Enter") {
    if (selectedSuggestionIndex.value >= 0 && selectedSuggestionIndex.value < searchState.suggestions.length) {
      e.preventDefault();
      onSuggestionClick(searchState.suggestions[selectedSuggestionIndex.value]);
    } else {
      onSubmit();
    }
  } else if (e.key === "Escape") {
    searchController.setSuggestionsVisible(false);
  }
}

function scrollSelectedSuggestionIntoView() {
  const container = document.getElementById("search-suggestions");
  if (!container) return;
  const items = container.querySelectorAll(".search-suggestion");
  const activeItem = items[selectedSuggestionIndex.value] as HTMLElement | undefined;
  if (activeItem) {
    activeItem.scrollIntoView({ block: "nearest" });
  }
}

const contextItem = ref<SearchSuggestionItem | null>(null);
const contextMenuVisible = ref(false);
const contextMenuPos = ref({ x: 0, y: 0 });

const { menuRef: contextMenuRef, style: contextMenuStyle } = useContextMenu({
  visible: () => contextMenuVisible.value,
  anchor: () => contextMenuPos.value,
  dismiss: () => { contextMenuVisible.value = false; }
});

function onSuggestionContextMenu(item: SearchSuggestionItem, e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  contextItem.value = item;
  contextMenuPos.value = { x: e.clientX, y: e.clientY };
  contextMenuVisible.value = true;
}

const canLocateLauncher = computed(() => {
  if (!contextItem.value) return false;
  if (contextItem.value.launcherLinkId) return true;
  if (!contextItem.value.url) return false;
  const links = launcherService.getState().links || [];
  return links.some(l => l.url === contextItem.value?.url);
});

const canLocateBookmark = computed(() => {
  if (!contextItem.value) return false;
  return Boolean(contextItem.value.bookmarkId || contextItem.value.badge?.text?.includes("书签"));
});

async function onLocateBookmark() {
  const item = contextItem.value;
  contextMenuVisible.value = false;
  if (!item) return;

  searchController.setSuggestionsVisible(false);

  // 1. 查找目标书签节点与所属板块
  let targetNodeId = item.bookmarkId;
  let targetUrl = item.url || "";

  // 2. 切换主视图到书签看板 (BookmarkBoard)
  const sitesViewBtn = document.querySelector(".sites-view-switch button:nth-child(2)") as HTMLButtonElement | null;
  if (sitesViewBtn) {
    sitesViewBtn.click();
  }

  // 3. 延时寻找目标 DOM 并高亮
  setTimeout(() => {
    let el: HTMLElement | null = null;
    if (targetNodeId) {
      el = document.querySelector(`[data-bookmark-node="${targetNodeId}"]`) as HTMLElement | null;
    }
    if (!el && targetUrl) {
      el = document.querySelector(`.bookmark-board [href="${targetUrl}"]`) as HTMLElement | null;
    }

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      el.classList.remove("launcher-locate-highlight");
      void el.offsetWidth;
      el.classList.add("launcher-locate-highlight");
      setTimeout(() => {
        el?.classList.remove("launcher-locate-highlight");
      }, 3200);
    }
  }, 160);
}

async function onLocateLauncher() {
  const item = contextItem.value;
  contextMenuVisible.value = false;
  if (!item) return;

  let targetId = item.launcherLinkId;
  if (!targetId && item.url) {
    const found = launcherService.getState().links.find(l => l.url === item.url);
    if (found) targetId = String(found.id);
  }
  if (!targetId) return;

  searchController.setSuggestionsVisible(false);
  await launcherRuntime.locateLink(targetId);
}

function onSuggestionClick(item: any) {
  contextMenuVisible.value = false;
  searchController.onSuggestionClick(item);
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target?.closest("#search")) {
    searchController.setSuggestionsVisible(false);
  }
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  searchController.setFocusAction(() => {
    inputRef.value?.focus();
    searchService.handleFocus();
  });
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>

<template>
  <button
    id="search-mode-toggle"
    class="s-icon"
    type="button"
    :title="searchState.toggleTitle"
    :aria-label="searchState.toggleAriaLabel"
    :style="searchState.modeColor ? { color: searchState.modeColor } : {}"
    @click="onToggleClick"
  >
    <img
      v-if="searchState.modeIconSrc"
      :src="searchState.modeIconSrc"
      alt=""
      style="width:19px;height:19px;display:block;"
    />
    <span v-else aria-hidden="true">{{ searchState.modeIconText || "⌕" }}</span>
  </button>
  <input
    id="search-input"
    ref="inputRef"
    :placeholder="searchPlaceholder"
    :value="searchState.query"
    autocomplete="off"
    aria-autocomplete="list"
    aria-controls="search-suggestions"
    @input="onInput"
    @focus="onInputFocus"
    @click="onInputClick"
    @keydown="onKeydown"
  />
  <span
    v-if="searchState.mode === 'web'"
    class="search-web-status"
    :title="searchState.hasQuery ? t('search.webStatus.query') : t('search.webStatus.idle')"
  >{{ webStatus }}</span>
  <button
    v-if="searchState.mode === 'netease'"
    id="search-netease-history-btn"
    class="search-history-btn"
    :class="{ active: isHistoryActive }"
    type="button"
    :title="t('search.historyBtnTip')"
    :aria-label="t('search.historyBtn')"
    @click="onToggleHistory"
  >
    <svg
      class="search-history-icon"
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
    <span>{{ t('search.historyBtn') }}</span>
  </button>
  <button
    v-if="searchState.mode === 'github'"
    id="search-github-rule-btn"
    class="search-history-btn search-gh-rule-btn"
    :class="`rule-${activeGhRuleMeta.id}`"
    type="button"
    :title="`当前匹配规则：${activeGhRuleMeta.name}（${activeGhRuleMeta.desc}）\n点击切换下一个规则`"
    aria-label="切换GitHub搜索规则"
    @click="onCycleGhRule"
  >
    <span class="gh-search-rule-icon">{{ activeGhRuleMeta.icon }}</span>
    <span>{{ activeGhRuleMeta.name }}</span>
  </button>
  <button
    v-if="searchState.mode === 'bilibili'"
    id="search-bilibili-rec-btn"
    class="search-history-btn search-bili-btn"
    :class="{ active: isBiliRecActive }"
    type="button"
    :title="t('search.biliRecBtnTip')"
    :aria-label="t('search.biliRecBtn')"
    @click="onToggleBiliRec"
  >
    <svg
      class="search-history-icon"
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
    <span>{{ t('search.biliRecBtn') }}</span>
  </button>
  <button
    v-if="searchState.mode === 'qcc'"
    id="search-qcc-tips-btn"
    class="search-history-btn search-qcc-btn"
    :class="{ active: isQccActive }"
    type="button"
    :title="t('search.qccTipsBtnTip')"
    :aria-label="t('search.qccTipsAria')"
    @click="onToggleQccTips"
  >
    <span class="gh-search-rule-icon">🏢</span>
    <span>{{ t('search.qccTipsBtn') }}</span>
  </button>
  <button
    id="search-clear-btn"
    class="search-clear-btn"
    type="button"
    :title="t('search.clearBtnTip')"
    :aria-label="t('search.clearBtnTip')"
    :hidden="!searchState.hasQuery"
    @click="onClearClick"
  >
    ✕
  </button>
  <div
    id="search-suggestions"
    class="search-suggestions"
    role="listbox"
    :hidden="!searchState.isSuggestionsVisible || !searchState.suggestions.length"
  >
    <button
      v-for="(item, idx) in searchState.suggestions"
      :key="item.id"
      class="search-suggestion"
      :class="{ 'is-selected': idx === selectedSuggestionIndex }"
      type="button"
      role="option"
      @click="onSuggestionClick(item)"
      @contextmenu="onSuggestionContextMenu(item, $event)"
      @mouseenter="selectedSuggestionIndex = idx"
    >
      <img
        v-if="item.iconSrc"
        :src="item.iconSrc"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span class="search-suggestion-main">
        <span class="search-suggestion-title">{{ item.title }}</span>
        <span v-if="item.meta" class="search-suggestion-meta">{{ item.meta }}</span>
      </span>
      <span
        v-if="item.badge"
        :class="['search-suggestion-badge', item.badge.className]"
        :title="item.badge.title"
      >
        <i v-if="item.badge.icon" class="badge-icon">{{ item.badge.icon }}</i>
        <span>{{ item.badge.text }}</span>
      </span>
    </button>
  </div>

  <!-- 搜索建议右键菜单（支持定位到常用网站位置） -->
  <Teleport to="body">
    <div
      v-if="contextMenuVisible"
      ref="contextMenuRef"
      class="folder-menu search-suggestion-context-menu"
      role="menu"
      :style="contextMenuStyle"
      @pointerdown.stop
      @contextmenu.prevent.stop
    >
      <div class="search-suggestion-menu-header">
        <strong>{{ contextItem?.title }}</strong>
        <small v-if="contextItem?.url">{{ contextItem?.url }}</small>
      </div>
      <button
        v-if="canLocateLauncher"
        type="button"
        class="search-suggestion-menu-btn highlight-locate-btn"
        @click="onLocateLauncher"
      >
        <span>🎯 定位到常用网站</span>
      </button>
      <button
        v-if="canLocateBookmark"
        type="button"
        class="search-suggestion-menu-btn highlight-locate-bookmark-btn"
        @click="onLocateBookmark"
      >
        <span>🔖 定位到书签</span>
      </button>
      <button
        type="button"
        class="search-suggestion-menu-btn"
        @click="onSuggestionClick(contextItem)"
      >
        <span>🔗 打开此网页</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.search-web-status {
  display: inline-flex;
  align-items: center;
  flex: none;
  height: 26px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: var(--panel);
  color: var(--muted);
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}

.search-suggestion-context-menu {
  min-width: 190px;
  max-width: 280px;
  padding: 6px;
  border-radius: 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22), 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 3px;
  z-index: 10000;
}
.search-suggestion-menu-header {
  padding: 6px 8px 8px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3px;
}
.search-suggestion-menu-header strong {
  display: block;
  font-size: 12px;
  color: var(--heading);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-suggestion-menu-header small {
  display: block;
  font-size: 10px;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
}
.search-suggestion-menu-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 12px;
  font-weight: 500;
  border-radius: 7px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
}
.search-suggestion-menu-btn:hover {
  background: var(--surface-hover);
  color: var(--heading);
}
.highlight-locate-btn {
  color: #ea580c;
  font-weight: 600;
}
.highlight-locate-btn:hover {
  background: rgba(234, 88, 12, 0.12);
  color: #c2410c;
}

.highlight-locate-bookmark-btn {
  color: #0284c7;
  font-weight: 600;
}
.highlight-locate-bookmark-btn:hover {
  background: rgba(2, 132, 199, 0.12);
  color: #0369a1;
}

.search-suggestion.is-selected {
  background: var(--surface-hover) !important;
  border-color: rgba(249, 115, 22, 0.4) !important;
}
</style>
