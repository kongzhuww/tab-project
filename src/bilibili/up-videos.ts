/**
 * UP 主近期投稿视频读取与短期内存缓存（5分钟）。
 * 优先使用投稿媒体库，备用降级为空间动态流。
 */
import { bilibiliService } from "../services/bilibili.service";
import { parseDurationToSeconds } from "./channel-format";
import type { BiliRecentVideo } from "./channel-types";

const upRecentVideosCache = new Map<string, { timestamp: number; videos: BiliRecentVideo[] }>();
const upRecentVideosPending = new Map<string, Promise<BiliRecentVideo[]>>();

export function clearUpRecentVideosCache(mid?: string | number): void {
  if (mid != null) {
    upRecentVideosCache.delete(String(mid));
  } else {
    upRecentVideosCache.clear();
  }
}

export async function fetchUpLatestVideos(
  mid: string | number,
  limit = 6,
  signal?: AbortSignal
): Promise<BiliRecentVideo[]> {
  signal?.throwIfAborted();
  const midStr = String(mid);
  const cached = upRecentVideosCache.get(midStr);
  if (!signal && cached && Date.now() - cached.timestamp < 300000) {
    return cached.videos.slice(0, limit);
  }
  if (!signal && upRecentVideosPending.has(midStr)) {
    try {
      const v = await upRecentVideosPending.get(midStr);
      return (v || []).slice(0, limit);
    } catch {
      return [];
    }
  }

  const reqPromise = (async (): Promise<BiliRecentVideo[]> => {
    try {
      // 1. 优先使用投稿媒体库
      try {
        const medialistRes = await bilibiliService.api<any>(
          `https://api.bilibili.com/x/v2/medialist/resource/list?type=1&biz_id=${midStr}&ps=${Math.max(limit, 6)}`,
          { signal }
        );
        signal?.throwIfAborted();
        if (Array.isArray(medialistRes?.media_list) && medialistRes.media_list.length > 0) {
          const videos: BiliRecentVideo[] = [];
          for (const it of medialistRes.media_list) {
            const bvid = it.bv_id || (it.id ? `av${it.id}` : "");
            const pubTs = Number(it.pubtime || 0);
            let pubTimeDesc = "最新";
            if (pubTs > 0) {
              const d = new Date(pubTs * 1000);
              const now = new Date();
              if (d.getFullYear() === now.getFullYear()) {
                pubTimeDesc = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              } else {
                pubTimeDesc = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              }
            }
            videos.push({
              bvid,
              aid: it.id,
              title: it.title || "未命名视频",
              cover: (it.cover || "").replace(/^http:/, "https:"),
              duration: Number(it.duration || 0),
              play: Number(it.cnt_info?.play || 0),
              upper: it.upper?.name || "关注的UP主",
              upMid: midStr,
              pubTs,
              pubTimeDesc
            });
            if (videos.length >= limit) break;
          }
          if (videos.length > 0) {
            if (!signal) upRecentVideosCache.set(midStr, { timestamp: Date.now(), videos });
            return videos;
          }
        }
      } catch (error) {
        if (signal?.aborted) throw error;
      }

      // 2. 备用：空间动态流
      const res = await bilibiliService.api<any>(
        `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${midStr}&features=itemOpusStyle`,
        { signal }
      );
      signal?.throwIfAborted();
      if (!Array.isArray(res?.items)) {
        if (signal) throw new Error("UP 动态返回格式异常");
        return [];
      }
      const videos: BiliRecentVideo[] = [];
      for (const it of res.items) {
        const dyn = it?.modules?.module_dynamic || {};
        const major = dyn.major || {};
        const archive = major.archive || major.ugc_season?.sections?.[0]?.episodes?.[0]?.arc || dyn.major?.archive;
        if (!archive) continue;

        const author = it?.modules?.module_author || {};
        const pubTs = author.pub_ts || (author.pub_time ? Math.floor(new Date(author.pub_time).getTime() / 1000) : 0);
        const pubTimeDesc = author.pub_time || (author.pub_ts ? new Date(author.pub_ts * 1000).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "近期");
        const stat = archive.stat || {};
        const play = Number(stat.play || 0);
        const bvid = archive.bvid || (archive.aid ? `av${archive.aid}` : "");
        const title = archive.title || it?.modules?.module_dynamic?.desc?.text || "未命名视频";
        const cover = (archive.cover || "").replace(/^http:/, "https:");
        const duration = Number(archive.duration_text ? parseDurationToSeconds(archive.duration_text) : (archive.duration || 0));

        videos.push({
          bvid,
          aid: archive.aid,
          title,
          cover,
          duration,
          play,
          upper: author.name || "关注的UP主",
          upMid: midStr,
          pubTs,
          pubTimeDesc
        });
        if (videos.length >= limit) break;
      }
      if (!signal) upRecentVideosCache.set(midStr, { timestamp: Date.now(), videos });
      return videos;
    } catch (e) {
      if (signal) throw e;
      console.warn(`读取 UP ${mid} 视频失败:`, e);
      return [];
    } finally {
      if (!signal) upRecentVideosPending.delete(midStr);
    }
  })();

  if (!signal) upRecentVideosPending.set(midStr, reqPromise);
  const result = await reqPromise;
  return (result || []).slice(0, limit);
}
