/**
 * 嵌入式/画中画视频播放进度记忆与跨区域播放暂停。
 */
export const BILI_EMBEDDED_POS_KEY = "biliEmbeddedPlaybackPositionsV1";

declare const chrome: any;

const embeddedPlaybackPositions = new Map<string, number>();
let embeddedPositionWriteTimer = 0;

function storageSet(items: Record<string, any>): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set(items, () => {
        const error = chrome.runtime?.lastError;
        if (error) reject(new Error(error.message || "存储写入失败"));
        else resolve();
      });
    } else {
      try {
        Object.entries(items).forEach(([k, v]) => {
          localStorage.setItem(k, JSON.stringify(v));
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
}

export function rememberEmbeddedPosition(media: HTMLMediaElement): void {
  const bvid = (media as any)?.dataset?.bvid;
  if (!bvid || !Number.isFinite(media.currentTime)) return;
  embeddedPlaybackPositions.set(bvid, Math.max(0, media.currentTime));
  clearTimeout(embeddedPositionWriteTimer);
  embeddedPositionWriteTimer = window.setTimeout(() => {
    storageSet({ [BILI_EMBEDDED_POS_KEY]: Object.fromEntries(embeddedPlaybackPositions) }).catch(() => {});
  }, 350);
}

export function suspendEmbeddedPlayback(scope: ParentNode = document): void {
  const media = scope.querySelector<HTMLMediaElement>(".bili-sub-native-video");
  if (media) {
    rememberEmbeddedPosition(media);
    media.pause();
  }
  scope.querySelectorAll<HTMLMediaElement>(
    ".bili-mini-player video, #bili-theater-video, #bili-radio-audio, video, audio"
  ).forEach((v) => {
    try {
      v.pause();
    } catch {}
  });
}
