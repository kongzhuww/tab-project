import { F as _, H as k, r as H } from "./search.service-DF5Rt2Wp.js";
import { i as N } from "./repo-group-inference-C5Imc1uu.js";
const g = "gh_my_repo_groups_v2", d = "gh_my_repo_groups_map_v2";
async function I(i) {
  const { ghUser: n, ghToken: u } = await _();
  if (i.throwIfAborted(), !n && !u) throw new Error("请先在 GitHub 插件设置用户名或 Token。");
  if (n && !/^[a-z0-9-]{1,39}$/i.test(n)) throw new Error("GitHub 用户名格式无效，请检查设置。");
  let r, o;
  if (typeof chrome < "u" && chrome.storage?.local) {
    const e = await chrome.storage.local.get([g, d]);
    r = e[g], o = e[d];
  }
  if (typeof localStorage < "u") {
    if (r == null) {
      const e = localStorage.getItem(g);
      e && (r = JSON.parse(e));
    }
    if (o == null) {
      const e = localStorage.getItem(d);
      e && (o = JSON.parse(e));
    }
  }
  if (r != null && !Array.isArray(r)) throw new Error("本地仓库分组格式异常，未修改任何数据。");
  if (o != null && (typeof o != "object" || Array.isArray(o))) throw new Error("本地仓库分类格式异常，未修改任何数据。");
  const h = Array.isArray(r) ? r.filter((e) => typeof e == "string") : [], a = /* @__PURE__ */ Object.create(null);
  for (const [e, t] of Object.entries(o || {})) Array.isArray(t) && t.every((s) => typeof s == "string") && (a[e] = t);
  const b = k(u), A = [n ? `/users/${encodeURIComponent(n)}/repos?type=owner&sort=updated&per_page=100` : "", u ? "/user/repos?affiliation=owner&sort=updated&per_page=100" : ""].filter(Boolean), f = await Promise.allSettled(A.map(async (e) => {
    const t = [];
    let s = !1;
    for (let l = 1; l <= 10; l++) {
      const m = await H(`${e}&page=${l}`, { headers: b, maxBytes: 4194304, timeoutMs: 15e3, signal: i });
      if (!Array.isArray(m.data)) throw new Error("GitHub 返回的仓库列表格式异常。");
      if (t.push(...m.data), !/rel="next"/.test(m.link)) break;
      l === 10 && (s = !0);
    }
    return { items: t, partial: s };
  }));
  i.throwIfAborted();
  const p = f.filter((e) => e.status === "fulfilled");
  if (!p.length) throw new Error(f.find((e) => e.status === "rejected")?.reason?.message || "GitHub 仓库读取失败。");
  const S = p.flatMap((e) => e.value.items), w = /* @__PURE__ */ new Set(), c = [];
  for (const e of S)
    !e || !/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(e.full_name || "") || !Number.isSafeInteger(e.id) || typeof e.private != "boolean" || w.has(e.full_name.toLowerCase()) || (w.add(e.full_name.toLowerCase()), c.push({ id: e.id, name: String(e.name || e.full_name.split("/")[1]), fullName: e.full_name, description: typeof e.description == "string" ? e.description : "", isPrivate: e.private === !0, isFork: e.fork === !0, htmlUrl: `https://github.com/${e.full_name}`, language: typeof e.language == "string" ? e.language : null, stargazersCount: Number(e.stargazers_count) || 0, forksCount: Number(e.forks_count) || 0, openIssuesCount: Number(e.open_issues_count) || 0, topics: Array.isArray(e.topics) ? e.topics.filter((t) => typeof t == "string") : [], localGroups: [], updatedAt: String(e.updated_at || ""), pushedAt: String(e.pushed_at || ""), defaultBranch: String(e.default_branch || "") }));
  for (const e of c) {
    const t = a[e.fullName] || a[e.name] || a[e.fullName.toLowerCase()] || a[e.name.toLowerCase()], s = t?.length ? t : N(e, h);
    s.length && (a[e.fullName] = [...s]);
  }
  const y = await _();
  if (i.throwIfAborted(), y.ghUser !== n || y.ghToken !== u) throw new Error("GitHub 账号已切换，请重新加载仓库。");
  const G = f.some((e) => e.status === "rejected") ? "部分仓库来源读取失败，当前仅显示成功读取的内容。" : p.some((e) => e.value.partial) ? "仓库数量较多，当前每个来源最多显示前 1000 条。" : "";
  return { repos: c, customGroups: h, repoGroupsMap: a, warning: G };
}
export {
  I as loadOwnRepositorySnapshot
};
