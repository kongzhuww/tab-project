export interface RssArticle {
  title: string;
  url: string;
  summary: string;
  published: string;
}

export function rssUrl(value: string, base?: string): string {
  try {
    const url = new URL(value, base);
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

function child(element: Element, name: string): Element | undefined {
  return Array.from(element.children).find(node => node.localName.toLowerCase() === name);
}

export function parseRss(xml: string, feedUrl: string): RssArticle[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('RSS / Atom 格式无效');
  const root = doc.documentElement;
  const kind = root.localName.toLowerCase();
  const container = kind === 'rss' ? child(root, 'channel') : root;
  if (!container || !['rss', 'feed', 'rdf'].includes(kind)) throw new Error('不是 RSS 或 Atom 订阅');
  const entries = Array.from(container.children).filter(node => ['item', 'entry'].includes(node.localName.toLowerCase()));
  return entries.map(entry => {
    const links = Array.from(entry.children).filter(node => node.localName.toLowerCase() === 'link');
    const link = links.find(node => !node.getAttribute('rel') || node.getAttribute('rel') === 'alternate');
    const address = link?.getAttribute('href') || link?.textContent || '';
    const url = rssUrl(address.trim(), feedUrl);
    const title = (child(entry, 'title')?.textContent || '').trim();
    const summary = (child(entry, 'summary')?.textContent || child(entry, 'description')?.textContent || '')
      .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const published = (child(entry, 'published')?.textContent || child(entry, 'updated')?.textContent || child(entry, 'pubdate')?.textContent || '').trim();
    return { title, url, summary, published };
  }).filter(item => item.title && item.url);
}
