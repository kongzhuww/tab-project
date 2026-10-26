/**
 * AiHotService — 纯 TypeScript 现代化 AI 资讯与前沿大模型榜单数据服务 (Zero DOM)
 * 提纯自历史脚本 newtab-discovery.js
 */

import {
  aihotFeedController,
  type AiHotFeedArticle,
  type AiHotLeaderboardItem,
  type AiHotViewType,
  type AiHotDailyReport,
  type AiHotDailyArchive
} from "../aihot/aihot-feed-store";
import { storageCache } from "./storage-cache.service";

export const DEFAULT_AIHOT_API = "https://aihot.virxact.com/api/v1";

// Keep source-page controls out of every article extraction path, including templates.
const ARTICLE_NOISE_SELECTORS = [
  "aside", "nav", "script", "style", "link", "meta", "iframe", "object", "embed",
  "form", "button", "input", "select", "textarea",
  ".dt-aside", ".dt-outline", ".dt-outline-list", ".detail-mobile-only",
  ".detail-reading-tail", ".dt-tags-wrap", ".dt-share-wrap", "[data-detail-aside]", ".dt-detail-reason"
].join(", ");

export class AiHotService {
  private static instance: AiHotService;
  private owner: symbol | null = null;
  private request: { key: string; controller: AbortController; timer?: ReturnType<typeof setTimeout> } | null = null;
  private attempted = new Set<string>();
  private displayed = new Map<AiHotViewType, string>();
  private detachActions?: () => void;

  public static getInstance(): AiHotService {
    if (!AiHotService.instance) {
      AiHotService.instance = new AiHotService();
    }
    return AiHotService.instance;
  }

  private constructor() {}

  public activate(owner: symbol): void {
    if (this.owner === owner) return;
    this.pause();
    this.owner = owner;
    this.detachActions = aihotFeedController.onAction((action, payload) => {
      if (action === "switch-view") void this.switchView(payload);
      else if (action === "refresh") void this.refresh();
      else if (action === "change-category" || action === "change-window") void this.loadFeed();
      else if (action === "select-daily-date") void this.loadDaily(payload);
    });
    // Resume interrupted reads, but do not retry settled failures every time a tab gains focus.
    if (!this.attempted.has(this.currentKey())) void this.loadCurrent();
  }

  public pause(owner?: symbol): void {
    if (owner && this.owner !== owner) return;
    this.detachActions?.(); this.detachActions = undefined;
    this.owner = null;
    this.cancelRead();
  }

  private cancelRead(): void {
    const request = this.request;
    this.request = null;
    if (request) {
      clearTimeout(request.timer);
      request.controller.abort();
      this.attempted.delete(request.key);
      aihotFeedController.updateState({ isLoading: false, statusMessage: "读取已暂停，重新进入后继续。" });
    }
  }

  private currentKey(): string {
    const s = aihotFeedController.state;
    if (s.currentView === "leaderboard") return "aihot_leaderboard_items";
    if (s.currentView === "daily") return s.activeDailyDate ? `aihot_daily_${s.activeDailyDate}` : "aihot_daily_latest";
    return `aihot_feed_articles_${s.feedCategory || ""}_${s.feedWindow || "24h"}`;
  }

  private async loadCurrent(force = false): Promise<void> {
    const s = aihotFeedController.state;
    if (s.currentView === "leaderboard") await this.loadLeaderboard(force);
    else if (s.currentView === "daily") await this.loadDaily(s.activeDailyDate, force);
    else await this.loadFeed(force);
  }

  public async switchView(view: AiHotViewType): Promise<void> {
    if (!this.owner || !["leaderboard", "feed", "daily"].includes(view)) return;
    aihotFeedController.updateState({ currentView: view });
    try { localStorage.setItem("lw-info-feed-view", view); } catch {}
    await this.loadCurrent();
  }

  public async refresh(): Promise<void> {
    if (this.owner) await this.loadCurrent(true);
  }

