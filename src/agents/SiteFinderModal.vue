<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EmployeeRunRecord, SiteFinderResult } from './employee-contract';
import { callEmployeeBackend } from './employee-client';
import { useWindowDraggable } from '../sdk/ui';

declare const chrome: any;

const props = defineProps<{
  employeeId: string;
  employeeName: string;
  recentRuns: EmployeeRunRecord[];
}>();

const emit = defineEmits<{
  close: [];
  updated: [];
}>();

const { panelRef, headerRef, initialStyle, onHeaderPointerDown } = useWindowDraggable({
  windowId: 'site-finder-modal',
  managed: false,
  defaultWidth: 860,
  defaultHeight: 620,
  minWidth: 360,
  minHeight: 320,
});

const query = ref('');
const searching = ref(false);
const errorText = ref('');
const addedUrls = ref<Record<string, boolean>>({});
const activeResult = ref<SiteFinderResult | null>(null);
const activeEngine = ref<string>('');

const historyRuns = computed(() =>
  props.recentRuns.filter((r) => r.employeeId === props.employeeId && r.kind === 'site-finder' && r.siteFinderResult).slice(0, 8)
);

watch(
  historyRuns,
  (list) => {
    if (!activeResult.value && list[0]?.siteFinderResult) {
      activeResult.value = list[0].siteFinderResult;
      activeEngine.value = list[0].engine;
      if (!query.value && list[0].siteFinderQuery) query.value = list[0].siteFinderQuery;
    }
  },
  { immediate: true }
);

const exampleQueries = [
  '之前存过一个免费生成 SVG 波浪背景的英文网站',
  '书签里有个看开源论文和 AI 模型排行榜的站',
  '常用网站里有个租算力或者跑机器人仿真的控制台',
];

async function runSearch(overrideQuery?: string) {
  const q = (overrideQuery ?? query.value).trim();
  if (!q || searching.value) return;
  if (overrideQuery) query.value = overrideQuery;
  searching.value = true;
  errorText.value = '';
  try {
    const res = await callEmployeeBackend<{ message: string; record: EmployeeRunRecord }>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'run-site-finder',
      { employeeId: props.employeeId, query: q }
    );
    if (res?.record?.siteFinderResult) {
      activeResult.value = res.record.siteFinderResult;
      activeEngine.value = res.record.engine;
    }
    emit('updated');
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '找站执行失败，请稍后重试。';
  } finally {
    searching.value = false;
  }
}

async function saveRecommendationToLauncher(title: string, url: string) {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
  try {
    const stored = await chrome.storage.local.get('quickLinks');
    const links = Array.isArray(stored?.quickLinks) ? stored.quickLinks : [];
    if (!links.some((item: any) => item?.url === url)) {
      links.push({
        id: `ql-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        url,
        page: '常用网站',
        group: '常用网站',
      });
      await chrome.storage.local.set({ quickLinks: links });
    }
    addedUrls.value = { ...addedUrls.value, [url]: true };
  } catch {
    errorText.value = '保存到常用网站失败。';
  }
}

function faviconUrl(url: string): string {
  try {
    const host = new URL(url).hostname;
    if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
      return chrome.runtime.getURL(`/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`);
    }
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=32`;
  } catch {
    return '';
  }
}

function selectHistory(run: EmployeeRunRecord) {
  if (!run.siteFinderResult) return;
  activeResult.value = run.siteFinderResult;
  activeEngine.value = run.engine;
  if (run.siteFinderQuery) query.value = run.siteFinderQuery;
}

function onEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && !searching.value) emit('close');
}
function onOutsidePointer(event: PointerEvent) {
  if (panelRef.value && !event.composedPath().includes(panelRef.value) && !searching.value) emit('close');
}

onMounted(() => {
  document.addEventListener('keydown', onEscape);
  document.addEventListener('pointerdown', onOutsidePointer);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape);
  document.removeEventListener('pointerdown', onOutsidePointer);
});
</script>

