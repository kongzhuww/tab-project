<template>
  <div
    id="bookmark-note-menu"
    class="bookmark-note-menu"
    role="menu"
    aria-label="书签操作"
    :hidden="!state.isOpen"
    :style="{ left: state.left + 'px', top: state.top + 'px' }"
  >
    <header :class="['bookmark-context-head', { folder: state.isFolder }]">
      <img
        v-if="!state.isFolder && state.iconUrl"
        id="bookmark-context-icon"
        :src="state.iconUrl"
        alt=""
      />
      <span>
        <b id="bookmark-note-title">{{ state.title }}</b>
        <small id="bookmark-context-host">{{ state.hostOrCount }}</small>
      </span>
    </header>

    <!-- 1. 常用动作菜单 -->
    <div
      id="bookmark-context-actions"
      class="bookmark-context-actions"
      :hidden="state.mode !== 'actions'"
    >
      <button
        id="bookmark-context-open"
        type="button"
        role="menuitem"
        @click="handleOpen"
      >
        <b>{{ state.isFolder ? '打开文件夹' : '打开书签' }}</b>
        <kbd>Enter</kbd>
      </button>

      <button
        v-if="state.isFolder"
        id="bookmark-context-new-folder"
        type="button"
        role="menuitem"
        @click="handleNewSubFolder"
      >
        <b>新建子文件夹</b>
      </button>

      <button
        v-if="!state.isFolder"
        id="bookmark-context-launcher"
        type="button"
        role="menuitem"
        @click="handleSwitchMode('launcher')"
      >
        <b>添加到常用网站</b>
      </button>

      <button
        id="bookmark-context-rename"
        type="button"
        role="menuitem"
        @click="handleSwitchMode('rename')"
      >
        <b>{{ state.isFolder ? '重命名文件夹' : '重命名书签' }}</b>
      </button>

      <button
        v-if="!state.isFolder"
        id="bookmark-context-note"
        type="button"
        role="menuitem"
        @click="handleSwitchMode('note')"
      >
        <b>更改备注</b>
      </button>

      <i></i>

      <button
        id="bookmark-context-delete"
        class="danger"
        type="button"
        role="menuitem"
        @click="handleSwitchMode('delete')"
      >
        <b>{{ state.isFolder ? '删除文件夹' : '删除书签' }}</b>
      </button>
    </div>

    <!-- 2. 添加到常用网站编辑器 -->
    <section
      id="bookmark-launcher-editor"
      class="bookmark-context-editor"
      :hidden="state.mode !== 'launcher'"
    >
      <label for="bookmark-launcher-group-select">选择常用网站分组</label>
      <select
        id="bookmark-launcher-group-select"
        v-model="state.selectedLauncherGroup"
      >
        <option
          v-for="group in state.launcherGroups"
          :key="group"
          :value="group"
        >
          {{ group }}
        </option>
      </select>
      <div>
        <button id="bookmark-launcher-cancel" type="button" @click="handleSwitchMode('actions')">返回</button>
        <button id="bookmark-launcher-save" class="primary" type="button" @click="handleSaveLauncher">确认添加</button>
      </div>
    </section>

    <!-- 3. 重命名编辑器 -->
    <section
      id="bookmark-rename-editor"
      class="bookmark-context-editor"
      :hidden="state.mode !== 'rename'"
    >
      <label id="bookmark-rename-label" for="bookmark-rename-input">
        {{ state.isFolder ? '重命名文件夹' : '重命名书签' }}
      </label>
      <input
        id="bookmark-rename-input"
        v-model="state.renameValue"
        type="text"
        maxlength="120"
        placeholder="输入新名称"
        autocomplete="off"
        @keydown.enter="handleSaveRename"
      />
      <div>
        <button id="bookmark-rename-cancel" type="button" @click="handleSwitchMode('actions')">返回</button>
        <button id="bookmark-rename-save" class="primary" type="button" @click="handleSaveRename">保存</button>
      </div>
    </section>

    <!-- 4. 备注编辑器 -->
    <section
      id="bookmark-note-editor"
      class="bookmark-context-editor"
      :hidden="state.mode !== 'note'"
    >
      <label for="bookmark-note-input">书签备注</label>
      <textarea
        id="bookmark-note-input"
        v-model="state.noteValue"
        maxlength="160"
        rows="3"
        placeholder="写一句备注"
      ></textarea>
      <div>
        <button id="bookmark-note-cancel" type="button" @click="handleSwitchMode('actions')">返回</button>
        <button id="bookmark-note-save" class="primary" type="button" @click="handleSaveNote">保存备注</button>
      </div>
    </section>

    <!-- 5. 删除确认面板 -->
    <section
      id="bookmark-delete-confirm"
      class="bookmark-delete-confirm"
      :hidden="state.mode !== 'delete'"
    >
      <b>{{ state.isFolder ? '删除这个文件夹？' : '删除这个书签？' }}</b>
      <p>
        {{ state.isFolder ? '文件夹及其中全部书签将从浏览器中移除，此操作无法撤销。' : '将同时从 Edge/Chrome 书签中移除，此操作无法撤销。' }}
      </p>
      <div>
        <button id="bookmark-delete-cancel" type="button" @click="handleSwitchMode('actions')">取消</button>
        <button id="bookmark-delete-apply" class="danger" type="button" @click="handleConfirmDelete">确认删除</button>
      </div>
    </section>

    <p
      id="bookmark-context-status"
      class="bookmark-context-status"
      role="status"
      :hidden="!state.statusVisible"
    >
      {{ state.statusText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { bookmarkMenuController, type BookmarkMenuMode } from "./menu-store";

const state = bookmarkMenuController.state;

onMounted(() => {
  const onPointerDown = (event: PointerEvent) => {
    if (!state.isOpen) return;
    const target = event.target as HTMLElement | null;
    const menuEl = document.getElementById("bookmark-note-menu");
    if (menuEl && !menuEl.contains(target)) {
      bookmarkMenuController.closeMenu();
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && state.isOpen) {
      bookmarkMenuController.closeMenu();
    }
  };

  document.addEventListener("pointerdown", onPointerDown, true);
  document.addEventListener("keydown", onKeyDown);

  onUnmounted(() => {
    document.removeEventListener("pointerdown", onPointerDown, true);
    document.removeEventListener("keydown", onKeyDown);
  });
});

function handleOpen() {
  bookmarkMenuController.openBookmark();
}

function handleNewSubFolder() {
  bookmarkMenuController.newSubFolder();
}

function handleSwitchMode(mode: BookmarkMenuMode) {
  bookmarkMenuController.setMode(mode);
}

function handleSaveLauncher() {
  bookmarkMenuController.saveToLauncher();
}

function handleSaveRename() {
  bookmarkMenuController.saveRename();
}

function handleSaveNote() {
  bookmarkMenuController.saveNote();
}

function handleConfirmDelete() {
  bookmarkMenuController.confirmDelete();
}
</script>
