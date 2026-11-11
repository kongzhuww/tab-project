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
 * 自动检测并关联当前正在活跃播放的音源 (音乐服务 或 B站电台)
 */
function syncActiveAudioSource(): void {
  const musicAudio = musicService.getAudioElement();
  const radioAudio = biliRadioPlayer.getAudioElement();

  let targetAudio: HTMLAudioElement | null = null;
  if (radioAudio && !radioAudio.paused && !radioAudio.ended) {
    targetAudio = radioAudio;
  } else if (musicAudio && !musicAudio.paused && !musicAudio.ended) {
    targetAudio = musicAudio;
  } else {
    targetAudio = musicAudio || radioAudio;
  }

  if (targetAudio) {
    attachAudioSource(targetAudio);
  }
}

/**
 * 每一帧通过对数频率划分提取 128 位归一化音频频谱
 */
function tick(): void {
  if (!isStreaming || !targetWindow) return;

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  syncActiveAudioSource();

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

  try {
    targetWindow.postMessage({
      type: "WE_AUDIO_DATA",
      audio: hasSignal ? outBuffer : zeroBuffer,
    }, "*");
  } catch (_) {}

  animFrameId = requestAnimationFrame(tick);
}

/**
 * 启动向壁纸沙盒的音频推流
 */
export function startAudioSpectrumStream(target: Window): void {
  targetWindow = target;
  if (isStreaming) return;

  syncActiveAudioSource();
  isStreaming = true;
  animFrameId = requestAnimationFrame(tick);
}

/**
 * 停止推流并清零重置壁纸律动
 */
export function stopAudioSpectrumStream(): void {
  isStreaming = false;
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
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
