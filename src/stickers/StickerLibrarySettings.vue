<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { StickersService } from "../services/stickers.service";
import { createStickerBoardController } from "./sticker-board-store";
import { withStickersWrite } from "./module-state";
import { appDialog } from "../core/app-dialog.store";

const props = defineProps<{ active: boolean }>();
const controller = createStickerBoardController();
let alive = true;
const service = new StickersService(controller, () => alive && props.active && !document.hidden, withStickersWrite, 0);
service.isBoardPaging = false; // Settings needs metadata counts, not decoded images.
const state = controller.state;
const busy = ref(false), status = ref(""), bad = ref(false);
const restoreInput = ref<HTMLInputElement | null>(null);
const controlsDisabled = computed(() => !props.active || busy.value || state.loading);
const hasDirectory = computed(() => state.storageKind === "directory" && Boolean(state.rootName));
service.onToast = (message, error) => { if (alive) { status.value = message; bad.value = error; } };
async function run(operation: () => Promise<void>, trackWrite = true) {
  if (!alive || controlsDisabled.value) return;
  busy.value = true; status.value = ""; bad.value = false;
  try { if (trackWrite) await withStickersWrite(operation); else await operation(); }
  catch (error: any) { if (alive && error?.name !== "AbortError") { status.value = error?.message || "操作未确认，请重读核对"; bad.value = true; } }
  finally { if (alive) busy.value = false; }
}
function choose() { void run(() => service.chooseRootFolder()); }
function authorize() { void run(() => service.authorizeOrChooseRoot()); }
function refresh() { void run(() => service.loadLibrary(), false); }
function revealImages() {
  void run(async () => {
    if (!await appDialog.confirm({ title: "显示旧版隐藏图片", message: "仅清除旧版图片隐藏标记；只显示磁盘上仍存在的原图，不能恢复已经删除的文件。是否继续？", danger: false })) return;
    if (!alive || !props.active) return;
    await service.revealHiddenImages();
    status.value = "已清除移除标记；磁盘上仍可读取的图片会重新显示。";
  });
}
function exportBackup() {
  void run(async () => {
    const data = await service.exportIndexBackup();
    if (!alive || !props.active) return;
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "sticker-library-index.json"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.value = "索引备份已交给浏览器保存；不包含原图或目录权限，请单独备份原图。"; bad.value = false;
  });
}
async function restoreBackup(event: Event) {
  const input = event.target as HTMLInputElement, file = input.files?.[0]; input.value = "";
  if (!file || busy.value || !props.active) return;
  if (file.size > 8 * 1024 * 1024) { status.value = "索引备份不能超过8MB"; bad.value = true; return; }
  await run(async () => {
    const text = await file.text();
    const confirmed = await appDialog.confirm({ title: "恢复图库分类索引", danger: true,
      message: "将替换当前图库的分类与移除标记。仅按相对路径、文件大小及修改时间匹配，不保证内容相同或自动识别外部改名；未匹配记录保留为失联索引。请先导出当前索引备份。原图不移动、不删除，是否继续？" });
    if (!confirmed || !alive || !props.active) return;
    await service.loadLibrary(); // Refresh the physical manifest before matching an imported backup.
    const result = await service.restoreIndexBackup(text);
    status.value = `索引已恢复：匹配 ${result.matched} 张，${result.unmatched} 条未匹配。未匹配不代表原图已删除。`;
  });
}
function visible() { if (document.hidden) service.pauseReads(); else if (props.active) service.activate(); }
watch(() => props.active, active => { if (active) service.activate(); else service.pauseReads(); });
onMounted(() => { service.init(); document.addEventListener("visibilitychange", visible); });
onBeforeUnmount(() => { alive = false; service.dispose(); document.removeEventListener("visibilitychange", visible); });
</script>

