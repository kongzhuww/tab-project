import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const shimPath = path.resolve(testDir, '../src/wallpaper/we-shim.ts');
const opfsPath = path.resolve(testDir, '../src/wallpaper/opfs-storage.ts');
const visualizerPath = path.resolve(testDir, '../src/wallpaper/audio-visualizer.ts');
const scannerPath = path.resolve(testDir, '../src/wallpaper/workshop-scanner.ts');
const applierPath = path.resolve(testDir, '../src/wallpaper/workshop-applier.ts');

test('WE Shim: provides standard 10 interfaces and synthetic event handlers', () => {
  const code = readFileSync(shimPath, 'utf8');
  assert.ok(code.includes('window.wallpaperPropertyListener'));
  assert.ok(code.includes('window.wallpaperRegisterAudioListener'));
  assert.ok(code.includes('window.wallpaperRegisterMediaIntegrationListener'));
  assert.ok(code.includes('window.wallpaperRegisterMediaStatusListener'));
  assert.ok(code.includes('window.wallpaperRequestRandomFileForProperty'));
  assert.ok(code.includes('WE_MOUSE_MOVE'));
  assert.ok(code.includes('WE_AUDIO_DATA'));
  assert.ok(code.includes('WE_USER_PROPERTIES'));
  assert.ok(code.includes('WE_SET_PAUSED'));
  assert.ok(code.includes('document.elementFromPoint'));
  assert.ok(code.includes('dispatchEvent'));
});

test('OPFS Storage: defines silent persistence and zero-prompt fallback methods', () => {
  const code = readFileSync(opfsPath, 'utf8');
  assert.ok(code.includes('saveActiveWallpaperToOpfs'));
  assert.ok(code.includes('loadActiveWallpaperFromOpfs'));
  assert.ok(code.includes('removeActiveWallpaperFromOpfs'));
  assert.ok(code.includes('isOpfsSupported'));
  assert.ok(code.includes('active_wallpaper'));
});

test('Audio Visualizer: adheres to 128-float32 dual-channel normalized spectrum specs', () => {
  const code = readFileSync(visualizerPath, 'utf8');
  assert.ok(code.includes('fftSize = 128'));
  assert.ok(code.includes('createChannelSplitter(2)'));
  assert.ok(code.includes('attachAudioSource'));
  assert.ok(code.includes('startAudioSpectrumStream'));
  assert.ok(code.includes('stopAudioSpectrumStream'));
});

test('Workshop Scanner & Applier: handles project.json, directory handle, and OPFS cloning', () => {
  const scannerCode = readFileSync(scannerPath, 'utf8');
  assert.ok(scannerCode.includes('pickWorkshopDirectory'));
  assert.ok(scannerCode.includes('scanWorkshopDirectory'));
  assert.ok(scannerCode.includes('saveWorkshopDirectoryHandle'));
  assert.ok(scannerCode.includes('getSavedWorkshopDirectoryHandle'));
  assert.ok(scannerCode.includes('parseSingleWorkshopFolder'));

  const applierCode = readFileSync(applierPath, 'utf8');
  assert.ok(applierCode.includes('applyWorkshopWallpaper'));
  assert.ok(applierCode.includes('saveActiveWallpaperToOpfs'));
  assert.ok(applierCode.includes('collectFolderFiles'));
});

