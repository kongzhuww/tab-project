<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useInlineTitleEdit } from "../sdk/interactions";
import { notifications } from "../sdk/notifications";
import { cleanFolderTitle } from "./title-storage";
import { menusState, launcherMenusController } from "./menus-store";
import { launcherService } from "../services/launcher.service";
import LauncherMenuTitle from "./LauncherMenuTitle.vue";
import LauncherMenuUrl from "./LauncherMenuUrl.vue";
import LauncherMenuNote from "./LauncherMenuNote.vue";
import LauncherMoveMenu from "./LauncherMoveMenu.vue";
import ChatShareMenu from "../chat/ChatShareMenu.vue";
import { chatService } from "../chat/chat.service";
import type { ChatShareTarget } from "../chat/private-chat-client";
import { pluginSlots, type MenuSlotAction } from "../sdk/slots";

const state = menusState;

const folderMenuStyle = computed(() => ({
  left: `${state.folderMenu.x}px`,
  top: `${state.folderMenu.y}px`
}));

const linkMenuStyle = computed(() => ({
  left: `${state.linkMenu.x}px`,
  top: `${state.linkMenu.y}px`
}));

const pageMenuStyle = computed(() => ({
  left: `${state.pageMenu.x}px`,
  top: `${state.pageMenu.y}px`
}));

const blankMenuStyle = computed(() => ({
  left: `${state.blankMenu.x}px`,
  top: `${state.blankMenu.y}px`
}));

const detachedTitleError = (message: string) => {
  notifications.show({ appName: "常用网站", title: "网站编辑保存未完成", message, duration: 12000 });
};
const linkEdit = useInlineTitleEdit<{ id: string; title: string }>({
  save: (target, draft) => launcherService.renameLinkTitle(target.id, target.title, draft),
  apply: (target, title) => {
    if (state.linkMenu.link?.id === target.id) state.linkMenu.link = { ...state.linkMenu.link, title };
  },
  detachedError: detachedTitleError
});
const folderEdit = useInlineTitleEdit<string>({
  save: async (group, draft) => {
    const clean = cleanFolderTitle(draft);
    await launcherService.renameGroup(group, clean);
    return clean;
  },
  apply: (_group, saved) => { state.folderMenu.groupName = saved; },
  detachedError: detachedTitleError
});
const { editing: isEditingLinkTitle, draft: editingLinkTitleText, busy: linkTitleBusy,
  message: linkTitleMessage, failed: linkTitleFailed, revision: linkTitleRevision } = linkEdit;
const { editing: isEditingFolderTitle, draft: editingFolderTitleText, busy: folderTitleBusy,
  message: folderTitleMessage, failed: folderTitleFailed, revision: folderTitleRevision } = folderEdit;

const isConfirmingLinkDelete = ref(false);
const isConfirmingFolderDelete = ref(false);
const isConfirmingPageDelete = ref(false);

function resetConfirmStates() {
  isConfirmingLinkDelete.value = false;
  isConfirmingFolderDelete.value = false;
  isConfirmingPageDelete.value = false;
}

function startEditFolderTitle() {
  if (state.folderMenu.groupName) folderEdit.start(state.folderMenu.groupName, state.folderMenu.groupName);
}
const saveFolderTitle = folderEdit.commit;
const cancelEditFolderTitle = folderEdit.cancel;

function startEditLinkTitle() {
  if (linkMenuBusy.value) return;
  urlEdit.reset();
  noteEdit.reset();
  const link = state.linkMenu.link;
  if (link) linkEdit.start({ id: link.id, title: link.title || "" }, link.title || "");
}
const saveLinkTitle = linkEdit.commit;
const cancelEditLinkTitle = linkEdit.cancel;

// Clicking another menu action after blur must not race its pending rename.
function guardTitleAction(event: MouseEvent, busy: boolean) {
  if (busy) { event.preventDefault(); event.stopPropagation(); }
}

const urlEdit = useInlineTitleEdit<{ id: string; url: string }>({
  save: (target, draft) => launcherService.editLinkUrl(target.id, target.url, draft),
  apply: (target, url) => {
    if (state.linkMenu.link?.id === target.id) state.linkMenu.link = { ...state.linkMenu.link, url };
  },
  detachedError: detachedTitleError
});
const { editing: isEditingLinkUrl, draft: editingLinkUrlText, busy: linkUrlBusy,
  message: linkUrlMessage, failed: linkUrlFailed, revision: linkUrlRevision } = urlEdit;

