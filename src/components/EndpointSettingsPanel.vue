<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import ModuleSettingsPanel from "./ModuleSettingsPanel.vue";
const props = defineProps<{ anchor: HTMLElement | null; label: string; hint: string; load: () => Promise<string>; save: (value: string) => Promise<void>; visible?: boolean }>();
const emit = defineEmits<{ close: [] }>();
const value = ref("");
let initial = "";
const ready = ref(false);
const busy = ref(false);
const message = ref("");
let disposed = false;
onBeforeUnmount(() => { disposed = true; });
onMounted(async () => {
  try { const loaded = await props.load(); if (disposed) return; initial = loaded; value.value = initial; ready.value = true; }
  catch { if (disposed) return; message.value = "配置读取失败，已禁用保存。请关闭后重试。"; }
});
async function save() {
  if (disposed || !ready.value || busy.value) return;
  busy.value = true;
  try {
    const normalized = value.value.trim();
    if (normalized) {
      const url = new URL(normalized);
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("invalid-endpoint");
    }
    if (value.value !== initial) await props.save(normalized);
    const loaded = await props.load();
    if (disposed) return;
    initial = loaded;
    value.value = initial;
    message.value = "节点配置已保存，没有发起网络请求。";
  } catch { if (disposed) return; message.value = "保存或重读失败，请检查 URL；不允许在 URL 中嵌入账号密码。关闭后重读确认。"; }
  finally { busy.value = false; }
}
</script>
<template>
  <ModuleSettingsPanel :anchor="anchor" :label="label" :visible="visible ?? true" @close="emit('close')">
    <form class="endpoint-settings" @submit.prevent="save">
      <header><strong>{{ label }}</strong><button type="button" aria-label="关闭设置" @click="emit('close')">✕</button></header>
      <fieldset :disabled="!ready || busy"><label>服务节点 URL<input v-model="value" type="url" autocomplete="off" /></label><p>{{ hint }}</p><button type="submit">保存节点</button></fieldset>
      <p v-if="message" role="status">{{ message }}</p>
    </form>
  </ModuleSettingsPanel>
</template>
<style scoped>
.endpoint-settings { padding:14px; }
header { display:flex; align-items:center; justify-content:space-between; }
fieldset { border:0; padding:0; margin:12px 0 0; min-width:0; }
label, p { font-size:12px; } p { line-height:1.5; color:var(--muted); }
input { display:block; width:100%; box-sizing:border-box; margin-top:6px; padding:8px; background:var(--panel); color:var(--text); border:1px solid var(--border); border-radius:6px; }
button { padding:6px 8px; border:1px solid var(--border); border-radius:6px; background:var(--panel); color:var(--text); cursor:pointer; }
</style>
