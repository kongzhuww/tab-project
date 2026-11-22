<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { onImeEnter } from "../core/ime-keyboard";
import { biliFavoritesController, biliFavoritesState } from "./bili-favorites-store";
import { bilibiliService } from "../services/bilibili.service";
import { attachBiliPlaybackSync, detachBiliPlaybackSync } from "./playback-sync";
import BiliRichText from "./BiliRichText.vue";
import { extractBiliCommentEmotes, extractBiliCommentMentions } from "./rich-text";
import { subscriptionSubtitleFollow } from "./subtitle-follow";
import BiliSubscriptionDanmaku from "./BiliSubscriptionDanmaku.vue";
import { parseCommentEmotePackages, type CommentEmotePackage } from "./comment-emotes";
import { imageViewerController } from "../viewers/image-viewer-store";
import BiliSubscriptionTranscript from "./BiliSubscriptionTranscript.vue";

interface CommentEntry {
  id: string | number;
  userName: string;
  avatar: string;
  level: number;
  message: string;
  emotes?: Record<string, string>;
  mentions?: Record<string, string>;
  timeStr: string;
  likeCount: number;
  replyCount: number;
  pictures: string[];
  replies: Array<{
    id: string | number;
    userName: string;
    message: string;
    emotes?: Record<string, string>;
    mentions?: Record<string, string>;
  }>;
  subRepliesExpanded?: boolean;
  subRepliesLoading?: boolean;
  subRepliesHasMore?: boolean;
  subRepliesPage?: number;
}

const current = computed(() => biliFavoritesState.organizer.subscriptionCurrent);

// 播放器状态
const videoRef = ref<HTMLVideoElement | null>(null);
const videoLoading = ref(false);
const useIframe = ref(false);
const iframeSrc = ref("");
const videoCid = ref<string | number | null>(null);

// 评论区状态
const currentAid = ref<string | number>("");
const currentSort = ref(1); // 1: 热度, 0: 时间
const currentPage = ref(1);
const comments = ref<CommentEntry[]>([]);
const commentsCountText = ref("0 条");
const commentsLoading = ref(false);
const loadingMore = ref(false);
const commentsError = ref("");
const hasMoreComments = ref(false);

// 评论输入与表情
const commentInput = ref("");
const commentInputRef = ref<HTMLInputElement | null>(null);
const sendingComment = ref(false);
const commentTip = ref("");
const isCommentTipError = ref(false);
const showEmotePicker = ref(false);
const loadingEmotes = ref(false);
const emotePackages = ref<CommentEmotePackage[]>([]);

let tipTimer: ReturnType<typeof setTimeout> | null = null;
let unsubscribeAction: (() => void) | null = null;

function showTip(text: string, isError = false) {
  commentTip.value = text;
  isCommentTipError.value = isError;
  if (tipTimer) clearTimeout(tipTimer);
  tipTimer = setTimeout(() => {
    commentTip.value = "";
  }, 3500);
}

function openTheater() {
  biliFavoritesController.dispatch("subscription-open-player");
}

function toggleDescPanel() {
  biliFavoritesController.dispatch("subscription-toggle-desc-panel");
}

function copyScript() {
  biliFavoritesController.dispatch(
    biliFavoritesState.organizer.showFullDescInRightPanel
      ? "subscription-copy-description"
      : "subscription-copy-script"
  );
}

function closeFullscreenPlayer() {
  biliFavoritesController.dispatch("organizer-open");
}

function onScrollStage(event: Event) {
  const el = event.currentTarget as HTMLElement | null;
  if (!el) return;
  if (el.scrollHeight - el.scrollTop - el.clientHeight < 180) {
    if (!loadingMore.value && hasMoreComments.value) {
      void loadMoreComments();
    }
  }
}

function copyDesc() {
  biliFavoritesController.dispatch("subscription-copy-description");
}

function openLightbox(sources: string[], index: number) {
  const src = sources[index];
  if (src) imageViewerController.open(src, current.value?.title ? `${current.value.title} · 评论图片` : "评论图片");
}

// 格式化评论时间
function formatCommentTime(ctime: number): string {
  if (!ctime) return "";
  const d = new Date(ctime * 1000);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "刚刚";
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y === now.getFullYear() ? `${m}-${day}` : `${y}-${m}-${day}`;
}

