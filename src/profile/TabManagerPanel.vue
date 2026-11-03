<template>
  <AppWindowFrame window-id="browser-tabs" :title="t('tabs.title')" icon="▤" :visible="state.isOpen" :default-width="430" :default-height="500" :min-width="300" :show-minimize="false" :show-maximize="false" @close="controller.close">
    <template #header-actions><button type="button" class="tabs-refresh" :disabled="loading" @click="refresh">{{ t('tabs.refresh') }}</button></template>
    <div class="tabs-body"><p class="tabs-note">{{ t('tabs.note') }}</p><p v-if="error" role="alert">{{ error }}</p><p v-if="loading && !tabs.length">{{ t('tabs.reading') }}</p><p v-else-if="!tabs.length">{{ t('tabs.empty') }}</p>
      <section v-for="group in groups" :key="group.domain" class="tabs-group"><h3>{{ group.domain }} <small>{{ group.tabs.length }}</small></h3>
        <div v-for="tab in group.tabs" :key="tab.id" class="tab-row" :class="{ active: tab.active }"><button type="button" class="tab-open" :title="tab.title || t('tabs.untitled')" @click="activate(tab)">{{ tab.title || t('tabs.untitled') }}</button><button type="button" class="tab-close" :aria-label="t('tabs.closeTab', { title: tab.title || '' })" @click="remove(tab)">×</button></div>
      </section>
    </div>
  </AppWindowFrame>
</template>
<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { AppWindowFrame } from '../sdk/ui';
import { tabManagerController as controller, tabManagerState as state } from './tab-manager-store';
import { t } from '../i18n';
declare const chrome: any;
interface TabItem { id: number; windowId: number; title: string; url: string; active: boolean }
const tabs = ref<TabItem[]>([]), loading = ref(false), error = ref('');
let revision = 0;
const groups = computed(() => {
  const map = new Map<string, TabItem[]>();
  for (const tab of tabs.value) {
    let domain = t('tabs.otherTabs');
    try { const url = new URL(tab.url); domain = url.protocol.includes('extension') ? t('tabs.extensionPage') : url.hostname || url.protocol; } catch {}
    if (!map.has(domain)) map.set(domain, []); map.get(domain)!.push(tab);
  }
  return [...map].map(([domain, tabs]) => ({ domain, tabs }));
});
async function refresh() {
  if (!state.isOpen) return;
  const current = ++revision; loading.value = true; error.value = '';
  try {
    if (typeof chrome === 'undefined' || !chrome.tabs?.query) throw new Error();
    const result = await chrome.tabs.query({ currentWindow: true });
    if (current !== revision || !state.isOpen) return;
    tabs.value = result.filter((tab: any) => Number.isInteger(tab.id)).map((tab: any) => ({ id: tab.id, windowId: tab.windowId, title: tab.title || '', url: tab.url || '', active: !!tab.active }));
  } catch { if (current === revision && state.isOpen) error.value = t('tabs.readError'); }
  finally { if (current === revision) loading.value = false; }
}
async function activate(tab: TabItem) {
  try { await chrome.tabs.update(tab.id, { active: true }); if (tab.windowId != null) await chrome.windows.update(tab.windowId, { focused: true }); }
  catch { error.value = t('tabs.switchError'); }
}
async function remove(tab: TabItem) {
  try { await chrome.tabs.remove(tab.id); tabs.value = tabs.value.filter(item => item.id !== tab.id); }
  catch { error.value = t('tabs.closeError'); }
}
watch(() => state.isOpen, open => { if (open) void refresh(); else { ++revision; tabs.value = []; loading.value = false; } }, { immediate: true });
onUnmounted(() => { ++revision; tabs.value = []; });
</script>
<style scoped>
.tabs-body { padding: 12px; overflow: auto; color: var(--text); font-size: 12px; }
.tabs-note { margin: 0 0 12px; color: var(--muted); font-size: 11px; }
.tabs-refresh, .tab-row button { border: 0; color: var(--text); background: transparent; font: inherit; cursor: pointer; border-radius: 5px; }
.tabs-refresh { padding: 4px 7px; }
.tabs-group { border: 1px solid var(--border); border-radius: 8px; margin-bottom: 10px; overflow: hidden; background: var(--panel); }
h3 { margin: 0; padding: 8px; font-size: 12px; color: var(--heading); background: var(--surface); }
h3 small { color: var(--muted); font-weight: 400; }
.tab-row { display: flex; align-items: center; gap: 5px; padding: 3px 5px; }
.tab-row:hover, .tab-row.active { background: var(--surface); }
.tab-open { flex: 1; min-width: 0; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 5px; }
.tab-row .tab-close { padding: 3px 7px; color: var(--muted); }
</style>
