<template>
  <div class="vue-pricing-wrapper" :inert="!active">
    <section id="daily-pricing" class="card wide" :class="{ 'card-fullscreen': fullscreenCardState.activeId === 'daily-pricing' }">
      <header class="card-head">
        <span class="bar" style="background: linear-gradient(180deg,#fbbf24,#f59e0b)"></span>
        <h2 id="pricing-title">
          {{ state.view === "rank" ? "模型排行" : state.view === "image-eval" ? "AI 评分全景 (图灵坐标)" : "模型价格" }}
        </h2>
        <div class="pricing-view-switch" role="tablist" aria-label="模型数据视图">
          <button
            type="button"
            data-pricing-view="price"
            role="tab"
            :class="{ active: state.view === 'price' }"
            :aria-selected="state.view === 'price'"
            @click="handleSwitchView('price')"
          >
            模型价格
          </button>
          <button
            type="button"
            data-pricing-view="rank"
            role="tab"
            :class="{ active: state.view === 'rank' }"
            :aria-selected="state.view === 'rank'"
            @click="handleSwitchView('rank')"
          >
            模型排行
          </button>
          <button
            type="button"
            data-pricing-view="image-eval"
            role="tab"
            :class="{ active: state.view === 'image-eval' }"
            :aria-selected="state.view === 'image-eval'"
            @click="handleSwitchView('image-eval')"
          >
            🎯 AI 评分
          </button>
        </div>
        <button id="pricing-settings-open" ref="settingsAnchor" class="icon-btn" type="button" title="模型数据设置" :aria-expanded="settingsOpen" @click="settingsOpen = !settingsOpen">⚙️</button>
        <button
          id="pricing-refresh"
          class="icon-btn"
          type="button"
          title="当前为内置示例，实时数据刷新尚未接入"
          disabled
        >
          ↻
        </button>
      </header>

      <!-- 搜索栏与过滤工具条（生图评测下由专属组件承载，价格与排行下展示统一工具栏） -->
      <div class="pricing-toolbar" v-show="state.view !== 'image-eval'">
        <select
          id="pricing-mode"
          class="pricing-sort"
          v-show="state.view === 'price'"
          v-model="state.sortMode"
          @change="handleSortChange"
        >
          <option value="cheap-in">输入最便宜</option>
          <option value="cheap-out">输出最便宜</option>
          <option value="free">免费模型</option>
          <option value="context">上下文最大</option>
        </select>
        <input
          id="pricing-search"
          class="pricing-search"
          type="search"
          v-model="state.searchQuery"
          :placeholder="state.view === 'rank' ? '搜索排行中的模型或厂商' : '搜索模型、厂商或 ID'"
          autocomplete="off"
        />
        <button
          id="pricing-favorites-filter"
          class="pricing-favorites-filter"
          type="button"
          :class="{ active: state.favoritesOnly }"
          :aria-pressed="state.favoritesOnly"
          title="切换全部模型或只看关注"
          @click="handleToggleFavoritesFilter"
        >
          {{ state.favoritesOnly ? "♥ 只看关注" : "♡ 我的关注" }}
          <b>{{ state.favoritesCount }}</b>
        </button>
        <span id="pricing-source" class="muted small">{{ currentSourceText }}</span>
        <span v-if="state.hasOpenRouterKey && state.view === 'price'" class="api-badge ok" title="已保存 OpenRouter Key，尚未验证连通性">🔑 已配置</span>
        <span v-if="state.hasAaApiKey && state.view === 'rank'" class="api-badge ok" title="已保存 Artificial Analysis Key，尚未验证连通性">🔑 已配置</span>
        <span class="grow"></span>
        <a
          id="pricing-source-link"
          class="small"
          :href="currentSourceUrl"
          target="_blank"
          rel="noreferrer"
        >
          查看来源
        </a>
      </div>

      <p class="pricing-info" role="status">当前价格、排行与评分均为内置数据，未实时拉取；关注只保留在本页内存。{{ connectionStatusError }}</p>
      <div id="pricing-info" class="pricing-info" v-if="state.view === 'rank'">
        <b>💡 智能指数说明：</b>
        <span>Artificial Analysis 权威实测综合加权分（含数学、编程、综合推理等真实盲测指标），分数越高代表模型综合能力越强。</span>
      </div>

      <!-- 1. 🎯 AI 评分专属视图 (图灵坐标全景评测 + 八维雷达) -->
      <div id="pricing-image-eval-layout" class="pricing-image-eval-wrapper" v-if="state.view === 'image-eval'">
        <ImageBenchmarkView
          :selected-model-id="state.selectedImageModelId"
          @select-model="handleSelectImageModel"
        />
      </div>

      <!-- 2. 模型价格视图 -->
      <div id="pricing-layout" class="pricing-layout" v-show="state.view === 'price'">
        <div class="pricing-left-col">
          <ol id="pricing-rank-list" class="pricing-rank-list">
            <li v-if="filteredModels.length === 0" class="muted small">
              {{ state.favoritesOnly ? "暂无已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的模型。" }}
            </li>
            <li
              v-for="(m, idx) in paginatedModels"
              :key="m.id"
              class="pricing-rank-item aa-rank-detail"
            >
              <span class="pricing-rank-no" :class="{ top: (state.currentPage - 1) * PAGE_SIZE + idx < 3 }">
                {{ (state.currentPage - 1) * PAGE_SIZE + idx + 1 }}
              </span>
              <span class="aa-rank-main">
                <a
                  class="pricing-rank-model"
                  :href="m.url || 'https://openrouter.ai/models/' + m.id"
                  target="_blank"
                  rel="noreferrer"
                  :title="m.name"
                >
                  {{ m.name }}
                </a>
                <span class="aa-rank-meta" v-if="m.creator">
                  {{ m.creator }} {{ m.releaseDate ? '· ' + m.releaseDate : '' }}
                </span>
              </span>

              <span class="pricing-rates-badge">
                <span class="rate-tag in" title="每百万输入 Token 价格">
                  入: ${{ m.inputPrice }}
                </span>
                <span class="rate-tag out" title="每百万输出 Token 价格">
                  出: ${{ m.outputPrice }}
                </span>
                <span class="rate-tag ctx" v-if="m.contextLength" title="最大上下文窗口">
                  {{ formatContext(m.contextLength) }}
                </span>
              </span>

              <b class="aa-rank-score" v-if="m.score">
                智能 {{ m.score.toFixed(1) }}
              </b>

              <button
                type="button"
                class="pricing-fav-btn"
                :class="{ on: m.isFavorite }"
                :title="m.isFavorite ? '取消关注' : '加入关注'"
                @click="handleToggleFavorite(m.id)"
              >
                {{ m.isFavorite ? "♥" : "♡" }}
              </button>
            </li>
          </ol>

          <nav id="pricing-pagination" class="pricing-pagination" aria-label="数据翻页">
            <button
              id="pricing-page-prev"
              type="button"
              :disabled="state.currentPage <= 1"
              @click="handlePagePrev"
            >
              ‹ 上一页
            </button>
            <span>
              第
              <input
                id="pricing-page-input"
                type="number"
                min="1"
                :max="computedPricePages"
                v-model.number="state.currentPage"
                aria-label="当前页码"
              />
              / <b id="pricing-page-total">{{ computedPricePages }}</b> 页
            </span>
            <button
              id="pricing-page-next"
              type="button"
              :disabled="state.currentPage >= computedPricePages"
              @click="handlePageNext(computedPricePages)"
            >
              下一页 ›
            </button>
          </nav>
        </div>

        <div class="pricing-chart">
          <svg
            id="pricing-chart-svg"
            viewBox="0 0 560 180"
            preserveAspectRatio="none"
            role="img"
            aria-label="模型价格曲线"
          >
            <line x1="10" y1="170" x2="550" y2="170" class="pricing-chart-axis" stroke="rgba(255,255,255,0.15)"/>
            <line x1="10" y1="10" x2="10" y2="170" class="pricing-chart-axis" stroke="rgba(255,255,255,0.15)"/>
            <polyline
              :points="chartPoints"
              fill="none"
              stroke="#fbbf24"
              stroke-width="2"
              class="pricing-line-rank"
            />
          </svg>
          <div id="pricing-legend" class="pricing-legend">
            <span><i class="dot in" style="background:#38bdf8"></i>输入 $/1M</span>
            <span><i class="dot out" style="background:#f59e0b"></i>输出 $/1M</span>
            <span class="pricing-chart-note">Top {{ filteredModels.length }} · 价格走势</span>
          </div>
        </div>
      </div>

      <!-- 3. 模型排行视图 (Artificial Analysis 智能排行) -->
      <div id="pricing-rank-layout" class="pricing-layout" v-show="state.view === 'rank'">
        <div class="pricing-left-col">
          <ol class="pricing-rank-list">
            <li v-if="filteredRankings.length === 0" class="muted small">
              {{ state.favoritesOnly ? "排行中没有已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的排行模型。" }}
            </li>
            <li
              v-for="(r, idx) in paginatedRankings"
              :key="r.name"
              class="pricing-rank-item aa-rank-detail"
            >
              <span class="pricing-rank-no" :class="{ top: (state.currentPage - 1) * PAGE_SIZE + idx < 3 }">
                {{ (state.currentPage - 1) * PAGE_SIZE + idx + 1 }}
              </span>
              <span class="aa-rank-main">
                <a
                  class="pricing-rank-model"
                  :href="r.url || 'https://artificialanalysis.ai'"
                  target="_blank"
                  rel="noreferrer"
                  :title="r.name"
                >
                  {{ r.name }}
                </a>
                <span class="aa-rank-meta" v-if="r.creator">
                  {{ r.creator }} {{ r.releaseDate ? '· ' + r.releaseDate : '' }}
                </span>
                <span class="aa-rank-metrics" v-if="r.metrics && r.metrics.length">
                  <span class="aa-rank-metric" v-for="m in r.metrics" :key="m.label">
                    {{ m.label }} <b>{{ m.value }}</b>
                  </span>
                </span>
              </span>

              <b class="aa-rank-score">
                智能 {{ r.score.toFixed(1) }}
              </b>

              <button
                type="button"
                class="pricing-fav-btn"
                :class="{ on: r.isFavorite }"
                :title="r.isFavorite ? '取消关注' : '加入关注'"
                @click="handleToggleFavorite(r.name)"
              >
                {{ r.isFavorite ? "♥" : "♡" }}
              </button>
            </li>
          </ol>

          <nav class="pricing-pagination" aria-label="排行数据翻页">
            <button
              type="button"
              :disabled="state.currentPage <= 1"
              @click="handlePagePrev"
            >
              ‹ 上一页
            </button>
            <span>
              第
              <input
                type="number"
                min="1"
                :max="computedRankPages"
                v-model.number="state.currentPage"
                aria-label="当前页码"
              />
              / <b>{{ computedRankPages }}</b> 页
            </span>
            <button
              type="button"
              :disabled="state.currentPage >= computedRankPages"
              @click="handlePageNext(computedRankPages)"
            >
              下一页 ›
            </button>
          </nav>
        </div>

        <!-- 排行榜右侧智能对比柱状图 -->
        <div class="pricing-chart aa-rank-chart-panel">
          <div class="aa-chart-header">
            <span class="aa-chart-title">前沿大模型智能指数对比</span>
            <span class="muted small">Artificial Analysis 权威盲测综合分</span>
          </div>
          <div class="aa-bars-container">
            <div
              v-for="(item, i) in topRankingModels"
              :key="item.name"
              class="aa-bar-row"
            >
              <span class="aa-bar-model-name" :title="item.name">{{ item.name }}</span>
              <div class="aa-bar-track">
                <div
                  class="aa-bar-fill"
                  :style="{
                    width: `${Math.min(100, Math.max(10, (item.score / maxRankScore) * 100))}%`,
                    background: barColors[i % barColors.length]
                  }"
                >
                  <span class="aa-bar-val">{{ item.score.toFixed(1) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <PricingSettingsPanel v-if="settingsMounted" :visible="active && settingsOpen" :anchor="settingsAnchor" @close="settingsOpen = false" @saved="onSettingsSaved" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount, defineAsyncComponent } from "vue";
import { useCardActivity } from "../core/useCardActivity";
const { active, standalone } = useCardActivity("daily-pricing", "/pricing.html");
import { loadPricingConnectionStatus, PRICING_SETTINGS_KEYS } from "./settings";
const PricingSettingsPanel = defineAsyncComponent(() => import("./PricingSettingsPanel.vue"));
import { pricingState, pricingController, type PricingState } from "./pricing-store";
import { fullscreenCardState } from "../core/fullscreen-card-state";
const ImageBenchmarkView = defineAsyncComponent(() => import("./ImageBenchmarkView.vue"));


declare const chrome: any;

const state = pricingState;
const PAGE_SIZE = 10;
const barColors = ["#8b5cf6", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f97316"];

const settingsOpen = ref(false);
const settingsMounted = ref(false);
const settingsAnchor = ref<HTMLElement | null>(null);
const connectionStatusError = ref("");
let disposed = false, statusVersion = 0;
watch(settingsOpen, open => { if (open) settingsMounted.value = true; });
async function readConnectionStatus() {
  const version = ++statusVersion;
  if (!active.value || disposed) return;
  try {
    const status = await loadPricingConnectionStatus();
    if (disposed || !active.value || version !== statusVersion) return;
    Object.assign(state, status);
    connectionStatusError.value = "";
  } catch {
    if (disposed || !active.value || version !== statusVersion) return;
    state.hasOpenRouterKey = false; state.hasAaApiKey = false;
    connectionStatusError.value = "配置状态读取失败；保存内容未改动。";
  }
}
function onSettingsSaved() {
  if (active.value) void readConnectionStatus();
}
function onStorageChanged(changes: Record<string, unknown>, area: string) {
  if (area === "local" && PRICING_SETTINGS_KEYS.some(key => key in changes)) void readConnectionStatus();
}
function onLocalStorageChanged(event: StorageEvent) {
  if (event.key === null || PRICING_SETTINGS_KEYS.some(key => key === event.key)) void readConnectionStatus();
}
function stopStatusReads() {
  ++statusVersion;
  if (typeof chrome !== "undefined") chrome.storage?.onChanged?.removeListener(onStorageChanged);
  window.removeEventListener("storage", onLocalStorageChanged);
}
watch(active, visible => {
  stopStatusReads();
  if (!visible || disposed) return;
  if (typeof chrome !== "undefined") chrome.storage?.onChanged?.addListener(onStorageChanged);
  window.addEventListener("storage", onLocalStorageChanged);
  void readConnectionStatus();
}, { immediate: true, flush: "sync" });
onBeforeUnmount(() => {
  disposed = true; stopStatusReads();
});
function formatContext(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M ctx`;
  if (tokens >= 1000) return `${Math.round(tokens / 1000)}k ctx`;
  return `${tokens} ctx`;
}

const currentSourceText = computed(() => {
  if (state.view === "rank") return "Artificial Analysis 排行内置示例";
  if (state.view === "price") return "OpenRouter 定价内置示例";
  return "生图与多模态基准评测";
});

const currentSourceUrl = computed(() => {
  if (state.view === "rank") return "https://artificialanalysis.ai/leaderboards/models";
  return "https://openrouter.ai/models";
});

// --- 价格视图逻辑 ---
const filteredModels = computed(() => {
  let list = [...state.models];
  if (state.favoritesOnly) {
    list = list.filter((m) => m.isFavorite);
  }
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.creator.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q)
    );
  }
  if (state.sortMode === "cheap-in") {
    list.sort((a, b) => a.inputPrice - b.inputPrice);
  } else if (state.sortMode === "cheap-out") {
    list.sort((a, b) => a.outputPrice - b.outputPrice);
  } else if (state.sortMode === "free") {
    list.sort((a, b) => (a.inputPrice + a.outputPrice) - (b.inputPrice + b.outputPrice));
  } else if (state.sortMode === "context") {
    list.sort((a, b) => b.contextLength - a.contextLength);
  }
  return list;
});

const computedPricePages = computed(() => {
  return Math.max(1, Math.ceil(filteredModels.value.length / PAGE_SIZE));
});

const paginatedModels = computed(() => {
  const start = (state.currentPage - 1) * PAGE_SIZE;
  return filteredModels.value.slice(start, start + PAGE_SIZE);
});

const chartPoints = computed(() => {
  const list = filteredModels.value.slice(0, 30);
  if (list.length < 2) return "10,160 550,160";
  const W = 560, H = 180, PAD = 10;
  const max = Math.max(...list.map((m) => m.outputPrice || 1), 1);
  const stepX = (W - PAD * 2) / (list.length - 1);
  return list
    .map((m, i) => {
      const val = m.outputPrice || 0.1;
      const x = (PAD + i * stepX).toFixed(1);
      const y = (PAD + (1 - val / max) * (H - PAD * 2)).toFixed(1);
      return `${x},${y}`;
    })
    .join(" ");
});

// --- 排行视图逻辑 ---
const filteredRankings = computed(() => {
  let list = [...state.ranking];
  if (state.favoritesOnly) {
    list = list.filter((r) => r.isFavorite);
  }
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.creator.toLowerCase().includes(q)
    );
  }
  list.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  return list;
});

const computedRankPages = computed(() => {
  return Math.max(1, Math.ceil(filteredRankings.value.length / PAGE_SIZE));
});

const paginatedRankings = computed(() => {
  const start = (state.currentPage - 1) * PAGE_SIZE;
  return filteredRankings.value.slice(start, start + PAGE_SIZE);
});

const topRankingModels = computed(() => {
  return filteredRankings.value.slice(0, 8);
});

const maxRankScore = computed(() => {
  const scores = topRankingModels.value.map((m) => m.score);
  return Math.max(...scores, 100);
});

// --- 事件交互处理 ---
function handleSwitchView(view: PricingState["view"]) {
  state.view = view;
  state.currentPage = 1;
  pricingController.dispatch("switch-view", view);
}

function handleSelectImageModel(id: string) {
  pricingController.selectImageModel(id);
}

function handleSortChange() {
  state.currentPage = 1;
  pricingController.dispatch("set-sort", state.sortMode);
}

function handleToggleFavoritesFilter() {
  state.favoritesOnly = !state.favoritesOnly;
  state.currentPage = 1;
  pricingController.dispatch("toggle-favorites-only", state.favoritesOnly);
}

function handleToggleFavorite(idOrName: string) {
  pricingController.toggleFavorite(idOrName);
}

function handlePagePrev() {
  if (state.currentPage > 1) {
    state.currentPage--;
    pricingController.dispatch("set-page", state.currentPage);
  }
}

function handlePageNext(maxPages: number) {
  if (state.currentPage < maxPages) {
    state.currentPage++;
    pricingController.dispatch("set-page", state.currentPage);
  }
}
</script>

<style scoped>
.vue-pricing-wrapper {
  width: 100%;
}

.pricing-rates-badge {
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
}

.rate-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
}

.rate-tag.in {
  color: #38bdf8;
}

.rate-tag.out {
  color: #f59e0b;
}

.rate-tag.ctx {
  color: #a78bfa;
}

.pricing-fav-btn {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.pricing-fav-btn:hover {
  color: #f43f5e;
  background: rgba(244, 63, 94, 0.1);
}

.pricing-fav-btn.on {
  color: #f43f5e;
}

/* 排行榜专用样式 */
.aa-rank-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.aa-rank-metric {
  font-size: 11px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 6px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.aa-rank-metric b {
  color: #38bdf8;
}

.aa-rank-chart-panel {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.4);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.aa-chart-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
}

.aa-chart-title {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.aa-bars-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.aa-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.aa-bar-model-name {
  width: 110px;
  font-size: 12px;
  color: #cbd5e1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  flex-shrink: 0;
}

.aa-bar-track {
  flex: 1;
  height: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.aa-bar-fill {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 6px;
  transition: width 0.4s ease;
}

.aa-bar-val {
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}

.api-badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 6px;
  font-weight: 500;
}

.api-badge.ok {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.api-badge.rss {
  background: rgba(249, 115, 22, 0.15);
  color: #fb923c;
  border: 1px solid rgba(249, 115, 22, 0.3);
}
</style>
