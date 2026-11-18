<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { LocalConversation } from '../services/byok.service';
import type { NativeConversation } from './use-native-agent';
import { aggregateWorkspaceUsage, formatCompactK, type HeatmapCell, type UsageRange } from './usage-analytics';

const props = defineProps<{
  nativeConversations: NativeConversation[];
  localConversations: LocalConversation[];
}>();

const expanded = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const activeTab = ref<'overview' | 'models'>('overview');
const range = ref<UsageRange>('all');
const hoveredCell = ref<HeatmapCell | null>(null);

const stats = computed(() =>
  aggregateWorkspaceUsage({
    nativeConversations: props.nativeConversations,
    localConversations: props.localConversations,
    range: range.value,
  })
);

const yAxisTicks = computed(() => {
  const max = stats.value.chartMaxTokens;
  if (max <= 1) return ['1', '0'];
  return [
    formatCompactK(max),
    formatCompactK(Math.round(max * 0.75)),
    formatCompactK(Math.round(max * 0.5)),
    formatCompactK(Math.round(max * 0.25)),
    '0',
  ];
});

function onOutsidePointerDown(ev: PointerEvent) {
  if (!expanded.value || !rootEl.value) return;
  if (!rootEl.value.contains(ev.target as Node)) {
    expanded.value = false;
  }
}