<template>
  <div class="settings-subgroup library-settings" :aria-busy="busy || state.loading">
    <div v-if="hasDirectory" class="library-folder-row">
      <div class="library-folder-info">
        <span class="hint">图片文件夹</span>
        <div class="library-folder-summary">
          <strong :title="state.rootName">{{ state.rootName }}</strong>
          <span v-if="state.loading" class="hint">正在读取…</span>
          <span v-else-if="state.needsReadPermission" class="hint">需要重新授权</span>
          <span v-else-if="state.libraryImageCount !== null" class="hint">{{ state.libraryImageCount }} 张图片</span>
          <span v-else class="hint">数量未读取</span>
        </div>
      </div>
      <div class="library-main-actions">
        <button v-if="state.needsReadPermission" type="button" class="btn-secondary" :disabled="controlsDisabled" @click="authorize">重新授权</button>
        <button type="button" class="btn-secondary" :disabled="controlsDisabled" @click="choose">更换文件夹</button>
        <button type="button" class="library-refresh" aria-label="刷新图片列表" title="刷新图片列表" :disabled="controlsDisabled" @click="refresh">↻</button>
      </div>
    </div>
    <div v-else class="library-empty">
      <p class="hint">{{ state.loading ? "正在读取图片文件夹…" : "选择表情包使用的图片文件夹，原图保留在磁盘中。" }}</p>
      <button type="button" class="btn-secondary" :disabled="controlsDisabled" @click="choose">选择图片文件夹</button>
      <p v-if="state.storageKind === 'indexeddb' && state.libraryImageCount" class="hint">当前使用浏览器内置图片库，共 {{ state.libraryImageCount }} 张；选择文件夹不会搬动这些图片。</p>
    </div>

    <details v-if="hasDirectory" class="library-advanced">
      <summary>高级管理</summary>
      <div class="library-actions">
        <button type="button" class="btn-secondary" :disabled="controlsDisabled" @click="exportBackup">导出分类索引</button>
        <button type="button" class="btn-secondary" :disabled="controlsDisabled || !state.hasFolder" @click="restoreInput?.click()">恢复分类索引</button>
        <button type="button" class="btn-secondary" :disabled="controlsDisabled || !state.hasFolder" @click="revealImages">显示旧版隐藏图片</button>
      </div>
      <p class="hint">索引备份只保存分类关系，不包含原图。恢复会替换当前分类，操作前仍需确认。</p>
      <p class="hint">添加或删除图片时才会按需申请写权限；删除会移除磁盘原图，通常不进回收站。</p>
      <p class="hint">“显示旧版隐藏图片”只显示磁盘上仍存在的图片，不能恢复已经删除的文件。</p>
    </details>
    <input ref="restoreInput" type="file" accept="application/json,.json" :disabled="controlsDisabled" hidden @change="restoreBackup" />
    <p v-if="status" class="hint" :class="{ 'library-error': bad }" role="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.library-folder-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.library-folder-info { min-width:0; flex:1 1 180px; }
.library-folder-summary { display:flex; align-items:baseline; gap:10px; min-width:0; margin-top:4px; }
.library-folder-summary strong { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--heading); font-size:14px; }
.library-folder-summary .hint { flex:none; margin:0; }
.library-main-actions, .library-actions { display:flex; align-items:center; flex-wrap:wrap; gap:8px; }
.library-refresh { display:inline-grid; place-items:center; width:30px; height:30px; padding:0; border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--text); font:inherit; font-size:18px; cursor:pointer; }
.library-refresh:hover:not(:disabled) { background:var(--surface-hover); }
.library-refresh:disabled { opacity:.5; cursor:default; }
.library-refresh:focus-visible, summary:focus-visible { outline:2px solid var(--accent, var(--text)); outline-offset:2px; }
.library-empty .hint { margin:0 0 10px; }
.library-empty button + .hint { margin:10px 0 0; }
.library-advanced { margin-top:16px; border-top:1px solid var(--border); padding-top:12px; }
.library-advanced summary { width:fit-content; cursor:pointer; color:var(--muted); font-size:12px; }
.library-actions { margin:12px 0; }
.library-error { color:var(--danger, var(--text)); }
</style>
