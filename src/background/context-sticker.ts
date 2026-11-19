import { StickerLibraryRepository } from '../stickers/library-repository';
import { saveSticker } from '../stickers/sticker-db';
import { cloneLibraryIndex, LIBRARY_CHANGE_KEY } from '../stickers/library-index';
import { STICKER_ROOT_NAME_KEY } from '../stickers/settings-keys';
import { readStickerOriginal, writeStickerOriginal } from '../stickers/original-files';

declare const chrome: any;

/** Save to the same library used by the Agent workspace, without changing its storage mode. */
export async function saveContextSticker(blob: Blob, extension: string): Promise<void> {
  const owner = 'context-menu';
  const repository = new StickerLibraryRepository(owner);
  const root = await repository.readRoot();
  if (!root) {
    const stored = await chrome.storage.local.get([STICKER_ROOT_NAME_KEY]);
    if (stored[STICKER_ROOT_NAME_KEY]) throw new Error('请先在表情包资料库重新授权本地图库');
    await saveSticker(blob, `图片.${extension}`, '默认', owner);
    return;
  }
  if (await (root as any).queryPermission({ mode: 'readwrite' }) !== 'granted') {
    throw new Error('请先在表情包资料库授予本地图库写入权限');
  }
  const index = await repository.find(root);
  if (index && index.images.length >= 20000) throw new Error('表情包图库已满');
  const { fileName, handle } = await writeStickerOriginal(root, blob, extension, blob.type, () => true);
  if (index) {
    const file = await readStickerOriginal(handle);
    const next = cloneLibraryIndex(index);
    next.images.push({ id: `image_${crypto.randomUUID()}`, path: fileName, name: fileName,
      size: file.size, modified: file.lastModified, groupId: '', hidden: false, handle });
    await repository.save(next);
  } else {
    await chrome.storage.local.set({ [LIBRARY_CHANGE_KEY]: `${owner}:${crypto.randomUUID()}` });
  }
}
