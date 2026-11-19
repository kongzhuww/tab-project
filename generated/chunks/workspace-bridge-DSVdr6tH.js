import { r as G } from "./vendor-vue-BbmU9NUg.js";
const S = [
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
function q(t) {
  return S.find((e) => e.id === t) || S[0];
}
function j(t) {
  return t === "deepseek-flash" || t === "deepseek-v4-pro" || t === "deepseek-reasoner";
}
const z = /^[a-zA-Z0-9._:/@-]{1,160}$/;
function U(t) {
  return typeof t == "string" && z.test(t.trim());
}
function x(t) {
  const e = t.toLowerCase();
  if (e === "localhost" || e === "127.0.0.1" || e === "[::1]" || e === "::1" || e.endsWith(".local") || /^10\.\d+\.\d+\.\d+$/.test(e) || /^192\.168\.\d+\.\d+$/.test(e)) return !0;
  const o = /^172\.(\d+)\.\d+\.\d+$/.exec(e);
  if (o) {
    const r = Number(o[1]);
    if (r >= 16 && r <= 31) return !0;
  }
  return !1;
}
function A(t) {
  try {
    const e = new URL(t);
    return x(e.hostname);
  } catch {
    return !1;
  }
}
function O(t) {
  const e = String(t || "").trim();
  if (!e) throw new Error("请填写接口地址（Base URL）。");
  let o;
  try {
    o = new URL(e);
  } catch {
    throw new Error("接口地址格式无效，请以 https:// 或 http://localhost 开头。");
  }
  if (o.username || o.password || o.search || o.hash)
    throw new Error("接口地址不能包含账号密码或查询参数。");
  if (o.protocol === "http:") {
    if (!x(o.hostname))
      throw new Error("远程接口请使用 https:// 安全连接（本机或局域网服务可使用 http://）。");
  } else if (o.protocol !== "https:")
    throw new Error("接口地址仅支持 https:// 或本机 http:// 协议。");
  let r = o.pathname.replace(/\/+$/, "");
  return r.endsWith("/chat/completions") ? r = r.slice(0, -17) : r.endsWith("/models") && (r = r.slice(0, -7)), `${o.origin}${r}`;
}
function T(t, e) {
  return t === "ollama" || t === "lmstudio" || t === "custom" ? !1 : !A(e);
}
const g = "byokConfigV1", H = "byokConversationsV1", L = H, w = () => chrome.storage.local;
function P(t) {
  return Array.isArray(t) ? t.map((e) => typeof e == "string" ? e.trim() : "").filter(U).slice(0, 200) : [];
}
async function J() {
  const t = (await w().get(g))[g], e = t?.openaiCompat, o = t?.deepseek;
  if (e && typeof e == "object" && typeof e.baseUrl == "string" && e.baseUrl) {
    const n = q(e.presetId), i = n.id === e.presetId ? n.id : "custom";
    let s = n.baseUrl || "https://api.deepseek.com";
    try {
      s = O(e.baseUrl);
    } catch {
    }
    const k = typeof e.key == "string" ? e.key : "", d = P(e.models), u = U(e.model) ? e.model.trim() : n.defaultModel || "deepseek-flash", p = typeof e.label == "string" && e.label.trim() ? e.label.trim().slice(0, 40) : n.name, f = T(i, s);
    return { presetId: i, label: p, baseUrl: s, key: k, model: u, models: d, requiresKey: f, configured: !!(s && u && (!f || k)) };
  }
  const r = typeof o?.key == "string" ? o.key : "", c = P(o?.models), a = U(o?.model) ? o.model.trim() : "deepseek-flash";
  return {
    presetId: "deepseek",
    label: "DeepSeek",
    baseUrl: "https://api.deepseek.com",
    key: r,
    model: a,
    models: c,
    requiresKey: !0,
    configured: !!r
  };
}
async function Q(t, e, o) {
  const r = typeof t == "string" ? { presetId: "deepseek", label: "DeepSeek", baseUrl: "https://api.deepseek.com", key: t, model: "", models: o } : t, c = q(r.presetId), a = r.presetId && c.id === r.presetId ? c.id : r.baseUrl ? "custom" : "deepseek", h = typeof r.baseUrl == "string" ? r.baseUrl : c.baseUrl, n = O(h), i = T(a, n), s = (r.key || "").trim();
  if (i && !s)
    throw new Error(`请填写有效的 ${c.name} API Key，不能包含空格或换行。`);
  if (s && !/^[\x21-\x7e]{1,512}$/.test(s))
    throw new Error("API Key 格式无效，不能包含空格或换行。");
  const k = (r.model || "").trim();
  if (!U(k))
    throw new Error("模型名称格式无效。");
  const d = (await w().get(g))[g], u = d?.openaiCompat, p = d?.deepseek, f = typeof u?.key == "string" ? u.key : typeof p?.key == "string" ? p.key : "", I = typeof u?.baseUrl == "string" ? u.baseUrl : "https://api.deepseek.com", m = u?.models ?? p?.models, M = f === s && I === n && Array.isArray(m) ? m : [], E = P(r.models ?? M), $ = typeof r.label == "string" && r.label.trim() ? r.label.trim().slice(0, 40) : c.id === a && a !== "custom" ? c.name : (() => {
    try {
      return new URL(n).host;
    } catch {
      return "自定义模型";
    }
  })(), l = {
    ...d && typeof d == "object" ? d : {},
    openaiCompat: { presetId: a, label: $, baseUrl: n, key: s, model: k, models: E }
  };
  a === "deepseek" ? l.deepseek = { key: s, model: k, models: E } : delete l.deepseek, await w().set({ [g]: l });
}
async function Y(t) {
  const e = O(t.baseUrl || "https://api.deepseek.com"), o = (t.label || "").trim() || "模型服务", r = (t.key || "").trim();
  if ((t.requiresKey ?? !A(e)) && !/^[\x21-\x7e]{1,512}$/.test(r))
    throw new Error(`请先填写有效的 ${o} API Key。`);
  if (r && !/^[\x21-\x7e]{1,512}$/.test(r))
    throw new Error("API Key 格式无效，不能包含空格或换行。");
  let a;
  try {
    a = await fetch(`${e}/models`, {
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
    throw A(e) ? new Error(`无法连接 ${o}（${e}）。请确认本地服务已启动，若用 Ollama 请配置 OLLAMA_ORIGINS="*" 后重启。`) : new Error(`无法连接 ${o} 获取模型，请检查接口地址与网络后重试。`);
  }
  if (!a.ok)
    throw a.body?.cancel().catch(() => {
    }), a.status === 401 ? new Error(`${o} API Key 无效或已过期（401）。`) : a.status === 403 && A(e) ? new Error(`${o} 拒绝了扩展请求（403）：请设置环境变量 OLLAMA_ORIGINS="*" 后重启本机服务。`) : new Error(`获取 ${o} 模型失败（HTTP ${a.status}），也可手动输入模型 ID 后直接保存。`);
  let h;
  try {
    h = await a.json();
  } catch {
    throw new Error(`${o} 返回的模型列表格式无效。`);
  }
  const n = Array.isArray(h?.data) ? h.data : Array.isArray(h?.models) ? h.models : null;
  if (!n) throw new Error(`${o} 返回的模型列表格式无效。`);
  const i = [...new Set(
    n.map((s) => s?.id ?? s?.name).filter(U).map((s) => s.trim())
  )].slice(0, 200);
  if (!i.length) throw new Error(`${o} 未返回可用模型，请手动输入模型 ID。`);
  return i;
}
async function F() {
  const t = (await w().get(g))[g], e = { ...t && typeof t == "object" ? t : {} };
  delete e.deepseek, delete e.openaiCompat, await w().set({ [g]: e });
}
async function C() {
  const t = (await w().get(L))[L];
  return Array.isArray(t) ? t.filter((e) => e && e.provider === "deepseek" && typeof e.id == "string" && Array.isArray(e.messages)) : [];
}
async function R(t) {
  return typeof navigator < "u" && navigator.locks ? navigator.locks.request("tab-project:byok-history", t) : t();
}
async function Z(t) {
  await R(async () => {
    const e = await C(), o = JSON.parse(JSON.stringify(t));
    if (e.length >= 50 && !e.some((r) => r.id === o.id)) throw new Error("本机会话已达 50 条，请先删除不需要的会话。");
    await w().set({ [L]: [o, ...e.filter((r) => r.id !== o.id)] });
  });
}
async function X(t) {
  await R(async () => {
    await w().set({ [L]: (await C()).filter((e) => e.id !== t) });
  });
}
function V(t, e, o) {
  throw o === 401 ? new Error(`${t} API Key 无效或已过期（401）。`) : o === 402 ? new Error(`${t} 余额不足（402），请检查账户额度。`) : o === 403 && A(e) ? new Error(`${t} 拒绝了扩展请求（403）：请设置 OLLAMA_ORIGINS="*" 后重启本机服务。`) : o === 429 ? new Error(`${t} 请求过于频繁（429），请稍后再试。`) : new Error(`${t} 请求失败（HTTP ${o}），请检查模型名称、余额或网络。`);
}
async function ee(t, e, o, r, c, a, h) {
  const n = O(t.baseUrl || "https://api.deepseek.com"), i = (t.label || "").trim() || "模型服务", s = (t.key || "").trim();
  if ((t.requiresKey ?? !A(n)) && !/^[\x21-\x7e]{1,512}$/.test(s))
    throw new Error(`请先在设置中填写有效的 ${i} API Key。`);
  if (s && !/^[\x21-\x7e]{1,512}$/.test(s))
    throw new Error("API Key 格式无效，不能包含空格或换行。");
  const d = (e || "").trim();
  if (!U(d)) throw new Error("模型名称格式无效。");
  const u = o.filter((l) => !l.incomplete && (l.role === "user" || l.role === "assistant")).map((l) => ({ role: l.role, content: l.content })), p = await fetch(`${n}/chat/completions`, {
    method: "POST",
    headers: {
      ...s ? { Authorization: `Bearer ${s}` } : {},
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: JSON.stringify({
      model: d,
      messages: u,
      stream: !0,
      ...j(d) && a && ["none", "low", "high", "max"].includes(a) ? { reasoning_effort: a } : {}
    }),
    signal: r,
    credentials: "omit",
    redirect: "error",
    referrerPolicy: "no-referrer",
    cache: "no-store"
  });
  if (p.ok || (p.body?.cancel().catch(() => {
  }), V(i, n, p.status)), !p.body) throw new Error(`${i} 未返回回复流。`);
  const f = p.body.getReader(), I = new TextDecoder();
  let m = "", M = !1, E = 0;
  const $ = (l) => {
    const b = l.split(`
`).filter((y) => y.startsWith("data:")).map((y) => y.slice(5).trimStart()).join(`
`);
    if (!b) return;
    if (b.trim() === "[DONE]") {
      M = !0;
      return;
    }
    let K;
    try {
      K = JSON.parse(b);
    } catch {
      throw new Error(`${i} 回复流格式异常。`);
    }
    if (K.error) throw new Error(`${i} 回复流出现错误，请检查模型或账户后重试。`);
    const v = K?.choices?.[0]?.delta, _ = v?.reasoning_content ?? v?.reasoning;
    for (const [y, N] of [[v?.content, c], [_, h]])
      if (typeof y == "string" && y) {
        if (E += y.length, E > 1e6) throw new Error("回复过长，已停止接收。");
        N?.(y);
      }
  };
  try {
    for (; !M; ) {
      const l = await f.read();
      m += I.decode(l.value, { stream: !l.done }).replace(/\r\n/g, `
`);
      let b;
      for (; (b = m.indexOf(`

`)) >= 0; ) {
        const K = m.slice(0, b);
        m = m.slice(b + 2), $(K);
      }
      if (m.length > 2e6) throw new Error(`${i} 回复流过大。`);
      if (l.done) break;
    }
    if (!M) throw new Error("回复连接提前中断，内容可能不完整；请求可能已计费。");
  } finally {
    f.cancel().catch(() => {
    }), f.releaseLock();
  }
}
const D = G({ pending: null });
let B = 0;
function te(t, e) {
  D.pending = { id: ++B, kind: "draft", text: t, resource: e };
}
function oe(t, e) {
  D.pending = { id: ++B, kind: t, conversationId: e };
}
export {
  H as B,
  S as O,
  oe as a,
  J as b,
  Z as c,
  X as d,
  ee as e,
  D as f,
  Y as g,
  T as h,
  Q as i,
  q as j,
  A as k,
  C as l,
  U as m,
  O as n,
  F as o,
  te as r,
  j as s
};
