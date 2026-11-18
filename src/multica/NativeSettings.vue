<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import {
  detectInstallerPlatform,
  type InstallerPlatform,
} from '../native-bridge/installer';
import { triggerInstallerDownload } from '../native-bridge/download';
import {
  hasNativeMessagingPermission,
  loadNativeBridgeConfig,
  pingNativeHost,
  requestNativeMessagingPermission,
  saveNativeBridgeConfig,
  type AcpProfile,
  type NativePingResult,
} from '../services/native-bridge.service';

declare const chrome: any;

const emit = defineEmits<{ connectionChanged: []; busyChanged: [busy: boolean] }>();

const platform = ref<InstallerPlatform>(detectInstallerPlatform());
const extensionId = ref(typeof chrome !== 'undefined' && chrome.runtime?.id ? String(chrome.runtime.id) : '');
const permissionGranted = ref(false);
const pingResult = ref<NativePingResult | null>(null);
const awaitingInstall = ref(false);
const defaultCwd = ref('');
const piToolsEnabled = ref(true);
const acpProfiles = ref<AcpProfile[]>([]);
const newAcpName = ref('');
const newAcpCommand = ref('');
const runHint = ref('');
const downloadedName = ref('');
const busy = ref(false);
const note = ref('');
let pollTimer: ReturnType<typeof setInterval> | null = null;
let polling = false;

const ACP_PRESETS = [
  { name: 'Claude Code (ACP)', command: 'claude-agent-acp' },
  { name: 'Codex (ACP)', command: 'codex-acp' },
  { name: 'Gemini CLI (ACP)', command: 'gemini --acp' },
];

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function startPolling() {
  stopPolling();
  pollTimer = setInterval(async () => {
    if (polling || pingResult.value || !permissionGranted.value) return;
    polling = true;
    try {
      const res = await pingNativeHost();
      pingResult.value = res;
      awaitingInstall.value = false;
      if (!defaultCwd.value) defaultCwd.value = res.defaultCwd;
      note.value = '已自动检测到本机连接！';
      stopPolling();
      emit('connectionChanged');
    } catch {
      // Host not registered yet; keep waiting quietly.
    } finally {
      polling = false;
    }
  }, 2000);
}

async function refreshState() {
  permissionGranted.value = await hasNativeMessagingPermission();
  const cfg = await loadNativeBridgeConfig();
  defaultCwd.value = cfg.defaultCwd;
  piToolsEnabled.value = cfg.piToolsEnabled;
  acpProfiles.value = cfg.acpProfiles;
  if (permissionGranted.value) {
    try {
      pingResult.value = await pingNativeHost();
      awaitingInstall.value = false;
      if (!defaultCwd.value) defaultCwd.value = pingResult.value.defaultCwd;
      stopPolling();
    } catch {
      pingResult.value = null;
    }
  } else {
    pingResult.value = null;
  }
}

onMounted(() => { void refreshState(); });
onBeforeUnmount(() => { stopPolling(); });

async function prepareInstaller() {
  if (!extensionId.value) throw new Error('未能获取扩展 ID，请在扩展页内打开设置。');
  const result = await triggerInstallerDownload(extensionId.value, platform.value);
  downloadedName.value = result.filename;
  runHint.value = result.runHint;
  awaitingInstall.value = true;

  let copied = false;
  if (platform.value !== 'windows' && navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(result.runHint); copied = true; } catch {}
  }

  note.value = platform.value === 'windows'
    ? `已下载 ${result.filename}，直接双击运行即可完成安装。`
    : copied
      ? `已下载 ${result.filename} 并自动复制安装命令！打开终端按 ⌘+V 粘贴回车即可。`
      : `已下载 ${result.filename}，请在终端运行下方命令完成安装。`;
  startPolling();
}

async function oneClickEnable() {
  if (busy.value) return;
  busy.value = true;
  emit('busyChanged', true);
  note.value = '';
  try {
    const alreadyGranted = await hasNativeMessagingPermission();
    const granted = alreadyGranted || await requestNativeMessagingPermission();
    permissionGranted.value = granted;
    if (!granted) {
      note.value = '你取消了权限授权；需要时可再次点击开启。';
      return;
    }
    try {
      const res = await pingNativeHost();
      pingResult.value = res;
      awaitingInstall.value = false;
      if (!defaultCwd.value) defaultCwd.value = res.defaultCwd;
      note.value = '本机终端与 Agent 已就绪。';
      emit('connectionChanged');
      return;
    } catch (pingErr) {
      const msg = pingErr instanceof Error ? pingErr.message : '';
      if (msg.includes('未向扩展开放 Native Messaging') || msg.includes('尚未授予 nativeMessaging')) {
        note.value = msg;
        return;
      }
      await prepareInstaller();
      emit('connectionChanged');
    }
  } catch (err) {
    note.value = err instanceof Error ? err.message : '开启失败，请重试。';
  } finally {
    busy.value = false;
    emit('busyChanged', false);
  }
}

