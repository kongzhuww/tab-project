import type { IconPickerItem } from "../launcher/dialogs-store";

export interface LauncherIconResult extends IconPickerItem {
  title: string;
  source: string;
  sourceLabel: string;
}

const synonyms: Record<string, string[]> = {
  "学习通": ["chaoxing", "book", "education", "school"],
  "学习": ["study", "learn", "book", "education"],
  "课程": ["course", "education", "class"],
  "知乎": ["zhihu", "question", "help"],
  "哔哩哔哩": ["bilibili", "video", "play"],
  "b站": ["bilibili", "video", "play"],
  "网易云音乐": ["netease", "music"],
  "qq音乐": ["qq-music", "music"],
  "音乐": ["music", "audio", "sound", "headphones"],
  "视频": ["video", "film", "movie", "player"],
  "微信": ["wechat", "message", "chat"],
  "微博": ["weibo", "social", "share"],
  "百度网盘": ["baidu", "cloud", "download", "storage"],
  "网盘": ["cloud", "storage", "drive", "folder"],
  "邮箱": ["email", "mail", "inbox"],
  "邮件": ["email", "mail", "inbox"],
  "搜索": ["search", "magnify", "find"],
  "游戏": ["game", "gamepad", "controller"],
  "代码": ["code", "github", "terminal", "branch"],
  "购物": ["shopping", "cart", "store", "bag"],
  "商城": ["shop", "store", "market", "bag"],
  "笔记": ["note", "edit", "pen", "notebook"],
  "地图": ["map", "location", "pin", "navigation"],
  "工具": ["tool", "wrench", "settings"]
};

async function fetchJson(url: string, timeout: number): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function searchLauncherIcons(
  keyword: string, url: string, onBatch?: (items: LauncherIconResult[]) => void
): Promise<LauncherIconResult[]> {
  const name = String(keyword || "").trim();
  let host = "";
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") host = parsed.hostname;
  } catch { /* Searching by name still works without a website. */ }
  const results: LauncherIconResult[] = [];
  const seen = new Set<string>();
  const add = (item: LauncherIconResult): void => {
    if (!item.url || seen.has(item.url)) return;
    seen.add(item.url);
    results.push(item);
  };
  const publish = (): void => { if (results.length) onBatch?.([...results]); };
  const tasks: Promise<void>[] = [];

  if (name) tasks.push((async () => {
    try {
      const data = await fetchJson(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=software&limit=6&country=cn`, 2800);
      for (const app of data?.results || []) {
        const icon = app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60;
        if (icon) add({ title: app.trackName || name, url: icon, source: "appstore", sourceLabel: "官方App" });
      }
      publish();
    } catch { /* This provider is optional. */ }
  })());

  if (host) {
    const parts = host.split(".");
    const root = parts.length > 2 ? parts.slice(-2).join(".") : host;
    add({ title: `${name || host} 官方高清Favicon`, url: `https://www.google.com/s2/favicons?domain=${host}&sz=128`, source: "official", sourceLabel: "Favicon 128px" });
    add({ title: `${name || host} 官方Logo`, url: `https://icon.horse/icon/${host}`, source: "official", sourceLabel: "IconHorse" });
    if (root !== host) add({ title: `${root} 主站图标`, url: `https://icon.horse/icon/${root}`, source: "official", sourceLabel: "主站Favicon" });
    add({ title: `${name || host} 品牌综合Logo`, url: `https://unavatar.io/${host}`, source: "official", sourceLabel: "Unavatar" });
    publish();
  }

  if (name) tasks.push((async () => {
    try {
      const terms = [name, ...(synonyms[name.toLowerCase()] || [])];
      const data = await fetchJson(`https://api.iconify.design/search?query=${encodeURIComponent(terms.slice(0, 3).join(" "))}&limit=16`, 2500);
      for (const key of data?.icons || []) {
        const parts = String(key).split(":");
        if (parts.length === 2) add({ title: parts[1], url: `https://api.iconify.design/${parts[0]}/${parts[1]}.svg?color=%23333`, source: "iconify", sourceLabel: "矢量图标" });
      }
      publish();
    } catch { /* This provider is optional. */ }
  })());

  await Promise.allSettled(tasks);
  return results;
}
