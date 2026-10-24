/**
 * MarkdownAstEngine — 独立自研 Markdown 与 MathML Core AST 解析引擎 (Pure TypeScript, Zero DOM)
 * 物理抽离自历史巨型脚本 obsidian.js，具备：
 * 1. 完整的 LaTeX 数学公式递归下降解析器，将公式极速无损编译为 W3C MathML Core 原生标准节点；
 * 2. 纯函数式 Markdown 语法树编译器（块级语法、表格、任务列表、Callout 块、参考文献脚注）；
 * 3. Obsidian Wiki 双链（[[WikiLink]]）、嵌入语法（![[Image]]）与 Tag 标签语义提取。
 */

export const GREEK: Record<string, string> = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", varepsilon: "ε",
  zeta: "ζ", eta: "η", theta: "θ", vartheta: "ϑ", iota: "ι", kappa: "κ",
  lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π", varpi: "ϖ", rho: "ρ",
  varrho: "ϱ", sigma: "σ", varsigma: "ς", tau: "τ", upsilon: "υ", phi: "φ",
  varphi: "ϕ", chi: "χ", psi: "ψ", omega: "ω",
  Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π",
  Sigma: "Σ", Upsilon: "Υ", Phi: "Φ", Psi: "Ψ", Omega: "Ω"
};

export const SYMBOLS: Record<string, string> = {
  pm: "±", mp: "∓", times: "×", div: "÷", cdot: "·", ast: "∗", star: "⋆",
  circ: "∘", bullet: "•", cap: "∩", cup: "∪", uplus: "⊎", sqcap: "⊓",
  sqcup: "⊔", vee: "∨", wedge: "∧", setminus: "∖", wr: "≀",
  leq: "≤", le: "≤", geq: "≥", ge: "≥", neq: "≠", ne: "≠", approx: "≈",
  equiv: "≡", sim: "∼", simeq: "≃", propto: "∝", ll: "≪", gg: "≫",
  in: "∈", notin: "∉", ni: "∋", subset: "⊂", supset: "⊃", subseteq: "⊆",
  supseteq: "⊇", forall: "∀", exists: "∃", nexists: "∄", empty: "∅",
  emptyset: "∅", infty: "∞", partial: "∂", nabla: "∇", int: "∫", iint: "∬",
  iiint: "∭", oint: "∮", sum: "∑", prod: "∏", coprod: "∐",
  leftarrow: "←", gets: "←", rightarrow: "→", to: "→", leftrightarrow: "↔",
  Leftarrow: "⇐", Rightarrow: "⇒", implies: "⇒", Leftrightarrow: "⇔", iff: "⇔",
  uparrow: "↑", downarrow: "↓", updownarrow: "↕",
  dots: "…", cdots: "⋯", vdots: "⋮", ddots: "⋱",
  hbar: "ℏ", ell: "ℓ", Re: "ℜ", Im: "ℑ", wp: "℘",
  angle: "∠", top: "⊤", bot: "⊥", vdash: "⊢", models: "⊨",
  dag: "†", ddag: "‡", flat: "♭", natural: "♮", sharp: "♯"
};

export const FUNCTIONS = new Set([
  "sin", "cos", "tan", "cot", "sec", "csc",
  "arcsin", "arccos", "arctan",
  "sinh", "cosh", "tanh", "coth",
  "exp", "log", "ln", "lg",
  "lim", "min", "max", "sup", "inf",
  "det", "dim", "ker", "deg", "gcd", "hom", "arg"
]);

export const ACCENTS: Record<string, string> = {
  vec: "→", bar: "¯", hat: "^", dot: "˙", ddot: "¨", tilde: "~",
  overline: "¯", underline: "_"
};

export const BLACKBOARD: Record<string, string> = {
  R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ", P: "ℙ", H: "ℍ"
};

function escapeXml(str: string): string {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  }[c] || c));
}

function escapeHtml(str: string): string {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c] || c));
}

function escapeAttr(str: string): string {
  return escapeHtml(str);
}

export interface MarkdownRenderOptions {
  renderMode?: "rendered" | "md" | string;
}

export interface FootnoteDefinition {
  id: string;
  number: number;
  text: string;
}

export class MarkdownAstEngine {
  private static instance: MarkdownAstEngine;

