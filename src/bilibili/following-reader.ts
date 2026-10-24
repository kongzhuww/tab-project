/**
 * Read the following feed or aggregate a group into a private draft.
 * No UI publication, shared-state commits or storage writes.
 * Session checks and read-only dependencies are supplied by the coordinator.
 */
import { bilibiliService } from "../services/bilibili.service";
import { parseDurationToSeconds } from "./channel-format";
import { collectBiliGroupMids } from "./up-group-tree";
import type { BiliFeedState, BiliFollowedUp, BiliRecentVideo, BiliUpGroup } from "./channel-types";

export interface FollowingAggregateCache {
  timestamp: number;
  videos: BiliRecentVideo[];
}

export interface FollowingReadInput {
  feed: Readonly<BiliFeedState>;
  followings: BiliFollowedUp[];
  reset: boolean;
  signal: AbortSignal;
  check: () => void;
  readStorage: (signal: AbortSignal) => Promise<Record<string, any>>;
  getAggregateCache: (key: string) => FollowingAggregateCache | undefined;
  readUpVideos: (mid: string, limit: number, signal: AbortSignal) => Promise<BiliRecentVideo[]>;
}

export interface FollowingReadResult {
  feed: BiliFeedState;
  groups: BiliUpGroup[];
  followings: BiliFollowedUp[];
  aggregateCache: { key: string; videos: BiliRecentVideo[] } | null;
}

