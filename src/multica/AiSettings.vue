<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { clearConfig, fetchDeepSeekModels, loadConfig, saveConfig } from '../services/byok.service';
import MulticaSettings from './MulticaSettings.vue';
const props = defineProps<{ initialTab: 'multica' | 'deepseek' }>();
const emit = defineEmits<{ close: []; connectionChanged: []; configChanged: []; busyChanged: [busy: boolean] }>();
const tab = ref<'multica' | 'deepseek'>(props.initialTab);
const key = ref(''), model = ref(''), models = ref<string[]>([]), configured = ref(false), busy = ref(false), note = ref('');
onMounted(async () => { try { const c = await loadConfig(); configured.value = Boolean(c.key); model.value = c.model; models.value = c.models; if (c.key) void discover(); } catch { note.value = '读取本机设置失败。'; } });
async function discover() {
  if (busy.value) return; busy.value = true; note.value = '';
  try {
    const old = await loadConfig(), used = key.value.trim() || old.key;
    const result = await fetchDeepSeekModels(used);
    models.value = result; if (!result.includes(model.value)) model.value = result[0];
    if (!key.value.trim() && used === (await loadConfig()).key) { await saveConfig(used, model.value, result); emit('configChanged'); }
    note.value = `已获取 ${result.length} 个模型。`;
  } catch (e) { note.value = e instanceof Error ? e.message : '获取模型失败'; } finally { busy.value = false; }
}
async function save() {
  if (busy.value) return; busy.value = true; note.value = '';
  try { const old = await loadConfig(); if (!models.value.includes(model.value)) throw new Error('请先获取模型并选择一个可用模型。'); await saveConfig(key.value || old.key, model.value, models.value); key.value = ''; configured.value = true; note.value = '设置已保存在本机。'; emit('configChanged'); }
  catch (e) { note.value = e instanceof Error ? e.message : '保存失败'; } finally { busy.value = false; }
}
async function remove() {
  if (busy.value) return; busy.value = true;
  try { await clearConfig(); key.value = ''; configured.value = false; note.value = '已从本机移除 Key，不会删除聊天记录；如需吊销请前往 DeepSeek。'; emit('configChanged'); }
  catch { note.value = '移除失败，请重试。'; } finally { busy.value = false; }
}
</script>
<template>
  <div class="settings-overlay" @click.self="!busy && emit('close')" @keydown.esc.stop="!busy && emit('close')">
    <section class="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="ai-settings-title">
      <aside class="nav"><div class="nav-heading"><span>✦</span><div><strong>AI 工作台</strong><small>服务与连接设置</small></div></div><p>服务提供商</p><button type="button" :disabled="busy" :class="{selected:tab==='deepseek'}" @click="tab='deepseek'"><span class="provider-icon">D</span> DeepSeek <i>API</i></button><button type="button" :disabled="busy" :class="{selected:tab==='multica'}" @click="tab='multica'"><span class="provider-icon multica">✦</span> Multica <i>工作区</i></button><small class="nav-foot">后续将支持更多厂商</small></aside>
      <main><header><div><small>服务设置 / {{ tab === 'deepseek' ? 'DeepSeek' : 'Multica' }}</small><h2 id="ai-settings-title">{{ tab === 'deepseek' ? 'DeepSeek API' : 'Multica 连接' }}</h2></div><button class="close" type="button" :disabled="busy" aria-label="关闭设置" @click="emit('close')">✕</button></header>
        <template v-if="tab === 'deepseek'">
          <p class="intro">使用自己的 API Key 直接连接 DeepSeek。对话独立于 Multica，不具备文件或命令操作能力。</p>
          <div class="status" :class="{ready:configured}"><span></span>{{ configured ? '已在本机保存 Key' : '尚未配置 Key' }}</div>
          <section class="form-card"><label for="byok-key">API Key</label><input id="byok-key" v-model="key" type="password" autocomplete="off" :disabled="busy" :placeholder="configured ? '已保存；留空保留现有 Key' : '输入 DeepSeek API Key'" @input="models=[]; model=''" /><p>Key 仅保存在此浏览器扩展的本地存储，不进入普通同步备份；它并非硬件安全存储，请像密码一样保护。</p>
            <label for="byok-model">默认模型</label><div class="model-row"><select id="byok-model" v-model="model" :disabled="busy || !models.length"><option v-if="!models.length" value="">请先获取模型列表</option><option v-for="item in models" :key="item" :value="item">{{ item }}</option></select><button type="button" :disabled="busy || (!configured && !key.trim())" @click="discover">{{ busy ? '获取中…' : '获取模型' }}</button></div><p>从 DeepSeek 官方接口获取；不支持的模型可刷新列表。</p>
            <div class="actions"><button class="primary" type="button" :disabled="busy || (!configured && !key.trim()) || !models.includes(model)" @click="save">保存设置</button><button v-if="configured" type="button" :disabled="busy" @click="remove">移除本机 Key</button></div>
          </section>
          <div class="info">发送消息将由 DeepSeek 按 API 价格计费。对话内容会发送给 DeepSeek；聊天记录仅保存在本机。<a href="https://api-docs.deepseek.com/quick_start/pricing" target="_blank" rel="noreferrer">查看官方价格 ↗</a></div>
          <p v-if="note" class="note" role="status">{{ note }}</p>
        </template>
        <MulticaSettings v-else @connection-changed="emit('connectionChanged')" @busy-changed="busy=$event; emit('busyChanged',$event)" />
      </main>
    </section>
  </div>