  public static getInstance(): MarkdownAstEngine {
    if (!MarkdownAstEngine.instance) {
      MarkdownAstEngine.instance = new MarkdownAstEngine();
    }
    return MarkdownAstEngine.instance;
  }

  // ==========================================================================
  // LaTeX 语法递归下降 AST 编译为标准 MathML Core
  // ==========================================================================
  public latexToMathML(latex: string, isBlock = false): string {
    if (!latex || typeof latex !== "string") return "";
    const trimmed = latex.trim();
    if (!trimmed) return "";

    function parseString(input: string): string {
      let p = 0;
      const l = input.length;
      const nodes: string[] = [];

      function skip(): void {
        while (p < l && /\s/.test(input[p])) p++;
      }

      function readSubArg(): string {
        skip();
        if (p >= l) return "";
        if (input[p] === "{") {
          p++;
          let depth = 1;
          const start = p;
          while (p < l && depth > 0) {
            if (input[p] === "{" && input[p - 1] !== "\\") depth++;
            else if (input[p] === "}" && input[p - 1] !== "\\") depth--;
            p++;
          }
          return input.slice(start, p - 1);
        }
        if (input[p] === "\\") {
          const start = p;
          p++;
          while (p < l && /[a-zA-Z]/.test(input[p])) p++;
          return input.slice(start, p);
        }
        const ch = input[p];
        p++;
        return ch;
      }

      while (p < l) {
        skip();
        if (p >= l) break;
        const char = input[p];

        if (char === "}" || char === "&" || char === "\\") {
          if (char === "\\") {
            p++;
            if (p < l && (input[p] === "\\" || input[p] === " ")) {
              p++;
              nodes.push("<mspace linebreak='newline'/>");
              continue;
            }
            let cmd = "";
            while (p < l && /[a-zA-Z]/.test(input[p])) cmd += input[p++];
            if (!cmd) {
              if (p < l) {
                const sym = input[p++];
                nodes.push(`<mo>${escapeXml(sym)}</mo>`);
              }
              continue;
            }

            if (cmd === "frac") {
              const num = readSubArg();
              const den = readSubArg();
              nodes.push(`<mfrac><mrow>${parseString(num)}</mrow><mrow>${parseString(den)}</mrow></mfrac>`);
              continue;
            }
            if (cmd === "sqrt") {
              skip();
              let index = "";
              if (p < l && input[p] === "[") {
                p++;
                const bStart = p;
                while (p < l && input[p] !== "]") p++;
                index = input.slice(bStart, p);
                if (p < l && input[p] === "]") p++;
              }
              const rad = readSubArg();
              if (index) {
                nodes.push(`<mroot><mrow>${parseString(rad)}</mrow><mrow>${parseString(index)}</mrow></mroot>`);
              } else {
                nodes.push(`<msqrt><mrow>${parseString(rad)}</mrow></msqrt>`);
              }
              continue;
            }
            if (ACCENTS[cmd]) {
              const body = readSubArg();
              nodes.push(`<mover><mrow>${parseString(body)}</mrow><mo>${escapeXml(ACCENTS[cmd])}</mo></mover>`);
              continue;
            }
            if (cmd === "mathbf" || cmd === "boldsymbol") {
              const inner = readSubArg();
              nodes.push(`<mstyle mathvariant='bold'>${parseString(inner)}</mstyle>`);
              continue;
            }
            if (cmd === "mathbb") {
              const inner = readSubArg().trim();
              nodes.push(`<mi mathvariant='double-struck'>${escapeXml(BLACKBOARD[inner] || inner)}</mi>`);
              continue;
            }
            if (cmd === "text" || cmd === "mathrm") {
              const txt = readSubArg();
              nodes.push(`<mtext>${escapeXml(txt)}</mtext>`);
              continue;
            }
            if (GREEK[cmd]) {
              nodes.push(`<mi>${escapeXml(GREEK[cmd])}</mi>`);
              continue;
            }
            if (SYMBOLS[cmd]) {
              nodes.push(`<mo>${escapeXml(SYMBOLS[cmd])}</mo>`);
              continue;
            }
            if (FUNCTIONS.has(cmd)) {
              nodes.push(`<mi class='obs-math-fn'>${escapeXml(cmd)}</mi>`);
              continue;
            }
            nodes.push(`<mi>${escapeXml(cmd)}</mi>`);
            continue;
          }
        }

        let node = "";
        if (/[0-9]/.test(char)) {
          let num = "";
          while (p < l && /[0-9.]/.test(input[p])) num += input[p++];
          node = `<mn>${num}</mn>`;
        } else if (/[a-zA-Z]/.test(char)) {
          node = `<mi>${char}</mi>`;
          p++;
        } else if (char === "{" ) {
          p++;
          const start = p;
          let depth = 1;
          while (p < l && depth > 0) {
            if (input[p] === "{" && input[p - 1] !== "\\") depth++;
            else if (input[p] === "}" && input[p - 1] !== "\\") depth--;
            p++;
          }
          node = `<mrow>${parseString(input.slice(start, p - 1))}</mrow>`;
        } else {
          node = `<mo>${escapeXml(char)}</mo>`;
          p++;
        }

        // 处理上下标
        while (p < l) {
          skip();
          if (p < l && (input[p] === "^" || input[p] === "_")) {
            const isSup = input[p] === "^";
            p++;
            const scriptContent = readSubArg();
            const scriptHtml = `<mrow>${parseString(scriptContent)}</mrow>`;
            skip();
            if (p < l && (input[p] === (isSup ? "_" : "^"))) {
              p++;
              const secondContent = readSubArg();
              const secondHtml = `<mrow>${parseString(secondContent)}</mrow>`;
              const subHtml = isSup ? secondHtml : scriptHtml;
              const supHtml = isSup ? scriptHtml : secondHtml;
              node = `<msubsup>${node}${subHtml}${supHtml}</msubsup>`;
            } else {
              node = isSup ? `<msup>${node}${scriptHtml}</msup>` : `<msub>${node}${scriptHtml}</msub>`;
            }
          } else {
            break;
          }
        }
        nodes.push(node);
      }
      return nodes.join("");
    }

    try {
      const mathmlBody = parseString(trimmed);
      const displayAttr = isBlock ? ' display="block"' : ' display="inline"';
      const blockClass = isBlock ? ' class="obs-math-block"' : ' class="obs-math-inline"';
      return `<math xmlns="http://www.w3.org/1998/Math/MathML"${displayAttr}${blockClass} data-latex="${escapeAttr(trimmed)}">${mathmlBody}</math>`;
    } catch (err: any) {
      console.warn("[MarkdownAst] LaTeX parse fallback:", err);
      return `<span class="obs-math-error" title="${escapeAttr(err?.message || String(err))}">${escapeHtml(trimmed)}</span>`;
    }
  }

