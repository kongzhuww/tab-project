import type { AudioTarget, OffscreenAudioSnapshot, OffscreenBiliState, OffscreenMusicState } from "./audio-protocol";

declare const chrome: any;

export function canUseOffscreenAudio(): boolean {
  if (typeof chrome === "undefined" || !chrome.runtime?.id || chrome.runtime.id === "fixture") return false;
  if (typeof chrome.runtime?.sendMessage !== "function") return false;
  if (typeof location !== "undefined" && location.pathname.endsWith("/offscreen-audio.html")) return false;
  return true;
}

let keepalivePort: any = null;

function ensureKeepalivePort(): void {
  if (keepalivePort || !canUseOffscreenAudio() || typeof chrome.runtime?.connect !== "function") return;
  try {
    const port = chrome.runtime.connect({ name: "offscreen-audio-keepalive" });
    keepalivePort = port;
    port?.onDisconnect?.addListener?.(() => {
      if (keepalivePort === port) keepalivePort = null;
    });
  } catch {
    keepalivePort = null;
  }
}

export async function sendAudioCommand<T = any>(target: AudioTarget, action: string, payload?: any): Promise<T | null> {
  if (!canUseOffscreenAudio()) return null;
  ensureKeepalivePort();
  try {
    return await new Promise<T | null>((resolve) => {
      chrome.runtime.sendMessage(
        { type: "audio-bg:command", target, action, payload },
        (response: any) => {
          if (chrome.runtime?.lastError) {
            resolve(null);
            return;
          }
          resolve(response ?? null);
        }
      );
    });
  } catch {
    return null;
  }
}

export async function fetchOffscreenAudioState(): Promise<OffscreenAudioSnapshot | null> {
  if (!canUseOffscreenAudio()) return null;
  ensureKeepalivePort();
  try {
    return await new Promise<OffscreenAudioSnapshot | null>((resolve) => {
      chrome.runtime.sendMessage({ type: "audio-bg:get-state" }, (response: any) => {
        if (chrome.runtime?.lastError || !response?.ok) {
          resolve(null);
          return;
        }
        resolve({
          music: response.music ?? null,
          bili: response.bili ?? null,
        });
      });
    });
  } catch {
    return null;
  }
}

type StateListener = (
  source: AudioTarget,
  state: OffscreenMusicState | OffscreenBiliState
) => void;

const listeners = new Set<StateListener>();
let listenerRegistered = false;

function ensureRuntimeListener(): void {
  if (listenerRegistered || !canUseOffscreenAudio() || !chrome.runtime?.onMessage?.addListener) return;
  listenerRegistered = true;
  chrome.runtime.onMessage.addListener((message: any) => {
    if (message?.type !== "offscreen-audio:state") return;
    if (message.source !== "music" && message.source !== "bili") return;
    if (!message.state) return;
    for (const cb of listeners) {
      try { cb(message.source, message.state); } catch {}
    }
  });
}

export function subscribeOffscreenAudioState(cb: StateListener): () => void {
  ensureRuntimeListener();
  ensureKeepalivePort();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
