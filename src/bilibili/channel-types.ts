/** Shared channel contracts; type-only dependencies, no service initialization. */
import type { BiliSubtitleCue } from "../services/bilibili.service";

export interface BiliUpGroup {
  id: string;
  name: string;
  parentId: string | null;
  upMids: string[];
  createdAt?: number;
  depth?: number;
}

export interface BiliFollowedUp {
  mid: string;
  name: string;
  face: string;
  sign: string;
  groupIds?: string[];
  groupName?: string;
}

export interface BiliRecentVideo {
  bvid: string;
  aid?: string | number;
  title: string;
  cover: string;
  duration: number;
  play: number;
  upper: string;
  upMid: string;
  pubTs: number;
  pubTimeDesc: string;
}

export interface BiliFeedState {
  videos: BiliRecentVideo[];
  page: number;
  pageSize: number;
  offsetHistory: string[];
  currentOffset: string;
  nextOffset: string;
  updateBaseline: string;
  hasMore: boolean;
  loading: boolean;
  pendingScroll: boolean;
  currentGroupId: string;
  selectedUpMid: string;
}

export interface BiliUpGroupsState {
  groups: BiliUpGroup[];
  followingsCache: BiliFollowedUp[];
  loadingFollowings: boolean;
  selectedManageGroupId: string;
}

export interface BiliRcmdState {
  videos: BiliRecentVideo[];
  page: number;
  pageSize: number;
  freshIdx: number;
  loading: boolean;
  pendingScroll: boolean;
}

export interface BiliSubChannelInfo {
  mid: string;
  fallbackName: string;
  title: string;
  defaultTitle?: string;
  builtin?: boolean;
  custom?: boolean;
}

export interface BiliSubDocument {
  bvid: string;
  aid?: string | number | null;
  title: string;
  desc?: string;
  cover: string;
  pubTs: number;
  author: string;
  play?: number;
  danmaku?: number;
  durationText?: string;
  text?: string;
  cues?: BiliSubtitleCue[];
  hasSubtitle?: boolean;
  viewPoints?: any[];
}

export interface BiliSubEdition {
  date: string;
  documents: BiliSubDocument[];
  createdAt: number;
}

export interface BiliVideoChapter {
  id: number;
  from: number;
  to: number;
  title: string;
  fromText?: string;
  toText?: string;
  paragraphs?: string[];
  paragraphCues?: { index: number; from: number; to: number; timeText?: string; content: string }[][];
  cues?: { index: number; from: number; to: number; timeText?: string; content: string }[];
  source: string;
}

export interface BiliSubState {
  channelKey: string;
  viewMode: "srt" | "lyrics";
  loading: boolean;
  editions: BiliSubEdition[];
  activeDate: string;
  activeDocBvid: string;
  visibleCounts: Record<string, number>;
  cache: Record<string, { at: number; editions: BiliSubEdition[] }>;
}
