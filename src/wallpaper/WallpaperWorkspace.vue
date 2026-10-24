<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch } from "vue";
import { WallpaperService, DEFAULT_MOUNTAIN_VALUE, type WallpaperHistoryItem } from "../services/wallpaper.service";
import { windowManagerController } from "../core/window-manager.store";
import { useWindowDraggable } from "../core/useWindowDraggable";
import { wallpaperModuleState, onWallpaperPause, withWallpaperWrite } from "./module-state";
const pageVisible = ref(!document.hidden);
const active = computed(() => wallpaperModuleState.visible && pageVisible.value);
const state = reactive({ history: [] as WallpaperHistoryItem[], currentValue: null as any, statusText: "隐藏暂停库内预览；退出窗口保留当前壁纸。" });
const ready = ref(false), loading = ref(false);
let disposed = false, historyVersion = 0, previewVersion = 0, firstRequested = false;
let previewAbort: AbortController | undefined;
const isDraggingOver = ref(false), currentPage = ref(1), PAGE_SIZE = 8;
const editingId = ref<string | null>(null), editingTitle = ref(""), confirmingDelete = ref<string | null>(null);
const previewMap = reactive<Record<string, string>>({});
const { panelRef, headerRef, initialStyle, onHeaderPointerDown, bringToFront, stopInteractions } = useWindowDraggable({
  windowId: "wallpaper", storageKey: "lw_wallpaper_workspace_pos", defaultWidth: 620,
  defaultHeight: 520, minWidth: 480, minHeight: 380, resizable: false, active: () => active.value
});
const getWindowElement = () => panelRef.value;
const BUILTIN_ITEMS: any[] = [
  {
    id: "builtin-mountain",
    title: "默认山景 (Mountains)",
    kind: "内置",
    value: DEFAULT_MOUNTAIN_VALUE,
    thumb: "assets/newtab-mountains.png",
    isBuiltin: true
  },
  {
    id: "builtin-pure-dark",
    title: "极简深黑 (Pure Dark)",
    kind: "纯色",
    value: null,
    style: "background: #090d16;",
    isPure: true
  },
  {
    id: "builtin-cyber-gradient",
    title: "赛博霓虹 (Cyber Neon)",
    kind: "渐变",
    value: { type: "style", style: "background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 45%), #090d16;" },
    style: "background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 45%), #090d16;",
    isGradient: true
  },
  {
    id: "builtin-aurora",
    title: "极光翡翠 (Aurora Green)",
    kind: "渐变",
    value: { type: "style", style: "background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.28), transparent 60%), #0c141f;" },
    style: "background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.28), transparent 60%), #0c141f;",
    isGradient: true
  }
];


