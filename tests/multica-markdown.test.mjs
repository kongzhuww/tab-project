import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { renderMessageMarkdown, normalizeMathBlocks, safeMarkdownFragment } = await loadTsModule('src/multica/message-markdown.ts');

test('workbench renders headings, emphasis, lists and LaTeX', () => {
  const html = renderMessageMarkdown('## 标题\n\n**重点**\n\n- 条目\n\n行内 $x^2$\n\n\\[\n\\frac{1}{2}\n\\]');
  assert.match(html, /<h2[^>]*>标题<\/h2>/);
  assert.match(html, /<strong>重点<\/strong>/);
  assert.match(html, /<li>/);
  assert.match(html, /<msup>/);
  assert.match(html, /<mfrac>/);
});

test('display-math normalization preserves fenced code', () => {
  assert.equal(normalizeMathBlocks('\\[x^2\\]\n```\n\\[raw\\]\n```'), '$$x^2$$\n```\n\\[raw\\]\n```');
});

test('message sanitizer drops active content and unsafe links while preserving MathML', () => {
  const htmlNS = 'http://www.w3.org/1999/xhtml', mathNS = 'http://www.w3.org/1998/Math/MathML';
  const text = value => ({ nodeType: 3, textContent: value });
  const el = (name, attrs = {}, children = [], ns = htmlNS) => ({ nodeType: 1, localName: name, namespaceURI: ns, childNodes: children, getAttribute: key => attrs[key] ?? null });
  const tree = [el('p', { onclick: 'bad()' }, [text('ok'), el('script', {}, [text('bad')]), el('a', { href: 'javascript:alert(1)', onclick: 'bad()' }, [text('unsafe')]), el('a', { href: 'https://example.com/path', onclick: 'bad()' }, [text('safe')])]), el('img', { src: 'https://tracker.example/' }), el('math', { display: 'block', onclick: 'bad()' }, [el('mfrac', {}, [el('mi', {}, [text('x')], mathNS), el('mn', {}, [text('2')], mathNS)], mathNS)], mathNS)];
  const node = (name, ns) => ({ name, ns, attrs: {}, children: [], setAttribute(k,v) { this.attrs[k]=v; }, appendChild(child) { this.children.push(child); } });
  const doc = { createElement(name) { if (name === 'template') return { content: { childNodes: tree }, set innerHTML(_) {} }; return node(name, htmlNS); }, createElementNS(ns,name) { return node(name,ns); }, createTextNode(value) { return { text: value }; }, createDocumentFragment() { return node('fragment'); } };
  const result = safeMarkdownFragment('<untrusted>', doc);
  assert.equal(result.children.length, 2);
  const paragraph = result.children[0];
  assert.deepEqual(paragraph.attrs, {});
  assert.equal(paragraph.children.length, 3);
  assert.deepEqual(paragraph.children[1].attrs, {});
  assert.deepEqual(paragraph.children[2].attrs, { href: 'https://example.com/path', target: '_blank', rel: 'noopener noreferrer' });
  assert.equal(result.children[1].name, 'math');
  assert.deepEqual(result.children[1].attrs, { display: 'block' });
  assert.equal(result.children[1].children[0].name, 'mfrac');
});
