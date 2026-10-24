<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import LauncherMenuTitle from '../launcher/LauncherMenuTitle.vue';
import LauncherMenuUrl from '../launcher/LauncherMenuUrl.vue';
import LauncherMoveMenu from '../launcher/LauncherMoveMenu.vue';
import { pluginSlots, type MenuSlotAction } from '../sdk/slots';
import { InlineTitleInput, InlineEditStatus, useInlineTitleEdit, useContextMenu } from '../sdk/interactions';
import { notifications } from '../sdk/notifications';
import type { BookmarkBoardItem } from './board-data';
const props = defineProps<{
  target: { item?: BookmarkBoardItem; parentId: string; x: number; y: number; section?: boolean };
  busy: boolean; blocked: boolean; size: 'small' | 'large'; outerParentId?: string;
  destinations: { id: string; title: string; disabled: boolean }[];
  saveText: (item: BookmarkBoardItem, field: 'title' | 'url', value: string) => Promise<string>;
  createFolder: (parentId: string, title: string) => Promise<string>;
  remove: (item: BookmarkBoardItem) => Promise<void>;
  move: (item: BookmarkBoardItem, parentId: string) => Promise<void>;
}>();
const emit = defineEmits<{ close: []; toggleSize: [id: string]; refresh: []; changeIcon: [item: BookmarkBoardItem] }>();
const confirming = ref(false), flyout = ref(false), actionError = ref('');
const detachedError = (message: string) => notifications.show({ appName: '书签', title: '保存未完成', message });
const liveItem = shallowRef(props.target.item);
const titleEdit = useInlineTitleEdit<BookmarkBoardItem>({ save: (item, draft) => props.saveText(item, 'title', draft), apply: (item, saved) => { displayTitle.value = saved; liveItem.value = { ...item, title: saved }; }, detachedError });
const urlEdit = useInlineTitleEdit<BookmarkBoardItem>({ save: (item, draft) => props.saveText(item, 'url', draft), apply: (item, saved) => { displayUrl.value = saved; if (item.kind === 'link') liveItem.value = { ...item, url: saved }; }, detachedError });
const creation = useInlineTitleEdit<string>({ save: (parentId, draft) => props.createFolder(parentId, draft), apply: () => emit('close'), detachedError });
const displayTitle = ref(props.target.item?.title || '书签'), displayUrl = ref(props.target.item?.kind === 'link' ? props.target.item.url : '');
const locked = computed(() => props.busy || titleEdit.busy.value || urlEdit.busy.value || creation.busy.value);
const editing = computed(() => titleEdit.editing.value || urlEdit.editing.value || creation.editing.value);
const actionsBlocked = computed(() => locked.value || props.blocked || editing.value);
const canDismiss = computed(() => !locked.value && !editing.value);
defineExpose({ canDismiss });
function dismiss() {
  if (!canDismiss.value) return;
  emit('close');
}
const { menuRef, style } = useContextMenu({ visible: () => true, anchor: () => props.target, dismiss });
// Like the original folder-menu: allow its side flyout outside the parent box.
const menuStyle = computed(() => ({ ...style.value,
  overflowX: flyout.value ? 'visible' as const : 'hidden' as const,
  overflowY: flyout.value ? 'visible' as const : 'auto' as const
}));
const moveItems = computed(() => props.destinations.map(item => ({ id: item.id, name: item.title, disabled: item.disabled })));
function startTitle() {
  if (actionsBlocked.value || !liveItem.value) return;
  urlEdit.reset(); confirming.value = false;
  titleEdit.start({ ...liveItem.value, title: displayTitle.value }, displayTitle.value);
}
function startUrl() {
  if (actionsBlocked.value || liveItem.value?.kind !== 'link') return;
  titleEdit.reset(); confirming.value = false;
  urlEdit.start({ ...liveItem.value, url: displayUrl.value }, displayUrl.value);
}
function create() {
  if (actionsBlocked.value) return;
  creation.start(props.target.item?.kind === 'folder' ? props.target.item.id : props.target.parentId, '');
}
async function moveTo(parentId: string) {
  if (!liveItem.value || actionsBlocked.value) return;
  try { await props.move(liveItem.value, parentId); emit('close'); }
  catch (err) { actionError.value = err instanceof Error ? err.message : '移动失败，请刷新核对。'; }
}
async function remove() {
  if (!liveItem.value || actionsBlocked.value) return;
  if (!confirming.value) { confirming.value = true; return; }
  try { await props.remove(liveItem.value); emit('close'); }
  catch (err) { confirming.value = false; actionError.value = err instanceof Error ? err.message : '删除失败，请刷新核对。'; }
}
function handleToggleSize(id: string) {
  if (actionsBlocked.value) return;
  emit('toggleSize', id);
  emit('close');
}

const pluginFolderActions = computed(() => {
  if (!props.target.item || props.target.item.kind !== 'folder') return [];
  return pluginSlots.getMenuActionsForTarget({
    id: props.target.item.id,
    title: props.target.item.title,
    kind: 'folder', source: 'bookmarks'
  });
});

const pluginLinkActions = computed(() => {
  if (!props.target.item || props.target.item.kind !== 'link') return [];
  return pluginSlots.getMenuActionsForTarget({
    id: props.target.item.id,
    title: props.target.item.title,
    url: props.target.item.url,
    kind: 'link', source: 'bookmarks'
  });
});

async function runPluginAction(action: MenuSlotAction, target: { id: string; title: string; url?: string; kind: 'link' | 'folder' }) {
  if (actionsBlocked.value) return;
  emit('close');
  try {
    await action.execute(target);
  } catch (err: any) {
    notifications.show({ appName: '插件扩展', title: '执行失败', message: err?.message || '操作未完成' });
  }
}
</script>

