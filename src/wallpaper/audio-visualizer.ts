/**
 * Wallpaper Engine 128 位双声道归一化音频频谱推流管道
 * 严格符合 Wallpaper Engine 规范：
 * 接收长度为 128 的浮点数组 (0.0 ~ 1.0)
 * [0 ~ 63]: 左声道低频到高频 (对数频率划分，拒绝低频挤压)
 * [64 ~ 127]: 右声道低频到高频
 */

import { musicService } from "../services/music.service";
import { biliRadioPlayer } from "../bilibili/radio-player";

const FFT_SIZE = 1024;
const BIN_COUNT = FFT_SIZE / 2; // 512 bins
const BINS_PER_CHANNEL = 64;

let audioCtx: AudioContext | null = null;
let leftAnalyser: AnalyserNode | null = null;
let rightAnalyser: AnalyserNode | null = null;

// 使用 WeakMap 缓存每个 HTMLAudioElement 的 MediaElementAudioSourceNode，防止重复创建触发 InvalidStateError
const sourceNodeCache = new WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>();
let currentAttachedAudio: HTMLAudioElement | null = null;

let animFrameId: number | null = null;
let targetWindow: Window | null = null;
let isStreaming = false;
let lastTickTime = 0;
let silentFrameCount = 0;
let listenersBound = false;

// 预分配复用数组，杜绝 GC 抖动
const rawLeftFreq = new Uint8Array(BIN_COUNT);
const rawRightFreq = new Uint8Array(BIN_COUNT);
const outBuffer = new Array<number>(128).fill(0);
const zeroBuffer = new Array<number>(128).fill(0);

// 对数频率区间预分配表 (Logarithmic Binning Table)
// 前期低频段 (0~1000Hz) 单 bin 独占保真，后期高频段平滑聚合，彻底解决低频挤压
const binBoundaries: Array<[number, number]> = [];
for (let i = 0; i < BINS_PER_CHANNEL; i++) {
  const startIdx = Math.floor(i + Math.pow(i / BINS_PER_CHANNEL, 3.2) * (BIN_COUNT - BINS_PER_CHANNEL));
  const endIdx = Math.min(
    BIN_COUNT - 1,
    Math.max(startIdx, Math.floor((i + 1) + Math.pow((i + 1) / BINS_PER_CHANNEL, 3.2) * (BIN_COUNT - BINS_PER_CHANNEL) - 1))
  );
  binBoundaries.push([startIdx, endIdx]);
}

/**
 * 初始化 Web Audio 上下文与双声道分析器 (FFT = 1024)
 */
function ensureAudioContext(): boolean {
  if (audioCtx && leftAnalyser && rightAnalyser) return true;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return false;

    audioCtx = new AudioContextClass();
    const splitter = audioCtx.createChannelSplitter(2);

    leftAnalyser = audioCtx.createAnalyser();
    leftAnalyser.fftSize = FFT_SIZE;
    leftAnalyser.smoothingTimeConstant = 0.82;

    rightAnalyser = audioCtx.createAnalyser();
    rightAnalyser.fftSize = FFT_SIZE;
    rightAnalyser.smoothingTimeConstant = 0.82;

    splitter.connect(leftAnalyser, 0);
    splitter.connect(rightAnalyser, 1);

    return true;
  } catch (err) {
    console.warn("[WE AudioVisualizer] AudioContext init failed:", err);
    return false;
  }
}

/**
 * 安全关联指定音频源 (通过 WeakMap 缓存严格保证单实例只创建一次 SourceNode)
 */
export function attachAudioSource(audio: HTMLAudioElement): boolean {
  if (!audio) return false;
  if (!ensureAudioContext() || !audioCtx) return false;

  try {
    let sourceNode = sourceNodeCache.get(audio);
    if (!sourceNode) {
      sourceNode = audioCtx.createMediaElementSource(audio);
      sourceNodeCache.set(audio, sourceNode);
    }

    if (currentAttachedAudio !== audio) {
      if (leftAnalyser && rightAnalyser) {
        try { sourceNode.disconnect(); } catch (_) {}
        sourceNode.connect(leftAnalyser);
        sourceNode.connect(rightAnalyser);
      }
      sourceNode.connect(audioCtx.destination);
      currentAttachedAudio = audio;
    }

    return true;
  } catch (err) {
    // 若音频跨域污染或已被其他上下文接管，静默捕获
    return false;
  }
}

/**
 * 获取当前正在播放音频的元素，若都在暂停则返回 null
 */
function getActivePlayingAudio(): HTMLAudioElement | null {
  const musicAudio = musicService.getAudioElement();
  const radioAudio = biliRadioPlayer.getAudioElement();

  if (radioAudio && !radioAudio.paused && !radioAudio.ended && radioAudio.currentTime > 0) {
    return radioAudio;
  }
  if (musicAudio && !musicAudio.paused && !musicAudio.ended && musicAudio.currentTime > 0) {
    return musicAudio;
  }
  return null;
}

/**
 * 自动检测并关联当前正在活跃播放的音源 (音乐服务 或 B站电台)
 */
function syncActiveAudioSource(): HTMLAudioElement | null {
  const active = getActivePlayingAudio();
  if (active) {
    attachAudioSource(active);
  }
  return active;
}