  private isValidInlineLatex(math: string): boolean {
    const trimmed = math.trim();
    if (!trimmed || trimmed.length > 200) return false;
    if (math.startsWith(" ") || math.endsWith(" ")) return false;
    // 纯数字或货币单位绝对不是公式 (如 26K, 26,098, 19K, 100)
    if (/^[\d,.]+[a-zA-Z%]*$/.test(trimmed)) return false;
    // 包含中文且无反斜杠宏命令的绝不是公式
    if (/[\u4e00-\u9fa5]/.test(trimmed) && !trimmed.includes("\\")) return false;
    // 必须具备数学公式特征
    const hasLatexMacro = /\\[a-zA-Z]+/.test(trimmed);
    const hasMathSuperSub = /[\^_]\{?[a-zA-Z0-9+\-=]\}?/.test(trimmed);
    const hasMathRelation = /[=<>+\-*/]/.test(trimmed) && /[a-zA-Z]/.test(trimmed);
    return hasLatexMacro || hasMathSuperSub || hasMathRelation;
  }

  private isTableDelimiterRow(line: string): boolean {
    if (!line) return false;
    const clean = line.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    if (!clean.includes("|")) return false;
    const cells = clean.replace(/^\||\|$/g, "").split("|");
    if (!cells.length) return false;
    return cells.every((c) => /^\s*:?-+:?\s*$/.test(c));
  }