const noteEdit = useInlineTitleEdit<{ id: string; note: string }>({
  save: (target, draft) => launcherService.editLinkNote(target.id, target.note, draft),
  apply: (target, note) => {
    if (state.linkMenu.link?.id === target.id) state.linkMenu.link = { ...state.linkMenu.link, note };
  },
  detachedError: detachedTitleError
});
const { editing: isEditingLinkNote, draft: editingLinkNoteText, busy: linkNoteBusy,
  message: linkNoteMessage, failed: linkNoteFailed, revision: linkNoteRevision } = noteEdit;

const linkMenuBusy = computed(() => linkTitleBusy.value || linkUrlBusy.value || linkNoteBusy.value);
function startEditLinkUrl() {
  const link = state.linkMenu.link;
  if (!link || linkMenuBusy.value) return;
  linkEdit.reset();
  noteEdit.reset();
  urlEdit.start({ id: link.id, url: link.url || "" }, link.url || "");
}
const saveLinkUrl = urlEdit.commit;
const cancelEditLinkUrl = urlEdit.cancel;
function shareLink(target: ChatShareTarget) {
  const link = state.linkMenu.link;
  if (!link || linkMenuBusy.value) return;
  const allLinks = launcherService.getState().links;
  const full = allLinks.find(l => String(l.id) === String(link.id)) || link;
  let safeIcon = (full as any).customIcon || (full as any).icon || "";
  if (!safeIcon && link.url) {
    const cached = launcherService.getCachedIcon(link.url);
    if (cached && cached.length <= 64 * 1024) safeIcon = cached;
  }
  const payload = {
    title: link.title || "网站",
    url: link.url || "",
    icon: safeIcon,
    note: link.note || ""
  };
  handleCloseAll();
  chatService.sendWebsiteShare(payload, target);
}

function startEditLinkNote() {
  const link = state.linkMenu.link;
  if (!link || linkMenuBusy.value) return;
  linkEdit.reset();
  urlEdit.reset();
  noteEdit.start({ id: link.id, note: link.note || "" }, link.note || "");
}
const saveLinkNote = noteEdit.commit;
const cancelEditLinkNote = noteEdit.cancel;

function handleCloseAll() {
  // A blur submission must settle before an outside click can discard its feedback/draft.
  if (linkMenuBusy.value || folderTitleBusy.value ||
      (isEditingLinkUrl.value && linkUrlFailed.value) ||
      (isEditingLinkNote.value && linkNoteFailed.value) ||
      (isEditingLinkTitle.value && linkTitleFailed.value) ||
      (isEditingFolderTitle.value && folderTitleFailed.value)) return;
  linkEdit.reset();
  folderEdit.reset();
  urlEdit.reset();
  noteEdit.reset();
  resetConfirmStates();
  state.folderMenu.flyoutOpen = false;
  state.linkMenu.flyoutOpen = false;
  launcherMenusController.closeAll();
  launcherMenusController.dispatch("close");
}

const pluginFolderActions = computed(() => {
  if (!state.folderMenu.groupName) return [];
  return pluginSlots.getMenuActionsForTarget({
    id: state.folderMenu.groupName,
    title: state.folderMenu.groupName,
    kind: "folder", source: "launcher"
  });
});

const pluginLinkActions = computed(() => {
  const link = state.linkMenu.link;
  if (!link) return [];
  return pluginSlots.getMenuActionsForTarget({
    id: String(link.id),
    title: link.title || "",
    url: link.url,
    kind: "link", source: "launcher"
  });
});

async function runPluginAction(action: MenuSlotAction, target: { id: string; title: string; url?: string; kind: "link" | "folder" }) {
  handleCloseAll();
  try {
    await action.execute(target);
  } catch (err: any) {
    notifications.show({ appName: "插件扩展", title: "执行失败", message: err?.message || "操作未完成" });
  }
}

function handleFolderRename() {
  startEditFolderTitle();
}

