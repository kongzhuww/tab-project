<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { biliUpGroupManagerController as controller, biliUpGroupManagerState as state, type BiliUpGroupView } from "./up-group-manager-store";

const createParentId = ref<string | null | undefined>(undefined);
const createName = ref("");
const editingId = ref("");
const editingName = ref("");
const draggedGroupId = ref("");

// 批量操作状态
const batchMode = ref(false);
const batchSelected = ref<Set<string>>(new Set());

// 拖拽移动对话框
const dialogEl = ref<HTMLDialogElement | null>(null);

function startDialogDrag(event: PointerEvent) {
  if (event.button !== 0 || (event.target as HTMLElement).closest("button,input")) return;
  const dialog = dialogEl.value;
  if (!dialog) return;

  const rect = dialog.getBoundingClientRect();
  const startLeft = rect.left;
  const startTop = rect.top;
  const pointerStartX = event.clientX;
  const pointerStartY = event.clientY;

  dialog.style.position = "fixed";
  dialog.style.left = `${startLeft}px`;
  dialog.style.top = `${startTop}px`;
  dialog.style.right = "auto";
  dialog.style.bottom = "auto";
  dialog.style.margin = "0";
  dialog.style.transform = "none";

  const onMove = (e: PointerEvent) => {
    const deltaX = e.clientX - pointerStartX;
    const deltaY = e.clientY - pointerStartY;
    const newLeft = Math.max(8, Math.min(window.innerWidth - 120, startLeft + deltaX));
    const newTop = Math.max(8, Math.min(window.innerHeight - 80, startTop + deltaY));
    dialog.style.left = `${newLeft}px`;
    dialog.style.top = `${newTop}px`;
  };

  const onUp = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

const activeGroup = computed(() => state.groups.find((group) => group.id === state.activeGroupId) || null);
const filteredFollowings = computed(() => {
  const query = state.query.trim().toLowerCase();
  const activeId = state.activeGroupId;
  return state.followings.filter((up) => {
    if (query && !up.name.toLowerCase().includes(query) && !up.sign.toLowerCase().includes(query) && !up.mid.includes(query)) return false;
    const inActive = up.groupIds.includes(activeId);
    if (state.filter === "ingroup") return inActive;
    if (state.onlyUngrouped) return !up.groupIds || up.groupIds.length === 0;
    return true;
  });
});
const totalPages = computed(() => Math.max(1, Math.ceil(filteredFollowings.value.length / state.pageSize)));
const visibleFollowings = computed(() => {
  const page = Math.min(state.page, totalPages.value);
  const start = (page - 1) * state.pageSize;
  return filteredFollowings.value.slice(start, start + state.pageSize);
});
const neverGroupedCount = computed(() => state.followings.filter((up) => up.groupIds.length === 0).length);

const listRef = ref<HTMLElement | null>(null);

// 缓存每个分组下的滚动位置与当前页码，避免切换分组时跳回最高处
interface GroupScrollSnapshot {
  page: number;
  scrollTop: number;
}
const groupScrollCache = new Map<string, GroupScrollSnapshot>();

function changePage(newPage: number): void {
  const target = Math.max(1, Math.min(totalPages.value, newPage));
  state.page = target;
  if (listRef.value) {
    listRef.value.scrollTop = 0;
  }
}

// 搜索关键词、过滤模式切换、或仅未分组勾选变动时重置为第1页并置顶
watch(() => [state.query, state.filter, state.onlyUngrouped], () => {
  state.page = 1;
  if (listRef.value) {
    listRef.value.scrollTop = 0;
  }
});

// 点击左侧分组切换时：记录并缓存进度条，绝对不要粗暴跳回最高处
watch(() => state.activeGroupId, (newId, oldId) => {
  if (oldId && listRef.value) {
    const oldKey = `${oldId}_${state.filter}_${state.onlyUngrouped}`;
    groupScrollCache.set(oldKey, {
      page: state.page,
      scrollTop: listRef.value.scrollTop
    });
  }

  // 1. 全部关注模式下：列表项目全局一致，切换分组仅用于设置目标组，完全保留当前滚动条与页码！
  if (state.filter === "all") {
    return;
  }

  // 2. 本组已加模式下：尝试恢复目标分组上次浏览的页码与滚动位置
  const targetKey = `${newId}_${state.filter}_${state.onlyUngrouped}`;
  const cached = groupScrollCache.get(targetKey);
  if (cached) {
    state.page = Math.min(cached.page, totalPages.value);
    void nextTick(() => {
      if (listRef.value) {
        listRef.value.scrollTop = cached.scrollTop;
      }
    });
  } else {
    state.page = 1;
    void nextTick(() => {
      if (listRef.value) {
        listRef.value.scrollTop = 0;
      }
    });
  }
});
watch(totalPages, (pages) => { if (state.page > pages) state.page = pages; });

// 退出批量模式时清空选择
watch(batchMode, (v) => { if (!v) batchSelected.value.clear(); });

function beginCreate(parentId: string | null): void { createParentId.value = parentId; createName.value = ""; }
function cancelCreate(): void { createParentId.value = undefined; createName.value = ""; }
function submitCreate(): void {
  const name = createName.value.trim();
  if (!name) return;
  void controller.dispatch("create-group", { name, parentId: createParentId.value || "" });
  cancelCreate();
}
function beginRename(group: BiliUpGroupView): void { editingId.value = group.id; editingName.value = group.name; }
function submitRename(): void {
  const name = editingName.value.trim();
  if (editingId.value && name) void controller.dispatch("rename-group", { id: editingId.value, name });
  editingId.value = ""; editingName.value = "";
}
function beginDrag(event: DragEvent, id: string): void {
  draggedGroupId.value = id;
  event.dataTransfer?.setData("application/x-logicweaver-up-group", id);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}
function dropGroup(event: DragEvent, targetId: string): void {
  const sourceId = event.dataTransfer?.getData("application/x-logicweaver-up-group") || draggedGroupId.value;
  draggedGroupId.value = "";
  if (!sourceId || sourceId === targetId) return;
  const bounds = (event.currentTarget as HTMLElement | null)?.getBoundingClientRect();
  const relativeY = bounds ? event.clientY - bounds.top : 0;
  const mode = !bounds ? "into" : relativeY < bounds.height * 0.25 ? "before" : relativeY > bounds.height * 0.75 ? "after" : "into";
  void controller.dispatch("move-group", { sourceId, targetId, mode });
}
function dropRoot(event: DragEvent): void {
  const sourceId = event.dataTransfer?.getData("application/x-logicweaver-up-group") || draggedGroupId.value;
  draggedGroupId.value = "";
  if (sourceId) void controller.dispatch("move-group", { sourceId, targetId: "", mode: "root" });
}

// "移动到分组" 模式：点击左侧分组即自动将 UP 主归入该分组（类似 B站收藏夹移动到）
function assignUpToGroup(mid: string, groupId: string): void {
  if (!groupId || state.busyMid) return;
  void controller.dispatch("toggle-member", { groupId, mid });
}

function toggleMember(mid: string): void {
  if (!state.activeGroupId || state.busyMid) return;
  void controller.dispatch("toggle-member", { groupId: state.activeGroupId, mid });
}
function preview(event: MouseEvent, mid: string): void {
  void controller.dispatch("preview-up", { mid, clientX: event.clientX, clientY: event.clientY });
}

// 批量操作
function toggleBatchSelect(mid: string): void {
  const s = batchSelected.value;
  if (s.has(mid)) s.delete(mid); else s.add(mid);
}
function batchAddToGroup(): void {
  if (!state.activeGroupId || state.busyMid) return;
  const mids = Array.from(batchSelected.value);
  if (!mids.length) return;
  // 逐个加入当前分组（未在组内的才加）
  const notInGroup = mids.filter(mid => {
    const up = state.followings.find(u => u.mid === mid);
    return up && !up.groupIds.includes(state.activeGroupId);
  });
  if (!notInGroup.length) return;
  for (const mid of notInGroup) {
    void controller.dispatch("toggle-member", { groupId: state.activeGroupId, mid });
  }
  batchSelected.value.clear();
}
function batchRemoveFromGroup(): void {
  if (!state.activeGroupId || state.busyMid) return;
  const mids = Array.from(batchSelected.value);
  if (!mids.length) return;
  const inGroup = mids.filter(mid => {
    const up = state.followings.find(u => u.mid === mid);
    return up && up.groupIds.includes(state.activeGroupId);
  });
  if (!inGroup.length) return;
  for (const mid of inGroup) {
    void controller.dispatch("toggle-member", { groupId: state.activeGroupId, mid });
  }
  batchSelected.value.clear();
}
function selectAllVisible(): void {
  for (const up of visibleFollowings.value) batchSelected.value.add(up.mid);
}
</script>

<template>
  <dialog v-if="state.open" ref="dialogEl" class="fo-up-group-dialog" open @cancel.prevent="controller.close()">
    <div class="fo-upg-shell">
      <!-- 可拖动头部 -->
      <header class="fo-upg-head" @pointerdown="startDialogDrag">
        <h3><span>👥</span> 关注分组与 UP 主管理</h3>
        <button type="button" class="fo-upg-close-btn" aria-label="关闭" title="关闭管理面板" @click="controller.close()">✕</button>
      </header>
      <div class="fo-upg-body">
        <aside class="fo-upg-sidebar">
          <div class="fo-upg-sidebar-head"><span>我的分组</span><button type="button" @click="beginCreate(null)">＋ 新建</button></div>
          <div class="fo-upg-group-items">
            <div class="fo-upg-root-dropzone" @dragover.prevent @drop.prevent="dropRoot">⇣ 拖至此处变为顶级分组</div>
            <form v-if="createParentId === null" class="fo-upg-create-box" @submit.prevent="submitCreate"><input v-model="createName" maxlength="20" placeholder="输入分组名称…" autofocus /><div class="fo-upg-create-btns"><button type="button" class="cancel" @click="cancelCreate">取消</button><button class="confirm" type="submit">确定</button></div></form>
            <template v-for="group in state.groups" :key="group.id">
              <div
                class="fo-upg-group-item"
                :class="{ on: group.id === state.activeGroupId, 'is-subgroup': group.depth > 0 }"
                :style="{ paddingLeft: `${8 + group.depth * 18}px` }"
                draggable="true"
                @dragstart="beginDrag($event, group.id)"
                @dragover.prevent
                @drop.prevent="dropGroup($event, group.id)"
                @click="state.activeGroupId = group.id"
              >
                <template v-if="editingId === group.id"><input v-model="editingName" class="fo-upg-rename-input" maxlength="20" @click.stop @keydown.enter.prevent="submitRename" /><button type="button" @click.stop="submitRename">✓</button><button type="button" @click.stop="editingId = ''">✕</button></template>
                <template v-else><span v-if="group.depth" class="fo-upg-tree-branch">↳</span><i v-else class="fo-folder-icon"></i><span class="fo-upg-group-name">{{ group.name }}</span><small>{{ group.upMids.length }}</small><span class="fo-upg-vue-group-actions"><button type="button" title="添加子分组" @click.stop="beginCreate(group.id)">＋</button><button type="button" title="重命名" @click.stop="beginRename(group)">✎</button><button type="button" class="danger" title="删除" @click.stop="controller.dispatch('delete-group', group.id)">×</button></span></template>
              </div>
              <form v-if="createParentId === group.id" class="fo-upg-create-box" :style="{ marginLeft: `${18 + group.depth * 18}px` }" @submit.prevent="submitCreate"><input v-model="createName" maxlength="20" :placeholder="`输入「${group.name}」的子分组名称…`" autofocus /><div class="fo-upg-create-btns"><button type="button" class="cancel" @click="cancelCreate">取消</button><button class="confirm" type="submit">确定</button></div></form>
            </template>
            <p v-if="!state.groups.length && !state.loading" class="muted small">暂无分组，请点击"＋ 新建"。</p>
          </div>
        </aside>

        <section class="fo-upg-main">
          <!-- 标题行 + 批量操作 -->
          <div class="fo-upg-main-head">
            <div class="fo-upg-main-title">
              <h4>{{ activeGroup ? `分组：「${activeGroup.name}」` : '请先选择或新建分组' }}</h4>
              <span v-if="activeGroup">（本组 {{ activeGroup.upMids.length }} 位 · 共 {{ state.followings.length }} 位关注 · 未分组 {{ neverGroupedCount }} 位）</span>
            </div>
            <div class="fo-upg-head-actions">
              <div class="fo-upg-filter-tabs">
                <button type="button" class="fo-upg-filter-tab" :class="{ on: state.filter === 'all' }" @click="state.filter = 'all'">全部关注</button>
                <button type="button" class="fo-upg-filter-tab" :class="{ on: state.filter === 'ingroup' }" @click="state.filter = 'ingroup'">本组已加</button>
              </div>
              <!-- 批量操作区 -->
              <div class="fo-upg-batch-wrap">
                <button type="button" class="fo-upg-batch-toggle" :class="{ on: batchMode }" @click="batchMode = !batchMode">
                  {{ batchMode ? '退出批量' : '批量操作' }}
                </button>
                <template v-if="batchMode && batchSelected.size > 0">
                  <span class="fo-upg-batch-count">已选 {{ batchSelected.size }}</span>
                  <button type="button" class="fo-upg-batch-action add" :disabled="!activeGroup" @click="batchAddToGroup">＋ 加入本组</button>
                  <button type="button" class="fo-upg-batch-action remove" :disabled="!activeGroup" @click="batchRemoveFromGroup">− 移出本组</button>
                  <button type="button" class="fo-upg-batch-action" @click="selectAllVisible">全选当页</button>
                  <button type="button" class="fo-upg-batch-action" @click="batchSelected.clear()">清除</button>
                </template>
              </div>
              <label v-if="state.filter === 'all'" class="fo-upg-switch" :class="{ on: state.onlyUngrouped }">
                <input v-model="state.onlyUngrouped" type="checkbox" />
                <span class="fo-upg-switch-track"><span class="fo-upg-switch-thumb"></span></span>
                <span class="fo-upg-switch-text">仅未分组 UP</span>
              </label>
            </div>
          </div>
          <div class="fo-upg-toolbar">
            <div class="fo-upg-search"><span>🔍</span><input v-model="state.query" type="search" placeholder="搜索关注的 UP 主…" /></div>
            <button type="button" class="fo-upg-refresh-btn" :disabled="state.refreshing" @click="controller.dispatch('refresh')">{{ state.refreshing ? '刷新中…' : '↻ 刷新关注' }}</button>
          </div>
          <div ref="listRef" class="fo-upg-list">
            <div v-if="state.loading" class="fo-bili-loading"><i></i><span>正在加载关注的 UP 主列表…</span></div>
            <p v-else-if="state.error" class="fo-bili-empty">{{ state.error }}</p>
            <p v-else-if="!activeGroup" class="fo-bili-empty">请先新建或选择一个分组。</p>
            <p v-else-if="!visibleFollowings.length" class="fo-bili-empty">没有符合条件的 UP 主。</p>
            <template v-else>
              <article
                v-for="up in visibleFollowings"
                :key="up.mid"
                class="fo-upg-card"
                :class="{ selected: batchMode && batchSelected.has(up.mid) }"
                :title="`右键查看「${up.name}」近期投稿`"
                @contextmenu.prevent="preview($event, up.mid)"
                @click="batchMode ? toggleBatchSelect(up.mid) : undefined"
              >
                <img :src="up.face" alt="" loading="lazy" referrerpolicy="no-referrer" />
                <div class="fo-upg-info">
                  <div class="fo-upg-name">{{ up.name }}</div>
                  <div class="fo-upg-sign">{{ up.sign || '暂无签名' }}</div>
                </div>
                <!-- 非批量模式：显示"加入/移动到"按钮 -->
                <template v-if="!batchMode">
                  <!-- 已在当前组：显示移出按钮 -->
                  <button
                    v-if="up.groupIds.includes(state.activeGroupId)"
                    type="button"
                    class="fo-upg-toggle-btn in-group"
                    :disabled="state.busyMid === up.mid"
                    @click.stop="toggleMember(up.mid)"
                  >{{ state.busyMid === up.mid ? '处理中…' : `移出 ${activeGroup?.name || ''}` }}</button>
                  <!-- 不在当前组但在其他组：显示分组名悬浮菜单 -->
                  <div v-else-if="up.groupIds.length > 0" class="fo-upg-move-wrap">
                    <button
                      type="button"
                      class="fo-upg-toggle-btn belongs-other fo-upg-move-trigger"
                      :disabled="state.busyMid === up.mid"
                    >{{ state.busyMid === up.mid ? '处理中…' : `📁 ${up.groupName || '已分组'}` }}</button>
                    <!-- 点击分组名直接归入目标分组（B站收藏夹"移动到"交互） -->
                    <div class="fo-upg-move-dropdown">
                      <div class="fo-upg-move-title">移动到分组</div>
                      <button
                        v-for="group in state.groups"
                        :key="group.id"
                        type="button"
                        class="fo-upg-move-item"
                        :class="{ active: up.groupIds.includes(group.id) }"
                        :disabled="state.busyMid === up.mid"
                        @click.stop="assignUpToGroup(up.mid, group.id)"
                      >
                        <i class="fo-folder-icon small"></i>
                        <span>{{ group.name }}</span>
                        <small v-if="up.groupIds.includes(group.id)">✓ 已加入</small>
                      </button>
                      <p v-if="!state.groups.length" class="muted small" style="padding:6px 10px">暂无分组</p>
                    </div>
                  </div>
                  <!-- 未分组：加入当前分组 -->
                  <button
                    v-else-if="state.activeGroupId"
                    type="button"
                    class="fo-upg-toggle-btn"
                    :disabled="state.busyMid === up.mid"
                    @click.stop="toggleMember(up.mid)"
                  >{{ state.busyMid === up.mid ? '处理中…' : '＋ 加入' }}</button>
                </template>
                <!-- 批量模式：显示选中框 -->
                <div v-else class="fo-upg-batch-check" :class="{ checked: batchSelected.has(up.mid) }">
                  {{ batchSelected.has(up.mid) ? '✓' : '' }}
                </div>
              </article>
            </template>
          </div>
          <div class="fo-upg-pagination">
            <div class="fo-upg-page-info">共 {{ filteredFollowings.length }} 位 UP 主 · 每页 {{ state.pageSize }} 位</div>
            <div v-if="totalPages > 1" class="fo-upg-page-btns">
              <button type="button" class="fo-upg-page-btn" :disabled="state.page <= 1" @click="changePage(1)">« 首页</button>
              <button type="button" class="fo-upg-page-btn" :disabled="state.page <= 1" @click="changePage(state.page - 1)">‹ 上一页</button>
              <span class="fo-upg-page-cur">{{ state.page }} / {{ totalPages }}</span>
              <button type="button" class="fo-upg-page-btn" :disabled="state.page >= totalPages" @click="changePage(state.page + 1)">下一页 ›</button>
              <button type="button" class="fo-upg-page-btn" :disabled="state.page >= totalPages" @click="changePage(totalPages)">末页 »</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.fo-upg-body {
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr) !important;
  grid-template-rows: minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}

