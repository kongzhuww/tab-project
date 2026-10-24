class S {
  constructor() {
    this.currentSession = null, this.suppressClickUntil = 0;
  }
  static getInstance() {
    return S.instance || (S.instance = new S()), S.instance;
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
    const c = [...t.children].filter(
      (e) => e.nodeType === 1 && !e.classList.contains("launcher-kinetic-ghost") && !e.classList.contains("launcher-kinetic-placeholder") && !e.classList.contains("launcher-empty")
    ), l = new Map(c.map((e) => [e, e.getBoundingClientRect()]));
    n(), !(typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) && c.forEach((e) => {
      if (!e.isConnected) return;
      const u = l.get(e);
      if (!u) return;
      const d = e.getBoundingClientRect(), a = u.left - d.left, o = u.top - d.top;
      if (Math.abs(a) < 0.5 && Math.abs(o) < 0.5) return;
      e.getAnimations().filter((i) => i.id === "launcher-flip").forEach((i) => i.cancel());
      const f = e.animate(
        [{ transform: `translate3d(${a}px,${o}px,0)` }, { transform: "translate3d(0,0,0)" }],
        { duration: 115, easing: "cubic-bezier(.16,.94,.2,1)" }
      );
      f.id = "launcher-flip";
    });
  }
  // ==========================================================================
  // 占位符位置与迟滞死区判定 (Hysteresis Deadzone)
  // ==========================================================================
  placePreview(t, n, c) {
    if (!t?.started || this.currentSession !== t) return;
    const l = document.elementsFromPoint(n, c), r = document.querySelector("#launcher-folder-dialog, .launcher-folder-dialog"), e = !!(r?.hasAttribute?.("open") || window.LogicWeaverLauncherFolder?.state?.isOpen), u = !t.isFolder && e, d = u ? l.map((g) => g.closest?.("#launcher-folder-dialog-items, .launcher-folder-dialog-items")).find(Boolean) : null;
    if (u) {
      if (document.querySelectorAll(".launcher-link.merge-target").forEach((g) => g.classList.remove("merge-target")), t.mergeTarget = null, d) {
        const g = document.getElementById("launcher-folder-dialog-items") || d;
        t.folderDropElement?.classList.remove("launcher-folder-drop-active"), t.folderDropElement = g;
        const b = window.LogicWeaverLauncherFolder?.state?.activeFolder || null;
        t.folderTarget = b && t.groupName !== b ? b : null, g.classList.add("launcher-folder-drop-active"), r?.classList.add("drop-hover-valid"), window.LogicWeaverLauncherFolder?.setDropHoverValid?.(!0);
      } else
        this.clearFolderDrop(t);
      return;
    }
    const a = performance.now();
    if (t._lastSwapTime && a - t._lastSwapTime < 70) return;
    const o = l.find(
      (g) => g.classList?.contains("launcher-site-items") || g.classList?.contains("launcher-items") || g.classList?.contains("launcher-folder-grid")
    ) || t.card.parentElement;
    if (!o) return;
    this.clearFolderDrop(t);
    const f = [...o.children].filter(
      (g) => g.nodeType === 1 && g !== t.card && !g.classList.contains("launcher-kinetic-ghost") && !g.classList.contains("launcher-empty") && (g.classList.contains("launcher-link") || g.classList.contains("launcher-folder"))
    );
    if (!f.length) {
      t.card.parentElement !== o && (this.animateFlip(o, () => o.appendChild(t.card)), t.reference = null, t.targetContainer = o, t._lastSwapTime = a);
      return;
    }
    let i = null, s = 1 / 0, h = null;
    for (const g of f) {
      const b = g.getBoundingClientRect(), L = b.left + b.width / 2, I = b.top + b.height / 2, A = Math.hypot(n - L, c - I);
      A < s && (s = A, i = g, h = b);
    }
    if (!i || !h) return;
    if (!t.isFolder && i.classList.contains("launcher-folder") && n >= h.left && n <= h.right && c >= h.top && c <= h.bottom) {
      document.querySelectorAll(".launcher-link.merge-target").forEach((b) => b.classList.remove("merge-target")), t.mergeTarget = null, t.folderDropElement !== i && (t.folderDropElement?.classList.remove("launcher-folder-drop-active"), t.folderDropElement = i, t.folderTarget = i.dataset.launcherFolder || null, i.classList.add("launcher-folder-drop-active"));
      return;
    }
    if (!t.isFolder && !t.folderTarget && i.classList.contains("launcher-link") && s < Math.min(h.width, h.height) * 0.24) {
      i.classList.add("merge-target"), t.mergeTarget = i;
      return;
    }
    if (document.querySelectorAll(".launcher-link.merge-target").forEach((g) => g.classList.remove("merge-target")), t.mergeTarget = null, t.card.parentElement !== o) {
      const b = n > h.left + h.width * 0.5 ? i.nextElementSibling : i;
      t._lastSwapTime = a, this.animateFlip(o, () => {
        b ? o.insertBefore(t.card, b) : o.appendChild(t.card);
      }), t.reference = b, t.targetContainer = o;
      return;
    }
    const m = t.card.getBoundingClientRect(), v = Math.hypot(n - (m.left + m.width / 2), c - (m.top + m.height / 2));
    if (s >= v - 16) return;
    const w = !!(t.card.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_FOLLOWING) ? i.nextElementSibling : i;
    (w ? t.card.nextElementSibling === w : t.card === o.lastElementChild) || (t._lastSwapTime = a, this.animateFlip(o, () => {
      w ? o.insertBefore(t.card, w) : o.appendChild(t.card);
    }), t.reference = w, t.targetContainer = o);
  }
  clearFolderDrop(t) {
    t?.folderDropElement?.classList.remove("launcher-folder-drop-active"), document.querySelectorAll(".launcher-folder-dialog, #launcher-folder-dialog").forEach((n) => n.classList.remove("drop-hover-valid")), document.querySelectorAll(".launcher-folder.launcher-folder-drop-active").forEach((n) => n.classList.remove("launcher-folder-drop-active")), window.LogicWeaverLauncherFolder?.setDropHoverValid?.(!1), t && (t.folderDropElement = null, t.folderTarget = null);
  }
  beginDrag(t) {
    if (t.started || this.currentSession !== t) return;
    t.started = !0, t.reducedMotion = typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const n = t.card.getBoundingClientRect();
    t.offsetX = t.startX - n.left, t.offsetY = t.startY - n.top, t.x = n.left, t.y = n.top, t.targetX = n.left, t.targetY = n.top;
    const c = t.card.cloneNode(!0);
    t.ghost = c, c.className = `${t.card.className} launcher-kinetic-ghost`, c.removeAttribute("tabindex"), c.removeAttribute("title"), c.setAttribute("aria-hidden", "true"), c.querySelectorAll("button,input,a,[tabindex]").forEach((l) => l.setAttribute("tabindex", "-1")), c.style.width = `${n.width}px`, c.style.height = `${n.height}px`, t.card.classList.add("launcher-kinetic-placeholder"), document.body.appendChild(c), document.body.classList.add("launcher-kinetic-active"), this.paintLoop(t);
  }
  paintLoop(t) {
    this.currentSession !== t || !t.started || !t.ghost || (t.x += (t.targetX - t.x) * (t.reducedMotion ? 1 : 0.92), t.y += (t.targetY - t.y) * (t.reducedMotion ? 1 : 0.92), t.ghost.style.transform = `translate3d(${t.x}px,${t.y}px,0) scale(1.02)`, t.raf = requestAnimationFrame(() => this.paintLoop(t)));
  }
  finishDrag(t, n = !0, c = !1, l) {
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
      const o = [...a.children].filter(
        (m) => m.classList.contains("launcher-link") || m.classList.contains("launcher-folder")
      ), f = o.indexOf(r);
      if (f < 0) return;
      const i = o[f + 1], s = o[f - 1], h = t.isFolder ? { kind: "folder", group: t.groupName } : { kind: "link", id: t.linkId };
      if (i && l?.onReorder) {
        const m = i.classList.contains("launcher-folder") ? { kind: "folder", group: i.dataset.launcherFolder } : { kind: "link", id: i.dataset.launcherId };
        await l.onReorder(h, m, "before");
      } else if (s && l?.onReorder) {
        const m = s.classList.contains("launcher-folder") ? { kind: "folder", group: s.dataset.launcherFolder } : { kind: "link", id: s.dataset.launcherId };
        await l.onReorder(h, m, "after");
      }
    };
    if (c || !t.ghost?.isConnected || typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
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
const R = S.getInstance();
typeof window < "u" && (window.LogicWeaverKineticDrag = R);
const E = {
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
}, F = {
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
]), D = {
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
function y(T) {
  return String(T).replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[t] || t);
}
function k(T) {
  return String(T).replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t] || t);
}
function x(T) {
  return k(T);
}
class M {
  static getInstance() {
    return M.instance || (M.instance = new M()), M.instance;
  }
  // ==========================================================================
  // LaTeX 语法递归下降 AST 编译为标准 MathML Core
  // ==========================================================================
  latexToMathML(t, n = !1) {
    if (!t || typeof t != "string") return "";
    const c = t.trim();
    if (!c) return "";
    function l(r) {
      let e = 0;
      const u = r.length, d = [];
      function a() {
        for (; e < u && /\s/.test(r[e]); ) e++;
      }
      function o() {
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
              d.push(`<mo>${y(h)}</mo>`);
            }
            continue;
          }
          if (s === "frac") {
            const h = o(), m = o();
            d.push(`<mfrac><mrow>${l(h)}</mrow><mrow>${l(m)}</mrow></mfrac>`);
            continue;
          }
          if (s === "sqrt") {
            a();
            let h = "";
            if (e < u && r[e] === "[") {
              e++;
              const v = e;
              for (; e < u && r[e] !== "]"; ) e++;
              h = r.slice(v, e), e < u && r[e] === "]" && e++;
            }
            const m = o();
            h ? d.push(`<mroot><mrow>${l(m)}</mrow><mrow>${l(h)}</mrow></mroot>`) : d.push(`<msqrt><mrow>${l(m)}</mrow></msqrt>`);
            continue;
          }
          if (D[s]) {
            const h = o();
            d.push(`<mover><mrow>${l(h)}</mrow><mo>${y(D[s])}</mo></mover>`);
            continue;
          }
          if (s === "mathbf" || s === "boldsymbol") {
            const h = o();
            d.push(`<mstyle mathvariant='bold'>${l(h)}</mstyle>`);
            continue;
          }
          if (s === "mathbb") {
            const h = o().trim();
            d.push(`<mi mathvariant='double-struck'>${y(N[h] || h)}</mi>`);
            continue;
          }
          if (s === "text" || s === "mathrm") {
            const h = o();
            d.push(`<mtext>${y(h)}</mtext>`);
            continue;
          }
          if (E[s]) {
            d.push(`<mi>${y(E[s])}</mi>`);
            continue;
          }
          if (F[s]) {
            d.push(`<mo>${y(F[s])}</mo>`);
            continue;
          }
          if (q.has(s)) {
            d.push(`<mi class='obs-math-fn'>${y(s)}</mi>`);
            continue;
          }
          d.push(`<mi>${y(s)}</mi>`);
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
          i = `<mo>${y(f)}</mo>`, e++;
        for (; e < u && (a(), e < u && (r[e] === "^" || r[e] === "_")); ) {
          const s = r[e] === "^";
          e++;
          const h = o(), m = `<mrow>${l(h)}</mrow>`;
          if (a(), e < u && r[e] === (s ? "_" : "^")) {
            e++;
            const v = o(), p = `<mrow>${l(v)}</mrow>`;
            i = `<msubsup>${i}${s ? p : m}${s ? m : p}</msubsup>`;
          } else
            i = s ? `<msup>${i}${m}</msup>` : `<msub>${i}${m}</msub>`;
        }
        d.push(i);
      }
      return d.join("");
    }
    try {
      const r = l(c);
      return `<math xmlns="http://www.w3.org/1998/Math/MathML"${n ? ' display="block"' : ' display="inline"'}${n ? ' class="obs-math-block"' : ' class="obs-math-inline"'} data-latex="${x(c)}">${r}</math>`;
    } catch (r) {
      return console.warn("[MarkdownAst] LaTeX parse fallback:", r), `<span class="obs-math-error" title="${x(r?.message || String(r))}">${k(c)}</span>`;
    }
  }
  isValidInlineLatex(t) {
    const n = t.trim();
    if (!n || n.length > 200 || t.startsWith(" ") || t.endsWith(" ") || /^[\d,.]+[a-zA-Z%]*$/.test(n) || /[\u4e00-\u9fa5]/.test(n) && !n.includes("\\")) return !1;
    const c = /\\[a-zA-Z]+/.test(n), l = /[\^_]\{?[a-zA-Z0-9+\-=]\}?/.test(n), r = /[=<>+\-*/]/.test(n) && /[a-zA-Z]/.test(n);
    return c || l || r;
  }
  isTableDelimiterRow(t) {
    if (!t) return !1;
    const n = t.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    if (!n.includes("|")) return !1;
    const c = n.replace(/^\||\|$/g, "").split("|");
    return c.length ? c.every((l) => /^\s*:?-+:?\s*$/.test(l)) : !1;
  }
  parseTableAlignments(t) {
    return t.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|").replace(/^\||\|$/g, "").split("|").map((l) => {
      const r = l.trim(), e = r.startsWith(":"), u = r.endsWith(":");
      return e && u ? "center" : u ? "right" : "left";
    });
  }
  tableCells(t, n) {
    if (!t) return [];
    const c = t.trim().replace(/\uff5c/g, "|");
    let l = c.split("|").map((r) => r.trim());
    return c.startsWith("|") && c.endsWith("|") && l.length >= 3 ? l = l.slice(1, -1) : c.endsWith("|") ? l = l.slice(0, -1) : c.startsWith("|") && n && l.length > n && (l = l.slice(1)), l;
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
    let c = String(t).replace(/```[\s\S]*?```/g, (l) => `\0FENCE${n.push(l) - 1}\0`).replace(/\$\$[\s\S]*?\$\$/g, (l) => `\0FENCE${n.push(l) - 1}\0`);
    return c = c.replace(/<!--[\s\S]*?-->/g, ""), c = c.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>\s*<picture\b[^>]*>([\s\S]*?)<\/picture>\s*<\/a>/gi, (l, r, e) => `[${e.match(/<img\b[^>]*alt=["']([^"']*)["']/i)?.[1] || "查看图片"}](${r})`), c = c.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi, (l, r, e) => `[${e.trim() || r}](${r})`), c = c.replace(/<img\b([^>]*)\/?>/gi, (l, r) => {
      const e = r.match(/\bsrc=["']([^"']+)["']/i) || r.match(/\bdata-src=["']([^"']+)["']/i), u = r.match(/\balt=["']([^"']*)["']/i), d = e ? e[1] : "", a = u ? u[1] : "";
      return d ? `![${a}](${d})` : "";
    }), c = c.replace(/<(https?:\/\/[^>\s]+)>/gi, (l, r) => `[${r}](${r})`), c = c.replace(/<([\w.+-]+@[\w.-]+\.[A-Za-z]{2,})>/g, (l, r) => `[${r}](mailto:${r})`), c = c.replace(/<br\s*\/?>/gi, `
`), c = c.replace(/<\/?(?:a|picture|source|sub|details|summary|b|input|button)\b[^>]*>/gi, ""), c.replace(/\u0000FENCE(\d+)\u0000/g, (l, r) => n[Number(r)] || "");
  }
  extractFootnotes(t) {
    const n = t.replace(/\r\n?/g, `
`).split(`
`), c = [], l = /* @__PURE__ */ new Map();
    for (let r = 0; r < n.length; r++) {
      const e = n[r].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
      if (!e) {
        c.push(n[r]);
        continue;
      }
      const u = [e[2]];
      for (; r + 1 < n.length && /^(?: {2,}|\t)\S/.test(n[r + 1]); ) u.push(n[++r].trim());
      const d = e[1].trim();
      l.has(d) || l.set(d, { id: d, number: l.size + 1, text: u.join(" ").trim() });
    }
    return { body: c.join(`
`), definitions: l };
  }
  inlineMarkdown(t, n = {}) {
    const c = [], l = [], r = [];
    let e = String(t);
    (n.renderMode || "rendered") !== "md" && (e = e.replace(/(?<![\w\\$])\$(?!\s|\d)(.+?)(?<!\s)\$(?![\w$])/g, (a, o) => this.isValidInlineLatex(o) ? `\0MATH${r.push(this.latexToMathML(o.trim(), !1)) - 1}\0` : a), e = e.replace(/\\\(([\s\S]+?)\\\)/g, (a, o) => this.isValidInlineLatex(o) ? `\0MATH${r.push(this.latexToMathML(o.trim(), !1)) - 1}\0` : a)), e = e.replace(/<span\s+class=["'](category|vocabulary|definition)["']\s*>|<\/span>/gi, (a, o) => {
      const f = o ? `<span class="${o.toLowerCase()}">` : "</span>";
      return `\0SEM${l.push(f) - 1}\0`;
    }).replace(/`([^`]+)`/g, (a, o) => `\0CODE${c.push(`<code class="obs-inline-code">${k(o)}</code>`) - 1}\0`);
    const d = [];
    return e = e.replace(/<\/?(?:h[1-6]|p|div|span|hr|br|sup|sub|strong|b|em|i|u|s|del|kbd|details|summary|table|thead|tbody|tr|th|td|ul|ol|li|picture|source)\b[^>]*\/?>/gi, (a) => /on\w+\s*=/i.test(a) || /javascript:/i.test(a) ? "" : `\0HTML${d.push(a) - 1}\0`), e = k(e), e = e.replace(/\u0000HTML(\d+)\u0000/g, (a, o) => d[Number(o)] || ""), e = e.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (a, o, f) => {
      const i = o.trim(), s = f.trim(), m = /^https?:\/\//i.test(s) || s.startsWith("data:") ? `src="${x(s)}"` : `src="" data-vault-src="${x(s)}"`, v = i ? `<figcaption class="obs-media-caption">${k(i)}</figcaption>` : "";
      return `<figure class="obs-media-figure"><img class="obs-rendered-img" ${m} alt="${x(i)}" loading="lazy" referrerpolicy="no-referrer">${v}</figure>`;
    }), e = e.replace(/!\[\[([^\]]+)\]\]/g, (a, o) => {
      const [f, i] = o.trim().split("|"), s = f.trim();
      if (/\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i.test(s)) {
        const m = parseInt(i, 10), v = m > 0 ? `style="max-width:${m}px;"` : "";
        return `<figure class="obs-media-figure"><img class="obs-rendered-img" src="" data-vault-src="${x(s)}" alt="${x(s)}" ${v} loading="lazy" referrerpolicy="no-referrer"><figcaption class="obs-media-caption">${k(s)}</figcaption></figure>`;
      }
      return `<span class="obs-embed">◫ ${k(o)}</span>`;
    }), e = e.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (a, o, f, i) => `<a class="obs-wikilink" href="#" data-target="${x(o.trim())}">${k(i || o)}${f ? ` › ${k(f)}` : ""}</a>`), e = e.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (a, o, f) => {
      const i = f.trim();
      if (/\.md(?:#.*)?$/i.test(i)) {
        const s = i.split("#")[0].replace(/\\/g, "/").split("/").pop()?.replace(/\.md$/i, "") || i;
        return `<a class="obs-wikilink" href="#" data-target="${x(s)}">${o}</a>`;
      }
      return /^https?:\/\//i.test(i) || /^mailto:/i.test(i) ? `<a class="obs-external-link" href="${x(i)}" target="_blank" rel="noopener noreferrer">${o}</a>` : `<span class="obs-relative-link" title="${x(i)}">${o}</span>`;
    }), e = e.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/~~([^~]+)~~/g, "<del>$1</del>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>"), e = e.replace(/(^|\s)(#[\p{L}\p{N}_/-]+)/gu, '$1<span class="obs-tag-inline" data-tag="$2">$2</span>'), e = e.replace(/\u0000CODE(\d+)\u0000/g, (a, o) => c[Number(o)] || ""), e = e.replace(/\u0000SEM(\d+)\u0000/g, (a, o) => l[Number(o)] || ""), e = e.replace(/\u0000MATH(\d+)\u0000/g, (a, o) => r[Number(o)] || ""), e;
  }
  renderMarkdown(t, n = {}) {
    const { frontmatter: c, body: l } = this.splitFrontmatter(t), e = this.extractFootnotes(this.normalizeMarkdownHtml(l)).body.replace(/\u00a0/g, " ").replace(/\r\n?/g, `
