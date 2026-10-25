import { f as se, w as z, n as ne, o as oe, d as ae, x as n, g as a, h as i, i as s, t as l, u as d, j as X, F as Y, z as I, s as $, q as ie, D as le, B as re, b as g } from "./vendor-vue-BUkfvXUI.js";
import { i as e, d as E, U as ce } from "./search.service-BNKrftAD.js";
import { i as de } from "./images-C_Un6BHf.js";
import { _ as ue } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const ge = {
  key: 0,
  class: "gh-modal-overlay"
}, he = ["aria-label"], pe = { class: "gh-modal-title-wrap" }, me = ["href"], ve = { class: "gh-owner" }, fe = { class: "gh-name" }, ye = { class: "gh-modal-actions" }, we = {
  key: 0,
  class: "gh-status-tip"
}, _e = {
  key: 1,
  class: "gh-status-tip gh-status-save"
}, be = ["title"], ke = ["disabled"], xe = ["title"], Ee = { class: "gh-modal-ribbon" }, Ce = { class: "gh-meta-badges" }, Le = {
  key: 0,
  class: "gh-meta-item gh-meta-zh",
  title: "当前已优先加载中文版 README"
}, Me = {
  class: "gh-meta-item gh-meta-stars",
  title: "Stars 关注数"
}, Te = {
  class: "gh-meta-item gh-meta-forks",
  title: "Forks 派生数"
}, De = {
  key: 1,
  class: "gh-meta-item gh-meta-lang",
  title: "主要编程语言"
}, Se = {
  key: 2,
  class: "gh-meta-item gh-meta-license",
  title: "开源许可证协议"
}, Ae = {
  key: 3,
  class: "gh-meta-item gh-meta-updated",
  title: "最后代码提交时间"
}, Re = {
  key: 0,
  class: "gh-modal-desc"
}, He = {
  key: 1,
  class: "gh-modal-topics"
}, Oe = { class: "gh-modal-body" }, Ue = {
  key: 0,
  class: "gh-status-tip"
}, $e = { class: "gh-toc-title" }, Pe = { class: "gh-toc-arrow" }, Ve = { class: "gh-toc-list" }, qe = ["onClick"], Ne = { class: "gh-toc-text" }, Be = {
  key: 2,
  class: "gh-readme-loading"
}, Fe = {
  key: 3,
  class: "gh-readme-error"
}, Ge = ["href"], ze = {
  key: 4,
  class: "gh-readme-loading"
}, Xe = ["innerHTML"], Ye = /* @__PURE__ */ se({
  __name: "GitHubRepoDetailDrawer",
  setup(Ie) {
    const m = g(""), C = g(""), h = g(!1), w = g(!1), k = g(null), P = g(null), _ = g(null), u = g(!document.hidden);
    let L = !0, M = 0, T = 0, D, W, S = () => {
    }, A = !1, V = 0, q = 0, R = 0, H = 0;
    function j(r) {
      if (r.target.closest("button, a, input")) return;
      S();
      const t = P.value;
      if (!t || !e.isOpen || !u.value) return;
      A = !0;
      const o = t.getBoundingClientRect();
      R = o.left, H = o.top, V = r.clientX, q = r.clientY, _.value = { x: R, y: H };
      const p = (v) => {
        if (!A) return;
        const x = v.clientX - V, f = v.clientY - q;
        _.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, R + x)),
          y: Math.max(10, Math.min(window.innerHeight - 80, H + f))
        };
      }, c = () => {
        A = !1, window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", c);
      };
      S = c, window.addEventListener("mousemove", p), window.addEventListener("mouseup", c);
    }
    function N() {
      E.close();
    }
    function K() {
      w.value = !w.value;
    }
    function O(r) {
      r.key === "Escape" && e.isOpen && N();
    }
    async function U(r, t) {
      if (!e.isOpen || !u.value) return;
      const o = M, p = ++T, c = () => e.isOpen && u.value && M === o && p === T;
      clearTimeout(D);
      try {
        await navigator.clipboard.writeText(r), c() && (m.value = `已复制 ${t}`);
      } catch {
        c() && (m.value = "复制未确认");
      }
      c() && (D = setTimeout(() => {
        c() && (m.value = "");
      }, 2e3));
    }
    function Z() {
      U(`git clone ${e.htmlUrl}.git`, "Clone 命令");
    }
    function J() {
      U(`px git clone ${e.htmlUrl}.git`, "px Clone 命令");
    }
    function Q(r) {
      const o = r.target?.closest("img");
      o && o.src && (r.preventDefault(), r.stopPropagation(), de.open({ source: o.src, title: o.alt || "图片预览" }));
    }
    function ee(r) {
      if (!k.value) return;
      const t = k.value.querySelectorAll("h1, h2, h3");
      for (const o of Array.from(t))
        if (o.textContent?.trim().includes(r.text)) {
          o.scrollIntoView({ behavior: "smooth", block: "start" }), h.value = !1;
          break;
        }
    }
    z(
      () => [e.readmeHtml, e.isOpen, u.value, e.revision],
      async ([r, t, o], p, c) => {
        let v = !1, x = 0;
        c(() => {
          v = !0, cancelAnimationFrame(x);
        }), !(!r || !t || !o) && (await ne(), !v && (x = requestAnimationFrame(() => {
          v || !e.isOpen || !u.value || k.value?.querySelectorAll("pre").forEach((f) => {
            if (f.querySelector(".gh-code-copy-btn")) return;
            const y = document.createElement("button");
            y.type = "button", y.className = "gh-code-copy-btn", y.title = "复制代码", y.innerText = "复制", y.addEventListener("click", (te) => {
              te.stopPropagation(), U(f.querySelector("code")?.innerText || "", "代码");
            }), f.style.position = "relative", f.appendChild(y);
          });
        })));
      }
    );
    function B() {
      ++M, ++T, clearTimeout(D), clearTimeout(W), m.value = "", C.value = "", h.value = !1, S();
    }
    z(() => [e.revision, e.isOpen, u.value], () => {
      B(), window.removeEventListener("keydown", O), e.isOpen && u.value && window.addEventListener("keydown", O);
    }, { immediate: !0, flush: "sync" });
    function b() {
      u.value = L && !document.hidden, E.setPageActive(u.value);
    }
    function F() {
      L = !1, b();
    }
    function G() {
      L = !0, b();
    }
    return oe(() => {
      document.addEventListener("visibilitychange", b), window.addEventListener("pagehide", F), window.addEventListener("pageshow", G), b();
    }), ae(() => {
      B(), E.setPageActive(!1), window.removeEventListener("keydown", O), document.removeEventListener("visibilitychange", b), window.removeEventListener("pagehide", F), window.removeEventListener("pageshow", G);
    }), (r, t) => n(e).isOpen ? (a(), i("div", ge, [
      s("div", {
        ref_key: "windowRef",
        ref: P,
        class: $(["gh-modal-window", { "is-expanded": w.value }]),
        style: re(_.value ? { position: "fixed", left: `${_.value.x}px`, top: `${_.value.y}px`, margin: "0" } : {}),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": n(e).fullName
      }, [
        s("header", {
          class: "gh-modal-header",
          onMousedown: j
        }, [
          s("div", pe, [
            t[4] || (t[4] = s("span", { class: "gh-modal-octo-icon" }, "🐙", -1)),
            s("a", {
              href: n(e).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-modal-repo-name",
              title: "在 GitHub 新标签页打开"
            }, [
              s("span", ve, l(n(e).owner), 1),
              t[2] || (t[2] = s("span", { class: "gh-sep" }, "/", -1)),
              s("strong", fe, l(n(e).repo), 1),
              t[3] || (t[3] = s("span", { class: "gh-external-arrow" }, "↗", -1))
            ], 8, me)
          ]),
          s("div", ye, [
            m.value ? (a(), i("span", we, l(m.value), 1)) : d("", !0),
            C.value ? (a(), i("span", _e, l(C.value), 1)) : d("", !0),
            s("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              title: "复制 git clone " + n(e).htmlUrl + ".git",
              onClick: Z
            }, [...t[5] || (t[5] = [
              s("span", null, "Clone", -1)
            ])], 8, be),
            s("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              title: "复制 px git clone (用于手机或代理环境)",
              onClick: J
            }, [...t[6] || (t[6] = [
              s("span", null, "px", -1)
            ])]),
            s("button", {
              type: "button",
              class: "gh-btn gh-btn-action",
              disabled: n(e).isLoading,
              onClick: t[0] || (t[0] = (o) => n(E).reload())
            }, "重读", 8, ke),
            s("button", {
              type: "button",
              class: "gh-btn gh-btn-expand",
              title: w.value ? "还原为 Steam 紧凑视窗" : "展开为宽屏视窗",
              onClick: K
            }, l(w.value ? "⛶" : "🗖"), 9, xe),
            s("button", {
              type: "button",
              class: "gh-btn gh-btn-close",
              title: "关闭视窗 (Esc)",
              onClick: N
            }, " ✕ ")
          ])
        ], 32),
        s("div", Ee, [
          s("div", Ce, [
            n(e).isZh ? (a(), i("span", Le, " 🇨🇳 中文版 ")) : d("", !0),
            s("span", Me, [
              t[7] || (t[7] = X(" ★ ", -1)),
              s("strong", null, l(n(e).stars.toLocaleString()), 1)
            ]),
            s("span", Te, [
              t[8] || (t[8] = X(" ⌥ ", -1)),
              s("strong", null, l(n(e).forks.toLocaleString()), 1)
            ]),
            n(e).language ? (a(), i("span", De, " 💻 " + l(n(e).language), 1)) : d("", !0),
            n(e).license ? (a(), i("span", Se, " 📄 " + l(n(e).license), 1)) : d("", !0),
            n(e).pushedAt ? (a(), i("span", Ae, " ⏱ " + l(n(ce)(n(e).pushedAt)), 1)) : d("", !0)
          ]),
          n(e).description ? (a(), i("p", Re, l(n(e).description), 1)) : d("", !0),
          n(e).topics.length ? (a(), i("div", He, [
            (a(!0), i(Y, null, I(n(e).topics, (o) => (a(), i("span", {
              key: o,
              class: "gh-topic-tag"
            }, " #" + l(o), 1))), 128))
          ])) : d("", !0)
        ]),
        s("main", Oe, [
          n(e).notice ? (a(), i("p", Ue, l(n(e).notice), 1)) : d("", !0),
          n(e).headings.length > 0 ? (a(), i("aside", {
            key: 1,
            class: $(["gh-modal-toc", { "is-open": h.value }])
          }, [
            s("div", {
              class: "gh-toc-header",
              onClick: t[1] || (t[1] = (o) => h.value = !h.value)
            }, [
              t[9] || (t[9] = s("span", { class: "gh-toc-icon" }, "📑", -1)),
              s("span", $e, "目录大纲 (" + l(n(e).headings.length) + ")", 1),
              s("span", Pe, l(h.value ? "▲" : "▼"), 1)
            ]),
            ie(s("ul", Ve, [
              (a(!0), i(Y, null, I(n(e).headings, (o, p) => (a(), i("li", {
                key: p,
                class: $(["gh-toc-item", `level-${o.level}`]),
                onClick: (c) => ee(o)
              }, [
                t[10] || (t[10] = s("span", { class: "gh-toc-bullet" }, "·", -1)),
                s("span", Ne, l(o.text), 1)
              ], 10, qe))), 128))
            ], 512), [
              [le, h.value]
            ])
          ], 2)) : d("", !0),
          n(e).isLoading ? (a(), i("div", Be, [
            t[11] || (t[11] = s("div", { class: "gh-spinner" }, null, -1)),
            s("span", null, "正在获取并排版 " + l(n(e).fullName) + " 的 README.md …", 1)
          ])) : n(e).error ? (a(), i("div", Fe, [
            t[12] || (t[12] = s("span", { class: "gh-error-icon" }, "⚠️", -1)),
            s("p", null, l(n(e).error), 1),
            s("a", {
              href: n(e).htmlUrl,
              target: "_blank",
              rel: "noreferrer",
              class: "gh-btn gh-btn-action"
            }, " 直接前往 GitHub 网页查看 ↗ ", 8, Ge)
          ])) : n(e).hasReadme && !n(e).readmeMarkdown ? (a(), i("p", ze, "README 内容为空。")) : (a(), i("article", {
            key: 5,
            ref_key: "readmeContainerRef",
            ref: k,
            class: "gh-readme-rendered obsidian-markdown-rendered allow-copy",
            innerHTML: n(e).readmeHtml,
            onClick: Q
          }, null, 8, Xe))
        ])
      ], 14, he)
    ])) : d("", !0);
  }
}), Je = /* @__PURE__ */ ue(Ye, [["__scopeId", "data-v-5093ead5"]]);
export {
  Je as default
};
