<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { webdavVault } from '../services/webdav-vault';
import { autoSyncEnabled, setAutoSyncEnabled } from '../services/webdav-baseline';
const props = defineProps<{ webdavPassword?: string; disabled?: boolean }>();
const emit = defineEmits<{ changed: [] }>();
const password = ref(''), confirmation = ref(''), remember = ref(true), configured = ref(false), autoSync = ref(true), ready = ref(false), busy = ref(false), message = ref('');
async function refresh() { try { configured.value = Boolean(await webdavVault.get()); autoSync.value = configured.value ? await autoSyncEnabled() : true; ready.value = true; } catch { message.value = '无法读取本机口令状态，请检查浏览器存储。'; } }
async function save() {
  if (busy.value || props.disabled || !ready.value) return;
  if (password.value.length < 8) { message.value = '备份口令至少需要 8 个字符。'; return; }
  if (password.value !== confirmation.value) { message.value = '两次输入的备份口令不一致。'; return; }
  if (props.webdavPassword && password.value === props.webdavPassword) { message.value = '备份口令需与 WebDAV 应用密码不同。'; return; }
  if (configured.value && !window.confirm('替换本机已记住的备份口令？这不会修改云端加密口令；若新口令不同，仍需原口令才能读取旧备份。')) return;
  busy.value = true; message.value = '';
  try { await webdavVault.remember(password.value, remember.value); await setAutoSyncEnabled(autoSync.value); password.value = ''; confirmation.value = ''; configured.value = true; message.value = '口令已保存；云端同步时才会验证。请先手动上传或恢复一次以建立自动同步基准。'; emit('changed'); }
  catch { message.value = '口令保存未确认，请检查浏览器存储后重试。'; }
  finally { busy.value = false; }
}
async function forget() {
  if (busy.value || props.disabled) return;
  if (!window.confirm('只清除本设备记住的备份口令，不删除本机登录或云端文件。忘记口令后旧加密备份无法解密；要重新开始请使用新的备份文件名。确认吗？')) return;
  busy.value = true; message.value = '';
  try { await setAutoSyncEnabled(false); await webdavVault.forget(); autoSync.value = false; configured.value = false; password.value = ''; confirmation.value = ''; message.value = '已忘记本机口令；现有账号和云端备份未修改。'; emit('changed'); }
  catch { message.value = '清除未确认，请检查浏览器存储后重试。'; }
  finally { busy.value = false; }
}
async function updateAuto() {
  if (!ready.value || busy.value || props.disabled || !configured.value) return;
  busy.value = true;
  try { await setAutoSyncEnabled(autoSync.value); message.value = autoSync.value ? '已开启启动时自动同步；需先手动同步建立基准。' : '已关闭自动同步。'; }
  catch { autoSync.value = !autoSync.value; message.value = '自动同步设置未确认，请重试。'; }
  finally { busy.value = false; }
}
onMounted(() => void refresh());
</script>
<template>
  <section class="vault-settings" aria-label="备份加密"><strong>🔐 WebDAV 备份加密</strong><p>上传前在本机加密整个备份；新设备先输入相同口令。忘记口令将无法解密旧备份。</p><p class="status">{{ !ready ? (message ? '口令状态不可用' : '正在读取口令状态…') : configured ? '本机已有备份口令' : '本机尚未设置备份口令' }}</p><div class="inputs"><input v-model="password" :disabled="busy || disabled" type="password" autocomplete="new-password" placeholder="独立备份口令（至少 8 位）" aria-label="备份口令" /><input v-model="confirmation" :disabled="busy || disabled" type="password" autocomplete="new-password" placeholder="再次输入备份口令" aria-label="确认备份口令" /></div><label class="vault-option"><input v-model="remember" type="checkbox" :disabled="busy || disabled" /><span>在这台设备上记住口令（重启后仍可用）</span></label><label class="vault-option"><input v-model="autoSync" type="checkbox" :disabled="busy || disabled || !ready" @change="updateAuto" /><span>启动时自动同步；出现冲突时暂停并提示</span></label><small>建议使用至少 12 位、且不与其他服务共用的口令。勾选后口令保存在本机扩展存储中，不是系统钥匙串；不勾选则浏览器退出后清除。口令不会上传至 WebDAV。加密备份不保护 HTTP 连接中传输的 WebDAV 登录密码，请使用 HTTPS。请先更新所有同步设备，旧版插件可能把备份以明文覆盖；云端历史版本也可能保留旧明文。提示词、文章及分类已纳入加密备份。恢复前请更新所有设备并刷新所有旧标签页；冲突时同步会暂停，请继续单独导出备份。</small><div class="actions"><button v-if="!ready && message" type="button" :disabled="busy || disabled" @click="message=''; refresh()">重试读取</button><button type="button" :disabled="busy || disabled || !ready" @click="save">保存 / 输入备份口令</button><button v-if="configured" type="button" :disabled="busy || disabled" @click="forget">忘记本机口令</button></div><p v-if="message" role="status">{{ message }}</p></section>
</template>
<style scoped>
.vault-settings { display:flex; flex-direction:column; gap:8px; padding:12px; border:1px solid var(--border,#dfe5ed); border-radius:8px; background:var(--panel,#fff); font-size:12px; }.vault-settings p { margin:0; line-height:1.5; color:var(--muted,#64748b); }.vault-settings .status { color:var(--text,#34445c); }.inputs { display:flex; flex-wrap:wrap; gap:8px; }.inputs input { flex:1; min-width:150px; box-sizing:border-box; padding:7px 9px; border:1px solid var(--border,#dfe5ed); border-radius:6px; background:var(--surface,#fff); color:var(--text,#222); font:inherit; }.vault-settings .vault-option { display:flex; justify-content:flex-start; align-items:center; gap:8px; margin:0; text-align:left; } .vault-settings .vault-option input { flex:none; margin:0; }.vault-settings small { font-size:10px; line-height:1.5; color:var(--muted,#64748b); }.actions { display:flex; gap:8px; flex-wrap:wrap; }.actions button { cursor:pointer; padding:6px 9px; border:1px solid var(--border,#dfe5ed); border-radius:6px; background:var(--surface,#fff); color:var(--text,#222); font:inherit; }.actions button:disabled { opacity:.5; cursor:not-allowed; }
</style>
