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
const GitHubSettingsModal = defineAsyncComponent(() => import("./GitHubSettingsModal.vue"));
import { gitHubService, type GitHubSearchRule } from "../services/github.service";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { gitHubTrendingController } from "./trending-store";


const { active, standalone } = useCardActivity("card-github", "/github.html");
let initialVersion = 0, initialized = false;
let repositoryReadScope: AbortController | undefined;
const initialError = ref("");

type GitHubChannel = "stars" | "trending" | "awesome";
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

const SEARCH_RULES = [
  { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
  { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
  { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
  { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
] as const;

const currentRule = ref<GitHubSearchRule>(gitHubService.searchRule || "exact");

const activeRuleMeta = computed(() => {
  return SEARCH_RULES.find((r) => r.id === currentRule.value) || SEARCH_RULES[0];
});

function cycleSearchRule(): void {
  const next = gitHubService.cycleSearchRule();
  currentRule.value = next;
}

const searchPlaceholder = computed(() => {
  if (searchScope.value === "global") return "在 GitHub 全网搜索开源仓库…";
  return `在当前分类中${activeRuleMeta.value.name}搜索 Star 仓库…`;
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
    initialError.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
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
          <button type="button" id="gh-search-mode-toggle" class="gh-search-mode-toggle" :title="searchScope === 'local' ? '切换为 GitHub 全站搜索' : '切换为当前分类搜索'" @click="toggleSearchScope">
            <span id="gh-mode-icon" class="gh-mode-icon">{{ searchScope === 'local' ? '⭐' : '🌐' }}</span>
            <span id="gh-mode-text" class="gh-mode-text">{{ searchScope === 'local' ? '当前分类' : 'GitHub 全站' }}</span>
            <span class="gh-mode-arrow">▾</span>
          </button>
          <input id="gh-search-input" v-model="searchText" :placeholder="searchPlaceholder" autocomplete="off" @input="updateLocalSearch" />

          <!-- 🌟 规则切换按钮：放置在右边，点击切换下一个匹配规则 -->
          <button
            v-if="searchScope === 'local'"
            type="button"
            class="gh-search-rule-btn"
            :class="`rule-${activeRuleMeta.id}`"
            :title="`当前匹配规则：${activeRuleMeta.name}（${activeRuleMeta.desc}）\n点击切换下一个规则`"
            @click.stop="cycleSearchRule"
          >
            <span class="gh-search-rule-icon">{{ activeRuleMeta.icon }}</span>
            <span class="gh-search-rule-text">{{ activeRuleMeta.name }}</span>
          </button>

          <button v-show="searchText" type="button" id="gh-search-clear-btn" class="gh-search-clear-btn" title="清空搜索" @click="clearSearch">✕</button>
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

      <!-- ⚙️ 独立模组自包含设置按钮 -->
      <div class="gh-settings-anchor">
        <button
          type="button"
          ref="settingsButton"
          :aria-expanded="isSettingsOpen"
          aria-label="GitHub 设置"
          class="gh-head-settings-btn"
          title="GitHub 模组偏好设置 (账号、Token、AI模型、缓存)"
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
            :title="isChannelsCollapsed ? '点击展开快捷频道' : '点击收起快捷频道'"
            @click="isChannelsCollapsed = !isChannelsCollapsed"
          >
            <div class="fo-sidebar-toggle-title">
              <span class="fo-sidebar-toggle-icon">⚡</span>
              <span>快捷频道</span>
              <span v-if="isChannelsCollapsed" class="fo-sidebar-toggle-pill">3</span>
            </div>
            <button
              type="button"
              class="fo-sidebar-toggle-action"
              :aria-expanded="!isChannelsCollapsed"
              :title="isChannelsCollapsed ? '展开' : '收起'"
            >
              <span>{{ isChannelsCollapsed ? '展开' : '收起' }}</span>
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
                title="查看与管理 Star 星标仓库"
                @click="switchChannel('stars')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">⭐</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>Star 收藏</strong>
                    <small>星标项目 · 文件夹管理</small>
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
                title="查看 GitHub 实时趋势项目"
                @click="switchChannel('trending')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">🔥</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>趋势榜单</strong>
                    <small>开源风向标 · 今日/近7天</small>
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
                title="查看 Awesome 精选开源资源清单"
                @click="switchChannel('awesome')"
              >
                <div class="fo-sidebar-sub-main">
                  <span class="fo-sidebar-sub-icon">🌟</span>
                  <div class="fo-sidebar-sub-text">
                    <strong>Awesome 专区</strong>
                    <small>神级清单 · 全球精选</small>
                  </div>
                </div>
                <span class="fo-sidebar-sub-badge" style="background: linear-gradient(135deg, #6366f1, #a855f7);">AWESOME</span>
              </button>
            </div>
          </div>

          <!-- 2. 文件夹列表 -->
          <header class="gh-bili-sidebar-head">
            <div>
              <b style="font-size: 13px; display: flex; align-items: center; gap: 6px;"><i class="fo-folder-icon"></i> 收藏文件夹</b>
              <small style="color: var(--dim); font-size: 9.5px;">单一文件夹 · 独立正在使用</small>
            </div>
            <button class="fo-sidebar-add" id="gh-folder-add-btn" type="button" title="新建文件夹" aria-label="新建文件夹" @click="gitHubService.promptCreateFolder()">＋</button>
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
        </section>
      </div>
    </div>
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
</style>