// 紧凑数字转换
function formatCompactNum(num: number): string {
  if (!num) return "0";
  if (num >= 10000) return (num / 10000).toFixed(1).replace(/\.0$/, "") + "万";
  return String(num);
}

// 加载评论数据
async function fetchComments(append = false) {
  if (!currentAid.value) return;
  if (!append) {
    commentsLoading.value = true;
    commentsError.value = "";
  } else {
    loadingMore.value = true;
  }

  try {
    const url = `https://api.bilibili.com/x/v2/reply?type=1&oid=${currentAid.value}&pn=${currentPage.value}&ps=20&sort=${currentSort.value}`;
    const resp = await fetch(url, { credentials: "include" });
    const res = await resp.json();
    if (res?.code !== 0 || !res?.data) {
      if (!append) {
        commentsError.value = res?.message || "评论加载失败或该视频已关闭评论";
        comments.value = [];
      }
      hasMoreComments.value = false;
      return;
    }

    const data = res.data;
    const totalCount = data.page?.count || 0;
    commentsCountText.value = `${formatCompactNum(totalCount)} 条`;

    const repliesList = Array.isArray(data.replies) ? data.replies : [];
    const entries: CommentEntry[] = repliesList.map((r: any) => {
      const emotes = extractBiliCommentEmotes(r.content);
      const mentions = extractBiliCommentMentions(r.content);
      const message = String(r.content?.message || "");
      const pictures: string[] = Array.isArray(r.content?.pictures)
        ? r.content.pictures.map((p: any) => String(p?.img_src || p).replace(/^http:/, "https:")).filter(Boolean)
        : [];
      const subReplies = Array.isArray(r.replies)
        ? r.replies.map((sub: any) => ({
            id: sub.rpid || Math.random(),
            userName: sub.member?.uname || "B站用户",
            message: String(sub.content?.message || ""),
            emotes: extractBiliCommentEmotes(sub.content),
            mentions: extractBiliCommentMentions(sub.content)
          }))
        : [];

      return {
        id: r.rpid || Math.random(),
        userName: r.member?.uname || "B站用户",
        avatar: String(r.member?.avatar || "").replace(/^http:/, "https:"),
        level: Number(r.member?.level_info?.current_level || 0),
        message,
        emotes,
        mentions,
        timeStr: formatCommentTime(r.ctime),
        likeCount: Number(r.like || 0),
        replyCount: Number(r.rcount || 0),
        pictures,
        replies: subReplies
      };
    });

    if (append) {
      comments.value = [...comments.value, ...entries];
    } else {
      comments.value = entries;
    }
    hasMoreComments.value = comments.value.length < totalCount;
  } catch (err: any) {
    if (!append) {
      commentsError.value = err?.message || "网络异常，未能加载评论";
    }
  } finally {
    commentsLoading.value = false;
    loadingMore.value = false;
  }
}

// 展开或加载更多楼中楼
async function expandSubReplies(rootRpid: string | number) {
  const comment = comments.value.find(c => String(c.id) === String(rootRpid));
  if (!comment || comment.subRepliesLoading || !currentAid.value) return;

  if (!comment.subRepliesPage) comment.subRepliesPage = 1;
  else comment.subRepliesPage++;

  comment.subRepliesLoading = true;
  comment.subRepliesExpanded = true;

  try {
    const res = await bilibiliService.getSubReplies(currentAid.value, rootRpid, comment.subRepliesPage, 10);
    const newReplies = (res.replies || []).map(r => ({
      id: String(r.rpid),
      userName: r.uname,
      message: r.message,
      emotes: r.emotes,
      mentions: r.mentions
    }));

    const existingIds = new Set((comment.replies || []).map(r => String(r.id)));
    const filtered = newReplies.filter(r => !existingIds.has(String(r.id)));
    comment.replies = [...(comment.replies || []), ...filtered];
    comment.subRepliesHasMore = res.hasMore;
  } catch {
    showTip("子回复加载失败", true);
  } finally {
    comment.subRepliesLoading = false;
  }
}

function collapseSubReplies(rootRpid: string | number) {
  const comment = comments.value.find(c => String(c.id) === String(rootRpid));
  if (comment) {
    comment.subRepliesExpanded = false;
  }
}

