/** Physical directory metadata, independent of the UI/service facade. */
export interface StickerFileItem {
  id?: string;
  file: string;
  relPath: string;
  folderPath: string;
  folderName: string;
  size: number;
  modified: number;
  handle: FileSystemFileHandle;
  dirHandle: FileSystemDirectoryHandle;
}

export interface StickerDirectoryNode {
  handle: FileSystemDirectoryHandle;
  name: string;
  path: string;
  depth: number;
  directItems: StickerFileItem[];
  subDirs: StickerDirectoryNode[];
  totalCount: number;
}