function getDisplayTitle(item: any): string { return item.title || "未命名壁纸"; }
const allWallpapers = computed(() => [...BUILTIN_ITEMS, ...state.history]);
const totalPages = computed(() => Math.ceil(allWallpapers.value.length / PAGE_SIZE) || 1);
const paginatedList = computed(() => allWallpapers.value.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE));
function isCurrentActive(item: any): boolean {
  if (!ready.value) return false;
  if (item.id === "builtin-mountain") return state.currentValue === DEFAULT_MOUNTAIN_VALUE;
  if (item.isPure) return !state.currentValue || state.currentValue === "none" || state.currentValue?.type === "none";
  return state.currentValue && item.value && JSON.stringify(state.currentValue) === JSON.stringify(item.value);
}
function stopPreviewMedia() {
  panelRef.value?.querySelectorAll("video").forEach(video => { video.pause(); video.removeAttribute("src"); video.load(); });
}
function cancelPreviews(stopMedia = false) {
  previewVersion++; previewAbort?.abort(); previewAbort = undefined;
  if (stopMedia) stopPreviewMedia();
}
function revokePreviews() {
  for (const id of Object.keys(previewMap)) { URL.revokeObjectURL(previewMap[id]); delete previewMap[id]; }
}
function pause() {
  historyVersion++; loading.value = false; cancelPreviews(true); stopInteractions();
  isDraggingOver.value = false; confirmingDelete.value = null;
  window.removeEventListener("keydown", onKeydown);
}
const detachPause = onWallpaperPause(pause);
async function preloadPreviews() {
  if (!active.value || disposed || !ready.value) return;
  cancelPreviews();
  const generation = previewVersion, request = new AbortController(); previewAbort = request;
  const items = [...paginatedList.value], needed = new Set(items.map(item => item.id));
  for (const id of Object.keys(previewMap)) if (!needed.has(id)) { URL.revokeObjectURL(previewMap[id]); delete previewMap[id]; }
  try {
    for (const item of items) {
      if (!active.value || disposed || generation !== previewVersion) return;
      if (item.thumb || item.style || item.previewUrl || previewMap[item.id]) continue;
      const key = item.value?.storageKey;
      if (!key && !(isCurrentActive(item) && item.value?.type === "db")) continue;
      const url = await WallpaperService.createLibraryPreviewUrl(key, request.signal);
      if (!url) continue;
      if (disposed || !active.value || generation !== previewVersion) { URL.revokeObjectURL(url); return; }
      previewMap[item.id] = url;
    }
  } catch { if (!disposed && generation === previewVersion && !request.signal.aborted) state.statusText = "部分预览不可用，请手动刷新；未自动重试。"; }
  finally { if (previewAbort === request) previewAbort = undefined; }
}
async function loadHistory(afterWrite = false) {
  if (disposed || (!afterWrite && !active.value)) return;
  const version = ++historyVersion; loading.value = true;
  try {
    const data = await WallpaperService.loadHistory();
    if (disposed || version !== historyVersion || (!afterWrite && !active.value)) {
      if (afterWrite) throw new Error("重读期间库已变化，请刷新核对");
      return;
    }
    state.history = data.history; state.currentValue = data.currentValue; ready.value = true;
    currentPage.value = Math.min(currentPage.value, totalPages.value);
    if (active.value) void preloadPreviews();
  } catch {
    if (!disposed && version === historyVersion) { ready.value = false; state.statusText = "库读取失败，已禁止修改；请手动刷新。"; }
    if (afterWrite) throw new Error("写入后重读失败");
  } finally { if (version === historyVersion) loading.value = false; }
}
function initialRead() { if (!firstRequested && active.value) { firstRequested = true; void loadHistory(); } }
function getPreview(item: any): string | null { return item.thumb || item.previewUrl || previewMap[item.id] || null; }
function prevPage() { if (currentPage.value > 1) currentPage.value--; }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++; }
watch(currentPage, () => { confirmingDelete.value = null; void preloadPreviews(); });
watch(active, value => {
  if (!value) pause();
  else { window.addEventListener("keydown", onKeydown); if (!firstRequested) initialRead(); else void preloadPreviews(); }
}, { flush: "sync" });
function visibility() { pageVisible.value = !document.hidden; }
function onKeydown(event: KeyboardEvent) { if (active.value && event.key === "Escape" && !editingId.value) handleClose(); }
function storageChanged(changes: Record<string, any>, area: string) {
  if (area !== "local") return;
  if (changes.heroBackground) state.currentValue = changes.heroBackground.newValue;
  if (changes.heroBackgroundHistory) {
    historyVersion++; loading.value = false; cancelPreviews(); revokePreviews();
    state.statusText = "壁纸库已变化，需要时手动刷新；草稿保留。";
  }
}
onMounted(() => {
  windowManagerController.register({ id: "wallpaper", title: "壁纸模块", icon: "🖼️", getElement: getWindowElement });
  document.addEventListener("visibilitychange", visibility);
  if (typeof chrome !== "undefined") chrome.storage?.onChanged?.addListener(storageChanged);
  if (active.value) { window.addEventListener("keydown", onKeydown); initialRead(); }
});
onBeforeUnmount(() => {
  disposed = true; pause(); detachPause(); revokePreviews();
  document.removeEventListener("visibilitychange", visibility);
  if (typeof chrome !== "undefined") chrome.storage?.onChanged?.removeListener(storageChanged);
  windowManagerController.unregister("wallpaper", getWindowElement);
});
async function mutate(operation: () => Promise<void>): Promise<boolean> {
  if (!active.value || !ready.value || disposed) return false;
  if (wallpaperModuleState.pendingWrites) { state.statusText = "壁纸操作正在处理，请稍候；没有自动排队。"; return false; }
  cancelPreviews(); historyVersion++;
  try {
    await withWallpaperWrite(async () => { await operation(); await loadHistory(true); });
    if (!disposed) state.statusText = "操作与重读结束，请核对首页效果；不代表媒体已加载完成。";
    return true;
  } catch {
    if (!disposed) state.statusText = "操作未完整完成，配置或部分文件可能已保存/删除，请刷新核对；未自动重试。";
    return false;
  }
}
function handleSelect(item: any) {
  if (editingId.value) return;
  void mutate(async () => {
    if (item.id === "builtin-mountain") await WallpaperService.setMountain();
    else if (item.isPure) await WallpaperService.clearWallpaper();
    else await WallpaperService.setWallpaper(item.value);
  });
}
function handleDeleteWallpaper(item: WallpaperHistoryItem) {
  if (wallpaperModuleState.pendingWrites) return;
  if (confirmingDelete.value !== item.id) {
    confirmingDelete.value = item.id;
    state.statusText = isCurrentActive(item) ? "再次点击确认删除：当前壁纸将恢复主题纯色。" : "再次点击确认删除此收藏；隐藏或翻页会取消确认。";
    return;
  }
  confirmingDelete.value = null;
  void mutate(() => WallpaperService.deleteHistory(item));
}
function startRename(item: any, event: MouseEvent) {
  event.stopPropagation();
  if (!ready.value || wallpaperModuleState.pendingWrites) return;
  editingId.value = item.id; editingTitle.value = getDisplayTitle(item);
}
async function saveRename(item: any, event?: Event) {
  event?.stopPropagation(); const id = editingId.value, title = editingTitle.value.trim();
  if (!id || !title) return;
  if (await mutate(() => WallpaperService.updateHistoryTitle(item.id, title))) { if (!disposed && editingId.value === id) editingId.value = null; }
}
function cancelRename(event?: Event) { event?.stopPropagation(); editingId.value = null; }
function handleClose() { void windowManagerController.close("wallpaper"); }
async function importFiles(files: File[]) {
  for (let i = 0; i < files.length; i++) await WallpaperService.importBackgroundFile(files[i], { apply: i === files.length - 1 });
}
function handlePickImage() { void mutate(async () => { await importFiles(await WallpaperService.chooseBackgroundFile("image")); }); }
function handlePickVideo() { void mutate(async () => { await importFiles(await WallpaperService.chooseBackgroundFile("video")); }); }
function handlePickFolder() { void mutate(async () => { await WallpaperService.importWallpaperDirectory(); }); }
function handleDragOver(event: DragEvent) { if (active.value && event.dataTransfer?.types.includes("Files")) isDraggingOver.value = true; }
function handleDragLeave() { isDraggingOver.value = false; }
function handleDrop(event: DragEvent) {
  isDraggingOver.value = false;
  const files = Array.from(event.dataTransfer?.files || []);
  if (files.length) void mutate(() => importFiles(files));
}
</script>

