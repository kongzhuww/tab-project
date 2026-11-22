import { a as X, r as z, d as K, o as H, e as J, f as c, g as p, u as n, l as A, j as h, h as e, t as k, p as I, v as $, n as W, T as q, F as G, D as Q, b as F } from "./vendor-vue-_upDT3S_.js";
import { o as Z, _ as tt } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { n as et } from "./store-BodPoZPS.js";
import { e as x, t as ot } from "./window-manager.store-D2fEf4ic.js";
const L = "firecrawlApiUrl";
async function R() {
  const i = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(L))[L] : localStorage.getItem(L);
  return typeof i == "string" ? i.trim().replace(/\/+$/, "") : "";
}
function V(i) {
  const l = i.trim().replace(/\/+$/, "");
  if (l) {
    const r = new URL(l);
    if (!["http:", "https:"].includes(r.protocol) || r.username || r.password || r.search || r.hash) throw new Error("invalid-endpoint");
  }
  return l;
}
async function nt(i) {
  const l = V(i);
  typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [L]: l }) : localStorage.setItem(L, l);
}
class C {
  constructor() {
  }
  static getInstance() {
    return C.instance || (C.instance = new C()), C.instance;
  }
  async scrape(l) {
    const r = l.trim();
    if (!r)
      throw new Error("请输入有效的网页网址");
    const b = new URL(r);
    if (!["http:", "https:"].includes(b.protocol) || b.username || b.password)
      throw new Error("请输入 http/https 网页网址，不要在网址中携带账号密码");
    let u;
    try {
      let m;
      try {
        m = V(await R());
      } catch {
        throw new Error("Firecrawl 节点配置不可用，请打开右上角节点设置检查");
      }
      if (!m) throw new Error("尚未配置 Firecrawl 节点，请在右上角节点设置中填写服务地址");
      const y = new AbortController();
      u = setTimeout(() => y.abort(), 35e3);
      const w = await fetch(`${m}/v1/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: r }),
        signal: y.signal
      });
      if (!w.ok) {
        const _ = await w.text().catch(() => "");
        throw new Error(`Firecrawl 响应异常 (${w.status}): ${_.slice(0, 150)}`);
      }
      const v = await w.json();
      if (!v.success || !v.data)
        throw new Error(v.error || "Firecrawl 未能提取到网页内容");
      const E = String(v.data.markdown || "").trim(), g = v.data.metadata || {}, M = String(g.title || r.replace(/^https?:\/\//, "")).trim(), S = String(g.description || "").trim();
      return {
        success: !0,
        url: r,
        title: M,
        markdown: E,
        description: S,
        charCount: E.length,
        statusCode: g.statusCode || 200
      };
    } catch (m) {
      const w = m?.name === "AbortError" ? "Firecrawl 网页解析超时 (超过 35 秒)，请检查网络或目标网站响应" : m?.message || "Firecrawl 网页提取失败";
      return {
        success: !1,
        url: r,
        title: r,
        markdown: "",
        charCount: 0,
        error: w
      };
    } finally {
      u !== void 0 && clearTimeout(u);
    }
  }
}
const rt = C.getInstance(), t = z({
  isOpen: !1,
  isLoading: !1,
  url: "",
  title: "",
  markdown: "",
  description: "",
  charCount: 0,
  copied: !1,
  error: null
}), s = X(t), f = {
  state: t,
  open(i = "") {
    t.isOpen = !0, x.firecrawl = !0, i.trim() && this.scrape(i);
  },
  close() {
    t.isOpen = !1, x.firecrawl = !1;
  },
  reset() {
    t.url = "", t.title = "", t.markdown = "", t.description = "", t.charCount = 0, t.copied = !1, t.error = null, t.isLoading = !1;
  },
  async scrape(i) {
    const l = i.trim();
    if (l) {
      t.isOpen = !0, x.firecrawl = !0, t.isLoading = !0, t.url = l, t.title = l.replace(/^https?:\/\//, ""), t.markdown = "", t.description = "", t.charCount = 0, t.copied = !1, t.error = null;
      try {
        const r = await rt.scrape(l);
        t.isLoading = !1, r.success ? (t.title = r.title, t.markdown = r.markdown, t.description = r.description || "", t.charCount = r.charCount) : t.error = r.error || "提炼失败";
      } catch (r) {
        t.isLoading = !1, t.error = r?.message || "网络请求异常";
      }
    }
  },
  async copy() {
    if (t.markdown)
      try {
        await navigator.clipboard.writeText(t.markdown), t.copied = !0, setTimeout(() => t.copied = !1, 2e3), et.fetch("Firecrawl", "已复制", "网页 Markdown 内容已成功复制到剪贴板");
      } catch {
        const i = document.createElement("textarea");
        i.value = t.markdown, document.body.appendChild(i), i.select(), document.execCommand("copy"), i.remove(), t.copied = !0, setTimeout(() => t.copied = !1, 2e3);
      }
  },
  openOriginal() {
    t.url && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: t.url, active: !0 }) : window.open(t.url, "_blank"));
  }
}, st = {
  key: 0,
  class: "fc-modal-overlay"
}, at = { class: "fc-modal-title" }, it = ["title"], lt = {
  key: 0,
  class: "fc-count-pill"
}, ct = { class: "fc-modal-actions" }, dt = ["aria-expanded"], ut = { class: "fc-input-banner" }, pt = { class: "fc-input-wrapper" }, ft = ["disabled"], wt = {
  key: 0,
  class: "fc-sub-url-bar"
}, mt = ["title"], yt = { class: "fc-url-tools" }, vt = { class: "fc-modal-body" }, gt = {
  key: 0,
  class: "fc-loading-box"
}, ht = {
  key: 1,
  class: "fc-error-box"
}, kt = { class: "fc-error-msg" }, bt = {
  key: 2,
  class: "fc-empty-intro-box"
}, Ct = {
  key: 3,
  class: "fc-editor-container"
}, xt = {
  key: 1,
  class: "fc-modal-footer"
}, Et = { class: "fc-footer-btns" }, Mt = /* @__PURE__ */ K({
  __name: "FirecrawlModal",
  setup(i) {
    const l = Q(() => import("./EndpointSettingsPanel-OlNMJRr4.js")), r = F(!1), b = F(null), u = F(""), m = F(null), y = F(null);
    let w = !1, v = 0, E = 0, g = 0, M = 0;
    function S() {
      r.value = !1, f.close(), ot.close("firecrawl");
    }
    function _() {
      const d = u.value.trim();
      d && f.scrape(d);
    }
    async function D() {
      try {
        const d = await navigator.clipboard.readText();
        d?.trim() && (u.value = d.trim(), _());
      } catch {
      }
    }
    function B() {
      f.reset(), u.value = "";
    }
    function N(d) {
      if (d.target.closest("button, a, input")) return;
      w = !0;
      const o = m.value;
      if (!o) return;
      const a = o.getBoundingClientRect();
      g = a.left, M = a.top, v = d.clientX, E = d.clientY, y.value = { x: g, y: M };
      const T = (U) => {
        if (!w) return;
        const Y = U.clientX - v, j = U.clientY - E;
        y.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, g + Y)),
          y: Math.max(10, Math.min(window.innerHeight - 80, M + j))
        };
      }, P = () => {
        w = !1, window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", P);
      };
      window.addEventListener("mousemove", T), window.addEventListener("mouseup", P);
    }
    function O(d) {
      d.key === "Escape" && (s.isOpen || x.firecrawl) && S();
    }
    return H(() => {
      window.addEventListener("keydown", O);
    }), J(() => {
      window.removeEventListener("keydown", O);
    }), (d, o) => (c(), p(G, null, [
      r.value && (n(s).isOpen || n(x).firecrawl) ? (c(), A(n(l), {
        key: 0,
        anchor: b.value,
        label: "Firecrawl 节点设置",
        hint: "填写 Firecrawl 服务根地址（不含 /v1/scrape）。沿用已保存配置；不再回退到写死的个人 VPS。保存不发起抓取。",
        load: n(R),
        save: n(nt),
        onClose: o[0] || (o[0] = (a) => r.value = !1)
      }, null, 8, ["anchor", "load", "save"])) : h("", !0),
      (c(), A(q, { to: "body" }, [
        n(s).isOpen || n(x).firecrawl ? (c(), p("div", st, [
          e("div", {
            ref_key: "windowRef",
            ref: m,
            class: "fc-modal-window",
            style: W(y.value ? { position: "fixed", left: `${y.value.x}px`, top: `${y.value.y}px`, margin: "0" } : {}),
            role: "dialog",
            "aria-modal": "false"
          }, [
            e("header", {
              class: "fc-modal-header",
              onMousedown: N
            }, [
              e("div", at, [
                o[9] || (o[9] = e("span", { class: "fc-brand-icon" }, "⚡", -1)),
                e("span", {
                  class: "fc-title-text",
                  title: n(s).title || "Firecrawl 网页提炼便签"
                }, k(n(s).title || "Firecrawl 网页提炼"), 9, it),
                n(s).charCount ? (c(), p("span", lt, k(n(s).charCount) + " 字 ", 1)) : h("", !0)
              ]),
              e("div", ct, [
                e("button", {
                  id: "firecrawl-settings-open",
                  ref_key: "settingsAnchor",
                  ref: b,
                  type: "button",
                  class: "fc-action-btn",
                  title: "Firecrawl 节点设置",
                  "aria-expanded": r.value,
                  onClick: o[1] || (o[1] = (a) => r.value = !r.value)
                }, "⚙️", 8, dt),
                n(s).markdown ? (c(), p("button", {
                  key: 0,
                  type: "button",
                  class: "fc-action-btn",
                  title: "复制全部 Markdown",
                  onClick: o[2] || (o[2] = //@ts-ignore
                  (...a) => n(f).copy && n(f).copy(...a))
                }, k(n(s).copied ? "✓ 已复制" : "📋 复制"), 1)) : h("", !0),
                e("button", {
                  type: "button",
                  class: "fc-action-btn close",
                  title: "关闭便签视窗",
                  onClick: S
                }, " ✕ ")
              ])
            ], 32),
            e("div", ut, [
              e("div", pt, [
                o[10] || (o[10] = e("span", { class: "fc-input-prefix" }, "🔗", -1)),
                I(e("input", {
                  "onUpdate:modelValue": o[3] || (o[3] = (a) => u.value = a),
                  class: "fc-url-input",
                  type: "url",
                  placeholder: "请粘贴文章或网页网址 (http/https)...",
                  onKeydown: o[4] || (o[4] = (a) => n(Z)(a, _))
                }, null, 544), [
                  [$, u.value]
                ]),
                u.value ? h("", !0) : (c(), p("button", {
                  key: 0,
                  type: "button",
                  class: "fc-paste-quick-btn",
                  title: "读取剪贴板网址并直接提炼",
                  onClick: D
                }, " 粘贴 ")),
                e("button", {
                  type: "button",
                  class: "fc-scrape-submit-btn",
                  disabled: !u.value.trim() || n(s).isLoading,
                  onClick: _
                }, k(n(s).isLoading ? "提炼中…" : "⚡ 提炼"), 9, ft)
              ])
            ]),
            n(s).url ? (c(), p("div", wt, [
              e("span", {
                class: "fc-url-text",
                title: n(s).url
              }, k(n(s).url), 9, mt),
              e("div", yt, [
                e("button", {
                  type: "button",
                  class: "fc-open-ext-link",
                  title: "在浏览器打开原网页",
                  onClick: o[5] || (o[5] = //@ts-ignore
                  (...a) => n(f).openOriginal && n(f).openOriginal(...a))
                }, " 原网页 ↗ "),
                e("button", {
                  type: "button",
                  class: "fc-open-ext-link reset",
                  title: "提炼新网页",
                  onClick: B
                }, " 换一个 ‹ ")
              ])
            ])) : h("", !0),
            e("div", vt, [
              n(s).isLoading ? (c(), p("div", gt, [...o[11] || (o[11] = [
                e("div", { class: "fc-spinner" }, null, -1),
                e("p", { class: "fc-loading-text" }, "⚡ Firecrawl 正在穿透解析网页…", -1),
                e("span", { class: "fc-loading-sub" }, "调用 VPS 无头浏览器执行渲染并剥离广告噪声，转为纯净 Markdown", -1)
              ])])) : n(s).error ? (c(), p("div", ht, [
                o[12] || (o[12] = e("span", { class: "fc-error-icon" }, "⚠️", -1)),
                o[13] || (o[13] = e("strong", { class: "fc-error-title" }, "网页解析未能完成", -1)),
                e("p", kt, k(n(s).error), 1),
                e("button", {
                  type: "button",
                  class: "fc-open-orig-btn",
                  onClick: o[6] || (o[6] = //@ts-ignore
                  (...a) => n(f).openOriginal && n(f).openOriginal(...a))
                }, " 直接在浏览器打开原网页 ↗ ")
              ])) : n(s).markdown ? (c(), p("div", Ct, [
                I(e("textarea", {
                  "onUpdate:modelValue": o[7] || (o[7] = (a) => n(s).markdown = a),
                  class: "fc-editor-textarea",
                  placeholder: "Firecrawl 提炼出的 Markdown 文本…",
                  spellcheck: "false"
                }, null, 512), [
                  [$, n(s).markdown]
                ])
              ])) : (c(), p("div", bt, [...o[14] || (o[14] = [
                e("span", { class: "fc-empty-icon" }, "🌐", -1),
                e("strong", null, "Firecrawl 网页深度提取与归档", -1),
                e("p", null, "在上方输入任意技术博客、文章或文档网址，自动通过 VPS Playwright 无头浏览器提取纯净 Markdown，免除一切广告与杂质！", -1),
                e("div", { class: "fc-empty-hints" }, [
                  e("span", null, "✓ 支持单页应用与 JS 动态渲染"),
                  e("span", null, "✓ 自动去除侧边栏与页脚广告"),
                  e("span", null, "✓ 提取后可一键复制纯净 Markdown")
                ], -1)
              ])]))
            ]),
            n(s).markdown ? (c(), p("footer", xt, [
              o[15] || (o[15] = e("div", { class: "fc-footer-info" }, [
                e("span", { class: "fc-engine-tag" }, "Engine: VPS Firecrawl v1 (Playwright)")
              ], -1)),
              e("div", Et, [
                e("button", {
                  type: "button",
                  class: "fc-btn-primary",
                  onClick: o[8] || (o[8] = //@ts-ignore
                  (...a) => n(f).copy && n(f).copy(...a))
                }, k(n(s).copied ? "✓ 已复制全部" : "📋 复制 Markdown"), 1)
              ])
            ])) : h("", !0)
          ], 4)
        ])) : h("", !0)
      ]))
    ], 64));
  }
}), Ot = /* @__PURE__ */ tt(Mt, [["__scopeId", "data-v-3a534f32"]]);
export {
  Ot as default
};
