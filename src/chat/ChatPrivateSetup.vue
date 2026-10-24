<script setup lang="ts">
import { ref, watch } from "vue";
import { chatModuleState as state } from "./chat-state";
import { privateChatConfig, disablePrivateChat, reloadPrivatePublicConfig } from "./private-chat-config";
import { privateChatState, previewPrivateInvite, joinPrivateInvite, listPrivateMembers, invitePrivateMember, revokePrivateMember } from "./private-chat-client";

const input = ref("");
const preview = ref("");
const notice = ref("");
const busy = ref(false);
const uid = ref("");
const name = ref("");
const invite = ref("");
const revoke = ref("");
const members = ref<Array<{ id: string; uid: string; name: string; revoked: boolean }>>([]);
const membersLoaded = ref(false);
const uidCopied = ref(false);
const joinOpen = ref(!privateChatConfig.room);
const confirmDisable = ref(false);

async function copyUid() {
  try {
    await navigator.clipboard.writeText(state.currentUser.uid);
    uidCopied.value = true;
    setTimeout(() => { uidCopied.value = false; }, 2000);
  } catch {
    notice.value = "复制失败，请展开聊天 ID 后手动复制。";
  }
}

let generation = 0;
watch(() => JSON.stringify(privateChatConfig.room), () => {
  generation++;
  input.value = preview.value = invite.value = revoke.value = "";
  members.value = [];
  membersLoaded.value = false;
  confirmDisable.value = false;
  joinOpen.value = !privateChatConfig.room;
});

watch(input, () => { preview.value = ""; });

async function run(action: () => Promise<void>) {
  if (busy.value) return;
  busy.value = true;
  notice.value = "";
  try {
    await action();
  } catch {
    notice.value = "操作未确认，请检查连接。生成邀请超时后，先刷新成员列表，不要重复生成。";
  } finally {
    busy.value = false;
  }
}

function inspect() {
  preview.value = "";
  notice.value = "";
  try {
    const c = previewPrivateInvite(input.value.trim());
    if (c.uid !== state.currentUser.uid) {
      notice.value = `这份邀请不属于你：邀请绑定 ID 为 ${c.uid}，你的聊天 ID 为 ${state.currentUser.uid}。请让服主为你重新生成；服主本人请使用自己的服主邀请。`;
      return;
    }
    preview.value = `${new URL(c.origin).host} · 房间 ${c.room}。邀请与你的聊天 ID 完全匹配，请确认信任这台服务器。`;
  } catch {
    notice.value = "邀请不完整或格式不正确，请复制以 BEAVER-PRIVATE1: 开头的整段内容。";
  }
}

async function join() {
  const c = previewPrivateInvite(input.value.trim());
  if (c.uid !== state.currentUser.uid) { inspect(); return; }
  await joinPrivateInvite(input.value.trim());
  input.value = preview.value = "";
  joinOpen.value = false;
  notice.value = "邀请已保存，正在尝试连接。连接结果以上方状态为准。";
}

async function load() {
  const g = generation;
  const result = await listPrivateMembers();
  if (g === generation && Array.isArray(result)) {
    members.value = result;
    membersLoaded.value = true;
  }
}

async function create() {
  const g = generation;
  const value = await invitePrivateMember(uid.value.trim(), "海狸群友");
  if (g !== generation) return;
  invite.value = value;
  notice.value = "专属邀请已生成，有效期 30 天。请复制并私发给这位朋友。";
  await load();
}

async function copy() {
  await navigator.clipboard.writeText(invite.value);
  notice.value = "邀请已复制到剪贴板，请私发给对应朋友，切勿公开。";
}

async function remove() {
  await revokePrivateMember(revoke.value);
  revoke.value = "";
  await load();
}

function disconnect() {
  disablePrivateChat();
  confirmDisable.value = false;
  notice.value = "已停用当前连接，历史记录仍保留于本机。可用原邀请随时重新加入。";
}
</script>

