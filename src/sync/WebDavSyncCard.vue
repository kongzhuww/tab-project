<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import BackupEncryptionSettings from "./BackupEncryptionSettings.vue";
import { compareLocalAndRemote } from "../services/sync-diff";
import { createSyncBackup, readSyncSettings, restoreSyncBackup } from "../services/sync.service";
import { formatBackpackOverwritePrompt, webDavService } from "../services/webdav.service";
import { loadWebDavSettings, saveWebDavSettings, toWebDavConfig, type WebDavSettings } from "./settings";

const emit = defineEmits<{
  notify: [message: string, isError?: boolean];
}>();

const webdavDraft = reactive<WebDavSettings>({
  webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/",
  webdavUsername: "",
  webdavPassword: "",
  webdavFilename: "logicweaver-settings.json"
});
const webdavInitial = ref<WebDavSettings>({ ...webdavDraft });
const webdavStatusMsg = ref("");
const webdavBusy = ref(false);
const localBackupMsg = ref("");
const remoteSyncMeta = ref<any>(null);

function formatTimeAgo(dateStr: string): string {
  try {
    const delta = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (delta < 60) return "刚刚";
    if (delta < 3600) return `${Math.floor(delta / 60)} 分钟前`;
    if (delta < 86400) return `${Math.floor(delta / 3600)} 小时前`;
    return `${Math.floor(delta / 86400)} 天前`;
  } catch {
    return dateStr;
  }
}

async function handleInspectRemoteSync(silent = false) {
  if (webdavBusy.value) return;
  if (!silent) {
    webdavBusy.value = true;
    webdavStatusMsg.value = "正在读取云端最新修改动态…";
  }
  try {
    const config = toWebDavConfig(webdavDraft);
    const res = await webDavService.download(config);
    if (res.ok && res.data) {
      const data = res.data;
      const remoteSettings = data.settings || data;
      const localSettings = await readSyncSettings();
      const summaries = compareLocalAndRemote(localSettings, remoteSettings);

      remoteSyncMeta.value = {
        deviceName: data.deviceName || (data.clientDevice === "macOS" ? "Mac" : "Windows PC"),
        clientDevice: data.clientDevice || "PC",
        exportedAt: data.exportedAt,
        timeAgo: data.exportedAt ? formatTimeAgo(data.exportedAt) : "未知时间",
        changeSummary: summaries
      };
      if (!silent) {
        webdavStatusMsg.value = `✓ 已获取云端设备动态（来自 ${remoteSyncMeta.value.deviceName}，${remoteSyncMeta.value.timeAgo}）`;
      }
    } else if (!silent) {
      webdavStatusMsg.value = `✕ 读取失败: ${res.error || "云端无有效记录"}`;
    }
  } catch (e: any) {
    if (!silent) webdavStatusMsg.value = `✕ 异常: ${e.message}`;
  } finally {
    if (!silent) webdavBusy.value = false;
  }
}

async function initWebDav() {
  try {
    const s = await loadWebDavSettings();
    webdavInitial.value = { ...s };
    Object.assign(webdavDraft, s);
    if (webdavDraft.webdavUrl && webdavDraft.webdavUsername && webdavDraft.webdavPassword) {
      void handleInspectRemoteSync(true);
    }
  } catch {}
}

async function handleSaveWebDav() {
  if (webdavBusy.value) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "";
  try {
    await saveWebDavSettings(webdavDraft, webdavInitial.value);
    webdavInitial.value = { ...webdavDraft };
    webdavStatusMsg.value = "✓ WebDAV 连接设置已保存";
    emit("notify", "WebDAV 连接设置已保存");
  } catch (e: any) {
    webdavStatusMsg.value = `保存失败: ${e.message || "请检查URL格式"}`;
  } finally {
    webdavBusy.value = false;
  }
}

async function handleTestWebDav() {
  if (webdavBusy.value) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "正在连接 WebDAV 服务器…";
  try {
    const config = toWebDavConfig(webdavDraft);
    const res = await webDavService.testConnection(config);
    if (res.ok) {
      webdavStatusMsg.value = "✓ WebDAV 连接成功！服务器响应正常。";
      emit("notify", "WebDAV 连通性测试通过！");
    } else {
      webdavStatusMsg.value = `✕ 连接失败: ${res.message || "请检查服务器地址与密码"}`;
    }
  } catch (e: any) {
    webdavStatusMsg.value = `✕ 测试异常: ${e.message}`;
  } finally {
    webdavBusy.value = false;
  }
}

