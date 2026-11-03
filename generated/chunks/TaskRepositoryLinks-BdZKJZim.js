import { t as b } from "./module-state-9dj2qWDB.js";
import { w as I, z as $, d as A, D as F, o as d, g as f, h as u, p as E, k as G, n as M, q as V, i as g, F as R, j as S, t as v, b as y, y as W } from "./vendor-vue-dDCd4-uG.js";
import { t as T } from "./search.service-Ch5HygjH.js";
import { _ as B } from "./_plugin-vue_export-helper-CRVO6deU.js";
function se(t, a, e) {
  let r = !1, n;
  const l = I(
    () => [b.dataRevision, t(), b.pendingWrites],
    ([p, w, m], k) => {
      k && p !== k[0] && (r = !0, a()), n && clearTimeout(n), !(!r || !w || m) && (n = setTimeout(() => {
        n = void 0, !(!t() || b.pendingWrites) && (r = !1, e());
      }, 150));
    }
  );
  $(() => {
    l(), n && clearTimeout(n);
  });
}
function h(t) {
  return typeof t == "string" && t.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(t) && !t.split("/").some((a) => a === "." || a === "..");
}
const L = "todoist_repository_links_v1:", x = (t) => L + t;
function oe(t) {
  if (!h(t)) throw new Error("仓库名称无效");
  const a = [];
  for (let n = 0; n < localStorage.length; n++) {
    const l = localStorage.key(n);
    l?.startsWith(L) && a.push(l);
  }
  const e = [];
  let r = 0;
  for (const n of a) {
    const l = n.slice(L.length);
    if (l)
      try {
        _(l).some((p) => p.fullName.toLowerCase() === t.toLowerCase()) && e.push(l);
      } catch {
        r++;
      }
  }
  return { taskIds: e, unreadableCount: r };
}
function _(t) {
  if (!t) return [];
  const a = JSON.parse(localStorage.getItem(x(t)) || "[]");
  if (!Array.isArray(a)) throw new Error("关联记录格式无效");
  return a.filter((e) => e && h(e.fullName)).map((e) => ({
    fullName: e.fullName,
    description: typeof e.description == "string" ? e.description : "",
    stars: typeof e.stars == "number" && Number.isFinite(e.stars) ? e.stars : void 0,
    language: typeof e.language == "string" ? e.language : void 0,
    updated: typeof e.updated == "string" ? e.updated : void 0
  }));
}
function H(t, a) {
  if (!t || a.some((e) => !h(e.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(x(t), JSON.stringify(a)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: t }));
}
function ne(t, a) {
  const e = _(t);
  e.some((r) => r.fullName.toLowerCase() === a.fullName.toLowerCase()) || H(t, [...e, a]);
}
function re(t, a) {
  if (t)
    try {
      const e = _(t);
      if (e && e.length > 0) return e;
    } catch {
    }
  if (a) {
    const e = a.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if (e) {
      const r = `${e[1]}/${e[2].replace(/\.git$/, "")}`;
      if (h(r))
        return [{ fullName: r, description: "" }];
    }
  }
  return [];
}
const D = {
  class: "task-repositories",
  "aria-label": "关联 GitHub 仓库"
}, K = {
  key: 1,
  class: "repo-candidates"
}, U = ["onClick"], q = {
  key: 2,
  role: "alert"
}, J = { class: "repo-cards" }, O = ["href"], Z = ["aria-label", "onClick"], j = { key: 0 }, P = { key: 1 }, X = { key: 2 }, Y = /* @__PURE__ */ A({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {}
  },
  setup(t) {
    const a = t, e = y([]), r = y(""), n = y(""), l = y(!1), p = y(!1);
    function w() {
      try {
        e.value = _(a.taskId), p.value = !0;
      } catch {
        n.value = "关联记录读取失败，未覆盖已有数据。", p.value = !1;
      }
    }
    function m(i) {
      (i instanceof StorageEvent || i.detail === a.taskId) && w();
    }
    F(() => {
      window.addEventListener("storage", m), window.addEventListener("todoist-repository-links-changed", m);
    }), $(() => {
      window.removeEventListener("storage", m), window.removeEventListener("todoist-repository-links-changed", m);
    }), I(() => a.taskId, () => {
      e.value = [], r.value = "", l.value = !1, n.value = "", p.value = !1, w();
    }, { immediate: !0 });
    const k = W(() => T.repos.filter((i) => i.full_name.toLowerCase().includes(r.value.toLowerCase()) && !e.value.some((o) => o.fullName === i.full_name)).slice(0, 6));
    function N(i) {
      if (!(!a.taskId || !p.value))
        try {
          H(a.taskId, i), e.value = i, n.value = "";
        } catch {
          n.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function C(i) {
      let o = i.trim();
      if (o.startsWith("https://"))
        try {
          const c = new URL(o);
          if (c.hostname !== "github.com" || c.username || c.password) throw new Error();
          o = c.pathname.replace(/^\/|\/$/g, "");
        } catch {
          n.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!h(o)) {
        n.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (e.value.some((c) => c.fullName.toLowerCase() === o.toLowerCase())) {
        n.value = "该仓库已关联。";
        return;
      }
      const s = T.repos.find((c) => c.full_name.toLowerCase() === o.toLowerCase());
      N([...e.value, { fullName: o, description: s?.description || "", stars: s?.stargazers_count, language: s?.language || void 0, updated: s?.updated_at }]), n.value || (r.value = "", l.value = !1);
    }
    function z(i) {
      N(e.value.filter((o) => o.fullName !== i));
    }
    return (i, o) => (d(), f("section", D, [
      u("header", null, [
        o[3] || (o[3] = u("span", null, [
          E("关联仓库 "),
          u("small", null, "仅本插件")
        ], -1)),
        u("button", {
          type: "button",
          onClick: o[0] || (o[0] = (s) => l.value = !l.value)
        }, "＋ 关联")
      ]),
      l.value ? (d(), f("form", {
        key: 0,
        onSubmit: o[2] || (o[2] = G((s) => C(r.value), ["prevent"]))
      }, [
        M(u("input", {
          "onUpdate:modelValue": o[1] || (o[1] = (s) => r.value = s),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [V, r.value]
        ]),
        o[4] || (o[4] = u("button", { type: "submit" }, "添加", -1))
      ], 32)) : g("", !0),
      l.value && k.value.length ? (d(), f("div", K, [
        (d(!0), f(R, null, S(k.value, (s) => (d(), f("button", {
          key: s.full_name,
          type: "button",
          onClick: (c) => C(s.full_name)
        }, v(s.full_name), 9, U))), 128))
      ])) : g("", !0),
      n.value ? (d(), f("p", q, v(n.value), 1)) : g("", !0),
      u("div", J, [
        (d(!0), f(R, null, S(e.value, (s) => (d(), f("article", {
          key: s.fullName,
          class: "repo-card"
        }, [
          u("header", null, [
            u("a", {
              href: "https://github.com/" + s.fullName,
              target: "_blank",
              rel: "noreferrer"
            }, [
              o[5] || (o[5] = u("span", { class: "repo-mark" }, "⌘", -1)),
              E(" " + v(s.fullName), 1)
            ], 8, O),
            u("button", {
              type: "button",
              "aria-label": "移除关联 " + s.fullName,
              onClick: (c) => z(s.fullName)
            }, "×", 8, Z)
          ]),
          u("p", null, v(s.description || "GitHub 仓库"), 1),
          u("footer", null, [
            s.stars !== void 0 ? (d(), f("span", j, "☆ " + v(s.stars.toLocaleString()), 1)) : g("", !0),
            s.language ? (d(), f("span", P, v(s.language), 1)) : g("", !0),
            s.updated ? (d(), f("span", X, v(s.updated.slice(0, 10)), 1)) : g("", !0)
          ])
        ]))), 128))
      ])
    ]));
  }
}), le = /* @__PURE__ */ B(Y, [["__scopeId", "data-v-97ac7343"]]);
export {
  le as T,
  ne as a,
  oe as f,
  re as g,
  _ as r,
  se as u
};