  private parseTableAlignments(delimiterLine: string): string[] {
    const clean = delimiterLine.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    const cells = clean.replace(/^\||\|$/g, "").split("|");
    return cells.map((c) => {
      const trimmed = c.trim();
      const left = trimmed.startsWith(":");
      const right = trimmed.endsWith(":");
      if (left && right) return "center";
      if (right) return "right";
      return "left";
    });
  }

  private tableCells(line: string, expectedColumns?: number): string[] {
    if (!line) return [];
    const clean = line.trim().replace(/\uff5c/g, "|");
    let parts = clean.split("|").map((cell) => cell.trim());
    if (clean.startsWith("|") && clean.endsWith("|") && parts.length >= 3) {
      parts = parts.slice(1, -1);
    } else if (clean.endsWith("|")) {
      parts = parts.slice(0, -1);
    } else if (clean.startsWith("|")) {
      if (expectedColumns && parts.length > expectedColumns) {
        parts = parts.slice(1);
      }
    }
    return parts;
  }

  // ==========================================================================
  // Markdown AST 分块与纯文本语法编译
  // ==========================================================================

  public splitFrontmatter(source: string): { frontmatter: string; body: string } {
    const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
    return match ? { frontmatter: match[1], body: source.slice(match[0].length) } : { frontmatter: "", body: source };
  }

