import { b as C, c as ue } from "./bilibili.service-Brip_1AT.js";
import { a as S, b as W } from "./up-group-manager-store-sHkUiUZ4.js";
import { G as L, I as H, H as se, J as de, K as D } from "./search.service-I5ZPPxGy.js";
class pe {
  constructor(e) {
    this.dependencies = e, this.state = {
      videos: [],
      page: 1,
      pageSize: 24,
      freshIdx: 1,
      loading: !1,
      pendingScroll: !1
    }, this.active = !1, this.request = null, this.pages = /* @__PURE__ */ new Map();
  }
  setActive(e) {
    this.active = e, e || this.cancel();
  }
  cancel() {
    const e = this.request;
    this.request = null, clearTimeout(this.timeout), this.timeout = void 0, e?.abort(), this.state.loading = !1, this.state.pendingScroll = !1;
  }
  loadRecommendations(e = !1) {
    return e && this.pages.clear(), this.load(e ? 1 : this.state.page, e ? 1 : this.state.freshIdx, !1);
  }
  refresh() {
    return this.load(this.state.page + 1, this.state.freshIdx + 1, !1);
  }
  goToPage(e) {
    if (this.state.loading || !Number.isFinite(e)) return Promise.resolve();
    const i = Math.max(1, Math.floor(e)), t = this.pages.get(i);
    return t && t.pageSize === this.state.pageSize && this.active ? (Object.assign(this.state, { videos: t.videos, page: i, freshIdx: t.nextFreshIdx, pendingScroll: !0 }), this.publishRecommendationSnapshot(), Promise.resolve()) : this.load(i, this.state.freshIdx, !0);
  }
  async load(e, i, t) {
    if (!this.active) return;
    this.cancel();
    const s = new AbortController();
    this.request = s;
    const r = () => this.active && this.request === s;
    let h = !1;
    this.timeout = setTimeout(() => {
      h = !0, s.abort();
    }, 15e3), this.state.loading = !0, this.dependencies.publish({ specialLoading: !0, specialError: "" });
    try {
      const o = this.state.pageSize || 24;
      let a = [], l = i;
      for (let d = 0; d < 3 && a.length < o; d++) {
        const p = new URLSearchParams({ ps: String(o), fresh_idx: String(l), fresh_type: "3" });
        let c = [], g;
        try {
          const f = await this.dependencies.api(`https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?${p}`, s.signal);
          if (!Array.isArray(f?.item)) throw new Error("推荐接口返回格式异常");
          c = f.item;
        } catch (f) {
          if (s.signal.aborted) throw f;
          g = f;
        }
        if (!r()) return;
        if (s.signal.throwIfAborted(), !c.length && !a.length) {
          const f = await this.dependencies.api(`https://api.bilibili.com/x/web-interface/popular?ps=${o}&pn=${e}`, s.signal);
          if (!Array.isArray(f?.list)) throw new Error("热门接口返回格式异常");
          c = f.list;
        }
        if (!r()) return;
        if (s.signal.throwIfAborted(), !c.length) {
          if (g) throw g;
          break;
        }
        a = a.concat(c), l++;
      }
      const u = a.slice(0, o).map((d) => ({
        bvid: d.bvid || (d.aid ? `av${d.aid}` : ""),
        aid: d.aid || d.id,
        title: d.title || "未命名推荐视频",
        cover: (d.pic || "").replace(/^http:/, "https:"),
        duration: Number(d.duration || 0),
        play: Number(d.stat?.view || 0),
        upper: d.owner?.name || d.author || "UP主",
        upMid: String(d.owner?.mid || d.mid || ""),
        pubTs: d.pubdate || 0,
        pubTimeDesc: d.pubdate ? new Date(d.pubdate * 1e3).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "推荐"
      }));
      if (!r()) return;
      s.signal.throwIfAborted(), this.pages.set(e, { videos: u, nextFreshIdx: l, pageSize: o }), Object.assign(this.state, { videos: u, page: e, freshIdx: l, pendingScroll: t }), this.publishRecommendationSnapshot();
    } catch (o) {
      if (!r() || s.signal.aborted && !h) return;
      this.dependencies.publish({ specialLoading: !1, specialError: h ? "推荐加载超时，请手动重试" : o instanceof Error ? o.message : "推荐加载失败" });
    } finally {
      r() && (clearTimeout(this.timeout), this.timeout = void 0, this.request = null, this.state.loading = !1, this.state.pendingScroll = !1, this.dependencies.publish({ specialLoading: !1 }));
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
      duration: H(i.duration),
      playCount: L(i.play),
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
      specialSubtitle: "根据您的喜好与全站热门为您推荐",
      specialBadge: `第 ${this.state.page} 批`,
      specialPage: this.state.page,
      specialVideos: e
    }), this.state.pendingScroll && (this.state.pendingScroll = !1, this.dependencies.scrollToStart());
  }
}
function K(n, e) {
  const i = /* @__PURE__ */ new Set(), t = [e], s = /* @__PURE__ */ new Set();
  for (; t.length; ) {
    const r = t.pop();
    if (s.has(r)) continue;
    s.add(r), (n.find((o) => o.id === r)?.upMids || []).forEach((o) => i.add(String(o))), n.forEach((o) => {
      o.parentId === r && t.push(o.id);
    });
  }
  return Array.from(i);
}
function he(n, e, i, t) {
  if (!["root", "into", "before", "after"].includes(t)) return "不支持的分组移动方式";
  const s = n.filter((o) => String(o.id) === e);
  if (!e || s.length !== 1) return "来源分组不存在或 ID 重复，请刷新检查";
  if (e === i) return "不能将分组移动到自身";
  if (t === "root") return null;
  if (!i) return "请选择目标分组";
  const r = /* @__PURE__ */ new Set();
  let h = i;
  for (; h; ) {
    if (h === e) return "不能将分组移动到自己的子分组中或旁边";
    if (r.has(h)) return "目标分组存在循环父子关系，本次移动未执行";
    r.add(h);
    const o = n.filter((a) => String(a.id) === h);
    if (o.length !== 1) return "目标分组或其父分组缺失、ID 重复，本次移动未执行";
    h = String(o[0].parentId || "");
  }
  return null;
}
function fe(n) {
  const e = /* @__PURE__ */ new Map();
  n.forEach((r) => {
    const h = String(r.parentId || "");
    e.has(h) || e.set(h, []), e.get(h).push(r);
  });
  const i = [], t = /* @__PURE__ */ new Set(), s = (r = "", h = 0) => {
    (e.get(r) || []).forEach((o) => {
      t.has(String(o.id)) || (t.add(String(o.id)), i.push({
        id: String(o.id),
        name: String(o.name || "未命名分组"),
        parentId: String(o.parentId || ""),
        upMids: (o.upMids || []).map(String),
        depth: h
      }), s(String(o.id), h + 1));
    });
  };
  return s(), n.forEach((r) => {
    t.has(String(r.id)) || i.push({
      id: String(r.id),
      name: String(r.name || "未命名分组"),
      parentId: "",
      upMids: (r.upMids || []).map(String),
      depth: 0
    });
  }), i;
}
async function ge(n) {
  const { reset: e, signal: i, check: t, readStorage: s, getAggregateCache: r, readUpVideos: h } = n, o = { ...n.feed, offsetHistory: [...n.feed.offsetHistory] };
  let a = n.followings, l = null;
  const u = await C.api("https://api.bilibili.com/x/web-interface/nav", { signal: i });
  if (t(), !u.isLogin) throw new Error("未登录 B站");
  const d = await s(i);
  t();
  const p = new Set((Array.isArray(d.biliUnfollowedMidsV1) ? d.biliUnfollowedMidsV1 : []).map(String)), c = (Array.isArray(d.biliFollowingGroupsV1) ? d.biliFollowingGroupsV1 : []).map((w) => ({
    ...w,
    upMids: (Array.isArray(w.upMids) ? w.upMids : []).filter((U) => !p.has(String(U)))
  }));
  Array.isArray(d.biliFollowingsCacheV1?.list) && (a = d.biliFollowingsCacheV1.list.filter((w) => !p.has(String(w.mid))));
  const g = o.currentGroupId;
  if (g && g !== "__all__") {
    if (!c.find((F) => F.id === g))
      return o.videos = [], o.hasMore = !1, { feed: o, groups: c, followings: a, aggregateCache: l };
    const U = K(c, g);
    if (!U.length)
      return o.videos = [], o.hasMore = !1, { feed: o, groups: c, followings: a, aggregateCache: l };
    let M = U;
    if (o.selectedUpMid) {
      if (!U.includes(o.selectedUpMid)) throw new Error("该 UP 已不在当前分组，请重新选择");
      M = [o.selectedUpMid];
    }
    const P = JSON.stringify([String(u.mid), g, o.selectedUpMid, [...U].sort()]), G = r(P);
    let x = [];
    if (!e && G && Date.now() - G.timestamp < 9e4)
      x = G.videos;
    else {
      const F = o.selectedUpMid ? 24 : Math.max(4, Math.ceil(24 / Math.min(M.length, 8))), z = 6;
      for (let T = 0; T < M.length; T += z) {
        const E = M.slice(T, T + z), R = await Promise.allSettled(E.map((V) => h(V, F, i)));
        if (t(), R.some((V) => V.status === "rejected")) throw new Error("部分 UP 动态读取失败，请手动重试");
        R.forEach((V) => {
          V.status === "fulfilled" && Array.isArray(V.value) && x.push(...V.value);
        });
      }
      x.sort((T, E) => (E.pubTs || 0) - (T.pubTs || 0)), l = { key: P, videos: x };
    }
    const B = o.pageSize || 24, I = (o.page - 1) * B, A = x.slice(I, I + B);
    return o.videos = A, o.hasMore = x.length > I + B, { feed: o, groups: c, followings: a, aggregateCache: l };
  }
  const f = o.pageSize || 24, b = [];
  let m = o.offsetHistory[o.page - 1] || "", y = 0;
  if (m.startsWith("local-page:")) {
    const w = JSON.parse(m.slice(11));
    m = w.offset, y = w.skip;
  }
  let v = 0;
  for (; b.length < f && v < 4; ) {
    v++;
    const w = new URLSearchParams({
      timezone_offset: "-480",
      type: "video",
      features: "itemOpusStyle,listOnlyfans,opusBigCover,decorationCard,forwardListHidden"
    });
    m && w.set("offset", m), o.updateBaseline && w.set("update_baseline", o.updateBaseline);
    const U = m, M = await C.api(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?${w.toString()}`, { signal: i });
    if (t(), !Array.isArray(M?.items)) throw new Error("关注动态返回格式异常");
    const P = M?.items || [];
    o.nextOffset = M?.offset || "", o.hasMore = !!M?.has_more, M?.update_baseline && (o.updateBaseline = M.update_baseline), m = o.nextOffset;
    for (let G = y; G < P.length; G++) {
      const x = P[G], B = x?.modules?.module_dynamic || {}, I = B.major || {}, A = I.archive || I.ugc_season?.sections?.[0]?.episodes?.[0]?.arc || B.major?.archive;
      if (!A) continue;
      const F = x?.modules?.module_author || {}, z = F.pub_time || (F.pub_ts ? new Date(F.pub_ts * 1e3).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "近期"), T = A.stat || {}, E = Number(T.play || 0), R = A.bvid && String(A.bvid).startsWith("BV") ? String(A.bvid) : "", V = A.title || x?.modules?.module_dynamic?.desc?.text || "未命名视频", le = A.cover || "", ce = Number(A.duration_text ? se(A.duration_text) : A.duration || 0);
      if (b.push({
        bvid: R,
        aid: A.aid,
        title: V,
        cover: le,
        duration: ce,
        play: E,
        upper: F.name || "关注的UP主",
        upMid: String(F.mid || ""),
        pubTs: F.pub_ts || 0,
        pubTimeDesc: z
      }), b.length >= f) {
        G + 1 < P.length && (o.nextOffset = `local-page:${JSON.stringify({ offset: U, skip: G + 1 })}`, o.hasMore = !0);
        break;
      }
    }
    if (y = 0, !o.hasMore || !m) break;
  }
  return o.videos = b, { feed: o, groups: c, followings: a, aggregateCache: l };
}
class me {
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
    this.followingActive = e, e || (this.cancelFollowing(), S.state.organizer.mode === "following" && S.updateOrganizer({ specialLoading: !1 }));
  }
  openFollowingView() {
    this.options.suspendEmbeddedPlayback(), S.updateOrganizer({ mode: "following", specialLoading: !1, specialError: "" }), this.publishFeedSnapshot(), this.feedState.videos.length || this.loadFollowing(!0);
  }
  async loadFollowing(e = !1, i = {}) {
    if (!this.followingActive) return;
    this.cancelFollowing();
    const t = new AbortController();
    this.followingRequest = t;
    const s = t.signal, r = () => this.followingActive && this.followingRequest === t, h = JSON.stringify(this.options.getUpGroups()), o = JSON.stringify(this.options.getFollowingsCache()), a = () => {
      if (s.throwIfAborted(), !r()) throw new DOMException("Stale following request", "AbortError");
      if (JSON.stringify(this.options.getUpGroups()) !== h) throw new Error("关注分组已变更，请刷新后重试");
    }, l = { ...this.feedState, ...i, offsetHistory: [...this.feedState.offsetHistory] }, u = l.currentGroupId !== this.feedState.currentGroupId || l.selectedUpMid !== this.feedState.selectedUpMid;
    this.followingTimeout = setTimeout(() => {
      r() && (this.cancelFollowing(), S.updateOrganizer({ specialLoading: !1, specialError: "关注动态加载超时，请手动重试" }));
    }, 3e4), !u && l.page > this.feedState.page && l.currentGroupId === "__all__" && (l.offsetHistory[this.feedState.page] = this.feedState.nextOffset), (e || u) && (l.page = 1, l.offsetHistory = [""], l.currentOffset = "", l.nextOffset = "", l.updateBaseline = "", l.hasMore = !0, l.videos = []), l.loading = !0, this.feedState.loading = !0, S.updateOrganizer({ specialLoading: !0, specialError: "" });
    try {
      const d = await ge({
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
      a(), Object.assign(this.feedState, d.feed), this.options.setUpGroups(d.groups), JSON.stringify(this.options.getFollowingsCache()) === o && this.options.setFollowingsCache(d.followings), d.aggregateCache && this.groupFeedAggregationCache.set(d.aggregateCache.key, {
        timestamp: Date.now(),
        videos: d.aggregateCache.videos
      }), this.publishFeedSnapshot();
    } catch (d) {
      r() && !s.aborted && S.updateOrganizer({ specialLoading: !1, specialError: d?.message || "未知错误" });
    } finally {
      r() && (clearTimeout(this.followingTimeout), this.followingRequest = null, this.feedState.loading = !1, this.feedState.pendingScroll = !1, S.updateOrganizer({ specialLoading: !1 }));
    }
  }
  publishFeedSnapshot() {
    if (!this.followingActive) return;
    const e = !this.feedState.currentGroupId || this.feedState.currentGroupId === "__all__", i = this.options.getUpGroups(), t = this.options.getFollowingsCache(), s = e ? null : i.find((u) => u.id === this.feedState.currentGroupId), r = (this.feedState.videos || []).map((u) => ({
      id: String(u.bvid || u.aid || ""),
      aid: String(u.aid || ""),
      bvid: String(u.bvid || ""),
      title: String(u.title || "未命名视频"),
      cover: String(u.cover || "").replace(/^http:/, "https:"),
      url: u.bvid ? `https://www.bilibili.com/video/${u.bvid}` : u.aid ? `https://www.bilibili.com/video/av${u.aid}` : "#",
      duration: H(u.duration),
      playCount: L(u.play),
      author: String(u.upper || "关注的UP主"),
      authorMid: String(u.upMid || ""),
      authorFace: "",
      favoriteDate: String(u.pubTimeDesc || "近期"),
      selected: !1,
      writable: !1
    })), h = [
      { id: "__all__", name: "全部关注", count: t?.length || 0, active: e, child: !1 },
      ...(i || []).map((u) => ({
        id: String(u.id),
        name: String(u.name || "未命名分组"),
        count: K(i, u.id).length,
        active: String(u.id) === String(this.feedState.currentGroupId),
        child: !!u.parentId
      }))
    ], o = s ? K(i, s.id) : [], a = new Map((t || []).map((u) => [String(u.mid), u])), l = o.map((u) => {
      const d = a.get(String(u));
      return {
        id: String(u),
        name: String(d?.name || `UP ${u}`),
        face: String(d?.face || ""),
        sign: String(d?.sign || ""),
        active: String(u) === String(this.feedState.selectedUpMid)
      };
    });
    S.updateOrganizer({
      specialLoading: !1,
      specialError: "",
      specialTitle: "正在关注",
      specialSubtitle: e ? "已关注 UP 主投稿视频更新 · 与 B站账号实时同步" : `聚合分组「${s?.name || ""}」中 UP 主发布的最新视频`,
      specialBadge: e ? `第 ${this.feedState.page} 页` : String(s?.name || "自定义分组"),
      specialPage: this.feedState.page,
      specialVideos: r,
      followingGroups: h,
      followingMembers: l,
      followingHasMore: !!(this.feedState.hasMore && (!e || this.feedState.nextOffset))
    }), this.feedState.pendingScroll && (this.feedState.pendingScroll = !1, document.querySelector("#fo-body")?.closest("section")?.scrollIntoView({ block: "start" }));
  }
}
async function oe(n) {
  const e = await C.getBiliJct();
  if (!e) return { ok: !1, reason: "未检测到 B站 登录态（bili_jct 缺失）" };
  try {
    const i = new URLSearchParams({
      fid: String(n),
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
async function ne(n) {
  const e = await C.getBiliJct();
  if (!e) return { ok: !1, reason: "未检测到 B站 登录态（bili_jct 缺失）" };
  try {
    const i = new URLSearchParams({
      fid: String(n),
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
async function be(n, e = "", i = "", t = !1) {
  const s = globalThis;
  let r = s.LogicWeaverBiliUpGroupManager;
  if (r || (await new Promise((l) => setTimeout(l, 120)), r = s.LogicWeaverBiliUpGroupManager), !r) {
    n.notifyToast("关注分组管理器尚未加载，请刷新页面");
    return;
  }
  await n.initGroups();
  const h = localStorage.getItem("bili_upg_only_ungrouped_pref");
  r.open({ query: i || "", onlyUngrouped: h === "true" });
  const o = () => {
    const l = fe(n.getGroups() || []), u = new Map(l.map((c) => [c.id, c.name])), d = /* @__PURE__ */ new Map();
    l.forEach(
      (c) => c.upMids.forEach((g) => {
        const f = d.get(String(g)) || [];
        f.push(c.id), d.set(String(g), f);
      })
    );
    const p = l.some((c) => c.id === r.state.activeGroupId) ? r.state.activeGroupId : l.some((c) => c.id === e) ? e : l[0]?.id || "";
    r.update({
      loading: !1,
      error: "",
      groups: l,
      activeGroupId: p,
      followings: (n.getFollowings() || []).map((c) => {
        const g = d.get(String(c.mid)) || [];
        return {
          mid: String(c.mid),
          name: String(c.name || `UP ${c.mid}`),
          face: String(c.face || ""),
          sign: String(c.sign || ""),
          groupIds: g,
          groupName: g.map((f) => u.get(f)).filter(Boolean).join(" / ")
        };
      })
    });
  }, a = async () => {
    try {
      await n.saveGroups(), o(), s.__refreshBiliUpGroupManager = o;
    } catch (l) {
      r.update({ error: l?.message || "分组保存失败，请检查存储" });
    }
  };
  r.setActionHandler(async (l, u) => {
    if (l === "close") {
      localStorage.setItem("bili_upg_only_ungrouped_pref", r.state.onlyUngrouped ? "true" : "false"), delete s.__refreshBiliUpGroupManager, r.setActionHandler(null);
      return;
    }
    if (l === "refresh") {
      r.update({ refreshing: !0, error: "" });
      try {
        await n.loadFollowedUps(!0, () => {
          o(), r.update({ refreshing: !1 });
        }), o();
      } catch (d) {
        r.update({ error: d?.message || "刷新关注列表失败" });
      } finally {
        r.update({ refreshing: !1 });
      }
      return;
    }
    if (l === "create-group") {
      const d = String(u?.name || "").trim();
      if (!d) return;
      const p = String(u?.parentId || "");
      n.getGroups().push({
        id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: d,
        parentId: p || null,
        upMids: [],
        createdAt: Date.now()
      }), await a(), n.notifyToast(p ? `已创建子分组「${d}」` : `已创建分组「${d}」`);
      return;
    }
    if (l === "rename-group") {
      const p = n.getGroups().find((g) => String(g.id) === String(u?.id)), c = String(u?.name || "").trim();
      p && c && (p.name = c, await a());
      return;
    }
    if (l === "delete-group") {
      const d = String(u || ""), p = n.getGroups(), c = p.find((g) => String(g.id) === d);
      if (!c) return;
      n.showConfirmModal({
        title: "删除关注分组",
        content: `确定删除分组「${c.name}」吗？分组中的 UP 主不会被取消关注。`,
        confirmText: "删除",
        onConfirm: async () => {
          const g = c.parentId || null;
          p.forEach((f) => {
            String(f.parentId || "") === d && (f.parentId = g);
          }), n.setGroups(p.filter((f) => String(f.id) !== d)), await a();
        }
      });
      return;
    }
    if (l === "move-group") {
      const d = String(u?.sourceId || ""), p = String(u?.targetId || ""), c = String(u?.mode ?? "into"), g = n.getGroups(), f = he(g, d, p, c);
      if (f) {
        r.update({ error: f });
        return;
      }
      const b = g.find((m) => String(m.id) === d);
      if (!b) return;
      if (c === "root") b.parentId = null;
      else {
        const m = g.find((y) => String(y.id) === p);
        if (!m) return;
        if (b.parentId = c === "into" ? m.id : m.parentId || null, c !== "into") {
          const y = g.indexOf(b);
          g.splice(y, 1);
          const v = g.indexOf(m);
          g.splice(v + (c === "after" ? 1 : 0), 0, b);
        }
      }
      await a();
      return;
    }
    if (l === "toggle-member") {
      const d = n.getGroups(), p = d.find((b) => String(b.id) === String(u?.groupId)), c = String(u?.mid || "");
      if (!p || !c) return;
      const g = d.some(
        (b) => String(b.id) !== String(p.id) && (b.upMids || []).map(String).includes(c)
      ), f = (p.upMids || []).map(String).indexOf(c);
      if (f < 0 && g) return;
      r.update({ busyMid: c }), f >= 0 ? p.upMids.splice(f, 1) : p.upMids.push(c), await a(), r.update({ busyMid: "" });
      return;
    }
    if (l === "preview-up") {
      const p = n.getFollowings().find((c) => String(c.mid) === String(u?.mid));
      p && n.previewUp(
        { preventDefault() {
        }, stopPropagation() {
        }, clientX: Number(u?.clientX || 0), clientY: Number(u?.clientY || 0) },
        p
      );
    }
  }), s.__refreshBiliUpGroupManager = o;
  try {
    await n.loadFollowedUps(!1, o), o(), t && r.update({ activeGroupId: e || r.state.activeGroupId });
  } catch (l) {
    r.update({ loading: !1, error: l?.message || "无法读取关注列表" });
  }
}
const N = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map();
function we(n) {
  n != null ? N.delete(String(n)) : N.clear();
}
async function re(n, e = 6, i) {
  i?.throwIfAborted();
  const t = String(n), s = N.get(t);
  if (!i && s && Date.now() - s.timestamp < 3e5)
    return s.videos.slice(0, e);
  if (!i && j.has(t))
    try {
      return (await j.get(t) || []).slice(0, e);
    } catch {
      return [];
    }
  const r = (async () => {
    try {
      try {
        const l = await C.api(
          `https://api.bilibili.com/x/v2/medialist/resource/list?type=1&biz_id=${t}&ps=${Math.max(e, 6)}`,
          { signal: i }
        );
        if (i?.throwIfAborted(), Array.isArray(l?.media_list) && l.media_list.length > 0) {
          const u = [];
          for (const d of l.media_list) {
            const p = d.bv_id || (d.id ? `av${d.id}` : ""), c = Number(d.pubtime || 0);
            let g = "最新";
            if (c > 0) {
              const f = new Date(c * 1e3), b = /* @__PURE__ */ new Date();
              f.getFullYear() === b.getFullYear() ? g = `${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}` : g = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}`;
            }
            if (u.push({
              bvid: p,
              aid: d.id,
              title: d.title || "未命名视频",
              cover: (d.cover || "").replace(/^http:/, "https:"),
              duration: Number(d.duration || 0),
              play: Number(d.cnt_info?.play || 0),
              upper: d.upper?.name || "关注的UP主",
              upMid: t,
              pubTs: c,
              pubTimeDesc: g
            }), u.length >= e) break;
          }
          if (u.length > 0)
            return i || N.set(t, { timestamp: Date.now(), videos: u }), u;
        }
      } catch (l) {
        if (i?.aborted) throw l;
      }
      const o = await C.api(
        `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${t}&features=itemOpusStyle`,
        { signal: i }
      );
      if (i?.throwIfAborted(), !Array.isArray(o?.items)) {
        if (i) throw new Error("UP 动态返回格式异常");
        return [];
      }
      const a = [];
      for (const l of o.items) {
        const u = l?.modules?.module_dynamic || {}, d = u.major || {}, p = d.archive || d.ugc_season?.sections?.[0]?.episodes?.[0]?.arc || u.major?.archive;
        if (!p) continue;
        const c = l?.modules?.module_author || {}, g = c.pub_ts || (c.pub_time ? Math.floor(new Date(c.pub_time).getTime() / 1e3) : 0), f = c.pub_time || (c.pub_ts ? new Date(c.pub_ts * 1e3).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "近期"), b = p.stat || {}, m = Number(b.play || 0), y = p.bvid || (p.aid ? `av${p.aid}` : ""), v = p.title || l?.modules?.module_dynamic?.desc?.text || "未命名视频", w = (p.cover || "").replace(/^http:/, "https:"), U = Number(p.duration_text ? se(p.duration_text) : p.duration || 0);
        if (a.push({
          bvid: y,
          aid: p.aid,
          title: v,
          cover: w,
          duration: U,
          play: m,
          upper: c.name || "关注的UP主",
          upMid: t,
          pubTs: g,
          pubTimeDesc: f
        }), a.length >= e) break;
      }
      return i || N.set(t, { timestamp: Date.now(), videos: a }), a;
    } catch (o) {
      if (i) throw o;
      return console.warn(`读取 UP ${n} 视频失败:`, o), [];
    } finally {
      i || j.delete(t);
    }
  })();
  return i || j.set(t, r), (await r || []).slice(0, e);
}
function Y(n) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(n, e);
    else {
      const i = {};
      n.forEach((t) => {
        try {
          const s = localStorage.getItem(t);
          s && (i[t] = JSON.parse(s));
        } catch {
        }
      }), e(i);
    }
  });
}
function X(n) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(n, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(n).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function Se(n, e) {
  const t = globalThis.LogicWeaverBiliOrganizerDialogs;
  if (!t) {
    e("确认弹窗尚未加载，请刷新页面");
    return;
  }
  let s = "";
  n.content instanceof Node ? s = n.content.textContent || "" : typeof n.content == "string" && (s = new DOMParser().parseFromString(n.content, "text/html").body.textContent || ""), t.openConfirm(
    {
      title: n.title || "确认提示",
      message: s.trim(),
      confirmText: n.confirmText || "确定",
      cancelText: n.cancelText || "取消",
      danger: n.danger !== !1
    },
    async () => {
      typeof n.onConfirm == "function" && await n.onConfirm();
    }
  );
}
function ve(n, e, i) {
  n.preventDefault?.(), n.stopPropagation?.();
  const t = String(e.mid), s = i.getFollowings() || [];
  if (!e.face || !e.sign) {
    const p = s.find((c) => String(c.mid) === t);
    p && (!e.face && p.face && (e.face = p.face), !e.sign && p.sign && (e.sign = p.sign));
  }
  const r = s.some((p) => String(p.mid) === t), h = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", o = globalThis;
  if (!o.LogicWeaverBiliUpPreview) return;
  const a = 320, l = 280;
  let u = n.clientX + 10, d = n.clientY + 10;
  u + a > window.innerWidth - 12 && (u = Math.max(12, n.clientX - a - 10)), d + l > window.innerHeight - 12 && (d = Math.max(12, n.clientY - l - 10)), o.LogicWeaverBiliUpPreview.open(
    {
      mid: t,
      name: e.name || "UP主",
      face: e.face || h,
      sign: e.sign || "暂无个人简介",
      followed: r,
      left: u,
      top: d,
      loading: !0,
      error: "",
      videos: []
    },
    async (p) => {
      if (p) {
        const c = await oe(t);
        if (c.ok) {
          let g = i.getFollowings();
          g || (g = [], i.setFollowings(g)), g.some((f) => String(f.mid) === t) || g.unshift({ mid: t, name: e.name || "UP主", face: e.face || "", sign: e.sign || "" });
          try {
            const f = await Y(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]), m = (Array.isArray(f.biliUnfollowedMidsV1) ? f.biliUnfollowedMidsV1 : []).filter((v) => String(v) !== t), y = f.biliFollowingsCacheV1 || {};
            await X({
              biliFollowingsCacheV1: { mid: y.mid || "", updatedAt: Date.now(), list: g },
              biliUnfollowedMidsV1: m
            });
          } catch {
          }
          return i.refreshManager?.(), i.notifyToast(`已关注「${e.name || t}」`), !0;
        } else
          return i.notifyToast(`关注失败：${c.reason || "网络异常"}`), !1;
      } else {
        const c = await ne(t);
        if (c.ok) {
          const g = i.getFollowings();
          g && i.setFollowings(g.filter((f) => String(f.mid) !== t)), (i.getGroups() || []).forEach((f) => {
            f.upMids = (f.upMids || []).filter((b) => String(b) !== t);
          }), await i.saveGroups();
          try {
            const f = await Y(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]), b = Array.isArray(f.biliUnfollowedMidsV1) ? f.biliUnfollowedMidsV1 : [], m = new Set(b.map(String));
            m.add(t);
            const y = f.biliFollowingsCacheV1 || {}, v = (y.list || i.getFollowings() || []).filter((w) => String(w.mid) !== t);
            await X({
              biliFollowingsCacheV1: { mid: y.mid || "", updatedAt: Date.now(), list: v },
              biliUnfollowedMidsV1: Array.from(m)
            });
          } catch {
          }
          return we(t), i.clearAggregationCache(), i.refreshManager?.(), i.notifyToast(`已取消关注「${e.name || t}」`), !0;
        } else
          return i.notifyToast(`取消关注失败：${c.reason || "网络异常"}`), !1;
      }
    }
  ), (!e.face || !e.sign) && C.api(`https://api.bilibili.com/x/space/wbi/acc/info?mid=${t}`).then((p) => {
    if (p) {
      const c = p.face ? String(p.face).replace(/^http:/, "https:") : e.face, g = p.sign || e.sign;
      o.LogicWeaverBiliUpPreview.update({ face: c, sign: g });
    }
  }).catch(() => {
  }), re(e.mid, 3).then((p) => {
    if (!p.length) {
      o.LogicWeaverBiliUpPreview.update({ loading: !1, videos: [] });
      return;
    }
    o.LogicWeaverBiliUpPreview.update({
      loading: !1,
      videos: p.slice(0, 3).map((c) => ({
        bvid: c.bvid,
        title: c.title,
        cover: c.cover,
        duration: c.duration ? H(c.duration) : "",
        playCount: L(c.play),
        published: c.pubTimeDesc || "最新",
        url: c.bvid ? `https://www.bilibili.com/video/${c.bvid}` : "#"
      }))
    });
  }).catch(() => {
    o.LogicWeaverBiliUpPreview.update({ loading: !1, error: "加载失败，请重试" });
  });
}
function ye(n) {
  const e = globalThis;
  typeof e.showBiliToast == "function" && e.showBiliToast(n);
}
async function Ce(n, e = ye) {
  let i = n.aid;
  const t = n.bvid || "";
  if (!i && t)
    try {
      i = (await C.api(
        `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`
      ))?.aid, i && (n.aid = i);
    } catch (a) {
      console.error("解析视频 aid 失败", a);
    }
  if (!i)
    return e("未能获取到该视频 AID，请稍后重试"), { ok: !1, reason: "未能获取到该视频 AID" };
  const s = await C.getUserNav();
  if (!s.isLogin)
    return e("未能获取到 B站收藏夹，请确认已登录 B站"), { ok: !1, reason: "未能获取到 B站收藏夹" };
  const r = await C.getCreatedFolders(s.mid);
  if (!r || !r.length)
    return e("未能获取到 B站收藏夹，请确认已登录 B站"), { ok: !1, reason: "未能获取到 B站收藏夹" };
  const h = r.find((a) => a.title === "收集箱") || r.find((a) => a.title && a.title.includes("收集箱")) || r.find((a) => a.title && a.title.includes("收件箱")) || r.find((a) => a.title === "默认收藏夹") || r.find((a) => a.title && a.title.includes("默认")) || r[0];
  if (!h?.id)
    return e("未找到目标收藏夹，请检查 B站 收藏夹设置"), { ok: !1, reason: "未找到目标收藏夹" };
  e(`正在保存至「${h.title}」…`);
  const o = await C.addVideoToFavorite(h.id, i);
  if (o.ok)
    return e(`已成功保存到「${h.title}」`), { ok: !0, targetFolder: h };
  {
    const a = o.reason || "保存失败";
    return a.includes("已") || a.includes("exist") || a.includes("11201") ? e(`该视频已在「${h.title}」中`) : e(`保存失败：${a}`), o;
  }
}
function Ae(n) {
  const e = Array.isArray(n?.cues) ? n.cues : [], i = String(n?.desc || "").trim(), t = Array.isArray(n?.viewPoints) ? n.viewPoints : [], s = [];
  if (t.length > 0)
    for (let r = 0; r < t.length; r++) {
      const h = t[r], o = Math.max(0, Number(h.from || 0)), a = r + 1 < t.length ? Number(t[r + 1].from || 0) : 0, l = Math.max(o, Number(h.to || a || (e.length ? e[e.length - 1].to : o + 120))), u = String(h.content || h.title || h.part_name || `第 ${r + 1} 节`).trim(), d = e.filter((p) => p.from >= o && (a ? p.from < a : p.from <= l));
      s.push({
        id: r,
        from: o,
        to: l,
        title: u,
        cues: d.map((p, c) => ({ index: c, from: p.from, to: p.to, content: p.content })),
        source: "viewpoint"
      });
    }
  if (!s.length && i) {
    const r = /(?:^|\r?\n)\s*(?:\[?(\d{1,2}:)?(\d{1,2}):(\d{2})\]?)\s*(?:[-–—|：:\s]\s*)?([^\r\n]{2,80})/g;
    let h;
    const o = [];
    for (; (h = r.exec(i)) !== null; ) {
      const a = h[1] ? parseInt(h[1], 10) : 0, l = parseInt(h[2], 10), u = parseInt(h[3], 10), d = a * 3600 + l * 60 + u, p = h[4].replace(/^[-–—|：:\s]+/, "").trim();
      p && !/^(点赞|投币|收藏|关注|交流群|合作|vx|微信|qq|微博)/i.test(p) && o.push({ from: d, title: p });
    }
    if (o.length >= 2) {
      let a = !0;
      for (let l = 1; l < o.length; l++)
        if (o[l].from <= o[l - 1].from) {
          a = !1;
          break;
        }
      if (a)
        for (let l = 0; l < o.length; l++) {
          const u = o[l], d = o[l + 1], p = u.from, c = d ? d.from : e.length ? e[e.length - 1].to : p + 120, g = e.filter((f) => f.from >= p && (d ? f.from < d.from : f.from <= c));
          s.push({
            id: l,
            from: p,
            to: c,
            title: u.title,
            cues: g.map((f, b) => ({ index: b, from: f.from, to: f.to, content: f.content })),
            source: "desc"
          });
        }
    }
  }
  if (!s.length && e.length > 0) {
    let r = [], h = e[0].from;
    const o = (a = null) => {
      if (!r.length) return;
      const l = r[0].from, u = r[r.length - 1].to, d = r[0].content || "", p = d.replace(/^(那么|其实|所以|大家好|今天|那我们|接下来|然后|就是说)[,，\s]*/g, "").trim(), c = (p.length >= 4 ? p.slice(0, 24) : d.slice(0, 24)) || `小节 ${s.length + 1}`;
      s.push({
        id: s.length,
        from: l,
        to: a !== null ? a : u,
        title: c,
        cues: r.map((g, f) => ({ index: f, from: g.from, to: g.to, content: g.content })),
        source: "smart"
      }), r = [];
    };
    for (let a = 0; a < e.length; a++) {
      const l = e[a], u = e[a + 1];
      r.push(l);
      const d = l.to - h, p = u ? u.from - l.to : 0, c = /[。！？!?]$/.test(l.content), g = u && /^(接下来|第二|第三|第四|另外|总的来说|最后|在.+方面|回顾|来看)/.test(u.content);
      (p >= 2.2 && (d >= 18 || r.length >= 4) || d >= 45 && (c || g) || d >= 75 && (c || p >= 1)) && u && (o(u.from), h = u.from);
    }
    o();
  }
  return s.forEach((r) => {
    if (r.cues && r.cues.length > 0) {
      const h = r.cues.map((p) => p.content.trim()).filter(Boolean), o = [], a = [];
      let l = [], u = [], d = 0;
      for (let p = 0; p < r.cues.length; p++) {
        const c = r.cues[p];
        let g = (c.content || "").trim();
        g && (/[。！？!?；;：:，,、…”’）》】）]$/.test(g) || (p === r.cues.length - 1 || /^(为什么|为何|怎么|如何|什么|是否|谁)/.test(g) ? g += "。" : g += "，"), l.push(g), u.push({
          index: p,
          from: Number(c.from || 0),
          to: Number(c.to || 0),
          content: g
        }), d += g.length, /[。！？!?]$/.test(g) && (d >= 85 || u.length >= 4) && (o.push(l.join("")), a.push(u), l = [], u = [], d = 0));
      }
      l.length && (o.push(l.join("")), a.push(u)), r.paragraphs = o.length ? o : [h.join("，") + "。"], r.paragraphCues = a.length ? a : [r.cues.map((p, c) => ({ index: c, from: p.from, to: p.to, content: p.content }))];
    } else
      r.paragraphs = [r.title || "本小节暂无文本内容。"], r.paragraphCues = [];
  }), s;
}
async function Me(n) {
  const { channelKey: e, channel: i, cache: t, visibleCount: s, force: r, signal: h, readArchive: o } = n;
  if (h.throwIfAborted(), !i) throw new Error("订阅频道不存在");
  if (!r && t && Date.now() - t.at < 600 * 1e3 && t.editions?.length) {
    let f = s;
    return { editions: t.editions.map((m) => {
      const y = m.documents.slice(0, f);
      return f -= y.length, { ...m, documents: y };
    }).filter((m) => m.documents.length), cached: !0 };
  }
  const a = await o(h) || {}, l = Array.isArray(a[e]) ? a[e] : [], u = await C.api(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${i.mid}`, { signal: h });
  if (h.throwIfAborted(), !Array.isArray(u?.items)) throw new Error("订阅动态返回格式异常");
  const p = u.items.map((f) => {
    const b = f?.modules || {}, m = b.module_author || {}, y = b.module_dynamic || {}, v = y.major?.archive || {}, w = v.bvid || "";
    return w ? {
      bvid: w,
      title: v.title || y.desc?.text || "视频投稿",
      desc: y.desc?.text || v.desc || "",
      cover: (v.cover || "").replace(/^http:/, "https:"),
      pubTs: Number(m.pub_ts || f.pub_ts || 0),
      author: m.name || i.fallbackName,
      play: v.stat?.play || 0,
      danmaku: v.stat?.danmaku || 0,
      durationText: v.duration_text || "",
      mid: i.mid
    } : null;
  }).filter(Boolean).sort((f, b) => b.pubTs - f.pubTs).slice(0, s), c = (f) => {
    const b = new Date(f * 1e3);
    return `${b.getFullYear()}-${String(b.getMonth() + 1).padStart(2, "0")}-${String(b.getDate()).padStart(2, "0")}`;
  }, g = [];
  for (const f of p) {
    h.throwIfAborted();
    const b = c(f.pubTs);
    let m = g.find((w) => w.date === b);
    m || (m = { date: b, documents: [], createdAt: Date.now() }, g.push(m));
    const y = r ? null : l.find((w) => w.date === b)?.documents?.find((w) => w.bvid === f.bvid);
    if (y?.hasSubtitle) {
      m.documents.push(y);
      continue;
    }
    const v = await C.fetchVideoSubtitleDetails(f.bvid, void 0, h);
    h.throwIfAborted(), m.documents.push({
      ...f,
      aid: v.aid || null,
      text: v.ok ? v.bodyText || f.desc || "没有字幕" : f.desc || "没有字幕",
      cues: v.cues || [],
      hasSubtitle: v.ok,
      viewPoints: v.viewPoints || []
    });
  }
  return { editions: g, cached: !1 };
}
const $ = "biliSubCustomChannelsV1", _ = "biliSubVideoArchivesV1";
function Ue(n) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(n, e);
    else {
      const i = {};
      n.forEach((t) => {
        try {
          const s = localStorage.getItem(t);
          s && (i[t] = JSON.parse(s));
        } catch {
        }
      }), e(i);
    }
  });
}
function xe(n) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(n, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(n).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function q(n, e) {
  const i = globalThis;
  typeof i.showBiliToast == "function" && i.showBiliToast(n, e);
}
class Fe {
  constructor(e) {
    this.options = e, this.subChannels = {}, this.subState = {
      channelKey: "",
      viewMode: "srt",
      loading: !1,
      editions: [],
      activeDate: "",
      activeDocBvid: "",
      visibleCounts: {},
      cache: {}
    }, this.subCustomChannelsLoaded = !1, this.subscriptionActive = !1, this.subscriptionRevision = 0, this.subscriptionRequest = null, this.subscriptionArchiveQueue = Promise.resolve();
  }
  async ensureSubCustomChannels(e) {
    if (e?.throwIfAborted(), this.subCustomChannelsLoaded) return;
    const i = e ? await this.options.readChannelStorage([$], e) : await Ue([$]);
    if (e?.throwIfAborted(), this.subCustomChannelsLoaded) return;
    (Array.isArray(i[$]) ? i[$] : []).forEach((s) => {
      if (!s?.mid) return;
      const r = `up-${s.mid}`;
      this.subChannels[r] = {
        mid: String(s.mid),
        fallbackName: s.name || `UP ${s.mid}`,
        title: s.name || `UP ${s.mid}`,
        custom: !0
      };
    }), this.subCustomChannelsLoaded = !0;
  }
  async saveSubCustomChannels() {
    const e = Object.values(this.subChannels).filter((i) => i.custom).map((i) => ({ mid: i.mid, name: i.fallbackName }));
    await xe({ [$]: e });
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
      q("添加弹窗尚未加载，请刷新页面");
      return;
    }
    const t = /* @__PURE__ */ new Map();
    i.openChannelPicker(async (s) => {
      const r = t.get(String(s));
      if (!r) throw new Error("未找到该 UP 主");
      await this.subscribeFollowedBiliUp(r);
    });
    try {
      await this.options.initUpGroups();
      const s = await this.options.loadFollowedUps(!1), r = new Set(Object.values(this.subChannels).map((o) => String(o.mid)));
      (s || []).forEach((o) => t.set(String(o.mid), o));
      const h = (this.options.getUpGroups() || []).map((o) => ({
        id: String(o.id),
        name: String(o.name || "未命名分组"),
        mids: K(this.options.getUpGroups(), o.id)
      }));
      i.updateChannelPicker({
        loading: !1,
        error: "",
        groups: h,
        items: (s || []).map((o) => ({
          mid: String(o.mid),
          name: String(o.name || `UP ${o.mid}`),
          face: String(o.face || ""),
          added: r.has(String(o.mid))
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
    const e = this.subState.channelKey, i = this.subChannels[e], t = (this.subState.editions || []).flatMap((a) => a.documents || []), s = this.getActiveSubscriptionDocument(), r = s ? this.extractChapters(s) : [], h = Array.isArray(s?.cues) ? s.cues : [], o = de(s?.desc || s?.text || "");
    S.updateOrganizer({
      subscriptionTitle: String(i?.fallbackName || i?.title || "订阅视频"),
      subscriptionSubtitle: "订阅视频 · AI 逐字字幕稿 · 点击台词即刻跳转播放",
      subscriptionScriptMode: "lyrics",
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
      subscriptionChapters: r.map((a) => ({
        title: String(a.title || "未命名章节"),
        from: Number(a.from || 0),
        to: Number(a.to || 0),
        fromText: D(a.from),
        toText: D(a.to),
        paragraphs: (a.paragraphs || []).map(String),
        paragraphCues: (a.paragraphCues || []).map(
          (l) => (l || []).map((u, d) => ({
            index: Number(u.index ?? d),
            from: Number(u.from || 0),
            to: Number(u.to || 0),
            timeText: D(u.from),
            content: String(u.content || "")
          }))
        ),
        cues: (a.cues || []).map((l, u) => ({
          index: Number(l.index ?? u),
          from: Number(l.from || 0),
          to: Number(l.to || 0),
          timeText: D(l.from),
          content: String(l.content || "")
        }))
      })),
      subscriptionCues: h.map((a, l) => ({
        index: l,
        from: Number(a.from || 0),
        to: Number(a.to || 0),
        timeText: D(a.from),
        content: String(a.content || "")
      })),
      subscriptionDescription: o,
      subscriptionCurrent: s ? {
        bvid: String(s.bvid || ""),
        aid: String(s.aid || ""),
        title: String(s.title || s.bvid || "未命名视频"),
        author: String(s.author || i?.fallbackName || "UP主"),
        cover: String(s.cover || "").replace(/^http:/, "https:"),
        description: String(s.desc || ""),
        playCount: L(s.play || 0),
        danmakuCount: L(s.danmaku || 0),
        duration: String(s.durationText || "")
      } : null
    });
  }
  extractChapters(e) {
    return Ae(e);
  }
  async copyActiveSubscriptionScript() {
    const e = this.getActiveSubscriptionDocument(), i = S.state.organizer.subscriptionCues || [], t = e ? String(e.text || e.cues?.map((s) => s.content).filter(Boolean).join(`
`) || "").trim() : i.map((s) => s.content).filter(Boolean).join(`
`).trim();
    if (!t) {
      q("当前视频暂无可复制的字幕稿");
      return;
    }
    try {
      await navigator.clipboard.writeText(t), q("字幕稿已复制为纯文本");
    } catch {
      q("复制失败，请检查剪贴板权限");
    }
  }
  cancelSubscription() {
    this.subscriptionRevision++;
    const e = this.subscriptionRequest;
    this.subscriptionRequest = null, clearTimeout(this.subscriptionTimer), e?.abort(), this.subState.loading = !1;
  }
  setSubscriptionActive(e) {
    this.subscriptionActive = e, e || (this.cancelSubscription(), S.state.organizer.mode === "subscription" && S.updateOrganizer({ subscriptionLoading: !1 }));
  }
  loadSubVideoData(e, i, t, s) {
    return Me({
      channelKey: e,
      channel: this.subChannels[e],
      cache: this.subState.cache[e],
      visibleCount: i,
      force: t,
      signal: s,
      readArchive: async (r) => (await this.options.readChannelStorage([_], r))[_]
    });
  }
  async loadSubVideo(e = !1, i = {}) {
    if (!this.subscriptionActive) return;
    this.cancelSubscription();
    const t = new AbortController();
    this.subscriptionRequest = t;
    const s = t.signal, r = () => this.subscriptionActive && this.subscriptionRequest === t, h = () => {
      if (s.throwIfAborted(), !r()) throw new DOMException("Stale subscription read", "AbortError");
    };
    let o = i.channelKey || this.subState.channelKey;
    this.subState.loading = !0, S.updateOrganizer({ subscriptionLoading: !0, subscriptionError: "" }), this.subscriptionTimer = setTimeout(() => {
      r() && (this.cancelSubscription(), S.updateOrganizer({ subscriptionLoading: !1, subscriptionError: "字幕订阅读取超时，请手动重试" }));
    }, 6e4);
    try {
      if (await this.ensureSubCustomChannels(s), h(), this.subChannels[o] || (o = Object.keys(this.subChannels)[0] || ""), !o) {
        this.subState.channelKey = "", this.subState.editions = [], this.subState.activeDocBvid = "", this.publishSubscriptionSnapshot();
        return;
      }
      this.subState.channelKey || (this.subState.channelKey = o);
      const a = i.visibleCount ?? Math.max(3, Number(this.subState.visibleCounts[o] || 3));
      this.publishSubscriptionSnapshot();
      const { editions: l, cached: u } = await this.loadSubVideoData(o, a, e, s);
      h();
      const d = u ? Promise.resolve() : this.subscriptionArchiveQueue.catch(() => {
      }).then(async () => {
        h();
        const p = await this.options.readChannelStorage([_], s);
        h();
        const c = p[_];
        if (c != null && (typeof c != "object" || Array.isArray(c))) throw new Error("字幕归档格式异常，未覆盖");
        await new Promise((g, f) => {
          const b = { [_]: { ...c, [o]: l } };
          try {
            typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.set(b, () => {
              chrome.runtime?.lastError ? f(new Error("字幕归档保存失败")) : g();
            }) : (localStorage.setItem(_, JSON.stringify(b[_])), g());
          } catch (m) {
            f(m);
          }
        });
      });
      u || (this.subscriptionArchiveQueue = d.catch(() => {
      })), await d, h(), o !== this.subState.channelKey && (this.subState.activeDate = "", this.subState.activeDocBvid = ""), this.subState.channelKey = o, this.subState.visibleCounts[o] = a, this.subState.editions = l, u || (this.subState.cache[o] = { at: Date.now(), editions: l }), this.publishSubscriptionSnapshot();
    } catch (a) {
      r() && !s.aborted && S.updateOrganizer({ subscriptionError: `${this.subChannels[o]?.fallbackName || o}：${a?.message || "字幕订阅读取失败"}（未切换或增加条数，可重新选择该频道重试）` });
    } finally {
      r() && (clearTimeout(this.subscriptionTimer), this.subscriptionRequest = null, this.subState.loading = !1, S.updateOrganizer({ subscriptionLoading: !1 }));
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
    this.options.suspendEmbeddedPlayback(), S.updateOrganizer({ mode: "subscription", subscriptionLoading: !1, subscriptionError: "" }), this.publishSubscriptionSnapshot(), await this.loadSubVideo(!1);
  }
}
const Ge = "biliEmbeddedPlaybackPositionsV1", Q = /* @__PURE__ */ new Map();
let Z = 0;
function Ve(n) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(n, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(n).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function ae(n) {
  const e = n?.dataset?.bvid;
  !e || !Number.isFinite(n.currentTime) || (Q.set(e, Math.max(0, n.currentTime)), clearTimeout(Z), Z = window.setTimeout(() => {
    Ve({ [Ge]: Object.fromEntries(Q) }).catch(() => {
    });
  }, 350));
}
function Te(n = document) {
  const e = n.querySelector(".bili-sub-native-video");
  e && (ae(e), e.pause()), n.querySelectorAll(
    ".bili-mini-player video, #bili-theater-video, #bili-radio-audio, video, audio"
  ).forEach((i) => {
    try {
      i.pause();
    } catch {
    }
  });
}
function J(n) {
  const e = globalThis;
  typeof e.showBiliToast == "function" && e.showBiliToast(n);
}
function _e(n) {
  S.onAction((e, i) => {
    switch (e) {
      case "open-up-manager":
      case "manage-up-groups":
        n.openBiliUpGroupManagerDialog();
        break;
      case "open-sub-video":
        n.openSubVideoView();
        break;
      case "open-cache":
        n.openCachedView();
        break;
      case "cache-play": {
        const t = S.state.organizer.cachedVideos.find((s) => s.id === String(i));
        t && import("./cache.service-CbQucIT5.js").then(({ openCachedBiliVideo: s }) => s(t));
        break;
      }
      case "cache-open-web": {
        const t = S.state.organizer.cachedVideos.find((s) => s.id === String(i));
        t?.bvid && chrome?.tabs?.create?.({ url: `https://www.bilibili.com/video/${t.bvid}`, active: !0 });
        break;
      }
      case "cache-delete":
        J("删除缓存请先在缓存文件夹中手动处理");
        break;
      case "special-play-page":
        import("./organizer-actions-DHL1ag-v.js").then(({ biliOrganizerActions: t }) => t.playSpecialPage());
        break;
      case "open-following":
        n.openFollowingView();
        break;
      case "open-recommendations":
        n.openRecommendationView();
        break;
      case "recommendations-refresh":
        n.recommendations.refresh();
        break;
      case "recommendations-page":
        n.recommendations.goToPage(Number(i));
        break;
      case "following-refresh":
        n.loadFollowing(!0);
        break;
      case "following-group":
        n.loadFollowing(!1, { currentGroupId: String(i || "__all__"), selectedUpMid: "", page: 1 });
        break;
      case "following-member":
        n.loadFollowing(!1, { selectedUpMid: String(i || ""), page: 1 });
        break;
      case "following-page": {
        const t = Number(i);
        if (n.feedState.loading || !Number.isInteger(t) || t < 1 || Math.abs(t - n.feedState.page) !== 1 || t > n.feedState.page && (!n.feedState.hasMore || n.feedState.currentGroupId === "__all__" && !n.feedState.nextOffset)) break;
        n.loadFollowing(!1, { page: t, pendingScroll: !0 });
        break;
      }
      case "following-manage-groups": {
        const t = n.feedState.currentGroupId !== "__all__" ? n.feedState.currentGroupId : "";
        n.openBiliUpGroupManagerDialog(t, "", i === "create");
        break;
      }
      case "following-preview-member": {
        const t = (n.upGroupsState.followingsCache || []).find((s) => String(s.mid) === String(i?.id));
        t && n.showUpRecentVideosPreview(
          { preventDefault() {
          }, stopPropagation() {
          }, clientX: i?.clientX || 0, clientY: i?.clientY || 0 },
          { mid: String(t.mid), name: t.name, face: t.face, sign: t.sign || "" }
        );
        break;
      }
      case "subscription-channel": {
        const t = String(i || "");
        t && n.subChannels[t] && n.loadSubVideo(!1, { channelKey: t });
        break;
      }
      case "subscription-video": {
        const t = String(i || "");
        if (t && t !== n.subState.activeDocBvid) {
          n.subState.activeDocBvid = t;
          const s = (n.subState.editions || []).find((r) => (r.documents || []).some((h) => h.bvid === t));
          s && (n.subState.activeDate = s.date), n.publishSubscriptionSnapshot();
        }
        break;
      }
      case "subscription-add-channel":
        n.addBiliSubChannel();
        break;
      case "subscription-load-more": {
        if (n.subState.loading) break;
        const t = n.subState.channelKey;
        if (!t) break;
        const s = Math.max(3, Number(n.subState.visibleCounts[t] || 3)) + 3;
        n.loadSubVideo(!0, { visibleCount: s });
        break;
      }
      case "subscription-copy-script":
        n.copyActiveSubscriptionScript();
        break;
      case "subscription-refresh":
        n.loadSubVideo(!0);
        break;
      case "subscription-script-mode": {
        localStorage.setItem("biliSubScriptMode", "lyrics"), n.publishSubscriptionSnapshot();
        break;
      }
      case "subscription-seek": {
        const t = Number(i?.from), s = n.getActiveSubscriptionDocument(), r = S.state.organizer.subscriptionCurrent;
        if (Number.isFinite(t) && (s || r)) {
          const h = document.querySelector(".bili-sub-native-video");
          h ? (h.currentTime = Math.max(0, t - 0.1), h.play().catch(() => {
          })) : s && (W.openVideo({
            bvid: s.bvid,
            aid: String(s.aid || ""),
            title: s.title || s.bvid,
            cover: s.cover
          }), setTimeout(() => {
            const o = document.querySelector("#bili-theater-video");
            o && (o.currentTime = Math.max(0, t - 0.1), o.play().catch(() => {
            }));
          }, 100));
        }
        break;
      }
      case "subscription-copy-description": {
        const t = n.getActiveSubscriptionDocument(), s = S.state.organizer, r = t?.desc || t?.text || s.subscriptionCurrent?.description || s.subscriptionDescription.join(`
`);
        r && navigator.clipboard.writeText(r).then(() => {
          J("视频简介已复制");
        }).catch(() => {
          J("复制简介失败");
        });
        break;
      }
      case "subscription-open-player": {
        const t = n.getActiveSubscriptionDocument();
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
function ee(n) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(n, e);
    else {
      const i = {};
      n.forEach((t) => {
        try {
          const s = localStorage.getItem(t);
          s && (i[t] = JSON.parse(s));
        } catch {
        }
      }), e(i);
    }
  });
}
function te(n, e) {
  return new Promise((i, t) => {
    let s = !1;
    const r = (o, a) => {
      s || (s = !0, e.removeEventListener("abort", h), a ? t(a) : i(o || {}));
    }, h = () => r(void 0, new DOMException("Channel read cancelled", "AbortError"));
    if (e.aborted) {
      h();
      return;
    }
    e.addEventListener("abort", h, { once: !0 });
    try {
      if (typeof chrome < "u" && chrome?.storage?.local)
        chrome.storage.local.get(n, (o) => {
          const a = chrome.runtime?.lastError;
          r(o, a ? new Error("读取频道本地数据失败") : void 0);
        });
      else {
        const o = {};
        for (const a of n) {
          const l = localStorage.getItem(a);
          l !== null && (o[a] = JSON.parse(l));
        }
        r(o);
      }
    } catch (o) {
      r(void 0, o);
    }
  });
}
function ie(n) {
  return new Promise((e, i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.set(n, () => {
        const t = chrome.runtime?.lastError;
        t ? i(new Error(t.message || "存储写入失败")) : e();
      });
    else
      try {
        Object.entries(n).forEach(([t, s]) => {
          localStorage.setItem(t, JSON.stringify(s));
        }), e();
      } catch (t) {
        i(t);
      }
  });
}
function O(n, e) {
  const i = globalThis;
  typeof i.showBiliToast == "function" && i.showBiliToast(n, e);
}
class k {
  constructor() {
    this.following = new me({
      suspendEmbeddedPlayback: () => this.suspendEmbeddedPlayback(),
      getUpGroups: () => this.upGroupsState.groups,
      setUpGroups: (e) => {
        this.upGroupsState.groups = e;
      },
      getFollowingsCache: () => this.upGroupsState.followingsCache,
      setFollowingsCache: (e) => {
        this.upGroupsState.followingsCache = e;
      },
      readChannelStorage: (e, i) => te(e, i),
      fetchUpLatestVideos: (e, i, t) => this.fetchUpLatestVideos(e, i, t)
    }), this.feedState = this.following.feedState, this.upGroupsState = {
      groups: [],
      followingsCache: [],
      loadingFollowings: !1,
      selectedManageGroupId: ""
    }, this.recommendations = new pe({
      api: (e, i) => C.api(e, { signal: i }),
      publish: (e) => S.updateOrganizer(e),
      scrollToStart: () => document.querySelector("#fo-body")?.closest("section")?.scrollIntoView({ block: "start" })
    }), this.rcmdState = this.recommendations.state, this.subscription = new Fe({
      suspendEmbeddedPlayback: () => this.suspendEmbeddedPlayback(),
      getUpGroups: () => this.upGroupsState.groups,
      initUpGroups: () => this.initBiliUpGroups(),
      loadFollowedUps: (e) => this.loadFollowedUps(e),
      readChannelStorage: (e, i) => te(e, i)
    }), this.subChannels = this.subscription.subChannels, this.subState = this.subscription.subState, this.actionSubscriptionBound = !1, this.searchActions = {
      search: async (e, i = 1, t = 12) => {
        const { ik: s, sk: r } = await C.getWbiKeys(), { signedQuery: h } = ue(
          { search_type: "video", keyword: e, page: i, page_size: t },
          s,
          r
        );
        return C.api(`https://api.bilibili.com/x/web-interface/wbi/search/type?${h}`);
      },
      favorite: (e) => this.saveBiliVideoToDefaultFavorite({ ...e }),
      cache: async (e) => {
        const { cacheBiliVideo: i } = await import("./cache.service-CbQucIT5.js");
        return i({ ...e });
      },
      local: (e) => (this.openLocalPlaybackView({ ...e, videoUrl: `https://www.bilibili.com/video/${e.bvid}` }), !0)
    }, this.bindFavoritesActions();
  }
  static getInstance() {
    return k.instance || (k.instance = new k()), k.instance;
  }
  // ---------- 1. 关注分组与 UP 主管理 ----------
  async initBiliUpGroups() {
    const e = await ee(["biliFollowingGroupsV1", "biliFollowingsCacheV1", "biliUnfollowedMidsV1"]);
    this.upGroupsState.groups = Array.isArray(e.biliFollowingGroupsV1) ? e.biliFollowingGroupsV1 : [];
    const i = new Set((Array.isArray(e.biliUnfollowedMidsV1) ? e.biliUnfollowedMidsV1 : []).map(String));
    if (Array.isArray(e.biliFollowingsCacheV1?.list) && (this.upGroupsState.followingsCache = e.biliFollowingsCacheV1.list.filter(
      (t) => !i.has(String(t?.mid))
    )), i.size > 0 && this.upGroupsState.groups.length > 0) {
      let t = !1;
      this.upGroupsState.groups.forEach((s) => {
        if (Array.isArray(s.upMids)) {
          const r = s.upMids.length;
          s.upMids = s.upMids.filter((h) => !i.has(String(h))), s.upMids.length !== r && (t = !0);
        }
      }), t && await this.saveBiliUpGroups();
    }
  }
  async saveBiliUpGroups() {
    await ie({ biliFollowingGroupsV1: this.upGroupsState.groups });
  }
  async loadFollowedUps(e = !1, i) {
    const t = await ee(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]), s = new Set((Array.isArray(t.biliUnfollowedMidsV1) ? t.biliUnfollowedMidsV1 : []).map(String));
    if (!e && this.upGroupsState.followingsCache?.length && Date.now() - Number(t.biliFollowingsCacheV1?.updatedAt || 0) < 36e5)
      return this.upGroupsState.followingsCache = this.upGroupsState.followingsCache.filter(
        (r) => !s.has(String(r?.mid))
      ), this.upGroupsState.followingsCache;
    if (!e && t.biliFollowingsCacheV1?.list?.length && Date.now() - (t.biliFollowingsCacheV1.updatedAt || 0) < 36e5)
      return this.upGroupsState.followingsCache = t.biliFollowingsCacheV1.list.filter(
        (r) => !s.has(String(r?.mid))
      ), this.upGroupsState.followingsCache;
    this.upGroupsState.loadingFollowings = !0;
    try {
      const r = await C.getUserNav();
      if (!r.isLogin) return [];
      const h = String(r.mid), o = 24, a = await C.api(`https://api.bilibili.com/x/relation/followings?vmid=${h}&ps=${o}&pn=1`);
      if (!Array.isArray(a?.list)) return [];
      const l = /* @__PURE__ */ new Map(), u = (g) => {
        for (const f of g)
          !f?.mid || s.has(String(f.mid)) || l.set(String(f.mid), {
            mid: String(f.mid),
            name: f.uname || "UP主",
            face: String(f.face || "").replace(/^http:/, "https:"),
            sign: f.sign || ""
          });
        this.upGroupsState.followingsCache = Array.from(l.values()), i?.();
      };
      u(a.list);
      const d = Math.ceil(Number(a.total || a.list.length) / o);
      let p = !0;
      for (let g = 2; g <= d; g += 2) {
        const f = [g, g + 1].filter((m) => m <= d), b = await Promise.allSettled(f.map((m) => C.api(`https://api.bilibili.com/x/relation/followings?vmid=${h}&ps=${o}&pn=${m}`)));
        for (const m of b)
          m.status === "fulfilled" && Array.isArray(m.value?.list) ? u(m.value.list) : p = !1;
      }
      const c = Array.from(l.values());
      return p ? await ie({ biliFollowingsCacheV1: { mid: h, updatedAt: Date.now(), list: c } }) : O("部分关注分页加载失败，可稍后刷新重试"), c;
    } catch (r) {
      return console.error("加载关注列表异常:", r), (this.upGroupsState.followingsCache || []).filter((h) => !s.has(String(h?.mid)));
    } finally {
      this.upGroupsState.loadingFollowings = !1;
    }
  }
  fetchUpLatestVideos(e, i = 6, t) {
    return re(e, i, t);
  }
  followBiliUp(e) {
    return oe(e);
  }
  unfollowBiliUp(e) {
    return ne(e);
  }
  showCustomConfirmModal(e) {
    Se(e, O);
  }
  showUpRecentVideosPreview(e, i) {
    const t = globalThis;
    ve(e, i, {
      getFollowings: () => this.upGroupsState.followingsCache,
      setFollowings: (s) => {
        this.upGroupsState.followingsCache = s;
      },
      getGroups: () => this.upGroupsState.groups,
      saveGroups: () => this.saveBiliUpGroups(),
      clearAggregationCache: () => this.following.clearAggregationCache(),
      notifyToast: (s) => O(s),
      refreshManager: () => {
        typeof t.__refreshBiliUpGroupManager == "function" && t.__refreshBiliUpGroupManager();
      }
    });
  }
  openBiliUpGroupManagerDialog(e = "", i = "", t = !1) {
    return be(
      {
        initGroups: () => this.initBiliUpGroups(),
        getGroups: () => this.upGroupsState.groups,
        setGroups: (s) => {
          this.upGroupsState.groups = s;
        },
        getFollowings: () => this.upGroupsState.followingsCache,
        saveGroups: () => this.saveBiliUpGroups(),
        loadFollowedUps: (s, r) => this.loadFollowedUps(s, r),
        showConfirmModal: (s) => this.showCustomConfirmModal(s),
        previewUp: (s, r) => this.showUpRecentVideosPreview(s, r),
        notifyToast: (s) => O(s)
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
    this.suspendEmbeddedPlayback(), S.updateOrganizer({ mode: "recommendations", specialLoading: !1, specialError: "" }), this.publishRecommendationSnapshot(), this.recommendations.state.videos.length || this.loadRecommendations(!0);
  }
  setRecommendationsActive(e) {
    this.recommendations.setActive(e), !e && S.state.organizer.mode === "recommendations" && S.updateOrganizer({ specialLoading: !1 });
  }
  loadRecommendations(e = !1) {
    return this.recommendations.loadRecommendations(e);
  }
  publishRecommendationSnapshot() {
    this.recommendations.publishRecommendationSnapshot();
  }
  saveBiliVideoToDefaultFavorite(e) {
    return Ce(e, O);
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
    ae(e);
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
    return import("./organizer-actions-DHL1ag-v.js").then(({ biliOrganizerActions: e }) => e.openCache());
  }
  bindFavoritesActions() {
    this.actionSubscriptionBound || (this.actionSubscriptionBound = !0, _e(this));
  }
}
const ke = k.getInstance();
export {
  Ge as BILI_EMBEDDED_POS_KEY,
  _ as BILI_SUB_ARCHIVES_KEY,
  $ as BILI_SUB_CHANNELS_KEY,
  k as BilibiliChannelService,
  ke as bilibiliChannelService,
  L as formatBiliCompactNumber,
  H as formatBiliDuration,
  D as formatSrtTime,
  se as parseDurationToSeconds,
  de as parseTranscriptParagraphs
};
