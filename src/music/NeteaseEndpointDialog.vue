<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import ModuleSettingsPanel from "../components/ModuleSettingsPanel.vue";
import { loadEndpoint, saveEndpoint as persistEndpoint } from "./settings";

const props = defineProps<{
  anchor: HTMLElement | null;
  visible?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  saved: [endpoint: string];
}>();

const value = ref("");
let initial = "";
const ready = ref(false);
const busy = ref(false);
const message = ref("");
const testStatus = ref<{ ok: boolean; msg: string } | null>(null);
const testing = ref(false);
let disposed = false;

onBeforeUnmount(() => {
  disposed = true;
});

onMounted(async () => {
  try {
    const loaded = await loadEndpoint();
    if (disposed) return;
    initial = loaded;
    value.value = initial;
    ready.value = true;
  } catch {
    if (disposed) return;
    message.value = "配置读取失败，请关闭后重试。";
  }
});

function fillPreset(presetUrl: string) {
  value.value = presetUrl;
  testStatus.value = null;
}

async function testConnection() {
  const target = value.value.trim().replace(/\/+$/, "");
  if (!target) {
    testStatus.value = { ok: false, msg: "请先输入节点 URL 地址" };
    return;
  }
  testing.value = true;
  testStatus.value = null;
  const start = Date.now();
  try {
    const url = new URL(target + "/toplist");
    const resp = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(6000)
    });
    const ms = Date.now() - start;
    if (resp.ok) {
      testStatus.value = { ok: true, msg: `✓ 节点连通正常！响应耗时 ${ms}ms` };
    } else {
      testStatus.value = { ok: false, msg: `✕ 节点返回 HTTP ${resp.status}，请核对服务是否正常` };
    }
  } catch (err: any) {
    testStatus.value = { ok: false, msg: `✕ 连接失败: ${err?.message || "网络请求超时或受阻"}` };
  } finally {
    testing.value = false;
  }
}

async function handleSave() {
  if (disposed || !ready.value || busy.value) return;
  busy.value = true;
  message.value = "";
  try {
    const normalized = value.value.trim().replace(/\/+$/, "");
    if (normalized) {
      const url = new URL(normalized);
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
        throw new Error("URL 格式不合法，必须以 http:// 或 https:// 开头");
      }
    }
    await persistEndpoint(normalized);
    initial = normalized;
    value.value = initial;
    message.value = "✓ 节点配置已保存！正在刷新歌单…";
    emit("saved", normalized);
    setTimeout(() => {
      if (!disposed) emit("close");
    }, 800);
  } catch (e: any) {
    if (disposed) return;
    message.value = `保存失败: ${e.message || "请检查 URL 格式"}`;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <ModuleSettingsPanel :anchor="anchor" label="网易云音乐 API 节点设置" :visible="visible ?? true" @close="emit('close')">
    <div class="netease-endpoint-pane">
      <header class="pane-head">
        <div>
          <strong style="font-size: 13.5px; color: var(--heading);">网易云 API 节点设置</strong>
          <small style="display: block; font-size: 11px; color: var(--muted); margin-top: 2px;">
            用于拉取个人歌单、红心音乐与在线高保真音频流
          </small>
        </div>
        <button type="button" class="btn-close" aria-label="关闭设置" @click="emit('close')">✕</button>
      </header>

      <form class="pane-form" @submit.prevent="handleSave">
        <div class="field-item">
          <label class="field-label">当前服务节点 URL</label>
          <div style="display: flex; gap: 6px;">
            <input
              v-model="value"
              type="url"
              placeholder="如：http://localhost:3000"
              autocomplete="off"
              class="url-input"
            />
            <button
              type="button"
              class="btn-test"
              :disabled="testing || !value.trim()"
              @click="testConnection"
            >
              {{ testing ? "测试中…" : "测试连接" }}
            </button>
          </div>
        </div>

        <!-- 测试连通性结果反馈 -->
        <div v-if="testStatus" class="test-feedback" :class="{ success: testStatus.ok, fail: !testStatus.ok }">
          {{ testStatus.msg }}
        </div>

        <!-- 快捷填入预设 -->
        <div class="presets-section">
          <span class="presets-title">⚡ 快捷填入常用节点：</span>
          <div class="presets-tags">
            <button
              type="button"
              class="preset-btn"
              style="border-color: #f43f5e; color: #f43f5e; font-weight: 600;"
              title="本机默认服务端口"
              @click="fillPreset('http://localhost:3000')"
            >
              💻 本机默认 (http://localhost:3000)
            </button>
            <button
              type="button"
              class="preset-btn"
              title="本机回环 IP 地址"
              @click="fillPreset('http://127.0.0.1:3000')"
            >
              🏠 本地回环 (127.0.0.1:3000)
            </button>
          </div>
        </div>

        <!-- 详细指路教程 -->
        <div class="guide-box">
          <div class="guide-title">📖 什么是网易云 API？去哪里搞？</div>
          <p class="guide-desc">
            由于网易云官方有严格的防盗链与跨域限制，扩展需要通过开源的 <code>NeteaseCloudMusicApi</code> 反向代理服务来安全拉取你的歌单和歌曲。你可以选择以下任意一种方式：
          </p>

          <div class="guide-step">
            <b>方案 A · 最简单！本机 1 分钟免服务器启动（推荐）</b>
            <span>只要你电脑有 Node.js，按 <code>Win + R</code> 输入 <code>cmd</code>，运行下面一行命令：</span>
            <pre class="code-block">npx NeteaseCloudMusicApi</pre>
            <span>启动后在上面填入 <code>http://localhost:3000</code>，0 延迟、最稳定、不封号！</span>
          </div>

          <div class="guide-step" style="margin-top: 8px;">
            <b>方案 B · 免费云端部署（长期无需开电脑）</b>
            <span>在 GitHub 搜索 <code>Binaryify/NeteaseCloudMusicApi</code>，直接一键免费部署到 Vercel 或 Zeabur，获取专属在线域名填入。</span>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <div class="form-actions">
          <span v-if="message" class="save-msg">{{ message }}</span>
          <button type="button" class="btn-cancel" @click="emit('close')">取消</button>
          <button type="submit" class="btn-submit" :disabled="busy">保存并生效</button>
        </div>
      </form>
    </div>
  </ModuleSettingsPanel>
</template>

<style scoped>
.netease-endpoint-pane {
  padding: 16px;
  width: 380px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
}

.pane-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.btn-close:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--text);
}

