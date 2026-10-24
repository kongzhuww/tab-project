import definition from "../../server/private-chat/protocol.json";

/** Bounded raster headers only, not full decoding or malware inspection. */
export function chatImageDimensions(value: string): [number, number] | undefined {
  try {
    if (value.length > Math.ceil(definition.limits.imageBytes / 3) * 4 + 64) return undefined;
    const split = value.indexOf(","), mime = value.slice(5, value.indexOf(";"));
    const raw = Uint8Array.from(atob(value.slice(split + 1)), char => char.charCodeAt(0));
    const view = new DataView(raw.buffer), text = (a: number, b: number) => String.fromCharCode(...raw.slice(a, b));
    if (mime === "image/png" && raw.length >= 33 && text(0, 8) === "\x89PNG\r\n\x1a\n" && view.getUint32(8) === 13 && text(12, 16) === "IHDR") return [view.getUint32(16), view.getUint32(20)];
    if (mime === "image/gif" && raw.length >= 13 && ["GIF87a", "GIF89a"].includes(text(0, 6))) return [view.getUint16(6, true), view.getUint16(8, true)];
    if (mime === "image/webp" && raw.length >= 25 && text(0, 4) === "RIFF" && text(8, 12) === "WEBP" && view.getUint32(4, true) + 8 === raw.length) {
      const kind = text(12, 16);
      if (kind === "VP8X" && raw.length >= 30) return [1 + raw[24] + (raw[25] << 8) + (raw[26] << 16), 1 + raw[27] + (raw[28] << 8) + (raw[29] << 16)];
      if (kind === "VP8L" && raw[20] === 0x2f) { const bits = view.getUint32(21, true); return [1 + (bits & 0x3fff), 1 + ((bits >>> 14) & 0x3fff)]; }
      if (kind === "VP8 " && raw.length >= 30 && text(23, 26) === "\x9d\x01\x2a") return [view.getUint16(26, true) & 0x3fff, view.getUint16(28, true) & 0x3fff];
    }
    if (mime === "image/jpeg" && raw[0] === 255 && raw[1] === 216) {
      let pos = 2;
      while (pos + 4 <= raw.length) {
        if (raw[pos] !== 255) break;
        while (pos < raw.length && raw[pos] === 255) pos++;
        if (pos >= raw.length) break;
        const marker = raw[pos++];
        if (marker === 216 || marker === 1 || (marker >= 208 && marker <= 215)) continue;
        if (marker === 217 || marker === 218 || pos + 2 > raw.length) break;
        const size = view.getUint16(pos);
        if (size < 2 || pos + size > raw.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker) && size >= 8) return [view.getUint16(pos + 5), view.getUint16(pos + 3)];
        pos += size;
      }
    }
  } catch { /* Malformed Base64/header is not a valid image. */ }
  return undefined;
}
