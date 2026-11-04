import { d as K, w as F, G as J, D as Q, z as ee, u as t, o as i, g as l, h as o, t as r, i as m, C as H, p as O, F as G, j as U, n as te, A as se, B as oe, b as _ } from "./vendor-vue-FFI3kJnP.js";
import { p as e, A as y, _ as ne, $ as ae } from "./search.service-DacqWPJU.js";
import { i as ie } from "./images-D-x8fgeI.js";
import "./window-manager.store-BD4IokhA.js";
import { _ as le } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const re = {
  key: 0,
  class: "gh-modal-overlay"
}, ce = ["aria-label"], de = { class: "gh-modal-title-wrap" }, ue = ["href"], he = { class: "gh-owner" }, ge = { class: "gh-name" }, me = { class: "gh-modal-actions" }, pe = {
  key: 0,
  class: "gh-status-tip"
}, ve = ["disabled"], fe = { class: "gh-modal-content" }, we = { class: "gh-repository-content" }, _e = { class: "gh-modal-ribbon" }, ye = { class: "gh-meta-badges" }, be = ["title"], ke = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, Ee = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, xe = {
  key: 0,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Le = {
  key: 1,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, De = {
  key: 2,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, Ae = {
  key: 0,
  class: "gh-modal-desc"
}, Ce = {
  key: 1,
  class: "gh-modal-topics"
}, Me = { class: "gh-modal-body" }, Re = {
  key: 0,
  class: "gh-status-tip"
}, Te = { class: "gh-toc-title" }, Se = { class: "gh-toc-arrow" }, He = { class: "gh-toc-list" }, Oe = ["onClick"], Pe = { class: "gh-toc-text" }, $e = {
  key: 2,
  class: "gh-readme-loading"
}, ze = {
  key: 3,
  class: "gh-readme-error"
}, Ne = ["href"], Ve = {
  key: 4,
  class: "gh-readme-loading"
}, qe = ["innerHTML"], Be = /* @__PURE__ */ K({
  __name: "GitHubRepoDetailDrawer",
  setup(Fe) {
    const v = _(""), p = _(!1), E = _(null), P = _(null), b = _(null), u = _(!document.hidden);
    let x = !0, L = 0, D = 0, A, C = () => {
    }, M = !1, $ = 0, z = 0, R = 0, T = 0;
    function Z(n) {
      if (n.target.closest("button, a, input")) return;
      C();
      const s = P.value;
      if (!s || !e.isOpen || !u.value) return;
      M = !0;
      const a = s.getBoundingClientRect();
      R = a.left, T = a.top, $ = n.clientX, z = n.clientY, b.value = { x: R, y: T };
      const d = (h) => {
        if (!M) return;
        const f = h.clientX - $, g = h.clientY - z;
        b.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, R + f)),
          y: Math.max(10, Math.min(window.innerHeight - 80, T + g))
        };
      }, c = () => {
        M = !1, window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", c);
      };
      C = c, window.addEventListener("mousemove", d), window.addEventListener("mouseup", c);
    }
    function N() {
      y.close();
    }
    function S(n) {
      n.key === "Escape" && e.isOpen && N();
    }
    async function W(n, s) {
      if (!e.isOpen || !u.value) return;
      const a = L, d = ++D, c = () => e.isOpen && u.value && L === a && d === D;
      clearTimeout(A);
      try {
        await navigator.clipboard.writeText(n), c() && (v.value = `已复制 ${s}`);
      } catch {
        c() && (v.value = "复制未确认");
      }
      c() && (A = setTimeout(() => {
        c() && (v.value = "");
      }, 2e3));
    }
    function X(n) {
      const s = n.target, a = s?.closest("img");
      if (a && a.src) {
        n.preventDefault(), n.stopPropagation(), ie.open({ source: a.src, title: a.alt || "图片预览" });
        return;
      }
      const d = s?.closest("a");
      if (d) {
        const c = d.getAttribute("href") || "";
        if (c.startsWith("#"))
          return;
        const h = /^(?:\.?\/)?(README[._a-zA-Z0-9-]*\.md)$/i.exec(c);
        if (h) {
          n.preventDefault(), n.stopPropagation(), y.switchReadme(h[1]);
          return;
        }
        const f = e.fullName.toLowerCase(), g = new RegExp(`^https?:\\/\\/github\\.com\\/${f}\\/blob\\/[^/]+\\/(README[._a-zA-Z0-9-]*\\.md)$`, "i").exec(c);
        if (g) {
          n.preventDefault(), n.stopPropagation(), y.switchReadme(g[1]);
          return;
        }
        d.href && !d.href.startsWith("chrome-extension://") && (n.preventDefault(), n.stopPropagation(), window.open(d.href, "_blank", "noopener,noreferrer"));
      }
    }
    function Y() {
      y.switchReadme();
    }
    function I(n) {
      if (!E.value) return;
      const s = E.value.querySelectorAll("h1, h2, h3");
      for (const a of Array.from(s))
        if (a.textContent?.trim().includes(n.text)) {
          a.scrollIntoView({ behavior: "smooth", block: "start" }), p.value = !1;
          break;
        }
    }
    F(
      () => [e.readmeHtml, e.isOpen, u.value, e.revision],
      async ([n, s, a], d, c) => {
        let h = !1, f = 0;
        c(() => {
          h = !0, cancelAnimationFrame(f);
        }), !(!n || !s || !a) && (await J(), !h && (f = requestAnimationFrame(() => {
          h || !e.isOpen || !u.value || E.value?.querySelectorAll("pre").forEach((g) => {
            if (g.querySelector(".gh-code-copy-btn")) return;
            const w = document.createElement("button");
            w.type = "button", w.className = "gh-code-copy-btn", w.title = "复制代码", w.innerText = "复制", w.addEventListener("click", (j) => {
              j.stopPropagation(), W(g.querySelector("code")?.innerText || "", "代码");
            }), g.style.position = "relative", g.appendChild(w);
          });
        })));
      }
    );
    function V() {
      ++L, ++D, clearTimeout(A), v.value = "", p.value = !1, C();
    }
    F(() => [e.revision, e.isOpen, u.value], () => {
      V(), window.removeEventListener("keydown", S), e.isOpen && u.value && window.addEventListener("keydown", S);
    }, { immediate: !0, flush: "sync" });
    function k() {
      u.value = x && !document.hidden, y.setPageActive(u.value);
    }
    function q() {
      x = !1, k();
    }
    function B() {
      x = !0, k();
    }
    return Q(() => {
      document.addEventListener("visibilitychange", k), window.addEventListener("pagehide", q), window.addEventListener("pageshow", B), k();
    }), ee(() => {
      V(), y.setPageActive(!1), window.removeEventListener("keydown", S), document.removeEventListener("visibilitychange", k), window.removeEventListener("pagehide", q), window.removeEventListener("pageshow", B);
    }), (n, s) => t(e).isOpen ? (i(), l("div", re, [
      o("div", {
        ref_key: "windowRef",
        ref: P,
        class: "gh-modal-window",
        style: oe(b.value ? { position: "fixed", left: `${b.value.x}px`, top: `${b.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": t(e).fullName
      }, [
        o("header", {
          class: "gh-modal-header",
          onMousedown: Z
        }, [
          o("div", de, [
            s[3] || (s[3] = o("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            o("a", {
              href: t(e).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              o("span", he, r(t(e).owner), 1),
              s[1] || (s[1] = o("span", { class: "gh-sep" }, "/", -1)),
              o("strong", ge, r(t(e).repo), 1),
              s[2] || (s[2] = o("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, ue)
          ]),
          o("div", me, [
            v.value ? (i(), l("span", pe, r(v.value), 1)) : m("", !0),
            o("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: t(ne).saving,
              title: "关闭视窗 (Esc)",
              onClick: N
            }, " ✕ ", 8, ve)
          ])
        ], 32),
        o("div", fe, [
          o("div", we, [
            o("div", _e, [
              o("div", ye, [
                o("button", {
                  type: "button",
                  class: H(["gh-meta-item gh-meta-zh-btn", { "is-zh": t(e).isZh }]),
                  title: t(e).isZh ? "当前为中文文档 · 点击切换为英文原版" : "当前为英文文档 · 点击切换为中文文档",
                  onClick: Y
                }, [
                  O(r(t(e).isZh ? "🇨🇳 中文版" : "🌐 English") + " ", 1),
                  s[4] || (s[4] = o("span", { class: "zh-toggle-arrow" }, "⇄", -1))
                ], 10, be),
                o("span", ke, [
                  s[5] || (s[5] = O(" ★ ", -1)),
                  o("strong", null, r(t(e).stars.toLocaleString()), 1)
                ]),
                o("span", Ee, [
                  s[6] || (s[6] = O(" ⌥ ", -1)),
                  o("strong", null, r(t(e).forks.toLocaleString()), 1)
                ]),
                t(e).language ? (i(), l("span", xe, " 💻 " + r(t(e).language), 1)) : m("", !0),
                t(e).license ? (i(), l("span", Le, " 📄 " + r(t(e).license), 1)) : m("", !0),
                t(e).pushedAt ? (i(), l("span", De, " ⏱ " + r(t(ae)(t(e).pushedAt)), 1)) : m("", !0)
              ]),
              t(e).description ? (i(), l("p", Ae, r(t(e).description), 1)) : m("", !0),
              t(e).topics.length ? (i(), l("div", Ce, [
                (i(!0), l(G, null, U(t(e).topics, (a) => (i(), l("span", {
                  key: a,
                  class: "gh-topic-tag"
                }, " #" + r(a), 1))), 128))
              ])) : m("", !0)
            ]),
            o("main", Me, [
              t(e).notice ? (i(), l("p", Re, r(t(e).notice), 1)) : m("", !0),
              t(e).headings.length > 0 ? (i(), l("aside", {
                key: 1,
                class: H(["gh-modal-toc", { "is-open": p.value }])
              }, [
                o("div", {
                  class: "gh-toc-header",
                  onClick: s[0] || (s[0] = (a) => p.value = !p.value)
                }, [
                  s[7] || (s[7] = o("span", { class: "gh-toc-icon" }, "📑", -1)),
                  o("span", Te, "目录大纲 (" + r(t(e).headings.length) + ")", 1),
                  o("span", Se, r(p.value ? "▲" : "▼"), 1)
                ]),
                te(o("ul", He, [
                  (i(!0), l(G, null, U(t(e).headings, (a, d) => (i(), l("li", {
                    key: d,
                    class: H(["gh-toc-item", `level-${a.level}`]),
                    onClick: (c) => I(a)
                  }, [
                    s[8] || (s[8] = o("span", { class: "gh-toc-bullet" }, "·", -1)),
                    o("span", Pe, r(a.text), 1)
                  ], 10, Oe))), 128))
                ], 512), [
                  [se, p.value]
                ])
              ], 2)) : m("", !0),
              t(e).isLoading ? (i(), l("div", $e, [
                s[9] || (s[9] = o("div", { class: "gh-spinner" }, null, -1)),
                o("span", null, "正在获取并排版 " + r(t(e).fullName) + " 的 README.md …", 1)
              ])) : t(e).error ? (i(), l("div", ze, [
                s[10] || (s[10] = o("span", { class: "gh-error-icon" }, "⚠️", -1)),
                o("p", null, r(t(e).error), 1),
                o("a", {
                  href: t(e).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, Ne)
              ])) : t(e).hasReadme && !t(e).readmeMarkdown ? (i(), l("p", Ve, "README 内容为空。")) : (i(), l("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: E,
                class: "gh-readme-rendered markdown-rendered allow-copy",
                innerHTML: t(e).readmeHtml,
                onClick: X
              }, null, 8, qe))
            ])
          ])
        ])
      ], 12, ce)
    ])) : m("", !0);
  }
}), Ye = /* @__PURE__ */ le(Be, [["__scopeId", "data-v-244d57b8"]]);
export {
  Ye as default
};
