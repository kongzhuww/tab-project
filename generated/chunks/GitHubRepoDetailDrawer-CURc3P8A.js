import { d as Q, w as B, D as ee, B as te, x as se, u as s, o as i, e as r, i as o, t as l, f as p, A as $, m as O, F as Z, g as G, l as oe, y as ne, z as ae, b as _ } from "./vendor-vue-9b0eS4bW.js";
import { p as e, D as ie, v as b, a1 as re, a2 as le } from "./search.service-wriY3nvN.js";
import { i as ce } from "./images-B3E1ecXB.js";
import "./window-manager.store-BdI_8a-H.js";
import { _ as de } from "./_plugin-vue_export-helper-BxikU0LD.js";
const ue = {
  key: 0,
  class: "gh-modal-overlay"
}, he = ["aria-label"], ge = { class: "gh-modal-title-wrap" }, me = ["href"], pe = { class: "gh-owner" }, fe = { class: "gh-name" }, ve = { class: "gh-modal-actions" }, we = {
  key: 0,
  class: "gh-status-tip"
}, _e = ["disabled"], be = { class: "gh-modal-content" }, ye = { class: "gh-repository-content" }, ke = { class: "gh-modal-ribbon" }, Ee = { class: "gh-meta-badges" }, xe = ["title"], Ae = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, Le = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, De = {
  key: 0,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Ce = {
  key: 1,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, Me = {
  key: 2,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, Re = {
  key: 0,
  class: "gh-modal-desc"
}, Te = {
  key: 1,
  class: "gh-modal-topics"
}, Se = { class: "gh-modal-body" }, He = {
  key: 0,
  class: "gh-status-tip"
}, Pe = { class: "gh-toc-title" }, $e = { class: "gh-toc-arrow" }, Oe = { class: "gh-toc-list" }, ze = ["onClick"], Ve = { class: "gh-toc-text" }, Ne = {
  key: 2,
  class: "gh-readme-loading"
}, qe = {
  key: 3,
  class: "gh-readme-error"
}, Fe = ["href"], Ie = {
  key: 4,
  class: "gh-readme-loading"
}, Ue = ["innerHTML"], Be = /* @__PURE__ */ Q({
  __name: "GitHubRepoDetailDrawer",
  setup(Ze) {
    const v = _(""), f = _(!1), y = _(null), z = _(null), k = _(null), h = _(!document.hidden);
    let x = !0, A = 0, L = 0, D, C = () => {
    }, M = !1, V = 0, N = 0, R = 0, T = 0;
    function X(n) {
      if (n.target.closest("button, a, input")) return;
      C();
      const t = z.value;
      if (!t || !e.isOpen || !h.value) return;
      M = !0;
      const a = t.getBoundingClientRect();
      R = a.left, T = a.top, V = n.clientX, N = n.clientY, k.value = { x: R, y: T };
      const d = (g) => {
        if (!M) return;
        const w = g.clientX - V, m = g.clientY - N;
        k.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, R + w)),
          y: Math.max(10, Math.min(window.innerHeight - 80, T + m))
        };
      }, c = () => {
        M = !1, window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", c);
      };
      C = c, window.addEventListener("mousemove", d), window.addEventListener("mouseup", c);
    }
    function q() {
      b.close();
    }
    function S(n) {
      n.key === "Escape" && e.isOpen && q();
    }
    async function Y(n, t) {
      if (!e.isOpen || !h.value) return;
      const a = A, d = ++L, c = () => e.isOpen && h.value && A === a && d === L;
      clearTimeout(D);
      try {
        await navigator.clipboard.writeText(n), c() && (v.value = `已复制 ${t}`);
      } catch {
        c() && (v.value = "复制未确认");
      }
      c() && (D = setTimeout(() => {
        c() && (v.value = "");
      }, 2e3));
    }
    function W(n) {
      const t = n.target;
      if (!(t instanceof HTMLImageElement)) return;
      const a = t.getAttribute("data-readme-fallback");
      if (a) {
        t.removeAttribute("data-readme-fallback"), t.src = a;
        return;
      }
      t.classList.add("gh-image-unavailable"), t.title = `图片加载失败（可能是源站不可达或私有资源）：${t.getAttribute("src") || "无地址"}`;
    }
    function K(n) {
      const t = n.target, a = t?.closest("img");
      if (a && a.src) {
        n.preventDefault(), n.stopPropagation(), ce.open({ source: a.src, title: a.alt || "图片预览" });
        return;
      }
      const d = t?.closest("a");
      if (d) {
        const c = d.getAttribute("href") || "";
        if (c.startsWith("#")) {
          n.preventDefault(), n.stopPropagation();
          let u = c.slice(1);
          try {
            u = decodeURIComponent(u);
          } catch {
          }
          const H = y.value;
          Array.from(H?.querySelectorAll("[id], a[name]") || []).find((P) => P.id === u || P.id === `user-content-${u}` || P.getAttribute("name") === u)?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        const g = /^(?:\.?\/)?(README[._a-zA-Z0-9-]*\.md)$/i.exec(c);
        if (g) {
          n.preventDefault(), n.stopPropagation(), b.switchReadme(g[1]);
          return;
        }
        const w = e.fullName.toLowerCase(), m = new RegExp(`^https?:\\/\\/github\\.com\\/${w}\\/blob\\/[^/]+\\/(README[._a-zA-Z0-9-]*\\.md)$`, "i").exec(c);
        if (m) {
          n.preventDefault(), n.stopPropagation(), b.switchReadme(m[1]);
          return;
        }
        /^(https?:|mailto:)/i.test(d.href) && (n.preventDefault(), n.stopPropagation(), window.open(d.href, "_blank", "noopener,noreferrer"));
      }
    }
    function j() {
      b.switchReadme();
    }
    function J(n) {
      if (!y.value) return;
      const t = y.value.querySelectorAll("h1, h2, h3");
      for (const a of Array.from(t))
        if (a.textContent?.trim().includes(n.text)) {
          a.scrollIntoView({ behavior: "smooth", block: "start" }), f.value = !1;
          break;
        }
    }
    B(
      () => [e.readmeHtml, e.isOpen, h.value, e.revision],
      async ([n, t, a], d, c) => {
        let g = !1, w = 0;
        c(() => {
          g = !0, cancelAnimationFrame(w);
        }), !(!n || !t || !a) && (await ee(), !g && (w = requestAnimationFrame(() => {
          g || !e.isOpen || !h.value || y.value?.querySelectorAll("pre").forEach((m) => {
            if (m.querySelector(".gh-code-copy-btn")) return;
            const u = document.createElement("button");
            u.type = "button", u.className = "gh-code-copy-btn", u.title = "复制代码", u.innerText = "复制", u.addEventListener("click", (H) => {
              H.stopPropagation(), Y(m.querySelector("code")?.innerText || "", "代码");
            }), m.style.position = "relative", m.appendChild(u);
          });
        })));
      }
    );
    function F() {
      ++A, ++L, clearTimeout(D), v.value = "", f.value = !1, C();
    }
    B(() => [e.revision, e.isOpen, h.value], () => {
      F(), window.removeEventListener("keydown", S), e.isOpen && h.value && window.addEventListener("keydown", S);
    }, { immediate: !0, flush: "sync" });
    function E() {
      h.value = x && !document.hidden, b.setPageActive(h.value);
    }
    function I() {
      x = !1, E();
    }
    function U() {
      x = !0, E();
    }
    return te(() => {
      ie(), document.addEventListener("visibilitychange", E), window.addEventListener("pagehide", I), window.addEventListener("pageshow", U), E();
    }), se(() => {
      F(), b.setPageActive(!1), window.removeEventListener("keydown", S), document.removeEventListener("visibilitychange", E), window.removeEventListener("pagehide", I), window.removeEventListener("pageshow", U);
    }), (n, t) => s(e).isOpen ? (i(), r("div", ue, [
      o("div", {
        ref_key: "windowRef",
        ref: z,
        class: "gh-modal-window",
        style: ae(k.value ? { position: "fixed", left: `${k.value.x}px`, top: `${k.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": s(e).fullName
      }, [
        o("header", {
          class: "gh-modal-header",
          onMousedown: X
        }, [
          o("div", ge, [
            t[3] || (t[3] = o("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            o("a", {
              href: s(e).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              o("span", pe, l(s(e).owner), 1),
              t[1] || (t[1] = o("span", { class: "gh-sep" }, "/", -1)),
              o("strong", fe, l(s(e).repo), 1),
              t[2] || (t[2] = o("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, me)
          ]),
          o("div", ve, [
            v.value ? (i(), r("span", we, l(v.value), 1)) : p("", !0),
            o("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              disabled: s(re).saving,
              title: "关闭视窗 (Esc)",
              onClick: q
            }, " ✕ ", 8, _e)
          ])
        ], 32),
        o("div", be, [
          o("div", ye, [
            o("div", ke, [
              o("div", Ee, [
                o("button", {
                  type: "button",
                  class: $(["gh-meta-item gh-meta-zh-btn", { "is-zh": s(e).isZh }]),
                  title: s(e).isZh ? "当前为中文文档 · 点击切换为英文原版" : "当前为英文文档 · 点击切换为中文文档",
                  onClick: j
                }, [
                  O(l(s(e).isZh ? "🇨🇳 中文版" : "🌐 English") + " ", 1),
                  t[4] || (t[4] = o("span", { class: "zh-toggle-arrow" }, "⇄", -1))
                ], 10, xe),
                o("span", Ae, [
                  t[5] || (t[5] = O(" ★ ", -1)),
                  o("strong", null, l(s(e).stars.toLocaleString()), 1)
                ]),
                o("span", Le, [
                  t[6] || (t[6] = O(" ⌥ ", -1)),
                  o("strong", null, l(s(e).forks.toLocaleString()), 1)
                ]),
                s(e).language ? (i(), r("span", De, " 💻 " + l(s(e).language), 1)) : p("", !0),
                s(e).license ? (i(), r("span", Ce, " 📄 " + l(s(e).license), 1)) : p("", !0),
                s(e).pushedAt ? (i(), r("span", Me, " ⏱ " + l(s(le)(s(e).pushedAt)), 1)) : p("", !0)
              ]),
              s(e).description ? (i(), r("p", Re, l(s(e).description), 1)) : p("", !0),
              s(e).topics.length ? (i(), r("div", Te, [
                (i(!0), r(Z, null, G(s(e).topics, (a) => (i(), r("span", {
                  key: a,
                  class: "gh-topic-tag"
                }, " #" + l(a), 1))), 128))
              ])) : p("", !0)
            ]),
            o("main", Se, [
              s(e).notice ? (i(), r("p", He, l(s(e).notice), 1)) : p("", !0),
              s(e).headings.length > 0 ? (i(), r("aside", {
                key: 1,
                class: $(["gh-modal-toc", { "is-open": f.value }])
              }, [
                o("div", {
                  class: "gh-toc-header",
                  onClick: t[0] || (t[0] = (a) => f.value = !f.value)
                }, [
                  t[7] || (t[7] = o("span", { class: "gh-toc-icon" }, "📑", -1)),
                  o("span", Pe, "目录大纲 (" + l(s(e).headings.length) + ")", 1),
                  o("span", $e, l(f.value ? "▲" : "▼"), 1)
                ]),
                oe(o("ul", Oe, [
                  (i(!0), r(Z, null, G(s(e).headings, (a, d) => (i(), r("li", {
                    key: d,
                    class: $(["gh-toc-item", `level-${a.level}`]),
                    onClick: (c) => J(a)
                  }, [
                    t[8] || (t[8] = o("span", { class: "gh-toc-bullet" }, "·", -1)),
                    o("span", Ve, l(a.text), 1)
                  ], 10, ze))), 128))
                ], 512), [
                  [ne, f.value]
                ])
              ], 2)) : p("", !0),
              s(e).isLoading ? (i(), r("div", Ne, [
                t[9] || (t[9] = o("div", { class: "gh-spinner" }, null, -1)),
                o("span", null, "正在获取并排版 " + l(s(e).fullName) + " 的 README.md …", 1)
              ])) : s(e).error ? (i(), r("div", qe, [
                t[10] || (t[10] = o("span", { class: "gh-error-icon" }, "⚠️", -1)),
                o("p", null, l(s(e).error), 1),
                o("a", {
                  href: s(e).htmlUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "gh-btn gh-btn-action"
                }, " 直接前往 GitHub 网页查看 ↗ ", 8, Fe)
              ])) : s(e).hasReadme && !s(e).readmeMarkdown ? (i(), r("p", Ie, "README 内容为空。")) : (i(), r("article", {
                key: 5,
                ref_key: "readmeContainerRef",
                ref: y,
                class: "gh-readme-rendered markdown-rendered allow-copy",
                onErrorCapture: W,
                innerHTML: s(e).readmeHtml,
                onClick: K
              }, null, 40, Ue))
            ])
          ])
        ])
      ], 12, he)
    ])) : p("", !0);
  }
}), Je = /* @__PURE__ */ de(Be, [["__scopeId", "data-v-0d4f413b"]]);
export {
  Je as default
};
