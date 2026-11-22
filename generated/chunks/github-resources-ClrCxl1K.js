import { x as b, y as G, D as k, O as E, Q as H } from "./github.service-BkChs4sP.js";
function N(u, i) {
  const o = [], s = u.name.toLowerCase(), n = (u.topics || []).map((a) => a.toLowerCase());
  for (const a of i || []) {
    const t = a.toLowerCase();
    if ((t.includes("fork") || a.includes("分支")) && (u.isFork || n.includes("fork"))) {
      o.push(a);
      continue;
    }
    if ((t.includes("浏览器") || t.includes("browser") || t.includes("chrome") || t.includes("edge")) && (n.some((r) => r.includes("extension") || r.includes("browser") || r.includes("newtab")) || s.includes("tab-project"))) {
      o.push(a);
      continue;
    }
    if ((t.includes("pi") || a.includes("PI")) && (n.some((r) => r.includes("pi") || r.includes("grounding-pi")) || s.includes("pi-") || s.includes("-pi"))) {
      o.push(a);
      continue;
    }
    if (t.includes("herdr") && (n.some((r) => r.includes("herdr")) || s.includes("herdr"))) {
      o.push(a);
      continue;
    }
    if ((t.includes("嵌入式") || t.includes("embedded") || t.includes("单片机")) && (n.some((r) => r.includes("embedded") || r.includes("zephyr") || r.includes("stm32") || r.includes("k230")) || s.includes("k230") || s.includes("mspm0") || s.includes("pid-") || s.includes("zephyr"))) {
      o.push(a);
      continue;
    }
    (t.includes("美化") || t.includes("theme") || t.includes("style")) && (n.some((r) => r.includes("theme") || r.includes("beauty") || r.includes("ui")) || s.includes("theme") || s.includes("style")) && o.push(a);
  }
  return o;
}
const S = "gh_my_repo_groups_v2", A = "gh_my_repo_groups_map_v2";
async function C(u) {
  const { ghUser: i, ghToken: o } = await b();
  if (u.throwIfAborted(), !i && !o) throw new Error("请先在 GitHub 插件设置用户名或 Token。");
  if (i && !/^[a-z0-9-]{1,39}$/i.test(i)) throw new Error("GitHub 用户名格式无效，请检查设置。");
  const s = G(o);
  let n = `user:${i.toLowerCase()}`;
  if (o) {
    const l = await k("/user", { headers: s, maxBytes: 262144, timeoutMs: 15e3, signal: u });
    if (!Number.isSafeInteger(l.data?.id) || typeof l.data?.login != "string") throw new Error("GitHub 账号身份无法确认。");
    n = `github-id:${l.data.id}`;
  }
  const a = o ? "/user/starred" : `/users/${encodeURIComponent(i)}/starred`, t = [];
  let r = !1;
  for (let l = 1; l <= 10; l++) {
    const p = await k(`${a}?per_page=100&page=${l}`, { headers: s, maxBytes: 4194304, timeoutMs: 15e3, signal: u });
    if (!Array.isArray(p.data)) throw new Error("GitHub 返回的 Star 列表格式异常。");
    for (const f of p.data) f && Number.isSafeInteger(f.id) && /^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(f.full_name || "") && t.push(f);
    if (!/rel="next"/.test(p.link)) break;
    l === 10 && (r = !0);
  }
  let h = "", d = null;
  try {
    d = await E(n);
  } catch {
    h = "本地 Star 分组读取失败，仍可查看全部收藏。";
  }
  const g = d ? H(d) : null, w = await b();
  if (u.throwIfAborted(), w.ghUser !== i || w.ghToken !== o) throw new Error("GitHub 账号已切换，请重新加载收藏。");
  return { repos: t, lists: g?.lists || [], repoListNames: g?.repoListNames || /* @__PURE__ */ new Map(), loading: !1, warning: [r ? "Star 收藏较多，当前最多读取 1000 条。" : "", h].filter(Boolean).join(" ") };
}
async function $(u) {
  const { ghUser: i, ghToken: o } = await b();
  if (u.throwIfAborted(), !i && !o) throw new Error("请先在 GitHub 插件设置用户名或 Token。");
  if (i && !/^[a-z0-9-]{1,39}$/i.test(i)) throw new Error("GitHub 用户名格式无效，请检查设置。");
  let s, n;
  if (typeof chrome < "u" && chrome.storage?.local) {
    const e = await chrome.storage.local.get([S, A]);
    s = e[S], n = e[A];
  }
  if (typeof localStorage < "u") {
    if (s == null) {
      const e = localStorage.getItem(S);
      e && (s = JSON.parse(e));
    }
    if (n == null) {
      const e = localStorage.getItem(A);
      e && (n = JSON.parse(e));
    }
  }
  if (s != null && !Array.isArray(s)) throw new Error("本地仓库分组格式异常，未修改任何数据。");
  if (n != null && (typeof n != "object" || Array.isArray(n))) throw new Error("本地仓库分类格式异常，未修改任何数据。");
  const a = Array.isArray(s) ? s.filter((e) => typeof e == "string") : [], t = /* @__PURE__ */ Object.create(null);
  for (const [e, c] of Object.entries(n || {})) Array.isArray(c) && c.every((m) => typeof m == "string") && (t[e] = c);
  const r = G(o), h = [i ? `/users/${encodeURIComponent(i)}/repos?type=owner&sort=updated&per_page=100` : "", o ? "/user/repos?affiliation=owner&sort=updated&per_page=100" : ""].filter(Boolean), d = await Promise.allSettled(h.map(async (e) => {
    const c = [];
    let m = !1;
    for (let y = 1; y <= 10; y++) {
      const _ = await k(`${e}&page=${y}`, { headers: r, maxBytes: 4194304, timeoutMs: 15e3, signal: u });
      if (!Array.isArray(_.data)) throw new Error("GitHub 返回的仓库列表格式异常。");
      if (c.push(..._.data), !/rel="next"/.test(_.link)) break;
      y === 10 && (m = !0);
    }
    return { items: c, partial: m };
  }));
  u.throwIfAborted();
  const g = d.filter((e) => e.status === "fulfilled");
  if (!g.length) throw new Error(d.find((e) => e.status === "rejected")?.reason?.message || "GitHub 仓库读取失败。");
  const w = g.flatMap((e) => e.value.items), l = /* @__PURE__ */ new Set(), p = [];
  for (const e of w)
    !e || !/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(e.full_name || "") || !Number.isSafeInteger(e.id) || typeof e.private != "boolean" || l.has(e.full_name.toLowerCase()) || (l.add(e.full_name.toLowerCase()), p.push({ id: e.id, name: String(e.name || e.full_name.split("/")[1]), fullName: e.full_name, description: typeof e.description == "string" ? e.description : "", isPrivate: e.private === !0, isFork: e.fork === !0, htmlUrl: `https://github.com/${e.full_name}`, language: typeof e.language == "string" ? e.language : null, stargazersCount: Number(e.stargazers_count) || 0, forksCount: Number(e.forks_count) || 0, openIssuesCount: Number(e.open_issues_count) || 0, topics: Array.isArray(e.topics) ? e.topics.filter((c) => typeof c == "string") : [], localGroups: [], updatedAt: String(e.updated_at || ""), pushedAt: String(e.pushed_at || ""), defaultBranch: String(e.default_branch || "") }));
  for (const e of p) {
    const c = t[e.fullName] || t[e.name] || t[e.fullName.toLowerCase()] || t[e.name.toLowerCase()], m = c?.length ? c : N(e, a);
    m.length && (t[e.fullName] = [...m]);
  }
  const f = await b();
  if (u.throwIfAborted(), f.ghUser !== i || f.ghToken !== o) throw new Error("GitHub 账号已切换，请重新加载仓库。");
  const I = d.some((e) => e.status === "rejected") ? "部分仓库来源读取失败，当前仅显示成功读取的内容。" : g.some((e) => e.value.partial) ? "仓库数量较多，当前每个来源最多显示前 1000 条。" : "";
  return { repos: p, customGroups: a, repoGroupsMap: t, warning: I };
}
const j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loadOwnRepositorySnapshot: $,
  loadStarRepositorySnapshot: C
}, Symbol.toStringTag, { value: "Module" }));
export {
  j as g,
  N as i,
  $ as l
};
