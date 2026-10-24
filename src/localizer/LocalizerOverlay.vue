<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { overlayState, saveTranslation, showLocalizerToast } from "./overlay-state";

const input = ref<HTMLInputElement | null>(null);
watch(() => overlayState.visible, (visible) => {
  if (visible) void nextTick(() => { input.value?.focus(); input.value?.select(); });
});
function close(): void { overlayState.visible = false; }
async function save(): Promise<void> {
  if (overlayState.saving) return;
  overlayState.saving = true;
  try {
    const original = overlayState.original;
    const translated = overlayState.translated.trim();
    await saveTranslation(original, translated);
    close();
    showLocalizerToast(`✓ 已固化词条：\n"${original}" ➔ "${translated || "已清除"}"`);
  } catch (error: any) { showLocalizerToast(`保存失败：${error?.message || "未知原因"}`); }
  finally { overlayState.saving = false; }
}
</script>

<template>
  <div v-if="overlayState.visible" class="overlay-layer" @click.self="close">
    <section class="editor-card" role="dialog" aria-modal="true" aria-label="LogicWeaver 词条固化">
      <div class="editor-title">🌐 LogicWeaver 词条固化</div>
      <div class="editor-field"><label>原词（原文）：</label><div class="original">{{ overlayState.original }}</div></div>
      <div class="editor-field"><label for="lw-localizer-input">固化中文翻译：</label>
        <input id="lw-localizer-input" ref="input" v-model="overlayState.translated" type="text" placeholder="输入修正后的中文" @keydown.enter.prevent="save" @keydown.esc.prevent="close" />
      </div>
      <div class="editor-actions"><button type="button" class="cancel" @click="close">取消</button><button type="button" class="save" :disabled="overlayState.saving" @click="save">保存并永久固化</button></div>
    </section>
  </div>
  <div v-if="overlayState.toast" class="localizer-toast" role="status">{{ overlayState.toast }}</div>
</template>
