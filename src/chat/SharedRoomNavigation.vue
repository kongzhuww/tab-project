<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { privateChatConfig } from "./private-chat-config";
import { chatModuleState as state } from "./chat-state";
import {
  privateChatState as chat,
  selectSharedRoom,
  saveSharedRoom,
  archiveSharedRoom,
  saveSharedSpace,
  archiveSharedSpace,
  openDirectMessage,
  dmChannelId,
  type SharedChatRoom,
  type SharedChatSpace
} from "./private-chat-client";
import { safeImageUrl } from "./chat-security";

const emit = defineEmits<{ settings: [] }>();
const owner = computed(() => chat.role === "owner");
const navMode = ref<"spaces" | "dm">(chat.channel.startsWith("dm_") ? "dm" : "spaces");
const selectedSpace = ref("hub_main");
const space = computed(() => chat.spaces.find(s => s.id === selectedSpace.value) || chat.spaces[0]);
const channels = computed(() => chat.rooms.filter(r => (r.space || "hub_main") === space.value?.id));
const menuOpen = ref(false);

// 右键悬浮菜单状态
const spaceContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  space: SharedChatSpace | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  space: null
});

const roomContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  room: SharedChatRoom | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  room: null
});

// 编辑与重命名弹窗状态
const editor = ref<"space" | "room" | "">("");
const editingId = ref("");
const editorSpace = ref("");
const name = ref(""), icon = ref("💬"), description = ref("");
const busy = ref(false), notice = ref("");
let generation = 0;

// 删除确认弹窗状态
const deletingTarget = ref<{
  type: "space" | "room";
  id: string;
  name: string;
} | null>(null);

function closeContextMenus() {
  spaceContextMenu.value.visible = false;
  roomContextMenu.value.visible = false;
  menuOpen.value = false;
}

function onWindowClick() {
  closeContextMenus();
}

onMounted(() => {
  window.addEventListener("click", onWindowClick);
});

onUnmounted(() => {
  window.removeEventListener("click", onWindowClick);
});

function avatarFallback(value: unknown): string {
  return typeof value === "string" && value.length <= 8 && !/[:/]/.test(value) ? value || "🦫" : "🦫";
}

const friendList = computed(() => {
  const result: Array<{ uid: string; name: string; avatar: string; online: boolean; activity?: any; role?: string }> = [];
  const friendUids = new Set([...chat.friends, ...state.friends.map(f => f.uid)]);
  for (const fUid of friendUids) {
    if (fUid === state.currentUser.uid) continue;
    const member = chat.members.find(m => m.uid === fUid);
    const local = state.friends.find(f => f.uid === fUid);
    const mName = member?.name || local?.name || fUid;
    const mAvatar = member?.avatar || local?.avatar || "🦫";
    const online = member?.online ?? false;
    const activity = member?.activity || state.userActivities[fUid];
    result.push({
      uid: fUid,
      name: mName,
      avatar: mAvatar,
      online,
      activity,
      role: member?.role
    });
  }
  return result;
});

const incomingRequestsCount = computed(() => {
  return state.friendRequests.filter(r => r.toUid === state.currentUser.uid && r.status === "pending").length;
});

function openDmTab() {
  navMode.value = "dm";
  closeContextMenus();
  if (friendList.value.length && !chat.channel.startsWith("dm_")) {
    openDirectMessage(friendList.value[0].uid);
  }
}

function openFriendDm(friendUid: string) {
  openDirectMessage(friendUid);
}

watch(() => JSON.stringify(privateChatConfig.room), () => {
  generation++; editor.value = ""; deletingTarget.value = null; notice.value = ""; selectedSpace.value = "hub_main"; closeContextMenus();
});
watch(() => [chat.channel, chat.rooms.find(r => r.id === chat.channel)?.space], () => {
  if (chat.channel.startsWith("dm_")) {
    navMode.value = "dm";
  } else {
    navMode.value = "spaces";
    const current = chat.rooms.find(r => r.id === chat.channel);
    if (current) selectedSpace.value = current.space || "hub_main";
  }
}, { immediate: true });
watch(() => chat.spaces.map(s => s.id).join(","), () => {
  if (!chat.spaces.some(s => s.id === selectedSpace.value)) selectedSpace.value = chat.spaces[0]?.id || "hub_main";
});