async function copyRunHint() {
  if (!runHint.value) return;
  try {
    await navigator.clipboard.writeText(runHint.value);
    note.value = '已复制安装命令到剪贴板。';
  } catch {
    note.value = '复制失败，请手动选中命令复制。';
  }
}

async function manualDownload() {
  if (busy.value) return;
  busy.value = true;
  note.value = '';
  try { await prepareInstaller(); }
  catch (err) { note.value = err instanceof Error ? err.message : '下载失败。'; }
  finally { busy.value = false; }
}

async function testConnection() {
  if (busy.value) return;
  busy.value = true;
  note.value = '';
  try {
    permissionGranted.value = await hasNativeMessagingPermission();
    const res = await pingNativeHost();
    pingResult.value = res;
    awaitingInstall.value = false;
    stopPolling();
    if (!defaultCwd.value) defaultCwd.value = res.defaultCwd;
    note.value = `连接成功：${res.platform} · Host v${res.hostVersion}`;
    emit('connectionChanged');
  } catch (err) {
    pingResult.value = null;
    note.value = err instanceof Error ? err.message : '尚未检测到本机连接。';
    emit('connectionChanged');
  } finally {
    busy.value = false;
  }
}

async function saveDefaults() {
  if (busy.value) return;
  busy.value = true;
  note.value = '';
  try {
    await saveNativeBridgeConfig({
      defaultCwd: defaultCwd.value,
      piToolsEnabled: piToolsEnabled.value,
      acpProfiles: acpProfiles.value,
    });
    note.value = '本机终端与 Agent 设置已保存。';
    emit('connectionChanged');
  } catch (err) {
    note.value = err instanceof Error ? err.message : '保存失败。';
  } finally {
    busy.value = false;
  }
}

function applyPreset(preset: { name: string; command: string }) {
  newAcpName.value = preset.name;
  newAcpCommand.value = preset.command;
}

async function addAcpProfile() {
  const name = newAcpName.value.trim();
  const command = newAcpCommand.value.trim();
  if (!name || !command || busy.value) return;
  acpProfiles.value = [...acpProfiles.value, { id: crypto.randomUUID(), name, command }];
  newAcpName.value = '';
  newAcpCommand.value = '';
  await saveDefaults();
}

async function removeAcpProfile(id: string) {
  if (busy.value) return;
  acpProfiles.value = acpProfiles.value.filter(p => p.id !== id);
  await saveDefaults();
}
</script>