async function handlePushWebDav(mergeMode = false) {
  if (webdavBusy.value) return;
  if (mergeMode && !confirm("当前合并按网站并集处理，无法识别旧设备上的删除操作，已删除的网站可能重新出现。请先备份两端数据；确定继续合并上传吗？")) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = mergeMode ? "正在与云端合并并上传…" : "正在上传本地配置到云端…";
  let shouldRefreshRemote = false;
  try {
    const config = toWebDavConfig(webdavDraft);
    let res = await webDavService.pushCurrentConfig(config, { mergeRemote: mergeMode });
    if (!mergeMode && !res.ok && res.missingCloudBackpack) {
      if (confirm(formatBackpackOverwritePrompt(res.backpackDiff))) {
        webdavStatusMsg.value = "正在按本机当前背包状态覆盖上传到云端…";
        res = await webDavService.pushCurrentConfig(config, { mergeRemote: false, allowBackpackOverwrite: true });
      }
    }
    if (res.ok) {
      webdavStatusMsg.value = mergeMode
        ? `✓ 已合并并上传云端（${res.byteLength || 0} 字节）；本机未自动覆盖，可选择合并云端到本地。`
        : `✓ 上传成功！已将当前本地配置保存至云端 (${res.byteLength || 0} 字节)`;
      if (!res.baselineRecorded) webdavStatusMsg.value += " 但两端未完全一致或服务器未提供 ETag，自动同步基准未建立；请手动核对。";
      emit("notify", mergeMode ? "已合并上传至云端，本机未自动覆盖。" : "已成功上传至云端备份！");
      shouldRefreshRemote = true;
    } else {
      webdavStatusMsg.value = `✕ 上传失败: ${res.error || "请检查写入权限"}`;
    }
  } catch (e: any) {
    webdavStatusMsg.value = `✕ 上传异常: ${e.message}`;
  } finally {
    webdavBusy.value = false;
  }
  if (shouldRefreshRemote) void handleInspectRemoteSync(true);
}

async function handleMigrateWebDav() {
  if (webdavBusy.value) return;
  if (!confirm("这会读取并合并旧版明文备份，然后将同名云端文件替换为加密备份。请先在 WebDAV 保存旧文件的副本；服务器历史版本可能仍保留明文。合并无法识别旧的删除操作，已删除的网站可能重新出现。确认迁移吗？")) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "正在合并旧备份并加密…";
  let shouldRefreshRemote = false;
  try {
    const result = await webDavService.pushCurrentConfig(toWebDavConfig(webdavDraft), { mergeRemote: true, migrateLegacy: true });
    webdavStatusMsg.value = result.ok
      ? `✓ 已迁移并加密；请检查云端历史版本是否仍含明文。${result.baselineRecorded ? "" : " 两端未完全一致，自动同步基准未建立，请手动核对。"}`
      : `✕ 迁移失败：${result.error || "未确认上传"}`;
    shouldRefreshRemote = result.ok;
  } catch {
    webdavStatusMsg.value = "✕ 迁移未确认，请先检查云端状态，不要重复上传。";
  } finally {
    webdavBusy.value = false;
  }
  if (shouldRefreshRemote) void handleInspectRemoteSync(true);
}

async function handlePullWebDav(mergeMode = true) {
  if (webdavBusy.value) return;
  const promptText = mergeMode
    ? "确定合并云端到本地吗？目前按并集合并，无法识别旧的删除操作，已删除的网站可能重新出现。请先备份两端数据。"
    : "确定用云端覆盖本地配置吗？云端包含的提示词和文章也会覆盖本地对应数据；本机已有账号连接会保留。请先备份当前数据。";
  if (!confirm(promptText)) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = mergeMode ? "正在合并云端到本地…" : "正在用云端全量覆盖本地…";
  let shouldRefreshRemote = false;
  try {
    const config = toWebDavConfig(webdavDraft);
    const res = await webDavService.pullCurrentConfig(config, { merge: mergeMode });
    if (res.ok) {
      webdavStatusMsg.value = mergeMode
        ? "✓ 合并成功！已无损融合云端配置。请刷新页面查看。"
        : `✓ 覆盖成功！已还原 ${res.restoredCount || 0} 项配置。请刷新页面查看。`;
      if (res.credentialResult === "restored") webdavStatusMsg.value += " 历史备份凭据已恢复。";
      if (res.credentialResult === "kept") webdavStatusMsg.value += " 已保留本机原有凭据。";
      if (!res.baselineRecorded) webdavStatusMsg.value += " 两端未完全一致或服务器未提供 ETag，自动同步基准未建立；请手动核对。";
      emit("notify", mergeMode ? "已成功合并云端配置！" : `覆盖成功！已还原 ${res.restoredCount || 0} 项配置`);
      shouldRefreshRemote = true;
    } else {
      webdavStatusMsg.value = `✕ ${mergeMode ? "合并失败" : "覆盖失败"}: ${res.error || "未在服务器找到对应备份文件"}`;
    }
  } catch (e: any) {
    webdavStatusMsg.value = `✕ 操作异常: ${e.message}`;
  } finally {
    webdavBusy.value = false;
  }
  if (shouldRefreshRemote) void handleInspectRemoteSync(true);
}

