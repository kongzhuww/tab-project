export interface WebSitePreviewMeta {
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
  fetchedAt: number;
  error?: string;
}

export function normalizePreviewUrl(raw: string): string {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return "";
  const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return parsed.href;
  } catch {
    return "";
  }
}

function resolveHttpUrl(raw: string | undefined, baseUrl: string): string | undefined {
  const value = String(raw || "").trim();
  if (!value) return undefined;
  try {
    const resolved = new URL(value, baseUrl);
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:") return undefined;
    return resolved.href;
  } catch {
    return undefined;
  }
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_m, dec) => {
      const code = Number(dec);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    })
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => {
      const code = parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    })
    .replace(/\s+/g, " ")
    .trim();
}

function readMetaContent(headHtml: string, names: string[]): string | undefined {
  const metaTagRe = /<meta\b[^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = metaTagRe.exec(headHtml)) !== null) {
    const tag = match[0];
    const keyMatch = tag.match(/\b(?:property|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const key = (keyMatch?.[1] ?? keyMatch?.[2] ?? keyMatch?.[3] ?? "").toLowerCase();
    if (!key || !names.includes(key)) continue;
    const contentMatch = tag.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const rawContent = contentMatch?.[1] ?? contentMatch?.[2] ?? contentMatch?.[3];
    if (rawContent && rawContent.trim()) {
      return decodeHtmlEntities(rawContent);
    }
  }
  return undefined;
}

export function parseWebsiteMetaHtml(html: string, baseUrl: string): Omit<WebSitePreviewMeta, "fetchedAt"> {
  const slice = String(html || "").slice(0, 120000);
  const titleMatch = slice.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const ogTitle = readMetaContent(slice, ["og:title", "twitter:title"]);
  const docTitle = titleMatch ? decodeHtmlEntities(titleMatch[1]) : undefined;
  const description = readMetaContent(slice, ["og:description", "twitter:description", "description"]);
  const rawImage = readMetaContent(slice, ["og:image", "twitter:image", "twitter:image:src"]);
  const siteName = readMetaContent(slice, ["og:site_name", "application-name"]);
  return {
    title: ogTitle || docTitle || undefined,
    description,
    imageUrl: resolveHttpUrl(rawImage, baseUrl),
    siteName
  };
}
