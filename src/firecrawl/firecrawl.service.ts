import { loadEndpoint, validateEndpoint } from "./settings";

export interface FirecrawlScrapeResult {
  success: boolean;
  url: string;
  title: string;
  markdown: string;
  description?: string;
  charCount: number;
  statusCode?: number;
  error?: string;
}

export class FirecrawlService {
  private static instance: FirecrawlService;

  private constructor() {}

  public static getInstance(): FirecrawlService {
    if (!FirecrawlService.instance) {
      FirecrawlService.instance = new FirecrawlService();
    }
    return FirecrawlService.instance;
  }

  public async scrape(targetUrl: string): Promise<FirecrawlScrapeResult> {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) {
      throw new Error("请输入有效的网页网址");
    }

    const target = new URL(cleanUrl);
    if (!["http:", "https:"].includes(target.protocol) || target.username || target.password) {
      throw new Error("请输入 http/https 网页网址，不要在网址中携带账号密码");
    }
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      // Read the current endpoint before every request; no startup race or private fallback.
      let apiUrl: string;
      try { apiUrl = validateEndpoint(await loadEndpoint()); }
      catch { throw new Error("Firecrawl 节点配置不可用，请打开右上角节点设置检查"); }
      if (!apiUrl) throw new Error("尚未配置 Firecrawl 节点，请在右上角节点设置中填写服务地址");
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 35000);

      const resp = await fetch(`${apiUrl}/v1/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: cleanUrl }),
        signal: controller.signal
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => "");
        throw new Error(`Firecrawl 响应异常 (${resp.status}): ${errText.slice(0, 150)}`);
      }

      const json = await resp.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || "Firecrawl 未能提取到网页内容");
      }

      const md = String(json.data.markdown || "").trim();
      const metadata = json.data.metadata || {};
      const title = String(metadata.title || cleanUrl.replace(/^https?:\/\//, "")).trim();
      const description = String(metadata.description || "").trim();

      return {
        success: true,
        url: cleanUrl,
        title,
        markdown: md,
        description,
        charCount: md.length,
        statusCode: metadata.statusCode || 200
      };
    } catch (err: any) {
      const isAbort = err?.name === "AbortError";
      const message = isAbort
        ? "Firecrawl 网页解析超时 (超过 35 秒)，请检查网络或目标网站响应"
        : (err?.message || "Firecrawl 网页提取失败");
      return {
        success: false,
        url: cleanUrl,
        title: cleanUrl,
        markdown: "",
        charCount: 0,
        error: message
      };
    } finally {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    }
  }
}

export const firecrawlService = FirecrawlService.getInstance();
