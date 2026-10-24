<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { StickersService } from "../services/stickers.service";
import { createStickerBoardController, type StickerCardItem } from "../stickers/sticker-board-store";
import { withStickersWrite } from "../stickers/module-state";
import { windowManagerController } from "../core/window-manager.store";
import { settingsController } from "../settings/store";

const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });
const emit = defineEmits<{ close: []; select: [image: Blob] }>();
const controller = createStickerBoardController(), state = controller.state;
const pageVisible = ref(!document.hidden), busy = ref(false), notice = ref("");
const fileInputRef = ref<HTMLInputElement | null>(null);
let alive = true, version = 0;
const active = () => alive && props.active && pageVisible.value;
const service = new StickersService(controller, active, withStickersWrite, 12);
service.onToast = text => { if (alive) notice.value = text; };
const groups = computed(() => state.folders.filter(group => group.path !== ""));
let detachActions: (() => void) | undefined;
async function selectGroup(path: string) {
  if (!active() || busy.value) return;
  notice.value = "";
  try { await controller.dispatch("select-folder", path); }
  catch { notice.value = "分类读取失败，请刷新图库"; }
}
async function pick(sticker: StickerCardItem) {
  if (!active() || busy.value) return;
  const current = version;
  busy.value = true;
  try {
    const image = await service.readItemBlob(sticker);
    if (!active() || current !== version) return;
    emit("select", image); emit("close");
  } catch { if (active()) notice.value = "原图读取失败，请检查图库读取权限"; }
  finally { if (alive) busy.value = false; }
}
async function addFiles(event: Event) {
  const input = event.target as HTMLInputElement, files = Array.from(input.files || []);
  input.value = "";
  if (!active() || busy.value || !files.length) return;
  if (files.length > 50) { notice.value = "一次最多导入50张，请分批选择"; return; }
  busy.value = true;
  try {
    await withStickersWrite(async () => {
      if (state.storageKind === "indexeddb") await service.saveFilesToIndexedDb(files);
      else {
        const target = service.getActiveTargetHandle();
        if (!target) throw new Error("图库需要重新授权，未转存内置库");
        await service.saveFilesToDir(target.handle, files, target.name);
      }
    });
    if (active()) notice.value = "图片已加入同一图库，未发送聊天消息。";
  } catch { if (active()) notice.value = "保存未完成，可能已有部分图片写入；请核对目录与权限，不要重复导入"; }
  finally { if (alive) busy.value = false; }
}
async function chooseFiles() {
  if (!active() || busy.value || state.loading) return;
  const target = service.getActiveTargetHandle();
  if (state.storageKind === "directory" && (!target || !await service.ensureHandlePermission(target.handle))) {
    notice.value = "请先在图库设置中授权读取/添加图片"; return;
  }
  if (active()) fileInputRef.value?.click();
}
function openSettings() { emit("close"); settingsController.open("storage", "stickers"); windowManagerController.activate("settings"); }
function openWorkspace() { emit("close"); windowManagerController.activate("stickers"); }
function pause() { version++; service.pauseReads(); service.clearBlobUrlCache(); }
function visibility() { pageVisible.value = !document.hidden; if (active()) service.activate(); else pause(); }
watch(() => props.active, enabled => { if (enabled && pageVisible.value) service.activate(); else pause(); });
onMounted(() => {
  service.enableBoardPaging(); detachActions = service.attachBoard(); service.init();
  document.addEventListener("visibilitychange", visibility);
});
onBeforeUnmount(() => { alive = false; pause(); detachActions?.(); service.dispose(); document.removeEventListener("visibilitychange", visibility); });
</script>

