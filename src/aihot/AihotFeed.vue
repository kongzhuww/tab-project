<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from "vue";
import { useCardActivity } from "../core/useCardActivity";

import {
  aihotFeedState,
  aihotFeedController,
  type AiHotViewType,
  type AiHotFeedArticle,
  type AiHotLeaderboardItem
} from "./aihot-feed-store";
import { aihotViewerController } from "../viewers/store";
import { aiHotService } from "../services/aihot.service";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { notifications } from "../sdk/notifications";
import { t, currentLanguage } from "../i18n";
import RssChannels from "./RssChannels.vue";

const state = aihotFeedState;

const { active, standalone } = useCardActivity("daily-aihot", "/aihot.html");
const owner = Symbol("aihot-feed-view");
const rssActive = ref(false);
let initialized = false;
watch(active, visible => {
  if (!visible) { aiHotService.pause(owner); return; }
  if (!initialized) {
    initialized = true;
    state.currentView = standalone ? "leaderboard" : "feed";
    try {
      const saved = localStorage.getItem("lw-info-feed-view");
      if (saved === "leaderboard" || saved === "feed" || saved === "daily") state.currentView = saved;
      const category = localStorage.getItem("lw-aihot-feed-cat");
      if (category && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(category)) state.feedCategory = category;
      if (localStorage.getItem("lw-aihot-feed-window") === "7d") state.feedWindow = "7d";
    } catch {}
  }
  if (state.currentView !== 'feed' || !rssActive.value) aiHotService.activate(owner);
}, { immediate: true, flush: "sync" });
onBeforeUnmount(() => {
  aiHotService.pause(owner);
});
const viewTitle = computed(() => {
  switch (state.currentView) {
    case "leaderboard":
      return t("aihot.view.leaderboard");
    case "feed":
      return t("aihot.view.feed");
    case "daily":
      return t("aihot.view.daily");
    default:
      return t("aihot.view.default");
  }
});

const displayStatusMessage = computed(() => {
  if (state.statusMessage === "已获取来源数据。") return t("aihot.status.dataFetched");
  if (state.statusMessage === "正在显示缓存，检查更新中…") return t("aihot.status.showingCache");
  if (state.statusMessage === "保留当前已读取的数据；没有数据时显示空列表。") return t("aihot.status.retainedData");
  return state.statusMessage;
});

// 筛选后的排行榜
const filteredLeaderboard = computed(() => {
  let list = state.leaderboard;
  if (state.leaderboardProvider) {
    const p = state.leaderboardProvider.toLowerCase();
    list = list.filter((m) => m.provider.toLowerCase().includes(p));
  }
  if (state.leaderboardSearch) {
    const q = state.leaderboardSearch.trim().toLowerCase();
    list = list.filter(
      (m) =>
        m.model.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q)
    );
  }
  return list;
});

const CATEGORY_LABEL_MAP: Record<string, string> = {
  "ai-models": "模型发布",
  "ai-products": "产品动态",
  "industry": "行业动态",
  "paper": "学术论文",
  "tip": "观点教程"
};

// 筛选后的精选资讯：兼容中英文分类映射，若后端已根据分类请求则直接展示完整结果
const filteredFeedArticles = computed(() => {
  if (!state.feedCategory) return state.feedArticles;
  const targetKey = state.feedCategory.toLowerCase();
  const targetLabel = CATEGORY_LABEL_MAP[targetKey] || "";
  const filtered = state.feedArticles.filter((a) => {
    const cat = (a.category || "").toLowerCase();
    return (
      cat === targetKey ||
      (targetLabel && cat.includes(targetLabel)) ||
      (targetKey && cat.includes(targetKey))
    );
  });
  return filtered.length ? filtered : state.feedArticles;
});

// 筛选与排序：英文模式下若有 originalTitle 则优先展示，并把具备英文原生标题的内容排在前面
const displayedFeedArticles = computed(() => {
  const base = filteredFeedArticles.value;
  if (currentLanguage.value !== "en") return base;
  return [...base].sort((a, b) => {
    const aEn = Boolean(a.originalTitle && /[a-zA-Z]{3,}/.test(a.originalTitle));
    const bEn = Boolean(b.originalTitle && /[a-zA-Z]{3,}/.test(b.originalTitle));
    if (aEn && !bEn) return -1;
    if (!aEn && bEn) return 1;
    return 0;
  });
});

function getArticleTitle(article: AiHotFeedArticle): string {
  if (currentLanguage.value === "en" && article.originalTitle) {
    return article.originalTitle;
  }
  return article.title;
}

function getArticleSourceName(article: AiHotFeedArticle): string {
  const name = article.sourceName || "AI HOT";
  if (currentLanguage.value === "en" && name.includes("：")) {
    return name.split("：")[0].trim();
  }
  return name;
}

