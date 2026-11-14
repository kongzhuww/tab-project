class C {
  constructor() {
    this.currentSession = null, this.suppressClickUntil = 0;
  }
  static getInstance() {
    return C.instance || (C.instance = new C()), C.instance;
  }
  getCurrentSession() {
    return this.currentSession;
  }
  shouldSuppressClick() {
    return Date.now() < this.suppressClickUntil;
  }
  // ==========================================================================
  // FLIP 弹性重排动画 (First-Last-Invert-Play)
  // ==========================================================================
  animateFlip(t, n) {
    if (!t || !n) return;
    const o = [...t.children].filter(
      (e) => e.nodeType === 1 && !e.classList.contains("launcher-kinetic-ghost") && !e.classList.contains("launcher-kinetic-placeholder") && !e.classList.contains("launcher-empty")
    ), l = new Map(o.map((e) => [e, e.getBoundingClientRect()]));
    n(), !(typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) && o.forEach((e) => {
      if (!e.isConnected) return;
      const u = l.get(e);
      if (!u) return;
      const d = e.getBoundingClientRect(), a = u.left - d.left, c = u.top - d.top;
      if (Math.abs(a) < 0.5 && Math.abs(c) < 0.5) return;
      e.getAnimations().filter((i) => i.id === "launcher-flip").forEach((i) => i.cancel());
      const f = e.animate(
        [{ transform: `translate3d(${a}px,${c}px,0)` }, { transform: "translate3d(0,0,0)" }],
        { duration: 115, easing: "cubic-bezier(.16,.94,.2,1)" }
      );
      f.id = "launcher-flip";
    });
  }
  // ==========================================================================
  // 占位符位置与迟滞死区判定 (Hysteresis Deadzone)
  // ==========================================================================
  placePreview(t, n, o) {
    if (!t?.started || this.currentSession !== t) return;
    const l = document.elementsFromPoint(n, o), r = document.querySelector("#launcher-folder-dialog, .launcher-folder-dialog"), e = !!(r?.hasAttribute?.("open") || window.LogicWeaverLauncherFolder?.state?.isOpen), u = !t.isFolder && e, d = u ? l.map((b) => b.closest?.("#launcher-folder-dialog-items, .launcher-folder-dialog-items")).find(Boolean) : null;
    if (u) {
      if (document.querySelectorAll(".launcher-link.merge-target").forEach((b) => b.classList.remove("merge-target")), t.mergeTarget = null, d) {
        const b = document.getElementById("launcher-folder-dialog-items") || d;
        t.folderDropElement?.classList.remove("launcher-folder-drop-active"), t.folderDropElement = b;
        const $ = window.LogicWeaverLauncherFolder?.state?.activeFolder || null;
        t.folderTarget = $ && t.groupName !== $ ? $ : null, b.classList.add("launcher-folder-drop-active"), r?.classList.add("drop-hover-valid"), window.LogicWeaverLauncherFolder?.setDropHoverValid?.(!0);
      } else
        this.clearFolderDrop(t);
      return;
    }
    const a = performance.now();
    if (t._lastSwapTime && a - t._lastSwapTime < 70) return;
    const c = l.find(
      (b) => b.classList?.contains("launcher-site-items") || b.classList?.contains("launcher-items") || b.classList?.contains("launcher-folder-grid")
    ) || t.card.parentElement;
    if (!c) return;
    this.clearFolderDrop(t);
    const f = [...c.children].filter(
      (b) => b.nodeType === 1 && b !== t.card && !b.classList.contains("launcher-kinetic-ghost") && !b.classList.contains("launcher-empty") && (b.classList.contains("launcher-link") || b.classList.contains("launcher-folder"))
    );
    if (!f.length) {
      t.card.parentElement !== c && (this.animateFlip(c, () => c.appendChild(t.card)), t.reference = null, t.targetContainer = c, t._lastSwapTime = a);
      return;
    }
    let i = null, s = 1 / 0, h = null;
    for (const b of f) {
      const $ = b.getBoundingClientRect(), k = $.left + $.width / 2, y = $.top + $.height / 2, E = Math.hypot(n - k, o - y);
      E < s && (s = E, i = b, h = $);
    }
    if (!i || !h) return;
    if (!t.isFolder && i.classList.contains("launcher-folder") && n >= h.left && n <= h.right && o >= h.top && o <= h.bottom) {
      document.querySelectorAll(".launcher-link.merge-target").forEach(($) => $.classList.remove("merge-target")), t.mergeTarget = null, t.folderDropElement !== i && (t.folderDropElement?.classList.remove("launcher-folder-drop-active"), t.folderDropElement = i, t.folderTarget = i.dataset.launcherFolder || null, i.classList.add("launcher-folder-drop-active"));
      return;
    }
    if (!t.isFolder && !t.folderTarget && i.classList.contains("launcher-link") && s < Math.min(h.width, h.height) * 0.24) {
      i.classList.add("merge-target"), t.mergeTarget = i;
      return;
    }
    if (document.querySelectorAll(".launcher-link.merge-target").forEach((b) => b.classList.remove("merge-target")), t.mergeTarget = null, t.card.parentElement !== c) {
      const $ = n > h.left + h.width * 0.5 ? i.nextElementSibling : i;
      t._lastSwapTime = a, this.animateFlip(c, () => {
        $ ? c.insertBefore(t.card, $) : c.appendChild(t.card);
      }), t.reference = $, t.targetContainer = c;
      return;
    }
    const m = t.card.getBoundingClientRect(), w = Math.hypot(n - (m.left + m.width / 2), o - (m.top + m.height / 2));
    if (s >= w - 16) return;
    const g = !!(t.card.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_FOLLOWING) ? i.nextElementSibling : i;
    (g ? t.card.nextElementSibling === g : t.card === c.lastElementChild) || (t._lastSwapTime = a, this.animateFlip(c, () => {
      g ? c.insertBefore(t.card, g) : c.appendChild(t.card);
    }), t.reference = g, t.targetContainer = c);
  }
  clearFolderDrop(t) {
    t?.folderDropElement?.classList.remove("launcher-folder-drop-active"), document.querySelectorAll(".launcher-folder-dialog, #launcher-folder-dialog").forEach((n) => n.classList.remove("drop-hover-valid")), document.querySelectorAll(".launcher-folder.launcher-folder-drop-active").forEach((n) => n.classList.remove("launcher-folder-drop-active")), window.LogicWeaverLauncherFolder?.setDropHoverValid?.(!1), t && (t.folderDropElement = null, t.folderTarget = null);
  }
  beginDrag(t) {
    if (t.started || this.currentSession !== t) return;
    t.started = !0, t.reducedMotion = typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const n = t.card.getBoundingClientRect();
    t.offsetX = t.startX - n.left, t.offsetY = t.startY - n.top, t.x = n.left, t.y = n.top, t.targetX = n.left, t.targetY = n.top;
    const o = t.card.cloneNode(!0);
    t.ghost = o, o.className = `${t.card.className} launcher-kinetic-ghost`, o.removeAttribute("tabindex"), o.removeAttribute("title"), o.setAttribute("aria-hidden", "true"), o.querySelectorAll("button,input,a,[tabindex]").forEach((l) => l.setAttribute("tabindex", "-1")), o.style.width = `${n.width}px`, o.style.height = `${n.height}px`, t.card.classList.add("launcher-kinetic-placeholder"), document.body.appendChild(o), document.body.classList.add("launcher-kinetic-active"), this.paintLoop(t);
  }
  paintLoop(t) {
    this.currentSession !== t || !t.started || !t.ghost || (t.x += (t.targetX - t.x) * (t.reducedMotion ? 1 : 0.92), t.y += (t.targetY - t.y) * (t.reducedMotion ? 1 : 0.92), t.ghost.style.transform = `translate3d(${t.x}px,${t.y}px,0) scale(1.02)`, t.raf = requestAnimationFrame(() => this.paintLoop(t)));
  }
  finishDrag(t, n = !0, o = !1, l) {
    if (!t || this.currentSession !== t) return;
    t.cleanup?.(), cancelAnimationFrame(t.raf), t.previewRaf && cancelAnimationFrame(t.previewRaf);
    const r = t.card;
    try {
      r.releasePointerCapture(t.pointerId);
    } catch {
    }
    if (r.draggable = !1, !t.started) {
      this.currentSession = null;
      return;
    }
    this.suppressClickUntil = Date.now() + 450, this.clearFolderDrop(t), !n && t.sourceList?.isConnected && this.animateFlip(t.sourceList, () => {
      t.sourceNext?.isConnected ? t.sourceList?.insertBefore(t.card, t.sourceNext) : t.sourceList?.appendChild(t.card);
    });
    const e = r.getBoundingClientRect(), u = async () => {
      if (t.ghost?.remove(), r.classList.remove("launcher-kinetic-placeholder"), document.body.classList.remove("launcher-kinetic-active"), this.currentSession = null, !n) return;
      if (!t.isFolder && t.folderTarget) {
        l?.onMoveToFolder && t.linkId && await l.onMoveToFolder(t.linkId, t.folderTarget);
        return;
      }
      if (t.mergeTarget) {
        const m = t.mergeTarget.dataset.launcherId;
        m && t.linkId && l?.onStackLinks && await l.onStackLinks(t.linkId, m);
        return;
      }
      const a = r.parentElement;
      if (!a) return;
      const c = [...a.children].filter(
        (m) => m.classList.contains("launcher-link") || m.classList.contains("launcher-folder")
      ), f = c.indexOf(r);
      if (f < 0) return;
      const i = c[f + 1], s = c[f - 1], h = t.isFolder ? { kind: "folder", group: t.groupName } : { kind: "link", id: t.linkId };
      if (i && l?.onReorder) {
        const m = i.classList.contains("launcher-folder") ? { kind: "folder", group: i.dataset.launcherFolder } : { kind: "link", id: i.dataset.launcherId };
        await l.onReorder(h, m, "before");
      } else if (s && l?.onReorder) {
        const m = s.classList.contains("launcher-folder") ? { kind: "folder", group: s.dataset.launcherFolder } : { kind: "link", id: s.dataset.launcherId };
        await l.onReorder(h, m, "after");
      }
    };
    if (o || !t.ghost?.isConnected || typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      u();
      return;
    }
    const d = t.ghost.animate(
      [
        { transform: `translate3d(${t.x}px,${t.y}px,0) scale(1.02)` },
        { transform: `translate3d(${e.left}px,${e.top}px,0) scale(1)` }
      ],
      { duration: 105, easing: "cubic-bezier(.14,.96,.2,1)" }
    );
    d.addEventListener("finish", () => {
      u();
    }, { once: !0 }), d.addEventListener("cancel", () => {
      u();
    }, { once: !0 });
  }
}
const _ = C.getInstance();
typeof window < "u" && (window.LogicWeaverKineticDrag = _);
const D = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  vartheta: "ϑ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  varpi: "ϖ",
  rho: "ρ",
  varrho: "ϱ",
  sigma: "σ",
  varsigma: "ς",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  varphi: "ϕ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Xi: "Ξ",
  Pi: "Π",
  Sigma: "Σ",
  Upsilon: "Υ",
  Phi: "Φ",
  Psi: "Ψ",
  Omega: "Ω"
}, I = {
  pm: "±",
  mp: "∓",
  times: "×",
  div: "÷",
  cdot: "·",
  ast: "∗",
  star: "⋆",
  circ: "∘",
  bullet: "•",
  cap: "∩",
  cup: "∪",
  uplus: "⊎",
  sqcap: "⊓",
  sqcup: "⊔",
  vee: "∨",
  wedge: "∧",
  setminus: "∖",
  wr: "≀",
  leq: "≤",
  le: "≤",
  geq: "≥",
  ge: "≥",
  neq: "≠",
  ne: "≠",
  approx: "≈",
  equiv: "≡",
  sim: "∼",
  simeq: "≃",
  propto: "∝",
  ll: "≪",
  gg: "≫",
  in: "∈",
  notin: "∉",
  ni: "∋",
  subset: "⊂",
  supset: "⊃",
  subseteq: "⊆",
  supseteq: "⊇",
  forall: "∀",
  exists: "∃",
  nexists: "∄",
  empty: "∅",
  emptyset: "∅",
  infty: "∞",
  partial: "∂",
  nabla: "∇",
  int: "∫",
  iint: "∬",
  iiint: "∭",
  oint: "∮",
  sum: "∑",
  prod: "∏",
  coprod: "∐",
  leftarrow: "←",
  gets: "←",
  rightarrow: "→",
  to: "→",
  leftrightarrow: "↔",
  Leftarrow: "⇐",
  Rightarrow: "⇒",
  implies: "⇒",
  Leftrightarrow: "⇔",
  iff: "⇔",
  uparrow: "↑",
  downarrow: "↓",
  updownarrow: "↕",
  dots: "…",
  cdots: "⋯",
  vdots: "⋮",
  ddots: "⋱",
  hbar: "ℏ",
  ell: "ℓ",
  Re: "ℜ",
  Im: "ℑ",
  wp: "℘",
  angle: "∠",
  top: "⊤",
  bot: "⊥",
  vdash: "⊢",
  models: "⊨",
  dag: "†",
  ddag: "‡",
  flat: "♭",
  natural: "♮",
  sharp: "♯"
}, q = /* @__PURE__ */ new Set([
  "sin",
  "cos",
  "tan",
  "cot",
  "sec",
  "csc",
  "arcsin",
  "arccos",
  "arctan",
  "sinh",
  "cosh",
  "tanh",
  "coth",
  "exp",
  "log",
  "ln",
  "lg",
  "lim",
  "min",
  "max",
  "sup",
  "inf",
  "det",
  "dim",
  "ker",
  "deg",
  "gcd",
  "hom",
  "arg"
]), R = {
  vec: "→",
  bar: "¯",
  hat: "^",
  dot: "˙",
  ddot: "¨",
  tilde: "~",
  overline: "¯",
  underline: "_"
}, N = {
  R: "ℝ",
  N: "ℕ",
  Z: "ℤ",
  Q: "ℚ",
  C: "ℂ",
  P: "ℙ",
  H: "ℍ"
};
function M(S) {
  return String(S).replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[t] || t);
}
function v(S) {
  return String(S).replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t] || t);
}
function L(S) {
  return v(S);
}
class F {
  static getInstance() {
    return F.instance || (F.instance = new F()), F.instance;
  }
  // ==========================================================================
  // LaTeX 语法递归下降 AST 编译为标准 MathML Core
  // ==========================================================================
  latexToMathML(t, n = !1) {
    if (!t || typeof t != "string") return "";
    const o = t.trim();
    if (!o) return "";
    function l(r) {
      let e = 0;
      const u = r.length, d = [];
      function a() {
        for (; e < u && /\s/.test(r[e]); ) e++;
      }
      function c() {
        if (a(), e >= u) return "";
        if (r[e] === "{") {
          e++;
          let i = 1;
          const s = e;
          for (; e < u && i > 0; )
            r[e] === "{" && r[e - 1] !== "\\" ? i++ : r[e] === "}" && r[e - 1] !== "\\" && i--, e++;
          return r.slice(s, e - 1);
        }
        if (r[e] === "\\") {
          const i = e;
          for (e++; e < u && /[a-zA-Z]/.test(r[e]); ) e++;
          return r.slice(i, e);
        }
        const f = r[e];
        return e++, f;
      }
      for (; e < u && (a(), !(e >= u)); ) {
        const f = r[e];
        if ((f === "}" || f === "&" || f === "\\") && f === "\\") {
          if (e++, e < u && (r[e] === "\\" || r[e] === " ")) {
            e++, d.push("<mspace linebreak='newline'/>");
            continue;
          }
          let s = "";
          for (; e < u && /[a-zA-Z]/.test(r[e]); ) s += r[e++];
          if (!s) {
            if (e < u) {
              const h = r[e++];
              d.push(`<mo>${M(h)}</mo>`);
            }
            continue;
          }
          if (s === "frac") {
            const h = c(), m = c();
            d.push(`<mfrac><mrow>${l(h)}</mrow><mrow>${l(m)}</mrow></mfrac>`);
            continue;
          }
          if (s === "sqrt") {
            a();
            let h = "";
            if (e < u && r[e] === "[") {
              e++;
              const w = e;
              for (; e < u && r[e] !== "]"; ) e++;
              h = r.slice(w, e), e < u && r[e] === "]" && e++;
            }
            const m = c();
            h ? d.push(`<mroot><mrow>${l(m)}</mrow><mrow>${l(h)}</mrow></mroot>`) : d.push(`<msqrt><mrow>${l(m)}</mrow></msqrt>`);
            continue;
          }
          if (R[s]) {
            const h = c();
            d.push(`<mover><mrow>${l(h)}</mrow><mo>${M(R[s])}</mo></mover>`);
            continue;
          }
          if (s === "mathbf" || s === "boldsymbol") {
            const h = c();
            d.push(`<mstyle mathvariant='bold'>${l(h)}</mstyle>`);
            continue;
          }
          if (s === "mathbb") {
            const h = c().trim();
            d.push(`<mi mathvariant='double-struck'>${M(N[h] || h)}</mi>`);
            continue;
          }
          if (s === "text" || s === "mathrm") {
            const h = c();
            d.push(`<mtext>${M(h)}</mtext>`);
            continue;
          }
          if (D[s]) {
            d.push(`<mi>${M(D[s])}</mi>`);
            continue;
          }
          if (I[s]) {
            d.push(`<mo>${M(I[s])}</mo>`);
            continue;
          }
          if (q.has(s)) {
            d.push(`<mi class='obs-math-fn'>${M(s)}</mi>`);
            continue;
          }
          d.push(`<mi>${M(s)}</mi>`);
          continue;
        }
        let i = "";
        if (/[0-9]/.test(f)) {
          let s = "";
          for (; e < u && /[0-9.]/.test(r[e]); ) s += r[e++];
          i = `<mn>${s}</mn>`;
        } else if (/[a-zA-Z]/.test(f))
          i = `<mi>${f}</mi>`, e++;
        else if (f === "{") {
          e++;
          const s = e;
          let h = 1;
          for (; e < u && h > 0; )
            r[e] === "{" && r[e - 1] !== "\\" ? h++ : r[e] === "}" && r[e - 1] !== "\\" && h--, e++;
          i = `<mrow>${l(r.slice(s, e - 1))}</mrow>`;
        } else
          i = `<mo>${M(f)}</mo>`, e++;
        for (; e < u && (a(), e < u && (r[e] === "^" || r[e] === "_")); ) {
          const s = r[e] === "^";
          e++;
          const h = c(), m = `<mrow>${l(h)}</mrow>`;
          if (a(), e < u && r[e] === (s ? "_" : "^")) {
            e++;
            const w = c(), T = `<mrow>${l(w)}</mrow>`;
            i = `<msubsup>${i}${s ? T : m}${s ? m : T}</msubsup>`;
          } else
            i = s ? `<msup>${i}${m}</msup>` : `<msub>${i}${m}</msub>`;
        }
        d.push(i);
      }
      return d.join("");
    }
    try {
      const r = l(o);
      return `<math xmlns="http://www.w3.org/1998/Math/MathML"${n ? ' display="block"' : ' display="inline"'}${n ? ' class="obs-math-block"' : ' class="obs-math-inline"'} data-latex="${L(o)}">${r}</math>`;
    } catch (r) {
      return console.warn("[MarkdownAst] LaTeX parse fallback:", r), `<span class="obs-math-error" title="${L(r?.message || String(r))}">${v(o)}</span>`;
    }
  }
  isValidInlineLatex(t) {
    const n = t.trim();
    if (!n || n.length > 200 || t.startsWith(" ") || t.endsWith(" ") || /^[\d,.]+[a-zA-Z%]*$/.test(n) || /[\u4e00-\u9fa5]/.test(n) && !n.includes("\\")) return !1;
    const o = /\\[a-zA-Z]+/.test(n), l = /[\^_]\{?[a-zA-Z0-9+\-=]\}?/.test(n), r = /[=<>+\-*/]/.test(n) && /[a-zA-Z]/.test(n);
    return o || l || r;
  }
  isTableDelimiterRow(t) {
    if (!t) return !1;
    const n = t.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    if (!n.includes("|")) return !1;
    const o = n.replace(/^\||\|$/g, "").split("|");
    return o.length ? o.every((l) => /^\s*:?-+:?\s*$/.test(l)) : !1;
  }
  parseTableAlignments(t) {
    return t.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|").replace(/^\||\|$/g, "").split("|").map((l) => {
      const r = l.trim(), e = r.startsWith(":"), u = r.endsWith(":");
      return e && u ? "center" : u ? "right" : "left";
    });
  }
  tableCells(t, n) {
    if (!t) return [];
    const o = t.trim().replace(/\uff5c/g, "|");
    let l = o.split("|").map((r) => r.trim());
    return o.startsWith("|") && o.endsWith("|") && l.length >= 3 ? l = l.slice(1, -1) : o.endsWith("|") ? l = l.slice(0, -1) : o.startsWith("|") && n && l.length > n && (l = l.slice(1)), l;
  }
  // ==========================================================================
  // Markdown AST 分块与纯文本语法编译
  // ==========================================================================
  splitFrontmatter(t) {
    const n = t.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
    return n ? { frontmatter: n[1], body: t.slice(n[0].length) } : { frontmatter: "", body: t };
  }
  normalizeMarkdownHtml(t) {
    const n = [];
    let o = String(t).replace(/```[\s\S]*?```/g, (l) => `\0FENCE${n.push(l) - 1}\0`).replace(/\$\$[\s\S]*?\$\$/g, (l) => `\0FENCE${n.push(l) - 1}\0`);
    return o = o.replace(/<!--[\s\S]*?-->/g, ""), o = o.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>\s*<picture\b[^>]*>([\s\S]*?)<\/picture>\s*<\/a>/gi, (l, r, e) => `[${e.match(/<img\b[^>]*alt=["']([^"']*)["']/i)?.[1] || "查看图片"}](${r})`), o = o.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi, (l, r, e) => `[${e.trim() || r}](${r})`), o = o.replace(/<img\b([^>]*)\/?>/gi, (l, r) => {
      const e = r.match(/\bsrc=["']([^"']+)["']/i) || r.match(/\bdata-src=["']([^"']+)["']/i), u = r.match(/\balt=["']([^"']*)["']/i), d = e ? e[1] : "", a = u ? u[1] : "";
      return d ? `![${a}](${d})` : "";
    }), o = o.replace(/<(https?:\/\/[^>\s]+)>/gi, (l, r) => `[${r}](${r})`), o = o.replace(/<([\w.+-]+@[\w.-]+\.[A-Za-z]{2,})>/g, (l, r) => `[${r}](mailto:${r})`), o = o.replace(/<br\s*\/?>/gi, `
`), o = o.replace(/<\/?(?:a|picture|source|sub|details|summary|b|input|button)\b[^>]*>/gi, ""), o.replace(/\u0000FENCE(\d+)\u0000/g, (l, r) => n[Number(r)] || "");
  }
  extractFootnotes(t) {
    const n = t.replace(/\r\n?/g, `
`).split(`
`), o = [], l = /* @__PURE__ */ new Map();
    for (let r = 0; r < n.length; r++) {
      const e = n[r].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
      if (!e) {
        o.push(n[r]);
        continue;
      }
      const u = [e[2]];
      for (; r + 1 < n.length && /^(?: {2,}|\t)\S/.test(n[r + 1]); ) u.push(n[++r].trim());
      const d = e[1].trim();
      l.has(d) || l.set(d, { id: d, number: l.size + 1, text: u.join(" ").trim() });
    }
    return { body: o.join(`
`), definitions: l };
  }
  inlineMarkdown(t, n = {}) {
    const o = [], l = [], r = [];
    let e = String(t);
    (n.renderMode || "rendered") !== "md" && (e = e.replace(/(?<![\w\\$])\$(?!\s|\d)(.+?)(?<!\s)\$(?![\w$])/g, (a, c) => this.isValidInlineLatex(c) ? `\0MATH${r.push(this.latexToMathML(c.trim(), !1)) - 1}\0` : a), e = e.replace(/\\\(([\s\S]+?)\\\)/g, (a, c) => this.isValidInlineLatex(c) ? `\0MATH${r.push(this.latexToMathML(c.trim(), !1)) - 1}\0` : a)), e = e.replace(/<span\s+class=["'](category|vocabulary|definition)["']\s*>|<\/span>/gi, (a, c) => {
      const f = c ? `<span class="${c.toLowerCase()}">` : "</span>";
      return `\0SEM${l.push(f) - 1}\0`;
    }).replace(/`([^`]+)`/g, (a, c) => `\0CODE${o.push(`<code class="obs-inline-code">${v(c)}</code>`) - 1}\0`);
    const d = [];
    return n.linkMode === "web" && (e = e.replace(/<\/?(?:a|img)\b[^>]*\/?>/gi, (a) => `\0HTML${d.push(a) - 1}\0`)), e = e.replace(/<\/?(?:h[1-6]|p|div|span|hr|br|sup|sub|strong|b|em|i|u|s|del|kbd|details|summary|table|thead|tbody|tr|th|td|ul|ol|li|picture|source)\b[^>]*\/?>/gi, (a) => /on\w+\s*=/i.test(a) || /javascript:/i.test(a) ? "" : `\0HTML${d.push(a) - 1}\0`), e = v(e), e = e.replace(/\u0000HTML(\d+)\u0000/g, (a, c) => d[Number(c)] || ""), e = e.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (a, c, f) => {
      const i = c.trim(), s = f.trim(), m = /^https?:\/\//i.test(s) || s.startsWith("data:") ? `src="${L(s)}"` : `src="" data-vault-src="${L(s)}"`, w = i ? `<figcaption class="obs-media-caption">${v(i)}</figcaption>` : "";
      return `<figure class="obs-media-figure"><img class="obs-rendered-img" ${m} alt="${L(i)}" loading="lazy" referrerpolicy="no-referrer">${w}</figure>`;
    }), e = e.replace(/!\[\[([^\]]+)\]\]/g, (a, c) => {
      const [f, i] = c.trim().split("|"), s = f.trim();
      if (/\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i.test(s)) {
        const m = parseInt(i, 10), w = m > 0 ? `style="max-width:${m}px;"` : "";
        return `<figure class="obs-media-figure"><img class="obs-rendered-img" src="" data-vault-src="${L(s)}" alt="${L(s)}" ${w} loading="lazy" referrerpolicy="no-referrer"><figcaption class="obs-media-caption">${v(s)}</figcaption></figure>`;
      }
      return `<span class="obs-embed">◫ ${v(c)}</span>`;
    }), e = e.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (a, c, f, i) => `<a class="obs-wikilink" href="#" data-target="${L(c.trim())}">${v(i || c)}${f ? ` › ${v(f)}` : ""}</a>`), e = e.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (a, c, f) => {
      const i = f.trim();
      if (n.linkMode !== "web" && /\.md(?:#.*)?$/i.test(i)) {
        const s = i.split("#")[0].replace(/\\/g, "/").split("/").pop()?.replace(/\.md$/i, "") || i;
        return `<a class="obs-wikilink" href="#" data-target="${L(s)}">${c}</a>`;
      }
      return n.linkMode === "web" && i.startsWith("#") ? `<a href="${L(i)}">${c}</a>` : /^https?:\/\//i.test(i) || /^mailto:/i.test(i) ? `<a class="obs-external-link" href="${L(i)}" target="_blank" rel="noopener noreferrer">${c}</a>` : `<span class="obs-relative-link" title="${L(i)}">${c}</span>`;
    }), e = e.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/~~([^~]+)~~/g, "<del>$1</del>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>"), e = e.replace(/(^|\s)(#[\p{L}\p{N}_/-]+)/gu, '$1<span class="obs-tag-inline" data-tag="$2">$2</span>'), e = e.replace(/\u0000CODE(\d+)\u0000/g, (a, c) => o[Number(c)] || ""), e = e.replace(/\u0000SEM(\d+)\u0000/g, (a, c) => l[Number(c)] || ""), e = e.replace(/\u0000MATH(\d+)\u0000/g, (a, c) => r[Number(c)] || ""), e;
  }
  renderMarkdown(t, n = {}) {
    if (n.renderMode !== "md" && n.useFastRenderer !== !1 && A) {
      const i = A(t);
      if (typeof i == "string")
        return i;
    }
    const { frontmatter: o, body: l } = this.splitFrontmatter(t), e = this.extractFootnotes(this.normalizeMarkdownHtml(l)).body.replace(/\u00a0/g, " ").replace(/\r\n?/g, `
