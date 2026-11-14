<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { limitResourceText, RESOURCE_TEXT_LIMIT, type ResourceAttachment } from './resource-content';
const props = defineProps<{ resource: ResourceAttachment; disabled: boolean; multica?: boolean }>();
const emit = defineEmits<{ update: [resource: ResourceAttachment]; remove: [] }>();
const busy = ref(false), error = ref('');
const pages = ref<{ cid: number | string; page: number; part: string }[]>([]);
const selectedCid = ref('');
let request: AbortController | null = null;
let alive = true;
function patch(changes: Partial<ResourceAttachment>) { emit('update', { ...props.resource, ...changes }); }
async function prepareParts() {
  if (busy.value) return;
  const ctl = new AbortController(); request = ctl; busy.value = true; error.value = '';
  const timer = setTimeout(() => ctl.abort(), 15000);
  try {
    const { bilibiliService } = await import('../services/bilibili.service');
    const view = await bilibiliService.getVideoView(props.resource.id, ctl.signal);
    ctl.signal.throwIfAborted();
    const list: { cid: number | string; page: number; part: string }[] = (Array.isArray(view?.pages) ? view.pages : []).filter((item: any) => item && (typeof item.cid === 'number' || typeof item.cid === 'string') && Number.isSafeInteger(item.page) && item.page > 0).map((item: any) => ({ cid:item.cid, page:item.page, part:String(item.part || '').slice(0, 200) }));
    if (!list.length && view?.cid) list.push({ cid:view.cid, page:1, part:'' });
    if (!list.length) throw new Error('无法读取视频分P信息');
    const selected = list.find(page => page.page === (props.resource.part || 1));
    if (!selected) throw new Error('视频不存在所选分P，请重新添加视频');
    if (alive && request === ctl) { pages.value = list; selectedCid.value = String(selected.cid); patch({ part:selected.page, partTitle:selected.part }); }
  } catch (e) { if (alive && request === ctl) error.value = ctl.signal.aborted ? '读取超时或已取消' : e instanceof Error ? e.message : '分P读取失败'; }
  finally { clearTimeout(timer); if (alive && request === ctl) { request = null; busy.value = false; } }
}
function changePart() {
  const part = pages.value.find(page => String(page.cid) === selectedCid.value);
  if (part) patch({ text:undefined, includeText:false, truncated:false, part:part.page, partTitle:part.part });
}
async function readText() {
  if (busy.value) return;
  const item = props.resource;
  if (item.kind === 'github' && item.visibility !== 'public' && !window.confirm('该仓库是私有或可见性未知。读取后可预览，只有勾选附带并发送时才会传给 Multica。继续读取吗？')) return;
  const ctl = new AbortController(); request = ctl; busy.value = true; error.value = '';
  const timer = setTimeout(() => ctl.abort(), 25000);
  try {
    let text: string;
    let part: { cid: number | string; page: number; part: string } | undefined;
    if (item.kind === 'github') {
      const [{ loadGitHubReadHeaders }, { readAiReadme }] = await Promise.all([import('../github/api-client'), import('../github/ai-request')]);
      const headers = await loadGitHubReadHeaders(ctl.signal);
      text = await readAiReadme(item.id, headers, ctl.signal);
    } else {
      part = pages.value.find(page => String(page.cid) === selectedCid.value);
      if (!part) throw new Error('请先选择视频分P');
      const { bilibiliService } = await import('../services/bilibili.service');
      const result = await bilibiliService.fetchVideoSubtitleDetails(item.id, part.cid, ctl.signal);
      if (!result.ok || !result.cues.length) throw new Error(result.reason || '该视频没有可用字幕');
      text = result.cues.map(cue => {
        const seconds = Math.max(0, Math.floor(cue.from));
        return `[${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}] ${cue.content}`;
      }).join('\n');
    }
    ctl.signal.throwIfAborted();
    if (alive && request === ctl) patch({ ...limitResourceText(text), includeText:false, part:part?.page, partTitle:part?.part });
  } catch (e) { if (alive && request === ctl) error.value = ctl.signal.aborted ? '读取超时或已取消' : e instanceof Error ? e.message : '读取失败'; }
  finally { clearTimeout(timer); if (alive && request === ctl) { request = null; busy.value = false; } }
}
function setInclude(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked && props.resource.kind === 'github' && props.resource.visibility !== 'public' && !window.confirm('确认将该仓库的 README 随消息发送给 Multica 及其运行时 / 模型？请检查是否包含敏感内容。')) { (event.target as HTMLInputElement).checked = false; return; }
  patch({ includeText:checked });
}
onBeforeUnmount(() => { alive = false; request?.abort(); request = null; });
</script>
<template>
  <section class="resource-attachment" :aria-label="`附件 ${resource.title}`">
    <header><strong>{{ resource.kind === 'bilibili' ? '▶ B站' : '⌘ GitHub' }} · {{ resource.title }}</strong><span v-if="resource.kind === 'github' && resource.visibility !== 'public'" class="private">{{ resource.visibility === 'private' ? '私有' : '可见性未知' }}</span><button type="button" :disabled="disabled" :aria-label="`移除 ${resource.title}`" @click="emit('remove')">×</button></header>
    <p>{{ resource.url }}</p>
    <div class="actions">
      <button v-if="resource.kind === 'bilibili' && !pages.length" type="button" :disabled="disabled || busy" @click="prepareParts">{{ busy ? '读取中…' : '选择视频分P' }}</button>
      <template v-if="resource.kind === 'bilibili' && pages.length"><label>分P <select v-model="selectedCid" :disabled="disabled || busy" @change="changePart"><option v-for="page in pages" :key="String(page.cid)" :value="String(page.cid)">P{{ page.page }} {{ page.part }}</option></select></label></template>
      <button v-if="resource.kind === 'github' || pages.length" type="button" :disabled="disabled || busy" @click="readText">{{ busy ? '读取中…' : resource.kind === 'bilibili' ? '读取字幕' : '读取 README' }}</button>
      <span v-if="!resource.text" class="status">未附带正文<span v-if="resource.kind === 'bilibili' && multica"> · P{{ resource.part || 1 }}，助手可按需尝试读取字幕</span></span>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}；没有发送正文，可只发送基础信息。</p>
    <details v-if="resource.text" open><summary>预览{{ resource.kind === 'bilibili' ? '字幕' : 'README' }} · {{ Array.from(resource.text).length }} 字符<span v-if="resource.truncated"> · 已截断（最多 {{ RESOURCE_TEXT_LIMIT }} 字符）</span></summary><pre>{{ resource.text }}</pre><label><input type="checkbox" :checked="resource.includeText" :disabled="disabled || busy" @change="setInclude" /> 附带以上预览正文发送给 Multica</label></details>
  </section>
