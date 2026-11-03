<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { searchState, searchController } from "./store";
import { searchService } from "../services/search.service";
import { gitHubService, type GitHubSearchRule } from "../services/github.service";
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

function onSuggestionClick(item: any) {
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
    @keydown.enter="onSubmit"
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
      v-for="item in searchState.suggestions"
      :key="item.id"
      class="search-suggestion"
      type="button"
      role="option"
      @click="onSuggestionClick(item)"
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
</style>
