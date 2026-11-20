export interface CommentEmote {
  text: string;
  url: string;
  textOnly: boolean;
  failed: boolean;
}
export interface CommentEmotePackage { text: string; emote: CommentEmote[]; }

export function parseCommentEmotePackages(packages: any[]): CommentEmotePackage[] {
  return packages
    .filter(pack => Array.isArray(pack?.emote) && pack.emote.length)
    .map(pack => {
      const text = String(pack.text || 'B站表情');
      return {
        text,
        emote: pack.emote.map((item: any) => ({
          text: String(item?.text || ''),
          url: String(item?.url || '').replace(/^http:/, 'https:'),
          textOnly: text.includes('颜文字'),
          failed: false,
        })).filter((item: CommentEmote) => item.text),
      };
    }).filter(pack => pack.emote.length);
}
