import { GitHubReadError as GitHubDetailReadError, readGitHubJson, loadGitHubReadHeaders } from "./api-client";
export { GitHubReadError as GitHubDetailReadError } from "./api-client";

async function readDetailJson(path: string, signal: AbortSignal, headers: Record<string, string>): Promise<any> {
  return (await readGitHubJson("/repos/" + path, { headers, signal, timeoutMs: 12000, maxBytes: 2 * 1024 * 1024 })).data;
}

function decodeReadme(data: any): { markdown: string; path: string } {
  if (data?.encoding !== "base64" || typeof data.content !== "string" || typeof data.path !== "string" || data.content.length > 1500000) throw new GitHubDetailReadError("format", "README 格式不支持或正文超过读取上限，请到 GitHub 查看。");
  try {
    const bytes = Uint8Array.from(atob(data.content.replace(/\s/g, "")), char => char.charCodeAt(0));
    if (bytes.length > 1048576) throw new GitHubDetailReadError("size", "README 超过 1 MiB，请到 GitHub 查看。");
    return { markdown: new TextDecoder("utf-8", { fatal: true }).decode(bytes), path: data.path };
  } catch (error) {
    if (error instanceof GitHubDetailReadError) throw error;
    throw new GitHubDetailReadError("format", "README 编码不是有效的 Base64 / UTF-8，请到 GitHub 查看。");
  }
}

function localChineseLink(markdown: string, readmePath: string): string | undefined {
  const match = markdown.match(/\[[^\]\n]*(?:中文|简体|Chinese)[^\]\n]*\]\(([^\s)]+\.md)(?:[?#][^\s)]*)?\)/i);
  if (!match) return;
  const target = match[1];
  if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(target)) return;
  const base = new URL(readmePath, "https://readme.invalid/");
  const url = new URL(target, base);
  if (url.origin !== base.origin) return;
  return decodeURIComponent(url.pathname.slice(1));
}

/**
 * 尝试通过 GitHub 官方 application/vnd.github.html+json 管道拉取预渲染的权威 HTML
 */
async function fetchOfficialReadmeHtml(
  owner: string,
  repo: string,
  filePath: string,
  branch: string,
  headers: Record<string, string>,
  signal: AbortSignal
): Promise<string> {
  try {
    const prefix = `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
    const ref = branch ? `?ref=${encodeURIComponent(branch)}` : "";
    let url: string;
    // 关键修复：只有明确是根目录默认 readme.md 时才用 /readme 端点；任何中文或指定路径文件均请求 contents/{path}
    if (filePath && filePath.toLowerCase() !== "readme.md") {
      url = `https://api.github.com/repos/${prefix}/contents/${filePath.split("/").map(encodeURIComponent).join("/")}${ref}`;
    } else {
      url = `https://api.github.com/repos/${prefix}/readme${ref}`;
    }

    const res = await fetch(url, {
      method: "GET",
      signal,
      cache: "no-store",
      headers: {
        ...headers,
        Accept: "application/vnd.github.html+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 30) {
        return text;
      }
    }
  } catch {}
  return "";
}

/**
 * 备选：通过 GitHub 官方 POST /markdown 接口携带仓库上下文完成权威渲染
 */
async function renderWithOfficialMarkdown(
  text: string,
  context: string,
  headers: Record<string, string>,
  signal: AbortSignal
): Promise<string> {
  if (!text) return "";
  try {
    const res = await fetch("https://api.github.com/markdown", {
      method: "POST",
      signal,
      cache: "no-store",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ text, mode: "gfm", context }),
    });
    if (res.ok) {
      const html = await res.text();
      if (html && html.trim().length > 30) {
        return html;
      }
    }
  } catch {}
  return "";
}

