import type { EmployeePeekSnapshot } from './employee-contract';

type PeekVideo = NonNullable<EmployeePeekSnapshot['activeVideo']>;

/** Project already-fetched Bilibili view data into the live/replay display. */
export function peekVideoFromView(current: PeekVideo, view: any): PeekVideo {
  return {
    ...current,
    title: String(view.title || current.title),
    author: String(view.owner?.name || current.author),
    cover: String(view.pic || current.cover).replace(/^http:/, 'https:'),
    desc: String(view.desc || '').slice(0, 600),
    descStatus: 'loaded',
    tname: String(view.tname || ''),
    pages: Array.isArray(view.pages) ? view.pages.slice(0, 8).map((p: any) => ({
      page: Number(p.page || 1), part: String(p.part || ''), durationSec: Number(p.duration || 0),
    })) : [],
    stat: {
      view: Number(view.stat?.view || 0), like: Number(view.stat?.like || 0),
      coin: Number(view.stat?.coin || 0), favorite: Number(view.stat?.favorite || 0),
    },
  };
}
