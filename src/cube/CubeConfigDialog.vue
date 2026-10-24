<script setup lang="ts">
import { computed, ref } from 'vue';
import { cubeRegistryStore, type CustomFaceType } from './cube-registry.store';
const state = cubeRegistryStore.state;
const activeFaces = computed(() => cubeRegistryStore.getActiveFaces());
const inactive = computed(() => state.registeredFaces.filter(f => !state.activeFaceIds.includes(f.id)));
const title = ref('');
const kind = ref<CustomFaceType>('memo');
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
    <section v-if="state.isConfigDialogOpen" class="cube-manager" role="dialog" aria-label="管理立方体面" @keydown.esc.stop="cubeRegistryStore.closeConfigDialog()">
      <header><strong>管理立方体面</strong><button type="button" aria-label="关闭" @click="cubeRegistryStore.closeConfigDialog()">×</button></header>
      <div class="cube-manager-body">
        <p>默认只有音乐。可以删除所有面，空位仍可添加。</p>
        <div v-for="(face, index) in activeFaces" :key="face.id" class="cube-row">
          <span>{{ face.icon }} {{ face.title }}</span>
          <button type="button" :disabled="index === 0" @click="perform(() => cubeRegistryStore.moveUp(face.id))" title="上移">↑</button>
          <button type="button" :disabled="index === activeFaces.length - 1" @click="perform(() => cubeRegistryStore.moveDown(face.id))" title="下移">↓</button>
          <button type="button" @click="perform(() => cubeRegistryStore.removeCustomFace(face.id))">删除面</button>
        </div>
        <div v-for="face in inactive" :key="face.id" class="cube-row">
          <span>{{ face.title }}（未启用）</span>
          <button type="button" @click="perform(() => cubeRegistryStore.toggleActive(face.id, true))">添加</button>
          <button v-if="!face.builtIn" type="button" @click="perform(() => cubeRegistryStore.removeCustomFace(face.id))">删除</button>
        </div>
        <h3>添加面</h3>
        <label><input v-model="codeMode" type="checkbox" /> 粘贴 JSON 配置</label>
        <form @submit.prevent="add">
          <template v-if="!codeMode">
            <label>标题<input v-model="title" maxlength="60" required /></label>
            <label>类型<select v-model="kind"><option value="memo">文本</option><option value="countdown">倒数日</option><option value="link">链接</option></select></label>
            <label>内容<input v-model="content" :type="kind === 'countdown' ? 'date' : 'text'" :placeholder="kind === 'link' ? 'https://…' : '输入内容'" maxlength="500" required /></label>
          </template>
          <template v-else>
            <p>仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。</p>
            <textarea v-model="code" rows="9" maxlength="10000" aria-label="面的 JSON 配置" spellcheck="false"></textarea>
          </template>
          <button type="submit">添加面</button>
        </form>
        <p v-if="error" role="alert">{{ error }}</p>
      </div>
      <footer><button type="button" @click="perform(() => cubeRegistryStore.resetDefaults())">恢复默认（仅音乐）</button><small>自定义配置保留，但退出轮播</small></footer>
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
