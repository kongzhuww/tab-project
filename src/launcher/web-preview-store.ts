import { reactive } from "vue";
import {
  normalizePreviewUrl,
  parseWebsiteMetaHtml,
  type WebSitePreviewMeta
} from "./web-preview-meta";

export { normalizePreviewUrl, parseWebsiteMetaHtml, type WebSitePreviewMeta };

export interface WebSitePreviewTarget {
  id?: string;
  title: string;
  url: string;
  icon?: string;
  note?: string;
  category?: string;
  source?: "launcher" | "bookmark";
}

interface WebSitePreviewState {
  isOpen: boolean;
  target: WebSitePreviewTarget | null;
  metaLoading: boolean;
  meta: WebSitePreviewMeta | null;
}

export const webSitePreviewState = reactive<WebSitePreviewState>({
  isOpen: false,
  target: null,
  metaLoading: false,
  meta: null
});

const metaCache = new Map<string, WebSitePreviewMeta>();
let activeAbort: AbortController | undefined;
let requestSeq = 0;

async function fetchWebsiteMeta(url: string, force = false): Promise<void> {
  if (!url) return;
  if (!force && metaCache.has(url)) {
    webSitePreviewState.meta = metaCache.get(url)!;
    webSitePreviewState.metaLoading = false;
    return;
  }

  activeAbort?.abort();
  const controller = new AbortController();
  activeAbort = controller;
  const seq = ++requestSeq;
  webSitePreviewState.metaLoading = true;
  webSitePreviewState.meta = null;

  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const resp = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      credentials: "omit",
      redirect: "follow"
    });
    if (seq !== requestSeq || controller.signal.aborted) return;
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    const contentType = resp.headers.get("content-type") || "";
    if (contentType && !/html|xml|text/i.test(contentType)) {
      const meta: WebSitePreviewMeta = {
        siteName: new URL(url).hostname,
        fetchedAt: Date.now()
      };
      metaCache.set(url, meta);
      webSitePreviewState.meta = meta;
      return;
    }
    const html = await resp.text();
    if (seq !== requestSeq || controller.signal.aborted) return;
    const parsed = parseWebsiteMetaHtml(html, resp.url || url);
    const meta: WebSitePreviewMeta = { ...parsed, fetchedAt: Date.now() };
    metaCache.set(url, meta);
    webSitePreviewState.meta = meta;
  } catch (err: any) {
    if (seq !== requestSeq || controller.signal.aborted) return;
    webSitePreviewState.meta = {
      fetchedAt: Date.now(),
      error: err?.message || "未能读取站点元信息"
    };
  } finally {
    clearTimeout(timer);
    if (activeAbort === controller) activeAbort = undefined;
    if (seq === requestSeq) webSitePreviewState.metaLoading = false;
  }
}

export const webSitePreviewController = {
  open(target: WebSitePreviewTarget) {
    const safeUrl = normalizePreviewUrl(target.url);
    webSitePreviewState.target = {
      ...target,
      url: safeUrl || target.url
    };
    webSitePreviewState.isOpen = true;
    if (safeUrl) {
      void fetchWebsiteMeta(safeUrl);
    } else {
      webSitePreviewState.metaLoading = false;
      webSitePreviewState.meta = { fetchedAt: Date.now(), error: "仅支持预览 HTTP/HTTPS 网址" };
    }
  },

  refreshMeta() {
    const url = normalizePreviewUrl(webSitePreviewState.target?.url || "");
    if (url) void fetchWebsiteMeta(url, true);
  },

  updateNote(note: string) {
    if (webSitePreviewState.target) {
      webSitePreviewState.target = { ...webSitePreviewState.target, note };
    }
  },

  close() {
    activeAbort?.abort();
    activeAbort = undefined;
    webSitePreviewState.isOpen = false;
    webSitePreviewState.metaLoading = false;
  }
};
