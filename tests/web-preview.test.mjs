import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const { normalizePreviewUrl, parseWebsiteMetaHtml } = await loadTsModule('src/launcher/web-preview-meta.ts');

test('normalizePreviewUrl normalizes web URLs and rejects unsafe schemes', () => {
  assert.equal(normalizePreviewUrl('https://mobbin.com/discover'), 'https://mobbin.com/discover');
  assert.equal(normalizePreviewUrl('mobbin.com/discover'), 'https://mobbin.com/discover');
  assert.equal(normalizePreviewUrl('http://localhost:3000'), 'http://localhost:3000/');
  assert.equal(normalizePreviewUrl('javascript:alert(1)'), '');
  assert.equal(normalizePreviewUrl('file:///etc/passwd'), '');
  assert.equal(normalizePreviewUrl('data:text/html,hi'), '');
  assert.equal(normalizePreviewUrl('   '), '');
});

test('parseWebsiteMetaHtml extracts OG metadata, resolves relative image URLs, and blocks unsafe images', () => {
  const html = `
    <html><head>
      <title>Fallback &amp; Title</title>
      <meta property="og:title" content="Mobbin — UI &amp; UX Reference" />
      <meta name="description" content="Explore real-world mobile &amp; web design patterns." />
      <meta property="og:image" content="/assets/og-cover.png" />
      <meta property="og:site_name" content="Mobbin" />
    </head></html>
  `;
  const meta = parseWebsiteMetaHtml(html, 'https://mobbin.com/discover');
  assert.equal(meta.title, 'Mobbin — UI & UX Reference');
  assert.equal(meta.description, 'Explore real-world mobile & web design patterns.');
  assert.equal(meta.imageUrl, 'https://mobbin.com/assets/og-cover.png');
  assert.equal(meta.siteName, 'Mobbin');

  const unsafeHtml = `<html><head><meta property="og:image" content="javascript:alert(1)" /></head></html>`;
  const unsafeMeta = parseWebsiteMetaHtml(unsafeHtml, 'https://example.com');
  assert.equal(unsafeMeta.imageUrl, undefined);
});

test('context menus remove move-out button and expose website preview action', async () => {
  const [launcherMenus, bookmarkMenus, dnr, manifest] = await Promise.all([
    readFile(new URL('../src/launcher/LauncherMenus.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/bookmarks/BookmarkBoardMenu.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/background/dnr.ts', import.meta.url), 'utf8'),
    readFile(new URL('../manifest.json', import.meta.url), 'utf8')
  ]);
  assert.doesNotMatch(launcherMenus, /移出文件夹，放到外面/);
  assert.match(launcherMenus, /id="link-menu-preview"[^>]*>[\s\S]*预览/);
  assert.match(bookmarkMenus, /id="link-menu-preview"[^>]*>[\s\S]*预览/);
  assert.match(dnr, /RULE_ID_PREVIEW_FRAME\s*=\s*2006/);
  assert.match(dnr, /resourceTypes:\s*\["sub_frame"\]/);
  const csp = JSON.parse(manifest).content_security_policy?.extension_pages || '';
  assert.match(csp, /frame-src[^;]*https:/);
});
