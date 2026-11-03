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
          {{ state.editDialog.isNew ? t('sites.addSite') : t('sites.editSite') }}
        </h2>

        <label>
          {{ t('sites.name') }}
          <input
            id="launcher-title"
            v-model="state.editDialog.title"
            maxlength="30"
            required
            autocomplete="off"
          />
        </label>

        <label>
          {{ t('sites.url') }}
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
          {{ t('sites.note') }}
          <input
            id="launcher-note"
            v-model="state.editDialog.note"
            type="text"
            maxlength="100"
            :placeholder="t('sites.notePlaceholder')"
            autocomplete="off"
          />
        </label>

        <label>
          {{ t('sites.group') }}
          <input
            id="launcher-group"
            v-model="state.editDialog.group"
            maxlength="20"
            :placeholder="t('sites.groupDefault')"
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
            {{ t('sites.deleteSite') }}
          </button>
          <span class="grow"></span>
          <button id="launcher-cancel" type="button" @click="handleCancelEdit">{{ t('common.cancel') }}</button>
          <button class="dialog-primary" type="submit">{{ t('sites.saveSite') }}</button>
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
import { t } from "../i18n";

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