const hasContent = computed(() => {
  if (state.currentView === "leaderboard") return filteredLeaderboard.value.length > 0;
  if (state.currentView === "feed") return displayedFeedArticles.value.length > 0;
  if (state.currentView === "daily") return !!state.dailyReport;
  return false;
});

function handleSwitchView(view: AiHotViewType) {
  if (view !== 'feed' && rssActive.value) {
    rssActive.value = false;
    aiHotService.activate(owner);
  }
  void aiHotService.switchView(view);
}

function handleRssSelected(selected: boolean) {
  rssActive.value = selected;
  if (!active.value || state.currentView !== 'feed') return;
  if (selected) aiHotService.pause(owner);
  else aiHotService.activate(owner);
}

function handleRefresh() {
  void aiHotService.refresh();
}

function handleOpenFeedArticle(article: AiHotFeedArticle) {
  const win = window as any;
  if (typeof win.openAiHotArticle === "function") {
    win.openAiHotArticle(article.raw || article, article.url);
    return;
  }
  aihotViewerController.openArticle(
    {
      id: article.id,
      title: article.title,
      summary: article.summary,
      sourceName: article.sourceName,
      published: article.published,
      url: article.url
    },
    ""
  );
  aihotFeedController.dispatch("select-article", article);
}

function handleSelectProvider(provider: string) {
  state.leaderboardProvider = provider;
  aihotFeedController.dispatch("select-provider", provider);
}

function handleSelectCategory(cat: string) {
  state.feedCategory = cat;
  aihotFeedController.dispatch("change-category", cat);
  try { localStorage.setItem("lw-aihot-feed-cat", cat); } catch {}
}

function handleSelectWindow(win: "24h" | "7d") {
  state.feedWindow = win;
  aihotFeedController.dispatch("change-window", win);
  try { localStorage.setItem("lw-aihot-feed-window", win); } catch {}
}

function handleSelectDailyDate(date: string) {
  state.activeDailyDate = date;
  aihotFeedController.dispatch("select-daily-date", date);
}
</script>

