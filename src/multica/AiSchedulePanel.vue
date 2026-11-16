<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { loadConfig } from '../services/byok.service';
import { AI_SCHEDULE_KEY, keyFingerprint, safeScheduleList, type AiSchedule } from './schedule-contract';
import { SCHEDULE_COLUMNS, groupScheduleJobs, scheduleStatusLabel } from './schedule-board';
import { callScheduleBackend } from './schedule-client';
import type { MulticaAgent } from '../services/multica.service';
declare const chrome:any;
const props=defineProps<{provider:'multica'|'deepseek'; model:string; agents:MulticaAgent[]; workspaceId:string; agentId:string; embedded?:boolean; active?:boolean}>();
const emit=defineEmits<{close:[]}>();
const provider=ref<'multica'|'deepseek'>(props.provider), repeat=ref<'once'|'daily'>('once');
const selectedAgent=ref(props.agentId), prompt=ref(''), when=ref(''), confirmed=ref(false);
const jobs=ref<AiSchedule[]>([]), loadError=ref(''), actionError=ref(''), notice=ref('');
const busy=ref(false), loading=ref(true), loaded=ref(false), backendReady=ref(false), fingerprint=ref(''), showCreator=ref(false);
const closeButton=ref<HTMLButtonElement | null>(null), promptInput=ref<HTMLTextAreaElement | null>(null);
const groups=computed(()=>groupScheduleJobs(jobs.value));
const canCreate=computed(()=>backendReady.value && !busy.value && confirmed.value && Boolean(prompt.value.trim()) && Boolean(when.value) && (provider.value==='deepseek'?Boolean(fingerprint.value):Boolean(props.workspaceId && props.agents.some(agent=>agent.id===selectedAgent.value))));
let refreshVersion=0, disposed=false;
async function invoke(action:string,fields:Record<string,unknown>={}) {
  return callScheduleBackend(typeof chrome==='undefined' ? null : chrome.runtime,action,fields);
}
async function refresh() {
  const version=++refreshVersion;
  loading.value=true;
  try {
    const response=await invoke('list');
    if (!Array.isArray(response)) throw new Error('后台返回的任务列表格式异常，未覆盖本机记录。');
    const result=safeScheduleList(response);
    if(disposed || version!==refreshVersion) return;
    jobs.value=result; loaded.value=true; backendReady.value=true; loadError.value='';
  } catch(e) {
    if(disposed || version!==refreshVersion) return;
    backendReady.value=false;
    const message=e instanceof Error ? e.message : '定时任务读取失败。';
    try {
      if(typeof chrome==='undefined' || !chrome.storage?.local) throw new Error('本机存储不可用');
      const data=await chrome.storage.local.get(AI_SCHEDULE_KEY);
      const result=safeScheduleList(data[AI_SCHEDULE_KEY]);
      if(disposed || version!==refreshVersion) return;
      jobs.value=result; loaded.value=true;
      loadError.value=`${message} 当前为本机只读预览，不能确认实际执行状态。`;
    } catch {
      if(disposed || version!==refreshVersion) return;
      loadError.value=`${message} 本机记录也无法读取，已有任务未被修改。`;
    }
  } finally { if(!disposed && version===refreshVersion) loading.value=false; }
}
function openCreator() {
  if(!backendReady.value || busy.value) return;
  actionError.value=''; notice.value=''; showCreator.value=true;
  void nextTick(()=>promptInput.value?.focus());
}
async function create() {
  if (!canCreate.value) return;
  actionError.value=''; notice.value='';
  const time=new Date(when.value).getTime();
  if (!Number.isFinite(time) || time<=Date.now()+10000) { actionError.value='请选择至少 10 秒之后的时间。'; return; }
  busy.value=true;
  try {
    await invoke('create',{input:{provider:provider.value,repeat:repeat.value,prompt:prompt.value,runAt:time,agentId:selectedAgent.value,workspaceId:props.workspaceId,model:props.model,keyFingerprint:fingerprint.value}});
    prompt.value=''; when.value=''; confirmed.value=false; showCreator.value=false; notice.value='定时任务已保存。'; await refresh();
  } catch(e) {
    actionError.value=e instanceof Error ? e.message : '保存结果未确认，请先检查列表，勿重复创建。';
    await refresh();
  } finally { busy.value=false; }
}
function canResume(job:AiSchedule):boolean {
  return (job.repeat==='daily' && ['paused','failed','unknown'].includes(job.state)) || (job.repeat==='once' && job.state==='paused' && job.runAt>Date.now()+10000);
}
async function change(action:'pause'|'resume'|'delete',job:AiSchedule) {
  if (!backendReady.value || busy.value || (action==='delete' && !window.confirm('删除这条定时任务？已派发或正在执行的外部任务不会被取消。'))) return;
  busy.value=true; actionError.value=''; notice.value='';
  try { await invoke(action,{id:job.id}); await refresh(); }
  catch(e) { actionError.value=e instanceof Error?e.message:'操作未确认，请先检查任务列表。'; await refresh(); }
  finally { busy.value=false; }
}
function dateText(timestamp:number):string {
  const date=new Date(timestamp);
  return Number.isNaN(date.getTime()) ? '时间不可用' : date.toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
}
function agentText(job:AiSchedule):string {
  if(job.provider==='deepseek') return job.model || 'DeepSeek';
  return props.agents.find(agent=>agent.id===job.agentId)?.name || 'Multica 智能体';
}
function onStorage(changes:any,area:string) { if(area==='local' && changes[AI_SCHEDULE_KEY]) void refresh(); }
async function refreshCredential() {
  try { const config=await loadConfig(); fingerprint.value=config.key ? await keyFingerprint(config.key) : ''; }
  catch { fingerprint.value=''; }
}
function handleEscape() { if(showCreator.value) showCreator.value=false; else if(!props.embedded) emit('close'); }
watch(provider,()=>{confirmed.value=false;});
watch(() => props.active, active => { if (active) { void refreshCredential(); void refresh(); } });
onMounted(async()=>{
  if (!props.embedded) closeButton.value?.focus();
  if (typeof chrome!=='undefined') chrome.storage?.onChanged?.addListener(onStorage);
  await refreshCredential();
  await refresh();
});
onBeforeUnmount(()=>{disposed=true; ++refreshVersion; if(typeof chrome!=='undefined') chrome.storage?.onChanged?.removeListener(onStorage);});
</script>

