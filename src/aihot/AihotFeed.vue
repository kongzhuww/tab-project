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
import { chatService } from "../chat/chat.service";
import ChatShareMenu from "../chat/ChatShareMenu.vue";
import type { ChatShareTarget } from "../chat/private-chat-client";
import { windowManagerController } from "../core/window-manager.store";
import { useContextMenu } from "../sdk/interactions";
import { notifications } from "../sdk/notifications";

const aihotContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  item: AiHotFeedArticle | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  item: null
});

function handleOpenContextMenu(e: MouseEvent, item: AiHotFeedArticle) {
  e.preventDefault();
  e.stopPropagation();
  aihotContextMenu.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    item
  };
}

import { chatModuleState } from "../chat/chat-state";

function handleShareToRoom(target: ChatShareTarget) {
  if (aihotContextMenu.value.item) {
    chatService.sendAiHotShare(aihotContextMenu.value.item, target);
  }
  aihotContextMenu.value.visible = false;
}

function closeArticleMenu() {
  aihotContextMenu.value.visible = false;
}
const { menuRef: articleMenuRef, style: articleMenuStyle } = useContextMenu({
  visible: () => aihotContextMenu.value.visible,
  anchor: () => ({ x: aihotContextMenu.value.x, y: aihotContextMenu.value.y }),
  dismiss: closeArticleMenu
});

async function sendArticleToWorkbench(): Promise<void> {
  const article = aihotContextMenu.value.item;
  const snapshot = article ? { title: article.title, url: article.url } : null;
  closeArticleMenu();
  if (!snapshot?.url) return;
  try {
    const url = new URL(snapshot.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      notifications.show({ appName: "海狸工作台", title: "无法添加文章", message: "仅支持 HTTP/HTTPS 文章链接。" });
      return;
    }
    const { addWorkbenchWeb } = await import("../workbench/workbench.store");
    const added = addWorkbenchWeb(snapshot);
    notifications.show({
      appName: "海狸工作台",
      title: added ? "已添加到工作台" : "文章已在工作台中",
      message: added ? `已将「${snapshot.title}」放入常用网站 / 参考` : "没有重复添加"
    });
  } catch {
    notifications.show({ appName: "海狸工作台", title: "添加失败", message: "未能添加文章，请重试。" });
  }
}

const state = aihotFeedState;

