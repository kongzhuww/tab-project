export function onFollowingGroupsWheel(event: WheelEvent): void {
  if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
  const list = event.currentTarget as HTMLElement;
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? list.clientWidth : 1);
  const max = list.scrollWidth - list.clientWidth;
  if ((delta > 0 && list.scrollLeft < max) || (delta < 0 && list.scrollLeft > 0)) {
    event.preventDefault();
    event.stopPropagation();
    list.scrollLeft += delta;
  }
}
