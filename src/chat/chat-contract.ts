import definition from "../../server/private-chat/protocol.json";
import { chatImageDimensions } from "./chat-image-header";

export const CHAT_PROTOCOL = definition.protocol;
export const CHAT_LIMITS = Object.freeze({ ...definition.limits });
export type ChatWireMessageType = keyof typeof definition.messageTypes;
export const CHAT_MESSAGE_TYPES: readonly ChatWireMessageType[] = Object.freeze(Object.keys(definition.messageTypes) as ChatWireMessageType[]);
export const CHAT_IMAGE_MIME_TYPES: readonly string[] = Object.freeze([...definition.imageMimeTypes]);
export interface ChatCapabilities {
  status: "unknown" | "legacy" | "supported" | "incompatible";
  reason: string;
  messageTypes: string[];
  imageMimeTypes: string[];
  limits: typeof definition.limits;
}
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const positive = (value: unknown): value is number => typeof value === "number" && Number.isSafeInteger(value) && value > 0;
export function unknownChatCapabilities(): ChatCapabilities {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...CHAT_LIMITS } };
}
function incompatible(): ChatCapabilities {
  return { ...unknownChatCapabilities(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
/** Authenticated sync only. Health responses are never proof of send permission. */
export function parseChatCapabilities(value: unknown): ChatCapabilities {
  if (value === undefined || (record(value) && !("schema" in value) && !("protocol" in value) && !("messageTypes" in value) && !("limits" in value))) {
    if (value !== undefined && !record(value)) return incompatible();
    const image = record(value) && value.imageMessages === 1;
    if (record(value) && value.maxImageBytes !== undefined && !positive(value.maxImageBytes)) return incompatible();
    return { status: "legacy", reason: image ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: CHAT_MESSAGE_TYPES.filter(type => type === "image" ? image : definition.messageTypes[type].legacy),
      imageMimeTypes: image ? [...CHAT_IMAGE_MIME_TYPES] : [],
      limits: { ...CHAT_LIMITS, imageBytes: image && record(value) && positive(value.maxImageBytes) ? Math.min(value.maxImageBytes, CHAT_LIMITS.imageBytes) : CHAT_LIMITS.imageBytes } };
  }
  if (!record(value) || value.schema !== 1 || value.protocol !== CHAT_PROTOCOL || !record(value.limits) ||
      !Array.isArray(value.messageTypes) || value.messageTypes.length > 64 || value.messageTypes.some(type => typeof type !== "string") ||
      !Array.isArray(value.imageMimeTypes) || value.imageMimeTypes.length > 16 || value.imageMimeTypes.some(type => typeof type !== "string")) return incompatible();
  const limits = { ...CHAT_LIMITS };
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    const supplied = value.limits[key];
    if (!positive(supplied)) return incompatible();
    limits[key] = Math.min(limits[key], supplied);
  }
  const mimes = CHAT_IMAGE_MIME_TYPES.filter(mime => (value.imageMimeTypes as unknown[]).includes(mime));
  const types = CHAT_MESSAGE_TYPES.filter(type => (value.messageTypes as unknown[]).includes(type) && (type !== "image" || (value.imageMessages === 1 && mimes.length > 0)));
  return { status: "supported", reason: types.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: types, imageMimeTypes: mimes, limits };
}
export function isInlineChatImage(value: unknown, limits = CHAT_LIMITS, mimes: readonly string[] = CHAT_IMAGE_MIME_TYPES): value is string {
  if (typeof value !== "string" || value.length > Math.ceil(limits.imageBytes / 3) * 4 + 32) return false;
  const match = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match || !mimes.includes(match[1])) return false;
  const payload = match[2], size = payload.length / 4 * 3 - (payload.endsWith("==") ? 2 : payload.endsWith("=") ? 1 : 0);
  return payload.length % 4 === 0 && size > 0 && size <= limits.imageBytes;
}
export function outgoingChatError(capabilities: ChatCapabilities, message: unknown): string {
  if (!record(message) || typeof message.type !== "string" || typeof message.content !== "string" || typeof message.id !== "string" || !message.id ||
      typeof message.timestamp !== "number" || !Number.isFinite(message.timestamp) || !record(message.sender) || typeof message.sender.uid !== "string" ||
      typeof message.sender.name !== "string" || typeof message.sender.avatar !== "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const imageUrl = record(message.meta) ? message.meta.imageUrl : undefined;
  if (capabilities.status === "unknown" || capabilities.status === "incompatible") return capabilities.reason;
  if (!capabilities.messageTypes.includes(message.type)) return message.type === "image" ? capabilities.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (message.content.length > capabilities.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (message.type === "image" && !isInlineChatImage(imageUrl, capabilities.limits, capabilities.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (message.type === "image") {
    const dimensions = chatImageDimensions(imageUrl as string);
    if (!dimensions || dimensions.some(size => size < 1 || size > capabilities.limits.imageMaxDimension) || dimensions[0] * dimensions[1] > capabilities.limits.imageMaxPixels) return "图片文件头或像素尺寸不符合当前服务端限制，请重新选择；原内容已保留。";
  }
  let payload: string;
  try { payload = JSON.stringify({ message }); }
  catch { return "消息不能安全编码，原记录已保留，请核对后重新发送。"; }
  const bytes = new TextEncoder().encode(payload).byteLength;
  if (bytes > (message.type === "image" ? capabilities.limits.imageMessageBytes : capabilities.limits.messageBytes)) return "消息超过服务端声明的JSON大小上限，内容已保留。";
  return "";
}