<template>
  <section class="private-setup">
    <!-- 顶栏状态条：聊天室名称与连接状态药丸 -->
    <div class="setup-heading-bar">
      <div class="heading-title-group">
        <span class="heading-icon">📡</span>
        <div>
          <strong class="heading-title">{{ privateChatConfig.room ? '当前私有聊天室' : '开始加入聊天室' }}</strong>
          <small v-if="privateChatConfig.room" class="heading-room-name">
            {{ privateChatConfig.room.room ? `房间：${privateChatConfig.room.room}` : '未连接房间' }}
          </small>
        </div>
      </div>
      <div
        class="setup-status-badge"
        :class="{
          'is-owner': state.connected && privateChatState.role === 'owner',
          'is-connected': state.connected && privateChatState.role !== 'owner',
          'is-connecting': state.connecting,
          'is-disconnected': !state.connected && !state.connecting
        }"
      >
        <span class="status-dot"></span>
        <span class="status-text">
          {{
            state.connected
              ? (privateChatState.role === 'owner' ? '已连接 · 👑 服主' : '已连接 · 💬 成员')
              : state.connecting
                ? '正在连接…'
                : privateChatConfig.room
                  ? '尚未连接'
                  : '尚未加入'
          }}
        </span>
      </div>
    </div>

    <p v-if="!privateChatConfig.room" class="hint-welcome-tip">
      💡 有朋友发给你的专属邀请，可展开下方“加入朋友的聊天室”进行绑定；若想自建开服，可查阅“自建服务说明”。
    </p>

    <!-- 手风琴 1: 我的聊天 ID -->
    <details class="setup-accordion-item">
      <summary class="accordion-summary">
        <div class="summary-left">
          <span class="accordion-icon">🆔</span>
          <div class="summary-text-wrap">
            <strong class="summary-title">我的聊天 ID</strong>
            <small class="summary-sub">让服主知道邀请谁 · 本机唯一身份码</small>
          </div>
        </div>
        <span class="chevron-arrow">›</span>
      </summary>
      <div class="accordion-body">
        <p class="body-tip">这是当前浏览器的聊天 ID，用于服主生成绑定你的专属邀请。ID 本身不是密码或访问凭据，邀请中才包含授权 Token。</p>
        <div class="uid-display-row">
          <code class="uid-code" title="点击即可全选复制">{{ state.currentUser.uid }}</code>
          <button type="button" class="btn-copy-uid" @click="copyUid">
            {{ uidCopied ? '✅ 已复制' : '📋 复制我的 ID' }}
          </button>
        </div>
        <small class="field-footnote">💡 换浏览器或重置数据可能产生新 ID；ID 改变后，请让服主为新 ID 生成邀请，原邀请不能用于其他 ID。</small>
      </div>
    </details>

    <!-- 手风琴 2: 加入 / 使用邀请 -->
    <details class="setup-accordion-item" :open="joinOpen" @toggle="joinOpen = ($event.target as HTMLDetailsElement).open">
      <summary class="accordion-summary">
        <div class="summary-left">
          <span class="accordion-icon">✉️</span>
          <div class="summary-text-wrap">
            <strong class="summary-title">{{ privateChatConfig.room ? '使用另一份邀请 / 切换房间' : '加入朋友的聊天室' }}</strong>
            <small class="summary-sub">粘贴服主为你生成的专属加入邀请凭据</small>
          </div>
        </div>
        <span class="chevron-arrow">›</span>
      </summary>
      <div class="accordion-body">
        <p class="body-tip">先把你的聊天 ID 发给朋友，服主生成专属邀请后，将整段 <code>BEAVER-PRIVATE1:</code> 凭据粘贴于此。</p>
        <div class="invite-input-group">
          <div class="input-label-row">
            <span class="field-label-text">你的专属邀请密钥</span>
            <button type="button" class="btn-text-link" @click="copyUid">
              {{ uidCopied ? '✅ ID 已复制' : '复制我的聊天 ID 给服主' }}
            </button>
          </div>
          <input
            v-model="input"
            type="password"
            class="setup-modern-input"
            autocomplete="off"
            placeholder="粘贴 BEAVER-PRIVATE1: 开头的完整邀请"
          />
        </div>
        <div class="action-row">
          <button type="button" class="btn-modern-secondary" :disabled="busy || !input.trim()" @click="inspect">
            🔍 检查邀请
          </button>
          <small class="action-hint">仅在本机安全校验与解析，不会立即发起网络连接。</small>
        </div>
        <div v-if="preview" class="invite-preview-card">
          <div class="preview-text">
            <span class="preview-icon">🌐</span>
            <p>{{ preview }}</p>
          </div>
          <small v-if="privateChatConfig.room" class="switch-warning-tip">⚠️ 确认连接后将切换至新聊天室，原房间本地消息仍会妥善归档保留。</small>
          <button type="button" class="btn-modern-primary" :disabled="busy" @click="run(join)">
            🚀 确认并立即连接
          </button>
        </div>
      </div>
    </details>

    <!-- 手风琴 3: 邀请与管理成员 (服主专用) -->
    <details v-if="privateChatState.role === 'owner'" class="setup-accordion-item">
      <summary class="accordion-summary">
        <div class="summary-left">
          <span class="accordion-icon">👥</span>
          <div class="summary-text-wrap">
            <strong class="summary-title">邀请与管理房间成员</strong>
            <small class="summary-sub">服主专用 · 一人一码定向发信，保障私密性</small>
          </div>
        </div>
        <span class="chevron-arrow">›</span>
      </summary>
      <div class="accordion-body">
        <p class="body-tip">让朋友复制他的聊天 ID 给你，在此输入后生成一份 30 天有效的专属邀请，绝不要把服主自己的邀请公开出去。</p>
        <div class="form-field">
          <label>朋友的聊天 ID</label>
          <input v-model="uid" class="setup-modern-input" maxlength="160" placeholder="粘贴朋友发来的专属 ID" />
        </div>
        <div class="action-row">
          <button type="button" class="btn-modern-primary" :disabled="busy || !uid.trim()" @click="run(create)">
            ✨ 生成专属邀请
          </button>
          <button v-if="invite" type="button" class="btn-modern-success" :disabled="busy" @click="run(copy)">
            📋 复制邀请给朋友
          </button>
          <button type="button" class="btn-modern-secondary" :disabled="busy" @click="run(load)">
            🔄 刷新成员列表
          </button>
        </div>
        <div v-if="membersLoaded && !members.length" class="empty-members-tip">
          暂无受邀成员，生成邀请发送给好友后即可在此管理。
        </div>
        <div v-if="members.length" class="members-manager-list">
          <div v-for="m in members" :key="m.id" class="member-manage-row">
            <div class="member-manage-info">
              <strong class="member-manage-name">{{ m.name }}</strong>
              <small class="member-manage-uid">{{ m.revoked ? '已撤销访问权限' : m.uid }}</small>
            </div>
            <div class="member-manage-actions">
              <button v-if="!m.revoked && revoke !== m.id" type="button" class="btn-revoke-step" :disabled="busy" @click="revoke = m.id">
                撤销
              </button>
              <template v-if="revoke === m.id">
                <span class="revoke-confirm-text">确定撤销？</span>
                <button type="button" class="btn-revoke-danger" :disabled="busy" @click="run(remove)">确认</button>
                <button type="button" class="btn-cancel-flat" @click="revoke = ''">取消</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </details>

    <!-- 手风琴 4: 自建聊天室说明 -->
    <details class="setup-accordion-item">
      <summary class="accordion-summary">
        <div class="summary-left">
          <span class="accordion-icon">🛠️</span>
          <div class="summary-text-wrap">
            <strong class="summary-title">我想自建聊天室</strong>
            <small class="summary-sub">基于轻量 Python / SQLite 的自建服务指南</small>
          </div>
        </div>
        <span class="chevron-arrow">›</span>
      </summary>
      <div class="accordion-body">
        <p class="body-tip">创建聊天室仅需一台普通的 Linux VPS 或低配云服务器，轻量级 Python 标准库即可跑通，数据完全由你自主掌管。</p>
        <ol class="setup-steps-modern">
          <li>
            <div class="step-num">1</div>
            <div class="step-content">
              <strong>准备云服务器环境</strong>
              <span>需要 Python 3.12+ 与 SQLite 环境，对外开放端口并通过 Nginx 配置 HTTPS 证书保障安全传输。</span>
            </div>
          </li>
          <li>
            <div class="step-num">2</div>
            <div class="step-content">
              <strong>部署聊天服务程序</strong>
              <span>参考项目源码 <code>server/private-chat/README.md</code>，主程序为 <code>server.py</code>，零重量依赖，开箱即用。</span>
            </div>
          </li>
          <li>
            <div class="step-num">3</div>
            <div class="step-content">
              <strong>初始化服主专属身份</strong>
              <span>复制你上方的“我的聊天 ID”，运行 <code>python bootstrap.py</code> 生成服主私钥与专属连接邀请。</span>
              <button type="button" class="btn-modern-secondary btn-step-copy" @click="copyUid">
                {{ uidCopied ? '✅ ID 已复制' : '📋 复制我的聊天 ID' }}
              </button>
            </div>
          </li>
          <li>
            <div class="step-num">4</div>
            <div class="step-content">
              <strong>服主导入邀请开服</strong>
              <span>把服务器生成的 <code>owner-invite.txt</code> 粘贴至上方“使用另一份邀请”中，连接后即获得全权服主控制台！</span>
            </div>
          </li>
        </ol>
      </div>
    </details>

    <div v-if="notice" class="setup-notice-banner" role="status">
      <span class="notice-icon">💬</span>
      <span>{{ notice }}</span>
    </div>

    <!-- 底部安全背书说明 -->
    <footer class="privacy-footer-box">
      <span class="privacy-shield-icon">🛡️</span>
      <p class="privacy-text">
        <strong>安全说明</strong>：聊天内容直接保存在服主自建的私有服务器上，未提供端到端加密。请只加入你信任的朋友开办的聊天室，切勿在不熟悉的公共房间中发送敏感凭证。
      </p>
    </footer>
  </section>
