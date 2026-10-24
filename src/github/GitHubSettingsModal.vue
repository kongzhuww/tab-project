<script setup lang="ts">
import { ref, reactive, watch, onBeforeUnmount } from "vue";
import ModuleSettingsPanel from "../components/ModuleSettingsPanel.vue";
import { gitHubService, DEFAULT_GH_AI_CONFIG } from "../services/github.service";
import { loadGitHubSettings, saveGitHubSettings, clearGitHubStarCache, type GitHubModuleSettings } from "./settings";
import { createGitHubReadHeaders, readGitHubJson, GitHubReadError } from "./api-client";
import { ArchifyWebhookConfigError } from "./workflow-settings";
const props = withDefaults(defineProps<{ anchor: HTMLElement | null; visible?: boolean; aiRequest?: number }>(), { visible: true, aiRequest: 0 });
const emit = defineEmits<{ close: []; "account-reload": [] }>();
const activeTab = ref<"account" | "ai" | "workflow" | "cache">("account");
watch(() => props.aiRequest, request => { if (request && props.visible) activeTab.value = "ai"; }, { immediate: true });
const showToken = ref(false);
const isTesting = ref(false);
const isSaving = ref(false);
const ready = ref(false);
const message = ref("");
const testResult = ref<{ success: boolean; message: string; rateLimit?: { remaining: number; limit: number } } | null>(null);
const form = reactive<GitHubModuleSettings>({ ghUser: "", ghToken: "", ai: { ...DEFAULT_GH_AI_CONFIG }, archifyWebhookUrl: "" });
let initial: GitHubModuleSettings | undefined;
let disposed = false;
let testRequest: AbortController | undefined;
let testTimeout: number | undefined;
let readVersion = 0;
const loading = ref(false);
async function readSettings() {
  if (disposed || !props.visible || ready.value || loading.value || isSaving.value) return;
  const version = ++readVersion;
  loading.value = true;
  try {
    const settings = await loadGitHubSettings();
    if (disposed || !props.visible || version !== readVersion) return;
    Object.assign(form, settings);
    initial = JSON.parse(JSON.stringify(settings));
    ready.value = true;
    message.value = "";
  } catch {
    if (!disposed && props.visible && version === readVersion) message.value = "读取设置失败，已禁止保存；请重试读取。";
  } finally { if (version === readVersion) loading.value = false; }
}
function pauseTests() {
  clearTimeout(testTimeout); testTimeout = undefined;
  testRequest?.abort(); testRequest = undefined; isTesting.value = false;
}
watch(() => props.visible, visible => {
  if (visible) void readSettings();
  else { ++readVersion; loading.value = false; pauseTests(); showToken.value = false; }
}, { immediate: true, flush: "sync" });
onBeforeUnmount(() => { disposed = true; ++readVersion; pauseTests(); });
async function testConnection() {
  if (disposed || !props.visible || !ready.value || isTesting.value || isSaving.value) return;
  const user = form.ghUser.trim();
  const token = form.ghToken.trim();
  if (!user && !token) { message.value = "请填写用户名或 Token。"; return; }
  isTesting.value = true;
  testResult.value = null;
  const request = new AbortController();
  testRequest = request;
  const timeout = window.setTimeout(() => request.abort(), 10000);
  testTimeout = timeout;
  try {
    const { data, rateLimit } = await readGitHubJson<{ login?: unknown; id?: unknown }>(token ? "/user" : `/users/${encodeURIComponent(user)}`, {
      headers: createGitHubReadHeaders(token), signal: request.signal, timeoutMs: 10000, maxBytes: 128 * 1024
    });
    if (!data || typeof data.login !== "string" || !data.login || data.login.length > 100 || typeof data.id !== "number") throw new GitHubReadError("format", "GitHub 身份响应格式无效。");
    if (disposed || !props.visible || testRequest !== request) return;
    request.signal.throwIfAborted();
    testResult.value = {
      success: true, message: `连接成功：@${data.login}`,
      rateLimit: { remaining: rateLimit.remaining ?? 0, limit: rateLimit.limit ?? 0 }
    };
    if (!user && !form.ghUser.trim() && form.ghToken.trim() === token && data.login) form.ghUser = data.login;
  } catch (error) {
    if (!disposed && props.visible && testRequest === request) testResult.value = { success: false, message: error instanceof GitHubReadError ? error.message : "连接已取消或超时，请重试。" };
  } finally {
    clearTimeout(timeout);
    if (testRequest === request) { testRequest = undefined; testTimeout = undefined; isTesting.value = false; }
  }
}
async function saveSettings() {
  if (disposed || !props.visible || !ready.value || !initial || isSaving.value || isTesting.value) return;
  const accountEdited = form.ghUser !== initial.ghUser || form.ghToken !== initial.ghToken;
  if (accountEdited && !form.ghUser.trim() && !form.ghToken.trim()) { message.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。"; return; }
  isSaving.value = true;
  let saved = false;
  try {
    const result = await saveGitHubSettings(JSON.parse(JSON.stringify(form)), JSON.parse(JSON.stringify(initial)));
    saved = true;
    if (disposed) return;
    initial = JSON.parse(JSON.stringify(result.settings));
    Object.assign(form, result.settings);
    gitHubService.aiConfig = { ...result.settings.ai };
    message.value = "设置已保存。";
    if (result.accountChanged) {
      emit("account-reload");
      await gitHubService.loadGitHub(result.settings.ghUser, result.settings.ghToken);
      message.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。";
    }
  } catch (error) { message.value = error instanceof ArchifyWebhookConfigError ? error.message : saved ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。"; }
  finally { isSaving.value = false; }
}
async function clearCache() {
  if (disposed || !props.visible || !ready.value || isSaving.value || isTesting.value) return;
  isSaving.value = true;
  try {
    // Do not apply an unsaved token or username while clearing a cache.
    const settings = await loadGitHubSettings();
    if (!settings.ghUser && !settings.ghToken) { message.value = "请先保存账号设置。"; return; }
    if (disposed) return;
    await clearGitHubStarCache();
    if (disposed) return;
    emit("account-reload");
    await gitHubService.loadGitHub(settings.ghUser, settings.ghToken);
    message.value = "已提交 Star 缓存清理，分类和备注保留；仓库重读状态请查看主页面。";
  } catch { message.value = "清理或同步失败，请重试。"; }
  finally { isSaving.value = false; }
}
</script>

<template>
  <!-- 纯非模态 Popover 面板：绝对定位在右上角，零遮罩，不阻断页面视线与操作 -->
  <ModuleSettingsPanel :anchor="anchor" :visible="visible" label="GitHub 模组偏好设置" @close="emit('close')">
    <!-- 头部 -->
    <header class="gh-popover-head">
      <div class="gh-popover-title-wrap">
        <span class="gh-popover-badge">⚙️ GitHub 设置</span>
      </div>
      <button type="button" class="gh-popover-close-btn" title="关闭" @click="emit('close')">✕</button>
    </header>

    <!-- 极简标签导航 -->
    <nav class="gh-popover-tabs">
      <button
        type="button"
        class="gh-popover-tab"
        :class="{ active: activeTab === 'account' }"
        @click="activeTab = 'account'"
      >
        账号与 Token
      </button>
      <button
        type="button"
        class="gh-popover-tab"
        :class="{ active: activeTab === 'ai' }"
        @click="activeTab = 'ai'"
      >
        AI 研读
      </button>

      <button
        type="button"
        class="gh-popover-tab"
        :class="{ active: activeTab === 'cache' }"
        @click="activeTab = 'cache'"
      >
        缓存维护
      </button>
    </nav>

    <!-- 内容区 -->
    <p class="gh-settings-message">隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。</p>
    <button v-if="!ready" type="button" :disabled="loading || !visible" @click="readSettings">{{ loading ? "正在读取…" : "重试读取" }}</button>
    <p v-if="message" class="gh-settings-message" role="status">{{ message }}</p>
    <fieldset class="gh-settings-fields" :disabled="!ready || isSaving || isTesting">
    <main class="gh-popover-body">
      <!-- Tab 1: 账号与连接 -->
      <section v-show="activeTab === 'account'" class="gh-field-list">
        <div class="gh-field-item">
          <label class="gh-field-label">
            <span>用户名</span>
            <small class="optional">Token 可单独使用</small>
          </label>
          <input
            v-model="form.ghUser"
            type="text"
            class="gh-input"
            placeholder="例如：octocat"
            autocomplete="off"
          />
        </div>

        <div class="gh-field-item">
          <label class="gh-field-label">
            <span>个人访问令牌 (Token)</span>
            <small class="optional">5000次/h</small>
          </label>
          <div class="gh-input-action-wrap">
            <input
              v-model="form.ghToken"
              :type="showToken ? 'text' : 'password'"
              class="gh-input"
              placeholder="ghp_... / github_pat_..."
              autocomplete="off"
            />
            <button
              type="button"
              class="gh-toggle-pwd"
              :title="showToken ? '隐藏' : '显示'"
              @click="showToken = !showToken"
            >
              {{ showToken ? '👁️' : '🔒' }}
            </button>
          </div>
          <div class="gh-hint-row">
            <a href="https://github.com/settings/tokens/new?scopes=read:user&description=LogicWeaver-NewTab" target="_blank" rel="noopener" class="gh-link">
              申请 Token ↗
            </a>
          </div>
        </div>

        <!-- 连通性测试 -->
        <div class="gh-test-block">
          <button
            type="button"
            class="gh-test-btn"
            :disabled="isTesting"
            @click="testConnection"
          >
            <span>{{ isTesting ? '验证中…' : '⚡ 测试连接' }}</span>
          </button>
          <div v-if="testResult" class="gh-test-pill" :class="{ success: testResult.success, error: !testResult.success }">
            <span>{{ testResult.message }}</span>
            <span v-if="testResult.rateLimit" class="rate">({{ testResult.rateLimit.remaining }}/{{ testResult.rateLimit.limit }})</span>
          </div>
        </div>
      </section>

      <!-- Tab 2: AI 研读 -->
      <section v-show="activeTab === 'ai'" class="gh-field-list">
        <div class="gh-field-item">
          <label class="gh-field-label">模型供应商</label>
          <div class="gh-radio-bar">
            <label><input v-model="form.ai.provider" type="radio" value="gemini" /> Gemini</label>
            <label><input v-model="form.ai.provider" type="radio" value="openai" /> DeepSeek/OpenAI</label>
          </div>
        </div>

        <div class="gh-field-item">
          <label class="gh-field-label">API Key</label>
          <input
            v-model="form.ai.apiKey"
            type="password"
            class="gh-input"
            placeholder="sk-... / AIzaSy..."
            autocomplete="off"
          />
        </div>

        <div class="gh-field-item">
          <label class="gh-field-label">模型名</label>
          <input
            v-model="form.ai.model"
            type="text"
            class="gh-input"
            :placeholder="form.ai.provider === 'gemini' ? 'gemini-3.6-flash' : 'deepseek-chat'"
          />
        </div>

        <div class="gh-field-item">
          <label class="gh-field-label">Base URL</label>
          <input
            v-model="form.ai.baseUrl"
            type="text"
            class="gh-input"
            placeholder="填写与供应商匹配的 API 地址"
          />
        </div>
        <label><input v-model="form.ai.useCustomPrompt" type="checkbox" /> 使用自定义提示词</label>
        <textarea v-if="form.ai.useCustomPrompt" v-model="form.ai.customPrompt" class="gh-input" rows="4" aria-label="自定义提示词"></textarea>
      </section>



      <!-- Tab 3: 缓存 -->
      <section v-show="activeTab === 'cache'" class="gh-field-list">
        <p class="gh-cache-desc">
          若 GitHub 上刚添加了 Star 或更改了仓库信息，可就地清理缓存强制拉取最新数据。
        </p>
        <button type="button" class="gh-clear-btn" @click="clearCache">
          🧹 清空本地缓存并全量同步
        </button>
      </section>
    </main>
    </fieldset>

    <!-- 底部操作栏 -->
    <footer class="gh-popover-foot">
      <button type="button" class="gh-btn-cancel" @click="emit('close')">取消</button>
      <button type="button" class="gh-btn-save" :disabled="!ready || isSaving || isTesting" @click="saveSettings">
        {{ isSaving ? '保存中…' : '保存生效' }}
      </button>
    </footer>
  </ModuleSettingsPanel>
</template>

<style scoped>
.gh-popover-head, .gh-popover-foot { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; }
.gh-popover-head { border-bottom:1px solid var(--border, #ddd); }
.gh-popover-badge { font-weight:600; font-size:13px; }
.gh-popover-tabs { display:flex; gap:4px; padding:6px 10px; }
.gh-popover-tab { flex:1; }
.gh-popover-tab.active { color:var(--accent, #0284c7); border-color:var(--accent, #0284c7); }
.gh-popover-body { padding:14px; }
.gh-field-list { display:flex; flex-direction:column; gap:12px; }
.gh-field-item { display:flex; flex-direction:column; gap:4px; }
.gh-field-label { display:flex; justify-content:space-between; font-size:12px; }
.gh-input { width:100%; box-sizing:border-box; padding:7px 10px; border:1px solid var(--border, #ddd); border-radius:6px; background:var(--panel, #fff); color:inherit; }
.gh-input:focus { outline:2px solid var(--accent, #0284c7); outline-offset:1px; }
.gh-input-action-wrap { position:relative; }
.gh-input-action-wrap .gh-input { padding-right:40px; }
.gh-toggle-pwd { position:absolute; right:4px; top:3px; }
.gh-hint-row { text-align:right; }
.gh-link, .optional { color:var(--accent, #0284c7); font-size:11px; }
.gh-test-block { display:flex; flex-direction:column; gap:6px; }
.gh-test-pill { padding:6px; font-size:12px; overflow-wrap:anywhere; }
.gh-test-pill.error { color:#dc2626; }
.gh-test-pill.success { color:#15803d; }
.gh-radio-bar { display:flex; gap:12px; font-size:12px; }
.gh-cache-desc, .gh-settings-message { font-size:12px; line-height:1.5; margin:8px 14px; overflow-wrap:anywhere; }
.gh-settings-fields { border:0; padding:0; margin:0; min-width:0; }
.gh-popover-foot { justify-content:flex-end; gap:8px; border-top:1px solid var(--border, #ddd); }
button { padding:5px 10px; border:1px solid var(--border, #ddd); border-radius:6px; background:var(--panel, #fff); color:inherit; cursor:pointer; }
button:disabled { opacity:.5; cursor:default; }
.gh-btn-save { background:var(--accent, #0284c7); color:#fff; }
</style>