<template>
  <div class="schedule-overlay" :class="{embedded}" @click.self="!embedded && emit('close')" @keydown.esc.stop="handleEscape">
    <section class="schedule-dialog" :role="embedded ? 'region' : 'dialog'" :aria-modal="embedded ? undefined : 'true'" aria-labelledby="schedule-title">
      <header class="page-header">
        <div class="page-heading"><div class="eyebrow">AI WORKSPACE <span>/</span> AUTOMATION</div><h2 id="schedule-title">已安排 <span v-if="loaded" class="total-count">{{ jobs.length }}</span></h2><p>安排 AI 任务，按状态查看每一次执行。</p></div>
        <div class="header-actions"><button type="button" class="icon-button" :disabled="loading" title="重新读取任务" aria-label="重新读取任务" @click="refresh"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M5.5 9a7 7 0 0 1 12-2L20 12M4 12l2.5 5a7 7 0 0 0 12-2"/></svg></button><button type="button" class="add-primary" :disabled="!backendReady || busy" @click="openCreator"><span>＋</span> 新建任务</button><button v-if="!embedded" ref="closeButton" class="icon-button close" type="button" aria-label="关闭定时任务" @click="emit('close')">×</button></div>
      </header>
      <div v-if="loadError" class="banner warning" role="alert"><span class="banner-icon">!</span><div><strong>定时后台暂不可用</strong><p>{{ loadError }}</p></div><button type="button" :disabled="loading" @click="refresh">重新检查</button></div>
      <div v-if="actionError" class="banner warning" role="alert"><span class="banner-icon">!</span><div><strong>操作未确认</strong><p>{{ actionError }}</p></div><button type="button" aria-label="关闭操作提示" @click="actionError=''">×</button></div>
      <div v-else-if="notice" class="banner success" role="status"><span class="banner-icon">✓</span><div>{{ notice }}</div><button type="button" aria-label="关闭提示" @click="notice=''">×</button></div>
      <div v-if="!loaded && loading" class="loading-state" role="status">正在读取定时任务…</div>
      <div v-else-if="!loaded" class="loading-state">无法读取任务列表，原有任务未被修改。</div>
      <div v-else class="board" aria-label="按执行状态分组的定时任务">
        <section v-for="column in SCHEDULE_COLUMNS" :key="column.id" class="board-column" :aria-label="column.title">
          <div class="column-head"><div class="column-title"><span class="column-dot" :class="column.id"></span><h3>{{ column.title }}</h3><span class="column-count">{{ groups[column.id].length }}</span></div></div>
          <p class="column-description">{{ column.description }}</p>
          <button v-if="column.id==='pending'" type="button" class="column-add" :disabled="!backendReady || busy" @click="openCreator"><span>＋</span> 添加任务</button>
          <div class="column-list">
            <article v-for="job in groups[column.id]" :key="job.id" class="job-card">
              <div class="job-card-top"><span class="state-marker" :class="job.state" aria-hidden="true"></span><div class="job-content"><p class="job-title">{{ job.prompt }}</p><div class="job-meta"><span class="provider-tag" :class="job.provider">{{ job.provider==='multica' ? 'Multica' : 'DeepSeek' }}</span><span class="agent-name">{{ agentText(job) }}</span></div><div class="job-schedule"><span>◷ {{ dateText(job.runAt) }}</span><span v-if="job.repeat==='daily'" class="repeat-label">↻ 每天</span></div><p v-if="job.lastResult" class="job-result">{{ job.lastResult }}</p></div></div>
              <div class="job-footer"><span class="state-label" :class="job.state">{{ scheduleStatusLabel(job) }}</span><div class="job-actions"><button v-if="job.state==='pending'" type="button" :disabled="!backendReady || busy" @click="change('pause',job)">暂停</button><button v-if="canResume(job)" type="button" :disabled="!backendReady || busy" @click="change('resume',job)">恢复</button><button type="button" :disabled="!backendReady || busy || job.state==='running'" @click="change('delete',job)">删除</button></div></div>
            </article>
            <p v-if="!groups[column.id].length" class="column-empty">{{ column.id==='pending' ? '还没有安排任务' : '暂无任务' }}</p>
          </div>
        </section>
      </div>
      <footer class="page-footer"><span class="footer-dot"></span> 本机时间 · 自动执行需要浏览器运行 · 结果不确定时不会自动重试</footer>
      <div v-show="showCreator" class="creator-backdrop" @click.self="showCreator=false">
        <section class="creator-panel" role="dialog" aria-modal="true" aria-labelledby="create-schedule-title">
          <header class="creator-header"><div><span class="creator-kicker">NEW AUTOMATION</span><h3 id="create-schedule-title">新建定时任务</h3><p>配置完成后，任务会进入等待执行。</p></div><button class="icon-button close" type="button" aria-label="关闭新建任务" @click="showCreator=false">×</button></header>
          <form class="create" @submit.prevent="create">
            <label>执行服务<select v-model="provider"><option value="multica">Multica 智能体</option><option value="deepseek">DeepSeek · {{ model }}</option></select></label>
            <label v-if="provider==='multica'">智能体<select v-model="selectedAgent"><option value="">选择在线智能体</option><option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.name }}</option></select><small v-if="!agents.length || !workspaceId">请先连接 Multica 并确认智能体在线。</small></label>
            <label v-else>模型<input :value="model" readonly><small v-if="!fingerprint">请先在 AI 设置中配置 DeepSeek API Key。</small></label>
            <label>任务内容<textarea ref="promptInput" v-model="prompt" maxlength="10000" rows="5" placeholder="写下需要执行的任务或提示词…" /></label>
            <div class="time-row"><label>首次执行时间<input v-model="when" type="datetime-local" required></label><label>重复<select v-model="repeat"><option value="once">执行一次</option><option value="daily">每天</option></select></label></div>
            <p class="hint">使用本机时间和本机账号，任务不跨设备同步。浏览器关闭、休眠或断网可能延迟；迟到超过 10 分钟会跳过本次，不自动补跑。长请求也可能因后台停止而中断。</p>
            <label class="check"><input v-model="confirmed" type="checkbox"><span>我了解任务将自动执行{{ provider==='deepseek' ? '，DeepSeek 每次调用可能产生费用' : '，Multica 将使用所选智能体' }}。</span></label>
            <div v-if="actionError" class="form-error" role="alert">{{ actionError }}</div>
            <div class="creator-actions"><button type="button" class="secondary" @click="showCreator=false">取消</button><button class="add-primary" type="submit" :disabled="!canCreate">{{ busy ? '保存中…' : '创建定时任务' }}</button></div>
          </form>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
