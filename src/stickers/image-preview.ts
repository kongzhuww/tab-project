/** Rebuildable display-only previews. Never replace the source file or the copy/export bytes. */
export async function createStickerPreview(blob: Blob): Promise<Blob> {
  if (!blob.size || blob.size > 25 * 1024 * 1024) throw new Error("预览图片大小须在25MB以内");
  if (blob.type === "image/gif" && blob.size <= 4 * 1024 * 1024) return blob;
  const bitmap = await createImageBitmap(blob);
  try {
    if (bitmap.width * bitmap.height > 40000000) throw new Error("图片像素过大，请先缩小副本再预览");
    const scale = Math.min(1, 320 / Math.max(bitmap.width, bitmap.height));
    const canvas = new OffscreenCanvas(Math.max(1, Math.round(bitmap.width * scale)), Math.max(1, Math.round(bitmap.height * scale)));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("无法生成预览");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await canvas.convertToBlob({ type: "image/webp", quality: 0.8 });
  } finally { bitmap.close(); }
}
