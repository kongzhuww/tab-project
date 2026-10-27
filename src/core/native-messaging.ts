import { parseNativeReply, type NativeReply, type NativeRequest } from "./native-protocol";

declare const chrome: any;

/**
 * 历史存根：Native Messaging / Native Host 伴侣通信已于 v1.0.2 版本彻底停用。
 * Manifest V3 中已移除 nativeMessaging 权限与所有底层端口调用。
 * 本存根仅用于保障历史调用点的类型安全与优雅降级，不执行任何外部进程通信。
 */
export function sendNativeRequest(_message: NativeRequest, _timeoutMs = 95000): Promise<NativeReply> {
  return Promise.resolve({ ok: false, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
