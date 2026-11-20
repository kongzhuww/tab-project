<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { t } from '../i18n';
import { parseRss, rssUrl, type RssArticle } from './rss';

const props = defineProps<{ active: boolean }>();
const emit = defineEmits<{ (event: 'custom-selected', selected: boolean): void }>();
interface Channel { name: string; url: string }
const CHANNELS_KEY = 'lw-rss-channels-v1';
const SELECTED_KEY = 'lw-rss-selected-v1';
function readChannels(): Channel[] {
  try {
    const data = JSON.parse(localStorage.getItem(CHANNELS_KEY) || '[]');
    return Array.isArray(data) ? data.filter((entry: any) => typeof entry?.name === 'string' && rssUrl(entry.url) === entry.url) : [];
  } catch { return []; }
}
const channels = ref<Channel[]>(readChannels());
const selected = ref(localStorage.getItem(SELECTED_KEY) || '');
if (!channels.value.some(channel => channel.url === selected.value)) selected.value = '';
const name = ref('');
const address = ref('');
const adding = ref(false);
const error = ref('');
const loading = ref(false);
const articles = ref<RssArticle[]>([]);
const current = computed(() => channels.value.find(channel => channel.url === selected.value));
let request: AbortController | null = null;

function select(url: string) {
  selected.value = url;
  try { localStorage.setItem(SELECTED_KEY, url); } catch { /* selection is still usable for this session */ }
}
function addChannel() {
  const url = rssUrl(address.value.trim());
  if (!url) { error.value = t('rss.invalidUrl'); return; }
  if (channels.value.some(channel => channel.url === url)) { error.value = t('rss.duplicate'); return; }
  const channel = { name: name.value.trim() || new URL(url).hostname, url };
  const next = [...channels.value, channel];
  try { localStorage.setItem(CHANNELS_KEY, JSON.stringify(next)); }
  catch { error.value = t('rss.saveError'); return; }
  channels.value = next;
  name.value = ''; address.value = ''; adding.value = false; error.value = '';
  select(url);
}
function removeChannel() {
  if (!current.value) return;
  const next = channels.value.filter(channel => channel.url !== selected.value);
  try { localStorage.setItem(CHANNELS_KEY, JSON.stringify(next)); }
  catch { error.value = t('rss.saveError'); return; }
  channels.value = next;
  select('');
}
async function refresh() {
  request?.abort();
  if (!props.active || !current.value) return;
  const controller = new AbortController();
  request = controller;
  loading.value = true; error.value = ''; articles.value = [];
  try {
    const response = await fetch(current.value.url, { signal: controller.signal, credentials: 'omit' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const parsed = parseRss(await response.text(), response.url || current.value.url);
    if (!controller.signal.aborted) articles.value = parsed;
  } catch (err) {
    if (!controller.signal.aborted) error.value = `${t('rss.loadError')}: ${err instanceof Error ? err.message : ''}`;
  } finally {
    if (request === controller) { request = null; loading.value = false; }
  }
}
watch([selected, () => props.active], ([url, active]) => {
  emit('custom-selected', !!url);
  request?.abort(); request = null; loading.value = false;
  articles.value = []; error.value = '';
  if (url && active) void refresh();
}, { immediate: true });
function refreshSavedChannels() {
  channels.value = readChannels();
  const saved = localStorage.getItem(SELECTED_KEY) || '';
  selected.value = channels.value.some(channel => channel.url === saved) ? saved : '';
}
function onStorage(event: StorageEvent) {
  if (event.storageArea === localStorage && (event.key === CHANNELS_KEY || event.key === SELECTED_KEY)) refreshSavedChannels();
}
function onSyncRestored(event: Event) {
  const settings = (event as CustomEvent).detail;
  if (settings && (Object.hasOwn(settings, CHANNELS_KEY) || Object.hasOwn(settings, SELECTED_KEY))) refreshSavedChannels();
}
onMounted(() => { window.addEventListener('storage', onStorage); window.addEventListener('logicweaver:sync-restored', onSyncRestored); });
onBeforeUnmount(() => {
  request?.abort();
  window.removeEventListener('storage', onStorage);
  window.removeEventListener('logicweaver:sync-restored', onSyncRestored);
});
</script>

<template>
  <section class="rss-channels" :aria-label="t('rss.channels')">
    <div class="rss-toolbar">
      <label for="rss-channel-select">{{ t('rss.channels') }}</label>
      <select id="rss-channel-select" :value="selected" @change="select(($event.target as HTMLSelectElement).value)">
        <option value="">AI HOT</option>
        <option v-for="channel in channels" :key="channel.url" :value="channel.url">{{ channel.name }}</option>
      </select>
      <button type="button" @click="adding = !adding">{{ t('rss.add') }}</button>
      <button v-if="current" type="button" @click="removeChannel">{{ t('rss.remove') }}</button>
      <button v-if="current" type="button" :disabled="loading || !active" @click="refresh">{{ t('rss.refresh') }}</button>
    </div>
    <form v-if="adding" class="rss-form" @submit.prevent="addChannel">
      <input v-model="name" :placeholder="t('rss.name')" :aria-label="t('rss.name')">
      <input v-model="address" type="url" required :placeholder="t('rss.url')" :aria-label="t('rss.url')">
      <button type="submit">{{ t('rss.save') }}</button>
    </form>
    <p v-if="error" class="notice" role="alert">{{ error }}</p>
    <template v-if="current">
      <p v-if="loading" class="muted small" role="status">{{ t('rss.loading') }}</p>
      <div v-else class="aihot-grid">
        <a v-for="(article, index) in articles" :key="article.url + index" class="aihot-item" :href="article.url" target="_blank" rel="noopener noreferrer">
          <div style="min-width:0;flex:1">
            <div class="aihot-t">{{ article.title }}</div>
            <p v-if="article.summary" class="aihot-s">{{ article.summary }}</p>
            <div class="aihot-m"><span>{{ current.name }}</span><time>{{ article.published }}</time></div>
          </div>
        </a>
        <p v-if="!articles.length && !error" class="muted small">{{ t('rss.empty') }}</p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.rss-channels { margin-bottom: 10px; min-width: 0; }
.rss-toolbar, .rss-form { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px; }
.rss-toolbar label { color:var(--muted); font-size:12px; }
.rss-toolbar select, .rss-form input { min-width:0; max-width:100%; background:var(--surface); color:var(--text); border:1px solid var(--border); border-radius:8px; padding:7px 9px; }
.rss-toolbar select { flex:1; }
.rss-form input { flex:1 1 150px; }
.rss-toolbar button, .rss-form button { background:var(--surface); color:var(--text); border:1px solid var(--border); border-radius:8px; padding:7px 10px; cursor:pointer; }
</style>
