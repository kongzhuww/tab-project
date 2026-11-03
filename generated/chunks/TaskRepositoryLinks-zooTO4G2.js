import { t as C } from "./module-state-GmAjQSzX.js";
import { w as A, z as D, d as U, D as W, o as u, g as c, h as d, p as $, t as v, i as m, k as L, n as K, q, F as N, j as E, b as g, y as V } from "./vendor-vue-FFI3kJnP.js";
import { t as B, A as J } from "./search.service-Ct9e-A4u.js";
import { u as O, g as P } from "./TodoistDatePickerPopover-FCWFwVeB.js";
import { d as Z } from "./view-styles-COzBKjCs.js";
import { _ as j } from "./_plugin-vue_export-helper-CVWGtx1v.js";
function Rt(o, s, t) {
  let n = !1, l;
  const r = A(
    () => [C.dataRevision, o(), C.pendingWrites],
    ([p, h, w], b) => {
      b && p !== b[0] && (n = !0, s()), l && clearTimeout(l), !(!n || !h || w) && (l = setTimeout(() => {
        l = void 0, !(!o() || C.pendingWrites) && (n = !1, t());
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
const R = "todoist_repository_links_v1:", H = (o) => R + o;
function St(o) {
  if (!y(o)) throw new Error("仓库名称无效");
  const s = [];
  for (let l = 0; l < localStorage.length; l++) {
    const r = localStorage.key(l);
    r?.startsWith(R) && s.push(r);
  }
  const t = [];
  let n = 0;
  for (const l of s) {
    const r = l.slice(R.length);
    if (r)
      try {
        _(r).some((p) => p.fullName.toLowerCase() === o.toLowerCase()) && t.push(r);
      } catch {
        n++;
      }
  }
  return { taskIds: t, unreadableCount: n };
}
function _(o) {
  if (!o) return [];
  const s = JSON.parse(localStorage.getItem(H(o)) || "[]");
  if (!Array.isArray(s)) throw new Error("关联记录格式无效");
  return s.filter((t) => t && y(t.fullName)).map((t) => ({
    fullName: t.fullName,
    description: typeof t.description == "string" ? t.description : "",
    stars: typeof t.stars == "number" && Number.isFinite(t.stars) ? t.stars : void 0,
    language: typeof t.language == "string" ? t.language : void 0,
    updated: typeof t.updated == "string" ? t.updated : void 0
  }));
}
function x(o, s) {
  if (!o || s.some((t) => !y(t.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(H(o), JSON.stringify(s)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: o }));
}
function Tt(o, s) {
  const t = _(o);
  t.some((n) => n.fullName.toLowerCase() === s.fullName.toLowerCase()) || x(o, [...t, s]);
}
function It(o, s) {
  if (o)
    try {
      const t = _(o);
      if (t && t.length > 0) return t;
    } catch {
    }
  if (s) {
    const t = s.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if (t) {
      const n = `${t[1]}/${t[2].replace(/\.git$/, "")}`;
      if (y(n))
        return [{ fullName: n, description: "" }];
    }
  }
  return [];
}
const X = {
  class: "task-associations",
  "aria-label": "关联资源"
}, Y = { class: "associations-head" }, Q = {
  key: 1,
  class: "repo-candidates"
}, tt = ["onClick"], et = {
  key: 2,
  class: "association-error",
  role: "alert"
}, st = {
  key: 3,
  class: "bili-cards-grid"
}, at = ["title", "onClick"], ot = { class: "bili-assoc-thumb-wrap" }, it = ["src"], nt = {
  key: 1,
  class: "bili-assoc-no-thumb"
}, lt = { class: "bili-assoc-meta" }, rt = { class: "bili-assoc-header" }, ut = ["title"], ct = ["onClick"], dt = { class: "bili-assoc-sub" }, ft = {
  key: 0,
  class: "bili-assoc-author"
}, pt = { class: "bili-assoc-bvid" }, vt = {
  key: 4,
  class: "repo-cards"
}, mt = ["href", "onClick"], ht = ["aria-label", "onClick"], kt = { key: 0 }, gt = { key: 1 }, bt = { key: 2 }, yt = /* @__PURE__ */ U({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {},
    description: {},
    title: {}
  },
  setup(o) {
    const s = o, t = g([]), n = g([]), l = g(""), r = g(""), p = g(!1), h = g(!1), w = V(() => t.value.length > 0 || n.value.length > 0);
    function b() {
      try {
        t.value = _(s.taskId), n.value = P(s.taskId, s.description, s.title), h.value = !0;
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
        t.value = [], n.value = [], l.value = "", p.value = !1, r.value = "", h.value = !1, b();
      },
      { immediate: !0 }
    );
    const S = V(
      () => B.repos.filter(
        (i) => i.full_name.toLowerCase().includes(l.value.toLowerCase()) && !t.value.some((a) => a.fullName === i.full_name)
      ).slice(0, 6)
    );
    function T(i) {
      if (!(!s.taskId || !h.value))
        try {
          x(s.taskId, i), t.value = i, r.value = "";
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
      if (t.value.some((f) => f.fullName.toLowerCase() === a.toLowerCase())) {
        r.value = "该仓库已关联。";
        return;
      }
      const e = B.repos.find((f) => f.full_name.toLowerCase() === a.toLowerCase());
      T([
        ...t.value,
        {
          fullName: a,
          description: e?.description || "",
          stars: e?.stargazers_count,
          language: e?.language || void 0,
          updated: e?.updated_at
        }
      ]), r.value || (l.value = "", p.value = !1);
    }
    function G(i) {
      T(t.value.filter((a) => a.fullName !== i));
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
    return (i, a) => (u(), c("section", X, [
      d("header", Y, [
        a[3] || (a[3] = d("span", { class: "associations-title" }, [
          $("关联 "),
          d("small", null, "仅本插件")
        ], -1)),
        w.value ? m("", !0) : (u(), c("button", {
          key: 0,
          type: "button",
          class: "btn-add-link",
          onClick: a[0] || (a[0] = (e) => p.value = !p.value)
        }, v(p.value ? "取消" : "＋ 关联 GitHub"), 1))
      ]),
      p.value ? (u(), c("form", {
        key: 0,
        class: "association-form",
        onSubmit: a[2] || (a[2] = L((e) => I(l.value), ["prevent"]))
      }, [
        K(d("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (e) => l.value = e),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [q, l.value]
        ]),
        a[4] || (a[4] = d("button", { type: "submit" }, "添加", -1))
      ], 32)) : m("", !0),
      p.value && S.value.length ? (u(), c("div", Q, [
        (u(!0), c(N, null, E(S.value, (e) => (u(), c("button", {
          key: e.full_name,
          type: "button",
          onClick: (f) => I(e.full_name)
        }, v(e.full_name), 9, tt))), 128))
      ])) : m("", !0),
      r.value ? (u(), c("p", et, v(r.value), 1)) : m("", !0),
      n.value.length ? (u(), c("div", st, [
        (u(!0), c(N, null, E(n.value, (e) => (u(), c("article", {
          key: e.bvid,
          class: "bili-assoc-card",
          title: "点击播放视频: " + e.title,
          onClick: (f) => z(e)
        }, [
          d("div", ot, [
            e.cover ? (u(), c("img", {
              key: 0,
              src: e.cover.replace(/^http:/, "https:"),
              alt: "",
              class: "bili-assoc-thumb",
              referrerpolicy: "no-referrer"
            }, null, 8, it)) : (u(), c("span", nt, "📺")),
            a[5] || (a[5] = d("span", { class: "bili-assoc-play-btn" }, "▶", -1))
          ]),
          d("div", lt, [
            d("header", rt, [
              d("span", {
                class: "bili-assoc-title",
                title: e.title
              }, v(e.title), 9, ut),
              d("button", {
                type: "button",
                class: "bili-assoc-unlink-btn",
                title: "移除该视频关联",
                onClick: L((f) => M(e.bvid), ["stop"])
              }, " × ", 8, ct)
            ]),
            d("div", dt, [
              e.author ? (u(), c("span", ft, "👤 " + v(e.author), 1)) : m("", !0),
              d("span", pt, v(e.bvid), 1)
            ])
          ])
        ], 8, at))), 128))
      ])) : m("", !0),
      t.value.length ? (u(), c("div", vt, [
        (u(!0), c(N, null, E(t.value, (e) => (u(), c("article", {
          key: e.fullName,
          class: "repo-card"
        }, [
          d("header", null, [
            d("a", {
              href: "https://github.com/" + e.fullName,
              target: "_blank",
              rel: "noreferrer",
              onClick: L((f) => F(e.fullName, f), ["stop"])
            }, [
              a[6] || (a[6] = d("span", { class: "repo-mark" }, "🐙", -1)),
              $(" " + v(e.fullName), 1)
            ], 8, mt),
            d("button", {
              type: "button",
              "aria-label": "移除关联 " + e.fullName,
              onClick: (f) => G(e.fullName)
            }, " × ", 8, ht)
          ]),
          d("p", null, v(e.description || "GitHub 仓库"), 1),
          d("footer", null, [
            e.stars !== void 0 ? (u(), c("span", kt, "☆ " + v(e.stars.toLocaleString()), 1)) : m("", !0),
            e.language ? (u(), c("span", gt, v(e.language), 1)) : m("", !0),
            e.updated ? (u(), c("span", bt, v(e.updated.slice(0, 10)), 1)) : m("", !0)
          ])
        ]))), 128))
      ])) : m("", !0)
    ]));
  }
}), $t = /* @__PURE__ */ j(yt, [["__scopeId", "data-v-5bdf794a"]]);
export {
  $t as T,
  Tt as a,
  St as f,
  It as g,
  _ as r,
  Rt as u
};
