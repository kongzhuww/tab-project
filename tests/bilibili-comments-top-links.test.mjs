import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const code = source => stripTypeScriptTypes(source).replace(/^import\s[\s\S]*?;\s*$/gm, '').replace(/^export /gm, '');

test('rich-text parser extracts bare domain links and preserves standard protocols', async () => {
  const context = vm.createContext({ URL, RegExp });
  vm.runInContext(code(await read('src/bilibili/rich-text.ts')), context);
  const parse = context.parseBiliRichText;

  // 1. 标准带协议链接
  const r1 = parse('欢迎访问 https://github.com/kongzhuww 仓库！');
  const link1 = r1.find(t => t.type === 'link');
  assert.equal(link1?.url, 'https://github.com/kongzhuww');
  assert.equal(link1?.text, 'https://github.com/kongzhuww');

  // 2. 裸域名链接 (如 bilibili.com, github.com 等)
  const r2 = parse('传送门在这里 bilibili.com/video/BV1xx411c7mD 记得三连');
  const link2 = r2.find(t => t.type === 'link');
  assert.equal(link2?.url, 'https://bilibili.com/video/BV1xx411c7mD');
  assert.equal(link2?.text, 'bilibili.com/video/BV1xx411c7mD');

  // 3. BV号识别
  const r3 = parse('请参考 BV1xx411c7mD 讲解');
  const link3 = r3.find(t => t.type === 'link');
  assert.equal(link3?.url, 'https://www.bilibili.com/video/BV1xx411c7mD');
});

test('B站评论解析注入置顶评论并排在第一项', async () => {
  const context = vm.createContext({
    URL,
    fetch: async () => ({
      ok: true,
      json: async () => ({
        code: 0,
        data: {
          top: {
            rpid: 9999,
            mid: 1001,
            member: { uname: 'UP主置顶人', avatar: 'http://face.png' },
            content: { message: '这是置顶留言' },
            ctime: 1700000000,
            like: 50
          },
          replies: [
            {
              rpid: 1001,
              mid: 2002,
              member: { uname: '普通热评人', avatar: 'http://face2.png' },
              content: { message: '普通留言' },
              ctime: 1700000010,
              like: 20
            }
          ],
          page: { count: 2 }
        }
      })
    })
  });

  const svcCode = code(await read('src/services/bilibili.service.ts')).replace(/^const bilibiliService = BilibiliService.getInstance\(\);\s*$/m, '');
  vm.runInContext(svcCode + '\nglobalThis.api = Object.create(BilibiliService.prototype);', context);
  context.api.api = async (url) => (await context.fetch(url)).json().then(r => r.data);

  const res = await context.api.getVideoComments('123456', 1, 20);
  assert.equal(res.comments.length, 2);
  assert.equal(res.comments[0].rpid, 9999);
  assert.equal(res.comments[0].isTop, true);
  assert.equal(res.comments[0].uname, 'UP主置顶人');
  assert.equal(res.comments[1].rpid, 1001);
  assert.equal(res.comments[1].isTop, false);
});