.pane-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}

.url-input {
  flex: 1;
  box-sizing: border-box;
  padding: 7px 10px;
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 12px;
  outline: none;
}

.url-input:focus {
  border-color: #f43f5e;
}

.btn-test {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface, rgba(0, 0, 0, 0.04));
  color: var(--text);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-test:hover:not(:disabled) {
  background: var(--surface-hover, rgba(0, 0, 0, 0.08));
}

.test-feedback {
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 6px;
  line-height: 1.4;
}

.test-feedback.success {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.test-feedback.fail {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.presets-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.presets-title {
  font-size: 11px;
  color: var(--muted);
  font-weight: 500;
}

.presets-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.preset-btn {
  font-size: 10.5px;
  padding: 3px 8px;
  border: 1px dashed var(--border);
  border-radius: 4px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: all 0.15s ease;
}

.preset-btn:hover {
  border-color: #f43f5e;
  color: #f43f5e;
  background: rgba(244, 63, 94, 0.05);
}

.guide-box {
  background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 11px;
  color: var(--text);
}

.guide-title {
  font-weight: 700;
  font-size: 11.5px;
  color: #f43f5e;
  margin-bottom: 4px;
}

.guide-desc {
  margin: 0 0 8px;
  line-height: 1.5;
  color: var(--muted);
}

.guide-step {
  display: flex;
  flex-direction: column;
  gap: 3px;
  line-height: 1.45;
}

.guide-step b {
  font-size: 11px;
  color: var(--heading);
}

.guide-step code {
  background: rgba(0, 0, 0, 0.08);
  padding: 1px 4px;
  border-radius: 3px;
  font-family: ui-monospace, monospace;
  font-size: 10.5px;
}

.code-block {
  margin: 3px 0;
  padding: 5px 8px;
  background: rgba(0, 0, 0, 0.15);
  color: #f43f5e;
  border-radius: 4px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  user-select: all;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
}

.save-msg {
  font-size: 11px;
  color: #10b981;
  font-weight: 600;
  margin-right: auto;
}

.btn-cancel {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--text);
}

.btn-submit {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background: #f43f5e;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