</template>

<style scoped>
.private-setup {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--text);
  min-width: 0;
  font-size: 13px;
}

/* 顶栏状态条 */
.setup-heading-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.heading-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.heading-icon {
  font-size: 20px;
}
.heading-title {
  font-size: 14px;
  color: var(--heading);
  display: block;
}
.heading-room-name {
  font-size: 11.5px;
  color: var(--muted);
  display: block;
}

.setup-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
}
.setup-status-badge .status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--muted);
}
.setup-status-badge.is-owner {
  background: rgba(16, 185, 129, 0.12);
  border-color: color-mix(in srgb, #10b981 35%, transparent);
  color: #10b981;
}
.setup-status-badge.is-owner .status-dot {
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
}
.setup-status-badge.is-connected {
  background: rgba(59, 130, 246, 0.1);
  border-color: color-mix(in srgb, #3b82f6 30%, transparent);
  color: #3b82f6;
}
.setup-status-badge.is-connected .status-dot {
  background: #3b82f6;
}
.setup-status-badge.is-connecting {
  background: rgba(245, 158, 11, 0.1);
  border-color: color-mix(in srgb, #f59e0b 30%, transparent);
  color: #f59e0b;
}
.setup-status-badge.is-connecting .status-dot {
  background: #f59e0b;
}

.hint-welcome-tip {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.6;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 10px 14px;
  border-radius: 8px;
  margin: 0;
}

/* 手风琴卡片 */
.setup-accordion-item {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--panel);
  overflow: hidden;
  transition: all 0.15s ease;
}
.setup-accordion-item:hover {
  border-color: color-mix(in srgb, var(--border) 70%, #10b981 30%);
}
.setup-accordion-item[open] {
  background: color-mix(in srgb, var(--surface) 35%, var(--panel));
  border-color: color-mix(in srgb, var(--border) 60%, #10b981 40%);
}

.accordion-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  list-style: none;
}
.accordion-summary::-webkit-details-marker {
  display: none;
}
.summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.accordion-icon {
  font-size: 17px;
}
.summary-text-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.summary-title {
  font-size: 13px;
  color: var(--heading);
}
.summary-sub {
  font-size: 11.5px;
  color: var(--muted);
}
.chevron-arrow {
  font-size: 16px;
  font-weight: 700;
  color: var(--muted);
  transition: transform 0.2s ease;
  line-height: 1;
}
.setup-accordion-item[open] .chevron-arrow {
  transform: rotate(90deg);
  color: #10b981;
}

/* 手风琴内容区域 */
.accordion-body {
  padding: 4px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px dashed var(--border);
  margin-top: 2px;
  padding-top: 14px;
}
.body-tip {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
}

.uid-display-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.uid-code {
  user-select: all;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  padding: 7px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--heading);
  letter-spacing: 0.5px;
  flex: 1;
  min-width: 200px;
  overflow-wrap: anywhere;
}
.btn-copy-uid {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--heading);
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
  flex-shrink: 0;
}
.btn-copy-uid:hover {
  background: #10b981;
  color: #fff;
  border-color: #10b981;
}

.field-footnote {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.5;
}

/* 输入表单 */
.invite-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.input-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}
.field-label-text {
  font-weight: 600;
  color: var(--heading);
}
.btn-text-link {
  background: transparent;
  border: 0;
  color: #10b981;
  font-size: 11.5px;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
.btn-text-link:hover {
  color: #059669;
}

.setup-modern-input {
  width: 100%;
  box-sizing: border-box;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text);
  transition: all 0.15s ease;
}
.setup-modern-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.action-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.action-hint {
  font-size: 11.5px;
  color: var(--muted);
}

