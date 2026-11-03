const b = "todoist_bili_video_links_v1:", f = (i) => b + i;
function o(i) {
  if (!i) return [];
  try {
    const t = JSON.parse(localStorage.getItem(f(i)) || "[]");
    return Array.isArray(t) ? t.filter((n) => n && (n.bvid || n.aid)) : [];
  } catch {
    return [];
  }
}
function h(i, t) {
  i && (localStorage.setItem(f(i), JSON.stringify(t)), window.dispatchEvent(new CustomEvent("todoist-bili-links-changed", { detail: i })));
}
function d(i, t) {
  const n = o(i);
  n.some((r) => t.bvid && r.bvid === t.bvid || t.aid && r.aid === t.aid) || h(i, [t, ...n]);
}
function m(i, t) {
  const c = o(i).filter((r) => r.bvid !== t && r.aid !== t);
  h(i, c);
}
function g(i, t, n) {
  if (i)
    try {
      const e = o(i);
      if (e && e.length > 0) return e;
    } catch {
    }
  const c = `${t || ""} ${n || ""}`, r = c.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/i) || c.match(/\b(BV[a-zA-Z0-9]{10})\b/);
  if (r) {
    const e = r[1];
    let s = "";
    const a = (n || "").match(/^(?:观看|看)?(?:看视频[:：]\s*)(.+)$/);
    a && (s = a[1].trim());
    let l = "";
    const u = (t || "").match(/UP主[:：]\s*([^\n\r]+)/);
    return u && (l = u[1].trim()), [{
      bvid: e,
      title: s || e,
      author: l,
      url: `https://www.bilibili.com/video/${e}`
    }];
  }
  return [];
}
export {
  d as a,
  g,
  m as u
};
