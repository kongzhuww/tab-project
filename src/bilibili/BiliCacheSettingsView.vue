<script setup lang="ts">
import BiliSettingsPanel from "./BiliSettingsPanel.vue";
defineProps<{ active: boolean }>();
const emit = defineEmits<{ back: [] }>();
</script>

<template>
  <section class="bili-cache-settings-view" aria-labelledby="bili-cache-settings-title">
    <header class="cache-settings-header">
      <div>
        <h3 id="bili-cache-settings-title">缓存设置</h3>
        <p>管理 B站视频的本地缓存目录</p>
      </div>
      <button type="button" class="cache-settings-back" @click="emit('back')">返回缓存视频</button>
    </header>
    <div class="cache-settings-card">
      <h4>视频缓存目录</h4>
      <p class="cache-settings-note">选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。</p>
      <BiliSettingsPanel :active="active" />
    </div>
  </section>
</template>

<style scoped>
.bili-cache-settings-view { padding:24px; color:var(--text); }
.cache-settings-header { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:24px; }
.cache-settings-header h3 { margin:0 0 8px; color:var(--heading); font-size:20px; }
.cache-settings-header p, .cache-settings-note { margin:0; color:var(--muted); font-size:12px; line-height:1.6; }
.cache-settings-card { max-width:760px; padding:22px; border:1px solid var(--border); border-radius:14px; background:var(--panel); }
.cache-settings-card h4 { margin:0 0 10px; color:var(--heading); font-size:14px; }
.cache-settings-back { flex-shrink:0; padding:9px 14px; border:1px solid var(--border); border-radius:8px; background:var(--panel); color:var(--text); cursor:pointer; }
.cache-settings-back:hover { background:var(--surface); }
@media (max-width:600px) { .bili-cache-settings-view { padding:14px; } .cache-settings-header { align-items:flex-start; flex-wrap:wrap; } }
</style>
