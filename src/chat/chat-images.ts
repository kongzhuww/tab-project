// Bounded raster images; wire limits come from the shared packaged contract.
import { CHAT_LIMITS, CHAT_IMAGE_MIME_TYPES, isInlineChatImage, type ChatCapabilities } from "./chat-contract";
export const MAX_IMAGE_BYTES = CHAT_LIMITS.imageBytes;
export const MAX_IMAGE_MESSAGE_BYTES = CHAT_LIMITS.imageMessageBytes;
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
export const isChatImageDataUrl = isInlineChatImage;
function asDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("图片读取失败"));
    reader.onerror = reader.onabort = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(blob);
  });
}
async function pngIsAnimated(input: Blob): Promise<boolean> {
  let offset = 8;
  for (let n = 0; n < 64 && offset + 8 <= input.size; n++) {
    const chunk = new Uint8Array(await input.slice(offset, offset + 8).arrayBuffer());
    const size = new DataView(chunk.buffer).getUint32(0);
    const name = String.fromCharCode(...chunk.slice(4));
    if (name === "acTL") return true;
    if (name === "IDAT" || name === "IEND") return false;
    offset += size + 12;
  }
  throw new Error("PNG结构无法确认，请换一张图片，避免误将动图转为静态");
}
export async function prepareChatImage(input: Blob, capabilities?: ChatCapabilities): Promise<string> {
  if (capabilities && !capabilities.messageTypes.includes("image")) throw new Error(capabilities.reason || "服务端未启用图片消息");
  const limits = capabilities?.limits || CHAT_LIMITS, mimes = capabilities?.imageMimeTypes || CHAT_IMAGE_MIME_TYPES;
  const outputType = ["image/webp", "image/png", "image/jpeg"].find(type => mimes.includes(type));
  if (!input.size || input.size > MAX_INPUT_BYTES) throw new Error("请选择25MB以内的图片");
  const header = new Uint8Array(await input.slice(0, 32).arrayBuffer());
  const text = (a: number, b: number) => String.fromCharCode(...header.slice(a, b));
  const mime = text(0, 6) === "GIF87a" || text(0, 6) === "GIF89a" ? "image/gif"
    : header[0] === 137 && text(1, 4) === "PNG" ? "image/png"
    : header[0] === 255 && header[1] === 216 && header[2] === 255 ? "image/jpeg"
    : text(0, 4) === "RIFF" && text(8, 12) === "WEBP" ? "image/webp"
    : text(0, 2) === "BM" ? "image/bmp" : "";
  if (!mime) throw new Error("支持 PNG、JPEG、GIF、WebP、BMP，不支持SVG图片");
  // VP8X animation flag. Do not silently turn an animated image into a still frame.
  const animated = mime === "image/gif" || (mime === "image/webp" && text(12, 16) === "VP8X" && !!(header[20] & 2));
  const bitmap = await createImageBitmap(input);
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40 * 1024 * 1024) throw new Error("图片像素过大，请先缩小后发送");
    if (mimes.includes(mime) && input.size <= limits.imageBytes && bitmap.width <= limits.imageMaxDimension && bitmap.height <= limits.imageMaxDimension && bitmap.width * bitmap.height <= limits.imageMaxPixels) {
      return asDataUrl(input.slice(0, input.size, mime));
    }
    if (animated || (mime === "image/png" && await pngIsAnimated(input))) throw new Error("动图超过当前服务的大小、尺寸或格式限制；请选择兼容的小动图，不会自动转为静态图");
    if (!outputType) throw new Error("服务端没有可用于静态图片压缩的兼容格式");
    let scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height), limits.imageMaxDimension / Math.max(bitmap.width, bitmap.height), Math.sqrt(limits.imageMaxPixels / (bitmap.width * bitmap.height)));
    const canvas = document.createElement("canvas");
    for (let attempt = 0; attempt < 5; attempt++) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("浏览器无法处理这张图片");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const result = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, outputType, Math.max(.45, .8 - attempt * .08)));
      if (result && mimes.includes(result.type) && result.size <= limits.imageBytes) return asDataUrl(result);
      scale *= .75;
    }
    throw new Error("图片压缩后仍超限，请先缩小后发送");
  } finally { bitmap.close(); }
}
