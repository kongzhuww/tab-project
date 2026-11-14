<script setup lang="ts">
import { onMounted, ref } from "vue";
import { multicaService, type MulticaWorkspace, type MulticaRuntime, type MulticaAgent } from "../services/multica.service";
const emit = defineEmits<{ connectionChanged: []; busyChanged: [busy: boolean] }>();
const initializing = ref(true);
const token = ref("");
const workspaces = ref<MulticaWorkspace[]>([]);
const workspaceId = ref("");
const runtimes = ref<MulticaRuntime[]>([]);
const agents = ref<MulticaAgent[]>([]);
const connected = ref(false);
const busy = ref(false);
const message = ref("");
async function run(action: () => Promise<void>, lockClose = false) {
  if (busy.value) return;
  busy.value = true; if (lockClose) emit('busyChanged', true); message.value = "";
  try { await action(); } catch (error) { message.value = error instanceof Error ? error.message : "操作失败"; }
  finally { busy.value = false; if (lockClose) emit('busyChanged', false); }
}
async function discover() {
  await run(async () => {
    workspaces.value = await multicaService.workspaces(token.value);
    workspaceId.value = workspaces.value[0]?.id || "";
    if (!workspaceId.value) message.value = "该账号没有可用工作区";
  });
}
async function refresh() {
  const info = await multicaService.info();
  workspaceId.value = info.workspaceId;
  runtimes.value = info.runtimes;
  agents.value = info.agents.filter(a => !a.archived_at);
  connected.value = true;
}
async function connect() {
  await run(async () => {
    await multicaService.connect(token.value, workspaceId.value);
    token.value = ""; workspaces.value = [];
    connected.value = true;
    emit('connectionChanged');
    emit('busyChanged', false);
    await refresh();
    message.value = "已连接 Multica";
  }, true);
}
async function disconnect() {
  await run(async () => {
    await multicaService.disconnect();
    connected.value = false; runtimes.value = []; agents.value = []; workspaceId.value = ""; token.value = "";
    emit('connectionChanged');
    message.value = "已断开；如需吊销令牌，请在 Multica 设置中操作。";
  }, true);
}
onMounted(() => { void run(async () => { if (await multicaService.isConnected()) { connected.value = true; await refresh(); } }).finally(() => { initializing.value = false; }); });
</script>
<template>
  <div class="multica-settings">
    <p>连接 Multica 云端后，可以查看运行时，并将 AI Hot 文章派给智能体。</p>
    <p class="note">个人访问令牌拥有账号权限。连接后保存在本机扩展存储中，重启后可继续使用；请勿分享给他人。旧会话会尝试迁移，如仍需登录请重新连接一次。</p>
    <p v-if="initializing" role="status">正在读取连接状态…</p>
    <template v-else-if="!connected">
      <label for="multica-token">Multica 个人访问令牌</label>
      <input id="multica-token" v-model="token" type="password" autocomplete="off" placeholder="在 Multica 设置 → API Token 创建" />
      <button type="button" :disabled="busy || !token.trim()" @click="discover">读取工作区</button>
      <template v-if="workspaces.length">
        <label for="multica-workspace">选择工作区</label>
        <select id="multica-workspace" v-model="workspaceId">
          <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">{{ workspace.name || workspace.slug || workspace.id }}</option>
        </select>
        <button type="button" :disabled="busy || !workspaceId" @click="connect">连接</button>
      </template>
    </template>
    <template v-else>
      <div class="actions"><strong>● 已连接</strong><button type="button" :disabled="busy" @click="run(refresh)">刷新</button><button type="button" :disabled="busy" @click="disconnect">断开</button></div>
      <h3>运行时</h3>
      <p v-if="!runtimes.length">没有可显示的运行时。</p>
      <div v-for="runtime in runtimes" :key="runtime.id" class="row">
        <span><strong>{{ runtime.name }}</strong><small>{{ runtime.provider || runtime.device_info }}</small></span>
        <span :class="runtime.status === 'online' ? 'online' : 'offline'">{{ runtime.status === 'online' ? '在线' : '离线' }}</span>
      </div>
      <h3>智能体</h3>
      <p v-if="!agents.length">没有可用的智能体。</p>
      <div v-for="agent in agents" :key="agent.id" class="row"><span><strong>{{ agent.name }}</strong><small>{{ agent.model || '默认模型' }}</small></span><span>{{ runtimes.find(r => r.id === agent.runtime_id)?.name || '未绑定运行时' }}</span></div>
    </template>
    <p v-if="message" role="status" class="note">{{ message }}</p>
  </div>
</template>
<style scoped>
.multica-settings { display:flex; flex-direction:column; gap:10px; max-width:720px; font-size:13px; }
.multica-settings p { margin:0; line-height:1.6; }
.note { color:var(--muted,#64748b); }
input,select { width:100%; box-sizing:border-box; padding:9px; color:var(--text,#222); background:var(--surface,#fff); border:1px solid var(--border,#ddd); border-radius:7px; }
button { align-self:flex-start; padding:7px 13px; cursor:pointer; color:var(--text,#222); background:var(--surface,#fff); border:1px solid var(--border,#ddd); border-radius:7px; }
button:disabled { opacity:.5; cursor:not-allowed; }
.actions { display:flex; align-items:center; gap:10px; }.actions strong,.online { color:#16a36a; }.offline { color:var(--muted,#777); }
h3 { margin:12px 0 0; font-size:14px; }.row { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:10px; border:1px solid var(--border,#ddd); border-radius:8px; }.row small { display:block; color:var(--muted,#777); margin-top:3px; }
</style>