<template>
  <section
    id="wallpaper-workspace"
    ref="panelRef"
    class="wallpaper-workspace"
    :style="initialStyle"
    v-show="wallpaperModuleState.visible"
    :class="{ dragover: isDraggingOver }"
    aria-label="壁纸工作台"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="bringToFront"
  >
    <!-- 可拖拽顶部工作区标题栏 -->
    <header
      ref="headerRef"
      class="wallpaper-ws-head"
      title="按住此处可自由拖拽窗口"
      @pointerdown="onHeaderPointerDown"
    >
      <div class="wallpaper-ws-title">
        <span class="wallpaper-ws-icon">🖼️</span>
        <h3>壁纸工作室</h3>
      </div>

      <div class="wallpaper-ws-actions" @pointerdown.stop>
        <button type="button" class="wallpaper-ws-btn import-btn" :disabled="!ready || wallpaperModuleState.pendingWrites > 0" @click="handlePickFolder">文件夹</button>
        <button
          class="wallpaper-ws-btn import-btn"
          type="button"
          title="导入本地图片"
          @click="handlePickImage"
        >
          <span>＋</span><b>导入图片</b>
        </button>
        <button
          class="wallpaper-ws-btn import-btn"
          type="button"
          title="导入动态视频壁纸 (MP4/WebM)"
          @click="handlePickVideo"
        >
          <span>▶</span><b>导入视频</b>
        </button>
        <button
          class="wallpaper-ws-close no-drag"
          type="button"
          title="关闭 (Esc)"
          aria-label="关闭"
          @pointerdown.stop
          @click.stop="handleClose"
        >
          ✕
        </button>
      </div>
    </header>

    <p class="wallpaper-library-status" role="status">{{ state.statusText }}</p>
    <p class="wallpaper-library-status">隐藏暂停库内预览，保留页码/重命名草稿；退出保留首页壁纸。导入/修改/应用时只可隐藏，不能退出或重载。</p>
    <button type="button" :disabled="wallpaperModuleState.pendingWrites > 0 || loading" @click="loadHistory()">刷新壁纸库</button>
    <!-- 一行刚好两个壁纸的纵向卡片流 -->
    <div class="wallpaper-ws-body">
      <div class="wallpaper-ws-grid">
        <article
          v-for="item in paginatedList"
          :key="item.id"
          class="wallpaper-card"
          :class="{ active: isCurrentActive(item) }"
          @click="handleSelect(item)"
        >
          <div
            class="wallpaper-thumb"
            :style="item.style ? item.style : (item.thumb ? { backgroundImage: `url(${item.thumb})` } : {})"
          >
            <!-- 视频壁纸专属微缩播放预览 -->
            <video
              v-if="active && item.kind === '视频' && getPreview(item)"
              :src="getPreview(item)!"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
            />
            <!-- 图片壁纸预览 -->
            <img
              v-else-if="active && getPreview(item)"
              :src="getPreview(item)!"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <!-- 无预览回退占位 -->
            <div v-else-if="!item.thumb && !item.style" class="wallpaper-thumb-fallback">
              <span>{{ item.kind === '视频' ? '▶' : '🖼️' }}</span>
            </div>

            <span class="wallpaper-badge" :class="item.kind">{{ item.kind || '本地' }}</span>
            <span class="wallpaper-status-pill">{{ isCurrentActive(item) ? '✓ 已选配置' : '使用' }}</span>

            <!-- 用户自导入项显示删除按钮 -->
            <button
              v-if="!item.isBuiltin && !item.isPure && !item.isGradient"
              class="wallpaper-delete-btn"
              type="button"