<template>
  <div class="chat-sticker-popover" @click.stop>
    <header class="sticker-popover-head">
      <div class="sticker-head-left"><span class="sticker-head-title">我的表情包</span><span class="sticker-head-count">({{ state.totalCount }})</span></div>
      <div class="sticker-head-actions">
        <button type="button" class="sticker-act-btn" :disabled="busy || state.loading" @click="chooseFiles">＋ 添加</button>
        <button type="button" class="sticker-act-btn" @click="openSettings">图库设置</button>
        <button type="button" class="sticker-act-btn" @click="openWorkspace">表情库</button>
        <button type="button" class="sticker-close-btn" aria-label="关闭表情面板" @click="emit('close')">✕</button>
      </div>
    </header>
    <div class="sticker-groups-bar">
      <button type="button" class="sticker-group-pill" :class="{ active: state.activePath === '' }" :disabled="busy || state.loading" @click="selectGroup('')">全部</button>
      <button v-for="group in groups" :key="group.path" type="button" class="sticker-group-pill" :class="{ active: state.activePath === group.path }" :disabled="busy || state.loading" @click="selectGroup(group.path)">{{ `${'－'.repeat(Math.max(0, group.depth - 1))}${group.name}` }}</button>
    </div>
    <p class="picker-hint">使用本地图库。点击发送；较大静态图会压缩，动图最多1MB。</p>
    <p v-if="notice" class="picker-hint" role="status">{{ notice }}</p>
    <div class="sticker-grid-wrap">
      <div v-if="state.loading" class="sticker-state-empty">正在读取图库…</div>
      <div v-else-if="!state.items.length" class="sticker-state-empty">{{ state.emptyText || '当前分类没有图片，可在图库设置中选择文件夹。' }}</div>
      <div v-else class="sticker-grid">
        <button v-for="sticker in state.items" :key="sticker.id" type="button" class="sticker-grid-item" :disabled="busy" :title="'发送图片：' + sticker.file" @click="pick(sticker)">
          <img v-if="sticker.url" :src="sticker.url" :alt="sticker.file" class="sticker-img" loading="lazy" />
          <span class="sticker-name-tag">{{ sticker.file }}</span>
        </button>
      </div>
    </div>
    <nav v-if="state.totalPages > 1" class="picker-pagination" aria-label="表情包分页">
      <button type="button" :disabled="busy || state.loading || state.currentPage <= 1" @click="service.prevPage()">上一页</button>
      <span>{{ state.currentPage }} / {{ state.totalPages }}</span>
      <button type="button" :disabled="busy || state.loading || state.currentPage >= state.totalPages" @click="service.nextPage()">下一页</button>
    </nav>
    <input ref="fileInputRef" type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/bmp" multiple hidden @change="addFiles" />
  </div>
</template>

<style scoped>
.picker-hint { margin:6px 12px; color:var(--muted); font-size:12px; line-height:1.5; }
.picker-pagination { display:flex; align-items:center; justify-content:center; gap:10px; padding:8px; color:var(--text); }
.picker-pagination button { background:var(--panel); color:var(--text); border:1px solid var(--border); border-radius:6px; padding:5px 8px; }
.picker-pagination button:disabled { opacity:.5; }
.chat-sticker-popover {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  width: 380px;
  max-width: calc(100vw - 32px);
  height: 320px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 12px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  z-index: 120;
  overflow: hidden;
  animation: stickerPopIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes stickerPopIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.sticker-popover-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: var(--surface, rgba(0, 0, 0, 0.03));
}

.sticker-head-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sticker-head-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--heading, #0f172a);
}

.sticker-head-count {
  font-size: 11px;
  color: var(--muted, #64748b);
}

.sticker-head-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sticker-act-btn {
  background: transparent;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  cursor: pointer;
  transition: all 0.12s ease;
}

.sticker-act-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  border-color: #10b981;
  color: #10b981;
}

.sticker-close-btn {
  background: transparent;
  border: 0;
  font-size: 12px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 4px;
}

.sticker-close-btn:hover {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}

/* 分组 Pills 栏 */
.sticker-groups-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  overflow-x: auto;
  white-space: nowrap;
  background: var(--panel, #ffffff);
}

.sticker-group-pill {
  background: var(--surface, rgba(0, 0, 0, 0.04));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 14px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text, #334155);
  cursor: pointer;
  transition: all 0.12s ease;
  flex-shrink: 0;
}

.sticker-group-pill:hover {
  border-color: #10b981;
  color: #10b981;
}

.sticker-group-pill.active {
  background: #10b981;
  border-color: #10b981;
  color: #ffffff;
}

/* 表情网格容器 */
.sticker-grid-wrap {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px;
  background: var(--panel, #ffffff);
}

.sticker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 8px;
}

.sticker-grid-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.sticker-grid-item:hover {
  transform: scale(1.08);
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  z-index: 2;
}

.sticker-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.sticker-name-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px 2px;
  opacity: 0;
  transition: opacity 0.12s ease;
}

.sticker-grid-item:hover .sticker-name-tag {
  opacity: 1;
}

/* 空状态 */
.sticker-state-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--muted, #64748b);
  font-size: 12px;
}

.empty-emoji {
  font-size: 32px;
  margin: 0;
}

.empty-text {
  margin: 0;
}

.empty-add-btn {
  margin-top: 4px;
  background: #10b981;
  color: #ffffff;
  border: 0;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  transition: background 0.12s ease;
}

.empty-add-btn:hover {
  background: #059669;
}
</style>
