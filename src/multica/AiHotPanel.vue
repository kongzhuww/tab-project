<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { aihotFeedState, type AiHotFeedArticle } from "../aihot/aihot-feed-store";
import { DEFAULT_AIHOT_API } from "../services/aihot.service";
const props = defineProps<{ selected: AiHotFeedArticle[] }>();
const emit = defineEmits<{ close: []; select: [article: AiHotFeedArticle] }>();
const articles = ref<AiHotFeedArticle[]>([...aihotFeedState.feedArticles]);
const loading = ref(false);
const error = ref("");
let controller: AbortController | null = null;
function isSelected(article: AiHotFeedArticle) { return props.selected.some(item => item.url === article.url && item.title === article.title); }
async function load() {
  controller?.abort();
  const request = new AbortController(); controller = request; loading.value = true; error.value = "";
  const timer = setTimeout(() => request.abort(), 15000);
  try {
    const params = new URLSearchParams({ mode: "selected", window: "24h", limit: "30" });
    const res = await fetch(`${DEFAULT_AIHOT_API}/items?${params}`, { headers: { Accept: "application/json" }, signal: request.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data?.items) ? data.items : Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : null;
    if (!list) throw new Error("资讯响应格式不匹配");
    if (request !== controller) return;
    articles.value = list.filter((it: any) => it && typeof it === "object").map((it: any): AiHotFeedArticle => {
      let published = it.published || "最新";
      if (it.publishedAt) { const d = new Date(it.publishedAt); if (Number.isFinite(d.getTime())) published = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }
      return { id: String(it.id || it.externalId || ""), title: it.title || it.headline || "无标题", summary: it.summary || it.description || "", sourceName: it.source?.name || it.sourceName || it.site || "AI 资讯", published, category: it.category || "综合", url: it.links?.aihot || it.links?.original || it.url || it.link || "" };
    });
  } catch (e) { if (request === controller) error.value = request.signal.aborted ? "读取超时，请刷新重试。" : `读取失败：${e instanceof Error ? e.message : "网络异常"}`; }
  finally { clearTimeout(timer); if (request === controller) { loading.value = false; controller = null; } }
}
onMounted(() => void load());
onBeforeUnmount(() => { controller?.abort(); controller = null; });
</script>
<template>
  <aside class="article-panel" aria-label="AI Hot 文章">
    <header><div><strong>✦ AI Hot 文章</strong><small>选择文章，添加到当前消息</small></div><button type="button" aria-label="关闭文章侧栏" @click="emit('close')">✕</button></header>
    <div class="panel-tools"><span>精选资讯 · 最近 24 小时</span><button type="button" :disabled="loading" @click="load">↻ 刷新</button></div>
    <div class="article-list"><p v-if="loading && !articles.length" class="hint">正在读取文章…</p><p v-if="error" class="hint" role="alert">{{ error }}<template v-if="articles.length"> 当前显示已有数据。</template></p><p v-if="!loading && !error && !articles.length" class="hint">暂无文章</p>
      <button v-for="(article,index) in articles" :key="`${article.id}-${index}`" type="button" class="article" :class="{selected:isSelected(article)}" @click="emit('select',article)"><span class="rank">{{ index + 1 }}</span><span class="article-body"><strong>{{ article.title }}</strong><span v-if="article.summary" class="summary">{{ article.summary }}</span><span class="meta"><span>{{ article.category }}</span> {{ article.sourceName }} <time>{{ article.published }}</time></span></span><span v-if="isSelected(article)" class="check">✓</span></button>
    </div>
  </aside>
</template>
<style scoped>
.article-panel { width:360px; max-width:40vw; flex:none; display:flex; flex-direction:column; min-height:0; background:var(--panel,#fff); border-left:1px solid var(--border,#e4e8ef); color:var(--text,#26334b); }.article-panel header { display:flex; justify-content:space-between; align-items:center; padding:18px; border-bottom:1px solid var(--border,#e8ebf1); }.article-panel header strong,.article-panel header small { display:block; }.article-panel header strong { font-size:14px; }.article-panel header small { color:#98a5b8; margin-top:3px; font-size:11px; }.article-panel button { cursor:pointer; font:inherit; }.article-panel header button,.panel-tools button { border:1px solid var(--border,#e4e8ef); border-radius:7px; background:var(--surface,#fff); color:var(--text,#52627a); padding:5px 9px; }.panel-tools { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; color:#98a5b8; font-size:11px; }.article-list { flex:1; overflow:auto; padding:0 12px 16px; }.article { width:100%; display:flex; gap:9px; text-align:left; padding:12px; margin-bottom:8px; border:1px solid var(--border,#e3e6ec); border-radius:12px; background:var(--surface,#f8f9fb); color:var(--text,#253149); }.article:hover,.article.selected { border-color:#91c9ed; background:rgba(76,181,231,.08); }.rank { flex:none; display:grid; place-items:center; width:23px; height:23px; border-radius:7px; background:linear-gradient(135deg,#39d0aa,#42b5e9); color:#fff; font-weight:700; }.article-body { flex:1; min-width:0; }.article-body strong { display:block; font-size:12px; line-height:1.5; }.summary { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; color:#8493ab; margin:5px 0; font-size:11px; line-height:1.5; }.meta { display:block; color:#a0adc0; font-size:10px; margin-top:5px; }.meta span { color:#36b5e2; }.meta time { float:right; }.check { color:#30b897; }.hint { color:#95a2b5; font-size:12px; }
.article-panel { position:absolute; right:0; top:0; bottom:0; z-index:30; width:min(360px, 90vw); max-width:calc(100% - 12px); box-shadow:-10px 0 30px #15253a20; }
</style>
