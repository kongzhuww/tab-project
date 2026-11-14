const _ = "logicweaver_prompt_backpack_revision_v1", E = "logicweaver_saved_articles_revision_v1";
class s extends Error {
  constructor() {
    super("背包已在其他页面更新；未覆盖，请先刷新并核对数据。");
  }
}
function w(r) {
  if (r === void 0) return 0;
  if (!Number.isSafeInteger(r) || r < 0) throw new Error("背包版本记录无效，未写入数据");
  return r;
}
async function i(r, t) {
  return w((await r.get(t))[t]);
}
async function k(r, t, a, c, e) {
  if (!Number.isSafeInteger(c) || c < 0 || Object.hasOwn(e, a)) throw new Error("背包写入参数无效");
  return t.request(`tab-project:backpack:${a}`, async () => {
    const n = await i(r, a);
    if (n !== c) throw new s();
    if (n >= Number.MAX_SAFE_INTEGER) throw new Error("背包版本号已耗尽，未写入数据");
    const o = n + 1;
    return await r.set({ ...e, [a]: o }), o;
  });
}
export {
  E as A,
  _ as P,
  s as S,
  w as p,
  k as w
};
