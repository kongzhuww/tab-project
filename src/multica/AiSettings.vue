<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  baseUrlRequiresKey,
  clearConfig,
  fetchOpenAiCompatibleModels,
  findOpenAiCompatPreset,
  isLocalBaseUrl,
  isValidModelId,
  loadConfig,
  normalizeBaseUrl,
  OPENAI_COMPAT_PRESETS,
  saveConfig,
  type OpenAiCompatPresetId,
} from '../services/byok.service';
import NativeSettings from './NativeSettings.vue';

const props = defineProps<{ initialTab: 'deepseek' | 'native' }>();
const emit = defineEmits<{ close: []; connectionChanged: []; configChanged: []; busyChanged: [busy: boolean] }>();

const tab = ref<'deepseek' | 'native'>(props.initialTab);
const presetId = ref<OpenAiCompatPresetId>('deepseek');
const baseUrl = ref('https://api.deepseek.com');
const key = ref('');
const model = ref('');
const discoveredModels = ref<string[]>([]);
const configured = ref(false);
const savedLabel = ref('');
const savedModel = ref('');
const savedBaseUrl = ref('');
const savedHasKey = ref(false);
const busy = ref(false);
const note = ref('');

const currentPreset = computed(() => findOpenAiCompatPreset(presetId.value));
const isLocalEndpoint = computed(() => isLocalBaseUrl(baseUrl.value));
const requiresKey = computed(() => baseUrlRequiresKey(presetId.value, baseUrl.value));

const isSameSavedEndpoint = computed(() => {
  if (!configured.value || !savedBaseUrl.value) return false;
  try {
    return normalizeBaseUrl(baseUrl.value) === savedBaseUrl.value;
  } catch {
    return false;
  }
});

const effectiveHasKey = computed(() => Boolean(key.value.trim()) || (isSameSavedEndpoint.value && savedHasKey.value));

const availableModelOptions = computed(() => {
  const merged = [
    ...discoveredModels.value,
    ...currentPreset.value.suggestedModels,
    ...(isValidModelId(model.value) ? [model.value.trim()] : []),
  ];
  return [...new Set(merged.filter(Boolean))];
});

const canDiscover = computed(() => !busy.value && Boolean(baseUrl.value.trim()) && (!requiresKey.value || effectiveHasKey.value));
const canSave = computed(() => !busy.value && Boolean(baseUrl.value.trim()) && isValidModelId(model.value) && (!requiresKey.value || effectiveHasKey.value));

const presetGroups = computed(() => [
  { id: 'cn', title: '国内 / 直连', items: OPENAI_COMPAT_PRESETS.filter(p => p.group === 'cn') },
  { id: 'global', title: '全球 / 聚合', items: OPENAI_COMPAT_PRESETS.filter(p => p.group === 'global') },
  { id: 'local', title: '本机免费（免 Key）', items: OPENAI_COMPAT_PRESETS.filter(p => p.group === 'local') },
  { id: 'custom', title: '其他', items: OPENAI_COMPAT_PRESETS.filter(p => p.group === 'custom') },
]);

onMounted(async () => {
  try {
    const c = await loadConfig();
    presetId.value = c.presetId;
    baseUrl.value = c.baseUrl;
    model.value = c.model;
    discoveredModels.value = c.models;
    configured.value = c.configured;
    savedLabel.value = c.label;
    savedModel.value = c.model;
    savedBaseUrl.value = c.baseUrl;
    savedHasKey.value = Boolean(c.key);
    if (c.configured && (!requiresKey.value || c.key)) {
      void discover(true);
    }
  } catch {
    note.value = '读取本机设置失败。';
  }
});

