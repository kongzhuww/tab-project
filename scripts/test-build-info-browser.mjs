// Run against an isolated extension build served at http://127.0.0.1:18766:
// ego-browser nodejs < scripts/test-build-info-browser.mjs
// The iframe uses mock extension storage and a fake disk build; it never touches user data.
const assert = await import('node:assert/strict');
const task = await taskSpace('验证构建标识');
const page = task.page('p1');
const base = 'http://127.0.0.1:18766';
try {
  await page.goto(base + '/options.html', { waitUntil:'domcontentloaded', timeout:20000 });
  await page.evaluate(async (origin) => {
    const html = await (await fetch(origin + '/options.html')).text();
    const manifest = await (await fetch(origin + '/manifest.json')).json();
    if (typeof manifest.version !== 'string') throw new Error('Preview manifest is missing a version');
    const mock = `<base href="${origin}/"><script>
      window.chrome = window.chrome || {};
      window.chrome.storage = {local:{get:async()=>({}),set:async()=>{}},onChanged:{addListener:()=>{},removeListener:()=>{}}};
      window.chrome.runtime = {getManifest:()=>({version:${JSON.stringify(manifest.version)}}),getURL:path=>new URL(path,document.baseURI).href,reload:()=>{}};
      const originalFetch=window.fetch.bind(window);
      window.fetch=(url,opts)=>String(url).split('?')[0].endsWith('/generated/build-info.json')
        ? Promise.resolve(new Response(JSON.stringify({id:'ba15623e-d974-49d6-8a0f-6876b46d26ad',builtAt:'2026-11-15T01:02:00.000Z'}),{status:200,headers:{'Content-Type':'application/json'}}))
        : originalFetch(url,opts);
    <\/script>`;
    const frame = document.createElement('iframe');
    frame.id = 'build-test-frame'; frame.style.display = 'none';
    frame.srcdoc = html.replace('<script type="module" src="generated/vue-ui.js"></script>', mock + '<script type="module" src="generated/vue-ui.js"></script>');
    document.body.appendChild(frame);
  }, base);
  let result;
  for (let i=0; i<40; i++) {
    result = await page.evaluate(() => {
      const doc = document.querySelector('#build-test-frame')?.contentDocument;
      const texts = Array.from(doc?.querySelectorAll('.settings-view-root div') || [], element => element.textContent || '');
      return { build:texts.find(text => /^当前构建 [a-f0-9]{8} · /.test(text)) || '', reload:Array.from(doc?.querySelectorAll('button') || []).some(button => button.textContent?.includes('立即重新载入')) };
    });
    if (result.build.includes('磁盘构建 ba15623e（需重载）')) break;
    await new Promise(resolve => setTimeout(resolve,100));
  }
  assert.match(result.build,/磁盘构建 ba15623e（需重载）/);
  assert.equal(result.reload,true);
  console.log('Same-version disk build mismatch is shown and offers reload.');
} finally { await task.finish({keep:[]}); }