const { active, standalone } = useCardActivity("daily-aihot", "/aihot.html");
const owner = Symbol("aihot-feed-view");
let initialized = false;
watch(active, visible => {
  if (!visible) { closeArticleMenu(); aiHotService.pause(owner); return; }
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
  aiHotService.activate(owner);
}, { immediate: true, flush: "sync" });
onBeforeUnmount(() => {
  aiHotService.pause(owner);
});
const viewTitle = computed(() => {
  switch (state.currentView) {
    case "leaderboard":
      return "AI HOT 模型榜";
    case "feed":
      return "AI HOT 精选资讯";
    case "daily":
      return "AI HOT 官方日报";
    default:
      return "AI HOT 资讯流";
  }
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

const hasContent = computed(() => {
  if (state.currentView === "leaderboard") return filteredLeaderboard.value.length > 0;
  if (state.currentView === "feed") return filteredFeedArticles.value.length > 0;
  if (state.currentView === "daily") return !!state.dailyReport;
  return false;
});

function handleSwitchView(view: AiHotViewType) {
  void aiHotService.switchView(view);
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
      <header class="card-head">
        <span class="bar" style="background: linear-gradient(180deg,#34d399,#38bdf8)"></span>
        <h2 id="aihot-title">{{ viewTitle }}</h2>
        <div id="aihot-tabs" class="aihot-tabs" role="group" aria-label="资讯来源">
          <button
            type="button"
            data-view="leaderboard"
            :class="{ active: state.currentView === 'leaderboard' }"
            @click="handleSwitchView('leaderboard')"
          >
            🏆 模型榜
          </button>
          <button
            type="button"
            data-view="feed"
            :class="{ active: state.currentView === 'feed' }"
            @click="handleSwitchView('feed')"
          >
            ✦ 精选资讯
          </button>
          <button
            type="button"
            data-view="daily"
            :class="{ active: state.currentView === 'daily' }"
            @click="handleSwitchView('daily')"
          >
            📰 官方日报
          </button>
        </div>
        <button
          id="aihot-refresh"
          class="icon-btn"
          title="刷新当前来源"
          :disabled="!active || state.isLoading"
          type="button"
          @click="handleRefresh"
        >
          ↻
        </button>
      </header>

      <!-- 辅助筛选工具栏 Subbar -->
      <div
        id="aihot-subbar"
        class="aihot-subbar"
        v-if="state.currentView === 'leaderboard' || state.currentView === 'feed'"
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
              全部厂商
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
              placeholder="🔍 检索模型或厂商…"
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
              全部
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'ai-models' }"
              @click="handleSelectCategory('ai-models')"
            >
              🤖 模型发布
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'ai-products' }"
              @click="handleSelectCategory('ai-products')"
            >
              🚀 产品动态
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'industry' }"
              @click="handleSelectCategory('industry')"
            >
              🏢 行业动态
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'paper' }"
              @click="handleSelectCategory('paper')"
            >
              📄 学术论文
            </button>
            <button
              type="button"
              class="aihot-pill"
              :class="{ active: state.feedCategory === 'tip' }"
              @click="handleSelectCategory('tip')"
            >
              💡 观点教程
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
                24 小时
              </button>
              <button
                type="button"
                class="aihot-pill"
                :class="{ active: state.feedWindow === '7d' }"
                @click="handleSelectWindow('7d')"
              >
                近 7 天
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- 核心内容展示区 -->
      <p v-if="state.statusMessage" class="muted small" role="status">{{ state.statusMessage }}</p>
      <p v-if="state.errorMessage && hasContent" class="notice" role="status">{{ state.errorMessage }}</p>
      <div id="aihot-body">
        <!-- 错误提示（无可用内容时呈现） -->
        <p class="notice" v-if="state.errorMessage && !hasContent">
          {{ state.errorMessage }}
        </p>

        <!-- 加载中状态（无可用内容时呈现） -->
        <p class="muted small" v-else-if="state.isLoading && !hasContent">
          正在载入 AI HOT 数据…
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
            v-for="(item, itemIdx) in filteredFeedArticles"
            :key="item.id || item.title + itemIdx"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
            class="aihot-item"
            @click.prevent="handleOpenFeedArticle(item)"
            @contextmenu="handleOpenContextMenu($event, item)"
          >
            <span class="aihot-rank" :class="{ top: itemIdx < 3 }">
              {{ itemIdx + 1 }}
            </span>
            <div style="min-width:0;flex:1">
              <div class="aihot-t">{{ item.title }}</div>
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
                  {{ item.sourceName }}
                </span>
                <time>{{ item.published }}</time>
              </div>
            </div>
          </a>
          <p class="muted small" v-if="!filteredFeedArticles.length">
            当前分类暂无资讯。
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
            <p style="line-height:1.6">
              {{ state.dailyReport.leadParagraph || "每天早晨精编汇总过去 24 小时 AI 行业的重大发布、算力生态与前沿突破。" }}
            </p>
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
                @contextmenu="handleOpenContextMenu($event, it)"
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

          <p class="muted small" v-if="!state.dailyReport">
            暂无官方日报内容。
          </p>
        </div>
      </div>
    </section>
  </div>

  <!-- AI HOT 右键菜单 -->
  <Teleport to="body">
    <div
      v-if="aihotContextMenu.visible"
      ref="articleMenuRef"
      class="aihot-context-menu"
      :style="articleMenuStyle"
      role="menu"
      @click.stop
    >
      <div class="menu-head">{{ aihotContextMenu.item?.title }}</div>
      <button type="button" class="menu-item" role="menuitem" :disabled="!aihotContextMenu.item?.url" @click="sendArticleToWorkbench">
        <span class="menu-icon" aria-hidden="true">📌</span> 移动到工作台
      </button>
      <ChatShareMenu
        label="💬 发送到聊天室"
        match-menu-item
        :visible="aihotContextMenu.visible"
        @select="handleShareToRoom"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.aihot-context-menu {
  position: fixed;
  z-index: 99999;
  min-width: 180px;
  max-width: 260px;
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.menu-head {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  padding: 4px 6px 6px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}
.menu-item:hover {
  background: var(--surface-hover);
  color: var(--primary);
}
.menu-icon { font-size: 13px; opacity: .8; flex-shrink: 0; }
.menu-item:disabled { opacity: .5; cursor: default; }
.menu-item:focus-visible { outline: 2px solid var(--heading); outline-offset: -2px; }
</style>
