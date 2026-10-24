<script setup lang="ts">
import { watch, onBeforeUnmount, ref } from "vue";
import ModuleSettingsPanel from "../components/ModuleSettingsPanel.vue";
import { loadYouTubeSettings, saveYouTubeSettings, type YouTubeModuleSettings } from "./settings";
import { youTubeService } from "../services/youtube.service";
import { youTubeState } from "./youtube-store";
const props = withDefaults(defineProps<{ anchor: HTMLElement | null; visible?: boolean }>(), { visible: true });
const emit = defineEmits<{ close: [] }>();
const preferAccount = ref(true);
const channels = ref("");
const ready = ref(false);
const busy = ref(false);
const message = ref("");
let initial: YouTubeModuleSettings | undefined;
let disposed = false, readVersion = 0;
const loading = ref(false);
onBeforeUnmount(() => { disposed = true; ++readVersion; });
async function readSettings() {
  if (disposed || !props.visible || ready.value || busy.value || loading.value) return;
  const version = ++readVersion;
  loading.value = true;
  try {
    const settings = await loadYouTubeSettings();
    if (disposed || !props.visible || version !== readVersion) return;
    initial = settings;
    preferAccount.value = settings.preferAccount;
    channels.value = settings.fallbackChannels.join("\n");
    ready.value = true;
  } catch {
    if (!disposed && props.visible && version === readVersion) message.value = "读取设置失败，保存已禁用；请重试读取。";
  } finally { if (version === readVersion) loading.value = false; }
}
watch(() => props.visible, visible => {
  if (visible) void readSettings();
  else { ++readVersion; loading.value = false; }
}, { immediate: true, flush: "sync" });
async function save() {
  if (disposed || !props.visible || !ready.value || busy.value || !initial) return;
  const ids = [...new Set(channels.value.split(/\s+/).filter(Boolean))];
  if (ids.some(id => !/^UC[\w-]{22}$/.test(id))) {
    message.value = "频道 ID 应以 UC 开头，共 24 位；每行一个。";
    return;
  }
  busy.value = true;
  let saved = false;
  try {
    const value = await saveYouTubeSettings({ preferAccount: preferAccount.value, fallbackChannels: ids }, initial);
    saved = true;
    if (disposed) return;
    initial = value;
    preferAccount.value = value.preferAccount;
    channels.value = value.fallbackChannels.join("\n");
    if (!props.visible || youTubeState.currentView !== "recommend") {
      message.value = "设置已保存；请回到推荐页点击刷新。收藏未改动。";
      return;
    }
    message.value = "已保存，正在更新推荐；收藏不会被删除。";
    await youTubeService.loadRecommend(true);
    if (!disposed) message.value = youTubeState.error ? "设置已保存；推荐读取有错误，请查看列表提示后重试。" : "设置已保存；推荐读取可能因切走而暂停，数据状态请查看推荐页。";
  } catch {
    if (!disposed) message.value = saved ? "设置已保存，但更新失败，请重试。" : "设置保存失败，请重试。";
  } finally { if (!disposed) busy.value = false; }
}
</script>
<template>
  <ModuleSettingsPanel :anchor="anchor" :visible="visible" label="YouTube 设置" @close="emit('close')">
    <div class="yt-module-settings">
      <header><strong>YouTube 设置</strong><button type="button" aria-label="关闭设置" @click="emit('close')">✕</button></header>
      <p>当前使用浏览器登录状态与公开 RSS，不需要额外 API Key。Google OAuth 属于共享配置，本次不迁移。</p>
      <fieldset :disabled="!ready || busy">
        <label><input v-model="preferAccount" type="checkbox" /> 优先使用已登录账号的推荐</label>
        <label for="yt-fallback-channels">备用推荐频道（每行一个 UC 频道 ID）</label>
        <textarea id="yt-fallback-channels" v-model="channels" rows="6" spellcheck="false"></textarea>
      </fieldset>
      <small>关闭账号推荐后直接使用这些频道；留空则不提供备用来源。不会导出浏览器 Cookie。</small>
      <p>隐藏设置或切换页面会保留本页草稿；关闭整个标签页仍会丢失。</p>
      <button v-if="!ready" type="button" :disabled="loading || !visible" @click="readSettings">{{ loading ? '正在读取…' : '重试读取' }}</button>
      <p v-if="message" role="status">{{ message }}</p>
      <footer><button type="button" :disabled="!ready || busy" @click="save">{{ busy ? '处理中…' : '保存并更新推荐' }}</button></footer>
    </div>
  </ModuleSettingsPanel>
</template>
<style scoped>
.yt-module-settings { padding:14px; }
header { display:flex; justify-content:space-between; align-items:center; }
p, small { font-size:12px; line-height:1.5; color:var(--muted, #666); }
fieldset { border:0; margin:0; padding:0; min-width:0; }
label { display:block; margin:12px 0 6px; font-size:13px; }
textarea { width:100%; box-sizing:border-box; background:var(--panel, #fff); color:inherit; border:1px solid var(--border, #ddd); border-radius:6px; padding:8px; resize:vertical; }
button { cursor:pointer; padding:5px 10px; border:1px solid var(--border, #ddd); border-radius:6px; background:var(--panel, #fff); color:inherit; }
button:disabled { opacity:.6; cursor:default; }
footer { margin-top:12px; text-align:right; }
</style>
