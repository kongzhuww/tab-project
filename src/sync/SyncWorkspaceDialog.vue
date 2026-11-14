<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import AppWindowFrame from "../core/AppWindowFrame.vue";
import { windowManagerController } from "../core/window-manager.store";
import { syncModuleState } from "./module-state";
import { webDavService } from "../services/webdav.service";
import BackupEncryptionSettings from './BackupEncryptionSettings.vue';
import { syncService } from "../services/sync.service";
import { loadWebDavSettings, saveWebDavSettings, toWebDavConfig, WEBDAV_SETTINGS_KEYS, type WebDavSettings } from "./settings";
import { SyncDialogMachine, type SyncOperation } from "./sync-dialog-machine";

const machine = new SyncDialogMachine();
const isReady = ref(machine.isReady);
const isBusy = ref(machine.isBusy);
const message = ref(machine.message);
const pending = ref<SyncOperation | null>(machine.pendingOperation);

const unsubSyncMachine = machine.subscribe(state => {
  isReady.value = machine.isReady;
  isBusy.value = machine.isBusy;
  message.value = state.message;
  pending.value = machine.pendingOperation;
  syncModuleState.busy = machine.isBusy;
});

const draft = reactive<WebDavSettings>({ webdavUrl: "", webdavUsername: "", webdavPassword: "", webdavFilename: "" });
const initial = ref<WebDavSettings>({ ...draft });
let disposed = false;
onUnmounted(() => {
  disposed = true;
  unsubSyncMachine();
  syncModuleState.busy = false;
});

watch(() => syncModuleState.visible, visible => {
  if (!visible && machine.phase === "confirming") {
    machine.send({ type: "CANCEL_CONFIRMATION" });
  }
}, { flush: "sync" });

const restorePending = computed(() => pending.value?.endsWith("pull"));
const dirty = computed(() => WEBDAV_SETTINGS_KEYS.some(key => draft[key] !== initial.value[key]));

async function load() {
  const settings = await loadWebDavSettings();
  if (disposed) return;
  initial.value = settings;
  Object.assign(draft, initial.value);
  machine.send({ type: "INIT_SUCCESS" });
}

onMounted(() => {
  void load().catch(() => {
    if (!disposed) {
      machine.send({ type: "INIT_FAILURE", error: "配置读取失败，已禁用操作。请退出同步模块后重试。" });
    }
  });
});

async function save() {
  if (!isReady.value || isBusy.value) return;
  if (!machine.send({ type: "START_SAVE" })) return;

  try {
    await saveWebDavSettings(draft, initial.value);
    await load();
    machine.send({ type: "OPERATION_COMPLETE", message: "连接设置已保存，没有上传或恢复任何备份。" });
  } catch {
    machine.send({ type: "OPERATION_FAILED", message: "保存或重读失败，请检查服务器地址、文件名；退出模块后重读确认。" });
  }
}

async function test() {
  if (!isReady.value || isBusy.value) return;
  if (dirty.value) {
    machine.send({ type: "SET_MESSAGE", message: "请先保存连接设置，再测试已保存的配置。" });
    return;
  }
  if (!machine.send({ type: "START_TEST" })) return;

  try {
    const result = await webDavService.testConnection(toWebDavConfig(await loadWebDavSettings()));
    const msg = result.ok ? "WebDAV 连通性测试成功。" : "WebDAV 连通性测试失败，请检查服务器与凭据。";
    machine.send({ type: result.ok ? "OPERATION_COMPLETE" : "OPERATION_FAILED", message: msg });
  } catch {
    machine.send({ type: "OPERATION_FAILED", message: "连通性测试失败，未上传或恢复配置。" });
  }
}

function request(operation: SyncOperation) {
  if (!isReady.value || isBusy.value) return;
  if (dirty.value) {
    machine.send({ type: "SET_MESSAGE", message: "请先保存连接设置，再发起备份或恢复。" });
    return;
  }
  machine.send({ type: "REQUEST_OPERATION", operation });
}

function cancelConfirmation() {
  machine.send({ type: "CANCEL_CONFIRMATION" });
}

