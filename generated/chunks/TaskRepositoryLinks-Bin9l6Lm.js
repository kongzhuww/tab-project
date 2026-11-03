import { t as w } from "./module-state-GmAjQSzX.js";
import { w as A, z as D, d as U, D as W, o as u, g as c, h as d, p as $, t as v, i as m, k as C, n as K, q, F as L, j as N, b as g, y as V } from "./vendor-vue-FFI3kJnP.js";
import { t as B, A as J } from "./search.service-Ct9e-A4u.js";
import { u as O, g as P } from "./TodoistDatePickerPopover-FCWFwVeB.js";
import { d as Z } from "./view-styles-DuXn5DGN.js";
import { _ as j } from "./_plugin-vue_export-helper-CVWGtx1v.js";
function Se(o, s, e) {
  let n = !1, l;
  const r = A(
    () => [w.dataRevision, o(), w.pendingWrites],
    ([p, h, _], b) => {
      b && p !== b[0] && (n = !0, s()), l && clearTimeout(l), !(!n || !h || _) && (l = setTimeout(() => {
        l = void 0, !(!o() || w.pendingWrites) && (n = !1, e());
      }, 150));
    }
  );
  D(() => {
    r(), l && clearTimeout(l);
  });
}
function y(o) {
  return typeof o == "string" && o.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(o) && !o.split("/").some((s) => s === "." || s === "..");
}
const E = "todoist_repository_links_v1:", H = (o) => E + o;
function Te(o) {
  if (!y(o)) throw new Error("仓库名称无效");
  const s = [];
  for (let l = 0; l < localStorage.length; l++) {
    const r = localStorage.key(l);
    r?.startsWith(E) && s.push(r);
  }
  const e = [];
  let n = 0;
  for (const l of s) {
    const r = l.slice(E.length);
    if (r)
      try {
        R(r).some((p) => p.fullName.toLowerCase() === o.toLowerCase()) && e.push(r);
      } catch {
        n++;
      }
  }
  return { taskIds: e, unreadableCount: n };
}
function R(o) {
  if (!o) return [];
  const s = JSON.parse(localStorage.getItem(H(o)) || "[]");
  if (!Array.isArray(s)) throw new Error("关联记录格式无效");
  return s.filter((e) => e && y(e.fullName)).map((e) => ({
    fullName: e.fullName,
    description: typeof e.description == "string" ? e.description : "",
    stars: typeof e.stars == "number" && Number.isFinite(e.stars) ? e.stars : void 0,
    language: typeof e.language == "string" ? e.language : void 0,
    updated: typeof e.updated == "string" ? e.updated : void 0
  }));
}
function x(o, s) {
  if (!o || s.some((e) => !y(e.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(H(o), JSON.stringify(s)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: o }));
}
function Ie(o, s) {
  const e = R(o);
  e.some((n) => n.fullName.toLowerCase() === s.fullName.toLowerCase()) || x(o, [...e, s]);
}
function X(o, s) {
  if (o)
    try {
      const e = R(o);
      if (e && e.length > 0) return e;
    } catch {
    }
  if (s) {
    const e = s.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if (e) {
      const n = `${e[1]}/${e[2].replace(/\.git$/, "")}`;
      if (y(n))
        return [{ fullName: n, description: "" }];
    }
  }
  return [];
}
const Y = {
  class: "task-associations",
  "aria-label": "关联资源"
}, Q = { class: "associations-head" }, ee = {
  key: 1,
  class: "repo-candidates"
}, te = ["onClick"], se = {
  key: 2,
  class: "association-error",
  role: "alert"
}, ae = {
  key: 3,
  class: "bili-cards-grid"
}, oe = ["title", "onClick"], ie = { class: "bili-assoc-thumb-wrap" }, ne = ["src"], le = {
  key: 1,
  class: "bili-assoc-no-thumb"
}, re = { class: "bili-assoc-meta" }, ue = { class: "bili-assoc-header" }, ce = ["title"], de = ["onClick"], fe = { class: "bili-assoc-sub" }, pe = {
  key: 0,
  class: "bili-assoc-author"
}, ve = { class: "bili-assoc-bvid" }, me = {
  key: 4,
  class: "repo-cards"
}, he = ["href", "onClick"], ke = ["aria-label", "onClick"], ge = { key: 0 }, be = { key: 1 }, ye = { key: 2 }, _e = /* @__PURE__ */ U({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {},
    description: {},
    title: {}
  },
  setup(o) {
    const s = o, e = g([]), n = g([]), l = g(""), r = g(""), p = g(!1), h = g(!1), _ = V(() => e.value.length > 0 || n.value.length > 0);
    function b() {
      try {
        e.value = X(s.taskId, s.description), n.value = P(s.taskId, s.description, s.title), h.value = !0;
      } catch {
        r.value = "关联记录读取失败，未覆盖已有数据。", h.value = !1;
      }
    }
    function k(i) {
      (i instanceof StorageEvent || i.detail === s.taskId) && b();
    }
    W(() => {
      window.addEventListener("storage", k), window.addEventListener("todoist-repository-links-changed", k), window.addEventListener("todoist-bili-links-changed", k);
    }), D(() => {
      window.removeEventListener("storage", k), window.removeEventListener("todoist-repository-links-changed", k), window.removeEventListener("todoist-bili-links-changed", k);
    }), A(
      () => [s.taskId, s.description, s.title],
      () => {
        e.value = [], n.value = [], l.value = "", p.value = !1, r.value = "", h.value = !1, b();
      },
      { immediate: !0 }
    );
    const S = V(
      () => B.repos.filter(
        (i) => i.full_name.toLowerCase().includes(l.value.toLowerCase()) && !e.value.some((a) => a.fullName === i.full_name)
      ).slice(0, 6)
    );
    function T(i) {
      if (!(!s.taskId || !h.value))
        try {
          x(s.taskId, i), e.value = i, r.value = "";
        } catch {
          r.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function I(i) {
      let a = i.trim();
      if (a.startsWith("https://"))
        try {
          const f = new URL(a);
          if (f.hostname !== "github.com" || f.username || f.password) throw new Error();
          a = f.pathname.replace(/^\/|\/$/g, "");
        } catch {
          r.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!y(a)) {
        r.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (e.value.some((f) => f.fullName.toLowerCase() === a.toLowerCase())) {
        r.value = "该仓库已关联。";
        return;
      }
      const t = B.repos.find((f) => f.full_name.toLowerCase() === a.toLowerCase());
      T([
        ...e.value,
        {
          fullName: a,
          description: t?.description || "",
          stars: t?.stargazers_count,
          language: t?.language || void 0,
          updated: t?.updated_at
        }
      ]), r.value || (l.value = "", p.value = !1);
    }
    function G(i) {
      T(e.value.filter((a) => a.fullName !== i));
    }
    function M(i) {
      O(s.taskId, i), n.value = n.value.filter((a) => a.bvid !== i);
    }
    function z(i) {
      Z.openVideo({
        bvid: i.bvid,
        aid: i.aid ? String(i.aid) : void 0,
        title: i.title,
        author: i.author,
        cover: i.cover,
        url: i.url
      });
    }
    function F(i, a) {
      a.preventDefault(), J.open(i);
    }
    return (i, a) => (u(), c("section", Y, [
      d("header", Q, [
        a[3] || (a[3] = d("span", { class: "associations-title" }, [
          $("关联 "),
          d("small", null, "仅本插件")
        ], -1)),
        _.value ? m("", !0) : (u(), c("button", {
          key: 0,
          type: "button",
          class: "btn-add-link",
          onClick: a[0] || (a[0] = (t) => p.value = !p.value)
        }, v(p.value ? "取消" : "＋ 关联 GitHub"), 1))
      ]),
      p.value ? (u(), c("form", {
        key: 0,
        class: "association-form",
        onSubmit: a[2] || (a[2] = C((t) => I(l.value), ["prevent"]))
      }, [
        K(d("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (t) => l.value = t),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [q, l.value]
        ]),
        a[4] || (a[4] = d("button", { type: "submit" }, "添加", -1))
      ], 32)) : m("", !0),
      p.value && S.value.length ? (u(), c("div", ee, [
        (u(!0), c(L, null, N(S.value, (t) => (u(), c("button", {
          key: t.full_name,
          type: "button",
          onClick: (f) => I(t.full_name)
        }, v(t.full_name), 9, te))), 128))
      ])) : m("", !0),
      r.value ? (u(), c("p", se, v(r.value), 1)) : m("", !0),
      n.value.length ? (u(), c("div", ae, [
        (u(!0), c(L, null, N(n.value, (t) => (u(), c("article", {
          key: t.bvid,
          class: "bili-assoc-card",
          title: "点击播放视频: " + t.title,
          onClick: (f) => z(t)
        }, [
          d("div", ie, [
            t.cover ? (u(), c("img", {
              key: 0,
              src: t.cover.replace(/^http:/, "https:"),
              alt: "",
              class: "bili-assoc-thumb",
              referrerpolicy: "no-referrer"
            }, null, 8, ne)) : (u(), c("span", le, "📺")),
            a[5] || (a[5] = d("span", { class: "bili-assoc-play-btn" }, "▶", -1))
          ]),
          d("div", re, [
            d("header", ue, [
              d("span", {
                class: "bili-assoc-title",
                title: t.title
              }, v(t.title), 9, ce),
              d("button", {
                type: "button",
                class: "bili-assoc-unlink-btn",
                title: "移除该视频关联",
                onClick: C((f) => M(t.bvid), ["stop"])
              }, " × ", 8, de)
            ]),
            d("div", fe, [
              t.author ? (u(), c("span", pe, "👤 " + v(t.author), 1)) : m("", !0),
              d("span", ve, v(t.bvid), 1)
            ])
          ])
        ], 8, oe))), 128))
      ])) : m("", !0),
      e.value.length ? (u(), c("div", me, [
        (u(!0), c(L, null, N(e.value, (t) => (u(), c("article", {
          key: t.fullName,
          class: "repo-card"
        }, [
          d("header", null, [
            d("a", {
              href: "https://github.com/" + t.fullName,
              target: "_blank",
              rel: "noreferrer",
              onClick: C((f) => F(t.fullName, f), ["stop"])
            }, [
              a[6] || (a[6] = d("span", { class: "repo-mark" }, "🐙", -1)),
              $(" " + v(t.fullName), 1)
            ], 8, he),
            d("button", {
              type: "button",
              "aria-label": "移除关联 " + t.fullName,
              onClick: (f) => G(t.fullName)
            }, " × ", 8, ke)
          ]),
          d("p", null, v(t.description || "GitHub 仓库"), 1),
          d("footer", null, [
            t.stars !== void 0 ? (u(), c("span", ge, "☆ " + v(t.stars.toLocaleString()), 1)) : m("", !0),
            t.language ? (u(), c("span", be, v(t.language), 1)) : m("", !0),
            t.updated ? (u(), c("span", ye, v(t.updated.slice(0, 10)), 1)) : m("", !0)
          ])
        ]))), 128))
      ])) : m("", !0)
    ]));
  }
}), $e = /* @__PURE__ */ j(_e, [["__scopeId", "data-v-6f5be43a"]]);
export {
  $e as T,
  Ie as a,
  Te as f,
  X as g,
  R as r,
  Se as u
};