export async function readFollowingFeed(input: FollowingReadInput): Promise<FollowingReadResult> {
  const { reset, signal, check, readStorage, getAggregateCache, readUpVideos } = input;
  const draft: BiliFeedState = { ...input.feed, offsetHistory: [...input.feed.offsetHistory] };
  let followings = input.followings;
  let aggregateCache: FollowingReadResult["aggregateCache"] = null;
  const user = await bilibiliService.api<any>("https://api.bilibili.com/x/web-interface/nav", { signal });
  check();
  if (!user.isLogin) throw new Error("未登录 B站");

  // Read only: rendering a feed must not trigger historical group cleanup writes.
  const stored = await readStorage(signal);
  check();
  const excluded = new Set((Array.isArray(stored.biliUnfollowedMidsV1) ? stored.biliUnfollowedMidsV1 : []).map(String));
  const groups = (Array.isArray(stored.biliFollowingGroupsV1) ? stored.biliFollowingGroupsV1 : []).map((group: BiliUpGroup) => ({
    ...group, upMids: (Array.isArray(group.upMids) ? group.upMids : []).filter(mid => !excluded.has(String(mid)))
  }));
  if (Array.isArray(stored.biliFollowingsCacheV1?.list)) followings = stored.biliFollowingsCacheV1.list.filter((up: BiliFollowedUp) => !excluded.has(String(up.mid)));
  const currentGroupId = draft.currentGroupId;

  // 分组聚合动态
  if (currentGroupId && currentGroupId !== "__all__") {
    const currentGroup = groups.find((g) => g.id === currentGroupId);
    if (!currentGroup) {
      draft.videos = [];
      draft.hasMore = false;
      return { feed: draft, groups, followings, aggregateCache };
    }

    const allGroupMids = collectBiliGroupMids(groups, currentGroupId);
    if (!allGroupMids.length) {
      draft.videos = [];
      draft.hasMore = false;
      return { feed: draft, groups, followings, aggregateCache };
    }

    let midsToFetch = allGroupMids;
    if (draft.selectedUpMid) {
      if (!allGroupMids.includes(draft.selectedUpMid)) throw new Error("该 UP 已不在当前分组，请重新选择");
      midsToFetch = [draft.selectedUpMid];
    }

    const cacheKey = JSON.stringify([String(user.mid), currentGroupId, draft.selectedUpMid, [...allGroupMids].sort()]);
    const cachedAgg = getAggregateCache(cacheKey);
    let aggregated: BiliRecentVideo[] = [];

    if (!reset && cachedAgg && Date.now() - cachedAgg.timestamp < 90000) {
      aggregated = cachedAgg.videos;
    } else {
      const perUpLimit = draft.selectedUpMid ? 24 : Math.max(4, Math.ceil(24 / Math.min(midsToFetch.length, 8)));
      const concurrency = 6;
      for (let i = 0; i < midsToFetch.length; i += concurrency) {
        const chunk = midsToFetch.slice(i, i + concurrency);
        const results = await Promise.allSettled(chunk.map((mid) => readUpVideos(mid, perUpLimit, signal)));
        check();
        if (results.some(r => r.status === "rejected")) throw new Error("部分 UP 动态读取失败，请手动重试");
        results.forEach((r) => {
          if (r.status === "fulfilled" && Array.isArray(r.value)) {
            aggregated.push(...r.value);
          }
        });
      }
      aggregated.sort((a, b) => (b.pubTs || 0) - (a.pubTs || 0));
      aggregateCache = { key: cacheKey, videos: aggregated };
    }

    const pageSize = draft.pageSize || 24;
    const startIndex = (draft.page - 1) * pageSize;
    const pagedVideos = aggregated.slice(startIndex, startIndex + pageSize);

    draft.videos = pagedVideos;
    draft.hasMore = aggregated.length > startIndex + pageSize;
    return { feed: draft, groups, followings, aggregateCache };
  }

  // 全局关注动态
  const targetCount = draft.pageSize || 24;
  const parsedVideos: BiliRecentVideo[] = [];
  let currentOffset = draft.offsetHistory[draft.page - 1] || "";
  let loopCount = 0;

  while (parsedVideos.length < targetCount && loopCount < 4) {
    loopCount++;
    const params = new URLSearchParams({
      timezone_offset: "-480",
      type: "video",
      features: "itemOpusStyle,listOnlyfans,opusBigCover,decorationCard,forwardListHidden"
    });
    if (currentOffset) params.set("offset", currentOffset);
    if (draft.updateBaseline) params.set("update_baseline", draft.updateBaseline);

    const res = await bilibiliService.api<any>(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?${params.toString()}`, { signal });
    check();
    if (!Array.isArray(res?.items)) throw new Error("关注动态返回格式异常");
    const items = res?.items || [];
    draft.nextOffset = res?.offset || "";
    draft.hasMore = !!res?.has_more;
    if (res?.update_baseline) draft.updateBaseline = res.update_baseline;
    currentOffset = draft.nextOffset;

    for (const it of items) {
      const dyn = it?.modules?.module_dynamic || {};
      const major = dyn.major || {};
      const archive = major.archive || major.ugc_season?.sections?.[0]?.episodes?.[0]?.arc || dyn.major?.archive;
      if (!archive) continue;

      const author = it?.modules?.module_author || {};
      const pubTimeDesc = author.pub_time || (author.pub_ts ? new Date(author.pub_ts * 1000).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "近期");
      const stat = archive.stat || {};
      const play = Number(stat.play || 0);
      const bvid = (archive.bvid && String(archive.bvid).startsWith("BV")) ? String(archive.bvid) : "";
      const title = archive.title || it?.modules?.module_dynamic?.desc?.text || "未命名视频";
      const cover = archive.cover || "";
      const duration = Number(archive.duration_text ? parseDurationToSeconds(archive.duration_text) : (archive.duration || 0));

      parsedVideos.push({
        bvid,
        aid: archive.aid,
        title,
        cover,
        duration,
        play,
        upper: author.name || "关注的UP主",
        upMid: String(author.mid || ""),
        pubTs: author.pub_ts || 0,
        pubTimeDesc
      });

      if (parsedVideos.length >= targetCount) break;
    }

    if (!draft.hasMore || !currentOffset) break;
  }

  draft.videos = parsedVideos;
  return { feed: draft, groups, followings, aggregateCache };
}
