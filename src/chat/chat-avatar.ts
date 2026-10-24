import { safeExternalUrl } from "./chat-security";

export function profileAvatarUrl(value: unknown): string {
  const url = safeExternalUrl(value);
  return url && url.length <= 1000 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(url) ? url : "";
}

// Private relay accepts URL/emoji avatars, not local data images in request URLs.
export function relayAvatar(value: string, profileUrl = ""): string {
  const url = profileAvatarUrl(value) || profileAvatarUrl(profileUrl);
  if (url) return url;
  return value && value.length <= 8 && !/[:/]/.test(value) ? value : "🦫";
}