<template>
  <div class="native-settings">
    <p class="intro">
      通过 Chrome 原生 Native Messaging 连接本机 Agent CLI（支持 <strong>Pi</strong>、<strong>Claude Code</strong>、<strong>Codex</strong>、<strong>Gemini CLI</strong>、<strong>OpenCode</strong> 及任意 <strong>ACP</strong> 协议工具）。
    </p>

    <div class="status-bar" :class="{ ready: Boolean(pingResult) }">
      <span></span>
      <template v-if="pingResult">
        已连接（{{ pingResult.platform === 'darwin' ? 'macOS' : pingResult.platform }} · Node {{ pingResult.nodeVersion }} · Host v{{ pingResult.hostVersion }}）
      </template>
      <template v-else-if="awaitingInstall">
        正在等待本机完成安装（安装后会自动变绿）…
      </template>
      <template v-else-if="permissionGranted">
        已授权，等待完成本机一键安装
      </template>
      <template v-else>
        未开启
      </template>
    </div>

    <section v-if="!pingResult && !awaitingInstall" class="hero-card">
      <button type="button" class="primary big-btn" :disabled="busy" @click="oneClickEnable">
        {{ busy ? '正在准备…' : '一键开启本机终端' }}
      </button>
      <p class="sub">
        点击后自动配置零端口本机桥接并扫描已安装的 Agent CLI（需要本机已安装 Node.js 20+）。
      </p>
    </section>

    <section v-else-if="!pingResult && awaitingInstall" class="guide-card">
      <template v-if="platform === 'windows'">
        <div class="guide-title">只差最后一步：双击运行下载的文件</div>
        <ol class="steps">
          <li>在浏览器右上角下载记录里，直接点击打开 <code>{{ downloadedName || 'tab-project-install.cmd' }}</code></li>
          <li>等黑框提示「完成」后，这里会自动连接，无需其他操作</li>
        </ol>
      </template>
      <template v-else>
        <div class="guide-title">只差最后一步：在终端粘贴回车（命令已自动复制）</div>
        <ol class="steps">
          <li>打开「终端」（Mac 按 <code>⌘ + 空格</code> 输入 <code>Terminal</code> 回车）</li>
          <li>按 <code>⌘ + V</code> 粘贴并按回车运行，完成后这里会自动变为已连接</li>
        </ol>
        <div v-if="runHint" class="cmd-box">
          <code>{{ runHint }}</code>
          <button type="button" @click="copyRunHint">复制</button>
        </div>
      </template>
      <div class="actions">
        <button type="button" :disabled="busy" @click="testConnection">立即检测</button>
        <button type="button" :disabled="busy" @click="manualDownload">重新下载</button>
      </div>
    </section>

    <template v-else>
      <section class="form-card">
        <div class="step-head">已发现的本机 Agent CLI</div>
        <div v-if="pingResult?.agents?.length" class="agent-grid">
          <span v-for="agent in pingResult.agents" :key="agent.id" class="agent-chip" :class="{ on: agent.installed }">
            <i></i>{{ agent.name }}
          </span>
        </div>
        <div v-else class="warn-box">
          当前本机桥接脚本版本较旧，需要更新一次才能开启多 Agent 与 ACP 支持。
          <button type="button" :disabled="busy" @click="manualDownload">下载最新安装脚本</button>
        </div>

        <label for="native-cwd">默认工作目录（留空则使用主目录）</label>
        <div class="row-inline">
          <input id="native-cwd" v-model="defaultCwd" type="text" :disabled="busy" placeholder="/Users/kongzhu/..." />
          <button type="button" :disabled="busy" @click="saveDefaults">保存</button>
        </div>

        <label class="toggle-row">
          <input v-model="piToolsEnabled" type="checkbox" :disabled="busy" @change="saveDefaults" />
          <span>允许本机 Agent 使用工具（读写文件、执行命令）</span>
        </label>
      </section>

      <section class="form-card">
        <div class="step-head">自定义 ACP Agent（JSON-RPC over stdio）</div>
        <p class="sub">添加任意支持 Agent Client Protocol 的命令行工具（如 <code>claude-agent-acp</code>、<code>codex-acp</code>、<code>gemini --acp</code>）。</p>
        <div class="preset-row">
          <button v-for="preset in ACP_PRESETS" :key="preset.command" type="button" class="preset-btn" @click="applyPreset(preset)">
            + {{ preset.name }}
          </button>
        </div>
        <div class="row-inline">
          <input v-model="newAcpName" type="text" :disabled="busy" placeholder="显示名称（如 Claude ACP）" />
          <input v-model="newAcpCommand" type="text" :disabled="busy" placeholder="启动命令（如 npx -y @agentclientprotocol/claude-agent-acp）" />
          <button type="button" :disabled="busy || !newAcpName.trim() || !newAcpCommand.trim()" @click="addAcpProfile">添加</button>
        </div>
        <div v-for="profile in acpProfiles" :key="profile.id" class="profile-row">
          <div>
            <strong>{{ profile.name }}</strong>
            <code>{{ profile.command }}</code>
          </div>
          <button type="button" :disabled="busy" @click="removeAcpProfile(profile.id)">删除</button>
        </div>
      </section>
    </template>

    <p v-if="note" class="note" role="status">{{ note }}</p>

    <details class="advanced">
      <summary>高级选项 / 切换系统或手动检测</summary>
      <div class="advanced-body">
        <div class="row-inline">
          <select v-model="platform" aria-label="选择操作系统" :disabled="busy">
            <option value="macos-linux">macOS / Linux (.sh)</option>
            <option value="windows">Windows (.cmd)</option>
          </select>
          <button type="button" :disabled="busy || !extensionId" @click="manualDownload">下载安装脚本</button>
          <button type="button" :disabled="busy" @click="testConnection">检测连接</button>
        </div>
        <p class="sub">
          扩展 ID：<code>{{ extensionId || '未知' }}</code> · 如需彻底卸载，运行下载的脚本并加上 <code>--uninstall</code> 参数即可。
        </p>
      </div>
    </details>
  </div>
