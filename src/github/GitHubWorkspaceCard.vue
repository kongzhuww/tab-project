<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, defineAsyncComponent } from "vue";
import { useCardActivity } from "../core/useCardActivity";
import { loadGitHubAccountSettings } from "./settings";
import GitHubStatus from "./GitHubStatus.vue";
import AccountSetupGuide from "../core/AccountSetupGuide.vue";
import { githubStatusState } from "./store";
import GitHubFolders from "./GitHubFolders.vue";
import GitHubHero from "./GitHubHero.vue";
import GitHubRepositories from "./GitHubRepositories.vue";
import GitHubBatchBar from "./GitHubBatchBar.vue";
import GitHubTrending from "./GitHubTrending.vue";
import GitHubAwesome from "./GitHubAwesome.vue";
import GitHubMyRepos from "./GitHubMyRepos.vue";
import GitHubNotificationPanel from "./GitHubNotificationPanel.vue";
import GitHubNotificationDetailDrawer from "./GitHubNotificationDetailDrawer.vue";
import {
  gitHubNotificationsState,
  gitHubNotificationsController
} from "./github-notifications-store";
const GitHubSettingsModal = defineAsyncComponent(() => import("./GitHubSettingsModal.vue"));
import { gitHubService, type GitHubSearchRule } from "../services/github.service";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { gitHubTrendingController } from "./trending-store";
import { t } from "../i18n";


const { active, standalone } = useCardActivity("card-github", "/github.html");
let initialVersion = 0, initialized = false;
let repositoryReadScope: AbortController | undefined;
const initialError = ref("");

type GitHubChannel = "stars" | "trending" | "awesome" | "repos";
const activeChannel = ref<GitHubChannel>("stars");
watch(() => active.value && activeChannel.value === "stars", visible => gitHubService.setAiViewActive(visible), { immediate: true, flush: "sync" });
const isChannelsCollapsed = ref(false);
const searchScope = ref<"local" | "global">("local");
const searchText = ref("");
const isSettingsOpen = ref(false);
const aiSettingsRequest = ref(0);
function openAiSettings() {
  if (!active.value) return;
  isSettingsOpen.value = true;
  ++aiSettingsRequest.value;
}
const settingsMounted = ref(false);
watch(isSettingsOpen, open => { if (open) settingsMounted.value = true; });
const settingsButton = ref<HTMLElement | null>(null);
let searchTimer = 0;

function switchChannel(channel: GitHubChannel) {
  activeChannel.value = channel;
  if (channel === "trending") {
    gitHubTrendingController.switchTab("trending");
  } else {
    gitHubTrendingController.switchTab("stars");
  }
}

function handleSelectFolder() {
  activeChannel.value = "stars";
}

const SEARCH_RULES = computed(() => [
  { id: "exact", icon: "🎯", name: t("search.rule.exact"), desc: t("search.rule.exactDesc") },
  { id: "fuzzy", icon: "🔍", name: t("search.rule.fuzzy"), desc: t("search.rule.fuzzyDesc") },
  { id: "topic", icon: "🏷️", name: t("search.rule.topic"), desc: t("search.rule.topicDesc") },
  { id: "smart", icon: "✨", name: t("search.rule.smart"), desc: t("search.rule.smartDesc") }
] as const);

const currentRule = ref<GitHubSearchRule>(gitHubService.searchRule || "exact");

const activeRuleMeta = computed(() => {
  return SEARCH_RULES.value.find((r) => r.id === currentRule.value) || SEARCH_RULES.value[0];
});

function cycleSearchRule(): void {
  const next = gitHubService.cycleSearchRule();
  currentRule.value = next;
}

const searchPlaceholder = computed(() => {
  if (searchScope.value === "global") return t("github.searchGlobalPlaceholder");
  return t("github.searchLocalPlaceholder", { rule: activeRuleMeta.value.name });
});

function switchTab(tab: "stars" | "trending") {
  switchChannel(tab);
}

