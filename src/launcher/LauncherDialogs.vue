<template>
  <div class="vue-launcher-dialogs-root">
    <!-- 1. 添加/编辑网站弹窗 -->
    <dialog
      id="launcher-dialog"
      class="launcher-dialog"
      :open="state.editDialog.isOpen"
    >
      <form id="launcher-form" @submit.prevent="handleSubmitEdit">
        <input id="launcher-id" type="hidden" :value="state.editDialog.id" />
        <h2 id="launcher-dialog-title">
          {{ state.editDialog.isNew ? '添加网站' : '编辑网站' }}
        </h2>

        <label>
          名称
          <input
            id="launcher-title"
            v-model="state.editDialog.title"
            maxlength="30"
            required
            autocomplete="off"
          />
        </label>

        <label>
          网址
          <input
            id="launcher-url"
            v-model="state.editDialog.url"
            type="text"
            placeholder="https://example.com"
            required
            autocomplete="off"
          />
        </label>

        <label>
          备注
          <input
            id="launcher-note"
            v-model="state.editDialog.note"
            type="text"
            maxlength="100"
            placeholder="鼠标悬停提示备注（可替代网址展示）"
            autocomplete="off"
          />
        </label>

        <label>
          分组
          <input
            id="launcher-group"
            v-model="state.editDialog.group"
            maxlength="20"
            placeholder="常用网站"
            autocomplete="off"
          />
        </label>

        <div class="dialog-actions">
          <button
            v-if="!state.editDialog.isNew"
            id="launcher-delete"
            class="dialog-danger"
            type="button"
            @click="handleDeleteEdit"
          >
            删除
          </button>
          <span class="grow"></span>
          <button id="launcher-cancel" type="button" @click="handleCancelEdit">取消</button>
          <button class="dialog-primary" type="submit">保存</button>
        </div>
      </form>
    </dialog>

    <!-- 2. 合并收藏夹弹窗 -->
    <dialog
      id="group-merge-dialog"
      class="launcher-dialog"
      :open="state.groupMerge.isOpen"
    >
      <form id="group-merge-form" @submit.prevent="handleConfirmGroupMerge">
        <h2>合并收藏夹</h2>
        <p id="group-merge-copy" class="dialog-copy">
          将「{{ state.groupMerge.groupTitle }}」合并到其他分组：
        </p>
        <label>
          合并到
          <select id="group-merge-target" v-model="state.groupMerge.targetGroup" required>
            <option
              v-for="group in state.groupMerge.groups"
              :key="group"
              :value="group"
            >
              {{ group }}
            </option>
          </select>
        </label>
        <div class="dialog-actions">
          <span class="grow"></span>
          <button id="group-merge-cancel" type="button" @click="handleCancelGroupMerge">取消</button>
          <button class="dialog-primary" type="submit">合并</button>
        </div>
      </form>
    </dialog>

    <!-- 3. 文件夹跨分区移动弹窗 -->
    <dialog
      id="folder-move-page-dialog"
      class="launcher-dialog"
      :open="state.folderMove.isOpen"
    >
      <form id="folder-move-page-form" @submit.prevent="handleConfirmFolderMove">
        <h2>添加到分区 / 移动分区</h2>
        <p id="folder-move-page-copy" class="dialog-copy">
          将「{{ state.folderMove.folderTitle }}」移动到指定分区：
        </p>
        <label>
          目标分区
          <select id="folder-move-page-target" v-model="state.folderMove.targetPageId" required>
            <option
              v-for="page in state.folderMove.pages"
              :key="page.id"
              :value="page.id"
            >
              {{ page.name }}
            </option>
          </select>
        </label>
        <div class="dialog-actions">
          <span class="grow"></span>
          <button id="folder-move-page-cancel" type="button" @click="handleCancelFolderMove">取消</button>
          <button class="dialog-primary" type="submit">确定移动</button>
        </div>
      </form>
    </dialog>

    <!-- 4. 移动网站弹窗 -->
    <dialog
      id="link-move-dialog"
      class="launcher-dialog"
      :open="state.linkMove.isOpen"
    >
      <form id="link-move-form" @submit.prevent="handleConfirmLinkMove">
        <h2>移动网站</h2>
        <p id="link-move-copy" class="dialog-copy">
          移动「{{ state.linkMove.linkTitle }}」到：
        </p>
        <label id="link-move-page-label">
          目标位置 / 分区
          <select id="link-move-page-target" v-model="state.linkMove.targetPageId">
            <option
              v-for="page in state.linkMove.pages"
              :key="page.id"
              :value="page.id"
            >
              {{ page.name }}
            </option>
          </select>
        </label>
        <label
          v-if="state.linkMove.showFolderSelect"
          id="link-move-folder-label"
        >
          目标文件夹 / 收藏夹
          <select id="link-move-folder-target" v-model="state.linkMove.targetFolderId">
            <option value="">（不放入文件夹，保留在分区根目录）</option>
            <option
              v-for="folder in state.linkMove.folders"
              :key="folder.id"
              :value="folder.id"
            >
              {{ folder.name }}
            </option>
          </select>
        </label>
        <div class="dialog-actions">
          <span class="grow"></span>
          <button id="link-move-cancel" type="button" @click="handleCancelLinkMove">取消</button>
          <button class="dialog-primary" type="submit">确定移动</button>
        </div>
      </form>
    </dialog>

    <!-- 5. 网站图标选择弹窗 -->
    <dialog
      id="launcher-icon-picker-dialog"
      class="launcher-dialog launcher-icon-picker-dialog"
      :open="state.iconPicker.isOpen"
    >
      <div class="icon-picker-shell" :inert="state.iconPicker.isSaving" :aria-busy="state.iconPicker.isSaving">
        <header class="icon-picker-header">
          <div class="icon-picker-title-group">
            <span class="icon-picker-icon">🎨</span>
            <div>
              <h2 id="icon-picker-title">获取网站头像</h2>
              <p id="icon-picker-subtitle" class="dialog-copy">根据网站名称智能搜索并挑选图标</p>
            </div>
          </div>
          <button
            id="icon-picker-close"
            type="button"
            class="icon-picker-close-btn"
            title="关闭"
            @click="handleCancelIconPicker"
          >
            ✕
          </button>
        </header>

        <div class="icon-picker-search-bar">
          <input
            id="icon-picker-search-input"
            v-model="state.iconPicker.query"
            type="text"
            placeholder="输入名称搜索图标，例如：学习通、B站、知乎…"
            autocomplete="off"
            @keydown.enter.prevent="handleSearchIcon"
          />
          <button id="icon-picker-search-btn" type="button" @click="handleSearchIcon">🔍 搜索</button>
          <button
            id="icon-picker-custom-toggle-btn"
            type="button"
            class="icon-picker-ext-btn"
            title="输入图片网址或选择本地图片"
            @click="toggleCustomPanel"
          >
            📁 上传/贴链接
          </button>
        </div>

        <div
          id="icon-picker-custom-panel"
          class="icon-picker-custom-panel"
          :hidden="!state.iconPicker.isCustomPanelOpen"
        >
          <div class="icon-picker-custom-row">
            <input
              id="icon-picker-url-input"
              v-model="state.iconPicker.customUrl"
              type="url"
              placeholder="粘贴任意在线图片网址 (https://...)"
            />
            <button id="icon-picker-url-apply" type="button" @click="applyCustomUrl">使用网址</button>
          </div>
          <div class="icon-picker-upload-row">
            <label class="icon-picker-upload-btn">
              📁 选择本地图片文件
              <input
                id="icon-picker-file-input"
                type="file"
                accept="image/*"
                style="display:none;"
                @change="handleFileUpload"
              />
            </label>
            <span id="icon-picker-upload-tip" class="small muted">支持 png, jpg, webp, svg 等格式</span>
          </div>
        </div>

        <div class="icon-picker-results-wrap">
          <div id="icon-picker-loading" class="icon-picker-loading" :hidden="!state.iconPicker.isLoading">
            <span class="icon-picker-spinner"></span> 正在搜索高质量头像图标…
          </div>
          <div
            id="icon-picker-empty"
            class="icon-picker-empty"
            :hidden="state.iconPicker.isLoading || state.iconPicker.results.length > 0"
          >
            没有找到相关图标，您可以更换搜索词或点击右上角「上传/贴链接」。
          </div>
          <div id="icon-picker-grid" class="icon-picker-grid">
            <button
              v-for="(item, idx) in currentPageResults"
              :key="idx"
              class="icon-picker-item"
              :class="{ selected: state.iconPicker.selectedIconUrl === item.url }"
              type="button"
              @click="selectIcon(item.url)"
            >
              <img :src="item.url" alt="" />
            </button>
          </div>
        </div>

        <div
          id="icon-picker-pagination"
          class="icon-picker-pagination"
          :hidden="state.iconPicker.totalPages <= 1"
        >
          <button
            id="icon-picker-prev-page"
            type="button"
            class="icon-picker-page-btn"
            title="上一页"
            :disabled="state.iconPicker.currentPage <= 1"
            @click="prevPage"
          >
            ‹ 上一页
          </button>
          <span id="icon-picker-page-info" class="icon-picker-page-info">
            第 {{ state.iconPicker.currentPage }} / {{ state.iconPicker.totalPages }} 页
          </span>
          <button
            id="icon-picker-next-page"
            type="button"
            class="icon-picker-page-btn"
            title="下一页"
            :disabled="state.iconPicker.currentPage >= state.iconPicker.totalPages"
            @click="nextPage"
          >
            下一页 ›
          </button>
        </div>

        <footer class="icon-picker-footer">
          <div class="icon-picker-current-selection">
            <span class="muted small">当前选用：</span>
            <div id="icon-picker-preview-box" class="icon-picker-preview-box">
              <img
                v-if="state.iconPicker.selectedIconUrl"
                :src="state.iconPicker.selectedIconUrl"
                alt=""
              />
              <span v-else class="icon-picker-preview-empty">未选择</span>
            </div>
          </div>
          <div class="dialog-actions">
            <button id="icon-picker-cancel" type="button" @click="handleCancelIconPicker">取消</button>
            <button
              id="icon-picker-confirm"
              class="dialog-primary"
              type="button"
              :disabled="!state.iconPicker.selectedIconUrl"
              @click="handleConfirmIconPicker"
            >
              确定设为头像
            </button>
          </div>
        </footer>
      </div>
    </dialog>

    <!-- 6. 文件夹删除决策弹窗 -->
    <dialog
      ref="folderDeleteDialogRef"
      id="folder-delete-dialog"
      class="launcher-dialog folder-delete-dialog"
      :open="state.folderDelete.isOpen"
      @click="handleFolderDeleteClick"
      @cancel="handleCancelFolderDelete"
    >
      <div class="folder-delete-dialog-shell">
        <header class="folder-delete-head">
          <h3 id="folder-delete-title">📁 删除文件夹{{ state.folderDelete.groupName ? `「${state.folderDelete.groupName}」` : "" }}</h3>
          <button
            id="folder-delete-close"
            type="button"
            class="folder-delete-close-btn"
            title="关闭"
            @click="handleCancelFolderDelete"
          >✕</button>
        </header>
        <div class="folder-delete-body">
          <p id="folder-delete-desc" class="folder-delete-desc">
            {{ state.folderDelete.count > 0 ? `文件夹内共有 ${state.folderDelete.count} 个书签，请选择删除处理方式：` : "请选择当前文件夹的删除处理方式：" }}
          </p>
          <div id="folder-delete-hint" class="folder-delete-hint" :hidden="!state.folderDelete.hint">
            {{ state.folderDelete.hint }}
          </div>
        </div>
        <div class="folder-delete-actions">
          <button
            v-if="state.folderDelete.count > 0"
            id="folder-delete-release-btn"
            type="button"
            class="dialog-action-btn dialog-action-release"
            @click="handleReleaseFolderDelete"
          >
            <span class="dialog-btn-icon">📦</span>
            <span class="dialog-btn-text">
              <strong>仅解散文件夹（保留内容）</strong>
              <small>直属网站和子文件夹移到上一级；顶层内容移到分区根目录</small>
            </span>
          </button>
          <button
            id="folder-delete-all-btn"
            type="button"
            class="dialog-action-btn dialog-action-danger"
            @click="handleDeleteAllFolderDelete"
          >
            <span class="dialog-btn-icon">🗑️</span>
            <span class="dialog-btn-text">
              <strong>删除文件夹及直属网站</strong>
              <small>只删除当前文件夹及直属网站；子文件夹保留并移到上一级</small>
            </span>
          </button>
          <button
            id="folder-delete-cancel-btn"
            type="button"
            class="dialog-action-btn dialog-action-cancel"
            @click="handleCancelFolderDelete"
          >取消</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { launcherDialogsController } from "./dialogs-store";

