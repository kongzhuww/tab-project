<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from "vue";
import { useCardActivity } from "../core/useCardActivity";
import {
  gitHubTrendingState,
  gitHubTrendingController,
  type GitHubTrendingRepo
} from "./trending-store";
import { githubRepoDetailController } from "./repo-detail-store";

const state = gitHubTrendingState;
const { active } = useCardActivity("card-github", "/github.html");
const fetchedText = computed(() => state.fetchedAt ? new Date(state.fetchedAt).toLocaleString() : "");
let scope: AbortController | undefined;
let detach: (() => void) | undefined;
watch(active, visible => {
  scope?.abort(); detach?.(); detach = undefined;
  if (visible) {
    scope = new AbortController();
    detach = gitHubTrendingController.attachView(scope.signal);
  }
}, { immediate: true, flush: "sync" });
onBeforeUnmount(() => { scope?.abort(); detach?.(); });

function handleSwitchRange(days: number, text: string) {
  void gitHubTrendingController.switchRange(days, text);
}

function handleRefresh() {
  void gitHubTrendingController.refresh();
}

function handleSelectRepo(repo: GitHubTrendingRepo) {
  gitHubTrendingController.selectRepo(repo);
}

function handleCardClick(event: MouseEvent, rp: GitHubTrendingRepo) {
  const target = event.target as HTMLElement | null;
  if (target?.closest("a")) return;
  event.preventDefault();
  event.stopPropagation();
  handleSelectRepo(rp);
  const fullName = rp.full_name || (rp.owner?.login ? `${rp.owner.login}/${rp.name}` : rp.name);
  githubRepoDetailController.open(fullName, undefined, rp);
}

function formatStars(count?: number): string {
  if (count == null) return "—";
  return count.toLocaleString();
}


</script>

<template>
  <div class="vue-github-trending-wrapper">
    <header class="gh-trend-header-row">
      <div class="gh-trend-title-block">
        <span class="gh-trend-icon">🔥</span>
        <div>
          <h3>GitHub 开源发现</h3>
          <small>新建仓库搜索 / 第三方趋势快照 · 非实时榜单</small>
        </div>
      </div>

      <div class="gh-trend-controls">
        <div class="gh-trend-range-pills">
          <button
            type="button"
            class="gh-trend-pill"
            :class="{ active: state.sinceDays === 1 }"
            @click="handleSwitchRange(1, '近 1 天')"
          >
            ⚡ 近 1 天
          </button>
          <button
            type="button"
            class="gh-trend-pill"
            :class="{ active: state.sinceDays === 7 }"
            @click="handleSwitchRange(7, '近 7 天')"
          >
            📅 近 7 天
          </button>
          <button
            type="button"
            class="gh-trend-pill"
            :class="{ active: state.sinceDays === 30 }"
            @click="handleSwitchRange(30, '近 30 天')"
          >
            🌙 近 30 天
          </button>
        </div>

        <button
          class="gh-trend-refresh-btn"
          type="button"
          :disabled="state.isLoading"
          title="重新读取公开数据源，不使用 GitHub 账号或 Token"
          @click="handleRefresh"
        >
          <span :class="{ spinning: state.isLoading }">↻</span>
          <b>刷新</b>
        </button>
      </div>
    </header>

    <div id="trend-body" class="gh-trend-body">
      <p v-if="state.hasLoaded" class="gh-trend-source">{{ state.sourceText }} 本页读取时间：{{ fetchedText }}（不是源数据更新时间）。</p>
      <p class="notice" v-if="state.errorMessage">
        {{ state.errorMessage }}
      </p>

      <div class="gh-trend-loading" v-if="state.isLoading && !state.repos.length">
        <i></i>
        <span>正在读取公开仓库数据…</span>
      </div>

      <div class="repos" v-else-if="state.repos.length">
        <div
          v-for="(rp, idx) in state.repos"
          :key="rp.html_url + idx"
          class="repo gh-trend-card"
          @click="handleCardClick($event, rp)"
        >
          <div class="gh-trend-rank-tag">#{{ idx + 1 }}</div>
          <div class="name">
            <span class="owner" v-if="rp.owner?.login">{{ rp.owner.login }} / </span>
            <a
              :href="rp.html_url"
              target="_blank"
              rel="noreferrer"
              class="gh-trend-title-link"
              title="前往 GitHub 页面"
              @click.stop
            >
              <strong>{{ rp.name }}</strong>
              <span class="gh-trend-out-icon">↗</span>
            </a>
          </div>
          <p class="desc" v-if="rp.description">{{ rp.description }}</p>
          <div class="meta">
            <span class="lang" v-if="rp.language">
              <i class="lang-dot"></i>{{ rp.language }}
            </span>
            <span class="stars">★ {{ formatStars(rp.stargazers_count) }}</span>
            <span class="forks" v-if="rp.forks_count != null">⌥ {{ formatStars(rp.forks_count) }}</span>
          </div>
        </div>
      </div>

      <div v-else class="gh-trend-empty">
        <span>{{ state.hasLoaded ? "当前数据源在所选范围内未返回仓库" : state.errorMessage ? "尚无可展示的数据" : "打开后读取，或点击刷新" }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-github-trending-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.gh-trend-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px 10px;
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  flex-shrink: 0;
  flex-wrap: wrap;
}

