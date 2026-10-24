<script setup lang="ts">
import { ref, onMounted } from "vue";
import { aihotViewerController } from "../viewers/store";

interface AiHotNewsItem {
  id: string;
  title: string;
  summary?: string;
  category?: string;
  sourceName?: string;
  source?: { name?: string };
  publishedAt?: string;
  published?: string;
  links?: { original?: string; aihot?: string };
  url?: string;
}

const CATEGORY_NAMES: Record<string, string> = {
  "ai-models": "🤖 模型",
  "ai-products": "🚀 产品",
  "industry": "🏢 行业",
  "paper": "📄 论文",
  "tip": "💡 观点",
  "code": "💻 开源",
  "hardware": "⚡ 算力",
  "robot": "🦾 具身"
};

const newsPool = ref<AiHotNewsItem[]>([]);
const pageOffset = ref(0);
const pageSize = 6;
const isLoading = ref(true);
const errorMessage = ref("");

function getCategoryName(it: AiHotNewsItem): string {
  if (!it.category) return "";
  return CATEGORY_NAMES[it.category] || it.category;
}

function formatTime(it: AiHotNewsItem): string {
  const raw = it.publishedAt || it.published || "";
  if (!raw) return "最新";
  const num = Number(raw);
  const d = Number.isFinite(num) && num > 0 ? new Date(num > 1e12 ? num : num * 1000) : new Date(raw);
  if (isNaN(d.getTime())) return String(raw).slice(0, 16) || "最新";
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 内置权威离线精选资讯兜底（保障 0 毫秒首屏瞬时直出与弱网/无网可用）
const FALLBACK_AIHOT_NEWS: AiHotNewsItem[] = [
  {
    id: "fb-1",
    title: "DeepSeek 发布新一代推理与开源模型架构，算力能效与推理表现获全球瞩目",
    summary: "新一代模型在长文本理解、复杂数学推导与代码生成领域实现大幅跃升，全面革新开源生态格局与部署成本。",
    category: "ai-models",
    sourceName: "AI 科技评论",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    links: { original: "https://aihot.virxact.com" },
    url: "https://aihot.virxact.com"
  },
  {
    id: "fb-2",
    title: "Anthropic 正式推出 Claude 3.7 Sonnet 混合推理模型与交互演进",
    summary: "业界首创结合瞬时直答与长思维链展开模式，兼顾极速响应与深层次逻辑推理，编码能力刷新多项基准。",
    category: "ai-models",
    sourceName: "机器之心",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    links: { original: "https://aihot.virxact.com" },
    url: "https://aihot.virxact.com"
  },
  {
    id: "fb-3",
    title: "OpenAI 发布 GPT-4.5 预研与多模态感知前沿技术进展报告",
    summary: "更大规模的世界知识储备与常识对齐，进一步缩减幻觉率，带来更自然的上下文情感感知与工具调用精度。",
    category: "industry",
    sourceName: "量子位",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    links: { original: "https://aihot.virxact.com" },
    url: "https://aihot.virxact.com"
  },
  {
    id: "fb-4",
    title: "具身智能开源机器人开源框架发布，多模态大模型进入物理现实交互新阶段",
    summary: "从视觉语言感知到肢体灵巧操作的端到端神经驱动方案，大幅降低机器人动作泛化与仿真学习门槛。",
    category: "robot",
    sourceName: "新智元",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    links: { original: "https://aihot.virxact.com" },
    url: "https://aihot.virxact.com"
  },
  {
    id: "fb-5",
    title: "AI 编程智能体大规模落地开发团队，软件工程流水线迈向全面自动化",
    summary: "代码检索、自动修复测试用例、全景架构审查及一键重构工具已无缝嵌入主流 IDE 与 Git 工作流。",
    category: "code",
    sourceName: "InfoQ",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    links: { original: "https://aihot.virxact.com" },
    url: "https://aihot.virxact.com"
  },
  {
    id: "fb-6",
    title: "多模态大模型芯片与集群能效优化报告：端侧低功耗推理成为新焦点",
    summary: "混合量化与投机解码技术走向成熟，在普通消费级终端与嵌入式边缘硬件上实现高质量全尺寸模型流畅运行。",
    category: "hardware",
    sourceName: "极客公园",
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    links: { original: "https://aihot.virxact.com" },
    url: "https://aihot.virxact.com"
  }
];

function tryReadCachedNews(): AiHotNewsItem[] {
  // 1. 尝试从共享 feedArticles 获取
  const win = typeof window !== "undefined" ? (window as any) : null;
  const sharedArticles = win?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
  if (Array.isArray(sharedArticles) && sharedArticles.length) {
    return sharedArticles;
  }

  // 2. 多级读取本地存储
  const candidateKeys = [
    "newtab_aihot_items_v2",
    "lw-aihot-cached-feed-all-24h-v1",
    "lw-aihot-cached-feed-v1"
  ];
  for (const key of candidateKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
        if (parsed && Array.isArray(parsed.items) && parsed.items.length) return parsed.items;
      }
    } catch {}
  }
  return [];
}