async function confirmOperation() {
  const op = pending.value;
  if (!op || !isReady.value || isBusy.value) return;
  if (dirty.value) {
    machine.send({ type: "CANCEL_CONFIRMATION" });
    machine.send({ type: "SET_MESSAGE", message: "连接配置已更改，请保存后重新发起操作。" });
    return;
  }

  if (!machine.send({ type: "START_SYNC" })) return;

  try {
    const stored = op.startsWith("webdav") ? await loadWebDavSettings() : null;
    if (stored && WEBDAV_SETTINGS_KEYS.some(key => stored[key] !== initial.value[key])) {
      await load();
      machine.send({ type: "SET_MESSAGE", message: "连接配置已被其他页面修改，已重新读取。请核对目标并重新确认操作。" });
      return;
    }
    const result = op === "cloud-push" ? await syncService.pushConfig()
      : op === "cloud-pull" ? await syncService.pullConfig()
      : op === "webdav-push" ? await webDavService.pushCurrentConfig(toWebDavConfig(stored!))
      : await webDavService.pullCurrentConfig(toWebDavConfig(stored!));

    if (!result.ok) {
      const errorMsg = result.error || '同步失败，请检查连接或实际写入结果。未自动重试。';
      machine.send({ type: "OPERATION_FAILED", message: errorMsg });
      return;
    }

    const credentialResult = 'credentialResult' in result ? result.credentialResult : undefined;
    const baselineWarning = 'baselineRecorded' in result && !result.baselineRecorded ? ' 两端未完全一致或服务器未提供 ETag，自动同步基准未建立。' : '';
    if (op.endsWith("pull")) {
      await load();
      machine.send({
        type: "OPERATION_COMPLETE",
        message: `已恢复 ${result.restoredCount || 0} 项配置；已保留本机已有连接。${credentialResult === 'restored' ? 'Multica 连接已恢复。' : credentialResult === 'kept' ? '已保留本机 Multica 连接。' : ''}请手动刷新已打开页面。${baselineWarning}`
      });
    } else {
      machine.send({
        type: "OPERATION_COMPLETE",
        message: `WebDAV 加密备份已上传。${baselineWarning}`
      });
    }
  } catch {
    machine.send({ type: "OPERATION_FAILED", message: "同步或重新读取异常，请检查实际结果。为避免重复写入，未自动重试。" });
  }
}

function close() { void windowManagerController.close("sync"); }
</script>
<template>
  <AppWindowFrame window-id="sync" title="同步模块" icon="☁️" :visible="syncModuleState.visible" :default-width="540" :default-height="580" :min-width="360" :min-height="360" custom-class="sync-workspace" @close="close" @minimize="close">
    <div class="sync-content">
      <p>关闭/最小化只隐藏窗口并保留草稿，不撤销已发送的任务。Dock 退出/重载会丢弃未保存草稿；保存、测试或同步进行中只能隐藏，不能退出/重载。</p>
      <p>WebDAV 备份在本机加密，可能包含账户凭据。请使用 HTTPS；HTTP 会明文传输 WebDAV 认证信息。</p>
      <fieldset :disabled="!isReady || isBusy">
        <form @submit.prevent="save">
          <label>WebDAV 服务器地址<input v-model="draft.webdavUrl" type="url" autocomplete="off" /></label>
          <label>账户名<input v-model="draft.webdavUsername" type="text" autocomplete="off" /></label>
          <label>应用专用密码<input v-model="draft.webdavPassword" type="password" autocomplete="off" /></label>
          <label>备份文件名<input v-model="draft.webdavFilename" type="text" /></label>
          <div class="actions"><button type="submit">保存连接设置</button><button type="button" @click="test">测试 WebDAV</button></div>
        </form>
        <BackupEncryptionSettings :webdav-password="draft.webdavPassword" :disabled="isBusy" />
        <h3>WebDAV 备份</h3>
        <div class="actions"><button type="button" @click="request('webdav-push')">上传备份</button><button type="button" @click="request('webdav-pull')">恢复备份</button></div>
        <h3>私有云中枢 / Native Host（已停用）</h3>
        <div class="actions"><button type="button" @click="request('cloud-push')" title="Native Host 已于 v1.0.2 彻底移除，请使用 WebDAV 备份">VPS 备份（已停用）</button><button type="button" @click="request('cloud-pull')" title="Native Host 已于 v1.0.2 彻底移除，请使用 WebDAV 备份">VPS 恢复（已停用）</button></div>
      </fieldset>
      <p>WebDAV 备份包含白名单内的配置及可用的 Multica 连接，上传前会使用独立口令加密。旧版明文备份需先到「设置 → 同步」确认迁移。历史 Native Host 已停用。</p>
      <section v-if="pending" class="confirmation" aria-label="同步操作确认">
        <p>{{ restorePending ? '恢复会覆盖云端包含的普通配置、提示词和文章；本机已有账号连接会保留。若本机没有 Multica 连接，会从加密备份恢复。请先备份当前数据。' : '上传前会验证云端备份和口令，并加密本机配置与 Multica 连接。云端旧明文备份需在设置中单独确认迁移。确认目标后继续。' }}</p>
        <div class="actions"><button type="button" :disabled="isBusy" @click="confirmOperation">{{ restorePending ? '确认恢复覆盖' : '确认上传' }}</button><button type="button" @click="cancelConfirmation">取消</button></div>
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
