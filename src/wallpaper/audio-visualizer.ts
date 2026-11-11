/**
 * Wallpaper Engine 128 位双声道归一化音频频谱推流管道
 * 严格符合 Wallpaper Engine 规范：
 * 接收长度为 128 的浮点数组 (0.0 ~ 1.0)
 * [0 ~ 63]: 左声道低频到高频
 * [64 ~ 127]: 右声道低频到高频
 */

import { musicService } from "../services/music.service";

let audioCtx: AudioContext | null = null;
let leftAnalyser: AnalyserNode | null = null;
let rightAnalyser: AnalyserNode | null = null;
let activeSourceNode: MediaElementAudioSourceNode | null = null;
let attachedAudioElement: HTMLAudioElement | null = null;

let animFrameId: number | null = null;
let targetWindow: Window | null = null;
let isStreaming = false;

// 预分配复用数组，杜绝 GC 抖动
const leftFreq = new Uint8Array(64);
const rightFreq = new Uint8Array(64);
const outBuffer = new Array<number>(128).fill(0);
const zeroBuffer = new Array<number>(128).fill(0);

/**
 * 初始化 Web Audio 上下文与双声道分析器 (FFT = 128 -> 64 bins/声道)
 */
function ensureAudioContext(): boolean {
  if (audioCtx && leftAnalyser && rightAnalyser) return true;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return false;

    audioCtx = new AudioContextClass();
    const splitter = audioCtx.createChannelSplitter(2);

    leftAnalyser = audioCtx.createAnalyser();
    leftAnalyser.fftSize = 128;
    leftAnalyser.smoothingTimeConstant = 0.8;

    rightAnalyser = audioCtx.createAnalyser();
    rightAnalyser.fftSize = 128;
    rightAnalyser.smoothingTimeConstant = 0.8;

    splitter.connect(leftAnalyser, 0);
    splitter.connect(rightAnalyser, 1);

    return true;
  } catch (err) {
    console.warn("[WE AudioVisualizer] AudioContext init failed:", err);
    return false;
  }
}

/**
 * 关联音频源 (保证每个 HTMLAudioElement 仅调用一次 createMediaElementSource)
 */
export function attachAudioSource(audio: HTMLAudioElement): boolean {
  if (!audio || audio === attachedAudioElement) return true;
  if (!ensureAudioContext() || !audioCtx) return false;

  try {
    if (activeSourceNode) {
      try { activeSourceNode.disconnect(); } catch (_) {}
    }

    activeSourceNode = audioCtx.createMediaElementSource(audio);
    // 同时连接到分析器和扬声器输出
    if (leftAnalyser && rightAnalyser) {
      activeSourceNode.connect(leftAnalyser);
      activeSourceNode.connect(rightAnalyser);
    }
    activeSourceNode.connect(audioCtx.destination);
    attachedAudioElement = audio;
    return true;
  } catch (err) {
    console.warn("[WE AudioVisualizer] Attach media source error (possibly tainted or already connected):", err);
    return false;
  }
}

/**
 * 每一帧采样并向壁纸推流 128 位归一化音频频谱
 */
function tick(): void {
  if (!isStreaming || !targetWindow) return;

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  let hasSignal = false;

  if (leftAnalyser && rightAnalyser) {
    leftAnalyser.getByteFrequencyData(leftFreq);
    rightAnalyser.getByteFrequencyData(rightFreq);

    for (let i = 0; i < 64; i++) {
      const l = leftFreq[i] / 255;
      const r = rightFreq[i] / 255;
      outBuffer[i] = l;
      outBuffer[i + 64] = r;
      if (l > 0.01 || r > 0.01) hasSignal = true;
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

  // 尝试自动关联顶栏音乐播放器
  const musicAudio = musicService.getAudioElement();
  if (musicAudio) {
    attachAudioSource(musicAudio);
  }

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
