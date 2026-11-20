<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { saveWorkspaceWallpaper, useWorkspaceWallpaper, type WallpaperWorkspace } from '../wallpaper/workspace-wallpaper';
import { loadWorkspaceWallpaperOptions, resolveWorkspaceWallpaper, type WorkspaceWallpaperOption } from '../wallpaper/workspace-wallpaper-library';

const entries: Array<{ id: WallpaperWorkspace; label: string; state: ReturnType<typeof useWorkspaceWallpaper> }> = [
  { id: 'bilibili', label: 'B站收藏夹', state: useWorkspaceWallpaper('bilibili') },
  { id: 'todoist', label: 'Todoist', state: useWorkspaceWallpaper('todoist') },
  { id: 'github', label: 'GitHub', state: useWorkspaceWallpaper('github') },
];
const options = ref<WorkspaceWallpaperOption[]>([]);
const busy = ref<WallpaperWorkspace | null>(null);
const message = ref('');
let alive = true;
async function refreshLibrary(rescan = false) {
  try { const list = await loadWorkspaceWallpaperOptions(rescan); if (alive) options.value = list; }
  catch { if (alive) message.value = '读取壁纸库失败，请重新打开设置。'; }
}
function storageChanged(changes: Record<string, unknown>, area: string) {
  if (area === 'local' && changes.heroBackgroundHistory) void refreshLibrary();
}
onMounted(() => { void refreshLibrary(); if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(storageChanged); });
onUnmounted(() => { alive = false; if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(storageChanged); });
async function choose(entry: typeof entries[number], event: Event) {
  const input = event.target as HTMLSelectElement;
  const option = options.value.find(item => item.id === input.value);
  if (!option) return;
  busy.value = entry.id; message.value = '';
  try {
    const selection = await resolveWorkspaceWallpaper(option);
    await saveWorkspaceWallpaper(entry.id, { selection, image: null, name: option.title, enabled: true });
  } catch (error) {
    input.value = entry.state.value.value.selection?.sourceId || '';
    message.value = error instanceof Error ? error.message : '壁纸读取失败';
  } finally { busy.value = null; }
}
async function toggle(entry: typeof entries[number], event: Event) {
  const input = event.target as HTMLInputElement;
  const checked = input.checked;
  busy.value = entry.id; message.value = '';
  try { await saveWorkspaceWallpaper(entry.id, { enabled: checked }); }
  catch (error) { input.checked = !checked; message.value = error instanceof Error ? error.message : '设置保存失败'; }
  finally { busy.value = null; }
}
</script>

<template>
  <div class="workspace-wallpapers">
    <label>工作区背景 <em>WORKSPACE BACKGROUNDS</em></label>
    <p class="field-hint">从壁纸库或已连接的 Steam 工坊中选择，三个工作区各自独立，默认关闭；更换主界面壁纸不会影响这里。</p>
    <button type="button" class="workspace-wallpaper-refresh" @click="refreshLibrary(true)">刷新壁纸库</button>
    <div v-for="entry in entries" :key="entry.id" class="workspace-wallpaper-row">
      <strong>{{ entry.label }}</strong>
      <select :aria-label="`${entry.label}壁纸`" :value="entry.state.value.value.selection?.sourceId || ''" :disabled="!!busy" @change="choose(entry, $event)">
        <option value="">{{ entry.state.value.value.image ? `原图片：${entry.state.value.value.name}` : '选择已有壁纸' }}</option>
        <option v-for="option in options" :key="option.id" :value="option.id" :disabled="option.unavailable">{{ option.title }} · {{ option.kind }}</option>
        <option v-if="entry.state.value.value.selection && !options.some(o => o.id === entry.state.value.value.selection?.sourceId)" :value="entry.state.value.value.selection.sourceId">{{ entry.state.value.value.name }}（已保存）</option>
      </select>
      <label class="workspace-wallpaper-switch"><input type="checkbox" :checked="entry.state.value.value.enabled" :disabled="!!busy || (!entry.state.value.value.image && !entry.state.value.value.selection)" @change="toggle(entry, $event)"> 启用</label>
    </div>
    <p v-if="message" role="alert" class="field-hint">{{ message }}</p>
    <p v-for="entry in entries.filter(e => e.state.error.value)" :key="entry.id" role="alert" class="field-hint">{{ entry.label }}：{{ entry.state.error.value }}</p>
  </div>
</template>

<style scoped>
.workspace-wallpapers { display:grid; gap:9px; }
.workspace-wallpaper-row { display:flex; align-items:center; flex-wrap:wrap; gap:10px; padding:10px; border:1px solid var(--border); border-radius:9px; background:var(--surface); }
.workspace-wallpaper-row strong { min-width:100px; font-size:12px; }
.workspace-wallpaper-row select { flex:1; min-width:140px; max-width:100%; border:1px solid var(--border); border-radius:7px; background:var(--panel); color:var(--text); padding:6px; font-size:12px; }
.workspace-wallpaper-switch { display:flex; align-items:center; gap:4px; font-size:12px; white-space:nowrap; }
.workspace-wallpaper-refresh { justify-self:start; border:1px solid var(--border); border-radius:7px; background:var(--panel); color:var(--text); padding:5px 10px; cursor:pointer; }
</style>
