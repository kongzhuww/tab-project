import { m as d } from "./core-utils-KTt-RZby.js";
import { i as h } from "./image-viewer-store-DXesQk_J.js";
import { d as b, o as g, w, f as k, g as A, b as M } from "./vendor-vue-BbmU9NUg.js";
import { _ as y } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
function _(f) {
  let e = "";
  return f.replace(/\r\n?/g, `
`).split(`
`).map((a) => {
    const l = a.match(/^\s*(`{3,}|~{3,})/);
    if (l) {
      const s = l[1][0];
      return e ? e === s && (e = "") : e = s, a;
    }
    return e ? a : a.replace(/^(\s*)\\\[/, (s, r) => `${r}$$`).replace(/\\\](\s*)$/, (s, r) => `$$${r}`);
  }).join(`
`);
}
function v(f) {
  return d.renderMarkdown(_(f), { linkMode: "web", useFastRenderer: !1 });
}
const C = "http://www.w3.org/1999/xhtml", p = "http://www.w3.org/1998/Math/MathML", x = /* @__PURE__ */ new Set(["p", "br", "hr", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "del", "s", "ul", "ol", "li", "blockquote", "pre", "code", "a", "table", "thead", "tbody", "tr", "th", "td", "sup", "sub", "kbd", "aside"]), T = /* @__PURE__ */ new Set(["math", "mrow", "mi", "mn", "mo", "mfrac", "msqrt", "mroot", "msup", "msub", "msubsup", "mover", "mspace", "mstyle", "mtext"]), $ = /* @__PURE__ */ new Set(["script", "style", "iframe", "object", "embed", "svg", "img", "picture", "source", "video", "audio", "form", "input", "button", "link", "meta"]);
function N(f, e = document) {
  const a = e.createElement("template");
  a.innerHTML = f;
  const l = e.createDocumentFragment();
  function s(r, c) {
    if (r.nodeType === 3) {
      c.appendChild(e.createTextNode(r.textContent || ""));
      return;
    }
    if (r.nodeType !== 1) return;
    const n = r, o = n.localName.toLowerCase();
    if ($.has(o)) return;
    const m = n.namespaceURI === p && T.has(o);
    if (!(m || n.namespaceURI === C && x.has(o))) {
      for (const t of Array.from(n.childNodes)) s(t, c);
      return;
    }
    const i = m ? e.createElementNS(p, o) : e.createElement(o);
    if (o === "a" && !m) {
      const t = n.getAttribute("href") || "";
      try {
        const u = new URL(t);
        (u.protocol === "https:" || u.protocol === "http:" || u.protocol === "mailto:") && (i.setAttribute("href", u.href), i.setAttribute("target", "_blank"), i.setAttribute("rel", "noopener noreferrer"));
      } catch {
      }
    }
    if (o === "div" && !m && n.getAttribute("class") === "obs-math-block" && i.setAttribute("class", "obs-math-block"), (o === "th" || o === "td") && !m) {
      const t = (n.getAttribute("style") || "").match(/^text-align:\s*(left|center|right)$/i);
      t && i.setAttribute("style", `text-align:${t[1].toLowerCase()}`);
    }
    if (m && o === "math") {
      const t = n.getAttribute("display");
      (t === "block" || t === "inline") && i.setAttribute("display", t);
    }
    if (m && (o === "mstyle" || o === "mi")) {
      const t = n.getAttribute("mathvariant");
      (t === "bold" || t === "double-struck") && i.setAttribute("mathvariant", t);
    }
    m && o === "mspace" && n.getAttribute("linebreak") === "newline" && i.setAttribute("linebreak", "newline");
    for (const t of Array.from(n.childNodes)) s(t, i);
    c.appendChild(i);
  }
  for (const r of Array.from(a.content.childNodes)) s(r, l);
  return l;
}
const L = /* @__PURE__ */ b({
  __name: "MessageMarkdown",
  props: {
    content: {}
  },
  setup(f) {
    const e = f, a = M(null);
    function l() {
      if (a.value)
        try {
          a.value.replaceChildren(N(v(e.content || "")));
        } catch {
          a.value.textContent = e.content || "";
        }
    }
    function s(r) {
      const c = r.target;
      if (!(c instanceof HTMLImageElement) || c.closest("a[href]")) return;
      const n = c.currentSrc || c.getAttribute("src") || "";
      n && (r.preventDefault(), r.stopPropagation(), h.open(n, c.alt || "图片预览"));
    }
    return g(l), w(() => e.content, l, { flush: "post" }), (r, c) => (k(), A("div", {
      ref_key: "container",
      ref: a,
      class: "message-markdown",
      onClick: s
    }, null, 512));
  }
}), B = /* @__PURE__ */ y(L, [["__scopeId", "data-v-f6af2a1d"]]);
export {
  B as default
};
