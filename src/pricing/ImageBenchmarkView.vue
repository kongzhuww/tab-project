<template>
  <div class="image-benchmark-view light-mode">
    <!-- 顶部双模型选择器（主模型 PK 对比组）与指标状态栏 -->
    <div class="benchmark-subbar">
      <!-- 1. 主模型选择 -->
      <div class="model-select-group">
        <label for="benchmark-model-picker" class="picker-label primary">
          <span class="color-dot primary"></span> 主测模型：
        </label>
        <select
          id="benchmark-model-picker"
          class="benchmark-select primary"
          :value="activeModel.id"
          @change="onModelSelect(($event.target as HTMLSelectElement).value)"
        >
          <optgroup label="🌟 开源前沿矩阵">
            <option
              v-for="m in models.filter(it => it.group === 'open-source')"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }} ({{ m.creator }})
            </option>
          </optgroup>
          <optgroup label="💎 商业标杆矩阵">
            <option
              v-for="m in models.filter(it => it.group === 'commercial')"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }} ({{ m.creator }})
            </option>
          </optgroup>
          <optgroup label="⚡ 极速轻量矩阵">
            <option
              v-for="m in models.filter(it => it.group === 'lightweight')"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }} ({{ m.creator }})
            </option>
          </optgroup>
        </select>
      </div>

      <!-- 2. 对比模型选择（彻底解决右边无意义的问题） -->
      <div class="model-select-group">
        <label for="benchmark-compare-picker" class="picker-label compare">
          <span class="color-dot compare"></span> 对比基准：
        </label>
        <select
          id="benchmark-compare-picker"
          class="benchmark-select compare"
          :value="compareModelId"
          @change="compareModelId = ($event.target as HTMLSelectElement).value"
        >
          <option value="__benchmark__">📐 行业基准均值线 (Top19)</option>
          <optgroup label="🌟 开源模型对比">
            <option
              v-for="m in models.filter(it => it.group === 'open-source' && it.id !== activeModel.id)"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }} ({{ m.creator }})
            </option>
          </optgroup>
          <optgroup label="💎 商业标杆对比">
            <option
              v-for="m in models.filter(it => it.group === 'commercial' && it.id !== activeModel.id)"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }} ({{ m.creator }})
            </option>
          </optgroup>
          <optgroup label="⚡ 极速轻量对比">
            <option
              v-for="m in models.filter(it => it.group === 'lightweight' && it.id !== activeModel.id)"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }} ({{ m.creator }})
            </option>
          </optgroup>
        </select>
      </div>

      <div class="model-quick-tags">
        <span class="quick-tag badge">{{ activeModel.badge || '评测标杆' }}</span>
        <span class="quick-tag" :class="activeModel.isOpenSource ? 'open' : 'closed'">
          {{ activeModel.isOpenSource ? '🔓 开源' : '🔒 闭源' }}
        </span>
        <span class="quick-tag time">⏱ 平均 {{ activeModel.generationLatencySec }}s</span>
        <span class="quick-tag cost">💰 {{ activeModel.priceText }}</span>
      </div>
    </div>

    <!-- 主展示卡片：现代纯净高级白风格 (Light Clean Modern) -->
    <div class="turing-card">
      <!-- 1. 顶部 Header 区 -->
      <div class="turing-card-header">
        <div class="header-left">
          <div class="creator-badge">
            <span class="creator-icon">⬡</span>
            <span class="creator-name">{{ activeModel.creator }} · {{ activeModel.groupName }}</span>
          </div>
          <div class="title-row">
            <h3 class="model-title">{{ activeModel.name }}</h3>
            <span class="license-tag" :class="{ 'is-open': activeModel.isOpenSource }">
              <span class="lock-icon">{{ activeModel.isOpenSource ? '🔓' : '🔒' }}</span>
              {{ activeModel.isOpenSource ? '开源' : '闭源' }}
            </span>
            <span class="vs-badge" v-if="compareModel">
              PK <b>{{ compareModel.name }}</b>
            </span>
          </div>
        </div>

        <div class="header-right">
          <div class="source-tag">
            <span class="compass-icon">🧭</span>
            <span>图灵坐标全景</span>
          </div>
        </div>
      </div>

      <!-- 2. 中部核心区：左侧指标与帕累托图 + 右侧八维能力重叠雷达 -->
      <div class="turing-body-grid">
        <!-- 左侧列：Elo 胶囊 + 帕累托散点图 + 底部元信息 -->
        <div class="grid-left-col">
          <!-- 三大基准 Elo 指标胶囊 -->
          <div class="elo-capsules-container">
            <!-- AA 文生图 Elo -->
            <div class="elo-capsule">
              <div class="capsule-header">
                <span class="capsule-name">AA 文生图 Elo</span>
                <span class="capsule-rank">#{{ activeModel.aaElo.rank }} / {{ activeModel.aaElo.total }}</span>
              </div>
              <div class="capsule-main">
                <span class="capsule-score">{{ activeModel.aaElo.score }}</span>
                <span class="capsule-unit">分</span>
                <span class="capsule-diff" v-if="compareModel" :class="diffClass(activeModel.aaElo.score, compareModel.aaElo.score)">
                  {{ diffText(activeModel.aaElo.score, compareModel.aaElo.score) }}
                </span>
              </div>
              <div class="capsule-footer">
                <span class="muted-text">样本量: {{ activeModel.aaElo.samples.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Arena 文生图 Elo -->
            <div class="elo-capsule">
              <div class="capsule-header">
                <span class="capsule-name">Arena 文生图 Elo</span>
                <span class="capsule-rank">#{{ activeModel.arenaElo.rank }} / {{ activeModel.arenaElo.total }}</span>
              </div>
              <div class="capsule-main">
                <span class="capsule-score">{{ activeModel.arenaElo.score }}</span>
                <span class="capsule-unit">分</span>
                <span class="capsule-diff" v-if="compareModel" :class="diffClass(activeModel.arenaElo.score, compareModel.arenaElo.score)">
                  {{ diffText(activeModel.arenaElo.score, compareModel.arenaElo.score) }}
                </span>
              </div>
              <div class="capsule-footer">
                <span class="muted-text">投票数: {{ activeModel.arenaElo.votes.toLocaleString() }}</span>
              </div>
            </div>

            <!-- DA 文生图 Elo -->
            <div class="elo-capsule">
              <div class="capsule-header">
                <span class="capsule-name">DA 文生图 Elo</span>
                <span class="capsule-rank">#{{ activeModel.daElo.rank }} / {{ activeModel.daElo.total }}</span>
              </div>
              <div class="capsule-main">
                <span class="capsule-score">{{ activeModel.daElo.score }}</span>
                <span class="capsule-unit">分</span>
                <span class="capsule-diff" v-if="compareModel" :class="diffClass(activeModel.daElo.score, compareModel.daElo.score)">
                  {{ diffText(activeModel.daElo.score, compareModel.daElo.score) }}
                </span>
              </div>
              <div class="capsule-footer">
                <span class="muted-text">投票数: {{ activeModel.daElo.votes.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- 性价比前沿分析图 (Pareto Frontier) -->
          <div class="pareto-card">
            <div class="pareto-header">
              <div class="pareto-title">
                <span class="chart-icon">📈</span>
                <span>性价比前沿分析 (DesignArena)</span>
                <span class="pareto-hint">（点击点位可一键设为对比组）</span>
              </div>
              <div class="pareto-legend">
                <span class="legend-item"><i class="dash-line"></i> 性价比前沿</span>
                <span class="legend-item"><i class="dot active"></i> 主测模型</span>
                <span class="legend-item" v-if="compareModel"><i class="dot compare"></i> 对比模型</span>
              </div>
            </div>

            <div class="pareto-svg-box">
              <svg viewBox="0 0 540 220" class="pareto-svg" role="img" aria-label="性价比前沿分析图">
                <!-- 坐标网格背景 -->
                <line x1="50" y1="180" x2="510" y2="180" class="axis-line" />
                <line x1="50" y1="20" x2="50" y2="180" class="axis-line" />
                <line x1="50" y1="130" x2="510" y2="130" class="grid-line" />
                <line x1="50" y1="75" x2="510" y2="75" class="grid-line" />

                <!-- 纵坐标 Y (DA Elo: 900 ~ 1300) -->
                <text x="42" y="184" class="axis-text" text-anchor="end">900</text>
                <text x="42" y="134" class="axis-text" text-anchor="end">1050</text>
                <text x="42" y="79" class="axis-text" text-anchor="end">1175</text>
                <text x="42" y="24" class="axis-text" text-anchor="end">1300</text>

                <!-- 横坐标 X (Price: $0.25, $0.5, $1, $2.5, $5, $10) -->
                <text x="75" y="198" class="axis-text" text-anchor="middle">$0.25</text>
                <text x="145" y="198" class="axis-text" text-anchor="middle">$0.5</text>
                <text x="215" y="198" class="axis-text" text-anchor="middle">$1</text>
                <text x="285" y="198" class="axis-text" text-anchor="middle">$2.5</text>
                <text x="365" y="198" class="axis-text" text-anchor="middle">$5</text>
                <text x="450" y="198" class="axis-text" text-anchor="middle">$10</text>

                <!-- 前沿虚线连接 -->
                <path :d="paretoPath" class="frontier-path" />

                <!-- 所有模型散点（支持点击选择为对比组） -->
                <g v-for="m in models" :key="m.id" class="pareto-dot-group" @click="handleDotClick(m.id)">
                  <circle
                    :cx="priceToX(m.pareto.price)"
                    :cy="eloToY(m.pareto.elo)"
                    :r="m.id === activeModel.id ? 8 : (compareModel && m.id === compareModel.id ? 7 : 5)"
                    :class="[
                      'model-dot',
                      m.id === activeModel.id ? 'is-active' : '',
                      compareModel && m.id === compareModel.id ? 'is-compare' : '',
                      m.pareto.isFrontier ? 'is-frontier' : ''
                    ]"
                  />
                  <!-- 点位名称标注 -->
                  <text
                    :x="priceToX(m.pareto.price)"
                    :y="eloToY(m.pareto.elo) - 10"
                    :class="[
                      'dot-label',
                      m.id === activeModel.id ? 'label-active' : '',
                      compareModel && m.id === compareModel.id ? 'label-compare' : ''
                    ]"
                    text-anchor="middle"
                  >
                    {{ m.name }}
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <!-- 底部参数条 -->
          <div class="model-meta-bar">
            <div class="meta-item">
              <span class="meta-title">发布时间</span>
              <strong class="meta-val">{{ activeModel.releaseDate }}</strong>
            </div>
            <div class="meta-item">
              <span class="meta-title">输入模态</span>
              <strong class="meta-val text-brand">{{ activeModel.modality }} (Text)</strong>
            </div>
            <div class="meta-item">
              <span class="meta-title">生成耗时</span>
              <strong class="meta-val">{{ activeModel.generationLatencySec }} 秒</strong>
            </div>
            <div class="meta-item">
              <span class="meta-title">计费价格</span>
              <strong class="meta-val text-cost">{{ activeModel.priceText }}</strong>
            </div>
          </div>
        </div>

        <!-- 右侧列：八维全景能力雷达图 (双模型重叠 PK 对比) -->
        <div class="grid-right-col">
          <div class="radar-card">
            <div class="radar-card-header">
              <div class="radar-title-group">
                <h4 class="radar-heading">八维全景能力图谱</h4>
                <span class="mean-badge primary">
                  {{ activeModel.name }} 均值: <b class="mean-val">{{ activeModel.radarMean }}</b>
                </span>
                <span class="mean-badge compare" v-if="compareModel">
                  {{ compareModel.name }} 均值: <b>{{ compareModel.radarMean }}</b>
                </span>
              </div>

              <div class="radar-legend">
                <span class="radar-legend-item">
                  <i class="legend-box active"></i> {{ activeModel.name }}
                </span>
                <span class="radar-legend-item compare" v-if="compareModel">
                  <i class="legend-box compare"></i> {{ compareModel.name }}
                </span>
                <span class="radar-legend-item benchmark" v-if="!compareModel">
                  <i class="legend-dash"></i> 行业基准线
                </span>
              </div>
            </div>

            <!-- SVG 正八边形雷达主体 -->
            <div class="radar-chart-box">
              <svg viewBox="0 0 460 430" class="radar-svg" role="img" aria-label="八维能力雷达图">
                <defs>
                  <radialGradient id="radarGlowPrimary" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="#2563eb" stop-opacity="0.08" />
                  </radialGradient>
                  <radialGradient id="radarGlowCompare" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#f97316" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#f97316" stop-opacity="0.06" />
                  </radialGradient>
                </defs>

                <!-- 1. 背景八边形网格层 (4圈刻度: 25%, 50%, 75%, 100%) -->
                <polygon
                  v-for="(rRatio, idx) in [0.35, 0.6, 0.85, 1.0]"
                  :key="idx"
                  :points="getOctagonPoints(rRatio)"
                  :class="idx === 3 ? 'radar-grid-outer' : 'radar-grid-inner'"
                />

                <!-- 2. 八条径向辐射轴线 -->
                <line
                  v-for="(axis, i) in radialAxes"
                  :key="i"
                  :x1="centerX"
                  :y1="centerY"
                  :x2="axis.x"
                  :y2="axis.y"
                  class="radar-axis-line"
                />

                <!-- 3. 对比层 A：如果没选对比模型，绘制行业基准虚线圈 -->
                <polygon
                  v-if="!compareModel"
                  :points="benchmarkPoints"
                  class="radar-benchmark-polygon"
                />

                <!-- 4. 对比层 B：如果选了对比模型，绘制对比模型的雷达图 -->
                <polygon
                  v-if="compareModel"
                  :points="comparePoints"
                  fill="url(#radarGlowCompare)"
                  class="radar-compare-polygon"
                />

                <!-- 5. 主模型雷达多边形 -->
                <polygon
                  :points="primaryPoints"
                  fill="url(#radarGlowPrimary)"
                  class="radar-primary-polygon"
                />

                <!-- 6. 对比模型顶点圆点 -->
                <g v-if="compareModel">
                  <circle
                    v-for="(pt, i) in compareVertexCoords"
                    :key="'cmp-' + i"
                    :cx="pt.x"
                    :cy="pt.y"
                    r="4"
                    class="radar-vertex-dot compare"
                  />
                </g>

                <!-- 7. 主模型顶点圆点 -->
                <g>
                  <circle
                    v-for="(pt, i) in primaryVertexCoords"
                    :key="'pri-' + i"
                    :cx="pt.x"
                    :cy="pt.y"
                    r="5"
                    class="radar-vertex-dot primary"
                  />
                </g>

                <!-- 8. 八维文字与对比胜负标签 -->
                <g v-for="(dim, i) in dimensionLabelPositions" :key="dim.key">
                  <text
                    :x="dim.x"
                    :y="dim.y - 14"
                    class="dim-label-title"
                    :text-anchor="dim.anchor"
                  >
                    {{ dim.name }}
                  </text>
                  <text
                    :x="dim.x"
                    :y="dim.y + 4"
                    class="dim-label-score"
                    :text-anchor="dim.anchor"
                  >
                    <tspan class="score-pri">{{ dim.score }}</tspan>
                    <tspan class="score-vs" v-if="dim.compareScore"> vs {{ dim.compareScore }}</tspan>
                    <tspan
                      v-if="dim.diff !== undefined"
                      :class="dim.diff >= 0 ? 'score-win' : 'score-lose'"
                    >
                      ({{ dim.diff >= 0 ? '+' + dim.diff : dim.diff }})
                    </tspan>
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  IMAGE_GEN_BENCHMARK_MODELS,
  PARETO_CURVE_POINTS,
  type ImageGenBenchmarkModel
} from "./image-benchmark-data";

const props = defineProps<{
  selectedModelId: string;
}>();

const emit = defineEmits<{
  (e: "select-model", id: string): void;
}>();

const models = IMAGE_GEN_BENCHMARK_MODELS;

// 对比模型 ID，默认为 Midjourney v6.1（商业标杆），形成开箱即有的双模型精彩 PK
const compareModelId = ref<string>("midjourney-v6-1");

const activeModel = computed<ImageGenBenchmarkModel>(() => {
  return models.find((m) => m.id === props.selectedModelId) || models[0];
});

const compareModel = computed<ImageGenBenchmarkModel | null>(() => {
  if (compareModelId.value === "__benchmark__") return null;
  return models.find((m) => m.id === compareModelId.value) || null;
});

function onModelSelect(id: string) {
  emit("select-model", id);
  if (compareModelId.value === id) {
    compareModelId.value = id === "midjourney-v6-1" ? "recraft-v3" : "midjourney-v6-1";
  }
}

function handleDotClick(id: string) {
  if (id === activeModel.value.id) return;
  compareModelId.value = id;
}

function diffClass(score1: number, score2: number): string {
  if (score1 > score2) return "win";
  if (score1 < score2) return "lose";
  return "draw";
}

function diffText(score1: number, score2: number): string {
  const d = score1 - score2;
  return d >= 0 ? `+${d}` : `${d}`;
}

// ---------- 帕累托图坐标映射 ----------
function priceToX(price: number): number {
  const minX = 75, maxX = 460;
  const minLog = Math.log10(0.25);
  const maxLog = Math.log10(12);
  const curLog = Math.log10(Math.max(0.25, price));
  const t = (curLog - minLog) / (maxLog - minLog);
  return minX + t * (maxX - minX);
}

function eloToY(elo: number): number {
  const minY = 25, maxY = 180;
  const minElo = 900, maxElo = 1300;
  const t = (elo - minElo) / (maxElo - minElo);
  return maxY - t * (maxY - minY);
}

const paretoPath = computed(() => {
  return PARETO_CURVE_POINTS.map((pt, idx) => {
    const x = priceToX(pt.price).toFixed(1);
    const y = eloToY(pt.elo).toFixed(1);
    return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
});

// ---------- 八维雷达图数学坐标 ----------
const centerX = 230;
const centerY = 210;
const maxRadius = 140;

function getOctagonPoints(rRatio: number): string {
  const pts: string[] = [];
  const r = maxRadius * rRatio;
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const radialAxes = computed(() => {
  const axes = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    axes.push({
      x: centerX + maxRadius * Math.cos(angle),
      y: centerY + maxRadius * Math.sin(angle)
    });
  }
  return axes;
});

function getPointsForScores(scores: number[]): string {
  const minScore = 750;
  const maxScore = 1350;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const s = scores[i] || 1000;
    const ratio = Math.max(0.15, Math.min(1.0, (s - minScore) / (maxScore - minScore)));
    const r = maxRadius * ratio;
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const primaryPoints = computed(() => {
  return getPointsForScores(activeModel.value.dimensions.map((d) => d.score));
});

const comparePoints = computed(() => {
  if (!compareModel.value) return "";
  return getPointsForScores(compareModel.value.dimensions.map((d) => d.score));
});

const benchmarkPoints = computed(() => {
  return getPointsForScores(activeModel.value.dimensions.map((d) => d.benchmarkScore));
});

function getVertexCoords(scores: number[]) {
  const minScore = 750;
  const maxScore = 1350;
  const list = [];
  for (let i = 0; i < 8; i++) {
    const s = scores[i] || 1000;
    const ratio = Math.max(0.15, Math.min(1.0, (s - minScore) / (maxScore - minScore)));
    const r = maxRadius * ratio;
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    list.push({
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    });
  }
  return list;
}

const primaryVertexCoords = computed(() => {
  return getVertexCoords(activeModel.value.dimensions.map((d) => d.score));
});

const compareVertexCoords = computed(() => {
  if (!compareModel.value) return [];
  return getVertexCoords(compareModel.value.dimensions.map((d) => d.score));
});

const dimensionLabelPositions = computed(() => {
  const outerR = maxRadius + 32;
  return activeModel.value.dimensions.map((d, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const x = centerX + outerR * Math.cos(angle);
    const y = centerY + outerR * Math.sin(angle);
    let anchor = "middle";
    if (Math.cos(angle) > 0.3) anchor = "start";
    else if (Math.cos(angle) < -0.3) anchor = "end";

    const cmpScore = compareModel.value ? compareModel.value.dimensions[i]?.score : undefined;
    const diff = cmpScore !== undefined ? d.score - cmpScore : undefined;

    return {
      name: d.name,
      key: d.key,
      score: d.score,
      compareScore: cmpScore,
      diff,
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      anchor
    };
  });
});
</script>

<style scoped src="./ImageBenchmarkView.css"></style>