async function handleExportLocalJson() {
  if (!confirm("本地 JSON 不加密，可能包含 GitHub、Todoist 和 WebDAV 等凭据。请只保存到可信位置，不要分享。确认导出吗？")) return;
  try {
    const rawSettings = await readSyncSettings();
    const backup = await createSyncBackup(rawSettings);
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logicweaver-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localBackupMsg.value = "✓ 本地备份已导出！";
    emit("notify", "本地配置快照已成功导出");
  } catch (e: any) {
    localBackupMsg.value = `导出失败: ${e.message}`;
  }
}

async function handleImportLocalJson(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!confirm(`确定导入「${file.name}」恢复配置吗？`)) return;
    const res = await restoreSyncBackup(data);
    localBackupMsg.value = `✓ 恢复成功！已成功还原 ${res.restoredCount || 0} 项配置。`;
    emit("notify", `成功导入 ${res.restoredCount || 0} 项配置！建议刷新页面。`);
  } catch (e: any) {
    localBackupMsg.value = `恢复失败: ${e.message || "文件格式不匹配"}`;
  } finally {
    target.value = "";
  }
}

onMounted(() => {
  void initWebDav();
});
</script>

<template>
  <!-- 1. WebDAV 云端备份与漫游 -->
  <div class="field full-width">
    <label>☁️ WebDAV 多端云端漫游 <em>WEBDAV CLOUD SYNC</em></label>
    <p class="hint" style="margin: 0 0 10px;">
      支持坚果云、Nextcloud、私有 NAS 或 VPS 搭建的 WebDAV 服务。配置后可实现不同电脑间配置一键漫游同步。
    </p>

    <div style="display: flex; flex-direction: column; gap: 10px; background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%); padding: 14px; border-radius: 10px; border: 1px solid var(--border);">
      <div>
        <label style="font-size: 11.5px; color: var(--text);">WebDAV 服务器地址</label>
        <input
          v-model="webdavDraft.webdavUrl"
          type="url"
          placeholder="https://dav.jianguoyun.com/dav/LogicWeaver/"
          style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
        />
        <small style="font-size: 10px; color: var(--muted); margin-top: 2px; display: block;">坚果云用户推荐在应用管理生成应用密码，地址填写根目录或子文件夹。</small>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 180px;">
          <label style="font-size: 11.5px; color: var(--text);">账号 / 邮箱</label>
          <input
            v-model="webdavDraft.webdavUsername"
            type="text"
            placeholder="account@example.com"
            style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
          />
        </div>
        <div style="flex: 1; min-width: 180px;">
          <label style="font-size: 11.5px; color: var(--text);">应用专用密码</label>
          <input
            v-model="webdavDraft.webdavPassword"
            type="password"
            placeholder="••••••••••••"
            style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
          />
        </div>
        <div style="flex: 1; min-width: 160px;">
          <label style="font-size: 11.5px; color: var(--text);">备份文件名</label>
          <input
            v-model="webdavDraft.webdavFilename"
            type="text"
            placeholder="logicweaver-settings.json"
            style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
          />
        </div>
      </div>

      <BackupEncryptionSettings :webdav-password="webdavDraft.webdavPassword" :disabled="webdavBusy" @changed="() => handleInspectRemoteSync(true)" />

      <!-- WebDAV 连接配置操作栏 -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-top: 4px;">
        <button type="button" class="btn-primary" :disabled="webdavBusy" @click="handleSaveWebDav">
          保存连接设置
        </button>
        <button type="button" class="btn-save-green" :disabled="webdavBusy" title="将当前本地配置（含添加与删除）上传至云端保存" @click="() => handlePushWebDav(false)">
          ⬆️ 上传到云端
        </button>
        <details class="webdav-more">
          <summary>更多操作</summary>
          <div class="webdav-more-actions">
            <button type="button" class="btn-secondary" :disabled="webdavBusy" @click="handleTestWebDav">测试连接</button>
            <button type="button" class="btn-secondary" :disabled="webdavBusy" @click="() => handleInspectRemoteSync(false)">刷新对比</button>
            <button type="button" class="btn-secondary" :disabled="webdavBusy" title="并集合并，旧设备上的已删除网站可能重新出现" @click="() => handlePullWebDav(true)">合并云端到本地</button>
            <button type="button" class="btn-secondary" :disabled="webdavBusy" title="将两端网站并集合并后上传" @click="() => handlePushWebDav(true)">双向合并上传</button>
            <button type="button" class="btn-secondary" :disabled="webdavBusy" title="用云端覆盖普通配置，保留本机已有账号连接" @click="() => handlePullWebDav(false)">用云端覆盖本地</button>
            <button type="button" class="btn-secondary" :disabled="webdavBusy" title="合并当前配置并替换旧版明文备份" @click="handleMigrateWebDav">迁移旧备份并加密</button>
          </div>
        </details>
      </div>

      <!-- 提示反馈 -->
      <div v-if="webdavStatusMsg" style="font-size: 11px; padding: 6px 10px; border-radius: 6px; background: var(--panel); border: 1px solid var(--border); color: var(--text);">
        {{ webdavStatusMsg }}
      </div>

      <!-- 云端最新设备与改动动态看板 -->
      <div v-if="remoteSyncMeta" style="margin-top: 6px; padding: 12px 14px; border-radius: 8px; background: var(--panel); border: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 14px;">{{ remoteSyncMeta.clientDevice === 'macOS' ? '💻' : '🖥️' }}</span>
            <strong style="font-size: 12px; color: var(--heading);">{{ remoteSyncMeta.deviceName || remoteSyncMeta.clientDevice }}</strong>
            <span style="font-size: 10px; color: var(--muted); background: var(--surface); padding: 2px 6px; border-radius: 4px;">{{ remoteSyncMeta.timeAgo }}</span>
          </div>
          <span style="font-size: 10px; color: var(--muted);">云端最新版本</span>
        </div>

        <div v-if="remoteSyncMeta.changeSummary && remoteSyncMeta.changeSummary.length" style="display: flex; flex-direction: column; gap: 6px;">
          <span style="font-size: 10.5px; color: var(--muted);">两端数据对比明细：</span>
          <ul style="margin: 0; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text);">
            <li
              v-for="(item, idx) in remoteSyncMeta.changeSummary"
              :key="idx"
              style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 8px; background: var(--surface); border-radius: 6px;"
            >
              <div style="display: flex; align-items: center; gap: 6px;">
                <strong style="color: var(--heading);">[{{ item.categoryLabel }}]</strong>
                <span>{{ item.text }}</span>
              </div>
              <span
                v-if="item.badge"
                :style="{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'monospace',
                  backgroundColor: item.badge.type === 'plus' ? 'rgba(16, 185, 129, 0.15)' : item.badge.type === 'minus' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                  color: item.badge.type === 'plus' ? '#10b981' : item.badge.type === 'minus' ? '#ef4444' : '#3b82f6',
                  border: `1px solid ${item.badge.type === 'plus' ? 'rgba(16, 185, 129, 0.3)' : item.badge.type === 'minus' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                }"
              >
                {{ item.badge.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. 本地数据快照文件 -->
  <div class="field full-width">
    <label>📦 本地数据快照文件 <em>LOCAL BACKUP & RESTORE</em></label>
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%); padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border);">
      <button type="button" class="btn-secondary" @click="handleExportLocalJson">
        💾 导出配置为本地 JSON
      </button>
      <label class="btn-secondary" style="cursor: pointer; margin: 0; display: inline-flex; align-items: center;">
        📂 导入本地 JSON 恢复
        <input type="file" accept=".json,application/json" style="display: none;" @change="handleImportLocalJson" />
      </label>
      <span v-if="localBackupMsg" style="font-size: 11px; color: #10b981; font-weight: bold;">
        {{ localBackupMsg }}
      </span>
      <small style="flex-basis: 100%; color: var(--muted); font-size: 10.5px; margin-top: 2px;">
        本地 JSON 导出没有加密，可能包含提示词、文章及 GitHub、Todoist、WebDAV 等凭据；请勿上传或分享。
      </small>
    </div>
  </div>
</template>
