import { t as E } from "./module-state-CYd8scC_.js";
import { w as H, z as x, d as P, D as Z, o as i, g as l, h as r, p as W, t as v, i as h, k as w, n as j, q as X, F as C, j as L, b, y as U } from "./vendor-vue-D8gPZiit.js";
import { t as B, v as Y } from "./search.service-D10_MsFd.js";
import { u as Q, g as ee } from "./bili-video-links-DXpyplJq.js";
import { d as te } from "./view-styles-DcUMnmyr.js";
import { u as se, g as oe } from "./web-site-links-BSIympLj.js";
import { _ as ne } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
function Ke(a, n, t) {
  let u = !1, d;
  const f = H(
    () => [E.dataRevision, a(), E.pendingWrites],
    ([p, k, g], y) => {
      y && p !== y[0] && (u = !0, n()), d && clearTimeout(d), !(!u || !k || g) && (d = setTimeout(() => {
        d = void 0, !(!a() || E.pendingWrites) && (u = !1, t());
      }, 150));
    }
  );
  x(() => {
    f(), d && clearTimeout(d);
  });
}
function _(a) {
  return typeof a == "string" && a.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(a) && !a.split("/").some((n) => n === "." || n === "..");
}
const S = "todoist_repository_links_v1:", A = (a) => S + a;
function qe(a) {
  if (!_(a)) throw new Error("仓库名称无效");
  const n = [];
  for (let d = 0; d < localStorage.length; d++) {
    const f = localStorage.key(d);
    f?.startsWith(S) && n.push(f);
  }
  const t = [];
  let u = 0;
  for (const d of n) {
    const f = d.slice(S.length);
    if (f)
      try {
        R(f).some((p) => p.fullName.toLowerCase() === a.toLowerCase()) && t.push(f);
      } catch {
        u++;
      }
  }
  return { taskIds: t, unreadableCount: u };
}
function R(a) {
  if (!a) return [];
  const n = JSON.parse(localStorage.getItem(A(a)) || "[]");
  if (!Array.isArray(n)) throw new Error("关联记录格式无效");
  return n.filter((t) => t && _(t.fullName)).map((t) => ({
    fullName: t.fullName,
    description: typeof t.description == "string" ? t.description : "",
    stars: typeof t.stars == "number" && Number.isFinite(t.stars) ? t.stars : void 0,
    language: typeof t.language == "string" ? t.language : void 0,
    updated: typeof t.updated == "string" ? t.updated : void 0
  }));
}
function D(a, n) {
  if (!a || n.some((t) => !_(t.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(A(a), JSON.stringify(n)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: a }));
}
function Je(a, n) {
  const t = R(a);
  t.some((u) => u.fullName.toLowerCase() === n.fullName.toLowerCase()) || D(a, [...t, n]);
}
function ae(a, n) {
  if (a)
    try {
      const t = R(a);
      if (t && t.length > 0) return t;
    } catch {
    }
  if (n) {
    const t = n.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if (t) {
      const u = `${t[1]}/${t[2].replace(/\.git$/, "")}`;
      if (_(u))
        return [{ fullName: u, description: "" }];
    }
  }
  return [];
}
const ie = {
  class: "task-associations",
  "aria-label": "关联资源"
}, le = { class: "associations-head" }, re = {
  key: 1,
  class: "repo-candidates"
}, ue = ["onClick"], ce = {
  key: 2,
  class: "association-error",
  role: "alert"
}, de = {
  key: 3,
  class: "bili-cards-grid"
}, fe = ["title", "onClick"], pe = { class: "bili-assoc-thumb-wrap" }, ve = ["src"], he = {
  key: 1,
  class: "bili-assoc-no-thumb"
}, ke = { class: "bili-assoc-meta" }, me = { class: "bili-assoc-header" }, be = ["title"], ge = ["onClick"], _e = { class: "bili-assoc-sub" }, ye = {
  key: 0,
  class: "bili-assoc-author"
}, we = { class: "bili-assoc-bvid" }, Ce = {
  key: 4,
  class: "repo-cards"
}, Le = ["href", "onClick"], Ne = ["aria-label", "onClick"], Ee = { key: 0 }, Se = { key: 1 }, Re = { key: 2 }, Ie = {
  key: 5,
  class: "web-cards-grid"
}, $e = ["title", "onClick"], Te = { class: "web-assoc-tile" }, Ve = ["src"], We = {
  key: 1,
  class: "web-assoc-fallback"
}, Ue = ["title"], Be = ["onClick"], He = /* @__PURE__ */ P({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {},
    description: {},
    title: {}
  },
  setup(a) {
    const n = a, t = b([]), u = b([]), d = b([]), f = b(""), p = b(""), k = b(!1), g = b(!1), y = U(() => t.value.length > 0 || u.value.length > 0 || d.value.length > 0);
    function N() {
      try {
        t.value = ae(n.taskId, n.description), u.value = ee(n.taskId, n.description, n.title), d.value = oe(n.taskId, n.description, n.title), g.value = !0;
      } catch {
        p.value = "关联记录读取失败，未覆盖已有数据。", g.value = !1;
      }
    }
    function z(s) {
      s && window.open(s, "_blank", "noopener,noreferrer");
    }
    function F(s) {
      se(n.taskId, s), N();
    }
    function I(s) {
      if (s.icon) return s.icon;
      const o = globalThis.chrome;
      return o?.runtime?.id && s.url ? `chrome-extension://${o.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(s.url)}&size=32` : "";
    }
    function G(s) {
      const o = s.target;
      o && (o.style.display = "none");
    }
    function M(s) {
      try {
        return new URL(s).hostname.replace(/^www\./, "");
      } catch {
        return s;
      }
    }
    function m(s) {
      (s instanceof StorageEvent || s.detail === n.taskId) && N();
    }
    Z(() => {
      window.addEventListener("storage", m), window.addEventListener("todoist-repository-links-changed", m), window.addEventListener("todoist-bili-links-changed", m), window.addEventListener("todoist-web-links-changed", m);
    }), x(() => {
      window.removeEventListener("storage", m), window.removeEventListener("todoist-repository-links-changed", m), window.removeEventListener("todoist-bili-links-changed", m), window.removeEventListener("todoist-web-links-changed", m);
    }), H(
      () => [n.taskId, n.description, n.title],
      () => {
        t.value = [], u.value = [], f.value = "", k.value = !1, p.value = "", g.value = !1, N();
      },
      { immediate: !0 }
    );
    const $ = U(
      () => B.repos.filter(
        (s) => s.full_name.toLowerCase().includes(f.value.toLowerCase()) && !t.value.some((o) => o.fullName === s.full_name)
      ).slice(0, 6)
    );
    function T(s) {
      if (!(!n.taskId || !g.value))
        try {
          D(n.taskId, s), t.value = s, p.value = "";
        } catch {
          p.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function V(s) {
      let o = s.trim();
      if (o.startsWith("https://"))
        try {
          const c = new URL(o);
          if (c.hostname !== "github.com" || c.username || c.password) throw new Error();
          o = c.pathname.replace(/^\/|\/$/g, "");
        } catch {
          p.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!_(o)) {
        p.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (t.value.some((c) => c.fullName.toLowerCase() === o.toLowerCase())) {
        p.value = "该仓库已关联。";
        return;
      }
      const e = B.repos.find((c) => c.full_name.toLowerCase() === o.toLowerCase());
      T([
        ...t.value,
        {
          fullName: o,
          description: e?.description || "",
          stars: e?.stargazers_count,
          language: e?.language || void 0,
          updated: e?.updated_at
        }
      ]), p.value || (f.value = "", k.value = !1);
    }
    function K(s) {
      T(t.value.filter((o) => o.fullName !== s));
    }
    function q(s) {
      Q(n.taskId, s), u.value = u.value.filter((o) => o.bvid !== s);
    }
    function J(s) {
      te.openVideo({
        bvid: s.bvid,
        aid: s.aid ? String(s.aid) : void 0,
        title: s.title,
        author: s.author,
        cover: s.cover,
        url: s.url
      });
    }
    function O(s, o) {
      o.preventDefault(), Y.open(s);
    }
    return (s, o) => (i(), l("section", ie, [
      r("header", le, [
        o[4] || (o[4] = r("span", { class: "associations-title" }, [
          W("关联 "),
          r("small", null, "仅本插件")
        ], -1)),
        y.value ? h("", !0) : (i(), l("button", {
          key: 0,
          type: "button",
          class: "btn-add-link",
          onClick: o[0] || (o[0] = (e) => k.value = !k.value)
        }, v(k.value ? "取消" : "＋ 关联 GitHub"), 1))
      ]),
      k.value ? (i(), l("form", {
        key: 0,
        class: "association-form",
        onSubmit: o[2] || (o[2] = w((e) => V(f.value), ["prevent"]))
      }, [
        j(r("input", {
          "onUpdate:modelValue": o[1] || (o[1] = (e) => f.value = e),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [X, f.value]
        ]),
        o[5] || (o[5] = r("button", { type: "submit" }, "添加", -1))
      ], 32)) : h("", !0),
      k.value && $.value.length ? (i(), l("div", re, [
        (i(!0), l(C, null, L($.value, (e) => (i(), l("button", {
          key: e.full_name,
          type: "button",
          onClick: (c) => V(e.full_name)
        }, v(e.full_name), 9, ue))), 128))
      ])) : h("", !0),
      p.value ? (i(), l("p", ce, v(p.value), 1)) : h("", !0),
      u.value.length ? (i(), l("div", de, [
        (i(!0), l(C, null, L(u.value, (e) => (i(), l("article", {
          key: e.bvid,
          class: "bili-assoc-card",
          title: "点击播放视频: " + e.title,
          onClick: (c) => J(e)
        }, [
          r("div", pe, [
            e.cover ? (i(), l("img", {
              key: 0,
              src: e.cover.replace(/^http:/, "https:"),
              alt: "",
              class: "bili-assoc-thumb",
              referrerpolicy: "no-referrer"
            }, null, 8, ve)) : (i(), l("span", he, "📺")),
            o[6] || (o[6] = r("span", { class: "bili-assoc-play-btn" }, "▶", -1))
          ]),
          r("div", ke, [
            r("header", me, [
              r("span", {
                class: "bili-assoc-title",
                title: e.title
              }, v(e.title), 9, be),
              r("button", {
                type: "button",
                class: "bili-assoc-unlink-btn",
                title: "移除该视频关联",
                onClick: w((c) => q(e.bvid), ["stop"])
              }, " × ", 8, ge)
            ]),
            r("div", _e, [
              e.author ? (i(), l("span", ye, "👤 " + v(e.author), 1)) : h("", !0),
              r("span", we, v(e.bvid), 1)
            ])
          ])
        ], 8, fe))), 128))
      ])) : h("", !0),
      t.value.length ? (i(), l("div", Ce, [
        (i(!0), l(C, null, L(t.value, (e) => (i(), l("article", {
          key: e.fullName,
          class: "repo-card"
        }, [
          r("header", null, [
            r("a", {
              href: "https://github.com/" + e.fullName,
              target: "_blank",
              rel: "noreferrer",
              onClick: w((c) => O(e.fullName, c), ["stop"])
            }, [
              o[7] || (o[7] = r("span", { class: "repo-mark" }, "🐙", -1)),
              W(" " + v(e.fullName), 1)
            ], 8, Le),
            r("button", {
              type: "button",
              "aria-label": "移除关联 " + e.fullName,
              onClick: (c) => K(e.fullName)
            }, " × ", 8, Ne)
          ]),
          r("p", null, v(e.description || "GitHub 仓库"), 1),
          r("footer", null, [
            e.stars !== void 0 ? (i(), l("span", Ee, "☆ " + v(e.stars.toLocaleString()), 1)) : h("", !0),
            e.language ? (i(), l("span", Se, v(e.language), 1)) : h("", !0),
            e.updated ? (i(), l("span", Re, v(e.updated.slice(0, 10)), 1)) : h("", !0)
          ])
        ]))), 128))
      ])) : h("", !0),
      d.value.length ? (i(), l("div", Ie, [
        (i(!0), l(C, null, L(d.value, (e) => (i(), l("article", {
          key: e.url,
          class: "web-assoc-card",
          title: "在新标签页打开: " + (e.title || e.url),
          onClick: (c) => z(e.url)
        }, [
          r("div", Te, [
            I(e) ? (i(), l("img", {
              key: 0,
              src: I(e),
              alt: "",
              class: "web-assoc-icon",
              onError: o[3] || (o[3] = (c) => G(c))
            }, null, 40, Ve)) : (i(), l("span", We, "🌐"))
          ]),
          r("span", {
            class: "web-assoc-label",
            title: e.title || e.url
          }, v(e.title || M(e.url)), 9, Ue),
          r("button", {
            type: "button",
            class: "web-assoc-unlink-btn",
            title: "移除关联",
            onClick: w((c) => F(e.url), ["stop"])
          }, " × ", 8, Be)
        ], 8, $e))), 128))
      ])) : h("", !0)
    ]));
  }
}), Oe = /* @__PURE__ */ ne(He, [["__scopeId", "data-v-b91e733b"]]);
export {
  Oe as T,
  Je as a,
  qe as f,
  ae as g,
  R as r,
  Ke as u
};
