import { parseNativeReply, type NativeReply, type NativeRequest } from "./native-protocol";

declare const chrome: any;

/** One call to one installed host. No fallback/replay after an uncertain outcome. */
export function sendNativeRequest(_message: NativeRequest, _timeoutMs = 95000): Promise<NativeReply> {
  return Promise.resolve({ ok: false, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