/**
 * 每一帧通过对数频率划分提取 128 位归一化音频频谱
 * 严格事件驱动 + 30FPS 节流 + 连续静默挂起与 audioCtx.suspend()
 */
function tick(timestamp: number): void {
  if (!isStreaming || !targetWindow) return;

  // 严格按 30 FPS 节流 (每 33ms 一次)，禁止 120Hz 每帧跨 iframe postMessage
  if (timestamp - lastTickTime < 33) {
    animFrameId = requestAnimationFrame(tick);
    return;
  }
  lastTickTime = timestamp;

  const activeAudio = syncActiveAudioSource();

  // 若音乐暂停或结束，发送一帧全 0 复位后立刻停止循环并挂起 AudioContext！0% CPU！
  if (!activeAudio || activeAudio.paused || activeAudio.ended) {
    try {
      targetWindow.postMessage({
        type: "WE_AUDIO_DATA",
        audio: zeroBuffer,
      }, "*");
    } catch (_) {}
    if (audioCtx && audioCtx.state === "running") {
      audioCtx.suspend().catch(() => {});
    }
    if (animFrameId !== null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(animFrameId);
      }
      animFrameId = null;
    }
    return;
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  let hasSignal = false;

  if (leftAnalyser && rightAnalyser) {
    leftAnalyser.getByteFrequencyData(rawLeftFreq);
    rightAnalyser.getByteFrequencyData(rawRightFreq);

    for (let i = 0; i < BINS_PER_CHANNEL; i++) {
      const [start, end] = binBoundaries[i];
      let maxL = 0;
      let maxR = 0;
      for (let k = start; k <= end; k++) {
        if (rawLeftFreq[k] > maxL) maxL = rawLeftFreq[k];
        if (rawRightFreq[k] > maxR) maxR = rawRightFreq[k];
      }

      const l = maxL / 255;
      const r = maxR / 255;
      outBuffer[i] = l;
      outBuffer[i + 64] = r;

      if (l > 0.015 || r > 0.015) hasSignal = true;
    }
  }

  if (!hasSignal) {
    silentFrameCount++;
    // 若连续 30 帧能量全为 0，发送复位帧后立刻挂起休眠
    if (silentFrameCount >= 30) {
      try {
        targetWindow.postMessage({
          type: "WE_AUDIO_DATA",
          audio: zeroBuffer,
        }, "*");
      } catch (_) {}
      if (audioCtx && audioCtx.state === "running") {
        audioCtx.suspend().catch(() => {});
      }
      if (animFrameId !== null) {
        if (typeof cancelAnimationFrame === "function") {
          cancelAnimationFrame(animFrameId);
        }
        animFrameId = null;
      }
      return;
    }
  } else {
    silentFrameCount = 0;
  }

  try {
    targetWindow.postMessage({
      type: "WE_AUDIO_DATA",
      audio: hasSignal ? outBuffer : zeroBuffer,
    }, "*");
  } catch (_) {}

  animFrameId = requestAnimationFrame(tick);
}

function onAudioPlayEvent(): void {
  if (isStreaming && animFrameId === null) {
    silentFrameCount = 0;
    lastTickTime = 0;
    animFrameId = requestAnimationFrame(tick);
  }
}

function bindAudioLifecycleListeners(): void {
  if (listenersBound) return;
  listenersBound = true;
  const musicAudio = musicService.getAudioElement();
  const radioAudio = biliRadioPlayer.getAudioElement();
  if (musicAudio) {
    musicAudio.addEventListener("play", onAudioPlayEvent);
    musicAudio.addEventListener("playing", onAudioPlayEvent);
  }
  if (radioAudio) {
    radioAudio.addEventListener("play", onAudioPlayEvent);
    radioAudio.addEventListener("playing", onAudioPlayEvent);
  }
}

/**
 * 启动向壁纸沙盒的音频推流 (事件驱动唤醒)
 */
export function startAudioSpectrumStream(target: Window): void {
  targetWindow = target;
  bindAudioLifecycleListeners();
  if (isStreaming) return;

  isStreaming = true;
  lastTickTime = 0;
  silentFrameCount = 0;

  // 只有在当前确实有音频处于播放状态时才开启 tick 循环，否则保持待机静默
  const active = getActivePlayingAudio();
  if (active) {
    animFrameId = requestAnimationFrame(tick);
  } else {
    // 待机状态，向壁纸发送一次全 0 初始化复位
    try {
      targetWindow.postMessage({
        type: "WE_AUDIO_DATA",
        audio: zeroBuffer,
      }, "*");
    } catch (_) {}
  }
}

/**
 * 停止推流并清零重置壁纸律动
 */
export function stopAudioSpectrumStream(): void {
  isStreaming = false;
  silentFrameCount = 0;
  if (animFrameId !== null) {
    if (typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(animFrameId);
    }
    clearTimeout(animFrameId);
    animFrameId = null;
  }

  if (audioCtx && audioCtx.state === "running") {
    audioCtx.suspend().catch(() => {});
  }

  if (targetWindow) {
    try {
      targetWindow.postMessage({
        type: "WE_AUDIO_DATA",
        audio: zeroBuffer,
      }, "*");
    } catch (_) {}
  }
}
