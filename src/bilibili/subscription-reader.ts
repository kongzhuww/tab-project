/**
 * Read and assemble subscription editions without publishing UI or writing storage.
 * The service owns the active session, cache commits and archive write queue.
 */
import { bilibiliService } from "../services/bilibili.service";
import type { BiliSubChannelInfo, BiliSubEdition, BiliSubState } from "./channel-types";

export interface SubscriptionReadInput {
  channelKey: string;
  channel: BiliSubChannelInfo | undefined;
  cache: BiliSubState["cache"][string] | undefined;
  visibleCount: number;
  force: boolean;
  signal: AbortSignal;
  readArchive: (signal: AbortSignal) => Promise<Record<string, unknown> | undefined>;
}

export interface SubscriptionReadResult {
  editions: BiliSubEdition[];
  cached: boolean;
}

export async function readSubscriptionEditions(input: SubscriptionReadInput): Promise<SubscriptionReadResult> {
  const { channelKey, channel, cache, visibleCount, force, signal, readArchive } = input;
  signal.throwIfAborted();
  if (!channel) throw new Error("订阅频道不存在");
  if (!force && cache && Date.now() - cache.at < 10 * 60 * 1000 && cache.editions?.length) {
    let remaining = visibleCount;
    const editions = cache.editions.map(edition => {
      const documents = edition.documents.slice(0, remaining);
      remaining -= documents.length;
      return { ...edition, documents };
    }).filter(edition => edition.documents.length);
    return { editions, cached: true };
  }

  const archive = (await readArchive(signal)) || {};
  const savedEditions: BiliSubEdition[] = Array.isArray(archive[channelKey]) ? archive[channelKey] : [];
  const json = await bilibiliService.api<any>(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${channel.mid}`, { signal });
  signal.throwIfAborted();
  if (!Array.isArray(json?.items)) throw new Error("订阅动态返回格式异常");
  const rawItems = json.items;
  const videos = rawItems
    .map((item: any) => {
      const modules = item?.modules || {};
      const author = modules.module_author || {};
      const dynamic = modules.module_dynamic || {};
      const archiveModule = dynamic.major?.archive || {};
      const bvid = archiveModule.bvid || "";
      if (!bvid) return null;
      return {
        bvid,
        title: archiveModule.title || dynamic.desc?.text || "视频投稿",
        desc: dynamic.desc?.text || archiveModule.desc || "",
        cover: (archiveModule.cover || "").replace(/^http:/, "https:"),
        pubTs: Number(author.pub_ts || item.pub_ts || 0),
        author: author.name || channel.fallbackName,
        play: archiveModule.stat?.play || 0,
        danmaku: archiveModule.stat?.danmaku || 0,
        durationText: archiveModule.duration_text || "",
        mid: channel.mid
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.pubTs - a.pubTs)
    .slice(0, visibleCount);
  const dateKeyOf = (ts: number) => {
    const d = new Date(ts * 1000);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const editions: BiliSubEdition[] = [];
  for (const video of videos) {
    signal.throwIfAborted();
    const date = dateKeyOf(video.pubTs);
    let edition = editions.find(item => item.date === date);
    if (!edition) {
      edition = { date, documents: [], createdAt: Date.now() };
      editions.push(edition);
    }
    const saved = !force ? savedEditions.find(item => item.date === date)?.documents?.find(item => item.bvid === video.bvid) : null;
    // Retry historical empty/failure placeholders instead of treating them as verified subtitles.
    if (saved?.hasSubtitle) {
      edition.documents.push(saved);
      continue;
    }
    const subtitle = await bilibiliService.fetchVideoSubtitleDetails(video.bvid, undefined, signal);
    signal.throwIfAborted();
    edition.documents.push({
      ...video,
      aid: subtitle.aid || null,
      text: subtitle.ok ? (subtitle.bodyText || video.desc || "没有字幕") : (video.desc || "没有字幕"),
      cues: subtitle.cues || [],
      hasSubtitle: subtitle.ok,
      viewPoints: subtitle.viewPoints || []
    });
  }
  return { editions, cached: false };
}