/* 通用按钮 */
.btn-modern-primary {
  background: #10b981;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 7px 16px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
  transition: all 0.12s ease;
}
.btn-modern-primary:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
}
.btn-modern-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-modern-secondary {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--heading);
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.btn-modern-secondary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--surface) 65%, #10b981 35%);
  border-color: #10b981;
  color: #10b981;
}

.btn-modern-success {
  background: #059669;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.btn-modern-warning {
  background: var(--surface);
  border: 1px solid color-mix(in srgb, #f59e0b 35%, transparent);
  color: #f59e0b;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.btn-modern-warning:hover:not(:disabled) {
  background: #f59e0b;
  color: #fff;
}
.btn-modern-danger {
  background: #ef4444;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.btn-cancel-flat {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 12px;
  cursor: pointer;
}

.invite-preview-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.preview-text {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: var(--heading);
  line-height: 1.5;
}
.preview-text p {
  margin: 0;
}
.switch-warning-tip {
  color: #f59e0b;
  font-size: 11.5px;
}

/* 服主表单 */
.owner-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field label {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading);
}

.members-manager-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}
.member-manage-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  gap: 10px;
}
.member-manage-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.member-manage-name {
  font-size: 12.5px;
  color: var(--heading);
}
.member-manage-uid {
  font-size: 11px;
  color: var(--muted);
  font-family: ui-monospace, monospace;
}
.member-manage-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.btn-revoke-step {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
}
.btn-revoke-step:hover {
  border-color: #ef4444;
  color: #ef4444;
}
.btn-revoke-danger {
  background: #ef4444;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
}
.revoke-confirm-text {
  font-size: 11px;
  color: #ef4444;
}
.empty-members-tip {
  font-size: 12px;
  color: var(--muted);
  padding: 8px 0;
}