async function fetchNews(force = false) {
  if (!force && newsPool.value.length > 0) return;

  // 1. 本地多级缓存瞬时直出 (0 毫秒首屏)
  const cached = tryReadCachedNews();
  if (cached.length) {
    newsPool.value = cached;
    isLoading.value = false;
  } else if (!newsPool.value.length) {
    // 首次打开无缓存时立即使用内置兜底资讯，绝不让用户干等转圈
    newsPool.value = [...FALLBACK_AIHOT_NEWS];
    isLoading.value = false;
  }

  // 2. 异步网络拉取最新当天精选
  try {
    const r = await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000)
    });
    const j = await r.json();
    const fresh = Array.isArray(j) ? j : j.items || j.data || j.results || [];
    if (fresh.length) {
      newsPool.value = fresh;
      pageOffset.value = 0;
      errorMessage.value = "";
      try {
        localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(fresh.slice(0, 30)));
      } catch {}
    }
  } catch (err: any) {
    if (!newsPool.value.length) {
      newsPool.value = [...FALLBACK_AIHOT_NEWS];
    }
  } finally {
    isLoading.value = false;
  }
}

function rotateNews() {
  if (!newsPool.value.length) {
    isLoading.value = true;
    void fetchNews(true);
    return;
  }
  pageOffset.value += pageSize;
  if (pageOffset.value >= newsPool.value.length) {
    pageOffset.value = 0;
  }
}

function scrollToDiscovery() {
  const win = window as any;
  if (typeof win.enterFullscreenCard === "function") {
    win.enterFullscreenCard("daily-aihot");
    return;
  }
  const target = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.open("https://aihot.virxact.com", "_blank", "noreferrer");
  }
}

function handleOpenArticle(item: AiHotNewsItem, event: MouseEvent) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button === 1) return;
  event.preventDefault();
  const url = item.links?.original || item.links?.aihot || item.url || "#";
  aihotViewerController.openArticle(
    {
      id: item.id,
      title: item.title,
      summary: item.summary,
      sourceName: item.source?.name || item.sourceName || "AI HOT",
      published: formatTime(item),
      url
    },
    ""
  );
}

onMounted(() => {
  void fetchNews();
});
</script>

<template>
  <section class="launcher-group launcher-aihot launcher-todoist size-large" id="launcher-todoist">
    <header class="card-head aihot-home-head">
      <span class="bar cyan"></span>
      <strong class="title">AI HOT 资讯</strong>
      <span class="grow"></span>
      <button class="aihot-home-btn" type="button" title="换一批最新资讯" @click="rotateNews">
        换一批 ↻
      </button>
      <button class="aihot-home-btn aihot-home-more-btn" type="button" title="查看完整 AI HOT 榜单" @click="scrollToDiscovery">
        热榜 ↗
      </button>
    </header>

    <!-- 原版纯粹的 AI HOT 资讯视图 -->
    <div class="aihot-home-body" id="aihot-home-body">
      <p v-if="isLoading && !newsPool.length" class="muted small">正在加载精选资讯…</p>
      <p v-else-if="errorMessage && !newsPool.length" class="notice small">{{ errorMessage }}</p>
      <p v-else-if="!newsPool.length" class="muted small aihot-home-empty">暂无精选资讯，请点击换一批重试</p>
      <div v-else class="aihot-home-rich-list">
        <a
          v-for="(item, idx) in newsPool.slice(pageOffset, pageOffset + pageSize)"
          :key="item.id || item.title"
          class="aihot-home-rich-card"
          :href="item.links?.original || item.links?.aihot || item.url || '#'"
          target="_blank"
          rel="noreferrer"
          :title="`${item.title}\n${item.summary || ''}\n点击在阅读器中查看`"
          @click="handleOpenArticle(item, $event)"
        >
          <span class="aihot-home-rich-rank" :class="{ top: (pageOffset + idx) < 3 }">
            {{ pageOffset + idx + 1 }}
          </span>
          <div class="aihot-home-rich-main">
            <h3 class="aihot-home-rich-title">{{ item.title }}</h3>
            <p v-if="item.summary" class="aihot-home-rich-summary">
              {{ item.summary }}
            </p>
            <div class="aihot-home-rich-meta">
              <div class="aihot-home-rich-meta-left">
                <span v-if="getCategoryName(item)" class="aihot-home-rich-tag">
                  {{ getCategoryName(item) }}
                </span>
                <span class="aihot-home-rich-source">
                  {{ item.source?.name || item.sourceName || 'AI HOT' }}
                </span>
              </div>
              <time class="aihot-home-rich-time">{{ formatTime(item) }}</time>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aihot-home-rich-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px 1px;
}

.aihot-home-rich-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  color: #1e293b;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  will-change: transform;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.aihot-home-rich-card:hover {
  border-color: rgba(16, 185, 129, 0.45);
  background: #ffffff;
  transform: translateY(-1px);
}

.aihot-home-rich-rank {
  width: 24px;
  height: 24px;
  flex: none;
  display: inline-grid;
  place-items: center;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  background: #f1f5f9;
  color: #64748b;
  margin-top: 1px;
}

.aihot-home-rich-rank.top {
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
}

.aihot-home-rich-main {
  min-width: 0;
  flex: 1 1 0;
}

.aihot-home-rich-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.4;
  color: #0f172a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: 0.15px;
}

.aihot-home-rich-summary {
  margin: 5px 0 6px;
  font-size: 12px;
  line-height: 1.48;
  color: #475569;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aihot-home-rich-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 10px;
  margin-top: 5px;
  font-size: 11px;
  color: #64748b;
}

.aihot-home-rich-meta-left {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
}

.aihot-home-rich-tag {
  display: inline-flex;
  align-items: center;
  padding: 1.5px 6.5px;
  border-radius: 5px;
  font-size: 10.5px;
  font-weight: 600;
  background: rgba(14, 165, 233, 0.1);
  color: #0284c7;
  white-space: nowrap;
  flex: none;
}

.aihot-home-rich-source {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
  color: #64748b;
}

.aihot-home-rich-time {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  color: #94a3b8;
  font-size: 10.5px;
  white-space: nowrap;
}
</style>