const state = launcherDialogsController.state;

// 编辑弹窗操作
function handleSubmitEdit() {
  launcherDialogsController.submitEditDialog();
}

function handleDeleteEdit() {
  launcherDialogsController.deleteFromEditDialog();
}

function handleCancelEdit() {
  launcherDialogsController.closeEditDialog();
}

// 合并弹窗操作
function handleConfirmGroupMerge() {
  launcherDialogsController.confirmGroupMerge();
}

function handleCancelGroupMerge() {
  launcherDialogsController.closeGroupMerge();
}

// 文件夹移动操作
function handleConfirmFolderMove() {
  launcherDialogsController.confirmFolderMove();
}

function handleCancelFolderMove() {
  launcherDialogsController.closeFolderMove();
}

// 链接移动操作
function handleConfirmLinkMove() {
  launcherDialogsController.confirmLinkMove();
}

function handleCancelLinkMove() {
  launcherDialogsController.closeLinkMove();
}

// 图标选择器操作
const currentPageResults = computed(() => {
  const start = (state.iconPicker.currentPage - 1) * state.iconPicker.pageSize;
  return state.iconPicker.results.slice(start, start + state.iconPicker.pageSize);
});

function handleSearchIcon() {
  void launcherDialogsController.searchIcons(state.iconPicker.query);
}

