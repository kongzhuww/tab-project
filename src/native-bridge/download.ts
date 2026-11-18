import nativeHostSource from '../../native-host/tab-project-native-host.mjs?raw';
import {
  buildMacLinuxInstaller,
  buildWindowsCmdInstaller,
  detectInstallerPlatform,
  type InstallerPlatform,
} from './installer';

declare const chrome: any;

export function generateInstallerDownload(extensionId: string, platform: InstallerPlatform = detectInstallerPlatform()): {
  filename: string;
  content: string;
  mimeType: string;
  runHint: string;
} {
  if (platform === 'windows') {
    const filename = 'tab-project-install.cmd';
    return {
      filename,
      content: buildWindowsCmdInstaller(extensionId, nativeHostSource),
      mimeType: 'text/plain;charset=utf-8',
      runHint: `双击下载的 ${filename} 即可自动安装`,
    };
  }
  const filename = 'tab-project-install.sh';
  return {
    filename,
    content: buildMacLinuxInstaller(extensionId, nativeHostSource),
    mimeType: 'text/x-shellscript;charset=utf-8',
    runHint: `sh ~/Downloads/${filename}`,
  };
}

function quoteShellPath(filePath: string): string {
  return `'${filePath.replace(/'/g, `'\\''`)}'`;
}

async function waitForDownloadPath(downloadId: number, fallbackFilename: string): Promise<string> {
  if (!chrome?.downloads?.search) return '';
  for (let i = 0; i < 20; i++) {
    const [item] = await chrome.downloads.search({ id: downloadId });
    if (item?.state === 'complete' && item.filename) return item.filename;
    if (item?.state === 'interrupted') return '';
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  const [item] = await chrome.downloads.search({ id: downloadId });
  return item?.filename || fallbackFilename;
}

export async function triggerInstallerDownload(
  extensionId: string,
  platform: InstallerPlatform = detectInstallerPlatform()
): Promise<{
  filename: string;
  runHint: string;
  downloadId?: number;
}> {
  const { filename, content, mimeType, runHint } = generateInstallerDownload(extensionId, platform);
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  if (typeof chrome !== 'undefined' && chrome.downloads?.download) {
    try {
      const downloadId: number = await chrome.downloads.download({
        url,
        filename,
        conflictAction: 'overwrite',
        saveAs: false,
      });
      const resolvedPath = await waitForDownloadPath(downloadId, filename);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      const exactHint = platform === 'windows'
        ? runHint
        : resolvedPath
          ? `sh ${quoteShellPath(resolvedPath)}`
          : runHint;
      return { filename, runHint: exactHint, downloadId };
    } catch {
      // Fall back to anchor download if downloads API rejects blob URLs.
    }
  }

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return { filename, runHint };
}