function selectPreset(id: OpenAiCompatPresetId) {
  if (busy.value) return;
  const preset = findOpenAiCompatPreset(id);
  presetId.value = preset.id;
  note.value = '';
  if (preset.baseUrl) {
    baseUrl.value = preset.baseUrl;
  } else if (id === 'custom' && presetId.value === 'custom' && OPENAI_COMPAT_PRESETS.some(p => p.id !== 'custom' && p.baseUrl === baseUrl.value)) {
    baseUrl.value = '';
  }
  discoveredModels.value = [];
  if (!isSameSavedEndpoint.value) {
    key.value = '';
  }
  model.value = preset.defaultModel || preset.suggestedModels[0] || '';
}

function resolveKeyToUse(oldConfig: Awaited<ReturnType<typeof loadConfig>>): string {
  const typed = key.value.trim();
  if (typed) return typed;
  try {
    if (normalizeBaseUrl(baseUrl.value) === oldConfig.baseUrl) {
      return oldConfig.key;
    }
  } catch { /* ignore */ }
  return '';
}

async function discover(silent = false) {
  if (busy.value) return;
  busy.value = true;
  if (!silent) note.value = '';
  try {
    const old = await loadConfig();
    const cleanBaseUrl = normalizeBaseUrl(baseUrl.value);
    baseUrl.value = cleanBaseUrl;
    const usedKey = resolveKeyToUse(old);
    const label = presetId.value === 'custom' ? '自定义服务' : currentPreset.value.name;
    const result = await fetchOpenAiCompatibleModels({
      baseUrl: cleanBaseUrl,
      key: usedKey,
      label,
      requiresKey: baseUrlRequiresKey(presetId.value, cleanBaseUrl),
    });
    discoveredModels.value = result;
    if (!result.includes(model.value.trim())) {
      const preferred = currentPreset.value.defaultModel;
      model.value = preferred && result.includes(preferred) ? preferred : result[0];
    }
    if (!key.value.trim() && isSameSavedEndpoint.value && old.configured) {
      await saveConfig({
        presetId: presetId.value,
        label: presetId.value === 'custom' ? undefined : currentPreset.value.name,
        baseUrl: cleanBaseUrl,
        key: usedKey,
        model: model.value.trim(),
        models: result,
      });
      savedModel.value = model.value.trim();
      emit('configChanged');
    }
    if (!silent) note.value = `已获取 ${result.length} 个可用模型。`;
  } catch (e) {
    if (!silent) note.value = e instanceof Error ? e.message : '获取模型失败';
  } finally {
    busy.value = false;
  }
}

async function save() {
  if (busy.value) return;
  busy.value = true;
  note.value = '';
  try {
    const old = await loadConfig();
    const cleanBaseUrl = normalizeBaseUrl(baseUrl.value);
    baseUrl.value = cleanBaseUrl;
    const usedKey = resolveKeyToUse(old);
    const chosenModel = model.value.trim();
    if (!isValidModelId(chosenModel)) {
      throw new Error('请选择或填写有效的模型 ID（例如 deepseek-chat / qwen2.5:7b / gpt-4o-mini）。');
    }
    const baseModels = discoveredModels.value.length
      ? discoveredModels.value
      : availableModelOptions.value;
    const modelCache = [...new Set([chosenModel, ...baseModels].filter(Boolean))];

    await saveConfig({
      presetId: presetId.value,
      label: presetId.value === 'custom' ? undefined : currentPreset.value.name,
      baseUrl: cleanBaseUrl,
      key: usedKey,
      model: chosenModel,
      models: modelCache,
    });
    const updated = await loadConfig();
    key.value = '';
    configured.value = updated.configured;
    savedLabel.value = updated.label;
    savedModel.value = updated.model;
    savedBaseUrl.value = updated.baseUrl;
    savedHasKey.value = Boolean(updated.key);
    note.value = `已保存设置：${updated.label}（${updated.model}）。`;
    emit('configChanged');
  } catch (e) {
    note.value = e instanceof Error ? e.message : '保存失败';
  } finally {
    busy.value = false;
  }
}