function toggleCustomPanel() {
  state.iconPicker.isCustomPanelOpen = !state.iconPicker.isCustomPanelOpen;
}

function applyCustomUrl() {
  if (!state.iconPicker.customUrl.trim()) return;
  state.iconPicker.selectedIconUrl = state.iconPicker.customUrl.trim();
}

function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const session = state.iconPicker.session;
  const reader = new FileReader();
  reader.onload = (ev) => {
    if (!state.iconPicker.isOpen || state.iconPicker.isSaving || state.iconPicker.session !== session) return;
    const dataUrl = ev.target?.result as string;
    if (dataUrl) {
      state.iconPicker.selectedIconUrl = dataUrl;
    }
  };
  reader.readAsDataURL(file);
}

function selectIcon(url: string) {
  launcherDialogsController.selectIcon(url);
}

function prevPage() {
  if (state.iconPicker.currentPage > 1) {
    state.iconPicker.currentPage--;
  }
}

function nextPage() {
  if (state.iconPicker.currentPage < state.iconPicker.totalPages) {
    state.iconPicker.currentPage++;
  }
}

function handleCancelIconPicker() {
  launcherDialogsController.closeIconPicker();
}

function handleConfirmIconPicker() {
  launcherDialogsController.confirmIcon();
}

// 文件夹删除弹窗操作
const folderDeleteDialogRef = ref<HTMLDialogElement | null>(null);

watch(
  () => state.folderDelete.isOpen,
  (isOpen) => {
    const dialog = folderDeleteDialogRef.value;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          dialog.setAttribute("open", "");
        }
      }
    } else {
      if (dialog.open) {
        try {
          dialog.close();
        } catch {
          dialog.removeAttribute("open");
        }
      }
    }
  }
);

function handleCancelFolderDelete() {
  launcherDialogsController.closeFolderDeleteDialog();
}

function handleReleaseFolderDelete() {
  launcherDialogsController.releaseFolderDelete();
}

function handleDeleteAllFolderDelete() {
  launcherDialogsController.deleteAllFolderDelete();
}

function handleFolderDeleteClick(event: MouseEvent) {
  if (event.target === folderDeleteDialogRef.value) {
    handleCancelFolderDelete();
  }
}
</script>