:title="isCurrentActive(item) ? '删除当前壁纸会恢复纯色，需再次确认' : '删除该壁纸，需再次确认'"
              @click.stop="handleDeleteWallpaper(item)"
            >
              {{ confirmingDelete === item.id ? "确认" : "×" }}
            </button>
          </div>

          <div class="wallpaper-meta">
            <!-- 标题展示与重命名交互 -->
            <div class="wallpaper-title-row">
              <template v-if="editingId === item.id">
                <input
                  v-model="editingTitle"
                  class="wallpaper-rename-input"
                  type="text"
                  maxlength="40"
                  autofocus
                  @click.stop
                  @keydown.enter="saveRename(item, $event)"
                  @keydown.esc="cancelRename($event)"
                />
                <button class="wallpaper-rename-action save" type="button" @click.stop="saveRename(item, $event)">✓</button>
                <button class="wallpaper-rename-action cancel" type="button" @click.stop="cancelRename($event)">✕</button>
              </template>
              <template v-else>
                <strong :title="item.title">{{ getDisplayTitle(item) }}</strong>
                <button
                  v-if="!item.isBuiltin && !item.isPure && !item.isGradient"
                  class="wallpaper-rename-trigger"
                  type="button"
                  title="点击给该壁纸取名/重命名"
                  @click.stop="startRename(item, $event)"
                >
                  ✏️
                </button>
              </template>
            </div>
            <small>{{ item.kind }}壁纸 · 点击即刻更换</small>
          </div>
        </article>
      </div>

      <!-- 拖拽上传覆盖层 -->
      <div v-if="isDraggingOver" class="wallpaper-dragover-mask">
        <div class="wallpaper-dragover-box">
          <span class="wallpaper-dragover-icon">📥</span>
          <h3>松开即可导入壁纸</h3>
          <p>支持 JPG, PNG, WebP, GIF 图片与 MP4, WebM 视频</p>
        </div>
      </div>
    </div>

    <!-- 底部每页 8 个的翻页控制器 -->
    <footer class="wallpaper-ws-footer">
      <div class="wallpaper-ws-pager">
        <button
          type="button"
          class="wallpaper-pager-btn"
          :disabled="currentPage <= 1"
          @click="prevPage"
        >
          ‹ 上一页
        </button>
        <span class="wallpaper-pager-text">第 {{ currentPage }} / {{ totalPages }} 页</span>
        <button
          type="button"
          class="wallpaper-pager-btn"
          :disabled="currentPage >= totalPages"
          @click="nextPage"
        >
          下一页 ›
        </button>
      </div>
      <small class="wallpaper-ws-total">共 {{ allWallpapers.length }} 款壁纸</small>
    </footer>
  </section>
