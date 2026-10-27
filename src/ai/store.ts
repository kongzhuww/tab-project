declare const chrome: any;

import { reactive } from "vue";

export interface AiMessage {
  id: string | number;
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AiKeyword {
  text: string;
  selected: boolean;
}

export interface AiDialogState {
  mounted: boolean;
  isOpen: boolean;
  model: string;
  statusText: string;
  authHidden: boolean;
  authCode: string;
  authLink: string;
  messages: AiMessage[];
  inputText: string;
  charCountText: string;
  isStreaming: boolean;
  kwShelfHidden: boolean;
  keywords: AiKeyword[];
}

const state = reactive<AiDialogState>({
  mounted: false,
  isOpen: false,
  model: "gemini-3.6-flash",
  statusText: "就绪 · Google Gemini 3.6 Flash（极速 · 100万上下文）",
  authHidden: true,
  authCode: "",
  authLink: "https://auth.openai.com/codex/device",
  messages: [],
  inputText: "",
  charCountText: "0 / 60,000 字符",
  isStreaming: false,
  kwShelfHidden: true,
  keywords: []
});

type AiActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: AiActionCallback | null = null;
let rpcBusy = false;
let pollTimer: ReturnType<typeof setTimeout> | null = null;

/** 历史兼容存根：旧版 Native Host AI 桥接已退役，当前为纯前端降级与海狸聊天室分流 */
async function nativeRpc(op: string, _extra: Record<string, any> = {}): Promise<any> {
  if (op === "poll") return { state: "ready", model: state.model };
  if (op === "connect") return { state: "ready", model: state.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}

function applyAiSnapshot(data: any): void {
  if (!data) return;
  const names: Record<string, string> = {
    disconnected: "未连接",
    connecting: "正在连接…",
    login: "等待你在官方页面授权…",
    ready: "就绪",
    running: "正在生成…",
    failed: "请求失败"
  };
  let statusText = data.error;
  if (!statusText) {
    if (data.state === "connecting") statusText = "正在连接本机 Codex 与 ChatGPT…";
    else if (data.state === "disconnected") statusText = "已待命（打开面板自动连接）";
    else if (data.authenticated) statusText = `就绪 · ChatGPT ${data.plan || "已登录"}`;
    else if (data.state === "ready") statusText = "就绪 · 尚未登录 ChatGPT";
    else statusText = names[data.state] || data.state;
  }
  state.statusText = statusText;
  state.authHidden = !data.loginUrl;
  state.authCode = data.loginCode || "";
  state.authLink = data.loginUrl || "https://auth.openai.com/codex/device";
  state.isStreaming = rpcBusy || data.busy || data.state === "running";
}

async function pollAiStatus(): Promise<void> {
  try {
    const data = await nativeRpc("poll");
    applyAiSnapshot(data);
  } catch {}
}

async function handleDefaultAiAction(action: string, payload?: any): Promise<void> {
  if (action === "open" || action === "connect") {
    try {
      state.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const data = await nativeRpc("connect");
      applyAiSnapshot(data);
    } catch (e: any) {
      state.statusText = e?.message || "连接失败";
    }
  } else if (action === "send" && payload?.text) {
    const userText = payload.text;
    state.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: userText
    });
    state.inputText = "";
    state.isStreaming = true;
    rpcBusy = true;
    try {
      await nativeRpc("send", { text: userText });
      await pollAiStatus();
    } catch (e: any) {
      state.statusText = e?.message || "发送失败";
    } finally {
      rpcBusy = false;
      state.isStreaming = false;
    }
  } else if (action === "stop") {
    try {
      await nativeRpc("stop");
    } catch {}
    state.isStreaming = false;
    rpcBusy = false;
  }
}

export const aiDialogController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  onAction(cb: AiActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    void handleDefaultAiAction(action, payload);
    return undefined;
  },

  open() {
    state.isOpen = true;
    this.dispatch("open");
  },

  close() {
    state.isOpen = false;
    this.dispatch("close");
  },

  newChat() {
    state.messages = [];
    state.inputText = "";
    state.kwShelfHidden = true;
    state.keywords = [];
    this.dispatch("newChat");
  },

  send() {
    const text = state.inputText.trim();
    if (!text || state.isStreaming) return;
    this.dispatch("send", { text });
  },

  stop() {
    state.isStreaming = false;
    this.dispatch("stop");
  },

  extractKeywords() {
    this.dispatch("extractKeywords");
  },

  addSummaryPrompt() {
    this.dispatch("addSummaryPrompt");
  },

  copyChat() {
    this.dispatch("copyChat");
  },

  selectAllKeywords(all: boolean) {
    state.keywords.forEach((k) => (k.selected = all));
    this.dispatch("selectAllKeywords", { all });
  },

  toggleKeyword(index: number) {
    if (state.keywords[index]) {
      state.keywords[index].selected = !state.keywords[index].selected;
      this.dispatch("toggleKeyword", { index, selected: state.keywords[index].selected });
    }
  },

  deepDiveKeywords() {
    const selected = state.keywords.filter((k) => k.selected).map((k) => k.text);
    this.dispatch("deepDiveKeywords", { selected });
  }
};
