import { d as J, B as O, x as P, w as Z, o as a, e as i, i as l, m as R, t as d, f as p, h as _, l as q, n as K, F as w, g as y, b as h, s as I } from "./vendor-vue-9b0eS4bW.js";
import { t as T, v as X } from "./search.service-B3RWjSnd.js";
import { u as Y, g as j } from "./bili-video-links-DXpyplJq.js";
import { d as Q } from "./view-styles-KV13C9x1.js";
import { u as ee, g as te } from "./web-site-links-BSIympLj.js";
import { _ as se } from "./_plugin-vue_export-helper-BxikU0LD.js";
function C(r) {
  return typeof r == "string" && r.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(r) && !r.split("/").some((o) => o === "." || o === "..");
}
const ne = "todoist_repository_links_v1:", V = (r) => ne + r;
function B(r) {
  if (!r) return [];
  const o = JSON.parse(localStorage.getItem(V(r)) || "[]");
  if (!Array.isArray(o)) throw new Error("关联记录格式无效");
  return o.filter((n) => n && C(n.fullName)).map((n) => ({
    fullName: n.fullName,
    description: typeof n.description == "string" ? n.description : "",
    stars: typeof n.stars == "number" && Number.isFinite(n.stars) ? n.stars : void 0,
    language: typeof n.language == "string" ? n.language : void 0,
    updated: typeof n.updated == "string" ? n.updated : void 0
  }));
}
function U(r, o) {
  if (!r || o.some((n) => !C(n.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(V(r), JSON.stringify(o)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: r }));
}
function ze(r, o) {
  const n = B(r);
  n.some((c) => c.fullName.toLowerCase() === o.fullName.toLowerCase()) || U(r, [...n, o]);
}
function oe(r, o) {
  if (r)
    try {
      const n = B(r);
      if (n && n.length > 0) return n;
    } catch {
    }
  if (o) {
    const n = o.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if (n) {
      const c = `${n[1]}/${n[2].replace(/\.git$/, "")}`;
      if (C(c))
        return [{ fullName: c, description: "" }];
    }
  }
  return [];
}
const ae = {
  class: "task-associations",
  "aria-label": "关联资源"
}, ie = { class: "associations-head" }, le = {
  key: 1,
  class: "repo-candidates"
}, re = ["onClick"], ue = {
  key: 2,
  class: "association-error",
  role: "alert"
}, ce = {
  key: 3,
  class: "bili-cards-grid"
}, de = ["title", "onClick"], pe = { class: "bili-assoc-thumb-wrap" }, fe = ["src"], ve = {
  key: 1,
  class: "bili-assoc-no-thumb"
}, be = { class: "bili-assoc-meta" }, he = { class: "bili-assoc-header" }, ke = ["title"], me = ["onClick"], ge = { class: "bili-assoc-sub" }, _e = {
  key: 0,
  class: "bili-assoc-author"
}, we = { class: "bili-assoc-bvid" }, ye = {
  key: 4,
  class: "repo-cards"
}, Ce = ["href", "onClick"], Le = ["aria-label", "onClick"], Ne = { key: 0 }, Ee = { key: 1 }, Se = { key: 2 }, $e = {
  key: 5,
  class: "web-cards-grid"
}, Re = ["title", "onClick"], Ie = { class: "web-assoc-tile" }, Te = ["src"], Ve = {
  key: 1,
  class: "web-assoc-fallback"
}, Be = ["title"], Ue = ["onClick"], He = /* @__PURE__ */ J({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {},
    description: {},
    title: {}
  },
  setup(r) {
    const o = r, n = h([]), c = h([]), m = h([]), k = h(""), f = h(""), b = h(!1), g = h(!1), H = I(() => n.value.length > 0 || c.value.length > 0 || m.value.length > 0);
    function L() {
      try {
        n.value = oe(o.taskId, o.description), c.value = j(o.taskId, o.description, o.title), m.value = te(o.taskId, o.description, o.title), g.value = !0;
      } catch {
        f.value = "关联记录读取失败，未覆盖已有数据。", g.value = !1;
      }
    }
    function x(t) {
      t && window.open(t, "_blank", "noopener,noreferrer");
    }
    function A(t) {
      ee(o.taskId, t), L();
    }
    function N(t) {
      if (t.icon) return t.icon;
      const s = globalThis.chrome;
      return s?.runtime?.id && t.url ? `chrome-extension://${s.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(t.url)}&size=32` : "";
    }
    function W(t) {
      const s = t.target;
      s && (s.style.display = "none");
    }
    function D(t) {
      try {
        return new URL(t).hostname.replace(/^www\./, "");
      } catch {
        return t;
      }
    }
    function v(t) {
      (t instanceof StorageEvent || t.detail === o.taskId) && L();
    }
    O(() => {
      window.addEventListener("storage", v), window.addEventListener("todoist-repository-links-changed", v), window.addEventListener("todoist-bili-links-changed", v), window.addEventListener("todoist-web-links-changed", v);
    }), P(() => {
      window.removeEventListener("storage", v), window.removeEventListener("todoist-repository-links-changed", v), window.removeEventListener("todoist-bili-links-changed", v), window.removeEventListener("todoist-web-links-changed", v);
    }), Z(
      () => [o.taskId, o.description, o.title],
      () => {
        n.value = [], c.value = [], k.value = "", b.value = !1, f.value = "", g.value = !1, L();
      },
      { immediate: !0 }
    );
    const E = I(
      () => T.repos.filter(
        (t) => t.full_name.toLowerCase().includes(k.value.toLowerCase()) && !n.value.some((s) => s.fullName === t.full_name)
      ).slice(0, 6)
    );
    function S(t) {
      if (!(!o.taskId || !g.value))
        try {
          U(o.taskId, t), n.value = t, f.value = "";
        } catch {
          f.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function $(t) {
      let s = t.trim();
      if (s.startsWith("https://"))
        try {
          const u = new URL(s);
          if (u.hostname !== "github.com" || u.username || u.password) throw new Error();
          s = u.pathname.replace(/^\/|\/$/g, "");
        } catch {
          f.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!C(s)) {
        f.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (n.value.some((u) => u.fullName.toLowerCase() === s.toLowerCase())) {
        f.value = "该仓库已关联。";
        return;
      }
      const e = T.repos.find((u) => u.full_name.toLowerCase() === s.toLowerCase());
      S([
        ...n.value,
        {
          fullName: s,
          description: e?.description || "",
          stars: e?.stargazers_count,
          language: e?.language || void 0,
          updated: e?.updated_at
        }
      ]), f.value || (k.value = "", b.value = !1);
    }
    function F(t) {
      S(n.value.filter((s) => s.fullName !== t));
    }
    function G(t) {
      Y(o.taskId, t), c.value = c.value.filter((s) => s.bvid !== t);
    }
    function z(t) {
      Q.openVideo({
        bvid: t.bvid,
        aid: t.aid ? String(t.aid) : void 0,
        title: t.title,
        author: t.author,
        cover: t.cover,
        url: t.url
      });
    }
    function M(t, s) {
      s.preventDefault(), X.open(t);
    }
    return (t, s) => (a(), i("section", ae, [
      l("header", ie, [
        s[4] || (s[4] = l("span", { class: "associations-title" }, [
          R("关联 "),
          l("small", null, "仅本插件")
        ], -1)),
        H.value ? p("", !0) : (a(), i("button", {
          key: 0,
          type: "button",
          class: "btn-add-link",
          onClick: s[0] || (s[0] = (e) => b.value = !b.value)
        }, d(b.value ? "取消" : "＋ 关联 GitHub"), 1))
      ]),
      b.value ? (a(), i("form", {
        key: 0,
        class: "association-form",
        onSubmit: s[2] || (s[2] = _((e) => $(k.value), ["prevent"]))
      }, [
        q(l("input", {
          "onUpdate:modelValue": s[1] || (s[1] = (e) => k.value = e),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [K, k.value]
        ]),
        s[5] || (s[5] = l("button", { type: "submit" }, "添加", -1))
      ], 32)) : p("", !0),
      b.value && E.value.length ? (a(), i("div", le, [
        (a(!0), i(w, null, y(E.value, (e) => (a(), i("button", {
          key: e.full_name,
          type: "button",
          onClick: (u) => $(e.full_name)
        }, d(e.full_name), 9, re))), 128))
      ])) : p("", !0),
      f.value ? (a(), i("p", ue, d(f.value), 1)) : p("", !0),
      c.value.length ? (a(), i("div", ce, [
        (a(!0), i(w, null, y(c.value, (e) => (a(), i("article", {
          key: e.bvid,
          class: "bili-assoc-card",
          title: "点击播放视频: " + e.title,
          onClick: (u) => z(e)
        }, [
          l("div", pe, [
            e.cover ? (a(), i("img", {
              key: 0,
              src: e.cover.replace(/^http:/, "https:"),
              alt: "",
              class: "bili-assoc-thumb",
              referrerpolicy: "no-referrer"
            }, null, 8, fe)) : (a(), i("span", ve, "📺")),
            s[6] || (s[6] = l("span", { class: "bili-assoc-play-btn" }, "▶", -1))
          ]),
          l("div", be, [
            l("header", he, [
              l("span", {
                class: "bili-assoc-title",
                title: e.title
              }, d(e.title), 9, ke),
              l("button", {
                type: "button",
                class: "bili-assoc-unlink-btn",
                title: "移除该视频关联",
                onClick: _((u) => G(e.bvid), ["stop"])
              }, " × ", 8, me)
            ]),
            l("div", ge, [
              e.author ? (a(), i("span", _e, "👤 " + d(e.author), 1)) : p("", !0),
              l("span", we, d(e.bvid), 1)
            ])
          ])
        ], 8, de))), 128))
      ])) : p("", !0),
      n.value.length ? (a(), i("div", ye, [
        (a(!0), i(w, null, y(n.value, (e) => (a(), i("article", {
          key: e.fullName,
          class: "repo-card"
        }, [
          l("header", null, [
            l("a", {
              href: "https://github.com/" + e.fullName,
              target: "_blank",
              rel: "noreferrer",
              onClick: _((u) => M(e.fullName, u), ["stop"])
            }, [
              s[7] || (s[7] = l("span", { class: "repo-mark" }, "🐙", -1)),
              R(" " + d(e.fullName), 1)
            ], 8, Ce),
            l("button", {
              type: "button",
              "aria-label": "移除关联 " + e.fullName,
              onClick: (u) => F(e.fullName)
            }, " × ", 8, Le)
          ]),
          l("p", null, d(e.description || "GitHub 仓库"), 1),
          l("footer", null, [
            e.stars !== void 0 ? (a(), i("span", Ne, "☆ " + d(e.stars.toLocaleString()), 1)) : p("", !0),
            e.language ? (a(), i("span", Ee, d(e.language), 1)) : p("", !0),
            e.updated ? (a(), i("span", Se, d(e.updated.slice(0, 10)), 1)) : p("", !0)
          ])
        ]))), 128))
      ])) : p("", !0),
      m.value.length ? (a(), i("div", $e, [
        (a(!0), i(w, null, y(m.value, (e) => (a(), i("article", {
          key: e.url,
          class: "web-assoc-card",
          title: "在新标签页打开: " + (e.title || e.url),
          onClick: (u) => x(e.url)
        }, [
          l("div", Ie, [
            N(e) ? (a(), i("img", {
              key: 0,
              src: N(e),
              alt: "",
              class: "web-assoc-icon",
              onError: s[3] || (s[3] = (u) => W(u))
            }, null, 40, Te)) : (a(), i("span", Ve, "🌐"))
          ]),
          l("span", {
            class: "web-assoc-label",
            title: e.title || e.url
          }, d(e.title || D(e.url)), 9, Be),
          l("button", {
            type: "button",
            class: "web-assoc-unlink-btn",
            title: "移除关联",
            onClick: _((u) => A(e.url), ["stop"])
          }, " × ", 8, Ue)
        ], 8, Re))), 128))
      ])) : p("", !0)
    ]));
  }
}), Me = /* @__PURE__ */ se(He, [["__scopeId", "data-v-b91e733b"]]);
export {
  Me as T,
  ze as a,
  oe as g,
  B as r
};
