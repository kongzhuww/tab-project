import { loadGitHubAccountSettings } from "./account-settings";

export type GitHubReadFailure = "account" | "auth" | "rate" | "forbidden" | "not-found" | "http" | "size" | "format" | "timeout" | "network" | "endpoint";
export class GitHubReadError extends Error {
  constructor(public readonly kind: GitHubReadFailure, message: string, public readonly status?: number) {
    super(message); this.name = "GitHubReadError";
  }
  get retryable(): boolean { return this.kind === "network" || this.kind === "timeout" || (this.kind === "http" && (this.status || 0) >= 500); }
}
export interface GitHubReadOptions {
  // Required: callers deliberately choose a saved/draft snapshot or anonymous headers.
  headers: Readonly<Record<string, string>>;
  signal?: AbortSignal;
  timeoutMs?: number;
  maxBytes?: number;
  acceptedStatuses?: readonly number[];
}
export interface GitHubReadMetadata {
  status: number;
  link: string;
  rateLimit: { limit?: number; remaining?: number; resetAt?: number };
}
export interface GitHubJsonResult<T> extends GitHubReadMetadata { data: T }

export function createGitHubReadHeaders(token = ""): Record<string, string> {
  const value = token.trim();
  if (value && !/^[!-~]{1,4096}$/.test(value)) throw new GitHubReadError("auth", "GitHub Token 格式异常，请在 github插件设置中检查。");
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (value) headers.Authorization = `Bearer ${value}`;
  return headers;
}

export async function loadGitHubReadHeaders(parent: AbortSignal): Promise<Record<string, string>> {
  parent.throwIfAborted();
  const signal = AbortSignal.any([parent, AbortSignal.timeout(10000)]);
  try {
    const account = await new Promise<Awaited<ReturnType<typeof loadGitHubAccountSettings>>>((resolve, reject) => {
      const abort = () => reject(signal.reason);
      signal.addEventListener("abort", abort, { once: true });
      void loadGitHubAccountSettings().then(
        value => { signal.removeEventListener("abort", abort); resolve(value); },
        error => { signal.removeEventListener("abort", abort); reject(error); }
      );
    });
    signal.throwIfAborted();
    return createGitHubReadHeaders(account.ghToken);
  } catch (error) {
    parent.throwIfAborted();
    if (error instanceof GitHubReadError) throw error;
    throw new GitHubReadError("account", "GitHub 账号设置读取失败或超过10秒，未改用匿名请求；请检查浏览器存储后重读。");
  }
}

function apiUrl(path: string): string {
  let url: URL;
  try { url = new URL(path, "https://api.github.com"); }
  catch { throw new GitHubReadError("endpoint", "GitHub 请求地址无效，没有发送凭据。"); }
  if (url.origin !== "https://api.github.com" || url.username || url.password || url.hash ||
      [...url.searchParams.keys()].some(key => /^(?:access_token|token|client_secret|authorization)$/i.test(key))) {
    throw new GitHubReadError("endpoint", "只允许向固定 GitHub API 发起不含 URL 凭据的读取请求。");
  }
  return url.href;
}
function snapshotHeaders(input: Readonly<Record<string, string>>): Record<string, string> {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new GitHubReadError("auth", "GitHub 读取必须明确选择鉴权或匿名请求头。");
  const headers = new Headers(input);
  const authorization = headers.get("authorization") || "";
  if (authorization && !authorization.startsWith("Bearer ")) throw new GitHubReadError("auth", "GitHub 鉴权格式异常，没有发送请求。");
  const result = createGitHubReadHeaders(authorization.slice(7));
  const accept = headers.get("accept");
  if (accept) result.Accept = accept;
  // Do not forward Cookie, arbitrary headers or credentials to any other domain.
  return result;
}
function metadata(response: Response): GitHubReadMetadata {
  const number = (key: string) => {
    const value = response.headers.get(key), parsed = Number(value);
    return value !== null && Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : undefined;
  };
  const reset = number("x-ratelimit-reset");
  return { status: response.status, link: response.headers.get("link") || "",
    rateLimit: { limit: number("x-ratelimit-limit"), remaining: number("x-ratelimit-remaining"), resetAt: reset === undefined ? undefined : reset * 1000 } };
}
function httpFailure(response: Response, authenticated: boolean): GitHubReadError {
  const status = response.status;
  if (status === 401) return new GitHubReadError("auth", authenticated ? "GitHub Token 无效或已过期，请在 github插件设置中检查。" : "GitHub 要求身份验证，请检查账号设置。", status);
  if (status === 429 || (status === 403 && response.headers.get("x-ratelimit-remaining") === "0")) {
    const reset = metadata(response).rateLimit.resetAt;
    const time = reset && reset > Date.now() && reset < Date.now() + 86400000 ? `，预计 ${new Date(reset).toLocaleTimeString()} 后可重读` : "，请稍后重读";
    return new GitHubReadError("rate", (authenticated ? "已使用配置的 Token，但 GitHub API 额度或请求频率受限" : "未使用 Token，当前网络出口的 GitHub 匿名 API 额度或请求频率受限") + time + "。", status);
  }
  if (status === 403) return new GitHubReadError("forbidden", "GitHub 拒绝访问（403），请检查 Token 的仓库权限、组织 SSO 或访问限制。", status);
  if (status === 404) return new GitHubReadError("not-found", "GitHub 未找到该资源（404），也可能是当前 Token 没有访问权限。", status);
  return new GitHubReadError("http", `GitHub 返回 HTTP ${status}，请稍后重读或到 GitHub 查看。`, status);
}