</template>

<style scoped>
.native-settings{display:flex;flex-direction:column;gap:12px}
.intro{margin:4px 0;color:var(--muted,#64748b);line-height:1.7;font-size:13px}
.status-bar{font-size:12px;color:#9a6b20}
.status-bar span{display:inline-block;width:7px;height:7px;margin-right:6px;border-radius:50%;background:#e8a737}
.status-bar.ready{color:#12865b}
.status-bar.ready span{background:#27ad79}
.hero-card,.guide-card,.form-card{display:flex;flex-direction:column;gap:10px;padding:16px;border:1px solid var(--border,#e4e9f1);border-radius:12px;background:var(--surface,#fafbfc)}
.step-head{font-size:12px;font-weight:700;color:var(--text,#26334b)}
.big-btn{width:100%;padding:12px 16px;border:0;border-radius:10px;font-size:14px;font-weight:650;cursor:pointer}
.primary{background:#7569e7;color:#fff;border-color:#7569e7}
.guide-title{font-size:13px;font-weight:700;color:var(--text,#26334b)}
.steps{margin:0;padding-left:18px;font-size:12px;line-height:1.8;color:var(--text,#26334b)}
.sub{margin:0;color:var(--muted,#8492a8);font-size:11px;line-height:1.6}
label{font-size:12px;font-weight:650}
input,select{width:100%;box-sizing:border-box;border:1px solid var(--border,#dce3ed);border-radius:8px;padding:8px 10px;color:var(--text,#26334b);background:var(--panel,#fff);font:inherit;font-size:12px}
.row-inline{display:flex;gap:8px}
.row-inline select,.row-inline input{flex:1;min-width:0}
.row-inline button,.actions button,.profile-row button{flex:none;padding:8px 12px;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);color:var(--text,#26334b);cursor:pointer;font:inherit;font-size:12px}
.actions{display:flex;gap:8px;flex-wrap:wrap}
.agent-grid{display:flex;flex-wrap:wrap;gap:6px}
.agent-chip{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;border:1px solid var(--border,#dce3ed);background:var(--panel,#fff);font-size:11px;color:var(--muted,#94a3b8)}
.agent-chip i{width:6px;height:6px;border-radius:50%;background:#cbd5e1}
.agent-chip.on{color:#12865b;border-color:rgba(39,173,121,.35)}
.agent-chip.on i{background:#27ad79}
.preset-row{display:flex;flex-wrap:wrap;gap:6px}
.preset-btn{padding:4px 8px;border:1px dashed var(--border,#cbd5e1);border-radius:7px;background:var(--panel,#fff);color:var(--text,#52627a);font-size:11px;cursor:pointer}
.profile-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border:1px solid var(--border,#e4e9f1);border-radius:8px;background:var(--panel,#fff)}
.profile-row strong,.profile-row code{display:block;font-size:11px}
.toggle-row{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:500;cursor:pointer}
.toggle-row input{width:auto;margin:0}
.warn-box{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px;border-radius:9px;background:rgba(245,158,11,.12);color:#9a6b20;font-size:11px}
.warn-box button{flex:none;padding:5px 10px;border:1px solid var(--border,#dce3ed);border-radius:7px;background:var(--panel,#fff);color:var(--text,#26334b);cursor:pointer;font-size:11px}
button:disabled{opacity:.5;cursor:not-allowed}
.cmd-box{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border:1px solid var(--border,#dce3ed);border-radius:8px;background:var(--panel,#fff);font-size:11px}
.cmd-box code{overflow:auto;white-space:nowrap;color:var(--text,#26334b)}
.cmd-box button{flex:none;padding:4px 8px;border:1px solid var(--border,#dce3ed);border-radius:6px;background:var(--surface,#f4f6fb);color:var(--text,#26334b);cursor:pointer;font-size:11px}
.note{margin:0;font-size:12px;color:var(--text,#26334b);line-height:1.5}
.advanced{font-size:11px;color:var(--muted,#8492a8)}
.advanced summary{cursor:pointer;user-select:none}
.advanced-body{display:flex;flex-direction:column;gap:8px;margin-top:8px;padding:12px;border:1px solid var(--border,#e4e9f1);border-radius:10px;background:var(--surface,#fafbfc)}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px}
</style>
