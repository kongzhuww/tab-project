export interface BiliVideoLink {
  bvid: string;
  aid?: string | number;
  title: string;
  cover?: string;
  author?: string;
  url: string;
}

const KEY_PREFIX = 'todoist_bili_video_links_v1:';
const key = (taskId: string) => KEY_PREFIX + taskId;

export function readBiliVideoLinks(taskId: string): BiliVideoLink[] {
  if (!taskId) return [];
  try {
    const raw = JSON.parse(localStorage.getItem(key(taskId)) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw.filter(item => item && (item.bvid || item.aid));
  } catch {
    return [];
  }
}

export function writeBiliVideoLinks(taskId: string, links: BiliVideoLink[]): void {
  if (!taskId) return;
  localStorage.setItem(key(taskId), JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('todoist-bili-links-changed', { detail: taskId }));
}

export function attachBiliVideo(taskId: string, video: BiliVideoLink): void {
  const current = readBiliVideoLinks(taskId);
  const exists = current.some(v => (video.bvid && v.bvid === video.bvid) || (video.aid && v.aid === video.aid));
  if (!exists) {
    writeBiliVideoLinks(taskId, [video, ...current]);
  }
}

export function unlinkBiliVideo(taskId: string, bvidOrAid: string | number): void {
  const current = readBiliVideoLinks(taskId);
  const next = current.filter(v => v.bvid !== bvidOrAid && v.aid !== bvidOrAid);
  writeBiliVideoLinks(taskId, next);
}

/** 智能从本地持久化记录或任务描述中解析出关联的 B站 视频 */
export function getTaskBiliVideoLinks(taskId: string, description?: string, title?: string): BiliVideoLink[] {
  if (taskId) {
    try {
      const links = readBiliVideoLinks(taskId);
      if (links && links.length > 0) return links;
    } catch {}
  }

  // 兜底支持从任务描述/正文中的 B站 链接提取
  const text = `${description || ''} ${title || ''}`;
  const bvMatch = text.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/i) || text.match(/\b(BV[a-zA-Z0-9]{10})\b/);
  if (bvMatch) {
    const bvid = bvMatch[1];
    // 尝试提取标题
    let inferredTitle = '';
    const titleMatch = (title || '').match(/^(?:观看|看)?(?:看视频[:：]\s*)(.+)$/);
    if (titleMatch) {
      inferredTitle = titleMatch[1].trim();
    }
    // 尝试提取UP主
    let author = '';
    const authorMatch = (description || '').match(/UP主[:：]\s*([^\n\r]+)/);
    if (authorMatch) {
      author = authorMatch[1].trim();
    }
    return [{
      bvid,
      title: inferredTitle || bvid,
      author,
      url: `https://www.bilibili.com/video/${bvid}`
    }];
  }

  return [];
}