function chooseSpace(s: SharedChatSpace) {
  navMode.value = "spaces";
  closeContextMenus();
  if (s.id === space.value?.id && !chat.channel.startsWith("dm_")) return;
  selectedSpace.value = s.id;
  const first = chat.rooms.find(r => (r.space || "hub_main") === s.id);
  if (first) selectSharedRoom(first.id);
  else selectSharedRoom("main");
}

// 空间右键菜单触发
function onSpaceContextMenu(e: MouseEvent, s: SharedChatSpace) {
  e.preventDefault();
  e.stopPropagation();
  closeContextMenus();
  spaceContextMenu.value = {
    visible: true,
    x: Math.min(e.clientX, window.innerWidth - 180),
    y: Math.min(e.clientY, window.innerHeight - 150),
    space: s
  };
}

// 房间频道右键菜单触发
function onRoomContextMenu(e: MouseEvent, r: SharedChatRoom) {
  e.preventDefault();
  e.stopPropagation();
  closeContextMenus();
  roomContextMenu.value = {
    visible: true,
    x: Math.min(e.clientX, window.innerWidth - 180),
    y: Math.min(e.clientY, window.innerHeight - 150),
    room: r
  };
}

// 从菜单打开空间改名/设置
function handleRenameSpace(s: SharedChatSpace) {
  closeContextMenus();
  editSpace(s);
}

// 从菜单触发删除空间
function handlePromptDeleteSpace(s: SharedChatSpace) {
  closeContextMenus();
  if (s.id === "hub_main") return;
  deletingTarget.value = {
    type: "space",
    id: s.id,
    name: s.name
  };
}

// 从菜单打开房间改名/设置
function handleRenameRoom(r: SharedChatRoom) {
  closeContextMenus();
  editRoom(r);
}

// 从菜单触发删除房间
function handlePromptDeleteRoom(r: SharedChatRoom) {
  closeContextMenus();
  if (r.id === "main") return;
  deletingTarget.value = {
    type: "room",
    id: r.id,
    name: r.name
  };
}

function editRoom(room?: SharedChatRoom) {
  editor.value = "room";
  editingId.value = room?.id || "";
  editorSpace.value = room?.space || space.value?.id || "hub_main";
  name.value = room?.name || "";
  icon.value = room?.icon || "💬";
  description.value = room?.description || "";
  notice.value = "";
  closeContextMenus();
}

function editSpace(value?: SharedChatSpace) {
  editor.value = "space";
  editingId.value = value?.id || "";
  editorSpace.value = "";
  name.value = value?.name || "";
  icon.value = value?.icon || "👥";
  description.value = "";
  notice.value = "";
  closeContextMenus();
}

async function save() {
  if (busy.value || !name.value.trim()) return;
  const version = generation;
  busy.value = true;
  notice.value = "";
  try {
    if (editor.value === "space") {
      await saveSharedSpace({ name: name.value.trim(), icon: icon.value.trim() || "👥" }, editingId.value || undefined);
    } else {
      await saveSharedRoom({
        name: name.value.trim(),
        icon: icon.value.trim() || "💬",
        description: description.value.trim(),
        space: editorSpace.value
      }, editingId.value || undefined);
    }
    if (version === generation) editor.value = "";
  } catch {
    if (version === generation) notice.value = "未确认保存结果，请检查连接和列表，不要重复创建。";
  } finally {
    busy.value = false;
  }
}

function promptDeleteFromEditor() {
  if (!editingId.value) return;
  const targetId = editingId.value;
  const targetName = name.value;
  const targetType = editor.value as "space" | "room";
  editor.value = "";
  deletingTarget.value = {
    type: targetType,
    id: targetId,
    name: targetName
  };
}

