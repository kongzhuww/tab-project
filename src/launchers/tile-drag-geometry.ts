export const TILE_DRAG_THRESHOLD = 5;
export const TILE_SWAP_COOLDOWN = 180;
export function inFolderDropCore(rect: DOMRect, x: number, y: number): boolean {
  const innerX = x - rect.left, innerY = y - rect.top;
  return innerX > rect.width * .25 && innerX < rect.width * .75 && innerY > rect.height * .25 && innerY < rect.height * .75;
}
export function inTileSwapCore(rect: DOMRect, x: number, y: number): boolean {
  return Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2)) <= Math.max(rect.width, rect.height) * .55;
}
