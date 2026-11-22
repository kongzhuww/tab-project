import { s as Q } from "./runtime-protocol-C_r09aKr.js";
import { r as Z } from "./vendor-vue-_upDT3S_.js";
const U = [
  {
    id: "deepseek",
    name: "DeepSeek",
    shortTag: "国内推荐",
    group: "cn",
    baseUrl: "https://api.deepseek.com",
    defaultModel: "deepseek-chat",
    suggestedModels: ["deepseek-chat", "deepseek-reasoner", "deepseek-flash", "deepseek-v4-pro"],
    requiresKey: !0,
    keyPlaceholder: "sk-...",
    docsUrl: "https://platform.deepseek.com/api_keys",
    docsLabel: "获取 DeepSeek Key / 查看价格 ↗",
    note: "直连 DeepSeek 官方接口，高性价比中文推理。"
  },
  {
    id: "siliconflow",
    name: "硅基流动 SiliconFlow",
    shortTag: "国内聚合",
    group: "cn",
    baseUrl: "https://api.siliconflow.cn/v1",
    defaultModel: "deepseek-ai/DeepSeek-V3",
    suggestedModels: ["deepseek-ai/DeepSeek-V3", "deepseek-ai/DeepSeek-R1", "Qwen/Qwen2.5-72B-Instruct"],
    requiresKey: !0,
    keyPlaceholder: "sk-...",
    docsUrl: "https://cloud.siliconflow.cn/account/ak",
    docsLabel: "前往硅基流动控制台 ↗",
    note: "国内直连聚合平台，注册即有体验额度，支持 DeepSeek / Qwen / GLM 等。"
  },
  {
    id: "moonshot",
    name: "Kimi（月之暗面）",
    shortTag: "长文本",
    group: "cn",
    baseUrl: "https://api.moonshot.cn/v1",
    defaultModel: "moonshot-v1-8k",
    suggestedModels: ["moonshot-v1-8k", "moonshot-v1-32k", "kimi-latest"],
    requiresKey: !0,
    keyPlaceholder: "sk-...",
    docsUrl: "https://platform.moonshot.cn/console/api-keys",
    docsLabel: "前往 Moonshot 开放平台 ↗",
    note: "擅长中文长文阅读与总结。"
  },
  {
    id: "zhipu",
    name: "智谱 GLM",
    shortTag: "国内",
    group: "cn",
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    defaultModel: "glm-4-flash",
    suggestedModels: ["glm-4-flash", "glm-4-plus", "glm-z1-flash"],
    requiresKey: !0,
    keyPlaceholder: "输入智谱 API Key",
    docsUrl: "https://open.bigmodel.cn/usercenter/apikeys",
    docsLabel: "前往智谱开放平台 ↗",
    note: "提供免费 glm-4-flash 与高阶 GLM 模型。"
  },
  {
    id: "dashscope",
    name: "阿里百炼（通义千问）",
    shortTag: "国内",
    group: "cn",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    defaultModel: "qwen-plus",
    suggestedModels: ["qwen-turbo", "qwen-plus", "qwen-max", "qwq-plus"],
    requiresKey: !0,
    keyPlaceholder: "sk-...",
    docsUrl: "https://bailian.console.aliyun.com/",
    docsLabel: "前往阿里云百炼控制台 ↗",
    note: "使用阿里云百炼 OpenAI 兼容接口调用 Qwen 系列。"
  },
  {
    id: "openai",
    name: "OpenAI",
    shortTag: "海外",
    group: "global",
    baseUrl: "https://api.openai.com/v1",
    defaultModel: "gpt-4o-mini",
    suggestedModels: ["gpt-4o-mini", "gpt-4o", "o4-mini"],
    requiresKey: !0,
    keyPlaceholder: "sk-...",
    docsUrl: "https://platform.openai.com/api-keys",
    docsLabel: "OpenAI API Keys ↗",
    note: "OpenAI 官方接口（可配合自定义中转 Base URL 使用）。"
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    shortTag: "全球聚合",
    group: "global",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openai/gpt-4o-mini",
    suggestedModels: ["openai/gpt-4o-mini", "anthropic/claude-3.7-sonnet", "google/gemini-2.5-flash"],
    requiresKey: !0,
    keyPlaceholder: "sk-or-...",
    docsUrl: "https://openrouter.ai/keys",
    docsLabel: "前往 OpenRouter ↗",
    note: "一个 Key 统一调用 Claude / GPT / Gemini / DeepSeek 等数百款模型。"
  },
  {
    id: "ollama",
    name: "Ollama（本机免费）",
    shortTag: "本机免 Key",
    group: "local",
    baseUrl: "http://localhost:11434/v1",
    defaultModel: "qwen2.5:7b",
    suggestedModels: ["qwen2.5:7b", "deepseek-r1:7b", "llama3.2:latest"],
    requiresKey: !1,
    keyPlaceholder: "可留空（本机免 Key）",
    docsUrl: "https://ollama.com/",
    docsLabel: "了解 Ollama 本地部署 ↗",
    note: '直接连接本机 Ollama 端口，无需命令行桥接也不用 API Key。若遇 403，请配置 OLLAMA_ORIGINS="*" 后重启 Ollama。'
  },
  {
    id: "lmstudio",
    name: "LM Studio（本机免费）",
    shortTag: "本机免 Key",
    group: "local",
    baseUrl: "http://localhost:1234/v1",
    defaultModel: "local-model",
    suggestedModels: ["local-model"],
    requiresKey: !1,
    keyPlaceholder: "可留空（或按需填写）",
    docsUrl: "https://lmstudio.ai/",
    docsLabel: "了解 LM Studio ↗",
    note: "开启 LM Studio Local Server（默认 1234 端口）即可离线免费调用本地模型。"
  },
  {
    id: "custom",
    name: "自定义 OpenAI 兼容",
    shortTag: "自定义",
    group: "custom",
    baseUrl: "",
    defaultModel: "",
    suggestedModels: [],
    requiresKey: !1,
    keyPlaceholder: "按服务端要求填写（可留空）",
    docsUrl: "",
    docsLabel: "",
    note: "支持 vLLM、OneAPI / NewAPI、企业内网网关或任意 OpenAI /v1/chat/completions 兼容地址。"
  }
];
function x(e) {
  return U.find((t) => t.id === e) || U[0];
}
function ee(e) {
  return e === "deepseek-flash" || e === "deepseek-v4-pro" || e === "deepseek-reasoner";
}
const te = /^[a-zA-Z0-9._:/@-]{1,160}$/;
function I(e) {
  return typeof e == "string" && te.test(e.trim());
}
function K(e) {
  const t = e.toLowerCase();
  if (t === "localhost" || t === "127.0.0.1" || t === "[::1]" || t === "::1" || t.endsWith(".local") || /^10\.\d+\.\d+\.\d+$/.test(t) || /^192\.168\.\d+\.\d+$/.test(t)) return !0;
  const o = /^172\.(\d+)\.\d+\.\d+$/.exec(t);
  if (o) {
    const r = Number(o[1]);
    if (r >= 16 && r <= 31) return !0;
  }
  return !1;
}
function N(e) {
  try {
    const t = new URL(e);
    return K(t.hostname);
  } catch {
    return !1;
  }
}
function S(e) {
  const t = String(e || "").trim();
  if (!t) throw new Error("请填写接口地址（Base URL）。");
  let o;
  try {
    o = new URL(t);
  } catch {
    throw new Error("接口地址格式无效，请以 https:// 或 http://localhost 开头。");
  }
  if (o.username || o.password || o.search || o.hash)
    throw new Error("接口地址不能包含账号密码或查询参数。");
  if (o.protocol === "http:") {
    if (!K(o.hostname))
      throw new Error("远程接口请使用 https:// 安全连接（本机或局域网服务可使用 http://）。");
  } else if (o.protocol !== "https:")
    throw new Error("接口地址仅支持 https:// 或本机 http:// 协议。");
  let r = o.pathname.replace(/\/+$/, "");
  return r.endsWith("/chat/completions") ? r = r.slice(0, -17) : r.endsWith("/models") && (r = r.slice(0, -7)), `${o.origin}${r}`;
}
function B(e, t) {
  return e === "ollama" || e === "lmstudio" || e === "custom" ? !1 : !N(t);
}
const y = "byokConfigV1", oe = "byokConversationsV1", O = oe, m = () => chrome.storage.local;
function P(e) {
  return Array.isArray(e) ? e.map((t) => typeof t == "string" ? t.trim() : "").filter(I).slice(0, 200) : [];
}
async function de() {
  const e = (await m().get(y))[y], t = e?.openaiCompat, o = e?.deepseek;
  if (t && typeof t == "object" && typeof t.baseUrl == "string" && t.baseUrl) {
    const a = x(t.presetId), c = a.id === t.presetId ? a.id : "custom";
    let i = a.baseUrl || "https://api.deepseek.com";
    try {
      i = S(t.baseUrl);
    } catch {
    }
    const $ = typeof t.key == "string" ? t.key : "", f = P(t.models), u = I(t.model) ? t.model.trim() : a.defaultModel || "deepseek-flash", p = typeof t.label == "string" && t.label.trim() ? t.label.trim().slice(0, 40) : a.name, g = B(c, i);
    return { presetId: c, label: p, baseUrl: i, key: $, model: u, models: f, requiresKey: g, configured: !!(i && u && (!g || $)) };
  }
  const r = typeof o?.key == "string" ? o.key : "", n = P(o?.models), s = I(o?.model) ? o.model.trim() : "deepseek-flash";
  return {
    presetId: "deepseek",
    label: "DeepSeek",
    baseUrl: "https://api.deepseek.com",
    key: r,
    model: s,
    models: n,
    requiresKey: !0,
    configured: !!r
  };
}
async function fe(e, t, o) {
  const r = typeof e == "string" ? { presetId: "deepseek", label: "DeepSeek", baseUrl: "https://api.deepseek.com", key: e, model: "", models: o } : e, n = x(r.presetId), s = r.presetId && n.id === r.presetId ? n.id : r.baseUrl ? "custom" : "deepseek", d = typeof r.baseUrl == "string" ? r.baseUrl : n.baseUrl, a = S(d), c = B(s, a), i = (r.key || "").trim();
  if (c && !i)
    throw new Error(`请填写有效的 ${n.name} API Key，不能包含空格或换行。`);
  if (i && !/^[\x21-\x7e]{1,512}$/.test(i))
    throw new Error("API Key 格式无效，不能包含空格或换行。");
  const $ = (r.model || "").trim();
  if (!I($))
    throw new Error("模型名称格式无效。");
  const f = (await m().get(y))[y], u = f?.openaiCompat, p = f?.deepseek, g = typeof u?.key == "string" ? u.key : typeof p?.key == "string" ? p.key : "", A = typeof u?.baseUrl == "string" ? u.baseUrl : "https://api.deepseek.com", h = u?.models ?? p?.models, _ = g === i && A === a && Array.isArray(h) ? h : [], b = P(r.models ?? _), R = typeof r.label == "string" && r.label.trim() ? r.label.trim().slice(0, 40) : n.id === s && s !== "custom" ? n.name : (() => {
    try {
      return new URL(a).host;
    } catch {
      return "自定义模型";
    }
  })(), l = {
    ...f && typeof f == "object" ? f : {},
    openaiCompat: { presetId: s, label: R, baseUrl: a, key: i, model: $, models: b }
  };
  s === "deepseek" ? l.deepseek = { key: i, model: $, models: b } : delete l.deepseek, await m().set({ [y]: l });
}
async function pe(e) {
  const t = S(e.baseUrl || "https://api.deepseek.com"), o = (e.label || "").trim() || "模型服务", r = (e.key || "").trim();
  if ((e.requiresKey ?? !N(t)) && !/^[\x21-\x7e]{1,512}$/.test(r))
    throw new Error(`请先填写有效的 ${o} API Key。`);
  if (r && !/^[\x21-\x7e]{1,512}$/.test(r))
    throw new Error("API Key 格式无效，不能包含空格或换行。");
  let s;
  try {
    s = await fetch(`${t}/models`, {
      headers: {
        ...r ? { Authorization: `Bearer ${r}` } : {},
        Accept: "application/json"
      },
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      signal: AbortSignal.timeout(15e3)
    });
  } catch {
    throw N(t) ? new Error(`无法连接 ${o}（${t}）。请确认本地服务已启动，若用 Ollama 请配置 OLLAMA_ORIGINS="*" 后重启。`) : new Error(`无法连接 ${o} 获取模型，请检查接口地址与网络后重试。`);
  }
  if (!s.ok)
    throw s.body?.cancel().catch(() => {
    }), s.status === 401 ? new Error(`${o} API Key 无效或已过期（401）。`) : s.status === 403 && N(t) ? new Error(`${o} 拒绝了扩展请求（403）：请设置环境变量 OLLAMA_ORIGINS="*" 后重启本机服务。`) : new Error(`获取 ${o} 模型失败（HTTP ${s.status}），也可手动输入模型 ID 后直接保存。`);
  let d;
  try {
    d = await s.json();
  } catch {
    throw new Error(`${o} 返回的模型列表格式无效。`);
  }
  const a = Array.isArray(d?.data) ? d.data : Array.isArray(d?.models) ? d.models : null;
  if (!a) throw new Error(`${o} 返回的模型列表格式无效。`);
  const c = [...new Set(
    a.map((i) => i?.id ?? i?.name).filter(I).map((i) => i.trim())
  )].slice(0, 200);
  if (!c.length) throw new Error(`${o} 未返回可用模型，请手动输入模型 ID。`);
  return c;
}
async function me() {
  const e = (await m().get(y))[y], t = { ...e && typeof e == "object" ? e : {} };
  delete t.deepseek, delete t.openaiCompat, await m().set({ [y]: t });
}
const T = "jevApiConfigV1";
async function L() {
  const e = (await m().get(T))[T], t = typeof e?.endpoint == "string" ? e.endpoint.trim() : "";
  let o = "";
  if (t)
    try {
      const n = new URL(t);
      (n.protocol === "https:" || n.protocol === "http:") && (o = n.href);
    } catch {
    }
  const r = typeof e?.key == "string" ? e.key : "";
  return {
    endpoint: o,
    key: r,
    configured: !!o
  };
}
async function ue(e) {
  const t = String(e.endpoint || "").trim();
  let o;
  try {
    o = new URL(t);
  } catch {
    throw new Error("请输入有效的 Jev 接口地址（http:// 或 https://）。");
  }
  if (o.protocol !== "https:" && o.protocol !== "http:")
    throw new Error("Jev 接口仅支持 http:// 或 https:// 协议。");
  const r = await L(), n = typeof e.key == "string" ? e.key.trim() : r.key;
  return await m().set({
    [T]: {
      endpoint: o.href,
      key: n
    }
  }), L();
}
async function he() {
  await m().remove(T);
}
async function j() {
  const e = (await m().get(O))[O];
  return Array.isArray(e) ? e.filter((t) => t && t.provider === "deepseek" && typeof t.id == "string" && Array.isArray(t.messages)) : [];
}
async function q(e) {
  return typeof navigator < "u" && navigator.locks ? navigator.locks.request("tab-project:byok-history", e) : e();
}
async function ge(e) {
  await q(async () => {
    const t = await j(), o = JSON.parse(JSON.stringify(e));
    if (t.length >= 50 && !t.some((r) => r.id === o.id)) throw new Error("本机会话已达 50 条，请先删除不需要的会话。");
    await m().set({ [O]: [o, ...t.filter((r) => r.id !== o.id)] });
  });
}
async function we(e) {
  await q(async () => {
    await m().set({ [O]: (await j()).filter((t) => t.id !== e) });
  });
}
function re(e, t, o) {
  throw o === 401 ? new Error(`${e} API Key 无效或已过期（401）。`) : o === 402 ? new Error(`${e} 余额不足（402），请检查账户额度。`) : o === 403 && N(t) ? new Error(`${e} 拒绝了扩展请求（403）：请设置 OLLAMA_ORIGINS="*" 后重启本机服务。`) : o === 429 ? new Error(`${e} 请求过于频繁（429），请稍后再试。`) : new Error(`${e} 请求失败（HTTP ${o}），请检查模型名称、余额或网络。`);
}
async function ye(e, t, o, r, n, s, d) {
  const a = S(e.baseUrl || "https://api.deepseek.com"), c = (e.label || "").trim() || "模型服务", i = (e.key || "").trim();
  if ((e.requiresKey ?? !N(a)) && !/^[\x21-\x7e]{1,512}$/.test(i))
    throw new Error(`请先在设置中填写有效的 ${c} API Key。`);
  if (i && !/^[\x21-\x7e]{1,512}$/.test(i))
    throw new Error("API Key 格式无效，不能包含空格或换行。");
  const f = (t || "").trim();
  if (!I(f)) throw new Error("模型名称格式无效。");
  const u = o.filter((l) => !l.incomplete && (l.role === "user" || l.role === "assistant")).map((l) => ({ role: l.role, content: l.content })), p = await fetch(`${a}/chat/completions`, {
    method: "POST",
    headers: {
      ...i ? { Authorization: `Bearer ${i}` } : {},
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: JSON.stringify({
      model: f,
      messages: u,
      stream: !0,
      ...ee(f) && s && ["none", "low", "high", "max"].includes(s) ? { reasoning_effort: s } : {}
    }),
    signal: r,
    credentials: "omit",
    redirect: "error",
    referrerPolicy: "no-referrer",
    cache: "no-store"
  });
  if (p.ok || (p.body?.cancel().catch(() => {
  }), re(c, a, p.status)), !p.body) throw new Error(`${c} 未返回回复流。`);
  const g = p.body.getReader(), A = new TextDecoder();
  let h = "", _ = !1, b = 0;
  const R = (l) => {
    const E = l.split(`
`).filter((w) => w.startsWith("data:")).map((w) => w.slice(5).trimStart()).join(`
`);
    if (!E) return;
    if (E.trim() === "[DONE]") {
      _ = !0;
      return;
    }
    let k;
    try {
      k = JSON.parse(E);
    } catch {
      throw new Error(`${c} 回复流格式异常。`);
    }
    if (k.error) throw new Error(`${c} 回复流出现错误，请检查模型或账户后重试。`);
    const C = k?.choices?.[0]?.delta, Y = C?.reasoning_content ?? C?.reasoning;
    for (const [w, X] of [[C?.content, n], [Y, d]])
      if (typeof w == "string" && w) {
        if (b += w.length, b > 1e6) throw new Error("回复过长，已停止接收。");
        X?.(w);
      }
  };
  try {
    for (; !_; ) {
      const l = await g.read();
      h += A.decode(l.value, { stream: !l.done }).replace(/\r\n/g, `
`);
      let E;
      for (; (E = h.indexOf(`

`)) >= 0; ) {
        const k = h.slice(0, E);
        h = h.slice(E + 2), R(k);
      }
      if (h.length > 2e6) throw new Error(`${c} 回复流过大。`);
      if (l.done) break;
    }
    if (!_) throw new Error("回复连接提前中断，内容可能不完整；请求可能已计费。");
  } finally {
    g.cancel().catch(() => {
    }), g.releaseLock();
  }
}
const M = "com.tab_project.agent_bridge";
function $e(e = typeof navigator < "u" ? navigator.userAgent : "") {
  return /windows/i.test(e) ? "windows" : "macos-linux";
}
function J(e) {
  const t = e.trim().toLowerCase();
  if (!/^[a-p]{32}$/.test(t))
    throw new Error("无效的浏览器扩展 ID，无法生成 Native Messaging 安装脚本。");
  return t;
}
function F(e, t) {
  return JSON.stringify({
    name: M,
    description: "tab-project local zero-port Native Messaging terminal bridge",
    path: t,
    type: "stdio",
    allowed_origins: [`chrome-extension://${e}/`]
  }, null, 2);
}
function Ee(e, t) {
  const o = J(e), r = "__TAB_PROJECT_NATIVE_HOST_EOF__";
  if (t.includes(r)) throw new Error("Host source contains reserved heredoc marker.");
  const n = F(o, "__HOST_RUNNER_PATH__");
  return `#!/bin/sh
set -eu

HOST_NAME="${M}"
EXTENSION_ID="${o}"
INSTALL_DIR="\${HOME}/.tab-project-native-host"
HOST_SCRIPT="\${INSTALL_DIR}/tab-project-native-host.mjs"
RUNNER_SCRIPT="\${INSTALL_DIR}/run-host.sh"

OS_NAME="$(uname -s)"
if [ "\${OS_NAME}" = "Darwin" ]; then
  DIR_1="\${HOME}/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  DIR_2="\${HOME}/Library/Application Support/Microsoft Edge/NativeMessagingHosts"
  DIR_3="\${HOME}/Library/Application Support/Chromium/NativeMessagingHosts"
  DIR_4="\${HOME}/Library/Application Support/BraveSoftware/Brave-Browser/NativeMessagingHosts"
  DIR_5="\${HOME}/Library/Application Support/Citro Labs/ego lite/NativeMessagingHosts"
else
  DIR_1="\${HOME}/.config/google-chrome/NativeMessagingHosts"
  DIR_2="\${HOME}/.config/microsoft-edge/NativeMessagingHosts"
  DIR_3="\${HOME}/.config/chromium/NativeMessagingHosts"
  DIR_4="\${HOME}/.config/BraveSoftware/Brave-Browser/NativeMessagingHosts"
  DIR_5="\${HOME}/.config/ego-lite/NativeMessagingHosts"
fi

if [ "\${1:-}" = "--uninstall" ]; then
  rm -f "\${DIR_1}/\${HOST_NAME}.json" "\${DIR_2}/\${HOST_NAME}.json" "\${DIR_3}/\${HOST_NAME}.json" "\${DIR_4}/\${HOST_NAME}.json" "\${DIR_5}/\${HOST_NAME}.json"
  rm -rf "\${INSTALL_DIR}"
  echo "已卸载 \${HOST_NAME}，未保留任何端口或后台守护进程。"
  exit 0
fi

find_node() {
  if command -v node >/dev/null 2>&1; then
    command -v node
    return 0
  fi
  for c in     "/opt/homebrew/bin/node"     "/usr/local/bin/node"     "\${HOME}/.volta/bin/node"     "\${HOME}/.fnm/aliases/default/bin/node"
  do
    if [ -x "$c" ]; then
      echo "$c"
      return 0
    fi
  done
  nvm_node=""
  for candidate in "\${HOME}/.nvm/versions/node"/*/bin/node; do
    if [ -x "$candidate" ]; then
      nvm_node="$candidate"
    fi
  done
  if [ -n "$nvm_node" ]; then
    echo "$nvm_node"
    return 0
  fi
  return 1
}

NODE_BIN="$(find_node || true)"
if [ -z "\${NODE_BIN}" ]; then
  echo "错误：未找到 Node.js，请先安装 Node.js >= 20 后重试。" >&2
  exit 1
fi

NODE_MAJOR="$("\${NODE_BIN}" -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)"
if [ "\${NODE_MAJOR}" -lt 20 ]; then
  echo "错误：需要 Node.js >= 20（当前检测到 \${NODE_BIN}，主版本 \${NODE_MAJOR}）。" >&2
  exit 1
fi

mkdir -p "\${INSTALL_DIR}"
cat > "\${HOST_SCRIPT}" <<'${r}'
${t.trimEnd()}
${r}
chmod 755 "\${HOST_SCRIPT}"

cat > "\${RUNNER_SCRIPT}" <<EOF
#!/bin/sh
exec "\${NODE_BIN}" "\${HOST_SCRIPT}"
EOF
chmod 755 "\${RUNNER_SCRIPT}"

"\${NODE_BIN}" --check "\${HOST_SCRIPT}"

INSTALLED_COUNT=0
write_manifest() {
  dir="$1"
  mkdir -p "\${dir}"
  cat > "\${dir}/\${HOST_NAME}.json" <<EOF
${n.replace("__HOST_RUNNER_PATH__", "${RUNNER_SCRIPT}")}
EOF
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
}

for dir in "\${DIR_1}" "\${DIR_2}" "\${DIR_3}" "\${DIR_4}" "\${DIR_5}"; do
  parent="$(dirname "\${dir}")"
  if [ -d "\${parent}" ]; then
    write_manifest "\${dir}"
  fi
done

if [ "\${INSTALLED_COUNT}" -eq 0 ]; then
  write_manifest "\${DIR_1}"
  write_manifest "\${DIR_2}"
fi

echo "完成！已安装零端口 Native Messaging 桥接（扩展 ID: \${EXTENSION_ID}）"
echo "Node 路径: \${NODE_BIN}"
echo "现在回到浏览器标签页，几秒内会自动变为「已连接」（无需重启电脑）。"
`;
}
function ne(e, t) {
  const o = J(e);
  if (/^'@/m.test(t)) throw new Error("Host source contains unsafe PowerShell terminator.");
  const r = F(o, "__HOST_RUNNER_PATH__");
  return `param(
  [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'
$HostName = '${M}'
$ExtensionId = '${o}'
$InstallDir = Join-Path $env:LOCALAPPDATA 'tab-project-native-host'
$HostScript = Join-Path $InstallDir 'tab-project-native-host.mjs'
$RunnerCmd = Join-Path $InstallDir 'run-host.cmd'
$ManifestFile = Join-Path $InstallDir "$HostName.json"
$RegPaths = @(
  "HKCU:\\Software\\Google\\Chrome\\NativeMessagingHosts\\$HostName",
  "HKCU:\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\$HostName",
  "HKCU:\\Software\\Chromium\\NativeMessagingHosts\\$HostName"
)

if ($Uninstall) {
  foreach ($reg in $RegPaths) {
    if (Test-Path $reg) { Remove-Item -Path $reg -Force }
  }
  if (Test-Path $InstallDir) { Remove-Item -Path $InstallDir -Recurse -Force }
  Write-Host "Uninstalled $HostName."
  exit 0
}

$NodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $NodeCmd) {
  Write-Error 'Node.js >= 20 is required but was not found in PATH.'
  exit 1
}
$NodeBin = $NodeCmd.Source
$NodeMajor = [int](& $NodeBin -p "process.versions.node.split('.')[0]")
if ($NodeMajor -lt 20) {
  Write-Error "Node.js >= 20 is required (found $NodeBin v$NodeMajor)."
  exit 1
}

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

$HostCode = @'
${t.trimEnd()}
'@
Set-Content -Path $HostScript -Value $HostCode -Encoding UTF8

$CmdContent = "@echo off\`r\`n\`"$NodeBin\`" \`"%~dp0tab-project-native-host.mjs\`" %*\`r\`n"
Set-Content -Path $RunnerCmd -Value $CmdContent -Encoding ASCII

$ManifestJson = @'
${r}
'@
$EscapedRunner = $RunnerCmd.Replace('\\', '\\\\')
$ManifestJson = $ManifestJson.Replace('__HOST_RUNNER_PATH__', $EscapedRunner)
Set-Content -Path $ManifestFile -Value $ManifestJson -Encoding UTF8

foreach ($reg in $RegPaths) {
  $parent = Split-Path $reg -Parent
  if (-not (Test-Path $parent)) { New-Item -Path $parent -Force | Out-Null }
  New-Item -Path $reg -Force | Out-Null
  Set-ItemProperty -Path $reg -Name '(Default)' -Value $ManifestFile
}

Write-Host "Installed $HostName for extension $ExtensionId using $NodeBin."
Write-Host "Return to the browser tab; it will connect automatically."
`;
}
function se(e) {
  const t = new Uint8Array(e.length * 2);
  for (let r = 0; r < e.length; r++) {
    const n = e.charCodeAt(r);
    t[r * 2] = n & 255, t[r * 2 + 1] = n >> 8 & 255;
  }
  let o = "";
  for (let r = 0; r < t.length; r++)
    o += String.fromCharCode(t[r]);
  return typeof btoa == "function" ? btoa(o) : Buffer.from(t).toString("base64");
}
function Ne(e, t) {
  const o = ne(e, t);
  return `@echo off\r
chcp 65001 >nul\r
powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand ${se(o)}\r
if errorlevel 1 (\r
  echo.\r
  echo 安装未完成，请确认已安装 Node.js 20 或以上版本。\r
  pause\r
  exit /b 1\r
)\r
echo.\r
echo 完成！现在可以直接回到浏览器查看连接状态。\r
pause\r
`;
}
const D = "nativeBridgeConfigV1", Ie = "nativeConversationsV1", ie = {
  defaultCwd: "",
  selectedAgentId: "pi",
  piModel: "",
  piThinking: "medium",
  piToolsEnabled: !0,
  acpProfiles: []
};
function G(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), o = [];
  for (const r of e) {
    if (!r || typeof r != "object") continue;
    const n = typeof r.id == "string" ? r.id.trim() : "", s = typeof r.name == "string" ? r.name.trim().slice(0, 60) : "", d = typeof r.command == "string" ? r.command.trim().slice(0, 300) : "";
    if (!(!n || !s || !d || t.has(n)) && (t.add(n), o.push({ id: n, name: s, command: d }), o.length >= 20))
      break;
  }
  return o;
}
async function ae() {
  if (typeof chrome > "u" || !chrome.storage?.local) return { ...ie };
  const e = (await chrome.storage.local.get(D))[D], t = typeof e?.piThinking == "string" && ["off", "minimal", "low", "medium", "high", "xhigh", "max"].includes(e.piThinking) ? e.piThinking : "medium";
  return {
    defaultCwd: typeof e?.defaultCwd == "string" ? e.defaultCwd.trim() : "",
    selectedAgentId: typeof e?.selectedAgentId == "string" && e.selectedAgentId.trim() ? e.selectedAgentId.trim() : "pi",
    piModel: typeof e?.piModel == "string" ? e.piModel.trim() : "",
    piThinking: t,
    piToolsEnabled: typeof e?.piToolsEnabled == "boolean" ? e.piToolsEnabled : !0,
    acpProfiles: G(e?.acpProfiles)
  };
}
async function _e(e) {
  const t = await ae(), o = {
    defaultCwd: typeof e.defaultCwd == "string" ? e.defaultCwd.trim() : t.defaultCwd,
    selectedAgentId: typeof e.selectedAgentId == "string" && e.selectedAgentId.trim() ? e.selectedAgentId.trim() : t.selectedAgentId,
    piModel: typeof e.piModel == "string" ? e.piModel.trim() : t.piModel,
    piThinking: e.piThinking ?? t.piThinking,
    piToolsEnabled: typeof e.piToolsEnabled == "boolean" ? e.piToolsEnabled : t.piToolsEnabled,
    acpProfiles: e.acpProfiles !== void 0 ? G(e.acpProfiles) : t.acpProfiles
  };
  return typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [D]: o }), o;
}
async function V() {
  if (typeof chrome > "u") return !1;
  if (typeof chrome.runtime?.sendNativeMessage == "function") return !0;
  if (!chrome.permissions?.contains) return !1;
  try {
    return !!await chrome.permissions.contains({ permissions: ["nativeMessaging"] });
  } catch {
    return !1;
  }
}
async function be() {
  if (typeof chrome > "u")
    throw new Error("当前环境不支持申请本机终端权限。");
  if (typeof chrome.runtime?.sendNativeMessage == "function" || await V()) return !0;
  if (!chrome.permissions?.request)
    throw new Error("当前环境不支持申请本机终端权限。");
  try {
    return !!await chrome.permissions.request({ permissions: ["nativeMessaging"] });
  } catch (e) {
    const t = e instanceof Error ? e.message : String(e || "");
    throw /Only permissions specified in the manifest/i.test(t) ? new Error("浏览器还未重新加载最新扩展配置：请打开扩展管理页（chrome://extensions 或 edge://extensions），点击本扩展的「刷新/重新加载」按钮后再试。") : e;
  }
}
function H(e) {
  const t = e instanceof Error ? e.message : String(e || "");
  return t === "UNSUPPORTED_CONTEXT" ? "当前浏览器（如 ego lite）未向扩展开放 Native Messaging 接口（chrome.runtime.sendNativeMessage 不可用）。建议在 Chrome / Edge 中使用，或改用本地环回桥接。" : /not found/i.test(t) ? "未检测到本机 Native Host：请先下载并在终端运行一次安装脚本，然后再试。" : /forbidden/i.test(t) ? "Native Host 拒绝了当前扩展 ID：请重新下载并运行安装脚本以匹配当前扩展 ID。" : /exited/i.test(t) ? "本机 Native Host 启动后异常退出，请确认本机已安装 Node.js >= 20。" : /Unsupported action: (pi_models|pi_run|agent_models|agent_run)/i.test(t) ? "本机桥接脚本版本较旧，尚未包含多 Agent / ACP 支持：请在设置页「高级选项」重新下载并运行一次安装脚本升级即可。" : t || "无法连接到本机 Native Host。";
}
async function v(e) {
  if (typeof chrome > "u")
    throw new Error("当前浏览器上下文不支持扩展 Native Messaging。");
  if (!await V())
    throw new Error("尚未授予 nativeMessaging 权限，请先在扩展管理页重新加载本扩展并授权。");
  const o = {
    id: typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ...e
  };
  try {
    let r;
    if (typeof chrome.runtime?.sendNativeMessage == "function")
      r = await chrome.runtime.sendNativeMessage(M, o);
    else if (typeof chrome.runtime?.sendMessage == "function") {
      const n = await Q(
        {
          type: "native-bridge:send",
          hostName: M,
          payload: o
        },
        { throwOnError: !0 }
      );
      if (!n?.ok)
        throw new Error(n?.error || "UNSUPPORTED_CONTEXT");
      r = n.response;
    } else
      throw new Error("UNSUPPORTED_CONTEXT");
    if (!r || typeof r != "object")
      throw new Error("本机 Native Host 未返回有效响应。");
    return r;
  } catch (r) {
    throw new Error(H(r));
  }
}
async function ke() {
  const e = await v({ action: "ping" });
  if (!e.ok)
    throw new Error(e.error || "Native Host 心跳校验失败。");
  return e;
}
async function Me() {
  const e = await v({ action: "agent_models", agentId: "pi" });
  if (!e.ok)
    throw new Error(H(e.error || "读取 pi 模型列表失败。"));
  return Array.isArray(e.models) ? e.models : [];
}
async function ve(e) {
  const t = e.prompt.trim();
  if (!t) throw new Error("消息内容不能为空。");
  const o = await v({
    action: "agent_run",
    agentId: e.agentId || "pi",
    ...e.acpCommand ? { acpCommand: e.acpCommand } : {},
    ...e.agentName ? { agentName: e.agentName } : {},
    prompt: t,
    ...e.cwd ? { cwd: e.cwd } : {},
    ...e.sessionId ? { sessionId: e.sessionId } : {},
    ...e.externalSessionId ? { externalSessionId: e.externalSessionId } : {},
    ...e.model ? { model: e.model } : {},
    ...e.thinking ? { thinking: e.thinking } : {},
    toolsEnabled: e.toolsEnabled !== !1,
    ...e.timeoutMs ? { timeoutMs: e.timeoutMs } : {}
  });
  if (!o.ok)
    throw new Error(H(o.error || (o.timedOut ? "本机 Agent 执行超时，请缩小任务或重试。" : "本机 Agent 执行失败。")));
  return o;
}
async function Ae(e, t) {
  const o = await v({
    action: "check_dir",
    path: e,
    ...t ? { baseCwd: t } : {}
  });
  if (!o.ok || !o.cwd) throw new Error(o.error || "目录不存在或不可访问。");
  return o.cwd;
}
async function Oe(e, t = {}) {
  const o = e.trim();
  if (!o) throw new Error("命令不能为空。");
  const r = await v({
    action: "exec",
    command: o,
    ...t.cwd ? { cwd: t.cwd } : {},
    ...t.timeoutMs ? { timeoutMs: t.timeoutMs } : {}
  });
  if (r.error && r.exitCode === void 0)
    throw new Error(r.error);
  return r;
}
const z = Z({ pending: null });
let W = 0;
function Te(e, t, o) {
  z.pending = { id: ++W, kind: "draft", text: e, resource: t, target: o };
}
function Se(e, t) {
  z.pending = { id: ++W, kind: e, conversationId: t };
}
export {
  fe as A,
  oe as B,
  x as C,
  N as D,
  I as E,
  me as F,
  ue as G,
  he as H,
  Ie as N,
  U as O,
  ae as a,
  j as b,
  Se as c,
  ge as d,
  we as e,
  ye as f,
  D as g,
  ve as h,
  _e as i,
  V as j,
  Me as k,
  de as l,
  Ae as m,
  Oe as n,
  z as o,
  ke as p,
  $e as q,
  Te as r,
  ee as s,
  Ne as t,
  Ee as u,
  be as v,
  L as w,
  S as x,
  pe as y,
  B as z
};