function handleFolderToggleSize() {
  const group = state.folderMenu.groupName;
  launcherMenusController.closeFolderMenu();
  launcherMenusController.dispatch("folder:toggle-size", { group });
}

function handleFolderMove(page: string) {
  state.folderMenu.flyoutOpen = false;
  const group = state.folderMenu.groupName;
  launcherMenusController.closeFolderMenu();
  launcherMenusController.dispatch("folder:move", { group, page });
}

function handleFolderDelete(event?: MouseEvent) {
  event?.stopPropagation();
  if (!isConfirmingFolderDelete.value) {
    isConfirmingFolderDelete.value = true;
    return;
  }
  isConfirmingFolderDelete.value = false;
  const group = state.folderMenu.groupName;
  launcherMenusController.closeFolderMenu();
  launcherMenusController.dispatch("folder:delete", { group });
}

function handleLinkRename() {
  startEditLinkTitle();
}

function handleLinkChangeIcon() {
  const link = state.linkMenu.link;
  launcherMenusController.closeLinkMenu();
  launcherMenusController.dispatch("link:change-icon", { link });
}

function handleCreateLargeFolder() {
  const link = state.linkMenu.link;
  launcherMenusController.closeLinkMenu();
  launcherMenusController.dispatch("link:create-large-folder", { link });
}

function handleMoveOut() {
  const link = state.linkMenu.link;
  launcherMenusController.closeLinkMenu();
  launcherMenusController.dispatch("link:move-out", { link });
}

function handleLinkMove(page: string) {
  state.linkMenu.flyoutOpen = false;
  const link = state.linkMenu.link;
  launcherMenusController.closeLinkMenu();
  launcherMenusController.dispatch("link:move", { link, page });
}

function handleLinkDelete(event?: MouseEvent) {
  event?.stopPropagation();
  if (!isConfirmingLinkDelete.value) {
    isConfirmingLinkDelete.value = true;
    return;
  }
  isConfirmingLinkDelete.value = false;
  const link = state.linkMenu.link;
  launcherMenusController.closeLinkMenu();
  launcherMenusController.dispatch("link:delete", { link });
}

function handlePageRename() {
  const page = state.pageMenu.pageName;
  launcherMenusController.closePageMenu();
  launcherMenusController.dispatch("page:rename", { page });
}

function handlePageDelete(event?: MouseEvent) {
  event?.stopPropagation();
  if (!isConfirmingPageDelete.value) {
    isConfirmingPageDelete.value = true;
    return;
  }
  isConfirmingPageDelete.value = false;
  const page = state.pageMenu.pageName;
  launcherMenusController.closePageMenu();
  launcherMenusController.dispatch("page:delete", { page });
}

function handleBlankCreateLargeFolder() {
  const page = state.blankMenu.page;
  launcherMenusController.closeBlankMenu();
  launcherMenusController.dispatch("blank:create-large-folder", { page });
}

function handleBlankCreateMediumFolder() {
  const page = state.blankMenu.page;
  launcherMenusController.closeBlankMenu();
  launcherMenusController.dispatch("blank:create-medium-folder", { page });
}

// A new right-click target must never inherit the previous target's edit/delete mode.
watch(() => [state.folderMenu, state.folderMenu.isOpen], () => {
  folderEdit.reset();
  isConfirmingFolderDelete.value = false;
}, { flush: "sync" });
watch(() => [state.linkMenu, state.linkMenu.isOpen], () => {
  linkEdit.reset();
  urlEdit.reset();
  noteEdit.reset();
  isConfirmingLinkDelete.value = false;
}, { flush: "sync" });
watch(() => [state.pageMenu, state.pageMenu.isOpen], () => {
  isConfirmingPageDelete.value = false;
}, { flush: "sync" });
</script>

