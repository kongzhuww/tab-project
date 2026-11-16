import { r as C } from "./vendor-vue-C09jaOfK.js";
function I(e) {
  return e === "deepseek-flash" || e === "deepseek-v4-pro";
}
const l = "byokConfigV1", O = "byokConversationsV1", k = O, f = () => chrome.storage.local;
async function _() {
  const e = (await f().get(l))[l]?.deepseek, t = Array.isArray(e?.models) ? e.models.filter((r) => typeof r == "string" && /^[a-zA-Z0-9._-]{1,100}$/.test(r)) : [];
  return { key: typeof e?.key == "string" ? e.key : "", model: typeof e?.model == "string" && e.model ? e.model : "deepseek-flash", models: t };
}
async function j(e, t, r) {
  const o = e.trim(), d = t.trim();
  if (!o || !/^[\x21-\x7e]{1,512}$/.test(o)) throw new Error("请填写有效的 API Key，不能包含空格或换行。");
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(d)) throw new Error("模型名称格式无效。");
  const s = (await f().get(l))[l], a = s?.deepseek, h = (r || (a?.key === o && Array.isArray(a?.models) ? a.models : [])).filter((g) => typeof g == "string" && /^[a-zA-Z0-9._-]{1,100}$/.test(g)).slice(0, 200);
  await f().set({ [l]: { ...s && typeof s == "object" ? s : {}, deepseek: { key: o, model: d, models: h } } });
}
async function z(e) {
  const t = e.trim();
  if (!/^[\x21-\x7e]{1,512}$/.test(t)) throw new Error("请先填写有效的 DeepSeek API Key。");
  let r;
  try {
    r = await fetch("https://api.deepseek.com/models", { headers: { Authorization: `Bearer ${t}`, Accept: "application/json" }, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer", cache: "no-store", signal: AbortSignal.timeout(15e3) });
  } catch {
    throw new Error("无法连接 DeepSeek 获取模型，请检查网络后重试。");
  }
  if (!r.ok)
    throw r.body?.cancel().catch(() => {
    }), new Error(r.status === 401 ? "DeepSeek API Key 无效或已过期（401）。" : `获取模型失败（HTTP ${r.status}），请稍后重试。`);
  let o;
  try {
    o = await r.json();
  } catch {
    throw new Error("DeepSeek 返回的模型列表格式无效。");
  }
  const d = o?.data;
  if (!Array.isArray(d)) throw new Error("DeepSeek 返回的模型列表格式无效。");
  const s = [...new Set(d.map((a) => a?.id).filter((a) => typeof a == "string" && /^[a-zA-Z0-9._-]{1,100}$/.test(a)))].slice(0, 200);
  if (!s.length) throw new Error("DeepSeek 未返回可用模型。");
  return s;
}
async function K() {
  const e = (await f().get(l))[l], t = { ...e && typeof e == "object" ? e : {} };
  delete t.deepseek, await f().set({ [l]: t });
}
async function b() {
  const e = (await f().get(k))[k];
  return Array.isArray(e) ? e.filter((t) => t && t.provider === "deepseek" && typeof t.id == "string" && Array.isArray(t.messages)) : [];
}
async function v(e) {
  return typeof navigator < "u" && navigator.locks ? navigator.locks.request("tab-project:byok-history", e) : e();
}
async function N(e) {
  await v(async () => {
    const t = await b(), r = JSON.parse(JSON.stringify(e));
    if (t.length >= 50 && !t.some((o) => o.id === r.id)) throw new Error("本机会话已达 50 条，请先删除不需要的会话。");
    await f().set({ [k]: [r, ...t.filter((o) => o.id !== r.id)] });
  });
}
async function B(e) {
  await v(async () => {
    await f().set({ [k]: (await b()).filter((t) => t.id !== e) });
  });
}
async function Z(e, t, r, o, d, s, a) {
  const h = e.trim();
  if (!/^[\x21-\x7e]{1,512}$/.test(h)) throw new Error("请先在设置中填写有效的 DeepSeek API Key。");
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(t)) throw new Error("模型名称格式无效。");
  const g = r.filter((n) => !n.incomplete && (n.role === "user" || n.role === "assistant")).map((n) => ({ role: n.role, content: n.content })), i = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${h}`, "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({ model: t, messages: g, stream: !0, ...I(t) && s && ["none", "low", "high", "max"].includes(s) ? { reasoning_effort: s } : {} }),
    signal: o,
    credentials: "omit",
    redirect: "error",
    referrerPolicy: "no-referrer",
    cache: "no-store"
  });
  if (!i.ok)
    throw i.body?.cancel().catch(() => {
    }), i.status === 401 ? new Error("DeepSeek API Key 无效或已过期（401）。") : i.status === 402 ? new Error("DeepSeek API 余额不足（402），请检查 API 账户。") : i.status === 429 ? new Error("DeepSeek 请求过于频繁（429），请稍后再试。") : new Error(`DeepSeek 请求失败（HTTP ${i.status}），请检查模型、余额或网络。`);
  if (!i.body) throw new Error("DeepSeek 未返回回复流。");
  const u = i.body.getReader(), x = new TextDecoder();
  let y = "", m = !1, E = 0;
  const P = (n) => {
    const p = n.split(`
`).filter((c) => c.startsWith("data:")).map((c) => c.slice(5).trimStart()).join(`
`);
    if (!p) return;
    if (p.trim() === "[DONE]") {
      m = !0;
      return;
    }
    let w;
    try {
      w = JSON.parse(p);
    } catch {
      throw new Error("DeepSeek 回复流格式异常。");
    }
    if (w.error) throw new Error("DeepSeek 回复流出现错误，请检查账户后重试。");
    const D = w?.choices?.[0]?.delta;
    for (const [c, $] of [[D?.content, d], [D?.reasoning_content, a]])
      if (typeof c == "string" && c) {
        if (E += c.length, E > 1e6) throw new Error("回复过长，已停止接收。");
        $?.(c);
      }
  };
  try {
    for (; !m; ) {
      const n = await u.read();
      y += x.decode(n.value, { stream: !n.done }).replace(/\r\n/g, `
`);
      let p;
      for (; (p = y.indexOf(`

`)) >= 0; ) {
        const w = y.slice(0, p);
        y = y.slice(p + 2), P(w);
      }
      if (y.length > 2e6) throw new Error("DeepSeek 回复流过大。");
      if (n.done) break;
    }
    if (!m) throw new Error("回复连接提前中断，内容可能不完整；请求可能已计费。");
  } finally {
    u.cancel().catch(() => {
    }), u.releaseLock();
  }
}
const A = C({ pending: null });
let S = 0;
function q(e, t) {
  A.pending = { id: ++S, kind: "draft", text: e, resource: t };
}
function H(e, t) {
  e === "deepseek" && typeof t == "string" && (A.pending = { id: ++S, kind: e, conversationId: t }), e === "multica" && typeof t != "string" && (A.pending = { id: ++S, kind: e, issue: t });
}
export {
  O as B,
  H as a,
  _ as b,
  N as c,
  B as d,
  Z as e,
  A as f,
  z as g,
  j as h,
  K as i,
  b as l,
  q as r,
  I as s
};
