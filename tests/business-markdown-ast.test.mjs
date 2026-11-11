import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { markdownAstEngine } = await loadTsModule('src/utils/markdown-ast.ts');

test('Markdown AST: parses headings and task list items', () => {
  const source = '# Top Heading\n\n- [x] Finished item\n- [ ] Pending item';
  const html = markdownAstEngine.renderMarkdown(source);
  assert.ok(html.includes('<h1 class="obs-h1">Top Heading</h1>'));
  assert.ok(html.includes('class="obs-task-item checked"'));
  assert.ok(html.includes('Finished item'));
  assert.ok(html.includes('Pending item'));
});

test('Markdown AST: compiles inline and block LaTeX to W3C MathML Core', () => {
  const inlineMathML = markdownAstEngine.latexToMathML('\\alpha + \\beta = \\gamma', false);
  assert.ok(inlineMathML.includes('display="inline"'));
  assert.ok(inlineMathML.includes('<mi>α</mi>'));
  assert.ok(inlineMathML.includes('<mi>β</mi>'));
  assert.ok(inlineMathML.includes('<mi>γ</mi>'));

  const blockMathML = markdownAstEngine.latexToMathML('\\frac{a}{b}', true);
  assert.ok(blockMathML.includes('display="block"'));
  assert.ok(blockMathML.includes('<mfrac>'));
  assert.ok(blockMathML.includes('<mi>a</mi>'));
  assert.ok(blockMathML.includes('<mi>b</mi>'));
});

test('Markdown AST: extracts wikilinks with targets and aliases', () => {
  const text = 'See [[ArchitectureGuide]] and [[Components#Section|My Section]] for details.';
  const links = markdownAstEngine.extractWikilinks(text);
  assert.deepEqual(links, ['ArchitectureGuide', 'Components']);
});

test('Markdown AST: extracts unicode tags', () => {
  const text = 'Notes for #tag-one and #知识库/笔记 in the document.';
  const tags = markdownAstEngine.extractTags(text);
  assert.ok(tags.includes('#tag-one'));
  assert.ok(tags.includes('#知识库/笔记'));
});

test('Markdown AST: renders tables into structured HTML with alignment', () => {
  const tableMd = '| Col A | Col B |\n| :--- | :---: |\n| Val 1 | Val 2 |';
  const html = markdownAstEngine.renderMarkdown(tableMd);
  assert.ok(html.includes('<div class="obs-table-wrap"'));
  assert.ok(html.includes('<th style="text-align:left">Col A</th>'));
  assert.ok(html.includes('<th style="text-align:center">Col B</th>'));
  assert.ok(html.includes('<td style="text-align:left">Val 1</td>'));
  assert.ok(html.includes('<td style="text-align:center">Val 2</td>'));
});

test('Markdown AST: isolates YAML frontmatter from document body', () => {
  const doc = '---\ntitle: Sample Note\nauthor: dev\n---\n# Real Content';
  const { frontmatter, body } = markdownAstEngine.splitFrontmatter(doc);
  assert.ok(frontmatter.includes('title: Sample Note'));
  assert.strictEqual(body.trim(), '# Real Content');
});

test('Markdown AST: supports fast renderer registration with seamless fallback for LaTeX and Wikilinks', async () => {
  const { registerFastMarkdownRenderer } = await loadTsModule('src/utils/markdown-ast.ts');
  
  // 模拟注册 Fast Renderer
  registerFastMarkdownRenderer((source) => {
    if (source.includes('$$') || source.includes('[[')) return null; // 触发降级
    return `<div class="fast-rendered">${source}</div>`;
  });

  // 普通文本走快速通道
  const normal = markdownAstEngine.renderMarkdown('Hello World');
  assert.strictEqual(normal, '<div class="fast-rendered">Hello World</div>');

  // 包含 LaTeX 公式或双链自动降级至内置递归下降引擎
  const withMath = markdownAstEngine.renderMarkdown('$$ \\alpha $$');
  assert.ok(withMath.includes('class="obs-math-block"'));
  assert.ok(withMath.includes('<mi>α</mi>'));

  // 清除注册，恢复原生
  registerFastMarkdownRenderer(null);
  const reverted = markdownAstEngine.renderMarkdown('Hello World');
  assert.ok(reverted.includes('<p>Hello World</p>'));
});

