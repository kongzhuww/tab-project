import { c as C, H as ae } from "./view-styles-D_56CpcO.js";
import { b as y } from "./bili-favorites-store-GY85-m7c.js";
import { T as O, U as J, V as ie, W as le, X as T } from "./search.service-DGqXHLyU.js";
import { b as W } from "./up-group-manager-store-DS9G5UqS.js";
import { s as ce } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { w as ue } from "./window-manager.store-D_Nuf9-p.js";
class de {
  constructor(e) {
    this.dependencies = e, this.state = {
      videos: [],
      page: 1,
      pageSize: 24,
      freshIdx: 1,
      loading: !1,
      pendingScroll: !1
    }, this.active = !1, this.request = null;
  }
  setActive(e) {
    this.active = e, e || this.cancel();
  }
  cancel() {
    const e = this.request;
    this.request = null, clearTimeout(this.timeout), this.timeout = void 0, e?.abort(), this.state.loading = !1, this.state.pendingScroll = !1;
  }
  loadRecommendations(e = !1) {
    return this.load(e ? 1 : this.state.page, e ? 1 : this.state.freshIdx, !1);
  }
  refresh() {
    return this.load(this.state.page + 1, this.state.freshIdx + 1, !1);
  }
  goToPage(e) {
    if (this.state.loading || !Number.isFinite(e)) return Promise.resolve();
    const i = Math.max(1, Math.floor(e));
    return this.load(i, Math.max(1, this.state.freshIdx + i - this.state.page), !0);
  }
  async load(e, i, t) {
    if (!this.active) return;
    this.cancel();
    const s = new AbortController();
    this.request = s;
    const n = () => this.active && this.request === s;
    let h = !1;
    this.timeout = setTimeout(() => {
      h = !0, s.abort();
    }, 15e3), this.state.loading = !0, this.dependencies.publish({ specialLoading: !0, specialError: "" });
    try {
      const r = this.state.pageSize || 24;
      let a = [], l = i;
      for (let u = 0; u < 3 && a.length < r; u++) {
        const p = new URLSearchParams({ ps: String(r), fresh_idx: String(l), fresh_type: "3" });
        let c = [], g;
        try {
          const f = await this.dependencies.api(`https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?${p}`, s.signal);
          if (!Array.isArray(f?.item)) throw new Error("推荐接口返回格式异常");
          c = f.item;
        } catch (f) {
          if (s.signal.aborted) throw f;
          g = f;
        }
        if (!n()) return;
        if (s.signal.throwIfAborted(), !c.length && !a.length) {
          const f = await this.dependencies.api(`https://api.bilibili.com/x/web-interface/popular?ps=${r}&pn=${e}`, s.signal);
          if (!Array.isArray(f?.list)) throw new Error("热门接口返回格式异常");
          c = f.list;
        }
        if (!n()) return;
        if (s.signal.throwIfAborted(), !c.length) {
          if (g) throw g;
          break;
        }
        a = a.concat(c), l++;
      }
      const d = a.slice(0, r).map((u) => ({
        bvid: u.bvid || (u.aid ? `av${u.aid}` : ""),
        aid: u.aid || u.id,
        title: u.title || "未命名推荐视频",
        cover: (u.pic || "").replace(/^http:/, "https:"),
        duration: Number(u.duration || 0),
        play: Number(u.stat?.view || 0),
        upper: u.owner?.name || u.author || "UP主",
        upMid: String(u.owner?.mid || u.mid || ""),
        pubTs: u.pubdate || 0,
        pubTimeDesc: u.pubdate ? new Date(u.pubdate * 1e3).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "推荐"
      }));
      if (!n()) return;
      s.signal.throwIfAborted(), Object.assign(this.state, { videos: d, page: e, freshIdx: l, pendingScroll: t }), this.publishRecommendationSnapshot();
    } catch (r) {
      if (!n() || s.signal.aborted && !h) return;
      this.dependencies.publish({ specialLoading: !1, specialError: h ? "推荐加载超时，请手动重试" : r instanceof Error ? r.message : "推荐加载失败" });
    } finally {
      n() && (clearTimeout(this.timeout), this.timeout = void 0, this.request = null, this.state.loading = !1, this.state.pendingScroll = !1, this.dependencies.publish({ specialLoading: !1 }));
    }
  }
  publishRecommendationSnapshot() {
    if (!this.active) return;
    const e = this.state.videos.map((i) => ({
      id: String(i.bvid || i.aid || ""),
      aid: String(i.aid || ""),
      bvid: String(i.bvid || ""),
      title: String(i.title || "未命名推荐视频"),
      cover: String(i.cover || "").replace(/^http:/, "https:"),
      url: i.bvid ? `https://www.bilibili.com/video/${i.bvid}` : "#",
      duration: J(i.duration),
      playCount: O(i.play),
      author: String(i.upper || "UP主"),
      authorMid: String(i.upMid || ""),
      authorFace: "",
      favoriteDate: String(i.pubTimeDesc || "推荐"),
      selected: !1,
      writable: !1
    }));
    this.dependencies.publish({
      specialLoading: !1,
      specialError: "",
      specialTitle: "个性推荐",
      specialSubtitle: "根据您的喜好与全站热门为您推荐 · 点击右上刷新换一批",
      specialBadge: `第 ${this.state.page} 批`,
      specialPage: this.state.page,
      specialVideos: e
    }), this.state.pendingScroll && (this.state.pendingScroll = !1, this.dependencies.scrollToStart());
  }
}
function j(o, e) {
  const i = /* @__PURE__ */ new Set(), t = [e], s = /* @__PURE__ */ new Set();
  for (; t.length; ) {
    const n = t.pop();
    if (s.has(n)) continue;
    s.add(n), (o.find((r) => r.id === n)?.upMids || []).forEach((r) => i.add(String(r))), o.forEach((r) => {
      r.parentId === n && t.push(r.id);
    });
  }
  return Array.from(i);
}
function pe(o, e, i, t) {
  if (!["root", "into", "before", "after"].includes(t)) return "不支持的分组移动方式";
  const s = o.filter((r) => String(r.id) === e);
  if (!e || s.length !== 1) return "来源分组不存在或 ID 重复，请刷新检查";
  if (e === i) return "不能将分组移动到自身";
  if (t === "root") return null;
  if (!i) return "请选择目标分组";
  const n = /* @__PURE__ */ new Set();
  let h = i;
  for (; h; ) {
    if (h === e) return "不能将分组移动到自己的子分组中或旁边";
    if (n.has(h)) return "目标分组存在循环父子关系，本次移动未执行";
    n.add(h);
    const r = o.filter((a) => String(a.id) === h);
    if (r.length !== 1) return "目标分组或其父分组缺失、ID 重复，本次移动未执行";
    h = String(r[0].parentId || "");
  }
  return null;
}
function he(o) {
  const e = /* @__PURE__ */ new Map();
  o.forEach((n) => {
    const h = String(n.parentId || "");
    e.has(h) || e.set(h, []), e.get(h).push(n);
  });
  const i = [], t = /* @__PURE__ */ new Set(), s = (n = "", h = 0) => {
    (e.get(n) || []).forEach((r) => {
      t.has(String(r.id)) || (t.add(String(r.id)), i.push({
        id: String(r.id),
        name: String(r.name || "未命名分组"),
        parentId: String(r.parentId || ""),
        upMids: (r.upMids || []).map(String),
        depth: h
      }), s(String(r.id), h + 1));
    });
  };
  return s(), o.forEach((n) => {
    t.has(String(n.id)) || i.push({
      id: String(n.id),
      name: String(n.name || "未命名分组"),
      parentId: "",
      upMids: (n.upMids || []).map(String),
      depth: 0
    });
  }), i;
}
async function fe(o) {
  const { reset: e, signal: i, check: t, readStorage: s, getAggregateCache: n, readUpVideos: h } = o, r = { ...o.feed, offsetHistory: [...o.feed.offsetHistory] };
  let a = o.followings, l = null;
  const d = await C.api("https://api.bilibili.com/x/web-interface/nav", { signal: i });
  if (t(), !d.isLogin) throw new Error("未登录 B站");
  const u = await s(i);
  t();
  const p = new Set((Array.isArray(u.biliUnfollowedMidsV1) ? u.biliUnfollowedMidsV1 : []).map(String)), c = (Array.isArray(u.biliFollowingGroupsV1) ? u.biliFollowingGroupsV1 : []).map((w) => ({
    ...w,
    upMids: (Array.isArray(w.upMids) ? w.upMids : []).filter((S) => !p.has(String(S)))
  }));
  Array.isArray(u.biliFollowingsCacheV1?.list) && (a = u.biliFollowingsCacheV1.list.filter((w) => !p.has(String(w.mid))));
  const g = r.currentGroupId;
  if (g && g !== "__all__") {
    if (!c.find((B) => B.id === g))
      return r.videos = [], r.hasMore = !1, { feed: r, groups: c, followings: a, aggregateCache: l };
    const S = j(c, g);
    if (!S.length)
      return r.videos = [], r.hasMore = !1, { feed: r, groups: c, followings: a, aggregateCache: l };
    let x = S;
    if (r.selectedUpMid) {
      if (!S.includes(r.selectedUpMid)) throw new Error("该 UP 已不在当前分组，请重新选择");
      x = [r.selectedUpMid];
    }
    const _ = JSON.stringify([String(d.mid), g, r.selectedUpMid, [...S].sort()]), P = n(_);
    let U = [];
    if (!e && P && Date.now() - P.timestamp < 9e4)
      U = P.videos;
    else {
      const B = r.selectedUpMid ? 24 : Math.max(4, Math.ceil(24 / Math.min(x.length, 8))), L = 6;
      for (let G = 0; G < x.length; G += L) {
        const k = x.slice(G, G + L), R = await Promise.allSettled(k.map((F) => h(F, B, i)));
        if (t(), R.some((F) => F.status === "rejected")) throw new Error("部分 UP 动态读取失败，请手动重试");
        R.forEach((F) => {
          F.status === "fulfilled" && Array.isArray(F.value) && U.push(...F.value);
        });
      }
      U.sort((G, k) => (k.pubTs || 0) - (G.pubTs || 0)), l = { key: _, videos: U };
    }
    const A = r.pageSize || 24, M = (r.page - 1) * A, q = U.slice(M, M + A);
    return r.videos = q, r.hasMore = U.length > M + A, { feed: r, groups: c, followings: a, aggregateCache: l };
  }
  const f = r.pageSize || 24, m = [];
  let b = r.offsetHistory[r.page - 1] || "", v = 0;
  for (; m.length < f && v < 4; ) {
    v++;
    const w = new URLSearchParams({
      timezone_offset: "-480",
      type: "video",
      features: "itemOpusStyle,listOnlyfans,opusBigCover,decorationCard,forwardListHidden"
    });
    b && w.set("offset", b), r.updateBaseline && w.set("update_baseline", r.updateBaseline);
    const S = await C.api(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?${w.toString()}`, { signal: i });
    if (t(), !Array.isArray(S?.items)) throw new Error("关注动态返回格式异常");
    const x = S?.items || [];
    r.nextOffset = S?.offset || "", r.hasMore = !!S?.has_more, S?.update_baseline && (r.updateBaseline = S.update_baseline), b = r.nextOffset;
    for (const _ of x) {
      const P = _?.modules?.module_dynamic || {}, U = P.major || {}, A = U.archive || U.ugc_season?.sections?.[0]?.episodes?.[0]?.arc || P.major?.archive;
      if (!A) continue;
      const M = _?.modules?.module_author || {}, q = M.pub_time || (M.pub_ts ? new Date(M.pub_ts * 1e3).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "近期"), B = A.stat || {}, L = Number(B.play || 0), G = A.bvid && String(A.bvid).startsWith("BV") ? String(A.bvid) : "", k = A.title || _?.modules?.module_dynamic?.desc?.text || "未命名视频", R = A.cover || "", F = Number(A.duration_text ? ie(A.duration_text) : A.duration || 0);
      if (m.push({
        bvid: G,
        aid: A.aid,
        title: k,
        cover: R,
        duration: F,
        play: L,
        upper: M.name || "关注的UP主",
        upMid: String(M.mid || ""),
        pubTs: M.pub_ts || 0,
        pubTimeDesc: q
      }), m.length >= f) break;
    }
    if (!r.hasMore || !b) break;
  }
  return r.videos = m, { feed: r, groups: c, followings: a, aggregateCache: l };
}
class ge {
  constructor(e) {
    this.options = e, this.feedState = {
      videos: [],
      page: 1,
      pageSize: 24,
      offsetHistory: [""],
      currentOffset: "",
      nextOffset: "",
      updateBaseline: "",
      hasMore: !0,
      loading: !1,
      pendingScroll: !1,
      currentGroupId: "__all__",
      selectedUpMid: ""
    }, this.followingActive = !1, this.followingRequest = null, this.groupFeedAggregationCache = /* @__PURE__ */ new Map();
  }
  clearAggregationCache() {
    this.groupFeedAggregationCache.clear();
  }
  cancelFollowing() {
    const e = this.followingRequest;
    this.followingRequest = null, clearTimeout(this.followingTimeout), e?.abort(), this.feedState.loading = !1, this.feedState.pendingScroll = !1;
  }
  setFollowingActive(e) {
    this.followingActive = e, e || (this.cancelFollowing(), y.state.organizer.mode === "following" && y.updateOrganizer({ specialLoading: !1 }));
  }
  openFollowingView() {
    this.options.suspendEmbeddedPlayback(), y.updateOrganizer({ mode: "following", specialLoading: !1, specialError: "" }), this.publishFeedSnapshot(), this.feedState.videos.length || this.loadFollowing(!0);
  }
  async loadFollowing(e = !1, i = {}) {
    if (!this.followingActive) return;
    this.cancelFollowing();
    const t = new AbortController();
    this.followingRequest = t;
    const s = t.signal, n = () => this.followingActive && this.followingRequest === t, h = JSON.stringify(this.options.getUpGroups()), r = JSON.stringify(this.options.getFollowingsCache()), a = () => {
      if (s.throwIfAborted(), !n()) throw new DOMException("Stale following request", "AbortError");
      if (JSON.stringify(this.options.getUpGroups()) !== h) throw new Error("关注分组已变更，请刷新后重试");
    }, l = { ...this.feedState, ...i, offsetHistory: [...this.feedState.offsetHistory] }, d = l.currentGroupId !== this.feedState.currentGroupId || l.selectedUpMid !== this.feedState.selectedUpMid;
    this.followingTimeout = setTimeout(() => {
      n() && (this.cancelFollowing(), y.updateOrganizer({ specialLoading: !1, specialError: "关注动态加载超时，请手动重试" }));
    }, 3e4), !d && l.page > this.feedState.page && l.currentGroupId === "__all__" && (l.offsetHistory[this.feedState.page] = this.feedState.nextOffset), (e || d) && (l.page = 1, l.offsetHistory = [""], l.currentOffset = "", l.nextOffset = "", l.updateBaseline = "", l.hasMore = !0, l.videos = []), l.loading = !0, this.feedState.loading = !0, y.updateOrganizer({ specialLoading: !0, specialError: "" });
    try {
      const u = await fe({
        feed: l,
        followings: this.options.getFollowingsCache(),
        reset: e,
        signal: s,
        check: a,
        readStorage: (p) => this.options.readChannelStorage(
          ["biliFollowingGroupsV1", "biliFollowingsCacheV1", "biliUnfollowedMidsV1"],
          p
        ),
        getAggregateCache: (p) => this.groupFeedAggregationCache.get(p),
        readUpVideos: (p, c, g) => this.options.fetchUpLatestVideos(p, c, g)
      });
      a(), Object.assign(this.feedState, u.feed), this.options.setUpGroups(u.groups), JSON.stringify(this.options.getFollowingsCache()) === r && this.options.setFollowingsCache(u.followings), u.aggregateCache && this.groupFeedAggregationCache.set(u.aggregateCache.key, {
        timestamp: Date.now(),
        videos: u.aggregateCache.videos
      }), this.publishFeedSnapshot();
    } catch (u) {
      n() && !s.aborted && y.updateOrganizer({ specialLoading: !1, specialError: u?.message || "未知错误" });
    } finally {
      n() && (clearTimeout(this.followingTimeout), this.followingRequest = null, this.feedState.loading = !1, this.feedState.pendingScroll = !1, y.updateOrganizer({ specialLoading: !1 }));
    }
  }
  publishFeedSnapshot() {
    if (!this.followingActive) return;
    const e = !this.feedState.currentGroupId || this.feedState.currentGroupId === "__all__", i = this.options.getUpGroups(), t = this.options.getFollowingsCache(), s = e ? null : i.find((d) => d.id === this.feedState.currentGroupId), n = (this.feedState.videos || []).map((d) => ({
      id: String(d.bvid || d.aid || ""),
      aid: String(d.aid || ""),
      bvid: String(d.bvid || ""),
      title: String(d.title || "未命名视频"),
      cover: String(d.cover || "").replace(/^http:/, "https:"),
      url: d.bvid ? `https://www.bilibili.com/video/${d.bvid}` : d.aid ? `https://www.bilibili.com/video/av${d.aid}` : "#",
      duration: J(d.duration),
      playCount: O(d.play),
      author: String(d.upper || "关注的UP主"),
      authorMid: String(d.upMid || ""),
      authorFace: "",
      favoriteDate: String(d.pubTimeDesc || "近期"),
      selected: !1,
      writable: !1
    })), h = [
      { id: "__all__", name: "全部关注", count: t?.length || 0, active: e, child: !1 },
      ...(i || []).map((d) => ({
        id: String(d.id),
        name: String(d.name || "未命名分组"),
        count: j(i, d.id).length,
        active: String(d.id) === String(this.feedState.currentGroupId),
        child: !!d.parentId
      }))
    ], r = s ? j(i, s.id) : [], a = new Map((t || []).map((d) => [String(d.mid), d])), l = r.map((d) => {
      const u = a.get(String(d));
      return {
        id: String(d),
        name: String(u?.name || `UP ${d}`),
        face: String(u?.face || ""),
        sign: String(u?.sign || ""),
        active: String(d) === String(this.feedState.selectedUpMid)
      };
    });
    y.updateOrganizer({
      specialLoading: !1,
      specialError: "",
      specialTitle: "正在关注",
      specialSubtitle: e ? "已关注 UP 主投稿视频更新 · 与 B站账号实时同步" : `聚合分组「${s?.name || ""}」中 UP 主发布的最新视频`,
      specialBadge: e ? `第 ${this.feedState.page} 页` : String(s?.name || "自定义分组"),
      specialPage: this.feedState.page,
      specialVideos: n,
      followingGroups: h,
      followingMembers: l,
      followingHasMore: !!(this.feedState.hasMore && (!e || this.feedState.nextOffset))
    }), this.feedState.pendingScroll && (this.feedState.pendingScroll = !1, document.querySelector("#fo-body")?.closest("section")?.scrollIntoView({ block: "start" }));
  }
}
async function se(o) {
  const e = await C.getBiliJct();
  if (!e) return { ok: !1, reason: "未检测到 B站 登录态（bili_jct 缺失）" };
  try {
    const i = new URLSearchParams({
      fid: String(o),
      act: "1",
      re_src: "11",
      csrf: e,
      csrf_token: e
    }), s = await (await fetch("https://api.bilibili.com/x/relation/modify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: i.toString()
    })).json();
    return s.code === 0 || s.code === 22002 || s.code === 22014 ? { ok: !0 } : { ok: !1, reason: s.message || "code " + s.code };
  } catch (i) {
    return { ok: !1, reason: i?.message || "网络请求失败" };
  }
}
async function oe(o) {
  const e = await C.getBiliJct();
  if (!e) return { ok: !1, reason: "未检测到 B站 登录态（bili_jct 缺失）" };
  try {
    const i = new URLSearchParams({
      fid: String(o),
      act: "2",
      re_src: "11",
      csrf: e,
      csrf_token: e
    }), s = await (await fetch("https://api.bilibili.com/x/relation/modify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: i.toString()
    })).json();
    return s.code === 0 || s.code === 22002 || s.code === 22014 ? { ok: !0 } : { ok: !1, reason: s.message || "code " + s.code };
  } catch (i) {
    return { ok: !1, reason: i?.message || "网络请求失败" };
  }
}
async function me(o, e = "", i = "", t = !1) {
  const s = globalThis;
  let n = s.LogicWeaverBiliUpGroupManager;
  if (n || (await new Promise((l) => setTimeout(l, 120)), n = s.LogicWeaverBiliUpGroupManager), !n) {
    o.notifyToast("关注分组管理器尚未加载，请刷新页面");
    return;
  }
  await o.initGroups();
  const h = localStorage.getItem("bili_upg_only_ungrouped_pref");
  n.open({ query: i || "", onlyUngrouped: h === "true" });
  const r = () => {
    const l = he(o.getGroups() || []), d = new Map(l.map((c) => [c.id, c.name])), u = /* @__PURE__ */ new Map();
    l.forEach(
      (c) => c.upMids.forEach((g) => {
        const f = u.get(String(g)) || [];
        f.push(c.id), u.set(String(g), f);
      })
    );
    const p = l.some((c) => c.id === n.state.activeGroupId) ? n.state.activeGroupId : l.some((c) => c.id === e) ? e : l[0]?.id || "";
    n.update({
      loading: !1,
      error: "",
      groups: l,
      activeGroupId: p,
      followings: (o.getFollowings() || []).map((c) => {
        const g = u.get(String(c.mid)) || [];
        return {
          mid: String(c.mid),
          name: String(c.name || `UP ${c.mid}`),
          face: String(c.face || ""),
          sign: String(c.sign || ""),
          groupIds: g,
          groupName: g.map((f) => d.get(f)).filter(Boolean).join(" / ")
        };
      })
    });
  }, a = async () => {
    try {
      await o.saveGroups(), r(), s.__refreshBiliUpGroupManager = r;
    } catch (l) {
      n.update({ error: l?.message || "分组保存失败，请检查存储" });
    }
  };
  n.setActionHandler(async (l, d) => {
    if (l === "close") {
      localStorage.setItem("bili_upg_only_ungrouped_pref", n.state.onlyUngrouped ? "true" : "false"), delete s.__refreshBiliUpGroupManager, n.setActionHandler(null);
      return;
    }
    if (l === "refresh") {
      n.update({ refreshing: !0, error: "" });
      try {
        await o.loadFollowedUps(!0, () => {
          r(), n.update({ refreshing: !1 });
        }), r();
      } catch (u) {
        n.update({ error: u?.message || "刷新关注列表失败" });
      } finally {
        n.update({ refreshing: !1 });
      }
      return;
    }
    if (l === "create-group") {
      const u = String(d?.name || "").trim();
      if (!u) return;
      const p = String(d?.parentId || "");
      o.getGroups().push({
        id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: u,
        parentId: p || null,
        upMids: [],
        createdAt: Date.now()
      }), await a(), o.notifyToast(p ? `已创建子分组「${u}」` : `已创建分组「${u}」`);
      return;
    }
    if (l === "rename-group") {
      const p = o.getGroups().find((g) => String(g.id) === String(d?.id)), c = String(d?.name || "").trim();
      p && c && (p.name = c, await a());
      return;
    }
    if (l === "delete-group") {
      const u = String(d || ""), p = o.getGroups(), c = p.find((g) => String(g.id) === u);
      if (!c) return;
      o.showConfirmModal({
        title: "删除关注分组",
        content: `确定删除分组「${c.name}」吗？分组中的 UP 主不会被取消关注。`,
        confirmText: "删除",
        onConfirm: async () => {
          const g = c.parentId || null;
          p.forEach((f) => {
            String(f.parentId || "") === u && (f.parentId = g);
          }), o.setGroups(p.filter((f) => String(f.id) !== u)), await a();
        }
      });
      return;
    }
    if (l === "move-group") {
      const u = String(d?.sourceId || ""), p = String(d?.targetId || ""), c = String(d?.mode ?? "into"), g = o.getGroups(), f = pe(g, u, p, c);
      if (f) {
        n.update({ error: f });
        return;
      }
      const m = g.find((b) => String(b.id) === u);
      if (!m) return;
      if (c === "root") m.parentId = null;
      else {
        const b = g.find((v) => String(v.id) === p);
        if (!b) return;
        if (m.parentId = c === "into" ? b.id : b.parentId || null, c !== "into") {
          const v = g.indexOf(m);
          g.splice(v, 1);
          const w = g.indexOf(b);
          g.splice(w + (c === "after" ? 1 : 0), 0, m);
        }
      }
      await a();
      return;
    }
    if (l === "toggle-member") {
      const u = o.getGroups(), p = u.find((m) => String(m.id) === String(d?.groupId)), c = String(d?.mid || "");
      if (!p || !c) return;
      const g = u.some(
        (m) => String(m.id) !== String(p.id) && (m.upMids || []).map(String).includes(c)
      ), f = (p.upMids || []).map(String).indexOf(c);
      if (f < 0 && g) return;
      n.update({ busyMid: c }), f >= 0 ? p.upMids.splice(f, 1) : p.upMids.push(c), await a(), n.update({ busyMid: "" });
      return;
    }
    if (l === "preview-up") {
      const p = o.getFollowings().find((c) => String(c.mid) === String(d?.mid));
      p && o.previewUp(
        { preventDefault() {
        }, stopPropagation() {
        }, clientX: Number(d?.clientX || 0), clientY: Number(d?.clientY || 0) },
        p
      );
    }
  }), s.__refreshBiliUpGroupManager = r;
  try {
    await o.loadFollowedUps(!1, r), r(), t && n.update({ activeGroupId: e || n.state.activeGroupId });
  } catch (l) {
    n.update({ loading: !1, error: l?.message || "无法读取关注列表" });
  }
}
const N = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map();
function be(o) {
  o != null ? N.delete(String(o)) : N.clear();
}
async function ne(o, e = 6, i) {
  i?.throwIfAborted();
  const t = String(o), s = N.get(t);
  if (!i && s && Date.now() - s.timestamp < 3e5)
    return s.videos.slice(0, e);
  if (!i && z.has(t))
    try {
      return (await z.get(t) || []).slice(0, e);
    } catch {
      return [];
    }
  const n = (async () => {
    try {
      try {
        const l = await C.api(
          `https://api.bilibili.com/x/v2/medialist/resource/list?type=1&biz_id=${t}&ps=${Math.max(e, 6)}`,
          { signal: i }
        );
        if (i?.throwIfAborted(), Array.isArray(l?.media_list) && l.media_list.length > 0) {
          const d = [];
          for (const u of l.media_list) {
            const p = u.bv_id || (u.id ? `av${u.id}` : ""), c = Number(u.pubtime || 0);
            let g = "最新";
            if (c > 0) {
              const f = new Date(c * 1e3), m = /* @__PURE__ */ new Date();
              f.getFullYear() === m.getFullYear() ? g = `${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}` : g = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}`;
            }
            if (d.push({
              bvid: p,
              aid: u.id,
              title: u.title || "未命名视频",
              cover: (u.cover || "").replace(/^http:/, "https:"),
              duration: Number(u.duration || 0),
              play: Number(u.cnt_info?.play || 0),
              upper: u.upper?.name || "关注的UP主",
              upMid: t,
              pubTs: c,
              pubTimeDesc: g
            }), d.length >= e) break;
          }
          if (d.length > 0)
            return i || N.set(t, { timestamp: Date.now(), videos: d }), d;
        }
      } catch (l) {
        if (i?.aborted) throw l;
      }
      const r = await C.api(
        `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${t}&features=itemOpusStyle`,
        { signal: i }
      );
      if (i?.throwIfAborted(), !Array.isArray(r?.items)) {
        if (i) throw new Error("UP 动态返回格式异常");
        return [];
      }
      const a = [];
      for (const l of r.items) {
        const d = l?.modules?.module_dynamic || {}, u = d.major || {}, p = u.archive || u.ugc_season?.sections?.[0]?.episodes?.[0]?.arc || d.major?.archive;
        if (!p) continue;
        const c = l?.modules?.module_author || {}, g = c.pub_ts || (c.pub_time ? Math.floor(new Date(c.pub_time).getTime() / 1e3) : 0), f = c.pub_time || (c.pub_ts ? new Date(c.pub_ts * 1e3).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "近期"), m = p.stat || {}, b = Number(m.play || 0), v = p.bvid || (p.aid ? `av${p.aid}` : ""), w = p.title || l?.modules?.module_dynamic?.desc?.text || "未命名视频", S = (p.cover || "").replace(/^http:/, "https:"), x = Number(p.duration_text ? ie(p.duration_text) : p.duration || 0);
        if (a.push({
          bvid: v,
          aid: p.aid,
          title: w,
          cover: S,
          duration: x,
          play: b,
          upper: c.name || "关注的UP主",
          upMid: t,
          pubTs: g,
          pubTimeDesc: f
        }), a.length >= e) break;
      }
      return i || N.set(t, { timestamp: Date.now(), videos: a }), a;
    } catch (r) {
      if (i) throw r;
      return console.warn(`读取 UP ${o} 视频失败:`, r), [];
    } finally {
      i || z.delete(t);
    }
  })();
  return i || z.set(t, n), (await n || []).slice(0, e);
}
function K(o) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(o, e);
    else {
      const i = {};
      o.forEach((t) => {
        try {
          const s = localStorage.getItem(t);
          s && (i[t] = JSON.parse(s));
        } catch {
        }
      }), e(i);
    }
  });
}
function Y(o) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(o, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(o).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function we(o, e) {
  const t = globalThis.LogicWeaverBiliOrganizerDialogs;
  if (!t) {
    e("确认弹窗尚未加载，请刷新页面");
    return;
  }
  let s = "";
  o.content instanceof Node ? s = o.content.textContent || "" : typeof o.content == "string" && (s = new DOMParser().parseFromString(o.content, "text/html").body.textContent || ""), t.openConfirm(
    {
      title: o.title || "确认提示",
      message: s.trim(),
      confirmText: o.confirmText || "确定",
      cancelText: o.cancelText || "取消",
      danger: o.danger !== !1
    },
    async () => {
      typeof o.onConfirm == "function" && await o.onConfirm();
    }
  );
}
function Se(o, e, i) {
  o.preventDefault?.(), o.stopPropagation?.();
  const t = String(e.mid), s = i.getFollowings() || [];
  if (!e.face || !e.sign) {
    const p = s.find((c) => String(c.mid) === t);
    p && (!e.face && p.face && (e.face = p.face), !e.sign && p.sign && (e.sign = p.sign));
  }
  const n = s.some((p) => String(p.mid) === t), h = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", r = globalThis;
  if (!r.LogicWeaverBiliUpPreview) return;
  const a = 320, l = 280;
  let d = o.clientX + 10, u = o.clientY + 10;
  d + a > window.innerWidth - 12 && (d = Math.max(12, o.clientX - a - 10)), u + l > window.innerHeight - 12 && (u = Math.max(12, o.clientY - l - 10)), r.LogicWeaverBiliUpPreview.open(
    {
      mid: t,
      name: e.name || "UP主",
      face: e.face || h,
      sign: e.sign || "暂无个人简介",
      followed: n,
      left: d,
      top: u,
      loading: !0,
      error: "",
      videos: []
    },
    async (p) => {
      if (p) {
        const c = await se(t);
        if (c.ok) {
          let g = i.getFollowings();
          g || (g = [], i.setFollowings(g)), g.some((f) => String(f.mid) === t) || g.unshift({ mid: t, name: e.name || "UP主", face: e.face || "", sign: e.sign || "" });
          try {
            const f = await K(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]), b = (Array.isArray(f.biliUnfollowedMidsV1) ? f.biliUnfollowedMidsV1 : []).filter((w) => String(w) !== t), v = f.biliFollowingsCacheV1 || {};
            await Y({
              biliFollowingsCacheV1: { mid: v.mid || "", updatedAt: Date.now(), list: g },
              biliUnfollowedMidsV1: b
            });
          } catch {
          }
          return i.refreshManager?.(), i.notifyToast(`已关注「${e.name || t}」`), !0;
        } else
          return i.notifyToast(`关注失败：${c.reason || "网络异常"}`), !1;
      } else {
        const c = await oe(t);
        if (c.ok) {
          const g = i.getFollowings();
          g && i.setFollowings(g.filter((f) => String(f.mid) !== t)), (i.getGroups() || []).forEach((f) => {
            f.upMids = (f.upMids || []).filter((m) => String(m) !== t);
          }), await i.saveGroups();
          try {
            const f = await K(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]), m = Array.isArray(f.biliUnfollowedMidsV1) ? f.biliUnfollowedMidsV1 : [], b = new Set(m.map(String));
            b.add(t);
            const v = f.biliFollowingsCacheV1 || {}, w = (v.list || i.getFollowings() || []).filter((S) => String(S.mid) !== t);
            await Y({
              biliFollowingsCacheV1: { mid: v.mid || "", updatedAt: Date.now(), list: w },
              biliUnfollowedMidsV1: Array.from(b)
            });
          } catch {
          }
          return be(t), i.clearAggregationCache(), i.refreshManager?.(), i.notifyToast(`已取消关注「${e.name || t}」`), !0;
        } else
          return i.notifyToast(`取消关注失败：${c.reason || "网络异常"}`), !1;
      }
    }
  ), (!e.face || !e.sign) && C.api(`https://api.bilibili.com/x/space/wbi/acc/info?mid=${t}`).then((p) => {
    if (p) {
      const c = p.face ? String(p.face).replace(/^http:/, "https:") : e.face, g = p.sign || e.sign;
      r.LogicWeaverBiliUpPreview.update({ face: c, sign: g });
    }
  }).catch(() => {
  }), ne(e.mid, 3).then((p) => {
    if (!p.length) {
      r.LogicWeaverBiliUpPreview.update({ loading: !1, videos: [] });
      return;
    }
    r.LogicWeaverBiliUpPreview.update({
      loading: !1,
      videos: p.slice(0, 3).map((c) => ({
        bvid: c.bvid,
        title: c.title,
        cover: c.cover,
        duration: c.duration ? J(c.duration) : "",
        playCount: O(c.play),
        published: c.pubTimeDesc || "最新",
        url: c.bvid ? `https://www.bilibili.com/video/${c.bvid}` : "#"
      }))
    });
  }).catch(() => {
    r.LogicWeaverBiliUpPreview.update({ loading: !1, error: "加载失败，请重试" });
  });
}
function ve(o) {
  const e = globalThis;
  typeof e.showBiliToast == "function" && e.showBiliToast(o);
}
async function ye(o, e = ve) {
  let i = o.aid;
  const t = o.bvid || "";
  if (!i && t)
    try {
      i = (await C.api(
        `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`
      ))?.aid, i && (o.aid = i);
    } catch (a) {
      console.error("解析视频 aid 失败", a);
    }
  if (!i)
    return e("未能获取到该视频 AID，请稍后重试"), { ok: !1, reason: "未能获取到该视频 AID" };
  const s = await C.getUserNav();
  if (!s.isLogin)
    return e("未能获取到 B站收藏夹，请确认已登录 B站"), { ok: !1, reason: "未能获取到 B站收藏夹" };
  const n = await C.getCreatedFolders(s.mid);
  if (!n || !n.length)
    return e("未能获取到 B站收藏夹，请确认已登录 B站"), { ok: !1, reason: "未能获取到 B站收藏夹" };
  const h = n.find((a) => a.title === "收集箱") || n.find((a) => a.title && a.title.includes("收集箱")) || n.find((a) => a.title && a.title.includes("收件箱")) || n.find((a) => a.title === "默认收藏夹") || n.find((a) => a.title && a.title.includes("默认")) || n[0];
  if (!h?.id)
    return e("未找到目标收藏夹，请检查 B站 收藏夹设置"), { ok: !1, reason: "未找到目标收藏夹" };
  e(`正在保存至「${h.title}」…`);
  const r = await C.addVideoToFavorite(h.id, i);
  if (r.ok)
    return e(`已成功保存到「${h.title}」`), { ok: !0, targetFolder: h };
  {
    const a = r.reason || "保存失败";
    return a.includes("已") || a.includes("exist") || a.includes("11201") ? e(`该视频已在「${h.title}」中`) : e(`保存失败：${a}`), r;
  }
}
function Ce(o) {
  const e = Array.isArray(o?.cues) ? o.cues : [], i = String(o?.desc || "").trim(), t = Array.isArray(o?.viewPoints) ? o.viewPoints : [], s = [];
  if (t.length > 0)
    for (let n = 0; n < t.length; n++) {
      const h = t[n], r = Math.max(0, Number(h.from || 0)), a = n + 1 < t.length ? Number(t[n + 1].from || 0) : 0, l = Math.max(r, Number(h.to || a || (e.length ? e[e.length - 1].to : r + 120))), d = String(h.content || h.title || h.part_name || `第 ${n + 1} 节`).trim(), u = e.filter((p) => p.from >= r && (a ? p.from < a : p.from <= l));
      s.push({
        id: n,
        from: r,
        to: l,
        title: d,
        cues: u.map((p, c) => ({ index: c, from: p.from, to: p.to, content: p.content })),
        source: "viewpoint"
      });
    }
  if (!s.length && i) {
    const n = /(?:^|\r?\n)\s*(?:\[?(\d{1,2}:)?(\d{1,2}):(\d{2})\]?)\s*(?:[-–—|：:\s]\s*)?([^\r\n]{2,80})/g;
    let h;
    const r = [];
    for (; (h = n.exec(i)) !== null; ) {
      const a = h[1] ? parseInt(h[1], 10) : 0, l = parseInt(h[2], 10), d = parseInt(h[3], 10), u = a * 3600 + l * 60 + d, p = h[4].replace(/^[-–—|：:\s]+/, "").trim();
      p && !/^(点赞|投币|收藏|关注|交流群|合作|vx|微信|qq|微博)/i.test(p) && r.push({ from: u, title: p });
    }
    if (r.length >= 2) {
      let a = !0;
      for (let l = 1; l < r.length; l++)
        if (r[l].from <= r[l - 1].from) {
          a = !1;
          break;
        }
      if (a)
        for (let l = 0; l < r.length; l++) {
          const d = r[l], u = r[l + 1], p = d.from, c = u ? u.from : e.length ? e[e.length - 1].to : p + 120, g = e.filter((f) => f.from >= p && (u ? f.from < u.from : f.from <= c));
          s.push({
            id: l,
            from: p,
            to: c,
            title: d.title,
            cues: g.map((f, m) => ({ index: m, from: f.from, to: f.to, content: f.content })),
            source: "desc"
          });
        }
    }
  }
  if (!s.length && e.length > 0) {
    let n = [], h = e[0].from;
    const r = (a = null) => {
      if (!n.length) return;
      const l = n[0].from, d = n[n.length - 1].to, u = n[0].content || "", p = u.replace(/^(那么|其实|所以|大家好|今天|那我们|接下来|然后|就是说)[,，\s]*/g, "").trim(), c = (p.length >= 4 ? p.slice(0, 24) : u.slice(0, 24)) || `小节 ${s.length + 1}`;
      s.push({
        id: s.length,
        from: l,
        to: a !== null ? a : d,
        title: c,
        cues: n.map((g, f) => ({ index: f, from: g.from, to: g.to, content: g.content })),
        source: "smart"
      }), n = [];
    };
    for (let a = 0; a < e.length; a++) {
      const l = e[a], d = e[a + 1];
      n.push(l);
      const u = l.to - h, p = d ? d.from - l.to : 0, c = /[。！？!?]$/.test(l.content), g = d && /^(接下来|第二|第三|第四|另外|总的来说|最后|在.+方面|回顾|来看)/.test(d.content);
      (p >= 2.2 && (u >= 18 || n.length >= 4) || u >= 45 && (c || g) || u >= 75 && (c || p >= 1)) && d && (r(d.from), h = d.from);
    }
    r();
  }
  return s.forEach((n) => {
    if (n.cues && n.cues.length > 0) {
      const h = n.cues.map((p) => p.content.trim()).filter(Boolean), r = [], a = [];
      let l = [], d = [], u = 0;
      for (let p = 0; p < n.cues.length; p++) {
        const c = n.cues[p];
        let g = (c.content || "").trim();
        g && (/[。！？!?；;：:，,、…”’）》】）]$/.test(g) || (p === n.cues.length - 1 || /^(为什么|为何|怎么|如何|什么|是否|谁)/.test(g) ? g += "。" : g += "，"), l.push(g), d.push({
          index: p,
          from: Number(c.from || 0),
          to: Number(c.to || 0),
          content: g
        }), u += g.length, /[。！？!?]$/.test(g) && (u >= 85 || d.length >= 4) && (r.push(l.join("")), a.push(d), l = [], d = [], u = 0));
      }
      l.length && (r.push(l.join("")), a.push(d)), n.paragraphs = r.length ? r : [h.join("，") + "。"], n.paragraphCues = a.length ? a : [n.cues.map((p, c) => ({ index: c, from: p.from, to: p.to, content: p.content }))];
    } else
      n.paragraphs = [n.title || "本小节暂无文本内容。"], n.paragraphCues = [];
  }), s;
}
async function Ae(o) {
  const { channelKey: e, channel: i, cache: t, visibleCount: s, force: n, signal: h, readArchive: r } = o;
  if (h.throwIfAborted(), !i) throw new Error("订阅频道不存在");
  if (!n && t && Date.now() - t.at < 600 * 1e3 && t.editions?.length) {
    let f = s;
    return { editions: t.editions.map((b) => {
      const v = b.documents.slice(0, f);
      return f -= v.length, { ...b, documents: v };
    }).filter((b) => b.documents.length), cached: !0 };
  }
  const a = await r(h) || {}, l = Array.isArray(a[e]) ? a[e] : [], d = await C.api(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${i.mid}`, { signal: h });
  if (h.throwIfAborted(), !Array.isArray(d?.items)) throw new Error("订阅动态返回格式异常");
  const p = d.items.map((f) => {
    const m = f?.modules || {}, b = m.module_author || {}, v = m.module_dynamic || {}, w = v.major?.archive || {}, S = w.bvid || "";
    return S ? {
      bvid: S,
      title: w.title || v.desc?.text || "视频投稿",
      desc: v.desc?.text || w.desc || "",
      cover: (w.cover || "").replace(/^http:/, "https:"),
      pubTs: Number(b.pub_ts || f.pub_ts || 0),
      author: b.name || i.fallbackName,
      play: w.stat?.play || 0,
      danmaku: w.stat?.danmaku || 0,
      durationText: w.duration_text || "",
      mid: i.mid
    } : null;
  }).filter(Boolean).sort((f, m) => m.pubTs - f.pubTs).slice(0, s), c = (f) => {
    const m = new Date(f * 1e3);
    return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}-${String(m.getDate()).padStart(2, "0")}`;
  }, g = [];
  for (const f of p) {
    h.throwIfAborted();
    const m = c(f.pubTs);
    let b = g.find((S) => S.date === m);
    b || (b = { date: m, documents: [], createdAt: Date.now() }, g.push(b));
    const v = n ? null : l.find((S) => S.date === m)?.documents?.find((S) => S.bvid === f.bvid);
    if (v?.hasSubtitle) {
      b.documents.push(v);
      continue;
    }
    const w = await C.fetchVideoSubtitleDetails(f.bvid, void 0, h);
    h.throwIfAborted(), b.documents.push({
      ...f,
      aid: w.aid || null,
      text: w.ok ? w.bodyText || f.desc || "没有字幕" : f.desc || "没有字幕",
      cues: w.cues || [],
      hasSubtitle: w.ok,
      viewPoints: w.viewPoints || []
    });
  }
  return { editions: g, cached: !1 };
}
const E = "biliSubCustomChannelsV1", V = "biliSubVideoArchivesV1";
function Me(o) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(o, e);
    else {
      const i = {};
      o.forEach((t) => {
        try {
          const s = localStorage.getItem(t);
          s && (i[t] = JSON.parse(s));
        } catch {
        }
      }), e(i);
    }
  });
}
function Ue(o) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(o, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(o).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function D(o, e) {
  const i = globalThis;
  typeof i.showBiliToast == "function" && i.showBiliToast(o, e);
}
class Fe {
  constructor(e) {
    this.options = e, this.subChannels = {
      shana: { mid: "3546795384769164", fallbackName: "刹那观察室", title: "刹那观察室", defaultTitle: "刹那观察室", builtin: !0 },
      news: { mid: "3706929260006322", fallbackName: "黑鸦Heya", title: "黑鸦Heya", defaultTitle: "黑鸦Heya", builtin: !0 }
    }, this.subState = {
      channelKey: "shana",
      viewMode: "srt",
      loading: !1,
      editions: [],
      activeDate: "",
      activeDocBvid: "",
      visibleCounts: { shana: 3, news: 3 },
      cache: { shana: { at: 0, editions: [] }, news: { at: 0, editions: [] } }
    }, this.subCustomChannelsLoaded = !1, this.subscriptionActive = !1, this.subscriptionRevision = 0, this.subscriptionRequest = null, this.subscriptionArchiveQueue = Promise.resolve();
  }
  async ensureSubCustomChannels(e) {
    if (e?.throwIfAborted(), this.subCustomChannelsLoaded) return;
    const i = e ? await this.options.readChannelStorage([E], e) : await Me([E]);
    if (e?.throwIfAborted(), this.subCustomChannelsLoaded) return;
    (Array.isArray(i[E]) ? i[E] : []).forEach((s) => {
      if (!s?.mid) return;
      const n = `up-${s.mid}`;
      this.subChannels[n] = {
        mid: String(s.mid),
        fallbackName: s.name || `UP ${s.mid}`,
        title: s.name || `UP ${s.mid}`,
        custom: !0
      };
    }), this.subCustomChannelsLoaded = !0;
  }
  async saveSubCustomChannels() {
    const e = Object.values(this.subChannels).filter((i) => i.custom).map((i) => ({ mid: i.mid, name: i.fallbackName }));
    await Ue({ [E]: e });
  }
  async subscribeFollowedBiliUp(e) {
    const i = String(e?.mid || "");
    if (!i) return;
    const t = this.subscriptionRevision;
    await this.ensureSubCustomChannels();
    const s = `up-${i}`;
    this.subChannels[s] = {
      mid: i,
      fallbackName: e.name || `UP ${i}`,
      title: e.name || `UP ${i}`,
      custom: !0
    }, this.subState.cache[s] ||= { at: 0, editions: [] }, this.subState.visibleCounts[s] = 3, await this.saveSubCustomChannels(), this.subscriptionActive && t === this.subscriptionRevision && await this.loadSubVideo(!0, { channelKey: s });
  }
  async addBiliSubChannel() {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (!i) {
      D("添加弹窗尚未加载，请刷新页面");
      return;
    }
    const t = /* @__PURE__ */ new Map();
    i.openChannelPicker(async (s) => {
      const n = t.get(String(s));
      if (!n) throw new Error("未找到该 UP 主");
      await this.subscribeFollowedBiliUp(n);
    });
    try {
      await this.options.initUpGroups();
      const s = await this.options.loadFollowedUps(!1), n = new Set(Object.values(this.subChannels).map((r) => String(r.mid)));
      (s || []).forEach((r) => t.set(String(r.mid), r));
      const h = (this.options.getUpGroups() || []).map((r) => ({
        id: String(r.id),
        name: String(r.name || "未命名分组"),
        mids: j(this.options.getUpGroups(), r.id)
      }));
      i.updateChannelPicker({
        loading: !1,
        error: "",
        groups: h,
        items: (s || []).map((r) => ({
          mid: String(r.mid),
          name: String(r.name || `UP ${r.mid}`),
          face: String(r.face || ""),
          added: n.has(String(r.mid))
        }))
      });
    } catch (s) {
      i.updateChannelPicker({ loading: !1, error: s?.message || "无法读取关注列表" });
    }
  }
  getActiveSubscriptionDocument() {
    const i = (this.subState.editions || []).flatMap((t) => t.documents || []);
    return i.find((t) => t.bvid === this.subState.activeDocBvid) || i[0] || null;
  }
  publishSubscriptionSnapshot() {
    if (!this.subscriptionActive) return;
    const e = this.subState.channelKey || "shana", i = this.subChannels[e] || this.subChannels.shana, t = (this.subState.editions || []).flatMap((a) => a.documents || []), s = this.getActiveSubscriptionDocument(), n = s ? this.extractChapters(s) : [], h = Array.isArray(s?.cues) ? s.cues : [], r = le(s?.desc || s?.text || "");
    y.updateOrganizer({
      subscriptionTitle: String(i.fallbackName || i.title || "订阅视频"),
      subscriptionSubtitle: "订阅视频 · AI 逐字字幕稿 · 点击台词即刻跳转播放",
      subscriptionScriptMode: localStorage.getItem("biliSubScriptMode") === "lyrics" ? "lyrics" : "newspaper",
      subscriptionChannels: Object.entries(this.subChannels).map(([a, l]) => ({
        id: a,
        name: String(l.fallbackName || l.title || a),
        active: a === e
      })),
      subscriptionVideos: t.map((a) => ({
        bvid: String(a.bvid || ""),
        title: String(a.title || a.bvid || "未命名视频"),
        duration: String(a.durationText || ""),
        active: a.bvid === s?.bvid
      })),
      subscriptionChapters: n.map((a) => ({
        title: String(a.title || "未命名章节"),
        from: Number(a.from || 0),
        to: Number(a.to || 0),
        fromText: T(a.from),
        toText: T(a.to),
        paragraphs: (a.paragraphs || []).map(String),
        paragraphCues: (a.paragraphCues || []).map(
          (l) => (l || []).map((d, u) => ({
            index: Number(d.index ?? u),
            from: Number(d.from || 0),
            to: Number(d.to || 0),
            timeText: T(d.from),
            content: String(d.content || "")
          }))
        ),
        cues: (a.cues || []).map((l, d) => ({
          index: Number(l.index ?? d),
          from: Number(l.from || 0),
          to: Number(l.to || 0),
          timeText: T(l.from),
          content: String(l.content || "")
        }))
      })),
      subscriptionCues: h.map((a, l) => ({
        index: l,
        from: Number(a.from || 0),
        to: Number(a.to || 0),
        timeText: T(a.from),
        content: String(a.content || "")
      })),
      subscriptionDescription: r,
      subscriptionCurrent: s ? {
        bvid: String(s.bvid || ""),
        aid: String(s.aid || ""),
        title: String(s.title || s.bvid || "未命名视频"),
        author: String(s.author || i.fallbackName || "UP主"),
        cover: String(s.cover || "").replace(/^http:/, "https:"),
        description: String(s.desc || ""),
        playCount: O(s.play || 0),
        danmakuCount: O(s.danmaku || 0),
        duration: String(s.durationText || "")
      } : null
    });
  }
  extractChapters(e) {
    return Ce(e);
  }
  async copyActiveSubscriptionScript() {
    const e = this.getActiveSubscriptionDocument();
    if (!e) {
      D("当前没有可复制的字幕稿");
      return;
    }
    const i = localStorage.getItem("biliSubScriptMode") || "newspaper", t = this.extractChapters(e), s = i === "newspaper" && t.length ? t.map(
      (n, h) => `【第 ${String(h + 1).padStart(2, "0")} 节 · ${n.title}】(⏱ ${T(n.from)} - ${T(n.to)})
${(n.paragraphs || []).join(`

`)}`
    ).join(`

`) : String(e.text || e.cues?.map((n) => n.content).filter(Boolean).join(`
`) || "").trim();
    if (!s) {
      D("当前视频暂无可复制的字幕稿");
      return;
    }
    try {
      await navigator.clipboard.writeText(s), D(i === "newspaper" ? "报纸分段稿已复制" : "字幕稿已复制为纯文本");
    } catch {
      D("复制失败，请检查剪贴板权限");
    }
  }
  cancelSubscription() {
    this.subscriptionRevision++;
    const e = this.subscriptionRequest;
    this.subscriptionRequest = null, clearTimeout(this.subscriptionTimer), e?.abort(), this.subState.loading = !1;
  }
  setSubscriptionActive(e) {
    this.subscriptionActive = e, e || (this.cancelSubscription(), y.state.organizer.mode === "subscription" && y.updateOrganizer({ subscriptionLoading: !1 }));
  }
  loadSubVideoData(e, i, t, s) {
    return Ae({
      channelKey: e,
      channel: this.subChannels[e],
      cache: this.subState.cache[e],
      visibleCount: i,
      force: t,
      signal: s,
      readArchive: async (n) => (await this.options.readChannelStorage([V], n))[V]
    });
  }
  async loadSubVideo(e = !1, i = {}) {
    if (!this.subscriptionActive) return;
    this.cancelSubscription();
    const t = new AbortController();
    this.subscriptionRequest = t;
    const s = t.signal, n = () => this.subscriptionActive && this.subscriptionRequest === t, h = () => {
      if (s.throwIfAborted(), !n()) throw new DOMException("Stale subscription read", "AbortError");
    }, r = i.channelKey || this.subState.channelKey || "shana", a = i.visibleCount ?? Math.max(3, Number(this.subState.visibleCounts[r] || 3));
    this.subState.loading = !0, y.updateOrganizer({ subscriptionLoading: !0, subscriptionError: "" }), this.subscriptionTimer = setTimeout(() => {
      n() && (this.cancelSubscription(), y.updateOrganizer({ subscriptionLoading: !1, subscriptionError: "字幕订阅读取超时，请手动重试" }));
    }, 6e4);
    try {
      await this.ensureSubCustomChannels(s), h(), this.publishSubscriptionSnapshot();
      const { editions: l, cached: d } = await this.loadSubVideoData(r, a, e, s);
      h();
      const u = d ? Promise.resolve() : this.subscriptionArchiveQueue.catch(() => {
      }).then(async () => {
        h();
        const p = await this.options.readChannelStorage([V], s);
        h();
        const c = p[V];
        if (c != null && (typeof c != "object" || Array.isArray(c))) throw new Error("字幕归档格式异常，未覆盖");
        await new Promise((g, f) => {
          const m = { [V]: { ...c, [r]: l } };
          try {
            typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.set(m, () => {
              chrome.runtime?.lastError ? f(new Error("字幕归档保存失败")) : g();
            }) : (localStorage.setItem(V, JSON.stringify(m[V])), g());
          } catch (b) {
            f(b);
          }
        });
      });
      d || (this.subscriptionArchiveQueue = u.catch(() => {
      })), await u, h(), r !== this.subState.channelKey && (this.subState.activeDate = "", this.subState.activeDocBvid = ""), this.subState.channelKey = r, this.subState.visibleCounts[r] = a, this.subState.editions = l, d || (this.subState.cache[r] = { at: Date.now(), editions: l }), this.publishSubscriptionSnapshot();
    } catch (l) {
      n() && !s.aborted && y.updateOrganizer({ subscriptionError: `${this.subChannels[r]?.fallbackName || r}：${l?.message || "字幕订阅读取失败"}（未切换或增加条数，可重新选择该频道重试）` });
    } finally {
      n() && (clearTimeout(this.subscriptionTimer), this.subscriptionRequest = null, this.subState.loading = !1, y.updateOrganizer({ subscriptionLoading: !1 }));
    }
  }
  openLocalPlaybackView(e) {
    e?.bvid && (this.options.suspendEmbeddedPlayback(), W.openVideo({
      bvid: e.bvid,
      aid: e.aid || e.id || "",
      title: e.title || e.bvid,
      author: e.author || e.upper || "",
      cover: e.cover || "",
      url: e.videoUrl || `https://www.bilibili.com/video/${e.bvid}`
    }));
  }
  async openSubVideoView() {
    this.options.suspendEmbeddedPlayback(), y.updateOrganizer({ mode: "subscription", subscriptionLoading: !1, subscriptionError: "" }), this.publishSubscriptionSnapshot(), await this.loadSubVideo(!1);
  }
}
const xe = "biliEmbeddedPlaybackPositionsV1", X = /* @__PURE__ */ new Map();
let Q = 0;
function Ge(o) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(o, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(o).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function re(o) {
  const e = o?.dataset?.bvid;
  !e || !Number.isFinite(o.currentTime) || (X.set(e, Math.max(0, o.currentTime)), clearTimeout(Q), Q = window.setTimeout(() => {
    Ge({ [xe]: Object.fromEntries(X) }).catch(() => {
    });
  }, 350));
}
function Te(o = document) {
  const e = o.querySelector(".bili-sub-native-video");
  e && (re(e), e.pause()), o.querySelectorAll(
    ".bili-mini-player video, #bili-theater-video, #bili-radio-audio, video, audio"
  ).forEach((i) => {
    try {
      i.pause();
    } catch {
    }
  });
}
function H(o) {
  const e = globalThis;
  typeof e.showBiliToast == "function" && e.showBiliToast(o);
}
function Ve(o) {
  y.onAction((e, i) => {
    switch (e) {
      case "open-up-manager":
      case "manage-up-groups":
        o.openBiliUpGroupManagerDialog();
        break;
      case "open-sub-video":
        o.openSubVideoView();
        break;
      case "open-cache":
        o.openCachedView();
        break;
      case "cache-open-settings":
        ce.open("storage", "bili-cache"), ue.activate("settings");
        break;
      case "cache-play": {
        const t = y.state.organizer.cachedVideos.find((s) => s.id === String(i));
        t && import("./cache.service-BvLQVsZ4.js").then(({ openCachedBiliVideo: s }) => s(t));
        break;
      }
      case "cache-open-web": {
        const t = y.state.organizer.cachedVideos.find((s) => s.id === String(i));
        t?.bvid && chrome?.tabs?.create?.({ url: `https://www.bilibili.com/video/${t.bvid}`, active: !0 });
        break;
      }
      case "cache-delete":
        H("删除缓存请先在缓存文件夹中手动处理");
        break;
      case "special-play-page":
        import("./organizer-actions-CNljgSYO.js").then(({ biliOrganizerActions: t }) => t.playSpecialPage());
        break;
      case "open-following":
        o.openFollowingView();
        break;
      case "open-recommendations":
        o.openRecommendationView();
        break;
      case "recommendations-refresh":
        o.recommendations.refresh();
        break;
      case "recommendations-page":
        o.recommendations.goToPage(Number(i));
        break;
      case "following-refresh":
        o.loadFollowing(!0);
        break;
      case "following-group":
        o.loadFollowing(!1, { currentGroupId: String(i || "__all__"), selectedUpMid: "", page: 1 });
        break;
      case "following-member":
        o.loadFollowing(!1, { selectedUpMid: String(i || ""), page: 1 });
        break;
      case "following-page": {
        const t = Number(i);
        if (o.feedState.loading || !Number.isInteger(t) || t < 1 || Math.abs(t - o.feedState.page) !== 1 || t > o.feedState.page && (!o.feedState.hasMore || o.feedState.currentGroupId === "__all__" && !o.feedState.nextOffset)) break;
        o.loadFollowing(!1, { page: t, pendingScroll: !0 });
        break;
      }
      case "following-manage-groups": {
        const t = o.feedState.currentGroupId !== "__all__" ? o.feedState.currentGroupId : "";
        o.openBiliUpGroupManagerDialog(t, "", i === "create");
        break;
      }
      case "following-preview-member": {
        const t = (o.upGroupsState.followingsCache || []).find((s) => String(s.mid) === String(i?.id));
        t && o.showUpRecentVideosPreview(
          { preventDefault() {
          }, stopPropagation() {
          }, clientX: i?.clientX || 0, clientY: i?.clientY || 0 },
          { mid: String(t.mid), name: t.name, face: t.face, sign: t.sign || "" }
        );
        break;
      }
      case "subscription-channel": {
        const t = String(i || "");
        t && o.subChannels[t] && o.loadSubVideo(!1, { channelKey: t });
        break;
      }
      case "subscription-video": {
        const t = String(i || "");
        if (t && t !== o.subState.activeDocBvid) {
          o.subState.activeDocBvid = t;
          const s = (o.subState.editions || []).find((n) => (n.documents || []).some((h) => h.bvid === t));
          s && (o.subState.activeDate = s.date), o.publishSubscriptionSnapshot();
        }
        break;
      }
      case "subscription-add-channel":
        o.addBiliSubChannel();
        break;
      case "subscription-load-more": {
        if (o.subState.loading) break;
        const t = o.subState.channelKey || "shana", s = Math.max(3, Number(o.subState.visibleCounts[t] || 3)) + 3;
        o.loadSubVideo(!0, { visibleCount: s });
        break;
      }
      case "subscription-copy-script":
        o.copyActiveSubscriptionScript();
        break;
      case "subscription-refresh":
        o.loadSubVideo(!0);
        break;
      case "subscription-script-mode": {
        const t = (localStorage.getItem("biliSubScriptMode") || "newspaper") === "newspaper" ? "lyrics" : "newspaper";
        localStorage.setItem("biliSubScriptMode", t), o.publishSubscriptionSnapshot();
        break;
      }
      case "subscription-seek": {
        const t = Number(i?.from), s = o.getActiveSubscriptionDocument();
        if (s && Number.isFinite(t)) {
          const n = document.querySelector(".bili-sub-native-video");
          n ? (n.currentTime = Math.max(0, t - 0.1), n.play().catch(() => {
          })) : (W.openVideo({
            bvid: s.bvid,
            aid: String(s.aid || ""),
            title: s.title || s.bvid,
            cover: s.cover
          }), setTimeout(() => {
            const h = document.querySelector("#bili-theater-video");
            h && (h.currentTime = Math.max(0, t - 0.1), h.play().catch(() => {
            }));
          }, 100));
        }
        break;
      }
      case "subscription-copy-description": {
        const t = o.getActiveSubscriptionDocument();
        (t?.desc || t?.text) && navigator.clipboard.writeText(t.desc || t.text || "").then(() => {
          H("视频简介已复制");
        }).catch(() => {
          H("复制简介失败");
        });
        break;
      }
      case "subscription-open-player": {
        const t = o.getActiveSubscriptionDocument();
        t && W.openVideo({
          bvid: t.bvid,
          aid: String(t.aid || ""),
          title: t.title || t.bvid,
          cover: t.cover
        });
        break;
      }
    }
  });
}
function Z(o) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(o, e);
    else {
      const i = {};
      o.forEach((t) => {
        try {
          const s = localStorage.getItem(t);
          s && (i[t] = JSON.parse(s));
        } catch {
        }
      }), e(i);
    }
  });
}
function ee(o, e) {
  return new Promise((i, t) => {
    let s = !1;
    const n = (r, a) => {
      s || (s = !0, e.removeEventListener("abort", h), a ? t(a) : i(r || {}));
    }, h = () => n(void 0, new DOMException("Channel read cancelled", "AbortError"));
    if (e.aborted) {
      h();
      return;
    }
    e.addEventListener("abort", h, { once: !0 });
    try {
      if (typeof chrome < "u" && chrome?.storage?.local)
        chrome.storage.local.get(o, (r) => {
          const a = chrome.runtime?.lastError;
          n(r, a ? new Error("读取频道本地数据失败") : void 0);
        });
      else {
        const r = {};
        for (const a of o) {
          const l = localStorage.getItem(a);
          l !== null && (r[a] = JSON.parse(l));
        }
        n(r);
      }
    } catch (r) {
      n(void 0, r);
    }
  });
}
function te(o) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(o, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(o).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function $(o, e) {
  const i = globalThis;
  typeof i.showBiliToast == "function" && i.showBiliToast(o, e);
}
class I {
  constructor() {
    this.following = new ge({
      suspendEmbeddedPlayback: () => this.suspendEmbeddedPlayback(),
      getUpGroups: () => this.upGroupsState.groups,
      setUpGroups: (e) => {
        this.upGroupsState.groups = e;
      },
      getFollowingsCache: () => this.upGroupsState.followingsCache,
      setFollowingsCache: (e) => {
        this.upGroupsState.followingsCache = e;
      },
      readChannelStorage: (e, i) => ee(e, i),
      fetchUpLatestVideos: (e, i, t) => this.fetchUpLatestVideos(e, i, t)
    }), this.feedState = this.following.feedState, this.upGroupsState = {
      groups: [],
      followingsCache: [],
      loadingFollowings: !1,
      selectedManageGroupId: ""
    }, this.recommendations = new de({
      api: (e, i) => C.api(e, { signal: i }),
      publish: (e) => y.updateOrganizer(e),
      scrollToStart: () => document.querySelector("#fo-body")?.closest("section")?.scrollIntoView({ block: "start" })
    }), this.rcmdState = this.recommendations.state, this.subscription = new Fe({
      suspendEmbeddedPlayback: () => this.suspendEmbeddedPlayback(),
      getUpGroups: () => this.upGroupsState.groups,
      initUpGroups: () => this.initBiliUpGroups(),
      loadFollowedUps: (e) => this.loadFollowedUps(e),
      readChannelStorage: (e, i) => ee(e, i)
    }), this.subChannels = this.subscription.subChannels, this.subState = this.subscription.subState, this.actionSubscriptionBound = !1, this.searchActions = {
      search: async (e) => {
        const { ik: i, sk: t } = await C.getWbiKeys(), { signedQuery: s } = ae(
          { search_type: "video", keyword: e, page: 1, page_size: 12 },
          i,
          t
        );
        return C.api(`https://api.bilibili.com/x/web-interface/wbi/search/type?${s}`);
      },
      favorite: (e) => this.saveBiliVideoToDefaultFavorite({ ...e }),
      cache: async (e) => {
        const { cacheBiliVideo: i } = await import("./cache.service-BvLQVsZ4.js");
        return i({ ...e });
      },
      local: (e) => (this.openLocalPlaybackView({ ...e, videoUrl: `https://www.bilibili.com/video/${e.bvid}` }), !0)
    }, this.bindFavoritesActions();
  }
  static getInstance() {
    return I.instance || (I.instance = new I()), I.instance;
  }
  // ---------- 1. 关注分组与 UP 主管理 ----------
  async initBiliUpGroups() {
    const e = await Z(["biliFollowingGroupsV1", "biliFollowingsCacheV1", "biliUnfollowedMidsV1"]);
    this.upGroupsState.groups = Array.isArray(e.biliFollowingGroupsV1) ? e.biliFollowingGroupsV1 : [];
    const i = new Set((Array.isArray(e.biliUnfollowedMidsV1) ? e.biliUnfollowedMidsV1 : []).map(String));
    if (Array.isArray(e.biliFollowingsCacheV1?.list) && (this.upGroupsState.followingsCache = e.biliFollowingsCacheV1.list.filter(
      (t) => !i.has(String(t?.mid))
    )), i.size > 0 && this.upGroupsState.groups.length > 0) {
      let t = !1;
      this.upGroupsState.groups.forEach((s) => {
        if (Array.isArray(s.upMids)) {
          const n = s.upMids.length;
          s.upMids = s.upMids.filter((h) => !i.has(String(h))), s.upMids.length !== n && (t = !0);
        }
      }), t && await this.saveBiliUpGroups();
    }
  }
  async saveBiliUpGroups() {
    await te({ biliFollowingGroupsV1: this.upGroupsState.groups });
  }
  async loadFollowedUps(e = !1, i) {
    const t = await Z(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]), s = new Set((Array.isArray(t.biliUnfollowedMidsV1) ? t.biliUnfollowedMidsV1 : []).map(String));
    if (!e && this.upGroupsState.followingsCache?.length && Date.now() - Number(t.biliFollowingsCacheV1?.updatedAt || 0) < 36e5)
      return this.upGroupsState.followingsCache = this.upGroupsState.followingsCache.filter(
        (n) => !s.has(String(n?.mid))
      ), this.upGroupsState.followingsCache;
    if (!e && t.biliFollowingsCacheV1?.list?.length && Date.now() - (t.biliFollowingsCacheV1.updatedAt || 0) < 36e5)
      return this.upGroupsState.followingsCache = t.biliFollowingsCacheV1.list.filter(
        (n) => !s.has(String(n?.mid))
      ), this.upGroupsState.followingsCache;
    this.upGroupsState.loadingFollowings = !0;
    try {
      const n = await C.getUserNav();
      if (!n.isLogin) return [];
      const h = String(n.mid), r = 24, a = await C.api(`https://api.bilibili.com/x/relation/followings?vmid=${h}&ps=${r}&pn=1`);
      if (!Array.isArray(a?.list)) return [];
      const l = /* @__PURE__ */ new Map(), d = (g) => {
        for (const f of g)
          !f?.mid || s.has(String(f.mid)) || l.set(String(f.mid), {
            mid: String(f.mid),
            name: f.uname || "UP主",
            face: String(f.face || "").replace(/^http:/, "https:"),
            sign: f.sign || ""
          });
        this.upGroupsState.followingsCache = Array.from(l.values()), i?.();
      };
      d(a.list);
      const u = Math.ceil(Number(a.total || a.list.length) / r);
      let p = !0;
      for (let g = 2; g <= u; g += 2) {
        const f = [g, g + 1].filter((b) => b <= u), m = await Promise.allSettled(f.map((b) => C.api(`https://api.bilibili.com/x/relation/followings?vmid=${h}&ps=${r}&pn=${b}`)));
        for (const b of m)
          b.status === "fulfilled" && Array.isArray(b.value?.list) ? d(b.value.list) : p = !1;
      }
      const c = Array.from(l.values());
      return p ? await te({ biliFollowingsCacheV1: { mid: h, updatedAt: Date.now(), list: c } }) : $("部分关注分页加载失败，可稍后刷新重试"), c;
    } catch (n) {
      return console.error("加载关注列表异常:", n), (this.upGroupsState.followingsCache || []).filter((h) => !s.has(String(h?.mid)));
    } finally {
      this.upGroupsState.loadingFollowings = !1;
    }
  }
  fetchUpLatestVideos(e, i = 6, t) {
    return ne(e, i, t);
  }
  followBiliUp(e) {
    return se(e);
  }
  unfollowBiliUp(e) {
    return oe(e);
  }
  showCustomConfirmModal(e) {
    we(e, $);
  }
  showUpRecentVideosPreview(e, i) {
    const t = globalThis;
    Se(e, i, {
      getFollowings: () => this.upGroupsState.followingsCache,
      setFollowings: (s) => {
        this.upGroupsState.followingsCache = s;
      },
      getGroups: () => this.upGroupsState.groups,
      saveGroups: () => this.saveBiliUpGroups(),
      clearAggregationCache: () => this.following.clearAggregationCache(),
      notifyToast: (s) => $(s),
      refreshManager: () => {
        typeof t.__refreshBiliUpGroupManager == "function" && t.__refreshBiliUpGroupManager();
      }
    });
  }
  openBiliUpGroupManagerDialog(e = "", i = "", t = !1) {
    return me(
      {
        initGroups: () => this.initBiliUpGroups(),
        getGroups: () => this.upGroupsState.groups,
        setGroups: (s) => {
          this.upGroupsState.groups = s;
        },
        getFollowings: () => this.upGroupsState.followingsCache,
        saveGroups: () => this.saveBiliUpGroups(),
        loadFollowedUps: (s, n) => this.loadFollowedUps(s, n),
        showConfirmModal: (s) => this.showCustomConfirmModal(s),
        previewUp: (s, n) => this.showUpRecentVideosPreview(s, n),
        notifyToast: (s) => $(s)
      },
      e,
      i,
      t
    );
  }
  // ---------- 2. 正在关注流 (委托至 BiliFollowingCoordinator) ----------
  setFollowingActive(e) {
    this.following.setFollowingActive(e);
  }
  openFollowingView() {
    this.following.openFollowingView();
  }
  loadFollowing(e = !1, i = {}) {
    return this.following.loadFollowing(e, i);
  }
  publishFeedSnapshot() {
    this.following.publishFeedSnapshot();
  }
  // ---------- 3. 个性推荐流 (Recommendations) ----------
  openRecommendationView() {
    this.suspendEmbeddedPlayback(), y.updateOrganizer({ mode: "recommendations", specialLoading: !1, specialError: "" }), this.publishRecommendationSnapshot(), this.recommendations.state.videos.length || this.loadRecommendations(!0);
  }
  setRecommendationsActive(e) {
    this.recommendations.setActive(e), !e && y.state.organizer.mode === "recommendations" && y.updateOrganizer({ specialLoading: !1 });
  }
  loadRecommendations(e = !1) {
    return this.recommendations.loadRecommendations(e);
  }
  publishRecommendationSnapshot() {
    this.recommendations.publishRecommendationSnapshot();
  }
  saveBiliVideoToDefaultFavorite(e) {
    return ye(e, $);
  }
  // ---------- 5. 订阅频道与 AI 章节字幕台 (委托至 BiliSubscriptionCoordinator) ----------
  ensureSubCustomChannels(e) {
    return this.subscription.ensureSubCustomChannels(e);
  }
  saveSubCustomChannels() {
    return this.subscription.saveSubCustomChannels();
  }
  subscribeFollowedBiliUp(e) {
    return this.subscription.subscribeFollowedBiliUp(e);
  }
  addBiliSubChannel() {
    return this.subscription.addBiliSubChannel();
  }
  getActiveSubscriptionDocument() {
    return this.subscription.getActiveSubscriptionDocument();
  }
  publishSubscriptionSnapshot() {
    this.subscription.publishSubscriptionSnapshot();
  }
  extractChapters(e) {
    return this.subscription.extractChapters(e);
  }
  copyActiveSubscriptionScript() {
    return this.subscription.copyActiveSubscriptionScript();
  }
  setSubscriptionActive(e) {
    this.subscription.setSubscriptionActive(e);
  }
  loadSubVideo(e = !1, i = {}) {
    return this.subscription.loadSubVideo(e, i);
  }
  rememberEmbeddedPosition(e) {
    re(e);
  }
  suspendEmbeddedPlayback(e = document) {
    Te(e);
  }
  openLocalPlaybackView(e) {
    this.subscription.openLocalPlaybackView(e);
  }
  openSubVideoView() {
    return this.subscription.openSubVideoView();
  }
  // ---------- 6. 独立页快捷频道与动作总线 ----------
  openCachedView() {
    return import("./organizer-actions-CNljgSYO.js").then(({ biliOrganizerActions: e }) => e.openCache());
  }
  bindFavoritesActions() {
    this.actionSubscriptionBound || (this.actionSubscriptionBound = !0, Ve(this));
  }
}
const De = I.getInstance();
export {
  xe as BILI_EMBEDDED_POS_KEY,
  V as BILI_SUB_ARCHIVES_KEY,
  E as BILI_SUB_CHANNELS_KEY,
  I as BilibiliChannelService,
  De as bilibiliChannelService,
  O as formatBiliCompactNumber,
  J as formatBiliDuration,
  T as formatSrtTime,
  ie as parseDurationToSeconds,
  le as parseTranscriptParagraphs
};
