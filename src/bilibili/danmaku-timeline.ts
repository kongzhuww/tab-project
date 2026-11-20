import type { BiliDanmakuItem } from '../services/bilibili.service';

export function findDanmakuIndex(list: readonly BiliDanmakuItem[], time: number): number {
  let low = 0, high = list.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (list[mid].time < time) low = mid + 1;
    else high = mid;
  }
  return low;
}

export function takeDanmakuAtTime(list: readonly BiliDanmakuItem[], start: number, time: number) {
  const items: BiliDanmakuItem[] = [];
  let index = start;
  while (index < list.length && list[index].time <= time) {
    if (time - list[index].time <= 1.2) items.push(list[index]);
    index++;
  }
  return { items, index };
}
