<script setup lang="ts">
import { ref } from 'vue';
import type { MulticaIssue, MulticaAgent } from '../services/multica.service';
import type { LocalConversation } from '../services/byok.service';
import LoadingIndicator from './LoadingIndicator.vue';
const props = defineProps<{ section:'chat'|'library'|'schedule'; service:'multica'|'deepseek'; selectedId:string; issues:MulticaIssue[]; agents:MulticaAgent[]; conversations:LocalConversation[]; disabled:boolean; connected:boolean; loading:boolean; error:string; commentsLoading?:boolean }>();
const emit = defineEmits<{ new:[]; navigate:[section:'library'|'schedule']; selectIssue:[issue:MulticaIssue]; selectConversation:[id:string]; deleteConversation:[id:string]; retry:[] }>();
const confirming=ref('');
function remove(id:string) { if (confirming.value !== id) { confirming.value=id; return; } confirming.value=''; emit('deleteConversation',id); }
const statusNames:Record<string,string>={backlog:'待处理',todo:'待处理',in_progress:'进行中',in_review:'待审核',done:'已完成',cancelled:'已取消',canceled:'已取消'};
function status(issue:MulticaIssue) { return statusNames[issue.status_category || ''] || statusNames[issue.status || ''] || issue.status || '未知'; }
function statusColor(issue:MulticaIssue) {
  const name = status(issue);
  return name === '待审核' ? 'review' : name === '已完成' || name === '完成' ? 'done' : name === '待处理' ? 'pending' : '';
}
</script>
<template>
  <aside class="side-panel" aria-label="AI 工作区导航">
    <div class="nav-brand"><span class="brand-icon">✳</span><div><strong>AI 工作区</strong><small>YOUR CREATIVE SPACE</small></div></div>
    <nav class="navigation" aria-label="工作区功能">
      <button class="nav-item new-button" type="button" :disabled="disabled" @click="emit('new')"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6M13 11l7-7m-3 0h3v3"/></svg><span>发起新对话</span></button>
      <button class="nav-item" type="button" :class="{active:section==='library'}" :aria-current="section==='library'?'page':undefined" @click="emit('navigate','library')"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/></svg><span>库</span></button>
      <button class="nav-item" type="button" :class="{active:section==='schedule'}" :aria-current="section==='schedule'?'page':undefined" @click="emit('navigate','schedule')"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg><span>已安排</span></button>
    </nav>
    <div class="section-heading"><span>最近对话</span><small>RECENT</small></div>
    <div class="session-list">
      <div class="group-label">Multica <small>最近 50 条</small></div>
      <button v-for="issue in issues" :key="issue.id" type="button" class="session-item" :class="{chosen:section==='chat' && service==='multica' && selectedId===issue.id}" :disabled="disabled" @click="emit('selectIssue',issue)"><span class="session-title">{{ issue.title }}</span><span class="session-meta"><span>{{ issue.identifier || '会话' }}</span><LoadingIndicator v-if="service==='multica' && selectedId===issue.id && commentsLoading" label="加载中" /><span v-else class="session-status" :class="statusColor(issue)">{{ status(issue) }}</span></span></button>
      <p v-if="loading" class="side-loading"><LoadingIndicator label="正在加载会话" /></p><p v-if="error" class="side-error" role="alert">{{ error }} <button type="button" @click="emit('retry')">重试</button></p><p v-else-if="!issues.length && !loading" class="empty">{{ connected ? '暂无会话' : '未连接 Multica' }}</p>
      <div class="group-label">DeepSeek <small>本机会话</small></div>
      <div v-for="chat in conversations" :key="chat.id" class="local-row" :class="{chosen:section==='chat' && service==='deepseek' && selectedId===chat.id}"><button class="session-item local-item" type="button" :disabled="disabled" @click="emit('selectConversation',chat.id)"><span class="session-title">{{ chat.title }}</span><span class="session-meta">{{ chat.model }}</span></button><button class="delete" type="button" :disabled="disabled" :aria-label="confirming===chat.id?'确认删除会话':'删除会话'" @click="remove(chat.id)">{{ confirming===chat.id?'确认删除':'×' }}</button></div><p v-if="!conversations.length" class="empty">暂无本地会话</p>
    </div>
  </aside>
</template>
<style scoped>
.side-panel{width:248px;flex:none;min-height:0;padding:18px 12px 14px;display:flex;flex-direction:column;border:1px solid var(--border,#e7e9ef);border-radius:16px;background:var(--panel,#fff);box-shadow:0 4px 20px #00000008;box-sizing:border-box;color:var(--text,#26334b)}.nav-brand{display:flex;align-items:center;gap:10px;padding:2px 8px 18px}.brand-icon{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:#7770eb;color:#fff;font-size:20px}.nav-brand strong,.nav-brand small{display:block}.nav-brand strong{font-size:13px}.nav-brand small{font-size:9px;letter-spacing:.12em;color:var(--muted,#94a3b8);margin-top:2px}.navigation{display:grid;gap:3px}.nav-item{display:flex;align-items:center;gap:12px;width:100%;min-height:38px;border:0;border-radius:10px;text-align:left;padding:0 11px;background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer}.nav-item svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.nav-item:hover,.nav-item.active{background:var(--surface,#f2f3f6)}.new-button{background:var(--surface,#f2f3f6);font-weight:650;margin-bottom:3px}.new-button svg{color:#7668e9}.section-heading{display:flex;align-items:center;justify-content:space-between;margin:24px 9px 8px;color:var(--muted,#94a3b8);font-size:11px}.section-heading small{font-size:9px;letter-spacing:.12em}.session-list{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:2px}.group-label{display:flex;justify-content:space-between;margin:13px 10px 4px;font-size:10px;font-weight:650;color:var(--muted,#9aa7ba)}.group-label small{font-size:10px;font-weight:400}.session-item{display:block;width:100%;min-width:0;text-align:left;border:0;border-radius:9px;padding:9px 10px;background:transparent;color:inherit;font:inherit;cursor:pointer}.session-item:hover,.local-row:hover,.session-item.chosen,.local-row.chosen{background:var(--surface,#f2f3f6)}.session-title{display:block;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.session-meta{display:flex;justify-content:space-between;gap:6px;margin-top:4px;font-size:10px;color:var(--muted,#94a3b8)}.local-row{display:flex;align-items:center;border-radius:9px}.local-item{flex:1}.delete,.side-error button{border:0;background:transparent;color:var(--muted,#94a3b8);padding:7px;cursor:pointer;font-size:11px}.side-loading,.side-error,.empty{padding:4px 10px;font-size:11px;margin:0}.empty{color:var(--muted,#94a3b8)}.side-error{color:#b45309;overflow-wrap:anywhere}button:disabled{opacity:.5;cursor:not-allowed}@media(max-width:850px){.side-panel{width:190px}}
.session-status.review{color:#b77912}.session-status.done{color:#16835a}.session-status.pending{color:#d34545}
</style>
<style>
html[data-theme="dark"] #multica .session-status.review{color:#f1bd50}
html[data-theme="dark"] #multica .session-status.done{color:#56c99a}
html[data-theme="dark"] #multica .session-status.pending{color:#f17e7e}
</style>