<template>
  <div class="vue-aihot-wrapper" :inert="!active">
    <section id="daily-aihot" class="card wide" :class="{ 'card-fullscreen': fullscreenCardState.activeId === 'daily-aihot' }">
      <div class="aihot-workspace">
      <nav id="aihot-tabs" class="aihot-tabs" :aria-label="t('aihot.nav.label')">
        <div class="aihot-nav-wrap"><button type="button" data-view="leaderboard" class="aihot-nav-card rank" :class="{ active: state.currentView === 'leaderboard' }" :aria-pressed="state.currentView === 'leaderboard'" @click="handleSwitchView('leaderboard')">
          <span class="aihot-nav-main"><span class="aihot-nav-icon" aria-hidden="true">🏆</span><span class="aihot-nav-copy"><strong>{{ t('aihot.nav.rank') }}</strong><small>{{ t('aihot.nav.rankDesc') }}</small></span></span><span class="aihot-nav-badge">RANK</span>
        </button></div>
        <div class="aihot-nav-wrap"><button type="button" data-view="feed" class="aihot-nav-card feed" :class="{ active: state.currentView === 'feed' }" :aria-pressed="state.currentView === 'feed'" @click="handleSwitchView('feed')">
          <span class="aihot-nav-main"><span class="aihot-nav-icon" aria-hidden="true">✦</span><span class="aihot-nav-copy"><strong>{{ t('aihot.nav.feed') }}</strong><small>{{ t('aihot.nav.feedDesc') }}</small></span></span><span class="aihot-nav-badge">NEWS</span>
        </button></div>
        <div class="aihot-nav-wrap"><button type="button" data-view="daily" class="aihot-nav-card daily" :class="{ active: state.currentView === 'daily' }" :aria-pressed="state.currentView === 'daily'" @click="handleSwitchView('daily')">
          <span class="aihot-nav-main"><span class="aihot-nav-icon" aria-hidden="true">📰</span><span class="aihot-nav-copy"><strong>{{ t('aihot.nav.daily') }}</strong><small>{{ t('aihot.nav.dailyDesc') }}</small></span></span><span class="aihot-nav-badge">DAILY</span>
        </button></div>
      </nav>
      <main class="aihot-main">
        <header class="card-head">
          <span class="bar" style="background: linear-gradient(180deg,#34d399,#38bdf8)"></span>
          <h2 id="aihot-title">{{ viewTitle }}</h2>
          <button v-if="!rssActive || state.currentView !== 'feed'" id="aihot-refresh" class="icon-btn" :title="t('aihot.refreshTip')" :disabled="!active || state.isLoading" type="button" @click="handleRefresh">↻</button>
        </header>
        <RssChannels v-if="state.currentView === 'feed'" :active="active" @custom-selected="handleRssSelected" />

      <!-- 辅助筛选工具栏 Subbar -->
      <div
        id="aihot-subbar"
        class="aihot-subbar"
        v-if="state.currentView === 'leaderboard' || (state.currentView === 'feed' && !rssActive)"
      >
        <!-- 1. 模型榜筛选工具栏 -->
        <template v-if="state.currentView === 'leaderboard'">
          <div class="aihot-pills" id="aihot-lb-provider-pills">
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: !state.leaderboardProvider }"
              @click="handleSelectProvider('')"
            >
              {{ t('aihot.allProviders') }}
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.leaderboardProvider === 'Anthropic' }"
              @click="handleSelectProvider('Anthropic')"
            >
              Anthropic
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.leaderboardProvider === 'OpenAI' }"
              @click="handleSelectProvider('OpenAI')"
            >
              OpenAI
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.leaderboardProvider === 'Meta' }"
              @click="handleSelectProvider('Meta')"
            >
              Meta
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.leaderboardProvider === 'Google' }"
              @click="handleSelectProvider('Google')"
            >
              Google
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.leaderboardProvider === 'DeepSeek' }"
              @click="handleSelectProvider('DeepSeek')"
            >
              DeepSeek
            </button>
          </div>
          <div class="aihot-subbar-right">
            <input
              type="text"
              class="aihot-search-input"
              id="aihot-lb-search"
              :placeholder="t('aihot.searchPlaceholder')"
              v-model="state.leaderboardSearch"
            />
          </div>
        </template>

        <!-- 2. 精选资讯筛选工具栏 -->
        <template v-else-if="state.currentView === 'feed'">
          <div class="aihot-pills" id="aihot-cat-pills">
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: !state.feedCategory }"
              @click="handleSelectCategory('')"
            >
              {{ t('aihot.category.all') }}
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'ai-models' }"
              @click="handleSelectCategory('ai-models')"
            >
              {{ t('aihot.category.models') }}
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'ai-products' }"
              @click="handleSelectCategory('ai-products')"
            >
              {{ t('aihot.category.products') }}
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'industry' }"
              @click="handleSelectCategory('industry')"
            >
              {{ t('aihot.category.industry') }}
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'paper' }"
              @click="handleSelectCategory('paper')"
            >
              {{ t('aihot.category.paper') }}
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'tip' }"
              @click="handleSelectCategory('tip')"
            >
              {{ t('aihot.category.tip') }}
            </button>
          </div>
          <div class="aihot-subbar-right">
            <div class="aihot-pills" id="aihot-window-pills">
              <button
                type="button"
                class="aihot-pill"
                :class="{ active: state.feedWindow === '24h' }"
                @click="handleSelectWindow('24h')"
              >
                {{ t('aihot.window.24h') }}
              </button>
              <button
                type="button"
                class="aihot-pill"
                :class="{ active: state.feedWindow === '7d' }"
                @click="handleSelectWindow('7d')"
              >
                {{ t('aihot.window.7d') }}
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- 核心内容展示区 -->
      <p v-if="!rssActive && state.statusMessage" class="muted small" role="status">{{ displayStatusMessage }}</p>
      <p v-if="!rssActive && state.errorMessage && hasContent" class="notice" role="status">{{ state.errorMessage }}</p>
      <div v-if="!rssActive" id="aihot-body">
        <!-- 错误提示（无可用内容时呈现） -->
        <p class="notice" v-if="state.errorMessage && !hasContent">
          {{ state.errorMessage }}
        </p>

        <!-- 加载中状态（无可用内容时呈现） -->
        <p class="muted small" v-else-if="state.isLoading && !hasContent">
          {{ t('aihot.loading') }}
        </p>

        <!-- 1. 视图：🏆 模型榜 (leaderboard) -->
        <div class="aihot-lb-list" v-else-if="state.currentView === 'leaderboard'">
          <a
            v-for="(m, mIdx) in filteredLeaderboard"
            :key="m.model + mIdx"
            :href="m.href"
            target="_blank"
            rel="noreferrer"
            class="aihot-lb-row"
          >
            <div
              class="aihot-lb-rank"
              :class="{
                'rank-1': m.rank === '1',
                'rank-2': m.rank === '2',
                'rank-3': m.rank === '3'
              }"
            >
              {{ m.rank }}
            </div>
            <div class="aihot-lb-model">
              <div class="aihot-lb-name">{{ m.model }}</div>
              <div class="aihot-lb-provider">{{ m.provider || "权威厂商" }}</div>
            </div>
            <div class="aihot-lb-score" title="AIHOT 共识评分">
              ★ {{ m.score || "-" }}
            </div>
            <div class="aihot-lb-date aihot-lb-col-hide-mobile" title="上线日期">
              {{ m.releaseDate || "-" }}
            </div>
            <div class="aihot-lb-price aihot-lb-col-hide-mobile" title="API 价格（¥/百万Token）">
              <div>入 <strong>{{ m.inputPrice || "-" }}</strong></div>
              <div>出 <strong>{{ m.outputPrice || "-" }}</strong></div>
            </div>
            <div style="text-align:right">
              <span class="aihot-btn" style="font-size:10.5px">详情 ↗</span>
            </div>
          </a>
          <p class="muted small" v-if="!filteredLeaderboard.length">
            没有找到与 “{{ state.leaderboardSearch }}” 匹配的模型。
          </p>
        </div>

        <!-- 3. 视图：✦ 精选资讯 (feed) -->
        <div class="aihot-grid" v-else-if="state.currentView === 'feed'">
          <a
            v-for="(item, itemIdx) in displayedFeedArticles"
            :key="item.id || item.title + itemIdx"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
            class="aihot-item"
            @click.prevent="handleOpenFeedArticle(item)"
          >
            <span class="aihot-rank" :class="{ top: itemIdx < 3 }">
              {{ itemIdx + 1 }}
            </span>
            <div style="min-width:0;flex:1">
              <div class="aihot-t">{{ getArticleTitle(item) }}</div>
              <p class="aihot-s" v-if="item.summary">{{ item.summary }}</p>
              <div class="aihot-m">
                <span>
                  <span
                    class="aihot-tag"
                    style="margin-right:6px"
                    v-if="item.category"
                  >
                    {{ item.category }}
                  </span>
                  {{ getArticleSourceName(item) }}
                </span>
                <time>{{ item.published }}</time>
              </div>
            </div>
          </a>
          <p class="muted small" v-if="!displayedFeedArticles.length">
            {{ t('aihot.emptyFeed') }}
          </p>
        </div>

        <!-- 4. 视图：📰 官方日报 (daily) -->
        <div class="aihot-daily-wrap" v-else-if="state.currentView === 'daily'">
          <!-- 日期切换栏 -->
          <div class="daily-news-days" v-if="state.dailyArchives.length">
            <button type="button" :class="{ active: !state.activeDailyDate }" @click="handleSelectDailyDate('')">最新</button>
            <button
              v-for="arc in state.dailyArchives"
              :key="arc.date"
              type="button"
              :class="{ active: arc.date === state.activeDailyDate }"
              @click="handleSelectDailyDate(arc.date)"
            >
              {{ arc.date.slice(5) }}
            </button>
          </div>

          <p v-if="state.dailyArchiveWarning" class="muted small" role="status">{{ state.dailyArchiveWarning }}</p>
          <p v-if="!state.dailyReport && !state.isLoading" class="muted small">暂无当日日报内容。</p>
          <!-- 导语头条 -->
          <div class="aihot-daily-lead" v-if="state.dailyReport">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
              <h3 style="margin:0">📅 AIHOT 官方行业晨报 · {{ state.dailyReport.date }}</h3>
              <a
                v-if="state.dailyReport.links?.aihot"
                :href="state.dailyReport.links.aihot"
                target="_blank"
                rel="noreferrer"
                class="aihot-btn"
              >
                查看官方网页 ↗
              </a>
            </div>
            <p
              v-if="state.dailyReport.leadTitle"
              style="font-weight:600;color:var(--heading);margin-bottom:4px;"
            >
              {{ state.dailyReport.leadTitle }}
            </p>
            <p v-if="state.dailyReport.leadParagraph" style="line-height:1.6">
              {{ state.dailyReport.leadParagraph }}
            </p>
            <p v-else-if="!state.dailyReport.sections.length" class="muted small">官方本期暂无更多内容。</p>
          </div>

          <!-- 各分组列表 -->
          <div
            v-for="(sec, sIdx) in state.dailyReport?.sections || []"
            :key="sec.label + sIdx"
            class="aihot-daily-group"
          >
            <div class="aihot-daily-group-title">{{ sec.label }}</div>
            <div class="aihot-grid">
              <a
                v-for="(it, iIdx) in sec.items"
                :key="it.id || it.title + iIdx"
                :href="it.url"
                target="_blank"
                rel="noreferrer"
                class="aihot-item"
                @click.prevent="handleOpenFeedArticle(it)"
              >
                <div style="min-width:0;flex:1">
                  <div class="aihot-t">{{ it.title }}</div>
                  <p class="aihot-s" v-if="it.summary">{{ it.summary }}</p>
                  <div class="aihot-m">
                    <span>{{ it.sourceName }}</span>
                    <time v-if="it.published">{{ it.published }}</time>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
      </main>
      </div>
    </section>
  </div>

</template>
