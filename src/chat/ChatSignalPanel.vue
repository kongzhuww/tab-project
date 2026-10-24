<script setup lang="ts">
import { ref, watch } from "vue";
import { chatModuleState as state } from "./chat-state";
import { signalState, previewSignalInvite, joinSignalInvite, createSignalRoom, createSignalMember, revokeSignalMember, restartSignal } from "./chat-signal-client";
const input = ref("");
const preview = ref("");
const origin = ref("");
const createKey = ref("");
const roomName = ref("");
const memberUid = ref("");
const memberName = ref("");
const invite = ref("");
const revokeId = ref("");
const busy = ref(false);
const notice = ref("");
let generation = 0;
watch(() => state.serverUrl, () => { generation++; input.value = preview.value = invite.value = revokeId.value = createKey.value = notice.value = ""; });
watch(input, () => { preview.value = ""; });
async function run(action: () => Promise<void>) {
  if (busy.value) return;
  busy.value = true; notice.value = "";
  try { await action(); }
  catch (e) { notice.value = e instanceof Error && !/https?:|wss?:|auth\./.test(e.message) ? e.message : "操作未确认，请检查信令状态；不要重复创建"; }
  finally { busy.value = false; createKey.value = ""; }
}
function inspect() {
  try {
    const c = previewSignalInvite(input.value.trim());
    preview.value = `服务器：${new URL(c.endpoint).host}；绑定 UID：${c.uid}。确认信任该服务后加入；它能看到成员和连接信息，但不转发聊天。`;
  } catch { notice.value = "邀请格式无效，请重新复制完整信令邀请"; }
}
async function join() { await joinSignalInvite(input.value.trim()); input.value = preview.value = ""; }
async function create() { await createSignalRoom(origin.value.trim(), createKey.value, roomName.value.trim()); }
async function add() {
  const current = generation;
  const value = await createSignalMember(memberUid.value.trim(), memberName.value.trim());
  if (current !== generation) return;
  invite.value = value;
  notice.value = "已生成绑定该 UID 的 30 天邀请。请复制私发；关闭此面板后无法再次查看。";
}
async function copy() {
  await navigator.clipboard.writeText(invite.value);
  notice.value = "邀请已复制，含成员访问凭证，请勿公开";
}
async function revoke() { await revokeSignalMember(revokeId.value); revokeId.value = ""; notice.value = "撤销请求已完成；成员连接及 P2P 权限将更新"; }
</script>
<template>
  <section class="signal-panel">
    <strong>自动连线与持久群成员（Cloudflare 信令）</strong>
    <p role="status">{{ signalState.status }}</p>
    <small>本机 UID：{{ state.currentUser.uid }}。首次邀请需告诉群主此 UID。信令服务需自行部署；未配置时不会访问任何新增服务。直连失败不自动中转。</small>
    <button v-if="signalState.enabled" type="button" :disabled="busy" @click="restartSignal">重试自动连线</button>
    <label>成员邀请<input v-model="input" type="password" autocomplete="off" placeholder="BEAVER-SIGNAL1:…" /></label>
    <button type="button" :disabled="busy || !input" @click="inspect">预览邀请（不联网）</button>
    <div v-if="preview"><p>{{ preview }}</p><button type="button" :disabled="busy" @click="run(join)">确认加入并保存本机凭证</button></div>
    <details>
      <summary>服主：在已部署的信令服务上创建群</summary>
      <small>此操作会在指定服务创建持久群。创建密钥仅用于本次请求，不保存；成员凭证保存在本机 IndexedDB，不进入聊天记录或历史导出。</small>
      <label>HTTPS 服务根地址<input v-model="origin" placeholder="https://你的信令域名" /></label>
      <label>服务创建密钥<input v-model="createKey" type="password" autocomplete="off" /></label>
      <label>群名称<input v-model="roomName" maxlength="80" /></label>
      <button type="button" :disabled="busy || !origin || !createKey || !roomName.trim()" @click="run(create)">在此服务创建并加入</button>
    </details>
    <template v-if="signalState.connected && signalState.role === 'owner'">
      <label>朋友 UID<input v-model="memberUid" maxlength="160" /></label>
      <label>朋友备注<input v-model="memberName" maxlength="80" /></label>
      <button type="button" :disabled="busy || !memberUid || !memberName.trim()" @click="run(add)">创建 30 天成员邀请</button>
      <button v-if="invite" type="button" :disabled="busy" @click="run(copy)">复制刚生成的邀请</button>
    </template>
    <small v-if="signalState.enabled && !signalState.connected">离线显示上次成员缓存，不作为当前授权依据；信令恢复前不会建立直连或补发。</small>
    <ul v-if="signalState.enabled">
      <li v-for="m in signalState.members" :key="m.id">
        <span>{{ m.name }} · {{ m.role === 'owner' ? '群主' : '成员' }} · {{ m.online ? '信令在线（不等于直连成功）' : '离线' }}</span>
        <template v-if="signalState.role === 'owner' && m.role !== 'owner'">
          <button v-if="revokeId !== m.id" type="button" :disabled="busy" @click="revokeId = m.id">撤销成员</button>
          <template v-else><button type="button" :disabled="busy" @click="run(revoke)">确认撤销并断开</button><button type="button" @click="revokeId = ''">取消</button></template>
        </template>
      </li>
    </ul>
    <p v-if="notice" role="status">{{ notice }}</p>
  </section>
</template>
<style scoped>
.signal-panel { display: flex; flex-direction: column; gap: 8px; color: var(--text); border-top: 1px solid var(--border); padding-top: 12px; }
.signal-panel p { margin: 0; overflow-wrap: anywhere; }
.signal-panel small { color: var(--muted); line-height: 1.5; overflow-wrap: anywhere; }
.signal-panel label { display: flex; flex-direction: column; gap: 4px; margin-top: 6px; }
.signal-panel input, .signal-panel button { background: var(--panel); color: var(--text); border: 1px solid var(--border); border-radius: 6px; padding: 6px 8px; font: inherit; min-width: 0; }
.signal-panel button { cursor: pointer; }
.signal-panel button:disabled { opacity: .5; cursor: not-allowed; }
.signal-panel ul { margin: 0; padding: 0; list-style: none; max-height: 220px; overflow: auto; }
.signal-panel li { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin: 6px 0; }
.signal-panel li span { flex: 1; overflow-wrap: anywhere; }
</style>
