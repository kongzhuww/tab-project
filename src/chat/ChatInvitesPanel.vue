<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { serverUrl } from "./chat-security";
const props = defineProps<{ connection: string }>();
const emit = defineEmits<{ join: [url: string] }>();
interface Member { id: string; name: string; expiresAt: number; revoked: boolean }
const input = ref("");
const candidate = ref("");
const host = ref("");
const members = ref<Member[]>([]);
const manager = ref(false);
const name = ref("");
const days = ref(0);
const invitation = ref("");
const busy = ref(false);
const status = ref("");
const confirmRevoke = ref("");
let controller: AbortController | undefined;
function clear() { controller?.abort(); controller = undefined; busy.value = false; invitation.value = ""; manager.value = false; members.value = []; status.value = ""; }
watch(() => props.connection, clear);
onBeforeUnmount(clear);
watch(input, () => { candidate.value = ""; host.value = ""; });
function preview() {
  try {
    const code = input.value.trim();
    if (!code.startsWith("BEAVER1:") || code.length > 8000) throw new Error();
    const data = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(code.slice(8)), c => c.charCodeAt(0))));
    const target = new URL(serverUrl(data.server));
    if (target.search || target.pathname !== "/ws" || typeof data.token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(data.token)) throw new Error();
    host.value = target.host;
    target.searchParams.set("token", data.token);
    candidate.value = target.href;
    status.value = "确认是朋友的服务器后再加入。加入会切换当前聊天室。";
  } catch { status.value = "邀请格式无效，请让朋友重新复制完整邀请。"; }
}
function join() { if (!candidate.value) return; const url = candidate.value; candidate.value = ""; input.value = ""; host.value = ""; emit("join", url); }
function connection() {
  const url = new URL(serverUrl(props.connection));
  const token = url.searchParams.get("token");
  if (!token || url.pathname !== "/ws") throw new Error("请先配置并连接你的聊天服务器");
  url.search = "";
  return { url, token };
}
async function request(method: string, suffix = "", body?: unknown) {
  const { url, token } = connection();
  url.protocol = url.protocol === "wss:" ? "https:" : "http:";
  url.pathname = "/chat-admin/invites" + suffix;
  controller = new AbortController();
  const signal = controller.signal;
  const timeout = setTimeout(() => controller?.abort(), 15000);
  try {
    const response = await fetch(url.href, { method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body), signal, redirect: "error", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
    if (!response.ok) throw new Error(response.status === 403 ? "只有服主能管理邀请，普通成员请使用“粘贴邀请加入”。" : `服务器未完成操作（${response.status}），请刷新列表确认后再试。`);
    const text = await response.text();
    if (text.length > 65536) throw new Error("服务器返回内容过大");
    const result = JSON.parse(text);
    if (signal.aborted) throw new Error("操作已取消");
    return result;
  } finally { clearTimeout(timeout); }
}
async function run(action: () => Promise<void>) {
  if (busy.value) return;
  busy.value = true; status.value = "";
  try { await action(); } catch (error) {
    status.value = error instanceof Error && /^(只有服主|服务器未完成|请先配置|服务器返回|操作已取消)/.test(error.message) ? error.message : "操作未确认，请刷新邀请列表；不要重复创建。";
  } finally { busy.value = false; }
}
async function load() {
  const data = await request("GET");
  if (!Array.isArray(data.members) || data.members.length > 1000) throw new Error();
  members.value = data.members.filter((m: Member) => m && /^[a-f0-9]{32}$/.test(m.id) && typeof m.name === "string" && typeof m.expiresAt === "number");
  manager.value = true;
}
function encode(server: string, token: string) { return "BEAVER1:" + btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify({ server, token })))); }
async function create() {
  await run(async () => {
    invitation.value = "";
    const { url } = connection();
    const data = await request("POST", "", { name: name.value.trim(), days: days.value });
    if (typeof data.token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(data.token)) throw new Error();
    invitation.value = encode(url.href, data.token);
    status.value = "邀请已生成，请点击复制并私发给对应朋友。关闭面板后不能再次查看，可撤销后重新创建。";
    await load();
  });
}
async function copy() {
  try { await navigator.clipboard.writeText(invitation.value); status.value = "邀请已复制，请私发给朋友，不要公开。"; }
  catch { status.value = "剪贴板写入失败，请保持此面板打开后重试。"; }
}
async function revoke(id: string) {
  await run(async () => { await request("DELETE", "/" + id); confirmRevoke.value = ""; invitation.value = ""; await load(); status.value = "该邀请已撤销，对应连接已断开。"; });
}
</script>

