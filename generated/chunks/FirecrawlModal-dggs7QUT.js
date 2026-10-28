import { a as j, r as X, d as z, C as H, y as J, o as c, e as p, u as o, c as U, g, f as e, t as k, l as $, n as I, k as W, i as q, A as G, j as Q, F as Z, E as tt, b as F } from "./vendor-vue-DokqDua_.js";
import { n as et } from "./view-styles-BS2802be.js";
import { e as x, t as ot } from "./window-manager.store-D_Nuf9-p.js";
import { _ as nt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const L = "firecrawlApiUrl";
async function R() {
  const a = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(L))[L] : localStorage.getItem(L);
  return typeof a == "string" ? a.trim().replace(/\/+$/, "") : "";
}
function V(a) {
  const l = a.trim().replace(/\/+$/, "");
  if (l) {
    const r = new URL(l);
    if (!["http:", "https:"].includes(r.protocol) || r.username || r.password || r.search || r.hash) throw new Error("invalid-endpoint");
  }
  return l;
}
async function rt(a) {
  const l = V(a);
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
      const h = await w.json();
      if (!h.success || !h.data)
        throw new Error(h.error || "Firecrawl 未能提取到网页内容");
      const M = String(h.data.markdown || "").trim(), v = h.data.metadata || {}, E = String(v.title || r.replace(/^https?:\/\//, "")).trim(), S = String(v.description || "").trim();
      return {
        success: !0,
        url: r,
        title: E,
        markdown: M,
        description: S,
        charCount: M.length,
        statusCode: v.statusCode || 200
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
const st = C.getInstance(), t = X({
  isOpen: !1,
  isLoading: !1,
  url: "",
  title: "",
  markdown: "",
  description: "",
  charCount: 0,
  copied: !1,
  error: null
}), s = j(t), f = {
  state: t,
  open(a = "") {
    t.isOpen = !0, x.firecrawl = !0, a.trim() && this.scrape(a);
  },
  close() {
    t.isOpen = !1, x.firecrawl = !1;
  },
  reset() {
    t.url = "", t.title = "", t.markdown = "", t.description = "", t.charCount = 0, t.copied = !1, t.error = null, t.isLoading = !1;
  },
  async scrape(a) {
    const l = a.trim();
    if (l) {
      t.isOpen = !0, x.firecrawl = !0, t.isLoading = !0, t.url = l, t.title = l.replace(/^https?:\/\//, ""), t.markdown = "", t.description = "", t.charCount = 0, t.copied = !1, t.error = null;
      try {
        const r = await st.scrape(l);
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
        const a = document.createElement("textarea");
        a.value = t.markdown, document.body.appendChild(a), a.select(), document.execCommand("copy"), a.remove(), t.copied = !0, setTimeout(() => t.copied = !1, 2e3);
      }
  },
  openOriginal() {
    t.url && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: t.url, active: !0 }) : window.open(t.url, "_blank"));
  }
}, at = {
  key: 0,
  class: "fc-modal-overlay"
}, it = { class: "fc-modal-title" }, lt = ["title"], ct = {
  key: 0,
  class: "fc-count-pill"
}, dt = { class: "fc-modal-actions" }, ut = ["aria-expanded"], pt = { class: "fc-input-banner" }, ft = { class: "fc-input-wrapper" }, wt = ["onKeydown"], mt = ["disabled"], yt = {
  key: 0,
  class: "fc-sub-url-bar"
}, ht = ["title"], vt = { class: "fc-url-tools" }, gt = { class: "fc-modal-body" }, kt = {
  key: 0,
  class: "fc-loading-box"
}, bt = {
  key: 1,
  class: "fc-error-box"
}, Ct = { class: "fc-error-msg" }, xt = {
  key: 2,
  class: "fc-empty-intro-box"
}, Mt = {
  key: 3,
  class: "fc-editor-container"
}, Et = {
  key: 1,
  class: "fc-modal-footer"
}, _t = { class: "fc-footer-btns" }, Ft = /* @__PURE__ */ z({
  __name: "FirecrawlModal",
  setup(a) {
    const l = tt(() => import("./EndpointSettingsPanel-mD4-7kT6.js")), r = F(!1), b = F(null), u = F(""), m = F(null), y = F(null);
    let w = !1, h = 0, M = 0, v = 0, E = 0;
    function S() {
      r.value = !1, f.close(), ot.close("firecrawl");
    }
    function _() {
      const d = u.value.trim();
      d && f.scrape(d);
    }
    async function B() {
      try {
        const d = await navigator.clipboard.readText();
        d?.trim() && (u.value = d.trim(), _());
      } catch {
      }
    }
    function D() {
      f.reset(), u.value = "";
    }
    function K(d) {
      if (d.target.closest("button, a, input")) return;
      w = !0;
      const n = m.value;
      if (!n) return;
      const i = n.getBoundingClientRect();
      v = i.left, E = i.top, h = d.clientX, M = d.clientY, y.value = { x: v, y: E };
      const P = (A) => {
        if (!w) return;
        const N = A.clientX - h, Y = A.clientY - M;
        y.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, v + N)),
          y: Math.max(10, Math.min(window.innerHeight - 80, E + Y))
        };
      }, T = () => {
        w = !1, window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", T);
      };
      window.addEventListener("mousemove", P), window.addEventListener("mouseup", T);
    }
    function O(d) {
      d.key === "Escape" && (s.isOpen || x.firecrawl) && S();
    }
    return H(() => {
      window.addEventListener("keydown", O);
    }), J(() => {
      window.removeEventListener("keydown", O);
    }), (d, n) => (c(), p(Z, null, [
      r.value && (o(s).isOpen || o(x).firecrawl) ? (c(), U(o(l), {
        key: 0,
        anchor: b.value,
        label: "Firecrawl 节点设置",
        hint: "填写 Firecrawl 服务根地址（不含 /v1/scrape）。沿用已保存配置；不再回退到写死的个人 VPS。保存不发起抓取。",
        load: o(R),
        save: o(rt),
        onClose: n[0] || (n[0] = (i) => r.value = !1)
      }, null, 8, ["anchor", "load", "save"])) : g("", !0),
      (c(), U(Q, { to: "body" }, [
        o(s).isOpen || o(x).firecrawl ? (c(), p("div", at, [
          e("div", {
            ref_key: "windowRef",
            ref: m,
            class: "fc-modal-window",
            style: G(y.value ? { position: "fixed", left: `${y.value.x}px`, top: `${y.value.y}px`, margin: "0" } : {}),
            role: "dialog",
            "aria-modal": "false"
          }, [
            e("header", {
              class: "fc-modal-header",
              onMousedown: K
            }, [
              e("div", it, [
                n[8] || (n[8] = e("span", { class: "fc-brand-icon" }, "⚡", -1)),
                e("span", {
                  class: "fc-title-text",
                  title: o(s).title || "Firecrawl 网页提炼便签"
                }, k(o(s).title || "Firecrawl 网页提炼"), 9, lt),
                o(s).charCount ? (c(), p("span", ct, k(o(s).charCount) + " 字 ", 1)) : g("", !0)
              ]),
              e("div", dt, [
                e("button", {
                  id: "firecrawl-settings-open",
                  ref_key: "settingsAnchor",
                  ref: b,
                  type: "button",
                  class: "fc-action-btn",
                  title: "Firecrawl 节点设置",
                  "aria-expanded": r.value,
                  onClick: n[1] || (n[1] = (i) => r.value = !r.value)
                }, "⚙️", 8, ut),
                o(s).markdown ? (c(), p("button", {
                  key: 0,
                  type: "button",
                  class: "fc-action-btn",
                  title: "复制全部 Markdown",
                  onClick: n[2] || (n[2] = //@ts-ignore
                  (...i) => o(f).copy && o(f).copy(...i))
                }, k(o(s).copied ? "✓ 已复制" : "📋 复制"), 1)) : g("", !0),
                e("button", {
                  type: "button",
                  class: "fc-action-btn close",
                  title: "关闭便签视窗",
                  onClick: S
                }, " ✕ ")
              ])
            ], 32),
            e("div", pt, [
              e("div", ft, [
                n[9] || (n[9] = e("span", { class: "fc-input-prefix" }, "🔗", -1)),
                $(e("input", {
                  "onUpdate:modelValue": n[3] || (n[3] = (i) => u.value = i),
                  class: "fc-url-input",
                  type: "url",
                  placeholder: "请粘贴文章或网页网址 (http/https)...",
                  onKeydown: W(q(_, ["prevent"]), ["enter"])
                }, null, 40, wt), [
                  [I, u.value]
                ]),
                u.value ? g("", !0) : (c(), p("button", {
                  key: 0,
                  type: "button",
                  class: "fc-paste-quick-btn",
                  title: "读取剪贴板网址并直接提炼",
                  onClick: B
                }, " 粘贴 ")),
                e("button", {
                  type: "button",
                  class: "fc-scrape-submit-btn",
                  disabled: !u.value.trim() || o(s).isLoading,
                  onClick: _
                }, k(o(s).isLoading ? "提炼中…" : "⚡ 提炼"), 9, mt)
              ])
            ]),
            o(s).url ? (c(), p("div", yt, [
              e("span", {
                class: "fc-url-text",
                title: o(s).url
              }, k(o(s).url), 9, ht),
              e("div", vt, [
                e("button", {
                  type: "button",
                  class: "fc-open-ext-link",
                  title: "在浏览器打开原网页",
                  onClick: n[4] || (n[4] = //@ts-ignore
                  (...i) => o(f).openOriginal && o(f).openOriginal(...i))
                }, " 原网页 ↗ "),
                e("button", {
                  type: "button",
                  class: "fc-open-ext-link reset",
                  title: "提炼新网页",
                  onClick: D
                }, " 换一个 ‹ ")
              ])
            ])) : g("", !0),
            e("div", gt, [
              o(s).isLoading ? (c(), p("div", kt, [...n[10] || (n[10] = [
                e("div", { class: "fc-spinner" }, null, -1),
                e("p", { class: "fc-loading-text" }, "⚡ Firecrawl 正在穿透解析网页…", -1),
                e("span", { class: "fc-loading-sub" }, "调用 VPS 无头浏览器执行渲染并剥离广告噪声，转为纯净 Markdown", -1)
              ])])) : o(s).error ? (c(), p("div", bt, [
                n[11] || (n[11] = e("span", { class: "fc-error-icon" }, "⚠️", -1)),
                n[12] || (n[12] = e("strong", { class: "fc-error-title" }, "网页解析未能完成", -1)),
                e("p", Ct, k(o(s).error), 1),
                e("button", {
                  type: "button",
                  class: "fc-open-orig-btn",
                  onClick: n[5] || (n[5] = //@ts-ignore
                  (...i) => o(f).openOriginal && o(f).openOriginal(...i))
                }, " 直接在浏览器打开原网页 ↗ ")
              ])) : o(s).markdown ? (c(), p("div", Mt, [
                $(e("textarea", {
                  "onUpdate:modelValue": n[6] || (n[6] = (i) => o(s).markdown = i),
                  class: "fc-editor-textarea",
                  placeholder: "Firecrawl 提炼出的 Markdown 文本…",
                  spellcheck: "false"
                }, null, 512), [
                  [I, o(s).markdown]
                ])
              ])) : (c(), p("div", xt, [...n[13] || (n[13] = [
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
            o(s).markdown ? (c(), p("footer", Et, [
              n[14] || (n[14] = e("div", { class: "fc-footer-info" }, [
                e("span", { class: "fc-engine-tag" }, "Engine: VPS Firecrawl v1 (Playwright)")
              ], -1)),
              e("div", _t, [
                e("button", {
                  type: "button",
                  class: "fc-btn-primary",
                  onClick: n[7] || (n[7] = //@ts-ignore
                  (...i) => o(f).copy && o(f).copy(...i))
                }, k(o(s).copied ? "✓ 已复制全部" : "📋 复制 Markdown"), 1)
              ])
            ])) : g("", !0)
          ], 4)
        ])) : g("", !0)
      ]))
    ], 64));
  }
}), Tt = /* @__PURE__ */ nt(Ft, [["__scopeId", "data-v-6175f03a"]]);
export {
  Tt as default
};