  private async read<T>(
    view: AiHotViewType, key: string, force: boolean, ttlMs: number,
    valid: (value: unknown) => value is T,
    fetchData: (signal: AbortSignal) => Promise<T>,
    apply: (data: T) => void
  ): Promise<void> {
    if (!this.owner || aihotFeedController.state.currentView !== view) return;
    if (this.request?.key === key) return;
    this.cancelRead();
    const request = { key, controller: new AbortController(), timer: undefined as ReturnType<typeof setTimeout> | undefined };
    this.request = request;
    this.attempted.add(key);
    const current = () => this.request === request && !!this.owner;
    if (this.displayed.get(view) !== key) {
      if (view === "feed") aihotFeedController.updateState({ feedArticles: [] });
      else if (view === "daily") aihotFeedController.updateState({ dailyReport: null });
      this.displayed.set(view, key);
    }
    aihotFeedController.updateState({ isLoading: true, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!force) {
        const cached = await storageCache.get<unknown>(key);
        if (!current()) return;
        if (valid(cached)) {
          apply(cached);
          aihotFeedController.updateState({ statusMessage: "正在显示缓存，检查更新中…" });
        }
      }
      if (!current()) return;
      request.timer = setTimeout(() => request.controller.abort(), 15000);
      const data = await fetchData(request.controller.signal);
      if (!current()) return;
      request.controller.signal.throwIfAborted();
      if (!valid(data)) throw new Error("数据格式不匹配");
      apply(data);
      // Persistence already submitted cannot be undone; never submit a stale result.
      void storageCache.set(key, data, { ttlMs }).catch(() => {});
      aihotFeedController.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (error) {
      if (!current()) return;
      aihotFeedController.updateState({
        errorMessage: request.controller.signal.aborted ? "读取超时，请手动刷新重试。" :
          `读取失败：${error instanceof Error ? error.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(request.timer);
      if (current()) {
        this.request = null;
        aihotFeedController.updateState({ isLoading: false });
      }
    }
  }

  public async loadFeed(force = false): Promise<void> {
    const s = aihotFeedController.state;
    const cat = s.feedCategory || "", win = s.feedWindow || "24h";
    await this.read<AiHotFeedArticle[]>("feed", `aihot_feed_articles_${cat}_${win}`, force, 15 * 60 * 1000,
      (value): value is AiHotFeedArticle[] => Array.isArray(value) && value.every(item => item && typeof item.title === "string" && typeof item.url === "string" &&
        typeof item.sourceName === "string" && typeof item.published === "string" &&
        (item.category === undefined || typeof item.category === "string")),
      async signal => {
        const params = new URLSearchParams({ mode: "selected", window: win, limit: "30" });
        if (cat) params.set("category", cat);
        const res = await fetch(`${DEFAULT_AIHOT_API}/items?${params}`, { headers: { Accept: "application/json" }, signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data?.items) ? data.items : Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : null;
        if (!list) throw new Error("资讯响应格式不匹配");
        return list.map((it: any) => {
          if (!it || typeof it !== "object") throw new Error("资讯条目格式不匹配");
          let published = it.published || "最新";
          if (it.publishedAt) {
            const d = new Date(it.publishedAt);
            if (Number.isFinite(d.getTime())) published = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
          }
          return {
            id: String(it.id || it.externalId || crypto.randomUUID()),
            title: it.title || it.headline || "无标题", summary: it.summary || it.description || "",
            sourceName: it.source?.name || it.sourceName || it.site || "AI 资讯",
            published, category: it.category || "综合",
            url: it.links?.aihot || it.links?.original || it.url || it.link || "#", raw: it
          };
        });
      },
      feedArticles => aihotFeedController.updateState({ feedArticles }));
  }

  private parseLeaderboardHtml(html: string): AiHotLeaderboardItem[] {
    const items: AiHotLeaderboardItem[] = [];
    if (typeof DOMParser !== "undefined") {
      try {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const trs = doc.querySelectorAll("tr");
        trs.forEach((tr) => {
          if (tr.querySelector("th")) return;
          const rank = tr.querySelector(".lb-rank-number span")?.textContent?.trim() || "";
          const modelEntry = tr.querySelector("a.lb-model-entry");
          const model = modelEntry?.querySelector("strong")?.textContent?.trim() || "";
          const provider = modelEntry?.querySelector("small")?.textContent?.trim() || "";
          const releaseDate = tr.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "";
          const priceCells = tr.querySelectorAll(".lb-price-cell span");
          const inputPrice = priceCells[1]?.textContent?.trim() || priceCells[0]?.textContent?.trim() || "-";
          const outputPrice = priceCells[2]?.textContent?.trim() || "-";
          const score = tr.querySelector(".lb-score-cell strong")?.textContent?.trim() || "";
          const href = modelEntry?.getAttribute("href")
            ? (modelEntry.getAttribute("href")!.startsWith("http") ? modelEntry.getAttribute("href")! : `https://aihot.virxact.com${modelEntry.getAttribute("href")}`)
            : "https://aihot.virxact.com";
          if (model) {
            items.push({ href, rank, model, provider, releaseDate, inputPrice, outputPrice, score });
          }
        });
      } catch {}
    }

    if (!items.length) {
      const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let trMatch;
      while ((trMatch = trRegex.exec(html)) !== null) {
        const rowHtml = trMatch[1];
        if (rowHtml.includes("<th")) continue;
        const rankMatch = rowHtml.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/);
        const linkMatch = rowHtml.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/);
        const modelMatch = rowHtml.match(/<strong>([^<]+)<\/strong>/);
        const providerMatch = rowHtml.match(/<small>([^<]+)<\/small>/);
        const dateMatch = rowHtml.match(/<time[^>]*>([^<]+)<\/time>/);
        const scoreMatch = rowHtml.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/);
        const priceMatches = [...rowHtml.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];