.gh-trend-title-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.gh-trend-icon {
  font-size: 22px;
  filter: drop-shadow(0 2px 8px rgba(239, 68, 68, 0.4));
}

.gh-trend-title-block h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--heading, #ffffff);
}

.gh-trend-title-block small {
  color: var(--dim, #94a3b8);
  font-size: 11px;
}

.gh-trend-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.gh-trend-range-pills {
  display: flex;
  align-items: center;
  gap: 6px;
}

.gh-trend-pill {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: var(--surface, rgba(255, 255, 255, 0.04));
  color: var(--text, #cbd5e1);
  font-size: 11.5px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.gh-trend-pill:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.1));
  color: var(--heading, #ffffff);
}

.gh-trend-pill.active {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(249, 115, 22, 0.25));
  border-color: #ef4444;
  color: #f87171;
  font-weight: 650;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.18);
}

.gh-trend-refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: var(--surface, rgba(255, 255, 255, 0.04));
  color: var(--text, #cbd5e1);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.gh-trend-refresh-btn:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.1));
  color: var(--heading, #ffffff);
}

.gh-trend-refresh-btn span.spinning {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.gh-trend-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 80px;
}

.gh-trend-source {
  font-size: 12px;
  line-height: 1.6;
  color: var(--dim, #64748b);
  overflow-wrap: anywhere;
}

.gh-trend-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.gh-trend-title-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: inherit;
  text-decoration: none;
  transition: color 0.15s;
}

.gh-trend-title-link:hover {
  color: #38bdf8 !important;
  text-decoration: underline;
}

.gh-trend-out-icon {
  font-size: 11px;
  opacity: 0.6;
}

.gh-trend-card:hover {
  transform: translateY(-2px);
  border-color: rgba(239, 68, 68, 0.4) !important;
}

.gh-trend-rank-tag {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 11px;
  font-weight: 800;
  color: var(--dim, #64748b);
  font-family: ui-monospace, monospace;
}

.gh-trend-loading, .gh-trend-empty {
  padding: 80px 20px;
  text-align: center;
  color: var(--dim, #64748b);
  font-size: 13px;
}

/* 亮色与孤星米色主题自适应（完美匹配 Star 列表风格） */
.vue-github-trending-wrapper {
  background: transparent !important;
}

html[data-theme="lonetrail"] .gh-trend-title-block h3 {
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-trend-card {
  background: rgba(242, 238, 228, 0.93) !important;
  border-color: rgba(38, 34, 26, 0.18) !important;
  box-shadow: 0 1px 2px rgba(38, 34, 26, 0.05) !important;
}

html[data-theme="lonetrail"] .gh-trend-card .name strong,
html[data-theme="lonetrail"] .gh-trend-card .name span {
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-trend-card .desc {
  color: rgba(38, 34, 26, 0.72) !important;
}

html[data-theme="lonetrail"] .gh-trend-rank-tag {
  color: rgba(38, 34, 26, 0.45) !important;
}

html[data-theme="light"] .gh-trend-title-block h3,
:root:not([data-theme="dark"]) .gh-trend-title-block h3 {
  color: #0f172a;
}
</style>
