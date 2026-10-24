// Fixed official-origin requests only. Browser owns the website session;
// never copy MUSIC_U into extension storage, query strings or proxy requests.
const ORIGIN = "https://music.163.com";

export async function requestOfficialNetease<T = any>(
  endpoint: string, params: Record<string, any> = {}, signal?: AbortSignal
): Promise<T> {
  signal?.throwIfAborted();
  let path: string;
  let values: Record<string, unknown>;
  switch (endpoint) {
    case "/login/status":
    case "/user/account": path = "/api/nuser/account/get"; values = {}; break;
    case "/user/detail": path = `/api/v1/user/detail/${encodeURIComponent(String(params.uid))}`; values = {}; break;
    case "/user/playlist": path = "/api/user/playlist"; values = { uid: params.uid, limit: params.limit ?? 100, offset: 0 }; break;
    case "/playlist/detail":
    case "/playlist/track/all": path = "/api/playlist/detail"; values = { id: params.id, n: 1000, s: 0 }; break;
    case "/likelist": path = "/api/song/like/get"; values = { uid: params.uid }; break;
    case "/cloudsearch":
    case "/search": path = "/api/search/get/web"; values = { s: params.keywords, type: 1, limit: params.limit ?? 60, offset: 0 }; break;
    case "/lyric": path = "/api/song/lyric"; values = { id: params.id, lv: -1, kv: -1, tv: -1 }; break;
    case "/song/url":
    case "/song/url/v1": path = "/api/song/enhance/player/url"; values = { ids: JSON.stringify([params.id]), br: 320000 }; break;
    default: throw new Error("此功能暂未接入官网会话，不会回退到第三方音乐节点。");
  }
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null) body.set(key, String(value));
  }
  let response: Response;
  try {
    const url = new URL(ORIGIN + path);
    url.search = body.toString();
    response = await fetch(url, {
      method: "GET", credentials: "include", redirect: "error", cache: "no-store",
      headers: { Accept: "application/json" },
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000)
    });
  } catch {
    signal?.throwIfAborted();
    throw new Error("网易云官网请求失败或超时，请确认官网可以访问，并检查扩展的网站访问权限。");
  }
  if (!response.ok) throw new Error(`网易云官网返回 HTTP ${response.status}，请稍后重试。`);
  let data: any;
  try { data = await response.json(); }
  catch { throw new Error("网易云官网未返回有效数据，请在官网确认登录状态。"); }
  signal?.throwIfAborted();
  if (!data || typeof data !== "object") throw new Error("网易云官网响应格式无效。");
  if (Number(data.code) === 301 || Number(data.code) === 401) {
    throw new Error("官网会话未登录或已失效，请先在同一浏览器的网易云官网登录。");
  }
  if (data.code !== undefined && Number(data.code) !== 200) {
    throw new Error(`网易云官网未接受请求（状态 ${Number(data.code) || "未知"}），可能需要重新登录或遇到接口限制。`);
  }
  if ((endpoint === "/playlist/detail" || endpoint === "/playlist/track/all") && !data.playlist && data.result) {
    data.playlist = data.result;
  }
  if (endpoint === "/playlist/track/all") {
    const tracks = data.playlist?.tracks || [];
    const offset = Number(params.offset) || 0;
    return { ...data, songs: tracks.slice(offset, offset + (Number(params.limit) || 500)) } as T;
  }
  return data as T;
}