async function remove() {
  if (busy.value) return;
  busy.value = true;
  try {
    await clearConfig();
    key.value = '';
    configured.value = false;
    savedLabel.value = '';
    savedModel.value = '';
    savedBaseUrl.value = '';
    savedHasKey.value = false;
    note.value = '已清除本机保存的模型接入与 Key（不会删除聊天记录）。';
    emit('configChanged');
  } catch {
    note.value = '移除失败，请重试。';
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="settings-overlay" @click.self="!busy && emit('close')" @keydown.esc.stop="!busy && emit('close')">
    <section class="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="ai-settings-title">
      <aside class="nav">
        <div class="nav-heading">
          <span>✦</span>
          <div>
            <strong>AI 工作区</strong>
            <small>模型与终端设置</small>
          </div>
        </div>
        <p>服务提供商</p>
        <button type="button" :disabled="busy" :class="{ selected: tab === 'deepseek' }" @click="tab = 'deepseek'">
          <span class="provider-icon">☁</span> 模型服务 <i>兼容</i>
        </button>
        <button type="button" :disabled="busy" :class="{ selected: tab === 'native' }" @click="tab = 'native'">
          <span class="provider-icon native">&gt;_</span> 本机终端 <i>Native</i>
        </button>
        <small class="nav-foot">支持国内外大模型、OpenRouter 及本机 Ollama（免 Key）</small>
      </aside>

      <main>
        <header>
          <div>
            <small>服务设置 / {{ tab === 'deepseek' ? '通用 OpenAI 兼容 & 本机模型' : '本机终端' }}</small>
            <h2 id="ai-settings-title">{{ tab === 'deepseek' ? '模型服务接入' : '本机终端桥接' }}</h2>
          </div>
          <button class="close" type="button" :disabled="busy" aria-label="关闭设置" @click="emit('close')">✕</button>
        </header>

        <template v-if="tab === 'deepseek'">
          <p class="intro">
            支持 <strong>OpenAI 兼容接口</strong> 与 <strong>本机 Ollama / LM Studio</strong>：无需安装命令行桥接，对话与自动化任务都可直接调用。
          </p>

          <div class="status" :class="{ ready: configured }">
            <span></span>
            {{ configured ? `已在本机就绪：${savedLabel} · ${savedModel}` : '尚未配置可用模型服务' }}
          </div>

          <section class="presets-box" aria-label="常用模型服务预设">
            <div v-for="grp in presetGroups" :key="grp.id" class="preset-group">
              <span class="preset-group-label">{{ grp.title }}</span>
              <div class="preset-pills">
                <button
                  v-for="item in grp.items"
                  :key="item.id"
                  type="button"
                  class="preset-pill"
                  :class="{ active: presetId === item.id }"
                  :disabled="busy"
                  @click="selectPreset(item.id)"
                >
                  <span>{{ item.name }}</span>
                  <small>{{ item.shortTag }}</small>
                </button>
              </div>
            </div>
            <p class="preset-note">{{ currentPreset.note }}</p>
          </section>

          <section class="form-card">
            <label for="byok-base-url">接口地址（Base URL）</label>
            <input
              id="byok-base-url"
              v-model.trim="baseUrl"
              type="url"
              autocomplete="off"
              :disabled="busy"
              placeholder="例如 https://api.deepseek.com 或 http://localhost:11434/v1"
              @input="discoveredModels = []"
            />
            <p>
              {{ isLocalEndpoint ? '本机/局域网地址可直接 HTTP 直连；无需填写完整 /chat/completions 后缀。' : '支持官方地址或兼容 OpenAI 协议的中转网关（https://）。' }}
            </p>

            <label for="byok-key">
              API Key
              <span class="field-tag">{{ requiresKey ? '必填' : '本机/自定义可留空' }}</span>
            </label>
            <input
              id="byok-key"
              v-model="key"
              type="password"
              autocomplete="off"
              :disabled="busy"
              :placeholder="isSameSavedEndpoint && savedHasKey ? '已保存当前服务 Key；留空继续使用现有 Key' : currentPreset.keyPlaceholder"
            />
            <p>Key 仅保存在浏览器扩展本地存储，不进入普通同步备份。</p>

            <label for="byok-model-input">默认模型</label>
            <div class="model-row">
              <select
                v-if="availableModelOptions.length"
                v-model="model"
                aria-label="选择预设或已获取的模型"
                :disabled="busy"
              >
                <option v-if="!availableModelOptions.includes(model)" :value="model">{{ model || '选择模型' }}</option>
                <option v-for="item in availableModelOptions" :key="item" :value="item">{{ item }}</option>
              </select>
              <button type="button" :disabled="!canDiscover" @click="discover(false)">
                {{ busy ? '获取中…' : (isLocalEndpoint ? '探测本机模型' : '获取模型列表') }}
              </button>
            </div>
            <input
              id="byok-model-input"
              v-model.trim="model"
              type="text"
              autocomplete="off"
              :disabled="busy"
              placeholder="也可直接输入任意模型 ID，例如 qwen2.5:7b / deepseek-chat / gpt-4o-mini"
            />
            <p>若接口未开放 /models 列表，直接手动输入模型 ID 也可正常保存并使用。</p>

            <div class="actions">
              <button class="primary" type="button" :disabled="!canSave" @click="save">保存设置</button>
              <button v-if="configured" type="button" :disabled="busy" @click="remove">清除配置</button>
            </div>
          </section>

          <div class="info">
            {{ isLocalEndpoint ? '本机推理完全免费、数据不出电脑。' : '对话与自动化摘要会发送至你所选的模型服务，并按对应平台规则计费；聊天记录仅保存在本机。' }}
            <a v-if="currentPreset.docsUrl" :href="currentPreset.docsUrl" target="_blank" rel="noreferrer">{{ currentPreset.docsLabel }}</a>
          </div>
          <p v-if="note" class="note" role="status">{{ note }}</p>
        </template>

        <NativeSettings v-else @connection-changed="emit('connectionChanged')" @busy-changed="busy = $event; emit('busyChanged', $event)" />
      </main>
    </section>
  </div>
</template>

<style scoped>
.settings-overlay{position:absolute;inset:0;z-index:2300;display:grid;place-items:center;padding:20px;background:rgba(15,23,42,.35)}
.settings-dialog{display:flex;width:min(820px,100%);height:min(660px,100%);min-height:0;overflow:hidden;border:1px solid var(--border,#e4e9f1);border-radius:18px;background:var(--panel,#fff);box-shadow:0 22px 70px #0f172a40;color:var(--text,#26334b)}
.nav{width:190px;flex:none;padding:22px 14px;display:flex;flex-direction:column;gap:6px;background:var(--surface,#f7f8fb);border-right:1px solid var(--border,#e4e9f1)}
.nav-heading{display:flex;gap:10px;align-items:center;margin:0 4px 18px}
.nav-heading>span{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#786de6;color:#fff;font-size:20px}
.nav-heading strong,.nav-heading small{display:block}
.nav-heading small,.nav-foot{color:var(--muted,#94a3b8);font-size:10px;line-height:1.5}
.nav p{margin:0 8px 5px;color:var(--muted,#94a3b8);font-size:11px}
.nav button{display:flex;align-items:center;gap:9px;padding:9px 8px;border:0;border-radius:9px;text-align:left;background:transparent;color:inherit;cursor:pointer}
.nav button.selected{background:rgba(115,103,228,.12);color:#7569df;font-weight:650}
.provider-icon{display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#477bf0;color:#fff;font-weight:700;font-size:13px}
.provider-icon.native{background:#12865b;font-size:11px;font-family:ui-monospace,monospace}
.nav i{margin-left:auto;font-style:normal;font-size:10px;color:var(--muted,#94a3b8)}
.nav-foot{margin:auto 8px 0}
.settings-dialog main{flex:1;min-width:0;overflow:auto;padding:24px 28px}
.settings-dialog header{display:flex;justify-content:space-between;align-items:flex-start}
.settings-dialog header small{font-size:11px;color:var(--muted,#94a3b8)}
h2{margin:4px 0 0;font-size:21px}
.close{border:0;background:transparent;color:var(--muted,#64748b);font-size:18px;cursor:pointer}
.intro{margin:12px 0;color:var(--muted,#64748b);line-height:1.6;font-size:12.5px}
.status{font-size:12px;color:#9a6b20;margin:10px 0 12px}
.status span{display:inline-block;width:7px;height:7px;margin-right:6px;border-radius:50%;background:#e8a737}
.status.ready{color:#12865b}
.status.ready span{background:#27ad79}
.presets-box{display:flex;flex-direction:column;gap:8px;padding:12px 14px;margin-bottom:12px;border:1px solid var(--border,#e4e9f1);border-radius:12px;background:var(--surface,#fafbfc)}
.preset-group{display:flex;align-items:flex-start;gap:8px;flex-wrap:wrap}
.preset-group-label{flex:none;width:105px;font-size:11px;color:var(--muted,#64748b);padding-top:5px}
.preset-pills{display:flex;flex-wrap:wrap;gap:6px;flex:1;min-width:0}
.preset-pill{display:inline-flex;align-items:center;gap:5px;padding:5px 9px;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);font-size:11.5px;cursor:pointer;transition:border-color .15s,background .15s}
.preset-pill:hover{border-color:#9e94ef}
.preset-pill.active{border-color:#7569e7;background:rgba(117,105,231,.1);color:#5c50d6;font-weight:600}
.preset-pill small{font-size:10px;color:var(--muted,#94a3b8)}
.preset-pill.active small{color:#7569df}
.preset-note{margin:2px 0 0;font-size:11px;color:#5b677d;line-height:1.5}
.form-card{display:flex;flex-direction:column;gap:7px;padding:16px;border:1px solid var(--border,#e4e9f1);border-radius:12px;background:var(--surface,#fafbfc)}
label{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:650}
.field-tag{font-size:10px;font-weight:500;padding:1px 6px;border-radius:99px;background:rgba(100,116,139,.1);color:#64748b}
input,select{width:100%;box-sizing:border-box;border:1px solid var(--border,#dce3ed);border-radius:8px;padding:9px 10px;color:var(--text,#26334b);background:var(--panel,#fff);font:inherit;font-size:12.5px}
input:focus,select:focus{outline:2px solid #aaa2f4;outline-offset:1px}
.form-card p{margin:0 0 6px;color:var(--muted,#8492a8);font-size:11px;line-height:1.5}
.model-row{display:flex;gap:8px}
.model-row select{flex:1;min-width:0}
.model-row button{flex:none;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);padding:8px 11px;font-size:12px;cursor:pointer}
.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.actions button{padding:8px 14px;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);cursor:pointer;font-size:12.5px}
.actions .primary{background:#7569e7;color:white;border-color:#7569e7;font-weight:600}
button:disabled{opacity:.5;cursor:not-allowed}
.info{margin-top:12px;padding:10px 12px;border-radius:10px;background:rgba(115,103,228,.07);color:var(--muted,#64748b);font-size:11px;line-height:1.6}
.info a{display:inline-block;margin-left:6px;color:#7569df}
.note{margin-top:10px;font-size:12px;color:#334155}
@media(max-width:660px){
  .nav{width:120px;padding:16px 8px}
  .nav-heading small,.nav i{display:none}
  .settings-dialog main{padding:18px 14px}
  .preset-group{flex-direction:column;gap:4px}
  .preset-group-label{width:auto;padding-top:0}
}
</style>