</template>
<style scoped>
.settings-overlay{position:absolute;inset:0;z-index:50;display:grid;place-items:center;padding:20px;background:rgba(15,23,42,.35)}.settings-dialog{display:flex;width:min(760px,100%);height:min(620px,100%);min-height:0;overflow:hidden;border:1px solid var(--border,#e4e9f1);border-radius:18px;background:var(--panel,#fff);box-shadow:0 22px 70px #0f172a40;color:var(--text,#26334b)}.nav{width:190px;flex:none;padding:22px 14px;display:flex;flex-direction:column;gap:6px;background:var(--surface,#f7f8fb);border-right:1px solid var(--border,#e4e9f1)}.nav-heading{display:flex;gap:10px;align-items:center;margin:0 4px 18px}.nav-heading>span{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#786de6;color:#fff;font-size:20px}.nav-heading strong,.nav-heading small{display:block}.nav-heading small,.nav-foot{color:var(--muted,#94a3b8);font-size:10px}.nav p{margin:0 8px 5px;color:var(--muted,#94a3b8);font-size:11px}.nav button{display:flex;align-items:center;gap:9px;padding:9px 8px;border:0;border-radius:9px;text-align:left;background:transparent;color:inherit;cursor:pointer}.nav button.selected{background:rgba(115,103,228,.12);color:#7569df;font-weight:650}.provider-icon{display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#477bf0;color:#fff;font-weight:700}.provider-icon.multica{background:#8877e9}.nav i{margin-left:auto;font-style:normal;font-size:10px;color:var(--muted,#94a3b8)}.nav-foot{margin:auto 8px 0}.settings-dialog main{flex:1;min-width:0;overflow:auto;padding:28px 30px}.settings-dialog header{display:flex;justify-content:space-between;align-items:flex-start}.settings-dialog header small{font-size:11px;color:var(--muted,#94a3b8)}h2{margin:5px 0 0;font-size:22px}.close{border:0;background:transparent;color:var(--muted,#64748b);font-size:18px;cursor:pointer}.intro{margin:16px 0;color:var(--muted,#64748b);line-height:1.7;font-size:13px}.status{font-size:12px;color:#9a6b20;margin:16px 0}.status span{display:inline-block;width:7px;height:7px;margin-right:6px;border-radius:50%;background:#e8a737}.status.ready{color:#12865b}.status.ready span{background:#27ad79}.form-card{display:flex;flex-direction:column;gap:8px;padding:18px;border:1px solid var(--border,#e4e9f1);border-radius:12px;background:var(--surface,#fafbfc)}label{font-size:12px;font-weight:650}input,select{width:100%;box-sizing:border-box;border:1px solid var(--border,#dce3ed);border-radius:8px;padding:10px;color:var(--text,#26334b);background:var(--panel,#fff);font:inherit}input:focus{outline:2px solid #aaa2f4;outline-offset:1px}.form-card p{margin:0 0 9px;color:var(--muted,#8492a8);font-size:11px;line-height:1.6}.model-row{display:flex;gap:8px}.model-row select{flex:1;min-width:0}.model-row button{flex:none;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);padding:8px;cursor:pointer}.actions{display:flex;gap:8px;flex-wrap:wrap}.actions button{padding:9px 13px;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);cursor:pointer}.actions .primary{background:#7569e7;color:white;border-color:#7569e7}button:disabled{opacity:.5;cursor:not-allowed}.info{margin-top:16px;padding:12px;border-radius:10px;background:rgba(115,103,228,.07);color:var(--muted,#64748b);font-size:11px;line-height:1.7}.info a{display:block;color:#7569df}.note{font-size:12px;color:var(--muted,#64748b)}@media(max-width:620px){.nav{width:125px;padding:16px 8px}.nav-heading small,.nav i{display:none}.settings-dialog main{padding:20px 16px}.nav-heading{gap:5px}}
</style>
