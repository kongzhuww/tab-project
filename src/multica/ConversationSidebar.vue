<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import type { LocalConversation } from '../services/byok.service';
import type { NativeConversation } from './use-native-agent';

const props = defineProps<{
  section: 'chat' | 'library' | 'schedule' | 'agents';
  service: 'deepseek' | 'native';
  selectedId: string;
  conversations: LocalConversation[];
  nativeConversations?: NativeConversation[];
  disabled: boolean;
}>();

const emit = defineEmits<{
  new: [];
  navigate: [section: 'library' | 'schedule' | 'agents'];
  selectConversation: [id: string];
  deleteConversation: [id: string];
  selectNativeConversation: [id: string];
  deleteNativeConversation: [id: string];
  openSettings: [];
}>();

const confirming = ref('');
const hoveredCard = ref<{
  title: string;
  subtitle: string;
  updatedLabel: string;
  top: number;
  left: number;
} | null>(null);
let hoverTimer: ReturnType<typeof setTimeout> | null = null;

function remove(id: string, kind: 'deepseek' | 'native' = 'deepseek') {
  const key = `${kind}:${id}`;
  if (confirming.value !== key) {
    confirming.value = key;
    return;
  }
  confirming.value = '';
  if (kind === 'native') emit('deleteNativeConversation', id);
  else emit('deleteConversation', id);
}

function shortAge(ts?: number | string) {
  const ms = typeof ts === 'number' ? ts : typeof ts === 'string' ? Date.parse(ts) : NaN;
  if (!Number.isFinite(ms)) return '';
  const mins = Math.floor(Math.max(0, Date.now() - ms) / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins}分钟`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时`;
  return `${Math.floor(hours / 24)}天`;
}