`).split(`
`), u = n.renderMode || "rendered";
    let d = "", a = 0, o = 0, f = 0;
    for (; a < e.length; ) {
      const i = e[a];
      if (/^\s*\$\$/.test(i)) {
        const p = [];
        let $ = i.replace(/^\s*\$\$/, "");
        if ($.endsWith("$$") && $.length >= 2)
          p.push($.slice(0, -2)), a++;
        else {
          for (p.push($), a++; a < e.length && !e[a].includes("$$"); )
            p.push(e[a++]);
          if (a < e.length) {
            const C = e[a].indexOf("$$");
            p.push(e[a].slice(0, C)), a++;
          }
        }
        const w = p.join(`
`).trim();
        u === "md" ? d += `<pre class="obs-code-block obs-math-raw"><span class="obs-code-lang">latex</span><code>${k(w)}</code></pre>` : d += `<div class="obs-math-block">${this.latexToMathML(w, !0)}</div>`;
        continue;
      }
      if (/^```/.test(i)) {
        const p = i.slice(3).trim(), $ = [];
        for (a++; a < e.length && !/^```/.test(e[a]); ) $.push(e[a++]);
        a++, (p === "latex" || p === "math") && u !== "md" ? d += `<div class="obs-math-block">${this.latexToMathML($.join(`
`).trim(), !0)}</div>` : d += `<pre class="obs-code-block"><span class="obs-code-lang">${k(p || "code")}</span><code>${k($.join(`
`))}</code></pre>`;
        continue;
      }
      const s = i.match(/^(#{1,6})\s+(.+)$/);
      if (s) {
        const p = s[1].length, $ = s[2];
        d += `<h${p} class="obs-h${p}">${this.inlineMarkdown($, n)}</h${p}>`, a++;
        continue;
      }
      if (/^\s*(---+|___+|\*\*\*+|——+|───+)\s*$/.test(i)) {
        d += "<hr>", a++;
        continue;
      }
      const h = i.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (h) {
        const p = h[1].toLowerCase() === "x";
        d += `<div class="obs-task-item ${p ? "checked" : ""}"><input class="obs-task-cb" data-task-idx="${o++}" type="checkbox" ${p ? "checked" : ""}><span class="obs-task-label">${this.inlineMarkdown(h[2], n)}</span></div>`, a++;
        continue;
      }
      if (/^>\s?/.test(i)) {
        const p = [];
        for (; a < e.length && /^>\s?/.test(e[a]); ) p.push(e[a++].replace(/^>\s?/, ""));
        const $ = p[0]?.match(/^\[!(\w+)\][+-]?\s*(.*)$/i);
        $ ? d += `<aside class="obs-callout obs-callout-${x($[1].toLowerCase())}"><strong>${k($[2] || $[1])}</strong>${p.slice(1).map((w) => `<p>${this.inlineMarkdown(w, n)}</p>`).join("")}</aside>` : d += `<blockquote class="obs-quote">${p.map((w) => this.inlineMarkdown(w, n)).join("<br>")}</blockquote>`;
        continue;
      }
      if (/^\s*[-*+]\s+/.test(i)) {
        const p = [];
        for (; a < e.length && /^\s*[-*+]\s+/.test(e[a]); ) p.push(e[a++].replace(/^\s*[-*+]\s+/, ""));
        d += `<ul>${p.map(($) => `<li>${this.inlineMarkdown($, n)}</li>`).join("")}</ul>`;
        continue;
      }
      let m = -1;
      if ((i.includes("|") || i.includes("｜")) && (a + 1 < e.length && this.isTableDelimiterRow(e[a + 1]) ? m = a + 1 : a + 2 < e.length && !e[a + 1].trim() && this.isTableDelimiterRow(e[a + 2]) && (m = a + 2)), m !== -1) {
        const p = this.tableCells(i), $ = this.parseTableAlignments(e[m]);
        a = m + 1;
        const w = [];
        for (; a < e.length; ) {
          if (!e[a].trim()) {
            let L = a + 1;
            for (; L < e.length && !e[L].trim(); ) L++;
            if (L < e.length && (e[L].includes("|") || e[L].includes("｜")) && !this.isTableDelimiterRow(e[L]))
              a = L;
            else
              break;
          }
          const g = e[a];
          if (!g.includes("|") && !g.includes("｜")) break;
          const b = this.tableCells(g, p.length);
          for (; b.length < p.length; ) b.push("");
          w.push(b), a++;
        }
        const C = f++;
        d += `<div class="obs-table-wrap" data-table-index="${C}"><table><thead><tr>${p.map((g, b) => `<th style="text-align:${$[b] || "left"}">${this.inlineMarkdown(g, n)}</th>`).join("")}</tr></thead><tbody>${w.map((g) => `<tr>${g.map((b, L) => `<td style="text-align:${$[L] || "left"}">${this.inlineMarkdown(b, n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        continue;
      }
      if (!i.trim()) {
        a++;
        continue;
      }
      const v = [i];
      for (a++; a < e.length && e[a].trim() && !/^(```|#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\$\s*)/.test(e[a]) && !(e[a].includes("|") && this.isTableDelimiterRow(e[a + 1])); )
        v.push(e[a++]);
      d += `<p>${v.map((p) => this.inlineMarkdown(p, n)).join("<br>")}</p>`;
    }
    return d;
  }
  extractWikilinks(t) {
    const n = [], c = t.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g);
    for (const l of c)
      l[1] && n.push(l[1].trim());
    return [...new Set(n)];
  }
  extractTags(t) {
    const n = [], c = t.matchAll(/(?:^|\s)(#[\p{L}\p{N}_/-]+)/gu);
    for (const l of c)
      l[1] && n.push(l[1].trim());
    return [...new Set(n)];
  }
}
const _ = M.getInstance();
export {
  R as k,
  _ as m
};