function onKeyDown(ev: KeyboardEvent) {
  if (expanded.value && ev.key === 'Escape') {
    expanded.value = false;
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onOutsidePointerDown);
  document.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onOutsidePointerDown);
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<template>
  <div ref="rootEl" class="home-usage-anchor">
    <button
      type="button"
      class="usage-pill-trigger"
      :class="{ open: expanded }"
      :aria-expanded="expanded"
      title="查看工作区用量概览与活跃热力图"
      @click="expanded = !expanded"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" aria-hidden="true">
        <rect x="2.2" y="8.5" width="2.4" height="5" rx="0.7" />
        <rect x="6.8" y="5" width="2.4" height="8.5" rx="0.7" />
        <rect x="11.4" y="2.5" width="2.4" height="11" rx="0.7" />
      </svg>
      <span>{{ stats.sessions }} 会话 · {{ formatCompactK(stats.totalTokens) }} tok</span>
      <span class="pill-chev">⌄</span>
    </button>

    <section v-if="expanded" class="home-usage-card" aria-label="工作区用量概览">
      <header class="usage-head">
        <div class="usage-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'overview'"
            :class="{ active: activeTab === 'overview' }"
            @click="activeTab = 'overview'"
          >概览</button>
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'models'"
            :class="{ active: activeTab === 'models' }"
            @click="activeTab = 'models'"
          >模型</button>
        </div>
        <div class="usage-ranges" role="group" aria-label="统计范围">
          <button
            v-for="opt in [{ id: 'all', label: '全部' }, { id: '30d', label: '30 天' }, { id: '7d', label: '7 天' }]"
            :key="opt.id"
            type="button"
            :class="{ active: range === opt.id }"
            @click="range = opt.id as UsageRange"
          >{{ opt.label }}</button>
        </div>
      </header>

      <template v-if="activeTab === 'overview'">
        <div class="usage-stats-grid">
          <div class="usage-tile">
            <span class="tile-label">会话数</span>
            <strong class="tile-val">{{ stats.sessions.toLocaleString('en-US') }}</strong>
          </div>
          <div class="usage-tile">
            <span class="tile-label">消息数</span>
            <strong class="tile-val">{{ stats.messages.toLocaleString('en-US') }}</strong>
          </div>
          <div class="usage-tile">
            <span class="tile-label">Token 总量</span>
            <strong class="tile-val">{{ formatCompactK(stats.totalTokens) }}</strong>
          </div>
          <div class="usage-tile">
            <span class="tile-label">活跃天数</span>
            <strong class="tile-val">{{ stats.activeDays }}</strong>
          </div>
          <div class="usage-tile">
            <span class="tile-label">高峰时段</span>
            <strong class="tile-val">{{ stats.peakHourLabel }}</strong>
          </div>
          <div class="usage-tile model-tile">
            <span class="tile-label">最常用模型</span>
            <strong class="tile-val" :title="stats.topModel">{{ stats.topModel }}</strong>
          </div>
        </div>

        <div class="heatmap-wrap" @mouseleave="hoveredCell = null">
          <div class="heatmap-grid" role="img" aria-label="近半年活跃热力图">
            <span
              v-for="cell in stats.heatmapCells"
              :key="cell.date"
              class="heat-cell"
              :data-level="cell.level"
              :class="{ future: cell.future }"
              @mouseenter="hoveredCell = cell"
            />
          </div>
          <div class="heatmap-footer">
            <span class="fun-book">
              <template v-if="hoveredCell && !hoveredCell.future">
                {{ hoveredCell.date }} · {{ hoveredCell.messages }} 条消息 · {{ formatCompactK(hoveredCell.tokens) }} tok
              </template>
              <template v-else>{{ stats.funBook }}</template>
            </span>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-if="!stats.models.length" class="models-empty">当前时间范围内暂无模型调用记录。</div>
        <div v-else class="models-panel">
          <div class="chart-area">
            <div class="y-axis">
              <span v-for="(tick, idx) in yAxisTicks" :key="idx">{{ tick }}</span>
            </div>
            <div class="chart-plot">
              <div class="chart-bars">
                <div
                  v-for="col in stats.chartColumns"
                  :key="col.date"
                  class="chart-col-slot"
                  :title="`${col.label} · ${formatCompactK(col.totalTokens)} tok`"
                >
                  <div class="chart-col" :style="{ height: `${col.totalHeightPct}%` }">
                    <span
                      v-for="seg in col.segments"
                      :key="seg.model"
                      class="chart-seg"
                      :style="{ height: `${seg.heightPct}%`, background: seg.color }"
                    />
                  </div>
                </div>
              </div>
              <div class="chart-x-axis">
                <span v-for="col in stats.chartColumns" :key="col.date">{{ col.label }}</span>
              </div>
            </div>
          </div>

          <div class="models-legend">
            <div v-for="m in stats.models" :key="m.name" class="legend-row">
              <span class="legend-swatch" :style="{ background: m.color }" />
              <span class="legend-name" :title="m.name">{{ m.name }}</span>
              <span class="legend-io">{{ formatCompactK(m.inputTokens) }} 输入 · {{ formatCompactK(m.outputTokens) }} 输出</span>
              <span class="legend-pct">{{ m.sharePct.toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.home-usage-anchor {
  position: absolute;
  top: 16px;
  left: 20px;
  z-index: 12;
}
.usage-pill-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border, rgba(19, 20, 22, 0.1));
  border-radius: 999px;
  padding: 5px 11px;
  background: color-mix(in srgb, var(--panel, #ffffff) 82%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--muted, #526075);
  font: inherit;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background-color 140ms ease, color 140ms ease, border-color 140ms ease;
}
.usage-pill-trigger:hover,
.usage-pill-trigger.open {
  background: var(--panel, #ffffff);
  color: var(--text, #1f2937);
  border-color: var(--border, #cbd5e1);
}
.usage-pill-trigger svg {
  width: 13px;
  height: 13px;
  color: #3b6ecf;
  flex: none;
}
.pill-chev {
  font-size: 11px;
  opacity: 0.7;
  transition: transform 140ms ease;
}
.usage-pill-trigger.open .pill-chev {
  transform: rotate(180deg);
}

.home-usage-card {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: min(490px, calc(100vw - 48px));
  padding: 12px;
  border-radius: 13px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  box-shadow: 0 14px 36px rgba(15, 23, 42, .14);
  display: flex;
  flex-direction: column;
  gap: 10px;
  user-select: none;
}
.usage-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.usage-tabs,
.usage-ranges {
  display: flex;
  align-items: center;
  gap: 2px;
}
.usage-tabs button,
.usage-ranges button {
  border: 0;
  background: transparent;
  color: var(--muted, #64748b);
  font: inherit;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.usage-tabs button:hover:not(.active),
.usage-ranges button:hover:not(.active) {
  background: color-mix(in srgb, var(--text, #131416) 6%, transparent);
  color: var(--text, #1f2937);
}
.usage-tabs button.active,
.usage-ranges button.active {
  background: color-mix(in srgb, var(--text, #131416) 9%, transparent);
  color: var(--text, #131416);
  font-weight: 550;
}
.usage-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5px;
}
@media (max-width: 540px) {
  .usage-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.usage-tile {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 6px 9px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--text, #1e293b) 5.5%, var(--panel, #ffffff));
}
.tile-label {
  font-size: 11px;
  color: var(--muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tile-val {
  font-size: 13px;
  font-weight: 600;
  color: var(--text, #131416);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}
.model-tile .tile-val { font-weight: 450; }
.heatmap-wrap { display: flex; flex-direction: column; gap: 7px; }
.heatmap-grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-columns: 1fr;
  gap: 3px;
}
.heat-cell {
  aspect-ratio: 1;
  border-radius: 3px;
  background: color-mix(in srgb, var(--text, #131416) 9%, transparent);
  transition: background-color 180ms ease;
}
.heat-cell.future { opacity: .35; }
.heat-cell[data-level="1"] { background: color-mix(in srgb, #3b6ecf 24%, color-mix(in srgb, var(--text, #131416) 8%, transparent)); }
.heat-cell[data-level="2"] { background: color-mix(in srgb, #3b6ecf 44%, color-mix(in srgb, var(--text, #131416) 8%, transparent)); }
.heat-cell[data-level="3"] { background: color-mix(in srgb, #3b6ecf 64%, color-mix(in srgb, var(--text, #131416) 8%, transparent)); }
.heat-cell[data-level="4"] { background: color-mix(in srgb, #3b6ecf 84%, color-mix(in srgb, var(--text, #131416) 8%, transparent)); }
.heat-cell[data-level="5"] { background: #3b6ecf; }
.heatmap-footer { display: flex; align-items: center; justify-content: space-between; min-height: 16px; }
.fun-book { font-size: 11.5px; color: var(--muted, #64748b); font-variant-numeric: tabular-nums; }

.models-empty { padding: 26px 0; text-align: center; font-size: 12px; color: var(--muted, #94a3b8); }
.models-panel { display: flex; flex-direction: column; gap: 10px; }
.chart-area { display: flex; gap: 8px; }
.y-axis {
  width: 34px;
  height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 10.5px;
  color: var(--muted, #64748b);
  font-variant-numeric: tabular-nums;
  flex: none;
}
.chart-plot {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.chart-bars {
  height: 128px;
  display: flex;
  align-items: flex-end;
  gap: 5px;
  border-bottom: 1px solid var(--border, rgba(19, 20, 22, 0.1));
}
.chart-col-slot {
  flex: 1 1 0;
  height: 100%;
  min-width: 0;
  display: flex;
  align-items: flex-end;
}
.chart-col {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
  transform-origin: 50% 100%;
  animation: bar-grow 260ms cubic-bezier(.22, 1, .36, 1) both;
}
@keyframes bar-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
.chart-seg { display: block; width: 100%; }
.chart-x-axis {
  display: flex;
  justify-content: space-around;
  font-size: 10.5px;
  color: var(--muted, #64748b);
  font-variant-numeric: tabular-nums;
}
.chart-x-axis span {
  flex: 1 1 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.models-legend {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.legend-row {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
}
.legend-swatch {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex: none;
}
.legend-name {
  min-width: 0;
  flex: 1;
  color: var(--text, #1f2937);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.legend-io {
  flex: none;
  color: var(--muted, #64748b);
}
.legend-pct {
  flex: none;
  width: 40px;
  text-align: right;
  font-weight: 600;
  color: var(--text, #1f2937);
}
</style>