</template>

<style scoped>
.wallpaper-library-status { margin:4px 12px; font-size:11px; line-height:1.4; color:var(--muted); }
.wallpaper-workspace {
  position: fixed;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  background: var(--panel, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  contain: layout paint;
  user-select: none !important;
  -webkit-user-select: none !important;
  opacity: 1;
}

.wallpaper-ws-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  background: var(--surface, #1e293b);
  cursor: move;
  flex-shrink: 0;
}

.wallpaper-ws-title {
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.wallpaper-ws-icon {
  font-size: 18px;
}

.wallpaper-ws-title h3 {
  margin: 0;
  font-size: 13.5px;
  font-weight: 750;
  color: var(--heading, #ffffff);
}

.wallpaper-ws-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wallpaper-ws-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: var(--surface, rgba(255, 255, 255, 0.06));
  color: var(--text, #f1f5f9);
  font-size: 11px;
  cursor: pointer;
  transition: background 0.12s ease;
}

.wallpaper-ws-btn.import-btn {
  border-color: rgba(56, 189, 248, 0.4);
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  font-weight: 600;
}

.wallpaper-ws-btn:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.15));
}

.wallpaper-ws-close {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: transparent;
  color: var(--muted, #94a3b8);
  cursor: pointer;
  font-size: 11px;
  transition: background 0.12s ease;
}

.wallpaper-ws-close:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
}

.wallpaper-ws-body {
  position: relative;
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  contain: layout paint;
}

/* 一行刚好两个壁纸的精致双列网格 */
.wallpaper-ws-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.wallpaper-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid transparent;
  background: var(--surface, rgba(255, 255, 255, 0.04));
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.12s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.wallpaper-card:hover {
  border-color: rgba(56, 189, 248, 0.45);
}

.wallpaper-card.active {
  border-color: #38bdf8;
  box-shadow: 0 0 0 1px #38bdf8;
}

.wallpaper-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 6px 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.wallpaper-thumb video,
.wallpaper-thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wallpaper-thumb-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.2);
}

