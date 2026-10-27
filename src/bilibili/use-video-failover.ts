import { watch, type Ref } from 'vue';

// Native player only: each URL is tried once, at most three sources, no new API requests.
export function useVideoFailover(
  state: { videoSrc: string; sourceUrls: string[]; isOpen: boolean; useIframe: boolean; isLoading?: boolean },
  media: Ref<HTMLVideoElement | null>,
  exhausted: () => void
) {
  let resume: { time: number; paused: boolean; rate: number } | null = null;
  let sourceSet: string[] | null = null;
  let tried = new Set<string>();
  watch(() => [media.value, state.videoSrc, state.sourceUrls, state.isOpen, state.useIframe] as const,
    ([video, src, urls, open, iframe], _, onCleanup) => {
      if (sourceSet !== urls) { sourceSet = urls; tried = new Set(); resume = null; }
      if (!video || !open || iframe || !src || src.startsWith('blob:')) return;
      tried.add(src);
      let done = false;
      let lastProgress = Date.now();
      let lastTime = video.currentTime;
      let lastBuffer = 0;
      const advance = () => {
        if (done || state.isLoading || state.videoSrc !== src) return;
        done = true;
        const next = tried.size < 3 ? urls.find(url => !tried.has(url) && /^https:\/\//i.test(url)) : undefined;
        if (!next) { resume = null; video.pause(); exhausted(); return; }
        // Preserve an outstanding seek if another source fails before metadata arrives.
        resume ||= { time: Number.isFinite(video.currentTime) ? video.currentTime : 0, paused: video.paused && video.readyState >= 2, rate: video.playbackRate };
        state.videoSrc = next;
      };
      const error = () => { if (video.error?.code === 2 || video.error?.code === 4) advance(); };
      const metadata = () => {
        if (!resume) return;
        const saved = resume; resume = null;
        if (saved.time > 0) {
          try { video.currentTime = Number.isFinite(video.duration) ? Math.min(saved.time, Math.max(0, video.duration - 0.1)) : saved.time; } catch {}
        }
        video.playbackRate = saved.rate;
        if (saved.paused) video.pause(); else void video.play().catch(() => {});
      };
      video.addEventListener('error', error);
      video.addEventListener('loadedmetadata', metadata);
      const timer = setInterval(() => {
        if (done || state.isLoading || document.hidden || video.ended || (video.paused && video.readyState >= 2)) { lastProgress = Date.now(); return; }
        const end = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
        if (video.currentTime !== lastTime || end > lastBuffer) lastProgress = Date.now();
        lastTime = video.currentTime; lastBuffer = end;
        if (Date.now() - lastProgress >= 15000 && video.readyState < 3) advance();
      }, 1000);
      onCleanup(() => {
        clearInterval(timer);
        video.removeEventListener('error', error);
        video.removeEventListener('loadedmetadata', metadata);
      });
    }, { flush: 'post', immediate: true });
}
