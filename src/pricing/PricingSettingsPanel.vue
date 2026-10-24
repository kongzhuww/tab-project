<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";
import ModuleSettingsPanel from "../components/ModuleSettingsPanel.vue";
import { loadPricingSettings, savePricingSettings, PRICING_SETTINGS_KEYS, type PricingSettings } from "./settings";
const props = withDefaults(defineProps<{ anchor: HTMLElement | null; visible?: boolean }>(), { visible: true });
const emit = defineEmits<{ close: []; saved: [] }>();
const draft = reactive<PricingSettings>({ artificialAnalysisApiKey: "", openRouterApiKey: "" });
const initial = reactive<PricingSettings>({ ...draft });
const ready = ref(false), loading = ref(false), busy = ref(false);
const message = ref("");
const dirty = computed(() => PRICING_SETTINGS_KEYS.some(key => draft[key] !== initial[key]));
let disposed = false, readVersion = 0;
async function readSettings() {
  if (disposed || !props.visible || loading.value || ready.value || busy.value) return;
  const version = ++readVersion;
  loading.value = true;
  try {
    const settings = await loadPricingSettings();
    if (disposed || !props.visible || version !== readVersion) return;
    Object.assign(initial, settings); Object.assign(draft, settings); ready.value = true; message.value = "";
  } catch {
    if (!disposed && props.visible && version === readVersion) message.value = "配置读取失败，未启用保存。可以重试读取。";
  } finally {
    if (version === readVersion) loading.value = false;
  }
}
watch(() => props.visible, visible => {
  if (!visible) { ++readVersion; loading.value = false; }
  else if (!ready.value) void readSettings();
}, { immediate: true, flush: "sync" });
async function save() {
  if (!props.visible || !ready.value || busy.value || disposed) return;
  const submitted = { ...draft }, base = { ...initial };
  busy.value = true;
  try {
    const saved = await savePricingSettings(submitted, base);
    if (disposed) return;
    // Hiding the panel does not cancel a posted storage write or lose its result.
    Object.assign(initial, saved); Object.assign(draft, saved);
    message.value = "配置已保存。OpenRouter 同时供 GitHub AI 使用；保存不代表接口连通或已接入实时数据。";
    emit("saved");
  } catch {
    if (!disposed) message.value = "保存或读取结果未确认，草稿保留；请核对后再操作，未自动重试。";
  } finally { if (!disposed) busy.value = false; }
}
onBeforeUnmount(() => {
  disposed = true; ++readVersion;
  for (const key of PRICING_SETTINGS_KEYS) { draft[key] = ""; initial[key] = ""; }
});
</script>
<template>
  <ModuleSettingsPanel :anchor="anchor" :visible="visible" label="模型数据设置" @close="emit('close')">
    <form class="pricing-settings" @submit.prevent="save">
      <header><strong>模型数据设置</strong><button type="button" aria-label="隐藏设置，保留草稿" @click="emit('close')">✕</button></header>
      <fieldset :disabled="!ready || busy">
        <label>Artificial Analysis API Key<input v-model="draft.artificialAnalysisApiKey" type="password" autocomplete="off" /></label>
        <label>OpenRouter API Key<input v-model="draft.openRouterApiKey" type="password" autocomplete="off" /></label>
        <p>沿用现有存储键，不复制密钥。OpenRouter 是共享凭据，GitHub 的 AI 回退仍可读取它。</p>
        <button type="submit">{{ busy ? '正在保存…' : '保存配置' }}</button>
      </fieldset>
      <button v-if="!ready" type="button" :disabled="loading || !visible" @click="readSettings">{{ loading ? '正在读取…' : '重试读取' }}</button>
      <p v-if="dirty">未保存更改；隐藏面板或离开卡片会保留草稿，关闭整个页面仍会丢失。</p>
      <p v-if="message" role="status">{{ message }}</p>
    </form>
  </ModuleSettingsPanel>
</template>
<style scoped>
.pricing-settings { padding:14px; }
header { display:flex; align-items:center; justify-content:space-between; }
fieldset { border:0; padding:0; margin:12px 0 0; min-width:0; }
label { display:block; font-size:12px; margin-bottom:12px; }
input { display:block; width:100%; box-sizing:border-box; margin-top:6px; padding:8px; background:var(--panel); color:var(--text); border:1px solid var(--border); border-radius:6px; }
p { font-size:12px; line-height:1.5; color:var(--muted); }
button { padding:6px 8px; border:1px solid var(--border); border-radius:6px; background:var(--panel); color:var(--text); cursor:pointer; }
</style>