<template>
  <div class="launcher-menus-island">
    <!-- 文件夹右键菜单遮罩与菜单 -->
    <div
      id="folder-menu-backdrop"
      class="folder-menu-backdrop"
      :hidden="!state.folderMenu.isOpen"
      @click="handleCloseAll"
      @contextmenu.prevent="handleCloseAll"
    ></div>
    <div
      id="folder-menu"
      class="folder-menu"
      role="menu"
      :hidden="!state.folderMenu.isOpen"
      :style="folderMenuStyle"
      @click.capture="guardTitleAction($event, folderTitleBusy)"
    >
      <!-- 大/中文件夹标题区：支持直接点击或通过“重命名”菜单内联编辑，告别浏览器原生 prompt -->
      <LauncherMenuTitle :title="state.folderMenu.groupName" title-id="folder-menu-title" :editing="isEditingFolderTitle"
        v-model:draft="editingFolderTitleText" :busy="folderTitleBusy" :revision="folderTitleRevision" :failed="folderTitleFailed" :message="folderTitleMessage"
        :maxlength="20" placeholder="输入文件夹名称" @start="startEditFolderTitle" @commit="saveFolderTitle" @cancel="cancelEditFolderTitle" />
      <button id="folder-menu-rename" type="button" @click="handleFolderRename">
        重命名收藏夹
      </button>
      <button id="folder-menu-size" type="button" @click="handleFolderToggleSize">
        {{ state.folderMenu.sizeText }}
      </button>
      <LauncherMoveMenu id="folder-menu-move-wrapper" button-id="folder-menu-move-page" submenu-id="folder-move-flyout"
        v-model:open="state.folderMenu.flyoutOpen" :visible="state.folderMenu.isOpen"
        :x="state.folderMenu.x" :y="state.folderMenu.y" :items="state.folderMenu.pages"
        :disabled="!state.folderMenu.canMove || folderTitleBusy" label="移动到其他分区"
        :title="state.folderMenu.canMove ? '将此大收藏夹添加到指定网站分区' : '当前只有一个分区，先新建分区再移动'"
        @select="handleFolderMove" />
      <button v-for="action in pluginFolderActions" :key="action.id" type="button"
        :disabled="action.disabled?.({ id: state.folderMenu.groupName, title: state.folderMenu.groupName, kind: 'folder' })"
        @click="runPluginAction(action, { id: state.folderMenu.groupName, title: state.folderMenu.groupName, kind: 'folder' })">
        <span v-if="action.icon" style="margin-right: 6px;">{{ action.icon }}</span>
        <span>{{ action.label }}</span>
      </button>
      <button
        id="folder-menu-delete"
        type="button"
        class="danger"
        :class="{ 'is-confirming': isConfirmingFolderDelete }"
        @click="handleFolderDelete"
      >
        {{ isConfirmingFolderDelete ? "确定？" : "删除文件夹" }}
      </button>
    </div>

    <!-- 单个网站右键菜单遮罩与菜单 -->
    <div
      id="link-menu-backdrop"
      class="folder-menu-backdrop"
      :hidden="!state.linkMenu.isOpen"
      @click="handleCloseAll"
      @contextmenu.prevent="handleCloseAll"
    ></div>
    <div
      id="link-menu"
      class="folder-menu"
      role="menu"
      :hidden="!state.linkMenu.isOpen"
      :style="linkMenuStyle"
      @click.capture="guardTitleAction($event, linkMenuBusy)"
    >
      <!-- 网站标题区：支持直接点击或通过“重命名”菜单内联就地编辑，彻底告别浏览器原生 prompt -->
      <LauncherMenuTitle :title="state.linkMenu.link?.title || ''" title-id="link-menu-title" :editing="isEditingLinkTitle"
        v-model:draft="editingLinkTitleText" :busy="linkTitleBusy" :revision="linkTitleRevision" :failed="linkTitleFailed" :message="linkTitleMessage"
        @start="startEditLinkTitle" @commit="saveLinkTitle" @cancel="cancelEditLinkTitle">

        <!-- 网站网址仍支持点击就地修改；菜单原“编辑”位置用于指定房间分享。 -->
        <LauncherMenuUrl :url="state.linkMenu.link?.url || ''" :editing="isEditingLinkUrl"
          v-model:draft="editingLinkUrlText" :busy="linkUrlBusy" :revision="linkUrlRevision" :failed="linkUrlFailed" :message="linkUrlMessage"
          @start="startEditLinkUrl" @commit="saveLinkUrl" @cancel="cancelEditLinkUrl" />

        <!-- 网站备注编辑区：点击可直接修改备注，鼠标悬浮图标时呈现 -->
        <LauncherMenuNote :note="state.linkMenu.link?.note || ''" :editing="isEditingLinkNote"
          v-model:draft="editingLinkNoteText" :busy="linkNoteBusy" :revision="linkNoteRevision" :failed="linkNoteFailed" :message="linkNoteMessage"
          @start="startEditLinkNote" @commit="saveLinkNote" @cancel="cancelEditLinkNote" />
      </LauncherMenuTitle>
      <LauncherMoveMenu id="link-menu-move-wrapper" button-id="link-menu-move" submenu-id="link-move-flyout"
        v-model:open="state.linkMenu.flyoutOpen" :visible="state.linkMenu.isOpen"
        :x="state.linkMenu.x" :y="state.linkMenu.y" :items="state.linkMenu.pages"
        :disabled="linkMenuBusy" :vertical-budget="280" @select="handleLinkMove" />
      <button v-if="state.linkMenu.link?.group && state.linkMenu.link.group !== '常用网站'" type="button" @click="handleMoveOut">移出文件夹，放到外面</button>
      <button id="link-menu-rename" type="button" @click="handleLinkRename">
        重命名
      </button>
      <ChatShareMenu id="link-menu-send" :visible="state.linkMenu.isOpen" :disabled="linkMenuBusy" @open="state.linkMenu.flyoutOpen = false" @select="shareLink" />
      <button id="link-menu-change-icon" type="button" @click="handleLinkChangeIcon">
        获取头像
      </button>
      <button v-for="action in pluginLinkActions" :key="action.id" type="button"
        :disabled="action.disabled?.({ id: String(state.linkMenu.link?.id), title: state.linkMenu.link?.title || '', url: state.linkMenu.link?.url, kind: 'link' })"
        @click="state.linkMenu.link && runPluginAction(action, { id: String(state.linkMenu.link.id), title: state.linkMenu.link.title || '', url: state.linkMenu.link.url, kind: 'link' })">
        <span v-if="action.icon" style="margin-right: 6px;">{{ action.icon }}</span>
        <span>{{ action.label }}</span>
      </button>
      <button
        id="link-menu-delete"
        type="button"
        class="danger"
        :class="{ 'is-confirming': isConfirmingLinkDelete }"
        @click="handleLinkDelete"
      >
        {{ isConfirmingLinkDelete ? "确定？" : "删除网站" }}
      </button>
    </div>

    <!-- 分区标签右键菜单遮罩与菜单 -->
    <div
      id="page-menu-backdrop"
      class="folder-menu-backdrop"
      :hidden="!state.pageMenu.isOpen"
      @click="handleCloseAll"
      @contextmenu.prevent="handleCloseAll"
    ></div>
    <div
      id="page-menu"
      class="folder-menu"
      role="menu"
      :hidden="!state.pageMenu.isOpen"
      :style="pageMenuStyle"
    >
      <p id="page-menu-title">分区 · {{ state.pageMenu.pageLabel }}</p>
      <button id="page-menu-rename" type="button" @click="handlePageRename">
        重命名分区
      </button>
      <button
        id="page-menu-delete"
        type="button"
        class="danger"
        :class="{ 'is-confirming': isConfirmingPageDelete }"
        :disabled="!state.pageMenu.canDelete"
        :title="!state.pageMenu.canDelete ? '至少需要保留一个分区' : `删除「${state.pageMenu.pageLabel}」分区`"
        @click="handlePageDelete"
      >
        {{ isConfirmingPageDelete ? "确定？" : "删除分区" }}
      </button>
    </div>

    <!-- 常用网站空白区域右键菜单 -->
    <div
      id="blank-menu-backdrop"
      class="folder-menu-backdrop"
      :hidden="!state.blankMenu.isOpen"
      @click="handleCloseAll"
      @contextmenu.prevent="handleCloseAll"
    ></div>
    <div
      id="blank-menu"
      class="folder-menu"
      role="menu"
      :hidden="!state.blankMenu.isOpen"
      :style="blankMenuStyle"
    >
      <button id="blank-menu-create-folder" type="button" @click="handleBlankCreateLargeFolder">
        创建大文件夹
      </button>
      <button id="blank-menu-create-medium-folder" type="button" @click="handleBlankCreateMediumFolder">
        创建中文件夹
      </button>
    </div>
  </div>
</template>