/* 左侧分组栏：收窄宽度，舒展行高，鼠标悬浮时以操作按钮替换数字 */
.fo-upg-sidebar {
  min-height: 0;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.fo-upg-sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 8px !important;
  font-size: 12px !important;
  color: var(--muted);
  flex: none;
}
.fo-upg-sidebar-head button {
  padding: 2px 7px !important;
  font-size: 11px !important;
}
.fo-upg-group-items {
  flex: 1 1 0%;
  min-height: 0;
  overflow-y: auto !important;
  overscroll-behavior: contain;
  padding: 6px 5px !important;
  display: flex;
  flex-direction: column;
  gap: 2.5px !important;
}
.fo-upg-group-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px !important;
  padding: 5.5px 7px !important;
  border-radius: 7px !important;
  font-size: 12px !important;
  cursor: pointer;
  text-align: left;
  user-select: none;
  transition: background .12s, border-color .12s;
}
.fo-upg-group-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 平时在右侧显示数字；hover 时隐藏数字，将 3 个操作按钮放置于原本数字位置 */
.fo-upg-group-item small {
  margin-left: auto;
  font-size: 10px;
  color: var(--dim);
  display: inline-block;
  flex: none;
}
.fo-upg-group-item:hover small {
  display: none !important;
}
.fo-upg-vue-group-actions {
  display: none !important;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  flex: none;
}
.fo-upg-group-item:hover .fo-upg-vue-group-actions {
  display: inline-flex !important;
  opacity: 1 !important;
}
.fo-upg-vue-group-actions button {
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 1px 3px;
  font-size: 11px;
  line-height: 1;
  border-radius: 3px;
  color: inherit;
  opacity: 0.85;
}
.fo-upg-vue-group-actions button:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.15);
}
.fo-upg-vue-group-actions .danger:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
}

