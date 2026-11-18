<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { supportsReasoningEffort, type ReasoningEffort } from '../services/byok.service';
import type { AcpProfile, DiscoveredLocalAgent, PiModelInfo, PiThinkingLevel } from '../services/native-bridge.service';

const props = defineProps<{
  service: 'deepseek' | 'native';
  selectedId: string;
  models: string[];
  byokLabel?: string;
  byokConfigured?: boolean;
  piModels?: PiModelInfo[];
  nativeAgents?: DiscoveredLocalAgent[];
  acpProfiles?: AcpProfile[];
  nativeAgentId?: string;
  nativeAgentLabel?: string;
  nativeConnected?: boolean;
  piAvailable?: boolean;
  piThinking?: PiThinkingLevel;
  disabled?: boolean;
  effort?: ReasoningEffort;
}>();

const emit = defineEmits<{
  chooseModel: [id: string];
  chooseNative: [agentId: string, modelId?: string];
  chooseEffort: [effort: ReasoningEffort];
  choosePiThinking: [level: PiThinkingLevel];
  openSettings: [];
  openNativeSettings: [];
}>();

const byokTitle = computed(() => props.byokLabel || '云端 / 本地模型');
const byokInitial = computed(() => byokTitle.value.slice(0, 1).toUpperCase() || 'A');

const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const open = ref(false);
const opensUp = ref(false);
const menuHeight = ref(300);
const folder = ref<'deepseek' | 'native' | 'pi-models' | 'effort' | null>(null);

const installedNativeCount = computed(() => {
  const builtin = (props.nativeAgents || []).filter(a => a.installed).length;
  return builtin + (props.acpProfiles?.length || 0);
});

const name = computed(() => {
  if (props.service === 'native') {
    const agentId = props.nativeAgentId || 'pi';
    if (agentId === 'pi') {
      if (!props.selectedId || props.selectedId === 'native') return 'Pi · 默认模型';
      return props.selectedId.includes('/') ? props.selectedId.split('/').slice(1).join('/') : props.selectedId;
    }
    return props.nativeAgentLabel || agentId;
  }
  return props.selectedId || '选择模型';
});

const piThinkingLabels: Record<PiThinkingLevel, string> = {
  off: '关闭',
  minimal: '极简',
  low: '低',
  medium: '中',
  high: '高',
  xhigh: '超高',
  max: '最高',
};

function outside(event: PointerEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    open.value = false;
    folder.value = null;
  }
}

function updateDirection() {
  const rect = root.value?.getBoundingClientRect();
  const bounds = root.value?.closest('main')?.getBoundingClientRect();
  if (!rect) return;
  const below = (bounds?.bottom ?? window.innerHeight) - rect.bottom - 12;
  const above = rect.top - (bounds?.top ?? 0) - 12;
  opensUp.value = below < 180 && above > below;
  menuHeight.value = Math.max(100, Math.min(300, opensUp.value ? above : below));
}

function toggle() {
  if (!open.value) updateDirection();
  open.value = !open.value;
  if (!open.value) folder.value = null;
}

function focusFirst() {
  void nextTick(() => menu.value?.querySelector<HTMLButtonElement>('[role=menuitem]')?.focus());
}

function openWithKeyboard(e: KeyboardEvent) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  updateDirection();
  open.value = true;
  focusFirst();
}

function menuKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    open.value = false;
    folder.value = null;
    trigger.value?.focus();
    return;
  }
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const items = Array.from(menu.value?.querySelectorAll<HTMLButtonElement>('[role=menuitem]:not(:disabled)') || []);
  if (!items.length) return;
  const i = items.indexOf(document.activeElement as HTMLButtonElement);
  const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
  items[n]?.focus();
}

function showFolder(value: 'deepseek' | 'native' | 'pi-models' | 'effort' | null) {
  folder.value = value;
  focusFirst();
}

function selectModel(id: string) {
  emit('chooseModel', id);
  open.value = false;
  folder.value = null;
}

function selectNativeAgent(agentId: string, modelId = '') {
  emit('chooseNative', agentId, modelId);
  open.value = false;
  folder.value = null;
}

onMounted(() => document.addEventListener('pointerdown', outside));
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside));
</script>

