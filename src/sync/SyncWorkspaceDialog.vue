<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, toRef, watch } from "vue";
import AppWindowFrame from "../core/AppWindowFrame.vue";
import { windowManagerController } from "../core/window-manager.store";
import { syncModuleState } from "./module-state";
import { webDavService } from "../services/webdav.service";
import { syncService } from "../services/sync.service";
import { loadWebDavSettings, saveWebDavSettings, toWebDavConfig, WEBDAV_SETTINGS_KEYS, type WebDavSettings } from "./settings";
const draft = reactive<WebDavSettings>({ webdavUrl: "", webdavUsername: "", webdavPassword: "", webdavFilename: "" });
const initial = ref<WebDavSettings>({ ...draft });
const ready = ref(false);
const busy = toRef(syncModuleState, "busy");
let disposed = false;
onUnmounted(() => { disposed = true; });
const message = ref("");
type Operation = "webdav-push" | "webdav-pull" | "cloud-push" | "cloud-pull";
const pending = ref<Operation | null>(null);
watch(() => syncModuleState.visible, visible => { if (!visible) pending.value = null; }, { flush: "sync" });
const restorePending = computed(() => pending.value?.endsWith("pull"));
const dirty = computed(() => WEBDAV_SETTINGS_KEYS.some(key => draft[key] !== initial.value[key]));
async function load() {
  ready.value = false;
  const settings = await loadWebDavSettings();
  if (disposed) return;
  initial.value = settings;
  Object.assign(draft, initial.value);
  ready.value = true;
}
onMounted(() => { void load().catch(() => { if (!disposed) message.value = "配置读取失败，已禁用操作。请退出同步模块后重试。"; }); });
async function save() {
  if (!ready.value || busy.value) return;
  busy.value = true;
  pending.value = null;
  try {
    await saveWebDavSettings(draft, initial.value);
    await load();
    message.value = "连接设置已保存，没有上传或恢复任何备份。";
  } catch { message.value = "保存或重读失败，请检查服务器地址、文件名；退出模块后重读确认。"; }
  finally { busy.value = false; }
}
async function test() {
  if (!ready.value || busy.value) return;
  if (dirty.value) { message.value = "请先保存连接设置，再测试已保存的配置。"; return; }
  busy.value = true;
  pending.value = null;
  try {
    const result = await webDavService.testConnection(toWebDavConfig(await loadWebDavSettings()));
    message.value = result.ok ? "WebDAV 连通性测试成功。" : "WebDAV 连通性测试失败，请检查服务器与凭据。";
  } catch { message.value = "连通性测试失败，未上传或恢复配置。"; }
  finally { busy.value = false; }
}
function request(operation: Operation) {
  if (!ready.value || busy.value) return;
  if (dirty.value) { message.value = "请先保存连接设置，再发起备份或恢复。"; return; }
  pending.value = operation;
}
async function confirmOperation() {
  const operation = pending.value;
  if (!operation || !ready.value || busy.value) return;
  if (dirty.value) { pending.value = null; message.value = "连接配置已更改，请保存后重新发起操作。"; return; }
  pending.value = null;
  busy.value = true;
  try {
    const stored = operation.startsWith("webdav") ? await loadWebDavSettings() : null;
    if (stored && WEBDAV_SETTINGS_KEYS.some(key => stored[key] !== initial.value[key])) {
      await load();
      message.value = "连接配置已被其他页面修改，已重新读取。请核对目标并重新确认操作。";
      return;
    }
    const result = operation === "cloud-push" ? await syncService.pushConfig()
      : operation === "cloud-pull" ? await syncService.pullConfig()
      : operation === "webdav-push" ? await webDavService.pushCurrentConfig(toWebDavConfig(stored!))
      : await webDavService.pullCurrentConfig(toWebDavConfig(stored!));
    if (!result.ok) { message.value = result.errorKind === "policy" ? result.error || "备份校验失败，操作已取消。" : "同步失败，请检查连接或实际写入结果。未自动重试。"; return; }
    if (operation.endsWith("pull")) {
      await load();
      message.value = `已恢复 ${result.restoredCount || 0} 项普通配置，本机账号、凭据和连接设置未被恢复覆盖。请手动刷新已打开页面；此处不会自动重载。`;
    } else { message.value = "普通备份已上传，不包含模块账号、凭据和服务连接配置。"; }
  } catch { message.value = "同步或重新读取异常，请检查实际结果。为避免重复写入，未自动重试。"; }
  finally { busy.value = false; }
}
function close() { void windowManagerController.close("sync"); }
</script>
<template>
  <AppWindowFrame window-id="sync" title="同步模块" icon="☁️" :visible="syncModuleState.visible" :default-width="540" :default-height="580" :min-width="360" :min-height="360" custom-class="sync-workspace" @close="close" @minimize="close">
    <div class="sync-content">
      <p>关闭/最小化只隐藏窗口并保留草稿，不撤销已发送的任务。Dock 退出/重载会丢弃未保存草稿；保存、测试或同步进行中只能隐藏，不能退出/重载。</p>
      <p>WebDAV 凭据只用于连接，不放入普通备份。使用 HTTPS；HTTP 会明文传输认证信息。</p>
      <fieldset :disabled="!ready || busy">
        <form @submit.prevent="save">
          <label>WebDAV 服务器地址<input v-model="draft.webdavUrl" type="url" autocomplete="off" /></label>
          <label>账户名<input v-model="draft.webdavUsername" type="text" autocomplete="off" /></label>
          <label>应用专用密码<input v-model="draft.webdavPassword" type="password" autocomplete="off" /></label>
          <label>备份文件名<input v-model="draft.webdavFilename" type="text" /></label>
          <div class="actions"><button type="submit">保存连接设置</button><button type="button" @click="test">测试 WebDAV</button></div>
        </form>
        <h3>WebDAV 备份</h3>
        <div class="actions"><button type="button" @click="request('webdav-push')">上传备份</button><button type="button" @click="request('webdav-pull')">恢复备份</button></div>
        <h3>私有云中枢 / Native Host</h3>
        <div class="actions"><button type="button" @click="request('cloud-push')">VPS 备份</button><button type="button" @click="request('cloud-pull')">VPS 恢复</button></div>
      </fieldset>
      <p>普通备份只含白名单偏好、布局、常用网站和分组等数据，不读取或导出模块存储中的账号、Token、Cookie、密码或私有服务连接配置；频道及旧 AI 整组配置也不备份。JSON 未加密，书签、备注和头像仍可能涉及隐私或用户手填秘密，不等于匿名脱敏或全部扩展数据镜像。Native Host 有 58 KB 预算。</p>
      <section v-if="pending" class="confirmation" aria-label="同步操作确认">
        <p>{{ restorePending ? '恢复只覆盖白名单中的普通设置与常用网站，不是合并。旧备份中的账号、凭据、服务连接和频道/AI 整组配置将忽略，不会清空现有登录设置。请先备份当前普通数据。' : '上传普通备份会覆盖同名云端文件，不会携带模块连接配置和凭据。若该旧文件曾包含凭据，覆盖后不能从新文件找回；服务端历史版本可能仍保留。请确认目标并妥善保管旧备份。' }}</p>
        <div class="actions"><button type="button" :disabled="busy" @click="confirmOperation">{{ restorePending ? '确认恢复覆盖' : '确认上传' }}</button><button type="button" @click="pending = null">取消</button></div>
      </section>
      <p v-if="message" role="status">{{ message }}</p>
    </div>
  </AppWindowFrame>
</template>
<style scoped>
.sync-content { height:100%; overflow:auto; padding:14px; box-sizing:border-box; }
fieldset { border:0; margin:0; padding:0; min-width:0; }
label { display:block; font-size:12px; margin-bottom:10px; }
input { display:block; width:100%; box-sizing:border-box; padding:8px; margin-top:5px; background:var(--panel); color:var(--text); border:1px solid var(--border); border-radius:6px; }
p { font-size:12px; line-height:1.5; color:var(--muted); } h3 { font-size:13px; }
.actions { display:flex; gap:8px; flex-wrap:wrap; }
button { padding:6px 8px; border:1px solid var(--border); border-radius:6px; background:var(--panel); color:var(--text); cursor:pointer; }
.confirmation { border:1px solid var(--border); padding:10px; margin-top:12px; }
.sync-workspace, :deep(.lw-window-header), :deep(.lw-window-body) { backdrop-filter:none !important; animation:none !important; transition:none !important; }
</style>