.fo-upg-main { min-height: 0; height: 100%; max-height: 100%; overflow: hidden; display: flex; flex-direction: column; }
.fo-upg-list { flex: 1 1 0%; min-height: 0; overflow-y: auto !important; overscroll-behavior: contain; }
.fo-upg-pagination { flex: none; margin-top: auto; }

/* 批量操作区 */
.fo-upg-batch-wrap { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.fo-upg-batch-toggle { height: 26px; padding: 0 10px; border-radius: 5px; border: 1px solid var(--border); background: transparent; color: var(--text); font-size: 11.5px; cursor: pointer; transition: all .15s; }
.fo-upg-batch-toggle.on { border-color: #00aeec; background: rgba(0,174,236,.1); color: #00aeec; }
.fo-upg-batch-toggle:hover { border-color: #00aeec; }
.fo-upg-batch-count { font-size: 11px; color: #00aeec; font-weight: 600; padding: 0 4px; }
.fo-upg-batch-action { height: 24px; padding: 0 8px; border-radius: 4px; border: 1px solid var(--border); background: transparent; color: var(--text); font-size: 11px; cursor: pointer; transition: all .12s; }
.fo-upg-batch-action:hover { border-color: var(--border-strong); background: var(--surface-hover); }
.fo-upg-batch-action.add:hover { border-color: #22c55e; color: #22c55e; }
.fo-upg-batch-action.remove:hover { border-color: #ef4444; color: #ef4444; }
.fo-upg-batch-action:disabled { opacity: 0.4; cursor: not-allowed; }

/* 卡片选中状态 */
.fo-upg-card.selected { border-color: #00aeec !important; background: rgba(0,174,236,.06) !important; cursor: pointer; }
.fo-upg-batch-check { width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--border); display: grid; place-items: center; font-size: 13px; color: #00aeec; flex-shrink: 0; transition: all .15s; }
.fo-upg-batch-check.checked { background: #00aeec; border-color: #00aeec; color: #fff; }

/* "移动到" hover 下拉 */
.fo-upg-move-wrap { position: relative; display: inline-flex; }
.fo-upg-move-dropdown {
  position: absolute;
  right: 0; bottom: calc(100% + 4px);
  min-width: 170px;
  max-height: 260px;
  overflow-y: auto;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 20px -4px rgba(0,0,0,.25);
  z-index: 50;
  display: none;
  flex-direction: column;
  gap: 2px;
  padding: 5px;
}
.fo-upg-move-wrap:hover .fo-upg-move-dropdown,
.fo-upg-move-trigger:focus + .fo-upg-move-dropdown { display: flex; }
.fo-upg-move-title { font-size: 10.5px; color: var(--muted); padding: 2px 6px 4px; border-bottom: 1px solid var(--border); margin-bottom: 3px; }
.fo-upg-move-item {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 8px; border-radius: 5px;
  border: 0; background: transparent; color: var(--text);
  font-size: 12px; cursor: pointer; text-align: left;
  transition: background .12s;
}
.fo-upg-move-item:hover { background: var(--surface-hover); }
.fo-upg-move-item.active { color: #00aeec; }
.fo-upg-move-item small { margin-left: auto; font-size: 10px; color: #00aeec; }
.fo-folder-icon.small { font-size: 11px; flex-shrink: 0; }

/* 拖拽 header 光标 */
.fo-upg-head { cursor: grab; user-select: none; }
.fo-upg-head:active { cursor: grabbing; }
.fo-upg-head button { cursor: pointer; }
</style>
