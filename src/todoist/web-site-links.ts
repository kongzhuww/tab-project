export interface WebSiteLink {
  id?: string;
  title: string;
  url: string;
  icon?: string;
  note?: string;
  source?: 'launcher' | 'bookmark';
}

const KEY_PREFIX = 'todoist_web_links_v1:';
const key = (taskId: string) => KEY_PREFIX + taskId;

export function readWebSiteLinks(taskId: string): WebSiteLink[] {
  if (!taskId) return [];
  try {
    const raw = JSON.parse(localStorage.getItem(key(taskId)) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw.filter(item => item && typeof item.url === 'string' && item.url.startsWith('http'));
  } catch {
    return [];
  }
}

export function writeWebSiteLinks(taskId: string, links: WebSiteLink[]): void {
  if (!taskId) return;
  localStorage.setItem(key(taskId), JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('todoist-web-links-changed', { detail: taskId }));
}

export function attachWebSite(taskId: string, site: WebSiteLink): void {
  const current = readWebSiteLinks(taskId);
  const exists = current.some(s => s.url === site.url);
  if (!exists) {
    writeWebSiteLinks(taskId, [site, ...current]);
  }
}

export function unlinkWebSite(taskId: string, url: string): void {
  const current = readWebSiteLinks(taskId);
  const next = current.filter(s => s.url !== url);
  writeWebSiteLinks(taskId, next);
}

/** 智能从本地持久化绑定或任务描述/标题中提取网站关联 */
export function getTaskWebSiteLinks(taskId: string, description?: string, title?: string): WebSiteLink[] {
  if (taskId) {
    try {
      const links = readWebSiteLinks(taskId);
      if (links && links.length > 0) return links;
    } catch {}
  }

  const text = `${description || ''}\n${title || ''}`;
  // 排除 GitHub 仓库与 B站 视频（它们已有专属卡片）
  const urlRegex = /(https?:\/\/[^\s\n\r"'>]+)/gi;
  const matches = text.match(urlRegex) || [];
  const found: WebSiteLink[] = [];

  for (const rawUrl of matches) {
    // 过滤掉 github.com/owner/repo 形式与 bilibili.com 形式
    if (/github\.com\/[^\s/]+\/[^\s/]+/i.test(rawUrl)) continue;
    if (/bilibili\.com\/video\/BV/i.test(rawUrl)) continue;

    // 清理 URL 结尾标点
    const cleanUrl = rawUrl.replace(/[.,;!?)]+$/, '');
    if (found.some(item => item.url === cleanUrl)) continue;

    let inferredTitle = '';
    // 尝试从描述中匹配 "网站: ..." 或 "标题: ..."
    const descMatch = (description || '').match(/(?:网站|标题|名称)[:：]\s*([^\n\r]+)/);
    if (descMatch) {
      inferredTitle = descMatch[1].trim();
    } else {
      // 尝试从任务标题提取
      const titleMatch = (title || '').match(/^(?:浏览|访问|查看)[:：]\s*(.+)$/);
      if (titleMatch) {
        inferredTitle = titleMatch[1].trim();
      }
    }

    try {
      const parsed = new URL(cleanUrl);
      if (!inferredTitle) {
        inferredTitle = parsed.hostname.replace(/^www\./, '');
      }
    } catch {
      continue;
    }

    found.push({
      title: inferredTitle,
      url: cleanUrl
    });
  }

  return found;
}
