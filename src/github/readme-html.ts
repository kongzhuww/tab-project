/** README URLs resolve against the repository, never the extension page. */
export function resolveReadmeUrl(value: string, owner: string, repo: string, branch: string, path: string, image = false): string {
  const input = value.trim();
  if (!input) return "";
  if (!image && input.startsWith("#")) return input;
  const prefix = `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const directory = path.includes("/") ? path.slice(0, path.lastIndexOf("/") + 1) : "";
  const base = image
    ? `https://raw.githubusercontent.com/${prefix}/${encodeURIComponent(branch)}/${directory}`
    : `https://github.com/${prefix}/blob/${encodeURIComponent(branch)}/${directory}`;
  try {
    const url = new URL(image && input.startsWith("/") && !input.startsWith("//")
      ? `https://raw.githubusercontent.com/${prefix}/${encodeURIComponent(branch)}${input}` : input, base);
    if (url.protocol !== "https:" && url.protocol !== "http:" && !(url.protocol === "mailto:" && !image)) return "";
    if (url.username || url.password) return "";
    if (image && url.hostname === "github.com") {
      const blob = /^\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+)$/.exec(url.pathname);
      if (blob) return `https://raw.githubusercontent.com/${blob[1]}/${blob[2]}/${blob[3]}${url.search}${url.hash}`;
    }
    return url.href;
  } catch { return ""; }
}

/** Normalize both official HTML and local fallback before v-html insertion. */
export function prepareReadmeHtml(html: string, owner: string, repo: string, branch: string, path: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script,style,iframe,object,embed,form,input,button,link,meta,base,svg,foreignObject").forEach(el => el.remove());
  // GitHub emits these permalink icons after headings; they are not content links.
  doc.querySelectorAll("a.anchor, a[data-anchorjs-icon]").forEach(el => el.remove());
  for (const el of Array.from(doc.body.querySelectorAll("*"))) {
    for (const attr of Array.from(el.attributes)) {
      if (/^on/i.test(attr.name) || ["style", "srcset", "srcdoc", "formaction", "action", "poster", "xlink:href", "data-readme-fallback"].includes(attr.name)) el.removeAttribute(attr.name);
    }
    if (!(el instanceof HTMLAnchorElement)) el.removeAttribute("href");
    if (!(el instanceof HTMLImageElement)) el.removeAttribute("src");
    if (el instanceof HTMLAnchorElement) {
      const href = resolveReadmeUrl(el.getAttribute("href") || "", owner, repo, branch, path);
      if (href) el.setAttribute("href", href); else el.removeAttribute("href");
      el.setAttribute("rel", "noopener noreferrer");
      if (!href.startsWith("#")) el.setAttribute("target", "_blank");
    }
    if (el instanceof HTMLImageElement) {
      const src = resolveReadmeUrl(el.getAttribute("src") || el.getAttribute("data-src") || "", owner, repo, branch, path, true);
      const canonical = resolveReadmeUrl(el.getAttribute("data-canonical-src") || "", owner, repo, branch, path, true);
      if (src) el.setAttribute("src", src); else el.removeAttribute("src");
      if (canonical && canonical !== src) el.setAttribute("data-readme-fallback", canonical);
      el.setAttribute("loading", "lazy");
      el.setAttribute("decoding", "async");
      el.setAttribute("referrerpolicy", "no-referrer");
    }
    if (el.tagName.toLowerCase() === "source") el.remove();
  }
  return doc.body.innerHTML;
}
