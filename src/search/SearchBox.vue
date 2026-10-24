<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { searchState, searchController } from "./store";
import { searchService, type WebSearchScope } from "../services/search.service";
import { gitHubService, type GitHubSearchRule } from "../services/github.service";

const currentGhRule = ref<GitHubSearchRule>(gitHubService.searchRule || "exact");
const currentWebScope = ref<WebSearchScope>(searchService.webScope || "all");

const WEB_SEARCH_SCOPE_METAS = [
  { id: "all", icon: "🌐", name: "全部", placeholder: "搜索，或输入网址直接打开", desc: "同时检索常用网站、书签与网页" },
  { id: "bookmarks", icon: "🔖", name: "书签", placeholder: "在书签中搜索…", desc: "仅在浏览器书签中查找" },
  { id: "launcher", icon: "⭐", name: "常用网站", placeholder: "在常用网站中搜索…", desc: "仅在首页常用网站中查找" }
] as const;

const activeWebScopeMeta = computed(() => {
  return WEB_SEARCH_SCOPE_METAS.find((s) => s.id === currentWebScope.value) || WEB_SEARCH_SCOPE_METAS[0];
});

const isWebHistoryActive = computed(() => {
  return (
    searchState.mode === "web" &&
    searchState.isSuggestionsVisible &&
    searchState.suggestions.length > 0
  );
});

function onToggleWebHistory(e: MouseEvent) {
  e.preventDefault();
  if (isWebHistoryActive.value) {
    searchController.setSuggestionsVisible(false);
  } else {
    if (searchState.query) {
      searchController.setQuery("");
    }
    void searchService.loadWebRecentRecommendations(true);
  }
}

const GH_SEARCH_RULES = [
  { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
  { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
  { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
  { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
] as const;

const activeGhRuleMeta = computed(() => {
  return GH_SEARCH_RULES.find((r) => r.id === currentGhRule.value) || GH_SEARCH_RULES[0];
});

function onCycleGhRule(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  const next = gitHubService.cycleSearchRule();
  currentGhRule.value = next;
  searchController.update({
    placeholder: `${activeGhRuleMeta.value.name}搜索 GitHub 仓库…`
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
    :placeholder="searchState.placeholder"
    :value="searchState.query"
    autocomplete="off"
    aria-autocomplete="list"
    aria-controls="search-suggestions"
    @input="onInput"
    @focus="onInputFocus"
    @click="onInputClick"
    @keydown.enter="onSubmit"
  />
  <button
    v-if="searchState.mode === 'web'"
    id="search-web-scope-btn"
    class="search-history-btn search-web-scope-btn"
    :class="[`scope-${activeWebScopeMeta.id}`, { active: isWebHistoryActive }]"
    type="button"
    title="点击查看最近的常用网站与书签历史记录"
    aria-label="历史记录"
    @click="onToggleWebHistory"
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
    <span>历史记录</span>
  </button>
  <button
    v-if="searchState.mode === 'netease'"
    id="search-netease-history-btn"
    class="search-history-btn"
    :class="{ active: isHistoryActive }"
    type="button"
    title="历史记录（点击加载或收起最近播放）"
    aria-label="历史记录"
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
    <span>历史记录</span>
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
    title="热门推荐（点击加载或收起B站热门推荐）"
    aria-label="热门推荐"
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
    <span>推荐</span>
  </button>
  <button
    v-if="searchState.mode === 'qcc'"
    id="search-qcc-tips-btn"
    class="search-history-btn search-qcc-btn"
    :class="{ active: isQccActive }"
    type="button"
    title="查企业指南（点击查看企查查/老板/税号检索指引）"
    aria-label="企业查询指引"
    @click="onToggleQccTips"
  >
    <span class="gh-search-rule-icon">🏢</span>
    <span>查企业</span>
  </button>
  <button
    id="search-clear-btn"
    class="search-clear-btn"
    type="button"
    title="清空搜索内容"
    aria-label="清空搜索内容"
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