function updateLocalSearch(): void {
  clearTimeout(searchTimer);
  if (!active.value || searchScope.value !== "local") return;
  searchTimer = window.setTimeout(() => gitHubService.setSearchQuery(searchText.value.trim().toLowerCase()), 180);
}

function toggleSearchScope(): void {
  searchScope.value = searchScope.value === "local" ? "global" : "local";
  if (searchScope.value === "local") updateLocalSearch();
}

function clearSearch(): void {
  searchText.value = "";
  clearTimeout(searchTimer);
  gitHubService.resetLocalSearch();
}

function submitSearch(): void {
  const query = searchText.value.trim();
  if (searchScope.value === "local") {
    clearTimeout(searchTimer);
    gitHubService.setSearchQuery(query.toLowerCase());
  } else if (query) {
    window.open(`https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`, "_blank", "noopener,noreferrer");
  }
}

function onAccountReload() {
  ++initialVersion;
  initialized = true;
  initialError.value = "";
}
watch(active, async visible => {
  const version = ++initialVersion;
  clearTimeout(searchTimer);
  repositoryReadScope?.abort();
  repositoryReadScope = new AbortController();
  if (!visible) repositoryReadScope.abort();
  gitHubService.setRepositoryViewSignal(repositoryReadScope.signal);
  if (!visible) return;
  if (initialized) { await gitHubService.resumeRepositoryReads(); return; }
  if (gitHubService.repos.length || gitHubService.loadingAllStars || gitHubService.loadingPage) { initialized = true; return; }
  try {
    const account = await loadGitHubAccountSettings();
    if (!active.value || version !== initialVersion) return;
    initialized = true;
    await gitHubService.loadGitHub(account.ghUser, account.ghToken);
  } catch {
    if (!active.value || version !== initialVersion) return;
    initialized = false;
    initialError.value = t("github.initError");
  }
}, { immediate: true, flush: "sync" });
onBeforeUnmount(() => { gitHubService.setAiViewActive(false); ++initialVersion; repositoryReadScope?.abort(); clearTimeout(searchTimer); });
</script>

