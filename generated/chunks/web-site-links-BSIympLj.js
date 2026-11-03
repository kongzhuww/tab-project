const w = "todoist_web_links_v1:", h = (t) => w + t;
function a(t) {
  if (!t) return [];
  try {
    const e = JSON.parse(localStorage.getItem(h(t)) || "[]");
    return Array.isArray(e) ? e.filter((n) => n && typeof n.url == "string" && n.url.startsWith("http")) : [];
  } catch {
    return [];
  }
}
function g(t, e) {
  t && (localStorage.setItem(h(t), JSON.stringify(e)), window.dispatchEvent(new CustomEvent("todoist-web-links-changed", { detail: t })));
}
function b(t, e) {
  const n = a(t);
  n.some((c) => c.url === e.url) || g(t, [e, ...n]);
}
function p(t, e) {
  const o = a(t).filter((c) => c.url !== e);
  g(t, o);
}
function S(t, e, n) {
  if (t)
    try {
      const r = a(t);
      if (r && r.length > 0) return r;
    } catch {
    }
  const o = `${e || ""}
${n || ""}`, c = /(https?:\/\/[^\s\n\r"'>]+)/gi, m = o.match(c) || [], u = [];
  for (const r of m) {
    if (/github\.com\/[^\s/]+\/[^\s/]+/i.test(r) || /bilibili\.com\/video\/BV/i.test(r)) continue;
    const l = r.replace(/[.,;!?)]+$/, "");
    if (u.some((i) => i.url === l)) continue;
    let s = "";
    const f = (e || "").match(/(?:网站|标题|名称)[:：]\s*([^\n\r]+)/);
    if (f)
      s = f[1].trim();
    else {
      const i = (n || "").match(/^(?:浏览|访问|查看)[:：]\s*(.+)$/);
      i && (s = i[1].trim());
    }
    try {
      const i = new URL(l);
      s || (s = i.hostname.replace(/^www\./, ""));
    } catch {
      continue;
    }
    u.push({
      title: s,
      url: l
    });
  }
  return u;
}
export {
  b as a,
  S as g,
  p as u
};
