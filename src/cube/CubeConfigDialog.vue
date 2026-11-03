<script setup lang="ts">
import { computed, ref } from 'vue';
import { cubeRegistryStore, type CustomFaceType } from './cube-registry.store';
import { t } from '../i18n';
import CustomSelect, { type CustomSelectOption } from '../core/CustomSelect.vue';
const state = cubeRegistryStore.state;
const activeFaces = computed(() => cubeRegistryStore.getActiveFaces());
const inactive = computed(() => state.registeredFaces.filter(f => !state.activeFaceIds.includes(f.id)));
const title = ref('');
const kind = ref<CustomFaceType>('memo');
const kindOptions = computed<CustomSelectOption[]>(() => [
  { value: 'memo', label: t('cube.manager.typeMemo'), icon: '📝' },
  { value: 'countdown', label: t('cube.manager.typeCountdown'), icon: '⏳' },
  { value: 'link', label: t('cube.manager.typeLink'), icon: '🔗' }
]);
const content = ref('');
const codeMode = ref(false);
const code = ref(JSON.stringify({ title: '每日一句', icon: '📝', customType: 'memo', customData: { text: '今天也要记得休息' } }, null, 2));
const error = ref('');
function perform(action: () => unknown) {
  error.value = '';
  try { action(); } catch (e) { error.value = e instanceof Error ? e.message : '操作失败'; }
}
function add() {
  perform(() => {
    const value = codeMode.value ? JSON.parse(code.value) : {
      title: title.value, customType: kind.value,
      customData: { text: content.value, targetDate: content.value, url: content.value }
    };
    cubeRegistryStore.addCustomFace(value);
    title.value = ''; content.value = '';
  });
}
</script>

<template>
  <Teleport to="body">
    <section v-if="state.isConfigDialogOpen" class="cube-manager" role="dialog" :aria-label="t('cube.manager.title')" @keydown.esc.stop="cubeRegistryStore.closeConfigDialog()">
      <header><strong>{{ t('cube.manager.title') }}</strong><button type="button" aria-label="关闭" @click="cubeRegistryStore.closeConfigDialog()">×</button></header>
      <div class="cube-manager-body">
        <p>{{ t('cube.manager.desc') }}</p>
        <div v-for="(face, index) in activeFaces" :key="face.id" class="cube-row">
          <span>{{ face.icon }} {{ face.title }}</span>
          <button type="button" :disabled="index === 0" @click="perform(() => cubeRegistryStore.moveUp(face.id))" :title="t('cube.manager.moveUp')">↑</button>
          <button type="button" :disabled="index === activeFaces.length - 1" @click="perform(() => cubeRegistryStore.moveDown(face.id))" :title="t('cube.manager.moveDown')">↓</button>
          <button type="button" @click="perform(() => cubeRegistryStore.removeCustomFace(face.id))">{{ t('cube.manager.removeFace') }}</button>
        </div>
        <div v-for="face in inactive" :key="face.id" class="cube-row">
          <span>{{ face.title }}{{ t('cube.manager.inactiveSuffix') }}</span>
          <button type="button" @click="perform(() => cubeRegistryStore.toggleActive(face.id, true))">{{ t('cube.manager.add') }}</button>
          <button v-if="!face.builtIn" type="button" @click="perform(() => cubeRegistryStore.removeCustomFace(face.id))">{{ t('cube.manager.delete') }}</button>
        </div>
        <h3>{{ t('cube.manager.addFace') }}</h3>
        <label><input v-model="codeMode" type="checkbox" /> {{ t('cube.manager.pasteJson') }}</label>
        <form @submit.prevent="add">
          <template v-if="!codeMode">
            <label>{{ t('cube.manager.fieldTitle') }}<input v-model="title" maxlength="60" required /></label>
            <label>
              {{ t('cube.manager.fieldType') }}
              <CustomSelect
                v-model="kind"
                :options="kindOptions"
                size="sm"
                @change="kind = $event as CustomFaceType"
              />
            </label>
            <label>{{ t('cube.manager.fieldContent') }}<input v-model="content" :type="kind === 'countdown' ? 'date' : 'text'" :placeholder="kind === 'link' ? 'https://…' : t('cube.manager.contentPlaceholderText')" maxlength="500" required /></label>
          </template>
          <template v-else>
            <p>{{ t('cube.manager.securityNotice') }}</p>
            <textarea v-model="code" rows="9" maxlength="10000" aria-label="面的 JSON 配置" spellcheck="false"></textarea>
          </template>
          <button type="submit">{{ t('cube.manager.submitAdd') }}</button>
        </form>
        <p v-if="error" role="alert">{{ error }}</p>
      </div>
      <footer><button type="button" @click="perform(() => cubeRegistryStore.resetDefaults())">{{ t('cube.manager.resetDefault') }}</button><small>{{ t('cube.manager.resetNotice') }}</small></footer>
    </section>
  </Teleport>
</template>

<style scoped>
.cube-manager { position: fixed; top: 76px; right: 24px; z-index: 999995; width: min(440px, calc(100vw - 24px)); max-height: calc(100dvh - 96px); display: flex; flex-direction: column; background: var(--panel); color: var(--text); border: 1px solid var(--border); border-radius: 12px; }
header, footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px; }
header { border-bottom: 1px solid var(--border); }
footer { border-top: 1px solid var(--border); flex-wrap: wrap; }
.cube-manager-body { padding: 12px; overflow: auto; min-height: 0; }
.cube-row { display: flex; align-items: center; gap: 6px; margin: 8px 0; }
.cube-row span { flex: 1; min-width: 0; overflow-wrap: anywhere; }
button, input, select, textarea { font: inherit; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 6px 8px; }
button { cursor: pointer; } button:disabled { opacity: .4; cursor: default; }
form, form label { display: flex; flex-direction: column; gap: 8px; } form { margin-top: 12px; }
textarea { resize: vertical; font-family: monospace; }
p, small { color: var(--muted); font-size: 12px; } h3 { font-size: 14px; color: var(--heading); }
</style>