export async function readRepositoryDocument(owner: string, repo: string, signal: AbortSignal) {
  const headers = await loadGitHubReadHeaders(signal);
  const read = (path: string) => readDetailJson(path, signal, headers);
  const prefix = `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  let metadata: any = null;
  let notice = "";
  try { metadata = await read(prefix); }
  catch (error) {
    signal.throwIfAborted();
    if (error instanceof GitHubDetailReadError && ["auth", "rate", "forbidden"].includes(error.kind)) throw error;
    notice = "仓库元数据未刷新，概览可能来自列表快照。";
  }
  const ref = typeof metadata?.default_branch === "string" ? `?ref=${encodeURIComponent(metadata.default_branch)}` : "";
  const original = await read(`${prefix}/readme${ref}`);
  signal.throwIfAborted();
  let document = decodeReadme(original);
  let branch = typeof metadata?.default_branch === "string" ? metadata.default_branch : "";
  // The README response identifies its branch even when metadata was unavailable.
  if (!branch && typeof original.html_url === "string") {
    const marker = `https://github.com/${owner}/${repo}/blob/`;
    const decoded = decodeURI(original.html_url);
    const suffix = `/${document.path}`;
    if (decoded.startsWith(marker) && decoded.endsWith(suffix)) branch = decoded.slice(marker.length, -suffix.length);
  }
  if (!branch) throw new GitHubDetailReadError("format", "无法确认 README 分支，请到 GitHub 查看。");
  let isZh = /(?:^|[/_.-])(?:zh(?:[-_]cn|[-_]hans)?|chinese|cn)(?:[/_.-]|$)/i.test(document.path);
  if (!isZh) {
    try {
      let target = localChineseLink(document.markdown, document.path);
      if (!target) {
        const entries = await read(`${prefix}/contents?ref=${encodeURIComponent(branch)}`);
        signal.throwIfAborted();
        if (!Array.isArray(entries)) throw new Error("Invalid directory response");
        const preferred = ["README.zh-CN.md", "README.zh_CN.md", "README_zh.md", "README_zh-CN.md", "README_zh_CN.md", "README-zh-CN.md", "README-zh.md", "README.zh.md", "README_CN.md", "README-CN.md", "README.cn.md", "README_zh-Hans.md"];
        const hit = preferred.map(name => entries.find((entry: any) => entry?.type === "file" && entry.name === name)).find(Boolean);
        if (typeof hit?.path === "string") target = hit.path;
      }
      if (target && target !== document.path) {
        if (target.split("/").some(part => !part || part === "." || part === "..")) throw new Error("Invalid README path");
        const data = await read(`${prefix}/contents/${target.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch)}`);
        signal.throwIfAborted();
        document = decodeReadme(data); isZh = true;
      }
    } catch (error) {
      signal.throwIfAborted();
      notice += error instanceof GitHubDetailReadError
        ? ` 中文版本未能读取：${error.message} 已保留默认 README。`
        : " 中文版本未能确认，显示已读取的默认 README。";
    }
  }

  // ★★★ 核心突破：通过官方 HTML 渲染管线拉取权威 HTML ★★★
  let officialHtml = "";
  try {
    officialHtml = await fetchOfficialReadmeHtml(owner, repo, document.path, branch, headers, signal);
    if (!officialHtml && document.markdown) {
      officialHtml = await renderWithOfficialMarkdown(document.markdown, `${owner}/${repo}`, headers, signal);
    }
  } catch {}

  return { ...document, html: officialHtml, metadata, branch, isZh, notice };
}

/**
 * 原地读取指定的文档/语言版本 (如 README.md, README_zh.md, README.zh-CN.md 等)
 */
export async function readRepositorySpecificDocument(
  owner: string,
  repo: string,
  filePath: string,
  branch: string,
  signal: AbortSignal
) {
  const headers = await loadGitHubReadHeaders(signal);
  const prefix = `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const ref = branch ? `?ref=${encodeURIComponent(branch)}` : "";
  const read = (path: string) => readDetailJson(path, signal, headers);

  const cleanPath = filePath.replace(/^\.?\//, "");
  let data: any;
  if (!cleanPath || cleanPath.toLowerCase() === "readme.md") {
    data = await read(`${prefix}/readme${ref}`);
  } else {
    data = await read(`${prefix}/contents/${cleanPath.split("/").map(encodeURIComponent).join("/")}${ref}`);
  }
  signal.throwIfAborted();
  const document = decodeReadme(data);
  const isZh = /(?:^|[/_.-])(?:zh(?:[-_]cn|[-_]hans)?|chinese|cn)(?:[/_.-]|$)/i.test(document.path);

  let officialHtml = "";
  try {
    officialHtml = await fetchOfficialReadmeHtml(owner, repo, document.path, branch, headers, signal);
    if (!officialHtml && document.markdown) {
      officialHtml = await renderWithOfficialMarkdown(document.markdown, `${owner}/${repo}`, headers, signal);
    }
  } catch {}

  return { ...document, html: officialHtml, branch, isZh };
}