function changeSort(sort: number) {
  if (currentSort.value === sort) return;
  currentSort.value = sort;
  currentPage.value = 1;
  fetchComments(false);
}

function loadMoreComments() {
  if (loadingMore.value || !hasMoreComments.value) return;
  currentPage.value += 1;
  fetchComments(true);
}

// 表情面板
async function toggleEmotes() {
  showEmotePicker.value = !showEmotePicker.value;
  if (showEmotePicker.value && !emotePackages.value.length && !loadingEmotes.value) {
    loadingEmotes.value = true;
    try {
      const resp = await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" });
      const res = await resp.json();
      if (res?.code === 0 && Array.isArray(res?.data?.packages)) {
        emotePackages.value = parseCommentEmotePackages(res.data.packages);
      }
    } catch {
      // 忽略表情错误
    } finally {
      loadingEmotes.value = false;
    }
  }
}

function insertEmote(text: string) {
  const input = commentInputRef.value;
  if (!input) {
    commentInput.value += text;
  } else {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    commentInput.value = commentInput.value.slice(0, start) + text + commentInput.value.slice(end);
    nextTick(() => {
      input.focus();
      const caret = start + text.length;
      input.setSelectionRange(caret, caret);
    });
  }
  showEmotePicker.value = false;
}

// 发送评论
async function handleSendComment() {
  const text = commentInput.value.trim();
  if (!text) {
    showTip("请输入评论内容", true);
    return;
  }
  if (!currentAid.value) {
    showTip("未能识别视频 ID，无法发表评论", true);
    return;
  }

  const getJct = (window as unknown as { getBiliJct?: () => Promise<string> }).getBiliJct;
  let csrf = "";
  if (typeof getJct === "function") {
    csrf = await getJct();
  } else {
    try {
      const cookie = await (window as any).chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" });
      csrf = cookie?.value || "";
    } catch {
      csrf = "";
    }
  }

  if (!csrf) {
    showTip("未检测到 B站 登录态，请先登录 bilibili.com", true);
    return;
  }

  sendingComment.value = true;
  try {
    const body = new URLSearchParams({
      oid: String(currentAid.value),
      type: "1",
      message: text,
      plat: "1",
      csrf,
      csrf_token: csrf
    });
    const resp = await fetch("https://api.bilibili.com/x/v2/reply/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: body.toString()
    });
    const res = await resp.json();
    if (res?.code === 0) {
      commentInput.value = "";
      showTip("✓ 评论发表成功！", false);
      currentPage.value = 1;
      fetchComments(false);
    } else {
      showTip(`❌ 发送失败：${res?.message || res?.code}`, true);
    }
  } catch (err: any) {
    showTip(`❌ 发送出错：${err?.message || "网络异常"}`, true);
  } finally {
    sendingComment.value = false;
  }
}