<template>
  <div ref="root" class="picker" @keydown.esc.stop.prevent="open = false; folder = null">
    <button
      ref="trigger"
      type="button"
      class="trigger"
      :disabled="disabled"
      :aria-expanded="open"
      aria-label="选择服务和模型"
      aria-haspopup="menu"
      @click="toggle"
      @keydown="openWithKeyboard"
    >
      <span>{{ name }}</span>
      <span v-if="service === 'native' && nativeAgentId === 'pi'" class="effort-pill">{{ piThinkingLabels[piThinking || 'medium'] }}</span>
      <span v-else-if="service === 'deepseek' && supportsReasoningEffort(selectedId)" class="effort-pill">{{ ({ none: '关闭', low: '低', high: '高', max: '最高' }[effort || 'high']) }}</span>
      <span class="chevron">⌄</span>
    </button>

    <div
      v-if="open"
      ref="menu"
      class="menu"
      :class="{ up: opensUp }"
      :style="{ maxHeight: `${menuHeight}px` }"
      role="menu"
      aria-label="选择服务和模型"
      @keydown="menuKey"
    >
      <button v-if="folder" type="button" class="back" role="menuitem" @click="showFolder(folder === 'pi-models' ? 'native' : null)">
        ‹ {{ folder === 'pi-models' ? '返回本机 Agent 列表' : '返回服务列表' }}
      </button>

      <template v-if="!folder">
        <p class="heading">选择服务</p>
        <button type="button" class="entry" role="menuitem" @click="nativeConnected ? showFolder('native') : selectNativeAgent('pi', '')">
          <span class="icon native">&gt;_</span>
          <span class="copy">
            <strong>本机 Agent · ACP</strong>
            <small>{{ nativeConnected ? (installedNativeCount ? `${installedNativeCount} 个可用本机引擎` : '仅终端命令模式') : '零端口本地执行 · 点击配置' }}</small>
          </span>
          <span>›</span>
        </button>
        <button type="button" class="entry" role="menuitem" @click="showFolder('deepseek')">
          <span class="icon deepseek">{{ byokInitial }}</span>
          <span class="copy">
            <strong>{{ byokTitle }}</strong>
            <small>{{ models.length ? `${models.length} 个可用模型` : (byokConfigured ? (selectedId || '已就绪') : '支持国内外接口 / 本机 Ollama') }}</small>
          </span>
          <span>›</span>
        </button>
        <div class="divider"></div>
        <button
          type="button"
          class="entry"
          role="menuitem"
          :disabled="(service === 'native' && nativeAgentId !== 'pi') || (service === 'deepseek' && !supportsReasoningEffort(selectedId))"
          @click="showFolder('effort')"
        >
          <span class="icon multica">◌</span>
          <span class="copy">
            <strong>思考强度</strong>
            <small>
              <template v-if="service === 'native'">{{ nativeAgentId === 'pi' ? piThinkingLabels[piThinking || 'medium'] : '由对应 CLI / ACP 控制' }}</template>
              <template v-else-if="!supportsReasoningEffort(selectedId)">当前模型未确认支持</template>
              <template v-else>{{ ({ none: '关闭', low: '低', high: '高', max: '最高' }[effort || 'high']) }}</template>
            </small>
          </span>
          <span>›</span>
        </button>
      </template>

      <template v-else-if="folder === 'native'">
        <p class="heading">本机已安装 CLI / ACP</p>
        <template v-for="agent in (nativeAgents || []).filter(a => a.installed)" :key="agent.id">
          <button
            v-if="agent.id === 'pi' && piModels?.length"
            type="button"
            class="entry"
            role="menuitem"
            @click="showFolder('pi-models')"
          >
            <span class="icon native">&gt;_</span>
            <span class="copy">
              <strong>{{ agent.name }}</strong>
              <small>{{ piModels.length }} 个可用模型</small>
            </span>
            <span>›</span>
          </button>
          <button
            v-else
            type="button"
            class="entry"
            role="menuitem"
            @click="selectNativeAgent(agent.id)"
          >
            <span class="icon native">&gt;_</span>
            <span class="copy">
              <strong>{{ agent.name }}</strong>
              <small>{{ agent.protocol === 'acp' ? 'ACP (JSON-RPC stdio)' : agent.protocol }}</small>
            </span>
            <span v-if="service === 'native' && nativeAgentId === agent.id">✓</span>
          </button>
        </template>

        <template v-if="acpProfiles?.length">
          <div class="divider"></div>
          <p class="heading">自定义 ACP</p>
          <button
            v-for="profile in acpProfiles"
            :key="profile.id"
            type="button"
            class="entry"
            role="menuitem"
            @click="selectNativeAgent(`acp:${profile.id}`)"
          >
            <span class="icon native">ACP</span>
            <span class="copy">
              <strong>{{ profile.name }}</strong>
              <small>{{ profile.command }}</small>
            </span>
            <span v-if="service === 'native' && nativeAgentId === `acp:${profile.id}`">✓</span>
          </button>
        </template>

        <p v-if="(nativeAgents || []).some(a => !a.installed)" class="empty">
          未检测到：{{ (nativeAgents || []).filter(a => !a.installed).map(a => a.name).join('、') }}
        </p>
        <div class="empty">
          <button type="button" @click="open = false; emit('openNativeSettings')">管理本机 Agent 与自定义 ACP ↗</button>
        </div>
      </template>

      <template v-else-if="folder === 'pi-models'">
        <p class="heading">本机 Pi · 可用模型</p>
        <button type="button" class="entry" role="menuitem" @click="selectNativeAgent('pi', '')">
          <span class="icon native">&gt;_</span>
          <span class="copy">
            <strong>pi 默认模型</strong>
            <small>跟随本机 ~/.pi 默认配置</small>
          </span>
          <span v-if="service === 'native' && nativeAgentId === 'pi' && (!selectedId || selectedId === 'native')">✓</span>
        </button>
        <button v-for="item in (piModels || [])" :key="item.id" type="button" class="entry" role="menuitem" @click="selectNativeAgent('pi', item.id)">
          <span class="icon native">&gt;_</span>
          <span class="copy">
            <strong>{{ item.model }}</strong>
            <small>{{ item.provider }}{{ item.context ? ` · ${item.context}` : '' }}</small>
          </span>
          <span v-if="service === 'native' && nativeAgentId === 'pi' && selectedId === item.id">✓</span>
        </button>
      </template>

      <template v-else-if="folder === 'effort'">
        <template v-if="service === 'native'">
          <p class="heading">Pi · 思考强度</p>
          <button
            v-for="option in (['off', 'low', 'medium', 'high', 'max'] as PiThinkingLevel[])"
            :key="option"
            type="button"
            class="entry"
            role="menuitem"
            @click="emit('choosePiThinking', option); open = false; folder = null"
          >
            <span class="copy"><strong>{{ piThinkingLabels[option] }}</strong></span>
            <span v-if="(piThinking || 'medium') === option">✓</span>
          </button>
        </template>
        <template v-else>
          <p class="heading">{{ byokTitle }} · 思考强度</p>
          <button
            v-for="option in [{ id: 'none', label: '关闭' }, { id: 'low', label: '低' }, { id: 'high', label: '高' }, { id: 'max', label: '最高' }]"
            :key="option.id"
            type="button"
            class="entry"
            role="menuitem"
            @click="emit('chooseEffort', option.id as ReasoningEffort); open = false; folder = null"
          >
            <span class="copy"><strong>{{ option.label }}</strong></span>
            <span v-if="(effort || 'high') === option.id">✓</span>
          </button>
          <p class="empty">更高强度可能增加响应时间与费用。</p>
        </template>
      </template>

      <template v-else>
        <p class="heading">{{ byokTitle }} · 可用模型</p>
        <button v-for="model in models" :key="model" type="button" class="entry" role="menuitem" @click="selectModel(model)">
          <span class="icon deepseek">{{ byokInitial }}</span>
          <span class="copy">
            <strong>{{ model }}</strong>
            <small>{{ byokTitle }}</small>
          </span>
          <span v-if="service === 'deepseek' && model === selectedId">✓</span>
        </button>
        <div v-if="!models.length" class="empty">
          请先在设置中配置模型服务或探测本地模型。
          <button type="button" @click="open = false; emit('openSettings')">打开设置</button>
        </div>
        <div v-else class="empty">
          <button type="button" @click="open = false; emit('openSettings')">切换平台 / 配置 Key / 本机 Ollama ↗</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.picker{position:relative;flex:none;min-width:0}.trigger{display:flex;align-items:center;gap:5px;max-width:190px;border:0;border-radius:7px;padding:4px 7px;background:transparent;color:var(--text,#334155);font:inherit;font-size:12px;font-weight:500;cursor:pointer}.trigger span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.effort-pill{color:#5b5bd6;font-size:11.5px;font-weight:600;white-space:nowrap}.trigger:hover,.trigger[aria-expanded=true]{background:var(--surface,#f2f4f8)}.trigger:focus-visible{outline:2px solid #64b5ef}.trigger:disabled{opacity:.5;cursor:not-allowed}.chevron{color:#94a3b8;font-size:12px;line-height:1}.menu{position:absolute;right:0;top:calc(100% + 10px);z-index:30;width:290px;max-width:min(290px,78vw);max-height:300px;overflow:auto;padding:6px;border:1px solid var(--border,#dce3ec);border-radius:12px;background:var(--panel,#fff);box-shadow:0 8px 24px #17243b26}.menu.up{top:auto;bottom:calc(100% + 10px)}.divider{height:1px;background:var(--border,#e4e9f1);margin:5px 6px}.entry:disabled{opacity:.5;cursor:not-allowed}.heading{margin:8px 9px;color:var(--muted,#94a3b8);font-size:11px}.entry{width:100%;display:flex;align-items:center;gap:9px;padding:8px;border:0;border-radius:8px;background:transparent;color:var(--text,#29364b);font:inherit;text-align:left;cursor:pointer}.entry:hover,.entry:focus-visible{background:var(--surface,#eef1f5)}.icon{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:8px;font-weight:700}.multica{background:#8170f41c;color:#806fe4}.deepseek{background:#477bf01c;color:#477bf0}.native{background:#12865b1c;color:#12865b;font-family:ui-monospace,monospace;font-size:10px}.copy{min-width:0;flex:1}.copy strong,.copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.copy strong{font-size:12px}.copy small{margin-top:2px;font-size:10px;color:var(--muted,#97a4b8)}.back{width:100%;padding:8px;border:0;border-bottom:1px solid var(--border,#e4e9f1);background:transparent;color:#7569df;text-align:left;cursor:pointer}.empty{margin:10px;font-size:11px;color:var(--muted,#94a3b8);line-height:1.6}.empty button{border:0;background:transparent;color:#7569df;cursor:pointer;padding:0;font:inherit}@media(max-width:850px){.trigger{max-width:110px}}
</style>