async function executeDelete() {
  if (!deletingTarget.value || busy.value) return;
  const target = deletingTarget.value;
  const version = generation;
  busy.value = true;
  notice.value = "";
  try {
    if (target.type === "space") {
      await archiveSharedSpace(target.id);
    } else {
      await archiveSharedRoom(target.id);
    }
    if (version === generation) deletingTarget.value = null;
  } catch {
    if (version === generation) notice.value = "移除未确认，请检查连接；聊天历史不会被删除。";
  } finally {
    busy.value = false;
  }
}

const canArchive = computed(() => editingId.value && (editor.value === "space" ? editingId.value !== "hub_main" : editingId.value !== "main"));
</script>
<template>
  <div class="discord-navigation">
    <!-- 空间图标栏 (最左侧 44px) -->
    <nav class="col-groups-sidebar" aria-label="聊天空间">
      <div class="groups-icons-scroll">
        <!-- 顶部私信 / 好友入口 (类似 Discord 经典左上角好友会话) -->
        <button
          type="button"
          class="group-icon-pill dm-entry-pill"
          :class="{ active: navMode === 'dm' }"
          title="私信与好友"
          aria-label="私信与好友"
          @click="openDmTab"
        >
          <span class="grp-emoji">💬</span>
          <span v-if="incomingRequestsCount > 0" class="sidebar-badge">{{ incomingRequestsCount }}</span>
        </button>
        <div class="sidebar-divider"></div>

        <!-- 空间列表 (左键切换，右键弹出菜单管理/重命名/删除) -->
        <button
          v-for="s in chat.spaces"
          :key="s.id"
          type="button"
          class="group-icon-pill"
          :class="{ active: navMode === 'spaces' && space?.id === s.id }"
          :title="`空间：${s.name}${owner ? '（右键改名/删除）' : ''}`"
          :aria-label="s.name"
          :aria-pressed="navMode === 'spaces' && space?.id === s.id"
          @click="chooseSpace(s)"
          @contextmenu.prevent="onSpaceContextMenu($event, s)"
        >
          <span>{{ s.icon || '👥' }}</span>
        </button>
        <button
          v-if="owner && chat.spacesSupported"
          type="button"
          class="group-add-btn"
          title="创建新空间"
          aria-label="创建新空间"
          :disabled="busy"
          @click="editSpace()"
        >
          ＋
        </button>
      </div>
      <button
        type="button"
        class="sidebar-settings-btn"
        title="我的资料与连接设置"
        aria-label="我的资料与连接设置"
        @click="emit('settings')"
      >
        ⚙
      </button>
    </nav>

    <!-- 空间右键悬浮菜单 (Teleport 挂载到 body) -->
    <Teleport to="body">
      <div
        v-if="spaceContextMenu.visible && spaceContextMenu.space"
        class="chat-context-menu"
        :style="{ left: `${spaceContextMenu.x}px`, top: `${spaceContextMenu.y}px` }"
        @click.stop
      >
        <div class="chat-context-header">
          <span>{{ spaceContextMenu.space.icon || '👥' }}</span>
          <strong>{{ spaceContextMenu.space.name }}</strong>
        </div>
        <button
          type="button"
          class="chat-context-item"
          @click="handleRenameSpace(spaceContextMenu.space)"
        >
          <span class="chat-context-icon">✏️</span> 空间改名 / 设置
        </button>
        <template v-if="spaceContextMenu.space.id !== 'hub_main'">
          <div class="chat-context-divider"></div>
          <button
            type="button"
            class="chat-context-item text-danger"
            @click="handlePromptDeleteSpace(spaceContextMenu.space)"
          >
            <span class="chat-context-icon">🗑️</span> 删除此空间
          </button>
        </template>
      </div>
    </Teleport>

    <!-- 房间频道右键悬浮菜单 (Teleport 挂载到 body) -->
    <Teleport to="body">
      <div
        v-if="roomContextMenu.visible && roomContextMenu.room"
        class="chat-context-menu"
        :style="{ left: `${roomContextMenu.x}px`, top: `${roomContextMenu.y}px` }"
        @click.stop
      >
        <div class="chat-context-header">
          <span>{{ roomContextMenu.room.icon || '💬' }}</span>
          <strong># {{ roomContextMenu.room.name }}</strong>
        </div>
        <button
          type="button"
          class="chat-context-item"
          @click="handleRenameRoom(roomContextMenu.room)"
        >
          <span class="chat-context-icon">✏️</span> 重命名此房间
        </button>
        <template v-if="roomContextMenu.room.id !== 'main'">
          <div class="chat-context-divider"></div>
          <button
            type="button"
            class="chat-context-item text-danger"
            @click="handlePromptDeleteRoom(roomContextMenu.room)"
          >
            <span class="chat-context-icon">🗑️</span> 删除此房间
          </button>
        </template>
      </div>
    </Teleport>

    <aside class="col-channels-sidebar">
      <!-- 模式 A：私信会话列表（QQ / Discord 经典会话卡片列表） -->
      <template v-if="navMode === 'dm'">
        <div class="channels-header">
          <div class="group-brand-info">
            <span class="group-brand-icon">💬</span>
            <strong class="group-brand-name">私信会话</strong>
          </div>
          <span class="dm-friends-count">{{ friendList.length }} 好友</span>
        </div>
        <div class="dm-sessions-list">
          <div
            v-for="f in friendList"
            :key="f.uid"
            class="dm-session-item"
            :class="{ active: chat.channel === dmChannelId(f.uid) }"
            :title="`点击与【${f.name}】私聊`"
            @click="openFriendDm(f.uid)"
          >
            <div class="dm-avatar-box">
              <img
                v-if="safeImageUrl(f.avatar)"
                :src="safeImageUrl(f.avatar)"
                class="dm-avatar-pic"
                alt=""
                loading="lazy"
                referrerpolicy="no-referrer"
                @error="($event.target as HTMLElement).style.display = 'none'"
              />
              <span v-else class="dm-avatar-char">{{ avatarFallback(f.avatar) }}</span>
              <span class="dm-online-dot" :class="{ online: f.online }"></span>
            </div>
            <div class="dm-item-info">
              <div class="dm-name-row">
                <span class="dm-name-text">{{ f.name }}</span>
                <span v-if="f.role === 'owner'" class="dm-owner-badge">群主</span>
              </div>
              <div class="dm-status-row">
                <span v-if="f.activity?.title" class="dm-act-snippet">
                  {{ f.activity.type === 'bilibili' ? '📺' : f.activity.type === 'github' ? '🐙' : f.activity.type === 'music' ? '🎵' : f.activity.type === 'aihot' ? '🔥' : '🌐' }} {{ f.activity.title }}
                </span>
                <span v-else-if="f.online" class="dm-status-online">当前在线</span>
                <span v-else class="dm-status-offline">离线</span>
              </div>
            </div>
          </div>
          <div v-if="!friendList.length" class="dm-empty-state">
            <p>暂无好友</p>
            <small>在群聊或成员列表中右键点击同学头像，选择「➕ 添加为好友」；通过后即可在此随时私聊。</small>
          </div>
        </div>
      </template>

      <!-- 模式 B：空间与房间频道列表 -->
      <template v-else>
        <div class="channels-header" @contextmenu.prevent="space && onSpaceContextMenu($event, space)">
          <div class="group-brand-info">
            <span class="group-brand-icon">{{ space?.icon || '🏠' }}</span>
            <strong class="group-brand-name">{{ space?.name || '聊天室' }}</strong>
          </div>
          <button v-if="owner" type="button" class="group-more-btn" title="空间设置与管理" aria-label="空间设置与管理" :aria-expanded="menuOpen" @click.stop="menuOpen = !menuOpen">⋮</button>
        </div>
        <div v-if="menuOpen && owner" class="space-menu" @click.stop>
          <button v-if="chat.spacesSupported" type="button" @click="space && editSpace(space)">空间设置 / 改名</button>
          <button v-if="chat.roomsSupported" type="button" @click="editRoom()">创建房间</button>
          <button type="button" @click="menuOpen = false; emit('settings')">成员与邀请</button>
        </div>
        <div class="channels-list-wrap">
          <div class="channel-section-label">
            <span>房间频道</span>
            <button v-if="owner && chat.roomsSupported" type="button" class="btn-fast-add-ch" title="创建房间" aria-label="创建房间" :disabled="busy" @click="editRoom()">＋</button>
          </div>
          <div class="channels-scroll-inner">
            <div v-for="room in channels" :key="room.id" class="channel-line">
              <button
                type="button"
                class="channel-item-btn"
                :class="{ active: chat.channel === room.id }"
                :aria-current="chat.channel === room.id ? 'page' : undefined"
                :title="`${room.name}（右键重命名/删除）`"
                @click="selectSharedRoom(room.id)"
                @contextmenu.prevent="onRoomContextMenu($event, room)"
              >
                <span class="channel-prefix">#</span>
                <span class="channel-icon">{{ room.icon }}</span>
                <span class="channel-title">{{ room.name }}</span>
              </button>
              <button
                type="button"
                class="channel-settings-btn"
                :aria-label="`设置房间：${room.name}`"
                title="设置房间"
                :disabled="busy"
                @click.stop="onRoomContextMenu($event, room)"
              >
                ⚙
              </button>
            </div>
          </div>
          <p v-if="!channels.length" class="room-hint">{{ privateChatConfig.room ? '暂无房间，连接后由服主创建。' : '请先加入聊天室。' }}</p>
        </div>
        <slot name="members" />
      </template>
    </aside>

    <!-- 改名与设置模态弹窗 (Teleport 挂载到 body) -->
    <Teleport to="body">
      <div v-if="editor" class="chat-modal-backdrop" @click="!busy && (editor = '')">
        <div class="chat-manage-dialog-card" @click.stop @keydown.esc="!busy && (editor = '')">
          <div class="manage-dialog-head">
            <strong class="manage-dialog-title">
              {{ editingId ? (editor === 'space' ? '✏️ 空间改名与设置' : '✏️ 房间改名与设置') : (editor === 'space' ? '➕ 创建新空间' : '➕ 创建房间') }}
            </strong>
            <button type="button" class="manage-dialog-close" :disabled="busy" @click="editor = ''">✕</button>
          </div>
          <form class="manage-dialog-form" @submit.prevent="save">
            <label class="manage-label">
              <span>名称</span>
              <input v-model="name" class="manage-input" maxlength="80" required :disabled="busy" placeholder="给它起个名字" autofocus />
            </label>
            <label class="manage-label">
              <span>图标 Emoji</span>
              <div class="emoji-picker-row">
                <input v-model="icon" class="manage-input emoji-input" maxlength="8" :disabled="busy" placeholder="Emoji" />
                <div class="quick-emojis">
                  <button
                    v-for="em in (editor === 'space' ? ['🏠', '🎮', '💻', '☕', '🎵', '📚', '🚀', '🦫'] : ['💬', '🎵', '📺', '🐙', '⚡', '☕', '🎮', '💡'])"
                    :key="em"
                    type="button"
                    class="quick-emoji-btn"
                    :class="{ sel: icon === em }"
                    @click="icon = em"
                  >
                    {{ em }}
                  </button>
                </div>
              </div>
            </label>
            <label v-if="editor === 'room'" class="manage-label">
              <span>房间说明（选填）</span>
              <textarea v-model="description" class="manage-textarea" maxlength="500" rows="2" :disabled="busy" placeholder="简短描述该房间的主题或规矩"></textarea>
            </label>

            <div v-if="notice" class="manage-notice" role="status">{{ notice }}</div>

            <div class="manage-dialog-actions">
              <button
                v-if="canArchive"
                type="button"
                class="manage-btn-delete"
                :disabled="busy"
                @click="promptDeleteFromEditor"
              >
                🗑️ {{ editor === 'space' ? '删除空间' : '删除房间' }}
              </button>
              <div class="manage-actions-right">
                <button type="button" class="manage-btn-cancel" :disabled="busy" @click="editor = ''">取消</button>
                <button type="submit" class="manage-btn-save" :disabled="busy || !name.trim()">{{ busy ? '保存中…' : '保存修改' }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- 删除确认模态弹窗 (Teleport 挂载到 body) -->
    <Teleport to="body">
      <div v-if="deletingTarget" class="chat-modal-backdrop" @click="!busy && (deletingTarget = null)">
        <div class="chat-manage-dialog-card delete-confirm-card" @click.stop>
          <div class="manage-dialog-head">
            <strong class="manage-dialog-title text-danger">
              🗑️ 确认删除{{ deletingTarget.type === 'space' ? '空间' : '房间' }}？
            </strong>
            <button type="button" class="manage-dialog-close" :disabled="busy" @click="deletingTarget = null">✕</button>
          </div>
          <div class="delete-dialog-body">
            <p>
              确定要删除 <strong>{{ deletingTarget.type === 'space' ? '群空间' : '房间' }}【{{ deletingTarget.name }}】</strong> 吗？
            </p>
            <small class="delete-dialog-hint">
              {{ deletingTarget.type === 'space' ? '该空间及其包含的所有子房间将停止访问，聊天历史记录仍完整保留在服务器中。' : '所有成员将无法再进入此房间，聊天历史记录仍完整保留在服务器中。' }}
            </small>
          </div>
          <div v-if="notice" class="manage-notice" role="status">{{ notice }}</div>
          <div class="manage-dialog-actions">
            <button type="button" class="manage-btn-cancel" :disabled="busy" @click="deletingTarget = null">取消</button>
            <button type="button" class="manage-btn-confirm-delete" :disabled="busy" @click="executeDelete">
              {{ busy ? '正在删除…' : '确认删除' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
.discord-navigation { display: flex; flex: 0 0 auto; min-height: 0; position: relative; color: var(--text); }
.col-groups-sidebar { width: 44px; box-sizing: border-box; background: var(--panel); border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 8px 0; flex-shrink: 0; }
.groups-icons-scroll { display: flex; flex-direction: column; align-items: center; gap: 8px; min-height: 0; overflow-y: auto; width: 100%; padding: 2px 0; }
.group-icon-pill { position: relative; width: 32px; height: 32px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; transition: border-radius .15s ease, background .15s ease; }
.group-icon-pill:hover { border-color: var(--heading); }
.group-icon-pill.active { border-radius: 8px; border-color: var(--chat-accent, #10b981); background: color-mix(in srgb, var(--chat-accent, #10b981) 15%, var(--panel)); box-shadow: 0 0 0 1px color-mix(in srgb, var(--chat-accent, #10b981) 20%, transparent); }
.dm-entry-pill { background: var(--surface); }
.sidebar-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; font-size: 10px; font-weight: 700; border-radius: 10px; padding: 0 4px; line-height: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
.sidebar-divider { width: 22px; height: 1px; background: var(--border); margin: 2px 0; flex-shrink: 0; }
.group-add-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px dashed var(--border); background: transparent; color: var(--muted); cursor: pointer; font-size: 18px; flex-shrink: 0; }
.sidebar-settings-btn { background: transparent; border: 0; color: var(--muted); font-size: 17px; padding: 6px; cursor: pointer; }
.col-channels-sidebar { width: 170px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; min-height: 0; }
.channels-header { min-height: 42px; padding: 0 10px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--panel); flex: 0 0 auto; }
.group-brand-info { display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; }
.group-brand-icon { font-size: 14px; flex-shrink: 0; }
.group-brand-name { font-size: 12px; font-weight: 700; color: var(--heading); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.group-more-btn { background: transparent; border: 0; color: var(--muted); font-size: 17px; padding: 3px; cursor: pointer; }
.dm-friends-count { font-size: 11px; color: var(--muted); }

/* 私信会话卡片列表 */
.dm-sessions-list { flex: 1 1 0; min-height: 0; padding: 6px 4px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
.dm-session-item { display: flex; align-items: center; gap: 8px; padding: 7px 8px; border-radius: 8px; cursor: pointer; transition: background .12s ease; border: 1px solid transparent; }
.dm-session-item:hover { background: var(--panel); }
.dm-session-item.active { background: var(--panel); border-color: var(--border); }
.dm-avatar-box { position: relative; width: 34px; height: 34px; flex-shrink: 0; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; }
.dm-avatar-pic { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.dm-avatar-char { font-size: 18px; line-height: 1; }
.dm-online-dot { position: absolute; bottom: 0; right: 0; width: 9px; height: 9px; border-radius: 50%; background: var(--muted); border: 2px solid var(--panel); }
.dm-online-dot.online { background: #10b981; }
.dm-item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.dm-name-row { display: flex; align-items: center; justify-content: space-between; gap: 4px; }
.dm-name-text { font-size: 12.5px; font-weight: 600; color: var(--heading); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dm-owner-badge { font-size: 9.5px; padding: 1px 4px; border-radius: 4px; background: rgba(16, 185, 129, 0.12); color: #10b981; font-weight: 600; }
.dm-status-row { font-size: 10.5px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dm-act-snippet { color: var(--heading); opacity: 0.85; }
.dm-status-online { color: #10b981; }
.dm-empty-state { padding: 16px 8px; text-align: center; color: var(--muted); font-size: 12px; line-height: 1.6; }

/* 频道列表 */
.channels-list-wrap { flex: 1 1 0; min-height: 0; padding: 8px 6px; overflow-y: auto; }
.channel-section-label { display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-weight: 700; color: var(--muted); padding: 4px 6px 8px; }
.btn-fast-add-ch { background: transparent; border: 0; color: var(--muted); font-size: 16px; padding: 0 4px; cursor: pointer; }
.channels-scroll-inner { display: flex; flex-direction: column; gap: 2px; }
.channel-line { display: flex; align-items: center; position: relative; }
.channel-item-btn { display: flex; align-items: center; gap: 6px; width: 100%; min-width: 0; padding: 6px 22px 6px 8px; border-radius: 6px; border: 0; background: transparent; color: var(--text); cursor: pointer; font: inherit; font-size: 12px; text-align: left; }
.channel-item-btn:hover { background: var(--panel); color: var(--heading); }
.channel-item-btn.active { background: var(--panel); color: var(--chat-accent, #10b981); font-weight: 700; }
.channel-prefix { color: var(--muted); font-size: 12px; font-weight: 600; }
.channel-icon { font-size: 12px; }
.channel-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
.channel-settings-btn { position: absolute; right: 2px; padding: 3px; border: 0; border-radius: 4px; color: var(--muted); background: transparent; cursor: pointer; opacity: 0; }
.channel-line:hover .channel-settings-btn, .channel-line:focus-within .channel-settings-btn { opacity: 1; }
.space-menu { display: flex; flex-direction: column; padding: 5px; gap: 3px; background: var(--panel); border-bottom: 1px solid var(--border); }
.space-menu button { text-align: left; background: transparent; border: 0; color: var(--text); border-radius: 5px; padding: 7px; font: inherit; font-size: 12px; cursor: pointer; }
.space-menu button:hover { background: var(--surface); }
.room-hint { font-size: 11px; color: var(--muted); padding: 4px; line-height: 1.6; overflow-wrap: anywhere; }

/* 模态弹窗与确认框 */
.chat-modal-backdrop { position: fixed; inset: 0; z-index: 100050; background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; padding: 16px; }
.chat-manage-dialog-card { width: 360px; max-width: calc(100vw - 32px); background: var(--panel); border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; overflow: hidden; color: var(--text); }
.manage-dialog-head { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.manage-dialog-title { font-size: 13.5px; font-weight: 700; color: var(--heading); }
.manage-dialog-close { background: transparent; border: 0; color: var(--muted); cursor: pointer; font-size: 15px; padding: 2px 6px; border-radius: 4px; }
.manage-dialog-close:hover { background: var(--surface); color: var(--heading); }
.manage-dialog-form { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.manage-label { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 600; color: var(--heading); }
.manage-input { width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font: inherit; font-size: 13px; }
.manage-input:focus { border-color: #10b981; outline: none; }
.emoji-picker-row { display: flex; align-items: center; gap: 8px; }
.emoji-input { width: 60px; text-align: center; font-size: 18px; flex-shrink: 0; }
.quick-emojis { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.quick-emoji-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; width: 28px; height: 28px; font-size: 15px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.12s ease; }
.quick-emoji-btn:hover { border-color: #10b981; }
.quick-emoji-btn.sel { border-color: #10b981; background: rgba(16, 185, 129, 0.12); }
.manage-textarea { width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font: inherit; font-size: 12px; resize: vertical; }
.manage-textarea:focus { border-color: #10b981; outline: none; }
.manage-notice { font-size: 11px; color: #ef4444; line-height: 1.5; }
.manage-dialog-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
.manage-actions-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.manage-btn-cancel { background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 6px; padding: 6px 14px; font-size: 12px; cursor: pointer; }
.manage-btn-save { background: #10b981; color: #fff; border: 0; border-radius: 6px; padding: 6px 16px; font-size: 12px; font-weight: 600; cursor: pointer; }
.manage-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
.manage-btn-delete { background: transparent; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
.manage-btn-delete:hover { background: rgba(239, 68, 68, 0.08); }
.delete-dialog-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; font-size: 13px; line-height: 1.5; }
.delete-dialog-hint { color: var(--muted); font-size: 11.5px; }
.manage-btn-confirm-delete { background: #ef4444; color: #fff; border: 0; border-radius: 6px; padding: 6px 16px; font-size: 12px; font-weight: 600; cursor: pointer; margin-left: auto; }

button { cursor: pointer; }
button:disabled { opacity: .5; cursor: default; }
:is(button,input,textarea):focus-visible { outline: 2px solid var(--heading); outline-offset: 2px; }
@media (hover: none) { .channel-settings-btn { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .group-icon-pill { transition: none; } }

:global(.chat-context-menu) {
  position: fixed !important;
  z-index: 100050 !important;
  min-width: 154px;
  background: var(--panel) !important;
  border: 1px solid var(--border) !important;
  border-radius: 8px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22) !important;
  padding: 4px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
}
:global(.chat-context-header) {
  font-size: 11px !important;
  font-weight: 700 !important;
  color: var(--heading) !important;
  padding: 5px 8px !important;
  border-bottom: 1px solid var(--border) !important;
  margin-bottom: 2px !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
:global(.chat-context-item) {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  width: 100% !important;
  padding: 6px 8px !important;
  border-radius: 5px !important;
  border: none !important;
  background: transparent !important;
  color: var(--text) !important;
  font: inherit !important;
  font-size: 12px !important;
  cursor: pointer !important;
  text-align: left !important;
  transition: background 0.12s ease !important;
}
:global(.chat-context-item:hover) {
  background: var(--surface) !important;
  color: var(--heading) !important;
}
:global(.chat-context-item.text-danger) {
  color: #ef4444 !important;
}
:global(.chat-context-item.text-danger:hover) {
  background: rgba(239, 68, 68, 0.08) !important;
}
:global(.chat-context-divider) {
  height: 1px !important;
  background: var(--border) !important;
  margin: 3px 0 !important;
}
</style>