</template>
<style scoped>
.resource-attachment { flex:1 1 280px; min-width:0; max-width:100%; padding:9px 11px; border:1px solid var(--border,#dfe5ed); border-radius:10px; background:var(--panel,#fff); font-size:11px; }.resource-attachment header { display:flex; gap:6px; align-items:center; }.resource-attachment header strong { flex:1; min-width:0; overflow-wrap:anywhere; }.resource-attachment header button { flex:none; font-size:16px; }.resource-attachment p { margin:4px 0; color:var(--muted,#7b8a9c); overflow-wrap:anywhere; }.private,.error { color:#b45309!important; }.actions { display:flex; flex-wrap:wrap; align-items:center; gap:7px; margin:5px 0; }.actions button,.resource-attachment header button,.actions select { border:1px solid var(--border,#dfe5ed); border-radius:6px; background:var(--surface,#fff); color:var(--text,#52627a); padding:3px 7px; font:inherit; cursor:pointer; }.status { color:var(--muted,#8998aa); }details { margin-top:7px; }summary { cursor:pointer; color:var(--text,#52627a); }pre { max-height:180px; overflow:auto; white-space:pre-wrap; overflow-wrap:anywhere; background:var(--surface,#f5f7fa); padding:8px; border-radius:6px; font:inherit; }details label { display:flex; gap:5px; align-items:flex-start; }button:disabled { opacity:.5; cursor:not-allowed; }
</style>
