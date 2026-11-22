<script setup lang="ts">
import { onMounted, watch } from "vue";
import { t } from "../i18n";
import { useExtensionUpdates } from "./useExtensionUpdates";

const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });
const emit = defineEmits<{
  notify: [message: string, isError?: boolean];
}>();

const {
  needsReloadToApply,
  currentVersionText,
  currentCommitText,
  currentBuildText,
  checkingUpdate,
  canApplyUpdate,
  updateStatusMessage,
  onlineRelease,
  onlineAsset,
  isDownloading,
  downloadPercent,
  downloadReceivedText,
  downloadCompleted,
  githubToken,
  showTokenInput,
  syncLocalVersion,
  loadGithubToken,
  saveGithubToken,
  checkAllUpdates,
  downloadReleaseAsset,
  reloadExtension,
  applyGitUpdate
} = useExtensionUpdates((msg, isError) => emit("notify", msg, isError), () => props.active);

onMounted(() => {
  void syncLocalVersion();
  void loadGithubToken();
});

watch(() => props.active, (active) => {
  if (active) {
    void syncLocalVersion();
  }
});

defineExpose({ syncLocalVersion, loadGithubToken });
</script>

<template>
  <!-- 3. 插件版本控制与更新 -->
  <div class="field full-width">
    <label>{{ t('settings.release.title') }} <em>RELEASE & GIT</em></label>
    <div class="sync-banner">
      <div>
        <div style="font-weight:700;font-size:13px;color:var(--heading);">{{ currentVersionText }}</div>
        <div style="font-size:10px;color:var(--dim);margin-top:4px;">{{ currentCommitText }}</div>
        <div style="font-size:10px;color:var(--dim);margin-top:4px;overflow-wrap:anywhere;">{{ currentBuildText }}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button v-if="needsReloadToApply" type="button" class="btn-save-green" :title="t('settings.release.reloadTip')" @click="reloadExtension">
          {{ t('settings.release.reloadNow') }}
        </button>
        <button type="button" class="btn-secondary" :disabled="checkingUpdate || isDownloading" @click="checkAllUpdates">
          {{ checkingUpdate ? t('settings.release.checking') : t('settings.release.checkBtn') }}
        </button>
        <button v-if="canApplyUpdate" type="button" class="btn-primary" @click="applyGitUpdate">
          {{ t('settings.release.applyGit') }}
        </button>
      </div>
    </div>

    <!-- 状态与反馈提示 -->
    <div v-if="updateStatusMessage" class="update-log-box">
      {{ updateStatusMessage }}
    </div>

    <!-- 私有仓库 Token 快捷设置 -->
    <div v-if="showTokenInput || !githubToken" class="github-token-box">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <strong style="font-size:12px;">GitHub 访问 Token（私有仓库协作者在线拉取）</strong>
        <button type="button" style="padding:2px 8px;font-size:11px;" @click="saveGithubToken">保存 Token</button>
      </div>
      <input v-model="githubToken" type="password" placeholder="ghp_... 输入你的 GitHub Personal Access Token" style="font-size:11px;padding:6px 8px;" />
      <p class="hint" style="margin:0;">填写后可免安装 Git 直接从 GitHub 在线检测、进度条下载最新版插件压缩包。</p>
    </div>

    <!-- 在线新版本卡片 -->
    <div v-if="onlineRelease" class="release-card">
      <div class="release-header">
        <div>
          <span class="release-tag">🎉 发现新版本：{{ onlineRelease.tag_name }}</span>
          <span v-if="onlineRelease.name" style="margin-left:6px;font-size:11px;color:var(--muted);">({{ onlineRelease.name }})</span>
        </div>
        <button
          v-if="onlineAsset && !downloadCompleted"
          type="button"
          class="btn-primary"
          :disabled="isDownloading"
          @click="downloadReleaseAsset"
        >
          {{ isDownloading ? t('settings.release.downloading') : t('settings.release.downloadPackage') }}
        </button>
      </div>

      <!-- 变更日志摘要 -->
      <div v-if="onlineRelease.body" class="release-notes">
        {{ onlineRelease.body }}
      </div>

      <!-- 下载进度条 -->
      <div v-if="isDownloading || downloadPercent > 0" class="download-progress-box">
        <div class="download-progress-label">
          <span>{{ isDownloading ? '正在从 GitHub 下载安装包…' : (downloadCompleted ? '已交给浏览器保存' : '已暂停') }}</span>
          <strong>{{ downloadReceivedText }}</strong>
        </div>
        <div class="download-progress-track">
          <div class="download-progress-bar" :style="{ width: `${downloadPercent}%` }"></div>
        </div>
      </div>

      <!-- 下载完成引导与热重启按钮 -->
      <div v-if="downloadCompleted" class="download-finish-card">
        <strong>安装包已交给浏览器，请在下载列表确认保存完成。</strong>
        <p style="margin:0;font-size:11px;line-height:1.4;">
          解压安装包覆盖到当前扩展目录后，点击下方按钮即可一键重新载入生效，无需重启浏览器：
        </p>
        <button type="button" class="btn-save-green" style="align-self:flex-start;margin-top:4px;" @click="reloadExtension">
          🔄 立即重新载入扩展 (Hot Reload)
        </button>
      </div>
    </div>
  </div>
</template>
