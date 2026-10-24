import { imageViewerController } from "../viewers/image-viewer-store";
import type { ImagePreviewHandle } from "../viewers/image-viewer-store";

export interface ImagePreviewOptions {
  source: string | Blob;
  title?: string;
}
export type { ImagePreviewHandle };

/** Trusted built-in UI only. Uses the host's existing singleton; never mounts another viewer.
 * Blob input is owned by the viewer; caller-created blob URLs remain caller-owned.
 * Opening another preview replaces this one. A stale handle cannot close the new preview.
 * The host must mount FloatingImageViewer (AppOverlays already does this).
 */
export const images = Object.freeze({
  open({ source, title }: ImagePreviewOptions): ImagePreviewHandle | null {
    return imageViewerController.open(source, title) ?? null;
  }
});