<template>
  <!-- GitHub 综合仪表盘（纯血 Vue 3 统一卡片工作台） -->
  <section class="card wide" id="card-github" :inert="!active" :class="{ 'card-fullscreen': fullscreenCardState.activeId === 'card-github' }">
    <header class="card-head">
      <span class="bar" style="background: linear-gradient(180deg,#22c55e,#06b6d4)"></span>
      <h2>GitHub</h2>
      <span id="gh-user" class="muted small" style="margin-left: 8px;"></span>
      <div class="card-fullscreen-gh-search" id="gh-head-search-wrap">
        <form id="gh-search-form" class="gh-search-box" @submit.prevent="submitSearch">
          <button type="button" id="gh-search-mode-toggle" class="gh-search-mode-toggle" :title="searchScope === 'local' ? t('github.searchScope.toGlobal') : t('github.searchScope.toLocal')" @click="toggleSearchScope">
            <span id="gh-mode-icon" class="gh-mode-icon">{{ searchScope === 'local' ? '⭐' : '🌐' }}</span>
            <span id="gh-mode-text" class="gh-mode-text">{{ searchScope === 'local' ? t('github.searchScope.local') : t('github.searchScope.global') }}</span>
            <span class="gh-mode-arrow">▾</span>
          </button>
          <input id="gh-search-input" v-model="searchText" :placeholder="searchPlaceholder" autocomplete="off" @input="updateLocalSearch" />

          <!-- 🌟 规则切换按钮：放置在右边，点击切换下一个匹配规则 -->
          <button
            v-if="searchScope === 'local'"
            type="button"
            class="gh-search-rule-btn"
            :class="`rule-${activeRuleMeta.id}`"
            :title="t('github.ruleHint', { rule: activeRuleMeta.name, desc: activeRuleMeta.desc })"
            @click.stop="cycleSearchRule"
          >
            <span class="gh-search-rule-icon">{{ activeRuleMeta.icon }}</span>
            <span class="gh-search-rule-text">{{ activeRuleMeta.name }}</span>
          </button>

          <button v-show="searchText" type="button" id="gh-search-clear-btn" class="gh-search-clear-btn" :title="t('github.clearSearch')" @click="clearSearch">✕</button>
          <button type="submit" id="gh-search-submit-btn" title="搜索">⌕</button>
        </form>
        <div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden>
          <label title="精确：严格用你的原关键词搜索仓库名和描述"><input type="checkbox" value="exact" checked />精确</label>
          <label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排"><input type="checkbox" value="loose" />宽松匹配</label>
          <label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning"><input type="checkbox" value="related" />近义词</label>
          <label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm"><input type="checkbox" value="topic" />主题标签</label>
          <label title="说明文档：搜索仓库 README 内容"><input type="checkbox" value="readme" />说明文档</label>
        </div>
        <div id="gh-search-suggest" class="gh-search-suggest" hidden></div>
      </div>

      <!-- 🔔 GitHub 消息通知按钮（与 B站 消息按钮完全对齐） -->
      <button
        id="gh-header-msg-center-btn"
        class="gh-header-msg-btn"
        type="button"
        :class="{ 'has-unread': gitHubNotificationsState.unreadCount > 0, 'is-active': gitHubNotificationsState.isOpen }"
        :title="gitHubNotificationsState.unreadCount > 0 ? t('github.header.msgUnread', { count: gitHubNotificationsState.unreadCount }) : t('github.header.msgCenter')"
        @click="gitHubNotificationsController.toggle()"
      >
        <span class="gh-header-msg-icon">🔔</span>
        <span class="gh-header-msg-label">{{ t('github.header.msg') }}</span>
        <span v-if="gitHubNotificationsState.unreadCount > 0" class="gh-header-msg-badge">
          {{ gitHubNotificationsState.unreadCount > 99 ? '99+' : gitHubNotificationsState.unreadCount }}
        </span>
      </button>

      <!-- ⚙️ 独立模组自包含设置按钮 -->
      <div class="gh-settings-anchor">
        <button
          type="button"
          ref="settingsButton"
          :aria-expanded="isSettingsOpen"
          :aria-label="t('github.settings')"
          class="gh-head-settings-btn"
          :title="t('github.header.settings')"
          @click="isSettingsOpen = !isSettingsOpen"
        >
          ⚙️
        </button>
        <!-- GitHub 专属非模态轻量设置面板 -->
        <GitHubSettingsModal v-if="settingsMounted" :visible="active && isSettingsOpen" :anchor="settingsButton" :ai-request="aiSettingsRequest" @account-reload="onAccountReload" @close="isSettingsOpen = false" />
      </div>
    </header>

    <p v-if="initialError" class="muted small" role="status">{{ initialError }}</p>
    <!-- 纯血 B站同款全景侧边栏与主工作台 -->
    <div class="gh-main-pane" id="gh-pane-main">
      <div class="gh-bili-layout">
        <aside class="gh-bili-sidebar fo-bili-sidebar" id="gh-bili-sidebar">
          <!-- 1. B站同款快捷频道区域 -->
          <div
            class="fo-sidebar-toggle-bar"
            :class="{ 'is-collapsed': isChannelsCollapsed }"
            :title="isChannelsCollapsed ? t('github.channel.toggleExpand') : t('github.channel.toggleCollapse')"
            @click="isChannelsCollapsed = !isChannelsCollapsed"
          >
            <div class="fo-sidebar-toggle-title">
              <span class="fo-sidebar-toggle-icon">⚡</span>
              <span>{{ t('github.channel.channels') }}</span>
              <span v-if="isChannelsCollapsed" class="fo-sidebar-toggle-pill">3</span>
            </div>
            <button
              type="button"
              class="fo-sidebar-toggle-action"
              :aria-expanded="!isChannelsCollapsed"
              :title="isChannelsCollapsed ? t('github.expand') : t('github.collapse')"
            >
              <span>{{ isChannelsCollapsed ? t('github.expand') : t('github.collapse') }}</span>
              <span class="fo-sidebar-toggle-chevron">{{ isChannelsCollapsed ? "▾" : "▴" }}</span>
            </button>
          </div>

          <div v-if="!isChannelsCollapsed" class="fo-sidebar-features-wrap">
            <!-- 频道 1: Star 收藏 -->
            <div class="fo-sidebar-sub-wrap">
              <button
                id="gh-sidebar-stars-btn"
                type="button"
                class="fo-sidebar-sub-btn"
                :class="{ on: activeChannel === 'stars' }"
                :title="t('github.channel.starsTitle')"
                @click="switchChannel('stars')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">⭐</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>{{ t('github.channel.stars') }}</strong>
                    <small>{{ t('github.channel.starsSub') }}</small>
                  </div>
                </div>
                <span class="fo-sidebar-sub-badge" style="background: linear-gradient(135deg, #f59e0b, #d97706);">STAR</span>
              </button>
            </div>

            <!-- 频道 2: 趋势榜单 -->
            <div class="fo-sidebar-sub-wrap fo-sidebar-following-wrap">
              <button
                id="gh-sidebar-trending-btn"
                type="button"
                class="fo-sidebar-sub-btn"
                :class="{ on: activeChannel === 'trending' }"
                :title="t('github.channel.trendingTitle')"
                @click="switchChannel('trending')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">🔥</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>{{ t('github.channel.trending') }}</strong>
                    <small>{{ t('github.channel.trendingSub') }}</small>
                  </div>
                </div>
                <span class="fo-sidebar-sub-badge" style="background: linear-gradient(135deg, #ef4444, #f97316);">HOT</span>
              </button>
            </div>

            <!-- 频道 3: Awesome 专区 -->
            <div class="fo-sidebar-sub-wrap fo-sidebar-cache-wrap">
              <button
                id="gh-sidebar-awesome-btn"
                type="button"
                class="fo-sidebar-sub-btn"
                :class="{ on: activeChannel === 'awesome' }"
                :title="t('github.channel.awesomeTitle')"
                @click="switchChannel('awesome')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">🌟</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>{{ t('github.channel.awesome') }}</strong>
                    <small>{{ t('github.channel.awesomeSub') }}</small>
                  </div>
                </div>
                <span class="fo-sidebar-sub-badge" style="background: linear-gradient(135deg, #6366f1, #a855f7);">AWESOME</span>
              </button>
            </div>

            <!-- 频道 4: 我的仓库 -->
            <div class="fo-sidebar-sub-wrap fo-sidebar-repos-wrap">
              <button
                id="gh-sidebar-repos-btn"
                type="button"
                class="fo-sidebar-sub-btn"
                :class="{ on: activeChannel === 'repos' }"
                :title="t('github.channel.reposTitle')"
                @click="switchChannel('repos')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">📦</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>{{ t('github.channel.repos') }}</strong>
                    <small>{{ t('github.channel.reposSub') }}</small>
                  </div>
                </div>
                <span class="fo-sidebar-sub-badge" style="background: linear-gradient(135deg, #0284c7, #0ea5e9);">REPOS</span>
              </button>
            </div>
          </div>

          <!-- 2. 文件夹列表 -->
          <header class="gh-bili-sidebar-head">
            <div>
              <b style="font-size: 13px; display: flex; align-items: center; gap: 6px;"><i class="fo-folder-icon"></i> {{ t('github.lists.title') }}</b>
              <small style="color: var(--dim); font-size: 9.5px;">{{ t('github.lists.sub') }}</small>
            </div>
            <button class="fo-sidebar-add" id="gh-folder-add-btn" type="button" :title="t('github.lists.new')" :aria-label="t('github.lists.new')" @click="gitHubService.promptCreateFolder()">＋</button>
          </header>
          <nav class="gh-bili-folder-list" id="gh-folder-list" @click="handleSelectFolder">
            <GitHubFolders :active="active" />
          </nav>
        </aside>

        <!-- 3. 主视图容器：根据当前频道动态切换 -->
        <section class="gh-bili-main" id="gh-bili-main">
          <!-- 视图 A: Star 收藏 -->
          <AccountSetupGuide
            v-if="activeChannel === 'stars' && githubStatusState.accountConfigured === false"
            icon="⭐"
            title="尚未配置 GitHub 账号"
            description="填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。"
            @configure="isSettingsOpen = true"
          />
          <template v-else-if="activeChannel === 'stars'">
            <header class="gh-bili-hero" id="gh-hero">
              <GitHubHero @open-ai-settings="openAiSettings" />
            </header>

            <div class="gh-main-subbar">
              <span id="gh-rate" class="gh-rate"></span>
              <button type="button" class="gh-batch-toggle-btn" id="gh-batch-toggle-btn" hidden style="display:none;">批量操作</button>
            </div>
            <div id="gh-batch-bar" class="gh-batch-bar" hidden>
              <GitHubBatchBar :active="active && activeChannel === 'stars'" />
            </div>
            <div id="gh-search-body" hidden></div>
            <div id="vue-github-status-root">
              <GitHubStatus />
            </div>
            <div id="vue-github-repositories-root">
              <GitHubRepositories :active="active && activeChannel === 'stars'" />
            </div>
          </template>

          <!-- 视图 B: 趋势榜单 -->
          <template v-else-if="activeChannel === 'trending'">
            <GitHubTrending />
          </template>

          <!-- 视图 C: Awesome 专区 -->
          <template v-else-if="activeChannel === 'awesome'">
            <GitHubAwesome />
          </template>

          <!-- 视图 D: 我的仓库 (Topic 看板) -->
          <template v-else-if="activeChannel === 'repos'">
            <GitHubMyRepos :active="active && activeChannel === 'repos'" />
          </template>
        </section>
      </div>
    </div>
    <!-- GitHub 消息与通知中心弹窗 -->
    <GitHubNotificationPanel />
    <!-- GitHub 消息通知详情抽屉 -->
    <GitHubNotificationDetailDrawer />
  </section>