`).split(`
`), u = n.renderMode || "rendered";
    let d = "", a = 0, c = 0, f = 0;
    for (; a < e.length; ) {
      const i = e[a];
      if (/^\s*\$\$/.test(i)) {
        const p = [];
        let g = i.replace(/^\s*\$\$/, "");
        if (g.endsWith("$$") && g.length >= 2)
          p.push(g.slice(0, -2)), a++;
        else {
          for (p.push(g), a++; a < e.length && !e[a].includes("$$"); )
            p.push(e[a++]);
          if (a < e.length) {
            const b = e[a].indexOf("$$");
            p.push(e[a].slice(0, b)), a++;
          }
        }
        const x = p.join(`
`).trim();
        u === "md" ? d += `<pre class="obs-code-block obs-math-raw"><span class="obs-code-lang">latex</span><code>${v(x)}</code></pre>` : d += `<div class="obs-math-block">${this.latexToMathML(x, !0)}</div>`;
        continue;
      }
      if (/^```/.test(i)) {
        const p = i.slice(3).trim(), g = [];
        for (a++; a < e.length && !/^```/.test(e[a]); ) g.push(e[a++]);
        a++, (p === "latex" || p === "math") && u !== "md" ? d += `<div class="obs-math-block">${this.latexToMathML(g.join(`
`).trim(), !0)}</div>` : d += `<pre class="obs-code-block"><span class="obs-code-lang">${v(p || "code")}</span><code>${v(g.join(`
`))}</code></pre>`;
        continue;
      }
      const s = i.match(/^(#{1,6})\s+(.+)$/);
      if (s) {
        const p = s[1].length, g = s[2];
        d += `<h${p} class="obs-h${p}">${this.inlineMarkdown(g, n)}</h${p}>`, a++;
        continue;
      }
      if (/^\s*(---+|___+|\*\*\*+|——+|───+)\s*$/.test(i)) {
        d += "<hr>", a++;
        continue;
      }
      const h = i.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (h) {
        const p = h[1].toLowerCase() === "x";
        d += `<div class="obs-task-item ${p ? "checked" : ""}"><input class="obs-task-cb" data-task-idx="${c++}" type="checkbox" ${p ? "checked" : ""}><span class="obs-task-label">${this.inlineMarkdown(h[2], n)}</span></div>`, a++;
        continue;
      }
      if (/^>\s?/.test(i)) {
        const p = [];
        for (; a < e.length && /^>\s?/.test(e[a]); ) p.push(e[a++].replace(/^>\s?/, ""));
        const g = p[0]?.match(/^\[!(\w+)\][+-]?\s*(.*)$/i);
        g ? d += `<aside class="obs-callout obs-callout-${L(g[1].toLowerCase())}"><strong>${v(g[2] || g[1])}</strong>${p.slice(1).map((x) => `<p>${this.inlineMarkdown(x, n)}</p>`).join("")}</aside>` : d += `<blockquote class="obs-quote">${p.map((x) => this.inlineMarkdown(x, n)).join("<br>")}</blockquote>`;
        continue;
      }
      if (/^\s*[-*+]\s+/.test(i)) {
        const p = [];
        for (; a < e.length && /^\s*[-*+]\s+/.test(e[a]); ) p.push(e[a++].replace(/^\s*[-*+]\s+/, ""));
        d += `<ul>${p.map((g) => `<li>${this.inlineMarkdown(g, n)}</li>`).join("")}</ul>`;
        continue;
      }
      let m = -1;
      if ((i.includes("|") || i.includes("｜")) && (a + 1 < e.length && this.isTableDelimiterRow(e[a + 1]) ? m = a + 1 : a + 2 < e.length && !e[a + 1].trim() && this.isTableDelimiterRow(e[a + 2]) && (m = a + 2)), m !== -1) {
        const p = this.tableCells(i), g = this.parseTableAlignments(e[m]);
        a = m + 1;
        const x = [];
        for (; a < e.length; ) {
          if (!e[a].trim()) {
            let y = a + 1;
            for (; y < e.length && !e[y].trim(); ) y++;
            if (y < e.length && (e[y].includes("|") || e[y].includes("｜")) && !this.isTableDelimiterRow(e[y]))
              a = y;
            else
              break;
          }
          const $ = e[a];
          if (!$.includes("|") && !$.includes("｜")) break;
          const k = this.tableCells($, p.length);
          for (; k.length < p.length; ) k.push("");
          x.push(k), a++;
        }
        const b = f++;
        d += `<div class="obs-table-wrap" data-table-index="${b}"><table><thead><tr>${p.map(($, k) => `<th style="text-align:${g[k] || "left"}">${this.inlineMarkdown($, n)}</th>`).join("")}</tr></thead><tbody>${x.map(($) => `<tr>${$.map((k, y) => `<td style="text-align:${g[y] || "left"}">${this.inlineMarkdown(k, n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        continue;
      }
      if (!i.trim()) {
        a++;
        continue;
      }
      const w = [i];
      for (a++; a < e.length && e[a].trim() && !/^(```|#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\$\s*)/.test(e[a]) && !(e[a].includes("|") && this.isTableDelimiterRow(e[a + 1])); )
        w.push(e[a++]);
      const T = w.join(`
`).trim();
      if (/^<([a-z0-9_-]+)[^>]*>/i.test(T) && /<\/([a-z0-9_-]+)>\s*$/i.test(T))
        d += this.inlineMarkdown(T.replace(/\r?\n/g, " "), n) + `
`;
      else {
        const p = w.map((g, x) => {
          const b = /(?: {2,}|\\)$/.test(g), $ = g.replace(/(?: {2,}|\\)$/, ""), k = this.inlineMarkdown($, n);
          return x < w.length - 1 ? b ? k + "<br>" : k + " " : k;
        }).join("");
        d += `<p>${p}</p>
`;
      }
    }
    return d;
  }
  extractWikilinks(t) {
    const n = [], o = t.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g);
    for (const l of o)
      l[1] && n.push(l[1].trim());
    return [...new Set(n)];
  }
  extractTags(t) {
    const n = [], o = t.matchAll(/(?:^|\s)(#[\p{L}\p{N}_/-]+)/gu);
    for (const l of o)
      l[1] && n.push(l[1].trim());
    return [...new Set(n)];
  }
}
const H = F.getInstance();
let A = null;
function B(S) {
  A = S;
}
export {
  _ as k,
  H as m,
  B as r
};
