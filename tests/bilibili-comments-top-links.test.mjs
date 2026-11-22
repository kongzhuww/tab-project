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

  // 4. 带空格的动态/装扮表情短码识别
  const emoteUrl = 'https://i0.hdslb.com/bfs/garb/neuro-heart.png';
  const r4 = parse(
    '[Neuro sama动态表情包_比心][Neuro sama动态表情包_比心]',
    { '[Neuro sama动态表情包_比心]': emoteUrl }
  );
  assert.equal(r4.filter(t => t.type === 'emote').length, 2);
  assert.equal(r4[0].url, emoteUrl);

  // 5. @提及（有 mid 直达主页，无 mid 走 UP 搜索），且不误伤邮箱
  const r5 = parse(
    '回复 @晚秋Wan-chiu :@NeuroSama 联系 test@example.com [Neuro sama动态表情包_比心]',
    { '[Neuro sama动态表情包_比心]': emoteUrl },
    { '晚秋Wan-chiu': '123456' }
  );
  const mentions = r5.filter(t => t.type === 'mention');
  assert.equal(mentions.length, 2);
  assert.equal(mentions[0].text, '@晚秋Wan-chiu');
  assert.equal(mentions[0].url, 'https://space.bilibili.com/123456');
  assert.equal(mentions[1].text, '@NeuroSama');
  assert.equal(mentions[1].url, 'https://search.bilibili.com/upuser?keyword=NeuroSama');
  assert.equal(r5.some(t => t.type === 'emote' && t.url === emoteUrl), true);
  assert.equal(r5.some(t => t.type === 'text' && t.text.includes('test@example.com')), true);
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
            content: {
              message: '这是置顶留言 @晚秋Wan-chiu [Neuro sama动态表情包_比心]',
              emote: {
                '[Neuro sama动态表情包_比心]': { url: 'http://i0.hdslb.com/bfs/emote/neuro.png' }
              },
              members: [{ mid: 556677, uname: '晚秋Wan-chiu' }]
            },
            replies: [
              {
                rpid: 8888,
                mid: 3003,
                member: { uname: '楼中楼路人', avatar: 'http://face3.png' },
                content: {
                  message: '回复 @UP主置顶人 : [doge]',
                  emote: { '[doge]': { url: 'http://i0.hdslb.com/bfs/emote/doge.png' } },
                  at_name_to_mid: { 'UP主置顶人': 1001 }
                },
                ctime: 1700000005,
                like: 5
              }
            ],
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
  assert.equal(
    res.comments[0].emotes['[Neuro sama动态表情包_比心]'],
    'https://i0.hdslb.com/bfs/emote/neuro.png'
  );
  assert.equal(res.comments[0].mentions['晚秋Wan-chiu'], '556677');
  assert.equal(res.comments[0].replies[0].emotes['[doge]'], 'https://i0.hdslb.com/bfs/emote/doge.png');
  assert.equal(res.comments[0].replies[0].mentions['UP主置顶人'], '1001');
  assert.equal(res.comments[1].rpid, 1001);
  assert.equal(res.comments[1].isTop, false);
});