</template>

<style scoped>
.gh-settings-anchor {
  position: relative;
  display: flex;
  align-items: center;
}
.gh-head-settings-btn {
  background: var(--bg-subtle, rgba(241, 245, 249, 0.7));
  border: 1px solid var(--border-color, rgba(226, 232, 240, 0.8));
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.15s ease;
  color: var(--text-color, #334155);
}

.gh-head-settings-btn:hover {
  background: var(--bg-hover, #e2e8f0);
  /* Keep the settings control stationary. */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* 🔔 GitHub 顶栏消息通知按钮（契合系统主题变量，对标 B站 消息按钮） */
.gh-header-msg-btn {
  position: relative !important;
  margin: 0 0 0 10px !important;
  height: 32px !important;
  padding: 0 10px !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  background: var(--surface, rgba(255, 255, 255, 0.08)) !important;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12)) !important;
  color: var(--text, #334155) !important;
  font-size: 11.5px !important;
  font-weight: 500 !important;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1) !important;
  flex-shrink: 0 !important;
}

.gh-header-msg-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05)) !important;
  color: var(--heading, #0f172a) !important;
  border-color: rgba(2, 132, 199, 0.45) !important;
}

.gh-header-msg-btn.is-active {
  background: rgba(2, 132, 199, 0.12) !important;
  border-color: #0284c7 !important;
  color: #0284c7 !important;
}

.gh-header-msg-icon {
  font-size: 12px;
}

.gh-header-msg-label {
  letter-spacing: 0.02em;
}

.gh-header-msg-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 15px;
  height: 15px;
  padding: 0 3px;
  border-radius: 10px;
  background: #ef4444;
  color: #fff;
  font-size: 8.5px;
  font-weight: 750;
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.35);
}
</style>