/* 自建步骤 */
.setup-steps-modern {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.setup-steps-modern li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #10b981;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.step-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 12px;
}
.step-content strong {
  color: var(--heading);
  font-size: 12.5px;
}
.step-content span {
  color: var(--muted);
  line-height: 1.5;
}
.btn-step-copy {
  margin-top: 6px;
  width: fit-content;
}

/* 诊断框 */
.diagnostic-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.diag-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}
.diag-label {
  color: var(--muted);
  width: 70px;
  flex-shrink: 0;
}
.diag-val {
  color: var(--heading);
  overflow-wrap: anywhere;
}
.diag-val.monospace {
  font-family: ui-monospace, monospace;
}
.disable-confirm-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid color-mix(in srgb, #ef4444 30%, transparent);
  border-radius: 8px;
}
.disable-confirm-panel p {
  color: #ef4444;
  font-size: 12px;
  margin: 0;
}

.setup-notice-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  border-radius: 8px;
  color: #10b981;
  font-size: 12.5px;
  font-weight: 500;
}

/* 底部安全说明 */
.privacy-footer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-top: 4px;
}
.privacy-shield-icon {
  font-size: 18px;
  line-height: 1;
}
.privacy-text {
  margin: 0;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.6;
}
.privacy-text strong {
  color: var(--heading);
}
</style>