function fullUpdatedLabel(ts?: number | string) {
  const ms = typeof ts === 'number' ? ts : typeof ts === 'string' ? Date.parse(ts) : NaN;
  if (!Number.isFinite(ms)) return '';
  return `Updated ${new Date(ms).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
}

function showPreview(event: MouseEvent, title: string, subtitle: string, ts?: number | string) {
  const target = event.currentTarget as HTMLElement | null;
  if (!target) return;
  if (hoverTimer) clearTimeout(hoverTimer);
  const rect = target.getBoundingClientRect();
  hoverTimer = setTimeout(() => {
    const maxTop = typeof window !== 'undefined' ? window.innerHeight - 110 : rect.top;
    hoveredCard.value = {
      title,
      subtitle,
      updatedLabel: fullUpdatedLabel(ts),
      top: Math.max(12, Math.min(rect.top, maxTop)),
      left: rect.right + 10,
    };
  }, 220);
}

function hidePreview() {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
  hoveredCard.value = null;
}

onBeforeUnmount(() => {
  if (hoverTimer) clearTimeout(hoverTimer);
});
</script>

<template>
  <aside class="side-panel" aria-label="AI 工作区导航">
    <nav class="navigation" aria-label="工作区功能">
      <button class="nav-item new-button" type="button" :disabled="disabled" @click="emit('new')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        <span>新对话</span>
      </button>
      <button class="nav-item" type="button" :class="{ active: section === 'schedule' }" :aria-current="section === 'schedule' ? 'page' : undefined" @click="emit('navigate', 'schedule')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>
        <span>自动化</span>
      </button>
      <button class="nav-item" type="button" :class="{ active: section === 'agents' }" :aria-current="section === 'agents' ? 'page' : undefined" @click="emit('navigate', 'agents')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/><path d="M18.5 7.5l1.2 1.2 2.3-2.3"/></svg>
        <span>数字员工</span>
      </button>
      <button class="nav-item" type="button" :class="{ active: section === 'library' }" :aria-current="section === 'library' ? 'page' : undefined" @click="emit('navigate', 'library')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/></svg>
        <span>资源库</span>
      </button>
    </nav>

    <div class="section-heading">
      <span>对话</span>
      <button type="button" class="heading-add" :disabled="disabled" title="新建对话" aria-label="新建对话" @click="emit('new')">+</button>
    </div>

    <div class="session-list" @scroll="hidePreview">
      <template v-if="(nativeConversations || []).length">
        <div class="group-label">本机 Agent <small>零端口</small></div>
        <div
          v-for="chat in (nativeConversations || [])"
          :key="chat.id"
          class="local-row"
          :class="{ chosen: section === 'chat' && service === 'native' && selectedId === chat.id }"
          @mouseenter="showPreview($event, chat.title, chat.cwd || (chat.agentId || '本机'), chat.updatedAt)"
          @mouseleave="hidePreview"
        >
          <button class="session-item local-item" type="button" :disabled="disabled" @click="emit('selectNativeConversation', chat.id)">
            <span class="session-title">{{ chat.title }}</span>
            <span class="session-age">{{ shortAge(chat.updatedAt) }}</span>
          </button>
          <button class="delete" type="button" :disabled="disabled" :aria-label="confirming === `native:${chat.id}` ? '确认删除会话' : '删除会话'" @click.stop="remove(chat.id, 'native')">
            {{ confirming === `native:${chat.id}` ? '确认' : '×' }}
          </button>
        </div>
      </template>

      <template v-if="conversations.length">
        <div class="group-label">DeepSeek <small>API</small></div>
        <div
          v-for="chat in conversations"
          :key="chat.id"
          class="local-row"
          :class="{ chosen: section === 'chat' && service === 'deepseek' && selectedId === chat.id }"
          @mouseenter="showPreview($event, chat.title, chat.model, chat.updatedAt)"
          @mouseleave="hidePreview"
        >
          <button class="session-item local-item" type="button" :disabled="disabled" @click="emit('selectConversation', chat.id)">
            <span class="session-title">{{ chat.title }}</span>
            <span class="session-age">{{ shortAge(chat.updatedAt) }}</span>
          </button>
          <button class="delete" type="button" :disabled="disabled" :aria-label="confirming === `deepseek:${chat.id}` ? '确认删除会话' : '删除会话'" @click.stop="remove(chat.id, 'deepseek')">
            {{ confirming === `deepseek:${chat.id}` ? '确认' : '×' }}
          </button>
        </div>
      </template>

      <p v-if="!(nativeConversations || []).length && !conversations.length" class="empty">
        暂无对话，点击上方 + 新建
      </p>
    </div>

    <div class="side-bottom">
      <button type="button" class="nav-item settings-item" :disabled="disabled" @click="emit('openSettings')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1 1.41 1H21a2 2 0 1 1 0 4h-.09c-.64 0-1.15.4-1.51 1z"/></svg>
        <span>设置</span>
      </button>
    </div>

    <div
      v-if="hoveredCard"
      class="session-popover"
      :style="{ top: `${hoveredCard.top}px`, left: `${hoveredCard.left}px` }"
      role="tooltip"
    >
      <strong>{{ hoveredCard.title }}</strong>
      <small v-if="hoveredCard.subtitle">{{ hoveredCard.subtitle }}</small>
      <small v-if="hoveredCard.updatedLabel">{{ hoveredCard.updatedLabel }}</small>
    </div>
  </aside>
</template>

<style scoped>
.side-panel{width:240px;flex:none;min-height:0;padding:12px 8px 10px;display:flex;flex-direction:column;border-right:1px solid var(--border,#e5e8ef);background:color-mix(in srgb,var(--surface,#eef1f6) 68%,transparent);backdrop-filter:blur(22px) saturate(1.18);-webkit-backdrop-filter:blur(22px) saturate(1.18);box-sizing:border-box;color:var(--text,#26334b)}
.navigation{display:grid;gap:2px}
.nav-item{display:flex;align-items:center;gap:9px;width:100%;min-height:32px;border:0;border-radius:7px;text-align:left;padding:0 10px;background:transparent;color:var(--text,#334155);font:inherit;font-size:13px;cursor:pointer;transition:background-color .14s ease}
.nav-item svg{width:15px;height:15px;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;opacity:.76}
.nav-item:hover,.nav-item.active{background:color-mix(in srgb,var(--text,#1e293b) 6%,transparent)}
.new-button{font-weight:500}
.section-heading{display:flex;align-items:center;justify-content:space-between;margin:14px 10px 4px;color:var(--muted,#8b95a5);font-size:11px;font-weight:500}
.heading-add{width:20px;height:20px;border:0;border-radius:6px;background:transparent;color:var(--muted,#8492a8);font-size:15px;line-height:1;display:grid;place-items:center;cursor:pointer}
.heading-add:hover{background:color-mix(in srgb,var(--text,#1e293b) 6%,transparent);color:var(--text,#26334b)}
.session-list{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;gap:2px}
.group-label{display:flex;justify-content:space-between;margin:8px 10px 2px;font-size:10px;font-weight:550;color:var(--muted,#9aa7ba)}
.group-label small{font-size:10px;font-weight:400;opacity:.85}
.local-row{position:relative;display:flex;align-items:center;border-radius:7px;border:0}
.session-item{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;min-width:0;text-align:left;border:0;border-radius:7px;padding:6px 10px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.local-row:hover{background:color-mix(in srgb,var(--text,#1e293b) 4.5%,transparent)}
.local-row.chosen{background:color-mix(in srgb,var(--text,#1e293b) 7.5%,transparent)}
.local-row.chosen .session-title{font-weight:550}
.session-title{min-width:0;flex:1;font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.session-age{flex:none;font-size:11px;color:var(--muted,#94a3b8);white-space:nowrap}
.local-row:hover:has(.delete:enabled) .session-age{opacity:0}
.delete{position:absolute;right:5px;top:50%;transform:translateY(-50%);opacity:0;pointer-events:none;border:0;border-radius:5px;background:var(--panel,#ffffff);color:var(--muted,#64748b);padding:1px 6px;cursor:pointer;font-size:11px}
.local-row:hover .delete:not(:disabled),.delete:focus-visible:not(:disabled){opacity:1;pointer-events:auto}
.delete:disabled{opacity:0;pointer-events:none}
.delete:hover{color:#d34545}
.session-meta{display:flex;justify-content:space-between;gap:6px;margin-top:2px;font-size:10px;color:var(--muted,#94a3b8)}
.empty{padding:6px 10px;font-size:11px;margin:0;color:var(--muted,#94a3b8)}
.side-bottom{padding-top:6px;border-top:1px solid var(--border,#eceef3)}
.settings-item{color:var(--muted,#64748b);font-size:12.5px}
.settings-item:hover{color:var(--text,#26334b)}
.session-popover{position:fixed;z-index:80;width:270px;max-width:42vw;padding:11px 13px;border-radius:10px;border:1px solid var(--border,#dce3ec);background:var(--panel,#ffffff);box-shadow:0 10px 28px rgba(15,23,42,.16);pointer-events:none;display:flex;flex-direction:column;gap:4px}
.session-popover strong{font-size:12.5px;color:var(--text,#26334b);line-height:1.4;overflow-wrap:anywhere}
.session-popover small{font-size:11px;color:var(--muted,#64748b);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
button:disabled{cursor:not-allowed}
@media(max-width:850px){.side-panel{width:190px}}
</style>