// 载入当前视频与流解析
async function loadCurrentVideo(videoDoc: any) {
  if (!videoDoc?.bvid) return;

  // 0. 暂停页面上所有其他可能正在播放的视频与音频（包含小窗播放器、Mini Dock、电台、原声媒体等）
  if (typeof document !== "undefined") {
    document.querySelectorAll("video, audio").forEach((m) => {
      if (m !== videoRef.value && !(m as HTMLMediaElement).paused) {
        try { (m as HTMLMediaElement).pause(); } catch {}
      }
    });
    document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((m) => {
      try { (m as HTMLMediaElement).pause(); } catch {}
    });
  }
  if (videoRef.value && !videoRef.value.paused) {
    try { videoRef.value.pause(); } catch {}
  }

  videoLoading.value = true;
  useIframe.value = false;
  iframeSrc.value = "";
  videoCid.value = null;
  lastActiveSrtRow = null;

  // 1. 获取 aid
  let aid = videoDoc.aid;
  if (!aid) {
    try {
      const vRes = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${videoDoc.bvid}`, { credentials: "include" });
      const vj = await vRes.json();
      if (vj?.data?.aid) {
        aid = vj.data.aid;
      }
    } catch {}
  }
  if (current.value?.bvid !== videoDoc.bvid) return;
  currentAid.value = aid || "";

  // 2. 加载评论
  currentPage.value = 1;
  fetchComments(false);

  // 3. 解析视频流
  try {
    const track = await bilibiliService.resolvePlayStream(videoDoc);
    if (current.value?.bvid !== videoDoc.bvid) return;
    if (track?.sources?.length) {
      videoCid.value = track.cid;
      if (videoRef.value) {
        // 再次确保其它媒体处于暂停状态
        if (typeof document !== "undefined") {
          document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((m) => {
            try { (m as HTMLMediaElement).pause(); } catch {}
          });
        }
        videoRef.value.src = track.sources[0];
        videoRef.value.play().catch(() => {});
        void attachBiliPlaybackSync({ bvid: videoDoc.bvid, title: videoDoc.title, cover: videoDoc.cover }, videoRef.value);
      }
      videoLoading.value = false;
      return;
    }
  } catch (err) {
    console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", err);
  }

  // 4. 备用 iframe 播放
  if (current.value?.bvid !== videoDoc.bvid) return;
  useIframe.value = true;
  iframeSrc.value = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(videoDoc.bvid)}&autoplay=1&danmaku=1`;
  videoLoading.value = false;
}

// 视频播放进度与字幕行高亮联动
let lastActiveSrtRow: HTMLElement | null = null;

function onTimeUpdate() {
  if (!videoRef.value) return;
  const cur = videoRef.value.currentTime;

  // 联动高亮滚动台词行
  const srtRows = document.querySelectorAll(".bili-sub-srt-row");
  let activeFound = false;
  let activeRowEl: HTMLElement | null = null;
  for (let i = srtRows.length - 1; i >= 0; i--) {
    const row = srtRows[i];
    const from = Number(row.getAttribute("data-from") || 0);
    if (!activeFound && cur >= from) {
      row.classList.add("active");
      activeFound = true;
      activeRowEl = row as HTMLElement;
    } else {
      row.classList.remove("active");
    }
  }
  if (activeRowEl && activeRowEl !== lastActiveSrtRow) {
    lastActiveSrtRow = activeRowEl;
    subscriptionSubtitleFollow.follow();
  }
}

function onSeeked() {
  onTimeUpdate();
}

function onPlay() {
  onTimeUpdate();
  // The media was attached when its source was set; playback events update the lyrics.
}

// 监听 current 变更
watch(
  () => current.value?.bvid,
  () => {
    if (current.value) {
      loadCurrentVideo(current.value);
    }
  },
  { immediate: true }
);

onMounted(() => {
  unsubscribeAction = biliFavoritesController.onAction((action, payload) => {
    if (action === "subscription-seek") {
      const from = Number(payload?.from);
      if (videoRef.value && Number.isFinite(from)) {
        videoRef.value.currentTime = Math.max(0, from - 0.1);
        videoRef.value.play().catch(() => {});
      }
    }
  });
});

onUnmounted(() => {
  if (videoRef.value) {
    detachBiliPlaybackSync(videoRef.value);
    try {
      videoRef.value.pause();
      videoRef.value.src = "";
      videoRef.value.load();
    } catch {}
  }
  if (unsubscribeAction) unsubscribeAction();
  if (tipTimer) clearTimeout(tipTimer);
});
</script>

<template>
  <div v-if="current" class="bili-sub-layout bili-sub-vue-layout">
    <!-- 左栏：视频播放器 + 简介 + 滚动字幕 -->
    <aside class="bili-sub-player-column">
      <div class="bili-sub-sticky-player">
        <div class="bili-sub-player-card">
          <div class="bili-sub-vue-comment-handoff" hidden style="display:none !important;">
            <strong>播放器与评论区已统一到 Vue 本地影院</strong>
            <button type="button" @click="openTheater">打开播放器与评论区</button>
          </div>

          <!-- 上方：视频播放器 (16:9) -->
          <div class="bili-sub-video-box">
            <video
              ref="videoRef"
              class="bili-sub-native-video"
              controls
              playsinline
              :poster="current.cover"
              :hidden="useIframe"
              @timeupdate="onTimeUpdate"
              @seeked="onSeeked"
              @play="onPlay"
            ></video>
            <BiliSubscriptionDanmaku v-if="!useIframe && !videoLoading" :bvid="current.bvid" :cid="videoCid" :video="videoRef" />
            <iframe
              v-if="useIframe"
              class="bili-sub-native-iframe"
              allowfullscreen="true"
              allow="autoplay; fullscreen"
              :src="iframeSrc"
            ></iframe>
            <div v-if="videoLoading" class="bili-sub-video-loading">
              <i></i><span>正在解析登录高清视频流…</span>
            </div>
          </div>

          <div class="bili-sub-video-meta">
            <div class="bili-sub-video-meta-actions">
              <button
                type="button"
                class="bili-copy-desc-btn"
                @click="copyScript"
              >
                {{ biliFavoritesState.organizer.showFullDescInRightPanel ? '复制简介' : '复制稿子' }}
              </button>
              <button
                type="button"
                class="bili-copy-desc-btn"
                :title="biliFavoritesState.organizer.showFullDescInRightPanel ? '切回台词展示' : '展开完整视频简介'"
                @click="toggleDescPanel"
              >
                {{ biliFavoritesState.organizer.showFullDescInRightPanel ? '缩小简介' : '放大简介' }}
              </button>
            </div>
            <h4>{{ current.title }}</h4>
            <div class="bili-sub-meta-stats">
              <span>▣ 播放: {{ current.playCount }}</span>
              <span>💬 弹幕: {{ current.danmakuCount }}</span>
              <span>⏱ {{ current.duration }}</span>
            </div>
            <p class="bili-sub-meta-desc"><BiliRichText :text="current.description || '暂无简介'" /></p>
          </div>

          <!-- 左栏下方：滚动台词 / 简介 -->
          <BiliSubscriptionTranscript class="bili-sub-inline-transcript" />
        </div>
      </div>
    </aside>

    <!-- 右栏：完整评论区（右上角自带关闭 × 按钮） -->
    <section class="bili-sub-comments-column">
      <div class="bili-sub-comments-section bili-sub-comments-panel" id="bili-sub-comments-section">
        <div class="bili-mini-comments-head">
          <div class="bili-mini-comments-meta">
            <span>💬 评论</span>
            <span class="bili-mini-comments-count bili-sub-comments-count">{{ commentsCountText }}</span>
          </div>
          <div class="bili-sub-comments-head-right">
            <div class="bili-mini-comments-sort">
              <button type="button" class="bili-mini-sort-btn" :class="{ active: currentSort === 1 }" @click="changeSort(1)">按热度</button>
              <button type="button" class="bili-mini-sort-btn" :class="{ active: currentSort === 0 }" @click="changeSort(0)">按时间</button>
            </div>
            <button type="button" class="bili-sub-close-btn" title="退出全屏返回" aria-label="关闭全屏播放" @click="closeFullscreenPlayer">✕</button>
          </div>
        </div>

        <div class="bili-sub-comment-composer">
          <button type="button" class="bili-sub-emote-button" :class="{ on: showEmotePicker }" title="选择 B站 表情" @click="toggleEmotes">☺</button>
          <input
            ref="commentInputRef"
            v-model="commentInput"
            type="text"
            class="bili-sub-comment-input"
            placeholder="发一条友善的评论吧…（Enter 发送）"
            maxlength="500"
            @keydown="onImeEnter($event, handleSendComment)"
          />
          <button type="button" class="bili-sub-comment-send-btn" :disabled="sendingComment || !commentInput.trim()" @click="handleSendComment">
            {{ sendingComment ? '发送中…' : '发送' }}
          </button>
        </div>

        <!-- 表情选择抽屉 -->
        <div v-if="showEmotePicker" class="bili-sub-emote-picker">
          <div v-if="loadingEmotes" class="fo-bili-loading"><i></i><span>正在读取 B站 表情包…</span></div>
          <div v-else>
            <section v-for="pack in emotePackages" :key="pack.text" class="bili-sub-emote-group">
              <h5>{{ pack.text || 'B站表情' }}</h5>
              <div :class="{ 'bili-sub-text-emotes': pack.text.includes('颜文字') }">
                <button
                  v-for="emote in pack.emote"
                  :key="emote.text"
                  type="button"
                  class="bili-sub-emote-item"
                  :title="emote.text"
                  @click="insertEmote(emote.text)"
                >
                  <img v-if="emote.url && !emote.textOnly && !emote.failed" :src="emote.url" :alt="emote.text" referrerpolicy="no-referrer" @error="emote.failed = true" />
                  <span v-else>{{ emote.text }}</span>
                </button>
              </div>
            </section>
          </div>
        </div>

        <div v-if="commentTip" class="bili-sub-comment-tip" :class="{ error: isCommentTipError }">{{ commentTip }}</div>

        <!-- 评论列表独立滚动容器 -->
        <div class="bili-sub-scroll-stage bili-sub-comments-scroll" @scroll.passive="onScrollStage">
          <div class="bili-mini-comments-body bili-sub-comments-body">
            <p v-if="commentsLoading && !comments.length" class="muted small" style="text-align:center;padding:16px 0;">正在加载评论…</p>
            <p v-else-if="commentsError && !comments.length" class="muted small" style="text-align:center;padding:16px 0;">{{ commentsError }}</p>
            <div v-for="c in comments" :key="c.id" class="bili-comment-item">
              <img class="bili-comment-avatar" :src="c.avatar" alt="" loading="lazy" referrerpolicy="no-referrer" />
              <div class="bili-comment-main">
                <div class="bili-comment-user-row">
                  <span class="bili-comment-uname">{{ c.userName }}</span>
                  <span v-if="c.level" class="bili-comment-level">LV{{ c.level }}</span>
                  <span class="bili-comment-time">{{ c.timeStr }}</span>
                </div>
                <div class="bili-comment-text">
                  <BiliRichText :text="c.message" :emotes="c.emotes" :mentions="c.mentions" />
                </div>
                <div v-if="c.pictures?.length" class="bili-comment-pictures">
                  <a v-for="(pic, pIdx) in c.pictures" :key="pIdx" class="bili-comment-pic-link" :href="pic" @click.stop.prevent="openLightbox(c.pictures, pIdx)">
                    <img class="bili-comment-pic" :src="pic" alt="评论图片" loading="lazy" referrerpolicy="no-referrer" />
                  </a>
                </div>
                <div class="bili-comment-actions">
                  <span v-if="c.likeCount">👍 {{ c.likeCount }}</span>
                  <span v-if="c.replyCount">💬 {{ c.replyCount }}</span>
                </div>
                <div v-if="c.replies?.length" class="bili-comment-sub-list">
                  <div v-for="sub in c.replies" :key="sub.id" class="bili-comment-sub-item">
                    <span class="bili-comment-sub-uname">{{ sub.userName }}:</span>
                    <BiliRichText :text="sub.message" :emotes="sub.emotes" :mentions="sub.mentions" />
                  </div>
                  <div class="bili-comment-sub-more">
                    <template v-if="!c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length">
                      <span>共 {{ c.replyCount }} 条回复，</span>
                      <button
                        type="button"
                        class="bili-comment-sub-expand-btn"
                        :disabled="c.subRepliesLoading"
                        @click.stop="expandSubReplies(c.id)"
                      >
                        {{ c.subRepliesLoading ? '正在加载回复…' : '点击查看 ›' }}
                      </button>
                    </template>
                    <template v-else-if="c.subRepliesExpanded">
                      <button
                        v-if="c.subRepliesHasMore"
                        type="button"
                        class="bili-comment-sub-expand-btn"
                        :disabled="c.subRepliesLoading"
                        @click.stop="expandSubReplies(c.id)"
                      >
                        {{ c.subRepliesLoading ? '正在加载更多…' : '加载更多回复 ›' }}
                      </button>
                      <button
                        type="button"
                        class="bili-comment-sub-collapse-btn"
                        @click.stop="collapseSubReplies(c.id)"
                      >
                        收起 ▴
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bili-sub-comments-infinite-trigger">
            <p v-if="loadingMore" class="muted small" style="text-align: center; padding: 12px 0;">正在加载更多评论…</p>
            <p v-else-if="!hasMoreComments && comments.length" class="muted small" style="text-align: center; padding: 12px 0; opacity: 0.6;">已显示全部评论</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <p v-else class="fo-bili-empty">暂无可播放的视频。</p>
</template>

<style scoped>
.bili-sub-video-meta-actions {
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
}
.bili-sub-theater-pop-btn {
  color: #00aeec;
  border-color: rgba(0, 174, 236, 0.4);
}
.bili-sub-theater-pop-btn:hover {
  background: rgba(0, 174, 236, 0.12);
}
</style>