.schedule-overlay{position:absolute;inset:0;z-index:50;display:grid;place-items:center;padding:20px;background:rgba(13,19,38,.46);backdrop-filter:blur(5px)}
.schedule-overlay.embedded{position:relative;inset:auto;display:block;padding:0;background:transparent;backdrop-filter:none;height:100%;overflow:hidden}
.schedule-dialog{position:relative;box-sizing:border-box;display:flex;flex-direction:column;width:min(1120px,100%);height:min(780px,100%);min-height:0;overflow:hidden;background:var(--panel,#fff);color:var(--text,#26334b);border:1px solid var(--border,#e3e8f1);border-radius:18px;box-shadow:0 24px 90px #1e1b4b33;padding:28px 30px 16px}
.embedded .schedule-dialog{width:100%;height:100%;border:0;border-radius:0;box-shadow:none}
.page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex:none;margin-bottom:24px}.eyebrow,.creator-kicker{font-size:9px;font-weight:700;letter-spacing:.15em;color:#8d83dc}.eyebrow span{color:var(--muted,#a0aec0);margin:0 4px}.page-heading h2{display:flex;align-items:center;gap:9px;font-size:23px;letter-spacing:-.02em;margin:7px 0 4px}.page-heading p,.creator-header p{margin:0;color:var(--muted,#8793a8);font-size:12px}.total-count{font-size:11px;color:var(--muted,#94a3b8);background:var(--surface,#f2f4f7);border-radius:20px;padding:2px 8px;letter-spacing:0;font-weight:600}.header-actions{display:flex;align-items:center;gap:8px;padding-top:4px}.icon-button{display:grid;place-items:center;width:34px;height:34px;padding:0;border:1px solid var(--border,#e2e6ed);border-radius:8px;background:var(--panel,#fff);color:var(--muted,#6b7280);cursor:pointer}.icon-button svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.icon-button.close{font-size:22px;line-height:1}.add-primary{border:0;border-radius:8px;padding:9px 13px;background:#746be7;color:#fff;font:inherit;font-size:12px;font-weight:650;cursor:pointer;white-space:nowrap}.add-primary span{font-size:16px;vertical-align:-1px;margin-right:3px}.add-primary:hover:not(:disabled){background:#665dd8}button:disabled{opacity:.48;cursor:not-allowed}
.board{display:flex;flex:1;min-height:0;overflow-x:auto;overflow-y:hidden;gap:0;margin:0 -3px;padding-bottom:7px}.board-column{display:flex;flex-direction:column;flex:1 0 230px;min-width:230px;max-width:390px;min-height:0;padding:0 15px;border-left:1px solid var(--border,#eceef2)}.board-column:first-child{border-left:0;padding-left:3px}.board-column:last-child{padding-right:3px}.column-head{display:flex;justify-content:space-between;align-items:center;min-height:28px}.column-title{display:flex;align-items:center;gap:7px;min-width:0}.column-title h3{font-size:13px;font-weight:700;margin:0;white-space:nowrap}.column-dot{width:7px;height:7px;border-radius:50%;background:#a5aebc;flex:none}.column-dot.pending{background:#8e83ed}.column-dot.running{background:#65a8e5}.column-dot.completed{background:#55b78d}.column-dot.attention{background:#e5aa58}.column-count{font-size:11px;color:var(--muted,#94a3b8)}.column-more{font-size:18px;line-height:1;color:var(--muted,#a4aab4);letter-spacing:1px}.column-description{color:var(--muted,#9aa5b5);font-size:10px;margin:1px 0 11px;min-height:15px}.column-add{flex:none;width:100%;text-align:left;border:0;border-radius:8px;padding:8px 10px;background:var(--surface,#f4f5f7);color:var(--muted,#8c96a5);font:inherit;font-size:12px;cursor:pointer;margin-bottom:10px}.column-add span{font-size:15px;margin-right:3px}.column-add:hover:not(:disabled){color:#746be7;background:rgba(116,107,231,.10)}.column-list{overflow:auto;min-height:0;padding:0 2px 12px 0}.column-empty{padding:12px 4px;font-size:11px;color:var(--muted,#a4acb8)}
.job-card{background:var(--panel,#fff);border:1px solid var(--border,#e1e5eb);border-radius:10px;padding:12px 11px 9px;margin-bottom:9px;box-shadow:0 2px 7px #27314a0a;overflow:hidden}.job-card-top{display:flex;align-items:flex-start;gap:9px}.state-marker{width:15px;height:15px;flex:none;border:1.5px solid #a3adba;border-radius:50%;margin-top:1px;box-sizing:border-box}.state-marker.running{border-color:#65a8e5}.state-marker.completed{border-color:#55b78d;background:#55b78d}.state-marker.failed,.state-marker.unknown,.state-marker.skipped{border-color:#d9a25b}.job-content{min-width:0;flex:1}.job-title{font-size:12px;line-height:1.55;font-weight:600;margin:0;color:var(--text,#26334b);overflow-wrap:anywhere;white-space:pre-wrap;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.job-meta,.job-schedule{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:9px;font-size:10px;color:var(--muted,#8d99aa)}.provider-tag{border-radius:5px;padding:2px 5px;background:rgba(116,107,231,.1);color:#746be7;font-weight:650}.provider-tag.deepseek{background:rgba(59,130,246,.1);color:#4388c9}.agent-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:135px}.repeat-label{color:#7895ad}.job-result{font-size:10px;line-height:1.55;color:var(--muted,#94a3b8);overflow-wrap:anywhere;margin:8px 0 0}.job-footer{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding-top:8px;border-top:1px solid var(--border,#edf0f4)}.state-label{font-size:10px;color:var(--muted,#94a3b8)}.state-label.completed{color:#268861}.state-label.failed,.state-label.unknown,.state-label.skipped{color:#b47b2c}.job-actions{display:flex;gap:3px}.job-actions button{border:0;background:transparent;border-radius:5px;padding:3px 5px;font:inherit;font-size:10px;color:var(--muted,#8692a4);cursor:pointer}.job-actions button:hover:not(:disabled){color:#746be7;background:var(--surface,#f3f4f7)}.loading-state{flex:1;display:grid;place-items:center;color:var(--muted,#94a3b8);font-size:12px}.page-footer{flex:none;margin-top:12px;color:var(--muted,#a0aabc);font-size:10px}.footer-dot{display:inline-block;width:6px;height:6px;margin-right:4px;border-radius:50%;background:#a7b4c5}
.banner{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;margin:-8px 0 16px;border-radius:9px;font-size:11px;line-height:1.5;flex:none}.banner.warning{background:rgba(245,158,11,.09);color:#a5681c}.banner.success{background:rgba(22,163,74,.08);color:#198556}.banner-icon{font-weight:700}.banner>div{flex:1;min-width:0}.banner p{margin:2px 0 0;overflow-wrap:anywhere}.banner button{border:0;background:transparent;color:inherit;font:inherit;cursor:pointer;white-space:nowrap}
.creator-backdrop{position:absolute;inset:0;z-index:5;display:flex;justify-content:flex-end;background:rgba(15,23,42,.32)}.creator-panel{box-sizing:border-box;width:min(470px,100%);height:100%;overflow:auto;background:var(--panel,#fff);border-left:1px solid var(--border,#e2e8f0);box-shadow:-12px 0 40px #0f172a1a;padding:26px}.creator-header{display:flex;justify-content:space-between;gap:12px;margin-bottom:20px}.creator-header h3{font-size:18px;margin:5px 0}.create label:not(.check){display:flex;flex-direction:column;gap:6px;margin:15px 0;font-size:11px;font-weight:650;color:var(--text,#475569)}.create label small,.hint{color:var(--muted,#8492a8);font-weight:400;font-size:11px;line-height:1.6}.create input:not([type=checkbox]),.create select,.create textarea{box-sizing:border-box;width:100%;border:1px solid var(--border,#dfe4ef);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);padding:10px;font:12px system-ui;outline-color:#8176e7}.create textarea{resize:vertical;min-height:110px}.time-row{display:grid;grid-template-columns:2fr 1fr;gap:10px}.create label.check{display:flex;align-items:flex-start;gap:8px;width:100%;height:auto;min-height:0;box-sizing:border-box;border:0;background:transparent;padding:0;margin:14px 0;font-size:11px;line-height:1.5;color:var(--text,#52627a)}.create label.check span{flex:1;min-width:0;white-space:normal}.check input{flex:none;margin-top:2px;accent-color:#7668e9}.creator-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}.secondary{border:1px solid var(--border,#e1e6ed);border-radius:8px;padding:9px 13px;background:var(--panel,#fff);color:var(--text,#52627a);font:inherit;font-size:12px;cursor:pointer}.form-error{padding:9px;background:rgba(245,158,11,.1);border-radius:7px;color:#a5681c;font-size:11px;overflow-wrap:anywhere}
@media(max-width:720px){.schedule-dialog{padding:18px 16px 14px}.page-header{gap:10px}.page-heading h2{font-size:20px}.page-heading p{font-size:11px}.board-column{flex-basis:220px;min-width:220px;padding:0 12px}.creator-panel{padding:20px}}
</style>
