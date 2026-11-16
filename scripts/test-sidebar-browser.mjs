// Run against an isolated extension build served at http://127.0.0.1:18766:
// ego-browser nodejs < scripts/test-sidebar-browser.mjs
// No credentials or real browser-extension storage are used by this HTTP preview.
const assert = await import('node:assert/strict');
const task = await taskSpace('验证共享侧栏');
const page = task.page('p1');
const base = 'http://127.0.0.1:18766';
async function open(path) {
  await page.goto(base + path, { waitUntil:'domcontentloaded', timeout:20000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
}
async function measures(sidebar, card) {
  return page.evaluate(({sidebar,card}) => {
    function dimensions(selector) {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { width:rect.width, height:rect.height };
    }
    return { sidebar:dimensions(sidebar), card:dimensions(card) };
  }, { sidebar,card });
}
try {
  for (const width of [1440, 800]) {
    await page.cdp('Emulation.setDeviceMetricsOverride', { width, height:900, deviceScaleFactor:1, mobile:false });
    await open('/aihot.html');
    const ai = await measures('.aihot-tabs','.aihot-nav-card');
    assert.ok(ai.sidebar && ai.card, 'AI Hot sidebar is missing');
    await page.click('css:button[data-view="feed"]', { label:'切换精选资讯' });
    assert.equal(await page.evaluate(() => document.querySelector('button[data-view="feed"]')?.getAttribute('aria-pressed')), 'true');
    await open('/bilibili.html');
    const bili = await measures('.fo-bili-sidebar','.fo-sidebar-sub-btn');
    assert.ok(bili.sidebar && bili.card, 'Bilibili sidebar is missing');
    assert.equal(ai.sidebar.width,bili.sidebar.width,`sidebar width at ${width}px`);
    assert.equal(ai.card.width,bili.card.width,`card width at ${width}px`);
    assert.ok(Math.abs(ai.card.height-bili.card.height)<1,`card height at ${width}px`);
    await page.click('css:#fo-sidebar-cache-btn', { label:'切换缓存视频' });
    let cacheSelected = false;
    for (let attempt = 0; attempt < 30 && !cacheSelected; attempt++) {
      cacheSelected = await page.evaluate(() => document.querySelector('#fo-sidebar-cache-btn')?.classList.contains('on') === true);
      if (!cacheSelected) await new Promise(resolve => setTimeout(resolve,100));
    }
    assert.equal(cacheSelected,true,'Bilibili cache view did not become selected');
    console.log(JSON.stringify({width,ai,bili}));
  }
  console.log('Shared sidebar behavior passed.');
} finally {
  await page.cdp('Emulation.clearDeviceMetricsOverride', {}).catch(() => {});
  await task.finish({ keep:[] });
}
