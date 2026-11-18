<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { PiModelInfo } from '../services/native-bridge.service';
import { formatCompactK, formatTelemetryReport, type SessionTelemetry } from './token-hud';

const props = defineProps<{
  telemetry: SessionTelemetry;
  canCompact?: boolean;
  service?: 'native' | 'deepseek';
  piModels?: PiModelInfo[];
  deepseekModels?: string[];
  anchorRect?: { left: number; right: number; top: number; bottom: number } | null;
  align?: 'left' | 'right';
}>();

const emit = defineEmits<{
  close: [];
  compact: [];
  refresh: [];
}>();

const tab = ref<'breakdown' | 'turns' | 'tools' | 'models'>('breakdown');
const copied = ref(false);
const popRef = ref<HTMLElement | null>(null);

const popoverStyle = computed(() => {
  if (typeof window === 'undefined' || !props.anchorRect) return {};
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(436, vw - 24);
  const rawLeft = props.align === 'right' ? props.anchorRect.right - width : props.anchorRect.left;
  const left = Math.max(12, Math.min(rawLeft, vw - width - 12));
  const spaceAbove = Math.max(180, props.anchorRect.top - 16);
  const spaceBelow = Math.max(180, vh - props.anchorRect.bottom - 16);
  if (spaceAbove >= 320 || spaceAbove >= spaceBelow) {
    return {
      position: 'fixed' as const,
      left: `${Math.round(left)}px`,
      bottom: `${Math.round(vh - props.anchorRect.top + 8)}px`,
      top: 'auto',
      right: 'auto',
      width: `${Math.round(width)}px`,
      maxHeight: `${Math.min(640, Math.round(spaceAbove))}px`,
    };
  }
  return {
    position: 'fixed' as const,
    left: `${Math.round(left)}px`,
    top: `${Math.round(props.anchorRect.bottom + 8)}px`,
    bottom: 'auto',
    right: 'auto',
    width: `${Math.round(width)}px`,
    maxHeight: `${Math.min(640, Math.round(spaceBelow))}px`,
  };
});

const pctOf = (v: number) => Math.max(0, Math.min(100, (v / (props.telemetry.maxContext || 1)) * 100));

const segments = computed(() => {
  const t = props.telemetry;
  const rows = [
    { id: 'fresh', color: '#3b82f6', label: '新输入上下文', val: t.freshInput },
    { id: 'cache', color: '#10b981', label: '缓存读取复用', val: t.cacheRead },
  ];
  if (t.cacheWrite > 0) {
    rows.push({ id: 'cwrite', color: '#8b5cf6', label: '提示词缓存写入', val: t.cacheWrite });
  }
  rows.push(
    { id: 'out', color: '#f59e0b', label: '回复与思考输出', val: t.lastOutput + t.lastThinking },
    { id: 'draft', color: '#ec4899', label: `当前输入草稿 (${t.draftChars} 字)`, val: t.draftTokens },
    { id: 'rem', color: t.ringColor, label: '剩余可用容量', val: t.remainingTokens },
  );
  return rows;
});

const modelRows = computed(() => {
  if (props.service === 'deepseek') {
    const active = props.telemetry.modelName;
    const list = props.deepseekModels?.length ? props.deepseekModels : [active];
    return list.map(id => ({
      id,
      title: id,
      provider: 'DeepSeek API',
      context: '128K',
      maxOut: '8K / 64K',
      active: id === active,
    }));
  }
  const active = props.telemetry.modelName.toLowerCase();
  return (props.piModels || []).map(item => ({
    id: item.id,
    title: item.model,
    provider: item.provider,
    context: item.context || '默认',
    maxOut: item.maxOut || '—',
    active: item.id.toLowerCase() === active || item.model.toLowerCase() === active,
  }));
});

const maxToolCount = computed(() => Math.max(1, ...props.telemetry.toolLeaderboard.map(item => item.count)));
const reversedTurns = computed(() => props.telemetry.turns.slice().reverse());