.wallpaper-badge {
  position: relative;
  z-index: 2;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.wallpaper-badge.builtin {
  background: #059669;
  color: #fff;
}

.wallpaper-badge.pure {
  background: #475569;
  color: #fff;
}

.wallpaper-badge.gradient {
  background: #7c3aed;
  color: #fff;
}

.wallpaper-badge.custom {
  background: #0284c7;
  color: #fff;
}

.wallpaper-status-pill {
  position: relative;
  z-index: 2;
  font-size: 9.5px;
  font-weight: 650;
  padding: 2px 6px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: #f1f5f9;
}

.wallpaper-card.active .wallpaper-status-pill {
  background: #38bdf8;
  color: #0f172a;
}

.wallpaper-delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 11px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
}

.wallpaper-card:hover .wallpaper-delete-btn {
  opacity: 1;
}

.wallpaper-delete-btn:hover {
  background: #ef4444;
}

.wallpaper-meta {
  padding: 6px 10px 8px;
}

.wallpaper-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.wallpaper-title-row strong {
  display: block;
  font-size: 11.5px;
  color: var(--heading, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.wallpaper-rename-trigger {
  opacity: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  padding: 0 2px;
  transition: opacity 0.15s ease;
}

.wallpaper-card:hover .wallpaper-rename-trigger {
  opacity: 0.85;
}

.wallpaper-rename-trigger:hover {
  opacity: 1;
  transform: scale(1.15);
}

.wallpaper-rename-input {
  flex: 1;
  height: 22px;
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid #38bdf8;
  background: var(--surface, #1e293b);
  color: var(--heading, #fff);
  font-size: 11px;
  outline: none;
}

.wallpaper-rename-action {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: none;
  font-size: 10px;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.wallpaper-rename-action.save {
  background: #10b981;
  color: #fff;
}

.wallpaper-rename-action.cancel {
  background: rgba(255, 255, 255, 0.15);
  color: var(--muted, #cbd5e1);
}

.wallpaper-meta small {
  color: var(--dim, #94a3b8);
  font-size: 10px;
}

/* 底部翻页栏 */
.wallpaper-ws-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  background: var(--surface, #1e293b);
  flex-shrink: 0;
}

.wallpaper-ws-pager {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wallpaper-pager-btn {
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: var(--surface, rgba(255, 255, 255, 0.05));
  color: var(--text, #cbd5e1);
  font-size: 11px;
  cursor: pointer;
}

.wallpaper-pager-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.wallpaper-pager-text {
  font-size: 11px;
  color: var(--dim, #94a3b8);
}

.wallpaper-ws-total {
  font-size: 10.5px;
  color: var(--dim, #94a3b8);
}

/* 拖拽上传覆盖层 */
.wallpaper-dragover-mask {
  position: absolute;
  inset: 10px;
  border-radius: 10px;
  border: 2px dashed #38bdf8;
  background: rgba(15, 23, 42, 0.95);
  display: grid;
  place-items: center;
  z-index: 10;
}

.wallpaper-dragover-box {
  text-align: center;
}

.wallpaper-dragover-icon {
  font-size: 32px;
}

.wallpaper-dragover-box h3 {
  margin: 6px 0 2px;
  color: #38bdf8;
  font-size: 14px;
}

.wallpaper-dragover-box p {
  color: #94a3b8;
  font-size: 11px;
}

/* 亮色模式适配 */
html[data-theme="light"] .wallpaper-workspace,
:root:not([data-theme="dark"]) .wallpaper-workspace {
  background: #ffffff;
}

html[data-theme="light"] .wallpaper-ws-head,
html[data-theme="light"] .wallpaper-ws-footer,
:root:not([data-theme="dark"]) .wallpaper-ws-head,
:root:not([data-theme="dark"]) .wallpaper-ws-footer {
  background: #f8fafc;
}

html[data-theme="light"] .wallpaper-ws-title h3,
:root:not([data-theme="dark"]) .wallpaper-ws-title h3,
html[data-theme="light"] .wallpaper-meta strong,
:root:not([data-theme="dark"]) .wallpaper-meta strong {
  color: #0f172a;
}
</style>
