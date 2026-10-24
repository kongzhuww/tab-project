/**
 * B站 UP 主关注与取关网络请求。
 * 依赖 bili_jct 鉴权并提交 relation/modify 接口。
 */
import { bilibiliService } from "../services/bilibili.service";

export async function followBiliUp(mid: string | number): Promise<{ ok: boolean; reason?: string }> {
  const csrf = await bilibiliService.getBiliJct();
  if (!csrf) return { ok: false, reason: "未检测到 B站 登录态（bili_jct 缺失）" };
  try {
    const body = new URLSearchParams({
      fid: String(mid),
      act: "1",
      re_src: "11",
      csrf,
      csrf_token: csrf
    });
    const r = await fetch("https://api.bilibili.com/x/relation/modify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: body.toString()
    });
    const j = await r.json();
    if (j.code === 0 || j.code === 22002 || j.code === 22014) return { ok: true };
    return { ok: false, reason: j.message || ("code " + j.code) };
  } catch (e: any) {
    return { ok: false, reason: e?.message || "网络请求失败" };
  }
}

export async function unfollowBiliUp(mid: string | number): Promise<{ ok: boolean; reason?: string }> {
  const csrf = await bilibiliService.getBiliJct();
  if (!csrf) return { ok: false, reason: "未检测到 B站 登录态（bili_jct 缺失）" };
  try {
    const body = new URLSearchParams({
      fid: String(mid),
      act: "2",
      re_src: "11",
      csrf,
      csrf_token: csrf
    });
    const r = await fetch("https://api.bilibili.com/x/relation/modify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: body.toString()
    });
    const j = await r.json();
    if (j.code === 0 || j.code === 22002 || j.code === 22014) return { ok: true };
    return { ok: false, reason: j.message || ("code " + j.code) };
  } catch (e: any) {
    return { ok: false, reason: e?.message || "网络请求失败" };
  }
}