        if (modelMatch) {
          items.push({
            href: linkMatch ? (linkMatch[1].startsWith("http") ? linkMatch[1] : `https://aihot.virxact.com${linkMatch[1]}`) : "https://aihot.virxact.com",
            rank: rankMatch ? rankMatch[1].trim() : String(items.length + 1),
            model: modelMatch[1].trim(),
            provider: providerMatch ? providerMatch[1].trim() : "权威厂商",
            releaseDate: dateMatch ? dateMatch[1].trim() : "",
            inputPrice: priceMatches[1] ? priceMatches[1][1].trim() : (priceMatches[0] ? priceMatches[0][1].trim() : "-"),
            outputPrice: priceMatches[2] ? priceMatches[2][1].trim() : "-",
            score: scoreMatch ? scoreMatch[1].trim() : ""
          });
        }
      }
    }
    return items;
  }

  public async loadLeaderboard(force = false): Promise<void> {
    await this.read<AiHotLeaderboardItem[]>("leaderboard", "aihot_leaderboard_items", force, 30 * 60 * 1000,
      (value): value is AiHotLeaderboardItem[] => Array.isArray(value) && value.every(item => item && typeof item.model === "string" && typeof item.provider === "string"),
      async signal => {
        const res = await fetch("https://aihot.virxact.com/leaderboard", { headers: { Accept: "text/html" }, signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const items = this.parseLeaderboardHtml(await res.text());
        if (!items.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return items;
      },
      leaderboard => aihotFeedController.updateState({ leaderboard }));
  }

  public async loadDaily(targetDate = "", force = false): Promise<void> {
    if (targetDate && !/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) return;
    const key = targetDate ? `aihot_daily_${targetDate}` : "aihot_daily_latest";
    await this.read<{ report: AiHotDailyReport | null; archives: AiHotDailyArchive[] }>("daily", key, force, 60 * 60 * 1000,
      (value): value is { report: AiHotDailyReport | null; archives: AiHotDailyArchive[] } => {
        const data = value as any;
        return !!data && (data.report === null || (typeof data.report?.date === "string" && Array.isArray(data.report?.sections) &&
          data.report.sections.every((section: any) => section && Array.isArray(section.items)))) && Array.isArray(data.archives) &&
          data.archives.every((archive: any) => archive && typeof archive.date === "string");
      },
      async signal => {
        const url = targetDate ? `${DEFAULT_AIHOT_API}/dailies/${encodeURIComponent(targetDate)}` : `${DEFAULT_AIHOT_API}/dailies/latest`;
        const res = await fetch(url, { headers: { Accept: "application/json" }, signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json || !Object.prototype.hasOwnProperty.call(json, "report")) throw new Error("日报响应格式不匹配");
        return { report: json.report, archives: json.archives || [] };
      },
      data => aihotFeedController.updateState({ dailyReport: data.report, dailyArchives: data.archives, activeDailyDate: targetDate }));
  }

  private aihotArticleCache: Map<string, string> = new Map();
  private pendingArticleRequests: Map<string, Promise<string>> = new Map();

  public async fetchArticleContent(item: { id?: string | number; url?: string; summary?: string; title?: string }): Promise<string> {
    const itemId = item.id ? String(item.id) : "";
    // Old entries may contain a whole source-page article, including duplicate responsive controls.
    const cacheKey = `aihot_art_v2_${itemId}`;
    if (itemId && this.aihotArticleCache.has(itemId)) {
      return this.aihotArticleCache.get(itemId)!;
    }
    if (itemId) {
      const persisted = await storageCache.get<string>(cacheKey);
      if (persisted) {
        this.aihotArticleCache.set(itemId, persisted);
        return persisted;
      }
    }
    if (itemId && this.pendingArticleRequests.has(itemId)) {
      return this.pendingArticleRequests.get(itemId)!;
    }

    // 若属于离线静态兜底数据或没有有效远程 ID
    if (!itemId || itemId.startsWith("fb-")) {
      const summaryText = item.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${item.summary}</p>` : "";
      const content = `<div class="aihot-article-fallback">
        ${summaryText}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 提示：该资讯为实时要闻提炼，您可以查阅上方「AI 导读」，或点击右上角「原文 ↗」直达源网站查看完整图文报道。
        </p>
      </div>`;
      if (itemId) this.aihotArticleCache.set(itemId, content);
      return content;
    }

    const task = (async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        let res = await fetch(`https://aihot.virxact.com/items/${itemId}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: controller.signal
        });
        if (!res.ok) {
          res = await fetch(`https://aihot.news/items/${itemId}`, {
            headers: { Accept: "text/html,application/xhtml+xml" },
            signal: controller.signal
          });
        }
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const parsed = this.extractArticleHtml(html, itemId);
        if (parsed && parsed.length > 20) {
          this.aihotArticleCache.set(itemId, parsed);
          void storageCache.set(cacheKey, parsed, { ttlMs: 24 * 3600 * 1000 });
          return parsed;
        }
      } catch (err: any) {
        console.warn("[AiHotService] fetch article error or timeout:", err?.message);
      }

      // 友好降级兜底：结合摘要与原文跳转指引
      const fallbackSummary = item.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${item.summary}</p>` : "";
      const fallbackContent = `<div class="aihot-article-fallback">
        ${fallbackSummary}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 正文提示：该来源站点未提供公开内联排版或响应超时。核心主旨与要点已由 AI 在上方提炼，点击右上角「原文 ↗」可前往原网站浏览完整细节。
        </p>
      </div>`;
      this.aihotArticleCache.set(itemId, fallbackContent);
      return fallbackContent;
    })();

    this.pendingArticleRequests.set(itemId, task);
    try {
      return await task;
    } finally {
      this.pendingArticleRequests.delete(itemId);
    }
  }

  private sanitizeAndProxyArticleHtml(rawHtml: string): string {
    if (!rawHtml) return "";
    // 1. Remove nested source controls structurally, not with unbalanced div regexes.
    const doc = new DOMParser().parseFromString(rawHtml, "text/html");
    doc.querySelectorAll(ARTICLE_NOISE_SELECTORS).forEach((el) => el.remove());
    for (const el of doc.body.querySelectorAll("*")) {
      for (const attr of Array.from(el.attributes)) {
        if (/^on/i.test(attr.name) || attr.name === "srcdoc") el.removeAttribute(attr.name);
        if (["href", "src", "xlink:href"].includes(attr.name) && /^\s*(?:javascript|vbscript|data):/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      }
    }
    let html = doc.body.innerHTML;

    // 2. 补全并代理图片路径（防 404 与防盗链）
    html = html.replace(/src=["'](?:\/api\/img-proxy\?([^"']+))["']/gi, (m, q) => {
      return `src="https://aihot.news/api/img-proxy?${q}"`;
    });
    html = html.replace(/src=["']\/(?!api\/img-proxy)([^"']+)["']/gi, (m, path) => {
      return `src="https://aihot.news/${path}"`;
    });

    // 3. 增强图片加载与防盗链
    html = html.replace(/<img\b(?![^>]*referrerpolicy)/gi, '<img referrerpolicy="no-referrer" loading="lazy"');

    // 4. 外链修复（补全 aihot.news 域名前缀并默认新标签打开）
    html = html.replace(/href=["']\/([^"']+)["']/gi, (m, path) => {
      return `href="https://aihot.news/${path}"`;
    });
    html = html.replace(/<a\b(?![^>]*target)/gi, '<a target="_blank" rel="noreferrer"');

    return html.trim();
  }

  private extractArticleHtml(html: string, itemId: string): string {
    if (!html) return "";

    // 1. 优先提取 Next.js 预置的纯净富文本模板 detail-rich-html-${itemId}-(zh|original|en)
    try {
      const tplMatches = [
        ...html.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (tplMatches.length > 0) {
        let target = tplMatches.find((m) => m[1] === `${itemId}-zh`);
        if (!target) target = tplMatches.find((m) => m[1].startsWith(itemId));
        if (!target) target = tplMatches.find((m) => m[2] && m[2].trim().length > 30);

        if (target && target[2] && target[2].trim().length > 20) {
          return this.sanitizeAndProxyArticleHtml(target[2]);
        }
      }
    } catch {}

    // 2. DOM 容器提取与清洗 (若未采用 template 结构)
    try {
      if (typeof DOMParser !== "undefined") {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // 移除所有侧边栏、目录列表、推荐理由、外链分享等噪音容器
        doc.querySelectorAll(ARTICLE_NOISE_SELECTORS).forEach((el) => el.remove());

        // A comma selector returns document order, NOT selector priority: an outer article wins.
        // Resolve each candidate separately so the real body (.prose in the current source) wins.
        const containers = [
          doc.querySelector(".dt-article-content"),
          doc.getElementById(`detail-article-${itemId}`),
          doc.querySelector(".detail-content"),
          doc.querySelector(".article-content"),
          doc.querySelector(".prose"),
          doc.querySelector("article")
        ];
        for (const container of containers) {
          if (!container) continue;
          const cleanHtml = this.sanitizeAndProxyArticleHtml(container.innerHTML);
          if (cleanHtml.length > 30) return cleanHtml;
        }
      }
    } catch {}

    // 3. Next.js 14+ RSC 流式数据提取兜底
    try {
      const rscMatches = html.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
      if (rscMatches && rscMatches.length) {
        let rscText = "";
        for (const m of rscMatches) {
          try {
            const inner = m.replace(/^self\.__next_f\.push\(\[1,\s*"/, "").replace(/"\]\)$/, "");
            rscText += JSON.parse('"' + inner + '"') + "\n";
          } catch {
            rscText += m + "\n";
          }
        }
        const zhMatch = rscText.match(/"zh":\s*(\[[^\]]+\])/);
        const origMatch = rscText.match(/"original":\s*(\[[^\]]+\])/);
        const quotedMatch = rscText.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/);
        const mediaMatches = [...rscText.matchAll(/"fullSrc":"([^"]+)"/g)].map((x) => x[1]);

        const parts: string[] = [];
        if (zhMatch) {
          try {
            const paragraphs = JSON.parse(zhMatch[1]);
            if (Array.isArray(paragraphs) && paragraphs.length) {
              parts.push('<div class="aihot-rsc-tweet-zh">' + paragraphs.map((p: string) => `<p style="margin-bottom:12px;line-height:1.75;">${p}</p>`).join("") + "</div>");
            }
          } catch {}
        }
        if (quotedMatch && quotedMatch[1]) {
          parts.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${quotedMatch[1]}</blockquote>`);
        }
        if (mediaMatches.length) {
          const imgs = mediaMatches.map((src) => {
            const realSrc = src.startsWith("http") ? src : "https://aihot.news" + (src.startsWith("/") ? src : "/" + src);
            return `<img src="${realSrc}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`;
          }).join("");
          parts.push(`<div class="aihot-rsc-media">${imgs}</div>`);
        }
        if (origMatch && !zhMatch) {
          try {
            const paragraphs = JSON.parse(origMatch[1]);
            if (Array.isArray(paragraphs) && paragraphs.length) {
              parts.push('<div class="aihot-rsc-tweet-orig" style="color:var(--muted);">' + paragraphs.map((p: string) => `<p style="margin-bottom:12px;line-height:1.75;">${p}</p>`).join("") + "</div>");
            }
          } catch {}
        }
        if (parts.length) {
          return this.sanitizeAndProxyArticleHtml(parts.join(""));
        }
      }
    } catch {}

    return "";
  }
}

export const aiHotService = AiHotService.getInstance();