async function copyReport() {
  try {
    await navigator.clipboard.writeText(formatTelemetryReport(props.telemetry));
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
  } catch {}
}

function onPointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  if (popRef.value?.contains(target)) return;
  if (target.closest('[data-hud-trigger="1"]')) return;
  emit('close');
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation();
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <section ref="popRef" class="hud-popover" :style="popoverStyle" role="dialog" aria-label="上下文窗口与 Token 监控">
      <header class="hud-top">
        <div class="hud-title-col">
          <span class="hud-title">上下文窗口与 Token 监控</span>
          <span class="hud-model-badge" :title="telemetry.modelName">{{ telemetry.modelName }}</span>
        </div>
        <div class="hud-actions">
          <button v-if="canCompact" type="button" class="hud-btn" title="填入 /compact 压缩上下文" @click="emit('compact')">/compact</button>
          <button type="button" class="hud-btn" @click="copyReport">{{ copied ? '已复制' : '复制报告' }}</button>
          <button type="button" class="hud-btn is-icon" title="刷新状态与统计" aria-label="刷新状态与统计" @click="emit('refresh')">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.35-3.6" />
              <path d="M13.5 2.7v2.4h-2.4" />
            </svg>
          </button>
          <button type="button" class="hud-btn is-close" aria-label="关闭监控" @click="emit('close')">×</button>
        </div>
      </header>

      <div class="hud-hero">
        <div class="hud-hero-line">
          <span class="hud-rem-main" :style="{ color: telemetry.ringColor }">
            剩余可用 {{ formatCompactK(telemetry.remainingTokens) }} / {{ formatCompactK(telemetry.maxContext) }} ({{ telemetry.remainingPct.toFixed(1) }}%)
          </span>
        </div>
        <div class="hud-hero-sub">
          <span>已用 {{ formatCompactK(telemetry.usedTokens) }} ({{ telemetry.usedPct.toFixed(1) }}%)<template v-if="telemetry.draftTokens > 0"> · 草稿 +{{ formatCompactK(telemetry.draftTokens) }}</template></span>
          <span v-if="telemetry.hasTelemetry" class="hud-hero-quota">缓存命中 {{ telemetry.cacheHitPct.toFixed(1) }}%</span>
        </div>
        <div class="hud-bar" aria-hidden="true">
          <span class="seg-fresh" :style="{ width: `${pctOf(telemetry.freshInput).toFixed(2)}%` }"></span>
          <span class="seg-cwrite" :style="{ width: `${pctOf(telemetry.cacheWrite).toFixed(2)}%` }"></span>
          <span class="seg-cache" :style="{ width: `${pctOf(telemetry.cacheRead).toFixed(2)}%` }"></span>
          <span class="seg-out" :style="{ width: `${pctOf(telemetry.lastOutput + telemetry.lastThinking).toFixed(2)}%` }"></span>
          <span class="seg-draft" :style="{ width: `${pctOf(telemetry.draftTokens).toFixed(2)}%` }"></span>
        </div>
      </div>

      <div class="hud-tabs" role="tablist">
        <button type="button" role="tab" :aria-selected="tab === 'breakdown'" :class="{ active: tab === 'breakdown' }" @click="tab = 'breakdown'">上下文拆分</button>
        <button type="button" role="tab" :aria-selected="tab === 'turns'" :class="{ active: tab === 'turns' }" @click="tab = 'turns'">对话轮次 ({{ telemetry.turnCount }})</button>
        <button type="button" role="tab" :aria-selected="tab === 'tools'" :class="{ active: tab === 'tools' }" @click="tab = 'tools'">工具/代理 ({{ telemetry.totalToolCalls }})</button>
        <button type="button" role="tab" :aria-selected="tab === 'models'" :class="{ active: tab === 'models' }" @click="tab = 'models'">模型窗口</button>
      </div>

      <div class="hud-body">
        <template v-if="tab === 'breakdown'">
          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-k">剩余可用容量</span>
              <span class="kpi-v" :style="{ color: telemetry.ringColor }">{{ formatCompactK(telemetry.remainingTokens) }} <small>({{ telemetry.remainingPct.toFixed(1) }}%)</small></span>
              <span class="kpi-sub">已用 {{ formatCompactK(telemetry.usedTokens) }} / {{ formatCompactK(telemetry.maxContext) }}</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-k">缓存命中率</span>
              <span class="kpi-v">{{ telemetry.cacheHitPct.toFixed(1) }}%</span>
              <span class="kpi-sub">读 {{ formatCompactK(telemetry.cacheRead) }} · 新 {{ formatCompactK(telemetry.freshInput) }}</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-k">生成吞吐速度</span>
              <span class="kpi-v">{{ telemetry.lastSpeed ? `${telemetry.lastSpeed} tok/s` : '—' }}</span>
              <span class="kpi-sub">均值 {{ telemetry.avgSpeed ? `${telemetry.avgSpeed} tok/s` : '—' }} · {{ telemetry.avgDurationMs ? `${(telemetry.avgDurationMs / 1000).toFixed(2)}s` : '—' }}</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-k">会话累计消耗</span>
              <span class="kpi-v">{{ formatCompactK(telemetry.totalTokens) }}</span>
              <span class="kpi-sub">{{ telemetry.turnCount }} 轮 · {{ telemetry.totalToolCalls }} 次调用 · 输出 {{ formatCompactK(telemetry.totalOutput) }}</span>
            </div>
          </div>

          <div class="sec-title">上下文窗口构成明细</div>
          <div class="seg-rows">
            <div v-for="row in segments" :key="row.id" class="seg-row" :class="{ highlight: row.id === 'rem' }">
              <span class="seg-label"><i :style="{ background: row.color }"></i>{{ row.label }}</span>
              <span class="seg-val">{{ formatCompactK(row.val) }} <small>({{ pctOf(row.val).toFixed(1) }}%)</small></span>
            </div>
          </div>
          <div class="seg-footer">
            <span>已用占比：<strong>{{ telemetry.usedPct.toFixed(1) }}%</strong></span>
            <span>工具调用：<strong>{{ telemetry.totalToolCalls }}</strong></span>
            <span>窗口上限：<strong>{{ formatCompactK(telemetry.maxContext) }}</strong></span>
          </div>

          <div class="sec-title">最近一次调用指标</div>
          <div class="latest-grid">
            <div><span>新输入</span><strong>{{ formatCompactK(telemetry.freshInput) }}</strong></div>
            <div><span>缓存读取</span><strong>{{ formatCompactK(telemetry.cacheRead) }}</strong></div>
            <div><span>回复输出</span><strong>{{ formatCompactK(telemetry.lastOutput) }}</strong></div>
            <div><span>思考 Token</span><strong>{{ formatCompactK(telemetry.lastThinking) }}</strong></div>
          </div>
        </template>

        <template v-else-if="tab === 'turns'">
          <div v-if="!reversedTurns.length" class="hud-empty">当前会话还没有轮次记录。</div>
          <div v-else class="turns-list">
            <div v-for="t in reversedTurns" :key="t.turn" class="turn-card">
              <div class="turn-top">
                <span class="turn-idx">#T{{ t.turn }}</span>
                <span class="turn-model">{{ t.model }}</span>
                <span class="turn-ctx">Ctx {{ formatCompactK(t.ctxUsed) }}</span>
                <span class="turn-delta" :class="{ high: t.ctxDelta >= 15000 }">{{ t.ctxDelta >= 0 ? '+' : '' }}{{ formatCompactK(t.ctxDelta) }}</span>
              </div>
              <div v-if="t.userPreview" class="turn-prompt">{{ t.userPreview }}</div>
              <div class="turn-meta">
                <span>输出 {{ formatCompactK(t.output) }}</span>
                <span v-if="t.thinking">思考 {{ formatCompactK(t.thinking) }}</span>
                <span v-if="t.toolCalls">🔧 ×{{ t.toolCalls }}</span>
                <span v-if="t.speed">⚡ {{ t.speed }} tok/s</span>
                <span v-if="t.cacheHitPct">缓存 {{ t.cacheHitPct }}%</span>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="tab === 'tools'">
          <div v-if="!telemetry.toolLeaderboard.length" class="hud-empty">当前会话暂未记录本机工具调用。</div>
          <div v-else class="tool-list">
            <div v-for="item in telemetry.toolLeaderboard" :key="item.name" class="tool-row">
              <div class="tool-info">
                <span>{{ item.name }}</span>
                <strong>×{{ item.count }}</strong>
              </div>
              <div class="tool-bar"><span :style="{ width: `${Math.round((item.count / maxToolCount) * 100)}%` }"></span></div>
            </div>
          </div>
        </template>

        <template v-else>
          <div v-if="!modelRows.length" class="hud-empty">暂无更多模型窗口元数据，当前上限 {{ formatCompactK(telemetry.maxContext) }}。</div>
          <div v-else class="turns-list">
            <div v-for="m in modelRows" :key="m.id" class="turn-card" :class="{ activeModel: m.active }">
              <div class="turn-top">
                <span class="turn-model" style="color: var(--text, #26334b); font-weight: 600;">{{ m.title }}</span>
                <span class="turn-ctx">窗口 {{ m.context }}</span>
              </div>
              <div class="turn-meta">
                <span>{{ m.provider }}</span>
                <span>最大输出 {{ m.maxOut }}</span>
                <span v-if="m.active" style="color: #257de0; font-weight: 600;">当前使用</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.hud-popover {
  position: fixed;
  z-index: 2000;
  width: 436px;
  max-width: calc(100vw - 24px);
  max-height: min(640px, calc(100vh - 32px));
  padding: 13px 14px;
  border-radius: 14px;
  border: 1px solid var(--border, #dce3ec);
  background: var(--panel, #ffffff);
  color: var(--text, #26334b);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2), 0 3px 10px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 9px;
  overflow: hidden;
  font: 12px/1.45 Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans SC", "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-variant-numeric: tabular-nums;
  box-sizing: border-box;
}
.hud-popover * { box-sizing: border-box; }
.hud-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; flex-shrink: 0; }
.hud-title-col { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.hud-title { font-weight: 650; font-size: 13px; line-height: 1.25; }
.hud-model-badge { font-size: 11px; padding: 2px 9px; border-radius: 999px; background: var(--surface, #f2f4f8); border: 1px solid var(--border, #dce3ec); color: var(--muted, #64748b); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hud-actions { display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0; }
.hud-btn { height: 24px; padding: 0 8px; border-radius: 7px; border: 1px solid var(--border, #dce3ec); background: var(--surface, #f6f8fc); color: var(--text, #475569); font: inherit; font-size: 11px; font-weight: 500; cursor: pointer; display: inline-grid; place-items: center; }
.hud-btn:hover { background: var(--panel, #fff); border-color: color-mix(in srgb, var(--text, #26334b) 20%, transparent); }
.hud-btn.is-icon { width: 24px; padding: 0; }
.hud-btn.is-icon svg { width: 12.5px; height: 12.5px; }
.hud-btn.is-close { width: 24px; padding: 0; font-size: 14px; }
.hud-hero { display: flex; flex-direction: column; gap: 5px; padding: 10px 11px; border-radius: 10px; background: var(--surface, #f4f6fb); border: 1px solid var(--border, #e4e9f1); flex-shrink: 0; }
.hud-hero-line { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hud-rem-main { font-size: 13px; font-weight: 700; }
.hud-hero-sub { display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--muted, #64748b); }
.hud-hero-quota { color: #257de0; font-weight: 600; }
.hud-bar { width: 100%; height: 7px; margin-top: 2px; border-radius: 999px; background: color-mix(in srgb, var(--text, #1e293b) 10%, transparent); overflow: hidden; display: flex; }
.seg-fresh { background: #3b82f6; }
.seg-cwrite { background: #8b5cf6; }
.seg-cache { background: #10b981; }
.seg-out { background: #f59e0b; }
.seg-draft { background: #ec4899; }
.hud-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 3px; padding: 3px; border-radius: 9px; background: var(--surface, #f2f4f8); border: 1px solid var(--border, #e4e9f1); flex-shrink: 0; }
.hud-tabs button { height: 25px; padding: 0 5px; border: 0; border-radius: 6px; background: transparent; color: var(--muted, #64748b); font: inherit; font-size: 11px; font-weight: 500; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hud-tabs button.active { background: var(--panel, #ffffff); color: var(--text, #26334b); font-weight: 650; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08); }
.hud-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 2px; }
.kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.kpi-card { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 9px; background: var(--surface, #f7f8fb); border: 1px solid var(--border, #e4e9f1); }
.kpi-k { font-size: 10.5px; color: var(--muted, #64748b); }
.kpi-v { font-size: 14px; font-weight: 700; line-height: 1.25; }
.kpi-v small { font-size: 11.5px; font-weight: 500; opacity: .88; }
.kpi-sub { font-size: 10.5px; color: var(--muted, #8492a8); }
.sec-title { font-size: 11.5px; font-weight: 650; color: var(--text, #334155); margin-top: 2px; }
.seg-rows { display: flex; flex-direction: column; gap: 2px; }
.seg-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 8px; border-radius: 7px; font-size: 11.5px; }
.seg-row.highlight { background: color-mix(in srgb, #257de0 12%, transparent); font-weight: 650; }
.seg-label { display: inline-flex; align-items: center; gap: 7px; }
.seg-label i { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.seg-val { font-weight: 600; }
.seg-val small { color: var(--muted, #8492a8); font-weight: 400; }
.seg-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 9px; border-radius: 8px; background: var(--surface, #f7f8fb); border: 1px solid var(--border, #e4e9f1); font-size: 10.5px; color: var(--muted, #64748b); }
.seg-footer strong { color: var(--text, #26334b); font-weight: 650; }
.latest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.latest-grid > div { display: flex; flex-direction: column; gap: 2px; padding: 7px 8px; border-radius: 8px; background: var(--surface, #f7f8fb); border: 1px solid var(--border, #e4e9f1); }
.latest-grid span { font-size: 10px; color: var(--muted, #8492a8); }
.latest-grid strong { font-size: 12.5px; font-weight: 700; }
.turns-list, .tool-list { display: flex; flex-direction: column; gap: 6px; }
.turn-card, .tool-row { display: flex; flex-direction: column; gap: 4px; padding: 8px 10px; border-radius: 8px; background: var(--surface, #f7f8fb); border: 1px solid var(--border, #e4e9f1); }
.turn-card.activeModel { border-color: color-mix(in srgb, #257de0 45%, var(--border, #e4e9f1)); background: color-mix(in srgb, #257de0 7%, var(--surface, #f7f8fb)); }
.turn-top, .tool-info { display: flex; align-items: center; justify-content: space-between; gap: 6px; font-size: 11px; }
.turn-idx { font-weight: 700; color: #7569ec; }
.turn-model { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted, #64748b); }
.turn-delta { font-family: ui-monospace, monospace; color: #16835a; }
.turn-delta.high { color: #b45309; }
.turn-prompt { font-size: 11.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.turn-meta { display: flex; flex-wrap: wrap; gap: 8px; font-size: 10.5px; color: var(--muted, #8492a8); }
.tool-bar { width: 100%; height: 5px; border-radius: 999px; background: var(--border, #e2e8f0); overflow: hidden; }
.tool-bar span { display: block; height: 100%; border-radius: 999px; background: #7569ec; }
.hud-empty { padding: 20px 10px; text-align: center; font-size: 12px; color: var(--muted, #94a3b8); }
</style>
