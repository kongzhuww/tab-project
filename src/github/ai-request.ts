import { readGitHubJson, GitHubReadError } from "./api-client";
import type { GitHubAiConfig } from "../services/github.service";

// One attempt only. Timeout covers both headers and the complete bounded body.
async function boundedAiJson(url: string, init: RequestInit, maxBytes: number, timeoutMs: number, parent?: AbortSignal): Promise<any> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  parent?.addEventListener("abort", abort, { once: true });
  if (parent?.aborted) controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  try {
    controller.signal.throwIfAborted();
    const response = await fetch(url, { ...init, signal: controller.signal, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer", cache: "no-store" });
    if (!response.ok) {
      void response.body?.cancel().catch(() => undefined);
      throw new Error(`HTTP ${response.status}`);
    }
    if (!response.body) throw new Error("Empty response");
    const reader = response.body.getReader();
    try {
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        controller.signal.throwIfAborted();
        const part = await reader.read();
        if (part.done) break;
        size += part.value.byteLength;
        if (size > maxBytes) throw new Error("Response exceeds limit");
        chunks.push(part.value);
      }
      controller.signal.throwIfAborted();
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    } finally {
      void reader.cancel().catch(() => undefined);
      reader.releaseLock();
    }
  } finally {
    clearTimeout(timer);
    parent?.removeEventListener("abort", abort);
  }
}

export async function readAiReadme(fullName: string, headers: Record<string, string>, signal?: AbortSignal): Promise<string> {
  if (!/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(fullName)) throw new Error("仓库名称无效，没有读取 README。");
  try {
    const { data } = await readGitHubJson<any>(`/repos/${fullName}/readme`, { headers, maxBytes: 1572864, timeoutMs: 15000, signal });
    if (data?.encoding !== "base64" || typeof data.content !== "string" || data.content.length > 1450000) throw new Error("Invalid README");
    const binary = atob(data.content.replace(/\s/g, ""));
    if (binary.length > 1048576) throw new Error("README exceeds limit");
    const text = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(binary, character => character.charCodeAt(0)));
    if (!text.trim()) throw new Error("Empty README");
    return text;
  } catch (error) {
    signal?.throwIfAborted();
    throw new Error((error instanceof GitHubReadError ? error.message : "README 格式无效、为空或超过1MiB。") + " 没有转发给第三方，也没有提交 AI 请求。");
  }
}

export async function requestGitHubAi(config: GitHubAiConfig, prompt: string, test = false, signal?: AbortSignal, onSubmit?: () => void): Promise<string> {
  const cfg = { ...config };
  if ([cfg.apiKey, cfg.baseUrl, cfg.model, cfg.provider].some(value => typeof value !== "string")) throw new Error("AI 配置字段格式异常，没有提交请求。");
  const key = cfg.apiKey.trim();
  if (!key) throw new Error("请在 GitHub 右上角设置中配置 AI 服务；没有提交请求。");
  if (!["gemini", "openrouter", "deepseek", "openai"].includes(cfg.provider)) throw new Error("不支持的 AI 服务类型，没有提交请求。");
  if (prompt.length > 60000) throw new Error("提示词超过60000字符，没有提交请求。");
  if (cfg.provider === "openai" && !cfg.baseUrl.trim()) throw new Error("OpenAI 兼容服务须明确填写节点地址，没有自动选择供应商。");
  const defaultBase = cfg.provider === "gemini" ? "https://generativelanguage.googleapis.com/v1beta" : cfg.provider === "deepseek" ? "https://api.deepseek.com" : "https://openrouter.ai/api/v1";
  let base: URL;
  try { base = new URL(cfg.baseUrl.trim() || defaultBase); } catch { throw new Error("AI 节点地址无效，没有提交请求。"); }
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname);
  if ((base.protocol !== "https:" && !(base.protocol === "http:" && loopback)) || base.username || base.password || base.search || base.hash) {
    throw new Error("AI 节点须使用 HTTPS（本机回环可用 HTTP），且不能含账号、查询参数或片段；没有提交请求。");
  }
  const knownProviders: Record<string, string> = { "generativelanguage.googleapis.com": "gemini", "api.deepseek.com": "deepseek", "openrouter.ai": "openrouter", "api.openai.com": "openai" };
  if (knownProviders[base.hostname] && knownProviders[base.hostname] !== cfg.provider && !(cfg.provider === "openai" && knownProviders[base.hostname] !== "gemini")) throw new Error("节点与所选供应商不匹配，请先检查设置；没有提交请求。");
  const model = cfg.model.trim();
  if (!model) throw new Error("请填写模型名称，没有提交请求。");
  const endpoint = base.href.replace(/\/$/, "");
  const gemini = cfg.provider === "gemini";
  const url = gemini ? `${endpoint}/models/${encodeURIComponent(model)}:generateContent` : endpoint.endsWith("/chat/completions") ? endpoint : `${endpoint}/chat/completions`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (gemini) headers["x-goog-api-key"] = key;
  else headers.Authorization = `Bearer ${key}`;
  signal?.throwIfAborted();
  try {
    onSubmit?.();
    const data = await boundedAiJson(url, { method: "POST", headers, body: JSON.stringify(gemini ? {
      contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3, maxOutputTokens: test ? 32 : 2048, ...(test ? {} : { responseMimeType: "application/json" }) }
    } : {
      model, messages: [{ role: "user", content: prompt }], temperature: 0.3, max_tokens: test ? 32 : 2048,
      ...(test ? {} : { response_format: { type: "json_object" } })
    }) }, 262144, test ? 15000 : 45000, signal);
    const text = gemini ? data?.candidates?.[0]?.content?.parts?.map((part: any) => typeof part?.text === "string" ? part.text : "").join("") : data?.choices?.[0]?.message?.content;
    if (typeof text !== "string" || !text.trim() || text.length > 16000) throw new Error("Invalid output");
    return text;
  } catch {
    throw new Error("AI 请求或响应未确认（网络、取消、超时、HTTP异常或响应格式/大小限制）；可能已执行或计费。未自动重试，请先核对服务端记录。");
  }
}

export function parseGitHubAiOutput(text: string): { summary: string; tags: string[]; platforms: string[] } {
  try {
    const parsed = JSON.parse(text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, ""));
    const validStrings = (value: unknown): value is string[] => Array.isArray(value) && value.length <= 20 && value.every(item => typeof item === "string" && item.length <= 100);
    const allowed = ["web", "cli", "windows", "mac", "linux", "docker", "ios", "android"];
    if (typeof parsed?.summary !== "string" || !parsed.summary.trim() || parsed.summary.length > 2000 || !validStrings(parsed.tags) || !validStrings(parsed.platforms) || parsed.platforms.some((value: string) => !allowed.includes(value.toLowerCase()))) throw new Error("Invalid schema");
    return { summary: parsed.summary.trim(), tags: [...new Set(parsed.tags.map((item: string) => item.trim()).filter(Boolean))].slice(0, 5) as string[], platforms: [...new Set(parsed.platforms.map((item: string) => item.toLowerCase()))] as string[] };
  } catch {
    throw new Error("AI 已返回内容，但结果不是有效简介 JSON；没有保存伪造摘要。请求可能已计费，不会自动重试。");
  }
}