// GET only, one attempt. Session ownership, domain schemas and retry policy stay with callers.
async function request<T>(path: string, options: GitHubReadOptions, json: boolean): Promise<GitHubJsonResult<T>> {
  options.signal?.throwIfAborted();
  const url = apiUrl(path);
  let headers: Record<string, string>;
  try { headers = snapshotHeaders(options.headers); }
  catch (error) { if (error instanceof GitHubReadError) throw error; throw new GitHubReadError("auth", "GitHub 请求头格式异常，没有发送请求。"); }
  const timeoutMs = options.timeoutMs ?? 15000, maxBytes = options.maxBytes ?? 4 * 1024 * 1024;
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000 || !Number.isInteger(maxBytes) || maxBytes < 1 || maxBytes > 8 * 1024 * 1024) {
    throw new GitHubReadError("format", "GitHub 读取预算无效，没有发送请求。");
  }
  const controller = new AbortController();
  const abort = () => controller.abort();
  options.signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(abort, timeoutMs);
  try {
    const response = await fetch(url, { method: "GET", headers, signal: controller.signal, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer", cache: "no-store" });
    if (!response.ok && !options.acceptedStatuses?.includes(response.status)) {
      void response.body?.cancel().catch(() => undefined);
      throw httpFailure(response, Boolean(headers.Authorization));
    }
    const info = metadata(response);
    if (!json || response.status === 204) {
      void response.body?.cancel().catch(() => undefined); controller.signal.throwIfAborted();
      return { ...info, data: undefined as T };
    }
    if (Number(response.headers.get("content-length")) > maxBytes) {
      void response.body?.cancel().catch(() => undefined);
      throw new GitHubReadError("size", `GitHub 响应超过 ${maxBytes} 字节上限，已停止读取。`);
    }
    if (!response.body) throw new GitHubReadError("format", "GitHub 返回空响应，请重读。");
    const reader = response.body.getReader(), decoder = new TextDecoder("utf-8", { fatal: true });
    let size = 0, text = "";
    try {
      for (;;) {
        controller.signal.throwIfAborted();
        const part = await reader.read();
        if (part.done) break;
        size += part.value.byteLength;
        if (size > maxBytes) throw new GitHubReadError("size", `GitHub 响应超过 ${maxBytes} 字节上限，已停止读取。`);
        try { text += decoder.decode(part.value, { stream: true }); }
        catch { throw new GitHubReadError("format", "GitHub 响应不是有效的 UTF-8 文本。"); }
      }
      controller.signal.throwIfAborted();
      try { return { ...info, data: JSON.parse(text + decoder.decode()) as T }; }
      catch { throw new GitHubReadError("format", "GitHub 响应不是有效的 UTF-8 JSON。"); }
    } finally { void reader.cancel().catch(() => undefined); reader.releaseLock(); }
  } catch (error) {
    options.signal?.throwIfAborted();
    if (error instanceof GitHubReadError) throw error;
    if (controller.signal.aborted) throw new GitHubReadError("timeout", `GitHub 请求超过 ${timeoutMs / 1000} 秒，已停止读取。`);
    throw new GitHubReadError("network", "无法连接 GitHub API，或请求遇到被禁止的重定向；请检查网络后重读。");
  } finally { clearTimeout(timer); options.signal?.removeEventListener("abort", abort); }
}
export function readGitHubJson<T = unknown>(path: string, options: GitHubReadOptions): Promise<GitHubJsonResult<T>> { return request<T>(path, options, true); }
export async function readGitHubStatus(path: string, options: GitHubReadOptions): Promise<GitHubReadMetadata> {
  const { data: _data, ...info } = await request<never>(path, options, false);
  return info;
}