  public normalizeMarkdownHtml(source: string): string {
    const fences: string[] = [];
    let text = String(source)
      .replace(/```[\s\S]*?```/g, (block) => `\u0000FENCE${fences.push(block) - 1}\u0000`)
      .replace(/\$\$[\s\S]*?\$\$/g, (block) => `\u0000FENCE${fences.push(block) - 1}\u0000`);
    text = text.replace(/<!--[\s\S]*?-->/g, "");
    text = text.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>\s*<picture\b[^>]*>([\s\S]*?)<\/picture>\s*<\/a>/gi, (_, href, picture) => {
      const alt = picture.match(/<img\b[^>]*alt=["']([^"']*)["']/i)?.[1] || "查看图片";
      return `[${alt}](${href})`;
    });
    text = text.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi, (_, href, label) => `[${label.trim() || href}](${href})`);
    text = text.replace(/<img\b([^>]*)\/?>/gi, (_, attrs) => {
      const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i) || attrs.match(/\bdata-src=["']([^"']+)["']/i);
      const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
      const src = srcMatch ? srcMatch[1] : "";
      const alt = altMatch ? altMatch[1] : "";
      return src ? `![${alt}](${src})` : "";
    });
    text = text.replace(/<(https?:\/\/[^>\s]+)>/gi, (_, href) => `[${href}](${href})`);
    text = text.replace(/<([\w.+-]+@[\w.-]+\.[A-Za-z]{2,})>/g, (_, address) => `[${address}](mailto:${address})`);
    text = text.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<\/?(?:a|picture|source|sub|details|summary|b|input|button)\b[^>]*>/gi, "");
    return text.replace(/\u0000FENCE(\d+)\u0000/g, (_, index) => fences[Number(index)] || "");
  }

  public extractFootnotes(source: string): { body: string; definitions: Map<string, FootnoteDefinition> } {
    const lines = source.replace(/\r\n?/g, "\n").split("\n");
    const body: string[] = [];
    const definitions = new Map<string, FootnoteDefinition>();
    for (let index = 0; index < lines.length; index++) {
      const match = lines[index].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
      if (!match) { body.push(lines[index]); continue; }
      const parts = [match[2]];
      while (index + 1 < lines.length && /^(?: {2,}|\t)\S/.test(lines[index + 1])) parts.push(lines[++index].trim());
      const id = match[1].trim();
      if (!definitions.has(id)) definitions.set(id, { id, number: definitions.size + 1, text: parts.join(" ").trim() });
    }
    return { body: body.join("\n"), definitions };
  }

  public inlineMarkdown(
    value: string,
    options: { renderMode?: string; footnotesContext?: { definitions: Map<string, FootnoteDefinition>; references: Map<string, number> } } = {}
  ): string {
    const code: string[] = [];
    const semanticSpans: string[] = [];
    const mathTokens: string[] = [];
    let text = String(value);
    const renderMode = options.renderMode || "rendered";

    // 提前抽取行内 LaTeX 公式 (严格识别数学公式，防止误杀 $20K 货币格式)
    if (renderMode !== "md") {
      text = text.replace(/(?<![\w\\$])\$(?!\s|\d)(.+?)(?<!\s)\$(?![\w$])/g, (match, math) => {
        if (this.isValidInlineLatex(math)) {
          return `\u0000MATH${mathTokens.push(this.latexToMathML(math.trim(), false)) - 1}\u0000`;
        }
        return match;
      });
      text = text.replace(/\\\(([\s\S]+?)\\\)/g, (match, math) => {
        if (this.isValidInlineLatex(math)) {
          return `\u0000MATH${mathTokens.push(this.latexToMathML(math.trim(), false)) - 1}\u0000`;
        }
        return match;
      });
    }

    text = text
      .replace(/<span\s+class=["'](category|vocabulary|definition)["']\s*>|<\/span>/gi, (_, className) => {
        const safeTag = className ? `<span class="${className.toLowerCase()}">` : "</span>";
        return `\u0000SEM${semanticSpans.push(safeTag) - 1}\u0000`;
      })
      .replace(/`([^`]+)`/g, (_, content) => `\u0000CODE${code.push(`<code class="obs-inline-code">${escapeHtml(content)}</code>`) - 1}\u0000`);

    // 保护合法白名单 HTML 标签不被 escapeHtml 转义（支持 GitHub README 常见的原生 HTML）
    const safeHtmlTokens: string[] = [];
    text = text.replace(/<\/?(?:h[1-6]|p|div|span|hr|br|sup|sub|strong|b|em|i|u|s|del|kbd|details|summary|table|thead|tbody|tr|th|td|ul|ol|li|picture|source)\b[^>]*\/?>/gi, (tag) => {
      if (/on\w+\s*=/i.test(tag) || /javascript:/i.test(tag)) {
        return "";
      }
      return `\u0000HTML${safeHtmlTokens.push(tag) - 1}\u0000`;
    });

    text = escapeHtml(text);

    // 还原安全 HTML 标签
    text = text.replace(/\u0000HTML(\d+)\u0000/g, (_, idx) => safeHtmlTokens[Number(idx)] || "");

    // Markdown 图片 ![alt](url)
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, rawAlt, rawSrc) => {
      const alt = rawAlt.trim();
      const src = rawSrc.trim();
      const isRemote = /^https?:\/\//i.test(src) || src.startsWith("data:");
      const srcAttr = isRemote ? `src="${escapeAttr(src)}"` : `src="" data-vault-src="${escapeAttr(src)}"`;
      const caption = alt ? `<figcaption class="obs-media-caption">${escapeHtml(alt)}</figcaption>` : "";
      return `<figure class="obs-media-figure"><img class="obs-rendered-img" ${srcAttr} alt="${escapeAttr(alt)}" loading="lazy" referrerpolicy="no-referrer">${caption}</figure>`;
    });

    // Obsidian Wiki 嵌入图片 ![[image.png|300]]
    text = text.replace(/!\[\[([^\]]+)\]\]/g, (_, content) => {
      const [rawTarget, widthStr] = content.trim().split("|");
      const target = rawTarget.trim();
      const isImage = /\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i.test(target);
      if (isImage) {
        const widthVal = parseInt(widthStr, 10);
        const styleAttr = widthVal > 0 ? `style="max-width:${widthVal}px;"` : "";
        return `<figure class="obs-media-figure"><img class="obs-rendered-img" src="" data-vault-src="${escapeAttr(target)}" alt="${escapeAttr(target)}" ${styleAttr} loading="lazy" referrerpolicy="no-referrer"><figcaption class="obs-media-caption">${escapeHtml(target)}</figcaption></figure>`;
      }
      return `<span class="obs-embed">◫ ${escapeHtml(content)}</span>`;
    });

    // Obsidian Wiki 链接 [[target#heading|alias]]
    text = text.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (_, target, heading, alias) => {
      return `<a class="obs-wikilink" href="#" data-target="${escapeAttr(target.trim())}">${escapeHtml(alias || target)}${heading ? ` › ${escapeHtml(heading)}` : ""}</a>`;
    });

    // 标准链接 [label](target)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
      const cleanTarget = target.trim();
      if (/\.md(?:#.*)?$/i.test(cleanTarget)) {
        const noteTarget = cleanTarget.split("#")[0].replace(/\\/g, "/").split("/").pop()?.replace(/\.md$/i, "") || cleanTarget;
        return `<a class="obs-wikilink" href="#" data-target="${escapeAttr(noteTarget)}">${label}</a>`;
      }
      if (/^https?:\/\//i.test(cleanTarget) || /^mailto:/i.test(cleanTarget)) {
        return `<a class="obs-external-link" href="${escapeAttr(cleanTarget)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      }
      return `<span class="obs-relative-link" title="${escapeAttr(cleanTarget)}">${label}</span>`;
    });

    // 格式化加粗、删除线、斜体
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
               .replace(/~~([^~]+)~~/g, "<del>$1</del>")
               .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");

    // 标签语法 #tag
    text = text.replace(/(^|\s)(#[\p{L}\p{N}_/-]+)/gu, '$1<span class="obs-tag-inline" data-tag="$2">$2</span>');

    text = text.replace(/\u0000CODE(\d+)\u0000/g, (_, index) => code[Number(index)] || "");
    text = text.replace(/\u0000SEM(\d+)\u0000/g, (_, index) => semanticSpans[Number(index)] || "");
    text = text.replace(/\u0000MATH(\d+)\u0000/g, (_, index) => mathTokens[Number(index)] || "");
    return text;
  }

  public renderMarkdown(source: string, options: MarkdownRenderOptions = {}): string {
    const { frontmatter, body } = this.splitFrontmatter(source);
    const footnoteDoc = this.extractFootnotes(this.normalizeMarkdownHtml(body));
    const lines = footnoteDoc.body.replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n").split("\n");
    const renderMode = options.renderMode || "rendered";

    // 彻底去除前端 Frontmatter 属性折叠框，保持笔记正文清爽纯粹
    let html = "";

    let i = 0;
    let taskIndex = 0;
    let tableIndex = 0;

    while (i < lines.length) {
      const line = lines[i];

      // 1. $$ ... $$ 公式块
      if (/^\s*\$\$/.test(line)) {
        const mathLines: string[] = [];
        let restOfLine = line.replace(/^\s*\$\$/, "");
        if (restOfLine.endsWith("$$") && restOfLine.length >= 2) {
          mathLines.push(restOfLine.slice(0, -2));
          i++;
        } else {
          mathLines.push(restOfLine);
          i++;
          while (i < lines.length && !lines[i].includes("$$")) {
            mathLines.push(lines[i++]);
          }
          if (i < lines.length) {
            const endIdx = lines[i].indexOf("$$");
            mathLines.push(lines[i].slice(0, endIdx));
            i++;
          }
        }
        const mathContent = mathLines.join("\n").trim();
        if (renderMode === "md") {
          html += `<pre class="obs-code-block obs-math-raw"><span class="obs-code-lang">latex</span><code>${escapeHtml(mathContent)}</code></pre>`;
        } else {
          html += `<div class="obs-math-block">${this.latexToMathML(mathContent, true)}</div>`;
        }
        continue;
      }

      // 2. 代码块
      if (/^```/.test(line)) {
        const language = line.slice(3).trim();
        const code: string[] = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
        i++;
        if ((language === "latex" || language === "math") && renderMode !== "md") {
          html += `<div class="obs-math-block">${this.latexToMathML(code.join("\n").trim(), true)}</div>`;
        } else {
          html += `<pre class="obs-code-block"><span class="obs-code-lang">${escapeHtml(language || "code")}</span><code>${escapeHtml(code.join("\n"))}</code></pre>`;
        }
        continue;
      }

      // 3. 标题
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        const title = heading[2];
        html += `<h${level} class="obs-h${level}">${this.inlineMarkdown(title, options)}</h${level}>`;
        i++;
        continue;
      }

      // 4. 分割线
      if (/^\s*(---+|___+|\*\*\*+|——+|───+)\s*$/.test(line)) {
        html += "<hr>";
        i++;
        continue;
      }

      // 5. 任务列表
      const task = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (task) {
        const checked = task[1].toLowerCase() === "x";
        html += `<div class="obs-task-item ${checked ? "checked" : ""}"><input class="obs-task-cb" data-task-idx="${taskIndex++}" type="checkbox" ${checked ? "checked" : ""}><span class="obs-task-label">${this.inlineMarkdown(task[2], options)}</span></div>`;
        i++;
        continue;
      }

      // 6. 引用与 Callout 块
      if (/^>\s?/.test(line)) {
        const quote: string[] = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ""));
        const callout = quote[0]?.match(/^\[!(\w+)\][+-]?\s*(.*)$/i);
        if (callout) {
          html += `<aside class="obs-callout obs-callout-${escapeAttr(callout[1].toLowerCase())}"><strong>${escapeHtml(callout[2] || callout[1])}</strong>${quote.slice(1).map((row) => `<p>${this.inlineMarkdown(row, options)}</p>`).join("")}</aside>`;
        } else {
          html += `<blockquote class="obs-quote">${quote.map((row) => this.inlineMarkdown(row, options)).join("<br>")}</blockquote>`;
        }
        continue;
      }

      // 7. 列表项
      if (/^\s*[-*+]\s+/.test(line)) {
        const rows: string[] = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) rows.push(lines[i++].replace(/^\s*[-*+]\s+/, ""));
        html += `<ul>${rows.map((row) => `<li>${this.inlineMarkdown(row, options)}</li>`).join("")}</ul>`;
        continue;
      }

      // 8. 表格 (Markdown Table)
      let delimIdx = -1;
      if (line.includes("|") || line.includes("\uff5c")) {
        if (i + 1 < lines.length && this.isTableDelimiterRow(lines[i + 1])) {
          delimIdx = i + 1;
        } else if (i + 2 < lines.length && !lines[i + 1].trim() && this.isTableDelimiterRow(lines[i + 2])) {
          delimIdx = i + 2;
        }
      }
      if (delimIdx !== -1) {
        const header = this.tableCells(line);
        const aligns = this.parseTableAlignments(lines[delimIdx]);
        i = delimIdx + 1;
        const rows: string[][] = [];
        while (i < lines.length) {
          if (!lines[i].trim()) {
            let nextNonBlank = i + 1;
            while (nextNonBlank < lines.length && !lines[nextNonBlank].trim()) nextNonBlank++;
            if (nextNonBlank < lines.length && (lines[nextNonBlank].includes("|") || lines[nextNonBlank].includes("\uff5c")) && !this.isTableDelimiterRow(lines[nextNonBlank])) {
              i = nextNonBlank;
            } else {
              break;
            }
          }
          const currLine = lines[i];
          if (!currLine.includes("|") && !currLine.includes("\uff5c")) break;
          const cells = this.tableCells(currLine, header.length);
          while (cells.length < header.length) cells.push("");
          rows.push(cells);
          i++;
        }
        const currentTableIndex = tableIndex++;
        html += `<div class="obs-table-wrap" data-table-index="${currentTableIndex}"><table><thead><tr>${header.map((cell, idx) => `<th style="text-align:${aligns[idx] || "left"}">${this.inlineMarkdown(cell, options)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, colIdx) => `<td style="text-align:${aligns[colIdx] || "left"}">${this.inlineMarkdown(cell, options)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        continue;
      }

      // 9. 简单普通段落
      if (!line.trim()) { i++; continue; }
      const paragraph: string[] = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !/^(```|#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\$\s*)/.test(lines[i]) && !(lines[i].includes("|") && this.isTableDelimiterRow(lines[i + 1]))) {
        paragraph.push(lines[i++]);
      }
      html += `<p>${paragraph.map((p) => this.inlineMarkdown(p, options)).join("<br>")}</p>`;
    }

    return html;
  }

  public extractWikilinks(source: string): string[] {
    const links: string[] = [];
    const matches = source.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g);
    for (const m of matches) {
      if (m[1]) links.push(m[1].trim());
    }
    return [...new Set(links)];
  }

  public extractTags(source: string): string[] {
    const tags: string[] = [];
    const matches = source.matchAll(/(?:^|\s)(#[\p{L}\p{N}_/-]+)/gu);
    for (const m of matches) {
      if (m[1]) tags.push(m[1].trim());
    }
    return [...new Set(tags)];
  }
}

export const markdownAstEngine = MarkdownAstEngine.getInstance();