<template>
  <Teleport to="body">
    <div ref="menuRef" class="folder-menu bookmark-board-menu" role="menu" :style="menuStyle" @pointerdown.stop @contextmenu.prevent.stop
      @click.capture="locked && ($event.preventDefault(), $event.stopPropagation())">
      <LauncherMenuTitle v-if="target.item" :title="displayTitle" :editing="titleEdit.editing.value" v-model:draft="titleEdit.draft.value"
        :busy="titleEdit.busy.value" :revision="titleEdit.revision.value" :failed="titleEdit.failed.value" :message="titleEdit.message.value"
        :maxlength="100" @start="startTitle" @commit="titleEdit.commit" @cancel="titleEdit.cancel">
        <template v-if="target.item.kind === 'link'">
          <LauncherMenuUrl :url="displayUrl" :editing="urlEdit.editing.value" v-model:draft="urlEdit.draft.value"
            :busy="urlEdit.busy.value" :revision="urlEdit.revision.value" :failed="urlEdit.failed.value" :message="urlEdit.message.value"
            @start="startUrl" @commit="urlEdit.commit" @cancel="urlEdit.cancel" />
        </template>
      </LauncherMenuTitle>
      <p v-else>书签操作</p>
      <span v-if="actionError" class="bookmark-menu-error" role="status">{{ actionError }}</span>
      <!-- 文件夹右键菜单：严格对齐常用网站 LauncherMenus.vue 文件夹菜单结构 -->
      <template v-if="target.item?.kind === 'folder'">
        <button id="folder-menu-rename" type="button" :disabled="actionsBlocked" @click="startTitle">
          {{ target.section ? '重命名板块' : '重命名收藏夹' }}
        </button>
        <button v-if="!target.section" id="folder-menu-size" type="button" :disabled="actionsBlocked" @click="handleToggleSize(target.item.id)">
          {{ size === 'small' ? '扩大为大收藏夹' : '收缩为中收藏夹' }}
        </button>
        <LauncherMoveMenu v-model:open="flyout" :visible="true" :disabled="actionsBlocked || !moveItems.length" label="移动到其他分区"
          :items="moveItems" :x="Number.parseFloat(String(style.left || 0))" :y="Number.parseFloat(String(style.top || 0))"
          :vertical-budget="240" empty-text="暂无其他分区" @select="moveTo" />
        <button v-for="action in pluginFolderActions" :key="action.id" type="button" :disabled="actionsBlocked || action.disabled?.({ id: target.item.id, title: target.item.title, kind: 'folder' })"
          @click="runPluginAction(action, { id: target.item.id, title: target.item.title, kind: 'folder' })">
          <span v-if="action.icon" style="margin-right: 6px;">{{ action.icon }}</span>
          <span>{{ action.label }}</span>
        </button>
        <button id="folder-menu-delete" type="button" class="danger" :class="{ 'is-confirming': confirming }" :disabled="actionsBlocked" @click="remove">
          {{ confirming ? `确认删除整个文件夹及 ${target.item.count} 个书签？` : (target.section ? '删除板块' : '删除文件夹') }}
        </button>
      </template>

      <!-- 单个网站右键菜单：严格对齐常用网站 link-menu 5项 -->
      <template v-else-if="target.item?.kind === 'link'">
        <LauncherMoveMenu v-model:open="flyout" :visible="true" :disabled="actionsBlocked || !moveItems.length" label="移动到分区"
          :items="moveItems" :x="Number.parseFloat(String(style.left || 0))" :y="Number.parseFloat(String(style.top || 0))"
          :vertical-budget="280" empty-text="暂无其他可移动分区" @select="moveTo" />
        <button id="link-menu-rename" type="button" :disabled="actionsBlocked" @click="startTitle">重命名</button>
        <button id="link-menu-edit" type="button" :disabled="actionsBlocked" @click="startUrl">编辑</button>
        <button id="link-menu-change-icon" type="button" :disabled="actionsBlocked" @click="liveItem && emit('changeIcon', liveItem)">获取头像</button>
        <button v-for="action in pluginLinkActions" :key="action.id" type="button" :disabled="actionsBlocked || action.disabled?.({ id: target.item.id, title: target.item.title, url: target.item.url, kind: 'link' })"
          @click="runPluginAction(action, { id: target.item.id, title: target.item.title, url: target.item.url, kind: 'link' })">
          <span v-if="action.icon" style="margin-right: 6px;">{{ action.icon }}</span>
          <span>{{ action.label }}</span>
        </button>
        <button id="link-menu-delete" type="button" class="danger" :class="{ 'is-confirming': confirming }" :disabled="actionsBlocked" @click="remove">
          {{ confirming ? '确定删除此书签？' : '删除网站' }}
        </button>
      </template>

      <!-- 空白处右键：保留创建中文件夹 -->
      <template v-else>
        <button type="button" :disabled="actionsBlocked" @click="create">创建中文件夹</button>
        <div v-if="creation.editing.value" class="link-menu-header">
          <InlineTitleInput v-model="creation.draft.value" :busy="creation.busy.value" :revision="creation.revision.value" :aria-invalid="creation.failed.value || undefined" class="link-menu-title-input" maxlength="100" placeholder="输入文件夹名称" @commit="creation.commit" @cancel="creation.cancel" />
          <InlineEditStatus :message="creation.message.value" :failed="creation.failed.value" />
        </div>
      </template>
      <button v-if="blocked" type="button" :disabled="locked" @click="emit('refresh')">刷新核对后恢复操作</button>
    </div>
  </Teleport>
</template>
<style scoped>
.bookmark-menu-error { display: block; font-size: 11px; color: var(--muted); margin: 4px; }
</style>