<template>
  <Teleport to="body">
    <section
      ref="panelRef"
      class="sf-modal"
      :style="initialStyle"
      role="dialog"
      aria-modal="false"
      :aria-label="`${employeeName} · 记忆找站`"
    >
      <header ref="headerRef" class="sf-head" @pointerdown="onHeaderPointerDown">
        <div class="sf-head-left">
          <span class="sf-badge">🔍</span>
          <div>
            <strong>{{ employeeName }}</strong>
            <small>先用 Jev / 本地多路召回初筛，再由大模型推理找回收藏或推荐入口</small>
          </div>
        </div>
        <button type="button" class="sf-close" aria-label="关闭找站窗口" @click="emit('close')">✕</button>
      </header>

      <div class="sf-body">
        <div class="sf-search-card">
          <textarea
            v-model="query"
            rows="2"
            placeholder="描述你隐约记得的网站特征，例如：用途、英文关键词、颜色风格、之前大概存放在哪个分区或书签里…"
            @keydown.meta.enter.prevent="runSearch()"
            @keydown.ctrl.enter.prevent="runSearch()"
          />
          <div class="sf-search-foot">
            <div class="sf-examples">
              <button v-for="ex in exampleQueries" :key="ex" type="button" @click="runSearch(ex)">
                {{ ex }}
              </button>
            </div>
            <button type="button" class="sf-submit" :disabled="!query.trim() || searching" @click="runSearch()">
              {{ searching ? '正在回忆检索…' : '🔍 帮我找回' }}
            </button>
          </div>
        </div>

        <p v-if="errorText" class="sf-error" role="alert">{{ errorText }}</p>

        <div v-if="historyRuns.length" class="sf-history-strip">
          <span>最近找站：</span>
          <button
            v-for="item in historyRuns"
            :key="item.id"
            type="button"
            :class="{ active: activeResult?.query === item.siteFinderQuery }"
            @click="selectHistory(item)"
          >
            {{ item.siteFinderQuery }}
          </button>
        </div>

        <div v-if="activeResult" class="sf-results">
          <div class="sf-summary-bar">
            <p>{{ activeResult.summary }}</p>
            <small>
              扫描 {{ activeResult.searchedCount }} 项 · Jev/初筛 {{ activeResult.shortlistCount }} 条
              <template v-if="activeEngine"> · {{ activeEngine === 'heuristic' ? '本地规则' : activeEngine }}</template>
            </small>
          </div>

          <section v-if="activeResult.matches.length" class="sf-section">
            <h4>✨ 从你的常用网站与书签中找回</h4>
            <div class="sf-grid">
              <article v-for="m in activeResult.matches" :key="m.id" class="sf-card match">
                <div class="sf-card-top">
                  <img v-if="faviconUrl(m.url)" :src="faviconUrl(m.url)" alt="" class="sf-fav" />
                  <div class="sf-card-title">
                    <strong>{{ m.title }}</strong>
                    <small>{{ m.location }}</small>
                  </div>
                  <span class="sf-conf" :class="m.confidence">
                    {{ m.confidence === 'high' ? '高匹配' : '可能相关' }}
                  </span>
                </div>
                <p class="sf-reason">{{ m.reason }}</p>
                <div class="sf-card-actions">
                  <span class="sf-url">{{ m.url }}</span>
                  <a :href="m.url" target="_blank" rel="noopener noreferrer" class="sf-open-btn">打开 ↗</a>
                </div>
              </article>
            </div>
          </section>

          <section v-if="activeResult.recommendations.length" class="sf-section">
            <h4>🧭 {{ activeResult.matches.length ? '补充推荐相关入口' : '未在收藏中精确命中 · 为你推荐以下网站入口' }}</h4>
            <div class="sf-grid">
              <article v-for="rec in activeResult.recommendations" :key="rec.url" class="sf-card rec">
                <div class="sf-card-top">
                  <img v-if="faviconUrl(rec.url)" :src="faviconUrl(rec.url)" alt="" class="sf-fav" />
                  <div class="sf-card-title">
                    <strong>{{ rec.title }}</strong>
                    <small>{{ rec.description || rec.url }}</small>
                  </div>
                </div>
                <p class="sf-reason">{{ rec.reason }}</p>
                <div class="sf-card-actions">
                  <button
                    type="button"
                    class="sf-save-btn"
                    :disabled="Boolean(addedUrls[rec.url])"
                    @click="saveRecommendationToLauncher(rec.title, rec.url)"
                  >
                    {{ addedUrls[rec.url] ? '✓ 已收桌面' : '+ 收进常用网站' }}
                  </button>
                  <a :href="rec.url" target="_blank" rel="noopener noreferrer" class="sf-open-btn">打开 ↗</a>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div v-else-if="!searching" class="sf-empty">
          <p>输入一段零碎印象（例如「记得以前存过一个做在线画图或者图标的网站」），专员会自动帮你翻找桌面网站与全部浏览器书签。</p>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.sf-modal {
  position: fixed;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  border: 1px solid var(--border, #dbe3ee);
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.22);
  overflow: hidden;
}
.sf-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  cursor: move;
  user-select: none;
}
.sf-head-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sf-badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(139, 92, 246, 0.14);
  font-size: 15px;
}
.sf-head-left strong {
  display: block;
  font-size: 14px;
}
.sf-head-left small {
  display: block;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.sf-close {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 8px;
  width: 28px;
  height: 28px;
  background: var(--surface, #f8fafc);
  color: var(--muted, #64748b);
  cursor: pointer;
}
.sf-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.sf-search-card {
  border: 1px solid var(--border, #dbe3ee);
  border-radius: 14px;
  background: var(--panel, #ffffff);
  overflow: hidden;
}
.sf-search-card:focus-within {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.14);
}
.sf-search-card textarea {
  box-sizing: border-box;
  width: 100%;
  border: 0;
  outline: none;
  padding: 12px 14px 8px;
  resize: vertical;
  background: transparent;
  color: var(--text, #0f172a);
  font: inherit;
  font-size: 13px;
}
.sf-search-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 8px 12px;
  border-top: 1px solid var(--border, #eef2f6);
  background: var(--surface, #f8fafc);
}
.sf-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.sf-examples button {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 999px;
  padding: 3px 9px;
  background: var(--panel, #ffffff);
  color: var(--muted, #64748b);
  font-size: 11px;
  cursor: pointer;
}
.sf-examples button:hover {
  border-color: #a78bfa;
  color: #6d28d9;
}
.sf-submit {
  border: 0;
  border-radius: 9px;
  padding: 7px 14px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.sf-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.sf-error {
  margin: 0;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 12px;
}
.sf-history-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.sf-history-strip button {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 999px;
  padding: 3px 9px;
  background: var(--surface, #f8fafc);
  color: var(--text, #334155);
  font-size: 11px;
  cursor: pointer;
}
.sf-history-strip button.active {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.12);
  color: #6d28d9;
  font-weight: 600;
}
.sf-summary-bar {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface, #f8fafc);
}
.sf-summary-bar p {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
}
.sf-summary-bar small {
  font-size: 11px;
  color: var(--muted, #64748b);
}
.sf-section h4 {
  margin: 4px 0 8px;
  font-size: 12.5px;
  color: var(--heading, #0f172a);
}
.sf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
}
.sf-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
}
.sf-card.match {
  border-color: rgba(139, 92, 246, 0.35);
}
.sf-card-top {
  display: flex;
  align-items: center;
  gap: 9px;
}
.sf-fav {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex: none;
}
.sf-card-title {
  flex: 1;
  min-width: 0;
}
.sf-card-title strong,
.sf-card-title small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sf-card-title strong {
  font-size: 12.5px;
}
.sf-card-title small {
  font-size: 10.5px;
  color: var(--muted, #64748b);
}
.sf-conf {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 999px;
  flex: none;
}
.sf-conf.high {
  background: rgba(16, 185, 129, 0.14);
  color: #047857;
}
.sf-conf.medium {
  background: rgba(245, 158, 11, 0.14);
  color: #b45309;
}
.sf-reason {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--muted, #475569);
}
.sf-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
}
.sf-url {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10.5px;
  color: var(--muted, #94a3b8);
}
.sf-open-btn {
  padding: 4px 9px;
  border-radius: 7px;
  background: rgba(139, 92, 246, 0.12);
  color: #6d28d9;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  flex: none;
}
.sf-save-btn {
  border: 1px solid var(--border, #dce3ec);
  border-radius: 7px;
  padding: 4px 8px;
  background: var(--surface, #f8fafc);
  color: var(--text, #334155);
  font-size: 11px;
  cursor: pointer;
}
.sf-save-btn:disabled {
  opacity: 0.6;
  cursor: default;
}
.sf-empty {
  margin: auto;
  text-align: center;
  max-width: 440px;
  padding: 28px 16px;
  color: var(--muted, #64748b);
  font-size: 12.5px;
  line-height: 1.65;
}
</style>
