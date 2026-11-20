<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { bilibiliService, type BiliDanmakuItem } from '../services/bilibili.service';
import { findDanmakuIndex, takeDanmakuAtTime } from './danmaku-timeline';

const props = defineProps<{ bvid: string; cid: string | number | null; video: HTMLVideoElement | null }>();
const enabled = ref(true);
const paused = ref(true);
const bullets = ref<Array<{ id: string; text: string; color: string; top: number; mode: number }>>([]);
let list: BiliDanmakuItem[] = [];
let index = 0;
let lastTime = 0;
let generation = 0;
let nextId = 0;
const occupied = Array<number>(8).fill(0);

function reset(time = 0) {
  bullets.value = [];
  occupied.fill(0);
  index = findDanmakuIndex(list, Math.max(0, time));
  lastTime = time;
}
function update() {
  const video = props.video;
  if (!video || !enabled.value || !list.length) return;
  const time = video.currentTime;
  if (Math.abs(time - lastTime) > 1.5) { reset(time); return; }
  const batch = takeDanmakuAtTime(list, index, time);
  index = batch.index;
  const now = performance.now();
  const tracks = Math.max(3, Math.min(8, Math.floor(((video.parentElement?.clientHeight || 240) - 45) / 26)));
  for (const item of batch.items) {
    let lane = 0;
    for (let i = 0; i < tracks; i++) {
      if (occupied[i] <= now) { lane = i; break; }
      if (occupied[i] < occupied[lane]) lane = i;
    }
    occupied[lane] = now + Math.max(1000, item.text.length * 110);
    bullets.value.push({ id: `${++nextId}`, text: item.text, color: item.color, top: lane * 26 + 8, mode: item.mode });
  }
  lastTime = time;
}
function onSeeked() { reset(props.video?.currentTime || 0); }
function onPlay() { paused.value = false; }
function onPause() { paused.value = true; }
function remove(id: string) { bullets.value = bullets.value.filter(bullet => bullet.id !== id); }
function toggle() {
  enabled.value = !enabled.value;
  reset(props.video?.currentTime || 0);
}

watch(() => [props.bvid, props.cid] as const, async ([bvid, cid], _old, onCleanup) => {
  const run = ++generation;
  onCleanup(() => { generation++; });
  list = []; reset();
  if (!bvid) return;
  try {
    const resolvedCid = cid || (await bilibiliService.getVideoView(bvid))?.cid;
    if (!resolvedCid || run !== generation) return;
    const result = await bilibiliService.getVideoDanmaku(resolvedCid);
    if (run !== generation) return;
    list = result;
    reset(props.video?.currentTime || 0);
  } catch (error) { console.warn('[BiliSubscriptionDanmaku] 弹幕读取失败', error); }
}, { immediate: true });

watch(() => props.video, (video, _old, onCleanup) => {
  if (!video) return;
  paused.value = video.paused;
  video.addEventListener('timeupdate', update);
  video.addEventListener('seeked', onSeeked);
  video.addEventListener('play', onPlay);
  video.addEventListener('pause', onPause);
  video.addEventListener('ended', onPause);
  onCleanup(() => {
    video.removeEventListener('timeupdate', update);
    video.removeEventListener('seeked', onSeeked);
    video.removeEventListener('play', onPlay);
    video.removeEventListener('pause', onPause);
    video.removeEventListener('ended', onPause);
  });
}, { immediate: true });
onUnmounted(() => { generation++; });
</script>

<template>
  <div v-show="enabled" class="bili-danmaku-stage" :class="{ 'is-paused': paused }" aria-hidden="true">
    <div v-for="bullet in bullets" :key="bullet.id" class="bili-danmaku-bullet"
      :class="{ 'is-top': bullet.mode === 5, 'is-bottom': bullet.mode === 4 }"
      :style="{ top: `${bullet.top}px`, color: bullet.color, animationDuration: '5.5s' }"
      @animationend="remove(bullet.id)">{{ bullet.text }}</div>
  </div>
  <button class="bili-sub-danmaku-toggle" type="button" :aria-pressed="enabled" @click.stop="toggle">
    弹幕 {{ enabled ? '开' : '关' }}
  </button>
</template>
