export const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 24 * 1024 * 1024;
let imageJobs = 0;
export function acquireImageSlot(): () => void {
  if (imageJobs >= 2) throw new Error('图片处理繁忙，请稍后重试');
  imageJobs++;
  return () => { imageJobs--; };
}
export function mediaUrl(value: unknown): string {
  if (typeof value !== 'string' || value.length > 8192) throw new Error('资源地址无效');
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('资源地址无效');
  return url.href;
}
/** Body streaming is bounded too; Content-Length alone is not trusted. */
export async function fetchImageBytes(value: string, headers?: HeadersInit): Promise<ArrayBuffer> {
  const url = mediaUrl(value);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  try {
    // Reject redirects rather than silently downgrade HTTPS or change destinations.
    const response = await fetch(url, { headers, signal: controller.signal, credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error(`图片读取失败（HTTP ${response.status}）`);
    if (Number(response.headers.get('content-length')) > MAX_IMAGE_BYTES) throw new Error('图片超过 12 MiB 限制');
    if (!response.body) throw new Error('图片响应为空');
    reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_IMAGE_BYTES) throw new Error('图片超过 12 MiB 限制');
      chunks.push(part.value);
    }
    if (!size) throw new Error('图片响应为空');
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return bytes.buffer;
  } catch (error) {
    if (controller.signal.aborted) throw new Error('图片读取超时，请手动重试');
    if (error instanceof TypeError) throw new Error('图片网络请求失败或发生重定向，未降级为 HTTP');
    throw error;
  } finally {
    controller.abort();
    if (reader) { try { await reader.cancel(); } catch {} reader.releaseLock(); }
    clearTimeout(timer);
  }
}
export async function validateImagePixels(buffer: ArrayBuffer, mime: string): Promise<void> {
  // Reject oversized PNG/GIF headers before allocating a decoded bitmap.
  const view = new DataView(buffer);
  let width = 0, height = 0;
  if (mime === 'image/png' && buffer.byteLength >= 24) { width = view.getUint32(16); height = view.getUint32(20); }
  if (mime === 'image/gif' && buffer.byteLength >= 10) { width = view.getUint16(6, true); height = view.getUint16(8, true); }
  if (width * height > MAX_IMAGE_PIXELS || width > 16384 || height > 16384) throw new Error('图片尺寸过大');
  const bitmap = await createImageBitmap(new Blob([buffer], { type: mime }));
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > MAX_IMAGE_PIXELS || bitmap.width > 16384 || bitmap.height > 16384)
      throw new Error('图片尺寸过大（最多 24M 像素，单边不超过 16384）');
  } finally { bitmap.close(); }
}
