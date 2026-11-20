import { d as Ce, o as Ne, H as $e, f as s, g as i, h as l, t as n, F as B, i as U, s as se, j as o, p as Se, v as Le, m as X, b as d, x as E, K as he } from "./vendor-vue-BbmU9NUg.js";
import { _ as Ae } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
function ne(u, h) {
  const v = h[u.fullName] || h[u.fullName.toLowerCase()] || h[u.name] || h[u.name.toLowerCase()] || u.localGroups || [];
  return Array.isArray(v) ? v : [];
}
function Be(u, h, v) {
  return u.filter((p) => v === "all" || (v === "ungrouped" ? !ne(p, h).length : v.startsWith("group:") && ne(p, h).includes(v.slice(6))));
}
const Ee = ["aria-label"], Me = { class: "browser-header" }, De = ["disabled"], Re = { class: "browser-layout" }, ze = {
  class: "browser-folders",
  "aria-label": "资源分组"
}, Fe = ["onClick"], Ge = { class: "folder-label" }, qe = {
  key: 0,
  class: "folder-count"
}, xe = {
  key: 0,
  class: "hint"
}, We = { class: "browser-content" }, je = { class: "browser-toolbar" }, Ue = ["placeholder"], Ve = {
  key: 0,
  class: "hint"
}, Te = {
  key: 1,
  class: "error",
  role: "alert"
}, Oe = {
  key: 2,
  class: "hint"
}, Pe = {
  key: 3,
  class: "error",
  role: "alert"
}, He = {
  key: 4,
  class: "hint"
}, Ie = {
  key: 5,
  class: "error",
  role: "alert"
}, Ke = {
  key: 6,
  class: "hint"
}, Ze = {
  key: 0,
  class: "hint"
}, Je = { class: "video-grid" }, Qe = ["draggable", "onDragstart"], Xe = ["disabled", "aria-label", "aria-pressed", "onClick"], Ye = ["src"], et = {
  key: 1,
  class: "cover-placeholder"
}, tt = {
  key: 2,
  class: "duration"
}, at = {
  key: 1,
  class: "resource-pager"
}, lt = ["disabled"], st = ["disabled"], it = {
  key: 0,
  class: "hint"
}, nt = {
  key: 1,
  class: "hint"
}, rt = { class: "repo-grid" }, ut = ["disabled", "aria-pressed", "aria-label", "draggable", "onClick", "onDragstart"], ot = { class: "repo-title" }, dt = ["src"], ct = {
  key: 1,
  class: "repo-avatar repo-avatar-fallback"
}, vt = { class: "repo-add" }, gt = { class: "repo-badges" }, bt = {
  key: 0,
  class: "repo-visibility"
}, ft = {
  key: 1,
  class: "repo-visibility"
}, ht = { class: "repo-meta" }, pt = { key: 0 }, mt = { key: 1 }, ie = 18, yt = /* @__PURE__ */ Ce({
  __name: "ResourcePanel",
  props: {
    kind: {},
    selectedResources: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "select", "dragStart", "dragEnd"],
  setup(u, { emit: h }) {
    const v = u, p = h, F = d(!1), f = d(!1), S = d(""), V = d(""), G = d(!1), q = d(""), T = d(""), M = d(!1), D = d(""), O = d(""), P = d(!1), g = d(""), x = d([]), R = d([]), Y = d(0), w = d(1), W = d(!1), z = d(""), pe = E(() => Math.max(1, w.value + (W.value ? 1 : 0), Math.ceil(Y.value / ie))), L = he(() => ({ repos: [], customGroups: [], repoGroupsMap: {}, loading: !1 })), C = he(() => ({ repos: [], lists: [], repoListNames: /* @__PURE__ */ new Map(), loading: !1 }));
    let b = 0, c = !0, m = null, y = null;
    function re(t) {
      return t.isSeason ? `season:${t.id}` : String(t.id || t.fid);
    }
    const H = E(() => v.kind === "bilibili" ? x.value.map((t) => ({ id: re(t), label: t.title, count: t.media_count, group: t.isOther ? "其他收藏" : t.isCollected ? "收藏的合集 / 收藏夹" : "我创建的收藏夹" })) : [{ id: "all", label: "我的全部仓库", count: L.value().repos.length, group: "我的仓库" }, { id: "ungrouped", label: "未分类", group: "我的仓库" }, ...L.value().customGroups.map((t) => ({ id: `group:${t}`, label: t, group: "我的仓库分组" })), { id: "star-all", label: "全部 Star 收藏", count: C.value().repos.length, group: "Star 收藏" }, ...C.value().lists.map((t) => ({ id: `star-group:${t.name}`, label: t.name, group: "Star 收藏" }))]), me = E(() => [...new Set(H.value.map((t) => t.group || ""))]), ye = E(() => H.value.find((t) => t.id === g.value)), k = E(() => g.value === "star-all" || g.value.startsWith("star-group:")), I = E(() => {
      const t = k.value ? C.value().repos.filter((e) => g.value === "star-all" || (C.value().repoListNames.get(e.full_name.toLowerCase()) || []).includes(g.value.slice(11))).map((e) => ({ id: e.id, fullName: e.full_name, description: e.description, language: e.language, stargazersCount: e.stargazers_count, badge: "Star", avatar: e.owner?.avatar_url || "", updatedAt: e.updated_at, groups: C.value().repoListNames.get(e.full_name.toLowerCase()) || [], visibility: e.private === !0 ? "private" : e.private === !1 ? "public" : "unknown" })) : Be(L.value().repos, L.value().repoGroupsMap, g.value).map((e) => ({ id: e.id, fullName: e.fullName, description: e.description, language: e.language, stargazersCount: e.stargazersCount, badge: e.isPrivate ? "私有" : "公开", avatar: "", updatedAt: e.updatedAt, groups: ne(e, L.value().repoGroupsMap), visibility: e.isPrivate ? "private" : "public" })), a = z.value.trim().toLowerCase();
      return a ? t.filter((e) => e.fullName.toLowerCase().includes(a) || (e.description || "").toLowerCase().includes(a)) : t;
    }), ue = E(() => {
      const t = z.value.trim().toLowerCase();
      return t ? R.value.filter((a) => a.title.toLowerCase().includes(t)) : R.value;
    });
    function N(t, a) {
      return v.selectedResources.some((e) => e.kind === t && e.id.toLowerCase() === a.toLowerCase());
    }
    function K(t) {
      return /^BV[0-9A-Za-z]{10}$/.test(t.bvid || "") ? { kind: "bilibili", id: t.bvid, title: t.title, url: `https://www.bilibili.com/video/${t.bvid}`, author: t.upper?.name, duration: t.duration } : null;
    }
    function Z(t) {
      return /^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(t.fullName) ? { kind: "github", id: t.fullName, title: t.fullName, url: `https://github.com/${t.fullName}`, description: t.description || "", language: t.language, visibility: t.visibility } : null;
    }
    function oe(t) {
      t && !v.disabled && p("select", t);
    }
    function de(t, a) {
      if (!a || v.disabled) {
        t.preventDefault();
        return;
      }
      t.dataTransfer?.setData("application/x-tab-project-resource", "resource"), t.dataTransfer && (t.dataTransfer.effectAllowed = "copy"), p("dragStart", a);
    }
    function ce(t) {
      if (!Number.isFinite(t) || t <= 0) return "";
      const a = Math.floor(t);
      return `${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}`;
    }
    function ke(t) {
      return Number.isFinite(t) ? Number(t) >= 1e4 ? `${(Number(t) / 1e4).toFixed(1)}万` : String(t) : "播放量未知";
    }
    function ve(t) {
      return /^\d{4}-\d{2}-\d{2}/.test(t || "") ? t.slice(0, 10) : "";
    }
    function _e(t) {
      const a = (t || "").replace(/^http:/, "https:");
      return a.startsWith("//") ? `https:${a}` : a;
    }
    async function J(t, a = 1) {
      const e = ++b;
      g.value = t, a === 1 && (R.value = [], Y.value = 0, w.value = 1, W.value = !1), f.value = !0, S.value = "";
      try {
        const { bilibiliService: r } = await import("./github.service-mYu1TuZI.js").then(($) => $.W), _ = await r.getFolderVideos(t, a, ie);
        c && e === b && (R.value = _.medias.slice(0, ie), Y.value = _.total, W.value = _.hasMore, w.value = a);
      } catch (r) {
        c && e === b && (S.value = r instanceof Error ? r.message : "视频读取失败");
      } finally {
        c && e === b && (f.value = !1);
      }
    }
    async function ee() {
      const t = ++b;
      f.value = !0, S.value = "", V.value = "", R.value = [], x.value = [], g.value = "";
      try {
        const { bilibiliService: a } = await import("./github.service-mYu1TuZI.js").then((A) => A.W), e = await a.getUserNav();
        if (!c || t !== b) return;
        if (!e.isLogin || !e.mid) throw new Error("未登录 B 站，请先在 B 站插件中登录。");
        const r = async () => {
          const A = await a.getCollectedFolders(1, 50, e.mid), j = [...A.list];
          let ae = !1;
          for (let le = 2; j.length < A.count && le <= 20; le++) {
            if (!c || t !== b) return { list: j, partial: !0 };
            try {
              const fe = await a.getCollectedFolders(le, 50, e.mid);
              if (!fe.list.length) {
                ae = !0;
                break;
              }
              j.push(...fe.list);
            } catch {
              ae = !0;
              break;
            }
          }
          return { list: j, partial: ae || j.length < A.count };
        }, [_, $] = await Promise.allSettled([a.getCreatedFolders(e.mid), r()]);
        if (!c || t !== b) return;
        if (_.status === "rejected" && $.status === "rejected") throw new Error("收藏夹读取失败，请检查网络后重试。");
        (_.status === "rejected" || $.status === "rejected" || $.status === "fulfilled" && $.value.partial) && (V.value = "部分收藏夹读取失败或数量超过上限，可刷新重试。"), x.value = [..._.status === "fulfilled" ? _.value : [], ...$.status === "fulfilled" ? $.value.list : [], ...a.getOtherFolders()];
        const be = x.value.find((A) => !A.isOther) || x.value[0];
        if (be) {
          await J(re(be));
          return;
        }
      } catch (a) {
        c && t === b && (S.value = a instanceof Error ? a.message : "收藏夹读取失败");
      } finally {
        c && t === b && (f.value = !1);
      }
    }
    async function Q() {
      m?.abort();
      const t = new AbortController();
      m = t, G.value = !0, q.value = "", T.value = "";
      try {
        const { loadOwnRepositorySnapshot: a } = await import("./github-resources-DWMhFx7q.js").then((r) => r.g), e = await a(t.signal);
        c && m === t && (L.value = () => ({ ...e, loading: !1 }), T.value = e.warning);
      } catch (a) {
        c && m === t && !t.signal.aborted && (q.value = a instanceof Error ? a.message : "仓库读取失败");
      } finally {
        c && m === t && (m = null, G.value = !1);
      }
    }
    async function te() {
      y?.abort();
      const t = new AbortController();
      y = t, M.value = !0, D.value = "", O.value = "";
      try {
        const { loadStarRepositorySnapshot: a } = await import("./github-resources-DWMhFx7q.js").then((r) => r.g), e = await a(t.signal);
        c && y === t && (C.value = () => e, O.value = e.warning, P.value = !0);
      } catch (a) {
        c && y === t && !t.signal.aborted && (D.value = a instanceof Error ? a.message : "Star 收藏读取失败");
      } finally {
        c && y === t && (y = null, M.value = !1);
      }
    }
    function we(t) {
      z.value = "", v.kind === "bilibili" ? J(t) : (g.value = t, (t === "star-all" || t.startsWith("star-group:")) && !P.value && !M.value && te());
    }
    function ge(t, a) {
      a !== "local" || !("ghUser" in t) && !("ghToken" in t) || (m?.abort(), y?.abort(), L.value = () => ({ repos: [], customGroups: [], repoGroupsMap: {}, loading: !1 }), C.value = () => ({ repos: [], lists: [], repoListNames: /* @__PURE__ */ new Map(), loading: !1 }), P.value = !1, D.value = "", g.value = "all", Q());
    }
    return Ne(() => {
      if (v.kind === "bilibili") {
        F.value = !0, ee();
        return;
      }
      g.value = "all", F.value = !0, typeof chrome < "u" && chrome.storage?.onChanged?.addListener(ge), Q();
    }), $e(() => {
      c = !1, b++, m?.abort(), y?.abort(), m = null, y = null, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(ge), p("dragEnd");
    }), (t, a) => (s(), i("section", {
      class: "resource-browser",
      "aria-label": u.kind === "bilibili" ? "B站收藏夹" : "GitHub 仓库"
    }, [
      l("header", Me, [
        l("div", null, [
          l("strong", null, n(u.kind === "bilibili" ? "B 站收藏夹" : "GitHub 仓库"), 1),
          a[7] || (a[7] = l("small", null, "点击添加或拖到上方输入框 · 不会自动发送", -1))
        ]),
        l("div", null, [
          l("button", {
            type: "button",
            disabled: f.value || G.value || M.value,
            onClick: a[0] || (a[0] = (e) => u.kind === "bilibili" ? ee() : k.value ? te() : Q())
          }, "↻ 刷新", 8, De),
          l("button", {
            type: "button",
            "aria-label": "关闭资源浏览",
            onClick: a[1] || (a[1] = (e) => p("close"))
          }, "✕")
        ])
      ]),
      l("div", Re, [
        l("nav", ze, [
          (s(!0), i(B, null, U(me.value, (e) => (s(), i("div", {
            key: e,
            class: "folder-group"
          }, [
            l("small", null, n(e), 1),
            (s(!0), i(B, null, U(H.value.filter((r) => r.group === e), (r) => (s(), i("button", {
              key: r.id,
              type: "button",
              class: se({ selected: g.value === r.id }),
              onClick: (_) => we(r.id)
            }, [
              l("span", Ge, n(u.kind === "bilibili" ? "▰" : "▸") + "  " + n(r.label), 1),
              "count" in r && r.count != null ? (s(), i("span", qe, n(r.count), 1)) : o("", !0)
            ], 10, Fe))), 128))
          ]))), 128)),
          !H.value.length && !f.value ? (s(), i("p", xe, "暂无可用分组")) : o("", !0)
        ]),
        l("div", We, [
          l("div", je, [
            l("strong", null, n(ye.value?.label || "选择分组"), 1),
            Se(l("input", {
              "onUpdate:modelValue": a[2] || (a[2] = (e) => z.value = e),
              type: "search",
              placeholder: u.kind === "bilibili" ? "搜索当前页视频" : "搜索仓库",
              "aria-label": "筛选已加载资源"
            }, null, 8, Ue), [
              [Le, z.value]
            ])
          ]),
          !F.value || f.value && !R.value.length || u.kind === "github" && (k.value ? M.value : G.value) && !I.value.length ? (s(), i("p", Ve, "正在读取…")) : o("", !0),
          S.value ? (s(), i("p", Te, [
            X(n(S.value) + " ", 1),
            l("button", {
              type: "button",
              onClick: ee
            }, "重试")
          ])) : o("", !0),
          V.value ? (s(), i("p", Oe, n(V.value), 1)) : o("", !0),
          u.kind === "github" && !k.value && q.value ? (s(), i("p", Pe, [
            X(n(q.value) + " ", 1),
            l("button", {
              type: "button",
              onClick: Q
            }, "重试")
          ])) : o("", !0),
          u.kind === "github" && !k.value && T.value ? (s(), i("p", He, n(T.value), 1)) : o("", !0),
          u.kind === "github" && k.value && D.value ? (s(), i("p", Ie, [
            X(n(D.value) + " ", 1),
            l("button", {
              type: "button",
              onClick: te
            }, "重试")
          ])) : o("", !0),
          u.kind === "github" && k.value && O.value ? (s(), i("p", Ke, n(O.value), 1)) : o("", !0),
          F.value && u.kind === "bilibili" ? (s(), i(B, { key: 7 }, [
            !f.value && !S.value && !ue.value.length ? (s(), i("p", Ze, n(z.value ? "当前页没有匹配视频。" : "该收藏夹暂无视频。"), 1)) : o("", !0),
            l("div", Je, [
              (s(!0), i(B, null, U(ue.value, (e) => (s(), i("article", {
                key: `${e.bvid}-${e.id}`,
                class: "video-card",
                draggable: !u.disabled && !!K(e),
                onDragstart: (r) => de(r, K(e)),
                onDragend: a[3] || (a[3] = (r) => p("dragEnd"))
              }, [
                l("button", {
                  type: "button",
                  class: "cover",
                  disabled: u.disabled || !K(e),
                  "aria-label": `${N("bilibili", e.bvid) ? "移除" : "添加"} ${e.title}`,
                  "aria-pressed": N("bilibili", e.bvid),
                  onClick: (r) => oe(K(e))
                }, [
                  e.cover ? (s(), i("img", {
                    key: 0,
                    src: _e(e.cover),
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Ye)) : (s(), i("span", et, "▶")),
                  l("span", {
                    class: se(["cover-action", { selected: N("bilibili", e.bvid) }])
                  }, n(N("bilibili", e.bvid) ? "✓ 已添加" : "＋ 添加"), 3),
                  ce(e.duration) ? (s(), i("span", tt, n(ce(e.duration)), 1)) : o("", !0)
                ], 8, Xe),
                l("strong", null, n(e.title), 1),
                l("small", null, n(e.upper?.name || "UP 主未知") + " · ▶ " + n(ke(e.cnt_info?.play)), 1)
              ], 40, Qe))), 128))
            ]),
            w.value > 1 || W.value ? (s(), i("div", at, [
              l("button", {
                type: "button",
                disabled: f.value || w.value <= 1,
                onClick: a[4] || (a[4] = (e) => J(g.value, w.value - 1))
              }, "‹ 上一页", 8, lt),
              l("span", null, n(w.value) + " / " + n(pe.value), 1),
              l("button", {
                type: "button",
                disabled: f.value || !W.value,
                onClick: a[5] || (a[5] = (e) => J(g.value, w.value + 1))
              }, "下一页 ›", 8, st)
            ])) : o("", !0)
          ], 64)) : F.value && u.kind === "github" ? (s(), i(B, { key: 8 }, [
            k.value && P.value && !M.value && !D.value && !I.value.length ? (s(), i("p", it, n(C.value().repos.length ? "该分组暂无匹配仓库。" : "暂无 Star 收藏。"), 1)) : !k.value && !G.value && !q.value && !I.value.length ? (s(), i("p", nt, "该分组暂无匹配仓库。")) : o("", !0),
            l("div", rt, [
              (s(!0), i(B, null, U(I.value, (e) => (s(), i("button", {
                key: e.id,
                type: "button",
                class: se(["repo-card", { "is-selected": N("github", e.fullName) }]),
                disabled: u.disabled || !Z(e),
                "aria-pressed": N("github", e.fullName),
                "aria-label": `${N("github", e.fullName) ? "移除" : "添加"} ${e.fullName}`,
                draggable: !u.disabled && !!Z(e),
                onClick: (r) => oe(Z(e)),
                onDragstart: (r) => de(r, Z(e)),
                onDragend: a[6] || (a[6] = (r) => p("dragEnd"))
              }, [
                l("div", ot, [
                  e.avatar ? (s(), i("img", {
                    key: 0,
                    class: "repo-avatar",
                    src: e.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, dt)) : (s(), i("span", ct, n(e.fullName.charAt(0).toUpperCase()), 1)),
                  l("strong", null, [
                    l("span", null, n(e.fullName.split("/")[0]) + "/", 1),
                    X(n(e.fullName.split("/").slice(1).join("/")), 1)
                  ]),
                  l("span", vt, n(N("github", e.fullName) ? "✓" : "＋"), 1)
                ]),
                l("div", gt, [
                  (s(!0), i(B, null, U(e.groups.slice(0, 2), (r) => (s(), i("span", {
                    key: r,
                    class: "repo-group"
                  }, "▣ " + n(r), 1))), 128)),
                  e.groups.length ? o("", !0) : (s(), i("span", bt, n(e.badge), 1)),
                  e.groups.length > 2 ? (s(), i("span", ft, "+" + n(e.groups.length - 2), 1)) : o("", !0)
                ]),
                l("p", null, n(e.description || "暂无描述"), 1),
                l("div", ht, [
                  l("span", null, "★ " + n(e.stargazersCount), 1),
                  e.language ? (s(), i("span", pt, n(e.language), 1)) : o("", !0),
                  ve(e.updatedAt) ? (s(), i("span", mt, "更新 " + n(ve(e.updatedAt)), 1)) : o("", !0)
                ])
              ], 42, ut))), 128))
            ])
          ], 64)) : o("", !0)
        ])
      ]),
      a[8] || (a[8] = l("footer", null, "添加后仅放入草稿；视频字幕或仓库 README 需手动读取并确认附带。", -1))
    ], 8, Ee));
  }
}), wt = /* @__PURE__ */ Ae(yt, [["__scopeId", "data-v-45aa4f8c"]]);
export {
  wt as default
};
