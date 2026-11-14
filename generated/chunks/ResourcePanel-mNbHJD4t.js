import { B as Y, r as ee } from "./board-filters-CoIYPE2A.js";
import { L as te } from "./MulticaDialog-B8YIPz1e.js";
import { d as ae, B as le, K as ie, o as i, e as s, i as l, A as se, t as n, m as L, f as r, p as I, F as R, g as U, b as c, M as K, s as G } from "./vendor-vue-BkY5-p5y.js";
import { _ as ne } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const oe = ["aria-label"], ue = { class: "toolbar" }, re = { class: "toolbar-actions" }, de = ["disabled"], ce = ["disabled"], ve = { class: "panel-content" }, be = {
  key: 0,
  class: "hint"
}, fe = {
  key: 1,
  class: "error",
  role: "alert"
}, ge = {
  key: 2,
  class: "hint"
}, pe = {
  key: 3,
  class: "error",
  role: "alert"
}, he = {
  key: 4,
  class: "hint"
}, me = {
  key: 0,
  class: "hint"
}, ye = { class: "cover" }, ke = ["src"], _e = {
  key: 1,
  class: "cover-placeholder"
}, we = {
  key: 2,
  class: "duration"
}, Ce = { class: "video-info" }, Se = { class: "video-meta" }, Ne = ["disabled", "onClick"], Be = {
  key: 1,
  class: "hint"
}, $e = {
  key: 0,
  class: "hint"
}, ze = {
  key: 1,
  class: "hint"
}, Fe = {
  key: 2,
  class: "hint"
}, Le = { class: "repo-top" }, Re = { class: "repo-name" }, Ge = { class: "visibility" }, Ve = { class: "repo-meta" }, Ee = { key: 0 }, Me = ["disabled", "onClick"], Pe = /* @__PURE__ */ ae({
  __name: "ResourcePanel",
  props: {
    kind: {},
    selectedResources: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "select"],
  setup(o, { emit: W }) {
    const $ = o, V = W;
    function O(e, a) {
      return $.selectedResources.some((t) => t.kind === e && t.id.toLowerCase() === a.toLowerCase());
    }
    function Z(e) {
      /^BV[0-9A-Za-z]{10}$/.test(e.bvid || "") && V("select", { kind: "bilibili", id: e.bvid, title: e.title, url: `https://www.bilibili.com/video/${e.bvid}`, author: e.upper?.name, duration: e.duration });
    }
    function T(e) {
      /^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(e.fullName) && V("select", { kind: "github", id: e.fullName, title: e.fullName, url: `https://github.com/${e.fullName}`, description: e.description || "", language: e.language, visibility: e.visibility });
    }
    const m = c(!1), f = c(!1), g = c(""), S = c(""), _ = c(!1), w = c(""), z = c("");
    let p = null;
    const d = c(""), N = c([]), y = c([]), F = c(0), B = K(() => ({ repos: [], customGroups: [], repoGroupsMap: {}, loading: !1 })), C = K(() => ({ repos: [], lists: [], repoListNames: /* @__PURE__ */ new Map(), loading: !1 }));
    let v = 0, u = !0;
    function j(e) {
      return e.isSeason ? `season:${e.id}` : String(e.id || e.fid);
    }
    const E = G(() => $.kind === "bilibili" ? N.value.map((e) => ({ id: j(e), label: e.title, group: e.isOther ? "其他收藏" : e.isCollected ? "收藏的合集 / 收藏夹" : "我创建的收藏夹" })) : [{ id: "all", label: "我的全部仓库" }, { id: "ungrouped", label: "未分类", group: "我的仓库" }, ...B.value().customGroups.map((e) => ({ id: `group:${e}`, label: e, group: "我的仓库分组" })), { id: "star-all", label: "全部 Star 收藏" }, ...C.value().lists.map((e) => ({ id: `star-group:${e.name}`, label: e.name, group: "Star 收藏分组" }))]), J = G(() => E.value.find((e) => e.id === d.value)), k = G(() => d.value === "star-all" || d.value.startsWith("star-group:")), q = G(() => {
      if (!k.value) return ee(B.value().repos, B.value().repoGroupsMap, d.value).map((t) => ({ id: t.id, fullName: t.fullName, description: t.description, language: t.language, stargazersCount: t.stargazersCount, badge: t.isPrivate ? "私有" : "公开", visibility: t.isPrivate ? "private" : "public" }));
      const e = C.value(), a = d.value.slice(11);
      return e.repos.filter((t) => d.value === "star-all" || (e.repoListNames.get(t.full_name.toLowerCase()) || []).includes(a)).map((t) => ({ id: t.id, fullName: t.full_name, description: t.description, language: t.language, stargazersCount: t.stargazers_count, badge: "Star", visibility: t.private === !0 ? "private" : t.private === !1 ? "public" : "unknown" }));
    });
    function A(e) {
      if (!Number.isFinite(e) || e <= 0) return "";
      const a = Math.floor(e);
      return `${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}`;
    }
    function Q(e) {
      return Number.isFinite(e) ? Number(e) >= 1e4 ? `${(Number(e) / 1e4).toFixed(1)}万` : String(e) : "播放量未知";
    }
    async function D(e) {
      const a = ++v;
      d.value = e, y.value = [], F.value = 0, f.value = !0, g.value = "";
      try {
        const { bilibiliService: t } = await import("./view-styles-yuz8wQEV.js").then((h) => h.aS), b = await t.getFolderVideos(e, 1, 30);
        u && a === v && (y.value = b.medias, F.value = b.total);
      } catch (t) {
        u && a === v && (g.value = t instanceof Error ? t.message : "视频读取失败");
      } finally {
        u && a === v && (f.value = !1);
      }
    }
    async function M() {
      const e = ++v;
      f.value = !0, g.value = "", S.value = "", y.value = [], N.value = [], d.value = "";
      try {
        const { bilibiliService: a } = await import("./view-styles-yuz8wQEV.js").then((x) => x.aS), t = await a.getUserNav();
        if (!u || e !== v) return;
        if (!t.isLogin || !t.mid) throw new Error("未登录 B 站，请先在 B 站插件中登录。");
        const [b, h] = await Promise.allSettled([a.getCreatedFolders(t.mid), a.getCollectedFolders(1, 50, t.mid)]);
        if (!u || e !== v) return;
        if (b.status === "rejected" && h.status === "rejected") throw new Error("收藏夹读取失败，请检查网络后重试。");
        b.status === "rejected" || h.status === "rejected" ? S.value = "部分收藏夹读取失败，当前显示可用内容。" : h.value.count > h.value.list.length && (S.value = "收藏的合集和收藏夹仅显示前 50 个。"), N.value = [...b.status === "fulfilled" ? b.value : [], ...h.status === "fulfilled" ? h.value.list : [], ...a.getOtherFolders()];
        const H = N.value.find((x) => !x.isOther) || N.value[0];
        if (H) {
          await D(j(H));
          return;
        }
      } catch (a) {
        u && e === v && (g.value = a instanceof Error ? a.message : "收藏夹读取失败");
      } finally {
        u && e === v && (f.value = !1);
      }
    }
    async function P() {
      p?.abort();
      const e = new AbortController();
      p = e, _.value = !0, w.value = "", z.value = "";
      try {
        const { loadOwnRepositorySnapshot: a } = await import("./github-resources-DYW5r7xT.js"), t = await a(e.signal);
        u && p === e && (B.value = () => ({ ...t, loading: !1 }), z.value = t.warning);
      } catch (a) {
        u && p === e && !e.signal.aborted && (w.value = a instanceof Error ? a.message : "仓库读取失败");
      } finally {
        u && p === e && (p = null, _.value = !1);
      }
    }
    function X(e) {
      $.kind === "bilibili" ? D(e) : d.value = e;
    }
    return le(async () => {
      if ($.kind === "bilibili") {
        m.value = !0, M();
        return;
      }
      try {
        const { starBoardData: e } = await import("./search.service-DF5Rt2Wp.js").then((a) => a.a6);
        u && (C.value = () => e, d.value = "all", m.value = !0, P());
      } catch {
        u && (g.value = "无法读取 GitHub 仓库状态。", m.value = !0);
      }
    }), ie(() => {
      u = !1, v++, p?.abort(), p = null;
    }), (e, a) => (i(), s("aside", {
      class: "resource-panel",
      "aria-label": o.kind === "bilibili" ? "B站视频" : "GitHub 仓库"
    }, [
      l("header", null, [
        l("div", null, [
          l("strong", null, [
            l("span", {
              class: se(o.kind)
            }, n(o.kind === "bilibili" ? "▶" : "⌘"), 3),
            L(" " + n(o.kind === "bilibili" ? "B 站视频" : "GitHub 仓库"), 1)
          ]),
          l("small", null, n(o.kind === "bilibili" ? "浏览收藏夹" : "浏览个人仓库与分组"), 1)
        ]),
        l("button", {
          class: "close",
          type: "button",
          "aria-label": "关闭侧栏",
          onClick: a[0] || (a[0] = (t) => V("close"))
        }, "✕")
      ]),
      l("div", ue, [
        l("strong", null, n(J.value?.label || "选择板块"), 1),
        l("div", re, [
          o.kind === "bilibili" ? (i(), s("button", {
            key: 0,
            class: "refresh",
            type: "button",
            disabled: f.value,
            title: "刷新收藏夹",
            onClick: M
          }, "↻", 8, de)) : k.value ? r("", !0) : (i(), s("button", {
            key: 1,
            class: "refresh",
            type: "button",
            disabled: _.value,
            title: "刷新仓库",
            onClick: P
          }, "↻", 8, ce)),
          I(Y, {
            options: E.value,
            selected: d.value,
            disabled: !m.value || !E.value.length,
            onSelect: X
          }, null, 8, ["options", "selected", "disabled"])
        ])
      ]),
      l("div", ve, [
        !m.value || f.value || o.kind === "github" && (k.value ? C.value().loading : _.value) ? (i(), s("p", be, [
          I(te, { label: "正在读取板块" })
        ])) : r("", !0),
        g.value ? (i(), s("p", fe, [
          L(n(g.value) + " ", 1),
          o.kind === "bilibili" ? (i(), s("button", {
            key: 0,
            type: "button",
            onClick: M
          }, "重试")) : r("", !0)
        ])) : r("", !0),
        S.value ? (i(), s("p", ge, n(S.value), 1)) : r("", !0),
        o.kind === "github" && !k.value && w.value ? (i(), s("p", pe, [
          L(n(w.value) + " ", 1),
          l("button", {
            type: "button",
            onClick: P
          }, "重试")
        ])) : r("", !0),
        o.kind === "github" && !k.value && z.value ? (i(), s("p", he, n(z.value), 1)) : r("", !0),
        m.value && o.kind === "bilibili" ? (i(), s(R, { key: 5 }, [
          !f.value && !g.value && !y.value.length ? (i(), s("p", me, "该收藏夹暂无视频。")) : r("", !0),
          (i(!0), s(R, null, U(y.value, (t) => (i(), s("article", {
            key: `${t.bvid}-${t.id}`,
            class: "video-card"
          }, [
            l("div", ye, [
              t.cover ? (i(), s("img", {
                key: 0,
                src: t.cover.replace(/^http:/, "https:"),
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, ke)) : (i(), s("span", _e, "▶")),
              A(t.duration) ? (i(), s("span", we, n(A(t.duration)), 1)) : r("", !0)
            ]),
            l("div", Ce, [
              l("strong", null, n(t.title), 1),
              l("small", null, n(t.upper?.name || "UP 主未知"), 1),
              l("div", Se, "▶ " + n(Q(t.cnt_info?.play)), 1),
              l("button", {
                type: "button",
                class: "add-resource",
                disabled: o.disabled || !/^BV[0-9A-Za-z]{10}$/.test(t.bvid || ""),
                onClick: (b) => Z(t)
              }, n(O("bilibili", t.bvid) ? "✓ 已添加" : "＋ 添加到消息"), 9, Ne)
            ])
          ]))), 128)),
          !f.value && F.value > y.value.length ? (i(), s("p", Be, "当前显示前 " + n(y.value.length) + " 条，共 " + n(F.value) + " 条。", 1)) : r("", !0)
        ], 64)) : m.value && o.kind === "github" ? (i(), s(R, { key: 6 }, [
          k.value && !C.value().loading && !C.value().repos.length ? (i(), s("p", $e, "暂无已加载的 Star 仓库。请先打开 GitHub 插件的「Star 收藏」加载数据。")) : !k.value && !_.value && !w.value && !B.value().repos.length ? (i(), s("p", ze, "该账号暂无可显示的个人仓库。")) : !_.value && !w.value && !q.value.length ? (i(), s("p", Fe, "该分组暂无仓库。")) : r("", !0),
          (i(!0), s(R, null, U(q.value, (t) => (i(), s("article", {
            key: t.id,
            class: "repo-card"
          }, [
            l("div", Le, [
              a[1] || (a[1] = l("span", { class: "repo-icon" }, "⌘", -1)),
              l("span", Re, n(t.fullName), 1),
              l("span", Ge, n(t.badge), 1)
            ]),
            l("p", null, n(t.description || "暂无仓库介绍"), 1),
            l("div", Ve, [
              t.language ? (i(), s("span", Ee, [
                a[2] || (a[2] = l("i", null, null, -1)),
                L(n(t.language), 1)
              ])) : r("", !0),
              l("span", null, "☆ " + n(t.stargazersCount), 1)
            ]),
            l("button", {
              type: "button",
              class: "add-resource",
              disabled: o.disabled,
              onClick: (b) => T(t)
            }, n(O("github", t.fullName) ? "✓ 已添加" : "＋ 添加到消息"), 9, Me)
          ]))), 128))
        ], 64)) : r("", !0)
      ]),
      a[3] || (a[3] = l("footer", null, "添加到草稿后不会立即发送；正文需手动读取并确认附带。", -1))
    ], 8, oe));
  }
}), Ae = /* @__PURE__ */ ne(Pe, [["__scopeId", "data-v-570ca307"]]);
export {
  Ae as default
};
