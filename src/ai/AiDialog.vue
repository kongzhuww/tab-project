<template>
  <dialog
    id="lw-ai-dialog"
    class="lw-ai-dialog"
    aria-labelledby="lw-ai-title"
    :open="state.isOpen || undefined"
  >
    <header class="lw-ai-head">
      <h2 id="lw-ai-title">✦ AI 助手</h2>
      <small>Gemini 3.6 Flash · ChatGPT / 本机 Codex</small>
      <button
        id="lw-ai-close"
        type="button"
        title="关闭并停止 AI 进程"
        aria-label="关闭并停止 AI"
        @click="handleClose"
      >
        ×
      </button>
    </header>
    <div class="lw-ai-account">
      <select id="lw-ai-model" aria-label="AI 模型" v-model="state.model">
        <option value="gemini-3.6-flash" selected>✦ Gemini 3.6 Flash (Google · 百万上下文 · 免费极速)</option>
      </select>
      <button id="lw-ai-connect" type="button" @click="handleConnect">连接 ChatGPT / Codex</button>
    </div>
    <p id="lw-ai-status" class="lw-ai-status" role="status">{{ state.statusText }}</p>
    <div id="lw-ai-auth" class="lw-ai-auth" :hidden="state.authHidden">
      设备码：<code id="lw-ai-code">{{ state.authCode }}</code>
      <a id="lw-ai-auth-link" :href="state.authLink" target="_blank" rel="noopener noreferrer">打开官方授权页 ↗</a><br>
      <small>请你本人登录并输入设备码；如提示不允许设备登录，请先在 ChatGPT 安全设置中开启。设备码不要分享给他人。</small>
    </div>
    <div id="lw-ai-log" class="lw-ai-log" role="log" aria-label="AI 对话" aria-live="off">
      <div
        v-for="m in state.messages"
        :key="m.id"
        class="lw-ai-msg"
        :class="`lw-ai-msg-${m.role}`"
      >
        <div class="lw-ai-msg-content">{{ m.content }}</div>
      </div>
    </div>
    <div class="lw-ai-compose">
      <div class="lw-ai-actions">
        <button id="lw-ai-new" type="button" @click="handleNew">新对话</button>
        <button
          id="lw-ai-extract-kw"
          type="button"
          title="分析文章知识点关键词与通篇大意"
          @click="handleExtractKw"
        >
          ① 提炼大意与关键词
        </button>
        <button id="lw-ai-summary" type="button" @click="handleAddSummary">添加分析提示词</button>
        <label class="lw-ai-file">
          导入文本
          <input
            id="lw-ai-file"
            type="file"
            accept=".txt,.srt,.vtt,.md"
            aria-label="导入文本或字幕"
          />
        </label>
        <button id="lw-ai-copy" type="button" @click="handleCopy">复制对话</button>
      </div>
      <section
        id="lw-ai-kw-shelf"
        class="lw-ai-kw-shelf"
        :hidden="state.kwShelfHidden"
        aria-label="核心知识点词汇"
      >
        <header class="lw-ai-kw-head">
          <span>🏷 <b>核心知识点词汇</b>（勾选需要深度解析的词汇）：</span>
          <div class="lw-ai-kw-tools">
            <button id="lw-ai-kw-all" type="button" @click="handleSelectAllKw(true)">全选</button>
            <button id="lw-ai-kw-none" type="button" @click="handleSelectAllKw(false)">清空</button>
          </div>
        </header>
        <div id="lw-ai-kw-tags" class="lw-ai-kw-tags" role="group" aria-label="知识点词汇列表">
          <label
            v-for="(kw, idx) in state.keywords"
            :key="idx"
            class="lw-ai-kw-tag"
            :class="{ active: kw.selected }"
          >
            <input
              type="checkbox"
              :checked="kw.selected"
              @change="handleToggleKw(idx)"
            />
            <span>{{ kw.text }}</span>
          </label>
        </div>
        <footer class="lw-ai-kw-foot">
          <button
            id="lw-ai-kw-deep-dive"
            type="button"
            class="primary lw-ai-btn-deep"
            @click="handleDeepDive"
          >
            ② 深度解析所选词汇 ✦
          </button>
        </footer>
      </section>
      <textarea
        id="lw-ai-input"
        aria-label="发送给 AI 的文本"
        placeholder="粘贴字幕或输入问题… Enter 发送，Shift+Enter 换行；内容仅在点击发送后上传给 OpenAI。"
        spellcheck="false"
        v-model="state.inputText"
      ></textarea>
      <footer>
        <span id="lw-ai-count">{{ state.charCountText }}</span>
        <button id="lw-ai-stop" type="button" @click="handleStop">停止 / 断开</button>
        <button
          id="lw-ai-send"
          class="primary"
          type="button"
          :disabled="!state.inputText.trim() || state.isStreaming"
          @click="handleSend"
        >
          发送 ↵
        </button>
      </footer>
      <p class="lw-ai-privacy">
        使用 ChatGPT/Codex 订阅额度，不会自动切换付费 API。凭据由本机 Codex 保管；不发送到 VPS。对话不写入插件存储，刷新会丢失；OpenAI 端遵循账号的数据设置。停止会重置模型上下文，需重新连接并新建对话。
      </p>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { aiDialogController } from "./store";

// AI 助手弹窗响应式状态
const state = aiDialogController.state;

function handleClose() {
  aiDialogController.close();
}

function handleConnect() {
  aiDialogController.dispatch("connect");
}

function handleNew() {
  aiDialogController.newChat();
}

function handleExtractKw() {
  aiDialogController.extractKeywords();
}

function handleAddSummary() {
  aiDialogController.addSummaryPrompt();
}

function handleCopy() {
  aiDialogController.copyChat();
}

function handleSelectAllKw(all: boolean) {
  aiDialogController.selectAllKeywords(all);
}

function handleToggleKw(index: number) {
  aiDialogController.toggleKeyword(index);
}

function handleDeepDive() {
  aiDialogController.deepDiveKeywords();
}

function handleStop() {
  aiDialogController.stop();
}

function handleSend() {
  aiDialogController.send();
}
</script>