<template>
  <section class="chat-invites">
    <strong>邀请朋友 / 加入聊天室</strong>
    <small>这是同一个群聊，不是私聊。每个邀请独立，可单独撤销；邀请在有效期内可重复使用，请勿转发。</small>
    <label>朋友发来的邀请<input v-model="input" type="password" autocomplete="off" class="invite-input" placeholder="粘贴 BEAVER1: 开头的完整邀请" /></label>
    <button type="button" :disabled="!input.trim()" @click="preview">查看邀请</button>
    <div v-if="candidate" class="invite-preview">目标服务器：{{ host }}<button type="button" @click="join">加入此聊天室</button></div>
    <div class="invites-manager-trigger">
      <button type="button" class="btn-manage-invites" :disabled="busy || !connection" @click="run(load)">
        👑 {{ manager ? '刷新我的邀请列表' : '我是服主：管理与创建邀请' }}
      </button>
    </div>
    <template v-if="manager">
      <label>朋友备注<input v-model="name" maxlength="40" class="invite-input" placeholder="例如：小明" /></label>
      <label>访问有效期<select v-model.number="days"><option :value="0">永久有效（随时可手动撤销）</option><option :value="7">7 天</option><option :value="30">30 天</option><option :value="90">90 天</option></select></label>
      <button type="button" :disabled="busy || !name.trim()" @click="create">创建独立邀请</button>
      <button v-if="invitation" type="button" @click="copy">复制刚创建的邀请</button>
      <ul>
        <li v-for="member in members" :key="member.id">
          <span>{{ member.name }} · {{ member.revoked ? '已撤销' : member.expiresAt === 0 ? '永久有效' : member.expiresAt <= Date.now() ? '已过期' : '有效至 ' + new Date(member.expiresAt).toLocaleDateString() }}</span>
          <template v-if="!member.revoked && (member.expiresAt === 0 || member.expiresAt > Date.now())">
            <button v-if="confirmRevoke !== member.id" type="button" :disabled="busy" @click="confirmRevoke = member.id">撤销</button>
            <template v-else><button type="button" :disabled="busy" @click="revoke(member.id)">确认撤销并断开</button><button type="button" @click="confirmRevoke = ''">取消</button></template>
          </template>
        </li>
      </ul>
    </template>
    <p v-if="status" role="status">{{ status }}</p>
  </section>
</template>

<style scoped>
.chat-invites { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--border); padding-top: 12px; color: var(--text); }
.chat-invites small { color: var(--muted); line-height: 1.5; }
.chat-invites label { display: flex; flex-direction: column; gap: 5px; }
.chat-invites button, .invite-input, .chat-invites select { border: 1px solid var(--border); border-radius: 8px; background: var(--panel); color: var(--text); font: inherit; padding: 7px 10px; min-width: 0; box-sizing: border-box; }
.chat-invites button { cursor: pointer; }
.chat-invites button:disabled { opacity: .5; cursor: not-allowed; }
.chat-invites ul { padding: 0; margin: 0; max-height: 220px; overflow: auto; list-style: none; }
.chat-invites li { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.chat-invites li span { flex: 1; overflow-wrap: anywhere; }
.invite-preview, .chat-invites p { overflow-wrap: anywhere; font-size: 12px; }
</style>
